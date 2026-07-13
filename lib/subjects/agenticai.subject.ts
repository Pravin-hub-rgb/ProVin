import type { Subject } from "../coding-data";

export const agenticaiSubject: Subject = {
  id: "agenticai",
  title: "Agentic AI",
  description: "From zero to building AI agents — understand, build, and deploy agentic systems",
  lectures: [
    {
      id: "course-structure",
      title: "📋 Full Course Structure",
      path: "docs/coding/Agentic AI/Agentic AI - Course Roadmap.md",
    },
  ],
  phases: [
    {
      id: "phase1",
      title: "Phase 1 — How AI Models Actually Work",
      openByDefault: true,
      lectures: [
        {
          id: "ai-1.1",
          title: "1.1 What is a Language Model?",
          path: "docs/coding/Agentic AI/Phase 1 - How AI Models Actually Work/1.1 What is a Language Model.md",
        },
        {
          id: "ai-1.2",
          title: "1.2 Tokens: What They Actually Are",
          path: "docs/coding/Agentic AI/Phase 1 - How AI Models Actually Work/1.2 Tokens.md",
        },
        {
          id: "ai-1.3",
          title: "1.3 Context Window: The Model's Working Memory",
          path: "docs/coding/Agentic AI/Phase 1 - How AI Models Actually Work/1.3 Context Window.md",
        },
        {
          id: "ai-1.4",
          title: "1.4 How a Request Actually Travels (API Flow)",
          path: "docs/coding/Agentic AI/Phase 1 - How AI Models Actually Work/1.4 How a Request Actually Travels.md",
        },
        {
          id: "ai-1.5",
          title: "1.5 Temperature and Randomness",
          path: "docs/coding/Agentic AI/Phase 1 - How AI Models Actually Work/1.5 Temperature and Randomness.md",
        },
      ],
    },
    {
      id: "phase2",
      title: "Phase 2 — What Makes an AI \"Agentic\"",
      openByDefault: false,
      lectures: [
        {
          id: "ai-2.1",
          title: "2.1 Chatbot vs Agent: The Core Difference",
          path: "docs/coding/Agentic AI/Phase 2 - What Makes an AI Agentic/2.1 Chatbot vs Agent.md",
        },
        {
          id: "ai-2.2",
          title: "2.2 The Agent Loop (ReAct Pattern)",
          path: "docs/coding/Agentic AI/Phase 2 - What Makes an AI Agentic/2.2 The Agent Loop.md",
        },
        {
          id: "ai-2.3",
          title: "2.3 What Agents Can Do (Types of Actions)",
          path: "docs/coding/Agentic AI/Phase 2 - What Makes an AI Agentic/2.3 What Agents Can Do.md",
        },
        {
          id: "ai-2.4",
          title: "2.4 Planning: How Agents Break Down Goals",
          path: "docs/coding/Agentic AI/Phase 2 - What Makes an AI Agentic/2.4 Planning.md",
        },
        {
          id: "ai-2.5",
          title: "2.5 Where Agents Live Today",
          path: "docs/coding/Agentic AI/Phase 2 - What Makes an AI Agentic/2.5 Where Agents Live Today.md",
        },
      ],
    },
    {
      id: "phase3",
      title: "Phase 3 — Your First Real API Call",
      openByDefault: false,
      lectures: [
        {
          id: "ai-3.1",
          title: "3.1 Setting Up",
          path: "docs/coding/Agentic AI/Phase 3 - Your First Real API Call/3.1 Setting Up.md",
        },
        {
          id: "ai-3.2",
          title: "3.2 Hello World — Your First API Call",
          path: "docs/coding/Agentic AI/Phase 3 - Your First Real API Call/3.2 Hello World.md",
        },
        {
          id: "ai-3.3",
          title: "3.3 The Messages Array",
          path: "docs/coding/Agentic AI/Phase 3 - Your First Real API Call/3.3 The Messages Array.md",
        },
        {
          id: "ai-3.4",
          title: "3.4 Reading the Raw Response",
          path: "docs/coding/Agentic AI/Phase 3 - Your First Real API Call/3.4 Reading the Raw Response.md",
        },
        {
          id: "ai-3.5",
          title: "3.5 Handling Errors",
          path: "docs/coding/Agentic AI/Phase 3 - Your First Real API Call/3.5 Handling Errors.md",
        },
      ],
    },
    {
      id: "phase4",
      title: "Phase 4 — Tool Calling: The Heart of Agents",
      openByDefault: false,
      lectures: [
        {
          id: "ai-4.1",
          title: "4.1 What Tool Calling Actually Is",
          path: "docs/coding/Agentic AI/Phase 4 - Tool Calling - The Heart of Agents/4.1 What Tool Calling Actually Is.md",
        },
        {
          id: "ai-4.2",
          title: "4.2 Defining Tools",
          path: "docs/coding/Agentic AI/Phase 4 - Tool Calling - The Heart of Agents/4.2 Defining Tools.md",
        },
        {
          id: "ai-4.3",
          title: "4.3 Building a Calculator Agent",
          path: "docs/coding/Agentic AI/Phase 4 - Tool Calling - The Heart of Agents/4.3 Calculator Agent.md",
        },
        {
          id: "ai-4.4",
          title: "4.4 Multiple Tools",
          path: "docs/coding/Agentic AI/Phase 4 - Tool Calling - The Heart of Agents/4.4 Multiple Tools.md",
        },
        {
          id: "ai-4.5",
          title: "4.5 The Tool Calling Loop in Code",
          path: "docs/coding/Agentic AI/Phase 4 - Tool Calling - The Heart of Agents/4.5 The Tool Calling Loop.md",
        },
      ],
    },
    {
      id: "phase5",
      title: "Phase 5 — Memory and Context Management",
      openByDefault: false,
      lectures: [
        {
          id: "ai-5.1",
          title: "5.1 The Problem with Stateless Models",
          path: "docs/coding/Agentic AI/Phase 5 - Memory and Context Management/5.1 The Problem with Stateless Models.md",
        },
        {
          id: "ai-5.2",
          title: "5.2 Four Types of Memory in Agents",
          path: "docs/coding/Agentic AI/Phase 5 - Memory and Context Management/5.2 Four Types of Memory in Agents.md",
        },
        {
          id: "ai-5.3",
          title: "5.3 Conversation History Management",
          path: "docs/coding/Agentic AI/Phase 5 - Memory and Context Management/5.3 Conversation History Management.md",
        },
        {
          id: "ai-5.4",
          title: "5.4 System Prompts — The Agent's Instructions",
          path: "docs/coding/Agentic AI/Phase 5 - Memory and Context Management/5.4 Giving Agents a System Prompt.md",
        },
        {
          id: "ai-5.5",
          title: "5.5 RAG (Retrieval Augmented Generation) — Concept",
          path: "docs/coding/Agentic AI/Phase 5 - Memory and Context Management/5.5 RAG Concept.md",
        },
      ],
    },
    {
      id: "phase6",
      title: "Phase 6 — Building Real Agents: 3 Projects",
      openByDefault: false,
      lectures: [
        {
          id: "ai-6.1",
          title: "6.1 Project 1: Weather Agent",
          path: "docs/coding/Agentic AI/Phase 6 - Building Real Agents - 3 Projects/6.1 Weather Agent.md",
        },
        {
          id: "ai-6.2",
          title: "6.2 Project 2: File Summarizer Agent",
          path: "docs/coding/Agentic AI/Phase 6 - Building Real Agents - 3 Projects/6.2 File Summarizer Agent.md",
        },
        {
          id: "ai-6.3",
          title: "6.3 Project 3: Research Agent",
          path: "docs/coding/Agentic AI/Phase 6 - Building Real Agents - 3 Projects/6.3 Research Agent.md",
        },
      ],
    },
    {
      id: "phase7",
      title: "Phase 7 — The Bigger Picture",
      openByDefault: false,
      lectures: [
        {
          id: "ai-7.1",
          title: "7.1 Agentic AI Frameworks",
          path: "docs/coding/Agentic AI/Phase 7 - The Bigger Picture/7.1 Agentic AI Frameworks.md",
        },
        {
          id: "ai-7.2",
          title: "7.2 MCP Servers (Model Context Protocol)",
          path: "docs/coding/Agentic AI/Phase 7 - The Bigger Picture/7.2 MCP Servers.md",
        },
        {
          id: "ai-7.3",
          title: "7.3 Multi-Agent Systems",
          path: "docs/coding/Agentic AI/Phase 7 - The Bigger Picture/7.3 Multi-Agent Systems.md",
        },
        {
          id: "ai-7.4",
          title: "7.4 Agent Memory at Scale (Vector Databases)",
          path: "docs/coding/Agentic AI/Phase 7 - The Bigger Picture/7.4 Vector Databases.md",
        },
        {
          id: "ai-7.5",
          title: "7.5 Where This Is All Going",
          path: "docs/coding/Agentic AI/Phase 7 - The Bigger Picture/7.5 Where This Is All Going.md",
        },
        {
          id: "ai-7.6",
          title: "7.6 What to Write on LinkedIn / Resume",
          path: "docs/coding/Agentic AI/Phase 7 - The Bigger Picture/7.6 LinkedIn and Resume.md",
        },
      ],
    },
  ],
};
