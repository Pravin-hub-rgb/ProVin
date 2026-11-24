# Doc CSS Advanced 23 — Media Queries

## Cheat Sheet (Quick Recall)

- `@media (condition) { ... }`.
- Conditions: `max-width`, `min-width`, `orientation`, `prefers-color-scheme`.
- Mobile-first: `min-width` breakpoints.
- Combine: `and`, `or` (comma), `not`.

## Where We Are So Far

CSS Advanced 22 covered user interface. Now media queries — responsive CSS.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: media queries.

## Main Content

### THINK

Media queries apply CSS based on conditions (screen size, orientation, dark mode). First basic syntax, then breakpoints, then mobile-first, then dark mode.

### CONCEPT

```css
@media (max-width: 600px) {
  body { font-size: 14px; }
}

@media (min-width: 768px) {
  .container { display: flex; }
}

@media (prefers-color-scheme: dark) {
  body { background: #111; color: #eee; }
}
```

- `max-width`: applies when screen ≤ value.
- `min-width`: applies when screen ≥ value.
- `prefers-color-scheme: dark`: dark mode.
- Combine with `and`: `@media (min-width: 600px) and (max-width: 900px)`.

### CODE (gradual)

Stage 1 — Basic:

```css
@media (max-width: 600px) {
  body { font-size: 14px; }
}
```

Stage 2 — Min-width (mobile-first):

```css
@media (min-width: 768px) {
  .container { display: flex; }
}
```

Stage 3 — Dark mode:

```css
@media (prefers-color-scheme: dark) {
  body { background: #111; color: #eee; }
}
```

### TEST

Three questions:

1. Syntax for media query? (`@media (condition) { }`)
2. Which breakpoint for mobile-first? (`min-width`)
3. How to detect dark mode? (`prefers-color-scheme: dark`)

**Checkpoint:** Create responsive styles with media queries.

## Common Mistakes

- Desktop-first (max-width) instead of mobile-first (min-width).
- Wrong breakpoint values.
- Forgetting viewport meta tag.

## Try It Yourself

1. Add a mobile breakpoint.
2. Add a tablet breakpoint.
3. Add dark mode styles.

## Summary

- `@media (condition) { }`.
- Mobile-first: `min-width`.
- Dark mode: `prefers-color-scheme`.

## Next Step

CSS Advanced complete. Next, CSS Flexbox. Next: CSS Flexbox 01 — Intro.

---

**In Your Own Words**

1. What is a media query?

<details>
<summary>Sample Answer</summary>

**Answer:** A CSS rule that applies styles based on conditions (screen size, orientation, etc.).

</details>

2. Which breakpoint for mobile-first?

<details>
<summary>Sample Answer</summary>

**Answer:** `min-width`.

</details>

3. How to detect dark mode in CSS?

<details>
<summary>Sample Answer</summary>

**Answer:** `@media (prefers-color-scheme: dark)`.

</details>

4. Difference between `max-width` and `min-width`?

<details>
<summary>Sample Answer</summary>

**Answer:** `max-width` applies when screen is ≤ value; `min-width` when ≥ value.

</details>

5. Can media queries combine conditions?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes, with `and`.

</details>

## What It Is NOT

- ❌ Media queries are **not** JavaScript.
- ❌ Missing viewport meta is **not** responsive.
- ❌ Desktop-first is **not** recommended.