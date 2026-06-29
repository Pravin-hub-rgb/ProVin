"use client"

import { useRef, useEffect, useState, type KeyboardEvent } from "react"
import type { TerminalLine } from "@/lib/git-lab"
import { HintButton } from "./hint-button"

interface TerminalPanelProps {
  who: "A" | "B"
  label: string
  color: string
  lines: TerminalLine[]
  onCommand: (who: "A" | "B", cmd: string) => void
  isMyTurn: boolean
  instruction: string
  hints?: [string, string, string]
  branch: string
  stagedCount: number
  commitCount: number
  onGithubClick?: () => void
}

export function TerminalPanel({
  who,
  label,
  color,
  lines,
  onCommand,
  isMyTurn,
  instruction,
  hints,
  branch,
  stagedCount,
  commitCount,
  onGithubClick,
}: TerminalPanelProps) {
  const [input, setInput] = useState("")
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [focused, setFocused] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines])

  useEffect(() => {
    if (isMyTurn) {
      inputRef.current?.focus()
    }
  }, [isMyTurn])

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const cmd = input.trim()
      if (!cmd) return
      setCmdHistory((h) => [cmd, ...h])
      setHistIdx(-1)
      setInput("")
      onCommand(who, cmd)
    } else if (e.key === "ArrowUp") {
      if (cmdHistory.length === 0) return
      const next = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(next)
      setInput(cmdHistory[next] ?? "")
      e.preventDefault()
    } else if (e.key === "ArrowDown") {
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? "" : cmdHistory[next] ?? "")
      e.preventDefault()
    }
  }

  return (
    <div
      className="flex flex-col h-full overflow-hidden rounded-lg border transition-all duration-200"
      style={{
        borderColor: isMyTurn ? `${color}66` : focused ? `${color}44` : "#21262d",
        boxShadow: isMyTurn ? `0 0 0 1px ${color}22, 0 0 12px ${color}11` : "none",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b text-xs"
        style={{ background: "#161b22", borderColor: `${color}44` }}
      >
        <span
          className="font-bold px-2 py-0.5 rounded text-[11px]"
          style={{ background: color, color: "#000" }}
        >
          {label}
        </span>
        <span className="text-[#c9d1d9]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          team-practice
        </span>
        <span className="text-[#484f58]">/</span>
        <span style={{ color, fontFamily: "'JetBrains Mono', monospace" }}>{branch}</span>
        <span className="ml-auto flex items-center gap-3">
          {stagedCount > 0 && (
            <span className="text-[#f0b72f] text-[11px]">{stagedCount} staged</span>
          )}
          <span className="text-[#3fb950] text-[11px]">
            {commitCount} commit{commitCount !== 1 ? "s" : ""}
          </span>
        </span>
        {isMyTurn && (
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#3fb950" }} />
        )}
      </div>

      {/* Instruction bar */}
      {instruction && (
        <div
          className="flex items-center gap-2 px-3 py-2 border-b"
          style={{
            background: isMyTurn ? `${color}15` : "#0d1117",
            borderColor: `${color}22`,
          }}
        >
          {isMyTurn ? (
            <span className="text-[#3fb950] text-[11px] font-bold shrink-0">▶</span>
          ) : (
            <span className="text-[#484f58] text-[11px] shrink-0">⏳</span>
          )}
          <span
            className="text-xs flex-1"
            style={{ color: isMyTurn ? color : "#484f58" }}
          >
            {isMyTurn ? instruction : `Waiting for ${who === "A" ? "Junior Dev" : "Senior Dev"} to finish...`}
          </span>
          {isMyTurn && onGithubClick && (
            <button
              onClick={onGithubClick}
              className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border transition-all hover:brightness-110"
              style={{
                borderColor: `${color}44`,
                color,
                background: `${color}11`,
              }}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
              GitHub
            </button>
          )}
          {isMyTurn && hints && <HintButton hints={hints} color={color} />}
        </div>
      )}

      {/* Output log */}
      <div
        className="flex-1 overflow-y-auto px-3 py-2 text-xs leading-relaxed cursor-text"
        style={{
          background: "#0d1117",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.length === 0 && (
          <div className="flex items-center gap-2 text-[#484f58] py-4 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#484f58] animate-pulse" />
            <span>
              {isMyTurn
                ? "Type a git command to begin..."
                : "Waiting for connection..."}
            </span>
          </div>
        )}
        {lines.map((line, i) => (
          <div
            key={i}
            className="whitespace-pre-wrap break-all"
            style={{
              color:
                line.type === "cmd"
                  ? color
                  : line.type === "error"
                  ? "#f85149"
                  : line.type === "info"
                  ? "#c9d1d9"
                  : "#e6edf3",
            }}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-t transition-all duration-150"
        style={{
          background: isMyTurn ? "#0d1117" : "#0a0c10",
          borderColor: isMyTurn && focused ? `${color}66` : "#21262d",
        }}
      >
        <span
          className="text-xs select-none font-bold transition-colors"
          style={{
            color: isMyTurn ? color : "#30363d",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          $
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={isMyTurn ? "type a git command..." : ""}
          disabled={!isMyTurn}
          className="flex-1 bg-transparent border-none outline-none text-xs"
          style={{
            color: isMyTurn ? "#e6edf3" : "#30363d",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            caretColor: color,
          }}
        />
        {!isMyTurn && (
          <span className="text-[#30363d] text-[10px] select-none shrink-0">
            LOCKED
          </span>
        )}
      </div>
    </div>
  )
}
