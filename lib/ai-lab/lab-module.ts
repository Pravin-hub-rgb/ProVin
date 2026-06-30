import type { LabModule, TerminalLine } from "@/lib/lab-registry"
import type { AiLabState } from "./types"
import { createInitialState, executeCommand } from "./engine"
import { parseCommand } from "./parser"
import { getScenario, scenarios } from "./scenarios"
import { registerLabModule } from "@/lib/lab-registry"
import { AiLabLayout } from "@/components/ai-lab/ai-lab-layout"

export const AI_LAB_MODULE: LabModule = {
  id: "agenticai",
  name: "Agentic AI",

  actorLabels: { A: "Dev", B: "Rev" },

  createInitialState() {
    return createInitialState()
  },

  parseCommand(input) {
    return parseCommand(input)
  },

  executeCommand(state, who, parsed) {
    return executeCommand(state as AiLabState, who, parsed)
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

  Layout: AiLabLayout,

  mergeSavedState(freshState, saved) {
    const fresh = freshState as AiLabState
    const savedState = saved as unknown as AiLabState
    fresh.scenario.currentStep = savedState.scenario.currentStep
    fresh.messages = savedState.messages
    fresh.tools = savedState.tools
    fresh.temperature = savedState.temperature
    fresh.tokensUsed = savedState.tokensUsed
    fresh.apiKeySet = savedState.apiKeySet
    return fresh
  },

  getTerminalHeader(state, who) {
    const s = state as AiLabState
    return {
      repo: "ai-agent-lab",
      branch: `temp-${s.temperature.toFixed(1)}`,
      contextItems: [
        { label: "tokens", value: String(s.tokensUsed) },
        { label: "tools", value: String(Object.keys(s.tools).length) },
      ],
    }
  },

  getInitialLines(who, _scenario) {
    return [
      {
        text: `Connected to AI Agent Lab — logged in as ${who === "A" ? "Developer" : "Reviewer"}`,
        type: "info",
      },
    ]
  },
}

registerLabModule(AI_LAB_MODULE)
