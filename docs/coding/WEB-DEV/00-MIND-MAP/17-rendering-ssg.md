# 17 — SSG: Static Site Generation

> Previous doc covered SSR — server renders on every request.
> Now **SSG** — the fastest strategy. HTML is already built.

---

## What Is SSG

**Static Site Generation** — HTML gets built **at build time** — before deploying.

```
BUILD TIME (once, when you deploy):
Next.js → Builds HTML from data → Saves files

WHEN PRIYA ARRIVES:
Priya → Server → "homepage.html" file directly → Done
```

The server does no processing — it hands over the file directly. That's why it's **very fast**.

---

## When SSG Is Right

Only when content is **the same for everyone** and **doesn't change frequently**.

```
Homepage → SSG ✓
  "ShopKaro — Best Deals Online" — same for everyone

About page → SSG ✓
  Company info — doesn't change often

Blog post → SSG ✓
  Written once — everyone reads it

Product listing → SSG? ← Think about it
  New products can arrive every hour — would go stale
```

---

## Where to Use SSG in ShopKaro

```
Homepage → SSG ✓
  Show featured products — rebuild once a day

/about → SSG ✓
  Static content

/contact → SSG ✓
  Static content

Category pages (/products/shoes) → Debatable
  If products don't change much → SSG + Revalidation
  If real-time needed → SSR
```

---

## SSG in Next.js

In Next.js App Router — if a component isn't async and uses no dynamic data → automatically SSG:

```jsx
// /app/about/page.jsx — automatically SSG
export default function AboutPage() {
  return (
    <div>
      <h1>About ShopKaro</h1>
      <p>We provide the best deals...</p>
    </div>
  )
}
```

---

## ISR — The Smart Version of SSG

**ISR (Incremental Static Regeneration)** — SSG + automatic refresh.

```jsx
// This page will be fast like SSG
// but regenerates every 60 seconds
export const revalidate = 60  // seconds

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true }
  })
  return <div>{/* products */}</div>
}
```

Advantage:
- Users get fast load (cached HTML)
- Data refreshes every 60 seconds

For ShopKaro's homepage → **ISR with revalidate = 3600** (1 hour) is perfect.

---

## Three Strategies Summary

| | SSG | ISR | SSR | CSR |
|--|-----|-----|-----|-----|
| Speed | Fastest | Fast | Medium | Medium |
| Data freshness | Build time | Configurable | Real-time | Real-time |
| SEO | Best | Best | Good | Poor |
| Server load | None | Low | High | Low |
| Best for | Static content | Semi-dynamic | Dynamic + SEO | Interactive |

---

## Next Doc

`18-rendering-shopkaro.md` — Now decide for every ShopKaro page — which strategy and why. This is a reference doc — useful while building the project.