# 14 — SQL Databases: PostgreSQL, MySQL, SQLite, Neon, Supabase

> Umbrella: Database → SQL (Relational)
> Job: Store structured data — tables, rows, relationships
> ShopKaro docs: Covered in Docs 19-20

---

## SQL Databases Come in Two Categories

```
DATABASE ENGINE (Actual database software):
  → PostgreSQL, MySQL, SQLite
  → You install / manage it

MANAGED DATABASE SERVICE (Hosted on cloud):
  → Neon, Supabase, PlanetScale, Railway
  → A company manages it — you just use it
```

---

## Database Engines

---

### PostgreSQL
**Tag: 🟢 Industry Standard | Most Recommended | Feature-rich**

```
What it is: Most advanced open-source relational database
When to use:
  → Almost always — default choice
  → Complex queries needed
  → JSON data also needs storing (JSONB support)
  → Full-text search needed (without Elasticsearch)
  → Geospatial data (location-based apps)

Real app example:
  → Swiggy, Zomato: Orders, restaurants, reviews
  → CRED: Financial transactions (ACID compliance critical)
  → ShopKaro: Users, products, orders — everything

Difference from MySQL:
  → PostgreSQL: More standards-compliant, better JSON support, better for complex queries
  → MySQL: Simpler, WordPress ecosystem, slightly faster for simple reads
  → 2024 recommendation: PostgreSQL (almost always)

In India: Growing rapidly — especially Next.js + Prisma + Neon combo
```

---

### MySQL
**Tag: 🟢 Widely Used | WordPress/PHP ecosystem**

```
What it is: Most popular relational database (historically)
When to use:
  → WordPress site (MySQL only)
  → Existing MySQL codebase
  → PHP/Laravel projects
  → Simple reads, high traffic (slightly faster than Postgres for reads)

What it lacks vs PostgreSQL:
  → JSON support poor (PostgreSQL's JSONB is much better)
  → Window functions limited
  → Lower standards compliance

Real app example:
  → Most WordPress sites
  → Older PHP/Laravel Indian apps
  → Facebook (historically MySQL at extreme scale with custom patches)

In India: Very common in older projects — PHP era
```

---

### SQLite
**Tag: 🟢 Local/Small | File-based | No server**

```
What it is: File-based database — no server, a single .db file
When to use:
  → Local development
  → Desktop apps (Electron)
  → Mobile apps (React Native)
  → Very small apps, prototypes
  → Edge databases (Turso)

In production:
  → Used in single-server apps
  → Multiple servers? Problem — the file isn't shared

Real app example:
  → WhatsApp local message store
  → VS Code extension data
  → Electron apps

Turso (SQLite at edge):
  → SQLite on Cloudflare Workers
  → Replicated SQLite — growing concept
```

---

## Managed Database Services

---

### Neon
**Tag: 🟢 Serverless PostgreSQL | Vercel-friendly | Recommended for Next.js**

```
What it is: Serverless PostgreSQL — scale to zero, branch databases
When to use:
  → Next.js + Vercel project
  → Serverless needed (pay for what you use)
  → Development branches needed (separate DB for PR previews)

Special features:
  → Branching: Separate database branch for every PR — for testing
  → Scale to zero: No traffic → database sleeps → no bill
  → Vercel integration: Seamless

Free tier: Generous — perfect for side projects

Connection string:
  DATABASE_URL="postgresql://user:pass@ep-xyz.neon.tech/shopkaro"

In India: Most popular choice in 2024 in the Next.js community
```

---

### Supabase
**Tag: 🟢 PostgreSQL + Everything | Firebase Alternative**

```
What it is: PostgreSQL + Auth + Storage + Realtime + Edge Functions — all in one
When to use:
  → Replacing Firebase (open-source alternative)
  → Quick backend needed — less backend code
  → Real-time features needed
  → Auth, storage all in one place

Difference from Firebase:
  → Supabase: Open-source, PostgreSQL (SQL), self-host possible
  → Firebase: Google, proprietary, NoSQL

Real app example:
  → Indie developers' apps — backend quickly built
  → Startup MVPs — everything on one platform

Code feel:
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)

Cons:
  → Vendor lock-in (but it's open-source, self-host possible)
  → Limitations in complex apps

In India: Growing among indie devs, small startups
```

---

### PlanetScale
**Tag: 🟡 MySQL serverless | Was popular 2022-23 | Free tier removed**

```
What it is: Serverless MySQL — branching like Neon
Status: Free tier removed in 2024 → Many users left
Prefer Neon (PostgreSQL) instead

When to use: Existing PlanetScale codebase or MySQL required specifically
```

---

### Railway
**Tag: 🟢 Simple | Full platform | Good for starters**

```
What it is: Deploy everything platform — PostgreSQL + Redis + backend all in one place
When to use:
  → Want Vercel-like simplicity but for backend too
  → Database + Node server together needed
  → Want something different from Neon or Supabase

Free tier: Limited but good for prototyping
In India: Growing — especially full-stack projects
```

---

## Quick Decision

```
New project, need PostgreSQL?
  → Neon (with Vercel) or Supabase (all-in-one)

WordPress/PHP?
  → MySQL (required)

Local development / prototype?
  → SQLite

Replacing Firebase?
  → Supabase

Enterprise, full control?
  → Self-hosted PostgreSQL (AWS RDS or DigitalOcean)

Edge database?
  → Turso (SQLite at edge)
```

---

## India Reality

```
Next.js startups (2024):    Neon or Supabase
Traditional apps:           MySQL (old) or PostgreSQL (new)
Firebase users:             Migrating to Supabase
Enterprise:                 AWS RDS PostgreSQL or MySQL
Learning:                   SQLite (local) → Neon (deploy)
```

---

## Next Doc

`15-database-nosql.md` — NoSQL Databases — MongoDB, Redis, DynamoDB, Firestore — when to leave SQL, Redis cache vs database, Firebase vs Supabase.
