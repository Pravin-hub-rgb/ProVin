# Doc CSS 14 — Text

## Cheat Sheet (Quick Recall)

- `color`, `text-align`, `text-decoration`, `text-transform`.
- `line-height`, `letter-spacing`, `word-spacing`.
- `text-indent`, `text-shadow`.
- `white-space`: normal, nowrap, pre, pre-wrap.

## Where We Are So Far

CSS 13 covered outline. Now text — styling text content.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: text properties.

## Main Content

### THINK

Text needs color, alignment, decoration, spacing. First color/align, then decoration/transform, then spacing/shadow.

### CONCEPT

```css
p {
  color: #333;
  text-align: center;
  text-decoration: underline;
  text-transform: uppercase;
  line-height: 1.5;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px gray;
}
```

- `color`: text color.
- `text-align`: left/center/right/justify.
- `text-decoration`: underline/overline/line-through/none.
- `text-transform`: uppercase/lowercase/capitalize.
- `line-height`: line spacing.
- `letter-spacing`: char spacing.
- `text-shadow`: shadow.

### CODE (gradual)

Stage 1 — Color + align:

```css
p { color: #333; text-align: center; }
```

Stage 2 — Decoration + transform:

```css
p { text-decoration: underline; text-transform: uppercase; }
```

Stage 3 — Spacing + shadow:

```css
p { line-height: 1.5; letter-spacing: 2px; text-shadow: 2px 2px 4px gray; }
```

### TEST

Three questions:

1. Property for text color? (`color`)
2. Property for alignment? (`text-align`)
3. Property for line spacing? (`line-height`)

**Checkpoint:** Style a paragraph with color, alignment, and spacing.

## Common Mistakes

- Confusing `text-align` with flexbox alignment.
- Too much letter-spacing.
- Missing fallback fonts.

## Try It Yourself

1. Center text.
2. Add underline and uppercase.
3. Add text shadow.

## Summary

- Text properties: color, align, decoration, transform, spacing, shadow.

## Next Step

Text is clear. Next, fonts. Next: CSS 15 — Fonts.

---

**In Your Own Words**

1. What property sets text color?

<details>
<summary>Sample Answer</summary>

**Answer:** `color`.

</details>

2. What property aligns text?

<details>
<summary>Sample Answer</summary>

**Answer:** `text-align`.

</details>

3. What property adds underline?

<details>
<summary>Sample Answer</summary>

**Answer:** `text-decoration: underline`.

</details>

4. What property controls line spacing?

<details>
<summary>Sample Answer</summary>

**Answer:** `line-height`.

</details>

5. What property transforms case?

<details>
<summary>Sample Answer</summary>

**Answer:** `text-transform`.

</details>

## What It Is NOT

- ❌ `text-align` is **not** flexbox alignment.
- ❌ `color` is **not** background-color.
- ❌ `text-decoration` is **not** for layout.