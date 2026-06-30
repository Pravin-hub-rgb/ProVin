import type { Scenario } from "@/lib/lab-registry"

export const FIRST_API_CALL: Scenario = {
  id: "first-api-call",
  phase: "3.2",
  title: "Your First API Call",
  description: "Set up your API key, make your first call to an AI model, and learn to read the raw response.",
  setup: (state) => {
    const s = state as { apiKeySet: boolean; messages: unknown[]; tokensUsed: number }
    s.apiKeySet = false
    s.messages = []
    s.tokensUsed = 0
    return state
  },
  steps: [
    {
      actor: "A",
      instruction:
        'Set your API key. In the real world you\'d get this from Anthropic. For this lab, use any key starting with "sk-".',
      match: (p) => {
        const parsed = p as { type: string; action: string; key: string }
        return parsed.type === "api-key" && parsed.action === "set" && parsed.key.startsWith("sk-")
      },
      hints: [
        "API keys authenticate your requests. They always start with 'sk-' for Anthropic.",
        "Run: api-key set sk-fake-key-for-lab (any key starting with sk- works in this simulator)",
        "Run: api-key set sk-fake-key-for-lab",
      ],
    },
    {
      actor: "A",
      instruction:
        "Check your API key status to confirm it's ready. Just type: api-key",
      match: (p) => {
        const parsed = p as { type: string; action: string }
        return parsed.type === "api-key" && parsed.action === "status"
      },
      hints: [
        "Running api-key without arguments shows whether your key is configured.",
        "You should see a message saying the key is set.",
        "Run: api-key",
      ],
    },
    {
      actor: "A",
      instruction:
        'Make your first API call. Type: api-call --prompt "Hello, how are you?"',
      match: (p) => {
        const parsed = p as { type: string; prompt: string }
        return parsed.type === "api-call" && typeof parsed.prompt === "string" && parsed.prompt.length > 0
      },
      hints: [
        "The --prompt flag sends your message to the model. The model responds based on its training.",
        "Use quotes around your prompt. Run: api-call --prompt \"Hello, how are you?\"",
        'Run: api-call --prompt "Hello, how are you?"',
      ],
    },
    {
      actor: "A",
      instruction:
        "View the raw response structure. This shows what the API actually returns behind the scenes.",
      match: (p) => {
        const parsed = p as { type: string }
        return parsed.type === "view-response"
      },
      hints: [
        "The raw response includes metadata: id, model name, stop_reason, and token usage.",
        "stop_reason: 'end_turn' means the model finished naturally.",
        "Run: view-response",
      ],
    },
    {
      actor: "A",
      instruction:
        "View the full conversation history to see how messages accumulate in the messages array.",
      match: (p) => {
        const parsed = p as { type: string }
        return parsed.type === "view-messages"
      },
      hints: [
        "The messages array grows with every API call. Each entry has a role (user/assistant) and content.",
        "This is the 'stateless' design — the model doesn't remember past calls. Your code sends the whole history.",
        "Run: view-messages",
      ],
    },
    {
      actor: "A",
      instruction:
        'Make a follow-up call to continue the conversation: api-call --prompt "What can you help me with?"',
      match: (p) => {
        const parsed = p as { type: string; prompt: string }
        return parsed.type === "api-call" && typeof parsed.prompt === "string" && parsed.prompt.length > 0
      },
      hints: [
        "Each API call is stateless — the model sees the entire conversation history every time.",
        "The messages array now has 4 entries (2 user + 2 assistant). The model reads all of them.",
        'Run: api-call --prompt "What can you help me with?"',
      ],
    },
  ],
}
