# Doc CSS Grid 02 — Grid Container

## Cheat Sheet (Quick Recall)

- `grid-template-columns`: `1fr 1fr 1fr`, `repeat(3, 1fr)`, `200px 1fr`.
- `grid-template-rows`: same for rows.
- `gap`, `row-gap`, `column-gap`.
- `grid-template-areas`: named areas.
- `justify-items`, `align-items`, `place-items`.

## Where We Are So Far

CSS Grid 01 introduced grid. Now grid container properties.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: grid container.

## Main Content

### THINK

The grid container controls the grid structure. First columns/rows, then gap, then named areas, then alignment.

### CONCEPT

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 10px;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
```

- `grid-template-columns`: `repeat(3, 1fr)`, `200px 1fr`, etc.
- `grid-template-rows`: row sizes.
- `gap` / `row-gap` / `column-gap`.
- `grid-template-areas`: named areas.
- `justify-items`/`align-items`/`place-items`: item alignment.

### CODE (gradual)

Stage 1 — Columns:

```css
.container { display: grid; grid-template-columns: repeat(3, 1fr); }
```

Stage 2 — Gap:

```css
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
```

Stage 3 — Named areas:

```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
```

### TEST

Three questions:

1. How to create 3 equal columns? (`repeat(3, 1fr)`)
2. Property for gap? (`gap`)
3. How to name areas? (`grid-template-areas`)

**Checkpoint:** Create a grid with named areas.

## Common Mistakes

- Missing `display: grid`.
- Wrong `grid-template-areas` (must match column count).
- Forgetting `gap`.

## Try It Yourself

1. Create 3 columns with `repeat`.
2. Add gap.
3. Define named areas.

## Summary

- `grid-template-columns/rows`, `gap`, `grid-template-areas`.
- `repeat()`, `fr`, named areas.

## Next Step

Grid container is clear. Next, grid items. Next: CSS Grid 03 — Grid Items.

---

**In Your Own Words**

1. How to create 3 equal columns?

<details>
<summary>Sample Answer</summary>

**Answer:** `grid-template-columns: repeat(3, 1fr);`.

</details>

2. What is `gap`?

<details>
<summary>Sample Answer</summary>

**Answer:** Spacing between grid items.

</details>

3. What are named areas?

<details>
<summary>Sample Answer</summary>

**Answer:** A way to define layout regions by name (`grid-template-areas`).

</details>

4. What does `place-items` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Shorthand for `align-items` + `justify-items`.

</details>

5. Difference between `grid-template-columns` and `grid-template-areas`?

<details>
<summary>Sample Answer</summary>

**Answer:** Columns define sizes; areas define named regions.

</details>

## What It Is NOT

- ❌ `grid-template-areas` must **match** column count.
- ❌ Grid is **not** flexbox.
- ❌ `gap` is **not** margin.