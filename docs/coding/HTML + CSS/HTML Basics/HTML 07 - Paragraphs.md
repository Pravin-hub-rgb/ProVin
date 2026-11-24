# Doc HTML 07 — Paragraphs

## Cheat Sheet (Quick Recall)

- `<p>` for paragraphs.
- Browsers collapse multiple spaces/newlines into one space.
- Use `<br>` for line breaks within a paragraph.
- Use CSS `margin` for spacing between paragraphs.

## Where We Are So Far

HTML 06 covered headings. Now paragraphs — the main text content.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: paragraph text.

## Main Content

### THINK

Headings are understood. Now the body text — paragraphs. HTML collapses whitespace, so `<br>` and CSS handle line breaks and spacing. First basic paragraph, then whitespace behavior, then line breaks.

### CONCEPT

```html
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
```

**Whitespace collapsing:**

```html
<p>Hello    World</p>  <!-- renders as "Hello World" -->
```

**Line break within a paragraph:**

```html
<p>Line one.<br />Line two.</p>
```

### CODE (gradual)

Stage 1 — Single paragraph:

```html
<p>Hello World</p>
```

Stage 2 — Multiple paragraphs:

```html
<p>First paragraph.</p>
<p>Second paragraph.</p>
```

Stage 3 — Line break:

```html
<p>Line one.<br />Line two.</p>
```

### TEST

Three questions:

1. What tag defines a paragraph? (`<p>`)
2. What happens to multiple spaces? (collapsed to one)
3. How to add a line break inside a paragraph? (`<br>`)

**Checkpoint:** Create two paragraphs and a line break, open in browser.

## Common Mistakes

- Using `<br>` for paragraph spacing (use CSS margin).
- Expecting newlines in source to show as line breaks.
- Empty paragraphs for spacing.

## Try It Yourself

1. Create two paragraphs.
2. Add a `<br>` inside one.
3. Style paragraph spacing with CSS.

## Summary

- `<p>` for paragraphs.
- Whitespace collapses.
- `<br>` for line breaks within a paragraph.

## Next Step

Paragraphs are clear. Next, styles in HTML. Next: HTML 08 — Styles.

---

**In Your Own Words**

1. What tag is used for paragraphs?

<details>
<summary>Sample Answer</summary>

**Answer:** `<p>`.

</details>

2. What happens to multiple spaces in HTML?

<details>
<summary>Sample Answer</summary>

**Answer:** They collapse into a single space.

</details>

3. How do you add a line break inside a paragraph?

<details>
<summary>Sample Answer</summary>

**Answer:** Use `<br>`.

</details>

4. Should `<br>` be used for paragraph spacing?

<details>
<summary>Sample Answer</summary>

**Answer:** No — use CSS margin.

</details>

5. Can you have empty paragraphs?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes, but not recommended for spacing.

</details>

## What It Is NOT

- ❌ `<br>` is **not** for paragraph spacing.
- ❌ Newlines in source are **not** rendered as breaks.
- ❌ Empty `<p>` is **not** a spacing tool.