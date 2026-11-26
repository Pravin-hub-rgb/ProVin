# Doc 3 Project — Library Database

---

## Where We Left Off

Batch 3 lessons (3.1-3.17) are complete. Now the project: Library Database. This combines everything from Batch 3.

---

## Problem — Can You Design and Query a Real Database?

Build a complete lending-library database in SQL files, with one small Node script at the end.

**Schema:** members, authors, books, `book_authors` (many-to-many), copies, loans, fines. Foreign keys, checks, defaults, and enums or lookup tables where they fit.

**Integrity:** a partial unique index so one physical copy cannot be on two active loans at once. The database itself must reject the double loan.

**Migrations:** three numbered migration files and a seed script generating a few thousand rows.

**Questions:** twenty questions answered in SQL, covering joins, aggregates, CTEs and a window function. Includes an overdue-loans report and a most-borrowed-per-genre ranking.

**Performance:** two slow queries fixed with indexes, shown with `EXPLAIN ANALYZE` before and after.

**Node:** a script using `pg` that runs a parameterized search and a failed injection attempt.

**Done when:** Every question returns correct rows against the seed data, the double-loan case is rejected by the database, and you can read an `EXPLAIN` plan and say whether it uses an index.

## What It Is NOT

- This is **not** an ORM project — that is Batch 4 (Prisma).
- This is **not** a full API — that is Batch 4+.
- This is **not** production-ready — that is Batch 7.

---

## Common Mistakes

- Missing foreign keys (orphaned data).
- Not using partial unique index (double loan allowed).
- Not seeding enough data (slow queries not visible).

---

## Try It Yourself

1. Design the schema on paper.
2. Write three migration files.
3. Seed a few thousand rows.
4. Answer 20 SQL questions.
5. Fix two slow queries with indexes.

## Summary

- Library Database: complete lending library in SQL.
- Schema: members, authors, books, book_authors, copies, loans, fines.
- Partial unique index for double-loan prevention.
- Migrations, seed data, 20 queries, index optimization.
- Node script with parameterized search + injection attempt.

## Next Step

Batch 3 is complete. Next: Batch 4 — Prisma and the real CRUD app (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- A complete lending-library database built in SQL files, with one small Node script at the end.
- Schema: members, authors, books, `book_authors` (many-to-many), copies, loans, fines. Foreign keys, checks, defaults, and enums or lookup tables where they fit.
- Integrity: a partial unique index so one physical copy cannot be on two active loans at once. The database itself must reject the double loan.
- Migrations: three numbered migration files and a seed script generating a few thousand rows.
- Questions: twenty questions answered in SQL, covering joins, aggregates, CTEs and a window function. Includes an overdue-loans report and a most-borrowed-per-genre ranking.
- Performance: two slow queries fixed with indexes, shown with `EXPLAIN ANALYZE` before and after.
- Node: a script using `pg` that runs a parameterized search and a failed injection attempt.