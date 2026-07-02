import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const SCOPE_ESCAPE: Scenario = {
  id: "scope-escape",
  phase: "1.3",
  title: "Understanding Scope",
  description:
    "Master JavaScript's three scope types — global, function, and block — and learn how var and let behave differently inside blocks.",
  steps: [
    {
      actor: "A",
      instruction:
        "Write code that shows inner scope can access outer scope. Declare a variable called outer with the value accessible using let outside any block, then log it from inside a nested if block.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "accessible"
      },
      hints: [
        "Start by declaring `let outer = \"accessible\";` at the top level.",
        "Then create `if (true) { console.log(outer); }` inside.",
        "Inner scope can always access outer scope — this is the golden rule.",
      ],
      solution: `let outer = "accessible"
if (true) {
  console.log(outer)
}
`,
      solutionOutput: "accessible",
    },
    {
      actor: "A",
      instruction:
        "Write a function with an if block inside it. Declare a variable called inner with the value blocked using let inside the if block. Then try to log inner after the if block closes but still inside the function. Call the function. You should get a ReferenceError because let cannot be accessed outside its block.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        return (
          error !== null &&
          error.toLowerCase().includes("inner") &&
          parsed.code.includes("let") &&
          parsed.code.includes("if")
        )
      },
      hints: [
        "Inside the function, put `if (true) { let inner = \"blocked\"; }`.",
        'Then AFTER the if block\'s `}`, put `console.log(inner)`.',
        "Call the function: `test();` — you'll see a ReferenceError because `let` can't escape its block!",
      ],
      solution: `function test() {
  if (true) {
    let inner = "blocked"
  }
  console.log(inner)  // ReferenceError — inner is not defined here
}
test()
`,
      solutionOutput: "Error: ReferenceError: inner is not defined",
    },
    {
      actor: "A",
      instruction:
        "Now fix the previous code. Move the log of inner inside the if block before the closing brace. This time it should work and log the value blocked.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "blocked" && parsed.code.includes("let") && parsed.code.includes("if")
      },
      hints: [
        "Put the console.log INSIDE the if block, before the closing }.",
        'Example: `if (true) { let inner = "blocked"; console.log(inner); }`',
        "Now `let` works because we're accessing it inside its own block — this is the correct way.",
      ],
      solution: `function test() {
  if (true) {
    let inner = "blocked"
    console.log(inner)  // Works — accessing inside the same block
  }
}
test()
`,
      solutionOutput: "blocked",
    },
    {
      actor: "A",
      instruction:
        "Write code that declares a variable with the value I escaped! using var inside an if block, then log it after the block. See how var ignores block boundaries and leaks out.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "I escaped!" && parsed.code.includes("var")
      },
      hints: [
        "Inside the if block: `var leaked = \"I escaped!\";`",
        "After the block (outside it): `console.log(leaked);`",
        "With var, the variable is still accessible — this is why we prefer let/const.",
      ],
      solution: `if (true) {
  var leaked = "I escaped!"
}
console.log(leaked)  // "I escaped!" — var ignores block scope
`,
      solutionOutput: "I escaped!",
    },
  ],
}