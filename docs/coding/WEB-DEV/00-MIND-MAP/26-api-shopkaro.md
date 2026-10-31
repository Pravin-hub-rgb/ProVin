# 26 — ShopKaro: Complete API Reference

> Previous docs covered REST and GraphQL concepts.
> Now all of ShopKaro's **endpoints** — a reference doc.
> Check here while building the project.

---

## Auth Endpoints

### POST `/api/auth/signup`
```
Request:  { email, password, name }
Response: { message: "Account created", user: { id, email, name } }
Errors:   400 (email already exists), 400 (invalid data)
```

### POST `/api/auth/login`
```
Request:  { email, password }
Response: { message: "Login successful", user: { id, email, name } }
Errors:   401 (wrong credentials), 403 (email not verified)
```

### POST `/api/auth/logout`
```
Request:  (session in cookie)
Response: { message: "Logged out" }
```

### POST `/api/auth/forgot-password`
```
Request:  { email }
Response: { message: "Reset email sent" }
Note:     Same message even if email doesn't exist — for security
```

### POST `/api/auth/reset-password`
```
Request:  { token, newPassword }
Response: { message: "Password updated" }
Errors:   400 (invalid/expired token)
```

### POST `/api/auth/verify-email`
```
Request:  { token }
Response: { message: "Email verified" }
Errors:   400 (invalid/expired token)
```

---

## Product Endpoints

### GET `/api/products`
```
Query params:
  ?category=shoes
  ?search=nike
  ?minPrice=500&maxPrice=5000
  ?page=1&limit=12
  ?sort=price_asc | price_desc | newest

Response: {
  products: [...],
  total: 100,
  page: 1,
  totalPages: 9
}
```

### GET `/api/products/:id`
```
Response: {
  id, name, description, price, stock,
  imageUrl, slug, featured,
  category: { id, name, slug }
}
Errors: 404 (not found)
```

---

## Cart Endpoints (Auth Required)

### GET `/api/cart`
```
Response: {
  items: [
    {
      id, quantity,
      product: { id, name, price, imageUrl, stock }
    }
  ],
  total: 5998
}
```

### POST `/api/cart`
```
Request:  { productId, quantity }
Response: { message: "Added to cart", item: {...} }
Errors:   400 (insufficient stock), 401 (not logged in)
```

### PATCH `/api/cart/:itemId`
```
Request:  { quantity }
Response: { message: "Updated", item: {...} }
Errors:   400 (quantity > stock)
```

### DELETE `/api/cart/:itemId`
```
Response: { message: "Removed" }
```

---

## Order Endpoints (Auth Required)

### GET `/api/orders`
```
Response: {
  orders: [
    {
      id, status, total, createdAt,
      items: [{ product: { name, imageUrl }, quantity, price }]
    }
  ]
}
```

### GET `/api/orders/:id`
```
Response: {
  id, status, total, address, createdAt, paymentId,
  items: [...],
  user: { name, email }
}
Errors: 403 (trying to access someone else's order), 404
```

### POST `/api/orders`
```
Request:  { address }
Process:
  1. Fetch cart items
  2. Check stock
  3. Create order
  4. Clear cart
  5. Initiate payment
Response: { orderId, paymentData: { razorpayOrderId, amount, currency } }
Errors:   400 (cart empty), 400 (out of stock)
```

---

## Payment Endpoints

### POST `/api/payments/verify`
```
Request:  { razorpayOrderId, razorpayPaymentId, razorpaySignature }
Process:
  1. Verify signature
  2. Update order status → PAID
  3. Update stock
Response: { message: "Payment successful", orderId }
Errors:   400 (invalid signature)
```

### POST `/api/webhooks/razorpay`
```
Comes automatically from Razorpay when payment happens
Process: Verify signature → Update order
Note: This is a backup — in case user closes browser after payment
```

---

## Common Response Patterns

### Success:
```json
{ "message": "...", "data": {...} }
```

### Error:
```json
{ "error": "What went wrong", "details": "Optional" }
```

### Pagination:
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 12,
    "totalPages": 9
  }
}
```

---

## API Umbrella — Complete

```
API DESIGN
│
├── REST          → Doc 24 ✓
├── GraphQL       → Doc 25 ✓
└── ShopKaro APIs → Doc 26 ✓ (THIS)
```

---

## Next Doc

`27-state-what-is-it.md` — Sixth big umbrella — **State Management**. This topic confuses many beginners. Zustand, Context, useState — when to use which and why — full clarity here.