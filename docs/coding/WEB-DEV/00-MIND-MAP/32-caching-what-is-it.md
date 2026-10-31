# 32 — Caching: What Is the Umbrella

> State Management is complete.
> Now the seventh umbrella — **Caching**.
> Fetching the same data repeatedly is slow — cache it.

---

## What Is Caching

**Caching** = save the data somewhere so you don't have to ask the server for it again.

Priya opens the ShopKaro products page:
- Without cache: Fetch products from the database every time → Slow
- With cache: Fetch the first time, save it → Next time return the saved data → Fast

---

## What's Inside the Caching Umbrella

```
CACHING
│
├── Browser Storage
│   ├── localStorage    → Permanent browser storage
│   ├── sessionStorage  → Until the tab closes
│   └── IndexedDB       → Large data storage
│
├── CDN (Content Delivery Network)
│   → Distribute static files worldwide
│
└── Server-side Cache
    → Save database results (Redis etc.)
```

---

## What Gets Cached Where — ShopKaro

```
USER'S BROWSER:
  Cart data (Zustand persist) → localStorage
  Auth token/session → Cookie (set by server)
  Product images → Browser caches automatically

CDN:
  ShopKaro images (product photos)
  Static JS, CSS files

SERVER:
  Results of popular product queries
  Homepage data
```

---

## Next Doc

`33-caching-browser.md` — localStorage, sessionStorage, IndexedDB — when to use which of the three, what the differences are, where they'll be used in ShopKaro.
