# Doc HTML 05 — Attributes

## Cheat Sheet (Quick Recall)

- Attributes provide extra info about an element.
- Syntax: `name="value"`.
- Common: `href`, `src`, `alt`, `class`, `id`, `title`, `style`.
- Always quote attribute values.

## Where We Are So Far

HTML 04 covered elements. Now attributes — extra information on elements.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: attributes.

## Main Content

### THINK

Elements alone are not enough; they need extra info (where a link points, what an image shows). Attributes provide that. First syntax, then common attributes, then boolean attributes.

### CONCEPT

**Syntax:**

```html
<tag attribute="value">content</tag>
```

**Common attributes:**

- `href` — link destination.
- `src` — image/source path.
- `alt` — alternative text.
- `class` — CSS class.
- `id` — unique identifier.
- `title` — tooltip.
- `style` — inline CSS.

```html
<a href="https://example.com" title="Visit">Link</a>
<img src="photo.jpg" alt="A photo" />
```

**Boolean attributes:**

```html
<input type="checkbox" checked disabled />
```

### CODE (gradual)

Stage 1 — Single attribute:

```html
<a href="https://example.com">Link</a>
```

Stage 2 — Multiple attributes:

```html
<img src="photo.jpg" alt="Photo" width="200" />
```

Stage 3 — Boolean:

```html
<input type="text" required disabled />
```

### TEST

Three questions:

1. What is an attribute? (extra info on an element)
2. How is an attribute written? (`name="value"`)
3. Name three common attributes. (`href`, `src`, `alt`, `class`, `id`)

**Checkpoint:** Create an image with `src` and `alt`, and a link with `href`.

## Common Mistakes

- Unquoted attribute values.
- Missing `alt` on images.
- Duplicate `id` values.

## Try It Yourself

1. Add `title` to a link.
2. Add `class` and `id` to a div.
3. Use a boolean attribute (`disabled`).

## Summary

- Attributes add extra info: `name="value"`.
- Common: href, src, alt, class, id, title, style.
- Boolean attributes need no value.

## Next Step

Attributes are clear. Next, headings. Next: HTML 06 — Headings.

---

**In Your Own Words**

1. What is an HTML attribute?

<details>
<summary>Sample Answer</summary>

**Answer:** Extra information about an element, written as `name="value"`.

</details>

2. How do you write an attribute?

<details>
<summary>Sample Answer</summary>

**Answer:** Inside the start tag: `<tag name="value">`.

</details>

3. Name three common attributes.

<details>
<summary>Sample Answer</summary>

**Answer:** `href`, `src`, `alt` (also `class`, `id`).

</details>

4. What is a boolean attribute?

<details>
<summary>Sample Answer</summary>

**Answer:** An attribute that needs no value, like `disabled` or `checked`.

</details>

5. Why is `alt` important on images?

<details>
<summary>Sample Answer</summary>

**Answer:** Accessibility and SEO; shown if image fails to load.

</details>

## What It Is NOT

- ❌ Attributes are **not** content — they describe elements.
- ❌ Unquoted values are **not** recommended.
- ❌ `id` is **not** reusable — must be unique.