# DBMS — Interview Prep (Deep Dive)

> Target: Full-stack developer roles, Gurgaon, 5–30 LPA range
> Context: You already use Postgres/Supabase + Prisma in DukaanOS — wherever possible, use that schema as the example instead of cramming. Connect concepts to your actual work.

---

## 1. Basics — DBMS vs RDBMS

**DBMS**: Any software that stores/manages data (can be in files too — like MS Access).

**RDBMS**: Stores data in **tables** (rows + columns), and can define **relationships** between tables (via foreign keys). Postgres, MySQL, SQL Server — all are RDBMS.

**Key difference asked in interviews**: In RDBMS, data is **normalized** and follows **ACID** properties. Plain DBMS doesn't guarantee that.

### Keys (very common question)

| Key | Meaning |
|---|---|
| **Primary Key** | Uniquely identifies every row in a table. Cannot be null. |
| **Foreign Key** | A column in one table that references the primary key of another table — creates a relationship. |
| **Candidate Key** | Columns that could have been the primary key (unique + not null) but weren't. |
| **Composite Key** | Two or more columns together form the primary key (when a single column isn't unique). |

**Think of the DukaanOS example**: `products` table has `product_id` as primary key. `orders` table has `product_id` as foreign key referencing `products.product_id`.

**Interview tip**: When the interviewer says "explain keys," don't just give definitions — give a small example (like the one above). This shows "I understand" vs "I crammed it."

---

## 2. Normalization (Most asked)

**Why do it?** To remove data duplication (redundancy), and to avoid update/insert/delete anomalies.

**What an anomaly means**: If a customer's name repeats in 5 places in a table, and their name changes, you have to update all 5 places — miss one and data becomes inconsistent. Normalization prevents this.

### 1NF (First Normal Form)
- Every column must hold **atomic** (single, indivisible) values.
- No repeating groups.

❌ Bad: `phone_numbers` column with `"9876543210, 9998887776"` (comma-separated)
✅ Good: Separate `customer_phones` table, one row per phone number.

### 2NF (Second Normal Form)
- First, follow 1NF.
- **No partial dependency** — if there's a composite primary key (like `order_id + product_id`), every non-key column must depend on the **entire** composite key, not just one part.

❌ Bad: `order_items` table has composite key `(order_id, product_id)`, but `product_name` depends only on `product_id` — that's a partial dependency.
✅ Fix: Keep `product_name` in the `products` table, only keep `product_id` reference in `order_items`.

### 3NF (Third Normal Form)
- First, follow 2NF.
- **No transitive dependency** — a non-key column must not depend on another non-key column.

❌ Bad: `orders` table has `customer_id`, `customer_city`, `customer_pincode` — here `customer_city` depends on `customer_pincode` (transitive), not directly on `customer_id`.
✅ Fix: Keep customer details in a separate `customers` table.

### BCNF (Boyce-Codd Normal Form)
- Stricter version of 3NF — handles edge cases when a table has **multiple overlapping candidate keys**.
- In interviews, just say "stricter than 3NF, for rare edge cases" — deep dive not needed for full-stack roles.

**Practical exercise**: Open your DukaanOS Prisma schema and ask yourself — "is there any repeated/derivable data in any table that should be in a separate table?" This teaches real normalization thinking, not memorization.

**Common interview question**: *"When do you denormalize?"* — Answer: When read performance is critical and joins are getting too expensive (like analytics dashboards, reporting), you intentionally allow some duplication for speed. Trade-off: fast reads, slightly complex writes/updates.

---

## 3. Joins (Asked in every interview — also practical)

Two tables: `customers` (customer_id, name) and `orders` (order_id, customer_id, amount).

| Join Type | What it does |
|---|---|
| **INNER JOIN** | Only rows that match in both tables. |
| **LEFT JOIN** | All rows from the left table; data from the right if match found, else NULL. |
| **RIGHT JOIN** | Opposite of LEFT — all rows from the right table. |
| **FULL OUTER JOIN** | All rows from both tables, match or not. |
| **SELF JOIN** | A table joined with itself (like employee-manager hierarchy, where manager_id is also an employee_id). |

```sql
-- Example: Every customer with their orders (if any)
SELECT customers.name, orders.amount
FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id;
```

**Common gotcha question**: *"What happens in a LEFT JOIN if a customer has no orders?"* — `orders.amount` comes as NULL, but the customer's row still shows up.

**DukaanOS angle**: When you want "show all products whether in stock or not" — that's the classic LEFT JOIN use case (`products` LEFT JOIN `inventory`).

---

## 4. Indexing

**What it is**: A data structure (mostly B-Tree) that makes lookups on specific columns fast — without an index, the database has to check **every row** (full table scan), with an index it can jump directly.

**Why it's fast (intuition, no deep math)**: Think of a phone book — if names are sorted alphabetically (the index), finding "Sharma" is fast. If names are in random order, you'd have to check every name.

**When to use**:
- Columns frequently used in `WHERE`, `JOIN`, or `ORDER BY`.
- Generally, index foreign keys.

**When NOT to use** (asked in interviews, shows understanding):
- Small tables (index overhead can exceed the benefit).
- Columns updated frequently — because every INSERT/UPDATE has to update the index too, which **slows down writes**.
- **Trade-off to remember**: Index speeds up reads, but slows down writes (insert/update/delete).

**DukaanOS example**: The `products` table would have an index on `barcode` (because voice billing looks up by barcode often) — fast lookup needed.

---

## 5. Transactions + ACID

**Transaction**: A group of one or more database operations treated as **one unit** — either all complete, or none (all-or-nothing).

**Real example**: Bank transfer — deduct from account A and add to account B. If A is deducted but the system crashes while adding to B — money disappears! A transaction prevents this: both steps commit together, or both roll back.

### ACID

| Property | Meaning |
|---|---|
| **Atomicity** | All steps complete, or none. No partial execution. |
| **Consistency** | Database stays in a valid state before and after the transaction (rules/constraints followed). |
| **Isolation** | Two transactions running simultaneously won't interfere with each other. |
| **Durability** | Once committed, it's permanent — even if the system crashes, data is safe. |

**DukaanOS example**: When a sale happens — inventory count decreases and a sales record is created — these must happen in one transaction. If inventory updated but sales record failed, data becomes inconsistent.

```sql
BEGIN TRANSACTION;
UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 101;
INSERT INTO sales (product_id, amount) VALUES (101, 50);
COMMIT;
```

### Isolation Levels (basic understanding, not deep)
| Level | What it prevents |
|---|---|
| **Read Uncommitted** | Nothing — dirty reads possible (uncommitted data from another transaction can be seen). |
| **Read Committed** | Only committed data visible (Postgres default). |
| **Repeatable Read** | Same query in same transaction returns same result. |
| **Serializable** | Strictest — transactions treated as if running sequentially. |

**Interview tip**: If deep isolation level questions come up, "Postgres default is Read Committed, and for stricter isolation we use Serializable, but there's a performance trade-off" — that's enough for full-stack roles.

---

## 6. SQL vs NoSQL

| | SQL (Postgres, MySQL) | NoSQL (MongoDB, DynamoDB) |
|---|---|---|
| Structure | Fixed schema (tables, columns) | Flexible schema (documents, key-value) |
| Relationships | Strong (joins, foreign keys) | Weak/manual (embed or reference) |
| Best for | Structured data, complex queries, transactions | Rapidly changing schema, huge scale, simple queries |
| Scaling | Vertically (mostly) | Horizontally (easily) |

**When which**: If data is structured with important relationships (like DukaanOS inventory-orders-customers) — SQL is better. If schema changes often or data is highly unstructured (logs, user activity feed) — NoSQL is better.

**Honest answer in interviews**: "My use case (kirana POS) is structured — clear relationships between inventory, orders, customers, so I chose Postgres" — this shows real reasoning, not a textbook answer.

---

## Quick Revision Checklist (before interview)

- [ ] Primary key, Foreign key, Composite key — difference + example
- [ ] 1NF, 2NF, 3NF — explain each in one line + example
- [ ] Why denormalization
- [ ] 4 types of joins + when each
- [ ] What an index is, why it's fast, when NOT to use it
- [ ] ACID 4 letters + real example (bank transfer or your DukaanOS sale flow)
- [ ] Isolation levels — just names + one-liner
- [ ] SQL vs NoSQL — justify with your use case

---

## Practice Approach

1. After reading each topic, open your DukaanOS schema (Prisma) and think — "how does this concept apply here?"
2. Google "DBMS interview questions for full stack developer" — you'll find 15-20 common questions; practice answering them in your own words (both spoken and written).
3. When confident, tell me — we can do a mock Q&A round in this same format.

**Next subject when ready**: OOP, then CN, then OS — same depth.