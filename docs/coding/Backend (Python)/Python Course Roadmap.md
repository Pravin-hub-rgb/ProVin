# Python Course Roadmap — Zero to Backend

Imagine you go to a restaurant. You've never been inside the kitchen (backend) — but now you need to understand how an order is prepared. You say — *"What is Flask, what is FastAPI, where does the server come from."* This whole course is built around exactly that: **zero to backend**, starting from Python, going all the way to FastAPI + SQLite + pandas + Docker.

**Required prerequisite:** Python basics needed (variables, functions, loops, lists, dicts). If you don't know them, first do the 7 lectures in `docs/coding/python/`. This course won't teach Python syntax — we'll *use* Python inside FastAPI.

---

# Backend Framework Jungle Map

First question: *"Flask, FastAPI, Django — what are they, which one to learn?"* One place, complete map:

```
BACKEND FRAMEWORKS (toolbox that handles the server)
├── Python family
│   ├── Flask    → simple, old — easy, but modern things you build yourself
│   ├── FastAPI  → MODERN — auto docs + validation + real-time + THIS PROJECT
│   └── Django   → "batteries included" — enterprise, powerful but heavy
└── Node.js family
    ├── Express  → most famous (you'll see it in React/Node stream)
    ├── Fastify  → new, fast, TypeScript-friendly
    └── NestJS   → enterprise TypeScript
```

**One line:** Flask too old, Django too big — **FastAPI = perfect beginner + real project (TradeStack).**

---

# Course Structure — Phases

The course has 5 phases. Each phase has its own complete mini-project. No phase is small.

| Phase | Topic | Project |
|-------|-------|---------|
| 0 | Python Basics | 7 lectures (no project — foundation) |
| 1 | FastAPI + SQLite + pandas | Trading Backend Basic |
| 2 | Real-time (WebSocket) | Chat App |
| 3 | TradeStack Deep-Dive | Read the real backend |
| 4 | Docker & Deployment | Containerize Phase 1-3 apps |

---

## PHASE 0 — Python Basics (Lec 1 to 7)

Variables, functions, loops, exceptions, modules, unit testing, file IO. Notes + practice sets + solutions — each lecture has its own folder. No project in this phase — just build syntax.

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

This is the mini-project where FastAPI's core features come — and data gets saved (SQLite).

**This is TradeStack's basic shape.** When you explain TradeStack in an interview, you'll know: a Python service where stocks come in, settings get saved, pandas indicators compute, scan endpoint returns results.

| # | Concept | File |
|---|---------|------|
| 1.0 | What we'll learn + project preview | What We'll Learn.md |
| 1.1 | Path & Query params | Getting data from URL |
| 1.2 | Pydantic + Request Body | Validating data |
| 1.3 | CRUD | Create/Read/Update/Delete |
| 1.4 | SQLite | Saving data (survives restart) |
| 1.5 | Trading Backend Project | 5-part series |

### Combined Project — 5-part series

| # | Part | What gets built |
|---|------|-----------------|
| 1.5.1 | Planning | What to build, endpoints, data shape |
| 1.5.2 | Server setup | venv + FastAPI app + /health + /docs |
| 1.5.3 | Data Layer | SQLite — stocks/settings tables + endpoints |
| 1.5.4 | Indicators | pandas SMA + RSI |
| 1.5.5 | Scan + Wrap-up | /scan endpoint, Pydantic, README |

---

## PHASE 2 — Real-time (WebSocket)

Apply what you learned in Phase 1 to real-time streaming. Open `~/Desktop/Main/TradeStack/backend/src/streaming.py`. `WebSocket`, `ConnectionManager`, live market ticks.

**Note:** Phase 2 doesn't change production code — just reading + notes + small experiment.

### Combined Project — Chat Room App

WebSocket + ConnectionManager + chat rooms. Multiple browser tabs connect to one room, messages reach everyone instantly.

| # | Concept | File |
|---|---------|------|
| 2.0 | What we'll learn + project preview | Phase 2 Overview |
| 2.1 | WebSocket basics | Persistent connections vs HTTP |
| 2.2 | Connection manager | Track who's connected, broadcast messages |
| 2.3 | Chat rooms | Multiple rooms, join/leave, message history |
| 2.4 | TradeStack bridge | See how TradeStack's streaming.py uses the same pattern |
| 2.5 | Combined project | Full chat app with rooms, users, live messages |

---

## PHASE 3 — TradeStack Backend Deep-Dive

Apply what you learned in Phases 1-2 to the real project. Open `~/Desktop/Main/TradeStack/backend/server.py`. `backend/src/db.py`, `cache_manager.py` — SQLite in production. One isolated experiment.

**Note:** Phase 3 doesn't change production code — just reading + notes + small experiment.

| # | Concept | File |
|---|---------|------|
| 3.0 | What we'll learn | Phase 3 Overview |
| 3.1 | Server overview | server.py walkthrough (930 lines) |
| 3.2 | Database layer | SQLite in production — WAL mode, thread-local |
| 3.3 | Cache manager | Pickle cache, .pkl files, invalidation |
| 3.4 | Scanner | ProcessPoolExecutor, 2000 stocks, 13 indicators |
| 3.5 | Streaming | Upstox WebSocket, live price ticks |
| 3.6 | State machine | Live trader logic, order state transitions |
| 3.7 | One experiment | One isolated change to understand the system |

---

## PHASE 4 — Docker & Deployment

Containerize the apps from Phases 1-3 so they run anywhere with one command.

| # | Concept | File |
|---|---------|------|
| 4.0 | What we'll learn | Phase 4 Overview |
| 4.1 | Docker basics | What Docker is, why it matters |
| 4.2 | Dockerfile | Package your FastAPI app into an image |
| 4.3 | Docker Compose | Run with one command, persist SQLite data |
| 4.4 | Test + bridge | Verify persistence, apply to TradeStack |

---

## "Manual → Better" Pairs

| Before (pain) | After (Better) |
|---------------|----------------|
| Parsing URL params manually | FastAPI path/query params |
| Validating data with if/else | Pydantic models (auto 422) |
| Data in memory (gone on restart) | SQLite persistence |
| Manual venv setup on every machine | Docker volume mount (data survives) |

---

## What This Course Is NOT

- ❌ **Flask course** — Flask only for comparison, build with FastAPI
- ❌ **Django course** — just in the jungle map
- ❌ **Advanced SQL** — just SQLite basics
- ❌ **Frontend course** — just /docs Swagger
- ❌ **Production deployment** — separate phase later (Docker basics just for learning)

---

## Standard Format for Every Note

1. Open with something relatable
2. Connect to previous file
3. CONCEPT → CODE → TEST
4. Nutshell
5. Common Mistakes
6. "In Your Own Words" (details)
7. What It Is NOT
8. Next-file bridge

**Register:** After each phase, update `lib/subjects/python.subject.ts`.

---

## What's Next?

- Phase 0: Start with `python/1 Lec variables & functions/notes.md`
- Phase 1: `1.0 What We'll Learn + Project Preview.md`
- Phase 2: `Phase 2 - Real-time (WebSocket)/2.0 Phase 2 - Real-time (WebSocket) — Kya Seekhenge.md`
- Phase 3: `Phase 3 - TradeStack Backend Deep-Dive/3.0 Phase 3 - TradeStack Backend Deep-Dive — Kya Seekhenge.md`
- Phase 4: `Phase 4 - Docker & Deployment/4.0 Phase 4 - Docker & Deployment — Kya Seekhenge.md`

---

**Related files:**
- `lib/subjects/python.subject.ts` (sidebar registration)
- `Phase 0 - Backend Mindset/0.0 How the Course Works — Backend Map.md` (full backend journey)
- `Phase 1 - FastAPI Basics (CRUD + SQLite)/1.0 What We'll Learn + Project Preview.md`
- `Phase 2 - Real-time (WebSocket)/2.0 Phase 2 - Real-time (WebSocket) — Kya Seekhenge.md`
- `Phase 3 - TradeStack Backend Deep-Dive/3.0 Phase 3 - TradeStack Backend Deep-Dive — Kya Seekhenge.md`
- `Phase 4 - Docker & Deployment/4.0 Phase 4 - Docker & Deployment — Kya Seekhenge.md`
