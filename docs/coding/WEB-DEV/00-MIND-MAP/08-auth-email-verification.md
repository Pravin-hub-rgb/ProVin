# 08 — Email Verification & Password Reset

> In the previous doc we saw OAuth — Google/GitHub login.
> Now a part of ShopKaro v1 — **Email Verification** and **Password Reset**.
> Both are token-based flows — the concept is the same in both.

---

## Why Is Email Verification Necessary?

If you don't verify emails:
- Anyone can register with "priya@gmail.com" — whether it's actually Priya's email or not
- Spam accounts can be created easily
- Password reset emails will go to the wrong place

---

## Email Verification Flow

```
1. Priya signs up
   → Account is created in the database
   → emailVerified = false

2. Server → creates a unique random token
   token = "x7k2m9p..." (random, expires in 24 hours)
   → Token is saved in the database (with userId)

3. Server → sends an email to Priya
   "Click this link to verify:
   shopkaro.com/verify-email?token=x7k2m9p..."

4. Priya clicks the link

5. Server → checks the token
   - Does the token exist? ✓
   - Has it expired? ✓ (must NOT be expired)
   - Does it belong to the right user? ✓

6. → emailVerified = true → delete the token → log Priya in
```

---

## Password Reset Flow

```
1. Priya clicks "Forgot Password", enters her email

2. Server → finds the user → creates a token → sends email
   "shopkaro.com/reset-password?token=abc123"

3. Priya clicks the link → enters a new password

4. Server → verifies the token → updates the password (bcrypt hash) → deletes the token

5. Done — Priya can log in with the new password
```

---

## How to Create a Token

```javascript
import crypto from 'crypto'

// Secure random token
const token = crypto.randomBytes(32).toString('hex')
// → "a3f9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0"

// Expiry time — 24 hours from now
const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
```

---

## What Gets Stored in the Database

```
EmailVerificationToken table:
id | userId | token        | expiresAt
---|--------|--------------|----------
1  | 1      | "a3f9b2..." | 2024-01-02 10:00:00

PasswordResetToken table:
id | userId | token        | expiresAt | used
---|--------|--------------|-----------|-----
1  | 1      | "x7k2m9..."  | 2024-01-02| false
```

After a token is used → **delete it immediately** (or mark `used = true`). One token should work only once.

---

## How to Send Email in ShopKaro

To send email you need a service — you can't send directly from the server (spam filters block it).

Popular options:
- **Resend** — developer-friendly, good free tier
- **Nodemailer + Gmail** — simple, free, has limits
- **SendGrid** — popular for production

In ShopKaro v1 → **Resend** or **Nodemailer** — both are simple.

```javascript
// Sending email with Resend
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'ShopKaro <noreply@shopkaro.com>',
  to: user.email,
  subject: 'Verify your email',
  html: `<a href="shopkaro.com/verify?token=${token}">Verify</a>`
})
```

---

## Important Security Points

**The token must be strong** — `crypto.randomBytes(32)` — impossible to guess

**Expiry is mandatory** — the link shouldn't work after 24 hours

**Token works only once** — delete after use

**Rate limiting** — the same email shouldn't be able to request a reset repeatedly (learn later)

---

## Summary

| | |
|--|--|
| **Email verification** | On signup: token → email → verify → account activates |
| **Password reset** | Token → email → new password → delete token |
| **Token how** | crypto.randomBytes — a secure random string |
| **Email service** | Resend or Nodemailer |

---

## Next Doc

`09-auth-libraries.md` — We built everything ourselves — bcrypt, sessions, email. But in real projects, libraries like **NextAuth, Clerk, Auth.js** are also used. When to build yourself, when to use a library — we'll understand that decision. And this is the last doc of the Authentication umbrella.