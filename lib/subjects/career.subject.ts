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
      lectures: [
        {
          id: "career-lab-c",
          title: "Lab C — Simulated Feed + State Machine (TypeScript)",
          path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/README.md",
        },
      ],
    },
  ],
};
