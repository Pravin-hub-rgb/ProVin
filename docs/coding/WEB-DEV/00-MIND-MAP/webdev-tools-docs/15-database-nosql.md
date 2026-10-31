# 15 — NoSQL Databases: MongoDB, Redis, DynamoDB, Firestore

> Umbrella: Database → NoSQL
> Job: Flexible document storage, caching, key-value — when SQL's rigidity isn't needed

---

### MongoDB
**Tag: 🟢 Most Popular NoSQL | Document database**

```
What it is: Document-based database — JSON-like documents
When to use:
  → Schema changes frequently
  → Nested/flexible data — product catalog with varying attributes
  → Content management systems
  → User activity logs

When to prefer over SQL:
  → Product catalog: one shoe has size/color, one laptop has RAM/processor → varying fields
  → CMS: every article's structure can differ
  → Social media posts: varying content types

Real app example:
  → MongoDB Atlas Search (Zomato-type search)
  → Content platforms — like Medium
  → Gaming leaderboards

ShopKaro: PostgreSQL is better — but MongoDB for user activity/analytics
In India: Popular in bootcamps (MERN stack) — production shifting to PostgreSQL
```

---

### Redis
**Tag: 🟢 Cache Standard | Sessions | Queues**

```
What it is: In-memory key-value store — ultra fast
When to use: (Multiple use cases)
  → Cache: Store database results — don't hit DB every time
  → Sessions: Store user sessions (fast access)
  → Queue: Backend for BullMQ
  → Rate limiting: "10 requests per minute per IP"
  → Pub/Sub: Simple real-time

Redis is not a database — it's for cache and temporary data

Real app example:
  → Swiggy: Restaurant list cache — don't hit DB on every request
  → Zomato: Rate limiting — one user can't spam the API
  → BullMQ: Queues on Redis

In India: Almost always in production apps — alongside the DB
```

---

### Firestore / Firebase
**Tag: 🟢 Google | Real-time | Mobile-first**

```
What it is: Google's NoSQL cloud database — real-time sync built-in
When to use:
  → Mobile apps (React Native) — Firebase SDK is mature
  → Real-time sync needed (without Socket.io)
  → Google ecosystem
  → Quick MVP — minimum backend code

Difference from Supabase:
  → Firebase: Proprietary, Google, NoSQL
  → Supabase: Open-source, PostgreSQL, SQL

Real app example:
  → Many Indian mobile apps (early stage startups)
  → Chat apps — real-time sync built-in

In India: Popular in mobile apps — competition from Supabase growing
```

---

### DynamoDB
**Tag: 🟢 AWS | Infinite Scale | Complex**

```
What it is: AWS's managed NoSQL — for extreme scale
When to use:
  → Already in the AWS ecosystem
  → Millions of users, extreme scale
  → Serverless (Lambda + DynamoDB combo)

Complex: Data modeling in DynamoDB is very different — high learning curve
In India: Large companies on AWS (Flipkart type)
```

---

## Next Doc

Search databases are covered in `16-database-search.md` — Algolia, Elasticsearch, Typesense.
