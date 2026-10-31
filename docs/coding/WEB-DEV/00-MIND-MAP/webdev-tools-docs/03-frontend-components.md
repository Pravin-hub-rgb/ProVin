# 03 — Component Libraries: shadcn, MUI, Ant Design and the Rest

> Umbrella: Frontend → Component Libraries (UI Kits)
> Purpose: Ready-made buttons, modals, tables, forms — don't build from scratch
> Difference: Styling tools (02) write CSS — Component libraries provide complete components

---

## What This Category Solves

Every project needs these:
- Button (primary, secondary, disabled states)
- Modal / Dialog
- Dropdown
- Date picker
- Table with sorting
- Toast notifications

Building from scratch every time is slow. Component libraries provide all of these ready.

---

## Two Types — Headless vs Styled

```
STYLED (opinionated):
  → Design fixed beforehand — Google Material, Ant Design system
  → Pros: Ready fast, consistent
  → Cons: Hard to customize, hard to get your own look

HEADLESS (unstyled):
  → Only behavior + accessibility — no CSS
  → Pros: Full design control, apply your own style
  → Cons: Have to style yourself

2024 trend: Headless + Tailwind → shadcn/ui
```

---

## Tools

---

### shadcn/ui
**Tag: 🟢 Most Popular 2024 | Recommended | Tailwind-based**

```
What it is: "Copy-paste" component library — code comes into your project, not installed as dependency
When to use:
  → Using Tailwind
  → Want full design control
  → New project in 2024

Unique concept:
  → shadcn isn't installed via npm
  → npx shadcn-ui add button → Button.tsx lands in your /components/ui/
  → Then you can edit it directly
  → No dependency — the code is yours

Real app example:
  → Vercel's new tools
  → Linear's settings UI
  → New Indian SaaS startups

Code feel:
  import { Button } from "@/components/ui/button"
  import { Dialog, DialogContent } from "@/components/ui/dialog"
  <Button variant="outline">Cancel</Button>

Pros:
  → Full customization — code is yours
  → Accessible by default (based on Radix UI)
  → Perfect with Tailwind
  → Copy only what you need — no bundle bloat

Cons:
  → Tailwind required
  → Have to add manually in each project

In India: Rapidly growing since 2023
```

---

### Radix UI
**Tag: 🟢 Headless | Accessible | shadcn's base**

```
What it is: Fully accessible headless components — shadcn/ui uses this internally
When to use:
  → Building a custom design system
  → Want Radix's accessibility but not shadcn
  → Styling yourself (CSS Modules or anything)

Code feel:
  import * as Dialog from '@radix-ui/react-dialog'
  <Dialog.Root>
    <Dialog.Trigger>Open</Dialog.Trigger>
    <Dialog.Content>...</Dialog.Content>  {/* Style yourself */}
  </Dialog.Root>

Difference from shadcn:
  → shadcn = Radix + Tailwind styles already applied
  → Radix = only behavior, no styles
```

---

### Material UI (MUI)
**Tag: 🟡 Enterprise | Google Material Design | Large ecosystem**

```
What it is: Implements Google Material Design — complete component library
When to use:
  → Want Google-style UI (Android app feel)
  → Admin panels, internal tools
  → Existing MUI codebase
  → Rapid prototyping where design doesn't matter

When NOT to use:
  → Custom unique design needed — overriding MUI look is very hard
  → Bundle size concern — MUI is heavy

Real app example:
  → Google's new tools (Google Analytics redesign)
  → Indian government portals (DigiLocker type apps)
  → Corporate internal dashboards

Code feel:
  import Button from '@mui/material/Button'
  import TextField from '@mui/material/TextField'
  <Button variant="contained" color="primary">Submit</Button>

Cons:
  → Heavy bundle size
  → Hard to go beyond Google look
  → Conflicts with Tailwind

In India:
  → Popular in enterprise, government, corporate sector
  → Avoided in startups — shadcn or Tailwind preferred
```

---

### Ant Design
**Tag: 🟡 Enterprise | Admin Panels | Chinese origin**

```
What it is: Comprehensive enterprise component library — built by Alibaba
When to use:
  → Admin dashboards, CRM, ERP type apps
  → Need many complex components (Tables, Forms, Charts all included)
  → B2B SaaS

When NOT to use:
  → Consumer-facing apps — feels "corporate"
  → Apps with custom branding

Real app example:
  → Razorpay's merchant dashboard (Ant Design heavy)
  → Paytm for Business type tools
  → Alibaba, DingTalk

Pros:
  → Very complete — DatePicker, Table with sorting/filtering, Tree, everything
  → Good documentation

In India: Found more in fintech and B2B dashboards
```

---

### Chakra UI
**Tag: 🟡 Developer Friendly | Declining | Was popular 2021-22**

```
What it is: Simple, accessible component library with theming
When to use:
  → Existing Chakra codebase
  → Otherwise: prefer shadcn/Tailwind

Status: Declining in 2024 — Chakra UI v3 released but momentum slow
Alternatives: shadcn/ui took more market share

Real app example:
  → Projects from 2021-2022
```

---

### Mantine
**Tag: 🟢 Growing | Feature-rich | Good alternative**

```
What it is: Complete component library — 100+ components, hooks included
When to use:
  → Want MUI-like completeness but lighter
  → Need hooks too (useDebouncedValue, useLocalStorage etc)
  → Want more "complete" feel than shadcn

Real app example:
  → Growing startups that want to ship fast
  → Internal tools

Pros:
  → Many built-in hooks
  → Easy theming
  → Active development

In India: Growing — mostly in international projects so far
```

---

### DaisyUI
**Tag: 🟢 Tailwind-based | Simple | Good for beginners**

```
What it is: Tailwind-based component classes — btn, card, modal, etc.
When to use:
  → Using Tailwind
  → Need UI quickly
  → For beginners — while learning Tailwind

Code feel:
  <button className="btn btn-primary">Click me</button>
  <div className="card bg-base-100 shadow-xl">...</div>

Difference from shadcn:
  → DaisyUI: CSS classes only — no React components
  → shadcn: Actual React components with full TypeScript support

When to prefer: Quick projects, static sites, non-React
```

---

### Headless UI
**Tag: 🟢 Tailwind team | Simple | Limited components**

```
What it is: Tailwind team's headless component library — only a few components
When to use:
  → Using Tailwind
  → Only need dropdown, listbox, combobox
  → Lighter than shadcn

Limited components — shadcn is more complete
```

---

## Quick Decision

```
New project using Tailwind?
  → shadcn/ui (almost always)

Admin panel / internal tool, Google style okay?
  → MUI or Ant Design

Complex enterprise dashboard, many components?
  → Ant Design (most complete)

Building a custom design system, want full control?
  → Radix UI (headless) + your own styling

Beginner, need UI quickly?
  → DaisyUI (with Tailwind)

Existing codebase?
  → Use whatever's already there — don't rewrite
```

---

## India Reality

```
Consumer startups (2024):        shadcn/ui + Tailwind
Fintech / B2B dashboards:        Ant Design or MUI
Enterprise / Corporate:          MUI
Government projects:             MUI (familiarity)
Freelance / Quick projects:      DaisyUI or shadcn
```

---

## Next Doc

`04-frontend-forms.md` — Forms + Validation — React Hook Form, Zod, Yup, Formik — how Ola's booking form, Swiggy's address form would be built.
