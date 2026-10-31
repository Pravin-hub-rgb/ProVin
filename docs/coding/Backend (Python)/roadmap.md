# TradeStack Project — What You Need to Learn

This list is in **priority order**. The things already used in the project, you'll understand deeply + the things beyond them.

> **The real course is here:** `Python Course Roadmap.md` (phase-wise chapters + projects) + `Phase 0 - Backend Mindset/` (first module). This file is just the priority list of "what to learn."

### 1. Python Backend (Most Important)

| Topic | How deep to learn | Why it's important (Project + Interview) |
|-------|-------------------|------------------------------------------|
| **FastAPI** | Advanced level | Your main backend |
| Path operations, Dependencies | Strong | For clean code |
| BackgroundTasks + Threading | Very strong | You're using it for long running scans |
| Pydantic Models | Strong | Request/Response validation |
| Middleware & Exception handling | Medium-Strong | For making it production ready |
| **Async vs Sync** | Clear difference | When to use async, when to use thread |

### 2. Database & Storage

| Topic | Level | Notes |
|-------|-------|-------|
| **SQLite** (advanced) | Strong | WAL mode, thread-local connections, indexing |
| Database design | Medium-Strong | Tables, relationships, migrations |
| **Pickle / Caching strategies** | Medium | Proper use of .pkl cache |
| SQL basics (Joins, Window functions, Indexing) | Strong | In case you need to shift to Postgres later |
| ORM vs Raw SQL | Concept clear | You're using raw SQL (that's good) |

### 3. Data & Computation (Python)

| Topic | Level | Notes |
|-------|-------|-------|
| **Pandas + NumPy** | Strong (vectorized operations) | Core of indicators + scanners |
| Parallel processing | Medium-Strong | Understand `ProcessPoolExecutor` |
| Memory management | Medium | While scanning 2000+ stocks |

### 4. Real-time & Communication

| Topic | Level | Notes |
|-------|-------|-------|
| **WebSocket** | Strong | Upstox live ticks |
| **Server-Sent Events (SSE)** | Medium-Strong | Used for live logs |
| HTTP polling vs WebSocket vs SSE | Concept clear | When to use which |
| State Machines | Strong | Core logic of live trader |

### 5. Next.js + Node side (already using)

| Topic | Level | Notes |
|-------|-------|-------|
| Next.js App Router (advanced) | Strong | API routes, Server Components, streaming |
| TypeScript (advanced) | Strong | Tightening types |
| Event-driven architecture | Medium | Orchestrator + state machines |

### 6. Extra Important Concepts (Interview + Growth)

- **System Design basics** of this architecture
  (Why Python for data, Node for live — you should be able to explain this)
- Error handling & Resilience (retry, circuit breaker ideas)
- Logging & Monitoring
- Environment variables & Config management
- Basic Docker (later)
- Git advanced (branching, clean commits)

---

### Short Priority List (What to focus on now)

1. **FastAPI** (Background tasks, Dependencies, structure)
2. **SQLite advanced** + Database design
3. **Pandas vectorized** + Parallel processing
4. **WebSocket + SSE** deeply
5. **State Machines** (live trader part)
6. TypeScript + clean architecture

---

### Practical Advice:

- Don't learn a new framework right now.
- Understand what you're using in the project by **reading the source code**.
- Do a small experiment on each topic (separate mini examples).
- Then apply that knowledge to improve your TradeStack.

---

### Framework Mapping (only one place — to avoid beginner confusion)

> **Beginner confusion rule:** While understanding backend, the biggest question is "What are Flask/FastAPI/Django/Express, which one to choose?" A clear answer to this is given in `Python Course Roadmap.md` + `Phase 0/0.4` (jungle map). Concept: all frameworks do the same core things — only syntax differs. The mapping is **only in that place** in the course, after that it's straight FastAPI.

Which area should you start from first?
FastAPI deep dive, Database, Real-time (WebSocket/SSE), or State Machines?
