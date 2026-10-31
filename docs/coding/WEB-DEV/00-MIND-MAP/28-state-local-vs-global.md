# 28 — Local State vs Global State: What's the Difference

> Previous doc covered the State Management umbrella.
> Now the direct difference — **Local state when, Global state when**.

---

## Local State — useState

When state is needed only by one component and its direct children.

```jsx
// Password field show/hide toggle — only this component needs it
function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <input type={showPassword ? 'text' : 'password'} />
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  )
}
```

No other component needs `showPassword` — local state is perfect.

---

## When Local State Isn't Enough — Prop Drilling

Say cart item count needs to show in Navbar:

```jsx
// App
function App() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div>
      <Navbar cartCount={cartCount} />           {/* Prop passed */}
      <ProductPage setCartCount={setCartCount} /> {/* Setter passed */}
    </div>
  )
}

// Navbar
function Navbar({ cartCount }) {
  return <div>Cart ({cartCount})</div>
}

// ProductPage → ProductList → ProductCard → AddToCartButton
function AddToCartButton({ setCartCount }) {  // Prop 3 levels down
  return <button onClick={() => setCartCount(prev => prev + 1)}>Add</button>
}
```

This is **prop drilling** — state is up top, data needs to go many levels down. Messy and hard to maintain.

---

## Global State — The Solution

With global state, **any component can access it directly** — no prop passing needed.

```jsx
// Cart is in global store
// Navbar accesses directly
function Navbar() {
  const cartCount = useCartStore(state => state.items.length)
  return <div>Cart ({cartCount})</div>
}

// AddToCartButton accesses directly
function AddToCartButton({ product }) {
  const addItem = useCartStore(state => state.addItem)
  return <button onClick={() => addItem(product)}>Add</button>
}

// Nothing passed via props to either — both read from store directly
```

---

## Decision — Local or Global?

```
Is this state used by only one component?
  → Yes → useState (local)

Does it need to go 2-3 levels down via props?
  → A little → Context is fine
  → A lot → Zustand

Needed across the whole app (cart, user)?
  → Zustand
```

---

## Local State Examples in ShopKaro

```jsx
// Form input values — local
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

// Loading state — local
const [isLoading, setIsLoading] = useState(false)

// Error message — local
const [error, setError] = useState(null)

// Modal open/close — local (usually)
const [isModalOpen, setIsModalOpen] = useState(false)

// Accordion open/close — local
const [isExpanded, setIsExpanded] = useState(false)
```

---

## Global State Examples in ShopKaro

```
Cart items → Navbar + Cart page + Checkout = Zustand
User info → Protected routes + Profile = Zustand or Context
Toast notifications → Triggered from anywhere = Zustand
```

---

## Next Doc

`29-state-context.md` — **React Context** — built-in global state solution. When it's enough, when Zustand is needed — we'll understand that decision.