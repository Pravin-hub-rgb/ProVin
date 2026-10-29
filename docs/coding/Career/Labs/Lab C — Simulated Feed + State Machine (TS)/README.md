# Lab C — Simulated Feed + State Machine (TypeScript)

> **Ground-floor practice — this is NOT a course module.** It's a bridge exercise that teaches you to recognize the shape of TradeStack's live-trading code.

## Why This Lab Exists

TradeStack's live-trading side (`TradeStack/frontend/src/lib/live-trader/streamer.ts`) uses WebSocket + protobuf + state machines. No existing course teaches this exact pattern. This lab rebuilds the **shape** in plain TypeScript so that when you read the real code in M6, it's recognition, not first contact.

## Prerequisites (learn these first)

| Concept | Source | Why |
|---|---|---|
| TypeScript types/interfaces | Any Node+TSC tutorial | You need types for interface shapes |
| `setInterval`/`clearInterval` | `React JS/Batch 2/2.1 useEffect Basics.md` | Timer + cleanup pattern |
| State machines via reducer | `React JS/Batch 5.5 useReducer` | `useReducer` IS a state machine |

## Work Through — 6 Files

| File | What You Build | Time |
|------|---------------|------|
| [`1.0 TypeScript Basics`](1.0%20TypeScript%20Basics.md) | Setup, types, interfaces, run `.ts` | 15 min |
| [`2.0 Timers & Event Loop`](2.0%20Timers%20and%20Event%20Loop.md) | Simulated ticks with `setInterval`, pause/resume | 15 min |
| [`3.0 useReducer = State Machine`](3.0%20useReducer%20equals%20State%20Machine.md) | 4-state position manager (idle → watching → in_position → exited) | 20 min |
| [`4.0 Build feed.ts`](4.0%20Build%20feed.ts.md) | EventEmitter feed module, tick + signal events | 20 min |
| [`5.0 Build machine.ts`](5.0%20Build%20machine.ts.md) | PositionManager class, transition validation | 25 min |
| [`6.0 Build index.ts + Explain`](6.0%20Build%20index.ts%20plus%20Explain.md) | Wire feed + machines, demo pause/resume + invalid transitions | 20 min |

## Done When

- [ ] Feed runs; per-symbol state changes print
- [ ] At least one invalid transition demonstrated (e.g., `watch()` when already `watching`)
- [ ] Pause → resume cycle works without process dying
- [ ] You can record a 90-second explanation with these two sentences:
  1. "One process, N subscriptions, callbacks per tick — the event loop is doing the concurrency."
  2. "The state machine guarantees a stock is in exactly one phase, so double entries can't happen."

## Skip-License

TypeScript tooling friction? Use plain JavaScript — rename `.ts` → `.js`, drop the types, run with `node index.js`. Same concepts.

## Bridge to Real TradeStack

`TradeStack/frontend/src/lib/live-trader/streamer.ts` — your `SimulatedFeed` becomes `WebSocket + protobuf`, your `PositionManager` becomes `continuation/state-machine.ts` (11 states). Same shape.

---

**Parent:** Back to `docs/coding/Career/README.md` → Step 4
