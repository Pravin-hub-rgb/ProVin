# 16 — SSR: Server Side Rendering

> Previous doc covered CSR — rendering in the browser.
> Now **SSR** — Server Side Rendering. This is Next.js's default.

---

## What Is SSR

**Server Side Rendering** — on every request the server builds HTML and sends the complete page.

```
1. Priya opens /products/123
2. Server → Fetches product data from database
3. Server → Builds HTML — data already inside
4. Complete HTML → Sent to browser
5. Priya sees the page — data was already there
```

The browser doesn't need to wait for JavaScript to run.

---

## SSR in Next.js — Default Behavior

In Next.js App Router, **everything is SSR by default** — only write `'use client'` when you want CSR.

```jsx
// /app/products/[id]/page.jsx
// No 'use client' → This is SSR automatically

// async function → Runs on the server
export default async function ProductPage({ params }) {
  // This runs on the server — directly from the database
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  })

  // Complete HTML returned — data already inside
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  )
}
```

The database call happens **on the server** — never reaches the browser.

---

## Advantages of SSR

**SEO** — Google crawler gets complete HTML — everything gets indexed

**Fast first paint** — Data already in HTML — no loading state

**Secure** — Database credentials stay on the server — never reach the browser

**Real-time data** — Fresh data on every request — stock never outdated

---

## Problems With SSR

**Server load per request** — 1000 people viewing a product at once → 1000 database calls

**Slow TTFB** (Time To First Byte) — Server processes first — then sends

**Server required** — Can't deploy SSR pages to static hosting (works on Vercel though)

---

## Where to Use SSR in ShopKaro

```
/products → SSR ✓
  Why: Google search "shoes online" needs SEO
       Products need real-time display

/products/[id] → SSR ✓
  Why: SEO important (product name indexed on Google)
       Stock real-time — "Only 2 left" must be accurate

/orders → SSR ✓ (with auth check)
  Why: Fresh order data needed
       Auth check on server — secure
```

---

## Auth Check in SSR

Protected pages check the session on the server:

```jsx
// /app/orders/page.jsx

import { getSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'

export default async function OrdersPage() {
  const session = await getSession()

  // Check on server → Redirect → No flash of content
  if (!session) {
    redirect('/login')
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.userId }
  })

  return <div>{/* orders list */}</div>
}
```

With CSR auth check — the page shows first, then redirect happens (ugly). With SSR the redirect happens on the server — smooth.

---

## SSR vs CSR — Quick Decision

```
Will this page be searched on Google?
  → Yes → SSR

Is data different per user? (private page)
  → Yes → CSR or SSR with auth

Need very fast interactions (buttons, real-time)?
  → Yes → CSR

Need real-time data (stock, prices)?
  → Yes → SSR
```

---

## Summary

| | |
|--|--|
| **What SSR is** | Server builds HTML on every request |
| **In Next.js** | Default behavior — no 'use client' needed |
| **When to use** | Public pages, SEO important, real-time data |
| **When not to** | Heavy user interactions (cart operations) |

---

## Next Doc

`17-rendering-ssg.md` — Third strategy — **SSG**. The fastest — HTML is already built beforehand. ShopKaro's homepage and About page will use this.