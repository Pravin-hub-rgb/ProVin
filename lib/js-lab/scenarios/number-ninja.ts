import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const NUMBER_NINJA: Scenario = {
  id: "number-ninja",
  phase: "5.1",
  title: "Number Ninja",
  description:
    "Master JavaScript number methods — parsing strings to numbers, formatting decimals, and detecting NaN/Infinity.",
  steps: [
    {
      actor: "A",
      instruction:
        "Given the string 42.99 representing a price, use parseFloat to convert it to a number, then round to 1 decimal place. Log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "43.0"
      },
      hints: [
        "Use `parseFloat(price)` to convert the string to a number.",
        "Chain `.toFixed(1)` to round: `parseFloat(price).toFixed(1)`",
        "Expected: `\"43.0\"`",
      ],
      solution: `const price = "42.99"
console.log(parseFloat(price).toFixed(1))`
    },
    {
      actor: "A",
      instruction:
        "Write a function called safeNumber that takes a value and returns the number if it's finite, or 0 if it's NaN, Infinity, or -Infinity. Use isFinite. Test it with the string hello, Infinity, and the number 42. Log all three results.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 3 && lines[0] === "0" && lines[1] === "0" && lines[2] === "42"
      },
      hints: [
        "Define: `function safeNumber(value) { return isFinite(value) ? value : 0; }`",
        "Test: `console.log(safeNumber(\"hello\")); console.log(safeNumber(Infinity)); console.log(safeNumber(42));`",
        "isFinite returns false for NaN, Infinity, -Infinity.",
      ],
      solution: `function safeNumber(value) {
  return isFinite(value) ? value : 0
}
console.log(safeNumber("hello"))    // 0 — NaN
console.log(safeNumber(Infinity))   // 0
console.log(safeNumber(42))         // 42`,
    },
    {
      actor: "A",
      instruction:
        "Write a function called randomInRange that takes min and max and returns a random integer between them inclusive. Test it by calling it 5 times with 1 and 10 as arguments and logging each result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        if (lines.length !== 5) return false
        return lines.every((l) => !isNaN(Number(l)) && Number(l) >= 1 && Number(l) <= 10)
      },
      hints: [
        "Use `Math.floor(Math.random() * (max - min + 1)) + min`",
        "Math.random() gives 0 to <1, multiply by range size, floor it, add min.",
        "Call 5 times in a loop: `for (let i = 0; i < 5; i++) console.log(randomInRange(1, 10));`",
      ],
      solution: `function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
for (let i = 0; i < 5; i++) {
  console.log(randomInRange(1, 10))
}`,    },
  ],
}
