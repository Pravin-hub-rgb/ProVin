# Doc HTML 12 — Colors

## Cheat Sheet (Quick Recall)

- Color names: `red`, `blue`, `green`.
- HEX: `#ff0000`, `#00ff00`, `#0000ff`.
- RGB: `rgb(255, 0, 0)`.
- RGBA: `rgba(255, 0, 0, 0.5)` (with alpha).
- HSL: `hsl(0, 100%, 50%)`.

## Where We Are So Far

HTML 11 covered comments. Now colors — how to specify colors in HTML/CSS.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: color values.

## Main Content

### THINK

Colors can be specified in multiple ways: names, HEX, RGB, RGBA, HSL. First names (simple), then HEX (common), then RGB/RGBA (flexible), then HSL.

### CONCEPT

```css
color: red;              /* name */
color: #ff0000;          /* HEX */
color: rgb(255, 0, 0);   /* RGB */
color: rgba(255,0,0,0.5);/* RGBA (alpha) */
color: hsl(0, 100%, 50%);/* HSL */
```

- HEX: `#RRGGBB` (red, green, blue in hex).
- RGB: 0–255 per channel.
- RGBA: adds alpha (0–1 transparency).
- HSL: hue (0–360), saturation (%), lightness (%).

### CODE (gradual)

Stage 1 — Named color:

```html
<p style="color: red;">Red text</p>
```

Stage 2 — HEX:

```html
<p style="color: #0000ff;">Blue text</p>
```

Stage 3 — RGB/RGBA:

```html
<p style="color: rgba(0, 128, 0, 0.8);">Green with alpha</p>
```

### TEST

Three questions:

1. What are the main color formats? (names, HEX, RGB, RGBA, HSL)
2. What does RGBA add? (alpha/transparency)
3. What is HEX format? (`#RRGGBB`)

**Checkpoint:** Style text with at least three different color formats.

## Common Mistakes

- Invalid HEX (e.g., `#gggggg`).
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

Colors are clear. Next, CSS in HTML. Next: HTML 13 — CSS in HTML.

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