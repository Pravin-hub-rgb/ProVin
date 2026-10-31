# Batch 7 — Optimization & Production Concerns: WORKING PLAN

> This file is the **context file** while building the batch. Read it before writing any file — scope, decisions, structure, conventions — so the notes stay consistent and nothing is missed. Don't add this file to lecture registration (it guides the writer, not the student).

---

## 1. Batch Purpose (one line)

Connecting from Batch 6's Task Board (production-grade Prisma + Neon) — through the **Photo Gallery / Media Showcase** project: `next/image` (manual `<img>` vs automatic optimization), `next/font` (no layout shift), Streaming with Suspense (progressive load), and Parallel + Intercepting Routes (Instagram-style URL-shareable photo modal). SEO (Batch 2 metadata) reinforced in the project. **Manual → Better** on every concept.

## 2. Locked Decisions (confirmed with the user)

- **Scope:** Performance/asset optimization + advanced routing. **No SEO** (already core in Batch 2 — 2.4; only reinforced in the project).
- **Parallel + Intercepting Routes depth:** **Light** (as in the roadmap) — `@slot` layouts + `(.)` intercept, Instagram-style modal, URL-shareable. No full syntax deep-dive.
- **SEO reinforce:** Yes — static metadata + dynamic `generateMetadata` on gallery pages (Batch 2 revision, no new concept).
- **Photo Gallery data:** **Prisma + Neon** (reuse Batch 6 Task Board skills) — `Photo` model, migrate, SC read. Read-only showcase (no SA mutations — roadmap says display-focused; SA already covered in Batch 6).
- **Source material:** No dedicated Batch 7 source docs — write from roadmap + existing course patterns + Next.js docs knowledge. Style sources: `prompts/Master Teaching Prompt.md`, `prompts/Dost-to-Dost Style.md`, `AGENTS.md`, `docs/coding/AGENTIC-AI-WRITING-RULES.md`.
- **`test-next` untouched** — gallery = fresh project (the user builds their own Batch 7 project; `test-next` stays as a practice demo only).

## 3. Manual → Better Pairs (the batch's spine)

| Topic | Manual (feel the problem first) | Better (Next.js solution) |
|---|---|---|
| Images | `<img>` — slow LCP, layout shift (CLS), no srcset/sizes, separate file per size, external bandwidth | `next/image` — automatic optimization, srcset/sizes, `fill`, responsive, priority, local/remote |
| Fonts | `@font-face`/Google Fonts link — FOUC + CLS (font swap shift) | `next/font/google` + variable fonts — self-hosted, preload, `adjustFontFallback`, no layout shift |
| Loading | Whole page waits (block) — bad UX | Streaming with Suspense — section-wise load, `loading.tsx` = route-level Suspense, `<Suspense>` granular |
| Modal | Client state modal (no URL, gone on share/back/refresh) | Parallel + Intercepting Routes — modal on a URL (Instagram pattern), deep-linkable |

## 4. File Structure (13 files)

### Phase 1 — Concepts (7 files)
| File | Content |
|---|---|
| **7.0** What We'll Learn | Batch intro (bridge from 6.13.5 Task Board closing), roadmap, 4 manual→better pairs, combined project overview |
| **7.1** Manual images | `<img>` problems: LCP, CLS (shift without dimensions), why srcset/sizes matter, bandwidth, `loading="lazy"` limitations |
| **7.2** `next/image` | `Image` component: automatic optimization, `sizes`/`srcset`, `fill`, `priority`, remote (`remotePatterns`), before/after size compare |
| **7.3** Manual fonts | FOUC + CLS: Google Fonts `<link>` — network delay, font swap shift, no preload |
| **7.4** `next/font` | `next/font/google` `Inter`/`Geist`, variable fonts, self-hosted (no external request), preload, no CLS, `next/font/local` mention |
| **7.5** Streaming with Suspense | Page block vs section-wise; async SC suspends → fallback; `<Suspense>` + `fallback`; `loading.tsx` = route-level; skeleton |
| **7.6** Parallel + Intercepting Routes | **Light** — parallel `@slot` (one layout, multiple views), intercepting `(.)photo/[id]` (URL unchanged, UI swaps) → modal; why: shareable URL, back button, refresh state |

### Phase 2 — Combined Project #7: Photo Gallery (6 files, series-prompt process)
| File | Content |
|---|---|
| **7.7.1** Planning | 4 questions (what, pages, data shape, flow), DB choice (Prisma + Neon reuse), routes table |
| **7.7.2** Hardcoded UI | Gallery grid (static array, plain `<img>`) + photo detail page — confirm design, images manual first |
| **7.7.3** Data Layer + Read + SEO | Prisma `Photo` model (url/title/description/width/height/order), migrate, SC read + `metadata`/`generateMetadata` reinforce |
| **7.7.4** `next/image` + `next/font` | Image component on DB images (before/after compare), project-wide `next/font`, remotePatterns |
| **7.7.5** Photo Modal | Parallel `@modal` slot + `(.)photo/[id]` intercept — grid click → modal, direct URL → detail page |
| **7.7.6** Streaming + States + Testing + Summary | Slow gallery grid Suspense streaming, loading/error states, test table, Batch 7 journey recap |

## 5. Writing Conventions (Batch 6 fixes carry forward — CRITICAL)

- **File label on every code block** — `// app/page.tsx` style comment inside the block + `**File:** app/...` line outside.
- **Full accumulating file per stage** — no code block showing only the "new part". Show the whole file, mark new lines with `// NEW`.
- **Placement clarity** — explain "add it below X" in the context of the existing function.
- **Gradual THINK → CONCEPT → CODE → TEST** in every step.
- **Compare/contrast table LAST** — first make each concept clear one by one, then the table (manual vs next/image compare table at the end in 7.2).
- **If a new concept must be mentioned first**, say "we'll go into detail in the next topic" + give a simple working definition.
- **"In Your Own Words"** — 3-5 questions, only what was taught in this file, `<details>` accordion, logic test.
- **"What It Is NOT"** section for every new concept.
- **Nutshell** for new concepts.
- **No real-life analogies** — only technical + friendly conversational tone (batch-wide).
- React comparisons always generic (never name a specific React course project).
- **Manual → Better:** first feel the manual problem fully, then the Next.js solution — "why" first, "how" after.

## 6. Code Style per Topic

- **Images:** `<img>` (manual) vs `next/image` `Image` component — `src`, `width`, `height`, `fill`, `sizes`, `priority`, `remotePatterns` in `next.config.ts`.
- **Fonts:** `next/font/google` — `const Inter = Inter({ subsets: ["latin"], variable: "--font-inter" })`, className on layout, `Geist` mention.
- **Streaming:** `loading.tsx` (route-level) + `<Suspense fallback={<Skeleton />}>` granular sections, `async` SC.
- **Routing:** `@modal` parallel slot in layout, `app/@modal/(.)photo/[id]/page.tsx` intercepting, `default.tsx`, `router.back()` or Link.
- **Prisma (7.7.3+):** `prisma/schema.prisma` (Photo model), `npx prisma migrate dev`, `lib/prisma.ts` singleton, `prisma.photo.findMany/findUnique` — Batch 6 6.13.3 pattern.

## 7. Consistency Updates Needed (batch end)

1. `docs/coding/Next JS/Nextjs-Final-Roadmap.md` — Batch 7 section: T/U/V/W letters → actual file numbers, project = Photo Gallery (Prisma + Neon data source) update.
2. `lib/subjects/nextjs.subject.ts` — append `batch7` phase (13 files: 7.0-7.6 + 7.7.1-7.7.6 + ... = 13).
3. Bridge verify: 6.13.5 closing (Batch 6→7) — 6.13.5's end has a generic "next project" line, no Batch 7 mention — connect directly from 7.0.

## 8. Execution Order

7.0 → 7.1 → 7.2 → 7.3 → 7.4 → 7.5 → 7.6 → 7.7.1 → 7.7.2 → 7.7.3 → 7.7.4 → 7.7.5 → 7.7.6, user review after every file. Then roadmap + subject.ts.

## 9. Verification Checklist (for the final pass)

- [ ] File label + placement context on every code block
- [ ] Full accumulating files + `// NEW` markers
- [ ] Compare tables LAST
- [ ] Manual → Better order in every pair (manual first, Next solution after)
- [ ] Parallel + Intercepting kept light (no deep syntax dive)
- [ ] SEO reinforce only in the project (no new concept)
- [ ] Photo Gallery = Prisma + Neon, read-only showcase
- [ ] Roadmap + subject.ts updated
- [ ] `test-next` untouched
