import type { Subject } from "../coding-data";

export const typescriptSubject: Subject = {
  id: "typescript",
  title: "TypeScript",
  description: "Type safe JavaScript — from basics to advanced patterns",
  lectures: [],
  phases: [
    {
      id: "phase1",
      title: "Phase 1 — Core Types & Basics",
      openByDefault: true,
      lectures: [
        {
          id: "ts-1.5",
          title: "1.5 Utility Types — Record, Pick, Omit, Partial, and More",
          path: "docs/coding/TypeScript/Phase 1 - Core Types & Basics/1.5 Utility Types.md",
        },
      ],
    },
  ],
};