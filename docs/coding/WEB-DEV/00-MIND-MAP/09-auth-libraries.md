# 09 — Auth Libraries: NextAuth, Clerk, Auth.js — Which One When?

> In the previous docs we built the entire authentication system ourselves.
> Now an important decision — **when to use a library, when to build it yourself?**
> This is the last doc of the Authentication umbrella.

---

## Why Did We Build It Ourselves?

If Clerk or NextAuth can solve everything in 10 minutes — why did we spend so much time learning?

Because when you use a library without understanding what's inside:
- Something stops working → you don't know why
- You need to customize → you don't know where to start
- In an interview they ask → "I just used the library" ← that won't fly

What you've learned now is **inside every library.** You now understand what the library is doing.

---

## Three Popular Options

### 1. Build It Yourself (What We Did)
**When:** You want to learn, you want full control, simple email/password is enough
**Pros:** You understand it, you can customize
**Cons:** More code, security mistakes are possible
**ShopKaro v1:** This one

---

### 2. Auth.js / NextAuth
**When:** You need OAuth providers (Google, GitHub), you're using Next.js
**Pros:** Multiple providers, flexible, free, perfect with Next.js
**Cons:** Config is a bit complex, docs can be confusing sometimes

```javascript
// Just do this — Google + GitHub + Email ready
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'

export const { GET, POST } = NextAuth({
  providers: [
    Google({ clientId: "...", clientSecret: "..." }),
    GitHub({ clientId: "...", clientSecret: "..." }),
    Credentials({
      // Your email/password logic goes here
      async authorize(credentials) {
        // bcrypt compare, find user, return
      }
    })
  ]
})
```

**In ShopKaro v2** — if you want to add Google login, NextAuth is the best choice.

---

### 3. Clerk
**When:** You need to launch fast, you want ready-made UI, you need team features
**Pros:** Full UI ready (login page, signup page, profile page), multi-tenant support, magic links, MFA — all out of the box
**Cons:** Paid (free tier is limited), less control, vendor lock-in

```javascript
// With Clerk, you just do this
import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return <SignIn />  // Full login form ready — with styling
}
```

```javascript
// Protected route
import { auth } from '@clerk/nextjs'

export default async function Dashboard() {
  const { userId } = auth()
  if (!userId) redirect('/login')
  // ...
}
```

**When to use it:** Startup, hackathon, when you don't want to waste time on auth — Clerk handles everything.

---

## Decision Guide — For ShopKaro

```
Do you want to learn auth from the inside?
  → Yes → Build it yourself (ShopKaro v1)

Do you need Google/GitHub login?
  → Yes → NextAuth

Do you need to launch fast, no time to spend on auth?
  → Yes → Clerk

Do you need enterprise features (SSO, SAML, organizations)?
  → Yes → Clerk or WorkOS
```

---

## A Comparison Table

| | Build Yourself | NextAuth | Clerk |
|--|-----------|----------|-------|
| Setup time | Hours | 30 min | 10 min |
| Learning | Maximum | Medium | Minimum |
| Control | Full | High | Limited |
| OAuth | Manual | Built-in | Built-in |
| UI | Build yourself | Build yourself | Ready |
| Cost | Free | Free | Freemium |
| Best for | Learning | Production Next.js | Fast launch |

---

## Authentication Umbrella — Complete

Now you know the full map of the Authentication umbrella:

```
AUTHENTICATION
│
├── Password Hashing (bcrypt)       → Doc 03 ✓
├── Sessions                         → Doc 04 ✓
├── JWT                              → Doc 05 ✓
├── Cookies                          → Doc 06 ✓
├── OAuth                            → Doc 07 ✓
├── Email Verification + Reset       → Doc 08 ✓
└── Libraries (NextAuth, Clerk)      → Doc 09 ✓ (THIS)
```

Whenever someone says "implement authentication" — you now know everything that's inside it and when to use what.

---

## Next Doc

`10-architecture-what-is-it.md` — Authentication is done. Now the second big umbrella — **Architecture**. How is your project organized internally? Folders, files, where does each thing go — these decisions aren't taught anywhere, we'll learn them here.