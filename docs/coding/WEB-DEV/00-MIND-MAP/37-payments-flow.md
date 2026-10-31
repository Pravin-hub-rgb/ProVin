# 37 — Payment Flow: Razorpay in ShopKaro

> Previous doc gave an overview of the payments umbrella.
> Now **Razorpay integration** — step by step.

---

## The Complete Payment Flow

```
1. Priya clicks "Place Order"

2. ShopKaro Backend → tells Razorpay:
   "Create a payment of ₹2999"
   Razorpay → "Okay, here's order_id: rzp_order_abc123"

3. ShopKaro Frontend → opens Razorpay checkout
   (Razorpay's own UI — card/UPI/netbanking)

4. Priya pays in Razorpay's UI

5. Razorpay → tells ShopKaro Frontend:
   "Payment done — payment_id: pay_xyz789"

6. ShopKaro Frontend → sends to ShopKaro Backend:
   { orderId, paymentId, signature }

7. ShopKaro Backend → verifies the signature
   (Confirms it genuinely came from Razorpay, not fake)

8. Verified → Order status "PAID" → Done
```

---

## Step 2 — Backend: Create a Razorpay Order

```javascript
// /app/api/orders/route.js
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(req) {
  const session = await getSession()
  if (!session) return Response.json({ error: "Please log in" }, { status: 401 })

  // Get cart items
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.userId },
    include: { product: true }
  })

  // Calculate total
  const total = cartItems.reduce((sum, item) =>
    sum + (item.product.price * item.quantity), 0
  )

  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: total * 100,  // Razorpay wants paise (100 = ₹1)
    currency: 'INR',
    receipt: `order_${Date.now()}`
  })

  // Save order in DB (status: PENDING)
  const order = await prisma.order.create({
    data: {
      userId: session.userId,
      total,
      status: 'PENDING',
      paymentId: razorpayOrder.id,
      address: "...",  // get from req.body
    }
  })

  return Response.json({
    orderId: order.id,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: 'INR',
    keyId: process.env.RAZORPAY_KEY_ID  // Frontend needs this
  })
}
```

---

## Steps 3-5 — Frontend: Razorpay Checkout

```jsx
// /components/CheckoutButton.jsx
'use client'

import Script from 'next/script'

export default function CheckoutButton() {
  async function handlePayment() {
    // Create order on backend
    const { razorpayOrderId, amount, keyId, orderId } =
      await fetch('/api/orders', { method: 'POST', ... }).then(r => r.json())

    // Open Razorpay checkout
    const options = {
      key: keyId,
      amount,
      currency: 'INR',
      order_id: razorpayOrderId,
      name: 'ShopKaro',
      description: 'Order Payment',

      handler: async function(response) {
        // Payment done — verify on backend
        await fetch('/api/payments/verify', {
          method: 'POST',
          body: JSON.stringify({
            orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          })
        })

        // Go to order confirmation page
        window.location.href = `/orders/${orderId}`
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button onClick={handlePayment}>Pay Now</button>
    </>
  )
}
```

---

## Step 7 — Backend: Verify

```javascript
// /app/api/payments/verify/route.js
import crypto from 'crypto'

export async function POST(req) {
  const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
    await req.json()

  // Verify signature
  const body = razorpayOrderId + "|" + razorpayPaymentId
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex')

  if (expectedSignature !== razorpaySignature) {
    return Response.json({ error: "Invalid payment" }, { status: 400 })
  }

  // Verified! Update order
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'PAID',
      paymentId: razorpayPaymentId
    }
  })

  // Clear cart
  await prisma.cartItem.deleteMany({
    where: { userId: session.userId }
  })

  return Response.json({ message: "Payment successful!" })
}
```

---

## Next Doc

`38-payments-webhooks.md` — **Webhooks** — what if Priya paid but the browser closed before verification? The webhook works as a backup. An important concept.
