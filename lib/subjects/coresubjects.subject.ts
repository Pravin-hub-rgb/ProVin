import type { Subject } from "../coding-data";

export const coreSubjectsSubject: Subject = {
  id: "coresubjects",
  title: "Core Subjects",
  description: "DBMS, Computer Networks, OOP & Operating Systems — CS fundamentals for interviews & real-world dev",
  lectures: [
    {
      id: "cs-roadmap",
      title: "📋 Core Subjects Roadmap",
      path: "docs/coding/Core Subjects/Core Subjects Roadmap.md",
    },
  ],
  phases: [
    {
      id: "cs-batch1",
      title: "Batch 1 — DBMS",
      openByDefault: true,
      lectures: [
        {
          id: "cs-1.0",
          title: "1.0 DBMS — Kya Seekhenge",
          path: "docs/coding/Core Subjects/Batch 1 - DBMS/1.0 DBMS — Kya Seekhenge.md",
        },
        {
          id: "cs-1.1",
          title: "1.1 DBMS vs RDBMS + Keys",
          path: "docs/coding/Core Subjects/Batch 1 - DBMS/1.1 DBMS vs RDBMS + Keys.md",
        },
        {
          id: "cs-1.2",
          title: "1.2 Normalization (1NF, 2NF, 3NF, BCNF)",
          path: "docs/coding/Core Subjects/Batch 1 - DBMS/1.2 Normalization (1NF, 2NF, 3NF, BCNF).md",
        },
        {
          id: "cs-1.3",
          title: "1.3 Joins (INNER, LEFT, RIGHT, FULL, SELF)",
          path: "docs/coding/Core Subjects/Batch 1 - DBMS/1.3 Joins (INNER, LEFT, RIGHT, FULL, SELF).md",
        },
        {
          id: "cs-1.4",
          title: "1.4 Indexing — Fast Lookup Ka Raaz",
          path: "docs/coding/Core Subjects/Batch 1 - DBMS/1.4 Indexing — Fast Lookup Ka Raaz.md",
        },
        {
          id: "cs-1.5",
          title: "1.5 Transactions + ACID",
          path: "docs/coding/Core Subjects/Batch 1 - DBMS/1.5 Transactions + ACID.md",
        },
        {
          id: "cs-1.6",
          title: "1.6 SQL vs NoSQL",
          path: "docs/coding/Core Subjects/Batch 1 - DBMS/1.6 SQL vs NoSQL.md",
        },
      ],
    },
    {
      id: "cs-batch2",
      title: "Batch 2 — Computer Networks",
      lectures: [
        {
          id: "cs-2.0",
          title: "2.0 CN — Kya Seekhenge",
          path: "docs/coding/Core Subjects/Batch 2 - Computer Networks/2.0 CN — Kya Seekhenge.md",
        },
        {
          id: "cs-2.1",
          title: "2.1 OSI Model — 7 Layers Ka Architecture",
          path: "docs/coding/Core Subjects/Batch 2 - Computer Networks/2.1 OSI Model — 7 Layers Ka Architecture.md",
        },
        {
          id: "cs-2.2",
          title: "2.2 TCP vs UDP",
          path: "docs/coding/Core Subjects/Batch 2 - Computer Networks/2.2 TCP vs UDP.md",
        },
        {
          id: "cs-2.3",
          title: "2.3 HTTP vs HTTPS + SSL-TLS",
          path: "docs/coding/Core Subjects/Batch 2 - Computer Networks/2.3 HTTP vs HTTPS + SSL-TLS.md",
        },
        {
          id: "cs-2.4",
          title: "2.4 DNS — Domain se IP Tak Ka Safar",
          path: "docs/coding/Core Subjects/Batch 2 - Computer Networks/2.4 DNS — Domain se IP Tak Ka Safar.md",
        },
        {
          id: "cs-2.5",
          title: "2.5 REST API + HTTP Methods + Status Codes",
          path: "docs/coding/Core Subjects/Batch 2 - Computer Networks/2.5 REST API + HTTP Methods + Status Codes.md",
        },
        {
          id: "cs-2.6",
          title: "2.6 WebSockets — Real-Time Connection",
          path: "docs/coding/Core Subjects/Batch 2 - Computer Networks/2.6 WebSockets — Real-Time Connection.md",
        },
      ],
    },
    {
      id: "cs-batch3",
      title: "Batch 3 — OOP",
      lectures: [
        {
          id: "cs-3.0",
          title: "3.0 OOP — Kya Seekhenge",
          path: "docs/coding/Core Subjects/Batch 3 - OOP/3.0 OOP — Kya Seekhenge.md",
        },
        {
          id: "cs-3.1",
          title: "3.1 Class vs Object",
          path: "docs/coding/Core Subjects/Batch 3 - OOP/3.1 Class vs Object.md",
        },
        {
          id: "cs-3.2",
          title: "3.2 Encapsulation + Access Modifiers",
          path: "docs/coding/Core Subjects/Batch 3 - OOP/3.2 Encapsulation + Access Modifiers.md",
        },
        {
          id: "cs-3.3",
          title: "3.3 Inheritance + super()",
          path: "docs/coding/Core Subjects/Batch 3 - OOP/3.3 Inheritance + super().md",
        },
        {
          id: "cs-3.4",
          title: "3.4 Polymorphism — Overriding vs Overloading",
          path: "docs/coding/Core Subjects/Batch 3 - OOP/3.4 Polymorphism — Overriding vs Overloading.md",
        },
        {
          id: "cs-3.5",
          title: "3.5 Abstraction — Abstract Classes vs Interfaces",
          path: "docs/coding/Core Subjects/Batch 3 - OOP/3.5 Abstraction — Abstract Classes vs Interfaces.md",
        },
        {
          id: "cs-3.6",
          title: "3.6 SOLID Principles",
          path: "docs/coding/Core Subjects/Batch 3 - OOP/3.6 SOLID Principles.md",
        },
      ],
    },
    {
      id: "cs-batch4",
      title: "Batch 4 — Operating Systems",
      lectures: [
        {
          id: "cs-4.0",
          title: "4.0 OS — Kya Seekhenge",
          path: "docs/coding/Core Subjects/Batch 4 - Operating Systems/4.0 OS — Kya Seekhenge.md",
        },
        {
          id: "cs-4.1",
          title: "4.1 Process vs Thread",
          path: "docs/coding/Core Subjects/Batch 4 - Operating Systems/4.1 Process vs Thread.md",
        },
        {
          id: "cs-4.2",
          title: "4.2 Deadlock — 4 Conditions",
          path: "docs/coding/Core Subjects/Batch 4 - Operating Systems/4.2 Deadlock — 4 Conditions.md",
        },
        {
          id: "cs-4.3",
          title: "4.3 Memory Management Basics",
          path: "docs/coding/Core Subjects/Batch 4 - Operating Systems/4.3 Memory Management Basics.md",
        },
        {
          id: "cs-4.4",
          title: "4.4 Process States + Context Switching",
          path: "docs/coding/Core Subjects/Batch 4 - Operating Systems/4.4 Process States + Context Switching.md",
        },
        {
          id: "cs-4.5",
          title: "4.5 CPU Scheduling Algorithms",
          path: "docs/coding/Core Subjects/Batch 4 - Operating Systems/4.5 CPU Scheduling Algorithms.md",
        },
      ],
    },
  ],
};
