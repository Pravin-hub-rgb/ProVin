# 15 — CSR: Client Side Rendering

> Previous doc covered the Rendering umbrella overview.
> Now the first strategy — **CSR**. You already know this — it's what you do in React.

---

## What Is CSR

**Client Side Rendering** — HTML gets built in the browser through JavaScript.

```
1. Priya opens /cart
2. Server → Sends: empty HTML + JavaScript bundle
3. Browser runs JavaScript
4. JavaScript → Makes API call → Cart data arrives
5. JavaScript → Builds HTML → Page shows
```

Blank/loading screen first → then content.

---

## You Already Know This

In React you do this:

```jsx
'use client'  // In Next.js this is required for CSR

import { useState, useEffect } from 'react'

function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This is CSR — data is being fetched in the browser
    fetch('/api/cart')
      .then(r => r.json())
      .then(data => {
        setCartItems(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {cartItems.map(item => <CartItem key={item.id} item={item} />)}
    </div>
  )
}
```

This is pure CSR — data is fetched in the browser.

---

## Advantages of CSR

**Fast interactions** — once the page loads, everything feels instant

**User-specific data** — each user's data is different, not cached on the server

**Real-time updates** — add an item to cart → updates instantly, no page refresh

---

## Problems With CSR

**Blank screen first** — nothing shows until JavaScript loads

**SEO problem** — Google's crawler does run JavaScript but unreliably — content doesn't get indexed properly

**Slow first load** — JavaScript downloads first, then API call, then render

---

## Where to Use CSR in ShopKaro

```
/cart → CSR ✓
  Why: Only the logged-in user's data, fast add/remove needed,
       no SEO needed (private page)

/checkout → CSR ✓
  Why: Heavy user interactions, real-time price updates, private page

Counters, quantity buttons → CSR ✓
  Why: Instant feedback needed, UI interactions
```

---

## Where NOT to Use CSR

```
/products → Don't use
  Why: SEO needed, Google needs to index products

/products/[id] → Don't use
  Why: SEO important — people search "Nike shoes" on Google

Homepage → Don't use
  Why: Fast load needed, SEO important
```

---

## 'use client' in Next.js

Next.js uses **server components** by default. For CSR you must write `'use client'` at the top of the file:

```jsx
'use client'  // This file runs in the browser

// Now useState, useEffect, onClick all work
```

Without `'use client'` — using `useState` or `useEffect` gives an error.

---

## Summary

| | |
|--|--|
| **What CSR is** | Building HTML in the browser using JavaScript |
| **When to use** | Private pages, heavy interactions, real-time updates |
| **When not to** | Public pages where SEO matters |
| **In Next.js** | `'use client'` directive |

---

## Next Doc

`16-rendering-ssr.md` — Now **SSR** — Server Side Rendering. The server builds fresh HTML on request. ShopKaro's product pages will use this — why and how, we'll understand.