"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronDown, ChevronRight, Book, FileText, HelpCircle } from "lucide-react"
import { LectureViewer } from "@/components/lecture-viewer"
import { ExcalidrawViewer } from "@/components/excalidraw-viewer"
import { QuizViewer } from "@/components/quiz-viewer"
import { SidebarLayout } from "@/components/sidebar-layout"
import { subjects, loadMarkdownContent, type Lecture } from "@/lib/coding-data"
import { getSubjectProgress } from "@/lib/progress-utils"
import { getDefaultLecture } from "@/lib/subject-utils"
import hinglishManifest from "@/docs/coding-hi/manifest.json"
import { useLanguage } from "@/lib/language-context"
import SubjectCard from "@/components/subject-card"
import styles from "./page.module.css"
import type { Dispatch, SetStateAction } from "react"

type CodingPageProps = {
  selectedSubject: string | null
  setSelectedSubject: Dispatch<SetStateAction<string | null>>
  selectedLecture: string | null
  setSelectedLecture: Dispatch<SetStateAction<string | null>>
}

export default function CodingPage({selectedSubject, setSelectedSubject, selectedLecture, setSelectedLecture}: CodingPageProps) {

  const { language, setHasHinglish } = useLanguage()
  
  // Lookup actual objects from ids
  const currentSubject = subjects.find(s => s.id === selectedSubject) ?? null
  
  // Find lecture in both top level and inside phases
  let currentLecture: Lecture | null = null
  if (currentSubject) {
    // Check top level lectures first
    currentLecture = currentSubject.lectures.find(l => l.id === selectedLecture) ?? null
    
    // If not found, check all phases
    if (!currentLecture && currentSubject.phases) {
      for (const phase of currentSubject.phases) {
        const found = phase.lectures.find(l => l.id === selectedLecture)
        if (found) {
          currentLecture = found
          break
        }
        const foundQuiz = phase.quizzes?.find(q => q.id === selectedLecture)
        if (foundQuiz) {
          currentLecture = foundQuiz
          break
        }
        if (!currentLecture && phase.groups) {
          for (const subGroup of phase.groups) {
            const foundInGroup = subGroup.lectures.find(l => l.id === selectedLecture)
            if (foundInGroup) {
              currentLecture = foundInGroup
              break
            }
          }
          if (currentLecture) break
        }
      }
    }
  }
  
  // Check if current selection is a quiz
  let isQuiz = false
  if (currentSubject?.phases && currentLecture) {
    for (const phase of currentSubject.phases) {
      if (phase.quizzes?.find(q => q.id === selectedLecture)) {
        isQuiz = true
        break
      }
    }
  }

  const [sidebarWidth, setSidebarWidth] = useState(300)
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({})
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})
  
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [allProgress, setAllProgress] = useState<Record<string, Record<string, boolean>>>({})

  const saveProgress = useCallback(async (lectureId: string, completed: boolean) => {
    setProgress(prev => ({ ...prev, [lectureId]: completed }))
    setAllProgress(prev => {
      if (!currentSubject?.id) return prev
      const current = prev[currentSubject.id] ?? {}
      return { ...prev, [currentSubject.id]: { ...current, [lectureId]: completed } }
    })
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId: currentSubject?.id, lectureId, completed }),
      })
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

  // Reset open phases when the subject changes: start collapsed, and open
  // only the phase containing the selected lecture. Follows from the selection,
  // not from any saved snapshot of the accordion.
  // Does NOT run on selectedLecture change, so manually opened phases stay open.
  useEffect(() => {
    if (currentSubject?.phases) {
      const initial: Record<string, boolean> = {}
      if (selectedLecture) {
        for (const phase of currentSubject.phases) {
          const inLectures = phase.lectures.some(l => l.id === selectedLecture)
          const inQuizzes = phase.quizzes?.some(q => q.id === selectedLecture)
          const inGroups = phase.groups?.some(g => g.lectures.some(l => l.id === selectedLecture))
          if (inLectures || inQuizzes || inGroups) {
            initial[phase.id] = true
            break
          }
        }
      }
      setOpenPhases(initial)
      setOpenGroups({})
    } else {
      setOpenPhases({})
      setOpenGroups({})
    }
  }, [currentSubject])

  // When a lecture is selected, ensure its phase (and its group, if any) is open (additive — never closes others).
  // Persist the change so it survives refresh.
  useEffect(() => {
    if (selectedLecture && currentSubject?.phases) {
      for (const phase of currentSubject.phases) {
        const inLectures = phase.lectures.some(l => l.id === selectedLecture)
        const inQuizzes = phase.quizzes?.some(q => q.id === selectedLecture)
        const containingGroup = phase.groups?.find(g => g.lectures.some(l => l.id === selectedLecture))
        if (inLectures || inQuizzes || containingGroup) {
          setOpenPhases(prev => {
            if (prev[phase.id]) return prev
            return { ...prev, [phase.id]: true }
          })
          if (containingGroup) {
            setOpenGroups(prev => {
              if (prev[containingGroup.id]) return prev
              return { ...prev, [containingGroup.id]: true }
            })
          }
          break
        }
      }
    }
  }, [selectedLecture, currentSubject])

  useEffect(() => {
    if (!selectedSubject) {
      if (typeof setSelectedLecture === "function") {
        setSelectedLecture(null)
      }
      return
    }
    if (currentSubject && !selectedLecture) {
      // Try to restore the last opened lecture from localStorage first
      let saved: string | null = null
      try { saved = localStorage.getItem("selectedLecture") } catch {}
      const belongsToSubject = !!saved && (
        !!currentSubject.lectures?.some(l => l.id === saved) ||
        !!currentSubject.phases?.some(phase =>
          phase.lectures.some(l => l.id === saved) ||
          phase.quizzes?.some(q => q.id === saved)
        )
      )
      if (belongsToSubject) {
        setSelectedLecture(saved)
        return
      }
      const first = getDefaultLecture(currentSubject) as Lecture | null
      if (first) setSelectedLecture(first.id)
    }
  }, [selectedSubject, selectedLecture, currentSubject, setSelectedLecture])

  // Load markdown content when lecture changes or language changes
  const requestIdRef = useRef(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const lastScrollSaveRef = useRef(0)

  useEffect(() => {
    if (!currentLecture) {
      setHasHinglish(false)
      return
    }

    const thisRequestId = ++requestIdRef.current

    const loadContent = async () => {
      setIsLoading(true)
      try {
        const content = await loadMarkdownContent(currentLecture.path, language)
        if (thisRequestId !== requestIdRef.current) return
        setMarkdownContent(content)
      } catch (error) {
        if (thisRequestId !== requestIdRef.current) return
        setMarkdownContent(`# Error Loading Notes\n\n${error instanceof Error ? error.message : 'Unknown error'}`)
      } finally {
        if (thisRequestId === requestIdRef.current) setIsLoading(false)
      }
    }
    loadContent()

    // Check if Hinglish version exists using manifest (no network fetch)
    const hiPath = currentLecture.path
      .replace("docs/coding/", "docs/coding-hi/")
      .replace("docs/finance/", "docs/finance-hi/")
      .replace("docs/general/", "docs/general-hi/")
    const hasHi = !!(hinglishManifest as Record<string, boolean>)[hiPath]
    setHasHinglish(hasHi)
  }, [selectedLecture, language])

  // Restore scroll position when content finishes loading
  useEffect(() => {
    if (isLoading) return
    if (!contentRef.current) return
    if (!selectedLecture) return
    try {
      const saved = localStorage.getItem(`scroll-${selectedLecture}`)
      if (saved) {
        contentRef.current.scrollTop = parseInt(saved, 10) || 0
      } else {
        contentRef.current.scrollTop = 0
      }
    } catch {}
  }, [selectedLecture, isLoading])

  // Scroll the sidebar to reveal the selected lecture after refresh/navigation
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Coding Dashboard</h1>
            <p className="text-muted-foreground">Select a subject to view learning materials</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => {
              const { completed, total, percent } = getSubjectProgress(
                subject,
                allProgress[subject.id] ?? {},
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

  return (
    <div className="h-[calc(100vh-3.5rem)] max-md:h-[calc(100dvh-7.5rem)] bg-background transition-colors duration-500 relative overflow-hidden">
      <button
        onClick={() => {
          setSelectedSubject(null)
          setSelectedLecture(null)
          setOpenPhases({})
          setOpenGroups({})
          if (selectedSubject) {
            try {
              localStorage.removeItem(`openPhases-${selectedSubject}`)
              localStorage.removeItem(`openGroups-${selectedSubject}`)
              localStorage.removeItem("selectedLecture")
            } catch {}
          }
        }}
        className="absolute top-4 left-4 z-[101] flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-xl border border-border/50 rounded-md text-sm hover:bg-accent/50 transition-colors"
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
          <div className="p-6 pb-20">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              {currentSubject.title}
            </h2>
            
            <div className="space-y-3">

              {/* Top Level Lectures (Roadmap / Checklist) â€” only when subject HAS phases,
                  otherwise the legacy list below renders them */}
              {currentSubject.phases && currentSubject.lectures.length > 0 && (
                <div className="border border-border/50 rounded-lg overflow-hidden">
                  <div className="border-t border-border/50 bg-background/50">
                    {currentSubject.lectures.map((lecture) => (
                      <div key={lecture.id} className="flex items-center hover:bg-accent/50 transition-colors">
                        <input
                          type="checkbox"
                          aria-label={`Mark ${lecture.title} complete`}
                          checked={progress[lecture.id] ?? false}
                          onChange={(e) => saveProgress(lecture.id, e.target.checked)}
                          className="ml-6 accent-primary shrink-0"
                        />
                        <button
                          onClick={() => setSelectedLecture(lecture.id)} data-lecture-id={lecture.id}
                          className={`flex flex-1 items-center gap-3 px-4 py-3 text-left text-sm ${
                            selectedLecture === lecture.id
                              ? "bg-primary/15 text-foreground font-semibold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <FileText className="w-4 h-4" />
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
                     onClick={() => {
                       setOpenPhases(prev => ({
                         ...prev,
                         [phase.id]: !prev[phase.id],
                       }))
                     }}
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
                      {/* Sub-groups first (like folders in explorer) */}
                      {phase.groups?.map((subGroup) => (
                        <div key={subGroup.id}>
                          <button
                             onClick={() => {
                               setOpenGroups(prev => ({
                                 ...prev,
                                 [subGroup.id]: !prev[subGroup.id],
                               }))
                             }}
                            className="w-full px-6 py-2 text-left text-sm hover:bg-accent/50 transition-colors flex items-center gap-2 text-muted-foreground"
                          >
                            {openGroups[subGroup.id] ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                            <span className="text-xs font-medium">{subGroup.title}</span>
                            <span className="text-xs ml-auto text-muted-foreground/70">{subGroup.lectures.length} docs</span>
                          </button>
                          
                          {openGroups[subGroup.id] && (
                            <div className="ml-3 border-l border-border/30 pl-2">
                                  {subGroup.lectures.map((lecture) => (
                                    <div key={lecture.id} className="flex items-center hover:bg-accent/50 transition-colors">
                                      <input
                                        type="checkbox"
                                        aria-label={`Mark ${lecture.title} complete`}
                                        checked={progress[lecture.id] ?? false}
                                        onChange={(e) => saveProgress(lecture.id, e.target.checked)}
                                        className="ml-4 accent-primary shrink-0"
                                      />
                                      <button
                                        onClick={() => setSelectedLecture(lecture.id)} data-lecture-id={lecture.id}
                                        className={`flex flex-1 items-center gap-3 px-4 py-2 text-left text-sm ${
                                          selectedLecture === lecture.id
                                            ? "bg-primary/15 text-foreground font-semibold"
                                            : "text-muted-foreground hover:text-foreground"
                                        }`}
                                      >
                                        <FileText className="w-3 h-3" />
                                        {lecture.title}
                                      </button>
                                    </div>
                                  ))}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Main lectures after groups */}
                      {phase.lectures.map((lecture) => {
                        const lectureSuffix = lecture.id.replace(/^[^-]+-/, "")
                        const relatedQuizzes = phase.quizzes?.filter(
                          (q: Lecture) => q.id.replace(/^[^-]+-/, "") === lectureSuffix
                        )
                        return (
                          <div key={lecture.id}>
                            <div className="flex items-center hover:bg-accent/50 transition-colors">
                              <input
                                type="checkbox"
                                aria-label={`Mark ${lecture.title} complete`}
                                checked={progress[lecture.id] ?? false}
                                onChange={(e) => saveProgress(lecture.id, e.target.checked)}
                                className="ml-6 accent-primary shrink-0"
                              />
                              <button
                                onClick={() => setSelectedLecture(lecture.id)} data-lecture-id={lecture.id}
                                className={`flex flex-1 items-center gap-3 px-3 py-2.5 text-left text-sm ${
                                  selectedLecture === lecture.id
                                    ? "bg-primary/15 text-foreground font-semibold"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                <FileText className="w-3.5 h-3.5" />
                                {lecture.title}
                              </button>
                            </div>

                            {relatedQuizzes?.map((quiz: Lecture) => (
                              <div
                                key={quiz.id}
                                className="ml-8 flex items-center border-l-2 border-border/30 hover:bg-accent/50 transition-colors"
                              >
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
                                      ? "bg-primary/10 text-foreground font-semibold border-primary/40"
                                      : "text-muted-foreground hover:text-foreground border-border/30"
                                  }`}
                                >
                                  <HelpCircle className="w-3 h-3" />
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

              {/* Legacy single list if no phases */}
              {!currentSubject.phases && currentSubject.lectures.length > 0 && (
                <div className="border border-border/50 rounded-lg overflow-hidden">
                  <div className="border-t border-border/50 bg-background/50">
                    {currentSubject.lectures.map((lecture) => (
                      <div key={lecture.id} className="flex items-center hover:bg-accent/50 transition-colors">
                        <input
                          type="checkbox"
                          aria-label={`Mark ${lecture.title} complete`}
                          checked={progress[lecture.id] ?? false}
                          onChange={(e) => saveProgress(lecture.id, e.target.checked)}
                          className="ml-6 accent-primary shrink-0"
                        />
                        <button
                          onClick={() => setSelectedLecture(lecture.id)} data-lecture-id={lecture.id}
                          className={`flex flex-1 items-center gap-3 px-3 py-3 text-left text-sm ${
                            selectedLecture === lecture.id
                              ? "bg-primary/15 text-foreground font-semibold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                          {lecture.title}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </SidebarLayout>

        {/* Content Area */}
        <div
          ref={contentRef}
          onScroll={() => {
            if (contentRef.current && selectedLecture) {
              const now = Date.now()
              if (now - lastScrollSaveRef.current < 100) return
              lastScrollSaveRef.current = now
              try {
                localStorage.setItem(`scroll-${selectedLecture}`, String(contentRef.current.scrollTop))
              } catch {}
            }
          }}
          className={`flex-1 overflow-auto p-8 ${styles.contentArea}`}
        >
          {currentLecture ? (  
            <div className={currentLecture?.isComponent ? "w-full pb-12" : "max-w-4xl pb-12"}>
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
                  <QuizViewer content={markdownContent} />
               ) : currentLecture?.isComponent ? (
                  <ExcalidrawViewer file={currentLecture.path} />
               ) : (
                  <LectureViewer content={markdownContent} />
               )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center py-16">
              <div className="text-6xl mb-4">ðŸ“–</div>
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

