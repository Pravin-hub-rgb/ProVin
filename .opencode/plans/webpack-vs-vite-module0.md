# Plan — Add "Webpack (old) vs Vite (new)" discussion to React Module 0

## Goal
Add a webpack-vs-Vite discussion in Module 0 of the React course (`docs/coding/React JS`), placed inline in `0.8 Project Setup.md` at section 4 (where Vite is first introduced, right before the `create-vite` command in section 5). Also add matching quiz questions to `0.8 Quiz — Project Setup.md` and one recap question in 0.8.

## Placement rationale
- 0.8 already mentions "CRA was webpack-based — slow" as a one-liner in section 4; expand that into the full comparison there.
- Inline keeps it "not too big", matches the user's request to explain "earlier we used to have X, now old and slow, why slow" at the point Vite is first introduced.
- No new file; avoids numbering churn and keeps 0.8 focused on setup steps while deepening the tooling "why".

## Files to edit
1. `docs/coding/React JS/Module 0 - React Kaise Kaam Karta Hai/0.8 Project Setup.md` — replace section 4 block + add recap question.
2. `docs/coding/React JS/Module 0 - React Kaise Kaam Karta Hai/0.8 Quiz — Project Setup.md` — add MCQ, TrueFalse, ShortAnswer entries.

## Edit 1 — 0.8 Project Setup.md, section 4 replacement
Replace the existing section-4 block with expanded version covering:
- Vite's 3 jobs (unchanged)
- `### Webpack (the old way) vs Vite (the new way)`
  - What webpack did + why slow (full re-bundle on every change, heavy config)
  - What Vite does instead (native ESM in dev, on-demand transform, HMR instant; bundle deferred to prod)
  - Tools Vite sits on: esbuild (Go, dev transforms/pre-bundle), Rollup (prod build)
  - Next wave awareness: Turbopack (Vercel/Rust, Next.js), Oxlint (Rust linter replacing ESLint — detail in 0.8.5)
  - Clarification (rewrite, not "better CRA")
  - Why Vite is fast recap (unchanged)
  - React docs no longer recommend CRA (unchanged)
- Closing line unchanged.

## Edit 2 — 0.8 Quiz file additions
- MCQ (after `create-vite` vs `vite` block): which tool Vite uses for fast dev dependency pre-bundling/TS-JSX transform → esbuild; note Rollup/webpack/Turbopack.
- TrueFalse (after CRA webpack TrueFalse): "In dev Vite bundles whole project like webpack" → False.
- ShortAnswer (after HMR ShortAnswer): "Why was webpack-based dev (CRA) slow, and how does Vite fix it?" with sample answer covering esbuild/Rollup.

## Edit 3 — 0.8 recap questions
Add question 5: "Name the tools Vite uses for dev transforms vs production build, and one 'next wave' tool you should be aware of."

## Verification
- Re-read edited sections for flow and consistency with course style (conversational, terms defined inline, no sudden bullet lists without transitions; table at end only — here bullets are explanatory lists under headings, acceptable as in existing files).
- Ensure no duplicate of Oxlint coverage already in 0.8.5 (only cross-reference).
- Confirm file lengths / no broken markdown.

## Out of scope (not done)
- No new dedicated file (user said "not that big").
- No edits to 0.8.5 or 0.9 interview questions (avoid duplication; Oxlint already in 0.8.5).
- No coding-hi course changes.
