You've built apps. A React frontend, a backend, a database — they work on your machine, and they work when you demo them. Then one thought shows up: what happens when the users stop being 10 and become 10,000? Or 10,00,000? Does the same app just… keep working?

That question is **System Design**.

# System Design — Course Plan

**System Design** is deciding how the pieces of an app — servers, databases, caches, queues — fit together, so the app keeps working as data and traffic grow. That's the whole definition. Everything else in this course is detail on top of it.

## Who This Course Is For

Someone hearing the words "System Design" for the **first time** — but who already knows basic web development:

- You know a browser sends a **request** and gets a **response**
- You know an app has a **frontend** and a **backend**
- You know a **database** stores data
- You've used React/Next.js or similar

That's genuinely enough. No cloud account, no DevOps background, no prior big-system experience assumed.

## The Golden Rule — This Course Runs on It

Nobody adds a tool because a roadmap lists it. **A problem forces every tool in — and every tool brings a new problem along.**

You already know this rule from web dev. You don't add a state-management library on day 1 of a React app. You add it when prop drilling hurts. The library solved one problem (prop drilling) and created a new one (another layer to learn and maintain).

System Design runs on the exact same rule — just for servers, data, and traffic instead of components. So this course keeps asking only two questions about every tool:

1. **What problem forced it in?**
2. **What new problem did it bring?**

If a topic can't answer both, it doesn't belong in the course.

## The Whole Picture — One Order on One Store

The spine of this course: **one customer clicks "Place Order" on an online store** — and we follow that click through every box it touches. Here's the rough map. Don't study it yet. By the end of Batch 1, you'll be able to explain every single box.

**The request path:**

```
                     ┌─────────────────────┐
                     │       Customer      │
                     │  (browser: shop.com)│
                     └──────────┬──────────┘
                                │ clicks "Place Order"
                                ▼
                     ┌─────────────────────┐
                     │         DNS         │   domain → IP address
                     └──────────┬──────────┘
                                ▼
                     ┌─────────────────────┐
                     │    Load Balancer    │   sends traffic to healthy servers only
                     └──────────┬──────────┘
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
          ┌───────────┐   ┌───────────┐   ┌───────────┐
          │ Backend 1 │   │ Backend 2 │   │ Backend N │  ← all run the SAME Docker image
          └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
                └───────────┬───┴───────────────┘
                            ▼
  ┌──────────────────────────────────────────────────────────┐
  │                       DATA LAYER                         │
  │                                                          │
  │  PostgreSQL        Redis        OpenSearch       S3      │
  │  source of truth   fast copies    typo-proof     files   │
  │  (orders, users)   of hot data    search + rank (images) │
  └─────────────────────────────┬────────────────────────────┘
                                │ order saved
                                ▼
                     ┌─────────────────┐        ┌────────────────────┐
                     │      Queue      │ ─────► │      Workers        │
                     │ (slow work      │        │ email · invoice ·  │
                     │  waits here)    │        │ warehouse · events │
                     └─────────────────┘        └────────────────────┘
```

**The two side-strips:**

```
  HOW CODE GETS THERE                       HOW WE WATCH IT
  ───────────────────                       ────────────────
  git push                                  Prometheus   → metrics ("it's slow")
     │                                      Grafana      → the graphs
     ▼                                      OpenTelemetry→ collects the data
  CI: tests → Docker image → Registry       Jaeger       → traces ("THIS step is slow")
     │
     ▼
  ECS / Kubernetes run the new image
  (Terraform built the servers + network underneath)
```

Three layers, one story: **foundation** (Docker, Kubernetes/ECS, Terraform) runs the app, the **application** layer (backend, Postgres, Redis, OpenSearch, S3, queues) handles the order, and **operations** (CI/CD, GitOps, observability) keeps it changing safely and tells you what's happening. Every box arrived because a problem forced it — that's what Batch 1 proves, box by box.

## Batch 1 — The Whole Premise (Theory Only)

Eleven short docs. Read in order. No code to install, no cloud account, no subscriptions — pure understanding.

| # | Topic | Problem that forces it | New problem it creates |
|---|---|---|---|
| 1.1 | What is System Design | "it works on my machine" stops being enough | — (this doc is the lens for everything else) |
| 1.2 | The Journey of One Order | you can't understand a box without seeing the whole map | the map is big — that's why the rest of the batch exists |
| 1.3 | DNS + Load Balancer | one server dies, the app dies; requests must find healthy servers | now there are many servers — who decides where traffic goes |
| 1.4 | PostgreSQL — the source of truth | order data must be stored correctly and survive | at high traffic, the same query runs thousands of times per second — the DB slows |
| 1.5 | Redis — caching | the DB drowns in repeated reads of the same data | the copy goes stale when data changes — cache invalidation |
| 1.6 | OpenSearch — search | DB search can't rank results or survive typos at scale | one more place where data must be copied and synced |
| 1.7 | S3 — files | binary files (images, uploads) bloat and slow the DB | files live outside the DB — tables store URLs instead |
| 1.8 | Queues + Workers | the customer shouldn't wait for email, invoice, warehouse work | the same message can arrive twice — workers need idempotency |
| 1.9 | How Code Reaches Production | manual deploys drift — servers forget what they're supposed to run | the pipeline itself needs rules — GitOps: Git is the source of truth |
| 1.10 | Observability | "the order is slow" — but WHERE? metrics show symptoms, not causes | the app must be wired to emit this data — installing tools alone gives nothing |
| 1.11 | The Golden Rule | every tool solves one problem and creates one — the batch's own summary | knowing when to STOP: start simple, add a box only when it hurts |

### The Batch 1 Contract

After reading 1.1 → 1.11 in order, that big diagram should read like a **story**, not a map. Concretely, you should be able to:

1. Point at any box and say **what problem forced it in**
2. Say in one line **what it does with the data**
3. Say **what new problem it brought**
4. Explain why the honest answer to "which tools should my app use?" is almost always **"start simple — add a box when it hurts"**

That's the whole picture. Deep dives come later — every box gets its own batch.

## What Batch 1 Is NOT

- **Not a coding batch** — nothing to install, no cloud accounts, no subscriptions
- **Not tool tutorials** — we learn problems; tools are just the cast that solves them
- **Not deep dives** — replication, sharding, CAP, scaling math: later batches
- **Not interview drills** — the 45-minute "design a Twitter" round format is Batch 5

## Batches After Batch 1 (Sketch)

| Batch | Focus | Boxes it deep-dives |
|---|---|---|
| Batch 2 — The Request Path | scaling, health checks, CDNs, rate limiting | DNS, Load Balancer, backends |
| Batch 3 — The Data Layer | indexes, replication, sharding, cache patterns, CAP | PostgreSQL, Redis, OpenSearch, S3 |
| Batch 4 — Async + Delivery | queues deep, Kafka vs queues, real CI/CD | Queue, Workers, CI/CD, GitOps |
| Batch 5 — Observability + Interviews | tracing deep, then the interview round format | Prometheus, Grafana, Jaeger, OTel |

(Adjust per project as we go — the batch-1 table is the commitment, this sketch is direction.)

## Check Yourself

1. A friend says "I'm learning System Design — which tools should I learn first?" What's wrong with the question itself?

   <details>
   <summary>Sample Answer</summary>

   Tools-first is backwards. The right unit is problem → tool: what problem are you facing (traffic grew? DB slow? deploys drift?), and only then which tool solves it. Every tool also brings a new problem — so the real skill is knowing what forced a tool in and when to stop adding more.
   </details>

2. In the one-order diagram, why do PostgreSQL and Redis BOTH exist? Why not just one?

   <details>
   <summary>Sample Answer</summary>

   They hold data differently. PostgreSQL is the source of truth — data lives there correctly and permanently. Redis keeps fast, in-memory COPIES of hot data so repeated reads don't hammer the DB. Kill Redis and the app still works (just slower); kill Postgres and the orders themselves are gone. The cost of having both: the copy can go stale — cache invalidation.
   </details>

## What's Next

**1.1 — What is System Design** starts the batch: the full definition, what it is NOT, and why you've already done a tiny version of it without knowing.
