"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronDown, ChevronRight, Book, FileText, HelpCircle } from "lucide-react"
import { LectureViewer } from "@/components/lecture-viewer"
import { QuizViewer } from "@/components/quiz-viewer"
import { SidebarLayout } from "@/components/sidebar-layout"
import { CourseSidebar } from "@/components/course-sidebar"
import { spokenEnglishSubject } from "@/lib/general-subjects/spoken-english.subject"
import { chessSubject } from "@/lib/general-subjects/chess-to-1000.subject"
import { geopoliticsSubject } from "@/lib/general-subjects/geopolitics.subject"
import { getDefaultLecture } from "@/lib/subject-utils"
import { loadMarkdownContent, type Subject, type Lecture } from "@/lib/general-data"
import { getSubjectProgress } from "@/lib/progress-utils"
import { useLanguage } from "@/lib/language-context"
import hinglishManifest from "@/docs/coding-hi/manifest.json"
import SubjectCard from "@/components/subject-card"
import styles from "../coding/page.module.css"

import type { Dispatch, SetStateAction } from "react"

type GeneralPageProps = {
  selectedSubject: string | null
  setSelectedSubject: Dispatch<SetStateAction<string | null>>
  selectedLecture: string | null
  setSelectedLecture: Dispatch<SetStateAction<string | null>>
}

const subjects: Subject[] = [spokenEnglishSubject, chessSubject, geopoliticsSubject]

export default function GeneralPage({selectedSubject, setSelectedSubject, selectedLecture, setSelectedLecture}: GeneralPageProps) {
  const { language, setHasHinglish } = useLanguage()

  const currentSubject = subjects.find(s => s.id === selectedSubject) ?? null

  let currentLecture: Lecture | null = null
  if (currentSubject) {
    const lectures = currentSubject.lectures
    currentLecture = lectures?.find(l => l.id === selectedLecture) ?? null

    if (!currentLecture && currentSubject.phases) {
      for (const phase of currentSubject.phases) {
        const found = phase.lectures.find(l => l.id === selectedLecture)
        if (found) {
          currentLecture = found
          break
        }
        const foundQuiz = phase.quizzes?.find(quiz => quiz.id === selectedLecture)
        if (foundQuiz) {
          currentLecture = foundQuiz
          break
        }
      }
    }
  }

  const isQuiz = currentSubject?.phases?.some(phase =>
    phase.quizzes?.some(quiz => quiz.id === selectedLecture)
  ) ?? false
  const [sidebarWidth, setSidebarWidth] = useState(300)
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({})

  const [markdownContent, setMarkdownContent] = useState<string>('')
  const contentRef = useRef<HTMLDivElement>(null)
  const lastScrollSaveRef = useRef(0)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [allProgress, setAllProgress] = useState<Record<string, Record<string, boolean>>>({})

  const saveProgress = useCallback(async (lectureId: string, completed: boolean) => {
    const subjectId = currentSubject?.id
    if (!subjectId) return

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId, lectureId, completed }),
      })
      if (!response.ok) throw new Error("Failed to save progress")

      setProgress(prev => ({ ...prev, [lectureId]: completed }))
      setAllProgress(prev => ({
        ...prev,
        [subjectId]: {
          ...(prev[subjectId] ?? {}),
          [lectureId]: completed,
        },
      }))
    } catch (err) {
      console.error("Failed to save progress", err)
    }
  }, [currentSubject?.id])

  useEffect(() => {
    if (currentSubject) {
      fetch(`/api/progress?subjectId=${currentSubject.id}`)
        .then(res => res.json())
        .then(data => setProgress(data))
        .catch(() => {})
    } else {
      setProgress({})
    }
  }, [currentSubject])

  useEffect(() => {
    fetch("/api/progress")
      .then((res) => res.json())
      .then((data) => setAllProgress(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (currentSubject?.phases) {
      const initialState: Record<string, boolean> = {}

      let activePhaseId: string | null = null
      if (selectedLecture) {
        for (const phase of currentSubject.phases) {
          const containsSelectedLecture = phase.lectures.some(lecture => lecture.id === selectedLecture)
            || phase.quizzes?.some(quiz => quiz.id === selectedLecture)
          if (containsSelectedLecture) {
            activePhaseId = phase.id
            break
          }
        }
      }

      currentSubject.phases.forEach(phase => {
        initialState[phase.id] = phase.id === activePhaseId
      })
      setOpenPhases(initialState)
    }
  }, [currentSubject, selectedLecture])

  // Load first lecture by default when subject changes (or selection is empty)
  useEffect(() => {
    if (!selectedSubject) {
      if (typeof setSelectedLecture === "function") {
        setSelectedLecture(null)
      }
      return
    }
    if (currentSubject && !selectedLecture) {
      const first = getDefaultLecture(currentSubject) as Lecture | null
      if (first) setSelectedLecture(first.id)
    }
  }, [selectedSubject, selectedLecture, currentSubject, setSelectedLecture])

  useEffect(() => {
    if (currentLecture) {
      let cancelled = false
      const loadContent = async () => {
        setIsLoading(true)
        try {
          const content = await loadMarkdownContent(currentLecture.path, language)
          if (!cancelled) setMarkdownContent(content)
        } catch {
          if (!cancelled) setMarkdownContent("# Error loading content\n\nCould not load the lecture notes.")
        } finally {
          if (!cancelled) setIsLoading(false)
        }
      }
      loadContent()
      const hiPath = currentLecture.path.replace("docs/general/", "docs/general-hi/")
      setHasHinglish(!!(hinglishManifest as Record<string, boolean>)[hiPath])

      return () => { cancelled = true }
    } else {
      setHasHinglish(false)
    }
  }, [selectedLecture, language])

  // Restore scroll position when content finishes loading
  useEffect(() => {
    if (isLoading) return
    if (!contentRef.current) return
    if (!selectedLecture) return
    try {
      const saved = localStorage.getItem(`scroll-${selectedLecture}`)
      if (saved) contentRef.current.scrollTop = parseInt(saved, 10) || 0
      else contentRef.current.scrollTop = 0
    } catch {}
  }, [selectedLecture, isLoading])

  useEffect(() => {
    if (!selectedLecture) return
    const timer = setTimeout(() => {
      const el = document.querySelector(`[data-lecture-id="${selectedLecture}"], [data-quiz-id="${selectedLecture}"]`) as HTMLElement | null
      if (el) {
        try { el.scrollIntoView({ block: "nearest", behavior: "auto" }) } catch {}
      }
    }, 50)
    return () => clearTimeout(timer)
  }, [selectedLecture])

  // Render Dashboard View
  if (!selectedSubject) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-background transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">General</h1>
            <p className="text-muted-foreground">Select a subject to view learning materials</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => {
              const { completed, total, percent } = getSubjectProgress(
                subject,
                allProgress[subject.id] ?? {},
                true,
              )
              return (
                <SubjectCard
                  key={subject.id}
                  title={subject.title}
                  description={subject.description}
                  completed={completed}
                  total={total}
                  percent={percent}
                  onClick={() => setSelectedSubject(subject.id)}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Render Notes View
  if (!currentSubject) {
    return null
  }

  const lectureList = currentSubject.lectures ?? []
  const useUnifiedSidebar = currentSubject.id === "geopolitics"

  return (
    <div className="h-[calc(100vh-3.5rem)] max-md:h-[calc(100dvh-7.5rem)] bg-background transition-colors duration-500 relative overflow-hidden">
      <button
        onClick={() => {
          setSelectedSubject(null)
          setSelectedLecture(null)
          setOpenPhases({})
        }}
        className="absolute top-4 left-4 z-[101] flex items-center gap-2 px-3 py-3 bg-background/80 backdrop-blur-xl border border-border/50 rounded-md text-sm hover:bg-accent/50 transition-colors"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        Back to Dashboard
      </button>

      <div className="flex h-full pt-12">
        {/* Sidebar */}
        <SidebarLayout
          sidebarWidth={sidebarWidth}
          onSidebarWidthChange={setSidebarWidth}
        >
          {useUnifiedSidebar ? (
            <CourseSidebar
              subjectTitle={currentSubject.title}
              roadmapLectures={lectureList}
              phases={currentSubject.phases ?? []}
              openPhases={openPhases}
              selectedLecture={selectedLecture}
              progress={progress}
              onTogglePhase={(phaseId) =>
                setOpenPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }))
              }
              onSelect={setSelectedLecture}
              onToggleProgress={saveProgress}
            />
          ) : (
          <div className="p-6 pb-20">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              {currentSubject.title}
            </h2>


            <div className="space-y-3">

              {/* Top Level Lectures */}
              {lectureList.length > 0 && (
                <div className="border border-border/50 rounded-lg overflow-hidden">
                  <div className="border-t border-border/50 bg-background/50">
                    {lectureList.map((lecture) => (
                      <div key={lecture.id} className="flex items-center hover:bg-accent/50 transition-colors">
                        <input
                          type="checkbox"
                          aria-label={`Mark ${lecture.title} complete`}
                          checked={progress[lecture.id] ?? false}
                          onChange={(e) => saveProgress(lecture.id, e.target.checked)}
                          className="ml-4 accent-primary"
                        />
                        <button
                          onClick={() => setSelectedLecture(lecture.id)} data-lecture-id={lecture.id}
                          className={`flex flex-1 items-center gap-3 px-4 py-3 text-left text-sm ${
                            selectedLecture === lecture.id
                              ? "bg-primary/15 text-foreground font-semibold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <FileText className="w-4 h-4 shrink-0" />
                          {lecture.title}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phases Groups if subject has phases */}
              {currentSubject.phases && currentSubject.phases.map((phase) => (
                <div key={phase.id} className="border border-border/50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenPhases(prev => ({
                      ...prev,
                      [phase.id]: !prev[phase.id]
                    }))}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-accent/50 transition-colors"
                  >
                    <span className="font-medium text-foreground">{phase.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{phase.lectures.length} topics</span>
                      {openPhases[phase.id] ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {openPhases[phase.id] && (
                    <div className="border-t border-border/50 bg-background/50">
                      {phase.lectures.map((lecture) => {
                        const lectureSuffix = lecture.id.replace(/^[^-]+-/, "")
                        const relatedQuizzes = phase.quizzes?.filter(
                          quiz => quiz.id.replace(/^[^-]+-/, "") === lectureSuffix
                        )

                        return (
                          <div key={lecture.id}>
                            <div className="flex items-center hover:bg-accent/50 transition-colors">
                              <input
                                type="checkbox"
                                aria-label={`Mark ${lecture.title} complete`}
                                checked={progress[lecture.id] ?? false}
                                onChange={(e) => saveProgress(lecture.id, e.target.checked)}
                                className="ml-6 accent-primary"
                              />
                              <button
                                onClick={() => setSelectedLecture(lecture.id)} data-lecture-id={lecture.id}
                                className={`flex flex-1 items-center gap-3 px-4 py-2.5 text-left text-sm ${
                                  selectedLecture === lecture.id
                                    ? "bg-primary/15 text-foreground font-semibold"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                <FileText className="w-3.5 h-3.5 shrink-0" />
                                {lecture.title}
                              </button>
                            </div>

                            {relatedQuizzes?.map(quiz => (
                              <div key={quiz.id} className="ml-8 flex items-center border-l-2 border-border/30 hover:bg-accent/50 transition-colors">
                                <input
                                  type="checkbox"
                                  aria-label={`Mark ${quiz.title} complete`}
                                  checked={progress[quiz.id] ?? false}
                                  onChange={(e) => saveProgress(quiz.id, e.target.checked)}
                                  className="ml-6 accent-primary shrink-0"
                                />
                                <button
                                  onClick={() => setSelectedLecture(quiz.id)} data-quiz-id={quiz.id}
                                  className={`flex flex-1 items-center gap-2.5 py-1.5 pl-2 pr-6 text-left text-xs ${
                                    selectedLecture === quiz.id
                                      ? "bg-primary/10 text-foreground font-semibold"
                                      : "text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  <HelpCircle className="w-3 h-3 shrink-0" />
                                  {quiz.title}
                                </button>
                              </div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>
          )}
        </SidebarLayout>

        {/* Content Area */}
        <div ref={contentRef} onScroll={() => {
          if (contentRef.current && selectedLecture) {
            const now = Date.now()
            if (now - lastScrollSaveRef.current < 100) return
            lastScrollSaveRef.current = now
            try { localStorage.setItem(`scroll-${selectedLecture}`, String(contentRef.current.scrollTop)) } catch {}
          }
        }} className={`flex-1 overflow-auto p-8 ${styles.contentArea}`}>
          {currentLecture ? (
            <div className="max-w-4xl pb-12">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {currentLecture.title}
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full" />
              </div>

              {/* Lecture Content */}
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Loading notes...</p>
                </div>
               ) : isQuiz ? (
                 <QuizViewer key={currentLecture.id} content={markdownContent} />
               ) : (
                 <LectureViewer content={markdownContent} />
               )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center py-16">
              <div className="text-6xl mb-4">📖</div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Select a Lecture</h2>
              <p className="text-muted-foreground">
                Choose a lecture from the sidebar to view its notes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
