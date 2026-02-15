# float = number with decimal .. properly called floating pofloat value

x = float(input("What's x? "))
y = float(input("What's y? "))
print(x + y)

# rounding result 
#round(number[, ndigits])

z = round(x + y)
print(z)

# Formatting number
print(f"{z:,}")

b = round(x / z, 2)
b = (f"{z:.2f}") #Different way to solve same problem