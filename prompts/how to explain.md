# How to Explain — Guide for Writing "In Plain English" Sections

This guide defines how to write the **"In Plain English"** section for any course topic. The goal is to help a learner explain the concept to an interviewer in a conversational, technical, jargon-free way — without rigid definitions or analogies.

---

## What This Section Is

A short, conversational block at the **end of a topic file** (before "What It Is NOT" or "Next Step") that helps the learner answer: *"How do I explain this to an interviewer?"*

It should sound like a **senior dev talking to a junior** — natural, not scripted. No analogies (no restaurants, no phones, no food delivery). Pure technical explanation in plain words.

---

## Structure (5 Parts)

Every "In Plain English" section has these 5 parts in this order:

### 1. The 30-Second Answer
The core explanation in 2-4 sentences. What it is, what it does, why it exists. This is what you say when the interviewer asks "What is X?"

**Rules:**
- No jargon without immediate explanation
- No analogies
- Sound like you're explaining to a colleague, not reading from a textbook
- Lead with the "what" and "why", then the "how"

### 2. The Interview Follow-Up
What the interviewer typically asks next, and how to answer it. Pick 2-3 most common follow-up questions.

**Rules:**
- Each follow-up should be a real question interviewers ask
- Answer should be 2-3 sentences max
- Include code snippets where they help

### 3. The Trap Question
The one question interviewers ask to catch people who only memorized the definition.

**Rules:**
- This should be a practical gotcha, not a theoretical edge case
- Explain why people get it wrong
- Give the correct answer clearly

### 4. Quick Cheat-Sheet
3-5 bullet points of the most important things to remember. These are the facts that should be in your head before walking into the interview.

**Rules:**
- Each point should be one sentence
- No fluff — only actionable facts
- Include code snippets where they're memorable

### 5. The "Explain It Like I'm 5" (optional)
Only for complex topics. A single paragraph that strips away all complexity and explains the concept in the simplest possible terms. No code, no jargon.

**Rules:**
- One paragraph only
- No technical terms
- A 10-year-old should be able to follow it

---

## Tone Rules

- **Conversational but technical** — like explaining to a smart junior dev, not a child
- **No analogies** — no restaurants, phones, food delivery, lockers, etc.
- **No rigid definitions** — don't start with "X is a..." — start with what it does
- **Use "you" and "your"** — direct address
- **Short sentences** — break complex ideas into multiple short sentences
- **Code speaks** — include code snippets, they're clearer than paragraphs
- **Be honest about complexity** — if something is tricky, say so

---

## Template

```markdown
---

## In Plain English

### The 30-Second Answer

[2-4 sentences explaining what it is and why it exists. No jargon without explanation. No analogies.]

### Common Follow-Up Questions

**"Question interviewers ask?"**

[2-3 sentence answer with code if helpful]

**"Another common question?"**

[2-3 sentence answer]

### The Trap Question

[Interviewers love to ask this because people get it wrong.]

[Why people get it wrong + correct answer]

### Quick Cheat-Sheet

- [Fact 1 — one sentence]
- [Fact 2 — one sentence]
- [Fact 3 — one sentence]
- [Fact 4 — one sentence]

### In the Simplest Terms (optional)

[One paragraph, no jargon, no code. A 10-year-old could follow it.]
```

---

## Example: fetch

Here's a complete example using `fetch`:

### The 30-Second Answer

fetch is how your JavaScript code talks to a server. You give it a URL, it sends a request to that server, and the server sends something back. The whole thing runs asynchronously — JavaScript doesn't wait around, it keeps doing other things while fetch is out there getting your data. It returns a Promise, so you use `await` or `.then()` to handle the response when it arrives.

### Common Follow-Up Questions

**"What does fetch return?"**

It returns a Promise that resolves with a Response object — not the actual data. You have to call `.json()`, `.text()`, or `.blob()` on the Response to extract the body. And `.json()` returns another Promise, so you need to `await` that too.

**"How do you make a POST request with fetch?"**

Pass a second argument — an options object. Set `method: 'POST'`, add a `headers` object with `'Content-Type': 'application/json'`, and put your data in `body` as a stringified JSON. The key thing is `body` must be a string — fetch doesn't stringify for you.

### The Trap Question

**"Does fetch throw an error on 404?"**

No. `fetch` only rejects on network failure — like no internet connection. If the server returns 404 or 500, `fetch` resolves successfully. You have to check `response.ok` yourself. This is the #1 mistake developers make.

### Quick Cheat-Sheet

- `fetch(url)` sends a GET request and returns a Promise
- `response.ok` is `true` for 2xx status codes — check this yourself
- `response.json()` reads the body as JSON — returns another Promise, await it
- Always `JSON.stringify()` your body for POST requests
- `fetch` only rejects on network failure, not HTTP errors

### In the Simplest Terms

fetch is like sending a letter and getting a reply. You write the address (URL), send it, and wait. When the reply comes back, it's in a sealed envelope. You have to open it (`.json()`) to read what's inside. And if the reply says "wrong address" (404), fetch still delivers it — it's up to you to check.

---

## When to Add This Section

Add "In Plain English" to topics where:
- The concept is commonly asked in interviews
- The concept has practical gotchas that trip people up
- The concept is frequently misunderstood
- The learner explicitly asks for help explaining it

Don't add it to every topic — only where it adds value. Aim for ~30% of topics having this section.

## Placement

Put it **after the main content** but **before "What It Is NOT"**. If there's no "What It Is NOT" section, put it before "Next Step" or at the end.

## What NOT to Include

- ❌ Analogies (restaurants, phones, food delivery, etc.)
- ❌ Rigid definitions ("X is a...")
- ❌ Redundant code (only include code that clarifies something the text doesn't)
- ❌ More than 5 cheat-sheet points
- ❌ More than 3 follow-up questions
- ❌ Theoretical edge cases nobody asks about in interviews
