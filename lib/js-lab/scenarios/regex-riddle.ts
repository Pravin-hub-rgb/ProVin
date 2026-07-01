import type { Scenario } from "@/lib/lab-registry"
import { executeCode } from "../engine"

export const REGEX_RIDDLE: Scenario = {
  id: "regex-riddle",
  phase: "5.8",
  title: "Regex Riddle",
  description:
    "Learn regular expressions — test patterns, extract matches, and replace text using regex.",
  steps: [
    {
      actor: "A",
      instruction:
        "Test if the string user@example.com looks like a valid email using a regex that checks for non-whitespace characters around an @ symbol with a dot. Log the result (should be true). Then test the string not-an-email with the same regex and log that result (should be false).",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        const lines = output.split("\n").filter(Boolean)
        return lines.length >= 2 && lines[0] === "true" && lines[1] === "false"
      },
      hints: [
        "Use `.test()` method: `/\\S+@\\S+\\.\\S+/.test(email)`",
        "\\S matches any non-whitespace, + means one or more, \\. matches a literal dot.",
        "Test both and log both results.",
      ],
      solution: `const emailRegex = /\\S+@\\S+\\.\\S+/
console.log(emailRegex.test("user@example.com"))  // true
console.log(emailRegex.test("not-an-email"))       // false`,
    },
    {
      actor: "A",
      instruction:
        "Given the sentence The rain in Spain falls mainly on the plain, use the match method with a regex to find all words ending with ain. Log the resulting array of matches.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === '["rain","Spain","mainly","plain"]'
      },
      hints: [
        "`\\b` is a word boundary, `\\w+` matches one or more word chars, `ain` is literal.",
        "Flags: `g` for global (find all), `i` for case-insensitive.",
        "Use `sentence.match(/\\b\\w+ain\\b/gi)` and log the result.",
      ],
      solution: `const sentence = "The rain in Spain falls mainly on the plain"
const matches = sentence.match(/\\b\\w+ain\\b/gi)
console.log(matches)`,
    },
    {
      actor: "A",
      instruction:
        "Given the string My number is 987-654-3210 and office is 123-456-7890, use the replace method with a regex to replace all phone numbers with the text [REDACTED]. Log the censored string.",
      match: (p) => {
        const parsed = p as { type: string; code: string }
        if (parsed.type !== "run") return false
        const { output, error } = executeCode(parsed.code)
        if (error) return false
        return output === "My number is [REDACTED] and office is [REDACTED]"
      },
      hints: [
        "`\\d{3}` matches exactly 3 digits, `-` is literal, `\\d{4}` matches 4 digits.",
        "The `g` flag replaces ALL occurrences, not just the first.",
        "Use: `phone.replace(/\\d{3}-\\d{3}-\\d{4}/g, \"[REDACTED]\")`",
      ],
      solution: `const phone = "My number is 987-654-3210 and office is 123-456-7890"
const censored = phone.replace(/\\d{3}-\\d{3}-\\d{4}/g, "[REDACTED]")
console.log(censored)`,    },
  ],
}
