# Doc Project 01 — HTML Structure

## Cheat Sheet (Quick Recall)

- Semantic structure: header, nav, main, section, aside, footer.
- Use classes for styling hooks.
- Include meta tags (charset, viewport, description).
- Link CSS and favicon.

## Where We Are So Far

CSS Grid is complete. Now the project — a responsive landing page. First, the HTML structure.

## Broader Goal

The overall goal is a complete responsive landing page. Current step: HTML structure. Connection: all HTML/CSS concepts learned; now combine.

## Main Content

### THINK

A landing page needs structure: header (logo/nav), hero section, features, footer. Use semantic HTML. First structure, then classes, then meta tags.

### CONCEPT

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Landing Page</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="header">
    <nav class="nav">...</nav>
  </header>
  <main>
    <section class="hero">...</section>
    <section class="features">...</section>
  </main>
  <footer class="footer">...</footer>
</body>
</html>
```

- Semantic tags for structure.
- Classes for styling hooks.
- Meta tags for SEO/responsiveness.

### CODE (gradual)

Stage 1 — Skeleton:

```html
<header></header>
<main></main>
<footer></footer>
```

Stage 2 — Add sections:

```html
<header><nav>...</nav></header>
<main>
  <section class="hero">...</section>
  <section class="features">...</section>
</main>
<footer>...</footer>
```

Stage 3 — Add meta + link:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Landing Page</title>
  <link rel="stylesheet" href="styles.css" />
</head>
```

### TEST

Three questions:

1. What semantic tags for page structure? (header, nav, main, section, footer)
2. What meta tag for responsiveness? (viewport)
3. Where to link CSS? (in `<head>`)

**Checkpoint:** Create the HTML structure and verify in browser.

## Common Mistakes

- Using `<div>` for everything.
- Missing viewport meta.
- Missing CSS link.

## Try It Yourself

1. Build the HTML structure.
2. Add content to each section.
3. Validate HTML.

## Summary

- Semantic structure: header, nav, main, section, footer.
- Meta tags: charset, viewport, title.
- Link CSS in `<head>`.

## Next Step

HTML structure is clear. Next, CSS styling. Next: Project 02 — CSS Styling.

---

**In Your Own Words**

1. What semantic tags for page structure?

<details>
<summary>Sample Answer</summary>

**Answer:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.

</details>

2. What meta tag for responsiveness?

<details>
<summary>Sample Answer</summary>

**Answer:** `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.

</details>

3. Where to link CSS?

<details>
<summary>Sample Answer</summary>

**Answer:** In `<head>` via `<link rel="stylesheet" />`.

</details>

4. Why use semantic tags?

<details>
<summary>Sample Answer</summary>

**Answer:** Accessibility and SEO.

</details>

5. What goes in `<head>`?

<details>
<summary>Sample Answer</summary>

**Answer:** Metadata (charset, viewport, title, CSS link).

</details>

## What It Is NOT

- ❌ `<div>` is **not** semantic.
- ❌ Missing viewport is **not** responsive.
- ❌ CSS link is **not** in `<body>`.