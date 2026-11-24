# Doc HTML 28 — Computer Code Elements

## Cheat Sheet (Quick Recall)

- `<code>`: inline code.
- `<pre>`: preformatted (preserves whitespace).
- `<kbd>`: keyboard input.
- `<samp>`: sample output.
- `<var>`: variable.

## Where We Are So Far

HTML 27 covered responsive design. Now computer code elements — displaying code.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: code elements.

## Main Content

### THINK

Sometimes you need to display code, keyboard input, or sample output on a page. HTML has tags for these. First inline code, then preformatted blocks, then others.

### CONCEPT

```html
<code>console.log("hi")</code>
<pre>
  function hello() {
    return "hi";
  }
</pre>
<kbd>Ctrl+C</kbd>
<samp>Error: not found</samp>
<var>x</var>
```

- `<code>`: inline code.
- `<pre>`: preserves whitespace and line breaks.
- `<kbd>`: keyboard input.
- `<samp>`: sample output.
- `<var>`: variable.

### CODE (gradual)

Stage 1 — Inline code:

```html
<p>Use <code>console.log()</code> to debug.</p>
```

Stage 2 — Preformatted block:

```html
<pre>
function hello() {
  return "hi";
}
</pre>
```

Stage 3 — Combine:

```html
<pre><code>
const x = 5;
</code></pre>
```

### TEST

Three questions:

1. Tag for inline code? (`<code>`)
2. Tag that preserves whitespace? (`<pre>`)
3. Tag for keyboard input? (`<kbd>`)

**Checkpoint:** Create a page displaying a code block with `<pre><code>`.

## Common Mistakes

- Using `<pre>` for layout (use CSS).
- Not escaping HTML inside code (`<` → `&lt;`).
- Forgetting `<code>` inside `<pre>`.

## Try It Yourself

1. Display inline code.
2. Display a multi-line code block.
3. Show keyboard shortcut with `<kbd>`.

## Summary

- `<code>` inline, `<pre>` preformatted.
- `<kbd>`, `<samp>`, `<var>` for code-related text.
- Escape HTML entities inside code.

## Next Step

Code elements are clear. Next, semantic HTML. Next: HTML 29 — Semantic HTML.

---

**In Your Own Words**

1. What is `<code>` used for?

<details>
<summary>Sample Answer</summary>

**Answer:** Inline code.

</details>

2. What is `<pre>` used for?

<details>
<summary>Sample Answer</summary>

**Answer:** Preformatted text (preserves whitespace/line breaks).

</details>

3. What is `<kbd>` used for?

<details>
<summary>Sample Answer</summary>

**Answer:** Keyboard input.

</details>

4. What is `<samp>` used for?

<details>
<summary>Sample Answer</summary>

**Answer:** Sample output from a program.

</details>

5. What is `<var>` used for?

<details>
<summary>Sample Answer</summary>

**Answer:** A variable.

</details>

## What It Is NOT

- ❌ `<pre>` is **not** for layout.
- ❌ Code inside `<code>` is **not** auto-highlighted.
- ❌ HTML inside code must be **escaped**.