# Doc HTML Media 02 — Video

## Cheat Sheet (Quick Recall)

- `<video>` attributes: `controls`, `autoplay`, `muted`, `loop`, `poster`, `width`, `height`.
- `autoplay` often requires `muted`.
- `poster` = thumbnail image.
- Use `<source>` for multiple formats.

## Where We Are So Far

HTML Media 01 introduced media. Now video details.

## Broader Goal

The overall goal of the HTML section is structure and meaning. Current step: video attributes.

## Main Content

### THINK

Video has many attributes controlling playback. First basic video, then attributes (controls, autoplay, muted, loop, poster), then responsive sizing.

### CONCEPT

```html
<video controls autoplay muted loop poster="thumb.jpg" width="640">
  <source src="video.mp4" type="video/mp4" />
</video>
```

- `controls`: show UI.
- `autoplay`: play automatically (often needs `muted`).
- `muted`: no sound.
- `loop`: repeat.
- `poster`: thumbnail before play.
- `width`/`height`: dimensions.

### CODE (gradual)

Stage 1 — Basic video:

```html
<video controls src="video.mp4"></video>
```

Stage 2 — With poster:

```html
<video controls poster="thumb.jpg" src="video.mp4"></video>
```

Stage 3 — Autoplay muted loop:

```html
<video autoplay muted loop src="video.mp4"></video>
```

### TEST

Three questions:

1. What attribute shows controls? (`controls`)
2. What attribute sets a thumbnail? (`poster`)
3. Does `autoplay` need `muted`? (Often yes, for browser policy)

**Checkpoint:** Embed a video with controls and poster; test autoplay muted.

## Common Mistakes

- Autoplay without muted (blocked by browsers).
- Missing `controls` (no UI).
- Fixed width breaking responsiveness.

## Try It Yourself

1. Embed a video with controls.
2. Add a poster image.
3. Test autoplay muted loop.

## Summary

- `<video>` attributes: controls, autoplay, muted, loop, poster, width/height.
- Autoplay often needs muted.

## Next Step

Video is clear. Next, audio. Next: HTML Media 03 — Audio.

---

**In Your Own Words**

1. What attribute shows playback controls?

<details>
<summary>Sample Answer</summary>

**Answer:** `controls`.

</details>

2. What attribute sets a thumbnail image?

<details>
<summary>Sample Answer</summary>

**Answer:** `poster`.

</details>

3. Why does autoplay need muted?

<details>
<summary>Sample Answer</summary>

**Answer:** Browsers block autoplay with sound.

</details>

4. What does `loop` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Repeats the video.

</details>

5. How to make video responsive?

<details>
<summary>Sample Answer</summary>

**Answer:** CSS: `max-width: 100%; height: auto;`.

</details>

## What It Is NOT

- ❌ `autoplay` is **not** guaranteed (browser policy).
- ❌ `poster` is **not** the video itself.
- ❌ Fixed width is **not** responsive.