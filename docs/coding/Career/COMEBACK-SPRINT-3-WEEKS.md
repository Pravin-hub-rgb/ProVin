# COMEBACK SPRINT — 3 Weeks, 12 Hours/Day

> **Ye sprint ka goal:** 21 din me React/Next.js ka dimag wapas laana, DSA ka base bana, 2 projects ko interview-ready polish karna, aur **applications daalna** — "perfect ho jau" ka wait nahi.
>
> **Ye sprint NAHI hai:** naya project banana, ProVin me naya course likhna, "sab pehle se seekh lunga" ka cycle.

---

## A. Locked Decisions (ye change nahi honge, iske upar nahi socho)

| Decision | Value |
|---|---|
| Resume projects | **DukaanOS + TradeStack** (sirf 2) |
| ProVin resume me? | **Nahi** — notes platform hai, project nahi |
| AT_Trading | **Confidential** — kisi file me, kisi pitch me, kabhi nahi |
| Naya bada project | **Nahi** — 3 hafte me half-done skeleton = interview me disaster |
| Python | Defense Kit (theory) + FastAPI Course Phase 1 (hands-on) |
| DSA | Roz 2h, `docs/coding/DSA/roadmap.md` Phase 1 se |
| Applications | Week 3 se daily 10-15 |
| Resume link | GitHub + live deploy link (Week 2 me deploy hoga) |

**Ek line me poora plan:** DukaanOS aur TradeStack ko aisa dikha ki interviewer 5 min me impressed ho jaaye, aur tumhare dimag me React/Next/DSA ka hisaab theek ho — phir bhej do applications.

---

## B. Daily Template (roz, 21 din — non-negotiable)

```
08:00 - 08:30   Sprint checklist kholo, aaj ka 3 task decide karo
08:30 - 12:30  MAIN BLOCK (4h) — table ka "Main" column
12:30 - 13:30  Lunch + walk. Screen off. Compulsory.
13:30 - 17:30  HANDS-ON BLOCK (4h) — code, project, ya revision
17:30 - 19:30  DSA (2h) — non-negotiable, iske bina interview haar jaoge
19:30 - 20:00  Interview Q drill (1 topic, bol ke, recording ke saath)
20:00          SPRINT OFFICIALLY OFF
20:00 - 21:30  Personal project cleanup
21:30 - 22:30  Wind down + next day ka plan
22:30          SLEEP. 6.5-7 ghante minimum. Ye 12h kaam tabhi tikega.
```

**Burnout rule:** Agar kisi din 4 ghante sirf DSA me daal diye bina kuch kiye — chalega, sprint survive ho jayega. Lekin 2 din se zyada "aaj mann nahi hai" skip mat karo. Momentum hi sabse bada asset hai is sprint me.

---

## C. WEEK 1 — React wapas + Python hands-on

| Din | Main Block (4h) | Hands-On (4h) | DSA (2h) |
|---|---|---|---|
| **1** | **React diagnostic** — `docs/coding/React JS/Interview Prep/100 React Interview Questions.md` kholo, har Q ka jawab **bol ke** khud suno, phir GREEN / YELLOW / RED mark karo. Sirf mark karna hai — padhna nahi | **FastAPI Phase 1 padho** — `Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.0` se `1.4` tak (4 core tools). Ye **theory** hai — koi code nahi likhna abhi | Complexity (Big O) + Arrays first 5 Q (`DSA/quesitons.md` section 1) |
| **2** | RED topics: `Module 0 - React Kaise Kaam Karta Hai` — Virtual DOM, Fiber, batching, hydration. Ye interview me 100% poochte hain | **Trading Backend Basic Part 1-2**: `1.5.1 Planning` + `1.5.2 Server Khada`. Project folder banao, venv, `pip install fastapi uvicorn pandas`, `GET /health` chala ke `/docs` kholo | Arrays remaining + Prefix Sum |
| **3** | RED topics: `Batch 1 - Core Building Blocks` — JSX, components, props, `useState`, event handling, conditional rendering | **Trading Backend Basic Part 3**: `1.5.3 Data Layer` — `stocks` table + `POST/GET /api/stocks` + filter. Test karo: 201, 422, 409, 404 | Two Pointers (Move Zeroes, Reverse, Two Sum) |
| **4** | RED topics: `Batch 2 - Effects, Data & Refs` — `useEffect` dependency array, cleanup, TanStack Query, `useRef`, Context | **Trading Backend Basic Part 4**: `1.5.4 Indicators` — `prices` table + seed CSV + pandas me SMA(20) + RSI(14) + `/api/indicators/{symbol}` | Two Pointers more + Sliding Window start |
| **5** | YELLOW topics: `Batch 3 - Navigation & Access Control` + `Batch 4` (forms, validation, a11y basics) | **TradeStack SOLIDIFY Phase 1** (real repo): 47 hardcoded URLs → `frontend/src/lib/api.ts` central helpers + `.env.example` | Sliding Window (Max Sum K, Longest Substring) |
| **6** | `Batch 5 - Performance` (`memo`, `useMemo`, `useCallback`, `useReducer`) + `Batch 6` (custom hooks + Zustand) | TradeStack Phase 1 continue + Phase 2 (`lib/types.ts` single source of truth, `any` cleanup) | Sliding Window wrap + Hashing (Two Sum pattern) |
| **7** | **WEEK 1 RE-TEST** — `100 React Questions` dobara, same marking. Din 1 se compare kar. Yahi tumhara progress proof hai | Defense Kit padh: Architecture one-pager + FastAPI concept cards (`TRADESTACK-DEFENSE-KIT.md`) | Hashing + week's problem set re-solve (bina dekhe) |

**Week 1 exit check:** RED topics kam ho gaye, Trading Backend Basic ke 3-4 parts done, DSA Phase 1 ke ~60% problems done.

---

## D. WEEK 2 — Next.js wapas + Projects polish

| Din | Main Block (4h) | Hands-On (4h) | DSA (2h) |
|---|---|---|---|
| **8** | **Next.js diagnostic** — `docs/coding/Next JS/Interview Prep/100 Next.js Interview Questions.md` mark karo + `Module 0` padho | DukaanOS: repo hygiene — junk files move, uncommitted 7 files commit karo, duplicate docs delete | DSA Phase 1 remaining |
| **9** | RED: `Batch 2 - Rendering & Data Fetching` (Server Components, caching, `revalidate`) + `Batch 4 - Proxy Middleware` | DukaanOS: **AI model fix** — `llama-3.3-70b-versatile` → `openai/gpt-oss-120b` (Groq ne Aug 2026 me llama models retire kiye; `whisper-large-v3` ZINDA hai, sirf text model badalna hai) + verify voice billing flow | DSA Phase 1 complete → Phase 2 start |
| **10** | RED: `Batch 3 - Mutations` (Server Actions) + `Batch 5 - Authentication` (NextAuth, protected routes) | **DukaanOS README** (real one — abhi create-next-app boilerplate hai): features, architecture, Prisma schema summary, setup steps, screenshots | Phase 2: Linked List basics |
| **11** | `Batch 6 - Database Integration` (Prisma patterns, relations) + `Batch 7 - Optimization` | **DukaanOS deploy** — Vercel pe live karo (Supabase Postgres env vars), smoke test karo, link note karo. Ya agar Vercel me issue to 40-sec screen recording bana lo | Phase 2: Stack/Queue |
| **12** | `Batch 8 - Security & Deployment` + red topics jo Week 1 me bache | **TradeStack SOLIDIFY Phase 7**: README rewrite — tri-partite architecture diagram, tech table with "why" column, run commands | Phase 2: Binary Search |
| **13** | Defense Kit concept cards: SQLite WAL, WebSocket vs SSE, multiprocessing + top 15 Q rehearse **aloud** | **TradeStack SOLIDIFY Phase 8**: `setup.ps1` / `setup.sh` (bun install + venv + pip + seed DB), root lint/test scripts | Phase 2 problems |
| **14** | **BUFFER DAY** — jo bacha wohi. DukaanOS ya TradeStack ka koi pending kaam. Kuch nahi bacha to Next.js red topics | Repo final polish: dono repos ka root clean, `.gitignore` check, screenshots regenerate | DSA catch-up |

**Week 2 exit check:** DukaanOS live + real README + AI fix. TradeStack real README + setup script. Next.js RED topics done.

**Docker (SOLIDIFY Phase 11)?** Sirf tab agar Day 13 tak sab khatam ho jaaye. Interview me *explain karna* > *Docker me chalana*. Ye bonus hai, obligation nahi.

---

## E. WEEK 3 — Interview hardening + APPLY

| Din | Main Block (4h) | Hands-On (4h) | DSA (2h) |
|---|---|---|---|
| **15** | Core subjects: `docs/coding/Core Subjects/OS-Interview-Prep.md` + `OOP-Interview-Prep.md` — har file ke headings padho, gaps note karo | DukaanOS **STAR pitch** likh: 2-min intro + 3 "challenging problem" stories (offline queue replay, multi-tenant scoping, voice parser fallback) — record karke sun | Phase 2 + JS DSA patterns |
| **16** | `DBMS-Interview-Prep.md` (joins, indexing, normalization) + `CN-Interview-Prep.md` basics | TradeStack **STAR pitch**: 2-min intro + 3 stories (Upstox WebSocket reconnect, state machine position cap, SQLite shared by 2 runtimes) — record karke sun | Revision — weak patterns |
| **17** | `docs/coding/WEB-DEV/interview/` key files: `06-cors.md`, `20-authentication-authorization.md`, `04-request-lifecycle.md`, `01-browser-caching.md`, `19-api-design-rest-vs-graphql.md` | Defense Kit full revision + koi bhi Python question jo atak gaya uska **khud se jawab** likh (yehi interview me aayega) | Mock set — 5 questions, timer |
| **18** | JS-specific: `docs/coding/WEB-DEV/interview/nodejs.md` + `Core Subjects/nodejs.md` (closures, event loop, hoisting, promises — Gurgaon fullstack me DSA jitna hi poochte hain) | **Resume finalize** — `RESUME-DRAFT.md` ko apne real details bharo, LinkedIn profile same cheezein daalo (headline, about, 2 projects, skills) | Mock set |
| **19** | Mock interview #1 — record karo, 45 min, React + Next + project walkthrough. Fir suno aur weak points note karo | **Applications Day 1** — 15 applications (Naukri, LinkedIn, Wellfound, Internshala) + 5 cold DMs Gurgaon startups ko | Phase 3 start (recursion) |
| **20** | Weak-area patch: jo mock me atka, wahi course lecture padh | **Applications Day 2** — 15 applications. Referral messages likh (LinkedIn connections se "refer me" — 10 log) | Phase 3 |
| **21** | Final revision + Defense Kit last pass + dono pitches ek baar phir | **Applications Day 3** — 15 applications + follow-up on Day 1 ke applications | Phase 3 |

**Week 3 exit check:** Resume live, LinkedIn updated, 45+ applications out, 1 mock recorded, dono projects explain kar sakte ho 2 min me.

---

## F. Trading Backend Basic — Course Phase 1 (Week 1 ka Python block)

Ye project **already course notes me likha hua hai** — tumhe khud code follow karke banana hai, notes padhke. Koi separate folder banane ki zaroorat nahi.

**Notes:** `docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/`

**Roadmap:** `docs/coding/Backend (Python)/FastAPI Course Roadmap.md` (Phase 1 section)

### Lectures (theory — Day 1)

| # | File | Kya hai |
|---|------|---------|
| 1.0 | `1.0 Phase 1 - Kya Seekhenge + Project Preview.md` | Phase ka intro + project preview + "Manual to Better" pairs |
| 1.1 | `1.1 Path & Query Params.md` | URL se data lena — `{symbol}`, `?limit=10` |
| 1.2 | `1.2 Pydantic + Request Body.md` | Data validate karna, 422 automatic |
| 1.3 | `1.3 CRUD - Create Read Update Delete.md` | Poora lifecycle + status codes (200/201/204/404) |
| 1.4 | `1.4 SQLite se Jodo.md` | Tables, `INSERT/SELECT/UPDATE/DELETE`, `?` placeholders |

### Project Series (hands-on — Day 2 se 4)

Har part ka ek teaching point hai. Notes padho, code likho, phir agla.

| # | File | Time | Kya banega |
|---|------|------|-----------|
| **1.5.1** | `1.5.1 Planning - Trading Backend Basic.md` | 20 min | Sirf sochna — endpoints, tables, data shape, folder structure |
| **1.5.2** | `1.5.2 Server Khada - Pehla Endpoint.md` | 1h | venv + `pip install fastapi uvicorn pandas` + `app/main.py` + `GET /health` + `/docs` |
| **1.5.3** | `1.5.3 Data Layer - Tables + Endpoints.md` | 3-4h | `app/db.py` + `app/models.py` + `stocks` table + `POST/GET /api/stocks` (201/422/409/404 test karo) |
| **1.5.4** | `1.5.4 Indicators - SMA + RSI.md` | 2-3h | `prices` table + `seed_prices.py` + `app/seed.py` + `app/indicators.py` (pandas SMA/RSI) + `/api/indicators/{symbol}` |
| **1.5.5** | `1.5.5 Scan Endpoint + Wrap-up.md` | 2h | `app/scanner.py` + `/api/scan?min_rsi=0&max_rsi=30` + README + wrap-up |

**Project folder:** Apni choice ka koi bhi folder — `Desktop/main/trading-backend-basic` ya kahin bhi. Structure notes me diya hai (`app/`, `data/`, `README.md`).

**Stack:** Python 3.11 + venv + FastAPI + uvicorn + pandas + SQLite + Pydantic

### Testing discipline (har step pe)

Har part ke end me **"Test"** section hai usi note me. Chalao, verify karo, phir agla. Test na kiye bina aage mat badho — warna bug stack hoga aur pata nahi chalega kahan se aaya.

Key tests jo har part me zaroori hain:
- **1.5.2** — `/docs` khul raha hai, `/health` 200 de raha hai
- **1.5.3** — 201 (create), 422 (galat type), 409 (duplicate symbol), 404 (missing ID), **aur restart ke baad data safe hai**
- **1.5.4** — `/api/indicators/RELIANCE` real numbers de raha hai, 404 on unknown symbol
- **1.5.5** — `/api/scan` results sorted + limited, 400 on invalid params

### Commit discipline

Har part ke baad ek commit:
```
chore: initial fastapi app with health endpoint
feat: sqlite db layer with stocks table and CRUD endpoints
feat: pandas SMA + RSI indicators with prices seed
feat: market scan endpoint with typed pydantic response
docs: add README with setup and API reference
```

### Explicitly OUT of scope (abhi nahi)

WebSocket/SSE (Phase 2), multiprocessing, real NSE/Upstox data, baaki 11 indicators, auth, Docker. Ye sab **Phase 2 aur Phase 3** me aayenge — 3 hafte me depth nahi, foundation pakki karo.

**Outcome (interview me bolna):** *"Maine trading backend ka basic shape khud FastAPI + SQLite + pandas se banaya tha — production version me wahi shape Upstox WebSocket streaming aur multiprocessing scanners ke saath hai."* Ye ek line pure Python theory se zyada value deti hai.

---

## G. Sprint Rules (side me chipka lo)

1. **Naya project/course/batch shuru MAT karo.** Sprint ke 21 din me sirf ye 3 cheezein: revision, polish, apply.
2. **Sleep 6.5-7h.** 12h kaam tabhi tikta hai jab recovery ho. Ek mahine baad wapas aaye ho — burnout sabse bada risk hai.
3. **DSA daily 2h.** Ye optional nahi hai. 90% fresher interviews yahin reject karte hain.
4. **Application perfect hone ka wait mat karo.** Week 3 se roz. Interview se pehle apply karna chahiye.
5. **Kuch atak jaaye to 30 min max.** 30 min me solution nahi mila → note karo, aage badho, raat ko wapas aana. Ek concept pe 3 ghante nahi.
6. **Recording habit.** Interview Q ka jawab bol ke record karo. Sunne se pata chalta hai ki tum actually bol bhi sakte ho ya nahi.
7. **AT_Trading confidential hai.** Resume, pitch, chat, kahin nahi. Ye sirf tumhara personal project hai.

---

## H. Progress Tracker

Har raat 10 baje ye table update karo. 3 columns bas — kya hua, kya nahi hua, kal kya.

| Din | Date | Main block done? | Hands-on done? | DSA done? | Blockers / note |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
| 6 | | | | | |
| 7 | | | | | |
| 8 | | | | | |
| 9 | | | | | |
| 10 | | | | | |
| 11 | | | | | |
| 12 | | | | | |
| 13 | | | | | |
| 14 | | | | | |
| 15 | | | | | |
| 16 | | | | | |
| 17 | | | | | |
| 18 | | | | | |
| 19 | | | | | |
| 20 | | | | | |
| 21 | | | | | |

---

## I. Aaj (Day 1) Se Exactly Kya Karna Hai

1. `100 React Interview Questions.md` kholo → 3 ghante → har Q mark karo (GREEN / YELLOW / RED)
2. `FastAPI Phase 1` ke notes 1.0 se 1.4 tak padho (theory, koi code nahi)
3. DSA: Big O + pehle 5 array problems
4. 20:00 PM band

**Baaki sab ka wait karo.** Kal sirf Din 2 ka kaam hai.

---

**Related files:**
- `TRADESTACK-DEFENSE-KIT.md` — Python/architecture interview defense (roz 1-1.5h)
- `RESUME-DRAFT.md` — resume structure (Week 3 me finalize)
- `docs/coding/DSA/roadmap.md` + `quesitons.md` — DSA source
- `docs/coding/React JS/Interview Prep/100 React Interview Questions.md` — Day 1 + 7 diagnostic
- `docs/coding/Next JS/Interview Prep/100 Next.js Interview Questions.md` — Day 8 diagnostic