Home page ready hai — browse, search, filter sab chal raha hai. Par har card `/jobs/frontend-developer-at-acme` jaise URL pe le jaata hai — aur woh page exist hi nahi karta. Click karo → 404. Aaj woh fix karenge: **job detail page**.

Yeh file teen kaam karti hai jo poore course mein alag-alag seekhi thi:
1. **Dynamic route `[slug]`** — ek file, hazaar URLs (Batch 1 ka blog project isi pe bana tha)
2. **`generateMetadata`** — per-job SEO tags (2.4) — job board ke liye yeh feature nahi, **survival** hai: Google se traffic aata hai
3. **ISR (`revalidate`)** — fast static page jo khud refresh hota rahe (0.6 ka concept finally production mein)

# Hiring Platform — Part 4: Job Detail Page

## Stage 1 — Route + Static UI

**Concept:** File-based routing yaad hai (1.1)? `app/jobs/page.tsx` = `/jobs`. Dynamic segment (1.3): folder name square brackets mein — `app/jobs/[slug]/page.tsx` — bracket wala hissa variable ban jaata hai. `/jobs/frontend-developer-at-acme`, `/jobs/backend-intern-at-acme` — dono isi ek file se render honge, slug value prop mein milegi.

**File:** `app/jobs/[slug]/page.tsx` — pehle hardcoded ek job ke saath design dekho:

```tsx
// app/jobs/[slug]/page.tsx
const job = {
  title: "Frontend Developer",
  description:
    "Acme Corp ko React developer chahiye jo modern web apps banaye. Aap Next.js components, state management aur API integration handle karoge.",
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
        {/* Logo — abhi plain img, thodi der mein next/image */}
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

- **`whitespace-pre-line`** — description mein agar employer ne line breaks likhe hon (`\n`) toh render ho; bina iske sab ek paragraph ban jaata
- **`job.skills.split(",").map(...)`** — comma-separated string ko chips mein todna. `.trim()` zaroori — `"React, TypeScript"` split karne pe doosra item `" TypeScript"` (leading space ke saath) hota hai
- **Apply button abhi dummy href** — C.8 mein real route banega

**TEST:** `localhost:3000/jobs/kuch-bhi` — same hardcoded page har URL pe dikhega. Kyunki abhi slug padha hi nahi. Ab asli data + slug.

## Stage 2 — Params Se Real Job Nikaalna

**Concept:** `[slug]` folder ki value Next.js page ko `params` prop mein deta hai (1.3). Home ke `searchParams` jaisa hi **Next.js 16 twist**: `params` bhi **Promise** hai — await karna padega:

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

- **`await params`** — `{ slug }` destructured; URL `/jobs/frontend-developer-at-acme` pe slug = `"frontend-developer-at-acme"`
- **`findUnique({ where: { slug } })`** — slug pe unique constraint tha (C.2), isliye `findUnique` valid. Email-style lookup.
- **`include: { company: true }`** — logo + company naam ke liye (home wala hi pattern)

Ab hardcoded `const job = {...}` block delete karo. JSX same rahega — bas apply button ka href real slug se:

```tsx
<a
  href={`/jobs/${slug}/apply`}                                              // CHANGED
  ...
```

### Job Na Mile Toh?

URL galat slug ke saath aa sakta hai (`/jobs/nonsense-slug`). `findUnique` tab `null` return karta hai. Null JSX mein pass karo → `Cannot read properties of null` crash. Guard:

```tsx
import { notFound } from "next/navigation";                                 // NEW
// ...async function ke andar, findUnique ke turant baad:

if (!job) {                                                                 // NEW
  notFound();                                                               // NEW
}                                                                           // NEW
```

**`notFound()`** — 1.4 ka pattern: execution wahin rok deta hai aur nearest `not-found.tsx` render karta hai. Abhi humare paas default 404 hai — capstone ke end mein (C.11 audit) custom banayenge. Abhi kaafi hai.

TypeScript bonus: `notFound()` ka return type `never` hai — TS samajh jaata hai iske baad `job` non-null hai. Baaki JSX mein `job.` pe red squiggles nahi aayenge.

## Stage 3 — ISR: Fast Page Jo Khud Refresh Ho

Ab ek sochne wali sawaal. Is page mein `searchParams`/cookies kuch nahi — sirf `params`. Matlab Next.js ise **Static** render kar sakta hai (build time pe HTML pre-made — 0.x ka model). Par problem: build ke baad nayi job post hui toh?

Options the:

| Option | Kya hota | Problem |
|---|---|---|
| Poora Dynamic force karo | Har request pe DB query | Slow-ish, DB load — jabki job detail rarely badalti |
| Build-time static (default) | Ek hi baar query | Nayi jobs kabhi nahi dikhti — deal-breaker |
| **ISR (`revalidate`)** | Static HTML cache, X seconds baad auto-refresh | Best of both — fast + fresh-enough |

Job detail **rarely changes, heavily viewed** hota hai — ISR iska textbook use-case hai (0.6 ka theory ab production mein):

```tsx
// app/jobs/[slug]/page.tsx — component ke bahar, top-level
export const revalidate = 300;                                              // NEW
```

Ek line. Matlab: page pehli request pe render+cache hoga, agle 5 minute ke visitors ko cached HTML instant milega, 300s baad pehli request background mein fresh render trigger karegi (stale dikha ke refresh — stale-while-revalidate). Featured flag Stripe webhook se badle (C.7) toh bhi max 5 min mein update dikhega — acceptable.

> **Connection:** Home page dynamic tha (searchParams), detail page ISR hai — same app, per-route strategy. Yehi App Router ka selling point tha Module 0 se: *har route apni rendering strategy choose karta hai.*

## Stage 4 — generateMetadata: Per-Job SEO

**Problem:** Abhi browser tab mein har job ke liye same title dikhta hai. Aur Google ke liye bhi — `<title>` fixed hai, description generic. Shared listing Twitter/WhatsApp pe paste karo — preview card bland.

**Concept (2.4):** Static pages ke liye `export const metadata` object hota hai. Par hamara title **per-job** hai — function chahiye jo job dekh ke metadata banaye. Woh hai `generateMetadata` — params receive karta hai (page jaisa hi), Metadata object return karta hai, Next.js `<head>` mein daal deta hai:

```tsx
import type { Metadata } from "next";                                       // NEW

// ...revalidate export ke baad:

export async function generateMetadata(                                     // NEW
  { params }: JobDetailProps
): Promise<Metadata> {                                                      // NEW
  const { slug } = await params;                                            // NEW
  const job = await prisma.job.findUnique({                                 // NEW
    where: { slug },                                                        // NEW
    include: { company: true },                                             // NEW
  });                                                                       // NEW
                                                                            // NEW
  if (!job) return { title: "Job not found" };                              // NEW
                                                                            // NEW
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

- **Duplicated lookup** notice karo — `generateMetadata` aur page component dono `findUnique` chalate hain. Haan, do queries lagti hain. Dedupe patterns exist karte hain (React `cache()`), par abhi clarity > cleverness — aur ISR ke saath ye queries rare hi chalti hain (cached HTML).
- **`slice(0, 155)`** — Google meta description ~160 characters tak dikhata hai; lambi string truncate hogi anyway, hum clean cut karte hain
- **`openGraph`** — social media preview cards (WhatsApp/Twitter share) isi se bante hain
- **`if (!job)` guard yahan bhi** — warna `job.company.name` pe null crash metadata generation mein

**TEST:** DevTools mein page source dekho (`view-source:`) — `<title>Frontend Developer at Acme Corp</title>` + meta description dikhni chahiye. Alag job kholo — alag title. Yehi per-page SEO hai.

## Stage 5 — Company Logo with next/image

Abhi `<img>` hai — Batch 7 ka pehla lesson tha ki iske problems kya the (no optimization, no lazy loading, layout shift). Replace karo:

```tsx
import Image from "next/image";                                             // NEW

// JSX mein img tag ki jagah:
<Image
  src={job.company.logoUrl ?? ""}
  alt={`${job.company.name} logo`}
  width={64}
  height={64}
  className="w-16 h-16 rounded"
/>
```

Save karo → error! Console mein Next.js clearly batayega:

```
Error: Invalid src prop ... hostname "picsum.photos" is not configured under images in your next.config.ts
```

**Error aane do — explain karte hain.** `next/image` optimization server pe hoti hai (7.2) — server sirf allowlisted hosts se images fetch karta hai, warna SSRF-type abuse ho sakti hai (koi apni image URL se tumhare server ko kahin bhi bhejwa sake). Isliye remote host allowlist config mein declare hoti hai — 7.2 wala `remotePatterns`:

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

Dev server restart karo (config changes hot-reload nahi hote) — logo ab optimized `<img>` se render hoga: proper sizing, lazy load, WebP conversion.

Production thought (C.12 mein deploy karte waqt kaam aayega): real employers ke logos kahan se? Options — upload system (Vercel Blob, jaise resumes C.8) ya SaaS logo APIs (Clearbit etc.). Config mein unka hostname add hota. Pattern same rahega.

## Full Test Checklist

1. `/jobs/frontend-developer-at-acme` — poori job detail, logo visible
2. `/jobs/backend-intern-at-acme` — salary section hidden (null guard kaam kar raha)
3. `/jobs/nonsense` — 404 page (notFound() fire hua)
4. View-source — per-job title/description meta tags
5. WhatsApp/Twitter pe URL paste karo (agar public URL ho) — preview card title ke saath (openGraph)

## Nutshell

Job detail = **`[slug]` dynamic route** (1.3 pattern, `params` Promise — Next 16) + `findUnique({ where: { slug } })` + `include company`. Missing job → **`notFound()`** (TS ko bhi non-null pata chal jaata). Rarely-changed + heavily-viewed → **`export const revalidate = 300`** ISR — static speed, auto-refresh. Per-job SEO → **`generateMetadata`** (async, params await, Metadata return — title/description/openGraph). Remote logo → `next/image` + **`remotePatterns` allowlist** in `next.config.ts` (SSRF protection).

## What It Is NOT

- **`revalidate = 300` = "har 5 minute mein sab users ke liye re-render" nahi.** Cache 5 min tak serve hota raha; expiry ke baad **agle visitor** ko stale content milta hai jabki background mein fresh banta hai. Timer-driven cron nahi, request-triggered refresh hai.
- **`notFound()` = "return null ka fancy version" nahi.** Woh exception throw karta hai jo rendering rok deta hai aur 404 boundary tak jaata hai. Uske baad ka code execute hi nahi hota — isliye null-guard ka kaam bhi karta hai.
- **`generateMetadata` = "SEO ranking guarantee" nahi.** Sirf correct tags provide karta hai — raw material. Ranking content quality, backlinks, performance (Core Web Vitals) pe depend karti hai. Humne material diya, promise nahi.
- **`remotePatterns` = "ek baar ka setup" nahi.** Har naya image-host add hone pe config update + redeploy. Isliye user-generated images ke liye log Blob storage (same-domain URL) prefer karte hain — C.8 resume upload mein wahi hoga.
- **Do `findUnique` calls (metadata + page) = "bug" nahi.** Intentional simplicity hai; React `cache()` se dedupe ho sakta tha par abhi readability chuni. ISR ke saath cost negligible.

---

**In Your Own Words**

1. `params` aur `searchParams` — dono Promise props hain, par data source alag kaise?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `params` URL ka **path** se aata hai (`/jobs/[slug]` mein bracket segment ki actual value) — routing structure decide karti hai. `searchParams` URL ka `?key=value` part se aata hai — optional filters/query. Dono await hote hain (Next 16), par path-based identity vs query-based preference ka fark hai: slug = resource kaunsa, query = usko kaise filter/dekha jaye.

</details>

2. Job detail pe `revalidate = 300` chuna, par home dynamic rehne diya — decision ka reasoning kya tha?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Data-change frequency × view-frequency ka equation. Detail page: content rare change (edit/close), heavy views (SEO traffic) → ISR best — cached instant HTML, 5-min freshness. Home: har request pe filters alag ho sakte (query-dependent output) → caching per-combination useless, dynamic natural. Per-route strategy hi App Router ka core benefit hai.

</details>

3. `generateMetadata` mein bhi `if (!job) return {...}` kyun — page component mein toh already `notFound()` hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Dono functions independently run hote hain — metadata pehle generate hota hai (head ke liye), phir page render. Agar metadata wale function mein null-guard na ho toh `job.company.name` access pe crash ho jayega — notFound() page wale function mein hone se metadata wale ko protect nahi karta. Har async data-access function apna guard khud rakhta hai.

</details>

4. `remotePatterns` allowlist kyun hai — Next.js har host se image kyun nahi le leta?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Optimization server pe hoti hai — tumhara server user-supplied URL se image download karta hai. Unrestricted hota toh attacker arbitrary internal/cloud endpoints hit karwa sakta (SSRF — server-side request forgery) ya bandwidth abuse. Allowlist = explicit trust declaration. Config mein declared host = allowed, baaki sab reject — secure by default design.

</details>

5. Skills chips ke liye `split(",").map()` use kiya — agar employer skills field mein trailing comma daal de ("React, TypeScript,") toh kya hoga, kaise handle karoge?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Split karne pe last element empty string `""` banega — ek khali chip render hogi. Handle: `.filter(s => s.trim().length > 0)` map se pehle, ya seedha `split(",").map(s => s.trim()).filter(Boolean)`. Better fix source pe: create-job Server Action (C.6) mein input normalize karo — save se pehle hi trim/clean. Input pe control, output pe patch se behtar.

</details>

---

Public side complete — listings, filters, detail, SEO. Ab **kaam ka hissa**: login. Guest browse kar sakta hai, par post karne/apply karne ke liye auth chahiye — aur hamara auth simple login se aage hai: **roles**. C.5 mein GitHub OAuth + role selection + protected route groups — Batch 5 ke concepts capstone scale pe.
