# Doc CSS 08 — Borders

## Cheat Sheet (Quick Recall)

- `border: width style color;` (e.g., `1px solid black`).
- Styles: solid, dashed, dotted, double, groove, ridge, inset, outset.
- `border-radius` for rounded corners.
- Per-side: `border-top`, `border-right`, etc.

## Where We Are So Far

CSS 07 covered backgrounds. Now borders — outlining elements.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: borders.

## Main Content

### THINK

Borders outline elements. First shorthand, then styles, then per-side, then border-radius.

### CONCEPT

```css
div {
  border: 2px solid black;
  border-radius: 8px;
}
```

- `border-width`, `border-style`, `border-color`.
- Styles: solid, dashed, dotted, double, groove, ridge, inset, outset.
- `border-radius` for rounded corners.
- Per-side: `border-top`, `border-right`, `border-bottom`, `border-left`.

### CODE (gradual)

Stage 1 — Basic border:

```css
div { border: 1px solid black; }
```

Stage 2 — Dashed red:

```css
div { border: 2px dashed red; }
```

Stage 3 — Rounded:

```css
div { border: 1px solid black; border-radius: 8px; }
```

### TEST

Three questions:

1. Border shorthand syntax? (`width style color`)
2. How to round corners? (`border-radius`)
3. Name three border styles. (solid, dashed, dotted, etc.)

**Checkpoint:** Add borders with different styles and radius.

## Common Mistakes

- Missing `border-style` (border won't show).
- Using `border` without width/style/color.
- Confusing `border` with `outline`.

## Try It Yourself

1. Add a solid border.
2. Add a dashed border.
3. Round corners with `border-radius`.

## Summary

- `border: width style color;`.
- Styles: solid, dashed, dotted, double, etc.
- `border-radius` for rounded corners.

## Next Step

Borders are clear. Next, margins. Next: CSS 09 — Margins.

---

**In Your Own Words**

1. What is border shorthand syntax?

<details>
<summary>Sample Answer</summary>

**Answer:** `border: width style color;` (e.g., `1px solid black`).

</details>

2. How to round corners?

<details>
<summary>Sample Answer</summary>

**Answer:** `border-radius`.

</details>

3. Name three border styles.

<details>
<summary>Sample Answer</summary>

**Answer:** solid, dashed, dotted (also double, groove, ridge).

</details>

4. What happens if `border-style` is missing?

<details>
<summary>Sample Answer</summary>

**Answer:** The border will not display.

</details>

5. How to set border on one side only?

<details>
<summary>Sample Answer</summary>

**Answer:** `border-top`, `border-right`, etc.

</details>

## What It Is NOT

- ❌ `border` is **not** `outline`.
- ❌ Missing style means **no border**.
- ❌ `border-radius` is **not** for all corners only (can target).