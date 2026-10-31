# 14 — Rendering: What Is It

> Architecture umbrella complete — MVC, Folders, BFF.
> Now the third big umbrella — **Rendering**.
> SSR, CSR, SSG — the confusion ends here.

---

## What Is Rendering

**Rendering** means — where and when the HTML page gets built.

When Priya opens `shopkaro.com/products` — an HTML page shows up in her browser. That HTML:
- Was it built on the server? Or in the browser?
- Was it built at request time? Or built beforehand?

The rendering strategy decides exactly this.

---

## Three Strategies — In One Line Each

| Strategy | Where HTML Is Built | When It's Built |
|----------|---------------------|-----------------|
| **SSG** — Static Site Generation | On the server | At build time — before deploy |
| **SSR** — Server Side Rendering | On the server | On every request — real-time |
| **CSR** — Client Side Rendering | In the browser | After JavaScript runs in the browser |

---

## Simple Comparison — Three Scenarios

### SSG — Built Beforehand

```
Build time (when deploying):
Server → Build HTML → Save files → "about.html", "homepage.html"

When Priya makes a request:
Priya → Server → "homepage.html" file directly → Done (very fast)
```

Same HTML for everyone — no real-time data.

---

### SSR — Built On Request

```
When Priya opens /products/123:
Priya → Server → Fetch product from DB → Build HTML → Send

Fresh HTML on every request — real-time data available
```

---

### CSR — Built In the Browser

```
Priya opens /cart:
Priya → Server → Send empty HTML + JavaScript
Browser runs JavaScript → Makes API call → Data arrives → Page shows
```

Blank page shows first — then data loads.

---

## What's Inside the Rendering Umbrella

```
RENDERING
│
├── SSG (Static Site Generation)   → Doc 17
├── SSR (Server Side Rendering)    → Doc 16
├── CSR (Client Side Rendering)    → Doc 15
└── Which strategy where in ShopKaro → Doc 18
```

---

## ShopKaro Quick Preview

| Page | Strategy | Why |
|------|----------|-----|
| Homepage | SSG | Same for everyone, fast load |
| /products | SSR | Products need real-time data |
| /products/[id] | SSR | Stock needs real-time display |
| /cart | CSR | Only Priya's data, fast interactions |
| /orders | SSR | Auth required, fresh data |

These decisions are covered in detail in Doc 18.

---

## Next Doc

`15-rendering-csr.md` — First **CSR** — Client Side Rendering. What you already do in React — fetching data with useState and useEffect — that's CSR. We start from familiar ground.