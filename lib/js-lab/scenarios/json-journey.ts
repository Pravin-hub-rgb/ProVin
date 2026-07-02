import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const JSON_JOURNEY: Scenario = {
  id: "json-journey",
  phase: "5.6",
  title: "JSON Journey",
  description:
    "Learn JSON — serialize objects to strings with `JSON.stringify` and parse strings back with `JSON.parse`.",
  steps: [
    {
      actor: "A",
      instruction:
        "Create an object called user with properties name (Arjun), age (25), and skills (an array containing JS and React). Use JSON.stringify to convert it to a JSON string. Log the string.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === '{"name":"Arjun","age":25,"skills":["JS","React"]}'
      },
      hints: [
        "Simply: `const json = JSON.stringify(user); console.log(json);`",
        "JSON.stringify converts objects to string format with double quotes.",
        "JSON keys and string values must be double-quoted.",
      ],
      solution: `const user = {
  name: "Arjun",
  age: 25,
  skills: ["JS", "React"]
}
console.log(JSON.stringify(user))
`,
      solutionOutput: "{\"name\":\"Arjun\",\"age\":25,\"skills\":[\"JS\",\"React\"]}",
    },
    {
      actor: "A",
      instruction:
        "Given a JSON string representing an object with properties product (Laptop), price (75000), and inStock (true), use JSON.parse to convert it to an object. Log the product name and whether it's in stock.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "Laptop" && lines[1] === "true"
      },
      hints: [
        "Parse: `const obj = JSON.parse(json);`",
        "Access: `console.log(obj.product); console.log(obj.inStock);`",
        "JSON.parse converts a JSON string back into a JavaScript object.",
      ],
      solution: `const json = '{"product":"Laptop","price":75000,"inStock":true}'
const obj = JSON.parse(json)
console.log(obj.product)
console.log(obj.inStock)
`,
      solutionOutput: "Laptop\\ntrue",
    },
    {
      actor: "A",
      instruction:
        "Given an object with properties name (Neha), address (containing city Delhi and zip 110001), and hobbies (array with reading, coding), use JSON.stringify with 2-space indentation (the third argument). Log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return (
          output.includes('"name": "Neha"') &&
          output.includes('"address"') &&
          output.includes('"city": "Delhi"') &&
          output.includes('"zip": 110001') &&
          output.includes('"hobbies"') &&
          output.includes('"reading"') &&
          output.includes('"coding"')
        )
      },
      hints: [
        "Use: `JSON.stringify(data, null, 2)` — the third argument is the indentation.",
        "The second argument (replacer) is null because we don't need to filter.",
        "This produces a pretty-printed JSON string with line breaks.",
      ],
      solution: `const data = {
  name: "Neha",
  address: { city: "Delhi", zip: 110001 },
  hobbies: ["reading", "coding"]
}
console.log(JSON.stringify(data, null, 2))
`,
      solutionOutput: "{\\n  \"name\": \"Neha\",\\n  \"address\": {\\n    \"city\": \"Delhi\",\\n    \"zip\": 110001\\n  },\\n  \"hobbies\": [\\n    \"reading\",\\n    \"coding\"\\n  ]\\n}",
    },
  ],
}
