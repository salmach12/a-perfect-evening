// Draws the repetitive little things so we don't type them by hand:
// stars in the window, string-light bulbs, books on the shelves, and the patchwork quilt.

const NS = "http://www.w3.org/2000/svg";

// A tiny "random" that gives the SAME result every time the page loads
// (Math.random would change the shelves on every refresh).
let seed = 11;
function rand() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}
function pick(list) {
  return list[Math.floor(rand() * list.length)];
}

// Small helper: make an SVG shape with attributes.
function shape(type, attrs, parent) {
  const el = document.createElementNS(NS, type);
  for (const key in attrs) el.setAttribute(key, attrs[key]);
  parent.appendChild(el);
  return el;
}

/* ---------- the title sign drawn like a vintage rug (olive middle, flowery border) ---------- */
function drawRug(g) {
  const INK = "#2b1a12";
  const st = { stroke: INK, "stroke-width": 3.2, "stroke-linejoin": "round", "stroke-linecap": "round", "vector-effect": "non-scaling-stroke" };
  const add = (type, a) => shape(type, Object.assign({}, st, a), g);

  // fringe at the top and bottom
  for (let x = 24; x <= 376; x += 9) {
    add("path", { d: "M" + x + " 14 q 1 -9 -1 -12", fill: "none", stroke: "#e6d6b0", "stroke-width": 2.4 });
    add("path", { d: "M" + x + " 326 q 1 9 -1 12", fill: "none", stroke: "#e6d6b0", "stroke-width": 2.4 });
  }

  // the rug: dusty-rose border
  add("rect", { x: 6, y: 12, width: 388, height: 316, rx: 12, fill: "#8a3a3a" });
  // olive velvet middle
  add("rect", { x: 40, y: 46, width: 320, height: 248, rx: 8, fill: "#d9b98a" });

  // mottled old-velvet patches in the middle (clipped by being small and inside)
  const tones = ["#c49a68", "#e6c9a0", "#b88a58"];
  for (let i = 0; i < 26; i++) {
    shape("ellipse", {
      cx: (70 + rand() * 260).toFixed(0), cy: (70 + rand() * 200).toFixed(0),
      rx: (12 + rand() * 26).toFixed(0), ry: (6 + rand() * 12).toFixed(0),
      fill: pick(tones), opacity: (0.16 + rand() * 0.18).toFixed(2)
    }, g);
  }

  // cream stitch line inside the middle
  shape("rect", { x: 48, y: 54, width: 304, height: 232, rx: 6, fill: "none", stroke: "#7a5636", "stroke-width": 2, "stroke-dasharray": "7 6", opacity: 0.75, "vector-effect": "non-scaling-stroke" }, g);
  // thin ink line between border and middle already drawn; add a tan inner line on the border
  shape("rect", { x: 14, y: 20, width: 372, height: 300, rx: 9, fill: "none", stroke: "#e6d6b0", "stroke-width": 2, opacity: 0.8, "vector-effect": "non-scaling-stroke" }, g);

  // border decorations: little flowers and leaves going around
  function flower(cx, cy, r, petal, center) {
    for (let k = 0; k < 5; k++) {
      const a = (k * 72 - 90) * Math.PI / 180;
      add("circle", { cx: (cx + Math.cos(a) * r * 0.62).toFixed(1), cy: (cy + Math.sin(a) * r * 0.62).toFixed(1), r: (r * 0.46).toFixed(1), fill: petal, "stroke-width": 2.2 });
    }
    add("circle", { cx: cx, cy: cy, r: (r * 0.34).toFixed(1), fill: center, "stroke-width": 2.2 });
  }
  function leaf(cx, cy, rot) {
    add("path", { d: "M-9 0 Q 0 -7 9 0 Q 0 7 -9 0 Z", transform: "translate(" + cx + " " + cy + ") rotate(" + rot + ")", fill: "#a3432c", "stroke-width": 2.2 });
  }
  const topY = 29, botY = 311, leftX = 23, rightX = 377;
  for (let x = 62; x < 345; x += 42) {
    leaf(x - 14, topY, -10); flower(x, topY, 11, "#f0e6c8", "#d4a84a"); leaf(x + 14, topY, 10);
    leaf(x - 14, botY, 10);  flower(x, botY, 11, "#f0e6c8", "#d4a84a"); leaf(x + 14, botY, -10);
  }
  for (let y = 70; y < 275; y += 41) {
    leaf(leftX, y - 14, 80);  flower(leftX, y, 11, "#f0e6c8", "#d4a84a"); leaf(leftX, y + 14, 100);
    leaf(rightX, y - 14, 100); flower(rightX, y, 11, "#f0e6c8", "#d4a84a"); leaf(rightX, y + 14, 80);
  }
  // bigger corner flowers
  [[23, 29], [377, 29], [23, 311], [377, 311]].forEach(function (p) {
    flower(p[0], p[1], 17, "#d98a3a", "#7a2f33");
  });
}
document.querySelectorAll(".rug-art").forEach(drawRug);


/* ---------- drifting petals on the inner pages ---------- */
document.querySelectorAll(".page").forEach(function (page) {
  const box = document.createElement("div");
  box.className = "motes";
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("i");
    p.style.left = (rand() * 100).toFixed(0) + "%";
    p.style.animationDuration = (16 + rand() * 14).toFixed(1) + "s";
    p.style.animationDelay = "-" + (rand() * 24).toFixed(1) + "s";
    box.appendChild(p);
  }
  page.insertBefore(box, page.firstChild);
});