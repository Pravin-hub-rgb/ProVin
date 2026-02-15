"""
print("Meow")
print("Meow")
print("Meow")

# Making it better

i = 3
while i != 0:
    print("Meow")
    i = i - 1

i = 0
while i < 3:
    print("Meow")
    # i = i + 1
    i+=1

for i in [0, 1, 2]: #bad for extreme case like millions
    print("Meow")

for i in range(3):
    print("Meow")

for _ in range(3):
    print("Meow")
"""
# intrigue
print("Meow\n" * 3, end="")