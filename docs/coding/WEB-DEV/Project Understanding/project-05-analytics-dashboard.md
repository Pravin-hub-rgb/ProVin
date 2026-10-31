# 🚀 Project 5 — DataLens: Internal Analytics Dashboard
### Visualize Sales Data — Charts, Filters, Export

---

## 💬 The Brief — What the Client Said

> *"Our sales team needs an internal dashboard.
> They should be able to see their performance — daily/weekly/monthly sales,
> top products, region-wise breakdown. Fed up with Excel — need visuals.
> Behind login — no public access. Export to CSV needed too."*

This is different from the first four projects. **No SEO**, **no public pages**, **no real-time**, **no complex auth flows**. This is a pure **data visualization tool** — internal use, authenticated users only. Architecture can be simple, but focus is on **data fetching + visualization**.

---

## 📋 Step 1 — PRD Lite

```
PROJECT NAME  : DataLens
TYPE          : Internal Analytics Dashboard
ONE LINE      : "This is an internal dashboard that lets the sales team
                 visually track their performance."

TARGET USER:
  Primary   → Sales team members
              Semi-technical, mostly desktop use
  Secondary → Sales Manager
              Will see team's aggregate performance

CORE FEATURES (MVP):
  [ ] Auth (login) — company email based
  [ ] Overview page — key metrics (total sales, orders, revenue)
  [ ] Date range filter (last 7d, 30d, 90d, custom)
  [ ] Sales trend chart (line chart — day wise)
  [ ] Top 10 products table
  [ ] Region-wise breakdown (bar chart)
  [ ] Individual salesperson performance (if role = manager)
  [ ] Export data to CSV

STRETCH (V2):
  [ ] Real-time sales ticker (WebSocket/SSE)
  [ ] Email reports (scheduled weekly)
  [ ] Goal tracking (set targets, show progress)
  [ ] Drill-down (click on region → see that region's data)

OUT OF SCOPE:
  ❌ Public access
  ❌ Mobile app (desktop-first)
  ❌ Custom report builder
  ❌ Third-party integrations (Salesforce, HubSpot)
```

---

## 🏗️ Step 2 — Architecture Decisions

---

**Rendering → CSR (Almost Entirely) ✅**

```
Why CSR?
→ No SEO needed — internal tool, no Google indexing
→ Highly interactive — date filters change, charts update
→ User must be logged in — no public access
→ Dashboard content depends on user's filters — new data fetched on every filter change (via React Query)

Why not SSR?
→ Initial page load data isn't personalized beyond "logged in user"
→ Date range filter state is on client — server-side rendering would be over-engineering

Exception: Login page → SSG (static, no data needed)
```

---

**Framework → Next.js (but minimal usage)**

```
Why Next.js even though CSR dominant?
→ Auth handling is easy (NextAuth / Clerk)
→ API routes for data fetching — server-side queries
→ Ready if any SSR page needs to be added later
→ Deployment ecosystem is mature

But if this project were strictly internal and simple:
→ Vite + React would also be a valid choice — simpler setup
→ Next.js is slightly overkill in this case, but no harm
```

---

**Auth → Clerk ✅ (Email-only)**

```
Simple case here:
→ Login with company emails
→ No social login needed
→ No complex role flows (simple: manager vs employee)

Why Clerk?
→ Fast setup
→ Organization feature built-in (company-specific login)
→ UI ready-made

Role handling:
→ Set 'role' in Clerk custom metadata: 'manager' | 'employee'
→ Conditionally render manager-only sections in dashboard
```

---

**Data Fetching → React Query + Aggregation API Routes**

```
Dashboard has complex aggregation queries for charts:
→ "Total sales per day for last 30 days"
→ "Top 10 products by revenue this month"
→ "Region-wise breakdown for selected period"

These queries run at database level (PostgreSQL aggregations).

Architecture:
→ Query logic in Next.js API routes
→ Prisma or raw SQL for aggregation
→ React Query on client — caching, loading states, refetch on filter change

React Query benefit:
→ User changes date range
→ React Query automatically refetches with new params
→ Shows previous data until new one loads (keepPreviousData)
→ Same query doesn't re-run if cached (short TTL — 5 minutes)
```

---

**State Management → URL State + React Query (not Zustand)**

```
This is an interesting approach. Primary state in dashboard = filters.

Option A: Zustand for filters
→ Works
→ But doesn't reflect in URL
→ If user wants to share "see this view" → not possible

Option B: URL Search Params ✅ (nuqs library)
→ Filter state in URL: /dashboard?range=30d&region=north
→ User can bookmark specific view
→ Back button works properly
→ Same filters open via shared link

nuqs (Next.js URL query state library):
→ Use URL params like React state
→ Type-safe, Next.js optimized
→ useQueryState('range', parseAsString.withDefault('30d'))

React Query takes filter params as dependency:
→ useQuery(['sales', range, region], () => fetchSales(range, region))
→ Filter change → new query → fresh data
```

---

**Charts → Recharts ✅**

```
Options:
→ Chart.js: Popular but React integration is clunky
→ D3.js: Powerful but complex, low-level
→ Victory: React-native, good API
→ Recharts ✅: Built for React, composable, good docs

Why Recharts?
→ React component-based API
→ Responsive containers built-in
→ Customizable tooltips, legends
→ Line, Bar, Pie — all needed — all available

In dashboard:
→ Line chart: Sales trend over time
→ Bar chart: Region-wise comparison
→ Simple cards: KPI metrics (no chart library needed — plain HTML/CSS)
→ Table: Top products (plain React table — no library needed for basic)
```

---

**CSV Export → Server-side generation**

```
User clicks "Export CSV":

Option A: Client-side CSV generation
→ Build CSV string from data array in JavaScript
→ Trigger Blob download
→ Problem: only works if all data already fetched on client
→ Slow for large data — all data must be on client

Option B: Server-side CSV generation ✅
→ Generate CSV on API route
→ Stream as file download
→ Better for large datasets
→ Sensitive data doesn't fully reach client

Implementation:
→ GET /api/export/sales?range=30d&region=all
→ Query runs on server
→ Generate CSV via csv-stringify library
→ Content-Type: text/csv header
→ Browser automatically downloads
```

---

**Database → PostgreSQL ✅ + Aggregation optimization**

```
Sales data is clearly relational:
→ Sales → Products → Regions → Salespeople — all related

Performance consideration:
→ Analytics queries are heavy — GROUP BY, SUM, DATE_TRUNC
→ Can be slow on large datasets

Optimizations:
→ Indexes on frequently filtered columns (date, region, salesperson_id)
→ Consider materialized views for common aggregations (V2)
→ Connection pooling (PgBouncer or Neon's built-in pooling)
→ Query-level caching via React Query (5-minute stale time)

Why not a separate analytics DB?
→ Overkill at this scale
→ ClickHouse or BigQuery when millions of rows exist
→ PostgreSQL WITH proper indexes is enough at this scale
```

---

## 🗄️ Step 3 — Data Model

```
SALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id              UUID        PK
salesperson_id  UUID        FK → User, indexed
product_id      UUID        FK → Product, indexed
region          VARCHAR(100) indexed
amount          DECIMAL(10,2)
quantity        INTEGER
sale_date       DATE        indexed  ← Most queried column
created_at      TIMESTAMP

PRODUCT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id          UUID       PK
name        VARCHAR
category    VARCHAR
unit_price  DECIMAL

USER (Salesperson)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id          UUID       PK
name        VARCHAR
email       VARCHAR    UNIQUE
role        ENUM       'manager' | 'employee'
region      VARCHAR    ← Salesperson's assigned region
clerk_id    VARCHAR    UNIQUE

INDEXES (Performance-critical):
→ Sale.sale_date           (date range queries — most frequent)
→ Sale.salesperson_id      (per-person reports)
→ Sale.region              (region filter)
→ Sale.product_id          (top products query)
→ Composite: (sale_date, region)  ← Combined filter is common

KEY QUERIES:

1. Daily sales last 30 days:
SELECT DATE_TRUNC('day', sale_date) as day,
       SUM(amount) as total
FROM sales
WHERE sale_date >= NOW() - INTERVAL '30 days'
GROUP BY day
ORDER BY day;

2. Top 10 products:
SELECT p.name, SUM(s.amount) as revenue, SUM(s.quantity) as units
FROM sales s
JOIN products p ON s.product_id = p.id
WHERE s.sale_date >= [range]
GROUP BY p.id, p.name
ORDER BY revenue DESC
LIMIT 10;

3. Region breakdown:
SELECT region, SUM(amount) as total
FROM sales
WHERE sale_date >= [range]
GROUP BY region;
```

---

## 📋 Step 4 — Feature Breakdown

```
PHASE 1 — MVP:

  Auth
  ├── [ ] Clerk setup (email login only)
  ├── [ ] Role in Clerk metadata
  └── [ ] Protected routes middleware

  Dashboard Layout
  ├── [ ] Sidebar navigation
  ├── [ ] Date range picker (URL state)
  └── [ ] Region filter (URL state)

  Charts & Data
  ├── [ ] KPI cards (total revenue, orders, avg order value)
  ├── [ ] Sales trend line chart (Recharts)
  ├── [ ] Region breakdown bar chart
  ├── [ ] Top products table
  └── [ ] Salesperson performance (manager only)

  API Routes
  ├── [ ] /api/analytics/overview
  ├── [ ] /api/analytics/trend
  ├── [ ] /api/analytics/regions
  └── [ ] /api/analytics/top-products

  Export
  └── [ ] CSV export API + download trigger

  Edge Cases
  ├── [ ] Empty data state (new month, no sales yet)
  ├── [ ] Loading skeletons for charts
  └── [ ] Error state (DB query failed)

PHASE 2:
  [ ] Scheduled email reports (Inngest cron + Resend)
  [ ] Drill-down charts
  [ ] Real-time updates (SSE for today's live ticker)
```

---

## 🎙️ Interview Script — STAR Format

```
SITUATION:
"I built DataLens — an internal sales analytics dashboard.
Sales team was fed up with Excel sheets — manually aggregating data was tedious.
They needed a visual, filterable dashboard."

TASK:
"Internal tool — no SEO, no public access. Primary challenge was
efficiently handling heavy aggregation queries and providing
a good visualization experience."

ACTION:
"Three interesting decisions —

First: Used only CSR — skipped SSR.
Internal tool, zero SEO concern. Highly interactive — filters change continuously.
This case is clearly built for CSR.
Still used Next.js for API routes and auth, but pages are CSR.

Second: Kept filter state in URL — not in Zustand.
Used nuqs library. Date range and region filter are URL params.
The benefit of this approach: user can bookmark specific view,
and share link with manager — 'see Q3 north region'.
Not possible with Zustand.

Third: Focused heavily on database aggregation queries.
Analytics queries are heavy — GROUP BY, SUM, DATE_TRUNC.
Carefully designed indexes — sale_date, region, salesperson_id.
Set 5-minute stale time in React Query — DB doesn't get hit
repeatedly on same filter.

Challenge was CSV export — large data. Client-side generation
completely exposes sensitive data. Server-side streaming
CSV was better — sent Content-Type: text/csv from API route,
browser automatically downloads."

RESULT:
"Dashboard had 4 chart types, date range + region filters in URL,
CSV export, and manager-only performance view.
Reflection: I'd design loading states better upfront.
Charts take time to load — skeleton loaders should have been
planned first, had to add them mid-way."
```

---

## 📊 Final Comparison — All 5 Projects in One Place

```
┌─────────────────┬────────────┬──────────┬───────────┬─────────────┬──────────────┐
│ Feature          │ StaffSync  │ HireHop  │ TalkSpace │ ShopKaro    │ DataLens     │
│                  │ (Task Mgr) │ (JobBoard│ (Chat)    │ (E-comm)    │ (Analytics)  │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Rendering        │ SSR        │ ISR+SSR  │ CSR       │ ISR+SSR+CSR │ CSR          │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ API Style        │ Server     │ REST     │ Socket.io │ REST        │ API Routes   │
│                  │ Actions    │ Routes   │           │ Routes      │              │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ State Mgmt       │ Zustand +  │ React    │ Zustand   │ Zustand +   │ URL State +  │
│                  │ React Query│ Query    │           │ React Query │ React Query  │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Database         │ PostgreSQL │ PostgreSQL│ MongoDB  │ PostgreSQL  │ PostgreSQL   │
│                  │            │          │ + Redis   │ + Redis     │              │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Auth             │ Clerk      │ NextAuth │ NextAuth  │ NextAuth    │ Clerk        │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ RBAC             │ Yes        │ Yes      │ No        │ Yes (admin) │ Yes (manager)│
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Real-time        │ No         │ No       │ Socket.io │ No          │ No           │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ File Upload      │ No         │ Uploadth │ No        │ Cloudinary  │ No           │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Email            │ No         │ Resend   │ No        │ Resend      │ No           │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Payments         │ No         │ No       │ No        │ Razorpay    │ No           │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ SEO              │ No         │ Critical │ No        │ Critical    │ No           │
├─────────────────┼────────────┼──────────┼───────────┼─────────────┼──────────────┤
│ Hosting          │ Vercel     │ Vercel   │ Railway   │ Vercel      │ Vercel       │
└─────────────────┴────────────┴──────────┴───────────┴─────────────┴──────────────┘
```

---

> **Key Insight:** Different decisions in every project — using the same stack everywhere is wrong.
> Showing this kind of thinking in an interview is the most powerful thing.
> **"It depends — and here's why it depends."**