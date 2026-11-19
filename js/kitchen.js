// Granny's coffee corner: you make the drink yourself, one slow step at a time.
// A hand (yours!) reaches in, picks up the ingredient and does the step while you watch.
// Uses showStep(), withName() and nextActivity() from main.js.

const SVGNS = "http://www.w3.org/2000/svg";
function el(tag, attrs, parent) {
  const n = document.createElementNS(SVGNS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(n);
  return n;
}
const INK = "#3a2416";
const sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
const easeSoft = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };   // slow in, slow out
const linear = function (t) { return t; };
const rad = function (d) { return d * Math.PI / 180; };
function rotv(x, y, deg) { const c = Math.cos(rad(deg)), s = Math.sin(rad(deg)); return { x: x * c - y * s, y: x * s + y * c }; }
const lerp = function (a, b, t) { return a + (b - a) * t; };

// run fn(progress 0..1) smoothly over ms milliseconds
function tween(ms, fn, ease) {
  const easing = ease || easeSoft;
  return new Promise(function (resolve) {
    const t0 = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - t0) / ms);
      fn(easing(t));
      if (t < 1) requestAnimationFrame(frame); else resolve();
    }
    requestAnimationFrame(frame);
  });
}

/* ---------- little decorations drawn with loops ---------- */
(function kitchenDecor() {
  const flags = document.getElementById("kbunting");
  const line = document.getElementById("kbuntingLine");
  const total = line.getTotalLength();
  for (let i = 0; i < 26; i++) {
    const p = line.getPointAtLength((i + 0.5) * total / 26);
    el("circle", { cx: p.x, cy: p.y + 12, r: 16, fill: "#ffd98a", opacity: 0.25, class: "kbulb" }, flags).style.animationDelay = "-" + (i * 0.37).toFixed(2) + "s";
    el("circle", { cx: p.x, cy: p.y + 10, r: 5, fill: "#ffe7a8", stroke: INK, "stroke-width": 2.2 }, flags);
  }
  const doily = document.getElementById("kdoily");
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2;
    el("circle", { cx: 450 + Math.cos(a) * 104, cy: 602 + Math.sin(a) * 13, r: 3.4, fill: "#f3e9cf", stroke: INK, "stroke-width": 1.8 }, doily);
  }
  const val = document.getElementById("kvalance");
  for (let x = 986; x < 1334; x += 29) {
    el("path", { d: "M" + x + " 84 q 14.5 18 29 0", fill: "url(#kfloral)", stroke: INK, "stroke-width": 2.6 }, val);
  }
  const ruf = document.getElementById("kruffle");
  for (let x = 646; x < 1010; x += 38) {
    el("path", { d: "M" + x + " 690 q 19 20 38 0", fill: "url(#kfloral)", stroke: INK, "stroke-width": 2.6 }, ruf);
  }
  const hooks = document.getElementById("khooks");
  const mugColors = ["#a8744a", "#b5683f", "#c9a24f", "#e0cfa4", "#7a5a3a"];
  for (let i = 0; i < 5; i++) {
    const x = 200 + i * 62;
    const g = el("g", { class: "khang" }, el("g", { filter: "url(#wobble)" }, hooks));
    g.style.animationDelay = "-" + (i * 1.3) + "s";
    el("path", { d: "M" + x + " 404 v10", stroke: INK, "stroke-width": 3, "stroke-linecap": "round", fill: "none" }, g);
    el("path", { d: "M" + (x + 16) + " 438 c 14 -2 14 18 0 16", fill: "none", stroke: INK, "stroke-width": 3.2, "stroke-linecap": "round" }, g);
    el("path", { d: "M" + (x - 17) + " 422 h34 v22 c0 8 -6 12 -17 12 s-17 -4 -17 -12 z", fill: mugColors[i], stroke: INK, "stroke-width": 2.8, "stroke-linejoin": "round" }, g);
    el("path", { d: "M" + (x - 14) + " 432 h28", stroke: "#f6ecd2", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.75 }, g);
  }
})();

/* =========================================================
   The things on the counter you can pick up.
   Each one is drawn standing on y = 0, centred on x = 0, with its spout / opening pointing LEFT.
   grip = where the hand holds it, tip = where things pour out.
   ========================================================= */
const ink = function (g, d, fill, extra) { return el("path", Object.assign({ class: "ink-thin", d: d, fill: fill }, extra || {}), g); };

function drawKettle(g) {
  el("path", { class: "ink", d: "M-64 0 C-70 -48 -46 -86 -6 -90 C34 -86 56 -48 50 0 Z", fill: "#d98a3a" }, g);
  el("path", { d: "M-46 -40 C-44 -62 -30 -76 -12 -80", stroke: "#e9efc8", "stroke-width": 6, "stroke-linecap": "round", fill: "none", opacity: 0.7 }, g);
  el("rect", { class: "ink-thin", x: -74, y: -8, width: 132, height: 10, rx: 4, fill: "url(#kchrome)" }, g);
  el("path", { class: "ink", d: "M-58 -34 C-90 -38 -100 -58 -106 -78 C-90 -74 -74 -62 -54 -52 Z", fill: "#d98a3a" }, g);
  el("ellipse", { class: "ink-thin", cx: -8, cy: -92, rx: 26, ry: 8, fill: "url(#kchrome)" }, g);
  el("circle", { class: "ink-thin", cx: -8, cy: -102, r: 7, fill: "#4a3320" }, g);
  el("path", { class: "ink", d: "M46 -66 C 88 -70 88 -14 44 -16", fill: "none", style: "stroke-width:12px" }, g);
  el("path", { d: "M46 -66 C 88 -70 88 -14 44 -16", fill: "none", stroke: "#4a3320", "stroke-width": 6, "stroke-linecap": "round" }, g);
}
function drawMoka(g) {
  ink(g, "M-30 0 L-22 -46 H22 L30 0 Z", "#c9c0aa");
  ink(g, "M-22 -46 L-26 -92 H26 L22 -46 Z", "#a68a5e");
  ink(g, "M-32 -92 L0 -118 L32 -92 Z", "#8f7248");
  el("circle", { class: "ink-thin", cx: 0, cy: -124, r: 6, fill: "#3a2416" }, g);
  ink(g, "M-26 -92 L-42 -100 L-30 -82 Z", "#8f7248");
  el("path", { class: "ink", d: "M26 -86 C 58 -90 58 -52 24 -52", fill: "none", style: "stroke-width:11px" }, g);
  el("path", { d: "M26 -86 C 58 -90 58 -52 24 -52", fill: "none", stroke: "#3a2416", "stroke-width": 5, "stroke-linecap": "round" }, g);
  el("path", { d: "M-10 -62 V -80 M6 -62 V -80", stroke: "#e8d9a8", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.7 }, g);
}
function drawJug(g) {
  ink(g, "M-26 0 C-34 -30 -30 -56 -18 -66 L 22 -66 C 34 -56 36 -30 28 0 Z", "#f1e6c6");
  ink(g, "M-18 -66 C -30 -66 -38 -72 -42 -82 C -30 -78 -22 -74 -14 -70 Z", "#f1e6c6");
  el("path", { d: "M-28 -26 H30", stroke: "#8a9450", "stroke-width": 7, "stroke-linecap": "round" }, g);
  el("path", { d: "M-22 -52 C -24 -44 -24 -38 -22 -34", stroke: "#fff", "stroke-width": 4, "stroke-linecap": "round", opacity: 0.6, fill: "none" }, g);
  el("path", { class: "ink", d: "M28 -56 C 56 -58 56 -20 26 -22", fill: "none", style: "stroke-width:9px" }, g);
  el("path", { d: "M28 -56 C 56 -58 56 -20 26 -22", fill: "none", stroke: "#f1e6c6", "stroke-width": 4, "stroke-linecap": "round" }, g);
}
function tinBody(g, color, lid) {
  ink(g, "M-26 0 V-70 H26 V0 Z", color);
  el("rect", { class: "ink-thin", x: -29, y: -76, width: 58, height: 10, rx: 4, fill: lid }, g);
  el("rect", { x: -17, y: -56, width: 34, height: 40, rx: 4, fill: "#f2e6c4", stroke: INK, "stroke-width": 2.4 }, g);
}
function teabagTags(g) {
  el("path", { d: "M-10 -76 C -10 -90 -14 -96 -18 -100 M8 -76 C 10 -88 14 -94 18 -96", stroke: INK, "stroke-width": 2.2, fill: "none", "stroke-linecap": "round" }, g);
  el("rect", { x: -26, y: -112, width: 14, height: 14, rx: 2, fill: "#f2e6c4", stroke: INK, "stroke-width": 2, transform: "rotate(-14 -19 -105)" }, g);
  el("rect", { x: 12, y: -108, width: 14, height: 14, rx: 2, fill: "#e0cfa4", stroke: INK, "stroke-width": 2, transform: "rotate(12 19 -101)" }, g);
}
function drawTinChamomile(g) {
  tinBody(g, "#c9a24f", "#a1802f");
  [[0, -44], [8, -36], [-8, -36], [5, -26], [-5, -26]].forEach(function (p) { el("circle", { cx: p[0], cy: p[1], r: 5, fill: "#fbf4de", stroke: INK, "stroke-width": 1.6 }, g); });
  el("circle", { cx: 0, cy: -35, r: 4, fill: "#d9992f", stroke: INK, "stroke-width": 1.4 }, g);
  teabagTags(g);
}
function drawTinBlack(g) {
  tinBody(g, "#7a5a3a", "#5a4026");
  el("path", { d: "M-8 -26 C -12 -40 0 -50 10 -46 C 12 -34 2 -24 -8 -26 Z", fill: "#7f9446", stroke: INK, "stroke-width": 1.8 }, g);
  el("path", { d: "M-8 -26 L 6 -42", stroke: INK, "stroke-width": 1.6, fill: "none" }, g);
  teabagTags(g);
}
function drawTinCocoa(g) {
  tinBody(g, "#6a4a2e", "#4b331f");
  el("ellipse", { cx: -4, cy: -40, rx: 9, ry: 6, fill: "#8b5a34", stroke: INK, "stroke-width": 1.8, transform: "rotate(-30 -4 -40)" }, g);
  el("ellipse", { cx: 7, cy: -30, rx: 9, ry: 6, fill: "#8b5a34", stroke: INK, "stroke-width": 1.8, transform: "rotate(25 7 -30)" }, g);
}
function drawHoney(g) {
  ink(g, "M-26 0 C-34 -18 -34 -42 -24 -52 H24 C34 -42 34 -18 26 0 Z", "#d9992f");
  el("path", { d: "M-20 -42 C -22 -30 -22 -22 -19 -14", stroke: "#fff3c0", "stroke-width": 5, "stroke-linecap": "round", fill: "none", opacity: 0.7 }, g);
  el("rect", { class: "ink-thin", x: -28, y: -64, width: 56, height: 14, rx: 5, fill: "#f2e6c4" }, g);
  el("rect", { x: -16, y: -30, width: 32, height: 22, rx: 3, fill: "#f2e6c4", stroke: INK, "stroke-width": 2 }, g);
  el("path", { d: "M-8 -18 q 4 -8 8 0 q 4 8 8 0", stroke: "#a8744a", "stroke-width": 2.4, fill: "none", "stroke-linecap": "round" }, g);
}
function drawLemon(g) {
  el("ellipse", { class: "ink-thin", cx: 0, cy: -4, rx: 40, ry: 7, fill: "#efe3c4" }, g);
  ink(g, "M-28 -10 A28 28 0 0 1 28 -10 Z", "#e9cf5a");
  el("path", { d: "M-20 -12 A20 20 0 0 1 20 -12 Z", fill: "#f6e68e" }, g);
  el("path", { d: "M0 -12 V-32 M-14 -12 L-10 -29 M14 -12 L10 -29", stroke: "#e9cf5a", "stroke-width": 2, fill: "none" }, g);
}
function drawMint(g) {
  ink(g, "M-28 0 C-32 -14 -22 -22 0 -22 C 22 -22 32 -14 28 0 Z", "#efe3c4");
  [[-12, -30, -50], [0, -38, 0], [12, -30, 50], [-4, -26, -20], [8, -26, 25]].forEach(function (l) {
    el("ellipse", { cx: l[0], cy: l[1] - 8, rx: 7, ry: 13, fill: "#6f8f3c", stroke: INK, "stroke-width": 2, transform: "rotate(" + l[2] + " " + l[0] + " " + (l[1] + 4) + ")" }, g);
  });
}
function drawSugar(g) {
  ink(g, "M-30 0 C-34 -18 -26 -30 0 -30 C 26 -30 34 -18 30 0 Z", "#efe3c4");
  el("path", { d: "M-24 -14 H24", stroke: "#8a9450", "stroke-width": 5, "stroke-linecap": "round" }, g);
  [[-12, -34], [4, -36], [-2, -44], [14, -32]].forEach(function (c) { el("rect", { x: c[0], y: c[1], width: 13, height: 12, rx: 2, fill: "#fbf6e4", stroke: INK, "stroke-width": 2 }, g); });
}
function drawCream(g) {
  ink(g, "M-20 0 V-62 C -20 -74 -12 -78 -6 -84 H6 C12 -78 20 -74 20 -62 V0 Z", "#8a9450");
  el("rect", { x: -14, y: -50, width: 28, height: 28, rx: 3, fill: "#f2e6c4", stroke: INK, "stroke-width": 2 }, g);
  el("path", { d: "M-8 -34 q 4 -10 8 0 q 4 10 8 0", stroke: "#8a6a44", "stroke-width": 2.4, fill: "none", "stroke-linecap": "round" }, g);
  ink(g, "M-6 -84 L-4 -96 H4 L6 -84 Z", "#3a2416");
}
function drawCinnamon(g) {
  ink(g, "M-26 0 C-32 -18 -32 -42 -24 -52 H24 C32 -42 32 -18 26 0 Z", "#f4ecd4", { "fill-opacity": 0.55 });
  el("rect", { x: -16, y: -36, width: 10, height: 36, rx: 3, fill: "#a5602f", stroke: INK, "stroke-width": 1.8, transform: "rotate(-6 -11 -18)" }, g);
  el("rect", { x: 2, y: -40, width: 10, height: 40, rx: 3, fill: "#8a4a22", stroke: INK, "stroke-width": 1.8, transform: "rotate(8 7 -20)" }, g);
  el("rect", { x: -6, y: -34, width: 10, height: 34, rx: 3, fill: "#b9713a", stroke: INK, "stroke-width": 1.8 }, g);
  el("rect", { class: "ink-thin", x: -28, y: -64, width: 56, height: 14, rx: 5, fill: "#9a6a40" }, g);
}
function drawMarsh(g) {
  ink(g, "M-28 0 C-34 -18 -34 -44 -24 -54 H24 C34 -44 34 -18 28 0 Z", "#f4ecd4", { "fill-opacity": 0.55 });
  [[-12, -12, 0], [10, -14, 1], [0, -30, 0], [-14, -36, 1], [14, -36, 0]].forEach(function (m) {
    el("rect", { x: m[0] - 9, y: m[1] - 7, width: 18, height: 14, rx: 6, fill: m[2] ? "#e8d4b0" : "#fbf4de", stroke: INK, "stroke-width": 2 }, g);
  });
  el("rect", { class: "ink-thin", x: -26, y: -66, width: 52, height: 14, rx: 5, fill: "#9a6a40" }, g);
}
function drawSpoon(g) {
  // stands up: handle on top, bowl at the bottom
  el("path", { class: "ink-thin", d: "M-4 -118 C -6 -80 -5 -50 -4 -34 H 4 C 5 -50 6 -80 4 -118 Z", fill: "#b98a52" }, g);
  el("ellipse", { class: "ink-thin", cx: 0, cy: -16, rx: 13, ry: 19, fill: "#c99a62" }, g);
  el("path", { d: "M-6 -26 C -8 -18 -6 -12 -2 -8", stroke: "#e6c590", "stroke-width": 3, "stroke-linecap": "round", fill: "none" }, g);
}

const PROPS = {
  kettle:       { draw: drawKettle,       grip: [68, -42], tip: [-106, -80], tilt: 38,  size: [190, 120] },
  moka:         { draw: drawMoka,         grip: [44, -70], tip: [-42, -100], tilt: 40,  size: [120, 140] },
  jug:          { draw: drawJug,          grip: [46, -40], tip: [-42, -82],  tilt: 42,  size: [120, 100] },
  tinChamomile: { draw: drawTinChamomile, grip: [0, -36],  tip: [-26, -76],  tilt: 0,   size: [80, 130], pinch: [0, -104] },
  tinBlack:     { draw: drawTinBlack,     grip: [0, -36],  tip: [-26, -76],  tilt: 0,   size: [80, 130], pinch: [0, -104] },
  tinCocoa:     { draw: drawTinCocoa,     grip: [0, -34],  tip: [-27, -76],  tilt: 75,  size: [70, 90] },
  honey:        { draw: drawHoney,        grip: [0, -30],  tip: [-24, -62],  tilt: 62,  size: [70, 80] },
  lemon:        { draw: drawLemon,        grip: [0, -14],  tip: [0, -30],    tilt: 0,   size: [90, 50], pinch: [0, -26] },
  mint:         { draw: drawMint,         grip: [0, -20],  tip: [0, -40],    tilt: 0,   size: [80, 70], pinch: [0, -44] },
  sugar:        { draw: drawSugar,        grip: [0, -20],  tip: [0, -40],    tilt: 0,   size: [80, 60], pinch: [0, -44] },
  cream:        { draw: drawCream,        grip: [0, -44],  tip: [0, -98],    tilt: 180, size: [50, 110] },
  cinnamon:     { draw: drawCinnamon,     grip: [0, -30],  tip: [-24, -64],  tilt: 70,  size: [70, 80] },
  marsh:        { draw: drawMarsh,        grip: [0, -34],  tip: [-24, -66],  tilt: 62,  size: [70, 90] },
  spoon:        { draw: drawSpoon,        grip: [0, -92],  tip: [0, -14],    tilt: 0,   size: [40, 130] }
};

const MUG = { x: 800, y: 636, k: 1.55 };
function mugW(lx, ly) { return { x: MUG.x + MUG.k * (lx - 450), y: MUG.y + MUG.k * (ly - 594) }; }

const propsG = document.getElementById("kprops");
const halosG = document.getElementById("khalos");
const fxG = document.getElementById("kfx");
const handG = document.getElementById("khand");
const handFG = document.getElementById("khandF");
const fingersG = document.getElementById("kfingers");
const frontG = document.getElementById("kfront");
const streamP = document.getElementById("kstream");
const liquid = document.getElementById("kliquid");
const powder = document.getElementById("kpowder");
const swirl = document.getElementById("kswirl");
const bagG = document.getElementById("kbag");
const kTop = document.getElementById("ktop");
const kSteam = document.getElementById("ksteam");
const kMug = document.getElementById("kmug");
const kettleSteam = document.getElementById("ksteamK");

/* ---------- placing a prop ---------- */
const instances = {};   // id -> prop currently on the counter
// m = +1: opening points left (props right of the mug). m = -1: flipped, so it points right, toward the mug.
function makeProp(id, slotX, m) {
  const def = PROPS[id];
  const outer = el("g", { class: "kprop" }, propsG);
  const pop = el("g", { class: "kpop" }, outer);
  const inner = el("g", { transform: "scale(" + m + ",1) translate(" + (-def.grip[0]) + "," + (-def.grip[1]) + ")", filter: "url(#wobble)" }, pop);
  def.draw(inner);
  el("rect", { x: -def.size[0] / 2, y: -def.size[1], width: def.size[0], height: def.size[1], fill: "#000", "fill-opacity": 0, transform: "translate(" + (-m * def.grip[0]) + "," + (-def.grip[1]) + ")" }, outer);
  const p = { id: id, def: def, m: m, slotX: slotX, outer: outer, rest: { x: slotX + m * def.grip[0], y: 636 + def.grip[1], rot: 0 }, pose: null };
  setPose(p, p.rest);
  return p;
}
function setPose(p, pose) {
  p.pose = { x: pose.x, y: pose.y, rot: pose.rot };
  p.outer.setAttribute("transform", "translate(" + pose.x.toFixed(1) + " " + pose.y.toFixed(1) + ") rotate(" + pose.rot.toFixed(1) + ")");
}
// where the pour spout is in the picture, for a given pose
function tipWorld(p, pose) {
  const v = rotv(p.m * (p.def.tip[0] - p.def.grip[0]), p.def.tip[1] - p.def.grip[1], pose.rot);
  return { x: pose.x + v.x, y: pose.y + v.y };
}
// the pose that puts the spout exactly at (tx, ty) when tilted by rot
function poseForTip(p, rot, tx, ty) {
  const v = rotv(p.m * (p.def.tip[0] - p.def.grip[0]), p.def.tip[1] - p.def.grip[1], rot);
  return { x: tx - v.x, y: ty - v.y, rot: rot };
}

/* ---------- the hand ---------- */
const hand = { x: 0, y: 0, rot: 0, dir: -16, carry: null };
const armG = document.getElementById("karm");
function renderHand() {
  handG.setAttribute("transform", "translate(" + hand.x.toFixed(1) + " " + hand.y.toFixed(1) + ")");
  handFG.setAttribute("transform", "translate(" + hand.x.toFixed(1) + " " + hand.y.toFixed(1) + ")");
  const r = "rotate(" + (hand.dir + hand.rot * 0.3).toFixed(1) + ")";
  armG.setAttribute("transform", "rotate(" + hand.dir + ")");
  fingersG.setAttribute("transform", r);
  frontG.setAttribute("transform", r);
  if (hand.carry) hand.carry(hand);
}
function placeHand(x, y, rot) { hand.x = x; hand.y = y; hand.rot = rot || 0; renderHand(); }
function showHand(on) { handG.setAttribute("opacity", on ? 1 : 0); handFG.setAttribute("opacity", on ? 1 : 0); }
function moveHand(to, ms) {
  const from = { x: hand.x, y: hand.y, rot: hand.rot };
  return tween(ms, function (t) {
    hand.x = lerp(from.x, to.x, t); hand.y = lerp(from.y, to.y, t);
    hand.rot = lerp(from.rot, to.rot === undefined ? from.rot : to.rot, t);
    renderHand();
  });
}
// a floating arc (up and over) from where the hand is to a target
function arcHand(to, ms, lift) {
  const from = { x: hand.x, y: hand.y, rot: hand.rot };
  return tween(ms, function (t) {
    hand.x = lerp(from.x, to.x, t);
    hand.y = lerp(from.y, to.y, t) - (lift || 60) * Math.sin(Math.PI * t);
    hand.rot = lerp(from.rot, to.rot === undefined ? from.rot : to.rot, t);
    renderHand();
  });
}
async function handEnter(toX, toY, rot, fromLeft) {
  SFX.whoosh(1300);
  hand.dir = fromLeft ? 16 : -16;
  placeHand(toX + (fromLeft ? -300 : 300), 1060, rot || 0);
  showHand(true);
  await moveHand({ x: toX, y: toY, rot: rot || 0 }, 1300);
}
async function handLeave() {
  SFX.whoosh(1100);
  hand.carry = null;
  await moveHand({ x: hand.x + (hand.dir > 0 ? -260 : 260), y: 1060, rot: 0 }, 1100);
  showHand(false);
}

/* ---------- the mug ---------- */
const mug = { level: 0, color: "#d9c9a2" };
function setLevel(L) {
  mug.level = L;
  liquid.setAttribute("cy", (540 - 19 * L).toFixed(2));
  liquid.setAttribute("opacity", L > 0.02 ? 1 : 0);
}
function setColor(c, secs) {
  mug.color = c;
  liquid.style.transition = "fill " + (secs || 0.9) + "s ease";
  liquid.setAttribute("fill", c);
}
function resetMug() {
  setLevel(0); setColor("#d9c9a2", 0.1);
  powder.setAttribute("opacity", 0);
  bagG.setAttribute("opacity", 0);
  swirl.setAttribute("opacity", 0);
  kTop.innerHTML = "";
  kSteam.classList.remove("on");
  streamP.setAttribute("opacity", 0);
  fxG.innerHTML = "";
}
function liquidY() { return mugW(450, 540 - 19 * Math.max(mug.level, 0.08)).y; }

/* ---------- pouring and falling things ---------- */
async function pourStream(tip, color, toLevel, ms, width) {
  streamP.setAttribute("stroke", color);
  streamP.setAttribute("stroke-width", width || 8);
  streamP.setAttribute("opacity", 1);
  const l0 = mug.level;
  const x = tip.x;
  // the stream grows down from the spout
  await tween(450, function (t) {
    streamP.setAttribute("d", "M" + x + " " + tip.y + " L" + x + " " + (tip.y + (liquidY() - tip.y) * t));
  });
  const snd = SFX.pour();
  await tween(ms, function (t) {
    setLevel(lerp(l0, toLevel, t));
    snd.level(mug.level);
    streamP.setAttribute("d", "M" + x + " " + tip.y + " L" + x + " " + (liquidY() + 2));
  }, linear);
  snd.stop();
  // the stream thins away from the spout
  await tween(350, function (t) {
    streamP.setAttribute("d", "M" + x + " " + (tip.y + (liquidY() - tip.y) * t) + " L" + x + " " + liquidY());
  });
  streamP.setAttribute("opacity", 0);
}
// little bits that fall from a point into the mug
function fall(from, to, ms, drawFn, delay, done) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      const g = el("g", {}, fxG);
      drawFn(g);
      tween(ms, function (t) {
        g.setAttribute("transform", "translate(" + lerp(from.x, to.x, t).toFixed(1) + " " + lerp(from.y, to.y, t * t).toFixed(1) + ") rotate(" + (t * 160).toFixed(0) + ")");
        g.setAttribute("opacity", t > 0.9 ? 1 - (t - 0.9) * 10 : 1);
      }, linear).then(function () { g.remove(); if (done) done(); resolve(); });
    }, delay);
  });
}
function ripple(pt) {
  SFX.plop();
  const r = el("ellipse", { cx: pt.x, cy: pt.y, rx: 4, ry: 1.5, fill: "none", stroke: "#fff", "stroke-width": 2, opacity: 0.8 }, fxG);
  tween(900, function (t) { r.setAttribute("rx", 4 + 34 * t); r.setAttribute("ry", 1.5 + 8 * t); r.setAttribute("opacity", 0.8 * (1 - t)); }, linear).then(function () { r.remove(); });
}
function dust(tip, color, n, over) {
  SFX.sprinkle(over + 700);
  const jobs = [];
  for (let i = 0; i < n; i++) {
    const to = { x: 800 + (Math.random() - 0.5) * 90, y: 505 + Math.random() * 12 };
    jobs.push(fall({ x: tip.x + (Math.random() - 0.5) * 8, y: tip.y }, to, 700 + Math.random() * 200, function (g) { el("circle", { r: 2.6 + Math.random() * 1.6, fill: color }, g); }, i * (over / n)));
  }
  return Promise.all(jobs);
}

/* ---------- the toppings that settle on the drink ---------- */
let popIndex = 0;
function drawTopping(id, only) {
  const add = function (tag, a) {
    const n = el(tag, a, kTop); n.setAttribute("class", "ktop-pop");
    n.style.animationDelay = (popIndex++ * 0.18).toFixed(2) + "s"; return n;
  };
  popIndex = 0;
  if (id === "mint") {
    [[432, 523, -20], [452, 520, 15], [470, 524, 40]].forEach(function (l) {
      add("ellipse", { cx: l[0], cy: l[1], rx: 9, ry: 4.4, fill: "#5f8a3c", stroke: INK, "stroke-width": 1.8, transform: "rotate(" + l[2] + " " + l[0] + " " + l[1] + ")" });
    });
  } else if (id === "lemon") {
    add("ellipse", { cx: 455, cy: 520, rx: 22, ry: 7, fill: "#e9cf5a", stroke: INK, "stroke-width": 2 });
    add("ellipse", { cx: 455, cy: 520, rx: 17, ry: 4.6, fill: "#f6e68e" });
    add("path", { d: "M455 515.5 V524.5 M441 520 H469 M445 517 L465 523 M445 523 L465 517", stroke: "#e9cf5a", "stroke-width": 1.6, fill: "none" });
  } else if (id === "foam") {
    add("ellipse", { cx: 450, cy: 521, rx: 46, ry: 8, fill: "#f2e3c6" });
  } else if (id === "latte") {
    add("ellipse", { cx: 450, cy: 522, rx: 42, ry: 7.4, fill: "#f2e3c6" });
    add("path", { d: "M450 528 C 436 520 438 514 444 514 C 448 514 450 517 450 518 C 450 517 452 514 456 514 C 462 514 464 520 450 528 Z", fill: "#8a5a36" });
  } else if (id === "dust") {
    for (let i = 0; i < 16; i++) add("circle", { cx: 418 + (i * 37 % 64), cy: 517 + (i * 13 % 9), r: 1.7, fill: "#6a3a22" });
  } else if (id === "marsh") {
    const spots = [[428, 520, 0], [450, 517, 1], [472, 521, 0], [440, 526, 1], [462, 526, 0]];
    spots.forEach(function (m, i) {
      if (only !== undefined && only !== i) return;
      const n = add("rect", { x: m[0] - 9, y: m[1] - 7, width: 18, height: 14, rx: 6, fill: m[2] ? "#e8d4b0" : "#fbf4de", stroke: INK, "stroke-width": 2 });
      n.style.animationDelay = "0s";
    });
  } else if (id === "cream") {
    [[450, 524, 34, 8], [450, 513, 24, 7], [450, 503, 14, 6]].forEach(function (l, i) {
      const n = add("ellipse", { cx: l[0], cy: l[1], rx: l[2], ry: l[3], fill: "#fbf4de", stroke: INK, "stroke-width": 2 });
      n.style.animationDelay = (i * 0.6).toFixed(2) + "s";
    });
    const tip = add("path", { d: "M446 498 C 448 488 452 488 454 498 Z", fill: "#fbf4de", stroke: INK, "stroke-width": 2 });
    tip.style.animationDelay = "1.9s";
  } else if (id === "cinnamon") {
    for (let i = 0; i < 12; i++) add("circle", { cx: 420 + (i * 41 % 62), cy: 518 + (i * 17 % 9), r: 1.7, fill: "#b9713a" });
    add("rect", { x: 456, y: 484, width: 10, height: 52, rx: 4, fill: "#a5602f", stroke: INK, "stroke-width": 2.2, transform: "rotate(18 461 510)" });
  }
}

/* =========================================================
   The recipes: what the user does, step by step
   ========================================================= */
const RECIPES = {
  chamomile: { drink: "tea", label: "Chamomile", slots: { L1: "tinChamomile" },
    steps: [
      { id: "bag", prop: "tinChamomile", text: "Take a tea bag from the tin and drop it in your mug.", hint: "Tap the glowing tea tin" },
      { id: "water", prop: "kettle", text: "Now pour in the hot water, nice and slow.", hint: "Tap the glowing kettle", color: "#efe3b8" },
      { id: "steep", text: "Let it steep and soak up all the warmth…", color: "#d8a63e" }],
    end: "Chamomile for you, {name}. Soft, golden and calm. Breathe in the steam." },
  mint: { drink: "tea", label: "Fresh mint", slots: { L1: "mint" },
    steps: [
      { id: "water", prop: "kettle", text: "Start with the hot water. Pour it in slowly.", hint: "Tap the glowing kettle", color: "#eee9c2" },
      { id: "mint", prop: "mint", text: "Pick a few fresh mint leaves and drop them in.", hint: "Tap the mint" },
      { id: "steep", text: "Let the mint rest and share its flavor…", color: "#b7c46a" }],
    end: "Fresh mint tea, {name}. A little green and a lot of peace." },
  lemon: { drink: "tea", label: "Lemon & honey", slots: { L1: "tinBlack", L2: "lemon", R2: "honey" },
    steps: [
      { id: "bag", prop: "tinBlack", text: "Take a tea bag from the tin and drop it in your mug.", hint: "Tap the glowing tea tin" },
      { id: "water", prop: "kettle", text: "Pour in the hot water, slowly.", hint: "Tap the glowing kettle", color: "#ecd9a0" },
      { id: "steep", text: "Let the tea steep for a moment…", color: "#bf7a22" },
      { id: "lemon", prop: "lemon", text: "Add a slice of lemon.", hint: "Tap the lemon" },
      { id: "honey", prop: "honey", text: "And a little drizzle of honey.", hint: "Tap the honey jar", color: "#c98a24" }],
    end: "Lemon and honey, {name}. Sunshine in a cup." },
  latte: { drink: "coffee", label: "Latte", slots: { R2: "moka", L1: "jug" },
    steps: [
      { id: "moka", prop: "moka", text: "Pour the fresh coffee from the moka pot.", hint: "Tap the glowing coffee pot" },
      { id: "milk", prop: "jug", text: "Add warm milk. Take your time.", hint: "Tap the glowing milk jug", color: "#c9a074", top: "latte" }],
    end: "A latte with a little heart on top, {name}." },
  cappuccino: { drink: "coffee", label: "Cappuccino", slots: { R2: "moka", L1: "jug", L2: "tinCocoa" },
    steps: [
      { id: "moka", prop: "moka", text: "Pour the fresh coffee from the moka pot.", hint: "Tap the glowing coffee pot" },
      { id: "milk", prop: "jug", text: "Pour in the frothy milk.", hint: "Tap the glowing milk jug", color: "#b98557", top: "foam" },
      { id: "dust", prop: "tinCocoa", text: "Dust a little cocoa on top.", hint: "Tap the cocoa tin", dustColor: "#6a3a22" }],
    end: "A cappuccino with a cloud of foam. Sip slowly, {name}." },
  black: { drink: "coffee", label: "Black coffee", slots: { R2: "moka", L1: "sugar" },
    steps: [
      { id: "moka", prop: "moka", text: "Pour the fresh coffee from the moka pot.", hint: "Tap the glowing coffee pot", full: true },
      { id: "cube", prop: "sugar", text: "Drop in one sugar cube.", hint: "Tap the sugar bowl" },
      { id: "stir", prop: "spoon", text: "Give it a slow stir.", hint: "Tap the wooden spoon" }],
    end: "Strong and simple, {name}. Just the way granny makes it." },
  marshmallow: { drink: "cocoa", label: "Marshmallows", slots: { L1: "tinCocoa", L2: "jug", R2: "marsh" },
    steps: [
      { id: "powder", prop: "tinCocoa", text: "Sprinkle in the cocoa powder.", hint: "Tap the cocoa tin", dustColor: "#6a4228" },
      { id: "milk", prop: "jug", text: "Pour in the hot milk, slowly.", hint: "Tap the glowing milk jug", color: "#9a6a44" },
      { id: "stir", prop: "spoon", text: "Stir it until it's smooth and chocolatey.", hint: "Tap the wooden spoon", color: "#6a3a22" },
      { id: "marsh", prop: "marsh", text: "Add the marshmallows. As many as you like.", hint: "Tap the marshmallow jar" }],
    end: "Hot chocolate with marshmallows, {name}. Absolutely the best idea." },
  cream: { drink: "cocoa", label: "Whipped cream", slots: { L1: "tinCocoa", L2: "jug", R2: "cream" },
    steps: [
      { id: "powder", prop: "tinCocoa", text: "Sprinkle in the cocoa powder.", hint: "Tap the cocoa tin", dustColor: "#6a4228" },
      { id: "milk", prop: "jug", text: "Pour in the hot milk, slowly.", hint: "Tap the glowing milk jug", color: "#9a6a44" },
      { id: "stir", prop: "spoon", text: "Stir it until it's smooth and chocolatey.", hint: "Tap the wooden spoon", color: "#6a3a22" },
      { id: "cream", prop: "cream", text: "Finish with a swirl of whipped cream.", hint: "Tap the cream can" }],
    end: "Hot chocolate with a swirl of cream, {name}. Treat yourself." },
  cinnamon: { drink: "cocoa", label: "Cinnamon", slots: { L1: "tinCocoa", L2: "jug", R2: "cinnamon" },
    steps: [
      { id: "powder", prop: "tinCocoa", text: "Sprinkle in the cocoa powder.", hint: "Tap the cocoa tin", dustColor: "#6a4228" },
      { id: "milk", prop: "jug", text: "Pour in the hot milk, slowly.", hint: "Tap the glowing milk jug", color: "#9a6a44" },
      { id: "stir", prop: "spoon", text: "Stir it until it's smooth and chocolatey.", hint: "Tap the wooden spoon", color: "#6a3a22" },
      { id: "cinnamon", prop: "cinnamon", text: "Shake a little cinnamon on top.", hint: "Tap the cinnamon jar" }],
    end: "Spiced hot chocolate, {name}. Warm and cozy all the way through." }
};
const DRINKS = {
  tea: ["chamomile", "mint", "lemon"],
  coffee: ["latte", "cappuccino", "black"],
  cocoa: ["marshmallow", "cream", "cinnamon"]
};
const SLOT_X = { L1: 520, L2: 600, R2: 1262 };
const SLOT_M = { L1: -1, L2: -1, R2: 1 };

/* =========================================================
   What the hand does for each kind of step
   ========================================================= */
const HOVER_Y = 432;     // how high the spout is held above the mug
const POUR_Y = 462;

// pick up a pouring thing, carry it over the mug, tilt, let pourFn run, tilt back, put it down
async function pourAction(p, pourFn) {
  const rest = p.rest;
  if (p.id === "kettle") kettleSteam.style.display = "none";
  await handEnter(rest.x, rest.y, 0, p.slotX < 800);
  await sleep(350);
  SFX.tap();
  hand.carry = function (h) { setPose(p, { x: h.x, y: h.y, rot: h.rot }); };
  const rotEnd = p.def.tilt === 180 ? 180 : -p.def.tilt * p.m;
  const tx = 800 + p.m * 24;
  await arcHand(poseForTip(p, 0, tx, HOVER_Y), 1500, 70);
  const tiltPose = poseForTip(p, rotEnd, tx, POUR_Y);
  await moveHand(tiltPose, 1100);
  await sleep(250);
  await pourFn(tipWorld(p, tiltPose), tiltPose);
  await sleep(250);
  await moveHand(poseForTip(p, 0, tx, HOVER_Y), 900);
  await arcHand({ x: rest.x, y: rest.y, rot: 0 }, 1400, 50);
  hand.carry = null;
  setPose(p, rest);
  SFX.tap();
  await handLeave();
  if (p.id === "kettle") kettleSteam.style.display = "";
}

// pinch a small thing, carry it over the mug and let it go
async function pinchAction(p, drawItem, landLocal, onLand) {
  const start = { x: p.rest.x + p.m * (p.def.pinch[0] - p.def.grip[0]), y: 636 + p.def.pinch[1] };
  const PIN = { dx: -3, dy: -34 };            // where the item sits compared to the hand
  await handEnter(start.x - PIN.dx, start.y - PIN.dy, 0, p.slotX < 800);
  await sleep(350);
  SFX.tap();
  const item = el("g", {}, fxG);
  drawItem(el("g", { filter: "url(#wobble)" }, item));
  hand.carry = function (h) { item.setAttribute("transform", "translate(" + (h.x + PIN.dx).toFixed(1) + " " + (h.y + PIN.dy).toFixed(1) + ")"); };
  renderHand();
  await arcHand({ x: 790 - PIN.dx, y: 438 - PIN.dy, rot: 0 }, 1700, 90);
  await sleep(300);
  hand.carry = null;
  const land = mugW(landLocal[0], landLocal[1]);
  // the item drops from the fingers
  await tween(650, function (t) {
    item.setAttribute("transform", "translate(" + lerp(790, land.x, t).toFixed(1) + " " + lerp(438, land.y, t * t).toFixed(1) + ")");
  }, linear);
  item.remove();
  onLand(land);
  await sleep(450);
  await handLeave();
}

// pick up the spoon, stir slowly, put it back
async function stirAction(p, finalColor) {
  const rest = p.rest;
  await handEnter(rest.x, rest.y, rest.rot, true);
  await sleep(350);
  hand.carry = function (h) { setPose(p, { x: h.x, y: h.y, rot: h.rot }); };
  const spoonRot = 8;
  const v = rotv(0, 76, spoonRot);                      // from the grip down to the bowl of the spoon
  const atMug = { x: 800 - v.x, y: 528 - v.y, rot: spoonRot };
  await arcHand({ x: atMug.x, y: atMug.y - 50, rot: spoonRot }, 1600, 60);
  await moveHand(atMug, 700);
  swirl.setAttribute("opacity", 1);
  SFX.stir(3600);
  if (finalColor) setColor(finalColor, 3.4);
  const turns = 3;
  await tween(3600, function (t) {
    const a = t * Math.PI * 2 * turns;
    hand.x = atMug.x + Math.cos(a) * 16; hand.y = atMug.y + Math.sin(a) * 4;
    hand.rot = spoonRot + Math.sin(a) * 2;
    swirl.setAttribute("transform", "rotate(" + (t * 360 * turns).toFixed(0) + " 450 521)");
    renderHand();
  }, linear);
  await tween(500, function (t) { swirl.setAttribute("opacity", 1 - t); }, linear);
  await arcHand({ x: rest.x, y: rest.y, rot: rest.rot }, 1500, 50);
  hand.carry = null;
  setPose(p, rest);
  await handLeave();
}

/* =========================================================
   The card at the bottom and the flow of the page
   ========================================================= */
const kTitle = document.getElementById("k-title");
const kHint = document.getElementById("k-hint");
const kDots = document.getElementById("k-dots");
const kDrinks = document.getElementById("k-drinks");
const kExtras = document.getElementById("k-extras");
const kEnd = document.getElementById("k-end");
const kNext = document.getElementById("k-next");
const kAgain = document.getElementById("k-again");

let recipe = null, stepNo = 0, busy = false, kStage = "mugs";

function clearProps() {
  propsG.innerHTML = ""; halosG.innerHTML = "";
  for (const k in instances) delete instances[k];
}
function putKettle() { instances.kettle = makeProp("kettle", 1085, 1); }

function setupRecipe(id) {
  recipe = RECIPES[id];
  stepNo = 0;
  clearProps();
  resetMug();
  putKettle();
  for (const slot in recipe.slots) instances[recipe.slots[slot]] = makeProp(recipe.slots[slot], SLOT_X[slot], SLOT_M[slot]);
  // the spoon waits on the doily
  if (recipe.steps.some(function (s) { return s.id === "stir"; })) {
    const sp = makeProp("spoon", 700, 1);
    sp.rest = { x: 704, y: 618, rot: -78 };
    setPose(sp, sp.rest);
    instances.spoon = sp;
  }
  for (const k in instances) instances[k].outer.firstChild.classList.add("kpop-in");
}

function renderStep() {
  const step = recipe.steps[stepNo];
  kStage = "step";
  kTitle.textContent = withName(t(step.text));
  kHint.hidden = !step.hint;
  kHint.textContent = step.hint ? t(step.hint) : "";
  kDots.hidden = false;
  kDots.innerHTML = "";
  recipe.steps.forEach(function (s, i) {
    const d = document.createElement("span");
    d.className = "k-dot" + (i < stepNo ? " done" : i === stepNo ? " now" : "");
    kDots.appendChild(d);
  });
  // glow the thing to use, and make only that one tappable
  halosG.innerHTML = "";
  for (const k in instances) instances[k].outer.classList.remove("active");
  if (step.prop) {
    const p = instances[step.prop];
    p.outer.classList.add("active");
    el("ellipse", { class: "khalo", cx: p.slotX, cy: 636 - p.def.size[1] / 2, rx: p.def.size[0] * 0.75, ry: p.def.size[1] * 0.62 }, halosG);
  } else {
    runStep(step);   // steps with nothing to tap (letting it steep) just happen
  }
}

propsG.addEventListener("click", function (e) {
  const g = e.target.closest(".kprop");
  if (!g || busy || !recipe || !g.classList.contains("active")) return;
  runStep(recipe.steps[stepNo]);
});

async function runStep(step) {
  if (busy) return;
  busy = true;
  halosG.innerHTML = "";
  for (const k in instances) instances[k].outer.classList.remove("active");
  kHint.hidden = true;
  const p = step.prop ? instances[step.prop] : null;

  if (step.id === "bag") {
    await pinchAction(p, function (g) {
      el("path", { d: "M0 -2 C -4 -14 -2 -20 -4 -26", stroke: INK, "stroke-width": 2.2, fill: "none", "stroke-linecap": "round" }, g);
      el("rect", { class: "ink-thin", x: -11, y: -2, width: 22, height: 26, rx: 3, fill: "#d9b982" }, g);
      el("path", { d: "M-6 8 H6 M-6 14 H6", stroke: "#a8744a", "stroke-width": 2, "stroke-linecap": "round" }, g);
    }, [452, 520], function (land) { bagG.setAttribute("opacity", 1); ripple(land); });
  } else if (step.id === "water") {
    await pourAction(p, async function (tip) {
      kSteam.classList.add("on");
      setColor(step.color, 0.4);
      await pourStream(tip, "#f1ecd4", 0.88, 2600, 9);
    });
  } else if (step.id === "steep") {
    kTitle.textContent = withName(t(step.text));
    kSteam.classList.add("on");
    setColor(step.color, 4);
    await sleep(4300);
  } else if (step.id === "mint") {
    await pinchAction(p, function (g) {
      [[-8, -6, -30], [6, -4, 30], [0, -16, 0]].forEach(function (l) { el("ellipse", { cx: l[0], cy: l[1], rx: 6, ry: 11, fill: "#6f8f3c", stroke: INK, "stroke-width": 2, transform: "rotate(" + l[2] + " " + l[0] + " " + l[1] + ")" }, g); });
    }, [452, 521], function (land) { ripple(land); drawTopping("mint"); });
  } else if (step.id === "lemon") {
    await pinchAction(p, function (g) {
      el("circle", { class: "ink-thin", r: 17, fill: "#e9cf5a" }, g);
      el("circle", { r: 12, fill: "#f6e68e" }, g);
      el("path", { d: "M0 -12 V12 M-12 0 H12 M-8 -8 L8 8 M-8 8 L8 -8", stroke: "#e9cf5a", "stroke-width": 1.8 }, g);
    }, [455, 520], function (land) { ripple(land); drawTopping("lemon"); });
  } else if (step.id === "cube") {
    await pinchAction(p, function (g) {
      el("rect", { class: "ink-thin", x: -9, y: -9, width: 18, height: 17, rx: 3, fill: "#fbf6e4" }, g);
    }, [452, 521], function (land) { ripple(land); });
  } else if (step.id === "moka") {
    await pourAction(p, async function (tip) {
      kSteam.classList.add("on");
      setColor("#3a2416", 0.4);
      await pourStream(tip, "#35200f", step.full ? 0.92 : 0.55, 2600, 8);
    });
  } else if (step.id === "milk" && recipe.drink === "coffee") {
    await pourAction(p, async function (tip) {
      await pourStream(tip, "#f6eed6", 0.98, 2600, 8);
      setColor(step.color, 1.6);
      await sleep(900);
      drawTopping(step.top);
      await sleep(900);
    });
  } else if (step.id === "milk") {    // hot milk for cocoa
    await pourAction(p, async function (tip) {
      setColor(step.color, 0.4);
      await pourStream(tip, "#f6eed6", 0.9, 2600, 8);
      powder.setAttribute("opacity", 0);
    });
  } else if (step.id === "powder") {
    await pourAction(p, async function (tip) {
      await dust(tip, step.dustColor, 22, 2000);
      powder.setAttribute("opacity", 1);
      await sleep(600);
    });
  } else if (step.id === "dust") {
    await pourAction(p, async function (tip) {
      await dust(tip, step.dustColor, 22, 2000);
      drawTopping("dust");
      await sleep(900);
    });
  } else if (step.id === "honey") {
    await pourAction(p, async function (tip) {
      await pourStream(tip, "#d9992f", mug.level + 0.03, 1800, 5);
      setColor(step.color, 1.6);
    });
  } else if (step.id === "stir") {
    await stirAction(p, step.color);
  } else if (step.id === "marsh") {
    await pourAction(p, async function (tip) {
      const spots = [[428, 520], [450, 517], [472, 521], [440, 526], [462, 526]];
      await Promise.all(spots.map(function (s, i) {
        return fall({ x: tip.x, y: tip.y }, mugW(s[0], s[1]), 800, function (g) {
          el("rect", { x: -9, y: -7, width: 18, height: 14, rx: 6, fill: i % 2 ? "#e8d4b0" : "#fbf4de", stroke: INK, "stroke-width": 2 }, g);
        }, i * 500, function () { drawTopping("marsh", i); });
      }));
      await sleep(500);
    });
  } else if (step.id === "cream") {
    await pourAction(p, async function () {
      drawTopping("cream");
      await sleep(2800);
    });
  } else if (step.id === "cinnamon") {
    await pourAction(p, async function (tip) {
      await dust(tip, "#b9713a", 20, 1800);
      drawTopping("cinnamon");
      await sleep(700);
    });
  }

  busy = false;
  stepNo++;
  if (stepNo < recipe.steps.length) renderStep(); else finish();
}

function finish() {
  SFX.chime();
  halosG.innerHTML = "";
  kHint.hidden = true;
  kDots.hidden = true;
  kStage = "end";
  kTitle.textContent = withName(t(recipe.end));
  kEnd.hidden = false;
  kSteam.classList.add("on");
  collectMug(chosenMug);
  kMug.classList.remove("sipped");
  void kMug.getBoundingClientRect();
  kMug.classList.add("sipped");
}

/* ---------- the mug shelf: choose a mug before making the drink ---------- */
const kMugs = document.getElementById("k-mugs");
const kMugBack = document.getElementById("kmugBack");
const kMugBody = document.getElementById("kmugBody");
const kMugFace = document.getElementById("kmugFace");
const kMugRim = document.getElementById("kmugRim");
const kMugClipPath = document.querySelector("#kmugClip path");
let chosenMug = "oat";

function applyMug(id) {
  const m = mugById(id);
  chosenMug = m.id;
  kMugBack.innerHTML = mugHandleSVG(m);
  kMugBody.innerHTML = '<path class="ink" d="' + BODY[m.body] + '" fill="' + m.color + '"/><g clip-path="url(#kmugClip)">' + mugDeco(m) + SPECKS + '</g>';
  kMugClipPath.setAttribute("d", BODY[m.body]);
  kMugRim.setAttribute("fill", mugRim(m));
  kMugFace.innerHTML = "";
  SFX.clink();
}

function showMugPicker() {
  kDrinks.hidden = true; kExtras.hidden = true; kEnd.hidden = true;
  kStage = "mugs";
  kTitle.textContent = withName(t("k.pickMug"));
  kMugs.innerHTML = "";
  let picked = null;
  const have = loadMugs();
  MUGS.forEach(function (m) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "k-mug"; b.title = t("mug." + m.id);
    b.setAttribute("aria-label", t("mug." + m.id));
    b.innerHTML = mugThumb(m) + (have.indexOf(m.id) !== -1 ? '<i class="k-star" aria-hidden="true"></i>' : "");
    b.addEventListener("click", function () {
      picked = m.id;
      kMugs.querySelectorAll(".k-mug").forEach(function (o) { o.classList.toggle("on", o === b); });
      applyMug(m.id);
      kTitle.textContent = t("mug." + m.id);
      go.disabled = false;
    });
    kMugs.appendChild(b);
  });
  const go = document.createElement("button");
  go.type = "button"; go.className = "k-next k-go"; go.textContent = t("k.thisOne"); go.disabled = true;
  go.addEventListener("click", function () {
    if (!picked) return;
    kMugs.hidden = true;
    kDrinks.hidden = false;
    kStage = "menu";
    kTitle.textContent = withName(t("k.welcome"));
  });
  kMugs.appendChild(go);
  kMugs.hidden = false;
}

function backToMenu() {
  recipe = null; busy = false;
  clearProps(); resetMug(); putKettle();
  showHand(false);
  kHint.hidden = true; kDots.hidden = true; kEnd.hidden = true;
  kExtras.hidden = true;
  kDrinks.querySelectorAll(".k-chip").forEach(function (b) { b.classList.remove("on"); });
  showMugPicker();
}

function openKitchen() {
  backToMenu();
  showStep("kitchen");
  if (window.PEHowTo) PEHowTo.auto("kitchen");
}

kDrinks.querySelectorAll(".k-chip").forEach(function (b) {
  b.addEventListener("click", function () {
    kDrinks.querySelectorAll(".k-chip").forEach(function (o) { o.classList.toggle("on", o === b); });
    kExtras.innerHTML = "";
    DRINKS[b.dataset.drink].forEach(function (rid) {
      const c = document.createElement("button");
      c.type = "button"; c.className = "k-chip"; c.textContent = t(RECIPES[rid].label); c.dataset.rid = rid;
      c.addEventListener("click", function () { startRecipe(rid); });
      kExtras.appendChild(c);
    });
    kExtras.hidden = false;
    kStage = "how";
    kTitle.textContent = withName(t("k.how"));
  });
});

function startRecipe(id) {
  kDrinks.hidden = true; kExtras.hidden = true;
  setupRecipe(id);
  renderStep();
}
kAgain.addEventListener("click", backToMenu);
kNext.addEventListener("click", function () { openNook(); });
applyMug("oat");

// for testing: open index.html#kitchen to jump straight here
if (location.hash === "#kitchen") openKitchen();

// when the language changes, say the current sentence again in the new language
function refreshKitchenText() {
  if (kStage === "mugs") { if (!kMugs.hidden) showMugPicker(); }
  else if (kStage === "menu") kTitle.textContent = withName(t("k.welcome"));
  else if (kStage === "how") { kTitle.textContent = withName(t("k.how")); kExtras.querySelectorAll(".k-chip").forEach(function (c) { c.textContent = t(RECIPES[c.dataset.rid].label); }); }
  else if (kStage === "step" && recipe) {
    const step = recipe.steps[stepNo];
    if (step) { kTitle.textContent = withName(t(step.text)); kHint.textContent = step.hint ? t(step.hint) : ""; }
  } else if (kStage === "end" && recipe) kTitle.textContent = withName(t(recipe.end));
}