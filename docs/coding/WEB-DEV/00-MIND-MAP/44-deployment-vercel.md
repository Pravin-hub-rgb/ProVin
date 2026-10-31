# 44 — Deployment: Show the App to the World

> Accessibility is complete.
> Now the eleventh umbrella — **Deployment**.
> It works locally — now take it live.

---

## What Is Deployment

**Deployment** = taking your app from your local machine **to the internet** — so anyone can access it.

Right now: `localhost:3000` — only on your computer
Later: `shopkaro.com` — for the whole world

---

## Vercel — Best Choice for Next.js

Vercel built Next.js itself — the integration is perfect.

**Why Vercel:**
- Free tier is enough for side projects
- Connect GitHub → Push → Automatic deploy
- Supports all Next.js features (SSR, SSG, API routes)
- Global CDN automatic
- Easy domain connection

---

## How to Deploy — Step by Step

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2 — Create an Account on Vercel
`vercel.com` → Sign up with GitHub

### Step 3 — Import the Project
- "New Project" → Select GitHub repo → Import
- Vercel automatically detects Next.js

### Step 4 — Add Environment Variables
This is the **most important step**.

The `.env` file isn't pushed to GitHub — so Vercel doesn't know about it. Add them manually:

```
Vercel Dashboard → Project → Settings → Environment Variables

DATABASE_URL          = postgresql://...
SESSION_SECRET        = your-secret-here
RAZORPAY_KEY_ID       = rzp_live_...
RAZORPAY_KEY_SECRET   = ...
RESEND_API_KEY        = re_...
NEXT_PUBLIC_APP_URL   = https://shopkaro.vercel.app
```

### Step 5 — Deploy
Click "Deploy" → 2-3 minutes → Live!

---

## Environment Variables — Development vs Production

```bash
# .env (local development)
DATABASE_URL="postgresql://localhost:5432/shopkaro"
RAZORPAY_KEY_ID="rzp_test_..."    # Test keys — fake payments

# In Vercel (production)
DATABASE_URL="postgresql://neon.tech/shopkaro"  # Real database
RAZORPAY_KEY_ID="rzp_live_..."                  # Live keys — real payments
```

**Test vs Live keys** — use test mode in development. Live mode in production. Never put test keys in production.

---

## NEXT_PUBLIC_ Prefix

```bash
# Available only on server — browser can't see
SESSION_SECRET="abc123"
DATABASE_URL="postgresql://..."

# Available in browser too — NEXT_PUBLIC_ prefix
NEXT_PUBLIC_APP_URL="https://shopkaro.com"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_..."
```

Rule: Sensitive things (passwords, secrets) should never have `NEXT_PUBLIC_`.

---

## Automatic Deploys — Git Push = Auto Deploy

```
Work locally
→ git push origin main
→ Vercel automatically creates a new deploy
→ Live in 2 min

Feature branch:
→ git push origin feature/cart-update
→ Vercel gives a preview URL — test first
→ Merge to main → Production deploy
```

---

## Custom Domain

```
Vercel Dashboard → Project → Settings → Domains
→ Add "shopkaro.com"
→ Configure DNS settings (on domain provider)
→ SSL/HTTPS automatic
```

---

## Database — For Production

Local: PostgreSQL on your computer
Production: Cloud database needed

Options:
- **Neon** — Free tier, perfect integration with Vercel
- **Supabase** — Free tier, extra features
- **Railway** — Simple, generous free tier

---

## Deployment Umbrella — Complete

```
DEPLOYMENT
│
├── Vercel deploy → Doc 44 ✓ (THIS)
└── Environment variables → Covered ✓
```

---

## Next Doc

`45-senior-dev-checklist.md` — **Last doc** — Senior Dev Checklist. Before and after building a project — what to check. The summary of the entire series is here too.
