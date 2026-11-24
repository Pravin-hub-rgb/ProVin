# Doc CSS Advanced 11 — Transitions

## Cheat Sheet (Quick Recall)

- `transition: property duration timing-function delay;`.
- `transition-property`: which property to animate.
- `transition-duration`: how long.
- `transition-timing-function`: ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier.
- `transition-delay`: wait before starting.

## Where We Are So Far

CSS Advanced 10 covered 3D transforms. Now transitions — smooth changes between states.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: transitions.

## Main Content

### THINK

Transitions animate property changes (e.g., hover). First basic transition, then timing function, then delay, then all properties.

### CONCEPT

```css
button {
  background: blue;
  transition: background 0.3s ease;
}
button:hover {
  background: red;
}
```

- `transition-property`: property to animate (or `all`).
- `transition-duration`: time (s or ms).
- `transition-timing-function`: easing.
- `transition-delay`: wait before start.

**Shorthand:**

```css
button { transition: all 0.3s ease 0s; }
```

### CODE (gradual)

Stage 1 — Basic:

```css
button { transition: background 0.3s; }
button:hover { background: red; }
```

Stage 2 — Timing function:

```css
button { transition: background 0.3s ease-in-out; }
```

Stage 3 — Delay:

```css
button { transition: background 0.3s ease 0.1s; }
```

Stage 4 — All properties:

```css
button { transition: all 0.3s ease; }
```

### TEST

Three questions:

1. Transition shorthand? (`property duration timing delay`)
2. What does `ease` do? (slow start/end, fast middle)
3. How to animate all properties? (`all` or `transition: all`)

**Checkpoint:** Create a button with hover transition.

## Common Mistakes

- Forgetting duration (default 0s — no animation).
- Animating non-animatable properties (e.g., `display`).
- Too many transitions (performance).

## Try It Yourself

1. Add a hover transition.
2. Change timing function.
3. Add a delay.

## Summary

- `transition: property duration timing delay`.
- Animate on state change (hover, focus).
- Only animatable properties.

## Next Step

Transitions are clear. Next, animations. Next: CSS Advanced 12 — Animations.

---

**In Your Own Words**

1. What is a CSS transition?

<details>
<summary>Sample Answer</summary>

**Answer:** Smooth animation between property values on state change.

</details>

2. What does `ease` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Slow start, fast middle, slow end.

</details>

3. Can you animate `display`?

<details>
<summary>Sample Answer</summary>

**Answer:** No — not animatable.

</details>

4. What is `transition-delay`?

<details>
<summary>Sample Answer</summary>

**Answer:** Time to wait before starting the transition.

</details>

5. How to animate all properties?

<details>
<summary>Sample Answer</summary>

**Answer:** `transition: all 0.3s ease;`.

</details>

## What It Is NOT

- ❌ Transitions are **not** animations (`@keyframes`).
- ❌ `display` is **not** animatable.
- ❌ Missing duration means **no animation**.