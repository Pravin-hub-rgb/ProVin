import type { Scenario } from "@/lib/lab-registry"
import { VARIABLE_DETECTIVE } from "./variable-detective"
import { TYPE_OF_TROUBLE } from "./type-of-trouble"
import { SCOPE_ESCAPE } from "./scope-escape"
import { HOISTING_HIJINKS } from "./hoisting-hijinks"
import { EQUALITY_CRASH_COURSE } from "./equality-crash-course"
import { FUNCTION_FORMS } from "./function-forms"
import { TEMPLATE_POWER } from "./template-power"
import { CLOSURE_TRAP } from "./closure-trap"
import { THIS_OR_THAT } from "./this-or-that"
import { CALL_APPLY_BIND } from "./call-apply-bind"
import { PROTOTYPE_PUZZLE } from "./prototype-puzzle"
import { CLASS_MAKEOVER } from "./class-makeover"
import { ARRAY_ARSENAL } from "./array-arsenal"
import { DESTRUCTURE_DECISION } from "./destructure-decision"
import { SPREAD_SPOTLIGHT } from "./spread-spotlight"
import { OPTIONAL_ODYSSEY } from "./optional-odyssey"
import { SYNC_VS_ASYNC } from "./sync-vs-async"
import { EVENT_LOOP_EXPLORER } from "./event-loop-explorer"
import { CALLBACK_CANYON } from "./callback-canyon"
import { PROMISE_PLAYGROUND } from "./promise-playground"
import { ASYNC_AWAIT_AVENUE } from "./async-await-avenue"
import { NUMBER_NINJA } from "./number-ninja"
import { MATH_MAGICIAN } from "./math-magician"
import { DATE_DETECTIVE } from "./date-detective"
import { MAP_MASTERY } from "./map-mastery"
import { SET_SPOTLIGHT } from "./set-spotlight"
import { JSON_JOURNEY } from "./json-journey"
import { STRING_SYMPHONY } from "./string-symphony"
import { REGEX_RIDDLE } from "./regex-riddle"
import { IIFE_INSIGHTS } from "./iife-insights"
import { CURRYING_QUEST } from "./currying-quest"

export const scenarios: Scenario[] = [
  // Phase 1 — Variables & Types
  VARIABLE_DETECTIVE,
  TYPE_OF_TROUBLE,
  SCOPE_ESCAPE,
  HOISTING_HIJINKS,
  EQUALITY_CRASH_COURSE,
  FUNCTION_FORMS,
  TEMPLATE_POWER,
  // Phase 2 — Objects & Classes
  CLOSURE_TRAP,
  THIS_OR_THAT,
  CALL_APPLY_BIND,
  PROTOTYPE_PUZZLE,
  CLASS_MAKEOVER,
  // Phase 3 — Async
  SYNC_VS_ASYNC,
  EVENT_LOOP_EXPLORER,
  CALLBACK_CANYON,
  PROMISE_PLAYGROUND,
  ASYNC_AWAIT_AVENUE,
  // Phase 4 — Arrays & Functional
  ARRAY_ARSENAL,
  DESTRUCTURE_DECISION,
  SPREAD_SPOTLIGHT,
  OPTIONAL_ODYSSEY,
  // Phase 5 — Utilities
  NUMBER_NINJA,
  MATH_MAGICIAN,
  DATE_DETECTIVE,
  MAP_MASTERY,
  SET_SPOTLIGHT,
  JSON_JOURNEY,
  STRING_SYMPHONY,
  REGEX_RIDDLE,
  // Phase 6 — Advanced
  IIFE_INSIGHTS,
  CURRYING_QUEST,
]

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id)
}
