import type { QuizData, QuizQuestion, QuestionType } from "./quiz-types"

function extractSectionTitle(line: string): QuestionType | null {
  const trimmed = line.trim()
  if (trimmed.startsWith("## MCQ")) return "mcq"
  if (trimmed.startsWith("## TrueFalse")) return "truefalse"
  if (trimmed.startsWith("## ShortAnswer")) return "shortanswer"
  return null
}

export function parseQuiz(markdown: string): QuizData {
  const lines = markdown.split("\n")

  const title = lines[0]?.replace(/^#\s*/, "").trim() ?? "Quiz"

  const questions: QuizQuestion[] = []

  let currentType: QuestionType | null = null
  let currentQuestion: string | null = null
  let currentOptions: string[] = []
  let currentAnswer: string | null = null
  let currentExplanation: string | null = null
  let inQuestion = false
  let inOptions = false
  let inExplanation = false

  function flushQuestion() {
    if (!currentType || !currentQuestion) return

    if (currentType === "mcq" && currentOptions.length > 0 && currentAnswer) {
      const answerLetter = currentAnswer.trim().charAt(0).toUpperCase()
      const correctIndex = "ABCDEFGH".indexOf(answerLetter)
      if (correctIndex >= 0) {
        const expl = currentExplanation ?? currentAnswer
        questions.push({
          type: "mcq",
          question: currentQuestion,
          options: [...currentOptions],
          correctIndex,
          explanation: expl,
        })
      }
    } else if (currentType === "truefalse" && currentOptions.length === 2 && currentAnswer) {
      const firstWord = currentAnswer.trim().toLowerCase()
      const correctIndex = firstWord.startsWith("true") ? 0 : firstWord.startsWith("false") ? 1 : -1
      if (correctIndex >= 0) {
        const expl = currentExplanation ?? currentAnswer
        questions.push({
          type: "truefalse",
          question: currentQuestion,
          options: ["True", "False"],
          correctIndex,
          explanation: expl,
        })
      }
    } else if (currentType === "shortanswer" && currentExplanation) {
      questions.push({
        type: "shortanswer",
        question: currentQuestion,
        correctAnswer: currentExplanation,
        explanation: currentExplanation,
      })
    }

    currentQuestion = null
    currentOptions = []
    currentAnswer = null
    currentExplanation = null
    inQuestion = false
    inOptions = false
    inExplanation = false
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()

    // Skip empty lines and separators
    if (line.trim() === "" || line.startsWith("---")) continue

    // Check for section heading (type)
    const sectionType = extractSectionTitle(line)
    if (sectionType) {
      flushQuestion()
      currentType = sectionType
      continue
    }

    if (!currentType) continue

    // New question
    const qMatch = line.match(/^Q:\s*(.+)/)
    if (qMatch) {
      flushQuestion()
      currentQuestion = qMatch[1].trim()
      inQuestion = true
      inOptions = false
      inExplanation = false
      continue
    }

    // Short answer details accordion (skip the HTML tags)
    if (line.includes("<details>") || line.includes("</details>") || line.includes("<summary>") || line.includes("</summary>")) {
      continue
    }

    // Option lines for MCQ
    const optionMatch = line.match(/^([A-Z])\.\s*(.+)/)
    if (optionMatch && inQuestion && (currentType === "mcq" || currentType === "truefalse")) {
      currentOptions.push(optionMatch[2].trim())
      inOptions = true
      continue
    }

    // True/False options
    const tfMatch = line.match(/^[-*]\s*(True|False)/i)
    if (tfMatch && currentType === "truefalse" && inQuestion) {
      currentOptions.push(tfMatch[1])
      inOptions = true
      continue
    }

    // Explanation / answer line (blockquote)
    if (line.startsWith(">")) {
      const content = line.replace(/^>\s*/, "").trim()
      // Check if it starts with a letter + period (like "B. Explanation")
      const answerMatch = content.match(/^([A-F])\.\s*(.+)/)
      if (answerMatch && (currentType === "mcq" || currentType === "truefalse")) {
        currentAnswer = answerMatch[1]
        currentExplanation = answerMatch[2].trim()
      } else {
        // For short answer or generic explanation
        if (!currentAnswer) {
          currentAnswer = content
        }
        currentExplanation = content
      }
      inExplanation = true
      continue
    }

    // Multi-line explanation
    if (inExplanation && currentExplanation) {
      currentExplanation += " " + line.trim()
    }
  }

  // Flush last question
  flushQuestion()

  return { title, questions }
}
