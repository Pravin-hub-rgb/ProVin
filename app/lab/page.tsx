"use client"

import { useCallback, useRef } from "react"
import Link from "next/link"
import { labSubjects } from "@/lib/lab-data"
import { getLabModule } from "@/lib/lab-registry"
import { FlaskConical, GitBranch, BrainCircuit, Code2, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"

// Trigger module registration for dynamic scenario counts
import "@/lib/git-lab"
import "@/lib/ai-lab"
import "@/lib/js-lab"


const FLOATING_SYMBOLS = ["</>", "{}", "//", "~", "$", "#", "&&", "=>"]
const FLOOD_SYMBOLS = ["</>", "{}", "//", "~", "$", "#", "&&", "=>", "()", "[]", "**", "!!", "%%", "??", "::", "++"]

export default function LabDashboard() {
  const floodContainerRef = useRef<HTMLDivElement>(null)

  const triggerFlood = useCallback(() => {
    const container = floodContainerRef.current
    if (!container) return

    for (let i = 0; i < 24; i++) {
      const sym = FLOOD_SYMBOLS[i % FLOOD_SYMBOLS.length]
      const el = document.createElement("span")
      el.className = "absolute text-[#58a6ff] font-mono font-bold drop-shadow-[0_0_12px_rgba(88,166,255,0.6)] animate-flood"
      el.style.left = `${5 + Math.random() * 90}%`
      el.style.bottom = `${-20 - Math.random() * 40}%`
      el.style.fontSize = `${1.6 + Math.random() * 2.4}rem`
      el.style.animationDelay = `${Math.random() * 0.8}s`
      el.style.setProperty("--drift", `${(Math.random() - 0.5) * 200}px`)
      el.textContent = sym
      el.addEventListener("animationend", () => el.remove())
      container.appendChild(el)
    }
  }, [])
  const icons: Record<string, React.ReactNode> = {
    github: <GitBranch className="w-6 h-6" />,
    agenticai: <BrainCircuit className="w-6 h-6" />,
    javascript: <Code2 className="w-6 h-6" />,

  }

  return (
    <div className="min-h-screen bg-[#010409] text-[#e6edf3] relative overflow-hidden">
      {/* Floating code symbols — fixed so always covers viewport */}
      <div ref={floodContainerRef} className="fixed inset-0 pointer-events-none select-none" aria-hidden="true">
        {FLOATING_SYMBOLS.map((sym, i) => (
          <span
            key={i}
            className="absolute text-[#58a6ff] font-mono font-bold opacity-[0.6] drop-shadow-[0_0_10px_rgba(88,166,255,0.5)] animate-float"
            style={{
              left: `${5 + (i * 13) % 90}%`,
              bottom: `${-10 - (i * 8) % 20}%`,
              animationDelay: `${i * 2.5}s`,
              animationDuration: `${18 + (i % 6) * 4}s`,
              fontSize: `${2.2 + (i % 3) * 0.8}rem`,
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      {/* Flood button */}
      <button
        onClick={triggerFlood}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#58a6ff] to-[#1f6feb] flex items-center justify-center shadow-lg shadow-[#58a6ff]/30 hover:shadow-[#58a6ff]/50 hover:scale-110 transition-all duration-200 group"
        title="Flood the lab"
      >
        <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
      </button>

      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <button
            onClick={() => window.history.back()}
            className="w-10 h-10 rounded-xl bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-[#e6edf3] hover:border-[#58a6ff]/50 transition-all shrink-0"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#58a6ff] to-[#1f6feb] flex items-center justify-center shadow-lg shadow-[#58a6ff]/30 animate-bubble-glow">
              <FlaskConical className="w-6 h-6 text-white animate-bob" />
            </div>
            {/* Smoke/bubble particles */}
            <span className="absolute -top-2 -right-1 w-2.5 h-2.5 rounded-full bg-[#58a6ff]/40 animate-smoke" />
            <span className="absolute -top-3 left-2 w-2 h-2 rounded-full bg-[#58a6ff]/30 animate-smoke" style={{ animationDelay: "0.6s" }} />
            <span className="absolute -top-1.5 right-3 w-1.5 h-1.5 rounded-full bg-[#58a6ff]/20 animate-smoke" style={{ animationDelay: "1.2s" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Lab</h1>
            <p className="text-[#8b949e] text-sm mt-0.5">
              There's always something cooking
            </p>
          </div>
        </div>

        {/* Subject cards */}
        <div className="grid gap-4 md:grid-cols-2 relative z-10">
          {labSubjects.map((subject) => {
            const mod = getLabModule(subject.id)
            const count = mod?.scenarios.length ?? subject.scenarioCount
            return (
              <Link
                key={subject.id}
                href={`/lab/${subject.id}`}
                className="group block bg-[#0d1117]/40 border border-white/[0.08] rounded-xl p-5 hover:border-[#58a6ff]/50 transition-all duration-200 hover:shadow-lg hover:shadow-[#58a6ff]/10 relative overflow-hidden"
              >
                {/* Glass shine reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent via-transparent pointer-events-none" />
                <div className="flex items-start gap-4 relative">
                  <div className="w-12 h-12 rounded-xl bg-[#0d1117]/40 border border-white/[0.08] flex items-center justify-center text-[#58a6ff] shrink-0 group-hover:border-[#58a6ff]/30 transition-colors">
                    {icons[subject.id] ?? <GitBranch className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-base group-hover:text-[#58a6ff] transition-colors">
                      {subject.title}
                    </h2>
                    <p className="text-[#8b949e] text-sm mt-1 leading-relaxed">
                      {subject.description}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-[#3fb950] text-xs bg-[#3fb950]/10 px-2 py-0.5 rounded-full">
                        {count} scenario{count !== 1 ? "s" : ""}
                      </span>
                      <span className="text-[#58a6ff] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Open Lab <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {labSubjects.length === 0 && (
          <div className="text-center py-16">
            <FlaskConical className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
            <p className="text-[#8b949e] text-sm">No labs available yet. Coming soon.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
          50% { opacity: 1; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes flood {
          0% { opacity: 0; transform: translateY(0) translateX(0) rotate(0deg) scale(0.3); }
          8% { opacity: 1; transform: translateY(-8vh) translateX(0) rotate(15deg) scale(1); }
          100% { opacity: 0; transform: translateY(-170vh) translateX(var(--drift, 0px)) rotate(400deg) scale(0.7); }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-3px) rotate(2deg); }
        }
        @keyframes bubble-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(88,166,255,0.2); }
          50% { box-shadow: 0 0 30px rgba(88,166,255,0.35); }
        }
        @keyframes smoke {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          100% { transform: translateY(-20px) scale(2); opacity: 0; }
        }
        .animate-float { animation: float linear infinite; }
        .animate-flood { animation: flood 4.5s ease-out forwards; }
        .animate-bob { animation: bob 2s ease-in-out infinite; }
        .animate-bubble-glow { animation: bubble-glow 2s ease-in-out infinite; }
        .animate-smoke { animation: smoke 1.5s ease-out infinite; }
      `}</style>
    </div>
  )
}
