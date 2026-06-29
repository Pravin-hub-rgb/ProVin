"use client"

import Link from "next/link"
import { labSubjects } from "@/lib/lab-data"
import { FlaskConical, GitBranch, ArrowRight } from "lucide-react"

export default function LabDashboard() {
  const icons: Record<string, React.ReactNode> = {
    github: <GitBranch className="w-6 h-6" />,
  }

  return (
    <div className="min-h-screen bg-[#010409] text-[#e6edf3]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#58a6ff] to-[#1f6feb] flex items-center justify-center shadow-lg shadow-[#58a6ff]/20">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Lab</h1>
            <p className="text-[#8b949e] text-sm mt-0.5">
              Interactive practice simulators for each course
            </p>
          </div>
        </div>

        {/* Subject cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {labSubjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/lab/${subject.id}`}
              className="group block bg-[#161b22] border border-[#30363d] rounded-xl p-5 hover:border-[#58a6ff]/50 transition-all duration-200 hover:shadow-lg hover:shadow-[#58a6ff]/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#58a6ff] shrink-0 group-hover:border-[#58a6ff]/30 transition-colors">
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
                    <span className="text-[#3fb950] text-xs bg-[#3fb95022] px-2 py-0.5 rounded-full">
                      {subject.scenarioCount} scenario{subject.scenarioCount !== 1 ? "s" : ""}
                    </span>
                    <span className="text-[#58a6ff] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Open Lab <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {labSubjects.length === 0 && (
          <div className="text-center py-16">
            <FlaskConical className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
            <p className="text-[#8b949e] text-sm">No labs available yet. Coming soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
