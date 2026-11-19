// Hand-drawn autumn "stickers" (little cut-out collage pictures) used as decorations everywhere.
// Each one is drawn on a 100 x 100 canvas with a dark red-brown pencil outline, soft colors and hatching.
(function () {
  const INK = "#5a2a1c";
  // shared drawing tools (filters, hatch) live in a tiny always-visible svg so every page can use them
  const holder = document.createElement("div");
  holder.innerHTML =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<filter id="sticker" x="-25%" y="-25%" width="150%" height="150%"><feMorphology in="SourceAlpha" operator="dilate" radius="4" result="d"/><feFlood flood-color="#fff8e6"/><feComposite in2="d" operator="in" result="w"/><feGaussianBlur in="d" stdDeviation="2.5" result="b"/><feOffset in="b" dx="3" dy="4" result="o"/><feFlood flood-color="#2a1208" flood-opacity=".32"/><feComposite in2="o" operator="in" result="s"/><feMerge><feMergeNode in="s"/><feMergeNode in="w"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
    '<filter id="wobbleS" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.8"/></filter>' +
    '<filter id="wobbleM" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="6"/></filter>' +
    '<filter id="grainF" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="5" result="t"/><feColorMatrix in="t" type="matrix" values="0 0 0 0 .32  0 0 0 0 .18  0 0 0 0 .08  0 0 1.5 0 -.52"/></filter>' +
    '<pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><path d="M0 0 V9" stroke="#5a2a1c" stroke-width="1.7" opacity=".4"/></pattern>' +
    '<pattern id="hatchL" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><path d="M0 0 V14" stroke="#5a2a1c" stroke-width="1.5" opacity=".28"/></pattern>' +
    '</defs></svg>';
  document.body.insertBefore(holder.firstChild, document.body.firstChild);

  const o = function (d, f, w) { return '<path d="' + d + '" fill="' + f + '" stroke="' + INK + '" stroke-width="' + (w || 3) + '" stroke-linejoin="round" stroke-linecap="round"/>'; };
  const ln = function (d, c, w, op) { return '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + (w || 2.4) + '" stroke-linecap="round" stroke-linejoin="round"' + (op ? ' opacity="' + op + '"' : "") + '/>'; };
  const ci = function (x, y, r, f, w) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '" stroke="' + INK + '" stroke-width="' + (w || 3) + '"/>'; };
  const el = function (x, y, rx, ry, f, w, rot) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '" stroke="' + INK + '" stroke-width="' + (w || 3) + '"' + (rot ? ' transform="rotate(' + rot + ' ' + x + ' ' + y + ')"' : "") + '/>'; };
  const hatch = function (d) { return '<path d="' + d + '" fill="url(#hatch)"/>'; };

  const ART = {
    leaf: function (c1, c2) {
      c1 = c1 || "#c5472f"; c2 = c2 || "#f0a060";
      return o("M50 6 C 56 22 58 24 72 18 C 70 34 74 38 90 38 C 80 50 82 56 92 66 C 78 68 72 70 70 82 C 62 78 56 80 52 92 L 48 92 C 44 80 38 78 30 82 C 28 70 22 68 8 66 C 18 56 20 50 10 38 C 26 38 30 34 28 18 C 42 24 44 22 50 6 Z", c1) +
        ln("M50 94 V 28 M50 72 L 26 52 M50 72 L 74 52 M50 54 L 36 34 M50 54 L 64 34", c2, 2.6, 0.9) + hatch("M52 10 C 70 24 72 40 90 40 C 82 52 84 58 92 66 C 78 68 72 70 70 82 C 62 78 56 80 52 92 Z");
    },
    oak: function () {
      return o("M50 95 C 45 82 31 82 29 68 C 14 64 20 52 28 48 C 14 40 24 28 34 30 C 30 16 44 12 50 6 C 56 12 70 16 66 30 C 76 28 86 40 72 48 C 80 52 86 64 71 68 C 69 82 55 82 50 95 Z", "#d98a3a") +
        ln("M50 96 V 18 M50 76 L 34 62 M50 76 L 66 62 M50 56 L 32 44 M50 56 L 68 44 M50 38 L 40 26 M50 38 L 60 26", "#f3c27a", 2.4) + hatch("M50 10 C 56 14 70 18 66 30 C 76 28 86 40 72 48 C 80 52 86 64 71 68 C 69 82 55 82 50 95 Z");
    },
    acorn: function () {
      return o("M50 94 C 38 90 28 74 28 50 H 72 C 72 74 62 90 50 94 Z", "#d6954f") + ln("M34 62 C 36 76 42 84 48 90", "#f6cc92", 3, .8) + hatch("M52 50 H 72 C 72 74 62 90 52 93 Z") +
        o("M22 50 C 20 28 34 20 50 20 C 66 20 80 28 78 50 Z", "#8a5a30") + ln("M32 30 l10 10 M44 26 l12 12 M58 26 l10 10 M28 42 l8 8 M70 38 l-6 8", INK, 2, .6) + o("M47 20 C 47 12 50 8 56 6", "none", 4.5);
    },
    cup: function () {
      return ln("M38 24 C 30 14 44 10 36 0 M54 26 C 46 16 60 12 52 2", INK, 2.6, .55) + el(50, 82, 42, 9, "#f6e6c4", 3) + el(50, 82, 28, 5, "#e6cfa0", 2) +
        o("M20 42 H80 C 80 68 68 82 50 82 C 32 82 20 68 20 42 Z", "#fdf3dc") + ln("M24 54 H76", "#c0692f", 5, 1) + ln("M26 62 H74", "#d4a84a", 3) + ci(38, 50, 3, "#d97a7a", 1.5) + ci(62, 50, 3, "#d97a7a", 1.5) + hatch("M52 44 H80 C 80 68 68 82 52 82 Z") +
        o("M80 48 C 98 44 98 70 76 68", "none", 3.4) + el(50, 42, 30, 6, "#b87a3c", 3);
    },
    bear: function () {
      return ci(26, 22, 11, "#8a5a38") + ci(26, 22, 5, "#d6a47e", 1.5) + ci(74, 22, 11, "#8a5a38") + ci(74, 22, 5, "#d6a47e", 1.5) +
        el(50, 76, 26, 22, "#8a5a38") + el(32, 92, 12, 7, "#7a4a2c") + el(68, 92, 12, 7, "#7a4a2c") + el(50, 78, 15, 13, "#d6a47e", 2) +
        el(26, 68, 8, 15, "#8a5a38", 3, 25) + el(74, 68, 8, 15, "#8a5a38", 3, -25) +
        ci(50, 38, 25, "#8a5a38") + el(50, 46, 12, 9, "#d6a47e", 2.4) + el(50, 42, 4.5, 3.2, INK, 1) + ln("M50 45 V 50 M44 52 q6 5 12 0", INK, 2) + ci(41, 34, 2.8, INK, 0.5) + ci(59, 34, 2.8, INK, 0.5) +
        '<path d="M42 62 L 50 68 L 58 62 L 58 70 L 50 66 L 42 70 Z" fill="#c5472f" stroke="' + INK + '" stroke-width="2"/>' + hatch("M52 16 C 70 20 76 40 70 58 C 74 72 74 90 62 96 H 52 Z");
    },
    cat: function () {
      return o("M86 68 C 100 60 98 40 88 38", "none", 6) + ln("M86 68 C 100 60 98 40 88 38", "#e0932f", 3) + el(52, 68, 38, 24, "#e0932f") + hatch("M52 46 C 80 46 90 58 90 70 C 88 88 70 92 52 92 Z") +
        ln("M34 50 q-4 10 0 18 M46 46 q-4 12 0 22 M58 46 q-4 12 0 22 M70 50 q-4 10 0 18", "#a85a1c", 3.4, .85) + el(30, 80, 20, 12, "#fff3dd", 2.6) +
        '<path d="M14 54 L 14 32 L 28 42 C 34 40 42 40 48 42 L 62 32 L 62 54 C 62 70 52 76 38 76 C 24 76 14 70 14 54 Z" fill="#e0932f" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
        ln("M20 38 L 24 44 M56 38 L 52 44", "#f3a8a8", 3, .8) + ln("M26 58 q5 4 10 0 M42 58 q5 4 10 0", INK, 2.6) + '<path d="M36 64 l3 3 l3 -3 z" fill="#e9808a" stroke="' + INK + '" stroke-width="1.6"/>' + ln("M24 62 l-10 -2 M24 66 l-10 2 M52 62 l10 -2 M52 66 l10 2", INK, 1.6, .7);
    },
    mushroom: function () {
      return o("M36 56 C 34 76 34 86 30 92 H 70 C 66 86 66 76 64 56 Z", "#fbf0d4") + hatch("M52 56 H64 C 66 76 66 86 70 92 H52 Z") +
        o("M8 56 C 8 28 28 10 50 10 C 72 10 92 28 92 56 C 70 62 30 62 8 56 Z", "#c5472f") + ci(30, 34, 6, "#fff3dd", 2) + ci(56, 24, 7, "#fff3dd", 2) + ci(74, 42, 5.5, "#fff3dd", 2) + ci(46, 46, 4, "#fff3dd", 1.6) + hatch("M50 10 C 72 10 92 28 92 56 C 80 59 66 61 50 61 Z");
    },
    pie: function () {
      return el(50, 74, 46, 16, "#d8c8a2", 3) + el(50, 62, 42, 26, "#e0a458") + el(50, 60, 34, 19, "#f0c77a", 2.4) +
        ln("M26 52 L 74 70 M38 46 L 82 62 M20 62 L 56 76 M62 44 L 30 70 M74 52 L 44 74 M52 42 L 22 56", "#a3632c", 3.4) + ln("M18 64 q4 -6 8 0 M80 64 q-4 -6 -8 0", INK, 2, .5) +
        ln("M34 26 C 28 18 40 14 34 6 M54 28 C 48 20 60 16 54 8", INK, 2.6, .5) + hatch("M50 36 C 76 36 92 46 92 62 C 92 78 70 88 50 88 Z");
    },
    suitcases: function () {
      return o("M8 72 H92 V94 H8 Z", "#b5683f") + ln("M22 72 V94 M78 72 V94", "#6a3a1c", 4) + o("M44 66 H56 V72 H44 Z", "#d4a84a", 2) + o("M16 46 H84 V72 H16 Z", "#4f8a82") + ln("M30 46 V72 M70 46 V72", "#2f5a5a", 4) + o("M44 40 H56 V46 H44 Z", "#d4a84a", 2) +
        o("M26 22 H74 V46 H26 Z", "#e2b55a") + ln("M38 22 V46 M62 22 V46", "#a8802a", 4) + o("M40 14 H60 V22 H40 Z", "none", 3) + o("M45 38 h10 v6 h-10 z", "#8a5a30", 2) + hatch("M60 22 H74 V46 H60 Z");
    },
    tv: function () {
      return ln("M34 24 L 24 6 M62 24 L 76 6", INK, 3.2) + o("M10 24 H90 V84 H10 Z", "#b5683f") + o("M16 30 H66 V78 H16 Z", "#cdd9c4") + ln("M24 40 q12 -6 24 0 M24 50 l10 -6", "#fff", 3, .8) + hatch("M40 30 H66 V78 H40 Z") +
        ci(78, 40, 6, "#efe3c4", 2.4) + ci(78, 60, 6, "#efe3c4", 2.4) + ln("M72 72 H84", INK, 2.4) + o("M20 84 L 16 96 M80 84 L 84 96", "none", 4);
    },
    postcard: function () {
      return '<g transform="rotate(-5 50 50)">' + o("M8 22 H92 V78 H8 Z", "#f6ead0") + o("M66 28 H86 V48 H66 Z", "#d98a3a", 2.4) + ln("M70 40 l5 -8 l5 8 z", "#fbf0d4", 2) + ln("M14 36 H56 M14 46 H52 M14 56 H58 M14 66 H44", INK, 2.2, .6) + ci(78, 64, 5, "#d97a7a", 1.8) + o("M30 14 H58 V26 H30 Z", "#e2b55a", 1.8) + "</g>";
    },
    applePrint: function () {
      return o("M10 10 H90 V90 H10 Z", "#e7d3a3") + o("M18 18 H82 V82 H18 Z", "#f6ead0", 2.2) + o("M50 36 C 30 26 20 50 32 68 C 40 80 46 76 50 76 C 54 76 60 80 68 68 C 80 50 70 26 50 36 Z", "#c5472f") + ln("M50 36 C 50 28 54 24 60 22", INK, 3.4) + o("M54 30 C 62 22 72 26 70 34 C 62 36 56 34 54 30 Z", "#7f9a4c", 2.4) + ln("M36 48 q-3 8 0 14", "#f3a58a", 3, .8) + hatch("M52 38 C 70 28 82 52 68 68 C 60 80 54 76 52 76 Z");
    },
    yarn: function () {
      return ln("M30 8 L 62 56 M70 8 L 40 52", INK, 5) + ln("M30 8 L 62 56 M70 8 L 40 52", "#e2b55a", 2) + '<path d="M12 52 H88 L 80 92 H20 Z" fill="#d6a05a" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' + ln("M16 62 H84 M18 72 H82 M20 82 H80 M30 52 L 32 92 M46 52 V92 M62 52 L 60 92 M76 52 L 72 92", "#9a6a30", 2.4) +
        ci(36, 48, 17, "#c5472f") + ln("M24 40 C 34 34 44 38 50 48 M22 50 C 32 44 42 48 48 58 M30 34 C 40 44 40 54 34 62", "#f19a8a", 2.4) + ci(66, 52, 14, "#4f8a82") + ln("M56 46 C 64 42 72 46 76 54 M56 56 C 64 52 72 56 74 62", "#9cd0c4", 2.4);
    },
    pumpkin: function () {
      return o("M50 30 C 14 22 6 60 14 76 C 22 92 40 92 50 90 C 60 92 78 92 86 76 C 94 60 86 22 50 30 Z", "#e0792a") + ln("M50 32 C 36 44 36 76 50 90 M50 32 C 64 44 64 76 50 90 M32 34 C 20 50 22 74 32 86 M68 34 C 80 50 78 74 68 86", "#a8481c", 2.6) + hatch("M52 32 C 80 26 92 60 84 76 C 78 90 62 92 52 90 Z") +
        o("M46 30 C 46 20 50 14 56 10 L 60 14 C 56 20 56 26 56 30 Z", "#6a8a3a") + ln("M60 20 C 70 16 76 22 74 28", "#6a8a3a", 3);
    },
    sunflower: function () {
      let p = "";
      for (let i = 0; i < 12; i++) p += el(50, 20, 8, 17, "#f0c23a", 2.6, 0).replace('/>', ' transform="rotate(' + (i * 30) + ' 50 50)"/>');
      return p + ci(50, 50, 18, "#6a3a1c") + '<circle cx="50" cy="50" r="12" fill="url(#hatch)"/>' + ln("M44 44 l3 3 M54 44 l-3 3 M50 54 l3 3 M44 55 l3 -2", "#d4a84a", 2.4);
    },
    moon: function () {
      return ci(50, 50, 44, "#2e3a5e") + ci(50, 50, 36, "none", 2) + '<path d="M58 26 A 24 24 0 1 0 74 62 A 19 19 0 1 1 58 26 Z" fill="#f6dd8a" stroke="' + INK + '" stroke-width="2.6"/>' +
        '<path d="M28 30 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="#f6dd8a"/><path d="M76 28 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" fill="#f6dd8a"/>' + ci(76, 74, 2.6, "#f6dd8a", 0.4);
    },
    books: function () {
      return o("M8 70 H92 V92 H8 Z", "#7a2f33") + ln("M14 76 H86 M14 86 H86", "#e2b55a", 2.2) + o("M16 46 H88 V70 H16 Z", "#2f5a5a") + ln("M22 52 H82", "#e2b55a", 2.2) + ci(52, 60, 3, "#e2b55a", 1) + o("M24 24 H84 V46 H24 Z", "#d4a84a") + ln("M30 30 H78", INK, 2, .5) + o("M70 24 V 12 L 76 18 L 82 12 V 24", "#c5472f", 2.2) + hatch("M60 24 H84 V46 H60 Z");
    },
    butterfly: function () {
      return o("M50 50 C 30 10 6 18 12 44 C 14 56 34 60 50 52 Z", "#e0793a") + o("M50 50 C 70 10 94 18 88 44 C 86 56 66 60 50 52 Z", "#e0793a") + o("M50 54 C 32 58 20 76 32 86 C 42 92 50 74 50 54 Z", "#f0b050") + o("M50 54 C 68 58 80 76 68 86 C 58 92 50 74 50 54 Z", "#f0b050") +
        ci(26, 36, 4.5, "#fff3dd", 1.8) + ci(74, 36, 4.5, "#fff3dd", 1.8) + o("M47 34 H53 V76 H47 Z", "#3a2416", 1.5) + ln("M48 34 C 44 22 38 18 34 18 M52 34 C 56 22 62 18 66 18", INK, 2.2);
    }
  };

  const STK = {
    names: Object.keys(ART),
    art: function (name, a, b) { return ART[name](a, b); },
    // markup for use inside another <svg>: the sticker's centre sits at x,y and it is "size" units wide
    g: function (name, x, y, size, rot, a, b) {
      const k = size / 100;
      return '<g transform="translate(' + x + " " + y + ") rotate(" + (rot || 0) + ") scale(" + k + ') translate(-50 -50)"><g filter="url(#sticker)">' + ART[name](a, b) + "</g></g>";
    },
    // a stand-alone <svg> element (for HTML pages)
    svg: function (name, a, b) {
      return '<svg class="stk" viewBox="-10 -10 120 120" aria-hidden="true"><g filter="url(#sticker)">' + ART[name](a, b) + "</g></svg>";
    },
    ink: INK, o: o, ln: ln, ci: ci, el: el, hatch: hatch
  };
  window.STK = STK;

  // sticker decorations in the corners of the plain pages (name, mood, pick, order...)
  const SETS = [
    [["leaf", "#c5472f", "left:1.5%;top:4%;--s:1;--r:-18deg"], ["acorn", 0, "left:8%;top:17%;--s:.7;--r:14deg"], ["cup", 0, "right:2%;top:5%;--s:1.1;--r:8deg"], ["pumpkin", 0, "left:2%;bottom:4%;--s:1.1;--r:-8deg"], ["cat", 0, "right:2.5%;bottom:4%;--s:1.25;--r:6deg"], ["mushroom", 0, "right:11%;bottom:3%;--s:.7;--r:-10deg"], ["oak", 0, "right:9%;top:22%;--s:.7;--r:22deg"]],
    [["bear", 0, "left:2%;bottom:4%;--s:1.2;--r:-6deg"], ["leaf", "#d98a3a", "left:3%;top:5%;--s:.9;--r:20deg"], ["postcard", 0, "right:2%;top:6%;--s:1.2;--r:6deg"], ["pie", 0, "right:3%;bottom:4%;--s:1.2;--r:-6deg"], ["acorn", 0, "left:10%;top:20%;--s:.65;--r:-14deg"], ["butterfly", 0, "right:12%;top:26%;--s:.7;--r:12deg"], ["sunflower", 0, "left:11%;bottom:3%;--s:.8;--r:10deg"]],
    [["suitcases", 0, "left:2%;bottom:3%;--s:1.2;--r:-4deg"], ["cup", 0, "left:3%;top:5%;--s:1;--r:-10deg"], ["tv", 0, "right:2%;top:5%;--s:1.1;--r:5deg"], ["yarn", 0, "right:3%;bottom:3%;--s:1.1;--r:-5deg"], ["leaf", "#e2b55a", "right:11%;top:24%;--s:.75;--r:-16deg"], ["oak", 0, "left:10%;top:22%;--s:.7;--r:16deg"], ["mushroom", 0, "left:12%;bottom:3%;--s:.65;--r:8deg"]]
  ];
  document.querySelectorAll(".page:not(.kitchen-page)").forEach(function (pg, i) {
    if (i % 2) return;   // only some pages get decorations, and only two stickers each
    const layer = document.createElement("div");
    layer.className = "stk-layer";
    layer.setAttribute("aria-hidden", "true");
    SETS[(i / 2) % SETS.length | 0].filter(function (_, k) { return k === 2 || k === 3; }).forEach(function (s) {
      const d = document.createElement("div");
      d.className = "stk-wrap"; d.style.cssText = s[2];
      d.innerHTML = STK.svg(s[0], s[1] || undefined);
      layer.appendChild(d);
    });
    pg.insertBefore(layer, pg.firstChild);
  });
})();