# Doc HTML 21 — IDs

## Cheat Sheet (Quick Recall)

- `id="name"` unique identifier.
- One element per ID per page.
- CSS selector: `#name`.
- Used for anchors, JS selection, styling (rarely).

## Where We Are So Far

HTML 20 covered classes. Now IDs — unique identifiers.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: IDs.

## Main Content

### THINK

Classes are reusable; IDs are unique. IDs are for anchors, JS selection, and unique styling. First syntax, then usage, then difference from class.

### CONCEPT

```html
<h1 id="main-title">Title</h1>
```

```css
#main-title { color: blue; }
```

```js
document.getElementById("main-title");
```

- One element per ID per page.
- CSS selector `#name`.

### CODE (gradual)

Stage 1 — Assign ID:

```html
<h1 id="title">Hello</h1>
```

Stage 2 — CSS:

```css
#title { color: blue; }
```

Stage 3 — Anchor link:

```html
<a href="#title">Go to title</a>
```

### TEST

Three questions:

1. How to assign an ID? (`id="name"`)
2. How many elements can share an ID? (One per page)
3. CSS selector for ID? (`#name`)

**Checkpoint:** Create an element with ID, style it, and link to it.

## Common Mistakes

- Duplicate IDs.
- Using ID for reusable styling (use class).
- Typos in ID names.

## Try It Yourself

1. Add an ID to a heading.
2. Style it with `#id`.
3. Create an anchor link to it.

## Summary

- `id="name"` unique.
- CSS selector `#name`.
- Used for anchors, JS, unique styling.

## Next Step

IDs are clear. Next, iframes. Next: HTML 22 — Iframes.

---

**In Your Own Words**

1. How do you assign an ID?

<details>
<summary>Sample Answer</summary>

**Answer:** `id="name"`.

</details>

2. Can two elements share the same ID?

<details>
<summary>Sample Answer</summary>

**Answer:** No — one per page.

</details>

3. What is the CSS selector for an ID?

<details>
<summary>Sample Answer</summary>

**Answer:** `#name`.

</details>

4. What is a common use of IDs?

<details>
<summary>Sample Answer</summary>

**Answer:** Anchor links and JS selection.

</details>

5. Should IDs be used for reusable styling?

<details>
<summary>Sample Answer</summary>

**Answer:** No — use classes.

</details>

## What It Is NOT

- ❌ ID is **not** reusable.
- ❌ Duplicate IDs are **not** valid.
- ❌ ID is **not** for general styling.