# Python Practice Set - Modules

**Instructions:** Complete each exercise by writing Python code that uses only the concepts covered in the notes. Do not use conditionals, loops, or any advanced features not mentioned in the notes.

## Basic Module Usage

### Exercise 1: Simple Import
Write a program that imports the `random` module and uses `random.choice()` to randomly select and print either "heads" or "tails".

### Exercise 2: Alternative Import Syntax
Write a program that uses `from random import choice` and then calls `choice()` to randomly select from a list of three colors: "red", "blue", "green".

### Exercise 3: Multiple Function Import
Write a program that imports both `choice` and `randint` from the `random` module, then:
1. Uses `choice()` to pick a random day of the week
2. Uses `randint()` to generate a random number between 1 and 10

### Exercise 4: Statistics Module
Write a program that imports the `statistics` module and calculates the average (mean) of these test scores: 85, 92, 78, 96, 88.

### Exercise 5: System Module
Write a program that imports the `sys` module and prints the name of the script being executed (using `sys.argv[0]`).

### Exercise 6: Module Documentation
Write a program that imports the `random` module and displays the help documentation for the `choice` function.

## The `random` Module

### Exercise 7: Coin Flip Simulator
Write a program that simulates flipping a coin 10 times using `random.choice()`. Print each result on a separate line.

### Exercise 8: Dice Roller
Write a program that simulates rolling a six-sided die 5 times using `random.randint()`. Print each roll result.

### Exercise 9: Card Shuffler
Write a program that:
1. Creates a list of 5 playing cards: ["Ace", "King", "Queen", "Jack", "10"]
2. Uses `random.shuffle()` to shuffle the deck
3. Prints the shuffled order

### Exercise 10: Random Password Generator
Write a program that generates a random 8-character password using `random.choice()` with this character set: "abcdefghijklmnopqrstuvwxyz0123456789".

### Exercise 11: Lottery Number Picker
Write a program that picks 6 unique random numbers between 1 and 49 for a lottery ticket using `random.sample()`.

### Exercise 12: Random Team Selector
Write a program that randomly divides 8 players into 2 teams of 4. Use a list of player names and `random.sample()` to create the teams.

## The `statistics` Module

### Exercise 13: Grade Calculator
Write a program that calculates and prints the mean, median, and mode of these quiz scores: [85, 90, 78, 92, 85, 88, 90].

### Exercise 14: Data Analysis
Write a program that analyzes this dataset of temperatures: [72, 68, 75, 80, 73, 69, 77]. Calculate and print the mean and standard deviation.

### Exercise 15: Sports Statistics
Write a program that tracks a basketball player's points per game: [25, 18, 32, 28, 21, 35, 29]. Calculate and print the average points per game.

## Command-Line Arguments

### Exercise 16: Simple Greeting
Write a program that takes a name as a command-line argument and prints "Hello, [name]!".

### Exercise 17: Multiple Names
Write a program that accepts multiple names as command-line arguments and prints a greeting for each person.

### Exercise 18: Number Calculator
Write a program that takes two numbers as command-line arguments and prints their sum.

### Exercise 19: Safe Argument Access
Write a program that safely accesses command-line arguments with proper error handling. If no arguments are provided, print "No arguments given".

### Exercise 20: Argument Validation
Write a program that checks if exactly 3 command-line arguments are provided. If not, use `sys.exit()` to terminate with an error message.

### Exercise 21: File Processor
Write a program that takes a filename as a command-line argument and prints "Processing file: [filename]".

### Exercise 22: List Slicing Practice
Write a program that takes multiple command-line arguments and prints all arguments except the first one (the script name).

## Third-Party Libraries

### Exercise 23: Cowsay Greeting
Write a program that uses the `cowsay` library to make a cow say "Hello, World!".

### Exercise 24: Multiple Cowsay Animals
Write a program that uses different `cowsay` functions (cow, trex, dragon) to display the same message.

### Exercise 25: iTunes Search
Write a program that uses the `requests` library to search for songs by a specific artist using the iTunes API. Print the first 5 results.

## Creating Your Own Modules

### Exercise 26: Utility Module
Create a module called `utils.py` with these functions:
- `greet(name)` - prints "Hello, [name]!"
- `farewell(name)` - prints "Goodbye, [name]!"
- `calculate_square(x)` - returns x squared

### Exercise 27: Import Your Module
Write a program that imports your `utils.py` module and uses all three functions.

### Exercise 28: Module with Tests
Create a module called `math_helper.py` with:
- `add(a, b)` function
- `multiply(a, b)` function
- A `main()` function that tests both functions
- Proper `if __name__ == "__main__"` structure

Write a separate program that imports and uses these functions.

## Challenge Problems

### Exercise 29: Complete Module System
Create a complete module system with:
1. A `calculator.py` module with basic math functions
2. A `greeting.py` module with different greeting styles
3. A main program that imports both modules and demonstrates their use

### Exercise 30: Command-Line Tool
Write a command-line tool that:
1. Takes a command as the first argument (like "greet", "calculate", "random")
2. Processes additional arguments based on the command
3. Uses appropriate modules for each function

**Remember:** Only use concepts from the notes - no conditionals, loops, or advanced features!