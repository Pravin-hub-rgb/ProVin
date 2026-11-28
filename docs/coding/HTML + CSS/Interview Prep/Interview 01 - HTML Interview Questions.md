# Doc Interview 01 — HTML Interview Questions

**Q1. What is HTML, and why is it important?**
HTML is the markup language for web page structure. It is important because every web page is built on it.

**Q2. Purpose of `<head>` and `<body>`?**
`head`: metadata; `body`: visible content.

**Q3. `<title>` vs `<h1>`?**
`title`: browser tab/SEO; `h1`: main page heading.

**Q4. What are elements and attributes?**
Elements are tags + content. Attributes provide extra info (`name="value"`).

**Q5. Block vs inline?**
Block: new line, full width (`div`, `p`). Inline: flows in text (`span`, `a`).

**Q6. What is `<div>` vs `<span>`?**
`div` is block-level; `span` is inline.

**Q7. Semantic HTML examples?**
`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.

**Q8. `id` vs `class`?**
`id` unique; `class` reusable.

**Q9. `<br>` vs `<p>`?**
`<br>` line break; `<p>` paragraph.

**Q10. `<em>` vs `<i>`, `<strong>` vs `<b>`?**
Semantic vs visual.

**Q11. HTML entities?**
Codes for reserved/special chars (`&lt;`, `&copy;`).

**Q12. How to comment in HTML?**
`<!-- comment -->`.

**Q13. `<link>` vs `<a>` vs `<span>`?**
`link`: external resource; `a`: hyperlink; `span`: inline container.

**Q14. Purpose of `alt` on `<img>`?**
Accessibility and SEO; fallback if image fails.

**Q15. Purpose of forms?**
Collect user input.

**Q16. GET vs POST?**
GET: data in URL; POST: data in body.

**Q17. `action`, `method`, `enctype`?**
action: submit URL; method: get/post; enctype: encoding (for file upload).

**Q18. HTML5 input types?**
email, number, date, password, file, checkbox, radio, etc.

**Q19. `required`, `readonly`, `disabled`?**
required: must fill; readonly: cannot edit (submitted); disabled: cannot edit (not submitted).

**Q20. `placeholder` vs `value`?**
placeholder: hint; value: actual value.

**Q21. Purpose of `<label>`?**
Accessibility; clicking focuses input.

**Q22. `novalidate`?**
Disables browser validation.

**Q23. File upload?**
`<input type="file" />` with `enctype="multipart/form-data"`.

**Q24. What is `<canvas>`?**
A drawable bitmap region controlled by JavaScript via `getContext("2d")`.

**Q25. What is SVG?**
Scalable Vector Graphics (XML-based, resolution-independent) using shapes like `<circle>`, `<rect>`, `<path>`.

**Q26. Plug-ins?**
`<object>`/`<embed>` are legacy; modern alternatives are native HTML tags or `<iframe>`.

**Q27. Embed audio/video?**
`<audio>`/`<video>` with `<source>`.

**Q28. Video attributes?**
controls, autoplay, muted, loop, poster.

**Q29. Embed YouTube?**
`<iframe src="https://www.youtube.com/embed/VIDEO_ID">`.