# 11 — Email: Resend, Nodemailer, SendGrid, Postmark

> Umbrella: Backend → Email
> Job: Send transactional emails — OTP, order confirmation, password reset
> Note: Marketing emails (newsletter) are a separate category — this doc covers transactional emails

---

## Why Not Send Directly via Gmail

```
Directly via Gmail:
  → Lands in spam
  → Rate limits (500/day)
  → Poor deliverability

Professional email service:
  → Lands in inbox
  → High deliverability
  → Analytics, tracking
  → Unsubscribe handling
```

---

## Two Types — Transactional vs Marketing

```
TRANSACTIONAL: Triggered by a user action
  → OTP, password reset, order confirmation, invoice
  → This doc is about these

MARKETING: Bulk, from the company side
  → Newsletter, offers, announcements
  → Tools: Mailchimp, SendGrid Marketing, Klaviyo
```

---

## Tools

---

### Resend
**Tag: 🟢 Most Popular 2024 | Developer-first | Recommended**

```
What it is: Modern email API — built for developers, perfect with React Email
When to use:
  → New project — almost always
  → Next.js / React project
  → When you want to write email templates in React

Special feature — React Email:
  → Email templates are built as React components
  → Write email in JSX — no HTML emails

Real app example:
  → Vercel's notification emails (they use Resend)
  → New Indian startups
  → ShopKaro's password reset, order confirmation

Code feel:
  import { Resend } from 'resend'
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'ShopKaro <orders@shopkaro.com>',
    to: user.email,
    subject: 'Order Confirmed!',
    react: <OrderConfirmationEmail order={order} />  // React component!
  })

React Email template:
  export function OrderConfirmationEmail({ order }) {
    return (
      <Html>
        <Body>
          <Heading>Order #{order.id} Confirmed!</Heading>
          <Text>Your order total: ₹{order.total}</Text>
        </Body>
      </Html>
    )
  }

Free tier: 3000 emails/month — plenty to start
Cons: Newer service — less track record than SendGrid

In India: Rapidly adopted after 2023
```

---

### Nodemailer
**Tag: 🟡 Classic | Self-configured | Free**

```
What it is: Node.js library — send email via Gmail, SMTP, any mail server
When to use:
  → Free solution needed
  → You have your own SMTP server
  → Small project, very few emails

With Gmail:
  → Free but with limits
  → App Password setup required
  → Not reliable in production (spam, limits)

Code feel:
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL, pass: process.env.APP_PASSWORD }
  })

  await transporter.sendMail({
    from: 'ShopKaro <noreply@gmail.com>',
    to: user.email,
    subject: 'Password Reset',
    html: '<p>Click <a href="...">here</a> to reset</p>'
  })

Real app example:
  → Personal projects, learning
  → Internal tools with low email volume

Cons:
  → Unreliable for production (Gmail limits)
  → HTML templates written manually
  → No analytics

In India: Bootcamp projects, personal apps
```

---

### SendGrid
**Tag: 🟢 Enterprise Standard | Owned by Twilio**

```
What it is: Established email service — both transactional + marketing
When to use:
  → Large scale (lakhs of emails/month)
  → Both marketing + transactional needed
  → Enterprise compliance needed

Difference from Resend:
  → SendGrid: Older, more features, complex setup
  → Resend: Developer-friendly, simpler API, newer

Free tier: 100 emails/day

Real app example:
  → Flipkart, Amazon India scale
  → Enterprise SaaS

In India: More common in established companies
```

---

### Postmark
**Tag: 🟢 Transactional Specialist | High Deliverability**

```
What it is: Transactional email specialist — only transactional, no marketing
When to use:
  → Highest deliverability needed
  → Transactional emails are critical (bank OTPs, payment receipts)
  → No marketing emails to send

Difference from Resend:
  → Postmark: Older, more proven deliverability, expensive
  → Resend: Newer, developer-friendly, cheaper

Real app example:
  → Fintech apps (payment confirmations)
  → B2B SaaS (critical notifications)

In India: Fintech, banking type apps
```

---

### AWS SES (Simple Email Service)
**Tag: 🟢 Cheapest at Scale | AWS ecosystem**

```
What it is: AWS's email service — very cheap at scale
When to use:
  → Already using AWS
  → Very high volume (lakhs of emails)
  → Cost is critical

Pricing: $0.10 per 1000 emails — very cheap

Cons:
  → Complex setup
  → Getting out of sandbox mode needs AWS approval
  → Poor developer experience compared to Resend

In India: Large companies on AWS (Zomato, Swiggy scale)
```

---

## Quick Decision

```
New project?
  → Resend (best DX, React Email support)

Free, learning project?
  → Nodemailer + Gmail (understand the limits)

Enterprise, high volume?
  → SendGrid or AWS SES

Fintech, critical emails?
  → Postmark (highest deliverability)

Already on AWS ecosystem?
  → AWS SES
```

---

## India Reality

```
Startups (2024):          Resend
Learning / personal:      Nodemailer
Enterprise / funded:      SendGrid or Postmark
AWS shops:                AWS SES
```

---

## Next Doc

`12-backend-queues.md` — Background Jobs + Queues — BullMQ, Inngest, Trigger.dev — after "order placed" on Swiggy, sending email and generating invoice — all that happens in a queue.
