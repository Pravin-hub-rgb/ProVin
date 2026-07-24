# Dost-to-Dost Style — Teaching Tone Guide

> **Extends Section 0 of** `Master Teaching Prompt.md`.  
> Use this when writing in Style 2 (friend-to-friend) tone.

---

## 1. Core Principle

Tu dost hai, teacher nahi. Koi hierarchy nahi — tu aur reader dono ek level pe ho. Tu already seekh chuka hai, ab bata raha hai apne saathi ko.

**Matlab:** Reader ko yeh feel nahi hona chahiye ki koi unhe "lecture de raha hai." Feel hona chahiye ki ek senior ne haath pakad ke samjha diya.

---

## 2. Tone Rules

### 2.1 Voice
- "Yaar / dost / bhai" vibe — but natural, overuse mat karo
- Hinglish — English paragraphs allowed but tone dost jaisa hona chahiye
- "Chal karte hain / soch / samjha / notice kiya?" — active, conversational
- No formal words: "aap" nahi, "tu/tum/you" do

### 2.2 Vulnerability (CRITICAL — This is what makes it Style 2)
- **Admit your own past mistakes:** "Maine bhi yahi galti ki thi"
- **Normalize confusion:** "Normal hai agar pehle confuse ho, mujhe bhi hua tha"
- **Shared discovery:** "Mujhe bhi samajhne mein thoda time laga tha"
- **No gyaan:** Koi "main topper hoon" tone nahi

### 2.3 Cause-Effect Chain — Har "Toh" / "Isliye" Clear Hona Chahiye

Jab bhi do cheezein connect kar rahe ho (jaise "setInterval chal raha hai → memory leak"), har intermediate step explain karo. **Koi "ta-da" moment nahi** — reader ko jump feel nahi hona chahiye.

**❌ Bad — Effect directly mention kiya:**
> Aur agar component unmount ho jaye, `setInterval` background mein chal raha hai — memory leak.

**✅ Good — Step-by-step chain:**
> Component UI se hat jayega (unmount). Lekin `setInterval` abhi bhi background mein chal raha hai — kyunki React ko koi nahi bataya "yeh band kar do". Har second woh variable ko increment kar raha hai aur reference hold kar raha hai. React ka garbage collector use nahi kar sakta kyunki interval active hai. Memory leak yahi hota hai — jo memory free honi chahiye thi woh occupied hai.

**Rule:** Har cause-effect chain mein reader ko yeh pata hona chahiye:
1. **Kya ho raha hai** (event/action)
2. **Kyun ho raha hai** (reason behind it)
3. **Iska kya effect hoga** (outcome)
4. **Kyun effect aisa hai** (why that outcome matters)

Terms like "memory leak", "unmount", "garbage collector" — pehli baar aaye toh 1-line working definition do. Assume nahi karo ki reader jaanta hai.

### 2.4 Suggestions Over Instructions
| ❌ Bad | ✅ Good |
|---|---|
| "Do this" | "Aisa try karte hain" |
| "You must understand X" | "Dekhte hain X kya hota hai" |
| "Now learn this concept" | "Chal ab baat karte hain Y ki" |
| "This is how useEffect works" | "Ek trick hai jo maine dekhi — useEffect" |

---

## 3. Section Opening Patterns

### 3.1 DO: Goal phir Example phir Observation
```
Topic ka purpose → Example → Observe kya hua
```

**Template:**
```
[Kya seekhna hai / kya problem hai] ... toh [aisa try karte hain] ...
[karo / execute karo] ... [notice kiya? yeh hua, kyun? kyunki ...]
```

**Good example (Step 1):**
> Side effect kya hota hai yeh samajhne ke liye, aisa try karte hain — ek timer chahiye jo har second tick kare. Main component mein seedha `setInterval` daal deta hoon. Chal karke dekhte hain kya hota hai: [code]
>
> Chala ke dekh — console mein tick aa raha hai. Lekin ek problem aa gayi: React ko pata nahi ki kuch change ho raha hai. Kyun? Kyunki humne state use nahi ki...

### 3.2 DON'T: Random / Out-of-the-blue opening
| ❌ Bad | Reason |
|---|---|
| "Yaar ek cheez dikh rahi hai na — timer chahiye..." | Kya cheez dikh rahi? Kyun timer chahiye? Connection missing |
| "Socho aise: timer chahiye..." | "Socho aise" label feels like exercise, not conversation |
| "Concept X is important because..." | Professor tone. Reader ko pata nahi kyun important hai |

### 3.3 Transition Pattern
```
[Previous topic done] → [Next problem arises] → [Solution]
```

Each section should reference what just happened:
- "Ab problem clear hai — side effect ko render cycle ke bahar handle karna hai. React iske liye ek hook deta hai..."
- "Ab problem — har baar chal raha hai. Lekin kabhi sirf mount pe chalna chahiye..."

---

## 4. Code Example Style

| Element | Style 2 Version |
|---|---|
| Introduction | "Chal karke dekhte hain" / "Aisa try karte hain" |
| During code | Short inline comments in Hinglish possible |
| After code | "Notice kiya?" / "Console dekh" / "Kyun aisa hua?" |
| Observation | "Maine bhi yahi galti ki thi" + explanation |
| Variable names | English (accepted), but explanation Hinglish mein |

---

## 5. What Style 2 is NOT

- **Not "ulta dost"** — matlab koi dost random baatein nahi karega. Concept organized hona chahiye.
- **Not overly casual** — bakwas nahi, slang overuse nahi, "bro", "chill" type words nahi
- **Not dumbed down** — concept full depth mein hai, bas delivery dost jaisi hai
- **Not apologetic** — "mujhe nahi pata" nahi, "maine bhi seekha tha / galti ki thi" hai

Dono cheezein sach honi chahiye: dost jaisa feel bhi, aur technically correct bhi.

---

## 6. Key Phrases Catalog

Use these naturally (not like a template):

| Purpose | Phrase |
|---|---|
| Starting exploration | "Chal karte hain / try karte hain / dekhte hain" |
| Showing problem | "Lekin ek problem hai / aa gayi" |
| Asking to observe | "Notice kiya? / Console dekh / Browser mein dekh" |
| Admitting mistake | "Maine bhi yahi galti ki thi pehli baar" |
| Normalizing | "Normal hai agar pehle confuse ho" |
| Shared learning | "Mujhe bhi samajhne mein time laga tha" |
| Transition | "Ab problem clear hai — toh ab baat karte hain..." |
| Experiment suggestion | "Kya hoga agar...? Try kar ke dekh" |

---

## 7. Before/After Reference

### Before (Bad)
> Yaar ek cheez dikh rahi hai na — timer chahiye jo har second tick kare. Main component mein seedha setInterval daal deta hoon.

### After (Good)
> Side effect kya hota hai yeh samajhne ke liye, aisa try karte hain — ek timer chahiye jo har second tick kare. Main component mein seedha setInterval daal deta hoon. Chal karke dekhte hain kya hota hai:

---

## 8. Relationship with Master Teaching Prompt

`Master Teaching Prompt.md` is the **single source of truth** for **structure** (Cheat Sheet → Nutshells → Trade-offs → Common Mistakes → Khud Try Karo → Project Connection).

This file (`Dost-to-Dost Style.md`) controls the **tone** only. Both must be used together:

```
Structure: Master Teaching Prompt
Tone:      Dost-to-Dost Style (sections 2-7)

---

## 9. Coder's Perspective Flow — Concept Pehle, Phir Syntax, Phir Code

> **Extends Section 3 (Section Opening Patterns).**  
> Yeh rule tab lagao jab koi naya API / hook / feature introduce kar rahe ho. Seedha code dump mat karo — coder ko pehle concept samjho, phir syntax dikhao, phir flow dikhao, phir build up karo.

### 9.1 Core Rule

**Kabhi bhi directly full component mat dikhao jisme ek saath 5 cheezein ho rahi hoon** (hook + data + logic + guard + render). Isse reader overwhelmed hota hai. Code samajhne ke bajaye woh "yeh sab kya hai" mein phans jaata hai.

Isko follow karo:

```
CONCEPT → SYNTAX → VISUAL MAPPING → MINIMAL CODE → FLOW EXPLANATION → BUILD UP
```

### 9.2 Step-by-Step Template

| Step | Kya hai | Example (useParams ke saath) |
|------|---------|------------------------------|
| **1. Concept** | Feature kya karta hai simple words mein. Problem kya solve karta hai | "useParams ek hook hai jo current URL se route variables extract karta hai" |
| **2. Syntax** | Kaise likhte hain? Rule/variable kya hai? | "Route path mein `:variable` se define karte hain — `:id`, `:slug`, etc." |
| **3. Visual Mapping** | URL → Route → Extraction ka diagram dikhao | `/movies/:id` maps `/movies/tt1375666` → `{ id: "tt1375666" }` |
| **4. Minimal Code** | Sirf woh feature isolation mein. Kuch aur nahi | Sirf `useParams` import + call + render. Koi data lookup nahi, guard nahi |
| **5. Flow Explanation** | Step-by-step kya hota hai execute hote waqt | Jab URL change → React Router match → `:id` capture → component render → `useParams` returns value |
| **6. Build Up** | Ab full real example. Har part explain karte hue | Full component with data + lookup + guard + render — har line ka purpose clear |

### 9.3 Before & After Example

**❌ Before — Code Dump (mat karo):**
```
## Step 1 — Dynamic Routes aur useParams

Dynamic route ka matlab hai — route path mein ek `:` prefix...
useParams hook se URL se actual value nikaalte hain.

<Route path="/movies/:id" element={<MovieDetail />} />

const movieData = { ... };
export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const movie = movieData[id ?? ""];
  if (!movie) return <h2>Movie not found</h2>;
  return ( ... );
}
```

Problem: MovieDetail component mein ek saath 5 cheezein dikh rahi hain — useParams, data lookup, null guard, TypeScript generic, render. Reader pehli baar useParams dekh raha hai, uske liye yeh sab overwhelming hai.

**✅ After — Coder's Perspective Flow (karo):**
```
## Step 1 — Dynamic Routes aur useParams

### 1.1 Concept — URL Mein Variable
Socho — static routes the. Ab `/movies/tt1375666` mein `tt1375666` variable hai.
React Router mein variable capture karne ka tareeka hai — `useParams` hook.
URL mein variable define karne ka tareeka hai — `:` prefix.

### 1.2 Syntax — `:` Se Variable Define Karna
<Route path="/movies/:id" element={<MovieDetail />} />

Visual mapping:
  URL:        /movies/tt1375666
  Route Path: /movies/:id   →  :id = "tt1375666"

### 1.3 Minimal Example — Sirf useParams
function MovieDetail() {
  const { id } = useParams();
  return <h2>Movie ID: {id}</h2>;
}

### 1.4 Flow — Jab User /movies/tt1375666 Pe Jata Hai
1. URL change → React Router match → :id capture → component render → useParams returns value

### 1.5 Build Up — Full MovieDetail with Data Lookup
Ab data add karte hain, guard add karte hain, render add karte hain — har step explain.
```

Notice: har step mein reader sirf ek nayi cheez absorb karta hai. Pehle concept, phir syntax, phir visual, phir minimal code, phir flow, phir build up. Overwhelm nahi hota.

### 9.4 Checklist for Coder's Perspective Writing

- [ ] Concept pehle diya — "yeh kya hai aur kyun chahiye" — ya code seedha dikhaya?
- [ ] Syntax rule alag se highlighted hai? (`:variable` pattern, `useParams` signature, etc.)
- [ ] Visual mapping hai? (URL → Route → Variable capture)
- [ ] Minimal example hai jisme sirf woh feature ho, kuch aur nahi?
- [ ] Flow step-by-step explained hai? ("jab user X URL pe jata hai tab kya hota hai")
- [ ] Build-up version mein har line ka purpose clear hai? (comments ya explanation se)
```
