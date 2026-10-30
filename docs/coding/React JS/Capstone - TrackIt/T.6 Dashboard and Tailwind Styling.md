Picking up from the last file — T.5 built the habits feature (CRUD, check-in, streaks). Now **T.6 — Dashboard**: stats, charts, motivational quote via `useFetch<T>`, and **Tailwind** styling.

So here's the situation...

---

## Coder Mindset — Think About the Dashboard

What should the Dashboard show? Senior thinking — the user needs a **quick overview of how they're doing**:

| Widget | Data |
|--------|------|
| **Stats cards** | Total habits, done today, best streak |
| **Weekly chart** | Completion rate for the last 7 days |
| **Quote** | A motivational line (`useFetch<T>` — real API) |
| **Tasks preview** | Today's pending tasks |

**Why Tailwind now?** The functional core (data, logic, routing) is ready. Now we polish the UI — **responsive + accessible** (Batch 4 skills). Tailwind gives you the speed of utility classes.

---

## Step 1 — Tailwind Setup (recap from 4.1.1)

Run in the project root:

```bash
bun add -d tailwindcss @tailwindcss/postcss postcss
```

Create `postcss.config.js` (in the root folder — a common mistake from 4.1.1, don't put it in `src/`):

```js
// postcss.config.js — in project ROOT (not src/)
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Then import Tailwind in `src/index.css`:

```css
/* src/index.css */
@import "tailwindcss";
```

**Restart the dev server** — Tailwind utilities are now available (`bg-blue-500`, `text-white`, `p-4`, etc.).

---

## Step 2 — Stats Hook (Derived Data)

Dashboard stats are derived from the habits store. Create a custom hook — `src/hooks/useDashboardStats.ts`:

```ts
// src/hooks/useDashboardStats.ts
import { useMemo } from "react";
import { useHabitsStore } from "../stores/habitsStore";
import { useTasksStore } from "../stores/tasksStore";

export function useDashboardStats() {
  const habits = useHabitsStore((s) => s.habits);
  const checkIns = useHabitsStore((s) => s.checkIns);
  const tasks = useTasksStore((s) => s.tasks);

  return useMemo(() => {
    const habitList = Object.values(habits);
    const today = new Date().toISOString().slice(0, 10);
    const todayCheckIns = checkIns[today] ?? {};

    const totalHabits = habitList.length;
    const doneToday = Object.values(todayCheckIns).filter(Boolean).length;

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter((t) => !t.completed).length;

    // Best streak — the max streak across all habits
    let bestStreak = 0;
    for (const habit of habitList) {
      let streak = 0;
      for (let i = 0; i < 60; i++) {
        const date = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
        const day = checkIns[date];
        if (day && day[habit.id]) streak++;
        else if (i > 0) break;
      }
      bestStreak = Math.max(bestStreak, streak);
    }

    // Last 7 days completion rate (percent)
    const weekRates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      const day = checkIns[date] ?? {};
      const total = Object.keys(day).length;
      const done = Object.values(day).filter(Boolean).length;
      weekRates.push({
        label: date.slice(5), // "MM-DD"
        rate: total === 0 ? 0 : Math.round((done / total) * 100),
      });
    }

    return { totalHabits, doneToday, totalTasks, pendingTasks, bestStreak, weekRates };
  }, [habits, checkIns, tasks]);
}
```

**Why `useMemo`:** Derived data — stats are computed from habits/tasks/checkIns. `useMemo` won't recompute unless the dependencies change. Expensive loops (streak calculation, week rates) get cached.

---

## Step 3 — Quote via useFetch\<T\>

Now we actually use `useFetch<T>` from T.3. Create new file — `src/hooks/useQuote.ts`:

```ts
// src/hooks/useQuote.ts
import { useFetch } from "./useFetch";
import type { Quote } from "../types";

const QUOTE_API_URL = import.meta.env.VITE_QUOTE_API_URL
  ?? "https://api.quotable.io/random";

export function useQuote() {
  return useFetch<Quote>(QUOTE_API_URL);
}
```

**Env var — ** create `.env` (in root):

```
# .env
VITE_QUOTE_API_URL=https://api.quotable.io/random
```

`import.meta.env.VITE_QUOTE_API_URL` — injected at build time. The `??` provides a fallback — if the env var isn't set, the default URL is used.

---

## Step 4 — Dashboard Page (with Tailwind)

Create new file — `src/pages/Dashboard.tsx`:

```tsx
// src/pages/Dashboard.tsx
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useQuote } from "../hooks/useQuote";
import { useAuthStore } from "../stores/authStore";

export function Dashboard() {
  const { totalHabits, doneToday, totalTasks, pendingTasks, bestStreak, weekRates } =
    useDashboardStats();
  const { data: quote, isLoading: quoteLoading, error: quoteError } = useQuote();
  const user = useAuthStore((s) => s.user);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-1">
        Hello, {user?.name ?? "friend"} 👋
      </h1>
      <p className="text-gray-500 mb-6">Today's summary</p>

      {/* Quote — from useFetch */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded mb-6">
        {quoteLoading ? (
          <p className="text-indigo-700">⏳ Loading quote...</p>
        ) : quoteError ? (
          <p className="text-red-600">Quote failed to load 😔</p>
        ) : quote ? (
          <>
            <blockquote className="text-indigo-900 italic">
              "{quote.content}"
            </blockquote>
            <footer className="text-indigo-600 mt-1">— {quote.author}</footer>
          </>
        ) : null}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Habits" value={totalHabits} />
        <StatCard label="Done Today" value={doneToday} />
        <StatCard label="Best Streak" value={`${bestStreak}🔥`} />
        <StatCard label="Pending Tasks" value={pendingTasks} />
      </div>

      {/* Weekly chart */}
      <div className="bg-white border rounded-lg p-4">
        <h2 className="font-semibold mb-4">Last 7 days — Completion %</h2>
        <div className="flex items-end gap-2 h-32">
          {weekRates.map((w) => (
            <div key={w.label} className="flex flex-col items-center flex-1">
              <span className="text-xs text-gray-600">{w.rate}%</span>
              <div
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${Math.max(w.rate, 4)}%` }}
                aria-label={`${w.label}: ${w.rate}% completed`}
              />
              <span className="text-xs text-gray-500 mt-1">{w.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white border rounded-lg p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
```

**Tailwind classes in action:**

| Class | What it does |
|-------|------|
| `p-4 md:p-8` | Padding 4, on desktop 8 — responsive spacing |
| `grid grid-cols-2 lg:grid-cols-4` | 2 columns on mobile, 4 on desktop — responsive grid |
| `gap-4` | Gap between grid items |
| `text-2xl font-bold` | Typography |
| `bg-indigo-50 border-l-4` | Quote card background + accent border |
| `h-32` + `style height %` | Bar chart heights — Tailwind + inline styles |

**Accessibility for charts:** `aria-label` on each bar — `"08-04: 75% completed"` — screen reader users get the data.

---

## Step 5 — Adding Tailwind to Previous Pages

Now add Tailwind classes to the pages from T.4/T.5. Example — the add-habit section in `src/pages/Habits.tsx`:

```tsx
// src/pages/Habits.tsx (partial update — styling)
<div className="add-habit flex gap-2 mb-6">
  <input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="New habit..."
    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    onClick={handleAdd}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
  >
    Add
  </button>
</div>
```

`focus:ring-2` — visible keyboard focus (accessibility). `hover:bg-blue-600` — hover state. **Tailwind utilities make styling fast and consistent.**

---

## What T.6 Taught Us

1. **Tailwind setup** — postcss config in root, `@import "tailwindcss"`
2. **Derived data with `useMemo`** — stats, streaks, week rates — cached
3. **`useFetch<T>` in real use** — quote API, env var fallback, loading/error states
4. **Responsive grid** — `grid-cols-2 lg:grid-cols-4`, `p-4 md:p-8`
5. **Accessible charts** — `aria-label` on data visualization
6. **Focus/hover states** — `focus:ring`, `hover:bg` — accessible + polished

---

## So Here's the Takeaway

The Dashboard is ready — the user gets a quick overview, a motivational quote, and charts — all styled with Tailwind, accessible. Next step (T.7) — **Framer Motion animations + Error Boundary + security hygiene** — polish and safety.

---

## In Your Own Words

1. Why does the `postcss.config.js` go in the root folder? (Lesson from 4.1.1)

<details>
<summary>Show Answer</summary>

**Sample Answer:** Vite looks for PostCSS config in the root folder — not in `src/`. If you put the config in `src/`, Vite won't use it and Tailwind won't work. The complete setup is: `postcss.config.js` in the root folder, plus `@import "tailwindcss"` in `src/index.css`. (In 4.1.1, this was highlighted as a common mistake — keep the config in the root.)

</details>

2. Why use `useMemo` in `useDashboardStats`? What happens without it?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Stats are derived data — calculated from habits, tasks, and checkIns. `useMemo` recomputes only when those dependencies change. Without it, the entire calculation (streak loops, week rates) runs on every render — slowing down the Dashboard. `useMemo` caches the expensive calculations — recalculated only when the data actually changes.

</details>

3. How does `useFetch<Quote>` handle loading, error, and success states on the Dashboard?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The hook returns `{ data, isLoading, error }`. The UI uses conditional rendering — `quoteLoading` shows "Loading quote...", `quoteError` shows "Quote failed to load", and `quote` present shows the blockquote + author. This tri-state pattern means the user always sees something — never a blank screen. And if the quote API fails, the rest of the Dashboard keeps working — graceful degradation.

</details>

4. Why the `??` fallback on `import.meta.env.VITE_QUOTE_API_URL`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The `??` (nullish coalescing) operator uses the default URL when the env var isn't set (undefined/null). Benefits: (a) works in development even without a `.env` file; (b) if you forget to set the env var during deployment, the app still works with the default URL instead of crashing. Production should use `.env.production`, but the fallback is a safety net.

</details>

5. How do you make data visualizations (charts) accessible? What does `aria-label` do?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Visualizations are purely visual — without an accessible alternative, screen reader users get no data. Put `aria-label` on each bar — like `"08-04: 75% completed"` — so screen reader users hear the data as audio. Following Batch 4's rules: (a) don't rely on color alone to convey data; (b) provide text alternatives (`aria-label` or `<label>`); (c) keep it keyboard accessible. Charts expose their data either through `aria-label` or through actual tables/lists for accessibility.

</details>
