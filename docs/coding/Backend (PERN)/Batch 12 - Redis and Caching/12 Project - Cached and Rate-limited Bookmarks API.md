# Doc 12 Project — Cached and Rate-limited Bookmarks API

---

## Where We Left Off

Batch 12 lessons (12.1-12.8) are complete. Now the project: Cached and Rate-limited Bookmarks API.

---

## Problem — Can You Make Reads Faster and Limits Shared?

- Redis in the Compose stack.
- Cache-aside on read-heavy routes with correct invalidation and per-user keys.
- A Redis-backed rate limiter shared across two API instances.
- A benchmark report showing latency and database query counts before and after.

**Done when:** The benchmark shows a real improvement, updates never serve stale data beyond what he chose to allow, and a second API instance shares the same limits.

## What It Is NOT

- This is **not** a new feature — it is performance and scaling.
- Redis is **not** the source of truth — DB is.
- Caching is **not** always better — measure first.

---

## Common Mistakes

- Caching per-user data under a shared key (leak).
- No expiry (memory grows forever).
- Forgetting to invalidate on every write path.
- Treating Redis as source of truth.
- Caching before measuring.

---

## Try It Yourself

1. Add Redis to Compose stack.
2. Cache `GET /bookmarks/:id` with per-user keys.
3. Add invalidation on create/update/delete.
4. Add Redis-backed rate limiter.
5. Run two instances and verify shared limits.
6. Write benchmark report.

## Summary

- Cached and rate-limited Bookmarks API.
- Redis in Compose.
- Cache-aside with invalidation.
- Shared rate limiter.
- Benchmark report.

## Next Step

Batch 12 is complete. Next: Batch 13 — Background Jobs and Queues (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- Redis in the Compose stack.
- Cache-aside on read-heavy routes with correct invalidation and per-user keys.
- A Redis-backed rate limiter shared across two API instances.
- A benchmark report showing latency and database query counts before and after.