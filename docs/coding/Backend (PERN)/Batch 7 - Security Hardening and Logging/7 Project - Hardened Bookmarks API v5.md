# Doc 7 Project — Hardened Bookmarks API v5

---

## Where We Left Off

Batch 7 lessons (7.1-7.10) are complete. Now the project: Hardened Bookmarks API v5. This upgrades PRJ6.

---

## Problem — Can You Make the API Hard to Abuse and Easy to Observe?

The upgrade of PRJ6.

- **helmet:** security headers.
- **CORS allowlist:** environment-driven, no wildcard + credentials.
- **Rate limits:** strict on auth routes.
- **Limits:** body size, page size, string/array lengths.
- **pino:** structured logging with request ids and redaction.
- **Error handler:** production-safe, no internals leaked.
- **`/health` and `/ready`:** endpoints + graceful shutdown.
- **Security checklist:** committed.
- **`npm audit`:** reviewed.

**Proof:** a short script or collection showing a login brute-force attempt getting a 429, an oversized body getting rejected, and a forced error returning a generic message while the log keeps the details.

**Done when:** Each protection can be demonstrated, and he can explain what attack each one stops.

## What It Is NOT

- This is **not** tested — that is Batch 8.
- This is **not** deployed — that is Batch 10.
- This is **not** a new feature — it is hardening.

---

## Common Mistakes

- Wildcard CORS + credentials.
- Rate limiting seeing proxy's IP.
- Logging passwords/tokens.
- Catching programmer errors and continuing.
- No upper bounds on lists/strings/request size.

---

## Try It Yourself

1. Add helmet, CORS allowlist, rate limits.
2. Add limits (body, page, strings, arrays).
3. Add pino logging with redaction.
4. Add `/health` and `/ready` + graceful shutdown.
5. Run security review checklist.

## Summary

- Hardened Bookmarks API v5: security + logging.
- helmet, CORS, rate limits, limits, pino, error handler, health checks.
- Security checklist committed.

## Next Step

Batch 7 is complete. Next: Batch 8 — Testing with a Real Database (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- The upgrade of PRJ6.
- helmet, an environment-driven CORS allowlist, and rate limits (strict on auth).
- Size and length limits across every schema and request.
- pino structured logging with request ids and redaction of sensitive fields.
- A production-safe error handler that never leaks internals.
- `/health` and `/ready` endpoints and graceful shutdown.
- A committed security checklist and an `npm audit` review.
- Proof: a short script or collection showing a login brute-force attempt getting a 429, an oversized body getting rejected, and a forced error returning a generic message while the log keeps the details.