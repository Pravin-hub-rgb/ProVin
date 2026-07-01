import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const CLASS_MAKEOVER: Scenario = {
  id: "class-makeover",
  phase: "2.5",
  title: "Class Makeover",
  description:
    "Learn ES6 classes — constructor, methods, inheritance with extends, and the super() gotcha.",
  steps: [
    {
      actor: "A",
      instruction:
        "Rewrite this constructor function and its prototype method as a class:\n\n```js\nfunction Car(brand) {\n  this.brand = brand;\n}\nCar.prototype.honk = function() {\n  return this.brand + \" says beep\";\n};\n```\nCreate an instance with the brand Toyota and log the result of calling its honk method.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "Toyota says beep"
      },
      solution: `class Car {
  constructor(brand) {
    this.brand = brand
  }
  honk() {
    return this.brand + " says beep"
  }
}

console.log(new Car("Toyota").honk())`,
      hints: [
        "Use: `class Car { constructor(brand) { this.brand = brand; } honk() { return this.brand + \" says beep\"; } }`",
        'Create instance: `const c = new Car("Toyota"); console.log(c.honk());`',
        "No commas between class methods.",
      ],
    },
    {
      actor: "A",
      instruction:
        "Create a parent class called Animal with a constructor that sets a name property. Create a child class called Dog that extends Animal and adds a color property. Make sure to call the parent constructor in the child before using this. Create a Dog instance with name Rex and color brown, then log its name and color together as Rex is brown.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "Rex is brown"
      },
      solution: `class Animal {
  constructor(name) {
    this.name = name
  }
}

class Dog extends Animal {
  constructor(name, color) {
    super(name)  // Must call parent constructor first
    this.color = color
  }
}

const d = new Dog("Rex", "brown")
console.log(d.name + " is " + d.color)`,
      hints: [
        "Parent: `class Animal { constructor(name) { this.name = name; } }`",
        "Child: `class Dog extends Animal { constructor(name, color) { super(name); this.color = color; } }`",
        'Log: `const d = new Dog("Rex", "brown"); console.log(d.name + " is " + d.color);`',
      ],
    },
    {
      actor: "A",
      instruction:
        "Create a class called MyArray that extends the built-in Array. Add a method called first that returns the first element, and a method called last that returns the last. Create an instance, push the values 10, 20, 30, and log both first (should be 10) and last (should be 30).",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "10" && lines[1] === "30"
      },
      solution: `class MyArray extends Array {
  first() { return this[0] }
  last() { return this[this.length - 1] }
}

const arr = new MyArray()
arr.push(10, 20, 30)
console.log(arr.first())
console.log(arr.last())`,
      hints: [
        "Extend Array: `class MyArray extends Array { first() { return this[0]; } last() { return this[this.length - 1]; } }`",
        "No constructor needed — Array's constructor works automatically.",
        "Create instance, push 10, 20, 30: `const arr = new MyArray(); arr.push(10, 20, 30); console.log(arr.first()); console.log(arr.last());`",
      ],
    },
  ],
}
