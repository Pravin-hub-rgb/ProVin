At the end of C.5, the employer was fully set up — GitHub login, role = EMPLOYER, a company row in the DB, a protected `(employer)` section with the header nav. That nav had a link that went nowhere: **Post Job**. That's the page we build now — and not just boring CRUD: the capstone's **first AI feature** is in this form. The employer types a title and skills, clicks a button, and **Gemini** drafts the full job description. Server Actions + the external API + `useActionState` for feedback — three concepts at once.

This file combines: (1) calling an LLM API from the server — the production pattern, (2) `useActionState` form feedback at scale (3.4.12), and (3) real-world unique-slug handling.

# Hiring Platform — Part 6: Post Job + AI JD Generator

## Step 0 — A Small Placeholder: Basic Dashboard

In the C.5 test flow, `/dashboard` showed the header but the body 404'd (`(employer)/dashboard/page.tsx` didn't exist yet). The post-job flow needs its feedback loop: *post a job → it should appear somewhere.* A basic dashboard first — C.7/C.10 enhance it with featured badges, stats, and ranked applicants.

```tsx
// app/(employer)/dashboard/page.tsx
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";

export default async function DashboardPage() {
  const session = await requireRole("EMPLOYER");

  const jobs = await prisma.job.findMany({
    where: { company: { ownerId: session.user.id } },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Jobs</h1>
        <a
          href="/post-job"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium"
        >
          + Post Job
        </a>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500 py-12 text-center">
          No jobs posted yet. Post your first job!
        </p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <span className="font-medium">{job.title}</span>
                <span className="text-gray-500 text-sm ml-2">
                  {job.location}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {job._count.applications} applications
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

Two new Prisma bits:

- **`where: { company: { ownerId: session.user.id } }`** — a relation filter: "jobs whose company belongs to this employer." The ownership-filtering foundation (reused in C.7/C.10).
- **`include: { _count: { select: { applications: true } } }`** — an aggregate count. You don't need the full applications array, just the count. `_count.applications` gives the number.

**TEST:** `/dashboard` — the seed's Acme jobs won't show (your company is different!). The empty state renders with "+ Post Job." A clean starting point.

## Step 1 — Gemini Setup: Key + Install + Env

A free API key comes from Google AI Studio:

1. Go to **aistudio.google.com**, sign in with your Google account.
2. Left sidebar → **Get API key** → **Create API key**.
3. Copy the key (shown only once!).

Install the SDK:

```bash
npm install @google/genai
```

Put it in `.env.local` (below the auth vars from Batch 5):

```env
GEMINI_API_KEY=<the-key-from-ai-studio>
```

**Rule 8.1 in action:** No `NEXT_PUBLIC_` prefix — this variable exists **server-side only.** If it reached the client bundle, anyone could drain your quota or bill you.

### The Concept of an LLM Call (Understand It Once, Properly)

The LLM doesn't run on your box — **Gemini is a hosted API**, just like a weather API. The flow:

```
Browser (form)
   │  Server Action call
   ▼
Our Next.js Server
   │  HTTPS POST + prompt + GEMINI_API_KEY
   ▼
Google's servers (Gemini model)
   │  generated text response
   ▼
Our Server ──► response → UI/DB
```

- No model download, no GPU — just an HTTP request.
- **Free tier:** the flash models ship with per-minute/per-day limits — enough for capstone testing. Cross a limit and the API returns an error (C.11 puts a rate-limit guard on top).
- **Cost philosophy:** paid models are pennies per call, but free-tier is the best way to learn.

> **Provider swap note:** the code barely changes across providers. OpenAI or Groq also expose OpenAI-compatible APIs — swap the SDK (`openai` package), set the `baseURL`, drop in your key, rename the model. The pattern is identical: send a prompt, get text back. Internalize the pattern — it transfers across vendors.

## Step 2 — The AI Wrapper: `lib/gemini.ts`

Scattering SDK calls everywhere isn't clean — one wrapper file centralizes config + prompt logic (and testability).

```ts
// lib/gemini.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateJobDraft(
  title: string,
  skills: string
): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
You are an expert technical recruiter writing job descriptions.

Write a job description for this role:
- Title: ${title}
- Required skills: ${skills}

Requirements:
- 3 short paragraphs, plain text only (no markdown, no bullet points)
- Paragraph 1: what the person will do day-to-day
- Paragraph 2: what we're looking for (skills/experience)
- Paragraph 3: one line selling the role
- Professional but friendly tone, max 150 words total
`,
  });

  return response.text ?? "";
}
```

Three prompt-engineering basics visible here:

1. **Assign a role** — "You are an expert recruiter" — gives the model context, cuts generic AI babble.
2. **Specify structure** — the order of paragraphs, tone, word limit — or you get 5 bullets one time and an essay the next (inconsistent output).
3. **Format constraint** — "plain text only" — the output goes into a `<p>`; markdown asterisks render raw and ugly.

**`response.text`** — the SDK's shortcut property; the generated string. Can be `null` (edge cases) → `?? ""`.

**Quick test (the wrapper alone):** run an inline script:

```bash
npx tsx --env-file=.env.local -e "
import { generateJobDraft } from './lib/gemini';
const d = await generateJobDraft('React Dev', 'React, TypeScript');
console.log(d);
"
```

The console should print a professional 3-paragraph description. If there's an error, check the key and model name. (Quick check done? Onward.)

## Step 3 — The Generate Action: Guard + Error Shape

The SDK is never called from the client — keys leak, CORS, abuse surface. A Server Action is the gatekeeper:

**File:** `app/(employer)/post-job/actions.ts`

```ts
// app/(employer)/post-job/actions.ts
"use server";

import { auth } from "@/auth";
import { generateJobDraft } from "@/lib/gemini";

type GenState =
  | { ok: true; draft: string }
  | { ok: false; error: string };

export async function generateDescriptionAction(
  _prev: GenState | null,
  formData: FormData
): Promise<GenState> {
  // Server-side guard — a visible button is not security (C.5's rule)
  const session = await auth();
  if (session?.user.role !== "EMPLOYER") {
    return {
      ok: false,
      error: "Only employers can use AI generation.",
    };
  }

  const title = (formData.get("title") as string)?.trim() ?? "";
  const skills = (formData.get("skills") as string)?.trim() ?? "";

  if (!title || !skills) {
    return { ok: false, error: "Enter a title and skills first." };
  }

  try {
    const draft = await generateJobDraft(title, skills);
    return { ok: true, draft };
  } catch {
    return {
      ok: false,
      error: "AI is busy right now. Try again in a minute.",
    };
  }
}
```

Deliberate patterns here:

- **`(prev, formData)` signature + typed return** — the `useActionState` contract (3.4.12).
- **Discriminated union `GenState`** — `{ ok: true, draft }` or `{ ok: false, error }`. On the client, `if (state.ok)` narrows the type — `state.draft` is a compile error in the failure branch. Cleaner than string-typing `"error"` / `"success"` fields.
- **try/catch around the AI call** — network failure, quota exceeded, model down — all collapse into a friendly message. **Raw errors never reach users** (8.x: stack traces can leak secrets too).

## Step 4 — The Create Action: Validation + Slug + P2002

Now the real mutation — persisting the job. Add this alongside in the same file:

```ts
// app/(employer)/post-job/actions.ts — extend the imports:
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const VALID_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type CreateState = { error: string } | null;

export async function createJobAction(
  _prev: CreateState,
  formData: FormData
): Promise<CreateState> {
  const session = await auth();
  if (session?.user.role !== "EMPLOYER") {
    return { error: "Unauthorized" };
  }

  const company = await prisma.company.findUnique({
    where: { ownerId: session.user.id },
  });
  if (!company) {
    return { error: "Company profile missing — complete onboarding first." };
  }

  // The form always sends strings; convert types here
  const title = ((formData.get("title") as string) ?? "").trim();
  const description = ((formData.get("description") as string) ?? "").trim();
  const location = ((formData.get("location") as string) ?? "").trim();
  const skills = ((formData.get("skills") as string) ?? "").trim();
  const typeRaw = (formData.get("type") as string) ?? "";
  const salaryMin = Number(formData.get("salaryMin"));
  const salaryMax = Number(formData.get("salaryMax"));

  // Validation — HTML attributes can be bypassed; the server is the final gate (8.2)
  if (!title || !description || !skills) {
    return { error: "Title, description, and skills are required." };
  }
  if (!VALID_TYPES.includes(typeRaw)) {
    return { error: "Invalid job type." };
  }
  const type = typeRaw as (typeof VALID_TYPES)[number];

  let salaryMinVal: number | null = null;
  let salaryMaxVal: number | null = null;
  if (formData.get("salaryMin")) {
    if (Number.isNaN(salaryMin) || salaryMin <= 0)
      return { error: "Salary min must be a positive number." };
    salaryMinVal = salaryMin;
  }
  if (formData.get("salaryMax")) {
    if (Number.isNaN(salaryMax) || salaryMax <= 0)
      return { error: "Salary max must be a positive number." };
    salaryMaxVal = salaryMax;
  }
  if (salaryMinVal && salaryMaxVal && salaryMinVal > salaryMaxVal) {
    return { error: "Salary min cannot exceed max." };
  }

  const slug = `${slugify(title)}-at-${slugify(company.name)}`;

  try {
    await prisma.job.create({
      data: {
        title,
        slug,
        description,
        location: location || null,
        type,
        salaryMin: salaryMinVal,
        salaryMax: salaryMaxVal,
        skills,
        companyId: company.id,
      },
    });
  } catch (err: unknown) {
    // Unique constraint violation = slug collision
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      const retrySlug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
      await prisma.job.create({
        data: {
          title,
          slug: retrySlug,
          description,
          location: location || null,
          type,
          salaryMin: salaryMinVal,
          salaryMax: salaryMaxVal,
          skills,
          companyId: company.id,
        },
      });
    } else {
      console.error(err);
      return { error: "Something went wrong. Try again." };
    }
  }

  revalidatePath("/");
  redirect("/dashboard");
}
```

Read it as a checklist:

- **Double validation** (HTML `required` + server) — HTML attributes get bypassed (DevTools, direct action calls). The server is the final gate (8.2).
- **`Number(formData.get(...))`** — forms send everything as strings; `"800000"` becomes a number before hitting the DB's `Int` column.
- **`VALID_TYPES.includes(typeRaw)`** — the whitelist pattern from C.3, now on the create side.
- **`as (typeof VALID_TYPES)[number]`** — a TypeScript idiom: derive the union type of the array's elements (`"FULL_TIME" | "PART_TIME" | ...`). The cast is safe *after* the includes check.
- **Slug collision + P2002** — `frontend-developer-at-acme` already in the DB? The `@unique` constraint (C.2) makes the insert fail. Prisma known-errors carry a code — `P2002` = unique violation. Recovery: append a 4-char random suffix to the slug. (Race-proof: even if two requests pass a pre-check at the same time, the DB constraint is the final arbiter — C.1's Question 2.) The repeated `create` block is acceptable for teaching clarity; production would DRY it into a helper.
- **`revalidatePath("/")`** — honest note: both home and dashboard are dynamic (query params / auth), so this is technically redundant. Still good practice — explicit intent ("the home page's data changed"), and prevents stale-cache bugs if a page later switches to ISR (C.12 territory). Cheap insurance.
- **`redirect()` placed OUTSIDE try/catch.** Subtle gotcha: `redirect` throws internally to trigger navigation. Inside a `try`, the `catch` swallows it and the redirect breaks. Rule: framework control-flow (redirect, revalidate) goes outside try/catch blocks.

## Step 5 — The Form Component: Two Actions, One Form

UI time. This is a **client** component — `useActionState` is a hook (3.4.12).

**File:** `app/(employer)/post-job/page.tsx` — the server wrapper (auth + layout):

```tsx
// app/(employer)/post-job/page.tsx
import { requireRole } from "@/lib/require-role";
import { PostJobForm } from "./post-job-form";

export default async function PostJobPage() {
  await requireRole("EMPLOYER");
  return <PostJobForm />;
}
```

**File:** `app/(employer)/post-job/post-job-form.tsx`:

```tsx
// app/(employer)/post-job/post-job-form.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import {
  createJobAction,
  generateDescriptionAction,
} from "./actions";

export function PostJobForm() {
  const [createState, createAction, createPending] = useActionState(
    createJobAction,
    null
  );
  const [genState, genAction, genPending] = useActionState(
    generateDescriptionAction,
    null
  );

  const [description, setDescription] = useState("");

  // When the AI returns a draft, inject it into the textarea
  useEffect(() => {
    if (genState?.ok) setDescription(genState.draft);
  }, [genState]);

  return (
    <form action={createAction} className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Post a Job</h1>

      {createState?.error && (
        <p className="bg-red-50 text-red-700 border border-red-200 rounded px-3 py-2 text-sm">
          {createState.error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium">Job Title *</span>
          <input
            name="title"
            required
            placeholder="Frontend Developer"
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Location</span>
          <input
            name="location"
            placeholder="Remote (India)"
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium">Type</span>
          <select name="type" className="mt-1 w-full border rounded px-3 py-2">
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERNSHIP">Internship</option>
          </select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-sm font-medium">Salary Min (₹/yr)</span>
            <input
              name="salaryMin"
              type="number"
              placeholder="800000"
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Salary Max</span>
            <input
              name="salaryMax"
              type="number"
              placeholder="1400000"
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </label>
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-medium">
          Skills (comma separated) *
        </span>
        <input
          name="skills"
          required
          placeholder="React, TypeScript, Next.js"
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </label>

      {/* AI button — same form, alternate action */}
      <div>
        <button
          type="submit"
          formAction={genAction}
          disabled={genPending}
          className="bg-purple-600 text-white text-sm rounded px-3 py-2 disabled:opacity-50"
        >
          {genPending ? "Writing with AI..." : "Generate with AI"}
        </button>
        {genState && !genState.ok && (
          <p className="text-red-600 text-sm mt-1">{genState.error}</p>
        )}
      </div>

      <label className="block">
        <span className="text-sm font-medium">Description *</span>
        <textarea
          name="description"
          required
          rows={8}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your own, or generate with AI above..."
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </label>

      <button
        type="submit"
        disabled={createPending}
        className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium disabled:opacity-50"
      >
        {createPending ? "Posting..." : "Publish Job"}
      </button>
    </form>
  );
}
```

Four important mechanics:

- **Two `useActionState` hooks on one form** — the publish button uses the default `action={createAction}` (set on the `<form>`); the AI button overrides with `formAction={genAction}`. When clicked, the **entire** form serializes to `generateDescriptionAction` — that's why `formData.get("title")` works there. Two independent states, errors never mix.
- **Separate pending states** — `genPending` disables only the AI button ("Writing with AI..."), the publish button stays enabled. The user always knows which operation is in flight.
- **Controlled textarea + `useEffect` sync** — when the AI draft arrives, `setDescription(genState.draft)` writes it in. A controlled component (not `defaultValue`) because the description updates *after* mount (from AI), not just at the initial render.
- **`disabled={pending}`** — double-submit guard; an impatient double-click can't create a duplicate job.

**TEST checklist:**

1. `/post-job` → submit empty → red error (server-side validation).
2. Fill title + skills → "Generate with AI" → ~2-4 sec → a professional draft appears in the textarea.
3. Edit the draft (add a line) → "Publish Job" → redirect to `/dashboard`.
4. The dashboard shows the new job + `0 applications`.
5. Open the home page → the new job is listed (not featured — that step comes next).
6. Post another job with the same title → the slug collides → a job with a `-x7kf` suffix is created (check the URL).

## Nutshell

The Post Job flow is **server-side throughout**: a Gemini wrapper (`lib/gemini.ts` — prompt with role + structure + format constraints), `generateDescriptionAction` (guard → validate → try/catch → discriminated union `GenState`), `createJobAction` (session + company ownership → server validation → `slugify` → **P2002 collision retry with suffix** → `revalidatePath` → redirect *outside* try/catch). The UI is a single client form with **two `useActionState` hooks** — the main `action` vs. the AI button's `formAction` — same FormData to both but separate pending/error states. The controlled textarea + `useEffect` injects the AI draft. Env key is server-only (8.1), errors are user-friendly, stack traces go to server logs only.

## What It Is NOT

- **The AI-generated description is not "final content."** It's a draft — the employer edits it before publishing. The prompt sets the structure; human judgment fills it. (Product thinking: AI-assisted, not AI-replaced.)
- **`formAction` is not "a second form."** It's an alternate submit handler on the *same* form — same inputs, same FormData, different destination action. That's why the AI action receives the `title` and `skills` fields.
- **The P2002 fallback is not "allowing duplicate data."** A collision is handled by making the slug unique (with a suffix). We're not violating the constraint — we're degrading gracefully *because* of it. Slugs aren't user-meaningful, so a suffix is acceptable.
- **The free-tier Gemini is not "production-scale capacity."** Per-minute limits are tight. Real traffic needs the paid tier, a queue, or result caching — but the nullable-score design from C.1 makes all the future upgrades possible.
- **Server Action guards are not "a replacement for layout protection."** The layout says "employers only see this"; the action says "only employers can execute this." One gates the UI, the other gates the data mutation. Both layers are needed.

---

**In Your Own Words**

1. How does `formData.get("title")` populate in the AI-generate action, when the button was a separate "Generate" button?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The button used `formAction={genAction}` — an alternate submit handler on the *same* form. Clicking it serializes the whole form (all `<input name="...">` fields) into the FormData and routes it to that action — not just the button's value. So `title` and `skills` are present. One form, two destinations.

</details>

2. Why a discriminated union (`{ ok: true, draft }` vs `{ ok: false, error }`) instead of a plain `{ error?: string; draft?: string }`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** With plain optional fields, TypeScript has no idea which "case" is active — `state.draft` is always reachable (just `undefined`), so a logic mistake (reading draft when there's actually an error) compiles fine and crashes at runtime. A discriminated union narrowed by `ok` lets `if (state.ok)` tell TypeScript exactly which fields exist in that branch. Illegal states become unrepresentable — eliminating a whole class of null/undefined runtime bugs at compile time.

</details>

3. Why is `redirect()` placed outside the `try`/`catch`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `redirect` throws a special internal exception that Next.js uses to trigger navigation. Inside a `try`, our own `catch` swallows it — the redirect is intercepted, execution continues (and the job was just created), but the user never leaves the page. Framework control-flow like redirect/revalidate must sit outside try/catch blocks.

</details>

4. The slug-collision retry appends a `-x7kf` suffix — are there cleaner alternatives, and why this one?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Alternatives: (a) a pre-flight `findUnique` + incrementing `-2`, `-3` — readable but race-prone (two requests pass the check, both insert) and needs a retry loop; (b) asking the user for a slug — real UX friction; (c) a timestamp suffix — longer and uglier. The random 4-char suffix: race-proof (the DB constraint still arbitrates), zero extra queries, and only fires in rare collisions (most jobs get a clean slug). Trade-off: an occasional ugly URL vs. added complexity — acceptable.

</details>

5. Why does the AI "Generate" button have its own pending state (`genPending`), instead of reusing the publish button's `createPending`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** They're different operations that can overlap in duration and have different failure UX. You might generate (slow), review the draft, then publish. A shared pending state would disable the wrong button or show the wrong label. Separate state lets the UI say "Writing with AI" on the generate button while "Publish Job" stays active. Independent operations get independent state — that's the rule.

</details>

---

The employer can now post jobs (AI-assisted). But the employer side still can't **manage** those jobs — edit, toggle open/closed, or run the money feature from C.0: a **paid feature boost**. That's C.7: ownership-guarded mutations, schema evolution (a new `open` flag), and **Stripe Checkout with signature-verified webhooks** — the capstone's payment integration and the first time an external service calls *into* our app.

We'll explore this in detail in the next topic.