# Libraries in Python

## What are Libraries?

**Libraries** (also called **modules** in Python) are files of code that contain functions and other features you can use in your own programs. They help you avoid reinventing the wheel!

Think of libraries like tools in a toolbox:
- You don't build a hammer every time you need to drive a nail
- You use a hammer that someone already made
- Libraries are pre-built tools (functions) you can use

**Benefits of Libraries:**
- **Reusability** - Write code once, use it many times
- **Efficiency** - Don't copy-paste code between projects
- **Collaboration** - Share code with others
- **Stand on shoulders of giants** - Use solutions others have already created

---

## Modules in Python

A **module** is a Python file (`.py`) that contains functions, variables, and classes that you can import and use in other programs.

**Types of modules:**
1. **Built-in modules** - Come with Python (like `random`, `statistics`, `sys`)
2. **Third-party modules** - Created by other developers (like `cowsay`, `requests`)
3. **Your own modules** - Files you create to organize your code

---

## The `import` Statement

The `import` keyword loads a module so you can use its functions.

**Basic syntax:**
```python
import module_name
```

Once imported, you access functions using dot notation:
```python
module_name.function_name()
```

---

## The `random` Module

The `random` module provides functions for generating random values.

### Using `random.choice()`

**What it does:** Randomly picks one item from a sequence (like a list).

```python
import random

coin = random.choice(["heads", "tails"])
print(coin)
```

**Output (random each time):**
```
heads
```
or
```
tails
```

**How it works:**
- Takes a list as input
- Returns one item from the list
- Each item has equal probability (50/50 for two items, 33/33/33 for three, etc.)

### Multiple Coin Flips

```python
import random

for i in range(5):
    print(random.choice(["heads", "tails"]))
```

**Possible output:**
```
heads
heads
tails
heads
tails
```

Each flip is independent - you might get heads 5 times in a row (unlikely but possible)!

---

## Alternative Import Syntax: `from`

Instead of importing the whole module, you can import specific functions:

```python
from random import choice

for i in range(5):
    print(choice(["heads", "tails"]))
```

**Difference:**
- **`import random`** - Must use `random.choice()`
- **`from random import choice`** - Can use just `choice()`

**Which to use?**
- `import module` - When you're using multiple functions from the module
- `from module import function` - When you only need one or two functions

---

## More `random` Functions

### `random.shuffle()` - Randomize List Order

```python
import random

cards = ["jack", "queen", "king"]
random.shuffle(cards)

for card in cards:
    print(card)
```

**Output (random order):**
```
king
jack
queen
```

**Important:** `shuffle()` modifies the list in place - it doesn't return anything!

### `random.randint()` - Random Integer

```python
import random

number = random.randint(1, 10)  # Random number from 1 to 10 (inclusive)
print(number)
```

**Note:** Unlike `range()`, `randint()` includes BOTH endpoints (1 and 10 are both possible).

---

## The `statistics` Module

The `statistics` module provides functions for mathematical statistics.

### Calculating Average (Mean)

```python
import statistics

print(statistics.mean([100, 90]))
```

**Output:**
```
95.0
```

**What `mean()` does:**
- Takes a list of numbers
- Returns the average (sum divided by count)
- (100 + 90) / 2 = 95.0

**Other statistics functions:**
- `statistics.median()` - Middle value
- `statistics.mode()` - Most common value
- `statistics.stdev()` - Standard deviation

---

## The `sys` Module: System-Specific Parameters

The `sys` module provides access to system-specific parameters and functions.

### Command-Line Arguments: `sys.argv`

**Command-line arguments** are inputs you provide when running a program from the terminal.

**Example:**
```
python name.py David
```

In this command:
- `python` - the interpreter
- `name.py` - the program
- `David` - the command-line argument

### Accessing Arguments with `sys.argv`

`sys.argv` is a **list** containing all command-line arguments:

```python
import sys

print("Hello, my name is", sys.argv[1])
```

**Running it:**
```
$ python name.py David
Hello, my name is David
```

**What's in `sys.argv`:**
- `sys.argv[0]` - The program name ("name.py")
- `sys.argv[1]` - First argument ("David")
- `sys.argv[2]` - Second argument (if provided)
- And so on...

**Important:** `sys.argv` is zero-indexed, just like regular lists!

---

## Handling Argument Errors

### The Problem: IndexError

```python
import sys

print("Hello, my name is", sys.argv[1])
```

**What if user doesn't provide an argument?**
```
$ python name.py
IndexError: list index out of range
```

`sys.argv[1]` doesn't exist because the user didn't provide it!

### Solution 1: Try-Except

```python
import sys

try:
    print("Hello, my name is", sys.argv[1])
except IndexError:
    print("Too few arguments")
```

This catches the error gracefully.

### Solution 2: Check Length First

```python
import sys

if len(sys.argv) < 2:
    print("Too few arguments")
elif len(sys.argv) > 2:
    print("Too many arguments")
else:
    print("Hello, my name is", sys.argv[1])
```

**Better!** Check the number of arguments before trying to use them.

---

## Exiting Programs: `sys.exit()`

`sys.exit()` terminates the program immediately with an optional error message.

```python
import sys

if len(sys.argv) < 2:
    sys.exit("Too few arguments")
elif len(sys.argv) > 2:
    sys.exit("Too many arguments")

print("Hello, my name is", sys.argv[1])
```

**Benefits:**
- Program stops immediately if there's a problem
- Displays error message to the user
- More efficient than continuing with bad data

**Exit codes:**
- `sys.exit()` or `sys.exit(0)` - Normal exit (success)
- `sys.exit("message")` or `sys.exit(1)` - Error exit

---

## List Slicing with Arguments

**Slicing** lets you get a portion of a list.

**Syntax:**
```python
list[start:end]  # From start up to (but not including) end
```

### Slicing `sys.argv`

```python
import sys

if len(sys.argv) < 2:
    sys.exit("Too few arguments")

# Print all arguments except the program name
for arg in sys.argv[1:]:
    print("Hello, my name is", arg)
```

**Running it:**
```
$ python name.py Alice Bob Charlie
Hello, my name is Alice
Hello, my name is Bob
Hello, my name is Charlie
```

**Common slices:**
- `sys.argv[1:]` - From index 1 to the end (all arguments except program name)
- `sys.argv[1:-1]` - From index 1 to second-to-last (excludes first and last)
- `sys.argv[:-1]` - Everything except the last item

---

## Third-Party Libraries

**Third-party libraries** are created by other developers and shared with the Python community. You need to install them before using them.

### Installing with `pip`

`pip` is Python's **package manager** - a tool for installing third-party packages.

**Basic command:**
```
pip install package_name
```

**Example:**
```
pip install cowsay
```

This downloads and installs the `cowsay` package from PyPI (Python Package Index).

---

## Using `cowsay`

`cowsay` is a fun third-party library that makes animals "say" things in ASCII art!

```python
import cowsay
import sys

if len(sys.argv) == 2:
    cowsay.cow("hello, " + sys.argv[1])
```

**Running it:**
```
$ python say.py David
  _____________
| hello, David |
  =============
            \   ^__^
             \  (oo)\_______
                (__)\       )\/\
                    ||----w |
                    ||     ||
```

**Other cowsay functions:**
- `cowsay.trex()` - T-Rex says it
- `cowsay.ghost()` - Ghost says it
- `cowsay.dragon()` - Dragon says it
- And many more!

---

## API Libraries: `requests`

**APIs** (Application Programming Interfaces) let programs talk to each other over the internet. The `requests` library makes it easy to fetch data from web APIs.

### Installing `requests`

```
pip install requests
```

### Example: iTunes Search API

The iTunes API lets you search for songs, albums, and more.

```python
import requests
import sys
import json

if len(sys.argv) != 2:
    sys.exit()

response = requests.get(
    "https://itunes.apple.com/search?entity=song&limit=10&term=" + sys.argv[1]
)

# Get JSON response
o = response.json()

# Print all track names
for result in o["results"]:
    print(result["trackName"])
```

**Running it:**
```
$ python itunes.py weezer
Buddy Holly
Say It Ain't So
Undone - The Sweater Song
Island In The Sun
(And more songs...)
```

**How it works:**
1. `requests.get()` fetches data from a URL
2. `.json()` converts the response to a Python dictionary
3. We loop through `results` and print each track name

**Breakdown of the URL:**
- `https://itunes.apple.com/search` - Base URL
- `?entity=song` - Search for songs
- `&limit=10` - Return 10 results
- `&term=weezer` - Search term (from user input)

---

## Creating Your Own Module

You can create your own modules to organize and reuse code!

### Step 1: Create the Module File

**File: `sayings.py`**
```python
def hello(name):
    print(f"Hello, {name}")

def goodbye(name):
    print(f"Goodbye, {name}")
```

This file defines two functions. Any other program can now import these!

### Step 2: Import Your Module

**File: `say.py`**
```python
import sys
from sayings import hello

if len(sys.argv) == 2:
    hello(sys.argv[1])
```

**Running it:**
```
$ python say.py David
Hello, David
```

**How it works:**
- `from sayings import hello` - Import the `hello` function from `sayings.py`
- `sayings.py` must be in the same directory
- You can now use `hello()` as if it were defined in `say.py`

---

## The `__name__` Problem

There's a subtle issue when creating your own modules. Let's add a test to `sayings.py`:

**File: `sayings.py`**
```python
def main():
    hello("world")
    goodbye("world")

def hello(name):
    print(f"Hello, {name}")

def goodbye(name):
    print(f"Goodbye, {name}")

main()  # Run tests
```

**Testing the module directly:**
```
$ python sayings.py
Hello, world
Goodbye, world
```

Good! But now watch what happens when we import from it:

```
$ python say.py David
Hello, world
Goodbye, world
Hello, David
```

**Problem:** When we import from `sayings.py`, the `main()` function runs automatically! We get unwanted output.

**Why?** When Python imports a file, it executes ALL the code in that file, including the `main()` call at the bottom.

---

## The Solution: `if __name__ == "__main__"`

This special pattern lets you run code ONLY when the file is executed directly, NOT when it's imported.

**File: `sayings.py`**
```python
def main():
    hello("world")
    goodbye("world")

def hello(name):
    print(f"Hello, {name}")

def goodbye(name):
    print(f"Goodbye, {name}")

if __name__ == "__main__":
    main()
```

**How it works:**
- When you run `python sayings.py`, Python sets `__name__` to `"__main__"`
- The condition is `True`, so `main()` runs
- When you import from `sayings.py`, `__name__` is set to `"sayings"` (the module name)
- The condition is `False`, so `main()` doesn't run

**Testing:**

**Direct execution:**
```
$ python sayings.py
Hello, world
Goodbye, world
```

**Importing:**
```
$ python say.py David
Hello, David
```

Perfect! No unwanted output when importing!

---

## The `__name__` Variable Explained

`__name__` is a **special variable** automatically set by Python:

| How you run the file | Value of `__name__` |
|---------------------|---------------------|
| `python file.py` | `"__main__"` |
| `import file` or `from file import ...` | `"file"` (module name) |

**Convention:** Use this pattern in ALL your Python files:

```python
def main():
    # Your main code here
    pass

# Other functions here

if __name__ == "__main__":
    main()
```

**Benefits:**
- Your file can be both a script (runnable) and a module (importable)
- Tests run when you execute the file directly
- Tests DON'T run when you import from it
- Standard practice in Python development

---

## Import Variations

### Import Entire Module

```python
import random

print(random.choice([1, 2, 3]))
print(random.randint(1, 10))
```

Use this when you need multiple functions from the module.

### Import Specific Function

```python
from random import choice

print(choice([1, 2, 3]))
```

Use this when you only need one or two functions.

### Import Multiple Functions

```python
from random import choice, randint, shuffle

print(choice([1, 2, 3]))
print(randint(1, 10))
```

### Import with Alias

```python
import statistics as stats

print(stats.mean([1, 2, 3]))
```

Shorter name for convenience.

### Import Everything (Not Recommended!)

```python
from random import *

print(choice([1, 2, 3]))
print(randint(1, 10))
```

**Warning:** This imports ALL functions and can cause naming conflicts. Avoid in production code!

---

## Finding Documentation

### Official Python Docs

For built-in modules: `https://docs.python.org/3/library/`

Example: `https://docs.python.org/3/library/random.html`

### PyPI (Python Package Index)

For third-party packages: `https://pypi.org/`

Search for packages, view documentation, see installation instructions.

### In-Program Help

```python
import random
help(random.choice)
```

Displays documentation for the function right in your terminal!

---

## Best Practices

### 1. Import at the Top

```python
# ✅ Good - all imports at the top
import sys
import random
from statistics import mean

def main():
    # Your code here
    pass
```

Makes it clear what dependencies your program has.

### 2. Use Specific Imports

```python
# ❌ Less clear what you're using
import random

# ✅ Clear you're using choice
from random import choice
```

### 3. Organize Your Imports

**Standard convention:**
```python
# Standard library imports
import sys
import random

# Third-party imports
import requests
import cowsay

# Local imports
from sayings import hello
```

### 4. Use `if __name__ == "__main__"`

```python
def main():
    # Main program logic
    pass

if __name__ == "__main__":
    main()
```

Makes your code both runnable and importable.

### 5. Validate Command-Line Arguments

```python
import sys

if len(sys.argv) < 2:
    sys.exit("Usage: python script.py <argument>")

# Now safe to use sys.argv[1]
```

Always check before accessing `sys.argv` indices!

---

## Common Modules Reference

### Built-in Modules (Come with Python)

| Module | Purpose | Example |
|--------|---------|---------|
| `random` | Random number generation | `random.choice([1,2,3])` |
| `statistics` | Statistical functions | `statistics.mean([1,2,3])` |
| `sys` | System-specific parameters | `sys.argv`, `sys.exit()` |
| `math` | Mathematical functions | `math.sqrt(16)` |
| `datetime` | Date and time operations | `datetime.now()` |
| `os` | Operating system interface | `os.listdir()` |
| `json` | JSON encoding/decoding | `json.loads(string)` |

### Popular Third-Party Packages

| Package | Purpose | Install |
|---------|---------|---------|
| `requests` | HTTP requests | `pip install requests` |
| `cowsay` | ASCII art animals | `pip install cowsay` |
| `pytest` | Testing framework | `pip install pytest` |
| `flask` | Web framework | `pip install flask` |
| `numpy` | Scientific computing | `pip install numpy` |
| `pandas` | Data analysis | `pip install pandas` |

---

## Creating Reusable Code

### When to Create a Module

Create a module when you:
- Use the same functions across multiple projects
- Find yourself copying and pasting code
- Want to organize a large project into logical components
- Want to share code with others

### Example: Utility Functions Module

**File: `utils.py`**
```python
def get_positive_int(prompt):
    """Get a positive integer from user."""
    while True:
        try:
            n = int(input(prompt))
            if n > 0:
                return n
        except ValueError:
            pass

def validate_email(email):
    """Check if email format is valid."""
    return "@" in email and "." in email

if __name__ == "__main__":
    # Tests
    num = get_positive_int("Number: ")
    print(f"You entered: {num}")
```

**Using it:**
```python
from utils import get_positive_int, validate_email

age = get_positive_int("Enter your age: ")
email = input("Enter your email: ")

if validate_email(email):
    print("Valid email!")
```

---

## Virtual Environments (Advanced Topic)

**Virtual environments** let you install packages for specific projects without affecting your system.

**Why use them?**
- Different projects may need different versions of packages
- Keeps your global Python clean
- Makes projects portable

**Basic commands:**
```bash
# Create virtual environment
python -m venv venv

# Activate it (macOS/Linux)
source venv/bin/activate

# Activate it (Windows)
venv\Scripts\activate

# Install packages
pip install requests

# Deactivate
deactivate
```

---

## Key Vocabulary

- **Library/Module** - A file containing functions and code you can import
- **Import** - Loading a module so you can use its functions
- **Built-in Module** - Comes with Python
- **Third-Party Package** - Created by other developers, installed via pip
- **pip** - Python's package manager
- **PyPI** - Python Package Index, where packages are hosted
- **sys.argv** - List of command-line arguments
- **API** - Application Programming Interface (programs talking to programs)
- **__name__** - Special variable indicating how a file was run
- **Slicing** - Getting a portion of a list

---

## Summary

Libraries are essential for efficient Python programming:

**Core Concepts:**
- **Import modules** with `import` or `from ... import ...`
- **Built-in modules** like `random`, `statistics`, `sys` come with Python
- **Third-party packages** installed with `pip`
- **Command-line arguments** accessed via `sys.argv`
- **Create your own modules** to organize and reuse code
- **Use `if __name__ == "__main__"`** to make files both runnable and importable

**Key Patterns:**
```python
# Importing
import module
from module import function

# Command-line arguments
import sys
if len(sys.argv) != 2:
    sys.exit("Usage: ...")

# Creating a module
def my_function():
    pass

if __name__ == "__main__":
    # Test code here
    pass
```

**Benefits:**
- Don't reinvent the wheel
- Stand on shoulders of giants
- Share code across projects
- Collaborate with others
- Build bigger things faster

**Remember:** Good programmers don't memorize everything - they know what tools are available and where to find documentation! 🚀