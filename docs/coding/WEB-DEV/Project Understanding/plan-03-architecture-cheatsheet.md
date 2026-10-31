# 📋 Plan Phase — Doc 3: Architecture Cheatsheet
### Which Tool in Which Situation — Quick Reference

---

> This doc is a decision guide.
> After filling the PRD, come here — lock tool choices quickly with reasons.

---

## 🖥️ Framework Decision

```
WHAT TO BUILD?                              TOOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full-stack web app (React + Backend together)  → Next.js ✅
Pure frontend SPA (React only, separate API)   → Vite + React
Content-heavy site (blogs, docs, marketing)    → Astro
Vue ecosystem                                  → Nuxt.js
Web standards focused, remix routes            → Remix
```

**Real Talk:** Next.js App Router is the standard for 2024-25.
If you're building full-stack, it's Next.js — period.

---

## 🎨 Rendering Strategy

```
PAGE TYPE                                    STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User-specific data (dashboard, profile)      → SSR
Real-time data (stock, live scores)          → SSR
Public + rarely changing (blog, docs)        → SSG
Public + regular updates (news, e-commerce)  → ISR
Internal tool, no SEO needed                 → CSR
Landing page + marketing                     → SSG
Mix of above                                 → Next.js (each page different)
```

```
How to do it in Next.js:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SSG (default):   async function Page() { await fetch(url) }
SSR:             await fetch(url, { cache: 'no-store' })
ISR:             await fetch(url, { next: { revalidate: 60 } })
CSR:             'use client' + useEffect
```

---

## 🗂️ State Management

```
SITUATION                                    TOOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Single component state (form, modal toggle)  → useState
2-3 components share state                   → useState + props / Context
Global state, medium complexity              → Context API (built-in!)
Global state, many unrelated components      → Zustand 🟢 (recommended)
Server data (API responses, caching)         → React Query / TanStack Query
Enterprise, complex logic, time-travel debug → Redux Toolkit
```

**Real Talk:**
- Zustand + React Query = sweet spot for most projects
- Context API is underrated — absolutely enough for medium projects
- Redux = overkill unless the company already uses it

```
INTERVIEW ANSWER TEMPLATE:
"I chose [Context/Zustand] because [reason].
 For server state I used React Query —
 because it automatically handles caching, background refetching,
 and loading/error states, so I didn't have to write all that manually."
```

---

## 🌐 API Style

```
SITUATION                                    STYLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Next.js web app, no external consumers       → Server Actions ✅
Mobile app or external clients also exist     → REST API routes
Full type safety, Next.js monorepo           → tRPC
Complex data requirements, multiple clients  → GraphQL
```

**When to choose Server Actions:**
```
✅ Only a web app (no mobile, no third-party)
✅ Form submissions, CRUD operations
✅ Less boilerplate needed
✅ Type safety automatic (with TypeScript)

❌ External API consumers exist
❌ Mobile app also exists
❌ Need to build webhook endpoints
```

---

## 🗄️ Database

```
SITUATION                                    DATABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Structured data, relations important         → PostgreSQL ✅
Document-based, flexible schema              → MongoDB
Caching, sessions, real-time pub/sub         → Redis
Local dev / small embedded app               → SQLite
Managed PostgreSQL (serverless)              → Neon / Supabase
```

**Real Talk:** PostgreSQL + Prisma = default choice for 90% of apps.
Use MongoDB only when data is genuinely unstructured — social media posts, logs, etc.

```
ORM CHOICE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prisma   → TypeScript-first, great DX, easy migrations  [Recommended]
Drizzle  → Lightweight, SQL-like syntax, smaller bundle
Mongoose → For MongoDB
```

---

## 🔐 Auth

```
SITUATION                                    TOOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fastest setup, UI components included        → Clerk ✅
Full control, open source, self-hosted       → NextAuth / Auth.js
TypeScript-first, modern, flexible           → Better Auth
Simple social login (Google/GitHub)          → NextAuth
Enterprise SSO (SAML, LDAP)                  → Auth0
Supabase users                               → Supabase Auth
```

**When is RBAC needed:**
```
RBAC is definitely needed in a project when:
→ There are multiple user types (Admin, User, Guest, Manager)
→ There are different permissions
→ There are requirements like "only admin can do this"

Implementation:
→ Put a `role` field in the User model
→ Check role in middleware
→ Check in Server Actions / API routes too
   (client-side check is only for UX, not security)
```

---

## 📦 Supporting Tools

```
NEED                    TOOL                    WHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Form handling           React Hook Form         Performant, less re-renders
Validation              Zod                     TypeScript-first, reuse server/client
Image upload            Uploadthing             Easiest for Next.js
Image CDN + transform   Cloudinary              Resize, crop, optimize
Emails                  Resend                  Modern API, React email templates
Charts                  Recharts                React-native charts
UI Components           shadcn/ui               Copy-paste, customizable, accessible
Animation               Framer Motion           Production-grade React animations
Background jobs         Inngest                 Serverless-friendly, retries built-in
Error tracking          Sentry                  Production must-have
```

---

## 🏗️ Project Type → Quick Stack Recommendation

```
TASK MANAGER / SAAS:
→ Next.js + Server Actions + Prisma + PostgreSQL
→ Clerk auth + RBAC
→ Zustand (UI state) + React Query (server state)
→ Resend (emails) + Vercel (hosting)

E-COMMERCE:
→ Next.js + REST API routes + Prisma + PostgreSQL
→ NextAuth + RBAC (customer, admin)
→ Zustand (cart) + React Query (products)
→ Stripe/Razorpay + Cloudinary (images) + Redis (cart cache)

REAL-TIME APP (Chat, Collab):
→ Next.js + Socket.io
→ MongoDB (flexible message schema) + Redis (pub/sub)
→ NextAuth
→ Railway hosting (WebSocket support)

ANALYTICS DASHBOARD (Internal):
→ Next.js CSR pages + REST API
→ Clerk (easy auth) + RBAC
→ PostgreSQL + Prisma
→ Recharts / Victory (visualization)
→ React Query (heavy data fetching)

BLOG / CONTENT SITE:
→ Next.js + SSG/ISR
→ MDX / Contentlayer (content management)
→ No complex state needed
→ Vercel (hosting, ISR support)

JOB BOARD:
→ Next.js + SSG (public) + SSR (dashboard)
→ PostgreSQL + Prisma
→ NextAuth (employer + seeker roles)
→ Uploadthing (resume uploads) + Resend (notifications)
→ Algolia / Postgres Full-Text (search)
```

---

**Next Doc →** `plan-04-star-method.md` — How to explain a project in an interview: STAR framework with examples.