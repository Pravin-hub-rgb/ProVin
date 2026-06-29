"use client"

import { scenarios } from "@/lib/git-lab"

interface ScenarioSelectorProps {
  selectedId: string
  onSelect: (id: string) => void
}

export function ScenarioSelector({ selectedId, onSelect }: ScenarioSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-[#c9d1d9] text-xs font-medium" htmlFor="scenario-select">
        Scenario:
      </label>
      <select
        id="scenario-select"
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs rounded-md px-2 py-1 outline-none focus:border-[#58a6ff] cursor-pointer"
      >
        {scenarios.map((s) => (
          <option key={s.id} value={s.id}>
            [{s.phase}] {s.title}
          </option>
        ))}
      </select>
    </div>
  )
}
