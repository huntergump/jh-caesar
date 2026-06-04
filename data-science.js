/* ============================================================
   Grade 8 Science — Exam prep content (June 2026)
   Topics: Body Systems · Static Electricity · Chemistry · Lab & Data
   ------------------------------------------------------------
   This bank was rebuilt from the class's own documents in /ScienceDocs
   (unit notes, review questions + ANSWER keys, checklists, the provided
   Triboelectric Series, and the Variables activity). Answers follow how
   THIS class teaches it, even where that is simpler than a textbook.

   STATUS CONVENTION:
     status: "verified"  → confirmed against the class documents. Safe to drill.
     status: "possible"  → standard-curriculum item not directly pinned down in
                            the docs, or a skill (e.g. drawing) hard to test as
                            multiple choice. Review, then flip to "verified".
   The app badges "possible" questions and has a "Verified only" toggle.
   Each question: { id, topic, status, command, prompt, choices:[…], answer, explain, note }
     - `answer` MUST exactly match one of the strings in `choices`.
     - `command` = MYP command term (State, Outline, Apply, Solve, Recall, Interpret).
   ============================================================ */

const SCIENCE_META = {
  subject: "Science",
  exam: "Grade 8 Science Exam — June 2026"
};

const SCIENCE_TOPICS = [
  { id: "body",      name: "Body Systems",        emoji: "🫀", blurb: "Nervous, digestive, respiratory & circulatory systems + connections." },
  { id: "static",    name: "Static Electricity",  emoji: "⚡", blurb: "Charge, the atom, charging methods, grounding & polarization." },
  { id: "chemistry", name: "Chemistry",           emoji: "🧪", blurb: "Periodic table, elements vs compounds, bonding & changes." },
  { id: "labdata",   name: "Lab & Data",          emoji: "📊", blurb: "Variables, graphs, procedures & experimental error." }
];

// MYP command term glossary (the terms this exam uses).
const SCIENCE_COMMANDS = {
  "State":     "Give a specific name, value, or other brief answer without explanation.",
  "Outline":   "Give a brief account or summary.",
  "Apply":     "Use knowledge and understanding in response to a given situation.",
  "Solve":     "Obtain an answer using appropriate methods.",
  "Recall":    "Remember or recognize from prior learning experience.",
  "Interpret": "Use knowledge and understanding to recognize trends and draw conclusions from given information."
};

/* MYP Criterion A achievement-level bands. The June exam uses Levels 1–6 only
   ("Level 7–8 questions will not be included on the exam"). Each question's band
   is derived from its command term (see COMMAND_LEVEL in science.js) unless the
   question sets its own `level`. */
const SCIENCE_LEVELS = {
  "1-2": { label: "Level 1–2", onExam: true,  desc: "Recall knowledge; apply it to familiar problems." },
  "3-4": { label: "Level 3–4", onExam: true,  desc: "State knowledge; solve problems in familiar situations." },
  "5-6": { label: "Level 5–6", onExam: true,  desc: "Outline knowledge; solve familiar problems and suggest solutions to unfamiliar ones; interpret to make supported judgements." },
  "7-8": { label: "Level 7–8", onExam: false, desc: "Describe knowledge; solve unfamiliar problems. NOT on the June exam." }
};

/* Per-question MYP level overrides (hand-tuned for balance & accuracy).
   A question's level = its own `level` field → this table → the command-term
   default (COMMAND_LEVEL in science.js: Recall=1-2, State/Solve/Apply=3-4,
   Outline/Interpret=5-6). Edit any entry to re-band a question; delete an
   entry to fall back to the command default.
   Guideline used:
     1-2  single-fact recall, lists, sequences, naming a part/value
     3-4  stating/defining knowledge; applying one rule in a familiar case
     5-6  explaining "why", comparing, multi-step reasoning, interpreting data
   Current spread with this table: ~23 (L1-2) · 44 (L3-4) · 20 (L5-6). */
const SCIENCE_LEVEL_OVERRIDES = {
  // ---- Body Systems ----
  "body-peristalsis": "1-2",
  "body-large-intestine": "1-2",
  "body-arteries": "1-2",
  "body-veins": "1-2",
  "body-chambers": "1-2",
  "body-valves": "1-2",
  "body-pharynx-shared": "3-4",   // really "identify the shared part"
  "body-small-intestine": "5-6",  // explain WHY it is longest
  "body-stretchy-organ": "5-6",   // cross-organism comparison
  "body-alveoli": "5-6",          // explain WHY good for gas exchange
  "body-surface-area": "5-6",     // system-connection reasoning
  // ---- Static Electricity ----
  "static-charges": "1-2",
  "static-location": "1-2",
  "static-neutral": "1-2",
  "static-like-unlike": "1-2",
  "static-contact": "1-2",
  "static-why-negative": "3-4",   // basic gain-electrons fact
  "static-why-positive": "3-4",
  "static-grounding": "3-4",
  "static-tribo-read": "5-6",     // solve using the series
  "static-induction": "5-6",      // explain polarization / no transfer
  "static-repulsion-rule": "5-6", // "no neutrality in repulsion" judgement
  "static-neutral-attract": "5-6",
  "static-ground-hand": "5-6",    // multi-step final charges
  "static-attract-nocontact": "5-6", // ambiguity reasoning
  // ---- Chemistry ----
  "chem-atomic-number": "1-2",
  "chem-metals-location": "1-2",
  "chem-periods-groups": "1-2",
  "chem-group-props": "1-2",
  "chem-mol-prefix": "1-2",
  "chem-metal-props": "3-4",      // recall of properties
  "chem-mono-rule": "5-6",        // explain WHY (naming reasoning)
  "chem-bond-type": "5-6",        // conceptual transfer-vs-share contrast
  // ---- Lab & Data ----
  "lab-hypothesis": "1-2",        // recall the if/then/because format
  "lab-procedure": "3-4",
  "lab-materials": "3-4",
  "lab-error-parts": "3-4",
  "lab-error-example": "5-6"      // evaluate/justify a fix
};

const SCIENCE_QUESTIONS = [
  /* ================= TOPIC 1: BODY SYSTEMS ================= */
  {
    id: "body-nervous-parts", topic: "body", status: "verified", command: "Recall",
    prompt: "The nervous system is made up of the…",
    choices: ["Nerves, brain, and spinal cord (and neurons)", "Nerves, brain, spinal cord, and heart", "Brain and heart only", "Nerves and lungs"],
    answer: "Nerves, brain, and spinal cord (and neurons)",
    explain: "The nervous system = brain, spinal cord and nerves (made of cells called neurons). The heart is NOT part of it — that's a common trick distractor.",
    note: "Class answer key excludes the heart."
  },
  {
    id: "body-neuron", topic: "body", status: "verified", command: "State",
    prompt: "What is a neuron?",
    choices: ["A nerve cell that carries electrical signals", "A muscle that pumps blood", "An air sac in the lungs", "A digestive enzyme"],
    answer: "A nerve cell that carries electrical signals",
    explain: "Nerves are bundles of fibres made of cells called neurons — the basic units of the nervous system that carry nerve impulses.", note: ""
  },
  {
    id: "body-reflex", topic: "body", status: "verified", command: "Apply",
    prompt: "A student taps below their kneecap with a reflex hammer, but the leg does NOT move. Why?",
    choices: ["They missed the sensory receptor on the nerve in that spot", "Their brain is not working", "They have no motor neurons", "The hammer was too light"],
    answer: "They missed the sensory receptor on the nerve in that spot",
    explain: "Tapping the correct spot hits a sensory receptor on a nerve, which sends a signal that makes the leg lift. No movement means the receptor wasn't hit.",
    note: "Class routes this reflex through the brain (their version)."
  },
  {
    id: "body-peristalsis", topic: "body", status: "verified", command: "State",
    prompt: "What does 'peristalsis' mean?",
    choices: ["Muscle contractions that push food along the digestive tract", "The chemical breakdown of food by enzymes", "Absorption of nutrients into the blood", "Filtering of waste by the kidneys"],
    answer: "Muscle contractions that push food along the digestive tract",
    explain: "Peristalsis is the wave-like muscle squeezing (e.g. in the esophagus and intestines) that moves food along — muscles working in the digestive system.", note: ""
  },
  {
    id: "body-human-order", topic: "body", status: "verified", command: "Recall",
    prompt: "In humans, which path does food correctly follow?",
    choices: ["Mouth → pharynx → esophagus → stomach → small intestine → large intestine", "Mouth → esophagus → stomach → large intestine → small intestine", "Mouth → trachea → stomach → intestines", "Mouth → stomach → esophagus → intestines"],
    answer: "Mouth → pharynx → esophagus → stomach → small intestine → large intestine",
    explain: "Food goes mouth → pharynx → esophagus → stomach → small intestine → large intestine → rectum → anus.", note: ""
  },
  {
    id: "body-small-intestine", topic: "body", status: "verified", command: "Apply",
    prompt: "Why is the small intestine the longest part (about 7 m) of the human digestive system?",
    choices: ["So food stays long enough for most nutrients to be absorbed", "So food can be chewed more", "To store solid waste", "To add oxygen to food"],
    answer: "So food stays long enough for most nutrients to be absorbed",
    explain: "The small intestine is long (and folded for surface area) so food stays long enough for MOST nutrient absorption into the blood.", note: ""
  },
  {
    id: "body-large-intestine", topic: "body", status: "verified", command: "State",
    prompt: "What is the main job of the large intestine (colon)?",
    choices: ["Absorbing water from the waste", "Absorbing most nutrients", "Producing bile", "Adding oxygen to blood"],
    answer: "Absorbing water from the waste",
    explain: "The large intestine uses peristalsis and absorbs water from the waste before it is stored in the rectum and expelled.", note: ""
  },
  {
    id: "body-ulcer", topic: "body", status: "verified", command: "Apply",
    prompt: "A doctor finds a stomach ulcer — acid has burned through the stomach lining. The most likely cause is…",
    choices: ["Not enough mucus", "Too much peristalsis", "Folds in the stomach", "Valves not working"],
    answer: "Not enough mucus",
    explain: "Mucus protects the stomach lining from its own acid. Without enough mucus, acid burns through — the class's accepted answer.",
    note: "Class-specific framing (mucus protection)."
  },
  {
    id: "body-earthworm-crop", topic: "body", status: "verified", command: "State",
    prompt: "In an earthworm, what is the job of the CROP?",
    choices: ["A soft, stretchy organ that stores food", "A hard organ that grinds food", "Where nutrients are absorbed", "Where waste leaves the body"],
    answer: "A soft, stretchy organ that stores food",
    explain: "The crop is the soft, stretchy storage organ (like the human stomach). The gizzard is the hard, grinding organ.", note: ""
  },
  {
    id: "body-earthworm-gizzard", topic: "body", status: "verified", command: "State",
    prompt: "In an earthworm, the GIZZARD…",
    choices: ["Physically grinds food into smaller bits", "Stores food until needed", "Absorbs all the nutrients", "Produces oxygen"],
    answer: "Physically grinds food into smaller bits",
    explain: "The hard gizzard contracts to physically break food down (helped by hard soil particles) — physical digestion.", note: ""
  },
  {
    id: "body-earthworm-order", topic: "body", status: "verified", command: "Recall",
    prompt: "Which is the correct order of the earthworm's digestive parts?",
    choices: ["Mouth → pharynx → esophagus → crop → gizzard → intestine → anus", "Mouth → crop → gizzard → esophagus → intestine → anus", "Mouth → stomach → gizzard → crop → anus", "Mouth → esophagus → gizzard → crop → intestine → anus"],
    answer: "Mouth → pharynx → esophagus → crop → gizzard → intestine → anus",
    explain: "Earthworm path: mouth → pharynx → esophagus → crop (store) → gizzard (grind) → intestine (absorb) → anus.", note: ""
  },
  {
    id: "body-hydra-cavity", topic: "body", status: "verified", command: "Outline",
    prompt: "How does a hydra's digestion differ from a human's?",
    choices: ["Food enters and waste leaves through ONE opening into a single cavity", "It has two separate stomachs", "It uses lungs to digest food", "It has a 7 m long intestine"],
    answer: "Food enters and waste leaves through ONE opening into a single cavity",
    explain: "A hydra grabs food with tentacles into its mouth, which leads to one gastrovascular cavity lined with enzyme-producing cells — a single opening, unlike the human one-way tube.", note: ""
  },
  {
    id: "body-stretchy-organ", topic: "body", status: "verified", command: "Apply",
    prompt: "The class pairs the human STOMACH with which structures as the 'stretchy organ that holds food'?",
    choices: ["The earthworm's crop and the hydra's cavity", "The earthworm's gizzard and the hydra's tentacles", "The lungs and the heart", "The pharynx and the esophagus"],
    answer: "The earthworm's crop and the hydra's cavity",
    explain: "Comparison taught in class: human stomach ≈ earthworm crop ≈ hydra cavity (all stretchy, store/hold food).", note: ""
  },
  {
    id: "body-resp-order", topic: "body", status: "verified", command: "Recall",
    prompt: "Which sequence shows air moving INTO the lungs?",
    choices: ["Nose/mouth → pharynx → trachea → bronchi → bronchioles → alveoli", "Nose → esophagus → stomach", "Trachea → veins → heart", "Alveoli → bronchi → trachea → nose"],
    answer: "Nose/mouth → pharynx → trachea → bronchi → bronchioles → alveoli",
    explain: "Air enters the nose/mouth → pharynx → trachea (windpipe) → bronchi → bronchioles → alveoli (air sacs).", note: ""
  },
  {
    id: "body-alveoli", topic: "body", status: "verified", command: "Apply",
    prompt: "Why are alveoli good for gas exchange?",
    choices: ["Their shape gives a large surface area for fast diffusion", "They are made of strong bone", "They pump blood with muscle", "They store food and water"],
    answer: "Their shape gives a large surface area for fast diffusion",
    explain: "Alveoli are moist sacs whose shape increases surface area; oxygen diffuses into the blood and carbon dioxide diffuses out — a respiratory–circulatory connection.", note: ""
  },
  {
    id: "body-trachea", topic: "body", status: "verified", command: "Apply",
    prompt: "A patient has trouble breathing. Which part is most likely damaged?",
    choices: ["Trachea", "Esophagus", "Stomach", "Pancreas"],
    answer: "Trachea",
    explain: "The trachea (windpipe) carries air to the lungs — it's respiratory. The esophagus is digestive.", note: ""
  },
  {
    id: "body-arteries", topic: "body", status: "verified", command: "State",
    prompt: "What do arteries do?",
    choices: ["Carry blood away from the heart", "Carry blood toward the heart", "Exchange gases with cells", "Store extra blood"],
    answer: "Carry blood away from the heart",
    explain: "Arteries carry blood AWAY from the heart; veins carry blood TOWARD the heart. (Arteries = Away.)", note: ""
  },
  {
    id: "body-veins", topic: "body", status: "verified", command: "State",
    prompt: "What do veins do?",
    choices: ["Carry blood toward the heart", "Carry blood away from the heart", "Pump blood by contracting", "Break down food"],
    answer: "Carry blood toward the heart",
    explain: "Veins return blood to the heart.", note: ""
  },
  {
    id: "body-capillaries", topic: "body", status: "verified", command: "State",
    prompt: "In this class, capillaries are described as…",
    choices: ["The network where veins meet arteries — the site of oxygen diffusion", "The chambers that pump blood", "The valves that stop backflow", "The largest blood vessels"],
    answer: "The network where veins meet arteries — the site of oxygen diffusion",
    explain: "Class wording: capillaries form where veins meet arteries and are where oxygen diffuses to the body's cells.",
    note: "Use the class phrasing."
  },
  {
    id: "body-chambers", topic: "body", status: "verified", command: "State",
    prompt: "How many chambers does the human heart have?",
    choices: ["Four", "Two", "Three", "One"],
    answer: "Four",
    explain: "Four chambers hold blood and contract/relax to move it. Valves keep it flowing one way.", note: ""
  },
  {
    id: "body-valves", topic: "body", status: "verified", command: "State",
    prompt: "What is the job of the valves in the heart?",
    choices: ["Keep blood moving in one direction", "Make new blood cells", "Add oxygen to blood", "Digest fats"],
    answer: "Keep blood moving in one direction",
    explain: "Valves prevent backflow so blood only moves one way.", note: ""
  },
  {
    id: "body-muscles", topic: "body", status: "verified", command: "Apply",
    prompt: "Which lists muscles used in the RESPIRATORY system?",
    choices: ["The diaphragm and the intercostal (rib) muscles", "The heart chambers and valves", "The crop and gizzard", "The small and large intestines"],
    answer: "The diaphragm and the intercostal (rib) muscles",
    explain: "Respiratory muscles include the diaphragm, the intercostal muscles between the ribs, and the bronchial tube walls. (Heart = circulatory; intestines = digestive.)", note: ""
  },
  {
    id: "body-phys-chem-digestion", topic: "body", status: "verified", command: "Apply",
    prompt: "Which correctly describes physical vs chemical digestion?",
    choices: ["Physical changes size/shape (chewing); chemical makes new substances (acid/enzymes)", "Both chewing and enzymes are chemical", "Chewing is chemical; enzymes are physical", "Neither involves a change"],
    answer: "Physical changes size/shape (chewing); chemical makes new substances (acid/enzymes)",
    explain: "Physical digestion (chewing, grinding) breaks food smaller with no new substance; chemical digestion (acid, enzymes) makes new substances.", note: ""
  },
  {
    id: "body-diffusion", topic: "body", status: "verified", command: "State",
    prompt: "What is diffusion?",
    choices: ["Movement of molecules from high concentration to low concentration", "Movement of molecules from low to high concentration", "Pumping fluids using muscle", "Breaking food into smaller pieces"],
    answer: "Movement of molecules from high concentration to low concentration",
    explain: "Diffusion is the (passive) movement of molecules from high to low concentration, across a membrane — how oxygen, CO₂ and nutrients move between systems.", note: ""
  },
  {
    id: "body-cell-resp", topic: "body", status: "verified", command: "State",
    prompt: "Cellular respiration in the body is best described as…",
    choices: ["Glucose + oxygen → carbon dioxide + water + energy (a chemical change)", "A physical change that makes no new substances", "Oxygen turning into nitrogen", "Food being chewed into pieces"],
    answer: "Glucose + oxygen → carbon dioxide + water + energy (a chemical change)",
    explain: "Cellular respiration is a chemical change in the bloodstream producing CO₂, water and energy — linking the digestive, respiratory and circulatory systems.", note: ""
  },
  {
    id: "body-pharynx-shared", topic: "body", status: "verified", command: "Outline",
    prompt: "Which part is shared by BOTH the digestive and respiratory systems?",
    choices: ["The pharynx", "The stomach", "The alveoli", "The heart"],
    answer: "The pharynx",
    explain: "The pharynx is an anatomical part the digestive and respiratory systems have in common — a key 'system connection'.", note: ""
  },
  {
    id: "body-surface-area", topic: "body", status: "verified", command: "Apply",
    prompt: "Folds/villi in the intestine and the shape of alveoli both increase…",
    choices: ["Surface area, to speed up diffusion/absorption", "The speed of peristalsis", "The number of valves", "Blood pressure"],
    answer: "Surface area, to speed up diffusion/absorption",
    explain: "More surface area = more room for diffusion, so nutrients (intestine) and gases (alveoli) are absorbed faster — a connection across systems.", note: ""
  },

  /* ================= TOPIC 2: STATIC ELECTRICITY ================= */
  {
    id: "static-define", topic: "static", status: "verified", command: "State",
    prompt: "What is static electricity?",
    choices: ["A buildup of charge on the outside of an object (an imbalance of charge)", "A steady current flowing in a wire", "Energy stored in a battery", "Heat made by friction"],
    answer: "A buildup of charge on the outside of an object (an imbalance of charge)",
    explain: "Static electricity is a force from the buildup/imbalance of charge on an object's surface, creating a stationary electric field.", note: ""
  },
  {
    id: "static-charges", topic: "static", status: "verified", command: "State",
    prompt: "Which lists the correct charges of the subatomic particles?",
    choices: ["Proton +, neutron 0, electron −", "Proton −, neutron +, electron 0", "Proton 0, neutron +, electron −", "Proton +, neutron −, electron 0"],
    answer: "Proton +, neutron 0, electron −",
    explain: "Protons are positive, neutrons have no charge, electrons are negative.", note: ""
  },
  {
    id: "static-location", topic: "static", status: "verified", command: "State",
    prompt: "Where are the subatomic particles located?",
    choices: ["Protons and neutrons in the nucleus; electrons orbit around it", "Electrons in the nucleus; protons orbit", "All three in the nucleus", "All three orbiting the nucleus"],
    answer: "Protons and neutrons in the nucleus; electrons orbit around it",
    explain: "Protons and neutrons sit in the nucleus; electrons spin in orbit around it.", note: ""
  },
  {
    id: "static-only-electrons", topic: "static", status: "verified", command: "Outline",
    prompt: "Why can only electrons move between objects?",
    choices: ["Electrons are outside the nucleus; protons and neutrons are bound inside it", "Electrons are the heaviest particles", "Protons are negative and repel", "Neutrons block the protons"],
    answer: "Electrons are outside the nucleus; protons and neutrons are bound inside it",
    explain: "Only electrons can move because they orbit OUTSIDE the nucleus; protons and neutrons are locked inside.", note: ""
  },
  {
    id: "static-neutral", topic: "static", status: "verified", command: "State",
    prompt: "An object is NEUTRAL when it has…",
    choices: ["Equal numbers of protons and electrons", "More electrons than protons", "More protons than electrons", "No protons at all"],
    answer: "Equal numbers of protons and electrons",
    explain: "Neutral = equal positive protons and negative electrons, so the net charge is zero.", note: ""
  },
  {
    id: "static-why-negative", topic: "static", status: "verified", command: "Outline",
    prompt: "An object becomes NEGATIVELY charged when it…",
    choices: ["Gains electrons", "Loses electrons", "Gains protons", "Loses neutrons"],
    answer: "Gains electrons",
    explain: "Gaining electrons makes an object negative; losing electrons makes it positive. Charges are conserved — only transferred.", note: ""
  },
  {
    id: "static-why-positive", topic: "static", status: "verified", command: "Outline",
    prompt: "An object becomes POSITIVELY charged when it…",
    choices: ["Loses electrons", "Gains electrons", "Gains neutrons", "Loses protons"],
    answer: "Loses electrons",
    explain: "Losing electrons leaves more protons than electrons, so the object is positive.", note: ""
  },
  {
    id: "static-like-unlike", topic: "static", status: "verified", command: "State",
    prompt: "Which is correct about electric forces?",
    choices: ["Like charges repel; unlike charges attract", "Like charges attract; unlike charges repel", "All charges attract", "All charges repel"],
    answer: "Like charges repel; unlike charges attract",
    explain: "Two like charges (both + or both −) push apart; opposite charges pull together.", note: ""
  },
  {
    id: "static-repulsion-rule", topic: "static", status: "verified", command: "Apply",
    prompt: "Two balloons rubbed on hair move APART on a table. What can you conclude?",
    choices: ["Both balloons have the same charge — neither can be neutral", "One balloon is neutral", "They have opposite charges", "Both balloons are positive only"],
    answer: "Both balloons have the same charge — neither can be neutral",
    explain: "There is 'no neutrality in repulsion' — to repel, both objects must carry the same charge (here, both negative from the hair).", note: ""
  },
  {
    id: "static-neutral-attract", topic: "static", status: "verified", command: "Apply",
    prompt: "A charged balloon sticks to a NEUTRAL wall. How?",
    choices: ["The charge polarizes the wall so opposite charges line up and attract", "The wall is secretly charged the same", "Like charges attracted them", "Protons jumped to the wall"],
    answer: "The charge polarizes the wall so opposite charges line up and attract",
    explain: "A charged object can attract a neutral one by causing polarization — charges in the wall separate so opposites face the balloon.", note: ""
  },
  {
    id: "static-contact", topic: "static", status: "verified", command: "State",
    prompt: "Charges can only transfer between objects when there is…",
    choices: ["Contact between the objects", "A large distance between them", "A magnet nearby", "Sunlight"],
    answer: "Contact between the objects",
    explain: "Electrons only move from one object to another when they make contact (friction or conduction). Bringing a charge NEAR (induction) moves no electrons.", note: ""
  },
  {
    id: "static-ea", topic: "static", status: "verified", command: "State",
    prompt: "Electron affinity (EA) is…",
    choices: ["A material's ability to hold onto its electrons", "The number of protons in a material", "How heavy a material is", "How shiny a material is"],
    answer: "A material's ability to hold onto its electrons",
    explain: "High EA = holds electrons tightly; low EA = loses them easily. Lower-EA materials give electrons to higher-EA materials.", note: ""
  },
  {
    id: "static-tribo-direction", topic: "static", status: "verified", command: "Apply",
    prompt: "Using the Triboelectric Series, electrons move from…",
    choices: ["The material with LOWER electron affinity to the one with HIGHER electron affinity", "Higher affinity to lower affinity", "The lighter to the heavier object", "The bigger to the smaller object"],
    answer: "The material with LOWER electron affinity to the one with HIGHER electron affinity",
    explain: "Lower-EA materials give electrons to higher-EA materials on contact. The higher-EA one becomes negative; the lower-EA one becomes positive.", note: ""
  },
  {
    id: "static-tribo-read", topic: "static", status: "verified", command: "Solve",
    prompt: "Rubbing cotton with material X leaves X POSITIVE. On the series, X must be…",
    choices: ["Below cotton (lower electron affinity — it gave away electrons)", "Above cotton (higher electron affinity)", "Exactly equal to cotton", "Made of metal"],
    answer: "Below cotton (lower electron affinity — it gave away electrons)",
    explain: "Positive = lost electrons, so X gave electrons to cotton → X has lower EA → X is below cotton on the series.", note: ""
  },
  {
    id: "static-friction", topic: "static", status: "verified", command: "Apply",
    prompt: "Rubbing a balloon on hair charges it by…",
    choices: ["Friction (two materials rubbed together)", "Conduction (touching, not rubbing)", "Induction (brought near, no contact)", "Grounding"],
    answer: "Friction (two materials rubbed together)",
    explain: "Charging by friction = two materials rubbed together so electrons transfer between them.", note: ""
  },
  {
    id: "static-conduction", topic: "static", status: "verified", command: "Apply",
    prompt: "A charged rod TOUCHES (but is not rubbed on) a neutral electroscope. This is charging by…",
    choices: ["Conduction — the object ends up with the same type of charge as the rod", "Friction — they were rubbed", "Induction — no contact", "Grounding"],
    answer: "Conduction — the object ends up with the same type of charge as the rod",
    explain: "Conduction is touch contact (not rubbing). Electrons transfer so the neutral object gains the SAME charge as the rod.", note: ""
  },
  {
    id: "static-induction", topic: "static", status: "verified", command: "Apply",
    prompt: "A charged rod is brought NEAR a neutral electroscope without touching it. What happens?",
    choices: ["The electroscope's charges polarize; no electrons transfer", "The electroscope gains the rod's charge permanently", "Protons jump to the rod", "Nothing at all"],
    answer: "The electroscope's charges polarize; no electrons transfer",
    explain: "Induction means a charge is brought near (no contact): the charges polarize but, since nothing touches, no electrons move and no permanent charge is left.", note: ""
  },
  {
    id: "static-permanent-induction", topic: "static", status: "verified", command: "Outline",
    prompt: "'Permanent induction' is charging by…",
    choices: ["Induction PLUS grounding (a charge held near while the object is grounded)", "Rubbing two objects together", "Touching with a charged rod only", "Heating the object"],
    answer: "Induction PLUS grounding (a charge held near while the object is grounded)",
    explain: "Permanent induction = induction + grounding: the near charge polarizes the object while grounding lets electrons transfer, leaving a lasting charge.",
    note: "Class also calls this 'induction with grounding'."
  },
  {
    id: "static-grounding", topic: "static", status: "verified", command: "Outline",
    prompt: "What does grounding an object do?",
    choices: ["Removes excess charge so the object returns to neutral", "Adds extra protons to it", "Makes it permanently negative", "Stops electrons from ever moving"],
    answer: "Removes excess charge so the object returns to neutral",
    explain: "Grounding gives charge a path to a large neutral body (like your hand or the Earth), neutralizing the object. 'The goal of every charged object is to get back to neutral.'", note: ""
  },
  {
    id: "static-ground-hand", topic: "static", status: "verified", command: "Apply",
    prompt: "You wrap a neutral hand around a NEGATIVE styrofoam ball. What are the final charges?",
    choices: ["Ball becomes neutral; hand becomes negative", "Ball becomes positive; hand neutral", "Both become negative", "Nothing changes"],
    answer: "Ball becomes neutral; hand becomes negative",
    explain: "Grounding: the negative ball gives its extra electrons to the hand to get back to neutral, leaving the hand negative.", note: ""
  },
  {
    id: "static-polarization", topic: "static", status: "verified", command: "State",
    prompt: "Polarization of charge means…",
    choices: ["Charges in an object separate into groups of positives and negatives", "An object loses all its electrons", "An object splits into two pieces", "Protons leave the nucleus"],
    answer: "Charges in an object separate into groups of positives and negatives",
    explain: "Polarization is a separation of charge (no transfer) that happens when a charged object is brought near a neutral one.", note: ""
  },
  {
    id: "static-pingpong", topic: "static", status: "verified", command: "Apply",
    prompt: "A positively charged rod REPELS a ping-pong ball. The ball must be…",
    choices: ["Positive (there is no neutrality in repulsion)", "Negative", "Neutral", "Either negative or neutral"],
    answer: "Positive (there is no neutrality in repulsion)",
    explain: "Repulsion only happens between like charges, and a neutral object can't be repelled — so the ball is also positive.", note: ""
  },
  {
    id: "static-attract-nocontact", topic: "static", status: "verified", command: "Apply",
    prompt: "A positive rod ATTRACTS a ball without touching it. The ball is…",
    choices: ["Either negative or neutral — you can't tell which", "Definitely negative", "Definitely positive", "Definitely neutral"],
    answer: "Either negative or neutral — you can't tell which",
    explain: "A positive object attracts negatives AND can attract a neutral object (by polarization), so attraction alone can't tell you which it is.", note: ""
  },
  {
    id: "static-lightning", topic: "static", status: "verified", command: "Apply",
    prompt: "Lightning and a Van de Graaff generator are both examples of…",
    choices: ["Static discharge — a sudden flow of built-up electrons", "Magnetism", "Chemical change", "Nuclear reactions"],
    answer: "Static discharge — a sudden flow of built-up electrons",
    explain: "Static discharge is the sudden flow of electrons from a charge buildup. In lightning, the light you see is moving electrons heating the air.",
    note: "Supplementary (Lightning / Van de Graaff handouts)."
  },

  /* ================= TOPIC 3: CHEMISTRY ================= */
  {
    id: "chem-element-compound", topic: "chemistry", status: "verified", command: "State",
    prompt: "What is the difference between an element and a compound?",
    choices: ["An element is one type of atom; a compound is 2+ elements chemically joined into a new substance", "An element has many kinds of atoms; a compound has one", "They are the same thing", "A compound is always a metal"],
    answer: "An element is one type of atom; a compound is 2+ elements chemically joined into a new substance",
    explain: "An element is a pure substance of identical particles; a compound forms when different elements undergo a chemical change to make a new substance (e.g. H₂O, CO₂).", note: ""
  },
  {
    id: "chem-mixture", topic: "chemistry", status: "verified", command: "State",
    prompt: "A mixture (like salt water or stainless steel) is formed by…",
    choices: ["A physical change (it is impure and can be separated)", "A chemical change making a new substance", "Sharing electrons in covalent bonds", "Transferring electrons in ionic bonds"],
    answer: "A physical change (it is impure and can be separated)",
    explain: "Mixtures form from a physical change and are impure; compounds form from a chemical change and are pure new substances.", note: ""
  },
  {
    id: "chem-atomic-number", topic: "chemistry", status: "verified", command: "State",
    prompt: "The atomic number tells you the number of…",
    choices: ["Protons (and electrons in a neutral atom)", "Neutrons only", "Protons plus neutrons", "Valence electrons only"],
    answer: "Protons (and electrons in a neutral atom)",
    explain: "Atomic number = protons, which also equals electrons in a neutral atom. It identifies the element.", note: ""
  },
  {
    id: "chem-neutrons", topic: "chemistry", status: "verified", command: "Solve",
    prompt: "How do you calculate the number of neutrons?",
    choices: ["Atomic mass − atomic number (rounded)", "Atomic number × 2", "Atomic mass + atomic number", "Valence electrons − protons"],
    answer: "Atomic mass − atomic number (rounded)",
    explain: "Mass = protons + neutrons, so neutrons = (rounded) atomic mass − atomic number.", note: ""
  },
  {
    id: "chem-metals-location", topic: "chemistry", status: "verified", command: "State",
    prompt: "On the periodic table, metals are mostly found…",
    choices: ["On the left and middle", "On the far right", "Only in the top row", "Only on the bottom"],
    answer: "On the left and middle",
    explain: "Metals are on the left/middle, non-metals on the upper right, and metalloids along the 'staircase' between them.", note: ""
  },
  {
    id: "chem-periods-groups", topic: "chemistry", status: "verified", command: "State",
    prompt: "On the periodic table, periods and groups are…",
    choices: ["Periods are the horizontal rows (7); groups are the vertical columns (18)", "Periods are columns; groups are rows", "Both are rows", "Both are columns"],
    answer: "Periods are the horizontal rows (7); groups are the vertical columns (18)",
    explain: "There are 7 periods (rows) and 18 groups (columns). Elements in the same group share similar properties.", note: ""
  },
  {
    id: "chem-group-props", topic: "chemistry", status: "verified", command: "State",
    prompt: "Elements in the same GROUP (vertical column)…",
    choices: ["Have similar properties", "Always have the same mass", "Are always metals", "Have the same number of neutrons"],
    answer: "Have similar properties",
    explain: "Groups (columns) contain elements with similar properties (e.g. Group 18 = stable noble gases).", note: ""
  },
  {
    id: "chem-metal-props", topic: "chemistry", status: "verified", command: "Outline",
    prompt: "Which set best describes metals?",
    choices: ["Shiny, conduct heat/electricity, malleable and ductile", "Dull, brittle, poor conductors", "Always gases at room temperature", "Never conduct electricity"],
    answer: "Shiny, conduct heat/electricity, malleable and ductile",
    explain: "Metals are shiny, good conductors, malleable (bendable) and ductile. Non-metals are usually dull, brittle, poor conductors.", note: ""
  },
  {
    id: "chem-ionic-vs-molecular", topic: "chemistry", status: "verified", command: "State",
    prompt: "An IONIC compound is usually made of…",
    choices: ["A metal combined with a non-metal", "Two non-metals", "Two metals", "A single element"],
    answer: "A metal combined with a non-metal",
    explain: "Ionic = metal + non-metal (electrons transferred). Molecular = non-metal + non-metal (electrons shared).", note: ""
  },
  {
    id: "chem-bond-type", topic: "chemistry", status: "verified", command: "State",
    prompt: "How do ionic and covalent bonding differ?",
    choices: ["Ionic = electrons are transferred; covalent = electrons are shared", "Ionic = shared; covalent = transferred", "Both transfer electrons", "Both share protons"],
    answer: "Ionic = electrons are transferred; covalent = electrons are shared",
    explain: "In ionic bonding a metal gives valence electrons to a non-metal (forming ions). In covalent (molecular) bonding non-metals share electrons.", note: ""
  },
  {
    id: "chem-not-molecule", topic: "chemistry", status: "verified", command: "State",
    prompt: "Which statement does this class say is TRUE?",
    choices: ["Molecular compounds are molecules, but ionic compounds are NOT molecules", "All compounds are molecules", "Ionic compounds are molecules; molecular ones are not", "No compound is a molecule"],
    answer: "Molecular compounds are molecules, but ionic compounds are NOT molecules",
    explain: "A likely trick: molecular compounds can be called molecules; ionic compounds cannot.",
    note: "Class-specific distinction."
  },
  {
    id: "chem-cation-anion", topic: "chemistry", status: "verified", command: "State",
    prompt: "Which is correct about ions?",
    choices: ["A metal forms a positive cation (gives electrons); a non-metal forms a negative anion (accepts electrons)", "Metals form negative anions; non-metals form positive cations", "Both form positive ions", "Ions have no charge"],
    answer: "A metal forms a positive cation (gives electrons); a non-metal forms a negative anion (accepts electrons)",
    explain: "Cation = metal ion, positive (lost electrons). Anion = non-metal ion, negative (gained electrons).", note: ""
  },
  {
    id: "chem-phys-chem-change", topic: "chemistry", status: "verified", command: "Apply",
    prompt: "Which of these is a CHEMICAL change?",
    choices: ["Iron rusting", "Ice melting", "Cutting paper", "Dissolving sugar in water"],
    answer: "Iron rusting",
    explain: "A chemical change uses up the starting material and makes a NEW substance (rust). Melting, cutting and dissolving are physical changes.", note: ""
  },
  {
    id: "chem-qual-quant", topic: "chemistry", status: "verified", command: "State",
    prompt: "Which is a QUANTITATIVE physical property?",
    choices: ["A density of 2.7 g/cm³", "A shiny appearance", "A blue colour", "A smooth texture"],
    answer: "A density of 2.7 g/cm³",
    explain: "Quantitative = described with numbers and units (mass, density, volume). Qualitative = described with words (colour, texture, shine).", note: ""
  },
  {
    id: "chem-chemical-property", topic: "chemistry", status: "verified", command: "State",
    prompt: "A CHEMICAL property describes…",
    choices: ["How a substance behaves when it undergoes a chemical change", "Its colour and texture", "Its mass and volume", "Its position on the periodic table"],
    answer: "How a substance behaves when it undergoes a chemical change",
    explain: "Chemical properties (e.g. flammability, how magnesium burns) only show during a chemical change. Physical properties don't change what the substance is.", note: ""
  },
  {
    id: "chem-ionic-naming", topic: "chemistry", status: "verified", command: "Apply",
    prompt: "What is the correct name for the ionic compound NaCl?",
    choices: ["Sodium chloride", "Sodium chlorine", "Chlorine sodide", "Sodium dichloride"],
    answer: "Sodium chloride",
    explain: "Ionic naming: metal first (sodium), then the non-metal with an '-ide' ending (chloride).",
    note: "Class teaches metal + non-metal'-ide' (no Roman numerals/polyatomic ions here)."
  },
  {
    id: "chem-mol-prefix", topic: "chemistry", status: "verified", command: "Apply",
    prompt: "In molecular compound names, the prefix meaning 'two' is…",
    choices: ["di-", "mono-", "tri-", "tetra-"],
    answer: "di-",
    explain: "Prefixes: mono(1), di(2), tri(3), tetra(4), penta(5), hexa(6). Example: CO₂ = carbon dioxide.", note: ""
  },
  {
    id: "chem-mono-rule", topic: "chemistry", status: "verified", command: "Apply",
    prompt: "Why is CO₂ named 'carbon dioxide' and NOT 'monocarbon dioxide'?",
    choices: ["'Mono' is not used on the FIRST element", "Carbon has no prefix ever", "There are two carbons", "Oxygen is a metal"],
    answer: "'Mono' is not used on the FIRST element",
    explain: "Class rule: in molecular names, 'mono' is dropped on the first element — so CO₂ is carbon dioxide.",
    note: "Class-specific naming rule."
  },
  {
    id: "chem-valence", topic: "chemistry", status: "verified", command: "State",
    prompt: "Valence electrons are…",
    choices: ["The electrons in the outermost shell", "The electrons in the nucleus", "The same as the number of neutrons", "The protons in an atom"],
    answer: "The electrons in the outermost shell",
    explain: "Valence electrons are in the outer (valence) shell and are the ones that form bonds.", note: ""
  },
  {
    id: "chem-electron-dot", topic: "chemistry", status: "possible", command: "Apply",
    prompt: "When drawing an electron dot diagram, you should…",
    choices: ["Place valence electrons one at a time and not pair them until 4 are placed", "Pair all electrons immediately", "Draw the shells and the nucleus", "Show neutrons as dots"],
    answer: "Place valence electrons one at a time and not pair them until 4 are placed",
    explain: "Class rule: electron dot diagrams show only the symbol + valence electrons, added one at a time, pairing only after 4 are placed.",
    note: "Confirm the drawing rule your class wants; hard to fully test as MC."
  },
  {
    id: "chem-bohr", topic: "chemistry", status: "verified", command: "Apply",
    prompt: "A correct Bohr-Rutherford diagram must show…",
    choices: ["Electron shells plus the numbers of protons, neutrons and electrons", "Only the valence electrons", "Only the chemical symbol", "The bonds between two atoms"],
    answer: "Electron shells plus the numbers of protons, neutrons and electrons",
    explain: "Bohr-Rutherford diagrams show the nucleus (protons + neutrons) and electrons arranged in shells (2, then 8, then 8).", note: ""
  },
  {
    id: "chem-ionic-props", topic: "chemistry", status: "possible", command: "Outline",
    prompt: "Compared with molecular compounds, ionic compounds tend to…",
    choices: ["Form crystals, have high melting points, and conduct in water (electrolytes)", "Have very low melting points and never conduct", "Always be gases", "Be made of two non-metals"],
    answer: "Form crystals, have high melting points, and conduct in water (electrolytes)",
    explain: "Ionic compounds form crystals, have high melting points and act as electrolytes in water; molecular compounds have low melting points and don't.",
    note: "Confirm how much detail your exam expects here."
  },

  /* ================= TOPIC 4: LAB & DATA ================= */
  {
    id: "lab-independent", topic: "labdata", status: "verified", command: "State",
    prompt: "The INDEPENDENT variable is…",
    choices: ["What you change to get the measurements", "What you measure (the data)", "What is kept the same in all trials", "A mistake in the experiment"],
    answer: "What you change to get the measurements",
    explain: "Independent = what you change (the difference between groups). Tip: 'I' change the Independent variable.", note: ""
  },
  {
    id: "lab-dependent", topic: "labdata", status: "verified", command: "State",
    prompt: "The DEPENDENT variable is…",
    choices: ["What you are measuring — the data you collect", "What you change on purpose", "What is kept constant", "The hypothesis"],
    answer: "What you are measuring — the data you collect",
    explain: "Dependent = what you measure; it depends on the independent variable.", note: ""
  },
  {
    id: "lab-control", topic: "labdata", status: "verified", command: "State",
    prompt: "CONTROL variables are…",
    choices: ["Things kept the same in all trials so the test is fair", "The one thing you change", "The thing you measure", "The conclusion"],
    answer: "Things kept the same in all trials so the test is fair",
    explain: "All experiments have multiple controls — everything kept constant so only the independent variable affects the result.", note: ""
  },
  {
    id: "lab-id-pickleball", topic: "labdata", status: "verified", command: "Apply",
    prompt: "Testing whether a tennis ball or a pickle ball bounces higher, dropped from 1 m onto the same floor. What is the INDEPENDENT variable?",
    choices: ["The type of ball", "The bounce height", "The drop height", "The floor surface"],
    answer: "The type of ball",
    explain: "You change the type of ball (independent), measure bounce height (dependent), and keep drop height and floor the same (controls).",
    note: "From the class Variables activity example."
  },
  {
    id: "lab-id-dimples", topic: "labdata", status: "verified", command: "Apply",
    prompt: "Testing 'Does adding dimples to a car improve gas mileage?' using two identical cars. What is the DEPENDENT variable?",
    choices: ["Gas mileage", "The presence or absence of dimples", "The type of car", "The driver"],
    answer: "Gas mileage",
    explain: "You change dimples vs no dimples (independent) and measure gas mileage (dependent); the car model is a control.",
    note: "From the class Variables ANSWERS doc."
  },
  {
    id: "lab-procedure", topic: "labdata", status: "verified", command: "Outline",
    prompt: "What makes a good experimental method (procedure) in this class?",
    choices: ["Numbered, specific, repeatable steps written in past tense", "A general paragraph of ideas", "Bullet points with no order", "Just the conclusion"],
    answer: "Numbered, specific, repeatable steps written in past tense",
    explain: "A good procedure is numbered (not bulleted), past tense, clear, specific, repeatable, logical, safe and complete.", note: ""
  },
  {
    id: "lab-materials", topic: "labdata", status: "verified", command: "Outline",
    prompt: "A materials list should be…",
    choices: ["A list, as specific as possible (with quantities/sizes)", "Written as a paragraph", "Left out of a lab", "Only the equipment names with no amounts"],
    answer: "A list, as specific as possible (with quantities/sizes)",
    explain: "Materials are written as a specific list (e.g. '50 mL graduated cylinder'), not a paragraph.", note: ""
  },
  {
    id: "lab-hypothesis", topic: "labdata", status: "verified", command: "State",
    prompt: "What format does this class use for a hypothesis?",
    choices: ["If… then… because…", "A question ending in '?'", "A single yes/no answer", "Only the conclusion"],
    answer: "If… then… because…",
    explain: "Hypotheses use 'if (independent), then (predicted dependent result), because (reason)'.", note: ""
  },
  {
    id: "lab-error-parts", topic: "labdata", status: "verified", command: "Outline",
    prompt: "When writing about an experimental error, you must give…",
    choices: ["The source of the error, the problem it caused, and a way to fix it next time", "Only that an error happened", "A new hypothesis", "The materials list"],
    answer: "The source of the error, the problem it caused, and a way to fix it next time",
    explain: "For each error: (1) source, (2) the problem caused, (3) a fix to minimize it in future experiments.", note: ""
  },
  {
    id: "lab-error-example", topic: "labdata", status: "verified", command: "Apply",
    prompt: "A human dropped the ball from '1 m' by hand each trial. What is the best fix for this error?",
    choices: ["Use a machine to drop the ball from the exact same height", "Drop it faster", "Use a heavier ball", "Stop measuring bounce height"],
    answer: "Use a machine to drop the ball from the exact same height",
    explain: "Humans can't release from the exact same height each time, so a control isn't truly controlled. A machine (or repeated checks) fixes it.", note: ""
  },
  {
    id: "lab-interpret", topic: "labdata", status: "verified", command: "Interpret",
    prompt: "A graph shows reaction time getting LONGER as temperature DROPS. The best conclusion is…",
    choices: ["Lower temperatures are linked to slower reaction times", "Temperature has no effect", "Reaction time causes the temperature", "Higher temperature stops the reaction"],
    answer: "Lower temperatures are linked to slower reaction times",
    explain: "Interpret = state the trend shown by the data (as temperature falls, reaction time rises). Don't add causes the data doesn't show.", note: ""
  },
  {
    id: "lab-conclusion", topic: "labdata", status: "verified", command: "Interpret",
    prompt: "A new ball averaged 132 cm and a used ball averaged 119 cm. A good data-based conclusion is…",
    choices: ["The new ball bounced about 13 cm higher on average", "The balls bounced the same", "The used ball bounced higher", "No conclusion is possible"],
    answer: "The new ball bounced about 13 cm higher on average",
    explain: "Compare the averages: 132 − 119 = 13 cm higher for the new ball — a conclusion supported directly by the data.", note: ""
  },
  {
    id: "lab-command-interpret", topic: "labdata", status: "verified", command: "Recall",
    prompt: "On this exam, the command term 'Interpret' asks you to…",
    choices: ["Recognize trends and draw conclusions from given information", "Give a one-word answer with no explanation", "Only list materials", "Copy the data with no analysis"],
    answer: "Recognize trends and draw conclusions from given information",
    explain: "'Interpret' = use the data to spot a trend and reach a supported conclusion — common in Section C.", note: ""
  },
  {
    id: "lab-command-state", topic: "labdata", status: "verified", command: "Recall",
    prompt: "The command term 'State' asks you to…",
    choices: ["Give a specific name, value or brief answer without explanation", "Write a detailed essay", "Draw a labelled diagram", "Design an experiment"],
    answer: "Give a specific name, value or brief answer without explanation",
    explain: "'State' wants a short, specific answer — no explanation needed.", note: ""
  }
];

/* ============================================================
   DIAGRAM SKILLS CHECKLIST
   The exam expects students to DRAW and INTERPRET several diagrams that
   multiple-choice can't fully test. This is a self-check reference: each
   item lists exactly what a correct diagram must include, drawn from the
   class notes. (Tick "I can draw this" in the app — progress saves.)
   ============================================================ */
const SCIENCE_DIAGRAMS = [
  {
    id: "diag-bohr", topic: "chemistry", title: "Bohr-Rutherford diagram",
    mustInclude: [
      "Nucleus labelled with the number of protons (p) and neutrons (n)",
      "Electron shells drawn as circles around the nucleus",
      "Electrons filled in order: 2 in the first shell, then up to 8, then 8",
      "Total electrons = the atomic number (for a neutral atom)"
    ],
    tip: "Neutrons = atomic mass (rounded) − atomic number. Protons = electrons = atomic number."
  },
  {
    id: "diag-dot", topic: "chemistry", title: "Electron dot (Lewis) diagram",
    mustInclude: [
      "The element's chemical symbol in the centre",
      "ONLY the valence electrons shown (no shells, no nucleus)",
      "Dots added one at a time to the four sides",
      "Don't pair dots until all four sides have one"
    ],
    tip: "Valence electrons = electrons in the outermost shell; they're the ones that bond."
  },
  {
    id: "diag-ionic", topic: "chemistry", title: "Ionic bonding diagram (with arrows)",
    mustInclude: [
      "A metal and a non-metal",
      "Arrow(s) showing valence electrons TRANSFERRED from the metal to the non-metal",
      "Resulting ion charges: metal becomes a positive cation, non-metal a negative anion",
      "The number of electrons given/accepted matches the lone valence electrons"
    ],
    tip: "Ionic = transfer. Metal gives, non-metal accepts."
  },
  {
    id: "diag-molecular", topic: "chemistry", title: "Molecular (covalent) bonding diagram",
    mustInclude: [
      "Two (or more) non-metals",
      "Electron dot diagram showing SHARED pairs of electrons",
      "A structural formula (a line = one shared pair of electrons)",
      "Each atom ends up with a full/shared outer shell"
    ],
    tip: "Covalent = sharing. Molecular compounds can be called molecules; ionic compounds cannot."
  },
  {
    id: "diag-electroscope", topic: "static", title: "Electroscope — Before / During / After",
    mustInclude: [
      "BEFORE: neutral electroscope (ball + leaves), equal + and −, leaves hanging closed",
      "DURING: charged rod brought near (induction) or touching (conduction); show charges polarizing and arrows for the direction electrons move",
      "If grounded (permanent induction): show electrons leaving to/from the hand",
      "AFTER: the final charge on the electroscope; leaves spread apart if it is charged"
    ],
    tip: "Induction = brought near, charges polarize, no transfer. Conduction = touch, same charge transfers. Permanent induction = induction + grounding."
  },
  {
    id: "diag-charging", topic: "static", title: "Charging diagram (rods & objects)",
    mustInclude: [
      "Each object labelled with its charge (+, −, or neutral)",
      "Arrows showing the DIRECTION electrons move (only electrons move, only on contact)",
      "Whether the objects attract or repel",
      "The final charge left on every object"
    ],
    tip: "Lower electron affinity gives electrons to higher. 'No neutrality in repulsion' — repelling objects share the same charge."
  },
  {
    id: "diag-body-flow", topic: "body", title: "Label a body-system flow diagram",
    mustInclude: [
      "Digestive path in order: mouth → pharynx → esophagus → stomach → small intestine → large intestine → rectum → anus",
      "Heart: four chambers, valves (one-way), arteries (away) and veins (toward)",
      "Mark where DIFFUSION happens (alveoli ↔ capillaries; intestine → blood)",
      "Mark where SURFACE AREA is increased (alveoli; intestinal folds/villi)"
    ],
    tip: "These 'system connections' (surface area, diffusion, shared parts like the pharynx) are common exam questions."
  }
];
