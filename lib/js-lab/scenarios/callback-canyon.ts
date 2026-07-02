import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const CALLBACK_CANYON: Scenario = {
  id: "callback-canyon",
  phase: "3.3",
  title: "Callback Canyon",
  description:
    "Master callbacks — pass functions as arguments, use them for custom behavior, and build higher-order functions.",
  steps: [
    {
      actor: "A",
      instruction:
        "Write a function called processArray that takes an array and a callback function. It should call the callback with each element and log the result. Test it with the array 1, 2, 3 and a callback that doubles each number.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 3 && lines[0] === "2" && lines[1] === "4" && lines[2] === "6"
      },
      solution: `function processArray(arr, callback) {
  arr.forEach(item => console.log(callback(item)))
}

processArray([1, 2, 3], function(n) { return n * 2 })
`,
      solutionOutput: "2\\n4\\n6",
      hints: [
        "Define: `function processArray(arr, callback) { arr.forEach(item => console.log(callback(item))); }`",
        "Call: `processArray([1, 2, 3], function(n) { return n * 2; });`",
        "The callback is called for each element, and its return value is logged.",
      ],
    },
    {
      actor: "A",
      instruction:
        "Write a higher-order function called createMultiplier that takes a factor and returns a new function. The returned function should take a number and return it multiplied by that factor. Use it to create two functions called double and triple, then log the result of calling double with 5 and triple with 5.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "10" && lines[1] === "15"
      },
      solution: `function createMultiplier(factor) {
  // Returns a new function that remembers factor via closure
  return function(n) { return n * factor }
}

const double = createMultiplier(2)
const triple = createMultiplier(3)
console.log(double(5))
console.log(triple(5))
`,
      solutionOutput: "10\\n15",
      hints: [
        "Define: `function createMultiplier(factor) { return function(n) { return n * factor; }; }`",
        "Create: `const double = createMultiplier(2); const triple = createMultiplier(3);`",
        "Log: `console.log(double(5)); console.log(triple(5));`",
      ],
    },
    {
      actor: "A",
      instruction:
        "Write a function called filterStrings that takes an array and a callback. The callback should return true for strings longer than 3 characters. Test it with the array containing hi, hello, hey, greetings. Log the filtered array.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === '["hello","greetings"]'
      },
      solution: `function filterStrings(arr, callback) {
  return arr.filter(callback)
}

console.log(filterStrings(["hi", "hello", "hey", "greetings"], function(s) { return s.length > 3 }))
`,
      solutionOutput: "[\\n  \"hello\",\\n  \"greetings\"\\n]",
      hints: [
        "Define: `function filterStrings(arr, callback) { return arr.filter(callback); }`",
        "Call with inline callback: `filterStrings([\"hi\", \"hello\", \"hey\", \"greetings\"], function(s) { return s.length > 3; })`",
        "Log the result.",
      ],
    },
  ],
}
