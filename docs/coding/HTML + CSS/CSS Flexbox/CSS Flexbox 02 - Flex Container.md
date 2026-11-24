# Doc CSS Flexbox 02 — Flex Container

## Cheat Sheet (Quick Recall)

- `flex-direction`: row, column, row-reverse, column-reverse.
- `justify-content`: flex-start, center, flex-end, space-between, space-around, space-evenly.
- `align-items`: stretch, flex-start, center, flex-end, baseline.
- `flex-wrap`: nowrap, wrap, wrap-reverse.
- `align-content`: aligns wrapped lines.
- `gap`: spacing between items.

## Where We Are So Far

CSS Flexbox 01 introduced flexbox. Now flex container properties.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: flex container.

## Main Content

### THINK

The flex container controls layout of its children. First direction, then justify/align, then wrap/gap.

### CONCEPT

```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  align-content: stretch;
}
```

- `flex-direction`: row/column (and reverse).
- `justify-content`: main axis (space-between, center, etc.).
- `align-items`: cross axis (stretch, center, etc.).
- `flex-wrap`: wrap to next line.
- `align-content`: align wrapped lines.
- `gap`: spacing.

### CODE (gradual)

Stage 1 — Direction:

```css
.container { display: flex; flex-direction: row; }
```

Stage 2 — Justify:

```css
.container { display: flex; justify-content: space-between; }
```

Stage 3 — Align + wrap + gap:

```css
.container { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
```

### TEST

Three questions:

1. Property for main axis alignment? (`justify-content`)
2. Property for cross axis alignment? (`align-items`)
3. How to wrap items? (`flex-wrap: wrap`)

**Checkpoint:** Create a flex container with various justify/align values.

## Common Mistakes

- Confusing main/cross axis.
- Forgetting `flex-wrap` for many items.
- Not using `gap` (use margins instead).

## Try It Yourself

1. Change `flex-direction` to column.
2. Try all `justify-content` values.
3. Add `flex-wrap` and `gap`.

## Summary

- Container: `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, `align-content`, `gap`.

## Next Step

Flex container is clear. Next, flex items. Next: CSS Flexbox 03 — Flex Items.

---

**In Your Own Words**

1. What does `flex-direction: column` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Stacks items vertically (main axis = vertical).

</details>

2. What does `justify-content: space-between` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Distributes items with equal space between them.

</details>

3. What does `align-items: center` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Centers items along the cross axis.

</details>

4. What is `flex-wrap`?

<details>
<summary>Sample Answer</summary>

**Answer:** Allows items to wrap to the next line.

</details>

5. What is `gap`?

<details>
<summary>Sample Answer</summary>

**Answer:** Spacing between flex items.

</details>

## What It Is NOT

- ❌ `justify-content` is **not** cross axis.
- ❌ `align-items` is **not** main axis.
- ❌ `flex-wrap` is **not** default.