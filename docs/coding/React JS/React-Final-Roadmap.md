# React.js (with TypeScript) — Final Roadmap
### Concept → Mini-Project → Combined Project → ... → Capstone

**Core philosophy of this roadmap:**
1. First understand **how it works** (internals), not just "how to use it."
2. Every new concept gets its own **small isolated mini-project** (like `useState` → just a Counter, that's enough).
3. After each batch, a **Combined Project** that joins all of that batch's concepts into a real app.
4. Later on, if an older approach becomes outdated (like Context → Zustand), we'll **replace** the old one with the new in the combined project — you'll know both concepts, but only the latest one gets used, just like in real industry.
5. Everything in TypeScript, with Accessibility / Testing / ESLint-Prettier / Security woven in wherever relevant.
6. **"Manual → Better" principle:** Wherever an industry-standard library is a better alternative to a manual/from-scratch approach, first do the manual way yourself to *feel* the "problem," then learn the library as the "solution." This is how you learn the library's "why," not just its "how" — and that's the difference that shows in interviews.

---

# MODULE 0 — "How React Works" (No project, pure understanding)

This module comes first so that everything you learn later has a "why" behind it.

- **Real DOM vs Virtual DOM** — why DOM manipulation is expensive, how the Virtual DOM keeps a lightweight in-memory copy
- **JSX Compilation** — JSX actually compiles into `React.createElement()` calls via Babel (so JSX won't feel like "magic")
- **Reconciliation + Diffing Algorithm** — how React compares the old and new Virtual DOM trees when state changes, and why the `key` prop is critical to this process
- **Fiber Architecture** (light level) — React's internal engine that can pause/resume rendering, which is why React is "interruptible"
- **Batching of State Updates** — how multiple `setState` calls inside one event handler get batched into a single re-render
- **Synthetic Events** — why React creates its own events, wrapping the browser's native events

**0.7 TypeScript warm-up (slim):** basic types, arrays (`number[]`), objects, functions, optional props, union types, interface — only what React needs *right now*; Generics deferred to later modules
**0.8 Tooling setup:** Node.js/npm vs Bun introduction, Vite + `react-ts` template, folder structure walkthrough, HMR explained, first component (no Generics), ESLint + Prettier

*(No project in this module — just the foundation. This module's reference will come back in every relevant phase ahead: e.g. "remember the keys discussion in diffing? Now let's see it practically.")*

---

# BATCH 1 — Core Building Blocks

| # | Concept | TypeScript Layer | Mini-Project (isolated) |
|---|---|---|---|
| A | JSX + Functional Components | Component typing basics | **Profile Card** — a static component with hardcoded data |

### 📎 Conceptual side-note (no project, just recognition-level)
**Class Components + Lifecycle Methods** (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) — the legacy React approach used before Hooks. No hands-on practice needed; just understand what problem Hooks solved (logic reuse, less boilerplate) — because both legacy codebases and interview questions feature this. This side note is placed after 1.2 (First Component) because once you learn "component = function," the natural curiosity is "was there another way?"

| B | Props + `children` | `interface` for props, `React.ReactNode` | **Greeting Card Generator** — same component, reused with different props |
| C | `useState` + Event Handling | `useState<T>`, `React.ChangeEvent<...>` | **Simple Counter** — just increment/decrement/reset (keep it small, as you said) |
| D | Conditional Rendering + Lists & Keys | typed arrays, union types (`status: 'idle' \| 'done'`) | **Show/Hide Toggle List** — a small list with filter/conditional display (Module 0's diffing/keys get revisited practically here) |

### 🔗 Combined Project #1 — **To-Do List App**
(A+B+C+D together) — components, props, state, conditional rendering, lists+keys, all in a real app. This is the classic project (present in both reference courses too), so it's a perfect fit here.

---

# BATCH 2 — Effects, Data & Refs

| # | Concept | TypeScript Layer | Mini-Project |
|---|---|---|---|
| E | `useEffect` + API Fetching + Loading/Error States — **Manual** (first) (a big standalone topic) | response `interface`, `useState<T \| null>` | **Recipe Finder Mini-App v1** — fetch recipes from an API, with loading/error state handled manually via `useEffect`+`useState` (inspired by the "Recipe Finder"/"Gallery" in both reference courses) |
| E2 | Data Fetching — **Better**: TanStack Query (React Query) | typed `useQuery<T>` | **Recipe Finder v2** — same app, now with TanStack Query (auto caching, refetching, deduplication, no manual loading/error juggling) — the v1 vs v2 comparison makes the difference clear |
| F | `useRef` | typed refs (`useRef<HTMLInputElement>(null)`) | **Auto-focus + Stopwatch** — focus an input via ref, and a timer that stores its previous value in a ref (without triggering a re-render) |
| G | Lifting State Up + Prop Drilling | callback prop typing | (no new project — the To-Do app itself gets refactored to show how drilling feels) |
| H | Context API | typed context + custom `useX()` hook pattern | **Theme Switcher Demo** — a small standalone dark/light toggle |

### 🔗 Combined Project #2 — **To-Do App v2 (upgrade)**
Upgrade the previous Combined #1: categories now load from an API (E), input auto-focuses when adding a new task (F), state is properly lifted instead of messy prop drilling (G), and a dark/light theme comes through Context across the whole app (H).

---

# BATCH 3 — Navigation & Access Control

| # | Concept | TypeScript Layer | Mini-Project |
|---|---|---|---|
| I | React Router — routes, dynamic routes, nested routes, `useNavigate` | `useParams<{id: string}>()` | **Movie Browser App** — home page + movie detail page (dynamic route), matches the reference course's "Movie Website" idea |
| J | Protected Routes | typed auth-check wrapper component | (add a dummy "My Watchlist" route to the same Movie app that's only accessible in a "logged in" (dummy) state) |

### 🔗 Combined Project #3 — **Blog Platform**
Build a multi-page blog: `/` home (post list), `/posts/:id` (dynamic route with post detail), `/create` (protected — new post form), `/dashboard` (protected — manage/edit your posts), `/*` 404 page. Router, AuthContext, NavLink, protected routes — all together.

---

# BATCH 4 — Styling, Forms & Accessibility

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| K | Tailwind CSS + Responsive Design + Conditional Styling | — | **Gym Website (Landing Page)** — pure styling/responsive focus, no complex logic (matches the reference course's Gym Website idea — design muscle builds here) |
| L | Accessibility — labels, ARIA, keyboard navigation, focus states, modal focus-trap | — | (make the Gym website's contact form and mobile nav menu accessible — test keyboard-only) |
| M | Forms — **Manual** controlled inputs + manual `if`-based validation (first) | typed form state `interface`, `React.FormEvent` | **Notes App v1** — form-heavy app (create/edit/delete note), with all validation written by hand (empty fields, length checks) |
| M2 | Forms — **Better**: React Hook Form + Zod (validation library) | Zod schema + `z.infer<typeof schema>` for automatic types | **Notes App v2** — same app, now rebuilt with RHF (fewer re-renders, less boilerplate) + Zod (schema-based, type-safe) — keep both versions side by side so the difference is visible |

### 🔗 Combined Project #4 — **E-Commerce Store**
Product listing page (Tailwind responsive grid, accessible product cards), product detail page, shopping cart (lifted state + context), checkout form with React Hook Form + Zod validation, order confirmation. Keyboard + screen-reader testing across the whole app.

---

# BATCH 5 — Performance

| # | Concept | TypeScript Layer | Mini-Project |
|---|---|---|---|
| N | `React.memo`, `useMemo`, `useCallback` | props typing revisit | **Re-render Visualizer** — a small demo app where a counter/border flashes on every render, so the difference shows up with the Profiler |
| O | `useReducer` | discriminated union action types (`{type:'add', payload:...}`) | (no new isolated project — we'll migrate state inside the combined project) |
| P | Lazy Loading, Suspense, Code Splitting | — | **Image Gallery** with `React.lazy()` — routes/components load on demand (matches the reference course's Gallery Project) |

### 🔗 Combined Project #5 — **Analytics Dashboard**
Dashboard with data tables, interactive charts (lazy-loaded with `React.lazy()` + `Suspense`), filter/sort/pagination state with `useReducer` (typed discriminated actions), derived data with `useMemo`, table row components with `React.memo` + `useCallback`. Compare before/after with the Profiler.

---

# BATCH 6 — Reusability & State Management Maturity

| # | Concept | TypeScript Layer | Mini-Project |
|---|---|---|---|
| Q | Custom Hooks + Generics | `useFetch<T>`, `useLocalStorage<T>` | (extract the `useEffect`/API logic and localStorage logic from Batch 2 into generic custom hooks) |
| R | Zustand (awareness + comparison vs Context) | typed Zustand store | (Recipe Finder and To-Do app both reuse the fetch logic via `useFetch<T>`) |

### 🔗 Combined Project #6 — **Kanban Board**
Multi-column board (Todo, In Progress, Done) with drag-drop cards. Zustand store with normalized state, generic custom hooks (`useBoard`, `useLocalStorage<T>`), generic UI components (`<Card<T>>`, `<Column<T>>`). Undo/redo history, localStorage persistence. Performance optimizations from Batch 5 carry forward across the whole app.

---

# BATCH 6.7 — Redux Toolkit (Enterprise) — Optional, right after Zustand

> **Why a separate 6.7 batch?** RTK is a big thing — dumping it in one lecture teaches nothing. It's placed right after Zustand (6.4) so the comparison stays fresh — `Zustand = the new default (🟢)`, `RTK = enterprise/legacy (🟡)`. Lower batches don't shift — Batch 7 Production stays as-is, and this batch doesn't rewrite anything in the Capstone (TrackIt still uses Zustand).

| # | Concept | TypeScript Layer | Mini-Project / Series |
|---|---|---|---|
| Q2 | Redux Core — Store, Action, Reducer (manual pain) | `CounterState` interface, `CounterAction` union | **Manual Counter** — `switch` + `createStore` factory (40 lines, just to understand) |
| R2 | `createSlice` + `configureStore` (RTK's better way) | `PayloadAction<T>`, `RootState`/`AppDispatch` | Same Counter in **RTK in 15 lines** — Immer makes `state.count++` safe |
| S2 | `Provider` + Typed Hooks `useAppSelector/useAppDispatch` | `withTypes<RootState>` | **CounterRTK** — wrap with `Provider` + typed selectors |
| T2 | `createAsyncThunk` — Async Pending/Fulfilled/Rejected | `createAsyncThunk`, `extraReducers` | **Categories fetch** — `fetchCategories` thunk, `status`/`error` |
| U2 | **Expense Tracker — 5-Part Series** | `Expense` type, `PayloadAction<Expense>` | **Planning (6.7.5.1) → Hardcoded UI (6.7.5.2) → Data Layer (6.7.5.3) → Dynamic (6.7.5.4) → States+Testing+Persist (6.7.5.5)** |

**Series Pattern (Gold Standard):** `6.7.5.1 Planning → 6.7.5.2 Hardcoded UI → 6.7.5.3 Data Layer (types + expensesSlice + categoriesSlice + store) → 6.7.5.4 Dynamic (UI same, source is the store) → 6.7.5.5 States + Test Table + optional redux-persist + Zustand vs RTK compare` — no dumping, each part has one teaching point.

---

# BATCH 7 — Production-Readiness

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| S | Error Boundaries + Security Awareness (XSS, env vars, safe rendering) | — | (no new project — wrap the To-Do app in an ErrorBoundary, use `.env` properly) |
| T | Testing (Vitest + React Testing Library) | typed tests | Write 1-2 tests for core components/hooks of every older mini-project (retroactively, for practice) |
| U | Build & Deploy | — | Deploy all projects to Vercel/GitHub Pages + README |

---

# 🏁 FINAL CAPSTONE — **TrackIt** (habit/task tracker + dashboard)

This is different from the rest — a new, bigger, polished project that brings together **the latest/best approaches from every batch** (not isolated projects, but production-grade):

- TypeScript throughout
- Tailwind, responsive, accessible UI
- React Router (dynamic + protected routes) + lazy-loaded routes
- Zustand for state (not Context — latest approach)
- `useReducer` for complex task state (typed discriminated actions)
- Generic custom hooks (`useFetch<T>`, `useLocalStorage<T>`)
- Framer Motion animations
- Error boundary + security hygiene
- Test coverage on core pieces
- Deployed with a clean README

This becomes your **resume + portfolio main project**.

---

## Best-combination logic (decided after watching both YouTube courses)

- **To-Do List** — present in both courses, so it's the "spine" project for Batch 1 and 2. Starts small, gradually becomes production-grade. From Batch 3 on, every batch has its own fresh combined project — Blog Platform, E-Commerce, Analytics Dashboard, Kanban Board — so each batch produces something new.
- **Recipe Finder** and **Gallery Project** — kept standalone because their focus is specific (API fetching, lazy loading) — forcing them into the To-Do app would be worse than clean separate demos.
- **Movie Website** — best fit for routing/dynamic-routes (the movie list → movie detail page pattern naturally demonstrates dynamic routes).
- **Gym Website** — pure styling/responsive/accessibility practice, where logic complexity isn't needed, just design muscle.
- **Notes App** — deep-dive into forms + validation, since notes apps naturally have create/edit/delete forms.

This way every mini-project has a **clear, focused purpose** — none is a "generic filler."

---

Next step: if you want, I can expand Batch 1 (Module 0 + A,B,C,D + Combined Project #1) lesson-by-lesson into actual "what to do, step by step" — or should the whole roadmap stay final as it is?
