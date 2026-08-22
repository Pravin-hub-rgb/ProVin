Employer side poori ho gayi — post, manage, boost. Ab coin ka doosra pehlu: **candidate**. Journey simple dikhne wali hai — job detail → Apply button → form bhara → submit — par is flow ke andar capstone ke **do sabse interesting technical pieces** hain:

1. **File upload** — resume PDF browser se lekar durable storage tak. Serverless pe file system nahi likh sakte (`fs.writeFile` Vercel pe read-only!) — toh files kahan jaati hain? **Object storage** (Vercel Blob).
2. **Private files** — resume sensitive document hai. Koi bhi URL guess karke kisi ka resume nahi khol sakta chahiye. Download ko **authentication ke peeche** rakhna hai.

Aur ek chhota lekin pyaara detail: **duplicate apply guard** — C.1 mein jo `@@unique([jobId, candidateId])` design kiya tha, aaj woh live fire hoga.

# Hiring Platform — Part 8: Apply Flow + Resume Upload

## Step 0 — Vercel Blob Setup

**Concept pehle:** Storage ke teen options aur serverless reality:

| Option | Serverless pe? | Kyun |
|---|---|---|
| Local disk (`fs.writeFile`) | ❌ | Vercel functions ka filesystem **read-only** hai; containers ephemeral hain — agle request pe file gayab |
| Database (byte column) | ⚠️ technically haan | Multi-MB PDFs DB mein bloat queries/backups — anti-pattern |
| **Object storage (Blob/S3)** | ✅ | Files ke liye bana hai: cheap, durable, HTTP se accessible |

Vercel Blob = Vercel ka S3-style object storage. Setup:

1. Vercel dashboard (Batch 8 wala account) → **Storage** tab → **Create Database → Blob**
2. Store banao → **`.env.local`** tab se token copy karo:

```env
BLOB_READ_WRITE_TOKEN=vercel-blob-token
```

```bash
npm install @vercel/blob
```

Token server-only rahega (no `NEXT_PUBLIC_` — same 8.1 rule). Uploads hamare **Server Action** se honge — client kabhi direct Blob touch nahi karta.

> **S3 comparison box:** AWS S3 industry-standard hai, Vercel Blob usi ka managed-simple version. API concepts identical — put/get/delete, paths, access control. Yahan Blob kyunki Vercel deploy ke saath zero-config hai (C.12 mein env var auto-link ho jayegi).

## Step 1 — Apply Page: Guards Pehle, Form Baad Mein

**File:** `app/jobs/[slug]/apply/page.tsx`

Apply page teen guards ke baad hi form dikhayega — order matter karta hai:

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
  const session = await requireRole("CANDIDATE");          // login + role gate
  const { slug } = await params;

  const job = await prisma.job.findUnique({
    where: { slug },
    include: { company: true },
  });
  if (!job || !job.open) notFound();                       // job gate

  const existing = await prisma.application.findUnique({   // duplicate gate
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
            Aap apply kar chuke ho ✓
          </p>
          <p className="text-sm text-green-700 mt-1">
            Status dekho{" "}
            <a href="/applications" className="underline">
              My Applications
            </a>{" "}
            mein.
          </p>
        </div>
      ) : (
        <ApplyForm jobId={job.id} jobTitle={job.title} />
      )}
    </main>
  );
}
```

Teen gates, teen alag outcomes:

- **`requireRole("CANDIDATE")`** — guest/employer yahan aa hi nahi sakte (login ya cross-redirect)
- **`!job || !job.open`** — closed/galat job ka apply form exist hi nahi karta → 404
- **Duplicate check** — **compound unique ka named lookup!** Prisma composite unique fields ko `@@unique([jobId, candidateId])` → accessor naam `jobId_candidateId` banata hai. Mila → friendly "already applied" card (form ki jagah).

Ek design note: duplicate check yahan **UX-level** hai (form chhupana). **DB-level guard** (`@@unique`) phir bhi zinda hai — agar race mein do tabs khul gaye ya action direct call hua, insert fail hoga. Dono layers apna kaam karti hain (C.1 Q2 wali kahani ab concrete).

## Step 2 — Upload Ka Concept: FormData Mein File

React course mein forms handle kiye — text inputs. File thoda alag hai:

- `<input type="file">` — browser file-picker kholta hai
- Form submit hone pe file **FormData ka hissa** ban jaati hai — text values jaisi hi, bas type `File` hota hai
- Server Action ko woh `File` object milta hai — uska `.size`, `.type`, `.name`, aur content stream

Matlab: koi base64 encoding, koi alag upload-endpoint, koi XHR progress-bar nahi chahiye beginner flow ke liye. Ek normal form, Server Action, done. (Large-file UX — progress %, resumable — advanced topic; 2MB resumes ke liye simple flow perfect.)

## Step 3 — ApplyForm Client Component

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

  if (state?.ok) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <p className="font-medium text-green-800">Application submitted! 🎉</p>
        <p className="text-sm text-green-700 mt-1">
          AI abhi aapka resume is job se match kar raha hai — score kuch der
          mein{" "}
          <a href="/applications" className="underline font-medium">
            My Applications
          </a>{" "}
          mein dikhega.
        </p>
      </div>
    );
  }

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

Chhoti cheezein jo dhyan mangti hain:

- **`accept="application/pdf"`** — picker PDFs filter karta hai. **Yeh convenience hai, validation NAHI** — koi bhi file manually drag/select kar sakta hai. Real check server pe (agle step).
- **Success-state replace** — form gayab, green card. Match score ka promise isi card mein — C.9 usko poora karega.
- **Hidden jobId** — URL se nahi, prop se aaya; action mein bhi phir verify hoga.

## Step 4 — applyAction: Validate → Upload → Insert

Asli kaam. **File:** `app/jobs/[slug]/apply/actions.ts`

```ts
// app/jobs/[slug]/apply/actions.ts
"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB bytes mein

type ApplyState =
  | { ok: true }
  | { ok: false; error: string };

export async function applyAction(
  _prev: ApplyState,
  formData: FormData
): Promise<ApplyState> {
  // ---- Guard 1: session + role ----
  const session = await auth();
  if (session?.user.role !== "CANDIDATE") {
    return { ok: false, error: "Sirf logged-in candidates apply kar sakte hain." };
  }

  // ---- Guard 2: inputs ----
  const jobId = Number(formData.get("jobId"));
  const coverNote = ((formData.get("coverNote") as string) ?? "").trim();
  const resume = formData.get("resume") as File | null;

  if (!Number.isInteger(jobId) || jobId <= 0) {
    return { ok: false, error: "Invalid job." };
  }
  if (!resume || resume.size === 0) {
    return { ok: false, error: "Resume PDF required hai." };
  }

  // ---- Guard 3: file validation (client accept= bypass-able) ----
  if (resume.type !== "application/pdf") {
    return { ok: false, error: "Sirf PDF files allowed hain." };
  }
  if (resume.size > MAX_SIZE) {
    return { ok: false, error: "File 2MB se choti honi chahiye." };
  }

  // ---- Guard 4: job open hai? ----
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || !job.open) {
    return { ok: false, error: "Yeh job applications accept nahi kar rahi." };
  }

  // ---- Upload to Blob ----
  let resumeUrl: string;
  try {
    const blob = await put(`resumes/${crypto.randomUUID()}.pdf`, resume, {
      contentType: "application/pdf",
    });
    resumeUrl = blob.url;
  } catch {
    return { ok: false, error: "Upload fail hua. Dobara try karo." };
  }

  // ---- DB insert ----
  try {
    await prisma.application.create({
      data: {
        coverNote: coverNote || null,
        resumeUrl,
        jobId: job.id,
        candidateId: session.user.id,
        // matchScore/matchReason abhi null — C.9 AI bhar dega
      },
    });
  } catch (err: unknown) {
    // Duplicate apply race — DB @@unique ne roka
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      err.code === "P2002"
    ) {
      return { ok: false, error: "Aap is job pe apply kar chuke ho." };
    }
    console.error(err);
    return { ok: false, error: "Kuch galat ho gaya. Dobara try karo." };
  }

  revalidatePath("/applications");
  return { ok: true };
}
```

Flow ko todo-mei todo samjho:

1. **Char guards sequence mein** — session/role → basic input sanity → file type/size → job state. Har fail pe early-return friendly message. Server pe yeh order cheap-se-expensive hai: pehle free string checks, DB query end mein — fail-fast saves work.
2. **`formData.get("resume") as File | null`** — file input FormData mein `File` instance deta hai. `.size` (bytes), `.type` (MIME string) available.
3. **`crypto.randomUUID()`** — collision-impossible filename. Do candidates dono `resume.pdf` upload karein — ek doosre ko overwrite NAHI karenge. Path structure (`resumes/`) bucket organization ke liye.
4. **P2002 catch** — C.6 mein slug-retry kiya tha; yahan retry galat hota (user intent hi duplicate hai) — isliye friendly error. Same constraint, context-based handling!
5. **`redirect` ka istemal nahi kiya** — C.6 se fark notice karo. Wahan success pe dashboard jaana tha (page navigation). Yahan form hi success-card mein replace hota hai (SPA feel). Dono valid patterns — UX goal decide karta hai.

### Resume Private Kaise Raha?

Abhi toh Blob public URL dega (`blob.url`)! Sach bolte hain — us URL se koi bhi file khol sakta hai agar pass ho. Humne do mitigation layers rakhe hain:

1. **Unguessable path** — UUID pathname se URL brute-force practically impossible
2. **URL kahin expose nahi hota** — `resumeUrl` sirf DB mein hai; employer ko kabhi raw Blob URL nahi denge. Download hamesha hamare **authenticated route handler se** hoga — C.10 mein jab employer applicants dekhega, resume-view link `/api/resumes/[id]` jaisa hoga jo session + ownership verify karke hi content stream karta hai.

Honest trade-off note: Vercel Blob ka native private-access mode bhi evolve ho raha hai; humara auth-proxy pattern har object storage pe portable hai (S3 presigned URLs bhi isi problem ka solution hain — different mechanism, same goal: *authorization at download-time*). Interview gold: "storage security = upload-time + download-time dono."

## Step 5 — My Applications Page

Candidate ka home-base. **File:** `app/(candidate)/applications/page.tsx`:

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
          Abhi koi application nahi.{" "}
          <a href="/" className="underline">
            Jobs browse karo
          </a>
          .
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
                <p className="text-xs text-gray-500 mt-1">
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

- **Reverse relation query** — C.6 mein employer→jobs nikale the (`company.ownerId`); ab user→applications (`candidateId`). Same table, dusra direction — junction table ka fayda.
- **Nested include** — application → job → company, teen levels ek call mein.
- **`matchScore !== null` ternary** — C.9 ke liye teaser: score aane pe blue badge, warna pulsing "Scoring..." placeholder.

**TEST checklist:**

1. Incognito → apply button dabao → login pe redirect (guest gate)
2. Employer se login → `/jobs/[slug]/apply` → cross-redirect dashboard (role gate)
3. Candidate bano → apply → PDF choose → submit → green success card
4. Dobara same job pe → "already applied" card (page-level guard)
5. 3MB file → "2MB se choti" error; .docx rename karke .pdf → MIME check pakad lega (type browser se aata hai actual content se)
6. Neon SQL Editor: `SELECT "resumeUrl" FROM "Application";` — UUID-path wala Blob URL pada hai
7. `/applications` — nayi entry, pulsing "Scoring..."

## Nutshell

Apply flow = **4-layer guard** (role → inputs → file type/size → job-open) + **FormData-native upload** (file input = File object in SA, no extra machinery) + **Vercel Blob put** (UUID path, server-only token) + DB insert with **P2002-as-friendly-error** (same constraint, C.6 se opposite handling — retry vs reject, context decides). Security model: upload validated server-side, resume URL never exposed — download-time authorization C.10 ke proxy-route se. Page pe teen gates (role → job-exists/open → duplicate) har ek apna outcome deta hai: redirect/404/friendly-card.

## What It Is NOT

- **`accept="application/pdf"` = security nahi.** Picker filter hai. Server-side MIME + (production-me) magic-byte sniffing hi asli validation. Frontend attributes = UX polish, backend checks = enforcement.
- **Blob public URL = "leak ho gaya toh kya farak" nahi sochna.** Unguessable ≠ inaccessible-by-design. Isliye defense-in-depth: URL kabhi share nahi hota, downloads auth-proxy se. Agar kal URL kahin log ho jaye, exposure surface minimal hai.
- **2MB limit = "arbitrary restriction" nahi.** Serverless function memory/time limits, abuse prevention (koi 500GB movie na bhej de), aur storage cost — teeno ka balance. Real products limits ko config me rakhte hain.
- **Duplicate-check page pe = "poora solution" nahi.** Woh UX refinement hai. Guarantee DB constraint deti hai. UI checks help users, constraints protect data — roles confuse mat karo.
- **"Scoring..." placeholder = fake spinner nahi.** Honest state hai — score genuinely pending hai (C.9 mein compute hoga). UI truthfully incomplete-process dikhati hai.

---

**In Your Own Words**

1. Serverless pe `fs.writeFile('/tmp/resume.pdf')` kyun fail hota hai production mein — dev machine pe chalta bhi hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Dev mein localhost ek persistent machine hai — file wahi rehti hai. Production serverless mein function instances ephemeral hain — request khatam, container recycle ho sakta hai; agli request shayad doosre instance pe chale jahan file hai hi nahi. Aur Vercel ka deploy filesystem immutable/read-only hota hai. Durable data ke liye external systems: DB ya object storage.

</details>

2. `@@unique([jobId, candidateId])` ne yahan do alag jagah kaam kiya — kaunse, aur dono ka experience kaisa tha?

<details>
<summary>Show Answer</summary>

**Sample Answer:** (1) Page-level `findUnique({ where: { jobId_candidateId: {...} } })` — pre-check jo form ko "already applied" card se replace karta hai (smooth UX). (2) Action-level P2002 catch — race/direct-call case mein hard guarantee. Pehla optimization hai, doosra enforcement. Dono ka source same constraint — ek schema decision ne UX + integrity dono diye.

</details>

3. Resume ka Blob URL employer ko direct kyun nahi de sakte — aur hum de rahe hain kis cheez se replace karke (C.10 preview)?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Raw URL share hota toh employer forward/save kar sakta, browser history/cache mein rehta, link kabhi expire nahi hota — candidate ka control zero. Replace: internal route `/api/resumes/[applicationId]` jo har request pe session + ownership verify karke stream karta hai. Access revocable, auditable, candidate-scoped. Authorization download-ke-time pe hoti hai, upload-pe-ek-baar nahi.

</details>

4. `put()` call try-catch mein hai par DB insert ka error alag handle hota hai — agar Blob succeed hua par DB insert P2002 se fail hua, kya bacha hoga storage mein? Acceptable hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Orphan blob bachega — storage pe file, DB mein record nahi. Acceptable-ish trade-off: rare case, harmless (koi reference nahi, koi access nahi), cleanup cron se ho sakta hai. Ulta order worse hota (DB pehle → upload fail = broken resumeUrl pointing nowhere). Rule: side-effect order such that most-likely-to-fail-cheap thing first; orphan cleanup strategy document karo.

</details>

5. `pending` state mein submit button disable — par file upload slow ho toh user refresh maar de? Kya hoga, kya hota chahiye?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Refresh = request cancel; state unknown — ho sakta hai blob upload ho chuka ho par insert nahi (ya dono adhoore). Retry safe hai kyunki duplicate P2002 catch hai (worst case friendly error). Behtar UX: optimistic lock/pending-record ya client-side upload-progress. Minimum bar jo humne rakha: operations idempotent-ish + errors graceful — data corruption nahi, worst case orphan file.

</details>

---

Application DB mein hai, resume Blob pe — par woh "Scoring..." pulse abhi hamesha pulsing rahegi. C.9 mein capstone ka signature feature: **AI Match Score** — apply ke turant baad Gemini resume-content aur job-description ko compare karega, score + reasons DB mein save karega. Structured JSON output maangna, prompt-design scoring ke liye, aur AI-fail-hone pe graceful degradation — teen production lessons.
