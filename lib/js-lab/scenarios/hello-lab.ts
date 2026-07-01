import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const HELLO_LAB: Scenario = {
  id: "hello-lab",
  phase: "0",
  title: "Hello, Lab",
  description: "Get comfortable with the code editor — write your first JavaScript and see it run.",
  steps: [
    {
      actor: "A",
      instruction: `Write code that logs "Hello, Lab!" to the console.`,
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output } = executeCode(parsed.code)
        return output === "Hello, Lab!"
      },
      solution: `console.log("Hello, Lab!")`,
      hints: [
        "Use console.log() to print to the console.",
        "console.log() can take strings, numbers, variables — anything.",
        'Type: console.log("Hello, Lab!")',
      ],
    },
    {
      actor: "A",
      instruction: `Create a variable named "name" with your name, then log it.`,
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output.length > 0 && !output.includes("undefined")
      },
      solution: `let name = "Arjun"
console.log(name)`,
      hints: [
        "Use let or const to declare a variable.",
        'let name = "your name"; console.log(name);',
        'Make sure to pass the variable, not a string literal, to console.log.',
      ],
    },
    {
      actor: "A",
      instruction: `Log a template literal: \`Hello, my name is $\{name}\` using your name variable.`,
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output.startsWith("Hello, my name is ")
      },
      solution: `let name = "Arjun"
console.log(\`Hello, my name is \${name}\`)`,
      hints: [
        "Template literals use backticks (`) and ${} syntax.",
        "First create a name variable, then use it in the template literal.",
        'console.log(`Hello, my name is ${name}`)',
      ],
    },
  ],
}
