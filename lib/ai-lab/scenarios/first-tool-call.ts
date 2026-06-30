import type { Scenario } from "@/lib/lab-registry"

export const FIRST_TOOL_CALL: Scenario = {
  id: "first-tool-call",
  phase: "4.2",
  title: "Your First Tool Call",
  description: "Define a calculator tool, make an API call that triggers it, and learn the tool calling loop.",
  setup: (state) => {
    const s = state as { apiKeySet: boolean; messages: unknown[]; tokensUsed: number; tools: Record<string, unknown> }
    s.apiKeySet = true
    s.messages = []
    s.tokensUsed = 0
    s.tools = {}
    return state
  },
  steps: [
    {
      actor: "A",
      instruction:
        'Define a calculator tool that the AI can use to perform math. Type: define-tool --name calculate --desc "Perform arithmetic calculations"',
      match: (p) => {
        const parsed = p as { type: string; name: string; description: string }
        return parsed.type === "define-tool" && parsed.name === "calculate" && parsed.description.length > 0
      },
      hints: [
        "Tool definitions tell the model what operations are available. The name and description are the model's only clues.",
        "The description matters — a bad description means the model won't know when to use the tool.",
        'Run: define-tool --name calculate --desc "Perform arithmetic calculations"',
      ],
    },
    {
      actor: "A",
      instruction:
        "List your defined tools to confirm the calculator is registered.",
      match: (p) => {
        const parsed = p as { type: string }
        return parsed.type === "list-tools"
      },
      hints: [
        "list-tools shows all tools the model has access to. The model chooses which tool based on the prompt.",
        "You should see your calculate tool in the list.",
        "Run: list-tools",
      ],
    },
    {
      actor: "A",
      instruction:
        'Set up your API key so you can make calls: api-key set sk-lab-key',
      match: (p) => {
        const parsed = p as { type: string; action: string; key: string }
        return parsed.type === "api-key" && parsed.action === "set" && parsed.key.startsWith("sk-")
      },
      hints: [
        "The API key authenticates your request. In the real world, you'd get this from your model provider.",
        "Run: api-key set sk-lab-key",
        "Run: api-key set sk-lab-key",
      ],
    },
    {
      actor: "A",
      instruction:
        'Make an API call that asks a math question. The model should request the calculator tool. Type: api-call --prompt "What is 2 + 2?"',
      match: (p) => {
        const parsed = p as { type: string; prompt: string }
        return parsed.type === "api-call" && typeof parsed.prompt === "string" && parsed.prompt.length > 0
      },
      hints: [
        "When the model recognizes it needs a tool, it responds with a tool_use block instead of a text response.",
        "The stop_reason changes from 'end_turn' to 'tool_use' — this tells your code to execute the tool.",
        'Run: api-call --prompt "What is 2 + 2?"',
      ],
    },
    {
      actor: "A",
      instruction:
        "View the raw response to see the tool_use content block and stop_reason.",
      match: (p) => {
        const parsed = p as { type: string }
        return parsed.type === "view-response"
      },
      hints: [
        "Notice stop_reason is now 'tool_use' instead of 'end_turn'. This means the model expects a tool result.",
        "In a real agent, your code would detect stop_reason: 'tool_use', execute the tool, and send the result back.",
        "Run: view-response",
      ],
    },
    {
      actor: "A",
      instruction:
        "Provide the tool result. Look at the response above for the tool_use id. Type: tool-result --id <id> --content '4'",
      match: (p) => {
        const parsed = p as { type: string; toolUseId: string; content: string }
        return parsed.type === "tool-result" && typeof parsed.toolUseId === "string" && parsed.toolUseId.startsWith("toolu_")
      },
      hints: [
        "The tool_use_id connects your result to the model's request. The model uses it to understand which tool call this is for.",
        "Use the id from the response (starts with 'toolu_'). The model now has the result and can continue.",
        "Run: tool-result --id toolu_... --content '4'",
      ],
    },
    {
      actor: "A",
      instruction:
        "View the full conversation to see the complete tool calling loop: user request -> tool use -> tool result -> model response.",
      match: (p) => {
        const parsed = p as { type: string }
        return parsed.type === "view-messages"
      },
      hints: [
        "This is the ReAct loop: Think -> Act -> Observe. The model thought, requested a tool, got the result, and responded.",
        "Every tool call follows this pattern. Real agents loop until the model responds with stop_reason: 'end_turn'.",
        "Run: view-messages",
      ],
    },
  ],
}
