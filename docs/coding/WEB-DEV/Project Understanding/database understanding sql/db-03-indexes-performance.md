# 🗄️ DB Doc 3 — Indexes & Performance
### When to Add, When Not, Composite Indexes, Real Query Patterns

---

## What is an Index — Simple Explanation

```
Book analogy:
→ There's a 500-page book — "about database design"
→ You want to find "normalization"
→ Option A: Read every page — page 1, 2, 3... 500
             → Slow! O(n) — full table scan
→ Option B: Check the index at the end of the book — "Normalization: Page 234"
             → Fast! O(log n) — direct jump

Database index does exactly this.
```

```
Technical reality:
→ Index is a separate B-Tree data structure
→ Column values stored in sorted order
→ Database can quickly "jump" to relevant rows
→ Without index → Sequential Scan (every row checked)
→ With index → Index Scan (only relevant rows)

COST:
→ Read queries become FAST with index ✅
→ Write queries (INSERT/UPDATE/DELETE) become SLOW ❌
   (because index also needs updating)
→ Extra storage space ❌

THIS IS A TRADEOFF — don't blindly add index everywhere!
```

---

## Automatic Indexes (In Prisma)

```
These are automatically indexed — you don't need to do anything:

1. @id → Primary key — always indexed
2. @unique → Unique constraint — automatically indexed

model User {
  id    String @id @default(cuid())  // ← AUTO indexed
  email String @unique               // ← AUTO indexed
  name  String                       // ← NOT indexed
}
```

---

## When to Manually Add Index

### Rule 1 — FK Columns (Almost Always!)

```
Prisma does NOT automatically index FK columns.
But queries on FKs are very frequent.

model Task {
  assignedToId String  // ← FK — Prisma doesn't index this!

  @@index([assignedToId])  // ← Add manually!
}

Why is it necessary?
Query: "Give me all of Rahul's tasks"
→ WHERE assignedToId = 'u_rahul'
→ Without index: Full table scan — 10,000 tasks all checked
→ With index: Direct jump — only Rahul's tasks
```

### Rule 2 — Columns Frequently Used in WHERE Clause

```
Think of your app's common queries:

"Show active tasks"        → WHERE status = 'TODO'        → index on status
"Due today tasks"          → WHERE dueDate = today        → index on dueDate
"North region sales"       → WHERE region = 'north'       → index on region
"Published posts"          → WHERE published = true       → index on published
"Last 30 days orders"     → WHERE createdAt >= 30dAgo    → index on createdAt

model Task {
  status   TaskStatus
  dueDate  DateTime?

  @@index([status])
  @@index([dueDate])
}
```

### Rule 3 — ORDER BY Columns

```
"Show latest orders first"    → ORDER BY createdAt DESC
"Show cheapest first"         → ORDER BY price ASC

If you frequently sort on a column → add index.

model Order {
  createdAt DateTime @default(now())

  @@index([createdAt])  // ← Sorting becomes fast
}
```

---

## Composite Index — Multiple Columns Together

```
When to use?
When two or more columns are filtered together in a query.

Common Example:
"Give me Rahul's TODO tasks"
→ WHERE assignedToId = 'u_rahul' AND status = 'TODO'

Two separate indexes:
→ @@index([assignedToId])  → Rahul's tasks (many)
→ @@index([status])        → TODO tasks (many)
Database intersects both results — still works

ONE composite index:
→ @@index([assignedToId, status])
→ Direct: Rahul's TODO tasks → instant!
```

```
COLUMN ORDER MATTERS IN COMPOSITE INDEX!

@@index([assignedToId, status])

This index will work for:
✅ WHERE assignedToId = X                      (first column)
✅ WHERE assignedToId = X AND status = Y       (both columns)
❌ WHERE status = Y                            (only second column — WON'T use this index)

Rule: Left-most prefix rule
→ The leftmost column must be present in query for index to be used
→ Put most selective column first (the one with more unique values)
```

```prisma
model Task {
  id           String     @id @default(cuid())
  title        String
  status       TaskStatus @default(TODO)
  priority     Priority   @default(MEDIUM)
  dueDate      DateTime?
  assignedToId String
  createdById  String
  createdAt    DateTime   @default(now())

  // Single column indexes:
  @@index([assignedToId])        // "My tasks"
  @@index([status])              // "All TODO tasks"
  @@index([dueDate])             // "Due today tasks"
  @@index([createdAt])           // "Latest tasks" sorting

  // Composite indexes (for specific query patterns):
  @@index([assignedToId, status])   // "My TODO tasks"
  @@index([assignedToId, dueDate])  // "My tasks sorted by deadline"
}
```

---

## Real Query Patterns — Examples from 5 Projects

### StaffSync (Task Manager)

```
Frequent queries:
1. "Employee views their tasks" → assignedToId
2. "Admin filters by status" → status
3. "Overdue tasks" → dueDate < today
4. "Rahul's pending tasks" → assignedToId + status (composite!)

model Task {
  @@index([assignedToId])
  @@index([status])
  @@index([dueDate])
  @@index([assignedToId, status])  // Most important composite
}
```

### HireHop (Job Board)

```
Frequent queries:
1. "Show active jobs" → status = ACTIVE
2. "Remote jobs" → jobType = REMOTE
3. "Search by title" → Full-text search (special index)
4. "Employer's jobs" → employerId
5. "Seeker's applications" → seekerId

model Job {
  @@index([employerId])
  @@index([status])
  @@index([jobType])
  @@index([status, jobType])  // "Active remote jobs"
  // Full-text search needs special setup (PostgreSQL tsvector)
}

model Application {
  @@index([jobId])      // "All applications for this job"
  @@index([seekerId])   // "My applications"
  @@index([jobId, seekerId])  // Duplicate check (+ @@unique)
}
```

### ShopKaro (E-Commerce)

```
Frequent queries:
1. "Products in category" → categoryId
2. "Active products" → status = ACTIVE
3. "Sort by price" → price (ORDER BY)
4. "Customer's orders" → customerId (if user accounts)
5. "Order items" → orderId

model Product {
  @@index([categoryId])
  @@index([status])
  @@index([price])               // Sorting
  @@index([status, categoryId])  // "Active jewellery"
}

model Order {
  @@index([customerEmail])  // Customer order history
  @@index([status])         // "Pending orders" admin view
  @@index([createdAt])      // Latest orders first
}

model OrderItem {
  @@index([orderId])    // Fetch order's items
  @@index([productId])  // How many times product ordered (analytics)
}
```

### DataLens (Analytics Dashboard)

```
Analytics queries are MOST heavy — indexes are CRITICAL here.

Frequent queries:
1. "Last 30 days sales" → saleDate range
2. "Region-wise sales" → region
3. "Salesperson performance" → salespersonId
4. "Product-wise revenue" → productId

model Sale {
  @@index([saleDate])                    // Date range queries
  @@index([region])                      // Region filter
  @@index([salespersonId])               // Per-person
  @@index([productId])                   // Per-product
  @@index([saleDate, region])            // "North region last month"
  @@index([saleDate, salespersonId])     // "Rahul last quarter"
}

IMPORTANT NOTE FOR ANALYTICS:
If table is very large (millions of rows):
→ Regular indexes won't be enough
→ Consider Materialized Views (precomputed aggregations)
→ Consider partitioning (data by year/month)
→ Or dedicated analytics DB (ClickHouse, BigQuery)
```

---

## When NOT to Add Index

```
❌ AVOID INDEX WHEN:

1. Table is small (< 1000 rows):
   → Full scan is so fast that index overhead is more
   → Users table of a small app — index is overkill

2. Column has very few unique values (Low Cardinality):
   → Boolean column (true/false) — index useless
   → Gender column (3-4 values) — poor selectivity
   → Exception: If one value is very rare ("isAdmin = true" — only 2 admins)

3. Column is rarely queried:
   → Internal notes field only admin sees occasionally
   → Index maintenance hurts write performance

4. Index on every column:
   → ❌ WRONG approach
   → Every write (INSERT/UPDATE/DELETE) becomes SLOW
   → Storage grows a lot
   → Database optimizer can get confused

SIMPLE RULE:
"Start without index first. Add index when queries are slow."
Avoid premature optimization.
```

---

## How to Check Index (EXPLAIN)

```sql
-- Check query plan in PostgreSQL:
EXPLAIN ANALYZE
SELECT * FROM tasks
WHERE "assignedToId" = 'u_rahul'
AND status = 'TODO';

-- Look in output:
-- "Seq Scan" → Full table scan — index not being used ❌
-- "Index Scan" → Index is being used ✅
-- "Bitmap Heap Scan" → Index used, multiple rows ✅

-- Run raw SQL via Prisma:
const result = await prisma.$queryRaw`
  EXPLAIN ANALYZE
  SELECT * FROM tasks
  WHERE "assignedToId" = ${userId}
  AND status = 'TODO'
`
```

---

## Summary — Index Checklist

```
FOR EVERY TABLE, THINK ABOUT:

[ ] FK columns indexed? (Prisma doesn't auto-index)
[ ] Frequently WHERE-used columns indexed?
[ ] ORDER BY columns indexed?
[ ] Composite indexes for common query patterns?
[ ] No unnecessary index on boolean / low cardinality columns?
[ ] No unnecessary index on very small tables?

REMEMBER:
→ Read fast = write slow (tradeoff)
→ Start without index first
→ When slow query found → add index
→ Verify with EXPLAIN ANALYZE
```

---

**Next →** `db-04-naming-migrations.md` — Naming conventions, migrations, seeding, common mistakes