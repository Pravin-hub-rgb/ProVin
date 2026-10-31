# 43 — Accessibility: Make It Work for Everyone

> Performance is complete.
> Now the tenth umbrella — **Accessibility**.
> The app isn't just for mouse users — it should be accessible to everyone.

---

## What Is Accessibility

**Accessibility (a11y)** = design the app so anyone can use it — whether they:
- Navigate with keyboard (no mouse)
- Use a screen reader (vision impairment)
- Are color blind
- Are on slow internet

---

## Why It's Important

1. **Users** — crores of people in India live with disabilities
2. **Legal** — accessibility is required in many countries
3. **SEO** — accessible HTML → better search ranking
4. **Everyone benefits** — keyboard shortcuts, clear labels — helps all

---

## Basics — What to Do in ShopKaro

### 1. Semantic HTML — Use the Right Tags

```jsx
// ❌ Everything in divs
<div onClick={handleLogin}>Login</div>
<div className="heading">Products</div>

// ✓ Correct tags
<button onClick={handleLogin}>Login</button>  // Keyboard accessible, screen reader understands
<h1>Products</h1>                              // Screen reader announces it
```

---

### 2. Alt Text — For Images

```jsx
// ❌ No alt text
<Image src={product.imageUrl} alt="" />

// ✓ Descriptive alt text
<Image src={product.imageUrl} alt={`${product.name} - ${product.category.name}`} />

// For decorative images — empty string (screen reader skips it)
<Image src="/decoration.svg" alt="" />
```

---

### 3. ARIA Labels — When HTML Isn't Enough

```jsx
// Icon-only button — what will screen reader read?
// ❌
<button><CartIcon /></button>

// ✓ Add aria-label
<button aria-label="Add to cart">
  <CartIcon />
</button>

// For cart count
<button aria-label={`Cart, ${count} items`}>
  <CartIcon />
  <span>{count}</span>
</button>
```

---

### 4. Keyboard Navigation

```jsx
// ✓ Buttons and links are automatically keyboard accessible
<button onClick={handleAdd}>Add</button>  // Tab to focus, Enter to click

// ✓ For custom components, add tabIndex if needed
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Custom Button
</div>
```

---

### 5. Focus Visible

```css
/* Don't remove the default focus outline — essential for keyboard users */

/* ❌ */
button:focus { outline: none; }

/* ✓ Custom but visible */
button:focus-visible {
  outline: 2px solid #0070f3;
  outline-offset: 2px;
}
```

---

### 6. Color Contrast

There should be enough contrast between text and background — for color blind users.

```
Minimum ratio: 4.5:1 (normal text)
Large text: 3:1

Light gray text on white → Poor contrast ❌
Dark gray text on white → Good contrast ✓
```

Free tool: `webaim.org/resources/contrastchecker`

---

## Quick Checklist for ShopKaro

```
✓ All buttons and links accessible via keyboard
✓ All images have alt text
✓ Headings in proper order (h1 → h2 → h3)
✓ Form inputs have labels
✓ Error messages clearly describe the issue
✓ Focus is visible
✓ Color alone doesn't convey information
  (e.g., alongside "Red = out of stock", also show "Out of Stock" text)
```

---

## Accessibility Umbrella — Complete

```
ACCESSIBILITY
│
└── Basics → Doc 43 ✓ (THIS)
```

---

## Next Doc

`44-deployment-what-is-it.md` — Eleventh umbrella — **Deployment**. The app works locally — now take it live. Deploying on Vercel, environment variables — we'll understand all of it.
