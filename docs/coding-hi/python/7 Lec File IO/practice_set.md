# Lec 7 - File IO — Practice Set

> **Rule:** Solutions tabhi dekho jab saare questions attempt kar liye hon. Warna tum copy karoge, seekhoge nahi. Galat answer sahi hone se behtar hai — wo dikhata hai ki kahan atka.

Har question ka answer notes.md ke concepts use karke likhna hai. Koi starter code nahi diya — tumhe khud sochna padega.

---

## Level 1 — Basics

### Q1. Ek line likho
`output.txt` naam ki file me `Hello, World!` likho. Fir file kholke check karo ki sach me likha gaya ya nahi.

**Hint:** `"w"` mode use karo.

---

### Q2. 5 lines likho
`numbers.txt` me 1 se 5 tak numbers **har ek alag line pe** likho.

**Hint:** Loop + `write` + `\n`.

---

### Q3. File padho
`numbers.txt` (jo tumne abhi banaya) padho aur har line print karo.

**Hint:** `for line in file:` — aur dhyan rakhna, `line` me kuch extra hota hai.

---

### Q4. Line count
`numbers.txt` me kitni lines hain — count karke print karo.

**Hint:** Ek counter variable. Har line pe badhao.

---

### Q5. Word count
`notes.txt` naam ki file me kuch text likho (3-4 lines), fir us file ke **total words** count karke print karo.

**Hint:** `line.split()` — space ke hisaab se tod deta hai list me.

---

## Level 2 — Modes aur read/write

### Q6. Append test
Ye program **3 baar** chalao:
```python
with open("log.txt", "a") as file:
    file.write("entry\n")
```
Ab `log.txt` me kitni lines hain? Ab same program `"w"` mode ke saath chalao — ab kitni lines hain? Do numbers note karo aur samjhao kya hua.

---

### Q7. Overwrite vs append
`data.txt` me `"Hello"` likho. Fir `"a"` mode se `" World"` jodo. Fir `"w"` mode se `"Bye"` likho. **Har step ke baad file ka content dekho** aur 3 steps ka output ek saath likho.

---

### Q8. write vs append in one file
Ek aisa banao jo har run me ek line jodo, lekin **pehli line header ho** (jaise `count,value`). Pehli run me sirf header aaye, aage ke runs me nayi lines jadte jaye.

**Hint:** `"a"` mode hi chahiye. Pehli baar ke liye alag se handle kar lo.

---

### Q9. Copy a file
`source.txt` ka content `copy.txt` me nayi file me copy karo — bina `shutil` use kiye. Sirf Python ke file operations se.

**Hint:** source ko `"r"` se padho, dest ko `"w"` se likho.

---

### Q10. Reverse lines
`names.txt` me 5 naam likho (alag alag lines me). Fir un lines ko **ulta order** me print karo — bina file me badle.

**Hint:** `readlines()` ya list bana ke `sorted(lines, reverse=True)`.

---

## Level 3 — CSV

### Q11. students.csv parse karo
Ye CSV hai (already tere `code/` folder me hai):
```
Harry,Gryffindor
Hermione,Gryffindor
Ron,Gryffindor
Draco,Slytherin
```
Har line padho aur print karo: `Harry is in Gryffindor`

---

### Q12. Students count by house
Upar wala CSV padho aur print karo:
- `Gryffindor: 3`
- `Slytherin: 1`

**Hint:** Ek dict banao jisme house naam = key, count = value. `get()` ya default use karo.

---

### Q13. Sirf ek house ke students
CSV padho aur sirf `Gryffindor` ke students print karo.

---

### Q14. Apna CSV banao
Ek `grades.csv` banao jisme 5 students ke data ho:
```
name,subject,marks
```
Phir use padho aur **har subject ka average marks** calculate karke print karo.

**Hint:** Subject ke hisaab se marks collect karo (dict + list), phir `sum()/len()`.

---

## Level 4 — Thoda mushkil

### Q15. Line number ke saath
`numbers.txt` padho aur `1. Harry` `2. Hermione` aise number ke saath print karo.

---

### Q16. Word ki frequency
`text.txt` me ek paragraph likho. Fir **har word kitni baar aaya** ye count karke print karo (top 5 shabd).

**Hint:** Dict use karo — `count[word] = count.get(word, 0) + 1`

---

### Q17. Data validate karo
`emails.txt` me 6 email addresses likho, jisme 2 galat (missing `@`) hon. File padho aur **sirf valid emails** list me daalke valid.txt me likho, aur kitne invalid the wo print karo.

**Hint:** `"@" in line` check kaafi hai iske liye.

---

### Q18. CSV se CSV
`students.csv` padho aur ek nayi file `slytherin.csv` me sirf Slytherin ke students likho.

---

### Q19. Line trim + filter
`messy.txt` banao jisme kuch lines ke aage-peeche extra spaces hon, aur kuch blank lines hon. File padho aur **blank lines chhodke, trimmed lines** print karo.

**Hint:** `line.strip()` — aur check karo `if line:` (empty string falsy hoti hai Python me)

---

### Q20. Ek line ka data bana do
Ye ek hi line me 2 chizein hai:
```python
with open("data.txt", "w") as file:
    file.write("alpha\nbeta\n")
```
ab `read()` se padho aur `readlines()` se padho — dono ka **result alag kyun** hai? Dono ka actual output likh ke samjhao.

---

## Challenge (optional, agar time bache)

### C1. Student pass/fail report
`grades.csv` padho (Q14 wala format). Har student ke marks ke basis pe:
- 40+ = Pass, warna Fail
Ek `report.txt` me likho: `Harry: 85 (Pass)`

**Hint:** CSV se 2 columns (name, marks) nikaalne ke liye `line.rstrip().split(",")` use karo aur last element lo.

---

### C2. Binary concept samajho
Ye code chala ke dekho:
```python
with open("test.txt", "w") as file:
    file.write("abc")
with open("test.txt", "r") as file:
    data = file.read()
print(len(data))
```
`len(data)` kya aayega — 3 ya 6? Aur `"abc"` ke bajaye ek non-ASCII character jaise "é" likh ke dobara check karo. Farak kyun aaya?

**Hint:** "é" ko encode karne me 2 bytes lagte hain.

---

### C3. Merge two files
`a.txt` aur `b.txt` dono me lines hain. Ek `merged.txt` banao jisme **dono ki saari lines** ho — `a.txt` ki pehle, phir `b.txt` ki. Dono files ke naam hi list me hain, loop chala ke handle karo.

**Hint:** `["a.txt", "b.txt"]` list pe loop. Har file ko `"a"` mode se kholo — taaki pehli wali na mike.