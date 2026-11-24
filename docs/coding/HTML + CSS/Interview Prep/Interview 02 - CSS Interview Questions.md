# Doc Interview 02 — CSS Interview Questions

## Cheat Sheet (Quick Recall)

- Box model, specificity, flexbox vs grid.
- Positioning, responsive design, units.
- Transitions vs animations.
- CSS variables, media queries.

## Where We Are So Far

Interview 01 covered HTML. Now CSS interview questions.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: interview prep.

## Main Content

### THINK

CSS interviews test fundamentals. Here are common CSS questions with answers. Review and practice explaining aloud.

### CONCEPT

**Q1. What is CSS, and why do we use it?**
CSS describes the look and layout of HTML. We use it to separate presentation from structure.

**Q2. Inline vs internal vs external CSS?**
Inline: `style` attribute. Internal: `<style>` in head. External: `.css` file via `<link>` (preferred).

**Q3. Advantages of external stylesheets?**
Reusability, caching, separation of concerns, maintainability.

**Q4. Relative vs absolute vs fixed vs sticky positioning?**
Relative: normal flow + offset. Absolute: relative to positioned ancestor. Fixed: relative to viewport. Sticky: scrolls then sticks.

**Q5. id vs class selectors?**
id: unique, `#name`. class: reusable, `.name`.

**Q6. Inline vs block-level in CSS?**
Inline: flows in text, no width/height. Block: new line, full width.

**Q7. Absolute vs relative units?**
Absolute: px, cm, pt. Relative: %, em, rem, vw, vh.

**Q8. Inline styles vs `<style>` block?**
Inline: on element. Style block: in head, reusable.

**Q9. CSS comments?**
`/* comment */`. Use for notes; not displayed.

**Q10. Inline vs inline-block vs flex?**
Inline: no width/height. Inline-block: inline flow + dimensions. Flex: flexbox container.

**Q11. Media queries?**
Apply CSS based on conditions (screen size, orientation).

**Q12. Transitions vs animations?**
Transitions: animate on state change. Animations: keyframe-based, can loop.

**Q13. min-width vs max-width vs min-height vs max-height?**
Constraints on dimensions.

**Q14. Types of CSS selectors?**
Element, class, ID, universal, attribute, pseudo-class, pseudo-element, combinators.

**Q15. `!important` vs inline styles?**
`!important` overrides all; inline has high specificity (1000).

**Q16. CSS Box Model?**
Content → padding → border → margin.

**Q17. Float vs Flexbox?**
Float: legacy text wrap. Flexbox: modern 1D layout.

**Q18. Grid vs Flexbox?**
Grid: 2D. Flexbox: 1D.

**Q19. Center a div horizontally and vertically?**
Flexbox: `justify-content: center; align-items: center;` or grid `place-items: center`.

**Q20. `display: flex` vs `display: inline-flex`?**
Flex: block-level container. Inline-flex: inline-level container.

**Q21. Auto margins vs Flexbox alignment?**
Auto margins center; flexbox aligns along axes.

**Q22. Media queries for responsive layouts?**
`@media (min-width: 768px) { ... }`.

**Q23. `overflow: hidden/scroll/auto`?**
hidden: clip. scroll: always scrollbar. auto: scrollbar when needed.

**Q24. Transitions: inline styles vs stylesheet?**
Both work; stylesheet preferred for maintainability.

**Q25. `object-fit` vs `background-size`?**
`object-fit` for `<img>`/`<video>`; `background-size` for CSS backgrounds.

**Q26. Responsive web design?**
Adapts to screen size (fluid layouts, media queries, flexible images).

**Q27. Margin vs padding?**
Margin: outside space. Padding: inside space.

### TEST

Review all 27 questions aloud.

## Common Mistakes

- Memorizing without understanding.
- Not practicing code examples.
- Ignoring accessibility.

## Try It Yourself

1. Answer each question aloud.
2. Code an example for each.
3. Mock interview with a peer.

## Summary

- 27 common CSS interview questions with answers.

## Next Step

CSS interview prep is complete. The HTML + CSS course is done. Keep building and practicing.

---

**In Your Own Words**

1. What is the CSS Box Model?

<details>
<summary>Sample Answer</summary>

**Answer:** Content → padding → border → margin.

</details>

2. Flexbox vs Grid?

<details>
<summary>Sample Answer</summary>

**Answer:** Flexbox = 1D; Grid = 2D.

</details>

3. What is specificity?

<details>
<summary>Sample Answer</summary>

**Answer:** The rule determining which CSS declaration applies (universal < type < class < ID < inline < !important).

</details>

4. How to center a div both ways?

<details>
<summary>Sample Answer</summary>

**Answer:** Flexbox: `justify-content: center; align-items: center;`.

</details>

5. What is responsive web design?

<details>
<summary>Sample Answer</summary>

**Answer:** Adapting layout to different screen sizes (fluid + media queries).

</details>

## What It Is NOT

- ❌ Memorization is **not** understanding.
- ❌ CSS is **not** a programming language.
- ❌ Answers are **not** a substitute for practice.