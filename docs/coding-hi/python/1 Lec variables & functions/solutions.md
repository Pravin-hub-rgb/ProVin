# Python Practice Set - Solutions

This document contains complete solutions and explanations for all exercises in the practice set. Each solution uses only the concepts covered in the notes.

## Basic Functions & Variables

### Exercise 1: Simple Greeting

```python
print("Hello, World!")
```

**Explanation:** This is the classic "Hello World" program. The `print()` function displays the text "Hello, World!" on the screen. The text is enclosed in quotes to make it a string.

---

### Exercise 2: Personalized Greeting

```python
name = input("What's your name? ")
print("Hello,", name)
```

**Explanation:** 
- `input()` gets text from the user and stores it in the variable `name`
- `print()` displays "Hello," followed by the user's name
- The comma in print() automatically adds a space between the parts

---

### Exercise 3: User Input Storage

```python
favorite_color = input("What's your favorite color? ")
print("Your favorite color is", favorite_color)
```

**Explanation:**
- The user's input is stored in the variable `favorite_color`
- The print statement displays a message with the stored value
- Variables act as containers that hold values for later use

---

### Exercise 4: Multiple Inputs

```python
first_name = input("What's your first name? ")
last_name = input("What's your last name? ")
print(first_name, last_name)
```

**Explanation:**
- Two separate `input()` calls collect first and last names
- Both variables are passed to `print()` with a comma separator
- The comma automatically adds a space between the names

---

## String Methods

### Exercise 5: Clean Input

```python
name = input("What's your name? ")
clean_name = name.strip().title()
print("Hello,", clean_name)
```

**Explanation:**
- `strip()` removes extra spaces from the beginning and end
- `title()` capitalizes the first letter of each word
- Method chaining allows multiple operations in one line
- The cleaned name is stored in `clean_name` and then printed

---

### Exercise 6: Method Chaining

```python
user_input = input("Enter some text: ")
result = user_input.strip().upper()
print(result)
```

**Explanation:**
- `strip()` removes whitespace
- `upper()` converts all letters to uppercase
- These methods are chained together with dots
- The result is stored and printed

---

### Exercise 7: Name Splitting

```python
full_name = input("Enter your full name: ")
first_name = full_name.split(" ")[0]
print("First name:", first_name)
```

**Explanation:**
- `split(" ")` breaks the string at spaces and returns a list
- `[0]` accesses the first item in the list (index 0)
- This gives us just the first name from the full name

---

### Exercise 8: Text Formatting

```python
title = input("Enter a book title: ")
formatted_title = title.strip().title()
print(f'"{formatted_title}"')
```

**Explanation:**
- `strip()` removes extra spaces
- `title()` capitalizes each word properly
- f-string with quotes around `{formatted_title}` displays the title in quotes
- The outer quotes use single quotes to avoid conflict with the inner double quotes

---

### Exercise 9: Multiple String Operations

```python
email = input("Enter your email: ")
clean_email = email.replace(" ", "").lower()
print("Cleaned email:", clean_email)
```

**Explanation:**
- `replace(" ", "")` removes all spaces (replaces them with empty string)
- `lower()` converts all letters to lowercase
- The cleaned email is stored and displayed

---

## Number Operations

### Exercise 10: Basic Calculator

```python
x = int(input("Enter first number: "))
y = int(input("Enter second number: "))
sum_result = x + y
print("Sum:", sum_result)
```

**Explanation:**
- `int()` converts the string input to an integer
- The `+` operator adds the two numbers
- Result is stored in `sum_result` and printed

---

### Exercise 11: Area Calculator

```python
length = float(input("Enter length: "))
width = float(input("Enter width: "))
area = length * width
print("Area:", area)
```

**Explanation:**
- `float()` converts input to decimal numbers
- The `*` operator multiplies length by width
- Area formula: length × width

---

### Exercise 12: Temperature Converter

```python
celsius = float(input("Enter temperature in Celsius: "))
fahrenheit = celsius * 9/5 + 32
print(f"{celsius}°C is {fahrenheit}°F")
```

**Explanation:**
- Uses the conversion formula: F = C × 9/5 + 32
- f-string displays both temperatures with degree symbols
- Mathematical operations follow standard order of operations

---

### Exercise 13: Rounding Practice

```python
number = float(input("Enter a decimal number: "))
rounded = round(number, 2)
print(f"Rounded to 2 decimal places: {rounded}")
```

**Explanation:**
- `round(number, 2)` rounds to 2 decimal places
- The second parameter specifies how many decimal places to keep
- Result is displayed using f-string formatting

---

### Exercise 14: Number Formatting

```python
large_number = int(input("Enter a large number: "))
formatted = f"{large_number:,}"
print("Formatted number:", formatted)
```

**Explanation:**
- f-string with `:,` adds comma separators for thousands
- Example: 1000000 becomes "1,000,000"
- Makes large numbers easier to read

---

## Custom Functions

### Exercise 15: Simple Function

```python
def greet():
    print("Welcome to Python!")

greet()
```

**Explanation:**
- `def` keyword defines a new function called `greet`
- The function contains one line that prints a welcome message
- `greet()` calls the function to execute it

---

### Exercise 16: Function with Parameter

```python
def greet_user(name):
    print(f"Hello, {name}!")

greet_user("Alice")
```

**Explanation:**
- Function `greet_user` takes one parameter called `name`
- The parameter is used in an f-string to personalize the greeting
- When called with "Alice", it prints "Hello, Alice!"

---

### Exercise 17: Function with Default Value

```python
def say_hello(to="World"):
    print(f"Hello, {to}!")

say_hello()           # Uses default: "Hello, World!"
say_hello("Python")   # Uses argument: "Hello, Python!"
```

**Explanation:**
- Default parameter `to="World"` provides a fallback value
- If no argument is passed, it uses "World"
- If an argument is provided, it overrides the default

---

### Exercise 18: Function that Returns a Value

```python
def square(x):
    return x * x

result = square(5)
print(f"Square of 5 is {result}")
```

**Explanation:**
- `return` statement sends a value back to where the function was called
- `square(5)` returns 25 (5 × 5)
- The returned value is stored in `result` and printed

---

### Exercise 19: Multiple Return Values

```python
def get_name_parts(full_name):
    parts = full_name.split(" ")
    return parts[0], parts[1]

first, last = get_name_parts("John Smith")
print(f"First: {first}, Last: {last}")
```

**Explanation:**
- Function splits the full name and returns two values
- Multiple return values are separated by commas
- When calling, we unpack them into two variables: `first, last`

---

### Exercise 20: Calculator Function

```python
def add_numbers(a, b):
    return a + b

result = add_numbers(10, 15)
print(f"10 + 15 = {result}")
```

**Explanation:**
- Function takes two parameters and returns their sum
- Called with arguments 10 and 15
- Returns 25, which is stored and displayed

---

## Integration Problems

### Exercise 21: Personal Information Processor

```python
def format_name(name):
    return name.strip().title()

def main():
    full_name = input("Enter your full name: ")
    age = input("Enter your age: ")
    
    formatted_name = format_name(full_name)
    print(f"Hello {formatted_name}, you are {age} years old!")

main()
```

**Explanation:**
- `format_name()` function cleans and formats the name
- `main()` function coordinates the program flow
- Uses f-string to combine all information in one message
- Demonstrates function calls and variable passing

---

### Exercise 22: Shopping Calculator

```python
def calculate_total(price, quantity):
    return price * quantity

def main():
    price = float(input("Enter item price: "))
    quantity = int(input("Enter quantity: "))
    
    total = calculate_total(price, quantity)
    print(f"Total cost: ${total:.2f}")

main()
```

**Explanation:**
- `calculate_total()` multiplies price by quantity
- `main()` gets user input and calls the calculation function
- `:.2f` in f-string formats the number with 2 decimal places
- Currency symbol ($) is added for realistic formatting

---

### Exercise 23: Math Helper

```python
def square(x):
    return x * x

def cube(x):
    return x * x * x

def square_root(x):
    return x ** 0.5

def main():
    number = float(input("Enter a number: "))
    
    sq = square(number)
    cb = cube(number)
    sr = square_root(number)
    
    print(f"Number: {number}")
    print(f"Square: {sq}")
    print(f"Cube: {cb}")
    print(f"Square root: {sr:.2f}")

main()
```

**Explanation:**
- Three separate functions calculate different mathematical operations
- `**` operator raises to a power (x ** 0.5 is square root)
- `main()` calls all functions and displays results
- Results are formatted for clarity

---

### Exercise 24: Text Analyzer

```python
def count_words(text):
    return len(text.split())

def count_characters(text):
    return len(text)

def main():
    sentence = input("Enter a sentence: ")
    
    word_count = count_words(sentence)
    char_count = count_characters(sentence)
    
    print(f"Word count: {word_count}")
    print(f"Character count: {char_count}")

main()
```

**Explanation:**
- `count_words()` splits text and counts the parts
- `count_characters()` uses `len()` to count all characters
- `main()` coordinates input, processing, and output
- Demonstrates using multiple functions in one program

---

### Exercise 25: Complete Profile

```python
def format_name(name):
    return name.strip().title()

def calculate_birth_year(age):
    current_year = 2024
    return current_year - int(age)

def main():
    name = input("Enter your name: ")
    age = input("Enter your age: ")
    hobby = input("Enter your favorite hobby: ")
    
    formatted_name = format_name(name)
    birth_year = calculate_birth_year(age)
    
    print("\n--- USER PROFILE ---")
    print(f"Name: {formatted_name}")
    print(f"Age: {age}")
    print(f"Birth Year: {birth_year}")
    print(f"Favorite Hobby: {hobby}")

main()
```

**Explanation:**
- Multiple functions handle different aspects of profile creation
- `format_name()` cleans the name input
- `calculate_birth_year()` computes birth year from age
- `main()` collects all information and displays a formatted profile
- `\n` in print creates a blank line for better formatting

---

## Challenge Problems

### Exercise 26: Unit Converter Suite

```python
def celsius_to_fahrenheit(c):
    return c * 9/5 + 32

def meters_to_feet(m):
    return m * 3.28084

def kilograms_to_pounds(kg):
    return kg * 2.20462

def main():
    print("Unit Converter Suite")
    print("1. Celsius to Fahrenheit")
    print("2. Meters to Feet")
    print("3. Kilograms to Pounds")
    
    # Demonstrate all conversions
    temp_c = 25.0
    length_m = 10.0
    weight_kg = 50.0
    
    print(f"\n{temp_c}°C = {celsius_to_fahrenheit(temp_c):.1f}°F")
    print(f"{length_m}m = {meters_to_feet(length_m):.2f}ft")
    print(f"{weight_kg}kg = {kilograms_to_pounds(weight_kg):.2f}lb")

main()
```

**Explanation:**
- Three conversion functions handle different unit types
- Each uses the appropriate mathematical formula
- `main()` demonstrates all conversions with sample values
- Results are formatted with appropriate decimal places

---

### Exercise 27: Simple Bank Calculator

```python
def calculate_interest(deposit, rate):
    return deposit * (1 + rate/100)

def main():
    deposit = float(input("Enter initial deposit amount: "))
    interest_rate = float(input("Enter annual interest rate (%): "))
    
    amount_after_year = calculate_interest(deposit, interest_rate)
    
    print(f"Initial deposit: ${deposit:.2f}")
    print(f"Interest rate: {interest_rate}%")
    print(f"Amount after 1 year: ${amount_after_year:.2f}")

main()
```

**Explanation:**
- `calculate_interest()` applies the compound interest formula
- Formula: amount = deposit × (1 + rate/100)
- `main()` gets user input and displays formatted results
- All monetary values are formatted with 2 decimal places

---

### Exercise 28: Recipe Calculator

```python
def flour_per_cookie(total_flour, total_cookies):
    return total_flour / total_cookies

def total_flour_needed(flour_per_cookie, desired_cookies):
    return flour_per_cookie * desired_cookies

def main():
    original_cookies = int(input("How many cookies does the original recipe make? "))
    original_flour = float(input("How much flour (in cups) does the original recipe use? "))
    
    flour_per_cookie_amount = flour_per_cookie(original_flour, original_cookies)
    
    desired_cookies = int(input("How many cookies do you want to make? "))
    
    needed_flour = total_flour_needed(flour_per_cookie_amount, desired_cookies)
    
    print(f"\nOriginal recipe: {original_cookies} cookies with {original_flour} cups of flour")
    print(f"Flour per cookie: {flour_per_cookie_amount:.2f} cups")
    print(f"For {desired_cookies} cookies, you need {needed_flour:.2f} cups of flour")

main()
```

**Explanation:**
- `flour_per_cookie()` calculates how much flour each cookie needs
- `total_flour_needed()` scales up the recipe based on desired quantity
- `main()` coordinates the entire calculation process
- Demonstrates real-world application of mathematical functions
- Results help with practical cooking scenarios

---

## Key Concepts Practiced

Throughout these exercises, you've practiced:

1. **Variables and Assignment** - Storing and using data
2. **Input/Output** - Getting user input and displaying results
3. **String Methods** - Manipulating text with strip(), title(), split(), etc.
4. **Number Operations** - Basic math with integers and floats
5. **Function Creation** - Using `def` to create custom functions
6. **Function Parameters** - Passing data to functions
7. **Return Values** - Getting results back from functions
8. **F-strings** - Modern string formatting
9. **Method Chaining** - Combining multiple operations
10. **Main Function Pattern** - Organizing code structure

All exercises use only the concepts covered in the original notes, providing a solid foundation for Python programming without overwhelming beginners with advanced features.