# Doc 14 Project — Live Link Checker

---

## Where We Left Off

Batch 14 lessons (14.1-14.7) are complete. Now the project: Live Link Checker. This adds real-time to the Link Checker (Batch 13).

---

## Problem — Can You Push Live Updates to the Browser?

When a background check finishes, the user's open browser tabs update immediately, with no refresh and no polling.

- Socket connections are authenticated and rooms are per user, so nobody receives another person's events.
- Reconnection works after the network drops.

**Done when:** Two tabs for the same user both update live, a different user's tab never does, and a dropped connection recovers by itself.

## What It Is NOT

- This is **not** polling — it is push-based.
- This is **not** unauthenticated — sockets are authenticated.
- This is **not** single-instance only — rooms are per user.

---

## Common Mistakes

- Trusting any message on an open socket.
- No heartbeat → dead connections pile up.
- Broadcasting to everyone instead of the right room.
- Forgetting that more than one server instance breaks naive broadcasting.

---

## Try It Yourself

1. Build live updates (two tabs update).
2. Test: different user's tab never updates.
3. Test: dropped connection recovers.

## Summary

- Live Link Checker: real-time updates.
- Authenticated sockets, per-user rooms.
- Reconnection works.

## Next Step

Batch 14 is complete. Next: Batch 15 — AI in the Backend (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- When a background check finishes, the user's open browser tabs update immediately, with no refresh and no polling.
- Socket connections are authenticated and rooms are per user, so nobody receives another person's events.
- Reconnection works after the network drops.