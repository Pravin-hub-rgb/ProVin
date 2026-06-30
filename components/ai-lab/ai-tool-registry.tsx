"use client"

import { useState } from "react"
import type { AiLabState } from "@/lib/ai-lab/types"

export function AiToolRegistry({ state }: { state: unknown }) {
  const s = state as AiLabState
  const [collapsed, setCollapsed] = useState(false)

  const toolNames = Object.keys(s.tools)

  return (
    <div
      className="rounded-lg border flex flex-col overflow-hidden"
      style={{ background: "#0d1117", borderColor: "#30363d" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b cursor-pointer select-none"
        style={{ borderColor: "#21262d" }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="text-xs font-semibold text-[#e6edf3]">Tools ({toolNames.length})</span>
        <svg
          className="w-3 h-3 text-[#484f58] transition-transform"
          style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-3 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {toolNames.length === 0 && (
            <div className="text-[#8b949e] py-4 text-center">
              No tools defined yet. Use:<br />
              define-tool --name &lt;n&gt; --desc "..."
            </div>
          )}

          {toolNames.length > 0 && (
            <div className="space-y-2">
              {toolNames.map((name) => (
                <div
                  key={name}
                  className="border rounded px-2 py-1.5"
                  style={{ borderColor: "#30363d" }}
                >
                  <div className="text-[#58a6ff] font-medium">{name}</div>
                  <div className="text-[#8b949e] mt-0.5">{s.tools[name].description}</div>
                </div>
              ))}
            </div>
          )}

          <div className="text-[#8b949e] mt-3 pt-2 border-t" style={{ borderColor: "#21262d" }}>
            <InfoRow label="temperature" value={String(s.temperature.toFixed(1))} />
            <InfoRow label="api key" value={s.apiKeySet ? "set" : "not set"} />
            <InfoRow label="tokens used" value={String(s.tokensUsed)} />
          </div>
        </div>
      )}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="text-[#8b949e]">{label}:</span>
      <span className="text-[#e6edf3]">{value}</span>
    </div>
  )
}
