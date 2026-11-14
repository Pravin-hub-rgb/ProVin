# React Story

Every React doc you've read so far taught one piece at a time — JSX, `useState`, `useEffect`, each in isolation, each with its own "huh, why does this work?". This document connects the dots. It tells the same story the course tells, in order, in one long narrative: from the moment the HTML/JS era got painful, through the idea that fixed it, through the internals, through every hook and pattern you've used up to now — through Context API.

You don't need to memorize anything here. The point of a story is that you stop forgetting the "why" — because now every piece has a neighbor it belongs to.

## Part 1 — The Premise: Why React Exists at All

Every developer starts the same way. `index.html`, `style.css`, `script.js`. You type some tags, you open the page in the browser, it looks the way you want. So far so good. The pain arrives when the page stops being static.

Add a button. Add a to-do list. Now you want the counter to increase, the task to mark complete, the input to clear. Suddenly you're writing this kind of thing:

```js
document.getElementById("add-btn").addEventListener("click", () => {
  const input = document.getElementById("task-input");
  const taskText = input.value;
  if (taskText === "") return;
  const li = document.createElement("li");
  li.textContent = taskText;
  document.getElementById("task-list").appendChild(li);
  input.value = "";
});
```

This is **imperative code** — you micromanage the DOM step by step. Find this element. Create that node. Set its text. Attach it to the list. Clear the input. For every feature, you write every step by hand. It works — until it doesn't. By the time the page has ten such handlers, you have ten places where your data (what tasks exist, what's checked, what's typed) is different from what's on screen, and you have no single place to ask "what is the current truth?" to fix it. The bugs are all the same: **the HTML stopped matching the JavaScript.**

This is the same underlying mismatch a compiler exists to bridge, just in a different costume: a human can hold "the screen should look like X right now" in their head, but code can never express "the screen should look like X" directly — code has to say "find the button, add 1 to its text, re-check it, hide the other one" by hand. Every imperative instruction is a gap where the UI can drift from reality.

So here is the premise, the same one the DSA course used to open with:

> **The browser is the one place where the UI is a function of state — but the language being used to build it has no built-in way to express that. React is that missing expression.**

In plain terms: you tell React what the screen should look like *for the current state of your data*, and React takes care of making the real DOM match that — detecting every change you made to the data, computing exactly which nodes need to move, and only touching those. You describe the destination; React drives.

That's **declarative UI**. Instead of "find the button, change its text to 3," you write `{count}` in JSX, and React guarantees that the text updates when `count` changes. No `getElementById`. No manual book-keeping of which node is stale. State is the truth — the screen is just a rendering of it.

Keep that premise in mind for the rest of the story. Every mechanism from here on — Virtual DOM, reconciliation, hooks, context — is a different chapter of solving this one problem: **how does the screen stay a faithful rendering of the data, without the human having to hand-manage every pixel?**

## Part 2 — How React Does It: The Virtual DOM Mechanism

React can't just magically know what changed. It needs its own internal account of the screen — plain JavaScript objects, cheap to create and compare, not the real DOM. That internal account is the **Virtual DOM**.

When you write JSX like `<p>{count}</p>`, it doesn't become HTML. It becomes a function call — **`React.createElement()`** — compiled there by Babel (check your dev tools; your JSX is really a tree of JS function calls). Each `createElement` returns a plain object describing the element: type, props, children — `{ type: "p", props: { children: count } }`. Nest them and you get a tree, the Virtual DOM.

That tree is cheap. Building a thousand virtual elements costs a fraction of a millisecond. The real DOM is the expensive one — touching it reflows layouts and repaints. So React keeps the cheap tree in memory, computes what changed inside it, and only then touches the real DOM, and only where it must.

Three mechanisms make that possible:

**Reconciliation.** When state changes, React builds a brand-new Virtual DOM tree and compares it to the previous one. It walks both trees in parallel; for each node it asks "same type? same position? same key?" — if yes, it doesn't recreate the node, it only updates its props if they changed. If the type differs, React destroys the old node and rebuilds from its new branch. Reconciliation is just a diff algorithm tuned for element trees — it's why React updates surgical bits of the page instead of re-rendering the world. That is also why **the `key` prop** matters: keys give elements stable identity, so a reordered list doesn't destroy/rebuild — it just moves the existing nodes.

**Fiber.** Building and diffing the tree is work — a lot of it. React can't stop mid-render to let the browser breathe. Fiber restructures that work into units: each component's render is broken into pieces, the pieces get priorities, and the browser can pause fiber, let urgent rendering (clicks, typing) through, then come back and finish. That's why time-travel debugging, Suspense, and Concurrent React exist — fiber is the engine under all of them. You'll almost never write fiber code; you just benefit that React never freezes your tab on big updates.

**Batching.** Your code runs `setCount(1)`, `setCount(2)`, `setCount(3)` synchronously, one after another. Without batching, that'd be three renders. React groups them — within one event handler or one tick, multiple `setState` calls become a single re-render. The UI never flickers through intermediate 1-then-2-then-3; it goes straight to the final state.

**Synthetic events** are the last piece of Module 0. Clicking a button fires a native browser event — but every browser names its events slightly differently and attaches them at different moments. React wraps the native event in a **synthetic event** — one normalized object with the same API everywhere — and attaches a single top-level listener. Same code, every browser.

Those four are the answer to **how does React keep the screen matched to state automatically?** From here on, every feature you write sits on top of this engine:

```
user input → synthetic event → handler runs → setState called
     ↓
React batches pending updates
     ↓
render phase → compares new Virtual DOM vs previous Virtual DOM (reconciliation via fiber units)
     ↓
React identifies the nodes that differ
     ↓
commit phase → the real DOM is patched, only at those nodes — nothing else repaints
```

That entire pipeline runs on every state change — silent, invisible, fast. Now let's see what your code actually looks like inside it.

## Part 3 — Components & JSX: Your Half of the Contract

React does the book-keeping; you write the *description* of the UI. That description is made of **components**.

A React project created by Vite looks like: `index.html` loads `src/main.tsx`, which calls `createRoot(...).render(<App />)`, and `App.tsx` is your first component — a function returning JSX. JSX is not HTML: it's a tag syntax that compiles to `React.createElement(...)`. That's why `className` instead of `class`, `onClick` instead of `onclick`, `htmlFor` instead of `for` — the attributes map to JS property names, not raw HTML.

Components compose into trees. `<App>` is your whole page; `<Navbar />`, `<Main />`, `<ProfileCard />` inside it are independent subtrees, each rendering its own JSX. Just like functions calling functions, your page is components calling components — each one a small, isolated unit of UI logic.

**Import and export** make components reusable between files. A component written in one file can be `export default`-ed and `import`-ed into its parent's file — the module system (ES Modules under Vite) turns individual files into a library of buildable, testable units. Named exports, default exports, rule of thumb: one component per file, exported `default`, imported by path.

Data enters components as **props**. Props are what a parent passes to a child — strings, numbers, booleans, objects, even functions. They flow in one direction: **props go down the tree, events go up.** If `<ProfileCard name="Ada" role="Engineer" />` renders with those two props, `ProfileCard` cannot change them — props are read-only for the child. Need the parent to know something happened? Pass a function prop — **a callback** — and the child calls it with the result. That's how sibling components "talk" without ever touching each other directly: both talk to the parent, through props.

**TypeScript** enters here because props are plain JavaScript objects — which means a typo in `role` (`role` vs `rol`) silently works until some edge case hits it. You type props as `interface Props { name: string; role?: string }` — the compiler rejects bad prop shapes at build time rather than at runtime: that's the point of TS in React code.

**`children`** is a special prop — everything a component wraps between its opening and closing tags arrives as `props.children`. That's how cards, modals, and panels stay generic: `<Card><ProfileCard /></Card>` — `Card` renders `{children}` inside its frame and doesn't need to know what's inside.

None of this needed a new idea — just the same functions, values, and interfaces you already knew. What's missing is state.

## Part 4 — State: useState, the Trigger That Matters

Components can receive props, but props don't change from inside a component. For something the component itself own — like a counter, the text in a field, the visibility of a panel, a checked state — React gives you `useState`.

```tsx
const [count, setCount] = useState(0);
```

`useState` returns two things: the **current value** and a **setter**. The initial value (`0`) is used exactly once — only on the very first render. Every subsequent render, React ignores the initial value and remembers where the last update left off. Calling `setCount(count + 1)` doesn't "write to count" — it *schedules* a re-render with the new value. React runs the function again, the Virtual DOM gets rebuilt, reconciliation compares it to the old one, and only what differed gets committed to the real DOM.

That re-render loop is the heart of every React app you'll ever write:

```
event (click, keystroke) → handler → setState(X) → React batches → re-render → diff → commit → UI reflects X
```

And it works for anything represented as data inside a component:

- **Controlled inputs**: `<input value={search} onChange={e => setSearch(e.target.value)} />` — the visible text *is* the state, React controls the input rather than the DOM holding it.
- **Lists**: `{items.map(item => <li key={item.id}>{item.title}</li>)}` — the `key` tells React which element is which when positions shift; unstable keys (like index in a reordered list) recreate instead of move, misplacing focus and input state.
- **Conditional rendering**: `{error && <p>{error.message}</p>}`, `{isLoggedIn ? <Dashboard /> : <Login />}` — state decides which subtree renders; no DOM manipulation anywhere.
- **Derived state**: anything you can compute from state (filtered arrays, totals, formatted strings) is computed on each render, not stored — stores only what can't be recomputed.

Everything outside this loop depends on it: catalog searches, forms, accordion toggles, the To-Do list. State is why `useState` is the single most-used hook in React, and why nearly every React pattern you'll see is just shaping this loop.

## Part 5 — Lifting State Up: One Source of Truth

Two sibling components need the same data. A search box needs to decide which products show, and the results grid needs those same products. Where does the state go?

React's answer: **the nearest common parent.** Whoever owns the state becomes the single source of truth. Both siblings receive data and callbacks from the parent — neither talks to the other directly. The search box calls `onChange(query)`, the parent stores the query, the grid re-renders from the parent-provided list. The status of the page is now exactly one piece of state in one component — there's one place to go wrong, one place to fix.

This is **lifting state up**, and it's used everywhere: an accordion's open items, a shopping cart, a filter bar, a tab indicator. Lift too far up and re-renders spread too wide; lift too little and siblings duplicate or become inconsistent — the industry answer is *lift just enough that the closest shared parent owns it*.

The cost shows up immediately: to pass anything deep into the tree you thread props through every intermediate component — components that don't do anything with the data except pass it along. That's **prop drilling**, and it's the seam leading to Context API. But before any of that works, the tree needs one more place for the work that can't belong inside a render — a place for code that runs after the screen is painted. That's the next chapter.

## Part 6 — useEffect & useRef: Escaping Render

Components are supposed to be pure: same props and state in, same JSX out, no hidden behavior. But real apps need to do things outside the render — timers, subscriptions, sync with browser APIs, fetch data. React can't fold that into "render" without breaking purity. **useEffect** is the room React provides for it:

```tsx
useEffect(() => {
  const id = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(id);   // cleanup: runs before effect re-runs or on unmount
}, []);                             // runs once after mount
```

The structure is always: **do the thing → return a cleanup function → list the dependencies.** The cleanup prevents timers and subscriptions from leaking across mounts. The dependency array decides when the effect re-fires — `[]` for mount-only, `[query]` for "whenever query changes".

Fetching fits here, and it's where the pain starts being felt. Manually fetching means declaring loading and error states, `useEffect(() => { ... }, [])`, ignore-flags to cancel stale requests, try/catch/finally, and repeating all of it in every new component for every new endpoint — line for line, wrong in the same spots every time.

That's why the course then introduces **TanStack React Query**. The memoize function from the JS course is the anchor here: `memoize(fn)` — first run computes, repeat calls with the same input get the remembered answer from a notebook. React Query is memoize stretched across the network: **`queryKey` is the input, the fetch is the slow work, the cache is the notebook.** First search for `"chicken"` → wait for the network → remember the answer. Second identical search → serve from cache, no request. The `QueryClient` is the shared notebook itself — a plain JS dictionary held inside it, holding every fetched copy while the app runs; `QueryClientProvider` hands that one box down to the components. Loading/error states, retry logic, caching, deduping concurrent requests — all built in; no more manual `try/catch/finally` per fetch.

Mini-projects — the User Directory, the Product Catalog, the paginated Blog Feed — worked the same pattern on different servers: one useQuery per data need, keyed by what that data depends on. The pattern is the skill, not the API.

One hook remains for the chapter, and it's the odd one out: **`useRef`** — a box that survives re-renders but never triggers one. `useState` change → render; `useRef` change → silence. Timer IDs (need them for cleanup, never on screen), DOM references (`inputRef.current?.focus()` on mount via `useEffect`), previous-values — the silent bookkeeping side of React. The rule: if the value needs to be on screen, `useState`; if it's only remembering, `useRef`.

## Part 7 — Context API: The End of Prop Drilling

Lifting state up solved consistency but left us threading props through every intermediate level — an `<App>` theme prop traveling `App → Layout → Page → Sidebar → Button`, touched by none of them except to pass it down. Any single prop misspelled burns somewhere arbitrary. That's prop drilling, and past two levels it's not a solution — it's a plumbing problem disguised as one.

**Context** is React's channel for bypassing the drilling: a Provider at the top of a subtree broadcasts a value, and every component inside it can read that value directly, skipping the intermediate levels entirely. A theme switch, the current user, a locale — the values every leaf needs and no branch cares about. `useContext(ThemeContext)` returns the current theme; the provider swaps to dark, every consumer re-renders with the new theme. Same two hooks, same pattern: `createContext`, paired `Provider` and `useContext`.

Context is not free. Every consumer re-renders on *any* change of the value passed to its Provider — even consumers not using the changed piece. That's why context isn't a cache, isn't a store, and isn't a replacement for lifted state in general. It's for tree-wide, mostly-static values — **theme, language, auth identity, locale** — not for anything that updates often or deeply-nested-but-dynamically-different things.

And with Context, this chapter of the story ends. The sidebar flows: `<App /> → <Layout /> → <Page /> → <LeafComponent />` — state lives at the nearest common parent, refs handle the non-reactive jobs, effects call out to the world, context hands down tree-wide constants. That is the complete foundation this course set out to build.

## The Story So Far

In one line per piece:

- **A developer's imperative childhood** — `getElementById` everywhere, state scattered, UI always drifting from data.
- **React's declarative answer** — JSX names what the screen should look like; React takes care of the DOM.
- **The pipeline that makes it safe** — synthetic events, fiber-managed render work, reconciliation by type/position/key, commit-only-where-it-differs, batched updates.
- **Your half** — components: functions that return JSX; props flow down, events flow up; TypeScript keeps prop shapes honest; composition via `children`.
- **State** — `useState`, the loop every React app lives in: event → setState → re-render → diff → commit; lists and keys; conditionals are ternaries/`&&`; To-Do App.
- **Lifting state up** — one source of truth per feature; the lift point is the nearest common parent.
- **The escape hatches** — `useEffect` for after-render side effects; TanStack Query to make network caching a solved problem; `useRef` for non-reactive memory.
- **The last seal** — Context: the hot-path for tree-wide immutable-ish values; never for frequent updates.

What React is **not**:

- **Not a framework by itself** — no routing, no state management standard, no data fetching convention built in; every library is your choice and your trade-off.
- **Not a DOM-manipulation language** — `.focus()`, `.click()`, `.play()` are browser JS APIs; React gives references to DOM nodes, it doesn't mutate the DOM for you.
- **Not a replacement for lifting state up** — context broadcasts values; it doesn't keep your source of truth consistent.
- **Not a substitute for discipline** — `useEffect` abuse, god-components, context for everything, props passed twenty-five levels deep — React will happily render all of them, slow and wrong.

## What's Next — The Story Isn't Over

Two batches came before this point: Module 0 built the *mechanism* (VDOM, reconciliation, fiber), Batch 1 built the *component* model (JSX, props, state), and Batch 2 is adding *memory and escape hatches* (effects, fetching, refs, lifting state, context). The story continues where this chapter ends — beyond this file's last line, the next chapters write themselves:

- **Navigation (react-router)** — how routes become components and guard who sees what.
- **Styling + Forms** — Tailwind, responsive design, React Hook Form + Zod.
- **State management** — `useReducer` + Context, and the E-Commerce Store built on it.
- **Performance** — `React.memo`, `useMemo`, `useCallback`, lazy loading.
- **Reusability + state libraries** — custom hooks, Zustand, Redux Toolkit.
- **One ending? No — multiple endings.**

This file gets a new chapter each time the story moves on. When you've finished a batch, come back here and read the new chapter — it will reference every concept you just felt, in the order you met them.
