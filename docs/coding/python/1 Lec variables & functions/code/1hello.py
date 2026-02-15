name = input("What's your name? ")
#print("Hello, "+ name)
print("Hello,", name)



# Comment
"""
multi
line 
comment
"""

#print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)

print("Hello, ", end="")
print(name)

print("Hello,", name, sep="???")

#using quotes "" inside quotes ""
# We using escape character "\"
print('"Hi"')
print("\"hi\"")

#new way to write value of variable
print(f"Hello, {name}")