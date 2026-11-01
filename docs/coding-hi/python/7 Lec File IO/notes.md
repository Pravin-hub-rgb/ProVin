# File IO — Data ko Bahar Rakhna aur Wapas Lena

Tum ab tak sirf `print()` use kar rahe the. Har baar program chalao, data nikal gaya. Band karo, khatam. Pichle run ka kuch nahi bacha.

Aaj se ye badlega. Aaj se tum **program ke andar se, disk pe file banaoge** — data likhoge, band karoge, agle din kholo, wapas padhoge.

Ye sirf "file padhna seekhna" nahi hai. **Ye backend ka pehla kadam hai.** Kyunki backend ka poora kaam hi yahi hai — data ko memory se bahar rakhna taaki program band hone pe bhi bache. Aur wahi zaroorat hai jo tumhare TradeStack me poori backend banati hai — wo bhi ek hi file me data rakhta hai.

Chalo shuru karte hain.

---

## Sochо (Sochne Wala Scene)

Socho tumhara **phone ka notes app**.

Woh app kya karta hai? Type karo, save karo. App band karo. Dobara kholo — sab data wahi hai. Kyun? Kyunki wo data **phone ke storage me file ki tarah** pada hai, sirf memory me nahi.

Ab ek aisa app socho jo **save button hi na ho**. Type karo, app band karo, kholo — sab gayab. Bizarre na? Yehi hota hai agar tumhara program sirf memory me data rakhe.

Python ka memory = woh app jisme save button nahi hai. `print()` toh sirf screen pe dikhata hai. Data rakhne ke liye **file** chahiye.

Aur yahi `open()` hai.

---

## Manual Tareeka (dard wala)

Sabse pehle samajhte hain ki bina file ke kya hota hai. Yeh tumhara code hai — 3 naam input lo, phir print karo:

```python
names = []

for _ in range(3):
    names.append(input("What's your name? "))

for name in sorted(names):
    print(f"hello, {name}")
```

Chal karte hain:

```
What's your name? Harry
What's your name? Hermione
What's your name? Ron
hello, Harry
hello, Hermione
hello, Ron
```

Program chala. Output mila. Ab **dobara chalao** — kya hoga?

```
What's your name? <input dobara>
```

Haan. Tumhe **dobara type** karna padega. Kyunki `names = []` ek RAM variable hai — program band hote hi khatam.

**Yahi dard hai.** Ab socho: agar tumhe 100 naam chahiye hon, aur har baar program chalane pe? 100 baar type karna padega. Unbearable.

File se ye hota hai — ek baar likho, **baar baar padho**. Bas itna fayda.

---

## Concept: `open()` — File ko Kholna

File kholne ka tareeka hai `open()`. Ye ek **file object** (ya handle) return karta hai — matlab ek "chitthi" jisse tum file pe kaam kar sakte ho.

### Syntax

```python
file = open("filename.txt", "mode")
```

- **`"filename.txt"`** — kaunsi file. Ye path hai.
- **`"mode"`** — kya karna hai us file se. Ye sabse important hissa hai.

**Yahan pehle ek baat samajh lo** — mode hi decide karta hai ki tum file me likhoge ya padhoge, aur purana data bachayega ya mita doge.

### Visual Mapping

```
open("names.txt", "w")
      |          |    |
      |          |    └── mode: "w" = write (nayi file bana / purana overwrite)
      |          └─────── kaunsi file
      └────────────────── kahan hai ye command chal rahi hai (current folder)
```

---

## Concept: Modes — Ye Sabse Zaroori Table Hai

Ye table rat lo. Interview me bhi poochha jaata hai, aur daily life me bhi kaam aata hai.

| Mode | Kya karta hai | Purana data? | Kab use karna hai |
|------|---------------|--------------|-------------------|
| **`"r"`** | **read** — padhna | Bacha rehta hai | Data dekhna hai |
| **`"w"`** | **write** — likhna | **MITA DETA HAI** | Nayi file banana hai |
| **`"a"`** | **append** — peeche likhna | Bacha rehta hai, naya end me | Add karna hai |
| **`"x"`** | **exclusive create** | File ho to error | "Ye file pehle se nahi honi chahiye" |

**`"w"` aur `"a"` ka farak sabse important hai.** Logon ko yahi mix-up hota hai. Samjho:

```python
with open("names.txt", "w") as file:      # file kholi, andar kuch nahi likha
    pass
with open("names.txt", "a") as file:
    file.write("Harry\n")                 # Harry add hua
with open("names.txt", "a") as file:
    file.write("Ron\n")                   # Ron PEECHE add hua — dono safe
```

Result: `Harry` aur `Ron` dono file me hain. `"a"` kabhi purana data nahi marta.

Ab agar beech me `"w"` daal do:

```python
with open("names.txt", "a") as file:
    file.write("Harry\n")
with open("names.txt", "w") as file:      # <-- DANGER
    file.write("Ron\n")
```

Result file me sirf `Ron` hai. **Harry mita gaya.** Kyunki `"w"` file kholte hi purana content truncate (kaat) deta hai.

> **Maine bhi pehli baar yahi galti ki thi** — ek project me setting file overwrite kar di poori ki poori, aur pura data gaya tha. Uske baad se mujhe `with open(..., "w")` dekhke thoda extra sochne deta hai: *"kya main sach me sab kuch marna chahta hoon?"*

---

## Concept: `with` — Kyun Zaroori Hai

Python me file kholne ke **do tareeke** hain. Pehle dono dekh lete hain, phir samajhte hain `with` kyun better hai.

### Tareeka 1 — Manual (purana tareeka)

```python
file = open("names.txt", "w")
file.write("Harry\n")
file.write("Ron\n")
file.close()
```

Kaam karta hai. Lekin socho — beech me koi line aise likhi jo **error de de**. Jaise `file.write(some_variable)` aur `some_variable` defined hi nahi hai:

```python
file = open("names.txt", "w")
file.write("Harry\n")
file.write(user_input)     # <-- NameError yahan!
file.write("Ron\n")        # <-- ye line kabhi execute hi nahi hogi
file.close()               # <-- ye bhi nahi!
```

Ab kya hoga? `NameError` aaya aur program ruk gaya. **`file.close()` kabhi call hi nahi hua.** File abhi bhi open hai.

Iska matlab hai — file handle open reh gaya. Ab agar same file dobara `open("names.txt", "w")` karoge, to Windows me error aayega *"file in use by another process"*. Aur file ka data flush nahi hua — matlab jo likha wo bhi shayad gayab.

**Ye `try/finally` se solve hota hai:**

```python
file = open("names.txt", "w")
try:
    file.write("Harry\n")
    file.write(user_input)     # yahan error aaya
finally:
    file.close()               # but ye CHALEGA — chahe upar kuch bhi ho
```

Ye sahi hai, par dekhne me bhaari lag raha hai. Har file ke liye `try/finally` likhna? Mehnaat hai.

### Tareeka 2 — `with` (sahi tareeka)

```python
with open("names.txt", "w") as file:
    file.write("Harry\n")
    file.write(user_input)     # yahan error aaya
    file.write("Ron\n")
# yahan tak aate hi file AUTOMATICALLY band ho jayegi
# chahe andar kuch bhi hua ho
```

**`with` block ke andar kuch bhi ho — error aaye ya na aaye — file band ho jayegi.** Ye `try/finally` ka hi kaam hai, bas Python likh raha hai tumhare liye.

`with open(...) as file:` ka matlab hai:
1. File kholo
2. Block chalao
3. **Block khatam hote hi (ya crash hone pe) file band kar do**

Yehi `with` FastAPI Phase 1 me SQLite ke saath bhi aayega — wahan bhi same rule hai (`with get_conn() as conn:`). Toh ye concept ek baar dhang se samajh lo, do jagah kaam aayega.

---

## Coder's Perspective Flow: `open()` se Start

Naya feature introduce kar rahe hain to step by step chalo — ek saath sab kuch mat daal do.

### Step 1 — Concept

`open()` file ka path leta hai aur ek file object deta hai. Us object pe `.write()`, `.read()`, `.readlines()` jaise methods hain.

### Step 2 — Syntax

```python
file = open("path/to/file.txt", "mode")
file.write("data")      # likho
file.read()             # saara padho (string)
file.readlines()        # lines ki list
file.close()            # band karo
```

### Step 3 — Minimal Example (sirf ek cheez)

Sirf ek line likhne ka kam:

```python
with open("test.txt", "w") as file:
    file.write("Hello")
```

**Chalake dekho** — folder me `test.txt` ban gaya. Andar sirf `Hello` hai (bina newline ke — isliye `open` karke dekho toh file cursor ke saath chipak jayega).

### Step 4 — Flow (jab ye chalta hai, kya hota hai)

1. Python `test.txt` dhoondta hai current folder me
2. Nahi mila to **naya banata hai**. Mila to `"w"` mode me **truncate** kar deta hai (khali kar deta hai)
3. File object milta hai — ab `.write()` us pe kaam karta hai
4. Data **buffer** me jaata hai (disk pe turant nahi) — isliye `.close()` zaroori hai, tab flush hota hai
5. `with` block khatam — file band, buffer flush

**Point 4 samajh le** — isiliye `close()` bhoolna data loss cause karta hai. Buffer matlab data abhi disk pe nahi, tumhare program ke paas hi parking me hai. Band karoge to parking khaali.

### Step 5 — Build Up (full program)

Ab poora program. Yehi tumhara `names1.py` hai — comments hata ke dekho:

```python
# Step 1: naam input lo
names = []
for _ in range(3):
    names.append(input("What's your name? "))

# Step 2: file me likho
with open("names.txt", "a") as file:
    for name in names:
        file.write(f"{name}\n")

# Step 3: wapas padho
with open("names.txt", "r") as file:
    for line in file:
        print("hello,", line.rstrip())
```

Chalake dekho:
- 3 naam input karo (Harry, Hermione, Ron)
- Program dobara chalao, 3 aur naam daalo (Draco) — **file me 4 naam honge, pehle 3 bhi safe**
- Har run me **saare** naam print honge

Yehi cheez hai — data ab RAM se bahar hai.

---

## Newline Ka Chakkar (ye zaroori hai)

Ek subtle baat jo pehle confuse karta hai. Dekho:

```python
with open("names.txt", "w") as file:
    file.write("Harry")
    file.write("Ron")
```

File kholo — andar kya hai?

```
HarryRon
```

**Dono chipke hue hain!** Kyunki `write()` kuch nahi jodta — jo diya wahi likha.

Ab agar likha ho:

```python
with open("names.txt", "w") as file:
    file.write(f"{name}\n")
```

Tab file me hai:

```
Harry
Ron
```

Kyunki `\n` newline character hai — "\n" kehte hain "line yahan khatam, agli line yahan se shuru".

> Yahan pehle maine bhi galti ki — bina `\n` likha aur phir socha *"file me data kyun nahi hai?"* Actually data tha, bas dono lines chipke hue the. Ek `rstrip()` bhi nahi lagaya tha padhte waqt, to ek hi line me sab dikha.

**Rule yaad rakh:** har line ke baad `\n` likho. Aadat bana lo.

---

## Read Karke Samajhna: `read()`, `readlines()`, aur Loop

File me se data nikalne ke teen tareeke hain.

### Tareeka 1 — `read()` — sab ek string me

```python
with open("names.txt", "r") as file:
    content = file.read()
    print(content)
```

Pura file ek **string** ban jayega, `\n` ke saath. Chhote files ke liye theek. Bada file (100MB) to memory me load hoga aur program crash kar sakta hai.

### Tareeka 2 — `readlines()` — lines ki list

```python
with open("names.txt", "r") as file:
    lines = file.readlines()
    print(lines)
```

Output dikhega kuch aisa:

```python
['Harry\n', 'Hermione\n', 'Ron\n']
```

Dekh raha hai? **Har string ke end me `\n` hai.** Isliye `print` karne pe double newline dikhta hai ya odd output aata hai.

### Tareeka 3 — Seedha loop (sabse saaf)

```python
with open("names.txt", "r") as file:
    for line in file:
        print("hello,", line.rstrip())
```

`file` khud iterable hai — tum directly `for line in file` likh sakte ho. Aur `rstrip()` newline hatata hai.

**`rstrip()` kyun zaroori?** Kyunki `line` ke end me `\n` hota hai. Agar nahi hataya to:

```python
print("hello,", "Harry\n")
# output: hello, Harry
#
```

`\n` print ke baad ek extra newline maarta hai, to output me gap dikhta hai. Ya `sorted()` karne to `"Ron\n"` aur `"Ron "` alag maan lega.

**`rstrip()` = right side se whitespace hatana.** Left side ke liye `lstrip()`, dono ke liye `strip()`.

---

## Sorting Files Ka Data

Ab ye le lo `names1.py` ka last part:

```python
names = []

with open("names.txt") as file:
    for line in file:
        names.append(line.rstrip())

for name in sorted(names, reverse=True):
    print(f"hello, {name}")
```

**Ye teen kaam saath me ho rahe hain:**
1. File khol rahe hain (default mode `"r"` — likha nahi hai to read hai)
2. Har line padh ke `rstrip()` kar rahe hain (newline hatake) aur list me daal rahe hain
3. List ko `sorted()` se sort karke print kar rahe hain

**`sorted(names, reverse=True)`** — `reverse=True` matlab **Ulta sort** (Z se A). Hatao `reverse=True`, to A se Z.

Ek chhoti optimization bhi hai — `names` list banane ki zaroorat nahi. Seedha sorted file ko de sakte ho:

```python
with open("names.txt") as file:
    for line in sorted(file):
        print("hello,", line.rstrip())
```

`sorted(file)` poori file read karke sorted list banata hai, phir iterate karte ho. Chhote files me theek hai. Bada file hua to `names` list banana better hai — kyunki `sorted()` already memory me sab le leta hai, list banake ek extra reference toh banti hi hai but structure saaf rehta hai.

---

## CSV — Comma Separated Values

Ab `students.csv` dekho:

```
Harry,Gryffindor
Hermione,Gryffindor
Ron,Gryffindor
Draco,Slytherin
```

Ye **CSV** hai — **C**omma **S**eparated **V**alues. Har line me ek record, aur fields comma se alag.

CSV bahut common format hai — Excel export, database export, trading data, sab yahi format use karte hain. Tumhara TradeStack bhi stock data CSV (bhavcopy) me hi aata hai.

### CSV Padhna

```python
with open("students.csv") as file:
    for line in file:
        name, house = line.rstrip().split(",")
        print(f"{name} is in {house}")
```

Chalake dekho:

```
Harry is in Gryffindor
Hermione is in Gryffindor
Ron is in Gryffindor
Draco is in Slytherin
```

**`split(",")` kya kar raha hai?** Line ko comma ke hisaab se tod ke list banata hai:

```python
"Hermione,Gryffindor".split(",")
# → ['Hermione', 'Gryffindor']
```

Phir `name, house = ...` unboxing kar deta hai — list ke pehle element ko `name`, doosre ko `house`.

**Yahan bhi `rstrip()` zaroori hai** — warna `house` me `\n` aa jayega aur print me gap dikhega.

> **Dhyan rakh** — real CSV me quoted fields hote hain: `"Gryffindor, but reformed"`. Aise me `split(",")` galat dega. Python ka `csv` module iske liye hai. Abhi ke liye simple CSV me `split(",")` kaafi hai, par production me `import csv` use karo.

---

## Common Mistakes

1. **Newline bhoolna.** `file.write(name)` bina `\n` — sab kuch ek line me chipak jayega. **Har write ke baad `\n` likho.**

2. **`"w"` use karna jahan `"a"` chahiye.** Purana data mita jayega. Jab tak pata nahi ki overwrite karna hai, `"a"` behtar hai — overwrite kabhi bhi kar sakte ho, mita hua data wapas nahi aata.

3. **`with` ke bajaye `open()` + `close()`.** Error aaya to `close()` skip ho jayega. Hamesha `with` use karo.

4. **`rstrip()` bhoolna padhte waqt.** `line` me `\n` hota hai. Print me gap, `sorted()` me galat order.

5. **`open()` ke baad `.close()` likhna aur `with` bhi use karna.** Double close se koi fayda nahi — `with` khud sambhal leta hai.

6. **`open("file.txt")` me mode na likhna.** Default `"r"` hota hai, to likhne ki koshish karoge to error aayega. Mode hamesha saaf likho — `"r"` ya `"w"`, confusion se bachata hai.

7. **File path galat folder me.** `open("names.txt")` likha to file **current working directory** me banti hai — jahan se `python names1.py` chalaya. VS Code me `.` terminal me ho to `docs/coding/python/7 Lec File IO/code` hoga. `print(open("names.txt").name)` se confirm kar sakte ho.

8. **`split(",")` result me trailing spaces.** CSV me kabhi `Harry, Gryffindor` (space ke saath) hota hai. `line.strip().split(",")` ya `split(", ")` use karo, warna `house` me space aa jayega.

---

## Test: Kaise Verify Karein

Ye sab **actually chala ke** dekho, sirf padh ke nahi.

**Test 1 — File banti hai?**
```python
with open("test.txt", "w") as file:
    file.write("Hello\n")
```
Chalao, phir folder me `test.txt` dekho. Aur `open("test.txt")` se contents check karo.

**Test 2 — Append vs Write ka farak**
```python
# 3 baar chalao ek hi program
with open("log.txt", "a") as file:
    file.write("line\n")
```
Ab `log.txt` me **3 lines** honi chahiye. Fir `"w"` se chalao — **1 line** ho jayegi. Ye farak khud dekh ke samajh aayega.

**Test 3 — Newline ka effect**
Bina `\n` ke 2 line likh ke file kholo — chipke hue dikhenge. Phir `\n` ke saath likho — alag lines. **Ye visually dekhna zaroori hai.**

**Test 4 — Error + with**
```python
with open("err.txt", "w") as file:
    file.write("pehli line\n")
    file.write(undefined_variable)   # NameError
```
Ye crash hoga. Phir `open("err.txt")` se dekho — kya **"pehli line"** save hui? `with` hone se kuch bhi to save hona chahiye. Agar nahi hui to `with` ki zaroorat samajh lo.

**Test 5 — `names1.py` poora chalao**
Teen baar chalao, teen naam each time. File me **9 lines** honi chahiye. Ye persistence ka proof hai.

---

## Nutshell

- **`open(path, mode)`** — file kholta hai, file object deta hai. Mode decide karta hai read/write/append.
- **`"r"` padhta hai, `"w"` mita deta hai, `"a"` peeche judta hai.** Ye teen ghar yaad rakhne wale hain.
- **`with open(...) as f:`** — block khatam pe file automatically band. Error ho tab bhi. Hamesha isko use karo.
- **`file.write("...\n")`** — har line ke baad newline, warna sab chipak jayega.
- **Padhte waqt `line.rstrip()`** — warna `\n` tera output aur `sorted()` dono kharab karega.
- **`split(",")`** — CSV me fields alag karta hai. Unpacking `name, house = ...` se variables me jaata hai.

---

## In Your Own Words

<details>
<summary>1. `"w"` aur `"a"` me kya farak hai? Real example do.</summary>

**`"w"` (write)** file kholte hi purana content **truncate** (kaat) kar deta hai — chahe tum kuch likho ya na likho. Matlab purana data permanently mita jata hai. **`"a"` (append)** purana data bilkul chhodta hai aur naya data **end me juda** deta hai. Real example — ek log file jisme har din entry add hoti hai. `"a"` use karoge to pichle 100 din ka data safe rahega. `"w"` use kiya to kal ka data mita jayega, sirf aaj ka bachega. Isliye jab tak overwrite karne ka pakka reason na ho, `"a"` behtar hai.

</details>

<details>
<summary>2. `with` statement kyun zaroori hai? `file.close()` toh likh sakte hain na?</summary>

Likh sakte ho, par problem tab aati hai jab beech me **error** aa jaye. Manual tareeke me code aisa hai:

```python
file = open("names.txt", "w")
file.write("Harry\n")
file.write(undefined_var)   # NameError yahan
file.close()                 # ye line kabhi chalega hi nahi
```

Error aaya to `close()` skip ho gaya — file open reh gayi, buffer flush nahi hua. Ye file handle leak hota hai. `with` statement automatically `try/finally` ka kaam karta hai — chahe error aaye ya na aaye, block khatam hote hi file band kar deta hai. Tumhe `try/finally` likhne ki zaroorat nahi, aur bhool ke chhodne ka chance bhi nahi.

</details>

<details>
<summary>3. `file.write(name)` aur `file.write(f"{name}\n")` me kya farak hai?</summary>

`file.write(name)` wahi likhta hai jo diya — agar `name = "Harry"` hai to `Harry`. Koi newline add nahi hota. Do baar likhoge `write("Harry")` aur `write("Ron")` to file me `HarryRon` likha hoga — dono chipke hue, ek hi line me. `write(f"{name}\n")` wahi likhta hai **plus** ek newline character `\n` end me. Isliye dono alag lines me aate hain. Rule: har line ke baad `\n` likhna hi chahiye, warna output aur aage ka processing dono gadbad hoga.

</details>

<details>
<summary>4. `rstrip()` kyun lagana padta hai padhte waqt?</summary>

File me har line ke end me `\n` (newline character) hota hai — chahe tumne likhte waqt `\n` lagaya ho. Jab `for line in file` se padhte ho to `line` variable me woh newline included rehta hai. Agar `print("hello,", line)` kiya bina `rstrip()` ke to `print` apne baad ek newline aur `line` ke andar ka newline dono print ho jayenge — output me extra gap dikhega. `sorted()` karne pe bhi problem hoti hai kyunki `"Harry\n"` aur `"Harry"` ko Python alag strings samajhta hai. `rstrip()` se trailing whitespace (aur newline) hat jaata hai, string saaf ho jati hai.

</details>

<details>
<summary>5. `read()`, `readlines()`, aur `for line in file` me kya farak hai?</summary>

**`read()`** poori file ko ek **string** banake deta hai. Chhoti files ke liye theek, badi file pe memory me load ho jayegi. **`readlines()`** poori file ki saari lines ko ek **list** me return karta hai — jaise `['Harry\n', 'Ron\n']`. **`for line in file`** — file object khud iterable hai, to seedha iterate kar sakte ho. Ye sabse saaf tareeka hai aur badi file pe memory bhi bachata hai kyunki ek line ek baar me process hoti hai, poori file nahi. Roommate example: `read()` poori kitab ek saath uthana, `for line in file` ek ek page padhna.

</details>

<details>
<summary>6. CSV file me `split(",")` kya karta hai? Aur real production me kya better hai?</summary>

`split(",")` string ko comma ke basis pe tod ke list banata hai. `"Hermione,Gryffindor".split(",")` → `['Hermione', 'Gryffindor']`. Phir `name, house = line.rstrip().split(",")` unpacking se list ke har element alag variable me chala jata hai. **Real production me** Python ka built-in `csv` module better hai (`import csv; csv.reader(file)`) kyunki real CSV me quoted fields hote hain — jaise `"Gryffindor, reformed"` — aur aise case me `split(",")` galat result dega. Simple data ke liye `split(",")` kaafi hai, par production me `csv` module use karo.

</details>

<details>
<summary>7. Ye File IO backend se kaise connected hai?</summary>

Backend ka poora kaam hi data ko memory se bahar rakhna hai. Jab user ek request bhejta hai, data aata hai, use process karo, aur permanent jagah store karo — taaki agli request pe wahi data mile. File IO wahi base concept hai. Isi ko aage badha ke SQLite aata hai — jo basically ek **structured** file hai jismein tables, indexing, aur queries ka support hai (raw file me hum CSV padh ke khud parse karte hain, SQLite me `SELECT` karte ho). FastAPI Phase 1 me isi `sqlite3` module se database banayenge, aur wo module bhi internally file pe hi kaam karta hai. Toh ye lecture foundation hai.

</details>

---

## What It Is NOT

- ❌ **Database nahi** — ye raw file hai. Koi indexing nahi, koi query language nahi, koi concurrent write handling nahi. Woh sab SQLite me aayega (Phase 1).
- ❌ **JSON nahi** — CSV ek simple text format hai. JSON structured hota hai (nested objects ke liye). Real data interchange me JSON zyada use hota hai.
- ❌ **Excel nahi** — `.xlsx` ek complex format hai jo Python me padhne ke liye extra library (`openpyxl`) chahiye. CSV uska simple bhai hai.
- ❌ **Concurrent write safe nahi** — do programs ek hi file pe likh rahe ho to data corrupt ho sakta hai. Iske liye file locking ya database chahiye.
- ❌ **Security nahi** — `open()` kisi bhi file khol sakta hai. Production me careful path validation zaroori hai (path traversal attacks se bachna).

---

## Agle Step Mein Kya Hoga

Tumne seekha — **data ko file me likhna aur file se padhna**. Ye **raw** file tha — plain text, commas, nahi jaante ki kis kaunsa data hai.

Agle phase me **structured** storage aayega — jaha database khud batayega ki data ke columns kaunse hain, kaunsa primary key hai, aur tum SQL se query kar sakte ho bina manually parse kiye.

Par usse pehle ek **zaroori soch** clear karni padegi — **backend kya hota hai**. Kyunki jab tak tum nahi jaante ki backend hai kya, to ye sab sirf "files me likhna" lagega. Backend mindset ke baad samajh aayega ki ye file IO **kyun** zaroori thi, aur FastAPI me kahan fit hoti hai.

**Agla: Phase 0 — Backend Mindset (0.1 Client-Server Model)**

---

**Related:** `COURSE-OVERVIEW.md` · Lec 6 (Unit Testing) — errors handle karna seekha tha, ye uske natural next step hai · `Phase 0 - Backend Mindset/0.1 Client-Server Model.md` · `Phase 1 - FastAPI Basics (CRUD + SQLite)/1.4 SQLite se Jodo.md`