import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const DESTRUCTURE_DECISION: Scenario = {
  id: "destructure-decision",
  phase: "4.2",
  title: "Destructure Decision",
  description:
    "Learn array and object destructuring — extract values from arrays and objects with elegant, concise syntax.",
  steps: [
    {
      actor: "A",
      instruction:
        "Swap the values of two variables called a and b using array destructuring without a temporary variable. Start with a equal to 5 and b equal to 10. Log both after swapping — they should be 10 and 5.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "10" && lines[1] === "5"
      },
      solution: `let a = 5, b = 10
// Swap using array destructuring — no temp variable needed
;[a, b] = [b, a]
console.log(a)
console.log(b)
`,
      solutionOutput: "10\\n5",
      hints: [
        "Use `[a, b] = [b, a]` — this creates a temporary array and destructures it back.",
        "No need for a temp variable like `let temp = a; a = b; b = temp;`",
        "Log a first, then b: `console.log(a); console.log(b);`",
      ],
    },
    {
      actor: "A",
      instruction:
        "Given an object with properties name (Arjun), age (25), and city (Mumbai), destructure name and city from the object. Rename name to fullName during destructuring. Log both.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "Arjun" && lines[1] === "Mumbai" && parsed.code.includes("fullName")
      },
      solution: `const user = { name: "Arjun", age: 25, city: "Mumbai" }
// Rename name to fullName during destructuring
const { name: fullName, city } = user
console.log(fullName)
console.log(city)
`,
      solutionOutput: "Arjun\\nMumbai",
      hints: [
        "Destructure with renaming: `const { name: fullName, city } = user`",
        "Now `fullName` holds the value of `user.name`.",
        "Log `fullName` then `city`.",
      ],
    },
    {
      actor: "A",
      instruction:
        "Given a nested object with a user property that has a profile containing firstName (Neha) and lastName (Shah), destructure firstName and lastName in a single statement. Log them both.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "Neha" && lines[1] === "Shah"
      },
      solution: `const data = { user: { profile: { firstName: "Neha", lastName: "Shah" }, age: 30 } }
// Nested destructuring pulls firstName and lastName from 3 levels deep
const { user: { profile: { firstName, lastName } } } = data
console.log(firstName)
console.log(lastName)
`,
      solutionOutput: "Neha\\nShah",
      hints: [
        "Nested destructuring: `const { user: { profile: { firstName, lastName } } } = data`",
        "This extracts firstName and lastName from three levels deep.",
        "Log them both in order.",
      ],
    },
  ],
}
