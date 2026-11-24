# Doc HTML 23 — JavaScript in HTML

## Cheat Sheet (Quick Recall)

- `<script src="app.js"></script>` external.
- Inline: `<script>console.log("hi")</script>`.
- Place before `</body>` or use `defer`/`async`.
- `defer`: run after HTML parsed.
- `async`: run when ready (may block).

## Where We Are So Far

HTML 22 covered iframes. Now JavaScript in HTML — adding interactivity.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: adding JavaScript.

## Main Content

### THINK

HTML structures, CSS styles, JS adds interactivity. First external script, then inline, then placement (`defer`/`async`).

### CONCEPT

**External (preferred):**

```html
<script src="app.js" defer></script>
```

**Inline:**

```html
<script>
  console.log("Hello");
</script>
```

**Placement:**

- Before `</body>`: runs after HTML parsed.
- `defer`: runs after parse, in order.
- `async`: runs when ready, out of order.

### CODE (gradual)

Stage 1 — Inline:

```html
<script>
  alert("Hello");
</script>
```

Stage 2 — External:

```html
<script src="app.js" defer></script>
```

Stage 3 — Placement:

```html
<body>
  <!-- content -->
  <script src="app.js"></script>
</body>
```

### TEST

Three questions:

1. How to include an external JS file? (`<script src="...">`)
2. What does `defer` do? (runs after HTML parsed)
3. Where to place scripts without `defer`? (before `</body>`)

**Checkpoint:** Add a script that logs to console; verify.

## Common Mistakes

- Scripts in `<head>` without `defer` (blocks rendering).
- Missing `src` for external.
- Syntax errors blocking all JS.

## Try It Yourself

1. Add an inline script.
2. Add an external script with `defer`.
3. Check the console for errors.

## Summary

- `<script src>` external; inline for small snippets.
- `defer`/`async` control timing.
- Place scripts before `</body>` or use `defer`.

## Next Step

JavaScript in HTML is clear. Next, file paths. Next: HTML 24 — File Paths.

---

**In Your Own Words**

1. How to include an external JavaScript file?

<details>
<summary>Sample Answer</summary>

**Answer:** `<script src="app.js"></script>`.

</details>

2. What does `defer` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Runs the script after HTML is parsed, in order.

</details>

3. What does `async` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Runs the script as soon as it is ready, possibly out of order.

</details>

4. Where to place scripts without `defer`?

<details>
<summary>Sample Answer</summary>

**Answer:** Before `</body>`.

</details>

5. Where to see JS errors?

<details>
<summary>Sample Answer</summary>

**Answer:** Browser console (DevTools).

</details>

## What It Is NOT

- ❌ `async` is **not** the same as `defer`.
- ❌ Scripts in `<head>` without `defer` **block** rendering.
- ❌ Inline scripts are **not** preferred for large code.