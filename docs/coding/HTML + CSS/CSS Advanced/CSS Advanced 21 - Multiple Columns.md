# Doc CSS Advanced 21 — Multiple Columns

## Cheat Sheet (Quick Recall)

- `column-count: 3;` — number of columns.
- `column-gap: 20px;` — gap between columns.
- `column-rule: 1px solid #ccc;` — divider line.
- `column-span: all;` — element spans all columns.

## Where We Are So Far

CSS Advanced 20 covered pagination. Now multiple columns — newspaper-style layout.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: multiple columns.

## Main Content

### THINK

Multiple columns (like newspapers) are easy with CSS. First column-count, then gap/rule, then span.

### CONCEPT

```css
.article {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
}
h2 { column-span: all; }
```

- `column-count`: number of columns.
- `column-gap`: space between columns.
- `column-rule`: divider (like border).
- `column-span: all`: element spans all columns.

### CODE (gradual)

Stage 1 — 3 columns:

```css
.article { column-count: 3; }
```

Stage 2 — Gap + rule:

```css
.article { column-count: 3; column-gap: 20px; column-rule: 1px solid #ccc; }
```

Stage 3 — Span heading:

```css
h2 { column-span: all; }
```

### TEST

Three questions:

1. Property for number of columns? (`column-count`)
2. Property for gap between columns? (`column-gap`)
3. Property for divider line? (`column-rule`)

**Checkpoint:** Create a 3-column article with gap and rule.

## Common Mistakes

- Too many columns on small screens (use media queries).
- Forgetting `column-gap`.
- Not using `column-span` for headings.

## Try It Yourself

1. Create 2 columns.
2. Add gap and rule.
3. Span a heading across columns.

## Summary

- `column-count`, `column-gap`, `column-rule`.
- `column-span: all` for full-width elements.

## Next Step

Multiple columns are clear. Next, user interface. Next: CSS Advanced 22 — User Interface.

---

**In Your Own Words**

1. What does `column-count` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Sets the number of columns.

</details>

2. What does `column-gap` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Sets space between columns.

</details>

3. What does `column-rule` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Adds a divider line between columns.

</details>

4. What does `column-span: all` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Makes an element span all columns.

</details>

5. Are multiple columns responsive?

<details>
<summary>Sample Answer</summary>

**Answer:** Not automatically — use media queries to adjust.

</details>

## What It Is NOT

- ❌ `column-count` is **not** `display: grid`.
- ❌ Columns are **not** flexbox.
- ❌ `column-span` is **not** for individual columns.