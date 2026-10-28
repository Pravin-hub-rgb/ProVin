# Plan: Geopolitics Phase 0 — Beginner-Friendly Rewrite

## Goal
Make Phase 0 ("Zero Foundation") actually *zero-foundation*:
- **No term used before it is explained.** Every key term gets a brief inline `(definition)` on first use.
- **No reader-specific / meta commentary.** Strip phrases like "you also mentioned…", "we started…", "the word you did not know". Keep a general, journal-style voice (not targeted at one person).
- **Fix the knowledge ordering in 0.1** so the Indian-Ocean→Arabian-Sea/Bay-of-Bengal structure is explained *before* the "India looks like a wall between two waters" sentence that assumes it.

## Decisions (locked)
1. **Term definitions = inline `()` parenthetical on FIRST use.** No separate glossary file. (User confirmed.) Keep definitions to one short sentence.
2. **Tone = general journal style.** Neutral "you" is fine; remove any line referring to the reader's prior confusion, "what you said earlier," or "the word we started with."
3. **Preserve structure.** Keep existing headings, "What this file is not", phase bridges, and "In Your Own Words" `<details>` accordions per `AGENTS.md` + `docs/coding/AGENTIC-AI-WRITING-RULES.md`.
4. **Do not undercut 0.2.** Where 0.1 uses "sovereignty" only as a throwaway, rephrase to avoid the term (e.g., "no state owns or controls it") so 0.2 keeps it as a teaching centerpiece.
5. **Scope = Phase 0.** Phases 1–6 use the same framework in a follow-up pass. The `Next JS` open tabs are unrelated — out of scope.

## Concrete tasks

### T1. `0.1 The World Map - Seven Continents and Five Oceans.md`
- **Reorder** the Arabian Sea / Bay of Bengal explanation. Add a short subsection *"The Indian Ocean, split in two"* that states: the Indian Ocean is the large body of water south of India; the Indian peninsula splits it into the **Arabian Sea (west)** and the **Bay of Bengal (east)**. Place this *before* the "looks like a wall between two waters" line.
- **Map note/clarity:** ensure the caption or a clarifying sentence states west = Arabian Sea, east = Bay of Bengal (or explicitly note the map limits). Do not assume the renderer highlights both.
- **Inline `()` first-use definitions** for: *hemisphere*, *exclusive economic zone (EEZ)*, *high seas*.
- **Avoid "sovereignty"** in this file — rephrase "no state has sovereignty over it" → "no state owns or controls it" (sovereignty is taught in 0.2).
- Remove any reader-specific phrasing (0.1's opening "no word will be used before I explain it" is generic and OK to keep, but *honor* it by the fixes above).
- Keep "What this file is not", bridge, and "In Your Own Words" intact.

### T2. `0.2 What Is a Country - Sovereignty, Population, Government and Recognition.md`
- **Delete** the line: *"You also mentioned a word you did not recognise when we started — sovereignty. This file explains it from nothing."*
- **Delete** the heading *"Sovereignty — the word you did not know"* → replace with neutral **"Sovereignty"**.
- **Inline `()` first-use** for:
  - `sovereignty (the right of a country to make its own decisions without other countries forcing it)`
  - `treaty (a formal written agreement between countries)` — first use at "sign treaties"
  - `United Nations (UN)` then `(the global organization of 193 member countries)` — first use in "equal members of the United Nations"
  - `Montevideo Convention (1933 agreement that set the standard test for what counts as a country)`
  - `declarative theory (a state exists as soon as it meets the four criteria)`
  - `constitutive theory (a state exists only when other states recognise it)`
  - `union territory (a region governed directly by a country's central government; India has 8)`
  - `effective control (actually ruling a territory, as opposed to merely claiming it)`
- Keep existing inline teaching of *government*, *permanent population*, *defined territory*, *recognition* (already explained when first used). Add `()` only where the term is dropped without explanation.
- Keep "What this file is not", Kashmir example, Kosovo/Taiwan/Somaliland cases, bridge, and quiz — ensure no reader-specific phrasing remains.

### T3. `0.3 How Borders Are Made ...` / `0.4 Land, People and Resources ...` / `0.5 Reading a Map ...` + `0.5 Quiz`
- Apply the **same framework**: every first-use key term gets `()`; strip reader-specific/meta commentary; confirm the file keeps its own "no word used before explained" promise.
- Likely new `()` defs (confirm on read): *natural border*, *artificial border*, *resource curse*, *strategic depth*, *latitude*, *longitude*, *map projection*, *declination/precession n/a*. Edit conservatively — only add `()` where a term is first used without explanation.

### T4. `00-course-roadmap.md`
- Verify it stays general/beginner-friendly (it is meta; appears clean). **No edit unless** reader-specific phrasing is found. (If clean, leave untouched.)

### T5. `AGENTS.md` (project convention file)
- **Recommended follow-up edit** (not core to content, but prevents recurrence): add one line under "### 5. Writing Style" — *"Key terms: define inline with `(...)` on first use; no reader-specific/meta commentary (e.g., 'you mentioned', 'we started')."* — so future content does not reintroduce the targeted tone.

## Repeatable audit framework (for Phases 1–6, follow-up pass)
- grep targeted/meta phrases (case-insensitive): `you also mentioned`, `we started`, `as you said`, `you mentioned`, `the word you did not`, `did not recognise`.
- grep capitalized org/terms to verify first-use `()`: `United Nations`, ` the UN`, `Montevideo`, `Treaty`.
- For every file: confirm the first occurrence of each key term is immediately followed by `(`.
- Confirm each file's "In Your Own Words" references only what that file actually taught.

## Validation
- Re-read T1 + T2; confirm **zero** reader-specific/meta phrases remain.
- 0.1: the Indian Ocean→Arabian Sea/Bay of Bengal structure is explained before the "wall between two waters" sentence.
- grep confirms no first-use key term lacks a `()` definition in 0.1–0.5.
- Quiz questions in `0.5 Quiz` still test only this phase's own content.

## Out of scope (explicit)
- Phases 1–6 content rewrites — same framework, separate pass once remaining issues are described.
- `docs/coding/Next JS/Job Ready Course Notes.md` and `job ready video course script.md` (unrelated open tabs).
- No code/scripts: geopolitics is a non-technical course.

## Notes for the implementer
- Do **not** change the `<geo-map>` tag syntax; only fix captions/labels/clarifying sentences so the map's meaning is unambiguous.
- Keep the conversational, analogy-rich style from `0.1` (cricket-match metaphor, house-ownership analogy) — that part works well; only the *ordering*, *undefined terms*, and *targeted tone* need fixing.
