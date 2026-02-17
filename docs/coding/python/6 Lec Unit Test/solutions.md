# Python Practice Set - Solutions

This document contains complete solutions and explanations for all exercises in the Unit Tests practice set. Each solution demonstrates proper pytest usage and testing best practices.

## Understanding Unit Tests

### Exercise 1: What are Unit Tests?

**Answers:**

1. **What is a unit test?**
   A unit test is a piece of code that tests a small, isolated piece of functionality (usually a single function) to verify it works correctly. It's automated code that checks if your functions produce the expected output for given inputs.

2. **Why are unit tests important?**
   - **Saves time** - Run all tests with one command instead of manual testing
   - **Catches regressions** - Ensures new code doesn't break old code
   - **Documents behavior** - Tests show exactly how functions are supposed to work
   - **Gives confidence** - Know your code works before shipping it
   - **Great for collaboration** - Others can verify they haven't broken your code

3. **Difference between manual and automated testing:**
   - **Manual testing:** Running the program, typing input, checking output manually. Not scalable for large projects.
   - **Automated testing:** Writing code that automatically tests your functions and reports results. Scales well and catches issues quickly.

---

### Exercise 2: Testable vs Non-Testable Functions

**Analysis:**

```python
# Function A - HARD to test
def greet(name):
    print(f"Hello, {name}!")
# Why: Only prints output, can't easily capture and verify the result

# Function B - EASY to test  
def greet(name):
    return f"Hello, {name}!"
# Why: Returns a value that can be directly compared with expected results

# Function C - EASY to test
def calculate_total(price, tax):
    return price + (price * tax / 100)
# Why: Returns a calculated value that can be verified

# Function D - HARD to test
def calculate_total(price, tax):
    total = price + (price * tax / 100)
    print(f"Total: ${total}")
# Why: Prints output instead of returning the calculated value
```

**Key principle:** Functions that return values are much easier to test than functions that only print (side effects).

---

## Writing Testable Functions

### Exercise 3: Convert to Testable Function

```python
def say_hello():
    return "Hello, World!"

# Test file: test_say_hello.py
def test_say_hello():
    assert say_hello() == "Hello, World!"
```

**Explanation:** Changed `print()` to `return` so the function's output can be captured and tested with `assert`.

---

### Exercise 4: Add Main Guard

```python
def square(n):
    return n * n

def main():
    x = int(input("Enter a number: "))
    print(f"Square is {square(x)}")

if __name__ == "__main__":
    main()
```

**Explanation:** The `if __name__ == "__main__":` guard prevents `main()` from running when the file is imported for testing. This allows pytest to import the `square` function without triggering user input.

---

### Exercise 5: Create Testable Calculator

```python
def add_numbers(a, b):
    """
    Add two numbers and return the result.
    
    Args:
        a (int or float): First number
        b (int or float): Second number
    
    Returns:
        int or float: Sum of a and b
    """
    return a + b

def main():
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))
    result = add_numbers(num1, num2)
    print(f"Sum: {result}")

if __name__ == "__main__":
    main()
```

**Explanation:** 
- Function returns the calculated value instead of printing
- Includes proper documentation with docstring
- Has the main guard for testability
- Uses clear, descriptive function name

---

## Basic pytest Tests

### Exercise 6: Install and Run pytest

**Step 1: Install pytest**
```bash
pip install pytest
```

**Step 2: Create test file (test_square.py)**
```python
from calculator1 import square

def test_square():
    assert square(2) == 4
    assert square(3) == 9
```

**Step 3: Run the test**
```bash
pytest test_square.py
```

**Expected output:**
```
============================= test session starts ==============================
collected 1 item

test_square.py .                                                         [100%]

============================== 1 passed in 0.02s ===============================
```

---

### Exercise 7: Write Basic Tests

**File: test_multiply.py**
```python
def multiply(a, b):
    return a * b

def test_positive():
    assert multiply(2, 3) == 6

def test_negative():
    assert multiply(-2, 3) == -6

def test_zero():
    assert multiply(5, 0) == 0
```

**Running the tests:**
```bash
pytest test_multiply.py
```

**Output:**
```
============================= test session starts ==============================
collected 3 items

test_multiply.py ...                                                     [100%]

============================== 3 passed in 0.02s ===============================
```

**Explanation:** Tests are separated by category (positive, negative, zero) for better organization and clearer failure reporting.

---

### Exercise 8: Using assert Statements

**File: test_assert_examples.py**
```python
def test_string_operations():
    assert len("hello") == 5
    assert "world".upper() == "WORLD"
    assert 4 + 4 == 8

# Alternative: separate test functions
def test_string_length():
    assert len("hello") == 5

def test_uppercase():
    assert "world".upper() == "WORLD"

def test_addition():
    assert 4 + 4 == 8
```

**Explanation:** `assert` statements check if a condition is True. If False, they raise an AssertionError. This is the core mechanism pytest uses for testing.

---

## Test Organization

### Exercise 9: Separate Test Categories

**File: test_square_categories.py**
```python
def square(n):
    return n * n

def test_positive():
    assert square(2) == 4
    assert square(5) == 25

def test_negative():
    assert square(-3) == 9
    assert square(-1) == 1

def test_zero():
    assert square(0) == 0
```

**Explanation:** Separating tests by category makes it clear which type of input is causing failures and helps organize test logic.

---

### Exercise 10: Proper Naming Conventions

**File: test_divide.py**
```python
def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    return a / b

def test_divide_positive():
    assert divide(10, 2) == 5
    assert divide(9, 3) == 3

def test_divide_by_zero():
    assert divide(5, 0) == "Cannot divide by zero"
```

**Explanation:**
- Test file name: `test_divide.py` (starts with `test_`)
- Test function names: `test_divide_positive()`, `test_divide_by_zero()` (start with `test_`)
- Each test focuses on a specific behavior

---

### Exercise 11: Test File Structure

**Project structure:**
```
project/
├── calculator.py
└── tests/
    ├── __init__.py
    └── test_calculator.py
```

**File: calculator.py**
```python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

if __name__ == "__main__":
    print("Calculator functions ready!")
```

**File: tests/__init__.py**
```python
# Empty file - marks this directory as a Python package
```

**File: tests/test_calculator.py**
```python
from calculator import add, subtract, multiply

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

def test_subtract():
    assert subtract(5, 3) == 2
    assert subtract(10, 5) == 5

def test_multiply():
    assert multiply(3, 4) == 12
    assert multiply(-2, 3) == -6
```

**Running all tests:**
```bash
pytest tests/
```

**Output:**
```
============================= test session starts ==============================
collected 6 items

tests/test_calculator.py ......                                          [100%]

============================== 6 passed in 0.03s ===============================
```

**Explanation:** The `__init__.py` file makes the `tests` directory a Python package, which pytest needs to discover and import test files properly.

---

## String Function Testing

### Exercise 12: Testing String Functions

**File: name_formatter.py**
```python
def format_name(full_name):
    """Format a name by removing extra spaces and capitalizing properly."""
    return full_name.strip().title()

def create_email(first_name, last_name):
    """Create an email address from first and last name."""
    clean_first = first_name.strip().lower()
    clean_last = last_name.strip().lower()
    return f"{clean_first}.{clean_last}@company.com"

if __name__ == "__main__":
    print("Name formatter ready!")
```

**File: tests/test_name_formatter.py**
```python
from name_formatter import format_name, create_email

def test_format_name():
    assert format_name("  john doe  ") == "John Doe"
    assert format_name("ALICE") == "Alice"
    assert format_name("bob") == "Bob"

def test_create_email():
    assert create_email("John", "Doe") == "john.doe@company.com"
    assert create_email("  ALICE  ", "  SMITH  ") == "alice.smith@company.com"
```

---

### Exercise 13: Hello Function Tests

**File: hello.py**
```python
def hello(to="world"):
    return f"hello, {to}"

if __name__ == "__main__":
    print(hello())
```

**File: tests/test_hello.py**
```python
from hello import hello

def test_default():
    assert hello() == "hello, world"

def test_with_name():
    assert hello("Python") == "hello, Python"

def test_empty_string():
    assert hello("") == "hello, "
```

**Explanation:** Tests cover the default parameter, a specific argument, and an edge case (empty string).

---

### Exercise 14: Multiple String Operations

**File: text_processor.py**
```python
def clean_and_uppercase(text):
    """Remove extra spaces and convert to uppercase."""
    return text.strip().upper()

if __name__ == "__main__":
    print("Text processor ready!")
```

**File: tests/test_text_processor.py**
```python
from text_processor import clean_and_uppercase

def test_clean_and_uppercase():
    assert clean_and_uppercase("  hello world  ") == "HELLO WORLD"
    assert clean_and_uppercase("PYTHON") == "PYTHON"
    assert clean_and_uppercase("  a  ") == "A"
    assert clean_and_uppercase("") == ""
```

---

## Advanced Testing Patterns

### Exercise 15: Using Loops in Tests

**File: test_square_with_loop.py**
```python
def square(n):
    return n * n

def test_multiple_squares():
    test_values = [1, 2, 3, 4, 5]
    expected_results = [1, 4, 9, 16, 25]
    
    for i, value in enumerate(test_values):
        assert square(value) == expected_results[i]
```

**Alternative approach (more pytest-idiomatic):**
```python
def square(n):
    return n * n

def test_square_values():
    test_cases = [
        (1, 1),
        (2, 4), 
        (3, 9),
        (4, 16),
        (5, 25)
    ]
    
    for input_val, expected in test_cases:
        assert square(input_val) == expected
```

**Explanation:** Loops can test multiple values efficiently, but you lose visibility into which specific value failed. Use when testing patterns across similar inputs.

---

### Exercise 16: Testing Edge Cases

**File: rectangle.py**
```python
def rectangle_area(length, width):
    return length * width

if __name__ == "__main__":
    print("Rectangle calculator ready!")
```

**File: tests/test_rectangle.py**
```python
from rectangle import rectangle_area

def test_positive_values():
    assert rectangle_area(5, 3) == 15
    assert rectangle_area(10, 2) == 20

def test_zero_values():
    assert rectangle_area(0, 5) == 0
    assert rectangle_area(5, 0) == 0
    assert rectangle_area(0, 0) == 0

def test_negative_values():
    assert rectangle_area(-5, 3) == -15
    assert rectangle_area(5, -2) == -10
    assert rectangle_area(-3, -4) == 12
```

**Explanation:** Tests cover normal cases, edge cases (zero), and boundary conditions (negative values).

---

### Exercise 17: Organizing Multiple Tests

**File: bank_account.py**
```python
def deposit(balance, amount):
    """Add money to the account."""
    return balance + amount

def withdraw(balance, amount):
    """Subtract money from account if sufficient funds."""
    if amount > balance:
        return "Insufficient funds"
    return balance - amount

def get_balance():
    """Return current balance (hardcoded for testing)."""
    return 100.0

if __name__ == "__main__":
    print("Bank account ready!")
```

**File: tests/test_bank_account.py**
```python
from bank_account import deposit, withdraw, get_balance

def test_deposit():
    assert deposit(100, 50) == 150
    assert deposit(0, 25) == 25

def test_withdraw_success():
    assert withdraw(100, 50) == 50
    assert withdraw(50, 25) == 25

def test_withdraw_insufficient():
    assert withdraw(50, 100) == "Insufficient funds"
    assert withdraw(10, 50) == "Insufficient funds"

def test_get_balance():
    assert get_balance() == 100.0
```

---

## Integration Problems

### Exercise 18: Complete Testing Workflow

**File: temperature_converter.py**
```python
def celsius_to_fahrenheit(c):
    """Convert Celsius to Fahrenheit."""
    return c * 9/5 + 32

def fahrenheit_to_celsius(f):
    """Convert Fahrenheit to Celsius."""
    return (f - 32) * 5/9

def kelvin_to_celsius(k):
    """Convert Kelvin to Celsius."""
    return k - 273.15

def main():
    print("Temperature converter ready!")

if __name__ == "__main__":
    main()
```

**File: tests/test_temperature_converter.py**
```python
from temperature_converter import celsius_to_fahrenheit, fahrenheit_to_celsius, kelvin_to_celsius

def test_celsius_to_fahrenheit():
    assert celsius_to_fahrenheit(0) == 32
    assert celsius_to_fahrenheit(100) == 212
    assert celsius_to_fahrenheit(-40) == -40

def test_fahrenheit_to_celsius():
    assert fahrenheit_to_celsius(32) == 0
    assert fahrenheit_to_celsius(212) == 100
    assert fahrenheit_to_celsius(-40) == -40

def test_kelvin_to_celsius():
    assert kelvin_to_celsius(273.15) == 0
    assert kelvin_to_celsius(373.15) == 100
    assert kelvin_to_celsius(0) == -273.15

def test_round_trip_conversion():
    """Test that conversions work in both directions."""
    celsius = 25
    fahrenheit = celsius_to_fahrenheit(celsius)
    converted_back = fahrenheit_to_celsius(fahrenheit)
    assert abs(converted_back - celsius) < 0.0001  # Allow for floating point precision
```

**Project structure:**
```
temperature_project/
├── temperature_converter.py
└── tests/
    ├── __init__.py
    └── test_temperature_converter.py
```

**Running tests:**
```bash
cd temperature_project
pytest tests/
```

---

### Exercise 19: Real-World Testing

**File: shopping_cart.py**
```python
def calculate_total(items, tax_rate=0.08):
    """Calculate total cost including tax."""
    subtotal = sum(items)
    tax = subtotal * tax_rate
    return subtotal + tax

def apply_bulk_discount(items):
    """Apply 10% discount if total items cost over $100."""
    total = sum(items)
    if total > 100:
        return total * 0.9
    return total

def validate_input(items):
    """Validate that all items are positive numbers."""
    if not items:
        return False
    for item in items:
        if item <= 0:
            return False
    return True

if __name__ == "__main__":
    print("Shopping cart ready!")
```

**File: tests/test_shopping_cart.py**
```python
from shopping_cart import calculate_total, apply_bulk_discount, validate_input

def test_calculate_total():
    assert calculate_total([10, 20, 30]) == 64.8  # 60 + 8% tax
    assert calculate_total([100]) == 108.0       # 100 + 8% tax

def test_bulk_discount():
    assert apply_bulk_discount([50, 60]) == 99.0    # 110 * 0.9 = 99
    assert apply_bulk_discount([10, 20]) == 30.0    # No discount under $100

def test_validate_input():
    assert validate_input([10, 20, 30]) == True
    assert validate_input([]) == False
    assert validate_input([10, -5, 20]) == False
    assert validate_input([0, 10]) == False
```

---

### Exercise 20: Testing Mathematical Functions

**File: math_functions.py**
```python
def square_root(x):
    """Calculate square root of x."""
    return x ** 0.5

def power(base, exponent):
    """Calculate base raised to exponent."""
    return base ** exponent

def absolute_value(x):
    """Return absolute value of x."""
    if x < 0:
        return -x
    return x

def round_number(x, decimals=2):
    """Round x to specified decimal places."""
    return round(x, decimals)

if __name__ == "__main__":
    print("Math functions ready!")
```

**File: tests/test_math_functions.py**
```python
from math_functions import square_root, power, absolute_value, round_number

def test_square_root():
    assert square_root(4) == 2
    assert square_root(9) == 3
    assert square_root(0) == 0

def test_power():
    assert power(2, 3) == 8
    assert power(5, 2) == 25
    assert power(10, 0) == 1

def test_absolute_value():
    assert absolute_value(5) == 5
    assert absolute_value(-5) == 5
    assert absolute_value(0) == 0

def test_round_number():
    assert round_number(3.14159, 2) == 3.14
    assert round_number(2.71828, 3) == 2.718
    assert round_number(1.5) == 1.5  # Default 2 decimals
```

---

## Challenge Problems

### Exercise 21: Test-Driven Development

**Step 1: Write tests first (test_prime.py)**
```python
def test_is_prime():
    # Test known primes
    assert is_prime(2) == True
    assert is_prime(3) == True
    assert is_prime(5) == True
    assert is_prime(7) == True
    assert is_prime(11) == True

def test_not_prime():
    # Test known non-primes
    assert is_prime(1) == False
    assert is_prime(4) == False
    assert is_prime(6) == False
    assert is_prime(8) == False
    assert is_prime(9) == False
    assert is_prime(10) == False

def test_edge_cases():
    # Test edge cases
    assert is_prime(0) == False
    assert is_prime(-5) == False
```

**Step 2: Implement the function (prime_checker.py)**
```python
def is_prime(n):
    """Check if a number is prime."""
    if n <= 1:
        return False
    
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

if __name__ == "__main__":
    print("Prime checker ready!")
```

**Step 3: Run tests and add more**
```python
def test_large_primes():
    assert is_prime(97) == True
    assert is_prime(101) == True

def test_large_composites():
    assert is_prime(100) == False
    assert is_prime(99) == False
```

---

### Exercise 22: Testing Complex Logic

**File: zodiac.py**
```python
def get_zodiac_sign(day, month):
    """Determine zodiac sign based on birth date."""
    if (month == 3 and day >= 21) or (month == 4 and day <= 19):
        return "Aries"
    elif (month == 4 and day >= 20) or (month == 5 and day <= 20):
        return "Taurus"
    elif (month == 5 and day >= 21) or (month == 6 and day <= 20):
        return "Gemini"
    elif (month == 6 and day >= 21) or (month == 7 and day <= 22):
        return "Cancer"
    elif (month == 7 and day >= 23) or (month == 8 and day <= 22):
        return "Leo"
    elif (month == 8 and day >= 23) or (month == 9 and day <= 22):
        return "Virgo"
    elif (month == 9 and day >= 23) or (month == 10 and day <= 22):
        return "Libra"
    elif (month == 10 and day >= 23) or (month == 11 and day <= 21):
        return "Scorpio"
    elif (month == 11 and day >= 22) or (month == 12 and day <= 21):
        return "Sagittarius"
    elif (month == 12 and day >= 22) or (month == 1 and day <= 19):
        return "Capricorn"
    elif (month == 1 and day >= 20) or (month == 2 and day <= 18):
        return "Aquarius"
    elif (month == 2 and day >= 19) or (month == 3 and day <= 20):
        return "Pisces"
    else:
        return "Invalid date"

if __name__ == "__main__":
    print("Zodiac calculator ready!")
```

**File: tests/test_zodiac.py**
```python
from zodiac import get_zodiac_sign

def test_zodiac_signs():
    # Test each zodiac sign
    assert get_zodiac_sign(15, 1) == "Capricorn"
    assert get_zodiac_sign(15, 2) == "Aquarius"
    assert get_zodiac_sign(15, 3) == "Pisces"
    assert get_zodiac_sign(15, 4) == "Aries"
    assert get_zodiac_sign(15, 5) == "Taurus"
    assert get_zodiac_sign(15, 6) == "Gemini"
    assert get_zodiac_sign(15, 7) == "Cancer"
    assert get_zodiac_sign(15, 8) == "Leo"
    assert get_zodiac_sign(15, 9) == "Virgo"
    assert get_zodiac_sign(15, 10) == "Libra"
    assert get_zodiac_sign(15, 11) == "Scorpio"
    assert get_zodiac_sign(15, 12) == "Sagittarius"

def test_edge_dates():
    # Test transition dates
    assert get_zodiac_sign(21, 3) == "Aries"    # Aries starts
    assert get_zodiac_sign(20, 3) == "Pisces"   # Pisces ends
    assert get_zodiac_sign(19, 4) == "Aries"    # Aries ends
    assert get_zodiac_sign(20, 4) == "Taurus"   # Taurus starts

def test_invalid_dates():
    assert get_zodiac_sign(32, 1) == "Invalid date"
    assert get_zodiac_sign(15, 13) == "Invalid date"
    assert get_zodiac_sign(0, 5) == "Invalid date"
```

---

### Exercise 23: Performance Testing

**File: fibonacci.py**
```python
def fibonacci_recursive(n):
    """Calculate nth Fibonacci number using recursion."""
    if n <= 1:
        return n
    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)

def fibonacci_iterative(n):
    """Calculate nth Fibonacci number using iteration."""
    if n <= 1:
        return n
    
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

if __name__ == "__main__":
    print("Fibonacci calculator ready!")
```

**File: tests/test_fibonacci.py**
```python
import time
from fibonacci import fibonacci_recursive, fibonacci_iterative

def test_fibonacci_correctness():
    # Test small values for correctness
    assert fibonacci_recursive(0) == 0
    assert fibonacci_recursive(1) == 1
    assert fibonacci_recursive(5) == 5
    assert fibonacci_recursive(10) == 55
    
    assert fibonacci_iterative(0) == 0
    assert fibonacci_iterative(1) == 1
    assert fibonacci_iterative(5) == 5
    assert fibonacci_iterative(10) == 55

def test_performance():
    """Compare performance of recursive vs iterative approaches."""
    n = 30
    
    # Test iterative (should be fast)
    start_time = time.time()
    result_iter = fibonacci_iterative(n)
    iterative_time = time.time() - start_time
    
    # Test recursive (will be slower for larger n)
    start_time = time.time()
    result_recursive = fibonacci_recursive(n)
    recursive_time = time.time() - start_time
    
    # Both should give same result
    assert result_iter == result_recursive
    
    # Iterative should be faster (for n=30)
    assert iterative_time < recursive_time

def test_large_fibonacci():
    """Test that iterative approach works for larger values."""
    # Recursive would be too slow for this
    result = fibonacci_iterative(50)
    assert result > 0
    assert isinstance(result, int)
```

**Explanation:** This demonstrates testing both correctness and performance characteristics of different algorithmic approaches.

---

## Key Testing Principles Demonstrated

1. **Testable Design**: Functions return values instead of just printing
2. **Proper Naming**: Test files start with `test_`, test functions start with `test_`
3. **Organization**: Tests separated by category and behavior
4. **Edge Cases**: Testing boundary conditions and unusual inputs
5. **Comprehensive Coverage**: Multiple test scenarios for each function
6. **Real-world Examples**: Practical applications of testing concepts
7. **Performance Testing**: Verifying both correctness and efficiency
8. **TDD Approach**: Writing tests before implementation

These exercises provide a solid foundation in unit testing with pytest, covering both basic concepts and advanced patterns used in professional Python development.