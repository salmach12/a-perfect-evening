// A short "how to play" card for each activity: shown the first time, and again from the little ? button
(function () {
  const TEXTS = {
    kitchen: { title: "How to make a drink", rows: [
      ["Pick your mug", "Tap a mug on granny's shelf, then press “This one”."],
      ["Choose a drink", "Coffee, tea or chocolate, then how you'd like it."],
      ["Follow what glows", "Tap the glowing thing and a hand pours or adds it for you, slowly. No timer, no rush."],
      ["Sip and move on", "When your drink is ready, enjoy it, then press Continue (or make another)."]
    ] },
    reading: { title: "How to read", rows: [
      ["Light a candle", "Tap a scent jar to light your candle."],
      ["Pick a mood", "Choose the kind of story you feel like tonight."],
      ["Choose a book", "Tap a book on the shelf that has a little ribbon."],
      ["Turn the pages", "Tap the arrows, tap the page on a phone, or use the arrow keys. Press “Put it back” to choose another, and “Done reading” when you've had enough."]
    ] }
  };
  function key(k) { return "pe-howto-" + k; }
  function seen(k) { try { return !!localStorage.getItem(key(k)); } catch (e) { return false; } }
  function open(k) {
    const T = TEXTS[k], page = document.getElementById("step-" + k); if (!T || !page) return;
    const old = document.getElementById("howto-" + k); if (old) old.remove();
    const box = document.createElement("div"); box.id = "howto-" + k; box.className = "howto"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", T.title);
    box.innerHTML = '<div class="howto-card"><h3>' + T.title + '</h3><ol>' + T.rows.map(function (r) { return "<li><b>" + r[0] + "</b><span>" + r[1] + "</span></li>"; }).join("") + '</ol><button type="button" class="k-chip howto-ok">Got it</button></div>';
    page.appendChild(box);
    box.querySelector(".howto-ok").addEventListener("click", function () { box.remove(); try { localStorage.setItem(key(k), "1"); } catch (e) {} });
  }
  function ensureButton(k) {
    const page = document.getElementById("step-" + k); if (!page || page.querySelector(".howto-q")) return;
    const b = document.createElement("button"); b.type = "button"; b.className = "howto-q"; b.textContent = "?"; b.setAttribute("aria-label", "How to play");
    b.addEventListener("click", function () { open(k); });
    page.appendChild(b);
  }
  window.PEHowTo = { auto: function (k) { ensureButton(k); if (!seen(k)) open(k); }, open: open };
})();
