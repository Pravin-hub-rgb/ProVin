# Doc HTML 14 — Links

## Cheat Sheet (Quick Recall)

- `<a href="url">text</a>` creates a link.
- `target="_blank"` opens in new tab.
- `rel="noopener noreferrer"` for security with `target="_blank"`.
- Anchor links: `<a href="#section">` jumps to `id="section"`.

## Where We Are So Far

HTML 13 covered CSS in HTML. Now links — connecting pages.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: hyperlinks.

## Main Content

### THINK

The web is built on links. Links connect pages and sections. First basic link, then opening in new tab, then anchor links, then email/phone links.

### CONCEPT

```html
<a href="https://example.com">Visit Example</a>
<a href="about.html">About</a>
<a href="#section1">Jump to Section</a>
<a href="mailto:email@example.com">Email</a>
<a href="tel:+1234567890">Call</a>
```

**Open in new tab:**

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Open</a>
```

**Anchor link:**

```html
<a href="#about">Go to About</a>
<h2 id="about">About</h2>
```

### CODE (gradual)

Stage 1 — Basic link:

```html
<a href="https://example.com">Example</a>
```

Stage 2 — New tab:

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Example</a>
```

Stage 3 — Anchor link:

```html
<a href="#contact">Contact</a>
<h2 id="contact">Contact</h2>
```

### TEST

Three questions:

1. What attribute sets the link destination? (`href`)
2. How to open in a new tab? (`target="_blank"`)
3. How to link to a section on the same page? (`href="#id"`)

**Checkpoint:** Create a page with external, internal, and anchor links; test all.

## Common Mistakes

- Missing `rel="noopener noreferrer"` with `target="_blank"`.
- Broken relative paths.
- Using `<a>` without `href`.

## Try It Yourself

1. Create an external link.
2. Create an anchor link to a section.
3. Add an email link.

## Summary

- `<a href="url">` creates links.
- `target="_blank"` + `rel="noopener noreferrer"` for new tab.
- Anchor links use `#id`.

## Next Step

Links are clear. Next, images. Next: HTML 15 — Images.

---

**In Your Own Words**

1. What attribute sets the link destination?

<details>
<summary>Sample Answer</summary>

**Answer:** `href`.

</details>

2. How to open a link in a new tab?

<details>
<summary>Sample Answer</summary>

**Answer:** `target="_blank"` (with `rel="noopener noreferrer"`).

</details>

3. How to create an anchor link?

<details>
<summary>Sample Answer</summary>

**Answer:** `href="#sectionId"` linking to an element with `id="sectionId"`.

</details>

4. How to create an email link?

<details>
<summary>Sample Answer</summary>

**Answer:** `<a href="mailto:email@example.com">`.

</details>

5. Why use `rel="noopener noreferrer"`?

<details>
<summary>Sample Answer</summary>

**Answer:** Security and performance when opening new tabs.

</details>

## What It Is NOT

- ❌ `<a>` without `href` is **not** a link.
- ❌ `target="_blank"` alone is **not** secure.
- ❌ Anchor links are **not** separate pages.