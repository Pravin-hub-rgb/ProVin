# Operating Systems — Interview Prep (Deep Dive)

> Target: Full-stack developer roles, Gurgaon, 5–30 LPA range
> Context: Ye lowest priority hai full-stack role ke liye (DBMS/CN se kam poocha jaata hai), isliye is file mein depth thodi kam rakhi hai — bas jo commonly poocha jaata hai wahi. GATE-level detail ki zaroorat nahi hai.

---

## 1. Process vs Thread (Sabse common question is subject mein)

**Process**: Ek independently running program — apni khud ki memory space hoti hai.

**Thread**: Ek process ke andar chalne wala lightweight execution unit — same process ke threads memory **share** karte hain.

| | Process | Thread |
|---|---|---|
| Memory | Apni alag memory space | Same process ke saath memory share karta hai |
| Creation cost | Heavy (zyada resources lagte hain) | Light (fast banta hai) |
| Communication | Slow (IPC — Inter-Process Communication zaroori) | Fast (shared memory ki wajah se) |
| Crash impact | Ek process crash ho to dusre pe asar nahi | Ek thread crash ho sakta hai poore process ko affect kare |

**Real-world analogy**: Process = ek pura ghar. Thread = ghar ke andar alag-alag kamre jo same resources (kitchen, bathroom) share karte hain.

**Node.js angle (tumhara direct context)**: Node.js **single-threaded** hai (main JS execution ke liye), but background mein **libuv** thread pool use karta hai heavy I/O operations (file read, crypto) ke liye. Ye interview mein bol sakte ho agar Node.js ka concurrency model poochein.

---

## 2. Deadlock

**Kya hai**: Do (ya zyada) processes ek-dusre ka resource release hone ka wait kar rahe hain, aur koi bhi release nahi kar raha — sab stuck ho jaate hain forever.

**Real example**: Process A ke paas Resource 1 hai, use Resource 2 chahiye (jo Process B ke paas hai). Process B ke paas Resource 2 hai, use Resource 1 chahiye (jo Process A ke paas hai). Dono infinite wait mein fas gaye.

### 4 Conditions for Deadlock (sab ek saath honi chahiye tabhi deadlock hota hai)

1. **Mutual Exclusion**: Resource ek time pe sirf ek process use kar sakta hai
2. **Hold and Wait**: Process ek resource pakde hue hai aur dusre ka wait kar raha hai
3. **No Preemption**: Resource forcefully chheena nahi ja sakta, process khud release karega
4. **Circular Wait**: Processes ek circular chain mein ek-dusre ka wait kar rahe hain

**Prevention (one-liner, deep nahi)**: In 4 conditions mein se koi ek ko break kar do — jaise resources ko ek fixed order mein request karwana (circular wait rokta hai).

**Interview mein kitna deep**: Bas deadlock ka definition + real example + 4 conditions ke naam bata pao, itna kaafi hai. Prevention algorithms (Banker's algorithm etc.) full-stack role mein rarely poochte hain.

---

## 3. Memory Management (Basics)

**Kya hota hai**: OS decide karta hai kaunsa program kitni memory (RAM) use karega, aur kab.

### Key concepts (naam + one-liner)

- **Virtual Memory**: OS har process ko lagta hai jaise use poori memory mili hai (isolated), asal mein OS background mein manage karta hai — RAM kam pade to disk (swap space) use hoti hai.
- **Paging**: Memory ko fixed-size blocks (pages) mein divide karna, taaki management aasan ho aur fragmentation kam ho.
- **Fragmentation**: Memory mein chhote-chhote unused gaps ban jaana jo use nahi ho paate — do types: **internal** (allocated block ke andar waste space) aur **external** (blocks ke beech gaps).

**Interview mein kitna deep**: Sirf "virtual memory kya hai" aur "paging kyun karte hain" — one-liner level. Full-stack role mein OS internals ka deep dive nahi hota.

---

## 4. Process States (Quick overview)

Ek process apni lifetime mein in states se guzarta hai:

**New → Ready → Running → Waiting → Terminated**

- **New**: Process create ho raha hai
- **Ready**: Execute hone ke liye taiyar, CPU ka wait kar raha hai
- **Running**: Abhi CPU execute kar raha hai isko
- **Waiting**: Kisi I/O operation ya event ka wait kar raha hai
- **Terminated**: Execution complete ho gaya

**Interview mein kitna deep**: Bas diagram/flow bata pao, itna kaafi hai.

---

## 5. Context Switching (Quick, one-liner level)

**Kya hai**: Jab CPU ek process/thread se dusre pe switch karta hai — current process ka state (registers, memory pointers) save karta hai, aur naye process ka state load karta hai.

**Kyun important**: Ye overhead create karta hai — isliye zyada context switching (jaise bahut saare threads) performance ko slow kar sakta hai.

---

## 6. CPU Scheduling (Sirf naam yaad rakho, algorithms deep nahi)

OS decide karta hai kaunsa process kab CPU pe chalega:

- **FCFS** (First Come First Serve) — jo pehle aaya, pehle chalega
- **SJF** (Shortest Job First) — sabse chhota job pehle
- **Round Robin** — har process ko ek fixed time slice milta hai, phir next process

**Interview mein kitna deep**: Full-stack role mein ye rarely poochte hain — bas naam pata hon to kaafi hai. Agar poochein, "Round Robin common hai time-sharing systems mein, jaha fairness important hai" itna bol dena.

---

## Quick Revision Checklist (before interview)

- [ ] Process vs Thread — table wala difference + Node.js single-thread + libuv angle
- [ ] Deadlock — definition + real example + 4 conditions ke naam
- [ ] Virtual memory + paging — one-liner
- [ ] Process states — 5 states ka flow
- [ ] Context switching — one-liner
- [ ] CPU scheduling algorithms — sirf naam (FCFS, SJF, Round Robin)

---

## Practice Approach

1. Ye subject sabse kam priority hai — agar time tight ho raha hai DSA/project ke saath, isko sabse pehle compress/skip kar sakte ho baaki 3 subjects (DBMS, OOP, CN) ke comparison mein.
2. Sirf Process vs Thread aur Deadlock — ye do topics hi zyada poochte hain full-stack interviews mein. Baaki (memory management, scheduling) sirf "one-liner ready rakhna" level pe rakho.
3. Node.js ka concurrency model (single-threaded + event loop + libuv) OS aur JavaScript dono ko connect karta hai — is angle se practice karna extra fayda dega kyunki ye tumhare daily kaam se bhi juda hai.

---

**Sab 4 subjects (DBMS, OOP, CN, OS) complete ho gaye.** Jab ready ho, mujhe bolna — chaaho to hum mock interview round kar sakte hain sabhi subjects mila ke, ya DSA roadmap pe wapas focus kar sakte hain.
