import type { Scenario } from "@/lib/lab-registry"
import { executeCodeAsync } from "../engine"

export const PROMISE_PLAYGROUND: Scenario = {
  id: "promise-playground",
  phase: "3.4",
  title: "Promise Playground",
  description:
    "Understand Promises — create them, chain `.then()` calls, and combine multiple promises with `Promise.all`.",
  steps: [
    {
      actor: "A",
      instruction:
        "Create a Promise that resolves with the string Hello, Promise!. Chain a then call to log the resolved value.",
      match: async (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = await executeCodeAsync(parsed.code)
        if (error) return false
        return output === "Hello, Promise!"
      },
      hints: [
        "Create a Promise: `new Promise((resolve) => resolve(\"Hello, Promise!\"))`",
        "Chain `.then(value => console.log(value))` to log the resolved value.",
        "Expected output: Hello, Promise!",
      ],
      solution: `new Promise((resolve) => resolve("Hello, Promise!"))
  .then(value => console.log(value))
`,
      solutionOutput: "Hello, Promise!",
    },
    {
      actor: "A",
      instruction:
        "Create a Promise that resolves with the number 5. Chain a then call to double the value, then chain another then call to log the result. The final output should be 10.",
      match: async (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = await executeCodeAsync(parsed.code)
        if (error) return false
        return output === "10"
      },
      hints: [
        "Start with `Promise.resolve(5)` or `new Promise(resolve => resolve(5))`",
        "First `.then(val => val * 2)` transforms the value.",
        "Second `.then(result => console.log(result))` logs the final result.",
      ],
      solution: `Promise.resolve(5)
  .then(val => val * 2)
  .then(result => console.log(result))
`,
      solutionOutput: "10",
    },
    {
      actor: "A",
      instruction:
        "Create two promises: one that resolves to First and another that resolves to Second. Use Promise.all to wait for both and log the array of results.",
      match: async (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = await executeCodeAsync(parsed.code)
        if (error) return false
        return output === '["First","Second"]'
      },
      hints: [
        "Create promises: `const p1 = Promise.resolve(\"First\"); const p2 = Promise.resolve(\"Second\");`",
        "Use `Promise.all([p1, p2]).then(results => console.log(results))`",
        "Promise.all returns an array of resolved values in the same order.",
      ],
      solution: `const p1 = Promise.resolve("First")
const p2 = Promise.resolve("Second")
Promise.all([p1, p2]).then(results => console.log(results))
`,
      solutionOutput: "[\"First\",\"Second\"]",
    },
  ],
}
