export type QuestionType = "mcq" | "truefalse" | "shortanswer"

export interface QuizQuestion {
  type: QuestionType
  question: string
  options?: string[]
  correctIndex?: number
  correctAnswer?: string
  explanation: string
}

export interface QuizData {
  title: string
  questions: QuizQuestion[]
}
