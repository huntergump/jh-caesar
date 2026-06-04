// Julius Caesar — study passages.
// Quote text is from the public-domain play (lightly trimmed for the key lines).
// Analysis (context / devices / significance) is a study draft — FACT-CHECK against your handout.
// Each passage drives multiple game modes via its `questions`.

const PASSAGES = [
  {
    id: "feathers",
    act: 1, scene: 1,
    nickname: "Feathers",
    linesAL: "73–80", linesBook: "69–71",
    speaker: "Flavius",
    audience: "Marullus (and the audience)",
    quote:
      "These growing feathers plucked from Caesar's wing / Will make him fly an ordinary pitch, / Who else would soar above the view of men / And keep us all in servile fearfulness.",
    context:
      "Opening scene. The tribunes Flavius and Marullus have just scolded the commoners for celebrating Caesar's triumph over Pompey, and they drive the crowd away and strip decorations off Caesar's statues.",
    devices: ["metaphor", "extended metaphor"],
    appeal: [],
    significance:
      "Introduces the play's central fear — that Caesar is rising too high. The 'feathers' image frames Caesar as a bird that must be clipped to keep him from tyranny, foreshadowing the conspiracy.",
    questions: [
      { type: "speaker", prompt: "Who speaks the 'growing feathers' lines?", choices: ["Flavius", "Caesar", "Cassius", "Brutus"], answer: "Flavius", explain: "Flavius, a tribune, says this after clearing the streets of Caesar's celebrants." },
      { type: "device", prompt: "What figurative language dominates this passage?", choices: ["Metaphor (Caesar as a bird whose feathers are plucked)", "Onomatopoeia", "Alliteration only", "Apostrophe to the gods"], answer: "Metaphor (Caesar as a bird whose feathers are plucked)", explain: "Caesar's power is an extended metaphor of a bird's wing; clipping the feathers keeps him from soaring into tyranny." },
      { type: "context", prompt: "What is happening when this is said?", choices: ["Tribunes have just dispersed a crowd celebrating Caesar", "Caesar is being stabbed", "Antony is giving his funeral oration", "Brutus sees Caesar's ghost"], answer: "Tribunes have just dispersed a crowd celebrating Caesar", explain: "It is the very opening of the play — Flavius and Marullus push back against Caesar's growing popularity." }
    ]
  },
  {
    id: "colossus",
    act: 1, scene: 2,
    nickname: "Colossus",
    linesAL: "142–148", linesBook: "135–141",
    speaker: "Cassius",
    audience: "Brutus",
    quote:
      "Why, man, he doth bestride the narrow world / Like a Colossus, and we petty men / Walk under his huge legs and peep about / To find ourselves dishonourable graves.",
    context:
      "Cassius is working on Brutus, trying to recruit him into the conspiracy by stoking resentment at how much power Caesar has gained.",
    devices: ["simile", "allusion", "hyperbole"],
    appeal: ["pathos", "logos"],
    significance:
      "Key manipulation moment. Cassius paints Caesar as monstrously oversized to convince Brutus that ordinary men have been reduced to nothing — planting the seed of the assassination.",
    questions: [
      { type: "speaker", prompt: "Who compares Caesar to a Colossus?", choices: ["Cassius", "Casca", "Brutus", "Antony"], answer: "Cassius", explain: "Cassius uses the image to manipulate Brutus into joining the conspiracy." },
      { type: "device", prompt: "What device is 'Like a Colossus'?", choices: ["Simile (with allusion to the Colossus of Rhodes)", "Personification", "Pun", "Understatement"], answer: "Simile (with allusion to the Colossus of Rhodes)", explain: "The word 'Like' signals a simile, and the Colossus is an allusion to the giant statue of Rhodes — also hyperbole." },
      { type: "context", prompt: "Why does Cassius say this?", choices: ["To persuade Brutus that Caesar has become too powerful", "To praise Caesar's leadership", "To mourn Pompey", "To warn Caesar of the soothsayer"], answer: "To persuade Brutus that Caesar has become too powerful", explain: "It is part of Cassius's seduction of Brutus into the plot." }
    ]
  },
  {
    id: "fat-bald",
    act: 1, scene: 2,
    nickname: "Fat / Bald",
    linesAL: "202–205", linesBook: "192–195",
    speaker: "Caesar",
    audience: "Antony",
    quote:
      "Let me have men about me that are fat, / Sleek-headed men and such as sleep o' nights. / Yond Cassius has a lean and hungry look; / He thinks too much: such men are dangerous.",
    context:
      "At the celebration, Caesar quietly tells Antony that he distrusts Cassius, noticing his lean, brooding appearance.",
    devices: ["characterization", "imagery", "foreshadowing"],
    appeal: [],
    significance:
      "Shows Caesar's sharp judgment of character (he's right about Cassius) but also his pride — he insists he does not fear. Foreshadows the danger Cassius poses.",
    questions: [
      { type: "speaker", prompt: "Who says 'Yond Cassius has a lean and hungry look'?", choices: ["Caesar", "Antony", "Brutus", "Casca"], answer: "Caesar", explain: "Caesar confides his distrust of Cassius to Antony." },
      { type: "device", prompt: "What does the 'lean and hungry look' achieve?", choices: ["Imagery / characterization that foreshadows danger", "A metaphor comparing Cassius to food", "Comic relief through a pun", "An allusion to mythology"], answer: "Imagery / characterization that foreshadows danger", explain: "The physical description characterizes Cassius as a threatening, scheming man and foreshadows his role in the plot." },
      { type: "context", prompt: "What is Caesar doing here?", choices: ["Telling Antony he distrusts Cassius", "Refusing the crown", "Reading the conspirators' letters", "Saying farewell to Calpurnia"], answer: "Telling Antony he distrusts Cassius", explain: "Caesar reads Cassius's character accurately but claims he is not afraid." }
    ]
  },
  {
    id: "seduced-letters",
    act: 1, scene: 2,
    nickname: "Seduced / Letters",
    linesAL: "320–334", linesBook: "307–321",
    speaker: "Cassius",
    audience: "audience (soliloquy)",
    quote:
      "Well, Brutus, thou art noble; yet I see / Thy honourable mettle may be wrought / From that it is disposed... / I will this night, / In several hands, in at his windows throw, / As if they came from several citizens, / Writings...",
    context:
      "Left alone, Cassius reveals his plan to forge letters from citizens and throw them through Brutus's windows to push him toward the conspiracy.",
    devices: ["soliloquy", "metaphor", "dramatic irony"],
    appeal: ["logos"],
    significance:
      "Exposes Cassius as a manipulator and confirms Brutus's nobility is being exploited. The forged letters are how Brutus is finally 'seduced' into the plot.",
    questions: [
      { type: "speaker", prompt: "Who plans to forge letters to Brutus?", choices: ["Cassius", "Casca", "Decius", "Cinna the poet"], answer: "Cassius", explain: "In a soliloquy, Cassius schemes to throw forged letters through Brutus's windows." },
      { type: "device", prompt: "This speech is delivered as a...", choices: ["Soliloquy (alone, revealing his true plan)", "Aside to Brutus", "Public oration", "Dialogue with Caesar"], answer: "Soliloquy (alone, revealing his true plan)", explain: "Cassius is alone on stage, letting the audience hear his manipulative scheme — also dramatic irony, since Brutus won't know the letters are fake." },
      { type: "context", prompt: "What is the purpose of the forged letters?", choices: ["To make Brutus think citizens want him to oppose Caesar", "To warn Caesar of the plot", "To bribe the army", "To convince Calpurnia of her dream"], answer: "To make Brutus think citizens want him to oppose Caesar", explain: "Cassius fakes public support to recruit Brutus." }
    ]
  },
  {
    id: "omens",
    act: 1, scene: 3,
    nickname: "Omens",
    linesAL: "15–32", linesBook: "10–34",
    speaker: "Casca",
    audience: "Cicero",
    quote:
      "A common slave—you know him well by sight— / Held up his left hand, which did flame and burn / Like twenty torches joined, and yet his hand, / Not sensible of fire, remained unscorched... / men, all in fire, walk up and down the streets.",
    context:
      "During a violent storm the night before the assassination, Casca describes terrifying supernatural omens to Cicero.",
    devices: ["simile", "imagery", "foreshadowing", "pathetic fallacy"],
    appeal: ["pathos"],
    significance:
      "The unnatural storm and omens mirror the unnatural act about to be committed (killing Caesar) and build dread. Pathetic fallacy: nature reflects political chaos.",
    questions: [
      { type: "speaker", prompt: "Who describes the fiery omens during the storm?", choices: ["Casca", "Cassius", "Brutus", "The Soothsayer"], answer: "Casca", explain: "Casca recounts the supernatural sights to Cicero on the stormy night before the assassination." },
      { type: "device", prompt: "Nature mirroring human turmoil here is an example of...", choices: ["Pathetic fallacy / foreshadowing", "Hyperbole only", "Pun", "Apostrophe"], answer: "Pathetic fallacy / foreshadowing", explain: "The chaotic storm reflects the political chaos to come and foreshadows the assassination." },
      { type: "context", prompt: "When do these omens occur?", choices: ["The stormy night before Caesar's assassination", "After Antony's funeral speech", "During the battle at Philippi", "At Caesar's triumph parade"], answer: "The stormy night before Caesar's assassination", explain: "The omens build dread on the eve of the murder." }
    ]
  },
  {
    id: "serpent",
    act: 2, scene: 1,
    nickname: "Serpent",
    linesAL: "10–36", linesBook: "10–36",
    speaker: "Brutus",
    audience: "audience (soliloquy)",
    quote:
      "It must be by his death: and for my part, / I know no personal cause to spurn at him, / But for the general... / And therefore think him as a serpent's egg / Which, hatched, would as his kind grow mischievous, / And kill him in the shell.",
    context:
      "Alone in his orchard, Brutus reasons himself into joining the assassination, deciding Caesar must die for what he might become, not for what he has done.",
    devices: ["soliloquy", "metaphor", "simile"],
    appeal: ["logos"],
    significance:
      "Reveals Brutus's tragic logic: he kills Caesar preemptively. The 'serpent's egg' metaphor shows he condemns Caesar for potential tyranny, exposing the flaw in his reasoning.",
    questions: [
      { type: "speaker", prompt: "Who reasons that Caesar is like a 'serpent's egg'?", choices: ["Brutus", "Cassius", "Antony", "Caesar"], answer: "Brutus", explain: "In his orchard soliloquy, Brutus convinces himself to join the plot." },
      { type: "device", prompt: "'Serpent's egg / Which, hatched, would... grow mischievous' is a...", choices: ["Metaphor for Caesar's potential to become a tyrant", "Literal description of a snake", "Allusion to Hercules", "Hyperbolic insult"], answer: "Metaphor for Caesar's potential to become a tyrant", explain: "Brutus compares Caesar to a dangerous egg best killed before it hatches — justifying preemptive murder." },
      { type: "context", prompt: "What decision is Brutus making here?", choices: ["Whether to join the conspiracy to kill Caesar", "Whether to flee Rome", "Whether to marry Portia", "Whether to trust Antony"], answer: "Whether to join the conspiracy to kill Caesar", explain: "This soliloquy is Brutus talking himself into the assassination." }
    ]
  },
  {
    id: "purgers",
    act: 2, scene: 1,
    nickname: "Purgers / Murderers",
    linesAL: "175–196", linesBook: "162–183",
    speaker: "Brutus",
    audience: "the conspirators (Cassius and others)",
    quote:
      "Let's be sacrificers, but not butchers, Caius... / Let's carve him as a dish fit for the gods, / Not hew him as a carcass fit for hounds... / And, gentle friends, / Let's kill him boldly, but not wrathfully... / We shall be called purgers, not murderers.",
    context:
      "Planning the assassination, Brutus persuades the conspirators to spare Antony and to treat the killing as a noble, ritual act rather than a savage slaughter.",
    devices: ["metaphor", "antithesis", "euphemism"],
    appeal: ["ethos", "pathos"],
    significance:
      "Shows Brutus's idealism and self-deception — he wants murder to look like sacrifice. His decision to spare Antony proves a fatal mistake. 'Purgers, not murderers' is dramatic irony.",
    questions: [
      { type: "speaker", prompt: "Who urges 'Let's be sacrificers, but not butchers'?", choices: ["Brutus", "Cassius", "Casca", "Decius"], answer: "Brutus", explain: "Brutus reframes the murder as a noble sacrifice to ease his conscience and the conspirators'." },
      { type: "device", prompt: "'Sacrificers, but not butchers' relies on...", choices: ["Antithesis (and euphemism for murder)", "Onomatopoeia", "A simile", "An allusion to the gods only"], answer: "Antithesis (and euphemism for murder)", explain: "Contrasting paired opposites ('sacrificers'/'butchers') is antithesis; calling murder sacrifice is euphemism — and dramatic irony." },
      { type: "context", prompt: "What is being decided in this scene?", choices: ["How the assassination should be carried out (and to spare Antony)", "Whether to read Calpurnia's dream", "How to bribe the soldiers", "Where to fight the battle"], answer: "How the assassination should be carried out (and to spare Antony)", explain: "Brutus's choice to spare Antony here becomes a fatal error." }
    ]
  },
  {
    id: "cowards",
    act: 2, scene: 2,
    nickname: "Cowards",
    linesAL: "34–39", linesBook: "32–37",
    speaker: "Caesar",
    audience: "Calpurnia",
    quote:
      "Cowards die many times before their deaths; / The valiant never taste of death but once. / Of all the wonders that I yet have heard, / It seems to me most strange that men should fear, / Seeing that death, a necessary end, / Will come when it will come.",
    context:
      "On the morning of the assassination, Calpurnia begs Caesar to stay home after her nightmares; Caesar dismisses her fears, declaring he will not be ruled by cowardice.",
    devices: ["antithesis", "aphorism", "metaphor"],
    appeal: ["ethos"],
    significance:
      "Defines Caesar's heroic but proud self-image. His refusal to show fear leads him to ignore the warnings and go to the Senate, sealing his fate. Dramatic irony — he dies that day.",
    questions: [
      { type: "speaker", prompt: "Who says 'Cowards die many times before their deaths'?", choices: ["Caesar", "Brutus", "Antony", "Cassius"], answer: "Caesar", explain: "Caesar says it to Calpurnia, dismissing her fears the morning he is killed." },
      { type: "device", prompt: "'Cowards die many times... the valiant never taste of death but once' is...", choices: ["Antithesis / aphorism", "Hyperbole only", "Personification", "A pun"], answer: "Antithesis / aphorism", explain: "It contrasts cowards and the valiant in a memorable, proverb-like statement." },
      { type: "context", prompt: "What is happening when Caesar says this?", choices: ["Calpurnia is begging him to stay home", "He is being crowned", "He is dying", "He is reading omens with Casca"], answer: "Calpurnia is begging him to stay home", explain: "Caesar brushes off her nightmares and the omens — dramatic irony, since he dies that day." }
    ]
  },
  {
    id: "fountains",
    act: 2, scene: 2,
    nickname: "Fountains of blood",
    linesAL: "80–87", linesBook: "75–82",
    speaker: "Decius",
    audience: "Caesar (and Calpurnia)",
    quote:
      "This dream is all amiss interpreted; / It was a vision fair and fortunate: / Your statue spouting blood in many pipes, / In which so many smiling Romans bathed, / Signifies that from you great Rome shall suck / Reviving blood...",
    context:
      "Calpurnia dreamed of Caesar's statue spouting blood. Decius, a conspirator, deliberately reinterprets the dream as positive to flatter Caesar into going to the Senate.",
    devices: ["imagery", "dramatic irony", "metaphor"],
    appeal: ["pathos", "logos"],
    significance:
      "Shows how flattery and false interpretation manipulate Caesar. The blood imagery is dramatic irony — the dream truly foretold his murder, which Decius twists into a good omen.",
    questions: [
      { type: "speaker", prompt: "Who reinterprets Calpurnia's bloody dream as 'fair and fortunate'?", choices: ["Decius", "Antony", "Brutus", "Caesar"], answer: "Decius", explain: "Decius flatters Caesar by twisting the dream to lure him to the Senate." },
      { type: "device", prompt: "The reinterpreted dream is a strong example of...", choices: ["Dramatic irony (the dream really foretells his death)", "Onomatopoeia", "Comic pun", "Understatement"], answer: "Dramatic irony (the dream really foretells his death)", explain: "The audience knows the bloody vision is a true warning; Decius spins it as a blessing." },
      { type: "context", prompt: "Why does Decius reinterpret the dream?", choices: ["To convince Caesar to go to the Senate", "To warn Caesar of the plot", "To comfort Calpurnia", "To mock the soothsayer"], answer: "To convince Caesar to go to the Senate", explain: "It is manipulation — getting Caesar to the place he will be killed." }
    ]
  },
  {
    id: "dream",
    act: 2, scene: 2,
    nickname: "Dream interpretation",
    linesAL: "88–95", linesBook: "83–90",
    speaker: "Decius",
    audience: "Caesar",
    quote:
      "And this way have you well expounded it. / ...the Senate have concluded / To give this day a crown to mighty Caesar. / If you shall send them word you will not come, / Their minds may change... / Lo, Caesar is afraid?",
    context:
      "Continuing to work on Caesar, Decius adds that the Senate plans to crown him and hints he'll look like a coward if he stays home — sealing Caesar's decision to go.",
    devices: ["rhetorical question", "flattery", "irony"],
    appeal: ["pathos", "ethos"],
    significance:
      "Completes the manipulation: Decius appeals to Caesar's ambition (a crown) and pride (fear of seeming a coward). Caesar's vanity overrides Calpurnia's warning.",
    questions: [
      { type: "speaker", prompt: "Who tempts Caesar with news of a crown and a jab about looking afraid?", choices: ["Decius", "Cassius", "Casca", "Brutus"], answer: "Decius", explain: "Decius uses ambition and pride to override Calpurnia's warnings." },
      { type: "device", prompt: "'Lo, Caesar is afraid?' works mainly as...", choices: ["A rhetorical question that goads his pride", "A literal question needing an answer", "An allusion", "Onomatopoeia"], answer: "A rhetorical question that goads his pride", explain: "It shames Caesar into going, exploiting his fear of seeming cowardly." },
      { type: "context", prompt: "What finally persuades Caesar to go to the Senate?", choices: ["The promise of a crown and not wanting to seem afraid", "Calpurnia's dream", "The soothsayer's warning", "Antony's advice"], answer: "The promise of a crown and not wanting to seem afraid", explain: "Ambition and pride win out — Caesar goes and is killed." }
    ]
  },
  {
    id: "northern-star",
    act: 3, scene: 1,
    nickname: "Northern Star",
    linesAL: "66–68", linesBook: "60–63",
    speaker: "Caesar",
    audience: "the Senate (the conspirators)",
    quote:
      "But I am constant as the northern star, / Of whose true-fixed and resting quality / There is no fellow in the firmament.",
    context:
      "Moments before the assassination, the conspirators plead (pretending to petition for Publius Cimber's pardon). Caesar refuses to change his mind, boasting of his unshakable constancy.",
    devices: ["simile", "metaphor", "imagery"],
    appeal: ["ethos"],
    significance:
      "Peak of Caesar's pride. Comparing himself to the one fixed star in the heavens shows arrogance and inflexibility — and is immediately followed by his murder, the ultimate irony.",
    questions: [
      { type: "speaker", prompt: "Who calls himself 'constant as the northern star'?", choices: ["Caesar", "Brutus", "Cassius", "Antony"], answer: "Caesar", explain: "Caesar boasts of his constancy just before he is stabbed." },
      { type: "device", prompt: "'Constant as the northern star' is a...", choices: ["Simile expressing his unchanging pride", "Pun on the night sky", "Personification of Rome", "Euphemism for death"], answer: "Simile expressing his unchanging pride", explain: "He likens himself to the one unmoving star — arrogant inflexibility, with deep dramatic irony." },
      { type: "context", prompt: "What happens right after this speech?", choices: ["Caesar is assassinated by the conspirators", "Antony gives his oration", "Caesar leaves Rome", "Calpurnia faints"], answer: "Caesar is assassinated by the conspirators", explain: "His boast of permanence is immediately undercut by his murder." }
    ]
  },
  {
    id: "et-tu",
    act: 3, scene: 1,
    nickname: "Et tu, Brute?",
    linesAL: "85", linesBook: "77",
    speaker: "Caesar",
    audience: "Brutus",
    quote: "Et tu, Brute? Then fall, Caesar!",
    context:
      "As the conspirators stab him, Caesar sees that even Brutus — his trusted friend — has joined the attack, and he gives up resisting.",
    devices: ["allusion", "apostrophe", "pathos"],
    appeal: ["pathos"],
    significance:
      "The emotional climax of the assassination. Caesar's shock at Brutus's betrayal ('You too, Brutus?') shows that the wound that truly defeats him is the loss of his friend, not the daggers.",
    questions: [
      { type: "speaker", prompt: "Who cries 'Et tu, Brute?'", choices: ["Caesar", "Brutus", "Cassius", "Antony"], answer: "Caesar", explain: "Caesar says it as he dies, stunned that Brutus has betrayed him." },
      { type: "device", prompt: "Why is this line so powerful?", choices: ["It shows betrayal is the wound that defeats Caesar (pathos)", "It is a clever pun", "It is an exaggeration for comedy", "It is onomatopoeia"], answer: "It shows betrayal is the wound that defeats Caesar (pathos)", explain: "Caesar stops resisting only when he sees Brutus among the killers — emotional climax." },
      { type: "context", prompt: "When is this line spoken?", choices: ["As Caesar is being stabbed", "During Antony's funeral speech", "On the battlefield at Philippi", "In Brutus's orchard"], answer: "As Caesar is being stabbed", explain: "It is Caesar's dying recognition of Brutus's betrayal." }
    ]
  },
  {
    id: "bloody-hands",
    act: 3, scene: 1,
    nickname: "Bloody hands",
    linesAL: "116–123", linesBook: "103–110",
    speaker: "Brutus",
    audience: "the conspirators",
    quote:
      "Stoop, Romans, stoop, / And let us bathe our hands in Caesar's blood / Up to the elbows, and besmear our swords: / Then walk we forth, even to the market-place, / And, waving our red weapons o'er our heads, / Let's all cry 'Peace, freedom and liberty!'",
    context:
      "Immediately after the murder, Brutus has the conspirators ritually smear themselves with Caesar's blood and march out proclaiming liberty.",
    devices: ["imagery", "symbolism", "dramatic irony", "verbal irony"],
    appeal: ["pathos"],
    significance:
      "Brutus tries to turn a bloody murder into a noble symbol of freedom. The gruesome blood imagery undercuts his idealism and foreshadows the bloodshed (civil war) the act unleashes.",
    questions: [
      { type: "speaker", prompt: "Who tells the conspirators to bathe their hands in Caesar's blood?", choices: ["Brutus", "Cassius", "Antony", "Casca"], answer: "Brutus", explain: "Brutus stages the bloody ritual to frame the killing as liberation." },
      { type: "device", prompt: "Crying 'Peace, freedom and liberty!' while covered in blood is...", choices: ["Verbal / dramatic irony", "A simile", "Onomatopoeia", "An aphorism"], answer: "Verbal / dramatic irony", explain: "The peaceful slogan clashes with the violent bloody image — and the act actually brings war." },
      { type: "context", prompt: "When does this happen?", choices: ["Right after Caesar's assassination", "Before the assassination", "During the battle", "At Caesar's triumph"], answer: "Right after Caesar's assassination", explain: "Brutus ritualizes the murder moments after the stabbing." }
    ]
  },
  {
    id: "brutus-speech",
    act: 3, scene: 2,
    nickname: "Brutus Speech",
    linesAL: "23–24", linesBook: "22–23",
    speaker: "Brutus",
    audience: "the Roman plebeians (crowd)",
    quote:
      "Not that I loved Caesar less, but that I loved Rome more. / Had you rather Caesar were living and die all slaves, than that Caesar were dead, to live all free men?",
    context:
      "At Caesar's funeral, Brutus addresses the crowd in prose, justifying the assassination as a patriotic act done out of love for Rome.",
    devices: ["antithesis", "rhetorical question", "parallelism"],
    appeal: ["logos", "ethos"],
    significance:
      "Brutus's reasoned, logical defense. He wins the crowd briefly by appealing to reason and his own honor — but his restraint and logic are soon overpowered by Antony's emotional appeal.",
    questions: [
      { type: "speaker", prompt: "Who says 'Not that I loved Caesar less, but that I loved Rome more'?", choices: ["Brutus", "Antony", "Cassius", "Caesar"], answer: "Brutus", explain: "Brutus justifies the murder to the crowd at the funeral." },
      { type: "appeal", prompt: "Brutus's funeral speech relies mainly on which appeal?", choices: ["Logos (reason) and ethos (his honor)", "Pathos (raw emotion) above all", "Kairos only", "No appeals — pure narrative"], answer: "Logos (reason) and ethos (his honor)", explain: "Brutus argues logically and stakes his honor; Antony will counter with pathos." },
      { type: "device", prompt: "'Caesar were living and die all slaves... Caesar were dead, to live all free men' uses...", choices: ["Antithesis / parallelism", "Onomatopoeia", "Allusion", "Simile"], answer: "Antithesis / parallelism", explain: "Balanced, contrasting clauses make his reasoning memorable." }
    ]
  },
  {
    id: "antony-speech",
    act: 3, scene: 2,
    nickname: "Antony Speech",
    linesAL: "82–92", linesBook: "75–85",
    speaker: "Antony",
    audience: "the Roman plebeians (crowd)",
    quote:
      "Friends, Romans, countrymen, lend me your ears; / I come to bury Caesar, not to praise him... / The noble Brutus / Hath told you Caesar was ambitious... / For Brutus is an honourable man.",
    context:
      "Antony delivers his funeral oration after Brutus. Permitted to speak only if he doesn't blame the conspirators, he uses irony to turn the crowd against them.",
    devices: ["verbal irony", "repetition", "rhetorical question", "apostrophe"],
    appeal: ["pathos", "ethos"],
    significance:
      "A masterclass in rhetoric. By repeating 'Brutus is an honourable man' with increasing sarcasm, Antony manipulates the crowd's emotions and incites them to riot — reversing Brutus's victory.",
    questions: [
      { type: "speaker", prompt: "Who begins 'Friends, Romans, countrymen, lend me your ears'?", choices: ["Antony", "Brutus", "Cassius", "Caesar"], answer: "Antony", explain: "Antony's funeral oration turns the crowd against the conspirators." },
      { type: "appeal", prompt: "Antony's oration works primarily through which appeal?", choices: ["Pathos (emotion), sharpened by irony", "Logos (cold logic) only", "Ethos alone", "No rhetorical appeals"], answer: "Pathos (emotion), sharpened by irony", explain: "He stirs grief and anger, using ironic repetition to undo Brutus's logical case." },
      { type: "device", prompt: "Repeating 'Brutus is an honourable man' is an example of...", choices: ["Verbal irony / repetition", "Simile", "Onomatopoeia", "Hyperbole only"], answer: "Verbal irony / repetition", explain: "Each repetition grows more sarcastic until 'honourable' means its opposite." }
    ]
  },
  {
    id: "crown",
    act: 3, scene: 2,
    nickname: "Crown offering",
    linesAL: "104–106", linesBook: "97–99",
    speaker: "Antony",
    audience: "the Roman plebeians (crowd)",
    quote:
      "You all did see that on the Lupercal / I thrice presented him a kingly crown, / Which he did thrice refuse: was this ambition?",
    context:
      "Within his oration, Antony reminds the crowd that Caesar refused the crown three times, offering evidence against Brutus's claim that Caesar was ambitious.",
    devices: ["rhetorical question", "repetition", "verbal irony"],
    appeal: ["logos", "pathos"],
    significance:
      "Antony cleverly uses 'evidence' (the refused crown) framed as a question to dismantle the charge of ambition without openly accusing Brutus, swaying the crowd.",
    questions: [
      { type: "speaker", prompt: "Who reminds the crowd Caesar 'thrice refused' the crown?", choices: ["Antony", "Brutus", "Casca", "Cassius"], answer: "Antony", explain: "Antony uses the refused crown to disprove Brutus's claim of ambition." },
      { type: "device", prompt: "'Was this ambition?' is a...", choices: ["Rhetorical question undercutting Brutus", "Literal request for information", "Simile", "Allusion"], answer: "Rhetorical question undercutting Brutus", explain: "Antony lets the crowd answer for themselves that Caesar was not ambitious." },
      { type: "context", prompt: "What event is Antony referring to?", choices: ["Caesar refusing the crown three times at the Lupercal", "Caesar's assassination", "Calpurnia's dream", "The battle at Philippi"], answer: "Caesar refusing the crown three times at the Lupercal", explain: "Casca first reported this offstage event earlier; Antony now uses it as proof." }
    ]
  },
  {
    id: "cinna",
    act: 3, scene: 3,
    nickname: "Cinna the Poet",
    linesAL: "28–40", linesBook: "27–38",
    speaker: "the Plebeians / Cinna the Poet",
    audience: "each other (the mob scene)",
    quote:
      "CINNA: I am Cinna the poet... I am not Cinna the conspirator. / FOURTH PLEBEIAN: It is no matter, his name's Cinna; pluck but his name out of his heart, and turn him going. / THIRD PLEBEIAN: Tear him, tear him!",
    context:
      "Whipped into a frenzy by Antony's speech, the mob attacks Cinna the poet, killing him simply because he shares a name with one of the conspirators.",
    devices: ["irony", "symbolism", "mob mentality"],
    appeal: ["pathos"],
    significance:
      "Shows the destructive chaos Antony's rhetoric unleashed. The senseless murder of an innocent man symbolizes how mob violence and disorder now rule Rome — the consequence of the assassination.",
    questions: [
      { type: "speaker", prompt: "Who is killed by the mob for sharing a conspirator's name?", choices: ["Cinna the poet", "Cinna the conspirator", "Casca", "Publius"], answer: "Cinna the poet", explain: "The mob tears apart the innocent poet, ignoring that he isn't the conspirator." },
      { type: "device", prompt: "The killing of Cinna the poet is mainly used to show...", choices: ["The chaos / mob mentality unleashed by Antony's speech", "Comic relief", "Caesar's ghost", "Brutus's logic"], answer: "The chaos / mob mentality unleashed by Antony's speech", explain: "It symbolizes the senseless violence and disorder now gripping Rome." },
      { type: "context", prompt: "What caused this mob violence?", choices: ["Antony's funeral oration inciting the crowd", "Calpurnia's dream", "The soothsayer's warning", "The battle at Philippi"], answer: "Antony's funeral oration inciting the crowd", explain: "Antony's rhetoric turned grief into riot." }
    ]
  },
  {
    id: "bribery",
    act: 4, scene: 3,
    nickname: "Bribery",
    linesAL: "19–29", linesBook: "18–28",
    speaker: "Brutus",
    audience: "Cassius",
    quote:
      "Let me tell you, Cassius, you yourself / Are much condemned to have an itching palm... / Remember March, the ides of March remember: / Did not great Julius bleed for justice' sake? / ...shall we now / Contaminate our fingers with base bribes?",
    context:
      "In the camp before battle, Brutus and Cassius quarrel; Brutus accuses Cassius of taking bribes and betraying the noble principles for which they killed Caesar.",
    devices: ["rhetorical question", "imagery", "allusion"],
    appeal: ["ethos", "logos"],
    significance:
      "The famous quarrel scene. It reveals cracks in the conspiracy and Brutus's rigid idealism. 'Itching palm' (greed) shows the cause has been corrupted, weakening their alliance before Philippi.",
    questions: [
      { type: "speaker", prompt: "Who accuses Cassius of having 'an itching palm'?", choices: ["Brutus", "Antony", "Octavius", "Casca"], answer: "Brutus", explain: "Brutus condemns Cassius for taking bribes during their camp quarrel." },
      { type: "device", prompt: "An 'itching palm' is figurative language for...", choices: ["Greed / desire for bribes (metaphor)", "A skin disease", "A literal itch", "An allusion to a god"], answer: "Greed / desire for bribes (metaphor)", explain: "The image of an itching palm means a craving for money — corruption." },
      { type: "context", prompt: "Where and when does this argument take place?", choices: ["In the army camp before the battle at Philippi", "At Caesar's funeral", "In Brutus's orchard", "In the Senate"], answer: "In the army camp before the battle at Philippi", explain: "The quarrel exposes growing tension between the allies." }
    ]
  },
  {
    id: "battle-spot",
    act: 4, scene: 3,
    nickname: "Battle spot",
    linesAL: "229–232", linesBook: "199–201",
    speaker: "Brutus",
    audience: "Cassius",
    quote:
      "There is a tide in the affairs of men, / Which, taken at the flood, leads on to fortune; / Omitted, all the voyage of their life / Is bound in shallows and in miseries.",
    context:
      "Brutus overrules Cassius's military advice, arguing they must march to meet the enemy at Philippi now, while the moment is right, rather than wait.",
    devices: ["metaphor", "extended metaphor", "aphorism"],
    appeal: ["logos"],
    significance:
      "Brutus's confident 'tide' metaphor sounds wise but his judgment is wrong — marching to Philippi leads to defeat. Another example of Brutus overruling Cassius with fatal results.",
    questions: [
      { type: "speaker", prompt: "Who says 'There is a tide in the affairs of men'?", choices: ["Brutus", "Cassius", "Antony", "Octavius"], answer: "Brutus", explain: "Brutus uses it to win the argument about marching to Philippi." },
      { type: "device", prompt: "'A tide in the affairs of men... taken at the flood' is an...", choices: ["Extended metaphor comparing opportunity to the sea", "Onomatopoeia", "Pun", "Simile using 'like' or 'as'"], answer: "Extended metaphor comparing opportunity to the sea", explain: "Life's opportunities are likened to a rising tide that must be seized — an extended metaphor / aphorism." },
      { type: "context", prompt: "What is Brutus arguing for here?", choices: ["Marching to fight at Philippi immediately", "Sparing Antony", "Fleeing Rome", "Bribing the soldiers"], answer: "Marching to fight at Philippi immediately", explain: "He overrules Cassius — a decision that leads to their defeat." }
    ]
  },
  {
    id: "ghost",
    act: 4, scene: 3,
    nickname: "Ghost",
    linesAL: "327", linesBook: "283",
    speaker: "Caesar's Ghost",
    audience: "Brutus",
    quote: "Thy evil spirit, Brutus. / ...thou shalt see me at Philippi.",
    context:
      "Alone at night in his tent, Brutus is visited by the ghost of Caesar, who identifies itself as Brutus's 'evil spirit' and promises to appear again at Philippi.",
    devices: ["foreshadowing", "supernatural", "symbolism"],
    appeal: ["pathos"],
    significance:
      "The ghost foreshadows Brutus's doom and represents his guilt over killing Caesar. Caesar's influence reaches beyond death — the assassination cannot escape its consequences.",
    questions: [
      { type: "speaker", prompt: "Who appears to Brutus and says 'thou shalt see me at Philippi'?", choices: ["Caesar's Ghost", "Cassius", "Portia", "Antony"], answer: "Caesar's Ghost", explain: "The ghost names itself Brutus's 'evil spirit' and warns of Philippi." },
      { type: "device", prompt: "The ghost mainly functions as...", choices: ["Foreshadowing of Brutus's defeat / his guilt", "Comic relief", "A simile", "An allusion to Greek gods"], answer: "Foreshadowing of Brutus's defeat / his guilt", explain: "It predicts doom at Philippi and embodies Brutus's guilt — Caesar's power outlasts death." },
      { type: "context", prompt: "When does the ghost appear?", choices: ["At night in Brutus's tent before the battle", "During Caesar's assassination", "At the funeral", "In the orchard"], answer: "At night in Brutus's tent before the battle", explain: "The visit comes shortly before the march to Philippi." }
    ]
  }
];

// Figurative-language glossary for quick reference / the device game's option pool.
const DEVICES_GLOSSARY = {
  "simile": "A comparison using 'like' or 'as' (e.g. 'constant as the northern star').",
  "metaphor": "A direct comparison saying one thing IS another (e.g. Caesar as a 'serpent's egg').",
  "extended metaphor": "A metaphor developed across several lines (e.g. the 'tide' of opportunity).",
  "allusion": "A reference to a well-known person, place, or thing (e.g. the Colossus of Rhodes).",
  "hyperbole": "Deliberate exaggeration for effect (e.g. Caesar bestriding the world).",
  "personification": "Giving human qualities to non-human things.",
  "antithesis": "Contrasting ideas placed in balanced opposition (e.g. 'cowards'/'the valiant').",
  "aphorism": "A short, memorable statement of a general truth.",
  "imagery": "Vivid descriptive language that appeals to the senses.",
  "foreshadowing": "Hints that prepare the audience for events to come (e.g. the omens, the ghost).",
  "dramatic irony": "When the audience knows something a character does not.",
  "verbal irony": "Saying the opposite of what is meant (e.g. 'honourable man').",
  "irony": "A contrast between expectation and reality.",
  "soliloquy": "A speech given alone on stage, revealing inner thoughts.",
  "rhetorical question": "A question asked for effect, not for an answer.",
  "repetition": "Repeating words/phrases for emphasis (e.g. 'honourable man').",
  "parallelism": "Using similar grammatical structure for balance.",
  "apostrophe": "Directly addressing someone absent or dead, or an idea.",
  "euphemism": "A mild word substituted for something harsh (e.g. 'sacrificers' for killers).",
  "pathetic fallacy": "Nature reflecting human emotion (e.g. the storm before the murder).",
  "symbolism": "Using an object/action to represent a larger idea (e.g. blood = guilt/war).",
  "characterization": "Techniques used to reveal a character's personality.",
  "supernatural": "Ghosts, omens, and unnatural events.",
  "mob mentality": "A crowd acting irrationally as one (e.g. killing Cinna the poet)."
};

// Rhetorical appeals reference.
const APPEALS_GLOSSARY = {
  "ethos": "Appeal to credibility / character / honor (Brutus: 'believe me for mine honour').",
  "pathos": "Appeal to emotion (Antony stirring grief and anger over Caesar's body).",
  "logos": "Appeal to logic and reason (Brutus's reasoned justification of the murder)."
};

// Plot beats in order — used by Context Match and as a quick timeline reference.
const PLOT_ORDER = [
  { id: "feathers", label: "1.1 — Tribunes scold the crowd celebrating Caesar" },
  { id: "colossus", label: "1.2 — Cassius works to recruit Brutus" },
  { id: "fat-bald", label: "1.2 — Caesar tells Antony he distrusts Cassius" },
  { id: "seduced-letters", label: "1.2 — Cassius plots to forge letters to Brutus" },
  { id: "omens", label: "1.3 — Stormy night of omens before the murder" },
  { id: "serpent", label: "2.1 — Brutus decides Caesar must die" },
  { id: "purgers", label: "2.1 — Conspirators plan the killing; spare Antony" },
  { id: "cowards", label: "2.2 — Calpurnia begs Caesar to stay home" },
  { id: "fountains", label: "2.2 — Decius reinterprets the bloody dream" },
  { id: "dream", label: "2.2 — Decius lures Caesar with a crown" },
  { id: "northern-star", label: "3.1 — Caesar boasts of constancy in the Senate" },
  { id: "et-tu", label: "3.1 — Caesar is assassinated" },
  { id: "bloody-hands", label: "3.1 — Conspirators bathe hands in Caesar's blood" },
  { id: "brutus-speech", label: "3.2 — Brutus justifies the murder to the crowd" },
  { id: "antony-speech", label: "3.2 — Antony's oration turns the crowd" },
  { id: "crown", label: "3.2 — Antony recalls the refused crown" },
  { id: "cinna", label: "3.3 — Mob kills Cinna the poet" },
  { id: "bribery", label: "4.3 — Brutus and Cassius quarrel over bribes" },
  { id: "battle-spot", label: "4.3 — Brutus insists on marching to Philippi" },
  { id: "ghost", label: "4.3 — Caesar's ghost visits Brutus" }
];
