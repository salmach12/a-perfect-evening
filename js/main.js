// The pages of the game: welcome -> name -> how was your day -> warm reply -> pick three -> done.
// Everything she types stays on her own device (localStorage). Nothing is sent anywhere.

const room = document.getElementById("room");
const steps = {
  name: document.getElementById("step-name"),
  checkin: document.getElementById("step-checkin"),
  reply: document.getElementById("step-reply"),
  pick: document.getElementById("step-pick"),
  kitchen: document.getElementById("step-kitchen"),
  nook: document.getElementById("step-nook"),
  reading: document.getElementById("step-reading"),
  order: document.getElementById("step-order"),
  done: document.getElementById("step-done")
};

// "welcome" is the room picture; every other step is a full page (the music keeps playing).
function showStep(name) {
  if (window.SFX) SFX.whoosh(650);
  room.hidden = name !== "welcome";
  for (const key in steps) steps[key].hidden = key !== name;
  window.scrollTo(0, 0);
}

// small safe helpers for saving (storage can be blocked, so we wrap it in try)
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}
function load(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; }
}

/* ----- her name ----- */
try { localStorage.removeItem("pe-name"); localStorage.removeItem("pe-checkin"); localStorage.removeItem("pe-picked"); } catch (e) {}
let userName = "";

// "Salma" -> "Salma, " or "" ; used to put her name into sentences
function withName(text) {
  if (userName) return text.replace(/\{name\}/g, userName);
  return text.replace(/\s*[,\u060C]\s*\{name\}/g, "").replace(/\{name\}\s*[,\u060C]\s*/g, "").replace(/\s*\{name\}/g, "").replace(/\{name\}\s*/g, "");
}

function personalize() {
  document.getElementById("checkin-title").textContent = withName(t("ci.title"));
  document.getElementById("pick-title").textContent = withName(t("pick.title"));
}
personalize();

/* ----- step 1: Begin ----- */
document.getElementById("begin").addEventListener("click", function () {
  const go = function () { nameInput.value = ""; showStep("name"); };
  if (window.playBegin) window.playBegin(go); else go();
});

/* ----- step 1.5: her name ----- */
const nameInput = document.getElementById("name-input");
function finishName(useName) {
  userName = useName ? nameInput.value.trim() : "";
  personalize();
  showStep("checkin");
}
document.getElementById("name-next").addEventListener("click", function () { finishName(true); });
document.getElementById("name-skip").addEventListener("click", function () { finishName(false); });
nameInput.addEventListener("keydown", function (e) { if (e.key === "Enter") finishName(true); });

/* ----- step 2: how was your day ----- */
let mood = "";
const moodButtons = document.querySelectorAll("#moods .chip");
moodButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const same = button.classList.contains("on");
    moodButtons.forEach(function (b) { b.classList.remove("on"); });
    mood = same ? "" : button.dataset.mood;   // click again to un-pick
    if (!same) button.classList.add("on");
  });
});

function finishCheckin(saveIt) {
  if (saveIt) {
    save("pe-checkin", {
      mood: mood,
      note: document.getElementById("day-note").value.trim(),
      date: new Date().toISOString()
    });
  }
  showReply(saveIt);
}
document.getElementById("checkin-next").addEventListener("click", function () { finishCheckin(true); });
document.getElementById("checkin-skip").addEventListener("click", function () { finishCheckin(false); });

/* ----- step 2.5: a warm reply to how she feels ----- */
// {name} is replaced with her name. Edit these sentences any time.
let curReply = "skip";
function renderReply() {
  document.getElementById("reply-title").textContent = withName(t("r." + curReply + ".t"));
  document.getElementById("reply-text").textContent = withName(t("r." + curReply + ".x"));
}

function showReply(answered) {
  const note = document.getElementById("day-note").value.trim();
  curReply = "skip";
  if (answered && mood) curReply = mood;
  else if (answered && note) curReply = "note";
  renderReply();
  showStep("reply");
}
document.getElementById("reply-next").addEventListener("click", function () { showStep("pick"); });

/* ----- step 3: pick three ----- */
const picked = [];
const actButtons = document.querySelectorAll("#activities .chip");
const startButton = document.getElementById("pick-next");
const pickHint = document.getElementById("pick-hint");

function updatePickUI() {
  actButtons.forEach(function (b) {
    const on = picked.indexOf(b.dataset.act) !== -1;
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", on);
  });
  startButton.disabled = picked.length !== 3;
  pickHint.textContent = picked.length === 3 ? t("pick.done") : t("pick.hint").replace("{n}", picked.length);
}

actButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const name = button.dataset.act;
    const at = picked.indexOf(name);
    if (at !== -1) picked.splice(at, 1);          // click again to remove
    else if (picked.length < 3) picked.push(name); // only 3 allowed
    updatePickUI();
  });
});
updatePickUI();

/* ----- step 3.5: she chooses the order ----- */
const orderList = document.getElementById("order-list");
const orderNext = document.getElementById("order-next");
let ordered = [];

function buildOrder() {
  ordered = [];
  orderList.innerHTML = "";
  picked.forEach(function (act) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.dataset.act = act;
    b.innerHTML = '<span class="ord-label"></span><span class="ord-badge" hidden></span>';
    b.addEventListener("click", function () {
      if (ordered.indexOf(act) === -1) ordered.push(act);
      updateOrderUI();
    });
    orderList.appendChild(b);
  });
  updateOrderUI();
}
function updateOrderUI() {
  orderList.querySelectorAll(".chip").forEach(function (b) {
    const at = ordered.indexOf(b.dataset.act);
    b.classList.toggle("on", at !== -1);
    b.querySelector(".ord-label").textContent = t("act." + b.dataset.act.replace(" ", "_"));
    const badge = b.querySelector(".ord-badge");
    badge.hidden = at === -1;
    badge.textContent = at === -1 ? "" : String(at + 1);
  });
  orderNext.disabled = ordered.length !== picked.length;
}
document.getElementById("order-reset").addEventListener("click", function () { ordered = []; updateOrderUI(); });

// the activities run one after another, in the order she chose
let queue = [];

function showDone() {
  document.getElementById("done-title").textContent = withName(t("done.title"));
  document.getElementById("done-text").textContent = ordered.map(function (a) { return t("act." + a.replace(" ", "_")); }).join(" \u00B7 ");
  showStep("done");
}

// go to the next chosen activity ("hot drinks", "reading" and "cooking" are built so far; the others are skipped for now)
function nextActivity() {
  while (queue.length) {
    const act = queue.shift();
    if (act === "hot drinks") { openKitchen(); return; }
    if (act === "reading") { openReading(); return; }
    if (act === "cooking") { openCooking(); return; }
  }
  showDone();
}

startButton.addEventListener("click", function () {
  buildOrder();
  showStep("order");
});
orderNext.addEventListener("click", function () {
  queue = ordered.slice();
  nextActivity();
});

/* ----- language ----- */
function onLangChange() {
  personalize();
  renderReply();
  updatePickUI();
  updateOrderUI();
  if (typeof refreshKitchenText === "function") refreshKitchenText();
}
applyLang();