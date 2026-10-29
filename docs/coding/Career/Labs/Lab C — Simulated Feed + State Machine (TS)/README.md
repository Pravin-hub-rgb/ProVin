# Lab C — Simulated Feed + State Machine (TypeScript)

> **Learn first:**
> - `React JS/Batch 2 - Effects, Data & Refs/2.1 useEffect Basics.md` → timers + cleanup (setInterval pattern)
> - `React JS/Batch 5 - Performance/5.5 useReducer — Complex State Management.md` → state machines via useReducer
>
> **Bridge ahead:** `TradeStack/frontend/src/lib/live-trader/streamer.ts` → real WebSocket + reconnect-with-backoff

## What This Is

This is **ground-floor practice**, not a course module. It exists because TradeStack's live-trading side uses event-driven feeds and state machines — but you won't learn WebSockets in the existing courses. This lab rebuilds the *shape* in TypeScript so that when you read the real `streamer.ts` in M6, it's recognition, not first contact.

**Why simulated?** No Upstox tokens needed. No network required. Just fake OHLC ticks pushed on a timer — you feel the disconnect/reconnect cycle, the per-symbol routing, and the state machine discipline that keeps double entries from happening.

## Build Specs (3 files, ~150 lines total)

### 1. `feed.ts` — Simulates live price ticks
```typescript
// Simulates 3-5 symbols pushing fake OHLC ticks
// Once per N ticks, a symbol emits a "signal" event
// Supports pause/resume (simulates disconnect/reconnect)
```

### 2. `machine.ts` — 4-state position manager
```
IDLE → WATCHING → IN_POSITION → EXITED
```
Table of allowed transitions. Invalid calls log "INVALID TRANSITION" instead of crashing.

### 3. `index.ts` — Orchestrates everything
Subscribe every symbol → route ticks through per-symbol machine → print readable state timeline.

## Done When

- [ ] Feed runs; per-symbol state changes print
- [ ] At least one invalid transition demonstrated
- [ ] One disconnect → resume cycle (process didn't die)
- [ ] 90-second explanation includes:
  - "One process, N subscriptions, callbacks per tick — the event loop does the concurrency"
  - "The state machine guarantees a stock is in exactly one phase, so double entries can't happen"

## Skip-License

If TypeScript tooling blocks you, use plain JavaScript — the concept is identical.

---

**Detailed build specs are in `docs/coding/Career/CAREER-FOCUS-PLAN.md` — Section D, M3.**
