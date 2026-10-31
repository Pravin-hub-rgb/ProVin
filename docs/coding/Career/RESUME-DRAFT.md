# RESUME DRAFT — DukaanOS + TradeStack

> **Status:** DRAFT. Finalized in Milestone M10 (`CAREER-FOCUS-PLAN.md`). Until then, treat it as a draft — do not send it anywhere.
>
> **Rules:** Every bullet is a FACT verified against the code (after the M0 Truth Audit). Do not add anything you did not actually write in code. You will have to say "I built this" for every bullet in an interview, and a follow-up will come on each one.
>
> **Format:** Standard fresher resume — single page (or max 1.5 pages). 3 sections: Summary → Projects → Skills → Education.

---

## VERSION 1 — Main Resume (recommended)

```
──────────────────────────────────────────────────────────────────────────
[YOUR NAME]
Gurugram, Haryana · [phone] · [email] · [LinkedIn] · [GitHub]
──────────────────────────────────────────────────────────────────────────

FULLSTACK DEVELOPER — React · Next.js · Node.js · TypeScript

Final-year engineering student (or fresher) with hands-on experience
building production-style web applications. Strongest in React/Next.js
frontend and Node.js backend; comfortable with relational databases,
authentication, and offline-first architecture. Ships side projects
end-to-end — from schema design to deployment.

──────────────────────────────────────────────────────────────────────────
PROJECTS
──────────────────────────────────────────────────────────────────────────

DUKAANOS — Multi-Tenant Retail POS & Inventory System          [GitHub] [Live]
Tech: Next.js 14 (App Router) · TypeScript · PostgreSQL · Prisma · NextAuth · Zustand · Tailwind

A shop-management platform built for Indian kirana stores, serving
billing, inventory, credit ledgers (khata), and supplier workflows.

• Designed an 18-model PostgreSQL schema with Prisma covering products,
  sales, snapshot pricing, stock movements, suppliers, and credit ledgers
  — including historical P&L support via sale-item price snapshots.

• Built multi-tenant authorization where every server action is scoped
  by shopId (162 enforcement points across 12 action modules), with
  NextAuth middleware gating SUPER_ADMIN / shop-owner / inactive roles.

• Implemented offline-first billing: Dexie (IndexedDB) caches product and
  customer data, queues sales mutations locally, and replays them through
  a /api/sync endpoint using a Prisma transaction to atomically decrement
  stock, write stock-movement audit rows, and increment invoice numbers.

• Added a Hinglish voice-billing pipeline: browser MediaRecorder → Whisper
  speech-to-text (code-switching prompt for Hindi-English) → LLM structured
  parse, with a regex fallback parser handling Devanagari-to-Latin mapping,
  Hindi number words, and brand-name corrections when the API is unavailable.

• Used parallel Promise.all aggregates for dashboard metrics,
  revalidatePath for post-mutation cache refresh, and strict TypeScript
  across the codebase (minimal any usage).


TRADESTACK — Real-Time Swing-Trading Platform               [GitHub]
Tech: Next.js · React · TypeScript · Python · FastAPI · SQLite (WAL) · WebSocket · pandas

A personal NSE swing-trading platform that scans 2,000+ stocks for
continuation and reversal patterns and manages paper trades in real time.

• Architected a polyglot system: a Python FastAPI microservice for
  data-heavy computation (technical indicators — SMA, MA angle, ADR,
  price change, high-low distances — plus scanners and market breadth),
  and a Node-based live-trading engine for real-time event handling —
  sharing one SQLite database in WAL mode so readers and writers
  operate without blocking each other.

• Built a data pipeline that ingests daily NSE bhavcopy files, computing
  per-stock pandas DataFrames cached as pickles (2,000+ symbols) with a
  SQLite metadata index, so indicator computation and cache queries are
  near-instant.

• Wrote continuation and reversal scanners backed by
  ProcessPoolExecutor to parallelize CPU-bound indicator math across
  stocks — avoiding the GIL limit that would bottleneck threaded
  execution in Python.

• Implemented a real-time pipeline consuming the Upstox WebSocket V3
  feed with protobuf deserialization, driving per-stock finite state
  machines that manage paper-trade entries, exits, and P&L tracking,
  with SSE push to the browser and automatic reconnect-with-backoff.

• Consolidated 47 hardcoded API URLs across 12 frontend modules into a
  single typed API layer with a shared type registry, and documented the
  system architecture with a tri-partite design diagram.
```

---

## VERSION 2 — If you need 1 page (shorter)

Trim the project bullets down to 2 lines each:

```
DUKAANOS — Multi-Tenant Retail POS & Inventory System     [GitHub] [Live]
Next.js 14 · TypeScript · PostgreSQL · Prisma · NextAuth · Zustand
• 18-model Prisma schema with snapshot pricing and stock-movement audit
  trails; multi-tenant RBAC with shopId scoping enforced across 12 server-
  action modules and role-based NextAuth middleware.
• Offline-first billing via Dexie: IndexedDB cache, queued mutations, and
  atomic replay through a Prisma transaction (stock decrement + audit +
  invoice counter).
• Hinglish voice billing: Whisper STT → LLM parse, with a regex fallback
  for Hindi number words and Devanagari-to-Latin normalization.

TRADESTACK — Real-Time Swing-Trading Platform              [GitHub]
Next.js · TypeScript · Python · FastAPI · SQLite · WebSocket · pandas
• Polyglot architecture: Python FastAPI for CPU-bound indicators/scanners
  (ProcessPoolExecutor) and Node for real-time WebSocket trading, sharing
  one WAL-mode SQLite database.
• NSE bhavcopy ingestion into 2,000+ per-stock pandas caches with a SQLite
  metadata index; Upstox WebSocket V3 + protobuf feeding per-stock state
  machines for paper trading with SSE push to the UI.
```

---

## Skills Section

```
TECHNICAL SKILLS
Languages      TypeScript, JavaScript (ES2022+), Python, SQL, HTML, CSS
Frontend       React (Hooks, Suspense, Context), Next.js (App Router,
               Server Components, Server Actions, Middleware), Tailwind CSS,
               MUI, Zustand, TanStack Query, React Hook Form + Zod
Backend        Node.js, FastAPI (Python), REST API design, JWT/session auth,
               NextAuth, Prisma ORM, SQLite (WAL), PostgreSQL
Data/DevOps    pandas, NumPy, WebSocket, SSE, Git, Vercel, Docker (basic)
Practices      Responsive design, Offline-first architecture, Code refactoring
               and documentation, Problem solving (DSA)
```

> **Note:** Remove "Docker (basic)" or anything you can't actually do. They ask about it in interviews — if you can't do it, say "I'm still learning"; never lie.

---

## Education Section (fill in your details)

```
EDUCATION
[B.Tech / B.E. / BCA] — [Your University]
[Degree] | [Expected graduation year] | [CGPA if good]
Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems,
Computer Networks, Object-Oriented Programming
```

---

## Project Links (fill along with Milestones M9-M10)

| Project | GitHub | Live link | Status |
|---|---|---|---|
| DukaanOS | `[repo-url]` | `[vercel-url]` | Deploy in Milestone M9 |
| TradeStack | `[repo-url]` | `[local-only — interviewer runs it first]` | Remote demo if the Docker bonus is done |

---

## Interview Pitch Scripts (to go with the resume)

### DukaanOS — 2 minutes

*"DukaanOS is a multi-tenant POS system I built for Indian kirana stores — billing, inventory, and credit ledger (khata). Tech stack: Next.js 14 App Router, PostgreSQL with Prisma, NextAuth.*

*The two most interesting pieces of work were these. First — offline-first billing. Internet is unreliable in kirana stores, so I cached product data in IndexedDB via Dexie, sales are queued locally, and when internet returns they replay through a sync endpoint — with a Prisma transaction so stock decrement, audit trail, and invoice number all stay atomic. Second — Hinglish voice billing. Kirana owners find it easier to speak Hindi-English, so I transcribed audio with Whisper speech-to-text and parsed structured product data with an LLM, with a regex-based fallback that handles Hindi number words and Devanagari conversions when the API is unavailable."*

**Keep 3 war stories ready (rehearsed in Milestone M5):**
1. Offline queue sync — atomic replay + conflict handling
2. Multi-tenant scoping — shopId enforcement across 162 points
3. Voice parser — fallback design when AI is unavailable

### TradeStack — 2 minutes

*"TradeStack is a personal NSE swing-trading platform that scans 2,000+ stocks for continuation and reversal patterns and manages real-time paper trading. I built it out of a trading interest.*

*The architecture is polyglot — Python FastAPI for data-heavy computation (technical indicators — SMA, MA angle, ADR, price-change, high-low distances — plus scanners and market breadth), and Node for real-time event handling (Upstox WebSocket feed, state machines). Both share a single SQLite database in WAL mode, so one process writes while the other reads without blocking.*

*The biggest technical pain was the Upstox WebSocket SDK — it reconnected internally in its own way and sometimes got stuck. I had to debug it and add custom reconnect-with-backoff logic. And in the scanners I used ProcessPoolExecutor because indicator math is CPU-bound — I needed to bypass Python's GIL for parallel compute."*

**Keep 3 war stories ready (rehearsed in Milestone M6):**
1. Upstox WebSocket reconnect — SDK prototype patching + backoff
2. State machine position cap — standby candidates staying subscribed
3. SQLite WAL — polyglot concurrent access design

---

## Common Questions — Quick Answers

**"What does building both projects show about your capability?"**
> "Both are full-stack. DukaanOS is production-style — multi-tenancy, auth, transactions, offline sync. TradeStack is real-time — WebSocket, streaming data, parallel compute. One is about data integrity, the other about performance and reliability."

**"You used AI in DukaanOS — what for?"**
> "Yes — voice billing uses Whisper speech-to-text and LLM parsing. But the important point is that AI is not the primary path — there's a regex-based fallback that handles Hindi number words, Devanagari normalization, and brand corrections, so the system keeps working even when the AI is unavailable. In production it's better to keep AI as an optional enhancement."

**"How much Python do you know for TradeStack?"**
> "I don't write full-stack Python — I use it for the data layer and concurrency. Pandas vectorization, FastAPI routes and Pydantic schemas, the CPU-bound vs I/O-bound distinction with ProcessPoolExecutor. If a deep Python algorithm is asked in an interview, I'll honestly say that's not my strong area — but I can explain and maintain this whole system."

**"Are there tests in the projects?"**
> Honestly: "TradeStack doesn't have automated tests yet — I'm adding them now (a pytest + Vitest plan is ready). On DukaanOS I wrote tests for some core server actions, but that's not complete either. But the architecture is deliberately testable — pure functions live in separate modules (indicators, state machines), so adding unit tests is straightforward." — **this honest answer creates more impression than the lie "fully tested".**

---

## Milestone M10 Checklist — Resume Finalize

- [ ] Verify both bullet lists against your actual implementation (keep no point that is a lie)
- [ ] Remove from the skills list anything you can't do
- [ ] Add GitHub + Vercel links
- [ ] Fill in education details
- [ ] Fill the "About" and "Featured" sections of the LinkedIn profile from the same projects
- [ ] Export the PDF (ATS-friendly — no tables, no columns, simple format)
- [ ] Verbally rehearse 2 war stories per project (record and listen)
- [ ] Send connection requests + short messages to founders of 5 companies on LinkedIn

---

**Related:** `CAREER-FOCUS-PLAN.md` (M0 truth audit · M10 finalize) · `TRADESTACK-DEFENSE-KIT.md` Section 2 (2-min pitch) · `DUKAANOS-AI-DEFENSE-KIT.md` (AI bullet defense)
