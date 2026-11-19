// Soft, relaxing sound effects (ASMR style), made from scratch with the browser's audio engine.
// No sound files needed. Everything is quiet and gentle on purpose.
(function () {
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function write(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function num(v, d) { const n = parseFloat(v); return isNaN(n) ? d : Math.max(0, Math.min(1, n)); }

  // volumes (0 to 1) shared by the music and the sound effects
  const vol = { music: num(read("pe-vol-music"), 0.5), sfx: num(read("pe-vol-sfx"), 1) };
  const listeners = [];
  window.PEVol = {
    get music() { return vol.music; },
    get sfx() { return vol.sfx; },
    setMusic: function (v) { vol.music = num(v, 0.5); write("pe-vol-music", vol.music); listeners.forEach(function (f) { f(); }); },
    setSfx: function (v) { vol.sfx = num(v, 1); write("pe-vol-sfx", vol.sfx); if (master) master.gain.value = vol.sfx * BOOST * calmK; listeners.forEach(function (f) { f(); }); },
    onChange: function (f) { listeners.push(f); }
  };

  let ctx = null, master = null, out = null, noiseBuf = null, warmNode = null, calmK = 1;
  const BOOST = 0.9;   // soft and cozy; the slider scales them
  function ensure() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch (e) { return null; }
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -22; comp.knee.value = 24; comp.ratio.value = 3; comp.attack.value = 0.004; comp.release.value = 0.2;
    master = ctx.createGain(); master.gain.value = vol.sfx * BOOST * calmK;
    // warm filter: rounds off every sharp, bright or glassy edge so sounds feel close and soft
    const warm = ctx.createBiquadFilter(); warm.type = "lowpass"; warm.frequency.value = 3200; warm.Q.value = 0.4; warmNode = warm;
    const shelf = ctx.createBiquadFilter(); shelf.type = "lowshelf"; shelf.frequency.value = 220; shelf.gain.value = 3;
    master.connect(warm); warm.connect(shelf); shelf.connect(comp); comp.connect(ctx.destination);
    // everything goes through "out": a dry signal plus a warm little room (reverb)
    out = ctx.createGain(); out.connect(master);
    const verb = ctx.createConvolver(), vg = ctx.createGain(); vg.gain.value = 0.14;
    const len = Math.floor(ctx.sampleRate * 1.4), ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    verb.buffer = ir; out.connect(verb); verb.connect(vg); vg.connect(master);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ctx;
  }
  function unlock() { ensure(); if (ctx && ctx.state === "suspended") ctx.resume(); }
  ["pointerdown", "keydown", "touchstart"].forEach(function (e) { window.addEventListener(e, unlock, { passive: true }); });

  function ok() { return ensure() && vol.sfx > 0; }
  function noise(loop) { const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = !!loop; return s; }
  function env(g, t, a, peak, d) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }
  function panTo(node, pan) {
    if (pan && ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan; node.connect(p); p.connect(out); }
    else node.connect(out);
  }
  function tone(f, dur, o) {
    if (!ok()) return;
    o = o || {};
    const t = ctx.currentTime + (o.delay || 0), a = o.attack || 0.004;
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = o.type || "sine";
    osc.frequency.setValueAtTime(f, t);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + dur);
    env(g, t, a, o.gain || 0.2, dur);
    osc.connect(g); panTo(g, o.pan);
    osc.start(t); osc.stop(t + a + dur + 0.05);
  }
  function puff(dur, o) {
    if (!ok()) return;
    o = o || {};
    const t = ctx.currentTime + (o.delay || 0), a = o.attack || 0.008;
    const s = noise(false), f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = o.type || "bandpass";
    f.frequency.setValueAtTime(o.f || 1000, t);
    if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, t + dur + a);
    f.Q.value = o.q || 0.8;
    env(g, t, a, o.gain || 0.2, dur);
    s.connect(f); f.connect(g); panTo(g, o.pan);
    s.start(t, Math.random() * 1.5); s.stop(t + a + dur + 0.05);
  }
  // a bell-like ceramic ring (inharmonic partials, like a real mug or spoon)
  function ring(base, gain, decay, delay) {
    [1, 1.51, 2.23, 3.1].forEach(function (m, i) { tone(base * m, decay / (1 + i * 0.7), { gain: gain / (1 + i * 0.8), delay: delay || 0, attack: 0.002 }); });
  }

  const SFX = {
    // a wooden knock (buttons, picking up, putting down)
    tap: function () { tone(160, 0.12, { to: 70, gain: 0.4 }); puff(0.05, { type: "lowpass", f: 1100, gain: 0.25 }); puff(0.015, { type: "highpass", f: 2200, gain: 0.12 }); },
    // something plopping into the drink
    plop: function () {
      tone(620, 0.12, { to: 190, gain: 0.4 }); tone(360, 0.16, { to: 150, gain: 0.25, delay: 0.05 });
      puff(0.09, { f: 900, to: 400, gain: 0.18 });
      
    },
    // tiny grains falling (cinnamon, cocoa, sugar): lots and lots of little ticks
    sprinkle: function (ms) {
      if (!ok()) return;
      const t = ctx.currentTime, d = ms / 1000;
      const src = noise(true), hp = ctx.createBiquadFilter(), g = ctx.createGain();
      hp.type = "highpass"; hp.frequency.value = 5200;
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.09, t + 0.2); g.gain.setValueAtTime(0.09, t + d - 0.3); g.gain.linearRampToValueAtTime(0.0001, t + d);
      src.connect(hp); hp.connect(g); g.connect(out); src.start(t, Math.random()); src.stop(t + d + 0.1);
      const end = Date.now() + ms;
      const id = setInterval(function () {
        if (Date.now() > end) { clearInterval(id); return; }
        puff(0.025, { type: "bandpass", f: 3000 + Math.random() * 4500, q: 3, gain: 0.12 + Math.random() * 0.1, pan: Math.random() * 1.2 - 0.6 });
        
      }, 22);
    },
    // liquid pouring: a close, rich stream with bubbles and little glugs
    pour: function () {
      if (!ok()) return { level: function () {}, stop: function () {} };
      const t = ctx.currentTime;
      const src = noise(true), bp = ctx.createBiquadFilter(), hp = ctx.createBiquadFilter(), g = ctx.createGain();
      bp.type = "bandpass"; bp.frequency.value = 1100; bp.Q.value = 0.9;
      hp.type = "highpass"; hp.frequency.value = 350;
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.5, t + 0.35);
      src.connect(bp); bp.connect(hp); hp.connect(g); g.connect(out); src.start(0, Math.random());
      const lfo = ctx.createOscillator(), lg = ctx.createGain();
      lfo.frequency.value = 9; lg.gain.value = 260; lfo.connect(lg); lg.connect(bp.frequency); lfo.start();
      let lvl = 0, stopped = false;
      (function bubbles() {
        if (stopped) return;
        const f = (260 + Math.random() * 700) * (0.8 + lvl * 1.1);
        tone(f, 0.07, { to: f * 2, gain: 0.16 + Math.random() * 0.1, pan: Math.random() * 0.8 - 0.4 });
        setTimeout(bubbles, 28 + Math.random() * 45);
      })();
      (function glugs() {
        if (stopped) return;
        const f = 150 + lvl * 120 + Math.random() * 40;
        tone(f, 0.16, { to: f * 1.5, gain: 0.3 });
        setTimeout(glugs, 190 + Math.random() * 130);
      })();
      return {
        level: function (l) { lvl = l; if (!stopped) bp.frequency.setTargetAtTime(900 + l * 1400, ctx.currentTime, 0.1); },
        stop: function () {
          if (stopped) return; stopped = true;
          g.gain.cancelScheduledValues(ctx.currentTime);
          g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.12);
          tone(500 + lvl * 300, 0.2, { to: 250, gain: 0.25 });   // the last little drip
          setTimeout(function () { try { src.stop(); lfo.stop(); } catch (e) {} }, 800);
        }
      };
    },
    // spoon circling in a mug: swirling liquid, soft laps and ceramic clinks
    stir: function (ms) {
      if (!ok()) return;
      const t = ctx.currentTime;
      function swirl(freq, q, depth, phase) {
        const src = noise(true), bp = ctx.createBiquadFilter(), g = ctx.createGain();
        bp.type = "bandpass"; bp.frequency.value = freq; bp.Q.value = q;
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(depth, t + 0.5);
        const lfo = ctx.createOscillator(), lg = ctx.createGain();
        lfo.frequency.value = 0.85; lg.gain.value = depth * 0.8; lfo.connect(lg); lg.connect(g.gain);
        src.connect(bp); bp.connect(g); panTo(g, 0); src.start(0, Math.random()); lfo.start(t + phase);
        return function () { g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.2); setTimeout(function () { try { src.stop(); lfo.stop(); } catch (e) {} }, 900); };
      }
      const s1 = swirl(850, 2.2, 0.22, 0), s2 = swirl(2300, 1.6, 0.12, 0.35);
      let n = 0;
      const tk = setInterval(function () {
        ring(1700 + Math.random() * 300, 0.06, 0.3);
        tone(190, 0.07, { to: 120, gain: 0.12 });
        if (n++ % 2) tone(420 + Math.random() * 200, 0.09, { to: 700, gain: 0.12, pan: Math.random() - 0.5 });   // a little lap
      }, 590);
      setTimeout(function () { clearInterval(tk); s1(); s2(); }, ms);
    },
    // a sip: lips, a warm gulp, and a happy breath out
    sip: function () {
      puff(0.25, { f: 700, to: 1500, gain: 0.12, attack: 0.1 });
      tone(240, 0.16, { to: 110, gain: 0.4, delay: 0.2 });
      tone(210, 0.18, { to: 95, gain: 0.34, delay: 0.46 });
      puff(0.7, { f: 800, to: 500, gain: 0.07, attack: 0.25, delay: 0.7 });
    },
    // a real-feeling paper page turn
    page: function () {
      puff(0.34, { f: 1300, to: 4200, q: 0.6, gain: 0.3, attack: 0.08 });
      for (let i = 0; i < 7; i++) puff(0.03, { type: "highpass", f: 2500 + Math.random() * 3000, gain: 0.12 + Math.random() * 0.1, delay: 0.04 + i * 0.045, pan: Math.random() - 0.5 });
      puff(0.14, { type: "lowpass", f: 600, gain: 0.18, delay: 0.3 });
    },
    // a match strike and the flame catching
    match: function () {
      puff(0.4, { type: "highpass", f: 2500, to: 6000, gain: 0.3, attack: 0.02 });
      puff(1.0, { type: "lowpass", f: 250, to: 1900, gain: 0.35, attack: 0.28, delay: 0.4 });
      puff(0.5, { type: "bandpass", f: 3500, q: 1, gain: 0.12, delay: 0.42 });
      tone(110, 0.6, { gain: 0.14, delay: 0.42 });
    },
    // a warm bell chime
    chime: function () {
      [440, 660].forEach(function (f, i) { ring(f, 0.06, 1.2, i * 0.18); });
    },
    // fireplace / candle: crackles, pops and a low roar
    fire: function (amount) {
      if (!ensure()) return function () {};
      amount = amount || 1;
      const t = ctx.currentTime;
      const src = noise(true), lp = ctx.createBiquadFilter(), g = ctx.createGain();
      lp.type = "lowpass"; lp.frequency.value = 260;
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.16 * amount, t + 1.5);
      src.connect(lp); lp.connect(g); g.connect(out); src.start(0, Math.random());
      let alive = true;
      (function crackle() {
        if (!alive) return;
        const n = 1 + Math.floor(Math.random() * 4);
        for (let i = 0; i < n; i++) puff(0.015 + Math.random() * 0.035, { type: "bandpass", f: 1500 + Math.random() * 4000, q: 2, gain: (0.12 + Math.random() * 0.25) * amount, delay: i * 0.04, pan: Math.random() * 1.4 - 0.7 });
        if (Math.random() < 0.25) tone(130 + Math.random() * 60, 0.07, { to: 60, gain: 0.2 * amount });
        setTimeout(crackle, 130 + Math.random() * 650);
      })();
      return function () {
        alive = false;
        try { g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.3); } catch (e) {}
        setTimeout(function () { try { src.stop(); } catch (e) {} }, 1500);
      };
    }
  };
  SFX.whoosh = function (ms) {
    const d = Math.min(1.2, (ms || 700) / 1000);
    puff(d, { f: 400, to: 1700, q: 0.5, gain: 0.16, attack: d * 0.4 });
  };
  SFX.clink = function () { ring(1500, 0.12, 0.35); tone(170, 0.09, { to: 100, gain: 0.2 }); puff(0.03, { type: "lowpass", f: 1400, gain: 0.1 }); };
  SFX.pop = function (k) { const f = 210 + (k || 0) * 25; tone(f, 0.09, { to: f * 0.6, gain: 0.3 }); puff(0.04, { type: "lowpass", f: 900, gain: 0.14 }); };
  SFX.go = function () { tone(170, 0.1, { to: 90, gain: 0.32 }); puff(0.05, { type: "lowpass", f: 1000, gain: 0.16 }); tone(205, 0.1, { to: 110, gain: 0.26, delay: 0.09 }); };
  SFX.key = function () { tone(250 + Math.random() * 60, 0.06, { to: 140, gain: 0.25 }); puff(0.02, { type: "highpass", f: 2200, gain: 0.12 }); };
  SFX.rustle = function () { for (let i = 0; i < 12; i++) puff(0.07, { type: "bandpass", f: 3000 + Math.random() * 3000, q: 1.5, gain: 0.14, delay: i * 0.06 + Math.random() * 0.04, pan: Math.random() - 0.5 }); };
  SFX.close = function () { tone(100, 0.2, { to: 55, gain: 0.5 }); puff(0.15, { type: "lowpass", f: 800, gain: 0.3 }); puff(0.05, { type: "highpass", f: 2500, gain: 0.1 }); };
  SFX.meow = function () {
    tone(520, 0.3, { to: 780, gain: 0.16, attack: 0.05 }); tone(780, 0.32, { to: 470, gain: 0.16, delay: 0.24 });
    if (ok()) {
      const t = ctx.currentTime + 0.5, o = ctx.createOscillator(), a = ctx.createOscillator(), ag = ctx.createGain(), g = ctx.createGain();
      o.type = "sawtooth"; o.frequency.value = 48; a.frequency.value = 22; ag.gain.value = 0.06;
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.1, t + 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 240;
      a.connect(ag); ag.connect(g.gain); o.connect(lp); lp.connect(g); g.connect(out);
      o.start(t); a.start(t); o.stop(t + 1.7); a.stop(t + 1.7);
    }
  };
  SFX.strike = function () {      // a match scratching, then the head catching
    puff(0.3, { type: "highpass", f: 2200, to: 7000, gain: 0.4, attack: 0.02 });
    puff(0.05, { type: "bandpass", f: 5000, q: 2, gain: 0.3, delay: 0.3 });
    puff(0.5, { type: "lowpass", f: 300, to: 1500, gain: 0.25, attack: 0.1, delay: 0.32 });
  };
  SFX.ignite = function () {      // the wick lighting: a soft whoosh and little sparkles
    puff(1.0, { type: "lowpass", f: 250, to: 2000, gain: 0.35, attack: 0.3 });
    puff(0.4, { type: "bandpass", f: 3500, q: 1, gain: 0.14, delay: 0.1 });
  };
  SFX.blow = function () {        // shaking out a match
    puff(0.28, { type: "lowpass", f: 900, to: 400, gain: 0.28, attack: 0.06 });
    puff(0.6, { type: "highpass", f: 4500, gain: 0.07, attack: 0.1, delay: 0.1 });
  };
  SFX.flip = function () {        // a thick page flipping over
    puff(0.5, { f: 900, to: 4500, q: 0.5, gain: 0.34, attack: 0.18 });
    puff(0.18, { type: "highpass", f: 2800, gain: 0.2, delay: 0.1 });
    puff(0.22, { type: "lowpass", f: 500, gain: 0.3, delay: 0.5 });
    tone(95, 0.18, { to: 60, gain: 0.25, delay: 0.52 });
  };
  SFX.bookOpen = function () {    // a leather book creaking open
    tone(85, 0.55, { to: 150, type: "sawtooth", gain: 0.05, attack: 0.1 });
    puff(0.5, { type: "lowpass", f: 400, to: 900, gain: 0.25, attack: 0.15 });
    tone(90, 0.2, { to: 55, gain: 0.4, delay: 0.5 });
    for (let i = 0; i < 6; i++) puff(0.04, { type: "highpass", f: 2500 + Math.random() * 2500, gain: 0.16, delay: 0.55 + i * 0.05, pan: Math.random() - 0.5 });
  };
  SFX.hover = function () { puff(0.04, { type: "lowpass", f: 700, gain: 0.04 }); };
  SFX.sparkle = function () { puff(0.5, { type: "lowpass", f: 500, to: 900, gain: 0.08, attack: 0.2 }); };
  SFX.chop = function () {         // a knife meeting a wooden board: soft and woody
    tone(150, 0.07, { to: 90, gain: 0.34 }); puff(0.05, { type: "lowpass", f: 900, gain: 0.3 }); puff(0.02, { type: "bandpass", f: 2600, q: 1.5, gain: 0.1, delay: 0.005 });
  };
  SFX.tick = function () {         // the stove clicking before the flame
    for (let i = 0; i < 3; i++) { tone(1800, 0.015, { gain: 0.1, delay: i * 0.16 }); puff(0.02, { type: "bandpass", f: 3000, q: 2, gain: 0.08, delay: i * 0.16 }); }
  };
  SFX.simmer = function () {       // a gentle, slow bubbling pot
    if (!ensure()) return function () {};
    const t = ctx.currentTime, src = noise(true), lp = ctx.createBiquadFilter(), g = ctx.createGain();
    lp.type = "lowpass"; lp.frequency.value = 420;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.1, t + 1.2);
    src.connect(lp); lp.connect(g); g.connect(out); src.start(0, Math.random());
    let alive = true;
    (function bub() {
      if (!alive) return;
      const f = 180 + Math.random() * 220;
      tone(f, 0.12, { to: f * 1.6, gain: 0.09 + Math.random() * 0.07, pan: Math.random() * 0.8 - 0.4 });
      setTimeout(bub, 160 + Math.random() * 420);
    })();
    return function () { alive = false; try { g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.4); } catch (e) {} setTimeout(function () { try { src.stop(); } catch (e) {} }, 2000); };
  };
  SFX.sizzle = function () {       // butter and onions in a warm pan: soft crackle
    if (!ensure()) return function () {};
    const t = ctx.currentTime, src = noise(true), bp = ctx.createBiquadFilter(), g = ctx.createGain();
    bp.type = "bandpass"; bp.frequency.value = 2400; bp.Q.value = 0.6;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.035, t + 1.2);
    src.connect(bp); bp.connect(g); g.connect(out); src.start(0, Math.random());
    let alive = true;
    (function pop() {
      if (!alive) return;
      puff(0.015, { type: "bandpass", f: 2500 + Math.random() * 3000, q: 2, gain: 0.03 + Math.random() * 0.03, pan: Math.random() - 0.5 });
      setTimeout(pop, 90 + Math.random() * 260);
    })();
    return function () { alive = false; try { g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.3); } catch (e) {} setTimeout(function () { try { src.stop(); } catch (e) {} }, 1500); };
  };
  SFX.ding = function () { tone(1318, 0.9, { gain: 0.16, to: 1310 }); tone(1976, 0.7, { gain: 0.07, delay: 0.01 }); };
  SFX.drop = function () { puff(0.06, { type: "lowpass", f: 700, gain: 0.25 }); tone(120, 0.08, { to: 80, gain: 0.2 }); };
  // calm mode (used in the kitchen): everything quieter, rounder and slower
  const orig = {}; ["whoosh", "pop", "chop", "tick", "ignite", "tap", "go", "drop", "plop", "clink", "rustle"].forEach(function (n) { orig[n] = SFX[n]; });
  let calm = false;
  SFX.setCalm = function (on) {
    calm = !!on; calmK = on ? 0.55 : 1;
    if (master && ctx) { master.gain.setTargetAtTime(vol.sfx * BOOST * calmK, ctx.currentTime, 0.25); if (warmNode) warmNode.frequency.setTargetAtTime(on ? 1500 : 3200, ctx.currentTime, 0.25); }
  };
  SFX.whoosh = function (ms) { if (!calm) orig.whoosh(ms); };
  SFX.pop = function (k) { if (!calm) return orig.pop(k); tone(190 + (k || 0) * 18, 0.12, { to: 150, gain: 0.12 }); puff(0.05, { type: "lowpass", f: 600, gain: 0.05 }); };
  SFX.tap = function () { if (!calm) return orig.tap(); tone(150, 0.14, { to: 100, gain: 0.14 }); puff(0.05, { type: "lowpass", f: 700, gain: 0.07 }); };
  SFX.go = function () { if (!calm) return orig.go(); tone(170, 0.16, { to: 120, gain: 0.14 }); tone(205, 0.16, { to: 130, gain: 0.1, delay: 0.1 }); };
  SFX.chop = function () { if (!calm) return orig.chop(); tone(120, 0.1, { to: 80, gain: 0.2 }); puff(0.06, { type: "lowpass", f: 650, gain: 0.14 }); };
  SFX.tick = function () { if (!calm) return orig.tick(); tone(900, 0.03, { gain: 0.04 }); tone(900, 0.03, { gain: 0.04, delay: 0.3 }); };
  SFX.ignite = function () { if (!calm) return orig.ignite(); puff(1.2, { type: "lowpass", f: 200, to: 900, gain: 0.12, attack: 0.5 }); };
  SFX.drop = function () { if (!calm) return orig.drop(); puff(0.08, { type: "lowpass", f: 500, gain: 0.1 }); tone(110, 0.1, { to: 80, gain: 0.08 }); };
  SFX.plop = function () { if (!calm) return orig.plop(); tone(210, 0.14, { to: 120, gain: 0.1 }); puff(0.06, { type: "lowpass", f: 500, gain: 0.05 }); };
  SFX.clink = function () { if (!calm) return orig.clink(); ring(1100, 0.1, 0.12); };
  SFX.rustle = function () { if (!calm) return orig.rustle(); for (let i = 0; i < 6; i++) puff(0.08, { type: "bandpass", f: 1800 + Math.random() * 1400, q: 1, gain: 0.05, delay: i * 0.09 }); };
  SFX.ding = function () { tone(988, 1.3, { gain: 0.07, to: 984 }); tone(1480, 1.0, { gain: 0.03, delay: 0.01 }); };
  window.SFX = SFX;

  // each kind of button gets its own sound
  document.addEventListener("click", function (e) {
    const t = e.target.closest ? e.target : null;
    if (!t) return;
    if (t.closest("#begin, .rjar, #r-stage, #cook-svg, #r-candle-next, #music-btn, #vol-panel, #r-prev, #r-next")) return;   // these have their own sounds
    if (t.closest(".k-mug")) SFX.clink();
    else if (t.closest(".chip, .k-chip, .rgenre")) { if (t.closest("#r-prev, #r-next")) return; SFX.pop(Math.floor(Math.random() * 4)); }
    else if (t.closest(".k-next, .begin, .btn, .primary, #r-close")) { t.closest("#r-close") ? SFX.close() : SFX.go(); }
    else if (t.closest("button, [role=button]")) SFX.tap();
  }, true);
  document.addEventListener("keydown", function (e) {
    if (e.target && e.target.tagName === "INPUT" && e.key.length === 1) SFX.key();
  }, true);
})();