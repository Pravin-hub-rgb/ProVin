C.11 ke baad Hiring Platform secure hai — rate limits lagee hain, audit table saaf hai, error hierarchy complete hai. Ab sirf ek kaam bacha hai jo is journey ko "project banaya" se "**product ship kiya**" mein badalta hai: **deploy**. Aur uske baad woh hissa jiske liye yeh poora capstone design hua tha — ise **resume aur interview** mein dikhana.

Yeh course ki aakhri file hai. Chalo ise poore style se khatam karte hain.

# Hiring Platform — Part 12: Deploy + Testing + Resume Guidance

## Step 1 — Code GitHub Pe

Vercel git-based deploy karta hai (8.4 yaad hai): push karo → import karo → live. Pehle repo:

```bash
git init
git add .
git commit -m "Hiring Platform - Next.js capstone"
git branch -M main
git remote add origin https://github.com/<tumhara-username>/hiring-platform.git
git push -u origin main
```

**Commit se pehle ek baar:** `git status` dekho — `.env`, `.env.local` list mein NAHI honi chahiye (C.11 ka check). Secrets kabhi push nahi.

## Step 2 — Vercel Import + Env Vars

1. vercel.com → GitHub se login → **Add New Project** → repo select → Import
2. Framework auto-detect (Next.js) — build settings default theek
3. **Environment Variables section** — yahan C.11 wali poori inventory dobara banegi, ab dashboard mein:

| Var | Value kahan se |
|---|---|
| `DATABASE_URL` | Neon console — production project ka connection string |
| `AUTH_SECRET` | Wahi jo local pe hai (ya naya generate) |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | Wahi values |
| `GEMINI_API_KEY` | Wahi key (free tier prod pe bhi chalega) |
| `STRIPE_SECRET_KEY` | Test-mode key (`sk_test_...`) — demo safe rahegi |
| `STRIPE_WEBHOOK_SECRET` | Abhi placeholder — Step 3 mein prod webhook banega |
| `BLOB_READ_WRITE_TOKEN` | Vercel dashboard → Storage tab → tumhara Blob store → **Connect to Project** (token auto-inject!) |

Deploy button → ~2 min build → live URL (`hiring-platform.vercel.app` jaisa).

### Step 2.5 — External Services Ko Naye URL Se Batana (Sabse Zyada Log Yahan Phaste Hain)

Deploy hone ke baad app "chal rahi" dikhegi, par teen cheezein **localhost URL pe abhi tiki hain** — production flow tab tak tootega:

**GitHub OAuth App:**
- github.com → Settings → Developer settings → OAuth App
- Callback URL mein **doosri line add** karo: `https://<tumhara-app>.vercel.app/api/auth/callback/github`
- (Localhost wali bhi rehne do — dono URLs allowed)

**Stripe Webhook:**
- Dashboard → Developers → Webhooks → Add endpoint
- URL: `https://<tumhara-app>.vercel.app/api/stripe/webhook`
- Event: `checkout.session.completed`
- Nayi signing secret (`whsec_...`) copy → **Vercel env vars mein `STRIPE_WEBHOOK_SECRET` update** → Redeploy (env change deploy ke baad hi active hota)

> **Yaad raho ye pattern:** har external service jo hamare callback/webhook pe call karti hai (GitHub, Stripe), use production URL batana zaroori hai. Local dev mein CLI-tunnel/localhost tha; prod mein asli domain. Yeh "deploy ho gaya par login nahi hota" wala classic bug isi se hota hai.

## Step 3 — Production Integration Test Run

Live URL pe poora user-journey ek baar end-to-end — kyunki production environment alag hota hai (env vars, domains, real network):

1. Home load — jobs dikh rahi (Neon connection ✓)
2. Search/filter chalao (dynamic rendering prod pe ✓)
3. Job detail kholo — title meta tags view-source mein (ISR prod ✓)
4. GitHub login → onboarding → employer setup (OAuth callback fix ✓)
5. Job post + AI generate (Gemini prod se ✓)
6. Boost → Stripe test card 4242... → featured badge (webhook prod URL ✓)
7. Doosre browser se candidate bano → apply + PDF upload → score aaya? (Blob prod token ✓)
8. Employer → applicants page → ranked list + resume open (proxy route prod ✓)
9. `/jobs/nonsense` → custom 404; koi crash nahi (error hierarchy ✓)

Sab green = **production-grade product shipped.** 🚀

### Testing Summary Table — Poore Capstone Ka Matrix

| Feature | Happy path | Edge/guard |
|---|---|---|
| Listings (C.3) | Browse + search + filter | Invalid type param ignored; empty-state |
| Detail (C.4) | Slug render + SEO tags | Bad slug → 404; closed job → banner |
| Auth (C.5) | Login → onboarding → role sections | Guest redirect; cross-role block |
| Post job (C.6) | AI draft → publish → listed | Validation errors; slug collision suffix |
| Manage (C.7) | Toggle/delete/boost | Ownership 404; apps-wali delete block; double-pay guard |
| Apply (C.8) | Upload → submit → success | File type/size; duplicate guard; closed-job block |
| Score (C.9) | Score + reason stored/shown | AI fail → application survives, null score |
| Applicants (C.10) | Ranked list + stats stream | Cross-employer 404; unscored nulls-last |
| Security (C.11) | Rate limits fire politely | 401/404 layers; secrets server-only |

Har row C-file se mapped hai — yeh table README mein bhi jaata hai (agle section).

## Step 4 — Course Recap: React Se Yahan Tak Ka Safar

Ek nazar mein poora course — kyunki capstone ne sab kuch use kiya:

| Batch | Seekha | Capstone mein |
|---|---|---|
| Module 0 | Rendering mental models (RSC, hydration, caching) | Har page ka strategy decision isi pe based |
| 1 | Routing, layouts, dynamic routes, states | Saare pages + `[slug]` + loading/error/not-found |
| 2 | SC reads, CC split, ISR, SEO metadata | Listings/detail pages ka data layer |
| 3 | Route Handlers vs Server Actions | SA-first mutations; Route Handler sirf webhook ke liye |
| 4 | Proxy deep-dive | Rate limiting layer (per-IP API throttle) |
| 5 | Auth manual → Auth.js | OAuth + roles + protected groups |
| 6 | DBs: Mongo/SQL/Prisma + relations + indexes | Prisma schema design jo poora app carry karta hai |
| 7 | Images/fonts/streaming/modals | Logos + Suspense stats |
| 8 | Env/security/deploy | Aaj ka audit + live deployment |
| Capstone | Sab kuch ek saath | **Yeh jo tumne banaya** |

Aur "Manual → Better" philosophy har batch mein thi — problem feel karo, phir solution samjho. Wohi tumhari sabse badi seekh hai: tools nahi, **reasoning**.

## Step 5 — Resume-Worthy Banana (Asli Finale)

Project strong hai — par recruiter ko tabhi pata chalega jab presentation strong hogi. Teen deliverables:

### 5a — GitHub README Checklist

```
# HireBoard — AI-Powered Hiring Platform        ← naam do, generic mat rakho

Live demo: https://... · LinkedIn post link

## Features
- AI job-description generator + candidate match scoring (Gemini)
- One-time Stripe checkout for featured listings (webhook-driven)
- PDF resume uploads via Vercel Blob (auth-gated downloads)
- Role-based access: employer/candidate protected route groups
- Streaming dashboards (Suspense), ISR job pages, full SEO

## Stack badges
Next.js 16 · TypeScript · Prisma · PostgreSQL(Neon) · Auth.js · Gemini API · Stripe · Tailwind

## Architecture (ek simple diagram — even ASCII/excalidraw)
Browser → RSC pages → Server Actions → Prisma/Neon
                     ↘ Gemini / Blob / Stripe(webhook→route handler)

## Key decisions (interview bait — deliberately likho)
- Server Actions over REST for mutations; Route Handler only for Stripe webhook
- Ownership enforced at query level (`company.ownerId` filters), not just UI
- Scores nullable by design — AI failure never loses an application
- In-memory rate limits documented as approximation; Redis upgrade path noted

## Run locally
.env.example + install/migrate/seed commands
```

Screenshots 3-4: home, AI generator in action, ranked applicants, Stripe checkout.

### 5b — Resume Bullet Points (Copy-Style, Tweak Karke)

- *Built and deployed a production-grade hiring platform (Next.js 16, TypeScript, Prisma/PostgreSQL) featuring AI-powered job-description generation and candidate-match scoring via Gemini API*
- *Implemented payment monetization with Stripe Checkout and signature-verified webhooks, driving featured-listing purchases end-to-end*
- *Designed role-based auth (Auth.js/GitHub OAuth) with query-level ownership guards across multi-tenant data, plus layered rate limiting (in-action per-user, proxy per-IP)*
- *Optimized delivery with ISR, streaming Suspense dashboards, and next/image pipelines; security-audited and deployed on Vercel*

Chaaron milke batate hain: full-stack, payments, AI, auth, performance, security — six signals, four lines.

### 5c — Interview Talking Points (Har Bullet Ke Peeche Ki Kahani)

Interviewer poochega *"is project mein sabse interesting problem kya thi?"* — ready jawab:

1. **"Why Server Actions over REST?"** — mutations internal the; webhook exception explain karo (external caller). Trade-off bolna aata hai toh senior lagte ho.
2. **"How does payment state stay trustworthy?"** — success_url trust nahi; signature-verified webhook + idempotent handler. CVE-style thinking impress karti hai.
3. **"AI fail hone pe kya hota hai?"** — nullable-score design: insert-first ordering, graceful degradation. Reliability mindset dikhta hai.
4. **"Multi-tenancy security?"** — query-level ownership filters + 404-not-403 enumeration defense.
5. **"Rate limits serverless pe?"** — in-memory approximation honestly named, Redis upgrade path ready. Honesty > hand-waving.

Pattern notice karo: har jawab mein **decision + alternative rejected + why**. Yehi Master Prompt wali "trade-off line" soch ab interview language ban gayi.

## Khud Try Karo — Aage Ka Roadmap (Extensions)

Capstone khatam, playground shuru — in extensions se seekhna continue hota:

1. **Email notifications** (Resend) — apply hone pe employer ko mail; webhook-style async flow
2. **Semantic job search** — embeddings + vector similarity; "React developer" search "frontend engineer" job ko pakad le
3. **Employer subscriptions** — one-time boost se recurring plan (Stripe subscriptions + customer portal)
4. **Application status pipeline** — PENDING → REVIEWED → INTERVIEW → OFFER, timeline UI ke saath
5. **Tests** — Vitest unit (rate-limiter logic perfect candidate!) + Playwright e2e apply-flow
6. **Custom domain** — Vercel domains section; DNS basics practical mein

## Nutshell

Ship = **git push → Vercel import → env vars transfer → external callbacks update** (OAuth + Stripe webhook production URLs — classic-breakage point) → integration run. Production-grade proof = testing matrix (har feature ka happy + guard path). Career-grade proof = **README with decisions**, **resume bullets with signals** (full-stack/payments/AI/auth/perf/security), aur **trade-off-based interview answers**. Course ka core promise yahin pura hua: concepts se reasoning tak, reasoning se product tak.

## What It Is NOT

- **Deployed project = "ab bas khatam" nahi.** Live app maintenance mangti hai: dependency updates, quota monitoring, Neon/Blob usage checks. Ship ek milestone hai, ownership start hoti hai.
- **Resume bullets = "exaggeration license" nahi.** Har claim interview mein defend honi chahiye — isliye bullets wahi jo tumne khud banaya/debug kiya. Jo samajh nahi aaya woh resume pe mat daalo — interview mein wahi pakda jayega.
- **Testing matrix = "100% coverage" nahi.** Manual happy+edge paths cover hue hain; automated suite agla level hai (extension #5). Matrix documentation-of-confidence hai, certificate nahi.
- **AI-generated README = "tumhari kahani" nahi.** Structure template se lo, par decisions/apni galtiyan apne words mein likho — authenticity interviews mein mehsoos hoti hai.
- **Course khatam = "seekhna khatam" nahi.** Extensions list intentionally chhooti hai kyunki real growth ab khud choose karne se aati hai — woh skill bhi seekhi hai is course mein.

---

**In Your Own Words**

1. Deploy ke baad login toota toh sabse pehla suspect kya — aur fix kis file/dashboard mein?

<details>
<summary>Show Answer</summary>

**Sample Answer:** GitHub OAuth App ka callback URL — abhi bhi `localhost:3000/api/auth/callback/github` pe tika hoga. Fix GitHub Developer settings mein: production domain ka callback add karo. Pattern: har external-service callback/webhook (GitHub, Stripe) apne config mein hamara URL hold karta hai — code deploy hona unhe update nahi karta.

</details>

2. Testing matrix mein "happy path + edge/guard" columns kyun — sirf happy paths likhne se kya chhoot raha?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Happy paths prove karte hain features kaam karti hain; guards prove karte hain galat istemal se bachti hain. Recruiters/users abuse se takraate hain, demos se nahi. Guard-column = security/reliability thinking ka visible evidence — aur regression-time pe yaad dilata hai ki invisible behavior bhi preserve karna hai.

</details>

3. Resume bullet mein "signature-verified webhooks" likha — interviewer "explain karo" bole toh tumhara 30-second answer kya hoga?

<details>
<summary>Show Answer</summary>

**Sample Answer:** "Payment confirmation client-controlled success URL se lena unsafe tha, toh state-change sirf Stripe ke authenticated webhook se hota hai — raw body pe HMAC signature verify hota hai constructEvent se, metadata se jobId milti hai, aur handler idempotent hai retry-safety ke liye." Ek breath mein: threat, mechanism, data-flow, robustness — chaar signal.

</details>

4. README mein "key decisions" section alag se kyun — features list kaafi nahi?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Features batate hain KYA banaya; decisions batate hain KAISE SOCHA. Interviewer/features se differentiate nahi hote (sabke paas CRUD hai), judgment se hota hai. Decisions-section reviewer ko batata hai ki candidate alternatives weigh kar sakta hai — jo senior-signal hai chahe junior title ho.

</details>

5. Extensions list mein semantic search pehle kyun rakha vs subscriptions — agar goal "resume impact maximize" ho?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Semantic search = AI-story ka natural extension (embeddings/vectors — 2026 keyword-dense area, already Gemini context hai). Subscriptions valuable hai par common-pattern territory (docs-follow exercise). Impact-per-effort ranking: jo skill-market mein scarce ho aur existing narrative extend kare woh pehle. Prioritization bhi ek interview-skill hai — list order deliberate hai.

</details>

---

## Course Complete 🎓

Module 0 mein humne poocha tha — *Next.js akhir React se alag kaise hai?* Aaj tumhare paas jawab sirf theory mein nahi, ek **live product** mein hai: routing se lekar streaming tak, cookies se lekar crypto-verified webhooks tak, dummy data se lekar Neon Postgres tak — sab kuch ek hiring platform mein jiska har file, har guard, har trade-off tumne khud socha.

Agla step tumhara hai: extensions list uthao, ya apna agla idea. Patterns tumhare paas hain — **SOCH → CONCEPT → CODE → TEST** — ab inko naye problems pe chalao.

Milte hain agle project mein. 🚀
