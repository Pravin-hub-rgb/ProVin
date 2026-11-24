# Doc HTML 01 — Introduction

## Cheat Sheet (Quick Recall)

- HTML = HyperText Markup Language.
- Describes structure and meaning of web content.
- Uses tags like `<h1>`, `<p>`, `<a>`, `<img>`.
- Every web page starts with `<!DOCTYPE html>`.

## Where We Are So Far

Module 0 is complete — how HTML/CSS work, rendering, folder structure, debugging. Now HTML Basics. This is the first HTML topic.

## Broader Goal

The overall goal of the HTML section is to learn structure and meaning of web content. Current step: what HTML is and why it exists.

## Main Content

### THINK

Every website you have seen is built on HTML. It is the skeleton of the web. Before styling (CSS) or interactivity (JS), you need structure. HTML provides that structure.

### CONCEPT

HTML (HyperText Markup Language) is a **markup language**, not a programming language. It describes content using **tags**.

```html
<h1>This is a heading</h1>
<p>This is a paragraph.</p>
<a href="https://example.com">This is a link</a>
```

- Tags are wrapped in `< >`.
- Most tags have an opening and closing tag: `<p>...</p>`.
- Some tags are self-closing: `<img />`, `<br />`.

### CODE (gradual)

Stage 1 — Minimal HTML document:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

Stage 2 — Add more content:

```html
<p>This is my first web page.</p>
<a href="https://example.com">Visit Example</a>
```

### TEST

Three questions:

1. What does HTML stand for? (HyperText Markup Language)
2. Is HTML a programming language? (No, markup)
3. What is the first line of an HTML document? (`<!DOCTYPE html>`)

**Checkpoint:** Create `index.html` with the minimal document above and open it in the browser.

## Common Mistakes

- Forgetting `<!DOCTYPE html>`.
- Not closing tags.
- Using HTML for styling instead of CSS.

## Try It Yourself

1. Create `index.html` with a heading and paragraph.
2. Open in browser.
3. View page source (Ctrl+U).

## Summary

- HTML = structure and meaning via tags.
- Not a programming language.
- Document starts with `<!DOCTYPE html>`.

## Next Step

HTML is introduced. Next, editors — where to write HTML. Next: HTML 02 — Editors.

---

**In Your Own Words**

1. What is HTML?

<details>
<summary>Sample Answer</summary>

**Answer:** HTML is the markup language that describes the structure and meaning of web page content.

</details>

2. Is HTML a programming language?

<details>
<summary>Sample Answer</summary>

**Answer:** No — it is a markup language.

</details>

3. What does `<!DOCTYPE html>` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Tells the browser this is an HTML5 document.

</details>

4. Give three common HTML tags.

<details>
<summary>Sample Answer</summary>

**Answer:** `<h1>`, `<p>`, `<a>` (also `<img>`, `<div>`, `<span>`).

</details>

5. What is the difference between opening and closing tags?

<details>
<summary>Sample Answer</summary>

**Answer:** Opening tag starts content (`<p>`); closing tag ends it (`</p>`).

</details>

## What It Is NOT

- ❌ HTML is **not** a programming language.
- ❌ HTML does **not** style content — CSS does.
- ❌ Tags are **not** case-sensitive, but lowercase is standard.