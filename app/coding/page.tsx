"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, Book, FileText } from "lucide-react"
import { LectureViewer } from "@/components/lecture-viewer"
import { SidebarLayout } from "@/components/sidebar-layout"
import { subjects, loadMarkdownContent, type Subject, type Lecture, type LectureGroup } from "@/lib/coding-data"
import styles from "./page.module.css"
import ProgressChecklist from "@/components/progress-checklist"

// ✅ Proper TypeScript Type Narrowing (No `any`)
const isComponentLecture = (lecture: Lecture | null): lecture is Lecture & { isComponent: true } => {
  return lecture !== null && 'isComponent' in lecture && lecture.isComponent === true
}

import type { Dispatch, SetStateAction } from "react"

type CodingPageProps = {
  selectedSubject: string | null
  setSelectedSubject: Dispatch<SetStateAction<string | null>>
  selectedLecture: string | null
  setSelectedLecture: Dispatch<SetStateAction<string | null>>
}

export default function CodingPage({selectedSubject, setSelectedSubject, selectedLecture, setSelectedLecture}: CodingPageProps) {

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
        // Also check nested groups inside phase
        if (!currentLecture && (phase as any).groups) {
          for (const subGroup of (phase as any).groups) {
            const foundInGroup = subGroup.lectures.find((l: Lecture) => l.id === selectedLecture)
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
  const [sidebarWidth, setSidebarWidth] = useState(300)
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({})
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})
  
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  // Load first lecture by default when subject changes
  // Initialize open phases state when subject changes
  // ✅ Always open the phase that contains currently selected lecture
  useEffect(() => {
    if (currentSubject?.phases) {
      const initialState: Record<string, boolean> = {}
      
      // Find which phase contains the currently selected lecture
      let activePhaseId: string | null = null
      if (selectedLecture) {
        for (const phase of currentSubject.phases) {
          if (phase.lectures.some(l => l.id === selectedLecture)) {
            activePhaseId = phase.id
            break
          }
        }
      }

      currentSubject.phases.forEach(phase => {
        // If this is the phase that has current lecture: open it
        if (phase.id === activePhaseId) {
          initialState[phase.id] = true
        } else {
          // ✅ All other phases are FORCE CLOSED
          // No defaults. Only active phase is open.
          initialState[phase.id] = false
        }
      })
      
      setOpenPhases(initialState)
    }
  }, [currentSubject, selectedLecture])

  useEffect(() => {
    if (currentSubject) {
      // If we have phases, load first lecture from first phase
      if (currentSubject.phases && currentSubject.phases.length > 0 && !selectedLecture) {
        const firstPhaseLectures = currentSubject.phases[0].lectures
        if (firstPhaseLectures.length > 0) {
          setSelectedLecture(firstPhaseLectures[0].id)
        }
      }
      // Fallback to old lecture list
      else if (currentSubject.lectures.length > 0 && !selectedLecture) {
        setSelectedLecture(currentSubject.lectures[0].id)
      }
    }
    
    // Reset selected lecture when switching subjects
    if (!selectedSubject) {
      setSelectedLecture(null)
    }
  }, [selectedSubject, selectedLecture, currentSubject])

  // Load markdown content when lecture changes
  useEffect(() => {
    if (currentLecture) {
      const loadContent = async () => {
        setIsLoading(true)
        try {
          const content = await loadMarkdownContent(currentLecture.path)
          setMarkdownContent(content)
        } catch (error) {
          setMarkdownContent(`# Error Loading Notes\n\n${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
          setIsLoading(false)
        }
      }
      loadContent()
    }
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
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className="group text-left bg-background/50 border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 hover:bg-accent/30 transition-all duration-200"
              >
                <div className="p-5">
                  <h3 className="text-base font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                    {subject.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{subject.description}</p>
                </div>
              </button>
            ))}
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
              Theory Notes
            </h2>
            
            <div className="space-y-3">

              {/* Top Level Lectures (Roadmap / Checklist) */}
              {currentSubject.lectures.length > 0 && (
                <div className="border border-border/50 rounded-lg overflow-hidden">
                  <div className="border-t border-border/50 bg-background/50">
                    {currentSubject.lectures.map((lecture) => (
                      <button
                        key={lecture.id}
                        onClick={() => setSelectedLecture(lecture.id)}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-accent/50 transition-colors flex items-center gap-3 ${
                          selectedLecture === lecture.id 
                            ? "bg-primary/15 text-primary" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        {lecture.title}
                      </button>
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
                      {/* Sub-groups first (like folders in explorer) */}
                      {(phase as any).groups?.map((subGroup: any) => (
                        <div key={subGroup.id}>
                          <button
                            onClick={() => setOpenGroups(prev => ({
                              ...prev,
                              [subGroup.id]: !prev[subGroup.id]
                            }))}
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
                              {subGroup.lectures.map((lecture: any) => (
                                <button
                                  key={lecture.id}
                                  onClick={() => setSelectedLecture(lecture.id)}
                                  className={`w-full px-4 py-2 text-left text-sm hover:bg-accent/50 transition-colors flex items-center gap-3 ${
                                    selectedLecture === lecture.id 
                                      ? "bg-primary/15 text-primary" 
                                      : "text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  <FileText className="w-3 h-3" />
                                  {lecture.title}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Main lectures after groups */}
                      {phase.lectures.map((lecture) => (
                        <button
                          key={lecture.id}
                          onClick={() => setSelectedLecture(lecture.id)}
                          className={`w-full px-6 py-2.5 text-left text-sm hover:bg-accent/50 transition-colors flex items-center gap-3 ${
                            selectedLecture === lecture.id 
                              ? "bg-primary/15 text-primary" 
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          {lecture.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Legacy single list if no phases */}
              {!currentSubject.phases && currentSubject.lectures.length > 0 && (
                <div className="border border-border/50 rounded-lg overflow-hidden">
                  <div className="border-t border-border/50 bg-background/50">
                    {currentSubject.lectures.map((lecture) => (
                      <button
                        key={lecture.id}
                        onClick={() => setSelectedLecture(lecture.id)}
                        className={`w-full px-6 py-3 text-left text-sm hover:bg-accent/50 transition-colors flex items-center gap-3 ${
                          selectedLecture === lecture.id 
                            ? "bg-primary/15 text-primary" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        {lecture.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </SidebarLayout>

        {/* Content Area */}
        <div className={`flex-1 overflow-auto p-8 ${styles.contentArea}`}>
          {currentLecture ? (  
            <div className="max-w-4xl">
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
               ) : (
                 isComponentLecture(currentLecture) ? (
                   <ProgressChecklist subject={currentSubject!} />
                 ) : (
                   <LectureViewer content={markdownContent} />
                 )
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