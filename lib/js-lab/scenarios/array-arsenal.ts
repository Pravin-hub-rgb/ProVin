import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const ARRAY_ARSENAL: Scenario = {
  id: "array-arsenal",
  phase: "4.1",
  title: "Array Arsenal",
  description:
    "Master JavaScript's built-in array methods — map, filter, and reduce — to transform data without loops.",
  steps: [
    {
      actor: "A",
      instruction:
        "Given an array of the numbers 1 through 5, use map to create a new array where each number is doubled. Log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "[2,4,6,8,10]"
      },
      solution: `const nums = [1, 2, 3, 4, 5]
// map transforms each element and returns a new array
console.log(nums.map(n => n * 2))
`,
      solutionOutput: "[\\n  2,\\n  4,\\n  6,\\n  8,\\n  10\\n]",
      hints: [
        "Use `nums.map(n => n * 2)` — map returns a new array without modifying the original.",
        "Don't use a for loop — the exercise is about using map specifically.",
        "Log the result: `console.log(nums.map(n => n * 2))`",
      ],
    },
    {
      actor: "A",
      instruction:
        "Given an array of the numbers 1 through 10, use filter to get only even numbers, then map to square them. Log the final array.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "[4,16,36,64,100]"
      },
      solution: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// filter keeps evens, then map squares them
console.log(nums.filter(n => n % 2 === 0).map(n => n * n))
`,
      solutionOutput: "[\\n  4,\\n  16,\\n  36,\\n  64,\\n  100\\n]",
      hints: [
        "Chain the methods: `nums.filter(n => n % 2 === 0).map(n => n * n)`",
        "filter keeps elements where the callback returns true; map transforms each element.",
        "Expected output: [4, 16, 36, 64, 100]",
      ],
    },
    {
      actor: "A",
      instruction:
        "Given an array of the numbers 10, 20, 30, 40, 50, use reduce to calculate the sum of all numbers. Log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "150"
      },
      solution: `const nums = [10, 20, 30, 40, 50]
// reduce starts at 0 and adds each element
console.log(nums.reduce((acc, curr) => acc + curr, 0))
`,
      solutionOutput: "150",
      hints: [
        "Use `nums.reduce((acc, curr) => acc + curr, 0)` — 0 is the initial accumulator value.",
        "The accumulator starts at 0, and each element is added to it sequentially.",
        "Expected output: 150",
      ],
    },
  ],
}
