# Julius Caesar Study App — Plan

A quick, self-contained web app with mini-games to prep for the Grade 8 Language & Literature
exam on Shakespeare's *Julius Caesar*. Focus is on **quotation analysis**: for each key passage,
know **who said it**, **what was happening**, the **figurative language / rhetorical appeal**, and
its **significance** to the play.

---

## 1. Goal & Scope

The exam asks students to analyze passages by answering:
- **Who** said it (and to whom)?
- **What** was happening in the play at that moment (context)?
- **Figurative language** used (if any)?
- **Significance** to the play?
- Plus a **specific question** about the passage.

So the app must drill all four of those dimensions, plus general review of **plot**, **characters**,
**figurative language**, and **rhetorical appeals (ethos/pathos/logos)**.

### Source passages (from the handout)
22 key passages, each with a memorable nickname. Both the *Actively Learn* and *Book Copy* line
numbers are tracked so either edition works.

| # | Act.Scene | Nickname | AL Lines | Book Lines |
|---|-----------|----------|----------|------------|
| 1 | 1.1 | Feathers | 73–80 | 69–71 |
| 2 | 1.2 | Colossus | 142–148 | 135–141 |
| 3 | 1.2 | Fat/Bald | 202–205 | 192–195 |
| 4 | 1.2 | Seduced/Letters | 320–334 | 307–321 |
| 5 | 1.3 | Omens | 15–32 | 10–34 |
| 6 | 2.1 | Serpent | 10–36 | 10–36 |
| 7 | 2.1 | Purgers/Murderers | 175–196 | 162–183 |
| 8 | 2.2 | Cowards | 34–39 | 32–37 |
| 9 | 2.2 | Fountains of blood | 80–87 | 75–82 |
| 10 | 2.2 | Dream interpretation | 88–95 | 83–90 |
| 11 | 3.1 | Northern Star | 66–68 | 60–63 |
| 12 | 3.1 | Et tu Brute? | 85 | 77 |
| 13 | 3.1 | Bloody hands | 116–123 | 103–110 |
| 14 | 3.2 | Brutus Speech | 23–24 | 22–23 |
| 15 | 3.2 | Antony Speech | 82–92 | 75–85 |
| 16 | 3.2 | Crown offering | 104–106 | 97–99 |
| 17 | 3.3 | Cinna the Poet | 28–40 | 27–38 |
| 18 | 4.3 | Bribery | 19–29 | 18–28 |
| 19 | 4.3 | Battle spot | 229–232 | 199–201 |
| 20 | 4.3 | Ghost | 327 | 283 |

> Note: the handout lists "Act 4 Scene 3" three times; rows 18–20 cover those. Total = 20 distinct
> passages (the handout's bullet count varies slightly between editions — we'll lock the final set
> when we build the data file).

---

## 2. Tech Approach (keep it quick)

- **Single static web app** — plain HTML + CSS + vanilla JavaScript. No framework, no build step,
  no install. Just open `index.html` in a browser (works offline on Windows).
- **One data file** (`data.js`) holding all passage content + questions as a JS array of objects.
  Everything else reads from this. Adding/fixing a quote = editing one file.
- **LocalStorage** for progress, scores, and "mastered" flags (persists between sessions).
- Mobile-friendly responsive layout so it works on a phone for on-the-go review.

### File structure
```
Homework - English/
├── PLAN.md            ← this file
├── index.html         ← shell, menu, game containers
├── styles.css         ← styling, responsive layout
├── data.js            ← all passages + questions (the content)
├── app.js             ← game engine, routing, scoring, localStorage
└── README.md          ← how to open & use it
```

---

## 3. Data Model

Each passage is one object in `data.js`:

```js
{
  id: "colossus",
  act: 1, scene: 2,
  nickname: "Colossus",
  linesAL: "142–148", linesBook: "135–141",
  speaker: "Cassius",
  audience: "Brutus",
  quote: "Why, man, he doth bestride the narrow world / Like a Colossus...",
  context: "Cassius is persuading Brutus that Caesar has grown dangerously powerful...",
  devices: ["simile", "allusion", "hyperbole"],   // figurative language tags
  appeal: ["pathos", "logos"],                      // rhetorical appeal, where relevant
  significance: "Plants the seed of the conspiracy; shows Cassius's envy and manipulation.",
  questions: [
    {
      type: "speaker",                 // drives which game can use it
      prompt: "Who speaks these lines?",
      choices: ["Cassius", "Brutus", "Caesar", "Antony"],
      answer: "Cassius",
      explain: "Cassius says this to manipulate Brutus into joining the plot."
    },
    { type: "device", prompt: "...", choices: [...], answer: "...", explain: "..." },
    { type: "context", prompt: "...", choices: [...], answer: "...", explain: "..." }
  ]
}
```

**Content sourcing:** I'll draft the speaker / context / device / significance for all 20 passages
from the play. You review for accuracy against your class notes/handout before relying on it — a
quick fact-check pass is built into the milestones below.

---

## 4. Mini-Games

Six bite-sized modes, all driven by the same data. Each is a self-contained "card flow" with
instant feedback + a running score.

### Game 1 — "Who Said It?" 🗣️
Show a quote (with nickname hidden), pick the speaker from 4 options. Trains the **who** dimension.
Bonus follow-up: "...and to whom?"

### Game 2 — "Name That Passage" 🏷️
Show the quote, match it to its nickname / Act-Scene. Trains recognition of all 20 passages.

### Game 3 — "Spot the Device" 🔍
Show a quote, identify the figurative language (simile, metaphor, personification, allusion,
hyperbole, irony, etc.). Multi-select where a passage has more than one device. Trains **figurative
language**.

### Game 4 — "Rhetoric Arena" 🎭
Focused on the two big speeches (Brutus 3.2, Antony 3.2) + persuasion passages. Classify lines as
**ethos / pathos / logos**. Trains **rhetorical appeals**.

### Game 5 — "Context Match" 🧩
Show a quote → "What is happening at this point in the play?" Pick the correct plot moment. Trains
**context** and reinforces **plot** order.

### Game 6 — Flashcard Deep-Dive 🃏
Full analysis flashcards: front = quote + nickname; back = speaker, audience, context, devices,
appeal, significance. Self-graded ("Got it" / "Review again"). This is the comprehensive review
mode that mirrors the actual exam task. Includes a **"Quiz me"** free-response prompt that shows the
model answer after you think.

### Game 7 — Mock Exam ⏱️
Timed round (e.g. 10 min) that mixes all question types across all 20 passages, like the real exam.
Final score + a review screen listing every miss with the correct answer and explanation.

### Shared mechanics
- Score + streak counter, "X of 20 mastered" progress bar.
- "Mistakes only" replay mode that re-quizzes whatever you got wrong.
- Filter by Act so you can drill one act at a time.
- Keyboard shortcuts (1–4 to answer, Enter for next).

---

## 5. UI / Screens

1. **Home / Menu** — title, six game tiles, overall progress bar, "Reset progress" button.
2. **Game screen** — question card, answer buttons, feedback banner (✓/✗ + explanation), score,
   next button, "back to menu".
3. **Passage Library** — a reference list of all 20 passages with full analysis (for reading/review,
   not a game). Searchable. Shows both AL and Book line numbers.
4. **Results** — end-of-round summary, what to review next.

Visual style: clean, readable, a light "Roman/parchment" theme (serif headings, subtle gold/burgundy
accents) — kept simple so it builds fast.

---

## 6. Build Milestones

1. **Scaffold** — `index.html`, `styles.css`, empty `app.js`, menu + routing between screens.
2. **Data** — write `data.js` with all 20 passages: quote, speaker, audience, context, devices,
   appeal, significance, and 2–3 questions each.
3. **Engine** — generic question-card renderer, scoring, feedback, localStorage progress.
4. **Games 1–3** (Who Said It, Name That Passage, Spot the Device) — reuse the card engine.
5. **Games 4–6** (Rhetoric Arena, Context Match, Flashcard Deep-Dive).
6. **Passage Library** reference screen + Act filter + "mistakes only" mode.
7. **Polish** — responsive layout, keyboard shortcuts, theme, `README.md`.
8. **Content check** — review all 20 passages for accuracy against the handout/notes; fix line
   numbers and any analysis errors.

Milestones 1–4 give a usable study tool fast; 5–8 round it out.

---

## 7. Decisions (locked)

- **Line numbers:** show **both** Actively Learn and Book Copy everywhere.
- **Content:** I pull quote text from public-domain *Julius Caesar* and draft the
  speaker/context/device/significance for all 20 passages; you fact-check against the handout after.
- **Mock-exam mode:** **yes** — add a timed round (Game 7) that mixes all question types like a real
  exam, with a final score and review of misses.

### Still good to confirm later
- Any **specific questions** from the handout to include verbatim, beyond the standard
  who/what/device/significance pattern.
