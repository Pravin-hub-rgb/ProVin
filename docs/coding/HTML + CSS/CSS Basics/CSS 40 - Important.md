# Doc CSS 40 — Important

## Cheat Sheet (Quick Recall)

- `!important` overrides all specificity.
- Use sparingly (utility classes, third-party overrides).
- Avoid in normal code — fix specificity instead.
- Syntax: `property: value !important;`.

## Where We Are So Far

CSS 39 covered specificity. Now `!important` — the override.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: `!important`.

## Main Content

### THINK

`!important` forces a declaration to win. It should be rare. First syntax, then when to use, then why to avoid.

### CONCEPT

```css
p { color: red !important; }
```

- Overrides all specificity.
- Use for utility classes (e.g., `.hidden { display: none !important; }`).
- Use to override third-party CSS.
- Avoid in normal component styles.

### CODE (gradual)

Stage 1 — Without !important:

```css
p { color: red; }  /* loses to #main { color: blue; } */
```

Stage 2 — With !important:

```css
p { color: red !important; } /* wins */
```

Stage 3 — Utility class:

```css
.hidden { display: none !important; }
```

### TEST

Three questions:

1. What does `!important` do? (overrides all specificity)
2. When to use it? (utilities, third-party overrides)
3. Why avoid in normal code? (tech debt, specificity wars)

**Checkpoint:** Use `!important` in a utility class; observe it wins.

## Common Mistakes

- Using `!important` to fix poor selectors.
- Overusing → specificity wars.
- Not documenting why it is used.

## Try It Yourself

1. Create a conflict and resolve with `!important`.
2. Create a utility class with `!important`.
3. Refactor to avoid `!important`.

## Summary

- `!important` overrides all.
- Use sparingly (utilities, overrides).
- Avoid in normal code.

## Next Step

CSS Basics complete. Next, CSS Advanced. Next: CSS Advanced 01 — Rounded Corners.

---

**In Your Own Words**

1. What does `!important` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Overrides all specificity.

</details>

2. When should you use `!important`?

<details>
<summary>Sample Answer</summary>

**Answer:** Utility classes, third-party overrides.

</details>

3. Why avoid `!important` in normal code?

<details>
<summary>Sample Answer</summary>

**Answer:** It causes specificity wars and tech debt.

</details>

4. What is a utility class?

<details>
<summary>Sample Answer</summary>

**Answer:** A single-purpose class (e.g., `.hidden`, `.text-center`).

</details>

5. How to reduce reliance on `!important`?

<details>
<summary>Sample Answer</summary>

**Answer:** Fix selectors and specificity instead.

</details>

## What It Is NOT

- ❌ `!important` is **not** a best practice for normal styles.
- ❌ It does **not** fix poor architecture.
- ❌ Overuse is **not** maintainable.