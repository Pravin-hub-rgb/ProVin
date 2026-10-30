The employer side is done — posting (AI-assisted), managing, boosting (paid). Now the other half of the marketplace: **the candidate.** The user journey looks simple — job detail → Apply button → fill form → submit — but two of the capstone's most technical pieces live inside it:

1. **File upload** — a resume PDF travels from the browser to durable storage. In serverless, the local filesystem is read-only and ephemeral (no `fs.writeFile` on Vercel!) — files go to **object storage**: Vercel Blob.
2. **Private files** — a resume is sensitive. A URL anyone can guess must never open another candidate's resume. Downloads stay **behind authentication**.

Plus C.1's most interesting design goes live: the **duplicate-apply guard** — `@@unique([jobId, candidateId])` stops the same person applying twice, at the database level.

# Hiring Platform — Part 8: Apply Flow + Resume Upload

## Step 0 — Vercel Blob Setup

**Concept first:** Storage options on serverless:

| Option | Serverless-safe? | Why |
|---|---|---|
| Local disk (`fs.writeFile`) | No | Vercel functions share a read-only filesystem; containers are ephemeral — the next request may run on an instance where the file never existed. |
| Database (byte column) | Technically yes, but bad | Multi-MB PDFs bloat queries and backups — an anti-pattern. |
| **Object storage (Blob / S3)** | Yes | Built for this: cheap, durable, HTTP-accessible. |

Vercel Blob is Vercel's S3-style object store. Setup:

1. The Vercel dashboard (Batch 8's account) → **Storage** tab → **Create Database → Blob**.
2. Create a store → copy the token from the `.env.local` tab.

```env
BLOB_READ_WRITE_TOKEN=<vercel-blob-token>
```

```bash
npm install @vercel/blob
```

The token stays server-only (no `NEXT_PUBLIC_` — same 8.1 rule). Uploads happen from **Server Actions** — the client never touches Blob directly.

> **S3 comparison note:** S3 is the industry standard; Vercel Blob is its managed-simple cousin. The API concepts are identical (put/get/delete, paths, access control). Blob is chosen here because it links to a Vercel deploy with zero config (C.12).

## Step 1 — Apply Page: Guards First, Then Form

**File:** `app/jobs/[slug]/apply/page.tsx`

Three guards, in order, before the form is shown:

```tsx
// app/jobs/[slug]/apply/page.tsx
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";
import { notFound } from "next/navigation";
import { ApplyForm } from "./apply-form";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await requireRole("CANDIDATE");          // guard 1: role
  const { slug } = await params;

  const job = await prisma.job.findUnique({
    where: { slug },
    include: { company: true },
  });
  if (!job || !job.open) notFound();                       // guard 2: job exists + open

  const existing = await prisma.application.findUnique({   // guard 3: duplicate
    where: {
      jobId_candidateId: {
        jobId: job.id,
        candidateId: session.user.id,
      },
    },
  });

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-1">Apply: {job.title}</h1>
      <p className="text-gray-600 mb-8">{job.company.name}</p>

      {existing ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <p className="font-medium text-green-800">
            You've already applied ✓
          </p>
          <p className="text-sm text-green-700 mt-1">
            Track your status in{" "}
            <a href="/applications" className="underline">
              My Applications
            </a>
            .
          </p>
        </div>
      ) : (
        <ApplyForm jobId={job.id} />
      )}
    </main>
  );
}
```

Three gates, three outcomes:

- **`requireRole("CANDIDATE")`** — guests or employers can't get here (redirect to login or cross-redirect).
- **`!job || !job.open`** → `notFound()`: a wrong slug or a closed job renders nothing (404). The detail-page banner in C.7 told them it's closed; here there's no Apply button anyway.
- **Duplicate check** — **a compound-unique named lookup in action.** Prisma turns `@@unique([jobId, candidateId])` from C.2 into an accessor named `jobId_candidateId`. Hitting that combination again → a friendly "you already applied" card instead of the form.

Design note: the page-level check is **UX refinement** (hide the form). The **real guarantee** is still the DB constraint — if a race slips through (two tabs, or a direct action call), the insert fails. Two layers, same source of truth (C.1's Question 2, now concrete).

## Step 2 — The Concept of a File Upload: FormData and the File Object

The React course covered form handling — text inputs. Files are slightly different:

- An `<input type="file">` opens the browser's file picker.
- On form submit, the file becomes **part of the FormData** — just like a text value, except its type is `File`.
- The Server Action receives that `File` object: it has `.size`, `.type`, `.name`, and the content as a stream.

That's it — no base64, no separate upload endpoint, no XHR progress bar (that's an advanced concern). A plain form + a Server Action handles a 2 MB resume fine.

## Step 3 — The ApplyForm (Client Component)

**File:** `app/jobs/[slug]/apply/apply-form.tsx`

```tsx
// app/jobs/[slug]/apply/apply-form.tsx
"use client";

import { useActionState } from "react";
import { applyAction } from "./actions";

type ApplyState =
  | { ok: true }
  | { ok: false; error: string }
  | null;

export function ApplyForm({
  jobId,
  jobTitle,
}: {
  jobId: number;
  jobTitle: string;
}) {
  const [state, formAction, pending] = useActionState<ApplyState, FormData>(
    applyAction,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="jobId" value={jobId} />

      {state && !state.ok && (
        <p className="bg-red-50 text-red-700 border border-red-200 rounded px-3 py-2 text-sm">
          {state.error}
        </p>
      )}

      <label className="block">
        <span className="text-sm font-medium">
          Why are you a good fit? (optional)
        </span>
        <textarea
          name="coverNote"
          rows={4}
          placeholder={`2-3 lines about your experience relevant to ${jobTitle}...`}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Resume (PDF, max 2MB) *</span>
        <input
          type="file"
          name="resume"
          accept="application/pdf"
          required
          className="mt-1 w-full border rounded px-3 py-2 file:mr-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 file:px-3 file:py-1"
        />
      </label>

      <button
        disabled={pending}
        className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium disabled:opacity-50"
      >
        {pending ? "Submitting application..." : "Submit Application"}
      </button>
    </form>
  );
}
```

## Step 4 — `applyAction`: Validate → Upload → Insert

The Server Action. Four guard layers, then the upload-and-persist:

**File:** `app/jobs/[slug]/apply/actions.ts`

```ts
// app/jobs/[slug]/apply/actions.ts
"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

type ApplyState =
  | { ok: true }
  | { ok: false; error: string };

export async function applyAction(
  _prev: ApplyState,
  formData: FormData
): Promise<ApplyState> {
  // Guard 1: session + role
  const session = await auth();
  if (session?.user.role !== "CANDIDATE") {
    return { ok: false, error: "Only logged-in candidates can apply." };
  }

  // Guard 2: input sanity
  const jobId = Number(formData.get("jobId"));
  const coverNote = ((formData.get("coverNote") as string) ?? "").trim();
  const resume = formData.get("resume") as File | null;

  if (!Number.isInteger(jobId) || jobId <= 0) {
    return { ok: false, error: "Invalid job." };
  }
  if (!resume || resume.size === 0) {
    return { ok: false, error: "A resume PDF is required." };
  }

  // Guard 3: file validation (the accept= attribute is bypassable)
  if (resume.type !== "application/pdf") {
    return { ok: false, error: "Only PDF files are allowed." };
  }
  if (resume.size > MAX_SIZE) {
    return { ok: false, error: "File must be smaller than 2MB." };
  }

  // Guard 4: is the job still open?
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || !job.open) {
    return { ok: false, error: "This job is no longer accepting applications." };
  }

  // Upload to Blob
  let resumeUrl: string;
  try {
    const blob = await put(`resumes/${crypto.randomUUID()}.pdf`, resume, {
      contentType: "application/pdf",
    });
    resumeUrl = blob.url;
  } catch {
    return { ok: false, error: "Upload failed. Try again." };
  }

  // DB insert
  try {
    await prisma.application.create({
      data: {
        coverNote: coverNote || null,
        resumeUrl,
        jobId: job.id,
        candidateId: session.user.id,
        // matchScore/matchReason — null for now; C.9 fills them in
      },
    });
  } catch (err: unknown) {
    // Duplicate apply — the @@unique constraint caught the race
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      err.code === "P2002"
    ) {
      return { ok: false, error: "You've already applied to this job." };
    }
    console.error(err);
    return { ok: false, error: "Something went wrong. Try again." };
  }

  revalidatePath("/applications");
  return { ok: true };
}
```

Read the flow:

1. **Four guards in sequence** — role → input sanity → file type/size → job-open. Each fails fast with a friendly message. Order is cheapest-first: string checks before the DB call.
2. **`formData.get("resume") as File | null`** — a file input yields a `File` object; `.size` is in bytes, `.type` is the MIME string.
3. **`crypto.randomUUID()`** — a collision-proof filename. Two candidates both naming a file `resume.pdf` won't overwrite each other. The `resumes/` prefix is just path bucketing.
4. **P2002 in the insert** — the same constraint handling as C.6, but here it **rejects** (returns a friendly error) because a duplicate application *should not* succeed. Context decides: slugs can be suffixed; duplicate apps can't.
5. **No `redirect()` here** — on success, the form component swaps to a success state (an SPA feel). C.6 redirected on success because it navigated away; here we stay and show confirmation. Both valid — the UX goal decides.

### How Resumes Stay Private

Right now `put()` returns a **public** Blob URL. Left exposed, anyone with the link could read a resume. Two mitigation layers:

1. **Unguessable path** — the UUID pathname makes brute-forcing the URL practically impossible.
2. **The URL is never handed out.** `resumeUrl` lives only in the DB; the employer never sees the raw Blob URL. Downloads always go through our **authenticated route** — `/api/resumes/[applicationId]` — which verifies the session and ownership before streaming the file (that route is in C.10).

Honest trade-off: modern object stores have native private-access modes, but the auth-proxy pattern is portable across all of them (S3 presigned URLs solve the same problem differently — authorization at download time, not upload time). Interview gold: "file security = upload-time validation + download-time authorization."

## Step 5 — The "My Applications" Page

The candidate's home base. **File:** `app/(candidate)/applications/page.tsx`

```tsx
// app/(candidate)/applications/page.tsx
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";

export default async function ApplicationsPage() {
  const session = await requireRole("CANDIDATE");

  const applications = await prisma.application.findMany({
    where: { candidateId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      job: { include: { company: true } },
    },
  });

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No applications yet.{" "}
          <a href="/" className="underline">
            Browse jobs
          </a>.
        </p>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <a
                  href={`/jobs/${app.job.slug}`}
                  className="font-medium hover:underline"
                >
                  {app.job.title}
                </a>
                <p className="text-sm text-gray-600">{app.job.company.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Applied {app.createdAt.toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="text-right">
                {app.matchScore !== null ? (
                  <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">
                    {app.matchScore}/100 match
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded-full animate-pulse">
                    Scoring...
                  </span>
                )}
                <p className="text-xs text-gray-500">
                  {app.status.toLowerCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
```

- **A reverse relation query** — C.6 fetched `employer → jobs` (`company.ownerId`); here it's `user → applications` (`candidateId`). Same join table, other direction — the junction-table payoff.
- **Nested include** — `application → job → company`, three levels in one query.
- **`matchScore` ternary** — the teaser for C.9: a real score shows as a blue badge; otherwise a pulsing "Scoring..." placeholder (the score computes right after this page renders).

## Test Checklist

1. Incognito → hit an Apply button → redirected to login (guest gate).
2. Log in as an employer → go to `/jobs/[slug]/apply` → cross-redirect to dashboard (role gate).
3. Log in as a candidate → apply → select a PDF → submit → green success card.
4. Try the same job again → the "already applied" card (page-level guard).
5. A 3 MB file → "smaller than 2MB"; a renamed `.docx` as `.pdf` → MIME check catches it (the type comes from the file's actual content type, sent by the browser).
6. In the Neon console: `SELECT "resumeUrl" FROM "Application";` — a UUID-path Blob URL is there.
7. `/applications` — the row appears with the pulsing "Scoring..." placeholder.

## Nutshell

The apply flow = **multi-layer guards** (role → inputs → file type/size → job-open, cheapest-first) + **native FormData upload** (a file input is a `File` object in the Server Action; no extra machinery) + **Vercel Blob** (`put` with a `crypto.randomUUID()` path, server-only token) + **DB insert with a dual-purpose P2002** (here it rejects a duplicate application with a friendly error — opposite of C.6's retry, same constraint). Security: validation at upload time, the raw Blob URL never exposed — downloads go through the auth-proxy route in C.10. The page has three gates (role → job-exists-and-open → duplicate), each with its own outcome (redirect / 404 / friendly card).

## What It Is NOT

- **`accept="application/pdf"` is not security.** It's a picker convenience filter. The real check is server-side MIME validation (and in production, magic-byte sniffing). Frontend attributes are UX polish; backend is enforcement.
- **An unguessable Blob URL is not "secure by design."** Unguessable ≠ unfindable. That's why defense-in-depth: the URL is never shared, and downloads are proxied. If a URL ever leaked, exposure surface is minimized.
- **The 2 MB limit is not "arbitrary."** It balances serverless function limits, abuse prevention (no 500 GB videos), and storage cost. Real products make it configurable.
- **The page-level duplicate check is not "the whole solution."** It's UX smoothing. The DB constraint is the guarantee. UI checks inform the user; constraints protect the data — don't conflate them.
- **The "Scoring..." placeholder is not "a fake spinner."** It truthfully reflects a pending state — the AI hasn't scored yet. Honest loading states beat fake-sophisticated ones.

---

**In Your Own Words**

1. Why can't a Server Action write a resume to the local filesystem (`fs.writeFile`) in production?

<details>
<summary>Show Answer</summary>

**Sample Answer:** On Vercel (and most serverless platforms), the function filesystem is read-only and ephemeral. Even `/tmp` isn't shared across invocations — the next request might land on a different instance where the file never existed. The file would vanish instantly. Durable data must go to external storage (DB or Blob); the local filesystem is for build artifacts only.

</details>

2. The `@@unique([jobId, candidateId])` constraint is handled in two places — how, and what does each protect?

<details>
<summary>Show Answer</summary>

**Sample Answer:** (1) On the apply *page*, a `findUnique` using the named accessor `jobId_candidateId` — a pre-check that hides the form and shows "already applied." UX-level. (2) In the apply *Server Action*, the insert is attempted and a `P2002` error is caught — returns a friendly error if the race slipped through (two tabs, or a direct action call). Enforcement-level. Same constraint, two purposes: smooth UX and hard data integrity.

</details>

3. After a candidate uploads, the resume URL is technically public (Blob). The page shows the employer a resume-view link (`/api/resumes/...`) instead — how does that keep it private?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The raw Blob URL is never exposed — it stays only in the database. The employer clicks `/api/resumes/[applicationId]`, a Route Handler that checks the session (employer?) and ownership (does this application belong to *their* job?), and only then proxies the file from Blob to the browser. The candidate controls who downloads, when; revocation is as simple as removing access. Upload-time validation + download-time authorization — that's the full model.

</details>

4. The apply action uploads to Blob first, *then* inserts the row — if the insert fails (e.g. P2002), an orphan file is left in storage. Is that acceptable?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Acceptable, yes — here's why. The alternative (insert first, upload after) leaves a `resumeUrl` pointing to nothing if the upload fails — a broken reference that's harder to repair. An orphan Blob file costs pennies and is invisible (no DB reference, no access path). The rule: do the step most likely to fail and cheapest to skip *last*-ish, but keep references intact. An orphan-file cleanup job (a one-liner `npx` script) resolves it; a broken reference would require a migration.

</details>

5. Why doesn't the apply success redirect to `/applications` (refresh the list) — instead, the form swaps to a success message?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because the AI scoring hasn't finished — redirecting to `/applications` would show the pulsing "Scoring..." state and the user might think it broke. The inline success card sets expectations ("AI is scoring — check back in a bit") while still in context. C.10's `revalidatePath("/applications")` then ensures the list is fresh next time the user navigates there. UX goal: reassure in-place, not navigate-and-hope.

</details>

---

The full candidate loop is closed: a candidate applies, uploads their resume, gets a score, and tracks status. The employer side sees those applicants with scores, ranked. But "Scoring..." pulses forever until the AI actually runs — and that's the capstone's signature feature. **C.9** adds the AI match score: on the moment of applying, Gemini reads the uploaded PDF resume and compares it against the job description — returning a 0–100 score plus a human-readable reason, all written back to the application row.

We'll explore this in detail in the next topic.