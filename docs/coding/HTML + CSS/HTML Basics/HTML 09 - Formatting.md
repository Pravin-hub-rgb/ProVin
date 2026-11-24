# Doc HTML 09 — Formatting

## Cheat Sheet (Quick Recall)

- `<b>` bold, `<strong>` important (bold + semantic).
- `<i>` italic, `<em>` emphasis (italic + semantic).
- `<mark>` highlighted, `<small>` smaller text.
- `<del>` deleted (strikethrough), `<ins>` inserted (underline).
- `<sub>` subscript, `<sup>` superscript.

## Where We Are So Far

HTML 08 covered styles. Now formatting — text emphasis tags.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: text formatting tags.

## Main Content

### THINK

Text needs emphasis: bold, italic, highlighted, deleted. HTML provides tags for these. First visual-only (`<b>`, `<i>`), then semantic (`<strong>`, `<em>`), then others.

### CONCEPT

```html
<b>Bold</b>  <strong>Important</strong>
<i>Italic</i>  <em>Emphasis</em>
<mark>Highlighted</mark>
<small>Small</small>
<del>Deleted</del>  <ins>Inserted</ins>
H<sub>2</sub>O  E=mc<sup>2</sup>
```

- `<strong>`/`<em>` carry semantic meaning (screen readers).
- `<b>`/`<i>` are purely visual.

### CODE (gradual)

Stage 1 — Bold/italic:

```html
<p><b>Bold</b> and <i>italic</i></p>
```

Stage 2 — Semantic:

```html
<p><strong>Important</strong> and <em>emphasis</em></p>
```

Stage 3 — Others:

```html
<p><mark>Highlighted</mark> <del>deleted</del> <ins>inserted</ins></p>
```

### TEST

Three questions:

1. Difference between `<b>` and `<strong>`? (semantic meaning)
2. Difference between `<i>` and `<em>`? (semantic meaning)
3. What tag for subscript? (`<sub>`)

**Checkpoint:** Create a paragraph using bold, italic, strong, em, mark.

## Common Mistakes

- Using `<b>` when `<strong>` is meant (accessibility).
- Using formatting tags for layout.
- Nesting incorrectly.

## Try It Yourself

1. Build a paragraph with all formatting tags.
2. Inspect in DevTools.
3. Style them with CSS.

## Summary

- `<b>`/`<i>` visual; `<strong>`/`<em>` semantic.
- `<mark>`, `<small>`, `<del>`, `<ins>`, `<sub>`, `<sup>`.

## Next Step

Formatting is clear. Next, quotations. Next: HTML 10 — Quotations.

---

**In Your Own Words**

1. Difference between `<b>` and `<strong>`?

<details>
<summary>Sample Answer</summary>

**Answer:** `<b>` is visual only; `<strong>` adds semantic importance.

</details>

2. Difference between `<i>` and `<em>`?

<details>
<summary>Sample Answer</summary>

**Answer:** `<i>` is visual only; `<em>` adds semantic emphasis.

</details>

3. What tag highlights text?

<details>
<summary>Sample Answer</summary>

**Answer:** `<mark>`.

</details>

4. What tag shows deleted text?

<details>
<summary>Sample Answer</summary>

**Answer:** `<del>`.

</details>

5. What tag is used for superscript?

<details>
<summary>Sample Answer</summary>

**Answer:** `<sup>`.

</details>

## What It Is NOT

- ❌ `<b>` is **not** semantic.
- ❌ Formatting tags are **not** for layout.
- ❌ `<strong>` is **not** just bold — it carries meaning.