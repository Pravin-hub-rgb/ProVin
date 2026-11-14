Picking up from the last file — T.1 through T.7 built TrackIt's entire production-grade app: setup, Redux store, hooks, router, habits, dashboard, animations, error boundary, security. Now **T.8 — Final Polish**: tests (Vitest + RTL), build, deploy, and README. The last step of your portfolio project.

So here's the situation...

---

## Coder Mindset — Completing the Capstone

The last three requirements for a production app (from Batch 7):

| Thing | What it does |
|-------|------|
| **Tests** | Verify core pieces — regression protection |
| **Build + Deploy** | Production bundle + live URL |
| **README** | Portfolio face — the first thing recruiters read |

These steps turn your app from a "side project" into a "portfolio project."

---

## Part 1 — Testing Setup

Test dependencies were installed in T.1. Now the config + setup file:

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
```

```ts
// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
```

Add the script to `package.json`:

```json
// package.json
{
  "scripts": {
    "test": "vitest"
  }
}
```

---

## Part 2 — Tests

Write tests for TrackIt's core pieces — the most important parts.

### Test 1 — `habitsSlice` reducer (pure logic — fastest + highest value)

Create new file — `src/stores/__tests__/habitsSlice.test.ts`:

```ts
// src/stores/__tests__/habitsSlice.test.ts
import { describe, it, expect } from "vitest";
import habitsReducer, {
  addHabit,
  toggleCheckIn,
  deleteHabit,
} from "../habitsSlice";
import { selectIsHabitDone, selectCheckInCount } from "../selectors";
import type { Habit } from "../../types";

const habit: Habit = {
  id: "h1",
  title: "Workout",
  emoji: "🏋️",
  color: "blue",
  createdAt: "2026-08-04",
};

describe("habitsSlice reducer", () => {
  it("addHabit adds a habit", () => {
    const state = habitsReducer(undefined, addHabit(habit));
    expect(state.habits.h1.title).toBe("Workout");
  });

  it("toggleCheckIn flips done (normalized)", () => {
    let state = habitsReducer(undefined, addHabit(habit));
    state = habitsReducer(state, toggleCheckIn({ date: "2026-08-04", habitId: "h1" }));
    expect(state.checkIns["2026-08-04"]["h1"]).toBe(true);

    // flip again — back to false
    state = habitsReducer(state, toggleCheckIn({ date: "2026-08-04", habitId: "h1" }));
    expect(state.checkIns["2026-08-04"]["h1"]).toBe(false);
  });

  it("selectors read the toggled state (RootState-shaped input)", () => {
    let state = habitsReducer(undefined, addHabit(habit));
    state = habitsReducer(state, toggleCheckIn({ date: "2026-08-04", habitId: "h1" }));

    const rootState = {
      habits: state,
      tasks: { tasks: [], filter: "all" as const },
      prefs: { theme: "light" as const },
      auth: { isLoggedIn: false, user: null },
    };
    expect(selectIsHabitDone(rootState, "2026-08-04", "h1")).toBe(true);
    expect(selectCheckInCount(rootState, "2026-08-04")).toBe(1);
  });

  it("deleteHabit removes a habit", () => {
    let state = habitsReducer(undefined, addHabit(habit));
    state = habitsReducer(state, deleteHabit("h1"));
    expect(state.habits.h1).toBeUndefined();
  });
});
```

**Pure reducer + action-creator test = no rendering, no DOM, no store setup — the fastest and most reliable test.** The selectors are plain functions too — you feed them a `RootState`-shaped object by hand and assert on the output. No React involved either.

### Test 2 — `tasksSlice` reducer (the rest of the core logic)

Create new file — `src/stores/__tests__/tasksSlice.test.ts`:

```ts
// src/stores/__tests__/tasksSlice.test.ts
import { describe, it, expect } from "vitest";
import tasksReducer, {
  addTask,
  toggleTask,
  deleteTask,
  setFilter,
} from "../tasksSlice";
import type { Task } from "../../types";

const task: Task = {
  id: "t1",
  title: "Code review",
  completed: false,
  priority: "high",
  createdAt: "2026-08-04",
};

describe("tasksSlice reducer", () => {
  it("addTask adds a new task", () => {
    const state = tasksReducer(undefined, addTask(task));
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0].title).toBe("Code review");
  });

  it("toggleTask flips completed", () => {
    let state = tasksReducer(undefined, addTask(task));
    state = tasksReducer(state, toggleTask("t1"));
    expect(state.tasks[0].completed).toBe(true);
  });

  it("deleteTask removes a task", () => {
    let state = tasksReducer(undefined, addTask(task));
    state = tasksReducer(state, deleteTask("t1"));
    expect(state.tasks).toHaveLength(0);
  });

  it("setFilter updates the filter", () => {
    const state = tasksReducer(undefined, setFilter("active"));
    expect(state.filter).toBe("active");
  });
});
```

### Test 3 — `useHabits` hook (fresh store per test)

The `useHabits` hook reads and writes the store — so testing it needs a store. The trap: **importing the real store shares it across every test** (module-level singleton — same problem as the old `setState({...})` reset). The clean fix — build a **fresh, non-persisted store** from the exported `rootReducer` (T.2), which has the same reducers but no localStorage and no rehydrate timing:

```tsx
// src/hooks/__tests__/useHabits.test.tsx
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect } from "vitest";
import type { ReactNode } from "react";
import { rootReducer } from "../../stores/store";
import { useHabits } from "../useHabits";
import type { Habit } from "../../types";

const habit: Habit = {
  id: "h1",
  title: "Workout",
  emoji: "🏋️",
  color: "blue",
  createdAt: "2026-08-04",
};

// Fresh store per test — same reducers, zero persistence, zero shared state
function makeWrapper() {
  const testStore = configureStore({ reducer: rootReducer });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={testStore}>{children}</Provider>;
  };
}

describe("useHabits (fresh store per test)", () => {
  it("addHabit + toggleCheckIn flow", () => {
    const { result } = renderHook(() => useHabits(), { wrapper: makeWrapper() });

    act(() => result.current.addHabit(habit));
    expect(result.current.habits.h1.title).toBe("Workout");

    act(() => result.current.toggleCheckIn("2026-08-04", "h1"));
    expect(result.current.isHabitDone("2026-08-04", "h1")).toBe(true);
    expect(result.current.getCheckInCount("2026-08-04")).toBe(1);
  });

  it("streak counts today's check-in", () => {
    const { result } = renderHook(() => useHabits(), { wrapper: makeWrapper() });
    const today = new Date().toISOString().slice(0, 10);

    act(() => result.current.addHabit(habit));
    act(() => result.current.toggleCheckIn(today, "h1"));
    expect(result.current.getStreak("h1")).toBe(1);
  });
});
```

**Store + hook test pattern:** fresh store per test via `configureStore({ reducer: rootReducer })` — no `beforeEach` cleanup needed, no localStorage pollution, no `REHYDRATE` wait. Each test gets a blank slate by construction, not by reset.

### Test 4 — `ProtectedRoute` (component — access control)

Create new file — `src/components/__tests__/ProtectedRoute.test.tsx`:

```tsx
// src/components/__tests__/ProtectedRoute.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect } from "vitest";
import { ProtectedRoute } from "../ProtectedRoute";
import { rootReducer } from "../../stores/store";
import { login } from "../../stores/authSlice";

function loggedOutStore() {
  return configureStore({ reducer: rootReducer });   // auth starts logged out
}

function loggedInStore() {
  const testStore = configureStore({ reducer: rootReducer });
  testStore.dispatch(login("Amit"));                  // action, not setState
  return testStore;
}

describe("ProtectedRoute", () => {
  it("renders children when logged in", () => {
    render(
      <Provider store={loggedInStore()}>
        <MemoryRouter>
          <ProtectedRoute>
            <h1>Secret Dashboard</h1>
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Secret Dashboard")).toBeInTheDocument();
  });

  it("redirects to /login when logged out", () => {
    render(
      <Provider store={loggedOutStore()}>
        <MemoryRouter initialEntries={["/habits"]}>
          <ProtectedRoute>
            <h1>Secret</h1>
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    // Navigate → login route — use test navigation assertion
    // (redirect check needs Router context — simple render doesn't show children)
    expect(screen.queryByText("Secret")).not.toBeInTheDocument();
  });
});
```

**Why fresh stores instead of `setState` resets:** the real exported `store` is a module-level singleton — tests would leak login state into each other and into `localStorage`. A per-test store (`configureStore({ reducer: rootReducer })`) has no persistence and no shared state; you set up the scenario by **dispatching actions** (`dispatch(login("Amit"))`), exactly like the app does. No reset hooks needed.

**Why `MemoryRouter`:** In tests, there's no real browser URL. `MemoryRouter` keeps the URL in memory (a history array) — you can set the starting URL with `initialEntries`. `ProtectedRoute` uses `<Navigate>` for redirects — which needs Router context. Plain rendering breaks without it. `MemoryRouter` provides that context in tests.

---

## Running the Tests

```bash
bun run test
# npm: npm run test
```

```
 ✓ src/stores/__tests__/habitsSlice.test.ts (4 tests)
 ✓ src/stores/__tests__/tasksSlice.test.ts (4 tests)
 ✓ src/hooks/__tests__/useHabits.test.tsx (2 tests)
 ✓ src/components/__tests__/ProtectedRoute.test.tsx (2 tests)

   Test Files  4 passed (4)
        Tests  12 passed (12)
```

**12 tests** — reducers, selectors, hooks, routing — the core logic is protected.

---

## Part 3 — Build

Production build:

```bash
bun run build
# npm: npm run build
```

Output:

```
dist/index.html                    0.45 kB │ gzip: 0.28 kB
dist/assets/index-DcP2b5sB.js  321.55 kB │ gzip: 88.10 kB
```

**Lazy-loaded chunks** (from T.4's `React.lazy`) appear as separate files:

```
dist/assets/Dashboard-abc123.js    45.2 kB │ gzip: 14.1 kB
dist/assets/Habits-def456.js       30.1 kB │ gzip: 9.8 kB
dist/assets/Tasks-ghi789.js        28.4 kB │ gzip: 9.2 kB
```

Small initial bundle + pages load on demand — **code splitting is working** (T.4). Production preview:

```bash
bun run preview
# npm: npm run preview
```

---

## Part 4 — Deploy (Vercel)

T.1 has the `.env` file (`VITE_QUOTE_API_URL`). Deploy:

**Push to GitHub:**

```bash
git init
git add .
git commit -m "TrackIt: production-grade habit tracker capstone"
git branch -M main
git remote add origin https://github.com/yourname/trackit.git
git push -u origin main
```

**On Vercel:**
1. Import your project at [vercel.com](https://vercel.com) (from your GitHub repo)
2. Framework: Vite (auto-detected)
3. Env vars: `VITE_QUOTE_API_URL=https://api.quotable.io/random`
4. Click Deploy — you'll get a URL like `https://trackit.vercel.app`

**Continuous Deployment:** Every push to GitHub → Vercel auto-builds + auto-deploys.

---

## Part 5 — README (Portfolio Face)

Create `README.md` in the root:

```markdown
# 🏁 TrackIt — Habit Tracker + Dashboard

TrackIt is a habit tracker + dashboard app — daily habit check-ins, streaks,
tasks, and progress visualization. A production-grade React + TypeScript capstone.

## Tech Stack
- React 19 + TypeScript
- Vite + Tailwind CSS
- Redux Toolkit + redux-persist (state + persist)
- React Router (protected + lazy routes)
- Framer Motion (animations)
- Vitest + React Testing Library (12 tests)

## Features
- 📋 Habit CRUD + daily check-in
- 🔥 Streak tracking (with grace period)
- 📊 Dashboard — weekly completion chart
- 💬 Motivational quote (public API, useFetch<T>)
- 📝 Tasks — Redux Toolkit slice (Immer reducers)
- 🔐 Protected routes (dummy auth, RTK authSlice)
- 🌙 Light/dark theme (prefs slice + redux-persist)
- 🛡️ Error boundary + security hygiene
- 🎬 Page + card animations (Framer Motion)

## Setup
bun install
# npm: npm install
bun run dev
# npm: npm run dev

## Scripts
- `bun run dev` — development server
- `bun run build` — production build
- `bun run preview` — test production build locally
- `bun run test` — run tests

## Deployed At
[Live Demo URL — https://trackit.vercel.app]
```

---

## Verification Checklist (recap from 7.5)

After deploying, check:

| Check | What to do |
|-------|-----|
| **Live URL** | Open on mobile — responsive? |
| **Login flow** | Enter name → dashboard → refresh → still logged in (`redux-persist` REHYDRATE works)? |
| **Habits** | Add → check-in → streak — refresh → data persists (check `persist:trackit` in DevTools → Application → localStorage)? |
| **Quote** | Dashboard shows the quote? |
| **Lighthouse** | Performance + accessibility score |
| **Console** | No errors? |

---

## What T.8 Taught Us — Capstone Complete

1. **Pure logic tests** — slice reducers + selectors are fastest + most reliable
2. **Fresh store per test** — `configureStore({ reducer: rootReducer })`, no singleton resets
3. **Hook tests** — `renderHook` + `Provider` wrapper (RTK needs it)
4. **Component tests** — `MemoryRouter` for routing tests
5. **Build + code splitting** — lazy chunks, small initial bundle
6. **Deploy** — Vercel + env vars + continuous deployment
7. **README** — portfolio face, tech stack + features + live URL

---

## So Here's the Takeaway — TrackIt Complete 🎉

**TrackIt is fully ready:**

| Layer | What it has |
|-------|------|
| Data | Redux Toolkit + redux-persist (habits, tasks, prefs, auth) |
| Logic | RTK slices + custom hooks (useFetch, useHabits, useTheme) |
| Navigation | Router — protected + lazy |
| UI | Tailwind responsive + accessible + Framer Motion |
| Safety | Error boundary + security hygiene |
| Quality | 12 tests + production build + deploy |

This is your **main resume + portfolio project**. Every batch (1-7) is combined here — production-grade, deployed, tested.

**Your next step:** Put the live URL in the README, take a screenshot, post it on LinkedIn/GitHub. Portfolio ready!

---

## In Your Own Words

1. Why are the slice reducer tests the fastest and most reliable?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because slice reducers are **pure functions** — same input always gives the same output, no side effects, no DOM, no rendering, no network, and no store in between. The test calls `habitsReducer(undefined, addHabit(habit))` and asserts on the returned state. No `act()`, no `render`, no waiting. That's why it runs in microseconds and is 100% deterministic. Selectors are the same story — plain functions over a hand-built `RootState`. Pure logic is always the highest value + lowest cost to test.

</details>

2. Why use `MemoryRouter` in the `ProtectedRoute` test? What's different from regular rendering?

<details>
<summary>Show Answer</summary>

**Sample Answer:** In the test environment there's no real browser URL. `MemoryRouter` keeps the URL in memory (a history array) — you can set the initial URL with `initialEntries`. `ProtectedRoute` uses `<Navigate>` for redirects, which needs Router context. Regular rendering (without a router) would throw an error because `<Navigate>` can't find the router context. `MemoryRouter` provides that context so routing can be tested.

</details>

3. Why build a fresh store per test (`configureStore({ reducer: rootReducer })`) instead of reusing the real store with `setState` resets?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The real store is a module-level singleton wired to `redux-persist` — shared by every test, synced to jsdom's `localStorage`, and its rehydration is async. Tests would leak into each other and assert on stale, rehydrated state. A fresh store per test (`configureStore({ reducer: rootReducer })`) reuses the exact same reducers with zero persistence and zero shared state — you set up each scenario by dispatching actions (`dispatch(login("Amit"))`), exactly like the app does. No `beforeEach` resets, no localStorage cleanup, no rehydrate timing — each test starts from blank by construction, which is deterministic and parallel-safe.

</details>

4. Why do lazy-loaded chunks appear as separate files in the build output, and what's the benefit?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because T.4 used `React.lazy` + dynamic imports, each page (Dashboard, Habits, Tasks) gets bundled into its own chunk. Benefit: the initial bundle only loads what's needed for the first page — small, fast. Other pages load on demand when the user navigates to them. The Dashboard (with heavy charts) loads only when the user hits `/`. Code splitting → faster initial load → better UX and Lighthouse scores.

</details>

5. What are the 3 most critical verification checks after deployment?

<details>
<summary>Show Answer</summary>

**Sample Answer:** (1) **Login + refresh persistence** — log in, see the Dashboard, refresh, still logged in (redux-persist rehydrated the auth slice from `persist:trackit`). If this fails, `PersistGate`/`redux-persist` setup is wrong. (2) **Habits data survives refresh** — add a habit, check it in, refresh, data is still there (the habits slice rehydrated). Verify `persist:trackit` in DevTools → Application tab. (3) **Production env var** — the quote API URL points to the real API, not `localhost`. These three verify that data persistence and environment configuration work in production — the app's core survives browser refresh and deployment.

</details>
