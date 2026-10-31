# 05 — JWT: The Second Way, After Sessions

> In the previous doc we saw Sessions — stored on the server, ID in the cookie.
> Now another approach — **JWT (JSON Web Token).**
> You'll encounter this concept in many places — important to understand.

---

## A Problem With Sessions

With sessions, the server has to **check the database on every request:**

```
Priya makes a request → Server: find sessionId in database → It's Priya → Response
```

With lakhs of users, hitting the database every time can get slow.

JWT solves this problem differently.

---

## What Is JWT

JWT is a **self-contained token.** Meaning — all the information is inside the token itself. The server doesn't need to check the database.

```
SESSION approach:
Token → Server → Database check → "Yes, it's Priya" → Response

JWT approach:
Token → Server → Verify token (no database) → "Yes, it's Priya" → Response
```

---

## What a JWT Looks Like

A JWT has three parts, separated by dots:

```
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoicHJpeWFAZ21haWwuY29tIn0.xK9mN3pQ...
      HEADER              PAYLOAD                                    SIGNATURE
```

### Part 1 — Header
Tells which algorithm was used to sign the token:
```json
{ "alg": "HS256" }
```

### Part 2 — Payload
The actual data — and **this is public**, not encrypted:
```json
{
  "userId": 1,
  "email": "priya@gmail.com",
  "exp": 1735689600  // Expiry time
}
```

### Part 3 — Signature
This verifies that the token wasn't tampered with:
```
HMACSHA256(header + payload, SECRET_KEY)
```

---

## How JWT Works

```
LOGIN:
1. Priya logs in → correct credentials
2. Server → creates a JWT (puts userId, email inside)
3. Signs the JWT with the secret key
4. Sends the JWT to Priya's browser (cookie or localStorage)

PROTECTED REQUEST:
1. Priya makes a request → sends the JWT along
2. Server → verifies the JWT's signature (with the secret key)
3. Valid → extracts userId from the payload → sends response
4. Database check? NO — everything's in the token
```

---

## The Most Important Point About JWT — The Signature

A JWT's payload is **publicly readable** — anyone can decode it:

```javascript
// Anyone can do this — no key needed
atob("eyJ1c2VySWQiOjF9")  // → { userId: 1 }
```

But **no one can modify it** — because the signature would break:

```
Original: { userId: 1 }  → Signature: "abc123"
Tampered: { userId: 99 } → Signature: "abc123"  ← MISMATCH → Server rejects
```

That's why **don't put sensitive data in a JWT** — passwords, credit cards — because the payload is readable. Put only non-sensitive info like userId, email.

---

## Sessions vs JWT — When to Use Which?

| | Sessions | JWT |
|--|---------|-----|
| Storage | Server (database) | Client (browser) |
| Database hit per request | Yes | No |
| Logging out | Easy — delete from database | Hard — valid until it expires |
| Scalability | Complex (multiple servers) | Easy |
| Complexity | Simple | A bit complex |

### What should ShopKaro use?

**Sessions** — because:
- Simple, beginner-friendly
- Logout works properly
- ShopKaro runs on a single server for now

JWT is very popular — and you'll definitely encounter it in future projects. That's why understanding the concept was necessary.

### When is JWT the right choice?
- Multiple servers (microservices)
- Mobile app + web app using the same API
- Need to give access to third-party services too

---

## JWT in ShopKaro — Example (If You Use It)

```javascript
import jwt from 'jsonwebtoken'

// Create token at login
const token = jwt.sign(
  { userId: user.id, email: user.email },  // Payload
  process.env.JWT_SECRET,                   // Secret key
  { expiresIn: '7d' }                       // Expires in 7 days
)

// Send the token in a cookie
// (more about cookies in the next doc)
```

```javascript
// Verify on a protected route
const token = req.cookies.token
const decoded = jwt.verify(token, process.env.JWT_SECRET)
// decoded = { userId: 1, email: "priya@gmail.com" }
```

---

## Summary

| | |
|--|--|
| **What is JWT** | A self-contained token holding user info |
| **Difference from sessions** | Server doesn't check the database |
| **Payload** | Public — readable, but tamper-proof |
| **In ShopKaro** | We'll use sessions — understand JWT for the concept |

---

## Next Doc

`06-auth-cookies.md` — Whether it's sessions or JWT — **Cookies** are needed to deliver them to the browser. What exactly a cookie is, how it gets set, and what security settings it should have — we'll understand all of that.