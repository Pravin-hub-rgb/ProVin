Picking up from the last file — T.1 through T.6 built TrackIt's full functional core: setup, stores, hooks, router, habits, dashboard, Tailwind styling. Now **T.7 — Polish + Safety**: Framer Motion animations, Error Boundary, and security hygiene.

So here's the situation...

---

## Coder Mindset — "It Works" Isn't Enough

The functional app is built. But a production-grade app needs three more things:

| Thing | What it does | Batch |
|-------|------|-------|
| **Animations** | Smooth transitions — UI feels alive | (new — Framer Motion) |
| **Error Boundary** | Crash-proofing — no white screen | 7.1 |
| **Security hygiene** | XSS, env vars, safe rendering | 7.2 |

**The order matters:** safety first (Error Boundary + security), then polish (animations). Without safety, the app can crash — animations won't matter. But we add both — production-grade is complete.

---

## Part 1 — Safety: Error Boundary

Apply 7.1's pattern — a class-based ErrorBoundary in TrackIt. Create new file — `src/components/ErrorBoundary.tsx`:

```tsx
// src/components/ErrorBoundary.tsx
import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("💥 TrackIt error:", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white border rounded-lg p-8 max-w-md text-center">
            <h1 className="text-2xl font-bold mb-2">Oops! 😅</h1>
            <p className="text-gray-600 mb-4">
              Something went wrong. Try refreshing — if the error persists, report it.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Recap from 7.1:**

| Thing | What it does |
|-------|------|
| `getDerivedStateFromError` | On error, updates state → fallback renders |
| `componentDidCatch` | Logs the error — integrates with error-tracking services |
| "Try again" button | `setState({ hasError: false })` — resets the boundary |

**Integrate in `main.tsx`** (wrap the entire app):

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
```

**And a feature-level boundary** (7.1's layered pattern) — in the Dashboard (risky — quote API data):

```tsx
// src/pages/Dashboard.tsx (partial — boundary around the risky widget)
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useQuote } from "../hooks/useQuote";

function QuoteWidget() {
  const { data: quote, isLoading, error } = useQuote();
  // ... quote rendering
  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
      {isLoading ? <p>⏳...</p> : error ? <p>Quote failed</p> : (
        <blockquote>"{quote?.content}"</blockquote>
      )}
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="p-4 md:p-8">
      <ErrorBoundary>
        <QuoteWidget />
      </ErrorBoundary>
      {/* ... rest of dashboard */}
    </div>
  );
}
```

**Layered:** Top-level boundary (prevents blank screens) + feature-level (if the quote widget crashes, only it falls back — the rest of the Dashboard stays live).

---

## Part 2 — Safety: Security Hygiene

Applying 7.2's principles to TrackIt:

### 1. Env vars — secrets with `VITE_` prefix

T.6 already had it: the `.env` file with `VITE_QUOTE_API_URL`. Remember:
- Only `VITE_`-prefixed values reach the client
- Never put private secrets (passwords, keys) in the frontend
- `.env` and `.env.production` — environment-specific

### 2. Trust React's default escaping

All user input is rendered with `{}` — React escapes by default:

```tsx
// ✅ Safe — React escapes
<h1>{user?.name ?? "friend"}</h1>
<p>{habit.title}</p>
```

TrackIt has no `dangerouslySetInnerHTML` — so sanitization (DOMPurify) isn't strictly needed. **But** `dompurify` was installed in T.1, and here's why:

```tsx
// src/lib/sanitize.ts
import DOMPurify from "dompurify";

// Ready pattern for any future rich-text content
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}
```

**Senior thinking:** Don't add complexity for its own sake. If you're not rendering raw HTML, sanitization is overkill. But have the helper ready — if you need it later, the path is clear.

### 3. Type safety

All API data is typed (`useFetch<Quote>`), forms are typed. TypeScript + React's escaping + (future) sanitization — that's **defense in depth** (7.2).

---

## Part 3 — Polish: Framer Motion

Now for animations. **Framer Motion** is the popular animation library for React. Core concepts:

| Thing | What it does |
|-------|------|
| `motion.div` | An animated element — `motion` works on any element |
| `initial` | Starting state (opacity 0, y: 20) |
| `animate` | Final state (opacity 1, y: 0) |
| `transition` | Duration, easing |
| `whileHover` / `whileTap` | Animation on hover/tap |

### HabitCard Animation

Update `src/components/habits/HabitCard.tsx`:

```tsx
// src/components/habits/HabitCard.tsx (update)
import { motion } from "framer-motion";
import { memo } from "react";
import type { Habit } from "../../types";
import { useHabits } from "../../hooks/useHabits";

interface HabitCardProps {
  habit: Habit;
}

export const HabitCard = memo(function HabitCard({ habit }: HabitCardProps) {
  const { today, isHabitDone, toggleCheckIn, getStreak, getHabitLast7Days } =
    useHabits();

  const doneToday = isHabitDone(today, habit.id);
  const streak = getStreak(habit.id);
  const last7 = getHabitLast7Days(habit.id);

  return (
    <motion.div
      className={`habit-card border rounded-lg p-4 ${doneToday ? "bg-green-50" : "bg-white"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl" aria-hidden="true">{habit.emoji}</span>
        <h3 className="font-semibold">{habit.title}</h3>
        <span className="text-sm text-orange-600">🔥 {streak}</span>
      </div>

      <div className="flex gap-1 my-3" aria-label="Last 7 days">
        {last7.map((done, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${done ? "bg-green-500" : "bg-gray-300"}`}
            aria-hidden="true"
          />
        ))}
      </div>

      <motion.button
        onClick={() => toggleCheckIn(today, habit.id)}
        aria-pressed={doneToday}
        className={`w-full py-2 rounded-lg ${
          doneToday
            ? "bg-green-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        whileTap={{ scale: 0.95 }}
      >
        {doneToday ? "✅ Done today" : "Check in"}
      </motion.button>
    </motion.div>
  );
});
```

**What animates:**

| Animation | What it does |
|-----------|------|
| `initial={{ opacity: 0, y: 20 }}` | Card starts transparent, 20px below |
| `animate={{ opacity: 1, y: 0 }}` | Fades in, rises up |
| `whileHover={{ scale: 1.03 }}` | Slight grow on hover |
| `whileTap={{ scale: 0.98 }}` | Slight shrink on tap — press feedback |
| `transition={{ duration: 0.2 }}` | Smooth 0.2s transition |

### Page Transitions

Page enter animation in `App.tsx` — a wrapper component:

```tsx
// src/components/PageTransition.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
```

Wrap routes in `App.tsx`:

```tsx
// src/App.tsx (partial — wrap pages)
<main>
  <Suspense fallback={<div className="loading">⏳ Loading...</div>}>
    <Routes>
      <Route path="/" element={<ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
      {/* ... same pattern for other routes ... */}
    </Routes>
  </Suspense>
</main>
```

---

## Balancing Animations and Accessibility

**Senior detail — animations + accessibility:**

- `whileHover` and `whileTap` are **enhancements** — the content doesn't depend on visual state
- Reduce motion for users who need it — `useReducedMotion`:

```tsx
// src/hooks/usePrefersReducedMotion.ts
import { useReducedMotion } from "framer-motion";

export function usePrefersReducedMotion() {
  return useReducedMotion();
}
```

If the user has "reduce motion" enabled in their OS, Framer Motion automatically respects it. Content is always visible — animation is never a substitute for content.

---

## What T.7 Taught Us

1. **Layered error boundaries** — top-level (blank screen prevention) + feature-level (quote widget)
2. **Security hygiene** — env vars, default escaping, type safety, ready sanitizer
3. **Framer Motion basics** — `initial`, `animate`, `whileHover`, `whileTap`, `transition`
4. **`motion.div`** — animate any element
5. **Reduced motion** — accessibility, OS preference respected
6. **Animations = polish, safety = priority**

---

## So Here's the Takeaway

TrackIt is now production-grade — crash-proof (error boundaries), safe (security hygiene), polished (animations). The final step (T.8) — **tests + build + deploy + README**. The last polish for your portfolio.

---

## In Your Own Words

1. Why place an error boundary at both the top level and the feature level — where does each go?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The top-level boundary (in `main.tsx`) wraps the entire app — no matter what unexpected crash happens, the user sees a fallback (the "Try again" button) instead of a blank white screen. The feature-level boundary (in Dashboard, around the quote widget) wraps a specific risky section — if the quote API's data causes a crash, only the quote widget falls back, and the rest of the Dashboard stays live. Layered = maximum safety + maximum isolation.

</details>

2. What do `initial`, `animate`, and `transition` each do in Framer Motion?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `initial` sets the element's starting state (e.g. `opacity: 0, y: 20` — transparent, 20px below). `animate` sets the final state (e.g. `opacity: 1, y: 0` — visible, at rest). `transition` controls the animation itself (e.g. `duration: 0.2` — how long to go from initial to animate). `whileHover` and `whileTap` are separate triggers — they add an animation on hover/tap.

</details>

3. We didn't use `dangerouslySetInnerHTML` in TrackIt — why was `dompurify` still installed?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because "not needed now" doesn't mean "never needed." Senior thinking: a `sanitizeHtml` helper is created and ready — if a future feature renders rich text (from a CMS or user HTML), the sanitizer is already there. Without it, you'd be tempted to use `dangerouslySetInnerHTML` directly — XSS risk. Having the helper ready means when you do need it, the safe path exists. Don't add dead complexity, but prepare for the future.

</details>

4. What is `useReducedMotion`, and why do animations matter for accessibility?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Some users experience motion sickness or migraines from animation — they enable "reduce motion" in their OS settings. `useReducedMotion` (from Framer Motion) tells you the user has this preference — and you reduce or disable animations. The principle: animation is an enhancement, not a substitute for content. If you remove all animations, the content should still be fully usable. This follows WCAG accessibility guidelines — respect the user's motion preference.

</details>

5. How is security hygiene applied in TrackIt? (3 things)

<details>
<summary>Show Answer</summary>

**Sample Answer:** (1) Env vars — secrets go in `.env` with `VITE_` prefix, only public URLs are exposed (just `VITE_QUOTE_API_URL`), private secrets never touch the frontend. (2) Default escaping — all user input renders with `{}`, React escapes HTML, no `dangerouslySetInnerHTML` used. (3) Type safety — API data is typed (`useFetch<Quote>`), forms are typed — defense in depth. Plus a ready sanitizer helper for future needs. These are the Batch 7 security principles, applied.

</details>
