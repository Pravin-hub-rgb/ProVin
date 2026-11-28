
---

Every word in AI used to float with no place to put it. This course fixes that: one connected picture, built the same way from start to finish — **one small idea at a time**, always inside AI's own vocabulary, every idea checked back in your own words before moving on.

No prior AI knowledge needed. You bring nothing but curiosity (and, if you have it, the same vibe-coder instincts you use in web development — those transfer, but nothing here depends on them).

---

## How This Course Works

- **Discussion-first.** Each module is born from a real learning conversation, then shaped into clean notes with the exact flow that made it click.
- **One idea per lesson.** No dumping. Each file introduces one concept, checks it, then hands off to the next.
- **The map always comes first.** Before zooming into any part, you see where it sits — every new word gets a slot in the picture.
- **Say it back.** Every file ends with *In Your Own Words* — questions with hidden sample answers. If you can't answer, the file has a gap, not you.

---

## The Modules at a Glance

| Module | Title | Status |
|---|---|---|
| Phase 1 | AI Foundations — The Map | ✅ Done |
| Phase 2 | Inside the Building — LLM, Limits & Orchestration | ✅ Done |
| Phase 3 | Tools and the Agent Loop | ✅ Done |
| Phase 4 | Training, Tokens and Fine-Tuning | ✅ Done |
| Phase 5 | Frameworks Deeper — LangChain & LangGraph | 📋 Planned |
| Phase 6+ | Prompting, Ethics, Landscape & more | ⏳ Built as discussions continue |

---

## Phase 1 — AI Foundations: The Map ✅

The outer picture. By the end, every buzzword has a slot.

| # | Lesson | What it locks in |
|---|---|---|
| 1.1 | What Is AI | Rules written by humans vs patterns learned from examples; artificial + intelligence; training data, test data, overfitting |
| 1.2 | The Machine Learning Flow | data → training → model → testing → inference → application; parameters; production |
| 1.3 | The Map of AI | The nested circles: AI ⊃ machine learning ⊃ deep learning ⊃ discriminative / generative |
| 1.4 | Inside Generative AI | The family: LLM, image, audio, music, video models; multimodal as a property; the LLM broken down |
| 1.5 | Chatbots, Agents and Applications | The two big wrappers: chatbot (talks) and agent (tools + loop); the full recap |

---

## Phase 2 — Inside the Building: LLM, Limits & Orchestration ✅

The zoom-in. You know the map — now what's actually under the floorboards: what an LLM really is, what it *can't* do alone, and the middle layer built to fix it.

| # | Lesson | What it locks in |
|---|---|---|
| 2.1 | The LLM Up Close | The one skill: predict the next text; the locked definition; flavors (Claude, ChatGPT, Gemini) aren't new categories |
| 2.2 | Three Limits of an LLM on Its Own | Can't act (brain in a jar, no hands); frozen knowledge (knowledge cutoff, hallucination); no memory (context window, tokens, compaction) |
| 2.3 | The Three Floors and the Controller | Application up top, orchestration (controller / harness) in the middle, LLM at the bottom; the puppet strings: RAG, tools, memory |
| 2.4 | RAG — The Fetcher | Retrieval augmented generation; controller fetches FIRST, then LLM reads and answers; librarian vs reader; live info comes from tools, not RAG |
| 2.5 | Embeddings and Vector Databases | Meaning fingerprints; chunks; the vector database; setup time vs question time; same ruler; why your CRUD database doesn't need them |
| 2.6 | LangChain and LangGraph | Libraries, not languages; chain = ladder, graph = roots with loops; construction kits for the middle floor |

---

## Phase 3 — Tools and the Agent Loop ✅

The string that got previewed but never pulled: **actions**. This is where your months of using agents finally get their under-the-hood explanation.

| # | Lesson | What it locks in |
|---|---|---|
| 3.1 | Tools — The String That Lets the LLM Act | What tools are, how the LLM "chooses" one, why the tools live outside the model, tool calls |
| 3.2 | Live Lookups vs Stored Knowledge | Web search and APIs as plain-text fetches; when to use a tool instead of RAG |
| 3.3 | The Agent Loop, Step by Step | think → act → observe → think again; why the loop ends; where your chatbot stops and your agent continues |

---

## Phase 4 — Training, Tokens and Fine-Tuning ✅

The factory side. Training was one box in the Phase 1 pipeline — here it opens up.

| # | Lesson (planned) | What it will lock in |
|---|---|---|
| 4.1 | Tokens | The real slots of the context window; how text becomes numbers the model reads |
| 4.2 | Pre-training | The first, giant learning pass — where the base model and its knowledge cutoff come from |
| 4.3 | Fine-Tuning | The second, smaller pass — how a general model gets its personality and skills |
| 4.4 | From Base Model to Helpful Assistant | How the pieces (pre-training, fine-tuning, instructions) combine into the chatbots you use |
| 4.5 | The Transformer — The LLM's Blueprint | Architecture of the neural network; RNN history; parallel processing; GPUs |
| 4.6 | Attention — How Each Word Weighs the Others | How each token looks at the others; relevance scoring; feed-forward; layer stacking |

---

## Phase 5 — Frameworks Deeper: LangChain & LangGraph 📋

2.6 gave the ladder-vs-roots picture. This module pulls it apart properly: how chains get assembled, what a graph node/edge actually is, and why agents need loops — conceptually, no code required here (hands-on building lives in the Agentic AI Production course).

---

## Phase 6+ — Built as Discussions Continue ⏳

The map is never finished — it grows. Candidate modules, decided as conversations land:

- **Prompting & practical use** — talking to models well
- **Evals & hallucinations** — knowing when to trust the output
- **Ethics, bias and safety** — the risks side of the original AI menu
- **The current landscape** — models, companies, tools, what's moving
- **Multimodal & video** — zooming back into the generative family

---

**In Your Own Words**

1. Without looking: what are the six steps of the machine learning pipeline, and which phase of this course taught them?

<details>
<summary>Show Answer</summary>

**Sample Answer:** data → training → model → testing → inference → application. That's Phase 1, lesson 1.2 — the process side of the map, before the nested circles of 1.3 showed the naming side.

</details>

2. What's the difference between this course's Phase 1 and Phase 2 in one sentence each?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Phase 1 draws the whole map — the pipeline and the nested circles, so every buzzword has a slot. Phase 2 zooms into the building around the LLM — what the model is, the three limits it has alone, and the middle orchestration layer (RAG, tools, memory) built to fix them.

</details>

3. Why does the course keep saying "one small idea at a time"?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Because dumping multiple new concepts at once loses the thread — each idea only sticks when it's understood, said back in your own words, and given its slot in the map before the next one arrives. That's the rule the learning conversations themselves discovered: check, correct, then move on.

</details>

---

**Next up:** Phase 4 is complete. Phase 5 (Frameworks Deeper — LangChain & LangGraph) gets written as the next discussions land.
