# Python Course Roadmap — Zero Se Backend Tak

Socho tum ek restaurant jaoge. Kitchen (backend) mein andar kabhi nahi gaye ho — par ab samajhna chahiye ki order kaise banata hai. Tum bolo — *"Flask kya hai, FastAPI kya hai, server kahan se aata hai."* Yeh course pura wahi banaya gaya hai: **zero se backend tak**, Python se shuru karke FastAPI + SQLite + pandas + Docker tak.

**Zaroori requirement:** Python basics chahiye (variables, functions, loops, lists, dicts). Agar nahi aati, pehle `docs/coding/python/` ke 7 lectures kar lo. Is course mein Python syntax nahi sikhaayenge — FastAPI ke andar Python *use* karenge.

---

# Backend Framework Jungle Map

Pehla sawaal: sabse pehle *"Flask, FastAPI, Django — kya hota hai, kaunsa seekhua?"* Ek hi jagah poora map:

```
BACKEND FRAMEWORKS (toolbox jo server sambhalta hai)
├── Python family
│   ├── Flask    → simple, purana — easy, lekin modern cheezein khud likhni
│   ├── FastAPI  → MODERN — auto docs + validation + real-time + YAHI PROJECT
│   └── Django   → "batteries included" — enterprise, powerful par bhaari
└── Node.js family
    ├── Express  → sabse famous (React/Node stream mein milega)
    ├── Fastify  → naya, fast, TypeScript-friendly
    └── NestJS   → enterprise TypeScript
```

**Ek line mein:** Flask too old, Django too big — **FastAPI = perfect beginner + real project (TradeStack).**

---

# Course Ka Structure — Phases

Course 4 phases mein hua. Har phase apna complete mini-project. Koi phase chhota nahi.

| Phase | Topic | Project |
|-------|-------|---------|
| 0 | Python Basics | 7 lectures (no project — foundation) |
| 1 | FastAPI + SQLite + pandas | Trading Backend Basic |
| — | Appendix A — Docker | Containerize the trading backend |
| 2 | Real-time (WebSocket) | Chat app |
| 3 | TradeStack Deep-Dive | Read the real backend |

---

## PHASE 0 — Python Basics (Lec 1 to 7)

Variables, functions, loops, exceptions, modules, unit testing, file IO. Notes + practice sets + solutions — har lecture ka alag folder. Is phase me project nahi — bas syntax build karo.

| # | Topic |
|---|-------|
| 1 | Variables & Functions |
| 2 | Data Types (Lists, Dicts, Strings) |
| 3 | Loops (for, while) |
| 4 | Exceptions (try/except) |
| 5 | Modules (import, __name__, packages) |
| 6 | Unit Testing (assert, unittest basics) |
| 7 | File I/O (open, read/write CSV) |

---

## PHASE 1 — Trading Backend Basic (FastAPI + SQLite + pandas)

Yeh woh mini-project hai jisme FastAPI ke core features aate hain — aur data save hota hai (SQLite).

**Project TradeStack ka basic shape hai.** Jab tum interview me TradeStack explain karo ge, toh tumhe pata hoga: ek Python service me stocks aate hain, settings save hoti hain, pandas indicators compute hote hain, scan endpoint results deta hai.

| # | Concept | File |
|---|---------|------|
| 1.0 | Phase kya seekhenge + project preview | Kya Seekhenge.md |
| 1.1 | Path & Query params | URL se data lena |
| 1.2 | Pydantic + Request Body | Data validate karna |
| 1.3 | CRUD | Create/Read/Update/Delete |
| 1.4 | SQLite | Data save (restart pe bhi rahe) |
| 1.5 | Trading Backend Project | 5-part series |

### Combined Project — 5 part series
| # | Part | Kya banta hai |
|---|------|---------------|
| 1.5.1 | Planning | Kya banana, endpoints, data shape |
| 1.5.2 | Server Khada | venv + FastAPI app + /health + /docs |
| 1.5.3 | Data Layer | SQLite — stocks/settings tables + endpoints |
| 1.5.4 | Indicators | pandas SMA + RSI |
| 1.5.5 | Scan + Wrap-up | /scan endpoint, Pydantic, README |

---

## Appendix A — Docker Basics

Phase 1 ka project containerize karo taaki koi bhi machine pe ek command mein chale. Interview ke room mein demo ke liye bhi kaam aayega.

| # | Topic | File |
|---|-------|------|
| A.0 | Docker kya hai + overview | 2.0 Docker Kya Hai + Overview.md |
| A.1 | Dockerfile + .dockerignore | Image banana |
| A.2 | docker-compose + volume mount | SQLite persist |
| A.3 | Test + TradeStack bridge | Deploy verification |

---

## PHASE 2 — Real-time (WebSocket)

Jo Appendix A (Docker) + Phase 0, 1 mein seekha, usko real-time streaming mein lagao:
- `~/Desktop/Main/TradeStack/backend/src/streaming.py` kholo
- `WebSocket`, `ConnectionManager`, live market ticks

**Dhyan:** Phase 2 mein production code change nahi — sirf reading + notes + chhota experiment.

### Combined Project — Chat Room App

WebSocket + ConnectionManager + chat rooms. Multiple browser tabs ek room mein connect hote hain, message turant sabko pahunchta hai.

---

## PHASE 3 — TradeStack Backend Deep-Dive

Jo Phase 0, 1, Appendix A, 2 mein seekha, use real project pe lagao:
- `~/Desktop/Main/TradeStack/backend/server.py` kholo
- `backend/src/db.py`, `cache_manager.py` — SQLite production mein
- Ek isolated experiment karo

**Dhyan:** Phase 3 mein production code change nahi — sirf reading + notes + chhota experiment.

---

## "Manual → Better" Pairs

| Pehle (dard) | Phir (Better) |
|---|---|
| URL params khud parse karna | FastAPI path/query params |
| Data khud validate if/else | Pydantic models (auto 422) |
| Data memory mein (restart pe khatam) | SQLite persistence |
| Manual venv setup har machine pe | Docker volume mount (data survives) |

---

## What This Course Is NOT

- ❌ **Flask course** — Flask sirf comparison ke liye, build FastAPI se
- ❌ **Django course** — sirf jungle map
- ❌ **Advanced SQL** — sirf SQLite basics
- ❌ **Frontend course** — sirf /docs Swagger
- ❌ **Production deployment** — alag phase baad mein (Docker basics sirf learn ke liye)

---

## Har Note Ka Standard Form

1. Relatable cheez se open
2. Pichli file se connect
3. CONCEPT → CODE → TEST
4. Nutshell
5. Common Mistakes
6. "In Your Own Words" (details)
7. What It Is NOT
8. Next-file bridge

**Register:** Har phase khatam hone pe `lib/subjects/python.subject.ts` mein update karo.

---

## Agla Kya Hai?

- Phase 0: `python/1 Lec variables & functions/notes.md` se shuru karo
- Phase 1: `1.0 Phase 1 - Kya Seekhenge + Project Preview.md`
- Appendix A: `Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.0 Docker Kya Hai + Overview.md`

---

**Related files:**
- `lib/subjects/python.subject.ts` (sidebar registration)
- `Phase 0 - Backend Mindset/0.0 Course Kaise Chalega.md` (full backend journey)
- `Phase 1 - FastAPI Basics (CRUD + SQLite)/1.0 Phase 1 - Kya Seekhenge.md`
- `Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.1 Dockerfile + .dockerignore.md`
