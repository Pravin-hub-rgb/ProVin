---

## Abhi Tak Kya Hua

T.1 mein TrackIt project setup kiya — `bunx create-vite`, saari dependencies, clean folder structure. Dev server chal raha hai.

Ab **T.2 — Data Layer**: types define karenge, normalized state design samjhenge, aur saare Zustand stores banayenge. UI baad mein aayega — pehle data ka solid foundation.

Toh aisa scene hai...

---

## Coder Mindset Pehle — Data Ka Shape Socho

Koi bhi app banane se pehle, coder sabse pehle poochta hai: **"App mein kya-kya data hoga, aur uska shape kya hoga?"**

TrackIt ke data model sochte hain:

| Data | Kya hai | Example |
|------|---------|---------|
| **Habit** | Ek aadat jo user track karta hai | "Paani piyo", "Workout", "Meditate" |
| **Check-in** | Har din habit complete ki ya nahi | Aaj workout ✅ |
| **Task** | Ek to-do item | "Project ka code review bhejo" |
| **Prefs** | User preferences | theme (light/dark) |
| **Auth** | Login state | logged in / out |

**Core decision — habit ka check-in kaise store karein?**

**Naive (nested) approach:**
```ts
// ❌ Naive — habit ke andar saare check-ins
{
  id: "h1",
  title: "Workout",
  checkIns: [
    { date: "2026-08-01", done: true },
    { date: "2026-08-02", done: false },
  ]
}
```
**Problem:** Har check-in pe poori habit array update karni padti hai. Streak calculate karna complex — habit ke andar date array se. Query (kis din kitne habits complete kiye) — poori array traverse karni padti.

**Normalized approach (Batch 6.6 se yaad hai):**
```ts
// ✅ Normalized — habits alag, check-ins alag
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
**Fayda:** Check-in = ek date pe ek object update. Streak = sirf us habit ki dates nikalo. Query (din ke saare habits) = `checkIns["2026-08-01"]` direct. **O(1) access.**

**Yahi senior thinking hai** — state ka shape app ki scalability decide karta hai.

---

## T.2.1 — Types Define Karna

Sabse pehle types. Nayi file banao — `src/types/index.ts`:

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

**Har type kya hai:**

| Type | Kya |
|------|-----|
| `Habit` | Habit ka core shape — id, title, emoji, color, createdAt |
| `CheckInMap` | `Record<string, boolean>` — habitId → done/not-done |
| `Task` | To-do item — id, title, completed, priority, createdAt |
| `FilterStatus` | Task list filter — union type (Batch 1) |
| `Prefs` | Preferences — theme |
| `Quote` | API quote response shape (T.6 ke liye) |

**Important:** Types hamesha **pehle** define karo, kyunki baaki saari files inhe import karengi. Types ek contract hai — jaise building ka plan.

---

## T.2.2 — Habits Store (Normalized)

Nayi file banao — `src/stores/habitsStore.ts`:

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

**Har action kya kar raha hai:**

| Action | Logic |
|--------|-------|
| `addHabit` | Naya habit object `habits` object mein daalo (`{...habits, [id]: habit}`) |
| `updateHabit` | Habit ke updates spread karo — immutably |
| `deleteHabit` | `const { [id]: _, ...rest }` — destructuring se habit nikaalo |
| `toggleCheckIn` | Us date ke object ko spread karo, habitId ki value flip karo |
| `isHabitDone` | `get()` se current state — pure helper, UI query ke liye |
| `getCheckInCount` | Us date ke saare done check-ins count karo |

**Normalized fayda yahan:** `checkIns` ek object hai — date key, aur andar `{ habitId: done }`. Check-in update = ek object spread. Koi array find/update nahi. **O(1).**

---

## T.2.3 — Tasks Store

Task state ko `useReducer` se manage karenge (Batch 5.5). Nayi file banao — `src/stores/tasksStore.ts`:

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

**T.3 mein tasks store ke andar `useReducer` integration karenge** — abhi simple Zustand actions hain. Ye file evolve hogi.

---

## T.2.4 — Prefs Store

Nayi file banao — `src/stores/prefsStore.ts`:

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

Protected routes ke liye dummy auth (Batch 3.3 pattern, Zustand mein). Nayi file banao — `src/stores/authStore.ts`:

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

## Stores Ka Power — Integration

Ab saare stores ready hain. Ek chhota demo — components inhe kaise use karenge (T.4-T.6 mein full UI):

```tsx
// Reference: koi component habits store use karta hai
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

**Selective subscription** (6.4 se): `useHabitsStore((s) => s.isHabitDone(...))` — component sirf us value pe re-render hota hai. Store bada ho toh bhi performance clean.

---

## What T.2 Taught Us

1. **Data shape = senior thinking** — nested vs normalized, O(1) access
2. **Types pehle** — contract define karo, baaki files import karti hain
3. **Normalized check-ins** — date → `{ habitId: done }`, streak/query easy
4. **Zustand + persist** — har store localStorage mein auto-save (refresh-safe)
5. **Actions hamesha immutable** — spread operator se nayi state, purani change nahi
6. **Selective subscription** — component jitna use karta hai utna hi subscribe

---

## So Here's the Takeaway

Data layer complete — 4 stores (habits, tasks, prefs, auth), sab persisted, normalized, typed. Ye poori app ka backbone hai. UI (T.4-T.6) inhe hi consume karega. Agla step (T.3) — **useReducer integration + generic custom hooks** (`useFetch<T>`, `useLocalStorage<T>`).

---

## In Your Own Words

1. Habit check-ins normalized state mein `date → { habitId: done }` kyun rakhe? Nested approach se kya fark hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Normalized mein check-ins date-keyed object hain. Check-in update = ek object spread, streak calculation = us habit ki dates filter, "aaj kitne habits done" = `checkIns[date]` direct — sab O(1). Nested (habit ke andar array) mein har update poori array traverse/find karni padti, aur query (din ke saare habits) poori array scan. Normalized state industry standard hai (Redux docs, Kanban board 6.6 mein bhi) — large apps scale ke liye crucial.

</details>

2. Zustand store mein `set` aur `get` — in dono ka role kya hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `set` state update karta hai — `set((state) => ({...}))` nayi state return karta hai (immutably). `get` current state read karta hai — helpers jaise `isHabitDone` mein `get().checkIns[date]` use hota hai bina re-render trigger kiye. Actions mein mutation ke liye `set`, computed/read logic ke liye `get` — dono alag responsibilities.

</details>

3. `deleteHabit` mein `const { [id]: _, ...rest }` kya kar raha hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Ye destructuring trick hai — object ke andar se ek key nikaal kar baaki `rest` le leta hai. `[id]: _` = key jiska naam `id` variable mein hai, uski value ko `_` mein (ignore). `...rest` = baaki saare key-value pairs nayi object. To delete — nayi object banti hai bina deleted habit ke, purani object change nahi hoti (immutable). Redux/Zustand pattern — direct `delete` object mutation allowed nahi.

</details>

4. Auth store "dummy" kyun hai? Real auth se kya fark hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Kyunki pure frontend hai — koi backend nahi. Dummy auth bas localStorage mein `isLoggedIn` + user store karta hai — login/logout toggle. Real auth mein password hash, tokens, session, server verification hoti hai — backend se. Hamara focus protected routing pattern hai (Batch 3.3) — sirf logged-in users access. Routing ka concept wahi hai, security layer backend ka kaam hai jo is course ke scope se bahar.

</details>

5. Selective subscription (`useHabitsStore((s) => s.isHabitDone(...))`) se kya fayda? Poora store subscribe karne se kya problem?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Selective subscription component ko sirf us exact value pe re-render karta hai — jaise `isHabitDone(date, habitId)` — us habit ki chek-in change pe. Poora store subscribe karne (`useHabitsStore()`) pe component kisi bhi state change (koi bhi habit, koi check-in) pe re-render hota hai — unnecessary renders. Badia scale (100 habits, 30 din check-ins) pe selective subscription bada performance fark deta hai. Kanban 6.6 mein bhi yahi pattern tha.

</details>