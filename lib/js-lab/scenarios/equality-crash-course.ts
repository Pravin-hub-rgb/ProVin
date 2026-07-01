import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const EQUALITY_CRASH_COURSE: Scenario = {
  id: "equality-crash-course",
  phase: "1.5",
  title: "Type Coercion & Equality",
  description:
    "Master the difference between == and ===, understand type coercion, and learn why strict equality is the golden rule.",
  steps: [
    {
      actor: "A",
      instruction:
        "Compare the string 5 with the number 5 using strict equality. Then compare the number 0 with the boolean false using strict equality. Log both results. Both should be false.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines.every((l) => l === "false")
      },
      hints: [
        'Use `console.log("5" === 5)` — no type coercion with ===.',
        'Then `console.log(0 === false)` — different types, so false.',
        "Strict equality checks both value AND type.",
      ],
      solution: `// Strict equality checks value AND type - no coercion
console.log("5" === 5)    // string vs number => false
console.log(0 === false)  // number vs boolean => false`,
    },
    {
      actor: "A",
      instruction:
        "Now try the same comparisons with loose equality. Compare the string 5 with the number 5. Then compare the number 0 with the boolean false. Log both. Notice how loose equality converts types before comparing.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines.every((l) => l === "true")
      },
      hints: [
        'Use `console.log("5" == 5)` — coercion makes \"5\" become 5.',
        'Then `console.log(0 == false)` — false becomes 0.',
        "Loose equality is unpredictable — this is why we always use ===.",
      ],
      solution: `// Loose equality converts types before comparing
console.log("5" == 5)     // "5" becomes 5 => true
console.log(0 == false)   // false becomes 0 => true`,
    },
    {
      actor: "A",
      instruction:
        "Compare null and undefined using both loose equality and strict equality. Log the results. One returns true, the other false. This is the one special case in the language.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "true" && lines[1] === "false"
      },
      solution: `// Special case: null and undefined are only == to each other
console.log(null == undefined)   // true (special rule)
console.log(null === undefined)  // false (different types)`,
      hints: [
        "First compare with ==: `console.log(null == undefined)`",
        "Then with ===: `console.log(null === undefined)`",
        "null == undefined is true (special rule). null === undefined is false (different types).",
      ],
    },
  ],
}
