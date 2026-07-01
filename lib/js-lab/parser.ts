export function parseCommand(input: string): { type: string } & Record<string, unknown> {
  return { type: "run", code: input }
}
