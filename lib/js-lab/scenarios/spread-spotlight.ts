import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const SPREAD_SPOTLIGHT: Scenario = {
  id: "spread-spotlight",
  phase: "4.3",
  title: "Spread Spotlight",
  description:
    "Learn the spread (`...`) and rest (`...`) operators — expand arrays, merge objects, and capture remaining parameters.",
  steps: [
    {
      actor: "A",
      instruction:
        "Given two arrays: one with numbers 1, 2, 3 and another with numbers 4, 5, 6, use the spread operator to combine them into a single array. Log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "[1,2,3,4,5,6]"
      },
      hints: [
        "Use `const combined = [...arr1, ...arr2]` — the spread expands each array inline.",
        "This is cleaner than `arr1.concat(arr2)`.",
        "Log the combined array.",
      ],
      solution: `const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const combined = [...arr1, ...arr2]
console.log(combined)`,
    },
    {
      actor: "A",
      instruction:
        "Given two objects: one with properties theme (light) and fontSize (14), and another with properties theme (dark) and showSidebar (true), merge them into one object. The second object's values should win for duplicate keys. Log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return (
          output.includes('"theme"') &&
          output.includes("dark") &&
          output.includes("fontSize") &&
          output.includes("showSidebar")
        )
      },
      hints: [
        "Use `const config = { ...defaults, ...overrides }` — later spreads override earlier ones.",
        "The result should have theme: 'dark', fontSize: 14, showSidebar: true.",
        "Log the merged object.",
      ],
      solution: `const defaults = { theme: "light", fontSize: 14 }
const overrides = { theme: "dark", showSidebar: true }
const config = { ...defaults, ...overrides }
console.log(config)`,
    },
    {
      actor: "A",
      instruction:
        "Write a function called sumAll that takes any number of arguments using the rest parameter and returns their sum. Call it with the arguments 1, 2, 3, 4, 5 and log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "15" && parsed.code.includes("...")
      },
      hints: [
        "Define: `function sumAll(...nums) { return nums.reduce((a, b) => a + b, 0); }`",
        "The rest parameter `...nums` collects all arguments into an array.",
        "Call and log: `console.log(sumAll(1, 2, 3, 4, 5));`",
      ],
      solution: `function sumAll(...nums) {
  return nums.reduce((a, b) => a + b, 0)
}
console.log(sumAll(1, 2, 3, 4, 5))`,    },
  ],
}
