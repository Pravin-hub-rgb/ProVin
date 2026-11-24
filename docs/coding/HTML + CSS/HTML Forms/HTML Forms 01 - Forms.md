# Doc HTML Forms 01 — Forms

## Cheat Sheet (Quick Recall)

- `<form>` collects user input.
- `action` = where to submit.
- `method` = `get` or `post`.
- `input`, `label`, `button` are common elements.

## Where We Are So Far

HTML Basics is complete. Now HTML Forms — collecting user input.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: forms.

## Main Content

### THINK

Forms collect user input (login, signup, search). First the `<form>` tag, then inputs, then submit. HTML handles structure; validation/processing needs JS/backend.

### CONCEPT

```html
<form action="/submit" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" />
  <button type="submit">Submit</button>
</form>
```

- `action` — URL to submit to.
- `method` — `get` (URL params) or `post` (body).
- `name` — key sent to server.
- `id` — for label association.

### CODE (gradual)

Stage 1 — Basic form:

```html
<form>
  <input type="text" />
  <button>Submit</button>
</form>
```

Stage 2 — With action/method:

```html
<form action="/submit" method="post">
  <input type="text" name="username" />
  <button type="submit">Submit</button>
</form>
```

Stage 3 — With label:

```html
<form action="/submit" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" />
  <button type="submit">Submit</button>
</form>
```

### TEST

Three questions:

1. What tag creates a form? (`<form>`)
2. What attribute sets the submit URL? (`action`)
3. What are the two methods? (`get`, `post`)

**Checkpoint:** Create a form with text input and submit button.

## Common Mistakes

- Missing `name` on inputs (not submitted).
- Missing `label` (accessibility).
- Using `get` for sensitive data.

## Try It Yourself

1. Create a login form (username + password).
2. Add labels.
3. Test submit (shows in URL for `get`).

## Summary

- `<form>` collects input.
- `action` + `method` control submission.
- `name` is required for submission.

## Next Step

Forms are introduced. Next, form attributes. Next: HTML Forms 02 — Form Attributes.

---

**In Your Own Words**

1. What tag creates a form?

<details>
<summary>Sample Answer</summary>

**Answer:** `<form>`.

</details>

2. What does `action` specify?

<details>
<summary>Sample Answer</summary>

**Answer:** The URL where form data is submitted.

</details>

3. What are the two form methods?

<details>
<summary>Sample Answer</summary>

**Answer:** `get` and `post`.

</details>

4. Why is `name` important on inputs?

<details>
<summary>Sample Answer</summary>

**Answer:** It becomes the key in submitted data.

</details>

5. What is the purpose of `<label>`?

<details>
<summary>Sample Answer</summary>

**Answer:** Accessibility and clicking to focus input.

</details>

## What It Is NOT

- ❌ HTML forms do **not** process data — backend does.
- ❌ `get` is **not** for sensitive data.
- ❌ Missing `name` means **not** submitted.