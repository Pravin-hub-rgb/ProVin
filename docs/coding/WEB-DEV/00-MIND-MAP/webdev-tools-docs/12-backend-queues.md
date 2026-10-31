# 12 — Background Jobs + Queues: BullMQ, Inngest, Trigger.dev

> Umbrella: Backend → Background Jobs / Queues
> Job: Move heavy/slow tasks to the background — don't make the user wait
> Example: Order placed → User gets response → Background sends email

---

## Storage Types — In Full Detail

There are **3 types of storage** in web development — each with a different job:

```
┌─────────────────────────────────────────────────────────────────┐
│                     STORAGE TYPES OVERVIEW                       │
├─────────────────────────────────────────────────────────────────┤
│ 1. Client Side (Browser)     → Cookies, LocalStorage, Session   │
│ 2. Server Side - Database    → MongoDB, PostgreSQL, MySQL       │
│ 3. Server Side - Cache/Queue → Redis, Memcached                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 1. Client Side Storage (In the Browser)

**Where it's stored:** In the user's browser
**When to use:** User-specific temporary data

#### A. Cookies
```javascript
// Size: 4KB max
// Lifetime: Can be set (days, months, years)
// Use: Authentication tokens, preferences

document.cookie = "token=abc123; max-age=86400; path=/";
// Set from server (Next.js):
res.setHeader('Set-Cookie', 'token=abc123; HttpOnly; Secure');
```

**Next.js Example:**
```javascript
// next.config.js
export const middleware = (request) => {
  const token = request.cookies.get('auth-token')?.value;
  // Check token
};
```

#### B. LocalStorage
```javascript
// Size: 5-10MB (browser dependent)
// Lifetime: Forever (until cleared)
// Use: User preferences, cached data, cart items

localStorage.setItem('cart', JSON.stringify([item1, item2]));
const cart = JSON.parse(localStorage.getItem('cart'));
```

**Next.js Example:**
```javascript
// In a client component
'use client';
import { useEffect, useState } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);
}
```

#### C. SessionStorage
```javascript
// Size: 5-10MB
// Lifetime: Deleted when tab closes
// Use: Temporary session data

sessionStorage.setItem('currentPage', 'checkout');
// Close tab → everything deleted
```

#### D. IndexedDB
```javascript
// Size: Unlimited (practically)
// Lifetime: Forever
// Use: Large structured data, offline apps

// Example: Storing offline data in a PWA
const db = await indexedDB.open('MyAppDB', 1);
```

---

### 2. Server Side - Permanent Database

**Where it's stored:** On server/cloud
**When to use:** Permanent, structured data

#### A. SQL Databases (PostgreSQL, MySQL)
```javascript
// Structured data, relationships
// Use: Users, Orders, Products, Transactions

// Prisma + PostgreSQL example
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create a user
const user = await prisma.user.create({
  data: {
    email: 'priya@gmail.com',
    name: 'Priya',
    orders: {
      create: { total: 500, status: 'pending' }
    }
  }
});
```

**Next.js Example:**
```javascript
// app/api/users/route.js
import { prisma } from '@/lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}
```

#### B. NoSQL Databases (MongoDB)
```javascript
// Flexible schema, documents
// Use: Logs, analytics, flexible data

// MongoDB + Mongoose example
const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  total: Number,
  status: String
});

const Order = mongoose.model('Order', orderSchema);
await Order.create({ userId: '123', items: [...], total: 500 });
```

**Next.js Example:**
```javascript
// app/api/orders/route.js
import Order from '@/models/Order';

export async function POST(req) {
  const body = await req.json();
  const order = await Order.create(body);
  return Response.json(order);
}
```

---

### 3. Server Side - Cache/Queue (Temporary Fast Storage)

**Where it's stored:** On server/cloud (RAM based)
**When to use:** Temporary data, fast access, background jobs

#### A. Redis (In-Memory Data Store)
```
Redis = In-memory key-value database
Speed: RAM based → Response in milliseconds
Use Cases:
  → Cache (frequently accessed data)
  → Queue (background jobs)
  → Session store
  → Rate limiting
```

**What Redis Is in Simple Words:**
```
Normal Database (MongoDB/PostgreSQL):
  → Stored on disk
  → Slow (milliseconds to seconds)
  → For permanent data

Redis:
  → Stored in RAM
  → Super fast (microseconds)
  → For temporary data
  → Data is lost on restart (unless persisted)
```

**Main Redis Use Cases:**

```javascript
// 1. CACHE - Frequently accessed data
const cachedUser = await redis.get('user:123');
if (!cachedUser) {
  const user = await db.user.findById(123);
  await redis.setex('user:123', 3600, JSON.stringify(user)); // 1 hour cache
}

// 2. QUEUE - Background jobs
await redis.lpush('email-queue', JSON.stringify({
  to: 'user@gmail.com',
  subject: 'Welcome!'
}));
// Worker will process it

// 3. SESSION STORE - User sessions
await redis.setex(`session:${sessionId}`, 86400, userData);

// 4. RATE LIMITING - API call limits
const count = await redis.incr(`rate:${userId}`);
if (count > 100) {
  // Block user for 1 minute
  await redis.setex(`blocked:${userId}`, 60, 'true');
}
```

**Next.js + Redis Setup:**

```bash
# Install Redis client
npm install redis
# Or for serverless
npm install @upstash/redis
```

```javascript
// lib/redis.js
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN
});
```

```javascript
// app/api/cache-example/route.js
import { redis } from '@/lib/redis';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // Check cache first
  let products = await redis.get('products');

  if (!products) {
    // Cache miss - fetch from database
    products = await prisma.product.findMany();
    // Store in cache for 5 minutes
    await redis.setex('products', 300, JSON.stringify(products));
  } else {
    // Cache hit - get back from Redis
    products = JSON.parse(products);
  }

  return Response.json(products);
}
```

---

### Storage Types Comparison Table

```
┌──────────────────┬─────────────┬──────────────┬─────────────────────┐
│ Storage Type     │ Size Limit  │ Speed        │ Use Case            │
├──────────────────┼─────────────┼──────────────┼─────────────────────┤
│ Cookies          │ 4KB         │ Fast         │ Auth tokens         │
│ LocalStorage     │ 5-10MB      │ Fast         │ User preferences    │
│ SessionStorage   │ 5-10MB      │ Fast         │ Tab session data    │
│ IndexedDB        │ Unlimited   │ Medium       │ Offline data        │
├──────────────────┼─────────────┼──────────────┼─────────────────────┤
│ PostgreSQL       │ Unlimited   │ Medium       │ Structured data     │
│ MongoDB          │ Unlimited   │ Medium       │ Flexible documents  │
│ MySQL            │ Unlimited   │ Medium       │ Traditional apps    │
├──────────────────┼─────────────┼──────────────┼─────────────────────┤
│ Redis            │ RAM limit   │ Super Fast   │ Cache, Queue        │
│ Memcached        │ RAM limit   │ Super Fast   │ Cache only          │
└──────────────────┴─────────────┴──────────────┴─────────────────────┘
```

---

### Next.js Default Setup (Without Redis)

**Most Next.js apps can run without Redis at the start:**

```javascript
// Typical Next.js setup:
// 1. Database: MongoDB/PostgreSQL (Prisma)
// 2. Auth: NextAuth.js (database sessions)
// 3. Cache: Next.js built-in cache (revalidatePath)
// 4. Storage: Vercel Blob / AWS S3 (file uploads)

// Example: Full stack e-commerce without Redis
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  const order = await prisma.order.create({...});

  // Send email synchronously (a bit slow but okay for small apps)
  await sendEmail(order);

  return Response.json(order);
}
```

**When to Add Redis:**

```
✅ Add Redis when:
  → 1000+ daily active users
  → Background jobs needed (email, notifications)
  → High traffic, to reduce load on the database
  → Rate limiting needed
  → Real-time features (chat, notifications)

❌ Don't need Redis when:
  → < 1000 daily users
  → Simple CRUD app
  → Everything can be done synchronously
  → Budget is tight (managed Redis costs money)
```

---

## Redis Deep Dive

### Redis Data Structures for Queues

```javascript
// 1. LIST - Simple queue (FIFO)
await redis.lpush('queue', 'job1');
await redis.lpush('queue', 'job2');
const job = await redis.rpop('queue'); // job1 comes back

// 2. SORTED SET - Priority queue
await redis.zadd('priority-queue', 10, 'high-priority-job');
await redis.zadd('priority-queue', 1, 'low-priority-job');
const job = await redis.zpopmin('priority-queue'); // low priority first

// 3. STREAMS - Event streaming (advanced)
await redis.xadd('events', '*', 'type', 'order', 'id', '123');
const events = await redis.xread({ key: 'events', id: '0' });
```

### Redis Persistence

```javascript
// Redis data lives in RAM, but can be persisted too:

// RDB (Snapshot)
// → Takes periodic snapshots
// → Fast recovery
// → Some data loss possible

// AOF (Append Only File)
// → Logs every operation
// → Zero data loss
// → Slow recovery

// Managed Redis (Upstash, Redis Cloud):
// → Both RDB + AOF on by default
// → Automatic backups
// → No configuration needed
```

---

## Why This Is Needed

Priya placed an order:

```
Without a queue:
Order save → Send email → Generate invoice → Send SMS → Return response
User waits 5 seconds → Bad UX

With a queue:
Order save → Return response immediately → Background: email, invoice, SMS
User immediately sees "Order placed!" → Good UX
```

Benefits of background jobs:
- User doesn't have to wait for slow tasks
- Automatic retry on failure
- Heavy tasks can be spread out

---

## Tools

---

### BullMQ
**Tag: 🟢 Most Popular | Redis-based | Battle-tested**

```
What it is: Redis-based job queue — most popular for Node.js
When to use:
  → Self-hosted backend (Express, Fastify, NestJS)
  → Redis already there or can be added
  → Complex queue logic — priorities, delayed jobs, repeatable jobs

Real app example:
  → Swiggy: Order placed → pushed to queue → Worker processes:
    - Restaurant notification
    - Driver assignment
    - Customer confirmation email
    - Analytics event
  → Zomato: Image processing queue (resize restaurant photos)

Code feel:
  // Add a job (producer)
  const emailQueue = new Queue('emails', { connection: redis })
  await emailQueue.add('order-confirmation', {
    userId: 1, orderId: 123, email: 'priya@gmail.com'
  })

  // Worker — process the job
  const worker = new Worker('emails', async (job) => {
    await sendOrderConfirmationEmail(job.data)
  }, { connection: redis })

Features:
  → Retry on failure — automatic
  → Delayed jobs — "send a reminder after 1 hour"
  → Repeatable jobs — "generate the report every night at 2 AM"
  → Job priorities
  → Concurrency control

Cons:
  → Redis required — extra infra
  → Doesn't run directly on serverless

In India: Most common choice in production apps
```

---

### Inngest
**Tag: 🟢 Managed | Serverless-friendly | Growing**

```
What it is: Managed background job service — works on serverless too
When to use:
  → Deploying on Vercel (serverless)
  → Don't want to manage Redis
  → Event-driven workflows

Difference from BullMQ:
  → Inngest: Managed service, no Redis needed, serverless-friendly
  → BullMQ: Self-hosted, Redis required, traditional servers

Code feel:
  // Define a function
  const sendWelcomeEmail = inngest.createFunction(
    { id: 'send-welcome-email' },
    { event: 'user.signup' },
    async ({ event, step }) => {
      await step.run('send-email', async () => {
        await resend.emails.send({ to: event.data.email, ... })
      })
      await step.sleep('wait-1-day', '1d')
      await step.run('send-tips', async () => {
        await resend.emails.send({ to: event.data.email, subject: 'Tips...' })
      })
    }
  )

  // Trigger an event
  await inngest.send({ name: 'user.signup', data: { email: 'priya@gmail.com' } })

Special:
  → Step functions — multi-step workflows with waits
  → Automatic retry
  → Dashboard for monitoring

Real app example:
  → Next.js on Vercel + Inngest → Serverless background jobs
  → SaaS onboarding flows (welcome email → day 1 tips → day 7 check-in)

In India: Growing — especially Vercel users
```

---

### Trigger.dev
**Tag: 🟢 Modern | TypeScript-first | Growing**

```
What it is: Background jobs for the modern stack — TypeScript-first
When to use:
  → TypeScript project
  → Long-running tasks (minutes or hours)
  → AI tasks (slow LLM calls)

Difference from Inngest:
  → Similar concept — both managed, serverless-friendly
  → Trigger.dev: Better for long-running tasks (minutes/hours)
  → Inngest: Better for event-driven short workflows

Real app example:
  → AI processing jobs (parse PDF → summarize with AI → store)
  → Data sync jobs

In India: Growing — popular in AI apps
```

---

### node-cron
**Tag: 🟢 Simple | Cron jobs | No queue**

```
What it is: Cron job scheduler — run a task at a specific time
When to use:
  → Simple scheduled tasks — no queue needed
  → "Clean the database every night at midnight"
  → "Generate a report every hour"

Cron syntax:
  cron.schedule('0 0 * * *', async () => {
    // Every night at midnight
    await cleanExpiredSessions()
  })

  cron.schedule('*/5 * * * *', async () => {
    // Every 5 minutes
    await syncInventory()
  })

Difference from BullMQ:
  → node-cron: Scheduled tasks only (time-based)
  → BullMQ: Queue — event-based, retry, priorities

Cons:
  → Multiple servers → Multiple cron instances → Problem
  → Doesn't run on serverless
```

---

### Agenda
**Tag: 🟡 MongoDB-based | Older**

```
What it is: MongoDB-based job queue
When to use:
  → Using MongoDB, no Redis
  → Existing Agenda codebase

Why it's worse than BullMQ:
  → MongoDB is slow for queue operations
  → BullMQ on Redis → Much faster

Status: Maintained, but BullMQ is preferred
```

---

## Quick Decision

```
Serverless (Vercel)?
  → Inngest or Trigger.dev

Traditional server, Redis available?
  → BullMQ

Simple time-based tasks only?
  → node-cron

Long-running AI/processing tasks?
  → Trigger.dev

Need a queue on MongoDB?
  → Agenda (but add Redis for BullMQ instead)
```

---

## When to Use This in ShopKaro

```
In V1: No queue needed
  → Sending email synchronously is okay (a bit slow but fine)

In V2 (more users):
  → BullMQ (self-hosted) or Inngest (Vercel)
  → Order placed → Queue → Email, notification, analytics

Jobs that will go into the queue:
  → Order confirmation email
  → Low stock alert (to admin)
  → Invoice PDF generation
  → Payment failure retry notification
```

---

## Next Doc

`13-backend-storage.md` — File Upload + Storage — Cloudinary, S3, Uploadthing — where ShopKaro's product images and Swiggy's restaurant photos are stored.
