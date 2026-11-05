Picking up from the last file — T.2 built the data layer (4 slices: habits, tasks, prefs, auth + `store.ts` + typed hooks). Now **T.3 — Logic Layer**: wire the Tasks page into the store, and build the one generic hook the app still needs — **`useFetch<T>`** (Batch 6.2, rebuilt for this project).

So here's the situation...

---

## What Changed vs What Stayed the Same

| Same as before | Changed in this rewrite |
|-------|--------|
| Tasks are predictable, testable state | `useReducer` + `useTasks` wrapper are **gone** — the `tasksSlice` from T.2 *is* the reducer |
| `useFetch<T>` as the data-fetching hook | Unchanged — this part of T.3 stays as-is |
| Custom hooks as the composition layer | `useLocalStorage<T>` is **removed** — explained below |
| Tasks page reads/writes cleanly | Through `useAppSelector` / `useAppDispatch` — no local task state anywhere |

**Why `useReducer` disappeared:** `createSlice` is the same guarantee with the boilerplate removed — reducer + discriminated actions, enforced by TypeScript, with Immer on top. Keeping a hand-written `taskReducer.ts` next to `tasksSlice.ts` would mean two definitions of "what a task update is". One definition, one place — the slice.

---

## Step 1 — Wire the Tasks Page into the Store

This is the same `Tasks.tsx` the earlier draft built — same JSX, same filter logic — only the **source of the data** changed, not the UI:

```tsx
// src/pages/Tasks.tsx
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../stores/hooks";
import { selectTasks, selectTaskFilter } from "../stores/selectors";
import { addTask, toggleTask, deleteTask, setFilter } from "../stores/tasksSlice";
import type { Task } from "../types";

export function Tasks() {
  const tasks = useAppSelector(selectTasks);
  const filter = useAppSelector(selectTaskFilter);
  const dispatch = useAppDispatch();
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
    dispatch(addTask(task));          // action → store → tasksSlice reducer → localStorage (redux-persist)
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
            onClick={() => dispatch(setFilter(f))}
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
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <span className={task.completed ? "strike" : ""}>{task.title}</span>
            <button onClick={() => dispatch(deleteTask(task.id))}>🗑️</button>
          </li>
        ))}
        {filteredTasks.length === 0 && <li>No tasks</li>}
      </ul>
    </div>
  );
}
```

**The flow (follow the data):**

```
User clicks checkbox
  → dispatch(toggleTask(id))           Action object { type: "tasks/toggleTask", payload: id }
  → tasksSlice reducer flips completed  Immer produces new tasks array
  → store updated                        persist:trackit rewritten automatically
  → useAppSelector(selectTasks)          sees a new array reference
  → Tasks re-renders with the change
```

| Thing | What it does |
|-------|-----|
| `useAppSelector(selectTasks)` | Reads the tasks array — re-renders only when it changes |
| `useAppDispatch()` | Typed dispatch — every action you can send is known at compile time |
| `dispatch(addTask(task))` | The *event* "a task was added" — with payload. DevTools shows it |
| `(["all", "active", "completed"] as const)` | Readonly tuple — TypeScript enforces the exact literals |

**Note — why no `useTasks` wrapper this time:** the slice's actions are already good API (`addTask`, `toggleTask`...). A wrapper hook that just re-dispatches them adds a layer with no logic in it. Hooks earn their keep when they *compose* — read state, combine with other hooks, transform — not when they just rename calls.

---

## Step 2 — useFetch\<T\>

Now the one generic hook the app genuinely needs. Batch 6.2 built it; we rebuild it here because the Dashboard (T.6) fetches a quote with it. **Why?** This project needs it (fetch a quote) — and it's a best practice that reusable logic should live in its own hook.

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

## Step 3 — Why useLocalStorage Is Gone (and What Owns Persistence)

The previous draft of this file had a `useLocalStorage<T>` section — and honestly, it was redundant. Look at where theme would have lived:

- `prefsSlice` (T.2) → persisted via `redux-persist` → survives refresh
- `useLocalStorage("trackit-theme", ...)` → also writes `localStorage["trackit-theme"]`

Two write paths for the same data = **two sources of truth**. Refresh the page — which one wins? The app reads prefs from one, writes from the other, and a bug report becomes "the theme is weird after reload" with two suspects and no alibi.

**The rule:** state has exactly one owner. If a value is part of the app's global state (habits, tasks, theme, login), it lives in the store, and persistence goes through `redux-persist` — one key (`persist:trackit`), one rehydrate on startup. If a value is fully local to one component (input drafts, a toggle), it stays in `useState` — no persistence, no global store.

**Where `useLocalStorage<T>` still is the right tool:** apps without a store-based persistence setup — e.g., 6.2's context-free apps, small utilities. You already learned it there; TrackIt just doesn't need it because the store owns persistence. (`6.2` remains the reference for the lazy initializer + `as const` tuple pattern.)

---

## What T.3 Taught Us

1. **Slices replace useReducer boilerplate** — `createSlice` = reducer + discriminated actions + Immer, generated once
2. **UI reads through typed hooks** — `useAppSelector` for reads, `useAppDispatch` for writes; no local shadow copies of global state
3. **Hooks must compose, not just rename** — `useFetch` earns its place (logic + state + lifecycle); a `useTasks` wrapper that only re-dispatched added nothing
4. **One owner per piece of state** — store owns global/persisted state; `useState` owns local state; no third path
5. **`ignore` flag** — stale async responses must never overwrite fresh ones

---

## So Here's the Takeaway

The logic layer is done — components read from and write to the store through typed hooks, and `useFetch<T>` covers the one external data dependency (the quote). Next up (T.4) — **Router**: dynamic routes, protected routes, `useTheme` (now backed by the prefs slice), `React.lazy` + Suspense. The spine of navigation.

---

## In Your Own Words

1. Why did the separate `taskReducer.ts` + `useTasks` disappear in the RTK version? What did `createSlice` give that they didn't?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `createSlice` generates a reducer and action creators from one definition — `toggleTask` exists exactly once, both as the action type string and the action creator function. A hand-written `taskReducer.ts` duplicated that mapping and had to be kept in sync manually (add a case, forget the action type, type errors). It also adds Immer, so "never mutate" is enforced by construction. The `useTasks` wrapper only re-dispatched those actions with no extra logic — a layer with no composition. Less code, one source of truth, same guarantees.

</details>

2. In `Tasks.tsx`, nothing stores tasks in local component state. Where do the tasks actually live, and how does the checkbox click reach them?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Tasks live in the store's `tasks` slice (`state.tasks.tasks`). Clicking the checkbox dispatches `toggleTask(id)` — an action object — to the store. The tasks slice reducer flips `completed` on the matching task (through Immer), redux-persist writes the new store to localStorage, `useAppSelector(selectTasks)` sees a new array reference and the component re-renders with the updated list. UI → action → reducer → store → selector → re-render. No local copies, no sync bugs.

</details>

3. Why did `useLocalStorage` get removed from TrackIt even though it was previously "kept visible for the roadmap"?

<details>
<summary>Show Answer</summary>

**Sample Answer:** TrackIt persists through redux-persist — the whole store lives under one key (`persist:trackit`) and rehydrates on startup. Keeping `useLocalStorage("trackit-theme", ...)` for the theme meant two write paths and two sources of truth for the same value — one in the prefs slice, one in `"trackit-theme"`. After a refresh they could disagree. The rule — one piece of state, one owner — won. `useLocalStorage` is still the right tool in apps without a redux persistence setup (like 6.2's demos); TrackIt isn't one of them.

</details>

4. How does the `ignore` flag in `useFetch<T>` prevent race conditions?

<details>
<summary>Show Answer</summary>

**Sample Answer:** When the URL changes, the effect re-runs but the old effect's fetch might still be in flight. The `ignore` flag is set to `true` in the cleanup function. When the old response finally arrives, `if (!ignore)` fails — the stale data won't be set. On fast typing/search where multiple fetches run, `ignore` ensures only the latest URL's response calls `setData`. The race condition (old response arriving late and overwriting newer data) is prevented.

</details>

5. Why dispatch an action (`dispatch(toggleTask(id))`) instead of updating the tasks array directly in the component?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Direct mutation bypasses the one function that's allowed to change the store — the reducer. `dispatch` sends a plain action object (`{ type: "tasks/toggleTask", payload: id }`) through the store: the reducer produces new state, redux-persist saves it, and every subscriber (DevTools, selectors, other components) sees the same event. You get time-travel debugging, a single reproducible record of what happened ("who changed this task?"), and immutability enforced by Immer — no accidental in-place edits. The component states *what happened*, not *how state must change*.

</details>
