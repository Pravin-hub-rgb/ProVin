import type { Subject } from "../coding-data";

export const fastapiSubject: Subject = {
  id: "fastapi",
  title: "FastAPI (Python Backend)",
  description:
    "Zero se real-time tak — FastAPI se backend: client-server, HTTP, Todo API, WebSocket chat. TradeStack backend pe apply.",
  lectures: [
    {
      id: "fastapi-roadmap",
      title: "📋 FastAPI Course Roadmap",
      path: "docs/coding/Backend (Python)/FastAPI Course Roadmap.md",
    },
  ],
  phases: [
    {
      id: "phase0",
      title: "Phase 0 - Backend Mindset",
      openByDefault: true,
      lectures: [
        {
          id: "fp-0.0",
          title: "0.0 Course Kaise Chalega - Backend Ki Map",
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
          title: "0.5 Setup + Pehla FastAPI App (Hello World)",
          path: "docs/coding/Backend (Python)/Phase 0 - Backend Mindset/0.5 Setup and First FastAPI App.md",
        },
      ],
    },
  ],
};