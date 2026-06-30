import type { AiLabState, AiMessage, AiContentBlock } from "./types"

let responseCounter = 0

function makeResponseId(): string {
  responseCounter++
  return `msg_${responseCounter.toString(16).padStart(8, "0")}`
}

export function createInitialState(): AiLabState {
  return {
    messages: [],
    tools: {},
    apiKeySet: false,
    temperature: 0.7,
    tokensUsed: 0,
    scenario: { id: "", currentStep: 0 },
  }
}

function cloneState(s: AiLabState): AiLabState {
  return JSON.parse(JSON.stringify(s)) as AiLabState
}

export function executeCommand(
  state: AiLabState,
  who: "A" | "B",
  parsed: { type: string } & Record<string, unknown>,
): { newState: AiLabState; result: { lines: string[]; advance?: boolean } } {
  const newState = cloneState(state)

  switch (parsed.type) {
    case "api-key": {
      if (parsed.action === "set") {
        const key = parsed.key as string
        if (!key.startsWith("sk-")) {
          return { newState, result: { lines: ["Invalid API key format. Keys start with 'sk-'."] } }
        }
        newState.apiKeySet = true
        return { newState, result: { lines: ["API key set successfully.", `Key: ${key.slice(0, 12)}...`] } }
      }
      return {
        newState,
        result: {
          lines: [
            newState.apiKeySet
              ? "API key is set. You can make API calls."
              : "No API key set. Use: api-key set sk-...",
          ],
        },
      }
    }

    case "api-call": {
      if (!newState.apiKeySet) {
        return {
          newState,
          result: {
            lines: [
              "Error: No API key set. First run: api-key set sk-...",
              "The API key authenticates your requests to the model provider.",
            ],
          },
        }
      }

      const prompt = parsed.prompt as string
      const isMathQuery = /calculate|what is|add|subtract|multiply|divide|sum|math|\d+\s*[+\-*/]\s*\d+|\d+\s*\+\s*\d+/i.test(prompt)
      const hasCalculateTool = !!newState.tools["calculate"]

      const userMessage: AiMessage = {
        role: "user",
        content: [{ type: "text", text: prompt }],
      }
      newState.messages.push(userMessage)

      const inputTokens = Math.ceil(prompt.length * 0.75) + 10
      newState.tokensUsed += inputTokens

      if (isMathQuery && hasCalculateTool) {
        // Simulate a tool_use response
        const toolId = "toolu_" + makeResponseId()
        const assistantMessage: AiMessage = {
          role: "assistant",
          content: [
            { type: "text", text: "I'll calculate that for you using the calculator tool." },
            { type: "tool_use", id: toolId, name: "calculate", input: { expression: prompt } },
          ],
        }
        newState.messages.push(assistantMessage)

        const outputTokens = 40
        newState.tokensUsed += outputTokens

        newState.lastResponse = {
          id: makeResponseId(),
          model: "claude-sonnet-4-20250514",
          stop_reason: "tool_use",
          usage: { input_tokens: inputTokens, output_tokens: outputTokens },
        }

        return {
          newState,
          result: {
            lines: [
              `Tokens used: ${newState.tokensUsed} (${inputTokens} in + ${outputTokens} out)`,
              "",
              "The model wants to use a tool! Response:",
              "I'll calculate that for you using the calculator tool.",
              "",
              `Tool use requested: calculate (id: ${toolId})`,
              "Provide the result with: tool-result --id " + toolId + " --content \"...\"",
            ],
          },
        }
      }

      const responseText = `Hello! I'm an AI assistant. You said: "${prompt.slice(0, 60)}${prompt.length > 60 ? "..." : ""}"\n\nI can help you with questions, code, writing, and more. What would you like to know?`

      const assistantMessage: AiMessage = {
        role: "assistant",
        content: [{ type: "text", text: responseText }],
      }
      newState.messages.push(assistantMessage)

      const outputTokens = Math.ceil(responseText.length * 0.75) + 10
      newState.tokensUsed += outputTokens

      newState.lastResponse = {
        id: makeResponseId(),
        model: "claude-sonnet-4-20250514",
        stop_reason: "end_turn",
        usage: {
          input_tokens: inputTokens,
          output_tokens: outputTokens,
        },
      }

      return {
        newState,
        result: {
          lines: [
            `Tokens used: ${newState.tokensUsed} (${inputTokens} in + ${outputTokens} out)`,
            "",
            responseText,
          ],
        },
      }
    }

    case "view-response": {
      if (!newState.lastResponse) {
        return { newState, result: { lines: ["No response to view yet. Make an API call first."] } }
      }
      const r = newState.lastResponse
      return {
        newState,
        result: {
          lines: [
            "┌─ Raw Response ─────────────────────────────┐",
            `│ id:          ${r.id}`,
            `│ model:       ${r.model}`,
            `│ stop_reason: ${r.stop_reason}`,
            `│ stop_seq:    ${r.stop_sequence ?? "null"}`,
            "│ ──────────────────────────────────",
            `│ usage:`,
            `│   input_tokens:  ${r.usage.input_tokens}`,
            `│   output_tokens: ${r.usage.output_tokens}`,
            "└────────────────────────────────────────────┘",
          ],
        },
      }
    }

    case "view-messages": {
      if (newState.messages.length === 0) {
        return { newState, result: { lines: ["No messages in conversation yet."] } }
      }
      const lines: string[] = [
        `Conversation (${newState.messages.length} message${newState.messages.length !== 1 ? "s" : ""}):`,
        "",
      ]
      for (const msg of newState.messages) {
        const role = msg.role === "user" ? "User" : "Assistant"
        for (const block of msg.content) {
          if (block.type === "text") {
            const preview = block.text!.slice(0, 80)
            lines.push(`  [${role}] ${preview}${block.text!.length > 80 ? "..." : ""}`)
          } else if (block.type === "tool_use") {
            lines.push(`  [${role}] Tool use: ${block.name!} (id: ${block.id!})`)
          } else if (block.type === "tool_result") {
            lines.push(`  [${role}] Tool result for ${block.tool_use_id!}: ${(block.content ?? "").slice(0, 60)}`)
          }
        }
      }
      lines.push("", `Total tokens used: ${newState.tokensUsed}`)
      return { newState, result: { lines } }
    }

    case "define-tool": {
      const name = parsed.name as string
      const description = parsed.description as string
      newState.tools[name] = { description, parameters: {} }
      return {
        newState,
        result: { lines: [`Tool defined: ${name}`, `  Description: ${description}`] },
      }
    }

    case "list-tools": {
      const names = Object.keys(newState.tools)
      if (names.length === 0) {
        return { newState, result: { lines: ["No tools defined yet. Use: define-tool --name <n> --desc '...'"] } }
      }
      const lines = [`Defined tools (${names.length}):`, ""]
      for (const name of names) {
        lines.push(`  ${name}: ${newState.tools[name].description}`)
      }
      return { newState, result: { lines } }
    }

    case "tool-result": {
      const toolUseId = parsed.toolUseId as string
      const content = parsed.content as string

      // Find the tool_use block this result is for
      let found = false
      for (const msg of newState.messages) {
        for (const block of msg.content) {
          if (block.type === "tool_use" && block.id === toolUseId) {
            found = true
            break
          }
        }
        if (found) break
      }

      if (!found) {
        return {
          newState,
          result: {
            lines: [
              `No tool call found with id "${toolUseId}".`,
              "Did you make an API call that triggered a tool use?",
            ],
          },
        }
      }

      // Add tool result message
      const resultMessage: AiMessage = {
        role: "assistant",
        content: [{ type: "tool_result", tool_use_id: toolUseId, content }],
      }
      newState.messages.push(resultMessage)

      // Simulate model responding after receiving tool result
      const responseText = `Thanks! I received the result: "${content.slice(0, 60)}${content.length > 60 ? "..." : ""}"\n\nWhat would you like to do next?`
      const followUp: AiMessage = {
        role: "assistant",
        content: [{ type: "text", text: responseText }],
      }
      newState.messages.push(followUp)

      newState.tokensUsed += 30

      newState.lastResponse = {
        id: makeResponseId(),
        model: "claude-sonnet-4-20250514",
        stop_reason: "end_turn",
        usage: { input_tokens: 20, output_tokens: 30 },
      }

      return {
        newState,
        result: { lines: ["Tool result submitted. Model responded:", "", responseText] },
      }
    }

    case "set-temperature": {
      const val = parsed.value as number
      if (val < 0 || val > 2) {
        return { newState, result: { lines: ["Temperature must be between 0 and 2."] } }
      }
      newState.temperature = val
      return { newState, result: { lines: [`Temperature set to ${newState.temperature}`] } }
    }

    case "clear": {
      return { newState, result: { lines: [] } }
    }

    case "unknown":
    default: {
      const raw = (parsed as { raw?: string }).raw
      return {
        newState,
        result: { lines: [`Unknown command: ${raw ?? parsed.type}`] },
      }
    }
  }
}
