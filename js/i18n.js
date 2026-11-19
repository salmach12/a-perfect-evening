// English only for now (the sentences live here so other languages can be added later).
// To change a sentence, find it below. English is the default; recipe sentences use the English text as their key.
const LANGS = ["en"];
let LANG = "en";
const DICT = { en: {} };
function t(key) { return (DICT[LANG] && DICT[LANG][key]) || DICT.en[key] || key; }

Object.assign(DICT.en, {
  "welcome": "welcome to", "title": "A Perfect<br>Evening", "ask": "Come in, sit down. Are you ready?", "begin": "Begin",
  "music": "Turn music on or off",
  "bar": "tea time ~ fresh flowers ~ a good book",
  "name.title": "What should I call you?", "name.hint": "So I can keep you company tonight.", "name.ph": "Your name", "name.next": "Nice to meet you",
  "skip": "skip", "continue": "Continue",
  "ci.title": "How was your day, {name}?", "ci.hint": "Just for you. It stays on your device. You can skip.", "ci.aria": "How are you feeling",
  "ci.note": "Anything you want to say about today... (optional)",
  "mood.good": "Good", "mood.okay": "Okay", "mood.tired": "Tired", "mood.heavy": "A bit heavy",
  "pick.title": "Pick three for tonight, {name}", "pick.hint": "Choose any 3 things you'd love to do. ({n}/3)", "pick.done": "Perfect choice.",
  "pick.aria": "Activities", "pick.next": "Next",
  "act.cooking": "Cooking", "act.baking": "Baking", "act.hot_drinks": "Hot drinks", "act.reading": "Reading", "act.journaling": "Journaling", "act.sketching": "Sketching",
  "order.title": "What comes first?", "order.hint": "Tap them in the order you'd like to do them.", "order.aria": "Choose the order",
  "order.start": "Start my evening", "order.reset": "start over",
  "done.title": "Lovely, {name}.", "done.ready": "Your evening is getting ready...",
  "board1": "Granny's", "board2": "coffee corner", "board3": "tea · cocoa · cake",
  "d.tea": "Tea", "d.coffee": "Coffee", "d.cocoa": "Hot chocolate",
  "k.again": "Make another", "k.drinkAria": "Pick a drink", "k.mugAria": "Pick a mug",
  "k.pickMug": "First, pick a mug from granny's shelf, {name}.", "k.thisOne": "This one", "k.welcome": "Welcome to granny's coffee corner, {name}. What shall we make?",
  "k.how": "Lovely choice. How would you like it, {name}?",
  "mug.oat": "Oat mug", "mug.olive": "Olive mug", "mug.cocoa": "Cocoa mug", "mug.sand": "Sandy mug", "mug.clay": "Terracotta mug", "mug.moss": "Mossy mug", "mug.honey": "Honey mug", "mug.cream": "Flower mug",
  "n.sit": "Come sit by the window, {name}. Your drink is ready.", "n.tap": "Tap your mug to take a sip.",
  "n.again": "Tap again for another sip.",
  "n.s1": "Mmm... warm all the way down.", "n.s2": "Slow sips. Nowhere to be.", "n.s3": "The cat is purring. All is well.", "n.s4": "Cozy. Just cozy.",
  "n.next": "Continue", "n.end": "Finish my evening",
  "r.good.t": "Yay, {name}!", "r.good.x": "I'm so happy to hear that, {name}! Good days deserve a cozy ending. Let's make tonight extra special.",
  "r.okay.t": "That's okay, {name}", "r.okay.x": "An okay day still counts, {name}. You made it through, and that's enough. Let's give it a soft, gentle ending.",
  "r.tired.t": "Oh, {name}...", "r.tired.x": "You've carried a lot today, {name}. Your only job tonight is to rest and get cozy. Everything else can wait until tomorrow.",
  "r.heavy.t": "Come here, {name}", "r.heavy.x": "I'm really glad you told me, {name}. Heavy days are hard, and you don't have to be okay right now. Tonight, just sit by the candle, sip something warm, and let the evening look after you.",
  "r.note.t": "Thank you, {name}", "r.note.x": "Thank you for sharing your day with me, {name}. I'm right here with you. Let's settle in together.",
  "r.skip.t": "No pressure", "r.skip.x": "That's completely okay, {name}. No questions at all. Let's just settle in."
});

/* ---------- applying a language to the page ---------- */
function applyLang() {
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t(n.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach(function (n) { n.innerHTML = t(n.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-ph]").forEach(function (n) { n.setAttribute("placeholder", t(n.dataset.i18nPh)); });
  document.querySelectorAll("[data-i18n-aria]").forEach(function (n) { n.setAttribute("aria-label", t(n.dataset.i18nAria)); });
  // stretched SVG text would distort Arabic letters, so only stretch the Latin ones
  document.querySelectorAll(".bar-text").forEach(function (n) {
    if (LANG === "ar") { n.removeAttribute("textLength"); n.removeAttribute("lengthAdjust"); n.setAttribute("font-size", "22"); }
    else { n.setAttribute("textLength", "290"); n.setAttribute("lengthAdjust", "spacingAndGlyphs"); n.removeAttribute("font-size"); }
  });
  if (typeof onLangChange === "function") onLangChange();
}
