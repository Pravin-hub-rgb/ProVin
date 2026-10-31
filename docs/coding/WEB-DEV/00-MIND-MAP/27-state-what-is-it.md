# 27 — State Management: What Is It

> API Design complete — REST, GraphQL, ShopKaro endpoints.
> Now the sixth big umbrella — **State Management**.
> This topic confuses many — we'll get it crystal clear here.

---

## What Is State

**State** = the app's **current situation** — what data exists, what should show.

In ShopKaro, state means:
- How many items in cart right now?
- Is the user logged in or not?
- Which modal is open?
- Are products still loading or loaded?

All of this is **state** — and it **keeps changing** with user actions.

---

## What's Inside the State Management Umbrella

```
STATE MANAGEMENT
│
├── Local State (useState)
│   → For a single component
│
├── Global State
│   ├── React Context → Simple global state
│   └── Zustand → Complex global state
│
└── Server State (React Query / TanStack Query)
    → Data coming from server — separate concept
```

---

## Three Types of State

### 1. Local State — Data for One Component Only

```jsx
function SearchBar() {
  const [query, setQuery] = useState('')  // Only SearchBar needs this

  return <input value={query} onChange={e => setQuery(e.target.value)} />
}
```

This state is used only inside `SearchBar` — no one else needs it.

---

### 2. Global State — Data for the Whole App

```
Cart items → Count must show in Navbar
           → List must show on Cart page
           → Total must show at Checkout

These are three separate components — all need the same cart data
```

This is **global state** — accessible across the whole app.

---

### 3. Server State — Data That Came From Server

```
Products list → Fetched from server
User profile → Fetched from server
Order history → Fetched from server
```

This data lives on the server — frontend just keeps a copy. And it can go **stale** (changed on server but frontend still has old copy).

Server state is handled differently — with React Query.

---

## Which State Where in ShopKaro

| State | Type | Tool |
|-------|------|------|
| Cart items | Global | Zustand |
| User login status | Global | Zustand or Context |
| Search input value | Local | useState |
| Modal open/closed | Local | useState |
| Products list | Server | React Query |
| User profile data | Server | React Query |

---

## Next Doc

`28-state-local-vs-global.md` — The difference between Local and Global state with a concrete example — when props are enough, when global is needed.