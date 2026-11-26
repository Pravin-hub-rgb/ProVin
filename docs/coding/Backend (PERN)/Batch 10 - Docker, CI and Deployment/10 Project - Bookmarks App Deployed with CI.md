# Doc 10 Project — Bookmarks App Deployed with CI

---

## Where We Left Off

Batch 10 lessons (10.1-10.10) are complete. Now the project: Bookmarks App Deployed with CI.

---

## Problem — Can You Package, Test, and Deploy the Full Stack?

- Dockerfiles for API and web, and a Compose file for local development.
- A GitHub Actions workflow that checks, tests and builds on every push.
- A live deployment of the database, API and front end on a custom or platform URL.
- A README with a live link, a status badge, an architecture diagram and a "run it locally" section.

**Done when:** A recruiter can open the live link, register, and use the app. Pushing a broken commit turns CI red. A stranger can run the whole stack locally with one command.

## What It Is NOT

- This is **not** Kubernetes — that is OUT OF SCOPE.
- This is **not** a monolith — separate services.
- This is **not** optional for a resume — deployment matters.

---

## Common Mistakes

- Baking secrets into an image.
- Running as root in the container.
- Forgetting that the database is ephemeral without a volume.
- Health check that passes before DB is ready.
- Cookie/CORS settings that work locally and break in production.
- Running migrations that race with multiple app instances.

---

## Try It Yourself

1. Write Dockerfiles for API and web.
2. Create Compose file.
3. Add GitHub Actions workflow.
4. Deploy to a platform.
5. Write README with live link and badge.

## Summary

- Dockerfiles + Compose.
- CI workflow (check, test, build).
- Live deployment.
- README with live link, badge, architecture diagram.

## Next Step

Batch 10 is complete. The course is job-ready here. Next batches (11-15) are optional depth.

---

## Cheat Sheet (Quick Recall)

- Dockerfiles for API and web, and a Compose file for local development.
- A GitHub Actions workflow that checks, tests and builds on every push.
- A live deployment of the database, API and front end on a custom or platform URL.
- A README with a live link, a status badge, an architecture diagram and a "run it locally" section.