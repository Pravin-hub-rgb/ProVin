# Doc 5 Project — Bookmarks API v3

---

## Where We Left Off

Batch 5 lessons (5.1-5.11) are complete. Now the project: Bookmarks API v3. This upgrades PRJ4 with validation, layers, and consistent shape.

---

## Problem — Can You Make the API Refuse Bad Input and Clean Up Structure?

The upgrade of PRJ4. Behavior stays the same. Structure and safety change.

**Validation:** every route validates `body`, `params`, and `query` with Zod through the middleware. No hand-written checks remain.

**Config:** a typed, Zod-validated `config` object; no `process.env` outside it.

**Layers:** every feature has controller, service, and repository files. Controllers contain no Prisma calls, services contain no `req` or `res`.

**Responses:** a consistent envelope and a response mapper. No raw database objects leave the server.

**Errors:** validation failures map to one error shape and one chosen status code.

**Paging:** the generic `paginate<T>` helper.

**Before and after:** a short README section comparing the v2 and v3 codebases: lines of validation code removed, places that change when a field is added.

**Write-up:** the half-page GraphQL versus REST note.

**Done when:** Sending bad input to any route returns the same error shape with a per-field message. Adding a field to a bookmark requires changing the schema and one or two layers, not the whole project. He can explain why each layer exists.

## What It Is NOT

- This is **not** authenticated — that is Batch 6.
- This is **not** tested — that is Batch 8.
- This is **not** deployed — that is Batch 10.

---

## Common Mistakes

- Validating only `body`, forgetting `params` and `query`.
- Query parameters arriving as strings and failing numeric checks.
- Putting business rules in controllers or Prisma calls in services.
- Returning raw database objects (leaks internals).
- Following Zod 3 snippets while using Zod 4.

---

## Try It Yourself

1. Add Zod validation to every route.
2. Create the layered structure (controller, service, repository).
3. Apply the response envelope.
4. Write the before/after README section.

## Summary

- Bookmarks API v3: validated and layered.
- Zod validation on all routes.
- Controller → Service → Repository.
- Consistent response envelope.
- No raw DB objects leak.

## Next Step

Batch 5 is complete. Next: Batch 6 — Authentication and Authorization (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- The upgrade of PRJ4. Behavior stays the same. Structure and safety change.
- Validation: every route validates `body`, `params` and `query` with Zod through the middleware. No hand-written checks remain.
- Config: a typed, Zod-validated `config` object; no `process.env` outside it.
- Layers: every feature has controller, service and repository files. Controllers contain no Prisma calls, services contain no `req` or `res`.
- Responses: a consistent envelope and a response mapper. No raw database objects leave the server.
- Errors: validation failures map to one error shape and one chosen status code.
- Paging: the generic `paginate<T>` helper.
- Before and after: a short README section comparing the v2 and v3 codebases: lines of validation code removed, places that change when a field is added.
- Write-up: the half-page GraphQL versus REST note.