import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const TYPE_OF_TROUBLE: Scenario = {
  id: "type-of-trouble",
  phase: "1.2",
  title: "JavaScript Data Types",
  description:
    "Learn JavaScript's 7 primitive types, the typeof operator, and the infamous typeof null bug.",
  steps: [
    {
      actor: "A",
      instruction:
        "Log the type of each of these four values: the string hello, the number 42, the boolean true, and null. Each result should appear on its own line in the order: string, number, boolean, object.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return (
          lines.length >= 4 &&
          lines[0] === "string" &&
          lines[1] === "number" &&
          lines[2] === "boolean" &&
          lines[3] === "object"
        )
      },
      hints: [
        'Use `typeof value` to check the type, e.g. `console.log(typeof "hello")`.',
        "For null: `console.log(typeof null)` — notice something strange?",
        "The four calls should be: typeof 'hello', typeof 42, typeof true, typeof null.",
      ],
      solution: `console.log(typeof "hello")
console.log(typeof 42)
console.log(typeof true)
console.log(typeof null)
`,
      solutionOutput: "string\\nnumber\\nboolean\\nobject",
    },
    {
      actor: "A",
      instruction:
        "Create a variable called `thing`, assign it a string, log its typeof. Then reassign it to a number, log typeof again. Show that variables don't have types — values do.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines.includes("string") && lines.includes("number")
      },
      hints: [
        "Declare with `let thing = \"hello\"; console.log(typeof thing);`",
        "Then reassign: `thing = 42; console.log(typeof thing);`",
        "The output should first show 'string', then 'number'.",
      ],
      solution: `let thing = "hello"
console.log(typeof thing)
thing = 42
console.log(typeof thing)
`,
      solutionOutput: "string\\nnumber",
    },
    {
      actor: "A",
      instruction:
        "Declare a variable `username` without assigning a value, log it. Then assign `null` to it and log it again. See the difference between undefined and null.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.includes("undefined") && lines.includes("null")
      },
      solution: `let username
console.log(username)
username = null
console.log(username)
`,
      solutionOutput: "undefined\\nnull",
      hints: [
        "Start with `let username; console.log(username);` — this logs `undefined`.",
        "Then set `username = null; console.log(username);`",
        "undefined means 'never assigned'. null means 'intentionally empty'.",
      ],
    },
  ],
}
