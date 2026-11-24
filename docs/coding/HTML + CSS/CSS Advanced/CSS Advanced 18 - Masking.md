# Doc CSS Advanced 18 — Masking

## Cheat Sheet (Quick Recall)

- `mask-image` / `-webkit-mask-image`.
- Mask with gradient or image (alpha).
- `mask-size`, `mask-position`, `mask-repeat`.
- Use for fade effects, shaped images.

## Where We Are So Far

CSS Advanced 17 covered object-position. Now masking — hiding parts of an element.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: masking.

## Main Content

### THINK

Masking hides parts of an element based on an image/gradient alpha. First basic gradient mask, then image mask, then properties.

### CONCEPT

```css
div {
  -webkit-mask-image: linear-gradient(to bottom, black, transparent);
  mask-image: linear-gradient(to bottom, black, transparent);
}
```

- `mask-image`: gradient or image (alpha channel).
- `mask-size`, `mask-position`, `mask-repeat`: like background.
- `-webkit-` prefix for Safari.

### CODE (gradual)

Stage 1 — Gradient fade:

```css
div {
  -webkit-mask-image: linear-gradient(to bottom, black, transparent);
  mask-image: linear-gradient(to bottom, black, transparent);
}
```

Stage 2 — Image mask:

```css
div {
  -webkit-mask-image: url("mask.png");
  mask-image: url("mask.png");
  -webkit-mask-size: cover;
  mask-size: cover;
}
```

Stage 3 — Position/repeat:

```css
div {
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
}
```

### TEST

Three questions:

1. What property creates a mask? (`mask-image`)
2. What can be used as a mask? (gradient or image with alpha)
3. Is `-webkit-` prefix needed? (Yes, for Safari)

**Checkpoint:** Create a fade-out effect with a gradient mask.

## Common Mistakes

- Missing `-webkit-` prefix (Safari).
- Using an image without alpha.
- Confusing mask with clip-path.

## Try It Yourself

1. Create a gradient fade mask.
2. Use an image mask.
3. Add `mask-size: cover`.

## Summary

- `mask-image` for masking (gradient/image).
- `-webkit-` prefix for Safari.
- `mask-size/position/repeat` like background.

## Next Step

Masking is clear. Next, buttons. Next: CSS Advanced 19 — Buttons.

---

**In Your Own Words**

1. What is CSS masking?

<details>
<summary>Sample Answer</summary>

**Answer:** Hiding parts of an element based on an image/gradient's alpha.

</details>

2. What can be used as a mask?

<details>
<summary>Sample Answer</summary>

**Answer:** A gradient or an image with alpha transparency.

</details>

3. Is `-webkit-` prefix needed?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes, for Safari support.

</details>

4. Difference between mask and clip-path?

<details>
<summary>Sample Answer</summary>

**Answer:** Mask uses alpha/luminance; clip-path uses shapes.

</details>

5. What does `mask-size: cover` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Scales mask to cover the element.

</details>

## What It Is NOT

- ❌ Mask is **not** clip-path.
- ❌ Missing prefix is **not** Safari-compatible.
- ❌ Mask image needs **alpha**.