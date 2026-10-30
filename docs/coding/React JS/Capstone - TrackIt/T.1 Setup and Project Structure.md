---

## Where We Left Off — The Full Journey

All batches (1-7) are complete:

| Batch | What We Learned |
|-------|--------|
| **1** | JSX, Components, Props, State, Lists |
| **2** | Effects, API, Refs, Context |
| **3** | React Router, Protected Routes |
| **4** | Tailwind, Forms, Accessibility |
| **5** | Performance (memo, useCallback, lazy) |
| **6** | Custom Hooks, Generics, Zustand |
| **7** | Error Boundaries, Security, Testing, Deploy |

**Now, bringing it all together** — **THE FINAL CAPSTONE: TrackIt**. This becomes your **main project for resume + portfolio**. So we'll treat it like a batch — our own folder, our own steps (T.1 through T.8), code **from scratch** (starting with `bunx`), with a coder mindset.

Here's the scene...

---

## Broader Goal — What is TrackIt

**TrackIt** — a **habit tracker + dashboard**. Users track their daily habits (wake up early, drink water, workout), maintain streaks, and view progress on a dashboard.

**What we'll build in this project (combining all batches):**

| Concept | Batch | In TrackIt |
|---------|-------|--------------|
| Custom hooks + Generics | 6 | `useFetch<T>`, `useLocalStorage<T>` |
| Zustand + persist | 6 | habits, tasks, prefs, auth stores |
| `useReducer` | 5 | complex task state (discriminated actions) |
| React Router | 3 | dynamic + protected + lazy routes |
| Tailwind | 4 | responsive, accessible UI |
| Framer Motion | (new) | smooth animations |
| Error Boundary | 7 | crash-proof |
| Security | 7 | env vars, safe rendering |
| Testing | 7 | Vitest + RTL on core pieces |
| Deploy | 7 | Vercel + README |

**Data source decision (senior thinking — remember from 7.2):**
- **Core data** (habits, tasks, prefs, auth) → Zustand + `persist` → localStorage
- **`useFetch<T>`** → a real public API (motivational quote on the dashboard) — no fake complexity, an honest use
- **`useLocalStorage<T>`** → theme preference (to make the hook visible)
- Frontend app — no private secrets, just `VITE_` public values

---

## Tutorial — How It Works

Each step (T.1-T.8) is an isolated milestone:

1. **Each step gives you a runnable project** — every file's `// src/...` path, "create this file" guidance
2. **Coder mindset** — first imagine (problem), then code (solution)
3. **Each step ends with In Your Own Words** — understand in your own words
4. **Project in one folder** — `trackit/` — each step builds on that same folder

**Folder structure (final target):**

```
trackit/
├── src/
│   ├── stores/
│   │   ├── habitsStore.ts       # T.2 — habits CRUD + streak
│   │   ├── tasksStore.ts        # T.2 — tasks (useReducer)
│   │   ├── prefsStore.ts        # T.2 — theme + preferences
│   │   └── authStore.ts         # T.2 — dummy auth
│   ├── hooks/
│   │   ├── useFetch.ts          # T.3 — generic fetch
│   │   ├── useLocalStorage.ts   # T.3 — generic persistence
│   │   └── useHabits.ts         # T.5 — habit logic
│   ├── components/
│   │   ├── layout/              # T.4 — navbar, layout
│   │   ├── habits/              # T.5 — habit cards, check-in
│   │   ├── dashboard/           # T.6 — stats, charts
│   │   ├── ui/                  # T.6 — reusable UI
│   │   ├── ErrorBoundary.tsx    # T.7
│   │   └── ProtectedRoute.tsx   # T.4
│   ├── pages/
│   │   ├── Dashboard.tsx        # T.6
│   │   ├── Habits.tsx           # T.5
│   │   ├── Tasks.tsx            # T.3-T.5
│   │   ├── Login.tsx            # T.4
│   │   └── NotFound.tsx         # T.4
│   ├── types/
│   │   └── index.ts             # T.2 — all types
│   ├── test/
│   │   └── setup.ts             # T.8
│   ├── App.tsx                  # T.4 — router
│   └── main.tsx                 # T.1
├── vitest.config.ts             # T.8
└── package.json
```

Now let's begin — **T.1: Project Setup**.

---

## T.1 — Project Setup

In a new directory, create a Vite + React + TypeScript project with `bunx`:

```bash
bunx create-vite@latest trackit --template react-ts
cd trackit
```

**What's created:**

```
trackit/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**Now install dependencies** — everything the project needs:

```bash
bun add zustand react-router-dom framer-motion
bun add -d vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom dompurify @types/dompurify
```

**What each dependency does:**

| Package | Why |
|---------|------|
| `zustand` | Global state management (Batch 6) |
| `react-router-dom` | Routing (Batch 3) |
| `framer-motion` | Animations |
| `dompurify` | HTML sanitization (Batch 7 security) |
| `vitest` + Testing Library | Tests (Batch 7) |

**Note:** We'll add Tailwind in T.6 (dashboard/UI styling) — when we start building UI. First the data layer + logic (T.2-T.5), then styling. **This is the senior approach:** functional core first, styling later.

---

## Cleaning Up the Folder Structure

Vite includes `App.css`, `src/assets`, `App.tsx` by default. We clean up the project — structure first. We create proper folders in the `src/` directory:

```
mkdir src/components src/pages src/hooks src/stores src/types src/test
```

Now, in `src/`, the folder tree is the final structure shown in the diagram above. Let's clean up `main.tsx`:

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

And replace `src/App.tsx` with a simple placeholder (router comes in T.4):

```tsx
// src/App.tsx
function App() {
  return (
    <div className="app">
      <h1>TrackIt</h1>
      <p>Habit tracker + dashboard — development in progress.</p>
    </div>
  );
}

export default App;
```

**Cleanup:** Remove default Vite files not needed (`src/App.css`, `src/assets/react.svg`) — in their place, our own structure. Replace `src/index.css` with a basic reset:

```css
/* src/index.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: #111;
  background: #f8fafc;
}
```

---

## Running the Dev Server

```bash
bun run dev
```

In the browser, `http://localhost:5173` — the "TrackIt" heading should appear. **Project setup is complete.** This milestone is small but very important — big projects are built on clean structure.

---

## What T.1 Taught Us

1. **`bunx create-vite`** — zero config React + TS project
2. **Install dependencies understanding** what each does — the role of each
3. **Senior ordering** — functional core (data + logic) first, styling (Tailwind) later
4. **Clean folder structure** — `stores/`, `hooks/`, `components/`, `pages/`, `types/` — know where everything lives

---

## So Here's the Takeaway

The project foundation is ready. Clean structure, all dependencies, dev server running. Now the next step (T.2) — **types + normalized state + Zustand stores**. Data first, UI later — production-grade thinking.

If you ever get confused about which folder belongs to which step, look back at the structure diagram above — it's all mapped out.

---

## In Your Own Words

1. What is the role of each main library (zustand, router, framer-motion) in TrackIt?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Zustand is for global state — habits, tasks, prefs, auth stores (Batch 6 approach). react-router-dom is for routing — dynamic routes (habit detail), protected routes (after login), lazy loading (Batch 3). framer-motion is for animations — smooth transitions when cards appear and dashboard updates. Along with these, dompurify for security (sanitizing raw HTML) and vitest+RTL for testing.

</details>

2. Why was Tailwind added later in the senior approach, not first?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because we need the functional core first — data layer, stores, logic, routing. These are testable and production-critical. Styling goes on the front page later — after building UI components. Approach: functional core first (T.2-T.5 data + logic), styling later (T.6 dashboard/UI). This way, the core gets verified first, and styling doesn't include unasked-for things that would distract the core.

</details>

3. What does `bunx create-vite@latest trackit --template react-ts` do?

<details>
<summary>Show Answer</summary>

**Sample Answer:** It calls Vite in the latest version via `bunx` (bun's CLI runner), creates a new project in a `trackit/` directory, and uses the `react-ts` template — React + TypeScript setup, zero config. Vite creates a folder with `src/`, `index.html`, `package.json`, `tsconfig.json`, `vite.config.ts` — a ready-to-run project. Then `cd trackit` and install dependencies.

</details>

4. Why are `stores/` and `hooks/` folders separate in the project? What's the role of each?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because they're two different things (Batch 6 separation of concerns). `stores/` = Zustand stores — global state + actions + persistence (`persist` middleware). `hooks/` = custom hooks — `useFetch<T>` (data fetching), `useLocalStorage<T>` (persisted values), `useHabits` (habit business logic). The store manages raw state, hooks provide logic/composition. Separate folders = always know where things are, stays clean in bigger projects.

</details>

5. Why is core data in localStorage in TrackIt, not from an API? (senior thinking)

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because TrackIt is a pure frontend app — no backend. Habits/tasks are the user's local data, which the `persist` middleware saves in localStorage. This survives load/refresh — real persistence without a backend. A backend would be needed to fetch data from an API, which we haven't taught. `useFetch<T>` is used for a real public API (quotes) on the dashboard — an honest use, not a fake mock service. Senior thinking: don't add complexity without need — choose the right tool for your data (Zustand+persist) and the right tool for API (useFetch).

</details>
