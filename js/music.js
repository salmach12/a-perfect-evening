// Background music + a small volume panel (music and sound effects).
// Browsers do not allow sound until the person clicks something, so the music starts at your very first click or touch.
const MUSIC_FILE = "audio/evening.mp3";   // put your mp3 in the audio folder with this name
const MUSIC_MAX = 0.7;                    // the slider's top end (0 = silent, 1 = full)

(function () {
  const music = new Audio(MUSIC_FILE);
  music.loop = true;
  music.volume = 0;
  music.preload = "auto";

  const button = document.getElementById("music-btn");
  const panel = document.getElementById("vol-panel");
  const sMusic = document.getElementById("vol-music");
  const sSfx = document.getElementById("vol-sfx");
  const begin = document.getElementById("begin");
  let started = false;

  function apply() {
    music.volume = Math.max(0, Math.min(1, PEVol.music * MUSIC_MAX));
    if (PEVol.music === 0 && !music.paused) music.pause();
    else if (PEVol.music > 0 && started && music.paused) music.play().catch(function () {});
    button.classList.toggle("off", PEVol.music === 0 && PEVol.sfx === 0);
    button.classList.toggle("playing", started && PEVol.music > 0 && !music.paused);
    sMusic.value = Math.round(PEVol.music * 100);
    sSfx.value = Math.round(PEVol.sfx * 100);
  }

  function play() {
    if (PEVol.music === 0) return;
    if (started) { if (music.paused) music.play().catch(function () {}); return; }
    music.play().then(function () { started = true; apply(); }).catch(function () {});
  }

  sMusic.addEventListener("input", function () {
    PEVol.setMusic(sMusic.value / 100);
    if (PEVol.music > 0 && music.paused) play();
  });
  sSfx.addEventListener("input", function () { PEVol.setSfx(sSfx.value / 100); });
  sSfx.addEventListener("change", function () { SFX.tap(); });
  PEVol.onChange(apply);

  // pressing the note switches everything off (music and sounds) or back on; the little arrow opens the sliders
  const toggle = document.getElementById("vol-toggle");
  let prev = { music: 0.5, sfx: 1 };
  function muted() { return PEVol.music === 0 && PEVol.sfx === 0; }
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    if (muted()) {
      PEVol.setMusic(prev.music || 0.5); PEVol.setSfx(prev.sfx || 1);
      if (music.paused) play();
      SFX.go();
    } else {
      prev = { music: PEVol.music, sfx: PEVol.sfx };
      PEVol.setMusic(0); PEVol.setSfx(0);
      panel.hidden = true;
    }
  });
  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    const open = panel.hidden;
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", function (e) {
    if (!panel.hidden && !panel.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) panel.hidden = true;
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") panel.hidden = true; });

  // first press of Begin starts the music (if it is not turned all the way down)
  // start as soon as the game is entered: try straight away, and otherwise on the very first touch, click or key
  play();
  ["pointerdown", "click", "keydown", "touchstart"].forEach(function (ev) {
    document.addEventListener(ev, function once() { if (started) { document.removeEventListener(ev, once, true); return; } play(); }, true);
  });
  begin.addEventListener("click", play);

  apply();
})();