# Doc CSS 09 — Margins

## Cheat Sheet (Quick Recall)

- `margin` = space outside element.
- Shorthand: `margin: top right bottom left;` or `margin: vertical horizontal;`.
- `margin: 0 auto;` centers horizontally.
- Negative margins allowed.

## Where We Are So Far

CSS 08 covered borders. Now margins — space outside elements.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: margins.

## Main Content

### THINK

Margins create space outside an element (between elements). First all sides, then shorthand, then auto-centering.

### CONCEPT

```css
div {
  margin: 10px;              /* all sides */
  margin: 10px 20px;         /* vertical horizontal */
  margin: 10px 20px 30px 40px; /* top right bottom left */
  margin-top: 10px;
  margin: 0 auto;            /* center horizontally */
}
```

- `margin` = outside space.
- Shorthand: 1 value (all), 2 values (vertical horizontal), 4 values (TRBL).
- `auto` centers block elements horizontally.

### CODE (gradual)

Stage 1 — All sides:

```css
div { margin: 10px; }
```

Stage 2 — Vertical/horizontal:

```css
div { margin: 10px 20px; }
```

Stage 3 — Center:

```css
div { margin: 0 auto; }
```

### TEST

Three questions:

1. What does `margin` control? (space outside element)
2. How to center horizontally? (`margin: 0 auto;`)
3. What is the 4-value shorthand order? (top right bottom left)

**Checkpoint:** Add margins and center a div.

## Common Mistakes

- Margin collapse (vertical margins merge).
- Using margin for layout instead of flexbox.
- Negative margins causing overflow.

## Try It Yourself

1. Add margin to a div.
2. Center a div with `margin: 0 auto`.
3. Use 4-value shorthand.

## Summary

- `margin` = outside space.
- Shorthand: 1/2/4 values.
- `margin: 0 auto` centers.

## Next Step

Margins are clear. Next, padding. Next: CSS 10 — Padding.

---

**In Your Own Words**

1. What does `margin` control?

<details>
<summary>Sample Answer</summary>

**Answer:** Space outside an element.

</details>

2. How to center a block element horizontally?

<details>
<summary>Sample Answer</summary>

**Answer:** `margin: 0 auto;`.

</details>

3. What is the 4-value shorthand order?

<details>
<summary>Sample Answer</summary>

**Answer:** Top, right, bottom, left.

</details>

4. What is margin collapse?

<details>
<summary>Sample Answer</summary>

**Answer:** Vertical margins of adjacent elements merge into one.

</details>

5. Can margins be negative?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes.

</details>

## What It Is NOT

- ❌ `margin` is **not** inside the element (that's padding).
- ❌ Margin collapse is **not** a bug — it is spec.
- ❌ `margin: 0 auto` does **not** center vertically.