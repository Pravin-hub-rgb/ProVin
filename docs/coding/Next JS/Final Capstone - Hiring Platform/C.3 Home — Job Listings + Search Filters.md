C.2 mein foundation poori ho gayi — project bana, Neon juda, 4 tables migrate hui, aur seed data (4 jobs, 2 companies, 1 scored application) database mein pada hai. Neon SQL Editor mein query chala ke verify bhi kar liya tha. Ab pehla **user-facing page** — home. Guest ya logged-in, koi bhi aaye, sabse pehle yahi dikhega: featured jobs upar, neeche saari jobs, upar ek search bar + filters.

Yeh page 3 cheezein sikhayega jo poore capstone mein baar-baar aayengi:
1. **Server Component se Prisma read with relations** (`include` — 6.13.4 ka pattern)
2. **Page-level `searchParams`** — URL ke `?q=react&type=FULL_TIME` ko page ke andar padhna (naya concept!)
3. **Server-side filtering — bina kisi "use client" ke**

# Hiring Platform — Part 3: Home Page

## Stage 1 — Static UI Pehle (Hamesha Ka Rule)

Golden rule yaad hai — 6.13.2 Task Board, 7.7.2 Photo Gallery, sab static UI se shuru hue. Kyun? Data layer baad mein judti hai, par **design ka faisla abhi** hota hai — aur hardcoded data se hi pata chal jaata hai ki data shape sahi hai ya nahi.

Pehle socho — job card pe kya dikhna chahiye? Seed data dekho (C.2): title, company name, company logo, location, type badge, salary range, skills chips, featured badge. Bas.

**File:** `app/page.tsx` — default content replace karo:

```tsx
// app/page.tsx
export default function Home() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      slug: "frontend-developer-at-acme",
      location: "Remote (India)",
      type: "FULL_TIME",
      salaryMin: 800000,
      salaryMax: 1400000,
      skills: "React, TypeScript, Next.js",
      featured: true,
      companyName: "Acme Corp",
    },
    {
      id: 2,
      title: "Backend Intern",
      slug: "backend-intern-at-acme",
      location: "Bengaluru",
      type: "INTERNSHIP",
      salaryMin: null,
      salaryMax: null,
      skills: "Node.js, Express",
      featured: false,
      companyName: "Acme Corp",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold mb-2">Find Your Next Job</h1>
      <p className="text-gray-600 mb-8">
        {jobs.length} open positions
      </p>

      {/* Filter bar — abhi sirf dikhne ke liye */}
      <form className="flex gap-2 mb-8">
        <input
          name="q"
          placeholder="Search title or skills..."
          className="border rounded px-3 py-2 flex-1"
        />
        <select name="type" className="border rounded px-3 py-2">
          <option value="">All types</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERNSHIP">Internship</option>
        </select>
        <button className="bg-blue-600 text-white rounded px-4 py-2">
          Search
        </button>
      </form>

      {/* Job cards */}
      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <a
            key={job.id}
            href={`/jobs/${job.slug}`}
            className="border rounded-lg p-5 hover:border-blue-400 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-600">{job.companyName}</p>
              </div>
              {job.featured && (
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                  ★ Featured
                </span>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-700">
              <span>📍 {job.location}</span>
              <span>•</span>
              <span>{job.type.replace("_", " ").toLowerCase()}</span>
              {job.salaryMin && (
                <span>
                  • ₹{(job.salaryMin / 100000).toFixed(0)}–
                  {(job.salaryMax! / 100000).toFixed(0)} LPA
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">{job.skills}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
```

Code ke important bits:

- **`jobs.map()`** — hardcoded array se cards; `key={job.id}` React course ka purana dost
- **Card poora `<a>` hai** — poora card clickable, `/jobs/[slug]` pe le jaata hai (C.4 mein banega)
- **`{job.featured && (...)}`** — conditional render (&& pattern) — featured job pe hi amber badge
- **`job.type.replace("_", " ").toLowerCase()`** — DB value `FULL_TIME` hai, screen pe "full time" dikhana zyada natural hai. Yehi C.2 wala point tha — DB enum value ≠ display label
- **`job.salaryMin && ...` + `salaryMax!`** — optional fields ka guard. Andar `!` (non-null assertion) isliye kyunki min hai toh max bhi hoga (humara data rule) — TypeScript ko batana pad raha hai
- **Form abhi kuch nahi karta** — `action` nahi diya, button click submit karke same page reload karega. Jaan-boojh ke — filters agle stage mein judenge

**TEST:** `npm run dev` → `localhost:3000`. Do cards dikhne chahiye — Frontend Developer pe ★ Featured badge. Design confirm? Ab asli data.

## Stage 2 — Prisma Read (Hardcoded Array Ki Jagah)

Ab woh stage jahan har project ka hardcoded data real database se replace hota hai (6.13.4, 7.7.3 mein bhi yehi hua tha).

**Concept recap:** Server Component mein seedha `await` — no useEffect, no fetch, no loading spinner for the initial HTML (2.1). Prisma client singleton (`lib/prisma.ts`) import karo, query chalao.

Relations ka sawaal: card pe `companyName` chahiye — par woh `Job` table mein nahi, uski `Company` mein hai. **`include`** se related data saath laate hain (6.13.4 boards+tasks wala hi pattern):

```tsx
// app/page.tsx
import prisma from "@/lib/prisma";                                        // NEW

export default async function Home() {                                   // NEW (async)
  const jobs = await prisma.job.findMany({                               // NEW
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],              // NEW
    include: { company: true },                                          // NEW
  });
  // ...baaki JSX same...
```

- **`async function Home()`** — Server Component async ban gaya — ab andar `await` allowed
- **`orderBy: [{ featured: "desc" }, { createdAt: "desc" }]`** — C.2 wale index ka exact use! Featured jobs sabse upar, phir newest pehle. Array = multi-level sort.
- **`include: { company: true }`** — har job ke saath uski poori Company object. Result: `job.company.name` accessible.

JSX mein hardcoded field ab relation se aayegi:

```tsx
{/* pehle: */}
<p className="text-sm text-gray-600">{job.companyName}</p>

{/* ab: */}
<p className="text-sm text-gray-600">{job.company.name}</p>              // CHANGED
```

Baaki fields (`title`, `location`, `type`...) seedhe `job.` pe hain — same rahenge. Sirf company wali line badli.

**TypeScript bonus:** Prisma Client ne generate kiye types automatically `jobs` pe lag rahe hain — `job.company.name` hover karo, poora type dikh jayega. Koi manual interface nahi likha (Prisma ka sabse bada fayda — 6.13.3 ka point).

**TEST:** Save karo → page reload. Ab **4 jobs** dikhni chahiye (seed wale), Frontend Developer sabse upar featured badge ke saath. Agar error aaye `@/lib/prisma` not found — path alias check karo (`tsconfig.json` mein `"@/*": ["./*"]` hota hai create-next-app by default).

## Stage 3 — searchParams: URL Se Filters Padhna

UI mein form already hai, par woh kuch karta nahi. Ab filtering ka asli concept.

**Problem:** User "React" type karke Search dabaye toh kya hota hai? Form submit hota hai — aur browser URL banta hai:

```
localhost:3000/?q=React&type=FULL_TIME
```

HTML forms ka built-in behaviour: `<input name="q">` ki value URL mein `?q=value` ban jaati hai. Humne JavaScript likhi hi nahi — **browser khud query string banata hai** GET form pe. Ab bas page ko chahiye: *URL mein kya hai, wahi filter laga do.*

**Concept — page-level `searchParams`:** Batch 4 mein proxy ke andar URL padhna seekha tha (`request.nextUrl.searchParams.get(...)` — 4.4). Wahan request object se manually nikaalte the. App Router pages ka apna shortcut hai — Next.js har page ko ek prop deta hai jisme **current URL ki saari query params** hain:

```tsx
// sirf samajhne ke liye — abhi code nahi
export default async function Home({ searchParams }) {
  // searchParams = { q: "React", type: "FULL_TIME" }
  // agar URL mein ?q=... nahi hai → {} (khali object)
}
```

Ek **critical Next.js 16 detail:** yeh prop **Promise hai** — direct `.q` access nahi karoge, pehle `await` karna padega. Kyun promise? Next.js streaming render ke waqt URL parse ko optimize karta hai — promise dete hain taaki rendering block na ho jab tak params ki zaroorat na pade. Syntax:

```ts
const { q, type } = await searchParams;
```

Aur ek side-effect samjho (2.3 ka static-vs-dynamic yaad karo): **jis page mein `searchParams` await hota hai, woh page automatically Dynamic ban jaata hai.** Build time pe pre-render nahi hoga — har request pe server render karega, kyunki output URL pe depend karta hai. Iska matlab: humara home page ab dynamic hai — filters ke bina bhi. Trade-off acceptable hai: job board fresh listings dikhana chahta hai har request pe, stale cache nahi.

Ab code:

```tsx
// app/page.tsx
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";                            // NEW

type HomeProps = {                                                       // NEW
  searchParams: Promise<{ q?: string; type?: string }>;                  // NEW
};                                                                       // NEW

export default async function Home({ searchParams }: HomeProps) {       // CHANGED
  const { q, type } = await searchParams;                                // NEW

  const filters: Prisma.JobWhereInput[] = [];                            // NEW
  if (q) {                                                               // NEW
    filters.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { skills: { contains: q, mode: "insensitive" } },
      ],
    });                                                                  // NEW
  }                                                                      // NEW
  if (type === "FULL_TIME" || type === "PART_TIME"
      || type === "CONTRACT" || type === "INTERNSHIP") {                 // NEW
    filters.push({ type: type });                                        // NEW
  }                                                                      // NEW

  const jobs = await prisma.job.findMany({
    where: filters.length > 0 ? { AND: filters } : undefined,            // NEW
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    include: { company: true },
  });
  // ...JSX same...
```

Step-by-step:

- **`type HomeProps`** — TypeScript typing: `searchParams` Promise hai jiske andar optional strings. `?` kyun? URL mein param ho bhi sakta hai nahi bhi.
- **`await searchParams`** — Next 16 syntax; destructure se `q`, `type` nikale
- **`filters` array gradually build hota hai** — ternary-in-object se cleaner pattern. Har condition apni line pe push karti hai. Dono conditions ho toh AND mein dono lagte hain; ek bhi na ho toh `where: undefined` (= no filter, saari jobs).
- **`{ contains: q, mode: "insensitive" }`** — SQL LIKE %q% case-insensitive. "react" type karo toh "React, TypeScript..." wali jobs milengi.
- **`OR`** — title **ya** skills mein match. Dono jagah dekhna user-friendly hai.
- **Enum whitelist check** — `type` URL se aata hai, matlab **user-controlled string**! Koi `?type=HACKED` daal sakta hai. Seedha `{ type }` pass karte toh Prisma runtime error deta (invalid enum value) — ugly crash. Whitelist check = input validation (8.2 ka awareness yahan apply hua). Valid values ke alawa kuch filter trigger nahi karega.

### Filter Form Ko Kaam Karwana

Form mein ek line change:

```tsx
<form action="/" method="get" className="flex gap-2 mb-8">               // CHANGED
```

Bas itna?! Haan. Dekho kya hota hai:

1. User "React" type karta hai, type select karta hai FULL_TIME, Search dabata hai
2. Browser GET form submit karta hai → URL: `/?q=React&type=FULL_TIME`
3. Next.js page re-render karta hai, `searchParams` prop mein yeh values
4. Hamara `filters` logic unse WHERE banata hai
5. Filtered results render

**Zero client-side JavaScript. Zero "use client". Zero state management.** Poora flow server pe. Yeh server-first thinking hai — jo kaam server pe ho sakta hai, woh client pe mat lo (poora course isi philosophy pe chala hai).

Chhota polish — empty state (jab koi job match na ho):

```tsx
{jobs.length === 0 && (
  <p className="text-center text-gray-500 py-12">
    No jobs match your search. Try different keywords.
  </p>
)}
```

Aur count update — heading ke neeche `{jobs.length} open positions` already dynamic hai, filtered count automatically dikhega.

**TEST:** 
1. `localhost:3000` — 4 jobs
2. "React" search karo — 2 jobs (Frontend Dev + Fullstack — dono ke skills mein React)
3. Type = Internship select karo — 1 job
4. `?q=xyznothing&type=INTERNSHIP` manually URL mein daalo — empty state message
5. `?type=HACKED` daalo — crash nahi, saari jobs (whitelist ne reject kiya)

Sab paas? Home page complete hai.

## Ek Aur Cheez — `loading.tsx` (Dynamic Page Ka Companion)

Page ab dynamic hai — har search pe thoda wait (DB query). Slow network pe blank screen buri experience. Batch 1.4 ka convention yaad hai — `loading.tsx` folder mein daalo, Next.js automatic Suspense boundary bana deta hai:

**File:** `app/loading.tsx`

```tsx
// app/loading.tsx
export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="h-9 w-72 bg-gray-200 rounded animate-pulse mb-2" />
      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-8" />
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="border rounded-lg p-5 animate-pulse">
            <div className="h-5 w-48 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}
```

Skeleton cards (`animate-pulse` = Tailwind ka shimmer effect) — layout actual page jitna similar rakha, taaki swap smooth lage (layout shift na ho — CLS, 7.x ka concept).

**TEST:** Search submit karo — thoda network slow karke (DevTools → Network → Slow 3G) skeleton flash hona chahiye phir results.

## Nutshell

Home page = **SC read + server-side filters**. Static UI pehle (hardcoded array) → Prisma read (`findMany` + `orderBy` featured/newest + `include company`) → **page-level `searchParams` (Promise! `await` karo — Next 16)** se `q`/`type` padho → `Prisma.JobWhereInput[]` gradually build karke `AND` where → **GET form (`action="/" method="get"`)** browser se hi query string banwao — zero client JS. `searchParams` await hone se page Dynamic ban jaata hai (2.3 ka rule live). User-controlled enum whitelist se validate. `loading.tsx` skeleton ke saath.

## What It Is NOT

- **`searchParams` prop = proxy wala `searchParams` nahi.** Proxy (4.4) mein `request.nextUrl.searchParams` tha — URLSearchParams object, `.get("q")` se padhte the. Page prop plain object hai — `searchParams.q` directly. Naam same, shape alag — context pe dhyan.
- **GET form = "purane zamane ka tareeka" nahi.** Yeh web ka native pattern hai — bookmarkable/shareable URLs (filtered result ka link bhejo kisi ko!), zero JS, SEO-friendly. Modern SPAs isko client state + history API se recreate karne ki koshish karti hain — server pe free milta hai.
- **Dynamic page = "har baar slow" nahi.** Har request pe render hota hai, par Neon query milliseconds mein hai; Vercel region close hone pe overall fast hi rahega. ISR (revalidate) tab chahiye jab data rarely change ho — job postings active board pe frequently aati hain, dynamic fair choice hai.
- **Empty `where` (`undefined`) = "saare rows without order" nahi.** `where` undefined hai toh filter nahi, par `orderBy` phir bhi lagta hai. Dono independent clauses hain.
- **Whitelist check = "security ka poora solution" nahi.** Yeh input validation ka ek piece hai (invalid enum reject). Full security posture C.11 mein audit hogi — rate limiting, secrets, boundaries.

---

**In Your Own Words**

1. Form mein `method="get"` + `action="/"` se filter kaise chalta hai — koi JavaScript kahan hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Kahin nahi. GET form submit pe browser khud URL banata hai — named inputs (`name="q"`) ki values `?q=...&type=...` query string mein jaati hain. Next.js naya URL dekh ke page ko `searchParams` prop ke saath re-render karta hai, hamara server code unse Prisma WHERE banata hai. Filtering poora HTTP-native flow hai — JS sirf Tailwind styling tak simit.

</details>

2. `searchParams` ko `await` kyun karna padta hai — bina kya hota?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Next.js 16 mein yeh prop Promise hai (streaming optimization — rendering URL-parse pe block na ho). Bina await ke destructuring undefined degi (`Promise.q` exist nahi karta) — filters silently kaam nahi karenge, ya TypeScript pehle hi error pakad lega. `await` ke baad plain object milta hai `{ q?: string, type?: string }`.

</details>

3. `type === "FULL_TIME" || ...` wali lambi check kyun — seedha `{ type }` kyun nahi where mein?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `type` URL se aaya hai — user-controlled. Koi `?type=XYZ` bheje toh Prisma invalid enum value pe runtime throw karega — 500 error. Whitelist check invalid values ko ignore karke "no filter" treat karta hai — graceful degradation. Principle: client/server boundary se aaya har input validate hota hai (8.2).

</details>

4. Yeh page Static kyun nahi raha — `revalidate` laga dete toh kya bigad jaata?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `searchParams` await karte hi Next.js page ko Dynamic mark kar deta hai (output URL-dependent hai, pre-render impossible per-filter). Revalidate ka fayda tab hota jab sab visitors ko same HTML milta — yahan har filter-combination ka apna output hai, cache hit rare. Aur fresh listings chahiye (new job turant dikhe) — dynamic acceptable trade-off.

</details>

5. `filters.length > 0 ? { AND: filters } : undefined` — `undefined` kyun, khali `{}` kyun nahi?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Dono technically kaam karte hain, par intent clear hona chahiye: `undefined` = "koi filter nahi" (Prisma ignores), `{}` = empty condition object. Khali `AND: []` edge cases mein confusing hota hai (kai ORMs mein empty AND true/no-op ambiguity karta hai). Explicit undefined self-documenting hai — "filter nahi laga" padhta hai code mein.

</details>

---

Public listing side ready — browse, search, filter. Par card pe click karte hi `/jobs/frontend-developer-at-acme` pe 404 milega — woh page bana hi nahi. C.4 mein job detail page: dynamic `[slug]` route, `generateMetadata` se proper SEO tags, not-found handling, aur company logo ke saath `next/image`.
