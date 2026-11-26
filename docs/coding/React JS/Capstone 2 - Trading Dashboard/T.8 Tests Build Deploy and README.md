# Capstone 2 — Trading Dashboard

## T.8 Tests, Build, Deploy and README

---

## Broader Goal — What We're Building Here

We add tests for the trading logic (P&L calculations, store actions, WebSocket hook), build the production bundle, and deploy to Vercel. By the end you'll have a tested, deployed trading dashboard with a professional README.

---

## Testing P&L Calculations

```ts
// src/store/__tests__/tradingStore.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { useTradingStore } from "../tradingStore";

describe("tradingStore", () => {
  beforeEach(() => {
    useTradingStore.setState({
      tickers: {},
      trades: [],
      positions: [],
      watchlist: [],
      alerts: [],
    });
  });

  it("calculates P&L correctly for a BUY trade", () => {
    // Simulate a price update
    useTradingStore.getState().updateTicker({
      symbol: "BTCUSDT",
      price: 50000,
      change24h: 2.5,
      volume24h: 1000,
    });

    // Buy 0.1 BTC at $50,000
    useTradingStore.getState().buy("BTCUSDT", 0.1);

    // Price goes up to $51,000
    useTradingStore.getState().updateTicker({
      symbol: "BTCUSDT",
      price: 51000,
      change24h: 4.5,
      volume24h: 1200,
    });

    const positions = useTradingStore.getState().positions;
    expect(positions).toHaveLength(1);
    expect(positions[0].pnl).toBeCloseTo(100, 1); // (51000-50000)*0.1 = 100
  });

  it("handles SELL trades (short position)", () => {
    useTradingStore.getState().updateTicker({
      symbol: "BTCUSDT",
      price: 50000,
      change24h: 0,
      volume24h: 1000,
    });

    useTradingStore.getState().sell("BTCUSDT", 0.1);

    useTradingStore.getState().updateTicker({
      symbol: "BTCUSDT",
      price: 49000,
      change24h: -2,
      volume24h: 900,
    });

    const positions = useTradingStore.getState().positions;
    expect(positions[0].pnl).toBeCloseTo(100, 1); // (50000-49000)*0.1 = 100
  });

  it("closes a position and realizes P&L", () => {
    useTradingStore.getState().updateTicker({
      symbol: "BTCUSDT",
      price: 50000,
      change24h: 0,
      volume24h: 1000,
    });
    useTradingStore.getState().buy("BTCUSDT", 0.1);

    useTradingStore.getState().updateTicker({
      symbol: "BTCUSDT",
      price: 51000,
      change24h: 2,
      volume24h: 1100,
    });
    useTradingStore.getState().closePosition("BTCUSDT");

    const trades = useTradingStore.getState().trades;
    const closedTrade = trades.find((t) => t.status === "CLOSED");
    expect(closedTrade?.pnl).toBeCloseTo(100, 1);
    expect(useTradingStore.getState().positions).toHaveLength(0);
  });

  it("prevents duplicate watchlist entries", () => {
    useTradingStore.getState().addToWatchlist("BTCUSDT");
    useTradingStore.getState().addToWatchlist("BTCUSDT");
    expect(useTradingStore.getState().watchlist).toHaveLength(1);
  });
});
```

**Why these tests matter:** P&L calculation is the core business logic. If it's wrong, users see wrong numbers. These tests verify: BUY P&L, SELL P&L, position closing, and watchlist dedup.

---

## Testing the WebSocket Hook

```ts
// src/hooks/__tests__/useBinanceWebSocket.test.ts
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useBinanceWebSocket } from "../useBinanceWebSocket";

describe("useBinanceWebSocket", () => {
  let mockWs: any;

  beforeEach(() => {
    mockWs = {
      onmessage: null,
      onclose: null,
      onerror: null,
      close: vi.fn(),
      send: vi.fn(),
    };
    vi.spyOn(globalThis, "WebSocket").mockImplementation(() => mockWs);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates a WebSocket connection on mount", () => {
    renderHook(() => useBinanceWebSocket(["BTCUSDT"]));
    expect(globalThis.WebSocket).toHaveBeenCalled();
  });

  it("updates store on price message", () => {
    const { unmount } = renderHook(() => useBinanceWebSocket(["BTCUSDT"]));

    // Simulate a WebSocket message
    mockWs.onmessage({
      data: JSON.stringify({
        s: "BTCUSDT",
        k: {
          t: 1700000000000,
          o: "50000",
          h: "50100",
          l: "49900",
          c: "50050",
          v: "100",
        },
      }),
    });

    // Check that store was updated (via mock)
    unmount();
  });
});
```

---

## Build and Deploy

```bash
# Build
bun run build

# Preview locally
bun run preview

# Deploy to Vercel
bunx vercel
```

**README template:**

```markdown
# Trading Dashboard

A real-time crypto trading dashboard built with React + TypeScript.
Paper trading with live P&L, candlestick charts, and technical indicators.

## Tech Stack
- React 19 + TypeScript
- Vite
- Zustand (state management)
- TradingView Lightweight Charts
- Tailwind CSS
- Vitest + React Testing Library

## Setup
bun install
bun run dev

## Scripts
- `bun run dev` — development server
- `bun run build` — production build
- `bun run preview` — test production build
- `bun run test` — run tests

## Features
- Live price feed via Binance WebSocket
- Candlestick charts with RSI, MACD, SMA indicators
- Paper trading with live P&L calculation
- Watchlist with real-time price updates
- Trade history with filters
- Dark/light theme
- 8 unit tests covering store logic and hooks

## Deployed At
[Live demo](https://your-app-name.vercel.app)
```

---

## In Your Own Words

1. Why mock the WebSocket in tests instead of connecting to the real Binance stream?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Real WebSocket connections make tests slow, flaky, and dependent on network. Mocking lets you control exactly what data arrives and when — you can simulate price updates, connection drops, and error states deterministically. Tests should be fast, isolated, and repeatable.

</details>

2. What's the difference between testing store logic vs component logic?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Store tests verify business logic (P&L calculation, trade creation, position closing) — fast, no rendering. Component tests verify UI behavior (button clicks, form submissions, what appears on screen) — slower, requires rendering. Best practice: test business logic in store tests, test user interactions in component tests. Don't test implementation details.

</details>

3. Why use `toBeCloseTo` instead of `toBe` for P&L assertions?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Floating-point math produces tiny precision errors (e.g., 0.1 + 0.2 = 0.30000000000000004). `toBe` checks exact equality and would fail. `toBeCloseTo` allows a small tolerance, which is correct for financial calculations where exact penny precision isn't always achievable with floating-point arithmetic.

</details>