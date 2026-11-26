# Backend Course Roadmap, Part 2 of 6

Batch 2A (Express basics) and Batch 2B (RESTful API design) · Prepared November 26, 2026 for Pravin

The rules, tags, stack and versions are in Part 1. The building agent must read Part 1 first and obey it. This part adds only Batches 2A and 2B.

## Batch 2 overview

Batch 2 is the first time Pravin builds something a React app can call. It is split in two so that REST gets its own named section, like a first-class topic.

- **2A: Express basics.** How a server works, first by hand with Node's `http` module, then with Express 5. Ends with a small Express server that uses every core feature.
- **2B: RESTful API design.** How to design a clean API: resources, status codes, validation, pagination, CORS. Ends with the Bookmarks API v1, his first CRUD application.

**Prerequisites.** Module 0 and Batch 1 (modules, async, errors, environment variables).

**History note for the whole batch (read-only).** Why Express exists (Node's raw server makes you write the same plumbing over and over). Why Express 4 needed manual error forwarding in async routes and Express 5 does it for you. Why `body-parser` became the built-in `express.json()`. One PREVIEW line that other frameworks exist (Fastify, Hono) and that Express is still the most common in job listings.

## Batch 2A: Express Basics (size M)

**Goal.** Understand what Express does for him by writing the same server without it first, then build a small Express app that uses routing, middleware and error handling correctly.

**Why now.** This is the first backend he can call from the browser. Doing the raw version first means Express never feels like magic.

### Lessons, each with a mini-project

**2A.1 A server with `node:http` (TAUGHT).** `createServer`, the `req` and `res` objects, status code, headers, ending a response, listening on a port. Mental model diagram: request arrives, callback runs, response leaves. *Break it on purpose:* forget `res.end()` and watch the client hang; send two responses and read the error. *Mini-project:* `raw-health`, a server where `GET /health` returns JSON `{ status: "ok" }` with the right `Content-Type`.

**2A.2 Manual routing and body parsing (TAUGHT).** Branch on `req.method` and `req.url`, read the request body as a stream of chunks, `JSON.parse` safely inside `try` and `catch`, return 400 on bad JSON. The point of this lesson is the feeling: it is repetitive, and every route repeats the same parsing and header code. *Mini-project:* `raw-items`, three item routes written by hand (list, create, get by id). He writes a short note listing what felt painful.

**2A.3 Express first server (TAUGHT).** `express()`, `app.listen`, `app.get`, `res.json`. Ports `raw-items` to Express and counts the lines saved. Tool name introduced: Express only. Install command and version taken from the official docs at build time. *Mini-project:* `express-items`, the same three routes in Express.

**2A.4 Routing (TAUGHT).** Methods, route parameters, query strings, `express.Router`, mounting a router at a prefix. Express 5 path rules: named wildcards, and `{/:id}` style optional segments, which differ from Express 4. Route order matters (first match wins). *Break it on purpose:* put a catch-all route above a specific one. *Mini-project:* split routes into a router mounted at `/items`.

**2A.5 The request and response API (TAUGHT).** `req.params`, `req.query`, `req.body`, `req.get`, `res.status().json()`, `res.set`, `res.sendStatus`. Trap to show live: `req.query` values can be strings, arrays or nested objects, never trust them to be a single string. *Mini-project:* `echo`, an endpoint that reports everything it received (method, path, params, query, headers, body).

**2A.6 Middleware (TAUGHT).** The pipeline model: a request passes through functions in order, each calls `next()` or ends the response. `app.use`, order, `express.json()` and its size limit, why `req.body` is `undefined` without it. Diagram of the pipeline. *Break it on purpose:* reorder middleware and watch behavior change; remove `express.json()`. *Mini-project:* `order-lab`, three tiny middlewares that log a number, reordered to see the effect.

**2A.7 Custom middleware (TAUGHT).** Write a request logger (method, path, status, duration in milliseconds), a timing header, and a request id using `crypto.randomUUID()`. Show that status is only known after the response finishes (the `finish` event). *Mini-project:* a logger that prints one line per request.

**2A.8 Error handling (TAUGHT).** Four-argument error middleware, a 404 handler, and the Express 5 change: errors thrown inside async handlers are forwarded automatically. Reuse the custom error classes from Batch 1.9: map each class to a status code and a JSON error body. Never leak stack traces in responses. *Break it on purpose:* put the error handler before the routes; throw inside an async handler. *Mini-project:* a route that throws each of the three error types and returns a clean JSON error each time.

**2A.9 Project layout (TAUGHT).** `app.ts` builds and exports the app, `server.ts` starts listening. Why: tests in Batch 8 will import the app without opening a port. Configuration comes from the loader in Batch 1.8. *Mini-project:* split a single-file server into the two files.

**2A.10 Typing handlers (REVISITED).** He knows generics, so this is a short lesson. Type a handler with `Request<Params, ResBody, ReqBody, Query>` from `@types/express`, and explain what each slot means. Note the honest limit: these types describe what he expects, they do not check what actually arrives. That gap is closed by validation in 2B.4 and Zod in Batch 5. *Mini-project:* type the `echo` handler.

### Used, not taught here

- `cors`, mentioned only as a package name for a later lesson. Taught in 2B.7.
- Validation libraries. Not used. Hand-written checks come in 2B.4.

### Preview

- RESTful design (2B), databases (Batch 3), authentication (Batch 6), testing the app (Batch 8). One sentence each.

### Combined project: Toolbox Server (PRJ2A)

A small Express server that uses every core feature of 2A together. It is not a CRUD app yet.

- Routes under three routers: `/health`, `/echo`, `/items` (in-memory list, create and read only).
- A request logger and a request-id header on every response.
- A 404 handler and an error handler with the three custom error types from Batch 1.9.
- Configuration (port, environment name) loaded from environment variables with fail-fast checking.
- `app.ts` and `server.ts` split.
- A written comparison, five lines or more: what the raw `http` version needed versus Express, in his own words.

**Done when.** Every route responds correctly from curl and the API client, errors always come back as JSON with the right status, the logger prints one line per request, and he can explain the order his middleware runs in.

### Checkpoint

- Write a raw `node:http` server with two routes and explain why it is repetitive.
- Build an Express app with a router, a logger middleware and an error handler without looking anything up.
- Say what middleware is and why order matters.
- Explain how Express 5 handles errors thrown in async handlers.
- Explain the difference between `req.params`, `req.query` and `req.body`.

### Common traps

- Forgetting `express.json()` and getting an undefined body.
- Sending two responses from one handler.
- Putting the error handler before the routes.
- Trusting `req.query` values to be plain strings.
- Copying Express 4 route path syntax into Express 5.
- Leaking error stack traces to clients.

### Interview questions

- What is middleware in Express?
- How does Express handle errors in async routes in version 5?
- Why separate `app` from `server`?
- What does `next()` do, and what happens if you forget to call it?
- What does Express give you that the raw `http` module does not?

### Git milestone

Tag `batch-2a-complete`.

## Batch 2B: RESTful API Design (size M)

**Goal.** Design and build a clean, predictable REST API, and be able to justify every status code and endpoint.

**Why now.** 2A taught the tool. 2B teaches the craft: an API other developers (and his own React app) can rely on. This is the batch that turns "I can write routes" into "I can design an API", and the Bookmarks API at the end is his first CRUD application.

**Prerequisites.** Batch 2A. Module 0.6 (REST thinking).

### Lessons, each with a mini-project

**2B.1 REST design on paper (TAUGHT).** Resources are nouns, plural (`/bookmarks`, not `/getBookmark`). Verbs are HTTP methods. Nesting and when to avoid it. Compare a bad API (verbs in paths, everything POST) with a good one. *Mini-project:* design the endpoint table for a library app on paper: resource, method, path, success status, error statuses.

**2B.2 Status codes and headers that matter (TAUGHT).** 200, 201 (with a `Location` header pointing at the new resource), 204, 400, 404, 409 (conflict, such as a duplicate), 422 (well-formed but invalid). The rule of thumb: pick the most specific honest code, and never use 200 for everything. *Mini-project:* a table of ten situations with the right code and a one-line reason for each.

**2B.3 PUT, PATCH, DELETE and idempotency (TAUGHT).** PUT replaces the whole resource, PATCH changes part of it. Idempotent means repeating the request leaves the same result: GET, PUT and DELETE are, POST is not. What DELETE should return when called twice. *Break it on purpose:* call the same POST ten times and watch ten records appear; call DELETE twice. *Mini-project:* prove the idempotency of each method with curl and write the result down.

**2B.4 Manual validation and one error shape (TAUGHT).** Check types, lengths and formats with plain `if` statements. All errors share one JSON shape: `{ "error": { "code", "message", "details?" } }`, so the React app can handle them with one piece of code. Make the awkwardness visible: the checks pile up, repeat and drift out of sync with the TypeScript types. This is the deliberate setup for Zod in Batch 5. *Mini-project:* validate a bookmark payload by hand, then list what felt awkward.

**2B.5 IDs and timestamps (TAUGHT).** `crypto.randomUUID()` versus incrementing numbers (and why guessable ids leak information), `createdAt` and `updatedAt` as ISO 8601 strings in UTC. *Mini-project:* generate records and sort them by timestamp.

**2B.6 Lists done right (TAUGHT).** Pagination with `limit` and `page` (with a hard cap on page size), filtering by `tag`, search with `q`, sorting. Why unbounded lists are a production bug. Response shape for a list: items plus paging info. *Break it on purpose:* request `limit=1000000`. *Mini-project:* add `tag`, `q`, `limit` and `page` to a list endpoint.

**2B.7 CORS (TAUGHT).** The same-origin policy, why browsers block cross-origin calls, what a preflight request is, the `cors` package with one allowed origin. Callback to Module 0.3 (origins). *Break it on purpose:* call the API from a Vite app on another port and read the browser error; fix it; then show why a wildcard origin is a shortcut to avoid. *Mini-project:* a tiny Vite page that calls the API.

**2B.8 API client habits (TAUGHT).** Bruno (or Postman) collections, environments, saved examples for success and failure, and the curl equivalent of each request. *Mini-project:* a committed collection covering every endpoint and every error.

### Used, not taught here

- A Vite React page for the CORS demo. Written from his React knowledge, treated as given.
- `cors` options beyond one allowed origin. Taught in Batch 7.

### Preview

- Zod validation (Batch 5), a real database (Batches 3 and 4), authentication (Batch 6), his real React app calling this API (Batch 9). One sentence each.

### Combined project: Bookmarks API v1, in memory (PRJ2B)

His first CRUD application. It joins everything in 2A and 2B.

- **Data:** a bookmark has `id` (UUID), `url`, `title`, optional `note`, `tags` (array of strings), `createdAt`, `updatedAt`. Stored in an in-memory `Map`. Restarting the server loses everything, and that is part of the lesson.
- **Endpoints:** `POST /bookmarks`, `GET /bookmarks` (filters `tag` and `q`, paging `limit` and `page`, sort), `GET /bookmarks/:id`, `PUT /bookmarks/:id`, `PATCH /bookmarks/:id`, `DELETE /bookmarks/:id`.
- **Status codes:** 201 with `Location` on create, 200 on read and update, 204 on delete, 400 or 422 on bad input, 404 on missing, 409 on a duplicate URL.
- **Validation (by hand):** the URL must parse with `new URL`, the title is 1 to 200 characters, at most 10 tags, each tag a short string. Errors use the one shared error shape.
- **Plumbing:** request logger, request id, 404 handler, error handler, CORS for `http://localhost:5173`, `app.ts` and `server.ts` split.
- **API client:** a Bruno collection with an example for every endpoint and every error.
- **Write-up:** five lines on what he would improve (he will find: validation repeats, data vanishes, no users). These become the motivation for Batches 3 to 6.

**Done when.** His React app from the roadmap can list and add bookmarks through `fetch`. He can state the status code and the reason for every response. A restart wipes the data and he can say why. He can build the whole API again from an empty folder in under an hour.

### Checkpoint

- Design a REST endpoint table for a new app from scratch.
- Choose the right status code for create, update, delete, bad input, missing item and duplicate.
- Explain PUT versus PATCH and which methods are idempotent.
- Explain CORS and fix a blocked request without a wildcard.
- Paginate and filter a list safely, with a cap on page size.
- Build the Bookmarks API v1 without looking anything up.

### Common traps

- Using `200` for everything.
- Verbs in paths (`/createBookmark`).
- Unbounded list endpoints.
- Disabling CORS with a wildcard and never fixing it.
- Returning different error shapes from different routes.
- Using PUT when the intent is a partial change.
- Forgetting that a 404 for a missing item and a 404 for a missing route are different situations.

### Interview questions

- What makes an API RESTful?
- PUT versus PATCH.
- Which HTTP methods are idempotent, and why does it matter?
- When do you return 400, 404, 409 and 422?
- What is a CORS preflight request?
- How would you paginate a large list, and what could go wrong?

### Git milestone

Tag `batch-2b-complete`. This is the first project worth showing: keep the repository clean and give it a short README.

## Next

Part 3 covers Batch 3 (PostgreSQL and SQL by hand) and Batch 4 (Prisma and the real, database-backed CRUD app, which is his first resume-ready project).
