In C.0 the plan was locked in — the **Hiring Platform**: employers post jobs (with AI-generated descriptions), candidates apply with resume upload (getting an AI Match Score), and Stripe handles featured listings. Before writing any code, let's do what every project starts with: **planning.** Batch 1's blog started with a planning file (1.5.1), the Task Board started with planning (6.13.1), the Photo Gallery too (7.7.1). The rule is always the same: **clarify pages, data, and flow before looking at the UI** — otherwise you'll have to change the schema mid-build, and migrations hurt.

This file answers **five questions** that form the project's blueprint.

---

## Question 1 — What Are We Building? (From User Journeys)

Before listing features, think about **people's journeys** — every page in the app should serve some person doing some task:

**Employer journey:**
1. Sign in with GitHub → first time, choose the "Employer" role + provide company name/logo
2. Go to dashboard — see their job list + stats (how many applications arrived)
3. Click "Post Job" — type title/skills, hit the **AI button** to generate a draft description, edit it, post
4. Optionally make the job **featured** — Stripe checkout → payment → the job appears at the top
5. Applications start coming in — each has an **AI match score** pre-computed, shown ranked, click to open a resume

**Candidate journey:**
1. Sign in with GitHub → choose "Candidate" role
2. Browse jobs on the home page — featured jobs first
3. Open a job detail → click "Apply"
4. Fill the form (cover note) + **upload a PDF resume** → submit
5. Instantly get an **AI Match Score** ("you're a 78/100 fit for this job") — track all applications on a "My Applications" page

See how the journeys produce the features naturally. Those features now become pages.

## Question 2 — What Pages Do We Need?

Translating journeys into routes:

| Route | What it shows | Access | Batch concept |
|---|---|---|---|
| `/` | Home — featured jobs first, then all jobs + search/location/type filters | Public | SC read (2.1), searchParams, revalidate (2.3) |
| `/jobs/[slug]` | Job detail — description, skills, salary, company logo, Apply button | Public | Dynamic route (1.3), `generateMetadata` (2.4), `next/image` (7.2) |
| `/jobs/[slug]/apply` | Application form — cover note + resume PDF upload | Candidate | Server Action (3.3), Vercel Blob |
| `/login` | GitHub sign-in button | Public | Auth.js (5.4) |
| `/onboarding` | Role selection — Employer or Candidate (+ company form for employers) | Logged-in | Session read (5.4.2), SA mutation |
| `(employer)/dashboard` | My jobs + stats cards (streaming Suspense) | Employer | Protected group (5.4.3), Streaming (7.5) |
| `(employer)/post-job` | Post job form + "Generate with AI" button | Employer | `useActionState` (3.3.1), Gemini API |
| `(employer)/jobs/[id]` | Applicant list — AI-ranked + resume links | Employer (owner) | Prisma relations (6.x) |
| `(candidate)/applications` | My applications + match scores | Candidate | SC reads + relations |

**Why route groups matter here:** The `(employer)` group's layout does a single `auth()` check — you don't protect each of the three employer pages separately. This is 5.4.3's pattern, scaled up.

Note `/jobs/[slug]` vs `(employer)/jobs/[id]` — the **public** URL uses an SEO-friendly slug (`frontend-developer-at-acme`), while the employer panel uses the internal `id`. Different concerns, different URLs.

## Question 3 — What Is the Data Shape?

Same rule as 7.7.1: **decide data by looking at the UI, not the other way around.**

Looking at each page tells us the fields:

- Job card/detail → title, description, location, type, salary range, skills, posted date, company (name + logo)
- Featured sorting → `featured` flag
- Applicant list → who applied, when, score, resume location
- Employer dashboard → the jobs for their company

This means **four tables + relations:**

```
User            Company          Job              Application
─────────       ─────────        ────────         ───────────
id              id               id               id
email (uniq)    name             slug (uniq)      coverNote?
name            logoUrl?         title            resumeUrl
image?          ownerId →User    description      matchScore?
role                             location?        matchReason?
company  1:1    jobs    1:N      type             status
applications                     salaryMin?       createdAt
createdAt                        salaryMax?
                                 skills
                                 featured
                                 companyId→Company
                                 applications 1:N
                                 createdAt

Application: jobId→Job + candidateId→User
```

**Why each field (that isn't obvious):**

- **`User.role`** — enum `CANDIDATE | EMPLOYER`. Comes from GitHub OAuth? No — this is an app-level decision, the user chooses it during onboarding. Carried in the session so every check is cheap.
- **`Job.slug`** — an SEO-friendly string for URLs (`title-company` style). The `id` is fine internally, but to rank on Google the URL needs to be readable. The unique constraint is critical — two jobs can't share the same slug.
- **`Job.skills`** — a simple comma-separated string (`React, TypeScript, Next.js`). An array would work too, but search is just text matching — an array's complexity is unnecessary here.
- **`Job.featured`** — a boolean flag. When Stripe's webhook confirms payment, this flips to `true` (C.7). The home page query uses it for sorting.
- **`Application.matchScore` + `matchReason`** — nullable (`Int?`). Because the score is computed at apply-time (C.9) — if the AI call fails, the application should still be saved. Nullable is an honest database reflection: "the application is important, the score is a bonus."
- **`Application.resumeUrl`** — a Vercel Blob **private URL**. Private because a resume should only be visible to the employer of that one job — a public URL could be guessed and opened by anyone. Access control is handled in C.8/C.10.
- **`@@unique([jobId, candidateId])`** — a **composite unique constraint!** One candidate can apply to one job **only once.** This is the database-level guard — even if the app-level check has a race condition (two nearly-simultaneous requests both pass the check), the database is the last line of defense. The second insert fails.

Relations recap (6.12's system): `User 1—1 Company` (an employer has one company), `Company 1—N Jobs`, `Job 1—N Applications`, `User 1—N Applications` (a candidate's applications). The `Application` table has two foreign keys because it joins two tables — this is the **junction table** pattern.

## Question 4 — Where Do Mutations Happen?

Reads are Server Component queries. The real work is **mutations.** Here's the map:

| Mutation | How | File |
|---|---|---|
| Role + company setup | Server Action — update `User.role` (+ create `Company`) | C.5 |
| Job description draft | Server Action → call Gemini API → return draft string | C.6 |
| Post / edit / close job | Server Actions with `useActionState` | C.6/C.7 |
| Featured purchase | SA → Stripe Checkout redirect; **payment result comes via webhook** → set `featured = true` | C.7 |
| Apply (note + resume + score) | SA → Blob upload → create Application → Gemini score → save | C.8/C.9 |
| Rate limiting | `proxy.ts` — apply + AI endpoints get a request limit | C.11 |

**Pattern note (roadmap's rule):** **Mutations go in Server Actions.** Route Handlers are only for the Stripe webhook — because a webhook is an HTTP POST from Stripe's server, which can't call a Server Action. This is the live example of the SA vs. Route Handler comparison.

## Question 5 — How Do Roles Flow?

The auth flow, step by step:

```
GitHub login (Auth.js)
   │
   ▼
First time logging in? ──yes──▶ /onboarding ──▶ choose role
   │ no                                      │
   ▼                                         ▼
Session has the role              EMPLOYER → company form → (employer)/dashboard
                                  CANDIDATE → (candidate)/applications
```

- Every protected layout (like `(employer)/layout.tsx`) calls `auth()`, checks the role, and redirects if it's wrong — the 5.4.3 pattern with the role twist.
- Guests can only see public routes. Click "Apply" while logged out → redirect to `/login`.

---

## Plan Summary Table

| | Plan |
|---|---|
| **What** | Hiring Platform — jobs (public) + posting/applicants (employer) + applying/scores (candidate) |
| **Pages** | 4 public (`/`, `[slug]`, apply, login) + onboarding + 3 employer + 1 candidate |
| **Roles** | Guest / Candidate / Employer — role chosen at onboarding, carried in session |
| **Data** | 4 models — User, Company, Job, Application; Application is a junction table (`@@unique` prevents duplicate applies) |
| **Mutations** | All Server Actions; Route Handler only for the Stripe webhook |
| **AI** | 2 Gemini calls — JD draft (C.6) + Match Score (C.9) |
| **Payments** | One-time Featured Listing via Stripe Checkout + webhook |
| **Files** | Resume PDF → Vercel Blob private storage |
| **Series** | C.2 setup/schema → C.3 home → C.4 detail → C.5 auth → C.6-C.7 employer → C.8-C.9 candidate+AI → C.10 dashboard → C.11 audit → C.12 deploy |

## Nutshell

The planning pattern: **derive pages from user journeys** (every page serves a person doing a task), **derive data shape from the UI** (UI first, schema second — the rule from 7.7.1), **decide the mutation pattern first** (Server Action vs. Route Handler — the webhook exception), and **diagram the auth flow** (where each check happens). The Hiring Platform = 4 public pages + onboarding + 3 employer + 1 candidate page, 4 related models, 2 AI calls, 1 payment flow.

## What It Is NOT

- **A hiring platform is not "a LinkedIn clone."** No feed, no connections, no messaging — just the core loop: post → apply → review. Scope control is the capstone's strength, not a weakness.
- **`matchScore` is not "a candidate's guarantee."** It's an LLM estimate — a screening helper, not a hiring decision. That's why `matchReason` is stored alongside it — a lone score is misleading.
- **The role system is not "a permissions matrix."** Just two roles — no admin or moderator tiers. A simple enum + layout-level checks — no RBAC framework needed.
- **A slug is not "just a random ID renamed."** The slug's purpose is SEO + shareability — Google needs to index these job listings, and UUIDs don't rank. A human-readable URL matters.
- **A planning file is not "an immutable spec."** During implementation, small adjustments happen (a field gets added). The plan sets direction — it doesn't freeze every line.

---

**In Your Own Words**

1. The `Application` table has two foreign keys — `jobId` and `candidateId`. Why?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `Application` is a **junction entity** — it links a `Job` and a `User` (the candidate). Many candidates apply to one job, and one candidate applies to many jobs — a many-to-many in both directions. So you need a middle table that references both, plus its own fields (resumeUrl, matchScore). That's the junction-table pattern.

</details>

2. What does `@@unique([jobId, candidateId])` prevent — and why isn't an app-level check enough?

<details>
<summary>Show Answer</summary>

**Sample Answer:** It prevents **duplicate applications** — one candidate applying to the same job twice. An app-level check ("query first, insert if empty") has a **race condition**: two near-simultaneous requests can both pass the check and both insert. A database unique constraint is atomic — the second insert fails regardless. The database is the last line of defense.

</details>

3. After Stripe payment, the job gets featured — why isn't this a Server Action?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The payment confirmation arrives as an **HTTP POST from Stripe's server** (a webhook) — it's not a browser-initiated request, so it can't call a Server Action. A webhook needs a public HTTP endpoint — a Route Handler (`route.ts`). We create the Checkout session in a Server Action, but the payment result is processed in the webhook handler.

</details>

4. Why is `matchScore` nullable (`Int?`) — doesn't it get computed at apply time?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The score is computed at apply-time, but the AI call can fail (rate limits, network issues). If the column were non-nullable, the application couldn't be saved at all until the score succeeds. Making it nullable says: "the application is the important part; the score is a bonus." A failed score is `null`, the application is still saved, and the score can be retried later.

</details>

5. `/jobs/[slug]` is public but `(employer)/jobs/[id]` is protected — why two URLs for jobs?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Different audiences, different needs. The public detail page uses a **slug** for SEO and shareability — Google needs to index these, and humans need to read the URL. The employer panel is internal — SEO doesn't matter there, and a direct `id` lookup is simpler and faster. Different concerns, different URLs.

</details>

---

The plan is ready — pages, roles, data, and flow are all clear. Now build the **environment:** a new Next.js project, a Neon database connection, the Prisma schema (those four models), and seed data — so there's real data in the database before C.3. See you in C.2.

We'll explore this in detail in the next topic.