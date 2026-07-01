"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronRight } from "lucide-react"

interface HintButtonProps {
  hints: [string, string, string]
  color: string
}

export function HintButton({ hints, color }: HintButtonProps) {
  const [level, setLevel] = useState(0)
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Close on click outside
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
        onClick={() => { setOpen((v) => !v); if (!open) setLevel(1) }}
        className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border transition-all hover:brightness-110"
        style={{
          borderColor: `${color}44`,
          color,
          background: open ? `${color}22` : `${color}11`,
        }}
        title="Get a hint"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#e3b341">
          <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7zM9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1z" />
        </svg>
        Hint
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-1 w-72 z-50 text-[11px] rounded-lg border p-3 leading-relaxed shadow-xl"
          style={{
            borderColor: `${color}44`,
            background: "#161b22",
            animation: "fadeIn 0.15s ease",
          }}
        >
          <div className="flex items-start gap-2">
            <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="#e3b341">
              <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7zM9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1z" />
            </svg>
            <div className="flex-1 min-w-0">
              <div className="text-[#e6edf3]">{hints[level - 1]}</div>
              <div className="flex items-center gap-2 mt-2">
                {level < 3 && (
                  <button
                    onClick={() => setLevel((l) => Math.min(l + 1, 3))}
                    className="flex items-center gap-0.5 text-[11px] font-medium hover:underline"
                    style={{ color }}
                  >
                    More hint <ChevronRight className="w-3 h-3" />
                  </button>
                )}
                {level === 3 && (
                  <span className="text-[#3fb950] text-[10px]">(full command revealed)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
