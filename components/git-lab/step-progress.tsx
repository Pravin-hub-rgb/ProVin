"use client"

import type { Scenario } from "@/lib/lab-registry"

interface StepProgressProps {
  scenario: Scenario
  currentStep: number
  actorLabels?: { A: string; B: string }
}

export function StepProgress({ scenario, currentStep, actorLabels }: StepProgressProps) {
  const done = currentStep >= scenario.steps.length
  const labels = actorLabels ?? { A: "Sr", B: "Jr" }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {scenario.steps.map((s, i) => {
        const isDone = i < currentStep
        const isCurrent = i === currentStep
        return (
          <div
            key={i}
            className="flex items-center gap-1 text-[11px]"
            style={{
              color: isDone ? "#3fb950" : isCurrent ? "#f0b72f" : "#8b949e",
            }}
          >
            <span
              className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-medium"
              style={{
                background: isDone
                  ? "#3fb950"
                  : isCurrent
                  ? "#f0b72f22"
                  : "#21262d",
                border: `1px solid ${
                  isDone ? "#3fb950" : isCurrent ? "#f0b72f" : "#30363d"
                }`,
                color: isDone ? "#000" : isCurrent ? "#f0b72f" : "#8b949e",
              }}
            >
              {isDone ? "\u2713" : i + 1}
            </span>
            <span
              className="px-1 py-0.5 rounded-sm"
              style={{
                background: s.actor === "A" ? "#1f6feb11" : "#3d1f6f11",
              }}
            >
              <span
                className="mr-1"
                style={{
                  color: s.actor === "A" ? "#58a6ff" : "#bc8cff",
                }}
              >
                {s.actor === "A" ? labels.A : labels.B}
              </span>
            </span>
            {i < scenario.steps.length - 1 && (
              <span className="text-[#484f58] mx-0.5">{">"}</span>
            )}
          </div>
        )
      })}
      {done && (
        <span className="text-[#3fb950] text-xs font-bold ml-2">
          {"\u2713"} Scenario complete!
        </span>
      )}
    </div>
  )
}
