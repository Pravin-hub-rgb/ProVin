# 35 — Server-Side Caching: Don't Hit the Database Repeatedly

> Previous doc covered CDN — global distribution of static files.
> Now **Server-Side Caching** — saving database results.

---

## Problem — Hitting the Database on Every Request

ShopKaro has 1000 users. All of them open the homepage.

Without cache:
```
User 1 → Homepage → Database: "Give me featured products" → Result
User 2 → Homepage → Database: "Give me featured products" → Same result
User 3 → Homepage → Database: "Give me featured products" → Same result
... same query 1000 times
```

1000 database queries — all for the same result. Slow and a waste of resources.

---

## Solution — Cache It

First time, fetch from the database — save it. Next time, return the saved result.

```
User 1 → Homepage → Database → Result → Save in cache
User 2 → Homepage → From cache (don't open DB)
User 3 → Homepage → From cache
```

---

## Built-in Caching in Next.js

In the Next.js App Router, `fetch` caches automatically:

```javascript
// This result gets cached automatically
const products = await fetch('/api/products', {
  next: { revalidate: 3600 }  // Refresh after 1 hour
})

// Never cache — always fresh
const orders = await fetch('/api/orders', {
  cache: 'no-store'
})
```

When you use Prisma in server components — React memoization gives some caching, but not explicitly.

---

## Redis — Cache in Production

**Redis** is an in-memory database — super fast, perfect for caching.

```javascript
// Concept — actual setup is a bit more complex
import redis from '@/lib/redis'

async function getFeaturedProducts() {
  // First check the cache
  const cached = await redis.get('featured-products')
  if (cached) return JSON.parse(cached)

  // Cache miss → fetch from database
  const products = await prisma.product.findMany({
    where: { featured: true }
  })

  // Save in cache — for 1 hour
  await redis.setex('featured-products', 3600, JSON.stringify(products))

  return products
}
```

---

## Caching Strategy for ShopKaro V1

```
Homepage featured products → Next.js revalidate: 3600 (1 hour)
Product listing → Next.js revalidate: 300 (5 minutes)
Product detail → Next.js revalidate: 60 (1 minute — stock must be fresh)
Cart / Orders → cache: 'no-store' (always fresh)
User data → cache: 'no-store'
```

Redis — **add it later** when traffic grows. Next.js built-in caching is enough for V1.

---

## Caching Umbrella — Complete

```
CACHING
│
├── Browser Storage   → Doc 33 ✓
├── CDN               → Doc 34 ✓
└── Server Cache      → Doc 35 ✓ (THIS)
```

---

## Next Doc

`36-payments-what-is-it.md` — Eighth umbrella — **Payments**. Priya pays — how exactly does this flow work? Razorpay, Stripe, Webhooks — we'll understand all of it. The most important part of e-commerce.
