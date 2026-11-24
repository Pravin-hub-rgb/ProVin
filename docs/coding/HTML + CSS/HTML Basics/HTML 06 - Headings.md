# Doc HTML 06 — Headings

## Cheat Sheet (Quick Recall)

- `<h1>` to `<h6>`: heading levels.
- `<h1>` most important, `<h6>` least.
- Use one `<h1>` per page (SEO/accessibility).
- Do not skip levels for styling — use CSS.

## Where We Are So Far

HTML 05 covered attributes. Now headings — the title structure of a page.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: heading hierarchy.

## Main Content

### THINK

Headings give a page structure, like a table of contents. `<h1>` is the main title, `<h2>` sections, `<h3>` subsections. First hierarchy, then SEO/accessibility, then common mistakes.

### CONCEPT

```html
<h1>Main Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
<h5>Minor</h5>
<h6>Smallest</h6>
```

- Use headings in order (do not skip from h1 to h3 without h2).
- Styling (size/color) is done with CSS, not by picking a heading level.

### CODE (gradual)

Stage 1 — Single heading:

```html
<h1>Welcome</h1>
```

Stage 2 — Hierarchy:

```html
<h1>Blog Title</h1>
<h2>Post 1</h2>
<h3>Introduction</h3>
<h2>Post 2</h2>
```

Stage 3 — With paragraphs:

```html
<h1>Title</h1>
<p>Intro paragraph.</p>
<h2>Section</h2>
<p>Section content.</p>
```

### TEST

Three questions:

1. How many heading levels? (6: h1–h6)
2. Which is most important? (`<h1>`)
3. Should you skip levels? (No)

**Checkpoint:** Create a page with h1, h2, h3 and verify hierarchy in DevTools.

## Common Mistakes

- Multiple `<h1>` on one page (SEO issue).
- Skipping levels (h1 → h3).
- Using headings for styling instead of CSS.

## Try It Yourself

1. Build a page with proper heading hierarchy.
2. Inspect headings in DevTools.
3. Style headings with CSS (not by changing level).

## Summary

- `<h1>`–`<h6>` heading levels.
- One `<h1>` per page; do not skip levels.
- Styling via CSS, not heading level.

## Next Step

Headings are clear. Next, paragraphs. Next: HTML 07 — Paragraphs.

---

**In Your Own Words**

1. How many heading levels exist in HTML?

<details>
<summary>Sample Answer</summary>

**Answer:** Six: `<h1>` through `<h6>`.

</details>

2. Which heading is the most important?

<details>
<summary>Sample Answer</summary>

**Answer:** `<h1>`.

</details>

3. Should you skip heading levels?

<details>
<summary>Sample Answer</summary>

**Answer:** No — use them in order.

</details>

4. How many `<h1>` should a page have?

<details>
<summary>Sample Answer</summary>

**Answer:** One.

</details>

5. Should heading size be controlled by level or CSS?

<details>
<summary>Sample Answer</summary>

**Answer:** CSS — do not pick a level just for size.

</details>

## What It Is NOT

- ❌ Headings are **not** for styling — use CSS.
- ❌ `<h1>` is **not** for the largest text — it is the main title.
- ❌ Skipping levels is **not** recommended.