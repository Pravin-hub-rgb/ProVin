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

The course has 4 phases. Each phase has its own complete mini-project. No phase is small.

| Phase | Topic | Project |
|-------|-------|---------|
| 0 | Python Basics | 7 lectures (no project — foundation) |
| 1 | FastAPI + SQLite + pandas | Trading Backend Basic |
| — | Appendix A — Docker | Containerize the trading backend |
| 2 | Real-time (WebSocket) | Chat app |
| 3 | TradeStack Deep-Dive | Read the real backend |

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

## Appendix A — Docker Basics

Containerize the Phase 1 project so it runs on any machine with one command. Also useful for interview demos.

| # | Topic | File |
|---|-------|------|
| A.0 | What is Docker + overview | 2.0 Docker What Is It + Overview.md |
| A.1 | Dockerfile + .dockerignore | Building the image |
| A.2 | docker-compose + volume mount | SQLite persistence |
| A.3 | Test + TradeStack bridge | Deploy verification |

---

## PHASE 2 — Real-time (WebSocket)

Apply what you learned in Appendix A (Docker) + Phases 0, 1 to real-time streaming:
- Open `~/Desktop/Main/TradeStack/backend/src/streaming.py`
- `WebSocket`, `ConnectionManager`, live market ticks

**Note:** Phase 2 doesn't change production code — just reading + notes + small experiment.

### Combined Project — Chat Room App

WebSocket + ConnectionManager + chat rooms. Multiple browser tabs connect to one room, messages reach everyone instantly.

---

## PHASE 3 — TradeStack Backend Deep-Dive

Apply what you learned in Phases 0, 1, Appendix A, 2 to the real project:
- Open `~/Desktop/Main/TradeStack/backend/server.py`
- `backend/src/db.py`, `cache_manager.py` — SQLite in production
- One isolated experiment

**Note:** Phase 3 doesn't change production code — just reading + notes + small experiment.

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
- Appendix A: `Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.0 Docker What Is It + Overview.md`

---

**Related files:**
- `lib/subjects/python.subject.ts` (sidebar registration)
- `Phase 0 - Backend Mindset/0.0 Course How It Works - Backend Map.md` (full backend journey)
- `Phase 1 - FastAPI Basics (CRUD + SQLite)/1.0 What We'll Learn.md`
- `Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.1 Dockerfile + .dockerignore.md`
