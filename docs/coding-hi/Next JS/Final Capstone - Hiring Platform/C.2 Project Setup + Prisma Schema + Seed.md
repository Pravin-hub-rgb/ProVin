In C.1 the full blueprint was set — 9 pages, 3 roles, and a schema draft (4 models: `User`, `Company`, `Job`, `Application`). Now turn that draft into **reality** — create the project, connect to Neon, write the Prisma schema, run migrations, add seed data — so that when C.3 builds the home page, there's real data in the database.

The generic setup steps (create-next-app, Prisma install/init) are already covered in detail in Batch 6/7 (0.8, 6.9, 6.13.3) — so those are quick here. **The real focus is the schema** — because it's the capstone's foundation, and C.1's design decisions now get written in PSL (Prisma Schema Language).

# Hiring Platform — Part 2: Setup + Schema + Seed

## Project Create + Packages

**Concept:** A fresh project — same process as the Photo Gallery (7.7.2). Create Next.js with TypeScript + App Router + Tailwind:

```bash
npx create-next-app@latest hiring-platform --typescript --app --tailwind
cd hiring-platform
```

Now install Prisma's two packages + init — the same steps from 6.13.3:

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

- **`@prisma/client`** — the runtime client — used for `prisma.job.findMany()` and all queries
- **`prisma`** — a dev dependency — the CLI, for `migrate dev` and similar commands
- **`npx prisma init`** — scaffolds `prisma/schema.prisma` + `.env`

Put the Neon connection string in `.env` — the same one from 6.9 (or create a fresh project in Neon — a clean database keeps the capstone simple):

```env
DATABASE_URL="postgresql://username:password@ep-something-xxx.region.neon.tech/neondb?sslmode=require"
```

> **Reminder:** Use `.env` (Prisma's convention), not `.env.local` — as explained in 6.13.3: Prisma reads `.env` directly.

**TEST:** After `npx prisma init`, the terminal shows `✔ Generated prisma/schema.prisma`. The folder structure:

```
hiring-platform/
├── app/
├── prisma/
│   └── schema.prisma    ← where we write the models
├── .env                 ← DATABASE_URL is set
└── package.json
```

## Schema — The 4 Models

Translating C.1's blueprint into real PSL. The build order mirrors the plan: **User (root) → Company → Job → Application (junction).** Only `NEW` lines are marked — existing patterns aren't repeated.

### Model 1 — User

The simplest model — email, name, image (GitHub avatar), role, timestamps:

```prisma
// prisma/schema.prisma
model User {
  id          Int      @id @default(autoincrement())
  email       String   @unique
  name        String?
  image       String?
  role        Role     @default(CANDIDATE)
  createdAt   DateTime @default(now())
}
```

Line by line:

- **`id Int @id @default(autoincrement())`** — the same pattern from 6.13.3 — primary key, auto 1, 2, 3...
- **`email String @unique`** — comes from GitHub OAuth. `@unique` — no two users share an email. It also makes the auth lookup fast (unique = automatic index).
- **`name String?` / `image String?`** — optional (`?`) — they come from the GitHub profile, but aren't guaranteed.
- **`role Role @default(CANDIDATE)`** — C.1's decision! The type is an enum `Role` (defined below). Default `CANDIDATE` — why? It's the safe default — no one accidentally gets employer powers without choosing. Being an employer is a deliberate choice.
- **`createdAt DateTime @default(now())`** — auto-set on creation, we don't send it (same concept as the Board model in 6.13.3).

Now add relations — a User connects in two directions:

```prisma
// prisma/schema.prisma
model User {
  id           Int           @id @default(autoincrement())
  email        String        @unique
  name         String?
  image        String?
  role         Role          @default(CANDIDATE)
  createdAt    DateTime      @default(now())
  company      Company?                                  // NEW
  applications Application[]                             // NEW
}
```

- **`company Company?`** — a *relation field* (not a database column — remember the rule from 6.13.3). The `?` — why? Only employer users have a company. Optional = an honest reflection of the domain.
- **`applications Application[]`** — all applications from one candidate (1:N).

### Model 2 — Company

Employers register their company during onboarding (C.5). Fields: name, logo, owner:

```prisma
// prisma/schema.prisma
model Company {                                              // NEW
  id      Int     @id @default(autoincrement())              // NEW
  name    String                                             // NEW
  logoUrl String?                                            // NEW

  ownerId Int     @unique                                    // NEW
  owner   User    @relation(fields: [ownerId], references: [id])  // NEW

  jobs    Job[]                                              // NEW
}                                                            // NEW
```

Two new concepts here:

- **`logoUrl String?`** — a remote URL (just like `Photo.src` in 7.7.1). The logo appears on every job card → gives `next/image` + `remotePatterns` (7.2) a real use-case. Optional — a company can post jobs before uploading a logo.
- **`ownerId Int @unique` + `owner User @relation(fields: [ownerId], references: [id])`** — the foreign key pattern from 6.13.3 (`Board.userId`), with a twist: **`@unique` on the foreign key.**

**Why `@unique` on the FK?** Without it, `ownerId` is a plain foreign key — one user could create multiple companies (1:N). Adding `@unique` means each `ownerId` value appears only once in the table — one user can have **at most one** company. This is how Postgres enforces a **1:1 relationship** — the constraint enforces the cardinality.

- **`jobs Job[]`** — all jobs from this company (1:N).

### Model 3 — Job

The biggest model — everything the public listing needs:

```prisma
// prisma/schema.prisma

model Job {
  id          Int      @id @default(autoincrement())
  slug        String   @unique
  title       String
  description String
  location    String?
  type        JobType  @default(FULL_TIME)
  salaryMin   Int?
  salaryMax   Int?
  skills      String
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())

  companyId  Int
  company    Company @relation(fields: [companyId], references: [id])

  applications Application[]

  @@index([featured, createdAt])
}
```

Each "think about it" field:

- **`slug String @unique`** — C.1's SEO decision. `/jobs/frontend-developer-at-acme` is Google-friendly; `/jobs/42` is not. `@unique` — two jobs can't have the same slug.
- **`description String`** — the full job description (AI-generated in C.6). In Prisma+PostgreSQL, `String` maps to `TEXT` — no length limit to worry about.
- **`type JobType @default(FULL_TIME)`** — enum (defined below). This powers the filter dropdown in C.3.
- **`salaryMin/salaryMax Int?`** — a range; optional because some employers prefer to hide salary.
- **`skills String`** — comma-separated (`"React, TypeScript, Next.js"`) — C.1's scope decision (an array's complexity isn't needed here). The AI Match Score in C.9 reads this string.
- **`featured Boolean @default(false)`** — Stripe payment confirmation (via webhook) flips this to `true` in C.7. Default false = posting is free, featuring costs money.
- **`@@index([featured, createdAt])`** — **pay attention — new concept.** The home page query always looks like: *"featured first, then newest."* Without an index, Postgres does a full table scan + in-memory sort on every request. This composite index is a pre-sorted mini-directory on exactly those two columns — the query reads the index directly, no sorting needed. With few rows it's invisible, but at production scale this is where performance lives. (The "indexes" section from 6.12 is now in your hands.)

### Model 4 — Application (Junction)

The two-foreign-key junction table — C.1's most interesting design:

```prisma
// prisma/schema.prisma

model Application {
  id          Int                @id @default(autoincrement())
  coverNote   String?
  resumeUrl   String
  matchScore  Int?
  matchReason String?
  status      ApplicationStatus  @default(PENDING)
  createdAt   DateTime           @default(now())

  jobId       Int
  job         Job  @relation(fields: [jobId], references: [id])

  candidateId Int
  candidate   User @relation(fields: [candidateId], references: [id])

  @@unique([jobId, candidateId])
}
```

- **`coverNote String?`** — the candidate's short message; optional.
- **`resumeUrl String`** — the Vercel Blob private URL (C.8). Non-null — you can't apply without a resume, so it's required.
- **`matchScore Int?` / `matchReason String?`** — nullable, as discussed in C.1's Question 4: the AI call (C.9) can fail. With a nullable column, the application is saved first, and the score is filled in later (or null).
- **`status ApplicationStatus @default(PENDING)`** — whether the employer has reviewed it (`REVIEWED`). A minimal enum — no REJECTED/OFFERED states yet (scope control, per C.0's rule).
- **Two relations** — `job` (which job) + `candidate` (who applied). The junction-table signature — theory in 6.12, reality here.
- **`@@unique([jobId, candidateId])`** — **composite unique** — the combination of both fields must be unique. One candidate can apply to one job **only once.** Even with race conditions (two near-simultaneous requests), the second insert fails at the database level (C.1, Question 2).

### Enums — Validity for Three Types

The models reference them — define all three enums (at the end of the schema, like the `Status` enum in 6.13.3):

```prisma
// prisma/schema.prisma
enum Role {
  CANDIDATE
  EMPLOYER
}

enum JobType {
  FULL_TIME
  PART_TIME
  CONTRACT
  INTERNSHIP
}

enum ApplicationStatus {
  PENDING
  REVIEWED
}
```

The same benefit as in 6.13.3 — a typo like `"fulltime"` never makes it into the database. Invalid values are rejected at insert time.

**The full relation picture:**

```
User 1 ── 0..1 Company 1 ── N Job 1 ── N Application N ── 1 User
(employer)         (ownerId unique)  (companyId)   (jobId)   (candidateId)
```

**TEST:** Run the migration:

```bash
npx prisma migrate dev --name init
```

Terminal output: `✔ Generated Prisma Client` + `✔ Your database is now in sync`. Then verify in the Neon SQL Editor:

```sql
SELECT * FROM "Job";
```

The result is `(0 rows)` — 4 tables created, all empty. Now fill them with seed data.

## Client — `lib/prisma.ts`

The exact same file from 6.13.3 — used again here. Copy it:

```ts
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

The why — 6.13.3 explained it line-by-line (hot reload causes connection leaks; the global singleton reuses one instance). Quick recap: in dev, the client is cached on `globalThis`; `??` creates a new one only on the first run.

## Seed — Starter Data in the Database

**The problem first:** to test the home page, we need jobs. The options were:

1. INSERT statements in the Neon SQL Editor — works, but with 4 related tables you maintain foreign-key order (User first, then Company, then Job...) and look up IDs manually. Painful.
2. **A seed script** — a TypeScript file using the Prisma client to create all starter data. Run once, data appears. Run again, it clears first.

Option 2 is production-standard — every serious project has a seed script. And using the Prisma client means relations are resolved automatically (nested create) — no manual ID passing.

**File:** `prisma/seed.ts` — new file:

```ts
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear old seed data (idempotent on re-runs)
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
```

**Why delete in reverse?** Foreign keys! `Application` references both `Job` and `User` — if you delete `User` first, Prisma throws a foreign-key violation ("row still referenced"). The golden rule: delete deepest children first.

```ts
  // Employer 1 + their company
  const acmeOwner = await prisma.user.create({
    data: {
      email: "acme@example.com",
      name: "Acme HR",
      role: "EMPLOYER",
      company: {
        create: {
          name: "Acme Corp",
          logoUrl: "https://picsum.photos/seed/acme/100",
        },
      },
    },
    include: { company: true },
  });
```

**Nested create** — `company: { create: {...} }` creates the User and Company in one call; Prisma wires `ownerId` automatically — no manual ID passing. **`include: { company: true }`** — the response includes the created company (needed on the next lines).

```ts
  // 3 jobs for Acme (one featured)
  const acmeJobs = await Promise.all([
    prisma.job.create({
      data: {
        title: "Frontend Developer",
        slug: "frontend-developer-at-acme",
        description:
          "Acme Corp is hiring a React developer to build modern web apps. You'll own Next.js components, state management, and API integration.",
        location: "Remote (India)",
        type: "FULL_TIME",
        salaryMin: 800000,
        salaryMax: 1400000,
        skills: "React, TypeScript, Next.js, Tailwind",
        featured: true,
        companyId: acmeOwner.company!.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "Backend Intern",
        slug: "backend-intern-at-acme",
        description:
          "6-month internship — learn Node.js APIs, MongoDB/PostgreSQL basics, REST design under mentorship.",
        location: "Bengaluru",
        type: "INTERNSHIP",
        skills: "Node.js, Express, SQL basics",
        companyId: acmeOwner.company!.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "Full Stack Engineer",
        slug: "fullstack-engineer-at-acme",
        description:
          "Build end-to-end features — from React frontend to PostgreSQL schema. Small team, big responsibility.",
        location: "Hyderabad (Hybrid)",
        type: "CONTRACT",
        salaryMin: 1200000,
        salaryMax: 1800000,
        skills: "React, Node.js, PostgreSQL, Prisma",
        companyId: acmeOwner.company!.id,
      },
    }),
  ]);
```

- **Salaries in lakhs** (800000 = ₹8 LPA) — `Int`, no currency symbols stored in the DB.
- **One job `featured: true`** — so C.3's featured sorting is visible immediately.
- **`Promise.all`** — the three creates are independent, so they run in parallel — the concurrency pattern from the React course, applied server-side here.

```ts
  // Employer 2 + company + 1 job
  const techNovaOwner = await prisma.user.create({
    data: {
      email: "technova@example.com",
      name: "TechNova Hiring",
      role: "EMPLOYER",
      company: { create: { name: "TechNova", logoUrl: "https://picsum.photos/seed/technova/100" } },
    },
    include: { company: true },
  });

  await prisma.job.create({
    data: {
      title: "React Native Developer",
      slug: "react-native-developer-at-technova",
      description:
        "Mobile-first product team. Build React Native apps, performance tuning, native module integration.",
      location: "Remote",
      type: "FULL_TIME",
      salaryMin: 900000,
      salaryMax: 1500000,
      skills: "React Native, TypeScript, Mobile",
      companyId: techNovaOwner.company!.id,
    },
  });
```

```ts
  // Candidate + 1 pre-scored application (for dashboard testing)
  const candidate = await prisma.user.create({
    data: {
      email: "priya@example.com",
      name: "Priya Sharma",
      role: "CANDIDATE",
    },
  });

  await prisma.application.create({
    data: {
      coverNote: "2 years of React experience, with 3 projects in my portfolio.",
      resumeUrl: "https://example.com/sample-resume.pdf",
      matchScore: 82,
      matchReason: "Strong React+TS overlap; Next.js experience is a bonus.",
      jobId: acmeJobs[0].id,
      candidateId: candidate.id,
    },
  });

  console.log("🌱 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
```

- **A pre-seeded application** with a score — so C.10's dashboard isn't empty; the ranked-applicant effect is visible immediately. The `matchScore/matchReason` are hardcoded — the real AI scoring happens in C.9.
- **`finally(() => prisma.$disconnect())`** — close the connection when the script ends (otherwise the terminal hangs).

Run it with a TypeScript runner (no build needed):

```bash
npx tsx prisma/seed.ts
```

**`tsx`?** Plain Node can't run `.ts` files; `tsx` is a zero-config TypeScript runner. Since the seed runs once, heavy tooling isn't worth it.

**TEST:** Output shows `🌱 Seed complete!`. Then verify in the Neon SQL Editor:

```sql
SELECT j.title, c.name AS company, j.featured
FROM "Job" j JOIN "Company" c ON j."companyId" = c.id
ORDER BY j.featured DESC, j."createdAt" ASC;
```

4 rows — Frontend Developer first (featured), then the rest in order. That's the exact ordering C.3's home page will show.

## Nutshell

Capstone setup: `create-next-app` + Prisma init + Neon in `.env` (all 6.x/7.x patterns). Schema = 4 models: `User` (role enum), `Company` (**`@unique` on FK = 1:1 relationship**), `Job` (slug `@unique` for SEO, `@@index([featured, createdAt])` for home sorting), `Application` (junction — two FKs + **`@@unique([jobId, candidateId])`** duplicate-apply guard). `migrate dev --name init` creates history-tracked migration. Seed script (`prisma/seed.ts`, run via `tsx`) — nested creates resolve FKs automatically; deletes are child-first; seeds employer + jobs + one scored application. `lib/prisma.ts` is the singleton client (copy from 6.13.3).

## What It Is NOT

- **`ownerId @unique` is not "the owner can never change."** A unique constraint means "each ownerId value appears once" — ownership transfer is allowed (update the column), it just enforces one-company-per-owner. 1:1 means cardinality, not immutability.
- **`@@index([featured, createdAt])` is not "the table stores data pre-sorted."** An index is a separate data structure (a pre-sorted mini-directory) — it doesn't change the table's row order. There's a trade-off too: every insert updates the index, so you don't index every column.
- **Seed is not "production data."** Seed creates development/test data. Production deploys don't run seeds — real data comes from real users.
- **`skills String` is not "best practice."** Comma-separated strings are hard to query — it's a deliberate scope trade-off (decided in C.1). A real product would use an array, JSON, or a separate table.
- **Enums are not "the source of truth for UI labels."** The database enforces valid values (`FULL_TIME` can't be misspelled as `"fulltime"`), but the display label ("Full Time") comes from a UI mapping — DB values and UI labels are separate.

---

**In Your Own Words**

1. Adding `@unique` to `Company.ownerId` — how did that change the relationship, and what would happen without it?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Without `@unique`, `ownerId` is a plain foreign key — one user could create multiple companies (1:N). Adding `@unique` means each `ownerId` value appears only once in the `Company` table — so one user can have at most one company (1:1). This is the standard way to enforce a one-to-one relationship in Postgres — put a unique constraint on the foreign key.

</details>

2. What's the difference between `@@unique([jobId, candidateId])` and a single-field `@unique`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Single-field `@unique` requires that column's value to be unique (no two users with the same email). Composite `@@unique` requires the **combination** to be unique: `(jobId=1, candidateId=5)` is allowed and `(jobId=1, candidateId=7)` is also allowed (different candidates for the same job), but `(jobId=1, candidateId=5)` appearing twice is blocked. This is what prevents duplicate applications — a combination-level constraint, essential for junction tables.

</details>

3. Why do seed deletes happen in reverse order (Application → Job → Company → User)? What if User were deleted first?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Foreign-key violation. `Company.ownerId` references `User.id` — deleting a User leaves a Company pointing at a non-existent owner, and Postgres throws an error ("update or delete violates foreign key constraint"). The safe order is: deepest children first (Application references two parents), then Job, then Company, then User.

</details>

4. Why is `matchScore Int?` nullable — what concrete problem does non-nullable cause?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The AI scoring call (C.9) happens around the database insert. If `matchScore` were non-nullable, an AI failure (rate limit, timeout) would cause the insert to be rejected — the candidate's application is lost over a scoring failure. With nullable, the application saves first (score can be null), and scoring retries later. It encodes a priority: the application matters more than the score.

</details>

5. What query pattern does `@@index([featured, createdAt])` serve, and when could you skip it?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The home page query: `findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }] })` — featured first, then newest. The composite index is a pre-sorted mini-directory on exactly those columns — the query reads it directly instead of sorting at runtime. With small data (< a few hundred rows), a sequential scan is still milliseconds — the index only matters at production scale. Over-indexing also has a cost (every insert updates the index), so you choose deliberately.

</details>

---

The foundation is ready — the project, database, 4 tables, and seed data. Now the first **user-facing page:** the home page — featured jobs first, with search + filters, all as Server Component reads. We start with hardcoded UI, then add the Prisma queries. This is C.3.

We'll explore this in detail in the next topic.