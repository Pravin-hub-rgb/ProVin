# 01 — Learn to Think: Before Starting a Project

> In the previous doc we saw what ShopKaro's full picture looks like.
> Now we'll understand how a senior dev **thinks** about any project — before writing any code.

---

## The Problem Right Now

Right now you do something like this:

```
Idea came → Opened VS Code → Started writing code
```

That's natural — beginners do exactly this. But the problem is that mid-way, a **wall** appears.

- "Where do I store this data?"
- "How do I handle login?"
- "How does cart data move from one page to another?"

And then you Google, copy something, and move on — but you never understand **why** it was done that way.

---

## What a Senior Dev Does

A senior dev's flow looks like this:

```
Idea came → Thinks (without code) → Then writes
```

This "thinking" roughly happens in 3 stages:

### Stage 1 — "What to build?" (Requirements)
### Stage 2 — "How to build?" (Design Decisions)
### Stage 3 — "Then build it" (Implementation)

Right now you jump straight to **Stage 3**. Stage 1 and 2 get skipped.

Let's understand all three with ShopKaro.

---

## Stage 1 — "What to build?"

In this stage, you only ask **questions** — answers come later.

**Questions for ShopKaro:**

```
USERS:
- Who will use it? (Buyers? Sellers? Admin?)
- Can anyone view products, or is login required?
- Can one user be both a seller and a buyer?

FEATURES:
- What should the user be able to do?
  - Browse products ✓
  - Add to cart ✓
  - Place order ✓
  - Make payment ✓
  - Track order ✓
  - Leave reviews? (maybe later)
  - Wishlist? (maybe later)

MUST HAVE vs NICE TO HAVE:
- Must: Login, Products, Cart, Order, Payment
- Nice: Reviews, Wishlist, Seller Dashboard
```

What's the benefit of making this list? — You decide the **scope**. Otherwise what happens is the project never ends because you keep adding new features.

---

## Stage 2 — "How to build?"

Now you make **decisions** for each feature.

These decisions are what separate a senior dev from a beginner. Decisions come with options — and each option has trade-offs.

### Decision 1 — How to handle Authentication?

**Options:**
- Build it yourself (email + password + bcrypt + sessions) — we'll do this in ShopKaro
- Use Clerk — ready-made solution, 10-minute setup
- Use NextAuth — popular library, flexible

**When to use what:**
- You only need email/password + want to learn the internals → Build it yourself
- You need to launch fast, want Google/GitHub login too → Clerk
- You need custom logic + some control → NextAuth

In ShopKaro we'll **build it ourselves** — because learning is the goal.

Coming up: Doc 02-09

---

### Decision 2 — Which Database?

**Options:**
- PostgreSQL — rows and columns, structured data
- MongoDB — flexible, JSON-like

**When to use what:**
- Data structure is fixed (User, Product, Order) → PostgreSQL
- Data structure is flexible, schema changes often → MongoDB

ShopKaro's data is structured — so **PostgreSQL**.

Coming up: Doc 19-22

---

### Decision 3 — Where to keep State?

"State" means the app's memory — like what's in the cart right now.

**Options:**
- React `useState` — for a single component
- React Context — for the whole app, simple cases
- Zustand — for the whole app, complex cases
- Fetch from server every time — sometimes that's the right call

**When to use what:**
- Cart data (only needed in browser, fast updates) → Zustand
- User's login status (needed across the app) → Context or Zustand
- Product list (comes from server) → React Query (server state)

Coming up: Doc 27-31

---

### Decision 4 — What's the Rendering Strategy?

Meaning — should the page be built on the server or in the browser?

**Options:**
- SSR — built on server, fresh data
- CSR — built in browser, fast interactions
- SSG — pre-built, fastest

**In ShopKaro:**
- Homepage → SSG (same for everyone)
- Product page → SSR (real-time stock)
- Cart → CSR (only the user's data)

Coming up: Doc 14-18

---

## Stage 3 — "Then build it"

When Stage 1 and 2 are clear — then open VS Code.

Now whenever you write something, you already know:
- Which umbrella it belongs to
- Why that decision was made
- What the alternatives were

---

## ShopKaro's Rough Plan (In Text)

This is the document a senior dev creates before starting a project — no fancy tool, just text:

```
PROJECT: ShopKaro

USERS:
- Buyer (can register, can buy products)
- Admin (can add products) — later

CORE FEATURES (v1):
- Signup / Login / Logout
- Product listing + detail page
- Cart (add, remove, update quantity)
- Checkout + Payment (Razorpay)
- Order history

TECH DECISIONS:
- Framework: Next.js (App Router)
- Database: PostgreSQL + Prisma
- Auth: Build ourselves (bcrypt + sessions)
- State: Zustand (cart), React Query (server data)
- Payments: Razorpay
- Deploy: Vercel

RENDERING:
- Homepage: SSG
- /products: SSR
- /product/[id]: SSR
- /cart: CSR
- /orders: SSR (with auth)

FOLDER STRUCTURE (rough):
/app
  /api          → Backend API routes
  /(auth)       → Login, Signup pages
  /products     → Product listing + detail
  /cart         → Cart page
  /orders       → Order history
/components     → Reusable UI components
/lib            → Utility functions, db connection
/prisma         → Database schema
```

This takes 20-30 minutes to write — but saves **hours of confusion** later.

---

## One Thing to Remember

> Whenever you make a decision — note down why you made it.
> "Used Zustand because cart data was needed across the whole app" — that one line is enough.
> This is what senior-dev thinking looks like.

---

## Next Doc

`02-auth-what-is-it.md` — What is the Authentication umbrella. Login, Signup, Sessions, JWT, OAuth — they all live under one umbrella. First look at the whole umbrella, then we'll go inside.