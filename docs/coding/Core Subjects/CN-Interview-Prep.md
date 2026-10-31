# Computer Networks — Interview Prep (Deep Dive)

> Target: Full-stack developer roles, Gurgaon, 5–30 LPA range
> Context: This subject connects most directly to web dev — everything you do daily, API calls, WebSockets (the Upstox one), voice streaming in DukaanOS/trading bot, all of it is concepts from here. So no deep cramming — build the "I've already used this" understanding.

---

## 1. OSI Model (Remember the names, not the deep details)

7 layers — the conceptual model of how data travels from one device to another.

| Layer | Name | Job (one-liner) |
|---|---|---|
| 7 | Application | User-facing protocols (HTTP, FTP, SMTP) |
| 6 | Presentation | Data format, encryption/decryption |
| 5 | Session | Establishes/maintains connections |
| 4 | Transport | Reliable delivery (TCP) or fast delivery (UDP) |
| 3 | Network | Routing — decides the data's path (IP) |
| 2 | Data Link | Physical addressing (MAC address) |
| 1 | Physical | Actual cables, signals, hardware |

**Memory trick**: "**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing" (Application → Physical, top to bottom)

**How deep in interviews**: Just be able to say the layer names in order and which layer HTTP/TCP/IP belong to — that's enough. Deep questions on the OSI model are rare for full-stack roles.

---

## 2. TCP vs UDP (Very common — and practically relevant for you)

| | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented (handshake first) | Connectionless (send data directly) |
| Reliability | Guaranteed delivery, order maintained | No guarantee — packet loss possible |
| Speed | A bit slow (reliability overhead) | Fast |
| Use case | Web browsing, file transfer, email — where data must arrive complete and in order | Video streaming, gaming, live data feeds — where speed matters and some data loss is okay |

**3-Way Handshake (how a TCP connection is formed)**:
1. Client → Server: **SYN** ("I want to connect")
2. Server → Client: **SYN-ACK** ("Okay, I'm ready")
3. Client → Server: **ACK** ("Confirmed, connection established")

**Direct relevance to your context**: Your options trading bot uses **Upstox WebSocket** — WebSocket is built on top of TCP (reliable, ordered connection needed for tick data, since price data must not be missed). If an interviewer asks "Is WebSocket TCP or UDP," confidently say **TCP-based** — because reliability is needed for real-time trading data.

---

## 3. HTTP vs HTTPS

**HTTP**: Data is transferred in plain text — anyone in between can intercept and read it.

**HTTPS**: HTTP + **SSL/TLS encryption**. Data goes in encrypted form, so it's secure.

### SSL/TLS Handshake (basic idea, no deep math)
1. Client tells the server "I want an HTTPS connection"
2. Server sends its **SSL certificate** (which contains the public key)
3. Client verifies the certificate (is it signed by a trusted authority?)
4. Both decide on a **symmetric session key** (for encrypted communication) — starts with asymmetric (public/private key), switches to symmetric for speed

**Interview tip**: For *"How does HTTPS secure things?"* — "Encryption happens through SSL/TLS certificates, so even if someone intercepts the data they can't read it because it's encrypted" — that's enough. Certificate authorities, deep details of asymmetric vs symmetric encryption are rarely asked at junior/mid roles.

---

## 4. DNS (Domain Name System)

**What it does**: Converts a domain name (like `trishulinsurance.in`) into an IP address — because computers understand IP addresses, not domain names.

**Step-by-step (when you type a URL in the browser)**:
1. Browser cache check — already know the IP?
2. If not, **OS cache** check
3. If not, **DNS Resolver** (ISP's) queries
4. Resolver asks the **Root DNS Server**
5. Root server tells which **TLD server** (.in, .com) to ask
6. TLD server tells which **Authoritative DNS server** (the domain's actual owner server) to ask
7. Authoritative server returns the IP address
8. Browser connects to that IP

**Direct relevance to your work**: Trishul Insurance's domain is `trishulinsurance.in` (bought from Hostinger), and you need to connect DNS to the Vercel/GitHub deployment. That's exactly setting DNS records (A record, CNAME):
- **A Record**: Points a domain directly to an IP address
- **CNAME Record**: Points a domain to another domain (like Vercel's `cname.vercel-dns.com`) — generally CNAME is used for Vercel deployments

**In interviews you can say**: "I recently connected a client project (Trishul Insurance) domain from Hostinger to a Vercel deployment through DNS records" — showing real practical experience is stronger than theory.

---

## 5. REST API Basics (Most relevant to your daily work)

**REST** = Representational State Transfer — an architecture style for building APIs, where resources (data) are accessed through URLs, and operations are defined with HTTP methods.

### HTTP Methods

| Method | Job | Example |
|---|---|---|
| **GET** | Fetch data (read-only, no change) | `GET /products` — fetch all products |
| **POST** | Create new data | `POST /orders` — create a new order |
| **PUT** | Update/replace the whole resource | `PUT /products/101` — replace the whole product |
| **PATCH** | Update only a part of the resource | `PATCH /products/101` — update only the price |
| **DELETE** | Delete the resource | `DELETE /orders/55` — delete the order |

**PUT vs PATCH difference (common interview question)**: PUT replaces the whole object (if a field is missing it becomes null/default), PATCH updates only the fields you send.

### HTTP Status Codes (remember the categories)

| Range | Meaning | Common codes |
|---|---|---|
| 2xx | Success | `200 OK`, `201 Created`, `204 No Content` |
| 3xx | Redirection | `301 Moved Permanently`, `304 Not Modified` |
| 4xx | Client error (mistake in your request) | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` |
| 5xx | Server error (mistake on server side) | `500 Internal Server Error`, `503 Service Unavailable` |

**401 vs 403 (common confusion, asked in interviews)**:
- **401 Unauthorized**: You are not authenticated (not logged in / invalid token)
- **403 Forbidden**: You are authenticated, but you don't have permission to access this resource

**DukaanOS/TradeStack angle**: When you build Next.js API routes — `GET /api/products` (fetch), `POST /api/orders` (create) — these are exactly the REST principles you already use in practice.

---

## 6. Client-Server Model (Basic, quick)

**Client**: Sends the request (browser, mobile app, your Next.js frontend)
**Server**: Processes the request, sends the response (your backend — Next.js API routes / FastAPI)

The entire web architecture is based on this — the client never touches the database directly, always through the server.

---

## 7. WebSockets (Bonus — directly connects to your real project)

**REST API limitation**: The client has to send a request every time to get new data (polling).

**WebSocket**: A **persistent, two-way connection** between client and server — the server can push data to the client without a request.

**Why it's essential for your trading bot**: Stock prices change in real-time — if you used a REST API (polling every second), it would be very inefficient and slow. With WebSocket, the Upstox server pushes tick data directly as soon as the price changes.

**In interviews you can say**: "I built an options trading bot that receives real-time tick data via Upstox WebSocket — I used WebSocket instead of REST polling because we need sub-second latency for price updates."

---

## Quick Revision Checklist (before interview)

- [ ] OSI 7 layers — names in order
- [ ] TCP vs UDP — difference + when to use which (WebSocket example ready)
- [ ] HTTP vs HTTPS — one-line role of SSL/TLS
- [ ] DNS — step-by-step flow (use your Trishul Insurance domain example)
- [ ] REST — HTTP methods (GET/POST/PUT/PATCH/DELETE) + PUT vs PATCH
- [ ] Status codes — 2xx/3xx/4xx/5xx categories + 401 vs 403
- [ ] WebSocket vs REST — when to use which (keep your trading bot example ready)

---

## Practice Approach

1. This subject should be the **easiest** for you since you use it practically every day — just connect the terminology to your work.
2. Keep 2 real examples ready for interviews: (1) DNS/Vercel deployment (Trishul Insurance), (2) WebSocket real-time data (trading bot). The "I've done this" confidence beats theory.
3. When confident, tell me — I'll create the OS (last subject) file.