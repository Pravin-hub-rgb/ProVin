# 21 — Prisma: Talking to the Database from JavaScript

> Previous doc chose PostgreSQL.
> Now **Prisma** — how to talk to the database.
> What an ORM is and how Prisma works.

---

## Problem — Writing Raw SQL Is Hard

To talk to the database you had to write SQL:

```sql
SELECT users.email, orders.id, orders.status
FROM users
JOIN orders ON users.id = orders.userId
WHERE users.id = 1
AND orders.status = 'paid'
ORDER BY orders.createdAt DESC;
```

This works — but:
- Unfamiliar syntax for JavaScript developers
- Typo → Runtime error
- Complex queries → Very long
- Change database (PostgreSQL → MySQL) → Rewrite all SQL

---

## Solution — ORM (Prisma)

**ORM (Object Relational Mapper)** — write in JavaScript, it converts to SQL.

```javascript
// Same query — in JavaScript with Prisma
const ordersWithUser = await prisma.order.findMany({
  where: {
    userId: 1,
    status: 'paid'
  },
  orderBy: {
    createdAt: 'desc'
  },
  include: {
    user: true
  }
})
```

Same result — but JavaScript. You get autocomplete, and type errors get caught.

---

## Prisma's Schema — Defining Database Structure

In Prisma there's a `schema.prisma` file where tables are defined:

```prisma
// prisma/schema.prisma

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?  // ? means optional
  createdAt DateTime @default(now())

  orders    Order[]  // One user has many orders
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Float
  stock       Int      @default(0)
  imageUrl    String?
  createdAt   DateTime @default(now())

  orderItems  OrderItem[]
}

model Order {
  id        Int         @id @default(autoincrement())
  userId    Int
  status    String      @default("pending")  // pending, paid, shipped, delivered
  address   String
  total     Float
  createdAt DateTime    @default(now())

  user      User        @relation(fields: [userId], references: [id])
  items     OrderItem[]
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  price     Float   // Price at time of purchase — important!

  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}
```

---

## Creating the Database from Schema

```bash
# Create database tables from schema
npx prisma migrate dev --name init

# This does:
# 1. Creates SQL migration file
# 2. Creates tables in database
# 3. Generates Prisma Client
```

---

## Prisma Client — How to Query

```javascript
// /lib/db/prisma.js — Create instance once, use everywhere
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default prisma
```

### Common Queries:

```javascript
import prisma from '@/lib/db/prisma'

// CREATE — Create new user
const user = await prisma.user.create({
  data: {
    email: "priya@gmail.com",
    password: hashedPassword,
    name: "Priya Sharma"
  }
})

// READ — Find user
const user = await prisma.user.findUnique({
  where: { email: "priya@gmail.com" }
})

// READ — All products
const products = await prisma.product.findMany({
  where: { stock: { gt: 0 } },  // gt = greater than
  orderBy: { createdAt: 'desc' },
  take: 10  // Only 10
})

// UPDATE — Change order status
const order = await prisma.order.update({
  where: { id: 1 },
  data: { status: "paid" }
})

// DELETE
await prisma.user.delete({
  where: { id: 1 }
})
```

---

## Querying With Relations

```javascript
// Order with user and items also needed
const order = await prisma.order.findUnique({
  where: { id: 1 },
  include: {
    user: true,          // Get user data too
    items: {
      include: {
        product: true    // Product for each item too
      }
    }
  }
})

// Result:
// order.user.email
// order.items[0].product.name
// order.items[0].quantity
```

---

## Summary

| | |
|--|--|
| **What an ORM is** | Write in JavaScript, convert to SQL |
| **Prisma schema** | Define tables and relations |
| **Migration** | Create actual database tables from schema |
| **Prisma Client** | Type-safe queries from JavaScript |

---

## Next Doc

`22-database-models.md` — ShopKaro's complete data model — User, Product, Order, Cart — all together. Why each field exists, how relations work — the full picture.