---

## Where We Left Off

In T.1, we set up the TrackIt project — `bunx create-vite`, all dependencies (RTK + react-redux + redux-persist), clean folder structure. Dev server is running.

**Prerequisite reminder:** TrackIt is now the **Redux Toolkit showcase**. Batches 6.4–6.6 taught Zustand (the new-project default). Batch 6.7 taught RTK — `createSlice`, `configureStore`, `Provider` + typed hooks, `createAsyncThunk`, and `redux-persist`. Everything taught there is applied here, not re-taught. If Batch 6.7 felt shaky, revisit `6.7.2` (slices) and `6.7.3` (typed hooks) before continuing.

**Now T.2 — The Data Layer**: we'll define types, understand normalized state design, build all 4 RTK slices, wire up the store with `redux-persist`, and connect React to it. UI comes later — first a solid data foundation.

Here's the scene...

---

## What Changed vs What Stayed the Same

TrackIt's architecture didn't move — only the engine inside it did.

| Same as before | Changed in this rewrite |
|-------|--------|
| Normalized data shape (`habits` by id, `checkIns` by date) | Zustand `create()` stores → RTK `createSlice` + Immer |
| `src/stores/` folder holds the state layer | Actions are dispatched objects now — no direct `set()` |
| localStorage persistence (refresh-safe) | `persist` middleware (built-in) → `redux-persist` (extra lib, ~5x more config) |
| `useReducer`-style tasks (planned for T.3) | Tasks are an RTK slice — `createSlice` *is* the reducer, no separate `useReducer` needed |
| `useHabitsStore((s) => ...)` selective subscribe | `useAppSelector` — same idea, typed `RootState` |

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

**Important:** Always define types first, because all other files will import them. Types are a contract — the slice `PayloadAction<T>` types are built from these, so a wrong shape fails at compile time.

---

## T.2.2 — Habits Slice (Normalized)

Create a new file — `src/stores/habitsSlice.ts`:

```ts
// src/stores/habitsSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Habit, CheckInMap } from "../types";

interface HabitsState {
  habits: Record<string, Habit>;
  checkIns: Record<string, CheckInMap>; // date -> { habitId: done }
}

const initialState: HabitsState = {
  habits: {},
  checkIns: {},
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.habits[action.payload.id] = action.payload;   // Immer — draft mutation OK
    },

    updateHabit: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Omit<Habit, "id">> }>
    ) => {
      const existing = state.habits[action.payload.id];
      if (existing) Object.assign(existing, action.payload.updates);
    },

    deleteHabit: (state, action: PayloadAction<string>) => {
      delete state.habits[action.payload];
    },

    toggleCheckIn: (state, action: PayloadAction<{ date: string; habitId: string }>) => {
      const day = state.checkIns[action.payload.date] ?? {};
      day[action.payload.habitId] = !day[action.payload.habitId];
      state.checkIns[action.payload.date] = day;
    },
  },
});

export const { addHabit, updateHabit, deleteHabit, toggleCheckIn } = habitsSlice.actions;
export default habitsSlice.reducer;
```

**What changed vs the Zustand version:**

| Before (Zustand) | Now (RTK) |
|---------|------|
| `create(persist((set, get) => ...))` | `createSlice({ name, initialState, reducers })` |
| `set((state) => ({ habits: { ...state.habits, [id]: habit } }))` — manual immutable spread | `state.habits[action.payload.id] = action.payload` — looks like mutation, **is** safe (Immer) |
| `const { [id]: _, ...rest } = state.habits` delete trick | `delete state.habits[action.payload]` — same Immer magic |
| `get().checkIns[date]` — read from store inside actions | No `get()` in components — reads happen via **selectors** (next section) |
| Actions are plain functions created once | Actions are **dispatched objects** (`dispatch(addHabit(habit))`) — every change is traceable in Redux DevTools |

**How Immer lets `state.habits[id] = habit` be safe:** `createSlice` runs your reducer inside a Proxy. You write mutating code; Immer records every change and produces a brand-new immutable state. Redux Toolkit's rule — *never mutate state outside a slice reducer* — is unchanged.

**Why dispatch objects instead of direct writes:** every state change passes through one function (the reducer), so Redux DevTools shows exactly which action did what — `habits/addHabit`, `habits/toggleCheckIn`. Debugging "who changed this?" becomes a DevTools lookup, not guesswork.

**Normalized benefit here:** `checkIns` is an object — date key, and inside `{ habitId: done }`. Check-in update = one nested assignment. No array find/update. **O(1).**

---

## T.2.3 — Tasks Slice

Tasks used to be simple actions planned for `useReducer` — RTK absorbs that. A slice **is** a reducer + action creators, with Immer built in. Create `src/stores/tasksSlice.ts`:

```ts
// src/stores/tasksSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task, FilterStatus } from "../types";

interface TasksState {
  tasks: Task[];
  filter: FilterStatus;
}

const initialState: TasksState = {
  tasks: [],
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;   // draft → safe direct write
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },

    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
```

**Note — where did `useReducer` go?** `createSlice` is the same pattern (reducer + discriminated actions) with the boilerplate removed, plus Immer. `{ kind: "TOGGLE_TASK", payload: { id } }` becomes `dispatch(toggleTask(id))`. The `taskReducer.ts` you would have written by hand is generated for you. (That's why T.3 no longer has a useReducer part — see T.3.)

---

## T.2.4 — Prefs Slice

Create a new file — `src/stores/prefsSlice.ts`:

```ts
// src/stores/prefsSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Prefs } from "../types";

const initialState: Prefs = {
  theme: "light",
};

const prefsSlice = createSlice({
  name: "prefs",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Prefs["theme"]>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = prefsSlice.actions;
export default prefsSlice.reducer;
```

---

## T.2.5 — Auth Slice (Dummy Auth)

Dummy auth for protected routes (Batch 3.3 pattern, in Redux). Create a new file — `src/stores/authSlice.ts`:

```ts
// src/stores/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  user: { name: string } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.user = { name: action.payload };
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```

---

## T.2.6 — The Store — store.ts + hooks.ts

Slices are reducers — they don't talk to each other and React doesn't know they exist yet. The **store** combines them, and **typed hooks** give React safe access.

Create `src/stores/store.ts`:

```ts
// src/stores/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";   // localStorage
import habitsReducer from "./habitsSlice";
import tasksReducer from "./tasksSlice";
import prefsReducer from "./prefsSlice";
import authReducer from "./authSlice";

export const rootReducer = combineReducers({
  habits: habitsReducer,
  tasks: tasksReducer,
  prefs: prefsReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(
  { key: "trackit", version: 1, storage },   // one localStorage entry: "persist:trackit"
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        // redux-persist's internal actions are non-serializable — RTK must ignore them
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Why each piece exists (data flow):**

| Piece | What it does |
|-------|--------------|
| `rootReducer` exported | Tests (T.8) build a **fresh, non-persisted store** from it — same reducers, no localStorage, no rehydrate timing |
| `combineReducers` | One reducer per slice — store state becomes `{ habits, tasks, prefs, auth }`. `s.habits.checkIns` is the exact path components read |
| `persistReducer` | Wraps the root reducer — every dispatched action is followed by an automatic localStorage write under the key `persist:trackit` |
| `key: "trackit"` + `version: 1` | The storage entry name; `version` lets you run migrations later if the state shape changes |
| No `whitelist` | All 4 slices are meant to survive refresh — no ephemeral slice exists. If one appears (e.g., an ephemeral UI slice), add `whitelist: ["habits", "tasks", "prefs", "auth"]` to exclude it |
| `ignoredActions` | redux-persist's actions carry non-serializable functions — RTK would warn in dev. Ignoring them is the documented setup (6.7.5.5) |
| `RootState` / `AppDispatch` | Types derived from the store itself — components never guess paths like `s.habits.checkIns` |

Create `src/stores/hooks.ts` (the 6.7.3 pattern):

```ts
// src/stores/hooks.ts
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
```

**Why wrap the hooks:** every component gets `RootState`/`AppDispatch` automatically — no `useSelector((state: RootState) => ...)` repeated everywhere, and `dispatch` knows every valid action type.

Create `src/stores/selectors.ts`:

```ts
// src/stores/selectors.ts
import type { RootState } from "./store";

export const selectHabits = (s: RootState) => s.habits.habits;
export const selectCheckIns = (s: RootState) => s.habits.checkIns;
export const selectTasks = (s: RootState) => s.tasks.tasks;
export const selectTaskFilter = (s: RootState) => s.tasks.filter;
export const selectTheme = (s: RootState) => s.prefs.theme;
export const selectUser = (s: RootState) => s.auth.user;
export const selectIsLoggedIn = (s: RootState) => s.auth.isLoggedIn;

export const selectIsHabitDone = (s: RootState, date: string, habitId: string) =>
  Boolean(s.habits.checkIns[date]?.[habitId]);

export const selectCheckInCount = (s: RootState, date: string) => {
  const day = s.habits.checkIns[date];
  return day ? Object.values(day).filter(Boolean).length : 0;
};
```

**Why selectors instead of inline `useAppSelector((s) => s.habits.checkIns[date]?.[habitId])` everywhere:** the read logic lives in one file. If the `checkIns` shape ever changes, only `selectors.ts` changes — components and slices stay untouched. (`isHabitDone`/`getCheckInCount` from the Zustand version moved here — a slice cannot read its own sibling state for the UI; selectors are the read-side counterpart of actions.)

---

## T.2.7 — redux-persist — Refresh-Safe Data

Zustand's `persist` middleware saved and restored state automatically in 1 line. RTK has **no built-in persist** — the industry-standard answer (and the one Batch 6.7 used for the Expense Tracker) is `redux-persist`.

**The data flow:**

```
App starts
  → persistStore reads localStorage["persist:trackit"]
  → dispatches REHYDRATE
  → store is filled with the saved habits/tasks/prefs/auth
  → THEN <App /> renders (PersistGate blocks until rehydrate lands)

User does anything (dispatch addHabit / toggleTask / ...)
  → reducer produces new state
  → redux-persist automatically writes the new state to localStorage
```

**Wire it in `src/main.tsx`:**

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { store, persistor } from "./stores/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* Blocks render until REHYDRATE completes — no empty-state flicker */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
```

**Why `PersistGate` is mandatory:** `REHYDRATE` is async — without the gate, `<App />` renders once with empty persisted state (user sees zero habits for a split second), then re-renders when rehydration lands — visible flicker. The gate holds rendering until the saved state is inside the store.

**What you pay vs Zustand's `persist`:** one extra library, one wrapper (`PersistGate`), and the 6 `ignoredActions` in `configureStore`. That's the trade — RTK buys you the enterprise ecosystem (DevTools time-travel, middleware, predictable actions), and persistence costs a few more lines.

---

## The Power of the Store — Integration

Now all slices are wired. A small demo — how components will use them (full UI in T.4-T.6):

```tsx
// Reference: a component using the habits slice
import { useAppSelector, useAppDispatch } from "../stores/hooks";
import { selectIsHabitDone } from "../stores/selectors";
import { toggleCheckIn } from "../stores/habitsSlice";

function CheckInButton({ date, habitId }: { date: string; habitId: string }) {
  const isDone = useAppSelector((s) => selectIsHabitDone(s, date, habitId));
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(toggleCheckIn({ date, habitId }))}
      aria-pressed={isDone}
      className={isDone ? "done" : ""}
    >
      {isDone ? "✅ Done" : "Check in"}
    </button>
  );
}
```

**Typed read + dispatch** — the component never touches `localStorage`, never spreads state by hand, never guesses a path. `useAppSelector` re-renders only when `selectIsHabitDone`'s boolean changes; `dispatch(toggleCheckIn(...))` sends one traceable action through the reducer.

---

## What T.2 Taught Us

1. **Data shape = senior thinking** — nested vs normalized, O(1) access
2. **Types first** — define the contract, other files import it (slices' `PayloadAction<T>` depend on it)
3. **Normalized check-ins** — date → `{ habitId: done }`, streak/query easy
4. **RTK slices + redux-persist** — every store auto-saves to localStorage (refresh-safe)
5. **Immer** — write mutation-style code, get immutable state; Redux's one rule stays: no mutations outside reducers
6. **Typed hooks + selectors** — `useAppSelector`/`useAppDispatch` read and write with full type safety; selectors keep read logic in one file
7. **PersistGate** — never render before `REHYDRATE` lands (no empty-state flash)

---

## So Here's the Takeaway

Data layer complete — 4 slices (habits, tasks, prefs, auth), one store, `redux-persist` for refresh-safety, typed hooks for React. This is the backbone of the whole app. UI (T.4-T.6) will consume it through `useAppSelector` + `useAppDispatch`. Now the next step (T.3) — **generic custom hooks** (`useFetch<T>`) and wiring the Tasks page into the store. The `useReducer` part is gone — the tasks slice already *is* a reducer.

---

## In Your Own Words

1. Why are habit check-ins stored as `date → { habitId: done }` in normalized state? What's the difference from the nested approach?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Normalized check-ins are date-keyed objects. A check-in update = one nested assignment, streak calculation = pull that habit's dates from the matching date objects, "how many habits done today" = `checkIns[date]` directly — all O(1). Nested (an array inside the habit) requires traversing the entire array on every update, and a query (all habits per day) requires scanning the whole array. Normalized state is the industry standard (Redux docs, Kanban board in 6.6) — crucial for large apps to scale.

</details>

2. Inside `createSlice` reducers, `state.habits[id] = habit` looks like it violates Redux's "never mutate" rule. Why is it safe?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `createSlice` wraps your reducer in Immer. Inside the reducer, `state` is a Proxy ("draft") that records every write you make. Immer replays those writes onto a copy and produces a brand-new immutable state object. So the rule isn't "you can't write mutably" — it's "you can't mutate state *outside* a slice reducer", and "never assign a new object to `state` itself" (Immer throws on that). Direct writes to draft properties are exactly what Immer is for.

</details>

3. Why `redux-persist` + `PersistGate` instead of calling `localStorage.setItem` inside every action?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Persisting inside actions couples every write to storage code, duplicates the save logic N times, and mixes side effects into reducers (reducers must stay pure). `redux-persist` does it generically: `persistReducer` watches every dispatch and writes the store, and on startup `persistStore` reads the snapshot and dispatches `REHYDRATE`. `PersistGate` blocks `<App />` until that rehydrate lands — otherwise the first render sees empty state, then flashes when storage fills in. You also get `version` + migrations for free when the shape changes later, and `whitelist` to exclude slices that shouldn't persist.

</details>

4. Why is the auth store "dummy"? What's different from real auth?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because it's a pure frontend app — no backend. Dummy auth just stores `isLoggedIn` + user in localStorage via redux-persist — a login/logout toggle. Real auth has password hashing, tokens, sessions, server verification — which requires a backend. Our focus is the protected routing pattern (Batch 3.3) — only logged-in users can access. The routing concept is the same; the security layer is a backend concern outside this course's scope.

</details>

5. What's the benefit of typed `useAppSelector` with a selector function (e.g. `selectIsHabitDone`) over subscribing to the entire store?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `useAppSelector` re-renders the component only when the *selected value* (the boolean from `selectIsHabitDone`) changes — not when any other slice changes. Subscribing to the entire store (`useAppSelector((s) => s)`) re-renders on every dispatch anywhere — every keystroke in the task input would re-render the habit cards. The selector also keeps read logic in one file — if the `checkIns` shape changes, `selectors.ts` changes, not every component. And because `RootState` flows through `withTypes`, a wrong path like `s.habit.checkIns` is a compile-time error, not a runtime `undefined`.

</details>
