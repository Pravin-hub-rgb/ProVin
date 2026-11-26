# Capstone 2 — Trading Dashboard

## T.7 Charts and Technical Indicators

---

## Broader Goal — What We're Building Here

We integrate TradingView Lightweight Charts for candlestick visualization with live updates, and add technical indicators (RSI, MACD, Moving Averages) as overlays. By the end you'll have a professional-grade trading chart that updates in real-time.

---

## Chart Component

```tsx
// src/components/TradingChart.tsx
import { useEffect, useRef } from "react";
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time } from "lightweight-charts";
import { useTradingStore } from "../store/tradingStore";
import type { Symbol, Candle } from "../types/trading";

interface Props {
  symbol: Symbol;
}

export default function TradingChart({ symbol }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const candles = useTradingStore((s) => s.candles[symbol] || []);
  const selectedSymbol = useTradingStore((s) => s.selectedSymbol);

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#1f2937" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "#374151" },
        horzLines: { color: "#374151" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderDownColor: "#ef4444",
      borderUpColor: "#22c55e",
      wickDownColor: "#ef4444",
      wickUpColor: "#22c55e",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  // Update data when candles change
  useEffect(() => {
    if (!seriesRef.current || candles.length === 0) return;
    const data: CandlestickData[] = candles.map((c) => ({
      time: c.time as Time,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));
    seriesRef.current.setData(data);
  }, [candles]);

  return <div ref={chartContainerRef} className="w-full" />;
}
```

**Key patterns:**
- `useRef` for the chart instance (imperative library, not declarative)
- Chart created once on mount, data updated via `setData()`
- Resize handler for responsive width
- Cleanup: `chart.remove()` on unmount

---

## Live Candle Updates

Instead of `setData()` (which replaces all data), use `series.update()` for live tick updates:

```ts
// In the WebSocket message handler:
const lastCandle = candles[candles.length - 1];
if (lastCandle && lastCandle.time === newCandle.time) {
  // Same candle — update in place
  seriesRef.current?.update(newCandle);
} else {
  // New candle — append
  seriesRef.current?.update(newCandle);
}
```

`series.update()` is smart — if the timestamp matches the last candle, it updates it; if it's new, it appends. This is how TradingView handles real-time data efficiently.

---

## Technical Indicators

### Simple Moving Average (SMA)

```ts
// src/utils/indicators.ts
export function calculateSMA(candles: Candle[], period: number): { time: number; value: number }[] {
  const result: { time: number; value: number }[] = [];
  for (let i = period - 1; i < candles.length; i++) {
    const sum = candles.slice(i - period + 1, i + 1).reduce((acc, c) => acc + c.close, 0);
    result.push({ time: candles[i].time, value: sum / period });
  }
  return result;
}
```

### RSI (Relative Strength Index)

```ts
export function calculateRSI(candles: Candle[], period: number = 14): { time: number; value: number }[] {
  const result: { time: number; value: number }[] = [];
  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = candles[i].close - candles[i - 1].close;
    if (change > 0) gains += change;
    else losses -= change;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period; i < candles.length; i++) {
    const change = candles[i].close - candles[i - 1].close;
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? -change : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const rsi = 100 - 100 / (1 + rs);
    result.push({ time: candles[i].time, value: rsi });
  }

  return result;
}
```

### Adding Indicators to Chart

```ts
// In TradingChart component, after creating the candlestick series:
const smaSeries = chart.addLineSeries({ color: "#f59e0b", lineWidth: 2 });
const smaData = calculateSMA(candles, 20);
smaSeries.setData(smaData);

// RSI on a separate pane
const rsiChart = createChart(rsiContainerRef.current, { ... });
const rsiSeries = rsiChart.addLineSeries({ color: "#8b5cf6", lineWidth: 2 });
const rsiData = calculateRSI(candles, 14);
rsiSeries.setData(rsiData);
```

---

## Chart + Indicators UI

```tsx
// src/components/ChartPanel.tsx
import { useState } from "react";
import TradingChart from "./TradingChart";

export default function ChartPanel() {
  const [showSMA, setShowSMA] = useState(true);
  const [showRSI, setShowRSI] = useState(false);
  const [timeframe, setTimeframe] = useState("1m");

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          {["1m", "5m", "15m", "1h", "1d"].map((tf) => (
            <button key={tf} onClick={() => setTimeframe(tf)}
              className={`px-2 py-1 rounded text-sm ${timeframe === tf ? "bg-blue-600" : "bg-gray-700"}`}>
              {tf}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowSMA(!showSMA)}
            className={`px-2 py-1 rounded text-sm ${showSMA ? "bg-yellow-600" : "bg-gray-700"}`}>
            SMA(20)
          </button>
          <button onClick={() => setShowRSI(!showRSI)}
            className={`px-2 py-1 rounded text-sm ${showRSI ? "bg-purple-600" : "bg-gray-700"}`}>
            RSI(14)
          </button>
        </div>
      </div>
      <TradingChart symbol={selectedSymbol} showSMA={showSMA} showRSI={showRSI} />
    </div>
  );
}
```

---

## In Your Own Words

1. Why use `series.update()` instead of `series.setData()` for live candles?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `setData()` replaces ALL data (re-renders entire chart). `update()` is incremental — it checks the timestamp: if it matches the last candle, it updates it in place; if new, it appends. This is O(1) instead of O(n), critical for real-time updates every second.

</details>

2. Why calculate indicators client-side instead of fetching pre-calculated values?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Client-side calculation gives instant updates — the indicator recalculates on every new candle without a network round-trip. It also works offline and doesn't depend on an external API. The trade-off is CPU usage, but for a few indicators on a few symbols, it's negligible.

</details>

3. What's the difference between a line series and a candlestick series in TradingView?

<details>
<summary>Show Answer</summary>

**Sample Answer:** A line series draws a single line connecting close prices — good for indicators (SMA, RSI). A candlestick series draws OHLC (open, high, low, close) bars — green for up (close > open), red for down (close < open). Candlesticks show price action within a period; lines show trends/indicators.

</details>