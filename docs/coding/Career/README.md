# CAREER — Master Map

> **This folder exists so your head doesn't have to hold everything.** Whenever you feel confused, overwhelmed, or split between options — do exactly this:
>
> **Open `CAREER-FOCUS-PLAN.md` → find the topmost unchecked milestone → do that one thing.**
>
> Nothing else in this folder needs to be open at the same time.

---

## 1. What Each File Is For

| File | What it holds | Open it when |
|---|---|---|
| `CAREER-FOCUS-PLAN.md` | The plan: 14 milestones (M0-M13), labs, skip-licenses, checkboxes. Zero time references — no days/weeks/hours — you are never behind, ever | Always. This is the only file you "live in" |
| `RESUME-DRAFT.md` | The truth-checked resume draft + pitch scripts + common Q&As | M0 (truth audit), M10 (finalize), or before any mock |
| `DUKAANOS-AI-DEFENSE-KIT.md` | Everything AI in DukaanOS explained from real code: pipeline, 8 concept cards, ~15 interview Q&As, the operate-your-own-machine drill | M5 (Remember DukaanOS) |
| `TRADESTACK-DEFENSE-KIT.md` | Everything Python/architecture in TradeStack explained: 4-part map, 9 concept cards, 15 Q&As, reading map, lab bridges | M6 (Remember TradeStack) |

---

## 2. Decision Log (permanent — no reopening without me)

| Decision | Value | Why (one line) |
|---|---|---|
| Target role | **Fullstack — React · Next.js · Node · TypeScript** | Both projects are fullstack; fresher AI-engineer roles need depths you don't carry; every existing asset points here |
| Resume projects | **DukaanOS + TradeStack only** | Two deep projects beat four thin ones; both are real and explainable |
| Python's job | **Explain-only + ground-floor labs** | Python never appears in your headline/summary/skills; it exists where TradeStack already shipped it |
| AI's job | **Same — explain-only + Lab D** | AI is your depth signal inside DukaanOS, done in TypeScript |
| New projects | **Post-offer only** | You can build in a day with AI — so building is not the bottleneck; explaining is. New builds come where they compound |
| `Agentic AI Production` course | **Post-offer** | LangChain/LangGraph is Python-heavy — same one-language logic |
| Time | **No clocks anywhere** | Plans without deadlines can't make you feel behind; skip-licenses replace guilt |
| Truth rule | **No claim without the code to back it** | M0 exists because fiction was found: fake RSI, wrong indicator count, stale models, wrong server stats |

---

## 3. TradeStack — Learn vs Don't-Need (the 4-part map)

You remembered it right: the project is 4 parts + 1 glue thread. Interview weight decides where effort goes:

| Part | What it is | Interview weight | Learned by |
|---|---|---|---|
| 1 — UI | Next.js pages, settings screen | LOW — only the 47-URL refactor story | Already-finished work + M8 |
| 2 — Python brain | FastAPI server + data pipeline (49 endpoints, 15 modules) | **HIGHEST** | Kit Cards 1-3, reading map, **Lab A** |
| 3 — Scanners | 5 indicator groups + filters, continuation/reversal scans, breadth | MED-HIGH | Kit Cards 4-5, reading map, **Lab B + B2** |
| 4 — Live trading | Node streamer (Upstox WS, protobuf, SDK patch), state machines, paper trader | MED — 2 rich war stories | Kit Cards 6-9 + short real-code reading, **Lab C** |
| Glue — SQLite WAL | one file two runtimes | one high-value card | Kit Card 3 |

**Reminder:** one card exists purely to protect you — Card 9. *"JS has better parallelism than Python"* is the wrong sentence; the right one is *"concurrent I/O in Node, parallel compute in Python."*

---

## 4. DukaanOS AI — Learn vs Don't-Need (the 6-piece map)

| # | Real piece | Where learned |
|---|---|---|
| 1 | Whisper STT call (biasing prompt, auto language detect) | Kit Card 1 + operate-drill (live through your app) |
| 2 | LLM structured parse (`gpt-oss-20b`, pipe format, temp 0.1) | **Lab D (you build it)** + Kit Cards 2-3 |
| 3 | Regex fallback (Hindi numbers, Devanagari map, brand fixes) | **Lab D (you build it)** + Kit Card 6 |
| 4 | Voice-stock flow (same pipeline, second consumer, turbo model) | M5 walkthrough checklist |
| 5 | Alias generator (LLM as offline batch tool) | Kit Card 8 + M5 walkthrough |
| 6 | Client integration (recorder, matcher, dedupe, LOOSE/PACKAGED rules) | Operate-drill + Kit Card 7 + M5 walkthrough |

Everything AI in DukaanOS is TypeScript. It counts under the one-language identity.

---

## 5. Course Placement — where ProVin content lives

**Active in this plan:**
- `React JS/Interview Prep/100 React Interview Questions.md` + `Batch 0-6…` → M7 (diagnostic + RED patching)
- `Next JS/Interview Prep/100 Next.js Interview Questions.md` + `Module 0`, `Batch 1-8…` → M8
- `docs/coding/DSA/roadmap.md` + `quesitons.md` → the end-every-session ritual (Phase 1 → 2 → 3 order)
- `Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/` → Lab A/B source notes (files 1.0-1.5.5)
- `Core Subjects/` (OS · OOP · DBMS · CN prep files) → M11
- `WEB-DEV/interview/` (cors · auth · request lifecycle · caching · api design · nodejs) → M11
- `Agentic AI/Phase 1 - How AI Models Actually Work/` → optional light reading anytime (concept grounding only)

**Parked — post-offer:**
- `Agentic AI Production/` (LangChain, LangGraph, RAG Deep Dive) — Python-heavy, post-offer track
- `Agentic AI/` Phases 2-8 (tool calling deep-dive, agents projects, capstone) — post-offer
- Every new one-day AI-assisted project idea — portfolio material **after** the offer, not before
- FastAPI course Phases 2+ (WebSocket, advanced async) — post-offer

**Not in this plan (don't peek without permission):**
- `C Sharp/` — a different career track entirely
- `i-know-computers/` — already-completed foundation material
- The finance tree — a different life
- Everything else: if it becomes relevant later, this README will say so. The map carries the weight so your brain doesn't.

---

## 6. Session Protocol (how every sitting works)

1. Open `CAREER-FOCUS-PLAN.md`, find the topmost unchecked checkbox in the active milestone.
2. Do as much of it as the session's energy allows. Partial progress ticked is still progress.
3. End with **one DSA problem** (ritual rule).
4. Tick what happened. Close the file. Done.
5. If confused about *what in my folder* — you're already in the right place: re-read section 1, then go back to step 1.

---

## 7. Progress Tracker

This README tracks high-level phase completion. Live in `CAREER-FOCUS-PLAN.md`:

- [ ] Phase 0 — Backend mindset
- [ ] Phase 1 — FastAPI basics + Trading Backend project
- [ ] Appendix A — Docker basics (on Phase 1 project)
- [ ] Phase 3 — WebSocket (future, post-offer)
- [ ] M0 — Resume truth audit
- [ ] M5 — DukaanOS AI defense kit
- [ ] M6 — TradeStack defense kit
- [ ] M7 — React 100-Q diagnostic
- [ ] M8 — Next.js 100-Q diagnostic
- [ ] M10 — Resume finalize + apply
- [ ] M11 — Core subjects gap-scan
- [ ] M12 — Mock interview
- [ ] M13 — Applications sent

Tick one box per session. When everything reads `[x]`, you're done with the plan.

---

**Related:** all master documents are listed in section 1. There is no fifth file to discover — this folder contains everything.
