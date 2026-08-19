import type { Subject } from "../coding-data";

export const dsaSubject: Subject = {
  id: "dsa",
  title: "DSA",
  description: "Data Structures & Algorithms — from basics to interview-ready",
  lectures: [
    {
      id: "dsa-roadmap",
      title: "📋 DSA Course Roadmap",
      path: "docs/coding/DSA/roadmap.md",
    },
    {
      id: "dsa-questions",
      title: "📝 Full Question Bank",
      path: "docs/coding/DSA/quesitons.md",
    },
  ],
  phases: [
    {
      id: "phase1",
      title: "Phase 1 — Foundations",
      openByDefault: true,
      lectures: [
        {
          id: "dsa-1.1",
          title: "1.1 Time Complexity",
          path: "docs/coding/DSA/Phase 1 - Foundations/1.1 Time Complexity.md",
        },
        {
          id: "dsa-1.2",
          title: "1.2 Space Complexity",
          path: "docs/coding/DSA/Phase 1 - Foundations/1.2 Space Complexity.md",
        },
        {
          id: "dsa-1.3",
          title: "1.3 Arrays",
          path: "docs/coding/DSA/Phase 1 - Foundations/1.3 Arrays.md",
        },
        {
          id: "dsa-1.3.1",
          title: "1.3.1 Arrays — Solved Problems: Find Max & Min",
          path: "docs/coding/DSA/Phase 1 - Foundations/1.3.1 Find Maximum & Minimum.md",
        },
        {
          id: "dsa-1.3.2",
          title: "1.3.2 Arrays — Solved Problems: Rotate Array",
          path: "docs/coding/DSA/Phase 1 - Foundations/1.3.2 Rotate Array.md",
        },
        {
          id: "dsa-1.4",
          title: "1.4 Two Pointers",
          path: "docs/coding/DSA/Phase 1 - Foundations/1.4 Two Pointers.md",
        },
        {
          id: "dsa-1.4.1",
          title: "1.4.1 Two Pointers — Solved Problems: Move Zeroes",
          path: "docs/coding/DSA/Phase 1 - Foundations/1.4.1 Move Zeroes to End.md",
        },
        {
          id: "dsa-1.4.2",
          title: "1.4.2 Two Pointers — Solved Problems: Reverse an Array",
          path: "docs/coding/DSA/Phase 1 - Foundations/1.4.2 Reverse an Array.md",
        },
      ],
    },
  ],
};
