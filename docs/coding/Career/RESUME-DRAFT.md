# RESUME DRAFT — DukaanOS + TradeStack

> **Status:** DRAFT. Week 3 (Day 18) me finalize karna hai. Tab tak isko sirf draft ki tarah padhna, copy nahi karna.
>
> **Rules:** Har bullet FACT hai code se verified (audit ke baad). Koi bhi cheez add karna hai jo tumne code me nahi likhi — mat likhna. Interview me "ye maine kiya" bolna hoga, har bullet pe follow-up aayega.
>
> **Format:** Standard fresher resume — single page (ya max 1.5 page). 3 sections: Summary → Projects → Skills → Education.

---

## VERSION 1 — Main Resume (recommended)

```
──────────────────────────────────────────────────────────────────────────
[YOUR NAME]
Gurugram, Haryana · [phone] · [email] · [LinkedIn] · [GitHub]
──────────────────────────────────────────────────────────────────────────

FULLSTACK DEVELOPER — React · Next.js · Node.js · TypeScript

Final-year engineering student (ya fresher) with hands-on experience
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
  data-heavy computation (13 technical indicators, scanners, breadth),
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

## VERSION 2 — Agar 1 page chahiye (chhota)

Projects section ke bullets 2-2 line me kat do:

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

> **Note:** "Docker (basic)" ya jo nahi aata, usse hata do. Interview me poochte hain — agar nahi kar paya to bol dena "seekh raha hoon", jhooth mat bolna.

---

## Education Section (apni details bharo)

```
EDUCATION
[B.Tech / B.E. / BCA] — [Your University]
[Degree] | [Expected graduation year] | [CGPA if good]
Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems,
Computer Networks, Object-Oriented Programming
```

---

## Project Links (Week 2 me fill karo)

| Project | GitHub | Live link | Status |
|---|---|---|---|
| DukaanOS | `[repo-url]` | `[vercel-url]` | Deploy Day 11 ko hoga |
| TradeStack | `[repo-url]` | `[local-only — interviewer pehle chalega]` | Docker bonus ho to remote demo |

---

## Interview Pitch Scripts (resume ke saath jaane wale)

### DukaanOS — 2 minute
*"DukaanOS ek multi-tenant POS system hai jo maine Indian kirana stores ke liye banaya — billing, inventory, aur credit ledger (khata). Tech stack Next.js 14 App Router, PostgreSQL with Prisma, NextAuth.*

*Sabse interesting kaam do cheezein tha. Pehla — offline-first billing. Kirana stores me internet unreliable hota hai, isliye maine Dexie se IndexedDB me product data cache kiya, sales locally queue hoti hain, aur jab internet aata hai woh ek sync endpoint se replay hoti hain — Prisma transaction ke saath, taaki stock decrement, audit trail, aur invoice number teeno atomic rahein. Doosra — Hinglish voice billing. Kirana wale customer ko Hindi-English me baat karne mein aasan hota hai, isliye maine Whisper speech-to-text se audio transcribe karke LLM se structured product data parse karwaaya, aur jab API available na ho tab regex-based fallback hai jo Hindi number words aur Devanagari conversions handle karta hai."*

**3 war stories ready rakho (Day 15):**
1. Offline queue sync — atomic replay + conflict handling
2. Multi-tenant scoping — shopId enforcement across 162 points
3. Voice parser — fallback design jab AI unavailable ho

### TradeStack — 2 minute
*"TradeStack ek personal NSE swing-trading platform hai jo 2,000 se zyada stocks me continuation aur reversal patterns scan karta hai aur real-time paper trading manage karta hai. Ye maine trading ke interest ke liye banaya tha.*

*Architecture polyglot hai — Python FastAPI data-heavy computation ke liye (13 technical indicators, stock scanners, market breadth), aur Node real-time event handling ke liye (Upstox WebSocket feed, state machines). Dono ek SQLite database share karte hain WAL mode me, jisse ek process likhta hai aur doosra padhta hai bina block kiye.*

*Sabse interesting technical dard Upstox WebSocket SDK ka tha — wo internally apne tarike se reconnect karta tha aur kabhi kabhi stuck ho jata. Us pe debug karna pada, custom reconnect-with-backoff logic add kiya. Aur scanners me ProcessPoolExecutor use kiya kyunki indicator math CPU-bound hai — Python ke GIL ko bypass karna tha parallel compute ke liye."*

**3 war stories ready rakho (Day 16):**
1. Upstox WebSocket reconnect — SDK prototype patching + backoff
2. State machine position cap — standby candidates staying subscribed
3. SQLite WAL — polyglot concurrent access design

---

## Common Questions — Quick Answers

**"Do projects se kya dikhta hai aapki capability?"**
> "Dono full-stack hain. DukaanOS production-style hai — multi-tenancy, auth, transactions, offline sync. TradeStack real-time hai — WebSocket, streaming data, parallel compute. Ek me data integrity ka sawaal hai, doosre me performance aur reliability ka."

**"DukaanOS me AI use kiya hai, kya?"**
> "Haan — voice billing me Whisper speech-to-text aur LLM parse. But important point ye hai ki AI primary path nahi hai — ek regex-based fallback hai jo Hindi number words, Devanagari normalization, aur brand corrections handle karta hai, taaki system AI ke available na hone pe bhi kaam kare. Production me AI ko optional enhancement rakhna better hota hai."

**"TradeStack me Python ka kitna knowledge hai?"**
> "Main Python full-stack nahi likhta — data layer aur concurrency use karta hoon. Pandas ka vectorization, FastAPI ke routes aur Pydantic schemas, ProcessPoolExecutor ki CPU-bound vs I/O-bound distinction. Interview me agar deep Python algorithm pucha jaye to honestly bolunga ki woh mera strong area nahi — but yeh pura apna system explain karna aur maintain karna aata hai."

**"Tests hain projects me?"**
> Honestly: "TradeStack me abhi automated tests nahi hain — wo abhi add kar raha hoon (pytest + Vitest ke liye plan ready hai). DukaanOS pe maine kuch core server actions ke liye test likhne ka kaam kiya tha, wo bhi complete nahi hai. But architecture deliberately testable rakha hai — pure functions alag modules me hain (indicators, state machines), to unit tests add karna straightforward hai." — **ye honest answer zyada impression karta hai "fully tested" jhooth se.**

---

## Week 3 Checklist — Resume Finalize (Day 18)

- [ ] Dono bullet lists apne actual implementation se verify karo (koi bhi point jhooth mat rakhna)
- [ ] Skills list se jo nahi aata hata do
- [ ] GitHub + Vercel links add karo
- [ ] Education details bharo
- [ ] LinkedIn profile ka "About" aur "Featured" section same projects se bharo
- [ ] PDF export karo (ATS-friendly — no tables, no columns, simple format)
- [ ] 2 war stories per project verbally rehearse karo (record karke suno)
- [ ] 5 companies ke founders ko LinkedIn pe connect request + short message

---

**Related:** `COMEBACK-SPRINT-3-WEEKS.md` Day 18 · `TRADESTACK-DEFENSE-KIT.md` Section 2 (2-min pitch)