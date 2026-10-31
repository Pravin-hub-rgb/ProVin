# 29 — React Context: Built-in Global State

> Previous doc covered local vs global state difference.
> Now **React Context** — React's own global state solution.

---

## What Is Context

Context is React's built-in way to make data accessible to any component — without prop drilling.

```jsx
// Create context
const UserContext = createContext(null)

// Wrap with provider — data comes from here
function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar />        {/* Any component */}
      <ProductPage />   {/* Nested as deep as you want */}
    </UserContext.Provider>
  )
}

// Any component can access directly
function Navbar() {
  const { user } = useContext(UserContext)
  return <div>{user ? `Hi ${user.name}` : 'Login'}</div>
}
```

---

## When Context Is Fine

```
User login status → Context ✓
  Needed across app, doesn't change often

Theme (dark/light mode) → Context ✓
  Stable, needed everywhere

Language preference → Context ✓
  Stable data
```

---

## Context's Problem — Re-renders

Context has one issue — **whenever context value changes, all consumers re-render.**

```jsx
const CartContext = createContext()

function App() {
  const [cartItems, setCartItems] = useState([])

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <Navbar />      // Consumes for cart count
      <Sidebar />     // Consumes for something
      <ProductPage /> // Consumes to add to cart
      <Footer />      // Also consumes
    </CartContext.Provider>
  )
}

// Add one item → cartItems changes → ALL components re-render
// Footer has nothing to do with cart — still re-renders
```

If cart changes frequently (user adding +, -) → many re-renders → slow UI.

---

## Context vs Zustand — When?

| Situation | Context | Zustand |
|-----------|---------|---------|
| Stable data (user, theme) | ✓ Best | Overkill |
| Frequently changing data (cart) | Re-render problem | ✓ Better |
| Complex logic | Verbose | ✓ Cleaner |
| Small app | ✓ | Overkill |
| Large app | Messy | ✓ |

---

## Should ShopKaro Use Context?

**For user info → Context ✓**
User login/logout doesn't happen often — re-render problem doesn't arise.

```jsx
// /lib/context/UserContext.jsx
'use client'

import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children, initialUser }) {
  const [user, setUser] = useState(initialUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
```

**For cart → Zustand (next doc)**
Cart changes frequently — Zustand is better.

---

## Next Doc

`30-state-zustand.md` — **Zustand** — lightweight global state library. Perfect for frequently changing state like cart and notifications. What Zustand is and how it works — with ShopKaro's cart example.