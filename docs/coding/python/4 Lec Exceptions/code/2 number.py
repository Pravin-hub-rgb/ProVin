# x = int(input("What's x? "))

# try:
#     x = int(input("What's x ? "))
# except ValueError:
#     print("X is not an integer")
# else:
#     print(f"x is {x}")

# while True:
#     try:
#         x = int(input("What's x ? "))
#     except ValueError:
#         print("X is not an integer")
#     else:
#         break

# print(f"x is {x}")

def main():
    x = get_int()
    print(f"x is {x}")

# def get_int():
#     while True:
#         try:
#             x = int(input("What's x ? "))
#         except ValueError:
#             print("x is not Integer")
#         else:
#             return x

# def get_int():
#     while True:
#         try:
#             return int(input("What's x ? "))
#         except ValueError:
#             print("x is not Integer")


def get_int():
    while True:
        try:
            return int(input("What's x ? "))
        except ValueError:
            pass
main()