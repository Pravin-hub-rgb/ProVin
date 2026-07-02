import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const MAP_MASTERY: Scenario = {
  id: "map-mastery",
  phase: "5.4",
  title: "Map Mastery",
  description:
    "Learn the Map data structure — store key-value pairs with any type of key, unlike plain objects.",
  steps: [
    {
      actor: "A",
      instruction:
        "Create a Map called scores. Add three entries: Alice maps to 95, Bob maps to 82, Charlie maps to 73. Then log Alice's score using the get method, and log the total number of entries using the size property.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "95" && lines[1] === "3"
      },
      hints: [
        "Create: `const scores = new Map();`",
        "Add entries: `scores.set(\"Alice\", 95); scores.set(\"Bob\", 82); scores.set(\"Charlie\", 73);`",
        "Log: `console.log(scores.get(\"Alice\")); console.log(scores.size);`",
      ],
      solution: `const scores = new Map()
scores.set("Alice", 95)
scores.set("Bob", 82)
scores.set("Charlie", 73)
console.log(scores.get("Alice"))  // 95
console.log(scores.size)          // 3
`,
      solutionOutput: "95\\n3",
    },
    {
      actor: "A",
      instruction:
        "Create a Map where the keys are objects. Create two objects with an id property — one with id 1 and another with id 2. Set each as a key in the Map with values object-value-1 and object-value-2 respectively. Then log the value for the first key. This demonstrates that objects work as Map keys.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "object-value-1"
      },
      hints: [
        "Create objects and Map: `const m = new Map(); const key1 = { id: 1 }; const key2 = { id: 2 };`",
        "Set: `m.set(key1, \"object-value-1\"); m.set(key2, \"object-value-2\");`",
        "Log: `console.log(m.get(key1));`",
      ],
      solution: `const m = new Map()
const key1 = { id: 1 }
const key2 = { id: 2 }
m.set(key1, "object-value-1")
m.set(key2, "object-value-2")
console.log(m.get(key1))  // "object-value-1"
`,
      solutionOutput: "object-value-1",
    },
    {
      actor: "A",
      instruction:
        "Create a Map initialized with three entries: alice (25), bob (30), charlie (35). Iterate over it using the forEach method and log each name and age in the format name is age years old. Also log the final count using the size property.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return (
          lines.length === 4 &&
          lines[0] === "alice is 25 years old" &&
          lines[1] === "bob is 30 years old" &&
          lines[2] === "charlie is 35 years old" &&
          lines[3] === "3"
        )
      },
      hints: [
        "forEach: `users.forEach((age, name) => console.log(name + \" is \" + age + \" years old\"));`",
        "The forEach callback receives (value, key) in that order.",
        "Log `.size` after the forEach.",
      ],
      solution: `const users = new Map([
  ["alice", 25],
  ["bob", 30],
  ["charlie", 35]
])
users.forEach((age, name) => console.log(name + " is " + age + " years old"))
console.log(users.size)  // 3
`,
      solutionOutput: "alice is 25 years old\\nbob is 30 years old\\ncharlie is 35 years old\\n3",
    },
  ],
}
