
In the previous chapter, we looked inside the computer — the CPU, RAM, motherboard, storage, SMPS, and GPU. But a computer sitting on a desk with no monitor, keyboard, or mouse is just an expensive paperweight. The parts you interact with directly — the screen you look at, the keyboard you type on, the printer that prints documents — are called **peripherals** or external components. They're just as important as the internal parts because they're what you use all day long. In the next chapter, we'll learn how to troubleshoot problems when these components stop working.

# Computer Hardware — External Components & Peripherals

**Why this section matters:**
In an office job, you'll work with monitors, keyboards, mice, printers, and UPS units every single day. Knowing the different types of ports, how to connect them, and what to do when a printer jams or a UPS beeps — these are the skills that make you a reliable computer operator.

  Here's what we'll cover: first **monitors** (ports, resolution, refresh rate), then **keyboards and mice** (connection types and function keys), followed by the **UPS** (backup power), and finally **printers** (types, driver installation, and common issues).

---

### 🖥️ Monitors — Ports, Resolution, and Refresh Rate

  The monitor is your window into the computer. But not all monitors connect the same way, and not all cables give the same quality.

  **Types of monitor ports:**

  | Port | Connector Type | Max Resolution | Carries Audio? | Found On |
  |---|---|---|---|---|
  | **VGA** | Blue, 15-pin, screws | 1920×1080 @ 60Hz | ❌ No | Old monitors, projectors |
  | **HDMI** | Flat, 19-pin | 3840×2160 @ 60Hz | ✅ Yes | TVs, monitors, laptops |
  | **DisplayPort** | Rectangular, 20-pin | 7680×4320 @ 60Hz | ✅ Yes | High-end monitors, PCs |

  ![Monitor Ports — VGA vs HDMI vs DisplayPort](/diagrams/iknowcomputers/monitor-ports.svg)

  **Resolution explained (from lowest to highest):**

  | Name | Pixels (Width × Height) | Common Use |
  |---|---|---|
  | **HD / 720p** | 1280 × 720 | Small monitors, older laptops |
  | **Full HD / 1080p** | 1920 × 1080 | ✅ Standard office monitor |
  | **2K / QHD** | 2560 × 1440 | Design work, higher quality |
  | **4K / UHD** | 3840 × 2160 | Video editing, premium monitors |

  **Refresh rate (Hz):**
  - **60 Hz:** Standard for office work — smooth enough for typing and browsing
  - **75 Hz:** Slightly smoother — common in budget office monitors
  - **144 Hz+:** Very smooth — for gaming, not needed for office work

  > **💡 Resolution vs Refresh Rate:** Resolution = how sharp the image is (more pixels = sharper). Refresh rate = how smooth motion looks (higher Hz = smoother scrolling). For office work, 1920×1080 @ 60Hz is perfectly fine.

  > **⚠️ What a Monitor is NOT:** The monitor is NOT the computer. The actual computer is the CPU/tower/laptop. The monitor just displays what the computer sends. If your monitor is off, the computer might still be running.

  Now that you understand what you look at, let's talk about what you use to interact with the computer — the keyboard and mouse.

---

### ⌨️ Keyboards and Mice — Connection Types and Function Keys

  Keyboards and mice are your primary input devices — they're how you tell the computer what to do.

  **Connection types:**

  | Feature | PS/2 | USB | Wireless (Bluetooth / RF) |
  |---|---|---|---|
  | **Connector** | Round, 6-pin (purple/green) | Flat rectangular | No wire — USB receiver or Bluetooth |
  | **Hot-swap?** | ❌ Must restart to detect | ✅ Plug and play | ✅ Just pair once |
  | **Latency** | None | None | Very slight (not noticeable for office) |
  | **Cable mess** | Wired | Wired | Clean desk |
  | **Best for** | Very old computers | Most office computers | Clean desk setups |

  ![Keyboard & Mouse — Connection Types](/diagrams/iknowcomputers/kb-mouse-types.svg)

  **Keyboard types:**
  - **Membrane keyboard** — Soft, quiet, cheap (most office keyboards)
  - **Mechanical keyboard** — Click sound, durable, more expensive (typists love these)

  > **💡 Office keyboards are usually membrane type.** They're quiet and cheap to replace.

  **Function keys (F1-F12) — what each does:**

  | Key | Action | Key | Action |
  |---|---|---|---|
  | **F1** | Help (opens help menu) | **F7** | Spell check (in Word) |
  | **F2** | Rename selected file | **F8** | Safe mode (during boot) |
  | **F3** | Search (in File Explorer) | **F9** | Refresh (in Outlook) |
  | **F4** | Address bar (in browser/Explorer) | **F10** | Activate menu bar |
  | **F5** | Refresh page (browser) | **F11** | Full screen (browser) |
  | **F6** | Move to address bar | **F12** | Save As (in Word) |

  **Mouse types:**
  - **Wired mouse:** Simple, no batteries needed, no delay
  - **Wireless mouse:** Clean desk, needs AA/AAA batteries or charging
  - **Ergonomic mouse:** Designed for comfort — helps prevent wrist pain

  > **⚠️ What a Mouse is NOT:** A mouse doesn't control what's on screen — it just moves the cursor where you point it. The computer decides what happens when you click.

  We've covered input and display. But there's one more critical component for Indian offices — what happens when the power goes out? That's where the **UPS** comes in.

---

### 🔋 UPS — Uninterruptible Power Supply

  In many parts of India, power cuts are common. A UPS (Uninterruptible Power Supply) gives you 5-20 minutes of backup power so you can save your work and shut down properly.

  ![UPS — Uninterruptible Power Supply](/diagrams/iknowcomputers/ups-diagram.svg)

  **How a UPS works:**
  1. Normally — electricity flows from wall → UPS → computer (UPS battery charges)
  2. Power cut — UPS switches to battery instantly (2-10 milliseconds)
  3. You hear a beep — this is your signal to save work and shut down

  **UPS ratings (VA — Volt Ampere):**

  | UPS Rating | Backup Time (Office PC) | Best For |
  |---|---|---|
  | **600 VA** | ~10 minutes | Single PC + monitor |
  | **1000 VA** | ~15-20 minutes | PC + monitor + printer |
  | **1500 VA** | ~25-30 minutes | PC + multiple accessories |

  > **⚠️ What a UPS is NOT:**
  > - A UPS is NOT a stabilizer. A stabilizer only regulates voltage (doesn't provide backup).
  > - A UPS is NOT a generator. A generator can run for hours. A UPS runs for minutes.
  > - A UPS is NOT for long-term backup. It's just enough time to save your work and shut down.

  > **💡 Pro tip:** If your UPS beeps continuously, it's on battery. Save your work immediately. If it beeps every 30 seconds, it's doing a self-test — that's normal.

  Monitors display, keyboards type, UPS keeps power stable. But the most common device you'll troubleshoot in an office is probably the **printer**.

---

### 🖨️ Printers — Inkjet vs Laser, and Common Problems

  Printers are essential in offices — for invoices, reports, forms, and letters. As a computer operator, you'll need to install printers, clear paper jams, and fix common issues.

  **Inkjet vs Laser printers:**

  | Feature | Inkjet Printer | Laser Printer |
  |---|---|---|
  | **Technology** | Sprays liquid ink on paper | Uses toner powder + heat |
  | **Speed** | Slow (~5-10 pages/min) | Fast (~20-40 pages/min) |
  | **Print quality** | Good for color, photos | Best for text (crisp and sharp) |
  | **Cost per page** | High (ink cartridges are expensive) | Low (toner lasts thousands of pages) |
  | **Printer price** | Cheap (Rs 3,000 - 6,000) | Expensive (Rs 12,000 - 25,000+) |
  | **Running cost** | High — ink runs out fast | Low — toner lasts long |
  | **Best for** | Home, low volume, color prints | Office, high volume, B&W documents |

  ![Printer Types — Inkjet vs Laser](/diagrams/iknowcomputers/printer-types.svg)

  **How to install a printer driver:**
  1. Connect the printer to the computer via USB (or on the same network for network printers)
  2. Windows often detects it automatically → driver installs in the background
  3. If not: Go to **Settings → Devices → Printers & Scanners → Add a Printer**
  4. If Windows can't find the driver, download it from the printer manufacturer's website (HP, Canon, Epson, Brother)
  5. Print a test page to verify

  **Common printer problems and fixes:**

  | Problem | Likely Cause | What to Do |
  |---|---|---|
  | **Printer not printing** | Offline or out of paper | Check: Is it on? Has paper? Click "Use Printer Online" |
  | **Paper jam** | Paper stuck inside | Open all access panels, gently pull paper in direction of feed |
  | **Poor print quality** | Low ink/toner, dirty print head | Replace cartridge or run "Clean Print Head" utility |
  | **Printer not detected** | Driver missing or wrong port | Go to Device Manager → reinstall driver |
  | **Slow printing** | High quality setting or large file | Change to "Draft" mode in print settings |

  > **⚠️ What a Printer is NOT:** A printer does NOT need internet to print via USB. It only needs internet for "cloud printing" features. USB printing works 100% offline.

---

### 🧠 Chapter Summary

> ✅ **Monitor ports:** VGA (old, blue, video only) → HDMI (standard, carries audio) → DisplayPort (best quality, high resolution)  
> ✅ **Resolution:** 1920×1080 (Full HD) is standard for office work. Higher = sharper but costs more.  
> ✅ **Keyboards & Mice:** USB is standard. Wireless is convenient. PS/2 is outdated. F-keys do different things — F5 refreshes, F11 makes browser full screen.  
> ✅ **UPS:** Battery backup during power cuts. 600VA for a single PC, 1000VA for PC + accessories. Beeping = save your work!  
> ✅ **Printers:** Inkjet (cheap printer, expensive ink, good for color) vs Laser (expensive printer, cheap toner, best for B&W text).  
> ✅ **Driver installation:** Windows detects most printers automatically. Otherwise, download from manufacturer website.

---

### 🎯 Real Task

1. **Inspect your monitor:** Look at the ports on the back. Can you identify VGA, HDMI, and DisplayPort? Check your display settings (right-click desktop → Display Settings) and note the resolution and refresh rate.
2. **Practice with F-keys:** Open a browser and try F5 (refresh), F11 (full screen), and F12 (open developer tools — then close it). Try F2 on a file in File Explorer to rename it.
3. **Check your UPS:** If you have a UPS at home or in the office, check its VA rating (it's written on the front or back). Unplug the UPS from the wall for a moment — does it beep? Does your computer stay on? (Do this when you don't have important unsaved work!)

> **Next chapter:** You now know every part — inside and out. But what happens when something stops working? Let's learn how to diagnose and fix common hardware problems. 🚀
