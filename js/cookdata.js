// Cooking data: what is in the fridge, the cupboard and on the spice rack, and the menu with its recipes.
(function () {
  const A = {
    jar: function (c, l) { return '<path d="M-26 -78 Q-30 -46 -26 -4 Q0 6 26 -4 Q30 -46 26 -78Z" fill="#eef0e6" fill-opacity=".8"/><path d="M-22 -46 Q-22 -8 -18 -6 Q0 2 18 -6 Q22 -8 22 -46Z" fill="' + c + '"/><rect x="-29" y="-92" width="58" height="16" rx="5" fill="#c9a24a"/><rect x="-19" y="-58" width="38" height="22" rx="3" fill="#f6ecd0" stroke-width="2"/>' + (l ? '<text x="0" y="-42" text-anchor="middle" font-family="Caveat Brush, cursive" font-size="15" fill="#5a2a1c" stroke="none">' + l + "</text>" : ""); },
    bottle: function (c, cap) { return '<path d="M-10 -92 H10 V-70 Q26 -60 26 -40 V-4 Q0 4 -26 -4 V-40 Q-26 -60 -10 -70Z" fill="' + c + '"/><rect x="-11" y="-100" width="22" height="10" rx="3" fill="' + (cap || "#c9a24a") + '"/><rect x="-18" y="-46" width="36" height="24" rx="3" fill="#f6ecd0" stroke-width="2"/><path d="M-18 -64 q-2 20 0 40" stroke="#fff" stroke-width="3" opacity=".45" fill="none"/>'; },
    carton: function (c) { return '<path d="M-26 -84 L-26 -4 L26 -4 L26 -84 L12 -100 H-12Z" fill="' + c + '"/><path d="M-26 -84 H26 M0 -100 V-84" fill="none" stroke-width="2.4"/><rect x="-17" y="-60" width="34" height="30" rx="4" fill="#fbf3dc" stroke-width="2"/><path d="M-8 -48 q8 -10 16 0" fill="none" stroke-width="2"/>'; },
    can: function (c) { return '<ellipse cx="0" cy="-6" rx="34" ry="9" fill="#b9bdbd"/><path d="M-34 -6 V-62 H34 V-6 Q0 6 -34 -6Z" fill="#cdd1d0"/><path d="M-34 -50 H34 V-18 Q0 -8 -34 -18Z" fill="' + c + '"/><ellipse cx="0" cy="-62" rx="34" ry="9" fill="#e4e7e6"/><circle cx="0" cy="-62" r="5" fill="none" stroke-width="2"/>'; },
    bag: function (c, l) { return '<path d="M-30 -4 Q-34 -50 -28 -92 L28 -92 Q34 -50 30 -4 Q0 4 -30 -4Z" fill="' + c + '"/><path d="M-28 -92 l5 -7 l5 7 l5 -7 l5 7 l5 -7 l5 7 l5 -7 l5 7 l5 -7 l5 7" fill="none" stroke-width="2.4"/><ellipse cx="0" cy="-48" rx="20" ry="16" fill="#fbf3dc" stroke-width="2"/><text x="0" y="-44" text-anchor="middle" font-family="Caveat Brush, cursive" font-size="14" fill="#5a2a1c" stroke="none">' + (l || "") + "</text>"; },
    box: function (c, l) { return '<rect x="-34" y="-86" width="68" height="82" rx="4" fill="' + c + '"/><path d="M-34 -70 H34" stroke-width="2.4" fill="none"/><ellipse cx="0" cy="-42" rx="22" ry="16" fill="#fbf3dc" stroke-width="2"/><text x="0" y="-38" text-anchor="middle" font-family="Caveat Brush, cursive" font-size="13" fill="#5a2a1c" stroke="none">' + (l || "") + "</text>"; },
    wedge: function (c) { return '<path d="M-46 -6 L46 -6 L46 -30 L-30 -62 Z" fill="' + c + '"/><path d="M-30 -62 L46 -30 V-6 H-46Z" fill="' + c + '" opacity=".0"/><path d="M-46 -6 L-30 -62" fill="none"/><circle cx="-10" cy="-22" r="5" fill="#fff" fill-opacity=".45" stroke-width="2"/><circle cx="18" cy="-17" r="4" fill="#fff" fill-opacity=".45" stroke-width="2"/><circle cx="-26" cy="-14" r="3" fill="#fff" fill-opacity=".45" stroke-width="2"/>'; },
    slab: function (c) { return '<path d="M-44 -4 L-30 -44 H46 L36 -4Z" fill="' + c + '"/><path d="M-44 -4 H36 V-16 H-40Z" fill="#fff" fill-opacity=".35" stroke="none"/><path d="M-4 -44 V-4" stroke-width="2" fill="none"/>'; },
    balls: function (c) { return '<circle cx="-22" cy="-22" r="22" fill="' + c + '"/><circle cx="22" cy="-22" r="22" fill="' + c + '"/><circle cx="0" cy="-52" r="22" fill="' + c + '"/><path d="M-30 -30 q4 -6 10 -6" stroke="#fff" stroke-width="3" opacity=".6" fill="none"/>'; },
    slices: function (c, dots) { let s = '<ellipse cx="-14" cy="-14" rx="40" ry="13" fill="' + c + '"/><ellipse cx="12" cy="-30" rx="40" ry="13" fill="' + c + '"/><ellipse cx="-6" cy="-46" rx="40" ry="13" fill="' + c + '"/>'; if (dots) s += '<circle cx="-14" cy="-46" r="3" fill="#8c2a22" stroke="none"/><circle cx="8" cy="-48" r="3" fill="#8c2a22" stroke="none"/><circle cx="6" cy="-30" r="3" fill="#8c2a22" stroke="none"/><circle cx="26" cy="-30" r="3" fill="#8c2a22" stroke="none"/>'; return s; },
    egg: function () { return '<ellipse cx="-22" cy="-24" rx="19" ry="24" fill="#f1e2c4"/><ellipse cx="22" cy="-24" rx="19" ry="24" fill="#e9d3aa"/><ellipse cx="0" cy="-56" rx="19" ry="24" fill="#f6ead0"/><path d="M-30 -34 q2 -8 8 -10" stroke="#fff" stroke-width="3" opacity=".6" fill="none"/>'; },
    loaf: function () { return '<path d="M-52 -6 Q-60 -52 -22 -64 Q0 -72 22 -64 Q60 -52 52 -6 Q0 6 -52 -6Z" fill="#d9a35c"/><path d="M-30 -52 l12 22 M-6 -58 l12 26 M18 -52 l12 22" fill="none" stroke-width="2.6"/><path d="M-40 -44 q10 -10 24 -12" stroke="#fff" stroke-width="3" opacity=".4" fill="none"/>'; },
    drum: function (c) { return '<path d="M-30 -28 Q-40 -66 0 -72 Q36 -72 36 -40 Q34 -14 4 -10 Z" fill="' + c + '"/><path d="M-30 -28 L-48 -12 Q-54 -4 -44 -2 Q-34 2 -28 -8 L-10 -14" fill="#f1e6cc"/><path d="M-12 -60 q16 -8 26 4" stroke="#fff" stroke-width="3" opacity=".5" fill="none"/>'; },
    pile: function (c) { let s = '<path d="M-48 -6 Q-52 -40 -22 -50 Q0 -64 22 -50 Q52 -40 48 -6 Q0 6 -48 -6Z" fill="' + c + '"/>'; for (let i = 0; i < 7; i++) s += '<path d="M' + (-34 + i * 11) + " " + (-12 - (i % 3) * 10) + ' q6 -6 10 2" stroke="#7a2a22" stroke-width="2" fill="none" opacity=".7"/>'; return s; },
    shrimp: function () { return '<path d="M-36 -20 Q-44 -64 0 -66 Q40 -64 38 -26 Q36 -10 20 -10 Q30 -34 6 -46 Q-18 -50 -18 -20 Z" fill="#f2a08a"/><path d="M-26 -50 l14 6 M-14 -58 l12 8 M0 -60 l8 10 M12 -54 l6 10" fill="none" stroke-width="2"/><path d="M20 -10 l10 8 l-4 -10 M-36 -20 l-8 6 l12 0" fill="#f2a08a" stroke-width="2.4"/><circle cx="-22" cy="-48" r="2.4" fill="#3a2416"/>'; },
    leafy: function (c) { return '<path d="M-40 -8 Q-52 -54 -18 -70 Q0 -80 18 -70 Q52 -54 40 -8 Q0 6 -40 -8Z" fill="' + c + '"/><path d="M0 -4 V-70 M0 -26 l-20 -22 M0 -36 l22 -20 M0 -16 l-26 -12 M0 -18 l26 -12" fill="none" stroke="#fff" stroke-width="2.4" opacity=".6"/>'; },
    long: function (c, st) { return '<g transform="translate(0 -26) rotate(-18)"><rect x="-54" y="-17" width="108" height="34" rx="17" fill="' + c + '"/><path d="M-36 -8 h20 M-6 4 h22 M24 -6 h14" stroke="' + (st || "#fff") + '" stroke-width="3" opacity=".5" fill="none"/></g>'; },
    bell: function (c) { return '<path d="M-36 -34 Q-40 -76 -10 -70 Q0 -66 10 -70 Q40 -76 36 -34 Q34 -2 18 -4 Q0 4 -18 -4 Q-34 -2 -36 -34Z" fill="' + c + '"/><path d="M-4 -70 q-2 -12 8 -16" stroke="#6f8a3e" stroke-width="6" fill="none"/><path d="M-22 -56 Q-26 -34 -18 -16" stroke="#fff" stroke-width="3" opacity=".4" fill="none"/>'; },
    broc: function () { return '<path d="M-8 -4 L-12 -40 H12 L8 -4Z" fill="#a8c070"/><circle cx="-22" cy="-54" r="20" fill="#5f8a3c"/><circle cx="0" cy="-66" r="22" fill="#6b9a42"/><circle cx="22" cy="-54" r="20" fill="#5f8a3c"/><circle cx="0" cy="-48" r="18" fill="#6b9a42"/>'; },
    lemon: function () { return '<path d="M-44 -32 Q-30 -62 0 -62 Q30 -62 44 -32 Q30 -4 0 -4 Q-30 -4 -44 -32Z" fill="#f0d24a"/><path d="M-44 -32 l-8 0 M44 -32 l8 0" stroke-width="4" fill="none"/><path d="M-22 -48 q10 -8 22 -6" stroke="#fff" stroke-width="3" opacity=".6" fill="none"/>'; },
    garlic: function () { return '<path d="M0 -84 Q-6 -66 -30 -48 Q-42 -20 -22 -6 Q0 2 22 -6 Q42 -20 30 -48 Q6 -66 0 -84Z" fill="#f3ead4"/><path d="M-10 -60 Q-18 -30 -8 -4 M10 -60 Q18 -30 8 -4" fill="none" stroke-width="2.4"/>'; },
    dough: function (c) { return '<path d="M-44 -10 Q-52 -46 -20 -56 Q0 -62 20 -56 Q52 -46 44 -10 Q0 4 -44 -10Z" fill="' + c + '"/><path d="M-24 -40 q10 -8 22 -4" stroke="#fff" stroke-width="3" opacity=".5" fill="none"/>'; },
    roll: function (c) { return '<path d="M-50 -12 Q-50 -52 0 -52 Q50 -52 50 -12 Q0 6 -50 -12Z" fill="' + c + '"/><ellipse cx="0" cy="-38" rx="42" ry="10" fill="#f0d9a2"/><path d="M-26 -38 q26 -6 52 0" fill="none" stroke-width="2"/>'; },
    croutons: function () { let s = ""; [[-26, -12], [0, -14], [26, -12], [-14, -34], [14, -34], [0, -54]].forEach(function (p, i) { s += '<rect x="' + (p[0] - 14) + '" y="' + (p[1] - 12) + '" width="28" height="24" rx="5" fill="#d9a35c" transform="rotate(' + (i * 17 % 30 - 14) + " " + p[0] + " " + p[1] + ')"/>'; }); return s; },
    olives: function () { return A.jar("#7b8a3a", "olives"); },
    cuke: function () { return A.long("#6f9a4a", "#cfe6a0"); },
    rack: function () { return ""; }
  };
  const V = window.VEGART || {};
  // id → [name, place, art(), colour of the pieces, how it goes in: liq | solid | dust, piece shape]
  const ING = {
    eggs: ["Eggs", "fridge", function () { return A.egg(); }, "#f0d27a", "liq"],
    milk: ["Milk", "fridge", function () { return A.carton("#e8f0f2"); }, "#f4efe2", "liq"],
    cream: ["Cream", "fridge", function () { return A.carton("#f6ecd0"); }, "#f6edd0", "liq"],
    butter: ["Butter", "fridge", function () { return A.slab("#f2d878"); }, "#f1d77c", "liq"],
    cheddar: ["Cheddar", "fridge", function () { return A.wedge("#efb64a"); }, "#efb64a", "solid", "shred", "cheese"],
    mozzarella: ["Mozzarella", "fridge", function () { return A.balls("#f7f1de"); }, "#f6eed6", "solid", "shred", "cheese"],
    parmesan: ["Parmesan", "fridge", function () { return A.wedge("#ecd490"); }, "#ecd490", "solid", "shred", "cheese"],
    feta: ["Feta", "fridge", function () { return A.wedge("#f4f1e6"); }, "#f4f1e6", "solid", "cube"],
    ham: ["Ham", "fridge", function () { return A.slices("#e9a3a0"); }, "#e49a98", "solid", "cube"],
    chicken: ["Chicken breast", "fridge", function () { return A.drum("#e9b78a"); }, "#ecc79c", "solid", "cube"],
    beef: ["Ground beef", "fridge", function () { return A.pile("#a8442f"); }, "#8f3b2a", "solid", "crumb"],
    shrimp: ["Shrimp", "fridge", function () { return A.shrimp(); }, "#f2a08a", "solid", "curl"],
    pepperoni: ["Pepperoni", "fridge", function () { return A.slices("#c4472f", 1); }, "#b83c2a", "solid", "disc"],
    tomato: ["Tomato", "fridge", "tomato", "#d6452e", "solid", "cube"],
    lettuce: ["Lettuce", "fridge", function () { return A.leafy("#8fb85a"); }, "#8fb85a", "solid", "leaf"],
    cucumber: ["Cucumber", "fridge", function () { return A.cuke(); }, "#8fba66", "solid", "cube"],
    redonion: ["Red onion", "fridge", "onion", "#b8618f", "solid", "cube", null, "#c07aa0"],
    bellpepper: ["Bell pepper", "fridge", function () { return A.bell("#d6402c"); }, "#d6402c", "solid", "cube"],
    spinach: ["Spinach", "fridge", function () { return A.leafy("#4f8a3c"); }, "#4a7e38", "solid", "leaf"],
    mushroom: ["Mushrooms", "fridge", "mushroom", "#c9a679", "solid", "cube"],
    carrot: ["Carrot", "fridge", "carrot", "#e8892e", "solid", "cube"],
    zucchini: ["Zucchini", "fridge", function () { return A.long("#5f8f3c", "#d6eaa8"); }, "#7fa64a", "solid", "cube"],
    pastry: ["Pastry dough", "fridge", function () { return A.roll("#e6c78a"); }, "#e3c283", "solid", "dough"],
    pizzadough: ["Pizza dough", "fridge", function () { return A.dough("#f0dcae"); }, "#efd9a8", "solid", "dough"],
    mayo: ["Mayonnaise", "fridge", function () { return A.jar("#f7f0d8", "mayo"); }, "#f5efd6", "liq"],
    basil: ["Fresh basil", "fridge", "herb", "#5f8a3c", "solid", "leaf"],
    flour: ["Flour", "pantry", function () { return A.bag("#f3ead4", "flour"); }, "#f3ead4", "dust"],
    spaghetti: ["Spaghetti", "pantry", function () { return A.box("#d9a640", "spaghetti"); }, "#ecd08a", "solid", "strand"],
    fettuccine: ["Fettuccine", "pantry", function () { return A.box("#e3b856", "fettuccine"); }, "#f0d99a", "solid", "strand"],
    arborio: ["Arborio rice", "pantry", function () { return A.bag("#efe6cc", "rice"); }, "#f3ecd6", "solid", "grain"],
    passata: ["Tomato passata", "pantry", function () { return A.bottle("#c4402a", "#7a4a2a"); }, "#c9402b", "liq", null, "sauce"],
    oil: ["Olive oil", "pantry", function () { return A.bottle("#b9b04a", "#4a6a3a"); }, "#d9c25a", "liq"],
    stock: ["Vegetable stock", "pantry", function () { return A.carton("#9fc07a"); }, "#d9b870", "liq"],
    bread: ["Bread", "pantry", function () { return A.loaf(); }, "#e6c288", "solid", "slice", "bread"],
    croutons: ["Croutons", "pantry", function () { return A.croutons(); }, "#d9a35c", "solid", "cube"],
    tuna: ["Canned tuna", "pantry", function () { return A.can("#4f7fa8"); }, "#d9a894", "solid", "crumb"],
    potato: ["Potatoes", "pantry", "potato", "#e6cf8a", "solid", "cube"],
    onion: ["Onion", "pantry", "onion", "#efdca4", "solid", "cube"],
    garlic: ["Garlic", "pantry", function () { return A.garlic(); }, "#f3ead4", "solid", "cube"],
    olives: ["Olives", "pantry", function () { return A.olives(); }, "#5f6a2e", "solid", "dot"],
    pumpkin: ["Pumpkin", "pantry", "pumpkin", "#e3862d", "solid", "cube"],
    vinegar: ["Red wine vinegar", "pantry", function () { return A.bottle("#8a3a3a", "#3a2416"); }, "#8a3a3a", "liq"],
    caesar: ["Caesar dressing", "pantry", function () { return A.bottle("#efe4be", "#a3432c"); }, "#efe4be", "liq"],
    lemon: ["Lemon", "pantry", function () { return A.lemon(); }, "#f0d24a", "liq"],
    salt: ["Salt", "spice", function () { return A.jar("#f1ede2", "salt"); }, "#f1ede2", "dust"],
    pepper: ["Black pepper", "spice", function () { return A.jar("#3f3128", "pepper"); }, "#4a3a30", "dust"],
    oregano: ["Oregano", "spice", function () { return A.jar("#6f8a3e", "oregano"); }, "#6f8a3e", "dust"],
    thyme: ["Thyme", "spice", function () { return A.jar("#8a9a52", "thyme"); }, "#8a9a52", "dust"],
    nutmeg: ["Nutmeg", "spice", function () { return A.jar("#a8683a", "nutmeg"); }, "#a8683a", "dust"],
    paprika: ["Paprika", "spice", function () { return A.jar("#c4502a", "paprika"); }, "#c4502a", "dust"],
    chili: ["Chili flakes", "spice", function () { return A.jar("#c4301f", "chili"); }, "#c4301f", "dust"],
    parsley: ["Parsley", "spice", function () { return A.jar("#5f8a3c", "parsley"); }, "#5f8a3c", "dust"],
    water: ["Water", null, null, "#bcd2d6", "liq"]
  };
  const NAMES = {}; Object.keys(ING).forEach(function (k) { NAMES[k] = ING[k][0]; });

  // steps: [type, ...]. Types: chop ing to · add ing to · season [spices] to · mix to tool · heat secs · bake secs
  //        move from to [swapTo] · roll ing to · stack ing to · flip · taste where
  const MENU = [
    { id: "quiche", name: "Quiche", icon: "pie", line: "Buttery pastry, a soft golden custard.", recipes: [
      { id: "q-chicken", name: "Chicken Quiche", ware: "pan", tin: "tart", eat: "wedge", bite: ["#e9b75a", "#e6c78a"], ing: { pastry: "1 sheet", onion: "1 small", chicken: "1 breast", eggs: "3 eggs", cream: "a small cup", cheddar: "a handful", salt: "a pinch", pepper: "a pinch" },
        steps: [["roll", "pastry", "tin", "Roll out the pastry and press it into the tin."], ["chop", "onion", "vessel"], ["chop", "chicken", "vessel"], ["heat", 4, "Cook until the chicken turns golden."], ["move", "vessel", "tin", null, "Spoon the filling into the pastry."], ["add", "eggs", "bowl"], ["add", "cream", "bowl"], ["add", "cheddar", "bowl"], ["season", ["salt", "pepper"], "bowl"], ["mix", "bowl", "whisk", "Whisk the custard until smooth."], ["move", "bowl", "tin", null, "Pour the custard over the filling."], ["bake", 6, "Bake until set and golden."], ["taste", "tin"]] },
      { id: "q-beef", name: "Ground Beef Quiche", ware: "pan", tin: "tart", eat: "wedge", bite: ["#d9a04a", "#e6c78a"], ing: { pastry: "1 sheet", onion: "1 small", beef: "200 g", eggs: "3 eggs", cream: "a small cup", cheddar: "a handful", salt: "a pinch", pepper: "a pinch", paprika: "a pinch" },
        steps: [["roll", "pastry", "tin", "Roll out the pastry and press it into the tin."], ["chop", "onion", "vessel"], ["add", "beef", "vessel", "Crumble the beef into the pan."], ["season", ["paprika"], "vessel"], ["heat", 4, "Brown the beef well."], ["move", "vessel", "tin", null, "Spoon the filling into the pastry."], ["add", "eggs", "bowl"], ["add", "cream", "bowl"], ["add", "cheddar", "bowl"], ["season", ["salt", "pepper"], "bowl"], ["mix", "bowl", "whisk", "Whisk the custard until smooth."], ["move", "bowl", "tin", null, "Pour the custard over the filling."], ["bake", 6, "Bake until set and golden."], ["taste", "tin"]] },
      { id: "q-veg", name: "Vegetarian Quiche", ware: "pan", tin: "tart", eat: "wedge", bite: ["#d9b04a", "#e6c78a"], ing: { pastry: "1 sheet", onion: "1 small", mushroom: "a handful", spinach: "a big handful", eggs: "3 eggs", cream: "a small cup", feta: "a handful", pepper: "a pinch", nutmeg: "a pinch" },
        steps: [["roll", "pastry", "tin", "Roll out the pastry and press it into the tin."], ["chop", "onion", "vessel"], ["chop", "mushroom", "vessel"], ["chop", "spinach", "vessel"], ["heat", 4, "Soften the vegetables."], ["move", "vessel", "tin", null, "Spoon the filling into the pastry."], ["add", "eggs", "bowl"], ["add", "cream", "bowl"], ["add", "feta", "bowl"], ["season", ["pepper", "nutmeg"], "bowl"], ["mix", "bowl", "whisk", "Whisk the custard until smooth."], ["move", "bowl", "tin", null, "Pour the custard over the vegetables."], ["bake", 6, "Bake until set and golden."], ["taste", "tin"]] }
    ] },
    { id: "soup", name: "Soup", icon: "cup", line: "Slow, warm and good for the soul.", recipes: [
      { id: "s-potato", name: "Creamy Potato Soup", ware: "pot", eat: "spoon", ing: { butter: "a knob", onion: "1 small", potato: "3 potatoes", stock: "a carton", cream: "a small cup", salt: "a pinch", pepper: "a pinch", nutmeg: "a pinch" },
        steps: [["add", "butter", "vessel", "Melt the butter in the pot."], ["chop", "onion", "vessel"], ["chop", "potato", "vessel"], ["add", "stock", "vessel"], ["heat", 5, "Simmer until the potatoes are soft."], ["add", "cream", "vessel"], ["season", ["salt", "pepper", "nutmeg"], "vessel"], ["mix", "vessel", "spoon", "Stir until it's creamy."], ["move", "vessel", "bowl", null, "Ladle it into a bowl."], ["taste", "bowl"]] },
      { id: "s-pumpkin", name: "Pumpkin Soup", ware: "pot", eat: "spoon", ing: { oil: "a splash", onion: "1 small", pumpkin: "a good slice", carrot: "1 carrot", stock: "a carton", cream: "a small cup", salt: "a pinch", pepper: "a pinch", nutmeg: "a pinch" },
        steps: [["add", "oil", "vessel"], ["chop", "onion", "vessel"], ["chop", "pumpkin", "vessel"], ["chop", "carrot", "vessel"], ["add", "stock", "vessel"], ["heat", 5, "Simmer until the pumpkin is tender."], ["add", "cream", "vessel"], ["season", ["salt", "pepper", "nutmeg"], "vessel"], ["mix", "vessel", "spoon", "Stir until it turns golden and velvety."], ["move", "vessel", "bowl", null, "Ladle it into a bowl."], ["taste", "bowl"]] },
      { id: "s-veg", name: "Vegetable Soup", ware: "pot", eat: "spoon", ing: { oil: "a splash", onion: "1 small", carrot: "1 carrot", potato: "1 potato", zucchini: "1 small", tomato: "2 tomatoes", stock: "a carton", salt: "a pinch", pepper: "a pinch", thyme: "a pinch" },
        steps: [["add", "oil", "vessel"], ["chop", "onion", "vessel"], ["chop", "carrot", "vessel"], ["chop", "potato", "vessel"], ["chop", "zucchini", "vessel"], ["chop", "tomato", "vessel"], ["add", "stock", "vessel"], ["heat", 5, "Simmer until everything is soft."], ["season", ["salt", "pepper", "thyme"], "vessel"], ["mix", "vessel", "spoon", "Give it a good stir."], ["move", "vessel", "bowl", null, "Ladle it into a bowl."], ["taste", "bowl"]] }
    ] },
    { id: "pasta", name: "Pasta", icon: "yarn", line: "Twirl, swirl and eat it while it's warm.", recipes: [
      { id: "p-alfredo", name: "Fettuccine Alfredo", ware: "pot", eat: "fork", ing: { fettuccine: "250 g", butter: "a big knob", cream: "a cup", parmesan: "a good handful", salt: "a pinch", pepper: "a pinch", nutmeg: "a pinch" },
        steps: [["add", "water", "vessel", "Fill the pot with water."], ["season", ["salt"], "vessel", "Salt the water."], ["heat", 3, "Bring it to a boil."], ["add", "fettuccine", "vessel"], ["heat", 4, "Cook until al dente."], ["move", "vessel", "bowl", "pan", "Drain the pasta into the big bowl. The pan comes out next."], ["add", "butter", "vessel"], ["add", "cream", "vessel"], ["add", "parmesan", "vessel"], ["season", ["pepper", "nutmeg"], "vessel"], ["heat", 3, "Let the sauce warm and thicken."], ["mix", "vessel", "spoon", "Stir until it's silky."], ["move", "vessel", "bowl", null, "Pour the sauce over the pasta."], ["taste", "bowl"]] },
      { id: "p-shrimp", name: "Creamy Spaghetti with Shrimp", ware: "pot", eat: "fork", ing: { spaghetti: "250 g", garlic: "2 cloves", shrimp: "a handful", butter: "a knob", cream: "a cup", parsley: "a pinch", chili: "a pinch", salt: "a pinch", pepper: "a pinch" },
        steps: [["add", "water", "vessel", "Fill the pot with water."], ["season", ["salt"], "vessel", "Salt the water."], ["heat", 3, "Bring it to a boil."], ["add", "spaghetti", "vessel"], ["heat", 4, "Cook until al dente."], ["move", "vessel", "bowl", "pan", "Drain the spaghetti into the big bowl. The pan comes out next."], ["add", "butter", "vessel"], ["chop", "garlic", "vessel"], ["add", "shrimp", "vessel"], ["heat", 3, "Cook until the shrimp turn pink."], ["add", "cream", "vessel"], ["season", ["pepper", "chili", "parsley"], "vessel"], ["mix", "vessel", "spoon", "Stir until it's creamy."], ["move", "vessel", "bowl", null, "Toss the shrimp and sauce through the spaghetti."], ["taste", "bowl"]] },
      { id: "p-risotto", name: "Mushroom Risotto", ware: "pan", eat: "spoon", ing: { oil: "a splash", onion: "1 small", mushroom: "a good handful", arborio: "1 cup", stock: "a carton", butter: "a knob", parmesan: "a handful", salt: "a pinch", pepper: "a pinch", thyme: "a pinch" },
        steps: [["add", "oil", "vessel"], ["chop", "onion", "vessel"], ["chop", "mushroom", "vessel"], ["heat", 3, "Soften the onion and mushrooms."], ["add", "arborio", "vessel"], ["add", "stock", "vessel", "Pour in the warm stock."], ["season", ["salt", "pepper", "thyme"], "vessel"], ["heat", 5, "Let the rice drink it up, slowly."], ["add", "butter", "vessel"], ["add", "parmesan", "vessel"], ["mix", "vessel", "spoon", "Stir until it's creamy."], ["move", "vessel", "bowl", null, "Spoon it into a warm bowl."], ["taste", "bowl"]] }
    ] },
    { id: "pizza", name: "Mini Pizza", icon: "mushroom", line: "Small, hot and a little bit crispy.", recipes: [
      { id: "z-margherita", name: "Margherita", tin: "pizza", eat: "wedge", bite: ["#d9503a", "#f0dcae"], ing: { pizzadough: "1 ball", passata: "3 spoons", mozzarella: "1 ball", basil: "a few leaves", oregano: "a pinch", oil: "a drizzle", salt: "a pinch" },
        steps: [["roll", "pizzadough", "tin", "Roll the dough into a little round."], ["add", "passata", "tin", "Spread on the tomato sauce."], ["add", "mozzarella", "tin"], ["season", ["oregano", "salt"], "tin"], ["add", "oil", "tin", "Drizzle with olive oil."], ["bake", 6, "Bake until bubbling."], ["add", "basil", "tin", "Scatter fresh basil on top."], ["taste", "tin"]] },
      { id: "z-pepperoni", name: "Pepperoni", tin: "pizza", eat: "wedge", bite: ["#c4472f", "#f0dcae"], ing: { pizzadough: "1 ball", passata: "3 spoons", mozzarella: "1 ball", pepperoni: "8 slices", oregano: "a pinch", chili: "a pinch" },
        steps: [["roll", "pizzadough", "tin", "Roll the dough into a little round."], ["add", "passata", "tin", "Spread on the tomato sauce."], ["add", "mozzarella", "tin"], ["add", "pepperoni", "tin", "Lay the pepperoni on top."], ["season", ["oregano", "chili"], "tin"], ["bake", 6, "Bake until bubbling."], ["taste", "tin"]] },
      { id: "z-veggie", name: "Veggie Pizza", tin: "pizza", eat: "wedge", bite: ["#7a9a4a", "#f0dcae"], ing: { pizzadough: "1 ball", passata: "3 spoons", mozzarella: "1 ball", bellpepper: "1 small", mushroom: "a few", redonion: "1/2", olives: "a few", oregano: "a pinch" },
        steps: [["roll", "pizzadough", "tin", "Roll the dough into a little round."], ["add", "passata", "tin", "Spread on the tomato sauce."], ["add", "mozzarella", "tin"], ["chop", "bellpepper", "tin"], ["chop", "mushroom", "tin"], ["chop", "redonion", "tin"], ["add", "olives", "tin"], ["season", ["oregano"], "tin"], ["bake", 6, "Bake until bubbling."], ["taste", "tin"]] }
    ] },
    { id: "sandwich", name: "Sandwich", icon: "pie", line: "Simple, stacked, and just how you like it.", recipes: [
      { id: "w-tuna", name: "Tuna Sandwich", tin: "plate", eat: "wedge", bite: ["#d9a894", "#e6c288"], ing: { bread: "2 slices", tuna: "1 can", mayo: "2 spoons", redonion: "a little", lettuce: "a leaf", salt: "a pinch", pepper: "a pinch" },
        steps: [["add", "tuna", "bowl"], ["add", "mayo", "bowl"], ["chop", "redonion", "bowl"], ["season", ["salt", "pepper"], "bowl"], ["mix", "bowl", "spoon", "Mix the tuna salad."], ["stack", "bread", "plate", "Set down the first slice of bread."], ["move", "bowl", "plate", null, "Spread the tuna on the bread."], ["stack", "lettuce", "plate"], ["stack", "bread", "plate", "Top with the second slice."], ["taste", "plate"]] },
      { id: "w-hamcheese", name: "Cheese & Ham Sandwich", tin: "plate", eat: "wedge", bite: ["#e49a98", "#e6c288"], ing: { bread: "2 slices", mayo: "a little", ham: "2 slices", cheddar: "2 slices", tomato: "1 small", lettuce: "a leaf", pepper: "a pinch" },
        steps: [["stack", "bread", "plate", "Set down the first slice of bread."], ["add", "mayo", "plate", "Spread a little mayo."], ["stack", "ham", "plate"], ["stack", "cheddar", "plate"], ["chop", "tomato", "plate"], ["stack", "lettuce", "plate"], ["season", ["pepper"], "plate"], ["stack", "bread", "plate", "Top with the second slice."], ["taste", "plate"]] },
      { id: "w-veg", name: "Veggie Sandwich", tin: "plate", eat: "wedge", bite: ["#8fb85a", "#e6c288"], ing: { bread: "2 slices", mayo: "a little", lettuce: "a leaf", cucumber: "1/2", tomato: "1 small", cheddar: "1 slice", salt: "a pinch", pepper: "a pinch" },
        steps: [["stack", "bread", "plate", "Set down the first slice of bread."], ["add", "mayo", "plate", "Spread a little mayo."], ["stack", "lettuce", "plate"], ["chop", "cucumber", "plate"], ["chop", "tomato", "plate"], ["stack", "cheddar", "plate"], ["season", ["salt", "pepper"], "plate"], ["stack", "bread", "plate", "Top with the second slice."], ["taste", "plate"]] },
      { id: "w-grilled", name: "Grilled Cheese", ware: "pan", tin: "plate", eat: "wedge", bite: ["#efb64a", "#d9a04a"], ing: { butter: "a knob", bread: "2 slices", cheddar: "2 slices", mozzarella: "a few shreds" },
        steps: [["add", "butter", "vessel", "Melt the butter in the pan."], ["stack", "bread", "vessel", "Lay a slice of bread in the pan."], ["stack", "cheddar", "vessel"], ["stack", "mozzarella", "vessel"], ["stack", "bread", "vessel", "Close it with the second slice."], ["heat", 4, "Toast until golden underneath."], ["flip", "Flip it over."], ["heat", 3, "Toast the other side."], ["move", "vessel", "plate", null, "Slide it onto a plate."], ["taste", "plate"]] }
    ] },
    { id: "salad", name: "Salad", icon: "leaf", line: "Crunchy, bright and quick.", recipes: [
      { id: "l-greek", name: "Greek Salad", tin: "bowl", eat: "fork", ing: { cucumber: "1", tomato: "2 tomatoes", redonion: "1/2", olives: "a handful", feta: "a good chunk", oil: "a drizzle", oregano: "a pinch", salt: "a pinch" },
        steps: [["chop", "cucumber", "bowl"], ["chop", "tomato", "bowl"], ["chop", "redonion", "bowl"], ["add", "olives", "bowl"], ["add", "feta", "bowl"], ["add", "oil", "bowl", "Drizzle with olive oil."], ["season", ["oregano", "salt"], "bowl"], ["mix", "bowl", "spoon", "Toss it all together, gently."], ["taste", "bowl"]] },
      { id: "l-caesar", name: "Caesar Salad", tin: "bowl", eat: "fork", ing: { lettuce: "a whole head", croutons: "a handful", parmesan: "a good handful", caesar: "a few spoons", lemon: "1/2", pepper: "a pinch" },
        steps: [["chop", "lettuce", "bowl"], ["add", "croutons", "bowl"], ["add", "parmesan", "bowl"], ["add", "caesar", "bowl", "Pour on the Caesar dressing."], ["add", "lemon", "bowl", "Squeeze over a little lemon."], ["season", ["pepper"], "bowl"], ["mix", "bowl", "spoon", "Toss it all together, gently."], ["taste", "bowl"]] },
      { id: "l-garden", name: "Garden Salad", tin: "bowl", eat: "fork", ing: { lettuce: "1 head", cucumber: "1/2", tomato: "2 tomatoes", carrot: "1 carrot", oil: "a drizzle", vinegar: "a splash", salt: "a pinch", pepper: "a pinch" },
        steps: [["chop", "lettuce", "bowl"], ["chop", "cucumber", "bowl"], ["chop", "tomato", "bowl"], ["chop", "carrot", "bowl"], ["add", "oil", "bowl", "Drizzle with olive oil."], ["add", "vinegar", "bowl", "Add a splash of vinegar."], ["season", ["salt", "pepper"], "bowl"], ["mix", "bowl", "spoon", "Toss it all together, gently."], ["taste", "bowl"]] }
    ] }
  ];
  window.COOKDATA = { ART: A, ING: ING, NAMES: NAMES, MENU: MENU };
})();
