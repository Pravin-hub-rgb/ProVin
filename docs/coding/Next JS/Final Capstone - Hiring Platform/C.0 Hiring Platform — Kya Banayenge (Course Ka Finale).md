At the end of Batch 8, there was one line — "you're ready for the capstone now." That promise is about to be kept. The entire course is in front of you: routing (Batch 1), rendering + data fetching (Batch 2), mutations (Batch 3), proxy/middleware (Batch 4), auth (Batch 5), databases (Batch 6), optimization (Batch 7), security + deployment (Batch 8). Each batch built small projects — Blog Site, Reviews App, Member Dashboard, Task Board, Photo Gallery. Now all of it comes together in **one production-grade app** — **Hiring Platform**. This is the course finale: a project that's worth putting on your resume, worth showing in interviews, and built as a full revision of everything learned.

---

## What Will You Build?

**Hiring Platform** — a job portal app (like a mini LinkedIn Jobs / Naukri). Two types of people:

- **Employer** — creates job posts for their company, views applicants
- **Candidate** — browses jobs, applies (with resume upload)
- **Guest** — can browse jobs without logging in

And three "modern" features that set this apart from a simple tutorial job board:

| Feature | What It Is | Resume Value |
|---|---|---|
| **AI JD Generator** | Employer types title/skills, AI drafts the job description | LLM API integration |
| **AI Match Score** | At apply time, AI compares candidate-resume against job-description and gives a 0-100 score | "AI-powered matching" — the strongest line for 2026 |
| **Stripe Featured Listing** | Employer pays to feature/boost their job | Payment gateway experience |
| **Resume Upload** | Candidate uploads PDF — private storage, only the relevant employer can view | File handling + access control |

These features were chosen because they fit naturally (nothing forced) — and they impress recruiters more than domain knowledge. A normal job board tutorial doesn't have any of these.

---

## Concept Map — Where Each Batch Concept Lives in the Project

This table is the heart of the capstone. As you build each file, the connection will become clear:

| Batch Concept | In the Hiring Platform |
|---|---|
| File-based routing, layouts (1.1-1.2) | Public pages + employer/candidate sections, each with their own layout |
| Dynamic routes `[slug]` (1.3) | `/jobs/[slug]` — job detail page |
| Loading/error/not-found states (1.4) | Proper states in every route group |
| Server Components direct read (2.1) | Job listings, detail page — direct server reads from DB |
| Client Components (2.2) | Search box, apply form, upload button |
| Static vs dynamic + `revalidate` (2.3) | Job listings ISR — new posts auto-refresh |
| Metadata API (2.4) | Job detail with `generateMetadata` — SEO critical (job boards live off Google) |
| Server Actions + useActionState (3.x) | Post job, apply, edit — all mutations via SA (Route Handlers only for Stripe webhook) |
| Proxy rate limiting (4.13) | Apply + AI endpoints get rate-limited (saving AI free quota!) |
| Auth.js + protected routes (5.x) | GitHub OAuth + role system + `(employer)` / `(candidate)` protected groups |
| Prisma relations (6.x) | User ↔ Company ↔ Job ↔ Application — real relations + indexes |
| next/image + next/font (7.2/7.4) | Company logos + project-wide font |
| Streaming Suspense (7.5) | Employer dashboard stats load progressively |
| Env vars + audit + deploy (8.x) | GEMINI_API_KEY, STRIPE_SECRET_KEY server-only; Vercel deploy |

Look — **no concept is wasted.** That's what the capstone means.

---

## The Role System

Auth comes from GitHub OAuth (just like Batch 5), but with a new twist — **roles**:

- After login, the user chooses: *"I'm an Employer"* or *"I'm a Candidate"*
- The role is stored in the DB (`User.role` field) — carried in the session
- Protected route groups: the `(employer)` section is only for employers, the `(candidate)` section only for candidates

This is one step beyond Batch 5 — back then, it was just "logged in or not." Here, **who** is logged in matters.

---

## File Series — 13-File Plan

| # | File | What Gets Built |
|---|---|---|
| C.0 | What We're Building (this file) | Overview + plan |
| C.1 | Planning — Pages, Routes, Data Shape | Thinking before coding — routes table, schema draft |
| C.2 | Setup + Prisma Schema + Seed | Create project, connect Neon, models + relations + seed data |
| C.3 | Home — Job Listings + Search Filters | SC reads + searchParams filters + revalidate |
| C.4 | Job Detail — `[slug]` + SEO | Dynamic route + generateMetadata + not-found + company logo |
| C.5 | Auth — With Roles | GitHub OAuth + role selection + protected groups |
| C.6 | Employer — Post Job + AI JD Generator | First Gemini API call + Server Action form |
| C.7 | Manage Jobs + Featured Listing (Stripe) | Job edit/close/delete + Stripe Checkout + webhook |
| C.8 | Candidate — Apply + Resume Upload | Vercel Blob PDF upload + duplicate-apply check |
| C.9 | AI Match Score | Apply-time Gemini scoring — stored in DB |
| C.10 | Employer Dashboard | AI-ranked applicants + Streaming Suspense stats |
| C.11 | Rate Limiting + Security Audit | Proxy rate-limit + env audit + error boundaries |
| C.12 | Deploy + Testing + Resume Guidance | Deploy on Vercel + test table + writing README/resume |

The order has logic: the employer posts jobs first (C.6-C.7) → only then can candidates apply (C.8) → at apply time the AI score runs (C.9) → the employer sees ranked list (C.10). We'll never build against data flow.

---

## Stack — What to Use

All course-consistent choices — no new frameworks:

| Layer | Choice | Why |
|---|---|---|
| Next.js 16 + TypeScript + Tailwind | App Router | Same as the rest of the course |
| Database | Prisma + Neon | Same setup as Batch 6-7 |
| Auth | Auth.js v5 (GitHub OAuth) | Batch 5 continuity |
| AI | Google Gemini (free tier) via `@google/genai` SDK | Zero cost for students; OpenAI/Groq swap-box notes will be provided |
| Payments | Stripe Checkout (one-time) + webhook Route Handler | Simple, production-standard |
| Files | Vercel Blob | Serverless-friendly, private URLs |

---

## What's NOT in This Capstone

Scope control is just as important as building features:

- **No recurring subscriptions** — only one-time Featured Listing purchases. Subscriptions require webhooks + customer portal + proration — scope doubles.
- **No real-time chat between employer-candidate** — messaging is a separate, large topic.
- **No admin panel** — moderation/reporting skipped; focus on the core hiring flow.
- **No email notifications** — Resend/SMTP is a nice-to-have, goes on the "try on your own" list in C.12.
- **No semantic/vector search** — search uses simple text-match filters. Vector embeddings are the next learning step, not the capstone.
- **No mobile app / native** — responsive web is the final deliverable.

Every "no" is a conscious trade-off — in the capstone, depth > breadth.

---

## Prerequisite

Before starting the capstone, you should have:

- ✅ Batches 1-8 complete — especially Batch 6 (Prisma + Neon) and Batch 8 (env/deploy)
- ✅ Neon account (free) — created in Batch 6
- ✅ GitHub account — needed for OAuth (you probably already have one)
- ✅ Google AI Studio account (free) — Gemini key created in C.6, not needed now
- ✅ Stripe account (free test mode) — created in C.7, not needed now

Don't create these accounts yet — each feature has its own setup steps in its file.

---

## Nutshell

Final Capstone = **Hiring Platform** — employers post jobs (AI-generated descriptions, Stripe boost), candidates apply (PDF resume upload), and AI matches every application against the job description with a score, shown ranked on the employer dashboard. 13 files, and **every concept from every batch** is genuinely used — this is both revision and a portfolio piece.

First step: before writing code, think — what pages, what data shape, how roles flow. See you in C.1 Planning.
