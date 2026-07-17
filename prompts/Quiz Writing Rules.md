# Quiz Writing Rules — Course Content

Yeh file un sab rules ki single source of truth hai jo quiz banate waqt follow karne hain. Naya quiz banane se pehle ise padhna zaroori hai.

---

## 1. Three Question Types

Har quiz mein teen sections hote hain:

### MCQ (Multiple Choice)
- 4 options: A, B, C, D
- Exactly one correct
- **`> `** ke baad correct option + explanation
- Explanations must be thorough — batao kyun sahi hai aur kyun baaki galat hain

### TrueFalse
- Exactly two options: `- True` / `- False`
- Correct answer ke aage `> ` with explanation

### ShortAnswer
- Open-ended conceptual question
- Student khud soch ke likhta hai
- Sample answer `<details>` accordion mein chhupa hota hai
- `details` ke andar `summary` "Sample Answer" hona chahiye

---

## 2. Option Length Balance (⚠️ Most Common Mistake)

**Correct answer kabhi bhi visually obvious nahi hona chahiye.**

- Saare 4 options ki length roughly equal rakho
- Correct option ko zyada detail mat do
- Agar correct answer mein technical term hai, to distractors mein bhi technical terms do

❌ **Galat:**
```
A. index.html
B. Browser sabse pehle index.html parse karta hai aur script tag ke through React load karta hai aur fir main.tsx execute hota hai
C. App.tsx
D. package.json
```

✅ **Sahi:**
```
A. main.tsx — React entry point, yahin se component render shuru hota hai
B. index.html — browser parse karta hai, script load hota hai yahin se
C. App.tsx — root component layout define karta hai
D. package.json — dependencies aur scripts ka config file
```

Har option ko ~5-10 words ka rakho, na chhota na bada.

---

## 3. Diversion (Distractors)

Galat options ko bhi believable banado:

- **Real-sounding wrong answers** — aisi cheezein jo student soch sakta hai agar concept clear nahi hai
- **Half-truth options** — aadha sahi, aadha galat (jaise "server-side render hota hai" — component render hota hai lekin server-side nahi)
- **Swap logic** — do options mein logic ulta kar do (jaise "App.tsx main.tsx ko import karta hai")
- **Common misconceptions** — jo galti log generally karte hain

---

## 4. Question Count

Koi limit nahi. Jitne questions mein topic properly cover ho raha hai utne daalo.

General guidelines:
- **MCQ**: 8-15 questions (topic complexity par depend karta hai)
- **TrueFalse**: 4-8 questions
- **ShortAnswer**: 1-3 questions

Check: "Har important concept cover ho gaya?" → Agar haan, to count sufficient hai.

---

## 5. MCQ Option Format

Har option ka ek consistent pattern follow karo:

```
A. <statement> — <brief justification>
```

Ya:

```
A. <statement>
B. <statement>
C. <statement>
D. <statement>
```

Jo bhi pattern chuno, ek hi quiz mein consistent rakho. Statement ke andar technical details daalni hain to distractors mein bhi waisi hi detail do.

---

## 6. TrueFalse Rules

- Statement hamesha ek fact/claim hona chahiye — **opinion nahi**
- "Hot hai", "galat hai" type ke subjective words avoid karo
- Statement kaafi specific ho — vague statements ko true ya false dena mushkil hota hai
- Double negative statements avoid karo

---

## 7. ShortAnswer Rules

- Question open-ended ho — "kaise kaam karta hai", "explain karo", "compare karo"
- Yes/No mein answer na ho paaye
- Sample answer (in `<details>`) complete ho — poori explanation, example code (agar relevant ho)

---

## 8. Content Coverage

- Quiz sirf usi lecture ka content test kare — aage ya pichle topics nahi
- "We'll explore in next topic" wali cheezein quiz mein mat daalo
- Har subsection/topic jo lecture mein covered hai, usse at least ek question chhuna chahiye
- Lecture ke "In Your Own Words" wale questions se inspiration le sakte ho

---

## 9. Language & Tone

- Quiz ka language bhi Hinglish mein, lecture jaisa hi
- Explanations friendly ho — "kyun aisa hota hai" samjhao, sirf "yeh sahi hai" mat likho
- Terms jab bhi introduce karo, Hindi+English mix mein

---

## 10. Explanation Format (`> ` line)

```
> <Correct Option>. <Explanation of why correct>. <Brief note on why each wrong option is wrong>.
```

Example:
```
> B. `index.html` asli entry point hai. Browser pehle `index.html` load karta hai. A galat hai kyunki `main.tsx` React ka entry point hai browser ka nahi. C galat hai kyunki `App.tsx` root component hai entry point nahi.
```

---

## 11. Quiz File Naming Convention

```
<version> Quiz — <Short Title>.md
```

Examples:
- `1.0 Quiz — React Project Structure.md`
- `1.5 Quiz — Interface, Props, Callbacks.md`
- `1.7 Quiz — useState aur Events.md`

---

## 12. Quiz ID in Subject Config

- Quiz ID pattern: `quiz-<version>`
- Version lecture ke suffix se match karna chahiye (jaise `react-1.0` → `quiz-1.0`)
- Sub-part lectures ke liye exact sub-version match karo (jaise `react-1.5.4` → `quiz-1.5.4`)

---

## 13. Pre-Submission Checklist

```
[ ] Har concept covered hai? (lecture ke saare subsections check)
[ ] Correct answer visually obvious nahi hai? (option lengths compare karo)
[ ] Distractors believable hain? (real-sounding galat options)
[ ] Saare MCQ mein 4 options hain? (A, B, C, D — no missing)
[ ] TrueFalse mein exactly 2 options hain? (True / False)
[ ] ShortAnswer mein <details> accordion hai? (summary + answer)
[ ] Explanation (>) mein kyun correct aur kyun wrong dono hai?
[ ] Quiz file naming sahi hai? (<version> Quiz — <Title>.md)
[ ] Subject config mein quiz ID lecture suffix se match karta hai?
```
