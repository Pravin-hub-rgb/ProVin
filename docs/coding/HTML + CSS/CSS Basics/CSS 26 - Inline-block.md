# Doc CSS 26 — Inline-block

## Cheat Sheet (Quick Recall)

- `display: inline-block` — inline but accepts width/height.
- Flows in text like inline, but box-model like block.
- Useful for nav items, buttons in a row.
- Gap issue: whitespace between elements creates gaps.

## Where We Are So Far

CSS 25 covered float. Now inline-block — inline with dimensions.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: inline-block.

## Main Content

### THINK

Inline elements cannot have width/height. Block elements break the line. `inline-block` combines both. First concept, then use case, then gap issue.

### CONCEPT

```css
span {
  display: inline-block;
  width: 100px;
  height: 50px;
}
```

- Flows inline (no new line).
- Accepts width/height/margins.
- Useful for nav items, buttons.

**Gap issue:**

Whitespace in HTML creates gaps between inline-block elements. Fix: remove whitespace or use flexbox.

### CODE (gradual)

Stage 1 — Inline (no width):

```css
span { display: inline; } /* width ignored */
```

Stage 2 — Inline-block:

```css
span { display: inline-block; width: 100px; height: 50px; }
```

Stage 3 — Nav menu:

```css
.nav-item { display: inline-block; padding: 10px; }
```

### TEST

Three questions:

1. What is `inline-block`? (inline flow + block dimensions)
2. Does it accept width/height? (Yes)
3. What causes gaps between inline-blocks? (whitespace in HTML)

**Checkpoint:** Create a horizontal nav with inline-block items.

## Common Mistakes

- Whitespace gaps between items.
- Using inline-block for full layout (use flexbox).
- Expecting no line break (it wraps if needed).

## Try It Yourself

1. Make spans inline-block with width.
2. Build a nav menu.
3. Fix the whitespace gap.

## Summary

- `inline-block` = inline flow + block dimensions.
- Useful for nav items, buttons.
- Whitespace creates gaps (use flexbox to avoid).

## Next Step

Inline-block is clear. Next, align. Next: CSS 27 — Align.

---

**In Your Own Words**

1. What is `inline-block`?

<details>
<summary>Sample Answer</summary>

**Answer:** An element that flows inline but accepts width/height.

</details>

2. Does `inline-block` accept width/height?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes.

</details>

3. What causes gaps between inline-block elements?

<details>
<summary>Sample Answer</summary>

**Answer:** Whitespace in the HTML source.

</details>

4. Common use of inline-block?

<details>
<summary>Sample Answer</summary>

**Answer:** Nav items, buttons in a row.

</details>

5. Modern alternative to inline-block for layout?

<details>
<summary>Sample Answer</summary>

**Answer:** Flexbox.

</details>

## What It Is NOT

- ❌ `inline-block` is **not** flexbox.
- ❌ Gaps are **not** margin (whitespace).
- ❌ `inline-block` is **not** for full page layout.