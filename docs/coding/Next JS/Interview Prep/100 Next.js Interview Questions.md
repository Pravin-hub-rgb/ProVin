# Next.js Interview Questions & Concepts (2026) — 100 Q&A

Deep-researched, App Router-focused (which is standard in 2026). Concepts from the Pages Router are also included where comparison is necessary. Read this alongside the React file — Next.js is built entirely on top of React.

---

## 1. Next.js Basics & Setup

**1. What is Next.js and why use it?**
A production-ready framework built on top of React — it provides file-based routing, multiple rendering strategies (SSR/SSG/ISR/CSR), built-in image/font optimization, API routes, and zero-config bundling. React alone is just a UI library; Next.js provides a complete "batteries-included" solution.

**2. Next.js vs Create React App (CRA) / plain React?**
CRA only provides client-side rendering — everything renders in the browser. Next.js provides server-side rendering, static generation, routing, and API routes built-in without adding extra libraries (like React Router, Express). CRA is also officially deprecated/unmaintained now.

**3. What is the App Router and how is it different from the Pages Router?**
The App Router (`app/` directory, Next.js 13+) is built on React Server Components — it has built-in support for nested layouts, streaming, and Suspense. The Pages Router (`pages/` directory) is the older model where everything behaves like a Client Component by default, and data is fetched via `getServerSideProps`/`getStaticProps`.

**4. What is file-based routing?**
The file/folder structure inside `app/` (or `pages/`) directly maps to URL routes — no extra router config needed. `app/about/page.tsx` automatically becomes the `/about` route.

**5. What is the role of `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` in the App Router?**
`page.tsx` — the unique UI for a route. `layout.tsx` — shared UI that wraps child routes (state is preserved between navigation). `loading.tsx` — automatically becomes a Suspense fallback. `error.tsx` — an error boundary for that segment.

**6. How do you create dynamic routes?**
With square brackets: `app/blog/[slug]/page.tsx` → `/blog/hello-world`. Catch-all: `[...slug]` captures multiple segments. Optional catch-all: `[[...slug]]` also matches when no segment is present.

**7. What is the purpose of Route Groups (`(folderName)`)?**
Parenthesized folders are not included in the URL — they're for organization only (like `(marketing)`, `(auth)`) or to give different route groups different layouts without changing the URL structure.

**8. What are private folders (`_folderName`) used for?**
Folders with an underscore prefix are explicitly excluded from the routing system — used to co-locate components, utils, or helper files alongside route segments without making them accidental routes.

---

## 2. Server Components & Client Components

**9. What are Server Components and why are they the default in the App Router?**
Components that render on the server — their JavaScript is never sent to the client (only HTML/RSC payload). This means smaller bundle sizes, and direct access to the database/secrets without an API layer. They are the default in the App Router due to a performance-first philosophy.

**10. When do you use Client Components?**
When you need interactivity — `useState`, `useEffect`, event handlers (`onClick`), browser-only APIs (localStorage, window). You must add the `'use client'` directive at the top of the file.

**11. How does the `'use client'` directive work?**
It's written at the top of a file — it marks that module and all its imports as part of the client boundary. Everything below it goes into the client-side bundle and gets hydrated in the browser.

**12. How do you compose Server and Client Components together?**
A Server Component can import and render a Client Component (passing data as props). The reverse is not possible directly — a Client Component can only receive a Server Component through the `children` prop (composition pattern).

**13. Where should secrets/API keys be stored in the App Router?**
In Server Components, Server Actions, or Route Handlers — never in Client Components or in env variables with the `NEXT_PUBLIC_` prefix, because those get exposed in the browser bundle.

**14. Why can't hooks run in Server Components?**
Server Components are only rendered once on the server — they have no client-side lifecycle or re-render mechanism. So hooks like `useState`, `useEffect` (which depend on interactivity/re-rendering) don't work inside them.

**15. When should you decide a component should be a Server Component or Client Component?**
Default to Server. Only make it a Client Component when: you need interactivity (onClick, onChange), you need state/effects, you need a browser-only API, or you're using third-party libraries with hooks. "Push the client boundary as low as possible" — don't make an entire page a client component just for one button.

---

## 3. Rendering Strategies

**16. What is SSR (Server-Side Rendering)?**
Each request generates fresh HTML on the server with new data, then sends it to the client. Best for fresh/personalized content, but since server work happens on every request, TTFB is higher than SSG.

**17. What is SSG (Static Site Generation)?**
HTML is generated at build time — served from a CDN, the fastest option. Ideal for content that doesn't change frequently (marketing pages, blog posts).

**18. What is ISR (Incremental Static Regeneration)?**
Allows static pages to be regenerated in the background at intervals after build, without rebuilding the entire site — set with the `revalidate` time. It's a combination of static speed and occasionally fresh data.

**19. When do you use CSR (Client-Side Rendering) in Next.js?**
For highly interactive, user-specific dashboards where SEO doesn't matter, or data that's only relevant after login — inside a `'use client'` component using `useEffect`/data-fetching libraries.

**20. How is static vs dynamic rendering decided in the App Router?**
If a route uses any dynamic function (`cookies()`, `headers()`, `searchParams`, or `fetch` with `no-store`), the route automatically becomes Dynamic. Otherwise, Next.js renders it as Static at build time.

**21. What is Partial Prerendering (PPR)?**
Combines a static shell (served instantly) and dynamic holes (filled by streaming at request time, through Suspense boundaries) in a single page — best of both static and dynamic in one route.

**22. What is Streaming SSR?**
Instead of sending the full page's HTML all at once, Next.js streams it in chunks as data becomes ready (through `<Suspense>` boundaries) — the user starts seeing content quickly instead of waiting on a blank screen.

---

## 4. Data Fetching

**23. How do you fetch data in the App Router?**
Directly inside a Server Component using `async/await` with `fetch()` (or an ORM call) — there's no special function like `getServerSideProps` needed, the component itself can be async.

**24. What are the cache options for `fetch()` in Next.js?**
`cache: 'force-cache'` (default, behaves like SSG), `cache: 'no-store'` (fresh on every request, like SSR), `next: { revalidate: N }` (behaves like ISR — refreshes after N seconds).

**25. Parallel vs sequential data fetching?**
Sequential: start one fetch only after waiting for the previous to complete (waterfall, slow). Parallel: initiate multiple `fetch()` calls at once (`Promise.all`) so total wait time is minimized.

**26. What is Request Memoization?**
Within a single render pass, multiple `fetch()` calls to the same URL/options are automatically deduplicated — only one actual network request is made, the rest reuse the cached result. This is per-request, not persistent.

**27. What is the Data Cache?**
A server-side, persistent cache that stores `fetch()` responses across requests and deployments (filesystem-backed) — controlled via the `revalidate` option or `revalidateTag`/`revalidatePath`.

**28. What are Route Handlers?**
Files in `app/api/route.ts` that define server-side API endpoints (GET, POST, etc.) — used for webhooks, external integrations, or when secrets need to be hidden from the client. They are the App Router equivalent of `pages/api` from the Pages Router.

**29. What are Server Actions?**
Async functions marked with the `'use server'` directive that can be called directly from a form action or event handler — they handle mutations (create/update/delete) like an RPC call from client to server, without manually creating an API route.

**30. What is the use case for `unstable_cache`?**
When data comes from a database/ORM (non-fetch source) and you want the same caching/revalidation behavior as the Data Cache. `fetch()` only caches HTTP requests, so you need to wrap ORM calls in this function.

---

## 5. Caching — Four Layers (Deep Dive)

**31. What are the 4 caching layers in Next.js?**
(1) Request Memoization — per-render deduplication. (2) Data Cache — persistent server cache for fetch. (3) Full Route Cache — static HTML + RSC payload for routes. (4) Router Cache — client-side (browser) cache for visited segments.

**32. What does the Full Route Cache do?**
Stores the fully rendered HTML + RSC payload of static routes on the server (at build time or after first request) — subsequent requests serve the pre-rendered output without re-rendering.

**33. What does the Router Cache (client-side) do?**
An in-memory cache in the browser of visited route segments — navigation feels instant because already-visited pages don't need to be fetched from the server again. Static routes persist for ~5 min, dynamic routes for ~30 sec (Next.js 15 defaults).

**34. What is the difference between `revalidatePath` and `revalidateTag`?**
`revalidatePath('/products')` — invalidates the cache for a specific path. `revalidateTag('products')` — invalidates the cache for all fetch calls associated with that tag (even across multiple routes) — a more granular, reusable approach.

**35. How does cache invalidation cascade?**
When the Data Cache is invalidated, dependent Full Route Cache entries are regenerated. When the Full Route Cache is updated, the Router Cache (client-side) expires on the next navigation/Server Action — layers affect each other in a cascade.

**36. How do you debug if stale data is showing?**
Check layer by layer: first the Router Cache (client-side — try navigating away/back or call `router.refresh()`), then the Full Route Cache (did you run `revalidatePath`?), then the Data Cache (did you run `revalidateTag` on the correct tag?).

---

## 6. Layouts, Navigation & Special Files

**37. What is the Root Layout and why is it mandatory?**
`app/layout.tsx` — the top-level layout for every App Router app, which must contain `<html>` and `<body>` tags. It wraps the entire app and is required.

**38. How do Nested Layouts work?**
Each folder can have its own `layout.tsx` that wraps that segment and its children. Layout is not re-rendered on navigation (state is preserved) — only `page.tsx` changes.

**39. How does the `<Link>` component prefetch?**
When a link enters the viewport (in production), Next.js automatically prefetches the target route's data and code in the background — navigation feels instant on click.

**40. What are Parallel Routes?**
Using the `@folder` naming convention, multiple pages can be rendered simultaneously within a single layout (like a dashboard showing analytics + notifications panel at once) — each with independent loading and error states.

**41. What are Intercepting Routes?**
Using syntax like `(.)folder` — a route is "intercepted" and rendered in a different context (like an Instagram-style photo modal that changes the URL but shows an overlay on top of the feed; on page refresh, the full page is shown too).

**42. What does the `loading.tsx` file do automatically?**
It creates a React Suspense boundary for that route segment — while an async Server Component is fetching data, the UI from `loading.tsx` is automatically displayed.

**43. What do `not-found.tsx` and `notFound()` do?**
Calling `notFound()` renders the nearest `not-found.tsx` for the current route (with a 404 status) — used when dynamic route data doesn't exist (like an invalid slug).

**44. How is `template.tsx` different from `layout.tsx`?**
`layout.tsx` preserves state on navigation (the same instance is reused). `template.tsx` creates a new instance on every navigation (state resets) — useful when you need enter/exit animations or a per-navigation reset.

---

## 7. Middleware, Auth & Metadata

**45. What is Middleware and where does it run?**
`middleware.ts` (in the root) — runs on the Edge Runtime before the request is completed. Used for redirects, rewrites, auth checks, and modifying headers — it intercepts before the page renders.

**46. How do you implement authentication with Middleware?**
Check the cookie/token in the Middleware; if invalid/missing, redirect to the login page with `NextResponse.redirect()` — the page renders/data fetches are protected before they even start (but also keep page-level checks as defense in depth).

**47. What is the difference between Edge Runtime and Node.js Runtime?**
The Edge Runtime is lightweight, globally distributed, and has fast cold starts, but supports limited APIs (no full Node.js APIs, no filesystem access). The Node.js Runtime provides full Node APIs but is heavier and has slower cold starts.

**48. What is the Metadata API?**
A type-safe way to define metadata — `export const metadata = {...}` (static) or `generateMetadata()` (dynamic, async) — for title, description, Open Graph tags, etc. It replaces the old manual `<Head>` approach.

**49. How do you generate dynamic metadata (like a product page title)?**
Write an async `generateMetadata({ params })` function that fetches data based on params (like the product name) and returns it in a metadata object — gives you per-page dynamic titles/descriptions for SEO.

**50. What does `generateStaticParams` do?**
For dynamic route segments (`[slug]`), it defines which specific paths should be pre-rendered at build time — the App Router equivalent of `getStaticPaths` from the Pages Router.

---

## 8. Image, Font & Script Optimization

**51. What are the benefits of the `next/image` component?**
Automatic lazy loading, responsive sizing (srcset), modern format conversion (WebP/AVIF), and layout shift prevention (CLS) — a lot of work that you'd do manually with an `<img>` tag is automated.

**52. When do you use the `priority` prop in `next/image`?**
For above-the-fold, LCP (Largest Contentful Paint) images — it skips lazy loading and eagerly loads the image, used for the critical image that needs to load immediately.

**53. What does `next/font` optimize?**
Fonts are self-hosted at build time (avoiding external Google Fonts requests), with automatic `font-display` optimization, and it prevents layout shifts (CLS) that commonly occur when custom fonts load.

**54. What is the purpose of the `next/script` component?**
An optimized way to load third-party scripts (analytics, ads) — the `strategy` prop (`beforeInteractive`, `afterInteractive`, `lazyOnload`) controls when the script loads/executes, minimizing the impact on page performance.

---

## 9. Performance & SEO

**55. What built-in help does Next.js provide for SEO?**
Server-side rendering (crawlers get fully-rendered HTML), the Metadata API, automatic sitemap/robots.txt generation, image optimization (improves Core Web Vitals), and fast page loads (a ranking factor).

**56. How do you improve Core Web Vitals in Next.js apps?**
`next/image` (for CLS), `next/font` (for CLS/FOUT), code splitting/dynamic imports (for LCP/FID), Server Components (less JS → faster TTI), and Streaming/Suspense (perceived performance).

**57. What does `next/dynamic` do?**
It dynamically imports a component (client-side code splitting) — a Next.js-friendly wrapper around `React.lazy` + `Suspense`; with the `ssr: false` option, you can make a component purely client-only.

**58. What are strategies to optimize bundle size?**
Use Server Components (their JS never reaches the client), use dynamic imports for heavy libraries, use tree-shaking-friendly imports, audit with `next/bundle-analyzer`, and avoid barrel file over-exports.

**59. How do you avoid waterfall data-fetching problems in Next.js?**
Fetch data in parallel from sibling Server Components (`Promise.all` or independent async components that stream in parallel via Suspense) instead of awaiting one after another.

---

## 10. Environment, Deployment & Migration

**60. How do environment variables work in Next.js?**
They're loaded from `.env.local`, `.env.production`, etc. files. Variables with the `NEXT_PUBLIC_` prefix are exposed in the browser bundle — all others remain server-only accessible (safe for secrets).

**61. Why is deploying to Vercel special for Next.js?**
Vercel, the platform made by the creators of Next.js, supports all features (ISR, Edge Middleware, Image Optimization) with zero config. Self-hosting (Docker/Node server) is also possible, but some features (like filesystem-based cache) require sticky routing/shared cache (Redis) in multi-instance setups.

**62. How do you approach migrating from the Pages Router to the App Router?**
Migrate incrementally, route-by-route (both routers can coexist) — start with non-critical/low-risk routes, convert `getServerSideProps`/`getStaticProps` into async Server Component data fetching, and test at every step.

**63. What is the role of `next.config.js`?**
It configures build/runtime behavior — image domains, redirects/rewrites, environment-specific settings, enabling experimental features, custom webpack config, and output mode (standalone, export).

**64. What does `output: 'export'` do?**
Exports the entire app as static HTML/CSS/JS files (no Node.js server needed) — for static hosting (S3, GitHub Pages). However, it doesn't support dynamic features like SSR/ISR/Server Actions.

---

## 11. Pages Router (Legacy — still asked)

**65. What does `getStaticProps` do?**
Fetches data at build time and statically pre-renders the page (SSG) — in the Pages Router. In the App Router, its equivalent is an async Server Component + `fetch`.

**66. What does `getServerSideProps` do?**
Fetches data on the server on every request (SSR) — in the Pages Router. In the App Router, `fetch(url, { cache: 'no-store' })` is used instead.

**67. What does `getStaticPaths` do?**
For dynamic routes (`[id].js`), it defines which paths should be pre-rendered at build time, and the `fallback` option (`false`, `true`, `blocking`) controls the behavior for undefined paths. In the App Router, `generateStaticParams` is the equivalent.

**68. How are API Routes (`pages/api`) different from Route Handlers?**
Both create server endpoints, but Route Handlers (App Router, `route.ts`) use Web Standard Request/Response APIs and support both Edge and Node runtimes — a more modern, flexible approach.

---

## 12. Advanced Concepts & Miscellaneous

**69. What is a Hydration Error and how do you fix it?**
When the server-rendered HTML and the client's first render don't match (like using `Date.now()`, `Math.random()`, or browser-only APIs during render) — React throws a console warning. Fix: set those dynamic values in `useEffect` (client-only) or use `suppressHydrationWarning` (last resort).

**70. How does `useId` help solve hydration issues?**
It generates stable IDs that stay consistent between server and client renders — for form labels or keys, avoiding the random IDs that cause hydration mismatches.

**71. What are Route Segment Config options?**
Top-level exports like `dynamic`, `revalidate`, `fetchCache`, `runtime` that explicitly control a route segment's rendering/caching behavior (like `dynamic = 'force-dynamic'`).

**72. What do `dynamic = 'force-dynamic'` and `force-static` do?**
`force-dynamic` always server-renders the route (bypassing caching, fresh on every request). `force-static` forces the route to be static even if dynamic functions are being used.

**73. Why are Suspense boundaries used in multiple places in the App Router?**
So that different data-fetching components get independent loading states — a slow component doesn't block the entire page; the rest of the content streams in immediately while the slow part shows its own spinner.

**74. How do you implement Optimistic UI updates with Server Actions?**
Combine the `useOptimistic` hook (React 19) with a Server Action — when the action is triggered, the UI updates immediately; when the action completes or fails, the real state reconciles or reverts.

**75. How does Next.js fit into monorepo setups?**
With tools like Turborepo or Nx, multiple Next.js apps and shared packages (UI components, utils) are managed in a single repo — build caching and incremental builds help scale to large teams.

**76. How do you handle internationalization (i18n) in the Next.js App Router?**
Detect and redirect on locale via Middleware, keep a `[lang]` dynamic segment in the route structure, and use libraries like `next-intl` or `next-i18next` to manage translations.

**77. What is Draft Mode?**
A CMS preview feature — when enabled, static/cached content is bypassed and fresh (unpublished/draft) content is shown; it's a cookie-based toggle that's only on for authenticated editors.

**78. How do you choose the `revalidate` number in a production app?**
Based on data volatility — long durations (hours) for stable content (blog posts), short durations or tag-based on-demand revalidation for frequently changing data (price/stock).

**79. How does `React.cache()` help with Next.js data fetching?**
It allows non-`fetch` functions (like database calls) to be memoized at the request level — if multiple components in the same render pass request the same data, only one actual call is made.

**80. When do you use the "static shell + dynamic holes" pattern (in PPR context)?**
When most of a page can be static (layout, marketing copy) but specific parts (user-specific greeting, live stock price) need fresh data per request — with PPR, both are combined in a single response.

---

## 13. System Design / Scenario-Style Questions

**81. You need to build a product detail page where the title/description stay static but price/stock should be fresh — what approach?**
Keep the page mostly Static/ISR for stable content. For price/stock, use a separate Server Component with a short `revalidate` or tag-based `revalidateTag` on inventory update, or create a dynamic hole with PPR — don't treat the whole page as one rendering mode.

**82. An e-commerce cart button needs to be interactive but the rest of the page is static — how do you structure it?**
Keep the page as a Server Component (data fetching, SEO). Only make the "Add to Cart" button a small Client Component (`'use client'`) that calls a Server Action for the mutation — the client bundle stays minimal.

**83. A dashboard has multiple independent widgets that load at different speeds — how do you approach it?**
Give each widget its own Suspense boundary (independent async Server Components) so that a slow widget doesn't block the others — with streaming, each one renders at its own pace.

**84. How do you design a shared layout between authenticated and public routes?**
Use Route Groups — `(public)` and `(auth)` groups can each have their own `layout.tsx` while sharing a common root layout. Middleware matches the auth check to the appropriate group.

**85. A high-traffic blog where content editors frequently publish new posts — what's your rendering strategy?**
ISR with on-demand revalidation — generate statically at build time, and when an editor publishes, trigger `revalidatePath`/`revalidateTag` via a webhook instead of using fixed time-based revalidation, so fresh content reflects immediately.

---

## 14. Common Interview "Gotchas"

**86. Clarify the confusion: a component with `'use client'` still renders on the server.**
The `'use client'` directive only includes the component in the client bundle for hydration/interactivity — the initial render still happens on the server (SSR), then it hydrates on the client. "Client-only" doesn't mean "renders only in the browser."

**87. Why does `onClick` throw an error inside a Server Component?**
Server Components are rendered on the server and produce plain HTML/RSC payload — event handlers (functions) cannot be serialized into HTML. So if you need interactivity, that part must be a Client Component.

**88. Explain why invalidating a `revalidate` cache doesn't mean the whole page revalidates.**
A route's rendering mode is determined by individual fetch options — if one fetch is `no-store`, the whole route becomes dynamic, but if all fetches use `revalidate: N`, the Full Route Cache updates based on N. Per-fetch granularity can confuse expectations.

**89. Why is the browser still showing old data even after `revalidateTag`?**
Because `revalidateTag`/`revalidatePath` invalidate the Data Cache and Full Route Cache, but the Router Cache (client-side) doesn't clear automatically — you have to wait for a navigation or `router.refresh()` to trigger it.

**90. An env variable is set in `.env` but it's `undefined` on the client — why?**
The `NEXT_PUBLIC_` prefix was not added — without the prefix, env variables are only accessible server-side, not exposed in the client bundle (intentional, for security).

---

## 15. Testing, TypeScript & Tooling

**91. What's the standard approach to testing Next.js apps?**
Unit/component tests: Jest/Vitest + React Testing Library. E2E tests: Playwright or Cypress — testing entire user flows (navigation, forms, auth) through browser automation.

**92. Why is testing Server Components tricky?**
Because they can be async and depend on the server runtime — traditional React Testing Library render approaches don't work directly. E2E tests (Playwright) or framework-specific testing utilities tend to be more reliable for them.

**93. Why does Next.js strongly recommend TypeScript (especially for senior roles)?**
It makes refactoring safer thanks to type safety across Server/Client Component boundaries, route params, and Server Action payloads, and catches bugs early in large App Router codebases where there are many async boundaries.

**94. What is Turbopack?**
Next.js's new Rust-based bundler (a replacement for Webpack, via `next dev --turbo`) — designed for much faster local dev builds and HMR, especially for large codebases.

**95. What do `next lint` and the ESLint config do?**
They enforce Next.js-specific rules (like use `next/image` instead of `<img>`, hooks rules, accessibility checks) — built-in ESLint config with `eslint-config-next`.

---

## 16. Career / Trade-off Style Questions

**96. "SSR vs SSG vs ISR — when do you use each?" — how do you answer structured?**
Decide based on content frequency + personalization: rarely-changing/non-personalized → SSG. Frequently-changing but not real-time → ISR. Per-request personalized/real-time → SSR. Highly interactive, non-SEO dashboard → CSR.

**97. "Why Next.js over plain React + Express backend?" — how do you answer?**
Next.js combines frontend and backend (Route Handlers) in a single codebase, provides built-in optimizations (image, font, code-splitting), and gives SEO-critical rendering strategies (SSR/SSG/ISR) out of the box — reducing the overhead of maintaining a separate Express server for small-medium teams.

**98. An interviewer asks "how did you debug a caching bug in production" — what do you highlight?**
Explain the four-layer mental model (Request Memoization → Data Cache → Full Route Cache → Router Cache), which layer was the culprit, and what fix you used (`revalidateTag`, `router.refresh()`, or a cache option change) — showing a systematic debugging process is the signal, not just the answer.

**99. "What's the risk of migrating to the App Router on a large production app?" — what do you say?**
Data-fetching patterns must be fully redesigned (`getServerSideProps` → async Server Components), Server/Client boundary decisions must be made for every component, and a new caching mental model must be learned — for this reason, an incremental, route-by-route migration with heavy testing is recommended, not a big-bang rewrite.

**100. What should a senior-level answer look like for any Next.js design question?**
Think in terms of execution boundaries: "Where will this run — server, client, build time, or request time?" Then discuss around it: SEO, freshness, secrets, bundle size, error/loading states. This mental model solves most interview scenarios in a structured way.

---

### Bonus tip
Don't just memorize feature lists for Next.js interviews — apply the "where does this render?" mental model (server/client/build/request) everywhere. That's the biggest signal interviewers see between a junior and senior candidate.

(End of file - total 371 lines)
