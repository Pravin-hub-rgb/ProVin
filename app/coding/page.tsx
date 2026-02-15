"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronDown, ChevronRight, Book, FileText, ArrowLeft, ArrowRight } from "lucide-react"
import { LectureViewer } from "@/components/lecture-viewer"

// Simple markdown content loader
const loadMarkdownContent = async (filePath: string): Promise<string> => {
  try {
    const response = await fetch(`/api/notes?file=${encodeURIComponent(filePath)}`)
    if (response.ok) {
      return await response.text()
    } else {
      return `# Error Loading Notes\n\nFailed to load: ${filePath}`
    }
  } catch (error) {
    return `# Error Loading Notes\n\n${error instanceof Error ? error.message : 'Unknown error'}`
  }
}
import styles from "./page.module.css"

type Lecture = {
  id: string
  title: string
  path: string
}

export default function CodingPage() {
  const [sidebarWidth, setSidebarWidth] = useState(300)
  const [isResizing, setIsResizing] = useState(false)
  const [pythonOpen, setPythonOpen] = useState(true)
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null)
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  
  // Refs for performance optimization
  const rafRef = useRef<number | null>(null)
  const isUpdatingRef = useRef(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Lecture data - manually configured
  const lectures: Lecture[] = [
    { id: "lec1", title: "Lec 1 - Variables & Functions", path: "docs/coding/python/1 Lec variables & functions/notes.md" },
    { id: "lec2", title: "Lec 2 - Conditionals", path: "docs/coding/python/2 Lec/notes.md" },
    { id: "lec3", title: "Lec 3 - Loops", path: "docs/coding/python/3 Lec loops/notes.md" },
    { id: "lec4", title: "Lec 4 - Exceptions", path: "docs/coding/python/4 Lec Exceptions/notes.md" },
    { id: "lec5", title: "Lec 5 - Modules", path: "docs/coding/python/5 Lec Modules/notes.md" }
  ]

  // Optimized resize handler with requestAnimationFrame
  const handleResize = useCallback((e: MouseEvent) => {
    if (!isResizing) return
    
    const newWidth = e.clientX
    const min = 251
    const max = 600
    
    // Clamp width to bounds
    const clampedWidth = Math.max(min, Math.min(max, newWidth))
    
    // Only update if width actually changed
    if (clampedWidth !== sidebarWidth) {
      // Use requestAnimationFrame for smooth 60fps updates
      if (!isUpdatingRef.current) {
        isUpdatingRef.current = true
        rafRef.current = requestAnimationFrame(() => {
          setSidebarWidth(clampedWidth)
          isUpdatingRef.current = false
        })
      }
    }
  }, [isResizing, sidebarWidth])

  // Handle mouse events for resizing
  useEffect(() => {
    const handleMouseUp = () => {
      setIsResizing(false)
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      isUpdatingRef.current = false
      // Remove body classes
      document.body.classList.remove('resizing')
    }

    if (isResizing) {
      // Use passive: false for mousemove to allow preventDefault if needed
      document.addEventListener('mousemove', handleResize, { passive: false })
      document.addEventListener('mouseup', handleMouseUp)
      
      // Add body classes for styling
      document.body.classList.add('resizing')
    }

    return () => {
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.classList.remove('resizing')
    }
  }, [isResizing, handleResize])

  // Handle keyboard accessibility for resizing
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLElement && e.target.tagName === 'INPUT') {
      return // Don't interfere with text input
    }

    const step = e.shiftKey ? 20 : 5 // Shift for larger steps
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        setSidebarWidth(prev => Math.max(251, prev - step))
        break
      case 'ArrowRight':
        e.preventDefault()
        setSidebarWidth(prev => Math.min(600, prev + step))
        break
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Load first lecture by default
  useEffect(() => {
    if (!selectedLecture) {
      setSelectedLecture(lectures[0])
    }
  }, [selectedLecture, lectures])

  // Load markdown content when lecture changes
  useEffect(() => {
    if (selectedLecture) {
      const loadContent = async () => {
        setIsLoading(true)
        try {
          const content = await loadMarkdownContent(selectedLecture.path)
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

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background transition-colors duration-500 relative">
      <div className="flex h-full">
        {/* Sidebar */}
        <div 
          ref={sidebarRef}
          className={`border-r border-border/50 bg-background/80 backdrop-blur-xl ${
            styles.sidebar
          } ${isResizing ? styles.isResizing : ''}`}
          style={{ 
            width: sidebarWidth,
            willChange: isResizing ? 'width' : 'auto'
          }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              Theory Notes
              {isResizing && (
                <span className="ml-2 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                  {sidebarWidth}px
                </span>
              )}
            </h2>
            
            <div className="space-y-2">
              {/* Python Section */}
              <div className="border border-border/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setPythonOpen(!pythonOpen)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-accent/50 transition-colors"
                >
                  <span className="font-medium text-foreground">Python</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">5 lectures</span>
                    {pythonOpen ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </button>
                
                {pythonOpen && (
                  <div className="border-t border-border/50 bg-background/50">
                    {lectures.map((lecture) => (
                      <button
                        key={lecture.id}
                        onClick={() => setSelectedLecture(lecture)}
                        className={`w-full px-6 py-3 text-left text-sm hover:bg-accent/50 transition-colors flex items-center gap-3 ${
                          selectedLecture?.id === lecture.id 
                            ? "bg-primary/15 text-primary" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        {lecture.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Draggable Divider - Full Height Overlay */}
        <div
          className={`${styles.resizeHandle} ${
            isResizing ? styles.isResizing : ''
          }`}
          style={{ left: `${sidebarWidth}px` }}
          onMouseDown={() => setIsResizing(true)}
          title="Drag to resize"
        >
          {/* Accessibility label for screen readers */}
          <span className="sr-only">Resize sidebar</span>
          {/* Tooltip for better UX */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
            Drag to resize
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 overflow-auto p-8 ${styles.contentArea}`}>
          {selectedLecture ? (
            <div className="max-w-4xl">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {selectedLecture.title}
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