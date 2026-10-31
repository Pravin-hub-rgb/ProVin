# 05 — HTTP Clients: fetch, Axios, React Query, SWR

> Umbrella: Frontend → HTTP Client (API Calls)
> Purpose: Fetching and sending data to the server
> Note: Two separate concepts here — HTTP client (how to make the request) + Data fetching library (how to manage state)

---

## Two Separate Things

```
HTTP CLIENT:          How to send the request
  → fetch (native), Axios, ky

DATA FETCHING LIBRARY: Manage server state — loading, caching, refetch
  → React Query, SWR

Combo:
  → React Query internally uses fetch or Axios
  → React Query = Axios + loading state + caching + retry — all in one
```

---

## HTTP Clients

---

### fetch (Native Browser API)
**Tag: 🟢 Built-in | No install | Always available**

```
What it is: Browser's built-in HTTP client — no library needed
When to use:
  → Simple requests
  → Next.js server components (Next.js extended fetch — caching built-in)
  → Keep bundle size zero

Code feel:
  const response = await fetch('/api/products')
  const data = await response.json()

  // Error handling is manual
  if (!response.ok) throw new Error('Failed')

Cons:
  → Verbose error handling — check response.ok every time
  → No interceptors (adding token to every request manually)
  → Request cancellation complex

Special in Next.js:
  → Next.js's fetch is extended — caching, revalidation built-in
  → Use fetch in server components (not Axios)
```

---

### Axios
**Tag: 🟢 Most Popular | Feature-rich | Client + Server**

```
What it is: HTTP client library — more features than fetch
When to use:
  → Browser API calls with interceptors
  → Node.js backend too (isomorphic)
  → File upload with progress
  → Request/response transformation

Pros:
  → Interceptors: Automatically add token to every request
  → Automatic JSON parse
  → Better error handling (non-2xx status → throws)
  → Easy request cancellation
  → Timeout support

Code feel:
  // Interceptor — set once, token added to every request
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  // Request
  const { data } = await axios.get('/api/products')
  // data is already parsed JSON

Real app example:
  → Zomato: Restaurant list fetch — interceptor adds location header
  → Ola: Ride requests — interceptor adds user token
  → ShopKaro: API calls in CSR pages

Difference from fetch:
  → Axios: Throws on non-2xx, automatic JSON parse
  → fetch: Manual check needed, manual JSON parse

In India: Still very popular — especially React + Express combo
```

---

### ky
**Tag: 🔵 Lightweight | fetch wrapper | Growing**

```
What it is: A wrapper around fetch — smaller than Axios, better than fetch
When to use:
  → Bundle size matters
  → Want Axios-like features in a lighter package

Difference from Axios:
  → ky: ~3KB | Axios: ~15KB
  → Newer, TypeScript-first

Status: Growing but Axios ecosystem more mature
```

---

## Data Fetching Libraries

---

### TanStack Query (React Query)
**Tag: 🟢 Industry Standard 2024 | Server State Management**
**Full Form: TanStack = TypeScript + Stack (TanStack is the organization maintaining this library)**
**Also known as: React Query (old name, still commonly used)**

```
What it is: Server state management — data fetching, caching, background updates
When to use:
  → Need server data in CSR pages
  → Need caching, background refresh
  → Auto-manage loading/error states
  → Infinite scroll, pagination
  → Optimistic updates

Covered in ShopKaro docs: Doc 31

Real app example:
  → Swiggy: Restaurant list — refreshes in background
  → Zomato: Search results with caching
  → CRED: Transaction history — stale while revalidate

What it replaces:
  → useState + useEffect + manual loading/error → React Query in one line

Code feel:
  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants', city],
    queryFn: () => axios.get(`/api/restaurants?city=${city}`).then(r => r.data),
    staleTime: 5 * 60 * 1000  // 5 min cache
  })

Mutation (POST/PUT/DELETE):
  const mutation = useMutation({
    mutationFn: (newItem) => axios.post('/api/cart', newItem),
    onSuccess: () => queryClient.invalidateQueries(['cart'])
  })

In India: Rapidly growing — standard since 2022
```

---

### SWR
**Tag: 🟢 Vercel | Lightweight | Simple**
**Full Form: SWR = Stale While Revalidate (a caching strategy name)**
**Meaning: Show cached data first (stale), refresh in background (revalidate)**

```
What it is: Data fetching library — built by Vercel, natural fit with Next.js
When to use:
  → Simple data fetching — don't need full power of React Query
  → Next.js project, want lightweight solution

Difference from React Query:
  → SWR: Simpler API, fewer features
  → React Query: More features — mutations, devtools, infinite queries
  → In production: React Query more versatile

Code feel:
  const { data, error } = useSWR('/api/products', fetcher)

Status: Still good — but React Query took more adoption
```

---

## Best Combos

```
Next.js Server Components:
  → Native fetch (Next.js extended version)
  → No library needed

Next.js Client Components (CSR):
  → React Query + Axios (or fetch)
  → Most popular combo

Simple project, no complex caching:
  → Axios directly (without React Query)
  → or SWR for simple cases
```

---

## Quick Decision

```
Server component (Next.js)?
  → Native fetch

Client component, complex state (caching, background refresh)?
  → React Query

Client component, simple fetch?
  → Axios or fetch directly

Bundle size critical?
  → ky (fetch wrapper)
```

---

## Next Doc

`06-frontend-animation.md` — Animation tools — Framer Motion, GSAP, CSS Animations — how Swiggy's food card hover, Zomato's loading animation would be built.
