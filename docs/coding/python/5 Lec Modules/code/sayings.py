def main():
    hello("world")
    goodbye("world")
    print("Running from main")


def hello(name):
    print(f"Hello, {name}")
    print("from saying.py")

def goodbye(name):
    print(f"Good bye, {name}")

if __name__ == "__main__":
    main()