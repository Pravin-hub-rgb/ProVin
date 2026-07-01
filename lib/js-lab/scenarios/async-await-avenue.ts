import type { Scenario } from "@/lib/lab-registry"
import { executeCodeAsync } from "../engine"

export const ASYNC_AWAIT_AVENUE: Scenario = {
  id: "async-await-avenue",
  phase: "3.2",
  title: "Async Await Avenue",
  description:
    "Learn async/await — write asynchronous code that reads like synchronous code, and handle errors gracefully.",
  steps: [
    {
      actor: "A",
      instruction:
        "Write an async function called getGreeting that returns the string Hello, Async!. Call it and log the result.",
      match: async (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = await executeCodeAsync(parsed.code)
        if (error) return false
        return output === "Hello, Async!"
      },
      solution: `async function getGreeting() {
  return "Hello, Async!"
}

// Must use await inside an async context
;(async () => {
  console.log(await getGreeting())
})()`,
      hints: [
        "Define: `async function getGreeting() { return \"Hello, Async!\"; }`",
        "Use an async IIFE to call and await: `;(async () => { const msg = await getGreeting(); console.log(msg); })()`",
        "Expected output: Hello, Async!",
      ],
    },
    {
      actor: "A",
      instruction:
        "Write an async function called safeDivide that takes two parameters and returns the first divided by the second. If the second parameter is 0, throw a new Error with the message Cannot divide by zero. Call it with 10 and 0 inside a try/catch block and log the error message.",
      match: async (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = await executeCodeAsync(parsed.code)
        if (error) return false
        return output === "Cannot divide by zero"
      },
      solution: `async function safeDivide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero")
  }
  return a / b
}

;(async () => {
  try {
    await safeDivide(10, 0)
  } catch (e) {
    console.log(e.message)
  }
})()`,
      hints: [
        "Inside the async function: `if (b === 0) throw new Error(\"Cannot divide by zero\");`",
        "Call with try/catch: `try { await safeDivide(10, 0); } catch (e) { console.log(e.message); }`",
        "Expected output: Cannot divide by zero",
      ],
    },
    {
      actor: "A",
      instruction:
        "Create a helper function called delay that takes a number of milliseconds and returns a Promise that resolves after that time. Then write an async function called countdown that logs 3, then 2, then 1 with a one-second delay between each.",
      match: async (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        // The setTimeout-based countdown will take ~3 seconds.
        // We give it up to 6 seconds to complete.
        const { output, error } = await executeCodeAsync(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length === 3 && lines[0] === "3" && lines[1] === "2" && lines[2] === "1"
      },
      solution: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function countdown() {
  console.log(3)
  await delay(1000)  // wait 1 second
  console.log(2)
  await delay(1000)
  console.log(1)
}

countdown()`,
      hints: [
        "Create delay: `function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }`",
        "Countdown: `async function countdown() { console.log(3); await delay(1000); console.log(2); await delay(1000); console.log(1); }`",
        "Call it and use an async IIFE if needed.",
      ],
    },
  ],
}
