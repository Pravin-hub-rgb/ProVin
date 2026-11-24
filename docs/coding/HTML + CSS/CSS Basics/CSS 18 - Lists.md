# Doc CSS 18 — Lists

## Cheat Sheet (Quick Recall)

- `list-style-type`: disc, circle, square, decimal, none.
- `list-style-position`: inside/outside.
- `list-style-image`: custom bullet image.
- Remove bullets: `list-style: none;`.

## Where We Are So Far

CSS 17 covered links. Now lists — styling `<ul>`/`<ol>`.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: list styling.

## Main Content

### THINK

Lists have default bullets/numbers. CSS can change bullet type, position, or remove them (for nav menus). First type, then position, then remove.

### CONCEPT

```css
ul {
  list-style-type: square;
  list-style-position: inside;
}
ul { list-style: none; } /* remove bullets */
```

- `list-style-type`: disc, circle, square, decimal, lower-roman, etc.
- `list-style-position`: inside (text wraps under bullet) or outside (default).
- `list-style-image`: custom image bullet.

### CODE (gradual)

Stage 1 — Change bullet:

```css
ul { list-style-type: square; }
```

Stage 2 — Remove bullets:

```css
ul { list-style: none; padding: 0; }
```

Stage 3 — Custom image:

```css
ul { list-style-image: url("bullet.png"); }
```

### TEST

Three questions:

1. Property for bullet type? (`list-style-type`)
2. How to remove bullets? (`list-style: none`)
3. `inside` vs `outside`? (text wrap behavior)

**Checkpoint:** Style a list with square bullets, then remove them.

## Common Mistakes

- Forgetting `padding: 0` when removing bullets.
- Using lists for layout.
- Wrong `list-style-type` value.

## Try It Yourself

1. Change bullet type to circle.
2. Remove bullets for a nav menu.
3. Add a custom bullet image.

## Summary

- `list-style-type`, `position`, `image`.
- `list-style: none` removes bullets.

## Next Step

Lists are clear. Next, tables. Next: CSS 19 — Tables.

---

**In Your Own Words**

1. How to change bullet type?

<details>
<summary>Sample Answer</summary>

**Answer:** `list-style-type: square;` (or circle, disc, etc.).

</details>

2. How to remove bullets?

<details>
<summary>Sample Answer</summary>

**Answer:** `list-style: none;` (plus `padding: 0`).

</details>

3. What does `list-style-position: inside` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Text wraps under the bullet.

</details>

4. Can you use a custom image as bullet?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes, `list-style-image: url(...)`.

</details>

5. What is the default bullet type for `<ul>`?

<details>
<summary>Sample Answer</summary>

**Answer:** `disc`.

</details>

## What It Is NOT

- ❌ `list-style: none` does **not** remove padding (set `padding: 0`).
- ❌ Lists are **not** for layout.
- ❌ `inside` is **not** the default position.