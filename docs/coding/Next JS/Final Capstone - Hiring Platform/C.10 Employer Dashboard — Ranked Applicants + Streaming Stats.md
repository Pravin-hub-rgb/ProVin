The AI scoring from C.9 is running — a candidate applied, their resume is in storage, and now the match score gets written back to the application. But where does the employer actually *see* those applicants? The dashboard (C.6) only showed a count. The missing piece: a page per-job that lists every applicant, **ranked by score**, with a resume-view button that streams the PDF securely. This file also closes a promise from C.8: the `/api/resumes/[id]` authenticated download route.

Plus one production pattern that's been waiting: **section-level streaming with Suspense** (7.5), because the applicant list loads fast but the aggregate stats (average score, strong-candidate count) are a slower DB query — they shouldn't block the rest of the page.

# Hiring Platform — Part 10: Applicants Dashboard

## Step 1 — Page Setup + Ownership-Gated Query

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

  // Ownership guard — another employer's job id yields a 404, not a 403
  const job = await prisma.job.findFirst({
    where: { id: jobId, company: { ownerId: session.user.id } },
    include: { company: true },
  });
  if (!job) notFound();

  const applications = await prisma.application.findMany({
    where: { jobId: job.id },
    orderBy: [
      { matchScore: { sort: "desc", nulls: "last" } },   // ranked: scored first
      { createdAt: "desc" },                              // tie-break: newest first
    ],
    include: { candidate: true },
  });

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600 mb-6">
        {applications.length} applications · {job.location}
      </p>

      {/* Stats — a separate section, wrapped for streaming (Step 3) */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection jobId={job.id} />
      </Suspense>

      {/* Ranked list */}
      <div className="space-y-3 mt-8">
        {applications.length === 0 && (
          <p className="text-gray-500 text-center py-12">
            No applications for this job yet.
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

Key decisions on this page:

- **The ownership guard appears in the query again** — `findFirst({ where: { id, company: { ownerId } } })`. Another employer guessing an id (`/jobs/42`) → `findFirst` returns null → **404**, not 403. 404 is intentional — it doesn't confirm the job's existence (enumeration defense from C.7).
- **`orderBy` with nulls-last** — `{ matchScore: { sort: "desc", nulls: "last" } }`. Without it, Postgres sorts NULLs first in a DESC scan — unscored applications would float to the top, the opposite of what's wanted. Prisma's dedicated syntax for this. Tie-breaker: `createdAt desc` — same score, newest application first.
- **Row rank `index + 1`** — purely a display number; no rank column in the DB (over-engineering).
- **Score color buckets** — green (70+), blue (40-69), red (< 40). The UI translation of C.9's "buckets over precise comparators."
- **The resume link points at the internal route** — `/api/resumes/${app.id}`, never the raw Blob URL. That route is built next.

(`Suspense` and `StatsSkeleton` imports come in Step 3.)

## Step 2 — Resume Download Route: Authorization at Download-Time

Remember C.8's design: `resumeUrl` (the raw Blob URL) is never exposed. When an employer clicks "View Resume," this route runs:

1. Session check — is the viewer an employer?
2. Ownership check — does *this* application belong to *their* job?
3. If both pass — fetch from Blob and stream.

**File:** `app/api/resumes/[id]/route.ts`

```ts
// app/api/resumes/[id]/route.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Role gate
  const session = await auth();
  if (session?.user.role !== "EMPLOYER") {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2. Parse id + ownership check
  const { id } = await params;
  const applicationId = Number(id);
  if (!Number.isInteger(applicationId)) {
    return new Response("Not found", { status: 404 });
  }

  // Ownership via a nested relation filter:
  // application → job → company → owner
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

  // 3. Proxy-fetch from Blob and stream
  const blobRes = await fetch(application.resumeUrl);

  if (!blobRes.ok || !blobRes.body) {
    return new Response("File unavailable", { status: 502 });
  }

  return new Response(blobRes.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
      "Cache-Control": "private, no-store",
    },
  });
}
```

Four security-relevant lines:

- **Nested ownership filter** — `job: { company: { ownerId } }` — three tables joined in a single `where`. No separate "fetch then verify" step (no TOCTOU gap).
- **`select: { resumeUrl: true }`** — the minimal field. Not pulling candidate email/name/coverNote — PII discipline. The response contains only what's needed.
- **Proxy stream** — `blobRes.body` is piped straight into the `Response`. The file is never fully loaded into memory (streams work), and the raw Blob URL never reaches the browser. (A note on size: Blob stores are cheap and fast to fetch; for very large files this stays efficient.)
- **`Cache-Control: private, no-store`** — shared or proxy caches must not retain a resume. Standard for sensitive file downloads.

**Try the attack scenarios (do it yourself):**
1. Logged-out → `/api/resumes/1` → 401.
2. A candidate account → 401 (role gate).
3. Employer B (someone else's job) → 404 (ownership gate).
4. The owner employer → the PDF opens.

That four-line test suite is the ROI for this pattern — it's the concrete answer to "how do you authorize file downloads?"

## Step 3 — Streaming Stats (7.5's Real Use)

Now the stats section. What does an employer want to know?

- Total applications (already in the page heading).
- **Average match score** — a quick quality signal for the applicant pool.
- **Strong candidates count** (score ≥ 70) — a shortlist estimate.

These are aggregate queries — Postgres computes them in one pass, but they're still slower than the list query. A textbook Suspense candidate.

**Concept recap (7.5):** `loading.tsx` was a whole-route skeleton. A `<Suspense>` boundary gives **per-section** control — the page shell renders instantly, and only the slow section falls back to its own placeholder. Multiple independent boundaries on one page are allowed.

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
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="border rounded-lg p-4">
        <p className="text-sm text-gray-500">Total Applications</p>
        <p className="text-2xl font-bold">{agg._count.id}</p>
      </div>
      <div className="border rounded-lg p-4">
        <p className="text-sm text-gray-500">Average Match</p>
        <p className="text-2xl font-bold">
          {agg._avg.matchScore !== null
            ? `${Math.round(agg._avg.matchScore)}/100`
            : "—"}
        </p>
      </div>
      <div className="border rounded-lg p-4">
        <p className="text-sm text-gray-500">Strong Matches (70+)</p>
        <p className="text-2xl font-bold text-green-700">{strongCount}</p>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-col-3 gap-4 animate-pulse mb-8">
      {[1, 2, 3].map((n) => (
        <div key={n} className="border rounded-lg p-4">
          <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-7 bg-gray-200 rounded w-16" />
        </div>
      ))}
    </div>
  );
}
```

- **`aggregate()` + `count()`** — DB-side math (`COUNT`, `AVG`, `COUNT WHERE score >= 70`). Pulling all the rows into JS to sum them is a beginner's trap — it gets worse as the dataset grows.
- **`_avg.matchScore: null`** — either zero applications or all unscored. Displays a clean em-dash instead of `NaN` or a misleading number. Honest empty state.
- **Async component as a child** — `StatsSection` is a normal async Server Component. The parent wraps it in `<Suspense>` — Next.js streams it as a separate chunk automatically. Drop it in, it works.
- **Skeleton co-located** — no ceremony; the helper sits right next to the component.

Fix the import at the top of the applicants page:

```tsx
// app/(employer)/jobs/[id]/page.tsx — top:
import { Suspense } from "react";                                    // NEW
import { StatsSection, StatsSkeleton } from "./stats-section";       // CHANGED
```

**TEST (watch the streaming):**
1. DevTools → Network → throttle to "Slow 3G."
2. Open the applicants page — the heading + ranked list appear **immediately**; the stats area is grey pulses.
3. After ~1-2 seconds, the stat numbers stream in.
4. Turn throttling off — everything's instant.

If the stats are too fast to demo on a small dataset, temporarily inject `await new Promise((r) => setTimeout(r, 2000))` into `StatsSection`, watch the skeleton, then remove it. (Same trick from 7.5.)

## Nutshell

The applicants dashboard = **query-level ownership** (a wrong-owner job id yields a 404, not 403 — enumeration defense), **nulls-last ranked ordering** (the `{ sort, nulls }` syntax — NULLs would otherwise float to the top of a DESC scan), and color-bucketed scores. Resume access = **an authenticated proxy route**: session → role → nested ownership filter (`job.company.ownerId`) → `select`-minimal → streaming proxy fetch, with `Cache-Control: no-store`. Stats = **`aggregate()` / `count()`** (DB-side math, not JS-side iteration) rendered as an async child wrapped in `<Suspense>` with a co-located skeleton — the page shell is instant, stats arrive on their own schedule.

## What It Is NOT

- **404-on-another-employer's-job is not "hiding an error."** It's a deliberate information boundary: 403 confirms the resource exists (enumeration leaks valid ids); 404 reveals nothing. Returning not-found on ownership failure is standard hardening.
- **`_avg` is not "a statistically robust metric."** Two applications make an average misleading. Production dashboards show sample size ("avg of 2") — and the count card sits right next to it for that reason.
- **The proxy-stream is not "unnecessary overhead."** True — bytes transit our server (one extra hop vs. a direct Blob URL). The price buys authorization-at-download, URL secrecy, and revocation. Presigned URLs (S3) are a different trade-off for the same goal.
- **Suspense here is not "a replacement for `loading.tsx`."** `loading.tsx` (C.3) covers the whole route on first paint; Suspense covers a section that streams after the shell. Different problems, both tools in the belt.
- **The rank shown on the list is not "a stored column."** It's `index + 1` from the `orderBy` query — pure display. No rank column was added to the schema (no need, no over-engineering).

---

**In Your Own Words**

1. Why does this page return 404 (not 403) when another employer's job id is requested?

<details>
<summary>Show Answer</summary>

**Sample Answer:** A 403 explicitly confirms the resource exists (good for an enumeration attack — try id=1, 2, 3... until a 403 vs. a 404), while a 404 reveals nothing. Treating ownership failures as "not found" is standard hardening. The crucial part: the actual data is never returned either way — the 404 is just navigation, not the security boundary.

</details>

2. If `orderBy` didn't specify `nulls: "last"`, where would unscored applications sort, and why does it matter?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Postgres sorts NULLs first in a `DESC` scan by default — so unscored (pending) applications would float to the top, ahead of the highest-scoring candidates. That inverts the entire purpose of ranking. Explicit `nulls: "last"` pushes pending applications to the bottom, keeping reviewed/scored ones prioritized. Database sort behavior is often engine-dependent — always specify NULL placement explicitly.

</details>

3. In the resume proxy, why `select: { resumeUrl: true }` instead of fetching the whole application row?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Data minimization. The full row includes `coverNote`, `candidateId`, timestamps — none needed for a file download. Returning only `resumeUrl` shrinks the query and ensures PII like the cover note never sits in a handler's scope where it could be logged or accidentally returned. Least-privilege access: each layer fetches only what it needs.

</details>

4. If stats already loaded fast on a small dataset, when is Suspense still worth it?

<details>
<summary>Show Answer</summary>

**Sample Answer:** At scale. A production job might have 5,000 applicants — the `AVG`/`count` aggregates scan more rows and take longer. With Suspense, that slow query never blocks the list (which is what the employer came to see). At small scale it's invisible, which is fine — you're paying the streaming cost upfront so the architecture doesn't break later.

</details>

5. Why is the resume streamed (`Response(blobRes.body)`) rather than buffered in memory?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Buffering holds the entire file in memory simultaneously — on a serverless instance with a memory limit, a large or concurrent download set can trigger OOM kills. Streaming pipes byte-for-byte from the upstream response to the client: constant memory regardless of file size. It's also cheaper at scale (no full-file allocation). The pattern generalizes to any proxy/download handler.

</details>

---

With the applicants dashboard live, the capstone's **functional** scope is complete — every box from C.0 is filled. But "it works" and "it's production-grade" are still different. The final pass: **security hardening at scale** — rate limiting on the AI and apply endpoints (protecting the free-tier quota), a full env/secret sweep, and a proper error boundary hierarchy. This is C.11 — Batch 4's proxy deep-dive and Batch 8's security audit, now applied to a real application.

We'll explore this in detail in the next topic.