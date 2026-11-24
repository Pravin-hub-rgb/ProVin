# Doc HTML 36 — HTML vs XHTML

## Cheat Sheet (Quick Recall)

- HTML5: flexible, forgiving, no closing tags required for void elements.
- XHTML: XML-based, strict: lowercase tags, quoted attributes, closed tags.
- HTML5 is the standard today.
- XHTML stricter but largely obsolete.

## Where We Are So Far

HTML 35 covered URL encoding. Now HTML vs XHTML — a comparison.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: HTML vs XHTML.

## Main Content

### THINK

HTML5 and XHTML differ in strictness. HTML5 is flexible and standard today. XHTML is XML-based and strict. First differences, then when to use which.

### CONCEPT

| Feature | HTML5 | XHTML |
|---------|-------|-------|
| Syntax | Flexible | Strict XML |
| Closing tags | Optional for void | Required |
| Case | Any (lowercase standard) | Lowercase only |
| Attributes | Unquoted allowed (not recommended) | Must be quoted |
| MIME type | `text/html` | `application/xhtml+xml` |

**HTML5 (standard):**

```html
<!DOCTYPE html>
<html>
  <body>
    <br>
    <img src="x.png">
  </body>
</html>
```

**XHTML (strict):**

```xml
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "...">
<html xmlns="http://www.w3.org/1999/xhtml">
  <body>
    <br />
    <img src="x.png" alt="x" />
  </body>
</html>
```

### CODE (gradual)

Stage 1 — HTML5 (flexible):

```html
<input type="text">
```

Stage 2 — XHTML (strict):

```xml
<input type="text" />
```

### TEST

Three questions:

1. Which is the standard today? (HTML5)
2. What is XHTML based on? (XML)
3. Which requires closing void tags? (XHTML)

**Checkpoint:** Write the same page in HTML5 and XHTML; compare.

## Common Mistakes

- Serving XHTML as `text/html` (parsing differences).
- Mixing HTML5 and XHTML syntax.
- Thinking XHTML is required today.

## Try It Yourself

1. Write a valid HTML5 page.
2. Write the same in XHTML.
3. Compare strictness.

## Summary

- HTML5: flexible, standard today.
- XHTML: strict, XML-based, largely obsolete.

## Next Step

HTML Basics complete. Next, HTML Forms. Next: HTML Forms 01 — Forms.

---

**In Your Own Words**

1. Which is the standard today?

<details>
<summary>Sample Answer</summary>

**Answer:** HTML5.

</details>

2. What is XHTML based on?

<details>
<summary>Sample Answer</summary>

**Answer:** XML.

</details>

3. Which requires closing void tags?

<details>
<summary>Sample Answer</summary>

**Answer:** XHTML.

</details>

4. What MIME type for XHTML?

<details>
<summary>Sample Answer</summary>

**Answer:** `application/xhtml+xml`.

</details>

5. Is XHTML widely used today?

<details>
<summary>Sample Answer</summary>

**Answer:** No — HTML5 is standard.

</details>

## What It Is NOT

- ❌ XHTML is **not** required today.
- ❌ HTML5 is **not** XML-based.
- ❌ Void tags in HTML5 are **not** required to close.