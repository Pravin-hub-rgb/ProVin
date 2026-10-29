# Lab C — Simulated Feed + State Machine (TypeScript)

> **Ground-floor practice** — teaches you to recognize TradeStack's real `streamer.ts` pattern before reading it.

## Prerequisites Learn First

| Concept | Course File | Why |
|---------|-------------|-----|
| TypeScript types + tsx setup | Start with 1.0 below | Type safety, interfaces, running `.ts` |
| setInterval + clearInterval | `React JS/Batch 2/2.1 useEffect Basics.md` | Timer lifecycle, cleanup pattern |
| useReducer = state machine | `React JS/Batch 5.5 useReducer — Complex State Management.md` | Transition tables, validation |

## Files (Work Through In Order)

| # | Title | What You Learn |
|---|-------|----------------|
| 0.0 | Planning — What We're Building | Goals, symbols, data flow, bridge to TradeStack |
| 1.0 | Concept — Timers and setInterval | What timers are, cleanup, why store the ID |
| 1.1 | Syntax — Timer Setup in TypeScript | `setInterval`, `clearInterval`, `NodeJS.Timeout` type |
| 1.2 | Minimal Code — Basic Interval | First working timer with cleanup |
| 1.3 | Build Up — Typed Feed Module | OHLC type, price Map, symbol loop |
| 1.4 | Finalize — Pause/Stop Controls | Pause/resume simulation |
| 2.0 | Concept — State Machines | What Is/Is Not, transition tables, double entry |
| 2.1 | Syntax — Transition Tables | `Record<Status, Status[]>`, validation |
| 2.2 | Minimal Code — Simple State Machine | 2-state test version |
| 2.3 | Build Up — 4-State Position Machine | Full `PositionMachine` class |
| 2.4 | Testing — Verify Transitions | Test cases for valid/invalid paths |
| 3.0 | Concept — Event Emitters | Pub/Sub, loose coupling, EventEmitter |
| 3.1 | Syntax — EventEmitter in TypeScript | `extends EventEmitter`, typed emit/on |
| 3.2 | Minimal Code — Basic EventEmitter | Simple typed emitter |
| 3.3 | Build Up — Typed Feed Emitter | Full `SimulatedFeed` as EventEmitter |
| 4.0 | Concept — Per-Symbol Routing | Symbol-to-machine Map, routing logic |
| 4.1 | Syntax — Map-Based Subscription | `Map<string, PositionMachine>` |
| 4.2 | Minimal Code — Route Ticks to Machines | Full wiring demo |
| 5.0 | Concept — Disconnect/Reconnect | Why state must persist |
| 5.1 | Syntax — Pause Resume Implementation | `pause()` / `resume()` methods |
| 5.2 | Build Up — Full Pause Resume Demo | End-to-end pause/resume test |
| 6.0 | Final Assembly — index.ts | All components combined |
| 7.0 | Testing — Verify Everything | Test suite (double entry, invalid, routing) |
| 8.0 | Explain Out Loud — 90 Seconds | Script + key sentences for interviews |

## Done When

- [ ] All 23 files reviewed (skim plan, study 1.0-2.3, build 3.0-6.0, test 7.0)
- [ ] `npx tsx 6.0-final.ts` runs for 10 seconds without crash
- [ ] Invalid transitions rejected (not thrown)
- [ ] Pause/resume works, state persists
- [ ] 90-second explanation scripted and practiced

## Bridge — This Is TradeStack Code

`TradeStack/frontend/src/lib/live-trader/streamer.ts`:
- `extends EventEmitter` ✓
- `emit("tick", ohlc)` ✓
- `Map<string, SymbolHandler>` routing ✓
- `reconnect-with-backoff` = your pause/resume ✓

`continuation/state-machine.ts`:
- `ALLOWED_TRANSITIONS` table = your `ALLOWED_TRANSITIONS` ✓
- 11 states = your 4 states, more rows ✓
- `tryTransition()` validation = your `tryAction()` ✓

---

**Parent:** `docs/coding/Career/README.md` → Step 4
