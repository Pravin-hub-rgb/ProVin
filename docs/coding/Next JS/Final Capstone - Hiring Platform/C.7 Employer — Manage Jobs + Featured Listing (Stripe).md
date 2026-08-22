C.6 ke end mein employer jobs post kar sakta hai — AI draft ke saath. Par dashboard ki list sirf **dekhne** layak hai: job galat post ho gayi toh? Applications band karni ho toh? Aur sabse badi baat — C.0 wala paisa-wala feature abhi nahi hai: employer apni job ko **featured boost** karke upar dikhana chahta hai, aur uske liye **pay** karega. Aaj woh sab: manage actions + **Stripe Checkout**.

Stripe flow web development ka classic interview topic hai aur isme ek concept hai jo tak saare course mein nahi aaya: **webhook** — jab external service (Stripe) hamare app ko call karti hai.

# Hiring Platform — Part 7: Manage Jobs + Featured Listing

## Step 1 — Schema Update: `open` Flag (Migrations Dar Nahi Lagte)

**Problem:** Employer ne hiring band kar di. Job delete kar dein? Applications ka record bhi jayega. Behtar: job **open/closed** flag — closed job listing mein dikhe par apply na ho sake.

C.1 planning mein `open` field nahi thi — aur C.1 mein hi likha tha *"planning direction fix karti hai, har line freeze nahi karti."* Build-time schema adjustments normal hain; migrations isi liye exist karti hain (6.13.3: history + reproducibility).

```prisma
// prisma/schema.prisma — Job model ke andar:
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

Migration file bani (`add_job_open_flag/migration.sql` — `ALTER TABLE "Job" ADD COLUMN "open" BOOLEAN NOT NULL DEFAULT true`) + Prisma Client types refresh. Existing rows automatically `true` — default ka fayda.

> **Fear-remover:** Pehli migration se dar lagta tha ("schema change = sab tootega"). Reality: chhota additive change, ek command, poora trackable. Production apps mein har hafte migrations hoti hain.

Ab home query mein closed jobs filter (C.3 wale filters ke saath):

```tsx
// app/page.tsx — filters array build ke baad:
filters.push({ open: true });                                               // NEW

// findMany where same rahega:
where: filters.length > 0 ? { AND: filters } : undefined,
```

Aur detail page pe closed banner (C.4 ke JSX mein, Apply button se pehle):

```tsx
{!job.open && (
  <p className="bg-gray-100 text-gray-600 rounded px-4 py-3 mb-4">
    This job is no longer accepting applications.
  </p>
)}
{(job.open || true) && (                                                    // placeholder — niche fix hoga
```

Ruko — yeh condition galat hai. Sahi version: Apply button **sirf open job pe** dikhe:

```tsx
{job.open && (
  <a href={`/jobs/${slug}/apply`} className="inline-block bg-blue-600 ...">
    Apply for this job
  </a>
)}
```

## Step 2 — Manage Actions: Ownership Guard Ka Elegant Pattern

Teen actions chahiye: toggle open/closed, delete job, aur boost (Stripe — agle step). Pehle do simple ones.

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

  const result = await prisma.job.updateMany({
    where: { id: jobId, company: { ownerId: session.user.id } },
    data: { open: false },
  });

  revalidatePath("/dashboard");
}
```

Ruko — isme ek bug jaan-boojh ke hai. `updateMany` ne job ko **unconditionally `open: false`** kiya. Toggle hona chahiye tha (open → closed, closed → open). Fix:

```ts
export async function toggleOpenAction(formData: FormData) {                // CHANGED
  const session = await requireEmployer();                                  // CHANGED
  if (!session) return;                                                     // CHANGED

  const jobId = Number(formData.get("jobId"));                              // CHANGED

  await prisma.$transaction(async (tx) => {                                 // NEW
    const job = await tx.job.findFirst({                                    // NEW
      where: { id: jobId, company: { ownerId: session.user.id } },          // NEW
    });                                                                     // NEW
    if (!job) return;                                                       // NEW
                                                                            // NEW
    await tx.job.update({                                                   // NEW
      where: { id: job.id },                                                // NEW
      data: { open: !job.open },                                            // NEW
    });                                                                     // NEW
  });                                                                       // NEW
                                                                            // NEW
  revalidatePath("/dashboard");                                             // CHANGED
}                                                                           // CHANGED
```

Naye concepts:

- **Ownership guard WHERE ke andar** — `company: { ownerId: session.user.id }` — relation-filter (C.6 dashboard wala) ab security ke liye. Kisi doosre employer ka `jobId` daala toh `findFirst` null — kuch nahi hota. **Query-level authorization**: alag se "pehle fetch, phir check" ka extra step nahi.
- **`$transaction(async (tx) => {...})`** — read + write ek atomic unit mein. Yahan strictly zaroori nahi (single-user flow), par pattern seekhna zaroori: read-then-write flows mein beech mein koi aur change na ho jaye. `tx` transaction client hai — iske andar ke queries ek hi unit.
- **`updateMany` vs `update` note:** `updateMany` ownership-guard ke liye perfect single-statement hota (`data: { open: !?? }` nahi likh sakte bina padhe), isliye transaction + findFirst + update liya. Trade-offs samajhna important — tools fixed nahi hote.

### Delete — Applications Wali Complication

Delete simple hota... agar applications na hoti. `Application.jobId` FK hai — job delete karne pe Postgres **foreign key violation** throw karega jabki us job pe applications paddi hain (referential integrity — parent nahi marta jiska bacha zinda ho).

Options:

| Option | Matlab | Pasand? |
|---|---|---|
| DB cascade (`onDelete: Cascade`) | Job delete → applications auto-delete | Data loss — employer ne galti se dabaya toh applicants gaye |
| App-level block | Applications hain toh delete mana | Safe + honest — business rule code mein visible |

Block chunte hain:

```ts
export async function deleteJobAction(formData: FormData) {                // NEW
  const session = await requireEmployer();                                 // NEW
  if (!session) return;                                                    // NEW
                                                                           // NEW
  const jobId = Number(formData.get("jobId"));                             // NEW
                                                                           // NEW
  await prisma.$transaction(async (tx) => {                                // NEW
    const job = await tx.job.findFirst({                                   // NEW
      where: { id: jobId, company: { ownerId: session.user.id } },         // NEW
      include: { _count: { select: { applications: true } } },             // NEW
    });                                                                    // NEW
    if (!job) return;                                                      // NEW
    if (job._count.applications > 0) return;                               // NEW — block: pehle applicants dekho
                                                                           // NEW
    await tx.job.delete({ where: { id: job.id } });                        // NEW
  });                                                                      // NEW
                                                                           // NEW
  revalidatePath("/dashboard");                                            // NEW
}                                                                          // NEW
```

Silent-block thoda harsh UX hai — production mein message dikhaate ("X applications hain, unhe review karke hi delete kar sakte ho"). Abhi count-check ka concept hi main point hai. UI mein confirm() ke saath delete button — client island:

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

- **Hidden input** — form submit ke saath jobId travel karti hai; action `formData.get("jobId")` se leta hai
- **`confirm()` + preventDefault** — browser-native confirm dialog; cancel pe submit roka. Server Action forms mein bhi onSubmit normally kaam karta hai.

Toggle button similar — bina confirm:

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

Dashboard row mein dono buttons + featured badge add karo (C.6 wali list ko expand):

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

`BoostButton` abhi banega — pehle Stripe setup.

## Step 3 — Stripe: Setup + Checkout Session

### External Setup (10 minute)

1. **dashboard.stripe.com** → sign up (free)
2. Test mode ON rakho (default) — real paise nahi lagenge, test cards chalega
3. Developers → API keys → **Secret key** copy karo (`sk_test_...`)

```bash
npm install stripe
```

**`.env.local`:**

```env
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### Checkout Session Banana

**Concept:** Hum card details **kabhi handle nahi karte.** Card form, PCI compliance, fraud checks — sab Stripe ke hosted page pe. Hum sirf *ek checkout session* banate hain (kitna paisa, kis product ka) aur user ko Stripe pe redirect karte hain. Payment hone ke baad Stripe user ko wapas hamare app pe bhejta hai — aur **alag se hamare server ko batata hai** payment hua (webhook — agle step).

Paise integer-paise mein: ₹499 = `49900` (paisa unit avoid floating-point bugs).

**File:** `lib/stripe.ts`

```ts
// lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});
```

Boost action — dashboard actions mein:

```ts
// app/(employer)/dashboard/actions.ts — imports:
import { stripe } from "@/lib/stripe";                                      // NEW
import { headers } from "next/headers";                                     // NEW

export async function createCheckoutAction(formData: FormData) {           // NEW
  const session = await requireEmployer();                                 // NEW
  if (!session) return;                                                    // NEW
                                                                           // NEW
  const jobId = Number(formData.get("jobId"));                             // NEW
                                                                           // NEW
  const job = await prisma.job.findFirst({                                 // NEW
    where: { id: jobId, company: { ownerId: session.user.id } },           // NEW
  });                                                                      // NEW
  if (!job) return;                                                        // NEW
  if (job.featured) return; // already boosted — double charge se bacho    // NEW
                                                                           // NEW
  const origin = (await headers()).get("origin")                           // NEW
    ?? "http://localhost:3000";                                            // NEW
                                                                           // NEW
  const checkoutSession = await stripe.checkout.sessions.create({          // NEW
    mode: "payment",                                                       // NEW
    line_items: [                                                          // NEW
      {                                                                    // NEW
        quantity: 1,                                                       // NEW
        price_data: {                                                      // NEW
          currency: "inr",                                                 // NEW
          unit_amount: 49900, // ₹499 in paise                             // NEW
          product_data: { name: `Featured Listing: ${job.title}` },        // NEW
        },                                                                 // NEW
      },                                                                   // NEW
    ],                                                                     // NEW
    success_url: `${origin}/dashboard?boosted=${job.id}`,                  // NEW
    cancel_url: `${origin}/dashboard`,                                     // NEW
    metadata: {                                                            // NEW
      jobId: String(job.id),                                               // NEW
    },                                                                     // NEW
  });                                                                      // NEW
                                                                           // NEW
  redirect(checkoutSession.url!);                                          // NEW
}                                                                          // NEW
```

Line-by-line important bits:

- **Ownership + double-payment guards** — wohi findFirst relation-filter; featured already hai toh early return
- **`headers()` se origin** — success/cancel URLs absolute hone chahiye; deploy pe domain badlega, hardcode nahi
- **`metadata: { jobId }`** — **sabse important line.** Session ke saath free-form data attach — webhook (agle step) isi se pata karega *kaunsi* job boost karni hai. Metadata string-only hoti hai — `String(job.id)` conversion.
- **`redirect(session.url!)`** — Stripe-hosted hosted checkout page ka URL; user wahan jaata hai, card bharta hai (test mode mein test card)

### Webhook — Jab Stripe Hamein Bataye "Payment Ho Gaya"

**Problem:** User payment karke `success_url` pe wapas aaya. Kya hum URL dekh ke `featured = true` kar dein? **Kabhi nahi** — success_url user-controlled hai: koi `/dashboard?boosted=999` manually type kar sakta hai, bina pay kiye. URL = trust nahi.

Sahi source of truth: **Stripe khud hamare server pe HTTP POST kare** payment confirmation ke saath. Wohi webhook hai — external-service-calls-YOU pattern (Route Handler ka use-case jo Server Action handle nahi kar sakta — 3.x ka comparison live!).

**File:** `app/api/stripe/webhook/route.ts`

```ts
// app/api/stripe/webhook/route.ts
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text(); // RAW body — signature verify ke liye bytes chahiye
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

Is route ke chaar lessons:

1. **Raw body kyun?** Stripe har request ke saath cryptographic signature bhejta hai jo **exact bytes** pe computed hoti hai. Agar framework body parse karke JSON object bana de, bytes badal gaye — verification fail. Isliye `req.text()` — untouched string. (Yeh Route Handler mein trivial hai; Express-style middleware mein historically pain tha.)
2. **`constructEvent` = authentication.** Secret ke bina koi bhi hamare webhook pe fake "payment done" POST maar sakta tha! Signature verify fail → 400. Yeh route **public hai par verified hai** — auth session nahi, crypto proof.
3. **`event.type` switch** — Stripe bahut saare events bhejta hai (payment failed, refund, dispute...). Sirf jo handle karne ho woh process karo, baaki politely `{ received: true }`.
4. **Idempotency ka thought** — Stripe kabhi-kabhi same event dobara bhejta hai (retry on timeout). `featured: true` set karna idempotent operation hai — do baar bhi same result. Idempotent webhook handlers = production best practice (accident se double charge-effect nahi hoga).

### Local Testing — Stripe CLI

Webhook locally test karne ke liye Stripe ka CLI tumhare localhost tak Stripe ke servers ka tunnel banata hai:

```bash
# Ek baar install: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

CLI ek `whsec_...` signing secret print karega — **`.env.local` mein daalo** (server restart):

```env
STRIPE_WEBHOOK_SECRET=whsec_from_cli_output
```

Ab full test:

1. Dashboard → kisi non-featured job pe **Boost ₹499**
2. Stripe checkout page khulega — test card: `4242 4242 4242 4242`, koi bhi future expiry, koi bhi CVC
3. Pay → redirect back `/dashboard?boosted=...`
4. CLI terminal mein `checkout.session.completed` event log
5. Page refresh → job pe **★ Featured** badge
6. Home page → wohi job sabse upar

**BoostButton component** — delete/toggle jaisa hi pattern:

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

**TEST checklist:**

1. Job close karo → badge "Closed", home listing se gayab, detail page banner + no apply button
2. Reopen → wapas sab normal
3. Application-wali job delete → kuch nahi hota (block); empty job delete → gayab
4. Boost → Stripe page → test card pay → featured badge + home top
5. Directly `/dashboard?boosted=5` type karo bina pay kiye → kuch nahi badla (webhook hi boss hai)

## Nutshell

Manage layer: schema evolve (`open` flag + migration — additive changes safe), actions mein **query-level ownership guard** (`company: { ownerId }` relation-filter inside `findFirst/updateMany`), `$transaction` read-then-write units, delete pe application-count block (business rule > DB cascade). Stripe flow: **checkout session create** (line_items price_data paise-mein, `metadata.jobId`, origin-based urls) → user Stripe-hosted page pe → **webhook Route Handler** raw-body + `constructEvent` signature-verify → `checkout.session.completed` → metadata se jobId → `featured: true`. Success URL kabhi trust nahi — webhook authenticated by cryptography, not sessions. Local testing Stripe CLI forward ke saath.

## What It Is NOT

- **Webhook = "hamara internal API endpoint" nahi.** Caller external service hai (Stripe), auth session nahi hota — identity cryptographic signature se prove hoti hai. Public-but-signed endpoint ka alag mental model hai.
- **`metadata` = "secure storage" nahi.** Woh plain data-passing channel hai session↔webhook ke beech (tamper-proof hai — signature se cover — but Stripe dashboard pe visible). Secrets/kuch sensitive metadata mein mat daalo.
- **Test mode keys = "real money" nahi.** `sk_test_`/`pk_test_` + `4242...` card = sandbox. Live mode alag activation hai. Deploy pe (C.12) bhi test keys hi rakhenge — safe demo.
- **`redirect(checkoutSession.url!)` = "internal redirect jaisa" nahi.** External full-URL hai — Next.js browser ko wahan le jaata hai, apna routing involve nahi hota. Wapsi success/cancel URLs se hoti hai.
- **Blocked delete = "feature missing" nahi.** Business rule hai: applicants ka record preserve karna. DB cascade technically possible tha — choice deliberate hai (audit trail + accidental-data-loss protection).

---

**In Your Own Words**

1. Success URL pe `featured=true` set karna kitne tarike se toot sakta hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** (1) User manually `/dashboard?boosted=5` type kare — bina payment. (2) Cancel karke URL edit karke wapas aaye. (3) Browser refresh/retry pe duplicate logic chale. Success URL client-controlled signal hai, proof nahi. Server-side verified webhook hi ek trusted source hai — isliye state-change wahin hota hai.

</details>

2. Webhook route mein `req.text()` kyun, `req.json()` kyun nahi?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Stripe signature exact raw bytes pe HMAC hash hai. `.json()` parse karke object banata hai — re-serialization mein spacing/key-order change ho sakta hai, bytes match nahi, `constructEvent` fail ho jayega ("no valid signature"). Raw string pass karo, library khud parse karti hai verify ke baad via `JSON.parse(event)` internally.

</details>

3. Ownership check query ke WHERE mein (`company: { ownerId }`) vs pehle fetch phir if-check — dono ka fark kya hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Functional same (unauthorized access blocked), par WHERE-version atomic hai — fetch aur use ke beech race window nahi (TOCTOU — time-of-check-to-time-of-use problem). Ek query kam. Aur intent clear: "apni company ki job" condition data-access policy ke roop mein document hai. Read-then-write zaroori ho (toggle jaisa) tab $transaction + findFirst pattern.

</details>

4. `metadata.jobId` String mein kyun bheja, number directly kyun nahi?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Stripe metadata values string-only accept karti hai (API contract). Number pass karoge toh SDK/API reject ya stringify karega depending on version — explicit `String(job.id)` intention clear karta hai. Wapas aate waqt bhi string hi milti hai (`Number(metadata?.jobId)` round-trip). Third-party APIs ke primitive-type contracts respect karne hi best practice hain.

</details>

5. Stripe retry kare webhook delivery — double `featured=true` update harmless hai, par agar action "₹499 wallet credit" hota toh?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Wallet credit double ho jaata — paisa bug! Isliye webhook handlers **idempotent** design karte hain: processed event IDs store karo (table), duplicate event ID mile toh skip. Ya state-machine style check ("already credited? return"). Hamara featured-flag case naturally idempotent hai (set true twice = same), par general rule yaad rakhna: webhooks at-least-once deliver hote hain, exactly-once nahi.

</details>

---

Employer side complete: post (AI-assisted), manage, boost (paid). Ab dusri taraf ka khel — **candidate**. C.8 mein: job detail se apply form, PDF resume upload **Vercel Blob** pe (private!), duplicate-apply guard DB level pe, aur candidate ka My Applications page. Resume private kyun aur public URL kyun nahi — file-security ka pehla lesson bhi.
