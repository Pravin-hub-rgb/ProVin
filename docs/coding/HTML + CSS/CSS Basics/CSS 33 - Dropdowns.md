# Doc CSS 33 — Dropdowns

## Cheat Sheet (Quick Recall)

- Dropdown: hover or click reveals submenu.
- CSS-only: `:hover` to show.
- Position submenu `absolute` inside `relative` parent.
- JS for click toggles (accessibility).

## Where We Are So Far

CSS 32 covered navbar. Now dropdowns — revealing submenus.

## Broader Goal

The overall goal of the CSS section is styling and layout. Current step: dropdowns.

## Main Content

### THINK

Dropdowns reveal hidden content on hover/click. First CSS-only hover, then positioning, then accessibility (click via JS).

### CONCEPT

```html
<div class="dropdown">
  <button>Menu</button>
  <div class="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
  </div>
</div>
```

```css
.dropdown { position: relative; display: inline-block; }
.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.dropdown:hover .dropdown-content { display: block; }
```

- Parent `position: relative`.
- Submenu `position: absolute`.
- Show on `:hover`.

### CODE (gradual)

Stage 1 — Hidden submenu:

```css
.dropdown-content { display: none; }
```

Stage 2 — Show on hover:

```css
.dropdown:hover .dropdown-content { display: block; }
```

Stage 3 — Position + style:

```css
.dropdown-content { position: absolute; top: 100%; left: 0; }
```

### TEST

Three questions:

1. How to show dropdown on hover? (`:hover` + `display: block`)
2. What position for submenu? (`absolute`)
3. What position for parent? (`relative`)

**Checkpoint:** Build a hover dropdown.

## Common Mistakes

- Parent not `position: relative` → submenu misaligned.
- Using `display: none` without hover → inaccessible (use JS for click).
- Forgetting `z-index` → hidden behind other elements.

## Try It Yourself

1. Build a hover dropdown.
2. Add multiple links.
3. Style with shadow.

## Summary

- Dropdown: parent relative, submenu absolute.
- Show via `:hover` + `display: block`.
- Consider JS for click (accessibility).

## Next Step

Dropdowns are clear. Next, image gallery. Next: CSS 34 — Image Gallery.

---

**In Your Own Words**

1. How to show a dropdown on hover?

<details>
<summary>Sample Answer</summary>

**Answer:** `.dropdown:hover .dropdown-content { display: block; }`.

</details>

2. What position for the submenu?

<details>
<summary>Sample Answer</summary>

**Answer:** `absolute`.

</details>

3. What position for the parent?

<details>
<summary>Sample Answer</summary>

**Answer:** `relative`.

</details>

4. Why is CSS-only dropdown not accessible?

<details>
<summary>Sample Answer</summary>

**Answer:** Keyboard users cannot trigger `:hover`.

</details>

5. What does `top: 100%` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Places submenu below the parent.

</details>

## What It Is NOT

- ❌ CSS-only dropdown is **not** accessible (use JS).
- ❌ `display: none` is **not** visible.
- ❌ Submenu without `position: absolute` is **not** overlay.