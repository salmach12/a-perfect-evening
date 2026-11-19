// The reading corner: light a candle, pick a mood, pick a book, read it with a blanket on your lap.
// (All the stories are original, written for this game. Quotes are credited when they are not.)
const SCENTS = [
  { id: "cinnamon", name: "Cinnamon Spice", color: "#b5683f", line: "Warm cinnamon and brown sugar, like a bakery on a cold morning." },
  { id: "pumpkin", name: "Pumpkin Vanilla", color: "#e0a458", line: "Pumpkin, soft vanilla and a little nutmeg." },
  { id: "apple", name: "Apple Cider", color: "#a3432c", line: "Baked apples, cloves and cider simmering on the stove." },
  { id: "pine", name: "Pine & Cedar", color: "#5e7a4a", line: "Pine needles and cedar, with cold air through an open window." },
  { id: "lavender", name: "Lavender Honey", color: "#8f7ab0", line: "Soft lavender and honey. The kind of calm that hums." },
  { id: "sandalwood", name: "Old Library", color: "#c9a679", line: "Creamy sandalwood and old paper, like a library at dusk." }
];

const GENRES = [
  { id: "romance", name: "Romantic", blurb: "Rainy days and slow hearts", color: "#a3432c",
    icon: '<path d="M24 40 C6 28 6 12 17 11 C21 11 24 14 24 17 C24 14 27 11 31 11 C42 12 42 28 24 40Z"/>' },
  { id: "horror", name: "Cozy Horror", blurb: "Spooky, but gentle", color: "#4a4a63",
    icon: '<path d="M30 8 A16 16 0 1 0 40 32 A13 13 0 1 1 30 8Z"/>' },
  { id: "fiction", name: "Fiction", blurb: "Little worlds and quiet magic", color: "#6a7539",
    icon: '<path d="M24 4 L28 20 L44 24 L28 28 L24 44 L20 28 L4 24 L20 20Z"/>' },
  { id: "facts", name: "Science Facts", blurb: "Curious things that are true", color: "#c0692f",
    icon: '<circle cx="24" cy="24" r="4.5"/><ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke-width="3" stroke="currentColor"/><ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke-width="3" stroke="currentColor" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke-width="3" stroke="currentColor" transform="rotate(-60 24 24)"/>' }
];

const STORIES = [
  /* ---------------- romantic ---------------- */
  { id: "umbrella", genre: "romance", title: "The Bookshop Umbrella", short: "The Bookshop Umbrella", color: "#a3432c",
    pages: [
      "It rained the afternoon Nora found the bookshop, the kind of rain that makes every window look like a small golden room. She ducked inside, shaking drops from her hair, and the bell above the door announced her like a guest of honor. The shop smelled of paper, cedar, and somebody else's tea.",
      "She was reaching for a worn green book of poems when another hand arrived at the very same moment. A man with ink on his thumb and rain on his glasses. “Oh,” they both said, and then, because neither of them knew what to do, they both laughed.",
      "“Take it,” he said. “No, you,” she said. They settled it like grown-ups: they sat on the creaky stairs and read the first poem together, one line each, until the rain had finished its own verse outside. His name was Elias. He worked there on Tuesdays, and “most days I'm secretly just reading.”",
      "When she stood to leave, the sky was still pouring. Elias held out a big black umbrella, the shop's lost-and-found umbrella, “which has been waiting for someone for two years.” Nora hesitated. “How will I return it?” “That,” he said, trying not to smile too hard, “is the whole idea.”",
      "She came back the next Tuesday. And the Tuesday after. The umbrella stayed on a hook by the door, dry and unnecessary, and neither of them ever mentioned it. Some people fall in love with grand gestures. Nora and Elias did it one shared poem at a time, with the rain as their witness."
    ],
    quote: { text: "I'm so glad I live in a world where there are Octobers.", by: "L. M. Montgomery, Anne of Green Gables" } },
  { id: "margins", genre: "romance", title: "Letters in the Margins", short: "Letters in the Margins", color: "#7a2f33",
    pages: [
      "Mina bought the used novel for two coins and a cup of tea she never finished. On page twelve, in faded pencil, someone had written in the margin: “This sentence is the kindest thing I've read all week.” Mina smiled at a stranger's handwriting, and felt a little less alone in the café.",
      "She couldn't help it. Beside the note she wrote in her own pencil: “Agreed. Also, the weather in this chapter is exactly like today.” Then she closed the book, feeling slightly silly and slightly warm, and left it on the library's exchange shelf.",
      "A week later it found its way back to her. New pencil on page forty: “Whoever you are, you have excellent taste. Please keep writing.” Mina read it three times, standing in the aisle, pretending to look for something else.",
      "So they wrote. Little notes, jokes about the hero's terrible decisions, a drawing of a teapot on page ninety. They never signed their names. It felt like holding hands in the dark, without any fear of the dark at all.",
      "On the last page, in careful letters: “If you'd like to meet, I'll be at the café across the street on Saturday, with a second copy of this novel, held upside down.” Mina laughed out loud. On Saturday she arrived early. At the corner table, a man turned his book upside down, and she knew the handwriting before he said a word."
    ],
    quote: { text: "That it will never come again is what makes life so sweet.", by: "Emily Dickinson" } },

  /* ---------------- cozy horror ---------------- */
  { id: "knock", genre: "horror", title: "The Knock at Seven", short: "The Knock at Seven", color: "#4a4a63",
    pages: [
      "Every evening at seven o'clock, someone knocked on Ivy's door. Three slow knocks, polite and patient. She had lived in the old house for exactly four days, and the knocking had come on all four of them.",
      "The first night she opened the door and found only the porch, the fog, and a single dead leaf turning in a slow circle. The second night, the same. The third night, she stayed in her chair, her tea going cold, and listened. Knock. Knock. Knock. It did not sound angry. It sounded expectant.",
      "On the fourth night, she did something sensible. She set a second cup of tea on the table by the door, and pulled out a chair. “If you're coming in,” she said to the empty hallway, feeling ridiculous, “at least have somewhere to sit.” The house went very quiet. Even the clock seemed to hold its breath.",
      "At seven, the knocking came, but this time from inside the house. Three soft taps on the arm of the empty chair. Ivy did not scream. She watched the steam from the second cup curl upward, thinner and thinner, as if someone were drinking it very slowly.",
      "The knocking never came again. In the morning the cup was empty and warm, and on the saucer lay one small thing: an old brass key, worn smooth by years of hands. Ivy hung it by her door on a ribbon. Some haunts do not want to frighten you. They only want to be invited home."
    ],
    quote: { text: "Not every shadow is a threat. Some are only waiting for the light to be kind.", by: "" } },
  { id: "library", genre: "horror", title: "The Library After Closing", short: "Library After Closing", color: "#3d4a45",
    pages: [
      "Theo was the night cleaner at the old city library, and he knew its noises like a song: the hum of the radiators, the tick of the clock, the sigh of the heavy front door settling. So when he heard a page turning at midnight, he stopped his mop and listened.",
      "Page. A pause. Page. It came from the reading room, where nobody was supposed to be. He walked there slowly, lantern in one hand, mop in the other, like a very unqualified knight. The room was empty. But one chair had been pulled out, and a book lay open on the desk, still warm.",
      "It was a ledger of returned titles. At the bottom of today's date, in neat, old-fashioned handwriting, was a name: Theodore Marsh. His own. Under it, in the same careful hand: “Due tomorrow. Thank you for reading.”",
      "Theo laughed, because there was nothing else to do. He sat in the pulled-out chair and read the open page aloud. The radiators hummed. The lamp above the desk flickered once, as if applauding. Somewhere between the shelves he was almost sure he heard someone whisper, “Louder, please.”",
      "He read until the windows turned gray with morning. When he stood to go, the ledger had closed itself, and a ribbon lay across its cover like a bow. The library's ghost has never harmed anyone. It only wants somebody to read to it, and Theo has the best voice on the night shift."
    ],
    quote: { text: "The quietest rooms are never truly empty. They are only listening.", by: "" } },

  /* ---------------- fiction ---------------- */
  { id: "lantern", genre: "fiction", title: "The Lantern Keeper", short: "The Lantern Keeper", color: "#8a3a3a",
    pages: [
      "At the edge of a sleepy village stood a lighthouse that had forgotten the sea. Its keeper, an old woman named Mirel, lit the lantern anyway, every single evening, just in case.",
      "Nobody ever thanked her. The fishermen had moved to the city years ago, and the harbor was now a field of tall golden grass. But Mirel hummed while she polished the glass, and the lantern glowed a little warmer for it.",
      "One autumn night, a small boat appeared on the grass-sea, no bigger than a bathtub, drifting on the wind. It carried a tired boy and a very large pumpkin. “I saw your light,” he said. “I wasn't lost. I just needed somewhere to be.”",
      "Mirel made soup. The boy slept by the stove, and the pumpkin sat in the corner like a sleepy guest. In the morning he told her about the other travelers: a goose with a map, a girl who carried a cloud in a jar. All of them following lights like hers, all of them certain no one lit them on purpose.",
      "From that day, Mirel polished the lantern with extra care. It was no longer for ships. It was a small, stubborn promise: someone is here, and the door is open. And on windy nights, when the grass bowed like waves, the little boats came."
    ],
    quote: { text: "Somewhere, someone is leaving a light on for you.", by: "" } },
  { id: "fox", genre: "fiction", title: "The Fox Who Collected Autumn", short: "The Fox Who Collected…", color: "#c0692f",
    pages: [
      "Pip the fox had a very small den and a very big idea: he would collect autumn, so it would never have to leave.",
      "He gathered the reddest leaves, the roundest acorns, and the last warm afternoon, which he folded carefully and tucked behind his ear. He caught the smell of woodsmoke in an old teacup and the sound of crunching in a jar.",
      "The owl watched from her branch. “That's a lot of autumn,” she said. “It's going to be the best den ever,” said Pip. “Mm,” said the owl, who had seen many autumns and knew a thing or two about leaving.",
      "By the first frost, the leaves had dried to brown paper, the acorns had rolled under the bed, and the warm afternoon had wandered off in the night. Pip sat among his crunchy collection feeling sorry for himself and, honestly, a little itchy.",
      "Then a single snowflake drifted through the window and landed on his nose. “Oh,” said Pip. “So that's what autumn was making room for.” He tucked the leaves into a quilt, lay down among them, and slept the way you only sleep when you finally stop holding on."
    ],
    quote: { text: "Live in each season as it passes; breathe the air, drink the drink, taste the fruit, and resign yourself to the influences of each.", by: "Henry David Thoreau" } },

  /* ---------------- science facts ---------------- */
  { id: "red", genre: "facts", title: "Why Autumn Turns Red", short: "Why Autumn Turns Red", color: "#d98a3a",
    pages: [
      "All summer, leaves are green because of chlorophyll, the pigment that helps them turn sunlight into food. Hidden underneath it the whole time are other colors. The yellows and oranges were always there. They were just waiting for the green to leave.",
      "As days shorten and nights cool, trees stop making chlorophyll and the green fades. What is left are carotenoids, the same pigments that make carrots orange and corn yellow. That is why a leaf can turn golden within a couple of weeks.",
      "Reds and purples are different. They come from anthocyanins, which many trees make fresh in autumn rather than simply uncovering. Sugars trapped in the leaf help produce them, which is why bright sunny days with cool nights give the most brilliant reds.",
      "Meanwhile, the tree is quietly sealing itself. A thin layer of cells forms where each leaf's stem meets the branch, slowly cutting off the supply. It is called the abscission layer, and it is why leaves let go so neatly instead of being torn away.",
      "The tree isn't dying. It is saving energy, pulling useful nutrients back into its branches, and getting ready to rest. Every fallen leaf is a tiny, colorful note that says “see you in spring.”"
    ],
    quote: { text: "Autumn is a lesson in how beautiful it can be to let things go.", by: "" } },
  { id: "wonders", genre: "facts", title: "Small Wonders", short: "Small Wonders", color: "#5e7a4a",
    pages: [
      "An octopus has three hearts. Two pump blood through its gills, and one sends it around the rest of the body. Its blood is blue, because it carries oxygen with a copper-based molecule instead of the iron-based one in ours.",
      "Honey almost never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs, thousands of years old, still perfectly preserved. Its low water content and natural acidity make it a very unfriendly home for bacteria.",
      "A day on Venus is longer than its year. Venus spins so slowly that one full turn takes about 243 Earth days, while it circles the Sun in only about 225. Somewhere out there, the sunrise is slower than the seasons.",
      "Bananas are technically berries, and strawberries are not. In botany, a berry grows from a single flower with one ovary, and a banana fits the rule perfectly. A strawberry is what scientists call an aggregate accessory fruit, which sounds like a very fancy job.",
      "And a purring cat hums at around 25 to 150 vibrations a second, a range that some researchers have suggested may be soothing for cats and people alike. Nobody is completely sure why a purr feels so good. It simply does."
    ],
    quote: { text: "The world is full of small wonders, hiding in plain sight, waiting for a curious person.", by: "" } }
];

(function () {
  const NS = "http://www.w3.org/2000/svg";
  const $ = function (id) { return document.getElementById(id); };
  const g = $("rBooks"), title = $("read-title"), hint = $("read-hint");
  g.setAttribute("filter", "url(#wobbleS)");
  const box = $("rbook"), spread = $("rspread"), flipEl = $("rflip"), dots = $("r-dots"), prev = $("r-prev"), next = $("r-next");
  const ui = $("rui"), pCandle = $("r-candle"), pGenre = $("r-genre"), stage = $("r-stage");
  const glow = $("rGlow"), spot = $("rCandleSpot"), corner = $("r-corner");
  let genre = null, scent = null, stopFire = null, busy = false;
  let pages = [], at = 0, flipping = false, curStory = null;

  const sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  const lerp = function (a, b, t) { return a + (b - a) * t; };
  function tween(ms, fn) {
    return new Promise(function (res) {
      const t0 = performance.now();
      (function f(now) {
        const k = Math.min(1, (now - t0) / ms);
        fn(k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
        if (k < 1) requestAnimationFrame(f); else res();
      })(t0);
    });
  }
  function add(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    parent.appendChild(e);
    return e;
  }

  /* ---- a very cute candle: chubby jar with a face (used everywhere) ---- */
  function candleMarkup(sc, lit) {
    const I = "#5a2a1c", i = Math.max(0, SCENTS.indexOf(sc)), kind = ["taper", "pillar", "jar"][i % 3];
    const wax = "#f3e2b4", tint = sc.color;
    let body = "";
    function drips(x0, x1, y, n) {
      let d = "M" + x0 + " " + y;
      const w = (x1 - x0) / n;
      for (let k = 0; k < n; k++) { const L = 6 + ((k * 7 + i * 5) % 14); d += " q " + (w * .3) + " -5 " + (w * .5) + " 0 q " + (w * .1) + " " + L + " " + (w * .25) + " " + L + " q " + (w * .12) + " 0 " + (w * .15) + " -" + (L - 2) + " "; }
      return d;
    }
    if (kind === "taper") {
      body =
        '<ellipse cx="50" cy="124" rx="36" ry="7" fill="#000" opacity=".12"/>' +
        '<path d="M42 66 L 40 108 H 60 L 58 66 Z" fill="' + wax + '" stroke="' + I + '" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M43 70 L 42 104" stroke="' + tint + '" stroke-width="5" opacity=".45" stroke-linecap="round"/><path d="M56 72 L 55 100" stroke="#8a5a33" stroke-width="3" opacity=".3" stroke-linecap="round"/>' +
        '<path d="M42 66 q 4 -5 8 -1 q 4 -4 8 1" fill="' + wax + '" stroke="' + I + '" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M44 70 q 0 10 2 12 M56 70 q 1 14 -1 18" fill="none" stroke="' + I + '" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M34 104 H 66 L 72 110 H 28 Z" fill="#c9a24a" stroke="' + I + '" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M44 110 L 41 118 H 59 L 56 110" fill="#b98a3a" stroke="' + I + '" stroke-width="3" stroke-linejoin="round"/>' +
        '<ellipse cx="50" cy="121" rx="34" ry="6.5" fill="#a97d36" stroke="' + I + '" stroke-width="3"/><ellipse cx="50" cy="120" rx="25" ry="4" fill="#d8b660" opacity=".7"/>' +
        '<path d="M82 114 q 16 -10 8 -22 q -6 -8 -14 -2" fill="none" stroke="' + I + '" stroke-width="6" stroke-linecap="round"/><path d="M82 114 q 16 -10 8 -22 q -6 -8 -14 -2" fill="none" stroke="#c9a24a" stroke-width="2.4" stroke-linecap="round"/>' +
        '<path d="M22 122 q 8 -10 18 -4 q -6 10 -18 4 Z" fill="' + tint + '" stroke="' + I + '" stroke-width="2.2" stroke-linejoin="round"/><path d="M24 121 q 7 -3 14 -3" fill="none" stroke="' + I + '" stroke-width="1.4"/>';
    } else if (kind === "pillar") {
      body =
        '<ellipse cx="50" cy="126" rx="34" ry="6" fill="#000" opacity=".12"/>' +
        '<path d="M28 66 Q 26 96 29 122 Q 50 130 71 122 Q 74 96 72 66 Z" fill="' + wax + '" stroke="' + I + '" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M32 76 Q 31 98 34 118" stroke="' + tint + '" stroke-width="9" opacity=".4" stroke-linecap="round" fill="none"/><path d="M62 74 Q 66 96 64 116" stroke="#8a5a33" stroke-width="6" opacity=".3" stroke-linecap="round" fill="none"/><path d="M44 90 q 6 8 4 22" stroke="#d9b06a" stroke-width="5" opacity=".5" stroke-linecap="round" fill="none"/>' +
        '<path d="' + drips(28, 72, 66, 4) + ' Z" fill="' + wax + '" stroke="' + I + '" stroke-width="2.6" stroke-linejoin="round"/>' +
        '<ellipse cx="50" cy="66" rx="22" ry="5.5" fill="#e9cf96" stroke="' + I + '" stroke-width="2.6"/><ellipse cx="50" cy="66.5" rx="9" ry="2.2" fill="#c79a52" opacity=".8"/>' +
        '<g fill="' + I + '" opacity=".55"><circle cx="38" cy="98" r="1.3"/><circle cx="58" cy="106" r="1.3"/><circle cx="46" cy="114" r="1.2"/><circle cx="64" cy="90" r="1.2"/></g>' +
        '<path d="M26 118 q 6 7 12 4 M72 120 q -8 3 -14 0" fill="none" stroke="' + I + '" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M70 124 q 12 -10 24 -2 q -10 10 -24 2 Z" fill="' + tint + '" stroke="' + I + '" stroke-width="2.2" stroke-linejoin="round"/><path d="M72 123 q 10 -3 20 -2" fill="none" stroke="' + I + '" stroke-width="1.4"/>';
    } else {
      body =
        '<ellipse cx="50" cy="126" rx="38" ry="6" fill="#000" opacity=".14"/>' +
        '<path d="M16 72 Q 14 112 22 122 Q 50 130 78 122 Q 86 112 84 72 Z" fill="' + tint + '" fill-opacity=".38" stroke="' + I + '" stroke-width="3.2" stroke-linejoin="round"/>' +
        '<path d="M20 90 Q 20 112 26 120 Q 50 126 74 120 Q 80 112 80 90 Q 50 98 20 90 Z" fill="' + wax + '" stroke="' + I + '" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<path d="M22 86 Q 50 94 78 86" fill="none" stroke="' + I + '" stroke-width="2.4"/><ellipse cx="50" cy="90" rx="30" ry="6" fill="#ecd7a0" opacity=".9" stroke="' + I + '" stroke-width="2"/>' +
        '<path d="M26 100 q 8 6 14 2 M60 108 q 8 2 14 -4" fill="none" stroke="' + tint + '" stroke-width="5" opacity=".55" stroke-linecap="round"/>' +
        '<path d="M50 92 V 60" stroke="' + I + '" stroke-width="2.6" stroke-linecap="round"/>' +
        '<path d="M16 72 q 34 -9 68 0" fill="none" stroke="' + I + '" stroke-width="3.2"/><path d="M18 66 H 82 V 73 H 18 Z" fill="#8a6a3a" stroke="' + I + '" stroke-width="3" stroke-linejoin="round"/><path d="M18 69 h 64" stroke="#c9a24a" stroke-width="1.6"/>' +
        '<path d="M24 76 Q 22 100 26 116" fill="none" stroke="#fff" stroke-width="4" opacity=".4" stroke-linecap="round"/>' +
        '<rect x="34" y="97" width="32" height="18" rx="3" fill="#f6ecd0" stroke="' + I + '" stroke-width="2" transform="rotate(-2 50 106)"/><path d="M39 104 h 22 M41 109 h 18" stroke="' + I + '" stroke-width="1.6" stroke-linecap="round"/>' +
        '<path d="M70 124 q 12 -10 24 -2 q -10 10 -24 2 Z" fill="' + tint + '" stroke="' + I + '" stroke-width="2.2" stroke-linejoin="round"/>';
    }
    const wick = kind === "jar" ? '' : '<path d="M50 66 V 51" stroke="' + I + '" stroke-width="3" stroke-linecap="round"/>';
    return '<g class="rjar-art' + (lit ? " lit" : "") + '">' +
      '<circle class="rglow" cx="50" cy="38" r="52" fill="url(#rglowG)"/>' +
      '<g class="rwisps" fill="none" stroke="#f6ebcf" stroke-width="2.5" stroke-linecap="round"><path d="M42 2 q -8 -9 0 -18 q 8 -9 0 -18"/><path d="M60 0 q 8 -9 0 -18 q -8 -9 0 -18"/></g>' +
      '<g filter="url(#wobbleS)">' + body + '</g>' + wick +
      '<g class="rflame"><path d="M50 14 C 61 30 62 42 50 52 C 38 42 39 30 50 14 Z" fill="#f4b24a" stroke="' + I + '" stroke-width="2.6" stroke-linejoin="round"/><path d="M50 28 C 55 36 55 43 50 48 C 45 43 45 36 50 28 Z" fill="#fff2b8"/></g>' +
      '</g>';
  }

  /* ---- fairy lights ---- */
  const lights = $("rLights");
  [[60, 60], [170, 82], [290, 58], [410, 42], [520, 54], [640, 82], [760, 94], [880, 70], [1000, 50], [1120, 48], [1240, 68], [1360, 90], [1480, 60], [1560, 54]].forEach(function (p, i) {
    add("circle", { cx: p[0], cy: p[1], r: 26, fill: "url(#rglowG)", class: "rbulb", style: "animation-delay:" + (-i * 0.7) + "s" }, lights);
    add("ellipse", { cx: p[0], cy: p[1] + 4, rx: 6.5, ry: 9, fill: ["#ffe08a", "#ffb7a0", "#ffe08a", "#bfe3a0"][i % 4], stroke: "#3a2416", "stroke-width": 2.5 }, lights);
  });

  /* ---- step 1: choose a scent (small cute jars) ---- */
  const COLS = [140, 380, 620], BASES = [215, 500];
  [215, 500].forEach(function (base) {
    add("rect", { x: 12, y: base + 6, width: 736, height: 26, rx: 10, fill: "#8a5a33", stroke: "#3a2416", "stroke-width": 5 }, stage);
  });
  const jars = [];
  SCENTS.forEach(function (sc, i) {
    const cx = COLS[i % 3], base = BASES[Math.floor(i / 3)];
    const jar = add("g", { class: "rjar", tabindex: 0, role: "button", "aria-label": sc.name }, stage);
    const inner = add("g", { transform: "translate(" + (cx - 90) + " " + (base - 229) + ") scale(1.8)" }, jar);
    inner.innerHTML = candleMarkup(sc, false);
    const lb = add("text", { x: cx, y: base + 66, "text-anchor": "middle", class: "rjar-label" }, jar);
    lb.textContent = sc.name;
    add("rect", { x: cx - 80, y: base - 200, width: 160, height: 290, fill: "transparent" }, jar);
    jar.addEventListener("click", function () { chooseScent(sc); });
    jar.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); chooseScent(sc); } });
    jar.addEventListener("mouseenter", function () { SFX.hover(); });
    jars.push({ sc: sc, el: jar });
  });
  function chooseScent(sc) { scent = null; if (stopFire) { stopFire(); stopFire = null; } pick = sc; SFX.pop(2); buildLight(sc); show("light"); }
  let pick = null;

  /* ---- step 1b: the close-up. A big candle, a matchbox and your hand doing everything. ---- */
  const LS = $("light-svg");
  const lt = { step: 0, busy: false, H: { x: 1450, y: 1180, r: 0 }, hand: null, match: null, flame: null, head: null };
  function buildLight(sc) {
    const nameRot = function (a) { return 0; };
    LS.innerHTML =
      '<defs>' +
      '<g id="lpat"></g>' +
      ''+
      '<radialGradient id="lglowG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffc766" stop-opacity=".9"/><stop offset=".5" stop-color="#ff9d3f" stop-opacity=".3"/><stop offset="1" stop-color="#ff9d3f" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="lvig" cx="50%" cy="50%" r="75%"><stop offset=".55" stop-color="#1a0d08" stop-opacity="0"/><stop offset="1" stop-color="#1a0d08" stop-opacity=".6"/></radialGradient>' +
      '</defs>' +
      '<rect x="-900" y="-900" width="3400" height="2600" fill="url(#lwall)"/>' +
      // cozy blurred fairy lights and a bookcase glow behind
      '<g opacity=".55"><circle cx="260" cy="150" r="44" fill="url(#lglowG)"/><circle cx="520" cy="90" r="36" fill="url(#lglowG)"/><circle cx="1090" cy="110" r="40" fill="url(#lglowG)"/><circle cx="1340" cy="170" r="48" fill="url(#lglowG)"/><circle cx="1480" cy="80" r="34" fill="url(#lglowG)"/></g>' +
      '<g id="lworld" transform="translate(0 -170)">' +
      '<g filter="url(#wobble)">' +
        '<rect x="-900" y="470" width="3400" height="260" fill="#6a3f26" stroke="#3a2416" stroke-width="6"/>' +
        '<g fill="none" stroke="#3a2416" stroke-width="4" opacity=".6"><rect x="40" y="500" width="260" height="190" rx="14"/><rect x="340" y="500" width="260" height="190" rx="14"/><rect x="1000" y="500" width="260" height="190" rx="14"/><rect x="1300" y="500" width="260" height="190" rx="14"/></g>' +
        '<rect x="-900" y="452" width="3400" height="26" rx="10" fill="#e2b55a" stroke="#3a2416" stroke-width="6"/>' +
        '<rect x="-900" y="700" width="3400" height="1400" fill="url(#lplank)" stroke="#3a2416" stroke-width="6"/>' +
        '<rect x="-900" y="700" width="3400" height="34" fill="#b07a46" stroke="#3a2416" stroke-width="6"/>' +
      '</g>' +
      // crochet doily and shadows
      '<ellipse cx="800" cy="738" rx="330" ry="54" fill="#f3e9cf" stroke="#3a2416" stroke-width="5"/>' +
      '<ellipse cx="800" cy="738" rx="300" ry="46" fill="none" stroke="#c9b58a" stroke-width="5" stroke-dasharray="10 12" stroke-linecap="round"/>' +
      '<ellipse cx="800" cy="738" rx="230" ry="34" fill="none" stroke="#c9b58a" stroke-width="4"/>' +
      '<ellipse cx="800" cy="716" rx="200" ry="28" fill="#3a2416" opacity=".28"/>' +
      '<g id="lcandle" class="ltap" role="button" tabindex="0" aria-label="The candle"><g transform="translate(590 167) scale(4.2)"></g><rect x="610" y="190" width="380" height="540" fill="transparent"/></g>' +
      // dish for the used match
      '<g transform="translate(400 790)"><ellipse cx="0" cy="14" rx="128" ry="26" fill="#3a2416" opacity=".25"/><ellipse cx="0" cy="0" rx="120" ry="26" fill="#efe3c4" stroke="#3a2416" stroke-width="5"/><ellipse cx="0" cy="-2" rx="88" ry="16" fill="#d8c8a2" stroke="#3a2416" stroke-width="3"/><path d="M-100 -4 q10 -10 22 -4 M80 0 q10 -10 22 -4" stroke="#a3432c" stroke-width="4" fill="none" stroke-linecap="round"/></g>' +
      '<g id="ldish"></g>' +
      // the matchbox with matches standing up in the open tray
      '<g id="lbox" class="ltap" role="button" tabindex="0" aria-label="The matchbox" transform="translate(1130 835) scale(1.5)">' +
        '<ellipse cx="20" cy="8" rx="190" ry="18" fill="#3a2416" opacity=".25"/>' +
        '<g filter="url(#wobbleS)" stroke="#3a2416" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round">' +
        '<path d="M-142 -40 L 36 -44 L 38 0 L -140 2 Z" fill="#c99a5a"/><path d="M-132 -32 L 28 -35 L 30 -6 L -130 -4 Z" fill="#a9763a" stroke-width="2.4"/>' +
        '<g id="lstock"></g>' +
        '<path d="M12 -60 L 192 -62 L 194 2 L 14 2 Z" fill="#b8573a"/>' +
        '<path d="M12 -60 L 192 -62 L 192 -46 L 13 -45 Z" fill="#4a2a1c" stroke-width="2.6"/>' +
        '<path d="M22 -52 l6 0 M48 -53 l8 0 M80 -53 l5 0 M112 -54 l8 0 M146 -54 l6 0 M172 -55 l6 0" stroke="#c9a070" stroke-width="2.4" fill="none"/>' +
        '<path d="M28 -38 L 176 -40 L 177 -8 L 29 -6 Z" fill="#f1e2bb" stroke-width="2.6"/>' +
        '<path d="M35 -33 q 70 -4 136 -3" fill="none" stroke="#b8573a" stroke-width="1.8" stroke-dasharray="6 5"/>' +
        '<text x="104" y="-14" text-anchor="middle" font-family="Caveat Brush, cursive" font-size="25" fill="#7a2a1c" stroke="none">Matches</text>' +
        '<path d="M50 -22 C 56 -32 58 -36 50 -40 C 42 -36 44 -32 50 -22Z" fill="#e8a040" stroke-width="2"/>' +
        '<path d="M20 -56 l-6 10 M30 -56 l-6 10 M40 -56 l-6 10" stroke="#3a2416" stroke-width="1.4" opacity=".35" fill="none"/>' +
        '<path d="M16 -4 l24 -22 M30 -4 l24 -22" stroke="#3a2416" stroke-width="1.4" opacity=".28" fill="none"/>' +
        '</g>' +
        '<rect x="-150" y="-70" width="360" height="90" fill="transparent"/>' +
      '</g>' +
      '<ellipse id="lhalo-box" class="lhalo" cx="1170" cy="770" rx="300" ry="170"/><ellipse id="lhalo-candle" class="lhalo" cx="800" cy="450" rx="250" ry="330"/>' +
      '<circle id="lglow" cx="800" cy="360" r="760" fill="url(#lglowG)" opacity="0" pointer-events="none"/>' +
      // the hand (same style as the one in the kitchen)
      '<g id="lhand" opacity="0" pointer-events="none" filter="url(#wobbleS)"><g id="larm"><path d="M-32 54 L38 54 L150 1200 L-190 1200 Z" fill="#b5683f" stroke="#5a2a1c" stroke-width="2.6" stroke-linejoin="round"/><path d="M-32 54 L-190 1200 L-150 1200 L-26 54 Z" fill="#8f4a2e" opacity=".55"/><rect x="-37" y="44" width="80" height="30" rx="12" fill="#efe3c4" stroke="#5a2a1c" stroke-width="2.6"/><path d="M-22 52 V66 M-8 52 V66 M6 52 V66 M20 52 V66" stroke="#d3c196" stroke-width="2.6" stroke-linecap="round"/><path d="M-23 12 H30 L33 46 H-26 Z" fill="#e9b894" stroke="#5a2a1c" stroke-width="2.6" stroke-linejoin="round"/></g>' +
        '<g id="lfing"><path d="M-29 -2 C-29 -14 -22 -20 -12 -20 H16 C26 -20 32 -14 32 -2 L33 24 C33 38 20 48 2 48 C-16 48 -29 38 -29 24 Z" fill="#e9b894" stroke="#5a2a1c" stroke-width="2.6" stroke-linejoin="round"/><path d="M-18 40 C-6 46 12 46 24 40" fill="none" stroke="#d6a47e" stroke-width="5" stroke-linecap="round" opacity=".7"/><rect x="-47" y="-4" width="21" height="42" rx="10.5" transform="rotate(28 -36 17)" fill="#e9b894" stroke="#5a2a1c" stroke-width="2.6"/></g>' +
        '<g id="lmatch" opacity="0"><path d="M0 0 L0 -92" stroke="#5a2a1c" stroke-width="11" stroke-linecap="round"/><path d="M0 0 L0 -92" stroke="#ecd09a" stroke-width="6" stroke-linecap="round"/><circle id="lhead" cx="0" cy="-92" r="9" fill="#c0392b" stroke="#5a2a1c" stroke-width="3.5"/>' +
          '<g id="lmflame" opacity="0"><path d="M0 -98 C 14 -116 16 -134 0 -152 C -16 -134 -14 -116 0 -98 Z" fill="#ffb347" stroke="#5a2a1c" stroke-width="3.5" stroke-linejoin="round"/><path d="M0 -112 C 7 -122 7 -132 0 -140 C -7 -132 -7 -122 0 -112 Z" fill="#fff0b0"/></g></g>' +
        '<g id="lfront"><rect x="-29" y="-40" width="14" height="42" rx="7" fill="#e9b894" stroke="#5a2a1c" stroke-width="2.6"/><rect x="-14" y="-46" width="14" height="48" rx="7" fill="#e9b894" stroke="#5a2a1c" stroke-width="2.6"/><rect x="1" y="-46" width="14" height="48" rx="7" fill="#e9b894" stroke="#5a2a1c" stroke-width="2.6"/><rect x="16" y="-40" width="14" height="42" rx="7" fill="#e9b894" stroke="#5a2a1c" stroke-width="2.6"/><path d="M-22 -26 V-14 M-7 -32 V-18 M8 -32 V-18 M23 -26 V-14" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".45"/></g></g>' +
      '<g id="lfx" pointer-events="none"></g>' +
      '</g>' +
      '<g id="lstk" pointer-events="none"></g>' +
      '<rect id="ldark" x="-900" y="-900" width="3400" height="2600" fill="#1a0d08" opacity=".38" pointer-events="none"/>' +
      '<rect x="-900" y="-900" width="3400" height="2600" fill="url(#lvig)" pointer-events="none"/>' +
      '<rect x="0" y="0" width="1600" height="900" fill="url(#hatch)" opacity=".35" pointer-events="none"/>' +
      '<rect x="-900" y="-900" width="3400" height="2600" fill="#fff" filter="url(#grainF)" opacity=".55" pointer-events="none" style="mix-blend-mode:multiply"/>';
    if (window.STK) LS.querySelector("#lstk").innerHTML = STK.g("postcard", 170, 130, 90, -6) + STK.g("applePrint", 330, 170, 84, 5) + STK.g("leaf", 1420, 120, 70, 24, "#c5472f");
    (function () {
      const gw = document.getElementById("gwall"), gp = document.getElementById("gplank"), box = LS.querySelector("#lpat");
      if (gw && gp && box) box.innerHTML = gw.outerHTML.replace('id="gwall"', 'id="lwall"') + gp.outerHTML.replace('id="gplank"', 'id="lplank"');
    })();
    LS.querySelector("#lcandle g").innerHTML = candleMarkup(sc, false);
    // the matches standing in the tray
    const stock = LS.querySelector("#lstock");
    for (let k = 0; k < 7; k++) {
      const x = -118 + k * 22;
      const m = add("g", { class: "lm" + k }, stock);
      const lean = (k % 3 - 1) * 1.5;
      add("path", { d: "M" + x + " -36 L " + (x + lean) + " -108", stroke: "#3a2416", "stroke-width": 8.5, "stroke-linecap": "round" }, m);
      add("path", { d: "M" + x + " -36 L " + (x + lean) + " -108", stroke: "#d9b878", "stroke-width": 4.2, "stroke-linecap": "round" }, m);
      add("path", { d: "M" + (x - 1) + " -44 L " + (x + lean - 1) + " -96", stroke: "#8a6a3a", "stroke-width": 1.2, "stroke-linecap": "round", opacity: .6 }, m);
      add("path", { d: "M" + (x + lean - 7) + " -108 Q " + (x + lean - 8) + " -118 " + (x + lean) + " -118 Q " + (x + lean + 8) + " -118 " + (x + lean + 7) + " -108 Q " + (x + lean + 6) + " -101 " + (x + lean) + " -100 Q " + (x + lean - 6) + " -101 " + (x + lean - 7) + " -108 Z", fill: "#b8392b", stroke: "#3a2416", "stroke-width": 2.8, "stroke-linejoin": "round" }, m);
    }
    lt.hand = LS.querySelector("#lhand"); lt.match = LS.querySelector("#lmatch"); lt.flame = LS.querySelector("#lmflame"); lt.head = LS.querySelector("#lhead");
    lt.step = 0; lt.busy = false; lt.H = { x: 1450, y: 1180, r: 0 };
    const box = LS.querySelector("#lbox"), can = LS.querySelector("#lcandle");
    box.addEventListener("click", function () { lightStep("box"); });
    can.addEventListener("click", function () { lightStep("candle"); });
    [box, can].forEach(function (el) { el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.dispatchEvent(new MouseEvent("click")); } }); });
    frameLight();
    setLightText();
  }
  function frameLight() {
    const tall = window.innerWidth / window.innerHeight < 0.9;
    LS.setAttribute("viewBox", tall ? "360 -60 1100 900" : "0 0 1600 900");
    LS.setAttribute("preserveAspectRatio", tall ? "xMidYMid meet" : "xMidYMid slice");
  }
  window.addEventListener("resize", frameLight);
  function setLightText() {
    const T = [["Take a match, {name}.", "Tap the matchbox."], ["Now strike it.", "Tap the matchbox again."], ["Light the wick.", "Tap the candle."]];
    const halo = function (id, on) { LS.querySelector(id).classList.toggle("on", on); };
    if (lt.step > 2) {
      $("light-title").textContent = withName("Mmm, smell that, {name}?");
      $("light-hint").textContent = pick.line;
      $("light-next").hidden = false; $("light-back").hidden = true;
      halo("#lhalo-box", false); halo("#lhalo-candle", false);
      return;
    }
    $("light-title").textContent = withName(T[lt.step][0]);
    $("light-hint").textContent = T[lt.step][1];
    $("light-next").hidden = true; $("light-back").hidden = false;
    halo("#lhalo-box", lt.step < 2); halo("#lhalo-candle", lt.step === 2);
  }
  // the hand: "tip" is the match head, so we move the head and work out where the hand must be
  const HS = 1.5;   // the hand is drawn a bit bigger than in the kitchen so it fits the big candle
  function gripFor(h) { const a = h.r * Math.PI / 180; return { x: h.x - 92 * HS * Math.sin(a), y: h.y + 92 * HS * Math.cos(a) }; }
  function placeH(h) {
    const gp = gripFor(h), tilt = -16 + h.r * 0.3;
    lt.hand.setAttribute("transform", "translate(" + gp.x.toFixed(1) + " " + gp.y.toFixed(1) + ") scale(" + HS + ")");
    LS.querySelector("#larm").setAttribute("transform", "rotate(-16)");
    LS.querySelector("#lfing").setAttribute("transform", "rotate(" + tilt.toFixed(1) + ")");
    LS.querySelector("#lfront").setAttribute("transform", "rotate(" + tilt.toFixed(1) + ")");
    lt.match.setAttribute("transform", "rotate(" + h.r.toFixed(1) + ")");
    lt.H = { x: h.x, y: h.y, r: h.r };
  }
  function moveTip(to, ms, lift) {
    const f = { x: lt.H.x, y: lt.H.y, r: lt.H.r };
    return tween(ms, function (k) {
      placeH({ x: lerp(f.x, to.x, k), y: lerp(f.y, to.y, k) - Math.sin(k * Math.PI) * (lift || 0), r: lerp(f.r, to.r, k) });
    });
  }
  const lfx = function () { return LS.querySelector("#lfx"); };
  function lsparks(x, y, n) {
    for (let i = 0; i < n; i++) {
      const s = add("path", { d: "M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2Z", fill: "#ffe08a", stroke: "#3a2416", "stroke-width": 1.2 }, lfx());
      const a = Math.random() * Math.PI * 2, d = 30 + Math.random() * 50;
      tween(800, function (k) { s.setAttribute("transform", "translate(" + (x + Math.cos(a) * d * k).toFixed(1) + " " + (y + Math.sin(a) * d * k - 14 * k).toFixed(1) + ") scale(" + (1 - k * 0.6).toFixed(2) + ")"); s.setAttribute("opacity", 1 - k); }).then(function () { s.remove(); });
    }
  }
  function lsmoke(x, y) {
    for (let i = 0; i < 4; i++) {
      const c = add("circle", { r: 9, fill: "#eee6d6", stroke: "#3a2416", "stroke-width": 3 }, lfx());
      tween(1700, function (k) { c.setAttribute("cx", (x + Math.sin(k * 6 + i * 2) * 12).toFixed(1)); c.setAttribute("cy", (y - k * 120 - i * 22).toFixed(1)); c.setAttribute("r", 9 + k * 14); c.setAttribute("opacity", (1 - k) * 0.85); }).then(function () { c.remove(); });
    }
  }
  async function lightStep(what) {
    if (lt.busy) return;
    if (lt.step === 0 && what === "box") { lt.busy = true; await takeMatch(); lt.step = 1; lt.busy = false; setLightText(); }
    else if (lt.step === 1 && what === "box") { lt.busy = true; await strikeMatch(); lt.step = 2; lt.busy = false; setLightText(); }
    else if (lt.step === 2 && what === "candle") { lt.busy = true; await lightWick(); lt.step = 3; lt.busy = false; setLightText(); }
    else SFX.hover();
  }
  async function takeMatch() {
    LS.querySelector("#lhalo-box").classList.remove("on");
    const head = { x: 1130 - 111, y: 835 - 162 };           // the third match from the left
    lt.match.setAttribute("opacity", 0); lt.head.setAttribute("fill", "#c0392b");
    placeH({ x: 1450, y: 1180, r: 0 });
    lt.hand.setAttribute("opacity", 1);
    SFX.whoosh(1000);
    await moveTip({ x: head.x, y: head.y - 14, r: 0 }, 1000, 60);
    await sleep(250);
    SFX.tap();                                              // pinch the match
    LS.querySelector(".lm2").setAttribute("opacity", 0);
    lt.match.setAttribute("opacity", 1);
    await sleep(250);
    await moveTip({ x: 1090, y: 520, r: -6 }, 800, 20);     // lift it up
  }
  async function strikeMatch() {
    SFX.whoosh(600);
    await moveTip({ x: 1215, y: 735, r: 32 }, 800, 30);
    await sleep(250);
    SFX.strike();                                           // scratch along the strip
    const t0 = performance.now();
    await tween(330, function (k) { placeH({ x: lerp(1215, 1380, k), y: 735, r: 32 }); if (Math.random() < 0.5) lsparks(lt.H.x, 738, 1); });
    lt.flame.setAttribute("opacity", 1);
    lt.flame.style.animation = "rflick .9s ease-in-out infinite";
    lt.flame.style.transformBox = "fill-box"; lt.flame.style.transformOrigin = "50% 100%";
    lsparks(lt.H.x, 720, 7);
    await sleep(600);
    await moveTip({ x: 1010, y: 470, r: -24 }, 1000, 50);    // carry the little flame over
  }
  async function lightWick() {
    LS.querySelector("#lhalo-candle").classList.remove("on");
    await moveTip({ x: 880, y: 372, r: -28 }, 800, 30);
    await moveTip({ x: 806, y: 376, r: -28 }, 600, 0);       // touch the wick
    await sleep(350);
    SFX.ignite();
    LS.querySelector("#lcandle .rjar-art").classList.add("lit");
    LS.querySelector("#ldark").setAttribute("opacity", 0);
    LS.querySelector("#lglow").setAttribute("opacity", 0.9);
    lsparks(800, 330, 10);
    await sleep(1100);
    await moveTip({ x: 980, y: 300, r: -10 }, 600, 20);      // pull the match away
    SFX.blow();                                              // shake it out
    for (let i = 0; i < 4; i++) await moveTip({ x: 980, y: 300, r: i % 2 ? 12 : -12 }, 130, 0);
    lt.flame.setAttribute("opacity", 0); lt.head.setAttribute("fill", "#2a1810");
    lsmoke(980, 230);
    await sleep(500);
    SFX.whoosh(900);
    await moveTip({ x: 420, y: 690, r: 8 }, 1100, 120);      // over to the little dish
    await sleep(200);
    lt.match.setAttribute("opacity", 0);                     // let go of the match
    const used = add("g", {}, LS.querySelector("#ldish"));
    used.innerHTML = '<path d="M0 0 L 0 62" stroke="#3a2416" stroke-width="9" stroke-linecap="round"/><path d="M0 0 L 0 62" stroke="#8a6a4a" stroke-width="4.5" stroke-linecap="round"/><circle cx="0" cy="0" r="7.5" fill="#2a1810" stroke="#3a2416" stroke-width="3"/>';
    await tween(380, function (k) { used.setAttribute("transform", "translate(" + lerp(420, 410, k).toFixed(1) + " " + lerp(690, 770, k * k).toFixed(1) + ") rotate(" + lerp(8, 74, k).toFixed(0) + ")"); });
    SFX.tap();
    await sleep(300);
    SFX.whoosh(900);
    await moveTip({ x: 1450, y: 1180, r: 0 }, 1000, 0);
    lt.hand.setAttribute("opacity", 0);
    SFX.sparkle();
    scent = pick;
    if (stopFire) stopFire();
    stopFire = SFX.fire(0.7);
  }
  $("light-back").addEventListener("click", function () { if (!lt.busy) show("candle"); });
  $("light-next").addEventListener("click", function () { placeCandle(); SFX.chime(); show("genre"); });
  function placeCandle() {
    spot.innerHTML = candleMarkup(scent, true);
    glow.style.opacity = 1;
    corner.innerHTML = '<svg viewBox="-10 -40 120 170" aria-hidden="true">' + candleMarkup(scent, true) + '</svg>';
  }

  /* ---- step 2: the mood ---- */
  const genresBox = $("r-genres");
  GENRES.forEach(function (gn) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "rgenre"; b.style.setProperty("--c", gn.color);
    b.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true" fill="currentColor">' + gn.icon + '</svg><strong>' + gn.name + '</strong><span>' + gn.blurb + '</span>';
    b.addEventListener("click", function () { genre = gn; buildShelf(); show("shelf"); });
    b.addEventListener("mouseenter", function () { SFX.hover(); });
    genresBox.appendChild(b);
  });

  /* ---- step 3: the shelf (two books of the chosen mood have ribbons) ---- */
  const COLORS = ["#8a3a3a", "#c0692f", "#d4a84a", "#7f8a4c", "#e0cfa4", "#a3432c", "#5e3a24", "#d98a3a", "#7a2f33", "#4f7a6a", "#6d5a8a"];
  let seed = 3;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  // old-fashioned leather books: raised bands, gold lines, label plates, round shading
  const LEATHER = ["#6b2a2a", "#2f4a3a", "#3a3f5c", "#5a3a22", "#8a5a2e", "#4a2f42", "#7a2f33", "#2f5a5a", "#a07a3a", "#5a2a1c", "#3c5a2e"];
  const GOLD = "#e8bf63", INK = "#3a2416", PLATE = "#f3e5c0";
  function drawLeather(parent, bw, bh, c, opt) {
    opt = opt || {};
    const body = add("g", { class: "rbody" }, parent);
    add("rect", { x: 0, y: -bh, width: bw, height: bh, rx: 5, fill: c, stroke: INK, "stroke-width": 3.5 }, body);
    add("rect", { x: 3.5, y: -bh + 3, width: Math.max(5, bw * 0.2), height: bh - 6, rx: 3, fill: "#fff", opacity: 0.17 }, body);
    add("rect", { x: bw * 0.74, y: -bh + 3, width: bw * 0.23, height: bh - 6, rx: 3, fill: "#000", opacity: 0.2 }, body);
    // gold head and tail lines
    [[-bh + 9], [-bh + 15], [-15], [-9]].forEach(function (a) { add("path", { d: "M3 " + a[0] + " H" + (bw - 3), stroke: GOLD, "stroke-width": 2.6, "stroke-linecap": "round" }, body); });
    const k = opt.kind;
    if (k === 0) {            // title plate near the top + raised bands below
      add("rect", { x: 5, y: -bh + 26, width: bw - 10, height: Math.min(34, bh * 0.22), rx: 3, fill: PLATE, stroke: INK, "stroke-width": 2 }, body);
      add("path", { d: "M10 " + (-bh + 38) + " H" + (bw - 10) + " M12 " + (-bh + 46) + " H" + (bw - 12), stroke: INK, "stroke-width": 2, opacity: 0.55 }, body);
      [0.5, 0.66].forEach(function (f) { add("path", { d: "M0 " + (-bh * f) + " H" + bw + " M0 " + (-bh * f + 6) + " H" + bw, stroke: GOLD, "stroke-width": 2.6 }, body); });
    } else if (k === 1) {     // four raised bands
      [0.2, 0.4, 0.6, 0.8].forEach(function (f) {
        add("rect", { x: 0, y: -bh * f - 4, width: bw, height: 8, fill: "#000", opacity: 0.18 }, body);
        add("path", { d: "M0 " + (-bh * f - 4) + " H" + bw + " M0 " + (-bh * f + 4) + " H" + bw, stroke: GOLD, "stroke-width": 2.4 }, body);
      });
    } else if (k === 2) {     // a gold frame with a diamond
      add("rect", { x: 6, y: -bh + 24, width: bw - 12, height: bh - 48, rx: 3, fill: "none", stroke: GOLD, "stroke-width": 2.4 }, body);
      add("path", { d: "M" + (bw / 2) + " " + (-bh / 2 - 10) + " l8 10 l-8 10 l-8 -10Z", fill: GOLD, stroke: INK, "stroke-width": 1.6 }, body);
    } else {                  // two small plates and gold dots
      add("rect", { x: 6, y: -bh + 24, width: bw - 12, height: 22, rx: 3, fill: PLATE, stroke: INK, "stroke-width": 2 }, body);
      add("rect", { x: 8, y: -bh + 54, width: bw - 16, height: 14, rx: 3, fill: "#2a1810", stroke: GOLD, "stroke-width": 1.6 }, body);
      for (let d = 0; d < 3; d++) add("circle", { cx: bw / 2, cy: -34 - d * 12, r: 2.6, fill: GOLD }, body);
    }
    if (rnd() < 0.4) add("path", { d: "M" + (bw * 0.3) + " " + (-bh * 0.3) + " q 4 -8 2 -16", stroke: "#000", "stroke-width": 2, fill: "none", opacity: 0.25, "stroke-linecap": "round" }, body);   // a worn scuff
    return body;
  }
  function trinket(x, floor, kind) {
    const t = add("g", { transform: "translate(" + x + " " + (floor - 8) + ")" }, g);
    if (kind === 0) {
      add("path", { d: "M-14 0 H14 L11 -20 H-11 Z", fill: "#c0692f", stroke: INK, "stroke-width": 3.5, "stroke-linejoin": "round" }, t);
      add("path", { d: "M0 -20 C -18 -34 -20 -48 -10 -56 C -2 -48 0 -34 0 -20 M0 -20 C 14 -36 24 -42 30 -36 C 28 -26 14 -22 0 -20 M0 -20 C 2 -40 8 -56 0 -66 C -8 -54 -4 -36 0 -20", fill: "#7f9a4c", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round" }, t);
    } else if (kind === 1) {
      add("path", { d: "M-14 -26 H14 V-4 Q14 0 8 0 H-8 Q-14 0 -14 -4 Z", fill: "#efe3c4", stroke: INK, "stroke-width": 3.5, "stroke-linejoin": "round" }, t);
      add("path", { d: "M14 -20 q 12 0 12 8 q 0 8 -12 8", fill: "none", stroke: INK, "stroke-width": 3.5 }, t);
      add("path", { d: "M-6 -32 q 4 -6 0 -12 M4 -32 q 4 -6 0 -12", fill: "none", stroke: "#fff3cf", "stroke-width": 2.5, "stroke-linecap": "round", opacity: 0.8 }, t);
    } else {
      add("rect", { x: -9, y: -30, width: 18, height: 30, rx: 4, fill: "#fff3cf", stroke: INK, "stroke-width": 3.5 }, t);
      add("path", { d: "M0 -34 C 5 -42 5 -48 0 -54 C -5 -48 -5 -42 0 -34Z", fill: "#ffb347", stroke: INK, "stroke-width": 2.5 }, t);
    }
    return 34;
  }
  function buildShelf() {
    g.innerHTML = ""; seed = 3;
    const mine = STORIES.filter(function (s) { return s.genre === genre.id; });
    const slots = {};
    ["0:2", "1:4", "0:8", "1:10", "0:15", "1:16"].forEach(function (k, n) { if (mine[n]) slots[k] = mine[n]; });
    [310, 500, 700].forEach(function (floor, row) {
      let x = 356, i = 0;
      while (x < 1226) {
        const w = 28 + Math.floor(rnd() * 22), h = 112 + Math.floor(rnd() * 56);
        if (x + w > 1244) break;
        const story = slots[row + ":" + i];
        if (!story && i > 2 && rnd() < 0.07) { x += trinket(x + 14, floor, Math.floor(rnd() * 3)) + 6; i++; continue; }
        const c = story ? story.color : LEATHER[Math.floor(rnd() * LEATHER.length)];
        const tilt = !story && rnd() < 0.08;
        const wrap = add("g", { class: story ? "rbook-spine open" : "rbook-spine", transform: "translate(" + x + " " + (floor - 8) + ")" + (tilt ? " rotate(-8)" : "") }, g);
        const bw = story ? Math.max(w, 46) : w, bh = story ? 170 : h;
        const body = drawLeather(wrap, bw, bh, c, { kind: story ? 4 : Math.floor(rnd() * 4) });
        add("rect", { x: 0, y: -bh, width: bw, height: bh, fill: "url(#hatch)", opacity: story ? 0.3 : 0.45, "pointer-events": "none" }, body);
        add("path", { d: "M" + (bw - 5) + " " + (-bh + 6) + " V -6 M5 " + (-bh + 8) + " V -10", stroke: "#2a160c", "stroke-width": 2, "stroke-linecap": "round", opacity: 0.35, fill: "none", "pointer-events": "none" }, body);
        if (story) {
          // a big cream plate with the title, and the ribbon on top
          add("rect", { x: 6, y: -bh + 24, width: bw - 12, height: bh - 52, rx: 4, fill: PLATE, stroke: INK, "stroke-width": 2.5 }, body);
          add("rect", { x: 10, y: -bh + 28, width: bw - 20, height: bh - 60, rx: 3, fill: "none", stroke: GOLD, "stroke-width": 1.8 }, body);
          const t = add("text", { transform: "translate(" + (bw / 2 + 6) + " " + (-bh / 2 - 2) + ") rotate(-90)", "text-anchor": "middle", class: "rbook-title" }, body);
          t.textContent = story.short;
          add("path", { d: "M" + (bw - 12) + " " + (-bh) + " v -18 l 6 9 l 6 -9 v 18 Z", fill: "#a3432c", stroke: INK, "stroke-width": 2 }, wrap);
          wrap.setAttribute("tabindex", "0"); wrap.setAttribute("role", "button"); wrap.setAttribute("aria-label", "Read " + story.title);
          wrap.addEventListener("click", function () { openBook(story); });
          wrap.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBook(story); } });
          wrap.addEventListener("mouseenter", function () { SFX.hover(); });
          add("rect", { x: -4, y: -bh - 6, width: bw + 8, height: bh + 12, fill: "transparent" }, wrap);   // a hit area that never moves
        }
        x += (story ? Math.max(w, 46) : w) + 3;
        i++;
      }
    });
  }

  /* ---- reading: a real-feeling open book ---- */
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  const LEAVES = '<svg viewBox="0 0 120 110" aria-hidden="true" class="rleafframe"><g fill="none" stroke="#6a2424" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18 Q 60 8 106 18 Q 112 56 106 94 Q 60 104 14 94 Q 8 56 14 18 Z" fill="#f6e7c4"/><path d="M24 28 Q 60 20 96 28 Q 100 56 96 84 Q 60 92 24 84 Q 20 56 24 28 Z" stroke-width="2"/><path d="M60 82 Q 58 56 60 34" stroke-width="3"/><path d="M60 72 Q 40 66 34 50 Q 54 52 60 72 Z M60 56 Q 82 52 88 36 Q 66 36 60 56 Z" fill="#d98a3a"/><path d="M60 46 Q 46 42 42 30 Q 56 32 60 46 Z" fill="#a3432c"/></g></svg>';
  function leafBox(n) {
    const L = ['<path d="M50 78 Q 46 50 50 22 M50 66 Q 30 60 24 42 Q 44 44 50 66 Z M50 50 Q 72 46 78 28 Q 56 28 50 50 Z" fill="#d98a3a"/>','<path d="M50 80 V 24 M50 70 Q 28 66 24 48 Q 44 50 50 70 M50 56 Q 72 54 76 36 Q 56 36 50 56 M50 42 Q 36 40 34 28 Q 46 30 50 42" fill="#c0692f"/>','<path d="M50 80 Q 30 52 50 20 Q 70 52 50 80 Z" fill="#a3432c"/><path d="M50 80 V 32"/>'];
    return '<svg class="rleafbox" viewBox="0 0 100 100" aria-hidden="true"><g stroke="#6a2424" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" fill="none"><rect x="8" y="10" width="84" height="80" rx="3" fill="#cf9a64" opacity=".85"/><rect x="16" y="18" width="68" height="64" fill="#ecd5a0"/>' + L[n % 3] + '</g></svg>';
  }
  function pageHTML(p) {
    if (!p || p.blank) return '<div class="rpage blank"></div>';
    if (p.inside) return '<div class="rpage inside"></div>';
    if (p.cover) return '<div class="rpage cover">' + LEAVES + '<p class="rgenre-tag">' + p.tag + '</p><h3>' + esc(p.title) + '</h3><span class="rorn">❦</span></div>';
    if (p.quote) return '<div class="rpage quote"><span class="qmark">“</span><p>' + esc(p.quote.text) + '</p>' + (p.quote.by ? '<em>— ' + esc(p.quote.by) + '</em>' : "") + '</div>';
    if (p.end) return '<div class="rpage end"><span class="rorn">❦</span><p class="rend">The End</p><p class="rsub">Close the book whenever you like.</p></div>';
    const t = p.text;
    return '<div class="rpage"><span class="rhead">' + esc(p.h) + '</span>' + leafBox(p.n) + '<p><span class="drop">' + esc(t.charAt(0)) + '</span>' + esc(t.slice(1)) + '</p><span class="rnum">' + p.n + '</span></div>';
  }
  function perView() { return window.innerWidth < 760 ? 1 : 2; }
  function buildPages(story, per) {
    const core = [{ cover: true, title: story.title, tag: genre.name }]
      .concat(story.pages.map(function (t, k) { return { text: t, n: k + 1, h: story.title }; }), [{ quote: story.quote }, { end: true }]);
    if (per === 1) return core;
    const all = [{ inside: true }].concat(core);
    if (all.length % 2) all.push({ blank: true });
    return all;
  }
  let lastPer = 0;
  function render(anim) {
    const per = perView();
    if (per !== lastPer) {   // phone <-> desktop: rebuild pages and keep the same page
      const here = pages[at];
      pages = buildPages(curStory, per);
      at = Math.max(0, pages.indexOf(here));
      if (per === 1 && here && (here.inside || here.blank)) at = 0;
      lastPer = per;
    }
    if (per === 2 && at % 2 === 1) at--;
    spread.className = "rspread " + (per === 2 ? "two" : "one") + (anim ? " " + anim : "");
    spread.style.setProperty("--bk", curStory.color);
    spread.innerHTML = pageHTML(pages[at]) + (per === 2 ? pageHTML(pages[at + 1]) : "");
    flipEl.hidden = true;
    const total = Math.ceil(pages.length / per), cur = Math.floor(at / per);
    dots.innerHTML = "";
    for (let d = 0; d < total; d++) { const i = document.createElement("i"); if (d === cur) i.className = "on"; dots.appendChild(i); }
    prev.disabled = at === 0;
    next.disabled = at + per >= pages.length;
  }
  function openBook(story) {
    curStory = story; lastPer = 0; at = 0; pages = [];
    box.hidden = false;
    SFX.bookOpen();
    render("opening");
  }
  // turning a page: a real page lifts, curls over the middle and lands on the other side
  function step(dir) {
    if (flipping) return;
    const per = perView(), to = at + dir * per;
    if (to < 0 || to >= pages.length) return;
    if (per === 1) {
      SFX.flip(); at = to; render(dir > 0 ? "turnR" : "turnL"); return;
    }
    flipping = true;
    SFX.flip();
    const L = dir > 0 ? pages[at] : pages[at - 2], R = dir > 0 ? pages[at + 3] : pages[at + 1];
    spread.innerHTML = pageHTML(L) + pageHTML(R);
    const front = dir > 0 ? pages[at + 1] : pages[at], back = dir > 0 ? pages[at + 2] : pages[at - 1];
    flipEl.querySelector(".front").innerHTML = pageHTML(front);
    flipEl.querySelector(".back").innerHTML = pageHTML(back);
    flipEl.className = "rflip " + (dir > 0 ? "fwd" : "bak");
    flipEl.hidden = false;
    void flipEl.offsetWidth;
    flipEl.classList.add("go");
    setTimeout(function () { at = to; flipping = false; render(); }, 920);
  }
  prev.addEventListener("click", function () { step(-1); });
  next.addEventListener("click", function () { step(1); });
  spread.addEventListener("click", function (e) { if (e.target.closest(".rpage") && perView() === 1) step(1); });
  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "Escape") closeBook();
  });
  function closeBook() {
    box.hidden = true;
    SFX.close();
    title.textContent = withName("Lovely. Pick another, or finish whenever you like, {name}.");
  }
  $("r-close").addEventListener("click", closeBook);
  window.addEventListener("resize", function () { if (!box.hidden && !flipping) render(); });

  function stopAll() { if (stopFire) { stopFire(); stopFire = null; } }
  $("read-done").addEventListener("click", function () { stopAll(); nextActivity(); });
  $("read-mood").addEventListener("click", function () { show("genre"); });

  /* which panel is showing */
  function show(stage_) {
    pCandle.hidden = stage_ !== "candle";
    pGenre.hidden = stage_ !== "genre";
    ui.hidden = stage_ !== "shelf";
    box.hidden = true;
    if (stage_ === "light") LS.removeAttribute("hidden"); else LS.setAttribute("hidden", "");
    $("lui").hidden = stage_ !== "light";
    $("read-svg").style.visibility = stage_ === "light" ? "hidden" : "visible";
    $("read-svg").classList.toggle("dimmed", stage_ === "candle" || stage_ === "genre");
    if (stage_ === "candle") $("r-candle-title").textContent = withName("Light a candle first, {name}.");
    if (stage_ === "genre") $("r-genre-title").textContent = withName("What are you in the mood for, {name}?");
    if (stage_ === "shelf") {
      title.textContent = withName("Pick a book from the shelf, {name}.");
      hint.textContent = "Tap a book with a little ribbon.";
    }
  }

  window.openReading = function () {
    showStep("reading");
    if (window.PEHowTo) PEHowTo.auto("reading");
    if (scent) { placeCandle(); show("genre"); if (!stopFire) stopFire = SFX.fire(0.7); }
    else {
      glow.style.opacity = 0; spot.innerHTML = "";
      jars.forEach(function (j) { j.el.classList.remove("on", "dim"); j.el.querySelector(".rjar-art").classList.remove("lit"); });
      $("r-scent").innerHTML = "&nbsp;";
      show("candle");
    }
  };
  if (location.hash === "#reading") window.openReading();
})();