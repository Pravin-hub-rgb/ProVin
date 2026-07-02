import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const VARIABLE_DETECTIVE: Scenario = {
  id: "variable-detective",
  phase: "1.1",
  title: "Variables: var, let & const",
  description:
    "Understand the differences between var, let, and const — when to use each and the pitfalls of var.",
  steps: [
    {
      actor: "A",
      instruction:
        "Declare a constant variable named greeting with the value Hello, World!, then log it.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "Hello, World!"
      },
      solution: `const greeting = "Hello, World!"
console.log(greeting)
`,
      solutionOutput: "Hello, World!",
      hints: [
        'Use `const greeting = "Hello, World!"` to declare the variable.',
        "Use `console.log(greeting)` to print it.",
        "Remember: const cannot be reassigned after declaration.",
      ],
    },
    {
      actor: "A",
      instruction:
        "Declare a variable named count starting at 0 using let, log it. Then reassign it to 1 and log it again. You should see two lines of output.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n")
        return lines.length >= 2 && lines[0] === "0" && lines[1] === "1"
      },
      solution: `let count = 0
console.log(count)
count = 1
console.log(count)
`,
      solutionOutput: "0\\n1",
      hints: [
        "Start with `let count = 0; console.log(count);`",
        "Then reassign: `count = 1; console.log(count);`",
        "You don't use let again when reassigning — just `count = 1`.",
      ],
    },
    {
      actor: "A",
      instruction:
        "Write a for loop that logs 0, 1, 2 on separate lines. Use let for the loop variable so each iteration gets its own binding.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "0\n1\n2" && parsed.code.includes("let ")
      },
      solution: `for (let i = 0; i < 3; i++) {
  console.log(i)
}
`,
      solutionOutput: "0\\n1\\n2",
      hints: [
        "A for loop looks like: `for (initialization; condition; increment) { ... }`",
        "Use `for (let i = 0; i < 3; i++)`",
        'Inside the loop, just call `console.log(i)`.',
      ],
    },
  ],
}