"use client"

import { useRef } from "react"

interface CodeEditorProps {
  value: string
  onChange: (code: string) => void
  onRun: () => void
}

export function CodeEditor({ value, onChange, onRun }: CodeEditorProps) {
  const undoStackRef = useRef<string[]>([])
  const redoStackRef = useRef<string[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function indentLines(text: string, start: number, end: number): { result: string; newStart: number; newEnd: number } {
    const before = text.substring(0, start)
    const selected = text.substring(start, end)
    const after = text.substring(end)

    const lines = selected.split("\n")
    const indented = lines.map((l) => "    " + l).join("\n")
    const result = before + indented + after
    const newStart = start + 4
    const newEnd = start + indented.length
    return { result, newStart, newEnd }
  }

  function unindentLines(text: string, start: number, end: number): { result: string; newStart: number; newEnd: number } | null {
    const before = text.substring(0, start)
    const selected = text.substring(start, end)
    const after = text.substring(end)

    const lines = selected.split("\n")
    const unindented: string[] = []
    let removedCount = 0

    for (const line of lines) {
      if (line.startsWith("    ")) {
        unindented.push(line.substring(4))
        removedCount++
      } else if (line.startsWith("\t")) {
        unindented.push(line.substring(1))
        removedCount++
      } else {
        unindented.push(line)
      }
    }

    if (removedCount === 0) return null

    const result = before + unindented.join("\n") + after
    const charsRemoved = selected.length - unindented.join("\n").length
    return { result, newStart: start, newEnd: end - charsRemoved }
  }

  return (
    <div
      className="flex flex-col overflow-hidden rounded-lg border h-full relative"
      style={{ background: "#0d1117", borderColor: "#30363d" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 border-b"
        style={{ background: "#161b22", borderColor: "#21262d" }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#d29922]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
        <span className="text-[#8b949e] text-[11px] ml-2 font-mono">lab.js</span>
      </div>

      {/* Editor */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          const newVal = e.target.value
          if (newVal !== value) {
            undoStackRef.current.push(value)
            if (undoStackRef.current.length > 200) undoStackRef.current.shift()
            redoStackRef.current = []
          }
          onChange(newVal)
        }}
        onKeyDown={(e) => {
          const el = e.currentTarget
          const start = el.selectionStart
          const end = el.selectionEnd

          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault()
            onRun()
          } else if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
            e.preventDefault()
            if (undoStackRef.current.length > 0) {
              const prev = undoStackRef.current.pop()!
              redoStackRef.current.push(value)
              onChange(prev)
            }
          } else if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
            e.preventDefault()
            if (redoStackRef.current.length > 0) {
              const next = redoStackRef.current.pop()!
              undoStackRef.current.push(value)
              onChange(next)
            }
          } else if (e.key === "Tab") {
            e.preventDefault()
            if (start !== end) {
              if (e.shiftKey) {
                const r = unindentLines(value, start, end)
                if (r) {
                  onChange(r.result)
                  requestAnimationFrame(() => {
                    el.selectionStart = r.newStart
                    el.selectionEnd = r.newEnd
                  })
                }
              } else {
                const r = indentLines(value, start, end)
                onChange(r.result)
                requestAnimationFrame(() => {
                  el.selectionStart = r.newStart
                  el.selectionEnd = r.newEnd
                })
              }
            } else if (e.shiftKey) {
              // Unindent current line
              const lineStart = value.lastIndexOf("\n", start - 1) + 1
              if (value.substring(lineStart).startsWith("    ")) {
                const newVal = value.substring(0, lineStart) + value.substring(lineStart + 4)
                onChange(newVal)
                requestAnimationFrame(() => {
                  el.selectionStart = el.selectionEnd = start - 4
                })
              }
            } else {
              const newVal = value.substring(0, start) + "    " + value.substring(end)
              onChange(newVal)
              requestAnimationFrame(() => {
                el.selectionStart = el.selectionEnd = start + 4
              })
            }
          }
        }}
        className="flex-1 bg-transparent text-xs leading-relaxed p-3 outline-none resize-none"
        style={{
          color: "#e6edf3",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          caretColor: "#58a6ff",
        }}
        placeholder="// Write your JavaScript here..."
        spellCheck={false}
      />

      {/* Floating run button */}
      <button
        onClick={onRun}
        className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:brightness-110 hover:scale-105 active:scale-95 shadow-lg z-10"
        style={{
          background: "#238636",
          borderColor: "#2ea043",
        }}
        title="Run (Ctrl+Enter)"
      >
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  )
}
