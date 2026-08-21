import type { Subject } from "../coding-data";

export const nextjsSubject: Subject = {
  id: "nextjs",
  title: "Next.js",
  description: "Next.js with App Router — from React meta-framework to production",
  lectures: [
    {
      id: "nextjs-roadmap",
      title: "📋 Next.js Final Roadmap",
      path: "docs/coding/Next JS/Nextjs-Final-Roadmap.md",
    },
    {
      id: "nextjs-interview",
      title: "🎯 100 Next.js Interview Questions",
      path: "docs/coding/Next JS/Interview Prep/100 Next.js Interview Questions.md",
    },
  ],
  phases: [
    {
      id: "module0",
      title: "Module 0 — Next.js Kaise Kaam Karta Hai",
      openByDefault: true,
      lectures: [
        {
          id: "next-0.0",
          title: "0.0 Next.js Kya Hai aur Ye Course Kaise Chalega",
          path: "docs/coding/Next JS/Module 0 - Next.js Kaise Kaam Karta Hai/0.0 Next.js Kya Hai aur Ye Course Kaise Chalega.md",
        },
        {
          id: "next-0.0.5",
          title: "0.0.5 React Essentials — Generic Revision",
          path: "docs/coding/Next JS/Module 0 - Next.js Kaise Kaam Karta Hai/0.0.5 React Essentials - Generic Revision.md",
        },
        {
          id: "next-0.1",
          title: "0.1 Client-Side Rendering — React Ki Duniya",
          path: "docs/coding/Next JS/Module 0 - Next.js Kaise Kaam Karta Hai/0.1 Client-Side Rendering - React Ki Duniya.md",
        },
        {
          id: "next-0.2",
          title: "0.2 SSR vs SSG vs CSR — Rendering Strategies",
          path: "docs/coding/Next JS/Module 0 - Next.js Kaise Kaam Karta Hai/0.2 SSR vs SSG vs CSR - Rendering Strategies.md",
        },
        {
          id: "next-0.3",
          title: "0.3 React Server Components vs Client Components",
          path: "docs/coding/Next JS/Module 0 - Next.js Kaise Kaam Karta Hai/0.3 React Server Components vs Client Components.md",
        },
        {
          id: "next-0.4",
          title: "0.4 Hydration",
          path: "docs/coding/Next JS/Module 0 - Next.js Kaise Kaam Karta Hai/0.4 Hydration.md",
        },
        {
          id: "next-0.5",
          title: "0.5 Next.js Fetch Caching Model",
          path: "docs/coding/Next JS/Module 0 - Next.js Kaise Kaam Karta Hai/0.5 Next.js Fetch Caching Model.md",
        },
        {
          id: "next-0.6",
          title: "0.6 Incremental Static Regeneration (ISR)",
          path: "docs/coding/Next JS/Module 0 - Next.js Kaise Kaam Karta Hai/0.6 Incremental Static Regeneration (ISR).md",
        },
        {
          id: "next-0.7",
          title: "0.7 App Router — File-based Routing",
          path: "docs/coding/Next JS/Module 0 - Next.js Kaise Kaam Karta Hai/0.7 App Router - File-based Routing.md",
        },
        {
          id: "next-0.8",
          title: "0.8 Project Setup — create-next-app",
          path: "docs/coding/Next JS/Module 0 - Next.js Kaise Kaam Karta Hai/0.8 Project Setup - create-next-app.md",
        },
      ],
    },
    {
      id: "batch1",
      title: "Batch 1 — Routing Fundamentals",
      openByDefault: true,
      lectures: [
        {
          id: "next-1.0",
          title: "1.0 Routing Fundamentals — Kya Seekhenge",
          path: "docs/coding/Next JS/Batch 1 - Routing Fundamentals/1.0 Routing Fundamentals — Kya Seekhenge.md",
        },
        {
          id: "next-1.1",
          title: "1.1 File-based Routing Basics",
          path: "docs/coding/Next JS/Batch 1 - Routing Fundamentals/1.1 File-based Routing Basics.md",
        },
        {
          id: "next-1.2",
          title: "1.2 Nested Layouts",
          path: "docs/coding/Next JS/Batch 1 - Routing Fundamentals/1.2 Nested Layouts.md",
        },
        {
          id: "next-1.3",
          title: "1.3 Dynamic Routes + Params",
          path: "docs/coding/Next JS/Batch 1 - Routing Fundamentals/1.3 Dynamic Routes + Params.md",
        },
        {
          id: "next-1.4",
          title: "1.4 Loading, Error, Not-Found States",
          path: "docs/coding/Next JS/Batch 1 - Routing Fundamentals/1.4 Loading, Error, Not-Found States.md",
        },
        {
          id: "next-1.5.1",
          title: "1.5.1 Planning — Code Likhne Se Pehle Sochna",
          path: "docs/coding/Next JS/Batch 1 - Routing Fundamentals/1.5.1 Planning — Code Likhne Se Pehle Sochna.md",
        },
        {
          id: "next-1.5.2",
          title: "1.5.2 Hardcoded UI — Pehle Dekho Kaise Dikhta Hai",
          path: "docs/coding/Next JS/Batch 1 - Routing Fundamentals/1.5.2 Hardcoded UI — Pehle Dekho Kaise Dikhta Hai.md",
        },
        {
          id: "next-1.5.3",
          title: "1.5.3 Data Layer — post.ts, Type Aur Functions",
          path: "docs/coding/Next JS/Batch 1 - Routing Fundamentals/1.5.3 Data Layer — post.ts, Type Aur Functions.md",
        },
        {
          id: "next-1.5.4",
          title: "1.5.4 Dynamic Blog — Data Layer Se UI Jodo",
          path: "docs/coding/Next JS/Batch 1 - Routing Fundamentals/1.5.4 Dynamic Blog — Data Layer Se UI Jodo.md",
        },
        {
          id: "next-1.5.5",
          title: "1.5.5 States + Testing — Project Complete Karna",
          path: "docs/coding/Next JS/Batch 1 - Routing Fundamentals/1.5.5 States + Testing — Project Complete Karna.md",
        },
      ],
    },
    {
      id: "batch2",
      title: "Batch 2 — Rendering & Data Fetching",
      openByDefault: false,
      lectures: [
        {
          id: "next-2.0",
          title: "2.0 Rendering & Data Fetching — Kya Seekhenge",
          path: "docs/coding/Next JS/Batch 2 - Rendering & Data Fetching/2.0 Rendering & Data Fetching — Kya Seekhenge.md",
        },
        {
          id: "next-2.1",
          title: "2.1 Server Components — Direct Fetch",
          path: "docs/coding/Next JS/Batch 2 - Rendering & Data Fetching/2.1 Server Components — Direct Fetch.md",
        },
        {
          id: "next-2.2",
          title: "2.2 Client Components — Kab Zaroorat Padti Hai",
          path: "docs/coding/Next JS/Batch 2 - Rendering & Data Fetching/2.2 Client Components — Kab Zaroorat Padti Hai.md",
        },
        {
          id: "next-2.3",
          title: "2.3 Static vs Dynamic Rendering + Revalidate",
          path: "docs/coding/Next JS/Batch 2 - Rendering & Data Fetching/2.3 Static vs Dynamic Rendering + Revalidate.md",
        },
        {
          id: "next-2.4",
          title: "2.4 Metadata API — SEO",
          path: "docs/coding/Next JS/Batch 2 - Rendering & Data Fetching/2.4 Metadata API — SEO.md",
        },
        {
          id: "next-2.5.1",
          title: "2.5.1 Planning V2 — Kya Upgrade Karna Hai",
          path: "docs/coding/Next JS/Batch 2 - Rendering & Data Fetching/2.5.1 Planning V2 — Kya Upgrade Karna Hai.md",
        },
        {
          id: "next-2.5.2",
          title: "2.5.2 Data Source — posts-api.ts Async Banana",
          path: "docs/coding/Next JS/Batch 2 - Rendering & Data Fetching/2.5.2 Data Source — posts-api.ts Async Banana.md",
        },
        {
          id: "next-2.5.3",
          title: "2.5.3 Server Fetch + Metadata + Like Button",
          path: "docs/coding/Next JS/Batch 2 - Rendering & Data Fetching/2.5.3 Server Fetch + Metadata + Like Button.md",
        },
        {
          id: "next-2.5.4",
          title: "2.5.4 States + ISR + Testing — V2 Complete",
          path: "docs/coding/Next JS/Batch 2 - Rendering & Data Fetching/2.5.4 States + ISR + Testing — V2 Complete.md",
        },
      ],
    },
    {
      id: "batch3",
      title: "Batch 3 — Mutations: REST API + Server Actions",
      openByDefault: false,
      lectures: [
        {
          id: "next-3.0",
          title: "3.0 Mutations — Kya Seekhenge",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.0 Mutations — Kya Seekhenge.md",
        },
        {
          id: "next-3.1",
          title: "3.1 Route Handlers — REST API banana",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.1 Route Handlers — REST API banana.md",
        },
        {
          id: "next-3.2",
          title: "3.2 Fetching vs Mutating — GET vs POST",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.2 Fetching vs Mutating — GET vs POST.md",
        },
        {
          id: "next-3.3",
          title: "3.3 Server Actions — Next.js ka Shortcut",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.3 Server Actions — Next.js ka Shortcut.md",
        },
        {
          id: "next-3.3.1",
          title: "3.3.1 Add Comment (POST → Server Action)",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.3.1 Add Comment - POST - Server Action.md",
        },
        {
          id: "next-3.3.2",
          title: "3.3.2 List (GET → Server Component)",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.3.2 List - GET - Server Component.md",
        },
        {
          id: "next-3.3.3",
          title: "3.3.3 Delete (DELETE → Server Action)",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.3.3 Delete - DELETE - Server Action.md",
        },
        {
          id: "next-3.3.4",
          title: "3.3.4 Detail + Edit (GET/PUT → Server Component + Action)",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.3.4 Detail Edit - GET PUT - Server Component - Server Action.md",
        },
        {
          id: "next-3.3.5",
          title: "3.3.5 Summary — Refactor Recap",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.3.5 Summary - What Did We Refactor.md",
        },
        {
          id: "next-3.4.1",
          title: "3.4.1 Planning — Reviews & Ratings App",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.1 Planning — Reviews & Ratings App.md",
        },
        {
          id: "next-3.4.2",
          title: "3.4.2 Static UI — Review Cards + Layout",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.2 Static UI — Review Cards + Layout.md",
        },
        {
          id: "next-3.4.3",
          title: "3.4.3 Data Layer — JSON File + fs Module",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.3 Data Layer — JSON File + fs Module.md",
        },
        {
          id: "next-3.4.4",
          title: "3.4.4 Client Fetch — Axios + useEffect",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.4 Client Fetch — Axios + useEffect.md",
        },
        {
          id: "next-3.4.5",
          title: "3.4.5 GET Route + Server Component",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.5 GET Route + Server Component.md",
        },
        {
          id: "next-3.4.6",
          title: "3.4.6 Detail Page — GET Single Route",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.6 Detail Page — GET Single Route.md",
        },
        {
          id: "next-3.4.7",
          title: "3.4.7 Create — Form UI + POST Route + Axios",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.7 Create — Form UI + POST Route + Axios.md",
        },
        {
          id: "next-3.4.8",
          title: "3.4.8 Edit + Delete — PUT + DELETE Routes",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.8 Edit + Delete — PUT + DELETE Routes.md",
        },
        {
          id: "next-3.4.9",
          title: "3.4.9 Server Actions — Planning",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.9 Server Actions — Planning.md",
        },
        {
          id: "next-3.4.10",
          title: "3.4.10 Static Form UI — Server Actions",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.10 Static Form UI — Server Actions.md",
        },
        {
          id: "next-3.4.11",
          title: "3.4.11 addReviewAction + Connect Form",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.11 addReviewAction + Connect Form.md",
        },
        {
          id: "next-3.4.12",
          title: "3.4.12 useActionState + Messages",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.12 useActionState + Messages.md",
        },
        {
          id: "next-3.4.13",
          title: "3.4.13 Delete Button — Server Action",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.13 Delete Button — Server Action.md",
        },
        {
          id: "next-3.4.14",
          title: "3.4.14 Edit Flow — Server Action",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.14 Edit Flow — Server Action.md",
        },
        {
          id: "next-3.4.15",
          title: "3.4.15 Comparison + Summary + Bridge",
          path: "docs/coding/Next JS/Batch 3 - Mutations/3.4.15 Comparison + Summary + Bridge.md",
        },
      ],
    },
    {
      id: "batch4",
      title: "Batch 4 — Proxy (Middleware) Deep Dive",
      openByDefault: false,
      lectures: [
        {
          id: "next-4.1",
          title: "4.1 Proxy Kya Hai — Request Lifecycle",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.1 Proxy Kya Hai — Request Lifecycle.md",
        },
        {
          id: "next-4.2",
          title: "4.2 proxy.ts Setup + NextResponse.next()",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.2 proxy.ts Setup + NextResponse.next().md",
        },
        {
          id: "next-4.3",
          title: "4.3 Matcher — Kaunse Routes Pe Chale",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.3 Matcher — Kaunse Routes Pe Chale.md",
        },
        {
          id: "next-4.4",
          title: "4.4 URL Padhna — Pathname + SearchParams",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.4 URL Padhna — Pathname + SearchParams.md",
        },
        {
          id: "next-4.5",
          title: "4.5 Headers Padhna — User-Agent, IP, Host",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.5 Headers Padhna — User-Agent, IP, Host.md",
        },
        {
          id: "next-4.6",
          title: "4.6 Cookies Padhna — Request Ke Andar",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.6 Cookies Padhna — Request Ke Andar.md",
        },
        {
          id: "next-4.7",
          title: "4.7 NextResponse — Next vs Redirect vs Rewrite",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.7 NextResponse — Next vs Redirect vs Rewrite.md",
        },
        {
          id: "next-4.8",
          title: "4.8 Redirect Karna — new URL + Loop + Protected List",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.8 Redirect Karna — new URL + Loop + Protected List.md",
        },
        {
          id: "next-4.9",
          title: "4.9 Rewrite Karna — A B Testing + Maintenance Page",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.9 Rewrite Karna — A B Testing + Maintenance Page.md",
        },
        {
          id: "next-4.10",
          title: "4.10 Headers Add Karna — Response Modify + Layout Read",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.10 Headers Add Karna — Response Modify + Layout Read.md",
        },
        {
          id: "next-4.11",
          title: "4.11 Logging — Har Request Ka Record",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.11 Logging — Har Request Ka Record.md",
        },
        {
          id: "next-4.12",
          title: "4.12 Protected Routes — Demo + Why Not (CVE)",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.12 Protected Routes — Demo + Why Not (CVE).md",
        },
        {
          id: "next-4.13",
          title: "4.13 Rate Limiting — 429 + Window Expiry + Redis Limit",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.13 Rate Limiting — 429 + Window Expiry + Redis Limit.md",
        },
        {
          id: "next-4.14",
          title: "4.14 Geo Blocking — Country Check + Vercel Header",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.14 Geo Blocking — Country Check + Vercel Header.md",
        },
        {
          id: "next-4.15",
          title: "4.15 Edge Runtime Kya Hai — Next 16 Ka Badla Hua Default",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.15 Edge Runtime Kya Hai — Next 16 Ka Badla Hua Default.md",
        },
        {
          id: "next-4.16",
          title: "4.16 Edge Limitations — Next 16 Revised + Golden Rule",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.16 Edge Limitations — Next 16 Revised + Golden Rule.md",
        },
        {
          id: "next-4.17",
          title: "4.17 Kab Use Karein — Official Stance + Decision Table",
          path: "docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/4.17 Kab Use Karein — Official Stance + Decision Table.md",
        },
      ],
    },
    {
      id: "batch5",
      title: "Batch 5 — Authentication & Protected Access",
      openByDefault: false,
      lectures: [
        {
          id: "next-5.0",
          title: "5.0 Authentication — Kya Seekhenge",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.0 Authentication — Kya Seekhenge.md",
        },
        {
          id: "next-5.1",
          title: "5.1 Cookies aur Sessions — Auth ka Foundation",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.1 Cookies aur Sessions — Auth ka Foundation.md",
        },
        {
          id: "next-5.2",
          title: "5.2 Manual Login Demo v1 — Hashing + Session",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.2 Manual Login Demo v1 — Hashing + Session.md",
        },
        {
          id: "next-5.3",
          title: "5.3 Manual Session — Read + Protected + Logout",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.3 Manual Session — Read + Protected + Logout.md",
        },
        {
          id: "next-5.4",
          title: "5.4 Auth.js — Next.js ka Auth Shortcut",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.4 Auth.js — Next.js ka Auth Shortcut.md",
        },
        {
          id: "next-5.4.1",
          title: "5.4.1 Auth.js + GitHub OAuth — Login Demo v2",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.4.1 Auth.js + GitHub OAuth — Login Demo v2.md",
        },
        {
          id: "next-5.4.2",
          title: "5.4.2 Sessions — Server aur Client",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.4.2 Sessions — Server aur Client.md",
        },
        {
          id: "next-5.4.3",
          title: "5.4.3 Protected Routes — auth() + proxy.ts",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.4.3 Protected Routes — auth() + proxy.ts.md",
        },
        {
          id: "next-5.4.4",
          title: "5.4.4 Summary — Manual vs OAuth",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.4.4 Summary — Manual vs OAuth.md",
        },
        {
          id: "next-5.5.1",
          title: "5.5.1 Planning — Member Dashboard",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.5.1 Planning — Member Dashboard.md",
        },
        {
          id: "next-5.5.2",
          title: "5.5.2 Hardcoded UI + Auth Scaffold",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.5.2 Hardcoded UI + Auth Scaffold.md",
        },
        {
          id: "next-5.5.3",
          title: "5.5.3 GitHub OAuth Wiring",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.5.3 GitHub OAuth Wiring.md",
        },
        {
          id: "next-5.5.4",
          title: "5.5.4 Dynamic Dashboard — Profile + Update",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.5.4 Dynamic Dashboard — Profile + Update.md",
        },
        {
          id: "next-5.5.5",
          title: "5.5.5 Testing + States + Summary",
          path: "docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.5.5 Testing + States + Summary.md",
        },
      ],
    },
    {
      id: "batch6",
      title: "Batch 6 — Database Integration",
      openByDefault: false,
      lectures: [
        {
          id: "next-6.0",
          title: "6.0 Database Integration — Kya Seekhenge",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.0 Database Integration — Kya Seekhenge.md",
        },
        {
          id: "next-6.1",
          title: "6.1 Database Kya Hoti Hai — File vs Database",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.1 Database Kya Hoti Hai — File vs Database.md",
        },
        {
          id: "next-6.2",
          title: "6.2 SQL vs NoSQL — Table vs Document",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.2 SQL vs NoSQL — Table vs Document.md",
        },
        {
          id: "next-6.3",
          title: "6.3 ORM aur Providers — Database Se Baat Karne Ke Tools",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.3 ORM aur Providers — Database Se Baat Karne Ke Tools.md",
        },
        {
          id: "next-6.4",
          title: "6.4 MongoDB Atlas + Connection — Pehli Baar Real DB",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.4 MongoDB Atlas + Connection — Pehli Baar Real DB.md",
        },
        {
          id: "next-6.5",
          title: "6.5 Mongoose Schema + Model — Data Ka Blueprint",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.5 Mongoose Schema + Model — Data Ka Blueprint.md",
        },
        {
          id: "next-6.6",
          title: "6.6 API Design — REST API Ka Structure Sochna",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.6 API Design — REST API Ka Structure Sochna.md",
        },
        {
          id: "next-6.7.1",
          title: "6.7.1 GET /api/todos — List Route + TodoList UI",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.7.1 GET Todos — List Route + TodoList UI.md",
        },
        {
          id: "next-6.7.2",
          title: "6.7.2 POST /api/todos — Create Route + AddTodoForm UI",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.7.2 POST Todos — Create Route + AddTodoForm UI.md",
        },
        {
          id: "next-6.7.3",
          title: "6.7.3 DELETE /api/todos/[id] — Delete Route + TodoItem UI",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.7.3 DELETE Todo — Delete Route + TodoItem UI.md",
        },
        {
          id: "next-6.7.4",
          title: "6.7.4 PUT /api/todos/[id] — Update Route + Toggle UI",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.7.4 PUT Todo — Update Route + Toggle UI.md",
        },
        {
          id: "next-6.8",
          title: "6.8 Postman Testing — REST API Ko Proper Test Karna",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.8 Postman Testing — REST API Ko Proper Test Karna.md",
        },
        {
          id: "next-6.9",
          title: "6.9 PostgreSQL + Neon Setup — SQL Database Banao",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.9 PostgreSQL + Neon Setup — SQL Database Banao.md",
        },
        {
          id: "next-6.10",
          title: "6.10 Drizzle Schema + Client — Data Ka Blueprint (SQL Version)",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.10 Drizzle Schema + Client — Data Ka Blueprint (SQL Version).md",
        },
        {
          id: "next-6.11.1",
          title: "6.11.1 SQL Todo — Read (Server Component)",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.11.1 SQL Todo — Read (Server Component).md",
        },
        {
          id: "next-6.11.2",
          title: "6.11.2 SQL Todo — Create (Server Action + Form)",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.11.2 SQL Todo — Create (Server Action + Form).md",
        },
        {
          id: "next-6.11.3",
          title: "6.11.3 SQL Todo — Toggle + Delete (Server Actions)",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.11.3 SQL Todo — Toggle + Delete (Server Actions).md",
        },
        {
          id: "next-6.11.4",
          title: "6.11.4 SQL Todo — Mongo vs SQL Compare",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.11.4 SQL Todo — Mongo vs SQL Compare.md",
        },
        {
          id: "next-6.12",
          title: "6.12 System Design — Relations, Indexes, Performance Soch",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.12 System Design — Relations, Indexes, Performance Soch.md",
        },
        {
          id: "next-6.13.1",
          title: "6.13.1 Task Board — Planning",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.13.1 Task Board — Planning.md",
        },
        {
          id: "next-6.13.2",
          title: "6.13.2 Task Board — Hardcoded UI",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.13.2 Task Board — Hardcoded UI.md",
        },
        {
          id: "next-6.13.3",
          title: "6.13.3 Task Board — Data Layer (Prisma)",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.13.3 Task Board — Data Layer (Prisma).md",
        },
        {
          id: "next-6.13.4",
          title: "6.13.4 Task Board — Dynamic (SC Reads + SA Mutations)",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.13.4 Task Board — Dynamic (SC Reads + SA Mutations).md",
        },
        {
          id: "next-6.13.5",
          title: "6.13.5 Task Board — States + Testing + Summary",
          path: "docs/coding/Next JS/Batch 6 - Database Integration/6.13.5 Task Board — States + Testing + Summary.md",
        },
      ],
    },
    {
      id: "batch7",
      title: "Batch 7 — Optimization & Production Concerns",
      openByDefault: false,
      lectures: [
        {
          id: "next-7.0",
          title: "7.0 Optimization & Production — Kya Seekhenge",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.0 Optimization & Production — Kya Seekhenge.md",
        },
        {
          id: "next-7.1",
          title: "7.1 Manual Images — img Tag ke Problems",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.1 Manual Images — img Tag ke Problems.md",
        },
        {
          id: "next-7.2",
          title: "7.2 next/image — Automatic Optimization",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.2 next image — Automatic Optimization.md",
        },
        {
          id: "next-7.3",
          title: "7.3 Manual Fonts — FOUC/CLS Problem",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.3 Manual Fonts — FOUC CLS Problem.md",
        },
        {
          id: "next-7.4",
          title: "7.4 next/font — No Layout Shift",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.4 next font — No Layout Shift.md",
        },
        {
          id: "next-7.5",
          title: "7.5 Streaming with Suspense",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.5 Streaming with Suspense.md",
        },
        {
          id: "next-7.6",
          title: "7.6 Parallel + Intercepting Routes — Modal-in-Route Pattern",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.6 Parallel + Intercepting Routes — Modal-in-Route Pattern.md",
        },
        {
          id: "next-7.7.1",
          title: "7.7.1 Photo Gallery — Planning",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.7.1 Photo Gallery — Planning.md",
        },
        {
          id: "next-7.7.2",
          title: "7.7.2 Photo Gallery — Hardcoded UI",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.7.2 Photo Gallery — Hardcoded UI.md",
        },
        {
          id: "next-7.7.3",
          title: "7.7.3 Photo Gallery — Data Layer + Read + SEO",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.7.3 Photo Gallery — Data Layer + Read + SEO.md",
        },
        {
          id: "next-7.7.4",
          title: "7.7.4 Photo Gallery — next/image + next/font",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.7.4 Photo Gallery — next image + next font.md",
        },
        {
          id: "next-7.7.5",
          title: "7.7.5 Photo Gallery — Photo Modal (Parallel + Intercepting)",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.7.5 Photo Gallery — Photo Modal.md",
        },
        {
          id: "next-7.7.6",
          title: "7.7.6 Photo Gallery — Streaming + States + Testing + Summary",
          path: "docs/coding/Next JS/Batch 7 - Optimization & Production Concerns/7.7.6 Photo Gallery — Streaming + States + Testing + Summary.md",
        },
      ],
    },
    {
      id: "batch8",
      title: "Batch 8 — Security & Deployment",
      openByDefault: false,
      lectures: [
        {
          id: "next-8.0",
          title: "8.0 Security & Deployment — Kya Seekhenge",
          path: "docs/coding/Next JS/Batch 8 - Security & Deployment/8.0 Security & Deployment — Kya Seekhenge.md",
        },
        {
          id: "next-8.1",
          title: "8.1 Env Vars Security — Server-Only vs NEXT_PUBLIC",
          path: "docs/coding/Next JS/Batch 8 - Security & Deployment/8.1 Env Vars Security — Server-Only vs NEXT_PUBLIC.md",
        },
        {
          id: "next-8.2",
          title: "8.2 Input + CSRF Awareness",
          path: "docs/coding/Next JS/Batch 8 - Security & Deployment/8.2 Input + CSRF Awareness.md",
        },
        {
          id: "next-8.3",
          title: "8.3 Error Boundaries at Scale",
          path: "docs/coding/Next JS/Batch 8 - Security & Deployment/8.3 Error Boundaries at Scale.md",
        },
        {
          id: "next-8.4",
          title: "8.4 Deployment — Vercel",
          path: "docs/coding/Next JS/Batch 8 - Security & Deployment/8.4 Deployment — Vercel.md",
        },
        {
          id: "next-8.5.1",
          title: "8.5.1 Security Audit — Planning",
          path: "docs/coding/Next JS/Batch 8 - Security & Deployment/8.5.1 Security Audit — Planning.md",
        },
        {
          id: "next-8.5.2",
          title: "8.5.2 Audit — Env + Config",
          path: "docs/coding/Next JS/Batch 8 - Security & Deployment/8.5.2 Audit — Env + Config.md",
        },
        {
          id: "next-8.5.3",
          title: "8.5.3 Audit — Error Boundaries",
          path: "docs/coding/Next JS/Batch 8 - Security & Deployment/8.5.3 Audit — Error Boundaries.md",
        },
        {
          id: "next-8.5.4",
          title: "8.5.4 Deploy — Vercel",
          path: "docs/coding/Next JS/Batch 8 - Security & Deployment/8.5.4 Deploy — Vercel.md",
        },
      ],
    },
  ],
};
