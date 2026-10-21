"use client"

import { Book, ChevronDown, ChevronRight, FileText, HelpCircle } from "lucide-react"

export type SidebarLecture = {
  id: string
  title: string
}

export type SidebarPhase = {
  id: string
  title: string
  lectures: SidebarLecture[]
  quizzes?: SidebarLecture[]
}

type CourseSidebarProps = {
  subjectTitle: string
  roadmapLectures: SidebarLecture[]
  phases: SidebarPhase[]
  openPhases: Record<string, boolean>
  selectedLecture: string | null
  progress: Record<string, boolean>
  onTogglePhase: (phaseId: string) => void
  onSelect: (lectureId: string) => void
  onToggleProgress: (lectureId: string, completed: boolean) => void
}

function rowClasses(selected: boolean) {
  return `w-full pl-14 pr-6 py-2.5 text-left text-sm hover:bg-accent/50 transition-colors flex items-center gap-3 ${
    selected ? "bg-primary/15 text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
  }`
}

/**
 * Sidebar used by the Geopolitics course. Checkbox is a sibling of the
 * lecture button (not nested inside it) so tapping it works on mobile
 * touch devices — a checkbox nested in a <button> is invalid HTML and
 * mobile browsers often swallow the tap.
 */
export function CourseSidebar({
  subjectTitle,
  roadmapLectures,
  phases,
  openPhases,
  selectedLecture,
  progress,
  onTogglePhase,
  onSelect,
  onToggleProgress,
  }: CourseSidebarProps) {
  return (
    <div className="p-6 pb-20">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Book className="w-5 h-5 text-primary" />
        {subjectTitle}
      </h2>

      <div className="space-y-3">
        {roadmapLectures.length > 0 && (
          <div className="border border-border/50 rounded-lg overflow-hidden">
            <div className="border-t border-border/50 bg-background/50">
              {roadmapLectures.map((lecture) => (
                <div
                  key={lecture.id}
                  className="flex items-center hover:bg-accent/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    aria-label={`Mark ${lecture.title} complete`}
                    checked={progress[lecture.id] ?? false}
                    onChange={(e) => onToggleProgress(lecture.id, e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                    className="ml-4 accent-primary shrink-0"
                  />
                  <button
                    onClick={() => onSelect(lecture.id)}
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

        {phases.map((phase) => (
          <div key={phase.id} className="border border-border/50 rounded-lg overflow-hidden">
            <button
              onClick={() => onTogglePhase(phase.id)}
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
                  const suffix = lecture.id.replace(/^[^-]+-/, "")
                  const relatedQuizzes = phase.quizzes?.filter(
                    (quiz) => quiz.id.replace(/^[^-]+-/, "") === suffix
                  )

                  return (
                    <div key={lecture.id}>
                      <div className="flex items-center hover:bg-accent/50 transition-colors">
                        <input
                          type="checkbox"
                          aria-label={`Mark ${lecture.title} complete`}
                          checked={progress[lecture.id] ?? false}
                          onChange={(e) => onToggleProgress(lecture.id, e.target.checked)}
                          onClick={(e) => e.stopPropagation()}
                          onTouchEnd={(e) => e.stopPropagation()}
                          className="ml-6 accent-primary shrink-0"
                        />
                        <button
                          onClick={() => onSelect(lecture.id)}
                          className={rowClasses(selectedLecture === lecture.id)}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          {lecture.title}
                        </button>
                      </div>

                      {relatedQuizzes?.map((quiz) => (
                        <div
                          key={quiz.id}
                          className="ml-8 flex items-center border-l-2 border-border/30 hover:bg-accent/50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            aria-label={`Mark ${quiz.title} complete`}
                            checked={progress[quiz.id] ?? false}
                            onChange={(e) => onToggleProgress(quiz.id, e.target.checked)}
                            onClick={(e) => e.stopPropagation()}
                            onTouchEnd={(e) => e.stopPropagation()}
                            className="ml-6 accent-primary scale-75 shrink-0"
                          />
                          <button
                            onClick={() => onSelect(quiz.id)}
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
      </div>
    </div>
  )
}
