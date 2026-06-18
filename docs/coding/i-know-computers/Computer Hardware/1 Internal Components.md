In [Module 0](/docs/coding/i-know-computers/Module%200%20-%20History%20&%20How%20Computers%20Work/0.2%20Computer%20Parts%20-%20Hardware.md), we introduced you to the basic computer parts — CPU, RAM, storage, and motherboard. That was the 10,000-foot view. Now it's time to open the cabinet and truly understand what each internal component does, how to compare them, and what to look for when buying or upgrading a computer. Think of this as going from "this is a brain" to "this is an Intel i5 with 6 cores running at 4.2 GHz." In the next chapter, we'll look at the external components — monitor, keyboard, printer, and UPS.

# Computer Hardware — Internal Components

**Why this section matters:**
When you can look at a computer's specifications and understand what each part means — "Intel i7, 16GB DDR4 RAM, 512GB SSD" — you can make smart buying decisions, diagnose problems, and impress in interviews. A computer operator who understands hardware is more valuable than one who just knows software.

Here's what we'll cover: first the **CPU** (the brain), then **RAM** (short-term memory), the **motherboard** (the backbone), **storage** (long-term memory), the **SMPS** (power supply), and finally the **GPU** (graphics processor).

---

### 🧠 CPU — The Brain (Intel vs AMD)

The CPU (Central Processing Unit) is the brain of the computer. Every calculation, every decision, every instruction — it all happens here. But not all CPUs are equal.

**What to look for when comparing CPUs:**

| Feature               | What It Means                                  | Better For                              |
| --------------------- | ---------------------------------------------- | --------------------------------------- |
| **Clock Speed (GHz)** | How many operations per second                 | Higher = faster single-task performance |
| **Cores**             | How many "brains" inside the CPU               | More cores = better multitasking        |
| **Threads**           | Virtual cores (each core can handle 2 threads) | More threads = smoother multitasking    |
| **Cache**             | Ultra-fast memory inside the CPU               | More cache = faster data access         |
| **TDP (Watt)**        | Power consumption / heat generated             | Lower = more energy efficient           |

![Intel vs AMD CPU Comparison](/diagrams/iknowcomputers/cpu-comparison.svg)

**Intel vs AMD — Quick Breakdown:**

| Aspect        | Intel Core (i3, i5, i7, i9) | AMD Ryzen (3, 5, 7, 9)               |
| ------------- | --------------------------- | ------------------------------------ |
| **Best for**  | Office work, gaming         | Multitasking, budget value           |
| **Price**     | More expensive at high-end  | Better value for money               |
| **Graphics**  | Some have integrated GPU    | Most have integrated GPU             |
| **Cores**     | Fewer but faster per core   | More cores, slightly slower per core |
| **Common in** | Corporate laptops, offices  | Gaming PCs, budget builds            |

> **⚠️ What CPU is NOT:** The CPU is NOT the whole computer. A fast CPU with 4GB RAM and an old HDD will still feel slow. All components work together.

Now that we know the CPU is the worker, the next question is — where does it do its work? It needs a desk to keep things on while working. That desk is called **RAM**.

---

### 💾 RAM — Short-Term Memory (DDR3 vs DDR4 vs DDR5)

RAM (Random Access Memory) is your computer's temporary workspace. When you open a program, it loads from storage into RAM. When you close it, the RAM space frees up.

**How much RAM do you need?**

| RAM Size   | What You Can Do                    | Good For                        |
| ---------- | ---------------------------------- | ------------------------------- |
| **4 GB**   | Basic typing, 1-2 browser tabs     | Very old laptops                |
| **8 GB**   | Office work, browsing, Excel       | ✅ Standard for most office PCs |
| **16 GB**  | Multiple apps, virtual machines    | Power users, designers          |
| **32 GB+** | Video editing, programming, gaming | Enthusiasts                     |

![RAM Generations — DDR3 vs DDR4 vs DDR5](/diagrams/iknowcomputers/ram-generations.svg)

> **⚠️ What RAM is NOT:** RAM is NOT storage. Files saved in RAM disappear when you turn off the power. That's why you need to save your work (Ctrl+S) — it moves from RAM to the hard drive.

**Installing RAM:**

- RAM sticks go into DIMM slots on the motherboard
- Push down firmly until the side clips click into place
- Make sure the notch on the stick matches the slot (they're keyed differently for each generation)
- DDR3, DDR4, and DDR5 are NOT interchangeable — the notch is in a different position

> **💡 Pro tip:** If you have 2 RAM sticks, put them in slots 1 and 3 (or 2 and 4) for "dual channel" mode — it's faster than putting them next to each other.

We've covered the brain and the workspace. But how do they talk to each other? They need a central connection point. That's the **Motherboard**.

---

### 🧩 Motherboard — The Backbone

The motherboard is a large circuit board that connects every component. Everything plugs into it — CPU, RAM, storage, GPU, keyboard, mouse.

![Motherboard — Key Parts to Identify](/diagrams/iknowcomputers/motherboard-parts.svg)

**Key parts to identify on a motherboard:**

| Part                 | What It Holds       | How to Identify It                     |
| -------------------- | ------------------- | -------------------------------------- |
| **CPU Socket**       | The processor       | Large square with many tiny holes/pins |
| **RAM Slots (DIMM)** | Memory sticks       | Long, thin slots next to CPU (2 or 4)  |
| **SATA Ports**       | HDD / SSD cables    | Small L-shaped connectors on the edge  |
| **PCIe Slots**       | GPU / WiFi card     | Long slots below CPU socket            |
| **Power Connector**  | Power from SMPS     | 24-pin block on the edge               |
| **CMOS Battery**     | Small round battery | CR2032 coin cell — keeps BIOS settings |
| **I/O Ports**        | USB, HDMI, Ethernet | Back panel of the computer             |

> **⚠️ What the Motherboard is NOT:** It's not storage. It doesn't hold your files. It's just the connection board. Think of it like the roads connecting different cities — the cities themselves (CPU, RAM, storage) do the actual work.

So we have the brain (CPU), workspace (RAM), and roads (motherboard). But the brain needs long-term memory — a place to store files even when power is off. That's **Storage**.

---

### 💽 Storage — HDD vs SSD

Storage is where your files, photos, videos, and programs live permanently. Unlike RAM, storage keeps data even when the power is off.

![HDD vs SSD — Which One to Choose?](/diagrams/iknowcomputers/hdd-vs-ssd-detail.svg)

**Detailed comparison:**

| Feature        | HDD (Hard Disk Drive)            | SSD (Solid State Drive)   |
| -------------- | -------------------------------- | ------------------------- |
| **Technology** | Magnetic spinning disk           | Flash memory chips        |
| **Speed**      | 80-160 MB/s (slow)               | 500-3,500 MB/s (fast)     |
| **Noise**      | Audible spinning + clicking      | Silent (no moving parts)  |
| **Durability** | Fragile if dropped while running | Durable — no moving parts |
| **Price**      | ~Rs 3,000 for 1TB                | ~Rs 5,000 for 512GB       |
| **Best for**   | Bulk file storage                | OS, programs, games       |

**The SATA cable:**

- Most HDDs and SATA SSDs use a thin L-shaped SATA cable
- One end goes to the drive, the other to the motherboard's SATA port
- Also needs a power cable from the SMPS

> **💡 The ideal setup:** SSD for Windows (boots in 10 seconds) + HDD for your files (movies, photos, backups). Most modern laptops come with only SSDs.

> **⚠️ What Storage is NOT:** Storage is NOT the same as RAM. RAM is fast but temporary. Storage is slow but permanent. When you open a file, it moves from Storage → RAM so the CPU can work on it.

We now have the thinking parts. But none of them work without electricity. Someone has to convert the wall power into usable form and distribute it. That's the **SMPS**.

---

### 🔌 SMPS — The Power Supply Unit

SMPS (Switch Mode Power Supply) or PSU (Power Supply Unit) is the component that takes electricity from your wall socket and converts it into the right voltages for each computer part.

![SMPS — Power Supply Unit](/diagrams/iknowcomputers/smps.svg)

**Wattage guide for different computers:**

| Computer Type                   | Recommended SMPS | Why                              |
| ------------------------------- | ---------------- | -------------------------------- |
| **Office PC** (no GPU)          | 400W - 450W      | Only CPU, motherboard, one HDD   |
| **Home PC** (basic GPU)         | 500W - 550W      | Add a low-power graphics card    |
| **Gaming PC** (powerful GPU)    | 650W - 750W      | High-end GPU needs lots of power |
| **Workstation** (multiple GPUs) | 850W - 1000W+    | Heavy rendering hardware         |

> **⚠️ What SMPS is NOT:** The SMPS is NOT a UPS. SMPS converts AC to DC inside your computer. UPS provides backup power when the electricity goes off. They are different devices.

**Efficiency ratings (80+ certification):**

- **80+ Bronze:** 82% efficient at typical load (standard)
- **80+ Gold:** 87% efficient (good — less electricity wasted as heat)
- **80+ Platinum:** 90% efficient (best — for servers and high-end PCs)

So far everything we've covered handles data. But there's one more component that handles something else — graphics. If you work with design, video, or gaming, the **GPU** matters a lot.

---

### 🎮 GPU — Integrated vs Dedicated Graphics

The GPU (Graphics Processing Unit) handles everything you see on screen — the desktop, videos, games, design software.

![GPU — Integrated vs Dedicated Graphics](/diagrams/iknowcomputers/gpu-types.svg)

**Two types of graphics:**

| Feature         | Integrated Graphics            | Dedicated GPU (Graphics Card) |
| --------------- | ------------------------------ | ----------------------------- |
| **Location**    | Inside the CPU                 | Separate card in PCIe slot    |
| **Memory**      | Shares system RAM              | Has its own VRAM (video RAM)  |
| **Performance** | Good for office work           | 20-50x faster                 |
| **Power use**   | Low (part of CPU)              | High (needs separate power)   |
| **Heat**        | Low                            | High (needs cooling fans)     |
| **Price**       | Free (included with CPU)       | Rs 10,000 - Rs 1,00,000+      |
| **Examples**    | Intel UHD, AMD Radeon Graphics | NVIDIA GeForce, AMD Radeon RX |

> **⚠️ What a Dedicated GPU is NOT:** Office workers do NOT need a dedicated GPU. Things like Word, Excel, Chrome, and email use integrated graphics perfectly fine. Save your money unless you edit video or play games.

**Dedicated GPU brands:**

- **NVIDIA** — GeForce GTX / RTX series (market leader)
- **AMD** — Radeon RX series (good value option)

---

### 🧠 What You've Learned — Internal Components Summary

| Component             | Job                    | Think of It As                |
| --------------------- | ---------------------- | ----------------------------- |
| **CPU**               | Executes instructions  | The brain                     |
| **RAM**               | Temporary workspace    | The desk                      |
| **Motherboard**       | Connects everything    | The roads / backbone          |
| **Storage (HDD/SSD)** | Permanent file storage | The filing cabinet            |
| **SMPS / PSU**        | Supplies power         | The heart (pumps electricity) |
| **GPU**               | Renders graphics       | The artist / painter          |

---

### 🧠 Chapter Summary

> ✅ **CPU** — Brain of the computer. Intel (i3/i5/i7/i9) vs AMD (Ryzen 3/5/7/9). More cores + higher GHz = faster.  
> ✅ **RAM** — Temporary workspace. 8GB minimum for office work. DDR4 is current standard, DDR3 is old, DDR5 is newest.  
> ✅ **Motherboard** — Connects all components. Identify: CPU socket, RAM slots, SATA ports, PCIe slots, I/O ports.  
> ✅ **Storage** — HDD (slow, cheap, spinning disk) vs SSD (fast, expensive, flash memory). Best: SSD for OS + HDD for files.  
> ✅ **SMPS/PSU** — Power supply. Match wattage to your components. 80+ Bronze/Gold/Platinum for efficiency.  
> ✅ **GPU** — Integrated (inside CPU, for office work) vs Dedicated (separate card, for gaming/design). Office work doesn't need dedicated.

---

### 🎯 Real Task

1. **Identify your own computer's specs:** Press `Ctrl + Shift + Esc` → Performance tab. Note down: CPU name, RAM amount, disk type (HDD or SSD).
2. **Compare:** Go to a laptop store or Amazon. Look at 3 laptops in different price ranges. Compare CPU (i3 vs i5 vs i7), RAM (8GB vs 16GB), and storage (HDD vs SSD). Which one gives the best value?
3. **Practice identifying motherboard parts:** Open your computer cabinet (if available) and locate: CPU socket, RAM slots, SATA ports, and the CMOS battery. If you don't have a desktop, find a motherboard image online and label the parts.

> **Next chapter:** Now that you know what's inside the computer, let's look at what connects to it from the outside — monitors, keyboards, mice, printers, and UPS. 🚀
