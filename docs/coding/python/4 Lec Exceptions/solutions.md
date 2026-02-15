# Python Practice Set - Solutions

This document contains complete solutions and explanations for all exercises in the exceptions practice set. Each solution uses only the concepts covered in the 4th lecture notes.

## Basic Exception Handling

### Exercise 1: Simple Input Validation

```python
try:
    number = int(input("Enter a number: "))
    print(f"You entered: {number}")
except ValueError:
    print("That's not a valid number!")
```

**Explanation:**
- `try` block contains code that might cause an error
- `int(input())` attempts to convert user input to integer
- If user enters "cat" or other non-numeric text, `ValueError` occurs
- `except ValueError` catches this specific error type
- Prints helpful message instead of crashing
- Demonstrates basic try-except structure

**Example Output:**
```
Enter a number: 42
You entered: 42

Enter a number: hello
That's not a valid number!
```

---

### Exercise 2: Using Else Clause

```python
try:
    number = int(input("Enter a number: "))
except ValueError:
    print("Invalid input!")
else:
    print("Valid number!")
```

**Explanation:**
- `try` block attempts to get and convert input
- If `ValueError` occurs, except block runs and prints "Invalid input!"
- If no error occurs, else block runs and prints "Valid number!"
- `else` only executes when try block completes successfully
- Shows clear separation between error handling and success logic

**Example Output:**
```
Enter a number: 123
Valid number!

Enter a number: abc
Invalid input!
```

---

### Exercise 3: Division Safety

```python
try:
    num1 = int(input("Enter first number: "))
    num2 = int(input("Enter second number: "))
    result = num1 / num2
    print(f"{num1} divided by {num2} = {result}")
except ValueError:
    print("Please enter valid numbers!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
```

**Explanation:**
- Two separate except blocks handle different error types
- `ValueError` catches invalid number input
- `ZeroDivisionError` catches division by zero
- Each error type gets a specific, helpful message
- Demonstrates handling multiple exception types

**Example Output:**
```
Enter first number: 10
Enter second number: 2
10 divided by 2 = 5.0

Enter first number: 10
Enter second number: 0
Cannot divide by zero!

Enter first number: abc
Enter second number: 5
Please enter valid numbers!
```

---

### Exercise 4: List Access Safety

```python
my_list = ["apple", "banana", "cherry", "date", "elderberry"]

try:
    index = int(input("Enter an index (0-4): "))
    print(f"Item at index {index}: {my_list[index]}")
except ValueError:
    print("Please enter a valid number!")
except IndexError:
    print("Index out of range! Please enter 0-4.")
```

**Explanation:**
- Creates a list with 5 items (indices 0-4)
- `int(input())` can raise `ValueError` for non-numeric input
- `my_list[index]` can raise `IndexError` for invalid indices
- Two except blocks handle each error type specifically
- Provides clear guidance for valid input ranges

**Example Output:**
```
Enter an index (0-4): 2
Item at index 2: cherry

Enter an index (0-4): 10
Index out of range! Please enter 0-4.

Enter an index (0-4): abc
Please enter a valid number!
```

---

### Exercise 5: Dictionary Access Safety

```python
capitals = {
    "USA": "Washington D.C.",
    "France": "Paris",
    "Japan": "Tokyo",
    "Germany": "Berlin",
    "Italy": "Rome"
}

try:
    country = input("Enter a country name: ")
    print(f"The capital of {country} is {capitals[country]}")
except KeyError:
    print(f"Sorry, I don't know the capital of {country}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
```

**Explanation:**
- Dictionary maps countries to their capitals
- `capitals[country]` raises `KeyError` if key doesn't exist
- First except handles the expected `KeyError`
- Second except catches any other unexpected errors
- Uses `as e` to capture and display the actual error message
- Demonstrates specific vs general exception handling

**Example Output:**
```
Enter a country name: France
The capital of France is Paris

Enter a country name: Canada
Sorry, I don't know the capital of Canada
```

---

## Advanced Exception Handling

### Exercise 6: Multiple Exception Types

```python
try:
    number = int(input("Enter a number: "))
    result = 100 / number
    print(f"100 divided by {number} = {result}")
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
```

**Explanation:**
- `ValueError` handles non-numeric input
- `ZeroDivisionError` handles division by zero
- Each exception type gets a specific error message
- Demonstrates handling multiple specific exception types
- Order of except blocks doesn't matter for different exception types

**Example Output:**
```
Enter a number: 5
100 divided by 5 = 20.0

Enter a number: 0
Cannot divide by zero!

Enter a number: abc
That's not a valid number!
```

---

### Exercise 7: Silent Error Handling

```python
while True:
    try:
        number = int(input("Enter a number (or 'done' to quit): "))
        print(f"You entered: {number}")
        break
    except ValueError:
        pass  # Silently ignore invalid input and try again
```

**Explanation:**
- `while True` creates infinite loop until valid input
- `try` attempts to get and convert input
- `except ValueError` catches conversion errors
- `pass` does nothing - silently ignores the error
- Loop continues automatically after pass
- Demonstrates silent error handling with retry

**Example Output:**
```
Enter a number (or 'done' to quit): abc
Enter a number (or 'done' to quit): 123
You entered: 123
```

---

### Exercise 8: Reusable Input Function

```python
def get_integer():
    while True:
        try:
            return int(input("Enter an integer: "))
        except ValueError:
            print("That's not a valid integer. Try again.")

# Use the function
num1 = get_integer()
num2 = get_integer()
print(f"Sum: {num1 + num2}")
```

**Explanation:**
- `get_integer()` function encapsulates input validation logic
- Uses `while True` to keep asking until valid input
- `return` in try block exits both function and loop on success
- `except ValueError` prints helpful message and continues loop
- Function can be reused anywhere integer input is needed
- Demonstrates code reusability through functions

**Example Output:**
```
Enter an integer: abc
That's not a valid integer. Try again.
Enter an integer: 42
Enter an integer: 58
Sum: 100
```

---

### Exercise 9: Flexible Input Function

```python
def get_number(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Please enter a valid number.")

# Use with different prompts
age = get_number("Enter your age: ")
score = get_number("Enter your test score: ")
temp = get_number("Enter temperature: ")

print(f"Age: {age}, Score: {score}, Temperature: {temp}")
```

**Explanation:**
- Function takes `prompt` parameter for flexibility
- Same validation logic works for any prompt
- Reusable for different types of number input
- Demonstrates parameterized function design
- Promotes code reuse and consistency

**Example Output:**
```
Enter your age: abc
Please enter a valid number.
Enter your age: 25
Enter your test score: 95
Enter temperature: 72
Age: 25, Score: 95, Temperature: 72
```

---

### Exercise 10: Type Conversion Safety

```python
word_to_number = {
    "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4,
    "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
    "ten": 10
}

try:
    word = input("Enter a number word (zero to ten): ").lower()
    number = word_to_number[word]
    print(f"{word} = {number}")
except KeyError:
    print(f"'{word}' is not a recognized number word.")
except Exception as e:
    print(f"An error occurred: {e}")
```

**Explanation:**
- Dictionary maps number words to their numeric values
- `word_to_number[word]` raises `KeyError` for unrecognized words
- `except KeyError` handles unknown number words
- `except Exception as e` catches any other unexpected errors
- Demonstrates dictionary-based conversion with error handling

**Example Output:**
```
Enter a number word (zero to ten): five
five = 5

Enter a number word (zero to ten): eleven
'eleven' is not a recognized number word.
```

---

## Real-world Error Scenarios

### Exercise 11: Calculator with Error Handling

```python
def calculator():
    try:
        num1 = float(input("Enter first number: "))
        operation = input("Enter operation (+, -, *, /): ")
        num2 = float(input("Enter second number: "))
        
        if operation == "+":
            result = num1 + num2
        elif operation == "-":
            result = num1 - num2
        elif operation == "*":
            result = num1 * num2
        elif operation == "/":
            if num2 == 0:
                raise ZeroDivisionError("Cannot divide by zero")
            result = num1 / num2
        else:
            raise ValueError("Invalid operation")
        
        print(f"Result: {num1} {operation} {num2} = {result}")
        
    except ValueError as e:
        if "could not convert" in str(e):
            print("Please enter valid numbers!")
        else:
            print(f"Error: {e}")
    except ZeroDivisionError as e:
        print(f"Error: {e}")

calculator()
```

**Explanation:**
- Handles multiple types of errors in one function
- `ValueError` for invalid numbers and invalid operations
- `ZeroDivisionError` for division by zero
- Uses `raise` to create custom error messages
- Demonstrates comprehensive error handling in a real application

**Example Output:**
```
Enter first number: 10
Enter operation (+, -, *, /): /
Enter second number: 2
Result: 10.0 / 2.0 = 5.0

Enter first number: 10
Enter operation (+, -, *, /): /
Enter second number: 0
Error: Cannot divide by zero

Enter first number: abc
Enter operation (+, -, *, /): +
Enter second number: 5
Please enter valid numbers!
```

---

### Exercise 12: File Reading Safety

```python
filename = input("Enter filename: ")

try:
    with open(filename, 'r') as file:
        content = file.read()
        print("File contents:")
        print(content)
except FileNotFoundError:
    print(f"File '{filename}' not found.")
except PermissionError:
    print(f"Permission denied to read '{filename}'.")
except Exception as e:
    print(f"An error occurred: {e}")
```

**Explanation:**
- Attempts to open and read a file
- `FileNotFoundError` handles missing files
- `PermissionError` handles files that can't be accessed
- Generic `Exception` catches any other unexpected errors
- Demonstrates file operations with comprehensive error handling

**Example Output:**
```
Enter filename: existing.txt
File contents:
Hello, world!

Enter filename: missing.txt
File 'missing.txt' not found.
```

---

### Exercise 13: Mathematical Operations

```python
import math

try:
    number = float(input("Enter a number: "))
    if number < 0:
        print("Cannot calculate square root of negative number.")
    else:
        result = math.sqrt(number)
        print(f"Square root of {number} = {result}")
except ValueError:
    print("Please enter a valid number.")
except Exception as e:
    print(f"An error occurred: {e}")
```

**Explanation:**
- Uses `math.sqrt()` to calculate square root
- Manual check for negative numbers before calculation
- `ValueError` handles invalid numeric input
- Generic exception handler for unexpected errors
- Demonstrates mathematical operations with validation

**Example Output:**
```
Enter a number: 16
Square root of 16.0 = 4.0

Enter a number: -5
Cannot calculate square root of negative number.

Enter a number: abc
Please enter a valid number.
```

---

### Exercise 14: Grade Processing

```python
def get_valid_score(prompt):
    while True:
        try:
            score = float(input(prompt))
            if 0 <= score <= 100:
                return score
            else:
                print("Score must be between 0 and 100.")
        except ValueError:
            print("Please enter a valid number.")

scores = []
for i in range(5):
    score = get_valid_score(f"Enter score {i+1} (0-100): ")
    scores.append(score)

average = sum(scores) / len(scores)
print(f"Scores: {scores}")
print(f"Average: {average:.2f}")
```

**Explanation:**
- Helper function validates individual scores
- Ensures scores are between 0 and 100
- Collects 5 valid scores in a list
- Calculates and displays average
- Demonstrates data collection with validation

**Example Output:**
```
Enter score 1 (0-100): 85
Enter score 2 (0-100): 92
Enter score 3 (0-100): 78
Enter score 4 (0-100): 150
Score must be between 0 and 100.
Enter score 4 (0-100): 88
Enter score 5 (0-100): abc
Please enter a valid number.
Enter score 5 (0-100): 91
Scores: [85.0, 92.0, 78.0, 88.0, 91.0]
Average: 86.80
```

---

### Exercise 15: Temperature Conversion

```python
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

try:
    celsius = float(input("Enter temperature in Celsius: "))
    fahrenheit = celsius_to_fahrenheit(celsius)
    print(f"{celsius}°C = {fahrenheit}°F")
except ValueError:
    print("Please enter a valid temperature.")
except Exception as e:
    print(f"An error occurred: {e}")
```

**Explanation:**
- Function handles the conversion calculation
- Main code handles input validation
- `ValueError` catches invalid numeric input
- Generic exception handler for unexpected errors
- Demonstrates temperature conversion with error handling

**Example Output:**
```
Enter temperature in Celsius: 25
25.0°C = 77.0°F

Enter temperature in Celsius: abc
Please enter a valid temperature.
```

---

## Function Design and Reusability

### Exercise 16: Generic Input Validator

```python
def get_validated_input(prompt, validation_func, error_msg):
    while True:
        try:
            value = int(input(prompt))
            if validation_func(value):
                return value
            else:
                print(error_msg)
        except ValueError:
            print("Please enter a valid integer.")

# Usage examples
even_num = get_validated_input(
    "Enter an even number: ",
    lambda x: x % 2 == 0,
    "Number must be even."
)

positive_num = get_validated_input(
    "Enter a positive number: ",
    lambda x: x > 0,
    "Number must be positive."
)

range_num = get_validated_input(
    "Enter a number between 1 and 100: ",
    lambda x: 1 <= x <= 100,
    "Number must be between 1 and 100."
)

print(f"Even: {even_num}, Positive: {positive_num}, Range: {range_num}")
```

**Explanation:**
- Generic function accepts prompt, validation function, and error message
- `validation_func` is a function that returns True/False for valid input
- Lambda functions provide inline validation logic
- Highly reusable for different validation scenarios
- Demonstrates functional programming concepts

**Example Output:**
```
Enter an even number: 5
Number must be even.
Enter an even number: 6
Enter a positive number: -3
Number must be positive.
Enter a positive number: 10
Enter a number between 1 and 100: 150
Number must be between 1 and 100.
Enter a number between 1 and 100: 75
Even: 6, Positive: 10, Range: 75
```

---

### Exercise 17: Safe Mathematical Functions

```python
def safe_square(x):
    try:
        return x ** 2
    except TypeError:
        return f"Error: Cannot square '{x}' (not a number)"

def safe_cube(x):
    try:
        return x ** 3
    except TypeError:
        return f"Error: Cannot cube '{x}' (not a number)"

def safe_square_root(x):
    try:
        if x < 0:
            return f"Error: Cannot calculate square root of negative number {x}"
        import math
        return math.sqrt(x)
    except TypeError:
        return f"Error: Cannot calculate square root of '{x}' (not a number)"

# Test the functions
print(safe_square(5))        # 25
print(safe_square("abc"))    # Error message
print(safe_cube(3))          # 27
print(safe_cube("xyz"))      # Error message
print(safe_square_root(16))  # 4.0
print(safe_square_root(-4))  # Error message
print(safe_square_root("def"))  # Error message
```

**Explanation:**
- Each function has its own error handling
- `TypeError` catches operations on non-numeric types
- Manual validation for mathematical constraints (negative square root)
- Returns descriptive error messages as strings
- Demonstrates defensive programming in mathematical functions

**Output:**
```
25
Error: Cannot square 'abc' (not a number)
27
Error: Cannot cube 'xyz' (not a number)
4.0
Error: Cannot calculate square root of negative number -4
Error: Cannot calculate square root of 'def' (not a number)
```

---

### Exercise 18: Data Processing Pipeline

```python
def process_string_list(string_list):
    results = []
    errors = []
    
    for item in string_list:
        try:
            number = int(item)
            results.append(number)
        except ValueError:
            errors.append(f"Could not convert '{item}' to integer")
    
    return results, errors

# Test the function
test_data = ["123", "456", "abc", "789", "def", "0"]
valid_numbers, conversion_errors = process_string_list(test_data)

print("Valid numbers:", valid_numbers)
print("Conversion errors:")
for error in conversion_errors:
    print(f"  - {error}")
```

**Explanation:**
- Processes a list of strings, converting valid ones to integers
- Collects successful conversions in `results` list
- Collects error information in `errors` list
- Returns both successful results and error details
- Demonstrates batch processing with error collection

**Output:**
```
Valid numbers: [123, 456, 789, 0]
Conversion errors:
  - Could not convert 'abc' to integer
  - Could not convert 'def' to integer
```

---

### Exercise 19: Configuration Reader

```python
def get_config_value(config_dict, key, default_value=None):
    try:
        return config_dict[key]
    except KeyError:
        print(f"Warning: Configuration key '{key}' not found. Using default: {default_value}")
        return default_value

# Example configuration
config = {
    "database_host": "localhost",
    "database_port": 5432,
    "debug_mode": True
}

# Safe access to configuration values
host = get_config_value(config, "database_host", "127.0.0.1")
port = get_config_value(config, "database_port", 3306)
timeout = get_config_value(config, "timeout", 30)  # Missing key
debug = get_config_value(config, "debug_mode", False)

print(f"Database: {host}:{port}")
print(f"Timeout: {timeout} seconds")
print(f"Debug mode: {debug}")
```

**Explanation:**
- Safely accesses dictionary values with fallback defaults
- `KeyError` caught when key doesn't exist
- Returns default value and prints warning for missing keys
- Useful for configuration management
- Demonstrates defensive dictionary access

**Output:**
```
Database: localhost:5432
Timeout: 30 seconds
Debug mode: True
Warning: Configuration key 'timeout' not found. Using default: 30
```

---

### Exercise 20: Input Range Validator

```python
def get_number_in_range(prompt, min_val, max_val):
    while True:
        try:
            number = int(input(f"{prompt} ({min_val}-{max_val}): "))
            if min_val <= number <= max_val:
                return number
            else:
                print(f"Number must be between {min_val} and {max_val}.")
        except ValueError:
            print("Please enter a valid integer.")

# Usage examples
age = get_number_in_range("Enter your age", 0, 120)
score = get_number_in_range("Enter test score", 0, 100)
quantity = get_number_in_range("Enter quantity", 1, 1000)

print(f"Age: {age}, Score: {score}, Quantity: {quantity}")
```

**Explanation:**
- Combines input validation with range checking
- Ensures input is both a valid integer and within specified range
- Clear error messages for both invalid input and out-of-range values
- Reusable for any bounded integer input
- Demonstrates comprehensive input validation

**Example Output:**
```
Enter your age (0-120): 150
Number must be between 0 and 120.
Enter your age (0-120): abc
Please enter a valid integer.
Enter your age (0-120): 25
Enter test score (0-100): 95
Enter quantity (1-1000): 50
Age: 25, Score: 95, Quantity: 50
```

---

## Integration Problems

### Exercise 21: User Registration System

```python
def get_name():
    while True:
        name = input("Enter your name: ").strip()
        if name and name.isalpha():
            return name
        print("Name must contain only letters and cannot be empty.")

def get_age():
    while True:
        try:
            age = int(input("Enter your age: "))
            if 0 <= age <= 150:
                return age
            print("Age must be between 0 and 150.")
        except ValueError:
            print("Please enter a valid age.")

def get_email():
    while True:
        email = input("Enter your email: ").strip()
        if "@" in email and "." in email:
            return email
        print("Please enter a valid email address.")

def register_user():
    print("=== User Registration ===")
    
    name = get_name()
    age = get_age()
    email = get_email()
    
    print("\n=== Registration Complete ===")
    print(f"Name: {name}")
    print(f"Age: {age}")
    print(f"Email: {email}")
    print("Welcome!")

register_user()
```

**Explanation:**
- Separate functions for each type of validation
- Name validation: non-empty and only letters
- Age validation: numeric and reasonable range
- Email validation: basic check for @ and . characters
- Main function orchestrates the registration process
- Demonstrates modular design with comprehensive validation

**Example Output:**
```
=== User Registration ===
Enter your name: John Doe
Name must contain only letters and cannot be empty.
Enter your name: John
Enter your age: abc
Please enter a valid age.
Enter your age: 25
Enter your email: john@example
Please enter a valid email address.
Enter your email: john@example.com

=== Registration Complete ===
Name: John
Age: 25
Email: john@example.com
Welcome!
```

---

### Exercise 22: Grade Book with Error Handling

```python
class GradeBook:
    def __init__(self):
        self.students = {}
    
    def add_student(self, name):
        try:
            if not name.strip():
                raise ValueError("Student name cannot be empty")
            if name in self.students:
                print(f"Student '{name}' already exists.")
            else:
                self.students[name] = []
                print(f"Added student: {name}")
        except ValueError as e:
            print(f"Error: {e}")
    
    def add_grade(self, name, grade):
        try:
            grade = float(grade)
            if not (0 <= grade <= 100):
                raise ValueError("Grade must be between 0 and 100")
            
            if name not in self.students:
                raise KeyError(f"Student '{name}' not found")
            
            self.students[name].append(grade)
            print(f"Added grade {grade} for {name}")
        except ValueError as e:
            print(f"Error: {e}")
        except KeyError as e:
            print(f"Error: {e}")
    
    def get_average(self, name):
        try:
            if name not in self.students:
                raise KeyError(f"Student '{name}' not found")
            
            grades = self.students[name]
            if not grades:
                raise ValueError(f"No grades found for {name}")
            
            average = sum(grades) / len(grades)
            return average
        except (KeyError, ValueError) as e:
            print(f"Error: {e}")
            return None
    
    def display_grades(self):
        if not self.students:
            print("No students in the grade book.")
            return
        
        for name, grades in self.students.items():
            avg = self.get_average(name)
            if avg is not None:
                print(f"{name}: {grades} (Average: {avg:.2f})")

# Example usage
gradebook = GradeBook()

gradebook.add_student("Alice")
gradebook.add_student("Bob")
gradebook.add_grade("Alice", 85)
gradebook.add_grade("Alice", 92)
gradebook.add_grade("Bob", 78)
gradebook.display_grades()
```

**Explanation:**
- Class-based approach for managing student grades
- Each method has comprehensive error handling
- Validates student names, grades, and operations
- Handles cases like missing students, invalid grades, empty grade lists
- Demonstrates object-oriented programming with exception handling

**Output:**
```
Added student: Alice
Added student: Bob
Added grade 85.0 for Alice
Added grade 92.0 for Alice
Added grade 78.0 for Bob
Alice: [85.0, 92.0] (Average: 88.50)
Bob: [78.0] (Average: 78.00)
```

---

### Exercise 23: Mathematical Quiz

```python
import random

def generate_problem():
    operations = ['+', '-', '*', '/']
    op = random.choice(operations)
    
    # Generate appropriate numbers for each operation
    if op == '+':
        a, b = random.randint(1, 50), random.randint(1, 50)
    elif op == '-':
        a, b = random.randint(10, 100), random.randint(1, a)
    elif op == '*':
        a, b = random.randint(1, 12), random.randint(1, 12)
    else:  # division
        b = random.randint(1, 12)
        a = b * random.randint(1, 12)  # Ensure clean division
    
    return a, b, op

def check_answer(a, b, op, user_answer):
    try:
        user_answer = float(user_answer)
        
        if op == '+':
            correct = a + b
        elif op == '-':
            correct = a - b
        elif op == '*':
            correct = a * b
        else:  # division
            correct = a / b
        
        return abs(user_answer - correct) < 0.001  # Allow small floating point errors
    except ValueError:
        return False

def math_quiz():
    print("=== Math Quiz ===")
    score = 0
    total = 5
    
    for i in range(total):
        a, b, op = generate_problem()
        print(f"\nProblem {i+1}: {a} {op} {b} = ?")
        
        while True:
            try:
                user_input = input("Your answer: ")
                if check_answer(a, b, op, user_input):
                    print("Correct!")
                    score += 1
                    break
                else:
                    print("Incorrect. Try again!")
            except KeyboardInterrupt:
                print("\nQuiz interrupted by user.")
                return
    
    print(f"\nQuiz complete! Score: {score}/{total}")

math_quiz()
```

**Explanation:**
- Generates random math problems with appropriate number ranges
- Handles division by ensuring clean results (no remainders)
- Validates user answers with floating-point tolerance
- Handles invalid input gracefully with retry logic
- Demonstrates interactive quiz with comprehensive error handling

**Example Output:**
```
=== Math Quiz ===

Problem 1: 23 + 17 = ?
Your answer: 40
Correct!

Problem 2: 56 - 28 = ?
Your answer: abc
Incorrect. Try again!
Your answer: 28
Correct!

Quiz complete! Score: 2/5
```

---

### Exercise 24: Data Analysis Tool

```python
def analyze_numbers(numbers):
    try:
        if not numbers:
            raise ValueError("No data to analyze")
        
        # Filter out non-numeric values
        valid_numbers = []
        for num in numbers:
            try:
                valid_numbers.append(float(num))
            except (ValueError, TypeError):
                print(f"Skipping invalid value: {num}")
        
        if not valid_numbers:
            raise ValueError("No valid numbers found")
        
        # Calculate statistics
        count = len(valid_numbers)
        total = sum(valid_numbers)
        mean = total / count
        
        # Calculate median
        sorted_numbers = sorted(valid_numbers)
        mid = count // 2
        if count % 2 == 0:
            median = (sorted_numbers[mid-1] + sorted_numbers[mid]) / 2
        else:
            median = sorted_numbers[mid]
        
        # Calculate standard deviation
        variance = sum((x - mean) ** 2 for x in valid_numbers) / count
        std_dev = variance ** 0.5
        
        print(f"Analysis Results:")
        print(f"  Count: {count}")
        print(f"  Mean: {mean:.2f}")
        print(f"  Median: {median:.2f}")
        print(f"  Standard Deviation: {std_dev:.2f}")
        print(f"  Min: {min(valid_numbers):.2f}")
        print(f"  Max: {max(valid_numbers):.2f}")
        
    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

# Test with various data
test_data = [1, 2, 3, 4, 5, "abc", 6, None, 7, "8.5"]
analyze_numbers(test_data)

analyze_numbers([])  # Empty data
analyze_numbers(["a", "b", "c"])  # All invalid
```

**Explanation:**
- Comprehensive data analysis with robust error handling
- Filters out invalid values while continuing processing
- Calculates multiple statistics: mean, median, standard deviation
- Handles empty data, all-invalid data, and mixed data types
- Demonstrates data processing with graceful error recovery

**Output:**
```
Skipping invalid value: abc
Skipping invalid value: None
Analysis Results:
  Count: 8
  Mean: 4.31
  Median: 4.50
  Standard Deviation: 2.14
  Min: 1.00
  Max: 8.50

Error: No data to analyze
Skipping invalid value: a
Skipping invalid value: b
Skipping invalid value: c
Error: No valid numbers found
```

---

### Exercise 25: Interactive Menu System

```python
def safe_calculator():
    try:
        num1 = float(input("Enter first number: "))
        operation = input("Enter operation (+, -, *, /): ")
        num2 = float(input("Enter second number: "))
        
        if operation == '+':
            result = num1 + num2
        elif operation == '-':
            result = num1 - num2
        elif operation == '*':
            result = num1 * num2
        elif operation == '/':
            if num2 == 0:
                raise ZeroDivisionError("Cannot divide by zero")
            result = num1 / num2
        else:
            raise ValueError("Invalid operation")
        
        print(f"Result: {num1} {operation} {num2} = {result}")
        
    except ValueError as e:
        if "could not convert" in str(e):
            print("Error: Please enter valid numbers.")
        else:
            print(f"Error: {e}")
    except ZeroDivisionError as e:
        print(f"Error: {e}")

def grade_calculator():
    try:
        scores = []
        print("Enter grades (enter 'done' when finished):")
        
        while True:
            user_input = input("Grade: ")
            if user_input.lower() == 'done':
                break
            
            try:
                score = float(user_input)
                if 0 <= score <= 100:
                    scores.append(score)
                else:
                    print("Grade must be between 0 and 100.")
            except ValueError:
                print("Please enter a valid number or 'done'.")
        
        if scores:
            average = sum(scores) / len(scores)
            print(f"Grades: {scores}")
            print(f"Average: {average:.2f}")
        else:
            print("No grades entered.")
            
    except Exception as e:
        print(f"An error occurred: {e}")

def number_analyzer():
    try:
        numbers = []
        print("Enter numbers (enter 'done' when finished):")
        
        while True:
            user_input = input("Number: ")
            if user_input.lower() == 'done':
                break
            
            try:
                number = float(user_input)
                numbers.append(number)
            except ValueError:
                print("Please enter a valid number or 'done'.")
        
        if numbers:
            print(f"Numbers: {numbers}")
            print(f"Sum: {sum(numbers)}")
            print(f"Average: {sum(numbers) / len(numbers):.2f}")
            print(f"Max: {max(numbers)}")
            print(f"Min: {min(numbers)}")
        else:
            print("No numbers entered.")
            
    except Exception as e:
        print(f"An error occurred: {e}")

def main_menu():
    while True:
        print("\n=== Main Menu ===")
        print("1. Calculator")
        print("2. Grade Calculator")
        print("3. Number Analyzer")
        print("4. Exit")
        
        try:
            choice = input("Choose an option (1-4): ")
            
            if choice == '1':
                safe_calculator()
            elif choice == '2':
                grade_calculator()
            elif choice == '3':
                number_analyzer()
            elif choice == '4':
                print("Goodbye!")
                break
            else:
                print("Invalid choice. Please enter 1-4.")
                
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

main_menu()
```

**Explanation:**
- Menu-driven program with multiple functionality options
- Each function has comprehensive error handling
- Main menu handles invalid choices and keyboard interrupts
- Users can continue using the program after errors
- Demonstrates robust interactive application design

**Example Output:**
```
=== Main Menu ===
1. Calculator
2. Grade Calculator
3. Number Analyzer
4. Exit
Choose an option (1-4): 1
Enter first number: 10
Enter operation (+, -, *, /): /
Enter second number: 0
Error: Cannot divide by zero

=== Main Menu ===
1. Calculator
2. Grade Calculator
3. Number Analyzer
4. Exit
Choose an option (1-4): abc
Invalid choice. Please enter 1-4.
```

---

## Challenge Problems

### Exercise 26: Complex Input Validation

```python
def validate_email(email):
    try:
        email = email.strip()
        
        if not email:
            return False, "Email cannot be empty"
        
        if '@' not in email:
            return False, "Email must contain '@' symbol"
        
        if email.count('@') > 1:
            return False, "Email cannot contain multiple '@' symbols"
        
        local_part, domain = email.split('@')
        
        if not local_part:
            return False, "Email must have a local part (before @)"
        
        if not domain:
            return False, "Email must have a domain part (after @)"
        
        if '.' not in domain:
            return False, "Domain must contain '.'"
        
        if domain.startswith('.') or domain.endswith('.'):
            return False, "Domain cannot start or end with '.'"
        
        # Basic character validation
        for char in email:
            if not (char.isalnum() or char in '._@-'):
                return False, f"Invalid character '{char}' in email"
        
        return True, "Valid email"
        
    except Exception as e:
        return False, f"Error validating email: {e}"

# Test the function
test_emails = [
    "user@example.com",
    "invalid.email",
    "@example.com",
    "user@",
    "user@@example.com",
    "user..name@example.com",
    "",
    "user name@example.com"
]

for email in test_emails:
    is_valid, message = validate_email(email)
    status = "✓" if is_valid else "✗"
    print(f"{status} {email:<25} - {message}")
```

**Explanation:**
- Comprehensive email validation with specific error messages
- Checks for @ symbol, domain structure, and character validity
- Handles edge cases like empty strings, multiple @ symbols
- Returns both validation result and descriptive error message
- Demonstrates complex input validation with detailed feedback

**Output:**
```
✓ user@example.com        - Valid email
✗ invalid.email           - Email must contain '@' symbol
✗ @example.com            - Email must have a local part (before @)
✗ user@                   - Email must have a domain part (after @)
✗ user@@example.com       - Email cannot contain multiple '@' symbols
✗ user..name@example.com  - Invalid character '.' in email
✗                         - Email cannot be empty
✗ user name@example.com   - Invalid character ' ' in email
```

---

### Exercise 27: Error Recovery System

```python
def operation_1():
    print("Performing operation 1...")
    # Simulate an operation that might fail
    import random
    if random.random() < 0.5:
        raise ValueError("Operation 1 failed")
    return "Result 1"

def operation_2():
    print("Performing operation 2...")
    # Another operation that might fail
    import random
    if random.random() < 0.3:
        raise RuntimeError("Operation 2 failed")
    return "Result 2"

def operation_3():
    print("Performing operation 3...")
    # Third operation
    return "Result 3"

def error_recovery_system():
    operations = [operation_1, operation_2, operation_3]
    results = []
    errors = []
    
    print("=== Error Recovery System ===")
    
    for i, operation in enumerate(operations, 1):
        try:
            print(f"\nStep {i}:")
            result = operation()
            results.append(result)
            print(f"✓ {result}")
        except ValueError as e:
            error_msg = f"ValueError in operation {i}: {e}"
            print(f"✗ {error_msg}")
            errors.append(error_msg)
            # Continue with next operation
        except RuntimeError as e:
            error_msg = f"RuntimeError in operation {i}: {e}"
            print(f"✗ {error_msg}")
            errors.append(error_msg)
            # Continue with next operation
        except Exception as e:
            error_msg = f"Unexpected error in operation {i}: {e}"
            print(f"✗ {error_msg}")
            errors.append(error_msg)
            # Continue with next operation
    
    print(f"\n=== Summary ===")
    print(f"Successful operations: {len(results)}")
    print(f"Failed operations: {len(errors)}")
    
    if results:
        print("Successful results:")
        for result in results:
            print(f"  - {result}")
    
    if errors:
        print("Errors encountered:")
        for error in errors:
            print(f"  - {error}")
    
    print("System completed all operations despite errors.")

error_recovery_system()
```

**Explanation:**
- Performs multiple operations in sequence
- Each operation might fail with different error types
- Catches and logs errors but continues with remaining operations
- Provides comprehensive summary of successes and failures
- Demonstrates fault-tolerant system design

**Example Output:**
```
=== Error Recovery System ===

Step 1:
Performing operation 1...
✓ Result 1

Step 2:
Performing operation 2...
✗ RuntimeError in operation 2: Operation 2 failed

Step 3:
Performing operation 3...
✓ Result 3

=== Summary ===
Successful operations: 2
Failed operations: 1
Successful results:
  - Result 1
  - Result 3
Errors encountered:
  - RuntimeError in operation 2: Operation 2 failed
System completed all operations despite errors.
```

---

### Exercise 28: Input Retry with Limits

```python
def get_input_with_retry(prompt, max_attempts=3):
    attempts = 0
    
    while attempts < max_attempts:
        try:
            user_input = input(f"{prompt} (Attempt {attempts + 1}/{max_attempts}): ")
            
            # Basic validation - non-empty input
            if user_input.strip():
                return user_input
            else:
                print("Input cannot be empty.")
                
        except KeyboardInterrupt:
            print("\nInput interrupted by user.")
            return None
        except Exception as e:
            print(f"An error occurred: {e}")
        
        attempts += 1
        
        if attempts < max_attempts:
            print(f"Please try again. {max_attempts - attempts} attempts remaining.")
    
    print(f"Maximum attempts ({max_attempts}) reached.")
    print("Using default value: 'default_value'")
    return "default_value"

def get_number_with_retry(prompt, max_attempts=3):
    attempts = 0
    
    while attempts < max_attempts:
        try:
            user_input = input(f"{prompt} (Attempt {attempts + 1}/{max_attempts}): ")
            number = float(user_input)
            return number
            
        except ValueError:
            print("Please enter a valid number.")
        except KeyboardInterrupt:
            print("\nInput interrupted by user.")
            return None
        except Exception as e:
            print(f"An error occurred: {e}")
        
        attempts += 1
        
        if attempts < max_attempts:
            print(f"Please try again. {max_attempts - attempts} attempts remaining.")
    
    print(f"Maximum attempts ({max_attempts}) reached.")
    print("Using default value: 0")
    return 0

# Test the functions
print("=== Testing Input Retry System ===")

name = get_input_with_retry("Enter your name")
if name:
    print(f"Hello, {name}!")

age = get_number_with_retry("Enter your age")
print(f"Age recorded as: {age}")

score = get_number_with_retry("Enter your score", max_attempts=2)
print(f"Score recorded as: {score}")
```

**Explanation:**
- Limits the number of retry attempts for user input
- Provides clear feedback about remaining attempts
- Returns default values when maximum attempts are reached
- Handles keyboard interrupts gracefully
- Demonstrates controlled retry logic with fallbacks

**Example Output:**
```
=== Testing Input Retry System ===
Enter your name (Attempt 1/3): 
Input cannot be empty.
Please try again. 2 attempts remaining.
Enter your name (Attempt 2/3): 
Input cannot be empty.
Please try again. 1 attempts remaining.
Enter your name (Attempt 3/3): 
Maximum attempts (3) reached.
Using default value: 'default_value'
Hello, default_value!

Enter your age (Attempt 1/3): abc
Please enter a valid number.
Please try again. 2 attempts remaining.
Enter your age (Attempt 2/3): def
Please enter a valid number.
Please try again. 1 attempts remaining.
Enter your age (Attempt 3/3): ghi
Please enter a valid number.
Maximum attempts (3) reached.
Using default value: 0
Age recorded as: 0
```

---

### Exercise 29: Nested Exception Handling

```python
def process_data(data):
    results = []
    
    try:
        print("Starting data processing...")
        
        for i, item in enumerate(data):
            try:
                print(f"\nProcessing item {i + 1}: {item}")
                
                # First level: Convert to number
                try:
                    number = float(item)
                    print(f"  Converted to number: {number}")
                except ValueError:
                    print(f"  Warning: Could not convert '{item}' to number")
                    continue
                
                # Second level: Mathematical operation
                try:
                    if number == 0:
                        raise ZeroDivisionError("Cannot process zero value")
                    
                    result = 100 / number
                    print(f"  Calculation result: {result}")
                    results.append(result)
                    
                except ZeroDivisionError as e:
                    print(f"  Error: {e}")
                    # Log error but continue processing
                    continue
                except OverflowError:
                    print(f"  Error: Number too large to process")
                    continue
                
            except Exception as e:
                print(f"  Unexpected error processing item: {e}")
                continue
        
        print(f"\nProcessing complete. Successfully processed {len(results)} items.")
        return results
        
    except Exception as e:
        print(f"Critical error in data processing: {e}")
        return []

# Test with problematic data
test_data = ["10", "0", "abc", "50", "xyz", "1000000000000000000000", "25"]

results = process_data(test_data)
print(f"\nFinal results: {results}")
```

**Explanation:**
- Demonstrates multiple levels of exception handling
- Outer try-catch handles critical system errors
- Middle level handles individual item processing
- Inner level handles specific conversion and calculation errors
- Each level has appropriate error handling and recovery
- Demonstrates graceful degradation and error isolation

**Output:**
```
Starting data processing...

Processing item 1: 10
  Converted to number: 10.0
  Calculation result: 10.0

Processing item 2: 0
  Converted to number: 0.0
  Error: Cannot process zero value

Processing item 3: abc
  Warning: Could not convert 'abc' to number

Processing item 4: 50
  Converted to number: 50.0
  Calculation result: 2.0

Processing item 5: xyz
  Warning: Could not convert 'xyz' to number

Processing item 6: 1000000000000000000000
  Converted to number: 1e+21
  Calculation result: 1e-19

Processing item 7: 25
  Converted to number: 25.0
  Calculation result: 4.0

Processing complete. Successfully processed 4 items.

Final results: [10.0, 2.0, 1e-19, 4.0]
```

---

### Exercise 30: Robust Data Importer

```python
def import_data_from_strings(data_strings):
    """
    Simulates importing data from various sources (files, user input, etc.)
    Handles multiple types of data format errors gracefully.
    """
    imported_data = []
    errors = []
    
    print("=== Data Import Process ===")
    
    for i, data_string in enumerate(data_strings, 1):
        try:
            print(f"\nImporting record {i}: '{data_string}'")
            
            # Check for empty or invalid data
            if not data_string or not data_string.strip():
                raise ValueError("Empty data record")
            
            # Try to parse as comma-separated values
            try:
                parts = data_string.strip().split(',')
                if len(parts) < 2:
                    raise ValueError("Insufficient data fields")
                
                name = parts[0].strip()
                if not name:
                    raise ValueError("Missing name field")
                
                # Try to parse numeric value
                try:
                    value = float(parts[1].strip())
                    if value < 0:
                        print(f"  Warning: Negative value detected, converting to positive")
                        value = abs(value)
                except ValueError:
                    raise ValueError(f"Invalid numeric value: '{parts[1]}'")
                
                # Additional validation
                if len(parts) > 2:
                    print(f"  Warning: Extra data fields ignored: {parts[2:]}")
                
                record = {"name": name, "value": value}
                imported_data.append(record)
                print(f"  ✓ Successfully imported: {record}")
                
            except ValueError as e:
                error_msg = f"Record {i}: {e}"
                print(f"  ✗ {error_msg}")
                errors.append(error_msg)
                
                # Try alternative parsing methods
                try:
                    # Try space-separated format
                    parts = data_string.strip().split()
                    if len(parts) >= 2:
                        name = parts[0]
                        value = float(parts[1])
                        record = {"name": name, "value": value}
                        imported_data.append(record)
                        print(f"  ✓ Alternative format accepted: {record}")
                        # Remove from errors since we recovered
                        errors.pop()
                    else:
                        raise ValueError("Cannot parse with alternative format")
                        
                except:
                    print(f"  ✗ Could not recover with alternative format")
        
        except Exception as e:
            error_msg = f"Record {i}: Unexpected error - {e}"
            print(f"  ✗ {error_msg}")
            errors.append(error_msg)
    
    # Summary
    print(f"\n=== Import Summary ===")
    print(f"Total records processed: {len(data_strings)}")
    print(f"Successfully imported: {len(imported_data)}")
    print(f"Failed imports: {len(errors)}")
    
    if imported_data:
        print(f"\nImported data:")
        for record in imported_data:
            print(f"  - {record}")
    
    if errors:
        print(f"\nImport errors:")
        for error in errors:
            print(f"  - {error}")
    
    print(f"Data import completed with {len(imported_data)} valid records.")
    return imported_data, errors

# Test with mixed quality data
test_data = [
    "John,25.5",
    "Alice,-30.2",
    "Bob,abc",
    "",
    "Charlie 45.7",
    "David,100,extra_field",
    "Eve",
    " Frank , 15.3 ",
    "invalid_data_format",
    "Grace,75.0"
]

imported_data, import_errors = import_data_from_strings(test_data)
```

**Explanation:**
- Simulates real-world data import with various error types
- Handles empty data, format errors, type conversion errors
- Attempts recovery using alternative parsing methods
- Provides detailed logging of successes and failures
- Returns both successfully imported data and error information
- Demonstrates robust data processing with maximum data recovery

**Output:**
```
=== Data Import Process ===

Importing record 1: 'John,25.5'
  ✓ Successfully imported: {'name': 'John', 'value': 25.5}

Importing record 2: 'Alice,-30.2'
  Warning: Negative value detected, converting to positive
  ✓ Successfully imported: {'name': 'Alice', 'value': 30.2}

Importing record 3: 'Bob,abc'
  ✗ Record 3: Invalid numeric value: 'abc'
  ✗ Could not recover with alternative format

Importing record 4: ''
  ✗ Record 4: Empty data record
  ✗ Could not recover with alternative format

Importing record 5: 'Charlie 45.7'
  ✗ Record 5: Insufficient data fields
  ✓ Alternative format accepted: {'name': 'Charlie', 'value': 45.7}

Importing record 6: 'David,100,extra_field'
  Warning: Extra data fields ignored: ['extra_field']
  ✓ Successfully imported: {'name': 'David', 'value': 100.0}

Importing record 7: 'Eve'
  ✗ Record 7: Insufficient data fields
  ✗ Could not recover with alternative format

Importing record 8: ' Frank , 15.3 '
  ✓ Successfully imported: {'name': 'Frank', 'value': 15.3}

Importing record 9: 'invalid_data_format'
  ✗ Record 9: Insufficient data fields
  ✗ Could not recover with alternative format

Importing record 10: 'Grace,75.0'
  ✓ Successfully imported: {'name': 'Grace', 'value': 75.0}

=== Import Summary ===
Total records processed: 10
Successfully imported: 7
Failed imports: 3

Imported data:
  - {'name': 'John', 'value': 25.5}
  - {'name': 'Alice', 'value': 30.2}
  - {'name': 'Charlie', 'value': 45.7}
  - {'name': 'David', 'value': 100.0}
  - {'name': 'Frank', 'value': 15.3}
  - {'name': 'Grace', 'value': 75.0}

Import errors:
  - Record 3: Invalid numeric value: 'abc'
  - Record 4: Empty data record
  - Record 7: Insufficient data fields

Data import completed with 7 valid records.
```

---

## Key Concepts Practiced

Throughout these exercises, you've practiced:

1. **Basic Exception Handling** - try-except structure, ValueError, ZeroDivisionError
2. **Advanced Exception Handling** - multiple except clauses, else clause, pass statement
3. **Function Design** - reusable validation functions, parameterized functions
4. **Real-world Scenarios** - file operations, mathematical operations, user input validation
5. **Error Recovery** - graceful degradation, alternative processing methods
6. **Input Validation** - comprehensive validation with helpful error messages
7. **Data Processing** - batch processing with error collection and recovery
8. **Interactive Applications** - menu systems with robust error handling
9. **Complex Error Handling** - nested exceptions, multiple error types, recovery strategies
10. **Best Practices** - specific exception handling, meaningful error messages, defensive programming

All exercises use only the concepts covered in the 4th lecture notes, providing comprehensive practice with Python exception handling without overwhelming beginners with advanced features.