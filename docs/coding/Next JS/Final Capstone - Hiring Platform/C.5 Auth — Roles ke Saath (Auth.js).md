With C.4, the public side is complete — listings, filters, detail pages, SEO. But until now you could only **look.** To post, you need an employer; to apply, you need a candidate — so you need auth. Batch 5 built Auth.js + GitHub OAuth (Login Demo v2), but there the question was only: *"is the user logged in?"* The capstone's question is bigger: **"who is logged in — EMPLOYER or CANDIDATE?"** This file puts that role layer on top.

Reuse what came first, add what's new: OAuth setup (GitHub app + env vars + install) is the same as 5.4.1 — we'll quickly recap it. The real new work: a user record in the DB, the role in the session, the onboarding flow, and protected route groups.

# Hiring Platform — Part 5: Auth with Roles

## Step 1 — Setup Recap (Same as 5.4.1)

Create a GitHub OAuth App — 5.4.1 Step 1, exact same steps: Settings → Developer settings → OAuth Apps → New. Remember two values:

| Field | Value |
|---|---|
| Homepage URL | `http://localhost:3000` |
| Authorization callback URL | `http://localhost:3000/api/auth/callback/github` |

You'll get the Client ID + Client Secret (the secret shows only once!). Then:

```bash
npm install next-auth@beta
npx auth secret
```

**`.env.local`** gets three vars (5.4.1's convention — `AUTH_GITHUB_` prefix lets the provider read it automatically):

```env
AUTH_SECRET=npx-auth-secret-ne-dala-hoga
AUTH_GITHUB_ID=github-client-id
AUTH_GITHUB_SECRET=github-client-secret
```

Auth.js needs a route handler — 5.4.2's same file:

```ts
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
```

And the base config — root `auth.ts` (project root, outside `app/`) — 5.4.1's final state:

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

That was all review. Now the new stuff.

## Step 2 — Create a User Record at Login Time

**The problem:** When you log in, Auth.js only sees the GitHub profile (name, email) and creates a JWT. But we have a full `User` table (C.2)! Applications, role, company — all connect to `userId`. If no DB row is created, the apply action won't know who the candidate is.

**Concept:** Auth.js config has **callbacks** — lifecycle hooks that run at different points in auth. We need two:

- **`signIn` callback** — runs *once at login time* → create/update the user record
- **`jwt` callback** — runs when the JWT is created/updated → put `userId` in the token

"Upsert" = update-or-insert: look by email; if found, use it; if it's a new user, create it. No duplicates on repeat logins.

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
        create: {                                                       // NEW
          email: user.email,                                             // NEW
          name: user.name,                                               // NEW
          image: user.image,                                             // NEW
          // role gets schema default — CANDIDATE                        // NEW
        },                                                               // NEW
      });                                                                // NEW

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

Trace the login flow:

1. GitHub profile arrives (`user` param)
2. `signIn`: no `user.email`? → `return false` = login rejected (rare, but a guard). Otherwise **upsert** — first time creates a row (schema default `role: CANDIDATE`), repeat login finds the existing row (`update: {}` = change nothing)
3. `jwt`: only runs the DB query when `user` is present (= fresh sign-in; the callback runs on every request, but the `if` block only runs at sign-in) → pack `userId` into the token
4. From now on, every future request has `token.userId` available

TypeScript note: red squiggles may appear on `token.userId` — the default `JWT` type doesn't have that field. Fix it in the next step (type augmentation).

## Step 3 — Fresh Role in Session (DB = Single Source of Truth)

**The problem:** The token has `userId`, but pages need `role` — for layout checks. Roles change (during onboarding, candidate → employer). Storing the role in the token would be **stale** — it won't update until the JWT refreshes.

**Decision:** Role is **never** stored in the token. Every time a session is built, we fetch the **fresh user** from the DB. One extra indexed query per request — an honest trade-off: simplicity + always-correct role, at the cost of a microsecond query.

```ts
// auth.ts — inside callbacks, below jwt:
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

### Type Augmentation — Extending Library Types

Time to fix the red squiggles. Auth.js' default types don't include `session.user.role` or `token.userId` — we **added** them. TypeScript module augmentation lets you extend a library's types. **File:** append to `auth.ts` (co-located — keep everything in one place):

```ts
// auth.ts — end of file
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

**What's happening:** `declare module` tells TypeScript — "merge my definitions with this library's types." Now across the whole project, `session.user.role` is typed — autocomplete + typo protection. (The real-world use of the React course's generics/interfaces.)

**TEST checkpoint:** Save `auth.ts`, go to `/api/auth/signin` → click GitHub login → it should work error-free. In the Neon SQL Editor: `SELECT * FROM "User";` — your row should appear (role = CANDIDATE).

## Step 4 — Login Page

Custom `/login` page — `pages.signIn` points here. Server component + Server Action to sign in:

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

- **Inline `"use server"`** — the form's `action` is a Server Action (3.3 pattern); small inline actions are fine
- **`redirectTo: "/onboarding"`** — after login, straight to onboarding — because a new user needs to decide their role. (Existing users get one extra click, but the flow stays simple — a C.12 polish item.)
- **`signIn("github")`** — starts the OAuth dance: GitHub redirects → consent → callback → our callbacks (Step 2) → back to onboarding

Sign out — a small button for the header/navbar (used in the dashboard layouts):

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

## Step 5 — Onboarding: Choose a Role

After login, the user arrives at `/onboarding` — now we ask what they are.

**File:** `app/onboarding/page.tsx` — start with static UI (two cards):

```tsx
// app/onboarding/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CompleteOnboarding } from "./actions";

export default async function OnboardingPage() {
  const session = await auth();

  // Already chosen a role? Send to their section
  if (session?.user.role === "EMPLOYER") redirect("/dashboard");
  if (session?.user.role === "CANDIDATE") redirect("/applications");

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold mb-2">Who are you?</h1>
      <p className="text-gray-600 mb-8">
        This won't change later in this demo — choose carefully.
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

Now for the real mutation — updating the role (+ creating a company for the employer):

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

- **Authenticate again on the server** — we don't trust the role the client sends; we get `userId` from the session. The `role` parameter is also restricted to a union type (`"CANDIDATE" | "EMPLOYER"`) — no other value is valid at the type level.
- **Conditional spread** — the `...(cond ? {...} : {})` pattern: `company.create` only goes into `data` when the user is an employer. Nested create (the seed pattern from C.2) — a Company is created alongside the User update, FK automatically.
- **Role-based redirect** — each role goes home to their own section.

**TEST:** A new incognito window → `/login` → GitHub → onboarding → Employer + company name "Test Co" → lands on `/dashboard` (will 404 for now — next step!). Neon check: `User.role` = EMPLOYER, a row in the `Company` table.

## Step 6 — Protected Route Groups

**Concept (5.4.3 at scale):** Write the check once in each group's layout — all pages in the group are protected. Create a helper so both groups can reuse it:

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

- Not logged in → `/login`
- Wrong role → cross-redirect to their own section (if an employer tries candidate pages, send to dashboard, and vice versa)
- Correct role → return the session so the calling layout/page can use it

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

**File:** `app/(candidate)/layout.tsx` — same shape, `requireRole("CANDIDATE")`, nav has "My Applications".

> Parenthesized folders don't appear in the URL (covered in 5.5.x) — `(employer)/dashboard/page.tsx` = `/dashboard`. The group is just code organization + a shared layout.

**Security note (rule from Batch 4/8, here too):** Protection is at the **layout-level `auth()`** — NOT in the proxy/middleware. Remember CVE-2025-29927 — middleware could be bypassed; layouts render on the server, bypass impossible. The proxy's role in the capstone is only rate-limiting (C.11).

One more important point that comes up in interviews: **layout check ≠ page check.** The layout renders around every child page — practically covered. But if someone ever moves a page outside its layout (restructure), the protection could slip. That's why sensitive actions (like deleting a job) **also** verify ownership+role in the Server Action itself — you'll see this in C.7. Defense in depth.

**TEST checklist:**

1. Incognito → `/dashboard` directly → redirect to `/login`
2. Login as Employer → onboarding → `/dashboard` renders (with header)
3. Same session → manually type `/applications` URL → cross-redirect back to `/dashboard`
4. New incognito, login as Candidate → `/applications` works, `/dashboard` blocked
5. Sign out → public home, protected URLs redirect to login again

## Nutshell

Role-based auth = Batch 5 base + 3 new things. **(1)** In the `signIn` callback, DB **upsert** (first login creates the User row; repeat login finds it, `update: {}` = no change), `jwt` callback packs `userId` into the token. **(2)** The `session` callback fetches the **fresh user from DB on every request** — role is single-source-of-truth in the DB, token stays non-stale; extend types with `declare module` augmentation. **(3)** Flow: login → `/onboarding` → role+company via SA → DB update → role-based redirect → `(employer)/(candidate)` groups protected by the `requireRole()` helper (login? → /login; wrong role? → own section). Security at layout-level, not proxy-level.

## What It Is NOT

- **`upsert` = "creates a record every login" is NOT true.** If the email matches, the update branch runs (`update: {}` = no change) — same user, same row. Insert only happens for first-timers. So the `@unique` email never even comes close to conflicting.
- **Fresh DB read in session = "a performance bug" is NOT true.** A conscious trade-off — correctness (fresh role) > a microsecond query. Production optimization (JWT claims caching + update events) is possible, but the complexity doesn't pay off yet.
- **Role system = "full RBAC" is NOT true.** Just two roles, flat permissions. Enterprise RBAC (permission tables, role hierarchies) is a different universe — this is the capstone's simple, honest version.
- **Layout protection = "the pages themselves are safe" is NOT true.** The layout gates visual/route access; **data mutations still verify ownership in their own Server Actions** (C.7/C.10). Two layers, two jobs — UI gate vs operation gate.
- **`declare module` = "editing the library's source" is NOT true.** It's just a TypeScript type-world merge — runtime code untouched, pure compile-time.

---

## In Your Own Words

1. Why `upsert` in the `signIn` callback — why not just `create`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** A user logs in again — `create` would fail on the unique-email constraint (row already exists) — the whole login crashes. Upsert handles both cases: new user → insert, existing user → no-op update. Repeat visits are guaranteed in auth flows, so upsert is the standard pattern.

</details>

2. Why fetch the role from DB on every request instead of storing it in the token — what's the trade-off?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The role stored in a token goes stale — during onboarding the role changes, but the old role would serve until the JWT refreshes. Fetching the session fresh from DB means the role is always correct, single source of truth. The cost: one indexed PK query per request (~milliseconds). For correctness-sensitive data (permissions), that trade-off is worth it; for static preferences (theme etc.), the token is fine.

</details>

3. `requireRole` redirects the wrong-role user to their own section — is that an information leak from a security perspective?

<details>
<summary>Show Answer</summary>

**Sample Answer:** A light leak — the response confirms that "/dashboard exists" (versus a generic 404 that conceals existence). In scope of the capstone this is an acceptable UX trade-off (better guidance than secrecy). High-security systems prefer a generic 404. The important thing: this is a UI-level choice — the actual data and actions are still protected; the redirect is just navigation.

</details>

4. Why validate the `role` parameter in `CompleteOnboarding` when it comes from the form?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The form HTML is user-controlled — someone could craft their own form/action in DevTools and POST `role=ADMIN` (8.2: don't trust client input). The union type + explicit branches means only valid roles are processed. Server Actions are publicly callable endpoints — their inputs must be treated as untrusted.

</details>

5. The `(employer)/layout.tsx` checks `requireRole("EMPLOYER")` — how is this safe from CVE-2025-29927 (middleware bypass) when a proxy-level check wasn't?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The CVE let attackers bypass the middleware/proxy routing layer using special headers — that layer is interceptable. The layout check runs during App's render phase — `auth()` runs while the React tree is built; there's no way to skip it. The page content doesn't render at all if the check fails. The difference is infrastructure-layer vs application-layer.

</details>

---

The auth layer is complete — login, roles, onboarding, protected sections. Now put these roles to **work**. In C.6, the employer's first power tool: the **Post Job form** — with the capstone's first AI feature: type a title + skills, and **Gemini** drafts the full job description. Server Action + external API + useActionState feedback — three concepts together.
