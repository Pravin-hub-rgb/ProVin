# 06 — Animation: Framer Motion, GSAP, CSS Animations

> Umbrella: Frontend → Animation
> Purpose: Motion, transitions, interactions — making the app feel smooth and alive

---

## What This Category Solves

Animation isn't just "nice to have" — it **communicates UX**:
- Button click → Loading animation → Done
- Modal open/close → Smooth transition
- Page change → Fade in
- Cart item added → Bounce animation

Without animation → app feels lifeless. Too much animation → annoying.

---

## Tools

---

### CSS Animations / Transitions
**Tag: 🟢 Built-in | Simple Cases | No Install**

```
When to use:
  → Simple hover effects
  → Fade in/out
  → Loading spinners
  → Button states

Code feel:
  /* With Tailwind */
  <button className="transition-colors duration-200 hover:bg-blue-600">
  <div className="animate-spin">  /* Built-in spinner */
  <div className="animate-pulse">  /* Skeleton loading */

  /* Plain CSS */
  .card { transition: transform 0.2s; }
  .card:hover { transform: translateY(-4px); }

Real app example:
  → ShopKaro: Button hover effects, skeleton loading → CSS animations enough
  → Swiggy: Simple hover cards → CSS transitions

When not enough:
  → Complex sequences
  → Gesture-based (drag, swipe)
  → Scroll-triggered animations
  → Page transitions
```

---

### Framer Motion
**Tag: 🟢 Most Popular React Animation | Recommended**

```
What it is: Animation library for React — declarative, powerful
When to use:
  → React/Next.js project
  → Page transitions, modal animations
  → Drag and drop
  → Scroll-triggered animations
  → List item add/remove animations

Real app example:
  → Swiggy: Bounce animation when cart item added
  → Zomato: Restaurant card hover — lift effect
  → CRED: Premium feel — buttery smooth transitions
  → Razorpay checkout: Payment success animation

Code feel:
  import { motion, AnimatePresence } from 'framer-motion'

  // Simple fade in
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    Content
  </motion.div>

  // List items — animate on add/remove
  <AnimatePresence>
    {items.map(item => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
      >
        {item.name}
      </motion.div>
    ))}
  </AnimatePresence>

Pros:
  → Declarative — animation via HTML attributes
  → Gesture support (drag, pan, hover)
  → AnimatePresence — exit animations (animates even when element removed)
  → Layout animations — element repositions smoothly

Cons:
  → Bundle size: ~45KB
  → Learning curve for complex cases

In India: Standard in apps wanting premium feel
```

---

### GSAP (GreenSock Animation Platform)
**Tag: 🟢 Complex Animations | Marketing Sites | Industry Pro**

```
What it is: Most powerful JavaScript animation library — framework-agnostic
When to use:
  → Complex scroll-based storytelling (landing pages)
  → SVG animations
  → Timeline-based animations (sequences)
  → Marketing/portfolio sites
  → Animations not possible with Framer Motion

Real app example:
  → Apple's website (iPhone launch pages)
  → Stripe's landing page
  → Indian ed-tech companies' marketing sites (fancy animations)

Difference from Framer Motion:
  → GSAP: More powerful, complex timelines, framework-agnostic
  → Framer Motion: React-specific, declarative, easier for UI animations

Code feel:
  gsap.fromTo('.hero-text',
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  )

  // Timeline — sequence
  const tl = gsap.timeline()
  tl.from('.logo', { opacity: 0 })
    .from('.nav', { y: -50 })
    .from('.hero', { scale: 0.8 })

When NOT to use:
  → Simple UI animations — Framer Motion better
  → SSR apps in Next.js — setup complex

In India: Agency work, marketing sites, ed-tech landing pages
```

---

### React Spring
**Tag: 🟡 Physics-based | Was popular 2020-21**

```
What it is: Physics-based animations — spring (bouncy) feel
When to use:
  → Existing React Spring codebase
  → Specifically need physics-based feel

Status: Framer Motion took more popularity
Framer Motion also has spring animations
```

---

### Lottie
**Tag: 🔵 After Effects files | Specific use case**

```
What it is: Play Adobe After Effects animations on Web/Mobile
When to use:
  → Designer created a complex animation in After Effects
  → Animate onboarding illustrations
  → Success/Error animations (check mark, X mark)

Real app example:
  → PhonePe's payment success animation (spinning coin)
  → CRED's reward animation
  → Swiggy's "Order Placed" animation

Workflow:
  Designer → After Effects → Lottie export (.json) → Developer → lottie-react

Code feel:
  import Lottie from 'lottie-react'
  import successAnimation from './success.json'

  <Lottie animationData={successAnimation} loop={false} />

When not useful:
  → No designer or no After Effects
  → Simple animations — CSS or Framer Motion better
```

---

## Quick Decision

```
Simple hover, transitions?
  → CSS / Tailwind (animate-*, transition-)

React app, UI animations (modals, lists, page transitions)?
  → Framer Motion

Complex scroll storytelling, marketing site?
  → GSAP

Designer created it in After Effects?
  → Lottie

Physics/bouncy feel?
  → Framer Motion (has spring option)
```

---

## India Reality

```
Startup apps:        Framer Motion (premium feel)
Marketing sites:     GSAP (agency work)
Simple apps:         CSS animations enough
Fintech/Payments:    Lottie (success animations) + Framer Motion
```

---

## Next Doc

`07-frontend-frameworks.md` — Meta Frameworks — Next.js, Remix, Astro, Nuxt — when Next.js, when Astro, when Remix — what's trending in the industry.
