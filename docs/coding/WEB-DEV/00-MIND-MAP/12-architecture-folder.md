# 12 — Folder Structure: ShopKaro's File Tree

> In the previous doc we understood the MVC pattern — View, Controller, Model.
> Now that theory in practice — **ShopKaro's actual folder structure.**

---

## ShopKaro's Complete Folder Structure

```
shopkaro/
│
├── /app                          → Next.js App Router — everything is here
│   │
│   ├── layout.jsx                → Root layout — wrapper around every page
│   ├── page.jsx                  → Homepage (/)
│   │
│   ├── /(auth)                   → Auth pages — grouped, separate layout
│   │   ├── layout.jsx            → Layout for auth pages (simple, no navbar)
│   │   ├── /login/page.jsx       → Login page (/login)
│   │   ├── /signup/page.jsx      → Signup page (/signup)
│   │   └── /forgot-password/page.jsx
│   │
│   ├── /products                 → Products section
│   │   ├── page.jsx              → Product listing (/products)
│   │   └── /[id]/page.jsx        → Product detail (/products/123)
│   │
│   ├── /cart                     → Cart page (/cart)
│   │   └── page.jsx
│   │
│   ├── /checkout                 → Checkout (/checkout)
│   │   └── page.jsx
│   │
│   ├── /orders                   → Order history (/orders)
│   │   ├── page.jsx              → All orders
│   │   └── /[id]/page.jsx        → Single order detail
│   │
│   ├── /profile                  → User profile (/profile)
│   │   └── page.jsx
│   │
│   └── /api                      → Backend API routes
│       ├── /auth
│       │   ├── /login/route.js   → POST /api/auth/login
│       │   ├── /signup/route.js  → POST /api/auth/signup
│       │   ├── /logout/route.js  → POST /api/auth/logout
│       │   └── /reset-password/route.js
│       │
│       ├── /products
│       │   ├── route.js          → GET /api/products (list)
│       │   └── /[id]/route.js    → GET /api/products/123 (single)
│       │
│       ├── /cart
│       │   └── route.js          → GET, POST, DELETE /api/cart
│       │
│       └── /orders
│           ├── route.js          → GET, POST /api/orders
│           └── /[id]/route.js    → GET /api/orders/123
│
├── /components                   → Reusable UI pieces
│   ├── /ui                       → Generic components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   ├── /layout                   → Layout components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── ProductCard.jsx           → Card for one product
│   ├── CartItem.jsx              → One item in the cart
│   └── OrderSummary.jsx          → Order summary UI
│
├── /lib                          → Business logic + utilities
│   ├── /db                       → Database related
│   │   ├── prisma.js             → Prisma client instance
│   │   ├── products.js           → Product DB queries
│   │   ├── orders.js             → Order DB queries
│   │   └── users.js              → User DB queries
│   ├── /auth                     → Auth utilities
│   │   ├── session.js            → Session config
│   │   ├── hash.js               → bcrypt functions
│   │   └── email.js              → Email sending
│   └── utils.js                  → Generic helper functions
│
├── /prisma                       → Database schema
│   ├── schema.prisma             → Define data models
│   └── /migrations               → DB change history (auto-generated)
│
├── /public                       → Static files
│   ├── /images                   → Static images
│   └── favicon.ico
│
├── /types                        → TypeScript types (if you use them)
│   └── index.ts
│
├── .env                          → Secret keys — NEVER put this in git
├── .env.example                  → Example env file — put this in git
├── .gitignore                    → Add .env here
├── next.config.js
└── package.json
```

---

## A Few Important Things Explained

### (auth) — Why Parentheses?

```
/(auth)/login/page.jsx    → URL: /login (parentheses don't appear in the URL)
```

Folders with parentheses are **Route Groups** in Next.js — only for grouping, they don't appear in the URL. Benefit: you can give them a different layout.

---

### /lib Folder — What Goes Here?

```
/lib holds things that:
✓ Any part can use (both API and pages)
✓ Are framework-independent (no req, no res)
✓ Are easy to test
```

```javascript
// /lib/db/products.js — CORRECT here
export async function getProductById(id) {
  return prisma.product.findUnique({ where: { id } })
}

// /app/api/products/[id]/route.js — CORRECT here
import { getProductById } from '@/lib/db/products'
export async function GET(req, { params }) {
  const product = await getProductById(params.id)
  return Response.json(product)
}
```

---

### .env File — What's in It?

```bash
# .env — NEVER put this in git

DATABASE_URL="postgresql://..."
SESSION_SECRET="a-very-long-random-string"
RESEND_API_KEY="re_..."
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."
```

These are **secrets** — API keys, database passwords. If they go on GitHub, anyone can misuse them.

Create a `.env.example` file with only the keys, no values:
```bash
# .env.example — put this in git
DATABASE_URL=
SESSION_SECRET=
RESEND_API_KEY=
```

---

## Summary

| Folder | What Goes In |
|--------|--------------|
| `/app/(pages)` | UI — React pages |
| `/app/api` | Backend — API routes |
| `/components` | Reusable UI pieces |
| `/lib` | Business logic, DB queries |
| `/prisma` | Database schema |
| `.env` | Secret keys — not in git |

---

## Next Doc

`13-architecture-bff.md` — One last architecture concept — **BFF (Backend For Frontend)**. ShopKaro uses Next.js API routes — when do you need a separate backend? When are Next.js API routes enough? We'll understand that decision.