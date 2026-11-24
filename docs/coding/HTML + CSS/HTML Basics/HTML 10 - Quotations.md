# Doc HTML 10 — Quotations

## Cheat Sheet (Quick Recall)

- `<q>` short inline quote.
- `<blockquote>` long block quote.
- `<abbr>` abbreviation with `title`.
- `<cite>` title of a work.
- `<address>` contact info.

## Where We Are So Far

HTML 09 covered formatting. Now quotations — marking quoted text.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: quotation elements.

## Main Content

### THINK

Text sometimes quotes other sources. HTML has tags for short quotes, long quotes, abbreviations, citations, and addresses. First short quote, then block quote, then others.

### CONCEPT

```html
<p>He said <q>Hello</q>.</p>

<blockquote>
  This is a longer quotation from another source.
</blockquote>

<p><abbr title="HyperText Markup Language">HTML</abbr></p>
<p><cite>The Great Gatsby</cite> is a novel.</p>
<address>Contact: email@example.com</address>
```

### CODE (gradual)

Stage 1 — Short quote:

```html
<p>She said <q>Hi</q>.</p>
```

Stage 2 — Block quote:

```html
<blockquote>A longer quote from a book.</blockquote>
```

Stage 3 — Abbreviation + cite:

```html
<p><abbr title="Cascading Style Sheets">CSS</abbr></p>
<p><cite>Book Title</cite></p>
```

### TEST

Three questions:

1. Tag for short inline quote? (`<q>`)
2. Tag for long block quote? (`<blockquote>`)
3. How to show full form of abbreviation? (`<abbr title="...">`)

**Checkpoint:** Create a page with a short quote and a blockquote.

## Common Mistakes

- Using `<q>` for long quotes (use `<blockquote>`).
- Forgetting `title` on `<abbr>`.
- Misusing `<cite>`.

## Try It Yourself

1. Add a short quote and blockquote.
2. Add an abbreviation with title.
3. Add a citation.

## Summary

- `<q>` short, `<blockquote>` long.
- `<abbr title>`, `<cite>`, `<address>`.

## Next Step

Quotations are clear. Next, comments. Next: HTML 11 — Comments.

---

**In Your Own Words**

1. What tag is used for a short inline quote?

<details>
<summary>Sample Answer</summary>

**Answer:** `<q>`.

</details>

2. What tag is used for a long block quote?

<details>
<summary>Sample Answer</summary>

**Answer:** `<blockquote>`.

</details>

3. How do you show the full form of an abbreviation?

<details>
<summary>Sample Answer</summary>

**Answer:** `<abbr title="Full Form">ABBR</abbr>`.

</details>

4. What is `<cite>` used for?

<details>
<summary>Sample Answer</summary>

**Answer:** The title of a work (book, article, etc.).

</details>

5. What is `<address>` used for?

<details>
<summary>Sample Answer</summary>

**Answer:** Contact information.

</details>

## What It Is NOT

- ❌ `<q>` is **not** for long quotes.
- ❌ `<abbr>` without `title` is **not** helpful.
- ❌ `<cite>` is **not** for quoting text — use `<q>`/`<blockquote>`.