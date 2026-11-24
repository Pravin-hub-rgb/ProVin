# Doc HTML 25 — Head Element

## Cheat Sheet (Quick Recall)

- `<head>` holds metadata (not visible).
- `<title>`, `<meta>`, `<link>`, `<style>`, `<script>`.
- `charset`, `viewport`, `description`, `author`.
- Favicon link goes here.

## Where We Are So Far

HTML 24 covered file paths. Now the `<head>` element — metadata.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: the head element.

## Main Content

### THINK

The `<head>` contains metadata about the page (not displayed). It includes title, charset, viewport, CSS links, favicon. First what goes in `<head>`, then common meta tags.

### CONCEPT

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A short description" />
  <title>My Page</title>
  <link rel="stylesheet" href="styles.css" />
  <link rel="icon" href="favicon.png" />
</head>
```

- `<title>`: browser tab title.
- `charset`: character encoding.
- `viewport`: responsive scaling.
- `description`: SEO snippet.

### CODE (gradual)

Stage 1 — Minimal head:

```html
<head>
  <title>My Page</title>
</head>
```

Stage 2 — Add charset + viewport:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Page</title>
</head>
```

Stage 3 — Full head:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="My page description" />
  <title>My Page</title>
  <link rel="stylesheet" href="styles.css" />
</head>
```

### TEST

Three questions:

1. What goes in `<head>`? (metadata)
2. What is the `viewport` meta for? (responsive scaling)
3. Where does the page title go? (`<title>` in `<head>`)

**Checkpoint:** Add charset, viewport, title, description; verify in browser/SEO.

## Common Mistakes

- Putting visible content in `<head>`.
- Missing viewport meta (not mobile-friendly).
- Missing title (bad for SEO/tabs).

## Try It Yourself

1. Add charset and viewport.
2. Add a description meta.
3. Link a CSS file.

## Summary

- `<head>` holds metadata.
- Include charset, viewport, title, description, CSS link.

## Next Step

Head element is clear. Next, layout. Next: HTML 26 — Layout.

---

**In Your Own Words**

1. What is the purpose of `<head>`?

<details>
<summary>Sample Answer</summary>

**Answer:** Holds metadata about the page (not displayed).

</details>

2. What does the viewport meta tag do?

<details>
<summary>Sample Answer</summary>

**Answer:** Controls scaling on mobile devices.

</details>

3. What is the `charset` meta for?

<details>
<summary>Sample Answer</summary>

**Answer:** Declares character encoding (UTF-8).

</details>

4. Where does the page title go?

<details>
<summary>Sample Answer</summary>

**Answer:** In `<title>` inside `<head>`.

</details>

5. What is the `description` meta for?

<details>
<summary>Sample Answer</summary>

**Answer:** SEO snippet shown in search results.

</details>

## What It Is NOT

- ❌ `<head>` is **not** visible content.
- ❌ `<title>` is **not** a heading (`<h1>`).
- ❌ Missing viewport is **not** mobile-friendly.