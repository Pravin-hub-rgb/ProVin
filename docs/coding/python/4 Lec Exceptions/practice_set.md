# Python Practice Set - Exceptions

**Instructions:** Complete each exercise by writing Python code that uses only the concepts covered in the 4th lecture notes. Do not use advanced exception handling features, custom exceptions, or any features not mentioned in the notes.

## Basic Exception Handling

### Exercise 1: Simple Input Validation
Write a program that asks the user for a number and prints it. Handle the case where the user enters non-numeric input using try-except.

### Exercise 2: Using Else Clause
Write a program that asks for a number and prints "Valid number!" if successful, or "Invalid input!" if there's an error. Use try-except-else structure.

### Exercise 3: Division Safety
Write a program that asks for two numbers and divides the first by the second. Handle division by zero errors.

### Exercise 4: List Access Safety
Write a program that creates a list of 5 items and asks the user for an index. Safely access the list item at that index, handling cases where the index is out of range.

### Exercise 5: Dictionary Access Safety
Write a program that creates a dictionary and asks the user for a key. Safely access the value for that key, handling cases where the key doesn't exist.

## Advanced Exception Handling

### Exercise 6: Multiple Exception Types
Write a program that asks for a number and divides 100 by that number. Handle both ValueError (invalid input) and ZeroDivisionError (division by zero) separately.

### Exercise 7: Silent Error Handling
Write a program that repeatedly asks for numbers until the user enters a valid integer. Use `pass` to silently handle invalid input without showing error messages.

### Exercise 8: Reusable Input Function
Create a function called `get_integer()` that safely gets an integer from the user using try-except. Use this function to get two numbers and print their sum.

### Exercise 9: Flexible Input Function
Create a function called `get_number(prompt)` that takes a prompt string as a parameter and safely gets an integer from the user. Use it to ask for age, score, and temperature.

### Exercise 10: Type Conversion Safety
Write a program that asks the user to enter a number as text (like "forty-two") and safely converts it to an integer. Handle cases where the conversion fails.

## Real-world Error Scenarios

### Exercise 11: Calculator with Error Handling
Create a simple calculator that asks for two numbers and an operation (+, -, *, /). Handle all possible errors including invalid numbers, invalid operations, and division by zero.

### Exercise 12: File Reading Safety
Write a program that asks the user for a filename and tries to read it. Handle the case where the file doesn't exist. (Note: This will create an error if the file doesn't exist, which you should handle gracefully.)

### Exercise 13: Mathematical Operations
Write a program that asks for a number and calculates its square root. Handle cases where the user enters a negative number (which would cause a math domain error in some contexts).

### Exercise 14: Grade Processing
Write a program that asks for 5 test scores, stores them in a list, and calculates the average. Handle cases where the user enters non-numeric values.

### Exercise 15: Temperature Conversion
Write a program that converts Celsius to Fahrenheit. Handle cases where the user enters invalid temperature values.

## Function Design and Reusability

### Exercise 16: Generic Input Validator
Create a function that takes a prompt and a validation function as parameters, and returns validated input. Use it to get an even number, a positive number, and a number between 1 and 100.

### Exercise 17: Safe Mathematical Functions
Create functions for common mathematical operations (square, cube, square root) that safely handle invalid inputs and return appropriate error messages.

### Exercise 18: Data Processing Pipeline
Create a function that processes a list of strings by converting them to integers. Handle cases where some strings can't be converted, and return both successful conversions and error information.

### Exercise 19: Configuration Reader
Create a function that reads configuration values from a dictionary safely. If a key doesn't exist, return a default value instead of raising an error.

### Exercise 20: Input Range Validator
Create a function that gets a number from the user within a specified range (min and max). Keep asking until the user provides a valid number within the range.

## Integration Problems

### Exercise 21: User Registration System
Create a program that collects user information (name, age, email) with proper validation. Handle all possible input errors and ensure all data is valid before proceeding.

### Exercise 22: Grade Book with Error Handling
Create a program that manages student grades. Allow adding students, adding grades, and calculating averages. Handle all input errors gracefully and provide helpful error messages.

### Exercise 23: Mathematical Quiz
Create a program that generates random math problems (addition, subtraction, multiplication, division). Handle user input errors and division by zero in the generated problems.

### Exercise 24: Data Analysis Tool
Write a program that analyzes a list of numbers. Calculate statistics like mean, median, and standard deviation. Handle cases where the list is empty or contains invalid data.

### Exercise 25: Interactive Menu System
Create a menu-driven program with multiple options (calculator, grade calculator, number analyzer). Handle all user input errors and allow the user to continue using the program after errors.

## Challenge Problems

### Exercise 26: Complex Input Validation
Create a function that validates email addresses by checking for the presence of '@' and '.' characters. Handle all edge cases and provide specific error messages for different types of invalid input.

### Exercise 27: Error Recovery System
Write a program that attempts multiple operations in sequence. If one operation fails, log the error and continue with the next operation instead of stopping the entire program.

### Exercise 28: Input Retry with Limits
Create a function that attempts to get valid input from the user but only allows a maximum number of attempts (e.g., 3 tries). After the limit is reached, provide a default value or exit gracefully.

### Exercise 29: Nested Exception Handling
Write a program that performs multiple operations where each operation could fail. Use nested try-except blocks to handle different levels of errors appropriately.

### Exercise 30: Robust Data Importer
Create a program that reads data from user input (simulating file import) and processes it. Handle various data format errors, missing data, and invalid values while trying to salvage as much valid data as possible.

**Remember:** Only use concepts from the 4th lecture notes - no custom exceptions, no advanced error handling features, no external libraries!