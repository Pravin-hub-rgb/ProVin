# Doc CSS Advanced 08 — Custom Fonts

## Cheat Sheet (Quick Recall)

- `@font-face` to load custom fonts.
- Formats: WOFF2 (best), WOFF, TTF, OTF.
- `font-family` name + `src` URL.
- Google Fonts: `<link>` or `@import`.

## Where We Are So Far

CSS Advanced 07 covered text effects. Now custom fonts — loading your own fonts.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: custom fonts.

## Main Content

### THINK

System fonts are limited. Custom fonts improve branding. First `@font-face`, then formats, then Google Fonts.

### CONCEPT

```css
@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2"),
       url("myfont.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}

body { font-family: "MyFont", sans-serif; }
```

- `font-family`: name you choose.
- `src`: file URL + format.
- `font-weight`/`font-style`: match variants.

**Google Fonts:**

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
```

### CODE (gradual)

Stage 1 — @font-face:

```css
@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2");
}
```

Stage 2 — Use it:

```css
body { font-family: "MyFont", sans-serif; }
```

Stage 3 — Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
```

### TEST

Three questions:

1. How to load a custom font? (`@font-face`)
2. Best font format? (WOFF2)
3. How to use Google Fonts? (`<link>` or `@import`)

**Checkpoint:** Load a custom font and apply it.

## Common Mistakes

- Wrong font path.
- Missing `format()` hint.
- Not providing fallback font.
- FOUT (flash of unstyled text) — use `font-display: swap`.

## Try It Yourself

1. Load a font with `@font-face`.
2. Use Google Fonts.
3. Add `font-display: swap`.

## Summary

- `@font-face` for custom fonts.
- WOFF2 best format.
- Google Fonts via `<link>`.

## Next Step

Custom fonts are clear. Next, 2D transforms. Next: CSS Advanced 09 — 2D Transforms.

---

**In Your Own Words**

1. How to load a custom font?

<details>
<summary>Sample Answer</summary>

**Answer:** `@font-face` with `font-family` and `src`.

</details>

2. What is the best font format?

<details>
<summary>Sample Answer</summary>

**Answer:** WOFF2.

</details>

3. How to use Google Fonts?

<details>
<summary>Sample Answer</summary>

**Answer:** `<link>` to Google Fonts CSS or `@import`.

</details>

4. Why include a fallback font?

<details>
<summary>Sample Answer</summary>

**Answer:** If custom font fails to load.

</details>

5. What does `font-display: swap` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Shows fallback font until custom font loads (avoids invisible text).

</details>

## What It Is NOT

- ❌ Custom fonts are **not** auto-loaded.
- ❌ WOFF2 is **not** the only format.
- ❌ Missing fallback is **not** safe.