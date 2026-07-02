import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const SET_SPOTLIGHT: Scenario = {
  id: "set-spotlight",
  phase: "5.5",
  title: "Set Spotlight",
  description:
    "Learn the Set data structure — store unique values of any type, perfect for deduplication.",
  steps: [
    {
      actor: "A",
      instruction:
        "Given an array with numbers 1, 2, 2, 3, 4, 4, 5, 5, 5 (with duplicates), create a Set from it to remove duplicates. Convert the Set back to an array using the spread operator and log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "[1,2,3,4,5]"
      },
      hints: [
        "Create Set: `const unique = new Set(numbers)` — duplicates are automatically removed.",
        "Convert back to array: `const result = [...unique]`",
        "Log the result array.",
      ],
      solution: `const numbers = [1, 2, 2, 3, 4, 4, 5, 5, 5]
const unique = new Set(numbers)
const result = [...unique]
console.log(result)
`,
      solutionOutput: "[\\n  1,\\n  2,\\n  3,\\n  4,\\n  5\\n]",
    },
    {
      actor: "A",
      instruction:
        "Given two arrays: one with numbers 1 through 5 and another with numbers 4 through 8, find their intersection (values present in both). Use a Set for efficient lookup. Log the intersection array.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "[4,5]"
      },
      hints: [
        "Create a Set from array `b`: `const setB = new Set(b)`",
        "Filter array `a`: `a.filter(item => setB.has(item))`",
        "Set.has() is O(1) — much faster than array.includes().",
      ],
      solution: `const a = [1, 2, 3, 4, 5]
const b = [4, 5, 6, 7, 8]
const setB = new Set(b)
const intersection = a.filter(item => setB.has(item))
console.log(intersection)
`,
      solutionOutput: "[\\n  4,\\n  5\\n]",
    },
    {
      actor: "A",
      instruction:
        "Given two arrays: one with numbers 1 through 8 and another with the even numbers 2, 4, 6, 8, find the difference (elements in the first array but not in the second). Use a Set for the second array. Log the resulting array.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "[1,3,5,7]"
      },
      hints: [
        "Create a Set from exclude: `const excludeSet = new Set(exclude)`",
        "Filter all: `all.filter(item => !excludeSet.has(item))`",
        "Expected: [1, 3, 5, 7]",
      ],
      solution: `const all = [1, 2, 3, 4, 5, 6, 7, 8]
const exclude = [2, 4, 6, 8]
const excludeSet = new Set(exclude)
const difference = all.filter(item => !excludeSet.has(item))
console.log(difference)
`,
      solutionOutput: "[\\n  1,\\n  3,\\n  5,\\n  7\\n]",
    },
  ],
}
