# Conditionals in Python

## What are Conditionals?

**Conditionals** (or conditional statements) let you ask questions in your code and make decisions based on the answers. They're like forks in the road - depending on the answer to a question, your program goes down one path or another.

Think of it this way: "IF it's raining, THEN take an umbrella, ELSE leave it at home." That's a conditional statement in everyday life!

---

## Comparison Operators

Before we can ask questions, we need to know how to compare things. Python gives us these symbols:

| Operator | Meaning | Example |
|----------|---------|---------|
| `>` | Greater than | `x > y` |
| `>=` | Greater than or equal to | `x >= y` |
| `<` | Less than | `x < y` |
| `<=` | Less than or equal to | `x <= y` |
| `==` | Equal to | `x == y` |
| `!=` | Not equal to | `x != y` |

**Critical Point:** Notice the double equals `==` for comparison! 
- Single `=` is for **assignment** (putting a value into a variable)
- Double `==` is for **comparison** (checking if two things are equal)

```python
x = 5      # Assignment: store 5 in x
x == 5     # Comparison: check if x equals 5 (returns True)
```

---

## Boolean Expressions

A **Boolean expression** is a question that has only two possible answers: **True** or **False**. It's named after mathematician George Boole.

```python
x = 10
y = 20

x < y      # True
x > y      # False
x == y     # False
x != y     # True
```

Since there are only two possible answers, it's super easy for the computer to make decisions based on them!

---

## The `if` Statement

The `if` keyword lets you execute code only when a condition is true.

**Basic Syntax:**
```python
if condition:
    # code to run if condition is True
```

**Important Syntax Details:**
1. The line ends with a **colon** `:`
2. The code to execute is **indented** (4 spaces or 1 tab)
3. No parentheses required around the condition (though they're allowed)

### Example: Comparing Two Numbers

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y:
    print("x is less than y")
if x > y:
    print("x is greater than y")
if x == y:
    print("x is equal to y")
```

**What happens here:**
- Python checks each `if` statement one by one
- If the condition is True, it executes the indented code
- If the condition is False, it skips that block

---

## The `elif` Statement

**Problem with multiple `if` statements:** Python checks EVERY single one, even if it already found a true condition. That's inefficient!

**Solution:** Use `elif` (short for "else if")

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
elif x == y:
    print("x is equal to y")
```

**How `elif` works:**
- Python checks the first `if`
- If it's True, it runs that code and skips the rest
- If it's False, it checks the next `elif`
- Only ONE block of code will run (the first true one)

This is more efficient because Python stops checking once it finds a true condition!

---

## The `else` Statement

`else` is the catch-all. It runs when none of the previous conditions were true.

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
else:
    print("x is equal to y")
```

**Why is this better?**
- We don't need to explicitly check `x == y`
- If x isn't less than y, and x isn't greater than y, then it MUST be equal to y
- Cleaner, more efficient code!

---

## Logical Operators

Sometimes you need to combine multiple conditions. Python gives you three logical operators:

### `or` - At Least One Must Be True

```python
if x < y or x > y:
    print("x is not equal to y")
else:
    print("x is equal to y")
```

If EITHER condition is true, the whole expression is true.

### `and` - Both Must Be True

```python
if score >= 90 and score <= 100:
    print("Grade: A")
```

BOTH conditions must be true for the whole expression to be true.

### `not` - Negates a Condition

```python
if not x == y:
    print("x is not equal to y")
```

Flips True to False and False to True.

---

## The Not Equal Operator `!=`

Instead of checking if something is NOT equal using `not` and `==`, use `!=`:

```python
# These are equivalent:
if not x == y:
    print("x is not equal to y")

# Better way:
if x != y:
    print("x is not equal to y")
```

Much cleaner and more readable!

---

## Grade Calculator Example

Let's look at a practical example - converting a score to a letter grade:

### Version 1: Explicit Range Checking

```python
score = int(input("Score: "))

if score >= 90 and score <= 100:
    print("Grade: A")
elif score >= 80 and score < 90:
    print("Grade: B")
elif score >= 70 and score < 80:
    print("Grade: C")
elif score >= 60 and score < 70:
    print("Grade: D")
else:
    print("Grade: F")
```

### Version 2: Python's Chained Comparisons

Python lets you chain comparisons like you would in math:

```python
score = int(input("Score: "))

if 90 <= score <= 100:
    print("Grade: A")
elif 80 <= score < 90:
    print("Grade: B")
elif 70 <= score < 80:
    print("Grade: C")
elif 60 <= score < 70:
    print("Grade: D")
else:
    print("Grade: F")
```

This reads more naturally: "if 90 is less than or equal to score AND score is less than or equal to 100"

### Version 3: Even Simpler!

Since we're using `elif`, we know that if we reach the second condition, the first one was already false. So we don't need upper bounds:

```python
score = int(input("Score: "))

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
else:
    print("Grade: F")
```

**Why this works:**
- If score >= 90, we print "A" and stop
- If we reach the 80 check, we KNOW score < 90 (otherwise we wouldn't be here)
- If we reach the 70 check, we KNOW score < 80
- And so on...

This is the cleanest, most efficient version!

---

## The Modulo Operator `%`

The **modulo operator** `%` gives you the remainder after division.

```python
10 % 3  # Result: 1 (because 10 ÷ 3 = 3 remainder 1)
15 % 5  # Result: 0 (because 15 ÷ 5 = 3 remainder 0)
7 % 2   # Result: 1 (because 7 ÷ 2 = 3 remainder 1)
```

**Common Use Case:** Checking if a number is even or odd

```python
x = int(input("What's x? "))

if x % 2 == 0:
    print("Even")
else:
    print("Odd")
```

**How it works:**
- If a number divided by 2 has a remainder of 0, it's even
- If it has any other remainder (which would be 1), it's odd

---

## Creating Boolean Functions

You can create functions that return `True` or `False`:

### Version 1: Explicit Returns

```python
def is_even(x):
    if x % 2 == 0:
        return True
    else:
        return False

def main():
    x = int(input("What's x? "))
    if is_even(x):
        print("Even")
    else:
        print("Odd")

main()
```

### Version 2: Simpler (No Else Needed)

```python
def is_even(x):
    if x % 2 == 0:
        return True
    return False
```

Why does this work? If the condition is true, we return True and exit the function. If we reach the second return, it means the condition was false!

### Version 3: Most Pythonic

```python
def is_even(x):
    return x % 2 == 0
```

**Why this is brilliant:**
- `x % 2 == 0` is already a Boolean expression (True or False)
- Just return it directly!
- No if statement needed at all

This is the cleanest, most Python way to write it.

---

## The `match` Statement (Switch-Like Behavior)

Python 3.10+ introduced the `match` statement, which is similar to `switch` statements in other languages.

### The Harry Potter House Example

**Problem:** We want to sort characters into their Hogwarts houses.

### Version 1: Multiple If Statements

```python
name = input("What's your name? ")

if name == "Harry":
    print("Gryffindor")
elif name == "Hermione":
    print("Gryffindor")
elif name == "Ron":
    print("Gryffindor")
elif name == "Draco":
    print("Slytherin")
else:
    print("Who?")
```

This works, but there's repetition. Three separate checks for Gryffindor!

### Version 2: Using `or`

```python
name = input("What's your name? ")

if name == "Harry" or name == "Hermione" or name == "Ron":
    print("Gryffindor")
elif name == "Draco":
    print("Slytherin")
else:
    print("Who?")
```

Better! We consolidated the Gryffindor checks.

### Version 3: Using `match`

```python
name = input("What's your name? ")

match name:
    case "Harry":
        print("Gryffindor")
    case "Hermione":
        print("Gryffindor")
    case "Ron":
        print("Gryffindor")
    case "Draco":
        print("Slytherin")
    case _:
        print("Who?")
```

**Key Points:**
- `match name:` - we're matching against the `name` variable
- `case "value":` - each possible value gets a case
- The code under each case is indented
- `case _:` - the underscore is the catch-all (like `else`)

### Version 4: Combining Cases with `|`

```python
name = input("What's your name? ")

match name:
    case "Harry" | "Hermione" | "Ron":
        print("Gryffindor")
    case "Draco":
        print("Slytherin")
    case _:
        print("Who?")
```

The pipe `|` means OR. This is the cleanest version!

**Important Notes:**
- Unlike some languages, you DON'T need `break` statements
- The underscore `_` acts as the default/catch-all case
- The `match` statement is only available in Python 3.10+

---

## When to Use What?

### Use `if/elif/else` when:
- You have simple conditions
- You're checking different variables or complex conditions
- You need maximum compatibility (older Python versions)

### Use `match/case` when:
- You're checking one variable against many possible values
- You want cleaner, more readable code for multiple cases
- You're using Python 3.10 or newer

Both are valid! Choose what makes your code most readable.

---

## Flowcharts: Visualizing Logic

A **flowchart** is a diagram that shows your program's logic flow:

- **Oval** = Start/End
- **Diamond** = Decision (question with True/False branches)
- **Rectangle** = Action (code to execute)
- **Arrows** = Flow direction

**Example for x < y:**
```
    Start
      ↓
   [x < y?] ──False──→ [Continue]
      ↓
     True
      ↓
  [Print "x is less than y"]
      ↓
   Continue
```

Flowcharts help you visualize how your program makes decisions!

---

## Best Practices & Tips

### 1. Use `elif` Instead of Multiple `if`s

```python
# ❌ Bad - checks all three even if first is true
if score >= 90:
    print("A")
if score >= 80:
    print("B")
if score >= 70:
    print("C")

# ✅ Good - stops after first true condition
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
```

### 2. Simplify Boolean Logic

```python
# ❌ Verbose
if is_even(x) == True:
    print("Even")

# ✅ Better
if is_even(x):
    print("Even")
```

If a function returns a Boolean, you can use it directly in an `if` statement!

### 3. Take Advantage of Else

```python
# ❌ Redundant
if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
elif x == y:
    print("x is equal to y")

# ✅ Cleaner
if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
else:
    print("x is equal to y")
```

### 4. Use Python's Chained Comparisons

```python
# ❌ Works but verbose
if x >= 1 and x <= 10:
    print("Single digit")

# ✅ More Pythonic
if 1 <= x <= 10:
    print("Single digit")
```

### 5. Return Booleans Directly

```python
# ❌ Unnecessary if statement
def is_positive(x):
    if x > 0:
        return True
    else:
        return False

# ✅ Direct and clean
def is_positive(x):
    return x > 0
```

---

## Control Flow: How Your Program Runs

**Control flow** is the order in which your code executes. With conditionals, you're controlling the flow by making decisions.

**Without conditionals:**
```
Line 1 → Line 2 → Line 3 → Line 4
```
Every line runs, top to bottom.

**With conditionals:**
```
Line 1 → [Decision] → Line 3 (if True)
           ↓
        Line 5 (if False)
```
Your program can skip certain lines based on conditions!

---

## Common Pitfalls to Avoid

### 1. Using `=` Instead of `==`

```python
# ❌ WRONG - This assigns y to x!
if x = y:
    print("Equal")

# ✅ CORRECT - This compares x and y
if x == y:
    print("Equal")
```

### 2. Forgetting the Colon

```python
# ❌ WRONG - Missing colon
if x < y
    print("Less than")

# ✅ CORRECT
if x < y:
    print("Less than")
```

### 3. Forgetting to Indent

```python
# ❌ WRONG - No indentation
if x < y:
print("Less than")

# ✅ CORRECT - Indented
if x < y:
    print("Less than")
```

### 4. Checking Impossible Conditions

```python
# ❌ Logical error - if score >= 90, it's also >= 80!
if score >= 80:
    print("B")
elif score >= 90:
    print("A")  # This will never run!

# ✅ CORRECT - Check higher values first
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
```

---

## Key Vocabulary

- **Conditional** - A statement that asks a question and executes code based on the answer
- **Boolean Expression** - A question with a True/False answer
- **Control Flow** - The order in which code is executed
- **Comparison Operator** - Symbols like `<`, `>`, `==` used to compare values
- **Logical Operator** - `and`, `or`, `not` - used to combine conditions
- **Modulo** - The `%` operator that gives the remainder after division
- **Side Effect** - A visible result of code (like printing to screen)

---

## Summary

Conditionals give your programs the power to make decisions. Here's what you learned:

**Core Concepts:**
- Use `if` to execute code only when a condition is True
- Use `elif` for additional conditions (more efficient than multiple `if`s)
- Use `else` as a catch-all for when all conditions are False
- Boolean expressions evaluate to True or False
- Comparison operators: `<`, `>`, `<=`, `>=`, `==`, `!=`
- Logical operators: `and`, `or`, `not`

**Advanced Techniques:**
- Python's chained comparisons: `1 <= x <= 10`
- The modulo operator `%` for checking remainders
- Creating Boolean functions that return True/False
- The `match` statement for cleaner multi-case checking
- Using `|` to combine multiple cases

**Best Practices:**
- Use `elif` instead of multiple `if` statements
- Simplify Boolean logic (return Boolean expressions directly)
- Take advantage of `else` to avoid redundant checks
- Use the `!=` operator instead of `not ==`
- Order conditions from most to least restrictive

With conditionals, your programs can now make smart decisions based on user input, calculations, or any other data. This is where programming starts to get really powerful! 🚀