import { FlowchartViewer } from "@/components/flowchart-viewer"

export default function FlowchartPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Complete JS Course Roadmap — Flowchart</h1>
      <FlowchartViewer />
    </div>
  )
}
