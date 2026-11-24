# Doc HTML 31 — HTML Entities

## Cheat Sheet (Quick Recall)

- Entities: `&lt;`, `&gt;`, `&amp;`, `&nbsp;`, `&copy;`.
- Used for reserved characters and special symbols.
- Format: `&name;` or `&#number;`.

## Where We Are So Far

HTML 30 covered style guide. Now HTML entities — special characters.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: entities.

## Main Content

### THINK

Some characters are reserved in HTML (`<`, `>`, `&`). To display them, use entities. Also entities for symbols (©, ®, etc.). First reserved chars, then common symbols.

### CONCEPT

```html
&lt;   <!-- < -->
&gt;   <!-- > -->
&amp;  <!-- & -->
&nbsp; <!-- non-breaking space -->
&copy; <!-- © -->
&reg;  <!-- ® -->
```

- Named: `&name;`.
- Numeric: `&#169;` or `&#xA9;`.

### CODE (gradual)

Stage 1 — Reserved char:

```html
<p>5 &lt; 10</p>
```

Stage 2 — Non-breaking space:

```html
<p>Hello&nbsp;World</p>
```

Stage 3 — Symbol:

```html
<p>&copy; 2026</p>
```

### TEST

Three questions:

1. Entity for `<`? (`&lt;`)
2. Entity for `&`? (`&amp;`)
3. What is `&nbsp;`? (non-breaking space)

**Checkpoint:** Display `<`, `>`, `&`, and `©` using entities.

## Common Mistakes

- Forgetting the semicolon.
- Using `<` directly in text (breaks parsing).
- Confusing named vs numeric.

## Try It Yourself

1. Display "5 < 10" using entities.
2. Add a copyright symbol.
3. Use `&nbsp;` to prevent line break.

## Summary

- Entities for reserved chars and symbols.
- Format `&name;` or `&#number;`.
- Always include semicolon.

## Next Step

Entities are clear. Next, symbols. Next: HTML 32 — Symbols.

---

**In Your Own Words**

1. What is an HTML entity?

<details>
<summary>Sample Answer</summary>

**Answer:** A code representing a reserved character or symbol (e.g., `&lt;`).

</details>

2. Entity for `<`?

<details>
<summary>Sample Answer</summary>

**Answer:** `&lt;`.

</details>

3. What is `&nbsp;`?

<details>
<summary>Sample Answer</summary>

**Answer:** Non-breaking space.

</details>

4. What is the entity for copyright?

<details>
<summary>Sample Answer</summary>

**Answer:** `&copy;`.

</details>

5. Are entities case-sensitive?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes (use lowercase).

</details>

## What It Is NOT

- ❌ Entities are **not** optional for reserved chars.
- ❌ Missing semicolon is **not** valid.
- ❌ `&` alone is **not** safe in text.