import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const CLOSURE_TRAP: Scenario = {
  id: "closure-trap",
  phase: "2.1",
  title: "Closure Trap",
  description:
    "Master closures — how inner functions retain access to outer variables, and the classic loop + closure bug.",
  steps: [
    {
      actor: "A",
      instruction:
        "Write a function called createFuncs that returns an array of 3 functions. Each function should return the loop index. Use var for the loop variable. Then call each function and log the results. You'll see all three return 3 because of the closure trap.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length === 3 && lines.every((l) => l === "3")
      },
      solution: `function createFuncs() {
  const funcs = []
  for (var i = 0; i < 3; i++) {
    funcs.push(function() { return i })
  }
  return funcs
}

const fns = createFuncs()
// All three log 3 — var i is shared across closures
console.log(fns[0]())
console.log(fns[1]())
console.log(fns[2]())`,
      hints: [
        "Create an empty array, loop with `for (var i = 0; i < 3; i++)`, push `function() { return i; }`",
        "Return the array from the function, then call each function: `fns[0]()`, `fns[1]()`, `fns[2]()`",
        "All three log 3 because `var i` is shared across all closures.",
      ],
    },
    {
      actor: "A",
      instruction:
        "Now fix the previous code by changing the loop variable declaration from var to let. The output should be 0, 1, 2 instead of three 3s.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length === 3 && lines[0] === "0" && lines[1] === "1" && lines[2] === "2"
      },
      solution: `function createFuncs() {
  const funcs = []
  for (let i = 0; i < 3; i++) {  // Only change: var → let
    funcs.push(function() { return i })
  }
  return funcs
}

const fns = createFuncs()
// Each call returns its own index: 0, 1, 2
console.log(fns[0]())
console.log(fns[1]())
console.log(fns[2]())`,
      hints: [
        "Just change `var i` to `let i` in the for loop — nothing else changes.",
        "let creates a new binding for each iteration, so each closure gets its own `i`.",
        "The output should be 0, 1, 2.",
      ],
    },
    {
      actor: "A",
      instruction:
        "Write a function called createCounter that returns an object with two methods: increment and getCount. The counter value should be private (not accessible directly). Call increment once and log getCount, then call increment again and log getCount again. You should see 1 then 2.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "1" && lines[1] === "2"
      },
      solution: `function createCounter() {
  let count = 0  // Private — not accessible outside
  return {
    increment: function() { count++ },
    getCount: function() { return count }
  }
}

const c = createCounter()
c.increment()
console.log(c.getCount())  // 1
c.increment()
console.log(c.getCount())  // 2`,
      hints: [
        "Create a function that has a local `let count = 0;` variable.",
        "Return an object with `increment() { count++; }` and `getCount() { return count; }`.",
        'Call it like: `const c = createCounter(); c.increment(); console.log(c.getCount()); c.increment(); console.log(c.getCount());`',
      ],
    },
  ],
}
