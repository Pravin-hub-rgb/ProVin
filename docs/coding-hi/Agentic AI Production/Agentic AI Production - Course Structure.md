# Agentic AI — Production & Frameworks — Course Structure Document
### For: Vin (Vinowski)
### Purpose: Advanced course after "Agentic AI — Introduction". Self-study + interview confidence + handoff to AI for module generation.

---

## Instructions for the AI generating modules from this document

- Vin already completed the **"Agentic AI — Introduction"** course (7 phases + AI News Aggregator capstone) in JavaScript/Node.js. That course taught the concepts from scratch: language models, tokens, context window, tool calling, memory, RAG concept. **This Production course uses Python and real frameworks** (LangChain, LangGraph) — the ones companies actually use.
- Vin is a self-taught "vibe coder" based in India. He understands the *shape* of how things work but has no formal CS/ML background. He knows JavaScript well but is **not yet fluent in Python** — treat Python syntax like a new language he's learning.
- **MOST IMPORTANT RULE — THE "GADHE KO BHI SAMAJH AA JAYE" STYLE:**
  - Teach like the reader has never heard this topic before. Zero assumed knowledge.
  - Explain every single line of code. If a code block has 5 lines, explain all 5 lines.
  - Define every term the moment you introduce it — in the same sentence.
  - Use extremely simple, everyday analogies (phone, kitchen, shop, train, school).
  - Short paragraphs. Short sentences. No walls of text. No fluff.
  - If a concept needs 3 sentences, don't stretch it to 3 paragraphs.
  - Repeat the important idea 2-3 times in different words. Repetition is learning.
  - Assume Vin has never installed Python, never used `pip`, never seen a Python `class`. Walk through everything from zero.
- **Code language:** Python. Keep code short, complete, and runnable. Not pseudocode.
- **Tone:** Like a patient senior dev explaining to a complete beginner. Friendly, encouraging, no judgment.
- Each module must end with an **"In Your Own Words"** section — 3-5 open-ended questions (no multiple choice), each with a hidden sample answer in HTML `<details>` accordion.
- Follow the full writing rules from `docs/coding/AGENTIC-AI-WRITING-RULES.md` (familiar-to-technical opening, "What It Is NOT" section, analogies, natural flow between files).
- Every new term: define it immediately. Don't assume Vin knows it.
- Bridge from the Introduction course: "In the Introduction course you built the agent loop from scratch. Now we use a framework that does it for you."

---

## Course Title: Agentic AI — Production & Frameworks

**Goal after completing this course:**
Vin can confidently say on LinkedIn and his resume:
> "I have production-grade agentic AI skills: I've built agents with LangChain and LangGraph, implemented RAG pipelines, added guardrails and LLM evaluation, and used LLM gateways — all in Python."

**Prerequisites:** Completed "Agentic AI — Introduction" (or equivalent understanding). Basic JavaScript knowledge. No Python experience needed — the course teaches it.

---

## Course Map (9 Phases)

```
Phase 1  → LangChain (Ch2 of the 10-hour transcript)
Phase 2  → LangGraph (Ch3)
Phase 3  → RAG Deep Dive (Ch4)
Phase 4  → Vectorless RAG (Ch5)
Phase 5  → Deep Agents (Ch6)
Phase 6  → Guardrails (Ch7)
Phase 7  → LLM Evaluation (Ch8)
Phase 8  → LLM Gateways (Ch9)
Phase 9  → Capstone: Deep Research Agent (combines everything)
```

Each phase maps to a chapter of `docs/coding/Agentic AI/10 hours course transcript.md`. Read the matching chapter while writing that phase so no topic is missed.

---

## Phase 1: LangChain

**Goal:** Vin learns the most popular AI framework and its core building blocks, in Python.

### Topics:

**1.1 — Why Frameworks? (Bridge from Introduction course)**
- Recap: in the Introduction course he built the tool-calling loop from scratch in JS
- Now: production teams use frameworks so they don't rebuild that loop every time
- Analogy: framework = prefabricated house kit vs building bricks one by one
- First Python setup: install Python, explain `pip`, introduce `uv` (the fast package manager used in the transcript)
- Create a virtual environment, `uv add langchain`, first `requirements.txt`

**1.2 — Your First LangChain Call**
- `init_chat_model()` and how it loads a model by name string (e.g., Google Gemini, OpenAI)
- Also show the direct class way: `ChatOpenAI(...)`
- Get an API key, put it in a `.env`, use `python-dotenv`
- Explain every line: imports, client, invoke, print output
- Show the raw response object vs just the text

**1.3 — Messages & Prompts**
- The message types: SystemMessage, HumanMessage, AIMessage, ToolMessage
- What each role means (bridge: he learned roles in the Intro course)
- How to build a conversation by passing a list of messages
- Prompt templates: putting variables into prompts safely

**1.4 — Structured Output**
- Why: you often want the model to return data in a fixed format (JSON), not prose
- Three ways in LangChain: Pydantic class, TypedDict, dataclass
- Show the same example in all three, explain each
- Why this matters for agents (a function needs a fixed shape, not an essay)

**1.5 — Tools & Tool Calling**
- Define a Python function (e.g., a calculator, get the current date)
- `@tool` decorator — turning a normal function into a tool the model can call
- `bind_tools()` and `model.invoke()` — see the model ask for a tool
- The message loop: model asks for tool → we run it → send result back as ToolMessage
- Bridge: this is the same loop he built from scratch in the Intro course

**1.6 — Streaming**
- Why streaming: users see text as it's generated (typing effect), feels faster
- `model.stream()` — iterate over chunks of output
- Show the difference between waiting for the whole answer vs streaming chunks

**1.7 — Short-Term Memory**
- The stateless problem recap (from Intro course 5.1)
- `InMemoryChatMessageHistory` — a simple object that stores conversation
- How to attach history to a model call
- Note: this is in-memory, so it resets when the program restarts (that's fine for now)

**1.8 — Middleware**
- What middleware is: extra logic wrapped around a model call (like airport security checking every passenger)
- Built-in middlewares: logging, retries (when API fails, try again), fallbacks (primary model down → backup), rate limits, guardrails, PII detection
- Custom middleware: write a simple one (e.g., log every request)
- Explain each with a tiny runnable example

---

## Phase 2: LangGraph

**Goal:** Vin builds agents as graphs — the standard for production agentic apps.

### Topics:

**2.1 — Graphs: State, Nodes, Edges**
- What a graph is: a map of steps (nodes) and connections between them (edges)
- Analogy: a board game — squares are nodes, arrows between them are edges
- What State is: a shared bag of information every node can read/write
- Why this beats a linear loop: you can branch, loop, and run things in parallel
- `StateGraph` API — the skeleton

**2.2 — Your First LangGraph Chatbot**
- Build the simplest graph: start → chatbot node → end
- Define the State, the node function, compile the graph
- Run it with user input
- Explain every line — this is the "hello world" of LangGraph

**2.3 — Adding Tools & the ReAct Agent**
- Add a tool node to the graph
- `create_react_agent()` — the built-in Think→Act→Observe loop (he knows ReAct from the Intro course!)
- How the agent loop works inside the graph: LLM decides → calls tool → sees result → decides again

**2.4 — Memory & Checkpointers**
- Why a fresh graph call forgets everything
- Checkpointer = a "save game" for the graph state
- `MemorySaver` — save state so the next call continues the conversation
- How this is different from the LangChain in-memory history from Phase 1

**2.5 — Human-in-the-Loop**
- Sometimes an agent must stop and ask a human before continuing
- Analogy: an intern who checks with the boss before spending money
- `interrupt()` — pause the graph, wait for approval, resume
- Use case: reviewing an agent's action before it executes

**2.6 — Streaming in LangGraph**
- `stream_mode="messages"` — stream tokens as they're generated
- Also stream each step of the graph (see the agent think, then act)
- Show the debug value: watching the agent's process in real time

**2.7 — MCP from Scratch**
- Recap MCP concept from Intro course 7.2 (USB for AI tools)
- Build a simple MCP server in Python — expose a tool over MCP
- Connect a LangGraph agent to it
- Show how MCP standardizes tools so any compatible agent can use them

**2.8 — Multi-Agent Systems**
- One graph with multiple agents, each with a job
- Example: a Writer agent and a Reviewer agent that hand work to each other
- How state flows between agents
- Bridge: he saw the concept in Intro course 7.3 — now it's real code

**2.9 — Functional API**
- LangGraph's simpler alternative to writing graph classes
- Write the same chatbot with plain functions
- When to use the Functional API vs the StateGraph API

**2.10 — LangSmith & LangGraph Studio**
- LangSmith: a cloud tool to trace, debug, and evaluate agent runs (shows the whole flow step by step)
- LangGraph Studio: a visual editor where you click through your graph
- Set up, run the chatbot, look at the trace
- Why this matters: when an agent does something wrong, you can see exactly where

**2.11 — Deployment & LLMOps (from transcript Ch3 Part 3)**
- LLMOps = the ops side of LLM apps: tracking, monitoring, evaluating in production
- Track metrics with MLflow
- Visualize reports with Grafana
- Deploy a LangGraph app to HuggingFace Spaces
- Concept + setup level — complete working examples, not just slides

---

## Phase 3: RAG Deep Dive

**Goal:** Vin builds a full, production-style RAG pipeline in Python. (He learned RAG as a concept in Intro course 5.5 — now he builds it for real.)

### Topics:

**3.1 — RAG from the Ground Up**
- Recap: the model doesn't know your private documents
- RAG = give the model the right part of your document before it answers
- The 5-step pipeline overview: load → split → embed → store → retrieve → generate
- Analogy: a library — you don't hand the librarian the whole library, just the right book

**3.2 — Chunking Strategies**
- Why split documents: a model can't read a whole book in one go
- What a chunk is, what chunk size and overlap mean
- Fixed-size splitting vs recursive splitting
- Show how different chunk sizes change retrieval quality

**3.3 — Embeddings**
- What an embedding is: turning text into a list of numbers (a vector) that captures meaning
- Analogy: a zip code that tells you *where* the meaning lives
- Load an embedding model (`all-MiniLM-L6-v2`, 384 dimensions from the transcript)
- Show text → vector, and how similar text gets similar vectors

**3.4 — Vector Stores & Retrieval**
- A vector store (Chroma/FAISS) is a database that stores these number-lists
- How similarity search works: find the vectors closest to your question's vector
- `similarity_search()` — ask "which stored pieces are closest to my question?"
- Show how retrieved chunks come back with their text

**3.5 — The Full RAG Pipeline**
- Put it all together: load a PDF → chunk → embed → store → retrieve → generate an answer
- The retrieval prompt: "Answer using ONLY this context"
- Complete runnable example, every line explained
- Show a wrong-answer vs right-answer comparison to prove RAG works

**3.6 — Modular RAG for Production**
- Why production code isn't one big script
- Split into classes (EmbeddingManager, VectorStore, Retriever, Generator) — as done in the transcript
- How each class has one job and connects to the others
- This is the architecture you'll reuse in the capstone

**3.7 — Agentic RAG**
- The limit of simple RAG: one search, one answer
- Agentic RAG = the LLM decides how to search (rewrite the query, search multiple times, decide when it has enough)
- Bridge: you already know the agent loop — now it wraps the RAG tools
- Show a small agent with retrieval as a tool

---

## Phase 4: Vectorless RAG

**Goal:** Vin learns the newest RAG approach that skips vector databases entirely.

### Topics:

**4.1 — What Is Vectorless RAG**
- The problem vector RAG solves vs its costs (storage, tuning, complexity)
- Vectorless RAG: use the model's own reasoning over the whole document instead of pre-embedding everything
- Real example: Vectify.ai / pageindex.ai (the tool shown in the transcript)
- Analogy: instead of tagging every book and putting them in a special shelf, read the books on demand

**4.2 — Traditional vs Vectorless RAG**
- Side-by-side comparison: when each shines, when each breaks
- Vector RAG: fast, needs setup, great for huge static document sets
- Vectorless RAG: less setup, works well for smaller/complex documents, slower per query
- Table comparing both (after both are clearly explained)

**4.3 — Building a Vectorless RAG App**
- Follow the transcript's line-by-line approach
- Show how a query triggers reading + reasoning over documents without embeddings
- Complete runnable example with explanation

---

## Phase 5: Deep Agents

**Goal:** Vin understands what makes an agent "deep" vs "shallow" and builds a deep agent.

### Topics:

**5.1 — Shallow vs Deep Agents**
- Shallow agent recap: one query → maybe one tool call → answer (the simple loop from the Intro course)
- Why shallow agents fail on complex tasks (can't decompose, limited context)
- Deep agent: plans first, delegates, uses files, keeps context
- Analogy: shallow = a fast-food worker taking one order; deep = a chef planning a full menu

**5.2 — Deep Research Agents in the Wild**
- Study real products: ChatGPT deep research, Claude Code, Manus AI
- What each does step by step and why they work
- This makes the concept concrete — Vin uses these tools daily

**5.3 — The 4 Components of a Deep Agent**
- From the transcript: **planning tool, sub-agents, system prompt, file system**
- Planning tool: turning a goal into a to-do list (Claude Code's planner)
- Sub-agents: small specialized agents that report back
- System prompt: the agent's personality and rules (show Claude Code's real system prompt)
- File system: reading/writing files, saving intermediate work

**5.4 — Build Your Own Deep Agent**
- Build a simple deep agent: plan → delegate to sub-agents → collect → write result to a file
- Complete runnable example with every line explained
- This is the stepping stone to the capstone

---

## Phase 6: Guardrails

**Goal:** Vin learns to keep AI agents safe — what goes in and what comes out.

### Topics:

**6.1 — What Are Guardrails**
- Definition: safety mechanisms that control what enters and leaves an AI agent
- Three jobs: only safe inputs, only approved actions, only valid outputs
- Analogy: airport security — checks every passenger and every bag before they board
- Why agents (which act, not just talk) need this even more than chatbots

**6.2 — Input Guardrails**
- Blocking dangerous or inappropriate prompts before they reach the model
- Example: "how to hack a server" should be flagged before the model even sees it
- Implement with LangChain middleware: a prompt guardrail
- Show the pattern: check input → allow or reject

**6.3 — Output Guardrails**
- Validating what the model produces before showing it to the user
- Check format (is it valid JSON? does it match the schema?)
- Check content (did it leak a banned topic? did it refuse a safe question?)
- Implement output validation with a runnable example

**6.4 — Project: Guarded Healthcare Chatbot (mini-project)**
- The transcript's real-world example
- Build a small chatbot with input guardrail (no harmful medical advice) + output guardrail (validated answers)
- Combine middleware properly — see the whole flow end to end
- Small project, fully runnable

---

## Phase 7: LLM Evaluation

**Goal:** Vin learns how to test whether a chatbot, RAG app, or agent is actually good.

### Topics:

**7.1 — Why Evaluate**
- The problem: an LLM app "works" in demos but breaks in production
- You can't ship "it feels okay" — you need numbers
- The 4 approaches overview (the transcript's framework): AI judge, gold standard, functional tests, human evaluation
- Analogy: a restaurant that only tastes good to the chef — you need customer ratings

**7.2 — AI Judge Evaluation**
- Use one LLM to grade another LLM's answer
- Write a grading prompt, get a score
- When this works and when it's biased (an AI judging an AI)
- Runnable example

**7.3 — Gold Standard & Functional Tests**
- Gold standard: a fixed set of questions with known-good answers; compare model output against them
- Functional tests: check the *shape* of output (does it contain the required fields? is the JSON valid?)
- Runnable examples for both

**7.4 — Human Evaluation & Regression Testing**
- When humans must grade (nuance, tone, safety)
- Regression testing: re-run old tests after changes to catch regressions
- Why this is a continuous practice, not a one-time thing

**7.5 — LangSmith Hands-On**
- Run evaluations inside LangSmith (it's built for this)
- Create a dataset, run an eval, read the report
- See the agent's full trace while evaluating
- This connects Phase 2 (LangSmith) with evaluation

---

## Phase 8: LLM Gateways

**Goal:** Vin learns the layer companies put in front of all their LLM calls.

### Topics:

**8.1 — The Multi-Provider Problem**
- Real scenario: a company uses OpenAI for one app, Gemini for another, Anthropic for a third
- Each has its own SDK and code — maintenance nightmare
- One provider goes down (real example: the OpenAI outage of Nov 2023) → all apps break
- Analogy: one wall socket type per country vs a universal adapter

**8.2 — What Is an LLM Gateway**
- A gateway = one single API layer in front of all LLM providers
- Your app talks to the gateway; the gateway talks to OpenAI/Gemini/Anthropic
- Benefits: one codebase, easy provider switching, central cost control
- Introduce LiteLLM (the open-source gateway used in the transcript)

**8.3 — Fallback & Routing**
- Fallback: if the primary model fails, automatically try the backup
- Routing: send cheap simple requests to a cheap model, complex ones to a smart model
- Runnable LiteLLM examples for both

**8.4 — Cost Tracking & Caching**
- Cost tracking: LiteLLM calculates the price of every call automatically
- Caching: similar requests return the stored answer instead of paying again
- Runnable examples (completion_cost, cache setup as in the transcript)

**8.5 — Observability & Rate Limits**
- Observability: logging every call, seeing who spends what, dashboards
- Rate limits: controlling how many calls per user/project
- Wrap up the gateway story and how it fits a production stack

---

## Phase 9: Capstone — Deep Research Agent

**Goal:** Vin builds his show-piece project — combining LangGraph, RAG, guardrails, and evaluation.

### Project spec

A deep research agent where the user gives a topic and the agent delivers a researched, structured report.

**Architecture (multi-agent graph):**
```
User topic
  → Guardrail (input check)
  → Planner agent (breaks topic into sub-questions / to-do list)
  → Researcher agent (searches web + queries a RAG index of documents)
  → Writer agent (turns findings into a structured report)
  → Reviewer agent (checks report against a rubric; may send back to Writer)
  → Guardrail (output validation)
  → Final report saved to a file
```

**What it exercises:** LangGraph (Phase 2), RAG (Phase 3), deep-agent components (Phase 5), guardrails (Phase 6), and evaluation of the final output (Phase 7). Optional: route LLM calls through a gateway (Phase 8).

**Topics:**

**9.1 — Capstone Overview & Setup**
- What we're building, the full diagram, the folder structure
- Project scaffold: create the Python project, install all dependencies
- Data prep: a folder of documents to index for RAG

**9.2 — Building the Planner**
- The first graph node: turn "research X" into a plan
- Structured output: the plan comes back as a fixed list of tasks

**9.3 — Building the Researcher (RAG + Web Search)**
- The RAG index from Phase 3 wired in as a tool
- A web-search tool added beside it
- The researcher decides how many searches and which sources to use

**9.4 — Building the Writer & Reviewer Loop**
- Writer produces a structured report from the research
- Reviewer grades it against a rubric (this is AI-judge evaluation!)
- The loop: if the report fails the rubric, it goes back to the Writer (max 2 tries)

**9.5 — Adding Guardrails**
- Input guardrail on the user's topic (reject unsafe topics)
- Output guardrail on the final report (validate structure and content)
- Wire them into the graph as pre/post steps

**9.6 — Evaluation, Deployment & Share**
- Run a small evaluation set through LangSmith and show the report
- Save results to files; add a simple CLI or web UI
- Deploy to HuggingFace Spaces
- What to write on LinkedIn: the exact post structure from Intro course 7.7, updated with this project

---

## Suggested Study Schedule

| Week | What to Do |
|------|-----------|
| Week 1 | Phase 1 — LangChain. Type every example. Get comfortable with Python. |
| Week 2 | Phase 2 — LangGraph. Build the chatbot, then add tools. |
| Week 3 | Phase 2 (rest) + start Phase 3 — memory, MCP, then RAG pipeline. |
| Week 4 | Phase 3 + Phase 4 — finish RAG, vectorless RAG. |
| Week 5 | Phase 5 + Phase 6 — deep agents, guardrails. |
| Week 6 | Phase 7 + Phase 8 — evaluation, gateways. |
| Week 7-8 | Phase 9 — build the capstone. One file at a time. |

Rule from the Introduction course still applies: don't just read. Type the code, run it, break it, fix it.

---

## Notes for AI Generating the Modules

- One file per topic, named `{Phase}.{TopicNumber} {Topic Name}.md` (same pattern as the Introduction course).
- Files stored in `docs/coding/Agentic AI Production/Phase {N} - {Phase Name}/`.
- Source of truth for content: the matching chapter of `docs/coding/Agentic AI/10 hours course transcript.md`. Read the full chapter before writing the phase.
- Code: Python 3, complete and runnable. Include `uv add <package>` or `pip install` commands. Explain every line.
- Use `python-dotenv` for API keys. Never hardcode keys.
- When a concept was already taught in the Introduction course, reference it: "In the Introduction course you learned X. Here's X in Python/framework form." Don't re-teach from zero, but DO give a one-line recap.
- Every module ends with "In Your Own Words" — 3-5 open-ended questions with hidden sample answers in `<details>` accordions.
- Analogies: use them constantly. The simpler, the better.
- THE STYLE IS ULTRA-SIMPLE. When in doubt, explain more simply, not more technically. A concept is not finished until a beginner could follow it.
- Do not write a table of contents at the start of each module — just dive in.
- After each phase, register the new lectures in `lib/subjects/agenticai-pro.subject.ts` (the subject id is `agenticai-pro`).