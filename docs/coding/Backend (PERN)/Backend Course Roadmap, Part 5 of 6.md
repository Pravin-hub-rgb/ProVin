# Backend Course Roadmap, Part 5 of 6

Batch 7 (hardening and logging), Batch 8 (testing with a real database), Batch 9 (React connected for real) · Prepared November 26, 2026 for Pravin

The rules, tags, stack and versions are in Part 1. The building agent must read Part 1 first and obey it. This part adds only Batches 7, 8 and 9.

## What these three batches do

By the end of Batch 6 the API is correct and secured at the logic level. These batches make it production-minded and then connect it to the front end he already knows.

- **Batch 7** makes the API hard to abuse and easy to observe.
- **Batch 8** proves it works, with tests that run against a real database.
- **Batch 9** connects his React app to it, and produces a full-stack project that can headline his resume.

All three keep upgrading the Bookmarks project: v4 becomes v5 (hardened), gets a test suite, and then gets a real front end.

## Batch 7: Security Hardening and Logging (size M)

**Goal.** Make the API resistant to common abuse, safe in how it fails, and observable when something goes wrong.

**Why now.** Authentication exists, so there is now something worth attacking. He learns the standard Express hardening set after he understands what it protects.

**Prerequisites.** Batch 6.

**Stack.** helmet, cors, express-rate-limit, pino. The agent re-verifies package versions and options against current docs.

**History note (read-only).** Why security became everyone's job instead of a specialist's, the idea behind the OWASP Top 10 lists, and why logs shifted from free-form text lines to structured JSON that machines can search.

### Lessons, each with a mini-project

**7.1 Thinking like an attacker (TAUGHT).** A plain-language tour of the OWASP Top 10 categories that matter for an API (broken access control, injection, security misconfiguration, vulnerable dependencies, identification and authentication failures, logging failures). Each item is tied to something he has already built, such as the ownership check in 6.8 and parameterized queries in 3.16. *Mini-project:* a table mapping each category to where his API is or is not protected.

**7.2 Security headers with helmet (TAUGHT).** What a header like `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options` and the frame protections each stop, shown by inspecting responses before and after. Note that an API returning JSON needs fewer of these than a site serving pages, and why. *Mini-project:* inspect and explain every header helmet adds.

**7.3 CORS in depth (TAUGHT, builds on 2B.7).** An allowlist of origins from configuration, credentials and why a wildcard cannot be combined with cookies, preflight caching, and the common production mistake of reflecting any origin. *Break it on purpose:* configure it badly and show the risk. *Mini-project:* an environment-driven allowlist.

**7.4 Rate limiting (TAUGHT).** What it protects against (brute force, scraping, accidental floods), `express-rate-limit`, a strict limiter on login and registration and a looser one elsewhere, the `429` status and `Retry-After`, and why running behind a proxy changes which IP the server sees (`trust proxy`). The default in-memory store works for one process only; a shared store is a PREVIEW line pointing to Batch 12. *Break it on purpose:* hammer the login route until it blocks. *Mini-project:* limiters on the auth routes.

**7.5 Limits on everything (TAUGHT).** Body size limits, page size caps, maximum string and array lengths in the Zod schemas, request timeouts. The idea that every input needs an upper bound. File uploads are only a PREVIEW line and are OUT OF SCOPE for this course. *Mini-project:* add and test the limits.

**7.6 Structured logging with pino (TAUGHT).** Manual first: show what `console.log` logging looks like once there are many requests. Then pino: log levels, JSON output, child loggers carrying the request id from 2A.7, redacting secrets (passwords, tokens, cookies), a readable dev formatter versus raw production JSON. What to log and what never to log. *Mini-project:* replace the request logger with pino, with redaction.

**7.7 Failing safely in production (TAUGHT).** Operational errors (expected, handled, mapped to status codes) versus programmer errors (bugs, logged and answered with a generic 500). Never send stack traces or database errors to clients. Process-level handlers for unhandled rejections and uncaught exceptions: log, then exit, and let the platform restart. *Mini-project:* review and tighten the error handler against both categories.

**7.8 Health checks and graceful shutdown (TAUGHT).** `/health` (am I alive) versus `/ready` (can I serve, including a database check). On `SIGTERM`, stop accepting connections, finish in-flight requests, close the Prisma client, then exit. This sets up Docker and deployment in Batch 10. *Break it on purpose:* kill the server mid-request and see what the client gets. *Mini-project:* the two endpoints and a shutdown handler.

**7.9 Secrets and dependency hygiene (TAUGHT).** Where secrets live, why they never enter Git, how to rotate a leaked one, what `npm audit` does and does not tell you, pinning and reviewing dependencies, and the idea of supply-chain risk. *Mini-project:* run an audit, read the report, decide what to do about each finding.

**7.10 A security review (TAUGHT).** Walk his own API against a written checklist and fix what fails. *Mini-project:* the completed checklist, committed to the repository.

### Used, not taught here

- Redis-backed rate limiting. Batch 12.
- TLS certificates and HTTPS termination. Batch 10 (deployment), explained conceptually only.

### Preview

- Testing (Batch 8), containers (Batch 10), Redis (Batch 12). One sentence each.

### Combined project: Hardened Bookmarks API v5 (PRJ7)

The upgrade of PRJ6.

- helmet, an environment-driven CORS allowlist, and rate limits (strict on auth).
- Size and length limits across every schema and request.
- pino structured logging with request ids and redaction of sensitive fields.
- A production-safe error handler that never leaks internals.
- `/health` and `/ready` endpoints and graceful shutdown.
- A committed security checklist and an `npm audit` review.
- **Proof:** a short script or collection showing a login brute-force attempt getting a 429, an oversized body getting rejected, and a forced error returning a generic message while the log keeps the details.

**Done when.** Each protection can be demonstrated, and he can explain what attack each one stops.

### Checkpoint

- Name what helmet, rate limiting and a CORS allowlist each protect against.
- Explain why a stack trace must never reach a client.
- Explain the difference between operational and programmer errors.
- Explain what graceful shutdown does and why platforms need it.
- Explain what should and should not appear in logs.

### Common traps

- A wildcard CORS origin combined with credentials.
- Rate limiting that sees the proxy's IP for every user.
- Logging passwords, tokens or full request bodies.
- Catching errors and silently continuing after a programmer error.
- Treating `npm audit` output as either gospel or noise.
- No upper bounds on lists, strings or request size.

### Interview questions

- How would you protect an API from abuse?
- What does CORS protect, and what does it not protect?
- What is rate limiting, and where does it live in a larger system?
- What would you log, and what would you never log?
- What happens to in-flight requests when a server is redeployed?

### Git milestone

Tag `batch-7-complete`.

## Batch 8: Testing with a Real Database (size M)

**Goal.** Write tests that give him real confidence the API works, and be able to explain what each kind of test is for.

**Why now.** The API is complete enough to protect, and the `app.ts` and `server.ts` split from 2A.9 finally pays off: tests import the app without opening a port.

**Prerequisites.** Batch 7.

**Stack.** Vitest 4, Supertest 7, Testcontainers for Postgres. The agent re-verifies versions and APIs. A real database in tests is a deliberate choice: mocking the database tests the mock, not the queries, constraints or migrations he actually wrote.

**History note (read-only).** Why testing frameworks multiplied (Jest, Mocha, Vitest), why Vitest fits a TypeScript and ES module project, and the long argument between mocking databases and using real ones.

### Lessons, each with a mini-project

**8.1 What and why to test (TAUGHT).** The test pyramid in plain words, what an API test should prove (behavior, not implementation), and what is not worth testing. *Mini-project:* list the ten most valuable tests for his own API before writing any.

**8.2 Vitest basics (TAUGHT).** `describe`, `it`, `expect`, running and watching, test file naming, and a failing test read carefully. First tests are for pure functions (validators, helpers, the `paginate` helper). *Mini-project:* unit tests for his Zod schemas and helpers.

**8.3 Tests for logic with boundaries (TAUGHT).** Mocks and fakes, and the rule of thumb: fake the things you do not own and cannot control (the clock, outgoing email, third-party services), do not fake your own database. Manual first: write a fake by hand, then show the library's mocking tools. *Mini-project:* test a service function that depends on the current time.

**8.4 HTTP-level tests with Supertest (TAUGHT).** Call the Express `app` directly, assert status, headers and JSON body. This is where `app.ts` versus `server.ts` pays off. *Mini-project:* tests for `GET /health` and `POST /bookmarks` validation errors.

**8.5 A real Postgres in tests (TAUGHT).** Testcontainers starts a throwaway Postgres in Docker for the test run (Docker use is USED here, taught in Batch 10, with a given Compose database as the fallback). Apply migrations, share one container across the suite for speed, and isolate each test (truncate tables or roll back a transaction). *Break it on purpose:* let two tests share data and watch them interfere. *Mini-project:* the test database setup and teardown.

**8.6 Test data (TAUGHT).** Factories and builders that create valid records with overrides, instead of copy-pasted fixtures. *Mini-project:* a `makeUser` and `makeBookmark` factory.

**8.7 Testing authentication and authorization (TAUGHT).** Helpers that register and log in a test user and return a token or cookie, tests for protected routes, expiry, refresh rotation and reuse detection, and the most important test in the project: user A cannot read, change or delete user B's data. *Mini-project:* the auth test suite.

**8.8 Errors and edge cases (TAUGHT).** Every status code the API can return gets at least one test: 400 or 422, 401, 403 or 404, 409, 429. Boundary values, empty lists, huge page sizes. *Mini-project:* an error-coverage table, each row linked to a test.

**8.9 Coverage, honestly (TAUGHT).** What a coverage number measures, what it misses, why one hundred percent is not the goal. *Mini-project:* generate a report and write down three important things it does not prove.

**8.10 Fix a bug test-first (TAUGHT).** Reproduce a planted bug with a failing test, fix it, watch it pass. The light form of test-driven development. *Mini-project:* the bug, the test and the fix in three commits.

### Used, not taught here

- Docker. Needed for Testcontainers, taught in Batch 10.
- Continuous integration. Batch 10 runs this suite on every push.

### Preview

- GitHub Actions running the suite (Batch 10). End-to-end browser tests are OUT OF SCOPE for this course.

### Combined project: Test suite for the Bookmarks API (PRJ8)

- Unit tests for schemas and pure helpers.
- HTTP tests for every endpoint's success path.
- Tests for every error status the API returns.
- A full auth and ownership suite.
- A real Postgres through Testcontainers, migrations applied, tests isolated.
- Factories for test data.
- One command (`npm test`) that runs everything, and a coverage report.
- A README section describing how to run the tests and what they cover.

**Done when.** Breaking a rule on purpose (for example removing the ownership filter) makes a test fail. The suite runs from a clean clone. He can explain why the database in tests is real.

### Checkpoint

- Explain the difference between unit, integration and end-to-end tests.
- Test an Express route with Supertest.
- Set up an isolated real database for tests.
- Write a test that would have caught an ownership bug.
- Explain why you would or would not mock the database.

### Common traps

- Tests that depend on each other's data or order.
- Mocking so much that the test proves nothing.
- Testing implementation details so every refactor breaks tests.
- Chasing a coverage number instead of risks.
- Tests that need a manually started server.
- Slow suites caused by starting a container per test.

### Interview questions

- What would you test in this API, and in what order?
- Mock the database or use a real one: trade-offs?
- What does code coverage tell you and not tell you?
- How do you keep tests independent?
- What is the most important test in an app with user data?

### Git milestone

Tag `batch-8-complete`.

## Batch 9: React Connected for Real (size L)

**Goal.** Build the front end for his own API, handle the seam between the two correctly, and finish with a full-stack project.

**Why now.** The back end is secured, hardened and tested. This is the batch where the learner sees the whole path from Module 0, from a click in React to a row in Postgres and back, working for real.

**Prerequisites.** Batches 6 to 8 and his React roadmap (React Router, TanStack Query, React Hook Form with Zod, Tailwind). Everything in the front end that he already knows is tagged REVISITED, with no re-teaching.

**Scope note.** A Next.js full-stack variant is OUT OF SCOPE here. The point of this batch is the seam between a separate front end and a separate API, which is how many teams work.

**History note (read-only).** Why front end and back end split into separate apps (different teams, different deploy cycles), what changed with server-rendered frameworks, and why the seam between them is where many bugs live.

### Lessons, each with a mini-project

**9.1 Two servers side by side (TAUGHT).** Running the Vite dev server and the API together, what the browser sees as two origins, and the two ways to cross it: CORS (2B.7 and 7.3) or a dev proxy in Vite. When each is used. *Mini-project:* the app calling the API both ways.

**9.2 A typed API client layer (TAUGHT, fetch REVISITED).** One module wraps `fetch`: base URL from environment, JSON handling, the shared error shape from the API turned into a typed error the UI can use. Components never call `fetch` directly. *Mini-project:* `apiClient.ts`.

**9.3 TanStack Query against the real API (REVISITED).** List with filters and paging, create, update, delete, cache invalidation after mutations, loading and error states, an optimistic update on delete or toggle. Tie each state to the HTTP statuses the API actually returns. *Mini-project:* the bookmarks list and CRUD screens.

**9.4 Sharing Zod schemas (TAUGHT, one new tool).** An npm workspace with a `shared` package holding the Zod schemas used by both the API and the React app, so the front-end form and the back-end validation can never disagree. `npm workspaces` is the one new tool in this lesson. *Break it on purpose:* change a rule in the shared schema and watch both sides update. *Mini-project:* move the bookmark schemas into the shared package.

**9.5 Login in React (REVISITED, with the new seam).** Register and login forms with React Hook Form and Zod, the access token kept in memory (and why not `localStorage`, tied to 6.9), the refresh token living in the httpOnly cookie, `credentials: 'include'`, and the CORS settings that this requires. *Mini-project:* the login flow and a protected route.

**9.6 Handling 401 globally (TAUGHT).** An interceptor-style wrapper: on a 401, attempt one refresh, retry the original request, and on failure send the user to login. Avoid refresh storms when several requests fail at once. *Mini-project:* silent refresh in the API client.

**9.7 Environment and configuration (TAUGHT).** Front-end environment variables are public (anything in the bundle is visible), different API URLs per environment, and no secrets in the front end. *Mini-project:* env setup for local development.

**9.8 Debugging the seam (TAUGHT).** A guided tour of the failures he will meet: a CORS error that is really a server error, a cookie not being set because of `SameSite` or `Secure` on localhost, a preflight failing, a 401 loop. Use the Network tab, the API logs and the request id to trace one request end to end. *Mini-project:* a debugging log of three deliberately broken setups and how each was found.

**9.9 Lists in the UI (REVISITED).** Pagination controls, tag filter and search wired to the API's query parameters, with the URL as the source of truth. *Mini-project:* filter and paging UI.

### Used, not taught here

- Everything from his React roadmap that is not new: Router, Tailwind, forms.
- Deployment. Batch 10.

### Preview

- Docker Compose running API, database and front end together (Batch 10).

### Combined project: Bookmarks App, full stack (PRJ9)

The full-stack project built on PRJ7 and PRJ8, in one repository using npm workspaces.

- **Repository layout:** `apps/api`, `apps/web`, `packages/shared`.
- **Features:** register, login, silent refresh, logout, bookmark list with filters and paging, create, edit, delete, tags, and a profile page.
- **Front end:** React with TypeScript, Router, TanStack Query, React Hook Form with Zod, Tailwind, accessible forms.
- **Seam:** a typed API client, shared Zod schemas, one error shape handled once, global 401 handling.
- **Quality:** the API test suite still passes, with a handful of component tests optional.
- **Docs:** a README with a screenshot, an architecture diagram showing the full request journey, setup steps that work from a clean clone.

**Done when.** A stranger can register, log in, manage bookmarks, close the tab, return and still be logged in, and see only their own data. He can walk through the entire request journey from the click to the database and back, using the real logs.

### Checkpoint

- Explain why the browser treats the front end and API as two origins, and two ways to handle it.
- Build an API client layer that turns server errors into typed errors.
- Implement login with an in-memory access token and a cookie refresh token.
- Explain why shared schemas keep the two sides consistent.
- Debug a CORS or cookie problem from the Network tab.

### Common traps

- Putting the access token in `localStorage` out of habit.
- Forgetting `credentials: 'include'` or the matching CORS credentials setting.
- Cookies that work in production but not on localhost because of `Secure` or `SameSite`.
- Many failing requests all triggering a refresh at once.
- Duplicated validation rules that drift between front and back end.
- Secrets in front-end environment variables.

### Interview questions

- Walk me through what happens when a user logs in on your app.
- Where do you store tokens in a single-page app and why?
- How do you keep front-end and back-end validation consistent?
- How do you handle expired tokens without logging the user out?
- A user reports "it just doesn't load". How do you trace it?

### Git milestone

Tag `batch-9-complete`. This repository is the main full-stack project for his resume. Spend time on the README, the architecture diagram and a short walkthrough.

## Next

Part 6 covers Batches 10 to 15: Docker and deployment with CI, transactions in depth, Redis caching, background jobs, WebSockets, and an AI-powered feature.
