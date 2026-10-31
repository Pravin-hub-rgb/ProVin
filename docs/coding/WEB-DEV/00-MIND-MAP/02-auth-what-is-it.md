# 02 — Authentication: What Is the Umbrella

> In the previous doc we made ShopKaro's rough plan.
> Now the first big umbrella — **Authentication**.
> This doc is just an overview — each thing inside has its own separate doc.

---

## What Is Authentication?

In one line: **proving "who this user is."**

When Priya comes to ShopKaro and says "I'm Priya" — how does the app know she's really Priya and not someone pretending to be Priya?

That's what Authentication solves.

---

## Authentication vs Authorization — What's the Difference?

These two words confuse a lot of people — get them clear once:

| | Meaning | ShopKaro Example |
|--|---------|-----------------|
| **Authentication** | "Who are you?" — proving identity | Priya logged in — yes, this is Priya |
| **Authorization** | "What are you allowed to do?" — access control | Priya can only see her own orders, not someone else's |

Authentication happens first, then Authorization.

---

## What's Inside the Authentication Umbrella

```
AUTHENTICATION
│
├── Password Hashing (bcrypt)
│   → How to store the user's password safely
│
├── Sessions
│   → How to "remember" the user after login
│
├── JWT (JSON Web Tokens)
│   → An alternative to sessions
│
├── Cookies
│   → How to deliver the session or JWT to the browser
│
├── OAuth
│   → The "Login with Google" system
│
├── Email Verification + Password Reset
│   → Sending a link via email, verifying a token
│
└── Auth Libraries
    → NextAuth, Clerk, Auth.js — ready-made solutions
```

In ShopKaro we'll **use all of these** — one at a time.

---

## ShopKaro's Authentication Flow — Roughly

### Signup:
```
1. Priya fills the form → email + password
2. Server hashes the password (bcrypt)
3. Saved in the database → email + hashed password
4. Session is created
5. Priya is now logged in
```

### Login:
```
1. Priya enters email + password
2. Server finds the email in the database
3. Compares the password (bcrypt)
4. Match → create Session → send Cookie
5. Priya is logged in
```

### Every Request:
```
1. Priya opens a page
2. Browser automatically sends the cookie
3. Server checks the cookie → "Yes, this is Priya"
4. Sends the data
```

### Logout:
```
1. Priya clicks logout
2. Server deletes the session
3. Cookie is cleared
4. Priya is logged out
```

---

## Decisions to Make in ShopKaro

**Decision 1 — How to store the password?**
- Plain text? ❌ (Never — if the DB leaks, all passwords are exposed)
- Encrypted? (Reversible) — a bit better, but still risky
- Hashed? (bcrypt) ✓ — This is what we'll do

**Decision 2 — How to remember the user after login?**
- Sessions → stored on the server, only the ID is in the cookie
- JWT → everything is in the token, nothing stored on the server

In ShopKaro → we'll use **Sessions** (simple, beginner-friendly)

**Decision 3 — Is Google/GitHub login needed?**
- Not in ShopKaro v1 — only email/password
- Can be added later → we'll understand it in the OAuth doc

---

## One Important Thing

Authentication is a topic where **making mistakes is dangerous.**

If you store passwords the wrong way or handle sessions incorrectly — user data can become unsafe.

That's why in these docs we'll understand the **why** too — not just the "how."

---

## Next Doc

`03-auth-password-hashing.md` — How is Priya's password stored in the database? What is bcrypt, what is hashing, and why should a password never be stored in plain text.