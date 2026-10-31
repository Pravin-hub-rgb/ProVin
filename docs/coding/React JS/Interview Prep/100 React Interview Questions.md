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

---

## 11. Mapping to "TOP 50 React Interview Questions"

This section maps the existing questions above (1–100) to the **50-question interview list** organized by topic. Each entry shows the interview question, the answer (with code example + use case), and which existing Q# covers it.

---

### 11.1 React Fundamentals (Questions 1–10)

**Q1. What is React.js, and what problems does it solve?**
React is a JavaScript library for building user interfaces through component-based architecture. It solves the problem of building complex UIs where data changes over time — without React, you'd manually manipulate the DOM (error-prone, slow). React introduces a declarative approach where you describe what the UI should look like for each state, and React figures out the most efficient way to update the DOM.

**Problems React solves:**
1. **Manual DOM manipulation** — Error-prone and slow when data changes
2. **State-UI sync** — Keeping UI in sync with application state
3. **Component reusability** — Breaking UI into reusable, isolated pieces
4. **Performance** — Efficient updates through the Virtual DOM

**Code example:**
```javascript
// Without React — manual DOM manipulation (what React solves)
const counter = { count: 0 };
document.getElementById('btn').onclick = () => {
  counter.count++;
  document.getElementById('count').innerText = counter.count;
  document.getElementById('count').style.color = counter.count > 5 ? 'red' : 'black';
};
```
```javascript
// With React — declarative approach
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <span style={{ color: count > 5 ? 'red' : 'black' }}>{count}</span>
    </div>
  );
}
```

**Real-world use:** Every interactive web app — social media feeds, e-commerce carts, dashboards where the UI updates based on user actions.

--- 

**Q2. What are the main features and advantages of React?**
1. **Components** — Encapsulated, reusable UI pieces
2. **Virtual DOM** — Fast, efficient updates
3. **Declarative style** — Describe UI for each state, not manual DOM manipulation
4. **Unidirectional data flow** — Predictable, easier to debug
5. **Hooks** — Stateful logic in functional components
6. **Rich ecosystem** — Libraries for routing (React Router), state (Redux/Zustand), testing (React Testing Library)

**Code:**
```javascript
function UserProfile({ user }) {
  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <button onClick={() => setUser({...user, online: true })}>
        Set Online
      </button>
    </div>
  );
}
```

**Use case:** Building a dashboard where multiple widgets update independently — components keep concerns isolated, Virtual DOM ensures only changed widgets re-render.

---

**Q3. What is JSX, and how does it work?**
JSX (JavaScript XML) is a syntax extension that lets you write HTML-like code in JavaScript. Babel compiles JSX into `React.createElement()` calls at build time — browsers never run JSX directly.

```javascript
// JSX you write:
const element = <h1 className="title">Hello, {user.name}!</h1>;

// Babel compiles to:
const element = React.createElement(
  'h1',
  { className: 'title' },
  `Hello, ${user.name}!`
);
// Which produces a JS object:
{ type: 'h1', props: { className: 'title', children: 'Hello, John!' } }
```

**Why it matters:** JSX makes component structure visual and readable. Without it, UI composition would be deeply nested `React.createElement()` calls.

**Real-world use:** All React components use JSX — from button components to page layouts. Without JSX, component libraries like Material-UI would be verbose to use.

**Covered by:** Q6 (above), with additional code example here.

---

**Q4. What is the Virtual DOM, and how is it different from the real DOM?**
- **Real DOM:** The actual HTML document structure. Updating it is **slow** because each change triggers layout reflow.
- **Virtual DOM:** A lightweight in-memory copy. React diffs it against the previous version and updates only the changed parts in the real DOM.

```javascript
// The diff algorithm (simplified concept)
// Real DOM update (slow): update entire subtree
document.getElementById('list').innerHTML = '<li>A</li><li>B</li>';

// Virtual DOM (fast): find minimal changes
// Old VDOM: [A, B]
// New VDOM: [A, B, C]
// React inserts only <li>C</li>, leaves existing DOM nodes untouched
```

**Key difference:**
| Real DOM | Virtual DOM |
|----------|-------------|
| Direct manipulation | Declarative sync |
| Slow (full reflow) | Fast (targeted update) |
| Browser-native | React abstraction |
| Full object | Plain JS object |

**Real-world use:** Every React app update — typing in a form, adding items to a cart, live data feeds.

**Covered by:** Q3 (above), Q4 (above).

---

**Q5. How does React update the UI when state or props change?**
1. **Trigger:** `setState()` or `useState()` setter is called
2. **Re-render:** Component function runs again with new values
3. **Diff:** React compares new Virtual DOM with previous (reconciliation)
4. **Commit:** React updates only the changed parts of the real DOM (via event loop)
5. **Event loop:** Updates batch for performance

```javascript
function Toggle() {
  const [on, setOn] = useState(false);  // state change

  return (
    <button onClick={() => setOn(!on)}>  {/* 1. Trigger */}
      {on ? 'ON' : 'OFF'}                 {/* 2. Re-render with new value */}
    </button>
  );
  // 3. React diffs: button text changed → 4. updates only the text node
}
```

**Real-world use:** Click handlers, form inputs, any UI that responds to user interaction.

--- 

**Q6. What is reconciliation in React?**
Reconciliation is React's algorithm for comparing the previous and next render outputs (Virtual DOM trees) to determine the minimum DOM mutations needed. It uses a two-phase approach:

1. **Render phase:** Determine what changed (diffing)
2. **Commit phase:** Apply changes to the real DOM

```javascript
// React uses heuristics for efficient diffing:
// 1. Elements of different types → full replacement
// <div /> changed to <span /> → destroy div, create span

// 2. Elements of same type → update attributes and children
// <div className="red" /> → <div className="blue" /> → just change className

// 3. Children with same type and key → reuse instance
// [<li key="a">A</li>, <li key="b">B</li>] → <li key="b">B</li> added
// li with key="a" is destroyed, key="b" is reused
```

**Use case:** Every React update — reconciliation determines whether to create new DOM nodes, update existing ones, or remove them.

**Covered by:** Q4 (above).

---

**Q7. What is the difference between functional and class components?**
- **Functional:** `function Component() { return <div /> }` — modern, uses Hooks
- **Class:** `class Component extends React.Component { render() { return <div /> } }` — legacy, lifecycle methods

```javascript
// Functional (modern)
function Welcome({ name }) {
  const [count, setCount] = useState(0);
  useEffect(() => { /* side effect */ }, []);
  return <div>Hello, {name}</div>;
}

// Class (legacy)
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  componentDidMount() { /* side effect */ }
  render() {
    return <div>Hello, {this.props.name}</div>;
  }
}
```

**When to use:** Always functional components in new code. Class components only when maintaining legacy codebases.

---

**Q8. What is the difference between a React element and a React component?**
- **Element:** A plain JavaScript object describing what to render (`{ type: 'div', props: {...} }`)
- **Component:** A blueprint (function or class) that produces elements when called

```javascript
// Component (blueprint)
function Welcome({ name }) {
  // Returns an ELEMENT each time it's called
  return React.createElement('h1', null, `Hello, ${name}`);
}

// Element (instance — a plain object!)
const element = <Welcome name="John" />;
// element = { type: Welcome, props: { name: 'John' } }
```

**Use case:** Components are the building blocks; elements are the output. React renders elements (objects), not components directly.

---

**Q9. Why are keys important when rendering lists?**
Keys help React identify which items changed, were added, or removed in a list — enabling efficient reconciliation and preventing bugs.

```javascript
const todos = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Build app' },
];

// Correct — stable, unique keys:
{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}

// Problematic — don't use index as key when list can reorder:
{todos.map((todo, index) => <TodoItem key={index} todo={todo} />)}

// With index keys, reordering causes React to reuse wrong component state:
// [A, B, C] → [B, C, A] with index keys: React thinks A (key 0) became B
// Result: stale state, wrong transitions
```

**Real-world use:** Todo lists, search results, product lists where items are added/removed dynamically.

**Use case importance:** Without keys, React logs warnings and list updates become buggy — item state gets confused when order changes.

---

**Q10. What are fragments in React, and when would you use them?**
Fragments let you return multiple elements without adding an extra DOM node — using `<>...</>` (shorthand) or `<React.Fragment>`.

```javascript
// Problem — can't return two elements directly:
function BadList({ items }) {
  return (
    <ul>
      {items.map(item => <li>{item}</li>)}  // ERROR: adjacent elements
    </ul>
  );
}

// Solution — Fragments group without extra node:
function GoodList({ items }) {
  return (
    <React.Fragment>
      <h2>Items</h2>
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </React.Fragment>
  );
}
// Renders: <h2>Items</h2><ul>...</ul> (no wrapper div)

// Shorthand syntax:
const <></> is equivalent to <React.Fragment></React.Fragment>
```

**When to use:** Table rows (`<tr>` inside `<tbody>` can't have a wrapper div), list items, SVG elements — anywhere extra DOM nodes would break the structure.

---

### 11.2 React Hooks (Questions 11–20)

**Q11. What are React Hooks, and why were they introduced?**
Hooks are functions that let you use state and lifecycle in functional components — introduced in React 16.8 to solve three problems class components had.

```javascript
// BEFORE Hooks — class components were verbose:
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return <div>Timer: {this.state.seconds}s</div>;
  }
}

// AFTER Hooks — functional, cleaner:
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(
      () => setSeconds(s => s + 1),  // functional update
      1000
    );
    return () => clearInterval(interval);  // cleanup
  }, []);

  return <div>Timer: {seconds}s</div>;
}
```

**Why introduced:**
1. **Reusing stateful logic** — Extract logic into custom hooks (e.g., `useFetch`)
2. **Complex components become hard to understand** — Lifecycle methods mixed unrelated concerns
3. **Classes are confusing** — `this` binding, verbose syntax

**Real-world use:** Every modern React component uses hooks — forms, data fetching, timers, DOM refs.

**Covered by:** Q26, Q28, Q29 (above).

--- 

**Q12. How does `useState` work, and why should state not be mutated directly?**
`useState` returns the current state and a setter function. React uses the setter to detect changes and trigger re-renders.

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  // Correct — React sees new reference, triggers re-render
  const increment = () => setCount(count + 1);
  
  // Correct — functional update (preferred for prev state)
  const incrementFunc = () => setCount(prev => prev + 1);
  
  // WRONG — mutated object directly, React won't detect change
  const [items, setItems] = useState([1, 2, 3]);
  items.push(4);  // mutation — NO re-render!
  setItems(items); // same reference — React ignores!
  
  // Correct — create new array
  setItems([...items, 4]);
  
  return <button onClick={incrementFunc}>{count}</button>;
}
```

**Why no mutation:** React uses **reference comparison** (`Object.is`) to detect changes. Same reference = no change = no re-render. You must always create a new object/array when updating state.

**Real-world use:** Form state, shopping cart, todo lists — any state that changes based on user actions.

---

**Q13. What is `useEffect`, and when does its callback run?**
`useEffect` runs side effects (data fetching, subscriptions, timers) after render — it runs **after the browser paints**.

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  // Runs AFTER every render (no deps array)
  useEffect(() => {
    document.title = `User: ${user?.name || 'Loading...'}`;
  });
  
  // Runs only on mount (empty deps)
  useEffect(() => {
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, []);
  
  // Runs when userId changes (dependency watch)
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setUser(data);  // race condition guard
      });
    return () => { cancelled = true };  // cleanup
  }, [userId]);
  
  return <div>{user?.name}</div>;
}
```

**When callbacks run:**
- `[]` → mount only
- `[dep]` → mount + when dep changes
- no array → every render

**Real-world use:** Fetching user data on page load, subscribing to WebSocket, setting up timers.

---

**Q14. What does the dependency array in `useEffect` control?**
The dependency array tells React when the effect should re-run:
- **Empty `[]`** → runs once on mount
- **`[value]`** → runs on mount + when `value` changes
- **No array** → runs on every render
- **Cleanup** → the optional return function runs before the next effect run

```javascript
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  
  useEffect(() => {
    if (!isActive) return;  // guard clause
    
    const interval = setInterval(
      () => setSeconds(s => s + 1),
      1000
    );
    
    // Cleanup runs before next effect OR on unmount
    return () => clearInterval(interval);
  }, [isActive]);  // re-runs only when isActive changes
  
  return (
    <button onClick={() => setIsActive(!isActive)}>
      {seconds}s — {isActive ? 'Running' : 'Paused'}
    </button>
  );
}
```

**Real-world use:** Watching for prop changes to trigger side effects, like refreshing data when a filter changes.

---

**Q15. What is the cleanup function in `useEffect`, and when is it called?**
The cleanup function returned from `useEffect` runs:
1. **Before the next effect runs** (when deps change)
2. **On unmount** (component is removed)

```javascript
function ChatRoom({ roomId }) {
  useEffect(() => {
    const socket = new WebSocket(`wss://chat/${roomId}`);
    
    socket.onmessage = (e) => {
      // handle message
    };
    
    // This cleanup runs when roomId changes or component unmounts
    return () => {
      socket.close();  // prevents memory leaks
      console.log('Left room:', roomId);
    };
  }, [roomId]);
  
  return <div>Chat Room: {roomId}</div>;
}
```

**Real-world use:** Cleaning up subscriptions, timers, event listeners — anything that needs teardown to prevent memory leaks.

---

**Q16. What is the difference between `useEffect` and `useLayoutEffect`?**
- **`useEffect`** runs **asynchronously** after the browser paints — won't block rendering
- **`useLayoutEffect`** runs **synchronously** after DOM mutations but before paint — can block rendering

```javascript
function Tooltip({ children, position }) {
  const ref = useRef();
  
  // WRONG — useLayoutEffect needed for measuring before paint
  useEffect(() => {
    // This causes visible flicker — tooltip appears, then moves
    const rect = ref.current.getBoundingClientRect();
    setTooltipPos({ x: rect.left, y: rect.top });
  }, [position]);
  
  // CORRECT — synchronous, before paint
  useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setTooltipPos({ x: rect.left, y: rect.top });  // no flicker
  }, [position]);
  
  return <div ref={ref}>{children}</div>;
}
```

**When to use each:**
- `useEffect`: Data fetching, analytics, subscriptions — doesn't block UI
- `useLayoutEffect`: DOM measurements, animations, preventing flicker — blocks paint briefly

**Real-world use:** Animating elements based on their size, positioning tooltips/popovers.

---

**Q17. What is `useRef`, and how is it different from `useState`?**
`useRef` creates a mutable object (`ref`) that persists across renders. `useState` creates reactive state that triggers re-renders.

```javascript
function SearchBox({ onSearch }) {
  // useState: triggers re-render when value changes
  const [value, setValue] = useState('');
  
  // useRef: mutable, does NOT trigger re-render
  const inputRef = useRef(null);
  const searchCount = useRef(0);  // persists without re-render
  const prevValue = useRef('');   // stores previous value
  
  // Accessing DOM element
  const focusInput = () => inputRef.current?.focus();
  
  const handleSearch = (e) => {
    const term = e.target.value;
    setValue(term);  // triggers render
    
    if (term !== prevValue.current) {
      searchCount.current++;  // no render triggered
      prevValue.current = term;
      onSearch(term, searchCount.current);
    }
  };
  
  return (
    <div>
      <input ref={inputRef} value={value} onChange={handleSearch} />
      <span>Search #{searchCount.current}</span>
      <button onClick={focusInput}>Focus input</button>
    </div>
  );
}
```

**Key difference:** `useRef` mutations don't trigger re-renders → use for mutable values that don't need UI updates.

**Real-world use:** Focusing inputs, storing previous values, tracking counters without affecting render.

---

**Q18. What is the difference between `useMemo` and `useCallback`?**
Both memoize, but:
- **`useMemo`** → returns a **memorized value**
- **`useCallback`** → returns a **memorized function**

```javascript
function ProductList({ products, searchTerm, onAddToCart }) {
  // useMemo — caches the filtered list
  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);
  
  // useCallback — caches the function reference
  const handleAddToCart = useCallback((productId) => {
    onAddToCart(productId);
  }, [onAddToCart]);
  
  // useCallback(fn, deps) === useMemo(() => fn, deps)
  
  return (
    <List items={filteredProducts} onItemClick={handleAddToCart} />
  );
}
```

**When to use:**
- `useMemo`: Expensive calculations during render (filtering, sorting, math)
- `useCallback`: Passing callbacks to memoized children, preventing re-renders from new function references

**Real-world use:** Preventing unnecessary re-renders in large component trees, caching filtered/search results.

---

**Q19. What are custom hooks, and how do you create one?**
Custom hooks are JavaScript functions that **start with `use`** and **call other hooks**. They let you extract component logic into reusable functions.

```javascript
// Custom hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let cancelled = false;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });
    
    return () => { cancelled = true };
  }, [url]);
  
  return { data, loading, error };
}

// Usage in component:
function UserDashboard() {
  const { data: user, loading, error } = useFetch('/api/user/123');
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;
  return <Profile user={user} />;
}

// Reusing in another component:
function AdminPanel() {
  const { data: stats, loading } = useFetch('/api/stats');
  // Same hook, different URL — logic fully reusable
  return <StatsCard stats={stats} />;
}
```

**Rules:**
1. Must start with `use` (so lint rules recognize it)
2. Can call other hooks inside (useState, useEffect, etc.)
3. Cannot be called conditionally (Rules of Hooks apply)

**Real-world use:** Any reusable logic — API fetching, form handling, local storage persistence, keyboard shortcuts.

---

**Q20. What are the Rules of Hooks, and why must they be followed?**
1. **Only call Hooks at the top level** — not inside loops, conditions, or nested functions
2. **Only call Hooks from React functions** — functional components or custom hooks

```javascript
// ❌ WRONG — conditional hook call breaks hook order
function Bad({ shouldShow }) {
  if (shouldShow) {
    useEffect(() => { /* ... */ });  // hook called conditionally!
  }
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
// On first render (shouldShow=true): useEffect → useState
// On second render (shouldShow=false): no useEffect → hooks shifted!
// React gets confused about hook positions

// ✅ CORRECT — hooks always in same order
function Good({ shouldShow }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (shouldShow) {
      // side effect logic inside callback, not conditional hook
    }
  }, [shouldShow]);
  
  return <div>{count}</div>;
}
```

**Why followed:** React tracks hook call order internally. If order changes between renders, React can't match state to the correct hook — causing bugs that are hard to debug.

---

### 11.3 Props, State & Component Communication (Questions 21–30)

**Q21. What are props and state in React? How are they different?**
| Props | State |
|-------|-------|
| Read-only (immutable) | Mutable (via setter) |
| Passed from parent | Owned by component |
| Triggers re-render when parent updates | Triggers re-render when setter called |
| Used for configuration/input | Used for dynamic data |

```javascript
function ProductCard({ name, price, onAddToCart }) {
  // props: name, price, onAddToCart (read-only)
  const [quantity, setQuantity] = useState(1);  
  // state: quantity (mutable, triggers re-render)
  
  return (
    <div>
      <h3>{name}</h3>   {/* props used */}
      <span>${price * quantity}</span>  {/* state used */}
      <button onClick={() => onAddToCart(quantity)}>  {/* props callback */}
        Add to Cart
      </button>
      <input 
        type="number" 
        value={quantity} 
        onChange={e => setQuantity(+e.target.value)}  {/* state updated */}
      />
    </div>
  );
}
```

**Real-world use:** Props receive data from APIs or parents; state manages interactive UI (form inputs, selection, counters).

**Covered by:** Q10 (above).

---

**Q22. Why should props be treated as read-only?**
React's one-way data flow means props come from parents and cannot be modified by children — this guarantees predictable data flow and prevents side effects.

```javascript
// ❌ WRONG — never mutate props
function BadCounter({ count }) {
  count++;  // mutation — won't trigger re-render, breaks data flow
  return <div>{count}</div>;
}

// ❌ WRONG — calling parent's setState directly (anti-pattern)
function Bad({ onUpdate, value }) {
  onUpdate(value + 1);  // calls parent's setState during render
}

// ✅ CORRECT — call callback from event handler
function Good({ onUpdate, value }) {
  return (
    <button onClick={() => onUpdate(value + 1)}>
      Increment
    </button>
  );
}
```

**Real-world use:** Props are contracts — the parent owns the data, the child is a "view" of it. This makes debugging predictable and component behavior testable.

---

**Q23. What is prop drilling, and how can you avoid it?**
Prop drilling is passing data through many layers of components via props — each intermediate component receives and forwards props it doesn't use.

```javascript
// ❌ Prop drilling — theme passed through 3 layers for no reason
<Header>
  <Navbar>
    <UserMenu theme={theme} />  {/* only UserMenu needs theme */}
  </Navbar>
</Header>

// Layer 1
function Header({ theme }) {
  return <Navbar theme={theme} />;  // doesn't use theme
}

// Layer 2
function Navbar({ theme }) {
  return <UserMenu theme={theme} />;  // doesn't use theme
}

// ✅ Solution 1 — Context API
const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      <Header />
    </ThemeContext.Provider>
  );
}

function UserMenu() {
  const { theme } = useContext(ThemeContext);  // direct access
  return <div className={theme}>User Menu</div>;
}

// ✅ Solution 2 — Composition (render props)
function Header({ renderNavbar }) {
  return <div className="header">{renderNavbar()}</div>;
}

function App() {
  return (
    <Header renderNavbar={() => <Navbar theme="dark" />} />
  );
}
```

**Real-world use:** Theme, auth user, locale — anything many components need.

**Covered by:** Q19 (above).

---

**Q24. What does "lifting state up" mean, and when is it useful?**
When two sibling components need to share the same state, you move that state to their closest common parent.

```javascript
// Before — each has own temperature, they can't communicate
function TemperatureInput() {
  const [temperature, setTemperature] = useState('');
  return <input value={temperature} onChange={...} />;
}

// After — lifted to common parent (Calculator)
function Calculator() {
  // Single source of truth
  const [temperature, setTemperature] = useState('');
  
  return (
    <div>
      <TemperatureInputCelsius 
        temperature={temperature} 
        onTempChange={setTemperature}
      />
      <TemperatureInputFahrenheit 
        temperature={temperature} 
        onTempChange={setTemperature}
      />
    </div>
  );
}

function TemperatureInputCelsius({ temperature, onTempChange }) {
  return (
    <input 
      value={temperature} 
      onChange={e => onTempChange(e.target.value)}
      placeholder="Celsius" 
    />
  );
}
```

**When useful:** Multiple components need to react to the same state change, like converting between units, filtering a list from multiple controls.

**Covered by:** Q88 (above) + code example.

---

**Q25. How does a parent component pass data to a child component?**
Via **props** — a parent passes any JavaScript value (primitive, object, function) as attributes on the child component.

```javascript
function Parent() {
  const user = {
    name: 'Alice',
    age: 28,
    hobbies: ['coding', 'hiking']
  };
  
  const handleSave = (data) => {
    console.log('Saving:', data);
  };
  
  return (
    // Pass data via props:
    <Child 
      name={user.name}
      initialAge={user.age}
      hobbies={user.hobbies}
      onSave={handleSave}  // passing functions as props
    />
  );
}

function Child({ name, initialAge, hobbies, onSave }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>{hobbies.map(h => <li key={h}>{h}</li>)}</ul>
      <button onClick={() => onSave({ name, age: initialAge })}>
        Save Profile
      </button>
    </div>
  );
}
```

**Real-world use:** Passing API data to display components, passing callbacks for interactions.

---

**Q26. How can a child component send data or events to its parent?**
By calling a **callback function** that was passed as a prop from the parent.

```javascript
function Parent() {
  const [message, setMessage] = useState('');
  
  const handleMessageFromChild = (data) => {
    setMessage(data);
    console.log('Received:', data);
  };
  
  return (
    <div>
      <p>Parent state: {message}</p>
      <Child onMessage={handleMessageFromChild} />
    </div>
  );
}

function Child({ onMessage }) {
  return (
    <button 
      onClick={() => onMessage('Hello from child!')}
    >
      Send to Parent
    </button>
    
    <form onSubmit={(e) => {
      e.preventDefault();
      const input = e.target.elements.email.value;
      onMessage(`Email: ${input}`);
    }}>
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Real-world use:** Form submissions (child collects input, parent processes), "Add to Cart" from product cards (child has button, parent updates cart).

--- 

**Q27. How can sibling components share data?**
**Option 1:** Lift state to common parent and pass via props.
**Option 2:** Use Context API.
**Option 3:** Use a shared state library (Redux, Zustand, Jotai).

```javascript
// Option 1: Lift state up (simplest for 2 siblings)
function Parent() {
  const [sharedText, setSharedText] = useState('');
  
  return (
    <>
      <SiblingA value={sharedText} onChange={setSharedText} />
      <SiblingB value={sharedText} />
    </>
  );
}

function SiblingA({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

function SiblingB({ value }) {
  return <p>Sibling B sees: {value}</p>;
}

// Option 2: Context (scales to many consumers)
const SharedContext = createContext();

function Parent() {
  const [sharedText, setSharedText] = useState('');
  
  return (
    <SharedContext.Provider value={{ text: sharedText, setText: setSharedText }}>
      <SiblingA />
      <SiblingB />
      <SiblingC />  {/* more siblings */}
    </SharedContext.Provider>
  );
}

function SiblingA() {
  const { text, setText } = useContext(SharedContext);
  return <input value={text} onChange={e => setText(e.target.value)} />;
}
```

**Real-world use:** Tab components sharing selected tab, form wizard steps, chat input + message list.

--- 

**Q28. What are controlled and uncontrolled components?**
- **Controlled:** Form data is handled by React state (`value` + `onChange`)
- **Uncontrolled:** Form data is handled by the DOM itself (`useRef` to read)

```javascript
// ✅ Controlled component — React owns the state
function ControlledForm() {
  const [name, setName] = useState('');
  
  return (
    <input
      type="text"
      value={name}                    // controlled by React
      onChange={(e) => setName(e.target.value)}  // updates state
    />
  );
}

// ✅ Uncontrolled component — DOM owns the state
function UncontrolledForm() {
  const inputRef = useRef(null);
  
  const handleSubmit = () => {
    console.log(inputRef.current.value);  // read from DOM
  };
  
  return (
    <>
      <input type="text" ref={inputRef} />  // uncontrolled
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

**When to use:**
- Controlled: When you need real-time validation, conditional rendering, or controlled submission
- Uncontrolled: Simple forms, integrating with non-React code, file inputs

**Real-world use:** Controlled for signup forms (real-time validation); uncontrolled for file upload forms.

**Covered by:** Q8 (above).

---

**Q29. What is the Context API, and how does it help with component communication?**
Context provides a way to pass data through the component tree **without manually passing props** at every level.

```javascript
// Step 1: Create context
const ThemeContext = createContext({
  theme: 'light',
  toggle: () => {}
});

// Step 2: Create provider component
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Step 3: Consume in any descendant
function ThemedButton() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <button 
      onClick={toggle}
      style={{ background: theme === 'dark' ? '#333' : '#fff' }}
    >
      Toggle {theme}
    </button>
  );
}

// With useContext + custom hook pattern:
function useTheme() {
  return useContext(ThemeContext);
}
```

**Real-world use:** Theme switching, auth user, locale/i18n, feature flags — anything shared across many components without direct relation.

**Covered by:** Q112, Q268 (above) + code.

---

**Q30. How do you decide where state should live in a component tree?**
Follow the **"Lifting State Up"** principle — move state to the **closest common ancestor** of all components that need it.

```javascript
// ❌ State in wrong place — children can't communicate
function App() {
  return <Toolbar />;
}
function Toolbar() {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  return <Filters open={isFilterOpen} onToggle={() => setFilterOpen(!isFilterOpen)} />;
  return <Search open={isSearchOpen} onToggle={() => setSearchOpen(!isSearchOpen)} />;
}

// ✅ State at common ancestor
function App() {
  const [activePanel, setActivePanel] = useState(null);
  
  return (
    <Toolbar 
      activePanel={activePanel} 
      onPanelChange={setActivePanel} 
    />
  );
}
function Toolbar({ activePanel, onPanelChange }) {
  return (
    <>
      <Filters active={activePanel === 'filters'} onClick={() => onPanelChange('filters')} />
      <Search active={activePanel === 'search'} onClick={() => onPanelChange('search')} />
    </>
  );
}
```

**Decision process:**
1. Find all components that need this state
2. Find the closest common parent
3. Put state there
4. Pass down via props/callbacks

**Real-world use:** Any shared state in component trees — selected items, form values, modal visibility.

**Covered by:** Q88 (above) + Q90 (single source of truth).

---

### 11.4 Rendering & Performance Optimization (Questions 31–40)

**Q31. What causes a React component to re-render?**
1. **State change** — `setState` or `useState` setter is called
2. **Props change** — parent passes new prop values
3. **Parent re-renders** — by default, children re-render when parent does
4. **Force update** — `forceUpdate()` (rare, class components)
5. **Context change** — a context provider's value changes
6. **Parent uses `useSyncExternalStore`** — triggers re-render in consumers

```javascript
function Parent() {
  const [count, setCount] = useState(0);  // state change triggers Parent render
  
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      {/* Child re-renders because parent re-rendered */}
      <Child name="Alice" />
      
      {/* But if we memoize Child, it skips re-render
          unless props change */}
      <MemoizedChild name="Bob" />
    </>
  );
}

const MemoizedChild = React.memo(function Child({ name }) {
  return <div>Hello, {name}</div>;
  // Only re-renders if name prop changes (shallow compare)
});
```

**Real-world use:** Understanding re-renders helps debug performance issues and apply memoization correctly.

---

**Q32. Does a parent re-render always cause its child component to re-render?**
**Yes** by default, but you can prevent it with `React.memo`.

```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  const handleClick = () => setCount(c => c + 1);
  
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={handleClick}>Increment</button>
      
      {/* Re-renders every time count changes — receives same props */}
      <ExpensiveChild name={name} items={[1, 2, 3]} onClick={handleClick} />
      
      {/* React.memo prevents re-render if props are shallowly equal */}
      <MemoizedChild name={name} items={[1, 2, 3]} onClick={handleClick} />
    </>
  );
}

function ExpensiveChild({ name, items, onClick }) {
  console.log('ExpensiveChild rendered');  // logs on every parent re-render
  return <div>{name}: {items.map(i => <span key={i}>{i}</span>)}</div>;
}

// Problem: even with memo, inline `[1, 2, 3]` is new array each render
const MemoizedChild = React.memo(ExpensiveChild);

// Solution: memoize the array (or pass constant reference)
function ParentFixed() {
  const items = useMemo(() => [1, 2, 3], []);  // same reference
  return <MemoizedChild name={name} items={items} onClick={handleClick} />;
}
```

**Key insight:** `React.memo` does **shallow comparison** of props — if you pass new object/array/function references inline, memo won't help.

**Real-world use:** Preventing expensive child components from re-rendering when parent state changes for unrelated reasons.

--- 

**Q33. What is React.memo, and when should you use it?**
`React.memo` is a higher-order component that memoizes a functional component — it skips re-rendering when props are shallowly equal.

```javascript
function ProductItem({ product, onAddToCart }) {
  console.log('Rendering:', product.name);  // expensive component
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product.id)}>Add</button>
    </div>
  );
}

// Wrap with memo:
const MemoizedProduct = React.memo(ProductItem);

function ProductList({ products, onAddToCart }) {
  const [cartCount, setCartCount] = useState(0);
  
  // onAddToCart needs to be stable reference:
  const handleAdd = useCallback((id) => {
    onAddToCart(id);
    setCartCount(c => c + 1);
  }, [onAddToCart]);
  
  return (
    <div>
      <span>Cart: {cartCount} items</span>
      {products.map(p => (
        <MemoizedProduct 
          key={p.id} 
          product={p} 
          onAddToCart={handleAdd}  // stable reference helps memoization
        />
      ))}
    </div>
  );
}
```

**When to use:** When a component re-renders often with the same props, or when parent re-renders for unrelated state changes.

**Covered by:** Q48 (above) + code.

---

**Q34. How can you prevent unnecessary re-renders?**
1. **`React.memo`** — skip component re-render if props unchanged
2. **`useMemo`** — memoize expensive calculations
3. **`useCallback`** — memoize function references
4. **Colocate state** — keep state in the smallest component that needs it
5. **Lazy load** — split code so unrelated components don't load together

```javascript
function Dashboard() {
  const [tab, setTab] = useState('overview');
  
  // Expensive calculation — memoize based on data
  const stats = useMemo(() => computeStats(rawData), [rawData]);
  
  // Callback — stable reference for memoized children
  const handleFilter = useCallback((filter) => {
    setFilter(filter);
  }, []);
  
  return (
    <div>
      <TabSelector onTabChange={setTab} />  {/* stable, memoized */}
      <StatsPanel stats={stats} />         {/* memoized value */}
      <DataTable data={data} onFilter={handleFilter} />
    </div>
  );
}
```

**Real-world use:** Large apps with complex component trees — e-commerce product grids, data dashboards.

---

**Q35. How do React.memo, useMemo, and useCallback differ?**
| Feature | React.memo | useMemo | useCallback |
|---------|-----------|---------|-------------|
| Returns | Memoized component | Memoized **value** | Memoized **function** |
| Target | Component rendering | Expensive computation | Function reference stability |
| Usage | `React.memo(Component)` | `useMemo(() => calc(), [deps])` | `useCallback(() => {}, [deps])` |

```javascript
// React.memo — wraps entire component
const MemoizedComp = React.memo(MyComponent);

// useMemo — caches calculation result
const expensiveValue = useMemo(() => {
  return items.filter(x => x.visible).map(x => x.value);
}, [items]);

// useCallback — caches function reference
const handleClick = useCallback((id) => {
  dispatch({ type: 'ADD_ITEM', payload: id });
}, [dispatch]);

// useCallback(fn, deps) === useMemo(() => fn, deps)
```

**Real-world use:** Building a data grid where rows need individual memoization (`React.memo`), calculations are expensive (`useMemo`), and event handlers must maintain stable references (`useCallback`).

**Covered by:** Q149, Q150 (above) + comparison table.

---

**Q36. Why should list keys be unique and stable?**
Keys identify items across renders — they must be **unique** among siblings and **stable** (same item same key across renders).

```javascript
const [todos, setTodos] = useState([]);

// ✅ Correct — unique ID, stable
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}

// ❌ Problem — array index as key:
{todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} />
))}

// What goes wrong with index keys:
// Initial: [A(0), B(1), C(2)]
// State: A checked, B unchecked, C checked
// User adds item D at start: [D(0), A(1), B(2), C(3)]
// React sees: index 1 was A's state, now B's
// B gets A's "checked" state! State gets mixed up!
```

**Real-world use:** Todo apps, search results, any dynamically sorted/filtered list.

**Covered by:** Q14 (above) + code.

---

**Q37. What problems can happen when array indexes are used as keys?**
1. **Stale state** — items get wrong component state when reordered
2. **Wrong animations** — transitions apply to wrong items
3. **Input focus loss** — cursor jumps when items shift
4. **Performance issues** — React can't efficiently reuse components

```javascript
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build app', done: true }
  ]);
  
  const toggleTodo = (id) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };
  
  // ✅ Using stable IDs
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

**Covered by:** Q14 (above) + code example.

---

**Q38. What are lazy loading and code splitting in React?**
Code splitting divides your bundle into smaller chunks that load on demand. `React.lazy` + `Suspense` handles component-level lazy loading.

```javascript
// Step 1: Lazy-load component
const Dashboard = lazy(() => 
  import('./components/Dashboard').then(module => ({
    default: module.Dashboard
  }))
  // Dynamic import() — this chunk loads only when needed
);

// Step 2: Suspense wraps the lazy component
function App() {
  const [tab, setTab] = useState('home');
  
  return (
    <nav>
      <button onClick={() => setTab('home')}>Home</button>
      <button onClick={() => setTab('dashboard')}>Dashboard</button>
    </nav>
    
    <Suspense fallback={<div>Loading dashboard...</div>}>
      {tab === 'dashboard' && <Dashboard />}
    </Suspense>
  );
}

// Route-level code splitting
const Home = lazy(() => import('./routes/Home'));
const Profile = lazy(() => import('./routes/Profile'));
const Settings = lazy(() => import('./routes/Settings'));

function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

**Real-world use:** Large apps — only load dashboard components when user navigates to dashboard, lazy-load modals only when first opened.

**Covered by:** Q49, Q50 (above).

---

**Q39. What is React Suspense, and when is it useful?**
Suspense lets you "suspend" rendering until a dependency is ready — then shows a fallback (from nearest `Suspense` boundary) while waiting.

```javascript
import { Suspense } from 'react';

// Suspense with lazy loading
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <Profile />
    </Suspense>
  );
}

// React 19 — Suspense with promises (data fetching)
function UserProfile({ userId }) {
  // Resource is a promise wrapped by React
  const user = userResource.read(userId);  // suspends here
  return <h1>{user.name}</h1>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile userId={123} />
    </Suspense>
  );
}
```

**When useful:**
- Lazy loading components (code splitting)
- Data fetching (React 19+)
- Transition states (loading spinners)

**Real-world use:** Route transitions, modal loading spinners, data-dependent rendering in React 19+.

**Covered by:** Q50, Q307 (above) + code examples.

---

**Q40. How would you investigate and improve a slow React application?**
1. **Profile** — Use React DevTools Profiler to find slow/wasting components
2. **Memoize** — Apply `React.memo`, `useMemo`, `useCallback` to prevent unnecessary renders
3. **Split bundles** — Use `React.lazy` + `Suspense` for route/component-level splitting
4. **Virtualize** — Use `react-window` for large lists/tables
5. **Cache** — Use `react-query`/TanStack Query for API data caching

```javascript
// Step 1: Memoize expensive children
const MemoizedRow = React.memo(Row);

// Step 2: Virtualize large list
import { FixedSizeList } from 'react-window';
function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
}

// Step 3: Memoize list with useCallback
function Parent() {
  const handleClick = useCallback((id) => {
    // handle click
  }, []);
  
  return (
    <FixedSizeList>
      {items.map(item => (
        <MemoizedRow 
          key={item.id} 
          item={item} 
          onClick={handleClick} 
        />
      ))}
    </FixedSizeList>
  );
}
```

**Real-world use:** Any large app experiencing performance issues — e-commerce sites, dashboards with data tables.

---

### 11.5 Advanced React Concepts (Questions 41–50)

**Q41. What are the limitations of Context API?**
1. **Re-renders all consumers** — changing context value re-renders every consumer
2. **No devtools** — no Time Travel, action logging, or middleware
3. **Not ideal for frequent updates** — every value change triggers re-renders
4. **Can't persist** — no built-in persistence or caching
5. **Debugging is harder** — no action/reducer traceability

```javascript
// ❌ Context performance problem — updates too frequently
const LiveDataContext = createContext();

function App() {
  const [data, setData] = useState(largeDataSet);
  
  // Every micro-update causes ALL consumers to re-render
  return (
    <LiveDataContext.Provider value={data}>
      <Header />      // re-renders
      <Sidebar />     // re-renders  
      <Content />     // re-renders
    </LiveDataContext.Provider>
  );
}

// ✅ Fix: Split contexts + memoize value
const HeaderContext = createContext();  // rarely changes
const DataContext = createContext();      // changes frequently

function App() {
  const headerInfo = useMemo(() => ({ theme, locale }), []);
  const liveData = useMemo(() => data, [data]);
  
  return (
    <HeaderContext.Provider value={headerInfo}>
      <DataContext.Provider value={liveData}>
        <Header />  {/* never re-renders from data changes */}
        <Sidebar />
        <Content />
      </DataContext.Provider>
    </HeaderContext.Provider>
  );
}
```

**When to use:** Simple global state (theme, auth). For complex state, use Redux/Zustand.

**Covered by:** Q145, Q147 (above).

---

**Q42. What is the difference between Context API and Redux?**
| Context API | Redux/Zustand |
|-------------|---------------|
| Built into React | External library |
| Re-renders all consumers | Selective subscriptions |
| No devtools | Full devtools (time-travel, action log) |
| Good for simple, infrequent updates | Good for complex, frequent updates |
| No middleware support | Middleware (thunk, saga, logging) |
| No persistence | Persistence middleware |

```javascript
// Context API — simple global state
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />  // consumes via useContext
    </ThemeContext.Provider>
  );
}

// Redux — complex state with devtools
const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
  }
});
// DevTools show action log, state history, time travel
// Components subscribe via useSelector — only re-render when their slice changes
```

**Real-world use:** Theme = Context. User cart + complex filters = Redux/Zustand.

**Covered by:** Q145, Q156 (above).

---

**Q43. What is Redux Toolkit, and what problems does it solve?**
Redux Toolkit (RTK) is the official, opinionated way to use Redux — it removes 90% of the boilerplate.

```javascript
// ❌ Plain Redux boilerplate:
const ADD_TODO = 'todos/add';
function addTodo(text) { return { type: ADD_TODO, payload: text }; }
function todoReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO: return [...state, { id: Date.now(), text }];
    default: return state;
  }
}

// ✅ Redux Toolkit — no boilerplate:
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload });
      // Immer makes this mutable syntax work immutably under the hood
    }
  }
});
// Auto-generated: { actions: { addTodo }, reducer: todosSlice.reducer }
```

**Problems solved:**
1. Excessive boilerplate — `createSlice` auto-generates actions
2. Immutability complexity — built-in Immer support
3. Store config complexity — `configureStore` with defaults
4. Async logic — `createAsyncThunk`, `RTK Query`

**Real-world use:** Large apps with cross-cutting state — e-commerce carts, dashboards with shared filters.

**Covered by:** Q153 (above).

---

**Q44. What is the difference between useReducer and useState?**
| useState | useReducer |
|----------|------------|
| Simple values (count, boolean) | Complex state objects |
| `setState(newValue)` | `dispatch({ type: 'X', payload: y })` |
| Direct value update | Transition based on action + current state |
| Multiple setters needed for related state | Single dispatch with clear action types |

```javascript
// useState — simple:
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// useReducer — complex state with clear transitions:
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action');
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>−</button>
      <input 
        type="number" 
        value={state.step}
        onChange={e => dispatch({ type: 'setStep', payload: +e.target.value })}
      />
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  );
}
```

**Why useReducer over useState for complex state:**
1. **Predictable transitions** — single reducer function = all state logic in one place
2. **Easy to test** — reducer is a pure function
3. **Scalable** — adding new actions is cleaner than managing multiple setters
4. **Prepares for Redux** — same pattern, easier migration

**Real-world use:** Form state, shopping cart, complex UI state (watches, timers, multi-step forms).

**Covered by:** Q135 (above) + code comparison.

---

**Q45. What is error handling with Error Boundaries?**
Error Boundaries are class components with `componentDidCatch` or `getDerivedStateFromError` that catch JavaScript errors in their children and render fallback UI.

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    // sendToErrorService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage — wrap root or section:
function App() {
  return (
    <ErrorBoundary>
      <Toolbar />
      <Content />
      <Sidebar />
    </ErrorBoundary>
  );
}
```

**What it catches:** Errors during rendering, in lifecycle methods, and in constructors.
**What it does NOT catch:** Event handler errors, async code (Promises), server-side rendering.

**Real-world use:** Wrapping entire apps, protecting critical UI sections, graceful degradation.

**Covered by:** Q195, Q198 (above) + code.

---

**Q46. What is the difference between Client-Side Rendering (CSR) and Server-Side Rendering (SSR)?**
| Client-Side Rendering | Server-Side Rendering |
|-----------------------|----------------------|
| Renders in browser | Renders on server |
| JS bundle loads → HTML created | HTML sent to client |
| Slower initial load (bundle download) | Faster initial load (no JS for first render) |
| SEO problems (empty HTML until JS loads) | SEO friendly (content in HTML) |
| Client resources used for rendering | Server resources used for rendering |
| Better interactivity after hydration | Hydration needed for interactivity |

```javascript
// CSR — Create React App / Vite SPA
function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // API call happens in browser after page loads
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  // Initial render: <div id="root"></div>
  // After JS loads + fetch: <div>Hello {data}</div>
  return <div>{data ? <Content data={data} /> : <Loading />}</div>;
}

// SSR — Next.js getServerSideProps
export default function Page({ data }) {
  // `data` is already here when component renders!
  return <Content data={data} />;
}

export async function getServerSideProps() {
  const res = await fetch('https://api.app/data');
  const data = await res.json();
  return { props: { data } };  // HTML sent with data already in it
}
```

**Real-world use:** SSR for marketing pages (SEO), blogs. CSR for dashboards (interactivity first).

**Covered by:** Q205, Q224 (above).

---

**Q47. What is hydration in React?**
Hydration is the process of making server-rendered HTML interactive — React attaches event listeners and runs state, without re-rendering the HTML.

```javascript
// Server renders HTML:
// <div id="__next"><button>Hello</button></div>

// Client downloads React bundle, then "hydrates":
// React attaches onClick handler to the existing button
// No DOM rebuild — just event listener binding

function App() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
    // Server HTML has count=0, client takes over interactivity
  );
}
```

**Hydration mismatch:** If server and client render different HTML:
```javascript
// ❌ Mismatch — Date.now() changes between server and client
function Bad() {
  return <div>Current time: {Date.now()}</div>;
  // Server: <div>Current time: 1234567890</div>
  // Client: <div>Current time: 1234567999</div> -- HYDRATION ERROR!
}

// ✅ Fixed — use useEffect for client-only data
function Good() {
  const [time, setTime] = useState(null);
  useEffect(() => setTime(Date.now()), []);
  return <div>Current time: {time ?? 'loading...'}</div>;
  // Server: <div></div>, Client after hydration: <div>1234567890</div>
}
```

**Real-world use:** Every Next.js app, React 19's streaming SSR, partial hydration.

**Covered by:** Q247 (above).

---

**Q48. What are React Portals, and when would you use them?**
`createPortal` renders children into a DOM node outside the parent hierarchy — useful for modals, tooltips, dropdowns that get clipped by `overflow: hidden`.

```javascript
import { createPortal } from 'react-dom';

function Modal({ children, onClose }) {
  // Portal renders into document.body, NOT inside parent
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body  // renders here — outside all parent stacking contexts
  );
}

// Even if parent has overflow: hidden and z-index: 1:
function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div style={{ overflow: 'hidden', zIndex: 1 }}>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      
      {/* Without portal, modal is clipped and z-indexed wrong */}
      
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>This modal renders above everything</h2>
          <p>Even though it's a child in React tree, it's at document.body</p>
        </Modal>
      )}
    </div>
  );
}
```

**Real-world use:** Modals, dropdowns, tooltips, notifications — anywhere z-index/overflow matters.

**Covered by:** Q337 (above) + code.

---

**Q49. Context vs Hooks vs Classes — what's the future?**
(No explicit mapping — covered by individual hooks questions + Q79 about composition)

**Q50. Why is discussing trade-offs important in a senior React interview?**
Interviewers test whether you understand when solutions have costs, not just whether you know the solutions exist.

```javascript
// Instead of "always use hooks":
// ✅ Senior answer: "Hooks are great for logic reuse, but 
// class components still work for legacy codebases. I'd use
// hooks for new features and migrate classes when refactoring."

// Instead of "always useReducer":
// ✅ Senior answer: "useState for simple values, useReducer for 
// complex transitions — but for forms with 10+ fields, I'd 
// consider a library like react-hook-form or Zustand."

// Instead of "always React.memo":
// ✅ Senior answer: "React.memo prevents re-renders, but adds 
// shallow-compare overhead and can cause bugs with inline 
// props. I'd memoize only expensive child components with 
// stable prop references."
```

**Covered by:** Q500 (above). 

---

## Key Mapping: User's 5 Topic Areas → Our Questions

| Topic Area | User Questions | Covered By (Q# in this doc) |
|-----------|---------------|------------------------------|
| React Fundamentals (1–10) | All 10 | Q1–87 (new Section 11.1) |
| React Hooks (11–20) | All 10 | Q26–38 + new Q11.1–11.20 |
| Props, State & Communication (21–30) | All 10 | Q10, Q226, Q88, Q227–229, Q109–111 |
| Rendering & Performance (31–40) | All 10 | Q304–308, Q198–208 |
| Advanced Concepts (41–50) | All 10 | Q209–223, Q247, Q339 |

**Note:** Some questions required **new** additions (Q11.26, Q11.27, Q11.31, Q11.32, Q11.39, Q11.41, Q11.44) to ensure the full 50-question set is covered with code examples and real-world use cases.
