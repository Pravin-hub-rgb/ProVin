# Doc 9 Project — Bookmarks App Full Stack

---

## Where We Left Off

Batch 9 lessons (9.1-9.9) are complete. Now the project: Bookmarks App Full Stack. This is the full-stack project built on PRJ7 and PRJ8.

---

## Problem — Can You Build a Full-Stack App with a Real Backend?

The full-stack project: React frontend + Node backend + Postgres database.

**Repository layout:** `apps/api`, `apps/web`, `packages/shared`.

**Features:** register, login, silent refresh, logout, bookmark list with filters and paging, create, edit, delete, tags, and a profile page.

**Front end:** React with TypeScript, Router, TanStack Query, React Hook Form with Zod, Tailwind, accessible forms.

**Seam:** typed API client, shared Zod schemas, one error shape handled once, global 401 handling.

**Quality:** the API test suite still passes, with a handful of component tests optional.

**Docs:** a README with a screenshot, an architecture diagram showing the full request journey, setup steps that work from a clean clone.

**Done when:** A stranger can register, log in, manage bookmarks, close the tab, return and still be logged in, and see only their own data. He can walk through the entire request journey from the click to the database and back, using the real logs.

## What It Is NOT

- This is **not** deployed — that is Batch 10.
- This is **not** a monolith — separate frontend and backend.
- This is **not** a tutorial project — it is a resume project.

---

## Common Mistakes

- Putting access token in `localStorage`.
- Forgetting `credentials: 'include'`.
- Cookies not working on localhost (SameSite/Secure).
- Many 401s triggering multiple refreshes.
- Duplicated validation rules drifting.
- Secrets in frontend env vars.

---

## Try It Yourself

1. Set up monorepo (npm workspaces).
2. Build frontend + backend.
3. Implement auth flow (login, refresh, logout).
4. Add bookmark CRUD with filters/paging.
5. Write README with architecture diagram.

## Summary

- Bookmarks App: full-stack (React + Node + Postgres).
- Monorepo: `apps/api`, `apps/web`, `packages/shared`.
- Auth: register, login, silent refresh, logout.
- CRUD: list, create, edit, delete, tags.
- Quality: API tests pass, optional component tests.

## Next Step

Batch 9 is complete. Next: Batch 10 — Docker and Deployment (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- The full-stack project built on PRJ7 and PRJ8, in one repository using npm workspaces.
- Repository layout: `apps/api`, `apps/web`, `packages/shared`.
- Features: register, login, silent refresh, logout, bookmark list with filters and paging, create, edit, delete, tags, and a profile page.
- Front end: React with TypeScript, Router, TanStack Query, React Hook Form with Zod, Tailwind, accessible forms.
- Seam: a typed API client, shared Zod schemas, one error shape handled once, global 401 handling.
- Quality: the API test suite still passes, with a handful of component tests optional.
- Docs: a README with a screenshot, an architecture diagram showing the full request journey, setup steps that work from a clean clone.