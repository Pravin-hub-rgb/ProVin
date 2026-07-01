import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const HOISTING_HIJINKS: Scenario = {
  id: "hoisting-hijinks",
  phase: "1.4",
  title: "Hoisting & the TDZ",
  description:
    "Explore JavaScript's two-pass execution: hoisting, the Temporal Dead Zone, and how function declarations vs expressions behave.",
  steps: [
    {
      actor: "A",
      instruction:
        'Write code that accesses a variable declared with var before its declaration line, then log it again after. Use a variable with the string value I\'m hoisted! and log it both before and after the declaration. The first log should be undefined, the second should be I\'m hoisted!.',
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "undefined\nI'm hoisted!"
      },
      solution: `// var is hoisted to the top (but not its assignment)
console.log(x)           // undefined — declared but not yet assigned
var x = "I'm hoisted!"
console.log(x)           // "I'm hoisted!"`,
      hints: [
        'First call `console.log(x);` before declaring... `var x = "I\'m hoisted!";`',
        "Then log it again after: `console.log(x);`",
        "The first log shows `undefined`, the second shows the actual value.",
      ],
    },
    {
      actor: "A",
      instruction:
        'Fix the Temporal Dead Zone error. The broken version tries to log a variable declared with let before declaring it. Write the correct version where the declaration with value Tesla comes before the log.',
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "Tesla"
      },
      solution: `// With let, declaration must come before access (no TDZ)
let car = "Tesla"        // Declare first
console.log(car)          // Then log`,
      hints: [
        'Declare `let car = "Tesla";` first.',
        "Then call `console.log(car);` after the declaration.",
        "With let/const, you must declare before using — no TDZ violation.",
      ],
    },
    {
      actor: "A",
      instruction:
        'Write a function declaration that logs the string hoisted and call it before its definition line. Then write a function expression assigned to a constant that logs the string expression and call it after its definition. This shows hoisting works for declarations but not expressions.',
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.includes("hoisted") && lines.includes("expression")
      },
      solution: `// Function declaration is hoisted — can call before definition
sayHi()
function sayHi() { console.log("hoisted") }

// Function expression is NOT hoisted — must define first
const greet = function() { console.log("expression") }
greet()`,
      hints: [
        "First call a function before it's defined: `sayHi();`",
        'Then define it as: `function sayHi() { console.log("hoisted"); }`',
        'For the expression: `const greet = function() { console.log("expression"); }; greet();`',
      ],
    },
  ],
}
