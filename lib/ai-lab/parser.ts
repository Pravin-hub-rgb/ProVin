export function parseCommand(input: string): { type: string } & Record<string, unknown> {
  const trimmed = input.trim()
  if (!trimmed) return { type: "ignore" }

  // api-key set <key>
  const apiKeySetMatch = trimmed.match(/^api-key set (\S+)$/)
  if (apiKeySetMatch) return { type: "api-key", action: "set", key: apiKeySetMatch[1] }

  // api-key (show status)
  if (/^api-key$/.test(trimmed)) return { type: "api-key", action: "status" }

  // api-call --prompt "..."
  const apiMatch = trimmed.match(/^api-call --prompt ["'](.+)["']$/)
  if (apiMatch) return { type: "api-call", prompt: apiMatch[1] }

  // view-response
  if (/^view-response$/.test(trimmed)) return { type: "view-response" }

  // view-messages
  if (/^view-messages$/.test(trimmed)) return { type: "view-messages" }

  // define-tool --name <n> --desc "..." (--param is optional for now)
  const toolMatch = trimmed.match(/^define-tool --name (\S+) --desc ["'](.+)["']$/)
  if (toolMatch) return { type: "define-tool", name: toolMatch[1], description: toolMatch[2] }

  // list-tools
  if (/^list-tools$/.test(trimmed)) return { type: "list-tools" }

  // tool-result --id <id> --content "..."
  const toolResultMatch = trimmed.match(/^tool-result --id (\S+) --content ["'](.+)["']$/)
  if (toolResultMatch) return { type: "tool-result", toolUseId: toolResultMatch[1], content: toolResultMatch[2] }

  // set-temperature <n>
  const tempMatch = trimmed.match(/^set-temperature (\d+(?:\.\d+)?)$/)
  if (tempMatch) return { type: "set-temperature", value: parseFloat(tempMatch[1]) }

  // clear
  if (/^clear$/.test(trimmed)) return { type: "clear" }

  return { type: "unknown", raw: trimmed }
}
