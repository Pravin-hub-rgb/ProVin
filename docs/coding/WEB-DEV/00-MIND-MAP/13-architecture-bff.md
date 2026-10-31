# 13 — BFF Layer: Do You Need a Separate Backend, or Are Next.js API Routes Enough?

> In the previous doc we saw ShopKaro's folder structure.
> Now the last architecture concept — **BFF (Backend For Frontend)**.
> This becomes relevant when the project starts getting big.

---

## First Understand — What We Have Right Now

ShopKaro right now looks like this:

```
Browser → Next.js (frontend + API routes) → Database
```

In Next.js, **both frontend and backend** live together — pages and API routes. This is a simple, clean setup.

---

## What Is BFF

**Backend For Frontend** — meaning a separate backend server built specifically for the frontend.

```
Without BFF (ShopKaro v1 — what we have now):
Browser → Next.js (frontend + backend) → Database

With BFF:
Browser → Next.js (frontend only) → BFF Server (Express/Node) → Database
                                    ↗
                          Mobile App also uses this
```

---

## When Do You Need BFF — Practical Scenarios

### Scenario 1 — Multiple Clients

```
Only a web app → no need for BFF
                 Next.js API routes are enough

Web app + Mobile app + Smart TV app → think about BFF
Because all three need the same API — and that's not clean to do
inside a single Next.js project
```

### Scenario 2 — Team Size

```
1-2 developers → BFF overhead is too much, Next.js API routes are enough

5+ developers, separate frontend and backend teams → BFF
Because teams can work independently
```

### Scenario 3 — Performance

```
Simple data fetching → Next.js is enough

Very complex data transformations, multiple microservices
that need to be combined in one request → BFF is helpful
```

---

## The Decision for ShopKaro

**ShopKaro v1 → NO BFF needed.**

Reasons:
- Only a web app for now
- One developer
- Straightforward database
- Next.js API routes can handle everything

This might change in the future — but don't do premature optimization.

---

## If You Need to Add BFF Later

ShopKaro grew:
- A mobile app came
- 3 developers now
- A separate seller dashboard app

Then the structure would be:
```
/shopkaro-web      → Next.js (frontend only)
/shopkaro-mobile   → React Native
/shopkaro-api      → Express/Node BFF → Database
```

---

## BFF vs Direct API vs Microservices

You'll hear these three terms a lot:

| | What It Is | When |
|--|---------|-----|
| **Next.js API Routes** | Backend in the same project | Small-medium apps, one team |
| **BFF** | Separate backend, optimized for the frontend | Multiple clients, medium teams |
| **Microservices** | A separate server for each feature | Large scale, large teams |

ShopKaro → Next.js API Routes → BFF → (if ever needed) Microservices

---

## Architecture Umbrella — Complete

```
ARCHITECTURE
│
├── MVC Pattern      → Doc 11 ✓
├── Folder Structure → Doc 12 ✓
└── BFF Layer        → Doc 13 ✓ (THIS)
```

Now you know:
- How to organize code (MVC)
- Where files go (Folder Structure)
- When you need a separate backend (BFF)

---

## Next Doc

`14-rendering-what-is-it.md` — The third big umbrella — **Rendering**. SSR, CSR, SSG — these three terms feel confusing. First we'll understand them in the overview — then each gets its own doc. Every page in ShopKaro will use a different strategy — we'll understand why.