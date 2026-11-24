# Doc CSS 16 — Icons

## Cheat Sheet (Quick Recall)

- Icon fonts: Font Awesome, Material Icons.
- SVG icons: inline or `<img>`.
- CSS for icon size/color: `font-size`, `color`.
- Use `aria-label` for accessibility.

## Where We Are So Far

CSS 15 covered fonts. Now icons — visual symbols.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: icons.

## Main Content

### THINK

Icons are visual symbols (search, menu, close). They can be icon fonts or SVG. First icon fonts, then SVG, then styling.

### CONCEPT

**Icon fonts (Font Awesome):**

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
<i class="fas fa-home"></i>
```

**SVG icons:**

```html
<svg width="24" height="24" viewBox="0 0 24 24">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
</svg>
```

**Styling:**

```css
.icon { font-size: 24px; color: blue; }
```

### CODE (gradual)

Stage 1 — Icon font:

```html
<i class="fas fa-home"></i>
```

Stage 2 — SVG:

```html
<svg width="24" height="24"><circle cx="12" cy="12" r="10" /></svg>
```

Stage 3 — Style:

```css
.icon { font-size: 32px; color: red; }
```

### TEST

Three questions:

1. What is an icon font? (font containing icons)
2. Alternative to icon fonts? (SVG)
3. How to style icon size? (`font-size` for fonts, `width`/`height` for SVG)

**Checkpoint:** Add an icon font and an SVG icon, style both.

## Common Mistakes

- Missing icon font CSS link.
- SVG without width/height.
- No accessibility label.

## Try It Yourself

1. Add a Font Awesome icon.
2. Add an SVG icon.
3. Style with CSS.

## Summary

- Icon fonts (Font Awesome) and SVG icons.
- Style with `font-size`/`color` (fonts) or `width`/`height` (SVG).

## Next Step

Icons are clear. Next, links styling. Next: CSS 17 — Links.

---

**In Your Own Words**

1. What is an icon font?

<details>
<summary>Sample Answer</summary>

**Answer:** A font where glyphs are icons instead of letters.

</details>

2. Alternative to icon fonts?

<details>
<summary>Sample Answer</summary>

**Answer:** SVG icons.

</details>

3. How to style an icon font size?

<details>
<summary>Sample Answer</summary>

**Answer:** `font-size`.

</details>

4. How to style an SVG icon size?

<details>
<summary>Sample Answer</summary>

**Answer:** `width` and `height`.

</details>

5. Why add accessibility to icons?

<details>
<summary>Sample Answer</summary>

**Answer:** Screen readers need a label.

</details>

## What It Is NOT

- ❌ Icon fonts are **not** images.
- ❌ SVG is **not** a font.
- ❌ Icons without labels are **not** accessible.