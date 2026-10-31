# 42 — Pagination vs Infinite Scroll: Which When?

> Previous doc covered lazy loading and skeletons.
> Now **Pagination vs Infinite Scroll** — how to efficiently show 500 products.

---

## Problem — Can't Show Everything at Once

ShopKaro has 500 products. Loading all at once:
- 500 database rows fetched at once
- 500 image requests
- Page hangs → Slow → User bounces

Solution: **Load a little at a time.**

---

## Option 1 — Pagination

Divide into pages — Page 1, Page 2, Page 3...

```
[Page 1] 1-12 products    → [Next →]
[Page 2] 13-24 products   → [← Prev] [Next →]
[Page 3] 25-36 products   → [← Prev]
```

**Backend:**
```javascript
// /app/api/products/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 12

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip: (page - 1) * limit,  // Page 2 → skip 12, Page 3 → skip 24
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.product.count()
  ])

  return Response.json({
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
}
```

**Frontend:**
```jsx
function ProductsPage() {
  const [page, setPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['products', page],
    queryFn: () => fetch(`/api/products?page=${page}`).then(r => r.json())
  })

  return (
    <div>
      <div className="products-grid">
        {data?.products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* Pagination Controls */}
      <div>
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          ← Prev
        </button>
        <span>Page {page} of {data?.pagination.totalPages}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page === data?.pagination.totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
```

---

## Option 2 — Infinite Scroll

Scroll → automatically load more.

```
[12 products]
↓ scroll
[12 more loaded]
↓ scroll
[12 more loaded]
```

**When to use:**
- Social media feed (Instagram, Twitter)
- Discovery browsing — user isn't looking for something specific

**Limitation:** User can't easily go back. "That product was on page 47" — keep scrolling.

---

## For ShopKaro — Which One?

**Products listing → Pagination** ✓

Why:
- User is looking for a specific product (Nike Shoes, size 10)
- Uses filters/search
- "It was on page 3" — can bookmark via URL
- Better for SEO — separate pages

**Infinite scroll when:** "Browse, let's see what's there" type experience — common in fashion apps.

---

## Performance Umbrella — Complete

```
PERFORMANCE
│
├── Images          → Doc 40 ✓
├── Lazy Loading    → Doc 41 ✓
└── Pagination      → Doc 42 ✓ (THIS)
```

---

## Next Doc

`43-accessibility-what-is-it.md` — Tenth umbrella — **Accessibility**. ShopKaro isn't just for "normal" users — keyboard users, screen reader users, color blind users — it should work for everyone.
