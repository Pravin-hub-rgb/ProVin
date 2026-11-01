# Usage
1. Replace the file path below with your target chapter file
2. Replace the variables in the prompt block (marked with `{{ }}`)
3. Paste into a new opencode chat

---

**File to modify:** `{{ path/to/chapter.md }}`

---

You are creating/modifying a chapter for the **"I Know Computers"** course — a beginner-friendly English course for office computer skills.

**Course structure:**
- Module `{{ MODULE_NUM }}` — `{{ MODULE_NAME }}`
  - `{{ PREV_CHAPTER_NUM }}` — `{{ PREV_CHAPTER_TITLE }}`
  - `{{ CURRENT_CHAPTER_NUM }}` — `{{ CURRENT_CHAPTER_TITLE }}` ← this file
  - `{{ NEXT_CHAPTER_NUM }}` — `{{ NEXT_CHAPTER_TITLE }}` (may not exist yet)

**Style rules (REQUIRED):**
1. Simple conversational English, beginner-friendly, job-ready focus
2. Keep paragraphs short (2-4 lines max). Use bold for key terms.

---

### Content structure rules

**1. Opening paragraph** — Reference previous chapter's key topic by name, connect to current chapter using a metaphor (body/soul, foundation/tools, theory/practice, etc.), and hint at what next chapter will cover. Must reference the previous chapter by its actual number and title.

**2. Roadmap paragraph (CRITICAL)** — Right after the chapter title and before the first topic, add a paragraph that briefly mentions ALL topics the chapter will cover in order. Example: "Here's what we'll cover: first X, then Y, after that Z, and finally W." This tells the reader where they're going. Every topic should feel like part of a connected journey — not a random list.

**3. Transition sentences** — Between every subtopic, add 1-2 sentences connecting the previous topic to the next one. Example: "Now that we understand X, the next question is — how does Y work?" or "We've covered X and Y. But Z is just as important, so let's look at that next." Never let a new topic start without explaining why it comes next.

**4. Sections** — Group into logical sections with emoji headings. Use `---` as separators between major sections. Add `> **💡 ...**` callout boxes for key insights and `> **⚠️ ...**` for common confusions/misconceptions.

**5. Tables** — Add comparison tables wherever two+ related concepts exist. Tables must have clear headers using `|` syntax. Every table should teach something — don't add them just for decoration.

**6. SVG diagrams** — Create SVG diagrams in `public/diagrams/iknowcomputers/` for each major concept. Follow this exact design specification:

```
- viewBox: 500-600 wide × 200-250 tall
- Background rect: fill="#faf5ff" or "#f0f9ff" or "#fef3c7" with matching stroke
- Dark card backgrounds: #1e293b, #0f172a, #334155
- TEXT ON DARK → use ONLY: #f8fafc (white), #c7d2fe (light purple), #93c5fd (light blue), #a78bfa (purple), #22c55e (green), #fbbf24 (amber)
- TEXT ON LIGHT → use: #475569 or #1e293b or #0369a1
- Accent strokes: #6366f1, #3b82f6, #22c55e, #f59e0b
- Boxes: rx="6" or rx="8", stroke-width="1.5"
- Bottom captions: #94a3b8 font-size 9 (only on light background)
- Font: sans-serif for headings, monospace for labels/code
```

**⚠️ CRITICAL: Contrast rule** — NEVER use `#94a3b8` or `#64748b` text on dark backgrounds (`#0f172a`, `#1e293b`, `#334155`). ALWAYS use bright colors listed above on dark. Gray text is ONLY allowed on light backgrounds or as bottom captions (on the overall light SVG background).

**⚠️ CRITICAL: viewBox clipping** — Ensure ALL text elements have y-coordinates that fall INSIDE the viewBox height. Nothing should be clipped at the bottom. Add 20-30px padding below the lowest element.

Embed each SVG as: `![Caption](/diagrams/iknowcomputers/filename.svg)`

**7. Chapter ending** — Must have all three:
- `### 🧠 Chapter Summary` with `> ✅ ...` bullet list (5-8 points)
- `### 🎯 Real Task` with 2-3 numbered practical steps the reader can do RIGHT NOW on their own computer
- `> **Next chapter:** ... 🚀` — teaser that logically leads to next chapter (or asks a question if next doesn't exist yet)

**8. Visual indentation hierarchy (CRITICAL):**
- Section headings (`###`, `####`) must be at the leftmost column — no indent
- ALL content under a heading must be indented 2 spaces to the right of the heading
- When listing operations, steps, or multiple items under a topic, use **unordered lists** (`  - **Item**` with text indented below) or **numbered lists** — never leave them as plain bold paragraphs at the same indentation level as the heading
- **No blank lines between list items** — this creates "tight" lists that avoid `<p>` wrapping, which causes the bullet to appear on a separate line from the text
- This creates a clear visual hierarchy: heading → indented content
- Example:
  ```
  ### Topic Name

    - **Sub-item 1**
      Description of sub-item 1 goes here.
      Steps: step 1 → step 2 → step 3
    - **Sub-item 2**
      Description of sub-item 2 goes here.
  ```
  The heading is leftmost; everything that belongs under it is indented.

**9. Connection rules:**
- Opening MUST reference the previous chapter by number + key topic
- If 0.2 (Hardware) is relevant, reference CPU/RAM/Storage/Motherboard/I/O
- Each section must flow naturally into the next — use transition sentences like "Now that we understand X, let's talk about Y..." or "But along with the body, you also need a soul..."
- Nothing should feel like it comes "out of the blue"

### Example section flow pattern

```
> Course banner line

Opening (prev → current → next)

---

## Chapter X.Y — Title

  Definition / intro

  📋 Roadmap: "Here's what we'll cover: first X, then Y, after that Z, and finally W."

### Concept A — [Table or Visual]

  | Col | Col | Col |
  |---|---|---|

  ![Desc](/diagrams/iknowcomputers/svg.svg)

  > 💡 Key insight

  <!-- Transition: "Now that we understand A, let's move to B..." -->

### Concept B — [Table or Visual]

  - Bullet item
  - Bullet item

---

### 🧠 Chapter Summary
  > ✅ ...
### 🎯 Real Task
  1. ...
> **Next chapter:** ...
```
