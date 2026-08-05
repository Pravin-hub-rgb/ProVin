# OOP — Interview Prep (Deep Dive)

> Target: Full-stack developer roles, Gurgaon, 5–30 LPA range
> Context: Tumhe already TypeScript aata hai, isliye concepts ko TS examples ke saath samjhna — ratne se zyada strong rahega kyunki tum khud code likh ke verify kar sakte ho.

---

## 1. Class vs Object (Foundation)

**Class**: Ek blueprint/template — define karta hai ki object mein kya properties aur methods honge.

**Object**: Class ka ek actual instance — real memory mein exist karta hai.

```typescript
class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

const rice = new Product("Basmati Rice", 120); // yeh object hai
```

**Interview mein poochte hain**: *"Class aur object mein difference?"* — Answer: Class ek design hai (jaise ghar ka naksha), object uska actual banaya hua ghar hai. Ek class se multiple objects ban sakte hain.

---

## 2. Four Pillars of OOP

### a) Encapsulation

**Kya hai**: Data (properties) aur uspe kaam karne wale methods ko ek unit (class) mein bandh dena, aur internal details ko bahar se directly access hone se rokna.

**Kyun**: Taaki koi bahar se galat tarike se data modify na kar sake — sab kuch controlled tarike se (methods ke through) hoga.

```typescript
class InventoryItem {
  private quantity: number; // bahar se directly access nahi kar sakte

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
// item.quantity = -10; // Error! private hai, directly access nahi hoga
item.reduceStock(10); // controlled tarike se change ho raha hai
```

**DukaanOS angle**: Agar `quantity` public hota, to koi bhi code seedha `item.quantity = -999` likh sakta tha — validation bypass karke. `private` + method se access karna encapsulation hai.

**Interview tip**: `private`, `public`, `protected` keywords ka matlab bhi bata do saath mein:
- `public` — kahin se bhi access ho sakta hai (default)
- `private` — sirf usi class ke andar
- `protected` — usi class + uski child classes mein

---

### b) Inheritance

**Kya hai**: Ek class (child) dusri class (parent) ki properties aur methods ko reuse kar sakti hai, bina dobara likhe.

**Kyun**: Code duplication kam karta hai — common logic ek jagah, specific logic child classes mein.

```typescript
class Vehicle {
  constructor(public brand: string, public speed: number) {}

  displayInfo(): string {
    return `${this.brand} chal raha hai ${this.speed} km/h par`;
  }
}

class Car extends Vehicle {
  constructor(brand: string, speed: number, public doors: number) {
    super(brand, speed); // parent constructor call karna zaroori hai
  }

  honk(): string {
    return "Pom Pom!";
  }
}

const myCar = new Car("Honda", 120, 4);
console.log(myCar.displayInfo()); // Vehicle se inherited method
console.log(myCar.honk()); // Car ka apna method
```

**Interview mein poochte hain**: *"`super()` kyun call karna padta hai?"* — Answer: Parent class ka constructor initialize karne ke liye. TypeScript/JS mein agar child class ka constructor hai, to `super()` call karna mandatory hai warna error aayega.

**Types of inheritance** (naam yaad rakho, deep nahi):
- Single (ek parent, ek child) — jaise upar wala example
- Multilevel (A → B → C)
- Hierarchical (ek parent, multiple children)
- TypeScript/JS mein **multiple inheritance** (ek class do parents se extend) allowed nahi hai (unlike C++) — iske liye **interfaces** use karte hain.

---

### c) Polymorphism

**Kya hai**: "Poly" = many, "morph" = forms. Same method/function different classes mein different tarike se behave kar sakta hai.

**Do types**:

**1. Method Overriding** (runtime polymorphism) — child class parent ke method ko apne tarike se redefine karta hai.

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
shapes.forEach(shape => console.log(shape.area())); // har shape apna area calculate karega
```

Ye asli polymorphism hai — same method call (`area()`), but har object apne hisaab se behave karta hai.

**2. Method Overloading** (compile-time polymorphism) — same method naam, different parameters.

```typescript
function calculateTotal(price: number): number;
function calculateTotal(price: number, tax: number): number;
function calculateTotal(price: number, tax?: number): number {
  return tax ? price + tax : price;
}
```

**Interview tip**: TypeScript mein overloading thoda different hai C++/Java se (signatures declare karke ek hi implementation likhte hain) — agar poochein "TS mein overloading kaise karte ho," ye example use karo.

---

### d) Abstraction

**Kya hai**: Complex implementation details ko chhupa ke, sirf zaroori/relevant cheezein user ko dikhana.

**Real-world example**: Car chalate waqt tumhe engine ka internal working nahi pata hona chahiye — bas steering, accelerator, brake use karna aata ho. Ye abstraction hai.

**Code mein kaise**: Abstract classes ya interfaces ke through.

```typescript
abstract class PaymentMethod {
  abstract processPayment(amount: number): void; // implementation nahi, sirf contract

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

// const p = new PaymentMethod(); // Error! Abstract class ka direct object nahi bana sakte
const upi = new UPIPayment();
upi.processPayment(500);
```

**Interview mein poochte hain**: *"Abstract class ka object kyun nahi bana sakte?"* — Kyunki wo incomplete hai (kuch methods sirf declared hain, defined nahi) — usko use karne se pehle child class mein complete karna zaroori hai.

---

## 3. Abstract Class vs Interface (Bahut common comparison question)

| | Abstract Class | Interface |
|---|---|---|
| Implementation | Kuch methods implement ho sakte hain, kuch abstract | Sirf structure/contract, koi implementation nahi (TS mein kabhi kabhi default hota hai) |
| Multiple inheritance | Ek class sirf ek abstract class extend kar sakti hai | Ek class multiple interfaces implement kar sakti hai |
| State (properties) | Ho sakte hain with values | Sirf shape define karta hai, values nahi |
| Kab use karo | Jab common logic share karna ho child classes ke beech | Jab sirf "ye methods honi chahiye" ka contract chahiye, implementation ki freedom child pe chhodni ho |

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

**Simple interview answer**: "Interface tab use karta hoon jab mujhe sirf ye define karna hai ki class mein kya hona chahiye, implementation ki freedom child class pe chhodni hai. Abstract class tab jab kuch common logic bhi share karna hai saath mein."

---

## 4. SOLID Principles (Naam + one-liner, deep nahi chahiye abhi)

| Letter | Principle | One-liner |
|---|---|---|
| **S** | Single Responsibility | Ek class ka sirf ek kaam/reason-to-change hona chahiye |
| **O** | Open/Closed | Extension ke liye open, modification ke liye closed (naya feature add karo bina purana code chhede) |
| **L** | Liskov Substitution | Child class, parent class ki jagah use ho sakni chahiye bina behavior tode |
| **I** | Interface Segregation | Chhote, specific interfaces behtar hain ek bade "sab kuch wale" interface se |
| **D** | Dependency Inversion | High-level modules low-level modules pe directly depend na karein, dono abstraction pe depend karein |

**Interview tip**: Agar SOLID poochein, naam bata do + ek principle (Single Responsibility) ka chhota example de do — deep dive expect nahi karte full-stack junior/mid role mein.

---

## Quick Revision Checklist (before interview)

- [ ] Class vs Object — one-line difference
- [ ] Encapsulation — `private`/`public`/`protected` ka use + example
- [ ] Inheritance — `extends`, `super()` ka use + example
- [ ] Polymorphism — overriding vs overloading, dono ka example
- [ ] Abstraction — abstract class ka example, kyun object nahi ban sakta
- [ ] Abstract class vs Interface — table wala comparison yaad
- [ ] SOLID — 5 letters + one-liner

---

## Practice Approach

1. Har pillar ke liye khud se ek chhota TypeScript example likho (jaise upar diye hain) — apne DukaanOS ke context mein socho (Product, Order, Payment jaisi classes).
2. Interview mein jab poochein "OOP explain karo," seedha 4 pillars bolke ek-ek ka chhota code example do — ye "ratta laga hai" se zyada strong lagta hai.
3. Jab confident ho, mujhe bolna — CN (Computer Networks) ki file banata hoon next.
