# Batch 8 — Security & Deployment: WORKING PLAN

> This file is the **context file** while building the batch. Read it before writing any file — scope, decisions, structure, conventions — so the notes stay consistent and nothing is missed. Don't add this file to lecture registration (it guides the writer, not the student).

---

## 1. Batch Purpose (one line)

Connecting from Batch 7's Photo Gallery (optimized, production-feel app) — **final polish**: security audit (env vars server-only vs NEXT_PUBLIC, input validation, CSRF awareness), error handling at scale (nested error boundaries, global-error), and **Vercel deployment** (env config, production build). **Manual → Better** on every concept. No new project — the roadmap says "no new one — security audit + deploy".

## 2. Locked Decisions (confirmed with the user)

- **Scope:** Security + error-handling-at-scale + deployment. **No new concepts** — applied awareness of existing batches (5/6/7).
- **Project for audit + deploy:** **Photo Gallery (Batch 7)** — read-only showcase, Prisma + Neon, next/image, next/font, streaming, modal.
- **CSRF + input depth:** **Awareness level** — concept + working understanding of the built-in protection. No manual CSRF token.
- **Deployment platform:** **Vercel** — git push, zero-config, env per environment.
- **Source material:**
  - Security: `secutiry.md` + `5.5_Production_Security_Checklist.md` (Learn folder)
  - Error states: `[Docs] Project 5 - Loading + Error States` (6.1 root-layout-error, 6.2 global-error)
  - Deployment: Interview Q61 + `5.5` checklist + Next.js docs
- **`test-next` untouched** — Batch 8 only touches the Photo Gallery.

## 3. Manual → Better Pairs (the batch's spine)

| Topic | Manual (feel the problem first) | Better (Next.js solution) |
|---|---|---|
| Secrets | Hardcoded secret / NEXT_PUBLIC_ misuse → exposed in the client bundle | `.env` server-only vars, `NEXT_PUBLIC_` prefix rules, `.gitignore` |
| Input/CSRF | Trusting client input / XSS / CSRF attack | Server Actions built-in CSRF (Origin check) + server-side validation |
| Errors | Raw errors, no boundary, layout crash = white screen | `error.tsx` at scale + `global-error.tsx` hierarchy |
| Deploy | Self-host (build/start, env management pain) | Vercel — git push, zero-config, env per environment |

## 4. File Structure (9 files)

### Phase 1 — Concepts (5 files)
| File | Content |
|---|---|
| **8.0** Security & Deployment — What We'll Learn | Bridge from 7.7.6, roadmap X/Y/Z, 4 manual→better pairs, combined project overview (audit + deploy, no new one) |
| **8.1** Env Vars Security | Hardcoded secret demo → `.env`/`.env.local`, server-only vs `NEXT_PUBLIC_` (bundle exposure demo), `.gitignore` + `git rm --cached`, when `NEXT_PUBLIC_` is legit |
| **8.2** Input + CSRF (Awareness) | Pain of trusting client input, XSS concept, form CSRF attack → Server Actions built-in Origin/Host check + server-side validation (no manual token) |
| **8.3** Error Boundaries at Scale | 1.4 recap (basics) → at scale: error hierarchy (route → nested → layout → `global-error.tsx`), error in layouts, `reset()`, dev overlay vs prod |
| **8.4** Deployment (Vercel) | Self-host pain → Vercel: `npm run build` check, git push, env vars per environment (preview/production), post-deploy verify |

### Phase 2 — Project: Security Audit + Deploy Photo Gallery (4 files, series process)
| File | Content |
|---|---|
| **8.5.1** Planning | Security audit checklist (env exposure, NEXT_PUBLIC misuse, input handling, error boundaries, build check) + deploy plan |
| **8.5.2** Audit — Env + Config | Photo Gallery's env vars, `.gitignore`, `next.config.ts` remotePatterns, server-only checks, `npm run build` |
| **8.5.3** Audit — Error Boundaries | Add `global-error.tsx`, verify hierarchy, test error states |
| **8.5.4** Deploy — Vercel | Repo connect, env config (DATABASE_URL, etc.), deploy, live verify, post-deploy checklist |

## 5. Writing Conventions (carry forward — CRITICAL)

- **File label on every code block** — `// app/global-error.tsx` style comment inside the block + `**File:** app/...` line outside.
- **Full accumulating file per stage** — no code block showing only the "new part". Show the whole file, mark new lines with `// NEW`.
- **Placement clarity** — explain "add it below X" in the context of the existing function.
- **Gradual THINK → CONCEPT → CODE → TEST** in every step.
- **Compare/contrast table LAST** — first make each concept clear one by one, then the table.
- **If a new concept must be mentioned first**, say "we'll go into detail in the next topic" + give a simple working definition.
- **"In Your Own Words"** — 3-5 questions, only what was taught in this file, `<details>` accordion, logic test (not memorization).
- **"What It Is NOT"** section for every new concept.
- **Nutshell** for new concepts.
- **No real-life analogies** — only technical + friendly conversational tone.
- React comparisons always generic (never name a specific React course project).
- **Manual → Better:** first feel the manual problem fully, then the Next.js solution — "why" first, "how" after.

## 6. Code Style per Topic

- **Env vars:** `.env.local` example, `process.env.X`, `NEXT_PUBLIC_` prefix, `.gitignore` lines, `git rm --cached`.
- **Security headers:** proxy.ts (Batch 4 reuse) — X-Frame-Options, X-Content-Type-Options — optional, mention.
- **Error:** `app/global-error.tsx` (`'use client'`, `<html>/<body>`, error + reset), `app/error.tsx` (basic from 1.4 — no need to re-explain), error hierarchy diagram.
- **Deploy:** Vercel dashboard flow (connect repo → env vars → deploy), `npm run build` terminal output.

## 7. Consistency Updates Needed (batch end)

1. `docs/coding/Next JS/Nextjs-Final-Roadmap.md` — Batch 8 section: X/Y/Z letters → actual file numbers, project = audit + deploy Photo Gallery update.
2. `lib/subjects/nextjs.subject.ts` — append `batch8` phase (9 files: 8.0-8.4 + 8.5.1-8.5.4).
3. Bridge verify: 7.7.6 closing (Batch 7→8) — 7.7.6's end already says "Next step: Batch 8 — Security & Deployment — env vars security audit, error handling at scale, and deploy on Vercel" ✅.

## 8. Execution Order

PLAN.md → 8.0 → 8.1 → 8.2 → 8.3 → 8.4 → 8.5.1 → 8.5.2 → 8.5.3 → 8.5.4, user review after every file. Then roadmap + subject.ts.

## 9. Verification Checklist (for the final pass)

- [ ] File label + placement context on every code block
- [ ] Full accumulating files + `// NEW` markers
- [ ] Compare tables LAST
- [ ] Manual → Better order in every pair (manual first, Next solution after)
- [ ] CSRF/input depth = awareness (no manual token)
- [ ] Photo Gallery = audit + deploy (no new project)
- [ ] Roadmap + subject.ts updated
- [ ] `test-next` untouched
