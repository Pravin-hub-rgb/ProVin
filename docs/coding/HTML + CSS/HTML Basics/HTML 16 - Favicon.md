# Doc HTML 16 — Favicon

## Cheat Sheet (Quick Recall)

- Favicon = small icon in browser tab.
- `<link rel="icon" href="favicon.ico" />` in `<head>`.
- Formats: `.ico`, `.png`, `.svg`.
- Place in root or `assets/`.

## Where We Are So Far

HTML 15 covered images. Now favicon — the small tab icon.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: favicon.

## Main Content

### THINK

Images are embedded. Now the small icon in the browser tab — the favicon. First link it in `<head>`, then formats, then multiple sizes.

### CONCEPT

```html
<head>
  <link rel="icon" type="image/png" href="favicon.png" />
</head>
```

- `.ico` (legacy), `.png`, `.svg` (modern).
- Place in root or an `assets/` folder.
- Multiple sizes for different devices.

### CODE (gradual)

Stage 1 — Basic favicon:

```html
<link rel="icon" href="favicon.ico" />
```

Stage 2 — PNG with type:

```html
<link rel="icon" type="image/png" href="favicon.png" />
```

Stage 3 — SVG (modern):

```html
<link rel="icon" type="image/svg+xml" href="favicon.svg" />
```

### TEST

Three questions:

1. What is a favicon? (tab icon)
2. Where to link it? (in `<head>`)
3. Name two favicon formats. (`.ico`, `.png`, `.svg`)

**Checkpoint:** Add a favicon and verify it appears in the browser tab.

## Common Mistakes

- Wrong path → default icon shows.
- Missing `rel="icon"`.
- Only providing one size.

## Try It Yourself

1. Add a favicon to your page.
2. Use a PNG favicon.
3. Try an SVG favicon.

## Summary

- Favicon = small tab icon.
- Linked in `<head>` via `<link rel="icon">`.
- Formats: `.ico`, `.png`, `.svg`.

## Next Step

Favicon is clear. Next, tables. Next: HTML 17 — Tables.

---

**In Your Own Words**

1. What is a favicon?

<details>
<summary>Sample Answer</summary>

**Answer:** A small icon displayed in the browser tab.

</details>

2. Where is the favicon linked?

<details>
<summary>Sample Answer</summary>

**Answer:** In the `<head>` via `<link rel="icon" />`.

</details>

3. Name two favicon formats.

<details>
<summary>Sample Answer</summary>

**Answer:** `.ico`, `.png`, `.svg` (any two).

</details>

4. What attribute specifies the icon type?

<details>
<summary>Sample Answer</summary>

**Answer:** `type` (e.g., `image/png`).

</details>

5. Where should the favicon file be placed?

<details>
<summary>Sample Answer</summary>

**Answer:** In the project root or an assets folder.

</details>

## What It Is NOT

- ❌ Favicon is **not** the page logo (different sizes).
- ❌ `.ico` is **not** the only format.
- ❌ Missing favicon is **not** an error — default shows.