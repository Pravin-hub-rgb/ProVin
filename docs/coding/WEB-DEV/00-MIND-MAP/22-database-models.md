# 22 — Data Models: ShopKaro's Complete Schema

> Previous doc covered Prisma and ORM.
> Now ShopKaro's **complete data model** — every table, every field, why.
> This is a reference doc.

---

## ShopKaro's Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── USER ───────────────────────────────────────────

model User {
  id               Int       @id @default(autoincrement())
  email            String    @unique
  password         String
  name             String?
  emailVerified    Boolean   @default(false)
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  // Relations
  orders           Order[]
  cart             CartItem[]
  verifyTokens     EmailVerificationToken[]
  resetTokens      PasswordResetToken[]
}

// ─── AUTH TOKENS ────────────────────────────────────

model EmailVerificationToken {
  id        Int      @id @default(autoincrement())
  userId    Int
  token     String   @unique
  expiresAt DateTime
  user      User     @relation(fields: [userId], references: [id])
}

model PasswordResetToken {
  id        Int      @id @default(autoincrement())
  userId    Int
  token     String   @unique
  expiresAt DateTime
  used      Boolean  @default(false)
  user      User     @relation(fields: [userId], references: [id])
}

// ─── PRODUCT ────────────────────────────────────────

model Category {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  slug     String    @unique  // "mens-shoes" — used in URL
  products Product[]
}

model Product {
  id          Int       @id @default(autoincrement())
  name        String
  description String?
  price       Float
  stock       Int       @default(0)
  imageUrl    String?
  slug        String    @unique  // "nike-air-max-2024" — in URL
  featured    Boolean   @default(false)
  categoryId  Int
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Relations
  category    Category   @relation(fields: [categoryId], references: [id])
  orderItems  OrderItem[]
  cartItems   CartItem[]
}

// ─── CART ───────────────────────────────────────────

model CartItem {
  id        Int     @id @default(autoincrement())
  userId    Int
  productId Int
  quantity  Int     @default(1)

  user      User    @relation(fields: [userId], references: [id])
  product   Product @relation(fields: [productId], references: [id])

  @@unique([userId, productId])  // One user, one product, once in cart
}

// ─── ORDER ──────────────────────────────────────────

model Order {
  id              Int         @id @default(autoincrement())
  userId          Int
  status          OrderStatus @default(PENDING)
  address         String
  total           Float
  paymentId       String?     // Razorpay payment ID
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  user            User        @relation(fields: [userId], references: [id])
  items           OrderItem[]
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  price     Float   // Price at time of purchase — product price can change later

  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}

// ─── ENUMS ──────────────────────────────────────────

enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
```

---

## Some Important Design Decisions

### Why `price` in OrderItem?
```
Product price was ₹2999 yesterday → Priya bought it
Today price became ₹3499

If price isn't stored in OrderItem → Order history shows wrong price
So store purchase-time price in OrderItem
```

### Why a separate cart table, not session?
```
Option 1: Cart in localStorage → Browser cleared = cart gone
Option 2: Cart in database → Priya adds on laptop, sees on phone → All there

ShopKaro → Cart in database (better experience)
```

### What is a slug?
```
Product name: "Nike Air Max 2024"
Slug: "nike-air-max-2024"

URL: /products/nike-air-max-2024  (readable)
vs
URL: /products/123  (not readable, bad SEO)
```

---

## Tables Relationship Map

```
User
 ├── CartItem (userId)
 ├── Order (userId)
 ├── EmailVerificationToken (userId)
 └── PasswordResetToken (userId)

Product
 ├── CartItem (productId)
 ├── OrderItem (productId)
 └── Category (categoryId)

Order
 └── OrderItem (orderId)
```

---

## Database Umbrella — Complete

```
DATABASE
│
├── SQL vs NoSQL        → Doc 20 ✓
├── Prisma (ORM)        → Doc 21 ✓
└── Data Models         → Doc 22 ✓ (THIS)
```

---

## Next Doc

`23-api-what-is-it.md` — Fifth big umbrella — **API Design**. How do frontend and backend talk? What is REST, how to build endpoints, what request/response looks like — we'll understand.