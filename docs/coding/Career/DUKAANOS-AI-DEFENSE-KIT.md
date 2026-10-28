# DUKAANOS AI DEFENSE KIT — Explaining Your Voice-Billing AI Like You Built It Yesterday

> **What this file is:** interview defense material for every AI-related claim on your resume. You built the DukaanOS voice billing — Groq Whisper STT → LLM structured parse → regex fallback — and then life happened, and it blurred. This kit rebuilds the whole picture from your actual code, so an interviewer's follow-up questions land on solid ground.
>
> **When it gets used:** Milestone M5 of `CAREER-FOCUS-PLAN.md` — read it, then run the "operate your own machine" drill in Section 5, then the code walkthrough.
>
> **Target framing:** you're a Fullstack (React/Next.js/Node/TypeScript) candidate. All of this AI is **TypeScript** living inside Next.js server actions and client hooks. It is your depth signal, not your job title — and that's exactly how to present it: *"I integrated AI into an existing product, with a fallback so the product never depends on the AI."*

---

## 1. The Pipeline One-Pager

Everything the resume's AI bullet claims happens inside this flow:

```
┌──────────────────────────────────────────────────────────────────┐
│ BROWSER (client hook — useVoiceBilling.ts / useVoiceStock.ts)    │
│   MediaRecorder captures mic → negotiated mime (webm/ogg/mp4)    │
│   countdown timer stops recording (settings/default 75s)         │
│   blob ≥ 10 KB guard → FileReader → base64                       │
└───────────────┬──────────────────────────────────────────────────┘
                │ calls server action  parseVoiceAudio()
                ▼
┌──────────────────────────────────────────────────────────────────┐
│ SERVER ACTION (src/actions/voice.ts — "use server")              │
│                                                                  │
│  TIER 1a — TRANSCRIBE                                            │
│    POST https://api.groq.com/openai/v1/audio/transcriptions      │
│    model: whisper-large-v3  ·  response_format: text             │
│    multipart FormData: file, model, prompt (kirana vocabulary:   │
│    "Atta, Aloo, Chawal… rupaye, sau, bees…")                     │
│    NO language hint — auto-detect handles Hinglish switching     │
│                                                                  │
│  TIER 1b — STRUCTURED PARSE (chat/completions)                   │
│    model: openai/gpt-oss-20b · temperature 0.1 · stop: ["\n\n"]  │
│    prompt = pipe-format spec + rules + few-shot examples         │
│    + numericHint from the DB (numericProductName, shop-scoped)   │
│                                                                  │
│  TIER 2 — REGEX FALLBACK (only if Tier 1 returned ZERO items)    │
│    lib/hinglish-parser.ts: regexParse()                          │
│    Hindi number words · Devanagari→Latin · brand corrections     │
└───────────────┬──────────────────────────────────────────────────┘
                │ ParsedItem[]  {product, quantity, unit,
                │                price, unitPrice, totalPrice}
                ▼
┌──────────────────────────────────────────────────────────────────┐
│ BACK IN THE BROWSER                                              │
│   ProductMatcher (built from products + DB aliases)              │
│   pending-qty / pending-price composition ("|5|kg" attaches to   │
│   the NEXT parsed product)                                       │
│   LOOSE items keep decimals; PACKAGED items round to integers ≥1 │
│   dedupe key: productId:qty:unit:unitPrice                       │
│   → onItemsDetected(matched[]) → cart → sale → offline sync      │
└──────────────────────────────────────────────────────────────────┘

MEANWHILE (supporting cast in src/actions/aliases.ts)
   suggestProductAliases(name, category?) → LLM returns a JSON array
   of alternate spellings/misspellings/Hinglish names → stored in the
   productAlias table → feeds ProductMatcher's index
```

### The 60-second spoken version

> *"Voice billing turns a spoken Hinglish order into cart lines. The browser records audio through MediaRecorder, sends base64 to a Next.js server action, which calls Groq's Whisper for Hinglish speech-to-text — with a kirana-vocabulary prompt to bias transcription — and then a low-temperature LLM call that parses the transcript into a strict pipe format, like `Aloo|2|kg`. Every parsed name is matched against the shop's real product table with a matcher that uses stored aliases. There are two tiers: the LLM is tier one, and only if it returns nothing, a deterministic regex parser takes over — Hindi number words, Devanagari transliteration, brand corrections — so the feature still works when the AI doesn't answer."*

---

## 2. The Six Real Pieces (nothing in your AI is homeless)

| # | Real piece | File(s) | What it does |
|---|---|---|---|
| 1 | **Whisper STT call** | `src/actions/voice.ts` → `transcribeGroq()` | audio → transcript, kirana-vocabulary `prompt` biasing, auto language detect, mime-to-extension mapping (mp4/ogg/wav/webm) |
| 2 | **LLM structured parse** | `voice.ts` → `parseWithGroq()` | transcript → `ParsedItem[]` via the pipe-format prompt (temperature 0.1, `stop: ["\n\n"]`, `reasoning_effort: "low"`) |
| 3 | **Regex fallback parser** | `src/lib/hinglish-parser.ts` | `HINDI_NUMBERS` map (ek…nau, das…nabbe, sau, plus `paav`=0.25, `aadha`=0.5, `dedh`=1.5, `sava`=1.25), `UNIT_MAP` (kilo→KG, packet→PACKET…), `BRAND_CORRECTIONS` ("dairy milk"→'Dairy Milk', "kitkat"→'KitKat'…), `devanagariToLatin()` with consonants/matras/Devanagari digits ०-९ |
| 4 | **Voice-stock flow** | `src/actions/voice-stock.ts` + `src/hooks/useVoiceStock.ts` | the same two-tier idea applied to stock entries (uses `whisper-large-v3-turbo`; logs "transcribed by: Groq Whisper / parsed by: Groq LLM") |
| 5 | **Alias generator** | `src/actions/aliases.ts` · and the `generate-aliases*` scripts | LLM (`suggestProductAliases`) suggests common misspellings/Hinglish alternate names as a JSON array → `productAlias` table (CRUD with shop-scope + `revalidatePath("/products")`; Devanagari aliases are rejected) |
| 6 | **Client integration** | `src/hooks/useVoiceBilling.ts` (+ `src/lib/product-matcher.ts`) | mime negotiation, ≥10 KB blob guard, countdown timer (localStorage `voiceTimerDuration`, default 75 s, range 10-300), re-entrancy guard, pending qty/price composition, LOOSE vs PACKAGED rounding, dedupe, matcher index rebuilt when the product list changes |

---

## 3. Concept Cards

### Card 1 — Whisper STT: what the call actually is

Speech-to-text = one HTTP call with `multipart/form-data`: an audio `Blob`, `model: "whisper-large-v3"`, a `prompt` string, `response_format: "text"`.

The **prompt biasing** trick is worth naming precisely: the STT prompt seeds the model with domain vocabulary — `"Atta, Aloo, Chawal, Daal, Cheeni, Doodh, Bidi, Parle-G, KitKat, 5 Star… rupaye, wali, ka, ki, sau, chalis, bees, paanch, das, kilo, packet, litre"` — so Hinglish store-talk comes back as recognizable product words instead of garbled nearest-phoneme guesses. There is **no language hint**: auto-detect handles Hindi-English code-switching on its own.

**Say it in interviews as:** *"I bias the transcription prompt with store vocabulary — item names and Hindi number words — so Whisper normalizes Hinglish product talk into matchable tokens."*

### Card 2 — The LLM call anatomy

One `fetch` to Groq's OpenAI-compatible `/chat/completions`:

```ts
fetch(`${GROQ_API}/chat/completions`, {
  method: "POST",
  headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "openai/gpt-oss-20b",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
    reasoning_effort: "low",
    stop: ["\n\n"],
  }),
})
```

Four decisions each have a one-line justification:
- **temperature 0.1** → parsing is extraction, not creativity; near-deterministic output.
- **stop: ["\n\n"]** → the output protocol is one item per line; a blank line means "done", so stray prose can't follow.
- **reasoning_effort: "low"** → latency matters at a billing counter; we pay for speed, not deliberation.
- **messages: single user role** → the whole spec lives in the text; no chat-history complexity to manage.

**Say it as:** *"My parse call is deliberately boring engineering: temperature near zero, a two-newline stop sequence matching the one-item-per-line protocol, and low reasoning effort for counter-speed latency."*

### Card 3 — Prompt engineering: the pipe protocol

The LLM's entire output contract is textual, and the prompt has four parts:
1. **FORMATS** — five legal shapes: `Name|qty|unit`, `Price|amount`, `Name|@unitPrice` (per-unit override), `Name|$totalPrice` (budget: "₹12 worth of bhindi"), bare `Name`.
2. **RULES** — product name always first; `kilo/kg→kg`, `paav=0.25`, `adeh/dedh=1.5`, `sava=1.25`; Hindi number words (`ek…bees`) → digits; Devanagari → Latin letters ("आलू" → `Aloo`); fixed brand spellings; the `ka/ki` distinction that turns "bhindi 40 rupee" (no `ka`) into `Bhindi|@40` vs "12 rupee **ki** bhindi" into `Bhindi|$12`; the tricky numeric-product-name split rule (prefer the longest matched number prefix).
3. **EXAMPLES** — few-shot pairs, including the hard ones (`"paanch hundred gram paneer, das rupee, teen litre milk"` → three lines incl. `Price|10` and `|5|kg` standalone-quantity) and the noise case (`"hmm yeah okay"` → empty).
4. **EOF directive** — `Now parse this: ${transcript}`.

Plus a **dynamic hint**: before each parse, the server action reads the shop's `numericProductName` rows (e.g. "5 Star", "500 Bidi" — products that literally *are* numbers) and injects `KNOWN NUMERIC PRODUCTS: …` + one disambiguation example. That's domain data steering the model at request time — multi-tenant-aware, since it's fetched per shopId.

### Card 4 — Machine parsing the output

The model's text is transformed and defended, line by line, in `parseWithGroq()`'s loop: skip empties, skip `isNoise()` garbage, handle `price|…` first, then the `3-part` / `2-part` (`@`/`$`/qty+unit) shapes, then fall back to treating a bare line as a product name. Every numeric field goes through `Number()` + `isNaN` + `> 0` guards, and every name passes through `devanagariToLatin()` + `cleanProductName()` before it's accepted. Output type:

```ts
type ParsedItem = { product?, quantity?, unit?, price?, currency?, unitPrice?, totalPrice? }
```

**Key line:** the parse layer doesn't *trust* the model — it validates everything structurally before an item exists.

### Card 5 — Two tiers: LLM is tier one, regex is tier two

```ts
// TIER 1: LLM pipe-parse
try { items = await parseWithGroq(transcript, numericHint) } catch { /* logged */ }
// TIER 2: regex fallback — only if the LLM produced nothing
if (items.length === 0) { items = mapped(regexParse(transcript)) }
```

Fallback triggers when the LLM call **throws** (network, billing, model retired) **or returns zero usable items**. Why "only if empty" and not merge both? Determinism: the LLM path with its few-shot training *is* the primary parser; the regex path is simpler and would add noise if mixed in. Two clean tiers beat one muddy hybrid.

**The sentence that keeps interviews on your side:** *"AI is an enhancement of the product, never a dependency of it."*

### Card 6 — Inside the fallback parser (`hinglish-parser.ts`)

Four lookup tables do all the heavy lifting:
- `HINDI_NUMBERS`: cardinal words (`ek`…`nabbe`, `sau`=100) **plus fractional speech**: `paav`=0.25, `aadha`=0.5, `dedh`=1.5, `sava`=1.25.
- `UNIT_MAP`: spoken units to canonical ones (`kilo`→KG, `packet`→PACKET, `dozen`→DOZEN…).
- `BRAND_CORRECTIONS`: keyboard-mangle variants → real brand names (`"kit cat"`/`"kitkat"`→`KitKat`, `"parleg"`→`Parle-G`).
- `DEVANAGARI_MAP` + `MATRAS` + `DIGITS`: a char-arithmetic transliterater — consonants, vowel signs (matras), and Devanagari digits `०-९` → Latin, so `"आलू"` comes out as `Aloo` even when it arrives in the Unicode script.

This is intentionally dumb-and-deterministic: no model, no network, no cost — the tier that **cannot** have an outage.

### Card 7 — From parsed text to cart: the matcher and the business rules

`ProductMatcher` indexes the shop's real products **plus** their stored aliases (from Card 8's generator), so `"aata"` still finds `"Aata (whole wheat)"`. Then the client hook composes the final cart line:
- A standalone quantity (`|5|kg`) or price (`Price|10`) without a product is held as *pending*, and attaches to the **next** parsed product — mirroring how the shopkeeper speaks ("5 kilo… aloo").
- **LOOSE** items (rice, jeera) keep decimal quantities; **PACKAGED** items (biscuits, soaps) round to integers ≥ 1 — you don't sell 1.25 rational packets of Parle-G.
- Budget totals convert: `totalPrice ÷ unit price` = actual quantity.
- A **dedupe key** `productId:qty:unit:unitPrice` prevents double-logging the same spoken line on re-processing.
- An unmatched product (`no match for: …`) is *dropped*, not invented — hallucination can't make a sale.

### Card 8 — The alias generator (+ key security + model versioning)

Aliases are how the voice pipeline stays robust long-term: `suggestProductAliases(productName, category)` asks the LLM for *common spellings, misspellings, and Hinglish alternate names* as a raw JSON array — and the response is stored in `productAlias`, feeding the matcher's index. The LLM is doing **offline data generation**: it widens the deterministic path's vocabulary in one call, so the runtime never pays for it separately.

Two operational notes to carry:
- **API key security:** `GROQ_API_KEY` is read from `process.env` inside `"use server"` actions only — never in client bundles; the browser only ever sees base64 audio.
- **Model versioning:** model IDs are strings ("openai/gpt-oss-20b"). Providers retire models; your fix was deliberately low-cost because the API is OpenAI-compatible — change the string, re-test, done. (This is also your honest line for *"what happens when a model is deprecated?"*)

---

## 4. Interview Questions — Model Answers

Each answer is 2-4 sentences. Practice spoken, one question per session end if you like.

**Q1. What does AI actually do in your project?**
A: Two things. Runtime: Whisper speech-to-text plus an LLM structured-parse of Hinglish voice orders into cart items in my kirana POS. Offline-ish: an LLM-generated alias vocabulary stored per product, which is how customer speech still matches real SKUs.

**Q2. Walk me through the flow end to end.**
A: Browser records via MediaRecorder, base64s the blob, calls a Next.js server action. That action transcribes with Whisper (a seeded vocabulary prompt, auto language detection), parses the transcript with a strict pipe-formatted LLM prompt, falls back to a deterministic regex parser if the LLM returns nothing. Parsed items get matched against the shop's product table — with aliases — pending quantities compose, packaged items round to whole numbers, and cart lines get deduped by key. No AI in the cart-write path at all.

**Q3. Why Groq specifically?**
A: An OpenAI-compatible API so swapping model strings is trivial (I actually survived a model retirement doing exactly that), fast transcription, and both STT and LLM from one provider/key. I'm not architected around any one vendor — the interfaces are HTTP calls with one model string each.

**Q4. What if the LLM is unavailable or returns garbage?**
A: Two-tier design. Tier 1 is the LLM parse; tier 2 is a deterministic regex parser using Hindi number-word mappings, Devanagari transliteration and brand corrections — engaged when the LLM throws or returns zero items. And separately, unknown products are rejected at the matcher level, so a hallucinated name can't produce a line item. I demonstrated the degradation path by clearing the API key in dev — same transcript still parsed.

**Q5. How do you handle hallucinations?**
A: Three layers of distrust: strict output protocol (pipe format with few-shot examples and a gibberish-means-empty rule), structural validation at parse time (`isNoise`, numeric guards, canonical name cleaning), then DB-match at product level where unmatched names are dropped. The model produces candidates; the system decides acceptance.

**Q6. Why pipes instead of JSON?**
A: The items are one-per-line and the vocabulary is code-switched Hinglish — pipe rows are trivially splittable, immune to brace-balancing, and cheap to repair at the line level even when one line goes bad. Today I'd evaluate native structured-output / JSON modes explicitly, but the pipe protocol kept repairs local and semantics obvious.

**Q7. What prompt-design decisions are you proudest of?**
A: The `ka/ki` grammatical distinction mapping to price semantics (`Bhindi|@40` per-unit vs `Bhindi|$12` total-budget), the product-first line convention to stop quantity/name ordering flips, and injecting per-shop numeric-product hints (like "500 Bidi") so number-adjacent product names disambiguate.

**Q8. How do you safely parse the LLM's output?**
A: Line-split, skip noise, dispatch on shape (price `|`, 3-part, 2-part `@`/`$`, bare name), `Number()`+`isNaN`+positive guards on every field, then `devanagariToLatin()` + `cleanProductName()` on every name. An item only exists if it survived all of that.

**Q9. How is Hindi number language handled?**
A: Both tiers know it independently: the LLM prompt spells out `ek…das`, `paav=0.25`, `sava=1.25` etc. and the regex tier has its own word map plus Devanagari digits ०-९ in transliteration. Redundant paths by design — the cheap deterministic one must not depend on the fluent probabilistic one.

**Q10. Tokens, context window, temperature — in *your* task?**
A: Our prompt is well under the context limit (spec + examples + shop hint); audio is handled first by transcribing, so the parse call never sees audio at all. Temperature is 0.1 because parsing is extraction, not generation — I don't want the model being creative about my prices. `reasoning_effort: low` and `stop: ["\n\n"]` exist for latency and protocol discipline.

**Q11. How does a parsed item become a cart line?**
A: ProductMatcher first (real products + stored aliases), then composition: standalone quantities/prices from separate lines attach to the next named product; budget totals convert via `total ÷ unit price`; packaged items round to whole packs, loose items keep fractions; dedupe key `productId:qty:unit:unitPrice` guards re-processing.

**Q12. Where's your API key?**
A: Server-side only — `process.env.GROQ_API_KEY` read inside `"use server"` actions. The client sends base64 audio and gets parsed items; no model traffic ever originates from the browser, which means no key in the bundle.

**Q13. Why is AI not your primary path?**
A: Environment constraint driving architecture: kirana counters have flaky networks and real money moves, so the feature degrades gracefully to a deterministic parser instead of dying with the API. The resume bullet says this directly — production wisdom is often positioning AI as optional enhancement rather than lifeline.

**Q14. What would you improve next?**
A: Streaming partial results to keep perceived latency low; native structured-output modes instead of my prompt contract; a re-ask loop when confidence is low (audio quality issues happen at counters); and maybe Whisper-adjacent alternatives benchmarked specifically for Hinglish code-switching.

**Q15. What did building this teach you?**
A: Fallback-first thinking — designing the deterministic path first, and letting AI sit on top of it, is what made the feature shippable. And that a prompt is code: versioned, reviewed with examples, and constantly adversarially tested against things people actually say.

---

## 5. Operate-Your-Own-Machine Drill (Milestone M5)

Reading builds the map; this drill rebuilds the *memory*. Do it once, slowly, watching the logs.

1. `npm run dev` in `Dukaan_OS/`. Open the billing page with voice billing enabled.
2. Speak: **"do kilo aloo, ek packet Parle-G"**. Watch the console for, in order:
   - `[voice:server] transcribeGroq mimeType: … ext: … base64 len: …`
   - `Groq transcription result:"do kilo aloo, ek packet Parle G", (…ms)`
   - `parseWithGroq done: [{product:"Aloo",quantity:2,unit:"kg"}, …]`
   - `[voice] matched: Aloo × 2 kg @ ₹…` → cart updates
3. Speak an unknown product ("ek packet magic sponge") → watch `no match for:` and the cart stay clean.
4. **AI-down simulation:** remove/clear `GROQ_API_KEY` from `.env.local`, restart the dev server, speak the same order, and watch tier 2 carry the parse. Then restore the key and restart. (State this in interviews as something you *demonstrated*, not just designed.)
5. Then the walkthrough, with this kit open (notice list per file):
   - `src/actions/voice.ts` — FormData construction + mime-ext mapping + the `Now parse this: ${t}` tail + the two-tier try/catch
   - `src/hooks/useVoiceBilling.ts` — `getSupportedMimeType()` negotiation, `blob.size >= 10000` guard, pending-qty/price composition, LOOSE/PACKAGED rounding, dedupe key
   - `src/lib/hinglish-parser.ts` — the four maps (HINDI_NUMBERS, UNIT_MAP, BRAND_CORRECTIONS, DEVANAGARI/MATRAS/DIGITS)
   - `src/lib/product-matcher.ts` — index built from products + aliases; rebuilt when the products list changes
   - `src/actions/aliases.ts` — `suggestProductAliases` LLM prompt → JSON array; CRUD + shop-scoping + `revalidatePath`
   - `src/actions/voice-stock.ts` + `src/hooks/useVoiceStock.ts` — same pipeline re-applied (turbo model; the "transcribed by / parsed by" logs)

---

## 6. What NOT to Go Deeper On (and what to say when pushed)

Still out of scope for interviews on this project — these are post-offer territory (`Agentic AI Production` course, the `Agentic AI` intro Phases 2-8):

- LangChain/LangGraph/agent frameworks — not used here, honestly: *"I used direct API calls where a framework would have been heavy for a two-call pipeline."*
- Vector DBs / RAG — not in this feature; if asked hypothetically: *"For product matching I have a small, closed vocabulary — an alias index; RAG aims at open corpora, which isn't this problem's shape."*
- Fine-tuning — not needed for two tasks with strong prompt/few-shot behavior; your fallback tier already covers the tail.

The polished "park it" line: *"Deliberate scope decision — direct API calls plus deterministic fallback made the feature verifiable and cheap; frameworks and deeper AI patterns are things I'm excited to grow into next."*

---

**Related files:**
- `CAREER-FOCUS-PLAN.md` — this kit runs inside M5
- `RESUME-DRAFT.md` — the resume bullet these Q&As defend
- `TRADESTACK-DEFENSE-KIT.md` — the sibling kit for the other resume project
- Code: `Dukaan_OS/src/actions/voice.ts` · `voice-stock.ts` · `aliases.ts` · `Dukaan_OS/src/hooks/useVoiceBilling.ts` · `useVoiceStock.ts` · `Dukaan_OS/src/lib/hinglish-parser.ts` · `product-matcher.ts`
