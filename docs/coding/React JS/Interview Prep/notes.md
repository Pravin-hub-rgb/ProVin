# React Interview Questions — Structured Notes

Everything from the raw transcripts in one place: duplicates removed, each question numbered, answers cleaned up and organized by level. Each answer also shows the **follow-up** an interviewer is likely to ask next — because in a real interview the next question comes from your answer.

**How to use:** read section by section. For each question, say the answer out loud, then the follow-up. If you can't answer the follow-up, that's the gap to fix — not the question itself.

**Contents:** [Beginner](#beginner) · [Intermediate](#intermediate) · [Advanced](#advanced) · [Senior / Scenario-Based](#senior--scenario-based) · [Appendix: JS questions asked in the same interview](#appendix-js-questions-asked-in-the-same-interview) · [How to approach the interview](#how-to-approach-the-interview-from-the-video) · [Sources](#sources)

---

## Beginner

### Q1. What is React?

**React is a JavaScript library for building user interfaces.** It lets you break the UI into small, reusable pieces called **components**. For example, on an e-commerce site instead of one giant page you build separate components — header, navbar, product card, login form — each with its own responsibility, then combine them into the complete UI.

React uses a **declarative** approach: you describe *what the UI should look like* for a given state and props, not *how* to mutate the DOM step by step. And it's a **library, not a framework** — it focuses on the UI layer; routing, data fetching and other app-level concerns come from additional tools (React Router, etc.).

**Likely follow-ups:**
- *Why do we need components?* — They let you break a complex UI into smaller manageable pieces. Need to change the product card? You touch only that component — not the whole app. Large UI → smaller components → easier to build, reuse, maintain.
- *React is a library — why not a framework?* — React focuses on the UI layer; routing and data fetching are handled by other tools. Safest interview answer: React is a JavaScript library focused on building user interfaces.

### Q2. What is an SPA (Single-Page Application)?

An SPA is a web application where the browser **initially loads the app once**, and after that navigation and UI updates happen **without requesting a completely new HTML document for every route**. In a traditional site, going from page A to page B usually means a fresh document request; in an SPA the URL changes, the UI updates client-side, and there's no full reload — so it feels more app-like.

**Likely follow-up:** *Is React an SPA?* — No. React is a UI library. You can build an SPA with React plus a routing solution (React Router), but React ≠ SPA.

### Q3. What is JSX, and how is it different from HTML?

**JSX (JavaScript XML)** is a syntax extension that lets you write HTML-like syntax inside JavaScript. Example: `<h1>Hello</h1>` looks like HTML, but **JSX is not HTML** — tooling (Babel) **transforms JSX into plain JavaScript** before it runs in the browser.

Differences from HTML:
- `class` → `className`
- JavaScript expressions can be embedded with `{}` — this is how UI and logic connect naturally
- Some HTML attributes have different names in JSX

**Trap to avoid:** *"JSX is just HTML inside JavaScript."* — No. It *looks* like HTML, but technically JSX is a JavaScript extension that gets compiled to JavaScript. That answer is much better in an interview.

### Q4. Difference between functional and class components?

**Class components** — JavaScript classes extending `React.Component`, with a `render()` method and lifecycle methods. **Functional components** — plain JavaScript functions that return JSX; with hooks they can use state and every other React feature, and they are the **modern standard**.

Class components still exist in legacy codebases, so basic recognition is useful. (In this course you'll almost never write class components.)

**Likely follow-up:** *Are function components better just because they're shorter?* — No. Modern React APIs and patterns are designed around **hooks**, which work naturally with function components. That's why they're the preferred style — not the line count.

### Q5. Difference between stateless and stateful components?

- **Stateless (presentational) components** — hold no internal state; they receive data via props and render UI.
- **Stateful (container) components** — hold and manage their own state (`useState`/`useReducer`) and pass data down as props.

Keep logic in stateful components and display in stateless ones — that separation keeps the UI predictable and reusable.

### Q6. What are props in React?

**Props** (short for *properties*) are **values passed from a parent component to a child component**. Example: a `ProductCard` receives `name` and `price` as props and renders them. Conceptually: **parent passes data to child — one-way data flow.**

**Likely follow-up:** *Can the child change the props it receives?* — No; a child should not directly mutate its props. If it needs to request a change, the parent passes a **callback function**; the child calls it → the parent updates its state → new props flow down. Flow: `parent state → props → child → callback → parent state update → new props`.

### Q7. Difference between state and props?

Both represent data, but with different responsibilities:

- **Props** — inputs provided to a component, usually by its parent. Data comes from **outside**.
- **State** — data **managed by the component itself**; it can change over time. Example: a "liked" toggle inside a product card.

**Important correction:** props *can* change (parent re-renders with new props) — the point is that the **child must not directly mutate** the props it receives. State is what the component owns and updates.

### Q8. What are controlled vs. uncontrolled components?

- **Controlled components** — the input's value is controlled by **React state** (`value={state}` + `onChange`). React is the source of truth. You get easy validation, conditional UI, and central form-state management.
- **Uncontrolled components** — the **DOM** maintains the value; you read it with a **ref** (e.g. on submit).

**Likely follow-up:** *Why would anyone use uncontrolled?* — Not every form needs state-driven validation; for simple cases an uncontrolled approach is practical. It depends on the situation.

### Q9. What is the purpose of the `key` attribute in React lists?

Keys help React **maintain the identity of list elements across renders** — React uses them to understand which items are new, removed, or kept, so it can update the DOM minimally and correctly. Example: list `A B C` becomes `X A B C` — keys tell React which items are existing and which are new.

Use a **stable, unique identifier** (e.g. a database ID).

**Trap to avoid:** *"Can I just use the array index as key?"* — Only for **static** lists where items never get added, removed or reordered. In dynamic lists the positions change, and index keys become problematic — stable identity is the better choice. Also: keys don't just silence the warning — they let React know **which item is which across renders**.

### Q10. What are fragments in React?

A **Fragment** lets you group multiple elements without adding an extra DOM node (`<React.Fragment>` or `<>...</>`). Useful when a component must return sibling elements (e.g., table rows) without a wrapper that would break valid HTML/CSS layout.

### Q11. What is the Virtual DOM?

The **Virtual DOM** is a common term for React's **in-memory representation of the UI**. When state or props change, React computes the updated component output; from the differences, it determines what changed and what can stay the same, and the necessary changes are committed to the real DOM. React does **not** throw away and rebuild the whole DOM every render.

**Important correction:** don't say "the virtual DOM makes React always faster" — that's an oversimplification. Better answer: the Virtual DOM is an in-memory representation of the UI that React uses as part of its rendering and update process, allowing it to determine the necessary changes before committing updates to the real DOM.

---

## Intermediate

### Q12. What are React lifecycle methods?

A component has three stages:

1. **Mounting** — the component appears in the UI for the first time (`componentDidMount` in class components)
2. **Updating** — props/state change and the component re-renders (`componentDidUpdate`)
3. **Unmounting** — the component is removed from the UI (`componentWillUnmount`)

Class components exposed these as explicit methods. Modern function components use **hooks** instead.

**Likely follow-up:** *Is useEffect just a replacement for lifecycle methods?* — Not exactly. Better mental model: **useEffect is about synchronizing a component with something outside React** — event listeners, timers, subscriptions, browser APIs. And if a value can simply be derived from existing props/state, derive it directly instead of using an effect.

### Q13. Explain the useState and useEffect hooks.

**`useState`** lets a function component have state: `count` is the current value, `setCount` requests a state update. When state updates, React may re-render the component so the UI can be recomputed from the new state.

**`useEffect`** synchronizes a component with **external systems**: attaching a browser event listener, starting a timer, creating a subscription. Setup happens inside the effect; if cleanup is needed, the effect returns a cleanup function (e.g., remove the listener). The **dependency array** decides which reactive values re-trigger the effect.

**Common mistake:** don't use `useEffect` for every calculation. If a value can be derived from existing props/state, compute it directly — it doesn't belong in an effect.

### Q14. When to use the useLayoutEffect hook?

Use it when a **DOM element's appearance or behavior depends on a side effect**. Example: a paragraph must turn bold only if an external API returns data (otherwise stay normal). With `useEffect` the UI can paint first in the old style and then flash the new style; `useLayoutEffect` runs **synchronously after DOM mutations but before the browser paints**, so the user never sees the stale UI.

Pattern: fetch data inside the layout effect → check the result → set the element's style via a ref (conditional, based on the API response). The HTML element's style depends on the API data — that's the need.

### Q15. What is the role of the useCallback hook?

**`useCallback` is used to memoize functions** in function components — it returns the same function reference between renders until its dependencies change.

The problem it solves: a parent re-renders → a new `handleIncrement` reference is created → the child (which receives it as a prop) re-renders unnecessarily. Wrapping the handler in `useCallback` keeps the reference stable, so the child can skip re-rendering — a performance win.

**Caveats:** for a single child / simple case it can be overhead; it's worth it with **multiple child components**. And everything still works fine without it — it's an optimization, not a correctness tool.

### Q16. What's the difference between useMemo and useCallback — and when should you NOT use them?

- **`useMemo`** memoizes a **value**
- **`useCallback`** memoizes a **function**

Both prevent re-creation on every render. Don't overuse them: if the memoization itself costs more than recalculating the value, you *hurt* performance. Use them only when:
- the value/function is **heavy to compute**, or
- it causes **unnecessary re-renders in children**

They are performance tools, not default habits. (Think: `useCallback(fn)` ≈ `useMemo(() => fn)`.)

### Q17. How does useRef differ from useState?

**`useRef`** holds a mutable value that does **not** cause a re-render when it changes. **`useState`** holds values that **do** trigger re-renders.

Use `useRef` for:
- DOM refs (`ref={myRef}`)
- storing timers, counters, previous values
- updating without re-rendering

Short version: **useState = React cares when it changes; useRef = React ignores the change.**

### Q18. What is the Context API?

**Context** is a mechanism that lets you share values down the component tree **without manually passing props through every intermediate component**. Common examples: theme, current user, locale.

Flow: create a context → wrap the subtree in a **Provider** with a value → consuming components read it (e.g. `useContext`).

**Trap to avoid:** *"So Context replaces all state management?"* — No. Context's job is making a value available across a subtree without prop threading. For complex application state, other approaches (e.g., Redux) may be more appropriate. Context is not a universal state manager.

### Q19. What is reconciliation in React?

**Reconciliation is the process React uses to determine the necessary changes to the rendered UI when a component's output changes.** When state changes → React computes the updated component output → determines what changed / what stayed the same / what needs updating → commits the necessary changes to the DOM.

Lists: stable **keys** help React understand element identity. **Element types** also matter — React handles different element types differently in the tree.

**Important correction:** avoid the oversimplified line "React compares the old virtual DOM with the new virtual DOM." Better: when the re-rendered output changes, reconciliation is the process React uses to determine what changes are necessary in the UI.

### Q20. What are HOCs (Higher-Order Components)?

An **HOC is a function that takes a component and returns an enhanced component** with extra props or behavior — typically used to reuse component logic (e.g., Redux's `connect()`, `withRouter`). With hooks, most HOC use cases are now written as custom hooks instead.

### Q21. Explain React Portals.

A **Portal** renders a child into a **different DOM node** than the parent component's place in the tree — typically used for modals, tooltips and dropdowns that must visually escape their parent (e.g., render at `document.body`) while remaining **logically** inside the React tree. Events still bubble through the **React component hierarchy**, not the DOM hierarchy.

### Q22. Explain React Strict Mode.

**Strict Mode** (`<React.StrictMode>`) is a **development-only** wrapper that helps surface potential problems: it **double-invokes render and effects** to reveal impure logic and missing cleanup, and warns about deprecated APIs and legacy lifecycle behavior. It renders no visible UI and is ignored in production builds.

### Q23. What is props drilling in React?

**Props drilling** happens when data must reach a **deeply nested component** by passing props through multiple intermediate components — even though those intermediate components don't need the data themselves. Example: `Parent → Child → Grandchild → UserProfile`; parent has the user data, only `UserProfile` needs it, yet everyone in between must forward it.

Fine in small trees; the problem appears in large apps where the same data is threaded through many levels. The usual answer/fix is the **Context API** (or a state library for complex cases).

### Q24. What is useImperativeHandle in React, and when should it be used?

**`useImperativeHandle`** (paired with **`forwardRef`**) lets a child component expose **custom methods** to a parent instead of exposing the full DOM ref. Example: a custom `Input` component that exposes a `focus()` method to its parent — instead of handing the parent the entire DOM node.

It's niche but powerful: it keeps **encapsulation** — the parent gets controlled access to only the methods the child chooses to expose, nothing more.

---

## Advanced

### Q25. What is React Fiber, and how does it differ from the old reconciliation algorithm?

**React Fiber** (introduced around React 16) is a complete rewrite of React's core rendering engine. Its job: **break rendering work into small units and prioritize tasks by urgency** — so the app stays smooth, especially in large apps.

Before Fiber, rendering was **synchronous and blocking** — a heavy UI update could freeze the browser. With Fiber, rendering is **interruptible** — React can pause work, handle something urgent (like user input), and resume where it left off.

In short: **Fiber brings asynchronous rendering, prioritization, and a better user experience.**

### Q26. How does React determine when to re-render a component?

React re-renders a component when:
1. **Its state or props change**, or
2. **Its parent re-renders** (unless the component is memoized)

React does **not** do deep comparisons by default — even if an object/array *looks* the same, a **changed reference is treated as different**. That's why `React.memo()`, `useMemo()` and `useCallback()` are important in performance tuning. The `key` prop also influences whether elements in a list need re-rendering.

### Q27. What are concurrent features in React, and how do they help?

Concurrent features (React 18) let React **prepare multiple versions of the UI at the same time**. Example: a user is typing in a search box while filtered results are fetching — without concurrency the UI can feel laggy; with concurrent rendering, React keeps the UI responsive while preparing the new result list in the background.

Relevant features: **`startTransition`**, **`useDeferredValue`**, and **automatic batching**. Concurrent features let React prioritize urgent updates (user input) over non-urgent work (data fetching) — multitasking superpowers for the UI.

### Q28. Explain React's batching behavior and what changed in React 18.

**Batching** = React groups multiple state updates into a single render to improve performance.

- **Before React 18**, batching worked only **inside React event handlers**. Updates inside `setTimeout` or `fetch().then()` triggered separate renders.
- **React 18 introduced automatic batching** — updates inside promises, `setTimeout`, and native events are now batched by default.

Result: fewer renders, better performance, and more predictable behavior across async code.

### Q29. How does Suspense work, and what are its real use cases beyond lazy loading?

`React.Suspense` lets you **wait for something** — a lazy-loaded component, or data fetching (with libraries like React Query, Relay, SWR). Wrap the component in `<Suspense fallback={<Loading />}>` and the fallback renders until the content is ready.

Beyond lazy loading:
- **Streaming SSR** (e.g., in Next.js)
- **Coordinating parallel data loading**
- **Delaying transitions** to avoid layout shifts

It's about better UX during loading states — not just code splitting.

### Q30. How do you optimize large lists in React?

Rendering thousands of items can crash the browser. What works:
- **Windowing libraries** like `react-window` or `react-virtualized` — render only the visible portion
- Proper **`key`** props
- **Memoization** (`React.memo`) to avoid re-rendering unchanged items

Think of a Netflix carousel — you only render what the user sees. Saves memory, time and power.

### Q31. How does React handle hydration in SSR, and what problems can arise?

**Hydration** is the process where React **attaches event listeners to server-rendered HTML** on the client. If the HTML rendered on the server **doesn't match** what the client renders, you get a **hydration mismatch** warning.

Common causes:
- Random values (`Math.random()`) during render
- Accessing `window` or `localStorage` on the server
- Async components not wrapped in `<Suspense>`

Hydration issues are subtle but can break the UI in production — always test SSR apps thoroughly.

### Q32. How does React Router handle navigation in a single-page app?

**React Router** is a dedicated routing solution that maps **URL paths to UI components**. If the app has routes like `/`, `/products`, `/profile` — a click on "Products" makes the routing system match the current URL and render the corresponding UI. In an SPA, navigation is handled **client-side** — no full HTML document reload per route change.

Example: `<Route path="/products" element={<Products />} />`

**Likely follow-up:** *Is routing built into React?* — No. React itself focuses on building UI; dedicated solutions like React Router handle routing.

---

## Senior / Scenario-Based

### Q33. What are the top three ways to achieve state management in React — and when to use what?

The three ways (for function components): **`useState` hook, Context API, and Redux**. The choice depends on your project's **complexity, size and requirements**:

| Approach | When to use it | Why |
|----------|---------------|-----|
| **`useState`** | Small, **component-level** state; state isn't shared/spread across components | Lightweight, built into React — ideal for small components with **isolated state** |
| **Context API** | Sharing **global/medium-complexity** data across many components without prop drilling | Avoids prop drilling; good for small-to-medium apps — not for very high complexity |
| **Redux** | **Large-scale** apps with complex state | Centralized store + actions → predictable state management, scales well as the app grows |

**Rule of thumb:** third-party tools (Redux) only for complex scenarios. For small/midsize apps, stick to built-in features — don't over-engineer.

### Q34. How to structure the project and maintain state across multiple components?

- Split components into separate files under **`components/`**
- Use **separate action files** per component
- Use **separate reducer functions** per component
- Keep **one store file** for the whole project — that's the preferred arrangement
- (Each component can own its slice, but the store stays single and predictable.)

### Q35. When to use useState vs useReducer?

| | `useState` | `useReducer` |
|---|---|---|
| Parameters | **1** — initial state value (string / number / decimal — a single value) | **2** — the reducer **function** + initial state **object** |
| Best for | Simple, single state (e.g., a count) | **Complex state** — multiple related properties updated together |
| Example | Counter | `person = { firstName, lastName, email }` — several properties updated in one action |

Why an object? Because `useReducer` is built for **complex state scenarios** — not a single value but multiple state pieces that change together. `useState` can't hold that (single data parameter); `useReducer` accepts an object so all properties update consistently.

**Flow:** component event (button click) → **dispatch** invokes the reducer → reducer performs the update logic **based on the action type** → new complex state object → re-render.

**Interview definition:** *useReducer is an alternative to the useState hook when dealing with complex state in your components.*

### Q36. When to use hooks vs Redux in React applications?

- **Use hooks (built-in, no extra packages)** when:
  - your app is **small to medium** (roughly 5–50 components)
  - the state-management requirement is **simple**
  - state is **specific to components** (not much sharing between them)
- **Use Redux** when:
  - your app is **big/complex** (50–60+ components)
  - you need **complex global state management**
  - components **share a lot of state** between them

Redux works beyond React too (separate package). Rule of thumb: **hooks are like a gun** — excellent at short range, easy to maintain; **Redux is like a tank** — effective but heavy, higher maintenance. Match the tool to the app.

### Q37. Differences between local component state and Redux state?

| Aspect | Local component state | Redux state |
|--------|----------------------|-------------|
| **Scope** | Limited to the component where it's defined | Global — accessible from all components via the store |
| **Managed by** | Internally, by the component itself | Externally, by the Redux store |
| **Performance** | More performant for small-scale apps | Gives better performance at large scale |
| **Setup** | Simple to set up and manage | Comparatively complex — overhead in small apps, easy in big ones |
| **Testing** | Easier — component-specific | Requires more comprehensive testing (global nature, multiple interactions — may need testing tools) |

### Q38. Explain the concept of middleware in react-redux.

Normally data flows `component → dispatch(action) → reducer → new state`. When the scenario is complex, **middleware sits between the dispatched action and the store**.

Middleware can **intercept actions, modify them, or execute additional logic before the action reaches the reducer** — most commonly used with **thunk action creators** to talk to an API: fetch the data, modify/construct the action based on it, then forward the action to the reducer together with the previous state to derive the new state.

Two key points to remember:
1. Middleware provides a **mechanism to add extra functionality** to the Redux store.
2. It works by **intercepting actions** — modifying them or running additional logic before the reducer sees them (e.g., calling an API, adding tokens, logging).

Configuration: pass the middleware (e.g., `thunk`) to the `middleware` property in the store setup.

### Q39. How do you handle asynchronous operations and side effects in react-redux?

One-line answer: **use middleware — specifically redux-thunk action creators** — to handle complex asynchronous operations like API data fetching. (See Q37.)

### Q40. How can you optimize performance in a React application?

Theoretical, senior-level question. Remember 3–4 of these:

1. **Memoization with `useMemo` and `useCallback`** — memoize functions and their results; reduces unnecessary recalculations
2. **Optimize renders with `React.Fragment`** — avoids unnecessary wrapper elements that create extra DOM nodes
3. **Lazy loading with `React.lazy`** — components load lazily; reduces initial bundle size and improves initial load performance
4. **Code splitting** — divide the app into smaller chunks loaded on demand; improves initial load time (same story as lazy loading)
5. **Optimize images and assets** — compress and optimize images; use responsive images; lazy-load images to reduce network and rendering bandwidth

(You'll also want `React.memo`, stable keys, and windowing for big lists — see Q25 and Q29.)

---

## Appendix: JS questions asked in the same interview

These are JavaScript, not React — kept here because they were asked in the same interview.

**Q41.** What is hoisting in JS?

**Q42.** How does hoisting work?

**Q43.** Does hoisting work with all variables, and why?

**Q44.** Difference between `let` and `var`?

**Q45.** What is the Event Loop?

**Q46.** Precedence in the Event Loop — which runs first, `Promise()` or `setTimeout()`?

**Q47.** Difference between `setTimeout()` and `setInterval()`?

**Q48.** Which ES6 features have you used?

**Q49.** Where do you mostly use the rest operator?

---

## How to approach the interview (from the video)

- Interviewers don't carry a fixed list — they take your answer, find a **gap** in it, and the next question comes from that gap. That's why "memorized answers" get exposed.
- Every answer has a natural **follow-up** (see the "Likely follow-ups" above). If you know what the interviewer will ask next, you'll never face "16th question" panic.
- Learn **concepts, not Q&A pairs** — rehearse: question → answer → (likely) follow-up → deeper concept → next question.
- If you don't know something: say *"Let me explain"* and connect it to a concept you do know — and admit the boundary honestly rather than bluff.
- The complete chain the interviewer follows: **React → components → declarative UI → JSX → props → state → "what happens when state changes" → controlled components → keys → Virtual DOM → lifecycle → useState/useEffect → props drilling → Context → reconciliation → React Router.**

**Memorize the chain, not just the answers.**

---

## Sources

These notes were distilled from four sources (transcripts and lists). Duplicates were merged; promotional segments and timestamps were removed.

1. **"React Interview Questions for Freshers / Intermediate / Advanced"** — video question list (Q1–Q20, timestamps included in the original)
2. **"Top 10 React Interview Questions"** — 15+ years experience, senior/scenario-based questions (state management, useState vs useReducer, hooks vs Redux, middleware, redux-thunk, useCallback, useLayoutEffect, performance) — English transcript
3. **"Top 15 React Interview Questions with Interviewer Follow-Ups"** — beginner → advanced chain with follow-up framing (Sneha / TAP47) — Hindi/Hinglish transcript, merged into the same structure
4. **"Top 10 Advanced React Interview Questions"** — Fiber, batching, Suspense, SSR hydration, list optimization (Shubham Kulkarni) — Instagram carousel; source index at [instagram.com/shubhamkulkarni_insta](https://www.instagram.com/shubhamkulkarni_insta)

The English source-4 answers overlap with the Intermediate/Advanced sections — they were merged, not duplicated.
