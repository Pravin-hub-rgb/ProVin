# Doc CSS Advanced 12 — Animations

## Cheat Sheet (Quick Recall)

- `@keyframes name { from {} to {} }`.
- `animation: name duration timing delay iteration-count direction;`.
- `animation-fill-mode`: forwards/backwards/both.
- `@keyframes` can have multiple steps (0%, 50%, 100%).

## Where We Are So Far

CSS Advanced 11 covered transitions. Now animations — keyframe-based.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: animations.

## Main Content

### THINK

Transitions animate on state change. Animations run automatically (or on trigger) with keyframes. First `@keyframes`, then `animation` property, then fill-mode.

### CONCEPT

```css
@keyframes slideIn {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

div {
  animation: slideIn 1s ease forwards;
}
```

- `@keyframes`: define steps.
- `animation`: shorthand (name, duration, timing, delay, iteration, direction, fill-mode).
- `animation-fill-mode`: `forwards` (keep end state), `backwards`, `both`.

**Multiple steps:**

```css
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
```

### CODE (gradual)

Stage 1 — Keyframes:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

Stage 2 — Apply:

```css
div { animation: fadeIn 1s ease; }
```

Stage 3 — Fill-mode:

```css
div { animation: fadeIn 1s ease forwards; }
```

Stage 4 — Multiple steps:

```css
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
```

### TEST

Three questions:

1. What defines animation steps? (`@keyframes`)
2. What does `forwards` do? (keeps end state)
3. How to repeat infinitely? (`infinite`)

**Checkpoint:** Create a fade-in animation with `forwards`.

## Common Mistakes

- Missing `@keyframes` name match.
- Forgetting `animation-duration` (default 0s).
- Not using `forwards` (snaps back).

## Try It Yourself

1. Create a fade-in animation.
2. Create a pulse animation.
3. Make it repeat infinitely.

## Summary

- `@keyframes` define steps.
- `animation` shorthand applies.
- `animation-fill-mode: forwards` keeps end state.

## Next Step

Animations are clear. Next, tooltips. Next: CSS Advanced 13 — Tooltips.

---

**In Your Own Words**

1. What defines animation steps?

<details>
<summary>Sample Answer</summary>

**Answer:** `@keyframes`.

</details>

2. What does `forwards` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Keeps the end state after animation completes.

</details>

3. How to repeat an animation infinitely?

<details>
<summary>Sample Answer</summary>

**Answer:** `animation-iteration-count: infinite`.

</details>

4. Difference between transition and animation?

<details>
<summary>Sample Answer</summary>

**Answer:** Transition animates on state change; animation runs via keyframes (can loop).

</details>

5. Can keyframes have multiple steps?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes (0%, 50%, 100%).

</details>

## What It Is NOT

- ❌ Animation is **not** transition.
- ❌ Missing duration means **no animation**.
- ❌ Without `forwards`, it **snaps back**.