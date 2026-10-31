# 10 — Architecture: What Is the Umbrella

> Authentication is done — from bcrypt to Clerk.
> Now the second big umbrella — **Architecture**.
> This decides how your project is organized internally.

---

## What Is Architecture

When you build a project — there are files and folders. The question is:

- Which file goes where?
- Should the login logic be written in the same file as the UI, or separately?
- Which file talks to the database?
- If a new developer joins tomorrow, can they understand it without asking?

**Architecture** answers these questions — a **structure** or **pattern** that says where the code goes.

---

## What's Inside the Architecture Umbrella

```
ARCHITECTURE
│
├── MVC Pattern
│   → Divide code into 3 parts: Model, View, Controller
│
├── Folder Structure
│   → Where files go in Next.js
│
└── BFF Layer (Backend For Frontend)
    → Do you need a separate backend, or are Next.js API routes enough?
```

---

## Why Is It Necessary?

In a todo app, you can write everything in a single file — it's a 50-line app.

In ShopKaro:
- 10+ pages
- 20+ API endpoints
- Database models
- Authentication logic
- Payment logic
- Email logic

If you put everything in one place — 3 months later, even you won't understand what you wrote.

---

## A Simple Example — The Problem Without Architecture

```javascript
// /app/products/page.jsx — WRONG WAY
// Everything in one file

export default async function ProductsPage() {
  // Database directly here
  const db = new PrismaClient()
  const products = await db.product.findMany()

  // Auth check here too
  const session = await getSession()
  if (!session) redirect('/login')

  // Business logic here too
  const discountedProducts = products.map(p => ({
    ...p,
    price: p.price * 0.9  // 10% discount
  }))

  return <div>{/* UI */}</div>
}
```

Problem: Database logic, auth logic, business logic, UI — all in one place. Change one thing — read the whole file.

---

## What Architecture Changes

```
/app/products/page.jsx      → Only UI
/app/api/products/route.js  → Only API
/lib/products.js            → Business logic
/lib/db/products.js         → Database queries
```

Each file has one job. Easy to find, easy to change.

---

## ShopKaro's Architecture — Overview

```
FRONTEND (What the user sees):
/app/(pages)          → React pages — UI only

BACKEND (API):
/app/api/             → API routes — request handling

BUSINESS LOGIC:
/lib/                 → Pure functions — no framework dependency

DATABASE:
/prisma/              → Schema and queries

SHARED:
/components/          → Reusable UI pieces
/types/               → TypeScript types (if you use them)
```

---

## What's Ahead

We'll cover all three parts separately:

- **Doc 11** → What is the MVC pattern and how it applies in Next.js
- **Doc 12** → Folder structure — ShopKaro's actual file tree
- **Doc 13** → BFF layer — when do you need a separate backend, when are Next.js API routes enough?

---

## Next Doc

`11-architecture-mvc.md` — What is MVC? Model, View, Controller — what are these three? How exactly does it look in Next.js? We'll understand with a concrete ShopKaro example.