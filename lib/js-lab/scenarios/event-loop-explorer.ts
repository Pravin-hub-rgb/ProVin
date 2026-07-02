import type { Scenario } from "@/lib/lab-registry"

async function simulateEventLoop(code: string): Promise<{ output: string; error: string | null }> {
  let output = ""
  const mockConsole = {
    log: (...args: unknown[]) => {
      output += args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ") + "\n"
    },
  }

  const macroQueue: (() => void)[] = []
  const mockSetTimeout = (cb: () => void, _ms: number) => {
    macroQueue.push(cb)
    return macroQueue.length
  }

  try {
    const fn = new Function("console", "setTimeout", "Promise", code)
    fn(mockConsole, mockSetTimeout, Promise)

    // Process all microtasks (Promise.then callbacks) that were queued during sync execution
    // Microtasks run before macrotasks in the event loop
    await new Promise<void>((resolve) => globalThis.queueMicrotask(() => resolve()))

    // Process one macrotask (setTimeout callback)
    if (macroQueue.length > 0) {
      macroQueue.shift()!()
    }

    return { output: output.trim(), error: null }
  } catch (e) {
    return { output: output.trim(), error: e instanceof Error ? e.message : String(e) }
  }
}

export const EVENT_LOOP_EXPLORER: Scenario = {
  id: "event-loop-explorer",
  phase: "3.2",
  title: "Event Loop Explorer",
  description:
    "Understand the event loop — how JavaScript handles multiple tasks, the priority of microtasks vs macrotasks, and the order of execution.",
  steps: [
    {
      actor: "A",
      instruction:
        "Show that even a setTimeout with 0 milliseconds still runs after all synchronous code. Log 1, then schedule a setTimeout with 0ms that logs 2, then log 3. The output should show 1, then 3, then 2 — setTimeout always waits for sync code to finish first.",
      match: async (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = await simulateEventLoop(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length === 3 && lines[0] === "1" && lines[1] === "3" && lines[2] === "2"
      },
      hints: [
        "Write: `console.log(1); setTimeout(() => console.log(2), 0); console.log(3);`",
        "Even with 0ms delay, setTimeout goes to the callback queue and must wait for sync code to finish.",
        "Remember: sync code runs first (1, 3), then setTimeout fires (2).",
      ],
      solution: `console.log(1)
setTimeout(() => console.log(2), 0)
console.log(3)
`,
      solutionOutput: "1\\n3\\n2",
    },
    {
      actor: "A",
      instruction:
        "Compare microtasks vs macrotasks. Log 1, schedule a setTimeout with 0ms that logs 2, create a resolved Promise and chain a then that logs 3, then log 4. The Promise.then callback is a microtask and runs before the setTimeout callback (a macrotask). The output should be 1, 4, 3, 2.",
      match: async (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = await simulateEventLoop(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length === 4 && lines[0] === "1" && lines[1] === "4" && lines[2] === "3" && lines[3] === "2"
      },
      hints: [
        "Order: `console.log(1)` → `setTimeout(() => console.log(2), 0)` → `Promise.resolve().then(() => console.log(3))` → `console.log(4)`",
        "Sync code runs first (1, 4), then microtasks (3), then macrotasks (2) — this is THE rule",
        "Promise.then callbacks are microtasks and always beat setTimeout callbacks (macrotasks).",
      ],
      solution: `console.log(1)
setTimeout(() => console.log(2), 0)
Promise.resolve().then(() => console.log(3))
console.log(4)
`,
      solutionOutput: "1\\n4\\n3\\n2",
    },
    {
      actor: "A",
      instruction:
        "Log 1, then schedule a setTimeout with 0ms that logs 2, then queue a Promise microtask that logs 3, then schedule another setTimeout with 0ms that logs 4, then log 5. The output should be 1, 5, 3, 2, 4 — sync first, then microtask (3), then a macrotask (2).",
      match: async (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = await simulateEventLoop(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length === 5 && lines[0] === "1" && lines[1] === "5" && lines[2] === "3" && lines[3] === "2" && lines[4] === "4"
      },
      hints: [
        "Synchronous first: log 1, log 5; then microtasks (log 3); then macrotasks round-robin (log 2, log 4)",
        "Write: `console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); setTimeout(() => console.log(4), 0); console.log(5);`",
        "Our mock processes sync, then all microtasks, then one macrotask. The second setTimeout won't fire in our mock — focus on the order of the first four lines.",
      ],
      solution: `console.log(1)
setTimeout(() => console.log(2), 0)
Promise.resolve().then(() => console.log(3))
setTimeout(() => console.log(4), 0)
console.log(5)
`,
      solutionOutput: "1\\n5\\n3\\n2",
    },
  ],
}
