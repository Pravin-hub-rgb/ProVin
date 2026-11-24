# Doc HTML 34 — Character Set (Charset)

## Cheat Sheet (Quick Recall)

- `<meta charset="UTF-8" />` in `<head>`.
- UTF-8 supports most characters/languages.
- Declares how bytes map to characters.
- Place early in `<head>`.

## Where We Are So Far

HTML 33 covered emojis. Now charset — character encoding.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: charset.

## Main Content

### THINK

Characters (letters, symbols, emojis) must be encoded. UTF-8 is the standard. First what charset is, then how to declare it, then why UTF-8.

### CONCEPT

```html
<meta charset="UTF-8" />
```

- Declares character encoding for the document.
- UTF-8 supports most languages and symbols.
- Place early in `<head>` (first 1024 bytes).

### CODE (gradual)

Stage 1 — Missing charset (problem):

```html
<head>
  <title>Test</title>
</head>
```

Special chars may break.

Stage 2 — Add charset:

```html
<head>
  <meta charset="UTF-8" />
  <title>Test</title>
</head>
```

### TEST

Three questions:

1. What tag declares charset? (`<meta charset="UTF-8">`)
2. Which charset is standard? (UTF-8)
3. Where to place it? (early in `<head>`)

**Checkpoint:** Add charset and verify special characters display.

## Common Mistakes

- Missing charset → broken characters.
- Placing charset too late.
- Using legacy charsets (ISO-8859-1).

## Try It Yourself

1. Remove charset and add special chars.
2. Add charset back and compare.
3. Use emojis with UTF-8.

## Summary

- `<meta charset="UTF-8" />` declares encoding.
- UTF-8 supports most characters.
- Place early in `<head>`.

## Next Step

Charset is clear. Next, URL encoding. Next: HTML 35 — URL Encoding.

---

**In Your Own Words**

1. What does charset declare?

<details>
<summary>Sample Answer</summary>

**Answer:** The character encoding of the document.

</details>

2. Which charset is standard?

<details>
<summary>Sample Answer</summary>

**Answer:** UTF-8.

</details>

3. Where should charset be placed?

<details>
<summary>Sample Answer</summary>

**Answer:** Early in `<head>` (within first 1024 bytes).

</details>

4. What happens if charset is missing?

<details>
<summary>Sample Answer</summary>

**Answer:** Special characters may display incorrectly.

</details>

5. Is UTF-8 the only charset?

<details>
<summary>Sample Answer</summary>

**Answer:** No, but it is the standard/recommended one.

</details>

## What It Is NOT

- ❌ Missing charset is **not** safe.
- ❌ Charset is **not** the same as language (`lang`).
- ❌ Legacy charsets are **not** recommended.