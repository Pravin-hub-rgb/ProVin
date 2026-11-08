# DSA Course Roadmap (Java, Pattern-Based)

> **Language: Java.** This course is built in Java, not JavaScript. The old JavaScript-based Phase 1 notes are being migrated to Java modules; until then, treat them as reference only.

---

## Core Principle

DSA and your dev work run **in parallel**, not sequentially. Fixed 1-2 hours daily/alternate-day for DSA, remaining time on projects. Order matters more than speed.

## What You're Building

A self-study DSA course in Java, organized **by pattern** (not by data structure). Each module teaches only the data structures it needs, just in time. 24 modules, 4 tiers, ~300 core problems + 274 extra.

**Three layers (learned separately, combined in every problem):**
- **Data structure** — a way to *store* data (Array, LinkedList, HashMap, Tree, ...)
- **Algorithm** — a *method* to solve a class of problems (sorting, BFS, DP, ...)
- **Pattern** — a reusable *trick* to recognize and solve a family of problems (Two Pointers, Sliding Window, ...)

## The 24 Modules (in order)

| # | Module | New Java tools taught | Tier 1 | Tier 2 | Tier 3 | Total |
|---|---|---|---|---|---|---|
| 0 | The Big Picture | none | | | | |
| 1 | Java Basics & Big-O | Java essentials, Collections overview | | | | |
| 2 | Arrays & Hashing | Array, ArrayList, String, StringBuilder, 2D array, HashMap, HashSet | 10 | 7 | 1 | 18 |
| 3 | Two Pointers | none | 9 | 5 | 0 | 14 |
| 4 | Sliding Window | none (Deque in one problem) | 2 | 9 | 3 | 14 |
| 5 | Prefix Sum & Subarrays | none | 2 | 6 | 0 | 8 |
| 6 | Binary Search (incl. Search on Answer) | none | 7 | 8 | 3 | 18 |
| 7 | Sorting & Intervals | Arrays.sort, Comparator, TreeMap/TreeSet | 2 | 6 | 2 | 10 |
| 8 | Strings & Math | none | 6 | 2 | 0 | 8 |
| 9 | Stack & Monotonic Stack | Stack, Queue, Deque (ArrayDeque) | 6 | 7 | 3 | 16 |
| 10 | Linked List | Singly & doubly linked list | 10 | 5 | 2 | 17 |
| 11 | Recursion & Backtracking | Call stack, recursion tree | 0 | 13 | 5 | 18 |
| 12 | Bit Manipulation | none | 3 | 1 | 4 | 8 |
| 13 | Design Problems | LinkedHashMap, HashMap + doubly linked list | 0 | 2 | 3 | 5 |
| 14 | Binary Trees | TreeNode, DFS/BFS traversals | 11 | 7 | 4 | 22 |
| 15 | Binary Search Trees | BST | 5 | 4 | 1 | 10 |
| 16 | Heap / Priority Queue | PriorityQueue, custom comparators | 2 | 7 | 2 | 11 |
| 17 | Trie | Trie | 0 | 2 | 4 | 6 |
| 18 | Graphs: BFS / DFS / Matrix | Graph (adjacency list/matrix) | 2 | 12 | 6 | 20 |
| 19 | Topological Sort | none (uses graph) | 0 | 3 | 3 | 6 |
| 20 | Shortest Path, DSU & MST | Weighted graph, Union-Find (DSU) | 0 | 2 | 12 | 14 |
| 21 | Dynamic Programming | none (builds on recursion) | 3 | 22 | 19 | 44 |
| 22 | Greedy | none | 3 | 4 | 6 | 13 |
| 23 | Beyond DSA | Resume, CS fundamentals, aptitude, system design, interview communication | | | | |
| | **Totals** | | **83** | **134** | **83** | **300** |

Extra practice (problems 301–574) is a separate list — see `DSA-Tier-3-Plus-Extra-Practice.md`.

## Tiers (pick one at Module 0)

Tiers are cumulative — Tier 2 includes Tier 1, Tier 3 includes both. Nothing is listed twice.

| Tier | Goal | Problems (cumulative) | Typical employers |
|---|---|---|---|
| 1 | Foundation | 83 | Service companies, small startups |
| 2 | Core product | 217 | Mid-level product companies, fintech |
| 3 | Advanced | 300 | Big product companies, big tech |
| 3+ | Deeper big-tech prep | up to 574 | Amazon, Microsoft, Google-style |

Tier ranges are rough guides based on Indian market experience, not official standards. Quality beats quantity — 150 problems you truly understand beats 500 you copied.

**Which modules each tier needs:**
- **Tier 1:** Modules 0–12 and 14–16, but only Tier 1 problems in each. Skip Modules 13, 17, 19, 20 (no Tier 1 problems). Treat Modules 18, 21, 22 as light (2–3 problems each).
- **Tier 2:** All modules except Tier 3 problems (Modules 17, 19, 20 mostly skipped or read lightly).
- **Tier 3:** Everything.

## Two Valid Study Flows

Pick one — the content is the same either way.

**Flow A — Module-first (build guide's intended way):** Go module by module. In each module: learn the data structure → learn the pattern → worked example → solve all problems for your tier in that module → move to the next module. Depth-first.

**Flow B — Tier-first (3-pass):** Pass 1: all modules, Tier 1 problems only (learn each DS/pattern). Pass 2: all modules, Tier 2 problems (DS known, just solve; re-hit Tier 1 problems = spaced repetition). Pass 3: all modules, Tier 3 problems (harder, advanced modules fully). Breadth-first.

In both flows, data structures are learned once per module — never repeated.

## How to Practice (Module 0 rules)

1. Try first — 20-25 minutes on your own before reading any solution.
2. Then learn — read the editorial/solution, understand *why* it works, write it yourself.
3. Re-solve next day from scratch, without looking.
4. Tick the box only when you can solve it alone, without hints.
5. Revisit struggled problems after a week.
6. Explain out loud — approach, why that data structure, time/space complexity, edge cases.
7. Track progress — solved date, struggled (yes/no), revisit date.

**Pacing:** 3-4 months at your own pace is fine. Order matters more than speed. DP in particular takes time — don't rush it.

## Module 0 → 1 → 2–4 Pilot (where we start)

Build order: module template + Module 0 → Module 1 (Java & Big-O) → Modules 2–4 as a pilot. Get feedback, then continue with Modules 5–12, then 13–22, then Module 23.

## Beyond DSA (Module 23)

DSA alone won't get you shortlisted. Also cover: resume + 1-2 strong full-stack projects you can explain (architecture, API design, auth, caching, trade-offs), CS fundamentals (OS, DBMS/SQL, networks, OOP), aptitude (for service-company hiring), system design basics (APIs, load balancers, caching, scaling, basic LLD), interview communication (think aloud, brute force → optimized, edge cases, mocks), and choosing target companies.

## Problem Lists

- `DSA-Tier-1-Foundation.md` — 83 problems
- `DSA-Tier-2-Core.md` — 134 problems
- `DSA-Tier-3-Advanced.md` — 83 problems
- `DSA-Tier-3-Plus-Extra-Practice.md` — 274 extra problems (301–574)

Each module's practice table is taken from these files. Links are built from problem titles — verify any that don't open.

## Notes

- All code is Java. Keep it simple and readable over clever.
- Explain in plain language first, then the technical term. One idea at a time.
- Write original explanations — don't copy LeetCode statements/editorials.
- Test every Java snippet (must compile and run).
- Glossary of terms (Big-O, pointer, node, recursion, memoization) maintained and linked from each module.
- Each module links to previous/next module and to matching rows in the tier files.
- The 300-problem list is curated by @monkeytalks.json ("DSA-300") — confirm permission before publishing/selling, and credit the creator.
- Tier tags/difficulty labels are best-effort judgments. Adjust if needed.