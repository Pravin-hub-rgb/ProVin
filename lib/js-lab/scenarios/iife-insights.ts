import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const IIFE_INSIGHTS: Scenario = {
  id: "iife-insights",
  phase: "6.1",
  title: "IIFE Insights",
  description:
    "Learn Immediately Invoked Function Expressions (IIFEs) — create private scopes and run code immediately.",
  steps: [
    {
      actor: "A",
      instruction:
        "Write an IIFE (Immediately Invoked Function Expression) that logs the string IIFE ran!. The function should be anonymous, wrapped in parentheses, and called immediately.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "IIFE ran!"
      },
      hints: [
        "Basic IIFE: `(function() { console.log(\"IIFE ran!\"); })();`",
        "The parentheses around the function turn it into an expression.",
        "The trailing `()` immediately invokes it.",
      ],
      solution: `(function() {
  console.log("IIFE ran!")
})()`,
    },
    {
      actor: "A",
      instruction:
        "Create a counter using an IIFE that returns an object with two methods: increment and getCount. The count variable should be private inside the IIFE. Call increment twice, then log getCount. The result should be 2.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "2"
      },
      hints: [
        "Structure: `const counter = (function() { let count = 0; return { increment() { count++; }, getCount() { return count; } }; })();`",
        "Call: `counter.increment(); counter.increment(); console.log(counter.getCount());`",
        "The variable `count` is not accessible from outside — it's truly private.",
      ],
      solution: `const counter = (function() {
  let count = 0
  return {
    increment() { count++ },
    getCount() { return count }
  }
})()
counter.increment()
counter.increment()
console.log(counter.getCount())  // 2`,
    },
    {
      actor: "A",
      instruction:
        "Write an IIFE that takes a parameter. Pass the string JavaScript into the IIFE and have it log the string I love JavaScript!. The parameter inside the IIFE should be called language.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "I love JavaScript!"
      },
      hints: [
        "IIFE with parameter: `(function(language) { console.log(\"I love \" + language + \"!\"); })(\"JavaScript\");`",
        "The argument \"JavaScript\" is passed into the IIFE at invocation time.",
        "Inside, `language` is a local variable.",
      ],
      solution: `(function(language) {
  console.log("I love " + language + "!")
})("JavaScript")`,    },
  ],
}
