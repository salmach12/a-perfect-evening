// The reading room: a hand-drawn grandma's living room (floral wallpaper, lace curtains, portraits,
// a china cabinet, a big comfy sofa, a rug, and collage stickers). It fills the #read-svg picture.
(function () {
  const svg = document.getElementById("read-svg");
  if (!svg || !window.STK) return;
  const S = STK, INK = S.ink, o = S.o, ln = S.ln, ci = S.ci, el = S.el;
  const CREAM = "#fbf0d4", SKIN = "#f0c9a0";

  function plate(cx, cy, r, c1, c2) {
    let p = ci(cx, cy, r, CREAM, 3) + '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.76) + '" fill="none" stroke="' + c1 + '" stroke-width="2.6"/>';
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; p += ci((cx + Math.cos(a) * r * 0.46).toFixed(1), (cy + Math.sin(a) * r * 0.46).toFixed(1), r * 0.15, c2, 1.6); }
    return p + ci(cx, cy, r * 0.13, "#e2b55a", 1.6);
  }
  function grandma() {
    return '<rect x="-50" y="-60" width="100" height="120" fill="#d9bf88"/>' +
      o("M-50 60 C -48 36 -26 28 0 28 C 26 28 48 36 50 60 Z", "#7a2f33") + ln("M-16 30 L 0 48 L 16 30", CREAM, 6) + ci(0, 49, 4.4, "#e2b55a", 1.8) +
      o("M-9 16 H9 V34 H-9 Z", SKIN, 2.4) + el(0, -12, 31, 31, "#ddd6c8", 3) + ci(0, -46, 15, "#ddd6c8", 3) + ln("M-8 -50 q8 -6 16 0 M-6 -42 q6 -4 12 0", "#a8a090", 2) +
      el(0, 2, 22, 26, SKIN, 3) + o("M-23 -4 C -20 -30 20 -30 23 -4 C 14 -20 -14 -20 -23 -4 Z", "#ddd6c8", 2.6) +
      ci(-10, 2, 8, "rgba(255,255,255,.28)", 2.2) + ci(10, 2, 8, "rgba(255,255,255,.28)", 2.2) + ln("M-2 1 H2", INK, 2) +
      ci(-10, 2, 1.8, INK, 0.5) + ci(10, 2, 1.8, INK, 0.5) + '<ellipse cx="-16" cy="13" rx="5" ry="3.4" fill="#f09a8a" opacity=".6"/><ellipse cx="16" cy="13" rx="5" ry="3.4" fill="#f09a8a" opacity=".6"/>' +
      ln("M-8 14 Q0 22 8 14", INK, 2.4) + ln("M0 6 q-3 5 0 7", INK, 1.8, 0.6);
  }
  function grandpa() {
    return '<rect x="-50" y="-60" width="100" height="120" fill="#bfcfb0"/>' +
      o("M-50 60 C -48 36 -26 28 0 28 C 26 28 48 36 50 60 Z", "#4a3a2c") + o("M-14 30 L 0 56 L 14 30 Z", CREAM, 2.4) + o("M-12 36 L 12 36 L 8 44 L -8 44 Z", "#c5472f", 2) +
      o("M-9 16 H9 V34 H-9 Z", "#e6b88e", 2.4) + el(0, 2, 22, 27, "#eec39a", 3) + ci(-25, -2, 8, "#f1ede6", 2.4) + ci(25, -2, 8, "#f1ede6", 2.4) + ln("M-14 -14 q14 -10 28 0", "#d8a87c", 2, .8) +
      ci(-10, 0, 8, "rgba(255,255,255,.25)", 2.2) + ci(10, 0, 8, "rgba(255,255,255,.25)", 2.2) + ln("M-2 -1 H2", INK, 2) + ci(-10, 0, 1.8, INK, 0.5) + ci(10, 0, 1.8, INK, 0.5) +
      '<ellipse cx="-16" cy="12" rx="5" ry="3.4" fill="#f09a8a" opacity=".55"/><ellipse cx="16" cy="12" rx="5" ry="3.4" fill="#f09a8a" opacity=".55"/>' +
      ln("M0 4 q-4 7 0 8", INK, 1.8, 0.7) + o("M-14 14 C -8 10 -2 14 0 14 C 2 14 8 10 14 14 C 8 20 -8 20 -14 14 Z", "#f1ede6", 2) + ln("M-6 22 Q0 26 6 22", INK, 2.2);
  }
  function landscape() {
    return '<rect x="-50" y="-34" width="100" height="68" fill="#f3d9a0"/>' + ci(22, -12, 10, "#f0a050", 1.8) + o("M-50 34 V 6 C -30 -8 -14 0 0 10 C 16 -4 34 -6 50 8 V 34 Z", "#8a9a4c", 2.4) + o("M-50 34 V 20 C -30 12 -10 22 10 20 C 30 18 40 22 50 20 V 34 Z", "#c0692f", 2.4) +
      o("M-30 8 V -10 M-30 -6 C -42 -8 -42 -24 -30 -26 C -18 -24 -18 -8 -30 -6 Z", "#b5683f", 2) + ln("M-30 -6 V 12", INK, 3);
  }
  function framed(x, y, w, h, art, shape) {
    if (shape === "oval") {
      return '<g transform="translate(' + x + " " + y + ')">' + el(0, 0, w / 2 + 9, h / 2 + 9, "#c58a3a", 4) + el(0, 0, w / 2 + 2, h / 2 + 2, "#e8c070", 2.4) +
        '<clipPath id="cp' + x + '"><ellipse cx="0" cy="0" rx="' + (w / 2) + '" ry="' + (h / 2) + '"/></clipPath><g clip-path="url(#cp' + x + ')" transform="scale(' + (w / 100).toFixed(2) + " " + (h / 120).toFixed(2) + ')">' + art + "</g>" + el(0, 0, w / 2, h / 2, "none", 2.4) + "</g>";
    }
    return '<g transform="translate(' + x + " " + y + ')"><rect x="' + (-w / 2 - 9) + '" y="' + (-h / 2 - 9) + '" width="' + (w + 18) + '" height="' + (h + 18) + '" rx="6" fill="#8a5230" stroke="' + INK + '" stroke-width="4"/><rect x="' + (-w / 2 - 3) + '" y="' + (-h / 2 - 3) + '" width="' + (w + 6) + '" height="' + (h + 6) + '" fill="#c58a3a" stroke="' + INK + '" stroke-width="2"/>' +
      '<clipPath id="cq' + x + '"><rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '"/></clipPath><g clip-path="url(#cq' + x + ')" transform="scale(' + (w / 100).toFixed(2) + " " + (h / 120).toFixed(2) + ')">' + art + "</g></g>";
  }
  function pillow(x, y, s, rot, fill, kind) {
    let d = '<g transform="translate(' + x + " " + y + ") rotate(" + rot + ')">' + o("M" + (-s) + " " + (-s * .85) + " Q 0 " + (-s * 1.0) + " " + s + " " + (-s * .85) + " Q " + (s * 1.05) + " 0 " + s + " " + (s * .85) + " Q 0 " + (s * 1.0) + " " + (-s) + " " + (s * .85) + " Q " + (-s * 1.05) + " 0 " + (-s) + " " + (-s * .85) + " Z", fill, 3.6);
    if (kind === "plaid") d += ln("M" + (-s * .5) + " " + (-s * .8) + " V " + (s * .8) + " M" + (s * .5) + " " + (-s * .8) + " V " + (s * .8) + " M" + (-s * .9) + " " + (-s * .3) + " H " + (s * .9) + " M" + (-s * .9) + " " + (s * .3) + " H " + (s * .9), "#efe3c4", 3, .85);
    if (kind === "flower") { for (let i = 0; i < 5; i++) { const a = i * 1.2566; d += ci((Math.cos(a) * s * .26).toFixed(1), (Math.sin(a) * s * .26).toFixed(1), s * .15, "#f3c6a0", 2); } d += ci(0, 0, s * .12, "#e2b55a", 1.8); }
    if (kind === "crochet") { for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) d += ci((-s * .6 + c * s * .4).toFixed(1), (-s * .45 + r * s * .45).toFixed(1), s * .1, "none", 2.2); }
    return d + "</g>";
  }

  let m = "";
  m += "<defs>" +
    '<pattern id="gwall" width="130" height="130" patternUnits="userSpaceOnUse"><rect width="130" height="130" fill="#dcbd8b"/><rect width="130" height="130" fill="url(#hatchL)" opacity=".5"/>' +
      '<g stroke="#5a2a1c" stroke-width="2" stroke-linejoin="round"><g transform="translate(32 34)"><ellipse cx="0" cy="-10" rx="6" ry="9" fill="#b5603a"/><ellipse cx="9" cy="-3" rx="6" ry="9" fill="#b5603a" transform="rotate(70 9 -3)"/><ellipse cx="-9" cy="-3" rx="6" ry="9" fill="#b5603a" transform="rotate(-70 -9 -3)"/><ellipse cx="5" cy="9" rx="6" ry="9" fill="#b5603a" transform="rotate(145 5 9)"/><ellipse cx="-5" cy="9" rx="6" ry="9" fill="#b5603a" transform="rotate(-145 -5 9)"/><circle r="5" fill="#e2b55a"/></g>' +
      '<g transform="translate(96 98) scale(.8)"><ellipse cx="0" cy="-10" rx="6" ry="9" fill="#a3432c"/><ellipse cx="9" cy="-3" rx="6" ry="9" fill="#a3432c" transform="rotate(70 9 -3)"/><ellipse cx="-9" cy="-3" rx="6" ry="9" fill="#a3432c" transform="rotate(-70 -9 -3)"/><ellipse cx="5" cy="9" rx="6" ry="9" fill="#a3432c" transform="rotate(145 5 9)"/><ellipse cx="-5" cy="9" rx="6" ry="9" fill="#a3432c" transform="rotate(-145 -5 9)"/><circle r="5" fill="#e2b55a"/></g>' +
      '<path d="M62 62 q10 -14 22 -8 q-6 14 -22 8 Z M96 28 q10 -12 20 -4 q-6 12 -20 4 Z M8 92 q10 -12 20 -4 q-6 12 -20 4 Z M44 110 q12 -8 20 2 q-10 10 -20 -2 Z" fill="#7f8a4c"/></g></pattern>' +
    '<pattern id="gplank" width="240" height="64" patternUnits="userSpaceOnUse"><rect width="240" height="64" fill="#9a6a3c"/><path d="M0 63 H240 M110 0 V63" stroke="#5a2a1c" stroke-width="3" opacity=".7"/><path d="M14 20 q40 -8 84 0 M130 44 q40 -8 90 0" stroke="#b98250" stroke-width="3" fill="none" opacity=".8"/></pattern>' +
    '<pattern id="rplaid" width="48" height="48" patternUnits="userSpaceOnUse"><rect width="48" height="48" fill="#a3432c"/><rect x="0" y="10" width="48" height="10" fill="#efe3c4" opacity=".75"/><rect x="10" y="0" width="10" height="48" fill="#efe3c4" opacity=".75"/><rect x="0" y="32" width="48" height="4" fill="#d4a84a"/><rect x="32" y="0" width="4" height="48" fill="#d4a84a"/><rect x="0" y="22" width="48" height="2" fill="#3a2416" opacity=".6"/><rect x="22" y="0" width="2" height="48" fill="#3a2416" opacity=".6"/></pattern>' +
    '<pattern id="glace" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fbf3de"/><circle cx="4" cy="4" r="2.2" fill="#e6d8b4"/><circle cx="12" cy="12" r="2.2" fill="#e6d8b4"/></pattern>' +
    '<radialGradient id="rglowG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffc766" stop-opacity=".8"/><stop offset=".45" stop-color="#ff9d3f" stop-opacity=".3"/><stop offset="1" stop-color="#ff9d3f" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="rvig" cx="50%" cy="46%" r="75%"><stop offset=".6" stop-color="#1a0d08" stop-opacity="0"/><stop offset="1" stop-color="#1a0d08" stop-opacity=".55"/></radialGradient>' +
    '<radialGradient id="rEdge" cx="50%" cy="45%" r="70%"><stop offset=".45" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>' +
    '<mask id="rEdgeM"><rect x="-300" y="-300" width="2200" height="1500" fill="url(#rEdge)"/></mask>' +
    "</defs>";
  m += '<rect x="-400" y="-400" width="2400" height="1700" fill="url(#gwall)"/>';
  m += '<g filter="url(#wobbleM)">';
  // wainscot and floor
  m += '<rect x="-30" y="560" width="1660" height="360" fill="url(#gplank)" stroke="' + INK + '" stroke-width="5"/>';
  m += '<rect x="-30" y="470" width="1660" height="96" fill="#7a4a2a" stroke="' + INK + '" stroke-width="5"/>' +
    '<g fill="none" stroke="' + INK + '" stroke-width="3.5" opacity=".7"><rect x="20" y="486" width="170" height="64" rx="10"/><rect x="200" y="486" width="110" height="64" rx="10"/><rect x="1290" y="486" width="110" height="64" rx="10"/><rect x="1410" y="486" width="170" height="64" rx="10"/></g>' +
    '<rect x="-30" y="454" width="1660" height="20" rx="8" fill="#e2b55a" stroke="' + INK + '" stroke-width="5"/><rect x="-30" y="548" width="1660" height="18" fill="#5a3220" stroke="' + INK + '" stroke-width="4"/>';
  // plates above the window
  [[110, 64, "#4f8a82", "#d97a7a"], [190, 78, "#c0692f", "#4f8a82"], [270, 64, "#7a2f33", "#e2b55a"]].forEach(function (p) { m += plate(p[0], p[1], 30, p[2], p[3]); });
  // window with a night sky and lace curtains
  m += '<path d="M76 340 V 220 A 94 94 0 0 1 264 220 V 340 Z" fill="#26325a" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
    ci(205, 212, 24, "#fff1c4", 3.5) + ci(215, 204, 20, "#26325a", 0) +
    '<g fill="#fff1c4"><path d="M120 190 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3Z"/><path d="M158 250 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2Z"/><path d="M232 280 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2Z"/></g>' +
    '<path d="M170 126 V 340 M76 232 H 264" stroke="#efe3c4" stroke-width="7" opacity=".85"/>' +
    '<rect x="26" y="116" width="288" height="12" rx="6" fill="#c58a3a" stroke="' + INK + '" stroke-width="4"/>' + ci(26, 122, 9, "#e2b55a", 3) + ci(314, 122, 9, "#e2b55a", 3) +
    '<rect x="60" y="336" width="220" height="16" rx="8" fill="#efe3c4" stroke="' + INK + '" stroke-width="4.5"/>' +
    o("M36 130 H 112 C 104 190 104 270 118 346 q-12 10 -24 0 q-12 10 -24 0 q-12 10 -24 0 Z", "url(#glace)", 4) +
    o("M304 130 H 228 C 236 190 236 270 222 346 q12 10 24 0 q12 10 24 0 q12 10 24 0 Z", "url(#glace)", 4) +
    ln("M104 230 q-10 6 -14 18 M236 230 q10 6 14 18", "#a3432c", 7) +
    o("M118 352 H 222 L 214 336 H 126 Z", "#c0692f", 3) + ci(150, 326, 10, "#7f9a4c", 2.4) + ci(172, 318, 11, "#7f9a4c", 2.4) + ci(194, 326, 10, "#7f9a4c", 2.4) + ci(164, 312, 5, "#e0507a", 1.6) + ci(186, 310, 5, "#e0507a", 1.6);
  // right wall: portraits, an embroidery hoop and a little painting
  m += framed(1385, 124, 92, 112, grandma(), "oval") + framed(1520, 126, 86, 106, grandpa()) + framed(1522, 262, 100, 56, landscape());
  m += '<g transform="translate(1394 262)">' + ci(0, 0, 50, "#c58a3a", 4) + ci(0, 0, 42, "#fbf0d4", 2.4) + '<text x="0" y="-8" text-anchor="middle" font-family="Caveat Brush, cursive" font-size="22" fill="#a3432c">Home</text><text x="0" y="12" text-anchor="middle" font-family="Caveat Brush, cursive" font-size="19" fill="#4f8a82">sweet</text><text x="0" y="31" text-anchor="middle" font-family="Caveat Brush, cursive" font-size="22" fill="#a3432c">Home</text>' + ln("M-30 -26 q30 -14 60 0", "#7f9a4c", 2.4, .9) + ci(-32, -24, 3.4, "#d97a7a", 1) + ci(32, -24, 3.4, "#d97a7a", 1) + "</g>";
  // the bookcase
  m += '<path d="M300 96 Q 800 24 1300 96 V 126 H 300 Z" fill="#7a4a2a" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/><path d="M320 110 Q 800 52 1280 110" fill="none" stroke="#e2b55a" stroke-width="6"/>' +
    '<rect x="320" y="96" width="960" height="624" rx="14" fill="#7a4a2a" stroke="' + INK + '" stroke-width="7"/><rect x="340" y="120" width="920" height="580" rx="6" fill="#3a2218"/>' +
    '<path d="M340 310 H1260 M340 500 H1260" stroke="#9a6a3c" stroke-width="16"/><path d="M340 310 H1260 M340 500 H1260" stroke="' + INK + '" stroke-width="3" opacity=".6"/>' +
    '<rect x="320" y="704" width="960" height="24" rx="8" fill="#9a6a3c" stroke="' + INK + '" stroke-width="5"/>';
  // china cabinet (right)
  m += '<g transform="translate(1326 334)">' +
    '<rect x="-10" y="-8" width="262" height="26" rx="8" fill="#7a4a2a" stroke="' + INK + '" stroke-width="5"/>' +
    '<rect x="0" y="14" width="242" height="236" fill="#8a5230" stroke="' + INK + '" stroke-width="5"/><rect x="12" y="26" width="218" height="212" fill="#3a2218" stroke="' + INK + '" stroke-width="3"/>' +
    '<path d="M12 100 H230 M12 172 H230" stroke="#b98250" stroke-width="10"/><path d="M12 100 H230 M12 172 H230" stroke="' + INK + '" stroke-width="2.4" opacity=".6"/>' +
    plate(52, 64, 30, "#4f8a82", "#d97a7a") + plate(120, 64, 30, "#c0692f", "#4f8a82") + plate(188, 64, 30, "#7a2f33", "#e2b55a") +
    o("M32 168 H72 L 68 140 H36 Z", CREAM, 2.6) + o("M72 150 q 12 0 10 10 q -2 8 -10 6", "none", 2.6) + o("M92 168 H132 L 128 140 H96 Z", "#f3c6a0", 2.6) + o("M132 150 q 12 0 10 10 q -2 8 -10 6", "none", 2.6) +
    o("M150 168 H212 V 150 C 212 138 196 132 181 132 C 166 132 150 138 150 150 Z", "#4f8a82", 3) + ln("M212 146 q 18 -2 16 14", INK, 3) + o("M170 132 q 11 -10 22 0", "none", 3) + 
    o("M26 240 H 70 L 70 210 H 26 Z", "#e2b55a", 2.6) + o("M96 240 H 150 V 190 H 96 Z", "#c0692f", 2.6) + o("M170 240 H 214 V 204 H 170 Z", "#7f9a4c", 2.6) +
    '<path d="M121 26 V 238" stroke="' + INK + '" stroke-width="4"/>' +
    '<rect x="0" y="250" width="242" height="200" fill="#7a4a2a" stroke="' + INK + '" stroke-width="5"/><rect x="14" y="264" width="102" height="172" rx="6" fill="#8a5230" stroke="' + INK + '" stroke-width="3"/><rect x="126" y="264" width="102" height="172" rx="6" fill="#8a5230" stroke="' + INK + '" stroke-width="3"/>' + ci(102, 350, 6, "#e2b55a", 2.4) + ci(140, 350, 6, "#e2b55a", 2.4) +
    '<rect x="6" y="450" width="26" height="30" fill="#5a3220" stroke="' + INK + '" stroke-width="4"/><rect x="210" y="450" width="26" height="30" fill="#5a3220" stroke="' + INK + '" stroke-width="4"/>' +
    '<path d="M-6 -8 Q 30 -26 60 -8 Q 90 -26 121 -8 Q 150 -26 182 -8 Q 212 -26 248 -8" fill="#fbf0d4" stroke="' + INK + '" stroke-width="3.5"/></g>';
  // rug
  m += '<ellipse cx="800" cy="852" rx="700" ry="70" fill="#8a2f33" stroke="' + INK + '" stroke-width="6"/><ellipse cx="800" cy="852" rx="630" ry="58" fill="none" stroke="#e2b55a" stroke-width="5"/>' +
    '<ellipse cx="800" cy="852" rx="540" ry="46" fill="#6e2328" stroke="' + INK + '" stroke-width="3"/><ellipse cx="800" cy="852" rx="430" ry="34" fill="none" stroke="#e2b55a" stroke-width="10" stroke-dasharray="18 24" stroke-linecap="round"/>' +
    '<ellipse cx="800" cy="852" rx="300" ry="22" fill="none" stroke="#4f8a82" stroke-width="8" stroke-dasharray="10 16" stroke-linecap="round"/>' +
    '<g stroke="#efe3c4" stroke-width="4" stroke-linecap="round" opacity=".85"><path d="M104 826 l-26 -2 M102 846 l-28 0 M104 866 l-26 2 M1496 826 l26 -2 M1498 846 l28 0 M1496 866 l26 2"/></g>';
  // floor lamp (left)
  m += '<path d="M80 500 V 836" stroke="' + INK + '" stroke-width="14" stroke-linecap="round"/><path d="M80 500 V 836" stroke="#e2b55a" stroke-width="6" stroke-linecap="round"/>' +
    '<ellipse cx="80" cy="840" rx="50" ry="12" fill="#e2b55a" stroke="' + INK + '" stroke-width="5"/>' + o("M26 500 L 48 408 H 112 L 134 500 Z", "#ffe3a0", 5) +
    '<path d="M30 500 v 14 m 16 -14 v 18 m 16 -18 v 14 m 16 -14 v 18 m 16 -18 v 14" stroke="#e2b55a" stroke-width="3.5" stroke-linecap="round"/>';
  // round table for the candle
  m += '<ellipse cx="205" cy="650" rx="76" ry="15" fill="#8a5230" stroke="' + INK + '" stroke-width="5"/><ellipse cx="205" cy="650" rx="56" ry="9" fill="#fbf0d4" stroke="' + INK + '" stroke-width="2.4"/>' +
    '<path d="M205 664 V 812 M205 812 L 150 840 M205 812 L 260 840" stroke="' + INK + '" stroke-width="13" stroke-linecap="round"/><path d="M205 664 V 812 M205 812 L 150 840 M205 812 L 260 840" stroke="#8a5230" stroke-width="6" stroke-linecap="round"/>';
  m += "</g>";   // end of the wobbly background group
  m += '<g id="rLights"></g>';
  m += '<g id="rBooks"></g>';
  // the sofa sits in front of the bottom shelf
  m += '<g filter="url(#wobbleM)">' +
    '<ellipse cx="800" cy="812" rx="400" ry="22" fill="#3a2416" opacity=".3"/>' +
    '<rect x="486" y="566" width="628" height="150" rx="64" fill="#a3432c" stroke="' + INK + '" stroke-width="6"/>' +
    '<g fill="#7a2f33" stroke="' + INK + '" stroke-width="2.6">' + [560, 640, 720, 800, 880, 960, 1040].map(function (x) { return '<circle cx="' + x + '" cy="610" r="7"/>'; }).join("") + [600, 680, 760, 840, 920, 1000].map(function (x) { return '<circle cx="' + x + '" cy="656" r="7"/>'; }).join("") + "</g>" +
    '<path d="M520 584 L 600 650 M600 584 L 680 650 M680 584 L 760 650 M760 584 L 840 650 M840 584 L 920 650 M920 584 L 1000 650 M1000 584 L 1080 650" stroke="#7a2f33" stroke-width="3" opacity=".55"/>' +
    '<rect x="456" y="620" width="104" height="176" rx="48" fill="#b5463a" stroke="' + INK + '" stroke-width="6"/><rect x="1040" y="620" width="104" height="176" rx="48" fill="#b5463a" stroke="' + INK + '" stroke-width="6"/>' +
    '<rect x="520" y="706" width="285" height="84" rx="30" fill="#c0523c" stroke="' + INK + '" stroke-width="6"/><rect x="796" y="706" width="285" height="84" rx="30" fill="#c0523c" stroke="' + INK + '" stroke-width="6"/>' +
    '<path d="M540 726 H 785 M816 726 H 1061" stroke="#e2b55a" stroke-width="3" stroke-dasharray="8 8" stroke-linecap="round" opacity=".8"/>' +
    '<path d="M470 794 h 20 M520 794 h 20 M1060 794 h 20 M1110 794 h 20" stroke="#e2b55a" stroke-width="4" stroke-linecap="round"/>' +
    '<rect x="486" y="780" width="22" height="26" fill="#5a3220" stroke="' + INK + '" stroke-width="4"/><rect x="1092" y="780" width="22" height="26" fill="#5a3220" stroke="' + INK + '" stroke-width="4"/>' +
    pillow(570, 676, 52, -8, "url(#rplaid)", "plaid") + pillow(1034, 676, 52, 9, "#4f8a82", "flower") + pillow(800, 668, 46, 3, "#e2b55a", "crochet") +
    // a crocheted blanket over the right arm
    '<path d="M1048 618 C 1100 600 1160 612 1160 650 L 1150 770 L 1062 770 Z" fill="#e2b55a" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M1062 650 L 1156 650 M1062 690 L 1154 690 M1062 730 L 1152 730" stroke="#c5472f" stroke-width="12"/><path d="M1062 670 L 1155 670 M1062 710 L 1153 710" stroke="#4f8a82" stroke-width="8"/><path d="M1062 770 v 22 m 14 -22 v 22 m 14 -22 v 22 m 14 -22 v 22 m 14 -22 v 22 m 14 -22 v 22" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
    "</g>";
  m += '<g filter="url(#wobbleM)"><rect x="-30" y="0" width="1660" height="0"/>' +
    // lace doily on top of the bookcase
    '<path d="M450 98 Q 500 78 560 98 Q 620 78 680 98 Q 740 78 800 98 Q 860 78 920 98 Q 980 78 1040 98 Q 1100 78 1150 98" fill="none" stroke="#fbf0d4" stroke-width="10" stroke-linecap="round"/>' +
    "</g>";
  // stickers: teddy bear, cat, plants, suitcases... (outside the wobble so they stay crisp)
  m += S.g("bear", 676, 616, 104, -4) + S.g("cat", 936, 692, 124, 0) + S.g("suitcases", 348, 728, 96, -3) + S.g("pumpkin", 330, 788, 84, -6) + S.g("yarn", 1230, 800, 98, 6);
  m += '<g id="rCandleSpotWrap"><circle id="rGlow" cx="205" cy="560" r="420" fill="url(#rglowG)" opacity="0" pointer-events="none"/><g id="rCandleSpot" transform="translate(205 646) scale(1.1) translate(-50 -122)"></g></g>';
  m += '<circle cx="80" cy="450" r="260" fill="url(#rglowG)" opacity=".45" pointer-events="none"/>';
  // pencil hatching in the corners and paper grain over everything
  m += '<rect x="-300" y="-300" width="2200" height="1500" fill="url(#hatch)" mask="url(#rEdgeM)" opacity=".5" pointer-events="none"/>';
  m += '<rect x="-300" y="-300" width="2200" height="1500" fill="url(#rvig)" pointer-events="none"/>';
  m += '<rect x="0" y="0" width="1600" height="900" fill="#fff" filter="url(#grainF)" opacity=".55" pointer-events="none" style="mix-blend-mode:multiply"/>';
  svg.innerHTML = m;
  svg.setAttribute("aria-label", "A cozy hand-drawn grandma's living room with a bookcase, a sofa and a china cabinet");
})();