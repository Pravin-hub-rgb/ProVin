# Doc CSS Advanced 14 — Image Styling

## Cheat Sheet (Quick Recall)

- `border-radius` for rounded images.
- `object-fit: cover/contain/fill/scale-down/none`.
- `filter`: grayscale, blur, brightness, contrast, sepia.
- `box-shadow` for depth.

## Where We Are So Far

CSS Advanced 13 covered tooltips. Now image styling — making images look good.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: image styling.

## Main Content

### THINK

Images need styling: rounded corners, fit, filters, shadows. First border-radius, then object-fit, then filters.

### CONCEPT

```css
img {
  border-radius: 8px;
  object-fit: cover;
  filter: grayscale(50%);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
```

- `border-radius`: rounded corners.
- `object-fit`: how image fits container (`cover`, `contain`, `fill`, `scale-down`, `none`).
- `filter`: visual effects (grayscale, blur, brightness, contrast, sepia, hue-rotate).
- `box-shadow`: depth.

### CODE (gradual)

Stage 1 — Rounded:

```css
img { border-radius: 8px; }
```

Stage 2 — Object-fit:

```css
img { width: 200px; height: 200px; object-fit: cover; }
```

Stage 3 — Filter:

```css
img { filter: grayscale(100%); }
```

Stage 4 — Shadow:

```css
img { box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
```

### TEST

Three questions:

1. Property for rounded image? (`border-radius`)
2. Property for consistent thumbnail sizing? (`object-fit: cover`)
3. How to make image grayscale? (`filter: grayscale(100%)`)

**Checkpoint:** Style an image with rounded corners, object-fit, and filter.

## Common Mistakes

- Missing `width`/`height` with `object-fit`.
- Overusing filters.
- Not providing alt text.

## Try It Yourself

1. Round an image.
2. Use `object-fit: cover`.
3. Apply a filter (grayscale/blur).

## Summary

- `border-radius`, `object-fit`, `filter`, `box-shadow` for images.

## Next Step

Image styling is clear. Next, image modal. Next: CSS Advanced 15 — Image Modal.

---

**In Your Own Words**

1. What does `object-fit: cover` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Scales image to cover container (may crop).

</details>

2. How to make an image grayscale?

<details>
<summary>Sample Answer</summary>

**Answer:** `filter: grayscale(100%)`.

</details>

3. What does `border-radius` do on an image?

<details>
<summary>Sample Answer</summary>

**Answer:** Rounds the corners.

</details>

4. Difference between `cover` and `contain`?

<details>
<summary>Sample Answer</summary>

**Answer:** `cover` crops to fill; `contain` shows full image.

</details>

5. What is `filter: blur()`?

<details>
<summary>Sample Answer</summary>

**Answer:** Applies a blur effect.

</details>

## What It Is NOT

- ❌ `object-fit` is **not** `background-size`.
- ❌ `filter` is **not** `opacity`.
- ❌ `cover` is **not** `contain`.