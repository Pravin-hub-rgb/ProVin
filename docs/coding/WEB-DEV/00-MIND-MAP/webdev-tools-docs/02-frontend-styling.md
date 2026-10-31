# 02 — Styling: Tailwind, CSS Modules, Styled Components and the Rest

> Umbrella: Frontend → Styling
> Purpose: How the app looks — colors, layout, typography, responsive design
> Each tool has a different approach — utility, module, CSS-in-JS

---

## What This Category Solves

Writing CSS seems simple — but in large apps:
- Class names clash (`.button` applies globally)
- Dead CSS piles up (nobody removes it)
- Maintaining responsive design gets hard
- Dark mode, theming — becomes complex

These tools solve these problems — in different ways.

---

## Tools

---

### Tailwind CSS
**Tag: 🟢 Most Popular 2024 | Industry Shifting Here | Recommended**

```
What it is: Utility-first CSS — use pre-defined classes directly in HTML
When to use:
  → New project — almost always
  → Need to prototype quickly
  → No design system, building your own
  → Next.js / React projects

When NOT to use:
  → Team doesn't know Tailwind and deadline is tight
  → Highly custom animations (GSAP + plain CSS better)

Real app example:
  → Vercel's website: Entirely Tailwind
  → Linear (project management): Tailwind
  → New Indian startups 2023+: Tailwind everywhere

Code feel:
  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
    Add to Cart
  </button>
  (No separate CSS file — everything here)

Pros:
  → No switching CSS files while writing classes
  → Responsive: md:text-lg lg:text-xl — in one line
  → Dark mode: dark:bg-gray-800 — built-in
  → Small bundle — only used classes

Cons:
  → Lots of classes in HTML — looks "ugly" at first
  → Learning curve — have to remember class names

In India: Became almost standard in new projects after 2022
```

---

### CSS Modules
**Tag: 🟢 Built-in | Safe | Always Valid**

```
What it is: Regular CSS — but scoped to the file (class names don't clash globally)
When to use:
  → Don't want to learn Tailwind
  → Prefer traditional CSS approach
  → Legacy project

Code feel:
  /* Button.module.css */
  .button { background: blue; color: white; padding: 8px 16px; }

  /* Button.jsx */
  import styles from './Button.module.css'
  <button className={styles.button}>Click</button>

Pros:
  → Regular CSS — no new syntax to learn
  → Scoped — .button only in this component

Cons:
  → Have to switch files
  → Responsive more verbose
  → Dark mode manual

Real app example:
  → Next.js default examples use CSS Modules
  → Conservative teams that prefer plain CSS
```

---

### Sass / SCSS
**Tag: 🟢 Classic | Variables + Nesting | Still Valid**

```
What it is: CSS superpower — variables, nesting, mixins, functions
When to use:
  → Building a large design system
  → Need variables (colors, spacing) — more powerful than CSS variables
  → Need loops, functions, mixins
  → Large team with dedicated designers

Code feel:
  $primary: #3b82f6;
  $border-radius: 8px;

  .button {
    background: $primary;
    border-radius: $border-radius;

    &:hover { background: darken($primary, 10%); }

    &.large { padding: 16px 32px; }
  }

Real app example:
  → Bootstrap's source is in SCSS
  → Older enterprise projects
  → Design agencies with complex theming

With Tailwind:
  → Usually either Tailwind or SCSS — both together rarely
```

---

### Styled Components
**Tag: 🟡 Legacy CSS-in-JS | Found in existing projects**

```
What it is: CSS in JavaScript — via template literals
When to use:
  → Existing styled-components codebase
  → Highly dynamic styles (depend on props)

When NOT to use:
  → New project — use Tailwind

Performance note:
  → Runtime CSS generation — a bit slow (SSR issues)
  → Complex setup with Next.js

Code feel:
  const Button = styled.button`
    background: ${props => props.primary ? 'blue' : 'gray'};
    padding: 8px 16px;
  `
  <Button primary>Click</Button>

Real app example:
  → React projects from 2019-2022
  → Airbnb, Atlassian (older versions)

In India: Found in older projects — avoid in new ones
```

---

### Emotion
**Tag: 🟡 CSS-in-JS | MUI uses it**

```
What it is: Like Styled Components — Material UI uses it internally
When to use:
  → Using MUI — already included
  → Otherwise: Avoid in new projects

Difference from Styled Components:
  → Slightly better performance
  → Standard in the MUI ecosystem
```

---

### Vanilla CSS
**Tag: 🟢 Always Valid | Best for learning**

```
What it is: Plain browser CSS — no tool
When to use:
  → For learning — start here
  → Very simple static page
  → Email templates (email clients only support plain CSS)

In production:
  → Usually not enough alone — use with some tool
```

---

## Quick Decision

```
New React/Next.js project?
  → Tailwind CSS (almost always)

Prefer traditional CSS?
  → CSS Modules

Large design system with complex theming?
  → SCSS or Tailwind + CSS variables

Using MUI?
  → Emotion already included — or override with Tailwind

Existing styled-components project?
  → Leave it — no need to rewrite
```

---

## India Reality

```
Startup / Agency (2024):     Tailwind — almost standard
Product companies:           Tailwind or CSS Modules
Enterprise / Old company:    SCSS or Styled Components
Freelance:                   Tailwind — fast work
```

---

## Next Doc

`03-frontend-components.md` — UI Component Libraries — shadcn, MUI, Ant Design, Chakra — how Zomato's UI is built, when to use ready-made components vs build your own.
