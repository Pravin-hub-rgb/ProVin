"use client"

import { useMemo, useState, useCallback, useEffect, useRef } from "react"
import type { LabLayoutProps } from "@/lib/lab-registry"
import { getReactScenario } from "@/lib/react-lab/scenarios"
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react"
import type { SandpackFiles } from "@codesandbox/sandpack-react"
import type { CheckResult } from "@/lib/react-lab/types"
import { MarkdownHooks } from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

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

function CodePersistence({ scenarioId }: { scenarioId: string }) {
  const { sandpack } = useSandpack()
  const restoredScenario = useRef<string | null>(null)
  const filesRef = useRef(sandpack.files)
  filesRef.current = sandpack.files

  useEffect(() => {
    const saved = localStorage.getItem(`react-lab-code-${scenarioId}`)
    if (saved && restoredScenario.current !== scenarioId) {
      restoredScenario.current = scenarioId
      try {
        const raw = JSON.parse(saved) as Record<string, string>
        const batch: Record<string, string> = {}
        for (const [path, code] of Object.entries(raw)) {
          if (typeof code === "string") batch[path] = code
        }
        sandpack.updateFile(batch)
      } catch { }
    }
  }, [scenarioId, sandpack])

  useEffect(() => {
    const save = () => {
      const plain: Record<string, string> = {}
      for (const [path, f] of Object.entries(filesRef.current)) {
        const code = typeof f === "string" ? f : (f as any).code
        if (code != null) plain[path] = code
      }
      try { localStorage.setItem(`react-lab-code-${scenarioId}`, JSON.stringify(plain)) } catch { }
    }
    save()
    const timer = setInterval(save, 3000)
    return () => clearInterval(timer)
  }, [scenarioId])

  return null
}

function ResetHandler({ resetKey, starterFiles }: { resetKey: number; starterFiles: SandpackFiles }) {
  const { sandpack } = useSandpack()
  const prevKey = useRef(resetKey)
  const filesRef = useRef(starterFiles)
  filesRef.current = starterFiles

  useEffect(() => {
    if (resetKey !== prevKey.current) {
      prevKey.current = resetKey
      const files = filesRef.current
      sandpack.resetAllFiles()
      for (const [path, f] of Object.entries(files)) {
        const code = typeof f === "string" ? f : (f as { code: string }).code
        sandpack.updateFile(path, code)
      }
    }
  }, [resetKey])

  return null
}

function PlaygroundFileManager() {
  const { sandpack } = useSandpack()
  const [showInput, setShowInput] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleAdd = () => {
    const name = fileName.trim()
    if (!name) return
    const path = name.startsWith("/") ? name : "/" + name
    const finalPath = path.includes(".") ? path : path + ".tsx"
    sandpack.addFile(finalPath, "")
    sandpack.openFile(finalPath)
    setFileName("")
    setShowInput(false)
  }

  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className="w-full text-xs py-1.5 px-3 rounded-md border transition-all hover:brightness-110 cursor-pointer"
        style={{
          borderColor: "#30363d",
          color: "#c9d1d9",
          background: "#161b22",
          marginTop: "4px",
        }}
      >
        + New File
      </button>
    )
  }

  return (
    <div className="flex gap-1" style={{ marginTop: "4px" }}>
      <input
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="components/MyComp.tsx"
        autoFocus
        className="flex-1 text-xs px-2 py-1 rounded border"
        style={{
          borderColor: "#30363d",
          background: "#0d1117",
          color: "#c9d1d9",
          outline: "none",
          width: 0,
          minWidth: 0,
        }}
      />
      <button
        onClick={handleAdd}
        className="text-xs px-2 py-1 rounded-md border transition-all hover:brightness-110 cursor-pointer"
        style={{
          borderColor: "#30363d",
          color: "#c9d1d9",
          background: "#161b22",
        }}
      >
        Add
      </button>
      <button
        onClick={() => { setShowInput(false); setFileName("") }}
        className="text-xs px-2 py-1 rounded-md border transition-all hover:brightness-110 cursor-pointer"
        style={{
          borderColor: "#30363d",
          color: "#8b949e",
          background: "transparent",
        }}
      >
        ✕
      </button>
    </div>
  )
}

export function ReactLabLayout({
  resetKey,
  state,
  currentStep,
}: LabLayoutProps) {
  const [panelOpen, setPanelOpen] = useState(true)
  const [hintsOpen, setHintsOpen] = useState(false)
  const splitContainerRef = useRef<HTMLDivElement>(null)
  const [editorPercent, setEditorPercent] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ startX: 0, startPct: 0 })

  const handleSplitMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragStartRef.current = { startX: e.clientX, startPct: editorPercent }
    setIsDragging(true)
  }, [editorPercent])

  useEffect(() => {
    if (!isDragging) return
    const container = splitContainerRef.current
    if (!container) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const deltaPx = e.clientX - dragStartRef.current.startX
      const deltaPct = (deltaPx / rect.width) * 100
      setEditorPercent(Math.max(20, Math.min(75, dragStartRef.current.startPct + deltaPct)))
    }
    const handleMouseUp = () => setIsDragging(false)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging])
  const sc = (state as { currentScenario?: { id: string } }).currentScenario
  const scenarioId = sc?.id ?? ((state as { scenario: { id: string } }).scenario?.id ?? "")
  const scenario = useMemo(() => getReactScenario(scenarioId), [scenarioId])
  const isPlayground = scenarioId === "0.0-playground"

  useEffect(() => { setHintsOpen(false) }, [scenarioId])

  if (!scenario) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#8b949e]">
        <p>Select a scenario to begin.</p>
      </div>
    )
  }

  const files = scenario.starterFiles
  const customSetup = scenario.dependencies ? { dependencies: scenario.dependencies } : undefined
  const sourceExtensions = [".tsx", ".ts", ".css", ".js", ".jsx"]
  const visibleFileKeys = Object.keys(files).filter(f =>
    sourceExtensions.some(ext => f.endsWith(ext))
  )
  const playgroundVisibleFiles = ["/index.tsx", "/App.tsx", "/styles.css"]

  return (
    <div className="flex-1 flex overflow-hidden">
      <SandpackProvider
        template="react-ts"
        files={files}
        customSetup={customSetup}
        theme={reactTheme as any}
        style={{ display: "contents" }}
        options={{
          visibleFiles: isPlayground ? (playgroundVisibleFiles as any) : (visibleFileKeys as any),
          activeFile: isPlayground ? "/App.tsx" : "/App.tsx",

          classes: {
            "sp-wrapper": "h-full",
            "sp-layout": "h-full",
            "sp-tabs": "text-xs",
          },
        }}
      >

      <CodePersistence scenarioId={scenarioId} />
      {resetKey !== undefined && (
        <ResetHandler resetKey={resetKey} starterFiles={files} />
      )}

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
          <div>
            <MarkdownHooks
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h2({ children }) {
                  return <h3 className="text-sm font-semibold text-[#e6edf3] mt-4 mb-2">{children}</h3>
                },
                h3({ children }) {
                  return <h4 className="text-xs font-semibold text-[#e6edf3] mt-3 mb-1">{children}</h4>
                },
                h4({ children }) {
                  return <h5 className="text-xs font-semibold text-[#e6edf3] mt-2 mb-1">{children}</h5>
                },
                p({ children }) {
                  return <p className="text-xs text-[#c9d1d9] leading-relaxed mb-2">{children}</p>
                },
                ul({ children }) {
                  return <ul className="text-xs text-[#c9d1d9] ml-4 mb-2 space-y-1 list-disc">{children}</ul>
                },
                ol({ children }) {
                  return <ol className="text-xs text-[#c9d1d9] ml-4 mb-2 space-y-1 list-decimal">{children}</ol>
                },
                li({ children }) {
                  return <li>{children}</li>
                },
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "")
                  if (match) {
                    return (
                      <pre className="text-xs bg-[#161b22] p-2 rounded overflow-x-auto mb-2">
                        <code style={{ color: "#e6edf3" }} {...props}>{children}</code>
                      </pre>
                    )
                  }
                  return (
                    <code className="text-xs bg-[#161b22] px-1 py-0.5 rounded" style={{ color: "#e6edf3" }} {...props}>
                      {children}
                    </code>
                  )
                },
                pre({ children }) {
                  return <>{children}</>
                },
                table({ children }) {
                  return (
                    <div className="overflow-x-auto mb-2">
                      <table className="text-xs w-full border-collapse border border-[#30363d]">
                        {children}
                      </table>
                    </div>
                  )
                },
                th({ children }) {
                  return (
                    <th className="border border-[#30363d] px-2 py-1 text-left bg-[#161b22] font-semibold text-[#e6edf3]">
                      {children}
                    </th>
                  )
                },
                td({ children }) {
                  return (
                    <td className="border border-[#30363d] px-2 py-1 text-[#c9d1d9]">
                      {children}
                    </td>
                  )
                },
                strong({ children }) {
                  return <strong className="text-[#e6edf3]">{children}</strong>
                },
                a({ href, children }) {
                  return (
                    <a href={href} className="text-[#58a6ff] hover:underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  )
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-2 border-[#30363d] pl-3 my-2 text-xs text-[#8b949e] italic">
                      {children}
                    </blockquote>
                  )
                },
                hr() {
                  return <hr className="border-[#21262d] my-3" />
                },
              }}
            >
              {scenario.instructions}
            </MarkdownHooks>
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

          {!isPlayground && <CheckAnswer key={scenario.id} check={scenario.check} />}
          {!isPlayground && <ShowSolution key={`sol-${scenario.id}`} solutionFiles={scenario.solutionFiles} />}
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
        <div
          ref={splitContainerRef}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            height: "100%",
            background: "#0d1117",
            border: "1px solid #30363d",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {isPlayground ? (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", minWidth: "200px", width: 200, flexShrink: 0 }}>
              <SandpackFileExplorer
                autoHiddenFiles={false}
                style={{ flex: 1, minHeight: 0 }}
              />
              <PlaygroundFileManager />
            </div>
          ) : (
            <SandpackFileExplorer
              autoHiddenFiles
              style={{ height: "100%", minWidth: "200px", width: 200, flexShrink: 0 }}
            />
          )}
          <SandpackCodeEditor
            showTabs
            showInlineErrors
            showRunButton
            wrapContent
            style={{ height: "100%", minWidth: "200px", width: `${editorPercent}%` }}
          />
          <div
            onMouseDown={handleSplitMouseDown}
            className="flex-shrink-0 relative z-10"
            style={{
              width: 8,
              cursor: "col-resize",
              background: isDragging ? "rgba(88,166,255,0.15)" : "transparent",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!isDragging) e.currentTarget.style.background = "rgba(88,166,255,0.08)"
            }}
            onMouseLeave={(e) => {
              if (!isDragging) e.currentTarget.style.background = "transparent"
            }}
          >
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-full transition-all duration-150"
              style={{
                width: 3,
                background: isDragging ? "#58a6ff" : "#30363d",
              }}
            />
          </div>
          <SandpackPreview
            showNavigator
            showRefreshButton
            style={{ height: "100%", flex: 1, minWidth: "300px" }}
          />
        </div>
      </div>
      </SandpackProvider>
    </div>
  )
}
