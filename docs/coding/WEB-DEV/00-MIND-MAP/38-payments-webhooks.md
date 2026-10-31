# 38 — Webhooks: Payment Confirmation Backup

> Previous doc covered the Razorpay payment flow.
> Now **Webhooks** — an important safety net.

---

## Problem — What If the Browser Closes?

Priya paid on Razorpay. Payment successful.

But after payment — **internet cut off or browser closed.**

The frontend never called `/api/payments/verify`. The order stayed PENDING.

Priya's money is gone — order not confirmed. Problem!

---

## Solution — Webhook

**Webhook** = Razorpay itself tells your server when a payment happens.

```
Normal flow (from frontend):
Payment → Frontend → /api/payments/verify → Order PAID

Webhook flow (directly from Razorpay):
Payment → Razorpay → /api/webhooks/razorpay → Order PAID
```

The webhook is a **backup** — even if the frontend fails, Razorpay directly informs the server.

---

## How a Webhook Works

1. Set the webhook URL in the Razorpay Dashboard: `https://shopkaro.com/api/webhooks/razorpay`
2. Whenever any payment happens → Razorpay automatically sends a POST request to that URL
3. Your server receives it, updates the order

---

## Webhook Handler — ShopKaro

```javascript
// /app/api/webhooks/razorpay/route.js

import crypto from 'crypto'

export async function POST(req) {
  const body = await req.text()  // Raw body needed for signature verification
  const signature = req.headers.get('x-razorpay-signature')

  // Verify this genuinely came from Razorpay
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex')

  if (expectedSignature !== signature) {
    return Response.json({ error: "Invalid webhook" }, { status: 400 })
  }

  const event = JSON.parse(body)

  // Payment success event
  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity
    const razorpayOrderId = payment.order_id

    // Find and update the order
    const order = await prisma.order.findFirst({
      where: { paymentId: razorpayOrderId }
    })

    if (order && order.status === 'PENDING') {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'PAID', paymentId: payment.id }
      })
    }
  }

  return Response.json({ received: true })
}
```

---

## Idempotency — Don't Update Twice

Both the webhook and the frontend may call `verify` — the order shouldn't become PAID twice.

```javascript
// Check if already PAID first
if (order && order.status === 'PENDING') {  // Only update PENDING ones
  await prisma.order.update(...)
}
// If already PAID → Skip — no problem
```

This is **idempotency** — doing the same operation multiple times gives the same result.

---

## Payments Umbrella — Complete

```
PAYMENTS
│
├── Payment Flow (Razorpay) → Doc 37 ✓
└── Webhooks                → Doc 38 ✓ (THIS)
```

---

## Next Doc

`39-performance-what-is-it.md` — New umbrella — **Performance**. How to make the app fast — images, lazy loading, pagination. Techniques to make ShopKaro smooth.
