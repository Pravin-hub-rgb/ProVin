# Agentic AI — Course Roadmap

**From zero to building: understand AI agents, build them with real APIs, and deploy multi-step reasoning pipelines.**

---

## What You'll Be Able to Do After This Course

You'll confidently say on your resume and LinkedIn:
> "I understand Agentic AI architecture and have built agents using real APIs, tool calling, and multi-step reasoning pipelines."

---

## Prerequisites

- Basic JavaScript (variables, functions, async/await)
- Used an AI coding tool before (Cline, opencode, Cursor, etc.)
- No ML or AI background needed — we start from zero

---

## Course Map — 7 Phases

### Phase 1 — How AI Models Actually Work
Understand what happens under the hood when you send a message to any AI. No math — just the mental model.

- What a language model actually is (and isn't)
- Tokens, context windows, and why models "forget"
- How an API call travels from your code to the model and back
- Temperature, randomness, and when to use each

### Phase 2 — What Makes an AI "Agentic"
Learn the difference between a chatbot and an agent, and the core loop that powers every agent.

- Chatbot vs agent — the fundamental difference
- The ReAct pattern: Think → Act → Observe
- Types of actions agents can take
- How agents plan and break down goals

### Phase 3 — Your First Real API Call
Make your first API call to a real AI model and see the raw response. The magic disappears — in a good way.

- Setting up Node.js with the Anthropic SDK
- Your first "Hello World" API call
- Understanding the messages array and roles
- Reading the raw response (tokens, stop reason, etc.)
- Handling errors

### Phase 4 — Tool Calling: The Heart of Agents
Understand how agents actually *do* things. This is how Cline, opencode, and every agent reads your files and runs commands.

- What tool calling is and why it matters
- Defining tools with JSON schemas
- Building a calculator agent from scratch
- Multiple tools and chaining
- The complete tool calling loop

### Phase 5 — Memory and Context Management
Learn why agents forget things and how to make them remember.

- The stateless model problem
- Four types of memory in agents
- Managing conversation history
- Writing effective system prompts
- RAG concept — giving agents a search engine over your documents

### Phase 6 — Building Real Agents: 3 Projects
Build three working agents of increasing complexity.

- **Weather Agent** — calls a real weather API and returns human-friendly answers
- **File Summarizer Agent** — reads files from your computer and summarizes them
- **Research Agent** — searches the web multiple times and synthesizes a report

### Phase 7 — The Bigger Picture
Connect everything to the broader ecosystem.

- Agentic AI frameworks (LangChain, LangGraph, CrewAI, AutoGen)
- MCP servers — the universal plug for AI tools
- Multi-agent systems
- Vector databases and memory at scale
- Encoder-free architecture — how models are evolving
- Where Agentic AI is headed
- What to write on LinkedIn and your resume

---

## Suggested Study Schedule

| Week | What to Do |
|------|-----------|
| Week 1 | Phase 1 + Phase 2 — read, understand, explain back to yourself |
| Week 2 | Phase 3 — make your first API call. Don't skip this. |
| Week 3 | Phase 4 — build the calculator agent. Get the loop working. |
| Week 4 | Phase 5 — read conceptually, no project needed |
| Week 5-6 | Phase 6 — build all 3 projects. One per week is fine. |
| Week 7 | Phase 7 — read and connect the dots |
| After | Write your first LinkedIn post about what you built |

---

## How to Use This Course

1. **Go phase by phase.** Each phase builds on the previous one. Don't skip.
2. **Read each topic file** in order within a phase.
3. **Do the "In Your Own Words" exercises** at the end of each file — they're open-ended questions to confirm you understood.
4. **Code along with Phase 3 and 4** — open your editor and type the examples yourself.
5. **Build the Phase 6 projects** — these are real Next.js apps, not toy examples.
6. **Start every session with the question:** "What did I learn last time?"

One rule: don't just read. Type the code, answer the questions, build the projects. That's where the learning happens.
