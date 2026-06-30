import type { Scenario } from "@/lib/lab-registry"
import { FIRST_API_CALL } from "./first-api-call"
import { FIRST_TOOL_CALL } from "./first-tool-call"

export const scenarios: Scenario[] = [
  FIRST_API_CALL,
  FIRST_TOOL_CALL,
]

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id)
}
