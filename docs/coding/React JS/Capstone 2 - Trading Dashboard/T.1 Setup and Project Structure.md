# Capstone 2 — Trading Dashboard

---

## Where We Left Off — The Full Journey

All batches (1-7) are complete, plus Capstone 1 (TrackIt). Now a second capstone that pushes into **real-time data, financial calculations, and charting** — the kind of project that makes recruiters stop scrolling.

| Batch | What We Learned |
|-------|--------|
| **1** | JSX, Components, Props, State, Lists |
| **2** | Effects, API, Refs, Context |
| **3** | React Router, Protected Routes |
| **4** | Tailwind, Forms, Accessibility |
| **5** | Performance (memo, useCallback, lazy) |
| **6** | Custom Hooks, Generics, Zustand |
| **6.7** | Redux Toolkit — slices, store, typed hooks, redux-persist |
| **7** | Error Boundaries, Security, Testing, Deploy |
| **Capstone 1** | TrackIt — habit tracker (Redux Toolkit showcase) |

**Now, bringing it all together again — THE SECOND CAPSTONE: Trading Dashboard.** This becomes your **second main project for resume + portfolio**. So we'll treat it like a batch — our own folder, our own steps (T.1 through T.8), code **from scratch** (starting with `bunx`), with a coder mindset.

Here's the scene...

---

## Broader Goal — What is the Trading Dashboard

**Trading Dashboard** — a **crypto trading simulator with live prices**. Users watch real-time prices, build a watchlist, place paper trades (buy/sell), track their portfolio with live P&L, and view candlestick charts with technical indicators — all in the browser, no real money, no backend required.

**What we'll build in this project (combining all batches):**

| Concept | Batch | In Trading Dashboard |
|---------|-------|----------------------|
| Custom hooks + Generics | 6 | `useBinanceWebSocket<T>`, `useLocalStorage<T>`, `usePortfolio` |
| State management | 6 | Zustand — tickers, candles, trades, positions, watchlist, alerts |
| React Router | 3 | protected routes (dashboard, portfolio, history, settings) |
| Tailwind | 4 | responsive dashboard, dark/light theme |
| Performance | 5 | `useMemo` for P&L calc, `useCallback` for chart updates |
| Error Boundary | 7 | crash-proof (WebSocket failures, chart errors) |
| Security | 7 | env vars for API endpoints, safe rendering |
| Testing | 7 | Vitest + RTL on hooks and store |
| Deploy | 7 | Vercel + README |

**Data source decision (senior thinking):**
- **Core data** (portfolio, trades, watchlist, prefs, alerts) → Zustand + localStorage (persisted)
- **Live prices** → Binance WebSocket public stream (free, no API key, no backend needed)
- **Charts** → TradingView Lightweight Charts (free, professional-grade candlestick charts)
- Frontend app — no private secrets, just `VITE_` public values (none needed for Binance public API)

**Why this project is resume-worthy:**
- Real-time WebSocket data handling (not just REST fetch — shows you can handle streaming data)
- Charting library integration (TradingView — industry standard for financial apps)
- Financial calculations (P&L, returns, averages, position sizing — shows domain knowledge)
- Responsive dashboard layout (multi-panel, data-dense UI — shows CSS/Tailwind skill)
- State management for real-time data (frequent updates, performance-conscious — shows React depth)
- Testing real-time logic (mocking WebSocket, testing P&L calculations — shows engineering maturity)

---

## What the User Can Do (Complete Feature List)

### 1. Authentication (Fake, like EMS)
- Login page with hardcoded credentials (trader / admin)
- Protected routes — unauthenticated users redirect to `/login`
- Logout button in header
- Auth state persisted to localStorage (survives refresh)

### 2. Dashboard (Home Page — `/`)
- **Live price ticker** — BTC, ETH, SOL, BNB with real-time price + 24h % change
- **Watchlist panel** — add/remove symbols, live price + % change for each
- **Symbol selector** — switch between BTC/ETH/SOL/BNB
- **Candlestick chart** — live updating, multiple timeframes (1m, 5m, 15m, 1h, 1d)
- **Technical indicators** — toggle SMA(20), RSI(14), MACD on/off
- **Trade panel** — Buy/Sell with quantity input, live price preview, total cost
- **Dark/light theme toggle** — persisted to localStorage

### 3. Trading (Paper Mode)
- **Buy** — creates a paper trade at current price, adds to portfolio
- **Sell** — creates a short position at current price
- **Portfolio view** (`/portfolio`) — open positions with live P&L (recalculated on every tick)
  - Total value, total P&L, P&L %, best/worst trade cards
  - Position table: symbol, quantity, avg entry, current price, P&L, P&L %, close button
- **Close position** — realizes P&L, moves trade to history
- **Trade history** (`/history`) — table with filters (symbol, date, P&L)
  - Shows: symbol, side (BUY/SELL), entry price, quantity, P&L, status (OPEN/CLOSED), timestamp

### 4. Charts
- Candlestick chart with real-time updates via WebSocket
- Multiple timeframes: 1m, 5m, 15m, 1h, 1d
- Technical indicators toggle: SMA(20), RSI(14), MACD
- Chart resizes responsively
- Indicator overlays on main chart (SMA) + separate pane (RSI)

### 5. Price Alerts
- Set target price for a symbol (above or below)
- Browser notification when price hits target
- Alert list with enable/disable/remove
- Alerts persisted to localStorage

### 6. Portfolio Analytics
- Total portfolio value (sum of all open positions at current prices)
- Total P&L (realized + unrealized)
- Total P&L % (relative to total invested)
- Win rate (winning closed trades / total closed trades)
- Best trade / worst trade (by P&L)
- Number of open positions

### 7. Settings (`/settings`)
- Theme toggle (dark/light)
- Default symbol selection
- Alert preferences (sound on/off)
- Clear all data (reset localStorage)

---

## Tech Stack (Detailed)

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | React 19 + TypeScript | Type safety for financial data, better DX |
| **Build** | Vite | Fast HMR, optimized production builds |
| **Styling** | Tailwind CSS | Utility-first, responsive, dark mode built-in |
| **State** | Zustand + persist middleware | Lightweight, no boilerplate, localStorage sync |
| **Charts** | TradingView Lightweight Charts | Industry-standard, candlestick native, `series.update()` for real-time |
| **Real-time** | Binance WebSocket API | Free, no auth, public market data, WebSocket streaming |
| **Routing** | React Router v6 | Protected routes, nested layouts, lazy loading |
| **Testing** | Vitest + React Testing Library | Fast, Vite-native, component + hook + store tests |
| **Deploy** | Vercel | Free, auto-deploy from GitHub, instant preview |
| **Icons** | Lucide React (optional) | Clean, tree-shakeable icon set |

---

## Data Source — Binance Public API

**No API key needed. No rate limit issues for reasonable usage. No backend required.**

| Endpoint | URL | Purpose |
|----------|-----|---------|
| REST (historical candles) | `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100` | Load initial chart data |
| WebSocket (live candles) | `wss://stream.binance.com:9443/ws/btcusdt@kline_1m` | Real-time price + candle updates |
| 24h ticker | `https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT` | Price, % change, volume |

**Available symbols:** BTCUSDT, ETHUSDT, SOLUSDT, BNBUSDT, ADAUSDT, DOTUSDT, XRPUSDT, DOGEUSDT

---

## Project Structure

```
trading-dashboard/
├── src/
│   ├── components/
│   │   ├── Layout.tsx              # shared shell (header, sidebar, theme)
│   │   ├── PriceTicker.tsx         # live price list
│   │   ├── Watchlist.tsx           # watchlist panel
│   │   ├── TradePanel.tsx          # buy/sell form
│   │   ├── TradingChart.tsx        # TradingView chart
│   │   ├── ChartPanel.tsx          # chart + indicator toggles
│   │   └── __tests__/
│   │       └── *.test.tsx
│   ├── hooks/
│   │   ├── useBinanceWebSocket.ts  # WebSocket connection + reconnect
│   │   ├── useLocalStorage.ts      # typed localStorage hook
│   │   ├── usePortfolio.ts         # P&L calculations (useMemo)
│   │   └── usePriceAlerts.ts       # price alert checker
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Portfolio.tsx
│   │   ├── History.tsx
│   │   └── Settings.tsx
│   ├── store/
│   │   └── tradingStore.ts         # Zustand store with persist
│   ├── types/
│   │   └── trading.ts              # all TypeScript types
│   ├── utils/
│   │   └── indicators.ts           # SMA, RSI, MACD calculations
│   ├── App.tsx                     # router + protected routes
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## Prerequisites

- **Batches 1-7 complete** (especially Batch 6 for custom hooks + Zustand, Batch 7 for testing + deploy)
- **Batch 6.7 (Redux Toolkit) is optional** — we use Zustand for state (simpler for real-time data), but you can swap in RTK if you prefer
- No backend needed — everything runs client-side
- Node.js 18+ and npm/bun installed

---

## Tutorial — How It Works

Each step (T.1-T.8) is an isolated milestone:

1. **Each step gives you a runnable project** — every file's `// src/...` path, "create this file" guidance
2. **Coder mindset** — first imagine (problem), then code (solution)
3. **Each step ends with In Your Own Words** — understand in your own words
4. **Project in one folder** — `trading-dashboard/` — each step builds on that same folder

---

## In Your Own Words

1. What makes this project different from a typical CRUD app?

<details>
<summary>Show Answer</summary>

**Sample Answer:** A typical CRUD app fetches data once and displays it. This trading dashboard handles real-time streaming data (WebSocket), financial calculations (P&L, returns), charting library integration (TradingView), and state updates on every price tick — all without a backend. The complexity is in the frontend: managing high-frequency state updates, rendering charts efficiently, and calculating financial metrics in real-time.

</details>

2. Why use Zustand instead of Redux Toolkit for this project?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Zustand is simpler and has less boilerplate for a frontend-only project. Redux Toolkit is better for large apps with complex state logic and middleware. For a trading dashboard with real-time price updates, Zustand's minimal API and direct state access (no Provider wrapper needed) makes it faster to build. You can swap in RTK later — the slice pattern is the same.

</details>

3. Why TradingView Lightweight Charts instead of Recharts or Chart.js?

<details>
<summary>Show Answer</summary>

**Sample Answer:** TradingView Lightweight Charts is purpose-built for financial data — it has native candlestick, bar, and line series types, built-in time scales, and handles real-time updates via `series.update()`. Recharts and Chart.js are general-purpose charting libraries that would require custom work for candlesticks and real-time updates. TradingView is what actual trading platforms use.

</details>

4. How does this project demonstrate resume-worthy skills?

<details>
<summary>Show Answer</summary>

**Sample Answer:** (1) Real-time WebSocket data handling — shows you can work with streaming data, not just REST fetch. (2) Charting library integration — TradingView is industry-standard, shows you can learn and integrate complex libraries. (3) Financial calculations — P&L, returns, averages show domain knowledge. (4) Responsive dashboard layout — multi-panel, data-dense UI shows CSS/Tailwind skill. (5) State management for real-time data — frequent updates, performance-conscious (useMemo, selective subscriptions) shows React depth. (6) Testing — mocking WebSocket, testing P&L calculations shows engineering maturity.

</details>