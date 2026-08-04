---

## Abhi Tak Kya Hua

T.2 mein data layer banaya — types, normalized habits store, tasks store, prefs store, auth store — sab Zustand + persist ke saath.

Ab **T.3 — Logic Layer**: do cheezein —
1. Tasks store ko **`useReducer`** se refactor karenge (Batch 5.5 — discriminated union actions)
2. Generic custom hooks banayenge: **`useFetch<T>`** aur **`useLocalStorage<T>`** (Batch 6.2 se — is project mein naye banayenge)

Toh aisa scene hai...

---

## Part 1 — Coder Mindset: Tasks Store Refactor Kyon?

T.2 mein `tasksStore` simple Zustand actions tha (`addTask`, `toggleTask`, ...). Lekin real app mein tasks state complex ho jati hai:

- Filter chahiye (all/active/completed)
- Priority sort karna ho sakta hai
- Multiple actions ek saath (delete + filter update)
- History/undo later

Jab state transitions bhout ho jate hain, **`useReducer`** better fit hai — saare possible actions ek jagah defined, har action ek pure function (reducer), state predictable. **Discriminated union** actions (Batch 5.5) — TypeScript har action ka shape enforce karta hai.

**T2 mein store simple tha — ab useReducer se evolve karte hain.**

---

## Step 1 — Task Actions (Discriminated Union)

Nayi file banao — `src/stores/taskReducer.ts`:

```ts
// src/stores/taskReducer.ts
import type { Task, FilterStatus } from "../types";

// Discriminated union — `kind` batata hai kaunsa action hai
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

**Discriminated union kya hai (yaad karo 5.5):**

```
{ kind: "ADD_TASK"; payload: Task }     ← kind = "ADD_TASK"
{ kind: "TOGGLE_TASK"; payload: {...} } ← kind = "TOGGLE_TASK"
        │
        └── `kind` property har action mein alag — discriminator
```

`switch (action.kind)` ke andar TypeScript narrow kar deta hai — `case "ADD_TASK"` mein `action.payload` ka type automatically `Task` hai. **Type-safe state management.**

**5.5 mein `type:` tha, yahan `kind:` kyun?** Property ka naam convention hai — dono theek hain. Hum `kind` use kar rahe hain kyunki `type` keyword se confusion ho sakta hai (TypeScript ka `type` alag cheez). `kind` clear hai — "is action ka kind kya hai".

---

## Step 2 — useReducer Hooks (useTasks)

`useReducer` use karne ke liye ek custom hook banate hain. Nayi file banao — `src/hooks/useTasks.ts`:

```ts
// src/hooks/useTasks.ts
import { useReducer } from "react";
import { taskReducer, initialTaskState, type TaskAction } from "../stores/taskReducer";
import type { Task } from "../types";

export function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const addTask = (task: Task) => dispatch({ kind: "ADD_TASK", payload: task });
  const toggleTask = (id: string) => dispatch({ kind: "TOGGLE_TASK", payload: { id } });
  const deleteTask = (id: string) => dispatch({ kind: "DELETE_TASK", payload: { id } });
  const setFilter = (filter: TaskAction extends infer T ? T : never) =>
    dispatch({ kind: "SET_FILTER", payload: filter });

  return { ...state, addTask, toggleTask, deleteTask, setFilter };
}
```

Hmm — `setFilter` ka type complex ho gaya. Simple karte hain — `FilterStatus` directly:

```ts
// src/hooks/useTasks.ts (revised)
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

**Kya mila:**

| Cheez | Kya |
|-------|-----|
| `useReducer(taskReducer, initialTaskState)` | Reducer + initial state — state aur dispatch |
| `dispatch({ kind: "ADD_TASK", payload: task })` | Action dispatch — reducer usse handle karta hai |
| Wrapper functions | `addTask(task)` — caller ko action shape nahi batana padta |
| Return `...state` | `tasks` + `filter` spread — plus actions |

**Fayda:** Saari task logic ek jagah (taskReducer.ts) — predictable, test-able (T.8 mein reducer test karenge), type-safe.

---

## Part 2 — Generic Custom Hooks

Ab Batch 6.2 ke generic hooks is project ke liye naye banate hain. **Kyun?** Is project mein inki zaroorat hai (quote fetch, theme persist) — aur best practice yeh hai ki reusable logic apne hooks mein ho.

---

## Step 3 — useFetch<T>

Nayi file banao — `src/hooks/useFetch.ts`:

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
          setError(err instanceof Error ? err.message : "Kuch gadbad hui");
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

**Key parts (6.2 se yaad):**

| Cheez | Kyun |
|-------|------|
| `<T>` generic | Koi bhi type fetch kar sakta hai — `Quote`, `Meal[]`, etc. |
| `ignore` flag | Race condition prevent — purana URL ka response ignore |
| `res.ok` check | HTTP errors handle (404, 500) |
| `json as T` | Type assertion — caller ne bataya T kya hai |
| `error instanceof Error` | Error object se message nikaalo |

**TrackIt mein kaise use hoga:** Dashboard (T.6) pe motivational quote — `useFetch<Quote>("...")`. T: `Quote` type jo T.2 mein define kiya.

---

## Step 4 — useLocalStorage<T>

Nayi file banao — `src/hooks/useLocalStorage.ts`:

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
      console.error("localStorage set nahi kar paya:", err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
```

**Kya ho raha hai (6.2 se):**

| Cheez | Kyun |
|-------|------|
| Lazy initializer `useState(() => {...})` | localStorage read sirf pehli render pe — efficient |
| `JSON.parse(item) as T` | String ko parse karo + type cast |
| `try/catch` | Corrupt data pe fallback — initialValue |
| `useEffect` sync | `storedValue` change pe localStorage update |
| `as const` | Tuple type — `[value, setValue]` — same as useState |

**TrackIt mein kaise use hoga:** Theme preference (T.4/T.6 mein) — `useLocalStorage<Prefs["theme"]>("trackit-theme", "light")`. Zustand `persist` bhi hai, lekin `useLocalStorage` ko project mein visible rakhna hai (roadmap spec) — prefs ke liye yahi hook use karenge.

---

## Integration — Tasks Page Mein useTasks

Ab `useTasks` hook ko ek simple demo component mein use karte hain. Nayi file banao — `src/pages/Tasks.tsx`:

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
          placeholder="Naya task..."
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
        {filteredTasks.length === 0 && <li>Koi task nahi</li>}
      </ul>
    </div>
  );
}
```

**Flow:**

```
User task add karta hai → handleAdd → addTask(task) → dispatch(ADD_TASK)
    → taskReducer → nayi tasks array → state update → UI re-render

User filter click karta hai → setFilter("active") → dispatch(SET_FILTER)
    → taskReducer → filter update → filteredTasks re-compute
```

**`as const` filter array:** `(["all", "active", "completed"] as const).map(...)` — readonly tuple, TypeScript exact literals enforce karta hai (6.1 mein seekha).

---

## What T.3 Taught Us

1. **useReducer = predictable state** — saare actions ek jagah, discriminated union, type-safe switch
2. **Custom hooks = logic reuse** — `useTasks`, `useFetch`, `useLocalStorage` — reusable across app
3. **Generic hooks** — `<T>` se kisi bhi type ke saath kaam
4. **Wrapper actions** — dispatch ka complex shape caller se chhupao
5. **`kind` vs `type`** — property naming consistency (discriminator)
6. **Integration** — hook + reducer + store — sab ek saath

---

## So Here's the Takeaway

Logic layer ready. Tasks ab `useReducer` se predictable, hooks (`useFetch<T>`, `useLocalStorage<T>`) reusable. Ab agla step (T.4) — **Router**: dynamic routes, protected routes, `React.lazy` + Suspense. Navigation ka spine.

---

## In Your Own Words

1. Discriminated union actions kya hain, aur `kind` property ka kya role hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Discriminated union ek TypeScript pattern hai jisme har action object mein ek common property (`kind`) hoti hai jo action ka type batati hai. Jaise `{ kind: "ADD_TASK"; payload: Task }` vs `{ kind: "DELETE_TASK"; payload: { id } }`. `kind` hi "discriminator" hai — reducer mein `switch (action.kind)` se TypeScript har case mein action ka exact shape narrow kar deta hai. Isse galat action bhejna compile-time error deta hai — type-safe state management.

</details>

2. `useReducer` vs simple Zustand actions — tasks ke liye useReducer kyon better fit hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Tasks ki state complex hai — filter, priority, multiple actions. `useReducer` mein saare possible actions ek jagah (taskReducer.ts) defined hote hain, har action ek pure function (reducer) handle karta hai, aur state transitions predictable hain. Zustand simple actions ke liye kaafi hai, lekin jab state changes ke patterns bhout ho jate hain, reducer state ko "how did we get here" traceable banata hai — easier to debug, test, aur extend (T.8 mein reducer test karenge).

</details>

3. `useFetch<T>` mein `ignore` flag race condition se kaise bachata hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Jab URL change hota hai (effect re-run), purana effect ka fetch abhi bhi chal raha hota hai. `ignore` flag effect cleanup mein `true` ho jaata hai. Purana response jab aayega, `if (!ignore)` check fail hoga — galat data set nahi hoga. Fast typing/search mein multiple fetches chalti hain — ignore ensure karta hai ki sirf latest URL ka response setData kare, purane ignore ho jayen. Race condition (purana response baad mein aa kar naya data overwrite karna) prevent hota hai.

</details>

4. `useLocalStorage` lazy initializer kyun use karta hai, aur `as const` return kyun?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Lazy initializer (`() => {...}`) sirf pehli render pe chalta hai — localStorage read (expensive) ek baar hi hota hai, har render pe nahi. `as const` return type ko tuple banata hai — `readonly [T, (value) => void]` — taaki destructuring (`const [theme, setTheme] = useLocalStorage(...)`) ko TypeScript sahi types de, sirf `(T | function)[]` nahi. Yehi pattern `useState` return karta hai — familiar interface.

</details>

5. `useTasks` wrapper functions kyon banaye — `dispatch({ kind: "ADD_TASK", payload: task })` seedha use karne se kya fark hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Wrapper functions caller (components) ko action shape se chhupate hain. Caller ko `addTask(task)` bolna padta hai — complex `dispatch({ kind: "ADD_TASK", payload: task })` nahi. Fayda: (a) cleaner API — component sirf intent bataata hai, implementation nahi; (b) agar action shape badle (jaise payload restructure), sirf hook file change hogi, saare components untouched; (c) consistency — har component wahi wrappers use karta hai, action shape kahin duplicate nahi.

</details>