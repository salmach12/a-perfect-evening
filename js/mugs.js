// The clay mug collection: eight little mugs, each drawn from a few simple parts.
// Mugs live in a 100-wide box around x=450, rim at y=520, bottom at y=592 (same as the kitchen mug).
const BODY = {
  classic: "M392 520 L392 548 C 392 580 418 592 450 592 C 482 592 508 580 508 548 L508 520 Z",
  belly:   "M391 520 C 378 548 394 592 450 592 C 506 592 522 548 509 520 Z",
  taper:   "M392 520 L405 578 C 407 590 420 592 450 592 C 480 592 493 590 495 578 L508 520 Z",
  straight:"M392 520 L394 582 C 394 590 406 592 450 592 C 494 592 506 590 506 582 L508 520 Z"
};
const HANDLE = {
  loop: "M508 532 C 556 524 556 580 502 574",
  ring: "M506 534 C 546 520 552 574 504 572",
  ear:  "M506 538 C 538 530 540 566 504 566"
};
const MUGS = [
  { id: "oat",   body: "classic",  handle: "loop", color: "#efe3c4", accent: "#7f8a4c", deco: "band" },
  { id: "olive", body: "belly",    handle: "ring", color: "#8a9450", accent: "#efe3c4", deco: "dots" },
  { id: "cocoa", body: "taper",    handle: "ear",  color: "#8a5a3a", accent: "#efe3c4", deco: "drip" },
  { id: "sand",  body: "straight", handle: "loop", color: "#e0cfa4", accent: "#a8744a", deco: "stripes" },
  { id: "clay",  body: "belly",    handle: "ear",  color: "#c0825a", accent: "#efe3c4", deco: "rim" },
  { id: "moss",  body: "classic",  handle: "ring", color: "#6a7539", accent: "#efe3c4", deco: "hearts" },
  { id: "honey", body: "taper",    handle: "loop", color: "#d4a84a", accent: "#8a5a3a", deco: "dots" },
  { id: "cream", body: "straight", handle: "ear",  color: "#f4ecd6", accent: "#8a9450", deco: "flower" }
];

function mugDeco(m) {
  const a = m.accent;
  switch (m.deco) {
    case "band":    return '<rect x="380" y="540" width="140" height="9" fill="' + a + '"/>';
    case "rim":     return '<rect x="380" y="521" width="140" height="11" fill="' + a + '"/>';
    case "drip":    return '<path d="M380 518 H520 V534 C 514 534 512 546 506 546 C 500 546 498 534 490 534 C 482 534 480 542 474 542 C 468 542 466 534 458 534 C 446 534 444 548 436 548 C 428 548 428 534 418 534 C 408 534 408 544 400 544 C 394 544 394 534 380 534 Z" fill="' + a + '"/>';
    case "dots":    return [408, 424, 476, 492].map(function (x, i) { return '<circle cx="' + x + '" cy="' + (i % 2 ? 538 : 546) + '" r="3.4" fill="' + a + '"/>'; }).join("") + '<circle cx="404" cy="572" r="3.4" fill="' + a + '"/><circle cx="496" cy="572" r="3.4" fill="' + a + '"/>';
    case "stripes": return [404, 418, 482, 496].map(function (x) { return '<rect x="' + (x - 3) + '" y="520" width="6" height="74" fill="' + a + '" opacity=".85"/>'; }).join("");
    case "hearts":  return [[406, 540], [494, 540], [412, 574], [488, 574]].map(function (p) { return '<path d="M' + p[0] + ' ' + (p[1] + 5) + ' C ' + (p[0] - 9) + ' ' + (p[1] - 2) + ' ' + (p[0] - 3) + ' ' + (p[1] - 8) + ' ' + p[0] + ' ' + (p[1] - 3) + ' C ' + (p[0] + 3) + ' ' + (p[1] - 8) + ' ' + (p[0] + 9) + ' ' + (p[1] - 2) + ' ' + p[0] + ' ' + (p[1] + 5) + ' Z" fill="' + a + '"/>'; }).join("");
    case "flower":  return [[404, 546], [496, 546]].map(function (p) {
      let s = ""; for (let i = 0; i < 5; i++) { const r = i * 72 * Math.PI / 180; s += '<circle cx="' + (p[0] + 5.5 * Math.sin(r)).toFixed(1) + '" cy="' + (p[1] - 5.5 * Math.cos(r)).toFixed(1) + '" r="3.6" fill="' + a + '"/>'; }
      return s + '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6" fill="#c9a24f"/>'; }).join("");
  }
  return "";
}
const SPECKS = '<circle cx="414" cy="560" r="1.6" fill="#3a2416" opacity=".28"/><circle cx="486" cy="556" r="1.6" fill="#3a2416" opacity=".28"/><circle cx="470" cy="582" r="1.4" fill="#3a2416" opacity=".28"/><circle cx="430" cy="584" r="1.4" fill="#3a2416" opacity=".28"/>';
const FACE = '<circle cx="430" cy="558" r="2.8" fill="#3a2416"/><circle cx="470" cy="558" r="2.8" fill="#3a2416"/><path d="M443 565 Q 450 572 457 565" stroke="#3a2416" stroke-width="2.6" fill="none" stroke-linecap="round"/><ellipse cx="421" cy="566" rx="6" ry="3.5" fill="#c99a72" opacity=".55"/><ellipse cx="479" cy="566" rx="6" ry="3.5" fill="#c99a72" opacity=".55"/>';

function mugById(id) { return MUGS.find(function (m) { return m.id === id; }) || MUGS[0]; }
function mugRim(m) { return m.color === "#8a5a3a" || m.color === "#6a7539" || m.color === "#8a9450" ? m.color : "#f7efd6"; }
function mugHandleSVG(m) {
  return '<path d="' + HANDLE[m.handle] + '" fill="none" stroke="#3a2416" stroke-width="13" stroke-linecap="round"/><path d="' + HANDLE[m.handle] + '" fill="none" stroke="' + m.color + '" stroke-width="5" stroke-linecap="round"/>';
}
// body + decoration; clipId names the clipPath that matches the body shape
function mugBodySVG(m, clipId) {
  return '<path d="' + BODY[m.body] + '" fill="' + m.color + '" stroke="#3a2416" stroke-width="3.4" stroke-linejoin="round"/>' +
    '<g clip-path="url(#' + clipId + ')">' + mugDeco(m) + SPECKS + '</g>';
}
// a small picture of the mug for the picker, the shelf and the nook
function mugThumb(m, withFace) {
  const cid = "tc-" + m.id + "-" + Math.random().toString(36).slice(2, 6);
  return '<svg viewBox="372 496 200 112" aria-hidden="true"><defs><clipPath id="' + cid + '"><path d="' + BODY[m.body] + '"/></clipPath></defs>' +
    '<ellipse cx="450" cy="598" rx="64" ry="7" fill="#3a2416" opacity=".18"/>' +
    mugHandleSVG(m) + mugBodySVG(m, cid) +
    '<ellipse cx="450" cy="520" rx="58" ry="13" fill="' + mugRim(m) + '" stroke="#3a2416" stroke-width="3.4"/><ellipse cx="450" cy="520" rx="50" ry="9.5" fill="#cdbb93"/>' +
    (withFace === false ? "" : FACE) + '</svg>';
}

// the collection (saved on her own device)
function loadMugs() { try { return JSON.parse(localStorage.getItem("pe-mugs")) || []; } catch (e) { return []; } }
function collectMug(id) {
  const have = loadMugs();
  if (have.indexOf(id) === -1) have.push(id);
  try { localStorage.setItem("pe-mugs", JSON.stringify(have)); } catch (e) {}
}
