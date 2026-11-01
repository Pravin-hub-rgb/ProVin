# Agentic AI for Vibe Coders — Course Structure

> Each phase is documented below. New phases are added as they are reviewed.

---

## Phase 1 — How AI Models Actually Work

```mermaid
graph TD
    P1["Phase 1"] --> L1["Language Model"]
    P1 --> L2["Tokens"]
    P1 --> L3["Context Window"]
    P1 --> L4["Request Flow"]
    P1 --> L5["Temperature"]

    L1 --> L1s1["Neural Network"]
    L1 --> L1s2["Models vs Clients"]
```

---

## Phase 2 — What Makes an AI Agentic

```mermaid
graph TD
    P2["Phase 2"] --> P2L1["Chatbot vs Agent"]
    P2 --> P2L2["Agent Loop"]
    P2 --> P2L3["Tools"]
    P2 --> P2L4["Planning"]
    P2 --> P2L5["Agent Landscape"]
```

---

## Phase 3 — Your First Real API Call

```mermaid
graph TD
    P3["Phase 3"] --> P3L1["Setup"]
    P3 --> P3L2["First API Call"]
    P3 --> P3L3["Messages Array"]
    P3 --> P3L4["Response Object"]
    P3 --> P3L5["Error Handling"]

    P3L1 --> P3L1s1["SDK"]
    P3L1 --> P3L1s2["Dotenv"]

    P3L2 --> P3L2s1["Response Object"]

    P3L3 --> P3L3s1["Roles"]
    P3L3 --> P3L3s2["System Prompt"]

    P3L5 --> P3L5s1["Rate Limits"]
    P3L5 --> P3L5s2["Try Catch"]
    P3L5 --> P3L5s3["Specific Errors"]
```

---

## Phase 4 — Tool Calling: The Heart of Agents

```mermaid
graph TD
    P4["Phase 4"] --> P4L1["Tool Calling"]
    P4 --> P4L2["Defining Tools"]
    P4 --> P4L3["Calculator Agent"]
    P4 --> P4L4["Multiple Tools"]
    P4 --> P4L5["Tool Calling Loop"]

    P4L1 --> P4L1s1["Tool Calling"]
    P4L1 --> P4L1s2["Tool Calling Loop"]
    P4L1 --> P4L1s3["Model Doesn't Execute"]

    P4L2 --> P4L2s1["Tool Anatomy"]
    P4L2 --> P4L2s2["JSON Schema"]
    P4L2 --> P4L2s3["Model Sees Tools"]
    P4L2 --> P4L2s4["Model Decides"]

    P4L4 --> P4L4s1["Chaining"]
    P4L4 --> P4L4s2["Tool Choice"]

    P4L5 --> P4L5s1["Full Agent Loop"]
```

---

## Phase 5 — Memory and Context Management

```mermaid
graph TD
    P5["Phase 5"] --> P5L1["Stateless Models"]
    P5 --> P5L2["Memory Types"]
    P5 --> P5L3["Conversation History"]
    P5 --> P5L4["System Prompt"]
    P5 --> P5L5["RAG"]
```

---

## Phase 6 — Building Real Agents: 3 Projects

```mermaid
graph TD
    P6["Phase 6"] --> P6L1["Weather Agent"]
    P6 --> P6L2["File Summarizer"]
    P6 --> P6L3["Research Agent"]

    P6L1 --> P6L1s1["Stack"]

    P6L2 --> P6L2s1["Stack"]

    P6L3 --> P6L3s1["Stack"]
    P6L3 --> P6L3s2["Tavily vs Google"]
    P6L3 --> P6L3s3["Comparison Table"]
```

---

## Phase 7 — The Bigger Picture

```mermaid
graph TD
    P7["Phase 7"] --> P7L1["Frameworks"]
    P7 --> P7L2["MCP Servers"]
    P7 --> P7L3["Multi-Agent Systems"]
    P7 --> P7L4["Vector Databases"]
    P7 --> P7L5["Future Trends"]
    P7 --> P7L6["Encoder-Free Architecture"]
    P7 --> P7L7["LinkedIn & Resume"]
```