/* ============================================================
   Grade 8 Science — game engine
   Reuses globals from app.js: app, shuffle, escapeHtml, setMastery,
   setSubjectLabel, flipCard, currentSubject.
   Reads SCIENCE_QUESTIONS / SCIENCE_TOPICS / SCIENCE_COMMANDS from
   data-science.js.
   ============================================================ */

const SCI_STORE = "sci-study-progress-v1";
const SCI_SET_KEY = "sci-settings-v1";

let sciProgress = (() => {
  try { return JSON.parse(localStorage.getItem(SCI_STORE)) || {}; } catch { return {}; }
})();
sciProgress.mastered = sciProgress.mastered || {};
sciProgress.mistakes = sciProgress.mistakes || {};
sciProgress.diagrams = sciProgress.diagrams || {}; // "I can draw this" checks
function sciSave() { localStorage.setItem(SCI_STORE, JSON.stringify(sciProgress)); }

let sciSettings = (() => {
  try { return JSON.parse(localStorage.getItem(SCI_SET_KEY)) || {}; } catch { return {}; }
})();
if (typeof sciSettings.includePossible !== "boolean") sciSettings.includePossible = true;
function sciSaveSettings() { localStorage.setItem(SCI_SET_KEY, JSON.stringify(sciSettings)); }

/* ---- counts / reset (called by app.js topbar + reset) ---- */
function sciMasteredCount() { return Object.keys(sciProgress.mastered).length; }
function sciTotalCount() { return SCIENCE_QUESTIONS.length; }
function sciResetProgress() {
  if (!confirm("Reset your Science progress?")) return;
  sciProgress = { mastered: {}, mistakes: {}, diagrams: {} }; sciSave(); sciHome();
}
function sciResetAll() { sciProgress = { mastered: {}, mistakes: {}, diagrams: {} }; sciSave(); }

function sciMarkMastered(id) { sciProgress.mastered[id] = true; delete sciProgress.mistakes[id]; sciSave(); sciRefreshTopbar(); }
function sciMarkMistake(id) { sciProgress.mistakes[id] = true; sciSave(); }
function sciRefreshTopbar() { setMastery(sciMasteredCount(), sciTotalCount()); }

/* ---- helpers ---- */
function sciTopic(id) { return SCIENCE_TOPICS.find(t => t.id === id); }
function sciTopicName(id) { const t = sciTopic(id); return t ? t.name : id; }
function sciVerifiedCount() { return SCIENCE_QUESTIONS.filter(q => q.status === "verified").length; }
function sciPossibleCount() { return SCIENCE_QUESTIONS.filter(q => q.status !== "verified").length; }

// Pool of questions for the current settings, optionally filtered by topic and/or MYP level band.
function sciPool(topic, level) {
  return SCIENCE_QUESTIONS.filter(q =>
    (!topic || q.topic === topic) &&
    (!level || sciQuestionLevel(q) === level) &&
    (sciSettings.includePossible || q.status === "verified"));
}
function sciStatusBadge(status) {
  return status === "verified"
    ? `<span class="tag verified">✓ verified</span>`
    : `<span class="tag possible">⚠ possible</span>`;
}

// MYP level band derived from the command term (per the Criterion A rubric),
// unless a question sets its own `level`.
const COMMAND_LEVEL = { "Recall": "1-2", "State": "3-4", "Solve": "3-4", "Apply": "3-4", "Interpret": "5-6", "Outline": "5-6" };
function sciQuestionLevel(q) {
  return q.level
    || (typeof SCIENCE_LEVEL_OVERRIDES !== "undefined" && SCIENCE_LEVEL_OVERRIDES[q.id])
    || COMMAND_LEVEL[q.command] || "3-4";
}
function sciLevelBadge(q) { return `<span class="tag level">MYP ${sciQuestionLevel(q)}</span>`; }

/* ============================================================
   HOME
   ============================================================ */
function sciHome() {
  currentSubject = "science";
  setSubjectLabel("Science");
  sciRefreshTopbar();
  const v = sciVerifiedCount(), p = sciPossibleCount();
  const setLabel = sciSettings.includePossible
    ? `Studying <b>all ${v + p}</b> questions (${v} verified · ${p} possible)`
    : `Studying <b>verified only</b> (${v} of ${v + p})`;

  app.innerHTML = `
    <div class="controls"><button class="btn" onclick="subjectHome()">← All subjects</button></div>
    <section class="intro">
      <h2>Grade 8 Science — June 2026</h2>
      <p>Body Systems · Static Electricity · Chemistry · Lab &amp; Data</p>
    </section>
    <div class="card" style="margin-bottom:1rem;padding:0.9rem 1.1rem">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:.8rem;flex-wrap:wrap">
        <span style="font-size:.92rem">${setLabel}</span>
        <button class="btn" onclick="sciToggleSet()">
          ${sciSettings.includePossible ? "Switch to: Verified only" : "Switch to: Include possible"}
        </button>
      </div>
      <p style="font-size:.78rem;color:#6b5d4a;margin:.5rem 0 0">
        ⚠ "Possible" questions are drafted from the standard curriculum — confirm them against your notes.
        Mark items <code>verified</code> in <code>data-science.js</code> as you check them.</p>
    </div>
    <div class="tiles">
      <button class="tile" onclick="sciStartMC(null)">
        <div class="emoji">📝</div><h3>Multiple Choice</h3>
        <p>Mixed questions across all four topics (Section A style).</p></button>
      <button class="tile" onclick="sciTopicMenu()">
        <div class="emoji">🧭</div><h3>Topic Quiz</h3>
        <p>Drill one topic at a time.</p></button>
      <button class="tile" onclick="sciLevelMenu()">
        <div class="emoji">🎚️</div><h3>Practice by MYP Level</h3>
        <p>Target Level 1–2, 3–4, or 5–6 questions.</p></button>
      <button class="tile" onclick="sciFlashcards(null)">
        <div class="emoji">🃏</div><h3>Flashcards</h3>
        <p>Question on the front, answer + explanation on the back.</p></button>
      <button class="tile exam" onclick="sciStartExam()">
        <div class="emoji">⏱️</div><h3>Mock Exam</h3>
        <p>Timed quiz, Levels 1–6 only (like the real exam).</p></button>
      <button class="tile" onclick="sciDiagrams()">
        <div class="emoji">✏️</div><h3>Diagram Checklist</h3>
        <p>Diagrams you must be able to draw &amp; interpret.</p></button>
      <button class="tile library" onclick="sciLibrary()">
        <div class="emoji">📚</div><h3>Study Library</h3>
        <p>Browse every Q&amp;A by topic, with level, command term &amp; status.</p></button>
    </div>`;
}

function sciToggleSet() {
  sciSettings.includePossible = !sciSettings.includePossible;
  sciSaveSettings();
  sciHome();
}

/* ============================================================
   TOPIC MENU
   ============================================================ */
function sciTopicMenu() {
  currentSubject = "science";
  app.innerHTML = `
    <div class="controls"><button class="btn" onclick="sciHome()">← Science menu</button></div>
    <section class="intro"><h2>🧭 Topic Quiz</h2><p>Pick a topic to drill.</p></section>
    <div class="tiles">
      ${SCIENCE_TOPICS.map(t => {
        const n = sciPool(t.id).length;
        return `<button class="tile" onclick="sciStartMC('${t.id}')" ${n ? "" : "disabled"}>
          <div class="emoji">${t.emoji}</div><h3>${escapeHtml(t.name)}</h3>
          <p>${escapeHtml(t.blurb)}<br><b>${n}</b> question${n === 1 ? "" : "s"} in current set</p></button>`;
      }).join("")}
    </div>`;
}

/* ============================================================
   MULTIPLE-CHOICE ENGINE (quiz + topic + exam share this)
   ============================================================ */
let sciSession = null;

function sciStartMC(topic, level) {
  const items = shuffle(sciPool(topic, level));
  if (!items.length) {
    app.innerHTML = `<div class="card"><p>No questions in this set. Try enabling "possible" questions.</p>
      <button class="btn" onclick="sciHome()">← Science menu</button></div>`;
    return;
  }
  sciSession = { mode: "quiz", topic, level, items, idx: 0, score: 0, streak: 0, misses: [], timed: false };
  sciRenderQ();
}

/* MYP level menu */
function sciLevelMenu() {
  currentSubject = "science";
  app.innerHTML = `
    <div class="controls"><button class="btn" onclick="sciHome()">← Science menu</button></div>
    <section class="intro"><h2>🎚️ Practice by MYP Level</h2>
      <p>The June exam uses Levels 1–6. (Level 7–8 is not on the exam.)</p></section>
    <div class="tiles">
      ${Object.keys(SCIENCE_LEVELS).map(band => {
        const info = SCIENCE_LEVELS[band];
        const n = sciPool(null, band).length;
        return `<button class="tile" onclick="sciStartMC(null,'${band}')" ${n ? "" : "disabled"}
          style="border-left-color:${info.onExam ? "var(--gold)" : "#bbb"}">
          <div class="emoji">${info.onExam ? "🎯" : "🚫"}</div>
          <h3>${info.label}${info.onExam ? "" : " (not on exam)"}</h3>
          <p>${escapeHtml(info.desc)}<br><b>${n}</b> question${n === 1 ? "" : "s"} in current set</p></button>`;
      }).join("")}
    </div>`;
}

function sciRenderQ() {
  const s = sciSession;
  const q = s.items[s.idx];
  const choices = shuffle(q.choices.slice());
  const timerHtml = s.timed
    ? `<div class="timer" id="examTimer">⏱️ ${sciClock()}</div>`
    : `<div class="scoreboard">Score <b>${s.score}</b> / ${s.items.length}${s.streak > 1 ? ` · <span class="streak">🔥 ${s.streak}</span>` : ""}</div>`;
  const title = s.timed ? "⏱️ Mock Exam"
    : s.level ? `🎚️ ${SCIENCE_LEVELS[s.level].label}`
    : s.topic ? `🧭 ${sciTopicName(s.topic)}` : "📝 Multiple Choice";

  app.innerHTML = `
    <div class="game-head"><h2>${title}</h2>${timerHtml}</div>
    <div class="controls">
      <span style="font-size:.85rem;color:#6b5d4a">Question ${s.idx + 1} of ${s.items.length}</span>
      <span style="flex:1"></span>
      <button class="btn" onclick="${s.timed ? "sciQuitExam()" : "sciHome()"}">${s.timed ? "Quit" : "Menu"}</button>
    </div>
    <div class="card">
      <div class="tag-row">
        <span class="tag act">${escapeHtml(sciTopicName(q.topic))}</span>
        ${sciLevelBadge(q)}
        <span class="tag">${escapeHtml(q.command)}</span>
        ${sciStatusBadge(q.status)}
      </div>
      <div class="prompt">${escapeHtml(q.prompt)}</div>
      <div class="choices" id="choices"></div>
      <div class="feedback" id="feedback"></div>
      <div class="card-actions"><span></span>
        <button class="btn btn-primary" id="nextBtn" style="display:none" onclick="sciNext()">Next ▶</button>
      </div>
    </div>`;

  const box = document.getElementById("choices");
  choices.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "choice";
    b.innerHTML = `<span class="key">${i + 1}</span><span>${escapeHtml(c)}</span>`;
    b.onclick = () => sciAnswer(c, choices, q);
    box.appendChild(b);
  });
  s._choices = choices; s._q = q; s._answered = false;
}

function sciAnswer(choice, choices, q) {
  const s = sciSession;
  if (s._answered) return;
  s._answered = true;
  const correct = choice === q.answer;
  [...document.querySelectorAll("#choices .choice")].forEach((b, i) => {
    b.disabled = true;
    if (choices[i] === q.answer) b.classList.add("correct");
    else if (choices[i] === choice) b.classList.add("wrong");
  });
  const fb = document.getElementById("feedback");
  if (correct) {
    s.score++; s.streak++;
    fb.className = "feedback show ok";
    fb.innerHTML = `<span class="verdict">✓ Correct.</span> ${escapeHtml(q.explain)}`;
    if (!sciProgress.mistakes[q.id]) sciMarkMastered(q.id);
  } else {
    s.streak = 0;
    sciMarkMistake(q.id);
    fb.className = "feedback show no";
    fb.innerHTML = `<span class="verdict">✗ Not quite.</span> Answer: <b>${escapeHtml(q.answer)}</b>. ${escapeHtml(q.explain)}`;
    s.misses.push({ prompt: q.prompt, topic: q.topic, answer: q.answer });
  }
  const nb = document.getElementById("nextBtn");
  nb.style.display = "inline-block"; nb.focus();
}

function sciNext() {
  const s = sciSession;
  s.idx++;
  if (s.idx >= s.items.length) {
    if (s.timed && sciExamTimer) clearInterval(sciExamTimer);
    return sciResults();
  }
  sciRenderQ();
}

function sciResults(opts = {}) {
  const s = sciSession;
  const total = s.items.length;
  const pct = Math.round(100 * s.score / total);
  let grade = "Keep studying 📚";
  if (pct >= 90) grade = "Outstanding! ⭐";
  else if (pct >= 75) grade = "Strong work! 💪";
  else if (pct >= 50) grade = "Good progress 👍";
  const missHtml = s.misses.length
    ? `<div class="miss-list"><h3>Review these:</h3>${s.misses.map(m => `
        <div class="miss-item"><div class="q">${escapeHtml(sciTopicName(m.topic))} — ${escapeHtml(m.prompt)}</div>
        <div class="a">→ ${escapeHtml(m.answer)}</div></div>`).join("")}</div>`
    : `<p style="color:var(--green)">Perfect — no misses! 🎉</p>`;
  app.innerHTML = `
    <div class="card results">
      <h2>${opts.timeUp ? "⏰ Time's up!" : "Round complete"}</h2>
      <div class="big-score">${s.score}/${total}</div>
      <div class="grade">${pct}% · ${grade}</div>
      ${missHtml}
      <div class="card-actions" style="justify-content:center">
        <button class="btn" onclick="sciHome()">← Science menu</button>
      </div>
    </div>`;
  sciRefreshTopbar();
}

/* ============================================================
   FLASHCARDS
   ============================================================ */
let sciFlash = null;
function sciFlashcards(topic) {
  const items = shuffle(sciPool(topic));
  if (!items.length) { sciHome(); return; }
  sciFlash = { items, idx: 0 };
  sciRenderFlash();
}
function sciRenderFlash() {
  const q = sciFlash.items[sciFlash.idx];
  app.innerHTML = `
    <div class="game-head"><h2>🃏 Flashcards</h2>
      <div class="scoreboard">Card ${sciFlash.idx + 1} of ${sciFlash.items.length}</div></div>
    <div class="controls"><span style="font-size:.85rem;color:#6b5d4a">Tap card to flip</span>
      <span style="flex:1"></span><button class="btn" onclick="sciHome()">Menu</button></div>
    <div class="flashcard" id="flashcard" onclick="flipCard()">
      <div class="flash-inner">
        <div class="flash-face">
          <div class="tag-row">
            <span class="tag act">${escapeHtml(sciTopicName(q.topic))}</span>
            ${sciLevelBadge(q)}
            <span class="tag">${escapeHtml(q.command)}</span>
            ${sciStatusBadge(q.status)}
          </div>
          <div class="prompt" style="margin-top:1rem">${escapeHtml(q.prompt)}</div>
          <p class="flash-hint">Think it through, then flip.</p>
        </div>
        <div class="flash-face flash-back">
          <dl class="analysis">
            <dt>Answer</dt><dd>${escapeHtml(q.answer)}</dd>
            <dt>Why</dt><dd>${escapeHtml(q.explain)}</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="self-grade">
      <button class="btn btn-primary" onclick="sciGradeFlash(true)">✓ Got it</button>
      <button class="btn" onclick="sciGradeFlash(false)">↻ Review again</button>
    </div>`;
}
function sciGradeFlash(got) {
  const q = sciFlash.items[sciFlash.idx];
  if (got) sciMarkMastered(q.id); else sciMarkMistake(q.id);
  sciFlash.idx++;
  if (sciFlash.idx >= sciFlash.items.length) {
    app.innerHTML = `<div class="card results"><h2>Deck complete 🃏</h2>
      <p>You reviewed all ${sciFlash.items.length} cards in this set.</p>
      <div class="card-actions" style="justify-content:center">
        <button class="btn btn-primary" onclick="sciFlashcards(null)">Shuffle again</button>
        <button class="btn" onclick="sciHome()">Menu</button></div></div>`;
    sciRefreshTopbar();
    return;
  }
  sciRenderFlash();
}

/* ============================================================
   MOCK EXAM (timed)
   ============================================================ */
let sciExamTimer = null;
function sciClock() {
  const t = sciSession.timeLeft;
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function sciStartExam() {
  // Mock exam mirrors the real exam: Levels 1–6 only (exclude 7–8).
  const pool = shuffle(sciPool(null).filter(q => SCIENCE_LEVELS[sciQuestionLevel(q)].onExam));
  if (!pool.length) { sciHome(); return; }
  const items = pool.slice(0, Math.min(20, pool.length)); // Section A = 20 MC
  sciSession = { mode: "exam", topic: null, items, idx: 0, score: 0, streak: 0, misses: [], timed: true };
  sciSession.timeLeft = 15 * 60; // 15 minutes
  sciRenderQ();
  if (sciExamTimer) clearInterval(sciExamTimer);
  sciExamTimer = setInterval(sciExamTick, 1000);
}
function sciExamTick() {
  const s = sciSession;
  s.timeLeft--;
  const el = document.getElementById("examTimer");
  if (el) { el.textContent = `⏱️ ${sciClock()}`; el.classList.toggle("low", s.timeLeft <= 30); }
  if (s.timeLeft <= 0) { clearInterval(sciExamTimer); sciResults({ timeUp: true }); }
}
function sciQuitExam() { if (sciExamTimer) clearInterval(sciExamTimer); sciHome(); }

/* ============================================================
   STUDY LIBRARY
   ============================================================ */
function sciLibrary() {
  currentSubject = "science";
  app.innerHTML = `
    <div class="controls"><button class="btn" onclick="sciHome()">← Science menu</button></div>
    <div class="game-head"><h2>📚 Study Library</h2></div>
    <input class="lib-search" id="sciSearch" type="text"
      placeholder="Search questions, answers, topics, command terms…"
      oninput="sciFilterLibrary(this.value)" />
    <details style="margin-bottom:1rem">
      <summary style="cursor:pointer;color:var(--burgundy)">MYP command terms used on this exam</summary>
      <dl class="analysis">${Object.entries(SCIENCE_COMMANDS).map(([k, v]) =>
        `<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd>`).join("")}</dl>
    </details>
    <div id="sciLibList"></div>`;
  sciRenderLibrary(SCIENCE_QUESTIONS);
}
function sciRenderLibrary(list) {
  const el = document.getElementById("sciLibList");
  if (!list.length) { el.innerHTML = `<p>No matches.</p>`; return; }
  // group by topic
  el.innerHTML = SCIENCE_TOPICS.map(t => {
    const qs = list.filter(q => q.topic === t.id);
    if (!qs.length) return "";
    return `<h3 style="color:var(--burgundy-dk);margin:1rem 0 .5rem">${t.emoji} ${escapeHtml(t.name)}</h3>` +
      qs.map(q => `
        <div class="lib-item">
          <div class="lib-meta">${sciLevelBadge(q)} · ${escapeHtml(q.command)} · ${sciStatusBadge(q.status)}</div>
          <div class="prompt" style="font-size:1rem">${escapeHtml(q.prompt)}</div>
          <dl class="analysis">
            <dt>Answer</dt><dd>${escapeHtml(q.answer)}</dd>
            <dt>Why</dt><dd>${escapeHtml(q.explain)}</dd>
            ${q.note ? `<dt>Note</dt><dd><i>${escapeHtml(q.note)}</i></dd>` : ""}
          </dl>
        </div>`).join("");
  }).join("");
}
function sciFilterLibrary(term) {
  const t = term.trim().toLowerCase();
  if (!t) return sciRenderLibrary(SCIENCE_QUESTIONS);
  const list = SCIENCE_QUESTIONS.filter(q =>
    (q.prompt + " " + q.answer + " " + q.explain + " " + q.command + " " +
     sciTopicName(q.topic) + " " + q.status + " " + (q.note || "") + " " +
     q.choices.join(" ")).toLowerCase().includes(t));
  sciRenderLibrary(list);
}

/* ============================================================
   DIAGRAM SKILLS CHECKLIST
   ============================================================ */
function sciDiagrams() {
  currentSubject = "science";
  setSubjectLabel("Science");
  const done = SCIENCE_DIAGRAMS.filter(d => sciProgress.diagrams[d.id]).length;
  app.innerHTML = `
    <div class="controls"><button class="btn" onclick="sciHome()">← Science menu</button></div>
    <div class="game-head"><h2>✏️ Diagram Checklist</h2>
      <div class="scoreboard"><b id="diagCount">${done}</b> / ${SCIENCE_DIAGRAMS.length} I can draw</div></div>
    <p style="font-size:.85rem;color:#6b5d4a;margin:0 0 1rem">
      These diagrams are tested on the exam but can't be drilled by multiple choice.
      For each one, make sure you can draw it with every part below, then tick it off.</p>
    <div id="diagList">${SCIENCE_DIAGRAMS.map(sciDiagramCard).join("")}</div>`;
}
function sciDiagramCard(d) {
  const checked = !!sciProgress.diagrams[d.id];
  return `
    <div class="lib-item diag ${checked ? "checked" : ""}" id="diag-${d.id}">
      <label class="diag-head">
        <input type="checkbox" ${checked ? "checked" : ""} onchange="sciToggleDiagram('${d.id}')" />
        <span><b>${escapeHtml(d.title)}</b> <span class="tag act">${escapeHtml(sciTopicName(d.topic))}</span></span>
      </label>
      <div class="diag-body">
        <p style="margin:.3rem 0 .2rem;font-weight:bold">Must include:</p>
        <ul>${d.mustInclude.map(m => `<li>${escapeHtml(m)}</li>`).join("")}</ul>
        <p class="diag-tip">💡 ${escapeHtml(d.tip)}</p>
      </div>
    </div>`;
}
function sciToggleDiagram(id) {
  if (sciProgress.diagrams[id]) delete sciProgress.diagrams[id];
  else sciProgress.diagrams[id] = true;
  sciSave();
  const card = document.getElementById("diag-" + id);
  if (card) card.classList.toggle("checked", !!sciProgress.diagrams[id]);
  const count = document.getElementById("diagCount");
  if (count) count.textContent = SCIENCE_DIAGRAMS.filter(d => sciProgress.diagrams[d.id]).length;
}
