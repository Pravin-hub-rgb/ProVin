The home page is ready — browsing, searching, filtering all work. But every card links to `/jobs/frontend-developer-at-acme`, a page that doesn't exist yet. Click the link → 404. Fix that now: the **job detail page**.

This file combines three concepts learned separately throughout the course:
1. **Dynamic routes `[slug]`** — one file, thousands of URLs (Batch 1's blog project was built on this).
2. **`generateMetadata`** — per-job SEO tags (2.4) — for a job board, this isn't a feature, it's **survival**: the traffic comes from Google.
3. **ISR (`revalidate`)** — a fast static page that refreshes itself (0.6's concept, finally in production).

# Hiring Platform — Part 4: Job Detail Page

## Stage 1 — Route Setup + Static UI

**Concept:** File-based routing (1.1)? `app/jobs/page.tsx` = `/jobs`. Dynamic segment (1.3): the folder name in square brackets — `app/jobs/[slug]/page.tsx` — the bracketed part becomes a variable. `/jobs/frontend-developer-at-acme`, `/jobs/backend-intern-at-acme` — both render from this one file, the slug value comes through the props.

**File:** `app/jobs/[slug]/page.tsx` — start with one hardcoded job to get the layout:

```tsx
// app/jobs/[slug]/page.tsx
const job = {
  title: "Frontend Developer",
  description:
    "Acme Corp needs a React developer to build modern web apps. You'll own Next.js components, state management, and API integration.",
  location: "Remote (India)",
  type: "FULL_TIME",
  salaryMin: 800000,
  salaryMax: 1400000,
  skills: "React, TypeScript, Next.js, Tailwind",
  featured: true,
  createdAt: new Date("2026-08-10"),
  company: {
    name: "Acme Corp",
    logoUrl: "https://picsum.photos/seed/acme/100",
  },
};

export default function JobDetailPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <div className="flex items-center gap-4 mb-6">
        {/* Logo — plain img for now, switch to next/image shortly */}
        <img src={job.company.logoUrl} alt="" className="w-16 h-16 rounded" />
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-600">{job.company.name}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-sm mb-6">
        <span className="bg-gray-100 px-3 py-1 rounded">
          📍 {job.location}
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded">
          {job.type.replace("_", " ").toLowerCase()}
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded">
          ₹{(job.salaryMin / 100000).toFixed(0)}–
          {(job.salaryMax / 100000).toFixed(0)} LPA
        </span>
        {job.featured && (
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded">
            ★ Featured
          </span>
        )}
      </div>

      <p className="text-gray-800 whitespace-pre-line leading-relaxed mb-8">
        {job.description}
      </p>

      <h2 className="font-semibold mb-2">Skills</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {job.skills.split(",").map((skill) => (
          <span
            key={skill.trim()}
            className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
          >
            {skill.trim()}
          </span>
        ))}
      </div>

      <a
        href={`/jobs/${"frontend-developer-at-acme"}/apply`}
        className="inline-block bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700"
      >
        Apply for this job
      </a>
    </main>
  );
}
```

Design decisions:

- **`whitespace-pre-line`** — if the employer wrote line breaks (`\n`) in the description, this renders them; without it the whole thing collapses into one paragraph.
- **`job.skills.split(",").map(...)`** — split the comma-separated string into chips. `.trim()` matters — `"React, TypeScript"` splits to the second item `" TypeScript"` (with a leading space).
- **The Apply button is a dummy href for now** — the real route is built in C.8.

**TEST:** `localhost:3000/jobs/anything` — the same hardcoded page renders for every URL (the slug isn't read yet).

## Stage 2 — Fetching the Real Job from Params

**Concept:** The `[slug]` folder's value is passed to the page in the `params` prop (1.3). Same Next.js 16 twist as the home page's `searchParams`: `params` is also a **Promise** — must `await`:

```tsx
type JobDetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function JobDetailPage({ params }: JobDetailProps) {   // CHANGED
  const { slug } = await params;                                             // NEW

  const job = await prisma.job.findUnique({                                  // NEW
    where: { slug },                                                         // NEW
    include: { company: true },                                              // NEW
  });                                                                        // NEW
```

- **`await params`** — destructured to get `slug`; URL `/jobs/frontend-developer-at-acme` gives slug = `"frontend-developer-at-acme"`.
- **`findUnique({ where: { slug } })`** — the `@unique` constraint on slug (C.2) is what makes `findUnique` valid. Same idea as an email lookup.
- **`include: { company: true }`** — the logo + company name (same pattern as the home page).

Remove the hardcoded `const job = {...}` block. The JSX stays the same — only the Apply button's href changes to use the real slug:

```tsx
<a
  href={`/jobs/${slug}/apply`}                                              // CHANGED
  ...
```

### What If the Job Doesn't Exist?

The URL can carry a wrong slug (`/jobs/nonsense-slug`). `findUnique` returns `null` in that case, and passing null to JSX → `Cannot read properties of null` crash. Guard against it:

```tsx
import { notFound } from "next/navigation";                                 // NEW
// ...inside the async function, right after findUnique:

if (!job) {                                                                 // NEW
  notFound();                                                               // NEW
}                                                                           // NEW
```

**`notFound()`** — the 1.4 pattern: it halts execution and renders the nearest `not-found.tsx`. Right now there's just the default 404 — a custom one is made at the end (C.11 audit). For now, it's enough.

**TypeScript bonus:** `notFound()`'s return type is `never` — TypeScript now knows that past this point, `job` is non-null. No red squiggles on `job.` in the rest of the JSX.

## Stage 3 — ISR: A Fast Page That Refreshes Itself

A question to think through. This page doesn't use `searchParams` or cookies — only `params`. That means Next.js **can render this statically** (pre-build the HTML at build time — Module 0's model). But the problem: after a build, a new job is posted — what then?

The options:

| Option | What it does | Problem |
|---|---|---|
| Force fully dynamic | DB query on every request | A bit slower, DB load — when a job detail rarely changes |
| Build-time static (default) | Query once at build time | New jobs never appear — a dealbreaker |
| **ISR (`revalidate`)** | Cache the static HTML, auto-refresh after N seconds | Best of both — fast + fresh-enough |

A job detail **is rarely changed but heavily viewed** — ISR is its textbook use case (0.6's theory, now in production):

```tsx
// app/jobs/[slug]/page.tsx — at the top level, outside the component
export const revalidate = 300;                                              // NEW
```

One line. It means: the first request renders + caches, the next 5 minutes every visitor gets cached HTML instantly, and after 300 seconds the first request triggers a background refresh (stale-while-revalidate — show stale, refresh in background). If the featured flag changes via the Stripe webhook (C.7), it takes at most 5 minutes to update — acceptable.

> **Connection:** The home page is dynamic (because of `searchParams`), the detail page is ISR — all within the same app. This is App Router's core selling point from Module 0: **every route can choose its own rendering strategy.**

## Stage 4 — generateMetadata: Per-Job SEO

**Problem:** The browser tab shows the same generic title for every job. Google sees the same — `<title>` is fixed, description is generic. Paste the link on WhatsApp/Twitter — the preview card is bland.

**Concept (2.4):** Static pages use `export const metadata` — an object. But our title is **per-job** — a function is needed that reads the job and builds the metadata. That's `generateMetadata` — it receives `params` (just like the page component), returns a `Metadata` object, and Next.js injects it into the `<head>`:

```tsx
import type { Metadata } from "next";                                       // NEW

// ...after the revalidate export:

export async function generateMetadata(                                     // NEW
  { params }: JobDetailProps
): Promise<Metadata> {                                                      // NEW
  const { slug } = await params;                                            // NEW
  const job = await prisma.job.findUnique({                                 // NEW
    where: { slug },                                                        // NEW
    include: { company: true },                                             // NEW
  });                                                                       // NEW

  if (!job) return { title: "Job not found" };                              // NEW

  return {                                                                  // NEW
    title: `${job.title} at ${job.company.name}`,                           // NEW
    description: job.description.slice(0, 155),                             // NEW
    openGraph: {                                                            // NEW
      title: `${job.title} at ${job.company.name}`,                         // NEW
      description: job.description.slice(0, 155),                           // NEW
    },                                                                      // NEW
  };                                                                        // NEW
}                                                                           // NEW
```

- **Notice the duplicated lookup** — both `generateMetadata` and the page component run `findUnique`. Yes, two queries. Deduplication patterns exist (React's `cache()`), but for now clarity > cleverness — and with ISR, these queries are infrequent (cached HTML).
- **`slice(0, 155)`** — Google displays meta descriptions around 160 chars; a longer string gets truncated anyway, so it's cut cleanly here.
- **`openGraph`** — social preview cards (WhatsApp/Twitter shares) come from here.
- **The `if (!job)` guard here too** — otherwise `job.company.name` crashes during metadata generation.

**TEST:** In DevTools, view the page source (`view-source:`) — you should see `<title>Frontend Developer at Acme Corp</title>` + a meta description. Open a different job — a different title. That's per-page SEO.

## Stage 5 — Company Logo with next/image

It's currently a plain `<img>` — Batch 7's opening lesson was about the problems with that (no optimization, no lazy loading, layout shift). Replace it:

```tsx
import Image from "next/image";                                             // NEW

// In the JSX, replace the img tag:
<Image
  src={job.company.logoUrl ?? ""}
  alt={`${job.company.name} logo`}
  width={64}
  height={64}
  className="w-16 h-16 rounded"
/>
```

Save → error! The console says:

```
Error: Invalid src prop ... hostname "picsum.photos" is not configured under images in your next.config.ts
```

**Let it error — we'll explain.** `next/image` optimization happens server-side (7.2) — the server only fetches from allowlisted hosts; otherwise SSRF-type abuse is possible (someone could make your server fetch from anywhere on the internet). That's why remote hosts must be declared — the `remotePatterns` from 7.2:

**File:** `next.config.ts`

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
```

Restart the dev server (config changes don't hot-reload) — the logo now renders as an optimized `<img>`: correct sizing, lazy load, WebP conversion.

**Production thought** (pays off in C.12 deploy): where do real employers' logos come from? Either an upload system (Vercel Blob, like resumes in C.8) or a logo API (Clearbit etc.). Add that hostname to the config. The pattern stays the same.

## Full Test Checklist

1. `/jobs/frontend-developer-at-acme` → full detail, logo visible.
2. `/jobs/backend-intern-at-acme` → salary section hidden (null guard works).
3. `/jobs/nonsense` → 404 page (`notFound()` fired).
4. View source → per-job title/description meta tags.
5. Paste the URL on WhatsApp/Twitter (if public) → preview card with title (openGraph).

## Nutshell

Job detail = **`[slug]` dynamic route** (1.3 pattern — `params` is a Promise, await it, Next 16) + `findUnique({ where: { slug } })` + `include: company`. Missing job → **`notFound()`** (TypeScript also learns it's non-null past that line). Rarely-changed + heavily-viewed → **`export const revalidate = 300`** ISR — static speed, auto-refresh. Per-job SEO → **`generateMetadata`** (async, await params, return a Metadata object: title/description/openGraph). Remote logo → `next/image` + **`remotePatterns` allowlist** in `next.config.ts` (SSRF protection).

## What It Is NOT

- **`revalidate = 300` is not "re-render for all users every 5 minutes."** The cache serves until expiry; after expiry the **next visitor** gets stale content while the fresh version generates in the background. Request-triggered, not timer-driven.
- **`notFound()` is not "a fancy null return."** It throws a special exception that halts rendering and jumps to the 404 boundary. Code after it doesn't execute — which is also what makes the null guard work.
- **`generateMetadata` is not "an SEO ranking guarantee."** It only supplies the right tags — raw material. Ranking depends on content quality, backlinks, performance (Core Web Vitals). We're providing the material, not a promise.
- **`remotePatterns` is not "one-time setup."** Every new image host needs a config update + redeploy. That's why user-generated images prefer Blob storage (same-domain URLs, as resumes do in C.8).
- **The two `findUnique` calls (metadata + page) are not "a bug."** Intentional simplicity; React's `cache()` could deduplicate, but for now readability wins — and with ISR the cost is negligible.

---

**In Your Own Words**

1. `params` and `searchParams` — both are Promise props, but what's their data source difference?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `params` comes from the URL **path** (`/jobs/[slug]` — the actual bracketed segment). `searchParams` comes from the URL **query string** (`?key=value`). Both are awaited (Next 16), but purpose differs: path-based = which resource (the slug selects a job), query-based = how to view it (filters/search). The slug determines identity; the query filters and views.

</details>

2. Choosing `revalidate = 300` on the detail page but leaving the home page dynamic — what's the reasoning?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The data-change-frequency × view-frequency equation. The detail page: content rarely changes, heavily viewed (SEO traffic) → ISR is ideal — cached instant HTML, refreshed every 5 minutes. The home page: each request can carry different filters (URL-dependent output) → caching per combination is pointless, dynamic is natural. And fresh listings matter (a new job shows immediately) — dynamic is the right trade-off.

</details>

3. `generateMetadata` has its own `if (!job) return {...}` — the page component already calls `notFound()`, so why the guard here too?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The two functions run independently — metadata generates first (for the `<head>`), then the page component renders. Without the null guard in `generateMetadata`, `job.company.name` crashes during metadata generation; the page-level `notFound()` doesn't protect the metadata function. Every async data-access function keeps its own guard.

</details>

4. Why the `remotePatterns` allowlist — why can't `next/image` just load from any host?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Image optimization runs on your server — your server downloads the image from whatever URL the user gave. Without restrictions, an attacker could point that at anything on the internet (SSRF — server-side request forgery) or burn your bandwidth. The allowlist is an explicit trust declaration. Only declared hosts are permitted — secure by default.

</details>

5. The skill chips use `split(",").map()` — if the employer types a trailing comma ("React, TypeScript,") what happens, and how would you handle it?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Splitting yields an empty string `""` as the last element — an empty chip renders. Fix with `.filter((s) => s.trim().length > 0)` before the map, e.g. `split(",").map((s) => s.trim()).filter(Boolean)`. Even better: normalize the input at the source — the create-job Server Action (C.6) cleans before saving. Control input, don't patch output.

</details>

---

The public side is complete — listings, filters, detail page, SEO. But so far you can only **look.** To post a job you need an employer; to apply you need a candidate — that's authorization. Batch 5 built Auth.js + GitHub OAuth (Login Demo v2), but that app asked only *"is the user logged in?"* The capstone asks more: **"who is logged in — an EMPLOYER or a CANDIDATE?"** That role layer is built in C.5.

We'll explore this in detail in the next topic.