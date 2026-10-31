# Operating Systems — Interview Prep (Deep Dive)

> Target: Full-stack developer roles, Gurgaon, 5–30 LPA range
> Context: This is the lowest priority subject for full-stack roles (asked less than DBMS/CN), so this file keeps depth a bit lower — just what's commonly asked. No GATE-level detail needed.

---

## 1. Process vs Thread (Most common question in this subject)

**Process**: An independently running program — has its own memory space.

**Thread**: A lightweight execution unit running inside a process — threads of the same process **share** memory.

| | Process | Thread |
|---|---|---|
| Memory | Own separate memory space | Shares memory with the process |
| Creation cost | Heavy (uses more resources) | Light (created fast) |
| Communication | Slow (IPC — Inter-Process Communication needed) | Fast (due to shared memory) |
| Crash impact | One process crashing doesn't affect others | One thread crashing can affect the whole process |

**Real-world analogy**: Process = a whole house. Thread = separate rooms inside the house sharing the same resources (kitchen, bathroom).

**Node.js angle (your direct context)**: Node.js is **single-threaded** (for main JS execution), but uses a **libuv thread pool** in the background for heavy I/O operations (file read, crypto). You can mention this in interviews if the Node.js concurrency model comes up.

---

## 2. Deadlock

**What it is**: Two (or more) processes are waiting for each other's resource to be released, and no one releases — everyone gets stuck forever.

**Real example**: Process A has Resource 1, needs Resource 2 (held by Process B). Process B has Resource 2, needs Resource 1 (held by Process A). Both stuck in infinite wait.

### 4 Conditions for Deadlock (all must hold together for deadlock to occur)

1. **Mutual Exclusion**: A resource can be used by only one process at a time
2. **Hold and Wait**: A process holds one resource and waits for another
3. **No Preemption**: A resource cannot be forcefully taken away; the process releases it itself
4. **Circular Wait**: Processes wait for each other in a circular chain

**Prevention (one-liner, not deep)**: Break any one of these 4 conditions — like requesting resources in a fixed order (prevents circular wait).

**How deep in interviews**: Just the deadlock definition + real example + the 4 condition names is enough. Prevention algorithms (Banker's algorithm etc.) are rarely asked in full-stack roles.

---

## 3. Memory Management (Basics)

**What it is**: The OS decides which program uses how much memory (RAM), and when.

### Key concepts (name + one-liner)

- **Virtual Memory**: The OS makes each process feel like it has all the memory (isolated), while managing things behind the scenes — if RAM runs short, disk (swap space) is used.
- **Paging**: Dividing memory into fixed-size blocks (pages), to make management easier and reduce fragmentation.
- **Fragmentation**: Small unused gaps forming in memory that can't be used — two types: **internal** (waste space inside an allocated block) and **external** (gaps between blocks).

**How deep in interviews**: Just "what is virtual memory" and "why do we page" — one-liner level. Deep OS internals aren't covered in full-stack roles.

---

## 4. Process States (Quick overview)

A process goes through these states during its lifetime:

**New → Ready → Running → Waiting → Terminated**

- **New**: Process being created
- **Ready**: Ready to execute, waiting for CPU
- **Running**: CPU is currently executing it
- **Waiting**: Waiting for some I/O operation or event
- **Terminated**: Execution complete

**How deep in interviews**: Just the diagram/flow is enough.

---

## 5. Context Switching (Quick, one-liner level)

**What it is**: When the CPU switches from one process/thread to another — it saves the current process's state (registers, memory pointers) and loads the new process's state.

**Why it matters**: This creates overhead — too much context switching (like too many threads) can slow down performance.

---

## 6. CPU Scheduling (Just remember names, algorithms not deep)

The OS decides which process runs on the CPU when:

- **FCFS** (First Come First Serve) — whoever arrives first runs first
- **SJF** (Shortest Job First) — shortest job first
- **Round Robin** — each process gets a fixed time slice, then next process

**How deep in interviews**: Full-stack roles rarely ask this — just knowing the names is enough. If asked, "Round Robin is common in time-sharing systems, where fairness matters" is enough to say.

---

## Quick Revision Checklist (before interview)

- [ ] Process vs Thread — table difference + Node.js single-thread + libuv angle
- [ ] Deadlock — definition + real example + 4 condition names
- [ ] Virtual memory + paging — one-liner
- [ ] Process states — 5 states flow
- [ ] Context switching — one-liner
- [ ] CPU scheduling algorithms — just names (FCFS, SJF, Round Robin)

---

## Practice Approach

1. This is the lowest priority subject — if time is tight with DSA/project, compress/skip this first compared to the other 3 subjects (DBMS, OOP, CN).
2. Just Process vs Thread and Deadlock — these two topics get asked the most in full-stack interviews. Keep the rest (memory management, scheduling) at "one-liner ready" level.
3. Node.js's concurrency model (single-threaded + event loop + libuv) connects both OS and JavaScript — practicing from this angle gives extra benefit since it ties to your daily work.

---

**All 4 subjects (DBMS, OOP, CN, OS) complete.** When ready, tell me — we can do a mock interview round covering all subjects together, or focus back on the DSA roadmap.