# Unit Tests in Python

## What are Unit Tests?

**Unit tests** are code you write specifically to test other code you've written. A "unit" refers to a small, isolated piece of functionality - usually a single function.

Up until now, you've probably been testing your code by:
- Running the program
- Typing in some input
- Checking if the output looks right
- Repeating manually for different cases

That's fine for simple programs, but it's **not scalable**. Unit tests automate this process so you can test your code reliably, repeatedly, without any manual effort.

---

## Why Write Tests?

### The Problem with Manual Testing

```python
def square(n):
    return n * n
```

You test it manually:
```
$ python calculator.py
What's x? 2
x squared is 4    ✅

$ python calculator.py
What's x? 3
x squared is 9    ✅
```

Looks good! But...
- What about negative numbers? `square(-2)` should also be 4
- What about zero? `square(0)` should be 0
- What if someone later changes the `square` function and breaks it?
- What if you have 50 functions to test?

**Manual testing doesn't scale.** Writing automated tests does!

### Benefits of Automated Tests

- **Saves time** - Run all tests with one command
- **Catches regressions** - Ensures new code doesn't break old code
- **Documents behavior** - Tests show exactly how functions are supposed to work
- **Gives confidence** - Know your code works before shipping it
- **Great for collaboration** - Others can verify they haven't broken your code

---

## Setting Up Code for Testing

### The Key Principle: Write Testable Functions

Functions are easiest to test when they **return values** rather than just printing (side effects).

**Hard to test (prints output):**
```python
def hello(name="world"):
    print(f"hello, {name}")  # How do you check this?
```

**Easy to test (returns value):**
```python
def hello(to="world"):
    return f"hello, {to}"  # Easy! Just check the return value
```

If your function returns something, you can check exactly what it returned and whether it's correct!

### Using `if __name__ == "__main__"`

Before writing tests, make sure your code file is import-friendly:

**`calculator1.py`**
```python
def main():
    x = int(input("What's x? "))
    print("X squared is", square(x))

def square(n):
    return n * n

if __name__ == "__main__":
    main()
```

**Why this matters:** Without this guard, importing `square` from this file would also run `main()` and prompt for user input during testing. With this guard, only `square` gets imported cleanly.

---

## Writing Tests Manually (The Basic Way)

Before using any testing library, let's understand the concept manually:

```python
from calculator1 import square

def main():
    test_square()

def test_square():
    if square(2) != 4:
        print("2 squared was not 4")
    if square(3) != 9:
        print("3 squared was not 9")

if __name__ == "__main__":
    main()
```

**This works, but:**
- You have to manually write the output for every failure
- You have to call every test function manually
- It's still a lot of boilerplate

There's a better way!

---

## The `assert` Statement

`assert` is a Python keyword that checks if a condition is `True`. If it's not, it raises an `AssertionError`.

**Syntax:**
```python
assert condition
```

**Examples:**
```python
assert 2 + 2 == 4      # Passes silently ✅
assert 2 + 2 == 5      # Raises AssertionError ❌
```

**Using assert in tests:**

```python
from calculator1 import square

def test_square():
    try:
        assert square(2) == 4
    except AssertionError:
        print("2 squared was not 4")

    try:
        assert square(-2) == 4
    except AssertionError:
        print("-2 squared was not 4")

    try:
        assert square(0) == 0
    except AssertionError:
        print("0 squared was not 0")
```

This is cleaner! But still has a lot of boilerplate. Enter **pytest**!

---

## pytest: The Testing Framework

**pytest** is a third-party library that makes writing and running tests much easier. It's the most popular testing framework for Python.

### Installing pytest

```
pip install pytest
```

### The pytest Philosophy

pytest does the heavy lifting for you:
- Automatically finds all test files and functions
- Runs every test
- Reports which ones passed and which ones failed
- Shows clear error messages for failures

**You just write the test logic. pytest handles the rest.**

---

## Writing pytest Tests

### Rules pytest Follows

1. **Test files** must be named `test_*.py` or `*_test.py`
2. **Test functions** must start with `test_`
3. Use `assert` to check expected values
4. No need to call test functions yourself - pytest does it!

### Example: Testing the `square` Function

**`test_calculator2.py`**
```python
from calculator1 import square

def test_positive():
    assert square(2) == 4
    assert square(3) == 9

def test_negative():
    assert square(-2) == 4
    assert square(-3) == 9

def test_zero():
    assert square(0) == 0
```

**Running the tests:**
```
$ pytest test_calculator2.py
```

**Output (all passing):**
```
============================= test session starts ==============================
collected 3 items

test_calculator2.py ...                                                  [100%]

============================== 3 passed in 0.12s ===============================
```

The three dots `...` mean 3 tests passed!

**Output (with a failure):**
```
FAILED test_calculator2.py::test_negative

    def test_negative():
>       assert square(-2) == 4
E       AssertionError: assert 3 == 4

============================== 2 passed, 1 failed in 0.12s =====================
```

pytest tells you exactly which test failed and why!

---

## Organizing Tests by Category

**Don't put all tests in one function.** Separate them by what they're testing:

### One Big Function (Not Great)

```python
def test_square():
    assert square(2) == 4
    assert square(3) == 9
    assert square(-2) == 4
    assert square(-3) == 9
    assert square(0) == 0
```

**Problem:** If `square(2)` fails, pytest stops there. You don't know if the rest pass or fail.

### Separated by Category (Better!)

```python
def test_positive():
    assert square(2) == 4
    assert square(3) == 9

def test_negative():
    assert square(-2) == 4
    assert square(-3) == 9

def test_zero():
    assert square(0) == 0
```

**Benefits:**
- When a test fails, you know exactly what category broke
- Each test is small and focused
- pytest shows you exactly which category failed
- Much easier to pinpoint the bug

---

## Testing Functions that Return Strings

The same approach works for string-returning functions!

**`hello3.py`**
```python
def main():
    name = input("What's your name? ")
    print(hello(name))

def hello(to="world"):
    return f"hello, {to}"

if __name__ == "__main__":
    main()
```

Notice `hello()` **returns** the string instead of printing it directly. This makes it testable!

**`test_hello.py`**
```python
from hello3 import hello

def test_default():
    assert hello() == "hello, world"

def test_argument():
    assert hello("David") == "hello, David"
```

**Running:**
```
$ pytest test_hello.py
```

**Output:**
```
test_hello.py ..                                                         [100%]

============================== 2 passed in 0.08s ===============================
```

Two dots = two tests passed!

---

## What to Test: Corner Cases

Good testing means thinking beyond the obvious inputs.

### Test Categories to Consider

**For a `square()` function:**

| Category | Examples | Why Important |
|----------|---------|---------------|
| Positive numbers | 2, 3, 100 | The "normal" case |
| Negative numbers | -2, -3 | Negative × negative = positive! |
| Zero | 0 | Edge case, often forgotten |

**For a `hello()` function:**

| Category | Example | Why Important |
|----------|---------|---------------|
| Default argument | `hello()` | Tests the default value |
| Given argument | `hello("David")` | Tests with actual input |
| Empty string | `hello("")` | Edge case |

**General Rule:** Test the happy path, the edge cases, and the error cases!

---

## Using Loops in Tests

You can use loops to test multiple similar values efficiently:

```python
from hello3 import hello

def test_multiple_names():
    for name in ["Hermione", "Harry", "Ron"]:
        assert hello(name) == f"hello, {name}"
```

This runs one test that checks three different names.

**Trade-off:** Loops are convenient, but you lose visibility into which specific value failed. Use them when testing a pattern across similar values.

---

## Organizing Tests into Folders

When your project grows, organize tests into a dedicated folder:

### Project Structure

```
project/
├── hello3.py              ← Your code
├── calculator1.py         ← Your code
└── tests/                 ← Test folder
    ├── __init__.py        ← Required! (can be empty)
    ├── test_hello.py      ← Hello tests
    └── test_calculator.py ← Calculator tests
```

### The `__init__.py` File

**`__init__.py`** is a special empty file that tells Python "treat this folder as a package."

```python
# __init__.py - completely empty!
```

**Why do you need it?**
- Without it, Python doesn't recognize the folder as a proper Python package
- pytest needs this to correctly discover and import your test files
- It's just a marker file - zero code needed

### Running All Tests in a Folder

```
$ pytest tests/
```

pytest automatically finds and runs ALL test files in the folder!

**Output:**
```
============================= test session starts ==============================
collected 4 items

tests/test_hello.py ..                                                   [50%]
tests/test_calculator.py ..                                              [100%]

============================== 4 passed in 0.15s ==============================
```

---

## Design Principle: Return Values Over Side Effects

The biggest takeaway for writing testable code: **functions that return values are easier to test than functions that print.**

**Not testable (has side effect):**
```python
def hello(name="world"):
    print(f"hello, {name}")  # You can't easily capture and check printed output
```

**Testable (returns value):**
```python
def hello(to="world"):
    return f"hello, {to}"  # You can directly check the return value!
```

Then your `main()` handles the actual printing:
```python
def main():
    name = input("What's your name? ")
    print(hello(name))  # main() prints; hello() just builds the string
```

**The pattern:**
- Core logic functions → **return values** (testable)
- `main()` → handles input/output (not the focus of unit tests)

---

## pytest Output Symbols

| Symbol | Meaning |
|--------|---------|
| `.` | Test passed |
| `F` | Test failed (assertion error) |
| `E` | Error occurred (unexpected exception) |
| `s` | Test was skipped |

**Example:**
```
test_calculator.py ..F.                                                  [100%]
```
3 passed, 1 failed.

---

## The Full Testing Workflow

```
1. Write your function (with return values, not just prints)
        ↓
2. Add if __name__ == "__main__" guard
        ↓
3. Create test_[name].py file
        ↓
4. Write test functions (one per category)
        ↓
5. Run: pytest test_[name].py
        ↓
6. Fix failures → run again → repeat
        ↓
7. Add more tests as you discover edge cases
```

---

## Common Mistakes and How to Avoid Them

### 1. Testing Side Effects Instead of Return Values

```python
# ❌ Hard to test - just prints
def hello(name):
    print(f"hello, {name}")

# ✅ Easy to test - returns the value
def hello(name="world"):
    return f"hello, {name}"
```

### 2. All Assertions in One Test

```python
# ❌ If first fails, you don't see the rest
def test_square():
    assert square(2) == 4
    assert square(-2) == 4
    assert square(0) == 0

# ✅ Separate by category
def test_positive():
    assert square(2) == 4

def test_negative():
    assert square(-2) == 4

def test_zero():
    assert square(0) == 0
```

### 3. Forgetting the `if __name__` Guard

```python
# ❌ Runs main() when imported for testing!
def square(n):
    return n * n

main()  # This runs even when imported!

# ✅ Safe to import
if __name__ == "__main__":
    main()
```

### 4. Forgetting `__init__.py` in Test Folders

```
# ❌ pytest might not find tests
tests/
├── test_hello.py

# ✅ pytest finds everything
tests/
├── __init__.py   ← Add this!
├── test_hello.py
```

### 5. Writing Overly Complex Tests

```python
# ❌ Your tests shouldn't need their own tests!
def test_square():
    results = [square(i) == i**2 for i in range(100)]
    assert all(results)

# ✅ Simple, readable, obvious
def test_positive():
    assert square(2) == 4
    assert square(3) == 9
```

---

## Useful pytest Commands

```bash
# Run a specific test file
pytest test_calculator2.py

# Run all tests in a folder
pytest tests/

# Run all tests from current directory
pytest

# Verbose output (shows each test name)
pytest -v

# Run a specific test function only
pytest test_calculator2.py::test_positive

# Stop after first failure
pytest -x

# Show print statements during tests
pytest -s
```

---

## Key Vocabulary

- **Unit test** - Code that tests a small, specific piece of functionality
- **Test file** - A Python file named `test_*.py` containing test functions
- **Test function** - A function starting with `test_` that pytest runs automatically
- **assert** - Python keyword that raises AssertionError if condition is False
- **AssertionError** - Error raised when an `assert` fails
- **pytest** - Popular Python testing framework
- **Regression** - A bug that comes back after being fixed (tests prevent this)
- **Edge case** - Unusual or extreme input that might cause bugs
- **`__init__.py`** - Empty file that marks a folder as a Python package
- **Test coverage** - How much of your code is actually tested

---

## Summary

Unit tests are one of the most important habits to build as a programmer:

**Core Concepts:**
- Write tests to automatically verify your code works
- Use `pytest` to discover and run tests automatically
- Use `assert` to compare expected vs actual values
- Functions should **return** values for testability
- Always use `if __name__ == "__main__"` to protect importable code

**Naming Rules:**
- Test files: `test_*.py`
- Test functions: `def test_*()`
- Test folders: need an `__init__.py` (can be empty)

**Good Testing Habits:**
- Test positive, negative, and edge cases (like zero)
- One category per test function
- Keep tests simple and readable
- Run tests every time you change code

**The Key Insight:** The way you *design* your code affects how *testable* it is. Functions that return values are always easier to test than functions that just print. Good test design often pushes you to write better code overall!

```python
# The Golden Pattern

# Your code (hello3.py)
def hello(to="world"):
    return f"hello, {to}"      # Returns, doesn't print

if __name__ == "__main__":
    print(hello(input("Name? ")))

# Your tests (test_hello.py)
from hello3 import hello

def test_default():
    assert hello() == "hello, world"

def test_argument():
    assert hello("David") == "hello, David"
```

**Remember:** Tests give you confidence. When you change something and all tests still pass, you know you haven't broken anything. That peace of mind is priceless! 🚀