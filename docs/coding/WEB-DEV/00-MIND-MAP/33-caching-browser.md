# 33 — Browser Storage: localStorage, sessionStorage, IndexedDB

> Previous doc gave an overview of the Caching umbrella.
> Now **Browser Storage** — the three options, when to use which.

---

## localStorage

Save data in the browser **permanently** — close the tab, close the browser, restart the computer — the data stays.

```javascript
// Save
localStorage.setItem('theme', 'dark')
localStorage.setItem('language', 'hindi')

// Read
const theme = localStorage.getItem('theme')  // "dark"

// Delete
localStorage.removeItem('theme')
```

**For objects, use JSON:**
```javascript
// Save
localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Priya' }))

// Read
const user = JSON.parse(localStorage.getItem('user'))
```

**Limitations:**
- Only strings are stored (hence JSON.stringify)
- ~5MB limit
- Browser only — server can't see it (cookies are different)
- Readable by JavaScript — don't store sensitive data

**Where in ShopKaro:** The Zustand cart store is saved here (automatically via persist middleware).

---

## sessionStorage

Like localStorage — but **deleted when the tab closes**.

```javascript
sessionStorage.setItem('checkoutStep', '2')
const step = sessionStorage.getItem('checkoutStep')
```

**Where in ShopKaro:** Temporarily save checkout progress — so if the user accidentally hits back, they can come back to it.

---

## localStorage vs sessionStorage

| | localStorage | sessionStorage |
|--|-------------|----------------|
| When deleted | Manually | On tab close |
| Across tabs | Shared | Each tab separate |
| Use case | Preferences, cart | Temp form data |

---

## IndexedDB

A **database** in the browser — large data, complex queries.

```javascript
// Complex — usually not used directly
// Libraries are used: idb, Dexie.js
import { openDB } from 'idb'

const db = await openDB('shopkaro', 1, {
  upgrade(db) {
    db.createObjectStore('products', { keyPath: 'id' })
  }
})

await db.put('products', { id: 1, name: 'Nike Shoes', price: 2999 })
const product = await db.get('products', 1)
```

**Where in ShopKaro:** Not in V1. If offline support is needed — save the product catalog in IndexedDB.

---

## When to Use What

| Data | Storage |
|------|---------|
| User preferences (theme, language) | localStorage |
| Cart data | localStorage (Zustand persist) |
| Checkout step | sessionStorage |
| Auth session | Cookie (set by server — not localStorage) |
| Large offline data | IndexedDB |

---

## Security Warning

```javascript
// NEVER DO THIS — auth tokens don't go in localStorage
localStorage.setItem('authToken', 'abc123')  // ❌ Can be stolen via XSS attack

// CORRECT — Session cookie (HttpOnly) — JavaScript can't access it
// The server sets this automatically
```

---

## Next Doc

`34-caching-cdn.md` — **CDN** — what it is, how to deliver ShopKaro's images and static files fast to the whole world.
