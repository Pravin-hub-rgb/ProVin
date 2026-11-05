Picking up from the last file — T.2 built the data layer (types, normalized habits store, tasks store, prefs store, auth store). Now **T.3 — Logic Layer**: two things —

1. Refactor the tasks store with **`useReducer`** (Batch 5.5 — discriminated union actions)
2. Build generic custom hooks: **`useFetch<T>`** and **`useLocalStorage<T>`** (Batch 6.2 — rebuilt for this project)

So here's the situation...

---

## Part 1 — Coder Mindset: Why Refactor the Tasks Store?

In T.2 the `tasksStore` was simple Zustand actions (`addTask`, `toggleTask`, ...). But in a real app, task state becomes complex:

- Need a filter (all/active/completed)
- Could sort by priority
- Multiple actions at once (delete + filter update)
- Future history/undo

When state transitions get numerous, **`useReducer`** is a better fit — all possible actions defined in one place, each action a pure function (reducer), state predictable. **Discriminated union** actions (Batch 5.5) — TypeScript enforces the shape of every action.

**T.2's store was simple — now we evolve it with `useReducer`.**

---

## Step 1 — Task Actions (Discriminated Union)

Create new file — `src/stores/taskReducer.ts`:

```ts
// src/stores/taskReducer.ts
import type { Task, FilterStatus } from "../types";

// Discriminated union — `kind` tells you which action it is
export type TaskAction =
  | { kind: "ADD_TASK"; payload: Task }
  | { kind: "TOGGLE_TASK"; payload: { id: string } }
  | { kind: "DELETE_TASK"; payload: { id: string } }
  | { kind: "SET_FILTER"; payload: FilterStatus };

export interface TaskState {
  tasks: Task[];
  filter: FilterStatus;
}

export const initialTaskState: TaskState = {
  tasks: [],
  filter: "all",
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.kind) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, completed: !t.completed } : t
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}
```

**Discriminated union (from 5.5):**

```
{ kind: "ADD_TASK"; payload: Task }     ← kind = "ADD_TASK"
{ kind: "TOGGLE_TASK"; payload: {...} } ← kind = "TOGGLE_TASK"
        │
        └── `kind` is different in each action — the discriminator
```

Inside `switch (action.kind)`, TypeScript narrows automatically — in `case "ADD_TASK"`, `action.payload` is automatically typed as `Task`. **Type-safe state management.**

**Why `kind` instead of `type` here?** The property name is just convention — both work fine. We use `kind` to avoid confusion with TypeScript's own `type` keyword. `kind` is clear — "what kind of action is this."

---

## Step 2 — useReducer Hook (useTasks)

Create a custom hook to use `useReducer`. New file — `src/hooks/useTasks.ts`:

```ts
// src/hooks/useTasks.ts
import { useReducer } from "react";
import { taskReducer, initialTaskState } from "../stores/taskReducer";
import type { Task, FilterStatus } from "../types";

export function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const addTask = (task: Task) => dispatch({ kind: "ADD_TASK", payload: task });
  const toggleTask = (id: string) => dispatch({ kind: "TOGGLE_TASK", payload: { id } });
  const deleteTask = (id: string) => dispatch({ kind: "DELETE_TASK", payload: { id } });
  const setFilter = (filter: FilterStatus) => dispatch({ kind: "SET_FILTER", payload: filter });

  return { ...state, addTask, toggleTask, deleteTask, setFilter };
}
```

**What this gives you:**

| Thing | What it does |
|-------|-----|
| `useReducer(taskReducer, initialTaskState)` | Reducer + initial state — returns `state` and `dispatch` |
| `dispatch({ kind: "ADD_TASK", payload: task })` | Dispatch an action — the reducer handles it |
| Wrapper functions | `addTask(task)` — the caller doesn't need to know the action shape |
| Return `...state` | Spreads `tasks` + `filter` — plus the action functions |

**Benefit:** All task logic lives in one place (`taskReducer.ts`) — predictable, testable (we test it in T.8), type-safe.

---

## Part 2 — Generic Custom Hooks

Now we build Batch 6.2's generic hooks for this project. **Why?** This project needs them (fetch a quote, persist theme) — and it's a best practice that reusable logic should live in its own hooks.

---

## Step 3 — useFetch\<T\>

New file — `src/hooks/useFetch.ts`:

```ts
// src/hooks/useFetch.ts
import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!ignore) setData(json as T);
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, isLoading, error };
}
```

**Key parts (recap from 6.2):**

| Thing | Why |
|-------|------|
| `<T>` generic | Can fetch any type — `Quote`, `Meal[]`, etc. |
| `ignore` flag | Prevents race conditions — old URL's response is ignored |
| `res.ok` check | Handles HTTP errors (404, 500) |
| `json as T` | Type assertion — caller told us what `T` is |
| `error instanceof Error` | Extracts message from Error object |

**How it's used in TrackIt:** Show a motivational quote on the Dashboard (T.6) — `useFetch<Quote>("...")`. `T` is the `Quote` type defined in T.2.

---

## Step 4 — useLocalStorage\<T\>

New file — `src/hooks/useLocalStorage.ts`:

```ts
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error("Couldn't save to localStorage:", err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
```

**What's happening (recap from 6.2):**

| Thing | Why |
|-------|------|
| Lazy initializer `useState(() => {...})` | localStorage is read only once on first render — efficient |
| `JSON.parse(item) as T` | Parse string + cast to type |
| `try/catch` | Falls back to `initialValue` on corrupt data |
| `useEffect` sync | Updates localStorage when `storedValue` changes |
| `as const` | Makes it a tuple — `[value, setValue]` like `useState` |

**How it's used in TrackIt:** Theme preference (T.4/T.6) — `useLocalStorage<Prefs["theme"]>("trackit-theme", "light")`. We also have Zustand `persist`, but this hook stays visible in the project (per the roadmap) — we'll use it for prefs.

---

## Integration — Using useTasks in the Tasks Page

Now plug the `useTasks` hook into a simple demo component. New file — `src/pages/Tasks.tsx`:

```tsx
// src/pages/Tasks.tsx
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types";

export function Tasks() {
  const { tasks, filter, addTask, toggleTask, deleteTask, setFilter } = useTasks();
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    const task: Task = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
    };
    addTask(task);
    setTitle("");
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="tasks-page">
      <h1>📝 Tasks</h1>

      <div className="add-task">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="filters">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={filter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.completed ? "strike" : ""}>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>🗑️</button>
          </li>
        ))}
        {filteredTasks.length === 0 && <li>No tasks</li>}
      </ul>
    </div>
  );
}
```

**The flow:**

```
User adds task → handleAdd → addTask(task) → dispatch(ADD_TASK)
    → taskReducer → new tasks array → state update → UI re-renders

User clicks filter → setFilter("active") → dispatch(SET_FILTER)
    → taskReducer → filter update → filteredTasks re-compute
```

**The `as const` filter array:** `(["all", "active", "completed"] as const).map(...)` — a readonly tuple, TypeScript enforces exact literals.

---

## What T.3 Taught Us

1. **`useReducer` = predictable state** — all actions in one place, discriminated union, type-safe `switch`
2. **Custom hooks for logic reuse** — `useTasks`, `useFetch`, `useLocalStorage` — reusable throughout the app
3. **Generic hooks** — `<T>` works with any type
4. **Wrapper actions** — hide complex dispatch shape from the caller
5. **`kind` vs `type`** — consistent property naming (the discriminator)
6. **Integration** — hook + reducer + store work together

---

## So Here's the Takeaway

Logic layer ready. Tasks are now predictable with `useReducer`, and hooks (`useFetch<T>`, `useLocalStorage<T>`) are reusable. Next up (T.4) — **Router**: dynamic routes, protected routes, `React.lazy` + Suspense. The spine of navigation.

---

## In Your Own Words

1. What are discriminated union actions, and what role does the `kind` property play?

<details>
<summary>Show Answer</summary>

**Sample Answer:** A discriminated union is a TypeScript pattern where each action object shares a common property (`kind`) that identifies the action's type. Like `{ kind: "ADD_TASK"; payload: Task }` vs `{ kind: "DELETE_TASK"; payload: { id } }`. `kind` is the "discriminator" — inside the reducer's `switch (action.kind)`, TypeScript narrows to the exact shape in each case. This means passing the wrong action shape becomes a compile-time error — type-safe state management.

</details>

2. Why is `useReducer` a better fit for tasks than simple Zustand actions?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Tasks have complex state — a filter, potentially priority sorting, multiple actions at once. With `useReducer`, all possible actions live in one place (`taskReducer.ts`), each handled by a pure function (the reducer), and all state transitions are predictable. Zustand is fine for simple actions, but when state-change patterns multiply, the reducer keeps state changes traceable — easier to debug, test, and extend. We test the reducer in T.8.

</details>

3. How does the `ignore` flag in `useFetch<T>` prevent race conditions?

<details>
<summary>Show Answer</summary>

**Sample Answer:** When the URL changes, the effect re-runs but the old effect's fetch might still be in flight. The `ignore` flag is set to `true` in the cleanup function. When the old response finally arrives, `if (!ignore)` fails — the stale data won't be set. On fast typing/search where multiple fetches run, `ignore` ensures only the latest URL's response calls `setData`. The race condition (old response arriving late and overwriting newer data) is prevented.

</details>

4. Why does `useLocalStorage` use a lazy initializer, and why does it return `as const`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The lazy initializer (`() => {...}`) runs only on the first render — reading from localStorage (relatively expensive) happens once, not on every render. `as const` turns the return type into a tuple — `readonly [T, (value) => void]` — so when you destructure (`const [theme, setTheme] = useLocalStorage(...)`), TypeScript gives you the correct types, not just `(T | function)[]`. This is the same pattern `useState` uses — a familiar interface.

</details>

5. Why wrap dispatch calls in wrapper functions (`addTask(task)` vs direct dispatch)?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Wrapper functions hide the action shape from the caller. Instead of the caller knowing `dispatch({ kind: "ADD_TASK", payload: task })`, they just call `addTask(task)` — intent-based, not implementation-based. Benefits: (a) cleaner API — the component states what it wants, not how; (b) if the action shape changes (restructure the payload), only the hook file changes, all components stay untouched; (c) consistency — every component uses the same wrappers, no duplicated action shapes.

</details>
