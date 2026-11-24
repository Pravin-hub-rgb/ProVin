# Doc CSS Grid 03 — Grid Items

## Cheat Sheet (Quick Recall)

- `grid-column: 1 / 3;` — span columns 1 to 3.
- `grid-row: 1 / 2;` — span rows.
- `grid-area: name;` — place in named area.
- `justify-self`, `align-self`: align individual item.

## Where We Are So Far

CSS Grid 02 covered the container. Now grid items — placing individual items.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: grid items.

## Main Content

### THINK

Items in a grid can span multiple columns/rows and be placed in named areas. First spanning, then named areas, then alignment.

### CONCEPT

```css
.item {
  grid-column: 1 / 3;   /* span columns 1-3 */
  grid-row: 1 / 2;      /* span row 1 */
  grid-area: header;     /* place in named area */
  justify-self: center;  /* horizontal align */
  align-self: center;    /* vertical align */
}
```

- `grid-column: start / end;` — span columns.
- `grid-row: start / end;` — span rows.
- `grid-area: name;` — place in named area.
- `justify-self`/`align-self`: individual alignment.

### CODE (gradual)

Stage 1 — Span columns:

```css
.item { grid-column: 1 / 3; }
```

Stage 2 — Span rows:

```css
.item { grid-row: 1 / 3; }
```

Stage 3 — Named area:

```css
.header { grid-area: header; }
```

Stage 4 — Align:

```css
.item { justify-self: center; align-self: center; }
```

### TEST

Three questions:

1. How to span 2 columns? (`grid-column: 1 / 3`)
2. How to place in a named area? (`grid-area: name`)
3. What is `justify-self`? (horizontal alignment of one item)

**Checkpoint:** Create a grid with a spanning item and named areas.

## Common Mistakes

- Off-by-one in grid lines (start/end).
- Forgetting named area exists in container.
- Confusing `justify-self` with `justify-items`.

## Try It Yourself

1. Span an item across 2 columns.
2. Place items in named areas.
3. Align an item with `justify-self`.

## Summary

- `grid-column`, `grid-row` for spanning.
- `grid-area` for named areas.
- `justify-self`, `align-self` for individual alignment.

## Next Step

Grid items are clear. Next, 12-column layout. Next: CSS Grid 04 — Grid 12-column Layout.

---

**In Your Own Words**

1. How to span 2 columns?

<details>
<summary>Sample Answer</summary>

**Answer:** `grid-column: 1 / 3;` (or `span 2`).

</details>

2. How to place an item in a named area?

<details>
<summary>Sample Answer</summary>

**Answer:** `grid-area: name;`.

</details>

3. What is `justify-self`?

<details>
<summary>Sample Answer</summary>

**Answer:** Horizontal alignment of a single grid item.

</details>

4. Difference between `justify-self` and `justify-items`?

<details>
<summary>Sample Answer</summary>

**Answer:** `justify-self` for one item; `justify-items` for all items in container.

</details>

5. What does `grid-column: span 2` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Spans 2 columns from current position.

</details>

## What It Is NOT

- ❌ Grid lines are **1-based**, not 0-based.
- ❌ `grid-area` requires **named area** in container.
- ❌ `justify-self` is **not** `justify-content`.