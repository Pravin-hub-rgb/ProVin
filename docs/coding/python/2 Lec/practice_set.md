# Python Practice Set - Conditionals

**Instructions:** Complete each exercise by writing Python code that uses only the concepts covered in the 2nd lecture notes. Do not use loops, advanced data structures, or any features not mentioned in the notes.

## Basic Conditionals

### Exercise 1: Simple Comparison
Write a program that asks the user for two numbers and prints whether the first number is greater than, less than, or equal to the second number.

### Exercise 2: Age Check
Write a program that asks for a person's age and prints "You are an adult" if they are 18 or older, otherwise prints "You are a minor".

### Exercise 3: Positive or Negative
Write a program that asks for a number and prints "Positive" if it's greater than 0, "Negative" if it's less than 0, and "Zero" if it equals 0.

### Exercise 4: Pass or Fail
Write a program that asks for a test score (0-100) and prints "Pass" if the score is 60 or higher, otherwise prints "Fail".

## Logical Operators

### Exercise 5: Voting Eligibility
Write a program that asks for a person's age and citizenship status. A person can vote if they are 18 or older AND a citizen. Print "Eligible to vote" or "Not eligible to vote".

### Exercise 6: Discount Eligibility
Write a program that asks for a customer's age and membership status. A customer gets a discount if they are under 12 OR over 65 OR are a member. Print "Discount applied" or "No discount".

### Exercise 7: Password Strength
Write a program that asks for a password and checks if it's strong. A password is strong if it has at least 8 characters AND contains both letters and numbers. Print "Strong password" or "Weak password".

### Exercise 8: Weather Decision
Write a program that asks if it's raining and if you have an umbrella. Print "Stay inside" if it's raining AND you don't have an umbrella, otherwise print "You can go outside".

## Even/Odd and Modulo

### Exercise 9: Even or Odd
Write a program that asks for a number and prints "Even" if it's even, "Odd" if it's odd.

### Exercise 10: Divisibility Check
Write a program that asks for a number and checks if it's divisible by both 2 and 3. Print "Divisible by 6" or "Not divisible by 6".

### Exercise 11: Grade Calculator
Write a program that asks for a score (0-100) and prints the letter grade:
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: below 60

### Exercise 12: Leap Year Check
Write a program that asks for a year and checks if it's a leap year. A year is a leap year if it's divisible by 4, but not by 100, unless it's also divisible by 400.

## Boolean Functions

### Exercise 13: Boolean Function - Even Check
Create a function called `is_even(number)` that returns `True` if the number is even, `False` otherwise. Use it to check if 15 is even.

### Exercise 14: Boolean Function - Positive Check
Create a function called `is_positive(number)` that returns `True` if the number is positive, `False` otherwise. Use it to check if -5 is positive.

### Exercise 15: Boolean Function - Grade Check
Create a function called `is_passing(score)` that returns `True` if the score is 60 or higher, `False` otherwise. Use it to check if 75 is a passing score.

### Exercise 16: Boolean Function - Vowel Check
Create a function called `is_vowel(letter)` that returns `True` if the letter is a vowel (a, e, i, o, u), `False` otherwise. Use it to check if 'b' is a vowel.

## Match Statements

### Exercise 17: Day of the Week
Write a program that asks for a number (1-7) representing a day of the week and prints the day name using a match statement (1=Monday, 7=Sunday).

### Exercise 18: Traffic Light
Write a program that asks for a traffic light color (red, yellow, green) and prints what action to take using a match statement.

### Exercise 19: Hogwarts Houses
Write a program that asks for a person's name and assigns them to a Hogwarts house using a match statement:
- Harry, Hermione, Ron → Gryffindor
- Draco → Slytherin
- Luna → Ravenclaw
- Cedric → Hufflepuff
- Anyone else → "Unknown house"

### Exercise 20: Grade Match
Write a program that asks for a letter grade (A, B, C, D, F) and prints the score range using a match statement.

## Integration Problems

### Exercise 21: Complete Age Classifier
Write a program that asks for a person's age and classifies them as:
- Child (0-12)
- Teen (13-19)
- Adult (20-64)
- Senior (65+)

### Exercise 22: Restaurant Menu
Write a program that asks for a meal choice (breakfast, lunch, dinner) and time of day. Print the available options based on the meal and time using conditionals.

### Exercise 23: Fitness Calculator
Write a program that asks for a person's age and weight. Classify their fitness level as:
- Underweight: BMI < 18.5
- Normal: 18.5 ≤ BMI < 24.9
- Overweight: 25 ≤ BMI < 29.9
- Obese: BMI ≥ 30

### Exercise 24: Movie Rating System
Write a program that asks for a movie rating (1-5 stars) and a user's age. Recommend if they should watch based on age-appropriateness and rating quality.

## Challenge Problems

### Exercise 25: Complex Eligibility Checker
Write a program that determines eligibility for a special program based on:
- Must be 18 or older
- Must have a GPA of 3.0 or higher
- Must not have any disciplinary violations
- OR must be under 18 with parental consent

### Exercise 26: Advanced Password Validator
Write a program that validates a password with these rules:
- At least 8 characters long
- Contains at least one uppercase letter
- Contains at least one lowercase letter
- Contains at least one number
- Does not contain spaces

### Exercise 27: Loan Approval System
Write a program that determines loan approval based on:
- Credit score ≥ 700 AND income ≥ $50,000
- OR credit score ≥ 650 AND income ≥ $75,000 AND down payment ≥ 20%
- Must not have more than 2 late payments in the last year

### Exercise 28: Game Character Creator
Write a program that creates a game character based on user choices:
- Race: Human, Elf, Dwarf, Orc
- Class: Warrior, Mage, Archer, Thief
- Assign stats and abilities based on combinations using match statements

**Remember:** Only use concepts from the 2nd lecture notes - no loops, no advanced features!