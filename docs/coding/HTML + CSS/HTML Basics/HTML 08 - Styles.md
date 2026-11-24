# Doc HTML 08 — Styles

## Cheat Sheet (Quick Recall)

- Inline styles: `style="property: value;"`.
- Internal: `<style>` in `<head>`.
- External: `<link rel="stylesheet" href="styles.css" />` (preferred).
- CSS syntax: `selector { property: value; }`.

## Where We Are So Far

HTML 07 covered paragraphs. Now styles — how to add CSS to HTML.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: ways to apply styles.

## Main Content

### THINK

HTML structures content; CSS styles it. There are three ways to add CSS: inline, internal, external. First inline (quick), then internal, then external (preferred for real projects).

### CONCEPT

**Inline:**

```html
<h1 style="color: blue; font-size: 32px;">Hello</h1>
```

**Internal:**

```html
<head>
  <style>
    h1 { color: blue; }
  </style>
</head>
```

**External (preferred):**

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

```css
/* styles.css */
h1 { color: blue; }
```

### CODE (gradual)

Stage 1 — Inline:

```html
<p style="color: red;">Red text</p>
```

Stage 2 — Internal:

```html
<style>
  p { color: red; }
</style>
```

Stage 3 — External:

```html
<link rel="stylesheet" href="styles.css" />
```

### TEST

Three questions:

1. What are the three ways to add CSS? (inline, internal, external)
2. Which is preferred for real projects? (external)
3. What is CSS syntax? (`selector { property: value; }`)

**Checkpoint:** Create an external CSS file, link it, and verify styles apply.

## Common Mistakes

- Forgetting to link the external CSS file.
- Inline styles everywhere (hard to maintain).
- Missing semicolons in CSS.

## Try It Yourself

1. Style a heading with inline CSS.
2. Move it to an external file.
3. Add multiple properties.

## Summary

- Inline, internal, external CSS.
- External is preferred for maintainability.
- CSS syntax: `selector { property: value; }`.

## Next Step

Styles are clear. Next, formatting text. Next: HTML 09 — Formatting.

---

**In Your Own Words**

1. Name the three ways to add CSS to HTML.

<details>
<summary>Sample Answer</summary>

**Answer:** Inline, internal (`<style>`), external (`.css` file via `<link>`).

</details>

2. Which method is preferred for real projects?

<details>
<summary>Sample Answer</summary>

**Answer:** External stylesheet.

</details>

3. What is CSS syntax?

<details>
<summary>Sample Answer</summary>

**Answer:** `selector { property: value; }`.

</details>

4. What is an inline style?

<details>
<summary>Sample Answer</summary>

**Answer:** CSS applied via the `style` attribute on an element.

</details>

5. Where does the `<style>` tag go?

<details>
<summary>Sample Answer</summary>

**Answer:** Inside `<head>`.

</details>

## What It Is NOT

- ❌ Inline styles are **not** preferred for large projects.
- ❌ `<style>` does **not** go in `<body>` (technically works but not standard).
- ❌ CSS is **not** HTML.