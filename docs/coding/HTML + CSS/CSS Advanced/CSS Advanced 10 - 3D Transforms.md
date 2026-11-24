# Doc CSS Advanced 10 — 3D Transforms

## Cheat Sheet (Quick Recall)

- `transform: rotateX(deg)`, `rotateY(deg)`, `rotateZ(deg)`.
- `perspective` on parent for 3D depth.
- `transform-style: preserve-3d` for nested 3D.
- `translateZ()` for depth.

## Where We Are So Far

CSS Advanced 09 covered 2D transforms. Now 3D transforms — depth.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: 3D transforms.

## Main Content

### THINK

2D transforms are known. Now add depth (Z-axis). First perspective (parent), then rotateX/Y/Z, then translateZ, then preserve-3d.

### CONCEPT

```css
.parent { perspective: 1000px; }
.child {
  transform: rotateY(45deg);
  transform-style: preserve-3d;
}
```

- `perspective`: depth (on parent).
- `rotateX/Y/Z`: rotate around axes.
- `translateZ`: move along Z.
- `transform-style: preserve-3d`: keep 3D for children.

### CODE (gradual)

Stage 1 — Perspective:

```css
.parent { perspective: 1000px; }
```

Stage 2 — Rotate Y:

```css
.child { transform: rotateY(45deg); }
```

Stage 3 — Translate Z:

```css
.child { transform: translateZ(100px); }
```

Stage 4 — Preserve 3D:

```css
.parent { transform-style: preserve-3d; }
```

### TEST

Three questions:

1. What creates 3D depth? (`perspective` on parent)
2. Function to rotate around Y axis? (`rotateY`)
3. What does `preserve-3d` do? (keeps 3D for children)

**Checkpoint:** Create a 3D rotating card.

## Common Mistakes

- Missing `perspective` → no 3D effect.
- Missing `preserve-3d` → children flatten.
- Too small perspective → extreme distortion.

## Try It Yourself

1. Add perspective to a parent.
2. Rotate a child on Y axis.
3. Add translateZ.

## Summary

- `perspective` on parent for depth.
- `rotateX/Y/Z`, `translateZ`.
- `transform-style: preserve-3d`.

## Next Step

3D transforms are clear. Next, transitions. Next: CSS Advanced 11 — Transitions.

---

**In Your Own Words**

1. What creates 3D depth?

<details>
<summary>Sample Answer</summary>

**Answer:** `perspective` on the parent.

</details>

2. What does `rotateY(45deg)` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Rotates 45 degrees around the Y axis.

</details>

3. What does `translateZ` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Moves element along the Z axis (depth).

</details>

4. What does `preserve-3d` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Keeps 3D transforms for child elements.

</details>

5. Where does `perspective` go?

<details>
<summary>Sample Answer</summary>

**Answer:** On the parent element.

</details>

## What It Is NOT

- ❌ `perspective` on child is **not** enough.
- ❌ `preserve-3d` is **not** default.
- ❌ 3D without perspective is **flat**.