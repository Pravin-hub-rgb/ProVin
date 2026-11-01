# Batch 8 — Security & Deployment: WORKING PLAN

> Yeh file batch banate waqt **context file** hai. Har file likhne se pehle isse padho — scope, decisions, structure, conventions — taaki notes consistent rahen aur kuch na bhulein. Is file ko lecture registration mein mat add karna (yeh student ko nahi, writer ko guide karti hai).

---

## 1. Batch ka Purpose (ek line)

Batch 7 ke Photo Gallery (optimized, production-feel app) se connect hoke — **final polish**: security audit (env vars server-only vs NEXT_PUBLIC, input validation, CSRF awareness), error handling at scale (nested error boundaries, global-error), aur **Vercel deployment** (env config, production build). **Manual → Better** har concept pe. Koi naya project nahi — roadmap kehta hai "koi naya nahi — security audit + deploy".

## 2. Locked Decisions (user se confirm)

- **Scope:** Security + error-handling-at-scale + deployment. **No new concepts** — applied awareness of existing batches (5/6/7).
- **Project for audit + deploy:** **Photo Gallery (Batch 7)** — read-only showcase, Prisma + Neon, next/image, next/font, streaming, modal.
- **CSRF + input depth:** **Awareness level** — concept + built-in protection ka working understanding. Koi manual CSRF token nahi.
- **Deployment platform:** **Vercel** — git push, zero-config, env per environment.
- **Source material:**
  - Security: `secutiry.md` + `5.5_Production_Security_Checklist.md` (Learn folder)
  - Error states: `[Docs] Project 5 - Loading + Error States` (6.1 root-layout-error, 6.2 global-error)
  - Deployment: Interview Q61 + `5.5` checklist + Next.js docs
- **`test-next` untouched** — batch 8 sirf Photo Gallery pe.

## 3. Manual → Better Pairs (batch ka spine)

| Topic | Manual (pehle problem feel) | Better (Next.js solution) |
|---|---|---|
| Secrets | Hardcoded secret / NEXT_PUBLIC_ misuse → client bundle mein expose | `.env` server-only vars, `NEXT_PUBLIC_` prefix rules, `.gitignore` |
| Input/CSRF | Client input pe trust / XSS / CSRF attack | Server Actions built-in CSRF (Origin check) + server-side validation |
| Errors | Raw errors, no boundary, layout crash = white screen | `error.tsx` at scale + `global-error.tsx` hierarchy |
| Deploy | Self-host (build/start, env management pain) | Vercel — git push, zero-config, env per environment |

## 4. File Structure (9 files)

### Phase 1 — Concepts (5 files)
| File | Content |
|---|---|
| **8.0** Security & Deployment — Kya Seekhenge | Bridge from 7.7.6, roadmap X/Y/Z, 4 manual→better pairs, combined project overview (audit + deploy, koi naya nahi) |
| **8.1** Env Vars Security | Hardcoded secret demo → `.env`/`.env.local`, server-only vs `NEXT_PUBLIC_` (bundle exposure demo), `.gitignore` + `git rm --cached`, kab `NEXT_PUBLIC_` legit hai |
| **8.2** Input + CSRF (Awareness) | Trusting client input pain, XSS concept, form CSRF attack → Server Actions built-in Origin/Host check + server-side validation (no manual token) |
| **8.3** Error Boundaries at Scale | 1.4 recap (basics) → at scale: error hierarchy (route → nested → layout → `global-error.tsx`), error in layouts, `reset()`, dev overlay vs prod |
| **8.4** Deployment (Vercel) | Self-host pain → Vercel: `npm run build` check, git push, env vars per environment (preview/production), post-deploy verify |

### Phase 2 — Project: Security Audit + Deploy Photo Gallery (4 files, series process)
| File | Content |
|---|---|
| **8.5.1** Planning | Security audit checklist (env exposure, NEXT_PUBLIC misuse, input handling, error boundaries, build check) + deploy plan |
| **8.5.2** Audit — Env + Config | Photo Gallery ke env vars, `.gitignore`, `next.config.ts` remotePatterns, server-only checks, `npm run build` |
| **8.5.3** Audit — Error Boundaries | Add `global-error.tsx`, verify hierarchy, test error states |
| **8.5.4** Deploy — Vercel | Repo connect, env config (DATABASE_URL, etc.), deploy, live verify, post-deploy checklist |

## 5. Writing Conventions (carry forward — CRITICAL)

- **Har code block pe file label** — `// app/global-error.tsx` style comment inside block + `**File:** app/...` line outside.
- **Full accumulating file per stage** — stage koi code block nahi jo sirf "naya hissa" dikhaye. Poora file dikhao, nayi lines pe `// NEW` marker.
- **Placement clarity** — existing function ke context mein batao "X ke neeche add karo".
- **Gradual SOCH → CONCEPT → CODE → TEST** har step mein.
- **Compare/contrast table LAST** — pehle har concept ek-ek clear, phir table.
- **Naye concept ko pehle mention karna ho** toh "agle topic mein detail mein" bolo + simple working definition do.
- **"In Your Own Words"** — 3-5 questions, sirf is file mein padhaya, `<details>` accordion, logic test (memorization nahi).
- **"What It Is NOT"** section har naye concept pe.
- **Nutshell** naye concepts ke liye.
- **Koi real-life analogy nahi** — sirf technical + dost-to-dost Hinglish.
- React comparisons hamesha generic (kisi specific React course project ka naam nahi).
- **Manual → Better:** pehle manual problem full feel, phir Next.js solution — "why" pehle, "how" baad.

## 6. Code Style per Topic

- **Env vars:** `.env.local` example, `process.env.X`, `NEXT_PUBLIC_` prefix, `.gitignore` lines, `git rm --cached`.
- **Security headers:** proxy.ts (Batch 4 reuse) — X-Frame-Options, X-Content-Type-Options — optional, mention.
- **Error:** `app/global-error.tsx` (`'use client'`, `<html>/<body>`, error + reset), `app/error.tsx` (basic from 1.4 — no need re-explain), error hierarchy diagram.
- **Deploy:** Vercel dashboard flow (connect repo → env vars → deploy), `npm run build` terminal output.

## 7. Consistency Updates Needed (batch end)

1. `docs/coding/Next JS/Nextjs-Final-Roadmap.md` — Batch 8 section: X/Y/Z letters → actual file numbers, project = audit + deploy Photo Gallery update.
2. `lib/subjects/nextjs.subject.ts` — `batch8` phase append (9 files: 8.0-8.4 + 8.5.1-8.5.4).
3. Bridge verify: 7.7.6 closing (Batch 7→8) — 7.7.6 ke end mein "Agla step: Batch 8 — Security & Deployment — env vars ka security audit, error handling at scale, aur Vercel pe deploy" already hai ✅.

## 8. Execution Order

PLAN.md → 8.0 → 8.1 → 8.2 → 8.3 → 8.4 → 8.5.1 → 8.5.2 → 8.5.3 → 8.5.4, har file ke baad user review. Phir roadmap + subject.ts.

## 9. Verification Checklist (final pass ke liye)

- [ ] Har code block pe file label + placement context
- [ ] Full accumulating files + `// NEW` markers
- [ ] Compare tables LAST
- [ ] Manual → Better order har pair mein (manual pehle, Next solution baad)
- [ ] CSRF/input depth = awareness (no manual token)
- [ ] Photo Gallery = audit + deploy (no new project)
- [ ] Roadmap + subject.ts updated
- [ ] `test-next` untouched
