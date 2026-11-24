# Doc HTML Forms 06 — Input Form Attributes

## Cheat Sheet (Quick Recall)

- `form` attribute associates input with a form by ID.
- `formaction`, `formmethod`, `formenctype` override form's submit settings.
- `formnovalidate` disables validation for that button.
- `formtarget` sets where response displays.

## Where We Are So Far

HTML Forms 05 covered input attributes. Now input form attributes — overriding form settings per input/button.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: input form attributes.

## Main Content

### THINK

Sometimes a single input/button needs different submit settings than the form. Input form attributes override the form's settings. First `form` association, then override attributes.

### CONCEPT

```html
<form id="myForm" action="/submit" method="post">
  <input type="text" name="name" />
</form>

<!-- Input outside form but associated -->
<input type="text" name="email" form="myForm" />

<!-- Button overrides -->
<button type="submit" formaction="/save" formmethod="get" formnovalidate>Save</button>
```

- `form="id"`: associate input with a form.
- `formaction`: override action.
- `formmethod`: override method.
- `formenctype`: override enctype.
- `formnovalidate`: skip validation for this button.
- `formtarget`: override target.

### CODE (gradual)

Stage 1 — Associate input with form:

```html
<input type="text" name="email" form="myForm" />
```

Stage 2 — Override action/method:

```html
<button type="submit" formaction="/save" formmethod="get">Save</button>
```

Stage 3 — Skip validation:

```html
<button type="submit" formnovalidate>Submit without validation</button>
```

### TEST

Three questions:

1. How to associate an input with a form by ID? (`form="id"`)
2. What does `formaction` do? (overrides form's action)
3. What does `formnovalidate` do? (skips validation for that button)

**Checkpoint:** Create a form with an external input and a button that overrides action.

## Common Mistakes

- `form` attribute referencing non-existent ID.
- Confusing `formnovalidate` with `novalidate`.
- Overusing overrides (confusing).

## Try It Yourself

1. Associate an input outside the form.
2. Override action on a button.
3. Use `formnovalidate`.

## Summary

- `form`, `formaction`, `formmethod`, `formenctype`, `formnovalidate`, `formtarget`.

## Next Step

HTML Forms complete. Next, HTML Graphics. Next: HTML Graphics 01 — Canvas.

---

**In Your Own Words**

1. What does the `form` attribute do?

<details>
<summary>Sample Answer</summary>

**Answer:** Associates an input with a form by ID, even if outside the form.

</details>

2. What does `formaction` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Overrides the form's action URL for that button.

</details>

3. What does `formnovalidate` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Skips HTML5 validation for that submit button.

</details>

4. What does `formmethod` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Overrides the form's method (get/post).

</details>

5. What does `formtarget` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Overrides where the response displays.

</details>

## What It Is NOT

- ❌ `form` attribute is **not** the same as nesting.
- ❌ `formnovalidate` is **not** server-side.
- ❌ Overrides are **not** for every button.