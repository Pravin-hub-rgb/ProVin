# Doc CSS Advanced 07 — Text Effects

## Cheat Sheet (Quick Recall)

- `text-shadow` for shadow.
- `text-stroke`/`-webkit-text-stroke` for outline.
- `text-overflow: ellipsis` with `overflow: hidden` and `white-space: nowrap`.
- `word-wrap: break-word` / `overflow-wrap`.

## Where We Are So Far

CSS Advanced 06 covered shadows. Now text effects — styling text beyond basics.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: text effects.

## Main Content

### THINK

Text can have shadows, outlines, ellipsis, wrapping. First shadow, then stroke, then ellipsis, then wrapping.

### CONCEPT

```css
p {
  text-shadow: 2px 2px 4px gray;
  -webkit-text-stroke: 1px black;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  overflow-wrap: break-word;
}
```

- `text-shadow`: shadow on text.
- `-webkit-text-stroke`: outline on text.
- `text-overflow: ellipsis`: truncate with "...".
- `overflow-wrap: break-word`: break long words.

### CODE (gradual)

Stage 1 — Text shadow:

```css
p { text-shadow: 2px 2px 4px gray; }
```

Stage 2 — Ellipsis:

```css
p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

Stage 3 — Word wrap:

```css
p { overflow-wrap: break-word; }
```

### TEST

Three questions:

1. Property for text shadow? (`text-shadow`)
2. How to show ellipsis on overflow? (`text-overflow: ellipsis` + `overflow: hidden` + `white-space: nowrap`)
3. Property to break long words? (`overflow-wrap: break-word`)

**Checkpoint:** Create truncated text with ellipsis.

## Common Mistakes

- Missing `white-space: nowrap` for ellipsis.
- Missing `overflow: hidden`.
- Using `word-break` when `overflow-wrap` is enough.

## Try It Yourself

1. Add text shadow.
2. Create ellipsis truncation.
3. Break a long word.

## Summary

- `text-shadow`, `-webkit-text-stroke`.
- `text-overflow: ellipsis` (with nowrap + hidden).
- `overflow-wrap: break-word`.

## Next Step

Text effects are clear. Next, custom fonts. Next: CSS Advanced 08 — Custom Fonts.

---

**In Your Own Words**

1. What is `text-overflow: ellipsis`?

<details>
<summary>Sample Answer</summary>

**Answer:** Truncates text with "..." when it overflows.

</details>

2. What three properties are needed for ellipsis?

<details>
<summary>Sample Answer</summary>

**Answer:** `text-overflow: ellipsis`, `overflow: hidden`, `white-space: nowrap`.

</details>

3. What property breaks long words?

<details>
<summary>Sample Answer</summary>

**Answer:** `overflow-wrap: break-word`.

</details>

4. What is `-webkit-text-stroke`?

<details>
<summary>Sample Answer</summary>

**Answer:** Outline/stroke on text (webkit prefix).

</details>

5. Difference between `text-shadow` and `box-shadow`?

<details>
<summary>Sample Answer</summary>

**Answer:** `text-shadow` on text; `box-shadow` on element box.

</details>

## What It Is NOT

- ❌ Ellipsis is **not** automatic — needs three properties.
- ❌ `word-break` is **not** `overflow-wrap`.
- ❌ `text-stroke` is **not** standard (webkit).