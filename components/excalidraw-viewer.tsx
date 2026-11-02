"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import dynamic from "next/dynamic"
import "@excalidraw/excalidraw/index.css"

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full">Loading diagram...</div> }
)

export function ExcalidrawViewer({ file }: { file: string }) {
  const [initialData, setInitialData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const saveTimeout = useRef<any>(null)

  useEffect(() => {
    fetch(`/api/notes?file=${encodeURIComponent(file)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load file")
        return res.json()
      })
      .then((data) => setInitialData(data))
      .catch((err) => setError(err.message))
  }, [file])

  const saveData = async (elements: any, appState: any, files: any) => {
    setSaving(true)
    try {
      const data = {
        type: "excalidraw",
        version: 2,
        source: "https://excalidraw.com",
        elements,
        appState: {
          ...appState,
          collaborators: undefined,
        },
        files,
      }
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file, content: JSON.stringify(data, null, 2) }),
      })
      if (!res.ok) throw new Error("Failed to save")
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error("Save failed:", err)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = useCallback((elements: any, appState: any, files: any) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(() => {
      saveData(elements, appState, files)
    }, 2000)
  }, [file])

  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500">Error: {error}</div>
  }

  if (!initialData) {
    return <div className="flex items-center justify-center h-96">Loading diagram...</div>
  }

  return (
    <div style={{ height: "85vh", width: "100%" }}>
      <Excalidraw
        initialData={initialData}
        viewModeEnabled={false}
        onChange={handleChange}
      />
      {(saving || saved) && (
        <div className="absolute top-2 right-2 bg-background/80 px-3 py-1 rounded text-sm z-50">
          {saving ? "Saving..." : "Saved ✓"}
        </div>
      )}
    </div>
  )
}
