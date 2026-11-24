# Doc CSS 38 — CSS Units

## Cheat Sheet (Quick Recall)

- Absolute: `px`, `cm`, `mm`, `in`, `pt`, `pc`.
- Relative: `%`, `em`, `rem`, `vw`, `vh`, `vmin`, `vmax`, `ch`, `ex`.
- `rem` relative to root font size.
- `em` relative to parent font size.
- `vw`/`vh` relative to viewport.

## Where We Are So Far

CSS 37 covered website layout. Now CSS units — measuring values.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: units.

## Main Content

### THINK

CSS values need units. Absolute (px) vs relative (%, em, rem, vw/vh). First absolute, then relative, then when to use which.

### CONCEPT

**Absolute:**

- `px`: pixels (most common).
- `cm`, `mm`, `in`, `pt`, `pc`: physical units (rare on web).

**Relative:**

- `%`: relative to parent.
- `em`: relative to parent font size.
- `rem`: relative to root font size.
- `vw`/`vh`: relative to viewport width/height.
- `vmin`/`vmax`: smaller/larger of vw/vh.
- `ch`: width of "0" character.
- `ex`: height of "x".

### CODE (gradual)

Stage 1 — px:

```css
p { font-size: 16px; }
```

Stage 2 — rem/em:

```css
p { font-size: 1rem; } /* root font size */
```

Stage 3 — vw/vh:

```css
.hero { height: 100vh; width: 100vw; }
```

### TEST

Three questions:

1. What is `rem` relative to? (root font size)
2. What is `em` relative to? (parent font size)
3. What are `vw`/`vh` relative to? (viewport)

**Checkpoint:** Use rem for font-size and vw/vh for a hero section.

## Common Mistakes

- Using px for font-size (not scalable).
- Confusing `em` and `rem`.
- `100vh` on mobile (address bar issues).

## Try It Yourself

1. Set font-size in rem.
2. Use vw for a full-width element.
3. Use vh for full-height section.

## Summary

- Absolute: px (and physical units).
- Relative: %, em, rem, vw, vh, vmin, vmax.
- Prefer rem for fonts, %/vw/vh for layout.

## Next Step

CSS units are clear. Next, specificity. Next: CSS 39 — Specificity.

---

**In Your Own Words**

1. What is `rem` relative to?

<details>
<summary>Sample Answer</summary>

**Answer:** Root font size.

</details>

2. What is `em` relative to?

<details>
<summary>Sample Answer</summary>

**Answer:** Parent font size.

</details>

3. What are `vw`/`vh` relative to?

<details>
<summary>Sample Answer</summary>

**Answer:** Viewport width/height.

</details>

4. Why prefer `rem` for font-size?

<details>
<summary>Sample Answer</summary>

**Answer:** Scalable and consistent relative to root.

</details>

5. What is `vmin`?

<details>
<summary>Sample Answer</summary>

**Answer:** The smaller of vw or vh.

</details>

## What It Is NOT

- ❌ `em` is **not** `rem` (parent vs root).
- ❌ `px` is **not** scalable.
- ❌ `100vh` is **not** always perfect on mobile.