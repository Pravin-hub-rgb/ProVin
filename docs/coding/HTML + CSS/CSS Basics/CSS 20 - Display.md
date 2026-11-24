# Doc CSS 20 — Display

## Cheat Sheet (Quick Recall)

- `display: block` — new line, full width.
- `display: inline` — flows in text.
- `display: inline-block` — inline but accepts width/height.
- `display: none` — hidden (no space).
- `display: flex` — flexbox container.
- `display: grid` — grid container.

## Where We Are So Far

CSS 19 covered tables. Now display — how elements render.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: display property.

## Main Content

### THINK

The `display` property controls how an element renders. First basic values (block/inline/none), then inline-block, then flex/grid (later docs).

### CONCEPT

```css
div { display: block; }
span { display: inline; }
img { display: inline-block; }
.hidden { display: none; }
.container { display: flex; }
.grid { display: grid; }
```

- `block`: new line, full width.
- `inline`: flows in text, no width/height.
- `inline-block`: inline but accepts width/height.
- `none`: hidden, no space.
- `flex`: flexbox container.
- `grid`: grid container.

### CODE (gradual)

Stage 1 — Block vs inline:

```css
span { display: block; }
```

Stage 2 — Inline-block:

```css
img { display: inline-block; width: 100px; }
```

Stage 3 — Hide:

```css
.hidden { display: none; }
```

### TEST

Three questions:

1. What does `display: none` do? (hides, no space)
2. Difference between `inline` and `inline-block`? (inline-block accepts width/height)
3. What value enables flexbox? (`flex`)

**Checkpoint:** Toggle display values and observe layout.

## Common Mistakes

- Confusing `display: none` with `visibility: hidden` (latter keeps space).
- Using `inline` when width/height needed.
- Forgetting `display: flex` on container.

## Try It Yourself

1. Change a span to `display: block`.
2. Use `inline-block` with width.
3. Hide an element with `display: none`.

## Summary

- `block`, `inline`, `inline-block`, `none`, `flex`, `grid`.
- `none` removes from layout; `visibility: hidden` keeps space.

## Next Step

Display is clear. Next, max-width. Next: CSS 21 — Max-width.

---

**In Your Own Words**

1. What does `display: none` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Hides the element and removes its space.

</details>

2. Difference between `inline` and `inline-block`?

<details>
<summary>Sample Answer</summary>

**Answer:** `inline-block` accepts width/height; `inline` does not.

</details>

3. What value enables flexbox?

<details>
<summary>Sample Answer</summary>

**Answer:** `flex`.

</details>

4. Difference between `display: none` and `visibility: hidden`?

<details>
<summary>Sample Answer</summary>

**Answer:** `none` removes space; `hidden` keeps space.

</details>

5. What is `display: block`?

<details>
<summary>Sample Answer</summary>

**Answer:** Element starts on new line, takes full width.

</details>

## What It Is NOT

- ❌ `display: none` is **not** `visibility: hidden`.
- ❌ `inline` does **not** accept width/height.
- ❌ `flex` is **not** automatic — set on container.