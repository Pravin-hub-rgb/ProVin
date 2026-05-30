import type { Subject } from "../coding-data";

export const iknowcomputersSubject: Subject = {
  id: "iknowcomputers",
  title: "I Know Computers",
  description: "Office computer skills — Hinglish mein, beginner to job-ready",
  lectures: [
    {
      id: "course-structure",
      title: "📋 Full Course Structure",
      path: "docs/coding/i-know-computers/course-structure.md",
    },
  ],
  phases: [
    {
      id: "module0",
      title: "Module 0 — History & How Computers Work",
      openByDefault: true,
      lectures: [
        {
          id: "ikc-0.1",
          title: "0.1 Computer Ka Itihaas",
          path: "docs/coding/i-know-computers/Module 0 - History & How Computers Work/0.1 Computer Ka Itihaas.md",
        },
        {
          id: "ikc-0.2",
          title: "0.2 Computer Ke Parts — Hardware",
          path: "docs/coding/i-know-computers/Module 0 - History & How Computers Work/0.2 Computer Ke Parts Hardware.md",
        },
        {
          id: "ikc-0.3",
          title: "0.3 Software aur Operating System",
          path: "docs/coding/i-know-computers/Module 0 - History & How Computers Work/0.3 Software aur Operating System.md",
        },
      ],
    },
    {
      id: "module1",
      title: "Module 1 — OS, Files, Folders & Shortcuts",
      openByDefault: true,
      lectures: [
        {
          id: "ikc-1.1",
          title: "1.1 Files aur Folders",
          path: "docs/coding/i-know-computers/Module 1 - OS, Files, Folders & Shortcuts/1.1 Files aur Folders.md",
        },
        {
          id: "ikc-1.2",
          title: "1.2 File Operations",
          path: "docs/coding/i-know-computers/Module 1 - OS, Files, Folders & Shortcuts/1.2 File Operations.md",
        },
        {
          id: "ikc-1.3",
          title: "1.3 Keyboard Shortcuts",
          path: "docs/coding/i-know-computers/Module 1 - OS, Files, Folders & Shortcuts/1.3 Keyboard Shortcuts.md",
        },
      ],
    },
  ],
};
