# Doc 2A Project — Toolbox Server

---

## Where We Left Off

2A.1 through 2A.10 are complete. Now the project: Toolbox Server. This combines everything from 2A.

---

## Problem — Can You Build a Small Express Server That Uses Every Core Feature?

Build a small Express server that uses every core feature of 2A together. It is not a CRUD app yet.

**Routes:**

- `/health` — health check.
- `/echo` — reports everything received.
- `/items` — in-memory list (create and read only).

**Plumbing:**

- Request logger (method, path, status, duration).
- Request ID header on every response.
- 404 handler and error handler with three custom error types.
- Configuration (port, environment name) from env vars with fail-fast.
- `app.ts` and `server.ts` split.

**Written comparison:** five lines or more — what the raw `http` version needed versus Express, in your own words.

**Done when:** Every route responds correctly from curl and the API client, errors always come back as JSON with the right status, the logger prints one line per request, and you can explain the order your middleware runs in.

## What It Is NOT

- This is **not** a CRUD app — that is 2B (Bookmarks API).
- This is **not** a database-backed app — that is Batch 4.
- This is **not** production-ready — that is Batch 7.

---

## Common Mistakes

- Forgetting `express.json()` → `req.body` undefined.
- Putting error handler before routes.
- Leaking stack traces.
- Not splitting `app.ts` and `server.ts`.

---

## Try It Yourself

1. Build the Toolbox Server from scratch.
2. Test all routes with curl.
3. Write the comparison (raw http vs Express).

## Summary

- Toolbox Server: uses every 2A core feature.
- Routes: `/health`, `/echo`, `/items`.
- Plumbing: logger, request ID, 404, error handler, env config.
- `app.ts` + `server.ts` split.

## Next Step

Batch 2A is complete. Next: Batch 2B — RESTful API Design. Next: `2B.1 - REST Design on Paper`.

---

## Cheat Sheet (Quick Recall)

- A small Express server that uses every core feature of 2A together.
- Routes under three routers: `/health`, `/echo`, `/items` (in-memory list, create and read only).
- A request logger and a request-id header on every response.
- A 404 handler and an error handler with the three custom error types from Batch 1.9.
- Configuration (port, environment name) loaded from environment variables with fail-fast checking.
- `app.ts` and `server.ts` split.
- A written comparison, five lines or more: what the raw `http` version needed versus Express, in his own words.