# 🚀 Project 4 — ShopKaro: E-Commerce Store
### Products, Cart, Checkout, Payments — Full Flow

---

## 💬 The Brief — What the Client Said

> *"I need to build a small online store — sell handmade jewellery.
> Products will be displayed, add to cart, checkout, payment.
> Admin needs a panel to add/remove products.
> SEO is important — products should show on Google."*

Classic e-commerce. This is complex because there are **multiple layers** — public product pages (SEO), private cart (user-specific), payment integration, and admin panel. Careful mixing is needed in architecture.

---

## 📋 Step 1 — PRD Lite

```
PROJECT NAME  : ShopKaro
TYPE          : E-Commerce Web Application
ONE LINE      : "This is an online store where handmade jewellery
                 can be browsed, added to cart, and purchased with payment."

TARGET USER:
  Primary   → Customer (buyer)
              Non-technical, mostly shops from mobile
  Secondary → Admin (shop owner)
              Manages products, views orders

CORE FEATURES (MVP):
  [ ] Product listing page (SEO optimized, filterable)
  [ ] Product detail page (SEO optimized)
  [ ] Cart (add/remove/update quantity)
  [ ] Checkout flow
  [ ] Payment integration (Razorpay / Stripe)
  [ ] Order confirmation page + email
  [ ] Admin: Product CRUD (add, edit, delete, image upload)
  [ ] Admin: Order list + status update

STRETCH (V2):
  [ ] User accounts (order history)
  [ ] Wishlist
  [ ] Product reviews
  [ ] Discount codes / coupons
  [ ] Inventory alerts (low stock)

OUT OF SCOPE:
  ❌ Multiple vendors / marketplace
  ❌ Subscription products
  ❌ Mobile app
  ❌ Live chat support
```

---

## 🏗️ Step 2 — Architecture Decisions

---

**Rendering Strategy → MIXED (most interesting decision here)**

```
This project is the best example of rendering strategy — different pages, different strategies.

PRODUCT LISTING PAGE (/products):
→ ISR (revalidate: 3600 — 1 hour)
→ Products update daily (new items, out of stock)
→ SEO critical — must be indexed by Google
→ Served from CDN — fast for all users
→ Not SSG because daily updates exist
→ Not SSR because this page isn't personalized

PRODUCT DETAIL PAGE (/products/[slug]):
→ ISR (revalidate: 1800 — 30 minutes)
→ Individual product page ranks on Google
→ "Handmade Silver Ring" should show on Google
→ Stock status can change frequently → ISR 30 min

CART PAGE (/cart):
→ CSR + Client-side state (Zustand)
→ Cart is completely user-specific + session-based
→ No SEO needed for cart page
→ Real-time feel needed — instant add/remove

CHECKOUT PAGE (/checkout):
→ SSR — sensitive page, verify user logged-in state
→ Dynamic pricing (apply coupons in V2)

ADMIN DASHBOARD (/admin):
→ CSR — no SEO needed, highly interactive
→ Behind auth wall — Google shouldn't index

ORDER CONFIRMATION (/orders/[id]):
→ SSR — user-specific, real data
```

---

**Cart Architecture → Zustand + Redis Hybrid**

```
This is an interesting decision. Where to keep cart state?

Option A: Only localStorage (client-side)
→ Problem: data persists on refresh, but if user logs in on a different device
  → cart gone! Bad UX.

Option B: Only Database (PostgreSQL)
→ Problem: API call on every add/remove → slow feel

Option C: Zustand (optimistic) + Database sync ← Best for logged-in users
→ User clicks "Add to Cart"
→ Zustand immediately updates (optimistic — instant UI)
→ Background API call syncs to database
→ If user comes on a different device → load cart from server

Option D: Redis for guest cart
→ Guest user (not logged in) can also use cart
→ Store session-based cart in Redis (TTL: 7 days)
→ On login → merge Redis cart + DB cart

Final Decision:
→ Guest: Zustand (client only, no server sync)
→ Logged in: Zustand (UI state) + PostgreSQL sync
```

---

**Payment → Razorpay ✅ (India-first project)**

```
Razorpay vs Stripe:

Razorpay:
→ Designed for India — UPI, netbanking, cards, wallets
→ Native INR support
→ Simple KYC for Indian businesses
→ Well-documented Node.js SDK

Stripe:
→ International payments
→ Complex for Indian domestic use (extra setup)

Decision: Razorpay — client wants to sell in India.

Payment Flow:
1. User clicks "Place Order"
2. Server: Create order in DB (status: 'pending')
3. Server: Create Razorpay order (amount, currency)
4. Client: Razorpay checkout modal opens
5. User completes payment
6. Razorpay: Sends webhook to server (payment.captured)
7. Server: Update order status → 'paid'
8. Server: Send confirmation email (Resend)
9. Client: Show order confirmation page

IMPORTANT: Verify webhook!
→ Verify Razorpay webhook signature
→ Without verification, anyone can send a fake payment event
```

---

**Image Storage → Cloudinary ✅**

```
Admin will upload product images. Options:

Uploadthing:
→ Simple uploads, good for documents
→ Limited image transformations

Cloudinary:
→ Image CDN + transformations
→ Auto resize for thumbnails (different sizes in listing vs detail page)
→ Auto WebP conversion (faster loading)
→ Generates placeholder images for lazy loading
→ Free tier: 25GB storage enough for jewellery store

Decision: Cloudinary — image optimization matters in e-commerce.

Usage:
→ Admin uploads → stored on Cloudinary
→ Only Cloudinary URL saved in database
→ Product listing: thumbnail URL (400x400)
→ Product detail: full URL (800x800)
→ Resize on-the-fly via Cloudinary URL parameters
```

---

**Admin Panel → Simple approach — same Next.js app**

```
Option A: Separate admin app (different repo/domain)
→ Overkill for small store

Option B: /admin route group in same Next.js app ✅
→ Simpler — single codebase
→ Products are shared — no duplication
→ Role check via middleware

Using Server Actions in admin:
→ Admin adds product → Server Action
→ No external consumers for admin
→ Automatic type safety
```

---

**State Management → Zustand (cart) + React Query (products/orders)**

```
Zustand:
→ Cart state — user's cart is globally accessible
→ Cart badge count in header
→ Items list in cart page
→ Order summary in checkout page
→ All share the same cart state

React Query:
→ Product listings — prefetching on ISR pages
→ Admin dashboard — order list, product list
→ Mutations — order status update

useState:
→ Filter state (price range, category)
→ Search input
→ Modal state (image gallery)
```

---

## 🗄️ Step 3 — Data Model

```
PRODUCT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id             UUID        PK
slug           VARCHAR     UNIQUE, indexed
name           VARCHAR(255)
description    TEXT
price          DECIMAL(10,2)
compare_price  DECIMAL(10,2) nullable  ← "Was ₹999, Now ₹749"
stock          INTEGER
category       VARCHAR(100) indexed
images         TEXT[]      ← Array of Cloudinary URLs
status         ENUM        'active' | 'draft' | 'archived'
created_at     TIMESTAMP

ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id                UUID      PK
customer_email    VARCHAR   indexed
customer_name     VARCHAR
status            ENUM      'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
total_amount      DECIMAL(10,2)
razorpay_order_id VARCHAR   indexed  ← For payment reconciliation
razorpay_payment_id VARCHAR nullable
shipping_address  JSONB     ← { line1, city, state, pincode }
created_at        TIMESTAMP
updated_at        TIMESTAMP

ORDER_ITEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id          UUID      PK
order_id    UUID      FK → Order, indexed
product_id  UUID      FK → Product
quantity    INTEGER
unit_price  DECIMAL   ← Snapshot of price at time of order (correct record even if price changes)
product_name VARCHAR  ← Snapshot of name too

CART (for logged-in users)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id          UUID      PK
user_id     UUID      UNIQUE, indexed
items       JSONB     ← [{ productId, quantity, price }]
updated_at  TIMESTAMP

IMPORTANT: Why price snapshot in Order_Item?
→ Product price can change later
→ Old order would show wrong price
→ Snapshot = price at time of order permanently saved
```

---

## 📋 Step 4 — Feature Breakdown

```
PHASE 1 — MVP:

  Public Pages
  ├── [ ] Product listing (ISR + filters)
  ├── [ ] Product detail (ISR)
  └── [ ] SEO metadata (title, description, OG tags)

  Cart
  ├── [ ] Add to cart (Zustand — instant UI)
  ├── [ ] Remove from cart
  ├── [ ] Update quantity
  ├── [ ] Cart summary / total calculation
  └── [ ] Persist cart (localStorage for guest)

  Checkout + Payment
  ├── [ ] Checkout form (shipping address)
  ├── [ ] Razorpay integration
  ├── [ ] Webhook handler (payment.captured)
  ├── [ ] Order create + status update
  └── [ ] Confirmation email (Resend)

  Admin
  ├── [ ] Admin auth (separate role check)
  ├── [ ] Product add (with Cloudinary upload)
  ├── [ ] Product edit / delete
  └── [ ] Order list + status update

  Edge Cases
  ├── [ ] Out of stock — disable "Add to Cart"
  ├── [ ] Payment failed flow
  ├── [ ] Empty cart state
  └── [ ] Webhook signature verification
```

---

## 🎙️ Interview Script — STAR Format

```
SITUATION:
"I built ShopKaro — an e-commerce store for handmade jewellery.
Client needed a website where products show on Google,
customers can add to cart, and pay via Razorpay."

TASK:
"Complex project — multiple user types (customer, admin),
mixed rendering requirements (SEO + personalized pages),
and payment integration."

ACTION:
"Some interesting decisions —

First: Mixed rendering strategy.
Product pages via ISR — needed for SEO, revalidate 30 minutes.
Cart page pure CSR + Zustand — user-specific, no SEO needed.
Admin CSR — behind auth wall, highly interactive.
This mixing is the correct approach for e-commerce —
handling the whole project with one strategy would be wrong.

Second: Cart architecture was hybrid.
Keeping only in Zustand — cart lost on different device.
Keeping only in DB — API call on every add/remove = slow feel.
Solution: Zustand optimistic update + background DB sync for logged-in users.
Got instant UI feel plus data persistence.

Third: Snapshotted price in order item.
This is a common mistake — keeping price reference means if price changes later,
old order shows wrong price.
I snapshotted unit_price and product_name at order creation.

Payment challenge was handling Razorpay webhook.
Signature verification was necessary — without it anyone could send a fake event.
Verified Razorpay's hmac signature on server before processing."

RESULT:
"The app had ISR-powered SEO pages, full cart-to-checkout flow,
Razorpay payment, and admin panel.
Reflection: I'd plan stock management better upfront —
race condition is possible if two people buy the same last item simultaneously.
Database transaction + pessimistic locking is the correct solution for that case —
I'll address it in V2."
```

---

**Next →** `project-05-analytics-dashboard.md` — DataLens: Internal Analytics Dashboard