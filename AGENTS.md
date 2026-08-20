# AGENTS.md — Writing Rules & Style Guide for Course Content

This file contains the rules and conventions for creating and editing course content for Vin's learning platform. Read this before creating or editing any course file.

> Full detailed version: `docs/coding/AGENTIC-AI-WRITING-RULES.md`

---

## Core Rules (Summary)

### 1. How to Open a Topic
- Start with something the reader has experienced (phone predictive text, restaurant menu, etc.)
- Connect that familiar thing to the concept you're teaching
- Build up from familiar to technical
- THEN introduce the heading

### 2. Natural Flow
- Every file connects to the previous one
- First sentence references something specific from the last file
- Last file in a phase bridges to the next phase
- **No out-of-the-blue structured blocks.** Every section must flow as connected prose: definition → process/steps → "yeh kis content ke liye sahi hai" (use-cases woven into sentences) → fayda/nuksaan derived naturally. Never drop a sudden `Kab:` / `Examples:` / `Pros:` / `Cons:` bullet list without transitional sentences connecting it to the paragraph above.
- Concepts are explained one-by-one first; the compare/contrast table comes LAST, after each concept is already clear.

### 3. Handling Future Concepts
- If you mention something not yet taught, say: "We'll explore this in detail in the next topic"
- Give a simple working definition for now

### 4. "In Your Own Words" Section
- 3-5 questions that ONLY ask about what was taught in that file
- Every question has a hidden sample answer using HTML `<details>` accordion
- Questions test understanding, not memorization

### 5. Writing Style
- Conversational, like a senior dev to a junior
- No jargon without immediate explanation
- Use analogies generously
- Technical explanation first, then analogy to reinforce
- Include a "What It Is NOT" section to clarify misconceptions

### 6. Code Examples
- JavaScript (Node.js) for concepts, Next.js for projects
- Complete and runnable, not pseudocode
- Explain every line

> **Exception — Agentic AI Production course:** `docs/coding/Agentic AI Production/` uses **Python** (LangChain, LangGraph, RAG are Python-native). Same writing rules apply, but code is Python 3 — complete, runnable, with `pip`/`uv` install commands and every line explained. The ultra-simple "gadhe ko bhi samajh aa jaye" tone (zero assumed knowledge, short chunks, simple analogies, repetition) is mandatory there.

For the complete detailed rules, read `docs/coding/AGENTIC-AI-WRITING-RULES.md`.
