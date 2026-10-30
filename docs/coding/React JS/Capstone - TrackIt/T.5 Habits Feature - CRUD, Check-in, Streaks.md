Picking up from the last file — T.4 built the router (protected routes, lazy loading, login flow). Now **T.5 — Habits Feature**: CRUD, daily check-in, streak logic. This is the app's core feature.

So here's the situation...

---

## Coder Mindset — Think About the Habits Feature

What should the Habits page have?

| Feature | What it does |
|---------|------|
| **Habit list** | Show all habits — title, emoji, current streak |
| **Add habit** | Form to create a new habit |
| **Check-in** | Toggle today's habit done/not-done |
| **Streak** | How many consecutive days the habit was done |
| **Delete/Edit** | Remove or update a habit |

**Streak logic — senior thinking:** What is a streak? **Consecutive days** the habit was done, counting back from today. If today isn't done, how do we count? Two approaches:

1. **Strict:** If today isn't done, streak resets to 0
2. **Grace:** If today isn't done, yesterday's streak still shows (streak is "living" — today's slot is still open)

Real habit apps (Duolingo, Habitica) use a grace period. We keep it simple: **streak = consecutive done days counting back from today** — if today isn't done, streak is 0.

---

## Step 1 — useHabits Custom Hook

Wrap all habit logic in a hook — streak calculation, date helpers. Create new file — `src/hooks/useHabits.ts`:

```ts
// src/hooks/useHabits.ts
import { useMemo } from "react";
import { useHabitsStore } from "../stores/habitsStore";

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10); // "2026-08-04"
}

function getLastNDays(n: number): string[] {
  const dates: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(formatDate(d));
  }
  return dates;
}

export function useHabits() {
  const habits = useHabitsStore((s) => s.habits);
  const checkIns = useHabitsStore((s) => s.checkIns);
  const addHabit = useHabitsStore((s) => s.addHabit);
  const updateHabit = useHabitsStore((s) => s.updateHabit);
  const deleteHabit = useHabitsStore((s) => s.deleteHabit);
  const toggleCheckIn = useHabitsStore((s) => s.toggleCheckIn);
  const isHabitDone = useHabitsStore((s) => s.isHabitDone);
  const getCheckInCount = useHabitsStore((s) => s.getCheckInCount);

  const today = formatDate(new Date());
  const last7Days = useMemo(() => getLastNDays(7), []);

  // A habit's streak — consecutive done days counting back from today
  function getStreak(habitId: string): number {
    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const date = formatDate(new Date(Date.now() - i * 86400000));
      const day = checkIns[date];
      if (day && day[habitId]) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  }

  // A habit's check-in status for last 7 days
  function getHabitLast7Days(habitId: string): boolean[] {
    return last7Days.map((date) => {
      const day = checkIns[date];
      return day ? Boolean(day[habitId]) : false;
    });
  }

  return {
    habits,
    checkIns,
    today,
    last7Days,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCheckIn,
    isHabitDone,
    getCheckInCount,
    getStreak,
    getHabitLast7Days,
  };
}
```

**Streak function logic:**

```
for i = 0..59 (check up to 60 days back):
    date = today - i days
    if that date's habit was done:
        streak++
    else if i > 0:
        break     ← today skipped = don't break (today's slot still open)
                   ← past day missed = break
return streak

Example (today = day 0):
  Day:  0(today) 1    2    3    4
  Done: ✅       ✅   ❌   ✅   ✅
  Streak: i=0 done → 1, i=1 done → 2, i=2 skip → break → streak = 2
```

`86400000` = milliseconds in a day. `Date.now() - i * 86400000` — i days ago.

---

## Step 2 — HabitCard Component

Create new file — `src/components/habits/HabitCard.tsx`:

```tsx
// src/components/habits/HabitCard.tsx
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
    <div className={`habit-card ${doneToday ? "done" : ""}`}>
      <div className="habit-header">
        <span className="habit-emoji" aria-hidden="true">
          {habit.emoji}
        </span>
        <h3>{habit.title}</h3>
        <span className="streak">🔥 {streak} days</span>
      </div>

      <div className="week-dots" aria-label="Last 7 days">
        {last7.map((done, i) => (
          <span
            key={i}
            className={`dot ${done ? "filled" : ""}`}
            aria-hidden="true"
          />
        ))}
      </div>

      <button
        onClick={() => toggleCheckIn(today, habit.id)}
        aria-pressed={doneToday}
        className="checkin-btn"
      >
        {doneToday ? "✅ Done today" : "Check in"}
      </button>
    </div>
  );
});
```

**Why `React.memo`:** `useHabits()` pulls all actions — if this hook returned new references on every render, memo would be useless. Since Zustand actions are **stable references**, memo works — the card only re-renders when its `habit` actually changes.

**Accessibility:** `aria-pressed` — tells the screen reader the button's toggle state. `aria-label` — describes what the dots mean. `aria-hidden` on decorative emoji.

---

## Step 3 — Habits Page

Now assemble everything — the Habits page. Create new file — `src/pages/Habits.tsx`:

```tsx
// src/pages/Habits.tsx
import { useState } from "react";
import { useHabits } from "../hooks/useHabits";
import { HabitCard } from "../components/habits/HabitCard";
import type { Habit } from "../types";

const EMOJIS = ["🏋️", "💧", "📚", "🧘", "🥗", "😴", "✍️", "🚶"];

export function Habits() {
  const { habits, addHabit, deleteHabit } = useHabits();
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState(EMOJIS[0]);

  const habitList = Object.values(habits);

  const handleAdd = () => {
    if (!title.trim()) return;
    const habit: Habit = {
      id: `habit-${Date.now()}`,
      title: title.trim(),
      emoji,
      color: "blue",
      createdAt: new Date().toISOString(),
    };
    addHabit(habit);
    setTitle("");
  };

  return (
    <div className="habits-page">
      <h1>Habits</h1>

      <div className="add-habit">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New habit... (e.g. Drink water)"
          aria-label="New habit name"
        />
        <select
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          aria-label="Habit emoji"
        >
          {EMOJIS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>

      {habitList.length === 0 ? (
        <p className="empty">No habits yet — add one and start your streak! 🚀</p>
      ) : (
        <div className="habits-grid">
          {habitList.map((habit) => (
            <div key={habit.id} className="habit-wrapper">
              <HabitCard habit={habit} />
              <button
                className="delete-habit"
                onClick={() => deleteHabit(habit.id)}
                aria-label={`Delete ${habit.title}`}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

**The flow:**

```
User adds habit → handleAdd → addHabit(habit) → habitsStore → habits update → UI re-renders

HabitCard renders → useHabits → isHabitDone(today), getStreak, getHabitLast7Days → UI

Check-in click → toggleCheckIn(today, habitId) → checkIns update → HabitCard re-renders
```

---

## Step 4 — Verifying the Streak Calculation

Verify the streak logic with a real example:

```
CheckIns (2 habits):
"2026-08-01": { "h1": true,  "h2": true  }
"2026-08-02": { "h1": true,  "h2": false }
"2026-08-03": { "h1": false, "h2": true  }
"2026-08-04": { "h1": true,  "h2": true  }   ← today

h1 streak: today done (1) → day 3 no → break → streak = 1
h2 streak: today done (1) → day 3 done (2) → day 2 no → break → streak = 2
```

**Senior detail:** Today (i=0) not done → the `i > 0` condition doesn't break (i=0 means `i > 0` is false). This means today's slot is still open — the streak counts up to today, not before. Simple and intuitive.

---

## What T.5 Taught Us

1. **Streak logic** — date math, consecutive days, grace period
2. **Custom hook wrapping** — `useHabits` puts all habit operations + streak helpers in one place
3. **`React.memo` + stable actions** — Zustand's stable references make memo work
4. **Accessibility** — `aria-pressed`, `aria-label`, `aria-hidden`
5. **Selective subscription** — each component subscribes only to what it needs
6. **Pure date helpers** — `formatDate`, `getLastNDays` — testable

---

## So Here's the Takeaway

Core feature ready — add, check-in, streak, delete. The UI now shows real user functionality. Next step (T.6) — **Dashboard**: stats, charts, a quote via `useFetch<T>`, and Tailwind styling.

---

## In Your Own Words

1. Why is the `i > 0` condition in the streak logic?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because if today (i=0) the habit wasn't done, we shouldn't immediately reset the streak to 0 — today's slot is still open (grace period). The `i > 0` condition only breaks for past days (i >= 1). If today is done (i=0), the loop continues to yesterday. This gives a grace period — the streak counts up to today, and only starts decrementing when a past day is broken. Simple, intuitive habit streak behavior.

</details>

2. What's the benefit of wrapping everything in the `useHabits` hook? Why not let components use the store directly?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The `useHabits` hook provides all habit operations + streak helpers in one place — components stay clean, not subscribing directly to the store. The store gives raw data (`checkIns` object), the hook gives derived logic (`getStreak`, `getHabitLast7Days`). Benefits: (a) components stay simple — just call the hook; (b) streak logic lives in one place — easy to test (T.8); (c) if the store structure changes, only the hook adapts, components stay untouched.

</details>

3. How does `React.memo` work with `HabitCard`, and why does it work well with Zustand?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `React.memo` skips re-rendering a component if its props haven't changed (shallow comparison). `HabitCard` receives the `habit` prop. If the Zustand store's actions return stable references — which they do — then memo works correctly: a card only re-renders when its specific `habit` object changes, not when unrelated state (like tasks) changes. State management libraries work well with memo when actions are stable references — Zustand is.

</details>

4. Why use `aria-pressed` on the check-in button? What does accessibility gain us?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The check-in button is a toggle — between "done" and "not done." `aria-pressed={doneToday}` tells the screen reader the button's current pressed state — making the toggle accessible (paired with the visual dot). `aria-label` on the delete button (`Delete ${habit.title}`) gives meaning to an icon-only button (🗑️). This follows Batch 4's accessibility rules — keyboard + screen reader users get the same information.

</details>

5. Why does `formatDate` convert dates to "2026-08-04" format, and how does `toISOString().slice(0, 10)` work?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Check-ins need a consistent key in localStorage — a date string. `toISOString()` converts the date to UTC ISO format (`2026-08-04T...Z`), and `.slice(0, 10)` takes the first 10 characters (`2026-08-04`) — just the date, no time. This consistent key format makes `checkIns[date]` lookups work and streak calculations use the same format. (Note: ISO is in UTC, not local timezone — acceptable for small apps; production apps need timezone-aware handling.)

</details>
