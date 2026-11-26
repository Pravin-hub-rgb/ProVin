# Doc 4 Project — Bookmarks API v2 on PostgreSQL

---

## Where We Left Off

Batch 4 lessons (4.1-4.12) are complete. Now the project: Bookmarks API v2 on PostgreSQL. This is his first resume-ready project.

---

## Problem — Can You Build a Database-Backed CRUD API?

The upgrade of PRJ2B. Same endpoints and behavior, real database underneath.

**Models:** `Bookmark` (id, url, title, optional note, createdAt, updatedAt) and `Tag` (id, name), connected many-to-many. The `url` is unique.

**Endpoints:** everything from v1 (`POST`, `GET` list with `tag`, `q`, `limit`, `page` and sorting, `GET` by id, `PUT`, `PATCH`, `DELETE`), plus `GET /tags`. Same status codes, same error shape.

**Database behavior:** unique URL becomes 409 through the error mapping from 4.8, missing id becomes 404, tag creation and bookmark creation happen in one transaction.

**Plumbing kept from Batch 2:** logger, request id, error handler, CORS, `app.ts` and `server.ts`.

**Data engineering:** migrations committed, a seed script, `.env.example`, a README with setup steps that work from a clean clone.

**Proof:** restarting the server no longer loses data, and the React app from his roadmap still works against the new API without changes.

**Write-up:** a short section in the README explaining the schema and why it is shaped that way, ready for an interview.

**Done when:** A stranger can clone the repository, follow the README, and have the API running against a fresh database. Data survives restarts. He can explain each Prisma call in terms of the SQL it generates.

## What It Is NOT

- This is **not** authenticated — that is Batch 6.
- This is **not** tested — that is Batch 8.
- This is **not** deployed — that is Batch 10.

---

## Common Mistakes

- Committing `.env` with the database URL.
- Not committing migrations.
- N+1 queries from looping.
- Returning unfiltered database objects to clients.

---

## Try It Yourself

1. Build the Bookmarks API v2 on Postgres.
2. Run migrations and seed data.
3. Verify data survives restart.
4. Write the README with setup steps.

## Summary

- Bookmarks API v2: database-backed CRUD.
- Prisma + Postgres.
- Migrations, seed, error mapping.
- First resume-ready project.

## Next Step

Batch 4 is complete. Next: Batch 5 — Validation, Auth, and Security Basics (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- The upgrade of PRJ2B. Same endpoints and behavior, real database underneath. It is his first resume-ready project.
- Models: `Bookmark` (id, url, title, optional note, createdAt, updatedAt) and `Tag` (id, name), connected many-to-many. The `url` is unique.
- Endpoints: everything from v1 (`POST`, `GET` list with `tag`, `q`, `limit`, `page` and sorting, `GET` by id, `PUT`, `PATCH`, `DELETE`), plus `GET /tags`. Same status codes, same error shape.
- Database behavior: unique URL becomes 409 through the error mapping from 4.8, missing id becomes 404, tag creation and bookmark creation happen in one transaction.
- Plumbing kept from Batch 2: logger, request id, error handler, CORS, `app.ts` and `server.ts`.
- Data engineering: migrations committed, a seed script, `.env.example`, a README with setup steps that work from a clean clone.
- Proof: restarting the server no longer loses data, and the React app from his roadmap still works against the new API without changes.
- Write-up: a short section in the README explaining the schema and why it is shaped that way, ready for an interview.