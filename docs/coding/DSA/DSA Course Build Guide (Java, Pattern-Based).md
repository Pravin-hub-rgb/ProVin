# DSA Course Build Guide (Java, Pattern-Based)

*A brief for the course developer. It explains what to build, in what order, and how every module should look.*

## 1. What we are building

A self-study course on Data Structures and Algorithms (DSA) in **Java**, for people preparing for software jobs through **self placement** (off-campus applications, no college drive). The course should replace the need to browse YouTube for "what do I study next?" Everything the learner needs is in one place: the roadmap, the theory, the Java code, and a fixed list of practice problems with links.

**The learner we are designing for:** a beginner who is overwhelmed by conflicting advice ("do this sheet, do that sheet"), has seen tutorials that jump straight into arrays with no big picture, and wants to know exactly how much to study for the job level they are aiming at.

**Core promises of the course:**

- A complete map of DSA before any detail.
- One fixed order of study where nothing is used before it is taught.
- Clear tiers, so the learner knows when they have done enough for their goal.
- Plain language first, jargon second.

## 2. The big idea: three layers, one order

Most confusion comes from mixing three different things that are all called "topics". The course must teach and label them separately.

| Layer | What it is | Examples |
| --- | --- | --- |
| **Data structure** | A way to *store* data (a noun) | Array, linked list, stack, queue, hash map, tree, heap, graph, trie |
| **Algorithm** | A *method* to solve a class of problems (a verb) | Sorting, binary search, BFS, DFS, recursion, backtracking, dynamic programming, greedy |
| **Pattern** | A reusable *trick* for recognizing and solving a family of problems | Two pointers, sliding window, prefix sum, monotonic stack, binary search on answer |

A good analogy is NOT used in this course. Explanations are technical and direct; use concrete examples and code, not metaphors. (The course owner has decided: no analogies.)

**Every real problem uses all three.** Example: Two Sum uses an array and a hash map (data structures), a "remember what you have seen" idea (pattern), and a single pass over the input (algorithm). So problems are never "just array problems".

### The teaching order (important)

The course is organized **by pattern**, and each module teaches only the data structures it needs, *just in time*:

1. Learn the data structure the module needs (short, with Java code), if it is new.
2. Learn the pattern in plain language with a worked example.
3. Practice problems, easy to hard.
4. Revisit a few problems a week later.

Why not "all arrays, then all linked lists"? Because array problems need hashing, binary search, and recursion too, so the learner hits things they have not been taught. And why not "all data structures first"? Because it is boring and the learner forgets it before using it. Just-in-time avoids both problems.

## 3. Course map

The course has 24 modules. Module numbers for patterns follow the order of the 300-problem sheet (patterns 1 to 21 become modules 2 to 22).

| Module | Title | New data structures / Java tools taught | Tier 1 | Tier 2 | Tier 3 | Total |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | The Big Picture | none |  |  |  |  |
| 1 | Java Basics and Big-O | Java essentials, Collections overview |  |  |  |  |
| 2 | Arrays & Hashing | Array, ArrayList, String, StringBuilder, 2D array, HashMap, HashSet | 10 | 7 | 1 | 18 |
| 3 | Two Pointers | none | 9 | 5 | 0 | 14 |
| 4 | Sliding Window | none (reuses HashMap; Deque appears in one problem) | 2 | 9 | 3 | 14 |
| 5 | Prefix Sum & Subarrays | none | 2 | 6 | 0 | 8 |
| 6 | Binary Search (incl. Search on Answer) | none | 7 | 8 | 3 | 18 |
| 7 | Sorting & Intervals | Arrays.sort, Comparator, TreeMap/TreeSet | 2 | 6 | 2 | 10 |
| 8 | Strings & Math | none | 6 | 2 | 0 | 8 |
| 9 | Stack & Monotonic Stack | Stack, Queue, Deque (ArrayDeque) | 6 | 7 | 3 | 16 |
| 10 | Linked List | Singly and doubly linked list | 10 | 5 | 2 | 17 |
| 11 | Recursion & Backtracking | Call stack, recursion tree | 0 | 13 | 5 | 18 |
| 12 | Bit Manipulation | none | 3 | 1 | 4 | 8 |
| 13 | Design Problems | LinkedHashMap, HashMap + doubly linked list | 0 | 2 | 3 | 5 |
| 14 | Binary Trees | TreeNode, DFS/BFS traversals | 11 | 7 | 4 | 22 |
| 15 | Binary Search Trees | BST | 5 | 4 | 1 | 10 |
| 16 | Heap / Priority Queue | PriorityQueue, custom comparators | 2 | 7 | 2 | 11 |
| 17 | Trie | Trie | 0 | 2 | 4 | 6 |
| 18 | Graphs: BFS / DFS / Matrix | Graph (adjacency list, adjacency matrix) | 2 | 12 | 6 | 20 |
| 19 | Topological Sort | none (uses graph) | 0 | 3 | 3 | 6 |
| 20 | Shortest Path, DSU & MST | Weighted graph, Union-Find (DSU) | 0 | 2 | 12 | 14 |
| 21 | Dynamic Programming | none (builds on recursion) | 3 | 22 | 19 | 44 |
| 22 | Greedy | none | 3 | 4 | 6 | 13 |
| 23 | Beyond DSA | See section 8 |  |  |  |  |
|  | **Totals** |  | **83** | **134** | **83** | **300** |

*Extra practice (problems 301 to 574) is a separate list, not part of any module. See section 6.*

## 4. The standard module template

Every pattern module (2 to 22) must follow the **same structure** so the learner always knows where to look. The developer should build a reusable template with these sections:

1. **Header.** Module title, one-line goal, and the tier tags (how many Tier 1, 2, 3 problems it contains).
2. **Prerequisites.** Which earlier modules this depends on.
3. **Data structure primer** (only if the module introduces one). What it is, a diagram, how it works inside, when to use it, its Java class or how to write it, the cost (Big-O) of each operation, and a short code example.
4. **The pattern explained.** Plain-language definition, followed by the "how to recognize it" checklist (see below).
5. **Worked example.** One problem solved step by step: brute force first, then the improved approach, with Java code and complexity. Show *how to think*, not just the final code.
6. **Common mistakes.** Off-by-one errors, forgotten edge cases, typical bugs in this pattern.
7. **Practice problems.** A table taken from the tier files (see section 6): number, name, difficulty, tier, link, and a checkbox. Order from easy to hard.
8. **Revision list.** Three to five problems from this module the learner must re-solve after a week.
9. **Mini quiz.** Five questions on concepts and complexity (not on specific problems).
10. **One-page cheat sheet.** The pattern's template code, the recognition clues, and the complexity, ready to print.

### The "how to recognize it" checklist

This is the most valuable part of each module. Real interviews never say "this is a sliding window problem". Each module should list clues such as: *"If the problem asks for the longest or shortest contiguous part of an array or string that satisfies a rule, think sliding window."* Each clue should link to one example problem from the list.

### Quality rules for every module

- Explain in plain language first, then show the technical term.
- All Java code must **compile and run**. Test every snippet.
- Show brute force, then optimization, and always state time and space complexity.
- Keep modules short enough to finish in a few days. The practice problems are where learning happens, so theory should not be a wall of text.
- Use diagrams for anything structural (linked lists, trees, graphs, recursion trees).

## 5. Module 0 and Module 1 in detail

### Module 0: The Big Picture

This is the "whole course walkthrough" the learner reads first. Contents:

1. **What is DSA, and why do interviews test it?** Short and honest.
2. **The three layers** (section 2 of this guide, written for the learner).
3. **The full topic map.** One short paragraph per data structure and algorithm, with a plain example of where it is used. This is the overview that most tutorials skip.
   - Foundations: Big-O, Java Collections, basic math, recursion
   - Linear structures: arrays, strings, linked lists, stacks, queues, deques
   - Hash-based: HashMap, HashSet
   - Non-linear: trees, BST, heaps, graphs, tries, Union-Find
   - Algorithms: sorting, binary search, BFS, DFS, backtracking, greedy, dynamic programming, topological sort, shortest path, bit manipulation
   - Patterns: two pointers, sliding window, prefix sum, monotonic stack, intervals, binary search on answer, top-K with a heap
4. **How the course is organized** (the module map and the just-in-time idea).
5. **Choose your tier.** The tier table and goal guide (section 6).
6. **How to practice.** The rules in section 7.
7. **DSA is not the whole interview.** A short pointer to Module 23.
8. **How to use this course in 5 steps,** ending with: "Start Module 1, then Module 2, Problem 1: Two Sum."

### Module 1: Java Basics and Big-O

Assume the learner may have little Java. Cover only what DSA needs:

- Setting up Java and an IDE, running a first program
- Variables, data types, operators, integer overflow, `int` versus `long`
- Input and output (`Scanner`, `BufferedReader`, `System.out`)
- Conditions, loops, methods
- Arrays (1D and 2D) and Strings, plus `StringBuilder`
- Classes and objects, generics (just enough to read `List<Integer>` and write a `Node` class)
- A tour of the Java Collections: `ArrayList`, `HashMap`, `HashSet`, `ArrayDeque`, `PriorityQueue`, `TreeMap` (name and purpose only; each is taught in depth where it is first used)
- **Big-O notation:** time and space complexity, the common growth rates (O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)), how to analyze a loop, and how to estimate from input limits (for example, "n up to 10⁵ means you need roughly O(n log n) or better")
- How LeetCode works: the `class Solution` format, reading constraints, and testing a solution
- Common Java pitfalls: comparing Strings with `==`, `Integer` caching, integer division, array copying

## 6. Tiers and the problem lists

The practice problems come from a 300-problem, pattern-wise LeetCode sheet (see section 11 for credit), plus an extra list. We have already split it into **four Markdown files**:

| File | Problems | Contents |
| --- | --- | --- |
| DSA-Tier-1-Foundation.md | 83 | Easy problems and simpler Mediums |
| DSA-Tier-2-Core.md | 134 | Remaining Mediums |
| DSA-Tier-3-Advanced.md | 83 | Hards and advanced topics |
| DSA-Tier-3-Plus-Extra-Practice.md | 274 | Extra problems 301 to 574, none overlapping the 300 |

**How the tiers stack.** Each problem has exactly one tag: the *lowest* tier that needs it. Tiers are cumulative, so Tier 2 includes Tier 1, and Tier 3 includes both. Nothing is listed twice.

| Tier | Goal | Problems (cumulative) | Typical employers |
| --- | --- | --- | --- |
| 1 | Foundation, roughly 5 to 10 LPA | 83 | Service companies, small startups |
| 2 | Core product, roughly 10 to 20 LPA | 217 | Mid-level product companies, fintech |
| 3 | Advanced, roughly 20 to 40 LPA | 300 | Big product companies and big tech |
| 3+ | Deeper big-tech preparation | up to 574 | Amazon, Microsoft, Google-style interviews |

**Important notes to include for the learner:**

- These ranges come from two creators' personal experience, not an official standard. Treat them as rough guides.
- **Quality beats quantity.** Solving 150 problems you truly understand is worth more than 500 you copied.
- The salary bands are a guide, not a promise. Company bars vary, and for higher bands communication, projects, and system design matter as much as DSA.
- A learner can stop at the tier that matches their goal and does not have to decide the ceiling on day one.

### Which modules each tier needs

- **Tier 1 learners** follow Modules 0 to 12 and 14 to 16, but do *only the Tier 1 problems* in each. They can **skip Modules 13, 17, 19, and 20** entirely (no Tier 1 problems), and treat Modules 18, 21, and 22 as light (two or three problems each).
- **Tier 2 learners** do all modules except the Tier 3 problems, so Modules 17, 19, 20 are mostly skipped or read lightly.
- **Tier 3 learners** do everything.

The developer should show this as a table or a flowchart in Module 0, and show tier tags clearly at the top of each module and next to each problem.

## 6.1 Study flow options (document both in Module 0)

The build guide's default is module-first (Flow A). A 3-pass alternative (Flow B) is also valid. Both are cumulative — Tier 2 includes Tier 1, Tier 3 includes both, nothing listed twice. Data structures are learned once per module in either flow.

**Flow A — Module-first (default):** Go module by module. In each module: learn the data structure → learn the pattern → worked example → solve all problems for the learner's tier in that module → move to the next module. Depth-first.

**Flow B — Tier-first (3-pass):** Pass 1: all modules, Tier 1 problems only (learn each DS/pattern). Pass 2: all modules, Tier 2 problems (DS known, just solve; re-hitting Tier 1 problems = spaced repetition). Pass 3: all modules, Tier 3 problems (harder, advanced modules fully). Breadth-first.

## 7. Practice rules (put these in Module 0)

1. **Try first.** Spend 20 to 25 minutes on a problem on your own before reading any solution.
2. **Then learn.** Read the editorial or a solution, understand *why* it works, and write it yourself.
3. **Re-solve next day** from scratch, without looking.
4. **Tick the box only when you can solve it alone,** without hints.
5. **Revisit after one week** the problems that felt hard.
6. **Explain out loud.** For each problem, state the approach, why that data structure, the time and space complexity, and the edge cases. This is the skill interviews test at higher tiers.
7. **Track progress.** Provide a simple tracker (a checklist or spreadsheet) with columns for solved date, struggled (yes/no), and revisit date.

**Pacing.** The original sheet suggests 2 months at 2 hours a day (5 to 6 problems daily). That is ambitious for a beginner, especially in dynamic programming. The course should state that **3 to 4 months at the learner's own pace is perfectly fine**, and that order matters more than speed.

## 8. Module 23: Beyond DSA

Because the target learner is applying off-campus, getting *shortlisted* matters as much as passing the coding round. This module should be shorter and more practical than the others. Suggested sections:

1. **Why DSA alone is not enough.** Both source videos stress this, so quote the idea in your own words.
2. **Resume and projects.** One or two strong projects, ideally full-stack, that the learner can explain: architecture, API design, authentication, caching, and trade-offs.
3. **CS fundamentals.** Operating systems, DBMS and SQL, computer networks, and OOP concepts, with a short list of what to revise.
4. **Aptitude.** For service-company hiring, aptitude tests can be a bigger filter than DSA.
5. **System design basics.** For higher tiers: APIs, load balancers, caching, horizontal versus vertical scaling, plus basic low-level design (SOLID, class design).
6. **Interview communication.** How to think aloud, explain brute force to optimized, discuss edge cases, and do mock interviews.
7. **Choosing target companies.** A method: list 5 to 10 target companies, search their interview experiences on sites like LeetCode Discuss and GeeksforGeeks, and match them to a tier.

## 9. Content and style guidelines for the developer

- **Language:** Java only. Keep code simple and readable over clever.
- **Tone:** friendly, calm, and plain. Assume the reader feels overwhelmed. Never write "it is obvious that".
- **One idea at a time.** Short sections, small examples, many diagrams.
- **Write original explanations.** Do **not** copy LeetCode problem statements, editorials, or other creators' solutions into the course. Link to the problem and explain the idea in your own words.
- **Consistency.** Use the same module template, the same naming (`Solution`, `ListNode`, `TreeNode`), and the same complexity notation everywhere.
- **Glossary.** Keep a running glossary of terms (Big-O, pointer, node, recursion, memoization) and link to it from each module.
- **Navigation.** Each module should link to the previous and next module, and to the matching rows in the tier files.

## 10. Deliverables and suggested build order

**Deliverables**

1. The course content: Modules 0 to 23 in the structure above.
2. The four problem-list files, integrated into the modules (or kept as appendices).
3. A progress tracker.
4. A printable cheat sheet per pattern.

**Suggested build order**

1. Build the module **template** and Module 0 first, since they set the tone and structure.
2. Build Module 1 (Java and Big-O).
3. Build Modules 2 to 4 completely as a pilot. Get feedback before continuing.
4. Build Modules 5 to 12.
5. Build the structure-heavy modules: trees, heaps, graphs, DP (Modules 13 to 22).
6. Build Module 23, then review the whole course for consistency and test all code.

**Open questions for the course owner** (to confirm before building):

- What is the delivery format: a website, PDF e-book, or a set of documents? This changes how diagrams, code, and the tracker are built.
- Will the course be shared publicly or sold? If yes, see the permission note below.
- Should the problem links point to LeetCode only, or also include alternatives (for example GeeksforGeeks) for learners who do not want a LeetCode account?

## 11. Known limitations and credits

- **Source of the 300 problems.** The sheet was created by the Instagram creator @monkeytalks.json ("DSA-300"). If the course will be published or sold, **confirm you have permission to use or redistribute that list**, and credit the creator. Problem names themselves are public LeetCode titles, but the curation is someone's work.
- **Tier tags and difficulty labels are best-effort.** They were assigned from general knowledge of LeetCode, not from an official source. The developer should review them, and adjust if needed.
- **Links were generated from problem titles and not individually opened.** Click through and fix any that do not work.
- **The extra-practice file (274 problems)** was selected from commonly asked interview problems, not copied from one official list. It is optional and should not block anyone.
- **Tier ranges and salary bands are rough.** They come from two creators' experience in the Indian market and should be described as guidance only.
