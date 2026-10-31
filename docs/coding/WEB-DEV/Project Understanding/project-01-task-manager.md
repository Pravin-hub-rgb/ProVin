# 🚀 Project 1 — StaffSync: Task Management SaaS
### Task Tracker for Small Business Employees

---

## 💬 The Brief — What the Client Said

> *"Bro, I have a small business — 8 employees. I assign tasks on WhatsApp,
> everyone forgets. I need a simple tool where I can assign tasks,
> set deadlines, and see who's doing what.
> Nothing like Jira — keep it simple."*

Okay. Understood. This is an **internal task management tool** — for a small team, non-technical users.

---

## 📋 Step 1 — PRD Lite

```
PROJECT NAME  : StaffSync
TYPE          : Internal Web App / SaaS (single business use)
ONE LINE      : "This is a task management tool that helps small business
                 owners track their team's work."

TARGET USER:
  Primary   → Business Owner / Manager (Admin)
              Non-technical, will use from mobile too
  Secondary → Employee (limited access — sees only their tasks)

CORE FEATURES (MVP):
  [ ] Auth (login/logout) — Google or email
  [ ] Admin: Add/remove employees
  [ ] Admin: Create a task + assign to an employee
  [ ] Admin: Dashboard — status of all tasks in one place
  [ ] Employee: View their assigned tasks
  [ ] Employee: Update task status (Todo → In Progress → Done)
  [ ] Set deadlines + highlight overdue

STRETCH (V2):
  [ ] Email/push notifications on assignment
  [ ] Comments on tasks
  [ ] File attachments
  [ ] Analytics (completion rate, employee performance)

OUT OF SCOPE:
  ❌ Mobile app (web responsive is enough)
  ❌ Multiple organizations / multi-tenant
  ❌ Time tracking
  ❌ Billing / payments
```

---

## 🏗️ Step 2 — Architecture Decisions

Let's think through them one by one.

---

**Framework → Next.js App Router**

No debate here. Need full-stack, SEO isn't a big concern (internal tool), and want to use Server Actions. Next.js is perfect.

---

**API Style → Server Actions ✅ (not REST)**

This is an interesting decision. Why Server Actions?

```
Client said specifically: "Only build a web app."
→ No mobile app
→ No external third-party consumers
→ No webhook endpoints needed

So there's no need to build REST API routes.
Form submits directly → executes on server.
Type safety is automatic with TypeScript.
Less boilerplate — no fetch(), no response.json(), no route file.

If a mobile app were needed tomorrow → then we'd add REST routes.
But right now, Server Actions is the cleaner approach.
```

---

**Auth → Clerk ✅**

```
Why Clerk?
→ Setup is very fast — done in 30 minutes
→ UI components included (login page, user button — all ready)
→ Google + Email login out of the box
→ User management dashboard also provided (helpful for admin)

Why not NextAuth?
→ NextAuth requires writing more custom code — callbacks, providers config
→ Auth isn't complex in this project, so Clerk's simplicity wins
→ If custom UI or full control were needed → NextAuth/Better Auth
```

---

**RBAC — Role-Based Access Control → DEFINITELY NEEDED**

```
This project definitely needs RBAC because:
→ Admin: can see and manage everything
→ Employee: only their tasks, can update status

Implementation plan:
→ "role" field in User model: ENUM ('admin', 'employee')
→ Role check in middleware (protected routes)
→ Role verification in Server Actions too (client-side check can be bypassed!)
→ UI conditionally renders based on role
```

---

**State Management → Zustand (minimal) + React Query**

```
Why Zustand?
→ Task filters state (status filter, assignee filter) is shared by multiple components
→ Sidebar filter and main content tasks both need to stay in sync
→ Context would also work, but Zustand is cleaner here

Why React Query?
→ Tasks come from server — this is server state
→ React Query automatically handles caching, background refetch, loading/error states
→ Automatic list refresh after task create/update — optimistic updates possible

Why not just useState?
→ Too much prop drilling — task list component lifts status filter,
   passes to filter component, that passes to sidebar... gets messy
```

---

**Database → PostgreSQL + Prisma**

```
Why PostgreSQL?
→ Data is clearly relational:
  User → Tasks (one to many)
  Task → Assignee (many to one)
  If comments added later → Task → Comments (one to many)
→ Relations are important → SQL database is best choice

Why Prisma?
→ TypeScript-first — types auto-generate from schema
→ Migrations are easy
→ Query syntax is readable and type-safe

Hosted where?
→ Neon (serverless PostgreSQL) — works seamlessly with Vercel
```

---

**Rendering → SSR for dashboard, SSG for landing/login**

```
Dashboard (admin/employee views):
→ User-specific data — each user sees different data
→ SSR — fresh data on every request, personalized

Login/Signup pages:
→ Static — SSG is fine

Landing page (if public):
→ SSG — pre-built, fast, served from CDN
```

---

## 🗄️ Step 3 — Data Model

```
USER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id          UUID          PK
name        VARCHAR(100)
email       VARCHAR(255)  UNIQUE  ← Index here (login query)
role        ENUM          'admin' | 'employee'
clerk_id    VARCHAR(255)  UNIQUE  ← For sync with Clerk
created_at  TIMESTAMP

TASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           UUID          PK
title        VARCHAR(255)
description  TEXT          nullable
status       ENUM          'todo' | 'in_progress' | 'done'
priority     ENUM          'low' | 'medium' | 'high'
due_date     DATE          nullable
created_by   UUID          FK → User.id  (created by Admin)
assigned_to  UUID          FK → User.id  (assigned to Employee)
created_at   TIMESTAMP
updated_at   TIMESTAMP

RELATIONS:
→ User has many Tasks (as creator)
→ User has many Tasks (as assignee)
→ Task belongs to User (creator)
→ Task belongs to User (assignee)

INDEXES:
→ Task.assigned_to  (employee fetches their tasks — frequent query)
→ Task.status       (filter by status — frequent)
→ Task.due_date     (overdue tasks query)
→ User.email        (login lookup)
```

---

## 📋 Step 4 — Feature Breakdown

```
PHASE 1 — MVP:

  Auth (Clerk)
  ├── [ ] Clerk setup + middleware
  ├── [ ] Login / Signup pages
  ├── [ ] Role assignment on first login (default: employee)
  └── [ ] Protected routes (dashboard requires auth)

  Admin Features
  ├── [ ] Employee list view
  ├── [ ] Task create form (title, desc, assignee, due date, priority)
  ├── [ ] Task list — all tasks with filters (status, assignee)
  ├── [ ] Task edit
  ├── [ ] Task delete
  └── [ ] Dashboard summary (todo count, in-progress, done, overdue)

  Employee Features
  ├── [ ] My tasks list
  └── [ ] Status update (drag or dropdown)

  Edge Cases
  ├── [ ] Empty state (no tasks assigned)
  ├── [ ] Overdue tasks visual indicator
  ├── [ ] Form validation (Zod — client + server)
  └── [ ] Loading/error states (React Query handles this)

PHASE 2:
  [ ] Email notifications (Resend — on task assignment)
  [ ] Comments on tasks
  [ ] Due date reminders (Inngest cron job)
```

---

## 🗂️ Step 5 — Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx        ← Clerk login page
│   ├── (dashboard)/
│   │   ├── layout.tsx            ← Auth check + role fetch
│   │   ├── admin/
│   │   │   ├── page.tsx          ← Admin dashboard
│   │   │   ├── tasks/page.tsx    ← All tasks view
│   │   │   └── employees/page.tsx
│   │   └── employee/
│   │       └── page.tsx          ← My tasks view
│   └── layout.tsx
│
├── actions/
│   ├── task.actions.ts           ← createTask, updateTask, deleteTask
│   └── user.actions.ts           ← inviteEmployee, updateRole
│
├── components/
│   ├── ui/                       ← shadcn/ui components
│   └── features/
│       ├── TaskCard.tsx
│       ├── TaskForm.tsx
│       ├── TaskFilters.tsx
│       └── DashboardStats.tsx
│
├── lib/
│   ├── db.ts                     ← Prisma client
│   ├── auth.ts                   ← Clerk helpers
│   └── validations/
│       └── task.schema.ts        ← Zod schemas
│
└── stores/
    └── taskFilters.store.ts      ← Zustand — filter state
```

---

## 🎙️ Interview Script — STAR Format

```
SITUATION:
"I built StaffSync — a task management tool for small businesses.
The problem was that 5-10 person teams typically managed tasks
via WhatsApp or verbal communication — there was no accountability,
deadlines got missed."

TASK:
"I had to build a simple web app that non-technical users could easily use.
I clearly defined the scope — only task creation, assignment, and status tracking.
I pushed analytics and notifications to V2 because the core workflow
needed to be solid first."

ACTION:
"I made some interesting decisions —

First: Chose Server Actions over REST.
The app was web-only, no external consumers.
Server Actions gave automatic type safety and reduced boilerplate.

Second: Implemented RBAC — Admin and Employee roles.
The important decision was to check role in Server Actions too, not just UI.
Client-side checks can be bypassed — security must be on the server.

Third: Used Zustand + React Query for state management.
Filter state in Zustand — because sidebar filter and main list both needed same state.
Task data in React Query — perfect for server state, caching and background
refetch come automatically.

One challenge: when an employee logs in for the first time,
their role needed to be automatically assigned as 'employee'.
I set up a Clerk webhook that triggers on user creation
and sets the default role in the database."

RESULT:
"The app had full RBAC — Admin could manage all tasks,
Employee could only view and update their own.
One reflection: I'd spend more time on the data model upfront —
having to add a priority field mid-project made migration a bit painful.
Next time I'll invest more upfront time in data model."
```

---

**Next →** `project-02-job-board.md` — HireHop: Job Board with Employer & Seeker Roles