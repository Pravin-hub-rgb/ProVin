# 🚀 Project 2 — HireHop: Job Board
### Employers Post Jobs, Seekers Apply — with Search & Resume Upload

---

## 💬 The Brief — What the Client Said

> *"Bro, I need to build a niche job board — specifically for design professionals.
> Employers post jobs, job seekers browse and apply.
> Resume upload must be there. Email notification too when someone applies.
> SEO is important — jobs should show up on Google."*

Okay. This is different from the first project. There are **public-facing pages**, **SEO is critical**, **file upload**, **email**, and **two different user types** — Employer and Job Seeker.

---

## 📋 Step 1 — PRD Lite

```
PROJECT NAME  : HireHop
TYPE          : Public Web App / Job Board
ONE LINE      : "This is a niche job board that connects design professionals
                 with relevant job opportunities."

TARGET USER:
  Primary A  → Employer
               Company that wants to hire design roles
               Posts jobs, reviews applications
  Primary B  → Job Seeker
               Designer looking for work
               Browses jobs, applies with resume

CORE FEATURES (MVP):
  [ ] Public job listings — searchable, filterable
  [ ] Job detail page (SEO optimized)
  [ ] Employer: Post a job
  [ ] Employer: View applications for their jobs
  [ ] Job Seeker: Create profile + upload resume
  [ ] Job Seeker: Apply to a job (attach resume)
  [ ] Email: Employer gets notified when someone applies
  [ ] Auth: Separate flows for employer vs seeker

STRETCH (V2):
  [ ] Saved/bookmarked jobs
  [ ] Application status tracking (Applied → Reviewed → Interview → Rejected/Hired)
  [ ] Featured job listings (paid)
  [ ] Job alerts via email

OUT OF SCOPE:
  ❌ In-app messaging between employer and seeker
  ❌ Payment gateway (featured listings is V2)
  ❌ Mobile app
  ❌ AI job matching
```

---

## 🏗️ Step 2 — Architecture Decisions

---

**Framework → Next.js App Router**

Same reason — full-stack needed. But one extra reason here: **SEO is critical**. Next.js supports SSG/ISR — job pages will be indexed by Google. This isn't easily possible with Vite + React.

---

**Rendering Strategy → MIXED (This is interesting!)**

```
Different strategies for different pages:

PUBLIC JOB LISTINGS PAGE (/jobs)
→ ISR (revalidate: 3600 — 1 hour)
→ Job listings change frequently — but not second-by-second
→ Served from CDN — fast for all users
→ SEO perfect ✅

JOB DETAIL PAGE (/jobs/[slug])
→ ISR (revalidate: 1800 — 30 minutes)
→ Individual job page gets indexed by Google
→ Pre-built at build time, updated via ISR

EMPLOYER DASHBOARD (/dashboard/employer)
→ SSR — user-specific data (only their posted jobs)
→ Sensitive — login required

SEEKER DASHBOARD (/dashboard/seeker)
→ SSR — user-specific (their applications, profile)

LOGIN / SIGNUP PAGES
→ SSG — static, no dynamic data

WHY NOT SSG for job pages?
→ Jobs change every day — new jobs posted, old ones expire
→ Full rebuild every time is impractical
→ ISR = static speed + automatic updates ✅
```

---

**API Style → REST API Routes (not Server Actions)**

```
This decision differs from the first project. Why?

First project: Only a web app
This project: A mobile app might come in the future

Client mentioned "maybe build a mobile app tomorrow"
→ REST API routes are a better investment
→ Web and mobile can both use the same API

Specific endpoints:
POST   /api/jobs          ← Post a job
GET    /api/jobs          ← All jobs (with filters)
GET    /api/jobs/[slug]   ← Single job
POST   /api/apply         ← Apply to a job (with resume)
GET    /api/applications  ← Employer's applications
```

---

**Auth → NextAuth ✅ (not Clerk)**

```
Why NextAuth?
→ There are two different user types — Employer and Job Seeker
→ Signup form has "Account type" selection
→ Custom signup flow needed — Clerk is rigid here

Why not Clerk?
→ Clerk's UI is opinionated — custom onboarding is hard
→ NextAuth lets us easily write custom callbacks

Implementation:
→ 'role' field in User model: 'employer' | 'seeker'
→ Select role at signup
→ Role-based route protection in middleware
```

---

**Search → PostgreSQL Full-Text Search (not Algolia for V1)**

```
Client mentioned search. Options:

Option A: Algolia
→ Powerful managed search
→ Cost: Paid after free tier
→ External service — extra complexity

Option B: PostgreSQL Full-Text Search
→ Already using PostgreSQL
→ Free — no extra service
→ Good enough for job title + description search
→ Advanced faceted search not needed in V1

Decision: PostgreSQL Full-Text for V1.
If complex search needed at scale → Algolia/Typesense in V2.

Implementation:
→ tsvector column in Job model (title + description indexed)
→ GIN index on tsvector
→ Query: WHERE search_vector @@ plainto_tsquery('designer')
```

---

**File Upload → Uploadthing ✅**

```
Resume upload — options:
→ AWS S3: Powerful but complex setup
→ Cloudinary: Great for images, overkill for documents
→ Uploadthing: Specifically built for Next.js

Why Uploadthing?
→ Direct Next.js integration — just one route handler
→ Type-safe — define file types and sizes
→ Generous free tier
→ PDF and DOCX support

Resume storage:
→ File stored on Uploadthing
→ Only URL saved in database (resume_url field)
```

---

**Email → Resend + React Email**

```
When someone applies:
→ Employer gets email — "Someone applied to [Job Title]"
→ Seeker gets confirmation email — "Application submitted"

Why Resend?
→ Modern API
→ Write HTML email templates in React with React Email
→ Free tier: 100 emails/day — enough for V1

Implementation:
→ In /api/apply route — after application saved
→ Trigger email via Resend SDK
→ Template: applicant name, resume link, job title
```

---

**State Management → React Query only (no Zustand for V1)**

```
Why no Zustand?
→ No complex global UI state in this app
→ No cart, no filters that multiple components share simultaneously

Where React Query is used:
→ Employer dashboard: useQuery('my-jobs', fetchMyJobs)
→ Seeker dashboard: useQuery('my-applications', fetchApplications)
→ Job listings: useQuery(['jobs', filters], fetchJobs)

Simple state?
→ Search input, filter dropdowns → useState is enough
→ Modal open/close → useState
```

---

## 🗄️ Step 3 — Data Model

```
USER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id            UUID        PK
name          VARCHAR(100)
email         VARCHAR(255) UNIQUE  ← Index
password_hash VARCHAR(255)
role          ENUM        'employer' | 'seeker'
company_name  VARCHAR(255) nullable  ← For employer
resume_url    VARCHAR(500) nullable  ← For seeker
created_at    TIMESTAMP

JOB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id             UUID          PK
slug           VARCHAR(255)  UNIQUE  ← Index (for URL)
title          VARCHAR(255)
description    TEXT
location       VARCHAR(255)
job_type       ENUM          'full_time' | 'part_time' | 'contract' | 'remote'
salary_range   VARCHAR(100)  nullable
employer_id    UUID          FK → User.id
status         ENUM          'active' | 'closed' | 'draft'
search_vector  TSVECTOR      ← For full-text search (generated column)
expires_at     DATE
created_at     TIMESTAMP
updated_at     TIMESTAMP

APPLICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           UUID      PK
job_id       UUID      FK → Job.id
seeker_id    UUID      FK → User.id
resume_url   VARCHAR(500)
cover_note   TEXT      nullable
status       ENUM      'applied' | 'reviewed' | 'shortlisted' | 'rejected'
applied_at   TIMESTAMP

UNIQUE(job_id, seeker_id)  ← A seeker can apply to a job only once

RELATIONS:
→ User (employer) has many Jobs
→ Job has many Applications
→ User (seeker) has many Applications
→ Application belongs to Job AND User

INDEXES:
→ Job.slug           (URL lookup — GET /jobs/[slug])
→ Job.employer_id    (fetch employer's jobs)
→ Job.search_vector  (full-text search — GIN index)
→ Job.status         (show only active jobs)
→ Application.job_id (employer views applications for their job)
→ Application.seeker_id (seeker views their applications)
```

---

## 📋 Step 4 — Feature Breakdown

```
PHASE 1 — MVP:

  Auth
  ├── [ ] Signup with role selection (employer / seeker)
  ├── [ ] Login
  ├── [ ] Protected routes middleware (role-based)
  └── [ ] NextAuth setup (credentials provider)

  Public Pages
  ├── [ ] /jobs — listing page with search + filters
  ├── [ ] /jobs/[slug] — job detail page
  └── [ ] ISR setup for both

  Employer Features
  ├── [ ] Post a job (form with validation)
  ├── [ ] My posted jobs list
  ├── [ ] View applications per job
  └── [ ] Close/reopen job

  Seeker Features
  ├── [ ] Browse + search jobs
  ├── [ ] Apply to job — resume upload + optional cover note
  ├── [ ] My applications history
  └── [ ] Profile (upload resume for quick apply)

  Email
  ├── [ ] Employer notification on application
  └── [ ] Seeker confirmation on apply

  Edge Cases
  ├── [ ] Duplicate application prevention
  ├── [ ] Expired job — can't apply
  ├── [ ] File type validation (PDF/DOCX only for resume)
  └── [ ] Empty states (no jobs posted, no applications yet)
```

---

## 🎙️ Interview Script — STAR Format

```
SITUATION:
"I built HireHop — a niche job board for design professionals.
The problem was that existing generic job boards made it hard
to effectively filter for design-specific jobs."

TASK:
"There were two user types — Employer and Job Seeker.
Employers post jobs, seekers apply with resume.
SEO was critical — individual job pages needed to be indexed by Google."

ACTION:
"I made three interesting decisions —

First: Used a mixed rendering strategy.
Used ISR for public job listing and detail pages — revalidate: 1 hour.
This is because SSG would require full site rebuild for every job,
and SSR doesn't give CDN caching.
ISR gave both static speed + automatic updates.
Dashboard pages were SSR — user-specific data.

Second: Implemented full-text search via PostgreSQL instead of Algolia.
For V1, job title and description search was enough.
I wanted to avoid extra service and cost — tsvector column + GIN index
gave good performance in PostgreSQL. If complex faceted search were needed
at scale, I'd consider Typesense.

Third: Used Uploadthing for file upload.
Resume PDF upload was needed — AWS S3 was overkill at this scale.
Uploadthing is specifically designed for Next.js,
gives type-safe file routes, and free tier was enough.

One challenge: Employer needed to signup with role selection,
and seeker needed different fields (resume) vs employer (company name).
I wrote custom callbacks in NextAuth that save role-based fields
to the database on signup."

RESULT:
"The app had ISR-powered public job pages indexed by Google,
role-based dashboards, resume upload, and email notifications via Resend.
Reflection: I'd design the search functionality better upfront —
having to add a search vector column mid-project via migration was painful.
Schema design upfront is the best example of this lesson."
```

---

**Next →** `project-03-chat-app.md` — TalkSpace: Real-time Chat Application