# OOP — Interview Prep (Deep Dive)

> Target: Full-stack developer roles, Gurgaon, 5–30 LPA range
> Context: You already know TypeScript, so understand concepts with TS examples — stronger than memorization since you can write and verify the code yourself.

---

## 1. Class vs Object (Foundation)

**Class**: A blueprint/template — defines what properties and methods an object will have.

**Object**: An actual instance of a class — exists in real memory.

```typescript
class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

const rice = new Product("Basmati Rice", 120); // this is an object
```

**Asked in interviews**: *"Difference between class and object?"* — Answer: Class is a design (like a house blueprint), object is the actual built house. Multiple objects can be created from one class.

---

## 2. Four Pillars of OOP

### a) Encapsulation

**What it is**: Bundling data (properties) and the methods that operate on it into one unit (class), and preventing internal details from being accessed directly from outside.

**Why**: So no one can modify data incorrectly from outside — everything happens in a controlled way (through methods).

```typescript
class InventoryItem {
  private quantity: number; // can't be accessed directly from outside

  constructor(quantity: number) {
    this.quantity = quantity;
  }

  reduceStock(amount: number): void {
    if (amount > this.quantity) {
      throw new Error("Insufficient stock");
    }
    this.quantity -= amount;
  }

  getQuantity(): number {
    return this.quantity;
  }
}

const item = new InventoryItem(50);
// item.quantity = -10; // Error! private, can't access directly
item.reduceStock(10); // changing in a controlled way
```

**DukaanOS angle**: If `quantity` were public, any code could write `item.quantity = -999` — bypassing validation. Accessing via `private` + method is encapsulation.

**Interview tip**: Also explain the `private`, `public`, `protected` keywords:
- `public` — accessible from anywhere (default)
- `private` — only inside the same class
- `protected` — same class + its child classes

---

### b) Inheritance

**What it is**: A class (child) can reuse properties and methods of another class (parent), without rewriting them.

**Why**: Reduces code duplication — common logic in one place, specific logic in child classes.

```typescript
class Vehicle {
  constructor(public brand: string, public speed: number) {}

  displayInfo(): string {
    return `${this.brand} is running at ${this.speed} km/h`;
  }
}

class Car extends Vehicle {
  constructor(brand: string, speed: number, public doors: number) {
    super(brand, speed); // calling parent constructor is mandatory
  }

  honk(): string {
    return "Pom Pom!";
  }
}

const myCar = new Car("Honda", 120, 4);
console.log(myCar.displayInfo()); // inherited method from Vehicle
console.log(myCar.honk()); // Car's own method
```

**Asked in interviews**: *"Why call `super()`?"* — Answer: To initialize the parent class's constructor. In TS/JS, if a child class has a constructor, calling `super()` is mandatory, otherwise there's an error.

**Types of inheritance** (remember names, not deep details):
- Single (one parent, one child) — like the example above
- Multilevel (A → B → C)
- Hierarchical (one parent, multiple children)
- TypeScript/JS does **not** allow multiple inheritance (one class extending two parents) (unlike C++) — use **interfaces** for that.

---

### c) Polymorphism

**What it is**: "Poly" = many, "morph" = forms. The same method/function can behave differently in different classes.

**Two types**:

**1. Method Overriding** (runtime polymorphism) — child class redefines the parent's method in its own way.

```typescript
class Shape {
  area(): number {
    return 0;
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  override area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
  }

  override area(): number {
    return this.width * this.height;
  }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach(shape => console.log(shape.area())); // each shape calculates its own area
```

This is real polymorphism — same method call (`area()`), but each object behaves according to its own type.

**2. Method Overloading** (compile-time polymorphism) — same method name, different parameters.

```typescript
function calculateTotal(price: number): number;
function calculateTotal(price: number, tax: number): number;
function calculateTotal(price: number, tax?: number): number {
  return tax ? price + tax : price;
}
```

**Interview tip**: Overloading in TypeScript differs from C++/Java (declare signatures, write a single implementation) — if asked "how do you overload in TS," use this example.

---

### d) Abstraction

**What it is**: Hiding complex implementation details, showing only the necessary/relevant things to the user.

**Real-world example**: When driving a car, you don't need to know the engine's internal working — just steering, accelerator, brake. That's abstraction.

**How in code**: Through abstract classes or interfaces.

```typescript
abstract class PaymentMethod {
  abstract processPayment(amount: number): void; // declaration only, no implementation

  logTransaction(amount: number): void {
    console.log(`Transaction of ₹${amount} logged`);
  }
}

class UPIPayment extends PaymentMethod {
  processPayment(amount: number): void {
    console.log(`Processing ₹${amount} via UPI`);
    this.logTransaction(amount);
  }
}

class CashPayment extends PaymentMethod {
  processPayment(amount: number): void {
    console.log(`Processing ₹${amount} in Cash`);
    this.logTransaction(amount);
  }
}

// const p = new PaymentMethod(); // Error! Can't instantiate abstract class
const upi = new UPIPayment();
upi.processPayment(500);
```

**Asked in interviews**: *"Why can't you instantiate an abstract class?"* — Because it's incomplete (some methods are only declared, not defined) — you must complete it in a child class before using it.

---

## 3. Abstract Class vs Interface (Very common comparison question)

| | Abstract Class | Interface |
|---|---|---|
| Implementation | Some methods can be implemented, some abstract | Only structure/contract, no implementation (sometimes defaults in TS) |
| Multiple inheritance | A class can extend only one abstract class | A class can implement multiple interfaces |
| State (properties) | Can have values | Only defines shape, no values |
| When to use | When common logic should be shared among child classes | When you only want the contract "these methods must exist," leaving implementation freedom to the child |

```typescript
interface Payable {
  pay(amount: number): void;
}

interface Refundable {
  refund(amount: number): void;
}

class OnlineOrder implements Payable, Refundable { // multiple interfaces — allowed
  pay(amount: number): void {
    console.log(`Paid ₹${amount}`);
  }
  refund(amount: number): void {
    console.log(`Refunded ₹${amount}`);
  }
}
```

**Simple interview answer**: "I use an interface when I only want to define what a class must have, leaving implementation freedom to the child class. I use an abstract class when I want to share some common logic along with that."

---

## 4. SOLID Principles (Names + one-liners, no deep dive needed yet)

| Letter | Principle | One-liner |
|---|---|---|
| **S** | Single Responsibility | A class should have only one job/reason-to-change |
| **O** | Open/Closed | Open for extension, closed for modification (add new features without touching old code) |
| **L** | Liskov Substitution | A child class should be usable in place of the parent class without breaking behavior |
| **I** | Interface Segregation | Small, specific interfaces are better than one big "everything" interface |
| **D** | Dependency Inversion | High-level modules shouldn't depend directly on low-level modules; both should depend on abstractions |

**Interview tip**: If asked about SOLID, give the names + one example (Single Responsibility) — a small code example. Deep dive isn't expected at junior/mid full-stack roles.

---

## Quick Revision Checklist (before interview)

- [ ] Class vs Object — one-line difference
- [ ] Encapsulation — `private`/`public`/`protected` usage + example
- [ ] Inheritance — `extends`, `super()` usage + example
- [ ] Polymorphism — overriding vs overloading, examples of both
- [ ] Abstraction — abstract class example, why it can't be instantiated
- [ ] Abstract class vs Interface — the table comparison memorized
- [ ] SOLID — 5 letters + one-liner

---

## Practice Approach

1. Write a small TypeScript example for each pillar yourself (like the ones above) — think in your DukaanOS context (Product, Order, Payment classes).
2. In interviews, when asked "explain OOP," state the 4 pillars and give a small code example for each — stronger than "I memorized it."
3. When confident, tell me — I'll create the CN (Computer Networks) file next.