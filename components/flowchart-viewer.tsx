"use client"

import { useState, useEffect } from "react"

export function FlowchartViewer() {
  const [code, setCode] = useState("")
  const [svg, setSvg] = useState("")
  const [error, setError] = useState("")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/notes?file=" + encodeURIComponent("docs/coding/JS/js-course-flowchart.md"))
      .then((r) => r.text())
      .then((text) => {
        const match = text.match(/```mermaid\n([\s\S]*?)```/)
        if (match) setCode(match[1].trim())
        else setCode("flowchart LR\n    A[No diagram found]")
      })
      .catch(() => setCode("flowchart LR\n    A[Error loading diagram]"))
  }, [])

  useEffect(() => {
    if (!code) return
    import("mermaid").then((m) => {
      m.default.initialize({ startOnLoad: false, theme: "default" })
      const id = "mermaid-flowchart-" + Math.random().toString(36).substr(2, 9)
      m.default
        .render(id, code)
        .then(({ svg: rendered }) => {
          setSvg(rendered)
          setError("")
          setLoaded(true)
        })
        .catch((err: any) => {
          setError(err.message)
          setLoaded(true)
        })
    })
  }, [code])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Mermaid Code (editable)</h2>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-[600px] font-mono text-sm p-4 border rounded-lg bg-muted/50"
          spellCheck={false}
        />
        <div className="mt-2 flex gap-2">
          <a
            href={"https://mermaid.live/edit#base64:" + btoa(code)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
          >
            Open in Mermaid Live Editor
          </a>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-900 min-h-[600px] flex items-center justify-center overflow-auto">
          {!loaded ? (
            <p className="text-muted-foreground">Loading diagram...</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          )}
        </div>
      </div>
    </div>
  )
}
