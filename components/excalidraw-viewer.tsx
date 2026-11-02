"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import "@excalidraw/excalidraw/index.css"

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full">Loading diagram...</div> }
)

export function ExcalidrawViewer({ file }: { file: string }) {
  const [initialData, setInitialData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/notes?file=${encodeURIComponent(file)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load file")
        return res.json()
      })
      .then((data) => setInitialData(data))
      .catch((err) => setError(err.message))
  }, [file])

  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500">Error: {error}</div>
  }

  if (!initialData) {
    return <div className="flex items-center justify-center h-96">Loading diagram...</div>
  }

  return (
    <div style={{ height: "500px", width: "100%", position: "relative", overflow: "hidden" }}>
      <Excalidraw initialData={initialData} viewModeEnabled={false} />
    </div>
  )
}
