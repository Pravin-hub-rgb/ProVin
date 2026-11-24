# Doc Project 02 — CSS Styling

## Cheat Sheet (Quick Recall)

- Style each section: header, hero, features, footer.
- Use CSS variables for colors/fonts.
- Typography, spacing, buttons.
- Consistent design system.

## Where We Are So Far

Project 01 covered HTML structure. Now CSS styling.

## Broader Goal

The overall goal is a complete responsive landing page. Current step: CSS styling. Connection: structure ready; now style it.

## Main Content

### THINK

The HTML structure is ready. Now style each section: colors, typography, spacing, buttons. First base styles, then each section, then consistent variables.

### CONCEPT

```css
:root {
  --primary: #007bff;
  --text: #333;
  --bg: #fff;
}

body {
  font-family: system-ui, sans-serif;
  color: var(--text);
  background: var(--bg);
  margin: 0;
}

.header { padding: 16px; background: var(--primary); color: white; }
.hero { padding: 64px 16px; text-align: center; }
.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; padding: 32px 16px; }
.footer { padding: 16px; text-align: center; background: #f5f5f5; }

.btn { padding: 10px 20px; background: var(--primary); color: white; border: none; border-radius: 4px; }
```

### CODE (gradual)

Stage 1 — Base + variables:

```css
:root { --primary: #007bff; --text: #333; }
body { font-family: system-ui; color: var(--text); margin: 0; }
```

Stage 2 — Header + hero:

```css
.header { padding: 16px; background: var(--primary); color: white; }
.hero { padding: 64px 16px; text-align: center; }
```

Stage 3 — Features grid + footer:

```css
.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; }
.footer { padding: 16px; text-align: center; background: #f5f5f5; }
```

Stage 4 — Button:

```css
.btn { padding: 10px 20px; background: var(--primary); color: white; border: none; border-radius: 4px; }
```

### TEST

Three questions:

1. What are CSS variables for? (consistent theming)
2. How to define a variable? (`--name: value;` in `:root`)
3. How to use a variable? (`var(--name)`)

**Checkpoint:** Style all sections and verify.

## Common Mistakes

- Inconsistent spacing.
- No CSS variables (hard to maintain).
- Fixed widths.

## Try It Yourself

1. Style header and hero.
2. Style features grid.
3. Add a button.

## Summary

- CSS variables for theming.
- Style each section.
- Consistent spacing/colors.

## Next Step

CSS styling is clear. Next, responsive layout. Next: Project 03 — Responsive Layout.

---

**In Your Own Words**

1. What are CSS variables for?

<details>
<summary>Sample Answer</summary>

**Answer:** Consistent theming and easy maintenance.

</details>

2. How to define a CSS variable?

<details>
<summary>Sample Answer</summary>

**Answer:** In `:root`: `--name: value;`.

</details>

3. How to use a CSS variable?

<details>
<summary>Sample Answer</summary>

**Answer:** `var(--name)`.

</details>

4. Why use CSS variables?

<details>
<summary>Sample Answer</summary>

**Answer:** Change theme in one place.

</details>

5. What sections does the landing page have?

<details>
<summary>Sample Answer</summary>

**Answer:** Header, hero, features, footer.

</details>

## What It Is NOT

- ❌ CSS variables are **not** JS variables.
- ❌ `:root` is **not** `html` (similar but root).
- ❌ Fixed widths are **not** responsive.