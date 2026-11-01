After C.11, the Hiring Platform is secure — rate limits are in place, the audit table is clean, the error hierarchy is complete. Only one thing remains that turns this journey from "project built" to "**product shipped**": **deploy**. And after that, the part this whole capstone was designed for — showing it off on your **resume and in interviews.**

This is the last file of the course. Let's see it through to the end.

# Hiring Platform — Part 12: Deploy + Testing + Resume Guidance

## Step 1 — Push Code to GitHub

Vercel deploys git-based (remember 8.4): push → import → live. First, the repo:

```bash
git init
git add .
git commit -m "Hiring Platform - Next.js capstone"
git branch -M main
git remote add origin https://github.com/<your-username>/hiring-platform.git
git push -u origin main
```

**Before committing, check once:** `git status` — `.env`, `.env.local` should NOT be listed (C.11's check). Never push secrets.

## Step 2 — Vercel Import + Environment Variables

1. vercel.com → Sign in with GitHub → **Add New Project** → select your repo → Import
2. Framework is auto-detected (Next.js) — default build settings are fine
3. **Environment Variables section** — rebuild the full C.11 inventory here, in the dashboard:

| Var | Value source |
|---|---|
| `DATABASE_URL` | Neon console — the production project's connection string |
| `AUTH_SECRET` | Same as local (or generate a new one) |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | Same values |
| `GEMINI_API_KEY` | Same key (free tier works in prod too) |
| `STRIPE_SECRET_KEY` | Test-mode key (`sk_test_...`) — keeps the demo safe |
| `STRIPE_WEBHOOK_SECRET` | Placeholder for now — the production webhook is created in Step 3 |
| `BLOB_READ_WRITE_TOKEN` | Vercel dashboard → Storage tab → your Blob store → **Connect to Project** (the token auto-injects!) |

Click Deploy → ~2 min build → live URL (`hiring-platform.vercel.app`-style).

### Step 2.5 — Point External Services at the New URL (Where Most People Get Stuck)

After deploy, the app "runs" visually, but three things are still sitting on **localhost URLs** — the production flow breaks until they're updated:

**GitHub OAuth App:**
- github.com → Settings → Developer settings → OAuth App
- Add another callback URL line: `https://<your-app>.vercel.app/api/auth/callback/github`
- (Leave the localhost one too — both URLs allowed)

**Stripe Webhook:**
- Dashboard → Developers → Webhooks → Add endpoint
- URL: `https://<your-app>.vercel.app/api/stripe/webhook`
- Event: `checkout.session.completed`
- Copy the new signing secret (`whsec_...`) → **update `STRIPE_WEBHOOK_SECRET` in Vercel env vars** → Redeploy (env changes are only active after a redeploy)

> **Remember this pattern:** every external service that calls our callback/webhook (GitHub, Stripe) must be told the production URL. Local dev used CLI-tunnel/localhost; production uses the real domain. This is the classic "deployed but login doesn't work" bug.

## Step 3 — Production Integration Test Run

Run the full user journey end-to-end on the live URL — because the production environment is different (env vars, domains, real network):

1. Load home — jobs appear (Neon connection ✓)
2. Run search/filter (dynamic rendering in prod ✓)
3. Open a job detail — meta tags in view-source (ISR in prod ✓)
4. GitHub login → onboarding → employer setup (OAuth callback fix ✓)
5. Post a job + AI generate (Gemini from prod ✓)
6. Boost → Stripe test card 4242... → featured badge (webhook on prod URL ✓)
7. In another browser, become a candidate → apply + PDF upload → score appears? (Blob prod token ✓)
8. Employer → applicants page → ranked list + resume opens (proxy route in prod ✓)
9. `/jobs/nonsense` → custom 404; no crashes (error hierarchy ✓)

All green = **a production-grade product shipped.** 🚀

### Testing Summary Table — The Whole Capstone Matrix

| Feature | Happy path | Edge/guard |
|---|---|---|
| Listings (C.3) | Browse + search + filter | Invalid type param ignored; empty-state |
| Detail (C.4) | Slug render + SEO tags | Bad slug → 404; closed job → banner |
| Auth (C.5) | Login → onboarding → role sections | Guest redirect; cross-role block |
| Post job (C.6) | AI draft → publish → listed | Validation errors; slug collision suffix |
| Manage (C.7) | Toggle/delete/boost | Ownership 404; apps-stuck delete block; double-pay guard |
| Apply (C.8) | Upload → submit → success | File type/size; duplicate guard; closed-job block |
| Score (C.9) | Score + reason stored/shown | AI fail → application survives, null score |
| Applicants (C.10) | Ranked list + stats stream | Cross-employer 404; unscored nulls-last |
| Security (C.11) | Rate limits fire politely | 401/404 layers; secrets server-only |

Each row maps to a C-file — this table goes into the README too (next section).

## Step 4 — Course Recap: The Journey from React to Here

All at once — because the capstone used everything:

| Batch | Learned | In the capstone |
|---|---|---|
| Module 0 | Rendering mental models (RSC, hydration, caching) | Every page's strategy decision |
| 1 | Routing, layouts, dynamic routes, states | All pages + `[slug]` + loading/error/not-found |
| 2 | SC reads, CC split, ISR, SEO metadata | Listings + detail data layer |
| 3 | Route Handlers vs Server Actions | SA-first mutations; Route Handler only for webhook |
| 4 | Proxy deep-dive | Rate limiting layer (per-IP API throttle) |
| 5 | Auth manual → Auth.js | OAuth + roles + protected groups |
| 6 | DBs: Mongo/SQL/Prisma + relations + indexes | Prisma schema that carries the whole app |
| 7 | Images/fonts/streaming/modals | Logos + Suspense stats |
| 8 | Env/security/deploy | Today's audit + live deployment |
| Capstone | Everything together | **What you built** |

And the "Manual → Better" philosophy was in every batch — feel the problem, then the solution. That's the biggest lesson you take: not tools, but **reasoning.**

## Step 5 — Make It Resume-Worthy (The Real Finale)

A strong project only matters if the presentation is strong. Three deliverables:

### 5a — GitHub README Checklist

```
# HireBoard — AI-Powered Hiring Platform        ← give it a name, generic is fine

Live demo: https://... · LinkedIn post link

## Features
- AI job-description generator + candidate match scoring (Gemini)
- One-time Stripe checkout for featured listings (webhook-driven)
- PDF resume uploads via Vercel Blob (auth-gated downloads)
- Role-based access: employer/candidate protected route groups
- Streaming dashboards (Suspense), ISR job pages, full SEO

## Stack badges
Next.js 16 · TypeScript · Prisma · PostgreSQL(Neon) · Auth.js · Gemini API · Stripe · Tailwind

## Architecture (one simple diagram — ASCII/excalidraw even)
Browser → RSC pages → Server Actions → Prisma/Neon
                      ↘ Gemini / Blob / Stripe (webhook→route handler)

## Key decisions (write these deliberately — interview bait)
- Server Actions over REST for mutations; Route Handler only for Stripe webhook
- Ownership enforced at query level (`company.ownerId` filters), not UI
- Scores nullable by design — AI failure never loses an application
- In-memory rate limits documented as approximation; Redis upgrade path noted

## Run locally
.env.example + install/migrate/seed commands
```

3-4 screenshots: home, AI generator in action, ranked applicants, Stripe checkout.

### 5b — Resume Bullet Points (Copy-Style, Tweak as Needed)

- *Built and deployed a production-grade hiring platform (Next.js 16, TypeScript, Prisma/PostgreSQL) with AI-generated job descriptions and candidate-match scoring via the Gemini API*
- *Implemented payment monetization with Stripe Checkout and signature-verified webhooks, driving featured-listing purchases end-to-end*
- *Designed role-based auth (Auth.js/GitHub OAuth) with query-level ownership guards across multi-tenant data, plus layered rate limiting (in-action per-user, proxy per-IP)*
- *Optimized delivery with ISR, streaming Suspense dashboards, and next/image pipelines; security-audited and deployed on Vercel*

All four together: full-stack, payments, AI, auth, performance, security — six signals, four lines.

### 5c — Interview Talking Points (The Story Behind Each Bullet)

An interviewer asks: *"what was the most interesting problem in this project?"* — have the answer ready:

1. **"Why Server Actions over REST?"** — mutations are internal; explain the webhook exception (external caller). Knowing trade-offs makes you sound senior.
2. **"How does payment state stay trustworthy?"** — didn't trust the success URL; signature-verified webhook + idempotent handler. CVE-style thinking impresses.
3. **"What happens when AI fails?"** — nullable-score design: insert-first ordering, graceful degradation. Reliability mindset.
4. **"Multi-tenancy security?"** — query-level ownership filters + 404-not-403 enumeration defense.
5. **"Rate limits in serverless?"** — in-memory approximation named honestly, Redis upgrade path ready. Honesty beats hand-waving.

Notice the pattern in every answer: **decision + rejected alternative + why.** That "trade-off line" is now interview language.

## Try It Yourself — The Roadmap Ahead (Extensions)

The capstone ends, the playground begins — keep learning with these extensions:

1. **Email notifications** (Resend) — employer gets an email when someone applies; webhook-style async flow
2. **Semantic job search** — embeddings + vector similarity; "React developer" also matches "frontend engineer" jobs
3. **Employer subscriptions** — one-time boost → recurring plan (Stripe subscriptions + customer portal)
4. **Application status pipeline** — PENDING → REVIEWED → INTERVIEW → OFFER, with a timeline UI
5. **Tests** — Vitest unit (rate-limiter logic is a great candidate!) + Playwright e2e for the apply flow
6. **Custom domain** — Vercel's Domains section; DNS basics in practice

## Nutshell

Ship = **git push → Vercel import → transfer env vars → update external callbacks** (OAuth + Stripe webhook production URLs — the classic breakage point) → integration test run. Production-grade proof = the testing matrix (every feature's happy path + guard). Career-grade proof = **a README with key decisions**, **resume bullets with signals** (full-stack / payments / AI / auth / perf / security), and **trade-off-based interview answers**. The course's core promise is fulfilled here: from concepts to reasoning, from reasoning to product.

## What It Is NOT

- **A deployed project = "done for good" is NOT true.** A live app needs maintenance: dependency updates, quota monitoring, Neon/Blob usage checks. Shipping is a milestone, not the end of ownership.
- **Resume bullets = "license to exaggerate" is NOT true.** Every claim must be defensible in the interview — only put what you built/debugged yourself. If you don't understand it, don't list it — you'll get caught.
- **Testing matrix = "100% coverage" is NOT true.** It covers the happy paths + edge guards manually. An automated suite is the next level (extension #5). The matrix documents confidence, it doesn't certify.
- **An AI-generated README = "your story" is NOT true.** Take the structure, but write decisions and your own bugs/errors in your own words — authenticity shows in interviews.
- **Course complete = "learning is over" is NOT true.** The extensions list is intentionally short because real growth comes from choosing your own path — and that skill was taught here too.

---

## In Your Own Words

1. After deploy, login breaks — what's the first suspect, and where do you fix it?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The GitHub OAuth App's callback URL — it's still on `localhost:3000/api/auth/callback/github`. Fix it in GitHub's Developer settings: add the production domain's callback. Pattern: every external service (GitHub, Stripe) holds our URL in *their* config — deploying the code doesn't update their side.

</details>

2. Why track both "happy path" and "edge/guard" columns in the testing matrix — what's lost with happy paths alone?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Happy paths prove features work; guards prove you survive misuse. Users/recruiters hit edge cases, not demos. The guard column is visible evidence of security/reliability thinking — and it's a reminder during regression that invisible behavior must be preserved too.

</details>

3. You wrote "signature-verified webhooks" on your resume — if an interviewer says "explain," what's your 30-second answer?

<details>
<summary>Show Answer</summary>

**Sample Answer:** "Payment confirmation wasn't trusted from the client-controlled success URL; state changes only happen on Stripe's authenticated webhook — the raw body is HMAC-verified with `constructEvent`, the jobId comes from metadata, and the handler is idempotent for retry-safety." In one breath: threat, mechanism, data-flow, robustness — four signals.

</details>

4. Why a separate "key decisions" section in the README — isn't a features list enough?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Features say *what* you built; decisions say *how you thought*. Interviewers don't differentiate on features (everyone has CRUD) but on judgment. A decisions section shows the reviewer you weigh alternatives — the senior signal, regardless of title.

</details>

5. Why is semantic search first on the extensions list ahead of subscriptions — if the goal is maximizing resume impact?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Semantic search extends the AI narrative naturally (embeddings/vectors — a keyword-dense skill in 2026, already in the Gemini context). Subscriptions are valuable but common-pattern territory (follow-the-docs). Ranking by impact-per-effort: lead with what's both scarce in the market and a natural extension of your existing story. Prioritization itself is an interview skill — the list order is deliberate.

</details>

---

## Course Complete 🎓

In Module 0, we asked — *what makes Next.js different from React?* Today you have the answer, not just in theory but in a **live product**: from routing through streaming, from cookies through crypto-verified webhooks, from dummy data through Neon Postgres — every line, every guard, every trade-off thought through by you.

The next step is yours: take the extensions list, or your own next idea. The patterns are in your hands — **THINK → CONCEPT → CODE → TEST** — apply them to new problems.

See you in the next project. 🚀
