import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const OPTIONAL_ODYSSEY: Scenario = {
  id: "optional-odyssey",
  phase: "4.4",
  title: "Optional Odyssey",
  description:
    "Learn optional chaining (`?.`) and nullish coalescing (`??`) — safely access nested properties and provide defaults.",
  steps: [
    {
      actor: "A",
      instruction:
        "Create an object with a profile property that contains name (Arjun). Log the profile name using optional chaining. Then try logging a nested address city using optional chaining — it should output undefined instead of throwing an error. Log both results.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "Arjun" && lines[1] === "undefined"
      },
      hints: [
        "Use `user?.profile?.name` for the first log, and `user?.profile?.address?.city` for the second.",
        "Optional chaining returns `undefined` instead of throwing when a property doesn't exist.",
        "Log both values in order.",
      ],
      solution: `const user = { profile: { name: "Arjun" } }
console.log(user?.profile?.name)             // "Arjun"
console.log(user?.profile?.address?.city)     // undefined — no error
`,
      solutionOutput: "Arjun\\nundefined",
    },
    {
      actor: "A",
      instruction:
        "Create an object with properties value (null), text (hello), and count (0). Write three log statements that use nullish coalescing to provide defaults: for value use default, for text use default, for count use 99. Observe how the nullish coalescing operator treats null/undefined vs other falsy values.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 3 && lines[0] === "default" && lines[1] === "hello" && lines[2] === "0"
      },
      hints: [
        "`??` only checks for `null` or `undefined` — not other falsy values like `0` or `\"\"`.",
        "So `input.count ?? 99` returns `0` (not 99) because 0 is not nullish.",
        "Log all three in order.",
      ],
      solution: `const input = { value: null, text: "hello", count: 0 }
console.log(input.value ?? "default")  // "default" — null
console.log(input.text ?? "default")   // "hello" — not nullish
console.log(input.count ?? 99)         // 0 — 0 is not nullish
`,
      solutionOutput: "default\\nhello\\n0",
    },
    {
      actor: "A",
      instruction:
        "Combine optional chaining and nullish coalescing. Create an object where the user property is null. Safely access the user name and provide Guest as the default. Log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "Guest"
      },
      hints: [
        "Use `data?.user?.name ?? \"Guest\"` — optional chaining handles the null user, nullish coalescing provides the fallback.",
        "Without `?.`, `data.user` would throw because data.user is null.",
        "Log the result.",
      ],
      solution: `const data = { user: null }
console.log(data?.user?.name ?? "Guest")  // "Guest" — safely handles null user
`,
      solutionOutput: "Guest",
    },
  ],
}
