import type { ReactScenario } from "../types"
import { JSX_LAB } from "./1.1-jsx"
import { COMPONENTS_LAB } from "./1.2-components"
import { IMPORT_EXPORT_VALUES_LAB } from "./1.3.1-import-export-values"
import { IMPORT_EXPORT_COMPONENTS_LAB } from "./1.3.2-import-export-components"
import { SEPARATE_FILES_LAB } from "./1.4-separate-files"
import { INTERFACE_LAB } from "./1.5.1-interface"
import { PROPS_LAB } from "./1.5.2-props"
import { OPTIONAL_PROPS_LAB } from "./1.5.3-optional-props"
import { CALLBACK_BASIC_LAB } from "./1.5.4.1-callback-basic"
import { CALLBACK_PROPS_LAB } from "./1.5.4-callback-props"
import { CHILDREN_LAB } from "./1.6-children"
import { USESTATE_LAB } from "./1.7-usestate"
import { TODO_BASIC_LAB } from "./1.8-todo-basic"
import { CONDITIONAL_LAB } from "./1.9-conditional"
import { LISTS_LAB } from "./1.10-lists-keys"
import { TODO_POLISH_LAB } from "./1.11-todo-polish"

export const reactScenarios: ReactScenario[] = [
  JSX_LAB,
  COMPONENTS_LAB,
  IMPORT_EXPORT_VALUES_LAB,
  IMPORT_EXPORT_COMPONENTS_LAB,
  SEPARATE_FILES_LAB,
  INTERFACE_LAB,
  PROPS_LAB,
  OPTIONAL_PROPS_LAB,
  CALLBACK_BASIC_LAB,
  CALLBACK_PROPS_LAB,
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
