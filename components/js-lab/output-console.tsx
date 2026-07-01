"use client"

interface OutputConsoleProps {
  output: string
  error: string | null
  feedback: string | null
}

export function OutputConsole({ output, error, feedback }: OutputConsoleProps) {
  const hasContent = output.length > 0 || error || feedback

  return (
    <div
      className="rounded-lg border flex flex-col overflow-hidden h-full"
      style={{ background: "#0d1117", borderColor: "#30363d" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b shrink-0"
        style={{ background: "#161b22", borderColor: "#21262d" }}
      >
        <svg className="w-3.5 h-3.5 text-[#8b949e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-[#c9d1d9] text-xs font-medium">Console</span>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto p-3 text-xs leading-relaxed"
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}
      >
        {!hasContent && (
          <div className="text-[#8b949e] py-2 text-center">
            Click Run to see output here.
          </div>
        )}

        {output && (
          <div className="text-[#e6edf3] whitespace-pre-wrap break-all">{output}</div>
        )}

        {error && (
          <div className="text-[#f85149] whitespace-pre-wrap break-all">{error}</div>
        )}

        {feedback && (
          <div
            className="mt-2 pt-2 border-t text-xs"
            style={{
              borderColor: feedback.startsWith("✓") ? "#3fb95044" : "#f0883e44",
              color: feedback.startsWith("✓") ? "#3fb950" : "#f0883e",
            }}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  )
}
