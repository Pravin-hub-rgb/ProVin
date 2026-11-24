# Doc HTML 35 — URL Encoding

## Cheat Sheet (Quick Recall)

- URLs cannot contain spaces/special chars.
- Encode spaces as `%20` or `+`.
- Special chars: `%2F` (/), `%3F` (?), `%26` (&).
- Use `encodeURIComponent()` in JS.

## Where We Are So Far

HTML 34 covered charset. Now URL encoding — safe URLs.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: URL encoding.

## Main Content

### THINK

URLs cannot contain spaces or special characters. They must be encoded. First why, then how, then JS encoding.

### CONCEPT

- Space → `%20` (or `+` in query strings).
- `/` → `%2F`, `?` → `%3F`, `&` → `%26`.

```html
<a href="search?q=hello%20world">Search</a>
```

**JS:**

```js
encodeURIComponent("hello world") // "hello%20world"
```

### CODE (gradual)

Stage 1 — Space in URL (problem):

```html
<a href="search?q=hello world">Search</a> <!-- broken -->
```

Stage 2 — Encoded:

```html
<a href="search?q=hello%20world">Search</a>
```

Stage 3 — JS encoding:

```js
const url = "search?q=" + encodeURIComponent("hello world");
```

### TEST

Three questions:

1. Why encode URLs? (spaces/special chars invalid)
2. Space encoded as? (`%20` or `+`)
3. JS function to encode? (`encodeURIComponent`)

**Checkpoint:** Create a link with an encoded query string.

## Common Mistakes

- Spaces in URLs → broken links.
- Double-encoding.
- Forgetting to decode on server.

## Try It Yourself

1. Create a link with a space in query.
2. Encode it with `%20`.
3. Use `encodeURIComponent` in JS.

## Summary

- URLs must be encoded.
- Space → `%20`/`+`.
- Use `encodeURIComponent` in JS.

## Next Step

URL encoding is clear. Next, HTML vs XHTML. Next: HTML 36 — HTML vs XHTML.

---

**In Your Own Words**

1. Why must URLs be encoded?

<details>
<summary>Sample Answer</summary>

**Answer:** URLs cannot contain spaces or special characters.

</details>

2. How is a space encoded?

<details>
<summary>Sample Answer</summary>

**Answer:** `%20` (or `+` in query strings).

</details>

3. What JS function encodes URLs?

<details>
<summary>Sample Answer</summary>

**Answer:** `encodeURIComponent()`.

</details>

4. What is `%26`?

<details>
<summary>Sample Answer</summary>

**Answer:** Encoded `&`.

</details>

5. What is double-encoding?

<details>
<summary>Sample Answer</summary>

**Answer:** Encoding an already-encoded URL, causing errors.

</details>

## What It Is NOT

- ❌ Spaces are **not** allowed in URLs.
- ❌ Double-encoding is **not** correct.
- ❌ `encodeURI` is **not** the same as `encodeURIComponent`.