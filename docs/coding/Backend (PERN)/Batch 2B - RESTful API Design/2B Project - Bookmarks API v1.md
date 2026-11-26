# Doc 2B Project — Bookmarks API v1

---

## Where We Left Off

2B.1 through 2B.8 are complete. Now the project: Bookmarks API v1. This combines everything from 2A and 2B.

---

## Problem — Can You Build Your First CRUD Application?

Build a Bookmarks API with in-memory storage. This is his first CRUD application.

**Data:** a bookmark has `id` (UUID), `url`, `title`, optional `note`, `tags` (array of strings), `createdAt`, `updatedAt`. Stored in an in-memory `Map`. Restarting the server loses everything, and that is part of the lesson.

**Endpoints:**

- `POST /bookmarks` — create
- `GET /bookmarks` — list (filters `tag`, `q`, paging `limit`/`page`, sort)
- `GET /bookmarks/:id` — get one
- `PUT /bookmarks/:id` — replace
- `PATCH /bookmarks/:id` — partial update
- `DELETE /bookmarks/:id` — delete

**Status codes:**

- 201 with `Location` on create
- 200 on read and update
- 204 on delete
- 400 or 422 on bad input
- 404 on missing
- 409 on duplicate URL

**Validation (by hand):** the URL must parse with `new URL`, the title is 1 to 200 characters, at most 10 tags, each tag a short string. Errors use the one shared error shape.

**Plumbing:** request logger, request id, 404 handler, error handler, CORS for `http://localhost:5173`, `app.ts` and `server.ts` split.

**API client:** a Bruno collection with an example for every endpoint and every error.

**Write-up:** five lines on what he would improve (he will find: validation repeats, data vanishes, no users). These become the motivation for Batches 3 to 6.

**Done when:** His React app can list and add bookmarks through `fetch`. He can state the status code and the reason for every response. A restart wipes the data and he can say why. He can build the whole API again from an empty folder in under an hour.

## What It Is NOT

- This is **not** a database-backed app — that is Batch 4.
- This is **not** authenticated — that is Batch 6.
- This is **not** production-ready — that is Batch 7.

---

## Common Mistakes

- Using 200 for everything.
- Verbs in paths (`/createBookmark`).
- Unbounded list endpoints.
- Disabling CORS with a wildcard.
- Returning different error shapes from different routes.
- Using PUT when the intent is a partial change.
- Forgetting that a 404 for a missing item and a 404 for a missing route are different.

---

## Try It Yourself

1. Build the Bookmarks API from scratch.
2. Test all endpoints with curl and Bruno.
3. Write the five-line improvement write-up.

## Summary

- Bookmarks API v1: first CRUD application.
- In-memory storage (Map), lost on restart.
- Full REST endpoints with correct status codes.
- Validation by hand, one error shape.
- CORS, logger, request ID, error handler.

## Next Step

Batch 2 is complete. Next: Batch 3 — PostgreSQL and SQL by hand (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- His first CRUD application. It joins everything in 2A and 2B.
- Data: bookmark has `id` (UUID), `url`, `title`, optional `note`, `tags` (array of strings), `createdAt`, `updatedAt`. Stored in an in-memory `Map`. Restarting the server loses everything, and that is part of the lesson.
- Endpoints: `POST /bookmarks`, `GET /bookmarks` (filters `tag` and `q`, paging `limit` and `page`, sort), `GET /bookmarks/:id`, `PUT /bookmarks/:id`, `PATCH /bookmarks/:id`, `DELETE /bookmarks/:id`.
- Status codes: 201 with `Location` on create, 200 on read and update, 204 on delete, 400 or 422 on bad input, 404 on missing, 409 on a duplicate URL.
- Validation (by hand): the URL must parse with `new URL`, the title is 1 to 200 characters, at most 10 tags, each tag a short string. Errors use the one shared error shape.
- Plumbing: request logger, request id, 404 handler, error handler, CORS for `http://localhost:5173`, `app.ts` and `server.ts` split.
- API client: a Bruno collection with an example for every endpoint and every error.
- Write-up: five lines on what he would improve.