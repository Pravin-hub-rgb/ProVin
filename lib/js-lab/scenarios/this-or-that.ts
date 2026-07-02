import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const THIS_OR_THAT: Scenario = {
  id: "this-or-that",
  phase: "2.2",
  title: "This or That",
  description:
    "Understand how `this` works in different contexts — object methods, regular functions, and arrow functions.",
  steps: [
    {
      actor: "A",
      instruction:
        "Create an object called obj with a property called value set to 42 and a method called getValue that returns this.value. Call obj.getValue and log it. Then assign the method to a variable called fn and call fn on its own — see how this changes.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "42" && lines[1] !== "42"
      },
      hints: [
        "Define: `const obj = { value: 42, getValue: function() { return this.value; } }`",
        "Call as method first: `console.log(obj.getValue())` → 42",
        "Then detach: `const fn = obj.getValue; console.log(fn())` → undefined (this is global)",
      ],
      solution: `const obj = {
  value: 42,
  getValue: function() { return this.value }
}
console.log(obj.getValue())
const fn = obj.getValue
console.log(fn())
`,
      solutionOutput: "42\\nundefined",
    },
    {
      actor: "A",
      instruction:
        "Fix the this bug from the previous step. Use the bind method to create a new function with this permanently set to the object. Then call the bound function and log the result. The output should be 42.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "42"
      },
      hints: [
        "Start with the same object: `const obj = { value: 42, getValue: function() { return this.value; } }`",
        "Create a bound version: `const boundFn = obj.getValue.bind(obj);`",
        "Then `console.log(boundFn())` should return 42.",
      ],
      solution: `const obj = {
  value: 42,
  getValue: function() { return this.value }
}
const boundFn = obj.getValue.bind(obj)
console.log(boundFn())
`,
      solutionOutput: "42",
    },
    {
      actor: "A",
      instruction:
        "Create an object with two methods: a regular function that returns this.value, and an arrow function that tries to return this.value. Call both and log the results. See the difference in how this behaves.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "42" && lines[1] !== "42"
      },
      solution: `const obj = {
  value: 42,
  regular: function() { return this.value },
  arrow: () => this.value
}
console.log(obj.regular())  // 42 — regular function gets this from object
console.log(obj.arrow())    // undefined — arrow inherits this from outer scope
`,
      solutionOutput: "42\\nundefined",
      hints: [
        "Create: `const obj = { value: 42, regular: function() { return this.value; }, arrow: () => this.value }`",
        "Call both: `console.log(obj.regular()); console.log(obj.arrow());`",
        "Arrow functions inherit `this` from the surrounding scope (global), not from the object.",
      ],
    },
  ],
}
