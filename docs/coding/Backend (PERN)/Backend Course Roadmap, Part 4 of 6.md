# Backend Course Roadmap, Part 4 of 6

Batch 5 (validation, layered code, GraphQL gist) and Batch 6 (authentication and authorization) · Prepared November 26, 2026 for Pravin

The rules, tags, stack and versions are in Part 1. The building agent must read Part 1 first and obey it. This part adds only Batches 5 and 6.

## What these two batches do

After Batch 4 he has a working, database-backed CRUD API. It still has two weaknesses that real teams care about: input is checked by hand, and the code is one tangle. Batch 5 fixes both. Batch 6 then adds the thing every real app needs and every interviewer asks about: users, passwords, tokens and permissions.

Both batches upgrade the same project, so he sees one codebase mature: Bookmarks API v2 becomes v3 (validated and layered) and then v4 (multi-user).

## Batch 5: Validation, Clean Structure and the GraphQL Gist (size M)

**Goal.** Make the API refuse bad input in one consistent way, separate the code into layers that each have one job, and know enough GraphQL to talk about it honestly.

**Why now.** In 2B.4 he wrote validation by hand and listed what was awkward. Now he replaces it with the better tool, and he already knows the library from React forms, so the new idea is using it on the server.

**Prerequisites.** Batch 4.

**History note (read-only).** Why "validate at the boundary" became standard practice, why the type system alone cannot protect a server (types vanish at runtime, so a request body can be anything), and how schema-first validation libraries grew out of hand-written checks. One short paragraph on why layered structure exists: code that mixes HTTP, business rules and database calls becomes impossible to test or change.

### Lessons, each with a mini-project

**5.1 Feel the pain again (REVISITED).** Re-read his 2B.4 hand-written validation and his own list of problems. Add one new field to a bookmark and count how many places must change (validation, types, handler, docs). *Mini-project:* the written list, in his words. No new tool yet.

**5.2 Zod 4 on the server (TAUGHT, library REVISITED from React forms).** `z.object`, string, number, array, optional, defaults, `parse` versus `safeParse`, `z.infer` to derive the TypeScript type from the schema so the schema and type can never drift. Query parameters arrive as strings, so introduce coercion. Version and API details checked against the Zod 4 docs at build time (Zod 4 changed parts of the API, and old snippets mislead). *Break it on purpose:* send a body with the wrong types and read the structured error Zod produces. *Mini-project:* a `createBookmarkSchema` and a script that parses good and bad input.

**5.3 A validation middleware (TAUGHT).** One reusable middleware that takes a schema and validates `body`, `query` or `params` before the handler runs, and replaces the request value with the parsed result. After it, handlers can trust their input. *Mini-project:* `validate(schema)` used on `POST /bookmarks`.

**5.4 One error shape from Zod errors (TAUGHT).** Map Zod issues into the shared error shape from 2B.4 with a field-by-field `details` list, and decide the status code (400 or 422) and stick to it across the API. *Mini-project:* the error mapper, with tests by hand through the API client.

**5.5 Validating configuration (TAUGHT).** Replace the hand-written environment loader from Batch 1.8 with a Zod schema that parses `process.env` once at startup and fails fast with a readable list of every problem. The rest of the app imports a typed `config` object and never touches `process.env` again. *Mini-project:* the new `config.ts`.

**5.6 Layered architecture (TAUGHT).** Three layers with one job each: routes and controllers (HTTP in, HTTP out), services (business rules), repositories (database access through Prisma). Dependencies point one way: controller to service to repository. Diagram the flow of one request through all three. *Break it on purpose:* show a controller that reaches directly into Prisma and a business rule that depends on `req`, then explain why each hurts. *Mini-project:* move one endpoint (`POST /bookmarks`) through the three layers.

**5.7 DTOs versus database models (TAUGHT).** Why the API shape and the database shape are different things: never return raw database objects, choose what leaves the server, shape responses with a response schema. *Mini-project:* a response mapper for a bookmark that hides internal fields.

**5.8 Generics on the backend (REVISITED, deepened).** He knows generics, so this lesson goes straight to backend uses: a generic `validate<T>` middleware, a typed `Result<T, E>` return for services, and utility types (`Pick`, `Omit`, `Partial`) to derive create and update inputs from one model. Show where generics make code clearer and where they only add noise. *Mini-project:* a `paginate<T>` helper and a `Result<T, E>` type used by one service.

**5.9 A consistent response envelope (TAUGHT).** The shape of a single resource response, a list response with paging info, and an error response, and why consistency is a gift to the front end. *Mini-project:* apply the envelope to every route.

**5.10 Folder structure by feature (TAUGHT).** Organizing by feature (`bookmarks/`, `tags/`) rather than by technical type, so each feature holds its own routes, controller, service, repository and schemas. *Mini-project:* reorganize the project.

**5.11 GraphQL, the gist (TAUGHT at gist level, no build).** A single lesson, no project code. What GraphQL is (one endpoint, the client asks for exactly the fields it wants), how it differs from REST (many endpoints with fixed shapes), the problems it solves (over-fetching and under-fetching, many clients with different needs), the costs it adds (complexity, caching, a new layer to secure and monitor), and when a team picks it. Show one example query and its response, then the REST calls needed to get the same data. *Exercise:* write a half-page comparison in his own words. The goal is that "Do you know GraphQL?" gets an honest answer: "I know the idea and the trade-offs, and I have built REST in depth." It is OUT OF SCOPE to build with GraphQL in this course.

### Used, not taught here

- `Prisma` calls inside repositories. Taught in Batch 4.
- OpenAPI and API documentation tools. PREVIEW only: one line that APIs are often documented with a machine-readable spec.

### Preview

- Authentication (Batch 6), testing each layer separately (Batch 8). One sentence each.

### Combined project: Bookmarks API v3, validated and layered (PRJ5)

The upgrade of PRJ4. Behavior stays the same. Structure and safety change.

- **Validation:** every route validates `body`, `params` and `query` with Zod through the middleware. No hand-written checks remain.
- **Config:** a typed, Zod-validated `config` object; no `process.env` outside it.
- **Layers:** every feature has controller, service and repository files. Controllers contain no Prisma calls, services contain no `req` or `res`.
- **Responses:** a consistent envelope and a response mapper. No raw database objects leave the server.
- **Errors:** validation failures map to one error shape and one chosen status code.
- **Paging:** the generic `paginate<T>` helper.
- **Before and after:** a short README section comparing the v2 and v3 codebases: lines of validation code removed, places that change when a field is added.
- **Write-up:** the half-page GraphQL versus REST note.

**Done when.** Sending bad input to any route returns the same error shape with a per-field message. Adding a field to a bookmark requires changing the schema and one or two layers, not the whole project. He can explain why each layer exists.

### Checkpoint

- Validate a request with Zod and derive the TypeScript type from the schema.
- Write the validation middleware from scratch.
- Explain controller, service and repository and what each must never do.
- Explain why raw database objects should not be returned to clients.
- Explain, in two minutes, what GraphQL is and when a team would choose it over REST.

### Common traps

- Trusting TypeScript types to protect against bad input at runtime.
- Validating only the body and forgetting `params` and `query`.
- Query parameters arriving as strings and failing numeric checks.
- Putting business rules in controllers or Prisma calls in services' callers.
- Returning password hashes or internal fields because a whole database row was sent back.
- Following Zod 3 snippets while using Zod 4.

### Interview questions

- Why validate on the server when the front end already validates?
- What is the difference between a type and a runtime schema?
- Explain a layered architecture. What are the benefits?
- What is a DTO?
- REST versus GraphQL: what is the trade-off?

### Git milestone

Tag `batch-5-complete`.

## Batch 6: Authentication and Authorization (size L)

**Goal.** Add users to the API, let them register and log in, protect routes, and make sure each person can only touch their own data.

**Why now.** The API validates input and has clean layers, so security is added to a well-shaped base. Authentication is the topic interviewers probe most, so this batch teaches reasons, not recipes.

**Prerequisites.** Batch 5, and Module 0.7 (cookies).

**Two words kept apart throughout.** Authentication answers "who are you?" and maps to 401. Authorization answers "what may you do?" and maps to 403 (or 404 when hiding a resource's existence is the safer choice).

**Stack for this batch.** Argon2id through the `argon2` package for passwords, `jose` for signing and verifying JWTs. A short-lived access token, plus an opaque rotating refresh token stored in an httpOnly cookie and stored hashed in Postgres so it can be revoked. The agent re-verifies package APIs against current docs.

**History note (read-only).** Server-side sessions, then stateless tokens, then why short-lived access tokens plus refresh tokens became the standard compromise. Why the popular advice "just put a JWT in localStorage" is risky (any injected script can steal it), and the trade-offs of cookies instead. Written so he can explain the evolution in an interview.

### Lessons, each with a mini-project

**6.1 Authentication versus authorization, and how a server remembers you (TAUGHT).** HTTP is stateless, so something must travel with each request to prove identity. Compare server sessions with signed tokens in plain words, with a diagram of each flow. *Mini-project:* draw both flows for a login followed by a protected request.

**6.2 Cookies in practice (TAUGHT).** `Set-Cookie`, `httpOnly`, `Secure`, `SameSite`, `Path`, expiry, and what each protects against. Tie back to Module 0.7 and to the origin ideas from CORS in 2B.7 (credentials and CORS interact). *Break it on purpose:* read a cookie from JavaScript when `httpOnly` is off, then when it is on. *Mini-project:* a tiny route that sets and reads a cookie.

**6.3 Storing passwords (TAUGHT).** Why plain text and fast hashes are unacceptable, what salting does, why slow hashing exists. Show bcrypt briefly as the legacy option (it appears in many codebases), then use Argon2id as the current recommendation. Never log passwords. *Break it on purpose:* hash the same password twice and compare the outputs (different salts). *Mini-project:* hash and verify script, with a timing comparison against a fast hash.

**6.4 Users and registration (TAUGHT).** A `User` model through a migration (unique email, hashed password, role with a default), a registration endpoint with Zod validation, the 409 on a duplicate email, and a response that never includes the hash. *Mini-project:* `POST /auth/register`.

**6.5 Login and the access token (TAUGHT).** Verify the password, then issue a short-lived signed JWT with `jose`. What a JWT is (three parts, signed not encrypted, so never put secrets in it), claims such as subject and expiry, the secret kept in configuration, and algorithm pinning. Return the same generic error whether the email or the password was wrong. *Break it on purpose:* decode a token by hand, change a character, watch verification fail. *Mini-project:* `POST /auth/login` returning an access token.

**6.6 Auth middleware and a typed `req.user` (TAUGHT).** Read the token, verify it, attach the user to the request, reject with 401 otherwise. Show how to extend Express's request type in TypeScript (declaration merging) so `req.user` is typed everywhere. *Mini-project:* protect `GET /me` and one bookmark route.

**6.7 Refresh tokens (TAUGHT).** Why short access tokens need a way to renew themselves. The refresh token is an opaque random value (not a JWT), sent only in an httpOnly cookie, stored hashed in Postgres, rotated on every use, and revoked on logout. Introduce reuse detection: if an already-used refresh token appears again, revoke the whole family. Diagram the flow. *Mini-project:* `POST /auth/refresh` and `POST /auth/logout`.

**6.8 Authorization: ownership and roles (TAUGHT).** Every bookmark now belongs to a user (a migration with a foreign key). Services filter by the current user, so a person can only read, change or delete their own bookmarks. Return 404 rather than 403 for another person's resource when revealing its existence would leak information. Add a simple role (`user` and `admin`) and one admin-only route, and explain role-based access control. *Break it on purpose:* log in as user A and request user B's bookmark id. *Mini-project:* ownership filtering in the repository layer plus one admin route.

**6.9 Common attacks and mistakes (TAUGHT).** Brute-force login attempts (rate limiting arrives in Batch 7, PREVIEW here), user enumeration through different error messages or response times, weak or committed secrets, JWT pitfalls (no algorithm pinning, no expiry, secrets in payload), cross-site scripting versus cross-site request forgery and how `SameSite` and `httpOnly` help, and why "where do I store the token in React?" has a real answer. *Mini-project:* a one-page threat checklist applied to his own API.

**6.10 Logout, password change and session invalidation (TAUGHT).** What logout actually does with stateless tokens, revoking refresh tokens, changing a password and invalidating other sessions. *Mini-project:* `POST /auth/change-password`.

**6.11 OAuth and social login (PREVIEW).** One lesson-length box, no code: what "Sign in with Google" does conceptually, and why teams use identity providers. He has touched auth in Next.js already, so this connects to prior exposure. Building it is OUT OF SCOPE here.

### Used, not taught here

- Rate limiting and security headers. Taught in Batch 7.
- The React side of login. Built in Batch 9.

### Preview

- Hardening and logging (Batch 7), testing auth flows with a real database (Batch 8), the React app logging in for real (Batch 9). One sentence each.

### Combined project: Bookmarks API v4 with users (PRJ6)

The upgrade of PRJ5.

- **Auth endpoints:** register, login, refresh, logout, change-password, and `GET /me`.
- **Tokens:** short-lived access token (`jose`), rotating refresh token in an httpOnly cookie, hashed in the database, with reuse detection.
- **Passwords:** Argon2id, with a generic login error.
- **Authorization:** every bookmark belongs to a user, and every query is scoped to the current user. One admin-only route demonstrates roles.
- **Layers kept:** auth lives in its own feature folder with controller, service and repository, with the middleware shared.
- **Migrations:** `User`, refresh-token table, and the ownership foreign key on bookmarks, all committed.
- **Proof:** a written test script (API client collection) showing that user A cannot see, edit or delete user B's bookmarks, that an expired access token is refused, and that a reused refresh token revokes the family.
- **Write-up:** a README section on the auth design: why these token lifetimes, why hashed refresh tokens, what attacks were considered.

**Done when.** Two registered users each see only their own bookmarks. Tokens expire and renew correctly. Logout makes the refresh token unusable. He can draw the full auth flow from memory and defend each choice.

### Checkpoint

- Explain authentication versus authorization and 401 versus 403.
- Explain why passwords are hashed with a slow algorithm and why not encrypted.
- Explain what is inside a JWT and why it must not hold secrets.
- Describe the access token plus refresh token flow and how rotation works.
- Make routes protected and enforce ownership in the data layer.
- Name four common auth mistakes and how to avoid each.

### Common traps

- Storing passwords in plain text, or hashing with a fast algorithm.
- Returning the password hash or other internal fields in a response.
- Different error messages for unknown email versus wrong password.
- Access tokens that never expire, or secrets committed to Git.
- Checking authentication but forgetting the ownership check (the most common real-world bug).
- Putting the access token in `localStorage` without understanding the risk.
- Forgetting that cookies with credentials change the CORS setup.

### Interview questions

- Sessions versus JWTs: what are the trade-offs?
- How do refresh tokens work, and why rotate them?
- Why hash passwords, and why Argon2 or bcrypt rather than SHA-256?
- 401 versus 403: when each?
- How would you stop one user from reading another user's data?
- Where should a front end store tokens, and what are the risks?

### Git milestone

Tag `batch-6-complete`. At this point the repository shows a full, secured, multi-user API, which is the strongest backend project on his resume. Update the README with an architecture diagram and a setup guide.

## Next

Part 5 covers Batch 7 (security hardening and logging), Batch 8 (testing with a real database) and Batch 9 (connecting his React app to the API for real).
