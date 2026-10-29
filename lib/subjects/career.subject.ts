import type { Subject } from "../coding-data";

export const careerSubject: Subject = {
  id: "career",
  title: "Career & Interview",
  description:
    "Time-free fullstack job plan — milestone ladder, hands-on concept labs, TradeStack + DukaanOS AI interview defense, resume draft.",
  lectures: [],
  phases: [
    {
      id: "career-map",
      title: "Career Master Map",
      openByDefault: true,
      lectures: [
        {
          id: "career-master-map",
          title: "READ ME First — Master Map & Decision Log",
          path: "docs/coding/Career/README.md",
        },
        {
          id: "career-focus-plan",
          title: "CAREER FOCUS PLAN — Milestone Ladder (M0-M13, Labs A-D)",
          path: "docs/coding/Career/CAREER-FOCUS-PLAN.md",
        },
        {
          id: "career-defense-kit",
          title: "TradeStack Defense Kit - Python Backend Interview Defense",
          path: "docs/coding/Career/TRADESTACK-DEFENSE-KIT.md",
        },
        {
          id: "career-ai-defense-kit",
          title: "DukaanOS AI Defense Kit - Voice Billing Interview Defense",
          path: "docs/coding/Career/DUKAANOS-AI-DEFENSE-KIT.md",
        },
        {
          id: "career-resume",
          title: "Resume Draft - DukaanOS + TradeStack (STAR Bullets)",
          path: "docs/coding/Career/RESUME-DRAFT.md",
        },
      ],
    },
    {
      id: "career-ground-floor-labs",
      title: "Ground-Floor Labs",
      openByDefault: false,
      lectures: [],
      groups: [
        {
          id: "career-lab-c-group",
          title: "Lab C — Simulated Feed + State Machine (TypeScript)",
          openByDefault: false,
          lectures: [
            {
              id: "career-lab-c",
              title: "Read Me First",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/README.md",
            },
            {
              id: "career-lab-c-1",
              title: "1.0 TypeScript Basics",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/1.0 TypeScript Basics.md",
            },
            {
              id: "career-lab-c-2",
              title: "2.0 Timers & Event Loop",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/2.0 Timers and Event Loop.md",
            },
            {
              id: "career-lab-c-3",
              title: "3.0 useReducer = State Machine",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/3.0 useReducer equals State Machine.md",
            },
            {
              id: "career-lab-c-4",
              title: "4.0 Build feed.ts",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/4.0 Build feed.ts.md",
            },
            {
              id: "career-lab-c-5",
              title: "5.0 Build machine.ts",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/5.0 Build machine.ts.md",
            },
            {
              id: "career-lab-c-6",
              title: "6.0 Build index.ts + Explain",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/6.0 Build index.ts + Explain.md",
            },
          ],
        },
      ],
    },
  ],
};
