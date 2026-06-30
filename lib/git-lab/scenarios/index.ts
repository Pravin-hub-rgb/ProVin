import type { Scenario } from "../types"
import { BRANCH_CREATE_SWITCH } from "./branch-create-switch"
import { KEEP_BRANCH_UPDATED } from "./keep-branch-updated"
import { TWO_COLLABORATORS } from "./two-collaborators"
import { BRANCH_AND_PR } from "./branch-and-pr"
import { MERGE_STRATEGIES } from "./merge-strategies"
import { MERGE_STRATEGIES_SQUASH } from "./merge-strategies-squash"
import { MERGE_STRATEGIES_REBASE } from "./merge-strategies-rebase"
import { DELETE_BRANCH } from "./delete-branch"
import { RESET_MODES } from "./reset-modes"
import { REVERT_COMMIT } from "./revert-commit"
import { AMEND_COMMIT } from "./amend-commit"
import { CONFLICT_LOCAL } from "./conflict-local"
import { CONFLICT_GITHUB } from "./conflict-github"
import { CONFLICT_DRILL_SAME_LINE } from "./conflict-drill-same-line"
import { CONFLICT_DRILL_MODIFY_DELETE } from "./conflict-drill-modify-delete"
import { CONFLICT_DRILL_WHITESPACE } from "./conflict-drill-whitespace"
import { GITIGNORE_PRACTICE } from "./gitignore-practice"
import { CAPSTONE_PARALLEL } from "./capstone-parallel"

export const scenarios: Scenario[] = [
  // Phase 1
  BRANCH_CREATE_SWITCH,
  KEEP_BRANCH_UPDATED,
  // Phase 2
  TWO_COLLABORATORS,
  BRANCH_AND_PR,
  MERGE_STRATEGIES,
  MERGE_STRATEGIES_SQUASH,
  MERGE_STRATEGIES_REBASE,
  DELETE_BRANCH,
  // Phase 3
  CONFLICT_LOCAL,
  CONFLICT_GITHUB,
  CONFLICT_DRILL_SAME_LINE,
  CONFLICT_DRILL_MODIFY_DELETE,
  CONFLICT_DRILL_WHITESPACE,
  // Phase 4
  RESET_MODES,
  REVERT_COMMIT,
  AMEND_COMMIT,
  // Phase 5
  GITIGNORE_PRACTICE,
  // Phase 6
  CAPSTONE_PARALLEL,
]

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id)
}
