C.9 ke end mein scores DB mein ban rahe the — par ek problem khuli thi: **employer ko applicants kahan dikh rahe hain?** Dashboard pe toh bas `{job._count.applications} applications` ka count hai. Click karke andar jaaye toh kya dekhe? Aaj woh page banayenge aur saath mein do bache hue production concepts:

1. **Authenticated file download** — C.8 ka promise poora karte hain: resume-view route jo session + ownership verify karke PDF stream karta hai
2. **Streaming with Suspense (7.5)** — stats section slow hai, applicants list fast hai — page turant dikhe, stats apni Suspense boundary mein baad mein aaye

Aur AI ka promised payoff: applicants **match-score se ranked**.

# Hiring Platform — Part 10: Applicants Dashboard

## Step 1 — Page + Ownership-Gated Query

**File:** `app/(employer)/jobs/[id]/page.tsx`

```tsx
// app/(employer)/jobs/[id]/page.tsx
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";
import { notFound } from "next/navigation";
import { StatsSection } from "./stats-section";

export default async function ApplicantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireRole("EMPLOYER");
  const { id } = await params;

  const jobId = Number(id);
  if (!Number.isInteger(jobId)) notFound();

  // Ownership guard — doosre employer ki job ka id daala toh 404
  const job = await prisma.job.findFirst({
    where: { id: jobId, company: { ownerId: session.user.id } },
    include: { company: true },
  });
  if (!job) notFound();

  const applications = await prisma.application.findMany({
    where: { jobId: job.id },
    orderBy: [
      { matchScore: { sort: "desc", nulls: "last" } },   // ranked — scored pehle
      { createdAt: "desc" },                              // tie-break: newest
    ],
    include: { candidate: true },
  });

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600 mb-6">
        {applications.length} applications · {job.location}
      </p>

      {/* Stats — alag section, streaming ke liye (Step 3) */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection jobId={job.id} />
      </Suspense>

      {/* Ranked list */}
      <div className="space-y-3 mt-8">
        {applications.length === 0 && (
          <p className="text-gray-500 text-center py-12">
            Abhi koi application nahi aayi.
          </p>
        )}
        {applications.map((app, index) => (
          <div
            key={app.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-bold w-6 text-center">
                {index + 1}
              </span>
              <div>
                <p className="font-medium">
                  {app.candidate.name ?? app.candidate.email}
                </p>
                {app.coverNote && (
                  <p className="text-sm text-gray-600 mt-0.5 max-w-md truncate">
                    "{app.coverNote}"
                  </p>
                )}
                <a
                  href={`/api/resumes/${app.id}`}
                  target="_blank"
                  className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                >
                  View Resume ↗
                </a>
              </div>
            </div>

            <div className="text-right">
              {app.matchScore !== null ? (
                <>
                  <span
                    className={`font-bold px-3 py-1 rounded-full ${
                      app.matchScore >= 70
                        ? "bg-green-100 text-green-800"
                        : app.matchScore >= 40
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {app.matchScore}/100
                  </span>
                  {app.matchReason && (
                    <p className="text-xs text-gray-500 mt-1 max-w-[240px]">
                      {app.matchReason}
                    </p>
                  )}
                </>
              ) : (
                <span className="bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded-full">
                  Not scored yet
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
```

Is page ke key decisions:

- **Ownership guard phir se query mein** — C.7 ka pattern (`company: { ownerId }`) — ab habit ban gayi hai: har employer-side data-access pe. Doosre employer `/jobs/42` type kare → `findFirst` null → **404**, "forbidden" nahi. 404 intentional hai — existence bhi leak na ho.
- **`orderBy` nulls-last** — `matchScore: { sort: "desc", nulls: "last" }` — scored applicants upar, unscored neeche (score-null wale C.8/C.9 ke edge-case survivors). Yeh Prisma ka dedicated syntax hai — SQL mein yeh chhupa trick hoti hai (`NULLS LAST`). Tie-break second key: same score → newest first.
- **Rank number `index + 1`** — UI-only ranking display; DB rank column nahi banaya (over-engineering).
- **Color-coded score buckets** (green/blue/red) — C.9 ke "buckets not precise-comparator" principle ka UI translation.
- **Resume link hamare internal route pe** — `/api/resumes/${app.id}` — Blob URL kahin nahi dikha. Ab woh route banate hain.

(`Suspense`/`StatsSkeleton` imports Step 3 mein — pehle resume route.)

## Step 2 — Resume Download Route: Authorization at Download-Time

C.8 ka design yaad karo: `resumeUrl` (Blob ka raw URL) DB ke siwa kahin expose nahi hota. Employer jab "View Resume" dabata hai, hamara route:

1. Session check — employer logged-in hai?
2. Ownership check — *yeh* application *us* employer ki job ki hai?
3. Sab pass → Blob se fetch karke stream

**File:** `app/api/resumes/[id]/route.ts`

```ts
// app/api/resumes/[id]/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user.role !== "EMPLOYER") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const applicationId = Number(id);
  if (!Number.isInteger(applicationId)) {
    return new Response("Not found", { status: 404 });
  }

  // Ownership: application → job → company → owner
  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      job: { company: { ownerId: session.user.id } },
    },
    select: { resumeUrl: true },
  });

  if (!application) {
    return new Response("Not found", { status: 404 });
  }

  // Server-side proxy fetch — raw URL client tak kabhi nahi jaata
  const blobRes = await fetch(application.resumeUrl);

  if (!blobRes.ok || !blobRes.body) {
    return new Response("File unavailable", { status: 502 });
  }

  return new Response(blobRes.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline',
      "Cache-Control": "private, no-store",
    },
  });
}
```

Chaar security-relevant lines samjho:

- **Nested ownership filter** — `job: { company: { ownerId } }` — teen tables ka chain **ek where-clause mein**. Junction relations ka poora fayda: koi manual multi-step verify nahi.
- **`select: { resumeUrl: true }`** — sirf needed field. PII discipline: candidate ka email/name is response mein jata hi nahi.
- **Proxy fetch + stream** — `fetch(blobRes)` ka body directly Response mein — Node stream pipe hota hai, poori file memory mein load NAHI hoti. Raw URL network tab mein bhi nahi dikhta (client ne sirf `/api/resumes/12` dekha).
- **`Cache-Control: private, no-store`** — shared/proxy caches resume ko cache na karein. Sensitive-file downloads ka standard header set.

**Test attack scenarios (khud karo):**
1. Logged-out → `/api/resumes/1` direct URL → 401
2. Candidate login karke → 401 (role gate)
3. Employer B (doosri company) → 404 (ownership gate)
4. Owner employer → PDF khulta hai ✓

Yeh chaar-line test suite hi is pattern ka ROI hai — interview mein "file authorization kaise handle karte ho" ka concrete jawab.

## Step 3 — Streaming Stats (7.5 Ka Real Use)

Ab stats section. Data pehle socho — employer kya jaanna chahgega?

- Total applications (already heading mein)
- **Average match score** — batch quality ka quick signal
- **Strong candidates count** (score ≥ 70) — interview-shortlist estimate

Aggregate query — Postgres group computation, rows badhne ke saath dheemi hogi. Perfect Suspense candidate.

**Concept recap (7.5):** `loading.tsx` **poore route** ka skeleton tha. `<Suspense>` boundary **section-level** control deti hai — page shell instantly render, slow child apne fallback ke saath stream hota hai. Ek hi page pe multiple boundaries bhi allowed — har section apni speed se.

**File:** `app/(employer)/jobs/[id]/stats-section.tsx`

```tsx
// app/(employer)/jobs/[id]/stats-section.tsx
import prisma from "@/lib/prisma";

export async function StatsSection({ jobId }: { jobId: number }) {
  const agg = await prisma.application.aggregate({
    where: { jobId },
    _count: { id: true },
    _avg: { matchScore: true },
  });

  const strongCount = await prisma.application.count({
    where: { jobId, matchScore: { gte: 70 } },
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border rounded-lg p-4">
        <p className="text-sm text-gray-500">Total</p>
        <p className="text-2xl font-bold">{agg._count.id}</p>
      </div>
      <div className="border rounded-lg p-4">
        <p className="text-sm text-gray-500">Avg Match</p>
        <p className="text-2xl font-bold">
          {agg._avg.matchScore !== null
            ? Math.round(agg._avg.matchScore)
            : "—"}
        </p>
      </div>
      <div className="border rounded-lg p-4">
        <p className="text-sm text-gray-500">Strong (70+)</p>
        <p className="text-2xl font-bold text-green-700">{strongCount}</p>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map((n) => (
        <div key={n} className="border rounded-lg p-4">
          <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
          <div className="h-7 bg-gray-200 rounded w-12" />
        </div>
      ))}
    </div>
  );
}
```

- **`aggregate()`** — DB-side math (`COUNT`, `AVG`). Saari applications JS mein laake `.length`/reduce karna beginner-trap hai — data badhta gaya toh request heavy hoti jayegi. Computation jahan data hai, wahin.
- **`_avg.matchScore: null` case** — zero applications ya sab unscored → AVG null → em-dash display. Honest empty-state.
- **Async component as child** — `StatsSection` ek normal async Server Component hai; parent page ne ise `<Suspense>` mein wrap kiya. Bas. Next.js khud isko separate stream chunk banata hai.
- **Skeleton same file mein** — chhota co-located piece; alag file banane ka ceremony zaroori nahi.

Page mein import fix:

```tsx
// app/(employer)/jobs/[id]/page.tsx — top:
import { Suspense } from "react";                                  // NEW
import { StatsSection, StatsSkeleton } from "./stats-section";     // CHANGED
```

**TEST (streaming dekhna):**

1. DevTools → Network → Slow 3G throttle ON
2. Applicants page kholo — **heading + ranked list turant**, stats jagah grey pulse
3. ~1-2 sec mein stats numbers pop (stream-in)
4. Throttle OFF — sab instant

Agar stats itni fast hai ki skeleton flash na dikhe — natural hai (dev data kam hai). Concept verify karne ke liye temporarily `await new Promise(r => setTimeout(r, 2000))` StatsSection mein daalo, dekho, hatao. (7.5 mein bhi yahi trick tha.)

## Nutshell

Applicants dashboard = **query-level ownership** (404-not-forbidden philosophy), **nulls-last ranked ordering** (`{ sort, nulls }` syntax), color-bucketed scores. Resume access = **authenticated proxy route**: session→role→nested-ownership-filter→select-minimal→stream-fetch, `no-store` headers — raw Blob URL kabhi client-touch nahi karta. Stats = **`aggregate()`/`count()`** (DB-side math) async-component ke roop mein, `<Suspense>` + co-located skeleton se section-level streaming — page shell instant, numbers apne time pe.

## What It Is NOT

- **404-on-other-employer's-job = "error message chhupana" nahi.** Deliberate information-boundary: 403 "exist karti hai par teri nahi" bolta hai; 404 kuch nahi bolta. Enumeration attacks (id=1,2,3... try karna) ko signal-less banata hai.
- **`_avg` = "statistically robust metric" nahi.** Do applications ka avg misleading hota hai. Production dashboards sample-size ke saath context dikhati ("avg of 2") — humne count card side mein rakha hi wajah se.
- **Proxy-stream = "performance overhead bekar mein" nahi.** Haan, bytes hamare server se transit karte hain (direct Blob URL se double-hop-ish). Price paid for: authorization-at-download, URL secrecy, revocability. Presigned URLs (S3) alternate trade-off point hai — short-lived tokens instead of proxy hop.
- **Suspense boundary = "loading.tsx ka replacement" nahi.** Route-level first-paint ke liye loading.tsx (C.3), section-level progressive reveal ke liye Suspense. Dono alag problems, dono tools bag mein rehte hain.
- **Rank #1 badge = "hire this person" nahi.** Score-ordering ek triage view hai — recruiter ka kaam accelerate karta hai, replace nahi karta. Wajah se har row mein reason-text saath hai.

---

**In Your Own Words**

1. Doosre employer ki job-id pe yeh page 404 deta hai, 403 nahi — kyun yeh choice?

<details>
<summary>Show Answer</summary>

**Sample Answer:** 403 confirm karta hai ki resource exist karti hai (attacker ko valid-id mapping milti jaati hai enumeration se); 404 existence ka signal bhi chhupa leta hai. Ownership-failures ko not-found treat karna standard hardening hai — unauthorized user ko authorized-user jaisa hi response mile, fark guess na ho.

</details>

2. `{ matchScore: { sort: "desc", nulls: "last" } }` ke bina default behavior kya hota — aur UX pe kya asar?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Default mein NULLS sort engine-dependent/ordering-ambiguous hote hain (Postgres DESC mein nulls pehle aate hain!) — matlab not-scored applicants top pe, scored neeche — bilkul ulta jo chahiye. Explicit nulls-last se triage order sahi: reviewed-upar, pending-neeche. Database quirks explicitly handle karna hi safe SQL ORM usage hai.

</details>

3. Resume-proxy route mein `select: { resumeUrl: true }` — bina select kya extra jaata aur yeh kyun matter karta hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Bina select poori Application row aati — candidate ka email/name, coverNote, timestamps sab. Response mein use nahi hota, par logs/error-dumps/accidental-response-modification mein leak surface badh jaata. Data-minimization: har layer sirf utna le jitna us layer ko chahiye (least-privilege, data-parity with need).

</details>

4. Stats ko Suspense mein daala — agar poore page ko hi loading.tsx se cover kar dete toh kya nuksaan?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Whole-route skeleton = users ko poori page ka intezar (slowest section jitna), phir ek saath sab content. Section-Suspense mein fastest content (list) instant dikhta hai — perceived performance dramatically better kyunki user ka primary task (applicants dekhna) block nahi hota. Progressive rendering = per-section honesty of progress.

</details>

5. `aggregate` vs saari applications fetch karke JavaScript mein average nikalna — kab JS-version acceptable hota?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Jab rows genuinely kam hon (tens/hundreds) aur values already UI ke liye fetched — duplicate query avoid hoti. Ya jab calculation DB express nahi kar sakta (custom scoring formula involving app logic). Scale rule: aggregation math data ke paas rakho; JS-side math sirf already-loaded-data pe ya non-expressible logic pe.

</details>

---

Employer ka poora toolkit ready hai: post (AI-assisted) → manage → boost (paid) → review (AI-ranked). Candidate ka bhi: browse → apply → track. App **functionally complete** hai — par "production-grade" ka matlab sirf features nahi. Ab C.11: capstone ki security pass — apply/AI endpoints pe **proxy rate-limiting** (Gemini free-quota protection!), env-vars audit, error-hierarchy check — Batch 4 aur Batch 8 ke concepts ek final sweep mein.
