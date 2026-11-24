# Doc HTML 29 — Semantic HTML

## Cheat Sheet (Quick Recall)

- Semantic tags describe meaning, not just appearance.
- Common: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`.
- Improves accessibility and SEO.
- Prefer semantic tags over `<div>`/`<span>`.

## Where We Are So Far

HTML 28 covered code elements. Now semantic HTML — meaningful tags.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: semantic elements.

## Main Content

### THINK

`<div>` and `<span>` are generic. Semantic tags (`<header>`, `<nav>`, `<main>`, etc.) describe what the content is. This helps accessibility (screen readers) and SEO. First common semantic tags, then when to use them.

### CONCEPT

```html
<header>...</header>
<nav>...</nav>
<main>
  <article>...</article>
  <section>...</section>
  <aside>...</aside>
</main>
<footer>...</footer>
<figure>
  <img src="..." alt="..." />
  <figcaption>Caption</figcaption>
</figure>
```

- `<header>`: introductory content.
- `<nav>`: navigation links.
- `<main>`: dominant content.
- `<article>`: self-contained content.
- `<section>`: thematic grouping.
- `<aside>`: tangentially related (sidebar).
- `<footer>`: footer info.
- `<figure>`/`<figcaption>`: media + caption.

### CODE (gradual)

Stage 1 — Generic (div soup):

```html
<div class="header">...</div>
<div class="nav">...</div>
```

Stage 2 — Semantic:

```html
<header>...</header>
<nav>...</nav>
```

Stage 3 — Full page:

```html
<header>...</header>
<nav>...</nav>
<main>
  <article>...</article>
  <aside>...</aside>
</main>
<footer>...</footer>
```

### TEST

Three questions:

1. What are semantic elements? (tags with meaning)
2. Name three semantic tags. (`header`, `nav`, `main`, `article`, etc.)
3. Why use semantic HTML? (accessibility, SEO)

**Checkpoint:** Rewrite a div-based page using semantic tags.

## Common Mistakes

- Using `<div>` for everything.
- Multiple `<main>` elements.
- Misusing `<section>` (use for thematic groups).

## Try It Yourself

1. Convert a div-based layout to semantic.
2. Add `<figure>` with `<figcaption>`.
3. Inspect in DevTools (accessibility tree).

## Summary

- Semantic tags describe meaning.
- Improve accessibility and SEO.
- Prefer over `<div>`/`<span>`.

## Next Step

Semantic HTML is clear. Next, style guide. Next: HTML 30 — Style Guide.

---

**In Your Own Words**

1. What is semantic HTML?

<details>
<summary>Sample Answer</summary>

**Answer:** HTML that uses meaningful tags to describe content.

</details>

2. Name three semantic elements.

<details>
<summary>Sample Answer</summary>

**Answer:** `<header>`, `<nav>`, `<main>` (also `article`, `section`, `aside`, `footer`).

</details>

3. Why use semantic HTML?

<details>
<summary>Sample Answer</summary>

**Answer:** Accessibility and SEO.

</details>

4. What is `<figure>` used for?

<details>
<summary>Sample Answer</summary>

**Answer:** Media content with a caption (`<figcaption>`).

</details>

5. What is wrong with "div soup"?

<details>
<summary>Sample Answer</summary>

**Answer:** No semantic meaning; harder for screen readers and SEO.

</details>

## What It Is NOT

- ❌ `<div>` is **not** semantic.
- ❌ Semantic tags are **not** for styling.
- ❌ `<section>` is **not** a generic container.