# str is data type

name = input("What's your name? ")
#print("Hello, "+ name)

# Remove whitespace from str
name = name.strip()

# Capitalize user's name
name = name.capitalize()

# Tilte based capitalization
name = name.title()

# using chain
name = name.strip().title()

#more shorter
name2 = input("Enter your name").strip().title()

print("Hello,", name)


# Split user's name into first and last name

first, last = input("Enter full name: ").split(" ")
print(f"Hello, {first}")