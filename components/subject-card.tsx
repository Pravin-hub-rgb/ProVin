"use client"

import { useEffect, useRef, useState } from "react"

interface SubjectCardProps {
  title: string
  description: string
  completed: number
  total: number
  percent: number
  onClick: () => void
}

function buildBorderPath(w: number, h: number, r: number, inset: number) {
  const x0 = inset, y0 = inset
  const x1 = w - inset, y1 = h - inset
  const rr = Math.max(0, Math.min(r, (x1 - x0) / 2, (y1 - y0) / 2))

  return [
    `M ${x0 + rr} ${y1}`,
    `L ${x1 - rr} ${y1}`,
    `A ${rr} ${rr} 0 0 0 ${x1} ${y1 - rr}`,
    `L ${x1} ${y0 + rr}`,
    `A ${rr} ${rr} 0 0 0 ${x1 - rr} ${y0}`,
    `L ${x0 + rr} ${y0}`,
    `A ${rr} ${rr} 0 0 0 ${x0} ${y0 + rr}`,
    `L ${x0} ${y1 - rr}`,
    `A ${rr} ${rr} 0 0 0 ${x0 + rr} ${y1}`,
    "Z",
  ].join(" ")
}

export default function SubjectCard({
  title,
  description,
  completed,
  total,
  percent,
  onClick,
}: SubjectCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const box = entry.contentRect
      setSize({ w: box.width, h: box.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const STROKE = 3
  const RADIUS = 10
  const clamped = Math.max(0, Math.min(100, percent))
  const path =
    size.w > 0 && size.h > 0
      ? buildBorderPath(size.w, size.h, RADIUS, STROKE / 2)
      : ""

  return (
    <div
      ref={wrapRef}
      className="relative rounded-lg transition-all duration-300 hover:scale-[1.02]"
    >
      <button
        onClick={onClick}
        className="w-full rounded-lg group text-left bg-background border border-border/20 p-5 hover:bg-accent/30 transition-all duration-200"
      >
        <h3 className="text-base font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-2">
          <span className="text-xs text-muted-foreground/70 tabular-nums">
            {completed}/{total}
          </span>
        </div>
      </button>

      {path && (
        <svg
          className="absolute inset-0 pointer-events-none overflow-visible"
          width={size.w}
          height={size.h}
        >
          <path
            d={path}
            fill="none"
            stroke="var(--border)"
            strokeOpacity={0.4}
            strokeWidth={STROKE}
          />
          <path
            d={path}
            pathLength={100}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={100}
            strokeDashoffset={100 - clamped}
            style={{ transition: "stroke-dashoffset 500ms ease" }}
          />
        </svg>
      )}
    </div>
  )
}
