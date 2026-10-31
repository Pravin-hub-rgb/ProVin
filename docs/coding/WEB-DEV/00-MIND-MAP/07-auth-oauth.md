# 07 — OAuth: How Does "Login with Google" Work

> In the previous doc we understood cookies — how sessions/JWT reach the browser.
> Now a popular concept — **OAuth**. Not used in ShopKaro v1, but you'll see it everywhere.

---

## The Problem OAuth Solves

Imagine you want to use a new app — **ShopKaro.**

Option 1: Create a new email + password → boring, takes time
Option 2: "Login with Google" → one click, done

Option 2 is very popular — and users prefer it too.

But the question is — **how does ShopKaro know your Google password?**

Answer: **It doesn't. And it shouldn't.**

That's what OAuth does.

---

## OAuth Flow — How It Works

```
1. Priya clicks "Login with Google" on ShopKaro

2. ShopKaro → redirects Priya to Google
   "Google, this is ShopKaro — ask Priya if she can share her
   name and email with me"

3. Google → asks Priya
   "ShopKaro wants to access your name and email. Allow?"

4. Priya → clicks "Allow"

5. Google → sends ShopKaro a **code**
   "Here's a temporary code"

6. ShopKaro → sends the code to Google
   "Take this code, give me Priya's info"

7. Google → gives ShopKaro the info
   { name: "Priya Sharma", email: "priya@gmail.com" }

8. ShopKaro → finds/creates Priya's account → Logged in!
```

**Throughout the entire process, ShopKaro never learns Priya's Google password.**

---

## Key Terms

**Provider** — The account you're logging in with (Google, GitHub, Facebook)

**Client** — Your app (ShopKaro)

**Scope** — What information is being asked for (just email? or contacts too?)

**Access Token** — Given by Google to ShopKaro — for future API calls

---

## When to Add OAuth to ShopKaro?

**Not in v1** — because:
- Setup is a bit complex (you have to register your app in Google Console)
- You should understand basic auth first

**Add it in v2** — once basic auth is comfortable.

---

## How to Add OAuth in Next.js — Using NextAuth

NextAuth / Auth.js makes OAuth very simple:

```javascript
// /app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const { GET, POST } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ]
})
```

That's it — Google login ready in 10 lines.

`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` come from Google Console when you register your app.

---

## OAuth vs Password Login — You Can Have Both

ShopKaro can have both options:

```
Login Page:
┌─────────────────────────┐
│  Email: ____________    │
│  Password: _________    │
│  [Login]                │
│                         │
│  ─── or ───             │
│                         │
│  [G] Login with Google  │
│  [GitHub Login]         │
└─────────────────────────┘
```

These are separate flows — but the end result is the same: user logged in, session/cookie set.

---

## Summary

| | |
|--|--|
| **What is OAuth** | Login via a third party — without knowing their password |
| **Flow** | App → Provider → User allows → Code → Token → Info |
| **In ShopKaro** | We'll add it in v2 using NextAuth |
| **In v1** | Only email/password — built ourselves |

---

## Next Doc

`08-auth-email-verification.md` — Priya signed up — but is that email really hers? How does **Email Verification** and **Password Reset** work — tokens, expiry — we'll understand all of that. This is also part of ShopKaro v1.