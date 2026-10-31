# 30 — Zustand: Global State Better Than Context

> Previous doc covered Context — fine for stable data.
> Now **Zustand** — for frequently changing state like cart.

---

## What Is Zustand

Zustand is a **lightweight state management library**. You create a store that holds both state and actions — any component can use it.

```bash
npm install zustand
```

---

## Zustand's Basic Structure

```javascript
import { create } from 'zustand'

const useStore = create((set) => ({
  // State
  count: 0,

  // Actions — how to change state
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
```

```jsx
// Use in any component
function Counter() {
  const { count, increment } = useStore()
  return <button onClick={increment}>{count}</button>
}
```

---

## ShopKaro's Cart Store — With Zustand

```javascript
// /store/cartStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(  // persist → saves to localStorage — cart survives page refresh
    (set, get) => ({

      // ─── State ───
      items: [],  // [{ id, name, price, imageUrl, quantity }]

      // ─── Actions ───

      // Add item to cart
      addItem: (product) => set((state) => {
        const existing = state.items.find(item => item.id === product.id)

        if (existing) {
          // Already there → increase quantity
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        } else {
          // New item → add it
          return {
            items: [...state.items, { ...product, quantity: 1 }]
          }
        }
      }),

      // Update quantity
      updateQuantity: (productId, quantity) => set((state) => ({
        items: quantity === 0
          ? state.items.filter(item => item.id !== productId)  // 0 → remove
          : state.items.map(item =>
              item.id === productId ? { ...item, quantity } : item
            )
      })),

      // Remove item
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      // Clear cart (after order placed)
      clearCart: () => set({ items: [] }),

      // Calculate total (derived value)
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
    }),
    {
      name: 'shopkaro-cart',  // localStorage key
    }
  )
)
```

---

## Using in Components

### Navbar — Cart Count:
```jsx
'use client'
import { useCartStore } from '@/store/cartStore'

function Navbar() {
  const items = useCartStore(state => state.items)  // Subscribe only to items
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav>
      <span>Cart ({count})</span>
    </nav>
  )
}
```

### Product Card — Add To Cart:
```jsx
'use client'
import { useCartStore } from '@/store/cartStore'

function AddToCartButton({ product }) {
  const addItem = useCartStore(state => state.addItem)

  return (
    <button onClick={() => addItem(product)}>
      Add to Cart
    </button>
  )
}
```

### Cart Page:
```jsx
'use client'
import { useCartStore } from '@/store/cartStore'

function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <div>Total: ₹{getTotal()}</div>
    </div>
  )
}
```

---

## Zustand vs Context — Final Summary

| | Context | Zustand |
|--|---------|---------|
| Setup | Built-in, no install | `npm install zustand` |
| Re-renders | All consumers re-render | Only subscribed parts |
| Async actions | Manual | Easy |
| persist (localStorage) | Manual | Easy via middleware |
| Best for | Stable data (user, theme) | Dynamic data (cart, notifications) |

---

## Next Doc

`31-state-server.md` — **Server State** — React Query / TanStack Query. Products list, order history — this comes from server. This is a different kind of state — caching, loading, error are all handled automatically by React Query.