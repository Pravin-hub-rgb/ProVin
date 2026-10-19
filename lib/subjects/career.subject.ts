import type { Subject } from "../coding-data";

export const careerSubject: Subject = {
  id: "career",
  title: "Career & Interview Sprint",
  description:
    "3-week fullstack job sprint — day-by-day plan, TradeStack interview defense, resume draft. React/Next revision + DSA + applications.",
  lectures: [],
  phases: [
    {
      id: "career-sprint",
      title: "3-Week Job Sprint",
      openByDefault: true,
      lectures: [
        {
          id: "career-sprint-plan",
          title: "COMEBACK Sprint - 3 Weeks, 12 Hours/Day (Day-by-Day Checklist)",
          path: "docs/coding/Career/COMEBACK-SPRINT-3-WEEKS.md",
        },
        {
          id: "career-defense-kit",
          title: "TradeStack Defense Kit - Python Backend Interview Defense",
          path: "docs/coding/Career/TRADESTACK-DEFENSE-KIT.md",
        },
        {
          id: "career-resume",
          title: "Resume Draft - DukaanOS + TradeStack (STAR Bullets)",
          path: "docs/coding/Career/RESUME-DRAFT.md",
        },
      ],
    },
  ],
};