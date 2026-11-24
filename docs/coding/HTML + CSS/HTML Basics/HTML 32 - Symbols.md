# Doc HTML 32 — Symbols

## Cheat Sheet (Quick Recall)

- Math: `&plus;`, `&minus;`, `&times;`, `&divide;`, `&radic;`.
- Currency: `&euro;`, `&pound;`, `&yen;`, `&cent;`.
- Arrows: `&larr;`, `&rarr;`, `&uarr;`, `&darr;`.
- Use entities for reliable display.

## Where We Are So Far

HTML 31 covered entities. Now symbols — math, currency, arrows.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: symbols.

## Main Content

### THINK

Beyond reserved characters, HTML has entities for symbols: math, currency, arrows. First common ones, then how to find more.

### CONCEPT

```html
&plus; &minus; &times; &divide; &radic;
&euro; &pound; &yen; &cent;
&larr; &rarr; &uarr; &darr;
```

- Use entity names for reliability.
- Numeric codes also work.

### CODE (gradual)

Stage 1 — Math:

```html
<p>5 &times; 3 = 15</p>
```

Stage 2 — Currency:

```html
<p>Price: &euro;50</p>
```

Stage 3 — Arrows:

```html
<p>&rarr; Next</p>
```

### TEST

Three questions:

1. Entity for multiplication? (`&times;`)
2. Entity for euro? (`&euro;`)
3. Entity for right arrow? (`&rarr;`)

**Checkpoint:** Display math, currency, and arrow symbols.

## Common Mistakes

- Forgetting semicolon.
- Using wrong entity name.
- Assuming all symbols have named entities (use numeric).

## Try It Yourself

1. Display a math expression.
2. Display a price in euros.
3. Add arrow navigation.

## Summary

- Entities for math, currency, arrows.
- Named or numeric.
- Reliable across browsers.

## Next Step

Symbols are clear. Next, emojis. Next: HTML 33 — Emojis.

---

**In Your Own Words**

1. Entity for multiplication?

<details>
<summary>Sample Answer</summary>

**Answer:** `&times;`.

</details>

2. Entity for euro?

<details>
<summary>Sample Answer</summary>

**Answer:** `&euro;`.

</details>

3. Entity for right arrow?

<details>
<summary>Sample Answer</summary>

**Answer:** `&rarr;`.

</details>

4. Can you use numeric codes for symbols?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes (`&#number;`).

</details>

5. Why use entities instead of typing symbols?

<details>
<summary>Sample Answer</summary>

**Answer:** Reliability across browsers/encodings.

</details>

## What It Is NOT

- ❌ Not all symbols have named entities.
- ❌ Missing semicolon is **not** valid.
- ❌ Symbols are **not** images.