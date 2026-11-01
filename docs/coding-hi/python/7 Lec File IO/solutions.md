# Lec 7 - File IO — Solutions

> **Dhyan rakh:** Ye answers reference ke liye hain. Pehle `practice_set.md` ke saare questions khud attempt karo. Phir yahan aakar compare karo.
>
> Agar tumhara answer alag hai par **kaam kar raha hai** — to tum sahi ho. Python me ek se zyada tarike hote hain.

---

## Level 1 — Basics

### Q1. Ek line likho

```python
with open("output.txt", "w") as file:
    file.write("Hello, World!")
```

`"w"` mode naya file banata hai ya purana overwrite karta hai. Check karne ke liye `open("output.txt").read()` chalao.

---

### Q2. 5 lines likho

```python
with open("numbers.txt", "w") as file:
    for i in range(1, 6):
        file.write(f"{i}\n")
```

**Dekh raha hai `\n`** — har line ke baad newline. Bina iske sab ek line me chipak jayenge.

---

### Q3. File padho

```python
with open("numbers.txt") as file:
    for line in file:
        print(line.rstrip())
```

`rstrip()` isliye ki `line` ke end me `\n` hota hai. Bina iske print me extra gap dikhta.

---

### Q4. Line count

```python
count = 0
with open("numbers.txt") as file:
    for line in file:
        count += 1
print(f"Total lines: {count}")
```

---

### Q5. Word count

```python
with open("notes.txt", "w") as file:
    file.write("Python is easy to learn\n")
    file.write("Practice makes it better\n")

count = 0
with open("notes.txt") as file:
    for line in file:
        count += len(line.split())
print(f"Total words: {count}")
```

`split()` (bina argument) whitespace ke hisaab se todta hai — spaces, tabs, newlines sab. Isliye `line.split()` sahi hai, `line.split(" ")` nahi (usme `\n` bhi ek "word" ban jayega).

---

## Level 2 — Modes aur read/write

### Q6. Append test

```
"a" mode, 3 baar chalaya  →  3 lines
"w" mode, 1 baar chalaya   →  1 line
```

**Kya hua:** `"a"` file ke end me nayi line jodta hai, purana data safe rehta hai. `"w"` file kholte hi purana content truncate kar deta hai — chahe tum ek line likho ya kuch bhi na likho. `"w"` ke baad file me sirf naya content hota hai.

---

### Q7. Overwrite vs append

```python
# Step 1
with open("data.txt", "w") as file:
    file.write("Hello")
# -> content: Hello

# Step 2
with open("data.txt", "a") as file:
    file.write(" World")
# -> content: Hello World

# Step 3
with open("data.txt", "w") as file:
    file.write("Bye")
# -> content: Bye
```

**Step 3 me `Hello World` permanently mita.** Isliye jab tak pakka reason na ho, `"a"` use karo.

---

### Q8. Header + append

```python
import os

if not os.path.exists("sales.csv"):
    with open("sales.csv", "w") as file:
        file.write("item,amount\n")

with open("sales.csv", "a") as file:
    file.write("chai,20\n")
    file.write("samosa,15\n")
```

`os.path.exists()` se check kar rahe hain ki file pehle se hai ya nahi. Pehli baar header likhenge (`"w"`), aage sirf append karenge (`"a"`).

---

### Q9. Copy a file

```python
with open("source.txt") as src, open("copy.txt", "w") as dst:
    for line in src:
        dst.write(line)
```

Ek hi line me do `with` statements — dono files ka reference ek saath. Dhyan rahe: `dst` ko `"w"` (nayi file bana), `src` ko `"r"`.

---

### Q10. Reverse lines

```python
with open("names.txt") as file:
    lines = file.readlines()

for line in sorted(lines, reverse=True):
    print(line.rstrip())
```

`sorted(..., reverse=True)` matlab Z se A. `rstrip()` taaki newline na dikhe.

---

## Level 3 — CSV

### Q11. students.csv parse karo

```python
with open("students.csv") as file:
    for line in file:
        name, house = line.rstrip().split(",")
        print(f"{name} is in {house}")
```

Flow: line padhi → `rstrip()` se `\n` hata → `split(",")` se list → unpacking se `name` aur `house`.

---

### Q12. Students count by house

```python
counts = {}

with open("students.csv") as file:
    for line in file:
        name, house = line.rstrip().split(",")
        counts[house] = counts.get(house, 0) + 1

for house, count in counts.items():
    print(f"{house}: {count}")
```

**Output:**
```
Gryffindor: 3
Slytherin: 1
```

`counts.get(house, 0)` ka matlab — agar house pehle se dict me hai to uski value lo, warna `0` se shuru karo. Phir `+ 1` karke badha do.

---

### Q13. Sirf ek house ke students

```python
with open("students.csv") as file:
    for line in file:
        name, house = line.rstrip().split(",")
        if house == "Gryffindor":
            print(name)
```

---

### Q14. Apna CSV banao + average

```python
with open("grades.csv", "w") as file:
    file.write("name,subject,marks\n")
    file.write("Harry,Maths,85\n")
    file.write("Harry,Science,78\n")
    file.write("Ron,Maths,60\n")
    file.write("Ron,Science,90\n")
    file.write("Draco,Maths,45\n")
    file.write("Draco,Science,52\n")

subjects = {}

with open("grades.csv") as file:
    for line in file:
        parts = line.rstrip().split(",")
        if parts[0] == "name":
            continue
        name, subject, marks = parts
        marks = int(marks)
        if subject not in subjects:
            subjects[subject] = []
        subjects[subject].append(marks)

for subject, marks in subjects.items():
    avg = sum(marks) / len(marks)
    print(f"{subject}: {avg:.2f}")
```

**Output:**
```
Maths: 63.33
Science: 73.33
```

`if parts[0] == "name": continue` — header line skip karne ke liye. Bina iske `int("marks")` crash kar dega.

---

## Level 4 — Thoda mushkil

### Q15. Line number ke saath

```python
with open("numbers.txt") as file:
    for i, line in enumerate(file, start=1):
        print(f"{i}. {line.rstrip()}")
```

`enumerate(iterable, start=1)` — index deta hai aur 1 se shuru karta hai. Zero se nahi chahiye isliye `start=1`.

---

### Q16. Word ki frequency

```python
with open("text.txt", "w") as file:
    file.write("python is easy and python is fun\n")
    file.write("python code is python fun\n")

counts = {}
with open("text.txt") as file:
    for line in file:
        for word in line.split():
            counts[word] = counts.get(word, 0) + 1

for word, count in sorted(counts.items(), key=lambda x: x[1], reverse=True)[:5]:
    print(f"{word}: {count}")
```

**Output:**
```
python: 4
is: 3
fun: 2
easy: 1
and: 1
```

`sorted(counts.items(), key=lambda x: x[1], reverse=True)` — items me `(word, count)` tuples hote hain. `key=lambda x: x[1]` matlab count ke hisaab se sort karo. Phir `[:5]` se top 5.

---

### Q17. Data validate karo

```python
with open("emails.txt", "w") as file:
    file.write("harry@gmail.com\n")
    file.write("ron@gmail.com\n")
    file.write("draco_at_gmail.com\n")
    file.write("hermione@gmail.com\n")
    file.write("malfoy_gmail.com\n")
    file.write("chochang@gmail.com\n")

valid = []
invalid = 0

with open("emails.txt") as file:
    for line in file:
        email = line.rstrip()
        if "@" in email:
            valid.append(email)
        else:
            invalid += 1

with open("valid.txt", "w") as file:
    for email in valid:
        file.write(f"{email}\n")

print(f"Valid: {len(valid)}, Invalid: {invalid}")
```

**Output:** `Valid: 4, Invalid: 2`

---

### Q18. CSV se CSV

```python
with open("students.csv") as src, open("slytherin.csv", "w") as dst:
    for line in src:
        name, house = line.rstrip().split(",")
        if house == "Slytherin":
            dst.write(f"{name},{house}\n")
```

Do files ek saath khul rahe hain — ek read (`"r"` default), ek write (`"w"`).

---

### Q19. Line trim + filter

```python
with open("messy.txt", "w") as file:
    file.write("   Harry   \n")
    file.write("\n")
    file.write("Hermione\n")
    file.write("   \n")
    file.write("  Ron\n")

with open("messy.txt") as file:
    for line in file:
        clean = line.strip()
        if clean:
            print(clean)
```

**Output:**
```
Harry
Hermione
Ron
```

`strip()` dono taraf se whitespace hatata hai. `if clean:` — empty string Python me **falsy** hoti hai, isliye blank lines apne aap skip ho jayengi. `if line:` bhi kaam karega.

---

### Q20. read() vs readlines()

```python
with open("data.txt", "w") as file:
    file.write("alpha\nbeta\n")

# read()
with open("data.txt") as file:
    data = file.read()
print(repr(data))
# Output: 'alpha\nbeta\n'   ← ek string

# readlines()
with open("data.txt") as file:
    lines = file.readlines()
print(lines)
# Output: ['alpha\n', 'beta\n']   ← list of strings
```

**Farak:** `read()` poori file ko **ek string** banata hai (newlines included). `readlines()` har line ko **alag string** banake list me deta hai. Isliye jab line-by-line process karna ho, `readlines()` ya loop behtar hai — aur badi file pe memory bhi bachta hai.

---

## Challenge Solutions

### C1. Student pass/fail report

```python
with open("grades.csv") as file:
    for line in file:
        parts = line.rstrip().split(",")
        if parts[0] == "name":
            continue
        name = parts[0]
        marks = int(parts[2])
        status = "Pass" if marks >= 40 else "Fail"
        with open("report.txt", "a") as out:
            out.write(f"{name}: {marks} ({status})\n")
```

**Note:** `report.txt` `"a"` mode se khul raha hai — warna har line ke baad file overwrite ho jayegi aur sirf last student bachega. Ye wahi Q6 wala trap hai.

---

### C2. Binary concept

```python
with open("test.txt", "w") as file:
    file.write("abc")
with open("test.txt", "r") as file:
    data = file.read()
print(len(data))
```

**`"abc"` ke liye output: `3`**

Ab non-ASCII try karo:
```python
with open("test.txt", "w", encoding="utf-8") as file:
    file.write("é")
with open("test.txt", "r", encoding="utf-8") as file:
    data = file.read()
print(len(data))     # 1
```

**`read()` ke baad: `1` — par `open("test.txt", "rb").read()` se dekho to `b'\xc3\xa9'` milega, jo 2 bytes hai.**

**Farak kyun:** File bytes me store hoti hai, characters nahi. "a", "b", "c" ASCII hain — har ek 1 byte. Par "é" ek **multi-byte character** hai — UTF-8 me 2 bytes (`0xC3 0xA9`). Text mode me `read()` ye dono bytes ko decode karke ek character "é" bana deta hai, isliye `len()` = 1. Binary mode me raw bytes milte hain, isliye `len()` = 2.

**Practical lesson:** Jab `len(data)` se file size guess kar rahe ho ya binary data handle kar rahe ho, ya character count chahiye to text mode sahi hai. Par **encoding hamesha specify karo** (`encoding="utf-8"`) — warna Windows pe default encoding alag ho sakta hai aur Hindi text jaise characters Unicode error de sakte hain.

---

### C3. Merge two files

```python
files = ["a.txt", "b.txt"]

with open("merged.txt", "w") as out:
    for filename in files:
        with open(filename) as src:
            for line in src:
                out.write(line)

print("Merged!")
```

**Dhyan:** `out` ko `"w"` (ek nayi file, ek hi baar likho), lekin har `src` ko default (`"r"`) se khol rahe hain. Agar `src` ko bhi `"w"` se kholte to source files khatam ho jati!

---

## Common Galtiyan Jo Sab Karte Hain (Solutions se seekhi hui)

Ye patterns mere aur tumhare dono ke kaam se nikle hain:

1. **Bina `rstrip()` ke `sorted()`** — newline ki wajah se order bigad jaata hai. Hamesha pehle trim karo, phir sort.

2. **`"w"` jahan `"a"` chahiye tha** — Q6 aur C1 dono me yahi trap hai. File banne ke liye ek baar `"w"`, baaki me hamesha `"a"`.

3. **Header line process karna** — CSV me pehli line header hoti hai (`name,subject,marks`). Use process karoge to `int("marks")` crash dega. `if parts[0] == "name": continue` ya `next(file)` se skip karo.

4. **`next(file)` ka use** — Q14 aur C1 me header skip karne ka aur tarika:
   ```python
   with open("grades.csv") as file:
       next(file)          # pehli line (header) skip
       for line in file:
           ...
   ```
   Ye thoda cleaner hai `if` check se.

5. **Binary mode me `len()`** — C2 wala issue. Characters aur bytes ka fark yaad rakh.

6. **Encoding specify na karna** — Non-ASCII text (Hindi, emoji) Windows pe crash kar sakta hai. Hamesha `encoding="utf-8"` likho jab tak specific reason na ho.

---

**Related:** `notes.md` · `practice_set.md` · `../6 Lec Unit Test/notes.md` · `../../Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.4 SQLite se Jodo.md`