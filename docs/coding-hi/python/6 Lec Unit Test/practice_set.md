# Python Practice Set - Unit Tests

**Instructions:** Complete each exercise by writing Python code that demonstrates unit testing concepts. Use pytest for all testing exercises. Do not use conditionals, loops, or any advanced features not mentioned in the notes.

## Understanding Unit Tests

### Exercise 1: What are Unit Tests?
Explain in your own words:
1. What is a unit test?
2. Why are unit tests important?
3. What is the difference between manual testing and automated testing?

### Exercise 2: Testable vs Non-Testable Functions
For each function below, determine if it's easy to test or hard to test. Explain why.

```python
# Function A
def greet(name):
    print(f"Hello, {name}!")

# Function B  
def greet(name):
    return f"Hello, {name}!"

# Function C
def calculate_total(price, tax):
    return price + (price * tax / 100)

# Function D
def calculate_total(price, tax):
    total = price + (price * tax / 100)
    print(f"Total: ${total}")
```

## Writing Testable Functions

### Exercise 3: Convert to Testable Function
Convert this function to be testable (return a value instead of printing):

```python
def say_hello():
    print("Hello, World!")
```

### Exercise 4: Add Main Guard
Add the proper `if __name__ == "__main__"` guard to this code:

```python
def square(n):
    return n * n

def main():
    x = int(input("Enter a number: "))
    print(f"Square is {square(x)}")

main()
```

### Exercise 5: Create Testable Calculator
Write a testable function that:
1. Takes two numbers as parameters
2. Returns their sum
3. Has proper documentation
4. Includes the main guard

## Basic pytest Tests

### Exercise 6: Install and Run pytest
1. Install pytest using pip
2. Create a simple test file that tests the `square` function from the notes
3. Run the test and verify it passes

### Exercise 7: Write Basic Tests
Create a test file for this function:

```python
def multiply(a, b):
    return a * b
```

Write tests for:
- Positive numbers (2 × 3 = 6)
- Negative numbers (-2 × 3 = -6)
- Zero (5 × 0 = 0)

### Exercise 8: Using assert Statements
Write a test function that uses `assert` to verify that:
1. `len("hello") == 5`
2. `"world".upper() == "WORLD"`
3. `4 + 4 == 8`

## Test Organization

### Exercise 9: Separate Test Categories
For the `square` function, create three separate test functions:
1. `test_positive()` - test positive numbers
2. `test_negative()` - test negative numbers  
3. `test_zero()` - test zero

### Exercise 10: Proper Naming Conventions
Create a test file named correctly that tests this function:

```python
def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    return a / b
```

Use proper test function names and test these cases:
- `divide(10, 2)` should equal 5
- `divide(9, 3)` should equal 3
- `divide(5, 0)` should equal "Cannot divide by zero"

### Exercise 11: Test File Structure
Create the proper folder structure for tests:
```
project/
├── calculator.py
└── tests/
    ├── __init__.py
    └── test_calculator.py
```

Write tests for a simple calculator with `add`, `subtract`, and `multiply` functions.

## String Function Testing

### Exercise 12: Testing String Functions
Create a testable function and corresponding tests for:
1. A function that formats a name (removes spaces, capitalizes properly)
2. A function that creates an email address from first and last name

### Exercise 13: Hello Function Tests
Using the `hello` function from the notes:

```python
def hello(to="world"):
    return f"hello, {to}"
```

Write tests for:
- Default argument (no parameters)
- With a name parameter
- With an empty string

### Exercise 14: Multiple String Operations
Create a function that:
1. Takes a string as input
2. Removes extra spaces
3. Converts to uppercase
4. Returns the result

Write tests for this function with various inputs.

## Advanced Testing Patterns

### Exercise 15: Using Loops in Tests
Write a test that uses a loop to test multiple values at once. Test the `square` function with these values: [1, 2, 3, 4, 5].

### Exercise 16: Testing Edge Cases
For a function that calculates the area of a rectangle:

```python
def rectangle_area(length, width):
    return length * width
```

Write tests for:
- Normal positive values
- Zero values
- Negative values (if applicable)

### Exercise 17: Organizing Multiple Tests
Create a complete test suite for a simple bank account system with these functions:
- `deposit(balance, amount)` - adds money
- `withdraw(balance, amount)` - subtracts money (if sufficient funds)
- `get_balance()` - returns current balance

## Integration Problems

### Exercise 18: Complete Testing Workflow
Create a complete program with:
1. A main file with testable functions
2. A test file with comprehensive tests
3. Proper folder structure
4. Run all tests and verify they pass

The program should be a simple temperature converter with:
- `celsius_to_fahrenheit(c)`
- `fahrenheit_to_celsius(f)`
- `kelvin_to_celsius(k)`

### Exercise 19: Real-World Testing
Create a testable function for a shopping cart that:
1. Calculates total cost including tax
2. Applies discounts for bulk purchases
3. Handles invalid inputs gracefully

Write comprehensive tests covering all scenarios.

### Exercise 20: Testing Mathematical Functions
Create testable functions for common mathematical operations:
- Square root
- Power/exponentiation
- Absolute value
- Rounding

Write tests that cover:
- Positive numbers
- Negative numbers
- Zero
- Decimal numbers
- Edge cases

## Challenge Problems

### Exercise 21: Test-Driven Development
Practice TDD by:
1. First writing tests for a function that checks if a number is prime
2. Then implementing the function to make tests pass
3. Adding more tests for edge cases

### Exercise 22: Testing Complex Logic
Create a function that determines a person's zodiac sign based on their birth date. Write tests for:
- Each zodiac sign
- Edge dates (when signs change)
- Invalid dates
- Leap year handling

### Exercise 23: Performance Testing
Create a function that finds the nth Fibonacci number. Write tests to:
1. Verify correctness for small values
2. Test performance for larger values
3. Compare different implementation approaches

**Remember:** Focus on writing testable code that returns values, uses proper naming conventions, and follows pytest best practices!