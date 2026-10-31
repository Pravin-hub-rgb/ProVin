# 🗄️ DB Doc 2 — Relationships Deep Dive
### Tricky Cases, Self-Reference, Polymorphic, Soft Delete

---

## Recap — Three Types

```
One-to-One   (1:1)  → User ↔ UserProfile
One-to-Many  (1:N)  → User → Tasks        ← Most common
Many-to-Many (M:N)  → Student ↔ Course    ← Junction table required
```

These three were covered in Doc 1. Now we cover tricky cases.

---

## Case 1 — Self-Referential Relationship

```
What is it?
A table references itself.

Real Examples:
→ Manager → Employee   (Employee table's managerId → same Employee table)
→ Category → Subcategory (Electronics → Phones, Laptops)
→ Comment → Reply       (Comment's parentId → same Comment table)
→ Org Chart             (Hierarchy in HR system)
```

### Example — Manager-Employee (StaffSync V2)

```
Problem: Some employees are also managers of their team.
Manager is in User table. Employee is in User table.
One User has one manager (another User).
One User has many reportees (other Users).

In Prisma:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
model User {
  id         String  @id @default(cuid())
  name       String
  email      String  @unique
  managerId  String?  // ← Nullable! CEO has no manager

  // Self relation — references itself
  manager    User?   @relation("ManagerEmployee", fields: [managerId], references: [id])
  reportees  User[]  @relation("ManagerEmployee")

  @@index([managerId])
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sample Data:
┌──────────┬──────────────┬───────────┐
│ id       │ name         │ managerId │
├──────────┼──────────────┼───────────┤
│ u_001    │ Rohan (CEO)  │ NULL      │  ← No manager
│ u_002    │ Amit (VP)    │ u_001     │  ← Rohan's reportee
│ u_003    │ Priya (Lead) │ u_002     │  ← Amit's reportee
│ u_004    │ Rahul (Dev)  │ u_003     │  ← Priya's reportee
│ u_005    │ Sara (Dev)   │ u_003     │  ← Priya's reportee
└──────────┴──────────────┴───────────┘

Query — All of Priya's reportees:
const reportees = await prisma.user.findMany({
  where: { managerId: 'u_003' }
})
// Returns: Rahul, Sara

Query — Who is Rahul's manager:
const rahul = await prisma.user.findUnique({
  where: { id: 'u_004' },
  include: { manager: true }  // ← Priya
})
```

### Example — Category → Subcategory (ShopKaro)

```
model Category {
  id       String     @id @default(cuid())
  name     String
  parentId String?    // ← Null means top-level category

  parent   Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children Category[] @relation("CategoryHierarchy")
  products Product[]
}

Sample Data:
┌──────────┬──────────────┬──────────┐
│ id       │ name         │ parentId │
├──────────┼──────────────┼──────────┤
│ cat_001  │ Jewellery    │ NULL     │  ← Top level
│ cat_002  │ Necklaces    │ cat_001  │  ← Under Jewellery
│ cat_003  │ Earrings     │ cat_001  │  ← Under Jewellery
│ cat_004  │ Gold Necklace│ cat_002  │  ← Under Necklaces
│ cat_005  │ Silver Necklace│cat_002 │  ← Under Necklaces
└──────────┴──────────────┴──────────┘

Query — Direct children of Jewellery:
const subcategories = await prisma.category.findMany({
  where: { parentId: 'cat_001' }
})
// Returns: Necklaces, Earrings
```

---

## Case 2 — Multiple Relations Between Same Two Tables

```
When does this happen?
When two tables have 2 or more different relationships for different reasons.

Real Example — StaffSync:
Task has TWO relations with User:
1. assignedTo → who will do the work
2. createdBy  → who created the task

Both reference User table — but for different reasons!
```

```prisma
model User {
  id            String @id @default(cuid())
  name          String

  // TWO different relations — must be named!
  assignedTasks Task[] @relation("AssignedTasks")
  createdTasks  Task[] @relation("CreatedTasks")
}

model Task {
  id           String @id @default(cuid())
  title        String
  assignedToId String
  createdById  String

  // Named relations — same name on both sides
  assignedTo   User   @relation("AssignedTasks", fields: [assignedToId], references: [id])
  createdBy    User   @relation("CreatedTasks",  fields: [createdById],  references: [id])
}
```

```
Sample Data:
User table:
┌──────────┬────────────┬─────────┐
│ id       │ name       │ role    │
├──────────┼────────────┼─────────┤
│ u_001    │ Boss Rohan │ ADMIN   │
│ u_002    │ Dev Rahul  │ EMPLOYEE│
│ u_003    │ Dev Priya  │ EMPLOYEE│
└──────────┴────────────┴─────────┘

Task table:
┌──────────┬───────────────────┬──────────────┬─────────────┐
│ id       │ title             │ assignedToId │ createdById │
├──────────┼───────────────────┼──────────────┼─────────────┤
│ t_001    │ Fix login bug     │ u_002        │ u_001       │
│ t_002    │ Design dashboard  │ u_003        │ u_001       │
│ t_003    │ Write tests       │ u_002        │ u_003       │ ← Priya assigned to Rahul
└──────────┴───────────────────┴──────────────┴─────────────┘

Notice:
→ t_003: createdById = u_003 (Priya created the task)
  and assignedToId = u_002 (assigned to Rahul)
→ Two different columns, different purposes, same User table reference
```

---

## Case 3 — Junction Table With Extra Columns

```
When is it necessary?
When the Many-to-Many relationship itself has extra information to store
— not about either entity, but about the relationship itself.

Real Examples:
→ User ↔ Project: role in project (owner, member, viewer)
→ Student ↔ Course: enrollment date, grade, completion status
→ Product ↔ Order: quantity, unit price (snapshot!)
```

### Example — Order ↔ Product (ShopKaro)

```prisma
model Product {
  id         String      @id @default(cuid())
  name       String
  price      Decimal     @db.Decimal(10, 2)
  stock      Int         @default(0)
  orderItems OrderItem[]
}

model Order {
  id          String      @id @default(cuid())
  totalAmount Decimal     @db.Decimal(10, 2)
  status      OrderStatus @default(PENDING)
  createdAt   DateTime    @default(now())
  orderItems  OrderItem[]
}

// Junction Table — explicit with extra columns
model OrderItem {
  id          String  @id @default(cuid())
  orderId     String
  productId   String
  quantity    Int             // ← Extra: how many purchased
  unitPrice   Decimal @db.Decimal(10, 2)  // ← Extra: price at time of purchase (SNAPSHOT!)

  order       Order   @relation(fields: [orderId],   references: [id])
  product     Product @relation(fields: [productId], references: [id])

  @@unique([orderId, productId])  // ← One product per order only once
  @@index([orderId])
  @@index([productId])
}
```

```
Sample Data:
Product table:
┌──────────┬──────────────────┬────────┬───────┐
│ id       │ name             │ price  │ stock │
├──────────┼──────────────────┼────────┼───────┤
│ p_001    │ Silver Ring      │ 499.00 │ 50    │
│ p_002    │ Gold Necklace    │ 2999.00│ 10    │
│ p_003    │ Pearl Earrings   │ 799.00 │ 25    │
└──────────┴──────────────────┴────────┴───────┘

Order table:
┌──────────┬─────────────┬──────────┐
│ id       │ totalAmount │ status   │
├──────────┼─────────────┼──────────┤
│ ord_001  │ 5297.00     │ PAID     │
│ ord_002  │ 499.00      │ SHIPPED  │
└──────────┴─────────────┴──────────┘

OrderItem table (Junction):
┌──────────┬──────────┬──────────┬──────────┬───────────┐
│ id       │ orderId  │ productId│ quantity │ unitPrice │
├──────────┼──────────┼──────────┼──────────┼───────────┤
│ oi_001   │ ord_001  │ p_001    │ 1        │ 499.00    │  ← Silver Ring x1
│ oi_002   │ ord_001  │ p_002    │ 1        │ 2999.00   │  ← Gold Necklace x1
│ oi_003   │ ord_001  │ p_003    │ 2        │ 799.00    │  ← Pearl Earrings x2
│ oi_004   │ ord_002  │ p_001    │ 1        │ 499.00    │  ← Silver Ring x1
└──────────┴──────────┴──────────┴──────────┴───────────┘

ORDER TOTAL VERIFY:
ord_001: 499 + 2999 + (799 × 2) = 499 + 2999 + 1598 = 5096 ✓
(Slight diff — shipping etc. possible)

IMPORTANT — why unitPrice snapshot?
→ Today Silver Ring is 499
→ Tomorrow price becomes 599
→ ord_002's orderItem still shows 499 ← CORRECT!
→ If we took current price via productId → would show 599 → WRONG!
```

---

## Case 4 — Soft Delete Pattern

```
What is it?
Data isn't actually deleted — a flag is set.
"Deleted" rows are hidden from queries, but remain in the database.

Why use it?
→ Audit trail — know what was deleted
→ Recovery — "Undo delete" feature possible
→ Analytics — deleted data still counts in historical reports
→ Legal compliance — some industries don't allow data deletion

Why NOT use it?
→ Table size keeps growing — never cleans up
→ Must ALWAYS add deletedAt IS NULL in queries — easy to forget
→ Unique constraints get tricky (want to reuse deleted email)
```

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String
  deletedAt DateTime? // ← NULL = active, NOT NULL = deleted
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

```
Sample Data:
┌──────────┬─────────────────────┬─────────────┬──────────────────────┐
│ id       │ email               │ name        │ deletedAt            │
├──────────┼─────────────────────┼─────────────┼──────────────────────┤
│ u_001    │ rahul@example.com   │ Rahul       │ NULL                 │ ← Active
│ u_002    │ priya@example.com   │ Priya       │ NULL                 │ ← Active
│ u_003    │ amit@example.com    │ Amit        │ 2024-03-15 10:30:00  │ ← Deleted!
└──────────┴─────────────────────┴─────────────┴──────────────────────┘

Prisma queries:
// Active users only:
const activeUsers = await prisma.user.findMany({
  where: { deletedAt: null }  // ← MUST ALWAYS ADD THIS
})

// "Delete" (actually just set flag):
await prisma.user.update({
  where: { id: userId },
  data: { deletedAt: new Date() }
})

// Restore:
await prisma.user.update({
  where: { id: userId },
  data: { deletedAt: null }
})

PRO TIP: Auto-filter via Prisma middleware:
prisma.$use(async (params, next) => {
  if (params.model === 'User' && params.action === 'findMany') {
    params.args.where = { ...params.args.where, deletedAt: null }
  }
  return next(params)
})
// Now only active users come automatically!
```

---

## Case 5 — Status Machine Pattern

```
When to use?
When an entity exists in different states and transitions are defined.

Real Examples:
→ Order: PENDING → PAID → PROCESSING → SHIPPED → DELIVERED
                                                ↘ CANCELLED
→ Task: TODO → IN_PROGRESS → DONE
→ Application: APPLIED → REVIEWED → SHORTLISTED → REJECTED/HIRED
→ Post: DRAFT → REVIEW → PUBLISHED → ARCHIVED
```

```prisma
enum OrderStatus {
  PENDING     // Order created, no payment
  PAID        // Payment successful
  PROCESSING  // Being packed in warehouse
  SHIPPED     // Given to courier
  DELIVERED   // Reached customer
  CANCELLED   // Cancelled
  REFUNDED    // Refund processed
}

model Order {
  id        String      @id @default(cuid())
  status    OrderStatus @default(PENDING)
  // ...
  
  // Status history tracking (optional but powerful):
  statusHistory OrderStatusHistory[]
}

// Audit trail — what status when
model OrderStatusHistory {
  id         String      @id @default(cuid())
  orderId    String
  fromStatus OrderStatus?  // Previous status (null for initial)
  toStatus   OrderStatus   // New status
  changedBy  String?       // Who changed it (userId)
  note       String?       // Optional reason
  createdAt  DateTime      @default(now())

  order     Order @relation(fields: [orderId], references: [id])

  @@index([orderId])
}
```

```
Sample Data — OrderStatusHistory:
┌────────┬──────────┬────────────┬──────────────┬──────────┬─────────────────────┐
│ id     │ orderId  │ fromStatus │ toStatus     │changedBy │ createdAt           │
├────────┼──────────┼────────────┼──────────────┼──────────┼─────────────────────┤
│ h_001  │ ord_001  │ NULL       │ PENDING      │ system   │ 2024-03-01 10:00    │
│ h_002  │ ord_001  │ PENDING    │ PAID         │ system   │ 2024-03-01 10:05    │
│ h_003  │ ord_001  │ PAID       │ PROCESSING   │ u_admin  │ 2024-03-01 11:00    │
│ h_004  │ ord_001  │ PROCESSING │ SHIPPED      │ u_admin  │ 2024-03-02 09:00    │
│ h_005  │ ord_001  │ SHIPPED    │ DELIVERED    │ system   │ 2024-03-04 14:30    │
└────────┴──────────┴────────────┴──────────────┴──────────┴─────────────────────┘

This shows:
→ How long order took to process
→ Who changed what
→ Proof in case of customer dispute
```

---

## Case 6 — Polymorphic Relationship (Advanced)

```
What is it?
One table can reference multiple different tables.

Real Example:
→ Comment can be on Post, Video, or Product.
→ User can like any entity.
→ Notification can be about any event.
```

```
APPROACH A — Multiple FK columns (Simple, recommended for small cases):

model Comment {
  id        String  @id @default(cuid())
  text      String
  authorId  String

  // Only one will be populated, others null
  postId    String?
  videoId   String?
  productId String?

  post      Post?    @relation(fields: [postId],    references: [id])
  video     Video?   @relation(fields: [videoId],   references: [id])
  product   Product? @relation(fields: [productId], references: [id])
}

Problem: Need to add new column for every new entity.
```

```prisma
// APPROACH B — Type + targetId (Flexible, but no FK constraint):
model Comment {
  id           String      @id @default(cuid())
  text         String
  authorId     String
  targetType   String      // "POST" | "VIDEO" | "PRODUCT"
  targetId     String      // Whatever entity's id

  author       User        @relation(fields: [authorId], references: [id])

  // NOTE: No foreign key constraint on targetId
  // Must ensure integrity at application level
  @@index([targetType, targetId])  // ← For fetching comments
}
```

```
Sample Data (Approach B):
┌──────────┬──────────────────┬────────────┬──────────┐
│ id       │ text             │ targetType │ targetId │
├──────────┼──────────────────┼────────────┼──────────┤
│ c_001    │ "Great post!"    │ POST       │ post_123 │
│ c_002    │ "Amazing video"  │ VIDEO      │ vid_456  │
│ c_003    │ "Love this ring" │ PRODUCT    │ prod_789 │
│ c_004    │ "Helpful post"   │ POST       │ post_123 │
└──────────┴──────────────────┴────────────┴──────────┘

Query — All comments of a Post:
const comments = await prisma.comment.findMany({
  where: {
    targetType: "POST",
    targetId: "post_123"
  }
})
// Returns: c_001, c_004
```

---

## 🎯 Relationship Decision Guide

```
QUESTION: Which relationship type to use?

1. "Will A have only one B, and B have only one A?"
   → One-to-One
   → Put FK on "optional" side with @unique

2. "Will A have many B's, but B have only one A?"
   → One-to-Many (most common!)
   → Put FK on "many" (B) side

3. "Will A have many B's AND B have many A's?"
   → Many-to-Many
   → Create junction table

4. "Does the relationship itself have extra data to store?"
   → Explicit junction table (with extra columns)
   → Avoid implicit Prisma junction in this case

5. "Does a table reference itself?"
   → Self-referential
   → managerId? (nullable FK → same table)

6. "Can one thing reference multiple different tables?"
   → Polymorphic
   → Multiple nullable FKs (simple) or targetType + targetId (flexible)
```

---

**Next →** `db-03-indexes-performance.md` — Full deep dive on indexes, composite indexes, EXPLAIN ANALYZE