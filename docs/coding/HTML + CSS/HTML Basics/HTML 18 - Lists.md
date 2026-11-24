# Doc HTML 18 — Lists

## Cheat Sheet (Quick Recall)

- `<ul>` unordered (bullets), `<ol>` ordered (numbers).
- `<li>` list item.
- `<dl>` definition list: `<dt>` term, `<dd>` description.
- Nested lists allowed.

## Where We Are So Far

HTML 17 covered tables. Now lists — ordered and unordered.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: lists.

## Main Content

### THINK

Lists are everywhere: menus, steps, glossaries. HTML has unordered (bullets), ordered (numbers), and definition lists. First basic, then nested, then definition lists.

### CONCEPT

**Unordered:**

```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
</ul>
```

**Ordered:**

```html
<ol>
  <li>First</li>
  <li>Second</li>
</ol>
```

**Definition list:**

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
</dl>
```

**Nested:**

```html
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
    </ul>
  </li>
</ul>
```

### CODE (gradual)

Stage 1 — Unordered:

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

Stage 2 — Ordered:

```html
<ol>
  <li>Step 1</li>
  <li>Step 2</li>
</ol>
```

Stage 3 — Nested:

```html
<ul>
  <li>Parent
    <ul><li>Child</li></ul>
  </li>
</ul>
```

### TEST

Three questions:

1. Tag for unordered list? (`<ul>`)
2. Tag for ordered list? (`<ol>`)
3. Tag for list item? (`<li>`)

**Checkpoint:** Create a nested list and verify.

## Common Mistakes

- Putting `<li>` outside `<ul>`/`<ol>`.
- Using lists for layout.
- Wrong nesting.

## Try It Yourself

1. Create an ordered list of steps.
2. Create a nested unordered list.
3. Create a definition list.

## Summary

- `<ul>` bullets, `<ol>` numbers, `<li>` items.
- `<dl>`/`<dt>`/`<dd>` for definitions.
- Lists can nest.

## Next Step

Lists are clear. Next, block and inline elements. Next: HTML 19 — Block and Inline Elements.

---

**In Your Own Words**

1. What tag creates an unordered list?

<details>
<summary>Sample Answer</summary>

**Answer:** `<ul>`.

</details>

2. What tag creates an ordered list?

<details>
<summary>Sample Answer</summary>

**Answer:** `<ol>`.

</details>

3. What tag is a list item?

<details>
<summary>Sample Answer</summary>

**Answer:** `<li>`.

</details>

4. What tags make a definition list?

<details>
<summary>Sample Answer</summary>

**Answer:** `<dl>`, `<dt>`, `<dd>`.

</details>

5. Can lists be nested?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes.

</details>

## What It Is NOT

- ❌ `<li>` is **not** valid outside a list.
- ❌ Lists are **not** for layout — use CSS.
- ❌ `<ul>` is **not** numbered.