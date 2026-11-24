# Doc HTML 11 — Comments

## Cheat Sheet (Quick Recall)

- HTML comments: `<!-- comment -->`.
- Not displayed in browser.
- Useful for notes, debugging, temporarily disabling code.

## Where We Are So Far

HTML 10 covered quotations. Now comments — notes in HTML.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: comments.

## Main Content

### THINK

Code needs notes and temporarily disabled sections. HTML comments provide that. They are not rendered in the browser.

### CONCEPT

```html
<!-- This is a comment -->
<p>Hello</p>
<!-- <p>This is disabled</p> -->
```

- Comments can span multiple lines.
- They are visible in "View Source" but not on the page.

### CODE (gradual)

Stage 1 — Single-line comment:

```html
<!-- TODO: add image -->
```

Stage 2 — Multi-line:

```html
<!--
  This section is
  under construction
-->
```

Stage 3 — Disable code:

```html
<!-- <p>Hidden paragraph</p> -->
```

### TEST

Three questions:

1. Comment syntax in HTML? (`<!-- -->`)
2. Are comments displayed? (No)
3. Can comments span multiple lines? (Yes)

**Checkpoint:** Add a comment and a disabled paragraph, view source.

## Common Mistakes

- Forgetting the closing `-->`.
- Nesting comments (not allowed).
- Leaving sensitive info in comments.

## Try It Yourself

1. Add a single-line comment.
2. Disable a block of HTML.
3. View page source to see comments.

## Summary

- `<!-- comment -->` syntax.
- Not rendered; visible in source.
- Use for notes/debugging.

## Next Step

Comments are clear. Next, colors. Next: HTML 12 — Colors.

---

**In Your Own Words**

1. What is the HTML comment syntax?

<details>
<summary>Sample Answer</summary>

**Answer:** `<!-- comment -->`.

</details>

2. Are HTML comments displayed in the browser?

<details>
<summary>Sample Answer</summary>

**Answer:** No.

</details>

3. Can comments span multiple lines?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes.

</details>

4. Can you nest HTML comments?

<details>
<summary>Sample Answer</summary>

**Answer:** No.

</details>

5. Where can you see HTML comments?

<details>
<summary>Sample Answer</summary>

**Answer:** In "View Page Source".

</details>

## What It Is NOT

- ❌ Comments are **not** rendered.
- ❌ Nested comments are **not** allowed.
- ❌ Comments are **not** secure — visible in source.