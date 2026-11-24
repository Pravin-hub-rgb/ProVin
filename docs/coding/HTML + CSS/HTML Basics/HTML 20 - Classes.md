# Doc HTML 20 — Classes

## Cheat Sheet (Quick Recall)

- `class="name"` assigns a CSS class.
- Multiple classes: `class="a b"`.
- Reusable across many elements.
- CSS selector: `.name`.

## Where We Are So Far

HTML 19 covered block/inline. Now classes — reusable styling hooks.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: classes.

## Main Content

### THINK

Elements need styling hooks. Classes are reusable labels. First syntax, then multiple classes, then CSS usage.

### CONCEPT

```html
<p class="intro">Hello</p>
<p class="intro highlight">World</p>
```

```css
.intro { color: blue; }
.highlight { background: yellow; }
```

- Class names are case-sensitive.
- Multiple classes separated by spaces.

### CODE (gradual)

Stage 1 — Single class:

```html
<p class="intro">Hello</p>
```

Stage 2 — Multiple classes:

```html
<p class="intro highlight">Hello</p>
```

Stage 3 — CSS:

```css
.intro { font-size: 18px; }
.highlight { background: yellow; }
```

### TEST

Three questions:

1. How to assign a class? (`class="name"`)
2. How to apply multiple classes? (space-separated)
3. CSS selector for a class? (`.name`)

**Checkpoint:** Create elements with classes and style them.

## Common Mistakes

- Using `id` when `class` is needed (reusability).
- Typos in class names.
- Case sensitivity.

## Try It Yourself

1. Add a class to a paragraph.
2. Add two classes to one element.
3. Style them in CSS.

## Summary

- `class="name"` reusable hook.
- Multiple classes space-separated.
- CSS selector `.name`.

## Next Step

Classes are clear. Next, IDs. Next: HTML 21 — IDs.

---

**In Your Own Words**

1. How do you assign a class?

<details>
<summary>Sample Answer</summary>

**Answer:** `class="name"`.

</details>

2. How to apply multiple classes?

<details>
<summary>Sample Answer</summary>

**Answer:** Space-separated: `class="a b"`.

</details>

3. What is the CSS selector for a class?

<details>
<summary>Sample Answer</summary>

**Answer:** `.name`.

</details>

4. Can multiple elements share a class?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes.

</details>

5. Are class names case-sensitive?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes.

</details>

## What It Is NOT

- ❌ Class is **not** unique — ID is.
- ❌ Class names are **not** case-insensitive.
- ❌ Multiple classes are **not** comma-separated.