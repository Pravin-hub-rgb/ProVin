# 04 — Sessions: Remembering the User After Login

> In the previous doc we learned how to hash passwords with bcrypt.
> The next question — Priya has logged in, **how will we know she's logged in from now on?**

---

## Problem — HTTP Is Forgetful

A fundamental problem of the web — **HTTP is stateless.**

Meaning every request is independent. The server has no memory of the previous request.

```
Request 1: POST /api/login → Server: "Okay, Priya logged in"
Request 2: GET /api/orders → Server: "Who's this? No idea 🤷"
```

The server forgets. Every time is a fresh start.

So the problem is — Priya logs in, browses products, adds to cart, places an order — at every step the server needs to remember that **this is Priya.**

---

## Solution — Sessions

A session is a way to remind the server.

Here's how it works:

```
1. Priya logs in → correct credentials

2. Server creates a unique Session ID
   sessionId = "a3f9b2c1d4e5..."  (random string)

3. Server stores this Session ID on its side
   (in the database or in memory)
   sessions = {
     "a3f9b2c1d4e5": { userId: 1, email: "priya@gmail.com" }
   }

4. This Session ID → sent to Priya's browser in a Cookie

5. Now Priya's browser automatically sends this cookie with every request

6. Server reads the cookie → extracts the Session ID → "Yes, this is Priya"
```

---

## What Is a Cookie?

A cookie is a **small piece of data stored in the browser** — that automatically goes to the server with every request.

```
Browser has:
Cookie: sessionId=a3f9b2c1d4e5

With every request, this header is sent automatically:
GET /api/orders
Cookie: sessionId=a3f9b2c1d4e5
```

There's a separate doc on cookies — `06-auth-cookies.md` — we'll understand them in detail there.

---

## Session Flow — The Full Picture

```
SIGNUP/LOGIN:
Priya → POST /api/login → Server verifies → Create session → Send cookie

PROTECTED PAGE:
Priya → GET /dashboard
        Cookie: sessionId=abc123
        → Server: find user from sessionId → It's Priya → Send data

LOGOUT:
Priya → POST /api/logout → Server: delete session → clear cookie
```

---

## Sessions in ShopKaro — How We'll Do It

In Next.js, for sessions we can use libraries like **`iron-session`** or **`express-session`**. In ShopKaro we'll use `iron-session` — it works well with Next.js.

### Login API Route:

```javascript
// /app/api/auth/login/route.js

import { getIronSession } from 'iron-session'

export async function POST(req) {
  const { email, password } = await req.json()

  // 1. Find the user
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return Response.json({ error: "User not found" }, { status: 401 })

  // 2. Compare the password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return Response.json({ error: "Wrong password" }, { status: 401 })

  // 3. Create the session
  const session = await getIronSession(req, res, sessionOptions)
  session.userId = user.id
  session.email = user.email
  await session.save()  // Cookie gets set

  return Response.json({ message: "Logged in!" })
}
```

### Protected Route — Session Check:

```javascript
// /app/api/orders/route.js

export async function GET(req) {
  const session = await getIronSession(req, res, sessionOptions)

  // Check the session
  if (!session.userId) {
    return Response.json({ error: "Please login" }, { status: 401 })
  }

  // User is logged in — send data
  const orders = await prisma.order.findMany({
    where: { userId: session.userId }
  })

  return Response.json(orders)
}
```

### Logout:

```javascript
// /app/api/auth/logout/route.js

export async function POST(req) {
  const session = await getIronSession(req, res, sessionOptions)
  session.destroy()  // Delete the session
  return Response.json({ message: "Logged out" })
}
```

---

## Where Is the Session Stored?

```
Option 1 — In the database (we'll do this in ShopKaro)
  Pros: Reliable, deleted instantly on logout
  Cons: Database query on every request

Option 2 — In memory (server RAM)
  Pros: Fast
  Cons: All sessions gone on server restart

Option 3 — Redis (cache database)
  Pros: Fast + Persistent
  Cons: Extra setup — learn later
```

ShopKaro v1 → **store sessions in the database** (simplest approach).

---

## One Important Security Point

The Session ID must be **impossible to guess.** So:

```javascript
// Don't do this — predictable
sessionId = user.id  // "1", "2", "3" — easily guessable

// Do this — random
sessionId = crypto.randomUUID()  // "a3f9b2c1-d4e5-..." — impossible to guess
```

`iron-session` and similar libraries handle this automatically.

---

## Summary

| | |
|--|--|
| **What is a session** | User info stored on the server, linked via Session ID |
| **What the cookie does** | Delivers the Session ID from browser to server |
| **In ShopKaro** | Create session on login, check on every request, delete on logout |
| **Where to store** | Database (v1), Redis (later) |

---

## Next Doc

`05-auth-jwt.md` — Sessions were one way. There's another popular way — **JWT (JSON Web Token)**. It's quite different from sessions. When to use which — we'll understand that.