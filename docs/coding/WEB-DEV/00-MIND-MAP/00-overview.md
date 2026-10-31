# ShopKaro — The Full Picture, At Once

> This doc is a trailer. Everything will be shown a little — not in detail yet.
> Every doc ahead zooms in on one scene from this trailer.
> If something doesn't make sense yet, don't worry — it'll be explained ahead.

---

## What is ShopKaro?

We're building a **small e-commerce platform** where:
- A user can **signup/login**
- Can **view** products, search them
- Can **add to cart**
- Can **place an order**
- Can make **payment**
- Can **track their orders**

That's it. Simple. But behind this simple thing there's a whole system — which we'll understand step by step.

---

## A User's Journey — From Browser to Database

Think — Priya. She opens ShopKaro on her phone.

```
Priya's phone (Browser)
        ↓
   ShopKaro Website (Next.js — Frontend)
        ↓
   ShopKaro Server (Next.js — Backend / API)
        ↓
   Database (PostgreSQL)
```

That's the whole system — 4 layers. Each layer has one job.

Let's take a quick look at each layer.

---

## Layer 1 — Browser (Priya's Phone)

Everything Priya sees — products, cart, buttons — is **HTML, CSS, JavaScript** running in her browser.

This part is called the **Frontend**.

In Next.js these are **React components** — like `ProductCard.jsx`, `CartPage.jsx`, etc.

**Things that happen here:**
- How the page looks — UI
- What the user clicked, what they typed — Events
- What's in the cart right now — State (memory)
- Which page should be fetched fresh from the server, which should be built in the browser — Rendering Strategy

Coming up: Rendering (Doc 14-18), State Management (Doc 27-31)

---

## Layer 2 — Next.js Frontend (What Priya Sees)

When Priya opens `shopkaro.com`, pages load in her browser.

These pages can be built in **3 ways:**

| Page | How it's built | Why |
|------|---------------|-----|
| Homepage | Pre-built (SSG) | Same for everyone |
| Product Detail | Fresh from server (SSR) | Need to show real-time stock |
| Cart | Built in browser (CSR) | Only Priya's data |

This decision — **how each page is built** — is an important skill. It's called Rendering Strategy.

Coming up: Doc 14-18

---

## Layer 3 — Next.js Backend (API Routes)

When Priya logs in or places an order — her browser **sends a request to the server.**

```
Browser → POST /api/auth/login → Server
Browser → GET /api/products → Server
Browser → POST /api/orders → Server
```

These requests are called **API**. The server handles these requests, talks to the database, and sends back a response.

In Next.js this lives in the `/app/api/` folder.

**Things that happen here:**
- Login/Signup logic — Authentication
- Product, Order, Cart data — Business Logic
- Talking to the database — Database calls
- Processing payment — Payment Integration

Coming up: API Design (Doc 23-26), Authentication (Doc 02-09), Payments (Doc 36-38)

---

## Layer 4 — Database (PostgreSQL)

Everything is **permanently stored** here.

Priya's account? In the database.
ShopKaro's products? In the database.
Priya's order? In the database.

We're using **PostgreSQL** — a popular relational database.

And we don't write raw SQL to talk to the database — we use **Prisma**. Prisma is an **ORM** — a tool that lets you write in JavaScript and it converts it to SQL.

```javascript
// This is Prisma — written in JavaScript
const user = await prisma.user.create({
  data: { email: "priya@gmail.com", password: hashedPassword }
})

// Prisma runs this SQL under the hood
// INSERT INTO users (email, password) VALUES ('priya@gmail.com', '...')
```

Coming up: Database (Doc 19-22)

---

## The Full Flow Once — Priya Logs In

```
1. Priya enters her email + password → Browser

2. Browser sends →
   POST /api/auth/login
   { email: "priya@gmail.com", password: "12345" }

3. Server receives the request →
   - Finds Priya in the database
   - Compares the password (using bcrypt)
   - If correct → creates a Session
   - Sends the Session ID → Cookie to the browser

4. Browser saves the cookie →
   Now this cookie goes along with every request automatically

5. Priya sees the dashboard →
   Browser sends the cookie → Server checks → "Yes, this is Priya" → Sends data
```

This whole flow is called **Authentication**. We'll understand it in much more detail ahead.

Coming up: Doc 02-09

---

## The Full Flow Once — Priya Buys a Product

```
1. Priya taps "Buy Now"

2. Browser →
   POST /api/orders
   { productId: "123", quantity: 1 }

3. Server →
   - Check if Priya is logged in? (Authentication)
   - Check if product is available? (Database)
   - Create the order (Database)
   - Initiate payment (Razorpay)

4. Razorpay →
   - Shows the payment page
   - Priya pays
   - Razorpay → tells the Server "payment successful" (Webhook)

5. Server →
   - Update order status to "paid"
   - Send confirmation email to Priya

6. Priya sees → "Order placed!"
```

Coming up: Payments (Doc 36-38)

---

## Umbrella Terms — A Quick Map

This whole series is built around these umbrellas. Look at them once — details will come later.

```
AUTHENTICATION       → Login, Signup, Sessions, JWT, OAuth, bcrypt
ARCHITECTURE         → Folder structure, MVC, BFF layer
RENDERING            → SSR, CSR, SSG — how each page gets built
DATABASE             → PostgreSQL, Prisma, Data Models
API DESIGN           → REST, GraphQL, Endpoints
STATE MANAGEMENT     → Zustand, Context, React Query
CACHING              → localStorage, CDN, Server cache
PAYMENTS             → Razorpay, Stripe, Webhooks
PERFORMANCE          → Images, Lazy loading, Pagination
ACCESSIBILITY        → ARIA, Keyboard navigation
DEPLOYMENT           → Vercel, Environment Variables
```

Each umbrella has its own docs. And every doc will keep ShopKaro's context — so it never feels like "where did this come from."

---

## How to Read This Series

1. **First time** — read the whole series once, don't implement anything
2. **Second time** — when you're building the project, open the relevant doc and work alongside it
3. **If confused** — come back to this `00-overview.md` — everything's context is here

---

## Next Doc

`01-how-to-think.md` — What does a senior dev think before starting a project? How do they make decisions? What's the mental model that separates a todo app from a production app?