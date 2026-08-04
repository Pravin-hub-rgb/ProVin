---

## Abhi Tak Kya Hua

T.5 mein habits feature banaya — CRUD, check-in, streak. Ab **T.6 — Dashboard**: stats, charts (lazy), motivational quote via `useFetch<T>`, aur **Tailwind** styling.

Toh aisa scene hai...

---

## Coder Mindset — Dashboard Socho

Dashboard kya dikhaye? Senior thinking — **user ko "kaise kar rahe ho" ka quick overview chahiye:**

| Widget | Data |
|--------|------|
| **Stats cards** | Total habits, aaj kitne done, best streak |
| **Weekly chart** | Last 7 din ka completion rate |
| **Quote** | Motivational line (useFetch<T> — real API) |
| **Tasks preview** | Aaj ke pending tasks |

**Tailwind kyu ab?** Functional core (data, logic, routing) ready hai. Ab UI ko polish karte hain — **responsive + accessible** (Batch 4 skills). Tailwind se utility classes ki speed milti hai.

---

## Step 1 — Tailwind Setup (4.1.1 se yaad)

Project root mein run karo:

```bash
bun add -d tailwindcss @tailwindcss/postcss postcss
```

`postcss.config.js` banao (root folder mein — 4.1.1 mein seekha tha yeh galti common hai):

```js
// postcss.config.js — project ROOT folder mein (src/ mein nahi!)
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Aur `src/index.css` mein Tailwind import karo:

```css
/* src/index.css */
@import "tailwindcss";
```

**Dev server restart** karo — ab Tailwind utilities available hain (`bg-blue-500`, `text-white`, `p-4`, etc.).

---

## Step 2 — Stats Hooks (Derived Data)

Dashboard ke stats calculated hain — habits se derived. Custom hook banate hain — `src/hooks/useDashboardStats.ts`:

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

    // Best streak — sab habits ka max streak
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

    // Last 7 din ka completion rate (percent)
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

**`useMemo` kyu:** Derived data — habits/tasks/checkIns jab tak na badle, stats re-compute mat karo. Expensive loop (streak, weekRates) cache ho jaata hai. (Batch 5.2)

---

## Step 3 — Quote via useFetch<T>

T.3 ka `useFetch<T>` ab real use. Nayi file banao — `src/hooks/useQuote.ts`:

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

**Env var:** `.env` file banao (root):

```
# .env
VITE_QUOTE_API_URL=https://api.quotable.io/random
```

`import.meta.env.VITE_QUOTE_API_URL` — build time pe inject hoga (7.2/7.5 se yaad). `??` fallback — agar env set na ho toh default URL.

---

## Step 4 — Dashboard Page (with Tailwind)

Nayi file banao — `src/pages/Dashboard.tsx`:

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
        Namaste, {user?.name ?? "user"} 👋
      </h1>
      <p className="text-gray-500 mb-6">Aaj ka summary</p>

      {/* Quote — useFetch se */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded mb-6">
        {quoteLoading ? (
          <p className="text-indigo-700">⏳ Quote load ho raha hai...</p>
        ) : quoteError ? (
          <p className="text-red-600">Quote load nahi hui 😔</p>
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
        <StatCard label="Aaj Done" value={doneToday} />
        <StatCard label="Best Streak" value={`${bestStreak}🔥`} />
        <StatCard label="Pending Tasks" value={pendingTasks} />
      </div>

      {/* Weekly chart */}
      <div className="bg-white border rounded-lg p-4">
        <h2 className="font-semibold mb-4">Last 7 din — Completion %</h2>
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

**Tailwind classes kya kar rahi hain:**

| Class | Kya |
|-------|-----|
| `p-4 md:p-8` | Padding 4, desktop pe 8 — responsive (Batch 4) |
| `grid grid-cols-2 lg:grid-cols-4` | Mobile 2 columns, desktop 4 — responsive grid |
| `gap-4` | Grid items ke beech gap |
| `text-2xl font-bold` | Typography |
| `bg-indigo-50 border-l-4` | Quote card background + accent border |
| `h-32` + `style height %` | Bar chart heights — Tailwind + inline |

**Chart accessibility:** `aria-label` on each bar — `"08-04: 75% completed"` — screen reader user ko chart ka data milta hai (Batch 4 — charts accessible hone chahiye).

---

## Step 5 — Tailwind ke Saath Previous Pages Polish

Ab T.4/T.5 ke pages ko Tailwind classes se polish karte hain. Example — `src/pages/Habits.tsx` ka add-habit section:

```tsx
// src/pages/Habits.tsx (partial update — styling)
<div className="add-habit flex gap-2 mb-6">
  <input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Nayi habit..."
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

`focus:ring-2` — keyboard focus visible (accessibility). `hover:bg-blue-600` — hover state. **Tailwind utilities se styling fast aur consistent.**

---

## What T.6 Taught Us

1. **Tailwind setup** — postcss config root mein, `@import "tailwindcss"`
2. **Derived data via useMemo** — stats/streak/weekRates — cache
3. **useFetch<T> real use** — quote API, env var fallback, loading/error states
4. **Responsive grid** — `grid-cols-2 lg:grid-cols-4`, `p-4 md:p-8`
5. **Accessible charts** — `aria-label` on data visualization
6. **Focus/hover states** — `focus:ring`, `hover:bg` — accessible + polished

---

## So Here's the Takeaway

Dashboard ready — user ko quick overview, motivational quote, charts — sab Tailwind se styled, accessible. Ab agla step (T.7) — **Framer Motion animations + Error Boundary + security hygiene** — polish + safety.

---

## In Your Own Words

1. Tailwind setup mein `postcss.config.js` root folder mein kyu? (4.1.1 ka lesson)

<details>
<summary>Show Answer</summary>

**Sample Answer:** Vite root folder mein PostCSS config dhundhta hai — `src/` mein nahi. Agar config `src/` mein daalo, Vite use nahi karega aur Tailwind kaam nahi karega. Root folder mein `postcss.config.js` + `@import "tailwindcss"` in `index.css` — yehi complete setup. (Batch 4.1.1 mein yeh common galti highlighted thi — root folder mein rakhna.)

</details>

2. `useDashboardStats` mein `useMemo` kyon? Iske bina kya problem?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Stats derived data hai — habits, tasks, checkIns se calculate. `useMemo` dependencies (habits, checkIns, tasks) tab tak re-compute nahi karta jab tak wo change na ho. Iske bina har render pe saara loop (streak calc, weekRates) chalta — Dashboard ke heavy renders slow. `useMemo` expensive calculations cache karta hai (Batch 5.2) — sirf jab data actual change hua, recompute hota hai.

</details>

3. `useFetch<Quote>` dashboard pe — loading, error, success teen states kaise handle kiye?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Hook `{ data, isLoading, error }` return karta hai. UI mein conditional render — `quoteLoading` → "⏳ Quote load ho raha hai"; `quoteError` → "Quote load nahi hui"; `quote` present → blockquote + author. Ye tri-state pattern (6.2 se) — user ko har state mein kuch dikhta hai, blank screen nahi. Aur agar quote API fail ho, dashboard baaki widgets chalti hain — graceful degradation.

</details>

4. `import.meta.env.VITE_QUOTE_API_URL ?? "https://api.quotable.io/random"` — fallback kyu?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `??` nullish coalescing — agar env var set nahi hai (undefined/null), default URL use hota hai. Fayda: (a) development mein bina `.env` ke bhi kaam karta hai, (b) deploy pe agar env set karna bhool jao, app crash nahi, default URL pe chalta hai. Production mein `.env.production` se set karo, but fallback safety net hai — build kabhi fail nahi hoga bina env ke.

</details>

5. Charts/visualization accessible kaise bante hain? `aria-label` kya karta hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Visualization pure visual hai — screen reader user ko data nahi milta bina accessible alternative. Har bar pe `aria-label` (`"08-04: 75% completed"`) screen reader ko text data deta hai — "bar height se kya matlab" kisi ko bhi audio mein milta hai. Batch 4 ke rules: (a) color alone data convey na kare (b) text alternative do (aria-label/label), (c) keyboard accessible. Charts mein data ya toh aria-label se, ya asli table/lists se accessible banate hain.

</details>