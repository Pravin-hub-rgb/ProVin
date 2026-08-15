# Next.js Interview Questions & Concepts (2026) — 100 Q&A

Deep-researched, App Router-focused (jo 2026 mein standard hai). Pages Router ke concepts bhi diye hain jaha compare karna zaroori tha. React wali file ke saath combo mein padho — Next.js React ke upar hi bana hai.

---

## 1. Next.js Basics & Setup

**1. Next.js kya hai aur kyu use karte hain?**
React ke upar bana ek production-ready framework — file-based routing, multiple rendering strategies (SSR/SSG/ISR/CSR), built-in image/font optimization, API routes, aur zero-config bundling deta hai. React akela sirf UI library hai; Next.js poora "batteries-included" solution deta hai.

**2. Next.js vs Create React App (CRA) / plain React?**
CRA sirf client-side rendering deta hai — sab kuch browser mein render hota hai. Next.js server-side rendering, static generation, routing, API routes built-in deta hai bina extra libraries (React Router, Express) add kiye. CRA ab officially deprecated/unmaintained bhi hai.

**3. App Router kya hai aur Pages Router se kaise alag hai?**
App Router (`app/` directory, Next.js 13+) React Server Components pe based hai — nested layouts, streaming, Suspense built-in support karta hai. Pages Router (`pages/` directory) purana model hai jaha sab kuch by default Client Component jaisa behave karta hai aur `getServerSideProps`/`getStaticProps` se data fetch hoti thi.

**4. File-based routing kya hai?**
`app/` (ya `pages/`) folder ke andar file/folder structure directly URL routes banata hai — extra router config likhne ki zaroorat nahi. `app/about/page.tsx` automatically `/about` route ban jaata hai.

**5. `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` files ka role kya hai App Router mein?**
`page.tsx` — route ka unique UI. `layout.tsx` — shared UI jo children routes ko wrap karta hai (state preserve hoti hai navigation ke beech). `loading.tsx` — Suspense fallback automatically. `error.tsx` — us segment ka error boundary.

**6. Dynamic routes kaise banate hain?**
Square brackets se: `app/blog/[slug]/page.tsx` → `/blog/hello-world`. Catch-all: `[...slug]` multiple segments capture karta hai. Optional catch-all: `[[...slug]]` bina segment ke bhi match karta hai.

**7. Route Groups (`(folderName)`) ka purpose kya hai?**
Parentheses wala folder URL mein include nahi hota — sirf organization ke liye (jaise `(marketing)`, `(auth)`) ya alag-alag route groups ko alag layouts dene ke liye bina URL structure change kiye.

**8. Private folders (`_folderName`) kis liye hote hain?**
Underscore prefix wale folders routing system se explicitly exclude ho jaate hain — components, utils, ya helper files ko route segments ke saath colocate karne ke liye bina unhe accidental route banaye.

---

## 2. Server Components & Client Components

**9. Server Components kya hain aur App Router mein default kyu hain?**
Components jo server par render hote hain — unka JS client ko bhejte hi nahi (sirf HTML/RSC payload). Bundle size chhota, database/secrets seedha access ho sakta hai bina API layer ke. App Router mein default hote hain performance-first philosophy ke wajah se.

**10. Client Components kab use karte hain?**
Jab interactivity chahiye ho — `useState`, `useEffect`, event handlers (`onClick`), browser-only APIs (localStorage, window). File ke top pe `'use client'` directive likhna padta hai.

**11. `'use client'` directive kaise kaam karta hai?**
File ke sabse upar likha jaata hai — us module aur uske saare imports ko client boundary mark karta hai. Iske neeche wale sab components client-side bundle mein jaate hain aur browser mein hydrate hote hain.

**12. Server aur Client Components ko saath kaise compose karte hain?**
Server Component apne andar Client Component import/render kar sakta hai (data as props pass karke). Ulta nahi ho sakta directly — Client Component ke andar Server Component "children prop" ke through pass kiya jaa sakta hai (composition pattern).

**13. Secrets/API keys App Router mein kaha rakhne chahiye?**
Server Components, Server Actions, ya Route Handlers mein — kabhi bhi Client Component ya `NEXT_PUBLIC_` prefix wale env variables mein nahi, kyunki wo browser bundle mein expose ho jaate hain.

**14. Server Components mein hooks kyu nahi chal sakte?**
Server Components sirf ek baar server par render hote hain, unke paas koi client-side lifecycle/re-render mechanism nahi hota — isliye `useState`, `useEffect` jaise hooks (jo interactivity/re-render pe depend karte hain) inside kaam nahi karte.

**15. Kab decide karein ki component Server ho ya Client?**
Default Server rakho. Client tabhi banao jab: interactivity chahiye (onClick, onChange), state/effects chahiye, browser-only API chahiye, ya third-party library hooks use karti ho. "Push client boundary jitna neeche ho sake" — poora page client mat banao sirf ek button ke liye.

---

## 3. Rendering Strategies

**16. SSR (Server-Side Rendering) kya hai?**
Har request par server HTML generate karta hai fresh data ke saath, phir client ko bhejta hai. Fresh/personalized content ke liye best, lekin har request pe server work hota hai isliye TTFB (time to first byte) SSG se zyada hota hai.

**17. SSG (Static Site Generation) kya hai?**
Build time par hi HTML generate ho jaata hai — CDN se serve hota hai, sabse fast option. Content jo frequently change nahi hota (marketing pages, blog posts) ke liye ideal.

**18. ISR (Incremental Static Regeneration) kya hai?**
Static pages ko build ke baad bhi periodically background mein regenerate karne deta hai bina poora site rebuild kiye — `revalidate` time set karke. Static ki speed + kabhi kabhi fresh data ka combo.

**19. CSR (Client-Side Rendering) kab use karte hain Next.js mein?**
Highly interactive, user-specific dashboards jaha SEO matter nahi karta, ya data jo sirf login ke baad relevant hai — `'use client'` component ke andar `useEffect`/data fetching libraries se.

**20. Static vs Dynamic Rendering App Router mein kaise decide hota hai?**
Agar route mein koi dynamic function use ho (`cookies()`, `headers()`, `searchParams`, ya `fetch` with `no-store`) toh route automatically Dynamic ban jaata hai — warna Next.js usse build time par Static render kar deta hai.

**21. Partial Prerendering (PPR) kya hai?**
Ek hi page ke andar static shell (instantly serve hone wala) aur dynamic holes (jo request time par stream hoke fill hote hain, Suspense boundaries ke through) ko combine karta hai — best of static + dynamic ek hi route mein.

**22. Streaming SSR kya hai?**
Poori page ka HTML ek saath bhejne ke bajaye, Next.js chunks mein stream karta hai jaise-jaise data ready hota hai (`<Suspense>` boundaries ke through) — user ko jaldi kuch dikhna shuru ho jaata hai instead of blank screen tak wait karna.

---

## 4. Data Fetching

**23. App Router mein data kaise fetch karte hain?**
Directly Server Component ke andar `async/await` ke saath `fetch()` (ya ORM call) — koi `getServerSideProps` jaisi special function ki zaroorat nahi, component khud async ho sakta hai.

**24. `fetch()` ke cache options kya hote hain Next.js mein?**
`cache: 'force-cache'` (default, SSG jaisa behavior), `cache: 'no-store'` (har request fresh, SSR jaisa), `next: { revalidate: N }` (ISR jaisa — N seconds baad refresh).

**25. Parallel vs Sequential data fetching?**
Sequential: ek fetch complete hone ka wait karke doosra start hota hai (waterfall, slow). Parallel: multiple `fetch()` calls ek saath initiate karo (`Promise.all`) taaki total wait time kam ho.

**26. Request Memoization kya hai?**
Ek hi render pass ke andar same URL/options wali multiple `fetch()` calls automatically deduplicate ho jaati hain — sirf ek hi actual network request jaati hai, baaki cached result reuse karte hain. Ye per-request hai, persistent nahi.

**27. Data Cache kya hai?**
Server-side, persistent cache jo `fetch()` responses ko requests/deployments ke beech store karta hai (filesystem-backed) — `revalidate` option ya `revalidateTag`/`revalidatePath` se control hoti hai.

**28. Route Handlers kya hote hain?**
`app/api/route.ts` files jo server-side API endpoints define karte hain (GET, POST, etc.) — webhooks, external integrations, ya jab secrets client se hide karne ho tab use hote hain. Pages Router ke `pages/api` ka App Router equivalent.

**29. Server Actions kya hain?**
`'use server'` directive wale async functions jo directly form action ya event handler se call ho sakte hain — bina manually API route banaye mutations (create/update/delete) handle karte hain, client se server tak RPC-jaisa call.

**30. `unstable_cache` ka use case kya hai?**
Jab data database/ORM call se aaye (non-fetch source) aur usse bhi Data Cache jaisa caching/revalidation behavior chahiye ho — `fetch()` sirf HTTP requests ke liye cache karta hai, ORM calls ke liye ye function wrap karna padta hai.

---

## 5. Caching — Four Layers (Deep Dive)

**31. Next.js ke 4 caching layers kaunse hain?**
(1) Request Memoization — per-render dedup. (2) Data Cache — persistent server cache for fetch. (3) Full Route Cache — static HTML + RSC payload for routes. (4) Router Cache — client-side (browser) cache for visited segments.

**32. Full Route Cache kya karta hai?**
Static routes ka poora rendered HTML + RSC payload build time par (ya first request ke baad) server par store karta hai — subsequent requests seedha pre-rendered output serve karte hain bina re-render kiye.

**33. Router Cache (client-side) kya karta hai?**
Browser mein visited route segments ka in-memory cache — navigation instant feel hoti hai kyunki already-visited pages dobara server se fetch nahi karne padte. Static routes ~5 min, dynamic routes ~30 sec (Next.js 15 defaults) tak persist karte hain.

**34. `revalidatePath` vs `revalidateTag` mein difference?**
`revalidatePath('/products')` — specific path ka cache invalidate karta hai. `revalidateTag('products')` — us tag se associated saare fetch calls ka cache invalidate karta hai (chahe multiple routes mein use ho raha ho) — zyada granular/reusable approach.

**35. Cache invalidation "outward flow" kaise hota hai?**
Data Cache invalidate hone se dependent Full Route Cache regenerate hota hai. Full Route Cache update hone se Router Cache (client) next navigation/Server Action par expire ho jaata hai — layers ek doosre ko cascade mein affect karte hain.

**36. Stale data dikhne par debug kaise karein?**
Layer-by-layer check karo: pehle Router Cache (client — navigate away/back ya `router.refresh()` try karo), phir Full Route Cache (`revalidatePath` chala ya nahi), phir Data Cache (`revalidateTag` sahi tag pe chala ya nahi).

---

## 6. Layouts, Navigation & Special Files

**37. Root Layout kya hai aur kyu mandatory hai?**
`app/layout.tsx` — har App Router app ka top-level layout, jisme `<html>` aur `<body>` tags hone chahiye. Ye poori app ko wrap karta hai aur required hai.

**38. Nested Layouts kaise kaam karte hain?**
Har folder apna `layout.tsx` de sakta hai jo us segment aur uske children ko wrap karta hai. Navigation ke beech layout re-render nahi hota (state preserve hoti hai) — sirf `page.tsx` part change hota hai.

**39. `<Link>` component prefetching kaise karta hai?**
Viewport mein aane par (production mein) Next.js automatically link ke target route ka data/code prefetch kar leta hai background mein — click karte hi instant navigation feel hoti hai.

**40. Parallel Routes kya hain?**
`@folder` naming convention se ek hi layout ke andar multiple pages simultaneously render kar sakte ho (jaise dashboard mein ek saath analytics + notifications panel) — independent loading/error states ke saath.

**41. Intercepting Routes kya hain?**
`(.)folder` jaisi syntax se — ek route ko dusre context mein "intercept" karke render karte hain (jaise Instagram jaisa photo modal jo URL change karta hai but feed ke upar overlay dikhata hai, page refresh pe full page bhi dikha sakta hai).

**42. `loading.tsx` file automatically kya karta hai?**
Us route segment ke liye React Suspense boundary create karta hai — jab tak async Server Component data fetch kar raha ho, `loading.tsx` ka UI automatically dikhta hai.

**43. `not-found.tsx` aur `notFound()` function kya karte hain?**
`notFound()` function call karne se current route ka nearest `not-found.tsx` render hota hai (404 status ke saath) — jab dynamic route ka data exist na kare (jaise invalid slug) tab use hota hai.

**44. `template.tsx` `layout.tsx` se kaise alag hai?**
`layout.tsx` state preserve karta hai navigation ke beech (same instance reuse hota hai). `template.tsx` har navigation par naya instance banata hai (state reset ho jaata hai) — jab enter/exit animations ya per-navigation reset chahiye ho tab useful.

---

## 7. Middleware, Auth & Metadata

**45. Middleware kya hai aur kaha run hota hai?**
`middleware.ts` (root mein) — request complete hone se pehle Edge Runtime par chalta hai. Redirects, rewrites, auth checks, headers modify karne ke liye use hota hai — page render hone se pehle hi intercept karta hai.

**46. Middleware se authentication kaise implement karte hain?**
Middleware mein cookie/token check karo, agar invalid/missing ho toh `NextResponse.redirect()` se login page par bhej do — page render/data fetch shuru hone se pehle hi protect ho jaata hai (defense in depth ke liye page-level checks bhi rakhne chahiye).

**47. Edge Runtime vs Node.js Runtime — difference kya hai?**
Edge Runtime lightweight, globally distributed, fast cold-start hota hai but limited APIs (no full Node.js APIs, no filesystem access) support karta hai. Node.js Runtime full Node APIs deta hai but heavier/slower cold start.

**48. Metadata API kya hai?**
`export const metadata = {...}` (static) ya `generateMetadata()` (dynamic, async) function — title, description, Open Graph tags, etc. define karne ka type-safe tarika, purane `<Head>` manual approach ko replace karta hai.

**49. Dynamic metadata (jaise product page title) kaise generate karte hain?**
`generateMetadata({ params })` async function likho jo params ke basis par data fetch kare (jaise product name) aur usse metadata object mein return kare — SEO ke liye per-page dynamic titles/descriptions milte hain.

**50. `generateStaticParams` kya karta hai?**
Dynamic route segments (`[slug]`) ke liye build time par kaunse specific paths pre-render karne hain wo define karta hai — `getStaticPaths` (Pages Router) ka App Router equivalent.

---

## 8. Image, Font & Script Optimization

**51. `next/image` component ke fayde kya hain?**
Automatic lazy loading, responsive sizing (srcset), modern format conversion (WebP/AVIF), layout shift prevention (CLS) — manual `<img>` tag optimize karne ka kaafi kaam automatically ho jaata hai.

**52. `next/image` mein `priority` prop kab use karte hain?**
Above-the-fold, LCP (Largest Contentful Paint) wali images ke liye — lazy loading skip karke eagerly load karta hai, page load ke turant load hone wali critical image ke liye use hota hai.

**53. `next/font` kya optimize karta hai?**
Fonts ko build time par self-host karta hai (Google Fonts external request avoid), automatic `font-display` optimization, aur layout shift (CLS) prevent karta hai jo custom fonts load hone par aam problem hota hai.

**54. `next/script` component ka purpose?**
Third-party scripts (analytics, ads) ko load karne ka optimized tarika — `strategy` prop (`beforeInteractive`, `afterInteractive`, `lazyOnload`) se control karte hain ki script kab load/execute ho taaki page performance impact minimum ho.

---

## 9. Performance & SEO

**55. Next.js SEO ke liye kaisi built-in help deta hai?**
Server-side rendering (crawlers ko fully-rendered HTML milta hai), Metadata API, automatic sitemap/robots.txt generation support, image optimization (Core Web Vitals improve), aur fast page loads (ranking factor).

**56. Core Web Vitals Next.js apps mein kaise improve karte hain?**
`next/image` (CLS), `next/font` (CLS/FOUT), code splitting/dynamic imports (LCP/FID), Server Components (kam JS bundle → faster TTI), Streaming/Suspense (perceived performance).

**57. `next/dynamic` kya karta hai?**
Component ko dynamically import karta hai (client-side code splitting) — `React.lazy` + `Suspense` ka Next.js-friendly wrapper, `ssr: false` option se kisi component ko purely client-only bhi bana sakte ho.

**58. Bundle size optimize karne ke strategies kya hain?**
Server Components use karo (JS client ko jaata hi nahi), dynamic imports for heavy libraries, tree-shaking friendly imports, `next/bundle-analyzer` se audit karo, barrel file over-exports avoid karo.

**59. Waterfall data fetching problem Next.js mein kaise avoid karein?**
Sibling Server Components ka data parallel fetch karo (`Promise.all` ya independent async components jo Suspense ke through parallel stream hon) instead of sequentially await karna ek ke baad ek.

---

## 10. Environment, Deployment & Migration

**60. Environment variables Next.js mein kaise kaam karti hain?**
`.env.local`, `.env.production` etc. files se load hoti hain. `NEXT_PUBLIC_` prefix wali variables browser bundle mein expose hoti hain — baaki sab sirf server-side accessible rehti hain (secrets ke liye safe).

**61. Vercel par deploy karna Next.js ke liye special kyu hai?**
Vercel (Next.js creators) ka platform hai jo saari features (ISR, Edge Middleware, Image Optimization) zero-config support karta hai. Self-hosting (Docker/Node server) bhi possible hai but kuch features (jaise filesystem-based cache) ko sticky routing/shared cache (Redis) ki zaroorat padti hai multi-instance setups mein.

**62. Pages Router se App Router migration kaise approach karte hain?**
Incrementally route-by-route migrate karo (dono routers ek saath coexist kar sakte hain) — pehle non-critical/low-risk routes migrate karo, `getServerSideProps`/`getStaticProps` ko Server Component async data fetching mein convert karo, testing karte raho har step pe.

**63. `next.config.js` ka role kya hai?**
Build/runtime behavior configure karta hai — image domains, redirects/rewrites, environment-specific settings, experimental features enable karna, custom webpack config, output mode (standalone, export).

**64. `output: 'export'` kya karta hai?**
Poori app ko static HTML/CSS/JS files mein export karta hai (no Node.js server chahiye) — static hosting (S3, GitHub Pages) ke liye, lekin ye SSR/ISR/Server Actions jaise dynamic features support nahi karta.

---

## 11. Pages Router (Legacy — still asked)

**65. `getStaticProps` kya karta hai?**
Build time par data fetch karke page ko statically pre-render karta hai (SSG) — Pages Router mein. App Router mein iska equivalent async Server Component + `fetch` hai.

**66. `getServerSideProps` kya karta hai?**
Har request par server-side data fetch karta hai (SSR) — Pages Router mein. App Router mein `fetch(url, { cache: 'no-store' })` iske jagah use hota hai.

**67. `getStaticPaths` kya karta hai?**
Dynamic routes (`[id].js`) ke liye batata hai konse paths build time par pre-render karne hain, `fallback` option (`false`, `true`, `blocking`) se undefined paths ka behavior control karta hai. App Router mein `generateStaticParams` equivalent hai.

**68. API Routes (`pages/api`) Route Handlers se kaise alag hain?**
Dono server endpoints banate hain, but Route Handlers (App Router, `route.ts`) Web Standard Request/Response APIs use karte hain aur Edge/Node dono runtime support karte hain — modern, more flexible approach hai.

---

## 12. Advanced Concepts & Miscellaneous

**69. Hydration Error kya hoti hai aur kaise fix karte hain?**
Jab server-rendered HTML aur client ka pehla render mismatch ho (jaise `Date.now()`, `Math.random()`, browser-only APIs render mein use karna) — React console warning deta hai. Fix: aisi dynamic values ko `useEffect` mein set karo (client-only) ya `suppressHydrationWarning` (last resort) use karo.

**70. `useId` App Router mein hydration issues kaise solve karta hai?**
Stable IDs generate karta hai jo server aur client render ke beech consistent rahein — form labels ya keys ke liye random IDs generate karne se avoid karta hai jo hydration mismatch cause karte the.

**71. Route Segment Config options kya hote hain?**
`export const dynamic`, `revalidate`, `fetchCache`, `runtime` — file ke top-level exports jo us route segment ka rendering/caching behavior explicitly control karte hain (jaise `dynamic = 'force-dynamic'`).

**72. `dynamic = 'force-dynamic'` vs `force-static` kya karte hain?**
`force-dynamic` route ko always server-render karta hai (caching bypass, har request fresh). `force-static` route ko force static banata hai chahe dynamic functions use ho rahe hon.

**73. Suspense boundaries App Router mein multiple jagah kyu use karte hain?**
Alag-alag data-fetching components ko independent loading states dene ke liye — ek slow component poori page ko block nahi karta, baaki content turant stream ho jaata hai jabki slow part apna spinner dikhata hai.

**74. Optimistic UI updates Server Actions ke saath kaise implement karte hain?**
`useOptimistic` hook (React 19) ko Server Action ke saath combine karo — action trigger hote hi UI turant update dikhao, action complete/fail hone par real state se reconcile/revert ho jaata hai.

**75. Monorepo setups mein Next.js kaise fit hota hai?**
Turborepo/Nx jaise tools ke saath multiple Next.js apps aur shared packages (UI components, utils) ek repo mein manage kiye jaate hain — build caching aur incremental builds se large teams mein scale karta hai.

**76. Internationalization (i18n) Next.js App Router mein kaise handle karte hain?**
Middleware se locale detect/redirect karo, `[lang]` dynamic segment route structure mein rakho, aur libraries jaise `next-intl` ya `next-i18next` translations manage karne ke liye use karo.

**77. Draft Mode kya hai?**
CMS preview functionality ke liye — enable karne par static/cached content bypass hoke fresh (unpublished/draft) content dikhta hai, cookie-based toggle hota hai jo sirf authenticated editors ke liye on hoti hai.

**78. `revalidate` ka number kaise choose karein production app mein?**
Data volatility ke hisaab se — stable content (blog posts) ke liye lambi duration (hours), frequently changing (price/stock) ke liye chhoti duration ya tag-based on-demand revalidation with mutation triggers.

**79. `React.cache()` function Next.js data fetching mein kaise help karta hai?**
Non-`fetch` functions (jaise database calls) ko bhi request-level memoize karne deta hai — same render pass ke andar multiple components same data maang rahe hon toh sirf ek baar actual call ho.

**80. Static shell + dynamic holes pattern kab use karte hain (PPR context)?**
Jab page ka most content static ho sakta hai (layout, marketing copy) but kuch specific parts (user-specific greeting, live stock price) request-time fresh chahiye — PPR se dono ek hi response mein combine ho jaate hain.

---

## 13. System Design / Scenario-Style Questions

**81. Product detail page banao jaha title/description static rahe but price/stock fresh chahiye — approach?**
Page ko mostly Static/ISR rakho for stable content. Price/stock ke liye alag Server Component with short `revalidate` ya tag-based `revalidateTag` on inventory update, ya PPR se dynamic hole banao — poore page ko ek hi rendering mode mein treat mat karo.

**82. E-commerce cart button interactive hai but rest of page static — kaise structure karoge?**
Page ko Server Component rakho (data fetching, SEO). Sirf "Add to Cart" button ko chhota Client Component banao (`'use client'`) jo Server Action call kare mutation ke liye — client bundle minimum rehta hai.

**83. Dashboard jaha multiple independent widgets alag speed se load hote hain — approach?**
Har widget ko apna Suspense boundary do (independent async Server Components) taaki slow widget baaki widgets ko block na kare — streaming se har ek apni speed pe render ho.

**84. Authenticated aur public routes ke beech shared layout kaise design karoge?**
Route Groups use karo — `(public)` aur `(auth)` groups, dono apne alag `layout.tsx` rakh sakte hain lekin common root layout share kar sakte hain. Middleware auth check ke liye jo group-specific match kare.

**85. High-traffic blog jaha content editors frequently publish karte hain — rendering strategy?**
ISR with on-demand revalidation — build time par static generate karo, jab editor publish kare toh webhook se `revalidatePath`/`revalidateTag` trigger karo instead of fixed time-based revalidation, taaki fresh content turant reflect ho.

---

## 14. Common Interview "Gotchas"

**86. `'use client'` lagane ke baad bhi component server par render hota hai — confusion clear karo.**
`'use client'` sirf hydration/interactivity ke liye component ko client bundle mein include karta hai — initial render abhi bhi server par hota hai (SSR), fir client par hydrate hota hai. "Client-only" ka matlab "sirf browser mein render" nahi hai.

**87. Server Component ke andar `onClick` kyu error deta hai?**
Server Components server par render hoke plain HTML/RSC payload ban jaate hain — event handlers (functions) serialize nahi ho sakte HTML mein. Isliye interactivity chahiye toh us part ko Client Component banana padta hai.

**88. Har fetch call revalidate hone ka matlab ye nahi ki poora page revalidate hoga — kyu?**
Route ka rendering mode individual fetch options se determine hota hai — agar ek fetch `no-store` hai toh poora route dynamic ban jaata hai, lekin agar sab fetches `revalidate: N` use kar rahe hain toh Full Route Cache us N ke hisaab se update hota hai, per-fetch granularity confuse kar sakti hai.

**89. `revalidateTag` chalane ke baad bhi browser purana data dikha raha hai — kyu?**
Kyunki `revalidateTag`/`revalidatePath` Data Cache aur Full Route Cache invalidate karte hain, lekin Router Cache (client-side) apne aap turant clear nahi hota — navigation ya `router.refresh()` trigger hone ka wait karta hai.

**90. Environment variable `.env` mein set ki but client mein `undefined` aa raha hai — kyu?**
`NEXT_PUBLIC_` prefix nahi laga hoga — bina prefix ke env variables sirf server-side accessible hain, client bundle mein expose nahi hoti (security ke liye intentional).

---

## 15. Testing, TypeScript & Tooling

**91. Next.js apps test karne ka standard approach kya hai?**
Unit/component tests: Jest/Vitest + React Testing Library. E2E tests: Playwright ya Cypress — poore user flows (navigation, forms, auth) browser automation se test karte hain.

**92. Server Components test karna tricky kyu hota hai?**
Kyunki wo async ho sakte hain aur server runtime pe depend karte hain — traditional React Testing Library render approach direct kaam nahi karta, E2E tests (Playwright) ya framework-specific testing utilities zyada reliable hote hain unke liye.

**93. TypeScript Next.js ke saath kyu strongly recommend hota hai (especially senior roles ke liye)?**
Server/Client Component boundaries, route params, Server Action payloads — sab jagah type safety refactoring safer banata hai aur bugs jaldi pakadta hai large App Router codebases mein jaha bohot saare async boundaries hote hain.

**94. Turbopack kya hai?**
Next.js ka naya Rust-based bundler (Webpack ka replacement, `next dev --turbo`) — much faster local dev builds/HMR ke liye design kiya gaya hai, especially large codebases mein.

**95. `next lint` aur ESLint config Next.js mein kya karta hai?**
Next.js-specific rules enforce karta hai (jaise `next/image` use karo instead of `<img>`, hooks rules, accessibility checks) — built-in ESLint config with `eslint-config-next`.

---

## 16. Career / Trade-off Style Questions

**96. "SSR vs SSG vs ISR — kab kya use karoge?" — structured answer kaise doge?**
Content frequency + personalization ke basis pe decide karo: rarely-changing/non-personalized → SSG. Frequently-changing but not real-time → ISR. Per-request personalized/real-time → SSR. Highly interactive, non-SEO dashboard → CSR.

**97. "Why Next.js over plain React + Express backend?" — kaise answer doge?**
Next.js ek hi codebase mein frontend + backend (Route Handlers) combine karta hai, built-in optimizations (image, font, code-splitting) deta hai, aur SEO-critical rendering strategies (SSR/SSG/ISR) out-of-the-box milti hain — separate Express server maintain karne ka overhead kam hota hai chhoti-medium teams ke liye.

**98. Interviewer poochhe "aapne production mein caching bug kaise debug kiya" — kya highlight karna chahiye?**
Four-layer mental model explain karo (Request Memoization → Data Cache → Full Route Cache → Router Cache), bताओ kaunsi layer culprit thi, aur kya fix use kiya (`revalidateTag`, `router.refresh()`, ya cache option change) — systematic debugging process dikhana signal hai, sirf answer nahi.

**99. "App Router migrate karne ka risk kya hai large production app mein?" — kya bolna chahiye?**
Data fetching patterns fully redesign karne padte hain (`getServerSideProps` → async Server Components), Server/Client boundary decisions har component ke liye lena padta hai, aur caching mental model naya seekhna padta hai — isliye incremental, route-by-route migration with heavy testing recommend karte hain, big-bang rewrite nahi.

**100. Senior-level answer ka pattern kya hona chahiye kisi bhi Next.js design question mein?**
Execution boundary se sochna: "Ye kaha run hoga — server, client, build time, ya request time?" Fir uske around SEO, freshness, secrets, bundle size, aur error/loading states discuss karo. Ye mental model most interview scenarios ko structured tarike se solve karta hai.

---

### Bonus tip
Next.js interviews mein sirf feature list ratt kar mat jaana — **"ye render kaha hoga"** wala mental model (server/client/build/request) har jagah apply karo. Yahi sabse bada signal hai jo fresher aur senior candidate mein interviewer ko dikhta hai.
