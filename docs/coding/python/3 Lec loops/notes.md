# Loops in Python

## What are Loops?

**Loops** give you the ability to do something again and again - cyclically. Instead of writing the same line of code 50 times, you can write it once and tell the computer to repeat it 50 times.

Think of it like this: if you had to say "meow" three times, you wouldn't need three separate mouths - you'd just use the same mouth three times. That's what loops do for your code!

---

## Why Do We Need Loops?

Let's say you want to print "Meow" three times. You could do this:

```python
print("Meow")
print("Meow")
print("Meow")
```

This works, but it's **poorly designed**. Here's why:

### Problems with Repetition:
1. **Not scalable** - What if you need to meow 500 times? Copy-paste 500 times? No way!
2. **Hard to maintain** - If you change your mind and want "Woof" instead, you have to change it in 500 places
3. **Violates DRY principle** - "Don't Repeat Yourself" is a fundamental programming concept

**The Solution:** Loops let you write the code once and repeat it as many times as needed.

---

## The `while` Loop

A **while loop** repeats code as long as a condition remains `True`. It keeps asking a Boolean question (True/False) and executing the code until the answer becomes `False`.

**Syntax:**
```python
while condition:
    # code to repeat
```

### Counting Down Example

```python
i = 3
while i != 0:
    print("Meow")
    i = i - 1
```

**How this works:**
1. Start with `i = 3`
2. Check: is `i != 0`? Yes (3 ≠ 0) → print "Meow", subtract 1 → `i = 2`
3. Check: is `i != 0`? Yes (2 ≠ 0) → print "Meow", subtract 1 → `i = 1`
4. Check: is `i != 0`? Yes (1 ≠ 0) → print "Meow", subtract 1 → `i = 0`
5. Check: is `i != 0`? No (0 = 0) → STOP!

Result: "Meow" gets printed 3 times!

### Counting Up Example

```python
i = 0
while i < 3:
    print("Meow")
    i = i + 1  # or i += 1
```

**Shorthand for incrementing:**
```python
i = i + 1  # Long way
i += 1     # Short way (does the same thing!)
```

Both mean: "add 1 to i and store it back in i"

---

## Infinite Loops (And How to Avoid Them!)

An **infinite loop** runs forever because the condition never becomes `False`.

**Dangerous Example:**
```python
i = 3
while i != 0:
    print("Meow")
    # Forgot to decrement i!
```

This will print "Meow" FOREVER because `i` stays at 3 and never reaches 0!

**How to escape an infinite loop:**
- Press `Ctrl + C` (Control + C) in your terminal
- This interrupts/cancels the running program

**Key Lesson:** Always make sure your loop condition will eventually become `False`!

---

## The `for` Loop

A **for loop** iterates over a sequence (like a list or range). It's generally cleaner and safer than `while` loops for counting.

### Version 1: Explicit List

```python
for i in [0, 1, 2]:
    print("Meow")
```

This works, but imagine typing `[0, 1, 2, 3, 4, ..., 999]` for a thousand iterations. Terrible!

### Version 2: Using `range()`

```python
for i in range(3):
    print("Meow")
```

**Much better!** `range(3)` automatically generates 0, 1, 2 for you.

**How `range()` works:**
- `range(3)` → generates 0, 1, 2 (stops BEFORE 3)
- `range(5)` → generates 0, 1, 2, 3, 4 (stops BEFORE 5)
- `range(n)` → generates 0 through n-1

### Version 3: Underscore for Unused Variables

```python
for _ in range(3):
    print("Meow")
```

If you don't actually use the loop variable (`i`), Python convention is to use an underscore `_`. This signals "I don't care about this variable, I just want to repeat something."

---

## The Ultimate One-Liner

Want to get really clever? You can do this:

```python
print("Meow\n" * 3, end="")
```

**Breaking this down:**
- `"Meow\n"` - the string "Meow" with a newline
- `* 3` - string multiplication creates "Meow\nMeow\nMeow\n"
- `end=""` - prevents print from adding an extra newline

Output:
```
Meow
Meow
Meow
```

This is clever, but for most cases, a `for` loop is more readable!

---

## Getting Positive Input with `while True`

Sometimes you need to keep asking the user for input until they give you valid data. The `while True` pattern is perfect for this.

### The Pattern: `while True` + `break`

```python
while True:
    n = int(input("What's n? "))
    if n > 0:
        break

for _ in range(n):
    print("Meow")
```

**How this works:**
1. `while True` creates a loop that runs forever (on purpose!)
2. Ask the user for input
3. Check if it's valid (`n > 0`)
4. If valid, `break` out of the loop
5. If not valid, loop continues and asks again

The `break` keyword exits the loop immediately.

### Better Design: Separate Functions

```python
def main():
    number = get_number()
    meow(number)

def get_number():
    while True:
        n = int(input("What's n? "))
        if n > 0:
            return n

def meow(n):
    for _ in range(n):
        print("Meow")

main()
```

**Why this is better:**
- Each function has a single, clear purpose
- `get_number()` handles input validation
- `meow()` handles printing
- `main()` orchestrates everything
- Easier to test, debug, and reuse

**Notice:** `return` also exits the function (and the loop), so we don't need `break` here!

---

## Lists: Storing Multiple Values

A **list** is a data structure that holds multiple values in a specific order.

**Creating a list:**
```python
students = ["Hermione", "Harry", "Ron"]
```

**Accessing list items by index:**
```python
print(students[0])  # "Hermione" (first item)
print(students[1])  # "Harry" (second item)
print(students[2])  # "Ron" (third item)
```

**Important:** Lists are **zero-indexed**, meaning the first item is at position 0, not 1!

```
Index:     0           1         2
Value:  "Hermione"  "Harry"   "Ron"
```

**Index out of range error:**
```python
print(students[3])  # ERROR! Only indices 0, 1, 2 exist
```

---

## Looping Through Lists

### Method 1: Iterate Over Items Directly

```python
students = ["Hermione", "Harry", "Ron"]

for student in students:
    print(student)
```

**Output:**
```
Hermione
Harry
Ron
```

This is the **Pythonic way** - clean and readable. You get each item directly without worrying about indices.

### Method 2: Using Indices

```python
students = ["Hermione", "Harry", "Ron"]

for i in range(len(students)):
    print(i + 1, students[i])
```

**Output:**
```
1 Hermione
2 Harry
3 Ron
```

**Breaking this down:**
- `len(students)` returns 3 (the length of the list)
- `range(len(students))` generates 0, 1, 2
- `i + 1` converts from zero-indexed to 1-indexed for display
- `students[i]` accesses each student by index

**When to use this:** When you need the index number, like for numbering items.

---

## Dictionaries: Key-Value Pairs

A **dictionary** stores data as key-value pairs. Think of it like a real dictionary: you look up a word (key) to find its definition (value).

**Creating a dictionary:**
```python
students = {
    "Hermione": "Gryffindor",
    "Harry": "Gryffindor",
    "Ron": "Gryffindor",
    "Draco": "Slytherin"
}
```

**Accessing values:**
```python
print(students["Hermione"])  # "Gryffindor"
print(students["Draco"])     # "Slytherin"
```

**Looping through a dictionary:**
```python
for student in students:
    print(student, students[student], sep=", ")
```

**Output:**
```
Hermione, Gryffindor
Harry, Gryffindor
Ron, Gryffindor
Draco, Slytherin
```

**How this works:**
- When you loop through a dictionary, you get each **key**
- Use the key to access the **value**: `students[student]`
- `sep=", "` makes print separate the items with a comma and space

---

## Lists of Dictionaries: Complex Data Structures

You can combine lists and dictionaries to create rich, complex data structures!

```python
students = [
    {"name": "Hermione", "house": "Gryffindor", "patronus": "Otter"},
    {"name": "Harry", "house": "Gryffindor", "patronus": "Stag"},
    {"name": "Ron", "house": "Gryffindor", "patronus": "Jack Russell terrier"},
    {"name": "Draco", "house": "Slytherin", "patronus": None},
]

for student in students:
    print(student["name"], student["house"], student["patronus"], sep=", ")
```

**Output:**
```
Hermione, Gryffindor, Otter
Harry, Gryffindor, Stag
Ron, Gryffindor, Jack Russell terrier
Draco, Slytherin, None
```

**What's happening here:**
- `students` is a **list** containing **dictionaries**
- Each dictionary represents one student with multiple attributes
- `None` is Python's way of representing "no value" or "null"

**Why this structure?**
- Each student has multiple pieces of information
- Dictionaries let you name each piece (name, house, patronus)
- Lists let you group all students together
- You can easily add more students or more attributes

This is how real applications store data!

---

## Nested Loops: Loops Inside Loops

Sometimes you need to repeat something multiple times, and within each repetition, repeat something else multiple times. That's when you use **nested loops**.

### The Mario Example: Printing a Square

Let's print a 3x3 square of bricks:
```
###
###
###
```

**The Code:**
```python
def main():
    print_square(3)

def print_square(size):
    # For each row in the square
    for i in range(size):
        # For each brick in the row
        for j in range(size):
            print("#", end="")
        print()  # Move to next line after each row

main()
```

**How nested loops work:**
1. Outer loop runs for each **row** (3 times)
2. For EACH row, the inner loop runs for each **column** (3 times)
3. Print "#" without a newline (`end=""`)
4. After inner loop completes, print a blank line to move to next row

**Mental Model:** Think of an old typewriter or printer:
- It prints from **top to bottom** (outer loop = rows)
- Within each line, it prints **left to right** (inner loop = columns)

**Execution Breakdown:**
```
i=0 (Row 1): j=0 (#), j=1 (#), j=2 (#), then newline
i=1 (Row 2): j=0 (#), j=1 (#), j=2 (#), then newline
i=2 (Row 3): j=0 (#), j=1 (#), j=2 (#), then newline
```

**Why separate variables?**
- Use different variable names (`i`, `j`, `k`) for each nested loop level
- This prevents confusion and keeps your counting straight
- Common convention: `i` for outer, `j` for inner, `k` for even deeper nesting

### Alternative: Using String Multiplication

```python
def print_square(size):
    for i in range(size):
        print("#" * size)
```

This is simpler! For each row, print `size` number of "#" characters. Same result, fewer lines of code.

### Maximum Abstraction: Helper Functions

```python
def main():
    print_square(3)

def print_square(size):
    for i in range(size):
        print_row(size)

def print_row(width):
    print("#" * width)

main()
```

**Why break it down this way?**
- `print_square()` doesn't need to know HOW to print a row, just that it needs to
- `print_row()` handles the details of printing
- This is called **abstraction** - hiding complex details behind simple interfaces
- Makes code easier to understand, test, and modify

---

## Loop Control Flow

### Visualizing While Loops

```
Start
  ↓
[Condition True?] ──No──→ Exit
  ↓
 Yes
  ↓
[Execute Code]
  ↓
[Update Counter]
  ↓
(Loop back to check condition)
```

### Visualizing For Loops

```
Start
  ↓
[More items in sequence?] ──No──→ Exit
  ↓
 Yes
  ↓
[Execute code with next item]
  ↓
(Loop back to check for more items)
```

---

## When to Use Which Loop?

### Use `while` when:
- You don't know how many times you need to loop
- You're waiting for a condition to be met
- You're validating user input
- The loop should continue until something specific happens

**Example:**
```python
while True:
    n = int(input("Enter a positive number: "))
    if n > 0:
        break
```

### Use `for` when:
- You know how many times to loop
- You're iterating over a sequence (list, string, range)
- You want cleaner, more readable code for counting

**Example:**
```python
for i in range(10):
    print(i)

for student in students:
    print(student)
```

**General rule:** If you CAN use a `for` loop, prefer it over `while`. It's cleaner and less prone to infinite loops.

---

## Common Loop Patterns

### Pattern 1: Counting Up
```python
for i in range(n):
    print(i)  # 0, 1, 2, ..., n-1
```

### Pattern 2: Counting Down
```python
for i in range(n, 0, -1):
    print(i)  # n, n-1, ..., 2, 1
```

### Pattern 3: Input Validation
```python
while True:
    value = input("Enter valid input: ")
    if is_valid(value):
        break
```

### Pattern 4: Processing Lists
```python
for item in list:
    process(item)
```

### Pattern 5: Creating New Lists
```python
results = []
for item in original_list:
    results.append(transform(item))
```

---

## Key Vocabulary

- **Loop** - Code that repeats multiple times
- **Iteration** - One execution of the loop body
- **Counter** - A variable that tracks how many times a loop has run
- **Infinite Loop** - A loop that never stops (usually a bug!)
- **Break** - Keyword that exits a loop immediately
- **Continue** - Keyword that skips to the next iteration (not covered in detail, but good to know)
- **List** - An ordered collection of items
- **Index** - The position of an item in a list (starting from 0)
- **Dictionary** - A collection of key-value pairs
- **Nested Loop** - A loop inside another loop
- **Abstraction** - Hiding complexity behind simpler interfaces

---

## Common Mistakes to Avoid

### 1. Forgetting to Update the Counter in While Loops

```python
# ❌ WRONG - Infinite loop!
i = 0
while i < 3:
    print("Meow")
    # Forgot i += 1

# ✅ CORRECT
i = 0
while i < 3:
    print("Meow")
    i += 1
```

### 2. Off-by-One Errors

```python
# ❌ Wrong - only loops 2 times (i=0, i=1)
for i in range(2):
    print("Meow")

# ✅ Correct - loops 3 times (i=0, i=1, i=2)
for i in range(3):
    print("Meow")
```

Remember: `range(n)` goes from 0 to n-1!

### 3. Confusing List Index

```python
students = ["Hermione", "Harry", "Ron"]

# ❌ Wrong - causes IndexError
print(students[3])  # No item at index 3!

# ✅ Correct
print(students[2])  # "Ron" at index 2
```

### 4. Using the Same Variable in Nested Loops

```python
# ❌ Bad - i gets overwritten!
for i in range(3):
    for i in range(3):  # Reusing i!
        print("#", end="")
    print()

# ✅ Good - different variables
for i in range(3):
    for j in range(3):
        print("#", end="")
    print()
```

### 5. Not Handling Edge Cases

```python
# ❌ What if user enters 0 or negative?
n = int(input("How many times? "))
for i in range(n):
    print("Meow")

# ✅ Validate input first
while True:
    n = int(input("How many times? "))
    if n > 0:
        break

for i in range(n):
    print("Meow")
```

---

## Comparing Loop Approaches

### Printing "Meow" 3 Times: Evolution

**Level 1: Repetition (Bad)**
```python
print("Meow")
print("Meow")
print("Meow")
```
Problems: Not scalable, hard to maintain

**Level 2: While Loop (Better)**
```python
i = 0
while i < 3:
    print("Meow")
    i += 1
```
Better: Scales to any number, but verbose

**Level 3: For Loop with List (OK)**
```python
for i in [0, 1, 2]:
    print("Meow")
```
Better: Cleaner, but list is hardcoded

**Level 4: For Loop with Range (Good)**
```python
for i in range(3):
    print("Meow")
```
Better: Clean, scalable, readable

**Level 5: For Loop with Underscore (Best Practice)**
```python
for _ in range(3):
    print("Meow")
```
Best: Shows we don't use the counter

**Level 6: String Multiplication (Clever)**
```python
print("Meow\n" * 3, end="")
```
Clever: One line, but arguably less readable

**The Takeaway:** There are many ways to solve the same problem. Choose the approach that balances clarity, efficiency, and maintainability!

---

## Best Practices

### 1. Use Descriptive Variable Names
```python
# ❌ Not clear
for x in list:
    print(x)

# ✅ Clear
for student in students:
    print(student)
```

### 2. Use `_` for Unused Loop Variables
```python
# If you don't need the counter
for _ in range(5):
    print("Hello")
```

### 3. Prefer `for` Over `while` When Possible
```python
# ❌ More complex
i = 0
while i < len(students):
    print(students[i])
    i += 1

# ✅ Simpler
for student in students:
    print(student)
```

### 4. Break Complex Loops into Functions
```python
# Instead of deeply nested loops, use helper functions
def print_square(size):
    for i in range(size):
        print_row(size)

def print_row(width):
    print("#" * width)
```

### 5. Add Comments for Complex Logic
```python
def print_square(size):
    for i in range(size):          # For each row
        for j in range(size):      # For each column
            print("#", end="")      # Print brick
        print()                     # New line after row
```

---

## Summary

Loops are one of the most powerful tools in programming. Here's what you've learned:

**Core Concepts:**
- **While loops** repeat as long as a condition is True
- **For loops** iterate over sequences or ranges
- **Lists** store multiple values with indices
- **Dictionaries** store key-value pairs
- **Nested loops** allow multi-dimensional iteration

**Key Patterns:**
- `while True` + `break` for input validation
- `for item in list` for iterating over collections
- `range(n)` for counting a specific number of times
- `_` underscore for unused loop variables
- Separate functions for better organization

**Common Operations:**
- Counting up/down
- Processing collections
- Creating grids/patterns with nested loops
- Validating user input
- Building complex data structures

**Best Practices:**
- Prefer `for` over `while` when possible
- Use descriptive variable names
- Avoid infinite loops by ensuring the condition changes
- Break complex loops into functions
- Use `_` when you don't need the loop variable

**Remember:** Loops combined with conditionals, functions, and variables give you the building blocks to solve complex, interesting problems. Master these fundamentals, and you can build anything! 🚀