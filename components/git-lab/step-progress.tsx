"use client"

import type { Scenario } from "@/lib/lab-registry"

interface StepProgressProps {
  scenario: Scenario
  currentStep: number
  completedMask?: number
  actorLabels?: { A: string; B: string }
  onStepClick?: (step: number) => void
}

export function StepProgress({ scenario, currentStep, completedMask = 0, actorLabels, onStepClick }: StepProgressProps) {
  const done = completedMask === (1 << scenario.steps.length) - 1
  const labels = actorLabels ?? { A: "Sr", B: "Jr" }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {scenario.steps.map((s, i) => {
        const isDone = (completedMask & (1 << i)) !== 0
        const isCurrent = i === currentStep
        return (
          <div
            key={i}
            className="flex items-center gap-1.5 text-sm"
            style={{
              color: isDone ? "#3fb950" : isCurrent ? "#f0b72f" : "#8b949e",
            }}
          >
            <span
              className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-opacity hover:opacity-70 relative"
              onClick={() => onStepClick?.(i)}
              title={`Go to step ${i + 1}${isDone ? " (completed)" : ""}`}
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
              {isCurrent && (
                <svg
                  className="absolute -bottom-[7px] w-3 h-2.5"
                  viewBox="0 0 10 6"
                  fill="currentColor"
                  style={{ color: "#f0b72f" }}
                >
                  <path d="M5 6L0 0h10z" />
                </svg>
              )}
            </span>
            {(s.actor === "A" ? labels.A : labels.B) && (
              <span
                className="px-1.5 py-0.5 rounded text-xs"
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
            )}
            {i < scenario.steps.length - 1 && (
              <span className="text-[#8b949e] mx-1 text-sm font-semibold">{">"}</span>
            )}
          </div>
        )
      })}
      {done && (
        <span className="text-[#3fb950] text-sm font-bold ml-2">
          {"\u2713"} Scenario complete!
        </span>
      )}
    </div>
  )
}
