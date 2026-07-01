import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const FUNCTION_FORMS: Scenario = {
  id: "function-forms",
  phase: "1.6",
  title: "Functions: All Forms",
  description:
    "Learn the three ways to write functions in JavaScript — declarations, expressions, and arrows — plus default and rest parameters.",
  steps: [
    {
      actor: "A",
      instruction:
        "Write a function declaration called add that takes two parameters and returns their sum. Call it with the arguments 2 and 3 and log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "5"
      },
      solution: `function add(a, b) {
  return a + b
}
console.log(add(2, 3))`,
      hints: [
        "Use `function add(a, b) { return a + b; }`",
        "Call it: `console.log(add(2, 3));`",
        "Function declarations are fully hoisted — you can call them before the definition.",
      ],
    },
    {
      actor: "A",
      instruction:
        "Convert the add function into an arrow function assigned to a constant variable. Use the implicit return shorthand — no return keyword, no curly braces.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output.length > 0 && !isNaN(Number(output)) && parsed.code.includes("=>")
      },
      solution: `// Arrow function with implicit return (no curly braces, no return)
const add = (a, b) => a + b
console.log(add(4, 6))`,
      hints: [
        "Arrow function syntax: `const add = (a, b) => a + b;`",
        "No curly braces needed for a single expression — it returns automatically.",
        "Call it with `console.log(add(4, 6))`",
      ],
    },
    {
      actor: "A",
      instruction:
        "Write a function called greet with a default parameter where the default value is stranger. It should return a greeting that includes the name. Call it twice — once with no argument (output should be Hello, stranger) and once with the argument Alex (output should be Hello, Alex). Log both results.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "Hello, stranger" && lines[1] === "Hello, Alex"
      },
      solution: `function greet(name = "stranger") {
  return "Hello, " + name
}
console.log(greet())      // Uses default: stranger
console.log(greet("Alex"))`,
      hints: [
        'Function with default: `function greet(name = "stranger") { return `Hello, ${name}`; }`',
        "Call with no arg: `console.log(greet());`",
        "Then with arg: `console.log(greet(\"Alex\"));`",
      ],
    },
  ],
}
