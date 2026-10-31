# ⚙️ Phase 3: Topic 18 - Middleware & Edge Runtime

> **Interview Question:** "What is Next.js Middleware? What is the Edge Runtime? Where does middleware run? How do you do auth checks, redirects, rewrites? Why does it run on the edge?"

---

## 🚨 **The Golden Rule — Understand This First!**

> **"Middleware is the security guard standing at your house's gate. Everyone has to pass through him before entering. He can stop a request, redirect it, modify it, or let it through."**

Edge Runtime means this security guard doesn't stand outside your house — he stands right next to the user's house. Nearest, fastest.

---

## 💡 Beginner-Friendly Explanation (Real World Analogy)

```
🛂 Airport Security Check:
You're going to the airport to catch a flight.
✈️  You reached the gate
🛂  The security guard stops you (Middleware)
    → Checks your ticket
    → Checks your ID
    → If everything's fine → lets you in
    → If wrong → sends you back (Redirect)
    → If you have something prohibited → doesn't let you in

⚡ Normal Server:
The security guard is at Delhi airport and you're coming from Bangalore. You fly 2 hours to Delhi, then security stops you. Wasted time.

⚡ Edge Runtime:
The security guard stands right at Bangalore airport. The moment you step out, he checks you. If not allowed, he stops you right there in Bangalore. No time wasted.
```

✅ **What Middleware Does:**
- Runs **before** the request reaches anything
- Before cache, before page render
- This is the very first thing that runs

✅ **Advantage of Edge Runtime:**
- Runs on the server nearest to the user
- Response comes in less than 50ms
- The request doesn't even reach the origin server

---

## 📊 Middleware Flow Step by Step

```
                                User Request arrives
                                           │
                                           ▼
                                   🛂 MIDDLEWARE
             ✅ The very FIRST code that runs, before anything else
                                           │
                         ┌─────────────────┴─────────────────┐
                         │                                   │
                   ❌ Redirect / Reject               ✅ Allow Request
                         │                                   │
                         ▼                                   ▼
             Send user back                        Request proceeds
                                                           │
                                                           ▼
                                                     Cache Check
                                                           │
                                                           ▼
                                                     Page Render
                                                           │
                                                           ▼
                                                     Response to User
```

✅ **Important:** Middleware runs even before the cache. If you redirect in middleware, the cache isn't even checked. It short-circuits the entire process.

---

## 🎯 What Can Middleware Do?

| ✅ Can do | ❌ Can't do |
|-----------|-------------|
| Redirect | Database query |
| Rewrite | Heavy calculation |
| Set headers | Modify response body |
| Set / delete cookies | Use Node.js APIs |
| Auth check | File system access |
| IP address check | Import large dependencies |
| A/B test | |
| Geo location check | |
| Bot detection | |
| Rate limit | |

> **Rule:** In middleware, only do work that is **super fast**. Don't take more than 10ms.

---

## 📝 Basic Middleware Example

```tsx
// ✅ middleware.ts - Put it in the root folder (outside app)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // ✅ Every request reaches here first

  // Auth check example
  const isLoggedIn = request.cookies.get('auth_token')

  if (!isLoggedIn && request.nextUrl.pathname.startsWith('/dashboard')) {
    // ❌ Not logged in → redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ✅ Everything's fine → proceed
  return NextResponse.next()
}

// ✅ Which routes middleware runs on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/:path*'
  ]
}
```

✅ **This entire code runs on the Edge.** On the server nearest to the user, the whole process completes in 10ms.

---

## 🎭 Common Middleware Use Cases

### 1. 🔐 Authentication Check
The most common use case. Check whether the user is logged in before letting them reach protected routes.

```tsx
export function middleware(request: NextRequest) {
  const session = request.cookies.get('next-auth.session-token')

  const protectedRoutes = ['/dashboard', '/settings', '/profile']

  if (protectedRoutes.includes(request.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
```

### 2. 🌍 Geo Location Based Redirect
Check the user's country and send them to the correct domain.

```tsx
export function middleware(request: NextRequest) {
  const country = request.geo?.country

  if (country === 'IN' && !request.nextUrl.pathname.startsWith('/in')) {
    return NextResponse.redirect(new URL('/in', request.url))
  }

  if (country === 'US' && !request.nextUrl.pathname.startsWith('/us')) {
    return NextResponse.redirect(new URL('/us', request.url))
  }

  return NextResponse.next()
}
```

### 3. 🧱 Bot Protection
Block bots based on the user agent.

```tsx
export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''

  const badBots = ['curl', 'wget', 'python-requests', 'scrapy']

  if (badBots.some(bot => userAgent.toLowerCase().includes(bot))) {
    return new NextResponse('Not allowed', { status: 403 })
  }

  return NextResponse.next()
}
```

### 4. ⚖️ A/B Testing
Show version A to 50% of users, version B to the other 50%.

```tsx
export function middleware(request: NextRequest) {
  // If cookie already exists, show that variant
  let variant = request.cookies.get('ab-test')

  if (!variant) {
    // New user, assign randomly
    variant = Math.random() > 0.5 ? 'A' : 'B'

    const response = NextResponse.next()
    response.cookies.set('ab-test', variant)
    return response
  }

  // Rewrite to the correct variant
  return NextResponse.rewrite(new URL(`/variant-${variant}`, request.url))
}
```

---

## ⚡ Edge Runtime Deep Dive

The Edge Runtime is available on every server in Vercel's global network.

| 🕰️ Normal Node.js Server | ⚡ Edge Runtime |
|---------------------------|-----------------|
| Runs in 1 location | Runs in 300+ locations |
| 200-500ms response time | 10-50ms response time |
| Cold start 1000ms+ | Cold start 5ms |
| Full Node.js APIs available | Limited Web Standard APIs |
| Unlimited code size | Maximum 1MB code |
| Unlimited execution time | Maximum 10 seconds |
| Can connect to database | Can't connect to database directly |

✅ **No matter which country a user comes from, there's a server within 100km where middleware runs.**

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Making database calls in middleware
```tsx
// ❌ WRONG! Don't do this
export async function middleware(request: NextRequest) {
  const user = await db.user.findUnique({ id: 1 }) // ❌ This doesn't run on the edge
  // 200ms wasted, the whole benefit is lost
}
```

✅ **Correct way:** Only verify cookies and JWT. No database.

### ❌ Mistake 2: Importing heavy libraries in middleware
```tsx
// ❌ WRONG!
import lodash from 'lodash' // 100KB library — don't bring it to the edge
```

✅ **Correct way:** Use only small micro libraries, or write the code yourself.

### ❌ Mistake 3: Running middleware on every route
```tsx
// ❌ WRONG!
export const config = {
  matcher: '/:path*' // Don't run middleware on every route
}
```

✅ **Correct way:** Run it only where needed.

### ❌ Mistake 4: Doing more than 10 things in middleware
Middleware should do only 1 or 2 things. Auth check + redirect. Done. Don't do anything else.

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "What is Middleware in Next.js?"

**Answer:** "Sir, Middleware is code that runs before every request — even before cache, even before page render. We do auth checks, redirects, rewrites, bot protection, geo-based routing in it. It runs on the Edge Runtime, so it's very fast."

### Q: "What is the Edge Runtime?"

**Answer:** "Edge Runtime is a lightweight runtime available on all of Vercel's global servers. Code runs on the server nearest to the user. That's why response time stays at 10-50ms. It's not like normal Node.js — only web standard APIs are available, not Node.js APIs."

### Q: "Where does middleware run?"

**Answer:** "Middleware runs on the Edge Runtime by default. You could run it on Node.js runtime too, but there's no benefit. The most benefit is on the edge because it's very close to the user."

### Q: "What can you do with middleware?"

**Answer:** "We can redirect, rewrite, set headers, manage cookies, do auth checks, check geo location, A/B test, rate limit. But we can't make database queries, do heavy calculations, or modify the response body."

### Q: "Why don't you make database calls in middleware?"

**Answer:** "Because middleware's purpose is to be super fast. If we make a database call, 200ms gets wasted and the whole benefit is lost. And direct database connections don't work from the Edge Runtime anyway."

### Q: "What are the limitations of the Edge Runtime?"

**Answer:** "Not all Node.js APIs are available in the Edge Runtime. Maximum 1MB of code can run. Maximum 10 seconds execution time. No file system access. No direct database connection."

### Q: "Why do auth checks in middleware instead of on the page?"

**Answer:** "Because middleware runs before every request. If the user isn't logged in, we redirect them immediately. We don't even let them reach the page. The cache isn't checked either — the entire process gets short-circuited. This completes in 10ms on the edge."

### Q: "What's the difference between middleware and an API route?"

**Answer:** "An API route runs on the origin server. Middleware runs on the edge. API routes are separate for each route. Middleware runs once for every request. API routes can do a lot of work; middleware is only for small, fast tasks."

---

## ✅ **Key Takeaways**

1.  Middleware runs **before every request** — the very first thing
2.  By default runs on the Edge Runtime — 300+ locations
3.  Perfect for auth checks, redirects, rewrites, bot protection
4.  Only do lightweight, fast work in middleware
5.  Don't make database calls, don't import heavy libraries
6.  Only put the matcher where it's actually needed
7.  This is Next.js's most underrated powerful feature

> **Final Tip:** Always say this line in an interview: "The best part of middleware is that if you need to reject a request, you stop it before it even reaches the origin server. The load never reaches the origin server."