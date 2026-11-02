"use client"

import { ExcalidrawViewer } from "@/components/excalidraw-viewer"

export default function ExcalidrawPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">ProVin — Excalidraw Diagram</h1>
        <ExcalidrawViewer file="docs/excalidraw/provin.excalidraw" />
      </div>
    </div>
  )
}
