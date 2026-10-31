# TRADESTACK DEFENSE KIT — Explaining the Python Backend

> **What this file is:** interview defense material. The TradeStack Python backend (a 1,240-line `server.py`, 15 source modules, 49 REST endpoints) is code you wrote yourself — now the only job is to **explain** it, not to re-learn Python.
>
> **Target:** Fullstack (React+Next+Node) role. Python here is your **depth signal**, not your weakness. The interviewer asks *"what is FastAPI, why SQLite, where do you use pandas"* — you answer confidently in 30 seconds each. That's enough.
>
> **Pace:** this is a reading-and-rehearsal kit, not a study course. One concept card or a few Q&As per sitting is a complete sitting — it runs inside Milestone M6 of `CAREER-FOCUS-PLAN.md`. No clocks, no quotas.

---

## 1. Architecture One-Pager (the whole project in 60 seconds)

TradeStack is built from **three parts**, and each part does a different job:

```
┌─────────────────────────────────────────────────────────┐
│  Next.js Frontend (TypeScript + React 19 + MUI)         │
│  Scanner page · Breadth page · Live-trading page        │
│  Settings page (UI for 70 params)                        │
└──────────────┬──────────────────────────┬───────────────┘
               │ REST (fetch)             │ SSE /api/live/events
               ▼                          ▼
┌────────────────────────────┐  ┌──────────────────────────┐
│  Python FastAPI (port 8001)│  │  Node Live-Trader        │
│  • 49 REST endpoints       │  │  (inside a Next.js route │
│  • pandas/numpy indicators │  │   handler, in-process)   │
│  • NSE bhavcopy ingestion  │  │  • Upstox WebSocket V3   │
│  • custom indicator set   │  │  • protobuf decode        │
│  • continuation + reversal │  │  • state machines        │
│    scanners (multiprocess)│  │  • paper trader + P&L    │
│  • market breadth engine   │  └───────────┬──────────────┘
└──────────────┬─────────────┘              │
               │                            │
               └────────► SQLite (WAL) ◄────┘
                    data/settings.db
                    (both runtimes, one file)
               │
               └──► data/cache/*.pkl  (2000+ stocks, per-stock pickle)
```

### The three parts and what each does

| Part | Tech | Why here | Job |
|---|---|---|---|
| **Frontend** | Next.js + React + MUI | most mature for UI | Screens, forms, charts |
| **Python service** | FastAPI + pandas + numpy | best ecosystem for data-heavy work | Indicators, scanners, breadth, bhavcopy data |
| **Node live-trader** | Next.js route handler + Upstox SDK | real-time event handling is natural in JS | WebSocket feed, state machines, order/paper trade |
| **Shared DB** | SQLite (WAL mode) | zero-config, two processes one file | Settings, trade log, cache index |
| **Cache** | `.pkl` files | pandas' native format | Per-stock historical OHLCV (2000+ files) |

### One-line answer (say this in the interview)

> *"TradeStack is a polyglot trading platform — data-heavy computation is in Python because pandas/numpy are best for it, and real-time streaming is in Node because WebSocket event handling is natural in JavaScript. Both share one SQLite file. That's separation of concerns — each layer does its own job."*

---

## 2. "2-Minute TradeStack Pitch" (rehearse — record and listen back)

> *"TradeStack is a personal NSE swing-trading platform that scans 2000+ stocks for continuation and reversal patterns.*
>
> *The architecture is tri-partite: a Next.js frontend, a Python FastAPI microservice, and a Node-based live trading engine. Data-heavy work — technical indicators, stock scanning, market breadth — is in Python because pandas/numpy are best for it. Real-time market data streaming is in Node because WebSocket event handling is natural in JavaScript. Both share a single SQLite database in WAL mode — so one process writes and the other reads without a server.*
>
> *The data pipeline downloads NSE bhavcopy and builds a pickle cache per stock — 2000+ stocks. From that same cache the custom indicators are computed — SMA (20/50), MA angle, ADR, price-change, high-low distances. Scanners use a multiprocessing pool because indicator math across 2000 stocks is CPU-bound, and processes are what give real parallelism in Python.*
>
> *On the live side, Upstox WebSocket V3 streams 5-minute candles, protobuf-decoded, driving a state machine per stock — 11 states, like: entry signal came, stock went to standby; entry filled, then position. Position management, paper trading, and P&L tracking are all automated. The trade log persists in SQLite.*
>
> *Over the last 6 months I refactored it — consolidated 47 hardcoded URLs into a central api.ts, added type safety, and wrote the architecture documentation."*

---

## 3. Concept Cards (one card per sitting, unhurried)

### Card 1 — FastAPI: what it is and what a route is

FastAPI is a **Python web framework** used to build APIs. Your `server.py` creates its app:

```python
app = FastAPI(title="TradeStack", version="0.1.0", lifespan=lifespan)
```

**Route = a URL that does something.** Hitting `/api/settings/{key}` with GET returns that setting's value; PUT changes it.

```python
@app.get("/api/settings/{key}")
def get_setting(key: str):
    ...

@app.put("/api/settings/{key}")
def set_setting(key: str, value: str):
    ...
```

**Bonus:** FastAPI automatically generates **Swagger docs** — `http://localhost:8001/docs`. All endpoints show up there with example requests. That's why "47 endpoints" isn't a lot of work — the pattern is the same everywhere.

**Interview answer:** *"FastAPI is Python's modern async web framework. A route is a function mapped to a URL — it takes a request and returns a JSON response. FastAPI builds automatic validation and documentation from Pydantic models, so my 49 endpoints get auto-generated Swagger docs."*

### Card 2 — Pydantic: the shape of a response

Pydantic is a library that **validates data** in Python. In your server:

```python
class UpdateRequest(BaseModel):
    date: Optional[str] = None

class BatchHistoryRequest(BaseModel):
    symbols: list[str]
    days: int = 200
```

These classes say *"the input for this endpoint should look like this"*. FastAPI reads them to:
1. **Validate** — if you send `symbols` as a string, it returns a 422 error
2. **Show the schema in the docs**
3. **Type the response** — a class like `ScanResult` tells you which fields the response will have

**Interview answer:** *"Pydantic data classes handle validation and serialization. FastAPI uses them for request/response schemas. That way malformed input is rejected automatically and the schema auto-generates in Swagger docs."*

### Card 3 — SQLite + WAL: your strongest point

**SQLite** is a **file-based database** — no server needed, just a `.db` file. Your `data/settings.db`.

**WAL mode** (Write-Ahead Logging) means:

> *"Reader and writer don't block each other. The writer first writes changes to a separate `-wal` file, then applies them to the main file. Reads stay fast, and one process can write while another reads."*

**Why this mattered in your project:** the Python FastAPI process writes settings/trades, and the Node live-trader reads them. WAL mode is what lets both coexist peacefully on the same file. Without it, a writer blocks all readers.

**Interview answer:** *"SQLite is an embedded file-based database — zero configuration, no server. I use WAL mode because it parallelizes reads and writes, which was necessary since the Python service and the Node live-trader both work on the same file — one writes, the other reads, without blocking."*

### Card 4 — pandas/numpy: the real indicator set

The resume's indicator claims come from `src/indicators.py`. The **actual set** (get these right — an interviewer will probe exactly here):

| Indicator | What it computes | How |
|---|---|---|
| **SMA 20 / SMA 50** | simple moving averages of close | `data["close"].rolling(window=period).mean()` |
| **MA angle** | slope of SMA-20 as degrees, via regression over last N points | `np.correlate` — vectorized, "~100x faster than the original polyfit loop" (your own code comment!) |
| **ADR % / ADR absolute** | average daily range, as % of close and in rupees | rolling mean of `(high − low)` |
| **Price change** | % change over 1, 5, 20 days | `close.pct_change(p)` |
| **High-low distances** | how far close sits from the 20-day high/low | rolling max/min + normalized distance |

Plus three **scanner filters**: price-range check (default ₹100-₹2000), minimum ADR% threshold (3.0), and a liquidity check (volume ≥ 1,000,000 with ≥5% price movement on ≥2 of the last 30 days).

**Note what is NOT in the file:** RSI, EMA, MACD, Bollinger. Never claim them — follow-up questions die right there.

**pandas' real role: vectorization.** Whole columns of math run at C level in one expression — a manual Python loop would be ~100x slower on the same rows:

```python
# manual (slow)
for i in range(20, len(prices)):
    sma_values.append(sum(prices[i-20:i]) / 20)

# pandas (fast, vectorized)
sma = prices.rolling(window=20).mean()
```

**bhavcopy ingestion** is the other pandas job — daily NSE CSV read into a DataFrame, cached per-stock as pickles.

**Interview answer:** *"My indicator layer has five groups — simple moving averages, an MA-angle slope computed with np.correlate, ADR in percent and absolute rupees, multi-day price changes, and distance from period highs/lows — plus scanner filters for price range, ADR floor and liquidity. I leaned on pandas' vectorized rolling operations so the math runs at C speed across 2,000+ stocks, with each stock's OHLCV cached as a pickle for fast reload."*

### Card 5 — Multiprocessing: why in the scanners

Your `scanner.py`:

```python
from concurrent.futures import ProcessPoolExecutor, as_completed

with ProcessPoolExecutor(max_workers=num_workers) as pool:
    futures = {pool.submit(scan_stock, symbol): symbol for symbol in symbols}
```

**Why:** scanning is CPU-bound — pure math, computing indicators. Scanning 2000 stocks one at a time is slow. `ProcessPoolExecutor` spawns multiple **processes** that work in parallel. For CPU-bound work, processes beat threads because Python's GIL (Global Interpreter Lock) doesn't let threads run in true parallel — separate processes run separate Python interpreters.

**Who uses ThreadPool?** `bhavcopy_updater.py` — because that work is I/O-bound (network downloads), and threads can overlap the I/O waits.

**Interview answer:** *"Scanning is CPU-bound — pure indicator math — so I used ProcessPoolExecutor, which spawns multiple processes for parallel compute. That's faster than threads because Python's GIL blocks true thread parallelism. For bhavcopy downloads I used ThreadPool instead, because that's I/O-bound — network waits can overlap."*

### Card 6 — WebSocket vs SSE: real-time streaming

Your project uses **SSE (Server-Sent Events)** (`/api/live/events`), **not WebSocket**.

**SSE:** Server → Client one-way stream, plain HTTP. Pushes text/JSON. Simple, built-in auto-reconnect, works over HTTP/2.

**WebSocket:** Full duplex — messages both ways. You use **WebSocket** for the Upstox market data (protobuf frames); you send your own data to the browser over SSE.

Your SSE route (`frontend/src/app/api/live/events/route.ts`):

```typescript
const clients = new Set<(data: string) => void>();

export function broadcast(data: string): void {
  for (const write of clients) {
    try { write(data); } catch { clients.delete(write); }
  }
}
```

This basically:
1. Each connected browser adds a function to the `clients` set
2. Whenever the live-trader has a new signal, `broadcast()` sends it to everyone
3. When a browser disconnects, the `req.signal` abort listener removes the client — no memory leak

**Interview answer:** *"Market data comes over WebSocket from the broker (Upstox) because it's full-duplex high-frequency data. After that, the Node live-trader processes it and generates signals, and I push those to the browser over SSE because signal push is a one-way stream — SSE is simpler, gives auto-reconnect, and stays plain HTTP. On client disconnect I use an abort listener to remove the client from the set, so there's no memory leak."*

### Card 7 — Upstox WebSocket + protobuf (bonus depth)

Your live-trader streams Upstox **WebSocket V3** 5-minute candles:
- WebSocket handshake → subscribe message with auth token
- Frames arrive **protobuf-encoded** (binary) → decoded with `protobufjs`
- You patched the SDK prototype for connect reliability
- Reconnect logic: auto-retry with backoff on disconnect

**Interview answer:** *"Live market data comes over WebSocket because it's a persistent bidirectional connection — HTTP polling would add request overhead every 5 seconds. Upstox sends binary in protobuf format, which has to be decoded. Reconnect handling is critical — if the network drops, auto-retry with backoff, otherwise live trading stops."*

### Card 8 — State Machines: the brain of the paper trader

Your live-trader has a **finite state machine** per stock (11 states). Example:
- `IDLE` → entry signal arrived → `WATCHING`
- `WATCHING` → entry filled → `IN_POSITION`
- `IN_POSITION` → target/stop hit → `EXITED`

**Why a state machine?** In real trading a stock is in exactly one "phase" at a time. The state machine enforces that — no double entries, invalid transitions get blocked.

**Interview answer:** *"I kept each stock in a finite state machine — IDLE, WATCHING, IN_POSITION, EXITED. That ensures a stock is in exactly one phase at a time, prevents double entries, and blocks invalid state transitions. Position sizing and exit rules apply according to the state."*

---

### Card 9 — Why the live side is Node: concurrent I/O, NOT parallelism (the memory-fix card)

The old fuzzy memory said *"JS is better at parallelism than Python."* **Never say that sentence** — Node is single-threaded, so it has literally zero parallelism, and an interviewer will probe hard.

The correct story has three clean parts:
1. **Tooling fit:** the Upstox SDK and protobuf decoding are JavaScript-native. The live trader runs *inside the Next.js app itself* (route handlers) — no second service to deploy, no inter-process plumbing.
2. **The workload is concurrent I/O:** one process holds ONE WebSocket connection; the broker *pushes* candle frames for all subscribed symbols; every pushed tick fires a callback routed to that symbol's state machine. Ten stocks "monitored simultaneously" = ten callbacks awaiting pushes on an event loop — waiting on I/O concurrently, never computing side-by-side.
3. **Python owns the real parallelism:** the scanners do CPU-bound math across 2,000+ stocks with `ProcessPoolExecutor` (the GIL blocks thread parallelism there).

**The two sentences that always pass:**
> *"Both halves use the concurrency model that fits their workload — the realtime feed is event-loop I/O in Node, and the heavy math is process-based parallelism in Python."*

> *"The live side isn't about parallelism at all — it's a single process subscribing to a push feed; the state machines ensure each stock is in exactly one phase at a time."*

**Bonus war story this card unlocks (you wrote it yourself, `streamer.ts`):** the Upstox SDK loaded its protobuf schema from a disk path that broke under Turbopack/Next bundling — so you patched the SDK's `MarketDataFeederV3.prototype.initProtobuf` to share one pre-loaded root, and wrapped the connection with reconnect-with-backoff. A genuinely rare, hands-dirty story — use it.

---

## 4. Top 15 Python-Backend Interview Questions (model answers)

These are exactly the questions fullstack interviews ask about TradeStack. Practice answering them **out loud**.

### Q1. Why is TradeStack's backend in Python and not Node?
**A:** Data-heavy computation (indicators, scanners) is in Python because pandas/numpy are best-in-class for it — vectorized operations run at C level. Real-time streaming and the UI are in Node/Next because WebSocket event handling and SSR are natural in JS. This is separation of concerns — each layer in its strength.

### Q2. FastAPI vs Flask — why FastAPI?
**A:** FastAPI gives async support (Flask is sync by default), automatic request/response validation and type hints via Pydantic, and auto-generated Swagger/OpenAPI docs. With 49 endpoints, Swagger came free — in Flask I'd have had to document manually.

### Q3. How do you handle concurrent reads/writes in SQLite?
**A:** I use WAL (Write-Ahead Logging) mode. It parallelizes reader and writer — the writer first writes changes to a `-wal` file, while the main DB file stays consistent for readers. This lets the Python service (writer) and the Node live-trader (reader) work on the same file without blocking.

### Q4. Is SQLite right for production?
**A:** TradeStack is a personal, single-user tool — so SQLite is perfect (zero-config, no server). For multi-user or high-write production systems I'd go to Postgres. That's why I kept the DB path centralized in `db.py` with an abstraction, so migrating to Postgres later stays simple.

### Q5. How do you vectorize indicators in pandas?
**A:** Every rolling-window computation — SMA 20/50, ADR, high-low distances — is a single pandas expression running at C level. The best example is MA angle: the original code computed the regression slope with a polyfit loop in Python; I replaced it with a vectorized `np.correlate` — my own code comment says ~100x faster. Replacing manual loops with rolling windows is the core of vectorization. (Truth-check note: TradeStack has no RSI/EMA/MACD — claiming them dies on follow-up; the honest set is SMA, MA angle, ADR, price change, high-low distances.)

### Q6. Multiprocessing vs threading vs async — when which?
**A:** Rule of thumb:
- **CPU-bound** (indicator math, scanning) → `ProcessPoolExecutor` (multiprocessing). The GIL keeps threads from true parallelism.
- **I/O-bound** (network downloads, API calls) → `ThreadPoolExecutor` or async. Waits overlap in threads.
- In TradeStack, scanners use `ProcessPoolExecutor`, the bhavcopy downloader uses `ThreadPoolExecutor`.

### Q7. WebSocket vs SSE — what did you choose for live data?
**A:** WebSocket from the broker (Upstox) — full-duplex high-frequency binary (protobuf) data. To the browser, SSE — because signal push is one-way, SSE is simpler, gives auto-reconnect, and stays plain HTTP (proxy-friendly). WebSocket would also work in the browser, but SSE's setup is simpler when full-duplex isn't needed.

### Q8. Where is Pydantic used and why?
**A:** For request/response schemas. Example: `BatchHistoryRequest(symbols: list[str], days: int)`. FastAPI reads these to reject malformed input (422), enforce field types in the response, and auto-generate the schema in Swagger docs. I don't have to validate manually.

### Q9. Why a cache — why not read the file directly?
**A:** The per-stock pickle cache (`data/cache/*.pkl`) stores historical OHLCV, with a SQLite `cache_index` table holding metadata (row count, first/last date, file size). This gives:
1. Fast file reads when computing indicators (pickle = pandas native)
2. Instant list/stats queries from the cache index via SQLite (filesystem glob scan would be slow)
3. Independent cache updates per stock

### Q10. How do you handle background tasks?
**A:** Run the operation in the background via FastAPI's `BackgroundTasks` or a thread. Generate an operation ID and store status in an `active_operations` dict (`running`/`done`/`error` + logs). The frontend polls for status. This keeps the user's request from timing out.

### Q11. How did you handle reconnect/logging/error handling?
**A:** Central Python logging (console + file), with `logger = logging.getLogger(__name__)` in every module. Structured logs with timestamps in scanners/operations. Background operation status updates on exception so it doesn't stay stuck at `"running"`. Reconnect-with-backoff on the Upstox WebSocket.

### Q12. Why refactor 47 hardcoded URLs?
**A:** In Solidify phase 1 — 12-13 files had API URLs hardcoded. Changing the backend port meant editing 47 places. I built a central `api.ts` (reads the port from the `PY_API` env var), typed `apiGet`/`apiPost` helpers, and endpoint groups. Now the port changes in one place, and TypeScript types are defined once (`lib/types.ts`).

### Q13. Where is async used in Python in your project?
**A:** Honestly — the FastAPI framework is async (route handlers run in an async context), but heavy computation (scanners) goes into a sync `ProcessPoolExecutor` because it's CPU-bound and gets faster from parallel processes, not async. I/O-heavy parts (data fetch) use threads. A realistic hybrid approach.

### Q14. How did you test?
**A:** This project has no automated tests yet — that's the gap I'm fixing (Phase 4 plan: pytest + Vitest). Currently I verify with health checks and manual smoke tests. The architecture uses pure functions (indicators, state machines) where unit tests are easy to add.

**Note:** answer this honestly — "no tests yet, adding them" > "fully tested" (which gets caught on follow-up).

### Q15. What was the biggest technical pain in this project?
**A:** The Upstox WebSocket V3 SDK prototype issues — the SDK connected/reconnected internally in its own way, sometimes getting stuck. I had to debug it and add custom reconnect logic with backoff via SDK prototype patching. Second — the bhavcopy gap-fill logic (backfilling missing trading days), now handled by `fill_cache_gaps`.

---

## 5. server.py Reading Map (3 days, 1.5h/day)

This is your **deep-dive plan**. You don't need to read all the code — you need to understand the structure.

### Sitting 1 — Skeleton + routes
- Read the top 60 lines: imports, `lifespan` (cache rebuild on startup), `app = FastAPI(...)`, CORS middleware
- **Goal:** list all 49 route signatures once (path + method). Just see what each endpoint does — not the implementation.
- Command: `grep '^@app\.' backend/server.py`

### Sitting 2 — Data layer
- `src/db.py` — SQLite schema (`cache_index`, `settings`, `upstox_config`, `stock_list_items`, trade log tables), thread-local connections
- `src/cache_manager.py` — pickle save/load, SQLite index with glob fallback
- `src/settings.py` — key-value settings with types/categories/validation
- **Point to grasp:** where data comes from, how it's stored, how it's retrieved.

### Sitting 3 — Scanners + breadth
- `src/indicators.py` — the real indicator set (SMA 20/50, MA angle via `np.correlate`, ADR % / absolute, price change 1/5/20d, distance from period high/low) + the three scanner filters (price range, ADR threshold, liquidity). **No RSI/EMA/MACD — don't claim them.**
- `src/scanner.py` — ContinuationScanner, ReversalScanner, `ProcessPoolExecutor` usage
- `src/market_breadth.py` — breadth calculation, `ProcessPoolExecutor`
- **Point to grasp:** how pure computation parallelizes, how indicator output gets used.

### Bonus — Live trader (short optional read)
- `frontend/src/app/api/live/route.ts` + `events/route.ts` — SSE broadcast
- `frontend/src/lib/` — Upstox WebSocket client, state machines
- **Point to grasp:** how data goes from the Python side to the Node side in real time.

---

## 6. What NOT to learn (explicitly out of scope)

These are **not needed** in these 3 weeks — for the resume/interview:

- ❌ Advanced asyncio (async generators, async context managers)
- ❌ FastAPI `Depends` dependency injection (advanced patterns)
- ❌ ORMs (SQLAlchemy) — you use raw `sqlite3`, which is fine
- ❌ Deep pandas time-series (rolling window internals)
- ❌ Celery/RQ task queues
- ❌ Kubernetes, cloud deployment (Docker is bonus, not required)

**Why:** interviews need the confidence of "I built this, I learned this" — that comes from rehearsing the Defense Kit. The "out of scope" items are higher risk to mention (you'll get stuck on follow-ups). Also note: TradeStack-Mini is no longer being built — its place is taken by Labs A/B in `CAREER-FOCUS-PLAN.md` (the already-built ground floor).

---

## 7. Rehearsal Checklist (one question spoken + recorded per sitting)

Every night in the 19:30 slot — speak one question and record it:

- [ ] Q1: Why the backend is in Python, not Node
- [ ] Q3: SQLite WAL concurrency
- [ ] Q6: Multiprocessing vs threading vs async
- [ ] Q7: WebSocket vs SSE
- [ ] Q12: 47 URL refactor
- [ ] Q15: Biggest technical pain

Reading the remaining cards once is enough — that part is passive; speaking them is the active proof.

---

---

## 8. Bridge to the Hands-On Labs (CAREER-FOCUS-PLAN M1–M4)

Reading explains; the labs make you *feel* the same shapes on the ground floor. Connect each lab to its part right after finishing it:

| Lab (in `hands-on-gym/`) | Trains the ground floor of | Bridge sentence to use in interviews |
|---|---|---|
| Lab A — FastAPI + SQLite CRUD | **Part 2** (server shape, validation, `/docs`, status codes) | *"My TradeStack server is this exact shape at scale — 49 endpoints of it, sharing one WAL-mode file."* |
| Lab B — CSV → DB → SMA → scan (+B2 `ProcessPoolExecutor`) | **Part 2 data side + Part 3** (ingestion, indicator layer, scanner) | *"The production scanners are this pattern scaled: pickled per-stock caches, 5 indicator groups, process pool instead of a loop."* |
| Lab C — simulated feed → callbacks → mini state machine (TS) | **Part 4** (event-driven intake, per-symbol FSM, reconnect) | *"Before reading the real `streamer.ts`, I rebuilt its skeleton on a simulated feed — same routing, same state machine discipline."* |

Labs are a private gym — never resume items, never "projects". Speaking about them in interviews is fine as *learning evidence* ("I rebuilt a mini version to keep my understanding sharp"), which is a credibility booster, not a dilution.

---

**Related:** `CAREER-FOCUS-PLAN.md` (this kit runs inside M6; Labs A/B are the hands-on ground floors for Parts 2-3) · `Career/README.md` (master map).
