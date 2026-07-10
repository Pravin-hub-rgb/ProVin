"use client"

import { useState, useMemo } from "react"
import { createPortal } from "react-dom"
import { parseQuiz } from "@/lib/quiz-parser"
import type { QuizQuestion } from "@/lib/quiz-types"
import Celebration from "@/components/git-lab/celebration"

interface QuizViewerProps {
  content: string
}

function shuffleOptions(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map((q) => {
    if (q.type === "shortanswer" || !q.options || q.options.length === 0) return q

    const correctAnswer = q.options[q.correctIndex!]
    const shuffled = [...q.options]

    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    const newCorrectIndex = shuffled.indexOf(correctAnswer)

    return { ...q, options: shuffled, correctIndex: newCorrectIndex }
  })
}

export function QuizViewer({ content }: QuizViewerProps) {
  const quiz = useMemo(() => parseQuiz(content), [content])
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>(() =>
    shuffleOptions(quiz.questions)
  )
  const [answers, setAnswers] = useState<Record<number, number | null>>({})
  const [submitted, setSubmitted] = useState(false)

  function getScore() {
    let correct = 0
    for (let i = 0; i < shuffledQuestions.length; i++) {
      const q = shuffledQuestions[i]
      const ans = answers[i]
      if (ans === undefined || ans === null) continue
      if (q.type === "shortanswer") {
        if (ans === 1) correct++
      } else {
        if (ans === q.correctIndex) correct++
      }
    }
    return correct
  }

  function getAttempted() {
    let count = 0
    for (let i = 0; i < shuffledQuestions.length; i++) {
      if (answers[i] !== undefined && answers[i] !== null) count++
    }
    return count
  }

  function handleOptionClick(qIdx: number, optIdx: number) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))
  }

  function handleSubmit() {
    setSubmitted(true)
    const s = getScore()
    if (total > 0 && (s / total) >= 0.6) {
      setConfettiKey((k) => k + 1)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 4000)
    }
  }

  function handleReset() {
    setAnswers({})
    setSubmitted(false)
    setShowConfetti(false)
    setConfettiKey((k) => k + 1)
    setShuffledQuestions(shuffleOptions(quiz.questions))
  }

  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiKey, setConfettiKey] = useState(0)
  const total = shuffledQuestions.length
  const answered = getAttempted()
  const score = submitted ? getScore() : 0

  return (
    <div className="space-y-8">
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{quiz.title}</h2>
        <span className="text-sm text-muted-foreground">
          {answered}/{total} answered
        </span>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {shuffledQuestions.map((q, qIdx) => (
          <QuestionCard
            key={qIdx}
            question={q}
            index={qIdx}
            selected={answers[qIdx] ?? null}
            submitted={submitted}
            onSelect={(optIdx) => handleOptionClick(qIdx, optIdx)}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-4 border-t border-border/50">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {answered === 0 ? "Skip & Check Answers" : `Submit (${answered}/${total} answered)`}
          </button>
        ) : (
          <>
            <div className="text-lg font-semibold">
              Score:{" "}
              <span className={score === total ? "text-green-500" : score >= total / 2 ? "text-yellow-500" : "text-red-500"}>
                {score}/{total}
              </span>
              <span className="text-sm text-muted-foreground font-normal ml-2">
                ({answered} attempted)
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </>
        )}
      </div>

      {showConfetti && createPortal(
        <Celebration key={confettiKey} />,
        document.body
      )}
    </div>
  )
}

function QuestionCard({
  question,
  index,
  selected,
  submitted,
  onSelect,
}: {
  question: QuizQuestion
  index: number
  selected: number | null
  submitted: boolean
  onSelect: (optIdx: number) => void
}) {
  const isCorrect = submitted && selected !== null && question.type !== "shortanswer" && selected === question.correctIndex
  const isWrong = submitted && selected !== null && question.type !== "shortanswer" && selected !== question.correctIndex
  const notAnswered = submitted && selected === null && question.type !== "shortanswer"
  const isShortAnswer = question.type === "shortanswer"

  return (
    <div className={`border rounded-xl overflow-hidden bg-card/30 ${
      notAnswered ? "border-yellow-500/40" : "border-border/50"
    }`}>
      {/* Question header */}
      <div className={`px-5 py-3 border-b flex items-center gap-2 ${
        notAnswered ? "border-yellow-500/20 bg-yellow-500/5" : "border-border/30"
      }`}>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {question.type === "mcq" ? "MCQ" : question.type === "truefalse" ? "True / False" : "Short Answer"}
        </span>
        <span className="text-xs text-muted-foreground">•</span>
        <span className="text-xs text-muted-foreground">Q{index + 1}</span>
        {notAnswered && (
          <span className="ml-auto text-xs font-medium text-yellow-600 dark:text-yellow-400">Not Answered</span>
        )}
      </div>

      {/* Question text */}
      <div className="px-5 py-4">
        <p className="text-foreground font-medium leading-relaxed">{question.question}</p>
      </div>

      {/* Options */}
      {question.options && question.options.length > 0 && (
        <div className="px-5 pb-4 space-y-2">
          {question.options.map((opt, optIdx) => {
            const showCorrect = submitted && optIdx === question.correctIndex
            const showWrong = submitted && selected !== null && optIdx === selected && optIdx !== question.correctIndex

            return (
              <button
                key={optIdx}
                onClick={() => onSelect(optIdx)}
                disabled={submitted}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all border ${
                  showCorrect
                    ? "border-green-500/60 bg-green-500/10 text-green-700 dark:text-green-300"
                    : showWrong
                      ? "border-red-500/60 bg-red-500/10 text-red-700 dark:text-red-300"
                      : selected === optIdx && !submitted
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border/50 bg-background/50 hover:bg-accent/30 text-muted-foreground hover:text-foreground"
                } ${!submitted ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-medium shrink-0">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                  {showCorrect && <span className="ml-auto text-green-500 text-xs font-medium">✓ Correct</span>}
                  {showWrong && <span className="ml-auto text-red-500 text-xs font-medium">✗ Incorrect</span>}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Short answer input */}
      {isShortAnswer && (
        <div className="px-5 pb-4">
          <details className="group">
            <summary className="text-sm text-primary cursor-pointer hover:opacity-80 font-medium">
              {submitted ? "Show Answer" : "Show Hint"}
            </summary>
            <div className="mt-3 p-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {question.correctAnswer}
            </div>
          </details>
        </div>
      )}

      {/* Explanation on submit */}
      {submitted && (
        <div className="px-5 py-3 border-t border-border/30 bg-muted/20">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}
