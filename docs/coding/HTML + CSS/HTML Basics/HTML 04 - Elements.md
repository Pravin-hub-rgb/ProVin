# Doc HTML 04 — Elements

## Cheat Sheet (Quick Recall)

- HTML element = start tag + content + end tag.
- Void elements have no content: `<img>`, `<br>`, `<hr>`, `<input>`.
- Elements can be nested.
- Tag names are case-insensitive; lowercase is standard.

## Where We Are So Far

HTML 03 covered basic structure. Now elements — the building blocks of HTML.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: what an element is.

## Main Content

### THINK

HTML is made of elements. An element is a tag (or pair of tags) plus its content. Understanding elements is the foundation of writing HTML.

### CONCEPT

An **element** consists of:

- Start tag: `<p>`
- Content: `Hello`
- End tag: `</p>`

```html
<p>Hello World</p>
```

**Void elements** (no closing tag):

```html
<img src="photo.jpg" alt="Photo" />
<br />
<hr />
<input type="text" />
```

**Nested elements:**

```html
<div>
  <h1>Title</h1>
  <p>Paragraph</p>
</div>
```

### CODE (gradual)

Stage 1 — Single element:

```html
<p>Hello</p>
```

Stage 2 — Nested:

```html
<div>
  <h2>Heading</h2>
  <p>Text</p>
</div>
```

Stage 3 — Void element:

```html
<img src="img.jpg" alt="Image" />
```

### TEST

Three questions:

1. What is an HTML element? (start tag + content + end tag)
2. Name two void elements. (`<img>`, `<br>`, `<hr>`, `<input>`)
3. Can elements be nested? (Yes)

**Checkpoint:** Write a div containing a heading and paragraph, open in browser.

## Common Mistakes

- Forgetting closing tags.
- Improper nesting (overlapping tags).
- Using uppercase tags (works but not standard).

## Try It Yourself

1. Create nested elements.
2. Add a void element (`<hr>`).
3. Inspect the DOM in DevTools.

## Summary

- Element = start tag + content + end tag.
- Void elements self-close.
- Elements nest.

## Next Step

Elements are clear. Next, attributes. Next: HTML 05 — Attributes.

---

**In Your Own Words**

1. What is an HTML element?

<details>
<summary>Sample Answer</summary>

**Answer:** A start tag, content, and an end tag (or a void element).

</details>

2. What is a void element?

<details>
<summary>Sample Answer</summary>

**Answer:** An element with no content/closing tag, like `<img>` or `<br>`.

</details>

3. Can HTML elements be nested?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes.

</details>

4. Are tag names case-sensitive?

<details>
<summary>Sample Answer</summary>

**Answer:** No, but lowercase is standard.

</details>

5. Give an example of a nested element.

<details>
<summary>Sample Answer</summary>

**Answer:** `<div><p>Text</p></div>`.

</details>

## What It Is NOT

- ❌ Void elements are **not** closed with `</tag>`.
- ❌ Overlapping tags are **not** valid.
- ❌ Tag names are **not** case-sensitive (but use lowercase).