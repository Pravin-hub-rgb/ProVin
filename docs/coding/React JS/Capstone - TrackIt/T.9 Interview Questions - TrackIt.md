# Interview Sheet — TrackIt Capstone (covers T.1–T.8)

Capstone checkpoint — the questions an interviewer asks when you say "I built TrackIt with Redux Toolkit": store design, persistence, testing stores, and how you reason about trade-offs. It contains the **final 2 questions of the master file** (117–118), which completes all 127 — plus 6 TrackIt-specific questions written for this capstone.

How to use: answer each one aloud in ~30 seconds, then check. GREEN = said it cleanly, YELLOW = partial, RED = blank — redo YELLOW/RED tomorrow.

**The 2 master questions here complete 127 of 127 — the full sheet is behind you.**

---

### 117. How should you structure the project and maintain state across multiple components?

**Answer:** Components split into separate files under `components/`, separate action files per feature, separate reducer functions per slice — but **one store file for the whole project**: each feature owns its slice, the store stays single and predictable. TrackIt follows exactly this: `tasksSlice`, typed hooks in `hooks.ts`, selectors in `selectors.ts`.

**Likely follow-up:** *Why one store and not a store per feature?* — one devtools timeline, one middleware chain, one persistence layer; slices give the modularity without splitting the source of truth.

---

### 118. Why is discussing trade-offs important in a senior React interview?

**Answer:** Interviewers weigh **how you reason**, not just what you know. Weak signal: blanket "always do X". Strong signal: cost-vs-benefit for the specific context — "when useMemo isn't needed", "when Context beats Redux", "when a library beats a raw hook".

**Likely follow-up:** *Give a strong example from TrackIt.* — "Zustand was lighter for TrackIt's scale, but I chose RTK + redux-persist because predictable slices, devtools time-travel and free persistence matched a data-heavy dashboard; for a two-screen app I wouldn't have paid that ceremony."

---

### E1. How is TrackIt's store organized, and why that shape?

**Answer:** One `configureStore` at `store.ts` combining feature slices (`rootReducer`), typed hooks wrapping `useSelector`/`useDispatch` with `RootState`/`AppDispatch`, and selectors colocated per feature in `selectors.ts`. Type safety flows from the store outward instead of `any` spreading through components.

**Likely follow-up:** *Why selectors in a separate file?* — component code doesn't know the state shape; when the slice changes, you update one selector, not 15 components. Also the natural home for memoized derived data.

---

### E2. How does redux-persist work in TrackIt?

**Answer:** `persistReducer(rootReducer)` + `persistStore(store)` with a `PersistGate` in `main.tsx`; the persisted slice is written to `localStorage` under `persist:trackit` (version 1, for future migrations) and rehydrated on startup — so habits and streaks survive a refresh.

**Likely follow-up:** *What's the version field for, and what happens on mismatch?* — migrations: bump the version, write a migration function, and redux-persist transforms old stored state to the new shape instead of crashing or silently discarding it.

---

### E3. How do you test a Redux store like TrackIt's?

**Answer:** Build a **fresh `configureStore({ reducer: rootReducer })` inside each test** — no module-level singleton shared between tests. Then `dispatch` actions and assert the resulting state, or render with `Provider store={testStore}` and assert UI. Fresh store = zero cross-test leakage.

**Likely follow-up:** *Why not reset the shared store between tests?* — the singleton keeps middleware/persist state and makes tests order-dependent; construction is cheap, so create-per-test is simpler and hermetic.

---

### E4. Where should state live in TrackIt — store, component, or URL?

**Answer:** The store holds durable, cross-route domain state (habits, check-ins, filters); component state holds transient UI state (modal open, input draft); the URL holds navigation-visible state (active route, view params). The "closest common ancestor" rule still decides within a screen — the store only earns state that multiple routes or distant components truly share.

**Likely follow-up:** *What's the classic mistake here?* — dumping everything in the store: a `modalOpen` flag in Redux is global mutable noise that re-renders subscribers for no benefit; keep it local.

---

### E5. TrackIt has Error Boundary (T.7) and tests (T.8) — what does each protect against?

**Answer:** The Error Boundary catches **render-time crashes** in the component tree and shows a fallback instead of a white screen; tests catch **regressions in behavior** before they ship — a boundary limits blast radius today, tests prevent the breakage tomorrow. Different layers of the same safety story.

**Likely follow-up:** *Does the boundary replace try/catch?* — no; it misses event handlers and async code (question 76 in Batch 7's sheet), so handlers still get local `try/catch` while the boundary guards render paths.

---

### E6. You deployed TrackIt — what's your checklist when a production issue appears?

**Answer:** Reproduce → check the error boundary fallback / console → locate via source-mapped stack → fix → covered by a failing test first if it's a behavior bug → verify build locally (`npm run build`) → deploy → confirm. Plus: env vars verified (`VITE_*` never contains secrets), and persist migration path reviewed if the store shape changed.

**Likely follow-up:** *What if state shape changed and users' localStorage has the old shape?* — bump `version` + migration (E2); without it, rehydration can wedge the app with stale-shaped data.

---

**Memorize the chain, not just the answers.** With this sheet you've now practiced all **127 of 127** master questions — full versions with code live in Interview Prep → React Interview Questions.
