# React Learning Platform — Agent Guidance Doc

Yeh file poore platform ka technical spec hai. Agent isko follow karega jab bhi
koi naya concept (doc + lab) build karna ho, ya platform ka koi infra part
banana ho.

---

## 0. Project Kya Hai (One Line)

Ek free, public, no-login learning platform — React.js (TypeScript ke saath)
seekhne ke liye. Har concept ka ek **doc** (padhne ke liye) aur ek **lab**
(TypeScript mein live practice karne ke liye, in-browser sandbox) hota hai.

No database, no auth, no user accounts. Poora platform static content
(MDX files + lab scenario files) se generate hota hai.

---

## 1. Tech Stack — Final Decisions

| Layer | Tool | Reason |
|---|---|---|
| Framework | Next.js (existing app ka part) | Already project mein use ho raha hai |
| Doc content | **MDX** (`.mdx` files) | Markdown + JSX embed ki flexibility — plain markdown se better |
| Lab / Sandbox | **Sandpack** (`@codesandbox/sandpack-react`) | react.dev, tailwindcss.com production mein use karte hain. File explorer + editor + live preview + Tailwind template sab built-in |
| Lab code language | **TypeScript** (`react-ts` Sandpack template) | Course TypeScript-first hai, isliye lab bhi `.tsx` files honge, `useState<T>` type hoga na ki plain JS |
| Test/Validation runner | **Sandpack ka built-in test setup** (Vitest + React Testing Library, browser mein hi chalta hai) | Koi backend/server nahi chahiye. Actual rendered DOM check hota hai, code ka raw text nahi |
| Hosting | Vercel free tier | No DB, static-ish content — free tier ke liye perfectly fit, scale hone pe bhi cost nahi badhega |

**Important:** No login/tracking ka matlab hai koi progress save nahi hoga
server pe. Yeh intentional hai — scope simple rakhne ke liye.

---

## 2. Content Folder Structure

Har concept apne folder mein — doc aur lab hamesha saath, same naam se:

```
content/react/
  module-0/
    0.1-virtual-dom/
      doc.mdx                (sirf doc — Module 0 mein koi lab nahi hai)
    0.2-jsx-compilation/
      doc.mdx
    ...

  batch-1/
    1.1-jsx-components/
      doc.mdx
      lab.ts                 (Sandpack scenario config)
      lab.test.tsx           (validation tests jo lab ke against chalenge)
    1.5-usestate-counter/
      doc.mdx
      lab.ts
      lab.test.tsx
    ...

  combined-projects/
    todo-app-v1/
      doc.mdx
      lab.ts
      lab.test.tsx
```

Rule: agar concept **sirf conceptual/samajhne wala** hai (jaise Module 0 ke
Virtual DOM, Fiber Architecture) → sirf `doc.mdx`, koi lab nahi.
Agar concept **hands-on/mini-project** wala hai (Batch 1 onwards) → `doc.mdx`
+ `lab.ts` + `lab.test.tsx` teeno honge.

---

## 3. Routes

```
/course/react/[batch]/[concept-slug]              → Doc page (renders doc.mdx)
/course/react/[batch]/[concept-slug]/practice     → Lab page (Sandpack + tests)
```

Doc page ke end mein ek **"Practice Karo →"** button hota hai jo `/practice`
route pe navigate karta hai. Doc aur lab **alag pages** hain (same page
split-view nahi) — yeh confirmed decision hai.

---

## 4. Lab Scenario File Format (`lab.ts`)

```typescript
export const USESTATE_COUNTER_LAB = {
  id: "1.5-usestate-counter",
  title: "Counter with useState",
  template: "react-ts",              // Sandpack TypeScript template

  instructions: `
    Ek counter component banao jisme:
    - Ek number dikhe (starting 0 se)
    - +1 button, -1 button, aur Reset button ho
  `,

  starterFiles: {
    "/App.tsx": `export default function App() {
  // Yahan se shuru karo
  return <div>Counter yahan banega</div>;
}`,
  },

  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`,
  },
};
```

---

## 5. Validation / Checking Approach (Important — Concept Type Ke Hisaab Se Alag)

Do tarah ke concepts hain, aur unki checking ka tareeka alag hoga:

### Type A — Logic/Behavior concepts (state, events, conditionals, hooks)
Check karo ki **behavior** sahi hai — code ka exact syntax match nahi karna.

```typescript
// lab.test.tsx example
test("increment button badhata hai count ko", () => {
  render(<App />);
  const incrementBtn = screen.getByText("+1");
  fireEvent.click(incrementBtn);
  expect(screen.getByText("1")).toBeInTheDocument();
});
```

### Type B — Structural styling concepts (Tailwind layout — Batch 4)
Code ka text/class-name check **nahi** karna (kyunki `rounded-lg` vs
`rounded-xl` dono sahi ho sakte hain). Iske bajaye **computed style** check
karo:

```typescript
test("card rounded corners aur shadow ke saath hai", () => {
  render(<App />);
  const card = screen.getByTestId("profile-card");
  const styles = getComputedStyle(card);
  expect(parseFloat(styles.borderRadius)).toBeGreaterThan(0);
  expect(styles.boxShadow).not.toBe("none");
});
```

### Type C — Pure aesthetic/pixel-level cheezein
Yeh automate **nahi** karna. Iske liye sirf:
- Ek checklist do (manual self-check points)
- Solution reveal button do — jisse compare kar sake
- Koi forced pass/fail nahi

**Rule of thumb:** Agar check "kya yeh sahi kaam karta hai" hai → automate
karo (Type A/B). Agar check "kya yeh achha dikhta hai" hai → automate mat
karo (Type C), sirf guide karo.

---

## 6. Per-Concept Build Workflow (Agent Isko Follow Karega)

Har concept ke liye, is order mein:

1. **`doc.mdx` likho** — Master Teaching Prompt follow karke (Soch → Kyun →
   Concept/Syntax → Code (gradual) → Test). Yeh alag file hai, uska poora
   format wahi document define karta hai.
2. **`lab.ts` banao** — starter code (bilkul minimal/incomplete) + solution
   code + instructions text
3. **`lab.test.tsx` banao** — us concept ke expected behavior/structure ko
   test karne wale assertions (Section 5 ke rules follow karke — Type A ya
   Type B, jo bhi applicable ho)
4. **Locally verify karo** — doc render ho raha hai sahi se? Lab mein
   starter code load ho raha hai? Test solution code ke against pass ho raha
   hai (sanity check)?
5. Agla concept — isi order mein repeat

**Ek baar mein ek hi concept ka pura pipeline (doc+lab+test) complete karo,
phir agla shuru karo.** Saare docs pehle, saare labs baad mein — aisa nahi
karna, kyunki isse beech mein architecture mismatch pakadne mein der lagegi.

---

## 7. Syllabus Reference

Poora syllabus (Module 0 se Capstone tak, saare batches, saare concepts,
saare mini-projects) is agent ke paas already available hai as reference
(React Final Roadmap document). Yeh guidance doc sirf **kaise banana hai**
define karta hai — **kya banana hai** ke liye syllabus doc dekho.

Starting point: **Batch 1 - A: JSX + Functional Components** (Profile Card
mini-project), kyunki yeh sabse simple/static hai, koi state/logic nahi —
pipeline ko end-to-end test karne ke liye best pehla concept hai.

---

## 8. Cheezein Jo Is Doc Se Bahar Hain (Dusri Files Dekho)

- **Doc content kaise likhna hai (tone, style, gradual reveal, problem-first
  etc.)** → Master Teaching Prompt file dekho, yeh alag hai
- **Kya-kya concepts/projects poore course mein hain** → React Final Roadmap
  (syllabus) dekho
- Yeh file sirf **technical/platform architecture** define karti hai