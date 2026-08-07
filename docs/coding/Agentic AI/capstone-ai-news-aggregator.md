# Capstone Project — AI News Aggregator (100% Free Stack)

> Phase 8 Capstone — combines everything from Phase 1–7 into one real, deployed, scheduled multi-agent system.

## 1. What You're Building

A system that runs once a day, automatically:

1. **Scrapes** new content from a few sources (YouTube channel RSS, Anthropic blog, OpenAI blog)
2. **Stores** it in a Postgres database
3. Runs an **Aggregator Agent** that ranks the new items based on a profile you define ("I care about agentic AI, tool calling, MCP")
4. Runs a **Digest Agent** that writes a short, human-readable daily summary from the top-ranked items
5. **Deploys** for free and **runs on a schedule** without you touching it

This is the same shape as the YouTube video's project — just rebuilt on a fully free stack instead of paid APIs.

---

## 2. The Free Stack

| Piece | Tool | Why |
|---|---|---|
| LLM (both agents) | **Groq** (Llama 3.3 70B / GPT-OSS 120B) | Free tier, no card, fast, plenty of quota for 1 run/day |
| Database | **Supabase** (Postgres) | Free tier, visual table editor, easy for someone new to backend |
| Scraping | **RSS feeds** + `rss-parser` (npm) | No API keys needed for most sources |
| Backend runtime | **Node.js** | Matches what you already know from Phase 3–4 |
| Hosting | **Render** (free web service or cron job) | Free tier, matches original video's platform |
| Scheduling | **cron-job.org** (free) OR **GitHub Actions** (free, scheduled workflow) | Render's free tier sleeps — an external pinger or GH Actions cron is more reliable than Render's own free cron for daily jobs |

**No credit card required anywhere in this list.**

---

## 3. Prerequisites (before starting the capstone)

You should already have finished, from your own course:

- Phase 3 (real API calls, messages array)
- Phase 4 (tool calling, the agent loop)
- Phase 5 (memory/context, system prompts)
- Basic backend concepts (routes, async/await, environment variables) — even if still learning, this is enough

New concept introduced here: **Databases 101** — see Section 6.

---

## 4. Project Phases

### Phase A — Setup (Day 1)
- [ ] Create free Groq account → get `GROQ_API_KEY`
- [ ] Create free Supabase project → get `DATABASE_URL`
- [ ] Create a new Node.js project, install: `pg` or `drizzle-orm`, `rss-parser`, `dotenv`, `groq-sdk` (or plain `fetch` with OpenAI-compatible endpoint)
- [ ] `.env` file with your keys (never commit this)

### Phase B — Scraping Pipeline (Day 2–3)
Build one small module per source. Each module's job: fetch new items, normalize them into one shape.

```
{
  source: "youtube" | "anthropic" | "openai",
  title: string,
  url: string,
  published_at: date,
  raw_content: string   // transcript snippet or blog excerpt
}
```

- YouTube: use the channel's RSS feed URL (`https://www.youtube.com/feeds/videos.xml?channel_id=...`) — free, no API key
- Anthropic / OpenAI blogs: most have RSS too; if not, scrape the blog listing page with `cheerio`
- Write each source as its own file: `scrapers/youtube.js`, `scrapers/anthropic.js`, `scrapers/openai.js`

### Phase C — Database (Day 3–4)
See Section 6 for schema. Core idea: one `articles` table. Insert new scraped items, skip duplicates (check by `url`).

### Phase D — Aggregator Agent (Day 5)
- Input: today's new rows from `articles` where `ranked = false`
- Tool/prompt: given your profile ("interested in: agentic AI, tool calling, MCP, multi-agent systems"), score each item 1–10 and explain why in one line
- Output: update each row with `score` and `reason`, set `ranked = true`

This reuses your **Phase 4 tool-calling pattern** directly — the agent can be given a `score_article` tool instead of free-text output, which makes results easier to store.

### Phase E — Digest Agent (Day 5–6)
- Input: top 5–8 articles by score from today
- Task: write a short markdown digest — 1 paragraph overview + bullet per article
- Output: save as markdown file or insert into a `digests` table

### Phase F — Deployment + Scheduling (Day 7)
- Push to GitHub
- Deploy as a Render **Background Worker** or simple Node script (not a web server — you don't need one for a daily job)
- Trigger daily via **GitHub Actions scheduled workflow** (`cron: "0 7 * * *"` = 7am daily) — this is fully free and doesn't depend on Render staying awake
- Store secrets (`GROQ_API_KEY`, `DATABASE_URL`) as GitHub Actions secrets

### Phase G — Refactor (Day 8)
- Split into clear folders: `scrapers/`, `agents/`, `db/`, `index.js`
- Add basic error handling (what happens if a source is down or Groq rate-limits you?)
- Add a `README.md` explaining the system — this is what you link on your resume/LinkedIn

---

## 5. Multi-Agent Flow (matches Phase 2's ReAct pattern)

```
[Scrapers] → [Postgres: new articles]
                    ↓
         [Aggregator Agent] — Think: "does this match my profile?"
                             — Act: call score_article tool
                             — Observe: score saved to DB
                    ↓
         [Digest Agent] — Think: "what's the story across top articles?"
                        — Act: generate markdown digest
                        — Observe: digest saved / emailed
```

---

## 6. Databases 101 (new topic for this capstone)

You don't need deep SQL mastery — just this much:

**Core table:**

```sql
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  source TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT UNIQUE NOT NULL,
  published_at TIMESTAMP,
  raw_content TEXT,
  score INT,
  reason TEXT,
  ranked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE digests (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Concepts to know:**
- `UNIQUE` on `url` = your dedup mechanism (insert fails silently if already scraped — use `ON CONFLICT DO NOTHING`)
- An **ORM** (Prisma or Drizzle) lets you write `db.articles.create({...})` instead of raw SQL — recommended since you're new to backend
- Supabase gives you a free visual table editor — you can literally watch rows appear as you test, which helps a lot when learning

---

## 7. Groq Setup Notes

- Sign up at console.groq.com (free, no card)
- Use `llama-3.3-70b-versatile` for the Aggregator (needs reasoning/scoring) and a smaller/faster model for the Digest if you want speed
- Free tier: ~30 requests/minute, ~1,000 requests/day per model — a daily job using maybe 20–30 calls total is nowhere near the limit
- Groq is OpenAI-compatible, so if you used the OpenAI SDK style in earlier phases, the code barely changes — just swap the base URL and key

---

## 8. What Goes on Your Resume/LinkedIn After

> "Built and deployed an autonomous multi-agent system that scrapes, ranks, and summarizes AI news daily — using tool-calling agents, a Postgres database, and scheduled cloud deployment, on a fully open-source/free stack."

This is stronger than the earlier Phase 6 projects because it has: persistence (DB), multiple cooperating agents, and a real deployment/schedule — the three things that separate a toy script from a "real system" in an interviewer's eyes.

---

## 9. Suggested Timeline

| Day | Focus |
|---|---|
| 1 | Setup — accounts, keys, empty project |
| 2–3 | Scraping pipeline |
| 3–4 | Database + Databases 101 |
| 5 | Aggregator Agent |
| 5–6 | Digest Agent |
| 7 | Deployment + scheduling |
| 8 | Refactor + README + write LinkedIn post |
