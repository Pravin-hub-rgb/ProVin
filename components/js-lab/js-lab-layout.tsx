"use client"

import { useState } from "react"
import type { LabLayoutProps } from "@/lib/lab-registry"
import type { JsLabState } from "@/lib/js-lab/types"
import { CodeEditor } from "./code-editor"
import { OutputConsole } from "./output-console"
import { HintButton } from "@/components/git-lab/hint-button"
import { SolutionButton } from "@/components/git-lab/solution-button"

export function JsLabLayout({
  state,
  onCommand,
  step,
  done,
  onStepBack,
  onStepForward,
  canGoForward,
  currentStep = 0,
  totalSteps = 0,
}: LabLayoutProps) {
  const s = state as JsLabState
  const [code, setCode] = useState(s.userCode || "// Write your JavaScript here...\n")

  const displayFeedback = done ? "All steps complete!" : s.feedback ?? null

  function handleRun() {
    onCommand("A", code)
  }

  const instruction = done ? "" : step?.instruction ?? ""

  return (
    <div className="flex-1 min-h-0 flex flex-col p-3 gap-3 overflow-hidden">
      {/* Instruction bar */}
      <div
        className="flex items-start gap-3 px-4 py-3 rounded-lg border shrink-0"
        style={{ background: "#161b22", borderColor: "#30363d" }}
      >
        {instruction ? (
          <>
            <span className="text-[#3fb950] text-xs font-bold mt-0.5 shrink-0">&#9654;</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#e6edf3] whitespace-pre-wrap leading-relaxed">{instruction}</p>
            </div>
          </>
        ) : done ? (
          <>
            <span className="text-[#3fb950] text-xs font-bold mt-0.5 shrink-0">&#10003;</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#3fb950]">All steps complete!</p>
            </div>
          </>
        ) : null}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <button
            onClick={onStepBack}
            disabled={currentStep === 0}
            className="flex items-center gap-1 text-[11px] px-1.5 py-1 rounded border transition-all hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: "#30363d", color: "#c9d1d9", background: "#0d1117" }}
            title="Go back one step"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-[#8b949e] text-sm tabular-nums select-none font-semibold">
            {currentStep + 1}/{totalSteps}
          </span>
          <button
            onClick={onStepForward}
            disabled={currentStep >= totalSteps - 1}
            className="flex items-center gap-1 text-[11px] px-1.5 py-1 rounded border transition-all hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: "#30363d", color: "#c9d1d9", background: "#0d1117" }}
            title="Go to next step"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {step?.solution && <SolutionButton solution={step.solution} color="#2ea043" />}
          {step?.hints && <HintButton hints={step.hints} color="#58a6ff" />}
        </div>
      </div>

      {/* Editor + Console */}
      <div className="flex-1 min-h-0 flex gap-3 overflow-hidden">
        {/* Code editor */}
        <div className="flex-1 min-w-0">
          <CodeEditor value={code} onChange={setCode} onRun={handleRun} />
        </div>

        {/* Output */}
        <div className="w-1/3 min-w-[200px] flex flex-col gap-2">
          <div className="flex-1 min-h-0">
            <OutputConsole
              output={s.lastOutput}
              error={s.lastError}
              feedback={displayFeedback}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
