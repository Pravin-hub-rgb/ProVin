# 🚀 Project 3 — TalkSpace: Real-time Team Chat
### The Small Brother of Slack — Rooms, Messages, Online Status

---

## 💬 The Brief — What the Client Said

> *"I need a simple chat app — for teams. There'll be separate rooms/channels.
> Messages should show in real-time — WhatsApp-like feel. Online/offline status too.
> File sharing we'll add later. Right now just text messaging."*

Okay. This is fundamentally different from the first two projects. There's a **real-time** element here — which completely changes the architecture. The HTTP request-response model doesn't work here. A persistent connection is needed.

---

## 📋 Step 1 — PRD Lite

```
PROJECT NAME  : TalkSpace
TYPE          : Real-time Web Application
ONE LINE      : "This is a real-time team chat app with channels
                 and direct messages."

TARGET USER:
  Primary   → Small to mid-size teams (5-50 people)
              Technical or semi-technical users
  Use case  → Internal team communication

CORE FEATURES (MVP):
  [ ] Auth (login/signup)
  [ ] Create / join rooms (channels)
  [ ] Send & receive messages in real-time
  [ ] Online / offline / away status
  [ ] Message history (last 50 messages on load)
  [ ] Direct Messages (1-on-1)

STRETCH (V2):
  [ ] File/image sharing
  [ ] Message reactions (emoji)
  [ ] Read receipts
  [ ] Push notifications
  [ ] Search messages

OUT OF SCOPE:
  ❌ Voice / video calls
  ❌ End-to-end encryption (basic auth security enough for V1)
  ❌ Mobile app
  ❌ Bots / integrations
```

---

## 🏗️ Step 2 — Architecture Decisions

Here the **real-time** question must be solved first — everything else depends on it.

---

**Real-time Solution → Socket.io ✅**

```
Problem: HTTP request-response works once.
In chat, the server needs to push to the CLIENT without a request.

Options evaluated:

Option A: Polling (React Query refetchInterval)
→ Ask server every 2 seconds "any new message?"
→ Pros: Simple setup, uses HTTP only
→ Cons: Delay (2 sec), unnecessary load on server,
        doesn't feel "real-time"
→ Verdict: Fine for task manager, not for chat

Option B: Server-Sent Events (SSE)
→ Server opens connection once, continuously pushes
→ Pros: One-directional real-time, simple
→ Cons: Only server → client direction, separate HTTP request needed for client → server.
        Chat needs both directions.
→ Verdict: Perfect for notifications, half-solution for chat

Option C: WebSockets (native)
→ Bidirectional persistent connection
→ Pros: True real-time, full duplex
→ Cons: Manual reconnection logic, room management, scaling complex

Option D: Socket.io ✅ (WebSocket wrapper)
→ Built on WebSocket, with fallbacks
→ Automatic reconnection built-in
→ Room/channel concept built-in (socket.join('room-id'))
→ Easy to broadcast to specific rooms
→ Scaling: Can scale across multiple servers via Redis adapter

Decision: Socket.io — industry standard for real-time chat.
```

---

**Database → MongoDB ✅ (not PostgreSQL)**

```
This is an important decision — first two projects used PostgreSQL.

Why MongoDB here?
→ Message structure is fluid:
  Basic message: { text, sender, room, timestamp }
  Later attach file: { text, sender, room, timestamp, file: { url, type, size } }
  Later add reactions: { ..., reactions: [{ emoji, users: [] }] }

→ These schema changes are migration-free in MongoDB
→ In PostgreSQL, every change needs ALTER TABLE + migration

→ Messages naturally fit document format
→ Queries are mostly: "Last 50 messages of a room" — simple, document-based

→ Message volume will be high — NoSQL scales horizontally easily

Why Redis too?
→ Redis = PERFECT for storing online status
→ "User X is online" — this is temporary data
→ Permanently saving in database is wasteful
→ Redis TTL (time-to-live) feature: when user's socket disconnects,
   status automatically expires
→ Redis Pub/Sub: Broadcast messages across multiple server instances
   (Socket.io uses Redis adapter)
```

---

**Rendering → CSR (Almost Entirely)**

```
Why CSR?
→ Chat app is not for SEO — no indexing needed
→ Highly interactive — real-time updates, typing indicators, online status
→ Dashboard-like interface — user must be logged in

Why not SSR?
→ Chat room content is user-specific — not public
→ Real-time updates can't be handled via SSR (page can't reload)
→ Socket.io client runs in the browser

Still using Next.js because:
→ Auth handling is easy
→ API routes for Socket.io server (or separate Express server)
→ Deployment on Vercel (but Railway is better for Socket.io)
```

---

**Hosting → Railway ✅ (not Vercel)**

```
This is an important point — usually we use Vercel.
But Socket.io won't work on Vercel here. Why?

Vercel = Serverless functions
→ Every request is a separate function call
→ Persistent connections not possible in serverless
→ WebSocket connection = needs persistent connection
→ Socket.io doesn't work properly on Vercel

Railway = Traditional server (always-on)
→ Node.js server runs continuously
→ WebSocket connections can persist
→ Redis can also be hosted on Railway
→ Easy deployment, reasonable pricing
```

---

**Auth → NextAuth (JWT strategy)**

```
Why JWT strategy (not session)?
→ Auth must also be verified on Socket.io connection
→ JWT token can be passed in socket handshake
→ Session-based auth gets complex with sockets

Flow:
→ User logs in → gets JWT token
→ Stored in httpOnly cookie in browser
→ On Socket.io connection, token read from cookie
→ Server verifies → connection allowed
```

---

**State Management → Zustand ✅**

```
Chat app has complex client state:
→ Active room/channel
→ Online users list
→ Draft messages (typing but not sent)
→ Unread message counts per room

React Query is less relevant here because:
→ Messages come via socket, not HTTP fetch
→ Socket events directly update Zustand store

Architecture:
Socket.io event → Zustand store update → React re-render
```

---

## 🗄️ Step 3 — Data Model

```
MongoDB Collections:

USER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_id         ObjectId
name        String
email       String    unique, indexed
password    String    hashed
avatar_url  String    nullable
created_at  Date

ROOM (Channel)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_id         ObjectId
name        String
description String    nullable
type        String    'public' | 'private' | 'direct'
members     [ObjectId]  ← Array of User IDs
created_by  ObjectId   FK → User
created_at  Date

INDEX: members (to find user's rooms)

MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_id         ObjectId
room_id     ObjectId  indexed  ← FK → Room
sender_id   ObjectId  indexed  ← FK → User
text        String
type        String    'text' | 'system'  ← system = "X joined the room"
created_at  Date      indexed

INDEX: { room_id: 1, created_at: -1 }  ← Fast fetch latest messages of a room

Redis Keys:

online_status:{userId}   → "online" | "away"   TTL: 5 minutes
                            (refreshed via heartbeat)
typing:{roomId}          → Set of userIds currently typing
room_members:{roomId}    → Cached member list
```

---

## 📋 Step 4 — Feature Breakdown

```
PHASE 1 — MVP:

  Auth
  ├── [ ] Signup / Login
  ├── [ ] JWT-based auth
  └── [ ] Socket.io handshake auth middleware

  Real-time Core
  ├── [ ] Socket.io server setup
  ├── [ ] Join room event
  ├── [ ] Send message event
  ├── [ ] Receive message event (broadcast to room)
  └── [ ] Disconnect handler (status update)

  Rooms
  ├── [ ] Create room
  ├── [ ] List public rooms
  ├── [ ] Join room
  └── [ ] Room member list

  Messages
  ├── [ ] Send message
  ├── [ ] Real-time delivery
  ├── [ ] Message history (last 50 on load)
  └── [ ] Auto-scroll to latest

  Online Status
  ├── [ ] Set online on connect (Redis)
  ├── [ ] Set offline on disconnect
  ├── [ ] Show online indicator in member list
  └── [ ] Heartbeat (refresh TTL every 4 min)

  Edge Cases
  ├── [ ] Reconnection handling
  ├── [ ] Empty room state
  └── [ ] Message sending failed (network error)

PHASE 2:
  [ ] Typing indicators (X is typing...)
  [ ] Direct Messages (1-on-1)
  [ ] Unread message count badges
  [ ] File/image sharing (Uploadthing)
```

---

## 🎙️ Interview Script — STAR Format

```
SITUATION:
"I built TalkSpace — a real-time team chat application.
The problem was that teams needed a simple, fast internal communication tool
that gives a WhatsApp-like real-time feel without mixing personal/professional messages."

TASK:
"The core challenge was technical — implementing real-time bidirectional communication.
The standard HTTP request-response model doesn't work here."

ACTION:
"Three major technical decisions —

First: Chose Socket.io for real-time.
I first evaluated polling — via React Query's refetchInterval.
That was fine in the task manager, but 2-second delay and server load
weren't acceptable for chat.
Evaluated SSE — but it's only server-to-client direction, chat needs both directions.
Chose Socket.io — WebSocket wrapper with automatic reconnection,
built-in room management, and future scaling possible via Redis adapter.

Second: Chose MongoDB for database — used PostgreSQL in previous projects.
Message schema will change in the future — reactions, files, replies.
MongoDB's flexible schema was a better fit here.
Also used Redis for online status —
user status is temporary, permanently storing in database is wasteful.
Redis TTL feature is perfect — auto-expires on disconnect.

Third: Hosted on Railway, not Vercel.
This was important — Socket.io needs persistent connections.
Vercel is serverless — doesn't support persistent connections.
Railway runs a traditional Node.js server — correct choice for WebSocket."

RESULT:
"The app had real-time messaging, room management, online/offline status.
Sub-100ms message delivery latency in local testing.
Learning: Socket.io and Next.js integration was a bit tricky —
Socket.io server had to run on a separate Express server,
Next.js used only for frontend and API routes.
This separation should have been planned earlier to save time."
```

---

**Next →** `project-04-ecommerce.md` — ShopKaro: E-Commerce Store