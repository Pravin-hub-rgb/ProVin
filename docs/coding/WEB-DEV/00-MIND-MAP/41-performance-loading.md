# 41 — Lazy Loading & Skeleton Screens

> Previous doc covered image optimization — Next.js Image component.
> Now **Lazy Loading and Skeleton Screens** — perceived performance tricks.

---

## What Is Lazy Loading

**Lazy Loading** = only load what the user is currently looking at.

```
Product listing page — 50 products

Without lazy load:
Page opens → All 50 product images load → Slow

With lazy load:
Page opens → Only the 8 images visible on screen load
Priya scrolls → Next 8 load
Scroll more → More load
```

Saves network bandwidth — feels fast.

---

## Lazy Loading in Next.js — Automatic

```jsx
// Next.js Image → lazy loads by default
<Image src="..." alt="..." width={300} height={300} />
// Loads only when it enters the viewport

// For regular components — dynamic import
import dynamic from 'next/dynamic'

// This component loads only when needed
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>Loading chart...</div>
})
```

---

## Skeleton Screens — Better Loading UI

When data is loading — **don't show a blank screen or a spinning loader.**

Show a skeleton screen — gray placeholders shaped like the actual content.

```jsx
// /components/ProductCardSkeleton.jsx
export default function ProductCardSkeleton() {
  return (
    <div className="product-card skeleton">
      {/* Gray animated placeholders */}
      <div style={{
        width: '100%',
        height: '250px',
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        animation: 'pulse 1.5s infinite'
      }} />
      <div style={{
        width: '70%',
        height: '20px',
        backgroundColor: '#e0e0e0',
        margin: '12px 0 8px',
        borderRadius: '4px'
      }} />
      <div style={{
        width: '40%',
        height: '16px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px'
      }} />
    </div>
  )
}
```

```jsx
// Use in product listing
function ProductsPage() {
  const { data: products, isLoading } = useQuery(...)

  if (isLoading) {
    // Show skeleton instead of real product cards
    return (
      <div className="products-grid">
        {Array(8).fill(0).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="products-grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
```

---

## Next.js loading.jsx — Built-in Skeleton Support

In the Next.js App Router — create a `loading.jsx` file, it gets used automatically:

```jsx
// /app/products/loading.jsx
// This shows automatically while the products page loads

export default function ProductsLoading() {
  return (
    <div className="products-grid">
      {Array(8).fill(0).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
```

---

## Suspense — Component-Level Loading

```jsx
import { Suspense } from 'react'

function ProductPage() {
  return (
    <div>
      <h1>Product</h1>
      <Suspense fallback={<div>Loading reviews...</div>}>
        <ReviewsSection />  {/* This is slow → loads separately */}
      </Suspense>
    </div>
  )
}
```

The page is ready — reviews load separately. The user can use the page.

---

## Next Doc

`42-performance-lists.md` — **Pagination vs Infinite Scroll** — don't show 500 products at once. Which approach is right when.
