# JavaScript Lab — Implementation Plan

## 1. Vision

An interactive, in-browser JS lab where you **write, run, and fix real JavaScript code** — not type commands. Each scenario is a hands-on challenge: predict output, fix a bug, write code from scratch, solve a puzzle.

No setup, no external tools. Code runs in the browser via `new Function()`. The lab sits alongside the JS notes on `/coding` so you read -> immediately practice.

---

## 2. Architecture

### New Module: `lib/js-lab/`

| File | Purpose |
|------|---------|
| `types.ts` | `JsLabState`, code execution types |
| `parser.ts` | Parses user-submitted code + run command |
| `engine.ts` | Executes code, evaluates output, updates state |
| `lab-module.ts` | Registers `JS_LAB_MODULE` with registry |
| `scenarios/index.ts` | Barrel export of all scenarios |
| `scenarios/*.ts` | One file per scenario (challenge) |

### New Components: `components/js-lab/`

| Component | Purpose |
|-----------|---------|
| `js-lab-layout.tsx` | Custom Layout — code editor + output panel |
| `code-editor.tsx` | Textarea-based code editor with styling |
| `output-console.tsx` | Displays run output, errors, results |

### Updated Files

| File | Change |
|------|--------|
| `lib/lab-data.ts` | Add `javascript` subject entry |
| `lib/lab-registry.ts` | No changes needed (already supports custom Layout) |
| `app/lab/page.tsx` | Import `@/lib/js-lab` (triggers registration) |
| `app/lab/[subjectId]/page.tsx` | No changes needed (uses lab.Layout generically) |

---

## 3. UI Layout

```
┌──────────────────────────────────────────────────────────┐
│  ← Lab | JavaScript > [Scenario ▼]  [Reset]             │
│  1● > 2○ > 3○ > 4○ > 5○  (step progress)               │
├───────────────────────────────┬──────────────────────────┤
│  Instructions                 │  Code Editor             │
│  ────────────────────────     │  ┌────────────────────┐  │
│                               │  │ let x = 5;        │  │
│  ▶ Fix this code so it       │  │ let y = 10;       │  │
│    logs "15" to console.     │  │ console.log(x+y); │  │
│                               │  │                    │  │
│  📖 Hint 1                    │  └────────────────────┘  │
│  📖 Hint 2                    │  [▶ Run Code]            │
│  📖 Hint 3                    ├──────────────────────────┤
│                               │  Output Console          │
│                               │  ┌────────────────────┐  │
│                               │  │ $ node lab.js      │  │
│                               │  │ 15                 │  │
│                               │  │ ✓ Output matches!  │  │
│                               │  └────────────────────┘  │
└───────────────────────────────┴──────────────────────────┘
```

### Layout Details

- **Left panel (instruction)**: Shows current step's challenge, hints, and any expected vs actual comparison
- **Right-top (code editor)**: A styled textarea with monospace font, syntax-aware coloring via CSS
- **Right-middle (run button)**: Triggers code execution
- **Right-bottom (output console)**: Shows stdout, stderr, and step feedback

---

## 4. Types

```typescript
// lib/js-lab/types.ts

export interface JsLabState {
  scenario: { id: string; currentStep: number }
  userCode: string          // Current code in the editor
  lastOutput: string        // stdout from last run
  lastError: string | null  // stderr / error message
  runCount: number          // How many times they've hit Run
  hintsUsed: number         // How many hints revealed
}
```

The `ScenarioStep` already exists in `lib/lab-registry.ts` — JS lab uses the same interface. No new types needed at the base level.

### How Step Matching Works

Each step's `match(parsed)` function checks the parsed command. For the JS lab, when user clicks "Run", the parser emits:

```
{ type: "run", code: string }
```

The engine then:
1. Executes `code` via `new Function()`
2. Captures `console.log` output into a string
3. Stores the output in state

Step `match` can check either:
- **Command type**: `parsed.type === "run"` (user ran code)
- **Code content**: `parsed.code.includes("let")`  (specific pattern)
- **Output**: by also running the code inside `match` itself to verify

For output-based checks, `getNextStep(state)` is used for advance-or-stay logic (see "Step Flow" below).

---

## 5. Step Flow (Engine)

```
User clicks "Run"
  → handleCommand(who, code)
    → lab.parseCommand(code)
      → { type: "run", code: string }
    → lab.executeCommand(state, who, parsed)
      → Captures console.log output
      → Stores output + code in newState
      → Returns { newState, result: { lines: [output] } }
    → step.match(parsed)
      → If match:
        → lab.onStepMatch(...)  // optional feedback
        → getNextStep(newState) 
          → If output correct: return currentStep + 1
          → If output wrong: return currentStep
        → Show "✓ Correct!" or feedback
      → If no match:
        → Show "Not quite..."
    → setState(newState)
```

Key: `getNextStep` receives the **full state after execution**, so it can check `state.lastOutput` to decide if the user got it right. If wrong, returning `currentStep` keeps them on the same step.

---

## 6. Code Execution (`engine.ts`)

```typescript
function executeCode(code: string): { output: string; error: string | null } {
  let output = ""
  const mockConsole = {
    log: (...args: unknown[]) => { output += args.map(String).join(" ") + "\n" },
    error: (...args: unknown[]) => { output += "ERROR: " + args.map(String).join(" ") + "\n" },
    // Add warn, info, table stubs as needed
  }

  try {
    const fn = new Function("console", code)
    fn(mockConsole)
    return { output: output.trim(), error: null }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { output, error: msg }
  }
}
```

Limitations:
- No `import`/`export` (modules not supported by `new Function`)
- No DOM APIs (but we can mock `document` stubs)
- No `fetch` (but we can mock it)
- Safe: code runs in the page's JS context, but user is only shooting themselves in the foot

For DOM exercises (Phase 5), we'll need a mock `document` object.

---

## 7. Scenarios — Full Phase Map

### Phase 0: Warm-Up (1 scenario)

**Scenario: "Hello, Lab"**
- Get comfortable with the code editor
- Write `console.log("Hello, Lab!")` → see it run
- 3 steps: basic log → log a variable → log + concatenation

### Phase 1: Foundations (4 scenarios)

**1.1 "Variable Detective"** — `var` / `let` / `const`  
- Step 1: Given code with `var` redeclaration, predict the output. Run to check.
- Step 2: Fix a `const` reassignment bug.
- Step 3: Given hoisting with `var`, fix it to use `let` so it behaves correctly.
- Step 4: Write code that demonstrates TDZ with `let`.

**1.2 "Type Chaos"** — Data Types & Coercion  
- Step 1: Predict results of `"5" - 3`, `"5" + 3`, `[] + {}` — run to see the chaos.
- Step 2: Given a bug caused by `==`, fix it with `===`.
- Step 3: Write a function that safely compares values using strict equality.
- Step 4: Puzzle: `![] == []` — why? Fix the comparison to avoid this.

**1.3 "Hoisting Hangman"** — Hoisting  
- Step 1: Given hoisted code, predict the output order.
- Step 2: Fix code broken by hoisting (function expression before declaration).
- Step 3: Rearrange the code blocks to produce expected output.

**1.4 "Function Factory"** — All Function Forms  
- Step 1: Convert a function declaration to an arrow function.
- Step 2: Fix a `this` bug in a regular function vs arrow function.
- Step 3: Write a function that returns another function (factory pattern).

### Phase 2: Core Concepts (4 scenarios)

**2.1 "Closure Trap"** — Closures  
- Step 1: Given a classic loop + closure bug (`var i`), fix with `let`.
- Step 2: Write a counter function using closure.
- Step 3: Debug: why does the private variable leak? Fix the closure.

**2.2 "This or That"** — `this` Keyword  
- Step 1: Predict `this` value in different contexts (global, object method, arrow).
- Step 2: Fix a `this` bug in a callback using `.bind()`.
- Step 3: Rewrite using arrow function to preserve `this`.

**2.3 "Prototype Puzzle"** — Prototype Chain  
- Step 1: Given a prototype chain, trace property lookup.
- Step 2: Add a method to a constructor's prototype.
- Step 3: Fix a shared mutable state bug on prototype.

**2.4 "Class Makeover"** — ES6 Classes  
- Step 1: Convert a constructor function + prototype to a class.
- Step 2: Fix a `super()` call order bug.
- Step 3: Write a subclass that extends built-in `Array`.

### Phase 3: Async JavaScript (5 scenarios)

**3.1 "Sync or Swim"** — Sync vs Async  
- Step 1: Predict the order of synchronous vs async logs.
- Step 2: Given blocking code, convert to async pattern.
- Step 3: Write code that demonstrates the non-blocking nature of `setTimeout`.

**3.2 "Event Loop Racer"** — Event Loop  
- Step 1: Predict microtask vs macrotask execution order.
- Step 2: Given code with mixed `Promise.then` and `setTimeout`, arrange in expected output order.
- Step 3: Write a function that schedules tasks in a specific order.

**3.3 "Callback Hell Escape"** — Callbacks  
- Step 1: Given nested callbacks (callback hell), trace the execution order.
- Step 2: Refactor one level of nesting using named functions.
- Step 3: Fix an "off by one" callback bug.

**3.4 "Promise Mountain"** — Promises  
- Step 1: Create a promise that resolves/rejects based on a condition.
- Step 2: Chain 3 `.then()` calls correctly.
- Step 3: Fix a promise chain that swallows an error (missing `.catch`).
- Step 4: Use `Promise.all` to parallelize two async operations.

**3.5 "Async Await Adventure"** — async/await  
- Step 1: Convert a promise chain to async/await.
- Step 2: Fix missing `await` bug (promise not awaited).
- Step 3: Write try/catch error handling for an async function.
- Step 4: Rewrite `Promise.all` using `await` + variable assignment.

### Phase 4: Arrays & Functional (5 scenarios)

**4.1 "Map Filter Reduce"** — Array Methods  
- Step 1: Use `.map()` to transform an array.
- Step 2: Chain `.filter()` + `.map()`.
- Step 3: Use `.reduce()` to sum/group/count.
- Step 4: Fix a mutable `.sort()` bug (sort mutates in place).

**4.2 "Destructure Derby"** — Destructuring  
- Step 1: Destructure an object and rename the variable.
- Step 2: Swap two variables using destructuring.
- Step 3: Fix a nested destructuring with missing default value.

**4.3 "Spread Out"** — Spread & Rest  
- Step 1: Use spread to clone an array (vs reference copy).
- Step 2: Fix a mutation bug by replacing `.push()` with spread.
- Step 3: Write a function using rest parameters.

**4.4 "Higher Order Hustle"** — Higher-Order Functions  
- Step 1: Write a function that takes a callback and applies it.
- Step 2: Create a function decorator that logs before/after execution.
- Step 3: Fix a higher-order function that doesn't pass arguments correctly.

**4.5 "Curry Favor"** — Currying  
- Step 1: Convert a multi-parameter function to curried form.
- Step 2: Create a partial application using `.bind()`.
- Step 3: Fix a curried function order bug.

### Phase 5: DOM & Browser (3 scenarios — with mocked DOM)

**5.1 "DOM Builder"** — DOM Manipulation (mocked)
- Step 1: Create an element using `document.createElement` (mocked).
- Step 2: Set attributes and text content.
- Step 3: Write a function that builds a nested DOM structure.

**5.2 "Event Escape Room"** — Events & Bubbling (mocked)
- Step 1: Add an event listener to an element.
- Step 2: Fix event bubbling bug (child click triggers parent).
- Step 3: Implement event delegation pattern.

**5.3 "Debounce Dash"** — Debounce & Throttle
- Step 1: Write a debounce function.
- Step 2: Fix a search input that fires too many API calls (add debounce).
- Step 3: Compare debounce vs throttle behavior.

### Phase 6: Advanced (3 scenarios)

**6.1 "Module Mayhem"** — import/export  
- Step 1: Fix import path bug.
- Step 2: Convert a namespace import to named imports.
- Step 3: Write a module that re-exports from another module.

**6.2 "Catch Me If You Can"** — Error Handling  
- Step 1: Add try/catch to a function that throws.
- Step 2: Create a custom error class and use it.
- Step 3: Differentiate between `throw` types and handle each properly.

**6.3 "Generator Journey"** — Generators  
- Step 1: Write a generator function that yields values.
- Step 2: Fix a generator that doesn't iterate correctly.
- Step 3: Use a generator to create an infinite sequence.

---

## 8. Scenario Structure (Template)

Each scenario file follows the same pattern:

```typescript
// lib/js-lab/scenarios/variable-detective.ts

import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"
import type { JsLabState } from "../types"

export const VARIABLE_DETECTIVE: Scenario = {
  id: "variable-detective",
  phase: "1.1",
  title: "Variable Detective",
  description: "Track down var/let/const bugs and fix them.",
  setup: (state) => {
    const s = state as JsLabState
    return s
  },
  steps: [
    {
      actor: "A",
      instruction: `Predict the output of this code, then run it:\n\nvar x = 5;\nvar x = 10;\nconsole.log(x);`,
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output } = executeCode(parsed.code)
        return output === "10"
      },
      hints: [
        "var allows redeclaration in the same scope.",
        "The second var overwrites the first one.",
        "The output should be 10.",
      ],
    },
    // ... more steps
  ],
}
```

---

## 9. Hints System

3 progressive hints per step:
1. **Hint 1**: Gentle nudge — "Think about which variable keyword allows hoisting."
2. **Hint 2**: More direct — "var declarations are hoisted but not initialized with undefined in the TDZ."
3. **Hint 3**: Full answer — "Use `let x = 5` instead of `var` to fix the hoisting issue."

The existing `HintButton` component from git-lab is reused.

---

## 10. Challenges Classified by Type

| Type | Icon | Example |
|------|------|---------|
| 🔮 **Predict** | Show code → user predicts output → runs to verify | "What does this log?" |
| 🔧 **Fix** | Broken code → user fixes it | "Fix the const reassignment" |
| ✍️ **Write** | Spec → user writes from scratch | "Write a function that..." |
| 🧩 **Puzzle** | Tricky edge case | "Why is `[] == ![]` true?" |
| 🔄 **Refactor** | Working code → better pattern | "Convert this promise chain to async/await" |

---

## 11. Implementation Order

### Sprint 1: Core Infrastructure
1. Create `lib/js-lab/types.ts` — `JsLabState`
2. Create `lib/js-lab/parser.ts` — parse "run" command
3. Create `lib/js-lab/engine.ts` — `executeCode()`, `executeCommand()`
4. Create `lib/js-lab/lab-module.ts` — register the module
5. Create `components/js-lab/code-editor.tsx` — styled textarea
6. Create `components/js-lab/output-console.tsx` — output display
7. Create `components/js-lab/js-lab-layout.tsx` — custom Layout
8. Add `javascript` to `lib/lab-data.ts`
9. Import `@/lib/js-lab` in `app/lab/page.tsx`

### Sprint 2: Phase 0 + Phase 1 Scenarios
10. `hello-lab.ts` — warm-up
11. `variable-detective.ts` — var/let/const
12. `type-chaos.ts` — data types & coercion
13. `hoisting-hangman.ts` — hoisting
14. `function-factory.ts` — function forms

### Sprint 3: Phase 2 Scenarios
15. `closure-trap.ts` — closures
16. `this-or-that.ts` — `this` keyword
17. `prototype-puzzle.ts` — prototype chain
18. `class-makeover.ts` — classes

### Sprint 4: Phase 3 Scenarios
19. `sync-or-swim.ts` — sync vs async
20. `event-loop-racer.ts` — event loop
21. `callback-hell-escape.ts` — callbacks
22. `promise-mountain.ts` — promises
23. `async-await-adventure.ts` — async/await

### Sprint 5: Phase 4 + 5 + 6 Scenarios
24. `map-filter-reduce.ts` — array methods
25. `destructure-derby.ts` — destructuring
26. `spread-out.ts` — spread & rest
27. `higher-order-hustle.ts` — HOFs
28. `curry-favor.ts` — currying
29. `dom-builder.ts` — DOM manipulation (mocked)
30. `event-escape-room.ts` — events & bubbling
31. `debounce-dash.ts` — debounce & throttle
32. `module-mayhem.ts` — import/export
33. `catch-me.ts` — error handling
34. `generator-journey.ts` — generators

---

## 12. Questions to Resolve

1. **Code execution sandboxing**: `new Function()` is fine for learning but should we add an iframe layer for safety?
2. **DOM mocking**: For Phase 5, we need a lightweight `document` mock (or use `jsdom`-lite). Build a minimal mock that covers `createElement`, `querySelector`, `addEventListener`.
3. **`async` support**: `new Function("console", code)` doesn't support `async` functions returning promises. Need to handle `await` at the top level with a wrapper.
4. **`console.table`, `console.time`**: Build stubs for common console methods.
5. **Multi-step persistence**: When user moves between steps, their code should be persisted so they don't lose work.
6. **Testing**: How to verify scenarios work without manually clicking through all of them?

---

## 13. Not In This Plan

- **Real-time collaboration** (out of scope)
- **Project-based labs** (too large, future consideration)
- **Auto-grading** beyond simple output match
- **Code formatting** (Prettier integration)
