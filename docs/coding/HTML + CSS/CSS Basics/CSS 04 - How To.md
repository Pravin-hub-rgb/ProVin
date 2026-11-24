# Doc CSS 04 — How To

## Cheat Sheet (Quick Recall)

- Inline: `style="..."` on element.
- Internal: `<style>` in `<head>`.
- External: `<link rel="stylesheet" href="styles.css" />` (preferred).
- External keeps HTML clean and reusable.

## Where We Are So Far

CSS 03 covered selectors. Now how to add CSS to HTML.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: ways to apply CSS.

## Main Content

### THINK

CSS can be applied three ways: inline, internal, external. First inline (quick), then internal, then external (preferred for real projects).

### CONCEPT

**Inline:**

```html
<h1 style="color: blue;">Hello</h1>
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
<p style="color: red;">Red</p>
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

1. Three ways to add CSS? (inline, internal, external)
2. Which is preferred? (external)
3. Where does `<style>` go? (`<head>`)

**Checkpoint:** Create an external CSS file, link it, verify.

## Common Mistakes

- Forgetting to link CSS.
- Inline styles everywhere.
- Missing semicolons.

## Try It Yourself

1. Style with inline CSS.
2. Move to external file.
3. Add multiple properties.

## Summary

- Inline, internal, external.
- External preferred for maintainability.

## Next Step

How to add CSS is clear. Next, comments. Next: CSS 05 — Comments.

---

**In Your Own Words**

1. Name the three ways to add CSS.

<details>
<summary>Sample Answer</summary>

**Answer:** Inline, internal (`<style>`), external (`.css` via `<link>`).

</details>

2. Which is preferred for real projects?

<details>
<summary>Sample Answer</summary>

**Answer:** External stylesheet.

</details>

3. Where does `<style>` go?

<details>
<summary>Sample Answer</summary>

**Answer:** In `<head>`.

</details>

4. What is an inline style?

<details>
<summary>Sample Answer</summary>

**Answer:** CSS applied via the `style` attribute.

</details>

5. How to link an external CSS file?

<details>
<summary>Sample Answer</summary>

**Answer:** `<link rel="stylesheet" href="styles.css" />`.

</details>

## What It Is NOT

- ❌ Inline is **not** preferred for large projects.
- ❌ `<style>` does **not** go in `<body>` (technically works).
- ❌ CSS is **not** HTML.