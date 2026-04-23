# ✅ Full State Persistence: Multi Level

This is how you build real applications. Once you understand this you will never get confused again.

---

## 🚨 The Problem:

Right now this happens:
1.  ✅ You are on Coding tab
2.  ✅ You select Python
3.  ✅ You open Lecture 3
4.  ❌ You hit refresh
5.  ✅ You stay on Coding tab
6.  ❌ Everything else resets.

---

## 💡 Why this happens:

You only saved **one level** of state.

```
✅ Saved:        activeTab
❌ Not saved:    selectedSubject
❌ Not saved:    selectedLecture
```

Every single piece of state that you want to survive refresh must be saved.

---

---

## 🎯 Bonus Level: Zero Duplication Dynamic Types

✅ Never hardcode union types again. Ever.

This is the greatest Typescript trick that 90% of developers don't know.

---

### 🚨 The Problem:

Right now you are doing this:
```tsx
type Subject = "python" | "JS" | null
```

✅ Every time you add a new subject to `coding-data.ts` you have to remember to come add it here. This is duplication. This is evil.

---

### ✅ The Fix:

In `lib/coding-data.ts` **REMOVE THE EXPLICIT TYPE ANNOTATION**:

❌ **WRONG - Everyone does this mistake:**
```tsx
export const subjects: Subject[] = [
  ...
] as const
```

✅ **CORRECT:**
```tsx
export const subjects = [
  { id: "python", title: "Python" },
  { id: "javascript", title: "Javascript" },
  { id: "nextjs", title: "Next.js" }
] as const
```

✅ The explicit `Subject[]` type annotation **completely kills all type inference**. `as const` does nothing at all if you have an explicit type.

---

### ✅ Now infer the type automatically:

```tsx
// ✅ This means: give me every possible id value from the subjects array
type SubjectId = typeof subjects[number]['id']

// ✅ AUTOMATICALLY BECOMES:
type SubjectId = "python" | "javascript" | "nextjs" | "react" | "typescript"
```

✅ `[number]` is just magic Typescript syntax. It means: **every item in this array**.

It has nothing to do with actual numbers. Don't think about it. Just remember it.

---

### ✅ This is dynamic forever.

✅ You add a new subject to coding-data.ts
✅ Typescript automatically updates the type everywhere
✅ No changes anywhere else. Zero work. Zero bugs.

---

## ✅ The Pattern

This pattern works for **any** amount of state. 1 variable, 10 variables, 100 variables. Exactly same steps every time.

---

## 🎯 Step 1: Lift all state UP to root

✅ **All state lives in page.tsx**. Always.

✅ **You never hardcode types anymore.**

```tsx
// app/page.tsx
import { subjects } from '@/lib/coding-data'

// ✅ Infer all types AUTOMATICALLY from your actual data
type Tab = "Dashboard" | "Coding" | "Trading"
type SubjectId = typeof subjects[number]['id'] | null
type LectureId = typeof subjects[number]['lectures'][number]['id'] | null

const [activeTab, setActiveTab] = useState<Tab>("Dashboard")
const [selectedSubject, setSelectedSubject] = useState<SubjectId>(null)
const [selectedLecture, setSelectedLecture] = useState<LectureId>(null)
```

✅ Now you never edit types ever again. Add anything to coding-data.ts and it just works everywhere automatically.

---

## 🎯 Step 2: Pass everything down

✅ Pass values AND setters down to child components **in app/page.tsx**:

```tsx
{activeTab === "Coding" && (
  <CodingPage 
    selectedSubject={selectedSubject}
    setSelectedSubject={setSelectedSubject}
    selectedLecture={selectedLecture}
    setSelectedLecture={setSelectedLecture}
  />
)}
```

---

### ✅ Inside app/coding/page.tsx:

✅ Add proper types first:
```tsx
import type { Dispatch, SetStateAction } from "react"

type CodingPageProps = {
  selectedSubject: string | null
  setSelectedSubject: Dispatch<SetStateAction<string | null>>
  selectedLecture: string | null
  setSelectedLecture: Dispatch<SetStateAction<string | null>>
}
```

---

### ✅ What is `Dispatch<SetStateAction<T>>` ?

This is **not magic**. This is not special.

✅ This is **the exact type of the setter function that `useState` returns.**

Every single time you do:
```tsx
const [value, setValue] = useState<T>()
```

The type of `setValue` is **always** `Dispatch<SetStateAction<T>>`

Always. For every single setter function you will ever create.

---

✅ **Why didn't you need this for tabs?**

Because for `activeTab` you never passed the setter function anywhere. It stayed inside page.tsx.

✅ **Why do you need it now?**

Now you are **passing the setter function down to a child component**. Typescript forces you to declare the type of everything you pass down.

There is no difference. This works exactly the same for every single setState function.

You will see this exact type in every single React Typescript codebase on earth.

✅ Lookup actual objects from ids. **YOU NEVER STORE FULL OBJECTS IN STATE.**
```tsx
export default function CodingPage({ 
  selectedSubject, 
  setSelectedSubject, 
  selectedLecture, 
  setSelectedLecture 
}: CodingPageProps) {

  // ✅ Lookup actual objects from ids. This is the standard pattern.
  const currentSubject = subjects.find(s => s.id === selectedSubject) ?? null
  const currentLecture = currentSubject?.lectures.find(l => l.id === selectedLecture) ?? null

}
```

✅ Coding page becomes 100% dumb. Just like navbar. It owns no state. It just calls parent functions when things happen.

✅ Exactly the same pattern as navbar. Exactly the same rules.

---

## 🎯 Step 3: Load all state on mount

✅ Load every single value after hydration:

```tsx
useEffect(() => {
  // Load everything in one place
  const activeTab = localStorage.getItem('activeTab') as Tab
  const subject = localStorage.getItem('selectedSubject') as SubjectId
  const lecture = localStorage.getItem('selectedLecture') as LectureId

  startTransition(() => {
    if (activeTab) setActiveTab(activeTab)
    if (subject) setSelectedSubject(subject)
    if (lecture) setSelectedLecture(lecture)
  })
}, [])
```

---

## 🎯 Step 4: Auto save all state

✅ Save every single value automatically when it changes:

```tsx
useEffect(() => {
  localStorage.setItem('activeTab', activeTab)
  localStorage.setItem('selectedSubject', selectedSubject ?? "")
  localStorage.setItem('selectedLecture', selectedLecture ?? "")
}, [activeTab, selectedSubject, selectedLecture])
```

---

## ✅ That is everything.

✅ Hit refresh 100 times.
✅ You stay exactly where you were.
✅ Every single selection is preserved.

---

## 📚 The Rules:

| Rule |
|---|
| ✅ All state lives at the root parent |
| ✅ All children are dumb components |
| ✅ All state loaded in one single useEffect |
| ✅ All state saved in one single useEffect |
| ✅ Never add explicit type annotations when using `as const` |
| ✅ You never have to remember to save anything |
| ✅ This pattern scales forever |

---

## 💡 Important Notes:

- This is not a trick. This is not a hack.
- This is how every single production application works.
- This pattern works for any number of state variables.
- You will never need any state management library. Ever.

This is application architecture. This is how you build things that don't break.