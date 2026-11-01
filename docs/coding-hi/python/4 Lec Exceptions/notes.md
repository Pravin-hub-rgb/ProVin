# Exceptions in Python

## What are Exceptions?

An **exception** in Python is when something goes wrong in your program. Unlike in everyday English where "exceptional" means good, in programming it means something has gone wrong - and ideally, you'll handle it gracefully.

Exceptions happen at **runtime** (while your program is running), often due to unexpected user input or other conditions you didn't anticipate when writing the code.

---

## Types of Errors

### 1. Syntax Errors (Must Fix Before Running)

**Syntax errors** are mistakes in your code's structure - like typos or missing characters. These prevent your program from running at all.

**Example:**
```python
print("hello, world)  # Missing closing quote!
```

**Error Message:**
```
SyntaxError: unterminated string literal
```

**Breaking down the error:**
- **"unterminated"** = you started something but didn't finish it
- **"string"** = text (or "str" in Python)
- **"literal"** = something you literally typed (not a variable)

**The Fix:**
```python
print("hello, world")  # Added closing quote
```

**Key Point:** Syntax errors must be fixed before your program can even run. Python won't execute any code until all syntax errors are resolved.

---

### 2. Runtime Errors (Happen While Running)

**Runtime errors** occur while your program is executing. These often happen because of unexpected input or conditions you didn't plan for.

Common runtime errors include:
- `ValueError` - wrong type of value
- `NameError` - using a variable that doesn't exist
- `ZeroDivisionError` - dividing by zero
- `TypeError` - wrong data type
- `IndexError` - accessing list index that doesn't exist
- And many more...

---

## The Problem: Unhandled Exceptions

Let's look at a simple program that gets an integer from the user:

```python
x = int(input("What's x? "))
print(f"x is {x}")
```

**When this works:**
```
What's x? 50
x is 50
```

**When this breaks:**
```
What's x? cat
ValueError: invalid literal for int() with base 10: 'cat'
```

**The Problem:** You can't convert "cat" to an integer! The program crashes with a `ValueError`.

**Testing Corner Cases:**
- Positive numbers: ✅ Works (50)
- Zero: ✅ Works (0)
- Negative numbers: ✅ Works (-1)
- Non-numeric input: ❌ Crashes ("cat")

You need to handle the case where the user doesn't give you valid input!

---

## The Solution: Try-Except

Python's `try-except` structure lets you **attempt** something, and if it fails, **handle the error** gracefully instead of crashing.

**Syntax:**
```python
try:
    # Code that might cause an error
except ErrorType:
    # What to do if that error happens
```

### Basic Try-Except Example

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
else:
    print(f"x is {x}")
```

**How this works:**
1. **Try** to get input and convert it to an int
2. If a `ValueError` occurs (user types "cat"), **except** catches it
3. Print a helpful message instead of crashing
4. If no error occurs, the **else** block runs

**The Flow:**

**Success path:**
```
Try block → No error → Else block runs
```

**Error path:**
```
Try block → ValueError → Except block runs → Program continues
```

---

## Adding `else` for Success Cases

The `else` clause runs **only if no exception occurred** in the try block.

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
else:
    print(f"x is {x}")
```

**Why use `else`?**
- Makes code more readable
- Clearly separates error handling from success logic
- Shows what happens when things go RIGHT

**Important:** `else` is optional, but it makes your intent clearer!

---

## Looping Until Success: The `while True` Pattern

Often you want to keep asking for input until the user gives you something valid. Combine `while True` with `try-except`:

```python
while True:
    try:
        x = int(input("What's x? "))
    except ValueError:
        print("x is not an integer")
    else:
        break

print(f"x is {x}")
```

**How this works:**
1. Start an infinite loop (`while True`)
2. Try to get and convert input
3. If ValueError occurs, print error and loop continues (asks again)
4. If successful, `else` runs and `break` exits the loop
5. Continue with the rest of the program

**Testing:**
```
What's x? cat
x is not an integer
What's x? dog
x is not an integer
What's x? 50
x is 50
```

It keeps asking until you give valid input!

---

## Creating Reusable Functions

Instead of writing try-except logic everywhere, encapsulate it in a function:

### Version 1: Basic Function

```python
def main():
    x = get_int()
    print(f"x is {x}")

def get_int():
    while True:
        try:
            x = int(input("What's x? "))
        except ValueError:
            print("x is not an integer")
        else:
            return x

main()
```

**Benefits:**
- Separation of concerns: `main()` doesn't worry about validation
- `get_int()` can be reused anywhere you need an integer
- Cleaner, more organized code

---

### Version 2: Using `return` Directly

You can simplify by using `return` directly in the try block:

```python
def get_int():
    while True:
        try:
            return int(input("What's x? "))
        except ValueError:
            print("x is not an integer")
```

**Why this works:**
- If conversion succeeds, `return` immediately exits the function AND the loop
- If ValueError occurs, except catches it, prints message, and loop continues
- No need for `else` and `break` - `return` handles both!

**This is more concise and equally clear.**

---

### Version 3: Using `pass` (Silent Errors)

If you don't want to print anything when there's an error, use `pass`:

```python
def get_int():
    while True:
        try:
            return int(input("What's x? "))
        except ValueError:
            pass
```

**What `pass` does:**
- It's a "do nothing" statement
- The exception is caught but silently ignored
- The loop just tries again without any message

**When to use `pass`:**
- When you want to silently retry without feedback
- When error messages would be annoying or redundant
- When the prompt itself makes it clear what's expected

**Testing:**
```
What's x? cat
What's x? dog
What's x? 50
x is 50
```

No error messages - it just keeps asking!

---

## Making Functions More Flexible with Parameters

Right now, `get_int()` always asks "What's x?". What if you want to ask for y, or z, or any other variable?

**Solution: Add a parameter!**

```python
def main():
    x = get_int("What's x? ")
    print(f"x is {x}")

def get_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            pass

main()
```

**What changed:**
- `get_int()` now takes a `prompt` parameter
- `main()` passes in the specific prompt string
- `get_int()` is now reusable for ANY integer input!

**Example usage:**
```python
x = get_int("What's x? ")
y = get_int("What's y? ")
z = get_int("Enter your age: ")
score = get_int("Enter your score: ")
```

Same function, different prompts!

---

## Understanding Indentation in Try-Except

Python uses **indentation** to show what code is associated with what. This is mandatory, not just style!

```python
def get_int():              # Function definition
    while True:             # 4 spaces: inside function
        try:                # 8 spaces: inside while loop
            return int(input("What's x? "))  # 12 spaces: inside try
        except ValueError:  # 8 spaces: inside while loop
            pass            # 12 spaces: inside except
```

**Indentation rules:**
- Code at the same indentation level is at the same "scope"
- Indented code "belongs to" the line above it
- 4 spaces per level is the Python standard (or 1 tab = 4 spaces)

**What each level means:**
- **4 spaces:** This is part of the `get_int()` function
- **8 spaces:** This is inside the `while` loop
- **12 spaces:** This is inside the `try` or `except` block

---

## Multiple Except Clauses

You can handle different types of exceptions differently:

```python
try:
    x = int(input("What's x? "))
    result = 10 / x
except ValueError:
    print("x is not an integer")
except ZeroDivisionError:
    print("x cannot be zero")
else:
    print(f"Result is {result}")
```

**How this works:**
- If user types "cat" → `ValueError` caught
- If user types "0" → `ZeroDivisionError` caught
- If user types "5" → No error, else runs

---

## Catching All Exceptions (Use Carefully!)

You can catch all exceptions with a bare `except`:

```python
try:
    x = int(input("What's x? "))
except:
    print("Something went wrong")
```

**Warning:** This is generally **bad practice** because:
- You don't know what went wrong
- You might catch errors you didn't expect
- Makes debugging harder

**Better:** Be specific about which exceptions you're catching!

```python
# ❌ Too broad
except:
    pass

# ✅ Specific
except ValueError:
    pass
```

---

## The Evolution: From Simple to Robust

Let's see how we improve code step by step:

### Level 1: No Error Handling (Crashes)
```python
x = int(input("What's x? "))
print(f"x is {x}")
```
Problem: Crashes on invalid input

### Level 2: Basic Try-Except
```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
else:
    print(f"x is {x}")
```
Problem: Only handles error once, then program ends

### Level 3: Loop Until Valid
```python
while True:
    try:
        x = int(input("What's x? "))
    except ValueError:
        print("x is not an integer")
    else:
        break
print(f"x is {x}")
```
Better: Keeps asking until valid input

### Level 4: Encapsulated in Function
```python
def get_int():
    while True:
        try:
            return int(input("What's x? "))
        except ValueError:
            pass

x = get_int()
print(f"x is {x}")
```
Better: Reusable, clean separation of concerns

### Level 5: Flexible with Parameters
```python
def get_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            pass

x = get_int("What's x? ")
print(f"x is {x}")
```
Best: Reusable for ANY integer input!

---

## Common Exception Types

Here are exceptions you'll encounter frequently:

| Exception | When It Happens | Example |
|-----------|----------------|---------|
| `ValueError` | Wrong type of value | `int("cat")` |
| `ZeroDivisionError` | Dividing by zero | `10 / 0` |
| `NameError` | Variable doesn't exist | Using `x` before defining it |
| `TypeError` | Wrong data type | `"hello" + 5` |
| `IndexError` | List index out of range | `list[999]` when list has 3 items |
| `KeyError` | Dictionary key doesn't exist | `dict["missing"]` |
| `FileNotFoundError` | File doesn't exist | `open("missing.txt")` |
| `SyntaxError` | Code syntax is wrong | `print("hello)` (missing quote) |

---

## Try-Except-Else-Finally

There's also a `finally` clause that ALWAYS runs, whether an exception occurred or not:

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("Not an integer")
else:
    print(f"x is {x}")
finally:
    print("This always runs")
```

**When to use `finally`:**
- Closing files
- Releasing resources
- Cleanup operations that must happen no matter what

---

## Raising Your Own Exceptions

You can raise exceptions yourself using the `raise` keyword:

```python
def get_positive_int():
    while True:
        try:
            x = int(input("Enter a positive number: "))
            if x <= 0:
                raise ValueError("Number must be positive")
            return x
        except ValueError as e:
            print(f"Error: {e}")
```

This lets you create custom error conditions in your code!

---

## Best Practices

### 1. Be Specific with Exceptions
```python
# ❌ Too broad
try:
    x = int(input("What's x? "))
except:
    print("Error")

# ✅ Specific
try:
    x = int(input("What's x? "))
except ValueError:
    print("Not an integer")
```

### 2. Use Else for Success Logic
```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("Error")
else:
    # Runs only if no exception
    print(f"x is {x}")
```

### 3. Don't Ignore Exceptions Silently
```python
# ❌ Hides problems
try:
    risky_operation()
except:
    pass  # What went wrong?

# ✅ At least log or handle
try:
    risky_operation()
except Exception as e:
    print(f"Error occurred: {e}")
```

### 4. Encapsulate Validation in Functions
```python
def get_int(prompt):
    """Get an integer from user with validation."""
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Please enter a valid integer")
```

### 5. Test Edge Cases
Always test your code with:
- Valid input (50)
- Zero (0)
- Negative numbers (-1)
- Non-numeric input ("cat")
- Empty input ("")
- Very large numbers
- Special characters

---

## The Pythonic Way

Python has a philosophy called **EAFP** (Easier to Ask for Forgiveness than Permission):

**EAFP (Pythonic):**
```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("Not an integer")
```

**LBYL (Look Before You Leap):**
```python
value = input("What's x? ")
if value.isnumeric():
    x = int(value)
else:
    print("Not an integer")
```

**Python prefers EAFP:** Try it and handle errors, rather than checking everything in advance.

---

## Common Patterns

### Pattern 1: Retry Until Valid Input
```python
def get_int():
    while True:
        try:
            return int(input("Number: "))
        except ValueError:
            print("Try again")
```

### Pattern 2: Provide Default on Error
```python
try:
    x = int(input("Number: "))
except ValueError:
    x = 0  # Default value
```

### Pattern 3: Re-raise After Logging
```python
try:
    risky_operation()
except Exception as e:
    log_error(e)
    raise  # Re-raise the exception
```

### Pattern 4: Multiple Exceptions
```python
try:
    result = divide(a, b)
except ValueError:
    print("Invalid value")
except ZeroDivisionError:
    print("Cannot divide by zero")
```

---

## Common Mistakes to Avoid

### 1. Catching Too Broadly
```python
# ❌ Catches everything, even unexpected errors
try:
    x = int(input("Number: "))
except:
    print("Error")
```

### 2. Empty Except Blocks
```python
# ❌ Exception silently disappears
try:
    risky_operation()
except Exception:
    pass  # Nothing happens!
```

### 3. Not Re-prompting on Error
```python
# ❌ Only tries once
try:
    x = int(input("Number: "))
except ValueError:
    print("Error")
# Program continues with x undefined!

# ✅ Keeps trying
while True:
    try:
        x = int(input("Number: "))
        break
    except ValueError:
        print("Try again")
```

### 4. Using Exception as Variable Name
```python
# ❌ Shadows the Exception class
try:
    x = int(input())
except ValueError as Exception:  # Don't do this!
    print(Exception)
```

---

## Debugging with Exception Messages

You can capture and display the actual error message:

```python
try:
    x = int(input("Number: "))
except ValueError as e:
    print(f"Error details: {e}")
```

**Example output:**
```
Number: cat
Error details: invalid literal for int() with base 10: 'cat'
```

The `as e` captures the exception object, and you can print it or inspect it!

---

## Key Vocabulary

- **Exception** - An error that occurs during program execution
- **Syntax Error** - An error in code structure (must fix before running)
- **Runtime Error** - An error that occurs while the program is running
- **Try Block** - Code that might cause an exception
- **Except Block** - Code that handles the exception
- **Else Block** - Code that runs if no exception occurred
- **Finally Block** - Code that always runs, exception or not
- **Raise** - Keyword to manually trigger an exception
- **Pass** - Keyword that does nothing (placeholder)
- **EAFP** - "Easier to Ask for Forgiveness than Permission" (Pythonic approach)

---

## Summary

Exceptions are Python's way of handling errors gracefully:

**Core Concepts:**
- **Syntax errors** must be fixed before code runs
- **Runtime errors** happen during execution and can be handled
- **Try-except** lets you attempt code and handle errors
- **Else** runs only if no exception occurred
- **Pass** silently ignores an exception
- **While True + try-except** keeps retrying until success

**Best Practices:**
- Be specific about which exceptions you catch
- Use functions to encapsulate validation logic
- Add parameters to make functions reusable
- Use `else` to separate error handling from success logic
- Test with edge cases and invalid input
- Follow the EAFP philosophy: try first, handle errors

**Common Pattern:**
```python
def get_input(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Invalid input, try again")
```

**Remember:** Errors are inevitable in programming. The mark of good code isn't avoiding errors - it's handling them gracefully! 🚀