import type { LabModule, TerminalLine, Scenario } from "@/lib/lab-registry"
import type { JsLabState } from "./types"
import { createInitialState, executeCommand } from "./engine"
import { parseCommand } from "./parser"
import { getScenario, scenarios } from "./scenarios"
import { registerLabModule } from "@/lib/lab-registry"
import { JsLabLayout } from "@/components/js-lab/js-lab-layout"

function asJsState(s: unknown): JsLabState {
  return s as JsLabState
}

export const JS_LAB_MODULE: LabModule = {
  id: "javascript",
  name: "JavaScript",

  actorLabels: { A: "", B: "" },

  createInitialState() {
    return createInitialState()
  },

  parseCommand(input) {
    return parseCommand(input)
  },

  executeCommand(state, who, parsed) {
    return executeCommand(asJsState(state), who, parsed)
  },

  getScenario(id) {
    return getScenario(id) as unknown as LabModule["getScenario"] extends (id: string) => infer R ? R : never
  },

  get scenarios() {
    return scenarios as unknown as LabModule["scenarios"]
  },

  get defaultScenarioId() {
    return scenarios[0]?.id ?? ""
  },

  Layout: JsLabLayout,

  getTerminalHeader(_state, _who) {
    return { repo: "js-lab", branch: "main", contextItems: [] }
  },

  getInitialLines(_who, _scenario) {
    return [] as TerminalLine[]
  },
}

registerLabModule(JS_LAB_MODULE)
