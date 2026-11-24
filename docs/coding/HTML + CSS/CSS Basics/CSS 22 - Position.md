# Doc CSS 22 — Position

## Cheat Sheet (Quick Recall)

- `static` (default): normal flow.
- `relative`: normal flow + offset (top/left/etc.).
- `absolute`: relative to nearest positioned ancestor.
- `fixed`: relative to viewport (stays on scroll).
- `sticky`: scrolls until threshold, then sticks.

## Where We Are So Far

CSS 21 covered max-width. Now position — placing elements precisely.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: position property.

## Main Content

### THINK

Position controls where an element is placed. First static/relative (normal flow), then absolute (relative to ancestor), then fixed/sticky (viewport/scroll).

### CONCEPT

```css
.static { position: static; }      /* default */
.relative { position: relative; top: 10px; left: 20px; }
.absolute { position: absolute; top: 0; right: 0; }
.fixed { position: fixed; bottom: 0; right: 0; }
.sticky { position: sticky; top: 0; }
```

- `static`: normal document flow.
- `relative`: normal flow + offset (does not remove from flow).
- `absolute`: removed from flow, positioned relative to nearest positioned ancestor.
- `fixed`: relative to viewport, stays on scroll.
- `sticky`: scrolls normally until threshold, then sticks.

### CODE (gradual)

Stage 1 — Relative:

```css
.box { position: relative; top: 10px; left: 20px; }
```

Stage 2 — Absolute (inside relative parent):

```css
.parent { position: relative; }
.child { position: absolute; top: 0; right: 0; }
```

Stage 3 — Fixed navbar:

```css
.navbar { position: fixed; top: 0; width: 100%; }
```

Stage 4 — Sticky header:

```css
.header { position: sticky; top: 0; }
```

### TEST

Three questions:

1. Which position is removed from flow and relative to ancestor? (`absolute`)
2. Which stays on scroll? (`fixed`)
3. Which sticks after scrolling? (`sticky`)

**Checkpoint:** Build a relative parent with an absolute child.

## Common Mistakes

- `absolute` without positioned parent → relative to body.
- `fixed` covering content (add padding).
- `sticky` without `top`/`bottom` threshold.

## Try It Yourself

1. Create a relative parent + absolute child.
2. Make a fixed navbar.
3. Make a sticky header.

## Summary

- `static`, `relative`, `absolute`, `fixed`, `sticky`.
- `absolute` needs positioned ancestor.
- `fixed`/`sticky` for scroll behavior.

## Next Step

Position is clear. Next, z-index. Next: CSS 23 — Z-index.

---

**In Your Own Words**

1. What is `position: relative`?

<details>
<summary>Sample Answer</summary>

**Answer:** Normal flow + offset; stays in document flow.

</details>

2. What is `position: absolute`?

<details>
<summary>Sample Answer</summary>

**Answer:** Removed from flow; positioned relative to nearest positioned ancestor.

</details>

3. What is `position: fixed`?

<details>
<summary>Sample Answer</summary>

**Answer:** Positioned relative to viewport; stays on scroll.

</details>

4. What is `position: sticky`?

<details>
<summary>Sample Answer</summary>

**Answer:** Scrolls normally until threshold, then sticks.

</details>

5. What does `absolute` need to position correctly?

<details>
<summary>Sample Answer</summary>

**Answer:** A positioned ancestor (relative/absolute/fixed/sticky).

</details>

## What It Is NOT

- ❌ `absolute` is **not** relative to viewport (that's `fixed`).
- ❌ `relative` does **not** remove from flow.
- ❌ `sticky` does **not** work without a threshold.