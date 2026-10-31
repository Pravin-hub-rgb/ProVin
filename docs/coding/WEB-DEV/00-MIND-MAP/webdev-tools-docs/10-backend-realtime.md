# 10 — Real-time: Socket.io, Pusher, SSE, Ably

> Umbrella: Backend → Real-time
> Purpose: Instantly updating the client from the server — without page refresh
> Example: Swiggy's "Order picked up", Ola's driver location

---

## Why Real-time Is Different

Normal HTTP:
```
Client → Request → Server → Response → Done
(Server responds only when client asks)
```

Real-time:
```
Server → pushes data to client when something changes
(Client didn't ask — server pushed)
```

---

## Three Approaches

```
1. WebSocket:   Two-way — both client and server can send
2. SSE:         One-way — only server → client
3. Polling:     Client asks repeatedly (fake real-time)
```

---

## Tools

---

### Socket.io
**Tag: 🟢 Most Popular WebSocket | Battle-tested**

```
What it is: WebSocket library — for both client and server
When to use:
  → Two-way communication needed
  → Chat apps
  → Multiplayer games
  → Collaborative tools (like Google Docs)
  → Ola/Uber driver tracking (location updates both ways)

Real app example:
  → Ola: Driver location update → User sees it
  → Chat apps (WhatsApp Web type)
  → Collaborative editors
  → Live auction sites (BidBazaar type)

Code feel:
  // Server
  io.on('connection', (socket) => {
    socket.on('driver-location', (location) => {
      io.to(rideId).emit('location-update', location)
    })
  })

  // Client
  socket.emit('driver-location', { lat: 28.6, lng: 77.2 })
  socket.on('location-update', (location) => updateMap(location))

Fallback:
  → If WebSocket fails → Socket.io automatically switches to polling
  → That's why it's reliable

Cons:
  → Doesn't run on serverless (Vercel) — needs dedicated server
  → Scaling complex (multiple servers → need Redis adapter)

In India: Standard in chat, logistics, ride-sharing apps
```

---

### Pusher
**Tag: 🟢 Managed | Easy | Serverless-friendly**

```
What it is: Managed WebSocket service — no need to run your own server
When to use:
  → Deploying on Vercel (serverless)
  → Don't want to manage Socket.io infrastructure
  → Need to add a quick real-time feature

Difference from Socket.io:
  → Socket.io: Self-hosted — your server
  → Pusher: Managed service — Pusher's server
  → Pusher: Serverless-friendly, pay per connection
  → Socket.io: Free, but you manage infra

Real app example:
  → Notification systems
  → Live activity feeds
  → Collaboration features in SaaS apps

Code feel:
  // Server
  await pusher.trigger('order-updates', 'status-change', {
    orderId: 123, status: 'picked-up'
  })

  // Client
  const channel = pusher.subscribe('order-updates')
  channel.bind('status-change', (data) => updateUI(data))

Cons:
  → Paid service — free tier limited (100 connections)
  → Vendor lock-in

In India: Startups using Vercel + Pusher
```

---

### SSE (Server-Sent Events)
**Tag: 🟢 Built-in | One-way | Simple**

```
What it is: Browser's built-in one-way streaming — server → client only
When to use:
  → Only server → client updates needed (client won't send to server)
  → Live notifications
  → Progress updates (file upload, long processing)
  → AI streaming responses (like ChatGPT)

Difference from Socket.io:
  → SSE: One-way only, runs on HTTP, simpler
  → Socket.io: Two-way, WebSocket protocol, complex

Real app example:
  → ChatGPT's streaming response (text arrives word by word) — SSE
  → Order status updates (server pushes)
  → Live sports scores

In Next.js:
  // API route — SSE response
  export async function GET() {
    const stream = new ReadableStream({
      start(controller) {
        const send = (data) => {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)
        }
        // Send updates
        send({ status: 'processing' })
        setTimeout(() => send({ status: 'done' }), 2000)
      }
    })
    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream' }
    })
  }

Pros:
  → No extra library
  → Runs on HTTP — works on Vercel too
  → Auto-reconnect built into browser

When NOT to use:
  → Client also sends data to server → need WebSocket
```

---

### Ably
**Tag: 🟢 Enterprise Real-time | Managed | Global**

```
What it is: Enterprise-grade managed real-time — Pusher's competitor
When to use:
  → High scale real-time needed
  → Global presence needed (low latency worldwide)
  → Enterprise SLA needed

Difference from Pusher:
  → Ably: More features, better scaling, more expensive
  → Pusher: Simpler, cheaper, good for startups

Real app example:
  → Trading platforms (real-time price updates)
  → Large-scale notification systems

In India: Enterprise / fintech companies
```

---

### Partykit
**Tag: 🔵 New | Cloudflare-based | Collaborative apps**

```
What it is: Built on Cloudflare Durable Objects — collaborative real-time
When to use:
  → Building a Figma-like collaborative tool
  → Real-time on the edge

Status: New — interesting but niche
```

---

## Quick Decision

```
Two-way communication (chat, games, collaborative)?
  → Socket.io (self-hosted) or Ably (managed)

Serverless (Vercel), one-way updates?
  → SSE (free) or Pusher (easy managed)

Quick real-time feature, no infra?
  → Pusher

AI streaming responses?
  → SSE

Enterprise, high scale?
  → Ably
```

---

## India Reality

```
Ride-sharing / Logistics:  Socket.io (two-way location)
Notification systems:      Pusher or SSE
Chat apps:                 Socket.io
AI features:               SSE (streaming)
Enterprise:                Ably
```

---

## Next Doc

`11-backend-email.md` — Email tools — Resend, Nodemailer, SendGrid — how Swiggy's order confirmation email, OTP email is sent.
