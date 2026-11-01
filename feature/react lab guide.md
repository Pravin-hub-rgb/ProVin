# React Learning Platform — Agent Guidance Doc

This file is the technical spec for the entire platform. The agent will follow this
whenever a new concept (doc + lab) needs to be built, or any infra part of the
platform needs to be created.

---

## 0. What the Project Is (One Line)

A free, public, no-login learning platform — for learning React.js (with TypeScript).
Every concept has a **doc** (for reading) and a **lab** (for live practice in
TypeScript, in-browser sandbox).

No database, no auth, no user accounts. The entire platform is generated from
static content (MDX files + lab scenario files).

---

## 1. Tech Stack — Final Decisions

| Layer | Tool | Reason |
|---|---|---|
| Framework | Next.js (part of existing app) | Already in use in the project |
| Doc content | **MDX** (`.mdx` files) | Flexibility of Markdown + JSX embed — better than plain markdown |
| Lab / Sandbox | **Sandpack** (`@codesandbox/sandpack-react`) | Used in production by react.dev and tailwindcss.com. File explorer + editor + live preview + Tailwind template all built-in |
| Lab code language | **TypeScript** (`react-ts` Sandpack template) | The course is TypeScript-first, so labs will also be `.tsx` files, `useState<T>` will be typed rather than plain JS |
| Test/Validation runner | **Sandpack's built-in test setup** (Vitest + React Testing Library, runs in the browser) | No backend/server needed. Checks the actual rendered DOM, not the raw code text |
| Hosting | Vercel free tier | No DB, static-ish content — perfectly fits the free tier, cost won't grow even as it scales |

**Important:** No login/tracking means no progress will be saved on the server. This
is intentional — to keep scope simple.

---

## 2. Content Folder Structure

Every concept in its own folder — doc and lab always together, under the same name:

```
content/react/
  module-0/
    0.1-virtual-dom/
      doc.mdx                (doc only — no lab in Module 0)
    0.2-jsx-compilation/
      doc.mdx
    ...

  batch-1/
    1.1-jsx-components/
      doc.mdx
      lab.ts                 (Sandpack scenario config)
      lab.test.tsx           (validation tests that run against the lab)
    1.5-usestate-counter/
      doc.mdx
      lab.ts
      lab.test.tsx
    ...

  combined-projects/
    todo-app-v1/
      doc.mdx
      lab.ts
      lab.test.tsx
```

Rule: if a concept is **purely conceptual/understanding-based** (like Module 0's
Virtual DOM, Fiber Architecture) → only `doc.mdx`, no lab. If a concept is
**hands-on/mini-project** based (Batch 1 onwards) → all three: `doc.mdx` +
`lab.ts` + `lab.test.tsx`.

---

## 3. Routes

```
/course/react/[batch]/[concept-slug]              → Doc page (renders doc.mdx)
/course/react/[batch]/[concept-slug]/practice     → Lab page (Sandpack + tests)
```

At the end of the doc page there is a **"Practice →"** button that navigates to
the `/practice` route. Doc and lab are **separate pages** (not a same-page
split-view) — this is a confirmed decision.

---

## 4. Lab Scenario File Format (`lab.ts`)

```typescript
export const USESTATE_COUNTER_LAB = {
  id: "1.5-usestate-counter",
  title: "Counter with useState",
  template: "react-ts",              // Sandpack TypeScript template

  instructions: `
    Build a counter component where:
    - A number is shown (starting from 0)
    - There is a +1 button, -1 button, and a Reset button
  `,

  starterFiles: {
    "/App.tsx": `export default function App() {
  // Start here
  return <div>Counter will be built here</div>;
}`,
  },

  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`,
  },
};
```

---

## 5. Validation / Checking Approach (Important — Different Per Concept Type)

There are two types of concepts, and their checking approach differs:

### Type A — Logic/Behavior concepts (state, events, conditionals, hooks)
Check that the **behavior** is correct — don't match the exact code syntax.

```typescript
// lab.test.tsx example
test("increment button increases the count", () => {
  render(<App />);
  const incrementBtn = screen.getByText("+1");
  fireEvent.click(incrementBtn);
  expect(screen.getByText("1")).toBeInTheDocument();
});
```

### Type B — Structural styling concepts (Tailwind layout — Batch 4)
Don't check the code's text/class-name (since both `rounded-lg` and `rounded-xl`
can be correct). Instead, check the **computed style**:

```typescript
test("card has rounded corners and shadow", () => {
  render(<App />);
  const card = screen.getByTestId("profile-card");
  const styles = getComputedStyle(card);
  expect(parseFloat(styles.borderRadius)).toBeGreaterThan(0);
  expect(styles.boxShadow).not.toBe("none");
});
```

### Type C — Pure aesthetic/pixel-level things
Don't automate this. For this, only:
- Provide a checklist (manual self-check points)
- Provide a solution reveal button — to compare against
- No forced pass/fail

**Rule of thumb:** If the check is "does this work correctly" → automate it
(Type A/B). If the check is "does this look good" → don't automate (Type C),
just guide.

---

## 6. Per-Concept Build Workflow (Agent Will Follow This)

For every concept, in this order:

1. **Write `doc.mdx`** — following the Master Teaching Prompt (Think → Why →
   Concept/Syntax → Code (gradual) → Test). This is a separate file; its
   complete format is defined by that document.
2. **Create `lab.ts`** — starter code (completely minimal/incomplete) + solution
   code + instructions text
3. **Create `lab.test.tsx`** — assertions testing the expected behavior/structure
   of that concept (following Section 5's rules — Type A or Type B, whichever
   applies)
4. **Verify locally** — is the doc rendering correctly? Is the starter code
   loading in the lab? Does the test pass against the solution code (sanity
   check)?
5. Next concept — repeat in the same order

**Complete the full pipeline (doc+lab+test) for one concept at a time, then
start the next.** Don't do all docs first and all labs later — that would
delay catching architecture mismatches in between.

---

## 7. Syllabus Reference

The complete syllabus (from Module 0 to Capstone, all batches, all concepts, all
mini-projects) is already available to the agent as reference (React Final
Roadmap document). This guidance doc only defines **how to build** — for **what to
build**, see the syllabus doc.

Starting point: **Batch 1 - A: JSX + Functional Components** (Profile Card
mini-project), since it's the simplest/static — no state/logic — making it the
best first concept to test the pipeline end-to-end.

---

## 8. Things Outside This Doc (See Other Files)

- **How to write doc content (tone, style, gradual reveal, problem-first etc.)**
  → See the Master Teaching Prompt file; that's separate
- **Which concepts/projects are in the whole course** → See the React Final
  Roadmap (syllabus)
- This file only defines the **technical/platform architecture**

(End of file - total 214 lines)
