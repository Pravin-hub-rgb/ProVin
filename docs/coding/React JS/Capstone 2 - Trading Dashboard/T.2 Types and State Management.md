# Capstone 2 — Trading Dashboard

## T.2 Types and State Management

---

## Broader Goal — What We're Building Here

We define TypeScript types for all trading data (prices, trades, portfolio, watchlist) and set up a Zustand store that holds all app state. By the end you'll have a typed store with live price updates, trade actions, and portfolio calculations.

---

## Types

```ts
// src/types/trading.ts

export type Symbol = "BTCUSDT" | "ETHUSDT" | "SOLUSDT" | "BNBUSDT";

export interface Ticker {
  symbol: Symbol;
  price: number;
  change24h: number;
  volume24h: number;
}

export interface Candle {
  time: number;       // unix timestamp (seconds)
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Trade {
  id: string;
  symbol: Symbol;
  side: "BUY" | "SELL";
  entryPrice: number;
  quantity: number;
  timestamp: number;
  status: "OPEN" | "CLOSED";
  exitPrice?: number;
  pnl?: number;
}

export interface Position {
  symbol: Symbol;
  quantity: number;
  avgEntryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

export interface WatchlistItem {
  symbol: Symbol;
  addedAt: number;
}

export interface PriceAlert {
  id: string;
  symbol: Symbol;
  targetPrice: number;
  direction: "ABOVE" | "BELOW";
  triggered: boolean;
}
```

---

## Zustand Store

```ts
// src/store/tradingStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Ticker, Candle, Trade, Position, WatchlistItem, PriceAlert, Symbol } from "../types/trading";

interface TradingState {
  // Prices
  tickers: Record<Symbol, Ticker>;
  candles: Record<Symbol, Candle[]>;
  selectedSymbol: Symbol;

  // Portfolio
  trades: Trade[];
  positions: Position[];

  // Watchlist
  watchlist: WatchlistItem[];

  // Alerts
  alerts: PriceAlert[];

  // Theme
  theme: "dark" | "light";

  // Actions
  updateTicker: (ticker: Ticker) => void;
  updateCandles: (symbol: Symbol, candles: Candle[]) => void;
  appendCandle: (symbol: Symbol, candle: Candle) => void;
  selectSymbol: (symbol: Symbol) => void;
  buy: (symbol: Symbol, quantity: number) => void;
  sell: (symbol: Symbol, quantity: number) => void;
  closePosition: (symbol: Symbol) => void;
  addToWatchlist: (symbol: Symbol) => void;
  removeFromWatchlist: (symbol: Symbol) => void;
  addAlert: (alert: Omit<PriceAlert, "id" | "triggered">) => void;
  removeAlert: (id: string) => void;
  toggleTheme: () => void;
}

export const useTradingStore = create<TradingState>()(
  persist(
    (set, get) => ({
      tickers: {} as Record<Symbol, Ticker>,
      candles: {} as Record<Symbol, Candle[]>,
      selectedSymbol: "BTCUSDT",
      trades: [],
      positions: [],
      watchlist: [],
      alerts: [],
      theme: "dark",

      updateTicker: (ticker) =>
        set((state) => ({
          tickers: { ...state.tickers, [ticker.symbol]: ticker },
        })),

      updateCandles: (symbol, candles) =>
        set((state) => ({
          candles: { ...state.candles, [symbol]: candles },
        })),

      appendCandle: (symbol, candle) =>
        set((state) => {
          const existing = state.candles[symbol] || [];
          const last = existing[existing.length - 1];
          // If same timestamp, update the last candle; otherwise append
          if (last && last.time === candle.time) {
            existing[existing.length - 1] = candle;
            return { candles: { ...state.candles, [symbol]: [...existing] } };
          }
          return { candles: { ...state.candles, [symbol]: [...existing, candle] } };
        }),

      selectSymbol: (symbol) => set({ selectedSymbol: symbol }),

      buy: (symbol, quantity) => {
        const ticker = get().tickers[symbol];
        if (!ticker) return;
        const trade: Trade = {
          id: crypto.randomUUID(),
          symbol,
          side: "BUY",
          entryPrice: ticker.price,
          quantity,
          timestamp: Date.now(),
          status: "OPEN",
        };
        set((state) => ({ trades: [trade, ...state.trades] }));
        get().recalculatePositions();
      },

      sell: (symbol, quantity) => {
        const ticker = get().tickers[symbol];
        if (!ticker) return;
        const trade: Trade = {
          id: crypto.randomUUID(),
          symbol,
          side: "SELL",
          entryPrice: ticker.price,
          quantity,
          timestamp: Date.now(),
          status: "OPEN",
        };
        set((state) => ({ trades: [trade, ...state.trades] }));
        get().recalculatePositions();
      },

      closePosition: (symbol) => {
        set((state) => ({
          trades: state.trades.map((t) =>
            t.symbol === symbol && t.status === "OPEN"
              ? { ...t, status: "CLOSED", exitPrice: state.tickers[symbol]?.price, pnl: calculatePnl(t, state.tickers[symbol]?.price || t.entryPrice) }
              : t
          ),
        }));
        get().recalculatePositions();
      },

      addToWatchlist: (symbol) =>
        set((state) => {
          if (state.watchlist.some((w) => w.symbol === symbol)) return state;
          return { watchlist: [...state.watchlist, { symbol, addedAt: Date.now() }] };
        }),

      removeFromWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.filter((w) => w.symbol !== symbol),
        })),

      addAlert: (alert) =>
        set((state) => ({
          alerts: [...state.alerts, { ...alert, id: crypto.randomUUID(), triggered: false }],
        })),

      removeAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((a) => a.id !== id),
        })),

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),

      recalculatePositions: () => {
        const { trades, tickers } = get();
        const openTrades = trades.filter((t) => t.status === "OPEN");
        const symbolMap = new Map<string, { qty: number; cost: number }>();

        for (const trade of openTrades) {
          const entry = symbolMap.get(trade.symbol) || { qty: 0, cost: 0 };
          const qtyChange = trade.side === "BUY" ? trade.quantity : -trade.quantity;
          entry.qty += qtyChange;
          entry.cost += qtyChange * trade.entryPrice;
          symbolMap.set(trade.symbol, entry);
        }

        const positions: Position[] = [];
        for (const [symbol, { qty, cost }] of symbolMap) {
          if (qty === 0) continue;
          const currentPrice = tickers[symbol as Symbol]?.price || 0;
          const avgEntry = Math.abs(cost / qty);
          const pnl = (currentPrice - avgEntry) * qty;
          const pnlPercent = avgEntry > 0 ? ((currentPrice - avgEntry) / avgEntry) * 100 : 0;
          positions.push({
            symbol: symbol as Symbol,
            quantity: qty,
            avgEntryPrice: avgEntry,
            currentPrice,
            pnl,
            pnlPercent,
          });
        }
        set({ positions });
      },
    }),
    { name: "trading-dashboard" }
  )
);

function calculatePnl(trade: Trade, exitPrice: number): number {
  const qty = trade.side === "BUY" ? trade.quantity : -trade.quantity;
  return (exitPrice - trade.entryPrice) * qty;
}
```

---

## In Your Own Words

1. Why use `persist` middleware in Zustand for this project?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `persist` saves the store to localStorage automatically. Portfolio, watchlist, trades, and theme survive page refreshes. Without it, all data is lost on refresh — unacceptable for a trading app where you need to see your positions after reopening.

</details>

2. How does `appendCandle` handle live candle updates?

<details>
<summary>Show Answer</summary>

**Sample Answer:** It checks if the new candle has the same timestamp as the last one. If yes, it replaces the last candle (the current forming candle updates in place). If no, it appends a new candle. This matches how candlestick charts work — the current candle updates tick by tick, then a new one starts.

</details>

3. How is P&L calculated for a position?

<details>
<summary>Show Answer</summary>

**Sample Answer:** For each symbol, sum all open BUY/SELL trades to get net quantity and average entry price. Then P&L = (currentPrice - avgEntryPrice) * quantity. P&L% = ((currentPrice - avgEntryPrice) / avgEntryPrice) * 100. This recalculates on every price tick via `recalculatePositions()`.

</details>