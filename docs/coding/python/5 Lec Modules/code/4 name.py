import sys

# print("Hello, my name is", sys.argv[1])

# try:
#     print("Hello, my name is", sys.argv[1])
# except IndexError:
#     print("Too Few Arguments")

# if len(sys.argv) < 2:
#     print("Too few arguments")
# elif len(sys.argv) > 2:
#     print("Too many arguments")
# else:
#     print("Hello, my name is", sys.argv[1])

# if len(sys.argv) < 2:
#     sys.exit("Too few argumetns")
# elif len(sys.argv) > 2:
#     sys.exit("Too many argumetns")

# print("Hello, my name is", sys.argv[1])

#slice

if len(sys.argv) < 2:
    sys.exit("Too few argumetns")

# for arg in sys.argv[1:]:
for arg in sys.argv[1:-1]:
    print("Hello, my name is", arg)