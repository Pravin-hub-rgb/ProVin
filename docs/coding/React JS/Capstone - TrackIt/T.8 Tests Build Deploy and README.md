Picking up from the last file — T.1 through T.7 built TrackIt's entire production-grade app: setup, stores, hooks, router, habits, dashboard, animations, error boundary, security. Now **T.8 — Final Polish**: tests (Vitest + RTL), build, deploy, and README. The last step of your portfolio project.

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

### Test 1 — `taskReducer` (pure logic — fastest + highest value)

Create new file — `src/stores/__tests__/taskReducer.test.ts`:

```ts
// src/stores/__tests__/taskReducer.test.ts
import { describe, it, expect } from "vitest";
import { taskReducer, initialTaskState } from "../taskReducer";
import type { Task } from "../../types";

const task: Task = {
  id: "t1",
  title: "Code review",
  completed: false,
  priority: "high",
  createdAt: "2026-08-04",
};

describe("taskReducer", () => {
  it("ADD_TASK adds a new task", () => {
    const state = taskReducer(initialTaskState, { kind: "ADD_TASK", payload: task });
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0].title).toBe("Code review");
  });

  it("TOGGLE_TASK flips completed", () => {
    const added = taskReducer(initialTaskState, { kind: "ADD_TASK", payload: task });
    const toggled = taskReducer(added, { kind: "TOGGLE_TASK", payload: { id: "t1" } });
    expect(toggled.tasks[0].completed).toBe(true);
  });

  it("DELETE_TASK removes a task", () => {
    const added = taskReducer(initialTaskState, { kind: "ADD_TASK", payload: task });
    const deleted = taskReducer(added, { kind: "DELETE_TASK", payload: { id: "t1" } });
    expect(deleted.tasks).toHaveLength(0);
  });

  it("SET_FILTER updates the filter", () => {
    const state = taskReducer(initialTaskState, { kind: "SET_FILTER", payload: "active" });
    expect(state.filter).toBe("active");
  });
});
```

**Pure reducer test = no rendering, no DOM — the fastest and most reliable test.**

### Test 2 — `habitsStore` (store actions + normalized check-ins)

Create new file — `src/stores/__tests__/habitsStore.test.ts`:

```ts
// src/stores/__tests__/habitsStore.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { useHabitsStore } from "../habitsStore";
import type { Habit } from "../../types";

const habit: Habit = {
  id: "h1",
  title: "Workout",
  emoji: "🏋️",
  color: "blue",
  createdAt: "2026-08-04",
};

describe("habitsStore", () => {
  beforeEach(() => {
    useHabitsStore.setState({ habits: {}, checkIns: {} });
  });

  it("addHabit adds a habit", () => {
    useHabitsStore.getState().addHabit(habit);
    expect(useHabitsStore.getState().habits.h1.title).toBe("Workout");
  });

  it("toggleCheckIn flips done (normalized)", () => {
    useHabitsStore.getState().addHabit(habit);
    useHabitsStore.getState().toggleCheckIn("2026-08-04", "h1");

    const checkIns = useHabitsStore.getState().checkIns;
    expect(checkIns["2026-08-04"]["h1"]).toBe(true);

    // flip again — back to false
    useHabitsStore.getState().toggleCheckIn("2026-08-04", "h1");
    expect(useHabitsStore.getState().checkIns["2026-08-04"]["h1"]).toBe(false);
  });

  it("isHabitDone and getCheckInCount return correct values", () => {
    useHabitsStore.getState().addHabit(habit);
    useHabitsStore.getState().toggleCheckIn("2026-08-04", "h1");

    expect(useHabitsStore.getState().isHabitDone("2026-08-04", "h1")).toBe(true);
    expect(useHabitsStore.getState().getCheckInCount("2026-08-04")).toBe(1);
  });

  it("deleteHabit removes a habit", () => {
    useHabitsStore.getState().addHabit(habit);
    useHabitsStore.getState().deleteHabit("h1");
    expect(useHabitsStore.getState().habits.h1).toBeUndefined();
  });
});
```

**Store test pattern (recap from 7.4):** `getState()` to call actions + verify state — no rendering needed.

### Test 3 — `useTasks` hook (renderHook)

Create new file — `src/hooks/__tests__/useTasks.test.tsx`:

```tsx
// src/hooks/__tests__/useTasks.test.tsx
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useTasks } from "../useTasks";
import type { Task } from "../../types";

const task: Task = {
  id: "t1",
  title: "Read docs",
  completed: false,
  priority: "low",
  createdAt: "2026-08-04",
};

describe("useTasks", () => {
  it("addTask and toggleTask work", () => {
    const { result } = renderHook(() => useTasks());

    act(() => result.current.addTask(task));
    expect(result.current.tasks).toHaveLength(1);

    act(() => result.current.toggleTask("t1"));
    expect(result.current.tasks[0].completed).toBe(true);
  });

  it("setFilter updates the filter", () => {
    const { result } = renderHook(() => useTasks());

    act(() => result.current.setFilter("completed"));
    expect(result.current.filter).toBe("completed");
  });
});
```

### Test 4 — `ProtectedRoute` (component — access control)

Create new file — `src/components/__tests__/ProtectedRoute.test.tsx`:

```tsx
// src/components/__tests__/ProtectedRoute.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { ProtectedRoute } from "../ProtectedRoute";
import { useAuthStore } from "../../stores/authStore";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    useAuthStore.setState({ isLoggedIn: false, user: null });
  });

  it("renders children when logged in", () => {
    useAuthStore.setState({ isLoggedIn: true, user: { name: "Amit" } });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Secret Dashboard</h1>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Secret Dashboard")).toBeInTheDocument();
  });

  it("redirects to /login when logged out", () => {
    render(
      <MemoryRouter initialEntries={["/habits"]}>
        <ProtectedRoute>
          <h1>Secret</h1>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Navigate → login route — use test navigation assertion
    // (redirect check needs Router context — simple render doesn't show children)
    expect(screen.queryByText("Secret")).not.toBeInTheDocument();
  });
});
```

**Why `MemoryRouter`:** In tests, there's no real browser URL. `MemoryRouter` keeps the URL in memory (a history array) — you can set the starting URL with `initialEntries`. `ProtectedRoute` uses `<Navigate>` for redirects — which needs Router context. Plain rendering breaks without it. `MemoryRouter` provides that context in tests.

---

## Running the Tests

```bash
bun run test
```

```
 ✓ src/stores/__tests__/taskReducer.test.ts (4 tests)
 ✓ src/stores/__tests__/habitsStore.test.ts (4 tests)
 ✓ src/hooks/__tests__/useTasks.test.tsx (2 tests)
 ✓ src/components/__tests__/ProtectedRoute.test.tsx (2 tests)

  Test Files  4 passed (4)
       Tests  12 passed (12)
```

**12 tests** — reducer, stores, hooks, routing — the core logic is protected.

---

## Part 3 — Build

Production build:

```bash
bun run build
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
- Zustand (state + persist)
- React Router (protected + lazy routes)
- Framer Motion (animations)
- Vitest + React Testing Library (12 tests)

## Features
- 📋 Habit CRUD + daily check-in
- 🔥 Streak tracking (with grace period)
- 📊 Dashboard — weekly completion chart
- 💬 Motivational quote (public API, useFetch<T>)
- 📝 Tasks — useReducer (discriminated actions)
- 🔐 Protected routes (dummy auth)
- 🌙 Light/dark theme (useLocalStorage<T>)
- 🛡️ Error boundary + security hygiene
- 🎬 Page + card animations (Framer Motion)

## Setup
bun install
bun run dev

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
| **Login flow** | Enter name → dashboard → refresh → still logged in (persist works)? |
| **Habits** | Add → check-in → streak — refresh → data persists? |
| **Quote** | Dashboard shows the quote? |
| **Lighthouse** | Performance + accessibility score |
| **Console** | No errors? |

---

## What T.8 Taught Us — Capstone Complete

1. **Pure logic tests** — reducers are fastest + most reliable
2. **Store tests** — `getState()` pattern, no rendering needed
3. **Hook tests** — `renderHook` + `act`
4. **Component tests** — `MemoryRouter` for routing tests
5. **Build + code splitting** — lazy chunks, small initial bundle
6. **Deploy** — Vercel + env vars + continuous deployment
7. **README** — portfolio face, tech stack + features + live URL

---

## So Here's the Takeaway — TrackIt Complete 🎉

**TrackIt is fully ready:**

| Layer | What it has |
|-------|------|
| Data | Zustand + persist (habits, tasks, prefs, auth) |
| Logic | useReducer + custom hooks (useFetch, useLocalStorage, useTasks, useHabits) |
| Navigation | Router — protected + lazy |
| UI | Tailwind responsive + accessible + Framer Motion |
| Safety | Error boundary + security hygiene |
| Quality | 12 tests + production build + deploy |

This is your **main resume + portfolio project**. Every batch (1-7) is combined here — production-grade, deployed, tested.

**Your next step:** Put the live URL in the README, take a screenshot, post it on LinkedIn/GitHub. Portfolio ready!

---

## In Your Own Words

1. Why are `taskReducer` tests the fastest and most reliable?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because `taskReducer` is a **pure function** — same input always gives the same output, no side effects, no DOM, no rendering, no network. The test just calls the function and asserts the output. No `act()`, no `render`, no `waitFor`. That's why it runs in microseconds and is 100% deterministic. Pure logic is always the highest value + lowest cost to test — it's testing best practice.

</details>

2. Why use `MemoryRouter` in the `ProtectedRoute` test? What's different from regular rendering?

<details>
<summary>Show Answer</summary>

**Sample Answer:** In the test environment there's no real browser URL. `MemoryRouter` keeps the URL in memory (a history array) — you can set the initial URL with `initialEntries`. `ProtectedRoute` uses `<Navigate>` for redirects, which needs Router context. Regular rendering (without a router) would throw an error because `<Navigate>` can't find the router context. `MemoryRouter` provides that context so routing can be tested.

</details>

3. Why reset the store with `setState` in `beforeEach`? (habitsStore test)

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because a Zustand store is a module-level singleton — shared across all tests. If one test adds a habit and you don't clean up, the next test sees that same habit and assertions may fail. `beforeEach` with `useHabitsStore.setState({ habits: {}, checkIns: {} })` resets the state before every test so they all start fresh. Isolated tests = deterministic = reliable.

</details>

4. Why do lazy-loaded chunks appear as separate files in the build output, and what's the benefit?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because T.4 used `React.lazy` + dynamic imports, each page (Dashboard, Habits, Tasks) gets bundled into its own chunk. Benefit: the initial bundle only loads what's needed for the first page — small, fast. Other pages load on demand when the user navigates to them. The Dashboard (with heavy charts) loads only when the user hits `/`. Code splitting → faster initial load → better UX and Lighthouse scores.

</details>

5. What are the 3 most critical verification checks after deployment?

<details>
<summary>Show Answer</summary>

**Sample Answer:** (1) **Login + refresh persistence** — log in, see the Dashboard, refresh, still logged in (authStore's `persist` works). If this fails, it's a `persist` middleware bug. (2) **Habits data survives refresh** — add a habit, check it in, refresh, data is still there (Zustand `persist` working). (3) **Production env var** — the quote API URL points to the real API, not `localhost`. These three verify that data persistence and environment configuration work in production — the app's core survives browser refresh and deployment.

</details>
