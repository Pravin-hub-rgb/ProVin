# 20 — SQL vs NoSQL: The Difference and When to Use What

> Previous doc gave the database umbrella overview.
> Now a bit more depth — **SQL vs NoSQL**, and PostgreSQL setup for ShopKaro.

---

## SQL's Core Concept — Relations

In SQL databases, data lives in tables, and tables are **connected** to each other.

In ShopKaro:

```
USERS table          ORDERS table              PRODUCTS table
id | email           id | userId | status      id | name  | price
---|-------          ---|--------|--------     ---|-------|------
1  | priya           1  | 1      | paid        1  | Shoes | 2999
2  | rahul           2  | 1      | pending     2  | Cap   | 999
                      3  | 2      | paid
```

Order 1 → userId: 1 → This is Priya's order.

This is a **foreign key** — one table points to another. Hence "Relational."

---

## NoSQL's Core Concept — Documents

In MongoDB, everything sits in one place:

```javascript
// Priya's complete data in one document
{
  id: "1",
  email: "priya@gmail.com",
  orders: [
    {
      id: "order1",
      status: "paid",
      items: [
        { productName: "Nike Shoes", price: 2999, quantity: 1 }
      ]
    }
  ]
}
```

Advantage — everything in one query.
Problem — if a product's price changes, you must update it everywhere.

---

## Practical Comparison — ShopKaro Scenario

**Scenario: Product price changes from ₹2999 to ₹3499**

**In SQL:**
```sql
UPDATE products SET price = 3499 WHERE id = 1;
-- Update in one place → reflects everywhere
```

**In MongoDB:**
```javascript
// Price is stored in every order document
// All must be updated — or inconsistency remains
db.users.updateMany(
  { "orders.items.productName": "Nike Shoes" },
  { $set: { "orders.$[].items.$[item].price": 3499 } }
)
// Complex and risky
```

SQL wins here — data in one place, consistency automatic.

---

## When to Choose What

| Situation | SQL (PostgreSQL) | NoSQL (MongoDB) |
|-----------|-----------------|-----------------|
| E-commerce, banking, orders | ✓ Best | ✗ |
| Social media posts, comments | Okay | ✓ Better |
| User profiles with fixed fields | ✓ | Okay |
| Real-time chat messages | Okay | ✓ Better |
| Product catalog with varying attributes | Okay | ✓ Better |
| Analytics, logs | Okay | ✓ Better |

ShopKaro → SQL / PostgreSQL.

---

## PostgreSQL Setup — In ShopKaro

### 1. Local Development

```bash
# Mac
brew install postgresql
brew services start postgresql

# Windows
# Download installer from PostgreSQL website
```

Or use **Neon** or **Supabase** — free cloud PostgreSQL, instant setup.

### 2. Connection String

```bash
# In .env
DATABASE_URL="postgresql://username:password@localhost:5432/shopkaro"

# If using Neon/Supabase, they provide the URL
DATABASE_URL="postgresql://user:pass@ep-xyz.neon.tech/shopkaro"
```

### 3. Connect Prisma

```bash
npx prisma init
# This creates /prisma/schema.prisma
```

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## Summary

| | SQL (PostgreSQL) | NoSQL (MongoDB) |
|--|-----------------|-----------------|
| Data structure | Tables + Relations | Documents (JSON) |
| Schema | Fixed — define first | Flexible |
| Consistency | Strong | Eventual |
| ShopKaro | ✓ Will use | — |

---

## Next Doc

`21-database-prisma.md` — Database chosen. Now **Prisma** — how to talk to the database from JavaScript. What an ORM is, how to write the schema, how to run queries — all of it.