# Backend Course Roadmap, Part 6 of 6

Batches 10 to 15: Docker and deployment, transactions in depth, Redis, background jobs, WebSockets, AI · Prepared November 26, 2026 for Pravin

The rules, tags, stack and versions are in Part 1. The building agent must read Part 1 first and obey it. This part adds Batches 10 to 15 and a final resume map.

## What these batches do

After Batch 9 he has a full-stack, secured, tested project. These six batches turn him from someone who can build an app into someone who can ship and scale one. Batch 10 comes first because getting the project onto the internet is the biggest resume upgrade. Batches 11 to 14 each add one scaling skill. Batch 15 adds an AI feature.

Batches 11 to 15 are independent of each other after Batch 10, except where noted. He may reorder them or stop after any of them. The course is complete and job-ready after Batch 10.

**Recurring project thread.** Batches 12 to 15 build on the Bookmarks App from Batch 9, so he keeps growing one product instead of starting over. Batch 11 uses a small separate ledger project, because money-moving logic is the clearest way to feel concurrency problems.

## Batch 10: Docker, CI and Deployment (size L)

**Goal.** Package the whole stack so it runs with one command anywhere, prove every push with automated checks, and put the project on the internet.

**Why now.** This is where earlier "copy this command" notes get explained: the Postgres Docker command from Batch 3 and the Testcontainers use in Batch 8.

**Prerequisites.** Batch 9.

**Stack.** Docker, Docker Compose, GitHub Actions. The agent chooses one beginner-friendly hosting platform with a free or low-cost tier, verifies its current limits and instructions against its official docs when writing the lessons, and does not hardcode claims about pricing.

**History note (read-only).** The "works on my machine" problem, how virtual machines gave way to containers, and why continuous integration became a baseline expectation.

### Lessons, each with a mini-project

**10.1 What a container is (TAUGHT).** Image versus container, layers, and containers versus virtual machines, with a diagram. *Mini-project:* run a public image and explain what happened.

**10.2 Docker basics (TAUGHT).** `run`, `ps`, `logs`, `exec`, ports, volumes. Now he runs Postgres properly and understands why a volume keeps the data. *Break it on purpose:* remove a container without a volume and lose the data. *Mini-project:* Postgres with a named volume.

**10.3 A Dockerfile for the API (TAUGHT).** Base image (Node version checked against docs), layer order and caching, `.dockerignore`, a multi-stage build that compiles TypeScript and ships only what production needs, running as a non-root user. Manual first: a naive single-stage image, then the improved one with a before and after size comparison. *Mini-project:* the API image.

**10.4 Docker Compose (TAUGHT).** One file runs API, Postgres and the web app: services, networks, environment variables, volumes, and a health check so the API waits for a ready database (ties to `/ready` from 7.8). *Mini-project:* `docker compose up` starts the whole stack.

**10.5 Migrations and seeding in containers (TAUGHT).** `prisma migrate deploy` versus `migrate dev`, running migrations as a startup step or a separate job, and why seeding production is different from seeding development. *Mini-project:* a clean machine to a working stack in one command.

**10.6 Continuous integration with GitHub Actions (TAUGHT).** Workflow, jobs, steps, triggers, dependency caching. The workflow installs with `npm ci`, runs `tsc --noEmit`, ESLint and the full test suite from Batch 8. *Break it on purpose:* push a failing test and watch the check go red. *Mini-project:* a CI workflow with a status badge in the README.

**10.7 Building and publishing the image (TAUGHT).** CI builds the image on every push to the main branch and pushes it to a container registry. *Mini-project:* the build job.

**10.8 Deployment concepts (TAUGHT).** Platform-as-a-service versus renting a server, managed Postgres versus self-hosted, environment variables and secrets on a host, HTTPS and certificates, and pointing a domain at the app (callback to Module 0.8 and DNS). *Mini-project:* a one-page deployment plan for his app.

**10.9 Deploying the stack (TAUGHT).** Deploy the database, the API and the React app, set production environment variables, run migrations, confirm `/ready`, and fix the production-only problems (CORS origin, cookie `Secure` and `SameSite`, proxy IP). *Mini-project:* a live URL.

**10.10 Operating it (TAUGHT).** Reading production logs (pino from Batch 7), rolling back a bad deploy, zero-downtime deploys as a concept, backups as a concept, and what he would monitor. *Mini-project:* cause and fix a deliberate production failure.

### Used, not taught here

- Kubernetes and microservices. OUT OF SCOPE.

### Preview

- Scaling beyond one process (Batches 12 to 14). One sentence.

### Combined project: Bookmarks App, deployed with CI (PRJ10)

- Dockerfiles for API and web, and a Compose file for local development.
- A GitHub Actions workflow that checks, tests and builds on every push.
- A live deployment of the database, API and front end on a custom or platform URL.
- A README with a live link, a status badge, an architecture diagram and a "run it locally" section.

**Done when.** A recruiter can open the live link, register, and use the app. Pushing a broken commit turns CI red. A stranger can run the whole stack locally with one command.

### Checkpoint

- Explain image versus container and why volumes exist.
- Write a multi-stage Dockerfile and explain each stage.
- Explain what each step of his CI workflow does.
- Deploy the stack and diagnose a production-only failure.

### Common traps

- Baking secrets into an image or committing them.
- Running as root in the container.
- Forgetting that the database is ephemeral without a volume.
- A health check that passes before the database is actually ready.
- Cookie and CORS settings that work locally and break in production.
- Running migrations in a way that races with several app instances.

### Interview questions

- What is Docker, and what problem does it solve?
- What does a multi-stage build give you?
- What happens on every push in your CI pipeline?
- How do you handle secrets in production?
- How would you roll back a bad release?

### Git milestone

Tag `batch-10-complete`. **The course is job-ready here.** Update the resume and profile before continuing.

## Batch 11: Transactions and Concurrency (size M)

**Goal.** Understand what goes wrong when many requests touch the same data at once, and how to prevent it.

**Why now.** Transactions were met twice already (3.14 and 4.9) at a basic level. This batch deepens them, and it is the topic that most separates juniors from stronger candidates.

**Prerequisites.** Batch 4. Batch 10 helps but is not required.

**Domain.** A simple ledger (accounts and transfers) with no real money, which is OUT OF SCOPE for this course. It is a generic ledger, chosen because balance mistakes are obvious. Trading-specific features are decided later.

### Lessons, each with a mini-project

**11.1 Race conditions you can see (TAUGHT).** Fire many concurrent withdrawals at one account and watch the balance go wrong. *Mini-project:* a load script that reproduces the bug.

**11.2 ACID in depth (TAUGHT).** Atomicity, consistency, isolation, durability, each with one failure demo. *Mini-project:* a one-page explanation in his words.

**11.3 Isolation levels (TAUGHT).** Read committed, repeatable read, serializable, and the anomalies each allows or prevents (lost update, non-repeatable read, phantom read), shown with two `psql` sessions side by side. *Mini-project:* reproduce each anomaly by hand.

**11.4 Locking rows (TAUGHT).** `SELECT ... FOR UPDATE`, what it blocks, and the cost. Fix the 11.1 bug with a lock. *Mini-project:* the locked transfer.

**11.5 Optimistic concurrency (TAUGHT).** A version column, a conditional update, and retrying on conflict, compared with locking. *Mini-project:* version-checked updates through Prisma.

**11.6 Deadlocks (TAUGHT).** How two transactions block each other, how Postgres detects it, and the habit of locking in a consistent order. *Mini-project:* cause and fix a deadlock.

**11.7 Constraints as the last line of defense (REVISITED).** Check constraints and unique indexes that make an invalid state impossible no matter what the code does (callback to 3.4 and 3.12). *Mini-project:* a non-negative balance constraint.

**11.8 Idempotency keys (TAUGHT).** Why clients retry, how a stored key makes a repeated request safe, and where the key is checked. Callback to idempotency in 2B.3. *Mini-project:* a transfer endpoint that is safe to retry.

### Combined project: Ledger API (PRJ11)

Accounts, transfers and a statement endpoint, with a concurrency test suite.

- Transfers are atomic, never overdraw, and are safe to retry through idempotency keys.
- A load script and tests that fire hundreds of concurrent transfers and verify total money is unchanged.
- A write-up comparing pessimistic and optimistic approaches and when to choose each.

**Done when.** The concurrent load test passes every time and he can explain why the naive version failed.

### Checkpoint

- Explain a lost update and two ways to prevent it.
- Explain what each isolation level prevents.
- Explain how a deadlock occurs and how to avoid one.
- Explain what an idempotency key does.

### Common traps

- Read-then-write logic outside a transaction.
- Assuming the default isolation level protects against everything.
- Holding locks across slow operations or network calls.
- Locking rows in inconsistent order.
- Idempotency keys that are checked but not stored atomically.

### Interview questions

- What problems can occur when two requests update the same row?
- Optimistic versus pessimistic locking?
- What are the transaction isolation levels?
- How would you make a payment-style endpoint safe to retry?

### Git milestone

Tag `batch-11-complete`.

## Batch 12: Redis and Caching (size M)

**Goal.** Make reads faster and shared state possible, and learn the real trade-off: caches are fast and can be wrong.

**Why now.** The deployed app has measurable read cost, and the in-memory rate limiter from Batch 7 stops working the moment there are two server processes.

**Prerequisites.** Batch 10 (Docker Compose runs Redis).

**Stack.** Redis 8 in Docker with `ioredis`, the one client used throughout, because BullMQ in Batch 13 is built on it. Valkey is a wire-compatible fork and a PREVIEW line only.

### Lessons, each with a mini-project

**12.1 What Redis is (TAUGHT).** An in-memory data store, why memory is fast and what that costs (size, persistence), where it sits in the architecture. *Mini-project:* run Redis in Compose and use the CLI.

**12.2 Core data types and expiry (TAUGHT).** Strings, hashes, lists, sets, sorted sets, key naming, and TTL. *Mini-project:* a CLI exercise per type.

**12.3 `ioredis` from Node (TAUGHT).** Connecting, commands, JSON values, connection handling and shutdown (callback to 7.8). *Mini-project:* a small counter script.

**12.4 Cache-aside (TAUGHT).** Read from the cache, on a miss read the database and fill the cache. Measure the latency before and after with a simple benchmark. *Mini-project:* cache `GET /bookmarks/:id`.

**12.5 Invalidation (TAUGHT).** The hard part: when data changes, how stale is acceptable, TTL versus explicit deletion, and per-user cache keys so one person never sees another's data (callback to 6.8). *Break it on purpose:* serve stale data after an update. *Mini-project:* invalidate on create, update and delete.

**12.6 When caching goes wrong (TAUGHT).** Stampedes when many requests miss at once, caching errors, caching private data, and when not to cache. *Mini-project:* a written checklist applied to his routes.

**12.7 A shared rate limiter (REVISITED).** Replace the in-memory store from 7.4 with a Redis store so limits hold across several instances. *Mini-project:* two API instances sharing one limit.

**12.8 Other uses, briefly (PREVIEW).** Short-lived tokens, simple locks, leaderboards via sorted sets. One paragraph, no build.

### Combined project: Cached and rate-limited Bookmarks API (PRJ12)

- Redis in the Compose stack.
- Cache-aside on read-heavy routes with correct invalidation and per-user keys.
- A Redis-backed rate limiter shared across two API instances.
- A benchmark report showing latency and database query counts before and after.

**Done when.** The benchmark shows a real improvement, updates never serve stale data beyond what he chose to allow, and a second API instance shares the same limits.

### Checkpoint

- Explain cache-aside and write it.
- Explain why invalidation is hard and how he chose his strategy.
- Explain why an in-memory rate limiter fails with several instances.

### Common traps

- Caching per-user data under a shared key.
- No expiry, so memory grows forever.
- Forgetting to invalidate on every write path.
- Treating Redis as the source of truth.
- Caching before measuring that there is a problem.

### Interview questions

- Where would you add caching, and what could go wrong?
- What is cache invalidation and why is it called hard?
- Cache-aside versus write-through?
- Why use Redis for rate limiting?

### Git milestone

Tag `batch-12-complete`.

## Batch 13: Background Jobs and Queues (size M)

**Goal.** Move slow or scheduled work out of the request path, and make it reliable.

**Why now.** Some work must not make a user wait, and some work must happen on a schedule. Redis from Batch 12 is the foundation for the durable tool.

**Prerequisites.** Batch 12.

**Manual first, then better.** `setInterval`, then `node-cron`, then BullMQ.

### Lessons, each with a mini-project

**13.1 Why background work (TAUGHT).** What a slow request costs, work that can fail and retry, work that must run on a schedule. *Mini-project:* a deliberately slow endpoint and the timeout it causes.

**13.2 `setInterval` and its problems (TAUGHT).** The simplest scheduler, then its failures: lost on restart, overlapping runs, runs twice with two instances, no retry. *Break it on purpose:* start two instances and watch duplicate work. *Mini-project:* a periodic cleanup with `setInterval` and a list of its flaws.

**13.3 `node-cron` (TAUGHT, one new tool).** Cron expressions and scheduling by time, with the same remaining flaws. *Mini-project:* a nightly job.

**13.4 Queues and BullMQ (TAUGHT, one new tool).** The producer, queue, worker model (diagram), jobs stored in Redis, workers as a separate process. *Mini-project:* move the slow endpoint's work into a queue.

**13.5 Reliability (TAUGHT).** Retries with backoff, concurrency limits, delayed jobs, failed-job handling, and idempotent jobs so a retry is safe (callback to 11.8). *Break it on purpose:* make a job fail and watch the retries. *Mini-project:* a flaky job that eventually succeeds.

**13.6 Scheduled jobs on a queue (TAUGHT).** Repeatable jobs that run once even with several instances. *Mini-project:* replace the `node-cron` job.

**13.7 Safely fetching user-supplied URLs (TAUGHT).** Jobs that fetch URLs a user provided create a server-side request forgery risk: block private and local address ranges, set timeouts and size limits, limit redirects. *Mini-project:* a URL safety check with tests.

**13.8 Observing queues (TAUGHT).** Logging job lifecycle with request or job ids, counting failures, a status endpoint. *Mini-project:* job status API.

### Combined project: Link Checker (PRJ13)

A background system added to the Bookmarks App.

- A worker process that checks whether saved URLs still work, on demand and on a schedule.
- Retries with backoff, timeouts, and the safety checks from 13.7.
- Results stored per bookmark (status, last checked) and a status endpoint.
- The worker runs as its own service in Docker Compose.

**Done when.** Killing the worker mid-job loses nothing, a flaky site is retried, private addresses are refused, and two worker instances never do the same job twice.

### Checkpoint

- Explain why `setInterval` is not a job system.
- Explain producer, queue and worker.
- Explain why jobs must be idempotent.
- Explain what request forgery through user-supplied URLs is and how to prevent it.

### Common traps

- Doing slow work inside the request handler.
- Jobs that are not safe to run twice.
- Retrying forever with no backoff.
- Fetching user-supplied URLs without blocking internal addresses.
- Running the worker inside the web process.

### Interview questions

- How would you send an email or generate a report without blocking the request?
- What happens to a job if the worker crashes?
- What is backoff, and why use it?
- How do you make sure a scheduled job runs once with several servers?

### Git milestone

Tag `batch-13-complete`.

## Batch 14: Real-Time with WebSockets (size M)

**Goal.** Push data from the server to the browser the moment something happens.

**Why now.** The Link Checker finishes work in the background, and the user should see the result without refreshing.

**Prerequisites.** Batch 13 (for the live results), Batch 6 (for authentication).

**Manual first, then better.** `ws`, then Socket.IO.

### Lessons, each with a mini-project

**14.1 HTTP versus a persistent connection (TAUGHT).** Request and response versus an open channel, with polling and server-sent events as the stepping stones. *Mini-project:* a polling version of live results and its costs.

**14.2 WebSockets with `ws` (TAUGHT).** The handshake, messages, connection lifecycle, a tiny echo and broadcast server. *Mini-project:* a chat-style echo server.

**14.3 The manual problems (TAUGHT).** Heartbeats to detect dead connections, grouping connections into rooms by hand, reconnecting clients, message formats. *Break it on purpose:* drop a connection silently. *Mini-project:* heartbeat and room bookkeeping by hand.

**14.4 Authenticating a socket (TAUGHT).** Connections cannot send arbitrary headers from a browser, so authenticate during or right after the handshake, and never trust a message just because the socket is open. Callback to 6.5 and 6.9. *Mini-project:* authenticated connections only.

**14.5 Socket.IO (TAUGHT, one new tool).** What it adds over raw `ws`: rooms, acknowledgements, automatic reconnection, fallbacks. Compare line counts with the manual version. *Mini-project:* the same app in Socket.IO.

**14.6 A React client (REVISITED).** A hook that connects, handles reconnect, and updates TanStack Query's cache when events arrive. *Mini-project:* live updates in the UI.

**14.7 Scaling beyond one server (PREVIEW).** Why a message to a user on another server instance needs a shared channel, with Redis as the usual answer. One paragraph, no build.

### Combined project: Live Link Checker (PRJ14)

- When a background check finishes, the user's open browser tabs update immediately, with no refresh and no polling.
- Socket connections are authenticated and rooms are per user, so nobody receives another person's events.
- Reconnection works after the network drops.

**Done when.** Two tabs for the same user both update live, a different user's tab never does, and a dropped connection recovers by itself.

### Checkpoint

- Explain WebSockets versus polling versus server-sent events.
- Authenticate a socket connection.
- Explain what Socket.IO adds over raw `ws`.

### Common traps

- Trusting any message on an open socket.
- No heartbeat, so dead connections pile up.
- Broadcasting to everyone instead of the right room.
- Forgetting that more than one server instance breaks naive broadcasting.

### Interview questions

- When would you use WebSockets instead of polling?
- How do you authenticate a WebSocket connection?
- How would you scale a WebSocket server beyond one instance?

### Git milestone

Tag `batch-14-complete`.

## Batch 15: AI in the Backend (size M)

**Goal.** Add an AI feature the right way: keys stay on the server, outputs are validated, and costs and abuse are controlled.

**Why now.** Many teams now expect backend developers to integrate AI features safely. He already has validation, auth, rate limiting and queues, which is exactly what this needs.

**Prerequisites.** Batches 5, 6, 7 and 13.

**Stack.** `@anthropic-ai/sdk` for the Messages API, streaming, tool use and structured outputs with Zod. The agent verifies SDK usage, current model identifiers and limits against the official documentation when writing the lessons, and does not hardcode model names from memory.

### Lessons, each with a mini-project

**15.1 Calling a model from the server (TAUGHT).** The Messages API, roles, system prompt, parameters, tokens, and why the API key lives only on the server and never in the front end (callback to 9.7). *Mini-project:* a script that asks one question.

**15.2 Streaming (TAUGHT).** Why streaming improves perceived speed, streaming to the browser with server-sent events, handling a closed connection. *Mini-project:* a streamed answer in the UI.

**15.3 Structured output with Zod (TAUGHT).** Ask for JSON, validate with a Zod schema (the same discipline as request validation), and handle the case where output does not match. *Break it on purpose:* make the model return something off-schema and handle it. *Mini-project:* suggest tags for a bookmark as validated JSON.

**15.4 Tool use (TAUGHT).** Let the model call functions in his code, the loop of request, tool call, tool result and final answer, and why tools must enforce the current user's permissions themselves (callback to 6.8). *Mini-project:* a "search my bookmarks" tool scoped to the logged-in user.

**15.5 Safety, cost and abuse (TAUGHT).** Prompt injection from saved web content, never giving a tool more power than the user has, per-user rate limits and spending limits, timeouts and retries, and logging without leaking personal data. *Mini-project:* a threat note for the feature.

**15.6 Running it as a background job (REVISITED).** Use the queue from Batch 13 for slow enrichment so the request returns immediately. *Mini-project:* enrichment as a queued job.

**15.7 Checking quality (TAUGHT).** A small set of example inputs with expected properties, run before and after prompt changes, and why AI features need tests that tolerate variation. *Mini-project:* a ten-case evaluation script.

### Combined project: Smart Bookmarks (PRJ15)

- Saving a link queues enrichment: a short summary and suggested tags, validated against a Zod schema.
- A streamed "ask about my bookmarks" chat that uses a tool scoped to the current user.
- Per-user limits, safe handling of fetched content, and an evaluation script.

**Done when.** The feature works, one user's data never reaches another through the tool, malformed model output never crashes a request, and he can explain the risks he designed against.

### Checkpoint

- Explain why API keys never go to the browser.
- Validate model output like any untrusted input.
- Explain tool use and its permission risk.
- Explain prompt injection in the context of fetched content.

### Common traps

- Putting the API key in front-end code.
- Trusting model output as if it were validated data.
- Giving a tool broader data access than the user has.
- No per-user limits, so one user spends the budget.
- Treating fetched web pages as trusted instructions.

### Interview questions

- How would you add an AI feature to an existing app safely?
- What is prompt injection and how do you reduce the risk?
- How do you handle model output that does not match the expected format?
- How do you control cost?

### Git milestone

Tag `batch-15-complete`.

## Resume map: what each milestone is worth

| After | What he can honestly say | Resume value |
| --- | --- | --- |
| Batch 2B | "I built a REST API with Express and TypeScript." | First CRUD app, in memory |
| Batch 4 | "A database-backed REST API with PostgreSQL and Prisma." | **First resume-ready project** |
| Batch 6 | "Secured multi-user API with JWT, refresh tokens and ownership checks." | Strong, interview-ready |
| Batch 8 | "Tested against a real database." | Marks him as careful |
| Batch 9 | "Full-stack app with React and my own API." | **Flagship project** |
| Batch 10 | "Dockerized, CI-checked and deployed." | **Job-ready.** Start applying here |
| Batches 11 to 15 | Concurrency, caching, queues, real-time, AI | Depth that sets him apart |

## Open decisions, left for later

- A final capstone. A trading-related idea is one candidate, since the domain is a strength. This is decided after the batches are settled, and real money and payments stay out of scope.
- Whether to reorder Batches 11 to 15 after seeing which interviews he gets.
- The exact hosting platform, chosen by the agent at build time from current official docs.

## End of the series

This completes the six-part roadmap: Part 1 (guide, Module 0, Batch 1), Part 2 (Batches 2A and 2B), Part 3 (Batches 3 and 4), Part 4 (Batches 5 and 6), Part 5 (Batches 7 to 9), Part 6 (Batches 10 to 15).
