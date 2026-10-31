# 39 — Performance: What Is the Umbrella

> Payments are complete — Razorpay, Webhooks.
> Now a new umbrella — **Performance**.
> Whether the app feels fast or slow decides whether the user stays or leaves.

---

## Why Performance Matters

One study found — **1 second delay = 7% drop in conversions.**

In e-commerce:
- ShopKaro is slow → Priya frustrated → Goes to competitor → Sale lost

Performance isn't just "nice to have" — it's **business critical**.

---

## What's Inside the Performance Umbrella

```
PERFORMANCE
│
├── Image Optimization        → Doc 40
├── Lazy Loading + Skeleton   → Doc 41
└── Pagination vs Infinite Scroll → Doc 42
```

---

## Common Culprits That Slow Down the App

Most relevant for ShopKaro:

```
1. Large images → Most common problem
   500KB image vs 50KB WebP — 10x difference

2. Loading all products at once → 500 products = slow
   Use pagination or infinite scroll

3. Large JavaScript bundle → Tree shaking, code splitting

4. Slow database query → Add indexes

5. Loading everything at once → Lazy load
```

---

## Perceived Performance vs Actual Performance

An interesting concept:

**Actual performance** — how many milliseconds it takes.

**Perceived performance** — how fast it **feels** to the user.

Skeleton loaders improve perceived performance:
```
Without skeleton: Blank screen → Suddenly content → Jarring
With skeleton:   Gray placeholder → Content → Smooth
```

Actual time may be the same — but it feels better.

---

## Next Doc

`40-performance-images.md` — **Images** — the easiest win. Automatic optimization, WebP, lazy loading — all in one component with Next.js Image.
