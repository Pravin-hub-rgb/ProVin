"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import {
  createInitialState,
  executeCommand,
  parseCommand,
  getScenario,
  scenarios,
  type GitLabState,
  type TerminalLine,
} from "@/lib/git-lab"
import { getLabSubject } from "@/lib/lab-data"
import { TerminalPanel } from "@/components/git-lab/terminal-panel"
import { OriginPanel } from "@/components/git-lab/origin-panel"
import { StepProgress } from "@/components/git-lab/step-progress"
import { ScenarioSelector } from "@/components/git-lab/scenario-selector"
import { GitHubModal } from "@/components/git-lab/github-modal"
import Celebration from "@/components/git-lab/celebration"

interface LabPersistence {
  scenarioId: string
  state: GitLabState
}

function applySetup(id: string): { state: GitLabState; scenario: ReturnType<typeof getScenario> } {
  const scenario = getScenario(id)!
  const initial = createInitialState()
  initial.scenario.id = id
  if (scenario?.setup) {
    scenario.setup(initial)
  }
  return { state: initial, scenario }
}

const defaultId = scenarios[0]?.id ?? "two-collaborators"

export default function SubjectLabPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const subjectId = params.subjectId as string
  const scenarioParam = searchParams.get("scenario")

  const subject = getLabSubject(subjectId)
  const storageKey = `lab:${subjectId}`

  const initialScenarioId = scenarioParam && getScenario(scenarioParam) ? scenarioParam : defaultId
  const [state, setState] = useState<GitLabState>(() => applySetup(initialScenarioId).state)
  const scenarioRef = useRef(applySetup(initialScenarioId).scenario)
  const initializedRef = useRef(false)

  const terminalALinesRef = useRef<TerminalLine[]>([
    { text: `Cloned into 'team-practice/' — logged in as Senior Dev`, type: "info" },
    { text: `Scenario: [${scenarioRef.current!.phase}] ${scenarioRef.current!.title}`, type: "info" },
    { text: scenarioRef.current!.description, type: "info" },
  ])
  const terminalBLinesRef = useRef<TerminalLine[]>([
    { text: `Cloned into 'team-practice/' — logged in as Junior Dev`, type: "info" },
  ])

  const [, forceUpdate] = useState(0)
  const [showGithubModal, setShowGithubModal] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const scenario = scenarioRef.current!
  const currentStep = state.scenario.currentStep
  const step = scenario.steps[currentStep]
  const done = currentStep >= scenario.steps.length

  function persist(newState: GitLabState) {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          scenarioId: newState.scenario.id,
          state: newState,
        } satisfies LabPersistence),
      )
    } catch {}
  }

  function freshLines(scenario: ReturnType<typeof getScenario>) {
    terminalALinesRef.current = [
      { text: `Cloned into 'team-practice/' — logged in as Senior Dev`, type: "info" },
      { text: `Scenario: [${scenario!.phase}] ${scenario!.title}`, type: "info" },
      { text: scenario!.description, type: "info" },
    ]
    terminalBLinesRef.current = [
      { text: `Cloned into 'team-practice/' — logged in as Junior Dev`, type: "info" },
    ]
  }

  // Initialize: localStorage > query param (chapter link) > default
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    // 1. Try to restore saved state
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const data = JSON.parse(raw) as LabPersistence
        const scenario = getScenario(data.scenarioId)
        if (scenario) {
          // Query param for a different scenario? Fresh start for that one.
          if (scenarioParam && getScenario(scenarioParam) && scenarioParam !== data.scenarioId) {
            const { state: newState, scenario: newScenario } = applySetup(scenarioParam)
            scenarioRef.current = newScenario
            setState(newState)
            freshLines(newScenario)
            forceUpdate((n) => n + 1)
            return
          }
          // Same scenario (or no query param) → re-apply setup for correct
          // branch structure, then merge in saved in-flight state
          const { state: freshState, scenario: freshScenario } = applySetup(data.scenarioId)
          const saved = data.state
          freshState.scenario.currentStep = saved.scenario.currentStep
          freshState.localA.workingDirChanges = saved.localA.workingDirChanges
          freshState.localA.staged = saved.localA.staged
          freshState.localA.currentBranch = saved.localA.currentBranch
          freshState.localB.workingDirChanges = saved.localB.workingDirChanges
          freshState.localB.staged = saved.localB.staged
          freshState.localB.currentBranch = saved.localB.currentBranch
          freshState.mergeInProgress = saved.mergeInProgress
          freshState.conflictType = saved.conflictType
          scenarioRef.current = freshScenario
          setState(freshState)
          freshLines(freshScenario)
          forceUpdate((n) => n + 1)
          return
        }
      }
    } catch {}

    // 2. Query param scenario — fresh start (no saved state found)
    if (scenarioParam && getScenario(scenarioParam)) {
      const { state: newState, scenario: newScenario } = applySetup(scenarioParam)
      scenarioRef.current = newScenario
      setState(newState)
      freshLines(newScenario)
      forceUpdate((n) => n + 1)
      return
    }

    // 3. Default — already rendered correctly
    forceUpdate((n) => n + 1)
  }, [scenarioParam, storageKey])

  function addLine(who: "A" | "B", line: TerminalLine) {
    const ref = who === "A" ? terminalALinesRef : terminalBLinesRef
    ref.current = [...ref.current, line]
  }

  const handleCommand = useCallback(
    (who: "A" | "B", raw: string) => {
      const parsed = parseCommand(raw)
      if (parsed.type === "ignore") return

      addLine(who, { text: `$ ${raw}`, type: "cmd" })

      const { newState, result } = executeCommand(state, who, parsed)

      const matched = step && step.actor === who && step.match(parsed)

      const parsedWell = parsed.type !== "unknown" && parsed.type !== "error"

      if (matched) {
        // Step-specific effects
        if (state.scenario.id === "branch-and-pr") {
          if (currentStep === 1) {
            newState.localB.workingDirChanges = ["index.html"]
            addLine("B", { text: "You've made edits to index.html — stage them with git add.", type: "info" })
          } else if (currentStep === 6) {
            const pr = newState.prs[newState.prs.length - 1]
            if (pr?.status === "changes-requested") {
              newState.localB.workingDirChanges = ["index.html"]
              const lastReview = pr.reviews[pr.reviews.length - 1]
              if (lastReview?.body) {
                addLine("B", { text: `Senior Dev requested changes: "${lastReview.body}"`, type: "info" })
              }
              addLine("B", { text: "Fix the issues, stage, commit, and push to update the PR.", type: "info" })
            }
          }
        } else if (state.scenario.id === "conflict-local" || state.scenario.id === "conflict-github") {
          if (currentStep === 0) {
            newState.localA.workingDirChanges = ["README.md"]
            addLine("A", { text: "You've edited README.md on this branch — stage it with git add.", type: "info" })
          } else if (currentStep === 3) {
            newState.localA.workingDirChanges = ["README.md"]
            addLine("A", { text: "You've edited README.md differently on main — stage it to create the conflict.", type: "info" })
          }
        } else if (state.scenario.id === "conflict-drill-same-line" || state.scenario.id === "conflict-drill-whitespace") {
          if (currentStep === 0) {
            newState.localA.workingDirChanges = ["style.css"]
            addLine("A", { text: "You've edited style.css on this branch — stage it with git add.", type: "info" })
          } else if (currentStep === 3) {
            newState.localA.workingDirChanges = ["style.css"]
            addLine("A", { text: "You've edited style.css differently on main — stage it to create the conflict.", type: "info" })
          }
        } else if (state.scenario.id === "conflict-drill-modify-delete") {
          if (currentStep === 0) {
            newState.localA.workingDirChanges = ["about.md"]
            addLine("A", { text: "about.md has been deleted on this branch — stage the removal with git add.", type: "info" })
          } else if (currentStep === 3) {
            newState.localA.workingDirChanges = ["about.md"]
            addLine("A", { text: "about.md still exists on main — edit and stage it to create the conflict.", type: "info" })
          }
        } else if (state.scenario.id === "gitignore-practice") {
          if (currentStep === 1) {
            newState.localA.ignoredPatterns = ["*.log", "*.tmp"]
            addLine("A", { text: ".gitignore patterns activated — debug.log and app.tmp are now ignored.", type: "info" })
          }
        } else if (state.scenario.id === "capstone-parallel") {
          if (currentStep === 0) {
            newState.localB.workingDirChanges = ["index.html", "style.css"]
            addLine("B", { text: "You've edited index.html and style.css on this branch — stage them.", type: "info" })
          } else if (currentStep === 7) {
            newState.localA.workingDirChanges = ["index.html", "style.css"]
            addLine("A", { text: "You've edited index.html and style.css for the hero section — stage them.", type: "info" })
          }
        }

        const nextStep = step.getNextStep?.(newState) ?? newState.scenario.currentStep + 1
        newState.scenario = {
          ...newState.scenario,
          currentStep: nextStep,
        }

        if (nextStep >= scenario.steps.length) {
          setShowCelebration(true)
        }
      } else if (parsedWell) {
        addLine(who, {
          text: "Command recognized, but not the expected one for this step. Check the instruction above or use the hint button.",
          type: "info",
        })
      }

      setState(newState)
      persist(newState)

      for (const line of result.lines) {
        addLine(who, { text: line, type: "output" })
      }

      if (matched) {
        addLine(who, { text: `\u2713 Step completed!`, type: "info" })
        if (step.githubAction) setShowGithubModal(false)
      }

      forceUpdate((n) => n + 1)
    },
    [state, step]
  )

  function handleScenarioChange(id: string) {
    try { localStorage.removeItem(storageKey) } catch {}
    const { state: newState, scenario: newScenario } = applySetup(id)
    scenarioRef.current = newScenario
    setState(newState)
    persist(newState)
    freshLines(newScenario)
    forceUpdate((n) => n + 1)
  }

  function handleReset() {
    try { localStorage.removeItem(storageKey) } catch {}
    const { state: newState, scenario: newScenario } = applySetup(state.scenario.id)
    scenarioRef.current = newScenario
    setState(newState)
    persist(newState)
    freshLines(newScenario)
    forceUpdate((n) => n + 1)
  }

  if (!subject) {
    return (
      <div className="min-h-screen bg-[#010409] text-[#e6edf3] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8b949e] mb-4">Lab not found for &quot;{subjectId}&quot;</p>
          <Link href="/lab" className="text-[#58a6ff] hover:underline text-sm">
            &larr; Back to Lab Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className="h-screen overflow-hidden flex flex-col"
      style={{ background: "#010409", color: "#e6edf3" }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 2px; }
      `}</style>

      {/* Top bar */}
      <div
        className="border-b px-4 py-3 flex flex-col gap-2.5"
        style={{ background: "#0d1117", borderColor: "#21262d" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/lab"
            className="text-[#c9d1d9] text-xs hover:text-[#58a6ff] transition-colors"
          >
            &larr; Lab
          </Link>
          <span className="text-[#484f58]">|</span>
          <span className="text-xs font-semibold text-[#e6edf3]">{subject.title}</span>
          <span className="text-[#484f58]">{">"}</span>
          <ScenarioSelector
            selectedId={state.scenario.id}
            onSelect={handleScenarioChange}
          />
          <button
            onClick={handleReset}
            className="ml-auto flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border transition-all hover:brightness-110"
            style={{
              borderColor: "#30363d",
              color: "#c9d1d9",
              background: "#161b22",
            }}
            title="Restart this scenario from scratch"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
          {done && (
            <span className="bg-[#3fb95022] border border-[#3fb950] text-[#3fb950] text-[11px] px-2.5 py-1 rounded-md">
              \u2713 Scenario complete
            </span>
          )}
        </div>
        <OriginPanel origin={state.origin} />
        <StepProgress scenario={scenario} currentStep={currentStep} />
      </div>

      {/* Terminal panels */}
      <div
        className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-3 p-3 relative overflow-hidden"
      >
        {/* GitHub modal */}
        {showGithubModal && step?.githubAction && !done && (
          <div className="absolute inset-0 z-40 flex items-center justify-center" style={{ background: "rgba(1,4,9,0.75)" }}>
            <div
              className="w-full max-w-lg rounded-xl border p-5 shadow-2xl relative"
              style={{
                background: "#161b22",
                borderColor: "#30363d",
                animation: "fadeIn 0.15s ease",
              }}
            >
              <button
                onClick={() => setShowGithubModal(false)}
                className="absolute top-3 right-3 text-[#484f58] hover:text-[#8b949e] transition-colors z-50"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <GitHubModal
                action={step.githubAction as "create-pr" | "review-pr" | "merge-pr" | "resolve-conflict"}
                state={state}
                actor={step.actor as "A" | "B"}
                color={step.actor === "A" ? "#58a6ff" : "#bc8cff"}
                isFirstReview={currentStep === 6}
                onSubmit={(who, cmd) => {
                  handleCommand(who, cmd)
                }}
              />
            </div>
          </div>
        )}

        {/* GitHub button inside instruction bar */}

        <TerminalPanel
          who="A"
          label="Senior Dev"
          color="#58a6ff"
          lines={terminalALinesRef.current}
          onCommand={handleCommand}
          isMyTurn={done || showGithubModal ? false : step?.actor === "A"}
          instruction={done ? "" : step?.instruction ?? ""}
          hints={step?.hints}
          branch={state.localA.currentBranch}
          stagedCount={state.localA.staged.length}
          commitCount={Object.keys(state.localA.allCommits).length}
          onGithubClick={!showGithubModal && step?.githubAction && step?.actor === "A" ? () => setShowGithubModal(true) : undefined}
        />
        <TerminalPanel
          who="B"
          label="Junior Dev"
          color="#bc8cff"
          lines={terminalBLinesRef.current}
          onCommand={handleCommand}
          isMyTurn={done || showGithubModal ? false : step?.actor === "B"}
          instruction={done ? "" : step?.instruction ?? ""}
          hints={step?.hints}
          branch={state.localB.currentBranch}
          stagedCount={state.localB.staged.length}
          commitCount={Object.keys(state.localB.allCommits).length}
          onGithubClick={!showGithubModal && step?.githubAction && step?.actor === "B" ? () => setShowGithubModal(true) : undefined}
        />
      </div>
      {showCelebration && <Celebration />}
    </div>
  )
}
