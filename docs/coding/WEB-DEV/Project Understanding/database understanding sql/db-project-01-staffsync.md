# 🗄️ DB Project 1 — StaffSync: Task Manager
### Complete Database Design — From PRD to Final Schema

---

## Extracting Entities from the Brief

```
Brief: "Business owner manages employees, assigns tasks,
        tracks deadlines, checks status."

Extract NOUNS:
→ Business Owner → User (role = ADMIN)
→ Employee       → User (role = EMPLOYEE) — SAME TABLE, different role
→ Task           → Task entity
→ Deadline       → dueDate column of Task
→ Status         → status column of Task (enum)

ENTITIES: User, Task
(Simple! 2 tables. Beginners often over-engineer here.)
```

---

## Entity-Relationship Map

```
USER (1) ──────────────── (N) TASK   [createdBy — Admin created the task]
USER (1) ──────────────── (N) TASK   [assignedTo — assigned to Employee]

One User has many Tasks (both relations)
One Task has exactly one creator and one assignee
```

---

## Column Design — Decision for Each Field

```
USER TABLE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Field        | Type     | Nullable | Default  | Why
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           | String   | NO       | cuid()   | PK, unique identifier
name         | String   | NO       | —        | Display name, required
email        | String   | NO       | —        | Login, @unique
password     | String   | NO       | —        | Hashed! Never plain text
role         | UserRole | NO       | EMPLOYEE | Default employee on signup
clerkId      | String   | YES      | —        | Clerk auth sync (if using Clerk)
createdAt    | DateTime | NO       | now()    | Audit trail
updatedAt    | DateTime | NO       | auto     | Last modified tracking
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK TABLE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Field        | Type       | Nullable | Default  | Why
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
id           | String     | NO       | cuid()   | PK
title        | String     | NO       | —        | Task name, required
description  | String     | YES      | —        | Extra details, optional
status       | TaskStatus | NO       | TODO     | Current state
priority     | Priority   | NO       | MEDIUM   | Urgency level
dueDate      | DateTime   | YES      | —        | Optional deadline
assignedToId | String     | NO       | —        | FK → User (who will do it)
createdById  | String     | NO       | —        | FK → User (who created it)
createdAt    | DateTime   | NO       | now()    | Audit trail
updatedAt    | DateTime   | NO       | auto     | Last modified
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Final Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── ENUMS ──────────────────────────────────────────────────
enum UserRole {
  ADMIN
  EMPLOYEE
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}

// ─── MODELS ─────────────────────────────────────────────────
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      UserRole @default(EMPLOYEE)
  clerkId   String?  @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations — named because same table appears twice
  assignedTasks Task[] @relation("AssignedTasks")
  createdTasks  Task[] @relation("CreatedTasks")

  @@map("users")
}

model Task {
  id           String     @id @default(cuid())
  title        String
  description  String?
  status       TaskStatus @default(TODO)
  priority     Priority   @default(MEDIUM)
  dueDate      DateTime?
  assignedToId String
  createdById  String
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  // Relations
  assignedTo User @relation("AssignedTasks", fields: [assignedToId], references: [id], onDelete: Restrict)
  createdBy  User @relation("CreatedTasks",  fields: [createdById],  references: [id], onDelete: Restrict)

  // Indexes
  @@index([assignedToId])           // Fetch employee's tasks
  @@index([status])                 // Status filter
  @@index([dueDate])                // Overdue tasks
  @@index([assignedToId, status])   // "My pending tasks" — most common query

  @@map("tasks")
}
```

---

## Sample Data — How Tables Will Be Filled

```
users table:
┌──────────────┬──────────────────┬────────────────────────┬──────────┐
│ id           │ name             │ email                  │ role     │
├──────────────┼──────────────────┼────────────────────────┼──────────┤
│ u_rohan001   │ Rohan Sharma     │ rohan@staffsync.com    │ ADMIN    │
│ u_rahul002   │ Rahul Verma      │ rahul@staffsync.com    │ EMPLOYEE │
│ u_priya003   │ Priya Singh      │ priya@staffsync.com    │ EMPLOYEE │
│ u_amit004    │ Amit Patel       │ amit@staffsync.com     │ EMPLOYEE │
└──────────────┴──────────────────┴────────────────────────┴──────────┘

tasks table:
┌──────────────┬──────────────────────────┬────────────┬──────────┬──────────────┬─────────────┐
│ id           │ title                    │ status     │ priority │ assignedToId │ createdById │
├──────────────┼──────────────────────────┼────────────┼──────────┼──────────────┼─────────────┤
│ t_task001    │ Design homepage mockup   │ TODO       │ HIGH     │ u_rahul002   │ u_rohan001  │
│ t_task002    │ Fix login page bug       │ IN_PROGRESS│ HIGH     │ u_rahul002   │ u_rohan001  │
│ t_task003    │ Write API documentation  │ TODO       │ MEDIUM   │ u_priya003   │ u_rohan001  │
│ t_task004    │ Setup CI/CD pipeline     │ DONE       │ LOW      │ u_priya003   │ u_rohan001  │
│ t_task005    │ Review PR #42            │ TODO       │ MEDIUM   │ u_amit004    │ u_priya003  │
└──────────────┴──────────────────────────┴────────────┴──────────┴──────────────┴─────────────┘

NOTICE:
→ t_task005 → createdById = u_priya003 (Employee also created a task)
  Meaning anyone can create task, not just admin
  (Or you can restrict via role check in Server Action)
→ u_rahul002 has 2 tasks — t_task001, t_task002 (One-to-Many clearly visible)
→ u_rohan001 never in assignedToId — Admin doesn't do tasks himself

Queries and results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query 1: "Rahul's all tasks"
WHERE assignedToId = 'u_rahul002'
Result: t_task001, t_task002

Query 2: "All TODO tasks"
WHERE status = 'TODO'
Result: t_task001, t_task003, t_task005

Query 3: "Rahul's TODO tasks" (composite index used)
WHERE assignedToId = 'u_rahul002' AND status = 'TODO'
Result: t_task001 only

Query 4: "Admin dashboard — status count"
SELECT status, COUNT(*) FROM tasks GROUP BY status
Result: TODO: 3, IN_PROGRESS: 1, DONE: 1
```

---

## Prisma Queries — Common Operations

```typescript
// 1. Fetch employee's tasks:
const myTasks = await prisma.task.findMany({
  where: {
    assignedToId: currentUserId,
    status: { not: 'DONE' }  // Exclude done
  },
  orderBy: [
    { priority: 'desc' },   // HIGH first
    { dueDate: 'asc' }      // Earliest deadline first
  ],
  include: {
    createdBy: {
      select: { name: true }  // Only name needed
    }
  }
})

// 2. Admin dashboard stats:
const stats = await prisma.task.groupBy({
  by: ['status'],
  _count: { status: true }
})
// Result: [{ status: 'TODO', _count: { status: 3 } }, ...]

// 3. Overdue tasks:
const overdueTasks = await prisma.task.findMany({
  where: {
    dueDate: { lt: new Date() },  // Less than today
    status: { not: 'DONE' }
  },
  include: {
    assignedTo: { select: { name: true, email: true } }
  }
})

// 4. Create a task:
const newTask = await prisma.task.create({
  data: {
    title: 'New task title',
    description: 'Optional description',
    priority: 'HIGH',
    dueDate: new Date('2024-12-31'),
    assignedToId: employeeId,
    createdById: adminId,
  }
})

// 5. Update status:
const updatedTask = await prisma.task.update({
  where: { id: taskId },
  data: { status: 'IN_PROGRESS' }
})
```

---

## Interview Points — What to Say

```
"StaffSync's database design had one interesting decision —
User table is a single table for both Admin and Employee.
No need to create two separate tables — differentiated via role column.

Task table has two FKs to the same User table —
assignedToId and createdById — both are different relations.
Used named relations in Prisma — 'AssignedTasks' and 'CreatedTasks'.

Put composite index @@index([assignedToId, status]) because
the most frequent query was 'my pending tasks' — on employee dashboard.
Prisma doesn't do this automatically, had to add manually."
```

---

**Next →** `db-project-02-hirehop.md` — Job Board schema