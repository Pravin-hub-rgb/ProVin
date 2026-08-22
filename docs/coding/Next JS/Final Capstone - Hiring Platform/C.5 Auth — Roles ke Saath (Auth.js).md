C.4 ke saath public side complete ho gayi — listings, filters, detail page, SEO. Par abhi tak **sirf dekh sakte hain**. Post karne ke liye employer chahiye, apply karne ke liye candidate — matlab auth. Batch 5 mein Auth.js + GitHub OAuth bana tha (Login Demo v2), par wahan sirf ek sawaal tha: *"logged in hai ya nahi?"* Capstone ka sawaal bada hai: **"kaun logged in hai — EMPLOYER ya CANDIDATE?"** Yeh file mein woh role layer upar banayenge.

Reuse pehle, naya baad mein: OAuth setup (GitHub app + env vars + install) 5.4.1 jaisa hi hai — quick recap karenge. Asli naya kaam: DB mein user record, session mein role, onboarding flow, protected route groups.

# Hiring Platform — Part 5: Auth with Roles

## Step 1 — Setup Recap (5.4.1 Se Same)

GitHub OAuth App banao — 5.4.1 Step 1 ke exact steps: Settings → Developer settings → OAuth Apps → New. Do values yaad rakho:

| Field | Value |
|---|---|
| Homepage URL | `http://localhost:3000` |
| Authorization callback URL | `http://localhost:3000/api/auth/callback/github` |

Client ID + Client Secret milenge (secret sirf ek baar dikhta hai!). Phir:

```bash
npm install next-auth@beta
npx auth secret
```

**`.env.local`** mein teen vars (5.4.1 convention — `AUTH_GITHUB_` prefix se provider khud padh leta hai):

```env
AUTH_SECRET=npx-auth-secret-ne-dala-hoga
AUTH_GITHUB_ID=github-client-id
AUTH_GITHUB_SECRET=github-client-secret
```

Auth.js ko route handler chahiye — 5.4.2 wala hi file:

```ts
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
```

Aur base config — root `auth.ts` (project root, `app/` ke bahar) — 5.4.1 ka final state:

```ts
// auth.ts (project root)
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, auth, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/login" },
});
```

Yeh tak sab revision tha. Ab naya kaam.

## Step 2 — Login Ke Waqt DB Mein User Record

**Problem:** Abhi login karne pe Auth.js ko sirf GitHub profile milta hai (naam, email) aur JWT ban jaata hai. Hamare paas toh poori `User` table hai (C.2)! Applications, role, company — sab `userId` se judi hai. Agar DB row create na ho toh apply action ko pata hi nahi chalega applicant kaun hai.

**Concept:** Auth.js config ke **callbacks** lifecycle hooks hain — auth ke different points pe hamara code chalta hai. Humein do chahiye:

- **`signIn` callback** — *sirf login ke waqt* ek baar chalta hai → yahan user record upsert karenge
- **`jwt` callback** — JWT ban/refresh hone pe chalta hai → token mein `userId` daalenge

"Upsert" = update-or-insert: email se dhoondo, mila toh use karo, naya user hai toh banao. Dobara login pe duplicates nahi bante.

```ts
// auth.ts (project root)
import NextAuth from "next-auth";                                        // NEW
import GitHub from "next-auth/providers/github";
import prisma from "@/lib/prisma";                                       // NEW

export const { handlers, signIn, auth, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/login" },
  callbacks: {                                                           // NEW
    async signIn({ user }) {                                             // NEW
      if (!user.email) return false;                                     // NEW
                                                                      // NEW
      const dbUser = await prisma.user.upsert({                          // NEW
        where: { email: user.email },                                    // NEW
        update: {},                                                      // NEW
        create: {                                                        // NEW
          email: user.email,                                             // NEW
          name: user.name,                                               // NEW
          image: user.image,                                             // NEW
          // role schema default lega — CANDIDATE                        // NEW
        },                                                               // NEW
      });                                                                // NEW
                                                                      // NEW
      return true;                                                       // NEW
    },                                                                   // NEW
    async jwt({ token, user }) {                                         // NEW
      if (user?.email) {                                                 // NEW
        const dbUser = await prisma.user.findUnique({                    // NEW
          where: { email: user.email },                                  // NEW
        });                                                              // NEW
        if (dbUser) token.userId = dbUser.id;                            // NEW
      }                                                                  // NEW
      return token;                                                      // NEW
    },                                                                   // NEW
  },                                                                     // NEW
});
```

Flow samjho — login pe kya-kya hota hai:

1. GitHub se profile aaya (`user` param)
2. `signIn`: `user.email` nahi? → `return false` = login reject (rare, but guard). Warna **upsert** — pehli baar row bani (schema default role `CANDIDATE` laga), dobara login pe existing mili (`update: {}` = kuch mat badlo)
3. `jwt`: sirf tab DB query jab `user` present hai (= fresh sign-in; har request pe yeh callback chalta hai, par `if` andar ki query sirf sign-in pe) → token mein `userId` pack
4. Ab har future request pe JWT ke andar `token.userId` available

TypeScript note: `token.userId` pe red squiggle aa sakti hai — default `JWT` type mein `userId` field nahi. Fix agle step mein (type augmentation).

## Step 3 — Session Mein Fresh Role (DB = Single Source of Truth)

**Problem:** Token mein `userId` hai, par pages ko chahiye `role` — layout checks ke liye. Role change hota rahega (onboarding pe candidate→employer). Token mein role daala toh **stale** ho sakta hai — JWT refresh hone tak purani role dikhegi.

**Decision:** Role kabhi token mein store NAHI karenge. Har request pe session banate waqt DB se **fresh user** uthayenge. Ek extra indexed query per request — trade-off honest hai: simplicity + always-correct role, cost microseconds ki query.

```ts
// auth.ts — callbacks ke andar hi, jwt ke neeche:
async session({ session, token }) {                                      // NEW
  if (token.userId) {                                                    // NEW
    const dbUser = await prisma.user.findUnique({                        // NEW
      where: { id: token.userId as number },                             // NEW
    });                                                                  // NEW
    if (dbUser) {                                                        // NEW
      session.user.id = dbUser.id;                                       // NEW
      session.user.role = dbUser.role;                                   // NEW
      session.user.name = dbUser.name;                                   // NEW
      session.user.image = dbUser.image;                                 // NEW
    }                                                                    // NEW
  }                                                                      // NEW
  return session;                                                        // NEW
},                                                                       // NEW
```

### Type Augmentation — Library Ke Types Ko Extend Karna

Red squiggles fix karne ka time. Auth.js ke default types mein `session.user.role` / `token.userId` exist nahi karte — humne **add** kiya hai. TypeScript module augmentation se library ke types badha sakte hain. **File:** `auth.ts` ke end mein hi (colocated — sab ek jagah dikhe):

```ts
// auth.ts — file ke end mein
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: "CANDIDATE" | "EMPLOYER";
      name?: string | null;
      image?: string | null;
      email?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: number;
  }
}
```

**Kya ho raha hai:** `declare module` TypeScript ko bolta hai — "is library ke types ko meri definition se merge kar do." Ab poore project mein `session.user.role` typed hai — autocomplete + typo protection. (React course ke generics/interfaces wale concepts ka real-world use.)

**TEST checkpoint:** `auth.ts` save karo, `/api/auth/signin` pe jao → GitHub login karo → error-free hona chahiye. Neon SQL Editor: `SELECT * FROM "User";` — tumhari row dikhni chahiye (role = CANDIDATE).

## Step 4 — Login Page

Custom `/login` page — `pages.signIn` isi pe point karta hai. Server component + Server Action se signIn:

**File:** `app/login/page.tsx`

```tsx
// app/login/page.tsx
import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="border rounded-xl p-8 max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-gray-600 mb-6">
          Sign in to apply for jobs or post one.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/onboarding" });
          }}
        >
          <button className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 font-medium hover:bg-gray-800">
            Continue with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}
```

- **Inline `"use server"`** — form ka `action` Server Action hai (3.3 pattern); chhote actions inline theek hain
- **`redirectTo: "/onboarding"`** — login ke baad seedha onboarding — kyunki naye user ka role decide hona hai. (Purane users ke liye thodi extra click, par flow simple rehta hai — C.12 polish item.)
- **`signIn("github")`** — OAuth dance shuru: GitHub redirect → consent → callback → hamare callbacks (Step 2) → wapas onboarding

Sign out — header/navbar button (chhota sa component, dashboard layouts mein use hoga):

**File:** `components/logout-button.tsx`

```tsx
// components/logout-button.tsx
import { signOut } from "@/auth";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button className="text-sm text-gray-600 hover:text-gray-900">
        Sign out
      </button>
    </form>
  );
}
```

## Step 5 — Onboarding: Role Chuno

Login ke baad user `/onboarding` pe aata hai — ab usse poochna hai kaun hai woh.

**File:** `app/onboarding/page.tsx` — pehle static UI (do cards):

```tsx
// app/onboarding/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CompleteOnboarding } from "./actions";

export default async function OnboardingPage() {
  const session = await auth();

  // Already role choose kar chuka? Uske section pe bhejo
  if (session?.user.role === "EMPLOYER") redirect("/dashboard");
  if (session?.user.role === "CANDIDATE") redirect("/applications");

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold mb-2">Aap kaun hain?</h1>
      <p className="text-gray-600 mb-8">
        Yeh baad mein change nahi hoga is demo mein — soch ke choose karo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Candidate card */}
        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-1">I'm here to work</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse jobs, apply with your resume, track applications.
          </p>
          <form
            action={async () => {
              "use server";
              await CompleteOnboarding("CANDIDATE");
            }}
          >
            <button className="bg-blue-600 text-white rounded-lg px-4 py-2">
              Continue as Candidate
            </button>
          </form>
        </div>

        {/* Employer card */}
        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-1">I'm hiring</h2>
          <p className="text-sm text-gray-600 mb-4">
            Post jobs with AI descriptions, review ranked applicants.
          </p>
          <EmployerForm />
        </div>
      </div>
    </main>
  );
}

function EmployerForm() {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        await CompleteOnboarding(
          "EMPLOYER",
          formData.get("companyName") as string,
          formData.get("logoUrl") as string
        );
      }}
      className="space-y-2"
    >
      <input
        name="companyName"
        required
        placeholder="Company name"
        className="w-full border rounded px-3 py-2"
      />
      <input
        name="logoUrl"
        placeholder="Logo URL (optional)"
        className="w-full border rounded px-3 py-2"
      />
      <button className="bg-blue-600 text-white rounded-lg px-4 py-2">
        Continue as Employer
      </button>
    </form>
  );
}
```

Ab asli mutation — role update (+ company create for employer):

**File:** `app/onboarding/actions.ts`

```ts
// app/onboarding/actions.ts
"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function CompleteOnboarding(
  role: "CANDIDATE" | "EMPLOYER",
  companyName?: string,
  logoUrl?: string
) {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      role,
      ...(role === "EMPLOYER" && companyName
        ? {
            company: {
              create: { name: companyName, logoUrl: logoUrl || null },
            },
          }
        : {}),
    },
  });

  redirect(role === "EMPLOYER" ? "/dashboard" : "/applications");
}
```

- **Server pe phir se auth()** — client se aaya "role" trust nahi karte; session se userId leke hi update. Aur `role` parameter ko bhi union-type restrict kiya (`"CANDIDATE" | "EMPLOYER"`) — koi aur value type-level pe hi invalid.
- **Conditional spread** — `...(cond ? {...} : {})` pattern: employer ho tabhi `company.create` data mein jaata hai. Nested create (C.2 seed wala) — User update ke saath Company ban gayi, FK automatic.
- **Redirect role-based** — har role apne ghar mein.

**TEST:** Naya browser (ya incognito) → `/login` → GitHub → onboarding → Employer + company name "Test Co" → `/dashboard` pe land (abhi 404 hoga — next step!). Neon check: User.role = EMPLOYER, Company table mein row.

## Step 6 — Protected Route Groups

**Concept (5.4.3 ka scale version):** `(employer)` group ke layout mein ek hi baar check likhenge — group ke andar ke saare pages protected. Helper banate hain taaki dono groups reuse karein:

**File:** `lib/require-role.ts`

```ts
// lib/require-role.ts
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireRole(role: "EMPLOYER" | "CANDIDATE") {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== role) {
    redirect(role === "EMPLOYER" ? "/applications" : "/dashboard");
  }

  return session;
}
```

- Bina login → `/login`
- Galat role → apne section pe cross-redirect (employer ko candidate pages mein ghusna hai toh uska dashboard, vice versa)
- Sahi role → session return — calling layout/page use kar sake

**File:** `app/(employer)/layout.tsx`

```tsx
// app/(employer)/layout.tsx
import { requireRole } from "@/lib/require-role";
import { LogoutButton } from "@/components/logout-button";

export default async function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole("EMPLOYER");

  return (
    <div>
      <header className="border-b px-8 py-4 flex justify-between items-center">
        <span className="font-bold">{session.user.name}'s Hiring Hub</span>
        <nav className="flex gap-4 items-center">
          <a href="/dashboard" className="text-sm hover:underline">
            Dashboard
          </a>
          <a href="/post-job" className="text-sm hover:underline">
            Post Job
          </a>
          <LogoutButton />
        </nav>
      </header>
      <main className="mx-auto max-w-5xl p-8">{children}</main>
    </div>
  );
}
```

**File:** `app/(candidate)/layout.tsx` — same shape, `requireRole("CANDIDATE")`, nav mein "My Applications".

> Parentheses folders URL mein nahi aate (5.5.x mein dekha) — `(employer)/dashboard/page.tsx` = `/dashboard`. Group sirf code organization + shared layout deta hai.

**Security note (Batch 4/8 ka rule yahan bhi):** Protection **layout-level `auth()` pe hai** — proxy/middleware mein NAHI. CVE-2025-29927 wali kahani yaad hai — middleware bypass ho sakta tha; layout server pe render hota hai, bypass impossible. Proxy ka role capstone mein sirf rate-limiting hoga (C.11).

Ek aur zaroori baat jo interviews mein poochi jaati hai: **layout check ≠ page check.** Layout render hota hai har child page ke around — practically covered. Par agar kabhi koi page layout ke bahar nikal jaye (restructure), protection chhoot sakti hai. Isliye sensitive actions (jaise delete job) ke Server Actions **andar bhi ownership+role verify karte hain** — C.7 mein dikhega. Defense in depth.

**TEST checklist:**

1. Incognito → `/dashboard` directly → `/login` pe redirect
2. Login as Employer → onboarding → `/dashboard` renders (with header)
3. Same session → manually `/applications` URL type → cross-redirect back to `/dashboard`
4. Naya incognito, login as Candidate → `/applications` works, `/dashboard` blocked
5. Sign out → public home, protected URLs phir se login pe redirect

## Nutshell

Role-wala auth = Batch 5 base + 3 nayi cheezein. **(1)** `signIn` callback mein DB **upsert** (pehli login pe User row; duplicate-safe), `jwt` callback token mein `userId`. **(2)** `session` callback **har request pe DB se fresh user** — role single-source-of-truth DB hai, token stale nahi ho sakta; types `declare module` augmentation se extend. **(3)** Flow: login → `/onboarding` → role+company SA se DB update → role-based redirect → `(employer)/(candidate)` groups ke layouts `requireRole()` helper se protect (login nahi → /login; galat role → apna section). Security layout-level, proxy pe nahi.

## What It Is NOT

- **`upsert` = "har login pe naya record" nahi.** Email match hua toh update branch (khali `{}`) chalti hai — same user, same row. Insert sirf first-time. Isliye `@unique` email ke saath conflict bhi kabhi nahi.
- **Session mein fresh DB read = "performance bug" nahi.** Conscious trade-off hai — correctness (fresh role) > microsecond query. Production optimization (JWT claims caching + update events) possible hai, par complexity abhi value nahi deti.
- **Role system = "full RBAC" nahi.** Sirf do roles hain, flat permissions. Enterprise RBAC (permission tables, role hierarchies) alag universe hai — yeh capstone ka simple, honest version hai.
- **Layout protection = "pages khud safe hain" nahi.** Layout visual/route access gate karta hai; **data mutations** apni Server Actions mein ownership verify karti hain (C.7/C.10). Dono layers alag kaam karti hain — UI gate vs operation gate.
- **`declare module` = "library ka source edit" nahi.** Sirf TypeScript ki type-world mein merge hota hai — runtime code untouched. Pure compile-time feature.

---

**In Your Own Words**

1. `signIn` callback mein upsert kyun — plain `create` kyun nahi?

<details>
<summary>Show Answer</summary>

**Sample Answer:** User dobara login karta hai toh `create` unique-email constraint pe fail karega (row already exists) — poora login crash. Upsert dono cases handle karta hai: naya user → insert, purana → no-op update. Auth flows mein repeat visits guaranteed hain, isliye upsert standard pattern hai.

</details>

2. Role token (JWT) mein store karne ke bajaye har request pe DB se fetch kyun — trade-off explain karo.

<details>
<summary>Show Answer</summary>

**Sample Answer:** Token mein role stale ho jata — user onboarding pe role badle toh JWT refresh tak purani role chalti (access control galat!). DB-fresh session se role hamesha correct, single source of truth. Cost: ek indexed PK query per request (~ms). Correctness-sensitive data (permissions) ke liye yeh trade worth it hai; static prefs (theme etc.) token mein rakh sakte the.

</details>

3. `requireRole` galat role pe user ko uske apne section pe redirect karti hai — security perspective se yeh information leak toh nahi?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Halka leak hai — response se pata chalta hai "/dashboard exist karti hai" (vs generic 404 jo existence bhi chhupata). Capstone scope mein acceptable UX trade-off hai (better guidance > secrecy). High-security systems generic 404 prefer karti hain. Important: yeh UI-level choice hai — actual data/actions toh phir bhi protected hain, redirect sirf navigation hai.

</details>

4. `CompleteOnboarding` mein role parameter server pe validate kyun kiya jab form se hi aa raha hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Form HTML user-controlled hai — koi DevTools se apna form/action craft karke `role=ADMIN` jaisi values POST kar sakta hai (8.2: client input pe trust nahi). Union type + explicit branches se sirf valid roles process hote hain. Server Actions publicly callable endpoints hain — unki inputs untrusted treat karna rule hai.

</details>

5. `(employer)/layout.tsx` ka `requireRole("EMPLOYER")` check CVE-2025-29927 se kyun safe hai jabki proxy-level check unsafe tha?

<details>
<summary>Show Answer</summary>

**Sample Answer:** CVE wala attack middleware/proxy routing layer ko special headers se bypass karta tha — woh request pipeline ka interceptable part hai. Layout check App ke render phase mein hota hai — server-side React tree banate waqt `auth()` chalti hai; us layer ko "skip" karne ka path hi nahi hai. Page content hi render nahi hota agar check fail. Infra-layer vs application-layer difference.

</details>

---

Auth layer poori hai — login, roles, onboarding, protected sections. Ab in roles ko **kaam** pe lagate hain. C.6 mein employer ka pehla power tool: **Post Job form** — aur uske saath capstone ki pehli AI call: title/skills type karo, Gemini job description draft likh dega. Server Action + external API + useActionState feedback — teen concepts ek saath.
