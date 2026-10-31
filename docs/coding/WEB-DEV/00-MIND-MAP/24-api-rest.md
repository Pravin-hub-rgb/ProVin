# 24 — REST: The Most Common API Design Style

> Previous doc gave the API umbrella overview.
> Now **REST** — ShopKaro will use this.

---

## What Is REST

**REST (Representational State Transfer)** — a set of conventions that says how to name and structure API endpoints.

In REST, everything is a **resource** — and you act on resources using HTTP methods.

```
Resource: products
Actions:  GET (list), GET (single), POST (create), PUT (update), DELETE
```

---

## REST URL Conventions

### Pattern: `/api/resource` and `/api/resource/:id`

```
GET    /api/products          → List of all products
GET    /api/products/123      → Detail of product 123
POST   /api/products          → Create new product
PUT    /api/products/123      → Update product 123
DELETE /api/products/123      → Delete product 123
```

### Nested Resources:

```
GET    /api/orders/5/items    → All items of order 5
POST   /api/orders/5/items    → Add item to order 5
```

---

## ShopKaro's REST Endpoints

### Auth:
```
POST   /api/auth/signup            → Register
POST   /api/auth/login             → Login
POST   /api/auth/logout            → Logout
POST   /api/auth/forgot-password   → Send reset email
POST   /api/auth/reset-password    → Set new password
POST   /api/auth/verify-email      → Verify email
```

### Products:
```
GET    /api/products               → List (with filters)
GET    /api/products/:id           → Single product
```

### Cart:
```
GET    /api/cart                   → Logged-in user's cart
POST   /api/cart                   → Add item
PATCH  /api/cart/:itemId           → Update quantity
DELETE /api/cart/:itemId           → Remove item
```

### Orders:
```
GET    /api/orders                 → User's orders list
GET    /api/orders/:id             → Single order detail
POST   /api/orders                 → Create new order
```

### Payments:
```
POST   /api/payments/create        → Initiate payment
POST   /api/payments/verify        → Verify payment (Razorpay callback)
POST   /api/webhooks/razorpay      → Razorpay webhook
```

---

## Request and Response — What They Look Like

### POST /api/auth/login — Request:
```json
{
  "email": "priya@gmail.com",
  "password": "mypassword123"
}
```

### Success Response (200):
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "priya@gmail.com",
    "name": "Priya Sharma"
  }
}
```

### Error Response (401):
```json
{
  "error": "Invalid email or password"
}
```

---

## REST in Next.js — Route Handler

```javascript
// /app/api/products/route.js

// GET /api/products
export async function GET(request) {
  // Get query params from URL
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')  // /api/products?category=shoes

  const products = await prisma.product.findMany({
    where: category ? { category: { slug: category } } : {},
    include: { category: true }
  })

  return Response.json(products)
}
```

```javascript
// /app/api/products/[id]/route.js

// GET /api/products/123
export async function GET(request, { params }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  return Response.json(product)
}
```

---

## One Limitation of REST

REST has one problem — **over-fetching and under-fetching**:

```
Frontend needs: Only product name and price
REST returns: Entire product — name, price, description, stock, imageUrl, etc.
→ Over-fetching

Frontend needs: Product + seller info in one go
REST: Need to make 2 separate requests
→ Under-fetching
```

GraphQL solves this — next doc.

---

## Summary

| | |
|--|--|
| **What REST is** | Manage resources via URL + HTTP Method |
| **Naming convention** | `/api/resource`, `/api/resource/:id` |
| **In ShopKaro** | All endpoints in REST style |

---

## Next Doc

`25-api-graphql.md` — REST's alternative — **GraphQL**. What it is, when it's better than REST, and whether ShopKaro should use it.