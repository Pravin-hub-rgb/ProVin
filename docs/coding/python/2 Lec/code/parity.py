"""
Docstring for parity
x = int(input("What's x? : "))
if x % 2 == 0:
    print("Even")
else:
    print("Odd")
"""

def main():
    x = int(input("What's x? : "))
    if is_even(x):
        print("Even")
    else:
        print("Odd")
d
"""
def is_even(x):
    if x % 2 == 0:
        return True
    return False
"""
def is_even(x):
    # return True if x % 2 == 0 else False
    return x % 2 == 0

main()