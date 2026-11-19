// Cooking: kitchen walk-through, a top-down counter, then dinner at the table
(function () {
  const NS = "http://www.w3.org/2000/svg", INK = "#5a2a1c";
  const $ = function (id) { return document.getElementById(id); };
  const SL = 1.5;   // everything in the kitchen happens a little slower and calmer
  const sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms * SL); }); };
  const lerp = function (a, b, t) { return a + (b - a) * t; };
  function tween(ms, fn) {
    return new Promise(function (res) {
      const t0 = performance.now(); ms = ms * SL;
      (function f(now) {
        const k = Math.min(1, (now - t0) / ms);
        fn(k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, k);
        if (k < 1) requestAnimationFrame(f); else res();
      })(t0);
    });
  }
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function mix(a, b, t) {
    const pa = [1, 3, 5].map(function (i) { return parseInt(a.substr(i, 2), 16); }), pb = [1, 3, 5].map(function (i) { return parseInt(b.substr(i, 2), 16); });
    return "#" + pa.map(function (v, i) { return Math.round(lerp(v, pb[i], t)).toString(16).padStart(2, "0"); }).join("");
  }
  const VEG = {
    pumpkin: { piece: "#e3862d", art: '<path d="M-38 -30 Q-44 -70 -10 -74 Q0 -76 10 -74 Q44 -70 38 -30 Q36 0 0 2 Q-36 0 -38 -30Z" fill="#e3862d"/><path d="M-13 -72 Q-26 -36 -13 0 M13 -72 Q26 -36 13 0" fill="none"/><path d="M-2 -74 q-3 -12 7 -17" stroke="#6f8a3e" stroke-width="6" fill="none"/>' },
    onion: { piece: "#efdca4", art: '<path d="M0 -86 Q-4 -66 -30 -50 Q-44 -26 -30 -8 Q-14 4 0 4 Q14 4 30 -8 Q44 -26 30 -50 Q4 -66 0 -86Z" fill="#e9d29a"/><path d="M-12 -62 Q-20 -30 -10 0 M12 -62 Q20 -30 10 0" fill="none" stroke-width="2.4"/><path d="M-6 4 l-4 8 M0 4 v9 M6 4 l4 8" fill="none" stroke-width="2.4"/>' },
    carrot: { piece: "#e8892e", art: '<g transform="translate(0 -22) rotate(-78)"><path d="M-14 -46 L14 -46 L1 44 Z" fill="#e8892e"/><path d="M-8 -30 h10 M-6 -10 h9 M-3 12 h7" stroke-width="2" fill="none"/><path d="M0 -46 Q-16 -62 -14 -76 Q-4 -66 0 -52 Q6 -70 16 -74 Q12 -58 4 -46Z" fill="#6f8a3e"/></g>' },
    tomato: { piece: "#c9402b", art: '<circle cx="0" cy="-34" r="35" fill="#cf4430"/><path d="M-6 -66 Q-4 -76 2 -74 M-22 -58 Q-6 -50 0 -62 Q6 -50 22 -58 Q8 -46 0 -40 Q-8 -46 -22 -58Z" fill="#6f8a3e"/><path d="M-20 -26 Q-14 -14 -4 -12" stroke="#fff" stroke-width="3" opacity=".4" fill="none"/>' },
    mushroom: { piece: "#cba67a", art: '<path d="M-12 -36 L-14 0 Q0 6 14 0 L12 -36Z" fill="#f1e6cc"/><path d="M-42 -34 Q-42 -78 0 -78 Q42 -78 42 -34 Q0 -26 -42 -34Z" fill="#b08556"/><circle cx="-16" cy="-52" r="4" fill="#f1e6cc" stroke-width="1.6"/><circle cx="10" cy="-60" r="5" fill="#f1e6cc" stroke-width="1.6"/><circle cx="22" cy="-44" r="3.4" fill="#f1e6cc" stroke-width="1.6"/>' },
    potato: { piece: "#dcc27a", art: '<path d="M-40 -28 Q-36 -62 4 -60 Q42 -58 41 -28 Q38 0 0 2 Q-42 2 -40 -28Z" fill="#cfa863"/><path d="M-18 -36 l6 3 M10 -22 l6 2 M14 -46 l5 -1" stroke-width="2.4" fill="none"/>' },
    herb: { piece: "#6f8a3e", art: '<path d="M0 0 Q-6 -34 -16 -70 M0 0 Q2 -40 2 -78 M0 0 Q8 -34 20 -66" fill="none" stroke-width="3"/><g fill="#7f9a46" stroke-width="2.4"><ellipse cx="-16" cy="-72" rx="9" ry="5" transform="rotate(-50 -16 -72)"/><ellipse cx="-10" cy="-52" rx="9" ry="5" transform="rotate(-30 -10 -52)"/><ellipse cx="2" cy="-80" rx="9" ry="5" transform="rotate(80 2 -80)"/><ellipse cx="2" cy="-56" rx="9" ry="5" transform="rotate(60 2 -56)"/><ellipse cx="20" cy="-68" rx="9" ry="5" transform="rotate(40 20 -68)"/><ellipse cx="14" cy="-48" rx="9" ry="5" transform="rotate(20 14 -48)"/></g>' }
  };  window.VEGART = VEG;
  const D = window.COOKDATA, ING = D.ING, NAMES = D.NAMES, MENU = D.MENU;
  const PLACES = { fridge: "The fridge", pantry: "The cupboard", spice: "The spice rack" };

  /* ---------- build the page ---------- */
  const sec = document.createElement("section");
  sec.className = "page kitchen-page"; sec.id = "step-cooking"; sec.hidden = true;
  sec.innerHTML = '<svg class="kscene" id="cook-svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A cozy hand-drawn grandmother\'s kitchen"></svg>' +
    '<svg class="kscene ktop" id="cook-top" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="group" aria-label="Your kitchen counter, seen from above"></svg>' +
    '<div class="kinwrap" id="cook-inwrap"><svg class="kinside" id="cook-inside" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-label="Looking inside"></svg></div>' +
    '<div class="cbasket" id="cook-basket" hidden><svg viewBox="-80 -80 160 120" aria-hidden="true"><g filter="url(#wobbleS)" stroke="#3a2416" stroke-width="4" stroke-linejoin="round"><path d="M-48 -34 Q0 -92 48 -34" fill="none" stroke-width="6"/><path d="M-60 -30 H60 L46 28 Q0 36 -46 28Z" fill="#c9965c"/><path d="M-54 -14 H54 M-50 4 H50 M-46 20 H46 M-30 -30 L-26 30 M-8 -30 V32 M14 -30 V32 M34 -30 L30 30" stroke-width="2" fill="none" opacity=".55"/></g></svg><b id="cb-n"></b></div>' +
    '<aside class="crecipe" id="cook-recipe" hidden><button type="button" class="cr-head" id="cr-head" aria-expanded="true"><strong id="cr-title"></strong><span id="cr-now"></span><i class="cr-chev"></i></button><div class="cr-body" id="cr-body"></div></aside>' +
    '<div class="kui" id="cook-ui"><h3 class="k-title" id="cook-title"></h3><p class="k-hint" id="cook-hint"></p><div class="k-row" id="cook-chips"></div><div class="k-row"><button type="button" class="k-next" id="cook-next" hidden>Enjoy</button></div></div>';
  const afterReading = $("step-reading");
  (afterReading && afterReading.parentNode ? afterReading.parentNode : document.body).appendChild(sec);
  if (typeof steps !== "undefined") steps.cooking = sec;
  const S = $("cook-svg"), IN = $("cook-inside"), title = $("cook-title"), hint = $("cook-hint"), chips = $("cook-chips"), nextBtn = $("cook-next");
  const recipeBox = $("cook-recipe"), crTitle = $("cr-title"), crNow = $("cr-now"), crBody = $("cr-body"), crHead = $("cr-head");
  function say(t, h) { title.textContent = withName(t); hint.textContent = h || ""; }

  /* ---------- the kitchen: a grandmother's kitchen, drawn by hand ---------- */
  function scallop(x0, x1, y, r) { let d = "M" + x0 + " " + y; for (let x = x0; x < x1; x += r * 2) d += " q" + r + " " + r * 1.1 + " " + r * 2 + " 0"; return d; }
  function build() {
    let m = '<defs>' +
      '<pattern id="ctile" width="70" height="46" patternUnits="userSpaceOnUse"><rect width="70" height="46" fill="#f4ebd0"/><path d="M0 1 H70 M1 0 V46" stroke="#cbb98c" stroke-width="3"/><path d="M35 14 q-6 -9 0 -9 q6 0 0 9 M35 14 q-9 6 -9 0 q0 -6 9 0 M35 14 q9 6 9 0 q0 -6 -9 0 M35 14 q-6 9 0 9 q6 0 0 -9" fill="#9bb7c9" stroke="#6f93aa" stroke-width="1.6" opacity=".85"/></pattern>' +
      '<pattern id="cgingham" width="36" height="36" patternUnits="userSpaceOnUse"><rect width="36" height="36" fill="#f6ecd2"/><rect width="18" height="36" fill="#c9553f" opacity=".55"/><rect width="36" height="18" fill="#c9553f" opacity=".55"/></pattern>' +
      '<radialGradient id="cvig" cx="50%" cy="46%" r="75%"><stop offset=".6" stop-color="#1a0d08" stop-opacity="0"/><stop offset="1" stop-color="#1a0d08" stop-opacity=".5"/></radialGradient>' +
      '<radialGradient id="coglow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#e8862f"/></radialGradient>' +
      '<linearGradient id="cwarm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd9a0" stop-opacity=".0"/><stop offset="1" stop-color="#ffb866" stop-opacity=".18"/></linearGradient>' +
      '<g id="cpat"></g></defs>';
    m += '<rect x="-600" y="-3000" width="2800" height="3500" fill="url(#cwall)"/>';
    m += '<g filter="url(#wobbleM)" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round">' +
      // backsplash, rail, counter, cabinets
      '<rect x="-600" y="470" width="2800" height="130" fill="url(#ctile)"/><rect x="-600" y="460" width="2800" height="14" rx="4" fill="#b98a4e"/>' +
      '<rect x="-600" y="598" width="2800" height="146" fill="#cfa165"/><path d="M-600 628 H2200 M-600 668 H2200 M-600 706 H2200" stroke="#b98a4e" stroke-width="2.4" opacity=".55" fill="none"/><path d="M200 612 q60 -6 140 0 M900 690 q80 -6 160 0 M1220 640 q50 -5 110 0" stroke="#e6c18a" stroke-width="3" opacity=".6" fill="none"/>' +
      '<rect x="-600" y="742" width="2800" height="32" rx="6" fill="#9a6a3c"/>' +
      '<rect x="-600" y="774" width="2800" height="3000" fill="#7d9a86"/>' +
      '<g fill="#8fae9a" stroke-width="4"><rect x="-300" y="796" width="530" height="260" rx="10"/><rect x="250" y="796" width="250" height="260" rx="10"/><rect x="510" y="796" width="260" height="260" rx="10"/><rect x="1090" y="796" width="150" height="260" rx="10"/><rect x="1250" y="796" width="150" height="260" rx="10"/></g>' +
      '<g fill="none" stroke-width="2.4" opacity=".45"><rect x="270" y="816" width="210" height="220" rx="6"/><rect x="530" y="816" width="220" height="220" rx="6"/><rect x="1106" y="816" width="118" height="220" rx="6"/><rect x="1266" y="816" width="118" height="220" rx="6"/></g>' +
      '<g fill="#e2b55a" stroke-width="3"><circle cx="480" cy="832" r="9"/><circle cx="530" cy="832" r="9"/><circle cx="1220" cy="832" r="9"/><circle cx="1270" cy="832" r="9"/></g>' +
      // window with a lace curtain and a gingham valance
      '<path d="M395 300 V 170 A 120 100 0 0 1 635 170 V 300 Z" fill="#26325a" stroke-width="7"/><circle cx="574" cy="150" r="20" fill="#fff1c4" stroke-width="3"/><circle cx="584" cy="143" r="17" fill="#26325a" stroke="none"/>' +
      '<g fill="#fff1c4" stroke="none"><path d="M450 170 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3Z"/><path d="M520 230 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2Z"/></g>' +
      '<path d="M515 78 V 300 M395 210 H 635" stroke="#efe3c4" stroke-width="7" opacity=".9"/><rect x="380" y="298" width="270" height="16" rx="8" fill="#efe3c4" stroke-width="4.5"/>' +
      '<path d="M376 120 C 392 180 396 250 384 312 q-8 10 -20 0 Z" fill="#f6efdc" stroke-width="3.4"/><path d="M654 120 C 638 180 634 250 646 312 q8 10 20 0 Z" fill="#f6efdc" stroke-width="3.4"/>' +
      '<path d="' + scallop(366, 392, 312, 6) + '" fill="none" stroke-width="3"/><path d="' + scallop(642, 668, 312, 6) + '" fill="none" stroke-width="3"/>' +
      '<g fill="none" stroke="#cdbf9a" stroke-width="2" opacity=".9"><path d="M382 150 q4 10 0 20 q-4 10 0 20 M392 160 q4 10 0 20 M382 230 q4 10 0 20"/><path d="M650 150 q-4 10 0 20 q4 10 0 20 M640 160 q-4 10 0 20 M650 230 q-4 10 0 20"/></g>' +
      '<path d="M368 80 H662 V122 q-14 12 -28 0 q-14 12 -28 0 q-14 12 -28 0 q-14 12 -28 0 q-14 12 -28 0 q-14 12 -28 0 q-14 12 -28 0 q-14 12 -28 0 q-14 12 -28 0 q-14 12 -28 0 Z" fill="url(#cgingham)" stroke-width="4"/>' +
      // utensil rail
      '<path d="M700 112 H 990" stroke-width="7" stroke-linecap="round" fill="none"/><circle cx="700" cy="112" r="8" fill="#e2b55a" stroke-width="3"/><circle cx="990" cy="112" r="8" fill="#e2b55a" stroke-width="3"/>' +
      '<g stroke-linecap="round" stroke-width="4"><path d="M750 114 V 180" fill="none"/><path d="M750 180 V 250" stroke-width="9" fill="none"/><ellipse cx="750" cy="266" rx="26" ry="22" fill="#c9a24a"/><ellipse cx="750" cy="270" rx="16" ry="12" fill="#a97d36" stroke-width="2.4"/>' +
      '<path d="M850 114 V 190" fill="none"/><path d="M850 190 q-30 20 -26 60 q26 10 52 0 q4 -40 -26 -60Z" fill="#d9d1bf"/><path d="M850 190 V 250 M838 196 q-4 28 0 52 M862 196 q4 28 0 52" fill="none" stroke-width="2.4"/>' +
      '<path d="M940 114 V 200" fill="none"/><path d="M924 200 H 956 V 270 Q 940 284 924 270Z" fill="#7a4a2a"/></g>' +
      // copper pot hanging beside the window, dried lavender
      '<path d="M300 40 V 120" fill="none" stroke-width="4"/><path d="M262 120 H338 V176 Q338 196 318 196 H282 Q262 196 262 176Z" fill="#c98a4e"/><ellipse cx="300" cy="120" rx="38" ry="9" fill="#d9a066"/><path d="M270 138 q-2 22 4 40" stroke="#fff" stroke-width="5" opacity=".35" fill="none"/><path d="M338 140 q28 -2 36 10" fill="none" stroke-width="7"/>' +
      '<g stroke-width="2.6"><path d="M226 40 V 60 M214 60 q12 -8 24 0" fill="none"/><path d="M220 60 L206 150 M226 60 L226 160 M232 60 L246 150" fill="none" stroke="#7a8a4a" stroke-width="3"/><g fill="#9a7ab8" stroke-width="1.6"><ellipse cx="205" cy="150" rx="5" ry="9"/><ellipse cx="226" cy="160" rx="5" ry="9"/><ellipse cx="247" cy="150" rx="5" ry="9"/><ellipse cx="214" cy="130" rx="4.5" ry="8"/><ellipse cx="238" cy="132" rx="4.5" ry="8"/></g></g>' +
      // wall clock, embroidery, tea shelf
      '<circle cx="110" cy="150" r="58" fill="#c58a3a" stroke-width="5"/><circle cx="110" cy="150" r="48" fill="#fbf0d4" stroke-width="2.6"/><g stroke-width="3" stroke-linecap="round"><path d="M110 150 V120"/><path d="M110 150 L132 160"/></g><g fill="#5a2a1c" stroke="none"><circle cx="110" cy="112" r="2.6"/><circle cx="148" cy="150" r="2.6"/><circle cx="110" cy="188" r="2.6"/><circle cx="72" cy="150" r="2.6"/></g>' +
      '<circle cx="110" cy="150" r="4" fill="#a3432c" stroke-width="2"/>' +
      '<circle cx="110" cy="318" r="58" fill="#c58a3a" stroke-width="5"/><circle cx="110" cy="318" r="48" fill="#fbf0d4" stroke-width="2.6"/><text x="110" y="312" text-anchor="middle" font-family="Caveat Brush, cursive" font-size="21" fill="#a3432c" stroke="none">bless this</text><text x="110" y="336" text-anchor="middle" font-family="Caveat Brush, cursive" font-size="24" fill="#4f8a82" stroke="none">kitchen</text>' +
      '<rect x="190" y="418" width="170" height="12" rx="5" fill="#8a5230" stroke-width="4.4"/><path d="M204 430 l-6 22 M346 430 l6 22" stroke-width="4" fill="none"/>' +
      '<g stroke-width="3.2"><path d="M212 418 q-4 -26 18 -28 q22 2 18 28Z" fill="#f3e8c8"/><path d="M276 418 q-4 -26 18 -28 q22 2 18 28Z" fill="#efdca4"/><path d="M246 404 q12 -2 14 6" fill="none"/></g>' +
      // spice shelf
      '<rect x="1010" y="450" width="390" height="16" rx="6" fill="#8a5230" stroke-width="5"/><path d="M1030 466 l-8 30 M1380 466 l8 30" stroke-width="5" fill="none"/>' +
      // the cloth on the counter
      '<g id="cmat"><path d="M236 650 H1416 V726 H236Z" fill="url(#cgingham)" stroke-width="4"/><path d="' + scallop(236, 1416, 728, 11) + '" fill="#f6ecd2" stroke-width="3"/></g>' +
      // the oven is built in under the counter
      '<g id="coven" class="ltap" role="button" tabindex="0" aria-label="The oven" transform="translate(930 784)"><rect x="-142" y="-4" width="284" height="128" rx="10" fill="#efe3c4"/><rect x="-142" y="-4" width="284" height="26" rx="8" fill="#6f9a8e"/><circle cx="-92" cy="9" r="6" fill="#e8dcc0" stroke-width="2.4"/><circle cx="-66" cy="9" r="6" fill="#e8dcc0" stroke-width="2.4"/><circle cx="66" cy="9" r="6" fill="#e8dcc0" stroke-width="2.4"/><circle cx="92" cy="9" r="6" fill="#e8dcc0" stroke-width="2.4"/><rect x="-108" y="34" width="216" height="76" rx="8" fill="#2f2a26"/>' +
      '<rect id="coglass" x="-100" y="42" width="200" height="60" rx="6" fill="url(#coglow)" opacity="0"/><path d="M-96 68 q96 -26 192 -8" stroke="#fff" stroke-width="5" opacity=".16" fill="none"/>' +
      '<path d="M-112 28 H112" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M-40 28 V80 Q0 92 40 80 V28Z" fill="url(#cgingham)" stroke-width="3.4"/><rect x="-150" y="-12" width="300" height="140" fill="transparent"/></g>' +
      '<rect x="800" y="920" width="260" height="84" rx="8" fill="#8fae9a" stroke-width="4"/><circle cx="930" cy="940" r="8" fill="#e2b55a" stroke-width="3"/>' +
      "</g>";
    // wall cupboard (tap it to look inside)
    m += '<g id="ccupboard" class="ltap" role="button" tabindex="0" aria-label="The cupboard"><g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round">' +
      '<rect x="1010" y="60" width="270" height="262" rx="8" fill="#a86a3c"/><rect x="1024" y="74" width="116" height="234" rx="5" fill="#bc7c48" stroke-width="3.4"/><rect x="1150" y="74" width="116" height="234" rx="5" fill="#bc7c48" stroke-width="3.4"/>' +
      '<rect x="1042" y="96" width="52" height="86" rx="4" fill="none" stroke-width="2.6" opacity=".55"/><rect x="1186" y="96" width="52" height="86" rx="4" fill="none" stroke-width="2.6" opacity=".55"/>' +
      '<circle cx="1126" cy="194" r="8" fill="#e2b55a" stroke-width="3"/><circle cx="1164" cy="194" r="8" fill="#e2b55a" stroke-width="3"/><path d="M1034 90 q40 -8 90 0 M1160 92 q50 -8 96 0" stroke="#fff" stroke-width="4" opacity=".16" fill="none"/>' +
      '<path d="M1010 60 H1280 V84 q-14 10 -28 0 q-14 10 -28 0 q-14 10 -28 0 q-14 10 -28 0 q-14 10 -28 0 q-14 10 -28 0 q-14 10 -28 0 q-14 10 -28 0 q-14 10 -28 0 Z" fill="url(#cgingham)" stroke-width="3.4"/></g>' +
      '<rect x="1000" y="50" width="290" height="285" fill="transparent"/></g>';
    m += '<g id="crack" class="ltap" role="button" tabindex="0" aria-label="The spice rack">';
    [["#f1ede2", "salt"], ["#4a3a30", "pepper"], ["#6f8a3e", "oregano"], ["#c4502a", "paprika"], ["#a8683a", "nutmeg"]].forEach(function (j, i) {
      m += '<g transform="translate(' + (1056 + i * 72) + ' 450) scale(.72)" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3.4" stroke-linejoin="round">' + D.ART.jar(j[0], j[1]) + "</g>";
    });
    m += '<rect x="1010" y="352" width="390" height="116" fill="transparent"/></g>';
    // a tea pot in a knitted cosy, on a little doily
    m += '<g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3.6" stroke-linejoin="round" transform="translate(938 600)"><ellipse cx="0" cy="-2" rx="70" ry="9" fill="#f6ecd2"/><path d="' + scallop(-70, 70, -2, 7) + '" fill="#f6ecd2" stroke-width="2.4"/>' +
      '<path d="M-52 -14 Q-60 -80 0 -86 Q60 -80 52 -14 Q0 0 -52 -14Z" fill="#f3ead2"/><path d="M-48 -52 Q0 -40 48 -52 L52 -14 Q0 0 -52 -14Z" fill="#c9553f"/><path d="M-40 -46 l6 8 l6 -8 l6 8 l6 -8 l6 8 l6 -8 l6 8 l6 -8 l6 8 l6 -8 l6 8" fill="none" stroke="#f6ecd2" stroke-width="2.4"/>' +
      '<path d="M52 -52 q34 -8 36 -34 q-12 6 -38 4" fill="#f3ead2"/><path d="M-52 -50 q-34 -4 -34 22 q2 18 34 16" fill="none" stroke-width="7"/><ellipse cx="0" cy="-88" rx="26" ry="8" fill="#e8dcc0"/><circle cx="0" cy="-98" r="7" fill="#c9553f"/></g>';
    // the board
    m += '<g id="cboard" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round" transform="translate(1300 602)"><path d="M-130 14 H130 V32 Q0 38 -130 32Z" fill="#9a6a3c"/><path d="M-112 -26 H112 L132 14 H-132Z" fill="#cf9f5e"/><path d="M-86 -12 q50 -8 120 0" stroke="#a97a42" stroke-width="2.4" fill="none"/><circle cx="96" cy="2" r="6" fill="#a97a42" stroke-width="2.4"/></g>';
    m += '<g id="cboardItem" transform="translate(1300 584)"></g><g id="cpieces" transform="translate(1300 584)"></g>';

    // stove, pot and pan
    m += '<g id="cstove" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"><rect x="330" y="600" width="340" height="14" rx="5" fill="#4a4a4a"/><path d="M360 600 v-8 h280 v8" fill="#6a6a6a"/></g>';
    m += '<g id="cvessel" class="ltap" role="button" tabindex="0" aria-label="The pot" transform="translate(500 598)">' +
      '<g id="cpotart" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4.5" stroke-linejoin="round">' +
      '<path d="M-152 -118 q-30 -4 -26 22 q4 22 28 18" fill="none" stroke-width="9"/><path d="M152 -118 q30 -4 26 22 q-4 22 -28 18" fill="none" stroke-width="9"/>' +
      '<path d="M-142 -168 Q-150 -4 -112 -2 H112 Q150 -4 142 -168 Z" fill="#4a7a70"/><path d="M-120 -150 Q-126 -40 -112 -14" stroke="#fff" stroke-width="7" opacity=".28" fill="none" stroke-linecap="round"/><path d="M-130 -60 H130" stroke="#2f5650" stroke-width="3" opacity=".6" fill="none"/>' +
      '<ellipse cx="0" cy="-168" rx="148" ry="28" fill="#3a6a60"/><ellipse cx="0" cy="-166" rx="134" ry="21" fill="#26302c"/></g>' +
      '<g id="cpanart" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4.5" stroke-linejoin="round" display="none">' +
      '<path d="M150 -52 L330 -66 Q344 -62 340 -52 Q336 -42 322 -42 L150 -36" fill="#6a5a50"/><path d="M-150 -58 Q-156 -6 -112 -2 H112 Q156 -6 150 -58 Z" fill="#5a4a42"/><path d="M-124 -44 Q-128 -14 -108 -10" stroke="#fff" stroke-width="6" opacity=".22" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="0" cy="-58" rx="156" ry="24" fill="#4a3c36"/><ellipse cx="0" cy="-56" rx="140" ry="18" fill="#2b2420"/></g>' +
      '<ellipse id="cbroth" cx="0" cy="-160" rx="128" ry="17" fill="#cdb98a" stroke="none" opacity="0"/><g id="cswirl" stroke="#fff" stroke-width="2.6" opacity=".35" fill="none" stroke-linecap="round"><path d="M-60 -160 q30 -8 60 0"/><path d="M10 -156 q30 -6 50 -2"/></g>' +
      '<g id="cheap0" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="2.2" stroke-linejoin="round"></g><g id="clay0" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"></g><g id="cbub"></g>' +
      '<rect x="-170" y="-210" width="340" height="220" fill="transparent"/></g>';
    m += '<g id="cflames" class="cflames" transform="translate(500 604)">';
    for (let i = 0; i < 9; i++) m += '<g transform="translate(' + (-128 + i * 32) + ' 0)"><path class="cflame" style="animation-delay:' + (-i * 0.23) + 's" d="M0 0 C 9 -14 10 -26 0 -38 C -10 -26 -9 -14 0 0Z" fill="#f4b24a" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/></g>';
    m += '</g>';
    m += '<g id="csteam" transform="translate(500 420)" fill="none" stroke="#f6ebcf" stroke-width="5" stroke-linecap="round" opacity="0"><path class="cst" d="M-40 0 q-14 -28 0 -54 q14 -26 0 -54" /><path class="cst" style="animation-delay:-1.2s" d="M10 6 q-14 -30 0 -58 q14 -28 0 -58"/><path class="cst" style="animation-delay:-2.4s" d="M60 0 q-12 -26 0 -50 q12 -24 0 -50"/></g>';
    m += '<g id="cknob" class="ltap" role="button" tabindex="0" aria-label="The stove knob" transform="translate(420 760)"><g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3.6"><ellipse cx="0" cy="4" rx="30" ry="16" fill="#3a2416" opacity=".25" stroke="none"/><circle cx="0" cy="0" r="21" fill="#e8dcc0"/><circle cx="0" cy="0" r="14" fill="#c9a24a"/><path id="cknobline" d="M0 -3 V -18" stroke-width="4" stroke-linecap="round"/></g><circle r="30" fill="transparent"/></g>';
    // the bowl
    m += '<g id="cbowl" class="ltap" role="button" tabindex="0" aria-label="The bowl" transform="translate(785 604) scale(.8)"><g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4.4" stroke-linejoin="round"><ellipse cx="0" cy="6" rx="125" ry="14" fill="#3a2416" opacity=".25" stroke="none"/><ellipse cx="0" cy="-2" rx="112" ry="16" fill="#efe3c4"/><path d="M-100 -62 Q-98 0 0 2 Q98 0 100 -62Z" fill="#f3e8c8"/><path d="M-96 -42 Q0 -26 96 -42 M-92 -24 Q0 -8 92 -24" fill="none" stroke="#4f8a82" stroke-width="4" opacity=".9"/><path d="M-60 -50 q4 20 14 36" fill="none" stroke="#fff" stroke-width="5" opacity=".5"/><ellipse cx="0" cy="-62" rx="100" ry="16" fill="#e2d2a2"/></g>' +
      '<ellipse id="cbfill" cx="0" cy="-60" rx="90" ry="12" fill="#cdb98a" opacity="0"/><g id="cheap1" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"></g>' +
      '<g id="cbsteam" fill="none" stroke="#f6ebcf" stroke-width="4" stroke-linecap="round" opacity="0"><path class="cst" d="M-20 -80 q-10 -22 0 -42 q10 -20 0 -40"/><path class="cst" style="animation-delay:-1.5s" d="M24 -80 q-10 -22 0 -42 q10 -20 0 -40"/></g><circle r="130" cy="-40" fill="transparent"/></g>';
    // the tin / tray / plate (swapped for each recipe)
    m += '<g id="ctin" class="ltap" role="button" tabindex="0" aria-label="The tin" transform="translate(1120 600)" opacity="0"><g id="ctinart" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"></g>' +
      '<ellipse id="ctfill" cx="0" cy="-26" rx="62" ry="11" fill="#e6c78a" opacity="0"/><g id="clay2" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"></g><g id="cheap2" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"></g><circle r="100" cy="-30" fill="transparent"/></g>';
    // the fridge: an old cream-and-mint one, with notes and magnets
    m += '<g id="cfridge" class="ltap" role="button" tabindex="0" aria-label="The fridge"><g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round">' +
      '<rect x="1424" y="120" width="230" height="1000" rx="22" fill="#cfe3d6"/><path d="M1424 400 H1654" stroke-width="5" fill="none"/><rect x="1424" y="116" width="230" height="24" rx="12" fill="#b8d3c4"/>' +
      '<path d="M1446 160 q80 -12 180 0 M1446 424 q80 -10 180 0" stroke="#fff" stroke-width="7" opacity=".35" fill="none" stroke-linecap="round"/>' +
      '<rect x="1442" y="236" width="16" height="110" rx="8" fill="#c9cfcb"/><rect x="1442" y="430" width="16" height="190" rx="8" fill="#c9cfcb"/>' +
      '<rect x="1490" y="190" width="58" height="44" rx="3" fill="#f6ecd0" stroke-width="2.6" transform="rotate(-4 1520 212)"/><path d="M1500 204 h38 M1500 216 h26" stroke-width="2" opacity=".6" fill="none" transform="rotate(-4 1520 212)"/><circle cx="1519" cy="190" r="6" fill="#c4502a" stroke-width="2.4"/>' +
      '<circle cx="1580" cy="470" r="14" fill="#e0a64a" stroke-width="2.6"/><circle cx="1540" cy="520" r="12" fill="#c9553f" stroke-width="2.6"/><rect x="1500" y="560" width="50" height="38" rx="3" fill="#f2e2b8" stroke-width="2.6" transform="rotate(5 1525 579)"/></g>' +
      '<rect x="1424" y="110" width="200" height="540" fill="transparent"/></g>';
    m += '<g id="cmatitems"></g>';
    m += '<ellipse id="chalo" class="lhalo" cx="0" cy="0" rx="10" ry="10"/><g id="cfx" pointer-events="none"></g>';
    // the hand: it always comes down from the top of the picture
    m += '<g id="chand" opacity="0" pointer-events="none" filter="url(#wobbleS)"><g stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round">' +
      '<g><path d="M-32 54 L38 54 L150 1200 L-190 1200 Z" fill="#b5683f"/><path d="M-32 54 L-190 1200 L-150 1200 L-26 54 Z" fill="#8f4a2e" opacity=".55"/><rect x="-37" y="44" width="80" height="30" rx="12" fill="#efe3c4"/><path d="M-22 52 V66 M-8 52 V66 M6 52 V66 M20 52 V66" stroke="#d3c196" stroke-width="3" stroke-linecap="round"/><path d="M-23 12 H30 L33 46 H-26 Z" fill="#e9b894"/></g>' +
      '<g><path d="M-29 -2 C-29 -14 -22 -20 -12 -20 H16 C26 -20 32 -14 32 -2 L33 24 C33 38 20 48 2 48 C-16 48 -29 38 -29 24 Z" fill="#e9b894"/><path d="M-18 40 C-6 46 12 46 24 40" fill="none" stroke="#d6a47e" stroke-width="5" stroke-linecap="round" opacity=".7"/><rect x="-47" y="-4" width="21" height="42" rx="10.5" transform="rotate(28 -36 17)" fill="#e9b894"/></g>' +
      '<g id="ctool"></g>' +
      '<g><rect x="-29" y="-40" width="14" height="42" rx="7" fill="#e9b894"/><rect x="-14" y="-46" width="14" height="48" rx="7" fill="#e9b894"/><rect x="1" y="-46" width="14" height="48" rx="7" fill="#e9b894"/><rect x="16" y="-40" width="14" height="42" rx="7" fill="#e9b894"/><path d="M-22 -26 V-14 M-7 -32 V-18 M8 -32 V-18 M23 -26 V-14" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".45"/></g></g></g>';
    m += (window.STK ? STK.g("pumpkin", 262, 574, 90, -6) : "");
    m += '<rect x="-600" y="-3000" width="2800" height="6000" fill="url(#cvig)" pointer-events="none"/><rect x="-300" y="-300" width="2200" height="1500" fill="url(#hatch)" opacity=".28" pointer-events="none"/>' +
      '<rect x="0" y="0" width="1600" height="900" fill="#fff" filter="url(#grainF)" opacity=".5" pointer-events="none" style="mix-blend-mode:multiply"/>';
    S.innerHTML = m;
    const gw = document.getElementById("gwall"), wall = S.querySelector("#cpat");
    if (gw) wall.outerHTML = gw.outerHTML.replace('id="gwall"', 'id="cwall"');
    else S.querySelector("defs").insertAdjacentHTML("beforeend", '<pattern id="cwall" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#e4cc9a"/></pattern>');
  }
  build();
  // the camera: it can show the whole kitchen, or move in close to the counter
  const CAMS = {
    wide: { d: [64, 14, 1550, 969], t: [860, 40, 800, 1280] },
    counter: { d: [-140, 150, 1640, 923], t: [300, -70, 800, 1280] }
  };
  let camName = "wide", camNow = null, camFocus = 800;
  const isTall = function () { return window.innerWidth / window.innerHeight < 0.9; };
  function camTarget(name) {
    const tall = isTall(), c = CAMS[name], v = (tall ? c.t : c.d).slice();
    if (tall && name === "counter") v[0] = Math.max(120, Math.min(camFocus - 400, 700));
    return v;
  }
  function camApply(v) {
    camNow = v; S.setAttribute("viewBox", v.map(function (n) { return n.toFixed(1); }).join(" "));
    S.setAttribute("preserveAspectRatio", isTall() ? "xMidYMid meet" : "xMidYMid slice");
  }
  async function cam(name, ms, focusX) {
    if (focusX != null) camFocus = focusX;
    camName = name; const from = (camNow || camTarget(name)).slice(), to = camTarget(name);
    if (!ms) { camApply(to); return; }
    await tween(ms, function (k) { camApply(from.map(function (n, i) { return lerp(n, to[i], k); })); });
  }
  function frame() { camApply(camTarget(camName)); }
  frame(); window.addEventListener("resize", frame);
  const q = function (id) { return S.querySelector("#" + id); };

  /* ---------- state ---------- */
  const st = { recipe: null, ware: "pot", tin: null, got: {}, step: 0, busy: false, stage: "menu", inside: null, brown: 0 };
  function artOf(id) { const a = ING[id][2]; if (typeof a === "function") return a(); return VEG[a].art; }

  /* ---------- the counter seen from above, through the cook's own eyes ---------- */
  const TS = $("cook-top");
  const tq = function (id) { return TS.querySelector("#" + id); };
  function LAYOUT() {
    if (isTall()) return { W: 800, H: 1290, tall: true, pot: [400, 700], R: 170, knob: [640, 830], bowl: [150, 945], bowlR: 92, tin: [610, 965], tinR: 88, board: [360, 1135, 440, 170], oven: [700, 1250], ing: { y0: 345, dy: 112, per: 6, x0: 100, dx: 120, r: 42 }, sh: [520, 1750], cup: null };
    return { W: 1600, H: 900, tall: false, pot: [620, 480], R: 180, knob: [905, 700], bowl: [1130, 565], bowlR: 100, tin: [1460, 330], tinR: 90, board: [1150, 300, 420, 200], oven: [1420, 850], ing: { y0: 98, dy: 0, per: 99, x0: 415, dx: 114, r: 45 }, sh: [1050, 1300], cup: [1490, 600] };
  }
  let L = LAYOUT();
  function topFrame() { L = LAYOUT(); TS.setAttribute("viewBox", "0 0 " + L.W + " " + L.H); TS.setAttribute("preserveAspectRatio", L.tall ? "xMidYMin meet" : "xMidYMid slice"); }
  function rnd(i) { const x = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return x - Math.floor(x); }

  /* what an ingredient looks like from above, in its little bowl */
  function piece(shape, col, parent, x, y, i) {
    const r = (i * 53 % 40) - 20; let e;
    if (shape === "strand") e = el("path", { d: "M" + (x - 16) + " " + y + " q8 -10 16 0 t16 0", stroke: col, "stroke-width": 5, fill: "none", "stroke-linecap": "round" }, parent);
    else if (shape === "curl") e = el("path", { d: "M" + (x - 8) + " " + (y + 4) + " q-2 -14 10 -12 q10 4 2 14", stroke: col, "stroke-width": 7, fill: "none", "stroke-linecap": "round" }, parent);
    else if (shape === "shred") e = el("rect", { x: x - 9, y: y - 2, width: 18, height: 4.5, rx: 2, fill: col, transform: "rotate(" + r * 3 + " " + x + " " + y + ")" }, parent);
    else if (shape === "grain") e = el("ellipse", { cx: x, cy: y, rx: 3.6, ry: 2.4, fill: col, "stroke-width": 1.4 }, parent);
    else if (shape === "leaf") e = el("ellipse", { cx: x, cy: y, rx: 11, ry: 6, fill: col, transform: "rotate(" + r * 4 + " " + x + " " + y + ")" }, parent);
    else if (shape === "disc") e = el("circle", { cx: x, cy: y, r: 11, fill: col }, parent);
    else if (shape === "crumb" || shape === "dot") e = el("circle", { cx: x, cy: y, r: shape === "dot" ? 6 : 5.5, fill: col }, parent);
    else {
      e = el("g", { transform: "rotate(" + r + " " + x + " " + y + ")" }, parent);
      el("rect", { x: x - 7.5, y: y - 6, width: 15, height: 12, rx: 3.2, fill: col }, e);
      el("rect", { x: x - 5, y: y - 4.4, width: 8, height: 4, rx: 1.6, fill: "#fff", opacity: 0.28, stroke: "none" }, e);
      el("path", { d: "M" + (x - 6) + " " + (y + 3.4) + " H" + (x + 6), stroke: "#000", "stroke-width": 1.4, opacity: 0.18 }, e);
    }
    e.setAttribute("data-col", col); e.setAttribute("data-shape", shape);
    return e;
  }
  function bowlArt(id, r) {
    const e = ING[id], col = e[3], mode = e[4], shape = e[5], pl = e[1];
    const g = el("g", {});
    const base = pl === "spice" ? ["#e2c697", "#c9a56e"] : pl === "fridge" ? ["#f7f1e2", "#d9cdb0"] : ["#ecd7ab", "#c9a56e"];
    g.innerHTML = '<ellipse cx="6" cy="9" rx="' + r + '" ry="' + (r - 4) + '" fill="#3a2416" opacity=".22" stroke="none"/><circle r="' + r + '" fill="' + base[0] + '"/><circle r="' + (r - 8) + '" fill="' + base[1] + '" opacity=".45" stroke="none"/><circle r="' + (r - 11) + '" fill="#f3e8d0"/>';
    const c = el("g", { class: "bcont" }, g), ri = r - 16;
    if (!{ eggs: 1, bread: 1, pastry: 1, pizzadough: 1, lemon: 1, tuna: 1 }[id] && mode !== "liq" && mode !== "dust") {
      const w = el("g", { class: "bwhole" }, c); w.innerHTML = '<g class="bwi">' + artOf(id) + "</g>"; return g;
    }
    const dots = function (n, f) { for (let i = 0; i < n; i++) { const a = rnd(i + id.length) * 6.28, d = Math.sqrt(rnd(i * 3 + 7)) * ri * 0.8; f(Math.cos(a) * d, Math.sin(a) * d, i); } };
    if (id === "eggs") [[-18, -12], [16, -8], [-2, 18]].forEach(function (p, i) { el("ellipse", { cx: p[0], cy: p[1], rx: 17, ry: 22, fill: i === 1 ? "#e9d3aa" : "#f3e4c6", transform: "rotate(" + (i * 50 - 30) + " " + p[0] + " " + p[1] + ")" }, c); });
    else if (id === "bread") [[-14, 8], [6, -2], [20, -12]].forEach(function (p, i) { el("rect", { x: p[0] - 24, y: p[1] - 24, width: 48, height: 48, rx: 10, fill: "#e6c288", transform: "rotate(" + (i * 12 - 10) + " " + p[0] + " " + p[1] + ")" }, c); });
    else if (id === "pastry" || id === "pizzadough") { el("circle", { r: ri - 2, fill: col }, c); el("circle", { r: ri - 14, fill: "none", "stroke-width": 2, opacity: 0.4 }, c); el("path", { d: "M-18 -14 q10 -8 24 -4", stroke: "#fff", "stroke-width": 4, opacity: 0.5, fill: "none" }, c); }
    else if (id === "tuna") { el("circle", { r: ri - 2, fill: "#cdd1d0" }, c); el("circle", { r: ri - 10, fill: "#e0b6a2" }, c); dots(7, function (x, y, i) { el("ellipse", { cx: x * 0.8, cy: y * 0.8, rx: 9, ry: 5, fill: "#d39a85", "stroke-width": 1.6, transform: "rotate(" + i * 40 + " " + x + " " + y + ")" }, c); }); }
    else if (id === "lemon") [[-14, -10], [14, 12]].forEach(function (p) { el("circle", { cx: p[0], cy: p[1], r: 24, fill: "#f0d24a" }, c); el("circle", { cx: p[0], cy: p[1], r: 18, fill: "#f6e486", "stroke-width": 1.6 }, c); el("path", { d: "M" + p[0] + " " + (p[1] - 18) + " V" + (p[1] + 18) + " M" + (p[0] - 18) + " " + p[1] + " H" + (p[0] + 18), "stroke-width": 1.6, opacity: 0.6 }, c); });
    else if (id === "tomato") dots(4, function (x, y) { el("circle", { cx: x * 0.7, cy: y * 0.7, r: 17, fill: "#d6452e" }, c); el("path", { d: "M" + (x * 0.7 - 6) + " " + (y * 0.7 - 3) + " l6 6 l6 -6", "stroke-width": 2, stroke: "#6f8a3e", fill: "none" }, c); });
    else if (mode === "liq") { el("circle", { r: ri - 2, fill: col }, c); el("circle", { r: ri - 2, fill: "none", "stroke-width": 2, opacity: 0.5 }, c); el("path", { d: "M-" + (ri * 0.55) + " -" + (ri * 0.3) + " q" + (ri * 0.2) + " -" + (ri * 0.3) + " " + (ri * 0.5) + " -" + (ri * 0.45), stroke: "#fff", "stroke-width": 4, opacity: 0.55, fill: "none", "stroke-linecap": "round" }, c); }
    else if (mode === "dust") { el("circle", { r: ri * 0.62, fill: col }, c); dots(14, function (x, y) { el("circle", { cx: x * 0.6, cy: y * 0.6, r: 2, fill: col, "stroke-width": 0.8 }, c); }); }
    else dots(shape === "strand" || shape === "leaf" ? 8 : shape === "disc" ? 6 : 12, function (x, y, i) { piece(shape || "cube", col, c, x, y, i); });
    return g;
  }

  /* ---------- the scene ---------- */
  function usesPot(r) {
    return !r || r.steps.some(function (s) { return s[0] === "heat" || s[0] === "flip" || tapOf(s) === "vessel" || (s[0] === "move" && norm(s[2]) === "vessel"); });
  }
  function buildTop() {
    topFrame();
    const noPot = !usesPot(st.recipe);
    if (noPot) { if (st.recipe.tin && st.recipe.tin !== "bowl") { L.tin = L.pot.slice(); L.tinR = L.tall ? 120 : 140; } else { L.bowl = L.pot.slice(); L.bowlR = L.tall ? 130 : 150; } }
    const W = L.W, H = L.H, P = L.pot, R = L.R;
    let m = '<defs><pattern id="twood" width="400" height="130" patternUnits="userSpaceOnUse"><rect width="400" height="130" fill="#c99a5e"/><path d="M0 1 H400" stroke="#9a6a3c" stroke-width="5"/><path d="M30 34 q90 -8 190 0 M220 88 q70 -8 160 0 M60 108 q50 -5 100 0" stroke="#e0b378" stroke-width="3" fill="none" opacity=".7"/><path d="M110 15 q30 -5 60 0" stroke="#b27a44" stroke-width="2.4" fill="none" opacity=".7"/></pattern>' +
      '<radialGradient id="tvig" cx="50%" cy="50%" r="72%"><stop offset=".55" stop-color="#1a0d08" stop-opacity="0"/><stop offset="1" stop-color="#1a0d08" stop-opacity=".55"/></radialGradient>' +
      '<radialGradient id="toglow" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#e8862f"/></radialGradient></defs>';
    m += '<rect x="-500" y="-500" width="' + (W + 1000) + '" height="' + (H + 1000) + '" fill="url(#twood)"/>';
    // a gingham cloth the ingredient bowls sit on
    if (!L.tall) m += '<g filter="url(#wobbleM)" stroke="' + INK + '" stroke-width="4"><rect x="330" y="26" width="1190" height="148" rx="6" fill="url(#cgingham2)" transform="rotate(-.4 900 100)"/></g>';
    else m += '<g filter="url(#wobbleM)" stroke="' + INK + '" stroke-width="4"><rect x="30" y="290" width="740" height="250" rx="6" fill="url(#cgingham2)"/></g>';
    // the hob
    m += '<g id="thob" ' + (noPot ? 'display="none" ' : "") + 'filter="url(#wobbleM)" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"><rect x="' + (P[0] - R - 50) + '" y="' + (P[1] - R - 50) + '" width="' + (2 * R + 100) + '" height="' + (2 * R + 100) + '" rx="26" fill="#efe3c4"/>' +
      '<circle cx="' + P[0] + '" cy="' + P[1] + '" r="' + (R + 18) + '" fill="#2f2a26"/><circle cx="' + P[0] + '" cy="' + P[1] + '" r="' + (R - 20) + '" fill="#4a4540"/>' +
      '<g stroke-width="9" stroke="#3a3632"><path d="M' + (P[0] - R - 30) + " " + P[1] + " H" + (P[0] + R + 30) + " M" + P[0] + " " + (P[1] - R - 30) + " V" + (P[1] + R + 30) + '"/></g>' +
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(function (q) { return '<circle cx="' + (P[0] + q[0] * (R + 6)) + '" cy="' + (P[1] + q[1] * (R + 6)) + '" r="0" />'; }).join("") + "</g>";
    // the knob, with its little heat scale
    const K = L.knob;
    m += '<g id="tknob" class="ltap"' + (noPot ? ' display="none"' : "") + ' role="button" tabindex="0" aria-label="The stove knob" transform="translate(' + K[0] + " " + K[1] + ')"><g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"><circle r="52" fill="#efe3c4"/><path d="M-38 24 A44 44 0 1 1 38 24" fill="none" stroke="#c4502a" stroke-width="7" stroke-linecap="round" opacity=".8"/><g fill="#5a2a1c" stroke="none"><circle cx="-38" cy="24" r="3.4"/><circle cx="0" cy="-44" r="3.4"/><circle cx="38" cy="24" r="3.4"/></g><ellipse cx="4" cy="6" rx="32" ry="30" fill="#3a2416" opacity=".25" stroke="none"/><circle r="30" fill="#c9a24a"/><circle r="22" fill="#e2b55a"/><g id="tknobline"><path d="M0 -4 V-26" stroke-width="5" stroke-linecap="round"/></g></g><circle r="64" fill="transparent"/></g>';
    // the cutting board
    const B = L.board;
    m += '<g id="tboard" transform="translate(' + B[0] + " " + B[1] + ')"><g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4.4" stroke-linejoin="round"><rect x="' + (-B[2] / 2 + 8) + '" y="' + (-B[3] / 2 + 12) + '" width="' + B[2] + '" height="' + B[3] + '" rx="22" fill="#3a2416" opacity=".22" stroke="none"/><rect x="' + (-B[2] / 2) + '" y="' + (-B[3] / 2) + '" width="' + B[2] + '" height="' + B[3] + '" rx="22" fill="#d9a968"/><rect x="' + (-B[2] / 2 + 14) + '" y="' + (-B[3] / 2 + 14) + '" width="' + (B[2] - 28) + '" height="' + (B[3] - 28) + '" rx="14" fill="none" stroke-width="2.2" opacity=".35"/><circle cx="' + (B[2] / 2 - 30) + '" cy="' + (-B[3] / 2 + 26) + '" r="9" fill="#a97a42" stroke-width="2.6"/></g><g id="tboardItem"></g><g id="tpieces"></g><rect x="' + (-B[2] / 2) + '" y="' + (-B[3] / 2) + '" width="' + B[2] + '" height="' + B[3] + '" fill="transparent"/></g>';
    // the pot and the pan (swapped when a recipe wants it)
    m += '<g id="tvessel" class="ltap"' + (noPot ? ' display="none"' : "") + ' role="button" tabindex="0" aria-label="The pot" transform="translate(' + P[0] + " " + P[1] + ')"><g id="tflames" class="tflames"><circle r="' + (R + 30) + '" fill="none" stroke="#f4b24a" stroke-width="14" stroke-dasharray="16 11" stroke-linecap="round"/><circle r="' + (R + 30) + '" fill="none" stroke="#e8662f" stroke-width="6" stroke-dasharray="9 18" stroke-linecap="round"/></g>' +
      '<g id="tpotart" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4.6" stroke-linejoin="round"><ellipse cx="9" cy="12" rx="' + (R + 20) + '" ry="' + (R + 16) + '" fill="#3a2416" opacity=".25" stroke="none"/><path d="M-' + (R + 22) + ' -14 q-34 0 -34 14 q0 14 34 14" fill="none" stroke-width="12"/><path d="M' + (R + 22) + ' -14 q34 0 34 14 q0 14 -34 14" fill="none" stroke-width="12"/><circle r="' + (R + 14) + '" fill="#4a7a70"/><circle r="' + (R + 2) + '" fill="#3a6a60"/><circle r="' + (R - 12) + '" fill="#26302c"/><path d="M-' + (R - 6) + ' -50 A' + (R + 6) + " " + (R + 6) + ' 0 0 1 -50 -' + (R - 6) + '" stroke="#fff" stroke-width="8" opacity=".25" fill="none" stroke-linecap="round" transform="translate(0 0)"/></g>' +
      '<g id="tpanart" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4.6" stroke-linejoin="round" display="none"><ellipse cx="9" cy="12" rx="' + (R + 14) + '" ry="' + (R + 10) + '" fill="#3a2416" opacity=".25" stroke="none"/><g transform="rotate(118)"><path d="M' + (R - 10) + ' -22 L' + (R + 190) + ' -16 Q' + (R + 206) + ' 0 ' + (R + 190) + ' 16 L' + (R - 10) + ' 22Z" fill="#6a5a50"/><circle cx="' + (R + 176) + '" cy="0" r="7" fill="#2f2a26" stroke-width="2.4"/></g><circle r="' + (R + 8) + '" fill="#5a4a42"/><circle r="' + (R - 6) + '" fill="#4a3c36"/><circle r="' + (R - 18) + '" fill="#2b2420"/></g>' +
      '<circle id="tsurf0" r="0" fill="#cdb98a" stroke="none" opacity="0"/><g id="tcont0" stroke="' + INK + '" stroke-linejoin="round"><g id="theap0" stroke-width="2.2"></g><g id="tlay0" stroke-width="3"></g></g><g id="tbub"></g><circle r="' + (R + 24) + '" fill="transparent"/></g>';
    // the mixing bowl
    const BW = L.bowl, BR = L.bowlR;
    m += '<g id="tbowl" class="ltap" role="button" tabindex="0" aria-label="The bowl" transform="translate(' + BW[0] + " " + BW[1] + ')"><g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4.4" stroke-linejoin="round"><ellipse cx="8" cy="11" rx="' + BR + '" ry="' + (BR - 4) + '" fill="#3a2416" opacity=".25" stroke="none"/><circle r="' + BR + '" fill="#f3e8c8"/><circle r="' + (BR - 8) + '" fill="none" stroke="#4f8a82" stroke-width="5" opacity=".9"/><circle r="' + (BR - 18) + '" fill="#e8d9b0"/></g>' +
      '<circle id="tsurf1" r="0" fill="#cdb98a" stroke="none" opacity="0"/><g id="tcont1" stroke="' + INK + '" stroke-linejoin="round"><g id="theap1" stroke-width="2.4"></g></g><circle r="' + (BR + 14) + '" fill="transparent"/></g>';
    // the tin / tray / plate
    const TN = L.tin;
    m += '<g id="ttin" class="ltap" role="button" tabindex="0" aria-label="The tin" transform="translate(' + TN[0] + " " + TN[1] + ')" opacity="0"><g id="ttinart" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"></g><circle id="tsurf2" r="0" fill="#e6c78a" stroke="none" opacity="0"/><g id="tcont2" stroke="' + INK + '" stroke-linejoin="round"><g id="tlay2" stroke-width="3"></g><g id="theap2" stroke-width="2.4"></g></g><circle r="' + (L.tinR + 16) + '" fill="transparent"/></g>';
    // the oven, under the counter: its door peeks over the front edge
    const O = L.oven;
    m += '<g id="toven" class="ltap" role="button" tabindex="0" aria-label="The oven" transform="translate(' + O[0] + " " + O[1] + ')"><g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4.6" stroke-linejoin="round"><rect x="-130" y="-20" width="260" height="120" rx="12" fill="#efe3c4"/><rect x="-130" y="-20" width="260" height="22" rx="10" fill="#6f9a8e"/><rect x="-104" y="14" width="208" height="76" rx="8" fill="#2f2a26"/><rect id="toglass" x="-98" y="20" width="196" height="64" rx="6" fill="url(#toglow)" opacity="0"/><path d="M-112 8 H112" stroke-width="6" stroke-linecap="round" fill="none"/></g><rect x="-140" y="-30" width="280" height="140" fill="transparent"/></g>';
    // a cup of tea, for company
    if (L.cup) m += '<g transform="translate(' + L.cup[0] + " " + L.cup[1] + ')" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3.6"><ellipse cx="5" cy="8" rx="64" ry="58" fill="#3a2416" opacity=".2" stroke="none"/><circle r="60" fill="#f3e8c8"/><circle r="54" fill="none" stroke="#9bb7c9" stroke-width="3"/><circle r="38" fill="#fbf3dc"/><circle r="31" fill="#b9733f"/><path d="M-14 -10 q10 -8 22 -4" stroke="#fff" stroke-width="4" opacity=".45" fill="none"/><path d="M38 -4 q26 4 22 22" fill="none" stroke-width="7"/></g>';
    // the ingredient bowls, each with a paper name tag
    m += '<g id="tshells"></g><g id="tings"></g><g id="tfx" pointer-events="none"></g><ellipse id="thalo" class="lhalo" cx="0" cy="0" rx="10" ry="10"/>';
    // the arm and hand
    m += '<g id="tover"><rect width="' + W + '" height="' + H + '" fill="url(#tvig)" pointer-events="none"/><rect width="' + W + '" height="' + H + '" fill="#fff" filter="url(#grainF)" opacity=".45" pointer-events="none" style="mix-blend-mode:multiply"/></g>';
    TS.innerHTML = m;
    const df = TS.querySelector("defs");
    df.insertAdjacentHTML("beforeend", '<pattern id="cgingham2" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#f6ecd2"/><rect width="20" height="40" fill="#c9553f" opacity=".5"/><rect width="40" height="20" fill="#c9553f" opacity=".5"/></pattern>');
    TG.vessel = { g: tq("tvessel"), surf: tq("tsurf0"), heap: tq("theap0"), lay: tq("tlay0"), cont: tq("tcont0") };
    TG.bowl = { g: tq("tbowl"), surf: tq("tsurf1"), heap: tq("theap1"), lay: null, cont: tq("tcont1") };
    TG.tin = { g: tq("ttin"), surf: tq("tsurf2"), heap: tq("theap2"), lay: tq("tlay2"), cont: tq("tcont2") };
    ["tvessel", "tbowl", "ttin", "tboard", "tknob", "toven"].forEach(function (id) {
      const e = tq(id), nm = { tvessel: "vessel", tbowl: "bowl", ttin: "tin", tboard: "board", tknob: "knob", toven: "oven" }[id];
      e.addEventListener("click", function () { tapped(nm); });
      e.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); tapped(nm); } });
    });
    tfx = tq("tfx"); thalo = tq("thalo"); RR = buildRig(1); LL = buildRig(-1);
    wareSwap(st.recipe ? (st.recipe.ware || "pot") : "pot"); setTin(st.recipe && st.recipe.tin !== "bowl" ? st.recipe.tin : "none");
    st.brown = 0; C.vessel = { lvl: 0, col: "#cdb98a", top: 0, n: 0 }; C.bowl = { lvl: 0, col: "#cdb98a", top: 0, n: 0 }; C.tin = { lvl: 0, col: "#e6c78a", top: 0, n: 0 };
    const usesBowl = st.recipe && st.recipe.steps.some(function (s) { return s.indexOf("bowl") > 0; });
    tq("tbowl").setAttribute("opacity", usesBowl ? 1 : 0); tq("tbowl").style.pointerEvents = usesBowl ? "" : "none";
  }
  let RR = null, LL = null, tfx = null, thalo = null;
  const TG = {}, C = { vessel: {}, bowl: {}, tin: {} }, MAT = {};
  let uses = {};

  /* ---------- the bowls of ingredients ---------- */
  function usedIn(s) { const t = s[0]; if (t === "chop" || t === "add" || t === "roll" || t === "stack") return [s[1]]; if (t === "season") return s[1]; return []; }
  function buildMat() {
    const box = tq("tings"); box.innerHTML = "";
    Object.keys(MAT).forEach(function (k) { delete MAT[k]; });
    const ids = need().filter(function (k) { return k !== "water"; }), I = L.ing, n = ids.length;
    uses = {}; st.recipe.steps.forEach(function (s) { usedIn(s).forEach(function (id) { uses[id] = (uses[id] || 0) + 1; }); });
    ids.forEach(function (id, i) {
      const row = Math.floor(i / I.per), col = i % I.per;
      const x = I.tall === undefined && L.tall ? I.x0 + col * I.dx : I.x0 + col * I.dx, y = I.y0 + row * I.dy;
      const r = ING[id][1] === "spice" ? I.r * 0.82 : I.r;
      const g = el("g", { class: "tbowlitem", transform: "translate(" + x + " " + y + ")", "data-id": id, role: "button", tabindex: 0, "aria-label": NAMES[id] }, box);
      const inner = el("g", { class: "ti", style: "opacity:0" }, g);
      const ring = el("circle", { class: "tring", r: r + 12, fill: "none", stroke: "#fff3c4", "stroke-width": 5, "stroke-dasharray": "12 10", opacity: 0 }, inner);
      const art = el("g", { filter: "url(#wobbleS)", stroke: INK, "stroke-width": 3.2, "stroke-linejoin": "round", "stroke-linecap": "round" }, inner);
      const ba = bowlArt(id, r); art.appendChild(ba);
      const wh = ba.querySelector(".bwhole");
      if (wh) { const bb = wh.getBBox(), k = Math.min(1.9 * r / (bb.width || 1), 1.6 * r / (bb.height || 1), 1.3); wh.firstChild.setAttribute("transform", "translate(" + (-(bb.x + bb.width / 2) * k).toFixed(1) + " " + (-(bb.y + bb.height / 2) * k).toFixed(1) + ") scale(" + k.toFixed(3) + ")"); }
      const tw = Math.min(112, Math.max(80, NAMES[id].length * 13 + 20)), fit = NAMES[id].length * 12.5 > tw - 12 ? ' textLength="' + (tw - 14) + '" lengthAdjust="spacingAndGlyphs"' : "";
      const tag = el("g", { transform: "translate(0 " + (r + 18) + ")" }, inner);
      tag.innerHTML = '<rect x="' + (-tw / 2) + '" y="-14" width="' + tw + '" height="28" rx="3" fill="#f6ecd0" stroke="' + INK + '" stroke-width="2.4" transform="rotate(-1.5)"/><text x="0" y="6" text-anchor="middle"' + fit + ' font-family="Chewy, cursive" font-size="17" fill="#a3432c" stroke="none" letter-spacing="1">' + NAMES[id].toUpperCase() + "</text>";
      const hit = el("rect", { x: -r - 8, y: -r - 8, width: 2 * r + 16, height: 2 * r + 50, fill: "transparent" }, g);
      MAT[id] = { x: x, y: y, r: r, g: g, mi: inner, art: ba, cont: ba.querySelector(".bcont") };
      g.addEventListener("click", function () { tappedMat(id); });
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tappedMat(id); } });
    });
  }
  async function layMat() { for (const id of Object.keys(MAT)) { MAT[id].mi.style.opacity = 1; SFX.pop(1); await sleep(200); } }
  function matNeed(ids) { Object.keys(MAT).forEach(function (k) { MAT[k].g.classList.toggle("need", ids.indexOf(k) >= 0); const rg = MAT[k].g.querySelector(".tring"); if (rg) rg.setAttribute("opacity", ids.indexOf(k) >= 0 ? 0.95 : 0); }); }
  function matDone(id) { uses[id] = (uses[id] || 1) - 1; if (uses[id] <= 0 && MAT[id] && MAT[id].cont) MAT[id].cont.style.opacity = 0; }

  /* ---------- what is in the vessels ---------- */
  function geoR(t) { return t === "vessel" ? (st.ware === "pan" ? L.R - 18 : L.R - 12) : t === "bowl" ? L.bowlR - 18 : (st.tin === "pizza" ? L.tinR - 10 : L.tinR - 22); }
  function stacking(t) { return t === "tin" ? st.tin === "plate" : t === "vessel" && st.ware === "pan" && !!st.recipe && st.recipe.tin === "plate"; }
  function liquid(t, col, amt) {
    const c = C[t], s = TG[t].surf; c.col = c.lvl ? mix(c.col, col, 0.45) : col; c.lvl = Math.min(1, c.lvl + (amt || 0.3));
    s.setAttribute("fill", c.col); s.setAttribute("opacity", 1); s.setAttribute("r", (geoR(t) * (0.5 + 0.5 * c.lvl)).toFixed(1)); s.setAttribute("stroke", INK); s.setAttribute("stroke-width", 2);
  }
  function pieces(t, col, shape, n) {
    const P = TG[t].heap, R = geoR(t) * 0.78;
    for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, d = Math.sqrt(Math.random()) * R; piece(shape, col, P, Math.cos(a) * d, Math.sin(a) * d, P.childNodes.length + i); }
    while (P.childNodes.length > 46) P.removeChild(P.firstChild);
  }
  function layer(t, col, w, h, bread) {
    const c = C[t], Lg = TG[t].lay; c.n = (c.n || 0) + 1; const o = c.n * 5;
    const s = w * 0.55;
    el("rect", { x: -s - o + 5, y: -s - o * 1.3 + 8, width: 2 * s, height: 2 * s, rx: 14, fill: "#3a2416", opacity: 0.18, stroke: "none" }, Lg);
    el("rect", { x: -s - o, y: -s - o * 1.3, width: 2 * s, height: 2 * s, rx: 14, fill: col, "stroke-width": bread ? 4 : 3 }, Lg);
    if (bread) el("rect", { x: -s - o + 10, y: -s - o * 1.3 + 10, width: 2 * s - 20, height: 2 * s - 20, rx: 8, fill: "#f0d5a0", "stroke-width": 1.4, opacity: 0.9 }, Lg);
  }
  function stackIn(t, id) {
    const e = ING[id], pw = t === "tin" ? 112 : 108;
    if (e[6] === "bread") layer(t, "#e0b574", pw, 0, true);
    else if (e[4] === "liq") layer(t, e[3], pw - 22, 0);
    else layer(t, e[3], pw - (e[5] === "leaf" ? 4 : 14), 0);
  }
  function addTo(t, id) {
    const e = ING[id], mode = e[4], shape = e[5], lay = e[6], R = geoR(t);
    if (t === "tin" && st.tin === "pizza") {
      if (lay === "sauce") { el("circle", { r: R - 6, fill: e[3] }, TG.tin.lay); return; }
      if (lay === "cheese") { el("circle", { r: R - 14, fill: "#f2e3b0" }, TG.tin.lay); pieces(t, e[3], "shred", 16); return; }
    }
    if (stacking(t)) { stackIn(t, id); return; }
    if (mode === "liq") { if (t === "tin" && st.tin === "pizza") { for (let i = 0; i < 5; i++) el("ellipse", { cx: (i - 2) * 20, cy: (i % 2) * 14 - 8, rx: 9, ry: 3.6, fill: "#f3e08a", opacity: 0.7, "stroke-width": 0 }, TG.tin.lay); } else liquid(t, e[3], t === "bowl" && id !== "tuna" ? 0.25 : 0.32); return; }
    if (mode === "dust") { pieces(t, e[3], "dot", 4); return; }
    pieces(t, e[3], shape || "cube", shape === "leaf" ? 10 : shape === "disc" ? 9 : shape === "strand" ? 8 : 10);
    if (C[t].lvl) { C[t].col = mix(C[t].col, e[3], 0.12); TG[t].surf.setAttribute("fill", C[t].col); }
  }
  function tintFromHeap(t, a) {
    const ch = TG[t].heap.childNodes, c = C[t]; if (!c.lvl || !ch.length) return;
    let r = 0, g = 0, b = 0, n = 0;
    Array.prototype.forEach.call(ch, function (e) { const h = e.getAttribute("data-col"); if (h && h.length === 7) { r += parseInt(h.substr(1, 2), 16); g += parseInt(h.substr(3, 2), 16); b += parseInt(h.substr(5, 2), 16); n++; } });
    if (!n) return;
    c.col = mix(c.col, "#" + [r, g, b].map(function (v) { return Math.round(v / n).toString(16).padStart(2, "0"); }).join(""), a); TG[t].surf.setAttribute("fill", c.col);
  }
  function bakeLook(a) {
    const f = a ? "sepia(" + (0.55 * a).toFixed(2) + ") saturate(" + (1 + 0.7 * a).toFixed(2) + ") brightness(" + (1 - 0.14 * a).toFixed(2) + ")" : "";
    ["tsurf2", "tlay2", "theap2", "tlay0", "theap0"].forEach(function (id) { const e = tq(id); if (e) e.style.filter = f; });
  }
  function clearT(t) {
    const g = TG[t]; if (!g) return;
    C[t].lvl = 0; C[t].top = 0; C[t].n = 0; g.surf.setAttribute("opacity", 0); g.surf.setAttribute("r", 0); g.heap.innerHTML = ""; if (g.lay) g.lay.innerHTML = ""; g.heap.removeAttribute("transform");
  }
  function moveC(from, to) {
    const A = C[from];
    if (stacking(to) && (stacking(from) || from === "bowl")) {
      if (from === "bowl") layer(to, mix(A.col, "#e8cfa0", 0.15), 96, 0);
      else { TG[to].lay.insertAdjacentHTML("beforeend", TG[from].lay.innerHTML); C[to].n = C[from].n; }
    } else {
      Array.prototype.slice.call(TG[from].heap.childNodes, 0, 18).forEach(function (n) { pieces(to, n.getAttribute("data-col"), n.getAttribute("data-shape"), 1); });
      if (A.lvl) liquid(to, A.col, A.lvl * 0.8);
    }
    clearT(from);
  }
  function wareSwap(w) {
    st.ware = w; tq("tpotart").setAttribute("display", w === "pot" ? "" : "none"); tq("tpanart").setAttribute("display", w === "pan" ? "" : "none");
    tq("tvessel").setAttribute("aria-label", w === "pan" ? "The pan" : "The pot"); clearT("vessel");
    tq("tflames").querySelectorAll("circle").forEach(function (c) { c.setAttribute("r", (w === "pan" ? L.R + 22 : L.R + 30)); });
  }
  function setTin(kind) {
    const R = L.tinR; st.tin = kind; clearT("tin");
    const A = {
      tart: '<ellipse cx="7" cy="10" rx="' + R + '" ry="' + (R - 4) + '" fill="#3a2416" opacity=".22" stroke="none"/><circle r="' + R + '" fill="#b9bdbd"/><circle r="' + (R - 8) + '" fill="#d6dada"/><circle r="' + (R - 20) + '" fill="#8f9393"/><circle r="' + (R - 8) + '" fill="none" stroke-dasharray="6 6" stroke-width="2.4" opacity=".5"/>',
      pizza: '<ellipse cx="7" cy="10" rx="' + R + '" ry="' + (R - 4) + '" fill="#3a2416" opacity=".22" stroke="none"/><circle r="' + R + '" fill="#8f9595"/><circle r="' + (R - 8) + '" fill="#c4c9c8"/><path d="M-50 -40 q40 -20 90 -8" stroke="#fff" stroke-width="5" opacity=".4" fill="none"/>',
      plate: '<ellipse cx="7" cy="10" rx="' + (R + 6) + '" ry="' + (R + 2) + '" fill="#3a2416" opacity=".22" stroke="none"/><circle r="' + (R + 6) + '" fill="#efe3c4"/><circle r="' + (R - 8) + '" fill="#f6ecd0"/><circle r="' + (R - 18) + '" fill="none" stroke="#4f8a82" stroke-width="4" opacity=".85"/>'
    };
    tq("ttinart").innerHTML = A[kind] || "";
    tq("ttin").setAttribute("aria-label", kind === "tart" ? "The tart tin" : kind === "pizza" ? "The baking tray" : "The plate");
    tq("ttin").setAttribute("opacity", A[kind] ? 1 : 0); tq("ttin").style.pointerEvents = A[kind] ? "" : "none";
  }

  /* ---------- two hands, always reaching up from the bottom of the view (same sleeves as the drinks corner) ---------- */
  const SK = "#ecc7a4";
  const HANDART = '<g transform="translate(0 -6)"><path d="M-23 12 H30 L33 42 H-26 Z" fill="' + SK + '"/>' +
    '<path d="M-29 -2 C-29 -14 -22 -20 -12 -20 H16 C26 -20 32 -14 32 -2 L33 24 C33 38 20 48 2 48 C-16 48 -29 38 -29 24 Z" fill="' + SK + '"/>' +
    '<path d="M-18 40 C-6 46 12 46 24 40" fill="none" stroke="#d6a47e" stroke-width="5" stroke-linecap="round" opacity=".7"/>' +
    '<rect x="-47" y="-4" width="21" height="42" rx="10.5" transform="rotate(28 -36 17)" fill="' + SK + '"/>' +
    '<rect x="-29" y="-40" width="14" height="42" rx="7" fill="' + SK + '"/><rect x="-14" y="-46" width="14" height="48" rx="7" fill="' + SK + '"/><rect x="1" y="-46" width="14" height="48" rx="7" fill="' + SK + '"/><rect x="16" y="-40" width="14" height="42" rx="7" fill="' + SK + '"/>' +
    '<path d="M-22 -26 V-14 M-7 -32 V-18 M8 -32 V-18 M23 -26 V-14" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".45"/><path d="M-22 -36 h5 M-7 -42 h5 M8 -42 h5 M23 -36 h5" stroke="#d6a47e" stroke-width="3" stroke-linecap="round" opacity=".8"/></g>';
  function buildRig(side) {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("pointer-events", "none"); g.setAttribute("opacity", 0);
    g.innerHTML = '<g filter="url(#wobbleS)"><path class="ra" fill="#b5683f" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><path class="rs" fill="#8f4a2e" opacity=".5"/><path class="rc" fill="#efe3c4" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/><path class="rr" fill="none" stroke="#d3c196" stroke-width="3" stroke-linecap="round"/></g>' +
      '<g class="rh" filter="url(#wobbleS)"><g class="rt" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"></g><g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" transform="scale(' + side + ' 1)">' + HANDART + "</g></g>";
    TS.insertBefore(g, tq("tover"));
    const q2 = function (c) { return g.querySelector("." + c); };
    return { side: side, g: g, arm: q2("ra"), shade: q2("rs"), cuff: q2("rc"), ribs: q2("rr"), h: q2("rh"), tool: q2("rt"), H: { x: 0, y: 0, t: 0 } };
  }
  function put(x, y, t, rg) {
    rg = rg || RR; rg.H = { x: x, y: y, t: t || 0 };
    const W = L.W, bx = W / 2 + rg.side * W * 0.13 + (x - W / 2) * 0.45, by = L.H + (L.tall ? 340 : 120);
    const ang = Math.atan2(x - bx, by - y) * 180 / Math.PI, rot = ang * 0.85 + (t || 0);
    rg.h.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + rot.toFixed(1) + ")");
    const r = rot * Math.PI / 180, ex = x - 38 * Math.sin(r), ey = y + 38 * Math.cos(r);
    const dx = bx - ex, dy = by - ey, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
    const cx = ex + ux * 26, cy = ey + uy * 26;
    const P = function (px, py, k) { return (px + nx * k).toFixed(1) + " " + (py + ny * k).toFixed(1); };
    rg.arm.setAttribute("d", "M" + P(cx, cy, 31) + " L" + P(bx, by, 86) + " L" + P(bx, by, -86) + " L" + P(cx, cy, -31) + "Z");
    rg.shade.setAttribute("d", "M" + P(cx, cy, 31) + " L" + P(bx, by, 86) + " L" + P(bx, by, 52) + " L" + P(cx, cy, 17) + "Z");
    rg.cuff.setAttribute("d", "M" + P(ex, ey, 26) + " L" + P(cx, cy, 33) + " L" + P(cx, cy, -33) + " L" + P(ex, ey, -26) + "Z");
    let rb = ""; for (let k = -20; k <= 20; k += 10) rb += "M" + P(ex, ey, k) + " L" + P(cx, cy, k * 1.2) + " ";
    rg.ribs.setAttribute("d", rb);
  }
  function showArm(rg, on) { rg.g.setAttribute("opacity", on ? 1 : 0); }
  async function go(x, y, t, ms, rg) {
    rg = rg || RR; const a = rg.H; showArm(rg, true);
    await tween(ms || 700, function (k) { put(lerp(a.x, x, k), lerp(a.y, y, k), lerp(a.t, t || 0, k), rg); });
  }
  function hide(rg) { (rg ? [rg] : [RR, LL]).forEach(function (r) { if (!r) return; showArm(r, false); r.tool.innerHTML = ""; r.tool.removeAttribute("transform"); }); }
  const OFF = function () { return L.H + (L.tall ? 340 : 200); };
  async function leave(rg) { SFX.whoosh(700); rg = rg || RR; await go(rg.H.x, OFF(), 0, 800, rg); hide(rg); }
  async function leaveBoth() { SFX.whoosh(700); await Promise.all([go(RR.H.x, OFF(), 0, 800, RR), go(LL.H.x, OFF(), 0, 800, LL)]); hide(); }
  function enter(kind, arg, x, rg) { rg = rg || RR; rg.tool.innerHTML = kind ? TOOLS[kind](arg) : ""; rg.tool.removeAttribute("transform"); put(x, OFF(), 0, rg); showArm(rg, true); }
  const ttoolOf = function () { return RR.tool; };

  const G = function (inner, extra) { return "<g " + (extra || "") + ">" + inner + "</g>"; };
  const TOOLS = {
    knife: function () { return G('<path d="M-9 16 V -22 H9 V 16 Z" fill="#7a4a2a"/><circle cx="0" cy="-4" r="2.4" fill="#e2b55a" stroke-width="1.5"/><path d="M-11 -22 H 11 L 13 -150 Q 4 -160 -8 -150 Z" fill="#dfe3e2"/><path d="M-4 -34 L -4 -138" stroke="#fff" stroke-width="3" opacity=".7"/>'); },
    spoon: function () { return G('<path d="M-6 18 L -4 -90 H 4 L 6 18 Z" fill="#c58a3a"/><ellipse cx="0" cy="-118" rx="24" ry="32" fill="#d49a4a"/><ellipse cx="0" cy="-118" rx="16" ry="23" fill="#b9803a" stroke-width="2"/>'); },
    ladle: function () { return G('<path d="M-5 18 L -4 -130 H 4 L 5 18 Z" fill="#b9bdbd"/><ellipse cx="0" cy="-172" rx="34" ry="38" fill="#d6dada"/><ellipse cx="0" cy="-172" rx="25" ry="29" fill="#aeb3b3" stroke-width="2"/><ellipse id="tladlesoup" cx="0" cy="-172" rx="22" ry="26" fill="#cdb98a" opacity="0" stroke="none"/>'); },
    whisk: function () { return G('<path d="M-6 18 L -5 -62 H 5 L 6 18 Z" fill="#b9bdbd"/><ellipse cx="0" cy="-108" rx="26" ry="48" fill="none" stroke="#cfd3d2" stroke-width="3.4"/><ellipse cx="0" cy="-108" rx="11" ry="46" fill="none" stroke="#cfd3d2" stroke-width="3"/>'); },
    spatula: function () { return G('<path d="M-6 18 L -5 -72 H 5 L 6 18 Z" fill="#7a4a2a"/><path d="M-28 -72 H28 L24 -150 H-24 Z" fill="#cfd3d2"/><path d="M-12 -84 V-138 M0 -84 V-138 M12 -84 V-138" stroke-width="2" fill="none" opacity=".6"/>'); },
    fork: function () { return G('<path d="M-6 18 L -4 -70 H 4 L 6 18 Z" fill="#b9bdbd"/><path d="M-18 -70 H18 V-108 M-18 -70 V-110 M-6 -70 V-112 M6 -70 V-112" fill="none" stroke="#cfd3d2" stroke-width="5" stroke-linecap="round"/><g id="tforkfood"></g>'); },
    jug: function () { return G('<circle cx="0" cy="-48" r="44" fill="#cfe0e4"/><circle cx="0" cy="-48" r="35" fill="#8fb9c6" stroke-width="2"/><path d="M-12 -86 l12 -22 l12 22" fill="#cfe0e4"/><path d="M34 -30 q40 8 26 36 q-8 12 -26 6" fill="none" stroke-width="6"/><path d="M-16 -62 q10 -8 24 -4" stroke="#fff" stroke-width="4" opacity=".6" fill="none"/>'); },
    egg: function () { return G('<g id="tegg"><ellipse cx="0" cy="-34" rx="19" ry="25" fill="#f3e4c6"/><path d="M-9 -46 q5 -8 12 -7" stroke="#fff" stroke-width="3.4" fill="none" opacity=".7"/><path id="tcrack" d="" stroke="#7a5a3a" stroke-width="2" fill="none"/></g>'); }
  };
  const TH = { knife: 70, spoon: 118, ladle: 172, whisk: 108, spatula: 112, fork: 90, jug: 48 };

  /* ---------- where things are, and the soft ring that says "this one" ---------- */
  function T(t) {
    const a = t === "vessel" ? L.pot : t === "bowl" ? L.bowl : t === "tin" ? L.tin : t === "oven" ? L.oven : t === "knob" ? L.knob : L.board;
    return { x: a[0], y: a[1] };
  }
  const HALOS = {
    vessel: function () { const p = T("vessel"); return [p.x, p.y, L.R + 40, L.R + 40]; }, bowl: function () { const p = T("bowl"); return [p.x, p.y, L.bowlR + 24, L.bowlR + 24]; },
    tin: function () { const p = T("tin"); return [p.x, p.y, L.tinR + 24, L.tinR + 24]; }, board: function () { const p = T("board"); return [p.x, p.y, L.board[2] / 2 + 20, L.board[3] / 2 + 20]; },
    knob: function () { const p = T("knob"); return [p.x, p.y, 70, 70]; }, oven: function () { const p = T("oven"); return [p.x, p.y + 30, 160, 70]; }
  };
  function setHalo(cx, cy, rx, ry, on) { if (!thalo) return; thalo.setAttribute("cx", cx); thalo.setAttribute("cy", cy); thalo.setAttribute("rx", rx); thalo.setAttribute("ry", ry); thalo.classList.toggle("on", !!on); }
  function haloOn(t) { const h = HALOS[t](); setHalo(h[0], h[1], h[2], h[3], true); }
  function haloOff() { setHalo(0, 0, 1, 1, false); }

  /* ---------- little effects, seen from above ---------- */
  function puffs(x, y, n, col) {
    for (let i = 0; i < n; i++) {
      const c = el("circle", { r: 5 + Math.random() * 5, fill: col || "#f6ebcf", stroke: INK, "stroke-width": 1.6 }, tfx);
      const dx = (Math.random() - 0.5) * 100, dy = (Math.random() - 0.5) * 70;
      tween(700, function (k) { c.setAttribute("cx", (x + dx * k).toFixed(1)); c.setAttribute("cy", (y + dy * k).toFixed(1)); c.setAttribute("opacity", 1 - k); c.setAttribute("r", (5 + 6 * k).toFixed(1)); }).then(function () { c.remove(); });
    }
  }
  function fall(x1, y1, x2, y2, col, n, shape) {
    for (let i = 0; i < n; i++) {
      const c = piece(shape || "dot", col, tfx, 0, 0, i + 3), dx = (Math.random() - 0.5) * 30, dy = (Math.random() - 0.5) * 20;
      c.setAttribute("stroke", INK); c.setAttribute("stroke-width", 1.4);
      sleep(i * 90).then(function () { return tween(420, function (k) { const e = k * k, s = 1 - 0.25 * k; c.setAttribute("transform", "translate(" + (x2 + dx).toFixed(1) + " " + lerp(y2 + dy - 34, y2 + dy, e).toFixed(1) + ") scale(" + s.toFixed(2) + ")"); c.setAttribute("opacity", k < 0.2 ? k * 5 : k > 0.85 ? (1 - k) * 6 : 1); }); }).then(function () { c.remove(); });
    }
  }
  function streamTo(x1, y1, x2, y2, col, w) {
    return el("path", { d: "M" + x1 + " " + y1 + " Q" + ((x1 + x2) / 2 + 6) + " " + ((y1 + y2) / 2) + " " + x2 + " " + y2, stroke: col, "stroke-width": w || 9, "stroke-linecap": "round", fill: "none", opacity: 0.92 }, tfx);
  }
  function ripple(x, y, col) {
    const c = el("circle", { cx: x, cy: y, r: 6, fill: "none", stroke: col || "#f6ebcf", "stroke-width": 3 }, tfx);
    tween(900, function (k) { c.setAttribute("r", (6 + 40 * k).toFixed(1)); c.setAttribute("opacity", 1 - k); }).then(function () { c.remove(); });
  }

  /* ---------- picking up a little bowl and carrying it ---------- */
  function bpos(id, x, y, rot, sc) {
    const m = MAT[id], s = sc || 1; m.cur = { x: x, y: y, rot: rot || 0, sc: s };
    m.g.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + (rot || 0).toFixed(1) + ") scale(" + s.toFixed(3) + ")");
    put(x, y + m.r * s + 16, 0);
  }
  async function takeBowl(id) {
    const m = MAT[id]; m.cur = { x: m.x, y: m.y, rot: 0, sc: 1 };
    enter(null, null, m.x); await go(m.x, m.y + m.r + 16, 0, 1100);
    SFX.rustle(); await sleep(260);
    await tween(420, function (k) { bpos(id, m.x, m.y - 6 * k, 0, 1 + 0.12 * k); });
  }
  async function carry(id, x, y, ms, rot, sc) {
    const a = MAT[id].cur;
    await tween(ms, function (k) { bpos(id, lerp(a.x, x, k), lerp(a.y, y, k), lerp(a.rot, rot || 0, k), lerp(a.sc, sc || a.sc, k)); });
  }
  async function putBack(id) {
    const m = MAT[id]; await carry(id, m.x, m.y, 1000, 0, 1); SFX.drop(); await sleep(200); await leave();
  }
  function tiltBowl(id, a) { const c = MAT[id].cont; if (c) c.style.transform = "translate(0," + (-a * 0.3) + "px)"; }
  // the other hand steadies a vessel while the first one works
  function gripSpot(t) {
    const p = T(t);
    if (t === "vessel" && st.ware === "pan") return { x: p.x - 0.47 * (L.R + 150), y: p.y + 0.88 * (L.R + 150) + 40 };
    if (t === "vessel") return { x: p.x - L.R - 40, y: p.y + 56 };
    if (t === "bowl") return { x: p.x - L.bowlR * 0.72, y: p.y + L.bowlR * 0.72 + 38 };
    return { x: p.x - L.tinR * 0.72, y: p.y + L.tinR * 0.72 + 38 };
  }
  async function grip(t) { const g = gripSpot(t); enter(null, null, g.x, LL); await go(g.x, g.y, 0, 900, LL); }
  async function ungrip() { await leave(LL); }

  /* ---------- the actions ---------- */
  const norm = function (t) { return t === "plate" ? "tin" : t; };
  function tname(t) { t = norm(t); return t === "vessel" ? (st.ware === "pan" ? "pan" : "pot") : t === "bowl" ? "bowl" : t === "tin" ? ({ tart: "tart tin", pizza: "baking tray", plate: "plate" }[st.tin] || "plate") : t === "oven" ? "oven" : "board"; }
  function tapOf(s) {
    const t = s[0];
    if (t === "chop" || t === "roll") return "board";
    if (t === "add" || t === "stack" || t === "season") return norm(s[2]);
    if (t === "mix" || t === "taste") return norm(s[1]);
    if (t === "heat") return "knob";
    if (t === "bake") return "oven";
    if (t === "move") return norm(s[1]);
    return "vessel";
  }
  function instr(s) {
    const t = s[0], n = function (id) { return NAMES[id].toLowerCase(); };
    if (t === "chop") return s[3] || "Chop the " + n(s[1]) + ".";
    if (t === "add") return s[3] || (s[1] === "water" ? "Fill the pot with water." : s[1] === "eggs" ? "Crack the eggs into the " + tname(s[2]) + "." : "Add the " + n(s[1]) + " to the " + tname(s[2]) + ".");
    if (t === "season") return s[3] || "Season with " + s[1].map(n).join(", ") + ".";
    if (t === "mix") return s[3] || "Stir it well.";
    if (t === "heat") return s[2] || "Let it cook.";
    if (t === "bake") return s[2] || "Bake it.";
    if (t === "move") return s[4] || "Move it over.";
    if (t === "roll") return s[3] || "Roll it out.";
    if (t === "stack") return s[3] || "Place the " + n(s[1]) + " on the " + tname(s[2]) + ".";
    if (t === "flip") return s[1] || "Flip it over.";
    return "Carry it to the table.";
  }
  function ingOf(s) { const u = usedIn(s); return u.length ? u[0] : null; }
  function tapHint(s) { const i = ingOf(s), w = tapOf(s); if (i && i !== "water") return "Tap the " + NAMES[i].toLowerCase() + "."; return w === "knob" ? "Tap the stove knob." : "Tap the " + tname(w) + "."; }
  const tipOf = function (t) { return { x: T(t).x, y: T(t).y + geoR(t) * 0.25 }; };

  /* cracking an egg properly: tap, tap, open it over the bowl, set the shell aside */
  async function aCrack(to) {
    const m = MAT.eggs, p = T(to), R = L.bowlR, n = Math.max(2, Math.min(4, parseInt(st.recipe.ing.eggs, 10) || 2));
    const shells = tq("tshells"), kids = m && m.cont ? Array.prototype.slice.call(m.cont.children) : [];
    await grip(to);
    for (let i = 0; i < n; i++) {
      enter("egg", null, m.x);
      await go(m.x, m.y + 60, 0, 1000); SFX.rustle(); await sleep(250);
      if (kids.length) { const k = kids[i % kids.length]; k.style.opacity = i < kids.length ? 0 : k.style.opacity; }
      const rimY = p.y + R - 4;
      await go(p.x + 6, rimY + 90, 0, 1100); await sleep(250);
      const crack = RR.tool.querySelector("#tcrack");
      await go(p.x + 6, rimY + 36, 0, 420); SFX.tick(); await go(p.x + 6, rimY + 54, 0, 260);
      await go(p.x + 6, rimY + 36, 0, 360); SFX.chop(); if (crack) crack.setAttribute("d", "M-14 -34 l6 -5 l5 6 l6 -6 l6 6 l6 -5 l5 5");
      await go(p.x + 6, rimY + 52, 0, 300); await sleep(350);
      await go(p.x, p.y + 52, 0, 900); await sleep(300);
      // it opens: two half shells, and the egg slips out
      const eg = RR.tool.querySelector("#tegg"); if (eg) eg.innerHTML = '<path d="M-19 -34 a19 25 0 0 1 38 0 l-6 5 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -5 Z" fill="#f3e4c6" transform="rotate(-24 -19 -34)"/><path d="M-19 -34 a19 25 0 0 0 38 0 l-6 -5 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 5 Z" fill="#f0dcb8" transform="translate(4 -10) rotate(26 19 -34)"/>';
      SFX.plop();
      const yolk = el("g", { opacity: 0 }, tfx);
      yolk.innerHTML = '<ellipse rx="26" ry="22" fill="#f6efdc" stroke="' + INK + '" stroke-width="2.4" opacity=".92"/><circle r="14" fill="#f2b134" stroke="' + INK + '" stroke-width="2.4"/><path d="M-7 -6 q4 -5 9 -3" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>';
      await tween(650, function (k) { yolk.setAttribute("opacity", Math.min(1, k * 3)); yolk.setAttribute("transform", "translate(" + (p.x + (i - 1) * 16) + " " + lerp(p.y + 10, p.y - 4 + (i % 2) * 14, k).toFixed(1) + ") scale(" + lerp(0.5, 1, k).toFixed(2) + " " + lerp(1.3, 1, k).toFixed(2) + ")"); });
      yolk.remove(); ripple(p.x, p.y, "#f6efdc"); SFX.drop();
      liquid(to, "#f6efdc", 0.18);
      const yl = el("g", { class: "yolk", transform: "translate(" + (p.x - p.x + (i - 1) * 22) + " " + ((i % 2) * 16 - 8) + ")" }, TG[to].heap);
      yl.innerHTML = '<circle r="14" fill="#f2b134" stroke="' + INK + '" stroke-width="2.2"/><path d="M-6 -5 q4 -5 8 -3" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>';
      await sleep(400);
      // the shells go to the side of the counter
      await go(p.x + R + 60, p.y + 20, 20, 800);
      RR.tool.innerHTML = ""; SFX.drop();
      const sh = el("g", { transform: "translate(" + (p.x + R + 40 + i * 26) + " " + (p.y + R * 0.4 + (i % 2) * 22) + ") rotate(" + (i * 47) + ")", stroke: INK, "stroke-width": 2.2 }, shells);
      sh.innerHTML = '<path d="M-15 0 a15 12 0 0 1 30 0 l-5 4 l-5 -5 l-5 5 l-5 -5 l-5 5 Z" fill="#f3e4c6"/><path d="M-12 5 a12 10 0 0 0 24 0 Z" fill="#ecd7b0"/>';
      await leave();
    }
    await ungrip(); matDone("eggs");
  }
  async function aAdd(id, to) {
    if (id === "eggs" && to === "bowl" && MAT.eggs) { await aCrack(to); return; }
    const e = ING[id], p = tipOf(to), R = geoR(to), mode = e[4], col = e[3], shape = e[5] || "cube";
    if (id === "water") {
      enter("jug", null, p.x); await go(p.x, p.y + R * 0.55 + 150, 0, 1000);
      await go(p.x, p.y + R * 0.55 + 84, 0, 700); await sleep(200);
      await tween(700, function (k) { put(p.x, p.y + R * 0.55 + 84, -26 * k); });
      const pr = SFX.pour(); pr.level(0.5); const s = streamTo(p.x, p.y + R * 0.55 + 6, p.x, p.y + R * 0.1, col, 9);
      await sleep(250); addTo(to, id); ripple(p.x, p.y, "#cfe6ee"); await sleep(900); pr.stop(); s.remove();
      await tween(500, function (k) { put(p.x, p.y + R * 0.55 + 84, -26 * (1 - k)); });
      await leave(); return;
    }
    const m = MAT[id], by = p.y + R * 0.45 + m.r * 0.95, steady = to === "bowl" || to === "vessel";
    await takeBowl(id);
    if (steady) await Promise.all([carry(id, p.x, by, 1200, 0, 1.12), grip(to)]); else await carry(id, p.x, by, 1200, 0, 1.12);
    await sleep(200);
    await tween(750, function (k) { bpos(id, p.x, by, -30 * k, 1.12); tiltBowl(id, 30 * k); });
    const lipx = p.x, lipy = by - m.r * 1.1;
    if (mode === "liq") {
      const pr = SFX.pour(); pr.level(0.5);
      const s = streamTo(lipx, lipy, p.x, p.y, col, 9);
      await sleep(250); addTo(to, id); ripple(p.x, p.y, col); await sleep(750); pr.stop(); s.remove();
    } else {
      SFX.sprinkle(900); fall(lipx, lipy, p.x, p.y, col, mode === "dust" ? 10 : 9, mode === "dust" ? "dot" : shape);
      await sleep(550); addTo(to, id); SFX.drop(); await sleep(600);
    }
    await tween(600, function (k) { bpos(id, p.x, by, -30 * (1 - k), 1.12); tiltBowl(id, 30 * (1 - k)); });
    tiltBowl(id, 0); matDone(id);
    if (steady) await ungrip();
    await putBack(id);
  }
  async function aSeason(list, to) {
    const p = tipOf(to);
    for (let n = 0; n < list.length; n++) {
      const id = list[n], col = ING[id][3], m = MAT[id];
      enter(null, null, m.x);
      await go(m.x, m.y + 64, 0, 1000);
      SFX.rustle(); await go(m.x, m.y + 54, 4, 300); await go(m.x, m.y + 64, 0, 260);
      await go(p.x, p.y + 130, 0, 1000);
      SFX.sprinkle(1100);
      for (let k = 0; k < 6; k++) { await go(p.x + (k % 2 ? 14 : -14), p.y + 130, k % 2 ? -10 : 10, 150); fall(RR.H.x, RR.H.y - 64, p.x, p.y, col, 3, "dot"); }
      await go(p.x, p.y + 130, 0, 200);
      addTo(to, id); matDone(id);
      if (n < list.length - 1) await leave();
    }
    await leave();
  }

  /* chopping, slowly and properly: the whole thing goes on the board, one hand holds it, the knife slices, then dices */
  async function aChop(id, to) {
    const e = ING[id], p = tipOf(to), col = e[3], shape = e[5] || "cube", B = L.board, bx = B[0], by = B[1], m = MAT[id];
    await takeBowl(id);
    await carry(id, bx, by + B[3] / 2 + m.r * 0.7, 1200, 0, 1.12);
    await tween(600, function (k) { bpos(id, bx, by + B[3] / 2 + m.r * 0.7, -26 * k, 1.12); tiltBowl(id, 26 * k); });
    // the whole thing lands on the board
    const bi = tq("tboardItem"); bi.innerHTML = '<g id="tmeas">' + artOf(id) + "</g>";
    const bb = tq("tmeas").getBBox(), wt = B[2] * 0.56, ht = B[3] * 0.6, k = Math.min(wt / (bb.width || 1), ht / (bb.height || 1), 2.2);
    const tr = "translate(" + (-(bb.x + bb.width / 2) * k).toFixed(1) + " " + (-(bb.y + bb.height / 2) * k).toFixed(1) + ") scale(" + k.toFixed(3) + ")";
    const artHTML = artOf(id), W2 = bb.width * k, H2 = bb.height * k;
    const defs = TS.querySelector("defs"); defs.querySelectorAll(".tcp").forEach(function (n) { n.remove(); });
    const N = 7, strips = [], sg = el("g", { filter: "url(#wobbleS)", stroke: INK, "stroke-width": 3, "stroke-linejoin": "round", "stroke-linecap": "round" }, bi);
    for (let i = 0; i < N; i++) {
      defs.insertAdjacentHTML("beforeend", '<clipPath class="tcp" id="tcp' + i + '"><rect x="' + (-W2 / 2 + (i * W2) / N - 0.3) + '" y="' + (-H2 / 2 - 30) + '" width="' + (W2 / N + 0.6) + '" height="' + (H2 + 60) + '"/></clipPath>');
      const s = el("g", { "clip-path": "url(#tcp" + i + ")" }, sg); s.innerHTML = '<g transform="' + tr + '">' + artHTML + "</g>"; strips.push(s);
    }
    bi.firstChild.style.display = "none"; tq("tmeas").remove();
    SFX.drop(); matDone(id); await sleep(500);
    await tween(500, function (kk) { bpos(id, bx, by + B[3] / 2 + m.r * 0.7, -26 * (1 - kk), 1.12); tiltBowl(id, 26 * (1 - kk)); });
    tiltBowl(id, 0); await putBack(id);
    // both hands: the left one holds, the right one slices
    enter("knife", null, bx - 90, RR); enter(null, null, bx - W2 / 2 + 30, LL);
    await Promise.all([go(bx - W2 / 2 + 24, by + 44, 0, 1100, LL), go(bx + W2 / 2 + 10, by + 96, 0, 1100, RR)]);
    const gap = 9, made = {};
    const shift = function () { strips.forEach(function (s, i) { let c = 0; for (let b = 1; b <= i; b++) if (made[b]) c++; s.setAttribute("transform", "translate(" + (c * gap) + " 0)"); }); };
    for (let j = 1; j < N; j++) {
      const b = N - j, x = bx - W2 / 2 + (b * W2) / N + (made[b + 1] ? gap * (N - b - 1) : 0);
      const cx = bx - W2 / 2 + (b * W2) / N + gap * 0;
      await Promise.all([go(cx + 2, by + 96 + 16, -3, 520, RR), go(Math.min(cx - 60, bx - W2 / 2 + (b * W2) / N * 0.5 + 10), by + 44, 0, 520, LL)]);
      await go(cx, by + 96, 2, 170, RR); SFX.chop();
      made[b] = 1; await tween(280, function (kk) { strips.forEach(function (s, i) { let c = 0; for (let q = 1; q <= i; q++) if (made[q]) c += q === b ? kk : 1; s.setAttribute("transform", "translate(" + (c * gap) + " 0)"); }); });
      shift(); await sleep(260);
    }
    // turn it a quarter and cut across
    await leave(LL); await sleep(150);
    await go(bx, by + 100, 0, 600, RR);
    const pos = [], cols = 6, rows = 3;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) pos.push([(c - (cols - 1) / 2) * 24, (r - (rows - 1) / 2) * 22]);
    const P = tq("tpieces"); P.innerHTML = ""; P.removeAttribute("transform");
    const pg = el("g", { filter: "url(#wobbleS)", stroke: INK, "stroke-width": 2.4, "stroke-linejoin": "round", "stroke-linecap": "round" }, P), cubes = [];
    pos.forEach(function (c, i) { const q = piece(shape, mix(col, "#ffffff", (i % 3) * 0.05), pg, c[0], c[1], i + 2); q.setAttribute("opacity", 0); cubes.push(q); });
    for (let n = 0; n < 3; n++) {
      const x = bx - 50 + n * 50;
      await go(x, by + 112, 0, 420, RR); await go(x, by + 92, 0, 150, RR); SFX.chop(); puffs(x, by, 2, col);
      cubes.forEach(function (q, i) { q.setAttribute("opacity", Math.min(1, (i % cols) <= (n + 1) * 2 - 0 ? 1 : 0)); });
      if (n === 0) strips.forEach(function (s) { s.style.opacity = 0.35; });
      await go(x, by + 112, 0, 150, RR); await sleep(200);
    }
    cubes.forEach(function (q) { q.setAttribute("opacity", 1); }); sg.remove();
    await sleep(500);
    // the knife brings it over to where it is wanted
    await go(bx + 130, by + 100, 70, 600, RR); SFX.whoosh(500);
    const dx = p.x - bx, dy = p.y - by;
    await tween(1100, function (kk) {
      P.setAttribute("transform", "translate(" + (dx * kk).toFixed(1) + " " + (dy * kk).toFixed(1) + ")");
      put(lerp(bx + 130, p.x + 90, kk), lerp(by + 100, p.y + 80, kk), lerp(70, 62, kk), RR);
    });
    SFX.plop(); P.innerHTML = ""; P.removeAttribute("transform"); ripple(p.x, p.y);
    addTo(to, id); bi.innerHTML = "";
    await leave();
  }
  async function aMix(to, tl) {
    const p = T(to), r = geoR(to) * 0.4;
    if (to !== "tin") await grip(to);
    enter(tl, null, p.x); SFX.whoosh(500);
    await go(p.x, p.y + TH[tl] + 90, 0, 900); await go(p.x, p.y + TH[tl], 0, 500);
    SFX.stir(3600);
    const sw = tq(to === "vessel" ? "tcont0" : to === "bowl" ? "tcont1" : "tcont2"), yolks = TG[to].heap.querySelectorAll(".yolk");
    await tween(3600, function (k, raw) {
      const a = raw * Math.PI * 8;
      put(p.x + Math.cos(a) * r, p.y + TH[tl] + Math.sin(a) * r, Math.cos(a) * 6);
      sw.style.transform = "rotate(" + (Math.sin(raw * Math.PI * 6) * 6).toFixed(1) + "deg)"; sw.style.transformBox = "view-box"; sw.style.transformOrigin = p.x + "px " + p.y + "px";
      yolks.forEach(function (y) { y.style.opacity = Math.max(0, 1 - raw * 1.3); });
    });
    sw.style.transform = ""; yolks.forEach(function (y) { y.remove(); });
    if (yolks.length) { C[to].col = mix(C[to].col, "#f0c75a", 0.7); TG[to].surf.setAttribute("fill", C[to].col); }
    if (to !== "tin") tintFromHeap(to, 0.6);
    await leaveBoth();
  }
  let heatStop = null, bubTimer = null, steamTimer = null;
  function bubbles(on) {
    clearInterval(bubTimer); clearInterval(steamTimer);
    if (!on) return;
    bubTimer = setInterval(function () {
      const a = Math.random() * 6.28, d = Math.sqrt(Math.random()) * (L.R - 40), p = T("vessel");
      const c = el("circle", { cx: p.x + Math.cos(a) * d, cy: p.y + Math.sin(a) * d, r: 3, fill: "none", stroke: "#f6ebcf", "stroke-width": 3 }, tfx);
      tween(650, function (k) { c.setAttribute("r", 3 + k * 10); c.setAttribute("opacity", 1 - k); }).then(function () { c.remove(); });
    }, 240);
    steamTimer = setInterval(function () {
      const p = T("vessel"), a = Math.random() * 6.28, c = el("circle", { cx: p.x + Math.cos(a) * 60, cy: p.y + Math.sin(a) * 60, r: 12, fill: "#fff", opacity: 0, stroke: "none" }, tfx);
      tween(1700, function (k) { c.setAttribute("r", 12 + k * 30); c.setAttribute("cy", p.y + Math.sin(a) * 60 - k * 70); c.setAttribute("opacity", (0.28 * Math.sin(k * Math.PI)).toFixed(2)); }).then(function () { c.remove(); });
    }, 420);
  }
  async function aHeat(secs) {
    const line = tq("tknobline"), pan = st.ware === "pan", K = T("knob");
    enter(null, null, K.x); await go(K.x, K.y + 70, 0, 1100);
    SFX.tick(); await sleep(200);
    await tween(900, function (k) { line.setAttribute("transform", "rotate(" + (k * 120) + ")"); put(K.x + 8 * k, K.y + 70, 14 * k); });
    await leave();
    SFX.ignite(); tq("tflames").classList.add("on");
    heatStop = pan ? SFX.sizzle() : SFX.simmer();
    if (!pan) bubbles(true);
    const b0 = st.brown || 0, wantBrown = stacking("vessel") && C.vessel.n > 0;
    await tween(secs * 1000, function (k, raw) { if (wantBrown) bakeLook(b0 + 0.5 * raw); });
    if (wantBrown) st.brown = b0 + 0.5;
    if (!pan) tintFromHeap("vessel", 0.5);
    bubbles(false); if (heatStop) { heatStop(); heatStop = null; }
    tq("tflames").classList.remove("on");
    await tween(600, function (k) { line.setAttribute("transform", "rotate(" + (120 * (1 - k)) + ")"); });
  }
  async function aBake(secs) {
    const g = tq("ttin"), glass = tq("toglass"), A = T("tin"), O = T("oven"), R = L.tinR;
    const setT = function (x, y, s) { g.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + s.toFixed(3) + ")"); put(x + (R + 12) * s, y + 12 * s + 30, 6, RR); put(x - (R + 12) * s, y + 12 * s + 30, -6, LL); };
    enter(null, null, A.x + R, RR); enter(null, null, A.x - R, LL);
    await Promise.all([go(A.x + R + 12, A.y + 42, 6, 1100, RR), go(A.x - R - 12, A.y + 42, -6, 1100, LL)]); SFX.rustle(); await sleep(300);
    await tween(1600, function (k) { setT(lerp(A.x, O.x, k), lerp(A.y, O.y - 34, k), lerp(1, 0.55, k)); g.setAttribute("opacity", k > 0.7 ? 1 - (k - 0.7) / 0.3 : 1); });
    SFX.pop(2); await leaveBoth();
    glass.setAttribute("opacity", 0.9);
    const stop = SFX.fire ? SFX.fire(0.18) : null;
    await tween(secs * 1000, function (k, raw) { glass.setAttribute("opacity", (0.75 + 0.18 * Math.sin(raw * 30)).toFixed(2)); bakeLook(raw); });
    if (stop) stop();
    SFX.ding(); glass.setAttribute("opacity", 0);
    enter(null, null, O.x + 60, RR); enter(null, null, O.x - 60, LL);
    await Promise.all([go(O.x + 60, O.y + 50, 6, 1000, RR), go(O.x - 60, O.y + 50, -6, 1000, LL)]);
    await tween(1600, function (k) { setT(lerp(O.x, A.x, k), lerp(O.y - 34, A.y, k), lerp(0.55, 1, k)); g.setAttribute("opacity", k < 0.3 ? k / 0.3 : 1); });
    g.setAttribute("transform", "translate(" + A.x + " " + A.y + ")"); g.setAttribute("opacity", 1); puffs(A.x, A.y, 6, "#f6ebcf");
    await sleep(300); await leaveBoth();
  }
  async function aMove(from, to, swap) {
    const A = T(from), B = T(to), lq = from === "vessel" && st.ware === "pot", tl = stacking(from) ? "spatula" : lq ? "ladle" : "spoon", col = C[from].col;
    await grip(from);
    for (let n = 0; n < 2; n++) {
      enter(tl, null, A.x); SFX.whoosh(450);
      await go(A.x, A.y + TH[tl] + 80, 0, 700); await go(A.x, A.y + TH[tl], 0, 500); SFX.plop();
      const ls = tq("tladlesoup"); if (ls) { ls.setAttribute("fill", col); ls.setAttribute("opacity", 1); }
      await sleep(250);
      await go(B.x, B.y + TH[tl] + 20, 0, 1000);
      await go(B.x, B.y + TH[tl], -18, 500);
      const pr = SFX.pour(); pr.level(0.4); ripple(B.x, B.y, col);
      if (n) moveC(from, to);
      await sleep(800); pr.stop();
      await go(B.x, B.y + TH[tl] + 60, 0, 400); await leave();
    }
    await ungrip();
    if (swap) { await tween(300, function (k) { tq("tvessel").style.opacity = 1 - k; }); wareSwap(swap); SFX.clink(); await tween(300, function (k) { tq("tvessel").style.opacity = k; }); }
  }
  async function aRoll(id, to) {
    const e = ING[id], p = tipOf(to), col = e[3], B = L.board, bx = B[0], by = B[1], m = MAT[id];
    await takeBowl(id);
    await carry(id, bx, by + B[3] / 2 + m.r * 0.7, 1200, 0, 1.12); SFX.drop();
    matDone(id); await putBack(id);
    const bi = tq("tboardItem"); bi.innerHTML = '<ellipse rx="44" ry="34" fill="' + col + '" stroke="' + INK + '" stroke-width="3.4"/><path d="M-20 -12 q16 -10 34 -4" stroke="#fff" stroke-width="3" opacity=".4" fill="none"/>';
    const d = bi.firstChild;
    const pin = el("g", { stroke: INK, "stroke-width": 3, "stroke-linejoin": "round" }, tfx);
    pin.innerHTML = '<rect x="-86" y="-15" width="172" height="30" rx="14" fill="#cf9f5e"/><circle cx="-98" cy="0" r="9" fill="#b9803a"/><circle cx="98" cy="0" r="9" fill="#b9803a"/><path d="M-60 -7 H60" stroke="#fff" stroke-width="3" opacity=".4"/>';
    const setPin = function (y) { pin.setAttribute("transform", "translate(" + bx + " " + y.toFixed(1) + ")"); put(bx + 66, y + 50, -4, RR); put(bx - 66, y + 50, 4, LL); };
    setPin(by + 150); enter(null, null, bx + 66, RR); enter(null, null, bx - 66, LL); setPin(by + 150);
    await tween(900, function (k) { setPin(lerp(by + 150, by + 60, k)); });
    for (let n = 0; n < 3; n++) {
      SFX.rustle();
      await tween(700, function (k) { const w = lerp(44 + n * 28, 44 + (n + 1) * 28, k); d.setAttribute("rx", w.toFixed(1)); d.setAttribute("ry", (34 + (n + 1) * 8 * k + n * 8).toFixed(1)); setPin(lerp(by + 60, by - 36, k)); });
      await tween(500, function (k) { setPin(lerp(by - 36, by + 60, k)); });
    }
    await tween(500, function (k) { setPin(lerp(by + 60, by + 160, k)); });
    pin.remove(); await leaveBoth();
    const disc = el("ellipse", { cx: bx, cy: by, rx: 128, ry: 58, fill: col, stroke: INK, "stroke-width": 3 }, tfx);
    bi.innerHTML = ""; SFX.whoosh(500);
    await tween(900, function (k) { disc.setAttribute("cx", lerp(bx, p.x, k)); disc.setAttribute("cy", lerp(by, p.y, k) - Math.sin(k * Math.PI) * 60); disc.setAttribute("rx", lerp(128, L.tinR - 8, k)); disc.setAttribute("ry", lerp(58, L.tinR - 8, k)); });
    disc.remove(); SFX.drop();
    const Lg = TG.tin.lay;
    if (st.tin === "tart") { el("circle", { r: L.tinR - 8, fill: col }, Lg); el("circle", { r: L.tinR - 24, fill: mix(col, "#8a6a3a", 0.18) }, Lg); }
    else el("circle", { r: L.tinR - 10, fill: col }, Lg);
  }
  async function aStack(id, to) { await aAdd(id, norm(to)); }
  async function aFlip() {
    const p = T("vessel"), Lg = tq("tlay0");
    await grip("vessel");
    enter("spatula", null, p.x); SFX.whoosh(450);
    await go(p.x, p.y + TH.spatula + 70, 0, 700); await go(p.x, p.y + TH.spatula, 0, 400);
    await tween(1000, function (k) { const s = Math.sin(k * Math.PI); put(p.x, p.y + TH.spatula - s * 40, -10 * s); Lg.style.transformBox = "view-box"; Lg.style.transformOrigin = p.x + "px " + p.y + "px"; Lg.style.transform = "rotate(" + (180 * k).toFixed(0) + "deg) scale(" + (1 + 0.1 * s).toFixed(3) + ")"; });
    Lg.style.transform = ""; SFX.flip(); SFX.plop();
    await leave(); await ungrip();
  }

  /* ---------- the finished plate slowly appears in its dish while you cook ---------- */
  let PLATE = null;
  function plateInit() {
    PLATE = null;
    const r = st.recipe, ts = r.steps.filter(function (x) { return x[0] === "taste"; })[0]; if (!ts) return;
    const t = norm(ts[1]), G = TG[t]; if (!G || !G.g) return;
    const dd = dishFor(r), tmp = document.createElementNS(NS, "g"); tmp.innerHTML = dd.svg;
    const inner = tmp.firstElementChild; if (!inner) return;
    let groups = [Array.prototype.slice.call(inner.children)];
    // a dish made of a few big groups (e.g. the two sandwich halves) is split into its own layers, built up side by side
    for (let pass = 0; pass < 2 && groups.reduce(function (n, a) { return n + a.length; }, 0) < 8; pass++) {
      const nx = []; groups.forEach(function (a) { a.forEach(function (k) { const c = Array.prototype.slice.call(k.children); nx.push(c.length > 1 ? c : [k]); }); }); groups = nx;
    }
    const kids = []; for (let i = 0, more = true; more; i++) { more = false; groups.forEach(function (a) { if (i < a.length) { kids.push(a[i]); more = true; } }); }
    const R = t === "vessel" ? L.R * 0.8 : t === "bowl" ? L.bowlR * 0.88 : L.tinR * 0.9, sc = R / 204;
    const pg = document.createElementNS(NS, "g"); pg.setAttribute("id", "tplate"); pg.setAttribute("transform", "scale(" + sc.toFixed(3) + ")"); pg.setAttribute("pointer-events", "none");
    pg.appendChild(inner);
    // every piece sits in its own little wrapper that fades in, so the piece keeps its own look
    const wr = kids.map(function (k) { const w = document.createElementNS(NS, "g"); k.parentNode.insertBefore(w, k); w.appendChild(k); w.style.opacity = 0; return w; });
    const cont = G.cont; G.g.insertBefore(pg, cont ? cont.nextSibling : null);
    const touches = function (x) {
      const ty = x[0];
      if (ty === "add" || ty === "season" || ty === "stack" || ty === "move" || ty === "roll") return norm(x[2]) === t;
      if (ty === "mix") return norm(x[1]) === t;
      if (ty === "bake") return t === "tin";
      if (ty === "heat") return t === "vessel";
      return ty === "flip";
    };
    PLATE = { kids: wr, t: t, touches: touches, shown: 0, done: 0, builds: Math.max(1, r.steps.filter(touches).length) };
  }
  function plateStep(type, stp) {
    if (!PLATE || type === "taste" || !PLATE.touches(stp)) return;
    PLATE.done++;
    const want = Math.min(PLATE.kids.length, Math.ceil(PLATE.kids.length * PLATE.done / PLATE.builds)), from = PLATE.shown; PLATE.shown = want;
    for (let i = from; i < want; i++) (function (k, d) { sleep(d).then(function () { k.style.transition = "opacity 1s ease"; k.style.opacity = 1; }); })(PLATE.kids[i], (i - from) * 45);
  }
  // the last step: both hands lift the finished dish and carry it to the table
  async function aTaste(where) {
    const t = norm(where), p = T(t), g = TG[t].g, R = t === "vessel" ? L.R : t === "bowl" ? L.bowlR : L.tinR;
    enter(null, null, p.x + R, RR); enter(null, null, p.x - R, LL);
    await Promise.all([go(p.x + R + 18, p.y + 40, 8, 1100, RR), go(p.x - R - 18, p.y + 40, -8, 1100, LL)]); SFX.rustle(); await sleep(300);
    await tween(1500, function (k) { const y = lerp(p.y, L.H + 120, k * k); g.setAttribute("transform", "translate(" + p.x + " " + y.toFixed(1) + ") scale(" + lerp(1, 1.1, Math.sin(k * 3)).toFixed(3) + ")"); put(p.x + R + 18, y + 40, 8, RR); put(p.x - R - 18, y + 40, -8, LL); });
    SFX.whoosh(600); hide();
    window.__dineFrom = t;
  }

  /* ---------- the finished dishes, composed and plated like a photograph (top-down, radius ~200) ---------- */
  const rn = function (i) { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  function blobD(r, n, j, seed) {
    const p = [];
    for (let k = 0; k < n; k++) { const a = k / n * 6.2832, rad = r * (1 + (rn(seed + k * 3.1) - 0.5) * 2 * j); p.push([Math.cos(a) * rad, Math.sin(a) * rad]); }
    const m = function (a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; };
    let d = "M" + m(p[n - 1], p[0]).map(function (v) { return v.toFixed(1); }).join(" ");
    for (let k = 0; k < n; k++) { const c = p[k], e = m(p[k], p[(k + 1) % n]); d += " Q" + c[0].toFixed(1) + " " + c[1].toFixed(1) + " " + e[0].toFixed(1) + " " + e[1].toFixed(1); }
    return d + "Z";
  }
  const blob = function (x, y, r, fill, seed, o) { o = o || {}; return '<path transform="translate(' + x.toFixed(1) + " " + y.toFixed(1) + ')" d="' + blobD(r, o.n || 12, o.j || 0.16, seed) + '" fill="' + fill + '"' + (o.op ? ' opacity="' + o.op + '"' : "") + (o.ns ? ' stroke="none"' : "") + "/>"; };
  const ellp = function (x, y, rx, ry, fill, rot, o) { o = o || {}; return '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' + rx + '" ry="' + ry + '" fill="' + fill + '"' + (rot ? ' transform="rotate(' + rot.toFixed(0) + " " + x.toFixed(1) + " " + y.toFixed(1) + ')"' : "") + (o.op ? ' opacity="' + o.op + '"' : "") + (o.ns ? ' stroke="none"' : "") + "/>"; };
  const polar = function (a, d) { return [Math.cos(a) * d, Math.sin(a) * d]; };
  const LEAF = function (x, y, rot, sc, col) { return '<g transform="translate(' + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + rot.toFixed(0) + ") scale(" + sc + ')"><path d="M0 -32 C24 -24 26 18 0 36 C-26 18 -24 -24 0 -32Z" fill="' + col + '"/><path d="M0 -26 V30" stroke="#a8d27a" stroke-width="2" opacity=".8"/><path d="M0 -8 L12 -18 M0 6 L14 -4 M0 -8 L-12 -18 M0 6 L-14 -4" stroke="#a8d27a" stroke-width="1.6" opacity=".6" fill="none"/><path d="M0 -30 C22 -22 24 14 2 32 C14 10 12 -14 0 -30Z" fill="#fff" opacity=".12" stroke="none"/></g>'; };
  const wrapG = function (s) { return '<g stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">' + s + "</g>"; };

  function dishPizza(kind) {
    let s = "";
    s += '<path d="' + blobD(202, 44, 0.022, 1) + '" fill="#cf9549"/><path d="' + blobD(184, 44, 0.03, 2) + '" fill="#e8bc72" stroke-width="2"/><path d="' + blobD(160, 40, 0.025, 3) + '" fill="#d9a55a" stroke="none"/>';
    for (let i = 0; i < 30; i++) { const a = rn(i) * 6.28, d = 176 + rn(i + 50) * 22; const p = polar(a, d); s += blob(p[0], p[1], 5 + rn(i + 9) * 9, "#6e3b1b", 70 + i, { op: 0.8, ns: 1, n: 8 }); }
    for (let i = 0; i < 40; i++) { const a = rn(i + 100) * 6.28, d = 170 + rn(i + 130) * 28, p = polar(a, d); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.4" fill="#fff4d8" opacity=".6" stroke="none"/>'; }
    s += '<path d="' + blobD(152, 36, 0.03, 4) + '" fill="#c93f28"/>';
    for (let i = 0; i < 28; i++) { const a = rn(i + 200) * 6.28, d = Math.sqrt(rn(i + 230)) * 140, p = polar(a, d); s += ellp(p[0], p[1], 8 + rn(i) * 12, 5 + rn(i + 3) * 8, i % 3 ? "#a42818" : "#e5603f", rn(i) * 180, { op: 0.4, ns: 1 }); }
    if (kind === "margherita") {
      const sp = [[0, 0, 40], [-1, 0, 46], [1, 0, 46], [0, -1, 46], [0, 1, 46]];
      for (let i = 0; i < 7; i++) { const a = i / 7 * 6.28 + 0.3, p = polar(a, 92), r = 40 + rn(i) * 10; s += blob(p[0], p[1], r, "#f8eed2", 300 + i, { n: 14, j: 0.2 }); s += blob(p[0] + 4, p[1] - 4, r * 0.55, "#e8c06a", 320 + i, { op: 0.55, ns: 1 }); }
      s += blob(0, 0, 36, "#f8eed2", 340, { n: 14, j: 0.2 }) + blob(3, -3, 20, "#e8c06a", 341, { op: 0.5, ns: 1 });
      [[-58, -70, -30], [60, -62, 40], [-84, 30, -110], [44, 78, 160], [0, -6, 8]].forEach(function (L, i) { s += LEAF(L[0], L[1], L[2], 1 + (i === 4 ? 0.15 : 0), i % 2 ? "#3d6b32" : "#4a7a38"); });
      for (let i = 0; i < 26; i++) { const a = rn(i + 400) * 6.28, d = Math.sqrt(rn(i + 430)) * 130, p = polar(a, d); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.4" fill="#c4301c" stroke="none"/>'; }
      for (let i = 0; i < 9; i++) { const a = rn(i + 500) * 6.28, d = Math.sqrt(rn(i + 530)) * 120, p = polar(a, d); s += ellp(p[0], p[1], 7, 3, "#f6d77a", rn(i) * 180, { op: 0.8, ns: 1 }); }
    } else {
      s += blob(0, 0, 138, "#f3da92", 600, { n: 26, j: 0.07 });
      for (let i = 0; i < 16; i++) { const a = rn(i + 640) * 6.28, d = Math.sqrt(rn(i + 660)) * 120, p = polar(a, d); s += blob(p[0], p[1], 14 + rn(i) * 14, i % 2 ? "#e2b45a" : "#fbeab4", 680 + i, { op: 0.55, ns: 1 }); }
      if (kind === "pepperoni") {
        const pos = [[0, 0]].concat([0, 1, 2, 3, 4].map(function (i) { return polar(i / 5 * 6.28 + 0.4, 58); })).concat([0, 1, 2, 3, 4, 5, 6].map(function (i) { return polar(i / 7 * 6.28 + 0.1, 112); }));
        pos.forEach(function (p, i) { s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ')"><circle r="27" fill="#a8301f"/><circle r="22" fill="#c84630" stroke="none"/>' + ellp(-6, -8, 11, 6, "#ff9a5a", -20, { op: 0.45, ns: 1 }) + [0, 1, 2, 3, 4].map(function (k) { const q = polar(k * 1.7 + i, 11 + (k % 2) * 4); return '<circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="2.4" fill="#7a2014" stroke="none"/>'; }).join("") + "</g>"; });
      } else {
        for (let i = 0; i < 9; i++) { const a = rn(i + 700) * 6.28, d = 30 + rn(i + 720) * 100, p = polar(a, d); s += '<path transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (rn(i) * 180).toFixed(0) + ')" d="M-26 6 Q0 -22 26 6" fill="none" stroke="#5f9a3a" stroke-width="9"/>'; }
        for (let i = 0; i < 9; i++) { const a = rn(i + 760) * 6.28, d = 20 + rn(i + 780) * 110, p = polar(a, d); s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (rn(i) * 120 - 60).toFixed(0) + ')"><path d="M-22 6 C-22 -20 22 -20 22 6 L9 6 L9 22 L-9 22 L-9 6Z" fill="#d7bc92"/><path d="M-15 -4 q15 -10 30 0" stroke="#a88455" stroke-width="2" fill="none"/></g>'; }
        for (let i = 0; i < 8; i++) { const a = rn(i + 800) * 6.28, d = 20 + rn(i + 820) * 110, p = polar(a, d); s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ')"><circle r="11" fill="#2f2a26"/><circle r="5" fill="#c93f28" stroke="none"/></g>'; }
        for (let i = 0; i < 7; i++) { const a = rn(i + 840) * 6.28, d = 30 + rn(i + 860) * 100, p = polar(a, d); s += '<path transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (rn(i) * 180).toFixed(0) + ')" d="M-16 4 Q0 -14 16 4" fill="none" stroke="#a24a8a" stroke-width="6"/>'; }
        for (let i = 0; i < 4; i++) { const a = rn(i + 880) * 6.28, d = 40 + rn(i + 890) * 80, p = polar(a, d); s += LEAF(p[0], p[1], rn(i) * 360, 0.62, "#3d6b32"); }
      }
    }
    s += '<g stroke="#5a2a1c" stroke-width="2" opacity=".35" fill="none">' + [0, 1, 2, 3, 4, 5].map(function (i) { const p = polar(i / 6 * 6.28 + 0.52, 200); return '<path d="M0 0 L' + p[0].toFixed(1) + " " + p[1].toFixed(1) + '"/>'; }).join("") + "</g>";
    return wrapG(s);
  }

  function dishQuiche(kind) {
    let s = "";
    for (let i = 0; i < 34; i++) { const a = i / 34 * 6.2832, p = polar(a, 190); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="13" fill="#dca85c"/>'; }
    s += '<circle r="188" fill="#d6a050"/><circle r="176" fill="#e9c27a" stroke-width="2"/>';
    s += '<path d="' + blobD(168, 40, 0.012, 9) + '" fill="#efc65e"/>';
    for (let i = 0; i < 26; i++) { const a = rn(i) * 6.28, d = Math.sqrt(rn(i + 30)) * 150, p = polar(a, d); s += blob(p[0], p[1], 16 + rn(i + 5) * 26, i % 3 ? "#d98a30" : "#f6d67a", 20 + i, { op: i % 3 ? 0.42 : 0.5, ns: 1 }); }
    s += '<circle r="164" fill="none" stroke="#c47a2a" stroke-width="12" opacity=".4" stroke-dasharray="40 14"/>';
    for (let i = 0; i < 14; i++) { const a = rn(i + 90) * 6.28, d = Math.sqrt(rn(i + 120)) * 140, p = polar(a, d); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (5 + rn(i) * 6).toFixed(1) + '" fill="#f6dc86" stroke-width="1.6"/>'; }
    for (let i = 0; i < 9; i++) { const a = rn(i + 150) * 6.28, d = 30 + Math.sqrt(rn(i + 170)) * 120, p = polar(a, d); s += blob(p[0], p[1], 20 + rn(i) * 10, kind === "q-chicken" ? "#f1dcae" : kind === "q-beef" ? "#8a4f2c" : "#d6452e", 190 + i, { n: 10, j: 0.25 }); }
    if (kind === "q-veg") for (let i = 0; i < 10; i++) { const a = rn(i + 230) * 6.28, d = 20 + Math.sqrt(rn(i + 250)) * 125, p = polar(a, d); s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ')">' + blob(0, 0, 17, "#4f7a3a", 270 + i, { n: 9, j: 0.3 }) + '<circle cx="-5" cy="-4" r="3" fill="#6f9a52" stroke="none"/><circle cx="6" cy="3" r="3" fill="#6f9a52" stroke="none"/></g>'; }
    for (let i = 0; i < 28; i++) { const a = rn(i + 300) * 6.28, d = Math.sqrt(rn(i + 330)) * 150, p = polar(a, d); s += '<rect x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) + '" width="9" height="3.6" rx="1.6" fill="#5f8a3a" stroke="none" transform="rotate(' + (rn(i) * 180).toFixed(0) + " " + p[0].toFixed(1) + " " + p[1].toFixed(1) + ')"/>'; }
    s += ellp(-60, -80, 50, 14, "#fff", -35, { op: 0.22, ns: 1 });
    return wrapG(s);
  }

  function dishSoup(kind) {
    const col = kind === "s-potato" ? "#ecd9a6" : kind === "s-pumpkin" ? "#e08a2c" : "#dba04a";
    const B = '<circle r="204" fill="#f6efdc"/><circle r="194" fill="none" stroke="#6f93aa" stroke-width="5" opacity=".85"/><circle r="176" fill="#e6dcc2" stroke-width="2"/><circle r="150" fill="#f3ecd6" stroke-width="1.6"/>';
    let s = '<circle r="164" fill="' + mix(col, "#3a2416", 0.18) + '"/><circle r="154" fill="' + col + '" stroke="none"/>';
    s += '<path d="M-110 -70 A130 130 0 0 1 -30 -128" stroke="#fff" stroke-width="9" fill="none" opacity=".4" stroke-linecap="round"/>';
    for (let i = 0; i < 18; i++) { const a = rn(i) * 6.28, d = Math.sqrt(rn(i + 20)) * 130, p = polar(a, d); s += ellp(p[0], p[1], 14 + rn(i) * 16, 8 + rn(i + 4) * 8, mix(col, i % 2 ? "#ffffff" : "#8a4a1c", 0.18), rn(i) * 180, { op: 0.5, ns: 1 }); }
    if (kind === "s-veg") {
      for (let i = 0; i < 9; i++) { const a = rn(i + 50) * 6.28, d = 20 + Math.sqrt(rn(i + 60)) * 105, p = polar(a, d); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="15" fill="#e8892c"/><circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="7" fill="#f6b45a" stroke="none"/>'; }
      for (let i = 0; i < 10; i++) { const a = rn(i + 90) * 6.28, d = 10 + Math.sqrt(rn(i + 100)) * 115, p = polar(a, d); s += '<rect x="' + (p[0] - 11).toFixed(1) + '" y="' + (p[1] - 10).toFixed(1) + '" width="22" height="20" rx="5" fill="#efdca0" transform="rotate(' + (rn(i) * 60).toFixed(0) + " " + p[0].toFixed(1) + " " + p[1].toFixed(1) + ')"/>'; }
      for (let i = 0; i < 16; i++) { const a = rn(i + 130) * 6.28, d = Math.sqrt(rn(i + 140)) * 125, p = polar(a, d); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="6" fill="#7ca24a" stroke-width="1.8"/>'; }
      s += LEAF(30, -30, 40, 0.9, "#4f7a3a") + LEAF(10, -10, -70, 0.8, "#5f8a45");
    } else {
      s += '<path d="M0 0 q34 -10 44 14 q6 44 -42 48 q-76 0 -80 -62 q8 -86 92 -84" fill="none" stroke="#fbf3df" stroke-width="13" stroke-linecap="round" opacity=".92"/><path d="M0 0 q34 -10 44 14 q6 44 -42 48 q-76 0 -80 -62 q8 -86 92 -84" fill="none" stroke="#e4d6b4" stroke-width="3" stroke-linecap="round" opacity=".7" transform="translate(2 4)"/>';
      if (kind === "s-potato") { for (let i = 0; i < 30; i++) { const a = rn(i) * 6.28, d = 20 + Math.sqrt(rn(i + 20)) * 110, p = polar(a, d); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="5" fill="#6f9a3a" stroke-width="1.6"/><circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2" fill="#b7d27a" stroke="none"/>'; } for (let i = 0; i < 9; i++) { const a = rn(i + 70) * 6.28, d = 30 + rn(i + 80) * 90, p = polar(a, d); s += '<rect x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) + '" width="13" height="7" rx="2" fill="#9a4a2a" transform="rotate(' + (rn(i) * 180).toFixed(0) + " " + p[0].toFixed(1) + " " + p[1].toFixed(1) + ')"/>'; } }
      else { for (let i = 0; i < 9; i++) { const a = rn(i + 100) * 6.28, d = 25 + rn(i + 110) * 100, p = polar(a, d); s += '<path transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (rn(i) * 360).toFixed(0) + ')" d="M0 -10 C8 -6 8 6 0 10 C-8 6 -8 -6 0 -10Z" fill="#c9d89a" stroke-width="1.8"/>'; } s += LEAF(46, -22, 50, 0.7, "#4f7a3a"); }
    }
    for (let i = 0; i < 14; i++) { const a = rn(i + 400) * 6.28, d = Math.sqrt(rn(i + 420)) * 135, p = polar(a, d); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.3" fill="#2f2a26" stroke="none"/>'; }
    return { base: wrapG(B), svg: wrapG(s) };
  }

  function dishPasta(kind) {
    let s = "";
    s += '<path d="' + blobD(196, 30, 0.04, 5) + '" fill="' + (kind === "p-shrimp" ? "#f3cfa6" : "#f7ebcc") + '" stroke-width="2"/><path d="' + blobD(176, 30, 0.05, 6) + '" fill="' + (kind === "p-shrimp" ? "#efc08e" : "#f2e0b0") + '" stroke="none" opacity=".8"/>';
    if (kind === "p-risotto") {
      s += '<path d="' + blobD(176, 34, 0.035, 7) + '" fill="#eee0b2"/>';
      for (let i = 0; i < 190; i++) { const a = rn(i) * 6.28, d = Math.sqrt(rn(i + 300)) * 160, p = polar(a, d); s += '<ellipse cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" rx="7" ry="3.2" fill="' + (i % 4 ? "#f8efcc" : "#e9d8a0") + '" transform="rotate(' + (rn(i + 9) * 180).toFixed(0) + " " + p[0].toFixed(1) + " " + p[1].toFixed(1) + ')" stroke-width="1"/>'; }
      for (let i = 0; i < 9; i++) { const a = i / 9 * 6.28 + 0.2, d = 40 + (i % 3) * 38, p = polar(a, d); s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (rn(i) * 360).toFixed(0) + ')"><path d="M-26 8 C-26 -24 26 -24 26 8 L11 8 L11 28 L-11 28 L-11 8Z" fill="#c99f76"/><path d="M-18 -4 q18 -12 36 0" stroke="#9a7348" stroke-width="2.4" fill="none"/><path d="M-6 14 V24" stroke="#e8d3ad" stroke-width="3"/></g>'; }
      for (let i = 0; i < 24; i++) { const a = rn(i + 500) * 6.28, d = Math.sqrt(rn(i + 520)) * 150, p = polar(a, d); s += '<rect x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) + '" width="9" height="3.6" rx="1.6" fill="#4f8a3a" stroke="none" transform="rotate(' + (rn(i) * 180).toFixed(0) + " " + p[0].toFixed(1) + " " + p[1].toFixed(1) + ')"/>'; }
    } else {
      for (let k = 0; k < 26; k++) {
        const a0 = rn(k) * 6.28, turns = 3.2 + rn(k + 40) * 1.4, r0 = 14 + rn(k + 60) * 30, dr = 150 / (turns * 6.28) * 1.2, n = 40; let d = "";
        for (let t = 0; t <= n; t++) { const u = t / n, ang = a0 + u * turns * 6.28, rad = r0 + u * dr * turns * 6.28 * 0.55 + Math.sin(u * 20 + k) * 5, x = Math.cos(ang) * Math.min(rad, 172), y = Math.sin(ang) * Math.min(rad, 172) * 0.97; d += (t ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1) + " "; }
        s += '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="11" opacity=".85"/><path d="' + d + '" fill="none" stroke="' + (kind === "p-shrimp" ? "#f3dca8" : "#efd89c") + '" stroke-width="7.4"/><path d="' + d + '" fill="none" stroke="#fff" stroke-width="2" opacity=".35" transform="translate(-1.5 -1.5)"/>';
      }
      s += blob(0, 0, 60, "#fff8e4", 800, { n: 14, j: 0.15, op: 0.22, ns: 1 });
      if (kind === "p-shrimp") for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28 + 0.4, p = polar(a, 92); s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (a * 57.3 + 90).toFixed(0) + ')"><path d="M-30 4 C-30 -36 30 -36 30 4 C30 18 16 26 8 14" fill="none" stroke="' + INK + '" stroke-width="24"/><path d="M-30 4 C-30 -36 30 -36 30 4 C30 18 16 26 8 14" fill="none" stroke="#f19a82" stroke-width="18"/><path d="M-22 -14 l6 12 M-10 -22 l4 14 M4 -22 l0 14 M16 -16 l-3 12" stroke="#d3705a" stroke-width="2.6"/><path d="M8 14 l-10 14 l16 -2 Z" fill="#f4b49a"/><path d="M-24 -18 q14 -12 30 -10" stroke="#fff" stroke-width="3.4" fill="none" opacity=".5"/></g>'; }
      else for (let i = 0; i < 12; i++) { const a = rn(i + 600) * 6.28, d = 40 + rn(i + 620) * 100, p = polar(a, d); s += ellp(p[0], p[1], 15, 3.6, "#f6efdc", a * 57, { ns: 1, op: 0.95 }) + '<path d="M' + (p[0] - 12).toFixed(1) + " " + p[1].toFixed(1) + " q12 -8 24 0" + '" stroke="#d9c692" stroke-width="2" fill="none"/>'; }
      for (let i = 0; i < 34; i++) { const a = rn(i + 700) * 6.28, d = Math.sqrt(rn(i + 720)) * 155, p = polar(a, d); s += '<rect x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) + '" width="9" height="3.6" rx="1.6" fill="#4f8a3a" stroke="none" transform="rotate(' + (rn(i) * 180).toFixed(0) + " " + p[0].toFixed(1) + " " + p[1].toFixed(1) + ')"/>'; }
    }
    for (let i = 0; i < 16; i++) { const a = rn(i + 900) * 6.28, d = Math.sqrt(rn(i + 920)) * 150, p = polar(a, d); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.2" fill="#2f2a26" stroke="none"/>'; }
    return wrapG(s);
  }

  function dishSalad(kind) {
    const B = '<circle r="204" fill="#f6efdc"/><circle r="194" fill="none" stroke="#6f93aa" stroke-width="5" opacity=".7"/><circle r="178" fill="#ebe3cb" stroke-width="2"/><circle r="168" fill="#f9f4e4" stroke="none"/>';
    let s = "";
    const greens = ["#a9d06a", "#8fbf5a", "#b9d97c", "#78ac4c"];
    if (kind === "l-caesar") {
      for (let i = 0; i < 14; i++) { const a = i / 14 * 6.28 + 0.2, p = polar(a, 78 + (i % 2) * 30); s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (a * 57.3 + 90).toFixed(0) + ')"><path d="M0 -70 C46 -60 56 10 24 66 C0 80 -24 70 -30 40 C-52 0 -34 -60 0 -70Z" fill="' + greens[i % 4] + '"/><path d="M0 -60 V62" stroke="#e8f2c0" stroke-width="4"/><path d="M0 -20 L22 -38 M0 10 L28 -10 M0 -20 L-22 -38 M0 10 L-26 -10" stroke="#d8ea9c" stroke-width="2" fill="none" opacity=".8"/></g>'; }
      for (let i = 0; i < 11; i++) { const a = rn(i) * 6.28, d = 20 + rn(i + 9) * 110, p = polar(a, d); s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (rn(i) * 90).toFixed(0) + ')"><rect x="-17" y="-17" width="34" height="34" rx="7" fill="#e0a95a"/><rect x="-11" y="-11" width="18" height="10" rx="3" fill="#f2cc84" stroke="none"/><circle cx="6" cy="6" r="2" fill="#b57a35" stroke="none"/><circle cx="-5" cy="7" r="1.6" fill="#b57a35" stroke="none"/></g>'; }
      for (let i = 0; i < 9; i++) { const a = rn(i + 40) * 6.28, d = 20 + rn(i + 60) * 120, p = polar(a, d); s += '<path transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (rn(i) * 360).toFixed(0) + ')" d="M-16 0 q8 -14 16 -4 q8 8 16 -6 q-4 16 -16 14 q-8 -4 -16 -4Z" fill="#f8efd0" stroke-width="1.8"/>'; }
      for (let k = 0; k < 4; k++) { let d = "M" + (-110 + k * 10) + " " + (-90 + k * 50); for (let t = 1; t < 9; t++) d += " L" + (-110 + k * 10 + t * 28) + " " + (-90 + k * 50 + (t % 2 ? 16 : -6)); s += '<path d="' + d + '" fill="none" stroke="#efe6cf" stroke-width="7" opacity=".92"/><path d="' + d + '" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/>'; }
    } else if (kind === "l-greek") {
      for (let i = 0; i < 280; i++) { const a = rn(i) * 6.28, d = Math.sqrt(rn(i + 150)) * 160, p = polar(a, d), t = i % 5; const fill = t < 2 ? "#a8cf72" : t === 2 ? "#d9442c" : t === 3 ? "#b05aa0" : "#d6b84a"; s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (rn(i + 9) * 90).toFixed(0) + ')"><rect x="-10" y="-10" width="20" height="20" rx="4" fill="' + fill + '" stroke-width="1.8"/><rect x="-5" y="-5" width="9" height="6" rx="2" fill="#fff" opacity=".3" stroke="none"/></g>'; }
      for (let i = 0; i < 7; i++) { const a = i / 7 * 6.28 + 0.4, p = polar(a, 70 + (i % 2) * 28); s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ') rotate(' + (rn(i) * 360).toFixed(0) + ')"><ellipse rx="14" ry="10" fill="#35302b"/><ellipse rx="5" ry="3.4" fill="#6a5a4a" stroke="none"/></g>'; }
      for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28 + 1, p = polar(a, 40 + (i % 2) * 70); s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (rn(i + 5) * 60).toFixed(0) + ')"><rect x="-16" y="-14" width="32" height="28" rx="4" fill="#fbf7ea"/><path d="M-14 -6 l10 -4 M2 0 l12 -4" stroke="#e8e0c8" stroke-width="2" fill="none"/></g>'; }
      for (let i = 0; i < 26; i++) { const a = rn(i + 300) * 6.28, d = Math.sqrt(rn(i + 330)) * 150, p = polar(a, d); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.2" fill="#6f8a3e" stroke="none"/>'; }
      s += '<path d="M-80 -30 q30 -14 60 0" stroke="#fff" stroke-width="6" fill="none" opacity=".4" stroke-linecap="round"/>';
    } else {
      for (let i = 0; i < 30; i++) { const a = i / 30 * 6.28 * 2.1, p = polar(a, 40 + (i % 4) * 34); s += LEAF(p[0], p[1], a * 57.3 + 90 + (i % 3) * 25, 1.6, greens[i % 4]); }
      for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28 + 0.5, p = polar(a, 70 + (i % 2) * 40); s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (a * 57.3).toFixed(0) + ')"><path d="M-22 6 Q0 -34 22 6 Q0 -4 -22 6Z" fill="#d9442c"/><path d="M-12 2 Q0 -18 12 2" stroke="#f08a6a" stroke-width="3" fill="none" opacity=".8"/></g>'; }
      for (let i = 0; i < 8; i++) { const a = rn(i + 30) * 6.28, d = 30 + rn(i + 50) * 100, p = polar(a, d); s += '<g transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ')"><circle r="17" fill="#8fbf5a"/><circle r="12" fill="#d9ecb0" stroke-width="1.6"/><circle cx="-3" cy="-3" r="2.2" fill="#8fbf5a" stroke="none"/><circle cx="5" cy="4" r="2.2" fill="#8fbf5a" stroke="none"/></g>'; }
      for (let i = 0; i < 6; i++) { const a = rn(i + 70) * 6.28, d = 30 + rn(i + 90) * 100, p = polar(a, d); s += '<path transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (rn(i) * 360).toFixed(0) + ')" d="M-18 0 q8 -22 22 -10 q-6 14 -22 10Z" fill="#e8892c" stroke-width="2"/>'; }
      for (let i = 0; i < 8; i++) { const a = rn(i + 110) * 6.28, d = 20 + rn(i + 130) * 110, p = polar(a, d); s += '<path transform="translate(' + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") rotate(" + (rn(i) * 360).toFixed(0) + ')" d="M-14 0 q14 -12 28 0" fill="none" stroke="#a24a8a" stroke-width="5"/>'; }
    }
    for (let i = 0; i < 14; i++) { const a = rn(i + 500) * 6.28, d = Math.sqrt(rn(i + 520)) * 150, p = polar(a, d); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.2" fill="#2f2a26" stroke="none"/>'; }
    return { base: wrapG(B), svg: wrapG(s) };
  }

  /* sandwiches: two halves cut on the diagonal, standing so you see all the layers, on crinkled paper */
  function dishSandwich(r) {
    const has = function (k) { return !!r.ing[k]; }, grilled = r.id === "w-grilled";
    let s = "", paper = '<path d="M-200 -40 L-170 -130 L-60 -170 L40 -150 L150 -176 L206 -90 L190 20 L206 120 L110 176 L0 150 L-110 180 L-190 120 L-176 40Z" fill="#e8d3a6" stroke-width="2"/><path d="M-150 -90 L-60 -120 M60 -110 L150 -130 M-160 90 L-80 130 M70 130 L160 100 M-20 -140 L10 160" stroke="#c9ad78" stroke-width="2" opacity=".6" fill="none"/>';
    const layers = [];
    if (grilled) layers.push("cheese", "cheese2");
    else {
      if (has("mayo") || has("mayonnaise")) layers.push("mayo");
      if (has("lettuce") || has("spinach")) layers.push("lettuce");
      if (has("tomato")) layers.push("tomato");
      if (has("cucumber")) layers.push("cuke");
      if (has("ham")) layers.push("ham");
      if (has("cheddar") || has("mozzarella") || has("cheese")) layers.push("cheese");
      if (has("tuna")) layers.push("tuna");
      if (layers.length < 2) layers.push("lettuce", "tomato");
    }
    const half = function (cx, cy, rot, back) {
      const W = 220, topH = 40, y0 = 0; let y = 0, g = "";
      g += '<g transform="translate(' + cx + " " + cy + ") rotate(" + rot + ')">';
      g += '<rect x="' + (-W / 2 + 6) + '" y="' + (-100 + 12) + '" width="' + W + '" height="170" rx="22" fill="#3a2416" opacity=".16" stroke="none"/>';
      const bread = grilled ? "#d9953a" : "#e6c186", crumb = grilled ? "#e8b25c" : "#f6e3b4";
      let top = 70; g += '<rect x="' + (-W / 2) + '" y="' + (top - 36) + '" width="' + W + '" height="36" rx="12" fill="' + bread + '"/><rect x="' + (-W / 2 + 7) + '" y="' + (top - 30) + '" width="' + (W - 14) + '" height="24" rx="8" fill="' + crumb + '" stroke="none"/>';
      for (let i = 0; i < 12; i++) g += '<circle cx="' + (-W / 2 + 18 + rn(i) * (W - 36)).toFixed(1) + '" cy="' + (top - 26 + rn(i + 9) * 14).toFixed(1) + '" r="1.8" fill="#c9a064" stroke="none"/>';
      top -= 36;
      layers.forEach(function (L, idx) {
        let h = 20, body = "";
        const x0 = -W / 2 + 6, w = W - 12;
        if (L === "mayo") { h = 7; body = '<rect x="' + x0 + '" y="' + (top - h) + '" width="' + w + '" height="' + h + '" rx="3" fill="#fbf6e6"/>'; }
        else if (L === "lettuce") { h = 24; let d = "M" + (x0 - 8) + " " + top; for (let t = 0; t <= 11; t++) d += " Q" + (x0 - 8 + t * 20 + 10) + " " + (top - h - (t % 2 ? 6 : -4)) + " " + (x0 - 8 + t * 20 + 20) + " " + (top - h * 0.3); d += " L" + (x0 + w + 8) + " " + top + "Z"; body = '<path d="' + d + '" fill="#9fd064"/><path d="M' + (x0 + 10) + " " + (top - 8) + " q40 -10 80 0 t80 0" + '" stroke="#d3ea9a" stroke-width="3" fill="none"/>'; }
        else if (L === "tomato") { h = 20; for (let t = 0; t < 5; t++) body += '<rect x="' + (x0 + t * 42) + '" y="' + (top - h) + '" width="46" height="' + h + '" rx="9" fill="#d9442c"/><rect x="' + (x0 + t * 42 + 8) + '" y="' + (top - h + 5) + '" width="24" height="7" rx="3" fill="#f08a6a" stroke="none"/>'; }
        else if (L === "cuke") { h = 14; for (let t = 0; t < 7; t++) body += '<rect x="' + (x0 + t * 30) + '" y="' + (top - h) + '" width="32" height="' + h + '" rx="6" fill="#8fbf5a"/><rect x="' + (x0 + t * 30 + 4) + '" y="' + (top - h + 3) + '" width="24" height="7" rx="3" fill="#d9ecb0" stroke="none"/>'; }
        else if (L === "ham") { h = 20; let d = "M" + x0 + " " + top; for (let t = 0; t <= 10; t++) d += " Q" + (x0 + t * 20 + 10) + " " + (top - h - (t % 2 ? 4 : 8)) + " " + (x0 + t * 20 + 20) + " " + (top - h + 4); d += " L" + (x0 + w) + " " + top + "Z"; body = '<path d="' + d + '" fill="#eba0a2"/><path d="M' + (x0 + 10) + " " + (top - 8) + " h" + (w - 20) + '" stroke="#d0777c" stroke-width="2" fill="none"/>'; }
        else if (L === "cheese" || L === "cheese2") { h = grilled ? 26 : 12; body = '<rect x="' + (x0 - 4) + '" y="' + (top - h) + '" width="' + (w + 8) + '" height="' + h + '" rx="3" fill="#f5c84a"/><circle cx="' + (x0 + 40) + '" cy="' + (top - h / 2) + '" r="3" fill="#d9a22e" stroke="none"/><circle cx="' + (x0 + 120) + '" cy="' + (top - h / 2 - 1) + '" r="2.4" fill="#d9a22e" stroke="none"/>'; if (grilled) body += '<path d="M' + (x0 + 30) + " " + (top - 2) + " q-4 20 4 30 q6 -10 2 -30Z M" + (x0 + 150) + " " + (top - 2) + " q-6 24 2 34 q8 -12 4 -34Z" + '" fill="#f5c84a"/>'; }
        else if (L === "tuna") { h = 30; for (let t = 0; t < 9; t++) body += blob(x0 + 14 + t * 22, top - h / 2 + (t % 2) * 4 - 2, 15, t % 3 ? "#d9b58f" : "#f1dcc0", 900 + t, { n: 9, j: 0.2 }); body += '<circle cx="' + (x0 + 60) + '" cy="' + (top - 16) + '" r="2.4" fill="#fbf6e6" stroke="none"/><circle cx="' + (x0 + 140) + '" cy="' + (top - 10) + '" r="2.4" fill="#7ca24a" stroke="none"/>'; }
        g += body; top -= h;
      });
      g += '<rect x="' + (-W / 2) + '" y="' + (top - 42) + '" width="' + W + '" height="44" rx="16" fill="' + bread + '"/><path d="M' + (-W / 2 + 10) + " " + (top - 20) + " q" + (W / 2 - 10) + " 12 " + (W - 20) + ' 0" stroke="' + crumb + '" stroke-width="12" fill="none" stroke-linecap="round" opacity=".7" stroke-width="10"/>';
      if (grilled) for (let k = 0; k < 4; k++) g += '<path d="M' + (-W / 2 + 30 + k * 48) + " " + (top - 38) + " l16 30" + '" stroke="#6a3a18" stroke-width="5" opacity=".7"/>';
      else for (let k = 0; k < 8; k++) g += '<circle cx="' + (-W / 2 + 20 + rn(k + back) * (W - 40)).toFixed(1) + '" cy="' + (top - 34 + rn(k + 9 + back) * 18).toFixed(1) + '" r="2" fill="#b98a4c" stroke="none"/>';
      g += '<path d="M' + (-W / 2 + 14) + " " + (top - 30) + " q40 -10 80 -4" + '" stroke="#fff" stroke-width="5" opacity=".35" fill="none"/></g>';
      return g;
    };
    s += half(-4, -8, -6, 3) + half(10, 62, 3, 7);
    return { base: wrapG(paper), svg: wrapG(s) };
  }

  // which picture, and how it is eaten
  function dishFor(r) { const o = dishFor0(r); const v = o.svg; if (typeof v === "string") o.base = ""; else { o.base = v.base; o.svg = v.svg; } return o; }
  function dishFor0(r) {
    const id = r.id;
    if (id.indexOf("z-") === 0) return { svg: dishPizza(id.slice(2)), mode: "sector", col: "#e4b264", bowl: false };
    if (id.indexOf("q-") === 0) return { svg: dishQuiche(id), mode: "sector", col: "#efc65e", bowl: false };
    if (id.indexOf("s-") === 0) return { svg: dishSoup(id), mode: "shrink", col: id === "s-pumpkin" ? "#e08a2c" : id === "s-potato" ? "#ecd9a6" : "#dba04a", bowl: true };
    if (id.indexOf("p-") === 0) return { svg: dishPasta(id), mode: "shrink", col: id === "p-risotto" ? "#f2e6bb" : "#efd89c", bowl: false };
    if (id.indexOf("l-") === 0) return { svg: dishSalad(id), mode: "shrink", col: id === "l-greek" ? "#d9442c" : "#9fd064", bowl: true };
    return { svg: dishSandwich(r), mode: "edge", col: "#e6c186", bowl: false };
  }

  /* ---------- dinner: you carry it to the table and eat it, slowly ---------- */
  const DINE = { done: false };
  async function startDining(from) {
    st.stage = "dine"; recipeBox.hidden = true; chips.hidden = true; nextBtn.hidden = true; haloOff();
    const r = st.recipe, W = L.W, H = L.H, tall = L.tall, cx = W / 2, cy = tall ? 600 : 430, PR = tall ? 300 : 250;
    const eat = r.eat || "fork", DK = window.__drink || "water";
    function drinkArt() {
      if (DK === "cola") return '<circle r="46" fill="#c8312b"/><circle r="40" fill="#d8dcdb" stroke-width="2.6"/><circle r="33" fill="#b9bfbf" stroke-width="2"/><ellipse cx="2" cy="-4" rx="15" ry="9" fill="#e6e9e8" stroke-width="2.4"/><circle cx="-14" cy="6" r="5" fill="#7d8383" stroke-width="2"/><path d="M-30 -22 q10 -14 26 -14" stroke="#fff" stroke-width="4" fill="none" opacity=".6"/>';
      if (DK === "juice") return '<circle r="48" fill="#f6e3c8" fill-opacity=".9"/><circle r="38" fill="#f2992e" stroke-width="2.4"/><circle r="30" fill="#f7b24c" stroke="none" opacity=".8"/><path d="M-22 -18 q12 -14 30 -10" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/>';
      return '<circle r="48" fill="#dcecef" fill-opacity=".85"/><circle r="38" fill="#b9d6de" fill-opacity=".8" stroke-width="2.4"/><path d="M-22 -18 q12 -14 30 -10" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/>';
    }
    say("Let's sit down.", "Nothing left to do now but enjoy it."); kui.classList.add("slim", "dtop");
    const defs = TS.querySelector("defs"); defs.querySelectorAll(".tdmask").forEach(function (n) { n.remove(); });
    defs.insertAdjacentHTML("beforeend", '<mask class="tdmask" id="tdm" maskUnits="userSpaceOnUse" x="-500" y="-500" width="' + (W + 1000) + '" height="' + (H + 1000) + '"><rect x="-500" y="-500" width="' + (W + 1000) + '" height="' + (H + 1000) + '" fill="#fff"/><g id="tdmb"></g></mask>' +
      '<pattern class="tdmask" id="tlinen" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#f3e9cf"/><path d="M0 8 H30 M0 22 H30 M8 0 V30 M22 0 V30" stroke="#e2d3ad" stroke-width="2"/></pattern>');
    const d = document.createElementNS(NS, "g"); d.setAttribute("id", "tdine"); d.style.opacity = 0; d.style.transition = "opacity 1.3s ease";
    const GL = tall ? [650, 250] : [1290, 230], CD = tall ? [150, 250] : [320, 250];
    let m = '<rect x="-500" y="-500" width="' + (W + 1000) + '" height="' + (H + 1000) + '" fill="url(#twood)"/>' +
      '<g filter="url(#wobbleM)" stroke="' + INK + '" stroke-width="4.5" stroke-linejoin="round"><rect x="' + (tall ? 10 : 140) + '" y="' + (tall ? 90 : 30) + '" width="' + (tall ? 780 : 1320) + '" height="' + (tall ? 1100 : 900) + '" rx="10" fill="url(#tlinen)"/><rect x="' + (tall ? 30 : 160) + '" y="' + (tall ? 110 : 50) + '" width="' + (tall ? 740 : 1280) + '" height="' + (tall ? 1060 : 860) + '" rx="6" fill="none" stroke="#c9553f" stroke-width="3" stroke-dasharray="14 9" opacity=".7"/></g>';
    // napkin and cutlery
    const cut = function (x, y, kind) {
      return '<g transform="translate(' + x + " " + y + ')" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"><rect x="-34" y="-110" width="68" height="220" rx="6" fill="#e6efe9" transform="rotate(' + (kind === "f" ? -2 : 2) + ')"/>' +
        (kind === "f" ? '<path d="M-3 70 V-30 M-3 -30 H-17 V-92 M-3 -30 H11 V-92 M-3 -30 H-3 V-92" stroke="#aeb3b3" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-3 70 V10" stroke="#cfd3d2" stroke-width="9" stroke-linecap="round" fill="none"/>' : '<ellipse cx="0" cy="-60" rx="17" ry="26" fill="#cfd3d2"/><path d="M0 -34 V76" stroke="#cfd3d2" stroke-width="9" stroke-linecap="round" fill="none"/>') + "</g>";
    };
    m += cut(cx - PR - 70, cy, "f") + cut(cx + PR + 70, cy, "s");
    // the plate
    m += '<g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="4.4"><ellipse cx="' + (cx + 10) + '" cy="' + (cy + 14) + '" rx="' + PR + '" ry="' + (PR - 6) + '" fill="#3a2416" opacity=".22" stroke="none"/><circle cx="' + cx + '" cy="' + cy + '" r="' + PR + '" fill="#f6efdc"/><circle cx="' + cx + '" cy="' + cy + '" r="' + (PR - 22) + '" fill="none" stroke="#6f93aa" stroke-width="5" opacity=".85"/><circle cx="' + cx + '" cy="' + cy + '" r="' + (PR - 40) + '" fill="#fbf6e6" stroke-width="2.4"/></g>';
    // a glass of water and a candle
    m += '<g id="tglass" transform="translate(' + GL[0] + " " + GL[1] + ')"><g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3.6"><ellipse cx="5" cy="9" rx="50" ry="46" fill="#3a2416" opacity=".2" stroke="none"/>' + drinkArt() + '</g></g>' +
      '<g transform="translate(' + CD[0] + " " + CD[1] + ')"><g filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3.6"><ellipse cx="5" cy="9" rx="44" ry="40" fill="#3a2416" opacity=".2" stroke="none"/><circle r="40" fill="#efe3c4"/><circle r="28" fill="#f8f0d8" stroke-width="2.4"/></g><circle r="16" fill="#ffd27a" opacity=".5" class="tflame"/><ellipse rx="8" ry="11" fill="#f4a93a" class="tflame" stroke="none"/></g>';
    d.innerHTML = m;
    // the finished dish, plated like a photograph
    const dd = dishFor(r), sc = (PR - 46) / 204, trf = "translate(" + cx + " " + cy + ") scale(" + sc.toFixed(3) + ")";
    const baseG = el("g", { transform: trf }, d); baseG.innerHTML = dd.base;
    const wrap = el("g", { mask: "url(#tdm)" }, d), dish = el("g", { transform: trf }, wrap); dish.innerHTML = dd.svg;
    TS.insertBefore(d, RR.g);
    Array.prototype.forEach.call(TS.children, function (n) { if (n !== d && n !== defs && n !== RR.g && n !== LL.g && n.id !== "tover") n.style.display = "none"; });
    bubbles(false);
    await sleep(60); d.style.opacity = 1; SFX.rustle(); await sleep(1500);
    // steam from the dish, and the candle flicker
    const steam = setInterval(function () { const a = Math.random() * 6.28, rr = Math.random() * PR * 0.5; const c = el("circle", { cx: cx + Math.cos(a) * rr, cy: cy + Math.sin(a) * rr, r: 14, fill: "#fff", opacity: 0, stroke: "none" }, d); tween(2000, function (k) { c.setAttribute("r", 14 + k * 30); c.setAttribute("cy", cy + Math.sin(a) * rr - k * 60); c.setAttribute("opacity", (0.3 * Math.sin(k * Math.PI)).toFixed(2)); }).then(function () { c.remove(); }); }, 520);
    DINE.steam = steam;
    const bites = 5, bm = tq("tdmb"), CR = PR - 46, rb = CR * (dd.mode === "edge" ? 0.34 : 0.44);
    const lines = ["Mmm.", "Take your time.", "So warm and quiet.", "Almost done.", "The last bite."];
        const colr = dd.col;
    const rest = { x: cx + PR + 150 > W - 60 ? W - 120 : cx + PR + 150, y: tall ? 1050 : 700 };
    for (let i = 0; i < bites; i++) {
      let bx, by;
      if (dd.mode === "sector") { const am = (-90 + i * 72 + 36) * Math.PI / 180; bx = cx + Math.cos(am) * CR * 0.58; by = cy + Math.sin(am) * CR * 0.58; }
      else if (dd.mode === "edge") { const E = [[-0.78, -0.25], [0.8, -0.1], [-0.6, 0.4], [0.62, 0.45], [-0.32, -0.1], [0.3, 0.1]][i]; bx = cx + E[0] * CR; by = cy + E[1] * CR; }
      else { const a = (i * 72 + 20) * Math.PI / 180, rr = i < 4 ? CR * 0.6 : 0; bx = cx + Math.cos(a) * rr; by = cy + Math.sin(a) * rr; }
      say(lines[i], "Bite " + (i + 1) + " of " + bites + ".");
      const tl = eat === "wedge" ? null : eat;
      enter(tl, null, rest.x); if (eat === "wedge") RR.tool.innerHTML = "";
      const len = tl ? TH[tl] : 20;
      await go(bx + 30, by + len + 120, 0, 1500);
      await go(bx + 12, by + len, 0, 800);
      SFX.plop();
      // a bite-sized piece comes away
      const hole = el("g", {}, bm);
      if (dd.mode === "sector") {
        const a0 = (-90 + i * 72) * Math.PI / 180, pth = el("path", { fill: "#000" }, hole), R2 = CR * 1.4;
        await tween(600, function (k) { const a1 = a0 + k * 72.5 * Math.PI / 180; pth.setAttribute("d", "M" + cx + " " + cy + " L" + (cx + Math.cos(a0) * R2).toFixed(1) + " " + (cy + Math.sin(a0) * R2).toFixed(1) + " A" + R2 + " " + R2 + " 0 0 1 " + (cx + Math.cos(a1) * R2).toFixed(1) + " " + (cy + Math.sin(a1) * R2).toFixed(1) + " Z"); });
      } else {
        hole.innerHTML = '<circle cx="' + bx + '" cy="' + by + '" r="0" fill="#000"/>';
        const hc = hole.firstChild, extra = [[0.7, 0.6], [-0.6, 0.7], [0.1, -0.85]].map(function (o) { return el("circle", { cx: bx + o[0] * rb * 0.7, cy: by + o[1] * rb * 0.7, r: 0, fill: "#000" }, hole); });
        await tween(500, function (k) { hc.setAttribute("r", (rb * k).toFixed(1)); extra.forEach(function (c) { c.setAttribute("r", (rb * 0.45 * k).toFixed(1)); }); });
      }
      if (tl) { const f = RR.tool.querySelector("#tforkfood") || RR.tool.firstChild; const piece1 = el("ellipse", { cx: 0, cy: -(TH[tl] + (tl === "spoon" ? 12 : 20)), rx: tl === "spoon" ? 17 : 15, ry: tl === "spoon" ? 12 : 10, fill: colr, stroke: INK, "stroke-width": 2.4 }, RR.tool); piece1.setAttribute("class", "tmorsel"); }
      else { const pc = el("g", { stroke: INK, "stroke-width": 3, "stroke-linejoin": "round" }, RR.tool); pc.innerHTML = '<path d="M-40 -10 Q0 -22 40 -10 L0 -92 Z" fill="' + colr + '"/><path d="M-26 -14 L26 -14 L0 -66 Z" fill="' + mix(colr, "#ffffff", 0.28) + '" stroke-width="2"/><path d="M-40 -10 Q0 -22 40 -10" fill="none" stroke="#c98a3a" stroke-width="9" stroke-linecap="round"/><circle cx="-8" cy="-34" r="3.4" fill="#fff" opacity=".5" stroke="none"/>'; }
      await sleep(350);
      // up toward your mouth, slowly: it grows as it comes closer
      await tween(1900, function (k) { const e = k * k * (3 - 2 * k); put(lerp(bx + 12, W / 2 + 40, e), lerp(by + len, H - 70, e), lerp(0, -4, e), RR); RR.tool.setAttribute("transform", "scale(" + lerp(1, 1.7, e).toFixed(3) + ")"); });
      await sleep(250); SFX.sip(); RR.tool.querySelectorAll(".tmorsel").forEach(function (n) { n.remove(); });
      if (eat === "wedge") RR.tool.innerHTML = "";
      await tween(500, function (k) { put(W / 2 + 40, H - 70 + 40 * k, -4, RR); });
      await sleep(2000 + Math.random() * 600);          // chewing, peacefully
      await tween(1500, function (k) { const e = k * k * (3 - 2 * k); put(lerp(W / 2 + 40, rest.x, e), lerp(H - 30, rest.y, e), 0, RR); RR.tool.setAttribute("transform", "scale(" + lerp(1.7, 1, e).toFixed(3) + ")"); });
      await leave();
      if (i === 1 || i === 3) {
        // a sip of water
        const gl = tq("tglass"); enter(null, null, GL[0], RR);
        await go(GL[0], GL[1] + 60, 0, 1200); SFX.rustle(); await sleep(200);
        await tween(1800, function (k) { const e = k * k * (3 - 2 * k); gl.setAttribute("transform", "translate(" + lerp(GL[0], W / 2 + 60, e).toFixed(1) + " " + lerp(GL[1], H - 100, e).toFixed(1) + ") scale(" + lerp(1, 1.6, e).toFixed(3) + ") rotate(" + (-18 * e).toFixed(1) + ")"); put(lerp(GL[0], W / 2 + 60, e), lerp(GL[1], H - 100, e) + 60 * lerp(1, 1.6, e), 0, RR); });
        SFX.sip(); await sleep(1500);
        await tween(1500, function (k) { const e = k * k * (3 - 2 * k); gl.setAttribute("transform", "translate(" + lerp(W / 2 + 60, GL[0], e).toFixed(1) + " " + lerp(H - 100, GL[1], e).toFixed(1) + ") scale(" + lerp(1.6, 1, e).toFixed(3) + ") rotate(" + (-18 * (1 - e)).toFixed(1) + ")"); put(lerp(W / 2 + 60, GL[0], e), lerp(H - 100, GL[1], e) + 60 * lerp(1.6, 1, e), 0, RR); });
        SFX.drop(); await leave();
      }
      await sleep(700);
    }
    clearInterval(steam);
    say("That was lovely, {name}.", "Rest a moment. There's nothing else to do tonight but be here.");
    kui.classList.remove("dtop"); kui.classList.add("slim"); hint.textContent = "Rest a moment. There's nothing else to do tonight but be here."; kui.classList.remove("slim");
    nextBtn.hidden = false; nextBtn.textContent = "Continue";
  }

  /* ---------- inside the fridge, the cupboard and the spice rack ---------- */
  const SHELVES = {
    fridge: [["eggs", "milk", "cream", "butter", "mayo", "pastry", "pizzadough"], ["cheddar", "mozzarella", "parmesan", "feta", "ham", "pepperoni"], ["chicken", "beef", "shrimp", "basil"], ["tomato", "lettuce", "cucumber", "redonion", "bellpepper", "spinach", "mushroom", "carrot", "zucchini"]],
    pantry: [["flour", "spaghetti", "fettuccine", "arborio", "croutons", "bread"], ["passata", "oil", "stock", "vinegar", "caesar", "lemon"], ["potato", "onion", "garlic", "pumpkin", "tuna", "olives"]],
    spice: [["salt", "pepper", "oregano", "thyme"], ["nutmeg", "paprika", "chili", "parsley"]]
  };
  const BASE = { fridge: [170, 332, 494, 656], pantry: [200, 410, 620], spice: [270, 540] };
  const SCALE = { drinks: 1.2, fridge: 0.92, pantry: 1.0, spice: 1.5 };
  let inPlace = null;
  const inwrap = $("cook-inwrap");
  function layoutInside(place) {
    const rows = SHELVES[place], sc = SCALE[place];
    if (isTall()) {
      const flat = [].concat.apply([], rows), per = place === "spice" ? 2 : 3, out = [], sp = place === "spice" ? 320 : 245, rh = place === "spice" ? 270 : 200;
      for (let i = 0; i < flat.length; i += per) { const r = out.length, its = flat.slice(i, i + per); out.push({ y: 290 + r * rh, items: its.map(function (id, j) { return { id: id, x: 400 + (j - (its.length - 1) / 2) * sp }; }) }); }
      return { W: 800, H: 290 + out.length * rh + 40, rows: out, tall: true };
    }
    return { W: 1600, H: 900, rows: rows.map(function (row, ri) { const n = row.length, sp = Math.min(place === "spice" ? 250 : 168, (place === "fridge" ? 1040 : 1100) / n), x0 = 850 - (n - 1) * sp / 2; return { y: BASE[place][ri], items: row.map(function (id, i) { return { id: id, x: x0 + i * sp }; }), crisper: place === "fridge" && ri === 3 }; }), tall: false };
  }
  function insideBack(place, L) {
    const W = L.W, H = L.H, I = '<g stroke="' + INK + '" stroke-linejoin="round" stroke-linecap="round">';
    let m = '<defs><radialGradient id="ilight" cx="50%" cy="0%" r="90%"><stop offset="0" stop-color="#fffbe6" stop-opacity=".9"/><stop offset="1" stop-color="#fffbe6" stop-opacity="0"/></radialGradient><pattern id="iplank" width="200" height="60" patternUnits="userSpaceOnUse"><rect width="200" height="60" fill="#b98750"/><path d="M0 1 H200 M0 31 H200 M0 59 H200" stroke="#8a5a30" stroke-width="3"/><path d="M20 12 q40 -6 80 0 M110 44 q40 -6 70 0" stroke="#d2a46a" stroke-width="3" fill="none" opacity=".7"/></pattern></defs>';
    m += '<rect x="-400" y="-400" width="' + (W + 800) + '" height="' + (H + 800) + '" fill="' + (place === "fridge" ? "#cfe3d6" : place === "pantry" ? "#6d4426" : "#ead6a8") + '"/>';
    const fx = L.tall ? 14 : 150, fw = W - fx * 2;
    if (place === "fridge") {
      m += I + '<rect x="' + (fx - 40) + '" y="-30" width="' + (fw + 80) + '" height="' + (H + 60) + '" rx="40" fill="#cfe3d6" stroke="none"/><rect x="' + (fx + 34) + '" y="48" width="' + (fw - 68) + '" height="' + (H - 96) + '" rx="22" fill="#f4f1e4" stroke-width="5"/><rect x="' + (fx + 34) + '" y="48" width="' + (fw - 68) + '" height="' + (H - 96) + '" rx="22" fill="url(#ilight)" stroke="none"/>';
      if (!L.tall) m += '<rect x="236" y="540" width="1130" height="170" rx="14" fill="#cfe7df" fill-opacity=".6" stroke-width="4"/><path d="M236 580 H1366" stroke-width="2.4" opacity=".4" fill="none"/>';
      m += "</g>";
    } else if (place === "pantry") {
      m += I + '<rect x="' + (fx - 60) + '" y="-30" width="' + (fw + 120) + '" height="' + (H + 60) + '" rx="16" fill="#6d4426" stroke="none"/><rect x="' + (fx + 14) + '" y="48" width="' + (fw - 28) + '" height="' + (H - 96) + '" rx="8" fill="url(#iplank)" stroke-width="5"/><rect x="' + (fx + 14) + '" y="48" width="' + (fw - 28) + '" height="' + (H - 96) + '" fill="url(#ilight)" stroke="none" opacity=".5"/></g>';
    } else {
      m += I + '<rect width="' + W + '" height="' + H + '" fill="#ead6a8" stroke="none"/><rect x="' + (fx + 30) + '" y="20" width="' + (fw - 60) + '" height="' + (H - 40) + '" rx="26" fill="#8a5a34" stroke-width="7"/><rect x="' + (fx + 56) + '" y="46" width="' + (fw - 112) + '" height="' + (H - 92) + '" rx="14" fill="#c9965c" stroke-width="4"/></g>';
    }
    return m;
  }
  function insideShelf(place, y, L) {
    const w = L.tall ? L.W - 120 : place === "fridge" ? 1080 : 1180, x = L.W / 2 + (L.tall ? 0 : 50) - w / 2;
    if (place === "fridge") return '<g stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="16" rx="5" fill="#bfe0dc" fill-opacity=".85"/><rect x="' + x + '" y="' + (y + 16) + '" width="' + w + '" height="30" rx="4" fill="#d8ece6" fill-opacity=".9"/></g>';
    return '<g stroke="' + INK + '" stroke-width="4.4" stroke-linejoin="round"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="20" rx="5" fill="#a46b3c"/><rect x="' + x + '" y="' + (y + 20) + '" width="' + w + '" height="34" rx="4" fill="#8a5230"/></g>';
  }
  function buildInside(place) {
    inPlace = place;
    if (place === "fridge" || place === "drinks") return buildFridge(place);
    const L = layoutInside(place), sc = SCALE[place];
    IN.setAttribute("viewBox", "0 0 " + L.W + " " + L.H); inwrap.style.background = place === "fridge" ? "#cfe3d6" : place === "pantry" ? "#6d4426" : "#ead6a8";
    IN.setAttribute("preserveAspectRatio", L.tall ? "xMidYMin meet" : "xMidYMid meet");
    IN.classList.toggle("tall", L.tall);
    let m = insideBack(place, L);
    L.rows.forEach(function (row) {
      if (!row.crisper) m += insideShelf(place, row.y, L);
      const sp = row.items.length > 1 ? Math.abs(row.items[1].x - row.items[0].x) : 160;
      row.items.forEach(function (it) {
        const id = it.id;
        m += '<g transform="translate(' + it.x.toFixed(0) + " " + row.y + ')"><g class="cin' + (st.got[id] ? " got" : "") + '" data-id="' + id + '" role="button" tabindex="0" aria-label="' + NAMES[id] + '">' +
          '<g transform="scale(' + sc + ')" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">' + artOf(id) + "</g>" +
          '<rect x="' + (-sp / 2 + 6) + '" y="' + (-120 * sc) + '" width="' + (sp - 12) + '" height="' + (120 * sc + (place === "fridge" ? 40 : 52)) + '" fill="transparent"/>' +
          '<text x="0" y="' + (place === "fridge" ? 38 : 44) + '" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="' + (place === "spice" ? 28 : 23) + '" fill="' + (place === "fridge" ? "#3a2416" : "#f6ecd0") + '" stroke="none">' + NAMES[id] + "</text>" +
          '<text class="cin-tick" x="' + (30 * sc) + '" y="' + (-76 * sc) + '" font-family="Chewy, cursive" font-size="40" fill="#4f7a3c" stroke="#f6ecd0" stroke-width="3" paint-order="stroke">✓</text></g></g>';
      });
    });
    m += '<g id="ifx"></g>';
    IN.innerHTML = m;
    updBasket();
  }

  /* ---------- a proper fridge: glass shelves with things resting on them, crisper drawers below ---------- */
  const DRK = {
    "d-cola": ["Cola", function () { return '<rect x="-27" y="-98" width="54" height="98" rx="9" fill="#c8312b"/><rect x="-27" y="-98" width="54" height="11" rx="5" fill="#d4d8d8"/><rect x="-24" y="-8" width="48" height="8" rx="4" fill="#d4d8d8"/><path d="M-27 -62 Q-9 -76 0 -58 T27 -50 V-30 Q9 -42 0 -26 T-27 -34 Z" fill="#fff" stroke="none" opacity=".92"/><path d="M-18 -92 V-14" stroke="#fff" stroke-width="3" opacity=".35" fill="none"/>'; }],
    "d-juice": ["Orange juice", function () { return '<path d="M-30 -112 L0 -134 L30 -112 Z" fill="#e08a1f"/><rect x="-30" y="-112" width="60" height="112" rx="4" fill="#f4a63a"/><rect x="-30" y="-84" width="60" height="44" fill="#fff6e0" stroke-width="2.4"/><circle cx="0" cy="-62" r="15" fill="#f08a1e"/><path d="M0 -62 V-77 M0 -62 L13 -55 M0 -62 L-13 -55" stroke="#fde2a8" stroke-width="2.4" fill="none"/><path d="M4 -78 q8 -8 14 -3 q-6 7 -14 3 Z" fill="#6a9a3c" stroke-width="2"/>'; }],
    "d-water": ["Water", function () { return '<path d="M-12 -126 H12 V-110 Q28 -96 28 -80 V-8 Q28 0 20 0 H-20 Q-28 0 -28 -8 V-80 Q-28 -96 -12 -110 Z" fill="#cfe6ee" fill-opacity=".9"/><path d="M-28 -52 H28 V-8 Q28 0 20 0 H-20 Q-28 0 -28 -8 Z" fill="#9fcde0" stroke="none"/><rect x="-13" y="-140" width="26" height="15" rx="4" fill="#3f86c7"/><rect x="-28" y="-90" width="56" height="26" fill="#fff" fill-opacity=".85" stroke-width="2"/><path d="M-4 -88 q4 8 0 14 q-4 -6 0 -14 Z" fill="#3f86c7" stroke="none"/><path d="M-19 -100 V-12" stroke="#fff" stroke-width="3" opacity=".6" fill="none"/>'; }]
  };
  const nameOf = function (id) { return DRK[id] ? DRK[id][0] : NAMES[id]; };
  const artOf2 = function (id) { return DRK[id] ? DRK[id][1]() : artOf(id); };
  function fridgeUnits(place, tall) {
    // each unit: {kind:"shelf"|"bin", items:[{id, deco}]}
    const F = SHELVES.fridge, mk = function (a, deco) { return a.map(function (id) { return { id: id, deco: !!deco }; }); };
    let u;
    if (place === "drinks") {
      u = [{ kind: "shelf", items: mk(["eggs", "milk", "butter", "cheddar", "mayo"], 1) }, { kind: "shelf", items: mk(["d-cola", "d-juice", "d-water"]), big: false }, { kind: "shelf", items: mk(["ham", "mozzarella", "parmesan", "feta"], 1) }, { kind: "bin", items: mk(["tomato", "lettuce", "cucumber"], 1) }, { kind: "bin", items: mk(["carrot", "bellpepper", "spinach"], 1) }];
    } else {
      u = [{ kind: "shelf", items: mk(F[0]) }, { kind: "shelf", items: mk(F[1]) }, { kind: "shelf", items: mk(F[2]) }, { kind: "bin", items: mk(F[3].slice(0, 5)) }, { kind: "bin", items: mk(F[3].slice(5)) }];
    }
    if (!tall) return u;
    const out = [];
    u.forEach(function (x) { for (let i = 0; i < x.items.length; i += 3) out.push({ kind: x.kind, big: x.big, items: x.items.slice(i, i + 3) }); });
    return out;
  }
  function buildFridge(place) {
    const tall = isTall(), units = fridgeUnits(place, tall), W = tall ? 800 : 1600, sc = (place === "drinks" ? 0.95 : 0.92) * (tall ? 1.2 : 1);
    const pitch = tall ? 215 : 160, y0 = tall ? 420 : 200;
    // desktop: 3 shelves then two drawers side by side; tall: everything stacked
    const H = tall ? y0 + units.length * pitch + 60 : 900;
    IN.setAttribute("viewBox", "0 0 " + W + " " + H); IN.setAttribute("preserveAspectRatio", tall ? "xMidYMin meet" : "xMidYMid meet"); IN.classList.toggle("tall", tall);
    inwrap.style.background = "#ece8dc";
    const I = '<g stroke="' + INK + '" stroke-linejoin="round" stroke-linecap="round">';
    const fx = tall ? 20 : 170, fw = W - fx * 2, ix = fx + 40, iw = fw - 80, iy = 66, ih = H - 66 - 50;
    let m = '<defs><linearGradient id="fwall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfdf8"/><stop offset=".55" stop-color="#eaf3ef"/><stop offset="1" stop-color="#d7e8e4"/></linearGradient><radialGradient id="flamp" cx="50%" cy="0%" r="75%"><stop offset="0" stop-color="#fff9dc" stop-opacity=".95"/><stop offset="1" stop-color="#fff9dc" stop-opacity="0"/></radialGradient></defs>';
    m += '<rect x="-400" y="-400" width="' + (W + 800) + '" height="' + (H + 800) + '" fill="#ece8dc"/>';
    // the fridge body and its inside
    m += I + '<rect x="' + (fx - 60) + '" y="-60" width="' + (fw + 120) + '" height="' + (H + 110) + '" rx="48" fill="#ece8dc" stroke="none"/><rect x="' + ix + '" y="' + iy + '" width="' + iw + '" height="' + ih + '" rx="20" fill="url(#fwall)" stroke-width="5"/></g>';
    m += '<ellipse cx="' + (W / 2) + '" cy="' + iy + '" rx="' + (iw * 0.45) + '" ry="150" fill="url(#flamp)"/>';
    m += I + '<rect x="' + (W / 2 - 90) + '" y="' + (iy + 6) + '" width="180" height="12" rx="6" fill="#fffbe6" stroke-width="3"/>';
    // soft ribs on the back wall and side rails for the shelves
    for (let k = 1; k < 5; k++) m += '<path d="M' + (ix + iw * k / 5) + " " + (iy + 24) + " V" + (iy + ih - 24) + '" stroke="#b9d3cd" stroke-width="2" opacity=".45" fill="none"/>';
    m += "</g>";
    const sp = tall ? 235 : 150, binInner = tall ? 235 : 104;
    let items = "", labs = "";
    units.forEach(function (u, ui) {
      let y, x0, x1, cx0;
      if (tall) { y = y0 + ui * pitch; x0 = ix + 14; x1 = ix + iw - 14; cx0 = W / 2; }
      else if (u.kind === "shelf") { y = y0 + ui * pitch; x0 = ix + 26; x1 = ix + iw - 26; cx0 = W / 2; }
      else { const bi = ui - 3; y = 735; x0 = bi ? 810 : 250; x1 = bi ? 1350 : 790; cx0 = (x0 + x1) / 2; }
      const n = u.items.length, step = u.kind === "bin" ? binInner : sp, big = u.big ? 1.15 : 1;
      const isBin = u.kind === "bin";
      // the shelf or drawer itself
      if (!isBin) {
        m += I + '<rect x="' + (x0 - 22) + '" y="' + (y - 12) + '" width="22" height="30" rx="5" fill="#dfe6e4" stroke-width="3.4"/><rect x="' + x1 + '" y="' + (y - 12) + '" width="22" height="30" rx="5" fill="#dfe6e4" stroke-width="3.4"/>';
        m += '<path d="M' + x0 + " " + y + " H" + x1 + " L" + (x1 + 16) + " " + (y + 12) + " H" + (x0 - 16) + ' Z" fill="#d9eeee" fill-opacity=".92" stroke-width="3.6"/><rect x="' + (x0 - 16) + '" y="' + (y + 12) + '" width="' + (x1 - x0 + 32) + '" height="13" rx="4" fill="#a9d3d0" stroke-width="3.6"/><path d="M' + (x0 + 30) + " " + (y + 4) + " H" + (x0 + 220) + '" stroke="#fff" stroke-width="3" opacity=".7" fill="none"/></g>';
      } else {
        m += I + '<rect x="' + x0 + '" y="' + (y - 124) + '" width="' + (x1 - x0) + '" height="190" rx="14" fill="#c9e3df" fill-opacity=".55" stroke-width="4"/></g>';
      }
      const row = u.items.map(function (it, j) { return { it: it, x: cx0 + (j - (n - 1) / 2) * step }; });
      row.forEach(function (r) {
        const id = r.it.id, s2 = sc * big;
        if (r.it.deco) { items += '<g transform="translate(' + r.x.toFixed(0) + " " + y + ') scale(' + sc + ')" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round" opacity=".92">' + artOf2(id) + "</g>"; return; }
        items += '<g transform="translate(' + r.x.toFixed(0) + " " + y + ')"><g class="cin' + (st.got[id] ? " got" : "") + '" data-id="' + id + '" role="button" tabindex="0" aria-label="' + nameOf(id) + '">' +
          '<g transform="scale(' + s2 + ')" filter="url(#wobbleS)" stroke="' + INK + '" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">' + artOf2(id) + "</g>" +
          '<rect x="' + (-step / 2 + 4) + '" y="' + (-125 * s2) + '" width="' + (step - 8) + '" height="' + (125 * s2 + (isBin ? 90 : 54)) + '" fill="transparent"/>' +
          '<text class="cin-tick" x="' + (30 * s2) + '" y="' + (-76 * s2) + '" font-family="Chewy, cursive" font-size="40" fill="#4f7a3c" stroke="#f6ecd0" stroke-width="3" paint-order="stroke">✓</text></g></g>';
        labs += '<text x="' + r.x.toFixed(0) + '" y="' + (y + (isBin ? 44 : 46)) + '" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="' + (isBin ? 21 : 24) + '" fill="#3a2416" stroke="none" pointer-events="none">' + nameOf(id) + "</text>";
      });
      if (isBin) {
        // the front of the drawer sits over the bottom of what is inside it
        items += I + '<g pointer-events="none"><rect x="' + x0 + '" y="' + (y - 14) + '" width="' + (x1 - x0) + '" height="' + 80 + '" rx="12" fill="#bfe0dc" fill-opacity=".94" stroke-width="4"/><rect x="' + (cx0 - 44) + '" y="' + (y + 50) + '" width="88" height="9" rx="4.5" fill="#8fb8b4" stroke-width="2.4"/></g></g>';
      }
    });
    m += items + labs + '<g id="ifx"></g>';
    IN.innerHTML = m; updBasket();
  }
  const basketEl = $("cook-basket"), basketN = $("cb-n");
  function updBasket() { if (st.recipe) basketN.textContent = gotCount() + " / " + need().length; }
  async function flyToBasket(g) {
    // the little thing hops up and away into your basket
    const c = g.cloneNode(true); c.classList.remove("got"); c.querySelectorAll("text, rect").forEach(function (e) { e.remove(); });
    const f = IN.querySelector("#ifx"), w = document.createElementNS(NS, "g"); w.appendChild(c); f.appendChild(w);
    const m = g.parentNode.getAttribute("transform").match(/translate\(([-\d.]+) ([-\d.]+)\)/), px = +m[1], py = +m[2];
    w.setAttribute("transform", "translate(" + px + " " + py + ")");
    const vb = IN.viewBox.baseVal, tx = vb.width - 150, ty = py - 240;
    await tween(800, function (t) { const x = lerp(px, tx, t * t), y = lerp(py, ty, t) - Math.sin(t * Math.PI) * 60, s = lerp(1, 0.2, t); w.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + s.toFixed(3) + ")"); w.setAttribute("opacity", 1 - t * t); });
    w.remove();
    basketEl.classList.remove("bump"); void basketEl.offsetWidth; basketEl.classList.add("bump");
  }

  /* ---------- the recipe card, pinned in the corner ---------- */
  const kui = $("cook-ui");
  const need = function () { return Object.keys(st.recipe.ing); };
  const gotCount = function () { return need().filter(function (k) { return st.got[k]; }).length; };
  function renderCard() {
    const r = st.recipe;
    if (!r || st.stage === "menu" || st.stage === "end" && false) { recipeBox.hidden = true; return; }
    recipeBox.hidden = false; crTitle.textContent = r.name;
    const n = r.steps.length;
    crNow.textContent = st.stage === "cook" ? "Step " + Math.min(st.step + 1, n) + " of " + n + " · " + instr(r.steps[Math.min(st.step, n - 1)]) : st.stage === "gather" ? gotCount() + " of " + need().length + " gathered" : "Enjoy!";
    let h = '<h4>You\'ll need</h4>';
    ["fridge", "pantry", "spice"].forEach(function (pl) {
      const ids = need().filter(function (k) { return ING[k][1] === pl; });
      if (!ids.length) return;
      h += "<h5>" + PLACES[pl] + "</h5><ul>" + ids.map(function (k) {
        const used = st.stage === "cook" && uses[k] === 0;
        return '<li class="' + (st.got[k] ? "tick" : "") + (used ? " used" : "") + '"><i></i>' + NAMES[k] + " <em>" + r.ing[k] + "</em></li>";
      }).join("") + "</ul>";
    });
    h += "<h4>Method</h4><ol>" + r.steps.map(function (s, i) { return '<li class="' + (st.stage === "cook" && i < st.step || st.stage === "end" ? "done" : st.stage === "cook" && i === st.step ? "now" : "") + '">' + instr(s).replace(/</g, "&lt;") + "</li>"; }).join("") + "</ol>";
    crBody.innerHTML = h;
    fitCard();
  }
  function fitCard() {
    if (recipeBox.classList.contains("closed")) return;
    // on a phone, while cooking, show only the steps around where you are, so the writing can stay big
    const small = window.innerWidth <= 700 && st.stage === "cook", lis = crBody.querySelectorAll("ol li");
    crBody.classList.toggle("compact", small);
    lis.forEach(function (li, i) { li.style.display = small && (i < st.step - 1 || i > st.step + 3) ? "none" : ""; });
    for (let fs = small ? 22 : 19; fs >= (small ? 15 : 10); fs--) {
      crBody.style.fontSize = fs + "px";
      if (crBody.scrollHeight <= crBody.clientHeight + 1) break;
    }
  }
  window.addEventListener("resize", function () { if (!recipeBox.hidden) fitCard(); });
  crHead.addEventListener("click", function () { const c = recipeBox.classList.toggle("closed"); crHead.setAttribute("aria-expanded", c ? "false" : "true"); if (!c) fitCard(); });

  /* ---------- the menu ---------- */
  function resetScene(r) {
    heatStop && heatStop(); heatStop = null; bubbles(false);
    TS.classList.remove("on"); S.style.opacity = 1; S.style.pointerEvents = "";
    nextBtn.hidden = true; clearInterval(DINE.steam); haloOff(); if (RR) hide(); kui.classList.remove("dtop", "slim"); IN.classList.remove("on"); inwrap.classList.remove("on"); basketEl.hidden = true; st.inside = null; marks();
  }
  function chipRow(list) {
    chips.hidden = !list.length; chips.innerHTML = "";
    list.forEach(function (c) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "k-chip"; b.textContent = c[0]; b.addEventListener("click", c[1]); chips.appendChild(b);
    });
  }
  /* ---------- first-time "how to play" ---------- */
  function showHowTo() {
    let box = $("cook-howto"); if (box) box.remove();
    box = document.createElement("div"); box.id = "cook-howto"; box.className = "howto"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "How to play");
    const rows = [
      ["Choose a dish", "Pick a kind of dish, then the recipe you fancy."],
      ["Gather what you need", "Tap the fridge, the cupboard and the spice rack to walk inside. Tap each ingredient on your list to put it in your basket."],
      ["Cook, one step at a time", "Your recipe card shows the steps. The thing to tap next glows softly. Tap it and your hands do the work, slowly. No timer, no rush."],
      ["Sit down and enjoy", "Choose a drink from the fridge, carry your plate to the table and enjoy it, bite by bite."]
    ];
    box.innerHTML = '<div class="howto-card"><h3>How to play</h3><ol>' + rows.map(function (r) { return "<li><b>" + r[0] + "</b><span>" + r[1] + "</span></li>"; }).join("") + '</ol><button type="button" class="k-chip howto-ok">Got it, let\'s cook</button></div>';
    $("step-cooking").appendChild(box);
    box.querySelector(".howto-ok").addEventListener("click", function () { box.remove(); try { localStorage.setItem("pe-cook-howto", "1"); } catch (e) {} });
  }
  function showMenu() {
    st.stage = "menu"; st.busy = false; st.recipe = null; resetScene(null); recipeBox.hidden = true;
    cam("wide", 0);
    say("What shall we cook tonight, {name}?", "Pick a kind of dish.");
    chipRow(MENU.map(function (c) { return [c.name, function () { showCategory(c); }]; }).concat([["? How to play", showHowTo]]));
  }
  function showCategory(c) {
    st.stage = "menu";
    say(c.name + ", lovely.", c.line);
    chipRow(c.recipes.map(function (r) { return [r.name, function () { startGather(r); }]; }).concat([["← Back", showMenu]]));
  }

  /* ---------- going to the fridge, the cupboard and the spice rack ---------- */
  const PLACE_OF = { fridge: "fridge", cupboard: "pantry", rack: "spice" }, ELEM_OF = { fridge: "cfridge", pantry: "ccupboard", spice: "crack" };
  function marks() {
    Object.keys(ELEM_OF).forEach(function (pl) {
      const left = st.recipe && st.stage === "gather" && !st.inside && need().some(function (k) { return ING[k][1] === pl && !st.got[k]; });
      q(ELEM_OF[pl]).classList.toggle("hint", !!left);
    });
  }
  function zoomRect(cx, cy, w) { const a = isTall() ? 0.63 : 1.78; return [cx - w / 2, cy - w / a / 2, w, w / a]; }
  const ZOOM = { fridge: [1537, 420, 520], pantry: [1145, 190, 340], spice: [1205, 410, 360] };
  async function enterInside(place) {
    if (st.stage !== "gather" || st.busy || st.inside) return;
    st.busy = true; st.inside = place; haloOff(); SFX.rustle();
    const from = (camNow || camTarget("wide")).slice(), to = zoomRect.apply(null, ZOOM[place]);
    await tween(900, function (k) { camApply(from.map(function (n, i) { return lerp(n, to[i], k); })); });
    kui.classList.remove("dtop"); kui.classList.add("slim"); buildInside(place); IN.classList.add("on"); inwrap.classList.add("on"); inwrap.scrollTop = 0; basketEl.hidden = false;
    say(PLACES[place], place === "spice" ? "Tap the spices your recipe needs." : "Tap what your recipe needs. It goes in the basket.");
    chipRow([["Back to the kitchen", leaveInside]]); nextBtn.hidden = true;
    st.busy = false; marks(); renderCard();
  }
  async function leaveInside() {
    if (!st.inside || st.busy) return;
    kui.classList.remove("slim"); st.busy = true; inwrap.classList.remove("on"); IN.classList.remove("on"); basketEl.hidden = true; SFX.rustle(); st.inside = null;
    await sleep(250); await cam("wide", 900);
    st.busy = false; gatherPrompt();
  }
  function gatherPrompt() {
    const n = need().length, g = gotCount();
    say(g >= n ? "That's everything, {name}." : "Let's make " + st.recipe.name + ".", g >= n ? "Ready when you are." : "Go to the fridge, the cupboard and the spice rack and pick what the recipe needs. (" + g + " of " + n + ")");
    chipRow(g >= n ? [] : [["← Back", function () { showCategory(st.cat); }]]);
    nextBtn.hidden = g < n; nextBtn.textContent = "Start cooking";
    marks(); renderCard();
  }
  async function takeInside(g) {
    const id = g.dataset.id;
    if (!st.recipe.ing[id]) { g.classList.remove("shake"); void g.getBoundingClientRect(); g.classList.add("shake"); SFX.tap(); hint.textContent = "Not needed for this one."; return; }
    if (st.got[id]) return;
    st.got[id] = 1; g.classList.add("got"); SFX.pop(2);
    hint.textContent = "Got the " + NAMES[id].toLowerCase() + ".";
    await flyToBasket(g); updBasket(); renderCard();
    if (need().filter(function (k) { return ING[k][1] === inPlace; }).every(function (k) { return st.got[k]; })) hint.textContent = "That's all you need from here.";
    if (gotCount() >= need().length) { say("That's everything, {name}.", "Head back to the kitchen."); }
  }
  IN.addEventListener("click", function (e) { const g = e.target.closest ? e.target.closest(".cin") : null; if (g && st.stage === "gather") takeInside(g); else if (g && st.stage === "drink") pickDrink(g); });
  IN.addEventListener("keydown", function (e) { const g = e.target.closest ? e.target.closest(".cin") : null; if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); if (st.stage === "drink") pickDrink(g); else takeInside(g); } });

  function startGather(r) {
    st.recipe = r; st.got = {}; st.step = 0; st.stage = "gather"; st.cat = MENU.filter(function (c) { return c.recipes.indexOf(r) >= 0; })[0];
    resetScene(r); cam("wide", 700);
    if (window.innerWidth < 700) recipeBox.classList.add("closed"); else recipeBox.classList.remove("closed");
    gatherPrompt();
  }

  /* ---------- cooking, one slow step at a time ---------- */
  function promptStep() {
    const r = st.recipe, s = r.steps[st.step], w = tapOf(s), i = ingOf(s);
    title.textContent = instr(s);
    hint.textContent = "Step " + (st.step + 1) + " of " + r.steps.length + " · " + tapHint(s);
    haloOn(w); matNeed(i && i !== "water" ? usedIn(s) : []);
    renderCard();
  }
  async function startCooking() {
    st.stage = "cook"; st.step = 0; st.busy = true; nextBtn.hidden = true; chipRow([]); marks();
    title.textContent = "Let's get cooking."; hint.textContent = "Everything is laid out on the cloth.";
    renderCard();
    buildTop(); plateInit(); tfx.innerHTML = ""; haloOff();
    TS.classList.add("on"); S.style.pointerEvents = "none"; SFX.rustle();
    await sleep(1300); S.style.opacity = 0;
    buildMat(); await layMat();
    st.busy = false; promptStep();
  }
  async function runStep() {
    const s = st.recipe.steps[st.step], t = s[0];
    st.busy = true; haloOff(); matNeed([]);
    try {
      if (t === "chop") await aChop(s[1], norm(s[2]));
      else if (t === "add") await aAdd(s[1], norm(s[2]));
      else if (t === "season") await aSeason(s[1], norm(s[2]));
      else if (t === "mix") await aMix(norm(s[1]), s[2]);
      else if (t === "heat") { title.textContent = instr(s); hint.textContent = "Warm and quiet…"; await aHeat(s[1]); }
      else if (t === "bake") { title.textContent = instr(s); hint.textContent = "Smell that? Just a moment."; await aBake(s[1]); }
      else if (t === "move") await aMove(norm(s[1]), norm(s[2]), s[3]);
      else if (t === "roll") await aRoll(s[1], norm(s[2]));
      else if (t === "stack") await aStack(s[1], s[2]);
      else if (t === "flip") await aFlip();
      else if (t === "taste") await aTaste(s[1]);
    } catch (e) { console.error(e); }
    hide(); plateStep(t, s); st.busy = false; st.step++;
    if (st.step >= st.recipe.steps.length) finish(); else promptStep();
  }
  function finish() {
    st.stage = "end"; haloOff(); chips.hidden = true; matNeed([]);
    chooseDrink();
  }
  // before sitting down: pick something to drink from the fridge
  async function chooseDrink() {
    st.stage = "drink"; st.busy = false; window.__drink = null;
    recipeBox.hidden = true; nextBtn.hidden = true; chips.hidden = true; basketEl.hidden = true;
    say("And something to drink?", "Open the fridge and choose one.");
    kui.classList.remove("dtop"); kui.classList.add("slim"); SFX.rustle();
    buildInside("drinks"); IN.classList.add("on"); inwrap.classList.add("on"); inwrap.scrollTop = 0;
  }
  async function pickDrink(g) {
    if (st.busy) return; st.busy = true;
    window.__drink = g.dataset.id === "d-cola" ? "cola" : g.dataset.id === "d-juice" ? "juice" : "water";
    g.classList.add("got"); SFX.pop(2); hint.textContent = "Lovely. Let's sit down.";
    await flyToBasket(g); await sleep(300);
    inwrap.classList.remove("on"); IN.classList.remove("on"); kui.classList.remove("slim"); SFX.rustle(); await sleep(350);
    st.busy = false; startDining(window.__dineFrom || "tin");
  }
  function tapped(name) {
    if (st.stage === "gather") { if (name === "fridge") enterInside("fridge"); else if (name === "cupboard") enterInside("pantry"); else if (name === "rack") enterInside("spice"); return; }
    if (st.stage !== "cook" || st.busy) return;
    const s = st.recipe.steps[st.step];
    if (name === tapOf(s)) { runStep(); return; }
    const w = tapOf(s); hint.textContent = "Not quite. " + tapHint(s); haloOn(w); SFX.tap();
  }
  function tappedMat(id) {
    if (st.stage !== "cook" || st.busy) return;
    const s = st.recipe.steps[st.step];
    if (usedIn(s).indexOf(id) >= 0) { runStep(); return; }
    hint.textContent = "Not that one yet. " + tapHint(s); SFX.tap();
  }
  const HOOK = { cfridge: "fridge", ccupboard: "cupboard", crack: "rack" };
  Object.keys(HOOK).forEach(function (id) {
    const e = q(id);
    e.addEventListener("click", function () { tapped(HOOK[id]); });
    e.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); tapped(HOOK[id]); } });
  });
  nextBtn.addEventListener("click", function () {
    if (st.stage === "gather") { startCooking(); return; }
    if (heatStop) { heatStop(); heatStop = null; } bubbles(false); clearInterval(DINE.steam); TS.classList.remove("on"); S.style.opacity = 1; S.style.pointerEvents = ""; SFX.setCalm && SFX.setCalm(false);
    nextActivity();
  });
  window.openCooking = function () { SFX.setCalm && SFX.setCalm(true); showStep("cooking"); showMenu(); let seen = false; try { seen = !!localStorage.getItem("pe-cook-howto"); } catch (e) {} if (!seen) showHowTo(); };
  window.__ck = { dine: startDining, st: st, tq: tq, MENU: MENU, startGather: startGather, startCooking: startCooking, runStep: runStep, need: need, tapped: tapped, tappedMat: tappedMat, C: C, enterInside: enterInside, leaveInside: leaveInside, takeInside: takeInside, usedIn: usedIn };
  if (location.hash === "#cooking") window.openCooking();
})();