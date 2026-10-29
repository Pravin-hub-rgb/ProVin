# CAREER FOCUS PLAN — Fullstack (React · Next.js · Node · TypeScript)

> **Simplified roadmap:** See `Career/README.md` for a plain checklist version.
>
> **What this file is:** the full plan with all standing rules and milestone detail. Use `Career/README.md` if you just want the simple checklist.
>
> **The one rule when confused:** open `Career/README.md`, look for the topmost unchecked milestone in this file, and do only that. Nothing else exists while a milestone is active.
>
> **Progress marking:** every milestone has checkboxes. After each session, tick what you completed. Wherever you stop is exactly where you resume. There is no "restart".

---

## A. Standing Rules (nothing has authority over these)

1. **One active milestone at a time.** Open the next one only when the current one's "Done when" is met — or when you use its skip-license.
2. **Never-behind principle.** A break is not lost progress. Reopening after any gap just means: resume where you stopped.
3. **Skip-licenses are legitimate tool, not failure.** Every milestone lists a skip condition. Walking away from a heavy item keeps the plan alive; grinding a bad item kills it.
4. **Labs are a private gym.** All hands-on labs live in one folder (`C:\Users\Pravin\Desktop\main\hands-on-gym\`), each under ~150 lines, and **never** go on the resume. They exist so your hands have touched each concept ground floor, nothing more.
5. **Language identity: TypeScript/JavaScript only.** Your headline is *Fullstack — React · Next.js · Node · TypeScript*. Python never appears in your headline, summary, or skills column. It appears only as the language of TradeStack's backend bullets — because it's already shipped there, and real work doesn't get un-declared.
6. **Truth rule.** Never write or say any claim your code can't back up. M0 exists because of this rule — it caught real fiction already (see below).
7. **Post-offer parking lot.** `Agentic AI Production` (LangChain/LangGraph/RAG), the `Agentic AI` intro course Phases 2-8, and all new one-day AI-assisted projects are for **after the first offer**. Your build-fast skill is a growth-track superpower, not a pre-interview distraction.
8. **One DSA problem ends every session.** From `docs/coding/DSA/roadmap.md` Phase 1 order, in sequence, unaided. No daily quota — but never let two sessions pass without one. This matters: at the fresher level, DSA is the gate most interviews actually decide on.
9. **When uncertain between options:** default to the option that touches fewer things at once.

---

## B. The Milestone Ladder

Order is fixed below; pace is not defined anywhere on purpose.

- [ ] **M0 — Truth Audit** (finds every claim your code can't support)
- [ ] **M1 — Lab A: FastAPI + SQLite CRUD** (server basics, ground floor of TradeStack's Python side)
- [ ] **M2 — Lab B: CSV → DB → SMA → scan filter** (scanning ground floor, + B2 parallel extension)
- [ ] **M3 — Lab C: parallel data intake + mini state machine** (TypeScript, ground floor of the live side)
- [ ] **M4 — Lab D: your own AI parse lab** (prompt → structured parse → regex fallback, TypeScript)
- [ ] **M4.5 — Lab E: Dockerize the Phase 1 project** (Dockerfile + compose + volume mount, persist SQLite across restart)
- [ ] **M5 — Remember DukaanOS** (AI kit + operate-your-own-machine drill)
- [ ] **M6 — Remember TradeStack** (4-part map + defense kit rehearsal)
- [ ] **M7 — React 100-question diagnostic** → patch RED topics
- [ ] **M8 — Next.js 100-question diagnostic** → patch RED topics
- [ ] **M9 — Make it real** (DukaanOS deployed live, real READMEs, screenshots)
- [ ] **M10 — Resume + LinkedIn** (fill from real code, ATS PDF)
- [ ] **M11 — Core subjects gap-scan** (OS · OOP · DBMS · CN · web internals)
- [ ] **M12 — One recorded mock interview** → patch weak spots
- [ ] **M13 — Applications** (startable any time after M10)

---

## C. M0 — Truth Audit

**Goal:** every resume bullet and every defense-kit claim is either verified against your real code, or corrected. Interviews die on follow-up questions probing a bullet you wrote but can't trace.

**Known findings already fixed while writing this plan** (you don't need to fix these, the files were corrected):
1. "13 indicators — SMA, RSI, EMA, MACD, Bollinger" → fiction. Real set in `TradeStack/backend/src/indicators.py`: **SMA (20/50), MA angle, ADR %, ADR absolute, price change (1/5/20d), distance from period high/low** + scanner filters (price range, ADR threshold, liquidity). There is no RSI in TradeStack.
2. Stale "llama-3.3-70b-versatile" model line → your DukaanOS code actually uses `openai/gpt-oss-20b` (and `whisper-large-v3` for STT).
3. "930 lines / 14 modules / 48 endpoints" → reality: **1,240 lines / 15 modules / 49 endpoints**.

**Do these, in order — with your resume draft and code open side by side:**

1. **TradeStack backend shape:** run
   `Select-String -Path "C:\Users\Pravin\Desktop\main\TradeStack\backend\server.py" -Pattern "^@app\." | Measure-Object`
   Read the route list once. Routes should match the Defense Kit's reading map.
2. **Indicators:** read `TradeStack/backend/src/indicators.py` (141 lines). You must be able to name the 6 indicator groups and the 3 filter checks from memory afterwards.
3. **DukaanOS schema claim:** count models in `Dukaan_OS/prisma/schema.prisma`
   `Select-String -Path .\prisma\schema.prisma -Pattern "^model "` — the resume says "18-model". If wrong, fix the resume line to the real number.
4. **Multi-tenant claim:** the resume says multi-tenant authorization scoped by shopId across server actions. Spot-check: open 2-3 files in `Dukaan_OS/src/actions/`, confirm `shopId` scoping exists. Fix the number "162 enforcement points" if you can't trace it — better, rewrite it as "enforced across server-action modules" without a count you can't re-derive.
5. **Offline sync claim:** read `Dukaan_OS/src/lib/sync.ts` briefly — confirm the Dexie queue → `/api/sync` replay story matches the resume bullet.
6. **Voice claims:** confirmed already during planning (files read, accurate). Just re-read the bullet once.
7. **Rewrite or delete anything** in `RESUME-DRAFT.md` you cannot trace to code. A smaller truthful resume beats a bigger impressive one you collapse under.

**Done when:**
- [ ] Every TradeStack bullet in `RESUME-DRAFT.md` has a ✓ (bullet ↔ file you traced it to)
- [ ] Every DukaanOS bullet likewise
- [ ] Anything untraceable is rewritten or removed
- [ ] You can name the real TradeStack indicators and your real model names from memory

**Skip-license:** none — this milestone is the whole plan's foundation. If a sub-item stalls, mark it and come back inside M0; don't move to M1 with unknown fiction on the resume.

---

## D. Labs (M1–M4) — ground rules first

- Location: `C:\Users\Pravin\Desktop\main\hands-on-gym\<lab-name>\` — one folder per lab, one git repo or plain folder, both fine.
- Cost cap: ~150 lines each (B2 is ~10 more). If a lab is outgrowing that, you're overbuilding — cut features, keep the concept.
- Every lab ends the same way: run the demo, then **explain it out loud in 90 seconds** (record it). If you can't explain it, the lab isn't done — reread, compress the explanation, retry once, then move on regardless.
- The practice used to fill the labs: your own course notes `docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/` (files listed per lab).

### M1 — Lab A: FastAPI + SQLite CRUD

**Teaches:** HTTP endpoints, request validation, persistence, status codes, `/docs`.

**Follow your own notes (they're written ultra-simple, line by line):**
1. `1.0 Phase 1 - Kya Seekhenge + Project Preview.md` (skim the project preview)
2. `1.1 Path & Query Params.md` · `1.2 Pydantic + Request Body.md` · `1.3 CRUD.md` · `1.4 SQLite se Jodo.md` (theory)
3. `1.5.1 Planning` → `1.5.2 Server Khada` → `1.5.3 Data Layer` (build hands-on)

**Build:** a small "items" API — create, list (with a filter query), update, delete, all persisted to SQLite so data survives restart. Test from the notes: 201 create / 422 bad type / 409 duplicate / 404 missing / restart-keeps-data.

**Done when:**
- [ ] `GET /health` returns 200 and `/docs` shows all routes
- [ ] CRUD flows work with correct status codes
- [ ] Restart the server — data still there
- [ ] 90-sec spoken explanation recorded

**Skip-license:** if the setup/tooling friction (venv, pip) is the blocker specifically, that's the friction to push through once; skip is for the **content**, not the setup. If you truly can't face this lab, watch the notes pass by and read the code in the notes instead — then M6 covers the interview side.

**Bridge:** TradeStack's Python side is this shape at scale — routes + SQLite + validation (49 endpoints, WAL mode).

### M2 — Lab B: CSV → DB → SMA → scan filter

**Teaches:** the pandas/indicators layer — how TradeStack's data pipeline is shaped, at ground level.

**Follow:** `1.5.4 Indicators` and `1.5.5 Scan Endpoint` notes. **Your own trim applies: SMA only.** RSI in the notes stays a reading exercise if you're curious (it does appear there as a pandas technique), never a requirement — and remember: TradeStack itself uses no RSI.

**Build:**
- a tiny `prices.csv` (5 symbols × 60 rows is plenty; synthetic numbers fine)
- `prices` table in SQLite, seeded from the CSV
- `GET /api/indicators/{symbol}` — returns SMA(20), optionally SMA(50) for the last row
- `GET /api/scan?min_close=...&max_close=...` — filters stocks whose latest close is in range, sorted, limited

**B2 extension (~10 lines):** run the SMA computation for all symbols twice — once in a plain loop, once via `ProcessPoolExecutor`. Print both timings. With tiny data the speedup may be invisible; the point is that you *felt the mechanism*, and can say the sentence: "CPU-bound math parallelizes across processes because Python's GIL blocks threading."

**Done when:**
- [ ] Indicators endpoint returns real SMA numbers for a seeded symbol
- [ ] Scan endpoint filters + sorts + limits
- [ ] B2 ran both ways at least once
- [ ] 90-sec explanation includes: vectorization (rolling windows at C speed) AND the GIL sentence

**Skip-license:** if the DB/CSV plumbing stalls you twice in a row, keep only the indicator endpoint, drop the scan endpoint and B2, and continue — the concept was the moving-average layer, and you'll have it.

**Bridge:** `indicators.py` in TradeStack does exactly this, bigger: 6 indicator groups, `np.correlate`-accelerated MA angle, pickled per-stock caches.

### M3 — Lab C: simulated feed → per-symbol callbacks → mini state machine (TypeScript)

**Teaches:** the live-trading side's ground floor: event-driven I/O, per-symbol routing, finite state machines. Uses a **simulated** feed — no Upstox, no tokens, no network.

**Build (~150 lines, any tiny Node/TS setup, `npx tsx` runs it):**
- `feed.ts` — for 3-5 symbols, a looping timer pushes fake OHLC ticks (random walk is fine). Once per N ticks, a symbol emits a "signal" event. Add one intentional pause-and-resume of the whole feed so you feel a disconnect/reconnect cycle.
- `machine.ts` — a 4-state machine: `IDLE → WATCHING → IN_POSITION → EXITED`. Table of allowed transitions; a call that doesn't match the table logs "INVALID TRANSITION" instead of crashing.
- `index.ts` — subscribe every symbol, route ticks through a per-symbol machine, print a readable state timeline.

**Done when:**
- [ ] Feed runs; you see per-symbol state changes print
- [ ] At least one invalid transition demonstrated (feed a signal twice, or exit from IDLE)
- [ ] One disconnect → resume cycle happened without the process dying
- [ ] 90-sec explanation includes the two sentences: *"one process, N subscriptions, callbacks per tick — the event loop is doing the concurrency"* and *"...the state machine guarantees a stock is in exactly one phase, so double entries can't happen."*

**Skip-license:** if TS tooling friction blocks you, write the same three files in plain JavaScript — the concept is identical.

**Bridge:** this is the shape of `TradeStack/frontend/src/lib/live-trader/` — `streamer.ts` (real WebSocket + protobuf + reconnect-with-backoff) and `continuation/state-machine.ts` / `reversal/state-machine.ts` (your real 11-state machines). When you later read those in M6, you'll recognize everything.

### M4 — Lab D: your own AI parse lab (TypeScript)

**Teaches:** the DukaanOS voice-AI ground floor — prompt → structured parse → fallback — in your hands, minus the microphone part.

**Build (~150 lines, one tiny TS project, your existing `GROQ_API_KEY` as env var):**
- `prompt.ts` — a simplified pipe-format parsing prompt (adapted from your real one: product first, `name|qty|unit` lines, `Price|X`, `@unitPrice` vs `$totalPrice`, Hindi number words, gibberish → empty response)
- `llm.ts` — `fetch("https://api.groq.com/openai/v1/chat/completions")` with model `openai/gpt-oss-20b`, `temperature: 0.1`, `stop: ["\n\n"]`, parse the pipe lines into items
- `fallback.ts` — a small regex parser: Hindi number-word map (subset), a few brand corrections, simple `product|qty|unit` scans
- `index.ts` — CLI: `tsx index.ts "do kilo aloo, 10 rupee ki bhindi" --engine auto|llm|regex`; `auto` tries the LLM and falls back to regex when the model fails *or returns nothing* (exactly TIER 1 / TIER 2 logic)

**Done when:**
- [ ] LLM path parses a two-item Hinglish order correctly
- [ ] Fallback path parses the same order with the LLM path deliberately broken (rename the env key temporarily)
- [ ] `auto` degrades gracefully — no crash, fallback engaged
- [ ] 90-sec explanation includes: why the pipe format is machine-friendly, why temperature is low, and why fallback exists ("AI is an enhancement, not a dependency")

**Skip-license:** this lab is your closest match to the resume's AI bullets — if any lab earns full attention instead of being skipped, make it Lab D. If M5's operate-drill already made the flow feel close, still do it once, hands on your own copy.

**Bridge:** `Dukaan_OS/src/actions/voice.ts` `parseWithGroq()` + `src/lib/hinglish-parser.ts`. Your lab is the same two-tier design you shipped, minus STT and multi-tenant plumbing.

### M4.5 — Lab E: Dockerize the Phase 1 project

**Teaches:** how to package a backend + SQLite as run-anywhere software so an interviewer can start it with one command. This is the real interview signal (not production deployment).

**Follow your own notes first** — they include Appendix A (Docker) inside Phase 1:
1. `docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.0 Docker Kya Hai + Overview.md`
2. `docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.1 Dockerfile + .dockerignore.md`
3. `docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.2 Docker Compose - Volumes + Service.md`
4. `docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.3 Test Karo + TradeStack Bridge.md`

**Build (in your Lab A folder):**
- `.dockerignore` (exclude `venv/`, `__pycache__/`, `data/`, `*.md`)
- `Dockerfile` (`python:3.12-slim`, copy `requirements.txt` first, `pip install --no-cache-dir`, copy app, `CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`)
- `docker-compose.yml` (build from `.`, port `8000:8000`, volume `./data:/app/data`)

**Done when:**
- [ ] `docker compose up --build` serves the app on `http://localhost:8000`
- [ ] `GET /health` returns 200 inside container
- [ ] Seed a record via API → `docker compose down` → `up` again → record persists (volume mount works)
- [ ] One `curl` smoke test saved in `/tmp/` or a note: `curl http://localhost:8000/health`
- [ ] 90-sec explanation includes: "image build caches dependencies; volume mount persists SQLite; `--host 0.0.0.0` makes container ports reachable"

**Skip-license:** if Docker won't install in your environment, skip with a written note ("could not install Docker Desktop — Lab E marked skipped"). Do **not** skip without attempting the install first.

**Bridge:** TradeStack's `backend/` uses the same pattern at scale — `server:app` entry point instead of `app.main:app`, `./backend` build context, port `5000`, same volume mount for `data/`. The 16-lab reading map in `TRADESTACK-DEFENSE-KIT.md` Section 6 covers the production TradeStack deployment.

---

## E. M5 — Remember DukaanOS

**Goal:** you can explain every DukaanOS bullet — especially the AI parts — in your own words, live, not from memory of a write-up.

**Do, in order:**
1. Read `DUKAANOS-AI-DEFENSE-KIT.md` end to end (pipeline one-pager, 8 concept cards, Q&A section).
2. **Operate your own machine** (the drill):
   - Run `npm run dev` in `Dukaan_OS/`, open the billing page with voice billing.
   - Speak a Hinglish order ("do kilo aloo, ek packet Parle-G") — watch the console logs fire: `[voice:server] transcribeGroq…`, `Groq transcript:`, `parseWithGroq done:`, `[voice] matched: …`.
   - Repeat once with an unknown product — watch `no match for:` tell you the matcher rejected it.
   - Simulate AI-down: temporarily clear `GROQ_API_KEY` from `.env.local`, restart the dev server, speak the same order, watch the transcript still get parsed by the regex tier. **Restore the key afterwards.** This single drill is your "what if the AI is down?" interview answer, demonstrated.
3. **Code walkthrough with the kit open** (each file, notice only what the kit flags): `src/actions/voice.ts` (339 lines — STT + two-tier parse), `src/hooks/useVoiceBilling.ts` (recorder, mime negotiation, pending qty/price composition, dedup), `src/lib/product-matcher.ts` (name/alias matching), `src/lib/hinglish-parser.ts` (number words, Devanagari map, brand corrections), `src/actions/aliases.ts` (`suggestProductAliases` — LLM as offline alias generator), `src/actions/voice-stock.ts` and `src/hooks/useVoiceStock.ts` (the same pipeline applied to stock updates).
4. Record your **2-minute DukaanOS pitch** (script is in `RESUME-DRAFT.md`) and the three war stories: offline queue replay · multi-tenant scoping · voice parser fallback. Listen back once.

**Done when:**
- [ ] Kit concept cards read (all 8)
- [ ] Operate drill done, including the AI-down simulation
- [ ] Walkthrough checklist: all 7 files touched, each with one thing you noticed
- [ ] Pitch + 3 war stories recorded and listened to once

**Skip-license:** if your app can't run locally right now, do steps 1, 3, 4 and defer the drill to M9 (deploy smoke test covers the same ground).

---

## F. M6 — Remember TradeStack (the 4-part map)

**Goal you already accepted:** you don't need to re-know the codebase — you need to narrate the exam surface. The Defense Kit holds that surface. The four parts, for the map to live in your head:

| Part | What it is | Interview weight | Where you'll learn it |
|---|---|---|---|
| 1 — UI | Next.js/React pages, settings screen | LOW (only the 47-URL refactor story) | already finished work + M8 |
| 2 — Python brain | FastAPI server, data pipeline, 49 endpoints | HIGHEST | Kit Cards 1-3, reading map sittings 1-2, Labs A |
| 3 — Scanners | indicators, continuation/reversal scan, breadth | MED-HIGH | Kit Cards 4-5, reading map sitting 3, Lab B(+B2) |
| 4 — Live trading | Node streamer, state machines, paper trader | MED (2 rich war stories) | Kit Cards 6-9 + short live-side reading |
| Glue — SQLite WAL | one file, two runtimes | single high-value card | Kit Card 3 |

**Do:**
1. Defense Kit concept cards (1-9), one sitting at a time.
2. Reading map (Kit Section 5): three short coverings — server skeleton+routes → data layer → scanners/breadth. Plus the short live-side bonus: `streamer.ts` and `continuation/state-machine.ts` only.
3. Rehearse aloud, recording each: Kit Q1, Q3, Q5, Q6, Q7, Q9, Q11, Q15 — and the corrected live-side answer from Card 9 (**"concurrent I/O in Node, parallel compute in Python" — never "JS has better parallelism," that phrasing is a landmine**).
4. Record the 2-minute TradeStack pitch (script in the Kit) and the war stories: Upstox SDK prototype patch + reconnect-with-backoff · state-machine position cap · SQLite WAL shared between runtimes.

**Done when:**
- [ ] All cards read; reading map covered (3 + short bonus)
- [ ] Listed Q&As rehearsed aloud, recorded, heard once
- [ ] Pitch + 3 war stories recorded
- [ ] You can draw the tri-partite diagram from memory on paper

**Skip-license:** route anything that feels heavy into "note it, move on" — heavy reading has never once been the gate; speaking practice is the gate here.

---

## G. M7 — React Diagnostic, M8 — Next.js Diagnostic

**Method (both milestones, one before the other):**
1. Open the 100-question file: `docs/coding/React JS/Interview Prep/100 React Interview Questions.md` for M7; `docs/coding/Next JS/Interview Prep/100 Next.js Interview Questions.md` for M8.
2. For every question, answer **out loud** (or record), then mark GREEN (could answer now) / YELLOW (half-remembered) / RED (blank).
3. Marking only — no studying during the pass.
4. Then patch RED topics (and weak YELLOWs) using the matching course batches (`React JS/Batch 0-6…`, `Next JS/Module 0`, `Batch 1-8…`).
5. After patching: re-answer the previously-RED questions aloud until they move to GREEN/YELLOW.

**Done when:**
- [ ] Both diagnostics done; RED list shrunk (compare round 1 → round 2 in the file's own margins or track in README)
- [ ] Old RED questions re-answered aloud

**Skip-license:** if marking reveals everything is GREEN — trust it once, move to M9. Trust a real diagnostic, doubt a feeling.

---

## H. M9 — Make It Real

**DukaanOS:**
- [ ] Push current repo state to GitHub (repo hygiene: stray files moved or removed, meaningful README replaces the create-next-app boilerplate — features, architecture screenshot/diagram, Prisma schema summary, setup steps, env list, screenshots)
- [ ] Deploy on Vercel with Supabase/Postgres + auth + `GROQ_API_KEY` env vars; smoke test: login → add product → bill → voice billing → (bonus) offline queue replay works
- [ ] If deployment fights back on infrastructure: a clean 40-second screen-recording demo is the acceptable fallback — resume links to recording, not a broken URL
- [ ] Note the live URL in `RESUME-DRAFT.md` project links table

**TradeStack:**
- [ ] Rewrite the real README: tri-partite architecture diagram, tech table with a "why this tech" column, run instructions, short screenshots
- [ ] A `setup.ps1`/`setup.sh` that gets a fresh machine from clone to running — nice-to-have, do it if energy allows
- [ ] Dockerizing is bonus-only, only if everything else is done; "explain Docker vs run Docker" distinction stays honest

---

## I. M10 — Resume + LinkedIn

- [ ] `RESUME-DRAFT.md` → fill real personal details (phone, email, GitHub, LinkedIn, education)
- [ ] Gold-standard check against M0: every bullet still traceable; no lies anywhere (including "Docker (basic)" — remove unless true)
- [ ] Export ATS-friendly PDF (single column, no tables/graphics)
- [ ] LinkedIn: headline (Fullstack — React · Next.js · Node · TypeScript), About (2 projects' value, 1 line each), Featured (both repos, live link), Skills pruned to what you can defend
- [ ] Update the project-links table (both GitHub URLs + live URLs)

**Applications can start any time after this milestone — see M13.**

---

## J. M11 — Core Subjects Gap-Scan

Headers-and-gaps pass, unhurried, one file at a time (`docs/coding/Core Subjects/`):
- [ ] `OS-Interview-Prep.md` · `OOP-Interview-Prep.md`
- [ ] `DBMS-Interview-Prep.md` (connects to your WAL card — high value) · `CN-Interview-Prep.md`
- [ ] `docs/coding/WEB-DEV/interview/`: `06-cors` · `20-authentication-authorization` · `04-request-lifecycle` · `01-browser-caching` · `19-api-design-rest-vs-graphql` · `nodejs.md` (closures, event loop, hoisting, promises — fullstack interviews love these)

Method: read the headings, note what you can't answer aloud, patch only those spots. A "cannot answer" note is fine for anything you'd flag honestly in interviews anyway.

---

## K. M12 — Mock Interview

- [ ] Record yourself (or with an AI tool playing interviewer): ~45 minutes. Interview-type flow: 2-min pitch → project deep-dive (aloud war stories) → DSA 2 problems spoken → core subject questions → AI/behavioral questions
- [ ] Listen back once. Write down every stumble.
- [ ] Patch stumbled spots via the matching course file — nothing else
- [ ] One more recording, same format, after patching. Compare.

The redo exists because spoken interviews improve specifically through hearing yourself — it's the fastest confidence loop there is.

---

## L. M13 — Applications

Startable any time after M10. Applications were never a "perfect first" milestone — Week-after-week polishing while zero applications go out is the classic fresher mistake. This plan applies *before* "perfect".

- [ ] Small batch of tailored applications per session: job boards (Naukri, LinkedIn, Wellfound, Internshala), Gurgaon/Noida startup listings, and a few direct founder/connect messages per batch
- [ ] Tailoring: first line of each application references the company's product/role — no fully generic blasts
- [ ] Track everything in one simple sheet: company, role, date, status, follow-up date
- [ ] Follow up on older batches before momentum fades

Rejections come. They are data, not a verdict. The mock from M12 should be repeated once mid-M13 with the punchiest questions.

---

## M. What lives outside this plan

- `Agentic AI Production` (LangChain/LangGraph/RAG Deep Dive) — **post-offer** (it's Python-heavy; same one-language logic that parked it)
- `Agentic AI` intro course — Phase 1 only is *allowed* as optional light reading any time you want grounding for AI subquestions ("tokens, context window, temperature") — it's conceptual, not a build. Phases 2-8: post-offer.
- New one-day AI-assisted projects — **post-offer**, where they become portfolio instead of distraction
- `C Sharp` course, `i-know-computers`, the finance tree, anything else in ProVin — **not in this plan**; if it became relevant someday, the README will say so. Let the README carry the weight so your brain doesn't.

---

**Related files:**
- `Career/README.md` — master map: what to open when, decision log, learn-vs-don't-need tables
- `DUKAANOS-AI-DEFENSE-KIT.md` — DukaanOS AI defense (M5)
- `TRADESTACK-DEFENSE-KIT.md` — TradeStack defense + 4-part map references (M6)
- `RESUME-DRAFT.md` — truth-checked resume to fill in (M0, M10)
- `docs/coding/DSA/roadmap.md` + `quesitons.md` — the daily ritual source of DSA problems
- `docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/` — Lab A/B source notes
