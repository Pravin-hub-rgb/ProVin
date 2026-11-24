# Doc HTML 17 — Tables

## Cheat Sheet (Quick Recall)

- `<table>`, `<tr>` (row), `<td>` (cell), `<th>` (header).
- `<thead>`, `<tbody>`, `<tfoot>` for structure.
- `colspan` / `rowspan` for merging cells.
- Use CSS for styling, not HTML attributes.

## Where We Are So Far

HTML 16 covered favicon. Now tables — displaying tabular data.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: tables.

## Main Content

### THINK

Data is often tabular (rows/columns). HTML has table tags for this. First basic table, then headers, then structure (thead/tbody), then merging cells.

### CONCEPT

```html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Vin</td>
    <td>25</td>
  </tr>
</table>
```

- `<table>`: container.
- `<tr>`: row.
- `<td>`: cell.
- `<th>`: header cell.
- `<thead>`/`<tbody>`/`<tfoot>`: structure.

**Merge cells:**

```html
<td colspan="2">Merged</td>
<td rowspan="2">Merged</td>
```

### CODE (gradual)

Stage 1 — Basic table:

```html
<table>
  <tr><td>A</td><td>B</td></tr>
  <tr><td>C</td><td>D</td></tr>
</table>
```

Stage 2 — With headers:

```html
<table>
  <tr><th>Name</th><th>Age</th></tr>
  <tr><td>Vin</td><td>25</td></tr>
</table>
```

Stage 3 — Full structure:

```html
<table>
  <thead><tr><th>Name</th></tr></thead>
  <tbody><tr><td>Vin</td></tr></tbody>
</table>
```

### TEST

Three questions:

1. What tag creates a row? (`<tr>`)
2. What tag creates a header cell? (`<th>`)
3. How to merge columns? (`colspan`)

**Checkpoint:** Build a 2x2 table with headers and verify.

## Common Mistakes

- Using tables for layout (use CSS instead).
- Missing `<td>`/`<th>` inside `<tr>`.
- Forgetting `border` CSS (tables have no borders by default).

## Try It Yourself

1. Build a table with 3 columns and 2 rows.
2. Add `<thead>` and `<tbody>`.
3. Merge two cells with `colspan`.

## Summary

- `<table>`, `<tr>`, `<td>`, `<th>`.
- `<thead>`/`<tbody>`/`<tfoot>` for structure.
- `colspan`/`rowspan` for merging.

## Next Step

Tables are clear. Next, lists. Next: HTML 18 — Lists.

---

**In Your Own Words**

1. What tag creates a table row?

<details>
<summary>Sample Answer</summary>

**Answer:** `<tr>`.

</details>

2. What tag creates a header cell?

<details>
<summary>Sample Answer</summary>

**Answer:** `<th>`.

</details>

3. How do you merge two columns?

<details>
<summary>Sample Answer</summary>

**Answer:** `colspan="2"`.

</details>

4. What are `<thead>`, `<tbody>`, `<tfoot>` for?

<details>
<summary>Sample Answer</summary>

**Answer:** Structuring table sections (header, body, footer).

</details>

5. Should tables be used for page layout?

<details>
<summary>Sample Answer</summary>

**Answer:** No — use CSS (flexbox/grid) for layout.

</details>

## What It Is NOT

- ❌ Tables are **not** for page layout — use CSS.
- ❌ `<td>` is **not** a row — it is a cell.
- ❌ Tables do **not** have borders by default.