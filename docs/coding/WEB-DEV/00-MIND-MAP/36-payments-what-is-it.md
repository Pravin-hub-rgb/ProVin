# 36 — Payments: What Is the Umbrella

> Caching is complete.
> Now the eighth umbrella — **Payments**.
> The core of e-commerce — Priya pays, how exactly does this happen?

---

## Handling Payments Yourself Is Dangerous

A user's credit card number passing through your server → you're responsible for its security. This is **PCI DSS compliance** — very strict rules.

That's why nobody handles payments themselves. They use a **Payment Gateway** — Razorpay, Stripe, Paytm — which handle everything.

---

## What a Payment Gateway Does

```
Your app ← → Razorpay ← → Bank
```

Your app just tells Razorpay — "Collect this much money from this user." Razorpay handles the rest — card details, bank communication, security.

The card number never reaches your server.

---

## What's Inside the Payments Umbrella

```
PAYMENTS
│
├── Payment Flow (how to integrate Razorpay)  → Doc 37
└── Webhooks (how payment confirmation arrives) → Doc 38
```

---

## Razorpay vs Stripe — For ShopKaro

| | Razorpay | Stripe |
|--|----------|--------|
| For India | ✓ Best | Works, but complex |
| UPI support | ✓ | ✗ |
| INR | ✓ Native | ✓ |
| International | Limited | ✓ Best |
| Documentation | Hindi/English | English |

**ShopKaro (India) → Razorpay.**

---

## Next Doc

`37-payments-flow.md` — The complete payment flow step by step — how Razorpay integration will work in ShopKaro.
