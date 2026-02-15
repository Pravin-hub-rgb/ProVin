# Python Practice Set - Solutions

This document contains complete solutions and explanations for all exercises in the conditionals practice set. Each solution uses only the concepts covered in the 2nd lecture notes.

## Basic Conditionals

### Exercise 1: Simple Comparison

```python
x = int(input("Enter first number: "))
y = int(input("Enter second number: "))

if x > y:
    print("First number is greater than second number")
elif x < y:
    print("First number is less than second number")
else:
    print("First number is equal to second number")
```

**Explanation:**
- Uses `if/elif/else` structure to check all three possible relationships
- `>` checks if first is greater than second
- `<` checks if first is less than second
- `else` handles the case where they are equal
- This is more efficient than three separate `if` statements

---

### Exercise 2: Age Check

```python
age = int(input("Enter your age: "))

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
```

**Explanation:**
- Uses `>=` (greater than or equal to) to check for adulthood
- Simple `if/else` structure covers both cases
- No need for `elif` since there are only two possible outcomes

---

### Exercise 3: Positive or Negative

```python
number = float(input("Enter a number: "))

if number > 0:
    print("Positive")
elif number < 0:
    print("Negative")
else:
    print("Zero")
```

**Explanation:**
- Uses `if/elif/else` to handle three distinct cases
- `>` checks for positive numbers
- `<` checks for negative numbers
- `else` catches the case where number equals 0
- Order matters: check specific conditions first, use `else` for catch-all

---

### Exercise 4: Pass or Fail

```python
score = int(input("Enter test score (0-100): "))

if score >= 60:
    print("Pass")
else:
    print("Fail")
```

**Explanation:**
- Uses `>=` to check if score meets passing threshold
- Simple binary decision using `if/else`
- Assumes input is valid (0-100 range)

---

## Logical Operators

### Exercise 5: Voting Eligibility

```python
age = int(input("Enter your age: "))
citizen = input("Are you a citizen? (yes/no): ")

if age >= 18 and citizen.lower() == "yes":
    print("Eligible to vote")
else:
    print("Not eligible to vote")
```

**Explanation:**
- Uses `and` operator to require BOTH conditions to be true
- `age >= 18` checks minimum age requirement
- `citizen.lower() == "yes"` checks citizenship status (case-insensitive)
- `lower()` method handles user input variations
- Both conditions must be true for voting eligibility

---

### Exercise 6: Discount Eligibility

```python
age = int(input("Enter your age: "))
member = input("Are you a member? (yes/no): ")

if age < 12 or age > 65 or member.lower() == "yes":
    print("Discount applied")
else:
    print("No discount")
```

**Explanation:**
- Uses `or` operator to check if ANY condition is true
- Three conditions: under 12, over 65, or member
- If any one is true, discount is applied
- More efficient than checking each condition separately with `if/elif`

---

### Exercise 7: Password Strength

```python
password = input("Enter a password: ")

if len(password) >= 8 and password.isalnum():
    print("Strong password")
else:
    print("Weak password")
```

**Explanation:**
- Uses `and` to require BOTH conditions
- `len(password) >= 8` checks minimum length
- `password.isalnum()` checks if password contains only letters and numbers
- `isalnum()` returns `True` if string has only alphanumeric characters
- Both conditions must be met for strong password

---

### Exercise 8: Weather Decision

```python
raining = input("Is it raining? (yes/no): ")
umbrella = input("Do you have an umbrella? (yes/no): ")

if raining.lower() == "yes" and umbrella.lower() == "no":
    print("Stay inside")
else:
    print("You can go outside")
```

**Explanation:**
- Uses `and` to check if BOTH conditions are true
- Only stays inside if it's raining AND no umbrella
- In all other cases (not raining, or has umbrella), can go outside
- Demonstrates logical AND operation for compound conditions

---

## Even/Odd and Modulo

### Exercise 9: Even or Odd

```python
number = int(input("Enter a number: "))

if number % 2 == 0:
    print("Even")
else:
    print("Odd")
```

**Explanation:**
- Uses modulo operator `%` to find remainder when divided by 2
- Even numbers have remainder 0 when divided by 2
- Odd numbers have remainder 1 when divided by 2
- `==` checks for equality with 0
- Simple binary decision using `if/else`

---

### Exercise 10: Divisibility Check

```python
number = int(input("Enter a number: "))

if number % 2 == 0 and number % 3 == 0:
    print("Divisible by 6")
else:
    print("Not divisible by 6")
```

**Explanation:**
- Uses `and` to check divisibility by both 2 and 3
- `number % 2 == 0` checks if divisible by 2 (remainder is 0)
- `number % 3 == 0` checks if divisible by 3 (remainder is 0)
- A number divisible by both 2 and 3 is divisible by 6
- Both conditions must be true for divisibility by 6

---

### Exercise 11: Grade Calculator

```python
score = int(input("Enter score (0-100): "))

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
else:
    print("Grade: F")
```

**Explanation:**
- Uses chained `if/elif/else` structure
- Checks highest grades first (90+ for A, 80+ for B, etc.)
- Once a condition is met, execution stops
- No need for upper bounds since `elif` only executes if previous conditions were false
- Efficient structure that minimizes comparisons

---

### Exercise 12: Leap Year Check

```python
year = int(input("Enter a year: "))

if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print("Leap year")
else:
    print("Not a leap year")
```

**Explanation:**
- Complex condition using both `and` and `or` operators
- First part: divisible by 4 AND not divisible by 100
- Second part: divisible by 400 (overrides the 100 rule)
- Parentheses group the conditions properly
- Leap year rules: every 4 years, except centuries, unless divisible by 400

---

## Boolean Functions

### Exercise 13: Boolean Function - Even Check

```python
def is_even(number):
    return number % 2 == 0

# Test the function
result = is_even(15)
print(f"Is 15 even? {result}")
```

**Explanation:**
- Function `is_even()` returns a Boolean value directly
- `number % 2 == 0` is already a Boolean expression
- No need for `if/else` - just return the expression result
- More concise than explicit return statements
- Function call `is_even(15)` returns `False`

---

### Exercise 14: Boolean Function - Positive Check

```python
def is_positive(number):
    return number > 0

# Test the function
result = is_positive(-5)
print(f"Is -5 positive? {result}")
```

**Explanation:**
- Function returns the result of comparison `number > 0`
- Direct return of Boolean expression
- Clean and readable function design
- `is_positive(-5)` returns `False` since -5 is not greater than 0

---

### Exercise 15: Boolean Function - Grade Check

```python
def is_passing(score):
    return score >= 60

# Test the function
result = is_passing(75)
print(f"Is 75 a passing score? {result}")
```

**Explanation:**
- Function checks if score meets passing threshold
- Returns `True` for 60 and above, `False` for below 60
- Simple comparison that returns Boolean directly
- `is_passing(75)` returns `True`

---

### Exercise 16: Boolean Function - Vowel Check

```python
def is_vowel(letter):
    return letter.lower() in ['a', 'e', 'i', 'o', 'u']

# Test the function
result = is_vowel('b')
print(f"Is 'b' a vowel? {result}")
```

**Explanation:**
- Uses `in` operator to check if letter is in vowel list
- `letter.lower()` handles case insensitivity
- Returns `True` if letter is found in the list, `False` otherwise
- `is_vowel('b')` returns `False` since 'b' is not a vowel

---

## Match Statements

### Exercise 17: Day of the Week

```python
day_number = int(input("Enter day number (1-7): "))

match day_number:
    case 1:
        print("Monday")
    case 2:
        print("Tuesday")
    case 3:
        print("Wednesday")
    case 4:
        print("Thursday")
    case 5:
        print("Friday")
    case 6:
        print("Saturday")
    case 7:
        print("Sunday")
    case _:
        print("Invalid day number")
```

**Explanation:**
- `match` statement checks the value of `day_number`
- Each `case` handles a specific day number
- `case _:` is the default case for invalid inputs
- More readable than multiple `if/elif` statements for this use case
- Requires Python 3.10+

---

### Exercise 18: Traffic Light

```python
color = input("Enter traffic light color (red/yellow/green): ").lower()

match color:
    case "red":
        print("Stop")
    case "yellow":
        print("Slow down")
    case "green":
        print("Go")
    case _:
        print("Invalid color")
```

**Explanation:**
- `match` statement checks the color input
- `case` statements handle each valid color
- `case _:` catches any invalid input
- `lower()` method handles case variations
- Cleaner than multiple `if/elif` statements

---

### Exercise 19: Hogwarts Houses

```python
name = input("Enter a name: ")

match name:
    case "Harry" | "Hermione" | "Ron":
        print("Gryffindor")
    case "Draco":
        print("Slytherin")
    case "Luna":
        print("Ravenclaw")
    case "Cedric":
        print("Hufflepuff")
    case _:
        print("Unknown house")
```

**Explanation:**
- Uses `|` (pipe) operator to combine multiple values in one case
- `case "Harry" | "Hermione" | "Ron":` matches any of the three names
- Each case assigns the appropriate house
- `case _:` handles any name not explicitly listed
- Demonstrates combining multiple values in match cases

---

### Exercise 20: Grade Match

```python
grade = input("Enter letter grade (A/B/C/D/F): ").upper()

match grade:
    case "A":
        print("Score range: 90-100")
    case "B":
        print("Score range: 80-89")
    case "C":
        print("Score range: 70-79")
    case "D":
        print("Score range: 60-69")
    case "F":
        print("Score range: 0-59")
    case _:
        print("Invalid grade")
```

**Explanation:**
- `match` statement checks the letter grade
- `upper()` method handles case variations
- Each case prints the corresponding score range
- `case _:` handles invalid grade inputs
- More organized than multiple `if/elif` statements

---

## Integration Problems

### Exercise 21: Complete Age Classifier

```python
age = int(input("Enter your age: "))

if age >= 0 and age <= 12:
    print("Child")
elif age >= 13 and age <= 19:
    print("Teen")
elif age >= 20 and age <= 64:
    print("Adult")
elif age >= 65:
    print("Senior")
else:
    print("Invalid age")
```

**Explanation:**
- Uses `if/elif/else` structure to classify age ranges
- Each condition checks both lower and upper bounds
- Ranges are mutually exclusive (only one will be true)
- `else` handles negative or invalid ages
- Covers all possible age categories

---

### Exercise 22: Restaurant Menu

```python
meal = input("Enter meal (breakfast/lunch/dinner): ").lower()
time = int(input("Enter time (0-23): "))

if meal == "breakfast" and time >= 6 and time <= 11:
    print("Available: Pancakes, Eggs, Toast")
elif meal == "lunch" and time >= 12 and time <= 17:
    print("Available: Sandwiches, Salads, Soup")
elif meal == "dinner" and time >= 18 and time <= 22:
    print("Available: Steaks, Pasta, Pizza")
else:
    print("Restaurant closed or meal not available")
```

**Explanation:**
- Uses `and` to check both meal type and time range
- Each meal has specific time availability
- `else` handles cases where restaurant is closed or meal not served
- Demonstrates combining multiple conditions with logical operators
- Practical real-world application of conditionals

---

### Exercise 23: Fitness Calculator

```python
age = int(input("Enter your age: "))
weight = float(input("Enter your weight in kg: "))
height = float(input("Enter your height in meters: "))

bmi = weight / (height ** 2)
print(f"Your BMI: {bmi:.1f}")

if bmi < 18.5:
    print("Classification: Underweight")
elif bmi < 24.9:
    print("Classification: Normal weight")
elif bmi < 29.9:
    print("Classification: Overweight")
else:
    print("Classification: Obese")
```

**Explanation:**
- Calculates BMI using formula: weight / (height²)
- Uses chained `if/elif/else` for classification
- Each condition checks the lower bound of the range
- Since `elif` only executes if previous was false, upper bounds are implicit
- Provides health classification based on BMI ranges
- Demonstrates mathematical calculations with conditionals

---

### Exercise 24: Movie Rating System

```python
rating = int(input("Enter movie rating (1-5 stars): "))
age = int(input("Enter your age: "))

if rating >= 4 and age >= 13:
    print("Highly recommended for mature audiences")
elif rating >= 3 and age >= 18:
    print("Recommended for adults")
elif rating >= 2:
    print("Suitable for general audiences")
else:
    print("Not recommended")
```

**Explanation:**
- Uses `and` to combine rating quality and age appropriateness
- Higher ratings require higher age for recommendation
- Lower ratings are more broadly acceptable
- `else` handles very low ratings
- Demonstrates combining multiple criteria for decision making

---

## Challenge Problems

### Exercise 25: Complex Eligibility Checker

```python
age = int(input("Enter your age: "))
gpa = float(input("Enter your GPA (0.0-4.0): "))
violations = int(input("Number of disciplinary violations: "))
parental_consent = input("Do you have parental consent? (yes/no): ").lower()

if (age >= 18 and gpa >= 3.0 and violations == 0) or (age < 18 and parental_consent == "yes"):
    print("Eligible for the program")
else:
    print("Not eligible for the program")
```

**Explanation:**
- Complex condition using both `and` and `or` operators
- First part: adult requirements (age, GPA, no violations)
- Second part: minor requirements (parental consent)
- Parentheses group the conditions properly
- Either set of requirements makes someone eligible
- Demonstrates complex logical combinations

---

### Exercise 26: Advanced Password Validator

```python
password = input("Enter a password: ")

length_ok = len(password) >= 8
has_upper = any(c.isupper() for c in password)
has_lower = any(c.islower() for c in password)
has_digit = any(c.isdigit() for c in password)
no_spaces = ' ' not in password

if length_ok and has_upper and has_lower and has_digit and no_spaces:
    print("Password is valid")
else:
    print("Password is invalid")
    if not length_ok:
        print("- Must be at least 8 characters long")
    if not has_upper:
        print("- Must contain at least one uppercase letter")
    if not has_lower:
        print("- Must contain at least one lowercase letter")
    if not has_digit:
        print("- Must contain at least one number")
    if not no_spaces:
        print("- Cannot contain spaces")
```

**Explanation:**
- Checks multiple password requirements using Boolean variables
- `any()` function checks if any character meets criteria
- `isupper()`, `islower()`, `isdigit()` check character types
- `' ' not in password` checks for absence of spaces
- All conditions must be true for valid password
- Provides specific feedback for each failed requirement
- Demonstrates comprehensive validation logic

---

### Exercise 27: Loan Approval System

```python
credit_score = int(input("Enter credit score: "))
income = float(input("Enter annual income: "))
down_payment = float(input("Enter down payment percentage: "))
late_payments = int(input("Number of late payments in last year: "))

condition1 = credit_score >= 700 and income >= 50000
condition2 = credit_score >= 650 and income >= 75000 and down_payment >= 20
too_many_late = late_payments > 2

if (condition1 or condition2) and not too_many_late:
    print("Loan approved")
else:
    print("Loan denied")
    if too_many_late:
        print("- Too many late payments")
    elif not (condition1 or condition2):
        print("- Does not meet credit/income requirements")
```

**Explanation:**
- Complex approval logic with multiple conditions
- `condition1` and `condition2` represent different approval paths
- `too_many_late` checks for disqualifying factor
- Uses `or` for alternative approval criteria
- Uses `and` to ensure no disqualifying factors
- `not` operator negates the late payment condition
- Provides specific denial reasons
- Demonstrates real-world decision logic

---

### Exercise 28: Game Character Creator

```python
race = input("Choose race (Human/Elf/Dwarf/Orc): ").lower()
class_type = input("Choose class (Warrior/Mage/Archer/Thief): ").lower()

print(f"\nCreating character: {race.title()} {class_type.title()}")

match race:
    case "human":
        base_strength = 10
        base_intelligence = 10
        base_agility = 10
        bonus = "Adaptable: +2 to any stat"
    case "elf":
        base_strength = 8
        base_intelligence = 12
        base_agility = 14
        bonus = "Keen senses: +2 agility"
    case "dwarf":
        base_strength = 14
        base_intelligence = 8
        base_agility = 8
        bonus = "Sturdy: +2 strength"
    case "orc":
        base_strength = 16
        base_intelligence = 6
        base_agility = 8
        bonus = "Brutal: +3 strength, -2 intelligence"
    case _:
        print("Invalid race selected")
        exit()

match class_type:
    case "warrior":
        strength_mod = 5
        intelligence_mod = -2
        agility_mod = 2
        ability = "Power Strike"
    case "mage":
        strength_mod = -2
        intelligence_mod = 6
        agility_mod = 1
        ability = "Fireball"
    case "archer":
        strength_mod = 2
        intelligence_mod = 1
        agility_mod = 5
        ability = "Precise Shot"
    case "thief":
        strength_mod = 1
        intelligence_mod = 2
        agility_mod = 6
        ability = "Backstab"
    case _:
        print("Invalid class selected")
        exit()

# Calculate final stats
final_strength = base_strength + strength_mod
final_intelligence = base_intelligence + intelligence_mod
final_agility = base_agility + agility_mod

print(f"\nCharacter Stats:")
print(f"Strength: {final_strength}")
print(f"Intelligence: {final_intelligence}")
print(f"Agility: {final_agility}")
print(f"Special Ability: {ability}")
print(f"Race Bonus: {bonus}")
```

**Explanation:**
- Uses two `match` statements for race and class selection
- Each race has base stats and special bonuses
- Each class has stat modifications and special abilities
- Final stats calculated by combining base and modifiers
- `title()` method capitalizes race and class names for display
- Comprehensive character creation system
- Demonstrates advanced use of match statements with multiple variables

---

## Key Concepts Practiced

Throughout these exercises, you've practiced:

1. **Comparison Operators** - `>`, `<`, `>=`, `<=`, `==`, `!=`
2. **Boolean Logic** - True/False expressions and evaluations
3. **if/elif/else Statements** - Decision making with multiple conditions
4. **Logical Operators** - `and`, `or`, `not` for combining conditions
5. **Modulo Operator** - `%` for finding remainders and checking divisibility
6. **Boolean Functions** - Functions that return True/False values
7. **match/case Statements** - Alternative to if/elif for value matching
8. **String Methods** - `lower()`, `upper()`, `len()`, character checking
9. **Mathematical Operations** - Calculations within conditional logic
10. **Real-world Applications** - Practical problems using conditional logic

All exercises use only the concepts covered in the 2nd lecture notes, providing comprehensive practice with Python conditionals without overwhelming beginners with advanced features.