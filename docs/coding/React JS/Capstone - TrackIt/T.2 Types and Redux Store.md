---

## Where We Left Off

In T.1, we set up the TrackIt project — `bunx create-vite`, all dependencies, clean folder structure. Dev server is running.

**Now T.2 — The Data Layer**: we'll define types, understand normalized state design, and build all Zustand stores. UI comes later — first a solid data foundation.

Here's the scene...

---

## Coder Mindset First — Imagine the Data Shape

Before building any app, a coder first asks: **"What data will the app have, and what will its shape be?"**

Let's model TrackIt's data:

| Data | What it is | Example |
|------|---------|---------|
| **Habit** | A habit the user tracks | "Drink water", "Workout", "Meditate" |
| **Check-in** | Whether a habit was completed each day | Today's workout ✅ |
| **Task** | A to-do item | "Send project code review" |
| **Prefs** | User preferences | theme (light/dark) |
| **Auth** | Login state | logged in / out |

**Core decision — how to store a habit's check-ins?**

**Naive (nested) approach:**
```ts
// ❌ Naive — all check-ins inside the habit
{
  id: "h1",
  title: "Workout",
  checkIns: [
    { date: "2026-08-01", done: true },
    { date: "2026-08-02", done: false },
  ]
}
```
**Problem:** Every check-in requires updating the entire habit array. Streak calculation is complex — from a date array inside the habit. Query (habits completed per day) — traverse the entire array.

**Normalized approach (remember from 6.6):**
```ts
// ✅ Normalized — habits separate, check-ins separate
{
  habits: {
    h1: { id: "h1", title: "Workout", emoji: "🏋️", color: "blue" }
  },
  checkIns: {
    "2026-08-01": { h1: true, h2: false },
    "2026-08-02": { h1: true }
  }
}
```
**Benefit:** Check-in = updating one object per date. Streak = just pull that habit's dates. Query (all habits per day) = `checkIns[date]` directly. **O(1) access.**

**This is senior thinking** — the shape of state determines the app's scalability.

---

## T.2.1 — Defining Types

First, the types. Create a new file — `src/types/index.ts`:

```ts
// src/types/index.ts
export interface Habit {
  id: string;
  title: string;
  emoji: string;
  color: string;
  createdAt: string; // ISO date
}

export type CheckInMap = Record<string, boolean>;

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export type FilterStatus = "all" | "active" | "completed";

export interface Prefs {
  theme: "light" | "dark";
}

export interface Quote {
  content: string;
  author: string;
}
```

**What each type is:**

| Type | What it is |
|------|-----|
| `Habit` | The core shape of a habit — id, title, emoji, color, createdAt |
| `CheckInMap` | `Record<string, boolean>` — habitId → done/not-done |
| `Task` | To-do item — id, title, completed, priority, createdAt |
| `FilterStatus` | Task list filter — union type (Batch 1) |
| `Prefs` | Preferences — theme |
| `Quote` | API quote response shape (for T.6) |

**Important:** Always define types first, because all other files will import them. Types are a contract — like a building plan.

---

## T.2.2 — Habits Store (Normalized)

Create a new file — `src/stores/habitsStore.ts`:

```ts
// src/stores/habitsStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Habit, CheckInMap } from "../types";

interface HabitsState {
  habits: Record<string, Habit>;
  checkIns: Record<string, CheckInMap>; // date -> { habitId: done }
}

interface HabitsActions {
  addHabit: (habit: Habit) => void;
  updateHabit: (id: string, updates: Partial<Omit<Habit, "id">>) => void;
  deleteHabit: (id: string) => void;
  toggleCheckIn: (date: string, habitId: string) => void;
  isHabitDone: (date: string, habitId: string) => boolean;
  getCheckInCount: (date: string) => number;
}

type HabitsStore = HabitsState & HabitsActions;

export const useHabitsStore = create<HabitsStore>()(
  persist(
    (set, get) => ({
      habits: {},
      checkIns: {},

      addHabit: (habit) =>
        set((state) => ({
          habits: { ...state.habits, [habit.id]: habit },
        })),

      updateHabit: (id, updates) =>
        set((state) => ({
          habits: {
            ...state.habits,
            [id]: { ...state.habits[id], ...updates },
          },
        })),

      deleteHabit: (id) =>
        set((state) => {
          const { [id]: _, ...rest } = state.habits;
          return { habits: rest };
        }),

      toggleCheckIn: (date, habitId) =>
        set((state) => {
          const dayCheckIns = state.checkIns[date] ?? {};
          return {
            checkIns: {
              ...state.checkIns,
              [date]: { ...dayCheckIns, [habitId]: !dayCheckIns[habitId] },
            },
          };
        }),

      isHabitDone: (date, habitId) => {
        const day = get().checkIns[date];
        return day ? Boolean(day[habitId]) : false;
      },

      getCheckInCount: (date) => {
        const day = get().checkIns[date];
        return day ? Object.values(day).filter(Boolean).length : 0;
      },
    }),
    { name: "trackit-habits" }
  )
);
```

**What each action does:**

| Action | Logic |
|--------|-------|
| `addHabit` | Add a new habit object into the habits object (with spread) |
| `updateHabit` | Spread the habit updates — immutably |
| `deleteHabit` | `const { [id]: _, ...rest }` — destructuring to remove the habit |
| `toggleCheckIn` | Spread the object for that date, flip the habitId value |
| `isHabitDone` | Use `get()` to access current state — a pure helper, for UI queries |
| `getCheckInCount` | Count all done check-ins for that date |

**Normalized benefit here:** `checkIns` is an object — date key, and inside `{ habitId: done }`. Check-in update = one object spread. No array find/update. **O(1).**

---

## T.2.3 — Tasks Store

We'll manage task state with `useReducer` (Batch 5.5). Create a new file — `src/stores/tasksStore.ts`:

```ts
// src/stores/tasksStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, FilterStatus } from "../types";

// Task state + actions interface
interface TasksState {
  tasks: Task[];
  filter: FilterStatus;
}

interface TasksActions {
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: FilterStatus) => void;
}

type TasksStore = TasksState & TasksActions;

export const useTasksStore = create<TasksStore>()(
  persist(
    (set) => ({
      tasks: [],
      filter: "all",

      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      setFilter: (filter) => set({ filter }),
    }),
    { name: "trackit-tasks" }
  )
);
```

**We'll integrate `useReducer` in the tasks store in T.3** — for now they're simple Zustand actions. This file will evolve.

---

## T.2.4 — Prefs Store

Create a new file — `src/stores/prefsStore.ts`:

```ts
// src/stores/prefsStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Prefs } from "../types";

interface PrefsStore extends Prefs {
  setTheme: (theme: Prefs["theme"]) => void;
}

export const usePrefsStore = create<PrefsStore>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "trackit-prefs" }
  )
);
```

---

## T.2.5 — Auth Store (Dummy Auth)

Dummy auth for protected routes (Batch 3.3 pattern, in Zustand). Create a new file — `src/stores/authStore.ts`:

```ts
// src/stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  user: { name: string } | null;
}

interface AuthActions {
  login: (name: string) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,

      login: (name) => set({ isLoggedIn: true, user: { name } }),

      logout: () => set({ isLoggedIn: false, user: null }),
    }),
    { name: "trackit-auth" }
  )
);
```

---

## The Power of Stores — Integration

Now all stores are ready. A small demo — how components will use them (full UI in T.4-T.6):

```tsx
// Reference: a component using the habits store
import { useHabitsStore } from "../stores/habitsStore";

function CheckInButton({ date, habitId }: { date: string; habitId: string }) {
  const isDone = useHabitsStore((s) => s.isHabitDone(date, habitId));
  const toggle = useHabitsStore((s) => s.toggleCheckIn);

  return (
    <button
      onClick={() => toggle(date, habitId)}
      aria-pressed={isDone}
      className={isDone ? "done" : ""}
    >
      {isDone ? "✅ Done" : "Check in"}
    </button>
  );
}
```

**Selective subscription** (from 6.4): `useHabitsStore((s) => s.isHabitDone(...))` — the component only re-renders on that value. Performance stays clean even when the store is big.

---

## What T.2 Taught Us

1. **Data shape = senior thinking** — nested vs normalized, O(1) access
2. **Types first** — define the contract, other files import it
3. **Normalized check-ins** — date → `{ habitId: done }`, streak/query easy
4. **Zustand + persist** — every store auto-saves to localStorage (refresh-safe)
5. **Actions are always immutable** — new state via spread, old one doesn't change
6. **Selective subscription** — subscribe only to what the component uses

---

## So Here's the Takeaway

Data layer complete — 4 stores (habits, tasks, prefs, auth), all persisted, normalized, typed. This is the backbone of the whole app. UI (T.4-T.6) will consume these. Now the next step (T.3) — **`useReducer` integration + generic custom hooks** (`useFetch<T>`, `useLocalStorage<T>`).

---

## In Your Own Words

1. Why are habit check-ins stored as `date → { habitId: done }` in normalized state? What's the difference from the nested approach?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Normalized check-ins are date-keyed objects. A check-in update = one object spread, streak calculation = pull that habit's dates, "how many habits done today" = `checkIns[date]` directly — all O(1). Nested (an array inside the habit) requires traversing the entire array on every update, and a query (all habits per day) requires scanning the whole array. Normalized state is the industry standard (Redux docs, Kanban board in 6.6) — crucial for large apps to scale.

</details>

2. In a Zustand store, what are the roles of `set` and `get`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `set` updates state — `set((state) => ({...}))` returns new state (immutably). `get` reads the current state — helpers like `isHabitDone` use `get().checkIns[date]` without triggering a re-render. Use `set` for mutations in actions, `get` for computed/read logic. Two different responsibilities.

</details>

3. What does `deleteHabit` do with `const { [id]: _, ...rest }`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** It's a destructuring trick — pulls one key out of an object and takes the rest. `[id]: _` = the key named by the `id` variable, its value goes to `_` (ignored). `...rest` = all remaining key-value pairs into a new object. To delete, a new object is created without the deleted habit — the original object isn't changed (immutable). Redux/Zustand pattern — direct `delete` on object mutation is not allowed.

</details>

4. Why is the auth store "dummy"? What's different from real auth?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because it's a pure frontend app — no backend. Dummy auth just stores `isLoggedIn` + user in localStorage via persist — a login/logout toggle. Real auth has password hashing, tokens, sessions, server verification — which requires a backend. Our focus is the protected routing pattern (Batch 3.3) — only logged-in users can access. The routing concept is the same; the security layer is a backend concern outside this course's scope.

</details>

5. What's the benefit of selective subscription (`useHabitsStore((s) => s.isHabitDone(...))`)? What's the problem with subscribing to the entire store?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Selective subscription re-renders the component only on that exact value — e.g., `isHabitDone(date, habitId)` — only when that habit's check-in changes. Subscribing to the entire store (`useHabitsStore()`) re-renders the component on any state change (any habit, any check-in) — unnecessary renders. At real scale (100 habits, 30 days of check-ins), selective subscription makes a big performance difference. The same pattern was covered in Kanban 6.6.

</details>
