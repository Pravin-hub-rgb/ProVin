# React JS Interview Questions — Basic to Advanced

---

## 1. What is React?

React is a JavaScript library for building UI components. JavaScript is a programming language, and React is a library within that language — a collection of tools that helps us build reusable UI components.

What are reusable UI components? Things like the header, footer, buttons, and forms that get used again and again across your entire website. React creates one common, reusable component for each of these. For example, if you need a header, a footer, a button, and a form on your homepage, you just call the already-built components there — you don't rewrite the whole code (navbar, divs, list items, etc.) on every page. You build the header once, then reuse it wherever you need.

You can also write any kind of logic inside these components, and even store state. That's why we use React — to build reusable UI components.

Key points for the interview:

- React is a JavaScript library used to create reusable building blocks — to build UI components.
- React is component-based and declarative.
- The code is cleaner and more maintainable. If you need to change something in the header, you only change the header component — one file — instead of touching the homepage, about page, etc. Coding becomes easier, and finding bugs becomes easier too.

## 2. Library vs Framework — what's the difference?

A library is a collection of functions and tools that you can call when you need them. The control is in your hands — your code decides when and how to use the library. You decide based on your code whether you need the library or not. React, Lodash, and jQuery are all libraries. Libraries don't have built-in features — for example, if you need routing in React, you install a routing library; for state management, you install Redux.

A framework provides a complete structure for building an application. It defines how you should control your application, its flow, which component goes where, and which code you need where. The framework controls the program flow and calls your code when needed. Angular, Next.js, Django, and Spring Boot are frameworks. Frameworks have built-in features — Angular has routing built in and tools like createAsyncThunk for handling APIs; Next.js has App Router and API routes. For handling most things, you don't need to install extra libraries. It's a full package that helps you build the complete structure of your application.

## 3. Why is React so famous? What are its features?

- **Component-based architecture** — for anything you think is reusable (button, form, etc.), you make a specific component and call it whenever needed.
- **Virtual DOM** — a lightweight copy of the actual DOM, used to increase performance. When state changes, React doesn't touch the actual DOM directly; it makes changes in the virtual DOM, compares it with the previous virtual DOM, and only changes the specific part in the actual DOM where the change happened, instead of updating the whole DOM.
- **JSX (JavaScript XML)** — you can use HTML inside JavaScript.
- **One-way binding** — you can send data from parent to child, which makes finding bugs easier.
- **Hooks** — a modern feature used to manage state and more.
- **Reusable components.**
- **SEO friendly** — because React supports SSR (server-side rendering) when you need to improve performance or SEO.

## 4. React vs Angular vs Vue — what's the difference?

| | React | Angular | Vue |
|---|---|---|---|
| Type | Library | Framework (full package) | Framework |
| Data binding | One-way | Two-way (parent ↔ child) | Two-way |
| Learning curve | Easy | Steep | Easy |

Similarly, you should also know the difference between React and Next.js.

## 5. What is JSX?

JSX is JavaScript XML — JavaScript plus HTML. In a normal JavaScript function, you can't write HTML, but with JSX you can add HTML inside your JavaScript code. React uses JSX to define the UI in a declarative way.

Benefits: the code is cleaner, less boilerplate, easy to understand, readable, and easy to write.

## 6. State and Props

The most important concept in React. This question is asked at every level — senior, mid, or fresher.

- **State** — manages and stores data. The state inside a component is handled within that same component. Purpose: manage data inside the component.
- **Props** — pass data from the parent component to the child component. Props are handled by the parent component.

**Mutability:**

- State is **mutable** — you can change the data inside it.
- Props are **immutable** — they are read-only.

## 7. Can we change props inside a child component?

No. Inside the child, props data is read-only. If you want to make changes, you make them in the parent component — the component where the props data lives. The child can only read it.

## 8. What is a React Component?

Components are your reusable UI building blocks. There are two types:

- **Functional components** — what we use today. They use functions and deal with hooks.
- **Class components** — used earlier. They use class syntax and have their own lifecycle methods.

## 9. Functional Component vs Class Component

- Class components are **stateful**. They have lifecycle methods: componentDidMount (when the component mounted), componentDidUpdate, componentWillUnmount. They manage state using the `this` keyword.
- The problem with class components: too much boilerplate code, messy and hard to understand.
- To fix this, we use **functional components** — they're stateless. To make them stateful, developers introduced **hooks**, which help manage state inside function components.
- Function components don't have lifecycle methods, so we use the **useEffect hook** to handle lifecycle behavior.

Key points: function component code is easy to read and easy to maintain. Class components use `this` and lifecycle methods; function components use hooks.

## 10. What are Hooks?

Hooks are functions used inside functional components that let you use state and lifecycle in a function component. Common hooks:

- **useState** — manage state
- **useEffect** — lifecycle methods
- **useRef** — references to the DOM
- **useContext** — state management

There are many more hooks for different purposes.

## 11. useEffect vs useLayoutEffect

- **useEffect** — runs after render, after your UI is painted on the browser. It's **asynchronous** — if a task is time-consuming, it doesn't block your execution; it moves on to the next task.
- **useLayoutEffect** — runs **before the browser paint**. It modifies the DOM after the DOM is modified but before the UI is painted. It's **synchronous** — it can block your UI or main thread if there's a time-consuming task inside. It's used for DOM measurements and scrolling-related work.

## 12. Virtual DOM, Diffing, and Reconciliation

The virtual DOM is a lightweight copy of the real DOM. React updates the virtual DOM first, then reconciles the real DOM.

How it works:

1. React works on the basis of state and props.
2. When any change happens in state or props, React creates a new virtual DOM.
3. React compares the new virtual DOM with the previous virtual DOM — this comparison is called the **diffing algorithm**.
4. Only the changes that actually happened get applied to the actual (real) DOM — only that particular part that was updated because of the state/prop change, instead of updating the whole DOM. This is called **reconciliation**.

This improves the performance of your application.

## 13. How do you prevent re-rendering?

To prevent unnecessary rendering, you have to memorize things — store them in the cache so they don't recompute/update until their state, props, or values change:

- **React.memo** — for function components (memorizes components).
- **useCallback** — memorizes functions.
- **useMemo** — memorizes values.
- **shouldComponentUpdate** — in class components.

Avoiding unnecessary re-rendering = better performance.

## 14. What is Lifting State Up?

Moving state from a child to the parent. Suppose a nested child holds a state that many components in the tree need to use. Using it from the nested child would require passing a lot of props. Instead, we move the state up to the common main parent, so all child components can easily get and share the data from there.

## 15. Explain React Reconciliation

React compares the previous and new virtual DOM and updates only the changed elements inside the DOM, using the diffing algorithm to improve performance. You only update the component in which the state or prop change actually happened — not the whole component tree.

## 16. Controlled vs Uncontrolled Components

- **Controlled components** — managed by state via the **useState** hook. You save and update the data inside useState.
- **Uncontrolled components** — handled directly by the DOM. You manage them with the **useRef** hook — you use ref to change values in the DOM.

## 17. React Keys — why are they important?

Keys give a unique identity to your elements, like key-value pairs in an object. Keys help React identify elements during render — so we know which component or value changed. With many components, keys let React identify which one got updated, and they also help avoid unnecessary re-rendering.

Without keys: insufficient updates and unexpected behavior — React won't know which component/state updated, so it keeps rendering on every render, and your application's performance goes down.

## 18. What is the useEffect Hook?

The useEffect hook is a React hook used inside functional components to run side effects. It lets you run code after render, and optionally when certain values change.

**What are side effects?** Fetching data from an API, subscribing/unsubscribing to events, updating the document title, timers (setTimeout, setInterval), syncing state with an external system. Lifecycle behavior in function components is also handled with useEffect.

**The dependency array:**

- **No dependency array** — the effect runs on every render. This causes unnecessary re-rendering and hurts performance.
- **Empty dependency array `[]`** — the effect runs only once, when the component mounts (first render).
- **With values** — the effect runs only when those specific values (state, props, actions, messages) change. If you want the code to run when a value changes, add that value to the array.

**The cleanup function:**

Lifecycle methods are mount, update, unmount. Mounting is handled when the effect is declared; updating is handled with the dependency array. For unmounting/cleanup, you write a **return statement** inside useEffect (e.g., clearInterval). Cleanup runs before the effect re-runs, and when the component unmounts.

**Fetching data inside useEffect:**

Fetch is a JavaScript function used to fetch data. Inside useEffect, call the API with fetch, use `.then`, convert the data to JSON, and set the state.

**Rules of hooks:**

- Only call hooks at the top level.
- The dependency array must be included everywhere — unless you intentionally want to run the effect on every render.
- useEffect runs after the paint.

## 19. What is the useRef Hook?

useRef is a hook used inside uncontrolled components. It's used to access the DOM and persist values without re-render.

Uncontrolled components are handled directly by the DOM. To change a value (e.g., a form's input value) through the DOM, you use ref — so that when the page re-renders, the value persists and doesn't change.

Key terms: the useRef hook is used inside uncontrolled components to change and access the DOM, and to persist the value without rendering it.

Usage: `const inputRef = useRef()` — attach `ref={inputRef}` to the input element.

## 20. What is useMemo?

useMemo is used to optimize performance by memoizing values — specifically calculated values.

Scenario: you have a function with a large, expensive calculation (e.g., tax calculation). The function renders on every render, so the calculation recalculates itself again and again, which slows down the application. With useMemo, the calculated value is stored in the cache, so it doesn't recalculate on every render — only when its particular dependencies (props/values) change.

## 21. What is useCallback?

useCallback memorizes functions. If a function is being re-created/re-rendered unnecessarily (e.g., because its parent re-renders) even though the values inside it haven't changed, useCallback stores it in the cache. The function only re-renders when the particular state/props in its dependency array change.

Summary:

- useMemo → memorizes calculated values
- useCallback → memorizes functions
- Both reduce unnecessary re-rendering by memorizing values and functions
- Use useMemo for calculation-related problems; use useCallback when a function is re-rendering itself unnecessarily

## 22. What is React Router?

React Router is a library you install inside React (react-router-dom) for navigation in single page applications (SPAs). In an SPA, when you navigate between pages (e.g., from home to about), the page doesn't reload — React Router handles the navigation. You define routes with a path and the component (element) to render for that path.

## 23. What is Prop Drilling?

Prop drilling is a situation where you pass data (props) from a parent component to a deeply nested child component through multiple intermediate components — even if those intermediate components don't need the data.

Example: the topmost parent needs to send a prop to a deeply nested child. The prop has to be passed through every intermediate level, even though those components don't use it. In a large application with many levels, this means passing the prop many times unnecessarily.

To handle this, we use the **Context API** — it shares data globally without prop drilling, using a global state. Any nested component can easily get the data it needs from the global state.

## 24. What is a Fragment?

A fragment is used to group elements without adding an extra DOM node. React requires a single grouping inside a component — you can use an empty fragment (`<>...</>`) or a `<div>`, but a fragment avoids the extra DOM node. Without grouping, you get an error.

## 25. What is Conditional Rendering?

Conditional rendering renders different UI based on a condition. Example: `isLoggedIn ? <Dashboard /> : <Login />` — if the condition is true, show the dashboard; if false, show the login page.

## 26. CSR vs SSR

**CSR (Client-Side Rendering):**

- React is a CSR framework. In a React app, the browser loads the basic (plain) HTML file from the server, then adds the JavaScript bundle and builds/renders the UI on the client side (browser).
- Examples: apps created with Create React App, Vite, etc.
- **Pros:** fast navigation after the first load; smooth user experience (SPA); less load on the server (all files load client-side).
- **Cons:** slow initial load; bad for SEO (content is not ready initially — the server only has plain HTML, so search engines don't get full content). Don't say the first load is fast just because it's an SPA — the first loading is slow, but navigation after that is very fast.

**SSR (Server-Side Rendering):**

- The entire HTML file is generated on the server, then sent to the browser. The browser just adds the JavaScript files to make it interactive.
- Flow: request goes to server → server renders the HTML file → browser receives and renders the full page.
- Examples: Next.js (React apps = CSR, Next.js = SSR).
- **Pros:** fast initial load (full HTML comes from the server); great for SEO (all files already loaded on the server); better performance on slow devices.
- **Cons:** more server load (all files load on the server); navigation gets slower as server load increases; more complex setup than React.

**Client-side vs server-side actions:** things like button clicks, actions, and the useEffect hook happen on the client side. In Next.js, if you use such client features, you write `"use client"` at the top of the file.

## 27. How do you optimize a React app?

Optimizing means improving your application's performance. The main goal is to avoid unnecessary rendering:

- **useMemo** — memorizes calculated values. A function with a large calculation (e.g., tax calculation) recalculates on every render, slowing the app down. useMemo stores the calculated value in the cache so it only recalculates when its particular props/values change.
- **useCallback** — memorizes functions so they don't re-create themselves on every render (e.g., when a parent re-renders). The function only re-renders when its particular values change.
- **React.memo** — memorizes components.
- **Lazy loading** — loads only as much data as you need. If a table needs 10 users, it loads 10 users instead of loading 1000 at once.
- **Code splitting** — divide a lot of code into smaller chunks, loading only what's needed first, then the rest.

## 28. Explain your project

- Prepare the projects on your resume well — keep the project you know best at the top.
- What is the project about? Read the project carefully.
- Which technologies were used? React, Next.js, Redux? For state management: Redux or Redux Toolkit — what are createAsyncThunk and middleware?
- What was your role in that project?
- How did you do error handling? How did you manage state? How did you build the component architecture?
- What was the project structure? What's inside the source folder? What is the index.ts file? What is the App file? What is the index.html file inside the public folder and how is it used?

## 29. What is Hydration?

SSR gives you the entire HTML file loaded — but HTML is just the structure of the UI. To make it interactive on the client, you need to attach event listeners (buttons performing actions, etc.). Attaching event listeners to the SSR HTML is called **hydration**.

Hydration errors happen when the HTML on the browser and the HTML on the server don't match.

## 30. What is React.StrictMode?

In your index file, you wrap your App component (from App.js) with React.StrictMode. It helps identify issues — bugs and problems — in development.

## 31. What is memo in React (React.memo)?

React.memo prevents unnecessary rendering by memorizing components.

- **useMemo** (a hook) → memorizes calculated values
- **useCallback** (a hook) → memorizes functions
- **React.memo** (a feature) → memorizes components

Scenario: a child component re-renders every time its parent re-renders, even when nothing in the child changed — for example, the child has a function that calls an API on every parent render, even though it isn't needed. Wrapping the child in React.memo makes it render only when its own props/state change. This stops unnecessary rendering and improves performance.

## 32. What is a Higher Order Component (HOC)?

A higher order component is a function that takes a component as an argument and returns a new component. The new component can include extra information or features (an upgraded component). Example: a user-info component that you want to show with a loading prop — you pass the component into a function along with extra information/features, and get back an enhanced component.

## 33. What is Lazy Loading?

Lazy loading optimizes your application's performance by loading a component only when it's needed — it doesn't do unnecessary rendering and only downloads the data you actually need. Example: `const Home = React.lazy(() => import('./Home'))` — the homepage only loads the data it needs.

## 34. What is Suspense?

Suspense shows a loader while data is loading. When your lazy-loaded data takes time to load, Suspense's `fallback` shows a loading state until the data is ready — for a good user experience, so the user knows the data is still loading. Lazy loading + Suspense are used together for good UX.

## 35. What are Custom Hooks?

Custom hooks are reusable logic built using hooks. You can create your own hook (e.g., `useFetch`) that wraps common logic, and reuse it wherever you need.

Rules:

- Always start your custom hook name with `use` (like built-in hooks: useState, useRef, useMemo, useCallback) — this identifies it as a hook.
- Inside it, you can use other hooks to build reusable logic.

## 36. What is Redux?

Redux is a state management library for large apps. It has a **central store** where you store common state — anyone who needs it can use that state from the store — and it provides **predictable state updates**. (Details like how to read/update store state are covered separately.)

## 37. Context API vs Redux

Both are used to solve the prop drilling problem.

- **Context API** is a hook; **Redux** is a library.
- **Context API** — use it when you have a small application with very little state to manage.
- **Redux** — use it for large applications with a lot of state to manage at a large scale.

## 38. What is Middleware in Redux?

Middleware handles async operations — API calls (fetching data, posting data, loading information) inside Redux. For that, Redux provides middleware like **Redux Thunk** or **Saga**. Middleware acts as the connection between the two sides and fetches the data. With **Redux Toolkit**, you use `createAsyncThunk`, which helps handle async tasks.

---