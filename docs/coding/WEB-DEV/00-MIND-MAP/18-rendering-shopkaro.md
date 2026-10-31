# 18 — ShopKaro: Rendering Strategy Per Page

> Previous three docs covered CSR, SSR, SSG.
> Now decide for every ShopKaro page — which strategy and why.
> This is a **reference doc** — useful while building the project.

---

## ShopKaro Pages — Complete Decision Table

| Page | URL | Strategy | Why |
|------|-----|----------|-----|
| Homepage | `/` | SSG + ISR | Same for everyone, fast load needed |
| Products listing | `/products` | SSR | SEO needed, filters real-time |
| Product detail | `/products/[id]` | SSR | Stock real-time, SEO important |
| Cart | `/cart` | CSR | Private, fast interactions |
| Checkout | `/checkout` | CSR | Heavy user interactions |
| Orders list | `/orders` | SSR | Auth required, fresh data |
| Order detail | `/orders/[id]` | SSR | Fresh status needed |
| Profile | `/profile` | CSR | Private, user edits |
| Login / Signup | `/login`, `/signup` | SSG | Static forms, fast load |
| About / Contact | `/about` | SSG | Static content |

---

## Each Page In Detail

### Homepage `/` — SSG + ISR

```jsx
// /app/page.jsx

export const revalidate = 3600  // Rebuild every 1 hour

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 8
  })

  return (
    <div>
      <HeroBanner />
      <FeaturedProducts products={featuredProducts} />
    </div>
  )
}
```

**Why SSG+ISR:** Homepage is the most visited — speed is critical. Featured products don't change daily — 1 hour cache is fine.

---

### Product Detail `/products/[id]` — SSR

```jsx
// /app/products/[id]/page.jsx

export default async function ProductPage({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!product) notFound()  // 404 page

  return (
    <div>
      <h1>{product.name}</h1>
      <p>₹{product.price}</p>
      <p>{product.stock > 0 ? `${product.stock} left` : 'Out of stock'}</p>
      <AddToCartButton productId={product.id} />  {/* CSR component */}
    </div>
  )
}
```

**Why SSR:** Stock needs real-time display. For SEO, product name and description must be indexed by Google. The "Add to Cart" button is a CSR component — can be mixed into the page.

---

### Cart `/cart` — CSR

```jsx
// /app/cart/page.jsx
'use client'

import { useCartStore } from '@/store/cartStore'  // Zustand — covered later

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore()

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}
```

**Why CSR:** Cart needs +/- buttons, remove — all should be instant. Private page — no SEO needed. State lives in Zustand (covered later).

---

### Login Page `/login` — SSG

```jsx
// /app/(auth)/login/page.jsx
// No async, no data fetch → automatic SSG

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />  {/* This will be a 'use client' component — for form handling */}
    </div>
  )
}
```

**Why SSG:** The form is static — same for everyone. Fast load needed — users land here first.

---

## Mixing — SSR Page + CSR Component

A page can have both:

```
Product Page (SSR):
  - Product info, stock → Fetched from server (SSR)
  - "Add to Cart" button → Works in client (CSR component)
  - Reviews section → Fetched from server (SSR)
  - "Write Review" form → Client (CSR component)
```

```jsx
// /app/products/[id]/page.jsx — SSR page
export default async function ProductPage({ params }) {
  const product = await getProductById(params.id)  // On server

  return (
    <div>
      <h1>{product.name}</h1>
      {/* This is a CSR component — 'use client' inside */}
      <AddToCartButton productId={product.id} stock={product.stock} />
    </div>
  )
}
```

```jsx
// /components/AddToCartButton.jsx — CSR component
'use client'

export default function AddToCartButton({ productId, stock }) {
  function handleAdd() {
    // Add to cart — using Zustand
  }

  return (
    <button onClick={handleAdd} disabled={stock === 0}>
      {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </button>
  )
}
```

This mixing is **normal** — happens in almost every Next.js app.

---

## Rendering Umbrella — Complete

```
RENDERING
│
├── CSR  → Doc 15 ✓
├── SSR  → Doc 16 ✓
├── SSG  → Doc 17 ✓
└── ShopKaro decisions → Doc 18 ✓ (THIS)
```

---

## Next Doc

`19-database-what-is-it.md` — Fourth big umbrella — **Database**. Where will data be stored permanently? What is PostgreSQL, how is it different from MongoDB, what does Prisma do — we'll understand all of it.