# Doc CSS 36 — Forms

## Cheat Sheet (Quick Recall)

- Style inputs: `border`, `padding`, `border-radius`.
- `:focus` for focus state.
- `:valid`/`:invalid` for validation styling.
- Full-width inputs: `width: 100%`.

## Where We Are So Far

CSS 35 covered attribute selectors. Now forms — styling form elements.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: form styling.

## Main Content

### THINK

Forms need styling: inputs, buttons, labels. First basic input styling, then focus state, then validation states.

### CONCEPT

```css
input, textarea, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
input:focus {
  border-color: blue;
  outline: none;
}
input:valid { border-color: green; }
input:invalid { border-color: red; }
```

### CODE (gradual)

Stage 1 — Basic input:

```css
input { padding: 8px; border: 1px solid #ccc; }
```

Stage 2 — Focus:

```css
input:focus { border-color: blue; outline: none; }
```

Stage 3 — Validation:

```css
input:valid { border-color: green; }
input:invalid { border-color: red; }
```

### TEST

Three questions:

1. How to style an input? (border, padding, border-radius)
2. Pseudo-class for focus? (`:focus`)
3. Pseudo-class for invalid? (`:invalid`)

**Checkpoint:** Style a form with focus and validation states.

## Common Mistakes

- Removing outline without alternative (accessibility).
- Fixed width inputs (not responsive).
- Inconsistent styling across input types.

## Try It Yourself

1. Style text inputs.
2. Add focus state.
3. Add valid/invalid states.

## Summary

- Style inputs: border, padding, border-radius, width.
- `:focus`, `:valid`, `:invalid` for states.

## Next Step

Forms styling is clear. Next, website layout. Next: CSS 37 — Website Layout.

---

**In Your Own Words**

1. How to style an input?

<details>
<summary>Sample Answer</summary>

**Answer:** `border`, `padding`, `border-radius`, `width: 100%`.

</details>

2. What pseudo-class styles focus?

<details>
<summary>Sample Answer</summary>

**Answer:** `:focus`.

</details>

3. What pseudo-class styles invalid input?

<details>
<summary>Sample Answer</summary>

**Answer:** `:invalid`.

</details>

4. Why not remove outline without alternative?

<details>
<summary>Sample Answer</summary>

**Answer:** Accessibility — keyboard users need focus indicator.

</details>

5. How to make input full-width?

<details>
<summary>Sample Answer</summary>

**Answer:** `width: 100%`.

</details>

## What It Is NOT

- ❌ Removing outline is **not** accessible.
- ❌ `:valid` is **not** `:invalid`.
- ❌ Fixed width is **not** responsive.