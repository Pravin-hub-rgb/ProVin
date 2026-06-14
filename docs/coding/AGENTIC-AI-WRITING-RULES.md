# Agentic AI Course — Writing Rules & Style Guide

Use this document as a reference whenever creating or editing course content for Vin's Agentic AI course (and any future courses following the same pattern).

---

## 1. How to Open a Topic (CRITICAL — Do Not Skip)

The most important rule. Every topic must open by leading the reader from the familiar to the new.

### The Opening Pattern

Before you introduce any definition or heading, you MUST:

1. **Start with something the reader has already experienced.** Think of a real-world thing everyone knows — phone predictive text, autocorrect, a restaurant menu, a vending machine. Something visual and relatable.
2. **Connect that familiar thing to the concept you're about to teach.** "You know how your phone suggests the next word? That's a tiny version of what a language model does."
3. **Build up from the familiar to the technical.** "Now imagine that scaled up to the entire internet. That's a language model."
4. **Then introduce the heading.** The heading should feel like a natural label for what you've already been describing.

```
[Start with a relatable real-world experience the reader definitely knows]

[Connect it to the concept you're teaching — show how they're the same thing]

[Scale it up / build on it to reach the actual technical concept]

# Heading — Topic Title

[Now dive into the technical details]
```

### DO NOT start like this (too abrupt, confusing):
```
# What is a Language Model?
A language model is not a brain. It doesn't think. It's a mathematical pattern-recognition machine...
```

### DO start like this (builds from familiar to new):
```
You know when you're typing on your phone and it suggests the next word? Like you type "I'm going to the" and it guesses "store"? That predictive text is a tiny, simple version of what a language model does. Now imagine that same idea, trained on billions of internet texts, predicting thousands of words in a row. That's a language model.

# What is a Language Model?

Here's how it works under the hood...
```

### Structural Flow for Any Topic

Each topic should follow this flow:

1. **Lead-in paragraph** — references what was just learned, connects to reader's existing experience
2. **Transition** — "Let's look at what this really means" / "Here's how it works"
3. **Heading** — the topic title
4. **Explanation** — technical concept explained simply
5. **Analogy** — compare to a real-world thing (restaurant, car, kitchen, etc.)
6. **What it is NOT** — clarify common misconceptions
7. **Bridge to next topic** — "Next we'll talk about..."

---

## 2. Natural Flow Between Topics

Every file must connect to the previous one. Use these transition techniques:

- **First file in a phase**: Bridge from the previous phase's final topic. E.g.: "In Phase [N], you learned [X]. Now let's take that further and talk about [Y]."
- **Middle files**: Bridge from the immediately preceding file. E.g.: "Now that you understand [previous concept], let's look at [next concept]."
- **Last file in a phase**: Bridge forward to the next phase. E.g.: "This sets us up for Phase [N+1], where we'll actually [next topic]."

Each file's opening sentence should reference something specific from the previous file — not a generic "in the last chapter."

---

## 3. Conversational Tone

- Write like a smart senior developer explaining to a junior. Use "you" and "we."
- No textbook language, no academic formality.
- No jargon without immediate explanation. When introducing a new term, define it right there in the same sentence or the very next one.
- Use analogies generously. Real-world comparisons help Vin's learning style. Good analogies used in this course: autocomplete on steroids (LLM), vending machine vs intern (chatbot vs agent), desk with papers (context window), USB for AI tools (MCP), waiter recommending dishes (pattern matching).
- Keep paragraphs short — 3-5 sentences max. No walls of text.
- Casual but accurate. Like a knowledgeable friend explaining, not a lecturer.

---

## 4. How to Handle Future Concepts (CRITICAL)

When you need to mention a concept that hasn't been taught yet (like mentioning "tokens" in 1.1 when tokens are taught in 1.2):

- **Do mention it briefly** — pretending it doesn't exist is confusing
- **But immediately reassure**: "We'll explore this in detail in the next topic"
- **Give a simple working definition**: "For now, just think of tokens as the AI's version of words"

Example:
> "The model predicts the next word — well, technically it predicts tokens. We'll dive into what tokens are in the next topic. For now, just think of them as the AI's chunks of text, kind of like words but not exactly."

---

## 5. Code Examples

- **Language**: JavaScript (Node.js) for core concepts. Projects in Next.js.
- **Complete and runnable**: Not pseudocode. Every example should work if copied and pasted.
- **Explain every line**: After each code block, walk through what each part does.
- **Include install commands**: If a package is needed, show the `npm install` command.
- **Phase 3 and 4 code**: Plain Node.js scripts (`.js` files, run with `node index.js`). No framework needed.
- **Phase 6 projects**: Full Next.js apps with:
  - Agent logic in `app/api/.../route.ts`
  - UI in `page.tsx`
- Use `import` syntax (ES modules), not `require`.

---

## 6. "In Your Own Words" Section

Every file must end with this section — 3-5 open-ended questions for self-check.

### Rules for Questions

- **Only ask about concepts that were actually taught in this file.** If the reader can't answer after reading, the question is wrong, not the reader.
- **No multiple choice.** Questions should require the reader to explain in their own words.
- Questions should test conceptual understanding, not memorization.

### Rules for Answers

- **Every question must have a sample answer** hidden in an HTML `<details>` accordion.
- Use `<details>` and `<summary>` HTML tags (supported because `rehype-raw` is enabled in the markdown viewer).
- The answer should demonstrate the quality and depth expected.
- Include analogies in the answers where appropriate.

### Format:

```
---

**In Your Own Words**

1. [Question about the core concept taught in this file]

<details>
<summary>Show Answer</summary>

**Sample Answer:** [A complete answer with analogy, showing expected depth]

</details>

2. [Question connecting to reader's own experience]

<details>
<summary>Show Answer</summary>

**Sample Answer:** [Answer connecting to real-world usage]

</details>
```

---

## 7. What NOT to Do

- ❌ No starting a file with a heading. Always lead in with conversational context.
- ❌ No assuming prior knowledge. Vin may have partial knowledge — complete and solidify it.
- ❌ No skipping basics even if they seem obvious. Treat every concept as needing a clear, fresh explanation.
- ❌ No jargon without immediate explanation.
- ❌ No "out of the blue" concepts. Every topic must be introduced with context.
- ❌ No mentioning a future concept without saying "we'll cover this in the next section."
- ❌ No questions in "In Your Own Words" that ask about things not taught in that file.
- ❌ No answers without an accordion — every question needs a hidden sample answer.

---

## 8. Target Audience Profile

- **Name**: Vin (Vinowski)
- **Background**: Self-taught "vibe coder" based in India
- **Experience**: Has built real projects using AI coding agents (Cline, opencode) and Python-based tools
- **What he knows**: The *shape* of how things work. Has used AI tools extensively but never formally studied CS or ML.
- **What he needs**: Vocabulary, connected mental model, and confidence to explain concepts to others.
- **Learning style**: Practical, conversational, needs to see code and build things. Learns by connecting new concepts to things he's already experienced (e.g., "you've seen Cline do this — here's how it works under the hood"). Needs to start from the familiar (phone keyboard, restaurant, vending machine) and build up to the technical. Struggles when content jumps straight into definitions.

---

## 9. File Organization

- One file per topic, named: `{Phase}.{TopicNumber} {Topic Name}.md`
- Example: `1.2 Tokens.md`, `4.3 Calculator Agent.md`
- Files stored in phase directories: `Phase {N} - {Phase Name}/`
- Phase directories named with consistent pattern: `Phase 1 - How AI Models Actually Work/`

---

## 10. Preferred Phrasing

Instead of this:            | Use this:
----------------------------|--------------------------------
"Let us consider"           | "Think about it this way"
"It is important to note"   | "Here's why this matters"
"Subsequently"              | "Next" / "Now"
"One might argue"           | "You might be wondering"
"In conclusion"             | "So here's the takeaway"
"Per the aforementioned"    | "As we just covered"
"Comprehend"                | "Get" / "understand"
"Utilize"                   | "Use"
"As previously discussed"   | "We just talked about"
"Notwithstanding"           | "Even so" / "But"
"Henceforth"                | "From now on"
