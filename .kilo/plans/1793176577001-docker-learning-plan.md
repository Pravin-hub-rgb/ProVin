# Docker Learning Plan — Phase 2 for FastAPI Course

## Goal
Teach Docker on the existing Phase 1 mini-project (`Trading Backend Basic`) so the skill is familiar before applying to TradeStack, and so an interviewer can run it with one command.

## Context (verified in repo)
- `docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/` already contains `1.0` → `1.5.5`. It teaches:
  - SQLite schema (`stocks`, `prices`, `settings` tables)
  - `INSERT ... VALUES (?, ?, ?)` parameterized queries
  - `SELECT ... WHERE active = 1` retrieval
  - `/api/scan` with RSI filter, `results.sort(key=lambda r: r["rsi"])`, and `[:price_limit]`
  - README writing, per-stock `try/except` isolation
- 1.5.5 already forward-references "Phase 2 - WebSocket" → Phase 2 must be inserted **before** that becomes WebSocket.
- No Docker content exists anywhere in the repo (grep confirmed).

## Scope decisions (locked — change requires user approval)
1. Docker teaches on the **same** Phase 1 mini-project. No new application is created.
2. `Phase 2 - Docker Basics` folder is **new**. It sits between Phase 1 and the future WebSocket phase.
3. The future WebSocket phase becomes **Phase 3** (renamed from the placeholder in 1.5.5's forward-reference).
4. Career lab reference: Lab E → points to Phase 2 for "containerize a backend + DB" learning.

## Tasks (implementation agent)

### T1: Create Phase 2 course folder + file 1
- **Path:** `docs/coding/Backend (Python)/Phase 2 - Docker Basics/2.0 Phase 2 - Kya Seekhenge.md`
- **Content:** Why Docker (portability, interviewer-runnable), what's in scope (Dockerfile, .dockerignore, docker-compose.yml, volume mount, `docker compose up`), what's out of scope (multi-stage production builds, K8s, cloud deploy).
- **Length:** ~100–150 lines, same "gadhe ko bhi samajh" tone as Phase 1.

### T2: Create file 2 — Dockerfile + .dockerignore
- **Path:** `docs/coding/Backend (Python)/Phase 2 - Docker Basics/2.1 Dockerfile + .dockerignore.md`
- **Content:**
  - `.dockerignore` — `.venv`, `__pycache__`, `*.pyc`, `data/`, `README.md`, `.env`
  - `Dockerfile`:
    ```dockerfile
    FROM python:3.12-slim
    WORKDIR /app
    COPY requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    COPY . .
    CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
    ```
  - Explanation per line (same style as Phase 1).

### T3: Create file 3 — Docker Compose + volume mount
- **Path:** `docs/coding/Backend (Python)/Phase 2 - Docker Basics/2.2 Docker Compose - Volumes + Service.md`
- **Content:**
  ```yaml
  services:
    backend:
      build: .
      ports:
        - "8000:8000"
      volumes:
        - ./data:/app/data
      environment:
        - PYTHONUNBUFFERED=1
  ```
  - Explain volume mount so SQLite persists across container rebuilds.
  - Explain port mapping (`8000:8000`).
  - Show `docker compose up --build` and `docker compose down`.

### T4: Create file 4 — Test + README + Bridge to TradeStack
- **Path:** `docs/coding/Backend (Python)/Phase 2 - Docker Basics/2.3 Test Karo + TradeStack Bridge.md`
- **Content:**
  - Verify: `curl http://localhost:8000/health`, check `/docs`, check DB file created on host in `data/`.
  - Verify restart survives: `docker compose down`, re-seed, `docker compose up`, data persists.
  - Bridge: "Same Dockerfile + volume pattern applies to TradeStack. Copy 2.1 → `backend/Dockerfile`, 2.2 → `docker-compose.yml`, change `app.main:app` → `server:app`."

### T5: Update 1.5.5 forward-reference
- **File:** `docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.5.5 Scan Endpoint + Wrap-up.md`
- **Edit:** Add a bullet in section "## Agla Kya Hai (Phase 2 Preview)" noting two Phase 2 options:
  > **Option A (recommended):** Phase 2 = Docker, taaki ye mini-project portable ho. Real-time WebSocket Phase 3 me.
  > (No content change — just update the preview text to acknowledge the insertion.)

### T6: Update Career README with progress checkboxes
- **File:** `docs/coding/Career/README.md`
- **Edit:** Insert a new section **## 7. Progress Tracker** between section 6 and the footer:
  ```markdown
  ## 7. Progress Tracker

  Live in `CAREER-FOCUS-PLAN.md`. This README tracks high-level phase completion:

  - [ ] Phase 0 — Backend mindset
  - [ ] Phase 1 — FastAPI basics + Trading Backend project
  - [ ] Phase 2 — Docker basics (on Phase 1 project)
  - [ ] Phase 3 — WebSocket (future)
  - [ ] M0 — Resume truth audit
  - [ ] M5 — DukaanOS AI defense kit
  - [ ] M6 — TradeStack defense kit
  - [ ] M7 — React 100-Q diagnostic
  - [ ] M8 — Next.js 100-Q diagnostic
  - [ ] M10 — Resume finalize + apply
  - [ ] M11 — Core subjects
  - [ ] M12 — Mock Interview
  - [ ] M13 — Applications sent

  Tick one box per session. When everything reads `[x]`, you're done with the plan.
  ```

### T7: Update Career CAREER-FOCUS-PLAN.md to add Lab E
- **File:** `docs/coding/Career/CAREER-FOCUS-PLAN.md`
- **Edit:** Insert "Lab E" between "Lab D" and "M5" (or wherever labs are listed). Content:
  ```markdown
  ### Lab E — Dockerize the Trading Backend Basic (M2.5)

  **Why:** You need to learn Docker on code you already understand, so it carries to TradeStack without risk.

  **What:**
  - Build + run the Phase 1 mini-project in a container
  - Volume-mount the SQLite DB so data survives restarts
  - Write a README section "Runs in Docker" (1 paragraph) — this is the interviewer-facing line

  **Reference:** `docs/coding/Backend (Python)/Phase 2 - Docker Basics/` (all files)
  ```

## Files touched (5 total)
| T# | Action | Path |
|----|--------|------|
| T1 | create | `docs/coding/Backend (Python)/Phase 2 - Docker Basics/2.0 Phase 2 - Kya Seekhenge.md` |
| T2 | create | `docs/coding/Backend (Python)/Phase 2 - Docker Basics/2.1 Dockerfile + .dockerignore.md` |
| T3 | create | `docs/coding/Backend (Python)/Phase 2 - Docker Basics/2.2 Docker Compose - Volumes + Service.md` |
| T4 | create | `docs/coding/Backend (Python)/Phase 2 - Docker Basics/2.3 Test Karo + TradeStack Bridge.md` |
| T5 | edit | `docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.5.5 Scan Endpoint + Wrapup.md` (update Phase 2 preview text) |
| T6 | edit | `docs/coding/Career/README.md` (add Section 7 Progress Tracker) |
| T7 | edit | `docs/coding/Career/CAREER-FOCUS-PLAN.md` (add Lab E entry) |

## Dependencies
- Phase 1 must be done first (it is — all files exist and are complete).
- No blocking dependencies for Phase 2 itself.

## Validation (what "done" looks like)
- `Phase 2 - Docker Basics/` folder has 4 files.
- `docker compose up` from Phase 1 project root builds and serves the app on `:8000`.
- SQLite data persists across `docker compose down` / `up`.
- `README.md` (Career folder) has checkboxes in Section 7.
- `1.5.5` forward-reference acknowledges the insertion.
- No broken forward references. No orphaned COMEBACK-SPRINT references (already confirmed clean).

## Risks
- Risk: The mini-project's `requirements.txt` and `app/` path must match the Dockerfile. **Mitigation:** reference the actual structure from 1.5.2 (`venv`, `app/main.py`, `requirements.txt`).
- Risk: User may want multi-stage builds later. **Mitigation:** explicitly out of scope for Phase 2. Post-offer only.
