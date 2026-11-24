# Doc CSS Flexbox 01 — Intro

## Cheat Sheet (Quick Recall)

- Flexbox = one-dimensional layout (row or column).
- Container: `display: flex`.
- Main axis: `justify-content`.
- Cross axis: `align-items`.
- `flex-wrap: wrap` for multiple lines.

## Where We Are So Far

CSS Advanced is complete. Now CSS Flexbox — modern layout.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: flexbox intro.

## Main Content

### THINK

Flexbox is for one-dimensional layouts (row or column). First concept, then container properties, then items.

### CONCEPT

```css
.container {
  display: flex;
  flex-direction: row; /* or column */
  justify-content: center; /* main axis */
  align-items: center; /* cross axis */
  flex-wrap: wrap;
  gap: 10px;
}
```

- `display: flex` enables flexbox.
- `flex-direction`: row/column.
- `justify-content`: main axis alignment.
- `align-items`: cross axis alignment.
- `flex-wrap`: wrap to next line.
- `gap`: spacing between items.

### CODE (gradual)

Stage 1 — Enable flex:

```css
.container { display: flex; }
```

Stage 2 — Direction:

```css
.container { display: flex; flex-direction: row; }
```

Stage 3 — Align:

```css
.container { display: flex; justify-content: center; align-items: center; }
```

### TEST

Three questions:

1. How to enable flexbox? (`display: flex`)
2. Property for main axis alignment? (`justify-content`)
3. Property for cross axis alignment? (`align-items`)

**Checkpoint:** Create a flex container and center items.

## Common Mistakes

- Forgetting `display: flex` on container.
- Confusing `justify-content` and `align-items`.
- Not using `flex-wrap` for many items.

## Try It Yourself

1. Create a flex row.
2. Center items both axes.
3. Add `flex-wrap`.

## Summary

- Flexbox = one-dimensional layout.
- Container: `display: flex`, `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, `gap`.

## Next Step

Flexbox intro is clear. Next, flex container. Next: CSS Flexbox 02 — Flex Container.

---

**In Your Own Words**

1. What is flexbox?

<details>
<summary>Sample Answer</summary>

**Answer:** A one-dimensional layout system (row or column).

</details>

2. How to enable flexbox?

<details>
<summary>Sample Answer</summary>

**Answer:** `display: flex` on the container.

</details>

3. What is the main axis?

<details>
<summary>Sample Answer</summary>

**Answer:** The direction set by `flex-direction` (row = horizontal, column = vertical).

</details>

4. What property aligns along the main axis?

<details>
<summary>Sample Answer</summary>

**Answer:** `justify-content`.

</details>

5. What property aligns along the cross axis?

<details>
<summary>Sample Answer</summary>

**Answer:** `align-items`.

</details>

## What It Is NOT

- ❌ Flexbox is **not** two-dimensional (that's Grid).
- ❌ Properties go on the **container**, not items (mostly).
- ❌ `flex-wrap` is **not** default.