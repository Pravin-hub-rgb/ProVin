# Lec 7 - File IO — Solutions

> **Keep in mind:** These answers are for reference. First attempt all questions in `practice_set.md` yourself. Then come here and compare.
>
> If your answer is different but **it works** — you're right. Python has more than one way.

---

## Level 1 — Basics

### Q1. Write one line

```python
with open("output.txt", "w") as file:
    file.write("Hello, World!")
```

`"w"` mode creates a new file or overwrites an existing one. To check, run `open("output.txt").read()`.

---

### Q2. Write 5 lines

```python
with open("numbers.txt", "w") as file:
    for i in range(1, 6):
        file.write(f"{i}\n")
```

**Notice the `\n`** — newline after every line. Without it everything sticks to one line.

---

### Q3. Read a file

```python
with open("numbers.txt") as file:
    for line in file:
        print(line.rstrip())
```

`rstrip()` is needed because `line` has `\n` at the end. Without it there's an extra gap in print.

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

`split()` (without argument) splits by whitespace — spaces, tabs, newlines. So `line.split()` is right, `line.split(" ")` is not (in that case `\n` would also become a "word").

---

## Level 2 — Modes and read/write

### Q6. Append test

```
"a" mode, run 3 times  →  3 lines
"w" mode, run 1 time   →  1 line
```

**What happened:** `"a"` adds a new line at the end of the file, old data stays safe. `"w"` truncates the old content the moment it opens the file — whether you write one line or nothing. After `"w"`, the file has only the new content.

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

**In step 3, `Hello World` is permanently wiped.** That's why unless there's a definite reason, use `"a"`.

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

`os.path.exists()` checks whether the file already exists. First time write the header (`"w"`), afterwards only append (`"a"`).

---

### Q9. Copy a file

```python
with open("source.txt") as src, open("copy.txt", "w") as dst:
    for line in src:
        dst.write(line)
```

Two `with` statements in one line — references to both files at once. Note: `dst` is `"w"` (new file), `src` is `"r"`.

---

### Q10. Reverse lines

```python
with open("names.txt") as file:
    lines = file.readlines()

for line in sorted(lines, reverse=True):
    print(line.rstrip())
```

`sorted(..., reverse=True)` means Z to A. `rstrip()` so the newline doesn't show.

---

## Level 3 — CSV

### Q11. Parse students.csv

```python
with open("students.csv") as file:
    for line in file:
        name, house = line.rstrip().split(",")
        print(f"{name} is in {house}")
```

Flow: read line → remove `\n` with `rstrip()` → split into list with `split(",")` → unpack into `name` and `house`.

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

`counts.get(house, 0)` means — if the house is already in the dict, take its value, otherwise start from `0`. Then increment by `+ 1`.

---

### Q13. Only one house's students

```python
with open("students.csv") as file:
    for line in file:
        name, house = line.rstrip().split(",")
        if house == "Gryffindor":
            print(name)
```

---

### Q14. Make your own CSV + average

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

`if parts[0] == "name": continue` — to skip the header line. Without it `int("marks")` would crash.

---

## Level 4 — A bit harder

### Q15. Line numbers

```python
with open("numbers.txt") as file:
    for i, line in enumerate(file, start=1):
        print(f"{i}. {line.rstrip()}")
```

`enumerate(iterable, start=1)` — gives the index and starts from 1. `start=1` because we don't want zero.

---

### Q16. Word frequency

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

`sorted(counts.items(), key=lambda x: x[1], reverse=True)` — items contain `(word, count)` tuples. `key=lambda x: x[1]` means sort by count. Then `[:5]` for top 5.

---

### Q17. Validate data

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

### Q18. CSV to CSV

```python
with open("students.csv") as src, open("slytherin.csv", "w") as dst:
    for line in src:
        name, house = line.rstrip().split(",")
        if house == "Slytherin":
            dst.write(f"{name},{house}\n")
```

Both files open at once — one for read (`"r"` default), one for write (`"w"`).

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

`strip()` removes whitespace from both sides. `if clean:` — empty string is **falsy** in Python, so blank lines skip themselves. `if line:` would also work.

---

### Q20. read() vs readlines()

```python
with open("data.txt", "w") as file:
    file.write("alpha\nbeta\n")

# read()
with open("data.txt") as file:
    data = file.read()
print(repr(data))
# Output: 'alpha\nbeta\n'   ← one string

# readlines()
with open("data.txt") as file:
    lines = file.readlines()
print(lines)
# Output: ['alpha\n', 'beta\n']   ← list of strings
```

**Difference:** `read()` turns the whole file into **one string** (newlines included). `readlines()` gives each line as a separate string in a list. So when you want to process line by line, `readlines()` or a loop is better — and on a big file it also saves memory.

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

**Note:** `report.txt` is opened in `"a"` mode — otherwise the file would get overwritten after every line and only the last student would remain. This is the same trap from Q6.

---

### C2. Binary concept

```python
with open("test.txt", "w") as file:
    file.write("abc")
with open("test.txt", "r") as file:
    data = file.read()
print(len(data))
```

**Output for `"abc"`: `3`**

Now try non-ASCII:
```python
with open("test.txt", "w", encoding="utf-8") as file:
    file.write("é")
with open("test.txt", "r", encoding="utf-8") as file:
    data = file.read()
print(len(data))     # 1
```

**After `read()`: `1` — but if you check with `open("test.txt", "rb").read()` you'll get `b'\xc3\xa9'`, which is 2 bytes.**

**Why the difference:** Files are stored in bytes, not characters. "a", "b", "c" are ASCII — 1 byte each. But "é" is a **multi-byte character** — 2 bytes in UTF-8 (`0xC3 0xA9`). In text mode, `read()` decodes those 2 bytes into one character "é", so `len()` = 1. In binary mode you get raw bytes, so `len()` = 2.

**Practical lesson:** When you're guessing file size from `len(data)` or handling binary data, or when you want character count, text mode is right. But **always specify encoding** (`encoding="utf-8"`) — otherwise on Windows the default encoding can be different and characters like Hindi text can throw Unicode errors.

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

**Note:** `out` is `"w"` (one new file, written once), but every `src` is opened with default (`"r"`). If you opened `src` with `"w"` too, the source files would be wiped!

---

## Common Mistakes Everyone Makes (learned from solutions)

These patterns came from my work and yours:

1. **`sorted()` without `rstrip()`** — the newline messes up the order. Always trim first, then sort.

2. **`"w"` where `"a"` was needed** — the trap from both Q6 and C1. Create the file once with `"w"`, afterwards always `"a"`.

3. **Processing the header line** — the first line of a CSV is the header (`name,subject,marks`). Process it and `int("marks")` crashes. Skip with `if parts[0] == "name": continue` or `next(file)`.

4. **Using `next(file)`** — another way to skip the header in Q14 and C1:
   ```python
   with open("grades.csv") as file:
       next(file)          # skip first line (header)
       for line in file:
           ...
   ```
   This is a bit cleaner than the `if` check.

5. **Binary mode `len()`** — the C2 issue. Remember the difference between characters and bytes.

6. **Not specifying encoding** — non-ASCII text (Hindi, emoji) can crash on Windows. Always write `encoding="utf-8"` unless there's a specific reason.

---

**Related:** `notes.md` · `practice_set.md` · `../6 Lec Unit Test/notes.md` · `../../Backend (Python)/Phase 1 - FastAPI Basics (CRUD + SQLite)/1.4 SQLite se Jodo.md`
