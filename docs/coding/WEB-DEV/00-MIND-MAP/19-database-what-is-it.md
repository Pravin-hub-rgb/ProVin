# 19 — Database: What Is It

> Rendering is complete — SSG, SSR, CSR, ShopKaro decisions.
> Now the fourth big umbrella — **Database**.
> Where and how will data be stored permanently?

---

## Why a Database Is Needed

When Priya closes ShopKaro and comes back — her account, orders, everything should still be there.

This is possible because everything is **stored permanently in the database**.

Store in server memory (RAM) → Server restarts → Everything gone.
Store in database → Always there.

---

## What's Inside the Database Umbrella

```
DATABASE
│
├── SQL vs NoSQL (PostgreSQL vs MongoDB)
│   → Which type to choose
│
├── Prisma (ORM)
│   → How to talk to the database from JavaScript
│
└── Data Models
    → How ShopKaro's data will be structured
    → User, Product, Order, Cart tables
```

---

## Two Types — SQL and NoSQL

### SQL Database (PostgreSQL, MySQL)
Data lives in **tables** — rows and columns.

```
Users Table:
id | email              | password      | createdAt
---|--------------------|-----------    |----------
1  | priya@gmail.com    | $2b$10$...   | 2024-01-01
2  | rahul@gmail.com    | $2b$10$...   | 2024-01-02

Products Table:
id | name          | price  | stock
---|---------------|--------|------
1  | Nike Shoes    | 2999   | 50
2  | Adidas Cap    | 999    | 100
```

Tables can be **related** to each other — hence "Relational Database."

---

### NoSQL Database (MongoDB)
Data lives in **documents** — JSON-like.

```javascript
// MongoDB document
{
  _id: "64a1b2c3",
  email: "priya@gmail.com",
  password: "$2b$10$...",
  orders: [
    { productId: "64a1b2c4", quantity: 1 }
  ]
}
```

Flexible — each document can have a different structure.

---

## Why PostgreSQL for ShopKaro?

ShopKaro's data is **structured and related**:

```
User → Order (one user has many orders)
Order → Product (one order has many products)
Product → Category (one product belongs to one category)
```

These relationships are handled very cleanly in SQL.

**Choose PostgreSQL when:**
- The data structure is known beforehand (User, Product, Order)
- There are relationships between data
- Data must stay consistent (payment data must not be inconsistent)

**Choose MongoDB when:**
- The data schema changes frequently
- A very flexible structure is needed
- Document-style data (blog posts, user profiles with varying fields)

ShopKaro → **PostgreSQL.**

---

## Next Doc

`20-database-sql-vs-nosql.md` — A bit more depth on SQL vs NoSQL — when to pick what, and how PostgreSQL will be set up in ShopKaro.