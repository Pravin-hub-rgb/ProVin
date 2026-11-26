import type { Subject } from "../coding-data";

export const backendpernSubject: Subject = {
  id: "backendpern",
  title: "Backend (PERN)",
  description: "Node, Express, TypeScript, Postgres — from HTTP to a shipped API",
  lectures: [
    {
      id: "backendpern-roadmap",
      title: "Backend (PERN) Roadmap",
      path: "docs/coding/Backend (PERN)/Backend (PERN) Roadmap.md",
    },
    {
      id: "backendpern-blueprint",
      title: "Course Blueprint",
      path: "docs/coding/Backend (PERN)/Backend Engineering Course Blueprint Node, Express, TypeScript, Postgres (PERN).md",
    },
  ],
  phases: [
    {
      id: "backend-module0",
      title: "Module 0 — How the Web and a Backend Work",
      openByDefault: true,
      lectures: [
        { id: "b-0.1", title: "0.1 What a Backend Is", path: "docs/coding/Backend (PERN)/Module 0 - How the Web and a Backend Work/0.1 What a Backend Is.md" },
        { id: "b-0.2", title: "0.2 URLs, Ports, localhost, DNS", path: "docs/coding/Backend (PERN)/Module 0 - How the Web and a Backend Work/0.2 URLs, Ports, localhost, DNS.md" },
        { id: "b-0.3", title: "0.3 HTTP Messages", path: "docs/coding/Backend (PERN)/Module 0 - How the Web and a Backend Work/0.3 HTTP Messages.md" },
        { id: "b-0.4", title: "0.4 JSON and Content-Type", path: "docs/coding/Backend (PERN)/Module 0 - How the Web and a Backend Work/0.4 JSON and Content-Type.md" },
        { id: "b-0.5", title: "0.5 REST Thinking", path: "docs/coding/Backend (PERN)/Module 0 - How the Web and a Backend Work/0.5 REST Thinking.md" },
        { id: "b-0.6", title: "0.6 Where Data Travels", path: "docs/coding/Backend (PERN)/Module 0 - How the Web and a Backend Work/0.6 Where Data Travels.md" },
        { id: "b-0.7", title: "0.7 Node in One Picture", path: "docs/coding/Backend (PERN)/Module 0 - How the Web and a Backend Work/0.7 Node in One Picture.md" },
        { id: "b-0.8", title: "0.8 Tool Setup", path: "docs/coding/Backend (PERN)/Module 0 - How the Web and a Backend Work/0.8 Tool Setup.md" },
      ],
    },
    {
      id: "backend-batch1",
      title: "Batch 1 — Node.js and TypeScript Foundations",
      openByDefault: false,
      lectures: [
        { id: "b-1.1", title: "1.1 Project Setup", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.1 Project Setup.md" },
        { id: "b-1.2", title: "1.2 tsconfig for Node", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.2 tsconfig for Node.md" },
        { id: "b-1.3", title: "1.3 Running TypeScript", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.3 Running TypeScript.md" },
        { id: "b-1.4", title: "1.4 ES Modules in Node", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.4 ES Modules in Node.md" },
        { id: "b-1.5", title: "1.5 Backend TypeScript", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.5 Backend TypeScript.md" },
        { id: "b-1.6", title: "1.6 Async Code", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.6 Async Code.md" },
        { id: "b-1.7", title: "1.7 The Event Loop in Practice", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.7 The Event Loop in Practice.md" },
        { id: "b-1.8", title: "1.8 Time", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.8 Time.md" },
        { id: "b-1.9", title: "1.9 Files and Paths", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.9 Files and Paths.md" },
        { id: "b-1.10", title: "1.10 Streams", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.10 Streams.md" },
        { id: "b-1.11", title: "1.11 process", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.11 process.md" },
        { id: "b-1.12", title: "1.12 Environment Variables", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.12 Environment Variables.md" },
        { id: "b-1.13", title: "1.13 Errors", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.13 Errors.md" },
        { id: "b-1.14", title: "1.14 npm in Depth", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.14 npm in Depth.md" },
        { id: "b-1.15", title: "1.15 Debugging", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.15 Debugging.md" },
        { id: "b-1.16", title: "1.16 Code Quality", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.16 Code Quality.md" },
        { id: "b-1.17", title: "1.17 Project - Log Analyzer CLI", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.17 Project - Log Analyzer CLI.md" },
        { id: "b-1.18", title: "1.18 Bridge - Raw Node to React and Next.js", path: "docs/coding/Backend (PERN)/Batch 1 - Node.js and TypeScript Foundations/1.18 Bridge - Raw Node to React and Next.js.md" },
      ],
    },
  ],
};
