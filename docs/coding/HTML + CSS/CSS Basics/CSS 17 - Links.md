# Doc CSS 17 — Links

## Cheat Sheet (Quick Recall)

- `a:link`, `a:visited`, `a:hover`, `a:active`.
- Remove underline: `text-decoration: none;`.
- Change color on hover.
- `cursor: pointer` (default for links).

## Where We Are So Far

CSS 16 covered icons. Now links — styling hyperlinks.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: link styles.

## Main Content

### THINK

Links need visual states: default, visited, hover, active. First basic styling, then pseudo-classes, then removing underline.

### CONCEPT

```css
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; text-decoration: underline; }
a:active { color: orange; }
```

- `:link` — unvisited.
- `:visited` — visited.
- `:hover` — mouse over.
- `:active` — being clicked.

**Remove underline:**

```css
a { text-decoration: none; }
```

### CODE (gradual)

Stage 1 — Basic:

```css
a { color: blue; text-decoration: none; }
```

Stage 2 — Hover:

```css
a:hover { color: red; text-decoration: underline; }
```

Stage 3 — All states:

```css
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }
```

### TEST

Three questions:

1. Pseudo-class for hover? (`:hover`)
2. How to remove underline? (`text-decoration: none`)
3. Order of link pseudo-classes? (LVHA: link, visited, hover, active)

**Checkpoint:** Style links with all four states.

## Common Mistakes

- Wrong order (LVHA) → styles not applied.
- Forgetting `:visited`.
- Removing underline without hover feedback.

## Try It Yourself

1. Style a link with color.
2. Add hover effect.
3. Remove underline and add hover underline.

## Summary

- Link states: `:link`, `:visited`, `:hover`, `:active`.
- Order: LVHA.
- `text-decoration: none` removes underline.

## Next Step

Links are clear. Next, lists styling. Next: CSS 18 — Lists.

---

**In Your Own Words**

1. What is the LVHA order?

<details>
<summary>Sample Answer</summary>

**Answer:** Link, Visited, Hover, Active.

</details>

2. How to remove underline from a link?

<details>
<summary>Sample Answer</summary>

**Answer:** `text-decoration: none;`.

</details>

3. Which pseudo-class is for hover?

<details>
<summary>Sample Answer</summary>

**Answer:** `:hover`.

</details>

4. What happens if order is wrong?

<details>
<summary>Sample Answer</summary>

**Answer:** Styles may not apply correctly due to specificity/cascade.

</details>

5. What is the default cursor for links?

<details>
<summary>Sample Answer</summary>

**Answer:** `pointer`.

</details>

## What It Is NOT

- ❌ Order is **not** optional (LVHA).
- ❌ `:active` is **not** `:hover`.
- ❌ Removing underline is **not** accessible without alternative.