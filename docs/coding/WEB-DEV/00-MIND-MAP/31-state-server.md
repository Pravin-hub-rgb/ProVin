# 31 — Server State: React Query

> Previous doc covered Zustand — client-side global state.
> Now **Server State** — data that comes from the server.
> React Query / TanStack Query handles this.

---

## Why Server State Is Different

Cart state — lives in the browser, browser controls it.

Products list — lives on the server. Frontend only keeps a copy. Problems:
- Data can go stale (updated on server, old on frontend)
- Need to handle loading state
- Need to handle errors
- Don't fetch the same data repeatedly (cache it)

All of this manually is tedious — React Query does it automatically.

---

## Manual Approach Without React Query

```jsx
function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return <div>{products.map(...)}</div>
}
```

This pattern repeats everywhere — boring and error-prone.

---

## Same Thing With React Query

```bash
npm install @tanstack/react-query
```

```jsx
import { useQuery } from '@tanstack/react-query'

function ProductsPage() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],           // Unique key — for caching
    queryFn: () => fetch('/api/products').then(r => r.json())
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  return <div>{products.map(...)}</div>
}
```

Short, clean. And React Query automatically:
- **Caches** — doesn't fetch the same data again quickly
- **Background refresh** — quietly updates stale data
- **Loading/error state** — managed automatically
- **Retry** — retries if the request fails

---

## ShopKaro With React Query

```jsx
// Products list — with filters
function useProducts(filters) {
  return useQuery({
    queryKey: ['products', filters],  // Filters change → new fetch
    queryFn: () => {
      const params = new URLSearchParams(filters)
      return fetch(`/api/products?${params}`).then(r => r.json())
    },
    staleTime: 5 * 60 * 1000,  // Treat as fresh for 5 minutes — don't refetch
  })
}

// Usage:
function ProductsPage() {
  const [filters, setFilters] = useState({ category: 'shoes' })
  const { data, isLoading } = useProducts(filters)
  // ...
}
```

```jsx
// Orders list — auth required
function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch('/api/orders').then(r => r.json()),
    staleTime: 0,  // Always fresh — order status can change
  })
}
```

---

## Mutation — Changing Data

React Query handles POST/PUT/DELETE with mutations too:

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

function AddToCartButton({ product }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (productId) =>
      fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity: 1 })
      }),
    onSuccess: () => {
      // Refresh cart data
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  return (
    <button
      onClick={() => mutation.mutate(product.id)}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}
```

---

## State Management — Complete Summary

```
Local State (useState):
  → Single component: form inputs, toggles, loading

Global Client State (Zustand):
  → Whole app, changes frequently: cart, notifications

Global Stable State (Context):
  → Whole app, changes rarely: user info, theme

Server State (React Query):
  → Data from server: products, orders, user profile
```

## State Management Umbrella — Complete

```
STATE MANAGEMENT
│
├── Local State     → Doc 28 ✓
├── Context         → Doc 29 ✓
├── Zustand         → Doc 30 ✓
└── React Query     → Doc 31 ✓ (THIS)
```

---

## Next Doc

`32-caching-what-is-it.md` — Seventh umbrella — **Caching**. Fetching the same data repeatedly is slow — caching makes it fast. localStorage, sessionStorage, CDN, server cache — we'll understand all of them.
