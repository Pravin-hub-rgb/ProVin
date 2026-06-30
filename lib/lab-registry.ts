import type { ComponentType } from "react"
import { getLabSubject as _getLabSubject, labSubjects as _labSubjects } from "./lab-data"
import type { LabSubject } from "./lab-data"

export type { LabSubject }

export const labSubjects = _labSubjects
export const getLabSubject = _getLabSubject

export interface TerminalLine {
  text: string
  type: "cmd" | "output" | "info" | "error"
}

export interface TerminalHeader {
  repo: string
  branch: string
  contextItems: { label: string; value: string }[]
}

export interface LabLayoutProps {
  state: unknown
  onCommand: (who: "A" | "B", cmd: string) => void
  step: ScenarioStep | undefined
  done: boolean
  terminalALines: TerminalLine[]
  terminalBLines: TerminalLine[]
  headerA: TerminalHeader
  headerB: TerminalHeader
  showActionModal: boolean
  setShowActionModal: (v: boolean) => void
  className?: string
}

export interface CommandResult {
  lines: string[]
  advance?: boolean
}

export interface ScenarioStep {
  actor: "A" | "B"
  instruction: string
  match: (parsed: unknown) => boolean
  hints: [string, string, string]
  actionType?: string
  githubAction?: "create-pr" | "review-pr" | "merge-pr" | "resolve-conflict"
  getNextStep?: (state: unknown) => number
}

export interface Scenario {
  id: string
  phase: string
  title: string
  description: string
  steps: ScenarioStep[]
  setup?: (state: unknown) => unknown
}

export interface LabModule {
  id: string
  name: string

  createInitialState: () => unknown
  parseCommand: (input: string) => { type: string } & Record<string, unknown>
  executeCommand: (
    state: unknown,
    who: "A" | "B",
    parsed: { type: string } & Record<string, unknown>
  ) => { newState: unknown; result: CommandResult }
  getScenario: (id: string) => Scenario | undefined
  scenarios: Scenario[]
  defaultScenarioId: string

  /** Labels shown in step progress for each actor. Defaults to { A: "Sr", B: "Jr" }. */
  actorLabels?: { A: string; B: string }

  onStepMatch?: (
    scenarioId: string,
    stepIndex: number,
    state: unknown,
    addLine: (who: "A" | "B", line: TerminalLine) => void,
  ) => unknown

  RemotePanel?: ComponentType<{ state: unknown; className?: string }>
  ActionModal?: ComponentType<{
    state: unknown
    action: string
    actor: "A" | "B"
    color: string
    onCommand: (who: "A" | "B", cmd: string) => void
  }>

  /** Custom layout renders the entire content area below the top bar.
   *  If not provided, falls back to the default two-terminal grid. */
  Layout?: ComponentType<LabLayoutProps>

  getTerminalHeader: (
    state: unknown,
    who: "A" | "B",
  ) => TerminalHeader

  getInitialLines: (who: "A" | "B", scenario: Scenario) => TerminalLine[]

  mergeSavedState?: (freshState: unknown, saved: Record<string, unknown>) => unknown
}

const modules = new Map<string, LabModule>()

export function registerLabModule(mod: LabModule) {
  modules.set(mod.id, mod)
}

export function getLabModule(id: string): LabModule | undefined {
  if (!modules.has(id)) return undefined
  return modules.get(id)
}

export function getAllLabModules(): LabModule[] {
  return Array.from(modules.values())
}
