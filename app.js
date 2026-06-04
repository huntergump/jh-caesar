/* ============================================================
   Julius Caesar — Study Arena
   Game engine, routing, scoring, localStorage. Reads PASSAGES,
   DEVICES_GLOSSARY, APPEALS_GLOSSARY, PLOT_ORDER from data.js.
   ============================================================ */

const app = document.getElementById("app");
const STORE_KEY = "jc-study-progress-v1";

/* ---------- progress (localStorage) ---------- */
function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch { return {}; }
}
function saveProgress(p) {
  localStorage.setItem(STORE_KEY, JSON.stringify(p));
}
let progress = loadProgress();
// progress = { mastered: {id:true}, mistakes: {id:true} }
progress.mastered = progress.mastered || {};
progress.mistakes = progress.mistakes || {};

function markMastered(id) { progress.mastered[id] = true; delete progress.mistakes[id]; saveProgress(progress); updateMastery(); }
function markMistake(id) { progress.mistakes[id] = true; saveProgress(progress); }

/* ---------- shared topbar helpers (used by every subject) ---------- */
let currentSubject = null; // null = subject picker, 'english', 'science'
function setMastery(n, total) {
  const label = document.getElementById("masteryLabel");
  const bar = document.getElementById("masteryBar");
  if (!label || !bar) return;
  label.textContent = total ? `${n} / ${total} mastered` : "";
  bar.style.width = total ? (100 * n / total) + "%" : "0%";
}
function setSubjectLabel(name) {
  const el = document.getElementById("subjectLabel");
  if (el) el.textContent = name ? " · " + name : "";
}

function updateMastery() { // English
  setMastery(Object.keys(progress.mastered).length, PASSAGES.length);
}
function resetProgress() {
  if (currentSubject === "science" && typeof sciResetProgress === "function") return sciResetProgress();
  if (currentSubject === "english") {
    if (!confirm("Reset your progress for Julius Caesar (English)?")) return;
    progress = { mastered: {}, mistakes: {} };
    saveProgress(progress);
    updateMastery();
    return goHome();
  }
  // On the subject picker: reset everything.
  if (!confirm("Reset ALL progress for every subject?")) return;
  progress = { mastered: {}, mistakes: {} };
  saveProgress(progress);
  if (typeof sciResetAll === "function") sciResetAll();
  subjectHome();
}

/* ============================================================
   SUBJECT PICKER (top-level home)
   ============================================================ */
function subjectHome() {
  currentSubject = null;
  setSubjectLabel("");
  const engN = Object.keys(progress.mastered).length;
  const sciN = (typeof sciMasteredCount === "function") ? sciMasteredCount() : 0;
  const sciTot = (typeof sciTotalCount === "function") ? sciTotalCount() : 0;
  setMastery(engN + sciN, PASSAGES.length + sciTot);
  app.innerHTML = `
    <section class="intro">
      <h2>Choose a subject</h2>
      <p>Pick what you're studying — each subject has its own set of mini-games.</p>
    </section>
    <div class="tiles">
      <button class="tile" style="border-left-color:var(--burgundy)" onclick="goHome()">
        <div class="emoji">⚔️</div><h3>English — Julius Caesar</h3>
        <p>20 key passages · who said it, figurative language, significance.
           <br><b>${engN}/${PASSAGES.length}</b> mastered</p></button>
      <button class="tile" style="border-left-color:var(--green)" onclick="sciHome()">
        <div class="emoji">🔬</div><h3>Science — Grade 8 Exam</h3>
        <p>Body systems, static electricity, chemistry, lab &amp; data.
           <br><b>${sciN}/${sciTot}</b> mastered</p></button>
    </div>`;
}

/* ---------- helpers ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function reseed() { /* no-op: kept for call sites; shuffling uses Math.random */ }

function byId(id) { return PASSAGES.find(p => p.id === id); }
function actName(p) { return `Act ${p.act}, Scene ${p.scene}`; }
function lineRef(p) { return `AL ${p.linesAL} · Book ${p.linesBook}`; }

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function quoteHtml(p) {
  return `<div class="quote"><span class="ln">${escapeHtml(p.quote)}</span></div>`;
}

/* Build a multiple-choice question from a passage's `questions` of a given type.
   Falls back to deriving speaker/appeal questions when needed. */
function questionsOfType(type) {
  const out = [];
  PASSAGES.forEach(p => {
    (p.questions || []).forEach(q => {
      if (q.type === type) out.push({ passage: p, q });
    });
  });
  return out;
}

/* ---------- routing ---------- */
function goHome() {
  reseed();
  currentSubject = "english";
  setSubjectLabel("Julius Caesar");
  app.innerHTML = `
    <div class="controls"><button class="btn" onclick="subjectHome()">← All subjects</button></div>
    <section class="intro">
      <h2>Master the 20 key passages</h2>
      <p>For every quotation, know <b>who</b> said it, <b>what</b> was happening,
      the <b>figurative language</b>, and its <b>significance</b>.</p>
      <p style="font-size:.85rem">Pick a game — your progress saves automatically.</p>
    </section>
    <div class="tiles">
      <button class="tile" onclick="startGame('speaker')">
        <div class="emoji">🗣️</div><h3>Who Said It?</h3>
        <p>Read a quote, name the speaker.</p></button>
      <button class="tile" onclick="startGame('passage')">
        <div class="emoji">🏷️</div><h3>Name That Passage</h3>
        <p>Match the quote to its nickname &amp; scene.</p></button>
      <button class="tile" onclick="startGame('device')">
        <div class="emoji">🔍</div><h3>Spot the Device</h3>
        <p>Identify the figurative language.</p></button>
      <button class="tile" onclick="startGame('appeal')">
        <div class="emoji">🎭</div><h3>Rhetoric Arena</h3>
        <p>Ethos, pathos, or logos? The big speeches.</p></button>
      <button class="tile" onclick="startGame('context')">
        <div class="emoji">🧩</div><h3>Context Match</h3>
        <p>What's happening at this moment in the play?</p></button>
      <button class="tile" onclick="startFlashcards()">
        <div class="emoji">🃏</div><h3>Flashcard Deep-Dive</h3>
        <p>Full analysis cards — mirrors the exam task.</p></button>
      <button class="tile exam" onclick="startExam()">
        <div class="emoji">⏱️</div><h3>Mock Exam</h3>
        <p>Timed mixed quiz across all passages.</p></button>
      <button class="tile library" onclick="showLibrary()">
        <div class="emoji">📜</div><h3>Passage Library</h3>
        <p>Read full analysis for all 20 passages.</p></button>
    </div>`;
  updateMastery();
}

/* ============================================================
   MULTIPLE-CHOICE GAME ENGINE (games 1–5 + exam)
   ============================================================ */
const GAME_META = {
  speaker: { title: "🗣️ Who Said It?", showQuote: true },
  passage: { title: "🏷️ Name That Passage", showQuote: true },
  device:  { title: "🔍 Spot the Device", showQuote: true },
  appeal:  { title: "🎭 Rhetoric Arena", showQuote: true },
  context: { title: "🧩 Context Match", showQuote: true }
};

let session = null;

function buildItems(type, filterAct, mistakesOnly) {
  let items;
  if (type === "passage") {
    // Generate "name that passage" items from every passage.
    items = PASSAGES.map(p => ({
      passage: p,
      q: {
        type: "passage",
        prompt: "Which passage is this?",
        choices: null, // built dynamically
        answer: `${p.nickname} (${actName(p)})`,
        explain: `Speaker: ${p.speaker}. ${p.significance}`
      }
    }));
  } else {
    items = questionsOfType(type);
  }
  if (filterAct && filterAct !== "all") {
    items = items.filter(it => String(it.passage.act) === String(filterAct));
  }
  if (mistakesOnly) {
    items = items.filter(it => progress.mistakes[it.passage.id]);
  }
  return shuffle(items);
}

function startGame(type, opts = {}) {
  reseed();
  const items = buildItems(type, opts.act || "all", opts.mistakesOnly);
  if (!items.length) {
    app.innerHTML = `<p>No questions for that filter. <button class="btn" onclick="goHome()">Back</button></p>`;
    return;
  }
  session = { type, items, idx: 0, score: 0, streak: 0, best: 0, misses: [], opts };
  renderControls(type, opts);
  renderQuestion();
}

function renderControls(type, opts) {
  // (controls bar rendered inside renderQuestion header for these games)
}

function renderQuestion() {
  const { type, items, idx } = session;
  const it = items[idx];
  const p = it.passage;
  const q = it.q;

  // Build choices.
  let choices;
  if (type === "passage") {
    const correct = q.answer;
    const pool = shuffle(PASSAGES.filter(x => x.id !== p.id)).slice(0, 3)
      .map(x => `${x.nickname} (${actName(x)})`);
    choices = shuffle([correct, ...pool]);
  } else {
    choices = q.choices.slice(); // keep authored order? shuffle for fairness
    choices = shuffle(choices);
  }

  const meta = GAME_META[type] || { title: "Quiz", showQuote: true };
  app.innerHTML = `
    <div class="game-head">
      <h2>${meta.title}</h2>
      <div class="scoreboard">
        Score <b>${session.score}</b> / ${items.length}
        ${session.streak > 1 ? `· <span class="streak">🔥 ${session.streak} streak</span>` : ""}
      </div>
    </div>
    <div class="controls">
      <span style="font-size:.85rem;color:var(--muted)">Question ${idx + 1} of ${items.length}</span>
      <span style="flex:1"></span>
      <button class="btn" onclick="goHome()">Menu</button>
    </div>
    <div class="card">
      <div class="tag-row">
        <span class="tag act">${actName(p)}</span>
        ${type !== "passage" && type !== "context" ? `<span class="tag">${escapeHtml(p.nickname)}</span>` : ""}
        <span class="tag">${lineRef(p)}</span>
      </div>
      ${meta.showQuote ? quoteHtml(p) : ""}
      <div class="prompt">${escapeHtml(q.prompt)}</div>
      <div class="choices" id="choices"></div>
      <div class="feedback" id="feedback"></div>
      <div class="card-actions">
        <span></span>
        <button class="btn btn-primary" id="nextBtn" style="display:none" onclick="nextQuestion()">Next ▶</button>
      </div>
    </div>`;

  const correctAns = q.answer;
  const box = document.getElementById("choices");
  choices.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "choice";
    b.innerHTML = `<span class="key">${i + 1}</span><span>${escapeHtml(c)}</span>`;
    b.onclick = () => answer(c, correctAns, q, p);
    box.appendChild(b);
  });
  session._choices = choices;
  session._correct = correctAns;
  session._q = q;
  session._p = p;
  session._answered = false;
}

function answer(choice, correctAns, q, p) {
  if (session._answered) return;
  session._answered = true;
  const correct = choice === correctAns;
  const buttons = [...document.querySelectorAll("#choices .choice")];
  buttons.forEach((b, i) => {
    b.disabled = true;
    const val = session._choices[i];
    if (val === correctAns) b.classList.add("correct");
    else if (val === choice) b.classList.add("wrong");
  });
  const fb = document.getElementById("feedback");
  if (correct) {
    session.score++;
    session.streak++;
    fb.className = "feedback show ok";
    fb.innerHTML = `<span class="verdict">✓ Correct.</span> ${escapeHtml(q.explain)}`;
    // Mastery: getting the speaker/context/device right contributes.
    if (!progress.mistakes[p.id]) markMastered(p.id);
  } else {
    session.streak = 0;
    markMistake(p.id);
    fb.className = "feedback show no";
    fb.innerHTML = `<span class="verdict">✗ Not quite.</span> Answer: <b>${escapeHtml(correctAns)}</b>. ${escapeHtml(q.explain)}`;
    session.misses.push({ prompt: q.prompt, nickname: p.nickname, answer: correctAns });
  }
  document.getElementById("nextBtn").style.display = "inline-block";
  document.getElementById("nextBtn").focus();
}

function nextQuestion() {
  session.idx++;
  if (session.idx >= session.items.length) return showResults();
  renderQuestion();
}

/* ============================================================
   RESULTS
   ============================================================ */
function showResults(opts = {}) {
  const total = session.items.length;
  const pct = Math.round(100 * session.score / total);
  let grade = "Keep studying 📚";
  if (pct >= 90) grade = "Outstanding! ⭐";
  else if (pct >= 75) grade = "Strong work! 💪";
  else if (pct >= 50) grade = "Good progress 👍";

  const missHtml = session.misses.length
    ? `<div class="miss-list"><h3>Review these:</h3>${session.misses.map(m => `
        <div class="miss-item">
          <div class="q">${escapeHtml(m.nickname)} — ${escapeHtml(m.prompt)}</div>
          <div class="a">→ ${escapeHtml(m.answer)}</div>
        </div>`).join("")}</div>`
    : `<p style="color:var(--green)">Perfect — no misses! 🎉</p>`;

  app.innerHTML = `
    <div class="card results">
      <h2>${opts.examTimeUp ? "⏰ Time's up!" : "Round complete"}</h2>
      <div class="big-score">${session.score}/${total}</div>
      <div class="grade">${pct}% · ${grade}</div>
      ${missHtml}
      <div class="card-actions" style="justify-content:center">
        ${session.misses.length ? `<button class="btn btn-primary" onclick="replayMistakes()">Replay mistakes</button>` : ""}
        <button class="btn" onclick="goHome()">Back to menu</button>
      </div>
    </div>`;
}

function replayMistakes() {
  const type = session.type;
  if (type === "exam") return startExam();
  startGame(type, { mistakesOnly: false, act: "all", _replayList: session.misses });
}

/* ============================================================
   FLASHCARDS (game 6)
   ============================================================ */
let flash = null;
function startFlashcards() {
  reseed();
  flash = { items: shuffle(PASSAGES), idx: 0, reviewed: 0 };
  renderFlashcard();
}
function renderFlashcard() {
  const p = flash.items[flash.idx];
  app.innerHTML = `
    <div class="game-head">
      <h2>🃏 Flashcard Deep-Dive</h2>
      <div class="scoreboard">Card ${flash.idx + 1} of ${flash.items.length}</div>
    </div>
    <div class="controls">
      <span style="font-size:.85rem;color:var(--muted)">Tap card to flip</span>
      <span style="flex:1"></span>
      <button class="btn" onclick="goHome()">Menu</button>
    </div>
    <div class="flashcard" id="flashcard" onclick="flipCard()">
      <div class="flash-inner">
        <div class="flash-face">
          <div class="tag-row">
            <span class="tag act">${actName(p)}</span>
            <span class="tag">${escapeHtml(p.nickname)}</span>
            <span class="tag">${lineRef(p)}</span>
          </div>
          ${quoteHtml(p)}
          <p class="flash-hint">Who? What's happening? Device? Significance? — then flip.</p>
        </div>
        <div class="flash-face flash-back">
          <dl class="analysis">
            <dt>Nickname</dt><dd>${escapeHtml(p.nickname)} — ${actName(p)} (${lineRef(p)})</dd>
            <dt>Speaker → Audience</dt><dd>${escapeHtml(p.speaker)} → ${escapeHtml(p.audience)}</dd>
            <dt>What's happening</dt><dd>${escapeHtml(p.context)}</dd>
            <dt>Figurative language</dt><dd>${p.devices.map(d => `<b>${escapeHtml(d)}</b>`).join(", ") || "—"}</dd>
            <dt>Rhetorical appeal</dt><dd>${p.appeal.length ? p.appeal.map(a => escapeHtml(a)).join(", ") : "—"}</dd>
            <dt>Significance</dt><dd>${escapeHtml(p.significance)}</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="self-grade">
      <button class="btn btn-primary" onclick="gradeFlash(true)">✓ Got it</button>
      <button class="btn" onclick="gradeFlash(false)">↻ Review again</button>
    </div>`;
}
function flipCard() {
  document.getElementById("flashcard").classList.toggle("flipped");
}
function gradeFlash(got) {
  const p = flash.items[flash.idx];
  if (got) markMastered(p.id); else markMistake(p.id);
  flash.idx++;
  if (flash.idx >= flash.items.length) {
    app.innerHTML = `<div class="card results">
      <h2>Deck complete 🃏</h2>
      <p>You reviewed all ${flash.items.length} passages.</p>
      <div class="card-actions" style="justify-content:center">
        <button class="btn btn-primary" onclick="startFlashcards()">Shuffle again</button>
        <button class="btn" onclick="goHome()">Menu</button>
      </div></div>`;
    return;
  }
  renderFlashcard();
}

/* ============================================================
   MOCK EXAM (game 7) — timed mixed quiz
   ============================================================ */
let examTimer = null;
function startExam() {
  reseed();
  // One question per passage, mixed types, capped/padded to a full set.
  const pool = [];
  PASSAGES.forEach(p => {
    const qs = (p.questions || []);
    if (qs.length) pool.push({ passage: p, q: qs[Math.floor(Math.random() * qs.length)] });
  });
  const items = shuffle(pool);
  session = { type: "exam", items, idx: 0, score: 0, streak: 0, misses: [], opts: {} };
  session.timeLeft = 10 * 60; // 10 minutes
  renderExamQuestion();
  if (examTimer) clearInterval(examTimer);
  examTimer = setInterval(tickExam, 1000);
}
function tickExam() {
  session.timeLeft--;
  const el = document.getElementById("examTimer");
  if (el) {
    const m = Math.floor(session.timeLeft / 60);
    const s = String(session.timeLeft % 60).padStart(2, "0");
    el.textContent = `⏱️ ${m}:${s}`;
    el.classList.toggle("low", session.timeLeft <= 30);
  }
  if (session.timeLeft <= 0) {
    clearInterval(examTimer);
    showResults({ examTimeUp: true });
  }
}
function renderExamQuestion() {
  const { items, idx } = session;
  const it = items[idx];
  const p = it.passage, q = it.q;
  const choices = shuffle(q.choices.slice());
  const m = Math.floor(session.timeLeft / 60);
  const s = String(session.timeLeft % 60).padStart(2, "0");

  app.innerHTML = `
    <div class="game-head">
      <h2>⏱️ Mock Exam</h2>
      <div class="timer" id="examTimer">⏱️ ${m}:${s}</div>
    </div>
    <div class="controls">
      <span style="font-size:.85rem;color:var(--muted)">Question ${idx + 1} of ${items.length} · Score ${session.score}</span>
      <span style="flex:1"></span>
      <button class="btn" onclick="quitExam()">Quit</button>
    </div>
    <div class="card">
      <div class="tag-row"><span class="tag act">${actName(p)}</span><span class="tag">${lineRef(p)}</span></div>
      ${quoteHtml(p)}
      <div class="prompt">${escapeHtml(q.prompt)}</div>
      <div class="choices" id="choices"></div>
      <div class="feedback" id="feedback"></div>
      <div class="card-actions"><span></span>
        <button class="btn btn-primary" id="nextBtn" style="display:none" onclick="nextExam()">Next ▶</button>
      </div>
    </div>`;

  const box = document.getElementById("choices");
  choices.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "choice";
    b.innerHTML = `<span class="key">${i + 1}</span><span>${escapeHtml(c)}</span>`;
    b.onclick = () => answerExam(c, q.answer, q, p, choices);
    box.appendChild(b);
  });
  session._choices = choices; session._correct = q.answer; session._answered = false;
}
function answerExam(choice, correctAns, q, p, choices) {
  if (session._answered) return;
  session._answered = true;
  const correct = choice === correctAns;
  [...document.querySelectorAll("#choices .choice")].forEach((b, i) => {
    b.disabled = true;
    if (choices[i] === correctAns) b.classList.add("correct");
    else if (choices[i] === choice) b.classList.add("wrong");
  });
  const fb = document.getElementById("feedback");
  if (correct) {
    session.score++;
    fb.className = "feedback show ok";
    fb.innerHTML = `<span class="verdict">✓</span> ${escapeHtml(q.explain)}`;
  } else {
    markMistake(p.id);
    fb.className = "feedback show no";
    fb.innerHTML = `<span class="verdict">✗</span> Answer: <b>${escapeHtml(correctAns)}</b>. ${escapeHtml(q.explain)}`;
    session.misses.push({ prompt: q.prompt, nickname: p.nickname, answer: correctAns });
  }
  const nb = document.getElementById("nextBtn");
  nb.style.display = "inline-block"; nb.focus();
}
function nextExam() {
  session.idx++;
  if (session.idx >= session.items.length) {
    if (examTimer) clearInterval(examTimer);
    return showResults();
  }
  renderExamQuestion();
}
function quitExam() {
  if (examTimer) clearInterval(examTimer);
  goHome();
}

/* ============================================================
   PASSAGE LIBRARY (reference)
   ============================================================ */
function showLibrary() {
  app.innerHTML = `
    <div class="game-head"><h2>📜 Passage Library</h2>
      <button class="btn" onclick="goHome()">Menu</button></div>
    <input class="lib-search" id="libSearch" type="text"
      placeholder="Search by nickname, speaker, device, or text…"
      oninput="filterLibrary(this.value)" />
    <div id="libList"></div>`;
  renderLibrary(PASSAGES);
}
function renderLibrary(list) {
  const el = document.getElementById("libList");
  if (!list.length) { el.innerHTML = `<p>No matches.</p>`; return; }
  el.innerHTML = list.map(p => `
    <div class="lib-item">
      <h3>${escapeHtml(p.nickname)}</h3>
      <div class="lib-meta">${actName(p)} · Actively Learn ${p.linesAL} · Book ${p.linesBook}
        · Speaker: ${escapeHtml(p.speaker)} → ${escapeHtml(p.audience)}</div>
      ${quoteHtml(p)}
      <dl class="analysis">
        <dt>What's happening</dt><dd>${escapeHtml(p.context)}</dd>
        <dt>Figurative language</dt><dd>${p.devices.map(d => escapeHtml(d)).join(", ") || "—"}</dd>
        <dt>Rhetorical appeal</dt><dd>${p.appeal.length ? p.appeal.map(a => escapeHtml(a)).join(", ") : "—"}</dd>
        <dt>Significance</dt><dd>${escapeHtml(p.significance)}</dd>
      </dl>
    </div>`).join("");
}
function filterLibrary(term) {
  const t = term.trim().toLowerCase();
  if (!t) return renderLibrary(PASSAGES);
  const list = PASSAGES.filter(p =>
    (p.nickname + " " + p.speaker + " " + p.audience + " " + p.context + " " +
     p.significance + " " + p.devices.join(" ") + " " + p.appeal.join(" ") + " " +
     p.quote).toLowerCase().includes(t));
  renderLibrary(list);
}

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */
document.addEventListener("keydown", e => {
  // 1-4 to answer in MC games / exam
  if (/^[1-4]$/.test(e.key)) {
    const btns = document.querySelectorAll("#choices .choice");
    const b = btns[Number(e.key) - 1];
    if (b && !b.disabled) b.click();
  }
  // Enter / Space → Next
  if (e.key === "Enter") {
    const nb = document.getElementById("nextBtn");
    if (nb && nb.style.display !== "none") nb.click();
  }
  // F to flip flashcard
  if ((e.key === "f" || e.key === " ") && document.getElementById("flashcard")) {
    e.preventDefault(); flipCard();
  }
});

/* ---------- boot ---------- */
subjectHome();
