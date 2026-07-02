import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const STRING_SYMPHONY: Scenario = {
  id: "string-symphony",
  phase: "5.7",
  title: "String Symphony",
  description:
    "Master JavaScript string methods — slice, split, join, includes, trim, and repeat for powerful text manipulation.",
  steps: [
    {
      actor: "A",
      instruction:
        "Given the string JavaScript is awesome, extract just the word awesome using the slice method, check if the text includes Script using includes, and split the text into words using split and rejoin with a dash using join. Log all three results in order.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 3 && lines[0] === "awesome" && lines[1] === "true" && lines[2] === "JavaScript-is-awesome"
      },
      hints: [
        "slice: `text.slice(15)` or `text.slice(-7)` to get 'awesome'",
        "includes: `text.includes(\"Script\")` → true",
        "split + join: `text.split(\" \").join(\"-\")` → 'JavaScript-is-awesome'",
      ],
      solution: `const text = "JavaScript is awesome"
console.log(text.slice(-7))            // "awesome"
console.log(text.includes("Script"))  // true
console.log(text.split(" ").join("-")) // "JavaScript-is-awesome"
`,
      solutionOutput: "awesome\\ntrue\\nJavaScript-is-awesome",
    },
    {
      actor: "A",
      instruction:
        "Given a string with leading and trailing spaces containing Hello, World!, use trim to remove whitespace, toLowerCase to convert to lowercase, and replace to change world to javascript. Log the final result (should be hello, javascript!).",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "hello, javascript!"
      },
      hints: [
        "Chain: `messy.trim().toLowerCase().replace(\"world\", \"javascript\")`",
        "trim() removes leading/trailing spaces, toLowerCase() converts case.",
        "replace() only replaces the first occurrence by default.",
      ],
      solution: `const messy = "  Hello, World!  "
console.log(messy.trim().toLowerCase().replace("world", "javascript"))
`,
      solutionOutput: "hello, javascript!",
    },
    {
      actor: "A",
      instruction:
        "Write a function called createBox that takes a character and a size and returns a string of that character repeated size times using repeat. Call it with the asterisk character and 10, and log the result. Then log a single asterisk repeated 5 times using repeat.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "**********" && lines[1] === "*****"
      },
      hints: [
        "Define: `function createBox(char, size) { return char.repeat(size); }`",
        "Call: `console.log(createBox(\"*\", 10)); console.log(\"*\".repeat(5));`",
        ".repeat() takes a count and returns the string repeated that many times.",
      ],
      solution: `function createBox(char, size) {
  return char.repeat(size)
}
console.log(createBox("*", 10))
console.log("*".repeat(5))
`,
      solutionOutput: "**********\\n*****",
    },
  ],
}
