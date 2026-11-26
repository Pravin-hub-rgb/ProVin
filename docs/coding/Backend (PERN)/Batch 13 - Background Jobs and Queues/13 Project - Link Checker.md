# Doc 13 Project — Link Checker

---

## Where We Left Off

Batch 13 lessons (13.1-13.8) are complete. Now the project: Link Checker. This adds a background system to the Bookmarks App.

---

## Problem — Can You Build a Reliable Background System?

A background system added to the Bookmarks App.

- **Worker process** that checks whether saved URLs still work, on demand and on a schedule.
- **Retries** with backoff, timeouts, and safety checks from 13.7.
- **Results stored** per bookmark (status, last checked) and a status endpoint.
- **Worker runs** as its own service in Docker Compose.

**Done when:** Killing the worker mid-job loses nothing, a flaky site is retried, private addresses are refused, and two worker instances never do the same job twice.

## What It Is NOT

- This is **not** a synchronous feature — it runs in background.
- This is **not** a simple cron job — it uses a queue.
- This is **not** optional for production — reliability matters.

---

## Common Mistakes

- Doing slow work in the request handler.
- Jobs not safe to run twice.
- Retrying forever with no backoff.
- Fetching user-supplied URLs without blocking internal addresses.
- Running the worker inside the web process.

---

## Try It Yourself

1. Build the Link Checker system.
2. Test: kill worker mid-job, verify nothing lost.
3. Test: flaky site retried.
4. Test: private addresses refused.
5. Test: two workers, no duplicate work.

## Summary

- Link Checker: background URL checking.
- Worker process, retries, safety checks.
- Results stored per bookmark.
- Worker as separate service.

## Next Step

Batch 13 is complete. Next: Batch 14 — Real-Time with WebSockets (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- A background system added to the Bookmarks App.
- A worker process that checks whether saved URLs still work, on demand and on a schedule.
- Retries with backoff, timeouts, and the safety checks from 13.7.
- Results stored per bookmark (status, last checked) and a status endpoint.
- The worker runs as its own service in Docker Compose.