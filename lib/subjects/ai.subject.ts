import type { Subject } from "../coding-data";

export const aiFoundationSubject: Subject = {
  id: "aifoundation",
  title: "AI Foundation",
  description: "From zero AI knowledge to the full picture — the vocabulary, the map, and how LLMs, RAG, and agents actually fit together",
  lectures: [
    {
      id: "aif-roadmap",
      title: "📋 Course Roadmap & Syllabus",
      path: "docs/coding/AI/AI Foundation - Course Roadmap.md",
    },
  ],
  phases: [
    {
      id: "aif-phase1",
      title: "Phase 1 — AI Foundations: The Map",
      openByDefault: true,
      lectures: [
        {
          id: "aif-1.1",
          title: "1.1 What Is AI",
          path: "docs/coding/AI/Phase 1 - AI Foundations/1.1 What Is AI.md",
        },
        {
          id: "aif-1.2",
          title: "1.2 The Machine Learning Flow",
          path: "docs/coding/AI/Phase 1 - AI Foundations/1.2 The Machine Learning Flow.md",
        },
        {
          id: "aif-1.3",
          title: "1.3 The Map of AI",
          path: "docs/coding/AI/Phase 1 - AI Foundations/1.3 The Map of AI.md",
        },
        {
          id: "aif-1.4",
          title: "1.4 Inside Generative AI",
          path: "docs/coding/AI/Phase 1 - AI Foundations/1.4 Inside Generative AI.md",
        },
        {
          id: "aif-1.5",
          title: "1.5 Chatbots, Agents and Applications",
          path: "docs/coding/AI/Phase 1 - AI Foundations/1.5 Chatbots, Agents and Applications.md",
        },
      ],
    },
    {
      id: "aif-phase2",
      title: "Phase 2 — Inside the Building: LLM, Limits & Orchestration",
      openByDefault: false,
      lectures: [
        {
          id: "aif-2.1",
          title: "2.1 The LLM Up Close",
          path: "docs/coding/AI/Phase 2 - Inside the Building/2.1 The LLM Up Close.md",
        },
        {
          id: "aif-2.2",
          title: "2.2 Three Limits of an LLM on Its Own",
          path: "docs/coding/AI/Phase 2 - Inside the Building/2.2 Three Limits of an LLM on Its Own.md",
        },
        {
          id: "aif-2.3",
          title: "2.3 The Three Floors and the Controller",
          path: "docs/coding/AI/Phase 2 - Inside the Building/2.3 The Three Floors and the Controller.md",
        },
        {
          id: "aif-2.4",
          title: "2.4 RAG — The Fetcher",
          path: "docs/coding/AI/Phase 2 - Inside the Building/2.4 RAG — The Fetcher.md",
        },
        {
          id: "aif-2.5",
          title: "2.5 Embeddings and Vector Databases",
          path: "docs/coding/AI/Phase 2 - Inside the Building/2.5 Embeddings and Vector Databases.md",
        },
        {
          id: "aif-2.6",
          title: "2.6 LangChain and LangGraph",
          path: "docs/coding/AI/Phase 2 - Inside the Building/2.6 LangChain and LangGraph.md",
        },
      ],
    },
  ],
};
