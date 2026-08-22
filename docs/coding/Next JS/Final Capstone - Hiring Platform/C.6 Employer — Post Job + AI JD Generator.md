C.5 ke end mein employer ka setup poori tarah ready hai — GitHub login, role EMPLOYER, company row DB mein, protected `(employer)` section with header nav. Us nav mein ek link tha jo abhi kaam nahi karta: **Post Job**. Aaj woh banayenge — aur sirf boring CRUD nahi: is form mein capstone ki **pehli AI feature** bhi judegi. Employer title + skills type karega, ek button dabayega, aur **Gemini** uske liye poori job description draft kar dega.

Is file mein teen cheezein milti hain: (1) LLM API ko server-side se call karna — production pattern, (2) `useActionState` wala form feedback (3.4.12 ka scale-up), (3) unique slug ki real-world handling.

# Hiring Platform — Part 6: Post Job + AI JD Generator

## Step 0 — Ek Chhota Placeholder: Basic Dashboard

C.5 ke test mein `/dashboard` pe land hue the — header dikha tha par page ka content 404 tha (`(employer)/dashboard/page.tsx` exist hi nahi karta). Post-job flow ka feedback loop bhi chahiye: *job post karo → kahin dikhne chahiye*. Isliye pehle ek basic dashboard — C.7/C.10 isko upgrade karenge (featured badges, stats, ranked applicants).

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
          Koi job nahi hai. Pehli job post karo!
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

Do naye Prisma bits:

- **`where: { company: { ownerId: session.user.id } }`** — relation filter! "Jin jobs ki company is employer ki hai." Nested where — Prisma relations ko query conditions mein turn karta hai. Ownership filtering ka foundation (C.7/C.10 mein bhi yehi guard).
- **`include: { _count: { select: { applications: true } } }`** — count aggregate. Poori applications list nahi chahiye thi, sirf number. `_count.applications` = kitni applications. (Bina include ke saari applications rows fetch hoti — waste.)

**TEST:** `/dashboard` — seed wali Acme jobs nahi dikhengi (tumhari company alag hai!) — empty state "+ Post Job" ke saath. Perfect starting point.

## Step 1 — Gemini Setup: Key + Install + Env

Google AI Studio se free API key milti hai:

1. **aistudio.google.com** → Google account se sign in
2. Left sidebar / top-right → **Get API key** → **Create API key**
3. Key copy karo (ek baar dikhti hai)

Install:

```bash
npm install @google/genai
```

**`.env.local`** mein add (Batch 5 wale auth vars ke neeche):

```env
GEMINI_API_KEY=ai-studio-se-mili-key
```

**8.1 ka rule live:** prefix `NEXT_PUBLIC_` NAHI lagaya — yeh var **sirf server** pe exist karegi. Client bundle mein jayegi hi nahi. AI keys leak ho gayi toh koi tumhare quota pe free mein apna product chala sakta hai.

### LLM Call Ka Concept (Ek Baar Proper Samjho)

LLM hamare server pe run nahi hota — **Gemini ek hosted API hai**, jaise weather API. Flow:

```
Browser (form)
   │  Server Action call
   ▼
Hamara Next.js Server
   │  HTTPS POST + prompt + GEMINI_API_KEY
   ▼
Google ke servers (Gemini model)
   │  generated text response
   ▼
Hamara Server ──► response UI/DB mein
```

- Model download/GPU kuch nahi chahiye — plain HTTP request
- **Free tier:** Gemini flash models pe per-minute/per-day limits ke saath free quota — capstone testing ke liye kaafi. Limits cross ho toh API error deti hai (C.11 mein isi wajah se AI endpoint pe rate-limiting lagayenge).
- **Cost philosophy:** paid models pennies-per-call hote hain, par seekhne ke liye free tier best.

> **Provider swap box:** Code almost same rehta hai dusre providers pe. OpenAI ho ya Groq — dono OpenAI-compatible API dete hain: SDK badlo (`openai` package), `baseURL` unka daalo, apni key daalo, model name badlo. Concept identical: prompt bhejo, text wapis lo. Isliye jo yahan seekhoge woh industry-wide skill hai.

## Step 2 — AI Wrapper: `lib/gemini.ts

Direct SDK calls har jagah scatter nahi karenge — ek wrapper file, ek jagah config/prompt logic. Testability bhi easy hoti hai.

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

Prompt engineering ke 3 basics jo yahan lage:

1. **Role assign** — "You are an expert recruiter" — model ko context deta hai, generic AI-babbling kam hoti hai
2. **Structure specify** — paragraphs ka order, tone, word limit — warna kabhi 5 bullets, kabhi essay aa jaata hai (output inconsistent)
3. **Format constraint** — "plain text only" — humara UI `<p>` mein dikhata hai; markdown asterisks (`**Required**`) raw dikhte — isliye mana kiya

**`response.text`** — SDK ka shortcut property, generated string. Null ho sakta hai (edge cases) → `?? ""`.

**TEST (wrapper alone):** Ek temp script se chala ke dekho — `npx tsx -e` ya kisi route mein temporarily:

```bash
npx tsx --env-file=.env.local -e "
import { generateJobDraft } from './lib/gemini';
const d = await generateJobDraft('React Dev', 'React, TypeScript');
console.log(d);
"
```

Console mein professional-looking 3-paragraph description aani chahiye. Error aaye toh key/model name check karo. (Temp test ho gaya? Ab aage.)

## Step 3 — Generate Action: Server-Side Guard + Error Shape

SDK direct client se call **nahi** karenge — key expose + CORS + abuse. Server Action beech ka gatekeeper:

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
  // Server-side guard — UI pe button dikhna security nahi hai (C.5 rule)
  const session = await auth();
  if (session?.user.role !== "EMPLOYER") {
    return { ok: false, error: "Sirf employers AI use kar sakte hain." };
  }

  const title = (formData.get("title") as string)?.trim() ?? "";
  const skills = (formData.get("skills") as string)?.trim() ?? "";

  if (!title || !skills) {
    return { ok: false, error: "Pehle title aur skills bharo." };
  }

  try {
    const draft = await generateJobDraft(title, skills);
    return { ok: true, draft };
  } catch (err) {
    console.error("Gemini error:", err);
    return {
      ok: false,
      error: "AI thoda busy hai. Ek minute baad try karo.",
    };
  }
}
```

Patterns yahan deliberate hain:

- **`(prev, formData)` signature + state return** — `useActionState` ke liye (3.4.12 ka contract)
- **Discriminated union `GenState`** — `{ ok: true, draft }` ya `{ ok: false, error }`. Client `if (state.ok)` check karke TypeScript ko batata hai kaunsa branch — `state.draft` galat branch pe access karna compile-time impossible. String-typing `"error"` vs `"success"` fields se zyada clean.
- **Try/catch AI call ke around** — network fail, quota exceed, model down — sab catch hoke friendly message. **Error user tak raw nahi jaata** (stack traces secrets bhi leak kar sakte hain — 8.x awareness).
- **`console.error` server logs** — debugging ke liye detail server pe hi rehti hai.

## Step 4 — Create Action: Validation + Slug + P2002

Ab main mutation — form submit hone pe job DB mein. Same file mein add karte jao:

```ts
// app/(employer)/post-job/actions.ts — imports extend karo:
import prisma from "@/lib/prisma";                                       // NEW
import { redirect } from "next/navigation";                              // NEW
import { Prisma } from "@prisma/client";                                 // NEW
import { revalidatePath } from "next/cache";                             // NEW

const VALID_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];// NEW

function slugify(text: string): string {                                 // NEW
  return text                                                            // NEW
    .toLowerCase()                                                       // NEW
    .replace(/[^a-z0-9]+/g, "-")                                         // NEW
    .replace(/^-|-$/g, "");                                              // NEW
}                                                                        // NEW

type CreateState = { error: string } | null;                             // NEW

export async function createJobAction(                                   // NEW
  _prev: CreateState,                                                    // NEW
  formData: FormData                                                     // NEW
): Promise<CreateState> {                                                // NEW
  const session = await auth();                                          // NEW
  if (session?.user.role !== "EMPLOYER") {                               // NEW
    return { error: "Unauthorized" };                                    // NEW
  }                                                                      // NEW
                                                                         // NEW
  const company = await prisma.company.findUnique({                      // NEW
    where: { ownerId: session.user.id },                                 // NEW
  });                                                                    // NEW
  if (!company) {                                                        // NEW
    return { error: "Company profile missing — onboarding complete karo." };  // NEW
  }                                                                      // NEW
                                                                         // NEW
  // Form values — sab strings aati hain, types khud convert karne hain  // NEW
  const title = ((formData.get("title") as string) ?? "").trim();        // NEW
  const description = ((formData.get("description") as string) ?? "").trim();  // NEW
  const location = ((formData.get("location") as string) ?? "").trim();  // NEW
  const skills = ((formData.get("skills") as string) ?? "").trim();      // NEW
  const typeRaw = (formData.get("type") as string) ?? "";                // NEW
  const salaryMin = Number(formData.get("salaryMin"));                   // NEW
  const salaryMax = Number(formData.get("salaryMax"));                   // NEW
                                                                         // NEW
  // Validation — HTML required bypass ho sakta hai, server final gate   // NEW
  if (!title || !description || !skills) {                               // NEW
    return { error: "Title, description aur skills required hain." };    // NEW
  }                                                                      // NEW
  if (!VALID_TYPES.includes(typeRaw)) {                                  // NEW
    return { error: "Invalid job type." };                               // NEW
  }                                                                      // NEW
  const type = typeRaw as (typeof VALID_TYPES)[number];                  // NEW
                                                                         // NEW
  let salaryMinVal: number | null = null;                                // NEW
  let salaryMaxVal: number | null = null;                                // NEW
  if (formData.get("salaryMin")) {                                       // NEW
    if (Number.isNaN(salaryMin) || salaryMin <= 0)                       // NEW
      return { error: "Salary min valid positive number honi chahiye." };  // NEW
    salaryMinVal = salaryMin;                                            // NEW
  }                                                                      // NEW
  if (formData.get("salaryMax")) {                                       // NEW
    if (Number.isNaN(salaryMax) || salaryMax <= 0)                       // NEW
      return { error: "Salary max valid positive number honi chahiye." };  // NEW
    salaryMaxVal = salaryMax;                                            // NEW
  }                                                                      // NEW
  if (salaryMinVal && salaryMaxVal && salaryMinVal > salaryMaxVal) {     // NEW
    return { error: "Salary min max se zyada nahi ho sakti." };          // NEW
  }                                                                      // NEW
                                                                         // NEW
  const slug = `${slugify(title)}-at-${slugify(company.name)}`;          // NEW
                                                                         // NEW
  try {                                                                  // NEW
    await prisma.job.create({                                            // NEW
      data: {                                                            // NEW
        title,                                                           // NEW
        slug,                                                            // NEW
        description,                                                     // NEW
        location: location || null,                                      // NEW
        type,                                                            // NEW
        salaryMin: salaryMinVal,                                         // NEW
        salaryMax: salaryMaxVal,                                         // NEW
        skills,                                                          // NEW
        companyId: company.id,                                           // NEW
      },                                                                 // NEW
    });                                                                  // NEW
  } catch (err) {                                                        // NEW
    // Unique constraint violation = slug collision                      // NEW
    if (                                                                 // NEW
      err instanceof Prisma.PrismaClientKnownRequestError &&             // NEW
      err.code === "P2002"                                               // NEW
    ) {                                                                  // NEW
      const retrySlug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;  // NEW
      await prisma.job.create({                                          // NEW
        data: {                                                          // NEW
          title,                                                         // NEW
          slug: retrySlug,                                               // NEW
          description,                                                   // NEW
          location: location || null,                                    // NEW
          type,                                                          // NEW
          salaryMin: salaryMinVal,                                       // NEW
          salaryMax: salaryMaxVal,                                       // NEW
          skills,                                                        // NEW
          companyId: company.id,                                         // NEW
        },                                                               // NEW
      });                                                                // NEW
    } else {                                                             // NEW
      console.error(err);                                                // NEW
      return { error: "Kuch galat ho gaya. Dobara try karo." };         // NEW
    }                                                                    // NEW
  }                                                                      // NEW
                                                                         // NEW
  revalidatePath("/");                                                   // NEW
  redirect("/dashboard");                                                // NEW
}                                                                        // NEW
```

Bade file ko todo-mei todo samjho:

- **Double validation (HTML `required` + server)** — HTML attributes bypass hote hain (DevTools se form edit, direct action call). Server final gatekeeper — 8.2 ka rule.
- **`Number(formData.get(...))`** — form se sab **strings** aati hain; `"800000"` string DB ki `Int` mein jaane se pehle number bani.
- **`VALID_TYPES.includes(typeRaw)`** — C.3 wala whitelist pattern, bas ab create-side pe.
- **`as (typeof VALID_TYPES)[number]`** — TS trick: array ke elements ka union type nikalta hai (`"FULL_TIME" | "PART_TIME" | ...`). Includes-check ke baad cast safe hai.
- **Slug collision + P2002** — `frontend-developer-at-acme` already DB mein? `@unique` (C.2) insert fail karega. Prisma known errors ka code hota hai — `P2002` = unique violation. Retry: slug ke peeche 4-char random suffix. (Race-condition-proof: even if two requests pass any pre-check simultaneously, DB constraint decides — C.1 In-Your-Own-Words Q2 wali kahani.) Duplicate create code thoda repeat ho raha hai — production mein helper function bana lete; teaching clarity ke liye inline rakha.
- **`revalidatePath("/")`** — honest note: home/dashboard dono dynamic hain (searchParams/auth ki wajah se), toh technically zaroori nahi tha. Phir kyu? Explicit intent — "home ka job-listing data change hua hai" — aur agar kal koi page ISR ho jaye (C.12 discuss), stale-cache bug se bacha rehta hai. Cheap insurance.
- **`redirect()` try-catch ke BAHAR** — subtle gotcha: `redirect` internally error throw karta hai navigation trigger karne ke liye. Try block ke andar hota toh catch use pakad leta aur redirect break hota. Isliye last line pe, bahar.

## Step 5 — Form Component: Do Actions, Ek Form

UI time. Yeh component **client** hoga — `useActionState` hook client-side hai (3.4.12).

**File:** `app/(employer)/post-job/page.tsx` (server wrapper — auth/layout ka kaam):

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

  // AI draft aaya → textarea mein daal do
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

      {/* AI button — SAME form, alag action */}
      <div>
        <button
          type="submit"
          formAction={genAction}
          disabled={genPending}
          className="bg-purple-600 text-white text-sm rounded px-3 py-2 disabled:opacity-50"
        >
          {genPending ? "✍️ AI likh raha hai..." : "✨ Generate with AI"}
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
          placeholder="Likho khud, ya upar wale button se AI se draft karwao..."
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

Chaar important mechanics:

- **Do `useActionState`, ek form** — main submit button default `action={createAction}` use karta hai; AI button `formAction={genAction}` override karta hai. Click AI pe → poora form data `generateDescriptionAction` ko jaata hai (isliye wahan se `formData.get("title")` milta hai!). Dono states alag — errors mix nahi hote.
- **Pending states alag-alag** — `genPending` sirf AI button disable karta hai ("✍️ AI likh raha hai..."), publish button normal. User ko hamesha pata kya chal raha.
- **Controlled textarea + `useEffect` sync** — AI draft aate hi `setDescription(draft)` — textarea update. User phir edit kar sakta (onChange). Kyun controlled? Uncontrolled `defaultValue` sirf pehli mount pe set hota — AI ka doosra draft reflect nahi hota.
- **`disabled={pending}`** double-submit guard — impatient double-click se duplicate jobs nahi.

**TEST checklist:**

1. `/post-job` → khali submit → red error (server validation)
2. Title/skills bharo → ✨ Generate → ~2-4 sec → textarea mein professional draft
3. Draft edit karo (ek line add karo) → Publish → `/dashboard` redirect
4. Dashboard pe nayi job + `0 applications`
5. Home page kholo → nayi job listed (featured nahi — neeche wali group mein)
6. Same title se doosri job post karo → slug collide → `-x7kf` jaisa suffix wali job ban gayi (URL dekh lo)

## Nutshell

Post Job flow = **server-side everything**: Gemini wrapper (`lib/gemini.ts` — prompt with role/structure/format), `generateDescriptionAction` (guard → validate → try/catch → discriminated `GenState`), `createJobAction` (session+company ownership → server validation → slugify → **P2002 retry with suffix** → `revalidatePath` → redirect). UI = ek client form, **do `useActionState`s** — main `action` vs AI button `formAction` — same FormData dono ko, separate pending/error states. Controlled textarea + `useEffect` se AI draft inject. Env key server-only (8.1), errors user-friendly, stack server logs mein.

## What It Is NOT

- **"Generate with AI" = "final content" nahi.** Draft hai — employer edit karta hai, phir publish. Prompt ne structure diya, judgment employer ki. (Product thinking: AI-assisted, AI-replaced nahi.)
- **`formAction` = "second form" nahi.** Woh single form ke andar alternate submit handler hai — same inputs, same FormData, different destination action. Isliye generate-action ko title/skills formData se milte hain.
- **P2002 catch = "duplicate data allow" nahi.** Slug collision handle kiya — job phir bhi unique hi bani (suffixed slug). Constraint todne ka workaround nahi, constraint ke saath gracefully deal karna.
- **Free-tier Gemini = "production-ready capacity" nahi.** Rate limits tight hote hain (per-minute). Real traffic pe paid tier ya queue/caching strategy chahiye — C.11 rate limiting isi family ka concern hai.
- **Server Action guards = "layout protection ka replacement" nahi.** Layout bola "employer hi dekh sake", action bola "employer hi execute kar sake". Page dikhe na dikhe, action direct call se data mutate nahi hoga. Layers independent kaam karti hain.

---

**In Your Own Words**

1. `generateDescriptionAction` mein `formData.get("title")` kaise mila jabki woh button sirf AI-generate ke liye tha?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Woh button main form ke andar `formAction={genAction}` ke saath tha. `formAction` form ka alternate submit hai — click pe poora form serialize hokar us action ko jaata hai, sirf button ki value nahi. Isliye title/skills/location — sab fields FormData mein available thi. Ek form, do destinations.

</details>

2. Discriminated union (`{ok:true,draft}` vs `{ok:false,error}`) plain `{error?: string, draft?: string}` se better kyun?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Plain optional fields mein TypeScript nahi jaanta kaunsa case active hai — `state.draft` hamesha accessible (undefined ho sakta), galat assumptions possible. Discriminated union narrow karta hai: `if (state.ok)` ke andar TS guarantee karta hai `draft` exists; else branch mein sirf `error`. Illegal states unrepresentable — runtime undefined-crash class of bugs compile-time pakdi jaati hai.

</details>

3. `redirect()` try-catch ke bahar kyun rakha?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Redirect internally ek special error throw karta hai jo Next.js navigation ke liye use karta hai. Try block ke andar hota toh hamara `catch(err)` use pakad leta — redirect cancel, user ko generic error message milta jabki job ban chuki thi. Rule: redirect/revalidate-type framework functions control-flow throws hain — unhe apne catch scopes se bahar rakho.

</details>

4. Slug suffix approach (`-x7kf`) ugly lagta hai URL mein — alternatives kya the aur yeh kyun chuna?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Alternatives: (a) pre-check `findUnique` + incrementing number (`-2`, `-3`) — readable par race-prone aur loop logic; (b) user se slug poochna — UX friction; (c) timestamp suffix — lamba/uglier. Random 4-char suffix: race-proof (DB constraint hi decide karta), zero extra queries, rare case mein hi aata hai (most jobs clean slug paati hain). Trade-off: occasional ugly URL vs complexity — fine.

</details>

5. AI button disabled during `genPending` — iske bina kya concrete problem hoti?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Double-click → do simultaneous Server Actions → do Gemini API calls (double quota cost, free-tier limit hit fast) aur do responses racing — last-write wins textarea pe, user confuse. Pending disable + label change ek standard pattern hai har async-triggered UI control pe — apply/create/delete sabme.

</details>

---

Employer ab jobs post kar sakta hai — AI assist ke saath. Par dashboard ki jobs list abhi sirf dekhne layak hai: edit/close/delete nahi, featured boost nahi. C.7 mein manage-actions (ownership-guarded Server Actions) aur capstone ka paisa-wala feature: **Stripe Checkout se Featured Listing** — payment session banana, webhook receive karna, aur payment-confirm hone pe job boost karna.
