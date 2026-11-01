# Python Practice Set - Solutions

This document contains complete solutions and explanations for all exercises in the Modules practice set. Each solution uses only the concepts covered in the notes.

## Basic Module Usage

### Exercise 1: Simple Import

```python
import random

result = random.choice(["heads", "tails"])
print(result)
```

**Explanation:**
- `import random` loads the random module
- `random.choice()` takes a list and returns one random item
- The result is stored in a variable and printed
- Each run will randomly show either "heads" or "tails"

---

### Exercise 2: Alternative Import Syntax

```python
from random import choice

result = choice(["red", "blue", "green"])
print(result)
```

**Explanation:**
- `from random import choice` imports only the choice function
- We can call `choice()` directly without the `random.` prefix
- This is useful when you only need one or two functions from a module
- The function works the same way as in Exercise 1

---

### Exercise 3: Multiple Function Import

```python
from random import choice, randint

day = choice(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
number = randint(1, 10)

print(f"Random day: {day}")
print(f"Random number: {number}")
```

**Explanation:**
- `from random import choice, randint` imports both functions
- `choice()` picks a random day from the list
- `randint(1, 10)` generates a random integer between 1 and 10 (inclusive)
- Both results are printed with descriptive labels

---

### Exercise 4: Statistics Module

```python
import statistics

scores = [85, 92, 78, 96, 88]
average = statistics.mean(scores)

print(f"Test scores: {scores}")
print(f"Average score: {average}")
```

**Explanation:**
- `import statistics` loads the statistics module
- `statistics.mean()` calculates the average of a list of numbers
- Formula: (sum of all numbers) ÷ (count of numbers)
- (85 + 92 + 78 + 96 + 88) ÷ 5 = 87.8

---

### Exercise 5: System Module

```python
import sys

print(f"Script name: {sys.argv[0]}")
```

**Explanation:**
- `import sys` loads the sys module
- `sys.argv` is a list containing command-line arguments
- `sys.argv[0]` is always the name of the script being executed
- When run as `python script.py`, this prints "script.py"

---

### Exercise 6: Module Documentation

```python
import random

help(random.choice)
```

**Explanation:**
- `help()` displays documentation for a function
- `random.choice` is passed as an argument (no parentheses)
- This shows the built-in help text for the choice function
- Useful for understanding how functions work

---

## The `random` Module

### Exercise 7: Coin Flip Simulator

```python
import random

for i in range(10):
    result = random.choice(["heads", "tails"])
    print(result)
```

**Explanation:**
- Uses a for loop to repeat the coin flip 10 times
- Each iteration calls `random.choice()` to get a random result
- Results are printed immediately
- Each flip is independent - you might get multiple heads or tails in a row

---

### Exercise 8: Dice Roller

```python
import random

for i in range(5):
    roll = random.randint(1, 6)
    print(f"Roll {i+1}: {roll}")
```

**Explanation:**
- `random.randint(1, 6)` generates random integers from 1 to 6 (inclusive)
- This simulates rolling a six-sided die
- Results are printed with roll numbers for clarity
- Each roll is independent of previous rolls

---

### Exercise 9: Card Shuffler

```python
import random

cards = ["Ace", "King", "Queen", "Jack", "10"]
random.shuffle(cards)

print("Shuffled deck:")
for card in cards:
    print(card)
```

**Explanation:**
- Creates a list of 5 playing cards
- `random.shuffle()` rearranges the list in random order
- The function modifies the list in place (doesn't return anything)
- Each run produces a different card order

---

### Exercise 10: Random Password Generator

```python
import random

characters = "abcdefghijklmnopqrstuvwxyz0123456789"
password = ""

for i in range(8):
    password += random.choice(characters)

print(f"Generated password: {password}")
```

**Explanation:**
- Defines a character set with lowercase letters and digits
- Uses a loop to build an 8-character password
- `random.choice()` selects one character at a time
- Characters are concatenated using `+=`
- Each run generates a different random password

---

### Exercise 11: Lottery Number Picker

```python
import random

lottery_numbers = random.sample(range(1, 50), 6)
lottery_numbers.sort()

print(f"Your lottery numbers: {lottery_numbers}")
```

**Explanation:**
- `random.sample()` picks unique items from a sequence
- `range(1, 50)` creates numbers 1-49
- The second parameter (6) specifies how many numbers to pick
- `sort()` arranges numbers in ascending order for readability
- No duplicates are possible with `sample()`

---

### Exercise 12: Random Team Selector

```python
import random

players = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Henry"]
team1 = random.sample(players, 4)
team2 = [player for player in players if player not in team1]

print("Team 1:", team1)
print("Team 2:", team2)
```

**Explanation:**
- Creates a list of 8 player names
- `random.sample(players, 4)` randomly selects 4 players for team 1
- List comprehension creates team 2 with remaining players
- Each run creates different team combinations
- All players are assigned to exactly one team

---

## The `statistics` Module

### Exercise 13: Grade Calculator

```python
import statistics

scores = [85, 90, 78, 92, 85, 88, 90]

mean_score = statistics.mean(scores)
median_score = statistics.median(scores)
mode_score = statistics.mode(scores)

print(f"Quiz scores: {scores}")
print(f"Mean: {mean_score}")
print(f"Median: {median_score}")
print(f"Mode: {mode_score}")
```

**Explanation:**
- `statistics.mean()` calculates the average
- `statistics.median()` finds the middle value when sorted
- `statistics.mode()` finds the most frequent value
- For this data: mean=86.86, median=88, mode=85 and 90 (bimodal)

---

### Exercise 14: Data Analysis

```python
import statistics

temperatures = [72, 68, 75, 80, 73, 69, 77]

mean_temp = statistics.mean(temperatures)
std_dev = statistics.stdev(temperatures)

print(f"Temperature data: {temperatures}")
print(f"Mean temperature: {mean_temp:.1f}")
print(f"Standard deviation: {std_dev:.2f}")
```

**Explanation:**
- `statistics.mean()` calculates average temperature
- `statistics.stdev()` measures how spread out the data is
- Standard deviation shows variation from the mean
- Lower values indicate data points are closer to the average

---

### Exercise 15: Sports Statistics

```python
import statistics

points = [25, 18, 32, 28, 21, 35, 29]
average_points = statistics.mean(points)

print(f"Points per game: {points}")
print(f"Average points per game: {average_points:.1f}")
```

**Explanation:**
- Calculates the mean of basketball scoring data
- Shows performance consistency over 7 games
- Average helps evaluate overall player performance
- Result: 26.9 points per game

---

## Command-Line Arguments

### Exercise 16: Simple Greeting

```python
import sys

if len(sys.argv) >= 2:
    name = sys.argv[1]
    print(f"Hello, {name}!")
else:
    print("Usage: python script.py <name>")
```

**Explanation:**
- Checks if at least one argument is provided
- `sys.argv[1]` contains the first command-line argument
- Prints a personalized greeting
- Includes usage instructions if no name is given

---

### Exercise 17: Multiple Names

```python
import sys

if len(sys.argv) > 1:
    for name in sys.argv[1:]:
        print(f"Hello, {name}!")
else:
    print("Usage: python script.py <name1> <name2> ...")
```

**Explanation:**
- Uses list slicing `sys.argv[1:]` to get all arguments except script name
- Iterates through each name and greets them
- Handles multiple names in a single command
- Example: `python script.py Alice Bob Charlie`

---

### Exercise 18: Number Calculator

```python
import sys

if len(sys.argv) >= 3:
    try:
        num1 = float(sys.argv[1])
        num2 = float(sys.argv[2])
        result = num1 + num2
        print(f"{num1} + {num2} = {result}")
    except ValueError:
        print("Please provide valid numbers as arguments")
else:
    print("Usage: python script.py <number1> <number2>")
```

**Explanation:**
- Converts string arguments to float numbers
- Performs addition and displays result
- Includes error handling for invalid inputs
- Example: `python script.py 10.5 7.3`

---

### Exercise 19: Safe Argument Access

```python
import sys

if len(sys.argv) > 1:
    for i, arg in enumerate(sys.argv[1:], 1):
        print(f"Argument {i}: {arg}")
else:
    print("No arguments given")
```

**Explanation:**
- Safely checks if arguments exist before accessing them
- Uses `enumerate()` to number the arguments starting from 1
- `sys.argv[1:]` excludes the script name
- Gracefully handles the case when no arguments are provided

---

### Exercise 20: Argument Validation

```python
import sys

if len(sys.argv) != 4:
    sys.exit("Usage: python script.py <arg1> <arg2> <arg3>")

print("Three arguments provided:")
for i, arg in enumerate(sys.argv[1:], 1):
    print(f"  {i}. {arg}")
```

**Explanation:**
- Uses `sys.exit()` to terminate if exactly 3 arguments aren't provided
- Displays an error message and exits immediately
- If validation passes, prints all three arguments
- Clean error handling prevents program crashes

---

### Exercise 21: File Processor

```python
import sys

if len(sys.argv) >= 2:
    filename = sys.argv[1]
    print(f"Processing file: {filename}")
else:
    print("Usage: python script.py <filename>")
```

**Explanation:**
- Takes a filename as command-line argument
- Displays a processing message
- Simple validation ensures a filename is provided
- Foundation for file processing applications

---

### Exercise 22: List Slicing Practice

```python
import sys

if len(sys.argv) > 1:
    print("All arguments except script name:")
    for i, arg in enumerate(sys.argv[1:], 1):
        print(f"  {i}. {arg}")
else:
    print("No additional arguments provided")
```

**Explanation:**
- Demonstrates `sys.argv[1:]` to skip the script name
- Shows all user-provided arguments
- Uses enumeration for clear numbering
- Handles the case when only the script name is provided

---

## Third-Party Libraries

### Exercise 23: Cowsay Greeting

```python
import cowsay
import sys

if len(sys.argv) >= 2:
    message = " ".join(sys.argv[1:])
    cowsay.cow(message)
else:
    cowsay.cow("Hello, World!")
```

**Explanation:**
- Uses `cowsay.cow()` to display text in ASCII art
- Joins multiple arguments into a single message
- Falls back to default message if no arguments provided
- Requires `pip install cowsay` to work

---

### Exercise 24: Multiple Cowsay Animals

```python
import cowsay

message = "Python is awesome!"

print("Cow says:")
cowsay.cow(message)

print("\nT-Rex says:")
cowsay.trex(message)

print("\nDragon says:")
cowsay.dragon(message)
```

**Explanation:**
- Demonstrates different animals in the cowsay library
- Each function creates different ASCII art styles
- Same message displayed in multiple formats
- Shows variety of available options

---

### Exercise 25: iTunes Search

```python
import requests
import sys

if len(sys.argv) >= 2:
    artist = sys.argv[1]
    url = f"https://itunes.apple.com/search?entity=song&limit=5&term={artist}"
    
    response = requests.get(url)
    data = response.json()
    
    print(f"Top 5 songs by {artist}:")
    for result in data["results"]:
        print(f"  - {result['trackName']}")
else:
    print("Usage: python script.py <artist_name>")
```

**Explanation:**
- Uses `requests` library to fetch data from iTunes API
- Constructs URL with artist name and limit parameter
- Parses JSON response to extract song names
- Displays first 5 results
- Requires `pip install requests` to work

---

## Creating Your Own Modules

### Exercise 26: Utility Module

**File: `utils.py`**
```python
def greet(name):
    print(f"Hello, {name}!")

def farewell(name):
    print(f"Goodbye, {name}!")

def calculate_square(x):
    return x * x

if __name__ == "__main__":
    print("Testing utils module:")
    greet("World")
    farewell("World")
    print(f"Square of 5: {calculate_square(5)}")
```

**Explanation:**
- Creates three functions: greet, farewell, and calculate_square
- Includes test code in the `if __name__ == "__main__"` block
- Test code only runs when file is executed directly
- Functions can be imported and used in other programs

---

### Exercise 27: Import Your Module

```python
import sys
from utils import greet, farewell, calculate_square

# Test the imported functions
greet("Alice")
farewell("Bob")
result = calculate_square(7)
print(f"7 squared is {result}")
```

**Explanation:**
- Imports specific functions from the utils module
- Uses each function to demonstrate functionality
- Shows how custom modules can be reused
- Functions work exactly like built-in module functions

---

### Exercise 28: Module with Tests

**File: `math_helper.py`**
```python
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def main():
    print("Testing math_helper module:")
    print(f"add(3, 5) = {add(3, 5)}")
    print(f"multiply(4, 6) = {multiply(4, 6)}")
    print(f"add(multiply(2, 3), 4) = {add(multiply(2, 3), 4)}")

if __name__ == "__main__":
    main()
```

**File: `use_math.py`**
```python
from math_helper import add, multiply

# Use the functions in a different program
x = 10
y = 20
sum_result = add(x, y)
product_result = multiply(x, y)

print(f"{x} + {y} = {sum_result}")
print(f"{x} * {y} = {product_result}")
```

**Explanation:**
- Creates a module with mathematical functions
- Includes comprehensive tests in the main block
- Demonstrates function composition (using one function inside another)
- Shows how the module can be imported and used elsewhere
- Proper `__name__` pattern prevents test code from running on import

---

## Challenge Problems

### Exercise 29: Complete Module System

**File: `calculator.py`**
```python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b != 0:
        return a / b
    else:
        return "Error: Division by zero"

if __name__ == "__main__":
    print("Calculator module tests:")
    print(f"5 + 3 = {add(5, 3)}")
    print(f"5 - 3 = {subtract(5, 3)}")
    print(f"5 * 3 = {multiply(5, 3)}")
    print(f"6 / 3 = {divide(6, 3)}")
```

**File: `greeting.py`**
```python
def formal_greeting(name):
    print(f"Good day, {name}. It's a pleasure to meet you.")

def casual_greeting(name):
    print(f"Hey {name}! What's up?")

def farewell(name):
    print(f"Goodbye, {name}. Have a great day!")

if __name__ == "__main__":
    print("Greeting module tests:")
    formal_greeting("Alice")
    casual_greeting("Bob")
    farewell("Charlie")
```

**File: `main_program.py`**
```python
import sys
from calculator import add, subtract, multiply, divide
from greeting import formal_greeting, casual_greeting, farewell

def main():
    print("=== Module System Demo ===\n")
    
    # Test calculator functions
    print("Calculator operations:")
    print(f"10 + 5 = {add(10, 5)}")
    print(f"10 - 5 = {subtract(10, 5)}")
    print(f"10 * 5 = {multiply(10, 5)}")
    print(f"10 / 5 = {divide(10, 5)}")
    print(f"10 / 0 = {divide(10, 0)}")
    
    print("\nGreeting examples:")
    formal_greeting("Dr. Smith")
    casual_greeting("Alex")
    farewell("Everyone")
    
    print("\n=== Demo Complete ===")

if __name__ == "__main__":
    main()
```

**Explanation:**
- Creates two separate modules with different functionality
- Calculator module provides mathematical operations
- Greeting module provides different greeting styles
- Main program imports and demonstrates both modules
- Shows how to organize larger programs into logical modules
- Each module can be tested independently

---

### Exercise 30: Command-Line Tool

**File: `tool.py`**
```python
import sys
import random
import statistics

def greet_user(name):
    print(f"Hello, {name}!")

def calculate_average(numbers):
    try:
        nums = [float(x) for x in numbers]
        avg = statistics.mean(nums)
        print(f"Average of {numbers}: {avg}")
    except ValueError:
        print("Error: Please provide valid numbers")

def generate_random(min_val, max_val):
    try:
        min_num = int(min_val)
        max_num = int(max_val)
        if min_num <= max_num:
            result = random.randint(min_num, max_num)
            print(f"Random number between {min_num} and {max_num}: {result}")
        else:
            print("Error: Min value must be less than or equal to max value")
    except ValueError:
        print("Error: Please provide valid integers")

def main():
    if len(sys.argv) < 2:
        print("Usage: python tool.py <command> [arguments]")
        print("Commands:")
        print("  greet <name>           - Say hello to someone")
        print("  average <num1> <num2> ... - Calculate average of numbers")
        print("  random <min> <max>     - Generate random number in range")
        return
    
    command = sys.argv[1].lower()
    
    if command == "greet" and len(sys.argv) >= 3:
        name = " ".join(sys.argv[2:])
        greet_user(name)
    elif command == "average" and len(sys.argv) >= 3:
        numbers = sys.argv[2:]
        calculate_average(numbers)
    elif command == "random" and len(sys.argv) == 4:
        min_val, max_val = sys.argv[2], sys.argv[3]
        generate_random(min_val, max_val)
    else:
        print("Invalid command or arguments. Use 'python tool.py' for help.")

if __name__ == "__main__":
    main()
```

**Explanation:**
- Creates a multi-function command-line tool
- Uses multiple modules: sys, random, statistics
- Implements three different commands with argument validation
- Provides helpful usage information
- Demonstrates real-world command-line tool structure
- Shows how modules work together in practical applications

---

## Key Concepts Practiced

Throughout these exercises, you've practiced:

1. **Module Importing** - `import module` vs `from module import function`
2. **Built-in Modules** - `random`, `statistics`, `sys` usage
3. **Command-Line Arguments** - `sys.argv`, error handling, slicing
4. **Third-Party Libraries** - `cowsay`, `requests` installation and usage
5. **Module Creation** - Writing reusable code in separate files
6. **The `__name__` Pattern** - Making files both runnable and importable
7. **Error Handling** - Safe argument access and validation
8. **API Usage** - Fetching and processing web data
9. **Code Organization** - Structuring larger programs with modules

All exercises use only the concepts covered in the original notes, providing comprehensive practice with Python modules and their real-world applications.