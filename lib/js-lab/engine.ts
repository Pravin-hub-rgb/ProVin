import type { JsLabState } from "./types"
import type { CommandResult } from "@/lib/lab-registry"

export function createInitialState(): JsLabState {
  return {
    scenario: { id: "", currentStep: 0 },
    userCode: "",
    lastOutput: "",
    lastError: null,
    runCount: 0,
  }
}

function cloneState(s: JsLabState): JsLabState {
  return JSON.parse(JSON.stringify(s)) as JsLabState
}

function createMockConsole(
  output: { current: string },
): { log: (...args: unknown[]) => void; error: (...args: unknown[]) => void } {
  return {
    log: (...args: unknown[]) => {
      output.current += args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" ") + "\n"
    },
    error: (...args: unknown[]) => {
      output.current += "Error: " + args.map(String).join(" ") + "\n"
    },
  }
}

export function executeCode(code: string): { output: string; error: string | null } {
  const output = { current: "" }
  const mockConsole = createMockConsole(output)

  const timers: (() => void)[] = []
  const intervals: (() => void)[] = []

  function mockSetTimeout(cb: () => void, _ms: number): number {
    timers.push(cb)
    return timers.length
  }

  function mockSetInterval(cb: () => void, _ms: number): number {
    intervals.push(cb)
    return intervals.length
  }

  try {
    const fn = new Function("console", "setTimeout", "setInterval", "clearTimeout", "clearInterval", code)
    fn(mockConsole, mockSetTimeout, mockSetInterval, () => {}, () => {})

    // Run all queued timers synchronously after the main code finishes
    for (const cb of timers) {
      cb()
    }
    for (const cb of intervals) {
      cb()
    }

    return { output: output.current.trim(), error: null }
  } catch (e) {
    return { output: output.current, error: e instanceof Error ? e.message : String(e) }
  }
}

export async function executeCodeAsync(code: string): Promise<{ output: string; error: string | null }> {
  const output = { current: "" }
  const mockConsole = createMockConsole(output)

  try {
    const fn = new Function("console", `return (async () => { ${code} })()`)
    await fn(mockConsole)
    // Flush remaining microtasks so chained .then() callbacks execute
    for (let i = 0; i < 10; i++) {
      await Promise.resolve()
    }
    return { output: output.current.trim(), error: null }
  } catch (e) {
    return { output: output.current, error: e instanceof Error ? e.message : String(e) }
  }
}

export function executeCommand(
  state: JsLabState,
  _who: "A" | "B",
  parsed: { type: string } & Record<string, unknown>,
): { newState: JsLabState; result: CommandResult } {
  const newState = cloneState(state)

  switch (parsed.type) {
    case "run": {
      const code = parsed.code as string
      newState.userCode = code
      const { output, error } = executeCode(code)
      newState.lastOutput = output
      newState.lastError = error
      newState.runCount++
      return {
        newState,
        result: { lines: error ? [`Error: ${error}`] : [output] },
      }
    }

    case "unknown":
    default:
      return {
        newState,
        result: { lines: ["Type your code in the editor and click Run."] },
      }
  }
}
