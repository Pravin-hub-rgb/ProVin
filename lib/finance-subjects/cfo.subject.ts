import type { Subject } from "../finance-data";

export const cfoSubject: Subject = {
  id: "cfo",
  title: "CFO Mindset",
  description: "Complete financial literacy, accounting and business finance for developers",
  lectures: [
    {
      id: "basics",
      title: "📚 Finance Foundation Basics",
      path: "docs/finance/CFO/basics.md",
    },
    {
      id: "roadmap",
      title: "📋 CFO Complete Roadmap",
      path: "docs/finance/CFO/roadmap.md",
    },
    {
      id: "guide",
      title: "📖 CFO Quick Start Guide",
      path: "docs/finance/CFO/guide.md",
    },
  ],
  phases: [
  ],
};