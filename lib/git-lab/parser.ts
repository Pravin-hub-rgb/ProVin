import type { ParsedCommand } from "./types"

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim()
  if (!trimmed) return { type: "ignore" }

  // git add <file>
  const addMatch = trimmed.match(/^git add (.+)$/)
  if (addMatch) {
    const files = addMatch[1].trim()
    if (files === ".") return { type: "add-all" }
    return { type: "add", files: files.split(/\s+/) }
  }

  // git commit --amend -m "..."
  const commitAmendMatch = trimmed.match(/^git commit --amend -m ["'](.+)["']$/)
  if (commitAmendMatch) return { type: "commit", message: commitAmendMatch[1], amend: true }

  // git commit -m "..."
  const commitMatch = trimmed.match(/^git commit -m ["'](.+)["']$/)
  if (commitMatch) return { type: "commit", message: commitMatch[1] }

  // git commit (without -m — ignore in lab, we require -m)
  if (/^git commit$/.test(trimmed)) return { type: "ignore" }

  // git push -u origin <branch>
  const pushUOrigin = trimmed.match(/^git push -u origin (.+)$/)
  if (pushUOrigin) return { type: "push", remote: "origin", branch: pushUOrigin[1], setUpstream: true }

  // git push -u <branch> (origin implied)
  const pushU = trimmed.match(/^git push -u (.+)$/)
  if (pushU) return { type: "push", remote: "origin", branch: pushU[1], setUpstream: true }

  // git push origin -u <branch>
  const pushOriginU = trimmed.match(/^git push origin -u (.+)$/)
  if (pushOriginU) return { type: "push", remote: "origin", branch: pushOriginU[1], setUpstream: true }

  // git push origin --delete <branch> (remote branch deletion)
  const pushDelete = trimmed.match(/^git push origin --delete (.+)$/)
  if (pushDelete) return { type: "delete-remote", remote: "origin", branch: pushDelete[1] }

  // git push origin -d <branch> (shorthand for --delete)
  const pushDeleteShort = trimmed.match(/^git push origin -d (.+)$/)
  if (pushDeleteShort) return { type: "delete-remote", remote: "origin", branch: pushDeleteShort[1] }

  // git push origin <branch>
  const pushMatch = trimmed.match(/^git push origin (.+)$/)
  if (pushMatch) return { type: "push", remote: "origin", branch: pushMatch[1] }

  // git push (uses upstream)
  if (/^git push$/.test(trimmed)) return { type: "push", remote: "origin", branch: "" }

  // git pull origin <branch>
  const pullMatch = trimmed.match(/^git pull origin (.+)$/)
  if (pullMatch) return { type: "pull", remote: "origin", branch: pullMatch[1] }

  // git pull
  if (/^git pull$/.test(trimmed)) return { type: "pull", remote: "origin", branch: "" }

  // git branch (list)
  if (/^git branch$/.test(trimmed)) return { type: "branch" }

  // git branch -d <name>
  const branchDeleteMatch = trimmed.match(/^git branch -d (.+)$/)
  if (branchDeleteMatch) return { type: "branch", flag: "-d", name: branchDeleteMatch[1] }

  // git branch -D <name>
  const branchForceDeleteMatch = trimmed.match(/^git branch -D (.+)$/)
  if (branchForceDeleteMatch) return { type: "branch", flag: "-D", name: branchForceDeleteMatch[1] }

  // git branch --merged <branch>
  const branchMergedMatch = trimmed.match(/^git branch --merged (.+)$/)
  if (branchMergedMatch) return { type: "branch", flag: "--merged", name: branchMergedMatch[1] }

  // git branch --no-merged <branch>
  const branchNoMergedMatch = trimmed.match(/^git branch --no-merged (.+)$/)
  if (branchNoMergedMatch) return { type: "branch", flag: "--no-merged", name: branchNoMergedMatch[1] }

  // git branch -a (list all branches including remote tracking)
  const branchAllMatch = trimmed.match(/^git branch -a$/)
  if (branchAllMatch) return { type: "branch", flag: "-a" }

  // git branch -r --merged <branch> (list remote branches merged into <branch>)
  const branchRMergedMatch = trimmed.match(/^git branch -r --merged (.+)$/)
  if (branchRMergedMatch) return { type: "branch", flag: "-r", mergedBase: branchRMergedMatch[1] }

  // git branch -r (list remote branches)
  const branchRemoteMatch = trimmed.match(/^git branch -r$/)
  if (branchRemoteMatch) return { type: "branch", flag: "-r" }

  // git branch <name> (create)
  const branchCreateMatch = trimmed.match(/^git branch (\S+)$/)
  if (branchCreateMatch) return { type: "branch", name: branchCreateMatch[1] }

  // git switch <branch>
  const switchMatch = trimmed.match(/^git switch (\S+)$/)
  if (switchMatch) return { type: "switch", branch: switchMatch[1].replace(/^["']|["']$/g, "") }

  // git switch -c <branch>
  const switchCreateMatch = trimmed.match(/^git switch -c (.+)$/)
  if (switchCreateMatch) return { type: "switch", branch: switchCreateMatch[1].replace(/^["']|["']$/g, ""), create: true }

  // git checkout -b <branch>
  const checkoutCreateB = trimmed.match(/^git checkout -b (.+)$/)
  if (checkoutCreateB) return { type: "checkout", branch: checkoutCreateB[1].replace(/^["']|["']$/g, ""), create: true }

  // git checkout -c — warn: use switch -c, checkout uses -b
  const checkoutC = trimmed.match(/^git checkout -c (.+)$/)
  if (checkoutC) return { type: "error", raw: trimmed }

  // git checkout <branch>
  const checkoutMatch = trimmed.match(/^git checkout (\S+)$/)
  if (checkoutMatch) return { type: "checkout", branch: checkoutMatch[1].replace(/^["']|["']$/g, "") }

  // git merge --strategy <branch>
  const mergeStrategyMatch = trimmed.match(/^git merge --(no-ff|squash|rebase) (\S+)$/)
  if (mergeStrategyMatch) {
    const strategy = mergeStrategyMatch[1] === "no-ff" ? "merge-commit" : mergeStrategyMatch[1] as "squash" | "rebase"
    return { type: "merge", source: mergeStrategyMatch[2], strategy }
  }

  // git merge <branch>
  const mergeMatch = trimmed.match(/^git merge (\S+)$/)
  if (mergeMatch) return { type: "merge", source: mergeMatch[1], strategy: "merge-commit" }

  // git status
  if (/^git status$/.test(trimmed)) return { type: "status" }

  // git log
  if (/^git log$/.test(trimmed)) return { type: "log" }

  // git tree
  if (/^git tree$/.test(trimmed)) return { type: "tree" }

  // git diff
  if (/^git diff$/.test(trimmed)) return { type: "diff" }

  // git diff --staged
  if (/^git diff --staged$/.test(trimmed)) return { type: "diff", staged: true }

  // git revert <hash>
  const revertMatch = trimmed.match(/^git revert (\S+)$/)
  if (revertMatch) return { type: "revert", hash: revertMatch[1] }

  // git reset --soft|--mixed|--hard HEAD~<N>
  const resetMatch = trimmed.match(/^git reset --(soft|mixed|hard) (HEAD~\d+)$/)
  if (resetMatch) return { type: "reset", mode: resetMatch[1] as "soft" | "mixed" | "hard", ref: resetMatch[2] }

  // git reset HEAD~<N> (defaults to --mixed)
  const resetDefaultMatch = trimmed.match(/^git reset (HEAD~\d+)$/)
  if (resetDefaultMatch) return { type: "reset", mode: "mixed", ref: resetDefaultMatch[1] }

  // gh pr create --title "..." --desc "..."
  const prCreateMatch = trimmed.match(/^gh pr create --title "([^"]+)" --desc "([^"]+)"$/)
  if (prCreateMatch) return { type: "pr-create", title: prCreateMatch[1], description: prCreateMatch[2] }

  // gh pr review --approve [--body "..."]
  const prReviewApprove = trimmed.match(/^gh pr review --approve(?: --body "([^"]*)")?$/)
  if (prReviewApprove) return { type: "pr-review", action: "approve", body: prReviewApprove[1] ?? "" }

  // gh pr review --request-changes [--body "..."]
  const prReviewRequest = trimmed.match(/^gh pr review --request-changes(?: --body "([^"]*)")?$/)
  if (prReviewRequest) return { type: "pr-review", action: "request-changes", body: prReviewRequest[1] ?? "" }

  // gh pr merge --strategy <type>
  const prMergeStrategyMatch = trimmed.match(/^gh pr merge --strategy (merge-commit|squash|rebase)$/)
  if (prMergeStrategyMatch) return { type: "pr-merge", strategy: prMergeStrategyMatch[1] as "merge-commit" | "squash" | "rebase" }

  // gh pr merge
  if (/^gh pr merge$/.test(trimmed)) return { type: "pr-merge", strategy: "merge-commit" }

  // clear
  if (/^clear$/.test(trimmed)) return { type: "clear" }

  return { type: "unknown", raw: trimmed }
}
