# Variables and Functions in Python

## Getting Started with Programming

### What You Need to Write Code

So here's the thing - you don't need anything fancy to start coding. At its core, code is just text. While we're using Visual Studio Code (VS Code) in this course because it's super popular and powerful, technically you could even use Google Docs or Microsoft Word (though you'd need to save it in the right format). 

**The Essentials:**
- A text editor (like VS Code)
- A terminal/command line interface (CLI)
- Python installed on your computer

### Your First Program: Hello World

Every programmer's journey starts with the classic "Hello World" program. It's tradition at this point!

```python
print("Hello, World")
```

That's it. One line. But let's understand what's happening here.

**Running Your Program:**
1. Save your file with a `.py` extension (like `hello.py`)
2. Open your terminal
3. Type: `python hello.py`
4. Hit enter

The `.py` extension tells the computer "hey, this is a Python program!"

### How Python Actually Works

When you write code in Python, it's stored in a file (like `hello.py`). But computers only understand zeros and ones (binary). So how does your code get executed?

**The Python Interpreter:**
- Python is both a language AND a program
- The Python interpreter reads your code top to bottom, left to right
- It translates your human-readable code into zeros and ones the computer understands
- You just need to install Python once, and you're good to go

---

## Understanding Functions

### What is a Function?

Think of a function as an **action** or a **verb**. It's something that does stuff for you. Python comes with built-in functions that handle common tasks, so you don't have to reinvent the wheel every time.

**Key Concept:** Functions are pre-defined actions that perform specific tasks.

### The Print Function

`print()` is probably the most basic function you'll use. It displays output on the screen.

```python
print("Hello, World")
```

**Important Parts:**
- `print` - the function name
- `()` - parentheses that hold the input
- `"Hello, World"` - the input we're giving to the function

### Arguments: Inputs to Functions

An **argument** is an input that you pass to a function. It tells the function what to work with.

```python
print("Hello, World")
```

In this case, `"Hello, World"` is the argument. The people who created Python didn't know what YOU wanted to print, so they made it flexible - you can pass in any text you want!

### Side Effects

When a function does something visible (like displaying text on screen), that's called a **side effect**. The `print()` function has a side effect - it shows output on your terminal.

---

## Working with Variables

### What is a Variable?

A **variable** is like a container that stores a value. You give it a name, and then you can use that name to access the value later.

```python
name = input("What's your name? ")
print("Hello,", name)
```

Here, `name` is a variable that stores whatever the user types in.

**Variable Assignment:** The `=` sign doesn't mean "equals" in programming - it means "assign". You're putting a value into the variable.

### The Input Function

`input()` is a function that lets you get information from the user. It waits for them to type something and press enter.

```python
name = input("What's your name? ")
```

**What's happening:**
1. The program displays "What's your name? "
2. It waits for user input
3. Whatever the user types gets stored in the `name` variable

**Important:** `input()` always returns a **string** (text), even if the user types a number!

---

## Customizing Print Output

### Multiple Arguments

You can pass multiple things to `print()`:

```python
print("Hello,", name)
```

This prints "Hello," and then the value of `name`, with a space automatically added between them.

### The `sep` Parameter

By default, `print()` separates multiple arguments with a space. You can change this:

```python
print("Hello,", name, sep="???")
# Output: Hello,???David
```

### The `end` Parameter

Normally, `print()` adds a newline at the end (moves to the next line). You can change this too:

```python
print("Hello, ", end="")
print(name)
# Output: Hello, David (on the same line)
```

**Default behavior:**
```python
print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)
```

---

## String Methods

### What are Strings?

A **string** is Python's data type for text. It's just a sequence of characters wrapped in quotes.

```python
name = "david malan"
```

### Common String Methods

**Removing Whitespace:**
```python
name = name.strip()
```
Gets rid of extra spaces before and after the text. Super useful when users accidentally add spaces!

**Capitalization:**
```python
name = name.capitalize()  # Capitalizes first letter
name = name.title()       # Capitalizes Each Word
```

### Method Chaining

Here's a cool trick - you can chain methods together:

```python
name = name.strip().title()
```

Or even more compact:
```python
name = input("Enter your name: ").strip().title()
```

This strips whitespace AND capitalizes properly, all in one line!

### Splitting Strings

You can split a string into multiple parts:

```python
first, last = input("Enter full name: ").split(" ")
print(f"Hello, {first}")
```

The `split()` method breaks the string at spaces and gives you separate pieces.

---

## Escape Characters

### The Problem with Quotes

What if you want to print actual quotation marks?

```python
print("She said "hello"")  # This breaks!
```

### The Solution: Backslash

Use `\` (backslash) as an **escape character**:

```python
print("\"hi\"")    # Outputs: "hi"
print('"Hi"')      # Alternative: use single quotes outside
```

**Common Escape Sequences:**
- `\"` - quotation mark
- `\n` - newline
- `\t` - tab

---

## F-Strings: The Modern Way

### Formatted String Literals

Instead of using commas or concatenation, you can embed variables directly in strings:

```python
name = "David"
print(f"Hello, {name}")
```

The `f` before the quote makes it an **f-string**, and the `{}` lets you put variables or expressions right inside the string.

**Why f-strings are awesome:**
- Cleaner code
- Easier to read
- More flexible

```python
# Old way
print("Hello, " + name)

# Better way
print("Hello,", name)

# Best way
print(f"Hello, {name}")
```

---

## Working with Numbers

### The Integer Data Type

**Integers** (`int`) are whole numbers - no decimals. They can be positive or negative.

```python
x = 5
y = -10
z = 0
```

### Basic Math Operators

```python
+   # Addition
-   # Subtraction
*   # Multiplication
/   # Division
%   # Remainder (modulo)
```

### Getting Number Input

Remember, `input()` always returns a string! If you want to do math, you need to convert it:

```python
x = int(input("What's x? "))
y = int(input("What's y? "))
print(x + y)
```

**Without conversion:**
```python
x = input("What's x? ")  # User types "1"
y = input("What's y? ")  # User types "2"
print(x + y)  # Output: "12" (string concatenation!)
```

**With conversion:**
```python
x = int(input("What's x? "))  # Converts "1" to 1
y = int(input("What's y? "))  # Converts "2" to 2
print(x + y)  # Output: 3 (actual math!)
```

### Nesting Functions

You can put functions inside other functions:

```python
# Instead of:
x = input("What's x? ")
x = int(x)

# You can do:
x = int(input("What's x? "))
```

The inner function runs first, then its result is passed to the outer function.

**Super compact (but maybe too complex?):**
```python
print(int(input("What's x? ")) + int(input("What's y? ")))
```

This works, but it's harder to read. Balance brevity with clarity!

---

## Floating Point Numbers

### What are Floats?

**Floats** are numbers with decimal points. The term "floating point" refers to how the decimal point can "float" to different positions.

```python
x = 3.14
y = -0.5
z = 2.0  # Still a float, even though it looks like a whole number
```

### Working with Floats

```python
x = float(input("What's x? "))
y = float(input("What's y? "))
print(x + y)
```

### Rounding Numbers

**Using `round()`:**
```python
z = round(x + y)  # Rounds to nearest integer
```

**Rounding to specific decimal places:**
```python
z = round(x + y, 2)  # Rounds to 2 decimal places
```

### Formatting Numbers

**Adding thousand separators:**
```python
z = 1000
print(f"{z:,}")  # Output: 1,000
```

**Controlling decimal places:**
```python
result = 2.5
print(f"{result:.2f}")  # Output: 2.50
```

The `.2f` means "2 decimal places, float format"

---

## Creating Your Own Functions

### The `def` Keyword

`def` is short for "define". It's how you create your own custom functions!

**Basic Syntax:**
```python
def hello():
    print("Hello, World")
```

**With Parameters:**
```python
def hello(to):
    print(f"Hello, {to}")

name = input("What's your name? ")
hello(name)
```

### Default Parameter Values

You can give parameters default values in case no argument is passed:

```python
def hello(to="World"):
    print(f"Hello, {to}")

hello()         # Uses default: "Hello, World"
hello("David")  # Uses argument: "Hello, David"
```

---

## The Main Function Pattern

### Why Use `main()`?

Here's a common problem: Python reads your code from top to bottom. If you try to call a function before you've defined it, you'll get an error.

**The Problem:**
```python
hello(name)  # Error! hello doesn't exist yet

def hello(to="World"):
    print(f"Hello, {to}")
```

**The Solution: Define a `main()` function**
```python
def main():
    name = input("What's your name? ")
    hello(name)

def hello(to="World"):
    print(f"Hello, {to}")

main()  # Call main at the very end
```

**How this works:**
1. Python reads the file top to bottom
2. It sees `main()` is defined (but doesn't run it yet)
3. It sees `hello()` is defined (but doesn't run it yet)
4. At the end, it finally CALLS `main()`
5. `main()` runs, which then calls `hello()`

This pattern lets you organize your code however you want, with `main()` at the top!

---

## Scope: Where Variables Live

### What is Scope?

**Scope** refers to where a variable exists and can be used. A variable only exists in the context where it was defined.

**The Problem:**
```python
def main():
    name = input("What's your name? ")
    hello()

def hello():
    print(f"Hello, {name}")  # Error! name doesn't exist here

main()
```

This gives you a `NameError` because `name` was defined in `main()`, so it only exists inside `main()`. The `hello()` function can't see it!

**The Solution: Pass it as an argument**
```python
def main():
    name = input("What's your name? ")
    hello(name)  # Pass name to hello

def hello(to="World"):  # Receive it as a parameter
    print(f"Hello, {to}")

main()
```

**Key Point:** The variable is called `name` in `main()` but `to` in `hello()`. That's totally fine! Each function names its own variables and parameters independently.

---

## Return Values

### Functions That Give Back Values

So far, our functions have had **side effects** (like printing to the screen). But functions can also **return values** - they can give you back a result that you can use elsewhere.

**Built-in functions that return values:**
- `input()` returns the string the user typed
- `int()` returns the integer version of a string
- `float()` returns the float version of a string

### The `return` Keyword

You can make your own functions return values using `return`:

```python
def square(n):
    return n * n

x = int(input("What's x? "))
result = square(x)
print(f"{x} squared is {result}")
```

Or more concisely:
```python
def main():
    x = int(input("What's x? "))
    print(f"{x} squared is {square(x)}")

def square(x):
    return x * x

main()
```

### Different Ways to Square a Number

Python gives you multiple approaches for the same task:

```python
# Multiplication
def square(n):
    return n * n

# Power operator
def square(n):
    return n ** 2

# Power function
def square(n):
    return pow(n, 2)
```

The `**` operator means "raise to the power of", so `n ** 2` means "n squared"

---

## Comments: Documenting Your Code

### Single Line Comments

Use `#` for single-line comments:

```python
# This is a comment
name = input("What's your name? ")  # Get user's name
```

### Multi-Line Comments

Use triple quotes for longer comments:

```python
"""
This is a multi-line comment.
You can write as much as you want here.
It's useful for documentation.
"""
```

**Use comments to:**
- Explain WHY you're doing something (not WHAT - the code shows that)
- Document complex logic
- Add context for future you or other programmers
- Temporarily disable code while testing

---

## Key Takeaways

### Functions
- Functions are actions/verbs that perform tasks
- They can take **arguments** (inputs)
- They can have **side effects** (like printing)
- They can **return values** for you to use
- You can create your own with `def`

### Variables
- Variables store values
- Use `=` to assign values
- Variables only exist in their **scope**
- Pass variables between functions as arguments

### Data Types
- **Strings** (`str`) - text in quotes
- **Integers** (`int`) - whole numbers
- **Floats** (`float`) - decimal numbers

### Best Practices
- Use descriptive variable names
- Follow the `main()` function pattern
- Chain methods when it makes sense
- Use f-strings for cleaner string formatting
- Comment your code thoughtfully
- Remember: there are often multiple ways to solve the same problem!

---

## Common Patterns to Remember

```python
# Getting user input
name = input("What's your name? ").strip().title()

# Converting to numbers
x = int(input("Enter an integer: "))
y = float(input("Enter a decimal: "))

# Creating a function with default values
def greet(name="World"):
    print(f"Hello, {name}")

# Main function pattern
def main():
    # Your main code here
    pass

def helper_function():
    # Helper functions here
    pass

main()  # Run the program

# Returning values
def calculate(x, y):
    return x + y

result = calculate(5, 3)
```

---

**Remember:** Programming is about solving problems. There's usually more than one way to solve any problem - some ways are more efficient, some are more readable. With practice, you'll develop an intuition for which approach works best in different situations.

Happy coding! 🚀