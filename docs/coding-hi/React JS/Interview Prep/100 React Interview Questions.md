# React Interview Questions & Concepts (2026) — 100 Q&A

Deep-researched, organized by topic. Each section goes from basics to advanced/2026-level (React 19). Don't memorize — understand each concept, then practice explaining it in your own words.

---

## 1. React Fundamentals

**1. What is React and why use it?**
React is a JavaScript library (not a framework) built by Meta for building UIs — through component-based architecture. It provides reusable components, declarative UI, and fast updates via the Virtual DOM.

**2. Library vs Framework — which is React?**
React is a library because it only handles the UI layer — you need external tools for routing, state management, and HTTP calls (React Router, Redux, Axios). A framework (like Angular) is opinionated and provides everything built-in.

**3. What is the Virtual DOM?**
A lightweight in-memory copy of the real DOM. When state/props change, React first updates the Virtual DOM, then diffs it against the previous version (reconciliation) and updates only the changed parts in the real DOM — reducing expensive DOM operations.

**4. What is Reconciliation?**
The algorithm that React uses to compare the old and new Virtual DOM trees (diffing) and sync the real DOM with minimum operations. It reuses same-type elements and tracks list items with keys.

**5. What is React Fiber?**
React's reconciliation engine (since React 16). It breaks rendering work into smaller units that can be interrupted, so high-priority updates (like user input) don't block low-priority updates (like data-fetching renders) — the foundation for concurrent rendering.

**6. What is JSX?**
JavaScript XML — HTML-like syntax written inside JavaScript. Babel compiles it to `React.createElement()` calls. Browsers cannot understand JSX directly.

**7. How do you return multiple root elements from a component?**
Use a Fragment: `<React.Fragment>` or the shorthand `<>...</>`. It groups multiple children without adding an extra DOM node.

**8. Controlled vs Uncontrolled components?**
Controlled: form input value is controlled by React state (`value` + `onChange`). Uncontrolled: the DOM maintains the value itself, accessed via `ref`. Controlled components are predictable; uncontrolled components are simpler for legacy code.

**9. Why are keys necessary in list rendering?**
Keys tell React which item was added/removed/reordered in a list — enabling efficient reconciliation and preventing wrong component state reuse. Using array index as a key is risky when the list can be reordered or filtered.

**10. Props vs State?**
Props: read-only inputs passed from parent to child. State: mutable data managed inside a component that triggers a re-render when updated. Props are immutable from the child's perspective; state is mutable (via setter).

**11. What is unidirectional data flow?**
In React, data flows only from parent → child (through props). A child cannot directly modify a parent's data — you "lift state up" by passing callback functions so the child can trigger a parent update.

**12. React element vs component?**
An element is a plain object describing what should render in the UI (immutable, lightweight). A component is a function or class that returns elements — a reusable blueprint.

**13. What are Synthetic Events?**
React's cross-browser wrapper around native DOM events, providing a consistent API across all browsers. In React 17+, events are attached to the root container (event delegation) rather than `document`.

**14. Common mistake with the `key` prop?**
Using array index as a key when items can be reordered, added, or deleted — this causes stale state and UI bugs because React reuses the wrong component instance. Use stable, unique IDs instead.

**15. What is `dangerouslySetInnerHTML` and its risk?**
A way to inject a raw HTML string directly into the DOM. The risk is XSS (cross-site scripting) attacks if user-generated content is rendered without sanitization.

---

## 2. Components, Props & Lifecycle

**16. Functional vs Class components?**
Functional: a plain JavaScript function returning JSX, using Hooks for state/lifecycle — the modern standard. Class: an ES6 class with a `render()` method and lifecycle methods — a legacy approach, rarely written today.

**17. What are the class component lifecycle phases?**
Mounting (`constructor`, `render`, `componentDidMount`), Updating (`shouldComponentUpdate`, `render`, `componentDidUpdate`), Unmounting (`componentWillUnmount`). `componentDidCatch` is for error handling.

**18. How does `useEffect` replace class lifecycle methods?**
Empty dependency array `[]` ≈ `componentDidMount`. A dependency array with values ≈ `componentDidUpdate` (fires when those values change). Returning a cleanup function ≈ `componentWillUnmount`.

**19. What is props drilling and its solution?**
Props drilling is when you have to pass props through many intermediate components just to reach a deeply nested child. Solutions: Context API, or a state management library (Redux, Zustand), or component composition.

**20. How does the `children` prop work?**
`props.children` automatically holds whatever is written between the component's tags — `<Wrapper><p>Hello</p></Wrapper>` puts `<p>` into `children`. Useful for layout and wrapper components.

**21. Purpose of `defaultProps`?**
Provides a fallback value when a prop isn't passed. In functional components, default parameter values (`function Comp({ name = "Guest" })`) are now more common since `defaultProps` is being deprecated.

**22. What does PropTypes do?**
A runtime type-checking library that warns in development mode if a prop of the wrong type is passed. TypeScript is a more reliable alternative in production (compile-time checking).

**23. What are Pure Components?**
`React.PureComponent` (class) or `React.memo` (function) — they skip re-rendering when props/state are shallowly equal. A performance optimization, but requires care with deep/nested objects.

**24. What is a Higher-Order Component (HOC)?**
A function that takes a component and returns an enhanced component — the `withAuth(Component)` pattern. A legacy pattern for logic reuse; hooks/custom hooks have replaced HOCs in most cases now.

**25. What is the Render Props pattern?**
A component exposes its logic through a function prop that returns JSX — `<DataProvider render={data => <UI data={data} />} />`. An alternative to HOCs; custom hooks are usually cleaner now.

---

## 3. Hooks — Core

**26. How does `useState` work?**
`const [state, setState] = useState(initial)` returns the current value and an updater function. Calling the setter triggers a re-render; state updates can be asynchronous and batched.

**27. When to use functional updates (`setState(prev => ...)`)?**
When the new state depends on the previous state, especially with multiple simultaneous updates or when closures might capture stale values. The functional form guarantees the latest state.

**28. What does `useEffect` do and how does dependency array work?**
Side effects (data fetching, subscriptions, DOM manipulation) run after render. No array = runs every render; `[]` = runs only on mount; `[dep1, dep2]` = runs when those dependencies change.

**29. When is `useEffect` cleanup necessary?**
When you set up a subscription, timer, event listener, or socket connection — return a cleanup function to prevent memory leaks and stale references.

**30. `useEffect` vs `useLayoutEffect`?**
`useEffect` runs asynchronously after the browser paints. `useLayoutEffect` runs synchronously before paint — used for DOM measurements where you need to avoid visible flicker (layout thrashing).

**31. What does `useContext` do?**
Lets you consume a Context directly without a `<Context.Consumer>` wrapper. A clean way to avoid props drilling for global data like theming, auth, or locale.

**32. What are `useRef` use cases?**
(a) Accessing a DOM element directly (`ref.current`); (b) Storing a mutable value that doesn't trigger a re-render (like an interval ID or tracking a previous value).

**33. What does `useMemo` do?**
Memoizes (caches) the result of an expensive computation so it only recomputes when its dependencies change — avoiding unnecessary recalculations during render.

**34. What does `useCallback` do?**
Memoizes a function reference — it returns the same function instance as long as dependencies haven't changed. Useful for preventing unnecessary re-renders in child components (especially with `React.memo`).

**35. Difference between `useMemo` and `useCallback`?**
`useMemo` memoizes a computed value, `useCallback` memoizes a function. In fact, `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)` — same underlying mechanism.

**36. When should you use `useReducer`?**
When state logic is complex, involves multiple sub-values, or the next state depends on previous state and action — a Redux-style reducer pattern. A scalable alternative to `useState` for complex state.

**37. What are Custom Hooks?**
Functions prefixed with `use` that compose built-in hooks to create reusable stateful logic (like `useFetch`, `useLocalStorage`). They let you share logic without changing component hierarchy — the modern replacement for HOCs and render props.

**38. What are the Rules of Hooks?**
(1) Only call Hooks at the top level — not inside loops, conditions, or nested functions. (2) Only call Hooks from React function components or custom Hooks. These rules let React keep track of Hook call order consistently.

**39. Purpose of `useId` hook?**
Generates a unique, stable ID that matches between server and client renders (SSR-safe) — for form labels and accessibility attributes. It replaces approaches like `Math.random()` that caused hydration mismatches.

**40. What does `useTransition` do?**
Marks a state update as "non-urgent" (a transition) so that urgent updates (like typing) aren't blocked. It provides an `isPending` flag so you can show a loading state while the transition completes.

**41. What does `useDeferredValue` do?**
Returns a "deferred" version of a value that updates with a slight delay — preventing expensive re-renders (like filtering a large list) from blocking urgent UI updates.

---

## 4. State Management & Context

**42. When to use Context API vs Redux/Zustand?**
Context is good for simple, infrequently-changing global data (theme, auth user, locale). For frequent updates, complex state logic, or need for devtools/middleware, a state management library like Redux/Zustand/Jotai is better — Context re-renders all consumers on any change.

**43. How to solve the Context re-render performance issue?**
Split Context (separate providers for separate concerns), memoize the provider value (`useMemo`), or use a state management library that supports selective subscriptions.

**44. What is the core Redux flow?**
Single store → Actions (describing what happened) → Reducers (pure functions returning new state) → Store updates → Components re-render via `useSelector`/`connect`.

**45. Why is Redux Toolkit (RTK) better than plain Redux?**
Less boilerplate — `createSlice`, built-in Immer (writes immutable updates with mutable syntax), `configureStore` with sensible defaults, and RTK Query for data fetching/caching.

**46. Props drilling vs Context vs global state library — when to use what?**
2-3 levels of props passing is fine. For deeper or cross-cutting concerns, use Context. When you need app-wide complex state, time-travel debugging, or middleware, use a library like Redux/Zustand.

**47. How do lightweight state managers like Zustand or Jotai differ from Redux?**
Less boilerplate, no mandatory providers (Zustand), an atomic state model (Jotai), and a simpler API. By 2026, they've become popular even in large apps because they don't require the ceremony that Redux does.

---

## 5. Performance Optimization

**48. How to optimize a React app from re-renders?**
Use `React.memo` for components, `useMemo`/`useCallback` for expensive values/functions, keep state at the right level (colocate state), list virtualization, and code splitting.

**49. What is code splitting and how to do it?**
Breaking the app's bundle into smaller chunks that load on demand. Use `React.lazy(() => import('./Component'))` + `<Suspense>` for route or component-level splitting — reduces initial load time.

**50. How do `React.lazy` and `Suspense` work together?**
`React.lazy` dynamically imports a component. `<Suspense fallback={<Loader/>}>` is its wrapper that shows a loading state while the lazy component loads.

**51. What is list virtualization?**
Rendering only the items visible in the viewport instead of the entire large list — using libraries like `react-window` or `react-virtualized`. Performance-critical for tables/lists with thousands of rows.

**52. How to debug unnecessary re-renders?**
Use the React DevTools Profiler (highlight updates), the `why-did-you-render` library, or console logs tracking render count. Common causes: inline object/array/function props, missing memoization, and Context misuse.

**53. What does the React Compiler (React 19) do?**
A build-time tool that automatically applies memoization (like `useMemo`/`useCallback`/`React.memo`) without writing it manually — it analyzes component code and generates smart re-render skipping, significantly reducing the need for manual memoization.

**54. Debouncing vs Throttling — when to use each in React?**
Debounce: run a function after a gap following rapid-fire events (typing in a search input). Throttle: run a function at most once per fixed interval (window resize/scroll). Both limit expensive operations like API calls or re-renders.

**55. What is the benefit of Concurrent Rendering?**
It lets React interrupt, pause, and resume render work based on priority — high-priority updates (input typing) don't block low-priority updates (rendering a large list), keeping the UI responsive.

---

## 6. Forms, Events & Refs

**56. What is the basic pattern for a controlled form input?**
`<input value={state} onChange={e => setState(e.target.value)} />` — the value comes from React state, and every keystroke updates state which triggers a re-render.

**57. What is `forwardRef` for?**
Lets a parent component access a child's DOM node/ref when the child is a custom (non-DOM) component. Syntax: `React.forwardRef((props, ref) => ...)`.

**58. What does `useImperativeHandle` do?**
Used together with `forwardRef` — it exposes only specific methods/properties to the parent (not the entire DOM node) through the ref, creating a custom "imperative API."

**59. How is event delegation implemented in React?**
In React 17+, all events are attached to a single root DOM container (not `document`), which is memory efficient and lets multiple React versions coexist on the same page.

**60. Difference between `e.preventDefault()` and `e.stopPropagation()`?**
`preventDefault()` stops the browser's default behavior (like a form submission causing a page reload). `stopPropagation()` stops the event from bubbling up to parent elements.

---

## 7. Error Handling & Testing

**61. What are Error Boundaries?**
Class components (`componentDidCatch` / `getDerivedStateFromError`) that catch JavaScript errors in their child tree and display a fallback UI instead of crashing the entire app. Currently, you cannot build an error boundary with hooks.

**62. What do Error Boundaries NOT catch?**
Errors in event handlers, async code (`setTimeout`, Promises), server-side rendering errors, and errors inside the error boundary itself — for these, you still need manual `try/catch`.

**63. What is the philosophy of React Testing Library?**
"Test the way users use your app" — test DOM output and user interactions (`getByRole`, `fireEvent`) rather than implementation details like internal state, so tests stay resilient to refactoring.

**64. What roles do Jest and React Testing Library play?**
Jest is the test runner + assertion library (it runs the test files, provides `expect()`). React Testing Library provides utilities to render components and query/interact with the DOM — the two are used together.

**65. What is snapshot testing and its risk?**
Compares a component's rendered output against a saved "snapshot." The risk: over-reliance means developers update snapshots without checking when the UI changes — producing false confidence.

---

## 8. Routing (React Router)

**66. How does client-side routing work in React Router?**
It uses the Browser History API (`pushState`) to change the URL without a full page reload, then renders the matching component — giving a SPA navigation feel.

**67. Difference between `<Link>` and `<a>` tag?**
`<Link>` does client-side navigation (no page reload), using the History API. `<a>` triggers a full page reload, which resets SPA state.

**68. What are Nested Routes and `<Outlet>`?**
Nested routes render child routes inside a parent layout. `<Outlet>` is the placeholder where the matched child route renders within the parent layout.

**69. How to implement dynamic/protected routes?**
Dynamic: `path="/user/:id"` + read the value with `useParams()`. Protected: a wrapper component that checks auth and, if unauthenticated, redirects with `<Navigate to="/login" />`.

---

## 9. React 19 & Modern Patterns

**70. What are Server Components (RSC)?**
Components that render on the server and send only the resulting HTML/data to the client — shrinking the client-side JS bundle and allowing direct backend/database access without an API layer. Interactivity (event handlers) cannot live inside them.

**71. Server Components vs Client Components?**
Server Components (default in Next.js App Router, or `'use server'`) — no interactivity, no hooks, smaller bundle. Client Components (`'use client'`) — interactive, can use hooks/state/effects, and hydrate in the browser.

**72. What are React 19 Actions?**
Async functions that handle form submissions and mutations, automatically managing pending/error/optimistic states — integrated with `useActionState` and `useOptimistic`, eliminating manual loading-state boilerplate.

**73. What does `useActionState` do?**
Tracks a form action's result, pending state, and errors in a single hook — eliminating the need for multiple `useState` calls for loading, error, and data.

**74. What does `useOptimistic` do?**
Shows the user a "predicted" final state before an async action completes (like a like button instantly filling), and automatically rolls back if the action fails.

**75. What is the `use` hook and how is it different from other hooks?**
Reads a Promise or Context directly during render — integrates with Suspense (the component suspends until the promise resolves). Unlike other hooks, it can be called conditionally (inside loops/conditionals).

**76. What are Server Actions?**
Async functions marked with `'use server'` that can be called directly from the client (through a form action or event handler) without manually creating an API route — React's own RPC layer handles the communication.

**77. What is Hydration?**
The process of making server-rendered static HTML interactive on the client by attaching event listeners — without re-rendering the HTML. React 19 improves mismatch reporting and partial/streaming hydration.

---

## 10. Architecture, Patterns & Miscellaneous

**78. What is the Compound Components pattern?**
Multiple components that work together with shared implicit state (like `<Select><Select.Option/></Select>`), usually communicating through Context — creating flexible, composable APIs.

**79. What is the Container/Presentational pattern?**
Container components handle logic/data, while presentational components only render UI (taking props). Less strictly followed since Hooks, but the concept (separating concerns) remains relevant.

**80. What are the traps of memoization in React?**
Inline objects, arrays, and functions create new references on every render, causing `React.memo` to fail (shallow comparison). Over-memoization is also bad — adding unnecessary complexity and memory overhead without real benefit.

**81. Composition vs Inheritance — which does React prefer?**
React favors composition (combining behaviors through children/props) over inheritance. It produces flexible, loosely-coupled components. The official React docs explicitly recommend composition.

**82. What is a Portal in React?**
`ReactDOM.createPortal(child, domNode)` renders a component into a DOM node outside its parent hierarchy (useful for modals, tooltips) while React tree and event bubbling remain logically the same.

**83. What does Strict Mode do?**
A development-only wrapper that double-renders components to catch potential problems, warns about deprecated APIs, and adds extra checks for side effects. It has no effect in production builds.

**84. Why is immutability important in React?**
If you mutate state directly, React can't detect the change (the reference stays the same) — you must create a new object/array to trigger a re-render and maintain predictable state history.

**85. What happens when you change a `key` prop?**
If the key changes, React treats it as a completely new component — the old one unmounts and a new one mounts (state is reset). This is intentionally used to "reset" a component.

**86. How do memory leaks happen in React and how to avoid them?**
Setting state on an unmounted component, or leaving event listeners/timers/subscriptions that weren't cleaned up — use the `useEffect` cleanup function to properly unsubscribe and clear them.

**87. Is Suspense only for lazy loading?**
No — Suspense is also used for data fetching (with frameworks/libraries that support it), and in React 19 it works with the `use()` hook to suspend on promises until they resolve.

**88. When should you "lift state up" in React?**
When two or more sibling components need to share and sync the same data — move the state to their closest common parent and pass it down via props and callbacks.

**89. What is batching in React?**
Combining multiple `setState` calls into a single re-render for performance. React 18+ does automatic batching everywhere (inside promises, `setTimeout`, and native event handlers) — previously it only happened inside React event handlers.

**90. What is the "single source of truth" principle in React?**
Every piece of state should have one authoritative owner in the component tree — avoid duplicating or deriving state; instead compute from the single existing state so data inconsistency doesn't occur.

**91. What is the "derived state" anti-pattern?**
Copying props into state with `useState` and then trying to manually sync them — this causes bugs when props change but the state goes stale. Better: compute directly from props during render, or use the `key` prop to reset the component.

**92. What are ref cleanup functions in React 19?**
A `ref` callback can now return a cleanup function (like `useEffect` does) that runs when the element unmounts or the ref changes — removing the need for manual `current = null` assignments.

**93. How to ensure accessibility in React apps?**
Use semantic HTML, add ARIA attributes where needed, test keyboard navigation, use `useId` for label associations, and run automated checks with tools like `eslint-plugin-jsx-a11y` or axe-core.

**94. How to handle environment-specific configuration in React?**
Use build-tool env variables (Vite: `import.meta.env`, CRA: `process.env.REACT_APP_*`), `.env` files, and never expose sensitive keys in the client bundle — keep secrets on the backend/server side only.

**95. Why is TypeScript popular with React in interviews?**
It provides compile-time type safety, better autocomplete and IDE support, explicit prop/state shapes, and safer refactoring in large codebases. Interviewers for senior roles expect TypeScript fluency.

**96. What is the "waterfall" data-fetching problem in React?**
When nested components fetch data sequentially (a child waits for its parent's fetch to complete) — total load time grows. Solutions: parallel fetching, Server Components, or data-fetching libraries (React Query) that handle deduplication and parallelization.

**97. How does React Query / TanStack Query differ from React state management?**
It manages "server state" (async, remote data) — with built-in caching, background refetching, stale-while-revalidate, and deduplication. Redux/Context are for "client state" (local UI state) — the two are complementary, not competing.

**98. What are common performance anti-patterns in React?**
Creating new objects/arrays/functions during render (inline), rendering large lists without virtualization, unnecessary Context re-renders, deeply nested state that re-renders the whole tree, and missing or incorrect `key` strategy.

**99. What should you cover for "React internals" interview questions?**
The Fiber architecture (interruptible rendering), the reconciliation/diffing algorithm (O(n) heuristic, based on type and key), the separation of render vs commit phases, and a high-level mental model of concurrent features (transitions, Suspense).

**100. Why is discussing trade-offs important in a senior React interview?**
Interviewers look less for the "right answer" and more for whether you understand trade-offs — like "when `useMemo` isn't needed" or "when Context is better/worse than Redux." Blanket "best practice" statements are a weak signal; context-aware reasoning is a strong signal.

---

### Bonus tip

Don't just memorize definitions for the interview — for every concept, have a brief real example or a "I used this when..." story ready. That makes the difference in both junior and senior interviews.
