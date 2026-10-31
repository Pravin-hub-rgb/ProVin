# 19 — DevOps: Hosting, CI/CD, Monitoring

> Umbrella: DevOps / Infra
> Job: Deploy the app, automatically test + deploy, track errors
> ShopKaro docs: Vercel covered in Doc 44

---

## Three Sub-categories

```
HOSTING:    Where does the app run? (Vercel, Railway, AWS)
CI/CD:      Code push → Automatically test + deploy (GitHub Actions)
MONITORING: Did something break? Track errors (Sentry)
```

---

## Hosting

---

### Vercel
**Tag: 🟢 Next.js Standard | Easiest | Recommended**

```
What it is: Frontend + Serverless deployment platform — made by Next.js creators
When to use: Next.js project → almost always Vercel

Features:
  → GitHub push → Auto deploy
  → Preview URLs for every PR
  → Global CDN automatic
  → Serverless functions (Next.js API routes)
  → Analytics built-in

Free tier: Generous — plenty for side projects
Cons: Expensive at scale, serverless limitations (no WebSocket, no long processes)

In India: Default choice for Next.js projects
```

---

### Netlify
**Tag: 🟢 Frontend | JAMstack | Static Sites**

```
What it is: Static site + serverless platform
When to use:
  → Static sites, Gatsby, Astro
  → Vercel alternative

Difference from Vercel:
  → Netlify: Historically better for static sites
  → Vercel: Better for Next.js
  → 2024: Both have similar features — prefer Vercel for Next.js
```

---

### Railway
**Tag: 🟢 Full Stack | Simple | Good for beginners**

```
What it is: Deploy everything — Node.js, PostgreSQL, Redis, everything in one place
When to use:
  → Need a full backend server (WebSocket, long processes)
  → Vercel's serverless won't work
  → Want everything on one platform (app + database)

Real app example:
  → Express/NestJS backends
  → Socket.io apps (need WebSocket)
  → ShopKaro if a dedicated server is needed

Free tier: Limited but good for learning
In India: Growing — especially backend developers
```

---

### Render
**Tag: 🟢 Heroku Alternative | Simple**

```
What it is: Web services, databases, cron jobs — Heroku replacement
When to use:
  → Migrating from Heroku
  → Simple server deployment

Heroku: Free tier ended in 2022 → Render is the most popular alternative
```

---

### Fly.io
**Tag: 🟢 Containers | Global | Docker**

```
What it is: Deploy Docker containers globally
When to use:
  → Using Docker
  → Global low-latency needed
  → Facing Vercel limitations

Real app example: Apps that need to deploy in multiple regions
```

---

### AWS / GCP / Azure
**Tag: 🟢 Enterprise | Everything | Complex**

```
What it is: Full cloud platforms — infinite services
When to use:
  → Enterprise scale
  → Specific AWS services needed (Lambda, S3, SES, SQS)
  → Existing cloud commitment

Learning curve: High — usually needs a dedicated DevOps/Cloud engineer
In India: Large companies, enterprise (Flipkart, Zomato at scale)
```

---

### Cloudflare Pages + Workers
**Tag: 🟢 Edge | Fast | Growing**

```
What it is: Edge deployment — globally distributed, ultra-fast
When to use:
  → Edge computing needed
  → Hono + Drizzle + Cloudflare stack

Workers = Serverless functions at the edge (like Vercel but on Cloudflare network)
In India: Growing — especially performance-conscious developers
```

---

## CI/CD

---

### GitHub Actions
**Tag: 🟢 Most Popular | Free for public repos**

```
What it is: Code push → Automatically run tests → Deploy
When to use: Using GitHub → GitHub Actions (default)

Code feel:
  # .github/workflows/deploy.yml
  on: push
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - run: npm install
        - run: npm test
    deploy:
      needs: test
      steps:
        - run: vercel deploy --prod

Real app example:
  → ShopKaro: Push to main → Tests run → If pass → Vercel deploy

In India: Almost standard — especially Vercel + GitHub combo
```

---

## Monitoring + Error Tracking

---

### Sentry
**Tag: 🟢 Error Tracking Standard**

```
What it is: Error tracking — when did what error happen, which user, what context
When to use: Production app → Always Sentry (or some error tracker)

Real app example:
  → ShopKaro: Checkout crashes for Priya → Shows up in Sentry → Fix it

Code feel:
  import * as Sentry from "@sentry/nextjs"
  Sentry.init({ dsn: process.env.SENTRY_DSN })
  // Now any unhandled error → Sentry dashboard

Free tier: 5000 errors/month — plenty to start
In India: Standard in production apps
```

---

### PostHog
**Tag: 🟢 Analytics + Feature Flags | Privacy-friendly**

```
What it is: Product analytics — track what users do + feature flags
Feature flags: "Show new checkout to 20% of users" → A/B testing

Real app example:
  → Swiggy: "Test new UI on 10% of users" → Feature flag
  → ShopKaro: "How many users reach cart, how many checkout" → Analytics

In India: Growing — Google Analytics alternative (privacy-friendly)
```

---

### LogRocket
**Tag: 🟢 Session Replay | Frontend debugging**

```
What it is: Record the user's session — exactly what happened before the error
When to use: Beyond Sentry — need visual error context

Real app example: "Priya's order failed — check LogRocket to see exactly what she clicked"
```

---

## Quick Decision

```
Deploying Next.js?
  → Vercel (default)

Full backend server (WebSocket, long processes)?
  → Railway or Render

Using Docker?
  → Fly.io

Enterprise?
  → AWS or GCP

CI/CD?
  → GitHub Actions (almost always)

Error tracking?
  → Sentry (always in production)

Analytics?
  → PostHog (privacy) or Google Analytics (free)
```

---

## Next Doc

`20-meta-tools.md` — Meta Tools — TypeScript, tRPC, Zod, Monorepos, Package Managers — the final doc of the series.
