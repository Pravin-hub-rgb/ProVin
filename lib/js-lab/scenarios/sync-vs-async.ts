import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

function runWithTimers(code: string): { output: string; error: string | null } {
  let output = ""
  const mockConsole = {
    log: (...args: unknown[]) => {
      output += args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ") + "\n"
    },
  }
  const timers: { cb: () => void; ms: number }[] = []

  const mockSetTimeout = (cb: () => void, ms: number) => {
    timers.push({ cb, ms })
    return timers.length
  }

  try {
    const fn = new Function("console", "setTimeout", code)
    fn(mockConsole, mockSetTimeout)
    // Run timers in order (simulate their delays)
    timers.sort((a, b) => a.ms - b.ms)
    for (const t of timers) {
      t.cb()
    }
    return { output: output.trim(), error: null }
  } catch (e) {
    return { output: output.trim(), error: e instanceof Error ? e.message : String(e) }
  }
}

export const SYNC_VS_ASYNC: Scenario = {
  id: "sync-vs-async",
  phase: "3.1",
  title: "Sync vs Async",
  description:
    "Understand the difference between synchronous and asynchronous code — how blocking works and why JavaScript doesn't wait.",
  steps: [
    {
      actor: "A",
      instruction:
        "Write code that logs the numbers 1, then 2, then 3 on separate lines using three console.log statements. Synchronous execution means each line runs one after another.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length === 3 && lines[0] === "1" && lines[1] === "2" && lines[2] === "3"
      },
      hints: [
        "Just use three console.log statements: `console.log(1)`, `console.log(2)`, `console.log(3)`",
        "Synchronous code runs line by line — the second log waits for the first to finish.",
        "No special syntax needed — just three console.log calls in order.",
      ],
      solution: `console.log(1)
console.log(2)
console.log(3)
`,
      solutionOutput: "1\\n2\\n3",
    },
    {
      actor: "A",
      instruction:
        "Demonstrate asynchronous behavior. Log 1, then schedule a setTimeout that logs 2 after 100 milliseconds, then log 3. JavaScript does not wait for setTimeout — it runs the next line immediately. The output should show 1, then 3, then 2.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = runWithTimers(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length === 3 && lines[0] === "1" && lines[1] === "3" && lines[2] === "2"
      },
      hints: [
        "Start with `console.log(1)`, then `setTimeout(() => console.log(2), 100)`, then `console.log(3)`",
        "setTimeout is asynchronous — JavaScript does NOT wait for it. The next line runs immediately.",
        "The timeout callback (logging 2) runs later, after the rest of the code finishes.",
      ],
      solution: `console.log(1)
setTimeout(() => console.log(2), 100)
console.log(3)
`,
      solutionOutput: "1\\n3\\n2",
    },
    {
      actor: "A",
      instruction:
        "Demonstrate the common async mistake. Declare a variable called data set to null. Then use setTimeout to set data to Fetched data after 100 milliseconds. Then log data immediately after the setTimeout. The output will be null because console.log runs before the timeout completes. Async values are not available before they arrive.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = runWithTimers(parsed.code)
        if (error) return false
        return output === "null"
      },
      hints: [
        "Declare: `let data = null;`",
        "Set timeout: `setTimeout(() => { data = \"Fetched data\"; }, 100);`",
        "Log immediately: `console.log(data);` — this runs before the timeout, so data is still null",
      ],
      solution: `let data = null
setTimeout(() => { data = "Fetched data" }, 100)
console.log(data)
`,
      solutionOutput: "null",
    },
  ],
}
