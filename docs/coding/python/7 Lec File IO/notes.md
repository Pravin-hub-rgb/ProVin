# File IO — Keeping Data Outside and Getting It Back

So far you've only used `print()`. Every time you run the program, the data is gone. Stop it, it's over. Nothing from the previous run survives.

From today that changes. From today you'll **create a file on disk from inside your program** — write data, close it, open it the next day, read it back.

This isn't just "learning to read files." **This is the first step of backend development.** Because the entire job of a backend is to keep data outside of memory so it survives even after the program stops. And that same need is what builds your entire backend in TradeStack — it also keeps data in a single file.

Let's begin.

---

## Think About It (A Thinking Scene)

Imagine your **phone's notes app**.

What does that app do? Type, save. Close the app. Open it again — all the data is still there. Why? Because the data is stored **like a file in the phone's storage**, not just in memory.

Now imagine an app that **doesn't even have a save button**. Type, close the app, open it — everything's gone. Bizarre, right? That's exactly what happens if your program keeps data only in memory.

Python's memory = that app with no save button. `print()` only shows on screen. To keep data you need a **file**.

And that's what `open()` is.

---

## The Manual Way (The Painful Way)

First understand what happens without a file. Here's your code — take 3 names as input, then print them:

```python
names = []

for _ in range(3):
    names.append(input("What's your name? "))

for name in sorted(names):
    print(f"hello, {name}")
```

Run it:

```
What's your name? Harry
What's your name? Hermione
What's your name? Ron
hello, Harry
hello, Hermione
hello, Ron
```

Program ran. Output received. Now **run it again** — what happens?

```
What's your name? <input again>
```

Yes. You have to **type again**. Because `names = []` is a RAM variable — it's gone the moment the program stops.

**That's the pain.** Now imagine: you need 100 names, and every time you run the program? You'd have to type 100 times. Unbearable.

Files fix this — write once, **read many times**. That's the whole benefit.

---

## Concept: `open()` — Opening a File

The way to open a file is `open()`. It returns a **file object** (or handle) — a "letter" through which you can work on the file.

### Syntax

```python
file = open("filename.txt", "mode")
```

- **`"filename.txt"`** — which file. This is the path.
- **`"mode"`** — what to do with that file. This is the most important part.

**First understand one thing here** — the mode decides whether you'll write to the file or read from it, and whether old data is preserved or wiped.

### Visual Mapping

```
open("names.txt", "w")
      |          |    |
      |          |    └── mode: "w" = write (create new file / overwrite old)
      |          └─────── which file
      └────────────────── where this command is running (current folder)
```

---

## Concept: Modes — This Is The Most Important Table

Memorize this table. It's asked in interviews, and used in daily life too.

| Mode | What it does | Old data? | When to use |
|------|--------------|-----------|-------------|
| **`"r"`** | **read** — reading | Preserved | You want to view data |
| **`"w"`** | **write** — writing | **WIPED OUT** | You want to create a new file |
| **`"a"`** | **append** — write at the end | Preserved, new data added at end | You want to add data |
| **`"x"`** | **exclusive create** | Error if file exists | "This file must not already exist" |

**The difference between `"w"` and `"a"` is the most important.** This is where people get confused. Understand:

```python
with open("names.txt", "w") as file:      # opened the file, wrote nothing
    pass
with open("names.txt", "a") as file:
    file.write("Harry\n")                 # Harry added
with open("names.txt", "a") as file:
    file.write("Ron\n")                   # Ron added AT THE END — both safe
```

Result: both `Harry` and `Ron` are in the file. `"a"` never destroys old data.

Now if you put `"w"` in the middle:

```python
with open("names.txt", "a") as file:
    file.write("Harry\n")
with open("names.txt", "w") as file:      # <-- DANGER
    file.write("Ron\n")
```

Result: only `Ron` is in the file. **Harry is gone.** Because `"w"` truncates (cuts) the old content the moment it opens the file.

> **I made this mistake the first time too** — overwrote an entire settings file in a project, and all the data was gone. Since then, whenever I see `with open(..., "w")`, I think a little extra: *"Do I really want to destroy everything?"*

---

## Concept: `with` — Why It's Necessary

There are **two ways** to open a file in Python. Let's look at both first, then understand why `with` is better.

### Way 1 — Manual (the old way)

```python
file = open("names.txt", "w")
file.write("Harry\n")
file.write("Ron\n")
file.close()
```

Works. But think — what if some line in between **throws an error**? Like `file.write(some_variable)` where `some_variable` isn't defined:

```python
file = open("names.txt", "w")
file.write("Harry\n")
file.write(user_input)     # <-- NameError here!
file.write("Ron\n")        # <-- this line never executes
file.close()               # <-- this never executes either!
```

What happens now? `NameError` occurred and the program stopped. **`file.close()` was never called.** The file is still open.

Meaning — the file handle is still open. Now if you `open("names.txt", "w")` again on the same file, Windows will throw an error "file in use by another process". And the file data wasn't flushed — the written data may also be gone.

**This is solved by `try/finally`:**

```python
file = open("names.txt", "w")
try:
    file.write("Harry\n")
    file.write(user_input)     # error here
finally:
    file.close()               # but this RUNS — no matter what happened above
```

This is correct, but it looks heavy. Write `try/finally` for every file? Effort.

### Way 2 — `with` (the right way)

```python
with open("names.txt", "w") as file:
    file.write("Harry\n")
    file.write(user_input)     # error here
    file.write("Ron\n")
# the file is AUTOMATICALLY closed by the time we reach here
# no matter what happened inside
```

**No matter what happens inside the `with` block — error or no error — the file gets closed.** This is exactly what `try/finally` does, just Python writes it for you.

`with open(...) as file:` means:
1. Open the file
2. Run the block
3. **Close the file the moment the block ends (or crashes)**

This same `with` will also appear in FastAPI Phase 1 with SQLite — same rule applies there (`with get_conn() as conn:`). So understand this concept properly once, it'll be useful in two places.

---

## Coder's Perspective Flow: Starting from `open()`

When introducing a new feature, go step by step — don't dump everything at once.

### Step 1 — Concept

`open()` takes a file path and returns a file object. That object has methods like `.write()`, `.read()`, `.readlines()`.

### Step 2 — Syntax

```python
file = open("path/to/file.txt", "mode")
file.write("data")      # write
file.read()             # read everything (string)
file.readlines()        # list of lines
file.close()            # close
```

### Step 3 — Minimal Example (just one thing)

Just writing one line:

```python
with open("test.txt", "w") as file:
    file.write("Hello")
```

**Run it** — `test.txt` is created in the folder. Inside there's only `Hello` (no newline — so if you open the file, the cursor will stick to it).

### Step 4 — Flow (what happens when this runs)

1. Python looks for `test.txt` in the current folder
2. If not found, **creates a new one**. If found, in `"w"` mode it **truncates** (empties it)
3. The file object is obtained — now `.write()` works on it
4. Data goes into a **buffer** (not to disk immediately) — that's why `.close()` is necessary, that's when flush happens
5. `with` block ends — file closes, buffer flushes

**Understand point 4** — that's why forgetting `close()` causes data loss. Buffer means the data is still in parking, at your program's place, not on disk yet. When you close, parking empties.

### Step 5 — Build Up (full program)

Now the complete program. This is your `names1.py` — look at it without comments:

```python
# Step 1: take names as input
names = []
for _ in range(3):
    names.append(input("What's your name? "))

# Step 2: write to file
with open("names.txt", "a") as file:
    for name in names:
        file.write(f"{name}\n")

# Step 3: read back
with open("names.txt", "r") as file:
    for line in file:
        print("hello,", line.rstrip())
```

Run it:
- Enter 3 names (Harry, Hermione, Ron)
- Run the program again, enter 3 more names (Draco) — **4 names in the file, the first 3 also safe**
- Every run prints **all** names

This is it — the data is now outside RAM.

---

## The Newline Story (this is important)

One subtle thing that confuses people at first. Look:

```python
with open("names.txt", "w") as file:
    file.write("Harry")
    file.write("Ron")
```

Open the file — what's inside?

```
HarryRon
```

**Both are stuck together!** Because `write()` adds nothing — it writes exactly what you give it.

Now if written as:

```python
with open("names.txt", "w") as file:
    file.write(f"{name}\n")
```

Then the file has:

```
Harry
Ron
```

Because `\n` is the newline character — "\n" means "line ends here, next line starts here".

> I made this mistake too the first time — didn't write `\n` and then wondered *"why is there no data in the file?"* Actually the data was there, just both lines stuck together. And I hadn't added `rstrip()` while reading either, so everything showed on one line.

**Rule to remember:** write `\n` after every line. Make it a habit.

---

## Understanding Reading: `read()`, `readlines()`, and Loop

There are three ways to pull data out of a file.

### Way 1 — `read()` — everything in one string

```python
with open("names.txt", "r") as file:
    content = file.read()
    print(content)
```

The whole file becomes one **string**, with `\n`. Fine for small files. A big file (100MB) loads into memory and the program can crash.

### Way 2 — `readlines()` — list of lines

```python
with open("names.txt", "r") as file:
    lines = file.readlines()
    print(lines)
```

Output looks something like:

```python
['Harry\n', 'Hermione\n', 'Ron\n']
```

See? **There's `\n` at the end of every string.** That's why `print` shows a double newline or weird output.

### Way 3 — Direct loop (cleanest)

```python
with open("names.txt", "r") as file:
    for line in file:
        print("hello,", line.rstrip())
```

The file itself is iterable — you can write `for line in file` directly. And `rstrip()` removes the newline.

**Why is `rstrip()` necessary?** Because `line` has `\n` at the end. If you don't remove it:

```python
print("hello,", "Harry\n")
# output: hello, Harry
#
```

The `\n` after print adds an extra newline, so there's a gap in the output. Or with `sorted()`, `"Ron\n"` and `"Ron "` would be treated as different.

**`rstrip()` = remove whitespace from the right side.** For the left side there's `lstrip()`, for both sides `strip()`.

---

## Sorting File Data

Now take the last part of `names1.py`:

```python
names = []

with open("names.txt") as file:
    for line in file:
        names.append(line.rstrip())

for name in sorted(names, reverse=True):
    print(f"hello, {name}")
```

**Three things happening together:**
1. Open the file (default mode `"r"` — since no mode is written, it's read)
2. Read each line, `rstrip()` it (remove newline) and put it in the list
3. Sort the list and print

**`sorted(names, reverse=True)`** — `reverse=True` means **reverse sort** (Z to A). Remove `reverse=True` and it's A to Z.

There's also a small optimization — you don't need the `names` list. You can pass the sorted file directly:

```python
with open("names.txt") as file:
    for line in sorted(file):
        print("hello,", line.rstrip())
```

`sorted(file)` reads the whole file and makes a sorted list, then iterates. Fine for small files. For a big file, making a `names` list is better — since `sorted()` already loads everything into memory, making a list adds an extra reference but keeps the structure clean.

---

## CSV — Comma Separated Values

Now look at `students.csv`:

```
Harry,Gryffindor
Hermione,Gryffindor
Ron,Gryffindor
Draco,Slytherin
```

This is **CSV** — **C**omma **S**eparated **V**alues. One record per line, fields separated by commas.

CSV is a very common format — Excel exports, database exports, trading data, all use this format. Your TradeStack also receives stock data as CSV (bhavcopy).

### Reading CSV

```python
with open("students.csv") as file:
    for line in file:
        name, house = line.rstrip().split(",")
        print(f"{name} is in {house}")
```

Run it:

```
Harry is in Gryffindor
Hermione is in Gryffindor
Ron is in Gryffindor
Draco is in Slytherin
```

**What is `split(",")` doing?** It splits the line by comma and makes a list:

```python
"Hermione,Gryffindor".split(",")
# → ['Hermione', 'Gryffindor']
```

Then `name, house = ...` unpacks it — first element goes to `name`, second to `house`.

**`rstrip()` is necessary here too** — otherwise `house` will have `\n` and the print will show a gap.

> **Be careful** — real CSV has quoted fields: `"Gryffindor, but reformed"`. In that case `split(",")` gives wrong results. Python's `csv` module is for that. For now simple CSV is fine with `split(",")`, but in production use `import csv`.

---

## Common Mistakes

1. **Forgetting the newline.** `file.write(name)` without `\n` — everything sticks to one line. **Write `\n` after every write.**

2. **Using `"w"` where `"a"` is needed.** Old data gets wiped. Until you're sure you want to overwrite, `"a"` is better — you can always overwrite later, but wiped data doesn't come back.

3. **Using `open()` + `close()` instead of `with`.** If an error occurs, `close()` gets skipped. Always use `with`.

4. **Forgetting `rstrip()` while reading.** `line` has `\n`. Gap in print, wrong order in `sorted()`.

5. **Using `with` and also writing `close()`.** No benefit to double close — `with` handles it itself.

6. **Not writing the mode in `open()`.** Default is `"r"`, so if you try to write, you'll get an error. Always write the mode clearly — `"r"` or `"w"` — it avoids confusion.

7. **File path in the wrong folder.** `open("names.txt")` creates the file in the **current working directory** — where `python names1.py` was run. In VS Code if `.` is the terminal, it'll be `docs/coding/python/7 Lec File IO/code`. You can confirm with `print(open("names.txt").name)`.

8. **Trailing spaces in `split(",")` result.** Sometimes CSV has `Harry, Gryffindor` (with a space). Use `line.strip().split(",")` or `split(", ")`, otherwise `house` will have a space.

---

## Test: How to Verify

Don't just read these — actually run them.

**Test 1 — Does the file get created?**
```python
with open("test.txt", "w") as file:
    file.write("Hello\n")
```
Run it, then check `test.txt` in the folder. Also check contents with `open("test.txt")`.

**Test 2 — Append vs Write difference**
```python
# Run this program 3 times
with open("log.txt", "a") as file:
    file.write("line\n")
```
`log.txt` should now have **3 lines**. Run it with `"w"` — now there should be **1 line**. Watch the difference yourself to understand.

**Test 3 — Newline effect**
Write 2 lines without `\n` and open the file — they'll appear stuck together. Then write with `\n` — separate lines. **You must see this visually.**

**Test 4 — Error + with**
```python
with open("err.txt", "w") as file:
    file.write("first line\n")
    file.write(undefined_variable)   # NameError
```
This will crash. Then check with `open("err.txt")` — was **"first line"** saved? If not, you'll understand why `with` is needed.

**Test 5 — Run `names1.py` fully**
Run it 3 times, 3 names each time. The file should have **9 lines**. That's proof of persistence.

---

## Nutshell

- **`open(path, mode)`** — opens a file, returns a file object. Mode decides read/write/append.
- **`"r"` reads, `"w"` wipes, `"a"` appends.** These three you must remember.
- **`with open(...) as f:`** — file closes automatically when block ends. Even on error. Always use this.
- **`file.write("...\n")`** — newline after every line, else everything sticks together.
- **`line.rstrip()` while reading** — else `\n` ruins your output and `sorted()`.
- **`split(",")`** — separates fields in CSV. Unpacking `name, house = ...` sends them into variables.

---

## In Your Own Words

<details>
<summary>1. What's the difference between `"w"` and `"a"`? Give a real example.</summary>

**`"w"` (write)** truncates (cuts) the old content the moment it opens the file — whether you write anything or not. Old data is permanently wiped. **`"a"` (append)** leaves old data completely untouched and adds new data **at the end**. Real example — a log file where an entry is added every day. Use `"a"` and the past 100 days' data stays safe. Use `"w"` and yesterday's data is wiped, only today's remains. So unless there's a definite reason to overwrite, `"a"` is better.

</details>

<details>
<summary>2. Why is the `with` statement necessary? Can't we just write `file.close()`?</summary>

You can write it, but the problem comes when an **error** occurs in between. In the manual way:

```python
file = open("names.txt", "w")
file.write("Harry\n")
file.write(undefined_var)   # NameError here
file.close()                 # this line never runs
```

Error occurred, `close()` skipped — file stays open, buffer not flushed. That's a file handle leak. The `with` statement does the work of `try/finally` automatically — whether an error occurs or not, the file closes the moment the block ends. You don't need to write `try/finally`, and there's no chance of forgetting.

</details>

<details>
<summary>3. What's the difference between `file.write(name)` and `file.write(f"{name}\n")`?</summary>

`file.write(name)` writes exactly what's given — if `name = "Harry"`, it writes `Harry`. No newline added. Write `write("Harry")` and `write("Ron")` twice and the file will have `HarryRon` — both stuck, on one line. `write(f"{name}\n")` writes the same plus a newline character `\n` at the end. So both end up on separate lines. Rule: you must write `\n` after every line, otherwise both output and further processing will be messed up.

</details>

<details>
<summary>4. Why do we need to add `rstrip()` while reading?</summary>

Every line in the file has `\n` (newline character) at the end — whether you added `\n` while writing or not. When you read with `for line in file`, that newline stays included in the `line` variable. If you `print("hello,", line)` without `rstrip()`, both the newline inside `line` and the newline that `print` adds will print — an extra gap shows in the output. `sorted()` also has a problem because Python treats `"Harry\n"` and `"Harry"` as different strings. `rstrip()` removes trailing whitespace (and the newline), so the string becomes clean.

</details>

<details>
<summary>5. What's the difference between `read()`, `readlines()`, and `for line in file`?</summary>

**`read()`** turns the whole file into one **string**. Fine for small files, loads into memory on a big file. **`readlines()`** returns all the lines of the file as a **list** — like `['Harry\n', 'Ron\n']`. **`for line in file`** — the file object itself is iterable, so you can iterate directly. This is the cleanest way and saves memory on big files because one line is processed at a time, not the whole file. Roommate example: `read()` is lifting the whole book at once, `for line in file` is reading one page at a time.

</details>

<details>
<summary>6. What does `split(",")` do in a CSV file? And what's better in real production?</summary>

`split(",")` splits a string by comma and makes a list. `"Hermione,Gryffindor".split(",")` → `['Hermione', 'Gryffindor']`. Then with unpacking `name, house = line.rstrip().split(",")`, each element of the list goes into a separate variable. **In real production** Python's built-in `csv` module is better (`import csv; csv.reader(file)`) because real CSV has quoted fields — like `"Gryffindor, reformed"` — and in such cases `split(",")` gives wrong results. `split(",")` is enough for simple data, but in production use the `csv` module.

</details>

<details>
<summary>7. How is this File IO connected to backend?</summary>

The entire job of a backend is to keep data outside of memory. When a user sends a request, data comes in, gets processed, and is stored in a permanent place — so that the same data is available on the next request. File IO is that base concept. Building on it comes SQLite — which is basically a **structured** file with support for tables, indexing, and queries (in a raw file we parse CSV ourselves, in SQLite we run `SELECT`). In FastAPI Phase 1 we'll create a database with this `sqlite3` module, and that module also works on a file internally. So this lecture is the foundation.

</details>

---

## What It Is NOT

- ❌ **Not a database** — this is a raw file. No indexing, no query language, no concurrent write handling. All that comes in SQLite (Phase 1).
- ❌ **Not JSON** — CSV is a simple text format. JSON is structured (for nested objects). JSON is used more in real data interchange.
- ❌ **Not Excel** — `.xlsx` is a complex format that needs an extra library (`openpyxl`) to read in Python. CSV is its simple sibling.
- ❌ **Not concurrent-write safe** — if two programs write to the same file at once, data can corrupt. For that you need file locking or a database.
- ❌ **Not secure** — `open()` can open any file. In production, careful path validation is essential (to avoid path traversal attacks).

---

## What Happens Next

You learned to **write data to a file and read it back**. That was a **raw** file — plain text, commas, no idea which data is which.

In the next phase **structured** storage comes — where the database itself tells you what the columns are, which is the primary key, and you can query with SQL without manually parsing.

But before that, one **necessary thought** needs to be clear — **what is a backend**. Until you know what a backend is, all this will feel like "writing to files". After the backend mindset, you'll understand why this File IO was **necessary**, and where it fits in FastAPI.

**Next: Phase 0 — Backend Mindset (0.1 Client-Server Model)**

---

**Related:** `COURSE-OVERVIEW.md` · Lec 6 (Unit Testing) — you learned to handle errors there, this is its natural next step · `Phase 0 - Backend Mindset/0.1 Client-Server Model.md` · `Phase 1 - FastAPI Basics (CRUD + SQLite)/1.4 SQLite se Jodo.md`
