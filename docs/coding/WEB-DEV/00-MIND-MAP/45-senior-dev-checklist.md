# 45 — Senior Dev Checklist: Before and After Building a Project

> This is the **last doc** of the entire series.
> ShopKaro is complete — from Authentication to Deployment.
> Now a checklist — what senior devs mentally run through on every project.

---

## Phase 1 — Before Starting (Planning)

```
□ Feature list created — Must have vs Nice to have
□ Users defined — Buyer, Seller, Admin?
□ Tech decisions made —
  □ Framework: Next.js ✓
  □ Database: PostgreSQL ✓
  □ Auth: Custom / NextAuth / Clerk?
  □ State: Zustand + React Query?
  □ Payments: Razorpay / Stripe?
  □ Deploy: Vercel?
□ Rough folder structure thought out
□ Data models sketched (tables + relations)
□ API endpoints list created
□ Rendering strategy decided per page
```

---

## Phase 2 — During Development

```
□ Secrets are in .env file — .env is in .gitignore
□ .env.example file exists (keys present, values absent)
□ Passwords are hashed (bcrypt) — not plain text
□ Auth check on protected routes
□ SQL injection not possible (using Prisma — safe)
□ Error handling in API routes
□ Loading states present
□ Empty states present (if no products → "No products found")
```

---

## Phase 3 — Before Deploying

```
SECURITY:
□ Environment variables added in Vercel
□ Test keys are not in production
□ HttpOnly cookies used for auth
□ CORS configured if separate backend

PERFORMANCE:
□ Using next/image (not regular img tag)
□ Console.log statements removed
□ Unused dependencies removed

DATABASE:
□ Production database in use (Neon/Supabase)
□ Migrations run on production

PAYMENTS:
□ Razorpay live keys in use (not test)
□ Webhook URL set in Razorpay dashboard
□ Payment flow tested end-to-end
```

---

## Phase 4 — After Deploying

```
□ Opened the live URL and tested manually
□ Login/Signup working
□ Product listing visible
□ Cart add/remove working
□ Payment tested end-to-end (in Razorpay test mode)
□ Checked on mobile
□ 404 page is fine
□ Error page is fine
```

---

## The Entire Series at a Glance

```
00  Overview — the complete picture of ShopKaro
01  How to Think — a senior dev's planning

AUTHENTICATION (02-09):
02  Auth umbrella — overview
03  bcrypt — password hashing
04  Sessions — remembering after login
05  JWT — alternative to sessions
06  Cookies — getting session/JWT to the browser
07  OAuth — login with Google
08  Email verification + password reset
09  Libraries — NextAuth, Clerk

ARCHITECTURE (10-13):
10  Architecture umbrella — overview
11  MVC — splitting code into 3 parts
12  Folder structure — what goes where
13  BFF layer — when to have a separate backend

RENDERING (14-18):
14  Rendering umbrella — overview
15  CSR — rendering in the browser
16  SSR — rendering on the server
17  SSG — pre-built
18  ShopKaro decisions — which page uses which strategy

DATABASE (19-22):
19  Database umbrella — overview
20  SQL vs NoSQL — PostgreSQL vs MongoDB
21  Prisma — ORM, talking to DB from JavaScript
22  Data models — ShopKaro's complete schema

API DESIGN (23-26):
23  API umbrella — overview
24  REST — designing endpoints
25  GraphQL — alternative to REST
26  ShopKaro APIs — complete reference

STATE MANAGEMENT (27-31):
27  State umbrella — overview
28  Local vs Global state
29  React Context
30  Zustand — cart store
31  React Query — server state

CACHING (32-35):
32  Caching umbrella — overview
33  Browser storage — localStorage, sessionStorage
34  CDN — static files globally
35  Server-side caching

PAYMENTS (36-38):
36  Payments umbrella — overview
37  Razorpay flow — integration
38  Webhooks — payment backup

PERFORMANCE (39-42):
39  Performance umbrella — overview
40  Images — Next.js Image component
41  Lazy loading + Skeleton screens
42  Pagination vs Infinite scroll

ACCESSIBILITY (43):
43  Accessibility basics — for everyone

DEPLOYMENT (44):
44  Vercel deploy + Environment variables

CHECKLIST (45):
45  Senior dev checklist ← THIS
```

---

## One Last Thing

When you started this series — you knew one thing: how to build a todo app in Next.js.

Now you know:

- What's inside the authentication umbrella
- When JWT, when Sessions, when Clerk
- What MVC is and how it applies in Next.js
- The difference between SSR, CSR, SSG and when to use which
- Database design — tables, relations, Prisma
- API design — REST endpoints
- State management — local, global, server state
- Building a cart with Zustand
- Caching — from browser to CDN
- Payment integration — Razorpay + Webhooks
- Performance — images, lazy loading, pagination
- Deployment — going live on Vercel

**This is "senior dev" vocabulary.** Now whenever you build a feature — you know which umbrella you're in, what options exist, and when to use what.

Go build ShopKaro. 🚀
