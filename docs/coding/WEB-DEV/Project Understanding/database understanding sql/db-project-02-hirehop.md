# 🗄️ DB Project 2 — HireHop: Job Board
### Complete Database Design — From PRD to Final Schema

---

## Extracting Entities from the Brief

```
Brief: "Employers post jobs, seekers apply with resume.
        Email notifications. SEO optimized job pages."

Extract NOUNS:
→ Employer      → User (role = EMPLOYER)
→ Job Seeker    → User (role = SEEKER) — SAME TABLE, different role
→ Job           → Job entity
→ Application   → Application entity (junction between Seeker + Job)
→ Resume        → Column in Application (URL), not separate entity
→ Email         → Side effect, not a stored entity

ENTITIES: User, Job, Application
```

---

## Entity-Relationship Map

```
USER (Employer) (1) ──────── (N) JOB           [employer posts many jobs]
JOB             (1) ──────── (N) APPLICATION    [job gets many applications]
USER (Seeker)   (1) ──────── (N) APPLICATION    [seeker submits many applications]

Job ↔ Seeker is Many-to-Many → Application is the JUNCTION TABLE
(But Application has extra data — resumeUrl, coverNote, status)
So we create an explicit junction table.
```

---

## Column Design

```
USER TABLE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Field         | Type     | Nullable | Default   | Why
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id            | String   | NO       | cuid()    | PK
name          | String   | NO       | —         | Display name
email         | String   | NO       | —         | Login, @unique
password      | String   | NO       | —         | Hashed
role          | UserRole | NO       | —         | EMPLOYER or SEEKER
companyName   | String   | YES      | —         | For employer only
companyWebsite| String   | YES      | —         | For employer only
resumeUrl     | String   | YES      | —         | Seeker profile resume
createdAt     | DateTime | NO       | now()     |
updatedAt     | DateTime | NO       | auto      |
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JOB TABLE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Field         | Type    | Nullable | Default  | Why
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id            | String  | NO       | cuid()   | PK
slug          | String  | NO       | —        | URL-friendly, @unique (SEO!)
title         | String  | NO       | —        | Job title
description   | String  | NO       | —        | Full JD
location      | String  | NO       | —        | City or "Remote"
jobType       | JobType | NO       | —        | Full-time, Remote etc.
salaryRange   | String  | YES      | —        | Optional "₹8-12 LPA"
employerId    | String  | NO       | —        | FK → User (employer)
status        | JobStatus| NO      | ACTIVE   | Active, Closed, Draft
expiresAt     | DateTime| YES      | —        | When job expires
createdAt     | DateTime| NO       | now()    |
updatedAt     | DateTime| NO       | auto     |
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

APPLICATION TABLE (Junction):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Field         | Type    | Nullable | Default  | Why
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id            | String  | NO       | cuid()   | PK
jobId         | String  | NO       | —        | FK → Job
seekerId      | String  | NO       | —        | FK → User (seeker)
resumeUrl     | String  | NO       | —        | Uploadthing URL
coverNote     | String  | YES      | —        | Optional message
status        | AppStatus| NO      | APPLIED  | Application state
appliedAt     | DateTime| NO       | now()    |
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UNIQUE: (jobId, seekerId) — seeker can apply to a job only once
```

---

## Final Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── ENUMS ──────────────────────────────────────────────────
enum UserRole {
  EMPLOYER
  SEEKER
}

enum JobType {
  FULL_TIME
  PART_TIME
  CONTRACT
  REMOTE
  INTERNSHIP
}

enum JobStatus {
  DRAFT
  ACTIVE
  CLOSED
}

enum ApplicationStatus {
  APPLIED
  REVIEWED
  SHORTLISTED
  REJECTED
  HIRED
}

// ─── MODELS ─────────────────────────────────────────────────
model User {
  id              String   @id @default(cuid())
  name            String
  email           String   @unique
  password        String
  role            UserRole
  // Employer-specific fields
  companyName     String?
  companyWebsite  String?
  // Seeker-specific field
  resumeUrl       String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  postedJobs   Job[]         @relation("EmployerJobs")
  applications Application[] @relation("SeekerApplications")

  @@map("users")
}

model Job {
  id          String    @id @default(cuid())
  slug        String    @unique  // "senior-react-developer-at-xyz"
  title       String
  description String    @db.Text
  location    String
  jobType     JobType
  salaryRange String?
  employerId  String
  status      JobStatus @default(ACTIVE)
  expiresAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Relations
  employer     User          @relation("EmployerJobs", fields: [employerId], references: [id], onDelete: Cascade)
  applications Application[]

  // Indexes
  @@index([employerId])           // Employer's jobs
  @@index([status])               // Active jobs filter
  @@index([jobType])              // Type filter
  @@index([status, jobType])      // "Active remote jobs"
  @@index([createdAt])            // Latest jobs first

  @@map("jobs")
}

model Application {
  id        String            @id @default(cuid())
  jobId     String
  seekerId  String
  resumeUrl String
  coverNote String?           @db.Text
  status    ApplicationStatus @default(APPLIED)
  appliedAt DateTime          @default(now())

  // Relations
  job    Job  @relation(fields: [jobId],    references: [id], onDelete: Cascade)
  seeker User @relation("SeekerApplications", fields: [seekerId], references: [id], onDelete: Cascade)

  // Prevent duplicate applications
  @@unique([jobId, seekerId])

  // Indexes
  @@index([jobId])    // "All applications for this job" — employer view
  @@index([seekerId]) // "My applications" — seeker view
  @@index([status])   // Filter by status

  @@map("applications")
}
```

---

## Sample Data

```
users table:
┌───────────────┬──────────────────────┬─────────────────────────┬──────────┬─────────────────────┐
│ id            │ name                 │ email                   │ role     │ companyName         │
├───────────────┼──────────────────────┼─────────────────────────┼──────────┼─────────────────────┤
│ u_emp_001     │ Neha Gupta           │ neha@designstudio.com   │ EMPLOYER │ Design Studio Pvt   │
│ u_emp_002     │ Vikram Shah          │ vikram@techco.com       │ EMPLOYER │ TechCo Solutions    │
│ u_seek_001    │ Rahul Verma          │ rahul.designer@gmail.com│ SEEKER   │ NULL                │
│ u_seek_002    │ Priya Sharma         │ priya.ux@gmail.com      │ SEEKER   │ NULL                │
│ u_seek_003    │ Arjun Mehta          │ arjun.dev@gmail.com     │ SEEKER   │ NULL                │
└───────────────┴──────────────────────┴─────────────────────────┴──────────┴─────────────────────┘

jobs table:
┌───────────────┬──────────────────────────────┬────────────────────┬──────────┬──────────────┬──────────┐
│ id            │ slug                         │ title              │ jobType  │ employerId   │ status   │
├───────────────┼──────────────────────────────┼────────────────────┼──────────┼──────────────┼──────────┤
│ j_001         │ senior-ui-designer-designstud│ Senior UI Designer │ FULL_TIME│ u_emp_001    │ ACTIVE   │
│ j_002         │ ux-researcher-designstudio   │ UX Researcher      │ REMOTE   │ u_emp_001    │ ACTIVE   │
│ j_003         │ frontend-dev-techco          │ Frontend Developer │ FULL_TIME│ u_emp_002    │ ACTIVE   │
│ j_004         │ motion-designer-designstudio │ Motion Designer    │ CONTRACT │ u_emp_001    │ CLOSED   │
└───────────────┴──────────────────────────────┴────────────────────┴──────────┴──────────────┴──────────┘

applications table:
┌───────────┬────────┬─────────────┬───────────────────────────────┬─────────────┐
│ id        │ jobId  │ seekerId    │ resumeUrl                     │ status      │
├───────────┼────────┼─────────────┼───────────────────────────────┼─────────────┤
│ app_001   │ j_001  │ u_seek_001  │ uploadthing.com/rahul-cv.pdf  │ APPLIED     │
│ app_002   │ j_001  │ u_seek_002  │ uploadthing.com/priya-cv.pdf  │ SHORTLISTED │
│ app_003   │ j_002  │ u_seek_002  │ uploadthing.com/priya-cv.pdf  │ APPLIED     │
│ app_004   │ j_003  │ u_seek_001  │ uploadthing.com/rahul-cv.pdf  │ REVIEWED    │
│ app_005   │ j_003  │ u_seek_003  │ uploadthing.com/arjun-cv.pdf  │ APPLIED     │
└───────────┴────────┴─────────────┴───────────────────────────────┴─────────────┘

NOTICE:
→ u_seek_002 (Priya) applied to 2 jobs (app_002, app_003) — allowed!
→ u_seek_001 (Rahul) can apply to j_001 only once — @@unique enforces it
→ j_001 (Senior UI Designer) has 2 applications — employer will view
→ j_004 (CLOSED) shouldn't receive new applications — checked in app

Duplicate check:
If Rahul tries to apply to j_001 again:
→ @@unique([jobId, seekerId]) fails
→ Prisma throws PrismaClientKnownRequestError (P2002 — unique constraint)
→ Catch in app and show "Already applied" message
```

---

## Slug Generation

```typescript
// Generate slug when creating a job:
import { slugify } from 'your-util'

function generateSlug(title: string, companyName: string): string {
  const base = `${title}-at-${companyName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')    // Special chars → dash
    .replace(/(^-|-$)/g, '')         // Remove leading/trailing dashes

  // Add random suffix to ensure uniqueness
  const suffix = Math.random().toString(36).substring(2, 7)
  return `${base}-${suffix}`
}

// Example:
// title: "Senior UI Designer", company: "Design Studio"
// → "senior-ui-designer-at-design-studio-k3m9p"
```

---

## Common Queries

```typescript
// 1. Public job listing (for ISR page):
const activeJobs = await prisma.job.findMany({
  where: {
    status: 'ACTIVE',
    OR: [
      { expiresAt: null },
      { expiresAt: { gt: new Date() } }  // Not expired
    ]
  },
  include: {
    employer: {
      select: { companyName: true }
    },
    _count: { select: { applications: true } }  // Application count
  },
  orderBy: { createdAt: 'desc' }
})

// 2. Single job page (by slug):
const job = await prisma.job.findUnique({
  where: { slug: params.slug },
  include: {
    employer: {
      select: { companyName: true, companyWebsite: true }
    }
  }
})

// 3. Employer's jobs with application counts:
const myJobsWithCounts = await prisma.job.findMany({
  where: { employerId: currentUserId },
  include: {
    _count: { select: { applications: true } }
  }
})

// 4. Applications for a job (employer view):
const applications = await prisma.application.findMany({
  where: { jobId: jobId },
  include: {
    seeker: {
      select: { name: true, email: true }
    }
  },
  orderBy: { appliedAt: 'desc' }
})

// 5. Has seeker applied? (duplicate check before showing "Apply" button):
const existingApplication = await prisma.application.findUnique({
  where: {
    jobId_seekerId: {        // Composite unique field name — Prisma auto-generates
      jobId: jobId,
      seekerId: currentUserId
    }
  }
})
const hasApplied = !!existingApplication
```

---

**Next →** `db-projects-03-04-05.md` — Chat, E-commerce, Analytics schemas