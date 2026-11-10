import type { Subject } from "../coding-data";

export const systemDesignSubject: Subject = {
  id: "systemdesign",
  title: "System Design",
  description: "System Design from zero — the whole picture first, deep dives later",
  lectures: [
    {
      id: "systemdesign-plan",
      title: "📋 System Design Course Plan",
      path: "docs/coding/System Design/00 Course Plan.md",
    },
  ],
  phases: [
    {
      id: "batch1",
      title: "Batch 1 — The Whole Premise",
      openByDefault: true,
      lectures: [
        {
          id: "sd-1.1",
          title: "1.1 What is System Design",
          path: "docs/coding/System Design/1.1 What is System Design.md",
        },
        {
          id: "sd-1.2",
          title: "1.2 The Journey of One Order",
          path: "docs/coding/System Design/1.2 The Journey of One Order.md",
        },
        {
          id: "sd-1.3",
          title: "1.3 DNS + Load Balancer",
          path: "docs/coding/System Design/1.3 DNS + Load Balancer.md",
        },
        {
          id: "sd-1.4",
          title: "1.4 PostgreSQL — The Source of Truth",
          path: "docs/coding/System Design/1.4 PostgreSQL — The Source of Truth.md",
        },
        {
          id: "sd-1.5",
          title: "1.5 Redis — Caching",
          path: "docs/coding/System Design/1.5 Redis — Caching.md",
        },
        {
          id: "sd-1.6",
          title: "1.6 OpenSearch — Search",
          path: "docs/coding/System Design/1.6 OpenSearch — Search.md",
        },
        {
          id: "sd-1.7",
          title: "1.7 S3 — Files",
          path: "docs/coding/System Design/1.7 S3 — Files.md",
        },
        {
          id: "sd-1.8",
          title: "1.8 Queues + Workers",
          path: "docs/coding/System Design/1.8 Queues + Workers.md",
        },
        {
          id: "sd-1.9",
          title: "1.9 How Code Reaches Production",
          path: "docs/coding/System Design/1.9 How Code Reaches Production.md",
        },
        {
          id: "sd-1.10",
          title: "1.10 Observability",
          path: "docs/coding/System Design/1.10 Observability.md",
        },
        {
          id: "sd-1.11",
          title: "1.11 The Golden Rule",
          path: "docs/coding/System Design/1.11 The Golden Rule.md",
        },
      ],
    },
  ],
};
