In the last two chapters, we covered every computer component — from the CPU inside to the printer outside. Understanding each part is one thing. But the real test comes when something stops working. A computer operator who can diagnose problems is worth their weight in gold. In this chapter, we'll handle the most common hardware problems you'll face in an office — no display, slow computer, keyboard not working, printer not printing, and what those mysterious beep codes mean. By the end, you'll be the person in the office who can fix things instead of calling for help.

# Computer Hardware — Troubleshooting & Diagnosis

**Why this chapter matters:**
In any office, computers will have problems. Batteries die, cables loosen, printers jam. If you can calmly diagnose and fix common issues, you save time, money, and frustration. Plus, troubleshooting skills are what separate an average computer operator from a great one.

  Here's what we'll cover: **"No Display"** (the most common panic situation), **computer hang and slow performance**, **keyboard and mouse not working**, **printer problems**, and **BIOS beep codes** (your computer's way of telling you what's wrong).

---

### 🚫 No Display — The Screen is Black

  You press the power button. The fans spin. Lights turn on. But the screen stays black. Don't panic. Follow this step-by-step.

  **Step-by-step diagnosis:**

  | Step | What to Check | What to Do |
  |---|---|---|
  | 1 | **Is the monitor turned ON?** | Look for a small LED light on the monitor. If off, press the monitor's power button. |
  | 2 | **Is the cable connected properly?** | Check both ends — monitor side and computer side. Tighten VGA screws. Push HDMI fully in. |
  | 3 | **Is the computer actually running?** | Listen for fans. Check the CPU cabinet LED. If no sound or lights → power supply issue. |
  | 4 | **Try a different cable** | Cables go bad. Swap with a known working cable if available. |
  | 5 | **Reseat the RAM** | Open the cabinet. Remove RAM sticks, clean the gold contacts with a soft eraser, and reinsert firmly until clips click. |
  | 6 | **Reseat the GPU** | If you have a dedicated graphics card, remove and reinsert it. Ensure power cables to GPU are connected. |
  | 7 | **Clear CMOS battery** | Remove the small round battery (CR2032) on the motherboard. Wait 30 seconds, put it back. This resets BIOS settings. |

  ![Troubleshooting Flow — No Display Problem](/diagrams/iknowcomputers/troubleshooting-flow.svg)

  > **💡 Most common fix:** 8 out of 10 "no display" cases are simple — monitor not turned on, loose cable, or RAM that needs reseating. Always start with the simplest checks.

  > **⚠️ What "No Display" is NOT:** It does NOT automatically mean your computer is broken. It rarely means the CPU or motherboard is dead. Most of the time it's a loose connection or a RAM issue.

  Now that we've handled a complete black screen, let's talk about a different problem — the computer turns on but feels like it's moving through honey.

---

### 🐢 Computer Hang and Slow Performance

  Your computer works, but it's painfully slow. Programs take forever to open. The mouse stutters. This is the most common complaint in any office.

  **Step 1: Check what's using resources (Task Manager)**

  Press `Ctrl + Shift + Esc` to open Task Manager. Click the **Processes** tab. Look at these columns:

  | Column | What It Shows | Danger Sign |
  |---|---|---|
  | **CPU** | How much brain power is being used | Consistently 90-100% → something is stuck |
  | **Memory (RAM)** | How much workspace is being used | 80-100% → too many programs open |
  | **Disk** | How much storage drive is being accessed | 100% for no reason → possible problem |

  > **⚠️ Malware can look like a normal process.** If you see a process with a weird name (random letters) using high CPU, run a virus scan with Windows Defender (built into Windows).

  **Step 2: Common fixes for a slow computer**

  | Problem | Fix |
  |---|---|
  | **Too many startup programs** | Task Manager → Startup tab → Disable programs you don't need at startup (Skype, Spotify, etc.) |
  | **Full hard drive** | Check C: drive. If less than 10% free → delete temp files, move data to external drive |
  | **Too many browser tabs** | Each tab uses RAM. Close tabs you're not using. |
  | **Virus / malware** | Run Windows Defender full scan (Settings → Update & Security → Windows Security) |
  | **Need more RAM** | If Task Manager shows 80%+ RAM consistently → time to upgrade from 4GB to 8GB |
  | **HDD is too old** | If your computer has an old HDD (not SSD), even a fresh Windows install will be slow. Upgrade to SSD. |

  **Quick cleanup steps:**
  1. Press `Windows + R`, type `cleanmgr`, press Enter → Disk Cleanup
  2. Select files to delete (temporary files, recycle bin, thumbnails)
  3. Click "Clean up system files" for even more space
  4. Restart the computer — many issues are fixed by a simple restart

  > **💡 The "3-second rule":** If your computer takes more than 3 seconds to respond to a click, something is wrong. A healthy computer should feel snappy.

  So your computer's working, but slow. What about when a specific component stops working entirely? Let's start with the most basic input devices.

---

### ⌨️ Keyboard or Mouse Not Working

  You move the mouse but nothing happens. You type but no letters appear. Before you panic, try these checks.

  **Step-by-step diagnosis:**

  | Step | What to Check | What to Do |
  |---|---|---|
  | 1 | **Is it connected?** | Check the USB/PS2 connection. Try a different USB port. |
  | 2 | **Wired or wireless?** | For wireless: check batteries. For wired: check if the cable is damaged. |
  | 3 | **Does it work on another computer?** | If yes → your computer's port/driver is the problem. If no → the device itself is dead. |
  | 4 | **Device Manager check** | Right-click Start → Device Manager. Look for yellow exclamation marks under "Keyboards" or "Mice." |
  | 5 | **Restart the computer** | A simple restart fixes many driver issues. |
  | 6 | **Uninstall and reinstall driver** | Device Manager → right-click device → Uninstall → restart. Windows will reinstall automatically. |

  **For USB ports not working:**
  - Try a different USB port (front vs back panel)
  - Back panel ports connect directly to the motherboard — use those for troubleshooting
  - If no USB ports work → could be a motherboard driver issue or dead chipset

  > **💡 Pro tip:** Keep a spare wired keyboard and mouse in your desk drawer. When troubleshooting, wired devices are more reliable than wireless ones (no battery issues, no pairing problems).

  Keyboards and mice are simple devices. Printers are a whole different challenge.

---

### 🖨️ Printer Not Printing

  Printers are probably the most-troubleshot device in any office. They have a special talent — not working at the worst possible time.

  **Step-by-step diagnosis:**

  | Step | What to Check | What to Do |
  |---|---|---|
  | 1 | **Is the printer on?** | Check power LED. If off, press power button. Check power cable connection. |
  | 2 | **Is there paper?** | Open paper tray. Add paper if empty. |
  | 3 | **Check for paper jam** | Open all access panels. Gently pull any stuck paper in the direction it was going (not backward). |
  | 4 | **Is it online?** | Go to Settings → Printers & Scanners → click printer → "Use Printer Online" if it shows "Offline." |
  | 5 | **Clear print queue** | Settings → Printers → Open queue → Cancel all documents. Sometimes a stuck document blocks everything. |
  | 6 | **Check ink/toner** | Printer's display panel or companion software shows ink/toner levels. Replace if empty. |
  | 7 | **Reinstall driver** | Download the latest driver from the manufacturer's website. Run the installer. |
  | 8 | **Restart everything** | Turn off printer and computer. Turn on printer first, then computer. This clears communication errors. |

  **The biggest difference between Inkjet and Laser troubleshooting:**
  - **Inkjet:** Problems are usually empty ink cartridges or clogged print heads
  - **Laser:** Problems are usually paper jams, empty toner, or heating unit failure

  > **💡 The "Unplug and wait" trick:** Sometimes the printer's internal memory gets stuck. Unplug the power cable from the printer for 30 seconds, plug it back in. This clears the memory and often fixes mysterious issues.

  > **⚠️ Never pull jammed paper backward:** Always pull in the direction the paper was moving (usually upward or forward). Pulling backward can damage the printer's rollers.

  Every problem we've covered so far has been something you can see or touch. But computers have another way of telling you something is wrong — through sounds.

---

### 🔊 Beep Codes — What Your Computer Is Trying to Tell You

  When you turn on a computer, it runs a POST (Power On Self Test). If something is wrong, it beeps. The pattern of beeps tells you exactly which component has failed.

  **Common beep patterns and their meanings:**

  | Beep Pattern | What It Means | What to Do |
  |---|---|---|
  | **1 short beep** | ✅ System OK — booting normally | Nothing — this is good news! |
  | **No beep, no display** | ❌ Dead motherboard, CPU, or PSU | Check power supply, motherboard connections |
  | **Continuous long beeps** | ⚠️ RAM not detected | Reseat RAM, clean contacts, try one stick at a time |
  | **1 long + 2 short beeps** | ⚠️ GPU / display error | Reseat graphics card, check monitor cable |
  | **Continuous short beeps** | ⚠️ Power supply issue | Check SMPS connections, replace PSU if needed |
  | **3 long beeps** | ⚠️ Keyboard error | Check keyboard connection, try a different keyboard |
  | **1 long + 3 short beeps** | ⚠️ No keyboard detected | Same as above — keyboard issue |

  ![BIOS Beep Codes — What Do They Mean?](/diagrams/iknowcomputers/beep-codes.svg)

  > **💡 Beep codes vary by manufacturer.** The table above covers the most common patterns for AMI and Award BIOS (the most common BIOS brands). If you're unsure, search: "[motherboard brand] beep codes" on Google.

  > **⚠️ What Beep Codes are NOT:** They're NOT a complete diagnosis. They're hints that point you in the right direction. For example, a "RAM error" beep might be caused by dusty RAM contacts — not necessarily a dead RAM stick.

---

### 🧠 General Troubleshooting Mindset

  When any computer problem appears, follow this order:

  1. **Don't panic.** Most problems have simple fixes.
  2. **Start with the simplest possibility.** Check cables, power, connections.
  3. **Isolate the problem.** Does this happen with all programs? On all computers? Since when?
  4. **Test one thing at a time.** Change only one variable, then test. This tells you exactly what fixed it.
  5. **Restart before calling for help.** A restart fixes 70% of computer problems.
  6. **Google the exact error message.** Copy-paste the error into Google. Someone has had this problem before.
  7. **Know when to call a professional.** If you've tried everything and the problem persists, it might be a hardware failure that needs a technician.

---

### 🧠 Chapter Summary

> ✅ **No Display:** Check power → check cable → reseat RAM → reseat GPU → clear CMOS. Most fixes are simple connections.  
> ✅ **Slow computer:** Open Task Manager → check CPU/RAM/Disk usage → disable startup programs → run Disk Cleanup → upgrade to SSD.  
> ✅ **Keyboard/Mouse not working:** Check connection → try another port → test on another computer → reinstall driver.  
> ✅ **Printer not printing:** Check power → paper → jam → online status → clear queue → reinstall driver → restart both devices.  
> ✅ **Beep codes:** 1 short = OK. Long beeps = RAM. 1 long + 2 short = GPU. No beep = motherboard/PSU.  
> ✅ **Troubleshooting mindset:** Start simple, isolate the problem, test one thing at a time, restart before giving up, and Google error messages.

---

### 🎯 Real Task

1. **Practice Task Manager diagnosis:** Open Task Manager on your computer. Identify which process is using the most CPU, most RAM, and most Disk. Disable one unnecessary startup program.
2. **Printer drill (if you have access):** Go to Settings → Printers & Scanners. Open your printer's queue. Try cancelling a document. Check if the printer is "Online" or "Offline."
3. **Memorize the beep codes:** Cover the "What It Means" column in the beep codes table with your hand. Look at the beep pattern and try to recall what it means. Do this 3 times until you remember: 1 short = OK, long beeps = RAM, 1 long+2 short = GPU, no beep = motherboard/PSU.

> **Next chapter:** You now have a complete understanding of computer hardware — from the internal CPU to the external printer, plus how to fix common problems. This knowledge makes you a valuable computer operator. Now let's move to Module 1, where you'll learn about operating systems, files, folders, and keyboard shortcuts that will make you faster at your daily work. 🚀
