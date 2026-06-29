"use client"

import { useState } from "react"
import type { GitLabState, ParsedCommand } from "@/lib/git-lab"

interface GitHubModalProps {
  action: "create-pr" | "review-pr" | "merge-pr" | "resolve-conflict"
  state: GitLabState
  actor: "A" | "B"
  color: string
  isFirstReview?: boolean
  onSubmit: (who: "A" | "B", cmd: string) => void
}

export function GitHubModal({ action, state, actor, color, isFirstReview, onSubmit }: GitHubModalProps) {
  const pr = state.prs[state.prs.length - 1]

  if (action === "create-pr") {
    return <CreatePRForm state={state} actor={actor} color={color} onSubmit={onSubmit} />
  }

  if (action === "review-pr") {
    return <ReviewPRForm pr={pr} actor={actor} color={color} isFirstReview={isFirstReview} onSubmit={onSubmit} />
  }

  if (action === "merge-pr") {
    return <MergePRForm pr={pr} actor={actor} color={color} onSubmit={onSubmit} />
  }

  if (action === "resolve-conflict") {
    return <ResolveConflictForm state={state} actor={actor} color={color} onSubmit={onSubmit} />
  }

  return null
}

// ─── Create PR ──────────────────────────────────────────────

function CreatePRForm({ state, actor, color, onSubmit }: Omit<GitHubModalProps, "action" | "isFirstReview">) {
  const commitMsg = getLastCommitMessage(state)
  const [title, setTitle] = useState(commitMsg ? `Add ${commitMsg}` : "Add footer with social links and copyright")
  const [desc, setDesc] = useState(
    "Adds a site footer with:\n- Social media links (Twitter, GitHub, LinkedIn)\n- Copyright notice with current year\n- Responsive layout (stacks on mobile)",
  )

  function handleCreate() {
    const safeTitle = title.replace(/"/g, "'")
    const safeDesc = desc.replace(/"/g, "'")
    onSubmit(actor, `gh pr create --title "${safeTitle}" --desc "${safeDesc}"`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#238636] flex items-center justify-center text-white text-sm font-bold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#e6edf3]">New Pull Request</h2>
          <p className="text-[11px] text-[#8b949e]">Open a PR from <span style={{ color }}>{state.localB.currentBranch}</span> into <span className="text-[#58a6ff]">main</span></p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] text-[#8b949e] font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] outline-none focus:border-[#58a6ff] transition-colors"
          placeholder="PR title"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] text-[#8b949e] font-medium">Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] outline-none focus:border-[#58a6ff] transition-colors resize-none"
          placeholder="Describe your changes"
        />
      </div>

      <div className="flex items-center gap-3 mt-1">
        <div className="flex-1 border-t border-[#21262d]" />
        <span className="text-[10px] text-[#484f58]">Create Pull Request on GitHub</span>
        <div className="flex-1 border-t border-[#21262d]" />
      </div>

      <button
        onClick={handleCreate}
        className="w-full py-2 rounded-md text-xs font-semibold text-white transition-all hover:brightness-110"
        style={{ background: "#238636" }}
      >
        Create Pull Request
      </button>
    </div>
  )
}

// ─── Review PR ──────────────────────────────────────────────

function ReviewPRForm({ pr, actor, color, isFirstReview, onSubmit }: {
  pr: GitHubModalProps["state"]["prs"][number] | undefined
  actor: "A" | "B"
  color: string
  isFirstReview?: boolean
  onSubmit: (who: "A" | "B", cmd: string) => void
}) {
  const [comment, setComment] = useState("")

  if (!pr) return <p className="text-xs text-[#f85149]">No pull request found.</p>

  const hasExistingReview = pr.reviews.length > 0

  function handleReview(action: "approve" | "request-changes") {
    const safeComment = comment.replace(/"/g, "'")
    const cmd = safeComment
      ? `gh pr review --${action} --body "${safeComment}"`
      : `gh pr review --${action}`
    onSubmit(actor, cmd)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#1f6feb] flex items-center justify-center text-white text-sm font-bold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#e6edf3]">
            Review PR #{pr.id}: {pr.title}
          </h2>
          <p className="text-[11px] text-[#8b949e]">
            {pr.compareBranch} → {pr.baseBranch}
          </p>
        </div>
      </div>

      {/* PR info */}
      <div className="bg-[#0d1117] border border-[#21262d] rounded-md p-3 text-xs space-y-2">
        <div className="flex items-center gap-2 text-[#8b949e]">
          <span className="font-medium text-[#e6edf3]">{pr.author === "dev-a" ? "Senior Dev" : "Junior Dev"}</span>
          <span>opened this PR</span>
        </div>
        <p className="text-[#c9d1d9] leading-relaxed whitespace-pre-wrap">{pr.description}</p>
        <div className="flex items-center gap-3 pt-1 text-[11px] text-[#484f58] border-t border-[#21262d]">
          <span>Status: <span className={pr.status === "approved" ? "text-[#3fb950]" : pr.status === "changes-requested" ? "text-[#f0883e]" : "text-[#c9d1d9]"}>{pr.status}</span></span>
          <span>Reviews: {pr.reviews.length}</span>
        </div>
        {pr.reviews.length > 0 && (
          <div className="border-t border-[#21262d] pt-2 space-y-2">
            {pr.reviews.map((r, i) => (
              <div key={i} className="text-[11px] flex items-start gap-2">
                <span className={r.type === "approve" ? "text-[#3fb950]" : "text-[#f0883e]"}>
                  {r.type === "approve" ? "✓" : "✗"}
                </span>
                <span className="text-[#8b949e]">
                  <span className="text-[#e6edf3]">{r.author === "dev-a" ? "Senior Dev" : "Junior Dev"}</span>
                  {" "}{r.type === "approve" ? "approved" : "requested changes"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comment */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] text-[#8b949e] font-medium">Leave a comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-[#e6edf3] outline-none focus:border-[#58a6ff] transition-colors resize-none"
          placeholder={isFirstReview ? "Add your review comments here..." : "Looks good, merging!"}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        {isFirstReview ? (
          <>
            <button
              onClick={() => handleReview("request-changes")}
              className="flex-1 py-2 rounded-md text-xs font-semibold transition-all hover:brightness-110"
              style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
            >
              Request Changes
            </button>
            <button
              onClick={() => handleReview("approve")}
              className="flex-1 py-2 rounded-md text-xs font-semibold text-white transition-all hover:brightness-110"
              style={{ background: "#238636" }}
            >
              Approve
            </button>
          </>
        ) : (
          <button
            onClick={() => handleReview("approve")}
            className="w-full py-2 rounded-md text-xs font-semibold text-white transition-all hover:brightness-110"
            style={{ background: "#238636" }}
          >
            Approve
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Merge PR ───────────────────────────────────────────────

function MergePRForm({ pr, actor, color, onSubmit }: {
  pr: GitHubModalProps["state"]["prs"][number] | undefined
  actor: "A" | "B"
  color: string
  onSubmit: (who: "A" | "B", cmd: string) => void
}) {
  const [confirming, setConfirming] = useState(false)

  if (!pr) return <p className="text-xs text-[#f85149]">No pull request found.</p>

  function handleMerge() {
    if (!confirming) { setConfirming(true); return }
    onSubmit(actor, "gh pr merge")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#8957e5] flex items-center justify-center text-white text-sm font-bold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#e6edf3]">Merge Pull Request #{pr.id}</h2>
          <p className="text-[11px] text-[#8b949e]">{pr.title}</p>
        </div>
      </div>

      <div className="bg-[#0d1117] border border-[#21262d] rounded-md p-3 text-xs space-y-2">
        <div className="flex items-center gap-2 text-[#8b949e]">
          <span className="text-[#3fb950]">✓</span>
          <span>This branch has no conflicts with the base branch</span>
        </div>
        <div className="flex items-center gap-2 text-[#8b949e]">
          <span className="text-[#3fb950]">✓</span>
          <span>Approved by Senior Dev</span>
        </div>
      </div>

      {!confirming ? (
        <button
          onClick={handleMerge}
          className="w-full py-2 rounded-md text-xs font-semibold transition-all hover:brightness-110"
          style={{ background: "#8957e5", color: "#fff" }}
        >
          Merge Pull Request
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setConfirming(false)}
            className="flex-1 py-2 rounded-md text-xs font-semibold transition-all hover:brightness-110"
            style={{ background: "#21262d", color: "#c9d1d9", border: "1px solid #30363d" }}
          >
            Cancel
          </button>
          <button
            onClick={handleMerge}
            className="flex-1 py-2 rounded-md text-xs font-semibold text-white transition-all hover:brightness-110"
            style={{ background: "#8957e5" }}
          >
            Confirm Merge
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Resolve Conflict ───────────────────────────────────────

function ResolveConflictForm({ state, actor, color, onSubmit }: {
  state: GitLabState
  actor: "A" | "B"
  color: string
  onSubmit: (who: "A" | "B", cmd: string) => void
}) {
  const conflictedFile = state.localA.workingDirChanges[0] ?? "file.txt"
  const [resolution, setResolution] = useState<"mine" | "theirs" | null>(null)

  function handleResolve() {
    onSubmit(actor, `git add ${conflictedFile}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#d29922] flex items-center justify-center text-white text-sm font-bold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#e6edf3]">Resolve Conflict</h2>
          <p className="text-[11px] text-[#8b949e]">
            Merge conflict in <span className="text-[#e6edf3]">{conflictedFile}</span>
          </p>
        </div>
      </div>

      <div className="bg-[#0d1117] border border-[#21262d] rounded-md p-3 text-xs font-mono leading-relaxed whitespace-pre overflow-x-auto">
        <span className="text-[#f85149]">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (main)</span>
        {"\n"}README content from main branch
        {"\n"}<span className="text-[#3fb950]">=======</span>
        {"\n"}README content from feature branch
        {"\n"}<span className="text-[#f85149]">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/update-readme</span>
      </div>

      {!resolution ? (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] text-[#8b949e]">
            In the GitHub web editor, you can edit the file directly to resolve the conflict.
            Choose which version to keep, or edit manually.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setResolution("mine")}
              className="flex-1 py-2 rounded-md text-xs font-semibold transition-all hover:brightness-110"
              style={{ background: "#1f6feb22", color: "#58a6ff", border: "1px solid #1f6feb44" }}
            >
              Keep mine (main)
            </button>
            <button
              onClick={() => setResolution("theirs")}
              className="flex-1 py-2 rounded-md text-xs font-semibold transition-all hover:brightness-110"
              style={{ background: "#8957e522", color: "#a371f7", border: "1px solid #8957e544" }}
            >
              Keep theirs (feature)
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="bg-[#0d1117] border border-[#21262d] rounded-md p-3 text-xs text-[#c9d1d9] font-mono">
            {resolution === "mine"
              ? "README content from main branch"
              : "README content from feature branch"}
          </div>
          <p className="text-[11px] text-[#3fb950]">
            ✓ Conflict resolved — {resolution === "mine" ? "kept main's version" : "kept feature branch's version"}
          </p>
          <button
            onClick={handleResolve}
            className="w-full py-2 rounded-md text-xs font-semibold text-white transition-all hover:brightness-110"
            style={{ background: "#238636" }}
          >
            Mark as Resolved
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Helpers ────────────────────────────────────────────────

function getLastCommitMessage(state: GitLabState): string {
  const all = Object.values(state.localB.allCommits)
  if (all.length === 0) return ""
  const last = all.reduce((a, b) => (a.timestamp > b.timestamp ? a : b))
  return last.message.replace(/^Add /i, "").replace(/^"|"$/g, "")
}
