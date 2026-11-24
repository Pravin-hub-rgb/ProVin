# Doc CSS Advanced 17 — Object-position

## Cheat Sheet (Quick Recall)

- `object-position`: where the image is positioned within its box.
- Default: `50% 50%` (center).
- Values: keywords (`top`, `bottom`, `left`, `right`, `center`) or percentages/lengths.
- Pairs with `object-fit`.

## Where We Are So Far

CSS Advanced 16 covered object-fit. Now object-position — where the image sits.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: object-position.

## Main Content

### THINK

`object-fit` controls how the image fills; `object-position` controls where it is placed. First default (center), then keywords, then percentages.

### CONCEPT

```css
img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: top center; /* or 50% 50%, 0 0, etc. */
}
```

- Default: `50% 50%` (center).
- Keywords: `top`, `bottom`, `left`, `right`, `center`.
- Percentages/lengths: `0 0` (top-left), `100% 100%` (bottom-right).

### CODE (gradual)

Stage 1 — Default center:

```css
img { object-fit: cover; } /* position: 50% 50% */
```

Stage 2 — Top:

```css
img { object-position: top; }
```

Stage 3 — Custom:

```css
img { object-position: 20% 80%; }
```

### TEST

Three questions:

1. Default `object-position`? (`50% 50%` / center)
2. How to position at top? (`top` or `50% 0`)
3. Does it pair with `object-fit`? (Yes)

**Checkpoint:** Change object-position and observe crop shift.

## Common Mistakes

- Using `object-position` without `object-fit` (no visible effect).
- Wrong order (x then y).
- Forgetting `object-fit` needs dimensions.

## Try It Yourself

1. Set `object-position: top`.
2. Set `object-position: 0 0`.
3. Combine with `object-fit: cover`.

## Summary

- `object-position` sets image placement within box.
- Default center; keywords or percentages.
- Pairs with `object-fit`.

## Next Step

Object-position is clear. Next, masking. Next: CSS Advanced 18 — Masking.

---

**In Your Own Words**

1. What is the default `object-position`?

<details>
<summary>Sample Answer</summary>

**Answer:** `50% 50%` (center).

</details>

2. What does `object-position: top` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Aligns image to the top of the container.

</details>

3. Does `object-position` work without `object-fit`?

<details>
<summary>Sample Answer</summary>

**Answer:** No visible effect (image not cropped/scaled).

</details>

4. What order are the two values?

<details>
<summary>Sample Answer</summary>

**Answer:** x then y (horizontal, vertical).

</details>

5. Can you use percentages?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes (e.g., `20% 80%`).

</details>

## What It Is NOT

- ❌ `object-position` is **not** `background-position` (similar concept, different property).
- ❌ Without `object-fit`, it has **no visible effect**.
- ❌ `top` is **not** `bottom`.