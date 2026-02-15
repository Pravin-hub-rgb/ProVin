"""
def hello(to = "World"):
    print(f"hello, {to}")

name = input("What's your name? ")
hello(name)
"""
# def is short for define . if you want to define a function you can do 


# you cannot define function below and use it up.. 
# for that to do you can use def main() so that you can define function below and use it above .. 

def main():
    name = input("What's your name? ")
    hello(name)

def hello(to="World"):
    print(f"Hello, {to}")

main()

"""
Scope : refers to variable only existing in the constant its defined in.
"""