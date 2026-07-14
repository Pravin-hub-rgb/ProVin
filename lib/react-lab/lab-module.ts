import type { LabModule, Scenario, ScenarioStep, TerminalLine, CommandResult } from "@/lib/lab-registry"
import { reactScenarios, getReactScenario } from "./scenarios"
import type { ReactScenario } from "./types"
import { registerLabModule } from "@/lib/lab-registry"
import { ReactLabLayout } from "@/components/react-lab/react-lab-layout"

function reactToScenario(rs: ReactScenario): Scenario {
  const step: ScenarioStep = {
    actor: "A",
    instruction: rs.instructions,
    match: () => true,
    hints: ["", "", ""],
  }

  return {
    id: rs.id,
    phase: "",
    title: rs.title,
    description: rs.description,
    steps: [step],
  }
}

export const REACT_LAB_MODULE: LabModule = {
  id: "react",
  name: "React.js",
  actorLabels: { A: "", B: "" },

  createInitialState: () => ({
    scenario: { id: "", currentStep: 0, completedMask: 0 },
    currentScenario: null as ReactScenario | null,
  }),

  parseCommand: () => ({ type: "ignore" }),

  executeCommand: async (state) => ({
    newState: state,
    result: { lines: [] } as CommandResult,
  }),

  getScenario: (id: string) => {
    const rs = getReactScenario(id)
    return rs ? reactToScenario(rs) : undefined
  },

  get scenarios() {
    return reactScenarios.map(reactToScenario)
  },

  get defaultScenarioId() {
    return reactScenarios[0]?.id ?? ""
  },

  Layout: ReactLabLayout,

  getTerminalHeader: () => ({
    repo: "",
    branch: "",
    contextItems: [],
  }),

  getInitialLines: () => [],
}

registerLabModule(REACT_LAB_MODULE)
