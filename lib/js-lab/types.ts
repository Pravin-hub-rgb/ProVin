export interface JsLabState {
  scenario: { id: string; currentStep: number; completedMask?: number }
  userCode: string
  lastOutput: string
  lastError: string | null
  runCount: number
  feedback?: string | null
}
