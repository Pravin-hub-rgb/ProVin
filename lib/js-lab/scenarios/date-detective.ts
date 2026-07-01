import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const DATE_DETECTIVE: Scenario = {
  id: "date-detective",
  phase: "5.3",
  title: "Date Detective",
  description:
    "Learn to work with Date objects — create dates, extract components, and calculate differences.",
  steps: [
    {
      actor: "A",
      instruction:
        "Create a Date object for July 1, 2026. Use the getter methods to extract and log the year, month (remember months are 0-indexed), and date (day of month).",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 3 && lines[0] === "2026" && lines[1] === "6" && lines[2] === "1"
      },
      solution: `const d = new Date(2026, 6, 1)  // Month is 0-indexed, so 6 = July
console.log(d.getFullYear())
console.log(d.getMonth())    // 6 (July)
console.log(d.getDate())     // 1`,
      hints: [
        "Create: `const d = new Date(2026, 6, 1)` — month 6 is July (0-indexed: 0=Jan).",
        "Extract: `d.getFullYear()`, `d.getMonth()`, `d.getDate()`",
        "Log all three in order.",
      ],
    },
    {
      actor: "A",
      instruction:
        "Create two Date objects: one for January 1, 2026 and another for December 31, 2026. Calculate the difference in days between them. (Hint: subtract dates to get milliseconds, then convert). Log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "364"
      },
      solution: `const d1 = new Date(2026, 0, 1)   // Jan 1
const d2 = new Date(2026, 11, 31)  // Dec 31
const diffMs = d2 - d1             // Milliseconds between dates
const diffDays = diffMs / (1000 * 60 * 60 * 24)
console.log(diffDays)`,
      hints: [
        "Subtracting dates gives milliseconds: `d2 - d1`",
        "Convert to days: divide by `1000 * 60 * 60 * 24`",
        "Jan 1 to Dec 31 of same year = 364 days (not a leap year in 2026).",
      ],
    },
    {
      actor: "A",
      instruction:
        "Create a function called formatDate that takes a Date and returns a formatted string like July 1, 2026. Use an array of month names. Test it with a Date for July 1, 2026 and log the result.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "July 1, 2026"
      },
      solution: `const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function formatDate(date) {
  return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
}

console.log(formatDate(new Date(2026, 6, 1)))`,
      hints: [
        "Create `const months = [\"January\", \"February\", ..., \"December\"]`",
        "Access: `months[date.getMonth()]` gives the month name.",
        "Return template literal: `` return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` ``",
      ],
    },
  ],
}
