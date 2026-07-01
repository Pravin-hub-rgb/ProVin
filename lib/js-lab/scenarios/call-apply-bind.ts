import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const CALL_APPLY_BIND: Scenario = {
  id: "call-apply-bind",
  phase: "2.3",
  title: "Call, Apply, Bind",
  description:
    "Master the three methods that control the this context in JavaScript: call, apply, and bind.",
  steps: [
    {
      actor: "A",
      instruction:
        "Create an object called person with a property called name set to Alice and a method called greet that takes a greeting parameter and logs the greeting followed by the person's name. Then use the call method to invoke greet with a different name (Bob) as the this context. Log both calls so the output shows Hello, Alice on one line and Hello, Bob on the next.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "Hello, Alice" && lines[1] === "Hello, Bob"
      },
      hints: [
        "Define: `const person = { name: 'Alice', greet(greeting) { console.log(greeting + ', ' + this.name); } }`",
        "Call normally: `person.greet('Hello')` logs Hello, Alice",
        "Use `.call()`: `person.greet.call({ name: 'Bob' }, 'Hello')` logs Hello, Bob — call takes thisArg then arguments individually.",
      ],
      solution: `const person = {
  name: "Alice",
  greet(greeting) {
    console.log(greeting + ", " + this.name)
  }
}
person.greet("Hello")
person.greet.call({ name: "Bob" }, "Hello")`,
    },
    {
      actor: "A",
      instruction:
        "Use the same person object from the previous step. This time, use the apply method to invoke greet with a different name (Charlie) as the this context, passing the greeting as an array. Then use apply with Math.max to find the largest number in the array [4, 9, 2, 11, 6]. Log both results. The output should show Hello, Charlie on the first line and 11 on the second.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "Hello, Charlie" && lines[1] === "11"
      },
      hints: [
        "Start with the same person object from step 1",
        "For greet: `person.greet.apply({ name: 'Charlie' }, ['Hello'])` — apply takes thisArg then arguments array",
        "For Math.max: `Math.max.apply(null, [4, 9, 2, 11, 6])` returns 11 — no this needed so pass null",
      ],
      solution: `const person = {
  name: "Alice",
  greet(greeting) {
    console.log(greeting + ", " + this.name)
  }
}
person.greet.apply({ name: "Charlie" }, ["Hello"])
console.log(Math.max.apply(null, [4, 9, 2, 11, 6]))`,
    },
    {
      actor: "A",
      instruction:
        "Create a product object with a property called discount set to 0.1 and a method called applyDiscount that takes a price and returns the discounted price (price * (1 - this.discount)). Then extract the method into a variable and use bind to permanently fix this to the product object. Log the result of calling the bound function with a price of 100. The output should be 90.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "90"
      },
      hints: [
        "Define: `const product = { discount: 0.1, applyDiscount(price) { return price * (1 - this.discount); } }`",
        "Extract the method then bind it: `const boundFn = product.applyDiscount.bind(product);`",
        "Then `console.log(boundFn(100))` → 90 — bind permanently fixes this",
      ],
      solution: `const product = {
  discount: 0.1,
  applyDiscount(price) {
    return price * (1 - this.discount)
  }
}
const boundFn = product.applyDiscount.bind(product)
console.log(boundFn(100))`,
    },
  ],
}
