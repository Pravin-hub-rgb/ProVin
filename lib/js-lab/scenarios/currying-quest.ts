import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const CURRYING_QUEST: Scenario = {
  id: "currying-quest",
  phase: "6.2",
  title: "Currying Quest",
  description:
    "Learn currying — transform functions that take multiple arguments into a chain of functions that each take one argument.",
  steps: [
    {
      actor: "A",
      instruction:
        "Write a curried arrow function called add that takes a first argument and returns another arrow function that takes a second argument and returns their sum. Call it with 5 and 3 and log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "8"
      },
      solution: `// Curried arrow: outer arrow takes a, inner arrow takes b
const add = (a) => (b) => a + b

console.log(add(5)(3))
`,
      solutionOutput: "8",
      hints: [
        "Curried arrow: `const add = (a) => (b) => a + b;`",
        "Call: `console.log(add(5)(3));` — first call returns a function, second call computes.",
        "This is a closure: the inner arrow captures `a` from the outer scope.",
      ],
    },
    {
      actor: "A",
      instruction:
        "Write a curried function called greet that takes a greeting string and returns a function taking a name that returns a formatted greeting. Create two partial applications: sayHello with Hello and sayHi with Hi. Call both with the name Arjun and log the results. They should produce Hello, Arjun! and Hi, Arjun!.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "Hello, Arjun!" && lines[1] === "Hi, Arjun!"
      },
      solution: `const greet = (greeting) => (name) => greeting + ", " + name + "!"

// Create partial applications
const sayHello = greet("Hello")
const sayHi = greet("Hi")

console.log(sayHello("Arjun"))
console.log(sayHi("Arjun"))
`,
      solutionOutput: "Hello, Arjun!\\nHi, Arjun!",
      hints: [
        "Define: `const greet = (greeting) => (name) => greeting + \", \" + name + \"!\";`",
        "Create partials: `const sayHello = greet(\"Hello\"); const sayHi = greet(\"Hi\");`",
        "Use: `console.log(sayHello(\"Arjun\")); console.log(sayHi(\"Arjun\"));`",
      ],
    },
    {
      actor: "A",
      instruction:
        "Write a curried function called format that takes a prefix and returns a function taking a separator, which returns a function taking a suffix, which returns a function taking a word. The final result should combine them as prefix plus separator plus word plus suffix. Call it with the prefix two left angle brackets, separator dash, suffix two right angle brackets, and word curried. Log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "<<-curried>>"
      },
      solution: `// Each arrow returns the next function until the last one computes
const format = (prefix) => (separator) => (suffix) => (word) =>
  prefix + separator + word + suffix

console.log(format("<<")("-")(">>")("curried"))
`,
      solutionOutput: "<<-curried>>",
      hints: [
        "Triple curried arrow: `const format = (prefix) => (separator) => (suffix) => (word) => prefix + separator + word + suffix;`",
        "Call all at once: `console.log(format(\"<<\")(\"-\")(\">>\")(\"curried\"));`",
        "Each arrow returns a function until the last one computes the result.",
      ],
    },
  ],
}
