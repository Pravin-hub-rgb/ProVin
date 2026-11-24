# Doc CSS Grid 01 — Intro

## Cheat Sheet (Quick Recall)

- Grid = two-dimensional layout (rows + columns).
- Container: `display: grid`.
- `grid-template-columns`, `grid-template-rows`.
- `gap` for spacing.
- `fr` unit = fraction of available space.

## Where We Are So Far

CSS Flexbox is complete. Now CSS Grid — 2D layout.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: grid intro.

## Main Content

### THINK

Grid is for two-dimensional layouts (rows + columns). First concept, then container properties, then items.

### CONCEPT

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 10px;
}
```

- `display: grid` enables grid.
- `grid-template-columns`: column sizes.
- `grid-template-rows`: row sizes.
- `gap`: spacing.
- `fr`: fraction of available space.

### CODE (gradual)

Stage 1 — Enable grid:

```css
.container { display: grid; }
```

Stage 2 — Columns:

```css
.container { display: grid; grid-template-columns: 1fr 1fr 1fr; }
```

Stage 3 — Gap:

```css
.container { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
```

### TEST

Three questions:

1. How to enable grid? (`display: grid`)
2. What is `fr`? (fraction of available space)
3. Property for column sizes? (`grid-template-columns`)

**Checkpoint:** Create a 3-column grid.

## Common Mistakes

- Forgetting `display: grid`.
- Using fixed px instead of `fr`.
- Not using `gap`.

## Try It Yourself

1. Create a 3-column grid.
2. Add gap.
3. Use `fr` units.

## Summary

- Grid = 2D layout.
- `display: grid`, `grid-template-columns/rows`, `gap`, `fr`.

## Next Step

Grid intro is clear. Next, grid container. Next: CSS Grid 02 — Grid Container.

---

**In Your Own Words**

1. What is CSS Grid?

<details>
<summary>Sample Answer</summary>

**Answer:** A two-dimensional layout system (rows + columns).

</details>

2. How to enable grid?

<details>
<summary>Sample Answer</summary>

**Answer:** `display: grid` on the container.

</details>

3. What is `fr`?

<details>
<summary>Sample Answer</summary>

**Answer:** A fraction of available space.

</details>

4. Property for column sizes?

<details>
<summary>Sample Answer</summary>

**Answer:** `grid-template-columns`.

</details>

5. Difference between flexbox and grid?

<details>
<summary>Sample Answer</summary>

**Answer:** Flexbox = 1D; Grid = 2D.

</details>

## What It Is NOT

- ❌ Grid is **not** 1D (that's flexbox).
- ❌ `fr` is **not** `px`.
- ❌ Grid needs **container** `display: grid`.