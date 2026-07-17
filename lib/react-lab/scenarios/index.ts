import type { ReactScenario } from "../types"
import { PLAYGROUND_LAB } from "./0.0-playground"
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
import { USESTATE_COUNTER_LAB } from "./1.7.1-usestate-counter"
import { EVENT_INPUT_LAB } from "./1.7.2-event-input"
import { CONTROLLED_FORM_LAB } from "./1.7.3-controlled-form"
import { GENERICS_BASICS_LAB } from "./1.8.1-generics-basics"
import { EXPLICIT_USESTATE_LAB } from "./1.8.2-explicit-usestate"
import { TYPED_EVENTS_LAB } from "./1.8.3-typed-events"
import { COMBINED_FORM_LAB } from "./1.8.4-combined-form"
import { TODO_BASIC_LAB } from "./1.9-array-state"
import { CONDITIONAL_LAB } from "./1.10-conditional"
import { LISTS_LAB } from "./1.11-lists-keys"
import { TODO_POLISH_LAB } from "./1.12-todo-polish"

export const reactScenarios: ReactScenario[] = [
  PLAYGROUND_LAB,
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
  USESTATE_COUNTER_LAB,
  EVENT_INPUT_LAB,
  CONTROLLED_FORM_LAB,
  GENERICS_BASICS_LAB,
  EXPLICIT_USESTATE_LAB,
  TYPED_EVENTS_LAB,
  COMBINED_FORM_LAB,
  TODO_BASIC_LAB,
  CONDITIONAL_LAB,
  LISTS_LAB,
  TODO_POLISH_LAB,
]

export function getReactScenario(id: string): ReactScenario | undefined {
  return reactScenarios.find((s) => s.id === id)
}
