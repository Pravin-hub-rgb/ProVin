"use client"

import type { OriginRepo } from "@/lib/git-lab"

interface OriginPanelProps {
  origin: OriginRepo
}

export function OriginPanel({ origin }: OriginPanelProps) {
  const mainCommits = origin.branches.main ?? []

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 min-h-[52px]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold text-[#c9d1d9] uppercase tracking-wider">
          origin / main
        </span>
        <span className="bg-[#21262d] text-[#c9d1d9] text-[10px] px-1.5 py-0.5 rounded-full">
          {mainCommits.length} commit{mainCommits.length !== 1 ? "s" : ""}
        </span>
      </div>
      {mainCommits.length === 0 ? (
        <div className="text-[#8b949e] text-xs">No pushes yet.</div>
      ) : (
        <div className="flex gap-1.5 flex-wrap">
          {mainCommits.map((c, i) => (
            <div
              key={c.hash}
              className="flex items-center gap-1.5 bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-1 text-[11px]"
              style={{ animation: "fadeIn 0.3s ease" }}
            >
              {i > 0 && <span className="text-[#484f58] mr-0.5">←</span>}
              <span className="text-[#79c0ff] font-mono">{c.hash.slice(0, 7)}</span>
              <span className="text-[#c9d1d9] max-w-[120px] truncate">{c.message}</span>
              <span
                className="text-[9px] px-1 py-0.5 rounded"
                style={{
                  background: c.author === "dev-a" ? "#1f6feb33" : "#3d1f6f33",
                  color: c.author === "dev-a" ? "#58a6ff" : "#bc8cff",
                }}
              >
                {c.author === "dev-a" ? "Senior" : "Junior"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
