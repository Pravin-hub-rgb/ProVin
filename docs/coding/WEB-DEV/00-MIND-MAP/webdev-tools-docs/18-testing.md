# 18 — Testing: Vitest, Jest, Playwright, Cypress, RTL

> Umbrella: Testing
> Job: Ensure code works correctly — automatically
> Note: For beginners — it's fine to learn testing later, but the concept should be known

---

## Three Types of Testing

```
UNIT TEST:        Does one function work correctly?
  → Is bcrypt.hash working?
  → Is cart total calculated correctly?

INTEGRATION TEST: Do two things work together?
  → Login API → Database → Session → All fine?

E2E TEST (End-to-End): Does the full user flow work?
  → Priya signs up → logs in → adds product → pays
  → In a real browser, on the real app

↑ Higher up = faster and cheaper
↓ Lower down = slower and expensive but realistic
```

---

## Tools

---

### Vitest
**Tag: 🟢 Most Popular 2024 | Fast | Vite-based**

```
What it is: Modern unit testing framework — Vite ecosystem
When to use:
  → New projects — almost always for unit testing
  → Next.js, Vite projects

Difference from Jest:
  → Vitest: Vite-based — much faster, ESM native
  → Jest: Older, slower, CommonJS-first
  → Almost the same API — if you know Jest, you know Vitest

Code feel:
  import { describe, it, expect } from 'vitest'
  import { calculateCartTotal } from './cart'

  describe('Cart', () => {
    it('calculates total correctly', () => {
      const items = [
        { price: 999, quantity: 2 },
        { price: 2999, quantity: 1 }
      ]
      expect(calculateCartTotal(items)).toBe(4997)
    })
  })

Real app example:
  → ShopKaro: Cart total, discount calculation, password validation — unit tests
  → Zomato: Delivery fee calculation logic — unit test

In India: Shifting from Jest after 2023
```

---

### Jest
**Tag: 🟡 Legacy Standard | Still widely used**

```
What it is: Most popular unit testing framework — common with React Testing Library
When to use:
  → Existing Jest codebase
  → Create React App projects (Jest was default)

Difference from Vitest: Slower, older — prefer Vitest for new projects
Status: Maintained, but Vitest has taken the momentum
```

---

### React Testing Library (RTL)
**Tag: 🟢 Component Testing Standard**

```
What it is: Testing React components — from the user's perspective
When to use:
  → Testing React components
  → "User clicked button → what happened?" type tests

Code feel:
  import { render, screen, fireEvent } from '@testing-library/react'
  import AddToCartButton from './AddToCartButton'

  test('add to cart button works', () => {
    render(<AddToCartButton product={mockProduct} />)
    fireEvent.click(screen.getByText('Add to Cart'))
    expect(screen.getByText('Added!')).toBeInTheDocument()
  })

With Vitest/Jest: RTL isn't used alone — Vitest + RTL is the common combo
```

---

### Playwright
**Tag: 🟢 E2E Standard 2024 | Microsoft | Multi-browser**

```
What it is: End-to-end testing — simulate real user actions in a real browser
When to use:
  → Testing critical user flows
  → Checkout, login, payment flow
  → Cross-browser testing (Chrome, Firefox, Safari)

Real app example:
  → Swiggy: "User searches restaurant → adds to cart → checkout" — E2E test
  → ShopKaro: "Signup → Login → Buy product → Order confirmation" — E2E

Code feel:
  import { test, expect } from '@playwright/test'

  test('user can log in', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.fill('[name="email"]', 'priya@gmail.com')
    await page.fill('[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')
  })

Difference from Cypress:
  → Playwright: Multi-browser (Chrome, Firefox, Safari, Mobile)
  → Cypress: Chrome-first, older, JavaScript only
  → 2024: Playwright recommended over Cypress

In India: Growing — E2E tests in critical apps
```

---

### Cypress
**Tag: 🟡 E2E | Was popular 2019-2022 | Declining vs Playwright**

```
What it is: E2E testing framework
When to use: Existing Cypress codebase
Why it's worse than Playwright: Slower, single browser mostly, no mobile

Status: Maintained, but Playwright has taken the lead
```

---

### MSW (Mock Service Worker)
**Tag: 🟢 API Mocking | Testing + Development**

```
What it is: Intercept API calls and return mock responses
When to use:
  → Don't want real API calls in tests
  → Backend not ready — test frontend anyway

Code feel:
  const handlers = [
    http.get('/api/products', () => {
      return HttpResponse.json([
        { id: 1, name: 'Nike Shoes', price: 2999 }
      ])
    })
  ]
  // Now /api/products call happens → no real server, mock response returned
```

---

### Storybook
**Tag: 🟢 Component Development | Design System**

```
What it is: Develop and document components in isolation
When to use:
  → Building a design system
  → Visually testing components
  → Sharing component library with the team

Real app example:
  → Razorpay's UI component library
  → Large companies' design systems

Code feel:
  // Button.stories.jsx
  export const Primary = {
    args: { label: 'Add to Cart', variant: 'primary' }
  }
  export const Disabled = {
    args: { label: 'Out of Stock', disabled: true }
  }
  // Storybook gives a visual browser with all stories
```

---

## Quick Decision

```
Unit tests (functions, utils)?
  → Vitest

React component tests?
  → Vitest + React Testing Library

E2E tests (full user flows)?
  → Playwright

API mocking?
  → MSW

Component documentation/development?
  → Storybook

Existing Jest/Cypress codebase?
  → Leave it — don't rewrite
```

---

## For Beginners

```
Priority order:
1. Build the app first
2. Then learn unit tests (Vitest)
3. Then E2E (Playwright)

Don't skip testing entirely — but keeping it last priority at the start is fine
```

---

## India Reality

```
Startups (small): Testing almost none — move fast
Mid-size:         Some unit tests, E2E for critical flows
Enterprise:       Full testing — unit + integration + E2E
Product companies: Testing culture growing
```

---

## Next Doc

`19-devops.md` — DevOps — Hosting, CI/CD, Monitoring — Vercel, Railway, GitHub Actions, Sentry — deploying the app and tracking errors.
