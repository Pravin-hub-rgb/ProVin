# Doc CSS 15 — Fonts

## Cheat Sheet (Quick Recall)

- `font-family`: font stack (e.g., "Arial, sans-serif").
- `font-size`: px, rem, em, %.
- `font-weight`: 100–900 or normal/bold.
- `font-style`: normal/italic/oblique.
- `@font-face` for custom fonts.

## Where We Are So Far

CSS 14 covered text. Now fonts — typography.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: fonts.

## Main Content

### THINK

Fonts affect readability and brand. First font-family (stack), then size/weight/style, then custom fonts.

### CONCEPT

```css
body {
  font-family: "Helvetica", Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
}
```

- `font-family`: list of fonts (fallback).
- `font-size`: absolute/relative units.
- `font-weight`: 100–900 (400 normal, 700 bold).
- `font-style`: normal/italic/oblique.

**Custom font (@font-face):**

```css
@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2");
}
```

### CODE (gradual)

Stage 1 — Font family:

```css
p { font-family: Arial, sans-serif; }
```

Stage 2 — Size + weight:

```css
p { font-size: 18px; font-weight: 700; }
```

Stage 3 — Custom font:

```css
@font-face { font-family: "MyFont"; src: url("myfont.woff2") format("woff2"); }
p { font-family: "MyFont", sans-serif; }
```

### TEST

Three questions:

1. What is a font stack? (list of fonts with fallback)
2. What font-weight is bold? (700)
3. How to load custom fonts? (`@font-face`)

**Checkpoint:** Apply a font stack and custom font.

## Common Mistakes

- No fallback font.
- Using px for font-size (not scalable).
- Wrong font file format.

## Try It Yourself

1. Set a font stack.
2. Change font-weight.
3. Load a custom font.

## Summary

- `font-family`, `font-size`, `font-weight`, `font-style`.
- Font stack with fallback.
- `@font-face` for custom fonts.

## Next Step

Fonts are clear. Next, icons. Next: CSS 16 — Icons.

---

**In Your Own Words**

1. What is a font stack?

<details>
<summary>Sample Answer</summary>

**Answer:** A list of fonts with fallbacks.

</details>

2. What font-weight is bold?

<details>
<summary>Sample Answer</summary>

**Answer:** 700 (or `bold`).

</details>

3. How to load a custom font?

<details>
<summary>Sample Answer</summary>

**Answer:** `@font-face` with `src`.

</details>

4. Why include a fallback font?

<details>
<summary>Sample Answer</summary>

**Answer:** If the primary font fails to load.

</details>

5. What unit is scalable for font-size?

<details>
<summary>Sample Answer</summary>

**Answer:** `rem`, `em`, `%`.

</details>

## What It Is NOT

- ❌ Missing fallback is **not** safe.
- ❌ `font-weight: bold` is **not** a number.
- ❌ Custom fonts are **not** auto-loaded.