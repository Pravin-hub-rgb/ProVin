# 🗄️ DB Doc 1 — SQL Database Design Process
### For Every Project — Do This Before Writing Code

---

## 🎯 The Core Idea

> **If database design goes wrong, fixing it later is VERY painful.**
> You'll have to write migrations, transform data, and existing code will break.
> So — think first, then build.

This is a 7-step process. Follow it in every project — small or large.

---

## Step 1 — Entity Identification (What to store?)

**Entity = A real-world thing that needs to be stored in the database.**

Entities are identified from the PRD. There's a simple rule:

```
✅ It's an entity if:
→ It has multiple attributes (name, email, price...)
→ You'll need to query about it
→ Other things will reference it

❌ It's NOT an entity if:
→ It's just an action (login, logout, click)
→ It's an attribute of something else (user's email → column in User entity)
→ It's derived (age = today - birthdate → don't store, calculate)
```

**Example — Finding entities for StaffSync (Task Manager):**

```
Read the client requirement:
"Business owner manages employees, assigns tasks, tracks deadlines"

Extract nouns from the brief:
→ Business Owner    → User entity (role = admin)
→ Employee          → User entity (role = employee) [SAME TABLE!]
→ Task              → Task entity
→ Deadline          → Attribute of Task, not separate entity
→ Status            → Attribute of Task

Final entities:
→ User
→ Task

That simple? Yes! Keep it minimal at first.
```

**Don't Make This Mistake:**

```
❌ WRONG — Over-engineering:
"Need to track login history" → Create LoginHistory entity
"Need task comments" → Comment entity (fine to add this in V2)

✅ RIGHT — For MVP:
Only entities that are ESSENTIAL for core features.
Add the rest later — adding is easy, removing is hard.
```

---

## Step 2 — Define Attributes (Think of Columns)

For each entity, think of columns. There are **TWO CATEGORIES**:

### Category A — Mandatory Columns (ALWAYS KEEP THESE)

```
These columns should be in every table — no exceptions:

id          → Primary key. UUID or SERIAL/INT.
created_at  → When it was created. TIMESTAMP DEFAULT NOW()
updated_at  → When last updated. AUTO-UPDATE needed.

Why are they necessary?
→ id: Uniquely identifies every row
→ created_at: Audit trail, sorting by creation, analytics
→ updated_at: "Recently updated" queries, cache invalidation

In Prisma:
model User {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Category B — Domain Columns (Project-specific)

```
Ask these questions for each attribute:

1. Is it REQUIRED or OPTIONAL?
   → Required = NOT NULL
   → Optional = nullable (?)

2. Should it be UNIQUE?
   → Email → unique (two users can't have same email)
   → Name → usually not unique

3. Is there a DEFAULT value?
   → status → default 'active'
   → role   → default 'user'

4. WHICH TYPE?
   → Short text (name, email)     → String / VARCHAR
   → Long text (description, bio) → String (TEXT in DB)
   → Number (price, quantity)     → Int or Float or Decimal
   → True/False                   → Boolean
   → Date only                    → DateTime (just use date part)
   → Date + Time                  → DateTime
   → Fixed options (status, role) → Enum
   → JSON/Array                   → Json type (use sparingly)

5. Is it SENSITIVE?
   → Password → never plain text, store hashed
   → Any field users don't want logged → be careful
```

**Example — Attributes for Task entity:**

```
Requirement: "Task has title, description, deadline, status, priority.
              Assigned to some employee. Created by admin."

List attributes:
→ title       : String, REQUIRED (task name)
→ description : String, OPTIONAL (extra details)
→ status      : Enum ('todo', 'in_progress', 'done'), DEFAULT 'todo'
→ priority    : Enum ('low', 'medium', 'high'), DEFAULT 'medium'
→ dueDate     : DateTime, OPTIONAL (deadline)
→ assignedTo  : FK → User (who will do it)
→ createdBy   : FK → User (who created it)
+ mandatory: id, createdAt, updatedAt

❌ What NOT to include and why:
→ assigneeName  : Will come from JOIN with User table — don't duplicate
→ completedAt   : Not needed in V1, add in V2
→ taskNumber    : Auto-increment ID is enough
```

---

## Step 3 — Map Relationships

There are three types. Understand each one clearly:

---

### Type 1 — One-to-One (1:1)

```
Definition: One row in A matches exactly one row in B.

Real Example:
→ User and UserProfile
   One user has exactly one profile.
   One profile belongs to exactly one user.

When to use?
→ When something is optional or rarely accessed
   (profile data only needed on profile page, not every query)
→ When table becomes too wide — split it

HOW IN DATABASE:
Nothing changes in User table.
UserProfile table gets → userId FK with UNIQUE constraint.
Why UNIQUE? Without it, it becomes one-to-MANY!

In Prisma:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
model User {
  id      String       @id @default(cuid())
  email   String       @unique
  profile UserProfile?  // ← Optional because profile created later
}

model UserProfile {
  id        String   @id @default(cuid())
  bio       String?
  avatarUrl String?
  userId    String   @unique  // ← UNIQUE = enforces one-to-one
  user      User     @relation(fields: [userId], references: [id])
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sample Data:
User table:
┌──────────────┬─────────────────────┐
│ id           │ email               │
├──────────────┼─────────────────────┤
│ user_abc123  │ rahul@example.com   │
│ user_def456  │ priya@example.com   │
└──────────────┴─────────────────────┘

UserProfile table:
┌──────────────┬──────────────────────┬──────────────┐
│ id           │ bio                  │ userId       │
├──────────────┼──────────────────────┼──────────────┤
│ prof_111     │ "Senior Designer"    │ user_abc123  │
│ prof_222     │ "Product Manager"    │ user_def456  │
└──────────────┴──────────────────────┴──────────────┘

Notice: userId column has user_abc123 only once.
UNIQUE constraint ensures one user has only one profile.
```

---

### Type 2 — One-to-Many (1:N) ← Most Common!

```
Definition: One row in A matches MANY rows in B.
             One row in B matches exactly ONE row in A.

Real Examples:
→ User → Tasks    (one user has many tasks)
→ Post → Comments (one post has many comments)
→ Order → OrderItems (one order has many items)
→ Category → Products (one category has many products)

HOW IN DATABASE:
Add FK column in the "Many" table.
Tasks gets assignedToId → User's id.

Rule: FK always lives on the "MANY" side.

In Prisma:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
model User {
  id             String   @id @default(cuid())
  email          String   @unique
  assignedTasks  Task[]   @relation("AssignedTasks")
  createdTasks   Task[]   @relation("CreatedTasks")
  // ↑ One user has many tasks — both relations!
}

model Task {
  id           String   @id @default(cuid())
  title        String
  assignedToId String
  createdById  String
  assignedTo   User     @relation("AssignedTasks", fields: [assignedToId], references: [id])
  createdBy    User     @relation("CreatedTasks",  fields: [createdById],  references: [id])
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sample Data:
User table:
┌──────────────┬───────────────────────┬─────────┐
│ id           │ email                 │ role    │
├──────────────┼───────────────────────┼─────────┤
│ user_abc123  │ boss@company.com      │ admin   │
│ user_def456  │ rahul@company.com     │ employee│
│ user_ghi789  │ priya@company.com     │ employee│
└──────────────┴───────────────────────┴─────────┘

Task table:
┌──────────────┬──────────────────────┬──────────────┬──────────────┐
│ id           │ title                │ assignedToId │ createdById  │
├──────────────┼──────────────────────┼──────────────┼──────────────┤
│ task_001     │ Design homepage      │ user_def456  │ user_abc123  │
│ task_002     │ Write API docs       │ user_def456  │ user_abc123  │
│ task_003     │ Review designs       │ user_ghi789  │ user_abc123  │
│ task_004     │ Fix login bug        │ user_ghi789  │ user_abc123  │
└──────────────┴──────────────────────┴──────────────┴──────────────┘

Notice:
→ user_def456 has 2 tasks (task_001, task_002) — "many" side
→ user_abc123 created all tasks — FK points back to "one" side
→ user_abc123's id repeats in Task table — that's normal!
```

---

### Type 3 — Many-to-Many (M:N)

```
Definition: One row in A matches MANY rows in B.
             One row in B also matches MANY rows in A.

Real Examples:
→ Student ↔ Course    (one student many courses, one course many students)
→ Product ↔ Tag       (one product many tags, one tag on many products)
→ User ↔ Room (Chat)  (one user in many rooms, one room has many users)
→ Order ↔ Product     (one order has many products, one product in many orders)

HOW IN DATABASE:
Directly impossible. Must create a "Junction Table" (Bridge Table).
Junction table connects both tables.

Junction table always has:
→ FK to Table A
→ FK to Table B
→ Combination of both should be UNIQUE (one student enrolls in one course only once)
→ Optional: Extra columns (like enrollment date, grade)

In Prisma (implicit — Prisma auto-creates junction table):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
model Student {
  id      String   @id @default(cuid())
  name    String
  courses Course[] // ← Prisma automatically creates junction table
}

model Course {
  id       String    @id @default(cuid())
  title    String
  students Student[] // ← Array on both sides
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In Prisma (explicit — when extra columns needed):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
model Student {
  id          String       @id @default(cuid())
  name        String
  enrollments Enrollment[] // ← Connect via junction table
}

model Course {
  id          String       @id @default(cuid())
  title       String
  enrollments Enrollment[]
}

model Enrollment {  // ← JUNCTION TABLE (explicit)
  id           String   @id @default(cuid())
  studentId    String
  courseId     String
  enrolledAt   DateTime @default(now())  // ← Extra column!
  grade        String?                   // ← Extra column!

  student      Student  @relation(fields: [studentId], references: [id])
  course       Course   @relation(fields: [courseId], references: [id])

  @@unique([studentId, courseId])  // ← One student enrolls in one course only once
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sample Data:
Student table:
┌──────────┬───────────┐
│ id       │ name      │
├──────────┼───────────┤
│ s_001    │ Rahul     │
│ s_002    │ Priya     │
│ s_003    │ Arjun     │
└──────────┴───────────┘

Course table:
┌──────────┬───────────────────┐
│ id       │ title             │
├──────────┼───────────────────┤
│ c_001    │ React Basics      │
│ c_002    │ Next.js Advanced  │
│ c_003    │ Database Design   │
└──────────┴───────────────────┘

Enrollment table (Junction):
┌──────────┬──────────┬──────────┬─────────────┬───────┐
│ id       │ studentId│ courseId │ enrolledAt  │ grade │
├──────────┼──────────┼──────────┼─────────────┼───────┤
│ e_001    │ s_001    │ c_001    │ 2024-01-15  │ A     │
│ e_002    │ s_001    │ c_002    │ 2024-01-15  │ B+    │  ← Rahul in 2 courses
│ e_003    │ s_002    │ c_001    │ 2024-01-20  │ A+    │  ← Priya in React
│ e_004    │ s_002    │ c_003    │ 2024-01-20  │ B     │  ← Priya in DB too
│ e_005    │ s_003    │ c_002    │ 2024-02-01  │ null  │  ← Arjun in Next.js
└──────────┴──────────┴──────────┴─────────────┴───────┘

Notice:
→ s_001 (Rahul) → enrolled in c_001 and c_002
→ c_001 (React) has s_001 and s_002 both enrolled
→ Combination (s_001, c_001) appears only once — UNIQUE constraint
```

---

## Step 4 — Normalization Check

> Simple rule: **Every fact should be stored in one place.**

```
3 COMMON NORMALIZATION RULES (simplified):

RULE 1 — One value per column:
❌ WRONG:
User table has → phoneNumbers: "9876543210, 8765432109"
Multiple values in one column = BAD

✅ RIGHT:
Create PhoneNumber table → userId FK + phoneNumber column

RULE 2 — Non-key columns should depend only on primary key:
❌ WRONG:
Order table has → customerName, customerEmail (can also come from User table!)
Duplicate data = if user name changes → update in 2 places

✅ RIGHT:
Order table has only userId → customerName comes via JOIN

RULE 3 — Columns shouldn't depend on each other:
❌ WRONG:
Product table has → category: "Electronics", categoryDescription: "Gadgets & Devices"
categoryDescription depends on category, not on product

✅ RIGHT:
Category in separate table → Product has only categoryId FK

INTENTIONAL DENORMALIZATION (this is okay):
→ OrderItem has unitPrice snapshot — order shouldn't be affected by product price change
→ Analytics table has precomputed totals — to avoid frequent heavy queries
→ These decisions must be CONSCIOUS, not accidental
```

---

## Step 5 — Decide Indexes

```
WHAT IS AN INDEX?
→ An "index" of the table — like a book's index
→ Database can find quickly without scanning the whole table
→ Read queries fast, but write queries slightly slow (index also needs updating)

AUTOMATIC INDEXES:
→ Primary key (@id) — always indexed automatically
→ @unique fields — always indexed automatically

MANUALLY ADD (@@index) WHEN:
→ Column is frequently used in WHERE clause
→ Column is frequently used in ORDER BY
→ FK columns (Prisma does NOT auto-index FKs!)
→ Column is frequently used in JOIN

EXAMPLE — Task table:
model Task {
  id           String   @id // ← auto indexed
  status       TaskStatus
  assignedToId String   // ← FK — manually index!
  createdAt    DateTime @default(now())

  @@index([assignedToId])  // ← "My tasks" query
  @@index([status])        // ← "All pending tasks" filter
  @@index([assignedToId, status])  // ← Composite: "My pending tasks"
}

WHEN NOT TO ADD INDEX:
→ Don't index every column — WRONG
→ Small tables (< 1000 rows) — full scan is fast enough
→ Columns rarely queried
→ Boolean columns (low cardinality — only 2 values = index useless)
```

---

## Step 6 — Constraints & Validations

```
DATABASE LEVEL VALIDATION — More reliable than application!
(Application can be bypassed — database can't)

CONSTRAINTS IN PRISMA:

1. NOT NULL (default in Prisma — ? makes it nullable):
   title  String    // ← NOT NULL — required
   bio    String?   // ← NULLABLE — optional

2. UNIQUE:
   email  String  @unique
   slug   String  @unique
   @@unique([firstName, lastName])  // ← Composite unique

3. DEFAULT VALUES:
   role      Role     @default(USER)
   status    Status   @default(ACTIVE)
   createdAt DateTime @default(now())

4. ENUM (Only fixed values):
   enum TaskStatus {
     TODO
     IN_PROGRESS
     DONE
   }
   status TaskStatus @default(TODO)

5. FOREIGN KEY BEHAVIOR (ON DELETE):
   // What happens to Tasks when User is deleted?
   
   Cascade  → Tasks also deleted (risky!)
   SetNull  → assignedToId becomes null (user gone, task remains)
   Restrict → User can't be deleted while tasks exist (safe!)
   
   assignedTo User @relation(fields: [assignedToId], references: [id], onDelete: SetNull)
   createdBy  User @relation(fields: [createdById],  references: [id], onDelete: Restrict)
```

---

## Step 7 — Write Final Schema

After all these steps, write the Prisma schema. Format:

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── ENUMS ────────────────────────────────────────
enum Role {
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

// ─── MODELS ───────────────────────────────────────
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String   // hashed — never plain text!
  role      Role     @default(EMPLOYEE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  assignedTasks Task[] @relation("AssignedTasks")
  createdTasks  Task[] @relation("CreatedTasks")

  @@map("users")  // ← actual table name in DB
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
  @@index([assignedToId])
  @@index([status])
  @@index([dueDate])
  @@index([assignedToId, status])

  @@map("tasks")
}
```

---

## ✅ The Complete Pre-Code DB Checklist

```
[ ] Step 1: Entities identified? (nouns from PRD)
[ ] Step 2: Columns listed for each entity?
    [ ] Mandatory columns (id, createdAt, updatedAt)?
    [ ] Required vs nullable decided?
    [ ] Data types decided?
    [ ] Enums identified?
[ ] Step 3: Relationships mapped?
    [ ] One-to-One?
    [ ] One-to-Many? (FK on "many" side?)
    [ ] Many-to-Many? (Junction table created?)
[ ] Step 4: Normalization checked?
    [ ] No duplicate data?
    [ ] Snapshot fields intentional?
[ ] Step 5: Indexes decided?
    [ ] FK columns indexed?
    [ ] Frequently filtered columns indexed?
[ ] Step 6: Constraints set?
    [ ] Enums used for fixed values?
    [ ] onDelete behavior decided?
[ ] Step 7: Final Prisma schema written?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOW YOU CAN START WRITING CODE! 🚀
```

---

**Next →** `db-02-relationships-deep.md` — Full deep dive on relationships with tricky cases