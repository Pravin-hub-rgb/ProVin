"use client"

import type { LabLayoutProps } from "@/lib/lab-registry"
import { TerminalPanel } from "@/components/git-lab/terminal-panel"
import { AiResponseViewer } from "./ai-response-viewer"
import { AiToolRegistry } from "./ai-tool-registry"

export function AiLabLayout({ state, onCommand, step, done, terminalALines }: LabLayoutProps) {
  return (
    <div className="flex-1 min-h-0 flex gap-3 p-3 overflow-hidden">
      {/* Terminal - left */}
      <div className="flex-1 min-w-0 w-1/2">
        <TerminalPanel
          who="A"
          label="Developer"
          color="#58a6ff"
          lines={terminalALines}
          onCommand={onCommand}
          isMyTurn={done ? false : step?.actor === "A"}
          instruction={done ? "" : step?.instruction ?? ""}
          hints={step?.hints}
          waitingLabel="Scenario complete"
          repo="ai-agent-lab"
          branch={`temp-${((state as { temperature?: number }).temperature ?? 0.7).toFixed(1)}`}
          headerItems={[
            { label: "tokens", value: String((state as { tokensUsed?: number }).tokensUsed ?? 0) },
            {
              label: "tools",
              value: String(Object.keys((state as { tools?: Record<string, unknown> }).tools ?? {}).length),
            },
          ]}
        />
      </div>

      {/* Side panels - right */}
      <div className="flex-1 w-1/2 flex flex-col gap-3 overflow-y-auto">
        <div className="flex-1 min-h-0">
          <AiResponseViewer state={state} />
        </div>
        <div className="flex-shrink-0">
          <AiToolRegistry state={state} />
        </div>
      </div>
    </div>
  )
}
