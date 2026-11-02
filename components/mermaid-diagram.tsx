"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"

mermaid.initialize({ startOnLoad: false, theme: "default" })

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      mermaid.render("mermaid-" + Math.random().toString(36).substr(2, 9), chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg
        }
      }).catch((err) => {
        if (ref.current) {
          ref.current.innerHTML = `<pre class="text-red-500">Mermaid error: ${err.message}</pre>`
        }
      })
    }
  }, [chart])

  return <div ref={ref} className="mermaid-diagram my-4 flex justify-center" />
}
