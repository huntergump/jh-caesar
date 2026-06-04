# Julius Caesar — Study Arena ⚔️

A quick, offline web app of mini-games to prep for the Grade 8 Language & Literature exam on
Shakespeare's *Julius Caesar*. Built around the **20 key passages** from the handout — for each one
you drill **who said it**, **what was happening**, the **figurative language**, and its
**significance**.

## How to use it

1. Double-click **`index.html`** — it opens in your browser. No install, works offline.
2. Pick a game from the menu. Progress saves automatically (in your browser).

## The games

| Game | What it trains |
|------|----------------|
| 🗣️ **Who Said It?** | Identifying the speaker |
| 🏷️ **Name That Passage** | Recognizing each quote by nickname & scene |
| 🔍 **Spot the Device** | Figurative language (simile, metaphor, irony…) |
| 🎭 **Rhetoric Arena** | Ethos / pathos / logos — the Brutus & Antony speeches |
| 🧩 **Context Match** | What's happening at that point in the play |
| 🃏 **Flashcard Deep-Dive** | Full analysis — mirrors the exam task |
| ⏱️ **Mock Exam** | Timed 10-min mixed quiz, with a review of misses |
| 📜 **Passage Library** | Read full analysis for all 20 passages (searchable) |

## Tips
- **Keyboard:** press `1`–`4` to answer, `Enter` for next, `F`/`Space` to flip a flashcard.
- Both **Actively Learn** and **Book Copy** line numbers are shown on every passage.
- "Reset progress" (bottom of the screen) clears your mastered/mistake tracking.

## Editing the content
All passages and quiz questions live in **`data.js`** — one object per passage. Fix a line number,
quote, or answer there and reload. The analysis is a study draft: **double-check it against your
handout and class notes** before relying on it.

## Files
- `index.html` — page shell · `styles.css` — theme · `data.js` — all content · `app.js` — game engine
- `PLAN.md` — the design plan
