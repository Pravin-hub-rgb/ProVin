# Capstone 2 — Trading Dashboard

## T.3 Custom Hooks

---

## Broader Goal — What We're Building Here

We build the custom hooks that power the trading dashboard: `useBinanceWebSocket` for live price streaming, `useLocalStorage` for persistence, and `usePortfolio` for P&L calculations. By the end you'll have reusable, typed hooks that handle real-time data.

---

## useBinanceWebSocket

```ts
// src/hooks/useBinanceWebSocket.ts
import { useEffect, useRef, useCallback } from "react";
import { useTradingStore } from "../store/tradingStore";
import type { Symbol, Ticker, Candle } from "../types/trading";

const BINANCE_WS = "wss://stream.binance.com:9443/ws";
const BINANCE_REST = "https://api.binance.com/api/v3";

export function useBinanceWebSocket(symbols: Symbol[]) {
  const wsRef = useRef<WebSocket | null>(null);
  const updateTicker = useTradingStore((s) => s.updateTicker);
  const appendCandle = useTradingStore((s) => s.appendCandle);

  const connect = useCallback(() => {
    const streams = symbols
      .map((s) => `${s.toLowerCase()}@kline_1m`)
      .join("/");
    const url = `${BINANCE_WS}/${streams}`;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const k = data.k; // kline data

      // Update ticker (current price)
      updateTicker({
        symbol: data.s as Symbol,
        price: parseFloat(k.c),
        change24h: 0, // fetched separately via REST
        volume24h: parseFloat(k.v),
      });

      // Append/update candle
      appendCandle(data.s as Symbol, {
        time: Math.floor(k.t / 1000),
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
        volume: parseFloat(k.v),
      });
    };

    ws.onclose = () => {
      // Reconnect after 3 seconds
      setTimeout(connect, 3000);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  }, [symbols, updateTicker, appendCandle]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);
}
```

**What this hook does:**
- Opens a WebSocket connection to Binance for each symbol
- On every message: updates the ticker (current price) and appends/updates the candle
- Auto-reconnects on disconnect (3 second delay)
- Cleanup on unmount (closes WebSocket)

---

## useLocalStorage

```ts
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? (JSON.parse(saved) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

---

## usePortfolio (P&L Calculations)

```ts
// src/hooks/usePortfolio.ts
import { useMemo } from "react";
import { useTradingStore } from "../store/tradingStore";

export function usePortfolio() {
  const positions = useTradingStore((s) => s.positions);
  const tickers = useTradingStore((s) => s.tickers);

  const portfolio = useMemo(() => {
    const totalValue = positions.reduce((sum, p) => sum + p.quantity * p.currentPrice, 0);
    const totalPnl = positions.reduce((sum, p) => sum + p.pnl, 0);
    const totalPnlPercent = totalValue > 0 ? (totalPnl / (totalValue - totalPnl)) * 100 : 0;

    const bestTrade = positions.reduce((best, p) =>
      p.pnl > (best?.pnl ?? -Infinity) ? p : best, positions[0] ?? null);

    const worstTrade = positions.reduce((worst, p) =>
      p.pnl < (worst?.pnl ?? Infinity) ? p : worst, positions[0] ?? null);

    return {
      totalValue,
      totalPnl,
      totalPnlPercent,
      bestTrade,
      worstTrade,
      positionCount: positions.length,
    };
  }, [positions, tickers]);

  return portfolio;
}
```

**Why `useMemo`:** P&L calculation loops through all positions. With real-time price updates every second, recalculating on every render would be wasteful. `useMemo` only recalculates when `positions` or `tickers` change.

---

## usePriceAlerts

```ts
// src/hooks/usePriceAlerts.ts
import { useEffect } from "react";
import { useTradingStore } from "../store/tradingStore";

export function usePriceAlerts() {
  const tickers = useTradingStore((s) => s.tickers);
  const alerts = useTradingStore((s) => s.alerts);
  const removeAlert = useTradingStore((s) => s.removeAlert);

  useEffect(() => {
    for (const alert of alerts) {
      if (alert.triggered) continue;
      const ticker = tickers[alert.symbol];
      if (!ticker) continue;

      const triggered =
        alert.direction === "ABOVE"
          ? ticker.price >= alert.targetPrice
          : ticker.price <= alert.targetPrice;

      if (triggered) {
        // Browser notification
        if (Notification.permission === "granted") {
          new Notification(`${alert.symbol} ${alert.direction === "ABOVE" ? "above" : "below"} ${alert.targetPrice}`, {
            body: `Current price: ${ticker.price}`,
          });
        }
        removeAlert(alert.id);
      }
    }
  }, [tickers, alerts, removeAlert]);
}
```

---

## In Your Own Words

1. Why does `useBinanceWebSocket` use `useRef` for the WebSocket instance?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `useRef` stores the WebSocket instance without triggering re-renders. The WebSocket is a mutable object that persists across renders — if we used `useState`, every message would cause a re-render. `useRef` gives us a stable reference to close/cleanup the connection on unmount.

</details>

2. Why `useMemo` for portfolio calculations?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Portfolio P&L loops through all positions and recalculates on every price tick (potentially every second). Without `useMemo`, this runs on every render — even when positions haven't changed. `useMemo` caches the result and only recalculates when `positions` or `tickers` change, preventing unnecessary CPU work.

</details>

3. How does the candle append logic handle live updates?

<details>
<summary>Show Answer</summary>

**Sample Answer:** It checks if the new candle has the same timestamp as the last one. If yes, it replaces the last candle (the current forming candle updates in place — high/low/close change). If no, it appends a new candle (a new minute started). This matches how candlestick charts work: the current candle updates tick by tick, then a new one starts.

</details>