# Doc CSS 19 — Tables

## Cheat Sheet (Quick Recall)

- `border-collapse: collapse;` merges borders.
- `border-spacing` for gap between cells.
- Style `th`, `td`, `tr`.
- `text-align`, `vertical-align` for cell content.

## Where We Are So Far

CSS 18 covered lists. Now tables — styling `<table>`.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: table styling.

## Main Content

### THINK

Tables need borders, spacing, alignment. First border-collapse, then cell styling, then alignment.

### CONCEPT

```css
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
tr:hover { background-color: #f5f5f5; }
```

- `border-collapse: collapse` merges borders.
- `border-spacing` for gap (when not collapsed).
- Style cells with `padding`, `text-align`.
- `vertical-align` for vertical alignment.

### CODE (gradual)

Stage 1 — Borders:

```css
table, th, td { border: 1px solid black; }
```

Stage 2 — Collapse:

```css
table { border-collapse: collapse; }
```

Stage 3 — Cell styling:

```css
th, td { padding: 8px; text-align: left; }
```

### TEST

Three questions:

1. What property merges table borders? (`border-collapse: collapse`)
2. What property adds gap between cells? (`border-spacing`)
3. How to align cell text? (`text-align`)

**Checkpoint:** Style a table with borders, padding, and hover.

## Common Mistakes

- Forgetting `border-collapse` → double borders.
- No padding → cramped cells.
- Using tables for layout (use CSS).

## Try It Yourself

1. Add borders to a table.
2. Collapse borders.
3. Add hover effect on rows.

## Summary

- `border-collapse`, `border-spacing`.
- Style `th`, `td` with padding/align.
- Tables for data, not layout.

## Next Step

Tables are clear. Next, display. Next: CSS 20 — Display.

---

**In Your Own Words**

1. What does `border-collapse: collapse` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Merges adjacent cell borders into one.

</details>

2. What property adds gap between cells?

<details>
<summary>Sample Answer</summary>

**Answer:** `border-spacing`.

</details>

3. How to align text in a cell?

<details>
<summary>Sample Answer</summary>

**Answer:** `text-align`.

</details>

4. What property aligns content vertically?

<details>
<summary>Sample Answer</summary>

**Answer:** `vertical-align`.

</details>

5. Should tables be used for layout?

<details>
<summary>Sample Answer</summary>

**Answer:** No — use CSS (flexbox/grid).

</details>

## What It Is NOT

- ❌ `border-collapse` is **not** the default.
- ❌ Tables are **not** for page layout.
- ❌ `border-spacing` is **not** margin.