import type { Subject } from "../coding-data";

export const agenticaiProSubject: Subject = {
  id: "agenticai-pro",
  title: "Agentic AI — Production & Frameworks",
  description:
    "Python me production-grade agentic AI: LangChain, LangGraph, RAG, Guardrails, Evaluation, LLM Gateways — zero se production tak",
  lectures: [
    {
      id: "course-structure",
      title: "📋 Full Course Structure",
      path: "docs/coding/Agentic AI Production/Agentic AI Production - Course Roadmap.md",
    },
  ],
  phases: [
    {
      id: "phase1",
      title: "Phase 1 — LangChain",
      openByDefault: true,
      lectures: [
        {
          id: "ai-1.1",
          title: "1.1 Why Frameworks?",
          path: "docs/coding/Agentic AI Production/Phase 1 - LangChain/1.1 Why Frameworks.md",
        },
        {
          id: "ai-1.2",
          title: "1.2 Your First LangChain Call",
          path: "docs/coding/Agentic AI Production/Phase 1 - LangChain/1.2 Your First LangChain Call.md",
        },
        {
          id: "ai-1.3",
          title: "1.3 Messages & Prompts",
          path: "docs/coding/Agentic AI Production/Phase 1 - LangChain/1.3 Messages & Prompts.md",
        },
        {
          id: "ai-1.4",
          title: "1.4 Structured Output",
          path: "docs/coding/Agentic AI Production/Phase 1 - LangChain/1.4 Structured Output.md",
        },
        {
          id: "ai-1.5",
          title: "1.5 Tools & Tool Calling",
          path: "docs/coding/Agentic AI Production/Phase 1 - LangChain/1.5 Tools & Tool Calling.md",
        },
        {
          id: "ai-1.6",
          title: "1.6 Streaming",
          path: "docs/coding/Agentic AI Production/Phase 1 - LangChain/1.6 Streaming.md",
        },
        {
          id: "ai-1.7",
          title: "1.7 Short-Term Memory",
          path: "docs/coding/Agentic AI Production/Phase 1 - LangChain/1.7 Short-Term Memory.md",
        },
        {
          id: "ai-1.8",
          title: "1.8 Middleware",
          path: "docs/coding/Agentic AI Production/Phase 1 - LangChain/1.8 Middleware.md",
        },
      ],
    },
    {
      id: "phase2",
      title: "Phase 2 — LangGraph",
      lectures: [
        {
          id: "ai-2.1",
          title: "2.1 Graphs: State, Nodes, Edges",
          path: "docs/coding/Agentic AI Production/Phase 2 - LangGraph/2.1 Graphs State Nodes Edges.md",
        },
        {
          id: "ai-2.2",
          title: "2.2 Your First LangGraph Chatbot",
          path: "docs/coding/Agentic AI Production/Phase 2 - LangGraph/2.2 Your First LangGraph Chatbot.md",
        },
        {
          id: "ai-2.3",
          title: "2.3 Adding Tools & the ReAct Agent",
          path: "docs/coding/Agentic AI Production/Phase 2 - LangGraph/2.3 Adding Tools & the ReAct Agent.md",
        },
        {
          id: "ai-2.4",
          title: "2.4 Memory & Checkpointers",
          path: "docs/coding/Agentic AI Production/Phase 2 - LangGraph/2.4 Memory & Checkpointers.md",
        },
        {
          id: "ai-2.5",
          title: "2.5 Human-in-the-Loop",
          path: "docs/coding/Agentic AI Production/Phase 2 - LangGraph/2.5 Human-in-the-Loop.md",
        },
        {
          id: "ai-2.6",
          title: "2.6 Streaming in LangGraph",
          path: "docs/coding/Agentic AI Production/Phase 2 - LangGraph/2.6 Streaming in LangGraph.md",
        },
        {
          id: "ai-2.7",
          title: "2.7 MCP from Scratch",
          path: "docs/coding/Agentic AI Production/Phase 2 - LangGraph/2.7 MCP from Scratch.md",
        },
        {
          id: "ai-2.8",
          title: "2.8 Multi-Agent Systems",
          path: "docs/coding/Agentic AI Production/Phase 2 - LangGraph/2.8 Multi-Agent Systems.md",
        },
        {
          id: "ai-2.9",
          title: "2.9 Functional API",
          path: "docs/coding/Agentic AI Production/Phase 2 - LangGraph/2.9 Functional API.md",
        },
        {
          id: "ai-2.10",
          title: "2.10 LangSmith & LangGraph Studio",
          path: "docs/coding/Agentic AI Production/Phase 2 - LangGraph/2.10 LangSmith & LangGraph Studio.md",
        },
        {
          id: "ai-2.11",
          title: "2.11 Deployment & LLMOps",
          path: "docs/coding/Agentic AI Production/Phase 2 - LangGraph/2.11 Deployment & LLMOps.md",
        },
      ],
    },
    {
      id: "phase3",
      title: "Phase 3 — RAG Deep Dive",
      lectures: [
        {
          id: "ai-3.1",
          title: "3.1 RAG from the Ground Up",
          path: "docs/coding/Agentic AI Production/Phase 3 - RAG Deep Dive/3.1 RAG from the Ground Up.md",
        },
        {
          id: "ai-3.2",
          title: "3.2 Chunking Strategies",
          path: "docs/coding/Agentic AI Production/Phase 3 - RAG Deep Dive/3.2 Chunking Strategies.md",
        },
        {
          id: "ai-3.3",
          title: "3.3 Embeddings",
          path: "docs/coding/Agentic AI Production/Phase 3 - RAG Deep Dive/3.3 Embeddings.md",
        },
        {
          id: "ai-3.4",
          title: "3.4 Vector Stores & Retrieval",
          path: "docs/coding/Agentic AI Production/Phase 3 - RAG Deep Dive/3.4 Vector Stores & Retrieval.md",
        },
        {
          id: "ai-3.5",
          title: "3.5 The Full RAG Pipeline",
          path: "docs/coding/Agentic AI Production/Phase 3 - RAG Deep Dive/3.5 The Full RAG Pipeline.md",
        },
        {
          id: "ai-3.6",
          title: "3.6 Modular RAG for Production",
          path: "docs/coding/Agentic AI Production/Phase 3 - RAG Deep Dive/3.6 Modular RAG for Production.md",
        },
        {
          id: "ai-3.7",
          title: "3.7 Agentic RAG",
          path: "docs/coding/Agentic AI Production/Phase 3 - RAG Deep Dive/3.7 Agentic RAG.md",
        },
      ],
    },
  ],
};
