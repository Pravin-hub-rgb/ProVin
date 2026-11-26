# Capstone 2 — Trading Dashboard

## T.5 Trading Feature — Buy, Sell, Portfolio, P&L

---

## Broader Goal — What We're Building Here

We build the core trading functionality: buy/sell paper trades, portfolio with live P&L, trade history with filters, and close position. By the end you'll have a working paper trading system where P&L updates in real-time on every price tick.

---

## Buy / Sell Logic

```tsx
// src/components/TradePanel.tsx
import { useState } from "react";
import { useTradingStore } from "../store/tradingStore";
import type { Symbol } from "../types/trading";

export default function TradePanel() {
  const [symbol, setSymbol] = useState<Symbol>("BTCUSDT");
  const [quantity, setQuantity] = useState(0.01);
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const ticker = useTradingStore((s) => s.tickers[symbol]);
  const buy = useTradingStore((s) => s.buy);
  const sell = useTradingStore((s) => s.sell);

  const handleTrade = () => {
    if (side === "BUY") buy(symbol, quantity);
    else sell(symbol, quantity);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-4">Place Order</h3>
      <select value={symbol} onChange={(e) => setSymbol(e.target.value as Symbol)}
        className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600">
        <option value="BTCUSDT">BTC/USDT</option>
        <option value="ETHUSDT">ETH/USDT</option>
        <option value="SOLUSDT">SOL/USDT</option>
        <option value="BNBUSDT">BNB/USDT</option>
      </select>
      <div className="flex gap-2 mb-3">
        <button onClick={() => setSide("BUY")}
          className={`flex-1 p-2 rounded ${side === "BUY" ? "bg-green-600" : "bg-gray-700"}`}>
          Buy
        </button>
        <button onClick={() => setSide("SELL")}
          className={`flex-1 p-2 rounded ${side === "SELL" ? "bg-red-600" : "bg-gray-700"}`}>
          Sell
        </button>
      </div>
      <input type="number" value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))}
        step="0.01" min="0.01"
        className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600" />
      <div className="text-sm text-gray-400 mb-3">
        Price: ${ticker?.price?.toFixed(2) ?? "—"} |
        Total: ${((ticker?.price ?? 0) * quantity).toFixed(2)}
      </div>
      <button onClick={handleTrade}
        className={`w-full p-2 rounded font-bold ${side === "BUY" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}>
        {side} {symbol.replace("USDT", "")}
      </button>
    </div>
  );
}
```

---

## Portfolio View

```tsx
// src/pages/Portfolio.tsx
import { useTradingStore } from "../store/tradingStore";
import { usePortfolio } from "../hooks/usePortfolio";

export default function Portfolio() {
  const positions = useTradingStore((s) => s.positions);
  const closePosition = useTradingStore((s) => s.closePosition);
  const portfolio = usePortfolio();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Value</p>
          <p className="text-2xl font-bold">${portfolio.totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total P&L</p>
          <p className={`text-2xl font-bold ${portfolio.totalPnl >= 0 ? "text-green-500" : "text-red-500"}`}>
            ${portfolio.totalPnl.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">P&L %</p>
          <p className={`text-2xl font-bold ${portfolio.totalPnlPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
            {portfolio.totalPnlPercent.toFixed(2)}%
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Open Positions</p>
          <p className="text-2xl font-bold">{portfolio.positionCount}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">Symbol</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Avg Entry</th>
              <th className="p-3 text-left">Current Price</th>
              <th className="p-3 text-left">P&L</th>
              <th className="p-3 text-left">P&L %</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos) => (
              <tr key={pos.symbol} className="border-t border-gray-700">
                <td className="p-3 font-bold">{pos.symbol.replace("USDT", "")}</td>
                <td className="p-3">{pos.quantity.toFixed(4)}</td>
                <td className="p-3">${pos.avgEntryPrice.toFixed(2)}</td>
                <td className="p-3">${pos.currentPrice.toFixed(2)}</td>
                <td className={`p-3 ${pos.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                  ${pos.pnl.toFixed(2)}
                </td>
                <td className={`p-3 ${pos.pnlPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {pos.pnlPercent.toFixed(2)}%
                </td>
                <td className="p-3">
                  <button onClick={() => closePosition(pos.symbol)}
                    className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm">
                    Close
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {positions.length === 0 && (
          <p className="p-4 text-gray-400 text-center">No open positions. Place a trade to get started.</p>
        )}
      </div>
    </div>
  );
}
```

---

## Trade History

```tsx
// src/pages/History.tsx
import { useState } from "react";
import { useTradingStore } from "../store/tradingStore";

export default function History() {
  const trades = useTradingStore((s) => s.trades);
  const [filter, setFilter] = useState<string>("ALL");

  const filtered = filter === "ALL"
    ? trades
    : trades.filter((t) => t.symbol === filter);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trade History</h2>
      <div className="flex gap-2 mb-4">
        {["ALL", "BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded ${filter === s ? "bg-blue-600" : "bg-gray-700"}`}>
            {s === "ALL" ? "All" : s.replace("USDT", "")}
          </button>
        ))}
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">Symbol</th>
              <th className="p-3 text-left">Side</th>
              <th className="p-3 text-left">Entry Price</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">P&L</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((trade) => (
              <tr key={trade.id} className="border-t border-gray-700">
                <td className="p-3 font-bold">{trade.symbol.replace("USDT", "")}</td>
                <td className={`p-3 ${trade.side === "BUY" ? "text-green-500" : "text-red-500"}`}>
                  {trade.side}
                </td>
                <td className="p-3">${trade.entryPrice.toFixed(2)}</td>
                <td className="p-3">{trade.quantity.toFixed(4)}</td>
                <td className={`p-3 ${trade.pnl && trade.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {trade.pnl !== undefined ? `$${trade.pnl.toFixed(2)}` : "—"}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${trade.status === "OPEN" ? "bg-yellow-600" : "bg-gray-600"}`}>
                    {trade.status}
                  </span>
                </td>
                <td className="p-3 text-gray-400 text-sm">
                  {new Date(trade.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="p-4 text-gray-400 text-center">No trades yet.</p>
        )}
      </div>
    </div>
  );
}
```

---

## In Your Own Words

1. How does live P&L work in this app?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Every price tick from the WebSocket updates the ticker in the store. `recalculatePositions()` runs on every tick, recomputing `(currentPrice - avgEntryPrice) * quantity` for each open position. The portfolio view re-renders with updated P&L values. No manual refresh needed — it's reactive to the price stream.

</details>

2. Why is `useMemo` critical in the portfolio hook?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Portfolio calculation loops through all positions and recalculates P&L on every price tick (potentially every second). Without `useMemo`, this runs on every render — even when positions haven't changed (e.g., watchlist update). `useMemo` caches the result and only recalculates when `positions` or `tickers` change, preventing unnecessary CPU work and UI flicker.

</details>

3. What's the difference between open and closed trades?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Open trades have `status: "OPEN"` and are included in position calculations (live P&L). Closed trades have `status: "CLOSED"` with an `exitPrice` and realized `pnl` — they're removed from live P&L but shown in trade history. Closing a position locks in the P&L at the current price.

</details>