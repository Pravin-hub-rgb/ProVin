# Doc HTML 13 — CSS in HTML

## Cheat Sheet (Quick Recall)

- Inline: `style="..."` on element.
- Internal: `<style>` in `<head>`.
- External: `<link rel="stylesheet" href="styles.css" />`.
- External is preferred for real projects.

## Where We Are So Far

HTML 12 covered colors. Now CSS in HTML — the three ways to add CSS.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: ways to apply CSS.

## Main Content

### THINK

HTML structures; CSS styles. There are three ways to connect them: inline, internal, external. First inline (quick), then internal, then external (preferred).

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
3. Where does `<style>` go? (`<head>`)

**Checkpoint:** Create an external CSS file, link it, verify styles apply.

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
- `<style>` goes in `<head>`.

## Next Step

CSS in HTML is clear. Next, links. Next: HTML 14 — Links.

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

3. Where does the `<style>` tag go?

<details>
<summary>Sample Answer</summary>

**Answer:** Inside `<head>`.

</details>

4. What is an inline style?

<details>
<summary>Sample Answer</summary>

**Answer:** CSS applied via the `style` attribute on an element.

</details>

5. How to link an external CSS file?

<details>
<summary>Sample Answer</summary>

**Answer:** `<link rel="stylesheet" href="styles.css" />`.

</details>

## What It Is NOT

- ❌ Inline styles are **not** preferred for large projects.
- ❌ `<style>` does **not** go in `<body>` (technically works but not standard).
- ❌ CSS is **not** HTML.