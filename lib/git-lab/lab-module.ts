import type { LabModule, TerminalLine } from "@/lib/lab-registry"
import type { GitLabState, ParsedCommand, Scenario } from "./types"
import { createInitialState, executeCommand } from "./engine"
import { parseCommand } from "./parser"
import { getScenario, scenarios } from "./scenarios"
import { registerLabModule } from "@/lib/lab-registry"
import { GitHubModal } from "@/components/git-lab/github-modal"

function asGitState(s: unknown): GitLabState {
  return s as GitLabState
}

export const GIT_LAB_MODULE: LabModule = {
  id: "github",
  name: "Git & GitHub",

  createInitialState() {
    return createInitialState()
  },

  parseCommand(input) {
    return parseCommand(input) as unknown as { type: string } & Record<string, unknown>
  },

  executeCommand(state, who, parsed) {
    return executeCommand(asGitState(state), who, parsed as ParsedCommand)
  },

  getScenario(id) {
    return getScenario(id) as unknown as LabModule["getScenario"] extends (id: string) => infer R ? R : never
  },

  get scenarios() {
    return scenarios as unknown as LabModule["scenarios"]
  },

  get defaultScenarioId() {
    return scenarios[0]?.id ?? "two-collaborators"
  },

  onStepMatch(scenarioId, stepIndex, state, addLine) {
    const s = asGitState(state)

    if (scenarioId === "branch-and-pr") {
      if (stepIndex === 1) {
        s.localB.workingDirChanges = ["index.html"]
        addLine("B", { text: "You've made edits to index.html — stage them with git add.", type: "info" })
      } else if (stepIndex === 6) {
        const pr = s.prs[s.prs.length - 1]
        if (pr?.status === "changes-requested") {
          s.localB.workingDirChanges = ["index.html"]
          const lastReview = pr.reviews[pr.reviews.length - 1]
          if (lastReview?.body) {
            addLine("B", { text: `Senior Dev requested changes: "${lastReview.body}"`, type: "info" })
          }
          addLine("B", { text: "Fix the issues, stage, commit, and push to update the PR.", type: "info" })
        }
      }
    } else if (scenarioId === "conflict-local" || scenarioId === "conflict-github") {
      if (stepIndex === 0) {
        s.localA.workingDirChanges = ["README.md"]
        addLine("A", { text: "You've edited README.md on this branch — stage it with git add.", type: "info" })
      } else if (stepIndex === 3) {
        s.localA.workingDirChanges = ["README.md"]
        addLine("A", { text: "You've edited README.md differently on main — stage it to create the conflict.", type: "info" })
      }
    } else if (scenarioId === "conflict-drill-same-line" || scenarioId === "conflict-drill-whitespace") {
      if (stepIndex === 0) {
        s.localA.workingDirChanges = ["style.css"]
        addLine("A", { text: "You've edited style.css on this branch — stage it with git add.", type: "info" })
      } else if (stepIndex === 3) {
        s.localA.workingDirChanges = ["style.css"]
        addLine("A", { text: "You've edited style.css differently on main — stage it to create the conflict.", type: "info" })
      }
    } else if (scenarioId === "conflict-drill-modify-delete") {
      if (stepIndex === 0) {
        s.localA.workingDirChanges = ["about.md"]
        addLine("A", { text: "about.md has been deleted on this branch — stage the removal with git add.", type: "info" })
      } else if (stepIndex === 3) {
        s.localA.workingDirChanges = ["about.md"]
        addLine("A", { text: "about.md still exists on main — edit and stage it to create the conflict.", type: "info" })
      }
    } else if (scenarioId === "gitignore-practice") {
      if (stepIndex === 1) {
        s.localA.ignoredPatterns = ["*.log", "*.tmp"]
        addLine("A", { text: ".gitignore patterns activated — debug.log and app.tmp are now ignored.", type: "info" })
      }
    } else if (scenarioId === "capstone-parallel") {
      if (stepIndex === 0) {
        s.localB.workingDirChanges = ["index.html", "style.css"]
        addLine("B", { text: "You've edited index.html and style.css on this branch — stage them.", type: "info" })
      } else if (stepIndex === 7) {
        s.localA.workingDirChanges = ["index.html", "style.css"]
        addLine("A", { text: "You've edited index.html and style.css for the hero section — stage them.", type: "info" })
      }
    }

    return s
  },

  mergeSavedState(freshState, saved) {
    const fresh = asGitState(freshState)
    const savedState = saved as unknown as GitLabState
    fresh.scenario.currentStep = savedState.scenario.currentStep
    fresh.scenario.completedMask = savedState.scenario.completedMask
    fresh.localA.workingDirChanges = savedState.localA.workingDirChanges
    fresh.localA.staged = savedState.localA.staged
    fresh.localA.currentBranch = savedState.localA.currentBranch
    fresh.localB.workingDirChanges = savedState.localB.workingDirChanges
    fresh.localB.staged = savedState.localB.staged
    fresh.localB.currentBranch = savedState.localB.currentBranch
    fresh.mergeInProgress = savedState.mergeInProgress
    fresh.conflictType = savedState.conflictType
    return fresh
  },

  getTerminalHeader(state, who) {
    const s = asGitState(state)
    const local = who === "A" ? s.localA : s.localB
    return {
      repo: "team-practice",
      branch: local.currentBranch,
      contextItems: [
        ...(local.staged.length > 0 ? [{ label: "staged", value: String(local.staged.length) }] : []),
        { label: "commits", value: String(Object.keys(local.allCommits).length) },
      ],
    }
  },

  getInitialLines(who, _scenario) {
    return [
      {
        text: `Cloned into 'team-practice/' — logged in as ${who === "A" ? "Senior Dev" : "Junior Dev"}`,
        type: "info",
      },
    ]
  },

  ActionModal: GitHubModal as any,
}

registerLabModule(GIT_LAB_MODULE)
