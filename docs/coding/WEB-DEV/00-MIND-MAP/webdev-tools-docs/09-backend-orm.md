# 09 — ORMs: Prisma, Drizzle, Sequelize, TypeORM, Mongoose

> Umbrella: Backend → ORM (Object Relational Mapper)
> Purpose: Talking to the database in JavaScript — no need to write SQL
> ShopKaro docs: Prisma covered in Doc 21

---

## Why Use an ORM

```
Raw SQL:
  SELECT u.name, o.id, o.total
  FROM users u
  JOIN orders o ON u.id = o.userId
  WHERE u.id = 1 AND o.status = 'paid'

Prisma (ORM):
  prisma.order.findMany({
    where: { userId: 1, status: 'PAID' },
    include: { user: true }
  })

ORM advantages:
  → Write in JavaScript/TypeScript
  → Auto-complete, type safety
  → Easier to switch databases
  → Manage migrations
```

---

## Tools

---

### Prisma
**Tag: 🟢 Most Popular 2024 | TypeScript-first | Recommended**

```
What it is: Next-generation ORM — schema-first, TypeScript-first
When to use:
  → TypeScript project (Next.js, NestJS)
  → PostgreSQL or MySQL or SQLite
  → App like ShopKaro — almost always

Real app example:
  → ShopKaro: User, Product, Order, Cart tables
  → Majority of new Indian startups
  → Vercel, Supabase examples — use Prisma

Unique features:
  → Types auto-generate from schema
  → Prisma Studio — visual database browser
  → Migrations built-in

Code feel:
  // Define schema
  model User {
    id    Int    @id @default(autoincrement())
    email String @unique
    name  String?
  }

  // Query — fully typed
  const user = await prisma.user.findUnique({
    where: { email: 'priya@gmail.com' }
  })
  // user.email → TypeScript knows it's a string

Cons:
  → Verbose for complex queries
  → Raw SQL sometimes more efficient
  → Bundle size (Prisma Client is big)

In India: Rapidly adopted after 2022 — especially Next.js projects
```

---

### Drizzle
**Tag: 🟢 Growing Fast | Lightweight | SQL-like syntax**

```
What it is: TypeScript ORM — SQL-like syntax, lightweight
When to use:
  → Want a different feel from Prisma
  → Comfortable with SQL — write SQL expressions in Drizzle
  → Edge environments (Cloudflare Workers) — Prisma doesn't run there
  → Bundle size critical

Difference from Prisma:
  → Drizzle: SQL-like syntax — SELECT, WHERE expressions
  → Prisma: Higher-level abstraction
  → Drizzle: Edge-ready (Cloudflare Workers)
  → Prisma: Not edge-compatible (yet)
  → Drizzle: Smaller bundle

Code feel:
  // Schema
  const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
  })

  // Query — SQL-like
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, 'priya@gmail.com'))

In India: Growing — especially in Hono + Cloudflare Workers combo
Trend: Prisma vs Drizzle debate growing in 2024
```

---

### Sequelize
**Tag: 🟡 Legacy | Was popular 2016-2021**

```
What it is: Oldest popular Node.js ORM
When to use:
  → Existing Sequelize codebase
  → Avoid in new projects

What's worse than Prisma:
  → TypeScript support poor (afterthought)
  → Complex queries very verbose
  → Clunky migration system

In India: Found a lot in older projects (bootcamp era)
```

---

### TypeORM
**Tag: 🟡 NestJS common | Decorator-based**

```
What it is: Decorator-based ORM — commonly used with NestJS
When to use:
  → NestJS project (common pair)
  → Need Active Record or Data Mapper pattern
  → Existing TypeORM codebase

Outside NestJS:
  → Prefer Drizzle or Prisma

Code feel:
  @Entity()
  class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string
  }

In India: Enterprise projects with NestJS
```

---

### Mongoose
**Tag: 🟢 MongoDB Standard | Almost required for MongoDB**

```
What it is: ODM (Object Document Mapper) for MongoDB — ORM's NoSQL equivalent
When to use:
  → Using MongoDB → almost always Mongoose

Using raw MongoDB driver is complex — Mongoose simplifies it

Code feel:
  const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: String
  })
  const User = model('User', userSchema)

  const user = await User.findOne({ email: 'priya@gmail.com' })

Difference from Prisma:
  → Mongoose: MongoDB only
  → Prisma: PostgreSQL, MySQL, MongoDB (beta) — multi-DB

In India: Standard in projects using MongoDB
```

---

### Kysely
**Tag: 🔵 SQL Query Builder | Type-safe | Not a full ORM**

```
What it is: Type-safe SQL query builder — not an ORM, a raw SQL helper
When to use:
  → Don't want a full ORM — want SQL control
  → Complex queries where ORM abstracts too much
  → Like Drizzle but different API

Code feel:
  const result = await db
    .selectFrom('users')
    .where('email', '=', 'priya@gmail.com')
    .selectAll()
    .executeTakeFirst()
```

---

## Quick Decision

```
PostgreSQL/MySQL, TypeScript project?
  → Prisma (default choice)

Edge environment (Cloudflare Workers)?
  → Drizzle (Prisma doesn't run on edge)

NestJS project?
  → TypeORM or Prisma (both common)

MongoDB?
  → Mongoose

Comfortable with SQL, don't want full ORM?
  → Drizzle or Kysely

Existing codebase?
  → Use whatever's there — don't rewrite
```

---

## India Reality

```
Next.js startups (2024):   Prisma (strong preference)
NestJS enterprise:         TypeORM or Prisma
MongoDB projects:          Mongoose
Edge/Cloudflare:           Drizzle
Older projects:            Sequelize (found a lot)
Learning:                  Prisma (best docs, easiest start)
```

---

## Next Doc

`10-backend-realtime.md` — Real-time tools — Socket.io, Pusher, SSE — how Swiggy's live order tracking, Ola's driver location update works.
