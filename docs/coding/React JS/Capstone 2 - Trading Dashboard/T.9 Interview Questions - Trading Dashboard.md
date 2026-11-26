# Capstone 2 — Trading Dashboard

## T.9 Interview Questions — Trading Dashboard

---

## Broader Goal — What We're Building Here

Interview questions you might be asked about this project, with sample answers. These test whether you understand the decisions you made, not just the code you wrote.

---

## Questions

### 1. "How did you handle real-time data in your trading dashboard?"

**Sample Answer:** I used the Binance WebSocket API to stream live price data. The WebSocket connection is managed in a custom hook (`useBinanceWebSocket`) that opens a connection per symbol, parses incoming kline (candle) data, and pushes updates to a Zustand store. The store's selective subscriptions ensure only components that need price data re-render — the chart updates via `series.update()`, the ticker updates via store subscription, and the portfolio recalculates P&L on every tick. Auto-reconnect on disconnect with a 3-second delay.

### 2. "How did you implement live P&L calculation?"

**Sample Answer:** P&L is calculated in a `usePortfolio` hook using `useMemo`. For each open position, I compute `(currentPrice - avgEntryPrice) * quantity`. Average entry price is the weighted average of all open BUY/SELL trades for that symbol. The hook depends on `positions` and `tickers` from the store, so it only recalculates when prices or positions change — not on every render. `useMemo` prevents unnecessary CPU work since price ticks arrive every second.

### 3. "Why TradingView Lightweight Charts instead of Recharts or Chart.js?"

**Sample Answer:** TradingView Lightweight Charts is purpose-built for financial data — native candlestick series, built-in time scales, and `series.update()` for real-time tick updates. Recharts and Chart.js are general-purpose and would require custom work for candlesticks and live updates. TradingView is what actual trading platforms use, so it's the industry standard.

### 4. "How did you handle the candle update logic for live data?"

**Sample Answer:** The `appendCandle` function in the store checks if the new candle's timestamp matches the last candle's timestamp. If yes, it replaces the last candle in place (the current forming candle updates tick by tick). If no, it appends a new candle (a new minute started). This matches how candlestick charts work — the current candle's high/low/close update continuously, then a new one begins.

### 5. "What's the difference between `series.update()` and `series.setData()` in TradingView?"

**Sample Answer:** `setData()` replaces all data — O(n), re-renders the entire chart. `update()` is incremental — it checks the timestamp: if it matches the last candle, it updates it in place; if new, it appends. This is O(1), critical for real-time updates arriving every second. Using `setData()` on every tick would cause performance issues.

### 6. "How did you manage state for real-time data?"

**Sample Answer:** Zustand with selective subscriptions. Each component subscribes only to the slice it needs — `PriceTicker` subscribes to `tickers`, `TradePanel` subscribes to `selectedSymbol`. When a price tick arrives, only components that depend on prices re-render. This prevents unnecessary re-renders of the chart, trade panel, and watchlist on every tick. Zustand's `persist` middleware saves portfolio/watchlist to localStorage.

### 7. "How would you add a backend to this project?"

**Sample Answer:** I'd add a Node.js/Express backend with PostgreSQL. User auth (JWT), trade persistence (store trades in DB instead of localStorage), price history (cache candles), and watchlist sync across devices. The frontend would call REST APIs for CRUD operations and keep the WebSocket for live prices. The backend would handle rate limiting, data aggregation, and user-specific data isolation.

### 8. "What's the biggest performance concern with real-time data in React?"

**Sample Answer:** Re-rendering on every price tick. If the entire component tree re-renders on every WebSocket message (potentially 60+ times per second for liquid markets), the UI becomes sluggish. Solutions: selective subscriptions (Zustand), `useMemo` for expensive calculations (P&L), `series.update()` for incremental chart updates, and debouncing UI updates for non-critical components (watchlist can update every 500ms instead of every tick).

### 9. "How did you handle the auth flow?"

**Sample Answer:** Fake auth (like EMS) — hardcoded credentials in the store. Login sets `isAuthenticated` and `user` in Zustand (persisted to localStorage). `ProtectedRoute` component checks auth state and redirects to `/login` if not authenticated. Logout clears state and redirects. In a real app, this would be JWT-based with a backend, but for a frontend-only project, this demonstrates the auth flow pattern.

### 10. "What would you improve if you had more time?"

**Sample Answer:** (1) Add a backend (Node.js + PostgreSQL) for user accounts and persistent trade history. (2) Implement real order execution via a broker API (Alpaca, Binance). (3) Add more technical indicators (Bollinger Bands, Stochastic, Volume Profile). (4) Add a backtesting engine to test strategies on historical data. (5) Add WebSocket reconnection with exponential backoff. (6) Add unit tests for the P&L calculation engine and chart update logic.

---

## In Your Own Words

1. Why is real-time data handling harder than fetching data once?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Real-time data arrives continuously (every second or faster), requiring state updates on every tick. This means: (1) more frequent re-renders, (2) P&L must recalculate on every update, (3) charts must update incrementally (not full re-render), (4) memory management (don't store infinite candles), and (5) handling connection drops and reconnections. A fetch-once app doesn't have any of these concerns.

</details>

2. What's the difference between a REST API call and a WebSocket connection?

<details>
<summary>Show Answer</summary>

**Sample Answer:** REST is request-response: client asks, server answers, connection closes. WebSocket is persistent: client connects once, server pushes data continuously. REST is good for "get me this data" (trade history, user profile). WebSocket is good for "keep me updated" (live prices, order book). In this project, REST would be used for trade CRUD (if backend existed), WebSocket for live prices.

</details>

3. Why separate the chart library's DOM from React's DOM?

<details>
<summary>Show Answer</summary>

**Sample Answer:** TradingView Lightweight Charts is an imperative library — it creates its own DOM elements inside a container. React manages the surrounding UI (buttons, panels, layout), but the chart library manages its own internals (canvas, SVG, event handlers). Mixing them would cause conflicts — React might overwrite the chart's DOM, or the chart might interfere with React's reconciliation. The `useRef` + `useEffect` pattern bridges them: React provides the container, the chart library takes over its contents.

</details>