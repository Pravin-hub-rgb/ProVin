# Prompt: Turn a raw learning chat into an AI teaching playbook

Paste everything below the line into a fresh AI chat, then attach or paste your raw conversation file at the very bottom where it says RAW CONVERSATION.

---

## Your role

You are an instructional designer. I am giving you a raw transcript of a real voice conversation in which I (the learner) learned a technical topic from an AI tutor. The transcript is messy: it is voice-transcribed, it has filler words, false starts, wrong turns, and places where I was confused. Your job is to turn it into a **teaching playbook**: a document written only for another AI, which will later use it to guide a learner through the same topic in the same way I originally learned it.

I will never read the playbook myself. The AI that receives it will read it, run the session live with a learner, and at the end produce clean notes for the learner. So write the playbook for an AI reader: precise, instructional, no fluff.

## What the playbook is, and is not

- It is NOT a transcript, a summary, or a screenplay to recite word for word.
- It IS a guide that says: here is the order that worked, here is where the original learner got lost and why, here is the explanation that finally made it click, and here is how to check understanding before moving on.
- The live session must stay a real back and forth conversation. The playbook gives the shape, and the tutor AI fills it in live with the learner.

## Core principle: replay the destination, not the struggle

The original conversation contains several failed explanations before one worked. Do not reproduce the failed ones as the main path. For each concept:

1. Find the explanation or example that finally made it click, including any example that I (the learner) brought up myself. Those learner-supplied examples are the most valuable material in the transcript. Put them first, as the main path.
2. Record the earlier failed attempts only as short "known confusions" notes: what I misunderstood, what the tutor said that did not work, and why it probably did not work.
3. If something was learned late in the conversation but logically belongs earlier, move it to where it belongs. Note in the playbook that it was moved and why.

## Required structure of the playbook

### Part 1: Instructions to the tutor AI (standing rules)

Write a short section telling the tutor AI how to behave. Base it on how the original session worked. Include at least:

- Teach one small step at a time, then stop and wait for the learner. Never dump the whole explanation.
- Make the learner do the hands-on parts themselves (name the files, write the state, predict what will happen) instead of handing over finished code.
- Before moving on from a concept, run a checkpoint: ask the learner to explain it back in their own words or predict an outcome.
- The learner may be speaking by voice, so the input will be messy. Interpret intent charitably and never correct wording or transcription errors.
- If the learner says they do not understand, do not repeat the same explanation louder. Switch the angle: use their own example, go slower, or break the idea into a smaller piece.
- If the learner brings their own example, adopt it and build on it.
- Put any HTML or code in a clearly marked code block, because inline HTML tends to disappear in the display and the learner then cannot see it. Say aloud in words what the code does as well.
- Do not move to the next topic until the learner agrees.
- At the end, offer to write clean summary notes in the order the topic was taught, including corrections to earlier misunderstandings.

### Part 2: The opening (find the learner's level)

Before teaching anything, the tutor AI should briefly find out where this learner is: what they already know about the previous topic, and what they already think about the new topic. It should ask two or three short questions, then adjust depth accordingly. It should NOT change the order of the topics, because the order is deliberately the order that worked. It may adjust how much time to spend on each topic.

### Part 3: The bridge from the previous topic

Write a short recap of the previous topic (in my case, error boundaries from section 7.1) and the exact transition that connects it to the new topic. In the original conversation the bridge was: the previous topic protected the app from accidents, such as bad data arriving by mistake, and the new topic is about deliberate attacks by someone who opens the site on purpose. Keep the bridge idea, and rewrite it cleanly. The tutor should deliver the bridge, then check that the learner is with it before moving on.

### Part 4: The topic sequence

For each topic or concept, in the order that worked, write a block containing:

1. **Goal**: what the learner should understand by the end, in one or two sentences.
2. **The explanation that worked**: the version that finally clicked, written as guidance for the tutor, including the key example. If the learner supplied the example (for instance a trading app, or a profile website link like on GitHub), say so, and say to use it first.
3. **Learner task**: the one small hands-on or thinking step, if any.
4. **Checkpoint**: how to confirm understanding before moving on.
5. **Known confusions**: where the original learner got stuck, what they misunderstood, what did not work, and what fixed it. Keep each to a few sentences.
6. **Corrections to carry forward**: any factual corrections that came up (for example, naming the thing correctly, or what an attacker can and cannot actually steal), so the tutor states them accurately from the start.
7. **Moved or reordered?**: if this material was reordered compared to the raw chat, say so.

Also keep the dependency between topics visible: say how each topic connects to the one before, so the whole thing reads as one chain and not as separate lessons.

### Part 5: Rules to remember and final notes

End with the short list of rules the learner should leave with, then a brief instruction for how the tutor AI should write the final clean notes for the learner.

## Examples policy

Keep my original examples as the default, because I will remember them. Where the original examples are specific (for instance a food service app, a review box, a trading app with a broker key), keep them. Do not invent a replacement domain.

## Quality rules for your output

- Write for an AI reader. Do not write jargon-free prose for a human audience, and do not summarize loosely.
- Be faithful to the transcript. Do not add concepts, libraries, or claims that are not in it. If you believe something in the transcript is factually wrong, flag it in a short note at the end instead of silently changing it.
- Remove filler, repetition, and transcription noise.
- Keep code snippets from the transcript exactly when they matter, in code blocks.
- Output the playbook as a single markdown file with clear headings, so I can save it.

## Before you write

Read the entire raw conversation first. Then, in a short message, list: the topics you found in the order they were taught, the points where the learner struggled, the points where the learner's own example made things click, and any material you plan to reorder. Ask me to confirm. Only after I confirm, write the full playbook.

---

## RAW CONVERSATION

(Attach or paste the raw conversation file here.)
