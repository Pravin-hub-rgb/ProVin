# Doc CSS 06 — Colors

## Cheat Sheet (Quick Recall)

- Named: `red`, `blue`, `green`.
- HEX: `#ff0000`, `#00ff00`, `#0000ff`.
- RGB: `rgb(255, 0, 0)`.
- RGBA: `rgba(255, 0, 0, 0.5)` (alpha).
- HSL: `hsl(0, 100%, 50%)`.

## Where We Are So Far

CSS 05 covered comments. Now colors — specifying colors in CSS.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: color values.

## Main Content

### THINK

Colors can be specified multiple ways: names, HEX, RGB, RGBA, HSL. First names (simple), then HEX (common), then RGB/RGBA (flexible), then HSL.

### CONCEPT

```css
color: red;              /* name */
color: #ff0000;          /* HEX */
color: rgb(255, 0, 0);   /* RGB */
color: rgba(255,0,0,0.5);/* RGBA (alpha) */
color: hsl(0, 100%, 50%);/* HSL */
```

- HEX: `#RRGGBB`.
- RGB: 0–255 per channel.
- RGBA: adds alpha (0–1 transparency).
- HSL: hue (0–360), saturation (%), lightness (%).

### CODE (gradual)

Stage 1 — Named:

```css
p { color: red; }
```

Stage 2 — HEX:

```css
p { color: #0000ff; }
```

Stage 3 — RGBA:

```css
p { color: rgba(0, 128, 0, 0.8); }
```

### TEST

Three questions:

1. What are the main color formats? (names, HEX, RGB, RGBA, HSL)
2. What does RGBA add? (alpha/transparency)
3. What is HEX format? (`#RRGGBB`)

**Checkpoint:** Style text with at least three color formats.

## Common Mistakes

- Invalid HEX (`#gggggg`).
- Forgetting `#` in HEX.
- RGB values out of 0–255 range.

## Try It Yourself

1. Use a named color.
2. Use a HEX color.
3. Use RGBA with transparency.

## Summary

- Color formats: names, HEX, RGB, RGBA, HSL.
- HEX = `#RRGGBB`; RGB = 0–255; RGBA adds alpha.

## Next Step

Colors are clear. Next, backgrounds. Next: CSS 07 — Backgrounds.

---

**In Your Own Words**

1. Name five color formats in CSS.

<details>
<summary>Sample Answer</summary>

**Answer:** Named, HEX, RGB, RGBA, HSL.

</details>

2. What does RGBA add over RGB?

<details>
<summary>Sample Answer</summary>

**Answer:** Alpha (transparency).

</details>

3. What is HEX color format?

<details>
<summary>Sample Answer</summary>

**Answer:** `#RRGGBB` — red, green, blue in hexadecimal.

</details>

4. What range are RGB values?

<details>
<summary>Sample Answer</summary>

**Answer:** 0 to 255.

</details>

5. What does HSL stand for?

<details>
<summary>Sample Answer</summary>

**Answer:** Hue, Saturation, Lightness.

</details>

## What It Is NOT

- ❌ Color names are **not** all supported (use HEX/RGB for safety).
- ❌ HEX without `#` is **not** valid.
- ❌ RGBA alpha is **not** 0–255 — it is 0–1.