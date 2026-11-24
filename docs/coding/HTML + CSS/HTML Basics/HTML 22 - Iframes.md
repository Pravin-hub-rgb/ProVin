# Doc HTML 22 — Iframes

## Cheat Sheet (Quick Recall)

- `<iframe src="url"></iframe>` embeds another page.
- Attributes: `width`, `height`, `title`, `loading="lazy"`.
- Use for maps, videos, external content.

## Where We Are So Far

HTML 21 covered IDs. Now iframes — embedding external content.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: iframes.

## Main Content

### THINK

Sometimes you need to embed another page (map, video, widget). Iframes do that. First basic iframe, then attributes, then security (sandbox).

### CONCEPT

```html
<iframe src="https://example.com" width="600" height="400" title="Example"></iframe>
```

- `src` — URL to embed.
- `title` — accessibility.
- `loading="lazy"` — defer loading.

**Sandbox (security):**

```html
<iframe src="..." sandbox="allow-scripts"></iframe>
```

### CODE (gradual)

Stage 1 — Basic iframe:

```html
<iframe src="https://example.com" width="600" height="400"></iframe>
```

Stage 2 — With title and lazy:

```html
<iframe src="https://example.com" title="Example" loading="lazy"></iframe>
```

Stage 3 — Sandbox:

```html
<iframe src="..." sandbox="allow-scripts allow-same-origin"></iframe>
```

### TEST

Three questions:

1. What tag embeds another page? (`<iframe>`)
2. What attribute sets the URL? (`src`)
3. What is `sandbox` for? (security restrictions)

**Checkpoint:** Embed a YouTube video or Google Map.

## Common Mistakes

- Missing `title` (accessibility).
- Embedding untrusted content without sandbox.
- Fixed dimensions breaking responsiveness.

## Try It Yourself

1. Embed a Google Map.
2. Embed a YouTube video.
3. Add `loading="lazy"`.

## Summary

- `<iframe src>` embeds external content.
- Use `title`, `loading`, `sandbox`.
- Common for maps, videos, widgets.

## Next Step

Iframes are clear. Next, JavaScript in HTML. Next: HTML 23 — JavaScript in HTML.

---

**In Your Own Words**

1. What tag embeds another HTML page?

<details>
<summary>Sample Answer</summary>

**Answer:** `<iframe>`.

</details>

2. What attribute sets the embedded URL?

<details>
<summary>Sample Answer</summary>

**Answer:** `src`.

</details>

3. Why use `title` on an iframe?

<details>
<summary>Sample Answer</summary>

**Answer:** Accessibility — describes the embedded content.

</details>

4. What does `sandbox` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Applies security restrictions to the embedded content.

</details>

5. What does `loading="lazy"` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Defers loading until the iframe is near the viewport.

</details>

## What It Is NOT

- ❌ iframe is **not** for same-page content.
- ❌ `sandbox` is **not** optional for untrusted content.
- ❌ iframe does **not** auto-resize.