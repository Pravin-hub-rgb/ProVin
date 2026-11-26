# Doc 8 Project — Test Suite for the Bookmarks API

---

## Where We Left Off

Batch 8 lessons (8.1-8.10) are complete. Now the project: Test Suite for the Bookmarks API.

---

## Problem — Can You Prove the API Works with Tests?

- Unit tests for schemas and pure helpers.
- HTTP tests for every endpoint's success path.
- Tests for every error status the API returns.
- A full auth and ownership suite.
- A real Postgres through Testcontainers, migrations applied, tests isolated.
- Factories for test data.
- One command (`npm test`) that runs everything, and a coverage report.
- A README section describing how to run the tests and what they cover.

**Done when:** Breaking a rule on purpose (e.g., removing the ownership filter) makes a test fail. The suite runs from a clean clone. He can explain why the database in tests is real.

## What It Is NOT

- This is **not** E2E browser testing — OUT OF SCOPE.
- This is **not** 100% coverage — focus on risks.
- This is **not** optional — tests give confidence.

---

## Common Mistakes

- Tests depending on each other's data/order.
- Mocking so much that tests prove nothing.
- Testing implementation details.
- Chasing coverage numbers.
- Tests needing a manually started server.
- Slow suites (container per test).

---

## Try It Yourself

1. Write unit tests for schemas/helpers.
2. Write HTTP tests for all endpoints.
3. Write auth/ownership tests.
4. Set up Testcontainers + factories.
5. Run `npm test` from clean clone.

## Summary

- Test suite: unit + HTTP + auth + errors.
- Real Postgres via Testcontainers.
- Factories for test data.
- `npm test` runs everything.

## Next Step

Batch 8 is complete. Next: Batch 9 — React Connected for Real (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- Unit tests for schemas and pure helpers.
- HTTP tests for every endpoint's success path.
- Tests for every error status the API returns.
- A full auth and ownership suite.
- A real Postgres through Testcontainers, migrations applied, tests isolated.
- Factories for test data.
- One command (`npm test`) that runs everything, and a coverage report.
- A README section describing how to run the tests and what they cover.