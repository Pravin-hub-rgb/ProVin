import type { Subject } from "../coding-data";

export const pythonSubject: Subject = {
  id: "python",
  title: "Python",
    description:
    "Python basics to backend — fundamentals (7 lectures + practice + solutions), backend mindset, then FastAPI + SQLite + pandas for your own trading backend. Apply to TradeStack backend.",
  lectures: [
    {
      id: "py-roadmap",
      title: "Python Course Roadmap",
      path: "docs/coding/Backend (Python)/Python Course Roadmap.md",
    },
  ],
  phases: [
    {
      id: "python-basics",
      title: "Python Basics - Lec 1 to 7",
      openByDefault: true,
      lectures: [],
      groups: [
        {
          id: "py-basics-lec1",
          title: "Lec 1 - Variables & Functions",
          lectures: [
            {
              id: "lec1-notes",
              title: "Notes",
              path: "docs/coding/python/1 Lec variables & functions/notes.md",
            },
            {
              id: "lec1-practice",
              title: "Practice Set",
              path: "docs/coding/python/1 Lec variables & functions/practice_set.md",
            },
            {
              id: "lec1-solutions",
              title: "Solutions",
              path: "docs/coding/python/1 Lec variables & functions/solutions.md",
            },
          ],
        },
        {
          id: "py-basics-lec2",
          title: "Lec 2 - Conditionals",
          lectures: [
            {
              id: "lec2-notes",
              title: "Notes",
              path: "docs/coding/python/2 Lec/notes.md",
            },
            {
              id: "lec2-practice",
              title: "Practice Set",
              path: "docs/coding/python/2 Lec/practice_set.md",
            },
            {
              id: "lec2-solutions",
              title: "Solutions",
              path: "docs/coding/python/2 Lec/solutions.md",
            },
          ],
        },
        {
          id: "py-basics-lec3",
          title: "Lec 3 - Loops",
          lectures: [
            {
              id: "lec3-notes",
              title: "Notes",
              path: "docs/coding/python/3 Lec loops/notes.md",
            },
            {
              id: "lec3-practice",
              title: "Practice Set",
              path: "docs/coding/python/3 Lec loops/practice_set.md",
            },
            {
              id: "lec3-solutions",
              title: "Solutions",
              path: "docs/coding/python/3 Lec loops/solutions.md",
            },
          ],
        },
        {
          id: "py-basics-lec4",
          title: "Lec 4 - Exceptions",
          lectures: [
            {
              id: "lec4-notes",
              title: "Notes",
              path: "docs/coding/python/4 Lec Exceptions/notes.md",
            },
            {
              id: "lec4-practice",
              title: "Practice Set",
              path: "docs/coding/python/4 Lec Exceptions/practice_set.md",
            },
            {
              id: "lec4-solutions",
              title: "Solutions",
              path: "docs/coding/python/4 Lec Exceptions/solutions.md",
            },
          ],
        },
        {
          id: "py-basics-lec5",
          title: "Lec 5 - Modules",
          lectures: [
            {
              id: "lec5-notes",
              title: "Notes",
              path: "docs/coding/python/5 Lec Modules/notes.md",
            },
            {
              id: "lec5-practice",
              title: "Practice Set",
              path: "docs/coding/python/5 Lec Modules/practice_set.md",
            },
            {
              id: "lec5-solutions",
              title: "Solutions",
              path: "docs/coding/python/5 Lec Modules/solutions.md",
            },
          ],
        },
        {
          id: "py-basics-lec6",
          title: "Lec 6 - Unit Testing",
          lectures: [
            {
              id: "lec6-notes",
              title: "Notes",
              path: "docs/coding/python/6 Lec Unit Test/notes.md",
            },
            {
              id: "lec6-practice",
              title: "Practice Set",
              path: "docs/coding/python/6 Lec Unit Test/practice_set.md",
            },
            {
              id: "lec6-solutions",
              title: "Solutions",
              path: "docs/coding/python/6 Lec Unit Test/solutions.md",
            },
          ],
        },
        {
          id: "py-basics-lec7",
          title: "Lec 7 - File IO",
          lectures: [
            {
              id: "lec7-notes",
              title: "Notes",
              path: "docs/coding/python/7 Lec File IO/notes.md",
            },
            {
              id: "lec7-practice",
              title: "Practice Set",
              path: "docs/coding/python/7 Lec File IO/practice_set.md",
            },
            {
              id: "lec7-solutions",
              title: "Solutions",
              path: "docs/coding/python/7 Lec File IO/solutions.md",
            },
          ],
        },
      ],
    },
    {
      id: "phase0",
      title: "Backend Mindset - FastAPI Phase 0",
      openByDefault: true,
      lectures: [
        {
          id: "fp-0.0",
          title: "0.0 How the Course Works - Backend Map",
          path: "docs/coding/Backend (Python)/Phase 0 - Backend Mindset/0.0 Course Kaise Chalega - Backend Ki Map.md",
        },
        {
          id: "fp-0.1",
          title: "0.1 Client-Server Model",
          path: "docs/coding/Backend (Python)/Phase 0 - Backend Mindset/0.1 Client-Server Model.md",
        },
        {
          id: "fp-0.2",
          title: "0.2 HTTP Basics",
          path: "docs/coding/Backend (Python)/Phase 0 - Backend Mindset/0.2 HTTP Basics.md",
        },
        {
          id: "fp-0.3",
          title: "0.3 API + JSON",
          path: "docs/coding/Backend (Python)/Phase 0 - Backend Mindset/0.3 API and JSON.md",
        },
        {
          id: "fp-0.4",
          title: "0.4 Flask vs FastAPI - Jungle Map + Choice",
          path: "docs/coding/Backend (Python)/Phase 0 - Backend Mindset/0.4 Flask vs FastAPI - Jungle Map.md",
        },
        {
          id: "fp-0.5",
          title: "0.5 Setup + First FastAPI App (Hello World)",
          path: "docs/coding/Backend (Python)/Phase 0 - Backend Mindset/0.5 Setup and First FastAPI App.md",
        },
      ],
    },
    {
      id: "phase1",
      title: "FastAPI Basics (CRUD + SQLite) - Phase 1",
      openByDefault: true,
      lectures: [
        {
          id: "fp-1.0",
          title: "1.0 Phase 1 - What We'll Learn + Project Preview",
          path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.0 Phase 1 - Kya Seekhenge + Project Preview.md",
        },
        {
          id: "fp-1.1",
          title: "1.1 Path & Query Params",
          path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.1 Path & Query Params.md",
        },
        {
          id: "fp-1.2",
          title: "1.2 Pydantic + Request Body",
          path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.2 Pydantic + Request Body.md",
        },
        {
          id: "fp-1.3",
          title: "1.3 CRUD - Create Read Update Delete",
          path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.3 CRUD - Create Read Update Delete.md",
        },
        {
          id: "fp-1.4",
          title: "1.4 Connect to SQLite",
          path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.4 SQLite se Jodo.md",
        },
        {
          id: "fp-1.5.1",
          title: "1.5.1 Planning - Trading Backend Basic",
          path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.5.1 Planning - Trading Backend Basic.md",
        },
        {
          id: "fp-1.5.2",
          title: "1.5.2 Server Khada - Pehla Endpoint",
          path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.5.2 Server Khada - Pehla Endpoint.md",
        },
        {
          id: "fp-1.5.3",
          title: "1.5.3 Data Layer - Tables + Endpoints",
          path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.5.3 Data Layer - Tables + Endpoints.md",
        },
        {
          id: "fp-1.5.4",
          title: "1.5.4 Indicators - SMA + RSI (pandas)",
          path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.5.4 Indicators - SMA + RSI.md",
        },
        {
          id: "fp-1.5.5",
          title: "1.5.5 Scan Endpoint + Wrap-up",
          path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.5.5 Scan Endpoint + Wrap-up.md",
        },
      ],
      groups: [
        {
          id: "fp-1-appendix-a",
          title: "Appendix A - Docker Basics",
          lectures: [
            {
              id: "fp-2.0",
              title: "A.0 What Is Docker + Overview",
              path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.0 Docker Kya Hai + Overview.md",
            },
            {
              id: "fp-2.1",
              title: "A.1 Dockerfile + .dockerignore",
              path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.1 Dockerfile + .dockerignore.md",
            },
            {
              id: "fp-2.2",
              title: "A.2 Docker Compose - Volumes + Service",
              path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.2 Docker Compose - Volumes + Service.md",
            },
            {
              id: "fp-2.3",
              title: "A.3 Test + TradeStack Bridge",
              path: "docs/coding/Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/Appendix A - Docker Basics/2.3 Test Karo + TradeStack Bridge.md",
            },
          ],
        },
      ],
    },
  ],
};