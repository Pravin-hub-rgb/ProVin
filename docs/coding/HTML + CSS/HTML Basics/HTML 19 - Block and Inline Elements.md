# Doc HTML 19 — Block and Inline Elements

## Cheat Sheet (Quick Recall)

- Block elements: start on new line, take full width (`<div>`, `<p>`, `<h1>`).
- Inline elements: flow in text, take needed width (`<span>`, `<a>`, `<strong>`).
- `display: block/inline/inline-block` in CSS.

## Where We Are So Far

HTML 18 covered lists. Now block vs inline elements.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: block vs inline.

## Main Content

### THINK

Elements behave differently on the page: some take the full width and start on a new line (block), others sit inline with text. First examples, then CSS display property.

### CONCEPT

**Block elements:**

```html
<div>, <p>, <h1>-<h6>, <ul>, <li>, <section>
```

- Start on a new line.
- Take full available width.

**Inline elements:**

```html
<span>, <a>, <strong>, <em>, <img>, <input>
```

- Flow within text.
- Take only needed width.

**CSS display:**

```css
span { display: block; }
div { display: inline; }
```

### CODE (gradual)

Stage 1 — Block:

```html
<div>Block 1</div>
<div>Block 2</div>
```

Stage 2 — Inline:

```html
<p>This is <span>inline</span> text.</p>
```

Stage 3 — Change display:

```css
span { display: block; }
```

### TEST

Three questions:

1. Name three block elements. (`div`, `p`, `h1`)
2. Name three inline elements. (`span`, `a`, `strong`)
3. How to change display type? (CSS `display`)

**Checkpoint:** Create a page showing block vs inline behavior.

## Common Mistakes

- Expecting inline elements to take full width.
- Using block elements inside inline (invalid in some cases).
- Confusing `display` with visibility.

## Try It Yourself

1. Put two `<div>`s — observe new lines.
2. Put two `<span>`s — observe inline flow.
3. Change `display: inline-block` and observe.

## Summary

- Block: new line, full width.
- Inline: flows in text, needed width.
- CSS `display` changes behavior.

## Next Step

Block/inline is clear. Next, classes. Next: HTML 20 — Classes.

---

**In Your Own Words**

1. What is a block element?

<details>
<summary>Sample Answer</summary>

**Answer:** An element that starts on a new line and takes full width.

</details>

2. What is an inline element?

<details>
<summary>Sample Answer</summary>

**Answer:** An element that flows within text and takes only needed width.

</details>

3. Give three block elements.

<details>
<summary>Sample Answer</summary>

**Answer:** `div`, `p`, `h1` (also `ul`, `section`).

</details>

4. Give three inline elements.

<details>
<summary>Sample Answer</summary>

**Answer:** `span`, `a`, `strong` (also `em`, `img`).

</details>

5. How to change an element's display type?

<details>
<summary>Sample Answer</summary>

**Answer:** CSS `display` property.

</details>

## What It Is NOT

- ❌ Block elements do **not** sit inline.
- ❌ Inline elements do **not** take full width.
- ❌ `display` is **not** `visibility`.