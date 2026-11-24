# Doc HTML 33 — Emojis

## Cheat Sheet (Quick Recall)

- Emojis are Unicode characters.
- Can be typed directly (UTF-8) or via entities (`&#128512;`).
- Use `<meta charset="UTF-8">` to ensure display.
- Size with CSS `font-size`.

## Where We Are So Far

HTML 32 covered symbols. Now emojis — Unicode characters.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: emojis.

## Main Content

### THINK

Emojis are just Unicode characters. With UTF-8 charset they display directly. First direct typing, then entity codes, then styling.

### CONCEPT

```html
<p>😀 😃 😄</p>
<p>&#128512; &#128513;</p>
```

- Direct typing works with UTF-8.
- Numeric entity: `&#128512;`.
- Size with CSS `font-size`.

### CODE (gradual)

Stage 1 — Direct:

```html
<p>Hello 😀</p>
```

Stage 2 — Entity:

```html
<p>&#128512; &#128513;</p>
```

Stage 3 — Styled:

```html
<p style="font-size: 48px;">😀</p>
```

### TEST

Three questions:

1. What are emojis in HTML? (Unicode characters)
2. How to ensure emojis display? (UTF-8 charset)
3. How to size an emoji? (CSS `font-size`)

**Checkpoint:** Display a few emojis and resize them.

## Common Mistakes

- Missing UTF-8 charset → broken characters.
- Copy-pasting from incompatible sources.
- Overusing emojis (accessibility).

## Try It Yourself

1. Add emojis directly.
2. Add via entity code.
3. Resize with CSS.

## Summary

- Emojis are Unicode characters.
- UTF-8 charset required.
- Size with CSS `font-size`.

## Next Step

Emojis are clear. Next, character set (charset). Next: HTML 34 — Character Set (Charset).

---

**In Your Own Words**

1. What are emojis in HTML?

<details>
<summary>Sample Answer</summary>

**Answer:** Unicode characters.

</details>

2. How to ensure emojis display correctly?

<details>
<summary>Sample Answer</summary>

**Answer:** Use `<meta charset="UTF-8">`.

</details>

3. Can emojis be added via entity codes?

<details>
<summary>Sample Answer</summary>

**Answer:** Yes (`&#128512;`).

</details>

4. How to change emoji size?

<details>
<summary>Sample Answer</summary>

**Answer:** CSS `font-size`.

</details>

5. Are emojis accessible to screen readers?

<details>
<summary>Sample Answer</summary>

**Answer:** Not always — use alt text or aria-labels for important meaning.

</details>

## What It Is NOT

- ❌ Emojis are **not** images.
- ❌ Missing charset is **not** safe.
- ❌ Emojis are **not** always accessible.