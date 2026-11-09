"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronRight } from "lucide-react"
import styles from "@/app/coding/page.module.css"

type SidebarLayoutProps = {
  children: React.ReactNode
  sidebarWidth: number
  onSidebarWidthChange: (width: number) => void
}

export function SidebarLayout({ children, sidebarWidth, onSidebarWidthChange }: SidebarLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isResizing, setIsResizing] = useState(false)

  const rafRef = useRef<number | null>(null)
  const isUpdatingRef = useRef(false)

  const handleResize = useCallback((e: MouseEvent) => {
    if (!isResizing) return
    const newWidth = e.clientX
    const min = 251
    const max = 600
    const clampedWidth = Math.max(min, Math.min(max, newWidth))
    if (clampedWidth !== sidebarWidth && !isUpdatingRef.current) {
      isUpdatingRef.current = true
      rafRef.current = requestAnimationFrame(() => {
        onSidebarWidthChange(clampedWidth)
        isUpdatingRef.current = false
      })
    }
  }, [isResizing, sidebarWidth, onSidebarWidthChange])

  useEffect(() => {
    const handleMouseUp = () => {
      setIsResizing(false)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      isUpdatingRef.current = false
      document.body.classList.remove("resizing")
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleResize, { passive: false })
      document.addEventListener("mouseup", handleMouseUp)
      document.body.classList.add("resizing")
    }

    return () => {
      document.removeEventListener("mousemove", handleResize)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.classList.remove("resizing")
    }
  }, [isResizing, handleResize])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return
    const target = e.target
    if (target instanceof HTMLElement) {
      const tag = target.tagName
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) return
    }
    const step = e.shiftKey ? 20 : 5
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault()
        onSidebarWidthChange(Math.max(251, sidebarWidth - step))
        break
      case "ArrowRight":
        e.preventDefault()
        onSidebarWidthChange(Math.min(600, sidebarWidth + step))
        break
    }
  }, [sidebarWidth, onSidebarWidthChange])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      {/* Mobile backdrop — tap to close the sidebar overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 z-[105] bg-black/40 max-md:block md:hidden"
          onClick={() => setSidebarCollapsed(true)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`border-r border-border/50 bg-background/80 backdrop-blur-xl max-md:!fixed max-md:!inset-y-0 max-md:!left-0 max-md:!top-0 max-md:!h-full max-md:!z-[110] max-md:shadow-2xl
          ${styles.sidebar} ${isResizing ? styles.isResizing : ""}`}
        style={{
          width: sidebarCollapsed ? 0 : `min(${sidebarWidth}px, 85vw)`,
          overflow: sidebarCollapsed ? "hidden" : undefined,
        }}
      >
        <div className={`${sidebarCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity duration-200`}>
          {children}
        </div>
      </div>

      {/* Floating toggle button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute top-1/2 -translate-y-1/2 z-[111]
          w-6 h-12 bg-background border border-black/20 dark:border-white/20 rounded-r-lg
          flex items-center justify-center
          hover:bg-accent hover:border-primary/30
          transition-all duration-300
          shadow-sm"
        style={{ left: sidebarCollapsed ? 0 : `min(${sidebarWidth}px, 85vw)` }}
        aria-label={sidebarCollapsed ? "Open sidebar" : "Close sidebar"}
      >
        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? "" : "rotate-180"}`} />
      </button>

      {/* Resize handle */}
      {!sidebarCollapsed && (
        <div
          className={`${styles.resizeHandle} ${isResizing ? styles.isResizing : ""} hidden md:block`}
          style={{ left: `min(${sidebarWidth}px, 85vw)` }}
          onMouseDown={() => setIsResizing(true)}
          title="Drag to resize"
          role="separator"
          aria-orientation="vertical"
        >
          <span className="sr-only">Resize sidebar</span>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
            Drag to resize
          </div>
        </div>
      )}
    </>
  )
}
