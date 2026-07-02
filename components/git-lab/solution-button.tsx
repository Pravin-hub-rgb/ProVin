"use client"

import { useState, useRef, useEffect } from "react"

interface SolutionButtonProps {
  solution: string
  solutionOutput?: string
  color: string
}

export function SolutionButton({ solution, solutionOutput, color }: SolutionButtonProps) {
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border transition-all hover:brightness-110"
        style={{
          borderColor: `${color}44`,
          color,
          background: open ? `${color}22` : `${color}11`,
        }}
        title="Show solution"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Solution
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-1 z-50 rounded-lg border shadow-xl"
          style={{
            borderColor: `${color}44`,
            background: "#0d1117",
            animation: "fadeIn 0.15s ease",
            minWidth: "320px",
            maxWidth: "480px",
          }}
        >
          <div
            className="px-3 py-2 border-b text-[11px] font-semibold"
            style={{ borderColor: `${color}22`, color }}
          >
            Solution
          </div>
          <pre
            className="p-3 text-[12px] leading-relaxed overflow-x-auto max-h-[300px] overflow-y-auto"
            style={{
              color: "#e6edf3",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              margin: 0,
            }}
          >
            {solution}
          </pre>
          {solutionOutput && (
            <div
              className="px-3 py-2 border-t text-[12px] leading-relaxed"
              style={{
                borderColor: `${color}22`,
                color: "#8b949e",
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              <span style={{ color: `${color}99`, fontWeight: 600, fontSize: 11 }}>
                Output
              </span>
              <div style={{ marginTop: 4, color: "#e6edf3" }}>{solutionOutput}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
