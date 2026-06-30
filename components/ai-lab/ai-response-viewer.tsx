"use client"

import { useState } from "react"
import type { AiLabState } from "@/lib/ai-lab/types"

export function AiResponseViewer({ state }: { state: unknown }) {
  const s = state as AiLabState
  const [collapsed, setCollapsed] = useState(false)

  const lastMessage = s.messages.length > 0 ? s.messages[s.messages.length - 1] : null

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
        <span className="text-xs font-semibold text-[#e6edf3]">Response</span>
        <div className="flex items-center gap-2">
          {s.lastResponse && (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded"
              style={{
                background:
                  s.lastResponse.stop_reason === "end_turn"
                    ? "#3fb95022"
                    : s.lastResponse.stop_reason === "tool_use"
                      ? "#bc8cff22"
                      : "#f0883e22",
                color:
                  s.lastResponse.stop_reason === "end_turn"
                    ? "#3fb950"
                    : s.lastResponse.stop_reason === "tool_use"
                      ? "#bc8cff"
                      : "#f0883e",
              }}
            >
              {s.lastResponse.stop_reason}
            </span>
          )}
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
      </div>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-3 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {/* No response yet */}
          {!s.lastResponse && (
            <div className="text-[#8b949e] py-4 text-center">
              No response yet. Make an API call to see it here.
            </div>
          )}

          {/* Response metadata */}
          {s.lastResponse && (
            <div className="space-y-2">
              <div className="text-[#c9d1d9] font-medium mb-1">Metadata</div>
              <div className="space-y-1">
                <InfoRow label="id" value={s.lastResponse.id} />
                <InfoRow label="model" value={s.lastResponse.model} />
                <InfoRow label="stop_reason" value={s.lastResponse.stop_reason} />
              </div>
              <div className="text-[#c9d1d9] font-medium mt-3 mb-1">Usage</div>
              <div className="space-y-1">
                <InfoRow label="input_tokens" value={String(s.lastResponse.usage.input_tokens)} />
                <InfoRow label="output_tokens" value={String(s.lastResponse.usage.output_tokens)} />
                <InfoRow label="total" value={String(s.lastResponse.usage.input_tokens + s.lastResponse.usage.output_tokens)} />
              </div>

              {/* Latest message content */}
              {lastMessage && (
                <>
                  <div className="text-[#c9d1d9] font-medium mt-3 mb-1">
                    Latest Content {lastMessage.role === "user" ? "(User)" : "(Assistant)"}
                  </div>
                  {lastMessage.content.map((block, i) => (
                    <div key={i} className="space-y-1">
                      {block.type === "text" && (
                        <div className="text-[#e6edf3] whitespace-pre-wrap break-all">
                          {block.text}
                        </div>
                      )}
                      {block.type === "tool_use" && (
                        <div className="border rounded px-2 py-1" style={{ borderColor: "#bc8cff44", background: "#bc8cff11" }}>
                          <div className="text-[#bc8cff]">tool_use</div>
                          <div className="text-[#c9d1d9]">name: {block.name}</div>
                          <div className="text-[#c9d1d9]">id: {block.id}</div>
                          <div className="text-[#c9d1d9]">input: {JSON.stringify(block.input)}</div>
                        </div>
                      )}
                      {block.type === "tool_result" && (
                        <div className="border rounded px-2 py-1" style={{ borderColor: "#f0883e44", background: "#f0883e11" }}>
                          <div className="text-[#f0883e]">tool_result</div>
                          <div className="text-[#c9d1d9]">tool_use_id: {block.tool_use_id}</div>
                          <div className="text-[#c9d1d9]">content: {block.content}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {/* Conversation count */}
              <div className="text-[#8b949e] mt-3 pt-2 border-t" style={{ borderColor: "#21262d" }}>
                Messages: {s.messages.length} &middot; Tokens: {s.tokensUsed}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#8b949e] min-w-[90px]">{label}:</span>
      <span className="text-[#e6edf3] break-all">{value}</span>
    </div>
  )
}
