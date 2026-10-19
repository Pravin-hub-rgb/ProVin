# TRADESTACK DEFENSE KIT — Python Backend Ko 3 Hafte Me Explain Karna

> **Ye file kya hai:** Interview defense material. TradeStack ka Python backend (~930 lines `server.py`, 14 modules, 48 endpoints) tumne khud banaya hai — ab tumhe sirf **explain** karna hai, naya Python seekhna nahi.
>
> **Target:** Fullstack (React+Next+Node) role. Python yahan tumhari **depth ka signal** hai, weakness nahi. Interviewer poochega *"FastAPI kya hai, SQLite kyun, pandas kahan use hota"* — tum confidently 30-second answers denge. Bas itna kaafi hai.
>
> **Time budget:** Roz 1-1.5h × 15 din = ~15 ghante. Isse zyada mat lagao.

---

## 1. Architecture One-Pager (ye poora project hai, 60 seconds me)

TradeStack **teen hisson** se bana hai, aur har hissa alag kaam karta hai:

```
┌─────────────────────────────────────────────────────────┐
│  Next.js Frontend (TypeScript + React 19 + MUI)         │
│  Scanner page · Breadth page · Live-trading page        │
│  Settings page (70 params ka UI)                        │
└──────────────┬──────────────────────────┬───────────────┘
               │ REST (fetch)             │ SSE /api/live/events
               ▼                          ▼
┌────────────────────────────┐  ┌──────────────────────────┐
│  Python FastAPI (port 8001)│  │  Node Live-Trader        │
│  • 48 REST endpoints       │  │  (Next.js route handler  │
│  • pandas/numpy indicators │  │   ke andar, process me)  │
│  • NSE bhavcopy ingestion  │  │  • Upstox WebSocket V3   │
│  • 13 technical indicators│  │  • protobuf decode        │
│  • continuation + reversal │  │  • state machines        │
│    scanners (multiprocess)│  │  • paper trader + P&L    │
│  • market breadth engine   │  └───────────┬──────────────┘
└──────────────┬─────────────┘              │
               │                            │
               └────────► SQLite (WAL) ◄────┘
                    data/settings.db
                    (dono runtimes ek hi file)
               │
               └──► data/cache/*.pkl  (2000+ stocks, per-stock pickle)
```

### Teen hisse aur unka kaam

| Hissa | Tech | Kyun yahan | Kaam |
|---|---|---|---|
| **Frontend** | Next.js + React + MUI | UI ke liye sabse mature | Screens, forms, charts |
| **Python service** | FastAPI + pandas + numpy | Data-heavy kaam ka best ecosystem | Indicators, scanners, breadth, bhavcopy data |
| **Node live-trader** | Next.js route handler + Upstox SDK | Real-time event handling JS me natural hai | WebSocket feed, state machines, order/paper trade |
| **Shared DB** | SQLite (WAL mode) | Zero-config, do processes ek file | Settings, trade log, cache index |
| **Cache** | `.pkl` files | pandas ka native format | Per-stock historical OHLCV (2000+ files) |

### Ek line me answer (interview me yahi bolna)

> *"TradeStack ek polyglot trading platform hai — data-heavy computation Python me hai kyunki pandas/numpy best hai uske liye, aur real-time streaming Node me hai kyunki WebSocket event handling JS me natural hai. Dono ek SQLite file share karte hain. Ye separation of concerns hai — har layer ka apna kaam."*

---

## 2. "2-Minute TradeStack Pitch" (rehearse karo — record karke suno)

> *"TradeStack ek personal NSE swing-trading platform hai jo 2000+ stocks me continuation aur reversal patterns scan karta hai.*
>
> *Architecture tri-partite hai: ek Next.js frontend, ek Python FastAPI microservice, aur ek Node-based live trading engine. Data-heavy kaam — technical indicators, stock scanning, market breadth — Python me hai, kyunki pandas/numpy uske liye best hai. Real-time market data streaming Node me hai, kyunki WebSocket event handling JavaScript me natural hai. Dono ek SQLite database share karte hain, WAL mode me — isse ek process likhe aur doosra padhe, bina server ke.*
>
> *Data pipeline NSE bhavcopy download karke har stock ka pickle cache banata hai — 2000+ stocks ke liye. Usi cache se 13 custom indicators compute hote hain. Scanners multiprocessing pool use karte hain kyunki ek stock ka scan 2000 stocks me parallel chalana CPU-bound kaam hai.*
>
> *Live side pe Upstox WebSocket V3 se 5-minute candles stream hoti hain, protobuf decode hoke har stock ke liye state machine chalata hai — 11 states, jaise entry signal aaya, stock standby me gaya; entry fill hui, to position. Position management, paper trading, aur P&L tracking sab automated hai. Trade log SQLite me persist hota hai.*
>
> *Pichle 6 mahine me maine isme refactoring ki — 47 hardcoded URLs ko central api.ts me consolidate kiya, type safety add ki, aur architecture documentation likhi."*

---

## 3. Concept Cards (har ek 1-2 min me padhna, Week 2-3 me)

### Card 1 — FastAPI: kya hai aur route kya hota hai

FastAPI ek **Python web framework** hai jo API banane ke liye use hota hai. Tumhara `server.py` uska app banata hai:

```python
app = FastAPI(title="TradeStack", version="0.1.0", lifespan=lifespan)
```

**Route = ek URL jo kuch karta hai.** Jaise `/api/settings/{key}` pe GET karo to wo setting ka value milega, PUT karo to wo change ho jayega.

```python
@app.get("/api/settings/{key}")
def get_setting(key: str):
    ...

@app.put("/api/settings/{key}")
def set_setting(key: str, value: str):
    ...
```

**Bonus:** FastAPI automatically **Swagger docs** banata hai — `http://localhost:8001/docs`. Saare endpoints wahan dikhte hain with example requests. Isliye `47 endpoints` likhne me time nahi lagta — pattern hi ek jaisa hai.

**Interview answer:** *"FastAPI Python ka modern async web framework hai. Isme route ek function hai jo URL se map hota hai — woh function request leta hai aur JSON response deta hai. FastAPI Pydantic models se automatic validation aur documentation banata hai, isliye meri 48 endpoints ka Swagger docs auto-generated hai."*

### Card 2 — Pydantic: response ka shape

Pydantic ek library hai jo Python me **data ko validate** karti hai. Tumhare server me:

```python
class UpdateRequest(BaseModel):
    date: Optional[str] = None

class BatchHistoryRequest(BaseModel):
    symbols: list[str]
    days: int = 200
```

Ye classes batati hain ki *"is endpoint ka input aisa dikhna chahiye"*. FastAPI inhe padhke:
1. **Validate** karta hai — agar `symbols` string bhej do to 422 error de dega
2. **Docs** me schema show karta hai
3. **Response typing** deta hai — `ScanResult` jaisi class se pata chalta hai response me kya fields hongi

**Interview answer:** *"Pydantic data classes hain jo validation aur serialization handle karti hain. FastAPI inhe request/response schemas ke liye use karta hai. Isse malformed input apne aap reject ho jata hai aur Swagger docs me schema auto-generate hota hai."*

### Card 3 — SQLite + WAL: ye tumhara sabse strong point hai

**SQLite** ek **file-based database** hai — server nahi chahiye, bas ek `.db` file. Tumhara `data/settings.db`.

**WAL mode** (Write-Ahead Logging) ka matlab:

> *"Reader aur writer ek dusre ko block nahi karte. Writer pehle changes ek alag `-wal` file me likhta hai, phir main file me apply karta hai. Isse read bahut fast rehta hai, aur ek process likh raha ho tab bhi doosra padh sakta hai."*

**Tumhare project me ye kyun zaroori tha:** Python FastAPI process settings/trades likhta hai, Node live-trader unhe padhta hai. WAL mode ki wajah se dono ek hi file pe peacefully coexist kar sakte hain. Iske bina ek writer aate hi readers block ho jaate.

**Interview answer:** *"SQLite file-based embedded database hai — zero configuration, no server. Main WAL mode use kar raha hoon kyunki ye read aur write ko parallel kar deta hai, jo zaroori tha kyunki Python service aur Node live-trader dono ek hi file pe kaam karte hain — ek likhta hai, doosra padhta hai, bina block kiye."*

### Card 4 — pandas/numpy: indicators ka kaam

Tumhare `indicators.py` me 13 custom indicators hain (SMA, RSI, EMA, MACD, Bollinger, etc.). Har indicator ek **rows pe mathematical operation** hai — closing price ka moving average, ya gain/loss ka ratio.

**pandas ka asli kaam: vectorization.** Matlab ek hi line me 2000 stocks ke saare rows pe math ho jata hai, C-level pe — manual Python loop se 100x faster.

```python
# Manual (slow)
for i in range(20, len(prices)):
    sma_values.append(sum(prices[i-20:i]) / 20)

# pandas (fast, vectorized)
sma = prices.rolling(window=20).mean()
```

**bhavcopy ingestion** bhi pandas ka kaam hai — NSE se daily CSV download hota hai, wo DataFrame me read hota hai, cache me store hota hai.

**Interview answer:** *"Python me data processing ke liye pandas use kiya kyunki uska vectorized operations C-level pe chalti hain — 2000 stocks ke saare indicators seconds me compute ho jaate hain, jo manual loop me minutes lega. NSE bhavcopy ka CSV bhi pandas DataFrame me aata hai, aur uska pickle cache per-stock store hota hai taaki baar me load fast ho."*

### Card 5 — Multiprocessing: scanners me kyun

Tumhare `scanner.py` me:

```python
from concurrent.futures import ProcessPoolExecutor, as_completed

with ProcessPoolExecutor(max_workers=num_workers) as pool:
    futures = {pool.submit(scan_stock, symbol): symbol for symbol in symbols}
```

**Ye kyun:** Scanner CPU-bound hai — pure math, indicators compute karna. 2000 stocks ek ek karke scan karna slow hai. `ProcessPoolExecutor` multiple **processes** spawn karta hai jo parallel me kaam karte hain. CPU-bound kaam ke liye process better hai thread se kyunki Python me GIL (Global Interpreter Lock) threads ko parallel nahi hone deta — processes alag alag Python interpreter chalate hain.

**ThreadPool kaun use karta hai?** `bhavcopy_updater.py` me — kyunki wo I/O-bound hai (network downloads), aur threads me I/O wait overlap ho sakta hai.

**Interview answer:** *"Scanning CPU-bound hai — pure indicator math — isliye ProcessPoolExecutor use kiya, jo multiple processes spawn karke parallel compute karta hai. Ye threads se zyada fast hai kyunki Python me GIL threads ko true parallelism nahi deta. Bhavcopy download me however ThreadPool use kiya kyunki wo I/O-bound hai — network waits overlap ho sakte hain."*

### Card 6 — WebSocket vs SSE: real-time streaming

Tumhare project me **SSE (Server-Sent Events)** use hota hai (`/api/live/events`), **WebSocket nahi**.

**SSE:** Server → Client one-way stream, plain HTTP. Text/JSON push karta hai. Simple, auto-reconnect built-in, HTTP/2 pe kaam karta hai.

**WebSocket:** Full duplex — dono taraf se live messages. Upstox se market data ke liye tum **WebSocket** use karte ho (protobuf frames), browser tak apna data SSE se bhejte ho.

Tumhara SSE route (`frontend/src/app/api/live/events/route.ts`):
```typescript
const clients = new Set<(data: string) => void>();

export function broadcast(data: string): void {
  for (const write of clients) {
    try { write(data); } catch { clients.delete(write); }
  }
}
```

Ye basically:
1. Har connected browser ek function add karta hai `clients` set me
2. Live-trader jab bhi naya signal bhejta hai, `broadcast()` sabko bhej deta hai
3. Browser disconnect ho to `req.signal` abort listener use karke client remove ho jata hai

**Interview answer:** *"Broker (Upstox) se WebSocket feed aati hai kyunki wo full-duplex high-frequency data hai. Uske baad Node live-trader usse process karke signals generate karta hai, aur browser tak maine SSE use kiya kyunki signal push ek one-way stream hai — SSE simpler hai, auto-reconnect deta hai, aur plain HTTP me rehta hai. Client disconnect hone pe abort listener use karke client set se remove kar deta hai, taaki memory leak na ho."*

### Card 7 — Upstox WebSocket + protobuf (bonus depth)

Tumhara live-trader Upstox **WebSocket V3** se 5-minute candles stream karta hai:
- WebSocket handshake → auth token ke saath subscribe message
- Frames **protobuf-encoded** aate hain (binary) → `protobufjs` se decode
- SDK prototype patching ki thi connect reliability ke liye
- Reconnect logic: disconnect pe auto-retry with backoff

**Interview answer:** *"Live market data WebSocket se aata hai kyunki wo persistent bidirectional connection hai — HTTP polling me har 5 second naya request overhead hota. Upstox protobuf format me binary bhejta hai jo decode karna padta hai. Reconnect handling critical hai — network drop ho to auto-retry with backoff, warna live trading ruk jaati."*

### Card 8 — State Machines: paper trader ka dimaag

Tumhare live-trader me har stock ka apna **finite state machine** hai (11 states). Example:
- `IDLE` → entry signal aaya → `WATCHING`
- `WATCHING` → entry fill hui → `IN_POSITION`
- `IN_POSITION` → target/stop hit → `EXITED`

**Kyun state machine?** Real trading me ek stock ek hi time pe ek hi "phase" me hota hai. State machine ye enforce karta hai — double-entry nahi hogi, invalid transitions block ho jaate hain.

**Interview answer:** *"Live trading me har stock ko ek finite state machine me rakha — IDLE, WATCHING, IN_POSITION, EXITED. Ye ensure karta hai ki ek stock ek time pe ek hi phase me ho, double entry na ho, aur invalid state transitions block ho jayein. Position sizing aur exit rules bhi state ke hisaab se apply hote hain."*

---

## 4. Top 15 Python-Backend Interview Questions (model answers)

Yeh wahi hain jo fullstack interviews me TradeStack ke baare me poochhe jaate hain. Inka jawab **bol ke** practice karo.

### Q1. TradeStack ka backend kyun Python me hai, Node me kyun nahi?
**A:** Data-heavy computation (indicators, scanners) Python me hai kyunki pandas/numpy best-in-class hai iske liye — vectorized operations C-level pe chalti hain. Real-time streaming aur UI Node/Next me hai kyunki WebSocket event handling aur SSR JS me natural hai. Ye separation of concerns hai — har layer apne strength me.

### Q2. FastAPI vs Flask — kyun FastAPI?
**A:** FastAPI async support deta hai (Flask sync hai by default), Pydantic se automatic request/response validation aur type hints, aur auto-generated Swagger/OpenAPI docs. 48 endpoints likhne me Swagger free mil gaya — Flask me manually document karna padta.

### Q3. SQLite me kaise concurrent reads/writes handle karte ho?
**A:** WAL (Write-Ahead Logging) mode use kiya. Ye writer aur reader ko parallelize karta hai — writer changes pehle `-wal` file me likhta hai, main DB file readers ke liye consistent rehti hai. Isse Python service (writer) aur Node live-trader (reader) ek hi file pe kaam kar sakte hain bina block kiye.

### Q4. Kya SQLite production ke liye sahi hai?
**A:** TradeStack ek personal, single-user tool hai — isliye SQLite perfect hai (zero-config, no server). Multi-user ya high-write production system me Postgres jaata. Maine isliye `db.py` me DB path centralized rakha aur abstraction rakhi, taaki baad me Postgres pe migrate karna simple ho.

### Q5. pandas me indicators vectorize kaise karte ho?
**A:** `rolling(window=20).mean()` jaise operations use kiye. Pandas internally C-level pe loops chalata hai, isliye 2000 stocks ke saare rows pe math seconds me hota hai. Manual Python loop me wahi kaam minutes lega. RSI jaise complex indicators bhi `ewm()` ya manual vectorized formulas se banaye.

### Q6. Multiprocessing vs threading vs async — kab kya?
**A:** Rule of thumb:
- **CPU-bound** (indicator math, scanning) → `ProcessPoolExecutor` (multiprocessing). GIL threads ko parallel nahi hone deta.
- **I/O-bound** (network downloads, API calls) → `ThreadPoolExecutor` ya async. Threads me waits overlap hote hain.
- TradeStack me scanners `ProcessPoolExecutor`, bhavcopy downloader `ThreadPoolExecutor` use karta hai.

### Q7. WebSocket vs SSE — live data ke liye kya choose kiya?
**A:** Broker (Upstox) se WebSocket — full-duplex high-frequency binary (protobuf) data hai. Browser tak SSE — kyunki signal push one-way hai, SSE simpler hai, auto-reconnect deta hai, aur plain HTTP me rehta hai (proxy-friendly). WebSocket browser me bhi theek chalta lekin SSE ka setup simpler hai jab full-duplex zaroorat na ho.

### Q8. Pydantic kahan use hota hai aur kyun?
**A:** Request/response schemas ke liye. Example: `BatchHistoryRequest(symbols: list[str], days: int)`. FastAPI inhe padhke malformed input reject karta hai (422), response me field types enforce karta hai, aur Swagger docs me schema auto-generate hota hai. Isse mujhe manually validate karne ki zaroorat nahi parti.

### Q9. Cache kyu banaya, direct file read karte to?
**A:** Per-stock pickle cache (`data/cache/*.pkl`) me historical OHLCV store hai, saath me SQLite `cache_index` table me metadata (row count, first/last date, file size). Isse:
1. Indicator compute karte waqt file read fast hai (pickle = pandas native)
2. Cache index se list/stats query SQLite se instant hota hai (filesystem glob scan slow hota)
3. Har stock ka cache independently update hota hai

### Q10. Background task kaise handle karte ho?
**A:** FastAPI ka `BackgroundTasks` ya thread use karke background me operation chala dete hain. Operation ID generate karke `active_operations` dict me status rakh dete hain (`running`/`done`/`error` + logs). Frontend polling se status dekhta hai. Isse user ka request time out nahi hota.

### Q11. Reconnect/logging/error handling kaise kiya?
**A:** Central Python logging (console + file), har module me `logger = logging.getLogger(__name__)`. Scanners/operations me structured logs with timestamps. Background operations ka status stuck `"running"` na rahe — uske liye exception pe status update. Upstox WebSocket me reconnect with backoff.

### Q12. 47 hardcoded URLs refactor kyu kiya?
**A:** Solidify plan ke Phase 1 me — pehle 12-13 files me API URLs hardcoded the. Backend port change karne pe 47 jagah edit karne padte. Ek central `api.ts` banaya (`PY_API` env var se port read karta hai), typed `apiGet`/`apiPost` helpers, endpoint groups. Ab port ek jagah se change hota hai, aur TypeScript types bhi ek jagah defined hain (`lib/types.ts`).

### Q13. Python me async kahan use hota hai tumhare project me?
**A:** Honestly — FastAPI framework async hai (route handlers async context me chalti hain), lekin heavy computation (scanners) sync `ProcessPoolExecutor` me daali hai kyunki wo CPU-bound hai aur async se nahi, parallel processes se fast hoga. I/O-heavy parts (data fetch) threads me. Realistic hybrid approach.

### Q14. Testing kaise kiya?
**A:** Is project me abhi automated tests nahi hain — that's the gap I'm fixing (Phase 4 plan me pytest + Vitest). Currently health-check aur manual smoke test se verify karta hoon. Architecture pure functions hai (indicators, state machines) jahan unit tests easy add honge.

**Note:** Ye answer honestly dena — "abhi tests nahi hain, add kar raha hoon" > "haan fully tested hai" (jo follow-up me pakad lete hain).

### Q15. Is project ka sabse bada technical dard kya tha?
**A:** Upstox WebSocket V3 ka SDK prototype issues — SDK internally apne tarike se connect/reconnect karta tha jo kabhi kabhi stuck ho jata. Isko debug karna padha — SDK prototype patching se custom reconnect logic add kiya with backoff. Doosra — bhavcopy me gap-fill logic (missing trading days ke liye backfill), jo ab `fill_cache_gaps` se handle hota hai.

---

## 5. server.py Reading Map (3 din, 1.5h/day)

Ye tumhara **deep-dive plan** hai. Poora code padhne ki zaroorat nahi — structure samajhna hai.

### Day 1 — Skeleton + routes (1.5h)
- Top 60 lines padho: imports, `lifespan` (startup pe cache rebuild), `app = FastAPI(...)`, CORS middleware
- **Kaam:** Sab 48 route signatures ek baar list karo (path + method). Bas dekhna hai kaunsa endpoint kya karta hai — implementation nahi.
- Command: `grep '^@app\.' backend/server.py`

### Day 2 — Data layer (1.5h)
- `src/db.py` — SQLite schema (`cache_index`, `settings`, `upstox_config`, `stock_list_items`, trade log tables), thread-local connections
- `src/cache_manager.py` — pickle save/load, SQLite index fallback to glob
- `src/settings.py` — key-value settings with types/categories/validation
- **Samajhne ka point:** Data kahaan aata hai, kaise store hota hai, kaise retrieve hota hai.

### Day 3 — Scanners + breadth (1.5h)
- `src/indicators.py` — 13 indicators (SMA, RSI, EMA, MACD...)
- `src/scanner.py` — ContinuationScanner, ReversalScanner, `ProcessPoolExecutor` usage
- `src/market_breadth.py` — breadth calculation, `ProcessPoolExecutor`
- **Samajhne ka point:** Pure computation kaise parallel hota hai, indicators ka output kaise use hota hai.

### Bonus — Live trader (agar time bache, 1h)
- `frontend/src/app/api/live/route.ts` + `events/route.ts` — SSE broadcast
- `frontend/src/lib/` — Upstox WebSocket client, state machines
- **Samajhne ka point:** Python se Node side real-time data kaise jaati hai.

---

## 6. Kya SEEKHNA NAHI HAI (explicit out of scope)

Ye 3 hafte me **zarurat nahi hai** — resume/interview ke liye:

- ❌ Advanced asyncio (async generators, async context managers)
- ❌ FastAPI `Depends` dependency injection (advanced patterns)
- ❌ ORMs (SQLAlchemy) — tum raw `sqlite3` use karte ho, wo bhi theek hai
- ❌ Deep pandas time-series (rolling window internals)
- ❌ Celery/RQ task queues
- ❌ Kubernetes, cloud deployment (Docker bhi bonus hai, must nahi)

**Kyun:** Interview me "ye maine kiya, yeh seekha" bolne ka confidence chahiye — wo 15 ghante ke Defense Kit + TradeStack-Mini se aa jayega. Ye "out of scope" cheezein bolne se zyada risk hain (follow-up me atak jaoge).

---

## 7. Rehearsal Checklist (Week 3 se roz 15 min)

Har raat 19:30 slot me — ek question bol ke record karo:

- [ ] Q1: Backend Python me kyun, Node me kyun nahi
- [ ] Q3: SQLite WAL concurrency
- [ ] Q6: Multiprocessing vs threading vs async
- [ ] Q7: WebSocket vs SSE
- [ ] Q12: 47 URL refactor
- [ ] Q15: Sabse bada technical dard

Baaki concept cards Week 2 me ek baar padh lena kaafi hai.

---

**Related:** `COMEBACK-SPRINT-3-WEEKS.md` (din 13, 15-17 me ye file padhni hai) · TradeStack-Mini spec usi file me Section F.