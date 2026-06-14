# Agentic AI — Course Structure Document
### For: Vin (Vinowski)
### Purpose: Self-study + LinkedIn/Resume confidence + Handoff to AI for module generation

---

## Instructions for the AI generating modules from this document

- Vin is a self-taught "vibe coder" based in India. He has built real projects using AI coding agents (Cline, opencode and agens like deepseek flash v4, kwait-katcoder) and Python-based tools, but has not formally studied computer science or machine learning.
- He understands the *shape* of how things work but lacks vocabulary and a fully connected mental model.
- **Do NOT skip basics** even if they seem obvious. Treat every concept as needing a clear, fresh explanation. Vin may have partial knowledge — your job is to complete and solidify it.
- Tone: Conversational, practical, no fluff. Like a smart senior developer explaining to a junior. No jargon without immediate explanation.
- Each module must end with a **"In Your Own Words"** section — 3-5 questions Vin can answer to himself to confirm he understood. No multiple choice. Open-ended.
- Code examples must be in **JavaScript (Node.js)**. Keep them short and readable. Explain every line.
- Projects are built as **Next.js apps** — Vin is comfortable with Next.js and React, so use that as the project structure for Phase 6.
- For Phase 3 and 4 standalone examples, use plain Node.js scripts (no framework needed — just `.js` files run with `node`).
- Do not assume Vin has used any API directly in code before. Walk through it from scratch.

---

## Course Title: Agentic AI — From Zero to Building

**Goal after completing this course:**
Vin can confidently say on LinkedIn and his resume:
> "I understand Agentic AI architecture and have built agents using real APIs, tool calling, and multi-step reasoning pipelines."

---

## Course Map (7 Phases)

```
Phase 1 → How AI Models Actually Work (foundation vocabulary)
Phase 2 → What Makes an AI "Agentic" (the core idea)
Phase 3 → Your First Real API Call (hands-on, breaks the magic)
Phase 4 → Tool Calling — The Heart of Agents (how agents act)
Phase 5 → Memory and Context Management (how agents remember)
Phase 6 → Building Real Agents — 3 Projects (practical)
Phase 7 → The Bigger Picture — MCP, Frameworks, Ecosystem (connect the dots)
```

---

## Phase 1: How AI Models Actually Work

**Goal:** Vin understands what's happening under the hood when he sends a message to any AI. No ML math — just the conceptual model.

### Topics to cover:

**1.1 — What is a Language Model?**
- What it is: a model trained on text that predicts the next most likely token
- What it is NOT: it does not "think" or "understand" the way humans do
- The key insight: everything it does comes from pattern recognition at massive scale
- Analogy to use: autocomplete on steroids, trained on the entire internet

**1.2 — Tokens: What They Actually Are**
- Definition: the smallest unit of text the model processes
- Not exactly words — sub-word chunks (explain with examples: "running" might be one token, "unbelievable" might be two)
- Why this matters: models have a token limit (context window), and everything costs tokens
- Practical feel: roughly 1 token ≈ 0.75 words in English. 1000 tokens ≈ 750 words.
- Show a real example: tokenize a sentence manually and show token count

**1.3 — Context Window: The Model's Working Memory**
- Definition: the total amount of text the model can "see" at once
- Includes: system prompt + conversation history + any files/docs you feed it + its own responses
- When context fills up: older content gets dropped or the model gets confused
- Why Cline sometimes "forgets" something from earlier in a long session — this is why
- Different models have different context sizes: give examples (Claude Sonnet, GPT-4, Gemini)

**1.4 — How a Request Actually Travels (API Flow)**
- Step by step: your text → tokenized → sent to server via HTTP API request → model processes entire context → generates response tokens one by one → response sent back → your software receives it and displays/uses it
- What an API is: a door to a model sitting on someone else's server
- Why you need an API key: authentication, billing, rate limits
- The request has structure: model name, messages array, max tokens, temperature — explain each simply

**1.5 — Temperature and Randomness**
- What temperature does: controls how "creative" vs "deterministic" the output is
- Low temperature (0-0.3): consistent, predictable — good for code, data tasks
- High temperature (0.7-1.0): more creative, varied — good for writing, brainstorming
- Why agents usually use low temperature

---

## Phase 2: What Makes an AI "Agentic"

**Goal:** Vin understands the clear difference between a chatbot and an agent, and can explain this to anyone.

### Topics to cover:

**2.1 — Chatbot vs Agent: The Core Difference**
- Chatbot: one input → one output. Passive. Waits for you.
- Agent: one goal → multiple steps → multiple actions → result. Active. Works until done.
- Analogy: chatbot is a vending machine (you press, it gives). Agent is an intern (you assign, it figures out how).

**2.2 — The Agent Loop (ReAct Pattern)**
- The fundamental loop every agent runs:
  ```
  Think → Act → Observe → Think → Act → Observe → ... → Done
  ```
- "Think": model reasons about what to do next
- "Act": model calls a tool or takes an action
- "Observe": model reads the result of that action
- This loop repeats until the goal is achieved
- Cline does exactly this — show how Vin's experience maps to this loop

**2.3 — What Agents Can Do (Types of Actions)**
- Read/write files
- Search the web
- Run code
- Call APIs
- Click on web pages (browser agents)
- Talk to databases
- Call other AI models
- These are all just "tools" — explain the concept of a tool as a capability the agent can invoke

**2.4 — Planning: How Agents Break Down Goals**
- Simple agents: just react step by step
- More advanced: first make a plan (list of steps), then execute
- Example: "Build me a landing page" → agent plans: create folder → write HTML → write CSS → add content → test → done
- Vin has seen this in Cline — connect the dots

**2.5 — Where Agents Live Today**
- Coding agents: Cline, Cursor, Kodu, Devin
- Research agents: Perplexity, Claude's research mode
- Browser agents: Claude in Chrome, Operator (OpenAI)
- Business agents: agents that manage emails, CRM, tasks
- The trend: agents are moving from demos to real production use in 2024-2025

---

## Phase 3: Your First Real API Call

**Goal:** Vin makes an actual API call in Python and sees the raw response. The magic disappears — in a good way.

### Topics to cover:

**3.1 — Setting Up**
- Getting an Anthropic API key (or OpenAI — pick one and stay consistent; recommend Anthropic since Vin uses Claude)
- Installing the SDK: `npm install @anthropic-ai/sdk`
- Setting up a basic Node.js project: `npm init -y`, create `index.js`, run with `node index.js`
- Using a `.env` file for the API key + `dotenv` package — never hardcode keys
- What an SDK is vs raw HTTP call — SDK is just a wrapper that makes it cleaner

**3.2 — Your First Call — Hello World**
```javascript
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const message = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "Say hello in 10 words." }
  ],
});

console.log(message.content[0].text);
```
- Explain every single line
- Show what the full response object looks like (not just the text)
- Show token usage in the response

**3.3 — The Messages Array**
- Why it's an array: conversation history
- Role: "user" vs "assistant"
- How to build a multi-turn conversation manually
- System prompt: what it is, how to add it, why it matters

**3.4 — Reading the Raw Response**
- Show the full JSON response structure
- Where is the text? Where are the token counts? Where is the stop reason?
- This demystifies what Cline/Kodu are doing behind the scenes

**3.5 — Handling Errors**
- What happens when API key is wrong
- What happens when you hit rate limits
- Basic try/catch wrapper in JavaScript

---

## Phase 4: Tool Calling — The Heart of Agents

**Goal:** Vin understands what tool calling is technically, implements it, and sees how Cline works under the hood.

### Topics to cover:

**4.1 — What Tool Calling Actually Is**
- The model cannot do anything on its own — it can only generate text
- Tool calling is when the model outputs a *structured instruction* instead of regular text
- Example: instead of saying "I'll read the file", it outputs: `{"tool": "read_file", "path": "index.js"}`
- The software (Cline) sees this, executes the action, sends the result back to the model
- The model then continues with that new information
- This is how Cline reads your files — it's not magic, it's this loop

**4.2 — Defining Tools**
- You define tools by telling the model: "these are the tools you have access to, here's what each does, here's what parameters they take"
- The model decides *when* to use a tool and *which* one
- Show a simple tool definition in the Anthropic SDK format

**4.3 — Building a Simple Tool: Calculator Agent**
```python
# A simple agent that can do math by calling a calculator tool
# Full working example with:
# - Tool definition
# - Tool execution
# - Sending result back to model
# - Getting final response
```
- Walk through the full loop step by step
- Show exactly what the model outputs when it decides to use a tool
- Show how you execute it and send results back

**4.4 — Multiple Tools**
- Agent with 2-3 tools: calculator + get_current_date + simple_search
- Model chooses which tool to call based on the task
- Show how it chains tool calls

**4.5 — The Tool Calling Loop in Code**
- Proper while loop that keeps running until the model stops calling tools
- This is the agent loop from Phase 2 — now in actual code

---

## Phase 5: Memory and Context Management

**Goal:** Vin understands the different types of memory agents use and why managing context is a real engineering challenge.

### Topics to cover:

**5.1 — The Problem with Stateless Models**
- Every API call starts fresh — the model has no memory by default
- If you want it to "remember" previous turns, you must send the history yourself
- This is why context management is a skill

**5.2 — Four Types of Memory in Agents**
- **In-context memory**: everything in the current context window — temporary, limited by token count
- **External memory (vector stores)**: storing info in a database, retrieving relevant pieces when needed — this is how agents "remember" things from past sessions
- **In-weights memory**: what the model learned during training — permanent, can't change at runtime
- **In-cache memory**: saved computation states — advanced, skip deep dive for now
- Focus on in-context and external memory as those are what builders work with

**5.3 — Conversation History Management**
- How to maintain history across multiple turns
- When to trim history (when context gets too long)
- Strategies: drop oldest, summarize old turns, keep only relevant parts

**5.4 — Giving Agents a "System Prompt"**
- The system prompt is like the agent's personality and instructions — it's always at the top of context
- How to write a good system prompt for an agent
- Examples: role definition, available tools, output format, constraints

**5.5 — RAG (Retrieval Augmented Generation) — Concept Only**
- The idea: instead of stuffing everything into context, store docs in a database and retrieve only the relevant parts when needed
- Like giving the agent a search engine over your own documents
- Why this matters: lets agents work with large knowledge bases that would never fit in context
- No deep implementation — just the mental model

---

## Phase 6: Building Real Agents — 3 Projects

**Goal:** Vin builds three real working agents of increasing complexity using the Anthropic API.

---

### Project 1: Weather Agent

**What it does:** User asks a weather question in natural language → agent calls a weather API → returns a human-friendly answer

**What Vin learns:**
- Calling a real external API from within an agent
- Defining a tool that wraps an API call
- Handling API responses and passing data to the model

**Stack:** Next.js + Anthropic SDK (`@anthropic-ai/sdk`) + OpenWeatherMap API (free tier)

**Project structure:**
```
weather-agent/
├── app/
│   ├── page.tsx          → simple chat UI (text input + response display)
│   └── api/
│       └── agent/
│           └── route.ts  → agent logic lives here (API route)
├── .env.local            → API keys
└── package.json
```

**Steps to cover:**
1. `npx create-next-app@latest weather-agent` — scaffold the project
2. Get OpenWeatherMap free API key
3. Write a `getWeather(city)` function in the API route
4. Define it as a tool for the Anthropic agent
5. Build the full agent loop inside the Next.js API route
6. Connect a simple frontend input in `page.tsx` that hits the API route
7. Test with: "What's the weather in Mumbai?" and "Should I carry an umbrella in Delhi tomorrow?"

**Full working code provided with line-by-line explanation**

---

### Project 2: File Summarizer Agent

**What it does:** Point the agent at a folder of `.txt` files → it reads each one → produces a summary of all of them

**What Vin learns:**
- File system tools (read_file, list_files)
- Multi-step planning (list files first, then read each, then summarize)
- How Cline-like tools work at the code level

**Stack:** Next.js + Anthropic SDK + Node.js `fs` module (built-in, no install needed)

**Project structure:**
```
file-summarizer-agent/
├── app/
│   ├── page.tsx          → UI with a "Summarize Notes" button + output display
│   └── api/
│       └── agent/
│           └── route.ts  → agent logic + file system tools
├── notes/                → folder of sample .txt files to summarize
├── .env.local
└── package.json
```

**Steps to cover:**
1. `npx create-next-app@latest file-summarizer-agent`
2. Create a `/notes` folder with 3-4 sample `.txt` files
3. Write `listFiles(folder)` and `readFile(path)` tools using Node.js `fs`
4. Build the agent loop in the API route
5. Give agent a goal: "Summarize all files in the /notes folder"
6. Watch it plan: list → read → read → read → summarize
7. Display the final summary in the browser

**Full working code provided with line-by-line explanation**

---

### Project 3: Simple Research Agent (with Web Search)

**What it does:** User gives a research topic → agent searches the web multiple times → synthesizes a short report

**What Vin learns:**
- Chaining multiple tool calls
- Agent deciding *how many* searches to run based on what it finds
- Structuring final output

**Stack:** Next.js + Anthropic SDK + Tavily API (free tier — best for AI agent use cases)

**Project structure:**
```
research-agent/
├── app/
│   ├── page.tsx          → UI with topic input + streaming or polled result display
│   └── api/
│       └── agent/
│           └── route.ts  → agent loop + web search tool
├── .env.local            → ANTHROPIC_API_KEY + TAVILY_API_KEY
└── package.json
```

**Steps to cover:**
1. `npx create-next-app@latest research-agent`
2. Sign up for Tavily free API key (tavily.com)
3. `npm install @tavily/core` and write a `webSearch(query)` tool wrapper
4. Build the agent loop — agent decides how many searches to run
5. Agent goal from UI: "Research the current state of AI agents and give me a 5-point summary"
6. Display the final report in the browser

**Full working code provided with line-by-line explanation**

---

## Phase 7: The Bigger Picture

**Goal:** Vin can place Agentic AI in the broader ecosystem and knows what connects to what.

### Topics to cover:

**7.1 — Agentic AI Frameworks**
- What frameworks are: pre-built scaffolding so you don't build the agent loop from scratch
- **LangChain**: the OG framework — tools, chains, memory, agents. Powerful but complex.
- **LangGraph**: builds on LangChain — lets you define agents as a *graph* of steps. Better for complex flows.
- **CrewAI**: multi-agent framework — define a "crew" of agents with roles that collaborate
- **AutoGen** (Microsoft): agents that talk to each other to solve problems
- When to use frameworks vs build from scratch: small projects = scratch, complex production = framework
- Vin's recommendation: understand scratch first (this course), then pick one framework to learn

**7.2 — MCP Servers (Model Context Protocol)**
- What MCP is: an open standard (by Anthropic) that lets AI models connect to external tools and data sources in a *standardized* way
- Before MCP: every tool integration was custom code — you had to write it yourself
- After MCP: tools expose themselves via MCP server → any compatible AI can connect and use them
- Think of it like USB for AI tools — one standard plug, works everywhere
- Real examples: there are MCP servers for GitHub, Slack, Notion, databases, file systems
- Cline supports MCP — that's why it can connect to so many things
- **Agentic AI vs MCP**: Agentic AI is the *concept* (AI that takes autonomous multi-step action). MCP is *infrastructure* (the standard way to give agents access to tools/data). They work together — MCP makes agentic AI more powerful and easier to build.

**7.3 — Multi-Agent Systems**
- Single agent: one model, one loop, one goal
- Multi-agent: multiple models, each with a role, working together
- Example: Orchestrator agent breaks down a big task → assigns sub-tasks to Researcher agent, Writer agent, Reviewer agent → collects results → combines
- Why: parallelism, specialization, handling tasks too big for one context window
- Real world: AutoGen, CrewAI, LangGraph all support this

**7.4 — Agent Memory at Scale (Vector Databases)**
- When external memory becomes necessary
- What a vector database is: stores text as mathematical representations (embeddings) so you can search by *meaning* not just keywords
- Examples: Pinecone, Chroma, Weaviate
- How agents use it: before answering, search the vector DB for relevant past info → pull it into context
- This is how AI tools "remember" your past projects across sessions

**7.5 — Where This Is All Going**
- Agents moving from single-task to long-horizon (multi-day tasks)
- Computer-use agents (can see and click on screen)
- Agents with persistent memory across sessions becoming standard
- The shift: from AI as a chatbot to AI as a co-worker
- What this means for someone like Vin: the ability to build *with* agents (not just use them) is a real, marketable skill right now

**7.6 — What to Write on LinkedIn / Resume**
- Terms you can now use with confidence and explain:
  - Agentic AI / AI Agents
  - Tool Calling / Function Calling
  - Context Window Management
  - ReAct Pattern (Reasoning + Acting)
  - Multi-step AI pipelines
  - MCP (Model Context Protocol)
  - RAG (Retrieval Augmented Generation) — conceptual
  - Prompt Engineering for Agents
- Sample LinkedIn post structure: "I just built X. Here's how it works. Here's what I learned." — always more credible than theory posts.

---

## Suggested Study Order

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

## Notes for AI Generating the Modules

- Each phase should be its own separate markdown file: `phase-1.md`, `phase-2.md`, etc.
- Each file should be thorough and self-contained — Vin should be able to read it without referring to other files
- Code examples: complete and runnable, not pseudocode. If a package is needed, include the `npm install` command.
- Phase 3 and 4 code: plain Node.js scripts (`.js` files, run with `node index.js`). No framework needed for learning the basics.
- Phase 6 projects: full Next.js apps with proper folder structure as specified. Agent logic always goes in a Next.js API route (`app/api/.../route.ts`). UI in `page.tsx`.
- Every new term: define it immediately when first introduced. Don't assume Vin knows it.
- Analogies: use them generously. Real-world comparisons help Vin's learning style.
- End every phase with "In Your Own Words" — 3-5 open questions for self-check
- Tone: like a knowledgeable friend, not a textbook. Casual but accurate.
- Do not write a table of contents at the start of each module — just dive in.