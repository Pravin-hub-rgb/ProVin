import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const MATH_MAGICIAN: Scenario = {
  id: "math-magician",
  phase: "5.2",
  title: "Math Magician",
  description:
    "Explore the Math object — rounding, absolute values, powers, and finding min/max in arrays.",
  steps: [
    {
      actor: "A",
      instruction:
        "Given an array of numbers 4.7, 4.2, -3.8, -3.2, use the Math methods round, floor, ceil, and trunc on each number. Log the results of rounding 4.7, flooring 4.7, ceiling 4.7, and truncating -3.8 in that order.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 4 && lines[0] === "5" && lines[1] === "4" && lines[2] === "5" && lines[3] === "-3"
      },
      hints: [
        "Math.round(4.7) → 5, Math.floor(4.7) → 4, Math.ceil(4.7) → 5",
        "Math.trunc(-3.8) → -3 (trunc removes decimals toward zero, floor goes down to -4)",
        "Log each result on its own line.",
      ],
      solution: `console.log(Math.round(4.7))   // 5
console.log(Math.floor(4.7))   // 4
console.log(Math.ceil(4.7))    // 5
console.log(Math.trunc(-3.8))  // -3
`,
      solutionOutput: "5\\n4\\n5\\n-3",
    },
    {
      actor: "A",
      instruction:
        "Given an array of numbers 23, 45, 12, 67, 34, 89, 5, use Math.max and Math.min with the spread operator to find the highest and lowest values. Log both results.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "89" && lines[1] === "5"
      },
      hints: [
        "Math.max and Math.min take individual arguments, not arrays.",
        "Spread the array: `Math.max(...numbers)` and `Math.min(...numbers)`",
        "Log max first, then min.",
      ],
      solution: `const numbers = [23, 45, 12, 67, 34, 89, 5]
console.log(Math.max(...numbers))  // 89
console.log(Math.min(...numbers))  // 5
`,
      solutionOutput: "89\\n5",
    },
    {
      actor: "A",
      instruction:
        "Write a function called calculateCircleArea that takes a radius and returns the area of a circle. Use Math.PI. Then call it with radius 5 and round to 2 decimal places. Log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "78.54"
      },
      hints: [
        "Area = Math.PI * radius * radius, or Math.PI * radius ** 2",
        "Chain `.toFixed(2)` to get 2 decimal places.",
        "Expected: 78.54 (Math.PI * 25 ≈ 78.5398...)",
      ],
      solution: `function calculateCircleArea(radius) {
  return Math.PI * radius ** 2
}
console.log(calculateCircleArea(5).toFixed(2))  // "78.54"
`,
      solutionOutput: "78.54",
    },
  ],
}
