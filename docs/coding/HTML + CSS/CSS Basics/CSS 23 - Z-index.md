# Doc CSS 23 — Z-index

## Cheat Sheet (Quick Recall)

- `z-index` controls stacking order.
- Higher value = on top.
- Only works on positioned elements (not static).
- Creates stacking contexts.

## Where We Are So Far

CSS 22 covered position. Now z-index — stacking order.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: z-index.

## Main Content

### THINK

Positioned elements can overlap. `z-index` controls who is on top. First basic, then stacking context, then common use (modals/navbars).

### CONCEPT

```css
.modal { position: fixed; z-index: 1000; }
.navbar { position: sticky; z-index: 100; }
```

- Higher `z-index` = on top.
- Only works on positioned elements (relative/absolute/fixed/sticky).
- Creates stacking contexts (parent z-index affects children).

### CODE (gradual)

Stage 1 — Two overlapping:

```css
.box1 { position: absolute; z-index: 1; }
.box2 { position: absolute; z-index: 2; } /* on top */
```

Stage 2 — Modal above navbar:

```css
.navbar { z-index: 100; }
.modal { z-index: 1000; }
```

### TEST

Three questions:

1. What does `z-index` control? (stacking order)
2. Does it work on static elements? (No)
3. Higher or lower value on top? (higher)

**Checkpoint:** Create two overlapping positioned elements with different z-index.

## Common Mistakes

- Using z-index on static elements (no effect).
- Not creating stacking contexts (parent issues).
- Arbitrarily high values (999999).

## Try It Yourself

1. Overlap two positioned divs.
2. Change z-index and observe.
3. Build a modal above a navbar.

## Summary

- `z-index` controls stacking (higher = on top).
- Only positioned elements.
- Creates stacking contexts.

## Next Step

Z-index is clear. Next, overflow. Next: CSS 24 — Overflow.

---

**In Your Own Words**

1. What does `z-index` control?

<details>
<summary>Sample Answer</summary>

**Answer:** Stacking order of positioned elements.

</details>

2. Does z-index work on static elements?

<details>
<summary>Sample Answer</summary>

**Answer:** No.

</details>

3. Higher or lower value on top?

<details>
<summary>Sample Answer</summary>

**Answer:** Higher.

</details>

4. What is a stacking context?

<details>
<summary>Sample Answer</summary>

**Answer:** A scope where z-index is evaluated; parent affects children.

</details>

5. Common use cases for z-index?

<details>
<summary>Sample Answer</summary>

**Answer:** Modals, navbars, dropdowns, tooltips.

</details>

## What It Is NOT

- ❌ z-index does **not** work on static elements.
- ❌ Higher is **not** lower.
- ❌ z-index is **not** for non-overlapping elements.