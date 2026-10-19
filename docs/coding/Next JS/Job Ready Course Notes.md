# Next.js — Job-Ready Course Notes

English notes converted from `job ready video course script.md` (Next.js 16 / 16.2, Hinglish transcript).

## Contents

- [1. What is Next.js & Why Next.js](#1-what-is-nextjs--why-nextjs)
- [2. Project Structure Walkthrough](#2-project-structure-walkthrough)
- [3. React Server Components vs Client Components](#3-react-server-components-vs-client-components)
- [4. File-based Routing, Conventions & Nested Routes](#4-file-based-routing-conventions--nested-routes)
- [5. Dynamic Routes, Nested Dynamic Routes & Catch-all Segments](#5-dynamic-routes-nested-dynamic-routes--catch-all-segments)
- [6. Not-found Page, File Colocation & Private Routes](#6-not-found-page-file-colocation--private-routes)
- [7. Route Groups, Layouts & Multiple Root Layouts](#7-route-groups-layouts--multiple-root-layouts)
- [8. Metadata — Titles & Icon Formats](#8-metadata--titles--icon-formats)
- [9. Navigation & Active Links](#9-navigation--active-links)
- [10. Search Params & Templates](#10-search-params--templates)
- [11. Loading & Error Handling](#11-loading--error-handling)
- [12. Advanced Routing — Parallel, Conditional & Intercepting Routes](#12-advanced-routing--parallel-conditional--intercepting-routes)
- [13. Route Handlers I — Custom API Endpoints, GET/POST/PATCH/DELETE & Query Params](#13-route-handlers-i--custom-api-endpoints-getpostpatchdelete--query-params)
- [14. Route Handlers II — Headers, Cookies & Redirects](#14-route-handlers-ii--headers-cookies--redirects)
- [15. Middleware (Proxy) & Turbopack](#15-middleware-proxy--turbopack)
- [16. Rendering I — CSR, SSR & Hydration](#16-rendering-i--csr-ssr--hydration)
- [17. Rendering II — Suspense SSR Architecture & Selective Hydration](#17-rendering-ii--suspense-ssr-architecture--selective-hydration)
- [18. Rendering III — RSC Deep Dive & Server vs Client Usage](#18-rendering-iii--rsc-deep-dive--server-vs-client-usage)
- [19. Rendering IV — Server Render Strategies, Static/Dynamic & RSC Performance](#19-rendering-iv--server-render-strategies-staticdynamic--rsc-performance)
- [20. Rendering V — generateStaticParams, Dynamic Params & Streaming](#20-rendering-v--generatestaticparams-dynamic-params--streaming)
- [21. Server-Client Composition, Server-only/Client-only Code, Third-party Packages & Context Providers](#21-server-client-composition-server-onlyclient-only-code-third-party-packages--context-providers)
- [22. Data Fetching — Server, Client, Loading States, Parallel & Database](#22-data-fetching--server-client-loading-states-parallel--database)
- [23. Server Actions & Mutations — Forms, Revalidation & Optimistic UI](#23-server-actions--mutations--forms--revalidation--optimistic-ui)
- [24. Caching — `use cache`, `cache`, `cacheTag`, `cacheLife` & Revalidation](#24-caching--use-cache--cache--cachetag--cachelife--revalidation)
- [25. Next.js MCP — AI Dev Tool That Reads Your App](#25-nextjs-mcp-ai-dev-tool-that-reads-your-app)
- [26. Redux Toolkit — Central State Management Without Prop Drilling](#26-redux-toolkit--central-state-management-without-prop-drilling)
- [27. Clerk Authentication — Drop-In Auth for Next.js](#27-clerk-authentication---drop-in-auth-for-next-js)

---

## 1. What is Next.js & Why Next.js

### What is Next.js

Next.js is a **React-based framework designed for creating full-stack web applications** — meaning the frontend and the backend both live in one codebase, in one place.

To understand what "framework" adds, it helps to compare with React:

- **React is a library.** It is designed especially for creating user interfaces — headers, footers, cards, sections, containers, and all the UI you define.
- **Next.js is a framework.** It *uses* React to build its user interfaces, and on top of that ships with additional tools that let you build applications that are **ready for production**.

Building a fully functional, production-ready web application with plain React is challenging — you *can* do it, but not as easily as with Next.js. In React, anything beyond UI requires installing separate libraries: routing (navigating to `/about`, `/services`, `/products`), data fetching, and so on. You have to find, install, and wire up a different library for each of these.

Next.js comes with so many tools built in that you can build a production-ready application without them. You *can* still add extra libraries for additional features if you want — but the built-in toolset is already enough for production.

### Built-in features (no extra packages needed)

These come **by default** in Next.js:

- **Routing**
- **Optimized rendering**
- **Data fetching**
- **Bundling**
- **Compiling**
- …and many more

In React you would need a different library for each of these. In Next.js, no additional package is required — it all comes built in.

**Important:** to achieve these features in Next.js, you must follow its **conventions**. Every feature (routing, rendering, data fetching, …) works by following a set of conventions/rules that Next.js defines. Learn the convention, get the feature.

### Why learn Next.js

Next.js makes it **easier to build production-ready web applications**:

| Reason | What it means |
|---|---|
| **Routing** | Easy because of **file-based routing** — the folder structure *is* the routes (covered later) |
| **API routing** | You can build API routes directly inside Next.js |
| **Rendering** | Multiple types of rendering are supported — a very important topic |
| **Data fetching** | Built-in ways to fetch data |
| **Styling** | Multiple ways to style your app |
| **Optimization** | Built-in optimization for the app |
| **Full-stack in one codebase** | Backend + frontend both in one place |
| **Caching** | Enable caching without any third-party library |
| **Dev & prod build system** | Separate development and production build systems built in |

### Prerequisites

- **HTML basics** — how to write `div`, paragraph, heading, etc. Nothing more is really needed.
- **CSS basics** — how to define and apply classes.
- **JavaScript fundamentals** — if you don't know them yet, you can pick them up along the way.
- **React fundamentals** — creating components, combining them, reusing them. Fundamental level is enough; advanced React is **not** required.

---

## 2. Project Structure Walkthrough

### Creating a project

```bash
npx create-next-app@latest hello-world
```

- `create-next-app` is **the** command to scaffold a Next.js project.
- `@latest` pulls the latest version (you can pin a specific version instead).
- Pass `.` as the name to create the project in the current folder, or a name like `hello-world` to create a subfolder.
- **Prerequisites:** Node.js installed on your system, a code editor (VS Code / Cursor / whatever you like), and a browser.
- The CLI asks a few setup questions ("would you like to use the recommended …?") — accepting the recommended defaults is fine. It then installs all dependencies (takes a little time).

### Running the project

```bash
cd hello-world
npm run dev
```

- `npm run dev` executes the `dev` script from `package.json`, which runs `next dev`.
- The terminal tells you the port — the app runs at ` → open it to see the default page.

### Files in the root

| File | Purpose |
|---|---|
| `tsconfig.json` | TypeScript configuration — all TS-related enable/disable options live here. |
| `README.md` | Project intro rendered on GitHub — markdown formatting (`##` headings, fenced code blocks) shows formatted on the repo page. |
| `postcss.config.*` | PostCSS configuration — Tailwind CSS-related setup. |
| `package.json` | **Important.** Lists `dependencies` + `devDependencies` needed to run the app, and defines scripts (`dev` → `next dev`). |
| `package-lock.json` | Detailed lock file — exact requirements of every package, including its internal dependencies. |
| `next.config.*` | Next.js configuration — how to use it comes later. |
| `next-env.d.ts` | **Auto-generated** TypeScript declarations for Next.js routes/API types — you never edit it manually. |
| ESLint config | Linting rules — what your code should and shouldn't do. |
| `.gitignore` | What must **never** be pushed to GitHub: `.env` files (secrets) and `node_modules` (too heavy — it holds all dependencies). |

### AI agent instructions — `AGENTS.md` + `CLAUDE.md` (new in Next 16.2)

Both files are important — they are instructions for AI coding agents:

- **`AGENTS.md`** instructs the agent: when writing code, first read the latest docs (inside `node_modules/next/dist/docs`) and write code **according to them** — so generated code matches the installed Next.js version (e.g. 16.2) and never uses unsupported/old APIs.
- **`CLAUDE.md`** follows the **DRY (Don't Repeat Yourself)** principle — it just imports the same instructions from `AGENTS.md` using the `@` symbol, so Claude Code gets identical guidance.
- Net effect: any AI-assisted coding in the project follows the latest, version-correct documentation.

### `public/` folder

Static assets — keep your images etc. here and access them **directly** from any component/page.

### `node_modules/` folder

- All installed packages live here.
- Your dependencies also need their own internal packages: `package.json` may list ~10 dependencies, but `node_modules` contains many more (transitive/internal ones).
- Deleted it or starting fresh? Run `npm install` (short: `npm i`) — it recreates the folder. Do this before starting the project the first time.

### `app/` folder — where your app lives

Default contents: `page` (page UI), `layout`, `globals` (global CSS), `icon`.

- Edit `page` — e.g. change the text to "Hello World" — and the browser **auto-refreshes**; no manual refresh needed.
- What `layout` is used for is explained in detail later.

### `.next/` folder — build output

- Created automatically the moment you run `npm run dev`.
- Delete it → it regenerates automatically on the next run/save.
- Contains the **compiled (compressed) version of your code** — all build files live here.

---

## 3. React Server Components vs Client Components

Understanding RSC first makes routing (the next section) much easier to grasp.

### What are React Server Components (RSC)?

The React team introduced a new architecture called **React Server Components (RSC)**, and Next.js quickly adopted it — Next.js uses RSC as its foundation.

This architecture offers a fresh way to build React components by categorizing them into **two distinct types**:

1. **Server Components**
2. **Client Components**

(In plain React you just create components — About, Home, Header — with UI + logic inside. In Next.js, every component you create is one of these two types.)

### Server Components

- **By default, Next.js treats every component as a Server Component.** Whatever component or page you create without opting out is a server component.
- They **render on the server**: when a user requests a route, the HTML is rendered on the server and sent directly — it is *not* rendered on the client side.
- Because they run on the server, they **can perform server-side tasks**:
  - reading files
  - fetching data directly from a database
- Data fetching becomes easier **and more secure**.

### Client Components

- To create one, add the **`use client`** directive at the very **top** of the component file (the directive syntax with the quotes):

```tsx
'use client';

import { useState } from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>Likes: {likes}</button>;
}
```

- Client components **cannot perform server-side tasks** (no file reading, no direct database access) — they execute **in the browser**.
- But they **can use hooks** and **handle user interaction** — clicks, inputs, and all interactivity.
- A client component is exactly the normal component you know from React: hooks + event handling, same as always.

### Rules to remember

| | Server Component | Client Component |
|---|---|---|
| Runs on | Server | Browser |
| Default? | **Yes** — everything is a server component by default | Only when you add `'use client'` |
| Server tasks (files, DB) | ✅ | ❌ |
| Hooks (`useState`, …) | ❌ | ✅ |
| User interaction (click, input) | ❌ | ✅ |

The natural follow-up question: "if a component runs on the server, can it use hooks?" — **no**. Browser-only APIs (`localStorage`, session storage, …) also cannot be used in server components. Anything that needs hooks or interactivity must be made a client component.

This two-type split significantly **improves performance** (details come later in the rendering section).

---

## 4. File-based Routing, Conventions & Nested Routes

### File-system based routing

Next.js has **file-system based routing**: the way you create files *is* your routing.

- **React:** install a separate routing library/package, then define every route manually — "if the user goes to `/about`, open this component; `/contact` → that component."
- **Next.js:** just create files. Routes work automatically — no route config to write. You only have to follow a few **conventions**.

### Routing conventions

1. **All routes must live inside the `app` folder.** A file outside `app/` will not become a route. Every new Next.js project already has this folder.
2. **The route file must be named `page.js` / `page.tsx`** (`.js` for JavaScript projects, `.tsx` for TypeScript).
3. **The component must be a default export.** Without `export default`, Next.js cannot pick up the component and the route will not work.

Follow the conventions and the file **automatically becomes available as a route** — nothing else to configure.

```tsx
// app/page.tsx → serves "/"
export default function Home() {
  return <div>Home</div>;
}
```

```tsx
// app/about/page.tsx → serves "/about"
export default function About() {
  return <div>About</div>;
}
```

```
app/
├── page.tsx           →  /
├── about/
│   └── page.tsx       →  /about
└── contact/
    └── page.tsx       →  /contact
```

- Delete everything inside `app/` → the app shows a **404**. Create `page.tsx` again → `/` works again immediately (hot reload, no extra setup).
- Without the root `layout.tsx` you get an error ("missing html body tag") — the root layout wraps every page:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

(Layouts are covered in detail later.)

### Gotcha — default export is mandatory

If you write only `export` (a named export), or define the function without exporting it, the route **will not run** — you get an error. It must be `export default`.

### Unknown routes → automatic 404

Visit a route you never created (e.g. `/products`) → Next.js automatically shows a **404 page**. It can be customized later, but out of the box unmatched routes are handled for you.

### Nested routes

A nested route = a route inside a route, e.g. `/about/profile`:

```
app/
└── about/
    ├── page.tsx          →  /about
    └── profile/
        └── page.tsx      →  /about/profile
```

Create the `profile` folder **inside** `about` and add its own `page.tsx` (default export) — `/about/profile` now works. Nesting can go arbitrarily deep:

```
app/
└── about/
    ├── page.tsx              →  /about
    └── profile/
        ├── page.tsx          →  /about/profile
        └── settings/
            └── page.tsx      →  /about/profile/settings
```

**Real-world use:** a blog — `/blog` lists multiple blogs; clicking one opens its detail page (`/blog/first-blog`, `/blog/second-blog`). Folder nesting gives you this structure for free.

In React you would manually configure the whole hierarchy in route definitions (parent route → nested route → nested-nested route). In Next.js: create the folders, create `page.tsx` files, write your UI and logic — the routing is done.

---

## 5. Dynamic Routes, Nested Dynamic Routes & Catch-all Segments

### Why dynamic routes

Fixed paths (`/about`, `/contact`, `/services`) work for static pages. But imagine a product list of **100 products** — clicking each one should open *its* detail page. Creating 100 separate pages/routes is impossible. **Dynamic routes** solve this: create pages based on **dynamic data** (an ID, a slug, …) instead of a fixed path.

### Creating a dynamic route — `[id]`

**Convention:** wrap the folder name in **square brackets**. That folder becomes a dynamic segment:

```
app/
└── products/
    ├── page.tsx          →  /products          (product list)
    └── [id]/
        └── page.tsx      →  /products/:id      (any ID — one page!)
```

```tsx
// app/products/page.tsx — product list (render a JS array of products, map like React)
export default function Products() {
  return <div>My Products</div>;
}
```

```tsx
// app/products/[id]/page.tsx — catches ANY id
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // params is a Promise in Next 16 — must await
  return <div>Product Details: {id}</div>;
}
```

Key points:

- **The name inside the brackets = the key you receive in `params`.** Folder named `[id]` → `params.id`. Use that ID to fetch the product's data from an API/database and display it.
- **`params` is a Promise in Next.js 16** (it wasn't before). You must `await` it, then destructure. The page component becomes `async`.
- **Naming rules:** valid identifier style only — no spaces (`my id` ❌). Whatever you name it, use that same name in `params`.
- Any URL after `/products/` (`/products/1`, `/products/123`, anything) is captured by this single page.

### Nested dynamic routes

A **nested dynamic route** = a dynamic route inside another dynamic route. Real example: a product detail page has reviews; each review also has its own detail page:

```
app/
└── products/
    └── [id]/
        ├── page.tsx                  →  /products/:id
        ├── reviews/
        │   ├── page.tsx              →  /products/:id/reviews
        │   └── [reviewId]/
        │       └── page.tsx          →  /products/:id/reviews/:reviewId
```

- `/products/123/reviews` → all reviews for product 123
- `/products/123/reviews/456` → review 456 **of product 123** — both IDs are available in the URL and in `params`
- The natural flow — product list → product detail → reviews → review detail — is the structure you want for e-commerce apps. Think the flow through before building; don't just create folders blindly.

### Catch-all segments — `[...slug]`

A **catch-all segment captures multiple URL parts into one route, as an array.**

Scenario: a lectures dashboard — subjects (math, physics, …), each with parts (`part-1`, `part-2`), potentially nested further. Making a route/component for every combination (`physics/part-1`, `physics/part-2`, …) is unmanageable.

**Convention:** square brackets + **triple dot** + a name (any name — `slug` is the common convention, no spaces):

```
app/
└── lectures/
    └── [...slug]/
        └── page.tsx      →  /lectures/anything/at/any/depth
```

```tsx
// app/lectures/[...slug]/page.tsx
export default async function Lectures({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params; // e. ["physics", "part-1"]
  console.log(slug);

  if (slug.includes('math')) return <div>Math lectures</div>;
  if (slug.length === 2) return <div>Two lecture parts</div>;
  return <div>All lectures</div>;
}
```

- `slug` is an **array of strings** — URL parts in order. Values are *always* strings (even numeric segments; typed as `string[]`, a number would be a type error).
- You decide the UI with conditions — `slug.includes(...)`, `slug.length`, splitting, etc.
- **Limitation:** a non-optional catch-all **requires at least one segment** — visiting plain `/lectures` gives a **404**.

### Optional catch-all — `[[...slug]]`

Rename the folder so the triple-dot segment is wrapped in a **second pair of square brackets**:

```
app/lectures/[[...slug]]/page.tsx
```

Now it's **optional**:

- `/lectures` → works (renders the lectures page)
- `/lectures/part-1` → works
- `/lectures/part-1/part-2` → works (still captured into the array)

**The payoff at scale:** multiple lectures, lectures inside lectures — all handled by one route, UI controlled by conditions. You don't need to create multiple routes or pages; you can even keep helper components colocated/private (not routes) and render them based on conditions.

---

## 6. Not-found Page, File Colocation & Private Routes

### Custom 404 — `not-found.tsx`

Unknown routes show Next.js's default 404. To show **your own** page, use a very simple convention — create `not-found.tsx`:

```tsx
// app/not-found.tsx — global custom 404 (app level)
export default function NotFound() {
  return <h2>We missed something — page not found!</h2>;
}
```

### Route-specific not-found + `notFound()`

The same file can live **inside any route folder** for a localized 404. Example: a reviews section — if someone types a review ID that doesn't exist, show a specific "Review not found" message:

```tsx
// app/products/[id]/reviews/[reviewId]/not-found.tsx
export default function ReviewNotFound() {
  return <h2>Review not found</h2>;
}
```

You trigger it **programmatically** from the page with the `notFound()` function:

```tsx
// app/products/[id]/reviews/[reviewId]/page.tsx
import { notFound } from 'next/navigation';

export default async function ReviewDetail({
  params,
}: {
  params: Promise<{ id: string; reviewId: string }>;
}) {
  const { id, reviewId } = await params;

  if (Number(reviewId) > 100) notFound(); // → shows the nearest not-found page

  return (
    <div>
      Review {reviewId} for product {id}
    </div>
  );
}
```

When `notFound()` runs, the user is taken to the not-found page — the route-specific one if it exists, otherwise the global one. This works in **any** route (products, lectures, …): put a condition in your route, and if the data doesn't match, show your own not-found UI instead of a blank/broken page. Next.js gives you this flexibility per section/route.

### Gotcha — hooks need client components

Trying to build a custom message from the URL with `usePathname` inside a server component throws: *"You're importing a module that depends on `usePathname`… this API is only available in client components."* Hooks don't run on the server — add the directive:

```tsx
'use client';

import { usePathname } from 'next/navigation';

const pathname = usePathname(); // e. "/products/123/reviews/10"
const productId = pathname.split('/')[2]; // "123"
const reviewId = pathname.split('/')[4]; // "10"

return <h2>Review {reviewId} not found for product {productId}</h2>;
```

### File colocation

You can place regular component files **inside your route folders** — they will **not** become routes:

```
app/dashboard/
├── page.tsx        →  /dashboard         (routes — it's named page.tsx)
└── bar-chart.tsx   →  NOT a route        (just a component, import it where needed)
```

Visiting `/dashboard/bar-chart` → 404. Visiting `/dashboard` shows the dashboard (which imports and renders `BarChart` internally).

**The rule:** a file becomes a route only if it is named `page.tsx` **and** has a default export. Any other file name — even with a default export — is just a component you can import and use anywhere. That's **file colocation**: keep components next to the routes that use them.

### Private folders — `_folderName`

A folder with an **underscore at the beginning** is **excluded from routing entirely**:

```
app/
├── dashboard/
│   └── page.tsx      →  /dashboard        (routes)
└── _private/
    └── page.tsx      →  404 — will NEVER route
```

- **Even** if the folder contains `page.tsx` **with a default export**, Next.js will not route it. The underscore kills routing for that folder and all its subfolders.
- **Use cases:** components that must never be reachable as routes, private logic, keys, or anything sensitive you don't want exposed/attacked. Put them in a folder like `_private` or `_lib` and import from your routes.
- Practice note: URL-encoding an underscore as `%5F` behaves the same as `_` in the browser — the folder stays private either way.

---

## 7. Route Groups, Layouts & Multiple Root Layouts

### Route groups — `(folderName)`

A route group **helps organize routes and project files in a logical way while keeping the URL structure intact.**

**Convention:** wrap the folder name in **parentheses** — e. `(auth)`:

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx      →  /login        (NOT /auth/login!)
│   └── register/
│       └── page.tsx      →  /register     (NOT /auth/register!)
```

- The parenthesized folder is **skipped from the URL** — you never type it in the browser. Routes work exactly as before.
- Without grouping, nesting login/register under `auth/` would change the URLs to `/auth/login` (and a plain `auth` folder *does* appear in the URL).
- **Why it matters:** a real project grows — reset password, change password, email verification… Group the whole auth flow under `(auth)` and everything auth-related lives in one place. A new developer looking for "reset password" opens `(auth)` and finds it immediately.
- It's not just tidiness: plan groups by flow — `(auth)`, `(products)`, `(checkout)`, `(payment)` — this organization mindset is what scales. Every Next.js routing feature has a real purpose; the impact on a large codebase is big.

### Layouts — `layout.tsx`

**A layout is a UI component where all your routes render as `children`.**

- Every route you create renders **inside** the layout, as its children. Without a layout you get an error — every route segment needs one (the project ships with a root `app/layout.tsx`).
- Whatever code you write in a layout is **shared by all routes rendering under it** — perfect for a common header/footer.
- Create it as `layout.js`/`layout.tsx` (`.tsx` in TypeScript projects). The component takes `children` as a prop — and `children` are nothing but your route pages. The prop is **read-only**; you can't modify it.

```tsx
// app/layout.tsx — the ROOT layout (html + body live ONLY here)
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

Now Header/Footer appear on **every route** (`/about`, `/contact`, …) automatically. Anything you want common throughout the app → put it in the root layout. (The `metadata` export you see there is for SEO — covered later.)

### Nested layouts

A layout can live **inside any route folder**, covering just that part of the tree:

```
app/products/
├── layout.tsx            →  applies to /products, /products/:id, /products/:id/reviews, …
├── page.tsx              →  /products
└── [id]/
    ├── page.tsx          →  /products/:id
    └── reviews/
        ├── page.tsx      →  /products/:id/reviews
        └── [reviewId]/
            └── page.tsx  →  /products/:id/reviews/:reviewId
```

```tsx
// app/products/layout.tsx — NO <html>/<body> here! The root layout already has them.
import type { ReactNode } from 'react';

export default function ProductLayout({ children }: { readonly children: ReactNode }) {
  return <div>{children}</div>;
}
```

- Nested layouts render **within** the parent layout's `children` — route × layout nesting stack.
- **Only the root layout(s) contain `<html>` and `<body>`** — a nested layout with its own html/body causes an error. Nested layouts are plain wrappers.
- Combine with route groups: put a layout inside a group and it applies only to that group's routes — great when header/footer should *not* appear on some pages (e. a full-screen login).

### Multiple root layouts

Problem: the marketing header/footer from the root layout shouldn't appear on login/register. Solution — **multiple route groups, each with its own root layout:**

```
app/
├── (auth)/
│   ├── layout.tsx          ← its own root layout (has html + body, NO header/footer)
│   ├── login/page.tsx      →  /login
│   └── register/page.tsx   →  /register
└── (marketing)/
    ├── layout.tsx          ← its own root layout (html + body + header/footer)
    └── page.tsx            →  /   ← hitting localhost goes here
```

- Each group is a **separate root** with a full `layout.tsx` (including `<html>`/`<body>`).
- `/login` renders with the auth layout — full-page login, no marketing chrome.
- `/` (and the marketing routes) render with the marketing layout.
- You can add more groups (a third root) the same way — organize logic and presentation exactly as you want.

---

## 8. Metadata — Titles & Icon Formats

### Why metadata

Metadata plays a crucial role in **enhancing SEO and improving web searchability** by providing essential information about your web page — the title, description, and keywords are what help your page rank when someone searches on Google.

There are **two ways** to add metadata in Next.js: **static** and **dynamic**.

### Static metadata — `export const metadata`

Export a `metadata` object from a **`layout.tsx` or `page.tsx`**:

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'; // TS type — TS projects need it for typing

export const metadata: Metadata = {
  title: 'About Page',
  description: 'All about our company',
};

export default function About() {
  return <div>About</div>;
}
```

- The `title` shows in the **browser tab**; the description is emitted as a `<meta name="description">` tag (check via *View Page Source*).
- Put it in a **page** → applies to that page only. Put it in a **layout** → applies to **every route under that layout** (the default `app/layout.tsx` ships with `title: 'Create Next App'` — change it to your app name).
- Static = fixed. To change it you must edit each page — which is why detail pages need the next approach.

### Dynamic metadata — `generateMetadata()`

Product detail pages (Flipkart/Amazon-style) each need their **own** title/description. Use the special async **`generateMetadata`** function:

```tsx
// app/products/[id]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params; // params is a Promise — await it

  // fetch that product's data (real DB/service or a placeholder API)
  const product = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  ).then((r) => r.json());

  return {
    title: product.title,
    description: product.body,
  };
}
```

- It receives the same **`params`** as the page (a Promise — await before use).
- Change the ID (`/products/1` → `/products/2`) → title/description change with the data.
- This is the pattern for **e-commerce and any dynamic app** — fetch by ID inside `generateMetadata` and return title + description.

### Title: string vs object

`title` accepts a **string** or an **object** with three fields:

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Next.js Course',   // fallback for pages without their own title
    template: '%s | Next.js Course', // %s replaced by the child page's title
  },
};
```

| Field | Behavior |
|---|---|
| `default` | Used when a route has **no** title of its own (set it in a layout → all children inherit it) |
| `template` | `%s` is replaced by the page's title, then the suffix is appended → e. `About Page \| Next.js Course`. Perfect for global branding + per-page titles |
| `absolute` | Used **in a page** to bypass template and default entirely — the exact string shows, nothing appended |

### Multiple icon formats (new in Next 16)

You no longer add icon `<link>` tags by hand. Just drop special files directly in the `app/` folder:

```
app/
├── icon.svg
└── icon.png
```

- Next.js **automatically generates the correct `<link>` tags in `<head>`** — you never touch any HTML. (Older setups required manually adding the icon link tag to `index.html`.)
- **`icon.svg`** — a **vector** file, stays shape-perfect and **crisp at any size**, never blurry or pixelized.
- **`icon.png`** — a **pixel-based backup** for older browsers/devices that can't read SVG.
- Next.js includes **both** as link tags and the browser picks whichever it supports — modern browsers use the SVG, older ones fall back to the PNG.

---

## 9. Navigation & Active Links

Users don't type URLs in the browser — they **click links**. So in-app navigation matters. Two tools:

- **`Link` component** from `next/link` — for clicking between pages
- **`useRouter`** from `next/navigation` — for **programmatic** navigation in code (e. on a button click)

Both perform **instant client-side navigation without a full page reload** — just like React Router, but built into the framework with **no extra install**.

### `<Link>` — navigate by clicking

```tsx
// components/Header.tsx (used in the root layout → on every page)
import Link from 'next/link';

export default function Header() {
  return (
    <nav>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/products">Products</Link>
    </nav>
  );
}
```

Clicking a link swaps only the page content — the header/footer stay in place, nothing fully refreshes.

### `useRouter` — programmatic navigation

For navigation triggered by code (button click, form submit, after an action):

```tsx
'use client'; // hooks → client component required

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return <button onClick={() => router.push('/login')}>Login</button>;
}
```

**Gotcha:** without `'use client'` you get an error — hooks (including `useRouter`) don't work in server components.

**Router methods:**

| Method | What it does |
|---|---|
| `router.push('/path')` | Navigate to the path (adds to history) |
| `router.replace('/path')` | Replace the current URL in history |
| `router.back()` | Go back to the previous page — no need to know where it was |
| `router.forward()` | Go forward |
| `router.refresh()` | Re-fetch/re-render current route |

**Practice:** on the products list, loop over products and link each to its detail page so the ID changes in the URL (`/products/1`, `/products/2`, …).

### Active links — `usePathname`

Next.js has **no built-in NavLink component** (unlike React Router). You get the current path with **`usePathname`** from `next/navigation` and compare it manually to each link's `href`:

```tsx
'use client'; // hooks → client component required

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Products', href: '/products' },
];

export default function Header() {
  const pathname = usePathname(); // e. "/products/123"

  return (
    <nav>
      {nav.map((item) => {
        const isActive =
          pathname === item.href || // exact match
          (item.href !== '/' && pathname.startsWith(item.href)); // nested pages keep parent active

        return (
          <Link
            key={item.href}
            href={item.href}
            className={isActive ? 'font-bold text-red-500' : 'text-blue-500'}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
```

- `pathname === href` → exact match for the current page.
- `pathname.startsWith(href)` → on `/products/123` the Products menu item **stays active** (it's a sub-page).
- **Exclude the root `'/'`** from the `startsWith` check — otherwise it would match every path and Home would always be active.
- Any menu can be highlighted this way using `usePathname` + a condition.

---

## 10. Search Params & Templates

### Search params (`searchParams`)

In Next.js, **`searchParams` are passed directly as props to your page component** — read them from the URL **without any hook**.

This is the `?key=value` part of a URL — `?search=poma&page=2`, `?type=news`. Sites use it for search results and pagination (`page=1`, `page=2`, …), and a huge benefit: **refreshing keeps you on the same filtered page** (the state lives in the URL).

Demo: a blogs list where each blog links to its detail page with a `type` query — `/blogs/123?type=news`:

```tsx
// app/blogs/[id]/page.tsx
import type { Metadata } from 'next';

export default async function BlogDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: 'news' | 'article' | 'blog' }>;
}) {
  const { id } = await params;
  const { type } = await searchParams; // both are Promises — await them

  return (
    <div>
      <h1>Blog {id}</h1>
      {type && <p>Type: {type}</p>}
    </div>
  );
}
```

Key points:

- The page receives **both** `params` (path segments) and `searchParams` (query string) — both **Promises**, await before destructuring.
- Values are **strings**; you can type the allowed set (`'news' | 'article' | 'blog'`) — anything else is a type error.
- **Make it optional** (`type?`) — on a detail page the query may simply not be there. If you write conditions on it as required, the page will break when the query is missing.
- Use it for conditional UI or **conditional API calls** (fetch different data depending on the query).

### Templates — `template.tsx`

A `template.tsx` (or `template.js`) is **similar to `layout.tsx`** — with one critical difference:

> **A template remounts fresh on every navigation.** State resets, effects re-run, every time.

Demo: make the `(auth)` layout a **client component** with a `useState` name field + an input. Type "test" on the login page, navigate to register:

- **With `layout.tsx`** → "test" is still there (layout persists across navigations)
- **Rename it to `template.tsx`** → "test" is gone (the whole component remounted)

**Gotcha:** a `metadata` export can't live in a client component — remove it when converting the layout to a client component.

**When to use which:**

| | `layout.tsx` | `template.tsx` |
|---|---|---|
| Remounts on navigation? | **No** — persists | **Yes** — fresh every time |
| State | Preserved across navigations | **Cleared** on every navigation |
| Effects | Don't re-run | Re-run on every navigation |
| Use when | Header/footer, sidebars — UI (and state) should stay | You *want* a clean slate per navigation |

**Both together?** Yes — but remember the order: the **template renders inside the layout** (layout first, then template around the page — never the reverse). The layout persists; only the template remounts.

---

## 11. Loading & Error Handling

### `loading.tsx` — instant loading UI

`loading.tsx` (or `loading.js`) is a **special file you can create inside any route folder**. It creates a meaningful loading UI **with React Suspense** — an instant loading state from the server while the route's content takes time to load (big product lists, slow API fetches…).

**You literally just create the file** — Next.js automatically wraps the page in Suspense with your component as the fallback:

```tsx
// app/products/loading.tsx
export default function Loading() {
  return <p>Loading products...</p>; // spinner, skeleton — your choice
}
```

To see it, simulate a slow route (e. in `app/products/page.tsx`):

```tsx
await new Promise((resolve) => setTimeout(resolve, 5000)); // artificial delay

return <div>Products…</div>;
```

Navigating to `/products` shows "Loading products…" for the delay, then the real content. Only the slow part is wrapped — the header/footer (already loaded) stay visible. Spinner or skeleton UI — whatever you design.

### `error.tsx` — fallback UI for runtime errors

Also a **special file** (`error.tsx`/`error.js`). It handles **unexpected runtime errors** and displays a fallback UI.

**Without it:** a condition fails at runtime → the user gets a blank page or confusing UI, and their only option is refreshing the entire page. **With it:** a meaningful error message, while the rest of the app keeps working.

It works via the **React error boundary** concept: Next.js automatically wraps the route segment (and its nested children) in an error boundary. If something crashes, **only that part of the page breaks** and shows your error UI — it doesn't take down the whole app.

```tsx
// app/products/[id]/error.tsx
'use client'; // error boundaries are client components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <h2>Something went wrong: {error.message}</h2>;
}
```

- `error` carries the thrown error — `error.message` is the message you threw (e. `throw new Error('Error loading product')` → shown to the user).
- **Dev vs production:** in dev you also get a detailed error overlay with stack trace; in production that popup is gone — you'd see a blank page with no explanation. `error.tsx` is what gives users something meaningful in production.

### Recovering from errors — `reset` + `startTransition`

The `reset` prop lets the user retry. A plain `reset()` button attempts a **client-side** retry — but if the error came from the **server side**, a client reset won't know about it.

The fix — refresh the router **in a transition** (background, no full reload):

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function Error({ error, reset }) {
  const router = useRouter();

  const reload = () => {
    // runs in the background instead of reloading the whole page
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div>
      <h2>{error.message}</h2>
      <button onClick={reload}>Reload</button>
    </div>
  );
}
```

`startTransition(() => router.refresh())` re-renders the router in the background and re-fetches server data — it can recover **server-side** errors too.

### Error handling in nested routes — placement matters

An error **bubbles up** to the nearest error boundary: when an error occurs deep in a route, Next.js looks for an `error.tsx` upward through the segments and wraps everything at that level in the boundary.

**Gotcha — error next to layout doesn't catch layout errors.** An `error.tsx` at the **same level** as a `layout.tsx` cannot catch errors thrown *by that layout*. Put the `error.tsx` in the **parent folder** — then the wrapping is: `parent layout → error boundary → child layout`, and it works.

**Best practice:** place `error.tsx` **as close to the failing component as possible**. If only the product *detail* section can fail, put the error file there — the product list, header, and footer keep rendering, and only the broken part shows the error message.

### `global-error.tsx` — one screen for the whole app

**`global-error.tsx`** (inside the `app/` folder) shows **one common error screen when something breaks anywhere in your app** — the last-resort boundary for anything not caught by a route-level `error.tsx`. Whatever content you put in it is what the user sees instead of your app.

```tsx
// app/global-error.tsx
'use client'; // must be a client component

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <h2>Something went wrong</h2>
        <button onClick={() => window.location.reload()}>Reload</button>
      </body>
    </html>
  );
}
```

- It replaces the root layout when triggered — so it renders its own `<html>`/`<body>`.
- To see it in action, run **production mode**: `npm run build` then `npm run start` — in dev you see the developer error overlay instead.

### Component-level error boundaries — Unstable Catch Error (Next 16)

New in Next 16 (still **unstable**): **handle errors inside a specific component, not the whole page.**

Scenario: a dashboard with 4 components — charts, heatmap, user list, activities. A route-level `error.tsx` hides the **entire page** when one component breaks. But why should the other three disappear?

- Create **your own small error boundary anywhere in the UI tree**. If one part breaks, **only that part shows the error — the rest of the app works fine.**
- It's a class component extending `React.Component` — exactly like React's ErrorBoundary pattern:

```tsx
// components/CustomError.tsx — your own small error boundary
'use client';

import { Component, type ReactNode } from 'react';

export default class CustomError extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <p>Could not load this section.</p>;
    return this.props.children; // otherwise render normally
  }
}
```

- No error → children render as always. Error → the fallback renders instead.
- Wrap individual sections: `<CustomError><Chart /></CustomError>` — if `Chart` breaks, the heatmap, user list, and activities still render.

---

## 12. Advanced Routing — Parallel, Conditional & Intercepting Routes

### Parallel routes — slots (`@folder`)

**With parallel routes you can render one or more pages simultaneously — and conditionally — all within the same layout.** No rocket science: an advanced routing technique.

Normally, to show a charts page with a line chart, bar chart, and heatmap, you'd create three components and import them into the layout. With parallel routes, they become **slots**:

- **Parallel routes are created using named slots.** A slot is just a folder prefixed with **`@`** — e. `@lineChart`, `@barChart`, `@heatMap` (remember this: interviews may ask "what are slots?").
- **Each defined slot automatically becomes a prop in the corresponding layout** — you don't import anything; take it like `children` and render it.

```
app/charts/
├── layout.tsx              ← receives slots as props
├── page.tsx                →  /charts
├── @lineChart/page.tsx
├── @barChart/page.tsx
└── @heatMap/page.tsx
```

```tsx
// app/charts/layout.tsx
export default function ChartLayout({
  children,
  lineChart,
  barChart,
  heatMap,
}: {
  children: React.ReactNode;
  lineChart: React.ReactNode; // slot name = prop name
  barChart: React.ReactNode;
  heatMap: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {lineChart}
      {barChart}
      {heatMap}
    </div>
  );
}
```

(Without the `@` prefix it's just a folder, not a slot.)

**Why slots are powerful:**

- **Independent route handling:** each slot can have its **own `loading.tsx` and `error.tsx`** — loading/errors handled separately per slot. Line chart + heatmap load, bar chart is slow → only that slot shows its loading; if it breaks, only that slot shows the error.
- **Sub-navigation:** each slot works like a **mini application** — you can navigate, filter, sort *inside* a slot without affecting any other slot or page. Add a "Pie Chart" link inside the heatmap slot → clicking it navigates only within that slot, the URL updates, the other slots stay put.

### Unmatched slots & `default.tsx`

When you navigate **within a slot** (link from `/charts` to `/charts/pie-chart`), the URL changes. **Navigating from the UI** keeps showing whatever was in the unmatched slot before. But **on a page reload**, the framework **cannot retrieve the slot's active state from the current URL** — the slot is "unmatched".

Next.js then looks for a **`default.tsx`** file for each unmatched slot:

- `default.tsx` is **crucial** — it serves as the fallback when the framework can't retrieve a slot's state from the current URL.
- **Without it → 404 on refresh.**
- Create it inside **every slot folder** (it looks for a default per slot).

```tsx
// app/charts/@lineChart/default.tsx — fallback content for this slot
export default function Default() {
  return <div>All charts</div>;
}
```

### Conditional routes

Render **different pages based on conditions** — e. a logged-in user sees the dashboard, a guest sees a login screen — handled inside the layout:

```tsx
// app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }) {
  const isLoggedIn = false; // in reality: from a token/localStorage/session

  if (!isLoggedIn) return <p>Please login to view the charts.</p>;
  return <div>{children}</div>;
}
```

Combine with **route groups** (`(auth)` vs `(marketing)` style) so each condition gets its own layout and route set — the same concepts, conditionally applied. Each slot can still have its own loading/error handling.

### Intercepting routes

**You can open a route inside another page — without fully leaving the current page.** Another advanced routing technique. The convention uses **parentheses with dots** to say *which level* to intercept:

| Convention | Matches | Meaning |
|---|---|---|
| `(.)` | Segment on the **same level** | intercept a sibling route |
| `(..)` | Segment **one level above** | |
| `(..)(..)` | Segment **two levels above** | |
| `(...)` | Segment from the **root** | |

Example — same-level interception: a main route `/intercepting` and a separate route `/i1`, plus an intercepting folder inside the first:

```
app/intercepting/
├── page.tsx                  →  /intercepting (main)
└── @i1/(.)i1/
    └── page.tsx              →  intercepts /i1 when navigated from /intercepting
```

- On `/intercepting`, clicking the link to `/i1` → the **intercepted page** renders (inside the current page) instead of the real `/i1`.
- Both routes live at the same level — that's why the `(.)` convention can intercept it.
- **Refresh while intercepted** → you get the real `/i1` page (hard navigation has no interception context).

### Combining parallel + intercepting — the modal pattern

The classic use case: a **posts list** where clicking a post opens a **modal** — the URL changes to `/posts/1`, but the list stays visible behind the modal. On a direct visit/refresh of `/posts/1`, you get the full page instead.

```
app/posts/
├── layout.tsx              ← receives { children, modal } as props
├── page.tsx                →  /posts (list with links)
├── [id]/
│   └── page.tsx            →  /posts/:id (full page)
└── @modal/
    ├── default.tsx         ← returns null (refresh → full page shows)
    └── (.)[id]/
        └── page.tsx        →  intercepts /posts/:id → renders as modal
```

- `@modal` is a parallel slot → automatically available in the posts layout as a prop.
- `(.)[id]` inside the slot **intercepts the same-level `[id]` route** when navigating from the list.
- The intercepted page receives `params` — but it's a **client component** (modal needs `useRouter` for the close button), so it **can't be `async`**. Use React's **`use()` API** to resolve the params Promise:

```tsx
// app/posts/@modal/(.)[id]/page.tsx
'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';

export default function PostModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // client component: use() instead of await
  const router = useRouter();

  return (
    <div className="modal">
      <h2>Modal — Post {id}</h2>
      <button onClick={() => router.back()}>Close</button>
    </div>
  );
}
```

- Open modal from the list → URL becomes `/posts/1`, modal shows over the list.
- Close (or browser back) → returns to `/posts`, the list you came from.
- **Refresh on `/posts/1`** → no interception context → slot unmatched → `default.tsx` returns `null` → the **full page** renders instead.

---

## 13. Route Handlers I — Custom API Endpoints, GET/POST/PATCH/DELETE & Query Params

### What are route handlers

- **App Router recap:** the `app/` folder *is* the router — a folder inside it with `page.tsx` becomes a route (`about/` + `page.tsx` → `/about`). (Interview question: "what is the App Router?")
- **Page routes serve HTML content** — the browser renders a page (about, contact…).
- **Route handlers let you build RESTful endpoints with total control over the response.** Think Node/Express: `/products` → product list, `/users` → user list. In Next.js: `/api/users` → all-users data, `/api/users/:id` → one user's detail — **no separate backend**, all inside Next.js.
- They are **equivalent to API routes** — custom endpoints you can call directly (from your own pages, Postman, anywhere).
- **Full CRUD** is possible — and **no separate server to configure**.
- They can also **call external APIs** — talk to third-party services, read their data, filter it, and send only the useful part to your page.
- They **run on the server side** — never the browser. Sensitive data (private keys, secrets) stays safe, never exposed to the client.
- **Supported methods:** GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS. An unsupported method returns **405 Method Not Allowed**.

### Creating a route handler — `route.ts`

Inside the App Router, any folder can hold a **`route.ts`** file (note: `route.ts`, not `page.tsx`):

```
app/api/products/route.ts → serves /api/products
```

```ts
// app/api/products/route.ts
export async function GET() {
  return Response.json('All products list');
}
```

- The exported function name is the HTTP method — **`GET`, always capital, always async**.
- GET is the default method of any URL request — hitting the URL in a browser fires a GET.
- **`Response.json(...)`** builds the JSON response.
- **Conflict rule:** `page.tsx` and `route.ts` in the same folder **conflict** (error). Keep API routes under an `api/` subfolder.

### GET — return data

```ts
// app/api/posts/route.ts
import { posts } from '@/data'; // mock data: [{ id: 1, title: ..., body: ... }]

export async function GET() {
  return Response.json(posts);
}
```

- Type your data shape (`id`, `title`, `body`) — whoever accesses/updates the data then knows exactly what's inside, and **extra or missing fields can be caught**.
- Hit `/api/posts` in the browser or Postman (or in-editor tools like Thunder Client) → the same JSON response. You can name the endpoint anything (`all-posts`, `blog-posts`, …).

### POST — receive and store data

Scenario: a dashboard with a user list and an "Add user" button — fill name/email, a new record appears. GET gives data to the user; **POST receives data from the user** and stores it.

```ts
// app/api/posts/route.ts
import { posts } from '@/data';

export async function POST(request: Request) {
  const userPost = await request.json(); // the body the user sent

  const newPost = {
    id: posts.length + 1, // mock data IDs are sequential (a real DB auto-generates)
    title: userPost.title,
    body: userPost.body,
  };

  posts.push(newPost);

  return Response.json(JSON.stringify(newPost), {
    headers: { 'Content-Type': 'application/json' },
    status: 201, // Created — the record was created
  });
}
```

- `request: Request` is the incoming request; `await request.json()` parses its body.
- **Status codes:** 200 for GET, **201 (Created)** for POST.
- Test in Postman: `POST /api/posts` with body (raw → JSON): `{"title": "My post", "body": "My post body"}` — valid JSON (double quotes) — → 201 + the created record.

### Dynamic GET — fetch by ID

Scenario: a list page + detail page (Amazon/Flipkart-style — click a product, the URL changes with its ID). The ID comes in the URL, and the handler returns **that** record:

```ts
// app/api/posts/[id]/route.ts — dynamic route handler
import { posts } from '@/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // second arg carries the URL's dynamic segments

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return Response.json('Post not found', { status: 404 });
  }

  return Response.json(post);
}
```

- A handler takes **two arguments**: `request`, then a context object holding **`params`** — the dynamic segments the user sent (`id` here; same bracket-name convention as page routes).
- `params` is a **Promise** — await and destructure.
- Handle the miss: ID `/posts/100` doesn't exist → raw error/500 without a check. Add an `if (!post)` guard and return "Post not found" with a status code (**404** — or 200 depending on your API contract).

### PATCH — update a record

Scenario: someone mistyped a post's title/body and wants to edit it. The user sends **ID + data**; you find the record and update it:

```ts
// app/api/posts/[id]/route.ts
import { posts } from '@/data';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // 1. WHICH record (from the URL)
  const { title, body } = await request.json(); // 2. NEW data (from the body)

  const index = posts.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return Response.json('Post not found', { status: 404 });
  }

  posts[index].title = title; // update title
  posts[index].body = body; // update body

  return Response.json(posts[index]); // return the updated record
}
```

Key points:

- ID comes from `params` (URL), data from `request.json()` (body) — only `title`/`body` update; `id` never changes (it's unique). Destructure just what you need.
- Design decision: you may require both fields (send "enter title **and** body"), or allow either — users may edit title only, body only, or both. Your conditions, your call — but think it through.
- Wrong/unknown ID → `findIndex` returns `-1` → return "Post not found" (404).
- It can also be presented as PUT — same mechanics.

### DELETE — remove a record

Same pattern: ID from `params`, remove the record with plain JavaScript (`splice`):

```ts
// app/api/posts/[id]/route.ts
import { posts } from '@/data';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const index = posts.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return Response.json('Post not found', { status: 404 });
  }

  posts.splice(index, 1); // remove 1 record at that index

  return Response.json({ message: 'Post deleted' });
}
```

- The logic is identical to GET-by-ID and PATCH (await `params` → `findIndex` → `-1` means not found → act), only the final operation differs. (The mock data here is a local array of objects — later it can live in a database instead.)

### URL query params — search

Scenario: 1,000–5,000 posts and the user must search them (`/api/posts?query=...`). Read the query with **`NextRequest`**:

```ts
// app/api/posts/route.ts — GET now also searches
import { posts } from '@/data';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl; // destructured from req.nextUrl
  const query = searchParams.get('query'); // name is yours — 'query', 'search', …

  // default: return everything; if the user searched, return only matches
  let filteredPosts = posts;

  if (query) {
    filteredPosts = posts.filter((post) =>
      post.title.includes(query) // plain JS on the array of objects
    );
  }

  return Response.json(filteredPosts);
}
```

- The parameter name is yours (`query`, `search`, …) — the client must call the same name (`?query=test`).
- No query → all posts; with query → only title-matches.
- Requirements vary: match title only, title **and** body, exact-match only — shape the filter to the requirement.

---

## 14. Route Handlers II — Headers, Cookies & Redirects

### Headers

Important for API integration: different APIs may demand different **request** headers, and **response** headers from APIs need checking.

**HTTP headers provide information about the metadata of an API request and its response.**

- **Request headers** — sent **by the client** (web browser) to the server. They carry essential info about the request so the hosted server can process it correctly:
  - `User-Agent` — browser/device/OS details: where the request came from.
  - `Accept` — the content types (text, video, image formats) the client can handle.
  - `Authorization` — authentication credentials: after login the server gives a **token**; store it, send it back with every request (dashboard etc.); the server checks it — valid → proceed, invalid → reject.
- **Response headers** — sent back **from the server to the client**, with info about the server and the data:
  - `Content-Type` — the response's media type; tells the client what kind of content arrived so it can process it (HTML, plain text, `application/json`, …).

```ts
// app/api/users/route.ts
export async function GET() {
  return new Response('<h2>Hello World</h2>', {
    headers: { 'Content-Type': 'text/html' }, // default was text/plain — now HTML renders
  });
}
```

**Reading what the client sent** — two ways, e. a `Bearer` token from a request's Authorization header:

```ts
// Way 1: from the request object
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  console.log(requestHeaders.get('authorization')); // Bearer <token>
  ...
}
```

```ts
// Way 2: the headers() helper
import { headers } from 'next/headers';

export async function GET() {
  const requestHeaders = await headers(); // from 'next/headers'
  console.log(requestHeaders.get('authorization'));
  ...
}
```

### Cookies

**Cookies are small pieces of data that a server sends to your browser to identify you and remember your preferences** — stored under Inspect → Application → Cookies.

Use cases:

- **User authentication** — identify the user and maintain the login session.
- **User settings/preferences** — e. a dashboard theme: user picks dark over the default light → next visit shows dark.
- **Session management** — track the active session after login.

**Setting and reading** — the handler sets `theme=dark`; every later hit carries cookies to the server automatically:

```ts
// setting a cookie (on the response)
return new Response('...', {
  headers: { 'Set-Cookie': 'theme=dark' },
});
```

```ts
// Way 1: from the request
const theme = request.cookies.get('theme')?.value; // "dark"
```

```ts
// Way 2: the cookies() helper
import { cookies } from 'next/headers';

const cookieStore = await cookies(); // from 'next/headers'
console.log(cookieStore.get('theme')?.value); // "dark"
```

### Redirects from a handler

**You can redirect a user to another page — or another endpoint — from inside a route handler.** Very useful after actions like **login or sign-up**: instead of writing "if API success, go to dashboard" on the frontend, redirect directly from the handler.

Classic case — **API versioning**: `/api/v1/posts` is old; V2 adds functionality without breaking V1 clients. Route the old version forward:

```ts
// app/api/v1/posts/route.ts
import { redirect } from 'next/navigation';

export async function GET() {
  redirect('/api/v2/posts'); // → the new endpoint
}
```

- Request `/api/v1/posts` → handler redirects → data comes from V2.
- Redirect to a **page** the same way (`redirect('/about')`), **dynamically** too — pass params in the target path.

---

## 15. Middleware (Proxy) & Turbopack

### Middleware — the middleman

**Middleware provides a powerful way to intercept and control how requests and responses are handled across your application.** Think of it as the **man in the middle**: on one side your laptop (client), on the other the server (like Amazon's servers). Middleware sits between them, watching what goes out and what comes back — and can change it.

- It **operates globally** — every request/response passes through it, always watching.
- Capabilities: **redirects, URL rewrites, authentication, headers, cookies, and more.** Example: "only logged-in users may visit `/dashboard`" — set one global rule; a guest gets bounced.
- It runs **before pages** — the moment a request fires, middleware checks it first. Only then does anything reach the server/pages. The server's response also passes back through it to you.

### Custom matcher config

Middleware can be scoped: **define specific paths where it should apply and where it shouldn't** — a custom `matcher` config (e. `'/admin/:path*'` — any admin path). Matched paths run middleware; everything else passes through untouched.

```ts
// middleware.ts / proxy.ts (project root)
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/admin/:path*', // only these paths trigger it
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin')) {
    return new NextResponse('Access denied', { status: 401 }); // unauthorized
  }

  return NextResponse.next(); // let everything else through
}
```

- `NextResponse.next()` lets the request pass; `NextResponse.redirect()` sends it elsewhere (login → dashboard; guests → login); a response with `401` denies access.
- Catches come from the guard: allowed paths pass, guarded paths check the condition (token from cookies/localStorage/session) first.

### Next 16: middleware → `proxy.ts`

**In Next.js 16, `middleware.ts` is replaced by `proxy.ts`.** The new middleware — same place (project root), just rename the file. Everything you did in middleware (redirects, auth, headers, cookies, matchers, configs) moves over as-is.

```ts
// proxy.ts — Next 16's middleware
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/admin/:path*', // same matcher config, unchanged
};

export default function proxy(request: NextRequest) {
  // same logic
  return NextResponse.next();
}
```

**The one real difference:** proxy **runs on the Node.js runtime by default** — so things middleware couldn't do now work: read files directly (`fs.readFileSync`), open a **database connection**, etc.

### Turbopack — the new default bundler (stable in Next 16)

**Turbopack is the new default bundler in Next.js 16** — it replaces **webpack** (still used in plain React) for fast development. No install needed; it runs automatically with `next dev`.

- **~2–5× faster builds**, **~10× faster refresh** — changes reflect in the browser almost instantly.
- **File-system caching** — build data saved on disk, so the next project start is much faster.
- **Fast Refresh for server code too** — server changes update instantly; no constant server restarts.
- **True tree-shaking of dynamic imports** — unused code removed automatically → smaller, faster bundles.

Stable by default in Next 16 — every save/update reflects so fast you barely notice the update happening.

---

## 16. Rendering I — CSR, SSR & Hydration

### What is rendering

**Rendering is the process of transforming the code you write for your UI so the user can see it and interact with it.**

In Next.js, the tricky part of a performant application is figuring out **where and when** this transformation should happen. If a visitor waits too long, nobody sticks around today — so when the user visits a URL, they should see *something* instantly, even if things are still loading. This chapter — CSR, SSR, and RSC — is what everything else (server vs client components included) builds on.

**Next.js is built on top of React.** React is the base; Next.js is the layer around it. So first: how rendering works in React, and how it evolved over the years. If you understand React's rendering, Next's rendering follows naturally.

### CSR — Client-Side Rendering

**Flow (request → reference → download → render):**

1. The client (browser/laptop) requests a URL (say, amazon.com) — the server holds the site.
2. The server responds with **HTML *with JavaScript references*** — View Source shows no real content, just script bundles (`_next/static/chunks/...`). Behind the scenes, *everything is JavaScript*; bigger components mean bigger JS.
3. Blank screen for a while. The JS references must be **downloaded** by the browser first.
4. Once downloaded, the browser **generates the HTML on the client** and the UI becomes visible.

So: the browser transforms your React code into what appears on screen — **that's CSR**. It became popular for **SPAs** (React is primarily for single-page apps).

**Drawbacks (big projects exposed them):**

- **SEO** — search engines look for HTML content and keywords. With CSR the initial HTML is **essentially an empty `<div>`** — View Source shows nothing. Google can't understand/crawl/rank the page.
- **Slow for search engines and users** — many nested components + many API calls make the page slow; crawlers can't reliably catch up.
- **Performance** — data fetching, UI building, interactivity: *all* of it runs **in the browser**. Fine for small apps; heavy for large ones — bundles grow with every feature, users wait longer.
- **UX** — until everything finishes, the user gets **a blank screen or a full-page spinner**.

Developers needed a better solution for SEO and performance. The React team moved toward **server-side** solutions.

### SSR — Server-Side Rendering

With SSR the **HTML is generated on the server**, not the client:

1. Browser requests amazon.com.
2. The server generates full **HTML + JavaScript references** and sends them.
3. HTML arrives immediately — **the user sees content right away** (no blank screen).
4. The JS references then download; then **hydration** runs — and only after it finishes does the UI become interactive.

**What SSR fixes:** full HTML arrives → **search engines can index server-side content** → SEO solved. Users see actual content instead of blank screens → content visible faster.

**SSR's own drawbacks:**

- **Interactivity comes later** — the page can't be interactive until the HTML *and* the JS bundle are fully downloaded and executed in the browser. Content shows fast, but clicks do nothing yet.
- **Hydration** (the reason HTML isn't interactive yet) — covered next.

### Hydration

**During hydration, React takes the HTML from the server and uses it as a base in the browser**, then connects that HTML with JavaScript and makes sure everything is correctly placed. After that it adds state, click events, and other logic — making the page **fully interactive**.

So the order is:

1. React takes the server HTML **as the base**.
2. It **connects** it with JavaScript — every sidebar, div, and text goes exactly where it belongs.
3. **Then** it adds interactivity: state, clicks, all your logic.

Hydration rules and challenges (a favorite **interview topic**):

- The browser must load **all JavaScript** before hydration can start.
- Hydration needs the **same structure as the server** — everything must match. Renders differ even slightly (server says 0, client says 1) → **hydration error**. Same structure, same data on both sides, or it breaks.
- **React hydrates the component tree in a single pass** — once all resources download, hydration starts and **doesn't stop until the whole tree is done** (all behind the scenes).
- Consequence: **all components must be hydrated before you can interact with *any* of them** — and the user must wait until data fetching + hydration finish.

### Two server-side rendering types: SSG vs SSR

Next.js has **two main server-side rendering types**:

- **SSG — Static Site Generation:** happens at **build time, when you deploy**. Run `npm run build` → the HTML of every static page (e. blog posts) is **generated along with the build**. Pages already exist. When a user requests one → it's **sent immediately**. Best for static content like blog posts — research deeper use cases as you go.
- **SSR — Server-Side Rendering:** generates the page **when the user makes a request**. Request `/about` → HTML is generated at that moment and handed over. Best for **dynamic, personalized content** where data changes per user — social-media feeds (Instagram/Facebook change per user).

### SSR's three problems

SSR improves over CSR, but comes with its own challenges — because in SSR the **server must fetch ALL data first before sending anything** to the browser:

1. **You have to fetch everything before you can show anything.** The page can't start rendering until all data is ready — if the API is slow, the page is slow, and the user waits.
2. **You have to load everything before you can hydrate anything.** Hydration starts only after *everything* lands in the client browser.
3. **You can't interact with anything before hydration.** No clicks, no interaction, until hydration completes.

**The three problems together:** fetch-all-before-show, load-all-before-hydrate, no-interaction-before-hydration. Very problematic when one slow part of a page (one slow API call among many) makes the *entire* page slow — and today nobody waits.

**Because of these problems, the React team built a new improved SSR architecture** — covered next.

---

## 17. Rendering II — Suspense SSR Architecture & Selective Hydration

To fix CSR's and SSR's drawbacks, the React team built the **Suspense SSR architecture** — introducing a new component called **`<Suspense/>`** (React 18+). It unlocks two major features:

1. **HTML streaming on the server**
2. **Selective hydration on the client**

### The starting point — classic SSR

Classic SSR flow: client requests → HTML is generated on the server → full HTML **with JavaScript references** arrives → references download → hydration starts → UI becomes interactive. Without Suspense, **everything hydrates in one pass** — the whole content at once.

Now the scenario: a page with header, container, **blog list** (via API calls), footer. The blog fetch may take time — wrap *just the blog* in Suspense with a fallback (skeleton, spinner, any text):

```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading blogs…</p>}>
        <BlogList />
      </Suspense>
      <Footer />
    </>
  );
}
```

This tells React: if header/container/footer are ready, **hand them to the user right away** — don't wait for the blog. When the blog is ready, send it through the same stream and slot it in.

### HTML streaming on the server

**Different parts of the page can load and appear separately.**

- If one section (blog) is slow, the ready ones (header, container, footer) still reach the user immediately.
- The slower part arrives **later through the same stream** and is placed exactly where it belongs — never in the wrong spot.
- Think in chunks: whatever the server finishes first gets handed over; the rest follows. With 4 dashboard components, each loads independently instead of everything arriving in one shot.

**One catch:** HTML downloads faster, but **hydration still doesn't start until all JavaScript for the main section downloads.** That limitation was attacked with code splitting.

### Code splitting (interview topic)

**Code splitting = breaking your app into small JavaScript files instead of one big bundle.**

Normally in React, 5–10 components on a page ship as **one bundle** — open the project and all 10 components' code arrives at once, slowing the app.

- With splitting, components load **only when needed**: 4 components on a page → each arrives when it's ready.
- Use **`React.lazy()`**: import the component lazily, use it where needed — its code downloads only when that component is required.
- This **reduces the main bundle size and improves performance** — at any moment the bundle holds only the code needed to load what's needed. (Everything behind the scenes is JavaScript; splitting is about *when* each piece arrives.)

### Selective hydration on the client

Plain SSR hydrates **everything in one pass** — only after all code arrives. **Selective hydration means React can make parts of the page interactive one by one.** With Suspense, React doesn't wait for the whole page — it hydrates the ready sections first while others still load.

**User actions get priority.** Suppose different page sections are still loading and the user clicks a button ("read blog") — **React hydrates that part first**, even while the rest is still loading. The user gets preference: what they clicked is important first, the rest follows. The clicked card hydrates and appears; the other cards hydrate later and become interactive afterward. An easy, memorable example of selective hydration.

**What Suspense-SSR solved** — SSR's three problems, handled:

| SSR's problem | How Suspense-SSR fixes it |
|---|---|
| Data fetching must complete before the server begins rendering | Solved — ready parts stream immediately, slow parts join later |
| JS for the components must fully download client-side before hydration can start | Solved — hydration starts per ready section, not after *everything* |
| All components must hydrate before anything is interactive | Solved — ready sections hydrate and become interactive independently |

### But Suspense-SSR has its own drawbacks

1. **The user still downloads the full JavaScript bundle.** Streaming delivers chunks as they finish, but *all* the code still lands in the browser — and growing features mean bigger bundles → slower loading and performance again. The question: *do we really need to send ALL the code to the browser?*
2. **All components still hydrate on the client — even ones that don't need interactivity.** A header/footer/sidebar with zero interactivity still gets hydrated — wasted resources. Hydrating static components can slow down time-to-interactivity. Should static things hydrate at all? Probably not.
3. **Heavy processing moves to the user's device anyway.** Even with a powerful server, the browser still downloads and executes all the JS. On a slow device (low RAM), the app feels slow — a performance/UX problem.

So the question returns: **should we use the server *more* instead of the client?** More server → less for the client to download → a faster app. That's what comes next: **React Server Components**.

---

## 18. Rendering III — RSC Deep Dive & Server vs Client Usage

Recap of the journey: **CSR → SSR → Suspense-SSR**. Each step solved problems but left challenges — large bundles (too much JS downloaded), unnecessary hydration delaying interactivity.

After Suspense comes **RSC — React Server Components**, a new architecture introduced by the **React team**. With it you can create **server AND client components** — something CSR, SSR, and Suspense alone never allowed — and optimize efficiency, load time, and interactivity together.

### Server components — deep dive

**Server components are React components that run only on the server.** And:

- **Their code is never sent to the browser.** Only the generated HTML reaches you — so the **JavaScript bundle shrinks**.
- Unlike client components, everything stays on the server; the user gets HTML.
- **Together** (server for data, client for interactivity) the app gets faster — organize deliberately.

**Client components refresher:** normal React components — they **run mainly in the browser**, but they *also* render on the server **once, first**. Why? So HTML arrives quickly (no blank screen). Then they run again on the client, where interactivity attaches. **Both runs — server first, then client.** That's how the user sees content immediately instead of a spinner.

### Benefits of server components

- **Small bundle size** — code stays on the server; only HTML ships. Users with slow internet or low-end devices download and run far less.
- **No hydration needed** — an entire extra step skipped → the app loads fast and becomes interactive quickly.
- **Direct access to server resources** — databases, the file system, whatever the server has. Cheaper and faster data fetching: no request from the browser, the server fetches and hands over HTML.
- **Enhanced security** — sensitive data stays on the server where it executes, never reaching the browser. API keys and private data are safe by default.
- **Improved data fetching** — fetch right on the server: faster loads, reduced render time, better overall performance.
- **Caching** — server components can cache; stored data is **reused across multiple users and requests** instead of regenerating. (Fine-tune freshness in the caching sections later.)
- **Fast initial load / First Contentful Paint (FCP)** — ready HTML from the server means the user sees the first screen immediately. Direct HTML also means **search engines can read, crawl, index, and rank** the page.
- **Efficient streaming** — the page can be sent in **chunks/parts**. No waiting for everything: whatever's ready streams out; the user sees content earlier even while slow parts still load.
- **The split: server components handle data fetching + HTML; client components handle interactivity.**

### RSC and Next.js

**The App Router in Next.js is fully designed using the RSC architecture** — it's automatic. Nothing to install, nothing to configure separately. That's another reason Next.js feels advanced: RSC is built in.

### Server vs client in practice

- **Everything is a server component by default.** Add `console.log('server component')` in a page → it logs in the **terminal**, not the browser console. The HTML it produces is generated on the server.
- Try `useState`/`useEffect` there → error: *"you're importing a module that depends on hooks in a Server Component"*. The server can't resolve them. No hooks, no inputs with state, no browser APIs (`localStorage`, `sessionStorage`) — **no handling user actions** in server components at all.
- **Switch to a client component** — `'use client'` at the top of the file → hooks work, inputs track state, the page becomes interactive. (Note: in Strict Mode dev you may see double console logs/renders — harmless.)

### The RSC rendering lifecycle (behind the scenes)

Three main players: **your browser** (request + interacts with UI), **the Next.js framework** (routes, server logic, data fetching), and the **React library** (manages how components render).

**First request** (e. visiting `/contact`):

1. Client sends the request; Next.js matches the route and sees it's a **server component** → tells React to render it.
2. React renders the server component tree (including nested server children) and builds an **RSC payload** — a special serialized representation of the tree (visible in network traffic when navigating between pages).
3. The **server generates HTML from that RSC payload** — on the server.
4. The **streamed HTML** arrives at the browser — a **non-interactive UI** (the user sees it but can't use it yet).
5. At the same time, the **RSC payload** arrives too; the client progressively builds the **final UI** from it.
6. Then **hydration** runs (already covered) — and the UI becomes interactive.

**Updates** (e. typing in an input, which triggers a re-render):

1. The client sends the update request.
2. Next.js again matches the route and server component → React re-renders it into a **new RSC payload**.
3. The client receives the **updated RSC payload**, the affected route **re-renders**, and React **reconciles** — only the changed part updates and merges onto the screen, not the whole page.

First request vs update — two different flows, same payload mechanism.

---

## 19. Rendering IV — Server Render Strategies, Static/Dynamic & RSC Performance

Server render strategies are about **when the HTML is generated**: **static rendering, dynamic rendering, and streaming**.

### Static rendering (default)

**Static rendering is the server rendering strategy in which the HTML page is generated when you build the application** (`npm run build`). Think of it this way: the page is **generated in advance, before any user requests it** — and when someone requests it, the ready page is just handed over.

- Static pages are **cached on the CDN** → they load very fast. The same page is served to different users from cache — no regenerating HTML every time.
- Use it for: **blog posts, product list pages, documentation** — wherever content is the same for everyone.

**You don't have to do anything — static rendering is the default in Next.js.** Every route you create (about, contact…) is static by default. That also explains the instant responses you see when navigating.

**About the build in dev:** a common confusion — "you keep talking about build-time generation, but we're in development, no build yet." During development (`npm run dev`), Next.js prepares routes behind the scenes on the fly; the *strategy* is still static (serve precomputed). The real build-time behavior shows when you actually build:

1. `npm run build` → look inside `.next/server/app/` — `about`, `contact` RSC files with the content baked in; static chunks carry the JS references (in Next 15 these file names looked different; in 16 they're hashed codes).
2. `npm run start` → the production build serves.
3. Add `new Date().toLocaleTimeString()` to the about page → rebuild → refresh any number of times → **the time never changes**. It's the build time. That's a **static route**: generated once at build, served unchanged forever — findable under `.next/server/app/` in the output.

### Prefetching (why static feels instant)

Navigate between pages (home → about → contact) and the Network tab shows almost nothing transferred for the next page. Why? **Prefetching**: links on the home page are **fetched in the background before you click** — Next.js already has the about/contact RSC payloads. Click → the prefetched content is served instantly, no request visible.

But: the **HTML file** in `.next` is used when you **refresh directly or hit Enter on a URL** — that's the other half of static serving.

### Dynamic rendering

**Pages are generated by the server only when the user requests them** — HTML is generated at request time, per visit.

- Useful for **personalized, changing data**: cookies, URL params, user-specific info. Examples: **news websites** (latest article fetched per visit), **shopping pages** (personalized recommendations), **social media feeds** (your own timeline).
- **How a route becomes dynamic:** if you use a **dynamic function** in a route, Next.js automatically makes the page render **dynamically at request time** — it's no longer a static route. **Dynamic functions include:** `cookies()`, `headers()`, `connection()`, `searchParams`, `after()`. Use any one of these → the page **cannot be pre-rendered**; it's generated when the user requests it.

**Demo:** add `await cookies()` (from `next/headers`) to the about page (server components can be `async`, so `await` works), rebuild:

- Terminal marks the about route with the **dynamic indicator** during the build.
- `npm run start`, visit `/about` → the timestamp **changes on every refresh** — regenerated per request.
- `.next/server/app/about/` doesn't exist in the build output — it can't, because nothing was generated at build time.

### RSC performance (why it's fast)

A dashboard route rendering **20,000 rows** of data loads smoothly in Next.js — try the same in plain React and compare. DevTools' **Performance tab** (record → navigate → stop) shows the full breakdown frame-by-frame: request send, waiting, connection download, main-thread work. The flame chart and call tree reveal where each millisecond went. Total render time lands around **7ms** — extraordinarily fast. Zoom/scroll through timings, animations, server-side work per area; event logs and timings for every phase are all visible.

The **RSC payload flow** got notably faster in **Next 16.2** — payloads resolve and stream with far less overhead than before.

### React Compiler (now stable)

**React Compiler is React's own new compiler — it automatically optimizes your code, so you don't have to manually optimize performance anymore.**

- **Without it:** you hand-optimize with `useMemo`, `useCallback`, `memo` — confusing in large projects, easy to misuse (wrap things that don't need it, forget things that do).
- **With it:** **automatic memorization** — the compiler decides when a component must re-render and when to skip. Previously, *any* parent update re-rendered children (unless memoized); now the compiler skips renders itself.
- **Setup (new projects only):**
  ```bash
  npm install babel-plugin-react-compiler
  ```
  ```ts
  // next.config.ts
  export default {
    reactCompiler: true,
  };
  ```
- After restarting, clicking through a parent state update **no longer re-renders the child** — console logs on the child stop firing. (It isn't default-on because enabling it on *existing* projects — which already hand-wrote `useMemo`/`useCallback` — could break code.)

---

## 20. Rendering V — generateStaticParams, Dynamic Params & Streaming

### `generateStaticParams` — pre-generate dynamic routes at build time

Normally dynamic routes (`blogs/[id]`) are generated when the user requests them. But if you **already know the IDs**, you can pre-generate those pages **at build time**:

```tsx
// app/blogs/[blogId]/page.tsx
export async function generateStaticParams() {
  return [{ blogId: '1' }, { blogId: '2' }, { blogId: '3' }];
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  return <div>Blog {blogId}</div>;
}
```

- You'll only do this when you actually know the IDs in advance (e. the 10 blogs you have).
- Rebuild → check `.next/server/app/blogs/` — `1`, `2`, `3` are **already generated**. Visiting them serves instantly; no generation at request time.
- **Multiple dynamic segments** work the same way — return an array of objects per combination (e. `{ category, productId }` for `products/[category]/[productId]`).

**Dev tip (Next 16.1):** dev mode now shows **performance timings** per route — how long each route took to generate — useful for debugging and optimizing slow builds.

### `dynamicParams` — what about non-pregenerated routes?

`dynamicParams` controls what happens if a route was **not pregenerated** (works with `generateStaticParams`). Export it as a boolean:

```tsx
// app/blogs/[blogId]/page.tsx
export const dynamicParams = false; // or true
```

| Value | Visiting an ungenerated ID (e. `/blogs/4` when only 1–3 exist) |
|---|---|
| `true` | Page is **generated on visit** — no error, works normally |
| `false` | **404** — only pregenerated routes are allowed |

- With `false`: pregenerated 1/2/3 work; `4`/`5`/anything else → 404.
- With `true`: `/blogs/4` generates on the spot and renders.
- **When to use which:** `false` for a fixed, known set (specific blogs, statically rendered docs). `true` for listings that grow (product pages — pregenerate the popular ones at build, let new ones generate on demand when visited).

### Streaming — load UI step by step

**Streaming means loading the UI step by step — not all at once.** The server breaks the page into small parts (chunks); each part is sent to the browser **as soon as it's ready**. No blank screen, no waiting for the full page — the user sees content faster, and slow sections show their own loading UI meanwhile.

Scenario: a dashboard with `Products` and `Users` doing API calls (both artificially delayed). Without streaming, everything waits for everything. With `<Suspense>`:

```tsx
import { Suspense } from 'react'; // no extra setup — built into the App Router

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Suspense fallback={<p>Loading products…</p>}>
        <Products />
      </Suspense>
      <Suspense fallback={<p>Loading users…</p>}>
        <Users />
      </Suspense>
    </div>
  );
}
```

- Fallback can be a skeleton, spinner, or any loading UI.
- Result: whichever finishes first shows first ("loading products" → products appear; users still loading meanwhile, then appear). Each part arrives as it's ready — ready-shown, not-ready-loading.

---

## 21. Server-Client Composition, Server-only/Client-only Code, Third-party Packages & Context Providers

### Server vs client composition — where to use what

**Server components — use for:**

- **Data fetching** — fetching API data directly on the server.
- **Direct backend access** — the database lives on the server, so access it there.
- **Sensitive data** — access keys, tokens, API keys stay secure: server code never reaches the client, so **it can never be exposed**.
- **Large dependencies** — heavy libraries handled server-side mean **less JavaScript downloaded** by the user.

**Client components — use for:**

- **Interactivity** — input handling, buttons, clicks (`onClick`, `onChange`, event listeners).
- **State** — `useState`, `useEffect` and all hooks. Hooks in a server component error — use a client component there.
- **Browser features/APIs** — `localStorage`, `sessionStorage` (unavailable on the server).
- **Custom hooks** — client components only.

### Server-only code — the `server-only` package

**Server-only code runs only on the server, never in the browser.** Use it for database queries, secure API calls, and environment variables (`process.env…`).

The `server-only` package **enforces** this by failing the build if the module is ever imported into a client component:

```ts
// lib/index.ts — a shared helper outside app/
import 'server-only'; // npm i server-only — errors if imported in a client component

export const serverSideFunction = () => {
  console.log('server code only');
  return 'server data';
};
```

Import it in a server page → works. Import it in a `'use client'` page → **build error**. A hard boundary for secrets and DB access.

### Client-only code — the `client-only` package

**Client-only code runs in the browser** — for interactivity and UI behavior (events, state, hooks). Server-only things crash there and vice versa:

```ts
// lib/client-code.ts
import 'client-only'; // npm i client-only — errors if imported in a server component

export const clientFunction = () => {
  localStorage.setItem('token', 'abc'); // browser-only — "not defined" on the server
  return 'client data';
};
```

Import it in a client page → works. Import it in a server page → **build error**. (Without the package, plain `'use client'` at the top of the file also marks the module client-side.)

### Third-party packages

Install and use any npm package the normal way:

```bash
npm install motion          # animation library (formerly framer-motion)
npm uninstall motion        # remove a package: npm uninstall <name>
```

- Install adds it to `package.json` (a versioned entry) and `node_modules`.
- Usage follows the package's own docs — e. `import { motion } from 'motion/react'`, then `<motion.div>` like any HTML element (`motion.div`, `motion.p`, `motion.span`…), with props like `initial`, `animate={{ opacity: 1, x: 100 }}`.
- Debugging tip: a "cannot find module" error usually means the package simply isn't installed yet.

### Context providers in Next.js

A context provider is used **the same way as in React** — wrap part of your app to share global data (theme, user/auth data) with every component inside:

```tsx
// context/theme-context.tsx — MUST be a client component
'use client';

import { createContext, useState, type ReactNode } from 'react';

export const ThemeContext = createContext<{ theme: string; toggleTheme: () => void } | null>(null);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
```

```tsx
// app/layout.tsx — wrap the tree (usually the root layout)
import { ThemeContextProvider } from '@/context/theme-context';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}
```

**The rule:** create the context and render the provider **inside a separate client component** — never put provider logic directly in the server root layout, or you'll get an error. The root layout stays a server component and just *wraps* the client provider around `{children}` — so context is available app-wide.

---

## 22. Data Fetching — Server, Client, Loading States, Parallel & Database

Next.js gives you **multiple ways to fetch data**, and the right one depends on your use case — fetching from APIs, from a database, server-side vs client-side, one-after-another vs all-at-once.

### Data fetching in a server component

Server components run on the server — so you can **fetch data directly** with the browser's `fetch` API (it works on Node too), `async`/`await`, **no hooks needed** (and hooks aren't allowed there anyway):

```tsx
// app/blog/page.tsx — server component by default
export default async function BlogsPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 60 } });
  const posts = await res.json(); // array of objects: userId, id, title, body

  return (
    <div>
      <h1>Blogs</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
```

- The component is `async` → `await fetch()` → `await res.json()` → render what comes back.
- Every refresh hits the API again — fresh data on every request.
- **TypeScript:** add a type (`userId: number, id: number, title: string, body: string`) so `post.title`, `post.body` etc. are fully typed with autocomplete.
- This is the **default and best way** to fetch in Next.js — 2–3 lines vs dozens on the client. `console.log` here shows a **server tag** — it runs on the server, never in the browser.

### Data fetching in a client component

Client components can't run server-only logic, so fetching needs hooks + state:

```tsx
'use client';

import { useEffect, useState } from 'react';

type User = { id: number; name: string; email: string };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <p>Loading users…</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

- `useState` for data + loading (+ error if you want), `useEffect` to trigger the fetch, `try/catch` for errors.
- **Much more code** than the server version — and that's exactly the point: **prefer server components for fetching** unless you truly need interactivity.

### `loading.tsx` — loading UI via Suspense

In a server component you don't write loading state by hand. Create a `loading.tsx` inside any route folder:

```tsx
// app/blog/loading.tsx
export default function Loading() {
  return <p>Loading posts…</p>; // spinner, skeleton — your choice
}
```

Next.js **automatically wraps the page in Suspense** with this as the fallback. While data loads, the user sees the loading UI instantly (header/footer stay visible); once ready, the real content swaps in. Add an artificial delay (`await new Promise(r => setTimeout(r, 5000))`) in the page to see it in action.

### `error.tsx` — error boundary for runtime errors

Also a special file (`error.tsx`/`error.js`). It catches **unexpected runtime errors** in that route segment so the whole app doesn't break:

```tsx
// app/blog/error.tsx
'use client'; // error boundaries are client components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <h2>Something went wrong: {error.message}</h2>;
}
```

- `error.message` is what the user sees (e. you `throw new Error('Error loading posts')`).
- Dev shows a detailed overlay; production shows a blank page without this — `error.tsx` gives users something meaningful in production.
- `reset()` retries client-side; for **server-side** errors, retry via `router.refresh()` inside `startTransition` (background refresh, no full reload).

### Data fetching patterns — sequential vs parallel

When fetching inside a component there are **two methods**:

#### 1. Sequential fetching

One request **after another** — the second depends on the first's result:

```tsx
// app/blog/[id]/page.tsx — dynamic route, params is a Promise in Next 15+
export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json(); // need post.userId next

  const res2 = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
  const user = await res2.json();

  return <div>{post.title} by {user.name}</div>;
}
```

- Request A runs, resolves, then Request B starts (using A's data — e. `post.userId` → fetch that user).
- One by one → **slower total time**, but correct when data depends on earlier data.
- Wrap in `<Suspense fallback={<p>Loading…</p>}>` so a slow step shows a fallback instead of blocking the whole page.

#### 2. Parallel fetching

Requests start **at the same time** and load together — reduces total loading time:

```tsx
// app/parallel/[id]/page.tsx
type Post = { id: number; userId: number; title: string; body: string };
type Album = { userId: string; id: number; title: string };

async function getUserPosts(userId: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return res.json(); // Post[]
}

async function getUserAlbums(userId: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
  return res.json(); // Album[]
}

export default async function ParallelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // start both requests, don't await each one separately (that would block/sequence them)
  const postData = getUserPosts(id);      // Promise
  const albumData = getUserAlbums(id);    // Promise

  const [posts, albums] = await Promise.all([postData, albumData]);

  return (
    <div className="flex">
      <div>{/* map posts → titles */}</div>
      <div>{/* map albums → titles */}</div>
    </div>
  );
}
```

- `getUserPosts(id)` and `getUserAlbums(id)` both fire immediately; `Promise.all` resolves when **both** are done.
- **Do not** `await` each call before `Promise.all` — awaiting one at a time makes them sequential again and blocks the page.
- Both results render side by side (posts left, albums right). Change `id` in the URL → data for that user loads.

#### Request memorization (automatic)

Next.js **automatically memoizes fetch requests** with the same URL across multiple components on the same page:

- Component A, B, C all fetch `https://…/posts/1` → Next.js makes **one** HTTP call, caches the result, and reuses it everywhere.
- Unnecessary duplicate calls are skipped → better performance.
- Works for `fetch` (GET) — dedupe happens per request URL within a render pass.

### Fetching from a database

So far we fetched from an API endpoint with `fetch`. The same idea applies to a **database** inside a server component — this is the base for everything that follows (server actions, mutations…):

- Build the table, insert data, then fetch from the DB in a server component.
- Database code is **server-only** — keep it behind the `server-only` boundary (Section 21) so credentials never leak to the client.

---

## 23. Server Actions & Mutations — Forms, Revalidation & Optimistic UI

In the previous section we saw that a server component can reach straight into the database with Prisma — no API route, no `fetch`, no secrets leaking to the browser. We only *read* data there. A real application also *writes*: users sign up, edit profiles, delete accounts. That's **data mutation** — creating, updating, or deleting data.

So far, the only way we knew to write from a browser form was the "API route dance": create a `route.ts` with a `POST` handler, call it from a `'use client'` component with `fetch`, `JSON.stringify` the body, handle loading and error states, then `router.push` somewhere. It works (we built exactly that: create user → API route → client fetch → redirect to the user list), but it's an extra hop. The client talks to an API route, and the API route talks to the database. Two requests, more boilerplate than a simple form needs.

**Server Actions** remove that middleman. A server action is an async function marked with `'use server'` that runs on the server, yet you can invoke it directly from a client component — even straight from an HTML `<form>`. No `fetch`, no `route.ts`, no JSON. The browser submits the form, Next.js sends the form data directly to your server function, and you validate, write to the database, and redirect — all in one place.

Think of it like ordering at a restaurant counter: before, the waiter (API route) took your order to the kitchen (database) and brought the food back. With server actions, you place the order directly with the kitchen. Same food, fewer people in between.

### The two ways to write a server action

**1. Function-level `'use server'`** — mark just the function:

```ts
export async function createUser(formData: FormData) {
  'use server'
  const name = formData.get('name') as string
  await prisma.user.create({ data: { name } })
  redirect('/users')
}
```

**2. File-level `'use server'`** — put the directive at the very top of a dedicated file (for example `app/actions/user.ts`). Every exported function in that file then runs on the server. This is the cleaner choice: your Prisma client and database credentials live in one server-only file (the `@/lib/db` setup from Section 22 also imports `server-only`, so it can never accidentally reach the client), and nothing in it can be used by client code by mistake.

One rule to remember: a server action cannot use React hooks (no `useState`, no `useActionState` inside it), and it should not be defined inside a `'use client'` file. The client component only *calls* the action — the action itself lives in server code, typically in a separate `actions/` file.

### Calling an action from a form: `useActionState`

React's `useActionState` hook wires a form to a server action. Here is the create-user page from the course, rebuilt with a server action instead of an API route.

First, the shared types and the server action:

```ts
// app/actions/user.ts
'use server'

import { prisma } from '@/lib/db'   // single PrismaClient instance (set up in Section 22)
import { redirect } from 'next/navigation'

export type FormError = {
  name?: string
  email?: string
  phone?: string
}

export type FormState = {
  errors?: FormError
  message?: string
}

export async function createUserAction(
  prevState: FormState | undefined,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string

  const errors: FormError = {}
  if (!name) errors.name = 'Name is required'
  if (!email) errors.email = 'Email is required'
  if (!phone) errors.phone = 'Phone is required'
  if (Object.keys(errors).length > 0) {
    return { errors }   // sent back to the form as `state`; no redirect happens
  }

  // Artificial 2-second delay only for the demo — remove in production
  await new Promise((resolve) => setTimeout(resolve, 2000))

  await prisma.user.create({ data: { name, email, phone } })
  redirect('/users')   // navigates + revalidates so the user list refreshes
}
```

Every line matters here: `prevState` is what the action last returned (starts as `undefined`); `formData` arrives automatically from the submitted form. Returning `{ errors }` without redirecting tells Next.js "stay on the page and show these errors." `redirect` ends the action and sends the browser to `/users`.

Now the client form:

```tsx
// app/create-user/CreateUserForm.tsx
'use client'

import { useActionState } from 'react'
import { createUserAction } from '@/actions/user'

const initialState: FormState = { errors: {} }

export default function CreateUserForm() {
  const [state, formAction, isPending] = useActionState(createUserAction, initialState)

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
        {state.errors?.name && <span>{state.errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        {state.errors?.email && <span>{state.errors.email}</span>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" />
        {state.errors?.phone && <span>{state.errors.phone}</span>}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating…' : 'Create User'}
      </button>

      {state.message && <p>{state.message}</p>}
    </form>
  )
}
```

`useActionState(createUserAction, initialState)` returns three things: `state` (the last value the action returned — here our errors/message), `formAction` (pass it to the form's `action` prop), and `isPending` (true while the server action is running — perfect for disabling the submit button so the user can't double-submit). That's the whole form logic: no `fetch`, no `try/catch`, no API route.

The page that hosts it stays a server component:

```tsx
// app/create-user/page.tsx
export default function CreateUserPage() {
  return <CreateUserForm />
}
```

### Showing pending state without props drilling: `useFormStatus`

In the example above, the submit button reads `isPending` directly from `useActionState`. But what if your button lives in a separate component deep in the tree, and you don't want to pass `isPending` down through every level as a prop? React's `useFormStatus` hook reads the status of the closest parent form automatically:

```tsx
// components/SubmitButton.tsx
'use client'

import { useFormStatus } from 'react'

export default function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting…' : children}
    </button>
  )
}
```

`useFormStatus` gives you `pending`, `data`, `action`, and `method` of the form that triggered it — no props drilling needed. Place `<SubmitButton>` inside any `<form action={formAction}>` and it disables itself while the server action runs. Like `useActionState`, this is a client-only hook, so the button is its own `'use client'` component — the same server/client split we practiced in Section 21.

### Editing a user: dynamic route + `await params`

The edit page is a dynamic route, `app/users/[id]/page.tsx`. In Next 15, `params` is a Promise, so you must await it before using `id`:

```tsx
// app/users/[id]/page.tsx
import { prisma } from '@/lib/db'
import { getUser } from '@/actions/user'
import { EditUserForm } from './EditUserForm'

export default async function EditUserPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getUser(id) // server action: prisma.user.findUnique({ where: { id } })

  if (!user) {
    return <div>User not found</div>
  }

  return <EditUserForm user={user} />
}
```

`getUser` lives in the same `actions/user.ts` server file, so the database query never leaves the server:

```ts
// inside app/actions/user.ts
export async function getUser(id: string) {
  'use server'
  return prisma.user.findUnique({ where: { id } })
}
```

The edit form is a client component (it uses `useActionState`). Its action is `updateUserAction`, bound to a specific user id with `.bind(null, id)` so the form only sends the editable fields:

```tsx
// app/users/[id]/EditUserForm.tsx
'use client'

import { useActionState } from 'react'
import { updateUserAction } from '@/actions/user'

type Props = {
  user: { id: string; name: string; email: string; phone: string | null }
}

export default function EditUserForm({ user }: Props) {
  const [state, formAction, isPending] = useActionState(
    updateUserAction.bind(null, user.id), // id is fixed; the form sends only name/email/phone
    { errors: {} }
  )

  return (
    <form action={formAction}>
      <input name="name" defaultValue={user.name} />
      <input name="email" defaultValue={user.email} />
      <input name="phone" defaultValue={user.phone ?? ''} />
      {state.errors?.email && <span>{state.errors.email}</span>}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Updating…' : 'Update User'}
      </button>
    </form>
  )
}
```

And the server action — note that `userId` comes *before* `prevState` and `formData`; React calls the bound function with `(prevState, formData)` on submit, so Next.js handles that wiring for you:

```ts
// inside app/actions/user.ts
export async function updateUserAction(
  userId: string,
  prevState: FormState | undefined,
  formData: FormData
): Promise<FormState> {
  'use server'
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string

  if (!email) return { errors: { email: 'Email is required' } }

  // Artificial 2-second delay only for the demo — remove in production
  await new Promise((resolve) => setTimeout(resolve, 2000))

  await prisma.user.update({
    where: { id: userId },
    data: { name, email, phone },
  })
  redirect('/users')
}

export async function deleteUserAction(id: string) {
  'use server'
  // Artificial 5-second delay only for the demo — remove in production
  await new Promise((resolve) => setTimeout(resolve, 5000))
  await prisma.user.delete({ where: { id } })
}
```

### Revalidation: making sure the list shows fresh data

After a successful `create` or `update`, `redirect('/users')` does two things: it navigates to the user list, and it tells Next.js to **revalidate** that route so the list re-fetches and shows the new data. You don't need `revalidatePath` here — `redirect` handles it automatically.

If you ever need to refresh a route without redirecting, Next.js provides two helpers from `next/cache`:

- `revalidatePath('/users')` — purge the cache for a path so the next visit fetches fresh data.
- `revalidateTag('users')` — purge everything cached under a tag (you attach tags with `cache(tag)`, covered in Section 24).

Call either inside a server action when you need programmatic revalidation. We'll see them in action with caching in the next section.

### `<Form>` from `next/form`

Next.js also ships a `<Form>` component (`next/form`) that submits to a server action like a normal HTML form but integrates with Next.js navigation and revalidation — and it works even if JavaScript fails to load (progressive enhancement):

```tsx
import { Form } from 'next/form'

<Form action={createUserAction}>
  <input name="name" />
  <button type="submit">Create</button>
</Form>
```

### Optimistic UI: `useOptimistic`

So far the user waits for the server before anything changes. For actions like delete, you can do better: update the UI *immediately*, and let the server finish in the background. That's **optimistic UI**.

React's `useOptimistic` hook works like `useState` with an extra update function:

```tsx
// app/users/UserList.tsx
'use client'

import { useOptimistic } from 'react'
import { deleteUserAction } from '@/actions/user'

type User = { id: string; name: string }

export default function UserList({ users }: { users: User[] }) {
  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    users,
    (currentUsers, { id }: { id: string }) =>
      currentUsers.filter((u) => u.id !== id)
  )

  async function handleDelete(id: string) {
    addOptimisticUser({ id }) // vanish from the list instantly
    await deleteUserAction(id) // server deletes it (5-second demo delay)
  }

  return (
    <ul>
      {optimisticUsers.map((u) => (
        <li key={u.id}>
          {u.name}
          <button onClick={() => handleDelete(u.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
```

The update function receives the current optimistic state and the payload you passed (`{ id }`), then returns what the UI should show *right now* — here, the list minus the deleted user. The server action runs behind the scenes; if it fails, Next.js reconciles and the UI snaps back to the real server state. In the course demo, the delete action had an artificial 5-second delay, yet the user disappeared from the list the moment the button was clicked — that's optimistic UI in practice.

### What it is NOT

- A server action is **not** a replacement for every API route. Use route handlers (`route.ts`) when you need a public webhook URL (Stripe, GitHub) or a real `GET/POST` endpoint for third parties. Server actions are for your own app's forms and mutations.
- It is **not** client-side code: the function body never runs in the browser, even though Next.js generates a client-side reference so the form can call it.
- `useActionState`, `useFormStatus`, and `useOptimistic` are **React hooks**, so they live only in `'use client'` components. The actions they call remain server functions, usually in a separate `actions/` file.

### In your own words

1. What does adding `'use server'` at the top of a file do?

   <details>
   <summary>Answer</summary>
   It makes every exported function in that file a server action — each runs on the server and can be called directly from client components or forms without an API route.
   </details>

2. What does `useActionState` return, and what do you do with the second value?

   <details>
   <summary>Answer</summary>
   It returns `[state, formAction, isPending]`. Pass `formAction` to `<form action={formAction}>` so submitting the form invokes your server action.
   </details>

3. Why can't `useActionState` / `useFormStatus` / `useOptimistic` live inside a server component?

   <details>
   <summary>Answer</summary>
   They are React hooks, and hooks only work in `'use client'` components. Keep the form/button in a client component and import the server action from a separate `actions/` file marked `'use server'`.
   </details>

4. After `redirect('/users')` in a server action, does the user list still need `revalidatePath` to show the new data?

   <details>
   <summary>Answer</summary>
   No — `redirect` automatically revalidates the target route, so the list refreshes with fresh data on its own.
   </details>

5. What does optimistic UI mean for a delete button, and which hook provides it?

   <details>
   <summary>Answer</summary>
   The user vanishes from the list immediately when Delete is clicked, while `deleteUserAction` runs on the server in the background. React's `useOptimistic` hook provides this behavior.
   </details>

---

## 24. Caching — `use cache`, `cache`, `cacheTag`, `cacheLife` & Revalidation

In the previous section we made *writes* fast: server actions let you create, update, and delete users without an API route dance, and `redirect` automatically revalidates the list so the fresh data shows up. But now flip it around: what about *reads*? Imagine a blog with 101 posts where you (or your admin) publish a new post once every 5–10 days. A reader opens the blog every day. Why should Next.js hit the database — or an external API — on every single visit when the content barely changes?

That's **caching**: save the data once, serve the saved copy, and don't fetch it again and again. It makes your app faster and cheaper.

### `use cache` — remembering data at the component level

Next.js 15 gives you the `use cache` directive. Place it at the top of a server component (or inside an async function), and Next.js remembers the result of that component's data fetch instead of re-running it on every request:

```tsx
// app/posts/page.tsx
'use cache'

import { getPosts } from '@/lib/data'

export default async function PostsPage() {
  const posts = await getPosts() // fetched once, then served from cache
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

The first visitor triggers the fetch; every visitor after that gets the cached copy until it expires. No database hit, no API call, no `fetch` overhead.

### Where the data comes from: `lib/data.ts`

The course demo uses a tiny data layer over the free JSONPlaceholder fake API:

```ts
// lib/data.ts
export async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' })
  return res.json()
}
```

Note `{ cache: 'no-store' }` on the raw `fetch`: we want *Next.js* to control caching via `use cache`, not the browser/HTTP cache. With `use cache` on the page, Next.js caches the resolved posts in its own server-side data cache.

### Cache life: `cacheLife` — when does it expire?

Cached data can't live forever, or your blog would never show a newly published post. Next.js lets you set a cache lifetime:

```tsx
import { cacheLife } from 'next/cache'

cacheLife({ hours: 1 })
```

`cacheLife({ hours: 1 })` keeps the data for one hour; after that it expires and the next request fetches fresh. You can pass `days`, `hours`, `minutes`, `seconds`, or `milliseconds`. In the demo, the posts list stayed cached for one hour — after that, the cache flushed and the next visit re-fetched.

### Cache tags: `cacheTag` — invalidating by label

Sometimes you know *exactly* when data changes: right after a user creates a post. You don't want to wait an hour for the cache to expire; you want the list fresh *now*. That's where **tags** come in.

Tag cached data with a label:

```tsx
import { cacheTag } from 'next/cache'

cacheTag('posts')
```

Then, from anywhere — a server action, a route handler — purge everything under that tag:

```tsx
import { revalidateTag } from 'next/cache'

revalidateTag('posts')
```

`revalidateTag` marks the tagged cache as stale in the background; the next request re-fetches and serves updated data. Combined with `redirect`, your create-flow becomes: submit → server action creates the post → `revalidateTag('posts')` refreshes the cache → `redirect` to the post page, which shows fresh data immediately.

### The full create flow: `app/admin/page.tsx`

The course demo puts this together in an admin page with a form that submits to a server action:

```tsx
// app/admin/page.tsx
export default async function AdminPage() {
  return (
    <form action={addPostAction}>
      <input name="title" type="text" />
      <input name="body" type="text" />
      <button type="submit">Create Post</button>
    </form>
  )
}
```

And the server action — it calls an external API, then invalidates the tagged cache, then redirects:

```ts
// app/actions/post.ts
'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addPostAction(formData: FormData) {
  const title = formData.get('title') as string
  const body = formData.get('body') as string

  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body }),
  })

  revalidateTag('posts') // purge the tagged cache in the background
  redirect('/posts') // navigate to the list; redirect auto-revalidates the route
}
```

`revalidateTag` runs first so the cached list is purged, then `redirect` navigates and auto-revalidates the target route — the user sees the new post instead of a stale cached copy.

### Caching API routes: route handlers

You can cache route handlers too — the same formula applies inside `route.ts`:

```ts
// app/api/post/route.ts
'use cache'

import { cacheTag, cacheLife } from 'next/cache'

cacheTag('posts')
cacheLife({ hours: 1 })

export async function GET() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  return Response.json(await res.json())
}
```

The course sets a task here: build a **dynamic route handler** (e.g. `app/api/post/[id]/route.ts`), cache it by tag, and keep it updated. After one hour the cache flushes automatically; when a post changes, `revalidateTag('posts')` purges it early — so you never have to wait out the full cache life.

### The downside of caching

Caching speeds things up, but it's not a free lunch. If you cache blindly, updated backend data may never reach the UI: a user edits a post, but the list still shows the old title because the cache hasn't expired. So you must know **what** you're caching, **where**, and **for how long**, and you must invalidate (`revalidateTag` / `revalidatePath`) whenever the underlying data changes.

### What it is NOT

- `use cache` is **not** the browser's HTTP cache: it's Next.js's server-side data cache. The `{ cache: 'no-store' }` on `fetch` ensures the raw HTTP layer doesn't interfere with Next.js's own caching.
- It is **not** a substitute for revalidation: caching without invalidation shows stale data.
- Route handler caching with `use cache` is **not** the same as ISR (`revalidate` in `generateStaticParams`) — they're different layers; this section sticks to the course's `next/cache` primitives.

### In your own words

1. What is caching, and why use it for a blog that changes rarely?

   <details>
   <summary>Answer</summary>
   Caching means saving data once and serving the saved copy instead of fetching it again and again. For a blog updated every few days, it avoids repeated database/API calls on every visit, making the app faster and cheaper.
   </details>

2. What does `use cache` do in a server component?

   <details>
   <summary>Answer</summary>
   It tells Next.js to remember the component's data-fetch result in the server-side data cache, so subsequent requests serve the cached copy instead of re-fetching.
   </details>

3. How do `cacheLife` and `cacheTag` differ?

   <details>
   <summary>Answer</summary>
   `cacheLife` sets how long data stays cached (e.g. `{ hours: 1 }`). `cacheTag` labels cached data with a tag (e.g. `'posts'`) so you can invalidate it selectively later with `revalidateTag('posts')`.
   </details>

4. After creating a post in a server action, why call `revalidateTag('posts')` before `redirect`?

   <details>
   <summary>Answer</summary>
   `revalidateTag` purges the tagged cache in the background so fresh data is fetched; `redirect` then navigates there and auto-revalidates the route, so the user sees the new post immediately instead of a stale cached copy.
   </details>

5. What risk comes with caching everything you can?

   <details>
   <summary>Answer</summary>
   Stale data: if backend data changes but the cache isn't invalidated, the UI shows outdated content. Know what, where, and how long you cache — and invalidate when data changes.
   </details>

---

## 25. Next.js MCP — AI Dev Tool That Reads Your App for You

### What is MCP?

Imagine you're building a Next.js app with 40+ routes. You want to add authentication. You switch to your AI chat, paste your folder structure, describe your routes, and ask "Where should I add the login page?" The AI gives a generic answer — because it hasn't actually seen your code.

What if the AI could read your app itself — every route, every file, every server action — and give you precise answers based on your real codebase?

That's what **Next.js MCP (Model Context Protocol)** does. It's a dev tool from Vercel that arrived in Next.js 16 / 16.2. It lets AI coding agents (Cursor, Gemini CLI, VS Code, Codex) connect to your Next.js app, understand your codebase automatically, and help you debug — without you manually copying and pasting files into the chat.

### Why it matters

MCP stands for **Model Context Protocol**. Think of it as a USB-C port for AI — a standard way for AI tools to "plug into" your application and read its structure. Once connected, the AI knows your routes, your logic, your file layout. You can ask it "How many routes do I have?" or "Where is the posts API located?" and it answers from your actual code, not guesswork.

In big projects, you can't keep every route in your head. MCP makes your app **AI-friendly**. It works through the terminal/command line: you run your app, connect the AI tool via CLI, and then ask questions or give commands. Tools like ChatGPT, Cursor, Gemini can work with your app better because they see the real structure.

### Setting it up

The transcript walks through installing the cloud CLI, then adding the Next.js dev tool MCP:

```bash
# Install the cloud CLI (needed for the MCP commands)
npm install -g @cloud/mcp

# Add the Next.js dev tool MCP to your project
npx add @next/mcp-tool@latest

# Or equivalently:
cloud mcp add next-dev-tool mcp@latest
```

When you run this, it asks which AI agents to connect (you can pick specific ones or "all agents"), and it **auto-creates a `.mcp.json` file** in your project. It configures Cursor, Gemini, Codex, and VS Code so they can talk to your app.

### What you can ask it

Once connected, you can ask the AI questions like:

- *"Give me a list of all routes in my app"* → it reads your `app/` folder and lists every route automatically
- *"How do I add authentication in my Next.js app?"* → it reads Next.js documentation and suggests approaches (NextAuth.js, Clerk, custom auth, caching layer)
- *"Debug this route — why is it returning 500?"* → it looks at your actual route handler code

The `get routes` tool is especially handy: instead of hunting through folders, you just ask and get a list of all your routes, page routes, API routes, and dynamic segments.

### Next Browser

Vercel also built an experimental CLI tool called **next-browser**. It's a coding agent that lets you look at your running app in the browser — **without you opening the browser yourself**. All your code shows up right in your editor.

It pairs with **adapters** so your app can run on different hosting environments (AWS Lambda, Vercel, Cloudflare, Netlify). To use an adapter:

1. Create an adapter file (e.g. `my-adapter.js`)
2. Modify `next.config.js` with your configuration
3. Register the adapter with your Next.js config

This means your app isn't locked to one platform — the adapter handles the deployment target for you.

### What it is NOT

- **It's not a replacement for your own testing.** You still need to click around and verify things yourself.
- **It's not only for Cursor.** It works with Gemini, Codex, VS Code, and other AI agents.
- **It's not production-only.** It's a development tool to help you build and debug faster.

### In your own words

1. What is MCP's full form, and what problem does it solve?

   <details>
   <summary>Answer</summary>
   Model Context Protocol. It lets AI coding agents connect to your Next.js app, read your routes and code automatically, and help you debug — instead of you manually pasting files into the chat.
   </details>

2. Which command adds the Next.js MCP dev tool to your project?

   <details>
   <summary>Answer</summary>
   `npx add @next/mcp-tool@latest` (or `cloud mcp add next-dev-tool mcp@latest`). It auto-creates `.mcp.json` and wires up your AI agents.
   </details>

3. What can the `get routes` tool do?

   <details>
   <summary>Answer</summary>
   It automatically reads your app's routes and lists them for you — useful when you have dozens of routes and don't want to hunt through folders.
   </details>

4. What is `next-browser`, and who made it?

   <details>
   <summary>Answer</summary>
   An experimental CLI tool by Vercel (Next.js 16.2) that lets you inspect your running app from your editor without opening a browser yourself.
   </details>

5. Name two hosting platforms you can target with Next.js adapters.

   <details>
   <summary>Answer</summary>
   AWS Lambda and Vercel (also Cloudflare, Netlify). An adapter file plus `next.config.js` config lets your app run on different platforms.
   </details>

---

*Next: State management at scale — Redux Toolkit, when prop drilling through 100 components stops being practical.*

*Next: Dev tools — Next.js MCP (Model Context Protocol) server, which lets AI coding agents inspect your routes, debug your running app, and understand your codebase automatically.*

## 26. Redux Toolkit — Central State Management Without Prop Drilling

### What is Redux Toolkit?

You've seen how Next.js handles data on the server. But what about client-side state that many components need — the current user, a shopping cart, theme preference? Passing that through props from a top-level layout down to a deeply nested button is **"prop drilling"** — and in a 100-component app, it's a nightmare.

Redux Toolkit solves this by giving you **one central store**. Any component can read or update it directly. Instead of passing props again and again to child components, you keep data in one place and any component can grab it directly.

Redux Toolkit is the official, recommended way to write Redux logic. It stores your data in one central place instead of scattering it across component state. Different parts of your app can use the same data easily.

### The flow

Here's how data moves through Redux Toolkit:

1. You **dispatch an action** from a component (e.g. user clicks "Add User")
2. The **reducer** (a function) decides how the data should change
3. The **store** updates with the new data
4. Components that **subscribed** to that data get the updated values automatically

So the chain is: **Component → dispatch action → reducer → store → subscribed components re-render**

### Setting it up

Install the packages:

```bash
npm install redux @reduxjs/toolkit react-redux
```

#### 1. Create a slice

A slice is a piece of Redux state with its own reducers. Create `store/userSlice.ts`:

```tsx
import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: number | null;
  name: string;
});

export const { setUser, setUsers, setLoading, setError, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
```

`createSlice` auto-generates action creators and action types from your reducers — you write less boilerplate than vanilla Redux.

#### 2. Configure the store

Create `store/store.ts`:

```tsx
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

`configureStore` sets up your store with the reducers. `RootState` and `AppDispatch` are TypeScript types you'll use for typed hooks.

#### 3. Create typed custom hooks

Create `store/hooks.ts`:

```tsx
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

These are typed versions of React Redux's `useDispatch` and `useSelector`. TypeScript knows your state shape and action types.

#### 4. Create a store provider

Redux needs a `<Provider>` wrapper. Since hooks require a client component, create `store/storeProvider.tsx`:

```tsx
'use client';

import { Provider } from 'react-redux';
import { store } from './store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

#### 5. Wrap your layout

In `app/layout.tsx`:

```tsx
import { StoreProvider } from '@/store/storeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
```

You can't make the layout itself a client component directly, so you create a separate client component provider and wrap the layout with it.
  email: string;
}

export interface UserState {
  currentUser: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  loading: false,
  error: null,
};

### Async actions with Axios

The course fetches users from JSONPlaceholder using axios inside an async action. Create `store/userActions.ts`:

```tsx
import axios from 'axios';
import { setUsers, setLoading, setError } from './userSlice';
import { AppDispatch } from './store';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`${BASE_URL}/users`);
    dispatch(setUsers(data));
  } catch (err: any) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};
```

Key points:

- `dispatch(setLoading(true))` before the API call — spinner shows
- `dispatch(setUsers(data))` on success — users saved to store
- `dispatch(setError(err.message))` on failure — error stored
- The `finally` block sets `loading` to `false` **whether the call succeeded or failed**, so the spinner hides in both cases

Install axios:

```bash
npm install axios
```

### Using it in a component

```tsx
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUsers } from '@/store/userActions';

export default function UserPage() {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

The component dispatches `fetchUsers()` on mount, reads `users` and `loading` from the store, and re-renders automatically when the store updates.

### What it is NOT

- **It's not a replacement for React Context for every little piece of state.** Use Context for theme or auth; use Redux Toolkit for complex global state that many components share.
- **It's not needed for small apps.** If you have 3–4 components, plain `useState` is fine — don't add Redux just because you can.
- **It's not a database or backend.** It's client-side state only. When the user refreshes, the store resets unless you persist it (e.g. to `localStorage`).

### In your own words

1. Why use Redux Toolkit instead of passing props through every component?

   <details>
   <summary>Answer</summary>
   It keeps data in one central store, so any component can read or update it directly — no prop drilling through 100 component layers.
   </details>

2. What are the three main pieces of the Redux flow?

   <details>
   <summary>Answer</summary>
   Action (what happened), Reducer (how data changes), Store (where data lives). Components subscribe to the store and get updates automatically.
   </details>

3. What does `createSlice` do?

   <details>
   <summary>Answer</summary>
   It auto-generates action creators and action types from your reducers, so you write less boilerplate than vanilla Redux.
   </details>

4. Why do you need `useAppDispatch` and `useAppSelector` instead of the raw hooks?

   <details>
   <summary>Answer</summary>
   They're typed versions tied to your `RootState` and `AppDispatch`, so TypeScript knows your state shape and action types.
   </details>

5. What does the `finally` block do in `fetchUsers`?

   <details>
   <summary>Answer</summary>
   It sets `loading` to `false` whether the API call succeeded or failed, so the loading spinner hides in both cases.
   </details>

## 27. Clerk Authentication — Drop-In Auth for Next.js

You just saw how Redux Toolkit keeps global state in one place so components don't have to pass props down through twenty layers. But there's another kind of state that matters even more in real apps: **who the user is**. You've experienced this a thousand times — you open a website and see "Sign in with Google" or a little profile icon in the corner, or you click a button and it says "Log in to continue." That whole flow — checking if someone is logged in, showing login buttons when they aren't, showing their name and avatar when they are — is **authentication**.

Building authentication from scratch is a full-time job in itself. You need password hashing, reset emails, session cookies, token expiry, social login providers (Google, GitHub, Facebook), and security audits. Most teams don't want to build that from zero. They want to drop in a login system like they'd drop in a UI component library. That's where **Clerk** comes in. Clerk is an authentication provider designed for frameworks like Next.js. You install it, wrap your app in a provider, add a few components, and you have sign-in, sign-up, sign-out, user profiles, and protected routes — all without writing your own database of passwords.

The setup is small because Clerk does the heavy thinking. You install the package, put a `<ClerkProvider>` around your app in `layout.tsx`, and that's it — Clerk knows about every route after that.

```tsx
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

`ClerkProvider` reads your Clerk keys from environment variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`), so it can talk to Clerk's servers and know who's logged in. Wrap it at the root so every page, layout, and component underneath can ask "is this user signed in?"

Once the provider is in place, you can put auth buttons in your header. Clerk ships ready-made components: `<SignIn />` opens the login flow, `<SignUp />` opens registration, `<UserButton />` shows the user's profile menu when they're logged in, and `<SignOut />` logs them out. You don't build the modals or the forms — Clerk renders them.

Here's how you'd show different buttons depending on whether the user is logged in. You use `useAuth()` from `@clerk/nextjs`, which tells you `isSignedIn` and whether Clerk has finished loading (`isLoaded`):

```tsx
// components/Header.tsx — 'use client'
'use client';

import { SignIn, SignUp, UserButton, useAuth } from '@clerk/nextjs';

export function Header() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading auth state…</div>;
  }

  return (
    <header>
      <div>My App</div>
      {isSignedIn ? (
        <div>
          <UserButton />
          <SignOut />
        </div>
      ) : (
        <div>
          <SignIn />
          <SignUp />
        </div>
      )}
    </header>
  );
}
```

`useAuth()` is a client hook, so the header is a `'use client'` component. When Clerk hasn't finished checking the session yet (`isLoaded` is false), you show a loading message — you don't want to flash sign-in buttons for a split second and then replace them with a profile button. Once loaded, `isSignedIn` decides what to show: signed-in users see their profile menu and a sign-out button; everyone else sees sign-in and sign-up buttons.


That's the UI layer. But what if you want to show the actual user — their name, email, avatar — on a profile page? Clerk gives you `useUser()` for client components, and for server components you can use `currentUser()` from `@clerk/nextjs/server`. The course demo builds a `/profile` route as a server component:

```tsx
// app/profile/page.tsx
import { currentUser } from '@clerk/nextjs/server';

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return <div>Please <a href="/sign-in">sign in</a> first.</div>;
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      <img src={user.imageUrl} alt={user.firstName} />
    </div>
  );
}
```

`currentUser()` is async because it contacts Clerk's servers to confirm the session. It returns the user object with `firstName`, `lastName`, `primaryEmailAddress`, `imageUrl`, and more — or `null` if nobody's logged in. If `user` is null, you redirect or show a sign-in link. Otherwise you render their details directly, no API route needed.

But showing a profile page is only half the story. You also need to **protect routes** so random visitors can't open `/dashboard` or `/profile` without logging in. Clerk handles this at three levels: global (middleware), page-level, and API-level.

At the global level, you create a `middleware.ts` file at your project root. Clerk's `createRouteMatcher` lets you list which routes should be public (open to everyone) and everything else gets protected:

```ts
// middleware.ts
import { createRouteMatcher, clerkMiddleware } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

`createRouteMatcher` takes an array of route patterns. Anything matching `/sign-in(.*)` or `/sign-up(.*)` is public — anyone can visit it. Everything else, `auth().protect()` checks the session. If there's no valid session, Clerk redirects to the sign-in page automatically. The `config.matcher` tells Next.js which requests should run through this middleware (basically all page and API routes, skipping static files like images and CSS).

You can also protect a single page or API route individually. In a server page, call `auth()` and check `isAuthenticated`:

```tsx
// app/dashboard/page.tsx
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <div>Welcome to your dashboard!</div>;
}
```

And in an API route:

```tsx
// app/api/users/route.ts
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return NextResponse.json({ message: 'Here is your data' });
}
```

`auth()` returns `userId` if there's a valid session. No `userId` means no login — redirect to sign-in for pages, or return 401 for API routes.

One more useful thing: custom sign-in and sign-up pages. By default Clerk shows its own hosted pages, but you can point it at your own routes. Create catch-all route segments `[[...sign-in]]/page.tsx` and `[[...sign-up]]/page.tsx`, then add these to your `.env.local`:

```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

Now when Clerk redirects someone to sign in, they land on your page instead of Clerk's default page. Your sign-in page can be as simple as:

```tsx
// app/[[...sign-in]]/page.tsx
export default function SignInPage() {
  return <div>Sign in page (Clerk renders the actual form here)</div>;
}
```

Clerk mounts its pre-built sign-in UI inside that route automatically, so you don't write the email/password forms yourself — you just provide the URL and Clerk fills in the UI.

Clerk also lets you customize colors, branding, and themes from its dashboard so the login screens match your app's look. The course mentions this as a small task: tweak the theming and see how it changes the sign-in UI.

### What it is NOT

- **Clerk is not your user database replacement for everything.** It manages authentication (who you are) and basic user data, but your app's business data — posts, orders, products — still lives in your own database, linked by `userId`.
- **It's not magic that removes all security thinking.** You still need to protect sensitive routes, validate inputs, and not trust the client blindly. Clerk handles identity; you still handle authorization (what that user is allowed to do).
- **It's not only for Next.js.** Clerk works with other frameworks too, but this course uses it with Next.js because the `@clerk/nextjs` package makes it feel native.

### In your own words

1. What does `<ClerkProvider>` do, and where do you put it?

   <details>
   <summary>Answer</summary>
   It wraps your app so Clerk can track the user's session everywhere. You place it in `app/layout.tsx` around `<body>{children}</body>` so every page and component underneath can check auth state.
   </details>

2. What does `useAuth()` return, and why check `isLoaded` first?

   <details>
   <summary>Answer</summary>
   It returns `isSignedIn` (true/false) and `isLoaded` (whether Clerk has finished checking the session). You check `isLoaded` first so you don't flash the wrong buttons while Clerk is still deciding if the user is logged in.
   </details>

3. How does `currentUser()` differ from `useUser()`?

   <details>
   <summary>Answer</summary>
   `currentUser()` is for server components — it's async and comes from `@clerk/nextjs/server`. `useUser()` is the client-component hook version from `@clerk/nextjs`. Both return the same user data (name, email, image).
   </details>

4. What does `auth().protect()` do in middleware?

   <details>
   <summary>Answer</summary>
   It blocks access to routes that aren't in the public list. If the visitor isn't signed in, Clerk automatically redirects them to the sign-in page instead of letting them see the protected page.
   </details>

5. What status code do you return from an API route when the user isn't authenticated?

   <details>
   <summary>Answer</summary>
   401 Unauthorized — you call `auth()` in the route handler, check `userId`, and return `new NextResponse('Unauthorized', { status: 401 })` if there's no session.
   </details>

---

That brings the full Next.js course to a close. You started with what Next.js is and why it exists, moved through routing (dynamic segments, catch-all, parallel/intercepting), rendering strategies (SSR, SSG, ISR, streaming), data fetching (server, client, React cache), server actions and mutations, caching, AI dev tools with MCP, global state with Redux Toolkit, and finally drop-in authentication with Clerk.

From here, you have everything you need to build production Next.js apps: pages that load fast, data that stays fresh, mutations that feel instant, state that scales, and login that works without building it from scratch. The video ends with a thank-you and an invitation to comment if any topic needs more explanation — the course is complete, but your learning continues with whatever you build next.