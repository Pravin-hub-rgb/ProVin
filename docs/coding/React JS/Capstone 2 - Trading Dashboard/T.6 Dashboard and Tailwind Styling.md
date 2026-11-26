# Capstone 2 — Trading Dashboard

## T.6 Dashboard and Tailwind Styling

---

## Broader Goal — What We're Building Here

We build the main dashboard page: live price ticker, watchlist panel, portfolio summary cards, and trade panel — all responsive, dark/light themed. By the end you'll have a professional-looking trading dashboard.

---

## Dashboard Page

```tsx
// src/pages/Dashboard.tsx
import { useEffect } from "react";
import { useBinanceWebSocket } from "../hooks/useBinanceWebSocket";
import { useTradingStore } from "../store/tradingStore";
import { usePriceAlerts } from "../hooks/usePriceAlerts";
import type { Symbol } from "../types/trading";
import TradePanel from "../components/TradePanel";
import Watchlist from "../components/Watchlist";
import PriceTicker from "../components/PriceTicker";

const SYMBOLS: Symbol[] = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT"];

export default function Dashboard() {
  useBinanceWebSocket(SYMBOLS);
  usePriceAlerts();

  const tickers = useTradingStore((s) => s.tickers);
  const selectedSymbol = useTradingStore((s) => s.selectedSymbol);
  const selectSymbol = useTradingStore((s) => s.selectSymbol);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left: Price Ticker + Watchlist */}
      <div className="space-y-4">
        <PriceTicker symbols={SYMBOLS} />
        <Watchlist />
      </div>

      {/* Center: Chart + Trade Panel */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex gap-2 mb-3">
            {SYMBOLS.map((s) => (
              <button
                key={s}
                onClick={() => selectSymbol(s)}
                className={`px-3 py-1 rounded text-sm ${
                  selectedSymbol === s ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {s.replace("USDT", "")}
              </button>
            ))}
          </div>
          <div id="chart-container" className="h-96" />
        </div>
        <TradePanel />
      </div>
    </div>
  );
}
```

---

## Price Ticker Component

```tsx
// src/components/PriceTicker.tsx
import { useTradingStore } from "../store/tradingStore";
import type { Symbol } from "../types/trading";

export default function PriceTicker({ symbols }: { symbols: Symbol[] }) {
  const tickers = useTradingStore((s) => s.tickers);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3">Live Prices</h3>
      <div className="space-y-2">
        {symbols.map((symbol) => {
          const ticker = tickers[symbol];
          return (
            <div key={symbol} className="flex items-center justify-between p-2 rounded bg-gray-700">
              <span className="font-bold">{symbol.replace("USDT", "")}</span>
              <span className="font-mono">
                ${ticker?.price?.toFixed(2) ?? "—"}
              </span>
              <span className={`text-sm ${ticker && ticker.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {ticker ? `${ticker.change24h >= 0 ? "+" : ""}${ticker.change24h.toFixed(2)}%` : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

---

## Watchlist Component

```tsx
// src/components/Watchlist.tsx
import { useState } from "react";
import { useTradingStore } from "../store/tradingStore";
import type { Symbol } from "../types/trading";

const ALL_SYMBOLS: Symbol[] = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "ADAUSDT", "DOTUSDT"];

export default function Watchlist() {
  const watchlist = useTradingStore((s) => s.watchlist);
  const tickers = useTradingStore((s) => s.tickers);
  const addToWatchlist = useTradingStore((s) => s.addToWatchlist);
  const removeFromWatchlist = useTradingStore((s) => s.removeFromWatchlist);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">Watchlist</h3>
        <button onClick={() => setShowAdd(!showAdd)} className="text-blue-500 text-sm">
          + Add
        </button>
      </div>
      {showAdd && (
        <div className="flex flex-wrap gap-2 mb-3">
          {ALL_SYMBOLS.filter((s) => !watchlist.some((w) => w.symbol === s)).map((s) => (
            <button key={s} onClick={() => { addToWatchlist(s); setShowAdd(false); }}
              className="px-2 py-1 rounded bg-gray-700 text-sm hover:bg-gray-600">
              {s.replace("USDT", "")}
            </button>
          ))}
        </div>
      )}
      <div className="space-y-2">
        {watchlist.map((item) => {
          const ticker = tickers[item.symbol];
          return (
            <div key={item.symbol} className="flex items-center justify-between p-2 rounded bg-gray-700">
              <span className="font-bold">{item.symbol.replace("USDT", "")}</span>
              <span className="font-mono">${ticker?.price?.toFixed(2) ?? "—"}</span>
              <button onClick={() => removeFromWatchlist(item.symbol)} className="text-red-400 text-sm">
                ✕
              </button>
            </div>
          );
        })}
        {watchlist.length === 0 && (
          <p className="text-gray-400 text-sm text-center">No symbols in watchlist</p>
        )}
      </div>
    </div>
  );
}
```

---

## Tailwind Dark/Light Theme

The store already has `theme` and `toggleTheme`. Apply it at the root:

```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply transition-colors duration-200;
}
```

Theme is applied via conditional classes on the root div (see Layout component). The `theme` value is persisted to localStorage via Zustand's `persist` middleware.

---

## Responsive Layout

The dashboard uses Tailwind's grid system:
- Mobile: single column (`grid-cols-1`)
- Desktop: 3-column grid (`lg:grid-cols-3`)
- Chart takes 2 columns on desktop (`lg:col-span-2`)

---

## In Your Own Words

1. Why use Tailwind instead of CSS modules or styled-components?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Tailwind is utility-first — you compose styles directly in JSX with class names like `bg-gray-800 p-4 rounded-lg`. No separate CSS files, no class name conflicts, no context switching between files. For a dashboard with many small UI pieces, this is faster than CSS modules. Dark/light theme is just conditional class names.

</details>

2. How does the live price ticker update without full page re-render?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The WebSocket pushes price updates to the Zustand store. Zustand uses selective subscriptions — components only re-render when the specific slice they subscribe to changes. `PriceTicker` subscribes to `tickers`, so it re-renders when prices change, but `TradePanel` (which subscribes to `selectedSymbol`) doesn't re-render on price updates.

</details>

3. Why is the chart container a plain `div` with an `id` instead of a React component?

<details>
<summary>Show Answer</summary>

**Sample Answer:** TradingView Lightweight Charts is an imperative library — it creates its own DOM elements inside a container. You can't render it declaratively with JSX. So you give it a container `div` via `useRef`, and the chart library manages that DOM subtree. React handles the surrounding UI; the chart library handles its own internals.

</details>