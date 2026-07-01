import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const TEMPLATE_POWER: Scenario = {
  id: "template-power",
  phase: "1.7",
  title: "Template Literals",
  description:
    "Ditch string concatenation forever. Learn template literals — interpolation, expressions, and multiline strings with backticks.",
  steps: [
    {
      actor: "A",
      instruction:
        "Create variables called name with value Arjun and age with value 22. Log a template literal that produces the string Hello, Arjun! You are 22 years old. using interpolation syntax.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "Hello, Arjun! You are 22 years old." && parsed.code.includes("`")
      },
      hints: [
        'Template literals use backtick (`) characters, not quotes.',
        'Syntax: `` `Hello, ${name}! You are ${age} years old.` ``',
        "Use `let name = \"Arjun\"; let age = 22;` then console.log with backticks.",
      ],
      solution: `let name = "Arjun"
let age = 22
console.log(\`Hello, \${name}! You are \${age} years old.\`)`,
    },
    {
      actor: "A",
      instruction:
        "Create a variable called age with value 20. Use a ternary operator inside a template literal to log the string You are adult if age is 18 or older, otherwise log You are minor.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "You are adult" && parsed.code.includes("?") && parsed.code.includes("`")
      },
      hints: [
        "You can put any expression inside `${}`, including ternary operators.",
        'Example: `` `You are ${age >= 18 ? "adult" : "minor"}` ``',
        "Set `let age = 20;` first.",
      ],
      solution: `let age = 20
console.log(\`You are \${age >= 18 ? "adult" : "minor"}\`)`,
    },
    {
      actor: "A",
      instruction:
        "Create a multiline string using a template literal that has at least 3 lines. It could represent a simple HTML snippet or a poem. Log it to see the newlines preserved.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n")
        const hasNewlines = output.includes("\n")
        return hasNewlines && lines.length >= 3
      },
      hints: [
        "Multiline template literals just need actual line breaks inside the backticks.",
        'Example: `` `line 1\nline 2\nline 3` `` — but with real line breaks.',
        "Try: `` `Hello\nWorld\n!` `` and log it.",
      ],
      solution: "console.log(`Hello\nWorld\n!`)",
    },
  ],
}
