# Backend Course Roadmap, Part 3 of 6

Batch 3 (PostgreSQL and SQL by hand) and Batch 4 (Prisma and the real CRUD app) · Prepared November 26, 2026 for Pravin

The rules, tags, stack and versions are in Part 1. The building agent must read Part 1 first and obey it. This part adds only Batches 3 and 4.

## Why these two batches come together

After Batch 2B his Bookmarks API works, but every restart wipes the data. These two batches fix that in the right order: first he learns the database by hand in plain SQL (Batch 3), then he meets the ORM (Batch 4) and sees it as a convenience over something he already understands, not as magic. At the end of Batch 4 he has a database-backed CRUD API. That is his first resume-ready project.

**Decision already made:** PostgreSQL, not MongoDB. If an interviewer asks why, the answer he should be able to give is: relational data, real transactions and constraints, exact decimals, and it is what most teams hiring for this role use.

## Batch 3: PostgreSQL and SQL by Hand (size M)

**Goal.** Design a schema and answer real questions with SQL before any ORM exists.

**Why now.** The in-memory API loses data on restart. He must understand tables, constraints and queries first, so that the ORM in Batch 4 is a convenience and not a black box.

**Prerequisites.** Batch 2B.

**History note (read-only).** Why relational databases won for business data, what "NoSQL" was a reaction to, and why Postgres in particular became the default choice (a short, honest account of the trade-offs, including when a document database is a fair choice). One paragraph on how SQL has stayed stable for fifty years while the tools around it changed.

### Lessons, each with a mini-project

**3.1 Why a database and the relational model (TAUGHT).** Why files and in-memory maps are not enough (durability, concurrent access, querying). Tables, rows, columns, primary keys, foreign keys. *Mini-project:* model a class roster (students, classes, enrollments) on paper.

**3.2 Running PostgreSQL and connecting (TAUGHT).** PostgreSQL 18 started with a given copy-this Docker command or Compose file (USED, taught in Batch 10; a native installer is the fallback). Connect with `psql` and a GUI client. *Mini-project:* create a database and list its tables.

**3.3 Data types (TAUGHT).** `text`, `integer`, `bigint`, `numeric`, `boolean`, `timestamptz`, `uuid`, `jsonb`, enums. Why never `float` for money, why `timestamptz` and not `timestamp`. *Break it on purpose:* store the same value in `float`, `numeric` and `text` and compare the arithmetic. *Mini-project:* the type-comparison table.

**3.4 `CREATE TABLE` and constraints (TAUGHT).** `PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`, `FOREIGN KEY`. The idea that the database should refuse bad data even if the application forgets to. *Break it on purpose:* violate each constraint and read the error. *Mini-project:* a `bookmarks` table with sensible constraints (this schema carries into Batch 4).

**3.5 CRUD in SQL (TAUGHT).** `INSERT`, `SELECT`, `UPDATE`, `DELETE`, `WHERE`, `ORDER BY`, `LIMIT`, `OFFSET`. Stress the safe habit: write the `WHERE` first. *Mini-project:* run the complete CRUD cycle on one table entirely in SQL, including `RETURNING`.

**3.6 Filtering and `NULL` (TAUGHT).** `AND`, `OR`, `IN`, `BETWEEN`, `LIKE`, `ILIKE`, and how `NULL` behaves (it is not equal to anything, not even itself). *Mini-project:* predict ten query results involving `NULL`s, then run them and check.

**3.7 Aggregates (TAUGHT).** `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`, `HAVING`, and the difference between `WHERE` and `HAVING`. *Mini-project:* a per-month summary report.

**3.8 Relationships (TAUGHT).** One-to-many, many-to-many through a join table, one-to-one. Diagram each. *Mini-project:* model books and authors.

**3.9 Joins (TAUGHT).** `INNER JOIN`, `LEFT JOIN`, self joins, and why `RIGHT` and `FULL` are rare. Venn-style diagrams used with care (they mislead for some joins, so also show real rows). *Mini-project:* find members who never borrowed anything.

**3.10 Subqueries, CTEs and `UNION` (TAUGHT).** The `WITH` clause as a way to name steps. *Mini-project:* rewrite a nested query as a CTE.

**3.11 Window functions (TAUGHT).** `ROW_NUMBER`, `RANK`, running totals with `OVER`. *Mini-project:* rank the most borrowed books per genre.

**3.12 Indexes (TAUGHT).** B-tree, when an index helps, composite and unique indexes, the cost on writes, `EXPLAIN` and `EXPLAIN ANALYZE`. Foreign keys are not indexed automatically in Postgres. *Break it on purpose:* make a slow query on a large seeded table, read the plan, add an index, read the plan again. *Mini-project:* the before and after plans with a one-paragraph explanation.

**3.13 Normalization (TAUGHT).** Up to third normal form in plain words, and when it is fine to denormalize. *Mini-project:* fix a deliberately badly designed table.

**3.14 Transactions, first look (TAUGHT, deepened in Batch 11).** `BEGIN`, `COMMIT`, `ROLLBACK`, ACID in plain words. *Mini-project:* roll back a half-finished money transfer by hand and show the balances are unchanged.

**3.15 Migrations by hand (TAUGHT).** Numbered SQL files run in order, and why schema changes must be recorded like code. This is the manual version of what Prisma Migrate does in Batch 4. *Mini-project:* evolve a schema across three migration files.

**3.16 SQL from Node with `pg` (TAUGHT).** The `pg` driver, `Pool`, parameterized queries (`$1`), and a live SQL injection demo. *Break it on purpose:* an injection attempt that succeeds against string concatenation and fails against parameters. *Mini-project:* a Node script with a parameterized search and a failed injection attempt.

**3.17 Connection pooling (TAUGHT).** Why a server reuses connections instead of opening one per request. *Mini-project:* compare per-request connections with a pool under a simple load script.

### Used, not taught here

- `docker run` or a given Compose file to start Postgres. Taught properly in Batch 10.
- A GUI client (DBeaver or pgAdmin). Shown, not taught.

### Preview

- ORMs and Prisma (Batch 4), row locking (Batch 11). Full-text search is not covered in this course.

### Combined project: Library Database, SQL only (PRJ3)

A complete lending-library database built in SQL files, with one small Node script at the end.

- **Schema:** members, authors, books, `book_authors` (many-to-many), copies, loans, fines. Foreign keys, checks, defaults, and enums or lookup tables where they fit.
- **Integrity:** a partial unique index so one physical copy cannot be on two active loans at once. The database itself must reject the double loan.
- **Migrations:** three numbered migration files and a seed script generating a few thousand rows.
- **Questions:** twenty questions answered in SQL, covering joins, aggregates, CTEs and a window function. Includes an overdue-loans report and a most-borrowed-per-genre ranking.
- **Performance:** two slow queries fixed with indexes, shown with `EXPLAIN ANALYZE` before and after.
- **Node:** a script using `pg` that runs a parameterized search and a failed injection attempt.

**Done when.** Every question returns correct rows against the seed data, the double-loan case is rejected by the database, and he can read an `EXPLAIN` plan and say whether it uses an index.

### Checkpoint

- Design a normalized schema for a small app on paper, then write it as SQL.
- Write a three-table join with a filter and a grouping from memory.
- Explain when an index helps and when it hurts.
- Explain what a transaction guarantees.
- Explain why string-built SQL is dangerous and what fixes it.

### Common traps

- Comparing with `= NULL` instead of `IS NULL`.
- Using `float` for money, or `timestamp` without a time zone.
- Missing indexes on foreign keys, which makes joins slow.
- `OFFSET` pagination over very large tables.
- Forgetting `WHERE` on an `UPDATE` or `DELETE`.
- Building SQL by concatenating user input.

### Interview questions

- Inner join versus left join.
- What is an index and what does it cost?
- What is normalization?
- What does ACID stand for?
- What is SQL injection and how is it prevented?
- Why PostgreSQL over MongoDB for this kind of app?

### Git milestone

Tag `batch-3-complete`.

## Batch 4: Prisma and the Real CRUD App (size L)

**Goal.** Replace the in-memory store of Bookmarks API v1 with PostgreSQL through Prisma, and understand each thing Prisma does by comparing it with the SQL he already wrote.

**Why now.** This is the batch that produces his first resume-ready project: a RESTful API backed by a real relational database. He has already felt the manual version (Batch 3), so now the ORM is the "better tool".

**Prerequisites.** Batches 2B and 3.

**Version note.** Prisma 7 pinned as `prisma@7`. Prisma 8 was a release candidate on the check date. The agent must check whether 8 is generally available at build time and re-verify every Prisma detail against official docs, because Prisma 7 changed how configuration, client generation and database drivers are set up compared with older tutorials. Out-of-date tutorials are the biggest risk in this batch. The concepts below (schema, migrations, client, transactions) transfer across versions.

**History note (read-only).** What problem ORMs solve (mapping rows to objects, repeated boilerplate), what problems they cause (hidden queries, the N+1 trap), where Prisma sits among options (raw SQL, query builders, Drizzle, TypeORM), and why this course picks Prisma: readable schema, strong typing, excellent migrations. One PREVIEW line that Drizzle is a SQL-closer alternative he has already touched.

### Lessons, each with a mini-project

**4.1 Feel the pain first (TAUGHT).** Take the Batch 3 `pg` script and the Bookmarks table. Write list, create and update functions by hand: map rows to objects, build dynamic `WHERE` clauses for filters, handle the optional fields. He writes down what was repetitive or fragile. *Mini-project:* a hand-written `bookmarks` data module with five functions.

**4.2 Prisma setup (TAUGHT).** What Prisma is (a schema file, a migration tool and a generated typed client). Install from the official docs, initialize, connect to the Postgres he already runs. One new tool name only. *Mini-project:* connect and run one query.

**4.3 The schema (TAUGHT).** `datasource`, generator, `model`, field types and how they map to Postgres types, `@id`, `@default`, `@unique`, `@updatedAt`, enums. Compare each line with the `CREATE TABLE` he wrote in 3.4. *Mini-project:* the `Bookmark` model.

**4.4 Migrations (TAUGHT).** `prisma migrate dev` versus `prisma migrate deploy`, the migrations folder (readable SQL), what the migrations table records, and what to do when the schema and database drift. Compare with 3.15 by hand. *Break it on purpose:* edit a model, generate the migration, read the SQL it wrote. *Mini-project:* add a `note` column through a migration.

**4.5 The Prisma Client: CRUD (TAUGHT).** `create`, `findUnique`, `findMany`, `update`, `delete`, and how the generated types follow the schema. Show the equivalent SQL for each call (enable query logging). *Mini-project:* a script performing the full CRUD cycle.

**4.6 Filtering, sorting and pagination (TAUGHT).** `where` with operators, `orderBy`, `take` and `skip`, `select` versus `include`. Reproduce the 2B.6 list endpoint behavior. Note cursor pagination as a PREVIEW line. *Mini-project:* the list query behind `GET /bookmarks`.

**4.7 Relations (TAUGHT).** One-to-many and many-to-many in the schema (`Bookmark` and `Tag`), nested writes (`connect`, `connectOrCreate`), reading relations with `include`. Show the N+1 trap with query logging, then fix it. *Mini-project:* add tags to bookmarks with a many-to-many relation.

**4.8 Errors from the database (TAUGHT).** Prisma's known error codes (a unique violation, a record not found) and how to map each to an HTTP status through the error handler from 2A.8: unique violation to 409, missing record to 404. *Break it on purpose:* create a duplicate and read the raw error. *Mini-project:* a small error-mapping module.

**4.9 Transactions, first look with Prisma (TAUGHT, deepened in Batch 11).** `$transaction` for several writes that must succeed or fail together. Compare with the manual `BEGIN` and `COMMIT` from 3.14. *Mini-project:* create a bookmark and its tags atomically.

**4.10 Seeding and the escape hatch (TAUGHT).** A seed script for development data. `$queryRaw` for the queries an ORM cannot express nicely, and why parameters still matter there. *Mini-project:* a seed script and one raw report query.

**4.11 Inspecting and debugging (TAUGHT).** Prisma Studio, query logging, reading generated SQL, running `EXPLAIN` on a slow Prisma query. *Mini-project:* find and fix a deliberately slow query.

**4.12 Prisma versus raw SQL (REVISITED).** A written comparison, in his words: what Prisma saved, what it hid, when he would still write SQL. This is the interview answer to "why use an ORM?". *Mini-project:* the comparison document.

### Used, not taught here

- Docker Compose to run Postgres. Provided, taught in Batch 10.
- Environment variables for the database URL. Already taught in Batch 1.8.
- Validation. Still hand-written until Batch 5.

### Preview

- Zod and layered structure (Batch 5), users and authentication (Batch 6), testing against a real database (Batch 8), transactions in depth (Batch 11). One sentence each.

### Combined project: Bookmarks API v2 on PostgreSQL (PRJ4)

The upgrade of PRJ2B. Same endpoints and behavior, real database underneath. It is his first resume-ready project.

- **Models:** `Bookmark` (id, url, title, optional note, createdAt, updatedAt) and `Tag` (id, name), connected many-to-many. The `url` is unique.
- **Endpoints:** everything from v1 (`POST`, `GET` list with `tag`, `q`, `limit`, `page` and sorting, `GET` by id, `PUT`, `PATCH`, `DELETE`), plus `GET /tags`. Same status codes, same error shape.
- **Database behavior:** unique URL becomes 409 through the error mapping from 4.8, missing id becomes 404, tag creation and bookmark creation happen in one transaction.
- **Plumbing kept from Batch 2:** logger, request id, error handler, CORS, `app.ts` and `server.ts`.
- **Data engineering:** migrations committed, a seed script, `.env.example`, a README with setup steps that work from a clean clone.
- **Proof:** restarting the server no longer loses data, and the React app from his roadmap still works against the new API without changes.
- **Write-up:** a short section in the README explaining the schema and why it is shaped that way, ready for an interview.

**Done when.** A stranger can clone the repository, follow the README, and have the API running against a fresh database. Data survives restarts. He can explain each Prisma call in terms of the SQL it generates.

### Checkpoint

- Define a Prisma schema for a small app and migrate it.
- Do full CRUD with the Prisma Client.
- Query a many-to-many relationship and avoid the N+1 trap.
- Map a database error to the right HTTP status.
- Explain what a migration is and why it is committed to Git.
- Explain, in his own words, when he would use an ORM and when raw SQL.

### Common traps

- Following an old tutorial that does not match Prisma 7.
- Editing the database by hand instead of through a migration.
- Forgetting to regenerate or reapply after a schema change.
- Returning unfiltered database objects directly to clients.
- N+1 queries from looping and calling the client inside the loop.
- Committing the `.env` file with the database URL.

### Interview questions

- What does an ORM give you and what does it cost?
- What is a migration, and why do we keep them in Git?
- What is the N+1 problem and how do you fix it?
- How do you model a many-to-many relationship?
- How would you handle a unique constraint violation in an API?
- Prisma versus raw SQL versus a query builder?

### Git milestone

Tag `batch-4-complete`. This is the repository to pin on his profile. Keep the commit history clean and write the README as if a recruiter will read it.

## Next

Part 4 covers Batch 5 (validation with Zod, layered code, advanced TypeScript on the backend, and the GraphQL gist) and Batch 6 (authentication and authorization).
