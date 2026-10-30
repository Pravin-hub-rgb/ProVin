C.8's most interesting loose end: the **"Scoring..."** pulsing badge. The application was saved, the resume made it to Blob — but the score never came, because it was never computed. That's what we do today — the capstone's **signature feature**: right after applying, Gemini reads the actual PDF resume and compares it to the job description, saving a 0-100 score + explanation. Production lessons: (1) LLMs can take **files like PDFs** (multimodal input), not just text, (2) requesting **structured JSON output** — parseable data, not free text, (3) graceful degradation when AI fails — the application never dies, the score just stays pending.

# Hiring Platform — Part 9: AI Match Score

## Step 1 — Design First: When and How Is the Score Computed?

Two questions to resolve first:

**Question 1 — When is the score computed?**

| Option | What it means | Problem |
|---|---|---|
| Background queue/cron | Application saved → a separate worker computes later | Extra infrastructure (a queue service) — outside capstone scope |
| **Inside the apply action, after the insert** | Everything in one request | Submit takes 3-6 seconds, slower |

Pick the second — simple + acceptable UX (the button already shows pending). We'll be honest about the trade-off in What It Is NOT, and note the production pattern.

**Question 2 — How does the resume get to Gemini?**

The resume is a **PDF binary**. Options:

| Option | What it does | Decision |
|---|---|---|
| Text-extraction library (`pdf-parse`) | Extract text locally, send as text | Extra dependency + PDFs are messy (columns, tables) — extraction quality is a gamble |
| **Give Gemini the PDF directly** | Multimodal input — the model reads the document itself | Zero extra deps; Gemini understands documents natively |

Pick multimodal — that's a superpower of modern LLM APIs, and the implementation is surprisingly simple: PDF bytes → base64 string → attached inline in the request.

## Step 2 — Scoring Function in `lib/gemini.ts`

Extend the wrapper — add to the end of C.6's file:

```ts
// lib/gemini.ts — add at the end:
export type MatchResult = {
  score: number;
  reason: string;
};

const MATCH_PROMPT = `
You are a senior technical recruiter screening a candidate for a job.

JOB DESCRIPTION:
{description}

REQUIRED SKILLS: {skills}

The candidate's resume is attached as a PDF.

Evaluate the fit and respond ONLY with JSON matching this shape:
{
  "score": <integer 0-100>,
  "reason": "<one short paragraph, max 60 words, explaining the score>"
}

Scoring guide:
- 80-100: strong overlap between skills and experience
- 50-79: partial fit, some gaps
- 0-49: poor fit
Be honest — do not inflate scores.
`;

export async function scoreMatch(
  description: string,
  skills: string,
  resumePdfBase64: string
): Promise<MatchResult | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: MATCH_PROMPT },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: resumePdfBase64,
              },
            },
            {
              text: `JOB DESCRIPTION:\n${description}\n\nREQUIRED SKILLS: ${skills}\n\nRespond with the JSON now.`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    if (!response.text) return null;
    const parsed = JSON.parse(response.text);
    return {
      score: Math.max(0, Math.min(100, Number(parsed.score))),
      reason: String(parsed.reason ?? "").slice(0, 500),
    };
  } catch {
    return null; // the caller decides what to do
  }
}
```

Five deliberate decisions in this function:

1. **Static prompt template + runtime values separately** — the `{description}` placeholder prompt sets structure; the concrete values come in `contents` as a text part. (For simplicity both carry the JD here; in production they'd be one.)
2. **`parts` array** — multiple parts in one request: text + **PDF** + text. That's multimodal — `inlineData` with MIME type + base64 payload.
3. **`responseMimeType: "application/json"`** — Gemini's **JSON mode**: forces valid JSON output. No more cleaning up free-text "here's your JSON: ```json...". Still need try/parse as defense-in-depth.
4. **Clamp + sanitize** — `Math.max(0, Math.min(100, ...))` — if the model says `112`, garbage doesn't land in the DB. `reason.slice` caps runaway output.
5. **Return `null` on ANY failure** — quota, network, malformed JSON — all look the same. The caller (the action) decides: the score is optional (C.1's design), the application is the important thing.

> **OpenAI/Groq swap box (update):** JSON mode exists on every provider — in OpenAI it's `response_format: { type: "json_object" }`. Multimodal too — OpenAI vision handles images; for PDFs, the Files API. Provider-specific details change; the pattern (prompt + data parts + structured output + clamp) stays the same.

## Step 3 — Wiring It Into applyAction

In C.8's `applyAction`, just **one block** gets added — right after the DB insert. The whole function isn't repeated, just the new part:

```ts
// app/jobs/[slug]/apply/actions.ts — after the DB insert try/catch:

  // ---- AI Match Score (fail-safe: score is optional) ----                 // NEW
  let matchScore: number | null = null;                                     // NEW
  let matchReason: string | null = null;                                    // NEW

  try {                                                                     // NEW
    const pdfBytes = Buffer.from(await resume.arrayBuffer());               // NEW
    const result = await scoreMatch(                                        // NEW
      job.description,                                                      // NEW
      job.skills,                                                           // NEW
      pdfBytes.toString("base64")                                           // NEW
    );                                                                      // NEW
    if (result) {                                                           // NEW
      matchScore = result.score;                                            // NEW
      matchReason = result.reason;                                          // NEW
    }                                                                       // NEW
  } catch {                                                                 // NEW
    // score didn't come — the application is valid either way             // NEW
  }                                                                         // NEW

  await prisma.application.update({                                         // NEW
    where: { id: created.id },                                              // NEW
    data: { matchScore, matchReason },                                      // NEW
  });                                                                       // NEW

  revalidatePath("/applications");                                          // CHANGED (was after insert, now after score)
  return { ok: true };
```

And capture the insert result (need the id for the update):

```ts
    const created = await prisma.application.create({                       // CHANGED (added const)
      data: {
        // ...same fields...
      },
    });
```

Follow the flow:

- **`resume.arrayBuffer()`** — the C.8 `File` object is still in scope. ArrayBuffer → Node `Buffer` → base64 string. A 2MB PDF is about 2.7MB as base64 — request size is fine.
- **Insert FIRST, AI SECOND** — intentional order. If the AI call takes 10 seconds or crashes, the application is already safe. The reverse order (AI first) means an AI hang = no application saved — a disaster.
- **Outer try/catch + inner null-check** — double safety. `scoreMatch` technically doesn't throw (it catches internally), but belt-and-suspenders: if a future refactor throws, the application is still safe.
- **`revalidatePath` is now after the score** — so `/applications` re-renders with the fresh score.

**One honest limitation:** the score is computed **inside the apply request**. The user waits 3-6 seconds after clicking submit (AI latency). The button already shows `pending` ("Submitting application..."), so the UX is tolerable — in production, this becomes a background job. The capstone values clarity over infrastructure complexity.

## Step 4 — Showing the Reason in the UI

A score is just a number — "72" doesn't tell the candidate *why*. Show the reason. Expand the badge block in C.8's `/applications` page:

```tsx
{/* before: */}
{app.matchScore !== null ? (
  <span className="bg-blue-100 ...">{app.matchScore}/100 match</span>
) : (
  <span className="bg-gray-100 ...">Scoring...</span>
)}

{/* after — badge + expandable reason: */}
<div className="text-right">
  {app.matchScore !== null && (
    <details className="mt-1">
      <summary className="cursor-pointer">
        <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">
          {app.matchScore}/100 match
        </span>
      </summary>
      <p className="text-xs text-gray-600 mt-2 max-w-xs">
        {app.matchReason}
      </p>
    </details>
  )}
  {/* ...status line stays the same... */}
</div>
```

`<details>` — a native HTML accordion, zero JavaScript. Click the badge → the reason shows. For a small thing like this, a modal or state would be overkill.

**TEST checklist:**

1. New incognito → log in as candidate → upload a React-heavy resume for a React job → submit → 3-6 second wait → success card → `/applications` shows a **blue badge with a real score**
2. Click the badge → the reason paragraph opens
3. Intentionally upload a resume from a different domain (a photographer's PDF for a React job) → low score with an honest reason — the model doesn't inflate
4. In Neon SQL Editor: `SELECT "matchScore", LEFT("matchReason", 80) FROM "Application";` — both filled
5. (Optional stress-test) Temporarily put a wrong key in `.env.local` → submit an application → the application is **still created**, score stays null, "Scoring..." keeps pulsing — graceful degradation is live

## Nutshell

AI Match Score = **multimodal LLM call**: PDF bytes → base64 → `inlineData` part to Gemini, alongside a rubric-style prompt (role + scoring bands + honesty instruction) + **JSON mode** (`responseMimeType`) → parsed `{score, reason}` → **clamp/sanitize** (0-100 range, reason capped) → DB update. Golden ordering: **insert first, AI second** — AI failure doesn't kill the application (the nullable columns from C.1 pay off here). UI uses `<details>` to reveal the reason — zero-JS accordion.

## What It Is NOT

- **Match score = "a hiring decision" is NOT true.** It's an LLM estimate — a screening aid, not a verdict. That's why we store the reason (explainability) and why it's a *sorting aid* in C.10's employer dashboard, not a filter. AI-assisted screening has an ethical baseline: humans decide.
- **JSON mode = "guaranteed correct schema" is NOT true.** It guarantees valid JSON, not *our* fields. The model could return `{"score": "high"}` instead of a number. So parse + coerce + clamp stay. Trust boundaries at the LLM output, same as 8.2.
- **Inline base64 = "scalable for any PDF size" is NOT true.** Request-size limits exist (Gemini's inline region is ~20MB; our 2MB cap is comfortable). For large files, the Files API (upload once, reference it) is the move — pattern differs, goal is the same.
- **Sync-in-request scoring = "production architecture" is NOT true.** At real scale, a queue (Inngest/BullMQ-style worker) + retries + caching. We built the simplest-correct version; the upgrade path is clear because the score was nullable from the start.
- **LLM scores = "an objective measurement" is NOT true.** Models lean toward mid-range scores, are sensitive to wording. As relative signals (who's strongest in this batch?) they're more reliable than as absolutes. That's why C.10 ranks by score, not by threshold.

---

## In Your Own Words

1. What specific disaster does the insert-before-AI ordering prevent — what would happen with the reverse?

<details>
<summary>Show Answer</summary>

**Sample Answer:** With the reverse order (score first, insert later), an AI call that's slow or fails means the application is never created — the candidate's submit is lost, the resume Blob is orphaned, and frustrated users retry. With insert-first, the worst case is a valid application without a score. The rule: persist what's irreplaceable to the user first, enrich later.

</details>

2. `responseMimeType: "application/json"` was set, yet parse + clamp still happen — why?

<details>
<summary>Show Answer</summary>

**Sample Answer:** JSON mode guarantees syntactic validity, not semantic correctness. The model can produce `{"score": 112}` (out of range) or `{"reason": 42}` (wrong type). Clamp enforces the range; `String()` / `Number()` coerce the types. External system outputs are untrusted input — 8.2 applies to LLMs too.

</details>

3. What were the trade-offs between sending the PDF to Gemini directly (multimodal) vs extracting text first with `pdf-parse`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Extraction: an extra dependency, variable quality (multi-column/table PDFs scatter text awkwardly), maintenance burden. Multimodal: zero deps, the model sees the document and often understands layout better, but it's vendor-specific (attachment format differs) and has request-size limits. For small PDFs on a single provider, multimodal is the clear winner; a heavy pipeline abstracts over both.

</details>

4. Was storing `matchReason` necessary — wouldn't the score alone have been enough?

<details>
<summary>Show Answer</summary>

**Sample Answer:** A score without a reason is a black box — the candidate can't trust "72", the employer gets no quick scan surface for appeals/review. The reason is explainability + an audit trail. Plus C.10's dashboard lets employers skim reasons across candidates, not just blind numbers.

</details>

5. If two candidates submit nearly identical resumes, are identical scores guaranteed — and what's the product implication?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Not guaranteed — LLM outputs are non-deterministic (temperature); minor wording differences can shift scores by ±5-10. The implication: don't treat the score as a precise comparator (tie-breaks get fragile); treat it as broad buckets/ranking aid. That's why C.10 ranks by score but with null-last tiebreaks, not strict thresholds.

</details>

---

The picture is nearly complete: jobs are posted, applications flow in, scores are computed — but **where do employers see the applicants?** The dashboard only shows a count. In C.10, the final piece: the **applicants detail page** — AI-ranked list, authenticated resume viewing, and Batch 7's streaming `Suspense` in a real production setting: the stats section loads progressively.
