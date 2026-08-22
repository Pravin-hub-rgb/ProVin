C.10 ke end mein Hiring Platform **functionally complete** ho gaya: jobs post hoti hain (AI-assisted), apply hota hai (PDF upload ke saath), scores bante hain, employer ranked applicants dekhta hai, Stripe boost chalta hai. Par "functionally complete" ≠ "production-ready." Ek app production-ready tab hoti hai jab uske **galat istemal** ke against bhi defenses hon. Aaj woh final security pass:

1. **Rate limiting** — apply/AI endpoints pe (Gemini free-quota protection + abuse prevention) — Batch 4 ka concept, capstone context mein
2. **Security audit** — poore capstone ka env/secret/error sweep — Batch 8 ka pattern ab apne project pe

# Hiring Platform — Part 11: Rate Limiting + Security Audit

## Step 1 — Pehle Threat Model Socho (Kaun Kya Tod Sakta Hai?)

Defenses bina threat ke random locks lagane jaisa hai. Humare app ke real attack surfaces:

| Threat | Kaise hota | Impact |
|---|---|---|
| AI quota exhaustion | Script generate-description button pe loop maare | Gemini free-tier limit khatam — feature sabke liye dead |
| Apply spam | Bot 1000 fake applications bhare | Employer dashboard unusable, DB junk |
| Resume endpoint hammering | `/api/resumes/*` pe brute requests | Bandwidth bill, server load |
| Secret leak | `.env.local` commit / client bundle mein key | Sabse bada — full compromise |

Har threat ka mitigation aaj lagega. Pehla do rate limiters se.

## Step 2 — Rate Limiting: Do Layers, Do Alag Jagah

**SOCH:** Rate limiting karne ke do jagah hain humare app mein — aur dono ki zaroorat alag-alag hai:

- **Server Actions** (`generateDescriptionAction`, `applyAction`) — yeh **URL-less** hote hain; proxy unhe reliably match nahi kar sakta. Limit yahan **action ke andar** code se lagegi.
- **Route Handlers** (`/api/resumes/[id]`) — yeh **real URLs** hain — proxy (Batch 4 ka territory) inse perfect deal karta hai.

Layered defense: expensive AI operation per-user limited, public API per-IP limited.

### Layer 1 — Action-Level Limiter (AI Quota Guard)

**File:** `lib/rate-limit.ts`

```ts
// lib/rate-limit.ts
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  key: string,
  max: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  // Window expire ho gaya ya pehli baar — fresh bucket
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (bucket.count < max) {
    bucket.count++;
    return { allowed: true, retryAfterSec: 0 };
  }

  return {
    allowed: false,
    retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000),
  };
}
```

Fixed-window counter — 4.13 wala pattern, bas generic helper banaya: key (kaun), max (kitni baar), window (kitne time mein). Ab AI action mein use:

```ts
// app/(employer)/post-job/actions.ts — generateDescriptionAction ke andar,
// role guard ke turant baad:

import { checkRateLimit } from "@/lib/rate-limit";                        // NEW
// ...
const userId = String(session.user.id);                                   // NEW
const limit = checkRateLimit(`jd-gen:${userId}`, 5, 60_000);              // NEW
if (!limit.allowed) {                                                     // NEW
  return {                                                                // NEW
    ok: false,                                                            // NEW
    error: `Bahut zyada requests. ${limit.retryAfterSec}s baad try karo.`,  // NEW
  };                                                                      // NEW
}                                                                         // NEW
```

- **Key mein user-id** — per-employer limit: har employer ko apne 5 generations/minute milte hain, ek abuser doosron ko block nahi kar sakta. (IP-based hota toh shared-office network ke saare log ek bucket mein aate.)
- **`60_000` numeric separator** — TypeScript/ES2021 feature: readability sugar, `60000` same hai.
- **Message mein retry-after** — user ko kab try karna hai pata chale, blind retry-spam na kare.

### Layer 2 — Proxy-Level Limiter (/api Routes)

Resume-download route pe IP throttle — **Batch 4 ka `proxy.ts` direct reuse** (4.13 ka pattern, Next 16 syntax):

**File:** `proxy.ts` (project root)

```ts
// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ipBuckets = new Map<string, { count: number; resetAt: number }>();

export function proxy(request: NextRequest) {
  // Sirf API routes pe limit — pages ko mat roko
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();

  let bucket = ipBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    bucket = { count: 0, resetAt: now + 60_000 };
    ipBuckets.set(ip, bucket);
  }
  bucket.count++;

  if (bucket.count > 30) {
    return new NextResponse(
      JSON.stringify({ error: "Too many requests" }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil((bucket.resetAt - now) / 1000)),
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
```

Batch 4 recap in one breath: `proxy()` har matched request se **pehle** chalta hai; matcher sirf `/api/:path*` scope karta hai; `x-forwarded-for` header Vercel set karti hai (real client IP); limit cross → `429 Too Many Requests` + `Retry-After` header (standard HTTP way of saying "baad mein aana").

> **Honest caveat — in-memory limits serverless pe approximate hain:** Vercel functions multiple instances mein chalte hain — har instance ka apna Map. Matlab 30/min limit actually 30 × instances ban sakti hai. Capstone ke liye theek (protection > precision). Production-grade exact limiting = **Upstash Redis** jaisa shared store — 4.13 mein mention kiya tha, wahan hi iska ghar hai. Interview line ready: "in-memory dev-level, Redis production-level."

## Step 3 — Security Audit Sweep

Ab Batch 8 wala process apne project pe. Checklist walk karte hain.

### 3a — Env Vars Inventory

Poore capstone ke secrets ek jagah — audit table:

| Var | File | Client-visible? | Leak impact |
|---|---|---|---|
| `DATABASE_URL` | `.env` | ❌ server-only | Full DB access |
| `AUTH_SECRET` | `.env.local` | ❌ | Session forgery |
| `AUTH_GITHUB_ID` | `.env.local` | ❌ (ID public-ish hota bhi) | Low |
| `AUTH_GITHUB_SECRET` | `.env.local` | ❌ | Account takeover via OAuth |
| `GEMINI_API_KEY` | `.env.local` | ❌ | Quota/billing drain |
| `STRIPE_SECRET_KEY` | `.env.local` | ❌ | Payment control |
| `STRIPE_WEBHOOK_SECRET` | `.env.local` | ❌ | Fake payment events |
| `BLOB_READ_WRITE_TOKEN` | `.env.local` | ❌ | All resumes read/write |

**Koi bhi `NEXT_PUBLIC_` prefix nahi** — verify: project-wide search karo `NEXT_PUBLIC_` — zero results honi chahiye. Aur ek git-safety check:

```bash
git ls-files | grep -E "\.env"
# Output khali hona chahiye — .env files track NAHI honi chahiye
```

Agar kuch dikhe → `.gitignore` mein add karo + key rotate karo (committed secret = compromised secret, history se delete bhi kaafi nahi).

### 3b — Error Hierarchy at Scale (8.3)

Ab tak errors: route-level `error.tsx` kahin nahi banaya! Production polish:

**File:** `app/error.tsx` — route-segment errors (client component — 8.3 rule):

```tsx
// app/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-xl font-semibold">Kuch galat ho gaya</h2>
      <p className="text-gray-600 text-sm text-center max-w-sm">
        Page load karte waqt dikkat aayi. Dobara try karo.
      </p>
      <button
        onClick={reset}
        className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm"
      >
        Try again
      </button>
    </main>
  );
}
```

**File:** `app/global-error.tsx` — layout tak crash hone pe (yeh `<html>` khud render karta hai — root layout replace):

```tsx
// app/global-error.tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
          <h2 className="text-xl font-semibold">App crashed</h2>
          <button
            onClick={reset}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm"
          >
            Reload
          </button>
        </main>
      </body>
    </html>
  );
}
```

Aur C.4 ka purana promise — custom not-found:

**File:** `app/not-found.tsx`

```tsx
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 p-8">
      <h2 className="text-2xl font-bold">404</h2>
      <p className="text-gray-600">Yeh page ya job exist nahi karti.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to jobs
      </Link>
    </main>
  );
}
```

### 3c — Final Audit Table (Revision Artifact)

| Risk | Mitigation | Implemented in |
|---|---|---|
| Unauthorized page access | Layout `requireRole()` | C.5 |
| Direct action calls | In-action session/role guards | C.6–C.9 |
| Cross-tenant data access | Query-level ownership filters | C.6/C.7/C.10 |
| Fake payments | Webhook signature verify (metadata-driven) | C.7 |
| Malicious uploads | Server-side MIME + size checks, UUID paths | C.8 |
| Resume exposure | Auth-proxy download route, no raw URLs | C.10 |
| AI quota abuse | Per-user action limiter | C.11 |
| API hammering | Proxy IP limiter + 429 | C.11 |
| Secret leaks | Server-only envs, no NEXT_PUBLIC_, gitignored | Throughout |
| Unhandled crashes | error.tsx + global-error.tsx hierarchy | C.11 |

Yeh table resume/interview gold bhi hai — "security posture explain karo" ka ready answer.

**TEST checklist:**

1. JD-generate button 6 baar rapid dabao → 6th pe friendly limit message
2. Terminal se loop: `for i in {1..40}; do curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/api/resumes/1; done` — beech mein 429 dikhne lagenge
3. Kisi page pe temp-crash daalo (throw new Error("test")) → styled error UI, Try again kaam karta hai → hatao
4. `/jobs/nonsense` → custom 404 with back-link
5. `git ls-files | grep .env` → empty

## Nutshell

Security pass = **threat-model-first**, phir layered defenses: **action-level limiter** (per-user key, expensive AI op — kyunki Server Actions URL-less hain, proxy unhe nahi pakad sakta) + **proxy-level limiter** (per-IP, `/api/:path*` matcher, 429+Retry-After — Batch 4 ka direct reuse). Honest engineering: in-memory limits serverless pe approximate — exact chahiye toh Redis. Audit sweep: env inventory (sab server-only, zero NEXT_PUBLIC_), git-tracked-env check, **error hierarchy complete** (`error.tsx` route-level + `global-error.tsx` html-level + custom `not-found.tsx`). Final audit table = poore capstone ki security story ek view mein.

## What It Is NOT

- **Rate limiting = "authentication replacement" nahi.** Limits abuse *velocity* rok ti hain; pehchan/secrets alag concern hain. Resume route pe dono hain — auth pehle (C.10), throttle upar (C.11). Layers compose hoti hain, replace nahi.
- **In-memory limiter = "distributed rate limiter" nahi.** Instance-local memory hai — multi-instance deploy pe counts share nahi hote. Yeh documented approximation hai; Redis upgrade path already planned.
- **Audit table = "proof of security" nahi.** Snapshot hai current known-risks ki. Real security ongoing process hai (dependency audits, pentests, monitoring). Yeh table baseline discipline dikhata hai — guarantee nahi.
- **`global-error.tsx` = "har error ka catcher" nahi.** Woh last-resort boundary hai jab root layout tak crash ho. Normal route errors pehle `error.tsx` mein catch hote hain — hierarchy ka matlab nearest-boundary-wins hai.
- **Custom 404 = "SEO requirement" nahi.** UX recovery hai — lost user ko actionable next-step milta hai. SEO-wise status-code (404) toh default wala bhi sahi bhejta tha.

---

**In Your Own Words**

1. AI generation limit per-user (`jd-gen:${userId}`) key se lagayi, resume downloads per-IP — decision ka logic kya tha?

<details>
<summary>Show Answer</summary>

**Sample Answer:** AI action authenticated context mein hota hai — stable identity (userId) available, toh fairness-best limit wahi hai (ek abuser doosron ko nahi rok sakta, shared-IP problem avoid). Resume route bhi authenticated technically, par proxy-layer ko session DB nahi milta (edge/runtime constraints — 4.x) — wahan available stable identity IP hi hai. Har layer apni reachable-strongest identity use karti hai.

</details>

2. Server Actions proxy se kyun nahi pakde jaate — URL-less hona exactly kya matlab?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Server Action call ek POST hota hai jis URL pe component render hua tha (page path hi), body mein encrypted action-ID hoti hai — kaunsa action execute hua woh body se pata chalta hai, path se nahi. Toh proxy matcher "/ai-calls pe limit lagao" likh hi nahi sakta — koi dedicated URL pattern hai hi nahi. Isliye action-function ke andar guard. Route Handlers (webhook/resumes) proper URLs hain — wahan proxy perfect.

</details>

3. `Retry-After` header response mein dena — bina iske bhi toh 429 kaam karta?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Kaam karta — rejection toh ho hi jayegi. Par standard header clients ko machine-readable guidance deta hai ("itne seconds baad try karo") — blind retry-storms kam hote, SDKs auto-backoff kar paate, hamara UI bhi isi value se countdown dikha sakta hai. Protocol etiquette + practical load-shaping, dono.

</details>

4. `global-error.tsx` mein `<html>` tag khud likhna pada — normal pages mein kabhi nahi likhte. Kyun?

<details>
<summary>Show Answer</summary>

**Sample Answer:** GlobalError tab render hota hai jab ROOT LAYOUT khud crash ho — matlab `<html>`/`<body>` provide karne wala layout hi available nahi. Isliye yeh component poori HTML document khud banata hai. Nearest-boundary principle ka extreme case: jo cheez crash ho gayi (layout) uspe depend nahi reh sakte.

</details>

5. Audit table mein "fake payments → webhook signature" row hai — success_url trust karne pe yeh mitigation fail kaise hoti, flow trace karke batao.

<details>
<summary>Show Answer</summary>

**Sample Answer:** Success_url trust hota toh: attacker `/dashboard?boosted=5` manually hit karta → handler URL-param dekh ke featured=true kar deta → ₹0 mein boost. Signature-based webhook mein yeh path hi nahi hai — state-change sirf tab hota hai jab request Stripe ke servers se aayi ho (HMAC proof ke saath). Trust boundary client-controlled-data se server-verified-proof pe shift — yehi row ka core lesson hai.

</details>

---

Security layer poori — ab bas **live** hona bacha. C.12 finale: Vercel deploy (env vars, Neon prod branch, Blob/Stripe/Gemini keys production setup), poore app ka integration test-run, testing summary table, course ka grand recap, aur woh section jo is project ko resume-worthy banata hai: **README + resume bullet-points + interview talking points**. Phir milte hain — as developers jo apna pehla production-grade product ship kar chuke hain.
