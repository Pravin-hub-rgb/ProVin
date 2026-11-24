# Doc HTML 27 — Responsive Design

## Cheat Sheet (Quick Recall)

- Responsive = adapts to screen size.
- Viewport meta tag essential.
- Fluid layouts: `%`, `vw`/`vh`, `flex`.
- Media queries for breakpoints (CSS).
- Mobile-first approach.

## Where We Are So Far

HTML 26 covered layout. Now responsive design — adapting to screen size.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: responsive design basics.

## Main Content

### THINK

Users view pages on phones, tablets, desktops. The page must adapt. HTML provides the viewport meta; CSS provides media queries and fluid units. First viewport, then fluid units, then media queries (CSS).

### CONCEPT

**Viewport meta (HTML):**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**Fluid units:**

- `%`: relative to parent.
- `vw`/`vh`: relative to viewport.
- `rem`/`em`: relative to font size.

**Media queries (CSS):**

```css
@media (max-width: 600px) {
  body { font-size: 14px; }
}
```

**Mobile-first:**

Design for small screens first, then enhance for larger.

### CODE (gradual)

Stage 1 — Viewport meta:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Stage 2 — Fluid image:

```css
img { max-width: 100%; height: auto; }
```

Stage 3 — Media query:

```css
@media (max-width: 600px) {
  .container { flex-direction: column; }
}
```

### TEST

Three questions:

1. What meta tag enables responsive scaling? (viewport)
2. What CSS feature adapts styles by screen size? (media queries)
3. What is mobile-first? (design for small screens first)

**Checkpoint:** Add viewport meta and a media query; test by resizing the browser.

## Common Mistakes

- Missing viewport meta → not responsive on mobile.
- Fixed pixel widths → overflow on small screens.
- Desktop-first (harder to adapt down).

## Try It Yourself

1. Add the viewport meta.
2. Make an image fluid.
3. Add a media query for mobile.

## Summary

- Viewport meta essential.
- Fluid units (`%`, `vw`/`vh`) + media queries.
- Mobile-first approach.

## Next Step

Responsive design is clear. Next, computer code elements. Next: HTML 28 — Computer Code Elements.

---

**In Your Own Words**

1. What does the viewport meta tag do?

<details>
<summary>Sample Answer</summary>

**Answer:** Controls page scaling on mobile devices.

</details>

2. What are media queries used for?

<details>
<summary>Sample Answer</summary>

**Answer:** Applying CSS based on screen size/conditions.

</details>

3. What is mobile-first design?

<details>
<summary>Sample Answer</summary>

**Answer:** Designing for small screens first, then enhancing for larger.

</details>

4. Name two fluid units.

<details>
<summary>Sample Answer</summary>

**Answer:** `%`, `vw`, `vh`, `rem` (any two).

</details>

5. Why avoid fixed pixel widths?

<details>
<summary>Sample Answer</summary>

**Answer:** They cause overflow on small screens.

</details>

## What It Is NOT

- ❌ Missing viewport is **not** mobile-friendly.
- ❌ Fixed widths are **not** responsive.
- ❌ Media queries are **not** HTML — they are CSS.