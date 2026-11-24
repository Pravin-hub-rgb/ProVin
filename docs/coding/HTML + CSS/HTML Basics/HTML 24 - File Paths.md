# Doc HTML 24 — File Paths

## Cheat Sheet (Quick Recall)

- Relative: `images/logo.png`, `./css/style.css`, `../img/logo.png`.
- Absolute: `/images/logo.png` (from domain root).
- Root-relative works on servers, not local `file://`.
- Keep paths consistent and lowercase.

## Where We Are So Far

HTML 23 covered JavaScript in HTML. Now file paths — linking resources correctly.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: file paths.

## Main Content

### THINK

Resources (CSS, JS, images) must be linked with correct paths. Broken paths are common. First relative, then absolute, then folder structure.

### CONCEPT

**Relative (from current file):**

```html
<img src="images/logo.png" />
<link rel="stylesheet" href="./css/style.css" />
<img src="../images/logo.png" />  <!-- up one folder -->
```

**Absolute (from domain root):**

```html
<img src="/images/logo.png" />
```

**Recommended structure:**

```
project/
├── index.html
├── css/style.css
├── js/app.js
└── images/logo.png
```

### CODE (gradual)

Stage 1 — Same folder:

```html
<img src="logo.png" />
```

Stage 2 — Subfolder:

```html
<img src="images/logo.png" />
```

Stage 3 — Up one folder:

```html
<img src="../images/logo.png" />
```

### TEST

Three questions:

1. What is a relative path? (relative to current file)
2. What is an absolute path? (from domain root)
3. Which works on local `file://`? (relative)

**Checkpoint:** Create the recommended structure and link all resources.

## Common Mistakes

- Wrong relative path.
- Using absolute paths locally.
- Spaces in file names.

## Try It Yourself

1. Link an image in a subfolder.
2. Go up one folder with `../`.
3. Fix a broken path.

## Summary

- Relative paths for local files.
- Absolute paths for servers.
- Organize assets in folders.

## Next Step

File paths are clear. Next, the head element. Next: HTML 25 — Head Element.

---

**In Your Own Words**

1. What is a relative path?

<details>
<summary>Sample Answer</summary>

**Answer:** A path relative to the current file's location.

</details>

2. What is an absolute path?

<details>
<summary>Sample Answer</summary>

**Answer:** A path from the domain root (starts with `/`).

</details>

3. Which works on local `file://`?

<details>
<summary>Sample Answer</summary>

**Answer:** Relative paths.

</details>

4. What does `../` mean?

<details>
<summary>Sample Answer</summary>

**Answer:** Go up one folder level.

</details>

5. Why organize assets in folders?

<details>
<summary>Sample Answer</summary>

**Answer:** Cleaner project, easier paths.

</details>

## What It Is NOT

- ❌ Absolute paths are **not** for local browsing.
- ❌ Spaces in paths are **not** safe.
- ❌ `./` is **not** always required.