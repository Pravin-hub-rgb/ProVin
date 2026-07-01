import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const PROTOTYPE_PUZZLE: Scenario = {
  id: "prototype-puzzle",
  phase: "2.4",
  title: "Prototype Puzzle",
  description:
    "Understand JavaScript's prototype chain — how property lookup works, and how to share methods via prototypes.",
  steps: [
    {
      actor: "A",
      instruction:
        "Create two objects: animal with a method called breathe that returns the string breathing, and dog with a method called bark that returns the string woof. Set dog's prototype to animal, then call and log both dog's bark method and dog's breathe method (inherited from animal).",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "woof" && lines[1] === "breathing"
      },
      hints: [
        "Create animal: `const animal = { breathe() { return \"breathing\"; } }`",
        "Create dog: `const dog = { bark() { return \"woof\"; } }`",
        "Link them: `Object.setPrototypeOf(dog, animal)`, then log both calls.",
      ],
      solution: `const animal = {
  breathe() { return "breathing" }
}
const dog = {
  bark() { return "woof" }
}
Object.setPrototypeOf(dog, animal)
console.log(dog.bark())      // own method
console.log(dog.breathe())   // inherited from prototype`,
    },
    {
      actor: "A",
      instruction:
        "Write a constructor function called Person that takes a name parameter and sets it on the instance. Add a method called greet to its prototype that returns a greeting including the name. Create an instance with the name Arjun and log its greeting.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "Hi, I'm Arjun"
      },
      hints: [
        "Constructor: `function Person(name) { this.name = name; }`",
        "Add method to prototype: `Person.prototype.greet = function() { return \"Hi, I'm \" + this.name; }`",
        "Create instance and log: `const p = new Person(\"Arjun\"); console.log(p.greet());`",
      ],
      solution: `function Person(name) {
  this.name = name
}
Person.prototype.greet = function() {
  return "Hi, I'm " + this.name
}
const p = new Person("Arjun")
console.log(p.greet())`,
    },
    {
      actor: "A",
      instruction:
        "Write a constructor function called Counter where each instance gets its own count property starting at 0, and has an increment method on its prototype. Create two instances, increment the first one twice, the second one once, then log both counts.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "2" && lines[1] === "1"
      },
      hints: [
        "Set `this.count = 0` INSIDE the constructor (not on prototype).",
        "Put `increment` on prototype: `Counter.prototype.increment = function() { this.count++; }`",
        "Create two instances, increment c1 twice and c2 once, log both counts.",
      ],
      solution: `function Counter() {
  this.count = 0  // each instance gets its own count
}
Counter.prototype.increment = function() {
  this.count++
}
const c1 = new Counter()
const c2 = new Counter()
c1.increment()
c1.increment()
c2.increment()
console.log(c1.count)  // 2
console.log(c2.count)  // 1`,    },
  ],
}
