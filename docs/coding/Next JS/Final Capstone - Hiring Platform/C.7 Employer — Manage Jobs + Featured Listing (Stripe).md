At the end of C.6 the employer can post jobs — AI drafts included. But the dashboard job list is read-only so far: a job posted wrong, no way to close it, no way to delete. And the key paid feature from C.0 is still absent: the employer wants to **boost** a job to the top, and that means **payment via Stripe**. This file covers both: manage actions (with ownership guards) and **Stripe Checkout with signature-verified webhooks** — payment integration, and the first time an external service calls *into* our app.

Stripe flow is a classic interview topic, and it introduces one concept that hasn't appeared yet in the course: **webhooks** — when an external service (Stripe) calls your app to notify you.

# Hiring Platform — Part 7: Manage Jobs + Featured Listing (Stripe)

## Step 1 — Schema Update: The `open` Flag (Migrations Exist for This)

**Problem:** An employer closes hiring on a job. Delete it? The `Application` rows referencing it get lost too. Better: an `open` flag — closed jobs still display but can't be applied to.

C.1's planning didn't have an `open` field — and C.12 said it explicitly: *"planning sets direction, it doesn't freeze every line."* Build-time schema changes are normal; migrations exist for exactly this (the history + reproducibility lesson from 6.13.3).

```prisma
// prisma/schema.prisma — inside the Job model:
model Job {
  // ...existing fields...
  featured    Boolean  @default(false)
  open        Boolean  @default(true)      // NEW
  createdAt   DateTime @default(now())
  // ...
}
```

```bash
npx prisma migrate dev --name add_job_open_flag
```

That creates the migration file (`add_job_open_flag/migration.sql` — an `ALTER TABLE ... ADD COLUMN "open" BOOLEAN NOT NULL DEFAULT true`) and refreshes the Prisma Client types. Existing rows become `true` automatically — the default value doing its job.

> **Fear-remover:** The first migration felt scary ("schema change = everything breaks"). Reality: a small additive change, one command, fully tracked. Production apps migrate weekly.

Now add `open` to the home page's filters (same array pattern from C.3):

```tsx
// app/page.tsx — right after the filters array builds:
filters.push({ open: true });                                               // NEW

// The findMany where clause stays:
where: filters.length > 0 ? { AND: filters } : undefined,
```

And a closed-job banner on the detail page (in C.4's JSX, before the Apply button):

```tsx
{!job.open && (
  <p className="bg-gray-100 text-gray-600 rounded px-4 py-3 mb-4">
    This job is no longer accepting applications.
  </p>
)}
```

Note the deliberate (and slightly wrong-at-first) version — the correct guard for the Apply button is:

```tsx
{job.open && (
  <a href={`/jobs/${slug}/apply`} className="inline-block bg-blue-600 ...">
    Apply for this job
  </a>
)}
```

## Step 2 — Manage Actions: An Elegant Ownership Pattern

Three actions needed: toggle open/closed, delete a job, and boost (Stripe — next step). First, the simple ones.

**File:** `app/(employer)/dashboard/actions.ts`

```ts
// app/(employer)/dashboard/actions.ts
"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function requireEmployer() {
  const session = await auth();
  if (session?.user.role !== "EMPLOYER") return null;
  return session;
}

export async function toggleOpenAction(formData: FormData) {
  const session = await requireEmployer();
  if (!session) return;

  const jobId = Number(formData.get("jobId"));

  await prisma.$transaction(async (tx) => {
    const job = await tx.job.findFirst({
      where: { id: jobId, company: { ownerId: session.user.id } },
    });
    if (!job) return;

    await tx.job.update({
      where: { id: job.id },
      data: { open: !job.open },
    });
  });

  revalidatePath("/dashboard");
}
```

Walk through the deliberate choices:

- **The ownership guard lives inside the `where` clause** — `company: { ownerId: session.user.id }` — the relation filter from C.6's dashboard. Another employer slipping in a foreign `jobId` → `findFirst` returns `null` → nothing happens. **Query-level authorization**: no separate "fetch, then check" step.
- **`$transaction(async (tx) => {...})`** — read + write as one atomic unit. Strictly necessary here (single-user context), but it's a pattern worth learning: in a read-then-write flow, no one else can mutate in between. `tx` is the transaction client.
- **The first version had a deliberate bug** — `updateMany` with `open: false` hardcoded, which forced-close instead of toggle. The transaction + `findFirst` + `update` fixes it by reading the current state first.

### Delete — The Applications Complication

Deleting is simple... unless applications exist. `Application.jobId` is a foreign key — deleting a job with applications causes Postgres to throw a **foreign-key violation** (referential integrity: you can't delete the parent while the children exist).

Two options:

| Option | What happens | Chosen? |
|---|---|---|
| DB cascade (`onDelete: Cascade`) | Deleting the job auto-deletes its applications | No — accidental data loss if an employer clicks delete by mistake |
| App-level block | Applications exist → refuse to delete | Yes — safe + honest |

The block approach:

```ts
export async function deleteJobAction(formData: FormData) {
  const session = await requireEmployer();
  if (!session) return;

  const jobId = Number(formData.get("jobId"));

  await prisma.$transaction(async (tx) => {
    const job = await tx.job.findFirst({
      where: { id: jobId, company: { ownerId: session.user.id } },
      include: { _count: { select: { applications: true } } },
    });
    if (!job) return;
    if (job._count.applications > 0) return; // block — too late to delete now

    await tx.job.delete({ where: { id: job.id } });
  });

  revalidatePath("/dashboard");
}
```

The silent block is a harsh UX — production would surface a message ("X applications exist; review them first"). But the *concept* (count-before-delete, ownership-gated) is the point here. A client island wraps the delete button with a `confirm()`:

**File:** `components/delete-job-button.tsx`

```tsx
// components/delete-job-button.tsx
"use client";

import { deleteJobAction } from "@/app/(employer)/dashboard/actions";

export function DeleteJobButton({ jobId }: { jobId: number }) {
  return (
    <form
      action={deleteJobAction}
      onSubmit={(e) => {
        if (!confirm("Delete this job permanently?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="jobId" value={jobId} />
      <button className="text-red-600 text-sm hover:underline">Delete</button>
    </form>
  );
}
```

- **Hidden input** — `jobId` travels as form data; the action reads it with `formData.get("jobId")`.
- **`confirm()` + `preventDefault`** — the browser's native confirm dialog; cancel aborts the submit.

The toggle button is similar (no confirm):

**File:** `components/toggle-open-button.tsx`

```tsx
// components/toggle-open-button.tsx
"use client";

import { toggleOpenAction } from "@/app/(employer)/dashboard/actions";

export function ToggleOpenButton({
  jobId,
  open,
}: {
  jobId: number;
  open: boolean;
}) {
  return (
    <form action={toggleOpenAction}>
      <input type="hidden" name="jobId" value={jobId} />
      <button className="text-sm hover:underline">
        {open ? "Close" : "Reopen"}
      </button>
    </form>
  );
}
```

Drop the two buttons plus the featured badge into the C.6 dashboard row (expand the list item):

```tsx
<li key={job.id} className="border rounded-lg p-4 flex justify-between items-center">
  <div>
    <span className="font-medium">{job.title}</span>
    {job.featured && (
      <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded">
        ★ Featured
      </span>
    )}
    {!job.open && (
      <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
        Closed
      </span>
    )}
    <span className="text-gray-500 text-sm ml-2">{job.location}</span>
  </div>
  <div className="flex gap-3 items-center">
    <span className="text-sm text-gray-600">
      {job._count.applications} apps
    </span>
    <ToggleOpenButton jobId={job.id} open={job.open} />
    <DeleteJobButton jobId={job.id} />
    <BoostButton jobId={job.id} featured={job.featured} />
  </div>
</li>
```

The `BoostButton` comes in the next step.

## Step 3 — Stripe: Setup + Checkout Session

### External Setup (Takes ~10 Minutes)

1. **dashboard.stripe.com** → sign up (free).
2. Leave **Test mode** on (the default) — test cards work, no real money moves.
3. **Developers** → **API keys** → copy the **Secret key** (`sk_test_...`).

```bash
npm install stripe
```

Put it in `.env.local`:

```env
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### Creating the Checkout Session

**Concept:** You never handle card details yourself. Card forms, PCI compliance, fraud checks — all on Stripe's hosted page. You only create *a checkout session* (the price, the product) and redirect the user there. Payment succeeds and Stripe sends the user back to your app — and separately, Stripe calls your server (the webhook, next step) to confirm it.

Money in smallest unit: ₹499 = `49900` paise (no floating-point bugs).

**File:** `lib/stripe.ts`

```ts
// lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});
```

The boost action — in the dashboard actions:

```ts
// app/(employer)/dashboard/actions.ts — add imports:
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function createCheckoutAction(formData: FormData) {
  const session = await requireEmployer();
  if (!session) return;

  const jobId = Number(formData.get("jobId"));

  const job = await prisma.job.findFirst({
    where: { id: jobId, company: { ownerId: session.user.id } },
  });
  if (!job) return;
  if (job.featured) return; // already boosted — guard against double charges

  const origin = (await headers()).get("origin")
    || "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "inr",
          unit_amount: 49900, // ₹499 in paise
          product_data: { name: `Featured Listing: ${job.title}` },
        },
      },
    ],
    success_url: `${origin}/dashboard?boosted=${job.id}`,
    cancel_url: `${origin}/dashboard`,
    metadata: {
      jobId: String(job.id),
    },
  });

  redirect(checkoutSession.url!);
}
```

Key lines worth reading:

- **Ownership + double-payment guards** — the same `findFirst` with the relation filter; if it's already featured, bail early.
- **`headers()` for the origin** — success/cancel URLs must be absolute; this adapts to local vs. production.
- **`metadata: { jobId }`** — **the most important line.** Attach free-form data to the session — the webhook (next step) reads it to figure out *which* job to boost. Metadata is string-only, hence `String(job.id)`.
- **`redirect(checkoutSession.url!)`** — redirect to Stripe's hosted checkout page, where the user enters card details (test card in test mode).

### The Webhook — When Stripe Calls *You* to Say "Payment Done"

**Problem:** A user pays and lands back on `success_url`. Do we flip `featured = true` based on the URL? **Never.** `success_url` is user-controlled — anyone can type `/dashboard?boosted=5` by hand, no payment. The URL is a signal, not proof.

The source of truth is **Stripe calling your server back** with a cryptographic notification. That's the webhook — an external-service-calls-you pattern (a Route Handler is the perfect tool: Server Actions are called *from* the browser, not by Stripe — the 3.x comparison, live).

**File:** `app/api/stripe/webhook/route.ts`

```ts
// app/api/stripe/webhook/route.ts
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text(); // RAW body — signature verification needs the exact bytes
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const jobId = Number(session.metadata?.jobId);

    if (jobId) {
      await prisma.job.update({
        where: { id: jobId },
        data: { featured: true },
      });
    }
  }

  return Response.json({ received: true });
}
```

Four lessons from this route:

1. **Why raw body?** Stripe's signature is an HMAC over the **exact bytes**. If the framework parses it to JSON, re-serialization (key order, whitespace) changes the bytes — verification fails. So `req.text()` — untouched. In a Route Handler this is trivial; it was historically painful in Express-style middleware.
2. **`constructEvent` = authentication.** Without the secret, anyone could POST a fake "payment succeeded" to this endpoint! The signature is verified against the secret — a 400 is returned on mismatch. This is a **public-but-signed** endpoint (not session-authenticated; cryptographically proven).
3. **Switch on `event.type`.** Stripe sends many events (payment failed, refund, dispute...). Process only what you handle, and politely return `{ received: true }` for the rest.
4. **Idempotency mindset** — Stripe retries webhook delivery on timeout/5xx. `featured: true` is naturally idempotent (setting it twice is harmless). Production handlers should be designed this way — or track processed IDs, or deduplicate. Because webhooks are **at-least-once**, never exactly-once.

### Local Testing with the Stripe CLI

Webhook testing locally requires Stripe's CLI to tunnel from Stripe's servers to your localhost:

```bash
# One-time install: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

The CLI prints a signing secret (`whsec_...`) — add it to `.env.local` (restart the server):

```env
STRIPE_WEBHOOK_SECRET=whsec_from_cli_output
```

Now the full test:

1. Dashboard → hit **Boost ₹499** on a non-featured job.
2. Stripe's checkout page opens — test card: `4242 4242 4242 4242`, any future date, any CVC.
3. Pay → redirected back to `/dashboard?boosted=...`.
4. The CLI terminal logs the `checkout.session.completed` event.
5. Refresh → the job now shows **★ Featured**.
6. Open the home page → that job is at the top.

**BoostButton** — same pattern as delete/toggle:

```tsx
// components/boost-button.tsx
"use client";

import { createCheckoutAction } from "@/app/(employer)/dashboard/actions";

export function BoostButton({
  jobId,
  featured,
}: {
  jobId: number;
  featured: boolean;
}) {
  if (featured) return null;

  return (
    <form action={createCheckoutAction}>
      <input type="hidden" name="jobId" value={jobId} />
      <button className="bg-purple-600 text-white text-sm rounded px-3 py-1.5">
        Boost ₹499
      </button>
    </form>
  );
}
```

## Test Checklist

1. Close a job → "Closed" badge on dashboard; disappears from home listing; detail page shows a banner + no Apply button.
2. Reopen → back to normal.
3. Delete a job with applications → nothing happens (blocked); delete a job with no applications → gone.
4. Boost → Stripe page → pay with test card → featured badge, then home-top placement.
5. Type `/dashboard?boosted=5` by hand without paying → nothing changes (the webhook is the only truth).

## Nutshell

The manage layer: schema evolves (`open` flag + migration — additive changes are safe), and actions use **query-level ownership guards** (`company: { ownerId }` inside `findFirst`/`update`) and `$transaction` for read-then-write. Delete is blocked when applications exist (business rule over DB cascade). The Stripe flow: **create a checkout session** (line items, paise-denominated `unit_amount`, `metadata.jobId`, origin-based URLs) → redirect to Stripe's hosted page → **webhook Route Handler** verifies the raw body + signature (`constructEvent`) → on `checkout.session.completed`, read `metadata.jobId` → `featured: true`. The `success_url` is never trusted — the cryptographic webhook is the source of truth. Local testing uses the Stripe CLI to forward webhooks to localhost.

## What It Is NOT

- **The webhook is not "our internal API endpoint."** The caller is Stripe (an external service); there's no session/auth. Identity is proved by the cryptographic signature, not a cookie. "Public-but-signed" is a different security model than "private-by-cookie."
- **`metadata` is not "secure storage."** It's a plain data-passing channel between session and webhook (tamper-proof only because the signature covers it; visible in the Stripe dashboard). Don't put secrets in it.
- **Test-mode keys are not "free production capacity."** `sk_test_`/`pk_test_` + `4242...` card = sandbox. Live mode is a separate activation. The demo stays on test keys.
- **`redirect(checkoutSession.url!)` is not "an internal redirect."** It's an external full URL — Next.js sends the browser there; app routing isn't involved. Returns happen via the `success_url`/`cancel_url`.
- **The blocked delete is not "a missing feature."** It's a deliberate business rule: preserve applicant data. DB cascade was technically possible — the choice guards an audit trail against accidental loss.

---

**In Your Own Words**

1. What breaks if you set `featured = true` from the `success_url` handler instead of the webhook?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Three ways it breaks: (1) A user can type `/dashboard?boosted=5` by hand, with no payment. (2) Someone pays for job #3, cancels, edits the query to `?boosted=999` on the redirect. (3) A browser refresh/retry re-triggers the logic, or a shared URL gets reprocessed. The `success_url` is client-controlled signal, not proof. The only trustworthy state-change is the server-side verified webhook — the signature proves Stripe sent it.

</details>

2. Why does the webhook handler use `req.text()` instead of `req.json()`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The Stripe signature is an HMAC hash over the **raw bytes**. `.json()` parses into an object — re-serialization changes spacing/key-order, the bytes no longer match, and `constructEvent` rejects with "no valid signature." Pass the raw string; the SDK parses it internally *after* verifying.

</details>

3. What's the difference between the ownership guard in the WHERE clause (`company: { ownerId }`) versus fetching first and then asserting?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Functionally the same (unauthorized access is blocked), but the WHERE-version is atomic: there's no gap between fetch and use (no TOCTOU — time-of-check-to-time-of-use). One query, no gap. And the intent is clearer in the code: "this employer's jobs" is a data-access policy expressed as a filter. The read-then-write pattern (fetch then toggle) is only needed when you actually need the value first — like in `toggleOpenAction`.

</details>

4. Why send `jobId` to Stripe as a string (`metadata.job.metadata`) — can't you pass the number directly?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Stripe's metadata values are strings only — that's an API contract. Passing a number risks the SDK rejecting it or coercing it inconsistently across versions. The explicit `String(job.id)` documents the contract; coming back, `Number(session.metadata?.jobId)` round-trips it safely. Respect a third-party API's primitive types — it prevents subtle version-dependent bugs.

</details>

5. If Stripe retries a webhook, the handler runs twice — is the double `featured = true` a problem here? Would it be for a "credit wallet" operation instead?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Here it's harmless — setting `featured = true` twice is the same result (idempotent). But for a "credit wallet ₹499" operation, a double-execution credits twice — real money lost. That's why idempotent webhook design matters: track processed event IDs (a table), use deduplication keys, or check current state before acting ("already credited? return"). Webhooks are at-least-once by design — handlers must be safe to replay.

</details>

---

The employer side is complete: post (AI-assisted) → manage → boost (paid) → review applications (next step). And the candidate-facing apply flow from C.4 (`/jobs/[slug]/apply`) still leads nowhere. **C.8** closes the loop: the apply form, **PDF file upload to Vercel Blob** (private!), the duplicate-apply guard firing for real at the database level, and the candidate's "My Applications" page where the "Scoring..." placeholder from C.2 finally gets its real score.

We'll explore this in detail in the next topic.