The Hiring Platform is **functionally complete** after C.10 — jobs get posted (AI-assisted), applied to (with PDF resumes), scored (by Gemini), ranked, and paid to boost (Stripe). But functional ≠ production-grade. An app is production-grade only when it survives **misuse.** This final pass hardens two abuse vectors and does a sweep for the common leaks:

1. **Rate limiting** — on the AI-generate and apply endpoints (free-tier quota protection + bot abuse prevention).
2. **Security audit** — a full env/secret/error-boundary sweep.

# Hiring Platform — Part 11: Rate Limiting + Security Audit

## Step 0 — Threat Model: What Can Actually Break?

Defenses without a threat model are just random locks. The real attack surfaces on this app:

| Threat | How it happens | Impact |
|---|---|---|
| AI quota exhaustion | A script hammering the "Generate with AI" button | Free-tier Gemini quota drains — the feature dies for everyone |
| Apply spam | A bot flooding fake applications | Employer dashboards unusable, DB full of junk |
| Resume brute-force | Script hammering `/api/resumes/*` | Bandwidth bills, server load |
| Secret leak | Committing `.env` / a key in client code | Full compromise |

Each gets a mitigation below. First, rate limiters.

## Step 1 — Rate Limiting: Two Layers, Two Different Places

**Think first:** Rate limiting lives in two places in this app — and each needs a different approach:

- **Server Actions** (`generateDescriptionAction`, `applyAction`) — these are **URL-less**; the proxy can't reliably match them. Limits go **inside the action.**
- **Route Handlers** (`/api/resumes/[id]`) — these are **real URLs** — the proxy (Batch 4 territory) fits them perfectly.

Layered defense: expensive AI operations are limited per-user; public API routes are limited per-IP.

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

A fixed-window counter — the same pattern as 4.13, made into a reusable helper: `key` (who), `max` (how many), `windowMs` (in what time). Now drop it into the AI action:

```ts
// app/(employer)/post-job/actions.ts — inside generateDescriptionAction,
// right after the role guard:

import { checkRateLimit } from "@/lib/rate-limit";

const userId = String(session.user.id);
const limit = checkRateLimit(`jd-gen:${userId}`, 5, 60_000);
if (!limit.allowed) {
  return {
    ok: false,
    error: `Too many requests. Try again in ${limit.retryAfterSec}s.`,
  };
}
```

- **The key is `userId`-scoped** — per-employer: each employer gets 5 generations per minute, and one bad actor can't starve everyone. (IP-based would penalize a whole shared office network.)
- **`60_000`** — the numeric-separator syntax; reads as 60,000.
- **`retryAfterSec` in the user-facing message** — tells them when to retry, cutting down on blind retry spam.

### Layer 2 — Proxy-Level Limiter (API Route Throttling)

Apply the resume-download route through the proxy — Batch 4's `proxy.ts`, adapted:

**File:** `proxy.ts` (project root)

```ts
// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ipBuckets = new Map<string, { count: number; resetAt: number }>();

export function proxy(request: NextRequest) {
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

The Batch 4 recap: `proxy()` runs before every matched request; `matcher` scopes it to `/api/:path*`; `x-forwarded-for` is the header Vercel sets with the real client IP; crossing the limit returns a proper HTTP `429 Too Many Requests` with a `Retry-After` header (the standard way to say "come back later").

> **Honest caveat — in-memory limits are approximate on serverless:** Vercel runs many function instances, each with its own `Map`. The 30/min limit is really 30 × instances. Fine for the capstone (protecting > exactness); exact limiting needs a shared store like Redis (4.13 mentioned it). Interview line: "in-memory is a dev-level limiter; Redis is production-level."

## Step 2 — Security Audit Sweep

Apply Batch 8's checklist to this project.

### 2a — Environment Variables Inventory

A single table for all secrets — auditing:

| Var | File | Client-visible? | Impact if leaked |
|---|---|---|---|
| `DATABASE_URL` | `.env` | No (server-only) | Full DB read/write |
| `AUTH_SECRET` | `.env.local` | No | Session forgery |
| `AUTH_GITHUB_ID` | `.env.local` | No | Low (IDs are semi-public) |
| `AUTH_GITHUB_SECRET` | `.env.local` | No | OAuth account takeover |
| `GEMINI_API_KEY` | `.env.local` | No | Quota/billing drain |
| `STRIPE_SECRET_KEY` | `.env.local` | No | Payment control |
| `STRIPE_WEBHOOK_SECRET` | `.env.local` | No | Fake payment confirmations |
| `BLOB_READ_WRITE_TOKEN` | `.env.local` | No | All resumes readable/writable |

**Key check:** No `NEXT_PUBLIC_` prefix anywhere. Verify:

```bash
grep -r "NEXT_PUBLIC_" . --include="*.ts" --include="*.tsx"
```

Result should be empty. And a git-tracked-env check (Batch 8's safety check):

```bash
git ls-files | grep -E "\.env"
# Must be empty — env files are never committed
```

If anything shows up, add it to `.gitignore` and rotate the exposed key (a committed secret is compromised — history-cleanup tools don't fully undo it).

### 2b — Error-Boundary Hierarchy (Batch 8's Pattern)

No error boundaries exist anywhere yet. Production polish: a proper hierarchy.

**File:** `app/error.tsx` — catch errors in a route segment (client component, per 8.3):

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
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-gray-600 text-sm text-center max-w-sm">
        The page failed to load. Please try again.
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

**File:** `app/global-error.tsx` — fires when the root layout itself crashes:

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
          <h2 className="text-xl font-semibold">Application crashed</h2>
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

And the custom 404 that C.4 promised:

**File:** `app/not-found.tsx`

```tsx
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 p-8">
      <h2 className="text-2xl font-bold">404</h2>
      <p className="text-gray-600">This page or job does not exist.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to jobs
      </Link>
    </main>
  );
}
```

### 2c — Final Audit Table (The Revision Artifact)

One last consolidated view:

| Risk | Mitigation | Implemented in |
|---|---|---|
| Unauthorized page access | Layout `requireRole()` | C.5 |
| Direct action calls | Session + role guards inside every action | C.6–C.9 |
| Cross-tenant data access | Query-level ownership filters (`company.ownerId`) | C.6, C.7, C.10 |
| Fake payments | Webhook signature verification + metadata-driven state | C.7 |
| Malicious uploads | Server-side MIME + size checks, UUID paths | C.8 |
| Resume exposure | Auth-proxy download route, no raw URLs exposed | C.10 |
| AI quota abuse | Per-user action-level limiter | C.11 |
| API brute-force / hammering | Proxy per-IP limiter + 429 | C.11 |
| Secret leaks | Server-only env vars, no `NEXT_PUBLIC_`, gitignored | Throughout |
| Unhandled crashes | `error.tsx` + `global-error.tsx` boundary hierarchy | C.11 |

This table pulls double duty — it's also the artifact that lands you the "defend your design" points in an interview.

### Test Checklist

1. Smash the "Generate with AI" button 6 times fast → 6th returns a polite rate-limit message.
2. Hammer the resume endpoint: `for i in {1..40}; do curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/api/resumes/1; done` — you'll see `429` start appearing mid-stream.
3. Inject a temporary crash (`throw new Error("test")`) on any page → the styled error UI renders, "Try again" works → remove the throw.
4. `/jobs/nonsense` → the custom 404 with the back-link.
5. `git ls-files | grep .env` → empty.

## Nutshell

Security pass = **threat-model-first, then layered defense**: an action-level limiter (per-`userId`, guards the expensive AI operation because Server Actions are URL-less) + a proxy-level limiter (per-IP, `/api/:path*` matcher, returns `429` + `Retry-After` — direct reuse from Batch 4). Engineering honesty: in-memory limits are approximate on serverless (many instances, each with its own counter); Redis is the production-grade upgrade path. The audit sweep: env-var inventory (all server-only, zero `NEXT_PUBLIC_`), git-tracked-env check, and a **complete error-boundary hierarchy** (`error.tsx` for segment-level + `global-error.tsx` for root-level + custom `not-found.tsx`). The consolidated audit table documents the security story end-to-end.

## What It Is NOT

- **Rate limiting is not "an authentication replacement."** Limits slow down abuse; they don't prove identity. The resume route has both: auth at the door (C.10) and throttling above it (C.11). Layers compose, they don't substitute.
- **In-memory throttling is not "exact counting."** It's an approximation — instances multiply the real limit. It's named as such; "dev-level" vs "Redis production-level" is the honest framing an interview wants.
- **The audit table is not "proof the app is unbreakable."** It's a snapshot of known risks with mitigations. Security is ongoing (dependency scanning, pentests, monitoring). The table shows discipline — it doesn't guarantee safety.
- **`global-error.tsx` is not "the only error boundary."** It's the last resort — when the root layout itself throws. Normal route errors fall to the closer `error.tsx` first (nearest-boundary-wins).
- **The custom 404 is not "an SEO requirement."** It's UX recovery — a lost user gets a clear next step. The status code (`404`) was correct even with the default page; the custom one is polish, not protocol.

---

**In Your Own Words**

1. Why is the AI-limit keyed on `userId` but the resume-limit on IP — wouldn't it be simpler to use IP for both?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The AI action runs inside a Server Action — a stable `userId` is already available from the session, so per-user fairness is cheap and precise (one abuser can't exhaust everyone's quota; shared office networks aren't penalized). The resume route is a Route Handler behind the proxy, which has no session context at the middleware layer (Edge Runtime constraints), so the strongest stable identity available is the IP. Each layer uses the best identity it can reach.

</details>

2. Server Actions can't be rate-limited by the proxy — what makes a Route Handler matchable that a Server Action isn't?

<details>
<summary>Show Answer</summary>

**Sample Answer:** A Route Handler lives at a real URL (`app/api/foo/route.ts` → `/api/foo`), so a proxy matcher like `/api/:path*` hits it. A Server Action call POSTs to the *page* URL (the route the component was rendered from), with the action ID encoded in the encrypted body — the proxy sees the page path, not "which action." No matchable pattern exists. That's why action-level guards live in code, not the proxy.

</details>

3. Is the `429` response enough, or does the `Retry-After` header matter?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Both. The `429` is the rejection; `Retry-After` is the machine-readable guidance that follows HTTP convention. Together they let standard clients (fetch-retry, SDKs), CDNs (automatic backoff), and our own UI (display a countdown) all react correctly instead of hammering harder. Without it you get retry-storms that amplify load.

</details>

4. Why does `global-error.tsx` need its own `<html>` tag while `error.tsx` doesn't?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `error.tsx` wraps a route *segment* — the root layout is healthy, providing `<html>`/`<body>`. `global-error.tsx` catches when the *root layout itself* crashes — which means the layout that normally emits `<html>` is gone. So the global boundary must render a complete document from scratch, including `<html>`. It's the catch-all for "everything below the boundary is broken."

</details>

5. The audit table lists "malicious uploads → MIME + size checks." If a browser's `file.type` is spoofed, is that all we have, or is there a deeper check?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The browser sets `file.type` from the file extension, so it's spoofable (rename `evil.exe` to `evil.pdf`). That's why MIME is an **early** filter, not the final one: production adds **magic-byte signature validation** (check the file's first bytes against the PDF spec: `%PDF`). The capstone's check is the necessary first layer; byte-sniffing is the production upgrade. The interview framing: "client-provided type is a hint, never authority."

</details>

---

The capstone is secure. It's time for the final step — the one that turns "project I built" into "product I shipped." **C.12** deploys the Hiring Platform to Vercel, wires up the production connections, runs the full end-to-end test, and then — the real finale — packages all of this into a **README, resume bullets, and interview talking points.** That's how you carry this work into the next opportunity.

We'll explore this in detail in the next topic.