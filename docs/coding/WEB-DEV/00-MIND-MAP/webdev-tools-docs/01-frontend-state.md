# 01 — State Management: Zustand, Redux, Jotai and the Rest

> Umbrella: Frontend → State Management
> Purpose: Manage the app's global "memory" — cart, user, UI state
> ShopKaro docs: Doc 27-31

---

## What This Category Solves

When one component's data is needed by another component — and they aren't directly related (not parent-child) — that's when **state management** comes in.

```
Zomato example:
Cart items → show count in header + Cart page + Checkout
Three separate components → same cart data needed → Global state
```

---

## Tools

---

### React Context
**Tag: 🟢 Built-in | No install needed**

```
What it is: React's built-in global state solution
When to use:
  → Stable data that doesn't change frequently
  → User login status, theme (dark/light), language
  → Small app, avoid prop drilling

When NOT to use:
  → Frequently changing state like cart
  → Frequent updates → all components re-render → Slow

Real app example:
  → Hotstar: Current logged-in user info across the whole app
  → Swiggy: Selected city/location (doesn't change often)

Industry preference:
  → Always available — found in any app
  → Not enough alone for complex state
```

---

#### Installation
```bash
# No installation needed! Comes built-in with React
# Just need React installed:
npm install react
# or
pnpm add react
```

#### Import + Code Example
```javascript
import { createContext, useContext, useState } from 'react'

// 1. Create context
const ThemeContext = createContext()

// 2. Create provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Consume in any component
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext)
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Toggle {theme}
  </button>
}
```

---

### Zustand
**Tag: 🟢 Most Popular 2024 | Recommended for new projects**

```
What it is: Minimal global state library — simple API, powerful
When to use:
  → Cart, notifications, modal state — frequently changing
  → Medium size apps
  → One or small team
  → Starting a new project

When NOT to use:
  → Very complex state logic needing time-travel debugging (Redux better)

Real app example:
  → ShopKaro: Cart items (add, remove, quantity update)
  → Swiggy clone: Cart + delivery address + coupon state
  → Razorpay dashboard clone: Active tab, filters, selected items

In India: Shifting from Redux to Zustand in new projects since 2023
Global: Vercel, Linear, big companies use it

Difference from alternatives:
  → Redux: 10x less code, no boilerplate
  → Context: No re-render problem
  → Jotai: Store-based (everything in one place), Jotai is atom-based (small pieces)
```

---

#### Installation
```bash
npm install zustand
# or
pnpm add zustand
```

#### Import + Code Example
```javascript
import { create } from 'zustand'

// Create store
const useCartStore = create((set) => ({
  items: [],

  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),

  removeItem: (itemId) => set((state) => ({
    items: state.items.filter(item => item.id !== itemId)
  })),

  clearCart: () => set({ items: [] })
}))

// Use in component
function CartComponent() {
  const { items, addItem, removeItem } = useCartStore()

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}
```

---

### Redux Toolkit (RTK)
**Tag: 🟡 Enterprise | Legacy Projects | Still relevant**

```
What it is: Predictable state container — complex global state with strict patterns
When to use:
  → Existing Redux codebase (don't rewrite)
  → Large team — 10+ developers
  → Complex state logic — undo/redo, time-travel debugging needed
  → Enterprise app where strict patterns are required

When NOT to use:
  → Starting a new project — use Zustand
  → Small team, simple state

Real app example:
  → Flipkart: Complex state — cart + filters + search + user + wishlist + offers
  → IRCTC: Booking state machine — seat selection, passenger info, payment steps
  → Trading platforms: Real-time data updates, complex UI state

In India: Found in many older projects — 2018-2022 era apps
Global: Twitter (old), Facebook, enterprise apps

Redux vs Redux Toolkit:
  → Redux (original): Lots of boilerplate — actions, action creators, reducers separate
  → Redux Toolkit: Official way — createSlice makes everything simple
  → New project? Use Redux Toolkit, not plain Redux
```

---

#### Installation
```bash
npm install @reduxjs/toolkit react-redux
# or
pnpm add @reduxjs/toolkit react-redux
```

#### Import + Code Example
```javascript
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

// Create slice (actions + reducers together)
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    }
  }
})

// Configure store
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
})

// Use in component
function CartComponent() {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => dispatch(cartSlice.actions.removeItem(item.id))}>
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
```

---

### Jotai
**Tag: 🔵 Lightweight | Atomic State | Growing**

```
What it is: Atom-based state — small independent pieces
When to use:
  → State is made of small independent pieces
  → Need to work with React Suspense
  → Very small bundle size needed

When NOT to use:
  → Want all state in one place (store pattern preferred)
  → Large team — Zustand/Redux patterns more familiar

Real app example:
  → Blog editor: Each field (title, content, tags) is a separate atom
  → Dashboard: Each widget's state managed independently

Difference from Zustand:
  → Zustand: One big store → everything in it
  → Jotai: Many small atoms → compose them
```

---

#### Installation
```bash
npm install jotai
# or
pnpm add jotai
```

#### Import + Code Example
```javascript
import { atom, useAtom } from 'jotai'

// Create atom (independent piece of state)
const countAtom = atom(0)
const nameAtom = atom('Guest')

// Combine multiple atoms
const greetingAtom = atom((get) => `Hello, ${get(nameAtom)}!`)

// Use in component
function Counter() {
  const [count, setCount] = useAtom(countAtom)
  const [name] = useAtom(nameAtom)
  const [greeting] = useAtom(greetingAtom)

  return (
    <div>
      <p>{greeting}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

---

### MobX
**Tag: 🟠 Reactive | OOP Style | Niche**

```
What it is: Reactive state management — state changes → UI updates automatically
When to use:
  → Prefer OOP (class-based) style
  → Coming from Angular background
  → Complex derived state (computed values)

When NOT to use:
  → New React project — feels out of place in React ecosystem
  → Prefer functional style

Real app example:
  → Enterprise apps with Angular/React hybrid
  → Old company codebases

In India: Rare — mostly old projects
```

---

#### Installation
```bash
npm install mobx mobx-react-lite
# or
pnpm add mobx mobx-react-lite
```

#### Import + Code Example
```javascript
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

// Create store class
class CartStore {
  items = []

  constructor() {
    makeAutoObservable(this)
  }

  addItem(item) {
    this.items.push(item)
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId)
  }

  get totalCount() {
    return this.items.length
  }
}

const cartStore = new CartStore()

// Use in component (wrap with observer)
const CartComponent = observer(({ store }) => {
  return (
    <div>
      <p>Total items: {store.totalCount}</p>
      {store.items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => store.removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
})
```

---

### XState
**Tag: 🔵 State Machines | Complex Logic | Niche**

```
What it is: Finite state machines — modeling complex flows
When to use:
  → Complex multi-step flows — booking, onboarding, wizards
  → State transitions need to be explicitly defined
  → Preventing impossible states

Real app example:
  → MakeMyTrip: Booking flow — search → select → passenger details → payment → confirmation
  → Ola: Driver state machine — offline → available → on trip → completing

Powerful once understood — but steep learning curve
For beginners: Learn later
```

---

#### Installation
```bash
npm install xstate
# or
pnpm add xstate
```

#### Import + Code Example
```javascript
import { createMachine, createActor } from 'xstate'

// Define state machine
const bookingMachine = createMachine({
  id: 'booking',
  initial: 'searching',
  states: {
    searching: {
      on: { FOUND: 'selected' }
    },
    selected: {
      on: {
        CONFIRM: 'passengerDetails',
        CANCEL: 'searching'
      }
    },
    passengerDetails: {
      on: {
        SUBMIT: 'payment',
        BACK: 'selected'
      }
    },
    payment: {
      on: {
        SUCCESS: 'confirmed',
        FAILED: 'payment'
      }
    },
    confirmed: {
      type: 'final'
    }
  }
})

// Create actor and use it
const bookingActor = createActor(bookingMachine)
bookingActor.start()

// Use in component
function BookingFlow() {
  const [state, setState] = React.useState(bookingActor.getSnapshot())

  React.useEffect(() => {
    const subscription = bookingActor.subscribe((snapshot) => {
      setState(snapshot)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <div>
      <p>Current state: {state.value}</p>
      {state.value === 'searching' && (
        <button onClick={() => bookingActor.send({ type: 'FOUND' })}>
          Flight Found
        </button>
      )}
      {/* ... other states */}
    </div>
  )
}
```

---

### Valtio
**Tag: 🔵 Proxy-based | Simple | Growing**

```
What it is: Proxy-based state — mutate directly, reactivity is automatic
When to use:
  → Like Zustand but prefer mutable style
  → Small apps, quick prototypes

Difference from Zustand: Mutation style vs functional style
```

---

#### Installation
```bash
npm install valtio
# or
pnpm add valtio
```

#### Import + Code Example
```javascript
import { proxy, useSnapshot } from 'valtio'

// Create state (via proxy)
const state = proxy({
  count: 0,
  items: [],

  increment() {
    ++state.count
  },

  addItem(item) {
    state.items.push(item)
  }
})

// Use in component
function Counter() {
  const snap = useSnapshot(state)

  return (
    <div>
      <p>Count: {snap.count}</p>
      <button onClick={() => state.increment()}>
        Increment
      </button>
    </div>
  )
}
```

---

### Recoil
**Tag: 🔴 Avoid | Facebook abandoned it**

```
What it is: Facebook's atom-based state
Why avoid: Facebook practically abandoned it — last major update 2023
Alternative: Jotai (same concept, actively maintained)
```

---

#### Installation (Not Recommended)
```bash
# If you still want to use it (legacy project):
npm install recoil
# or
pnpm add recoil

# Better to use Jotai:
npm install jotai
```

#### Import + Code Example (For Reference Only)
```javascript
import { atom, useRecoilState, RecoilRoot, RecoilState } from 'recoil'

// Create atom
const countAtom = atom({
  key: 'countAtom',
  default: 0
})

// Use in component
function Counter() {
  const [count, setCount] = useRecoilState(countAtom)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}

// Wrap app in RecoilRoot
function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  )
}
```

---

## Quick Decision — Which to Choose

```
New Next.js project?
  → Zustand (cart, global UI) + React Query (server data)

Existing Redux codebase?
  → Stay on Redux Toolkit — don't rewrite

Only one or two global things needed (user, theme)?
  → React Context is enough

Complex multi-step flow (booking, onboarding)?
  → Explore XState

Prefer atom-based state?
  → Jotai
```

---

## India Industry Reality

```
Startup / New project (2024):  Zustand + React Query
Mid-size company:              Redux Toolkit or Zustand
Enterprise / Old company:      Redux (plain or RTK)
Freelance projects:            Zustand or Context — quick setup
```

---

## Next Doc

`02-frontend-styling.md` — Styling tools — Tailwind, CSS Modules, Styled Components — how Swiggy's UI is built with Tailwind, how it differs from MUI, when to use what.
