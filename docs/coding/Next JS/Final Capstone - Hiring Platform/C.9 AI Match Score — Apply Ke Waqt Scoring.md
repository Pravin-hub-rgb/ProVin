C.8 ka sabse interesting loose end: **"Scoring..."** wala pulsing badge. Application save hui, resume Blob pe pahunch gaya — par score kabhi nahi aaya, kyunki humne compute hi nahi kiya. Aaj woh karenge — capstone ka **signature feature**: apply hone ke turant baad Gemini **actual PDF resume padhke** job description se compare karega, aur 0-100 score + reason DB mein save karega.

Is file ke production lessons: (1) LLM ko sirf text nahi — **PDF jaisi files bhi** bhej sakte hain (multimodal input), (2) **structured JSON output** maangna — free-text nahi, parseable data, (3) AI-fail hone pe graceful degradation — application kabhi nahi marti, sirf score pending rehta hai.

# Hiring Platform — Part 9: AI Match Score

## Step 1 — Pehle Design Socho: Score Kab Aur Kaise?

Do sawaal jo pehle clear karne hain:

**Sawaal 1 — Score kab banega?**

| Option | Matlab | Problem |
|---|---|---|
| Background queue/cron | Application save → alag worker baad mein | Extra infra (queue service) — capstone scope se bahar |
| **Apply action ke andar, insert ke baad** | Ek hi request mein sab | Submit 3-6 sec slow hota hai |

Dusra chunte hain — capstone ke liye simple + UX acceptable (pending-disable button pehle se hai). Trade-off honest rakhenge, aur What It Is NOT mein production-pattern batayenge.

**Sawaal 2 — Resume ka content Gemini tak kaise jayega?**

Resume ek **PDF binary** hai. Options:

| Option | Kya hota | Faisla |
|---|---|---|
| Text-extract library (`pdf-parse`) | Hum khud PDF se text nikaal ke bhejein | Extra dep + PDFs messy hote hain (columns/tables) — extraction quality gamble |
| **Gemini ko PDF hi do** | Multimodal input — model khud document padhta hai | Zero extra deps; Gemini documents natively samajhta hai |

Multimodal chunte hain — yeh modern LLM APIs ka superpower hai aur implementation surprisingly simple: PDF bytes → base64 string → request mein inline attach.

## Step 2 — `lib/gemini.ts` Mein Scoring Function

Wrapper extend karo — C.6 wali file ke end mein add:

```ts
// lib/gemini.ts — neeche add karo:
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
Be honest - do not inflate scores.
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
    return null; // caller decide karega kya karna hai
  }
}
```

Is function ke paanch deliberate decisions:

1. **Prompt template + runtime values alag** — `{description}` placeholder wala static prompt upar, actual values `contents` ke text part mein neeche. (Simple rakhne ke liye dono jagah JD hai — pehla structure sikhaata hai, doosra concrete data deta hai. Production mein ek hi jagah karte.)
2. **`parts` array** — ek request mein multiple parts: text + **PDF** + text. Yahi multimodal hai — `inlineData` mein MIME type + base64 payload.
3. **`responseMimeType: "application/json"`** — Gemini ka **JSON mode**: model ko force karta hai ki output valid JSON ho. Free-text "here's your JSON: ```json..." wali cleaning-katai khatam. Phir bhi `try/parse` guard hai — defense in depth.
4. **Clamp + sanitize** — `Math.max(0, Math.min(100, ...))` — model agar `112` bol de toh DB mein garbage na jaye. `reason` slice — runaway output ka cap.
5. **Return `null` on ANY failure** — quota, network, malformed JSON — sab same. Caller (action) decide karega: score optional tha (C.1 design), application important thi.

> **OpenAI/Groq swap-box (update):** JSON mode har provider mein hai — OpenAI mein `response_format: { type: "json_object" }`. Multimodal bhi — OpenAI vision images ke liye; PDFs ke liye files API. Provider-specific details badalti hain, *pattern* (prompt + data parts + structured output + clamp) universal hai.

## Step 3 — applyAction Mein Wire Karna

C.8 wale `applyAction` mein sirf **ek block add** hota hai — DB insert ke turant baad. Poora function repeat nahi karta, sirf naya hissa:

```ts
// app/jobs/[slug]/apply/actions.ts — DB insert wale try-catch ke BAAD:

  // ---- AI Match Score (fail-safe: score optional hai) ----                 // NEW
  let matchScore: number | null = null;                                     // NEW
  let matchReason: string | null = null;                                    // NEW
                                                                            // NEW
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
    // score nahi mila — application phir bhi valid hai                     // NEW
  }                                                                         // NEW
                                                                            // NEW
  await prisma.application.update({                                         // NEW
    where: { id: created.id },                                              // NEW
    data: { matchScore, matchReason },                                      // NEW
  });                                                                       // NEW
                                                                            // NEW
  revalidatePath("/applications");                                          // CHANGED (pehle insert ke baad tha, ab score ke baad)
  return { ok: true };
```

Aur insert wale `create()` ka result ab variable mein capture hoga (update ke liye id chahiye):

```ts
    const created = await prisma.application.create({                       // CHANGED (const added)
      data: {
        // ...same fields...
      },
    });
```

Flow samjho:

- **`resume.arrayBuffer()`** — C.8 wala `File` object abhi bhi scope mein hai. ArrayBuffer → Node `Buffer` → base64 string. 2MB PDF ≈ 2.7MB base64 — request size theek.
- **Insert FIRST, score SECOND** — order intentional. Agar AI call 10 second leti ya crash karti, application already safe. Ulta order (score first) mein AI hang = application hi nahi banti — disaster.
- **Outer try/catch + inner null-check double safety** — `scoreMatch` technically throw nahi karta (khud catch karta hai), par belt-and-suspenders: future refactor mein koi throw ho toh bhi application safe.
- **`revalidatePath` ab score ke BAAD** — taaki `/applications` ka fresh render score ke saath hi ho.

**Ek honest limitation:** score abhi **apply-request ke andar** ban raha hai. User submit dabane ke baad 3-6 second wait karega (AI latency). Button already `pending` state dikhata hai ("Submitting application..."), toh UX theek-haale hai — bas production-scale pe isko background job banate (queue push karo, turant respond karo). Capstone clarity > infra complexity.

## Step 4 — Reason Ko UI Mein Dikhana

Score number akela adhoori kahani hai — "72" dekh ke candidate sochega *"achha hai ya bura?"* Reason dikhao. C.8 wali `/applications` page ke badge block ko expand karo:

```tsx
{/* pehle: */}
{app.matchScore !== null ? (
  <span className="bg-blue-100 ...">{app.matchScore}/100 match</span>
) : (
  <span className="bg-gray-100 ...">Scoring...</span>
)}

{/* ab — badge + expandable reason: */}
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
  {/* ...status line same... */}
</div>
```

`<details>` — HTML ka native accordion, zero JS. Badge click → reason khulta. Simple cheez ke liye modal/state overkill.

**TEST checklist:**

1. Naya incognito, candidate bano, React-heavy job pe React-skilled resume upload karo → submit → 3-6 sec wait → success card → `/applications` pe **blue badge with real score**
2. Badge click → reason paragraph khulta hai
3. Jaan-boojh ke galat-domain resume bhejo (photographer ka PDF React job pe) → low score + honest reason — model inflate nahi kar raha
4. Neon SQL Editor: `SELECT "matchScore", LEFT("matchReason", 80) FROM "Application";` — dono filled
5. (Optional stress-test) `.env.local` mein key temporarily galat karo → apply karo → application PHIR BHI bani, score null, "Scoring..." dikhta raha — graceful degradation live

## Nutshell

AI Match Score = **multimodal LLM call**: PDF bytes → base64 → `inlineData` part ke roop mein Gemini ko, saath mein rubric-wala prompt (role + scoring bands + honesty instruction) + **JSON mode** (`responseMimeType`) → parsed `{score, reason}` → **clamp/sanitize** (0-100, reason cap) → DB update. Ordering rule: **insert pehle, AI baad mein** — AI-fail application ko nahi maar sakta (nullable columns ka pura C.1 design yahan payoff hota hai). UI mein `<details>` se reason reveal — zero JS accordion.

## What It Is NOT

- **Match score = "hiring decision" nahi.** Ek LLM ka estimate hai, calibrated guess. Isliye reason store kiya (explainability) aur isliye employer dashboard (C.10) mein yeh *sorting aid* hai, filter-verdict nahi. AI-assisted screening ka ethical baseline: human decides.
- **JSON mode = "guaranteed correct schema" nahi.** Valid JSON guarantee hota hai — *hamare* fields ka promise nahi. Isliye parse ke baad bhi Number/String coercion + clamp. Trust boundaries hamesha apne side verify.
- **Inline base64 = "har size PDF ke liye scalable" nahi.** Request-size limits hain (Gemini inline ~20MB region; hamara 2MB cap comfortable). Bade files ke liye Files API (upload once, reference pass) hota hai — pattern alag, goal same.
- **Sync-in-request scoring = "production architecture" nahi.** Real scale pe queue (Inngest/BullMQ-type worker) + retry + caching hoga. Humne simplest-correct version banaya; upgrade path clear hai kyunki score nullable tha shuru se.
- **LLM scores = "objective measurement" nahi.** Models mid-range scores ki taraf lean karte hain, wording-sensitive hote hain. Relative comparison (is batch mein kaun strong hai) absolute truth se zyada reliable signal hai — C.10 isi liye score se *rank* karega, cutoff nahi lagayega.

---

**In Your Own Words**

1. Insert-before-AI ordering mein kya specific disaster ruka — ulta karte toh kya hota?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Ulta order (score first, insert later) mein AI call slow/fail hone pe application create hi nahi hoti — candidate ka submit lost, resume Blob orphan, user frustrated retry loops. Insert-first mein worst case: score null wali valid application. Critical-data-first ordering: jo user ke liye irreplaceable hai woh pehle persist karo, enrichment baad mein.

</details>

2. `responseMimeType: "application/json"` laga diya — phir bhi parse ke baad clamp/coercion kyun?

<details>
<summary>Show Answer</summary>

**Sample Answer:** JSON mode syntactic validity deta hai, semantic nahi — model `"score": 112` ya `"reason": 42` jaisa type-mismatch bhi de sakta hai. Clamp range enforce karta, String() coercion type. External system output = untrusted input (8.2 principle LLMs pe bhi apply hota hai).

</details>

3. Multimodal inlineData bhejna vs pdf-parse se text nikaalna — trade-offs kya the?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Extraction: extra dependency, layout-dependent quality (multi-column/table PDFs text scatter karta), maintenance. Multimodal: zero deps, model visual context se better comprehension, lekin vendor-lock-ish (provider-specific attachment format) + request-size limits. Chhoti PDFs + single provider ke liye multimodal clear winner; heavy pipeline mein abstraction layer dono support karta.

</details>

4. `matchReason` ko bhi store karna zaroori tha — sirf number save karte toh kya kam hota?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Number bina reason ke black-box hai — candidate ko fairness ka trust nahi milta ("72 kyun?"), employer ko appeal-review ka surface nahi milta. Reason = explainability + audit trail + dispute handling. Plus C.10 ranking mein employer quickly scan kar sakta hai reasons, blind numbers nahi.

</details>

5. Agar do candidates bilkul similar resumes ke saath apply karein — scores identical aane ki guarantee kya? Iska product implication kya?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Guarantee kuch nahi — LLM outputs non-deterministic hain (temperature), minor wording fark se ±5-10 shift possible. Implication: score ko precise comparator mat banao (tie-break logic fragile); broad buckets/ranking-aid treat karo. Deterministic chahiye toh temperature=0 + cached results per-application (jo hum karte hain — score ek baar compute, DB mein frozen).

</details>

---

Ab picture almost complete hai: jobs post ho rahi, apply ho raha, scores ban rahe — par employer ko applicants **kahan dikh rahe hain?** Dashboard mein toh sirf count hai. C.10 mein final piece: **applicants detail page** — AI-ranked list, resume-view authenticated route, aur Batch 7 ka streaming Suspense real use mein: stats section progressive load hoga.
