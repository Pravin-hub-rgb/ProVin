# Doc 11 Project — Ledger API

---

## Where We Left Off

Batch 11 lessons (11.1-11.8) are complete. Now the project: Ledger API. This combines everything from Batch 11.

---

## Problem — Can You Build a Concurrency-Safe Ledger?

Accounts, transfers, and a statement endpoint, with a concurrency test suite.

- **Transfers are atomic:** all or nothing.
- **Never overdraw:** balance never goes negative.
- **Safe to retry:** idempotency keys.
- **Concurrency test:** fire hundreds of concurrent transfers, verify total money unchanged.
- **Write-up:** compare pessimistic (locking) and optimistic (version column) approaches and when to choose each.

**Done when:** The concurrent load test passes every time and you can explain why the naive version failed.

## What It Is NOT

- This is **not** real money — generic ledger only.
- This is **not** a trading app — that is a future capstone.
- This is **not** optional — concurrency is critical for financial data.

---

## Common Mistakes

- Read-then-write outside transaction.
- Assuming default isolation protects against everything.
- Holding locks across slow operations.
- Locking in inconsistent order.
- Idempotency keys checked but not stored atomically.

---

## Try It Yourself

1. Build the Ledger API (accounts, transfers, statement).
2. Write a concurrency test suite.
3. Fire 100 concurrent transfers and verify total money unchanged.
4. Write the pessimistic vs optimistic comparison.

## Summary

- Ledger API: accounts, transfers, statement.
- Atomic, never overdraw, safe to retry.
- Concurrency test: total money unchanged.
- Pessimistic vs optimistic comparison.

## Next Step

Batch 11 is complete. Next: Batch 12 — Redis and Caching (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- Accounts, transfers and a statement endpoint, with a concurrency test suite.
- Transfers are atomic, never overdraw, and are safe to retry through idempotency keys.
- A load script and tests that fire hundreds of concurrent transfers and verify total money is unchanged.
- A write-up comparing pessimistic and optimistic approaches and when to choose each.