---

## Abhi Tak Kya Hua

T.4 mein router banaya — protected routes, lazy loading, login flow. Ab **T.5 — Habits Feature**: habits CRUD, daily check-in, streak logic. Ye app ka core feature hai.

Toh aisa scene hai...

---

## Coder Mindset — Habits Feature Socho

Habits page pe kya hona chahiye?

| Feature | Kya |
|---------|-----|
| **Habit list** | Saare habits dikhao — title, emoji, current streak |
| **Add habit** | Naya habit banane ka form |
| **Check-in** | Aaj ka habit done/not-done toggle |
| **Streak** | Lagataar kitne din habit done hai |
| **Delete/Edit** | Habit remove/update |

**Streak logic — senior thinking:** Streak kya hai? **Lagataar din** jisme habit done thi, aaj se peeche. Agar aaj done nahi kiya toh streak kaise count ho? Do tareeke:

1. **Strict:** Aaj agar done nahi toh streak 0 (ya purani streak)
2. **Grace:** Aaj done nahi toh bhi kal tak streak dikhe (streak "living" — aaj ka mauka baaki)

Real habit apps (Duolingo, Habitica) grace period use karte hain. Hum simple approach rakhte hain: **streak = aaj se peeche lagataar done days** — agar aaj done nahi, toh streak 0.

---

## Step 1 — useHabits Custom Hook

Saari habit logic ek hook mein wrap karte hain — streak calculation, date helpers. Nayi file banao — `src/hooks/useHabits.ts`:

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

  // Ek habit ki streak — aaj se peeche lagataar done days
  function getStreak(habitId: string): number {
    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const date = formatDate(new Date(Date.now() - i * 86400000));
      const day = checkIns[date];
      if (day && day[habitId]) {
        streak++;
      } else if (i > 0) {
        break; // aaj skip ho toh break (aaj ka mauka baaki)
      }
    }
    return streak;
  }

  // Ek habit ki last 7 din ka check-in status
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

**Streak function ka logic:**

```
for i = 0..59 (60 din tak):
    date = aaj - i din
    agar us din habit done:
        streak++
    warna (i > 0): break        ← aaj skip = break (aaj ka mauka baaki), purana gap = break
return streak

Example (aaj = din 0):
  Din:  0(today) 1    2    3    4
  Done: ✅       ✅   ❌   ✅   ✅
  Streak: i=0 done → 1, i=1 done → 2, i=2 nahi → break → streak = 2
```

`86400000` = ek din ke milliseconds. `Date.now() - i * 86400000` — i din peeche.

---

## Step 2 — HabitCard Component

Nayi file banao — `src/components/habits/HabitCard.tsx`:

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
        <span className="streak">🔥 {streak} din</span>
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
        {doneToday ? "✅ Done aaj" : "Check in"}
      </button>
    </div>
  );
});
```

**React.memo kyu:** `useHabits()` hook sab actions leta hai — agar yeh hook re-render pe naye references bana raha hota, memo useless ho jata. Kyunki Zustand actions **stable references** hain, memo sahi kaam karta hai — sirf jab habit actual change hui, card re-render. (Batch 5.1)

**Accessibility:** `aria-pressed` — button state screen reader ko pata (toggle button pattern). `aria-label` — dots ka meaning. `aria-hidden` on decorative emoji.

---

## Step 3 — Habits Page

Ab sab jodte hain — habits page. Nayi file banao — `src/pages/Habits.tsx`:

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
          placeholder="Nayi habit... (e.g. Paani piyo)"
          aria-label="Nayi habit ka naam"
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
        <p className="empty">Koi habit nahi — ek add karo aur streak shuru karo! 🚀</p>
      ) : (
        <div className="habits-grid">
          {habitList.map((habit) => (
            <div key={habit.id} className="habit-wrapper">
              <HabitCard habit={habit} />
              <button
                className="delete-habit"
                onClick={() => deleteHabit(habit.id)}
                aria-label={`${habit.title} delete karo`}
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

**Flow:**

```
User habit add karta hai → handleAdd → addHabit(habit) → habitsStore → habits update → UI re-render

HabitCard render → useHabits → isHabitDone(today), getStreak, getHabitLast7Days → UI

Check-in click → toggleCheckIn(today, habitId) → checkIns update → habitCard re-render
```

---

## Step 4 — Streak Calculation Verify

Streak logic ko ek real example se verify karte hain:

```
CheckIns (2 habits):
"2026-08-01": { "h1": true,  "h2": true  }
"2026-08-02": { "h1": true,  "h2": false }
"2026-08-03": { "h1": false, "h2": true  }
"2026-08-04": { "h1": true,  "h2": true  }   ← today

h1 streak: aaj done (1) → 03 nahi → break → streak = 1
h2 streak: aaj done (1) → 03 done (2) → 02 nahi → break → streak = 2
```

**Senior detail:** Aaj (i=0) done nahi ho toh `i > 0` condition break nahi karta (i=0 pe `else if` skip hota hai — `i > 0` false). Iska matlab aaj ka mauka baaki hai — aaj tak ki streak count hoti hai, aaj ke baad tabhi count hoga jab done karo. Simple + intuitive.

---

## What T.5 Taught Us

1. **Streak logic** — date math, lagataar days, grace period
2. **Custom hook wrapping** — `useHabits` saare habit operations + streak helpers ek jagah
3. **`React.memo` + stable actions** — Zustand stable references = memo works
4. **Accessibility** — `aria-pressed`, `aria-label`, `aria-hidden`
5. **Selective subscription** — har component sirf uski zaroorat
6. **Pure date helpers** — `formatDate`, `getLastNDays` — test-able (T.8)

---

## So Here's the Takeaway

Core feature (habits) ready — add, check-in, streak, delete. UI ab real user functionality dikha raha hai. Agla step (T.6) — **Dashboard**: stats, charts, quote via `useFetch<T>` + Tailwind styling.

---

## In Your Own Words

1. Streak logic mein `else if (i > 0) break` — `i > 0` condition kyun zaroori hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Kyunki aaj (i=0) agar habit done nahi hai, toh streak ko turant 0 nahi karna chahiye — aaj ka mauka abhi baaki hai. `i > 0` condition sirf purane din (i>=1) pe break karta hai. Agar aaj done hai (i=0), loop continue karta hai agle din. Isse "grace period" milta hai — aaj ka check-in karte hi streak badhti hai, pehle se count nahi hota. Simple, intuitive habit streak behaviour.

</details>

2. `useHabits` custom hook mein sab kuch wrap karke kya fayda? Components ko seedha store use karne se kya fark?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `useHabits` hook saare habit operations + streak helpers ek jagah provide karta hai — components clean rehte hain, seedha store subscribe nahi karte. Store raw data deta hai (`checkIns` object), hook derived logic deta hai (`getStreak`, `getHabitLast7Days`). Fayda: (a) components simple — sirf hook call karte hain, (b) streak logic ek jagah — test karna easy (T.8), (c) agar store structure badle, sirf hook adapt karna, components untouched.

</details>

3. `React.memo` HabitCard pe kaise kaam karta hai — kyun Zustand ke saath effective hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `React.memo` component ko skip karta hai agar props same hain (shallow compare). HabitCard ko `habit` prop milta hai. Agar Zustand actions stable references return karte hain (jo woh karte hain — actions ek baar banaye jaate hain), toh jab koi aur state change hoti hai (jaise tasks), HabitCard re-render nahi hota — sirf jab uska `habit` object change hua. State libraries ke saath memo effective tab hai jab actions stable ho — Zustand waisa hi hai.

</details>

4. `aria-pressed` check-in button pe kyu? Isse accessibility kya milti hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Check-in button ek toggle hai — "done" aur "not done" ke beech. `aria-pressed={doneToday}` screen reader ko batata hai ki button abhi pressed hai ya nahi — toggle state accessible hota hai (visual dot ke saath aur audio bhi). `aria-label` delete button pe (`"Workout delete karo"`) — icon-only button (🗑️) ka meaning screen reader user ko milta hai. Ye Batch 4 ke accessibility rules hain — keyboard + screen reader users ke liye same info.

</details>

5. `formatDate` function date ko "2026-08-04" format mein kyun convert karta hai, aur `toISOString().slice(0, 10)` kaise?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Check-ins localStorage mein consistent key chahiye — date string. `toISOString()` date ko UTC ISO format mein deta hai (`2026-08-04T...Z`), `.slice(0, 10)` pehle 10 characters leta hai (`2026-08-04`) — sirf date, time nahi. Consistent date key se `checkIns[date]` lookup kaam karta hai aur streak calc mein same format. (Note: ISO local timezone nahi, UTC hota hai — simple apps ke liye acceptable; production mein timezone careful handling chahiye.)

</details>