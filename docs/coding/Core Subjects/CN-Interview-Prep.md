# Computer Networks — Interview Prep (Deep Dive)

> Target: Full-stack developer roles, Gurgaon, 5–30 LPA range
> Context: Ye subject sabse directly web dev se connect hota hai — jo bhi tum daily API calls, WebSockets (Upstox wala), voice streaming karte ho DukaanOS/trading bot mein, sab isi ke concepts hain. Isliye deep cram nahi, "maine already use kiya hai" wali understanding banani hai.

---

## 1. OSI Model (Naam yaad rakho, deep nahi)

7 layers — data kaise ek device se dusre tak jaata hai, iska conceptual model.

| Layer | Naam | Kaam (one-liner) |
|---|---|---|
| 7 | Application | User-facing protocols (HTTP, FTP, SMTP) |
| 6 | Presentation | Data format, encryption/decryption |
| 5 | Session | Connections establish/maintain karta hai |
| 4 | Transport | Reliable delivery (TCP) ya fast delivery (UDP) |
| 3 | Network | Routing — data ka path decide karta hai (IP) |
| 2 | Data Link | Physical addressing (MAC address) |
| 1 | Physical | Actual cables, signals, hardware |

**Yaad rakhne ka trick**: "**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing" (Application → Physical, top to bottom)

**Interview mein kitna deep**: Bas layers ke naam order mein bol pao aur HTTP/TCP/IP kaunsi layer pe hain, itna kaafi hai. Full-stack role mein OSI model pe deep questions rare hain.

---

## 2. TCP vs UDP (Very common — practical bhi relevant hai tumhare liye)

| | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented (handshake hota hai pehle) | Connectionless (seedha data bhej do) |
| Reliability | Guaranteed delivery, order maintained | No guarantee — packet loss ho sakta hai |
| Speed | Thoda slow (reliability ke overhead ki wajah se) | Fast |
| Use case | Web browsing, file transfer, email — jahan data sahi order mein poora chahiye | Video streaming, gaming, live data feeds — jahan speed important hai, thoda data loss chalega |

**3-Way Handshake (TCP connection kaise banta hai)**:
1. Client → Server: **SYN** ("connect karna hai")
2. Server → Client: **SYN-ACK** ("theek hai, main ready hoon")
3. Client → Server: **ACK** ("confirm, connection ban gaya")

**Tumhare context mein direct relevance**: Tumhara options trading bot **Upstox WebSocket** use karta hai — WebSocket TCP ke upar bana hota hai (reliable, ordered connection chahiye tick data ke liye, kyunki price data missed nahi hona chahiye). Agar interviewer poochein "WebSocket TCP hai ya UDP," confidently bolo **TCP-based** — kyunki reliability chahiye real-time trading data mein.

---

## 3. HTTP vs HTTPS

**HTTP**: Data plain text mein transfer hota hai — koi bhi beech mein intercept kar ke padh sakta hai.

**HTTPS**: HTTP + **SSL/TLS encryption**. Data encrypted form mein jaata hai, isliye secure hai.

### SSL/TLS Handshake (basic idea, deep math nahi)
1. Client server se bolta hai "HTTPS connection chahiye"
2. Server apna **SSL certificate** bhejta hai (jisme public key hota hai)
3. Client certificate verify karta hai (trusted authority se signed hai ya nahi)
4. Dono milke ek **symmetric session key** decide karte hain (encrypted communication ke liye) — ye asymmetric (public/private key) se shuru hoke symmetric pe switch hota hai speed ke liye

**Interview tip**: *"HTTPS kaise secure karta hai?"* — "SSL/TLS certificate ke through encryption hoti hai, data ko intercept karke bhi padh nahi sakte kyunki encrypted hai" — itna kaafi hai. Certificate authority, asymmetric vs symmetric encryption ka deep detail junior/mid role mein rare poochte hain.

---

## 4. DNS (Domain Name System)

**Kya karta hai**: Domain name (jaise `trishulinsurance.in`) ko IP address mein convert karta hai — kyunki computers domain names nahi, IP addresses samajhte hain.

**Step-by-step (jab tum browser mein URL type karte ho)**:
1. Browser cache check karta hai — pehle se IP pata hai kya?
2. Nahi to **OS cache** check hota hai
3. Nahi to **DNS Resolver** (ISP ka) query karta hai
4. Resolver **Root DNS Server** se pucchta hai
5. Root server bata deta hai konsa **TLD server** (`.in`, `.com` ke liye) poochna hai
6. TLD server bata deta hai konsa **Authoritative DNS server** (domain ka actual owner server) poochna hai
7. Authoritative server IP address deta hai
8. Browser us IP pe connect karta hai

**Direct relevance tumhare kaam se**: Trishul Insurance ka domain `trishulinsurance.in` hai (Hostinger se khareeda), aur tumhe DNS ko Vercel/GitHub deployment se connect karna hai. Ye exactly DNS records (A record, CNAME) set karne ka kaam hai:
- **A Record**: Domain ko directly ek IP address se point karta hai
- **CNAME Record**: Domain ko dusre domain (jaise Vercel ka `cname.vercel-dns.com`) se point karta hai — Vercel deployments mein generally CNAME use hota hai

**Interview mein bol sakte ho**: "Maine recently ek client project (Trishul Insurance) mein Hostinger domain ko Vercel deployment se DNS records ke through connect kiya hai" — real practical experience dikhana strong hota hai theory se zyada.

---

## 5. REST API Basics (Sabse zyada relevant tumhare daily kaam se)

**REST** = Representational State Transfer — ek architecture style APIs banane ke liye, jahan resources (data) ko URLs ke through access karte hain, aur HTTP methods se operations define karte hain.

### HTTP Methods

| Method | Kaam | Example |
|---|---|---|
| **GET** | Data fetch karna (read-only, koi change nahi) | `GET /products` — sab products laao |
| **POST** | Naya data create karna | `POST /orders` — naya order banao |
| **PUT** | Poora resource update/replace karna | `PUT /products/101` — poora product replace karo |
| **PATCH** | Resource ka sirf ek part update karna | `PATCH /products/101` — sirf price update karo |
| **DELETE** | Resource delete karna | `DELETE /orders/55` — order delete karo |

**PUT vs PATCH difference (common interview question)**: PUT poora object replace karta hai (agar koi field miss ho to wo null/default ho jayega), PATCH sirf jo fields bheje hain wahi update karta hai.

### HTTP Status Codes (yaad rakho categories)

| Range | Matlab | Common codes |
|---|---|---|
| 2xx | Success | `200 OK`, `201 Created`, `204 No Content` |
| 3xx | Redirection | `301 Moved Permanently`, `304 Not Modified` |
| 4xx | Client error (tumhari request mein galti) | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` |
| 5xx | Server error (server ki taraf se galti) | `500 Internal Server Error`, `503 Service Unavailable` |

**401 vs 403 (common confusion, interview mein poochte hain)**:
- **401 Unauthorized**: Tum authenticated nahi ho (login nahi kiya / token invalid)
- **403 Forbidden**: Tum authenticated ho, but is resource ko access karne ki permission nahi hai

**DukaanOS/TradeStack angle**: Jab tum Next.js API routes banate ho — `GET /api/products` (fetch), `POST /api/orders` (create) — ye exactly REST principles hain jo tum already use kar rahe ho practically.

---

## 6. Client-Server Model (Basic, quick)

**Client**: Request bhejta hai (browser, mobile app, tumhara Next.js frontend)
**Server**: Request process karta hai, response bhejta hai (tumhara backend — Next.js API routes / FastAPI)

Web ka pura architecture isi pe based hai — client kabhi directly database ko touch nahi karta, hamesha server ke through.

---

## 7. WebSockets (Bonus — tumhare real project se directly connect)

**REST API ki limitation**: Client ko har baar khud request bhejni padti hai naya data lene ke liye (polling).

**WebSocket**: Ek **persistent, two-way connection** client aur server ke beech — server khud bhi client ko data push kar sakta hai bina request ke.

**Kyun zaroori tumhare trading bot mein**: Stock prices real-time change hoti hain — agar REST API use karte (har second poll karte), bahut inefficient aur slow hota. WebSocket se Upstox server directly tick data push karta hai jaise hi price change hoti hai.

**Interview mein bol sakte ho**: "Maine ek options trading bot banaya hai jo Upstox WebSocket se real-time tick data receive karta hai — REST polling ke bajaye WebSocket isliye use kiya kyunki humein sub-second latency chahiye price updates ke liye."

---

## Quick Revision Checklist (before interview)

- [ ] OSI 7 layers — naam order mein
- [ ] TCP vs UDP — difference + kab kaunsa (WebSocket example ready rakho)
- [ ] HTTP vs HTTPS — SSL/TLS ka one-line role
- [ ] DNS — step-by-step flow (apna Trishul Insurance domain example use karo)
- [ ] REST — HTTP methods (GET/POST/PUT/PATCH/DELETE) + PUT vs PATCH
- [ ] Status codes — 2xx/3xx/4xx/5xx categories + 401 vs 403
- [ ] WebSocket vs REST — kab kaunsa (apna trading bot example ready rakho)

---

## Practice Approach

1. Ye subject tumhare liye sabse **easy** hona chahiye kyunki tum daily practically use kar rahe ho — bas terminology ko apne kaam se connect karo.
2. Apne 2 real examples ready rakho interview ke liye: (1) DNS/Vercel deployment (Trishul Insurance), (2) WebSocket real-time data (trading bot). Ye "maine kiya hai" wala confidence deta hai.
3. Jab confident ho, mujhe bolna — OS (last subject) ki file banata hoon.
