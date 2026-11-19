// The title screen: draws the small repeated things (books, garland, falling leaves) and the little interactions.
(function () {
  const NS = "http://www.w3.org/2000/svg";
  function add(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    parent.appendChild(e);
    return e;
  }
  // a tiny repeatable "random" so the picture is the same on every visit
  let seed = 7;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  const AUTUMN = ["#c0692f", "#d4a84a", "#a3432c", "#d98a3a", "#7f8a4c", "#8a3a3a"];

  /* books on the bookcase */
  const books = document.getElementById("tBooks");
  const spines = ["#8a3a3a", "#c0692f", "#d4a84a", "#7f8a4c", "#e0cfa4", "#a3432c", "#5e3a24", "#d98a3a"];
  [[394, 258], [540, 400], [686, 546]].forEach(function (row, i) {
    // shelves sit at y = 400, 546 and 692 (the floor of the case)
    const floor = [400, 546, 692][i];
    let x = 126;
    while (x < 360) {
      const w = 16 + Math.floor(rnd() * 14), h = 70 + Math.floor(rnd() * 56);
      if (x + w > 374) break;
      const g = add("g", { transform: "translate(" + x + " " + (floor - 6) + ")" + (rnd() < 0.08 ? " rotate(-10 0 0)" : "") }, books);
      const c = spines[Math.floor(rnd() * spines.length)];
      add("rect", { x: 0, y: -h, width: w, height: h, rx: 3, fill: c, stroke: "#3a2416", "stroke-width": 3 }, g);
      add("path", { d: "M3 " + (-h + 12) + " H" + (w - 3) + " M3 -14 H" + (w - 3), stroke: "#efe3c4", "stroke-width": 2.2, opacity: 0.55 }, g);
      x += w + 2;
    }
  });

  /* leaf garland along the string */
  const garland = document.getElementById("tGarland");
  const pts = [[60, 62], [170, 84], [290, 60], [410, 44], [520, 56], [640, 84], [760, 96], [880, 72], [1000, 52], [1120, 50], [1240, 70], [1360, 92], [1480, 62], [1560, 56]];
  pts.forEach(function (p, i) {
    add("ellipse", { cx: p[0], cy: p[1], rx: 15, ry: 8, fill: AUTUMN[i % AUTUMN.length], transform: "rotate(" + ((i * 47) % 100 - 50) + " " + p[0] + " " + p[1] + ")" }, garland);
  });

  /* the warm mug on the table (the first mug of the collection) */
  const mugBox = document.getElementById("tMug");
  mugBox.innerHTML = mugThumb(mugById("oat")).replace(/^<svg[^>]*>/, '<svg x="-78" y="-98" width="200" height="112" viewBox="372 496 200 112" overflow="visible">');

  /* slow falling leaves (kept calm) */
  const leaves = document.getElementById("tLeaves");
  for (let i = 0; i < 9; i++) {
    const g = add("g", { class: "t-leaf" }, leaves);
    g.style.setProperty("--x", (80 + rnd() * 1440).toFixed(0) + "px");
    g.style.setProperty("--sway", (30 + rnd() * 50).toFixed(0) + "px");
    g.style.animationDuration = (22 + rnd() * 16).toFixed(1) + "s";
    g.style.animationDelay = "-" + (rnd() * 30).toFixed(1) + "s";
    add("path", { d: "M-11 0 Q 0 -9 11 0 Q 0 9 -11 0 Z", fill: AUTUMN[i % 5], stroke: "#3a2416", "stroke-width": 2.2, opacity: 0.9 }, g);
    add("path", { d: "M-9 0 H9", stroke: "#3a2416", "stroke-width": 1.4, opacity: 0.5 }, g);
  }

  /* pet the cat */
  const cat = document.getElementById("tCat");
  const fx = document.getElementById("tFx");
  let petting = false;
  function pet() {
    if (petting) return;
    petting = true;
    const h = add("text", { x: 1000 + (rnd() * 60 - 30), y: 600, "text-anchor": "middle", class: "t-heart" }, fx);
    h.textContent = "♥";
    setTimeout(function () { h.remove(); petting = false; }, 1700);
  }
  cat.addEventListener("click", pet);
  cat.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") pet(); });

  /* pressing Begin: the button squishes, leaves puff out, the banner sways, then the room fades away */
  const room = document.getElementById("room");
  let leaving = false;
  window.playBegin = function (done) {
    if (leaving) return;
    leaving = true;
    const btn = document.getElementById("begin");
    btn.classList.add("pressed");
    if (window.SFX) SFX.chime();
    for (let i = 0; i < 6; i++) {
      const g = add("g", { class: "t-burst" }, fx);
      const a = (i / 6) * Math.PI * 2 - 0.5;
      g.style.setProperty("--bx", "800px"); g.style.setProperty("--by", "492px");
      g.style.setProperty("--dx", (Math.cos(a) * (50 + rnd() * 50)).toFixed(0) + "px");
      g.style.setProperty("--dy", (Math.sin(a) * (30 + rnd() * 40) - 60).toFixed(0) + "px");
      g.style.setProperty("--rot", (rnd() * 360).toFixed(0) + "deg");
      add("path", { d: "M-10 0 Q 0 -8 10 0 Q 0 8 -10 0 Z", fill: AUTUMN[i % AUTUMN.length], stroke: "#3a2416", "stroke-width": 2 }, g);
      setTimeout(function () { g.remove(); }, 1900);
    }
    room.classList.add("leaving");
    setTimeout(function () {
      done();
      room.classList.remove("leaving");
      btn.classList.remove("pressed");
      leaving = false;
    }, 1250);
  };

  /* the Begin button works with the keyboard too */
  const begin = document.getElementById("begin");
  begin.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); begin.dispatchEvent(new MouseEvent("click", { bubbles: true })); }
  });

  /* on a tall phone screen, frame the middle of the room */
  const svg = document.getElementById("title-svg");
  function frame() {
    svg.setAttribute("viewBox", window.innerWidth / window.innerHeight < 0.9 ? "340 -150 920 1380" : "0 0 1600 900");
  }
  window.addEventListener("resize", frame);
  frame();
})();