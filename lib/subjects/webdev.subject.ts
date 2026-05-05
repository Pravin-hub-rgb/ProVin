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
        { id: "wd-11", title: "11 - Auth Libraries", path: "docs/coding/WEB-DEV/00-MIND-MAP/09-auth-libraries.md" }
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
    }
  ]
};
