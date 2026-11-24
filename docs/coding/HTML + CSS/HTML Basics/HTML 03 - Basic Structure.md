# Doc HTML 03 — Basic Structure

## Cheat Sheet (Quick Recall)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
  </head>
  <body>
    <!-- content -->
  </body>
</html>
```

- `<!DOCTYPE html>`: HTML5 declaration.
- `<html>`: root element.
- `<head>`: metadata (not visible).
- `<body>`: visible content.

## Where We Are So Far

HTML 02 covered editors. Now the basic structure of an HTML document. Connection: editor is ready; now the document skeleton.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: the standard HTML5 document structure.

## Main Content

### THINK

Every HTML page follows the same skeleton. Without it, browsers may render inconsistently. First the skeleton, then what each part does.

### CONCEPT

- `<!DOCTYPE html>` — declares HTML5.
- `<html lang="en">` — root element; `lang` for accessibility/SEO.
- `<head>` — metadata: charset, viewport, title, links to CSS.
- `<body>` — all visible content.

### CODE (gradual)

Stage 1 — Minimal:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

Stage 2 — Add head:

```html
<head>
  <title>My Page</title>
</head>
```

Stage 3 — Full standard skeleton:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

### TEST

Three questions:

1. What does `<!DOCTYPE html>` declare? (HTML5)
2. What goes in `<head>`? (metadata)
3. What goes in `<body>`? (visible content)

**Checkpoint:** Create the full skeleton and open in browser.

## Common Mistakes

- Missing `charset` → encoding issues.
- Missing viewport meta → not responsive on mobile.
- Putting visible content in `<head>`.

## Try It Yourself

1. Create the full skeleton.
2. Add a paragraph in `<body>`.
3. Change the title and check the browser tab.

## Summary

- Standard HTML5 skeleton: doctype, html, head, body.
- head = metadata; body = visible content.

## Next Step

Basic structure is clear. Next, HTML elements. Next: HTML 04 — Elements.

---

**In Your Own Words**

1. What is the purpose of `<head>`?

<details>
<summary>Sample Answer</summary>

**Answer:** Holds metadata (title, charset, viewport, CSS links) not displayed on the page.

</details>

2. What is the purpose of `<body>`?

<details>
<summary>Sample Answer</summary>

**Answer:** Contains all visible page content.

</details>

3. What does the viewport meta tag do?

<details>
<summary>Sample Answer</summary>

**Answer:** Makes the page responsive on mobile devices.

</details>

4. What does `lang="en"` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Declares the page language for accessibility and SEO.

</details>

5. What charset is standard?

<details>
<summary>Sample Answer</summary>

**Answer:** UTF-8.

</details>

## What It Is NOT

- ❌ `<head>` is **not** visible content.
- ❌ `<body>` is **not** for metadata.
- ❌ Missing doctype is **not** harmless — triggers quirks mode.