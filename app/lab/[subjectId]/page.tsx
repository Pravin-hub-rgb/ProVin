"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { getLabModule, getLabSubject } from "@/lib/lab-registry"
import type { TerminalLine, Scenario, LabModule } from "@/lib/lab-registry"
import { TerminalPanel } from "@/components/git-lab/terminal-panel"
import { StepProgress } from "@/components/git-lab/step-progress"
import { ScenarioSelector } from "@/components/git-lab/scenario-selector"
import Celebration from "@/components/git-lab/celebration"

// Trigger module registration
import "@/lib/git-lab"
import "@/lib/ai-lab"
import "@/lib/js-lab"
import "@/lib/react-lab"

export default function SubjectLabPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const subjectId = params.subjectId as string
  const scenarioParam = searchParams.get("scenario")

  const subject = getLabSubject(subjectId)
  const lab = getLabModule(subjectId)

  if (!subject || !lab) {
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

  if (lab.scenarios.length === 0) {
    return (
      <div className="min-h-screen bg-[#010409] text-[#e6edf3] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8b949e] text-lg mb-2">Coming Soon</p>
          <p className="text-[#8b949e] mb-4">
            Interactive scenarios for {subject.title} are being built.
          </p>
          <Link href="/lab" className="text-[#58a6ff] hover:underline text-sm">
            &larr; Back to Lab Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return <SubjectLabPageInner subjectId={subjectId} lab={lab} scenarioParam={scenarioParam ?? null} />
}

function applySetup(lab: LabModule, id: string): { state: unknown; scenario: Scenario } {
  const scenario = lab.getScenario(id)
  if (!scenario) {
    throw new Error(`Scenario "${id}" not found in lab "${lab.id}"`)
  }
  const state = lab.createInitialState() as { scenario: { id: string; currentStep: number; completedMask: number } }
  state.scenario.id = id
  state.scenario.completedMask ??= 0
  if (scenario.setup) {
    scenario.setup(state)
  }
  return { state, scenario }
}

function SubjectLabPageInner({
  subjectId,
  lab,
  scenarioParam,
}: {
  subjectId: string
  lab: LabModule
  scenarioParam: string | null
}) {
  const storageKey = `lab:${subjectId}`
  const initialScenarioId: string = scenarioParam && lab.getScenario(scenarioParam) ? scenarioParam : lab.defaultScenarioId

  const [state, setState] = useState<unknown>(() => applySetup(lab, initialScenarioId).state)
  const [resetKey, setResetKey] = useState(0)
  const scenarioRef = useRef<Scenario>(applySetup(lab, initialScenarioId).scenario)
  const initializedRef = useRef(false)

  const terminalALinesRef = useRef<TerminalLine[]>([
    ...lab.getInitialLines("A", scenarioRef.current!),
    {
      text: `Scenario: [${scenarioRef.current!.phase}] ${scenarioRef.current!.title}`,
      type: "info",
    },
    { text: scenarioRef.current!.description, type: "info" },
  ])
  const terminalBLinesRef = useRef<TerminalLine[]>([...lab.getInitialLines("B", scenarioRef.current!)])

  const [, forceUpdate] = useState(0)
  const [showActionModal, setShowActionModal] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)

  const historyRef = useRef<Record<number, { state: unknown; linesA: TerminalLine[]; linesB: TerminalLine[] }>>({})

  const scenario = scenarioRef.current!
  const currentStep = (state as { scenario: { currentStep: number } }).scenario.currentStep
  const completedMask = (state as { scenario: { completedMask: number } }).scenario.completedMask ?? 0
  const step = scenario.steps[currentStep]
  const allStepsMask = (1 << scenario.steps.length) - 1
  const done = (completedMask & allStepsMask) === allStepsMask

  function persist(newState: unknown, scenarioId?: string) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ scenarioId: scenarioId ?? scenarioRef.current.id, state: newState }))
    } catch {}
  }

  function freshLines(s: Scenario) {
    terminalALinesRef.current = [
      ...lab.getInitialLines("A", s),
      { text: `Scenario: [${s.phase}] ${s.title}`, type: "info" },
      { text: s.description, type: "info" },
    ]
    terminalBLinesRef.current = [...lab.getInitialLines("B", s)]
  }

  // Initialize: localStorage > query param > default
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const data = JSON.parse(raw) as { scenarioId: string; state: Record<string, unknown> }
        const savedScenario = lab.getScenario(data.scenarioId)
        if (savedScenario) {
          if (scenarioParam && lab.getScenario(scenarioParam) && scenarioParam !== data.scenarioId) {
            const { state: newState, scenario: newScenario } = applySetup(lab, scenarioParam)
            scenarioRef.current = newScenario
            setState(newState)
            freshLines(newScenario)
            forceUpdate((n) => n + 1)
            return
          }

          const { state: freshState, scenario: freshScenario } = applySetup(lab, data.scenarioId)
          const merged = lab.mergeSavedState?.(freshState, data.state) ?? freshState
          scenarioRef.current = freshScenario
          setState(merged)
          freshLines(freshScenario)
          forceUpdate((n) => n + 1)
          return
        }
      }
    } catch {}

    if (scenarioParam && lab.getScenario(scenarioParam)) {
      const { state: newState, scenario: newScenario } = applySetup(lab, scenarioParam)
      scenarioRef.current = newScenario
      setState(newState)
      freshLines(newScenario)
      forceUpdate((n) => n + 1)
      return
    }

    forceUpdate((n) => n + 1)
  }, [scenarioParam, storageKey, lab])

  function addLine(who: "A" | "B", line: TerminalLine) {
    const ref = who === "A" ? terminalALinesRef : terminalBLinesRef
    ref.current = [...ref.current, line]
  }

  const handleCommand = useCallback(
    async (who: "A" | "B", raw: string) => {
      const parsed = lab.parseCommand(raw)
      if (parsed.type === "ignore") return

      addLine(who, { text: `$ ${raw}`, type: "cmd" })

      const { newState, result } = await lab.executeCommand(state, who, parsed)

      const matched = step && step.actor === who && (await step.match(parsed))

      const parsedWell = parsed.type !== "unknown" && parsed.type !== "error"

      if (matched && lab.onStepMatch) {
        lab.onStepMatch((state as { scenario: { id: string } }).scenario.id, currentStep, newState, addLine)
      }

      if (matched) {
        // Mark this step as completed in the bitmask
        const sc = newState as { scenario: { completedMask: number; currentStep: number; id: string } }
        sc.scenario.completedMask = (sc.scenario.completedMask ?? 0) | (1 << currentStep)

        // Save snapshot for this step
        historyRef.current[currentStep] = {
          state: JSON.parse(JSON.stringify(newState)),
          linesA: [...terminalALinesRef.current],
          linesB: [...terminalBLinesRef.current],
        }
        // Trim any forward history beyond this point
        Object.keys(historyRef.current).forEach((k) => {
          if (Number(k) > currentStep) delete historyRef.current[Number(k)]
        })

        // Check if all steps completed
        const allMask = (1 << scenario.steps.length) - 1
        if ((sc.scenario.completedMask & allMask) === allMask) {
          setShowCelebration(true)
        }

        // Save initial history snapshot if not yet saved
        if (!historyRef.current[0]) {
          historyRef.current[0] = {
            state: JSON.parse(JSON.stringify(state)),
            linesA: [...terminalALinesRef.current],
            linesB: [...terminalBLinesRef.current],
          }
        }
      } else if (parsedWell) {
        addLine(who, {
          text: "Command recognized, but not the expected one for this step. Check the instruction above or use the hint button.",
          type: "info",
        })
      }

      // Set feedback on state for custom layouts that display it directly
      const stateWithFeedback = newState as { feedback?: string | null; scenario: { completedMask: number } }
      if (matched) {
        stateWithFeedback.feedback = "\u2713 Step completed!"
        addLine(who, { text: "\u2713 Step completed!", type: "info" })
        if (step.actionType || step.githubAction) setShowActionModal(false)
      } else if (parsedWell) {
        stateWithFeedback.feedback = "Output doesn't match expected. Check the instruction and try again."
      } else {
        stateWithFeedback.feedback = null
      }

      setState(newState)
      persist(newState)

      for (const line of result.lines) {
        addLine(who, { text: line, type: "output" })
      }

      forceUpdate((n) => n + 1)
    },
    [state, step, lab, currentStep, scenario.steps.length],
  )

  function handleScenarioChange(id: string) {
    try { localStorage.removeItem(storageKey) } catch {}
    const { state: newState, scenario: newScenario } = applySetup(lab, id)
    scenarioRef.current = newScenario
    setState(newState)
    persist(newState)
    freshLines(newScenario)
    historyRef.current = {}
    setShowCelebration(false)
    setCanGoForward(false)
    forceUpdate((n) => n + 1)
  }

  function handleReset() {
    try { localStorage.removeItem(storageKey) } catch {}
    const currentId = (state as { scenario: { id: string } }).scenario.id
    try { localStorage.removeItem(`react-lab-code-${currentId}`) } catch {}
    const { state: newState, scenario: newScenario } = applySetup(lab, currentId)
    scenarioRef.current = newScenario
    setState(newState)
    persist(newState)
    freshLines(newScenario)
    historyRef.current = {}
    setShowCelebration(false)
    setCanGoForward(false)
    setResetKey(k => k + 1)
    forceUpdate((n) => n + 1)
  }

  function handleBack() {
    const prev = currentStep - 1
    if (prev < 0) return
    const snapshot = historyRef.current[prev]
    if (snapshot) {
      setState(snapshot.state)
      terminalALinesRef.current = [...snapshot.linesA]
      terminalBLinesRef.current = [...snapshot.linesB]
    } else {
      const updated: { scenario: { currentStep: number; completedMask: number } } = JSON.parse(JSON.stringify(state))
      updated.scenario.currentStep = prev
      updated.scenario.completedMask ??= 0
      setState(updated)
    }
    setCanGoForward(true)
    forceUpdate((n) => n + 1)
  }

  function handleForward() {
    const next = currentStep + 1
    if (next >= scenario.steps.length) return
    const snapshot = historyRef.current[next]
    if (snapshot) {
      setState(snapshot.state)
      terminalALinesRef.current = [...snapshot.linesA]
      terminalBLinesRef.current = [...snapshot.linesB]
      setCanGoForward(!!historyRef.current[next + 1])
    } else {
      const updated: { scenario: { currentStep: number; completedMask: number } } = JSON.parse(JSON.stringify(state))
      updated.scenario.currentStep = next
      updated.scenario.completedMask ??= 0
      setState(updated)
      setCanGoForward(next < scenario.steps.length - 1)
    }
    forceUpdate((n) => n + 1)
  }

  function handleStepClick(step: number) {
    if (step < 0 || step >= scenario.steps.length || step === currentStep) return
    const snapshot = historyRef.current[step]
    if (snapshot) {
      setState(snapshot.state)
      terminalALinesRef.current = [...snapshot.linesA]
      terminalBLinesRef.current = [...snapshot.linesB]
    } else {
      const updated: { scenario: { currentStep: number; completedMask: number } } = JSON.parse(JSON.stringify(state))
      updated.scenario.currentStep = step
      updated.scenario.completedMask ??= 0
      setState(updated)
    }
    setCanGoForward(!!historyRef.current[step + 1])
    setShowCelebration(false)
    forceUpdate((n) => n + 1)
  }

  const headerA = lab.getTerminalHeader(state, "A")
  const headerB = lab.getTerminalHeader(state, "B")

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
          <span className="text-xs font-semibold text-[#e6edf3]">
            {subjectId === "github" ? "Git & GitHub" : subjectId === "agenticai" ? "Agentic AI" : subjectId}
          </span>
          <span className="text-[#484f58]">{">"}</span>
          <button
            onClick={() => {
              const currentId = scenarioRef.current.id
              const idx = lab.scenarios.findIndex(s => s.id === currentId)
              if (idx > 0) handleScenarioChange(lab.scenarios[idx - 1].id)
            }}
            disabled={(lab.scenarios.findIndex(s => s.id === scenarioRef.current.id)) <= 0}
            className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border transition-all hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: "#30363d", color: "#c9d1d9", background: "#161b22" }}
            title="Previous scenario"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <ScenarioSelector
            subjectId={subjectId}
            selectedId={(state as { scenario: { id: string } }).scenario.id}
            onSelect={handleScenarioChange}
          />
          <button
            onClick={() => {
              const currentId = scenarioRef.current.id
              const idx = lab.scenarios.findIndex(s => s.id === currentId)
              if (idx < lab.scenarios.length - 1) handleScenarioChange(lab.scenarios[idx + 1].id)
            }}
            disabled={(lab.scenarios.findIndex(s => s.id === scenarioRef.current.id)) >= lab.scenarios.length - 1}
            className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border transition-all hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: "#30363d", color: "#c9d1d9", background: "#161b22" }}
            title="Next scenario"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
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
          {!lab.Layout && done && (
            <span className="bg-[#3fb95022] border border-[#3fb950] text-[#3fb950] text-[11px] px-2.5 py-1 rounded-md">
              {"\u2713"} Scenario complete
            </span>
          )}
        </div>
        {lab.RemotePanel && <lab.RemotePanel state={state} />}
        {!lab.Layout && (
          <StepProgress scenario={scenario} currentStep={currentStep} completedMask={completedMask} actorLabels={lab.actorLabels} onStepClick={handleStepClick} />
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 min-h-0 flex flex-col">
        {lab.Layout ? (
          <lab.Layout
            resetKey={resetKey}
            state={state}
            onCommand={handleCommand}
            step={step}
            done={done}
            terminalALines={terminalALinesRef.current}
            terminalBLines={terminalBLinesRef.current}
            headerA={headerA}
            headerB={headerB}
            showActionModal={showActionModal}
            setShowActionModal={setShowActionModal}
            onStepBack={handleBack}
            onStepForward={handleForward}
            canGoForward={canGoForward}
            currentStep={currentStep}
            totalSteps={scenario.steps.length}
          />
        ) : (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 p-3 overflow-hidden relative">
            {/* Action modal */}
            {showActionModal && (step?.actionType || step?.githubAction) && !done && lab.ActionModal && (
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
                    onClick={() => setShowActionModal(false)}
                    className="absolute top-3 right-3 text-[#484f58] hover:text-[#8b949e] transition-colors z-50"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <lab.ActionModal
                    action={step.actionType ?? step.githubAction ?? ""}
                    state={state}
                    actor={step.actor}
                    color={step.actor === "A" ? "#58a6ff" : "#bc8cff"}
                    onCommand={handleCommand}
                  />
                </div>
              </div>
            )}

            <TerminalPanel
              who="A"
              label="Senior Dev"
              color="#58a6ff"
              lines={terminalALinesRef.current}
              onCommand={handleCommand}
              isMyTurn={done || showActionModal ? false : step?.actor === "A"}
              instruction={done ? "" : step?.instruction ?? ""}
              hints={step?.hints}
              solution={step?.solution}
              solutionOutput={step?.solutionOutput}
              repo={headerA.repo}
              branch={headerA.branch}
              headerItems={headerA.contextItems}
              onActionClick={!showActionModal && (step?.actionType || step?.githubAction) && step?.actor === "A" ? () => setShowActionModal(true) : undefined}
              onStepBack={handleBack}
              onStepForward={handleForward}
              canGoForward={canGoForward}
              currentStep={currentStep}
              totalSteps={scenario.steps.length}
            />
            <TerminalPanel
              who="B"
              label="Junior Dev"
              color="#bc8cff"
              lines={terminalBLinesRef.current}
              onCommand={handleCommand}
              isMyTurn={done || showActionModal ? false : step?.actor === "B"}
              instruction={done ? "" : step?.instruction ?? ""}
              hints={step?.hints}
              solution={step?.solution}
              solutionOutput={step?.solutionOutput}
              repo={headerB.repo}
              branch={headerB.branch}
              headerItems={headerB.contextItems}
              onActionClick={!showActionModal && (step?.actionType || step?.githubAction) && step?.actor === "B" ? () => setShowActionModal(true) : undefined}
            />
          </div>
        )}
      </div>
      {showCelebration && <Celebration />}
    </div>
  )
}
