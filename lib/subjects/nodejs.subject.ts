import type { Subject } from "../coding-data";

export const nodejsSubject: Subject = {
  id: "nodejs",
  title: "Node.js",
  description: "Node.js primer — modules, npm, async, HTTP server (React/Next foundation)",
  lectures: [
    {
      id: "node-roadmap",
      title: "📋 Node.js Roadmap",
      path: "docs/coding/Node JS/roadmap.md",
    },
  ],
  phases: [
    {
      id: "primer",
      title: "Node.js Primer",
      openByDefault: true,
      lectures: [
        {
          id: "node-01",
          title: "01 Node.js Kya Hai",
          path: "docs/coding/Node JS/01 Node.js Kya Hai.md",
        },
        {
          id: "node-02",
          title: "02 Module System",
          path: "docs/coding/Node JS/02 Module System.md",
        },
        {
          id: "node-03",
          title: "03 npm",
          path: "docs/coding/Node JS/03 npm.md",
        },
        {
          id: "node-04",
          title: "04 Event Loop",
          path: "docs/coding/Node JS/04 Event Loop.md",
        },
        {
          id: "node-05",
          title: "05 Promises aur Async Await",
          path: "docs/coding/Node JS/05 Promises aur Async Await.md",
        },
        {
          id: "node-06",
          title: "06 HTTP Server",
          path: "docs/coding/Node JS/06 HTTP Server.md",
        },
        {
          id: "node-07",
          title: "07 Environment aur Bridge to Next.js",
          path: "docs/coding/Node JS/07 Environment aur Bridge to Next.js.md",
        },
      ],
    },
  ],
};