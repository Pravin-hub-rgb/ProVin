# Doc HTML Forms 05 — Input Attributes

## Cheat Sheet (Quick Recall)

- `value`: default value.
- `placeholder`: hint text.
- `required`: must be filled.
- `readonly`: cannot edit (submitted).
- `disabled`: cannot edit (not submitted).
- `min`/`max`/`step`: number/date constraints.
- `pattern`: regex validation.
- `maxlength`/`minlength`: length limits.

## Where We Are So Far

HTML Forms 04 covered input types. Now input attributes — constraints and hints.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: input attributes.

## Main Content

### THINK

Inputs need constraints and hints. Attributes like `required`, `placeholder`, `min`/`max`, `pattern` provide these. First basic, then validation attributes.

### CONCEPT

```html
<input type="text" placeholder="Name" required />
<input type="number" min="0" max="100" step="5" />
<input type="text" pattern="[A-Za-z]+" />
<input type="text" maxlength="10" minlength="3" />
<input type="text" value="Default" readonly />
<input type="text" disabled />
```

- `value`: default value.
- `placeholder`: hint (not submitted).
- `required`: must be filled.
- `readonly`: cannot edit but submitted.
- `disabled`: cannot edit and not submitted.
- `min`/`max`/`step`: number/date constraints.
- `pattern`: regex validation.
- `maxlength`/`minlength`: length limits.

### CODE (gradual)

Stage 1 — placeholder + required:

```html
<input type="text" placeholder="Name" required />
```

Stage 2 — min/max/step:

```html
<input type="number" min="0" max="100" step="5" />
```

Stage 3 — pattern + length:

```html
<input type="text" pattern="[A-Za-z]+" maxlength="10" />
```

### TEST

Three questions:

1. Difference between `readonly` and `disabled`? (disabled not submitted)
2. What attribute makes a field required? (`required`)
3. What attribute sets a regex pattern? (`pattern`)

**Checkpoint:** Build an input with placeholder, required, min/max, pattern.

## Common Mistakes

- Confusing `readonly` and `disabled`.
- Missing `name` (not submitted).
- Invalid regex in `pattern`.

## Try It Yourself

1. Add `required` to a field.
2. Add `min`/`max` to a number input.
3. Add a `pattern` for letters only.

## Summary

- Attributes: value, placeholder, required, readonly, disabled, min/max/step, pattern, maxlength/minlength.

## Next Step

Input attributes are clear. Next, input form attributes. Next: HTML Forms 06 — Input Form Attributes.

---

**In Your Own Words**

1. Difference between `readonly` and `disabled`?

<details>
<summary>Sample Answer</summary>

**Answer:** `readonly` cannot be edited but is submitted; `disabled` cannot be edited and is not submitted.

</details>

2. What does `required` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Makes the field mandatory.

</details>

3. What does `placeholder` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Shows hint text inside the input.

</details>

4. What does `pattern` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Validates input against a regex.

</details>

5. What does `step` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Sets the increment for number/range inputs.

</details>

## What It Is NOT

- ❌ `placeholder` is **not** a default value.
- ❌ `disabled` is **not** submitted.
- ❌ `pattern` is **not** a replacement for server validation.