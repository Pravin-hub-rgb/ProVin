# 17 — Auth Libraries: NextAuth, Clerk, Lucia, Auth0, Better Auth

> Umbrella: Auth

---

### NextAuth / Auth.js
**Tag: 🟢 Next.js Standard | Most Popular**

```
What it is: Auth library for Next.js
When to use: Google/GitHub login + email/password — Next.js project
Real app: Most Indian startups using Next.js
Cons: Config verbose, docs sometimes confusing
```

---

### Clerk
**Tag: 🟢 Fastest Setup | UI Included | Paid**

```
What it is: Complete auth platform — UI and logic both
When to use: Launch fast, don't waste time on auth
Cons: Paid, vendor lock-in
In India: Funded startups, hackathons
```

---

### Lucia
**Tag: 🟢 Lightweight | DIY | TypeScript**

```
What it is: Minimal auth library — only sessions, the rest you build
When to use: Full control needed, Clerk felt costly, NextAuth felt complex
ShopKaro approach: Built it ourselves → Lucia-like approach
```

---

### Better Auth
**Tag: 🟢 New | TypeScript-first | Growing**

```
What it is: Modern auth library — growing rapidly in 2024
When to use: Exploring NextAuth alternatives
Status: New but promising — watch it
```

---

### Auth0
**Tag: 🟢 Enterprise | Okta company**

```
What it is: Enterprise auth platform — SSO, SAML, enterprise features
When to use: Enterprise clients, B2B SaaS, SSO required
In India: Enterprise companies, government projects
```

---

### Passport.js
**Tag: 🟡 Express classic | Strategy-based**

```
What it is: Auth middleware for Express
When to use: Express backend, existing Passport codebase
Avoid in new projects: NextAuth or Better Auth is better for Next.js
```

---

### Supabase Auth
**Tag: 🟢 Supabase users**

```
What it is: Supabase's built-in auth
When to use: Already using Supabase
```

---

### Firebase Auth
**Tag: 🟢 Mobile apps | Google**

```
What it is: Google's auth — mobile + web
When to use: React Native apps, Firebase ecosystem
```

---

## Auth Quick Decision

```
Next.js, want Google/GitHub login?
  → NextAuth / Auth.js

Launch fast, ready-made UI needed?
  → Clerk

Full control, lightweight?
  → Lucia or Better Auth

Express backend?
  → Passport.js or build it yourself

Enterprise, SSO?
  → Auth0

Using Supabase?
  → Supabase Auth
```

---

## Next Doc

`18-testing.md` — Testing tools — Vitest, Jest, Playwright, Cypress — how Swiggy's checkout gets tested.
