# Doc CSS 30 — Pseudo-elements

## Cheat Sheet (Quick Recall)

- `::before`, `::after`: insert content before/after element.
- `::first-line`, `::first-letter`: style first line/letter.
- `::selection`: style selected text.
- `content` property required for `::before`/`::after`.

## Where We Are So Far

CSS 29 covered pseudo-classes. Now pseudo-elements — styling parts of elements.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: pseudo-elements.

## Main Content

### THINK

Pseudo-elements style parts of an element or insert content. First `::before`/`::after` (insert content), then `::first-line`/`::first-letter`, then `::selection`.

### CONCEPT

```css
p::before { content: "→ "; }
p::after { content: " ←"; }
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }
::selection { background: yellow; }
```

- `::before`/`::after`: insert content (requires `content`).
- `::first-line`: style first line.
- `::first-letter`: style first letter (drop cap).
- `::selection`: style selected text.

### CODE (gradual)

Stage 1 — ::before:

```css
p::before { content: "→ "; }
```

Stage 2 — ::first-letter:

```css
p::first-letter { font-size: 2em; }
```

Stage 3 — ::selection:

```css
::selection { background: yellow; color: black; }
```

### TEST

Three questions:

1. What property is required for `::before`/`::after`? (`content`)
2. Which pseudo-element styles the first letter? (`::first-letter`)
3. Which styles selected text? (`::selection`)

**Checkpoint:** Create a drop cap with `::first-letter`.

## Common Mistakes

- Forgetting `content` on `::before`/`::after`.
- Using `:` instead of `::` (works but deprecated).
- Overusing pseudo-elements.

## Try It Yourself

1. Add a prefix with `::before`.
2. Create a drop cap.
3. Style selected text.

## Summary

- `::before`, `::after` (need `content`).
- `::first-line`, `::first-letter`, `::selection`.

## Next Step

Pseudo-elements are clear. Next, opacity. Next: CSS 31 — Opacity.

---

**In Your Own Words**

1. What property is required for `::before`/`::after`?

<details>
<summary>Sample Answer</summary>

**Answer:** `content`.

</details>

2. Which pseudo-element styles the first letter?

<details>
<summary>Sample Answer</summary>

**Answer:** `::first-letter`.

</details>

3. Which styles selected text?

<details>
<summary>Sample Answer</summary>

**Answer:** `::selection`.

</details>

4. Difference between `:` and `::`?

<details>
<summary>Sample Answer</summary>

**Answer:** `:` for pseudo-classes, `::` for pseudo-elements (modern).

</details>

5. What is a drop cap?

<details>
<summary>Sample Answer</summary>

**Answer:** A large first letter (using `::first-letter`).

</details>

## What It Is NOT

- ❌ `::before` without `content` is **invisible**.
- ❌ Pseudo-element is **not** pseudo-class.
- ❌ `::selection` is **not** all browsers (limited).