# Doc CSS Advanced 19 — Buttons

## Cheat Sheet (Quick Recall)

- Base styles: padding, border, border-radius, background, color.
- Hover/active/focus states.
- Variants: primary, secondary, outline, ghost.
- Accessibility: focus outline, sufficient contrast.

## Where We Are So Far

CSS Advanced 18 covered masking. Now buttons — a common UI component.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: buttons.

## Main Content

### THINK

Buttons need styling: base, hover, active, focus. First base, then states, then variants.

### CONCEPT

```css
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
}
.btn:hover { background: #0056b3; }
.btn:active { transform: translateY(1px); }
.btn:focus { outline: 2px solid #007bff; }
.btn-outline { background: transparent; border: 2px solid #007bff; color: #007bff; }
```

### CODE (gradual)

Stage 1 — Base:

```css
.btn { padding: 10px 20px; background: blue; color: white; border: none; border-radius: 4px; }
```

Stage 2 — Hover/active:

```css
.btn:hover { background: darkblue; }
.btn:active { transform: translateY(1px); }
```

Stage 3 — Focus:

```css
.btn:focus { outline: 2px solid blue; }
```

Stage 4 — Variants:

```css
.btn-outline { background: transparent; border: 2px solid blue; color: blue; }
```

### TEST

Three questions:

1. What pseudo-class for hover? (`:hover`)
2. What pseudo-class for focus? (`:focus`)
3. How to create an outline button? (transparent bg + border)

**Checkpoint:** Build a button with all states and a variant.

## Common Mistakes

- Removing focus outline (accessibility).
- No hover/active feedback.
- Low contrast text.

## Try It Yourself

1. Style a primary button.
2. Add hover/active/focus.
3. Create an outline variant.

## Summary

- Base: padding, border, radius, background, color.
- States: hover, active, focus.
- Variants: primary, secondary, outline, ghost.

## Next Step

Buttons are clear. Next, pagination. Next: CSS Advanced 20 — Pagination.

---

**In Your Own Words**

1. What states should a button have?

<details>
<summary>Sample Answer</summary>

**Answer:** Hover, active, focus (and disabled).

</details>

2. Why is focus outline important?

<details>
<summary>Sample Answer</summary>

**Answer:** Accessibility for keyboard users.

</details>

3. How to create an outline button?

<details>
<summary>Sample Answer</summary>

**Answer:** Transparent background + border + colored text.

</details>

4. What does `:active` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Styles while being clicked.

</details>

5. What is a ghost button?

<details>
<summary>Sample Answer</summary>

**Answer:** Transparent background, border only.

</details>

## What It Is NOT

- ❌ Removing focus outline is **not** accessible.
- ❌ Buttons are **not** just `<div>`s.
- ❌ `:hover` is **not** `:active`.