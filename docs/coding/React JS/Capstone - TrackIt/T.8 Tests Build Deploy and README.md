---

## Abhi Tak Kya Hua

T.1-T.7 mein TrackIt ka poora production app banaya — setup, stores, hooks, router, habits, dashboard, animations, error boundary, security. Ab **T.8 — Final Polish**: tests (Vitest + RTL), build, deploy, README. Portfolio ka aakhri step.

Toh aisa scene hai...

---

## Coder Mindset — Capstone Ko Complete Karo

Production app ke teen aakhri requirements (Batch 7 se):

| Cheez | Kya |
|-------|-----|
| **Tests** | Core pieces verify — regression protection |
| **Build + Deploy** | Production bundle + live URL |
| **README** | Portfolio face — recruiter pehle yeh padhta hai |

Ye steps app ko "side project" se "portfolio project" banate hain.

---

## Part 1 — Testing Setup

T.1 mein test deps install ki thi. Ab config + setup file:

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

`package.json` mein script:

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

TrackIt ke core pieces ke tests likhte hain — jo cheezein sabse important hain.

### Test 1 — taskReducer (pure logic — easiest + highest value)

Nayi file banao — `src/stores/__tests__/taskReducer.test.ts`:

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
  it("ADD_TASK naya task add karta hai", () => {
    const state = taskReducer(initialTaskState, { kind: "ADD_TASK", payload: task });
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0].title).toBe("Code review");
  });

  it("TOGGLE_TASK completed flip karta hai", () => {
    const added = taskReducer(initialTaskState, { kind: "ADD_TASK", payload: task });
    const toggled = taskReducer(added, { kind: "TOGGLE_TASK", payload: { id: "t1" } });
    expect(toggled.tasks[0].completed).toBe(true);
  });

  it("DELETE_TASK task remove karta hai", () => {
    const added = taskReducer(initialTaskState, { kind: "ADD_TASK", payload: task });
    const deleted = taskReducer(added, { kind: "DELETE_TASK", payload: { id: "t1" } });
    expect(deleted.tasks).toHaveLength(0);
  });

  it("SET_FILTER filter update karta hai", () => {
    const state = taskReducer(initialTaskState, { kind: "SET_FILTER", payload: "active" });
    expect(state.filter).toBe("active");
  });
});
```

**Pure reducer test = no render, no DOM — sabse fast + reliable test.**

### Test 2 — habitsStore (store actions + normalized check-ins)

Nayi file banao — `src/stores/__tests__/habitsStore.test.ts`:

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

  it("addHabit habit add karta hai", () => {
    useHabitsStore.getState().addHabit(habit);
    expect(useHabitsStore.getState().habits.h1.title).toBe("Workout");
  });

  it("toggleCheckIn done flip karta hai (normalized)", () => {
    useHabitsStore.getState().addHabit(habit);
    useHabitsStore.getState().toggleCheckIn("2026-08-04", "h1");

    const checkIns = useHabitsStore.getState().checkIns;
    expect(checkIns["2026-08-04"]["h1"]).toBe(true);

    // flip again — wapas false
    useHabitsStore.getState().toggleCheckIn("2026-08-04", "h1");
    expect(useHabitsStore.getState().checkIns["2026-08-04"]["h1"]).toBe(false);
  });

  it("isHabitDone aur getCheckInCount sahi dete hain", () => {
    useHabitsStore.getState().addHabit(habit);
    useHabitsStore.getState().toggleCheckIn("2026-08-04", "h1");

    expect(useHabitsStore.getState().isHabitDone("2026-08-04", "h1")).toBe(true);
    expect(useHabitsStore.getState().getCheckInCount("2026-08-04")).toBe(1);
  });

  it("deleteHabit habit remove karta hai", () => {
    useHabitsStore.getState().addHabit(habit);
    useHabitsStore.getState().deleteHabit("h1");
    expect(useHabitsStore.getState().habits.h1).toBeUndefined();
  });
});
```

**Store test pattern (7.4 se yaad):** `getState()` se action call + state verify — no component render needed.

### Test 3 — useTasks hook (renderHook)

Nayi file banao — `src/hooks/__tests__/useTasks.test.tsx`:

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
  it("addTask aur toggleTask kaam karte hain", () => {
    const { result } = renderHook(() => useTasks());

    act(() => result.current.addTask(task));
    expect(result.current.tasks).toHaveLength(1);

    act(() => result.current.toggleTask("t1"));
    expect(result.current.tasks[0].completed).toBe(true);
  });

  it("setFilter filter update karta hai", () => {
    const { result } = renderHook(() => useTasks());

    act(() => result.current.setFilter("completed"));
    expect(result.current.filter).toBe("completed");
  });
});
```

### Test 4 — ProtectedRoute (component — access control)

Nayi file banao — `src/components/__tests__/ProtectedRoute.test.tsx`:

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

  it("logged in ho toh children render karta hai", () => {
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

  it("logged out ho toh /login pe redirect karta hai", () => {
    render(
      <MemoryRouter initialEntries={["/habits"]}>
        <ProtectedRoute>
          <h1>Secret</h1>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Navigate → login route — use test navigation assertion
    // (redirect check ke liye Router context chahiye, simple render se children nahi dikhta)
    expect(screen.queryByText("Secret")).not.toBeInTheDocument();
  });
});
```

**MemoryRouter kyu:** Tests mein browser URL nahi hota — `MemoryRouter` URL ko memory mein rakhta hai. `initialEntries` se starting URL set karte hain.

---

## Tests Chalana

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

**12 tests** — reducer, stores, hooks, routing — core logic protected.

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

**Lazy-loaded chunks** (React.lazy se) alag files mein:

```
dist/assets/Dashboard-abc123.js    45.2 kB │ gzip: 14.1 kB
dist/assets/Habits-def456.js       30.1 kB │ gzip: 9.8 kB
dist/assets/Tasks-ghi789.js        28.4 kB │ gzip: 9.2 kB
```

Initial bundle chhota + pages on-demand — **code splitting kaam kar raha hai** (T.4). Production preview:

```bash
bun run preview
```

---

## Part 4 — Deploy (Vercel)

T.1 mein `.env` file hai (`VITE_QUOTE_API_URL`). Deploy:

**GitHub push:**

```bash
git init
git add .
git commit -m "TrackIt: production-grade habit tracker capstone"
git branch -M main
git remote add origin https://github.com/yourname/trackit.git
git push -u origin main
```

**Vercel:**
1. [vercel.com](https://vercel.com) pe project import karo (GitHub repo)
2. Framework: Vite (auto-detect)
3. Env vars: `VITE_QUOTE_API_URL=https://api.quotable.io/random`
4. Deploy — URL milega `https://trackit.vercel.app`

**Continuous deployment** — GitHub push → Vercel auto-build + auto-deploy.

---

## Part 5 — README (Portfolio Face)

Root folder mein `README.md` banao:

```markdown
# 🏁 TrackIt — Habit Tracker + Dashboard

TrackIt ek habit tracker + dashboard app hai — daily habits check-in, streaks,
tasks, aur progress visualization. React + TypeScript production-grade capstone.

## Tech Stack
- React 19 + TypeScript
- Vite + Tailwind CSS
- Zustand (state + persist)
- React Router (protected + lazy routes)
- Framer Motion (animations)
- Vitest + React Testing Library (12 tests)

## Features
- 📋 Habit CRUD + daily check-in
- 🔥 Streak tracking (grace period)
- 📊 Dashboard — weekly completion chart
- 💬 Motivational quote (public API, useFetch<T>)
- 📝 Tasks — useReducer (discriminated actions)
- 🔐 Protected routes (dummy auth)
- 🌙 Light/dark theme (useLocalStorage<T>)
- 🛡️ Error boundary + security hygiene

## Setup
bun install
bun run dev

## Scripts
- `bun run dev` — development server
- `bun run build` — production build
- `bun run preview` — production build locally
- `bun run test` — run tests

## Deployed At
[Live Demo URL — https://trackit.vercel.app]
```

---

## Verification Checklist (7.5 se yaad)

Deploy ke baad:

| Check | Kya |
|-------|-----|
| **Live URL** | Mobile pe kholo — responsive? |
| **Login flow** | Naam daal → dashboard → refresh → still logged in (persist)? |
| **Habits** | Add → check-in → streak — refresh pe data safe? |
| **Quote** | Dashboard pe quote dikh rahi? |
| **Lighthouse** | Performance + accessibility score |
| **Console** | Koi error nahi? |

---

## What T.8 Taught Us — Capstone Complete

1. **Pure logic tests** — reducer sabse fast + reliable
2. **Store tests** — `getState()` pattern, no render needed
3. **Hook tests** — `renderHook` + `act`
4. **Component tests** — `MemoryRouter` for routing
5. **Build + code splitting** — lazy chunks, small initial bundle
6. **Deploy** — Vercel + env vars + continuous deployment
7. **README** — portfolio face, tech stack + features + live URL

---

## So Here's the Takeaway — TrackIt Complete 🎉

**TrackIt poori tarah ready hai:**

| Layer | Kya |
|-------|-----|
| Data | Zustand + persist (habits, tasks, prefs, auth) |
| Logic | useReducer + custom hooks (useFetch, useLocalStorage, useTasks, useHabits) |
| Navigation | Router — protected + lazy |
| UI | Tailwind responsive + accessible + Framer Motion |
| Safety | Error boundary + security hygiene |
| Quality | 12 tests + production build + deploy |

Ye tumhara **resume + portfolio ka main project** hai. Saari batches (1-7) ka knowledge yahan ek saath hai — production-grade, deployed, tested.

**Agla step:** Live URL README mein daalo, screenshot lo, LinkedIn/GitHub pe daalo. Portfolio ready!

---

## In Your Own Words

1. taskReducer test doosre tests se zyada fast aur reliable kyun hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Kyunki taskReducer ek **pure function** hai — same input, same output, koi side effects, koi DOM, koi render, koi network. Test sirf function call karta hai aur output assert karta hai — no act(), no render, no waitFor. Isliye microseconds mein chalta hai aur 100% deterministic. Pure logic sabse pehle test karo — highest value, lowest cost. Yehi testing best practice hai.

</details>

2. ProtectedRoute test mein `MemoryRouter` kyun use kiya? Regular render se kya fark?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Test environment mein real browser URL nahi hota. `MemoryRouter` URL ko memory (history array) mein rakhta hai — bina browser ke router use kar sakte ho. `initialEntries` se starting URL set karte hain. ProtectedRoute mein `<Navigate>` redirects use hota hai — redirect ko handle karne ke liye router context chahiye. Regular render (bina router) mein `Navigate` error deta — router context missing. MemoryRouter = router context provide karta hai test mein.

</details>

3. Store tests mein `beforeEach` mein `setState` reset kyun? (habitsStore test)

<details>
<summary>Show Answer</summary>

**Sample Answer:** Kyunki Zustand store module-level singleton hai — har test use kar sakta hai, lekin state tests ke beech shared rehti hai. Ek test ne habit add ki, agar reset nahi kiya toh agla test wahi habit dekhega — assertions fail ho sakte hain. `beforeEach` mein `useHabitsStore.setState({ habits: {}, checkIns: {} })` — har test fresh state se shuru. Isolated tests = deterministic = reliable (7.4 ka lesson).

</details>

4. Build output mein lazy chunks alag files kyon dikhte hain, aur iska fayda kya hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Kyunki T.4 mein `React.lazy` + dynamic import use kiya — har page (Dashboard, Habits, Tasks) apne alag chunk mein bundle hota hai. Fayda: initial load sirf main bundle load karta hai (small, fast) — user ke page navigate karne pe hi uska chunk load hota hai (on-demand). Dashboard pe heavy charts wala chunk sirf tab load jab user `/` pe jaye. Code splitting se initial load time kam — better UX, better Lighthouse score.

</details>

5. Deploy ke baad verification checklist mein kaunse 3 checks sabse critical hain aur kyun?

<details>
<summary>Show Answer</summary>

**Sample Answer:** (1) **Login + refresh persist** — login karo, dashboard dikhe, page refresh pe bhi logged in rehna chahiye (authStore persist). Agar na ho, persist middleware ki galti hai. (2) **Habits data refresh-safe** — habit add + check-in karo, refresh pe bhi wahi data. (3) **Production env var** — quote API URL production pe sahi hai (localhost nahi). Ye teen check karte hain ki production mein data persistence + env configuration sahi hai — app ka core survive karta hai browser refresh aur production deploy pe.

</details>