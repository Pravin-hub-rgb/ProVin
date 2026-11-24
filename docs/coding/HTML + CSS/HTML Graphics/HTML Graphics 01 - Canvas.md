# Doc HTML Graphics 01 — Canvas

## Cheat Sheet (Quick Recall)

- `<canvas>` drawable region.
- Requires JavaScript to draw.
- `getContext("2d")` for 2D drawing.
- Use for charts, games, dynamic graphics.

## Where We Are So Far

HTML Forms complete. Now HTML Graphics — Canvas.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: Canvas.

## Main Content

### THINK

Canvas is a drawable bitmap area. HTML provides the element; JS draws on it. First basic canvas, then 2D context, then a simple shape.

### CONCEPT

```html
<canvas id="myCanvas" width="300" height="200"></canvas>
<script>
  const ctx = document.getElementById("myCanvas").getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(10, 10, 100, 50);
</script>
```

- `<canvas>` needs `width`/`height`.
- `getContext("2d")` returns drawing context.
- Draw shapes, text, images with JS.

### CODE (gradual)

Stage 1 — Empty canvas:

```html
<canvas width="300" height="200"></canvas>
```

Stage 2 — Draw rectangle:

```js
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 100, 50);
```

Stage 3 — Draw text:

```js
ctx.font = "20px Arial";
ctx.fillText("Hello", 10, 100);
```

### TEST

Three questions:

1. What tag creates a drawable area? (`<canvas>`)
2. How to get drawing context? (`getContext("2d")`)
3. Does canvas draw without JS? (No)

**Checkpoint:** Create a canvas and draw a rectangle.

## Common Mistakes

- Missing width/height (default 300x150).
- Drawing before canvas is in DOM.
- Not handling high-DPI displays.

## Try It Yourself

1. Draw a rectangle.
2. Draw a circle.
3. Draw text.

## Summary

- `<canvas>` + JS for drawing.
- `getContext("2d")` for 2D.
- Used for charts, games, graphics.

## Next Step

Canvas is clear. Next, SVG. Next: HTML Graphics 02 — SVG.

---

**In Your Own Words**

1. What is `<canvas>`?

<details>
<summary>Sample Answer</summary>

**Answer:** A drawable bitmap region controlled by JavaScript.

</details>

2. Does canvas require JavaScript?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes.

</details>

3. What does `getContext("2d")` return?

<details>
<summary>Sample Answer</summary>

**Answer:** A 2D drawing context.

</details>

4. What are default canvas dimensions?

<details>
<summary>Sample Answer</summary>

**Answer:** 300x150.

</details>

5. Name a use case for canvas.

<details>
<summary>Sample Answer</summary>

**Answer:** Charts, games, dynamic graphics.

</details>

## What It Is NOT

- ❌ Canvas is **not** vector — it is bitmap.
- ❌ Canvas does **not** draw without JS.
- ❌ Canvas is **not** accessible by default.