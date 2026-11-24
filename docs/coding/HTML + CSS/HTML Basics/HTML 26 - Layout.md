# Doc HTML 26 — Layout

## Cheat Sheet (Quick Recall)

- Layout = arranging elements on the page.
- Semantic layout: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
- CSS handles visual layout (flexbox/grid).
- HTML provides the structure.

## Where We Are So Far

HTML 25 covered the head element. Now layout — arranging content.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: page layout with semantic elements.

## Main Content

### THINK

A page has regions: header, nav, main content, sidebar, footer. HTML5 semantic tags describe these. CSS handles the visual arrangement. First semantic structure, then CSS layout (flexbox/grid) later.

### CONCEPT

```html
<header>...</header>
<nav>...</nav>
<main>
  <article>...</article>
  <aside>...</aside>
</main>
<footer>...</footer>
```

- `<header>`: top bar/logo.
- `<nav>`: navigation links.
- `<main>`: primary content.
- `<article>`: self-contained content.
- `<aside>`: sidebar.
- `<footer>`: bottom info.

### CODE (gradual)

Stage 1 — Basic structure:

```html
<header>Header</header>
<main>Main content</main>
<footer>Footer</footer>
```

Stage 2 — With nav and aside:

```html
<header>Header</header>
<nav>Nav</nav>
<main>
  <article>Article</article>
  <aside>Sidebar</aside>
</main>
<footer>Footer</footer>
```

Stage 3 — CSS layout (flexbox):

```css
main { display: flex; }
article { flex: 2; }
aside { flex: 1; }
```

### TEST

Three questions:

1. What tag for primary content? (`<main>`)
2. What tag for navigation? (`<nav>`)
3. Who handles visual layout? (CSS)

**Checkpoint:** Create a semantic page structure and view in browser.

## Common Mistakes

- Using `<div>` for everything (less semantic).
- Multiple `<main>` elements.
- Putting `<header>` inside `<main>`.

## Try It Yourself

1. Build a page with header/nav/main/footer.
2. Add an article and aside.
3. Style with flexbox.

## Summary

- Semantic layout tags: header, nav, main, article, aside, footer.
- HTML = structure; CSS = visual layout.

## Next Step

Layout is clear. Next, responsive design. Next: HTML 27 — Responsive Design.

---

**In Your Own Words**

1. What tag wraps the primary content?

<details>
<summary>Sample Answer</summary>

**Answer:** `<main>`.

</details>

2. What tag is for navigation links?

<details>
<summary>Sample Answer</summary>

**Answer:** `<nav>`.

</details>

3. What tag is for a sidebar?

<details>
<summary>Sample Answer</summary>

**Answer:** `<aside>`.

</details>

4. What tag is for the page footer?

<details>
<summary>Sample Answer</summary>

**Answer:** `<footer>`.

</details>

5. Who handles visual layout?

<details>
<summary>Sample Answer</summary>

**Answer:** CSS (flexbox/grid).

</details>

## What It Is NOT

- ❌ `<div>` is **not** semantic.
- ❌ Multiple `<main>` are **not** allowed.
- ❌ HTML does **not** handle visual layout.