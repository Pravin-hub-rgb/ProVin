# Lec 7 - File IO — Practice Set

> **Rule:** Don't look at solutions until you've attempted all questions. Otherwise you'll just copy, not learn. A wrong answer is better than a right one — it shows where you got stuck.

Answer every question using concepts from notes.md. No starter code is given — you have to think it through yourself.

---

## Level 1 — Basics

### Q1. Write one line
Write `Hello, World!` to a file named `output.txt`. Then open the file and check that it was really written.

**Hint:** Use `"w"` mode.

---

### Q2. Write 5 lines
Write numbers 1 to 5 in `numbers.txt`, **each on a separate line**.

**Hint:** Loop + `write` + `\n`.

---

### Q3. Read a file
Read `numbers.txt` (the one you just made) and print each line.

**Hint:** `for line in file:` — and remember, `line` has something extra.

---

### Q4. Line count
Count the lines in `numbers.txt` and print the count.

**Hint:** A counter variable. Increment it on every line.

---

### Q5. Word count
Write some text in a file named `notes.txt` (3-4 lines), then count the **total words** in that file and print it.

**Hint:** `line.split()` — it splits into a list by whitespace.

---

## Level 2 — Modes and read/write

### Q6. Append test
Run this program **3 times**:
```python
with open("log.txt", "a") as file:
    file.write("entry\n")
```
How many lines are in `log.txt` now? Now run the same program with `"w"` mode — how many lines now? Note the two numbers and explain what happened.

---

### Q7. Overwrite vs append
Write `"Hello"` to `data.txt`. Then append `" World"` using `"a"` mode. Then write `"Bye"` using `"w"` mode. **Check the file's content after each step** and write down the output of all 3 steps together.

---

### Q8. write vs append in one file
Make something that adds one line on every run, but the **first line is a header** (like `count,value`). On the first run only the header should appear; on later runs new lines get appended.

**Hint:** You need `"a"` mode. Handle the first run separately.

---

### Q9. Copy a file
Copy the contents of `source.txt` into a new file `copy.txt` — without using `shutil`. Use only Python file operations.

**Hint:** Read source with `"r"`, write dest with `"w"`.

---

### Q10. Reverse lines
Write 5 names in `names.txt` (each on a separate line). Then print those lines in **reverse order** — without modifying the file.

**Hint:** `readlines()` or build a list, then `sorted(lines, reverse=True)`.

---

## Level 3 — CSV

### Q11. Parse students.csv
Here's the CSV (already in your `code/` folder):
```
Harry,Gryffindor
Hermione,Gryffindor
Ron,Gryffindor
Draco,Slytherin
```
Read each line and print: `Harry is in Gryffindor`

---

### Q12. Students count by house
Read the CSV above and print:
- `Gryffindor: 3`
- `Slytherin: 1`

**Hint:** Build a dict with house name = key, count = value. Use `get()` or a default.

---

### Q13. Only one house's students
Read the CSV and print only the `Gryffindor` students.

---

### Q14. Make your own CSV
Create a `grades.csv` with 5 students' data:
```
name,subject,marks
```
Then read it and **calculate and print the average marks per subject**.

**Hint:** Collect marks per subject (dict + list), then `sum()/len()`.

---

## Level 4 — A bit harder

### Q15. Line numbers
Read `numbers.txt` and print with numbers: `1. Harry` `2. Hermione` like that.

---

### Q16. Word frequency
Write a paragraph in `text.txt`. Then **count how many times each word appears** and print the top 5 words.

**Hint:** Use a dict — `count[word] = count.get(word, 0) + 1`

---

### Q17. Validate data
Write 6 email addresses in `emails.txt`, with 2 invalid (missing `@`). Read the file and **put only valid emails into valid.txt**, and print how many were invalid.

**Hint:** `"@" in line` check is enough for this.

---

### Q18. CSV to CSV
Read `students.csv` and write only the Slytherin students into a new file `slytherin.csv`.

---

### Q19. Line trim + filter
Create `messy.txt` with some lines having extra spaces around them, and some blank lines. Read the file and **print the trimmed lines, skipping blank lines**.

**Hint:** `line.strip()` — and check `if line:` (empty string is falsy in Python)

---

### Q20. One line of data, two ways
This single line has 2 things:
```python
with open("data.txt", "w") as file:
    file.write("alpha\nbeta\n")
```
Now read with `read()` and read with `readlines()` — **why are the results different?** Write down the actual output of both and explain.

---

## Challenge (optional, if you have time)

### C1. Student pass/fail report
Read `grades.csv` (Q14 format). Based on each student's marks:
- 40+ = Pass, otherwise Fail
Write to `report.txt`: `Harry: 85 (Pass)`

**Hint:** To extract 2 columns (name, marks) from CSV use `line.rstrip().split(",")` and take the last element.

---

### C2. Binary concept — understand it
Run this code and see:
```python
with open("test.txt", "w") as file:
    file.write("abc")
with open("test.txt", "r") as file:
    data = file.read()
print(len(data))
```
Will `len(data)` be 3 or 6? Also try writing a non-ASCII character like "é" instead of "abc" and check again. Why is there a difference?

**Hint:** "é" takes 2 bytes to encode.

---

### C3. Merge two files
`a.txt` and `b.txt` both have lines. Create `merged.txt` containing **all lines from both** — `a.txt`'s lines first, then `b.txt`'s. The file names are in a list, handle it with a loop.

**Hint:** Loop over the list `["a.txt", "b.txt"]`. Open each source with `"a"` mode — so the first one isn't wiped.
