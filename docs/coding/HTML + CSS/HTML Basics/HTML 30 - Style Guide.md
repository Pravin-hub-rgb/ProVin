# Doc HTML 30 — Style Guide

## Cheat Sheet (Quick Recall)

- Use lowercase tags and attributes.
- Quote attribute values.
- Indent consistently (2 spaces).
- Close all tags.
- Use semantic HTML.

## Where We Are So Far

HTML 29 covered semantic HTML. Now style guide — best practices for writing HTML.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: coding conventions.

## Main Content

### THINK

Consistent code is easier to read and maintain. A style guide defines conventions. First formatting, then naming, then best practices.

### CONCEPT

**Formatting:**

- Lowercase tags/attributes.
- Quote attribute values.
- Indent nested elements (2 spaces).
- Close all tags.

**Naming:**

- Use meaningful class/id names.
- kebab-case for classes: `main-content`.

**Best practices:**

- Semantic HTML.
- Alt text on images.
- One `<h1>` per page.
- Validate HTML.

### CODE (gradual)

Stage 1 — Poor style:

```html
<DIV CLASS='Main'><P>Hello</P></DIV>
```

Stage 2 — Good style:

```html
<div class="main">
  <p>Hello</p>
</div>
```

### TEST

Three questions:

1. What case for tags? (lowercase)
2. How to indent? (2 spaces)
3. Naming convention for classes? (kebab-case)

**Checkpoint:** Format a messy HTML file according to the style guide.

## Common Mistakes

- Inconsistent indentation.
- Uppercase tags.
- Unquoted attributes.

## Try It Yourself

1. Reformat a messy HTML file.
2. Validate with W3C validator.
3. Add alt text to all images.

## Summary

- Lowercase, quoted, indented, closed.
- kebab-case for classes.
- Semantic HTML + accessibility.

## Next Step

Style guide is clear. Next, HTML entities. Next: HTML 31 — HTML Entities.

---

**In Your Own Words**

1. What case should tags be?

<details>
<summary>Sample Answer</summary>

**Answer:** Lowercase.

</details>

2. How should attributes be quoted?

<details>
<summary>Sample Answer</summary>

**Answer:** Always with double quotes.

</details>

3. What indentation is standard?

<details>
<summary>Sample Answer</summary>

**Answer:** 2 spaces.

</details>

4. What naming convention for classes?

<details>
<summary>Sample Answer</summary>

**Answer:** kebab-case (e.g., `main-content`).

</details>

5. Should all tags be closed?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes.

</details>

## What It Is NOT

- ❌ Uppercase tags are **not** standard.
- ❌ Unquoted attributes are **not** recommended.
- ❌ Style guide is **not** optional for teams.