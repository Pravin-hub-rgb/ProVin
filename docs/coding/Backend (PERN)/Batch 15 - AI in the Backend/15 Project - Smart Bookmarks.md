# Doc 15 Project — Smart Bookmarks

---

## Where We Left Off

Batch 15 lessons (15.1-15.7) are complete. Now the project: Smart Bookmarks. This adds an AI feature to the Bookmarks App.

---

## Problem — Can You Add an AI Feature Safely?

- **Saving a link queues enrichment:** a short summary and suggested tags, validated against a Zod schema.
- **A streamed "ask about my bookmarks" chat** that uses a tool scoped to the current user.
- **Per-user limits, safe handling of fetched content, and an evaluation script.**

**Done when:** The feature works, one user's data never reaches another through the tool, malformed model output never crashes a request, and he can explain the risks he designed against.

## What It Is NOT

- This is **not** a chatbot — it is a feature on top of bookmarks.
- AI is **not** trusted — validate all output.
- This is **not** for production without limits — set per-user caps.

---

## Common Mistakes

- Putting API key in frontend.
- Trusting model output.
- Giving tools broader access than user.
- No per-user limits.
- Treating fetched pages as trusted instructions.

---

## Try It Yourself

1. Queue enrichment (summary + tags).
2. Build streamed "ask about my bookmarks" chat.
3. Scope tool to current user.
4. Set per-user limits.
5. Write evaluation script.

## Summary

- Smart Bookmarks: AI enrichment + chat.
- Queue enrichment, streamed chat, tool use.
- Per-user limits, safe content handling.
- Evaluation script.

## Next Step

Batch 15 is complete. The backend course is done. Next: resume map and next steps.

---

## Cheat Sheet (Quick Recall)

- Saving a link queues enrichment: a short summary and suggested tags, validated against a Zod schema.
- A streamed "ask about my bookmarks" chat that uses a tool scoped to the current user.
- Per-user limits, safe handling of fetched content, and an evaluation script.