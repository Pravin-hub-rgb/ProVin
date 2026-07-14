import type { ReactScenario } from "../types"
import { JSX_LAB } from "./1.1-jsx"
import { COMPONENTS_LAB } from "./1.2-components"
import { PROPS_LAB } from "./1.3-props"
import { CHILDREN_LAB } from "./1.4-children"
import { USESTATE_LAB } from "./1.5-usestate"
import { TODO_BASIC_LAB } from "./1.6-todo-basic"
import { CONDITIONAL_LAB } from "./1.7-conditional"
import { LISTS_LAB } from "./1.8-lists-keys"
import { TODO_POLISH_LAB } from "./1.9-todo-polish"

export const reactScenarios: ReactScenario[] = [
  JSX_LAB,
  COMPONENTS_LAB,
  PROPS_LAB,
  CHILDREN_LAB,
  USESTATE_LAB,
  TODO_BASIC_LAB,
  CONDITIONAL_LAB,
  LISTS_LAB,
  TODO_POLISH_LAB,
]

export function getReactScenario(id: string): ReactScenario | undefined {
  return reactScenarios.find((s) => s.id === id)
}
