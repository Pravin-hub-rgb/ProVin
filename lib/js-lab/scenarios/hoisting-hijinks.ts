import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const HOISTING_HIJINKS: Scenario = {
  id: "hoisting-hijinks",
  phase: "1.4",
  title: "Hoisting",
  description:
    "Learn how JavaScript moves declarations to the top of their scope before execution — and how var, let, const, and functions are hoisted differently.",
  steps: [
    {
      actor: "A",
      instruction:
        'Write code that demonstrates var hoisting: log a variable x before declaring it with var, then assign it the value "hoisted" and log it again.',
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "undefined\nhoisted"
      },
      hints: [
        'Start with `console.log(x)` BEFORE declaring `var x = "hoisted"`.',
        'Then `console.log(x)` AFTER the declaration.',
        "With var, the declaration is hoisted but the assignment stays — so the first log is undefined.",
      ],
      solution: `// var is hoisted to the top (but not its assignment)
console.log(x)           // undefined — declared but not yet assigned
var x = "hoisted"
console.log(x)           // "hoisted" — now assigned
`,
      solutionOutput: "undefined\\nhoisted",
    },
    {
      actor: "A",
      instruction:
        'Write code that demonstrates the Temporal Dead Zone with let: try to log a variable named car with the value "Tesla" before declaring it with let. Then fix it by logging after declaration.',
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "Tesla" && parsed.code.includes("let")
      },
      hints: [
        "First demonstrate the error (log car before declaration), then fix it.",
        'Correct version: `let car = "Tesla"; console.log(car);`',
        "let IS hoisted, but you can't access it before the declaration line (TDZ).",
      ],
      solution: `// With let, declaration must come before access (no TDZ)
let car = "Tesla"        // Declare first
console.log(car)         // "Tesla"
`,
      solutionOutput: "Tesla",
    },
    {
      actor: "A",
      instruction:
        "Write code that demonstrates function declaration hoisting. Call a function called sayHi before declaring it with the value 'Hi!'.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "Hi!"
      },
      hints: [
        "Call `sayHi()` BEFORE the function declaration.",
        'Create: `function sayHi() { console.log("Hi!"); }`',
        "Function declarations are fully hoisted — you can call them from anywhere in their scope.",
      ],
      solution: `// Function declaration is hoisted — can call before definition
sayHi()
function sayHi() {
  console.log("Hi!")
}
`,
      solutionOutput: "Hi!",
    },
  ],
}