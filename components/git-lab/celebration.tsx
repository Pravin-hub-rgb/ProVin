"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  angle: number
  speed: number
  rotation: number
  rotationSpeed: number
}

const COLORS = ["#3fb950", "#58a6ff", "#bc8cff", "#f0883e", "#db6d28", "#d29922"]

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 20,
    y: 50,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 4 + Math.random() * 6,
    angle: -Math.PI / 2 + (Math.random() - 0.5) * Math.PI,
    speed: 2 + Math.random() * 4,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
  }))
}

export default function Celebration() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [show, setShow] = useState(true)

  useEffect(() => {
    setParticles(generateParticles(40))

    const timer = setTimeout(() => {
      setShow(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (particles.length === 0) return

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + Math.cos(p.angle) * p.speed * 0.3,
            y: p.y + Math.sin(p.angle) * p.speed * 0.3 + 0.3,
            speed: p.speed * 0.97,
            rotation: p.rotation + p.rotationSpeed,
            rotationSpeed: p.rotationSpeed * 0.98,
          }))
          .filter((p) => p.y < 110)
      )
    }, 30)

    return () => clearInterval(interval)
  }, [particles.length])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      {/* Checkmark */}
      <div
        style={{
          animation: "celebrationPop 0.5s ease-out forwards",
          transform: "scale(0)",
        }}
        className="relative"
      >
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: 80,
            height: 80,
            background: "rgba(63,185,80,0.15)",
            border: "2px solid rgba(63,185,80,0.4)",
          }}
        >
          <svg className="w-10 h-10 text-[#3fb950]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Particles */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.map((p) => (
          <rect
            key={p.id}
            x={0}
            y={0}
            width={p.size}
            height={p.size}
            rx={1}
            fill={p.color}
            style={{
              transform: `translate(${p.x}%, ${p.y}%) rotate(${p.rotation}deg)`,
              opacity: Math.max(0, p.speed / 6),
              transition: "none",
            }}
          />
        ))}
      </svg>

      <style>{`
        @keyframes celebrationPop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
