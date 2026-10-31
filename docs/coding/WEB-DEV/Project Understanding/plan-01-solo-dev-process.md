# 📋 Plan Phase — Doc 1: The Solo Dev Process
### The MNC's Lite Version — Before Writing a Single Line of Code

---

## 🤔 First, Understand This — What Happens in an MNC?

When a project comes into an MNC, there's a whole system. Code isn't written directly. There's a big team — Product Manager, Architects, Designers, Developers, QA — everyone **plans** first, then code happens.

```
Typical MNC flow:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Client requirement arrives
        ↓
Product Manager → Creates PRD (Product Requirements Doc)
        ↓
Architect → Decides tech stack
        ↓
Designer → Wireframes / Mockups
        ↓
Tech Lead → Task breakdown (Jira tickets)
        ↓
Developers → Code
        ↓
QA → Testing
        ↓
DevOps → Deploy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**You're alone — so what do you do?**
You have to do all this work yourself, but in a lightweight version. Don't panic — it's a 5-step process. Once you understand it, it becomes second nature.

---

## ✅ The 5-Step Solo Dev Process

---

### Step 1 — PRD Lite (Product Requirements Doc)

PRD means **"What to build"** — clearly, in writing.

The reason to write this is that when you get lost while coding, this doc keeps you grounded.

**It should have this structure:**

```
PROJECT NAME: ___________________

ONE LINE DESCRIPTION:
"This is a [type of app] that does [main task]
 for [target user]."

TARGET USER:
- Who will use it? (Student, Business Owner, Admin)
- Are they technical or non-technical?

CORE FEATURES (Must Have — MVP):
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

STRETCH FEATURES (Nice to Have — V2):
- [ ] Feature A
- [ ] Feature B

OUT OF SCOPE (What NOT to build):
- X not to be built
- Y not to be built

SUCCESS CRITERIA:
- When will we say the project is complete?
```

> **Interview Tip:** The "Out of Scope" section is very powerful in an interview.
> When you say — *"I clearly defined the scope and pushed these features to V2"* —
> it shows you think at a production level. Junior devs don't think about scope.

---

### Step 2 — Architecture Decision Doc

After reading the PRD, select the tools. But not just **"I chose this"** — **"I chose this BECAUSE..."** — that's what matters.

Ask yourself these questions:

```
PLATFORM:
→ Is it only a web app?                  Yes → Next.js
→ Mobile also needed?                    Yes → React Native or PWA
→ Pure static site?                      Yes → Astro

DATA LAYER:
→ Need API endpoints for external use?   Yes → REST / tRPC
→ Only internal web app will use it?     Yes → Server Actions (simpler!)
→ Need real-time data?                   Yes → WebSockets / SSE
→ Complex queries / multiple resources?  Yes → Consider GraphQL

STATE MANAGEMENT:
→ Only local component state?            useState is enough
→ 2-3 components share it?               Context API is enough
→ Complex global state, many components? Zustand
→ Enterprise, time-travel debug?         Redux Toolkit

DATABASE:
→ Structured and relational data?        PostgreSQL
→ Flexible schema, documents?            MongoDB
→ Caching / sessions / real-time?        Redis
→ Simple, local / small app?             SQLite

AUTH:
→ Social login + email, minimal setup?   Clerk
→ Full control, custom UI?               NextAuth / Better Auth
→ Enterprise SSO?                        Auth0

RENDERING STRATEGY:
→ SEO important?                         SSG / SSR
→ User-specific data?                    SSR
→ Rarely changing content?               SSG / ISR
→ Dashboard, no SEO needed?              CSR
→ Mix of above?                          Next.js (mix them)

FILE UPLOADS:
→ Images with transformations?           Cloudinary
→ Next.js project, simple?               Uploadthing
→ Enterprise / S3 compatible?            AWS S3 / Cloudflare R2

EMAIL:
→ Transactional emails?                  Resend (modern) / Nodemailer

BACKGROUND JOBS:
→ Cron jobs, scheduled tasks?            node-cron / Inngest
→ Queue-based, retry logic?              BullMQ

HOSTING:
→ Next.js project?                       Vercel
→ Full stack with DB?                    Railway
→ Enterprise?                            AWS / GCP
```

> **Interview Tip:** Write the reason along with every decision.
> "I chose Zustand **because** cart state was shared by multiple unrelated components,
> and Context was causing re-render issues" —
> this is what separates a junior from a senior.

---

### Step 3 — Data Model

Before writing code, think about the **database schema**. This is another place beginners skip and regret later.

```
THINK FOR EACH ENTITY:

1. What entities are in my app?
   (User, Product, Order, Post, Comment...)

2. What fields does each entity have?
   (id, name, email, created_at...)

3. What relations exist between entities?
   - One to One:    User → Profile
   - One to Many:   User → Orders (one user has many orders)
   - Many to Many:  Student → Courses (one student many courses, one course many students)

4. What indexes will I put?
   (On email — for login, on Product name — for search)

5. Do I need soft delete?
   (deleted_at field — data isn't permanently deleted)
```

**Example template:**

```
ENTITY: User
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           UUID / SERIAL (PK)
name         VARCHAR(100)
email        VARCHAR(255) UNIQUE
password     VARCHAR(255) [hashed]
role         ENUM (admin, user)
created_at   TIMESTAMP
updated_at   TIMESTAMP
deleted_at   TIMESTAMP [nullable — soft delete]

ENTITY: Post
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           UUID / SERIAL (PK)
title        VARCHAR(255)
content      TEXT
author_id    FK → User.id
status       ENUM (draft, published)
created_at   TIMESTAMP
```

> **Interview Tip:** If the interviewer asks "how did you design the database?" —
> mention entity relationships and indexes.
> "I put an index on the email column because the login query was frequent" —
> this shows DB optimization awareness.

---

### Step 4 — Feature Breakdown (Task List)

Don't think about the whole project at once. Break it down:

```
PHASE 1 — Core (MVP):
  Auth
  ├── [ ] Signup page
  ├── [ ] Login page
  ├── [ ] Logout
  └── [ ] Protected routes

  Main Feature
  ├── [ ] List view (read)
  ├── [ ] Create
  ├── [ ] Edit
  └── [ ] Delete

  Edge Cases
  ├── [ ] Empty state (what shows when there's no data?)
  ├── [ ] Loading state
  ├── [ ] Error state
  └── [ ] Form validation

PHASE 2 — Polish:
  ├── [ ] Search / Filter
  ├── [ ] Pagination
  ├── [ ] Email notifications
  └── [ ] Mobile responsive
```

> **Why is this important?**
> When the interviewer asks "what challenges came up in the project?" —
> you can say "I broke down features first,
> so I clearly knew what was in MVP and what came later."
> This shows planning maturity.

---

### Step 5 — Folder Structure Decision

With Next.js App Router:

```
src/
├── app/                     ← Routes (App Router)
│   ├── (auth)/              ← Route group — auth pages
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/         ← Route group — protected pages
│   │   ├── layout.tsx       ← Auth check here
│   │   └── dashboard/page.tsx
│   ├── api/                 ← API routes (if needed)
│   └── layout.tsx           ← Root layout
│
├── components/
│   ├── ui/                  ← Generic reusable (Button, Input, Modal)
│   └── features/            ← Feature-specific (ProductCard, UserAvatar)
│
├── lib/
│   ├── db.ts                ← Prisma client
│   ├── auth.ts              ← Auth config
│   └── utils.ts             ← Helper functions
│
├── actions/                 ← Server Actions (if using Server Actions)
│   ├── auth.actions.ts
│   └── product.actions.ts
│
├── hooks/                   ← Custom React hooks
│   └── useCart.ts
│
└── types/                   ← TypeScript types
    └── index.ts
```

---

## 🎯 The Complete Checklist — For Every Project

```
PRE-CODE CHECKLIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] PRD Lite written?
    [ ] One line description
    [ ] Target user defined
    [ ] Core features listed
    [ ] Out of scope defined

[ ] Architecture decisions with reasons?
    [ ] Platform decided
    [ ] Rendering strategy decided
    [ ] State management decided
    [ ] Database chosen
    [ ] Auth solution chosen

[ ] Data model created?
    [ ] Entities identified
    [ ] Relations mapped
    [ ] Indexes noted

[ ] Feature breakdown done?
    [ ] MVP features only in Phase 1
    [ ] Edge cases listed

[ ] Folder structure decided?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOW YOU CAN START WRITING CODE! 🚀
```

---

> **Remember:** In an interview, when someone asks "explain your project" —
> start with the PRD, move to architecture decisions, then challenges.
> **Don't just list features.** That anyone can do.
> Showing planning + reasoning is what sets you apart.

---

**Next Doc →** `plan-02-prd-template.md` — Blank PRD template you can use for every project.