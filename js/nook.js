// The cozy corner: you sit down with the drink you just made and take a few slow sips.
const nookMugClone = document.getElementById("nMugClone");
const nookLift = document.getElementById("nMugLift");
const nookShelf = document.getElementById("nShelf");
const nookTitle = document.getElementById("nook-title");
const nookHint = document.getElementById("nook-hint");
const nookNext = document.getElementById("nook-next");
const nookFx = document.getElementById("nFx");
let nookSips = 0, nookLiquid = null, nookBusy = false;

function buildShelf() {
  // rows of books on the mantel and the shelf above it: [x, width, height, color, lean]
  const rows = [
    { y: 318, books: [[1222,22,62,"#8a3a3a",0],[1246,18,52,"#d4a84a",0],[1266,24,66,"#7f8a4c",0],[1294,20,56,"#e0cfa4",0],[1318,26,70,"#a3432c",0],[1356,20,54,"#5e3a24",-12],[1384,22,60,"#c0692f",0],[1408,18,48,"#8a9450",0],[1430,24,64,"#7a2f33",0],[1458,20,52,"#d98a3a",0]] },
    { y: 196, books: [[1222,24,64,"#c0692f",0],[1250,20,54,"#e0cfa4",0],[1274,26,70,"#7a2f33",0],[1304,20,52,"#d4a84a",0],[1328,22,60,"#5e3a24",0],[1354,24,68,"#8a9450",0],[1384,20,50,"#a3432c",0],[1412,26,66,"#e0cfa4",-10],[1450,22,58,"#8a3a3a",0],[1476,20,70,"#d98a3a",0],[1500,24,56,"#7f8a4c",0],[1528,20,62,"#c0692f",0]] }
  ];
  const NS = "http://www.w3.org/2000/svg";
  nookShelf.innerHTML = "";
  rows.forEach(function (row) {
    row.books.forEach(function (b) {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("transform", "translate(" + b[0] + " " + row.y + ")" + (b[4] ? " rotate(" + b[4] + " 0 0)" : ""));
      g.innerHTML = '<rect x="0" y="' + (-b[2]) + '" width="' + b[1] + '" height="' + b[2] + '" rx="3" fill="' + b[3] + '" stroke="#3a2416" stroke-width="3"/>' +
        '<path d="M3 ' + (-b[2] + 10) + ' H' + (b[1] - 3) + ' M3 ' + (-12) + ' H' + (b[1] - 3) + '" stroke="#efe3c4" stroke-width="2.4" opacity=".6"/>';
      nookShelf.appendChild(g);
    });
  });
}

let nookStopFire = null;
function openNook() {
  if (nookStopFire) nookStopFire();
  nookStopFire = SFX.fire(1);
  // copy the finished mug from the kitchen (renaming ids so nothing is duplicated)
  const src = document.getElementById("kmug");
  const clone = src.cloneNode(true);
  clone.removeAttribute("class");
  clone.querySelectorAll("[id]").forEach(function (n) { n.id = "n" + n.id; });
  clone.id = "nkmug";
  nookMugClone.innerHTML = "";
  const base = document.createElementNS("http://www.w3.org/2000/svg", "g");
  base.innerHTML = '<ellipse cx="450" cy="594" rx="80" ry="12" fill="#efe3c4" stroke="#3a2416" stroke-width="3"/>';
  nookMugClone.appendChild(base);
  nookMugClone.appendChild(clone);
  nookLiquid = document.getElementById("nkliquid");
  nookSips = 0; nookBusy = false;
  nookFx.innerHTML = "";
  buildShelf();
  nookTitle.textContent = withName(t("n.sit"));
  nookHint.textContent = t("n.tap");
  nookHint.hidden = false;
  nookNext.textContent = t(queue.length ? "n.next" : "n.end");
  showStep("nook");
}

function nookFloat(text) {
  const tx = document.createElementNS("http://www.w3.org/2000/svg", "text");
  tx.textContent = text;
  tx.setAttribute("x", 1090); tx.setAttribute("y", 520);
  tx.setAttribute("text-anchor", "middle");
  tx.setAttribute("class", "nfloat");
  nookFx.appendChild(tx);
  setTimeout(function () { tx.remove(); }, 2600);
}

function sip() {
  if (nookBusy) return;
  nookBusy = true;
  nookSips++;
  SFX.sip();
  nookLift.classList.remove("sip"); void nookLift.getBoundingClientRect(); nookLift.classList.add("sip");
  if (nookLiquid) {
    const cy = parseFloat(nookLiquid.getAttribute("cy") || 520);
    nookLiquid.setAttribute("cy", Math.min(cy + 5, 540));
  }
  const lines = ["n.s1", "n.s2", "n.s3", "n.s4"];
  const line = lines[Math.min(nookSips, lines.length) - 1];
  nookTitle.textContent = withName(t(line));
  nookHint.hidden = nookSips >= 3;
  if (nookSips < 3) nookHint.textContent = t("n.again");
  nookFloat(["♥", "~", "♥", "☺"][(nookSips - 1) % 4]);
  setTimeout(function () { nookBusy = false; }, 1500);
}

document.getElementById("nMugHit").addEventListener("click", sip);
document.getElementById("nMugHit").addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") sip(); });
nookNext.addEventListener("click", function () { if (nookStopFire) { nookStopFire(); nookStopFire = null; } nextActivity(); });

// on a tall phone screen, frame the armchair and the side table instead of the whole room
function frameNook() {
  const svg = document.getElementById("nook-svg");
  const tall = window.innerWidth / window.innerHeight < 0.9;
  svg.setAttribute("viewBox", tall ? "560 0 680 900" : "0 0 1600 900");
}
window.addEventListener("resize", frameNook);
frameNook();