import type { Subject } from "../coding-data";

export const webdevSubject: Subject = {
  id: "webdev",
  title: "Web Dev Fundamentals",
  description: "Complete mind map, architecture and interview reference for full stack development",
  lectures: [],
  phases: [
    {
      id: "mindmap",
      title: "🧠 Complete Web Dev Mind Map",
      openByDefault: true,
      groups: [
        {
          id: "tools",
          title: "🛠️ Web Dev Tools Reference",
          openByDefault: false,
          lectures: [
            { id: "tool-00", title: "00 - Overview: Web Dev Ki Duniya", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/00-overview.md" },
            { id: "tool-01", title: "01 - Frontend Tools: State Management", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/01-frontend-state.md" },
            { id: "tool-02", title: "02 - Frontend Tools: Styling", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/02-frontend-styling.md" },
            { id: "tool-03", title: "03 - Frontend Tools: Components", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/03-frontend-components.md" },
            { id: "tool-04", title: "04 - Frontend Tools: Forms", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/04-frontend-forms.md" },
            { id: "tool-05", title: "05 - Frontend Tools: HTTP", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/05-frontend-http.md" },
            { id: "tool-06", title: "06 - Frontend Tools: Animation", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/06-frontend-animation.md" },
            { id: "tool-07", title: "07 - Frontend Tools: Frameworks", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/07-frontend-frameworks.md" },
            { id: "tool-08", title: "08 - Backend Tools: Frameworks", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/08-backend-frameworks.md" },
            { id: "tool-09", title: "09 - Backend Tools: ORM", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/09-backend-orm.md" },
            { id: "tool-10", title: "10 - Backend Tools: Realtime", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/10-backend-realtime.md" },
            { id: "tool-11", title: "11 - Backend Tools: Email", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/11-backend-email.md" },
            { id: "tool-12", title: "12 - Backend Tools: Queues", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/12-backend-queues.md" },
            { id: "tool-13", title: "13 - Backend Tools: Storage", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/13-backend-storage.md" },
            { id: "tool-14", title: "14 - Database Tools: SQL", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/14-database-sql.md" },
            { id: "tool-15", title: "15 - Database Tools: NoSQL", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/15-database-nosql.md" },
            { id: "tool-16", title: "16 - Database Tools: Search", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/16-database-search.md" },
            { id: "tool-17", title: "17 - Auth Libraries Reference", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/17-auth-libraries.md" },
            { id: "tool-18", title: "18 - Testing Tools", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/18-testing.md" },
            { id: "tool-19", title: "19 - DevOps Tools", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/19-devops.md" },
            { id: "tool-20", title: "20 - Meta Tools", path: "docs/coding/WEB-DEV/00-MIND-MAP/webdev-tools-docs/20-meta-tools.md" }
          ]
        }
      ],
      lectures: [
        { id: "wd-00", title: "00 - Full Stack Skeleton", path: "docs/coding/WEB-DEV/00-MIND-MAP/00-Full Stack Skeleton.md" },
        { id: "wd-01", title: "01 - Full Stack Skeleton Alive", path: "docs/coding/WEB-DEV/00-MIND-MAP/01-Full-Stack-Skeleton-alive.md" },
        { id: "wd-02", title: "02 - Overview", path: "docs/coding/WEB-DEV/00-MIND-MAP/00-overview.md" },
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
        { id: "wd-13", title: "13 - Architecture - MVC", path: "docs/coding/WEB-DEV/00-MIND-MAP/11-architecture-mvc.md" },
        { id: "wd-14", title: "14 - Architecture - Folder Structure", path: "docs/coding/WEB-DEV/00-MIND-MAP/12-architecture-folder.md" },
        { id: "wd-15", title: "15 - Architecture - BFF", path: "docs/coding/WEB-DEV/00-MIND-MAP/13-architecture-bff.md" },
        { id: "wd-16", title: "16 - Rendering - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/14-rendering-what-is-it.md" },
        { id: "wd-17", title: "17 - Rendering - CSR", path: "docs/coding/WEB-DEV/00-MIND-MAP/15-rendering-csr.md" },
        { id: "wd-18", title: "18 - Rendering - SSR", path: "docs/coding/WEB-DEV/00-MIND-MAP/16-rendering-ssr.md" },
        { id: "wd-19", title: "19 - Rendering - SSG", path: "docs/coding/WEB-DEV/00-MIND-MAP/17-rendering-ssg.md" },
        { id: "wd-20", title: "20 - Rendering - ShopKaro Decisions", path: "docs/coding/WEB-DEV/00-MIND-MAP/18-rendering-shopkaro.md" },
        { id: "wd-21", title: "21 - Database - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/19-database-what-is-it.md" },
        { id: "wd-22", title: "22 - Database - SQL vs NoSQL", path: "docs/coding/WEB-DEV/00-MIND-MAP/20-database-sql-vs-nosql.md" },
        { id: "wd-23", title: "23 - Database - Prisma", path: "docs/coding/WEB-DEV/00-MIND-MAP/21-database-prisma.md" },
        { id: "wd-24", title: "24 - Database - Models", path: "docs/coding/WEB-DEV/00-MIND-MAP/22-database-models.md" },
        { id: "wd-25", title: "25 - API - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/23-api-what-is-it.md" },
        { id: "wd-26", title: "26 - API - REST", path: "docs/coding/WEB-DEV/00-MIND-MAP/24-api-rest.md" },
        { id: "wd-27", title: "27 - API - GraphQL", path: "docs/coding/WEB-DEV/00-MIND-MAP/25-api-graphql.md" },
        { id: "wd-28", title: "28 - API - ShopKaro Reference", path: "docs/coding/WEB-DEV/00-MIND-MAP/26-api-shopkaro.md" },
        { id: "wd-29", title: "29 - State - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/27-state-what-is-it.md" },
        { id: "wd-30", title: "30 - State - Local vs Global", path: "docs/coding/WEB-DEV/00-MIND-MAP/28-state-local-vs-global.md" },
        { id: "wd-31", title: "31 - State - Context", path: "docs/coding/WEB-DEV/00-MIND-MAP/29-state-context.md" },
        { id: "wd-32", title: "32 - State - Zustand", path: "docs/coding/WEB-DEV/00-MIND-MAP/30-state-zustand.md" },
        { id: "wd-33", title: "33 - State - React Query (Server)", path: "docs/coding/WEB-DEV/00-MIND-MAP/31-state-server.md" },
        { id: "wd-34", title: "34 - Caching - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/32-caching-what-is-it.md" },
        { id: "wd-35", title: "35 - Caching - Browser Storage", path: "docs/coding/WEB-DEV/00-MIND-MAP/33-caching-browser.md" },
        { id: "wd-36", title: "36 - Caching - CDN", path: "docs/coding/WEB-DEV/00-MIND-MAP/34-caching-cdn.md" },
        { id: "wd-37", title: "37 - Caching - Server Cache", path: "docs/coding/WEB-DEV/00-MIND-MAP/35-caching-server.md" },
        { id: "wd-38", title: "38 - Payments - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/36-payments-what-is-it.md" },
        { id: "wd-39", title: "39 - Payments - Razorpay Flow", path: "docs/coding/WEB-DEV/00-MIND-MAP/37-payments-flow.md" },
        { id: "wd-40", title: "40 - Payments - Webhooks", path: "docs/coding/WEB-DEV/00-MIND-MAP/38-payments-webhooks.md" },
        { id: "wd-41", title: "41 - Performance - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/39-performance-what-is-it.md" },
        { id: "wd-42", title: "42 - Performance - Images", path: "docs/coding/WEB-DEV/00-MIND-MAP/40-performance-images.md" },
        { id: "wd-43", title: "43 - Performance - Lazy Loading & Skeletons", path: "docs/coding/WEB-DEV/00-MIND-MAP/41-performance-loading.md" },
        { id: "wd-44", title: "44 - Performance - Pagination vs Infinite Scroll", path: "docs/coding/WEB-DEV/00-MIND-MAP/42-performance-lists.md" },
        { id: "wd-45", title: "45 - Accessibility - What Is It", path: "docs/coding/WEB-DEV/00-MIND-MAP/43-accessibility-what-is-it.md" },
        { id: "wd-46", title: "46 - Deployment - Vercel", path: "docs/coding/WEB-DEV/00-MIND-MAP/44-deployment-vercel.md" },
        { id: "wd-47", title: "47 - Senior Dev Checklist", path: "docs/coding/WEB-DEV/00-MIND-MAP/45-senior-dev-checklist.md" }
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
        { id: "int-15", title: "15 - React Server Components", path: "docs/coding/WEB-DEV/interview/15-react-server-components.md" }
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
        { id: "proj-09", title: "09 - Analytics Dashboard Project", path: "docs/coding/WEB-DEV/Project Understanding/project-05-analytics-dashboard.md" }
      ]
    },
    {
      id: "database",
      title: "🗄️ Database Understanding SQL",
      openByDefault: false,
      lectures: [
        { id: "db-01", title: "01 - Database Design Process", path: "docs/coding/WEB-DEV/Project Understanding/database understanding sql/db-01-design-process.md" },
        { id: "db-02", title: "02 - Relationships Deep Dive", path: "docs/coding/WEB-DEV/Project Understanding/database understanding sql/db-02-relationships-deep.md" },
        { id: "db-03", title: "03 - Indexes & Performance", path: "docs/coding/WEB-DEV/Project Understanding/database understanding sql/db-03-indexes-performance.md" },
        { id: "db-04", title: "04 - Naming & Migrations", path: "docs/coding/WEB-DEV/Project Understanding/database understanding sql/db-04-naming-migrations.md" },
        { id: "db-05", title: "05 - StaffSync DB Project", path: "docs/coding/WEB-DEV/Project Understanding/database understanding sql/db-project-01-staffsync.md" },
        { id: "db-06", title: "06 - HireHop DB Project", path: "docs/coding/WEB-DEV/Project Understanding/database understanding sql/db-project-02-hirehop.md" },
        { id: "db-07", title: "07 - DB Projects 3,4,5", path: "docs/coding/WEB-DEV/Project Understanding/database understanding sql/db-projects-03-04-05.md" }
      ]
    },
    {
      id: "web-history",
      title: "📜 Web History",
      openByDefault: false,
      lectures: [
        { id: "hist-01", title: "Web History Part 1", path: "docs/coding/WEB-DEV/web history/web-history-part1.md" },
        { id: "hist-02", title: "Web History Part 2", path: "docs/coding/WEB-DEV/web history/web-history-part2.md" },
        { id: "hist-03", title: "Web History Part 3", path: "docs/coding/WEB-DEV/web history/web-history-part3.md" },
        { id: "hist-04", title: "Web History Part 4", path: "docs/coding/WEB-DEV/web history/web-history-part4.md" },
        { id: "hist-05", title: "Web History Part 5", path: "docs/coding/WEB-DEV/web history/web-history-part5.md" }
      ]
    },
  ]
};
