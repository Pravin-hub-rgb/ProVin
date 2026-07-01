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

export function executeCode(code: string): { output: string; error: string | null } {
  let output = ""
  const mockConsole = {
    log: (...args: unknown[]) => {
      output += args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" ") + "\n"
    },
    error: (...args: unknown[]) => {
      output += "Error: " + args.map(String).join(" ") + "\n"
    },
  }

  try {
    const fn = new Function("console", code)
    fn(mockConsole)
    return { output: output.trim(), error: null }
  } catch (e) {
    return { output, error: e instanceof Error ? e.message : String(e) }
  }
}

export async function executeCodeAsync(code: string): Promise<{ output: string; error: string | null }> {
  let output = ""
  const mockConsole = {
    log: (...args: unknown[]) => {
      output += args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" ") + "\n"
    },
    error: (...args: unknown[]) => {
      output += "Error: " + args.map(String).join(" ") + "\n"
    },
  }

  try {
    const fn = new Function("console", `return (async () => { ${code} })()`)
    await fn(mockConsole)
    return { output: output.trim(), error: null }
  } catch (e) {
    return { output, error: e instanceof Error ? e.message : String(e) }
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
