"use client"

import { useMemo, useState, useCallback, useEffect, useRef } from "react"
import type { LabLayoutProps } from "@/lib/lab-registry"
import { getReactScenario } from "@/lib/react-lab/scenarios"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react"
import type { SandpackFiles } from "@codesandbox/sandpack-react"
import type { CheckResult } from "@/lib/react-lab/types"

const reactTheme = {
  colors: {
    surface1: "#0d1117",
    surface2: "#161b22",
    surface3: "#21262d",
    disabled: "#484f58",
    base: "#8b949e",
    clickable: "#8b949e",
    hover: "#c9d1d9",
    accent: "#58a6ff",
    error: "#ff7b72",
    errorSurface: "#ff7b721a",
    warning: "#d29922",
    warningSurface: "#d299221a",
  },
  syntax: {
    plain: "#c9d1d9",
    comment: { color: "#8b949e", fontStyle: "italic" },
    keyword: "#ff7b72",
    definition: "#d2a8ff",
    punctuation: "#c9d1d9",
    property: "#79c0ff",
    tag: "#7ee787",
    static: "#a5d6ff",
    string: "#a5d6ff",
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Fira Code", "Fira Mono", Menlo, Consolas, monospace',
    size: "13px",
    lineHeight: "20px",
  },
}

function getFileContent(files: Record<string, unknown>, path: string): string {
  const f = files[path]
  if (!f) return ""
  if (typeof f === "string") return f
  return (f as { code: string }).code ?? ""
}

function CheckAnswer({ check }: { check: (files: Record<string, string>) => CheckResult[] }) {
  const { sandpack } = useSandpack()
  const [results, setResults] = useState<CheckResult[] | null>(null)

  const handleCheck = useCallback(() => {
    const files: Record<string, string> = {}
    for (const [path, f] of Object.entries(sandpack.files)) {
      files[path] = getFileContent(sandpack.files as Record<string, unknown>, path)
    }
    setResults(check(files))
  }, [sandpack.files, check])

  const passed = results ? results.filter((r) => r.passed).length : 0
  const total = results?.length ?? 0

  return (
    <div className="mt-4 pt-3 border-t" style={{ borderColor: "#21262d" }}>
      <button
        onClick={handleCheck}
        className="w-full text-xs py-1.5 px-3 rounded-md border transition-all hover:brightness-110 cursor-pointer"
        style={{
          borderColor: "#30363d",
          color: "#c9d1d9",
          background: "#161b22",
        }}
      >
        Check Answer
      </button>
      {results && (
        <div className="mt-2 space-y-1">
          <p className="text-xs" style={{ color: "#8b949e" }}>
            {passed}/{total} passed
          </p>
          {results.map((r, i) => (
            <p key={i} className="text-xs" style={{ color: r.passed ? "#3fb950" : "#ff7b72" }}>
              {r.passed ? "✅" : "❌"} {r.label}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

function ShowSolution({ solutionFiles }: { solutionFiles: SandpackFiles }) {
  const { sandpack } = useSandpack()
  const [showingSolution, setShowingSolution] = useState(false)
  const userCodeRef = useRef<Record<string, string> | null>(null)

  const handleToggle = useCallback(() => {
    if (showingSolution) {
      if (userCodeRef.current) {
        sandpack.resetAllFiles()
        for (const [path, code] of Object.entries(userCodeRef.current)) {
          sandpack.updateFile(path, code)
        }
        userCodeRef.current = null
      }
    } else {
      const snapshot: Record<string, string> = {}
      for (const [path, f] of Object.entries(sandpack.files)) {
        const code = typeof f === "string" ? f : (f as { code: string }).code
        if (code) snapshot[path] = code
      }
      userCodeRef.current = snapshot
      for (const [path, f] of Object.entries(solutionFiles)) {
        const code = typeof f === "string" ? f : (f as { code: string }).code
        sandpack.updateFile(path, code)
      }
    }
    setShowingSolution((o) => !o)
  }, [showingSolution, sandpack, solutionFiles])

  return (
    <div className="mt-2">
      <button
        onClick={handleToggle}
        className="w-full text-xs py-1.5 px-3 rounded-md border transition-all hover:brightness-110 cursor-pointer"
        style={{
          borderColor: showingSolution ? "#3fb950" : "#30363d",
          color: showingSolution ? "#3fb950" : "#c9d1d9",
          background: "#161b22",
        }}
      >
        {showingSolution ? "Hide Solution" : "Show Solution"}
      </button>
    </div>
  )
}

export function ReactLabLayout({
  state,
  currentStep,
}: LabLayoutProps) {
  const [panelOpen, setPanelOpen] = useState(true)
  const [hintsOpen, setHintsOpen] = useState(false)
  const sc = (state as { currentScenario?: { id: string } }).currentScenario
  const scenarioId = sc?.id ?? ((state as { scenario: { id: string } }).scenario?.id ?? "")
  const scenario = useMemo(() => getReactScenario(scenarioId), [scenarioId])

  useEffect(() => { setHintsOpen(false) }, [scenarioId])

  if (!scenario) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#8b949e]">
        <p>Select a scenario to begin.</p>
      </div>
    )
  }

  const files = scenario.starterFiles
  const fileKeys = Object.keys(files)

  return (
    <div className="flex-1 flex overflow-hidden">
      <SandpackProvider
        template="react-ts"
        files={files}
        theme={reactTheme as any}
        style={{ display: "contents" }}
        options={{
          visibleFiles: fileKeys as any,
          activeFile: "/App.tsx",

          classes: {
            "sp-wrapper": "h-full",
            "sp-layout": "h-full",
            "sp-tabs": "text-xs",
          },
        }}
      >

      {/* Left: Instructions panel */}
      <div
        className="flex-shrink-0 overflow-hidden border-r transition-all duration-200"
        style={{
          width: panelOpen ? 280 : 0,
          borderColor: "#21262d",
        }}
      >
        <div
          className="h-full overflow-y-auto p-4 text-sm"
          style={{
            width: 280,
            background: "#0d1117",
            color: "#c9d1d9",
          }}
        >
          <h2 className="text-base font-semibold text-[#e6edf3] mb-3">
            {scenario.title}
          </h2>
          <div className="prose prose-invert prose-sm max-w-none">
            {scenario.instructions.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h3 key={i} className="text-sm font-semibold text-[#e6edf3] mt-4 mb-2">
                    {line.replace("## ", "")}
                  </h3>
                )
              }
              if (line.startsWith("### ")) {
                return (
                  <h4 key={i} className="text-xs font-semibold text-[#e6edf3] mt-3 mb-1">
                    {line.replace("### ", "")}
                  </h4>
                )
              }
              if (line.startsWith("- **")) {
                return (
                  <li key={i} className="text-xs text-[#c9d1d9] ml-4">
                    {line.replace("- **", "").replace("**", "")}
                  </li>
                )
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="text-xs text-[#c9d1d9] ml-4">
                    {line.replace("- ", "")}
                  </li>
                )
              }
              if (line.trim() === "") return <br key={i} />

              const isCode = line.startsWith("  ") || line.startsWith("`")
              if (isCode) {
                return (
                  <code
                    key={i}
                    className="block text-xs bg-[#161b22] px-2 py-0.5 rounded"
                    style={{ color: "#e6edf3" }}
                  >
                    {line.trim()}
                  </code>
                )
              }
              return (
                <p key={i} className="text-xs text-[#c9d1d9] leading-relaxed">
                  {line}
                </p>
              )
            })}
          </div>

          {/* Hints toggle */}
          {scenario.hints.length > 0 && (
            <div className="mt-4 pt-3 border-t" style={{ borderColor: "#21262d" }}>
              <button
                onClick={() => setHintsOpen((o) => !o)}
                className="flex items-center gap-1.5 text-xs py-1 px-2 rounded-md border transition-all hover:brightness-110 cursor-pointer"
                style={{
                  borderColor: "#30363d",
                  color: "#c9d1d9",
                  background: "#161b22",
                }}
              >
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${hintsOpen ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                Show Hints
              </button>
              {hintsOpen && (
                <div className="mt-2 space-y-1">
                  {scenario.hints.map((hint, i) => (
                    <p key={i} className="text-xs" style={{ color: "#8b949e" }}>
                      💡 {hint}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          <CheckAnswer key={scenario.id} check={scenario.check} />
          <ShowSolution key={`sol-${scenario.id}`} solutionFiles={scenario.solutionFiles} />
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setPanelOpen((o) => !o)}
        className="self-center z-10 w-6 h-12 flex-shrink-0 flex items-center justify-center rounded-r-lg border border-black/20 dark:border-white/20 bg-background hover:bg-accent hover:border-primary/30 transition-all shadow-sm"
        style={{ marginLeft: panelOpen ? 0 : -6 }}
        title={panelOpen ? "Hide instructions" : "Show instructions"}
      >
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${panelOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right: Sandpack */}
      <div className="flex-1 flex flex-col min-h-0">
        <SandpackLayout>
          <SandpackFileExplorer
            autoHiddenFiles
            style={{ height: "100%", minWidth: "200px" }}
          />
          <SandpackCodeEditor
            showTabs
            showInlineErrors
            showRunButton
            wrapContent
            style={{ height: "100%" }}
          />
          <SandpackPreview
            showNavigator
            showRefreshButton
            style={{ height: "100%", minWidth: "300px" }}
          />
        </SandpackLayout>
      </div>
      </SandpackProvider>
    </div>
  )
}
