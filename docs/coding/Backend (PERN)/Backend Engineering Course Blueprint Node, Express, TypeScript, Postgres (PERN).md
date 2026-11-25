# Backend Engineering Course Blueprint: Node, Express, TypeScript, Postgres (PERN)

Prepared Nov 23, 2026 for Pravin. Self-paced. Prerequisite: React with TypeScript.

## How to read this blueprint

This is the full specification for a self-paced backend course. The course-building agent turns each batch into lessons, adds no topic that is not listed, drops none, and never uses a concept before this blueprint says it was taught.

### The five tags

Every concept in every batch carries one of these tags. The tags are how the blueprint answers "is X taught here, or only used?"

| Tag | Meaning | What the course does with it |
| --- | --- | --- |
| TAUGHT | A full lesson: why it exists, mental model, smallest example, build, break it on purpose, exercise | Own lesson, own checkpoint item |
| USED | Appears in code the learner types, with one or two sentences of explanation and no lesson. Always names where it is taught, or says "never taught" | A boxed note in the lesson: "Used, not taught. Treat as a black box for now. Taught in Batch N" |
| REVISITED | Taught earlier, applied again in a new setting | Short recap line, no re-teaching |
| PREVIEW | The name is mentioned once so the learner is not surprised later. One sentence, no code | A single line in a recap or roadmap box |
| OUT OF SCOPE | Deliberately excluded from this course | The agent must not add it |

### Course rules

1. **Taught before used.** A concept may appear in code only after its TAUGHT lesson, or if it is tagged USED with a pointer. The concept ledger near the end lists the lesson that teaches each concept and the first lesson that uses it. The agent checks the ledger before finalizing every lesson.
2. **Manual first, then the better tool.** The learner feels the problem before meeting the library. Examples: Node's raw `http` module before Express, raw SQL before Prisma, hand-written validation before Zod, `setInterval` before node-cron before BullMQ.
3. **One new idea at a time.** No lesson introduces more than one new tool name and two or three new concepts. Naming future tools in passing is banned except as a PREVIEW line. The learner has said that many new names at once make him lose the thread.
4. **He types it himself.** The learner built earlier projects with heavy AI help and now wants to build by himself. Exercises give tiered hints (nudge, hint, near-solution) and show the solution last. AI is for review after he has written his own first version, never for the first draft.
5. **Lesson shape.** Why it exists, mental model (a diagram where there is a flow), smallest working example, build it, break it on purpose, exercise, three-line recap.
6. **Projects.** Every batch has its own project, named in the batch, with one teaching goal. A project may upgrade the one before it, and small exercises sit inside the lessons. There is no capstone for now.
7. **TypeScript ramp.** Strict mode from day one, but types stay simple (basic types, interfaces, unions, `async` return types) until Batch 5. Generics are USED as given from Batch 2 (typing `Request` params) and TAUGHT in Batch 5.
8. **Versions.** Versions named here were checked on the as-of date. The agent re-verifies every version and every API detail against official docs when it writes the lessons, and writes install commands from those docs.
9. **Every batch ends the same way.** A can-do checkpoint the learner passes without help, a list of common traps, interview questions, and a git commit or tag.
10. **Self-paced.** No dates. Batches carry a relative size (S, M, L). The learner moves on when the checkpoint passes.

### Per-batch template

Each batch below follows the same fields, in this order: goal, why it exists, prerequisites (concepts taught earlier), lessons (numbered like 3.4) with tags, USED but not taught, PREVIEW, small exercises inside lessons, the batch project, checkpoint, common traps, interview questions.

### Numbering

Lessons are `batch.number` (3.4). Each batch project is `PRJ3`, and small exercises inside a lesson are `EX3.2`.

## Learner, stack decisions and build path

The course takes a React and TypeScript developer to a backend engineer who can build, secure, test, deploy and scale a Node API. Every batch has its own project. A final capstone, if any, is decided later. Everything is TypeScript, PostgreSQL and Node.

### Learner profile

**Already knows** (from his React roadmap, so tagged REVISITED or USED in this course): React with TypeScript, Vite, Tailwind, React Hook Form with Zod, TanStack Query, React Router, Context, Zustand, Redux Toolkit. He has also touched Next.js (server actions, auth), a MongoDB CRUD app, Prisma and Drizzle with Postgres, and a FastAPI scanner that read Upstox data. All of it was built with heavy AI help, so none of it counts as understood.

**Does not know:** how a backend is set up from zero, how HTTP really works, how front end and back end run together, SQL by hand, transactions, Redis, queues, server-side WebSockets, containers, deployment.

**Works best when:** the pace is his own, each lesson brings one new idea, he types the code himself, and he can see why a thing exists before using it. He knows trading, so the domain is a strength and the engineering is the gap.

### Stack decisions

Versions were checked on 23 November 2026. The agent re-verifies each one against official docs when writing lessons.

| Layer | Choice | Why |
| --- | --- | --- |
| Runtime | Node.js 26, LTS since October 2026 (Node 24 also fine) | Current LTS. Node 27 onward moves to one release a year, so the course stays stable for months |
| Language | TypeScript 6.x, strict | 6.0 shipped in March 2026 as the bridge to the native-compiler 7.0. The concepts do not change between them |
| Running TypeScript | Node's built-in type stripping: `node --watch src/server.ts`, with `tsc --noEmit` for checking and `tsc` to build for production | No extra tool to learn, which fits the one-new-idea rule. Node removes types without checking them. Limits: erasable syntax only (no `enum`, `namespace`, constructor parameter properties), `.ts` in import paths, `import type`. Fallback if a library fights it: `tsx` |
| Web framework | Express 5 | Most-used Node framework. Version 5 forwards errors from async handlers automatically and changes route path syntax |
| Database | PostgreSQL 18 | Real transactions, constraints, exact decimals. PostgreSQL 19 was at release-candidate stage in October 2026 |
| ORM | Prisma 7, pinned as `prisma@7` | Prisma 8 is `prisma@latest` but still a release candidate with breaking changes between candidates. Prisma 7 stays supported for 18 months after Prisma 8 is generally available. Concepts (schema, migrations, client, transactions) transfer. The agent checks whether 8 is GA at build time |
| Validation | Zod 4 | Already known from React forms. Shared schemas between front end and back end |
| Passwords | Argon2id via the `argon2` package | OWASP's first recommendation. bcrypt is taught as the legacy option |
| Tokens | Short-lived JWT access token plus opaque rotating refresh token in an httpOnly cookie, via `jose` | Standard pattern. The refresh token is stored hashed in Postgres so it can be revoked |
| Cache and queues | Redis 8 in Docker, one client library (`ioredis`) | BullMQ is built on ioredis, so using it everywhere avoids learning two clients. Valkey is wire-compatible and is only a PREVIEW note |
| Background jobs | `setInterval` first, then node-cron, then BullMQ | Feel the problem, then take a durable queue |
| Real-time | `ws` first, then Socket.IO | Feel the manual problems (heartbeats, rooms, reconnect), then take the library |
| Testing | Vitest 4, Supertest 7, Testcontainers for Postgres | Real database in tests, not mocks |
| Hardening and logs | helmet, cors, express-rate-limit, pino | Standard Express set |
| Packaging | npm and npm workspaces, runtime stays Node | Every tool's docs show npm. Bun commands are equivalent but Bun as a runtime is out of scope |
| Delivery | Docker, Docker Compose, GitHub Actions | One command to run the whole stack, and CI that proves it |
| AI | `@anthropic-ai/sdk`: Messages API, streaming, tool use, structured outputs with Zod | Covers every AI lesson in Batch 15 |

### How the batches connect

Each batch has its own project, built to teach that batch only. Some projects upgrade the one before, the way the To-Do app grew in the React roadmap: the in-memory Bookmarks API in Batch 2 becomes a Postgres-backed API in Batch 4 and a layered, validated one in Batch 5. The rest start fresh. There is no capstone for now. It is decided after the batches are settled, and a trading idea is one candidate.

### Out of scope

Real money or payments, NestJS, GraphQL, microservices and Kubernetes, and Bun as a runtime. Trading-specific features and any capstone are decided later.

## Module 0: How the Web and a Backend Work (size S, no project)

**Goal.** Build the mental model every later batch hangs on, before any backend code. **Why now.** The learner has called `fetch` from React but has never seen the other side of the request. **Prerequisites.** The React roadmap, and basic comfort in the terminal.

### Lessons

| # | Concept | Tag | Exercise |
| --- | --- | --- | --- |
| 0.1 | What a backend is: client, server, request, response | TAUGHT | Draw the journey of liking a post in a React app, ending at a database |
| 0.2 | URLs, ports, `localhost`, DNS in one picture | TAUGHT | Take five real URLs apart into scheme, host, port, path, query |
| 0.3 | HTTP messages: methods, status codes, headers, body | TAUGHT | Read raw requests in the browser Network tab and with `curl -v` |
| 0.4 | JSON and `Content-Type` | TAUGHT | Send the same data as JSON and as form data with curl and compare |
| 0.5 | REST thinking: resources, nouns, verbs | TAUGHT | Turn five app actions into method plus path |
| 0.6 | Where data travels: path, query, headers, body, cookies | TAUGHT | For ten pieces of data, choose where each goes and say why |
| 0.7 | Node in one picture: what it is, single thread, the event loop | TAUGHT | Predict the output order of a ten-line timer snippet, then run it |
| 0.8 | Tool setup: Node 26, VS Code, an API client (Bruno or Postman), curl, Git | TAUGHT | Run `node --version`, run a one-line script, call a public API |

### Used, not taught here

- Terminal navigation, Git commit and push, VS Code. Never taught, assumed from the React roadmap.

### Preview

- CORS (Batch 2), databases (Batch 3), cookies and sessions (Batch 6), a front end and back end side by side (Batch 9). One sentence each, no code.

### Project

None. The module ends with a one-page hand-drawn diagram of the full request journey, from a click in React to a row in a database and back.

### Checkpoint

- Draw the request journey from memory and label every hop.
- Read a raw HTTP request and say the method, path, headers and body.
- Say what 200, 201, 204, 400, 401, 403, 404, 409 and 500 mean without looking.
- Explain in plain words what the event loop does and why a slow loop freezes a server.
- `node --version` prints the LTS version and an API client call succeeds.

### Common traps

- Thinking the backend runs in the browser or inside React.
- Mixing up 401 (who are you) and 403 (you may not).
- Treating `localhost:3000` and `localhost:5173` as the same origin.
- Believing Node uses one thread per request.

### Interview questions

- What happens between typing a URL and seeing the page?
- GET versus POST versus PUT versus PATCH versus DELETE: when and why?
- What does idempotent mean, and which methods are?
- What is the event loop?
- Where can data travel in an HTTP request, and which place suits which data?

## Batch 1: Node.js and TypeScript Foundations (size M)

**Goal.** Write, run, type-check and debug TypeScript on Node with no framework. **Why now.** Everything after this is Node code, so modules, the event loop and the process model must feel normal first. **Prerequisites.** Module 0, and TypeScript basics from the React roadmap (types, interfaces, unions).

### Lessons

| # | Concept | Tag | Exercise |
| --- | --- | --- | --- |
| 1.1 | Project setup: `npm init`, `package.json`, scripts, `type: module` | TAUGHT | Start from an empty folder and add `dev` and `check` scripts |
| 1.2 | `tsconfig.json` for Node: `strict`, `module: nodenext`, `noEmit`, `erasableSyntaxOnly`, `verbatimModuleSyntax` | TAUGHT | Toggle each flag and read the error it produces |
| 1.3 | Running TypeScript: `node file.ts`, `node --watch`, `tsc --noEmit`, what type stripping does and skips | TAUGHT | Write a type error, show Node still runs it, show `tsc` catching it |
| 1.4 | ES modules in Node: `import` and `export`, `.ts` in import paths, `import type`, the `node:` prefix | TAUGHT | Split one script into three modules |
| 1.5 | Backend TypeScript: `unknown` versus `any`, narrowing, literal and union types, `readonly`, `satisfies`, type guards | TAUGHT (basic types REVISITED) | Turn untrusted JSON into a typed value with a type guard |
| 1.6 | Async code: callbacks, promises, `async` and `await`, `Promise<T>`, `try` and `catch` | REVISITED, then TAUGHT for Node | Rewrite a callback API with promises |
| 1.7 | The event loop in practice: blocking, timers, microtasks, `setImmediate` | TAUGHT | Freeze the loop with a CPU-heavy loop and measure the lag |
| 1.8 | Time: `Date`, ISO 8601, UTC, time zones, `Intl.DateTimeFormat` | TAUGHT | Parse and print the same instant in UTC and Asia/Kolkata |
| 1.9 | Files and paths: `node:fs/promises`, `node:path`, `node:os`, `import.meta` | TAUGHT | Read, write, list and watch a directory |
| 1.10 | Streams: line-by-line reading with `node:readline`, memory versus speed, the idea of backpressure | TAUGHT | Count lines in a 1 GB file using under 100 MB of RAM |
| 1.11 | `process`: `argv`, `env`, exit codes, stdin, stdout, stderr, signals; `parseArgs` from `node:util` | TAUGHT | Build a CLI with two flags that exits 1 on bad input |
| 1.12 | Environment variables: `node --env-file`, `.env.example`, never committing secrets | TAUGHT | Load config and fail fast when a variable is missing |
| 1.13 | Errors: `Error`, custom classes, `cause`, unhandled rejections | TAUGHT | Create three error types and decide how each is handled |
| 1.14 | npm in depth: dependencies versus devDependencies, lockfile, semver, `npm ci`, `npx`, `npm audit` | TAUGHT | Install, upgrade and remove a package and read the lockfile diff |
| 1.15 | Debugging: `console` methods, the VS Code debugger, `--inspect`, breakpoints | TAUGHT | Find a planted bug using only breakpoints |
| 1.16 | Code quality: ESLint and Prettier for Node, editor integration, a `check` script | REVISITED | Add both and clear every warning |

### Used, not taught here

- The sample log generator script. It is provided by the course and treated as a black box. Never taught.
- Test tools. Not used in this batch, so no test appears until Batch 8.

### Preview

- Frameworks (Batch 2), testing (Batch 8), containers (Batch 10).

### Project: Log Analyzer CLI (PRJ1)

A command-line tool that reads a web-server log and prints a report.

- Input: a log file path. The course provides a script that generates 10,000 to 1,000,000 lines of realistic log data.
- Parse each line into a typed record: timestamp, method, path, status, duration in milliseconds. Count and skip malformed lines, then report how many there were.
- Report: total requests, requests per status class (2xx, 3xx, 4xx, 5xx), top 10 paths, p50 and p95 duration, the 5 slowest requests, requests per minute.
- Flags: `--since`, `--until` (ISO timestamps, time zone aware), `--format table` or `--format json`, `--top N`.
- Reads as a stream. A 1,000,000-line file stays under 100 MB of RAM.
- Exit codes: 0 success, 1 usage error, 2 unreadable file.
- At least five modules. Passes `tsc --noEmit` and ESLint.

**Done when.** The report is correct on a file with deliberately malformed lines, the memory limit holds, and the learner can explain where the event loop is and is not blocked.

### Checkpoint

- Start a TypeScript Node project from nothing and run it with `node --watch`.
- Explain what type stripping removes and what `tsc --noEmit` adds.
- Predict the order of output for timers, promises and `process.nextTick`.
- Read a large file without loading it all into memory.
- Write a CLI that validates its arguments and sets meaningful exit codes.

### Common traps

- Believing Node type-checks TypeScript. It only strips types.
- Forgetting `.ts` in import paths or `import type` for types.
- Using `fs.readFileSync` on a huge file.
- Using `any` to silence an error instead of narrowing `unknown`.
- Swallowing errors with an empty `catch`.

### Interview questions

- What is the event loop, and what blocks it?
- Explain microtasks versus macrotasks.
- CommonJS versus ES modules in Node.
- What are streams and why do they matter?
- `unknown` versus `any`?

## Batch 2: HTTP and Express (size L)

**Goal.** Build a working CRUD API with Express 5, understanding what Express does for you by writing the same server without it first. **Why now.** This is the first backend a React app can call. **Prerequisites.** Module 0 and Batch 1.

### Lessons

| # | Concept | Tag | Exercise |
| --- | --- | --- | --- |
| 2.1 | A server with `node:http`: `createServer`, `req`, `res`, status, headers, ending a response | TAUGHT | Serve `GET /health` returning JSON |
| 2.2 | Manual routing and body parsing: branch on method and URL, read the body stream, `JSON.parse` safely | TAUGHT | Build three item routes by hand and feel the repetition |
| 2.3 | Express 5 first server: `express()`, `app.listen`, `app.get`, `res.json` | TAUGHT | Port the raw server to Express and count the lines saved |
| 2.4 | Routing: methods, route params, query strings, `express.Router`, Express 5 path rules (named wildcards, `{/:id}` for optional parts) | TAUGHT | Split routes into a router mounted at `/bookmarks` |
| 2.5 | Request and response API: `req.params`, `req.query`, `req.body`, `res.status().json()`, `res.set`, `res.sendStatus` | TAUGHT | An echo endpoint that reports everything it received |
| 2.6 | Middleware: the pipeline, order, `next()`, `express.json()` and its size limit | TAUGHT | Reorder middleware and watch behavior change |
| 2.7 | Custom middleware: request logger, timing, request id | TAUGHT | Log method, path, status and duration for every request |
| 2.8 | Error handling: four-argument error middleware, async errors forwarded automatically in Express 5, a 404 handler | TAUGHT | Throw inside an async handler and get a clean JSON error |
| 2.9 | Manual validation: checking types, lengths and formats with `if`, one consistent error shape | TAUGHT | Validate a bookmark payload by hand and list what is awkward |
| 2.10 | REST API design: plural nouns, status codes (200, 201, 204, 400, 404, 409, 422), PUT versus PATCH, idempotency, the `Location` header | TAUGHT | Design the endpoint table for a library app on paper |
| 2.11 | Lists done right: pagination, filtering, sorting, search through query parameters, caps on page size | TAUGHT | Add `tag`, `q`, `limit` and `page` to the list endpoint |
| 2.12 | IDs and timestamps: `crypto.randomUUID()`, `createdAt`, `updatedAt`, ISO strings | TAUGHT | Generate and sort by them |
| 2.13 | CORS: the same-origin policy, why browsers block, preflight, the `cors` package, an allowed origin | TAUGHT | Call the API from a Vite app on another port and fix the error |
| 2.14 | API client habits: Bruno or Postman collections, environments, saved examples, the curl equivalent | TAUGHT | Commit a collection covering every endpoint |
| 2.15 | Project layout: `app.ts` builds the app, `server.ts` starts it, so tests can import the app later | TAUGHT | Split a single-file server into the two files |

### Used, not taught here

- Typing a handler with `Request<Params, ResBody, ReqBody, Query>` from `@types/express`. Shown as a boxed copy-this pattern. Generics are taught in Batch 5 (5.3, 5.6).
- `cors` options beyond the allowed origin. Taught in Batch 7 (7.5).

### Preview

- Validation with Zod (Batch 5), a real database (Batches 3 and 4), authentication (Batch 6), the React app calling this API for real (Batch 9).

### Project: Bookmarks API v1, in memory (PRJ2)

The first working CRUD.

- A bookmark is `id`, `url`, `title`, optional `note`, `tags` (array of strings), `createdAt`, `updatedAt`. Stored in an in-memory `Map`. Restarting the server loses everything, and that is part of the lesson.
- Endpoints: `POST /bookmarks`, `GET /bookmarks` (filters `tag`, `q`, paging `limit` and `page`), `GET /bookmarks/:id`, `PUT /bookmarks/:id`, `PATCH /bookmarks/:id`, `DELETE /bookmarks/:id`.
- Manual validation: the URL must parse with `new URL`, title is 1 to 200 characters, at most 10 tags. Errors use one shape: `error` with `code`, `message` and optional `details`.
- Request logger, 404 handler, error handler, CORS for `http://localhost:5173`.
- A Bruno collection with an example for every endpoint and every error.
- A five-line written comparison: what the raw `http` version needed versus Express.

**Done when.** The React app from the roadmap can list and add bookmarks through `fetch`, the learner can state the status code and the reason for every response, and a restart wipes the data and the learner can say why.

### Checkpoint

- Build a CRUD API from an empty folder in under an hour without looking anything up.
- Say what middleware is and why order matters.
- Choose the right status code for create, update, delete, bad input, missing item and duplicate.
- Explain CORS and fix a blocked request.
- Explain the difference between `req.params`, `req.query` and `req.body`.

### Common traps

- Forgetting `express.json()` and getting an undefined body.
- Sending two responses from one handler.
- Using `200` for everything.
- Disabling CORS with a wildcard and never fixing it.
- Putting the error handler before the routes.
- Trusting `req.query` values to be strings only. They can be arrays.

### Interview questions

- What is middleware in Express?
- PUT versus PATCH.
- Which HTTP methods are idempotent?
- How does Express handle errors in async routes in version 5?
- What is a CORS preflight request?

## Batch 3: PostgreSQL and SQL by Hand (size M)

**Goal.** Design a schema and answer real questions with SQL before any ORM exists. **Why now.** The in-memory API loses data on restart. The learner must understand tables, constraints and queries first, so that the ORM in Batch 4 is a convenience and not magic. **Prerequisites.** Batch 2.

### Lessons

| # | Concept | Tag | Exercise |
| --- | --- | --- | --- |
| 3.1 | Why a database, the relational model: tables, rows, columns, keys | TAUGHT | Model a class roster on paper |
| 3.2 | Running PostgreSQL 18 and connecting with `psql` and a GUI client | TAUGHT | Create a database and list its tables |
| 3.3 | Data types: `text`, `integer`, `bigint`, `numeric`, `boolean`, `timestamptz`, `uuid`, `jsonb`, enums. Why not `float` for money, why `timestamptz` | TAUGHT | Store the same value in three types and compare |
| 3.4 | `CREATE TABLE` and constraints: `PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`, `FOREIGN KEY` | TAUGHT | Break each constraint on purpose and read the error |
| 3.5 | `INSERT`, `SELECT`, `UPDATE`, `DELETE`, `WHERE`, `ORDER BY`, `LIMIT`, `OFFSET` | TAUGHT | Run CRUD on one table entirely in SQL |
| 3.6 | Filtering: `AND`, `OR`, `IN`, `BETWEEN`, `LIKE`, `ILIKE`, and how `NULL` behaves | TAUGHT | Predict ten query results with `NULL`s in them, then run them |
| 3.7 | Aggregates: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`, `HAVING` | TAUGHT | Build a per-month summary report |
| 3.8 | Relationships: one-to-many, many-to-many through a join table, one-to-one | TAUGHT | Model books and authors |
| 3.9 | Joins: `INNER`, `LEFT`, self joins, and why `RIGHT` and `FULL` are rare | TAUGHT | Find members who never borrowed anything |
| 3.10 | Subqueries, CTEs with `WITH`, `UNION` | TAUGHT | Rewrite a nested query as a CTE |
| 3.11 | Window functions: `ROW_NUMBER`, `RANK`, running totals | TAUGHT | Rank the most borrowed books per genre |
| 3.12 | Indexes: B-tree, when they help, composite and unique indexes, the cost of writing, `EXPLAIN ANALYZE` | TAUGHT | Make a slow query fast and show the plan before and after |
| 3.13 | Normalization to third normal form in plain words, and when to denormalize | TAUGHT | Fix a deliberately badly designed table |
| 3.14 | Transactions, first look: `BEGIN`, `COMMIT`, `ROLLBACK`, ACID in plain words | TAUGHT (deepened in Batch 11) | Roll back a half-finished transfer by hand |
| 3.15 | Migrations by hand: numbered SQL files run in order | TAUGHT | Evolve a schema across three migration files |
| 3.16 | SQL from Node with the `pg` driver: `Pool`, parameterized queries (`$1`), a SQL injection demo | TAUGHT | Show an injection attempt succeeding on string concatenation and failing on parameters |
| 3.17 | Connection pooling: why a server reuses connections | TAUGHT | Compare per-request connections with a pool under load |

### Used, not taught here

- `docker run` or a given Compose file to start Postgres. Shown as a copy-this command. Taught properly in Batch 10 (10.2). A native Postgres installer is the fallback for anyone who cannot use Docker yet.
- A GUI client such as DBeaver or pgAdmin. Shown, not taught.

### Preview

- ORMs and Prisma (Batch 4), row locking (Batch 11), full-text search (not covered in this course).

### Project: Library Database, SQL only (PRJ3)

A complete lending-library database built in SQL files, with one small Node script at the end.

- Schema: members, authors, books, `book_authors` (many-to-many), copies, loans, fines. Foreign keys, checks, defaults, and enums or lookup tables where they fit.
- A partial unique index so one physical copy cannot be on two active loans at once.
- Three numbered migration files and a seed script generating a few thousand rows.
- Twenty questions answered in SQL, covering joins, aggregates, CTEs and a window function. Includes an overdue-loans report and a most-borrowed-per-genre ranking.
- Two slow queries fixed with indexes, shown with `EXPLAIN ANALYZE` before and after.
- A Node script using `pg` that runs a parameterized search and a failed injection attempt.

**Done when.** Every question returns correct rows against the seed data, the double-loan case is rejected by the database itself, and the learner can read an `EXPLAIN` plan and say whether it uses an index.

### Checkpoint

- Design a normalized schema for a small app on paper, then write it as SQL.
- Write a three-table join with a filter and a grouping from memory.
- Explain when an index helps and when it hurts.
- Explain what a transaction guarantees.
- Explain why string-built SQL is dangerous and what fixes it.

### Common traps

- Comparing with `= NULL` instead of `IS NULL`.
- Using `float` for money, or `timestamp` without a time zone.
- Missing foreign key indexes, which makes joins slow.
- `OFFSET` pagination over large tables.
- Forgetting `WHERE` on an `UPDATE` or `DELETE`.

### Interview questions

- Inner join versus left join.
- What is an index and what does it cost?
- What is normalization?
- What does ACID stand for?
- What is SQL injection and how is it prevented?

