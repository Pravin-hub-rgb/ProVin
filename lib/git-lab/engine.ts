import type { GitLabState, LocalRepo, Commit, CommandResult, ParsedCommand } from "./types"

let hashCounter = 0
function makeHash(): string {
  hashCounter++
  return hashCounter.toString(16).padStart(7, "0").slice(-7)
}

function makeCommit(message: string, author: "dev-a" | "dev-b", parents: string[]): Commit {
  return {
    hash: makeHash(),
    message,
    author,
    timestamp: Date.now(),
    parents,
  }
}

function cloneLocal(l: LocalRepo): LocalRepo {
  return {
    currentBranch: l.currentBranch,
    branches: JSON.parse(JSON.stringify(l.branches)),
    allCommits: JSON.parse(JSON.stringify(l.allCommits)),
    staged: [...l.staged],
    workingDirChanges: [...l.workingDirChanges],
    existingFiles: [...l.existingFiles],
    ignoredPatterns: [...l.ignoredPatterns],
  }
}

function cloneOrigin(o: GitLabState["origin"]): GitLabState["origin"] {
  return JSON.parse(JSON.stringify(o))
}

function isIgnored(file: string, patterns: string[]): boolean {
  return patterns.some((p) => {
    if (p.startsWith("*.")) return file.endsWith(p.slice(1))
    if (p.startsWith("*")) return file.endsWith(p.slice(1))
    return file === p
  })
}

function visibleChanges(changes: string[], patterns: string[]): string[] {
  return changes.filter((f) => !isIgnored(f, patterns))
}

function currentBranchCommits(local: LocalRepo): Commit[] {
  const hashes = local.branches[local.currentBranch] ?? []
  return hashes.map((h) => local.allCommits[h]).filter(Boolean)
}

export function executeCommand(
  state: GitLabState,
  who: "A" | "B",
  parsed: ParsedCommand
): { newState: GitLabState; result: CommandResult } {
  const local = who === "A" ? state.localA : state.localB
  const author = who === "A" ? ("dev-a" as const) : ("dev-b" as const)
  const localKey = who === "A" ? "localA" : "localB"
  const newState = { ...state, [localKey]: cloneLocal(local) }
  const newLocal = newState[localKey]

  switch (parsed.type) {
    case "add-all": {
      const changes = newLocal.workingDirChanges.filter((f) => !newLocal.staged.includes(f))
      if (changes.length === 0) {
        return { newState, result: { lines: ["nothing to add, working tree clean"] } }
      }
      newLocal.staged = [...newLocal.staged, ...changes]
      if (newState.mergeInProgress) {
        delete newState.mergeInProgress
        return {
          newState,
          result: {
            lines: [
              ...changes.map((f) => `  resolved: ${f}`),
              "All conflicts fixed. Use git commit to complete the merge.",
            ],
          },
        }
      }
      return { newState, result: { lines: changes.map((f) => `  new file: ${f}`) } }
    }

    case "add": {
      const added: string[] = []
      for (const f of parsed.files) {
        if (newLocal.workingDirChanges.includes(f) && !newLocal.staged.includes(f)) {
          newLocal.staged.push(f)
          added.push(f)
        }
      }
      if (added.length === 0) {
        return { newState, result: { lines: ["nothing to add, working tree clean"] } }
      }
      if (newState.mergeInProgress) {
        delete newState.mergeInProgress
        return {
          newState,
          result: {
            lines: [
              ...added.map((f) => `  resolved: ${f}`),
              "All conflicts fixed. Use git commit to complete the merge.",
            ],
          },
        }
      }
      return { newState, result: { lines: added.map((f) => `  new file: ${f}`) } }
    }

    case "commit": {
      if (parsed.amend) {
        const branchHashes = newLocal.branches[newLocal.currentBranch] ?? []
        if (branchHashes.length === 0) {
          return { newState, result: { lines: ["fatal: You have nothing to amend."] } }
        }
        const lastHash = branchHashes[branchHashes.length - 1]
        const lastCommit = newLocal.allCommits[lastHash]
        if (!lastCommit) {
          return { newState, result: { lines: ["fatal: You have nothing to amend."] } }
        }
        lastCommit.message = parsed.message
        if (newLocal.staged.length > 0) {
          newLocal.workingDirChanges = newLocal.workingDirChanges.filter(
            (f) => !newLocal.staged.includes(f)
          )
          newLocal.staged = []
        }
        return {
          newState,
          result: {
            lines: [
              `[${newLocal.currentBranch} ${lastHash}] ${parsed.message}`,
              "Amended commit message.",
            ],
          },
        }
      }

      // Merge commit (after conflict resolution)
      if (newState.mergeInProgress) {
        const branchHashes = newLocal.branches[newLocal.currentBranch] ?? []
        const sourceHashes = newLocal.branches[newState.mergeInProgress.source] ?? []
        const mergeCommit = makeCommit(
          `Merge branch '${newState.mergeInProgress.source}' into ${newLocal.currentBranch}`,
          author,
          [
            branchHashes[branchHashes.length - 1] || "",
            sourceHashes[sourceHashes.length - 1] || "",
          ]
        )
        newLocal.allCommits[mergeCommit.hash] = mergeCommit
        newLocal.branches[newLocal.currentBranch] = [...branchHashes, mergeCommit.hash]
        newLocal.staged = []
        newLocal.workingDirChanges = []
        delete newState.mergeInProgress
        return {
          newState,
          result: {
            lines: [
              `Merge made by the 'ort' strategy.`,
              ` 1 file changed.`,
            ],
            advance: true,
          },
        }
      }

      if (newLocal.staged.length === 0) {
        return { newState, result: { lines: ["nothing to commit, working tree clean"] } }
      }
      const stagedCount = newLocal.staged.length
      const branchHashes = newLocal.branches[newLocal.currentBranch] ?? []
      const parentHash = branchHashes.length > 0 ? branchHashes[branchHashes.length - 1] : ""
      const commit = makeCommit(parsed.message, author, parentHash ? [parentHash] : [])
      newLocal.allCommits[commit.hash] = commit
      newLocal.branches[newLocal.currentBranch] = [...branchHashes, commit.hash]
      newLocal.staged = []
      newLocal.workingDirChanges = []
      return {
        newState,
        result: {
          lines: [
            `[${newLocal.currentBranch} ${commit.hash}] ${commit.message}`,
            ` ${stagedCount} file${stagedCount !== 1 ? "s" : ""} changed, 1 insertion(+)`,
          ],
        },
      }
    }

    case "push": {
      const branchName = parsed.branch || newLocal.currentBranch
      const branchHashes = newLocal.branches[branchName] ?? []

      // Reject bare `git push` on branches with no upstream
      if (!parsed.branch && !parsed.setUpstream && !newState.origin.branches[branchName]?.length) {
        return {
          newState,
          result: {
            lines: [
              `fatal: The current branch ${branchName} has no upstream branch.`,
              `To push the current branch and set the remote as upstream, use`,
              `    git push -u origin ${branchName}`,
            ],
          },
        }
      }
      const originCommits = newState.origin.branches[branchName] ?? []
      const originHashes = new Set(originCommits.map((c) => c.hash))
      const unpushed = branchHashes
        .map((h) => newLocal.allCommits[h])
        .filter((c) => c && !originHashes.has(c.hash))

      if (unpushed.length === 0) {
        return { newState, result: { lines: ["Everything up-to-date"] } }
      }

      const lastOriginHash =
        originCommits.length > 0
          ? originCommits[originCommits.length - 1].hash
          : "0000000"
      const lastPushedHash = unpushed[unpushed.length - 1].hash

      newState.origin = cloneOrigin(newState.origin)
      newState.origin.branches[branchName] = [
        ...(newState.origin.branches[branchName] ?? []),
        ...unpushed,
      ]

      return {
        newState,
        result: {
          lines: [
            `Enumerating objects: ${unpushed.length + 1}, done.`,
            `Writing objects: 100% (${unpushed.length}/${unpushed.length}), done.`,
            `To origin/${branchName}`,
            `   ${lastOriginHash}..${lastPushedHash}  ${branchName} -> ${branchName}`,
          ],
          advance: true,
        },
      }
    }

    case "pull": {
      const branchName = parsed.branch || newLocal.currentBranch
      const originCommits = newState.origin.branches[branchName] ?? []
      const localHashes = new Set(
        (newLocal.branches[branchName] ?? []).map((h) => h)
      )
      const newCommits = originCommits.filter((c) => !localHashes.has(c.hash))

      if (newCommits.length === 0) {
        return { newState, result: { lines: ["Already up to date."] } }
      }

      for (const c of newCommits) {
        newLocal.allCommits[c.hash] = c
      }
      newLocal.branches[branchName] = [
        ...(newLocal.branches[branchName] ?? []),
        ...newCommits.map((c) => c.hash),
      ]

      return {
        newState,
        result: {
          lines: [
            `remote: Counting objects: ${newCommits.length}, done.`,
            `Updating from origin/${branchName}`,
            "Fast-forward",
            ` ${newCommits.length} file(s) changed`,
          ],
          advance: true,
        },
      }
    }

    case "branch": {
      // git branch (list)
      if (!parsed.name && !parsed.flag) {
        const lines = Object.keys(newLocal.branches).map((b) =>
          b === newLocal.currentBranch ? `* ${b}` : `  ${b}`
        )
        return { newState, result: { lines } }
      }
      // git branch -d <name>
      if (parsed.flag === "-d" || parsed.flag === "-D") {
        if (!parsed.name || !newLocal.branches[parsed.name]) {
          return { newState, result: { lines: [`error: branch '${parsed.name}' not found.`], advance: true } }
        }
        if (parsed.name === newLocal.currentBranch) {
          return { newState, result: { lines: [`error: Cannot delete branch '${parsed.name}' checked out.`] } }
        }
        // Check if merged
        const mainHashes = new Set(newLocal.branches["main"] ?? [])
        const branchHashes = newLocal.branches[parsed.name] ?? []
        const isMerged = branchHashes.every((h) => mainHashes.has(h))
        if (!isMerged && parsed.flag === "-d") {
          return {
            newState,
            result: {
              lines: [
                `error: The branch '${parsed.name}' is not fully merged.`,
                "If you are sure you want to delete it, run 'git branch -D " + parsed.name + "'.",
              ],
            },
          }
        }
        delete newLocal.branches[parsed.name]
        return { newState, result: { lines: [`Deleted branch ${parsed.name}.`], advance: true } }
      }
      return { newState, result: { lines: [`git: unknown branch option '${parsed.flag}'`] } }
    }

    case "switch":
    case "checkout": {
      if (newState.mergeInProgress) {
        return { newState, result: { lines: ["error: Cannot switch branches while merging.", "  (fix conflicts and run 'git commit')"] } }
      }
      const branchName = parsed.branch
      const create = "create" in parsed ? parsed.create : false

      if (create) {
        if (newLocal.branches[branchName]) {
          return { newState, result: { lines: [`fatal: A branch named '${branchName}' already exists.`] } }
        }
        const currentHashes = newLocal.branches[newLocal.currentBranch] ?? []
        newLocal.branches[branchName] = [...currentHashes]
        newLocal.currentBranch = branchName
        return { newState, result: { lines: [`Switched to a new branch '${branchName}'`], advance: true } }
      }

      if (!newLocal.branches[branchName]) {
        return { newState, result: { lines: [`fatal: path '${branchName}' does not exist in 'HEAD'`] } }
      }

      newLocal.currentBranch = branchName
      return { newState, result: { lines: [`Switched to branch '${branchName}'`] } }
    }

    case "merge": {
      const source = parsed.source
      if (!newLocal.branches[source]) {
        return { newState, result: { lines: [`merge: ${source} - not something we can merge`] } }
      }
      if (source === newLocal.currentBranch) {
        return { newState, result: { lines: ["Already up to date."] } }
      }

      const targetHashes = newLocal.branches[newLocal.currentBranch] ?? []
      const sourceHashes = newLocal.branches[source] ?? []

      // Check for conflicts (if both branches have diverged)
      const targetSet = new Set(targetHashes)
      const sourceSet = new Set(sourceHashes)
      const commonAncestor = targetHashes.find((h) => sourceSet.has(h))
      const targetDiverged = commonAncestor ? targetHashes.slice(targetHashes.indexOf(commonAncestor) + 1) : targetHashes
      const sourceDiverged = commonAncestor ? sourceHashes.slice(sourceHashes.indexOf(commonAncestor) + 1) : sourceHashes

      if (sourceDiverged.length > 0 && targetDiverged.length > 0) {
        const conflictedFile = newLocal.existingFiles[0] ?? "file.txt"
        newState.mergeInProgress = { source }
        newLocal.workingDirChanges = [
          ...newLocal.workingDirChanges.filter((f) => f !== conflictedFile),
          conflictedFile,
        ]
        return {
          newState,
          result: {
            lines: [
              `Auto-merging ${conflictedFile}`,
              `CONFLICT (content): Merge conflict in ${conflictedFile}`,
              `Automatic merge failed; fix conflicts and then commit the result.`,
            ],
          },
        }
      }

      // Fast-forward or simple merge
      const newHashes = sourceHashes.filter((h) => !targetSet.has(h))
      if (newHashes.length === 0) {
        return { newState, result: { lines: ["Already up to date."] } }
      }

      const mergeCommit = makeCommit(
        `Merge branch '${source}' into ${newLocal.currentBranch}`,
        author,
        [
          targetHashes[targetHashes.length - 1] || "",
          sourceHashes[sourceHashes.length - 1] || "",
        ]
      )
      newLocal.allCommits[mergeCommit.hash] = mergeCommit
      newLocal.branches[newLocal.currentBranch] = [...targetHashes, ...newHashes, mergeCommit.hash]

      return {
        newState,
        result: {
          lines: [
            `Merge made by the 'ort' strategy.`,
            ` ${newHashes.length} file(s) changed.`,
          ],
          advance: true,
        },
      }
    }

    case "status": {
      const lines: string[] = []
      lines.push(`On branch ${newLocal.currentBranch}`)
      if (newState.mergeInProgress) {
        lines.push("You have unmerged paths.")
        lines.push('  (fix conflicts and run "git commit")')
        lines.push("")
        lines.push("Unmerged paths:")
        lines.push('  (use "git add <file>..." to mark resolution)')
        lines.push("")
        for (const f of newLocal.workingDirChanges) {
          lines.push(`\tboth modified:   ${f}`)
        }
        return { newState, result: { lines } }
      }
      const visible = visibleChanges(newLocal.workingDirChanges, newLocal.ignoredPatterns)
      const ignored = newLocal.workingDirChanges.filter((f) => isIgnored(f, newLocal.ignoredPatterns))
      if (newLocal.staged.length > 0) {
        lines.push("")
        lines.push("Changes to be committed:")
        lines.push('  (use "git restore --staged <file>..." to unstage)')
        lines.push("")
        for (const f of newLocal.staged) {
          lines.push(`\tmodified:   ${f}`)
        }
      }
      if (visible.length > 0) {
        lines.push("")
        lines.push("Changes not staged for commit:")
        lines.push('  (use "git add <file>..." to update what will be committed)')
        lines.push("")
        for (const f of visible) {
          if (!newLocal.staged.includes(f)) {
            lines.push(`\tmodified:   ${f}`)
          }
        }
      }
      if (ignored.length > 0) {
        lines.push("")
        lines.push(`Ignored files:`)
        lines.push(`  (use "git add -f <file>..." to include)`)
        lines.push("")
        for (const f of ignored) {
          lines.push(`\t${f}`)
        }
      }
      if (newLocal.staged.length === 0 && visible.length === 0) {
        lines.push("")
        lines.push("nothing to commit, working tree clean")
      }
      return { newState, result: { lines } }
    }

    case "log": {
      const commits = currentBranchCommits(newLocal)
      if (commits.length === 0) {
        return { newState, result: { lines: ["No commits yet."] } }
      }
      const lines: string[] = []
      for (const c of [...commits].reverse()) {
        const isHead = c.hash === (newLocal.branches[newLocal.currentBranch] ?? []).slice(-1)[0]
        const refs = isHead ? ` (HEAD -> ${newLocal.currentBranch})` : ""
        lines.push(`commit ${c.hash}${refs}`)
        lines.push(`Author: ${c.author === "dev-a" ? "Senior" : "Junior"} <${c.author === "dev-a" ? "senior" : "junior"}@example.com>`)
        lines.push(`Date:   ${new Date(c.timestamp).toLocaleString()}`)
        lines.push("")
        lines.push(`    ${c.message}`)
        lines.push("")
      }
      return { newState, result: { lines } }
    }

    case "diff": {
      // In a real simulator, this would show actual file changes
      const changes = parsed.staged ? newLocal.staged : newLocal.workingDirChanges
      if (changes.length === 0) {
        return { newState, result: { lines: ["(no changes in working tree)"] } }
      }
      const lines: string[] = []
      for (const f of changes) {
        lines.push(`diff --git a/${f} b/${f}`)
        lines.push("index e69de29..3b2a5b4 100644")
        lines.push("--- a/" + f)
        lines.push("+++ b/" + f)
        lines.push("@@ -0,0 +1,1 @@")
        lines.push("+<new content>")
        lines.push("")
      }
      return { newState, result: { lines } }
    }

    case "revert": {
      const targetHash = parsed.hash
      const target = newLocal.allCommits[targetHash]
      if (!target) {
        return { newState, result: { lines: [`fatal: bad revision '${targetHash}'`] } }
      }
      const branchHashes = newLocal.branches[newLocal.currentBranch] ?? []
      if (branchHashes.length === 0) {
        return { newState, result: { lines: ["fatal: nothing to revert"] } }
      }
      const revertCommit = makeCommit(
        `Revert "${target.message}"`,
        author,
        [branchHashes[branchHashes.length - 1] || ""]
      )
      newLocal.allCommits[revertCommit.hash] = revertCommit
      newLocal.branches[newLocal.currentBranch] = [...branchHashes, revertCommit.hash]
      return {
        newState,
        result: {
          lines: [
            `Reverting commit ${targetHash}`,
            `Created revert commit: ${revertCommit.hash}`,
            `Revert "${target.message}"`,
          ],
        },
      }
    }

    case "reset": {
      const branchHashes = newLocal.branches[newLocal.currentBranch] ?? []
      if (branchHashes.length === 0) {
        return { newState, result: { lines: ["fatal: no commits to reset"] } }
      }
      const steps = parseInt(parsed.ref.match(/\d+/)?.[0] ?? "1", 10)
      if (steps <= 0 || steps > branchHashes.length) {
        return { newState, result: { lines: ["fatal: invalid reset ref"] } }
      }
      const targetIndex = branchHashes.length - steps - 1
      const removedHashes = branchHashes.slice(targetIndex + 1)
      const removedCommits = removedHashes
        .map((h) => newLocal.allCommits[h])
        .filter(Boolean)
      newLocal.branches[newLocal.currentBranch] = branchHashes.slice(0, targetIndex + 1)
      if (parsed.mode === "soft") {
        const files = removedCommits.flatMap((c) => {
          const msg = c.message.toLowerCase()
          if (msg.includes("readme")) return ["README.md"]
          if (msg.includes("index") || msg.includes("page") || msg.includes("nav")) return ["index.html"]
          if (msg.includes("contact") || msg.includes("footer")) return ["contact.html"]
          if (msg.includes("style") || msg.includes("css")) return ["style.css"]
          return ["file.txt"]
        })
        newLocal.staged = [...new Set([...newLocal.staged, ...files])]
        return {
          newState,
          result: {
            lines: [
              `RESET (soft) → moved to ${parsed.ref}`,
              `Staged ${files.length} file(s) from the undone commit(s).`,
              "Use git status to see staged changes.",
            ],
          },
        }
      }
      if (parsed.mode === "mixed") {
        const files = removedCommits.flatMap((c) => {
          const msg = c.message.toLowerCase()
          if (msg.includes("readme")) return ["README.md"]
          if (msg.includes("index") || msg.includes("page") || msg.includes("nav")) return ["index.html"]
          if (msg.includes("contact") || msg.includes("footer")) return ["contact.html"]
          if (msg.includes("style") || msg.includes("css")) return ["style.css"]
          return ["file.txt"]
        })
        const existing = new Set(newLocal.workingDirChanges)
        for (const f of files) existing.add(f)
        newLocal.workingDirChanges = [...existing]
        newLocal.staged = newLocal.staged.filter((f) => !files.includes(f))
        return {
          newState,
          result: {
            lines: [
              `RESET (mixed) → moved to ${parsed.ref}`,
              `Unstaged ${files.length} file(s). Changes are in working directory.`,
              "Use git status to see the state.",
            ],
          },
        }
      }
      if (parsed.mode === "hard") {
        newLocal.staged = []
        newLocal.workingDirChanges = []
        return {
          newState,
          result: {
            lines: [
              `RESET (hard) → moved to ${parsed.ref}`,
              "Working directory and staging area are now clean.",
              "All changes from undone commits have been discarded.",
            ],
          },
        }
      }
      return { newState, result: { lines: ["Unknown reset mode."] } }
    }

    case "pr-create": {
      const branchName = newLocal.currentBranch
      newState.prs = [
        ...newState.prs,
        {
          id: newState.nextPrId,
          title: parsed.title,
          description: parsed.description,
          author,
          baseBranch: "main",
          compareBranch: branchName,
          status: "open",
          reviews: [],
        },
      ]
      newState.nextPrId++
      return {
        newState,
        result: {
          lines: [
            `Creating pull request for ${branchName} → main`,
            `Title: ${parsed.title}`,
            `https://github.com/dev-A/team-practice/pull/${newState.nextPrId - 1}`,
            "",
            "Open the PR on GitHub for Senior Dev to review.",
          ],
        },
      }
    }

    case "pr-review": {
      const pr = newState.prs.find((p) => p.status === "open" || p.status === "changes-requested")
      if (!pr) return { newState, result: { lines: ["No open pull request found."] } }
      pr.reviews = [...pr.reviews, { author, type: parsed.action, body: parsed.body }]
      pr.status = parsed.action === "approve" ? "approved" : "changes-requested"
      return {
        newState,
        result: {
          lines: parsed.action === "approve"
            ? [`Approved PR #${pr.id} — ready to merge.`]
            : [`Requested changes on PR #${pr.id}.`],
        },
      }
    }

    case "pr-merge": {
      const pr = newState.prs.find((p) => p.status === "approved")
      if (!pr) return { newState, result: { lines: ["No approved pull request to merge."] } }

      const baseCommits = newState.origin.branches[pr.baseBranch] ?? []
      const compareCommits = newState.origin.branches[pr.compareBranch] ?? []
      const baseHashes = new Set(baseCommits.map((c) => c.hash))
      const newCommits = compareCommits.filter((c) => !baseHashes.has(c.hash))

      newState.origin = cloneOrigin(newState.origin)
      newState.origin.branches[pr.baseBranch] = [...baseCommits, ...newCommits]
      delete newState.origin.branches[pr.compareBranch]

      pr.status = "merged"

      // Sync Senior Dev's local main if they were on it
      if (newState.localA.currentBranch === pr.baseBranch) {
        const localHashes = newState.localA.branches[pr.baseBranch] ?? []
        const newLocalHashes = newCommits.map((c) => {
          newState.localA.allCommits[c.hash] = c
          return c.hash
        })
        newState.localA = cloneLocal(newState.localA)
        newState.localA.branches[pr.baseBranch] = [...localHashes, ...newLocalHashes.filter((h) => !localHashes.includes(h))]
      }

      return {
        newState,
        result: {
          lines: [
            `Merged PR #${pr.id}: ${pr.title}`,
            `Branch \`${pr.compareBranch}\` has been merged into \`${pr.baseBranch}\`.`,
          ],
        },
      }
    }

    case "clear": {
      return { newState, result: { lines: [], advance: true } }
    }

    case "error": {
      const msg = (() => {
        if (/^git checkout -c /.test(parsed.raw)) {
          const branch = parsed.raw.replace(/^git checkout -c /, "").replace(/^["']|["']$/g, "")
          return [
            `error: did you mean 'git switch -c ${branch}'?`,
            `Note: 'git checkout' creates branches with -b, not -c.`,
            `      'git switch -c' was introduced in Git 2.23 (2019) specifically for creating branches.`,
          ]
        }
        return ["Unknown command. Type 'git status' to see the current state."]
      })()
      return { newState, result: { lines: msg } }
    }

    default: {
      return {
        newState,
        result: { lines: ["Unknown command. Type 'git status' to see the current state."] },
      }
    }
  }
}

export function createInitialState(): GitLabState {
  const initialCommit = makeCommit("Initial commit", "dev-a", [])
  return {
    origin: {
      branches: {
        main: [],
      },
    },
    localA: {
      currentBranch: "main",
      branches: { main: [] },
      allCommits: {},
      staged: [],
      workingDirChanges: [],
      existingFiles: ["README.md"],
      ignoredPatterns: [],
    },
    localB: {
      currentBranch: "main",
      branches: { main: [] },
      allCommits: {},
      staged: [],
      workingDirChanges: [],
      existingFiles: ["README.md"],
      ignoredPatterns: [],
    },
    prs: [],
    nextPrId: 1,
    scenario: {
      currentStep: 0,
      id: "two-collaborators",
    },
  }
}
