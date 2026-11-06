# React Interview Questions — Beginner to Advanced

Every React interview question worth preparing, organized by level:

- **Beginner** — fundamentals, components, props, state, and the Virtual DOM (freshers)
- **Intermediate** — hooks, state management, performance, forms, error handling & testing
- **Advanced** — routing, React 19, architecture & trade-offs (senior-level)

Don't memorize — understand each concept, then practice explaining it in your own words.

---

## Beginner

What a fresher is expected to know cold.

**1. What is React and why use it?**
React is a JavaScript library for building user interfaces through component-based architecture. It solves the problem of building complex UIs where data changes over time — without React, you'd manually manipulate the DOM (error-prone and slow). React introduces a **declarative** approach where you describe what the UI should look like for each state, and React figures out the most efficient way to update the DOM.

**Problems React solves:**
1. **Manual DOM manipulation** — error-prone and slow when data changes
2. **State-UI sync** — keeping the UI in sync with application state
3. **Reusable components** — break the UI into isolated, reusable pieces
4. **Performance** — efficient, minimal updates through the Virtual DOM

```jsx
// Without React — manual DOM manipulation (what React solves)
const counter = { count: 0 };
document.getElementById('btn').onclick = () => {
  counter.count++;
  document.getElementById('count').innerText = counter.count;
  document.getElementById('count').style.color = counter.count > 5 ? 'red' : 'black';
};

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

**Real-world use:** every interactive web app — social media feeds, e-commerce carts, dashboards where the UI updates based on user actions.

**2. What is an SPA (Single-Page Application)?**
An SPA is a web application where the browser **initially loads the app once**, and after that navigation and UI updates happen **without requesting a completely new HTML document for every route**. In a traditional site, going from page A to page B usually means a fresh document request; in an SPA the URL changes, the UI updates client-side, and there's no full reload — so it feels more app-like.

**Likely follow-up:** *Is React an SPA?* — No. React is a UI library. You can build an SPA with React plus a routing solution (React Router), but React ≠ SPA.

**3. What are the main features and advantages of React?**
1. **Components** — encapsulated, reusable UI pieces
2. **Virtual DOM** — fast, efficient updates
3. **Declarative style** — describe the UI for each state, not manual DOM manipulation
4. **Unidirectional data flow** — predictable, easier to debug
5. **Hooks** — stateful logic in functional components
6. **Rich ecosystem** — routing (React Router), state (Redux/Zustand), testing (React Testing Library)

```jsx
function UserProfile({ user }) {
  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <button onClick={() => setUser({ ...user, online: true })}>Set Online</button>
    </div>
  );
}
```

**Use case:** a dashboard where multiple widgets update independently — components keep concerns isolated, Virtual DOM ensures only changed widgets re-render.

**4. Library vs Framework — which is React?**
React is a library because it only handles the UI layer — you need external tools for routing, state management, and HTTP calls (React Router, Redux, Axios). A framework (like Angular) is opinionated and provides everything built-in.

**5. What is the Virtual DOM?**
A lightweight in-memory copy of the real DOM. When state/props change, React first updates the Virtual DOM, then diffs it against the previous version (reconciliation) and updates only the changed parts in the real DOM — reducing expensive DOM operations.

```jsx
// Real DOM update (slow): update the entire subtree
document.getElementById('list').innerHTML = '<li>A</li><li>B</li>';

// Virtual DOM (fast): find minimal changes
// Old VDOM: [A, B]
// New VDOM: [A, B, C]
// React inserts only <li>C</li> — existing DOM nodes untouched
```

| Real DOM | Virtual DOM |
|----------|-------------|
| Direct manipulation | Declarative sync |
| Slow (full reflow) | Fast (targeted update) |
| Browser-native | React abstraction |
| Full object | Plain JS object |

**Real-world use:** every React update — typing in a form, adding items to a cart, live data feeds.

**6. What is Reconciliation?**
The algorithm React uses to compare the old and new trees (diffing) and sync the real DOM with minimum operations. It runs in two phases:
1. **Render phase** — determine what changed (diffing)
2. **Commit phase** — apply changes to the real DOM

React's heuristics for efficient diffing:
1. **Elements of different types** → full replacement (`<div />` → `<span />` destroys the div and creates the span)
2. **Elements of same type** → update only the changed attributes and children
3. **Children with same type and key** → reuse the instance (that's why keys exist)

It also reuses same-type elements and tracks list items with keys — an O(n) heuristic instead of a naive tree diff.

**Real-world use:** every React update — reconciliation decides whether to create new DOM nodes, update existing ones, or remove them.

**7. How does React update the UI when state or props change?**
Under the hood, three things trigger an update:
1. **State change** — `setState()` or a `useState` setter is called
2. **Props change** — parent passes new prop values
3. **Parent re-renders** — children re-render by default (or skip via memo)

**What happens next:** the component re-renders with the new state → React computes the new Virtual DOM → diffs it against the previous tree → patches only the changed DOM nodes (batched for performance).

```jsx
function Toggle() {
  const [on, setOn] = useState(false);   // state change triggers re-render
  return (
    <button onClick={() => setOn(!on)}>
      {on ? 'ON' : 'OFF'}                 {/* only the text node changes */}
    </button>
  );
}
```

**Real-world use:** click handlers, form inputs — any UI that responds to user interaction.

**8. What is React Fiber?**
React's reconciliation engine (since React 16). It breaks rendering work into smaller units that can be interrupted, so high-priority updates (like user input) don't block low-priority updates (like data-fetching renders) — the foundation for concurrent rendering.

**9. What is JSX?**
JavaScript XML — HTML-like syntax written inside JavaScript. Babel compiles it into `React.createElement()` calls at build time — browsers cannot understand JSX directly.

```jsx
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

**Real-world use:** every React component — from button components to page layouts. Without JSX, component libraries like Material-UI would be verbose to use.

**10. How do you return multiple root elements from a component?**
Use a Fragment: `<React.Fragment>` or the shorthand `<>...</>`. It groups multiple children without adding an extra DOM node — useful for table rows, list items and SVG elements, anywhere an extra wrapper would break valid HTML structure.

```jsx
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
```

**Real-world use:** table rows (`<tr>` inside `<tbody>` can't have a wrapper div), list items, SVG elements — anywhere an extra node would break the structure.

**11. Controlled vs Uncontrolled components?**
Controlled: form input value is controlled by React state (`value` + `onChange`) — React is the source of truth. Uncontrolled: the DOM maintains the input's value; access it with a `ref`.

```jsx
// Controlled — React owns the state
function ControlledForm() {
  const [name, setName] = useState('');
  return (
    <input type="text" value={name}
           onChange={e => setName(e.target.value)} />
  );
}

// Uncontrolled — the DOM owns the state
function UncontrolledForm() {
  const inputRef = useRef(null);
  const handleSubmit = () => console.log(inputRef.current.value);
  return (
    <><input type="text" ref={inputRef} />
       <button onClick={handleSubmit}>Submit</button></>
  );
}
```

**When to use:**
- **Controlled** — real-time validation, conditional rendering, controlled submission (signup forms)
- **Uncontrolled** — simple forms, integrating with non-React code, file inputs

**12. Why are keys necessary in list rendering?**
Keys help React identify which items changed, were added, or removed in a list — enabling efficient reconciliation and preventing wrong component state reuse. They must be unique among siblings and stable across renders — use a stable, unique id (e.g. database id), never the array index for dynamic lists.

```jsx
const todos = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Build app' },
];

// Correct — stable, unique keys:
{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}

// Problematic — index as key when the list can reorder:
{todos.map((todo, index) => <TodoItem key={index} todo={todo} />)}
```

With index keys, reordering breaks things: `[A, B, C]` → `[B, C, A]` makes React believe key `0` (A) became B → **stale state, wrong transitions**.

**Real-world use:** todo lists, search results, product lists where items are added/removed dynamically. A key warning isn't cosmetic — it prevents list state getting mixed up.

**13. What are props in React?**
**Props** (short for *properties*) are **values passed from a parent component to a child component**. Example: a `ProductCard` receives `name` and `price` as props and renders them. Conceptually: **parent passes data to child — one-way data flow.**

**Likely follow-up:** *Can the child change the props it receives?* — No; a child should not directly mutate its props. If it needs to request a change, the parent passes a **callback function**; the child calls it → the parent updates its state → new props flow down. Flow: `parent state → props → child → callback → parent state update → new props`.

**14. Props vs State?**
Props are read-only inputs passed from parent to child. State is mutable data managed inside a component that triggers a re-render when updated.

| Props | State |
|-------|-------|
| Read-only (immutable) | Mutable (via setter) |
| Passed from parent | Owned by the component |
| Re-render when parent updates | Re-render when setter is called |
| Configuration / input | Dynamic, interactive data |

```jsx
function ProductCard({ name, price, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);   // state — mutable
  return (
    <div>
      <h3>{name}</h3>                  {/* props — read-only */}
      <span>${price * quantity}</span>  {/* state — used */}
      <button onClick={() => onAddToCart(quantity)}>Add to Cart</button>
      <input type="number" value={quantity}
             onChange={e => setQuantity(+e.target.value)} />
    </div>
  );
}
```

**Real-world use:** props receive API data or configuration; state manages interactive UI (form inputs, selection, counters).

**15. Why should props be treated as read-only?**
React's one-way data flow means props come from parents and can't be modified by children — guaranteeing predictable data flow and preventing side effects.

```jsx
// ❌ never mutate props
function Bad({ count }) { count++; return <div>{count}</div>; }

// ❌ don't call the parent's setState during render
// ✅ correct — call the callback from an event handler
function Good({ onUpdate, value }) {
  return <button onClick={() => onUpdate(value + 1)}>Increment</button>;
}
```

**Contract:** the parent owns the data, the child is a "view" of it — making debugging predictable and components testable.

**16. What is unidirectional data flow?**
In React, data flows only from parent → child (through props). A child cannot directly modify a parent's data — you "lift state up" by passing callback functions so the child can trigger a parent update.

```jsx
function Parent() {
  const user = { name: 'Alice', age: 28, hobbies: ['coding', 'hiking'] };
  const handleSave = data => console.log('Saving:', data);
  return (
    <Child name={user.name} hobbies={user.hobbies} onSave={handleSave} />
  );
}

function Child({ name, hobbies, onSave }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>{hobbies.map(h => <li key={h}>{h}</li>)}</ul>
      <button onClick={() => onSave({ name })}>Save Profile</button>
    </div>
  );
}
```

This is the same pattern as composition over inheritance — combine behavior through children and props, not class hierarchies.

**Real-world use:** every data display component — passing API data down, passing callbacks for interactions.

**17. How does a child component communicate with its parent?**
Via a **callback function** passed down as a prop:

```jsx
function Parent() {
  const [message, setMessage] = useState('');
  const handleMessage = data => { setMessage(data); console.log('Received:', data); };

  return (
    <><p>Parent state: {message}</p>
       <Child onMessage={handleMessage} /></>
  );
}

function Child({ onMessage }) {
  return <button onClick={() => onMessage('Hello from child!')}>Send to Parent</button>;
}
```

**Real-world use:** form submissions, "Add to Cart" buttons — the child triggers, the parent decides.

**18. How do sibling components share data?**
Three options, by complexity:

**Option 1 — Lift state up** (best for 2 siblings):
```jsx
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
```

**Option 2 — Context API** (many consumers): share via a context, no prop drilling. **Option 3 — Shared store** (Redux, Zustand, Jotai) for app-wide complex state.

**Real-world use:** tabs sharing the selected tab, chat input + message list, wizard steps.

**19. React element vs component?**
An element is a plain object describing what should render in the UI (immutable, lightweight). A component is a function or class that returns elements — a reusable blueprint.

```jsx
// Component (blueprint)
function Welcome({ name }) {
  // Returns an ELEMENT each time it's called
  return React.createElement('h1', null, `Hello, ${name}`);
}

// Element (instance — a plain object)
const element = <Welcome name="John" />;
// element = { type: Welcome, props: { name: 'John' } }
```

Components are the building blocks; elements are the output. React renders elements (objects), not components directly.

**20. What are Synthetic Events?**
React's cross-browser wrapper around native DOM events, providing a consistent API across all browsers. In React 17+, events are attached to the root container (event delegation) rather than `document`.

**21. Common mistake with the `key` prop?**
Using the array index as a key when items can be reordered, added, or deleted — this causes stale state and UI bugs because React reuses the wrong component instance. Use stable, unique IDs (database ids) instead.

```jsx
const [todos, setTodos] = useState([
  { id: 1, text: 'Learn React', done: false },
  { id: 2, text: 'Build app', done: true }
]);

// ✅ stable IDs
{todos.map(todo => (
  <li key={todo.id}>
    <label>
      <input type="checkbox" checked={todo.done}
             onChange={() => toggleTodo(todo.id)} />
      {todo.text}
    </label>
  </li>
))}
```

What goes wrong with index keys: adding D at the start shifts every index — React matches index 1 (was A, now B) and A's "checked" state lands on B. Also causes wrong animations and input focus loss.

**22. What is `dangerouslySetInnerHTML` and its risk?**
A way to inject a raw HTML string directly into the DOM. The risk is XSS (cross-site scripting) attacks if user-generated content is rendered without sanitization.

---

**23. Functional vs Class components?**
Functional: a plain JavaScript function returning JSX, using Hooks for state/lifecycle — the modern standard. Class: an ES6 class with a `render()` method and lifecycle methods — a legacy approach, rarely written today.

```jsx
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
  render() { return <div>Hello, {this.props.name}</div>; }
}
```

**When to use:** always functional components in new code. Class components only when maintaining legacy codebases.

**24. Difference between stateless and stateful components?**
- **Stateless (presentational) components** — hold no internal state; they receive data via props and render UI.
- **Stateful (container) components** — hold and manage their own state (`useState`/`useReducer`) and pass data down as props.

Keep logic in stateful components and display in stateless ones — that separation keeps the UI predictable and reusable.

**25. What are the class component lifecycle phases?**
Mounting (`constructor`, `render`, `componentDidMount`), Updating (`shouldComponentUpdate`, `render`, `componentDidUpdate`), Unmounting (`componentWillUnmount`). `componentDidCatch` is for error handling.

**26. How does `useEffect` replace class lifecycle methods?**
Empty dependency array `[]` ≈ `componentDidMount`. A dependency array with values ≈ `componentDidUpdate` (fires when those values change). Returning a cleanup function ≈ `componentWillUnmount`.

**27. What is props drilling and its solution?**
Props drilling is when you have to pass props through many intermediate components just to reach a deeply nested child — none of which need or use the data (like theme, auth, locale). Solutions: Context API, a state management library (Redux, Zustand), or component composition.

```jsx
// ❌ Prop drilling — theme threaded through components that don't use it
function Header({ theme }) { return <Navbar theme={theme} />; }
function Navbar({ theme }) { return <UserMenu theme={theme} />; }
function UserMenu({ theme }) { return <div className={theme}>…</div>; }

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
  const { theme } = useContext(ThemeContext);   // direct access, no drilling
  return <div className={theme}>User Menu</div>;
}
```

**Composition helps too:** `<Header renderNavbar={() => <Navbar theme="dark" />} />` — lift the dependency out of the middle layers.

**Real-world use:** theme, auth, locale — anything many components need.

**28. How does the `children` prop work?**
`props.children` automatically holds whatever is written between the component's tags — `<Wrapper><p>Hello</p></Wrapper>` puts `<p>` into `children`. Useful for layout and wrapper components.

**29. Purpose of `defaultProps`?**
Provides a fallback value when a prop isn't passed. In functional components, default parameter values (`function Comp({ name = "Guest" })`) are now more common since `defaultProps` is being deprecated.

**30. What does PropTypes do?**
A runtime type-checking library that warns in development mode if a prop of the wrong type is passed. TypeScript is a more reliable alternative in production (compile-time checking).

**31. What are Pure Components?**
`React.PureComponent` (class) or `React.memo` (function) — they skip re-rendering when props/state are shallowly equal. A performance optimization, but requires care with deep/nested objects and inline references.

```jsx
function ProductItem({ product, onAddToCart }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product.id)}>Add</button>
    </div>
  );
}

// Wrap with memo:
const MemoizedProduct = React.memo(ProductItem);
```

**When to use:** when a component re-renders often with the same props, or the parent re-renders for unrelated state changes. Pair it with `useCallback` (stable handlers) and `useMemo` (stable object/array props) — otherwise shallow compare fails and memo does nothing. Over-memoizing adds overhead without benefit.

**32. What is a Higher-Order Component (HOC)?**
A function that takes a component and returns an enhanced component — the `withAuth(Component)` pattern. A legacy pattern for logic reuse; hooks/custom hooks have replaced HOCs in most cases now.

**33. What is the Render Props pattern?**
A component exposes its logic through a function prop that returns JSX — `<DataProvider render={data => <UI data={data} />} />`. An alternative to HOCs; custom hooks are usually cleaner now.

---

## Intermediate

What mid-level developers are expected to know - hooks deeply, state at scale, and why things happen.

**34. What are React Hooks, and why were they introduced?**
Hooks are functions that let you use state and lifecycle features in **functional components**. Introduced in React 16.8 to solve three problems class components had:

1. **Reusing stateful logic was hard** — extract it into custom hooks (e.g. `useFetch`)
2. **Complex components became hard to understand** — lifecycle methods mixed unrelated concerns
3. **Classes confused developers** — `this` binding, verbosity

```jsx
// Before — class components were verbose
class Timer extends React.Component {
  constructor(props) { super(props); this.state = { seconds: 0 }; }
  componentDidMount() {
    this.interval = setInterval(
      () => this.setState(s => ({ seconds: s.seconds + 1 })),
      1000
    );
  }
  componentWillUnmount() { clearInterval(this.interval); }
  render() { return <div>Timer: {this.state.seconds}s</div>; }
}

// After — functional, cleaner
function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>Timer: {seconds}s</div>;
}
```

**Real-world use:** every modern React component uses hooks — forms, data fetching, timers, DOM refs.

**35. How does `useState` work?**
`const [state, setState] = useState(initial)` returns the current value and an updater function. Calling the setter triggers a re-render; state updates are asynchronous and batched. When the new state depends on the old value, use the functional form `setState(prev => …)`.

```jsx
const [count, setCount] = useState(0);
const increment = () => setCount(count + 1);

const [items, setItems] = useState([1, 2, 3]);
// ❌ mutation — same reference, no re-render
items.push(4);
// ✅ new reference — re-render triggered
setItems([...items, 4]);
```

**Why no mutation:** React detects changes with reference comparison (`Object.is`). Same reference = no change = no re-render. Always create a new object/array when updating state.

**Real-world use:** form state, shopping carts, todo lists — state that changes on user action.

**36. When to use functional updates (`setState(prev => ...)`)?**
When the new state depends on the previous state, especially with multiple simultaneous updates or when closures might capture stale values. The functional form guarantees the latest state.

**37. What does `useEffect` do and how does dependency array work?**
Side effects (data fetching, subscriptions, DOM manipulation) run after render. `[]` = run only on mount; `[dep1, dep2]` = run when those dependencies change; no array = run on every render. Effects run **after the browser paints** — use `useLayoutEffect` for synchronous pre-paint effects.

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // mount only
  useEffect(() => {
    document.title = 'User Profile';
  }, []);

  // runs on mount + when userId changes — with cleanup
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(data => { if (!cancelled) setUser(data); });
    return () => { cancelled = true };   // race-condition guard + cleanup
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

**When each runs:**
- no array → every render
- `[]` → mount only
- `[dep]` → mount + when dep changes

**Real-world use:** fetching data on a page load, subscribing to a WebSocket, setting up timers.

**38. When is `useEffect` cleanup necessary?**
When you set up a subscription, timer, event listener, or socket connection — return a cleanup function to tear it down. It runs **before the next effect run** (when deps change) and **on unmount** — preventing memory leaks and stale references.

```jsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    const socket = new WebSocket(`wss://chat/${roomId}`);
    socket.onmessage = e => { /* handle message */ };
    return () => {
      socket.close();   // runs before next room switch AND on unmount
    };
  }, [roomId]);

  return <div>Chat Room: {roomId}</div>;
}
```

**Real-world use:** WebSocket subscriptions, intervals, event listeners — anything needing teardown.

**39. `useEffect` vs `useLayoutEffect`?**
`useEffect` runs asynchronously **after the browser paints** — non-blocking. `useLayoutEffect` runs synchronously **after DOM mutation, before paint** — used for DOM measurements and flicker prevention.

```jsx
function Tooltip({ children, position }) {
  const ref = useRef();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // ❌ useEffect — tooltip appears in wrong place, then moves (flicker)
  useEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: rect.left, y: rect.top });
  }, [position]);

  // ✅ useLayoutEffect — settled before paint, no flicker
  useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: rect.left, y: rect.top });
  }, [position]);

  return <div ref={ref} style={pos}>{children}</div>;
}
```

**When to use:** `useEffect` for fetch/analytics/subscriptions; `useLayoutEffect` for synchronous DOM reads (measuring, animations, positioning) that must settle before paint.

**40. What does `useContext` do?**
Lets you consume Context directly without a `<Context.Consumer>` wrapper — a clean way to avoid prop drilling for global data (theme, auth, locale).

```jsx
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{
      theme,
      toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light'))
    }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggle } = useContext(ThemeContext);
  return <button onClick={toggle}>Theme: {theme}</button>;
}
```

**Real-world use:** theme switching, auth user, locale, feature flags — anything many components need without direct relation.

**41. What are `useRef` use cases?**
(a) Accessing a DOM element directly (`ref.current`); (b) storing a mutable value that doesn't trigger a re-render (interval ID, previous value, render count).

```jsx
function SearchBox({ onSearch }) {
  const [value, setValue] = useState('');      // triggers re-render
  const inputRef = useRef(null);                // DOM access
  const searchCount = useRef(0);                // no re-render on change

  const handleSearch = e => {
    const term = e.target.value;
    setValue(term);                   // re-render
    searchCount.current++;            // no re-render
    onSearch(term, searchCount.current);
  };

  return (
    <><input ref={inputRef} value={value} onChange={handleSearch} />
       <button onClick={() => inputRef.current?.focus()}>Focus</button></>
  );
}
```

**Key difference:** `useRef` mutations don't trigger re-renders — use for values that don't need to update the UI.

**42. What does `useMemo` do?**
Memoizes (caches) the result of an expensive computation so it only recomputes when its dependencies change — avoiding unnecessary recalculations during render.

**43. What does `useCallback` do?**
Memoizes a function reference — it returns the same function instance as long as dependencies haven't changed. Useful for preventing unnecessary re-renders in child components (especially with `React.memo`).

**44. Difference between `useMemo` and `useCallback`?**
`useMemo` memoizes a computed **value**, `useCallback` memoizes a **function** reference. `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)` — same underlying mechanism.

```jsx
// useMemo — cache the filtered list
const filtered = useMemo(
  () => products.filter(p => p.name.includes(search)),
  [products, search]
);

// useCallback — cache the function reference
const handleAddToCart = useCallback((productId) => {
  onAddToCart(productId);
}, [onAddToCart]);
```

| Feature | React.memo | useMemo | useCallback |
|---------|------------|---------|-------------|
| Returns | Memoized component | Memoized **value** | Memoized **function** |
| Target | Component rendering | Expensive computation | Function reference stability |

**Rule of thumb:** memoize only when the computation is heavy or the child is known to be expensive. Over-memoization adds overhead without benefit.

**45. When should you use `useReducer`?**
When state logic is complex — multiple sub-values, or the next state depends on previous state and an action. A scalable alternative to `useState` for complex state, using a Redux-style reducer pattern.

```jsx
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step };
    case 'decrement': return { ...state, count: state.count - state.step };
    case 'setStep':   return { ...state, step: action.payload };
    case 'reset':     return initialState;
    default:          return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <><p>Count: {state.count} (step {state.step})</p>
       <button onClick={() => dispatch({ type: 'increment' })}>+</button>
       <button onClick={() => dispatch({ type: 'decrement' })}>−</button>
       <button onClick={() => dispatch({ type: 'reset' })}>Reset</button></>
  );
}
```

**Why useReducer over useState here:**
1. Predictable transitions — all logic in one pure function
2. Pure reducer = easy to test
3. Scales better than multiple setters
4. Familiar Redux pattern — easier future migration

**Real-world use:** form state, shopping carts, multi-step wizards.

**46. What are Custom Hooks?**
Functions prefixed with `use` that compose built-in hooks to create reusable stateful logic (`useFetch`, `useLocalStorage`). They let you share logic without changing the component hierarchy — the modern replacement for HOCs and render props.

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then(res => res.json())
      .then(d => { if (!cancelled) { setData(d); setLoading(false); } });
    return () => { cancelled = true };
  }, [url]);

  return { data, loading };
}

// Reused everywhere:
const user = useFetch('/api/user/123');
const stats = useFetch('/api/stats');
```

**Rules:** must start with `use`; can call other hooks inside; cannot be called conditionally (Rules of Hooks apply).

**Real-world use:** API fetching, form handling, local-storage persistence, keyboard shortcuts.

**47. What are the Rules of Hooks?**
(1) Only call Hooks at the top level — not inside loops, conditions, or nested functions. (2) Only call Hooks from React function components or custom Hooks. These rules let React keep track of hook call order consistently.

```jsx
// ❌ WRONG — conditional hook call
function Bad({ shouldShow }) {
  if (shouldShow) { useEffect(() => { /* … */ }); }
  // hook only runs sometimes → hook order breaks
}

// ✅ CORRECT — hook always runs, logic goes inside
function Good({ shouldShow }) {
  useEffect(() => { if (shouldShow) { /* … */ } }, [shouldShow]);
}
```

**Why:** React tracks hooks by call order internally. If the order changes between renders, state gets matched to the wrong hook — producing subtle, hard-to-debug bugs.

**48. Purpose of `useId` hook?**
Generates a unique, stable ID that matches between server and client renders (SSR-safe) — for form labels and accessibility attributes. It replaces approaches like `Math.random()` that caused hydration mismatches.

**49. What does `useTransition` do?**
Marks a state update as "non-urgent" (a transition) so that urgent updates (like typing) aren't blocked. It provides an `isPending` flag so you can show a loading state while the transition completes.

**50. What does `useDeferredValue` do?**
Returns a "deferred" version of a value that updates with a slight delay — preventing expensive re-renders (like filtering a large list) from blocking urgent UI updates.

---


**51. When to use Context API vs Redux/Zustand?**
Context is good for simple, infrequently-changing global data (theme, auth user, locale). For frequent updates, complex state logic, or need for devtools/middleware, a state management library like Redux/Zustand/Jotai is better — Context re-renders **all** consumers on any change; libraries support selective subscriptions.

| Context API | Redux / Zustand |
|-------------|------------------|
| Built into React | External library |
| Re-renders all consumers | Selective subscriptions |
| No devtools | Full devtools (time-travel, action log) |
| No middleware | Middleware (thunk, logging) |
| No persistence | Persistence middleware |
| Simple, infrequent updates | Complex, frequent updates |

**Real-world:** theme = Context; user cart + complex filters = Redux/Zustand.

**52. How to solve the Context re-render performance issue?**
Split Context (separate providers for separate concerns), memoize the provider value (`useMemo`), or use a state management library that supports selective subscriptions.

**53. What are the limitations of Context API?**
1. **Re-renders all consumers** — any provider value change re-renders every consumer
2. **No devtools** — no time-travel, action log or middleware
3. **Not ideal for frequent updates** — every value change re-renders the whole consumer tree
4. **No persistence** — no built-in caching or storing
5. **Harder to debug** — no action/reducer traceability

```jsx
// ❌ every micro-update re-renders all consumers
<HeaderContext.Provider value={liveData}>
  <Header /><Sidebar /><Content />
</HeaderContext.Provider>

// ✅ split contexts + memoize values
const HeaderContext = createContext();   // rarely changes
const DataContext = createContext();     // changes frequently
const headerInfo = useMemo(() => ({ theme, locale }), []);
const liveData = useMemo(() => data, [data]);
```

**Fix:** split contexts by concern and memoize provider values. **When to use Context:** simple, infrequent global state (theme, auth). For complex or frequent app state, use Redux/Zustand.

**54. What is the core Redux flow?**
Single store → Actions (describing what happened) → Reducers (pure functions returning new state) → Store updates → Components re-render via `useSelector`/`connect`.

**55. Why is Redux Toolkit (RTK) better than plain Redux?**
Less boilerplate — `createSlice` auto-generates actions and reducers, `configureStore` has sensible defaults, Immer handles immutability, and RTK Query caches/fetches data.

```jsx
// Plain Redux — heavy boilerplate
const ADD_TODO = 'todos/add';
const addTodo = text => ({ type: ADD_TODO, payload: text });

// Redux Toolkit — no boilerplate
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload });
      // Immer — mutable syntax, immutable result
    }
  }
});
// Auto-generated: { actions: { addTodo }, reducer }
```

**Problems solved:** boilerplate (createSlice), immutability (built-in Immer), store setup (`configureStore` defaults), async logic (`createAsyncThunk` / RTK Query).

**Real-world use:** large apps with cross-cutting state — e-commerce carts, dashboards with shared filters.

**56. Props drilling vs Context vs global state library — when to use what?**
2-3 levels of props passing is fine. For deeper or cross-cutting concerns, use Context. When you need app-wide complex state, time-travel debugging, or middleware, use a library like Redux/Zustand.

**57. How do lightweight state managers like Zustand or Jotai differ from Redux?**
Less boilerplate, no mandatory providers (Zustand), an atomic state model (Jotai), and a simpler API. By 2026, they've become popular even in large apps because they don't require the ceremony that Redux does.

---


**58. What are the top three ways to achieve state management in React — and when to use what?**
The three ways (for function components): **`useState` hook, Context API, and Redux**. The choice depends on your project's **complexity, size and requirements**:

| Approach | When to use it | Why |
|----------|---------------|-----|
| **`useState`** | Small, **component-level** state — state isn't shared across components | Lightweight, built into React — ideal for small components with **isolated state** |
| **Context API** | Sharing **global/medium-complexity** data across many components without prop drilling | Avoids prop drilling; good for small-to-medium apps — not for very high complexity |
| **Redux** | **Large-scale** apps with complex state | Centralized store + actions → predictable state, scales as the app grows |

**Rule of thumb:** third-party tools (Redux) only for complex scenarios. For small/midsize apps, stick to built-in features — don't over-engineer.

**59. What is middleware in react-redux?**
Normally data flows `component → dispatch(action) → reducer → new state`. When the scenario is complex, **middleware sits between the dispatched action and the store**.

Middleware can **intercept actions, modify them, or execute additional logic before the action reaches the reducer** — most commonly used with **thunk action creators** to talk to a remote API: fetch the data, modify/construct the action based on it, then forward it to the reducer together with the previous state to derive the new state.

Two key points:
1. Middleware provides a **mechanism to add extra functionality** to the Redux store.
2. It works by **intercepting actions** — modifying them or running additional logic before the reducer sees them (e.g., calling an API, adding tokens, logging).

**Configuration:** pass the middleware (e.g., `thunk`) to the `middleware` property in the store setup.

**60. How do you handle asynchronous operations and side effects in react-redux?**
One-line answer: **use middleware — specifically redux-thunk action creators** — to handle complex asynchronous operations like API data fetching. (See the middleware question above.)

**61. How to optimize a React app from re-renders?**
**Profiler first** — with React DevTools (highlight updates) or `why-did-you-render`. Common causes: inline object/array/function props, missing memoization, Context misuse. Then:

1. **`React.memo`** for components, **`useMemo`/`useCallback`** for expensive values/functions
2. **Colocate state** — keep state in the smallest component that needs it
3. **List virtualization** — render only visible rows (`react-window`)
4. **Code splitting** — `React.lazy` + `<Suspense>`

What causes re-renders:
1. **State change** — setter called
2. **Props change** — parent passes new values
3. **Parent re-renders** — children re-render by default
4. **Context changes** — provider value updated
5. `forceUpdate()` (rare, class components)

```jsx
const MemoizedRow = React.memo(Row);
const stats = useMemo(() => computeStats(rawData), [rawData]);
const handleFilter = useCallback(filter => setFilter(filter), []);
```

**Golden rule:** a new object/array/function inline breaks shallow-comparison memoization — stabilize references before blaming "React being slow".

**62. Does a parent re-render always cause its child component to re-render?**
**Yes — by default.** Stop it with `React.memo`:

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      {/* re-renders every time — same props */}
      <ExpensiveChild name="Alice" />
      {/* skips re-render if props are shallowly equal */}
      <MemoizedChild name="Alice" items={stableItems} onClick={stableHandler} />
    </>
  );
}
const MemoizedChild = React.memo(ExpensiveChild);
```

**Key insight:** `React.memo` does a **shallow comparison** of props. Inline `[1, 2, 3]` or `{...}` creates a new reference every render — memo sees "changed" and re-renders anyway. Fix by memoizing those values (`useMemo`, `useCallback`, stable references).

**63. What is code splitting and how to do it?**
Breaking the app's bundle into smaller chunks that load on demand — route-level or component-level. Use `React.lazy(() => import('./Component'))` + `<Suspense>` to show a loader while the chunk loads — reduces the initial bundle size and improves load time.

```jsx
const Dashboard = lazy(() => import('./components/Dashboard'));

function App() {
  return (
    <Suspense fallback={<div>Loading dashboard…</div>}>
      <Dashboard />
    </Suspense>
  );
}

// Route-level splitting
const Home = lazy(() => import('./routes/Home'));
const Profile = lazy(() => import('./routes/Profile'));
```

**Real-world use:** large apps — only load the dashboard components when the user navigates there; lazy-load modals on first open.

**64. How do `React.lazy` and `Suspense` work together?**
`React.lazy` dynamically imports a component; `<Suspense fallback={<Loader/>}>` is the wrapper that shows a loading state while the lazy component loads.

```jsx
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<div>Loading profile…</div>}>
      <Profile />
    </Suspense>
  );
}
```

Suspense is **not only for lazy loading** — in React 19 it works with the `use()` hook to suspend on promises during data fetching. **Real-world use:** route transitions, modal loading spinners, data-dependent rendering.

**65. What is list virtualization?**
Rendering only the items visible in the viewport instead of the entire large list — using libraries like `react-window` or `react-virtualized`. Performance-critical for tables/lists with thousands of rows.

**66. How to debug unnecessary re-renders?**
Use the React DevTools Profiler (highlight renders) or the `why-did-you-render` library — or simple render-count logs during development. Common causes: inline object/array/function props, missing memoization, Context misuse.

**Workflow:** profile → locate the slow/wasting component → colocate state or memoize (`React.memo` / `useMemo` / `useCallback`) → if it's a giant list, virtualize it; if it's bundle size, code-split; if it's API data, cache with TanStack Query.

**Real-world use:** large e-commerce grids, dashboards — find the actual hotspot before guessing.

**67. What does the React Compiler (React 19) do?**
A build-time tool that automatically applies memoization (like `useMemo`/`useCallback`/`React.memo`) without writing it manually — it analyzes component code and generates smart re-render skipping, significantly reducing the need for manual memoization.

**68. Debouncing vs Throttling — when to use each in React?**
Debounce: run a function after a gap following rapid-fire events (typing in a search input). Throttle: run a function at most once per fixed interval (window resize/scroll). Both limit expensive operations like API calls or re-renders.

**69. What is the benefit of Concurrent Rendering?**
It lets React interrupt, pause, and resume render work based on priority — high-priority updates (input typing) don't block low-priority updates (rendering a large list), keeping the UI responsive.

---


**70. What is the basic pattern for a controlled form input?**
`<input value={state} onChange={e => setState(e.target.value)} />` — the value comes from React state, and every keystroke updates state which triggers a re-render.

**71. What is `forwardRef` for?**
Lets a parent component access a child's DOM node/ref when the child is a custom (non-DOM) component. Syntax: `React.forwardRef((props, ref) => ...)`.

**72. What does `useImperativeHandle` do?**
Used together with `forwardRef` — it exposes only specific methods/properties to the parent (not the entire DOM node) through the ref, creating a custom "imperative API."

**73. How is event delegation implemented in React?**
In React 17+, all events are attached to a single root DOM container (not `document`), which is memory efficient and lets multiple React versions coexist on the same page.

**74. Difference between `e.preventDefault()` and `e.stopPropagation()`?**
`preventDefault()` stops the browser's default behavior (like a form submission causing a page reload). `stopPropagation()` stops the event from bubbling up to parent elements.

---


**75. What are Error Boundaries?**
Class components (`componentDidCatch` / `getDerivedStateFromError`) that catch JavaScript errors in their child tree and display a fallback UI instead of crashing the entire app. You cannot build an Error Boundary with hooks yet.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };  // next render shows fallback
  }

  componentDidCatch(error, errorInfo) {
    console.error('Boundary caught:', error, errorInfo);
    // sendToErrorService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div><h2>Something went wrong.</h2>
                <button onClick={() => window.location.reload()}>Reload</button></div>;
    }
    return this.props.children;
  }
}
```

**Catches:** render errors, lifecycle errors, constructor errors. **Does NOT catch:** event handler errors, async code (`setTimeout`/Promises), SSR errors, errors inside itself — handle those with try/catch.

**Real-world use:** wrapping entire apps or critical sections (checkout, chat) for graceful degradation.

**76. What do Error Boundaries NOT catch?**
Errors in event handlers, async code (`setTimeout`, Promises), server-side rendering errors, and errors inside the error boundary itself — for these, you still need manual `try/catch`.

**77. What is the philosophy of React Testing Library?**
"Test the way users use your app" — test DOM output and user interactions (`getByRole`, `fireEvent`) rather than implementation details like internal state, so tests stay resilient to refactoring.

**78. What roles do Jest and React Testing Library play?**
Jest is the test runner + assertion library (it runs the test files, provides `expect()`). React Testing Library provides utilities to render components and query/interact with the DOM — the two are used together.

**79. What is snapshot testing and its risk?**
Compares a component's rendered output against a saved "snapshot." The risk: over-reliance means developers update snapshots without checking when the UI changes — producing false confidence.

---

## Advanced

Senior-level questions - routing, React 19, architecture and trade-offs.

**80. How does client-side routing work in React Router?**
It uses the Browser History API (`pushState`) to change the URL without a full page reload, then renders the matching component — giving a SPA navigation feel.

**81. Difference between `<Link>` and `<a>` tag?**
`<Link>` does client-side navigation (no page reload), using the History API. `<a>` triggers a full page reload, which resets SPA state.

**82. What are Nested Routes and `<Outlet>`?**
Nested routes render child routes inside a parent layout. `<Outlet>` is the placeholder where the matched child route renders within the parent layout.

**83. How to implement dynamic/protected routes?**
Dynamic: `path="/user/:id"` + read the value with `useParams()`. Protected: a wrapper component that checks auth and, if unauthenticated, redirects with `<Navigate to="/login" />`.

---


**84. What are Server Components (RSC)?**
Components that render on the server and send only the resulting HTML/data to the client — shrinking the client-side JS bundle and allowing direct backend/database access without an API layer. Interactivity (event handlers) cannot live inside them.

**85. Server Components vs Client Components?**
Server Components (default in Next.js App Router, or `'use server'`) — no interactivity, no hooks, smaller bundle. Client Components (`'use client'`) — interactive, can use hooks/state/effects, and hydrate in the browser.

**86. What are React 19 Actions?**
Async functions that handle form submissions and mutations, automatically managing pending/error/optimistic states — integrated with `useActionState` and `useOptimistic`, eliminating manual loading-state boilerplate.

**87. What does `useActionState` do?**
Tracks a form action's result, pending state, and errors in a single hook — eliminating the need for multiple `useState` calls for loading, error, and data.

**88. What does `useOptimistic` do?**
Shows the user a "predicted" final state before an async action completes (like a like button instantly filling), and automatically rolls back if the action fails.

**89. What is the `use` hook and how is it different from other hooks?**
Reads a Promise or Context directly during render — integrates with Suspense (the component suspends until the promise resolves). Unlike other hooks, it can be called conditionally (inside loops/conditionals).

**90. What are Server Actions?**
Async functions marked with `'use server'` that can be called directly from the client (through a form action or event handler) without manually creating an API route — React's own RPC layer handles the communication.

**91. What is Hydration?**
Hydration is the process of making server-rendered static HTML interactive on the client by attaching event listeners — without re-rendering the HTML. React 19 improves mismatch reporting and partial/streaming hydration.

```jsx
// Server sends: <div id="__next"><button>Hello</button></div>
// Client hydrates: React attaches onClick — no DOM rebuild

// ❌ mismatch — Date.now() differs between server and client
function Bad() {
  return <div>{Date.now()}</div>;    // HYDRATION ERROR
}
// ✅ fix — client-only data via useEffect
function Good() {
  const [time, setTime] = useState(null);
  useEffect(() => setTime(Date.now()), []);
  return <div>{time ?? 'loading…'}</div>;
}
```

**Real-world use:** every Next.js app, React 19 streaming SSR, partial hydration.

**92. What is the difference between Client-Side Rendering (CSR) and Server-Side Rendering (SSR)?**
| Client-Side Rendering | Server-Side Rendering |
|-----------------------|------------------------|
| Renders in browser | Renders on server |
| JS bundle loads → HTML created | HTML sent with data inside |
| Slower first load (bundle download) | Faster first render |
| SEO problems until JS loads | SEO friendly |
| Client resources for rendering | Server resources for rendering |
| Interactivity after hydration | Hydration needed for interactivity |

**CSR:** React SPA (Vite) — data fetched in the browser after load. **SSR:** Next.js — HTML delivered with data already inside. **Real-world use:** SSR for marketing pages / SEO, CSR for dashboards.

---


**93. What is the Compound Components pattern?**
Multiple components that work together with shared implicit state (like `<Select><Select.Option/></Select>`), usually communicating through Context — creating flexible, composable APIs.

**94. What is the Container/Presentational pattern?**
Container components handle logic/data, while presentational components only render UI (taking props). Less strictly followed since Hooks, but the concept (separating concerns) remains relevant.

**95. What are the traps of memoization in React?**
Inline objects, arrays, and functions create new references on every render, causing `React.memo` to fail (shallow comparison). Over-memoization is also bad — adding unnecessary complexity and memory overhead without real benefit.

**96. Composition vs Inheritance — which does React prefer?**
React favors composition (combining behaviors through children/props) over inheritance. It produces flexible, loosely-coupled components. The official React docs explicitly recommend composition.

**97. What is a Portal in React?**
`ReactDOM.createPortal(child, domNode)` renders a component into a DOM node outside the parent hierarchy (useful for modals, tooltips) while the React tree and event bubbling remain logically the same.

```jsx
import { createPortal } from 'react-dom';

function Modal({ children, onClose }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body    // rendered here — outside all parent stacking contexts
  );
}
```

**Real-world use:** modals, dropdowns, tooltips, notifications — anywhere overflow/z-index clipping matters.

**98. What does Strict Mode do?**
A development-only wrapper that double-renders components to catch potential problems, warns about deprecated APIs, and adds extra checks for side effects. It has no effect in production builds.

**99. Why is immutability important in React?**
If you mutate state directly, React can't detect the change (the reference stays the same) — you must create a new object/array to trigger a re-render and maintain predictable state history.

**100. What happens when you change a `key` prop?**
If the key changes, React treats it as a completely new component — the old one unmounts and a new one mounts (state is reset). This is intentionally used to "reset" a component.

**101. How do memory leaks happen in React and how to avoid them?**
Setting state on an unmounted component, or leaving event listeners/timers/subscriptions that weren't cleaned up — use the `useEffect` cleanup function to properly unsubscribe and clear them.

**102. Is Suspense only for lazy loading?**
No — Suspense is also used for data fetching (with frameworks/libraries that support it), and in React 19 it works with the `use()` hook to suspend on promises until they resolve.

**103. When should you "lift state up" in React?**
When two or more sibling components need to share and sync the same data — move the state to their closest common parent and pass it down via props and callbacks.

```jsx
// Celsius/Fahrenheit inputs — classic example
function Calculator() {
  const [temperature, setTemperature] = useState('');   // single source of truth
  return (
    <>
      <TemperatureInput label="Celsius" value={temperature} onChange={setTemperature} />
      <TemperatureInput label="Fahrenheit" value={temperature} onChange={setTemperature} />
    </>
  );
}
```

**When useful:** unit conversion, filter controls + list view, form wizards — any shared state across a subtree.

**104. How do you decide where state should live in a component tree?**
Follow the **"closest common ancestor"** rule — put the state in the nearest parent that spans everything needing it.

1. Find all components that need this state
2. Find the closest common parent
3. Put the state there
4. Pass it down via props/callbacks

```jsx
function App() {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <Toolbar activePanel={activePanel} onPanelChange={setActivePanel} />
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

**Real-world use:** selected items, form values, modal visibility — anything shared across a subtree.

**105. What is batching in React?**
Combining multiple `setState` calls into a single re-render for performance. React 18+ does automatic batching everywhere (inside promises, `setTimeout`, and native event handlers) — previously it only happened inside React event handlers.

**106. What is the "single source of truth" principle in React?**
Every piece of state should have one authoritative owner in the component tree — avoid duplicating or deriving state; instead compute from the single existing state so data inconsistency doesn't occur.

**107. What is the "derived state" anti-pattern?**
Copying props into state with `useState` and then trying to manually sync them — this causes bugs when props change but the state goes stale. Better: compute directly from props during render, or use the `key` prop to reset the component.

**108. What are ref cleanup functions in React 19?**
A `ref` callback can now return a cleanup function (like `useEffect` does) that runs when the element unmounts or the ref changes — removing the need for manual `current = null` assignments.

**109. How to ensure accessibility in React apps?**
Use semantic HTML, add ARIA attributes where needed, test keyboard navigation, use `useId` for label associations, and run automated checks with tools like `eslint-plugin-jsx-a11y` or axe-core.

**110. How to handle environment-specific configuration in React?**
Use build-tool env variables (Vite: `import.meta.env`, CRA: `process.env.REACT_APP_*`), `.env` files, and never expose sensitive keys in the client bundle — keep secrets on the backend/server side only.

**111. Why is TypeScript popular with React in interviews?**
It provides compile-time type safety, better autocomplete and IDE support, explicit prop/state shapes, and safer refactoring in large codebases. Interviewers for senior roles expect TypeScript fluency.

**112. What is the "waterfall" data-fetching problem in React?**
When nested components fetch data sequentially (a child waits for its parent's fetch to complete) — total load time grows. Solutions: parallel fetching, Server Components, or data-fetching libraries (React Query) that handle deduplication and parallelization.

**113. How does React Query / TanStack Query differ from React state management?**
It manages "server state" (async, remote data) — with built-in caching, background refetching, stale-while-revalidate, and deduplication. Redux/Context are for "client state" (local UI state) — the two are complementary, not competing.

**114. What are common performance anti-patterns in React?**
Creating new objects/arrays/functions during render (inline), rendering large lists without virtualization, unnecessary Context re-renders, deeply nested state that re-renders the whole tree, and missing or incorrect `key` strategy.

**115. What should you cover for "React internals" interview questions?**
The Fiber architecture (interruptible rendering), the reconciliation/diffing algorithm (O(n) heuristic, based on type and key), the separation of render vs commit phases, and a high-level mental model of concurrent features (transitions, Suspense).

**116. Context vs Hooks vs Classes — what's the future?**
**Hooks are the standard.** Modern React is function components + hooks. Context is a tool for *sharing values* — it composes with hooks, it's not an "old vs new" axis. Class components remain only for legacy codebases and Error Boundaries (no hook equivalent yet).

**Idiomatic answer:** hooks everywhere, Context for sharing, classes only in legacy code and error boundaries.

**117. How should you structure the project and maintain state across multiple components?**
- Split components into separate files under **`components/`**
- Use **separate action files** per component
- Use **separate reducer functions** per component
- Keep **one store file** for the whole project — each component can own its slice, but the store stays single and predictable

**118. Why is discussing trade-offs important in a senior React interview?**
Interviewers weigh **how you reason**, not just what you know. Weak signals: blanket "always do X" claims. Strong signals: weighing cost vs benefit for the specific context — e.g. "when `useMemo` isn't needed", "when Context beats Redux and vice versa", "when a library beats a raw hook".

Examples of strong answers:
- "Hooks are great for logic reuse, but class components still work for legacy codebases — I'd use hooks for new features and migrate when refactoring."
- "`React.memo` prevents re-renders but adds shallow-compare overhead and can break with inline props — I'd memoize only expensive components with stable references."
- "For a form with 10+ fields I'd reach for react-hook-form instead of a raw useReducer."

---
## Appendix: JS questions asked in the same interview

These are JavaScript, not React — kept here because they were asked in the same interview.

**119. What is hoisting in JS?**

**120. How does hoisting work?**

**121. Does hoisting work with all variables, and why?**

**122. Difference between `let` and `var`?**

**123. What is the Event Loop?**

**124. Precedence in the Event Loop — which runs first, `Promise()` or `setTimeout()`?**

**125. Difference between `setTimeout()` and `setInterval()`?**

**126. Which ES6 features have you used?**

**127. Where do you mostly use the rest operator?**

---

## How to approach the interview

- Interviewers don't carry a fixed list — they take your answer, find a **gap** in it, and the next question comes from that gap. That's why "memorized answers" get exposed.
- Every answer in this file has a natural **follow-up** the interviewer is likely to ask next. If you know what the interviewer will ask next, you'll never face "16th question" panic.
- Learn **concepts, not Q&A pairs** — rehearse: question → answer → likely follow-up → deeper concept → next question.
- If you don't know something, say *"Let me explain"* and connect it to a concept you do know — and admit the boundary honestly rather than bluff.
- For every question, pair the concept with a **real example from a project you built** — that's the difference between junior and senior interviews.
- **The complete chain the interviewer follows:** React → components → declarative UI → JSX → props → state → "what happens when state changes" → controlled components → keys → Virtual DOM → lifecycle → useState/useEffect → props drilling → Context → reconciliation → React Router.
- Read level by level — Beginner → Intermediate → Advanced. Explain every answer **out loud** in your own words.

**Memorize the chain, not just the answers.**

---

## Sources

These notes were distilled from four sources. Duplicates were merged; promotional segments and timestamps were removed.

1. **"React Interview Questions for Freshers / Intermediate / Advanced"** — video question list
2. **"Top 10 React Interview Questions"** — 15+ years experience, senior/scenario-based questions (state management, useState vs useReducer, hooks vs Redux, middleware, redux-thunk, useCallback, useLayoutEffect, performance) — English transcript
3. **"Top 15 React Interview Questions with Interviewer Follow-Ups"** — beginner → advanced chain with follow-up framing (Sneha / TAP47) — Hindi/Hinglish transcript
4. **"Top 10 Advanced React Interview Questions"** — Fiber, batching, Suspense, SSR hydration, list optimization (Shubham Kulkarni) — Instagram carousel; source at [instagram.com/shubhamkulkarni_insta](https://www.instagram.com/shubhamkulkarni_insta)

---

## Key map — what's where

| Section | Covers | Questions |
|---------|--------|-----------|
| Beginner | React fundamentals, SPA, JSX, components, props & state, lists & keys, fragments | Q1–Q33 |
| Intermediate | Hooks (useState/useEffect/...), Context & Redux (incl. middleware & thunk), state management, performance, forms, error handling & testing | Q34–Q79 |
| Advanced | Routing, React 19 (RSC, Actions, `use()`), architecture & trade-offs | Q80–Q118 |
| Appendix | JS questions asked in the same interview | Q119–Q127 |
