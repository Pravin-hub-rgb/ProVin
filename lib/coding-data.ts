/**
 * Type definitions and static data for coding subjects and lectures
 * This is the single source of truth for all course content
 */

export type Topic = {
  id: string;
  title: string;
  completed: boolean;
};

export type Phase = {
  phase: string;
  topics: Topic[];
};

export type Lecture = {
  id: string;
  title: string;
  path: string;
  isComponent?: boolean;
};

export type Subject = {
  id: string;
  title: string;
  description: string;
  lectures: Lecture[];
  phases?: LectureGroup[];
  progress?: Phase[];
};

export type LectureGroup = {
  id: string;
  title: string;
  lectures: Lecture[];
  openByDefault?: boolean;
};

/**
 * All available coding subjects with their respective lecture content
 * Add new subjects and lectures here only
 */
export const subjects: Subject[] = [
  {
    id: "python",
    title: "Python",
    description: "Complete Python fundamentals",
    lectures: [
      {
        id: "lec1",
        title: "Lec 1 - Variables & Functions",
        path: "docs/coding/python/1 Lec variables & functions/notes.md",
      },
      {
        id: "lec2",
        title: "Lec 2 - Conditionals",
        path: "docs/coding/python/2 Lec/notes.md",
      },
      {
        id: "lec3",
        title: "Lec 3 - Loops",
        path: "docs/coding/python/3 Lec loops/notes.md",
      },
      {
        id: "lec4",
        title: "Lec 4 - Exceptions",
        path: "docs/coding/python/4 Lec Exceptions/notes.md",
      },
      {
        id: "lec5",
        title: "Lec 5 - Modules",
        path: "docs/coding/python/5 Lec Modules/notes.md",
      },
      {
        id: "lec6",
        title: "Lec 6 - Unit Testing",
        path: "docs/coding/python/6 Lec Unit Test/notes.md",
      },
    ],
  },
  {
    id: "nextjs",
    title: "Next.js",
    description: "Fullstack React framework",
    lectures: [],
  },
  {
    id: "react",
    title: "React",
    description: "UI component library",
    lectures: [],
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Complete JavaScript fundamentals for interviews",
    lectures: [
      {
        id: "roadmap",
        title: "📋 Complete JS Course Roadmap",
        path: "docs/coding/JS/js-course-roadmap.md",
      },
      {
        id: "checklist",
        title: "✅ Progress Checklist",
        path: "checklist",
        isComponent: true,
      },
    ],
    phases: [
      {
        id: "phase1",
        title: "Phase 1 — Foundations",
        openByDefault: true,
        lectures: [
          {
            id: "js-lec0",
            title: "0.0 Introduction to JavaScript",
            path: "docs/coding/JS/Phase 1 - Foundations/0.0 Introduction to JavaScript.md",
          },
          {
            id: "js-lec1",
            title: "1.1 var / let / const",
            path: "docs/coding/JS/Phase 1 - Foundations/1.1 var let const.md",
          },
          {
            id: "js-lec2",
            title: "1.2 Data Types",
            path: "docs/coding/JS/Phase 1 - Foundations/1.2 Data Types.md",
          },
          {
            id: "js-lec3",
            title: "1.3 Scope",
            path: "docs/coding/JS/Phase 1 - Foundations/1.3 Scope.md",
          },
          {
            id: "js-lec4",
            title: "1.4 Hoisting",
            path: "docs/coding/JS/Phase 1 - Foundations/1.4 Hoisting.md",
          },
          {
            id: "js-lec5",
            title: "1.5 Type Coercion & Equality",
            path: "docs/coding/JS/Phase 1 - Foundations/1.5 Type Coercion & Equality.md",
          },
          {
            id: "js-lec6",
            title: "1.6 Functions — All Forms",
            path: "docs/coding/JS/Phase 1 - Foundations/1.6 Functions — All Forms.md",
          },
          {
            id: "js-lec7",
            title: "1.7 Template Literals",
            path: "docs/coding/JS/Phase 1 - Foundations/1.7 Template Literals.md",
          }
        ]
      },
      {
        id: "phase2",
        title: "Phase 2 — Core Concepts",
        openByDefault: false,
        lectures: [
          {
            id: "js-lec8",
            title: "2.1 Closures",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.1 Closures.md",
          },
          {
            id: "js-lec9",
            title: "2.2 `this` Keyword",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.2 this Keyword.md",
          },
          {
            id: "js-lec10",
            title: "2.3 call, apply, bind",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.3 call, apply, bind.md",
          },
          {
            id: "js-lec11",
            title: "2.4 Prototype & Prototype Chain",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.4 Prototype & Prototype Chain.md",
          },
          {
            id: "js-lec12",
            title: "2.5 Classes",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.5 Classes.md",
          },
          {
            id: "js-lec13",
            title: "2.6 IIFE",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.6 IIFE.md",
          }
        ]
      },
      {
        id: "phase3",
        title: "Phase 3 — Async JavaScript",
        openByDefault: false,
        lectures: [
          {
            id: "js-lec14",
            title: "3.1 Synchronous vs Asynchronous",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.1 Synchronous vs Asynchronous.md",
          },
          {
            id: "js-lec15",
            title: "3.2 Event Loop",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.2 Event Loop.md",
          },
          {
            id: "js-lec16",
            title: "3.3 Callbacks",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.3 Callbacks.md",
          },
          {
            id: "js-lec17",
            title: "3.4 Promises",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.4 Promises.md",
          },
          {
            id: "js-lec18",
            title: "3.5 async / await",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.5 async await.md",
          },
          {
            id: "js-lec19",
            title: "3.6 Fetch API",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.6 Fetch API.md",
          }
        ]
      },
      {
        id: "phase4",
        title: "Phase 4 — Arrays, Objects & Functional Patterns",
        openByDefault: false,
        lectures: [
          {
            id: "js-lec20",
            title: "4.1 Array Methods",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.1 Array Methods.md",
          },
          {
            id: "js-lec21",
            title: "4.2 Destructuring",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.2 Destructuring.md",
          },
          {
            id: "js-lec22",
            title: "4.3 Spread & Rest Operator",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.3 Spread & Rest Operator.md",
          },
          {
            id: "js-lec23",
            title: "4.4 Higher Order Functions",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.4 Higher Order Functions.md",
          },
          {
            id: "js-lec24",
            title: "4.5 Memoization",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.5 Memoization.md",
          },
          {
            id: "js-lec25",
            title: "4.6 Currying",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.6 Currying.md",
          },
          {
            id: "js-lec26",
            title: "4.7 Pure Functions",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.7 Pure Functions.md",
          },
          {
            id: "js-lec27",
            title: "4.8 Optional Chaining & Nullish Coalescing",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.8 Optional Chaining & Nullish Coalescing.md",
          },
          {
            id: "js-lec28",
            title: "4.9 Short-circuit Evaluation",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.9 Short-circuit Evaluation.md",
          }
        ]
      },
      {
        id: "phase5",
        title: "Phase 5 — DOM & Browser",
        openByDefault: false,
        lectures: [
          {
            id: "js-lec29",
            title: "5.1 DOM Manipulation",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.1 DOM Manipulation.md",
          },
          {
            id: "js-lec30",
            title: "5.2 Events",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.2 Events.md",
          },
          {
            id: "js-lec31",
            title: "5.3 Event Bubbling",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.3 Event Bubbling.md",
          },
          {
            id: "js-lec32",
            title: "5.4 Event Delegation",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.4 Event Delegation.md",
          },
          {
            id: "js-lec33",
            title: "5.5 Debounce & Throttle",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.5 Debounce & Throttle.md",
          },
          {
            id: "js-lec34",
            title: "5.6 localStorage & sessionStorage",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.6 localStorage & sessionStorage.md",
          }
        ]
      },
      {
        id: "phase6",
        title: "Phase 6 — Advanced Topics",
        openByDefault: false,
        lectures: [
          {
            id: "js-lec35",
            title: "6.1 Modules (import / export)",
            path: "docs/coding/JS/Phase 6 - Advanced Topics/6.1 Modules import export.md",
          },
          {
            id: "js-lec36",
            title: "6.2 Error Handling",
            path: "docs/coding/JS/Phase 6 - Advanced Topics/6.2 Error Handling.md",
          },
          {
            id: "js-lec37",
            title: "6.3 Design Patterns",
            path: "docs/coding/JS/Phase 6 - Advanced Topics/6.3 Design Patterns.md",
          },
          {
            id: "js-lec38",
            title: "6.4 Memory & Performance",
            path: "docs/coding/JS/Phase 6 - Advanced Topics/6.4 Memory & Performance.md",
          },
          {
            id: "js-lec39",
            title: "6.5 Generators",
            path: "docs/coding/JS/Phase 6 - Advanced Topics/6.5 Generators.md",
          }
        ]
      }
    ],
    progress: [
      {
        phase: "Phase 1 - Foundations",
        topics: [
          { id: "var-let-const", title: "var / let / const", completed: true },
          { id: "data-types", title: "Data Types", completed: true },
          { id: "scope", title: "Scope", completed: true },
          { id: "hoisting", title: "Hoisting", completed: false },
          {
            id: "type-coercion",
            title: "Type Coercion & Equality",
            completed: false,
          },
          { id: "functions", title: "Functions — All Forms", completed: false },
        ],
      },
    ],
  },
   {
     id: "webdev",
     title: "Web Dev Fundamentals",
     description: "Complete mind map, architecture and interview reference for full stack development",
     lectures: [
       {
         id: "skeleton",
         title: "🗺️ Full Stack Skeleton Map",
         path: "docs/coding/WEB-DEV/00-MIND-MAP/00-Full Stack Skeleton.md"
       }
     ],
     phases: [
       {
         id: "mindmap",
         title: "🧠 Complete Web Dev Mind Map",
         openByDefault: true,
         lectures: [
           { id: "wd-00", title: "00 - Full Stack Skeleton", path: "docs/coding/WEB-DEV/00-MIND-MAP/00-Full Stack Skeleton.md" },
           { id: "wd-01", title: "01 - Overview", path: "docs/coding/WEB-DEV/00-MIND-MAP/00-overview.md" },
           { id: "wd-02", title: "02 - Full Stack Skeleton Alive", path: "docs/coding/WEB-DEV/00-MIND-MAP/01-Full-Stack-Skeleton-alive.md" },
           { id: "wd-03", title: "03 - How To Think", path: "docs/coding/WEB-DEV/00-MIND-MAP/01-how-to-think.md" },
           { id: "wd-04", title: "04 - Auth - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/02-auth-what-is-it.md" },
           { id: "wd-05", title: "05 - Password Hashing", path: "docs/coding/WEB-DEV/00-MIND-MAP/03-auth-password-hashing.md" },
           { id: "wd-06", title: "06 - Sessions", path: "docs/coding/WEB-DEV/00-MIND-MAP/04-auth-sessions.md" },
           { id: "wd-07", title: "07 - JWT", path: "docs/coding/WEB-DEV/00-MIND-MAP/05-auth-jwt.md" },
           { id: "wd-08", title: "08 - Cookies", path: "docs/coding/WEB-DEV/00-MIND-MAP/06-auth-cookies.md" },
           { id: "wd-09", title: "09 - OAuth", path: "docs/coding/WEB-DEV/00-MIND-MAP/07-auth-oauth.md" },
           { id: "wd-10", title: "10 - Email Verification", path: "docs/coding/WEB-DEV/00-MIND-MAP/08-auth-email-verification.md" },
           { id: "wd-11", title: "11 - Auth Libraries", path: "docs/coding/WEB-DEV/00-MIND-MAP/09-auth-libraries.md" },
           { id: "wd-12", title: "12 - Architecture - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/10-architecture-what-is-it.md" },
           { id: "wd-13", title: "13 - MVC Architecture", path: "docs/coding/WEB-DEV/00-MIND-MAP/11-architecture-mvc.md" },
           { id: "wd-14", title: "14 - Folder Architecture", path: "docs/coding/WEB-DEV/00-MIND-MAP/12-architecture-folder.md" },
           { id: "wd-15", title: "15 - BFF Pattern", path: "docs/coding/WEB-DEV/00-MIND-MAP/13-architecture-bff.md" },
           { id: "wd-16", title: "16 - Rendering - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/14-rendering-what-is-it.md" },
           { id: "wd-17", title: "17 - CSR", path: "docs/coding/WEB-DEV/00-MIND-MAP/15-rendering-csr.md" },
           { id: "wd-18", title: "18 - SSR", path: "docs/coding/WEB-DEV/00-MIND-MAP/16-rendering-ssr.md" },
           { id: "wd-19", title: "19 - SSG", path: "docs/coding/WEB-DEV/00-MIND-MAP/17-rendering-ssg.md" },
           { id: "wd-20", title: "20 - Rendering Shopkaro Example", path: "docs/coding/WEB-DEV/00-MIND-MAP/18-rendering-shopkaro.md" },
           { id: "wd-21", title: "21 - Database - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/19-database-what-is-it.md" },
           { id: "wd-22", title: "22 - SQL vs NoSQL", path: "docs/coding/WEB-DEV/00-MIND-MAP/20-database-sql-vs-nosql.md" },
           { id: "wd-23", title: "23 - Prisma ORM", path: "docs/coding/WEB-DEV/00-MIND-MAP/21-database-prisma.md" },
           { id: "wd-24", title: "24 - Database Models", path: "docs/coding/WEB-DEV/00-MIND-MAP/22-database-models.md" },
           { id: "wd-25", title: "25 - API - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/23-api-what-is-it.md" },
           { id: "wd-26", title: "26 - REST API", path: "docs/coding/WEB-DEV/00-MIND-MAP/24-api-rest.md" },
           { id: "wd-27", title: "27 - GraphQL", path: "docs/coding/WEB-DEV/00-MIND-MAP/25-api-graphql.md" },
           { id: "wd-28", title: "28 - API Shopkaro Example", path: "docs/coding/WEB-DEV/00-MIND-MAP/26-api-shopkaro.md" },
           { id: "wd-29", title: "29 - State - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/27-state-what-is-it.md" },
           { id: "wd-30", title: "30 - Local vs Global State", path: "docs/coding/WEB-DEV/00-MIND-MAP/28-state-local-vs-global.md" },
           { id: "wd-31", title: "31 - Context API", path: "docs/coding/WEB-DEV/00-MIND-MAP/29-state-context.md" },
           { id: "wd-32", title: "32 - Zustand", path: "docs/coding/WEB-DEV/00-MIND-MAP/30-state-zustand.md" },
           { id: "wd-33", title: "33 - Server State", path: "docs/coding/WEB-DEV/00-MIND-MAP/31-state-server.md" },
           { id: "wd-34", title: "34 - Caching - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/32-caching-what-is-it.md" },
           { id: "wd-35", title: "35 - Browser Caching", path: "docs/coding/WEB-DEV/00-MIND-MAP/33-caching-browser.md" },
           { id: "wd-36", title: "36 - CDN Caching", path: "docs/coding/WEB-DEV/00-MIND-MAP/34-caching-cdn.md" },
           { id: "wd-37", title: "37 - Server Caching", path: "docs/coding/WEB-DEV/00-MIND-MAP/35-caching-server.md" },
           { id: "wd-38", title: "38 - Payments - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/36-payments-what-is-it.md" },
           { id: "wd-39", title: "39 - Payment Flow", path: "docs/coding/WEB-DEV/00-MIND-MAP/37-payments-flow.md" },
           { id: "wd-40", title: "40 - Webhooks", path: "docs/coding/WEB-DEV/00-MIND-MAP/38-payments-webhooks.md" },
           { id: "wd-41", title: "41 - Performance - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/39-performance-what-is-it.md" },
           { id: "wd-42", title: "42 - Image Optimization", path: "docs/coding/WEB-DEV/00-MIND-MAP/40-performance-images.md" },
           { id: "wd-43", title: "43 - Loading Patterns", path: "docs/coding/WEB-DEV/00-MIND-MAP/41-performance-loading.md" },
           { id: "wd-44", title: "44 - List Performance", path: "docs/coding/WEB-DEV/00-MIND-MAP/42-performance-lists.md" },
           { id: "wd-45", title: "45 - Accessibility", path: "docs/coding/WEB-DEV/00-MIND-MAP/43-accessibility-what-is-it.md" },
           { id: "wd-46", title: "46 - Vercel Deployment", path: "docs/coding/WEB-DEV/00-MIND-MAP/44-deployment-vercel.md" },
           { id: "wd-47", title: "47 - Senior Dev Checklist", path: "docs/coding/WEB-DEV/00-MIND-MAP/45-senior-dev-checklist.md" },
         ]
       },
       {
         id: "interview",
         title: "🎯 Interview Preparation",
         openByDefault: false,
         lectures: [
           { id: "int-01", title: "01 - Browser Caching", path: "docs/coding/WEB-DEV/interview/01-browser-caching.md" },
           { id: "int-02", title: "02 - Cache Busting", path: "docs/coding/WEB-DEV/interview/02-cache-busting.md" },
           { id: "int-03", title: "03 - Cache vs Database", path: "docs/coding/WEB-DEV/interview/03-cache-vs-database.md" },
           { id: "int-04", title: "04 - Request Lifecycle", path: "docs/coding/WEB-DEV/interview/04-request-lifecycle.md" },
           { id: "int-05", title: "05 - Web Storage Security", path: "docs/coding/WEB-DEV/interview/05-web-storage-security.md" },
           { id: "int-06", title: "06 - CORS", path: "docs/coding/WEB-DEV/interview/06-cors.md" },
           { id: "int-07", title: "07 - Library vs Framework", path: "docs/coding/WEB-DEV/interview/07-library-vs-framework.md" },
           { id: "int-08", title: "08 - Hooks & Fiber Architecture", path: "docs/coding/WEB-DEV/interview/08-hooks-fiber-architecture.md" },
           { id: "int-09", title: "09 - State Immutability", path: "docs/coding/WEB-DEV/interview/09-state-immutability.md" },
           { id: "int-10", title: "10 - useEffect Deep Dive", path: "docs/coding/WEB-DEV/interview/10-useEffect-deep-dive.md" },
           { id: "int-11", title: "11 - useMemo / useCallback", path: "docs/coding/WEB-DEV/interview/11-useMemo-useCallback.md" },
           { id: "int-12", title: "12 - React.memo", path: "docs/coding/WEB-DEV/interview/12-React.memo.md" },
           { id: "int-13", title: "13 - Virtual DOM & Reconciliation", path: "docs/coding/WEB-DEV/interview/13 virtual dom reconciliation.md" },
           { id: "int-14", title: "14 - Rendering Stages", path: "docs/coding/WEB-DEV/interview/14 rendering stages.md" },
           { id: "int-15", title: "15 - React Server Components", path: "docs/coding/WEB-DEV/interview/15-react-server-components.md" },
           { id: "int-16", title: "16 - Hydration", path: "docs/coding/WEB-DEV/interview/16-hydration.md" },
           { id: "int-17", title: "17 - App Router vs Pages Router", path: "docs/coding/WEB-DEV/interview/17-app-router-vs-pages-router.md" },
           { id: "int-18", title: "18 - Middleware & Edge Runtime", path: "docs/coding/WEB-DEV/interview/18-middleware-edge-runtime.md" },
           { id: "int-19", title: "19 - API Design REST vs GraphQL", path: "docs/coding/WEB-DEV/interview/19-api-design-rest-vs-graphql.md" },
         ]
       },
       {
         id: "projects",
         title: "🚀 Project Understanding",
         openByDefault: false,
         lectures: [
           { id: "proj-01", title: "01 - Solo Dev Process", path: "docs/coding/WEB-DEV/Project Understanding/plan-01-solo-dev-process.md" },
           { id: "proj-02", title: "02 - PRD Template", path: "docs/coding/WEB-DEV/Project Understanding/plan-02-prd-template.md" },
           { id: "proj-03", title: "03 - Architecture Cheatsheet", path: "docs/coding/WEB-DEV/Project Understanding/plan-03-architecture-cheatsheet.md" },
           { id: "proj-04", title: "04 - STAR Method", path: "docs/coding/WEB-DEV/Project Understanding/plan-04-star-method.md" },
           { id: "proj-05", title: "05 - Task Manager Project", path: "docs/coding/WEB-DEV/Project Understanding/project-01-task-manager.md" },
           { id: "proj-06", title: "06 - Job Board Project", path: "docs/coding/WEB-DEV/Project Understanding/project-02-job-board.md" },
           { id: "proj-07", title: "07 - Chat App Project", path: "docs/coding/WEB-DEV/Project Understanding/project-03-chat-app.md" },
           { id: "proj-08", title: "08 - Ecommerce Project", path: "docs/coding/WEB-DEV/Project Understanding/project-04-ecommerce.md" },
           { id: "proj-09", title: "09 - Analytics Dashboard Project", path: "docs/coding/WEB-DEV/Project Understanding/project-05-analytics-dashboard.md" },
         ]
       }
     ]
   },
   {
     id: "typescript",
     title: "TypeScript",
     description: "Type safe JavaScript",
     lectures: [],
   },
 ] as const;

/**
 * Helper function to load markdown content from API endpoint
 */
export const loadMarkdownContent = async (
  filePath: string,
): Promise<string> => {
  try {
    const response = await fetch(
      `/api/notes?file=${encodeURIComponent(filePath)}`,
    );
    if (response.ok) {
      return await response.text();
    } else {
      return `# Error Loading Notes\n\nFailed to load: ${filePath}`;
    }
  } catch (error) {
    return `# Error Loading Notes\n\n${error instanceof Error ? error.message : "Unknown error"}`;
  }
};
