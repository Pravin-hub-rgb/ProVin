# ⚙️ Phase 3: Topic 17 - App Router vs Pages Router

> **Interview Question:** "What's the difference between Next.js's App Router and Pages Router? How do layout.js, page.js, loading.js, error.js work? Should new projects use Pages Router or App Router?"

---

## 🚨 **The Golden Rule — Understand This First!**

> **"Pages Router = Old Next.js, App Router = New Next.js. App Router gave React full power on the server, while Pages Router was just a wrapper on top of client-side React."**

Imagine you have two cars:
- **Pages Router = 2015 Maruti Swift** → Reliable, it runs, but no latest features
- **App Router = 2025 Tesla** → All latest technology — RSC, Streaming, Server Components — though it's newer

---

## 💡 Beginner-Friendly Explanation (Real World Analogy)

```
🏠 Pages Router (Old Way):
You make a separate entrance for every room in your house. Each room has everything separate. If you want the same header in every room, you copy-paste it into every file. Every room has to fully load before you enter.

🏢 App Router (New Way):
You build a proper structure for your house. First there's a common entrance (Root Layout), inside that a hall, inside that bedrooms. Everything is nested. Each level has its own header, loader, error handling. You can customize everything while keeping things in their place.
```

✅ **Pages Router Problem:**
- All files sit in the pages folder
- `_app.js` and `_document.js` for common layouts
- Server-side logic in separate files
- No proper nesting
- Everything runs at the page level only

✅ **App Router Solution:**
- Folder-based routing
- Proper nested layouts
- Each level has its own page, loader, error
- First-class Server Components support
- Component-level granularity

---

## 📊 Side by Side Comparison

| 🕰️ Pages Router | ✅ App Router |
|----------------|---------------|
| File based routing | Folder based routing |
| `pages/index.js` = `/` | `app/page.js` = `/` |
| `pages/about.js` = `/about` | `app/about/page.js` = `/about` |
| `_app.js` = Single global layout | `layout.js` = Nested layouts at any level |
| `_document.js` = HTML structure | `root layout` = Custom HTML |
| `getStaticProps`, `getServerSideProps` | Async components, direct fetch |
| Client side only by default | Server components by default |
| No streaming | Built-in streaming |
| No partial hydration | Selective Hydration |
| Pages Router architecture | App Router architecture |
| Around since 2016 | Released in 2023 |
| Not deprecated, but maintenance mode | Now the official default |

---

## 📁 App Router File Structure Deep Dive

This is the most important part. In App Router you can put these files in every folder, and they automatically apply at that level:

| File Name | Purpose | Where it works |
|-----------|---------|----------------|
| `page.js` | Actual page content | Only for that route |
| `layout.js` | Common wrapper for all child routes | That route and all its children |
| `loading.js` | Loading state while page loads | That route and child routes |
| `error.js` | Error boundary if an error occurs | That route and child routes |
| `not-found.js` | 404 page if route not found | That route and child routes |
| `route.js` | API endpoint for this route | Only for the API |
| `template.js` | Same as layout but re-renders on every navigation | Special cases |
| `default.js` | Fallback for parallel routes | Advanced |

### 📐 Nested Layout Example

```
app/
├── layout.js      ✅ Root Layout - applies to all pages
├── page.js        ✅ Home Page /
├── loading.js     ✅ Home page loading
├── error.js       ✅ Home page error
│
├── about/
│   ├── layout.js  ✅ Applies only to about page and its children
│   ├── page.js    ✅ /about page
│   └── loading.js ✅ Only about page's loader
│
└── dashboard/
    ├── layout.js  ✅ Dashboard layout
    ├── page.js    ✅ /dashboard
    ├── loading.js ✅ Dashboard loader
    ├── error.js   ✅ Dashboard errors
    │
    └── settings/
        ├── page.js ✅ /dashboard/settings
        └── layout.js ✅ Settings' own layout
```

✅ **This is App Router's biggest superpower:**
- You can create your own layout, loader, error at every level
- A parent's change doesn't affect the child
- A child's change doesn't affect the parent
- Everything stays properly nested and organized

---

## 🔄 Layout.js Deep Dive

A layout is the component that wraps every child page.

```tsx
// ✅ app/layout.js - Root Layout (applies to all pages)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* ✅ Header shows on all pages */}
        {children}   {/* ✅ Actual page content comes here */}
        <Footer /> {/* ✅ Footer shows on all pages */}
      </body>
    </html>
  );
}
```

✅ **Layout properties:**
1.  Layout does NOT re-render on navigation
2.  State is preserved in the layout
3.  You can have separate layouts at every level
4.  Layout is a server component by default
5.  You can fetch data directly inside it

In Pages Router you could only make one global layout in `_app.js`. In App Router you can create a different layout for every route.

---

## ⏳ Loading.js Deep Dive

Loading.js automatically creates a Suspense boundary. It shows while the page is loading.

```tsx
// ✅ app/dashboard/loading.js
export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-64 bg-gray-200 rounded mb-4"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
```

✅ **Automatic features:**
- It automatically shows whenever that route or any of its child routes load
- You don't have to manage any state
- Works properly with streaming
- If a parent route is loading, only the parent's loader shows, not the child's

In Pages Router you had to manually manage loading state on every page.

---

## ❌ Error.js Deep Dive

Error.js automatically creates a React Error Boundary. If any error occurs in that route, this page shows.

```tsx
'use client'; // ✅ Error component is always a client component

export default function DashboardError({ error, reset }) {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold mb-4">Something went wrong 😕</h2>
      <p className="text-gray-600 mb-8">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-blue-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
```

✅ **Automatic features:**
- Affects only that route and its children
- The rest of the app keeps working — only that particular part shows the error
- You don't have to build error boundaries manually
- You can retry automatically with the `reset()` function

In Pages Router you had to build error boundaries manually.

---

## 🔀 Routing Differences

| Action | Pages Router | App Router |
|--------|--------------|------------|
| Navigation | `import Link from 'next/link'` | Same, no change |
| Programmatic | `router.push('/about')` | `useRouter()` hook comes from app/navigation |
| Dynamic Routes | `pages/post/[id].js` | `app/post/[id]/page.js` |
| Catch All | `pages/[...slug].js` | `app/[...slug]/page.js` |
| Optional Catch All | `pages/[[...slug]].js` | `app/[[...slug]]/page.js` |
| Parallel Routes | Not supported | `@dashboard/page.js` |
| Intercepting Routes | Not supported | `(.)photo/page.js` |
| Route Groups | Not supported | `(auth)/login/page.js` |

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Creating a layout.js in every folder
Only create a layout when you actually need something common. Don't create an empty layout in every folder.

### ❌ Mistake 2: Putting `use client` in a layout
A layout is a server component by default. Keep it on the server unless you need interactivity.

### ❌ Mistake 3: Conditional rendering in the root layout
The root layout must always render. You can never unmount it.

### ❌ Mistake 4: Confusing page and layout
- **page.js = Only that page's content**
- **layout.js = Wrapper for all child pages**

> **Rule:** Whatever is common across all child pages goes in the layout; everything else goes in the page.

---

## 🎯 When to Use Which?

| Scenario | Pages Router | App Router |
|----------|--------------|-------------|
| **Starting a new project now** | ❌ Avoid | ✅ Definitely |
| **Existing project on Pages Router** | ✅ Keep going | ⚠️ Think about migration, but don't rush |
| **Need Server Components** | ❌ Not available | ✅ Full support |
| **Need streaming and Suspense** | ❌ Limited | ✅ Built in |
| **SEO matters** | ✅ Both are good | ✅ Both are good |
| **Client-heavy app, no server use** | ✅ Okay | ✅ Both work |
| **Enterprise project, need stability** | ✅ For now | ⚠️ After Next 15 |
| **Learning Next.js now** | ❌ Don't learn | ✅ Learn App Router only |

> **Interview Answer:** "At this time we use App Router for new projects. Pages Router is only for existing projects. New features are coming only in App Router."

---

## 📊 Migration Strategy

If you're migrating from Pages Router to App Router, follow this order:

```
1.  ✅ First step: Update to Next.js 13 or above
2.  ✅ Create the `app/` folder
3.  ✅ Migrate just one page first
4.  ✅ Then slowly migrate every page
5.  ✅ Both routers can run together — no problem
6.  ✅ Once all pages are migrated, delete the pages folder
```

✅ **Important:** Both routers can run together. A page in the app folder is served by App Router; otherwise by Pages Router.

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "What's the main difference between App Router and Pages Router?"

**Answer:** "Sir, Pages Router is Next.js's old routing system. App Router is the new one released in 2023. The biggest difference is that App Router has first-class support for React Server Components, Server Components are the default, and it has features like nested layouts, streaming, and selective hydration. In Pages Router routing only happened at the page level; App Router has proper folder-based nested routing."

### Q: "What does layout.js do?"

**Answer:** "layout.js is a wrapper component that applies to that route and all its child routes. It's similar to `_app.js` in Pages Router, but the difference is you can create a different layout at every level. Layout doesn't re-render on navigation, and state is preserved."

### Q: "How does loading.js work?"

**Answer:** "loading.js automatically creates a React Suspense boundary. Whenever that route or any of its child routes are loading, this loading state shows automatically. You don't have to manage loading state manually — it comes out of the box."

### Q: "What is error.js?"

**Answer:** "error.js automatically creates a React Error Boundary. If any runtime error occurs in that route, this error page shows. The rest of the app keeps working — only that particular part shows the error. It also has a reset function with which the user can try again."

### Q: "Should new projects use Pages Router?"

**Answer:** "No sir, we use App Router for new projects now. Pages Router is in maintenance mode; new features are only coming in App Router. If an existing project runs on Pages Router, that's fine, but when starting a new project we always choose App Router."

### Q: "Which part of App Router benefits you the most?"

**Answer:** "The biggest benefit is nested layouts. A different layout, a different loader, different error handling for every route. Everything stays in its place. The second benefit is Server Components, which are the default — bundle size reduces a lot."

### Q: "Are there any disadvantages of App Router?"

**Answer:** "There are a few:
1.  It's still new so small bugs remain
2.  The learning curve is a bit higher
3.  Some third-party libraries don't support it properly yet
4.  People haven't properly understood Server Components patterns yet

But all of this will be fixed over time."

### Q: "When should you migrate from Pages to App Router?"

**Answer:** "Migrate, but don't rush. First learn a bit of App Router, then migrate one page at a time. Both routers can run together — no problem. Migrate only when you need a feature that exists only in App Router."

---

## ✅ **Key Takeaways**

1.  App Router is Next.js's new default, Pages Router is now old
2.  Folder-based routing, page, layout, loading, error at every level
3.  Server Components are the default
4.  Streaming, Suspense, Selective Hydration built in
5.  Keep existing projects on Pages Router, use App Router for new projects
6.  Migrate slowly — both can run together

> **Final Tip:** Always say this line in an interview: "App Router turned Next.js into a proper full-stack framework — earlier it was just a frontend framework."