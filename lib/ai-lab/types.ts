export interface AiContentBlock {
  type: "text" | "tool_use" | "tool_result"
  text?: string
  id?: string
  name?: string
  input?: Record<string, unknown>
  tool_use_id?: string
  content?: string
}

export interface AiMessage {
  role: "user" | "assistant"
  content: AiContentBlock[]
}

export interface AiLabState {
  messages: AiMessage[]
  tools: Record<string, { description: string; parameters: Record<string, unknown> }>
  apiKeySet: boolean
  temperature: number
  tokensUsed: number
  scenario: {
    id: string
    currentStep: number
    completedMask?: number
  }
  lastResponse?: {
    id: string
    model: string
    stop_reason: "end_turn" | "tool_use" | "max_tokens"
    stop_sequence?: string
    usage: { input_tokens: number; output_tokens: number }
  }
}
