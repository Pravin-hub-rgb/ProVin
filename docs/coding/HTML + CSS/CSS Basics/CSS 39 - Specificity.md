# Doc CSS 39 — Specificity

## Cheat Sheet (Quick Recall)

- Specificity order (lowest → highest): universal, type, class, ID, inline, `!important`.
- Inline > ID > class > element.
- `!important` overrides all (avoid).
- Use specificity calculator mental model.

## Where We Are So Far

CSS 38 covered units. Now specificity — which rule wins.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: specificity.

## Main Content

### THINK

Multiple CSS rules can target the same element. Which one wins? Specificity decides. First the order, then examples, then avoiding wars.

### CONCEPT

Specificity (lowest → highest):

1. Universal `*` (0).
2. Type/element `p` (1).
3. Class `.intro` (10).
4. ID `#main` (100).
5. Inline `style="..."` (1000).
6. `!important` (overrides all).

**Example:**

```css
p { color: red; }           /* specificity 1 */
.intro { color: blue; }     /* specificity 10 */
#main { color: green; }     /* specificity 100 */
```

If all target the same `<p id="main" class="intro">`, green wins.

### CODE (gradual)

Stage 1 — Element vs class:

```css
p { color: red; }
.intro { color: blue; } /* wins */
```

Stage 2 — Class vs ID:

```css
.intro { color: blue; }
#main { color: green; } /* wins */
```

Stage 3 — !important (avoid):

```css
p { color: red !important; } /* wins */
```

### TEST

Three questions:

1. Specificity order (lowest → highest)? (universal, type, class, ID, inline, !important)
2. Which has higher specificity: class or ID? (ID)
3. Should you use `!important`? (avoid; fix specificity instead)

**Checkpoint:** Create conflicting rules and predict which wins.

## Common Mistakes

- Using `!important` to fix specificity (tech debt).
- Overly specific selectors (hard to override).
- Inline styles for convenience (hard to maintain).

## Try It Yourself

1. Create a conflict between class and ID.
2. Observe which wins.
3. Avoid `!important`.

## Summary

- Specificity: universal < type < class < ID < inline < `!important`.
- Avoid `!important`; fix selectors.

## Next Step

Specificity is clear. Next, `!important`. Next: CSS 40 — Important.

---

**In Your Own Words**

1. What is CSS specificity?

<details>
<summary>Sample Answer</summary>

**Answer:** The rule that determines which CSS declaration applies when multiple rules target the same element.

</details>

2. Specificity order (lowest → highest)?

<details>
<summary>Sample Answer</summary>

**Answer:** Universal, type, class, ID, inline, `!important`.

</details>

3. Which has higher specificity: class or ID?

<details>
<summary>Sample Answer</summary>

**Answer:** ID.

</details>

4. Should you use `!important`?

<details>
<summary>Sample Answer</summary>

**Answer:** Avoid; fix specificity instead.

</details>

5. What is an inline style's specificity?

<details>
<summary>Sample Answer</summary>

**Answer:** 1000 (high).

</details>

## What It Is NOT

- ❌ `!important` is **not** a best practice.
- ❌ Specificity is **not** about order alone.
- ❌ Inline styles are **not** maintainable.