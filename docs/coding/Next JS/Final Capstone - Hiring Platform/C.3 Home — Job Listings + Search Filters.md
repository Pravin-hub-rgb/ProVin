In C.2 the foundation was built — the project was created, connected to Neon, 4 tables migrated, and seed data (4 jobs, 2 companies, 1 scored application) was loaded into the database. The data was verified by querying the Neon SQL Editor. Now the first **user-facing page** — the home page. Whether a guest or a logged-in user, everyone sees the same thing first: featured jobs at the top, all jobs below, with a search bar and filters above.

This page teaches three concepts that repeat throughout the capstone:
1. **Server Component reads from Prisma, with relations** (using `include` — the pattern from 6.13.4).
2. **Page-level `searchParams`** — reading URL query filters like `?q=react&type=FULL_TIME` inside the page (new concept).
3. **Server-side filtering — without any "use client".**

# Hiring Platform — Part 3: Home Page

## Stage 1 — Static UI First (Always the Rule)

The golden rule — every project started with static UI first (Task Board in 6.13.2, Photo Gallery in 7.7.2). Why? The data layer connects later, but the **design decision happens now** — and you can see whether the data shape is right or not with hardcoded data.

First, think — what does a job card show? Look at the seed data (C.2): title, company name, logo, location, type badge, salary range, skills chips, featured badge. That's it.

**File:** `app/page.tsx` — replace the default content:

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

      {/* Filter bar — visual only for now */}
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

Key bits of the code:

- **`jobs.map()`** — maps over the hardcoded array, `key={job.id}` — the old friend from the React course.
- **The entire card is an `<a>` tag** — clicking anywhere navigates to `/jobs/[slug]` (built in C.4).
- **`{job.featured && (...)}`** — the conditional render (`&&`) pattern — the amber badge only on featured jobs.
- **`job.type.replace("_", " ").toLowerCase()`** — the DB value is `FULL_TIME`, rendering `"full time"` is more natural. This is exactly the point from C.2 — the enum's DB value ≠ the display label.
- **`job.salaryMin && ...` + `salaryMax!`** — guard for optional fields. The `!` (non-null assertion) is because of our rule that where there's a min there's a max too — telling TypeScript.
- **The form does nothing yet** — no `action` attribute; clicking Search triggers a GET form submit that reloads the same page. Intentional — the filters connect in the next stage.

**TEST:** `npm run dev` → `localhost:3000`. Two cards should render — Frontend Developer with the ★ Featured badge. Design look right? Time for real data.

## Stage 2 — Prisma Read (Replacing the Hardcoded Array)

This is the stage where every project swaps hardcoded data for database reads (6.13.4, 7.7.3).

**Concept recap:** The Server Component can `await` directly — no useEffect, no fetch, no loading state for the initial HTML (2.1). Import the Prisma singleton (`lib/prisma.ts`), run the query.

The relation question: the card needs `companyName` — but that's on the `Company` table, not `Job`. Bring related data with **`include`** (same pattern as boards+tasks in 6.13.4):

```tsx
// app/page.tsx
import prisma from "@/lib/prisma";                                        // NEW

export default async function Home() {                                   // NEW (async)
  const jobs = await prisma.job.findMany({                               // NEW
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],              // NEW
    include: { company: true },                                          // NEW
  });
  // ...JSX the same...
```

- **`async function Home()`** — the Server Component is now async — `await` is legal in its body.
- **`orderBy: [{ featured: "desc" }, { createdAt: "desc" }]`** — the exact use of the C.2 index. Featured jobs first, then newest. An array = multi-level sort.
- **`include: { company: true }`** — brings each job's full Company object alongside. Result: `job.company.name` is accessible.

In the JSX, the hardcoded field becomes a relation:

```tsx
{/* before: */}
<p className="text-sm text-gray-600">{job.companyName}</p>

{/* after: */}
<p className="text-sm text-gray-600">{job.company.name}</p>              // CHANGED
```

Other fields (`title`, `location`, `type`...) come straight off `job.` — they stay the same. Only the company line changed.

**TypeScript bonus:** Prisma Client auto-generates types onto `jobs` — hovering `job.company.name` shows the full type. No manual interface needed (Prisma's biggest perk — 6.13.3's point).

**TEST:** Save → page reload. Now **4 jobs** render (the seed ones), Frontend Developer first with the featured badge. If you get an error that `@/lib/prisma` isn't found — check the path alias (`tsconfig.json` has `"@/*": ["./*"]` by default in create-next-app).

## Stage 3 — searchParams: Reading URL Filters

The UI form is already there, but it does nothing. Now the real filtering concept.

**Problem:** The user types "React", selects FULL_TIME, clicks Search. What happens? The form submits — and the browser URL becomes:

```
localhost:3000/?q=React&type=FULL_TIME
```

HTML forms have built-in behavior: an `<input name="q">` value becomes `?q=value` in the URL. No JavaScript was written — **the browser builds the query string** on a GET form. All the page needs then is: *read what's in the URL, and apply those filters.*

**Concept — page-level `searchParams`:** Batch 4 showed URL parsing from inside a proxy (`request.nextUrl.searchParams.get(...)` — 4.4). There, you pulled it off the request object manually. App Router pages have a shorthand: Next.js passes every page a prop containing **all the current URL's query params**:

```tsx
// just to visualize — not the real code yet
export default async function Home({ searchParams }) {
  // searchParams = { q: "React", type: "FULL_TIME" }
  // if the URL has no ?q=... → {} (empty object)
}
```

A **critical Next.js 16 detail:** that prop is a **Promise** — you can't access `.q` directly, you have to `await` it first. Why a Promise? Streaming render optimization in Next.js — passing a Promise lets it not block rendering until query params are actually needed. The syntax:

```ts
const { q, type } = await searchParams;
```

And one side effect (recall 2.3's static-vs-dynamic): **a page that `await`s `searchParams` becomes Dynamic automatically.** It won't be pre-rendered at build time — every request server-renders it, since output depends on the URL. Takeaway: the home page is now dynamic — even without filters. Acceptable trade-off: a job board wants fresh listings on every request, not stale cache.

Now the code:

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

Step by step:

- **`type HomeProps`** — TypeScript typing: `searchParams` is a Promise of optional strings. The `?` — why? The param may or may not be present in the URL.
- **`await searchParams`** — Next 16 syntax; destructure `q`, `type` from it.
- **`filters` array builds gradually** — cleaner than ternary-in-object. Each condition pushes its own line. Both conditions true → both go into `AND`; neither → `where: undefined` (no filter, all jobs).
- **`{ contains: q, mode: "insensitive" }`** — a SQL `LIKE %q%` case-insensitive search. Type `"react"` → jobs whose skills include "React, TypeScript..." match.
- **`OR`** — title **or** skills. Checking both is more user-friendly.
- **Enum whitelist** — `type` comes from the URL, so it's **user-controlled string!** Someone can send `?type=HACKED`. Dropping `{ type }` directly into `where` makes Prisma throw a runtime error (invalid enum value) — an ugly 500. The whitelist check rejects invalid values → "no filter." That's input validation at the client/server boundary (8.2 in action).

### Making the Filter Form Work

A one-line change to the form:

```tsx
<form action="/" method="get" className="flex gap-2 mb-8">               // CHANGED
```

That's all? Yes. Here's what happens:

1. The user types "React", selects FULL_TIME, clicks Search.
2. The browser submits the GET form → URL: `/?q=React&type=FULL_TIME`.
3. Next.js re-renders the page, `searchParams` prop carries those values.
4. The `filters` logic turns them into a WHERE clause.
5. Filtered results render.

**Zero client-side JavaScript. Zero "use client". Zero state.** The whole flow runs on the server — this server-first thinking: if the server can do it, don't push it to the client (the entire course runs on this philosophy).

A small polish — the empty state (when no job matches):

```tsx
{jobs.length === 0 && (
  <p className="text-center text-gray-500 py-12">
    No jobs match your search. Try different keywords.
  </p>
)}
```

The count is already dynamic: the heading reads `{jobs.length} open positions` — the filtered count shows up automatically.

**TEST:**
1. `localhost:3000` — 4 jobs.
2. Search "React" — 2 jobs (Frontend Dev + Fullstack — both have React in skills).
3. Type = Internship — 1 job.
4. Manually type `?q=xyznothing&type=INTERNSHIP` in the URL — the empty state message appears.
5. Type `?type=HACKED` — no crash, all jobs show (the whitelist rejected the invalid value).

All pass? The home page is complete.

## One More Thing — `loading.tsx` (The Dynamic Page's Companion)

The page is dynamic now — each search takes a moment (the DB query). On a slow network, a blank screen is bad UX. Batch 1.4's convention — drop a `loading.tsx` at the folder root; Next.js auto-wraps the page in a Suspense boundary:

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

Skeleton cards (`animate-pulse` is Tailwind's shimmer) — make the layout as close to the real page as possible, so the swap feels smooth (no layout shift — CLS, a Batch 7 concept).

**TEST:** Submit a search, then slow down the network (DevTools → Network → Slow 3G) — the skeleton flashes before results arrive.

## Nutshell

Home page = **Server Component reads + server-side filters.** Static UI first (hardcoded array) → Prisma read (`findMany` + `orderBy` featured/newest + `include: company`) → **page-level `searchParams`** (a Promise! `await` it — that's Next 16) to read `q` and `type` → build a `Prisma.JobWhereInput[]` array → `where: { AND: filters }` or `undefined`. The **GET form** (`action="/" method="get"`) makes the browser build the query string — zero client JS. Awaiting `searchParams` makes the page Dynamic (2.3's rule, live). User-controlled enum validated by a whitelist. `loading.tsx` brings skeleton cards.

## What It Is NOT

- **`searchParams` prop is not the proxy's `searchParams`.** In the proxy (4.4), `request.nextUrl.searchParams` was a `URLSearchParams` object, read with `.get("q")`. The page prop is a plain object read with `searchParams.q`. Same name, different shape — context matters.
- **A GET form is not "old-school" —** it's the web's native pattern. Bookmarkable, shareable URLs (send a link to a filtered result!), zero JS, SEO-friendly. Modern SPAs try to rebuild this with client state + history API; here it's free on the server.
- **A Dynamic page is not "always slow."** Each request does render, but the Neon query is in milliseconds, and Vercel regions keep the rest fast. ISR (`revalidate`) only helps when every visitor gets the same HTML — here each filter-combination is its own output, so cache hits are rare. And fresh job listings are the point — a dynamic page is a fair trade.
- **Empty `where` (`undefined`) is not "rows without ordering."** If `where` is undefined there's no filter, but `orderBy` still applies. They're independent clauses.
- **The whitelist isn't "complete security."** It's one piece of input validation (reject the invalid enum). The whole security posture gets audited in C.11 — rate limiting, secret handling, trust boundaries.

---

**In Your Own Words**

1. With `<form method="get" action="/">`, how do filters flow — where's the JavaScript?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Nowhere. A GET form submission makes the browser build the URL itself — input field `name="q"` values go into `?q=...&type=...`. Next.js sees the new URL and re-renders the page, passing the values via `searchParams`. Our server code converts them into a Prisma WHERE clause. The whole flow is a native HTTP cycle — JavaScript only reaches the Tailwind styling.

</details>

2. Why does `searchParams` need to be `await`ed — what goes wrong without it?

<details>
<summary>Show Answer</summary>

**Sample Answer:** In Next.js 16, the prop is a Promise (streaming optimization — don't block rendering on URL parse). Without `await`, destructuring `Promise.q` yields `undefined` — the filters silently fail, or TypeScript catches the error first. After `await`, you have a plain `{ q?: string, type?: string }`.

</details>

3. Why the long `type === "FULL_TIME" || ...` check — why not just `{ type }` into the where?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `type` came from the URL — user-controlled. Someone can send `?type=XYZ` and Prisma would throw a runtime error on the invalid enum (a 500). The whitelist check treats unknown values as "no filter" — graceful degradation. Principle: input over the client/server boundary is always untrusted (8.2).

</details>

4. Why isn't this page Static — what breaks if you add `revalidate`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Awaiting `searchParams` marks the page Dynamic (output depends on the URL, can't pre-render per filter). Revalidate helps when all visitors see the same HTML — here every filter combination is a different output, so cache hits are rare. And fresh listings matter (a new job should show immediately) — dynamic is the right trade-off.

</details>

5. `filters.length > 0 ? { AND: filters } : undefined` — why `undefined`, not an empty `{}`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Both technically work, but intent should be explicit: `undefined` says "no filter" (Prisma skips it), while `{}` is an empty condition object. An empty `AND: []` is ambiguous in some ORMs. Writing `undefined` is self-documenting — the code reads "no filter applied."

</details>

---

The public side is ready — browse, search, filter. But clicking a card goes to `/jobs/frontend-developer-at-acme`, which 404s because that page doesn't exist yet. C.4 builds the job detail page: a dynamic `[slug]` route, `generateMetadata` for proper SEO tags, not-found handling, and the company logo with `next/image`.

We'll explore this in detail in the next topic.