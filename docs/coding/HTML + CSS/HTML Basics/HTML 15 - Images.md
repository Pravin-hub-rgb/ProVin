# Doc HTML 15 — Images

## Cheat Sheet (Quick Recall)

- `<img src="path" alt="description" />`.
- `src` = image path/URL; `alt` = alternative text.
- `width`/`height` in HTML or CSS.
- Formats: JPEG, PNG, SVG, WebP, GIF.

## Where We Are So Far

HTML 14 covered links. Now images — embedding pictures.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: images.

## Main Content

### THINK

Links connect pages; images add visual content. First basic image, then alt text, then sizing, then formats.

### CONCEPT

```html
<img src="photo.jpg" alt="A photo" width="300" height="200" />
```

- `src` — path or URL.
- `alt` — description for accessibility/SEO.
- `width`/`height` — dimensions (CSS preferred for responsive).

**Formats:**

- JPEG: photos.
- PNG: transparency.
- SVG: vector (scalable).
- WebP: modern, small.
- GIF: animation.

### CODE (gradual)

Stage 1 — Basic image:

```html
<img src="photo.jpg" alt="Photo" />
```

Stage 2 — With dimensions:

```html
<img src="photo.jpg" alt="Photo" width="300" height="200" />
```

Stage 3 — Responsive via CSS:

```css
img { max-width: 100%; height: auto; }
```

### TEST

Three questions:

1. What tag embeds an image? (`<img>`)
2. What attribute provides alternative text? (`alt`)
3. What is a void element? (no closing tag)

**Checkpoint:** Add an image with `src` and `alt`, verify it displays.

## Common Mistakes

- Missing `alt` (accessibility/SEO).
- Wrong path → broken image icon.
- Fixed width/height breaking responsiveness.

## Try It Yourself

1. Add an image with alt text.
2. Make it responsive with CSS.
3. Use different formats (PNG, SVG).

## Summary

- `<img src alt />` embeds images.
- `alt` is essential.
- Use CSS for responsive sizing.

## Next Step

Images are clear. Next, favicon. Next: HTML 16 — Favicon.

---

**In Your Own Words**

1. What tag embeds an image?

<details>
<summary>Sample Answer</summary>

**Answer:** `<img>`.

</details>

2. What attribute provides alternative text?

<details>
<summary>Sample Answer</summary>

**Answer:** `alt`.

</details>

3. Is `<img>` a void element?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes — no closing tag.

</details>

4. Name two image formats.

<details>
<summary>Sample Answer</summary>

**Answer:** JPEG, PNG, SVG, WebP, GIF (any two).

</details>

5. How to make an image responsive?

<details>
<summary>Sample Answer</summary>

**Answer:** CSS: `max-width: 100%; height: auto;`.

</details>

## What It Is NOT

- ❌ `<img>` is **not** a container — it is void.
- ❌ `alt` is **not** optional for accessibility.
- ❌ Fixed dimensions are **not** responsive.