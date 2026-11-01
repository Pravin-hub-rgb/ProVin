# Batch 7 — Optimization & Production Concerns: WORKING PLAN

> Yeh file batch banate waqt **context file** hai. Har file likhne se pehle isse padho — scope, decisions, structure, conventions — taaki notes consistent rahen aur kuch na bhulein. Is file ko lecture registration mein mat add karna (yeh student ko nahi, writer ko guide karti hai).

---

## 1. Batch ka Purpose (ek line)

Batch 6 ke Task Board (production-grade Prisma + Neon) se connect hoke — **Photo Gallery / Media Showcase** project ke through: `next/image` (manual `<img>` vs automatic optimization), `next/font` (no layout shift), Streaming with Suspense (progressive load), aur Parallel + Intercepting Routes (Instagram-style URL-shareable photo modal). SEO (Batch 2 metadata) project mein reinforce. **Manual → Better** har concept pe.

## 2. Locked Decisions (user se confirm)

- **Scope:** Performance/asset optimization + advanced routing. **SEO nahi** (already Batch 2 mein core — 2.4; sirf project mein reinforce).
- **Parallel + Intercepting Routes depth:** **Halka** (roadmap jaisa) — `@slot` layouts + `(.)` intercept, Instagram-style modal, URL-shareable. Full syntax deep-dive nahi.
- **SEO reinforce:** Haan — gallery pages pe static metadata + dynamic `generateMetadata` (Batch 2 revision, koi naya concept nahi).
- **Photo Gallery data:** **Prisma + Neon** (Batch 6 Task Board ke skills reuse) — `Photo` model, migrate, SC read. Read-only showcase (koi SA mutations nahi — roadmap display-focus; SA already Batch 6 mein covered).
- **Source material:** Koi dedicated Batch 7 source docs nahi — roadmap + existing course patterns + Next.js docs knowledge se write karna hai. Style sources: `prompts/Master Teaching Prompt.md`, `prompts/Dost-to-Dost Style.md`, `AGENTS.md`, `docs/coding/AGENTIC-AI-WRITING-RULES.md`.
- **test-next untouched** — gallery = fresh project (Batch 7 project user apna banayega; `test-next` sirf practice demo rehta hai).

## 3. Manual → Better Pairs (batch ka spine)

| Topic | Manual (pehle problem feel) | Better (Next.js solution) |
|---|---|---|
| Images | `<img>` — LCP slow, layout shift (CLS), koi srcset/sizes, har size alag file, external bandwidth | `next/image` — automatic optimization, srcset/sizes, `fill`, responsive, priority, local/remote |
| Fonts | `@font-face`/Google Fonts link — FOUC + CLS (font swap shift) | `next/font/google` + variable fonts — self-hosted, preload, `adjustFontFallback`, no layout shift |
| Loading | Poora page wait (block) — bad UX | Streaming with Suspense — section-wise load, `loading.tsx` = route-level Suspense, `<Suspense>` granular |
| Modal | Client state modal (URL nahi, share/back/refresh pe khatam) | Parallel + Intercepting Routes — modal URL pe (Instagram pattern), deep-linkable |

## 4. File Structure (13 files)

### Phase 1 — Concepts (7 files)
| File | Content |
|---|---|
| **7.0** Kya Seekhenge | Batch intro (6.13.5 Task Board closing se bridge), roadmap, 4 manual→better pairs, combined project overview |
| **7.1** Manual images | `<img>` problems: LCP, CLS (dimensions na ho toh shift), srcset/sizes kyun zaroori, bandwidth, `loading="lazy"` limitations |
| **7.2** `next/image` | `Image` component: automatic optimization, `sizes`/`srcset`, `fill`, `priority`, remote (`remotePatterns`), before/after size compare |
| **7.3** Manual fonts | FOUC + CLS: Google Fonts `<link>` — network delay, font swap shift, preload na hona |
| **7.4** `next/font` | `next/font/google` `Inter`/`Geist`, variable fonts, self-hosted (koi external request nahi), preload, no CLS, `next/font/local` mention |
| **7.5** Streaming with Suspense | Page block vs section-wise; async SC suspend → fallback; `<Suspense>` + `fallback`; `loading.tsx` = route-level; skeleton |
| **7.6** Parallel + Intercepting Routes | **Halka** — parallel `@slot` (ek layout, multiple views), intercepting `(.)photo/[id]` (URL unchanged UI swap) → modal; why: shareable URL, back button, refresh state |

### Phase 2 — Combined Project #7: Photo Gallery (6 files, series-prompt process)
| File | Content |
|---|---|
| **7.7.1** Planning | 4 sawaal (kya, pages, data shape, flow), DB choice (Prisma + Neon reuse), routes table |
| **7.7.2** Hardcoded UI | Gallery grid (static array, plain `<img>`) + photo detail page — design confirm, images pehle manual |
| **7.7.3** Data Layer + Read + SEO | Prisma `Photo` model (url/title/description/width/height/order), migrate, SC read + `metadata`/`generateMetadata` reinforce |
| **7.7.4** `next/image` + `next/font` | DB images pe Image component (before/after compare), project-wide `next/font`, remotePatterns |
| **7.7.5** Photo Modal | Parallel `@modal` slot + `(.)photo/[id]` intercept — grid click → modal, direct URL → detail page |
| **7.7.6** Streaming + States + Testing + Summary | Slow gallery grid Suspense streaming, loading/error states, test table, Batch 7 journey recap |

## 5. Writing Conventions (Batch 6 fixes carry forward — CRITICAL)

- **Har code block pe file label** — `// app/page.tsx` style comment inside block + `**File:** app/...` line outside.
- **Full accumulating file per stage** — stage koi code block nahi jo sirf "naya hissa" dikhaye. Poora file dikhao, nayi lines pe `// NEW` marker.
- **Placement clarity** — existing function ke context mein batao "X ke neeche add karo".
- **Gradual SOCH → CONCEPT → CODE → TEST** har step mein.
- **Compare/contrast table LAST** — pehle har concept ek-ek clear, phir table (7.2 mein manual vs next/image compare table end pe).
- **Naye concept ko pehle mention karna ho** toh "agle topic mein detail mein" bolo + simple working definition do.
- **"In Your Own Words"** — 3-5 questions, sirf is file mein padhaya, `<details>` accordion, logic test.
- **"What It Is NOT"** section har naye concept pe.
- **Nutshell** naye concepts ke liye.
- **Koi real-life analogy nahi** — sirf technical + dost-to-dost Hinglish (batch-wide).
- React comparisons hamesha generic (kisi specific React course project ka naam nahi).
- **Manual → Better:** pehle manual problem full feel, phir Next.js solution — "why" pehle, "how" baad.

## 6. Code Style per Topic

- **Images:** `<img>` (manual) vs `next/image` `Image` component — `src`, `width`, `height`, `fill`, `sizes`, `priority`, `remotePatterns` in `next.config.ts`.
- **Fonts:** `next/font/google` — `const Inter = Inter({ subsets: ["latin"], variable: "--font-inter" })`, className layout pe, `Geist` mention.
- **Streaming:** `loading.tsx` (route-level) + `<Suspense fallback={<Skeleton />}>` granular sections, `async` SC.
- **Routing:** `@modal` parallel slot in layout, `app/@modal/(.)photo/[id]/page.tsx` intercepting, `default.tsx`, `router.back()` or Link.
- **Prisma (7.7.3+):** `prisma/schema.prisma` (Photo model), `npx prisma migrate dev`, `lib/prisma.ts` singleton, `prisma.photo.findMany/findUnique` — Batch 6 6.13.3 pattern.

## 7. Consistency Updates Needed (batch end)

1. `docs/coding/Next JS/Nextjs-Final-Roadmap.md` — Batch 7 section: T/U/V/W letters → actual file numbers, project = Photo Gallery (Prisma + Neon data source) update.
2. `lib/subjects/nextjs.subject.ts` — `batch7` phase append (13 files: 7.0-7.6 + 7.7.1-7.7.6 + ... = 13).
3. Bridge verify: 6.13.5 closing (Batch 6→7) — 6.13.5 ke end mein "aage ka koi bhi project" generic hai, koi Batch 7 mention nahi — 7.0 se seedha connect karna.

## 8. Execution Order

7.0 → 7.1 → 7.2 → 7.3 → 7.4 → 7.5 → 7.6 → 7.7.1 → 7.7.2 → 7.7.3 → 7.7.4 → 7.7.5 → 7.7.6, har file ke baad user review. Phir roadmap + subject.ts.

## 9. Verification Checklist (final pass ke liye)

- [ ] Har code block pe file label + placement context
- [ ] Full accumulating files + `// NEW` markers
- [ ] Compare tables LAST
- [ ] Manual → Better order har pair mein (manual pehle, Next solution baad)
- [ ] Parallel + Intercepting halka rakha (no deep syntax dive)
- [ ] SEO reinforce sirf project mein (koi naya concept nahi)
- [ ] Photo Gallery = Prisma + Neon, read-only showcase
- [ ] Roadmap + subject.ts updated
- [ ] `test-next` untouched
