// More books for the shelf: four extra stories in every mood (the shelf shows six per mood).
(function () {
  if (typeof STORIES === "undefined") return;
  const more = [
    /* ---------------- romantic ---------------- */
    { id: "train", genre: "romance", title: "The Last Seat on the 7:42", short: "The 7:42 Train", color: "#8a3a4a",
      pages: [
        "Every morning Mira took the 7:42, and every morning the only free seat was beside a man with a thermos and a crossword. She never spoke to him. She only noticed that he always left the newspaper folded to the same page, as if saving something.",
        "One Monday he was stuck on seven across. “Five letters, ‘a feeling of warm, quiet happiness.’” Mira looked out at the grey platform sliding by. “Cosy,” she said, though she knew it was a letter short. He grinned anyway.",
        "It was “hygge,” as it turned out, and they argued about spelling it all the way to the river. His name was Tomas. He took the train because the walk to his bakery was too long, and the bakery, he admitted, was why his thermos smelled of cinnamon.",
        "On Friday there were two thermoses on the seat between them. One was his. The other, wrapped in a napkin, held hot chocolate and a note in careful handwriting: “Seven across was never really the point.”",
        "Mira still takes the 7:42. Some mornings they do the crossword, and some mornings they just watch the river, shoulder to shoulder, saying nothing at all. It turns out that a very good silence is also a way of talking."
      ],
      quote: { text: "The course of true love never did run smooth.", by: "William Shakespeare, A Midsummer Night's Dream" } },
    { id: "cardamom", genre: "romance", title: "Two Cups of Cardamom Tea", short: "Cardamom Tea", color: "#b5683f",
      pages: [
        "Layla opened the little tea stall at dawn, when the street still smelled of rain on stone. She boiled the water with cardamom and a cinnamon stick, just as her grandmother had, and set out two cups, always two, out of old habit.",
        "A traveller named Idris stopped on the first cold morning of autumn. He had walked all night, and his hands were shaking around the cup. “What is in this?” he asked. “Patience,” Layla said. “And a bit of sugar, so it forgives you.”",
        "He came back the next day, and the next. He never ordered anything but the tea. He drew in a small notebook while he drank, and Layla pretended not to look, until one morning he turned it round. It was her, laughing, with steam in her hair.",
        "“I can't pay you in words,” he said. “I'm not good at words.” Layla poured the second cup, the one she had set out for years and never used, and slid it across the counter. “Then stay and drink this one. It was always yours.”",
        "The stall has two stools now, and a small sign in his handwriting: “Tea, sugar, and patience.” People come from other streets to try it. They say it tastes like home, which is exactly what it was always meant to taste like."
      ],
      quote: { text: "There is no charm equal to tenderness of heart.", by: "Jane Austen, Emma" } },
    { id: "lighthouse", genre: "romance", title: "The Lighthouse Letters", short: "Lighthouse Letters", color: "#4f6a7a",
      pages: [
        "The new lighthouse keeper found the first letter tucked inside the lamp room's logbook. It was written in blue ink and began, “To whoever tends the light after me. I hope you like the sea. It will be your only conversation.”",
        "He wrote back that night, a little shyly, on the back of a weather chart. He described the storm petrels, the burnt toast, and the way the lamp turned the fog to gold. He left it under the logbook and, honestly, did not expect a reply.",
        "The reply came with the supply boat. The last keeper, Ines, had moved to the mainland to teach, and she missed the light terribly. She sent him recipes for fish stew, a pressed sea-lavender, and a long list of the lamp's small and stubborn moods.",
        "All winter they wrote. She learned the names of his gulls, and he learned that she sang when she cleaned brass. The letters grew longer, then warmer, and the supply boat started arriving with a thick envelope that was just for him.",
        "In spring, the boat carried a passenger. Ines stepped onto the rock holding a suitcase and a small jar of sea-lavender. “I came to check on the lamp,” she said. He smiled, and every window of the tower caught the sunrise at once."
      ],
      quote: { text: "Whatever our souls are made of, his and mine are the same.", by: "Emily Brontë, Wuthering Heights" } },
    { id: "kitchen", genre: "romance", title: "Dancing in the Kitchen", short: "Dancing in the Kitchen", color: "#c0692f",
      pages: [
        "Ruth and Henry had been married forty years when the power went out on the coldest night of November. “Well,” said Henry, lighting a candle. “I suppose dinner is bread, cheese and conversation.” Ruth laughed. They had not had that in a while.",
        "They ate by the stove, wrapped in the old plaid blanket. The radio was dead, so Henry hummed a song from their first dance, slightly off-key, the way he had always hummed it, and Ruth said nothing, because nothing needed correcting.",
        "“You still remember it,” she said. “Every step,” he said, which was not quite true, but he stood up anyway and held out one hand, a little stiff in the knees. The kitchen floor was cold, and the candle threw their shadows against the wall.",
        "They danced slowly, in a circle the size of a rug. Ruth rested her head on his shoulder, which still smelled of woodsmoke and soap. Outside, the whole street was dark, and somehow it was the brightest evening in years.",
        "When the lights came back on, neither of them reached for the switch. The candle burned down by itself. Love is not always a big thing. Sometimes it is a hand held out in the dark, and a kitchen that is just big enough."
      ],
      quote: { text: "Hope is the thing with feathers that perches in the soul.", by: "Emily Dickinson" } },
    /* ---------------- cozy horror ---------------- */
    { id: "scarecrow", genre: "horror", title: "The Scarecrow Who Waved", short: "The Scarecrow Waved", color: "#6a5a3a",
      pages: [
        "The farm had a scarecrow, and it had never once waved. So when Ana looked out of the kitchen window one October dusk and saw a straw hand lift slowly in the wind, she set down her spoon and did not move for a very long minute.",
        "The next evening it waved again. Then, a little later, it tilted its sack-cloth head toward the barn. The wind, she told herself, was only wind. But the wind did not usually smell of apples, and it was not usually that polite.",
        "At the third dusk she took a lantern and walked to the field, her heart knocking like a shutter. The scarecrow stood still. Its button eyes were sewn on crooked, and in its sleeve a very small, very frightened barn owl was sitting.",
        "The owl had been hiding in the straw from the night hunters, and the scarecrow's sleeve swayed in the wind and had been flapping it quietly all week, keeping it warm. Ana laughed so hard that she had to sit down in the cold grass.",
        "She hung a little scarf on the scarecrow that night, and left a bowl of seed at its feet. Every dusk now the old straw hand still moves, and Ana waves back. Some things in the dark are not ghosts at all. They are only looking for a friend."
      ],
      quote: { text: "Deep into that darkness peering, long I stood there wondering, fearing.", by: "Edgar Allan Poe, The Raven" } },
    { id: "attic", genre: "horror", title: "Footsteps in the Attic", short: "Footsteps in the Attic", color: "#4a3f5a",
      pages: [
        "The footsteps began on a Tuesday, just after the clocks went back. Pat, pat, pat, a light and careful walk across the attic floor, always at nine. Mabel put down her book, looked at the ceiling, and said politely, “I know you're there.”",
        "The house was her grandmother's, and it had creaked in a friendly way for years. But this was different. The steps stopped above the stairs, waited, and then went back, as if someone upstairs were pacing out an unsolved problem.",
        "On Thursday she finally climbed the ladder with a torch and a large mug of cocoa, because courage tastes better warm. The attic smelled of dust and lavender. In the corner sat an old music box, its little key turning all by itself.",
        "It played three slow notes, then stopped. Mabel knelt beside it and found a ribbon stuck in the gears. It was her grandmother's, and when she pulled it free the music box sang the whole song, the same one she had hummed over Mabel's cradle.",
        "The footsteps never came back. But every night at nine, from somewhere above, Mabel hears a soft little melody, and the whole house feels as if it is smiling. Some houses keep the people they love. They only need to be asked kindly."
      ],
      quote: { text: "Those who dream by day are cognizant of many things which escape those who dream only by night.", by: "Edgar Allan Poe, Eleonora" } },
    { id: "fog", genre: "horror", title: "The Fog at Willow Lane", short: "Fog at Willow Lane", color: "#5a6a6a",
      pages: [
        "The fog came to Willow Lane every year on the last night of October, slow and silver, swallowing the lampposts one by one. The old people closed their shutters. The cats came in. Only Wren, who was nine and curious, kept her window open.",
        "Out of the grey came a soft jingle, like a tiny bell. Then a shape: a lantern, floating, and behind it a tall figure in a long coat who never quite came into focus. “Lost,” the figure said, in a voice like a page being turned.",
        "Wren was frightened, but she was also well brought-up. “Where are you trying to go?” she asked. “Home,” said the figure. “But the lane keeps changing.” Wren thought hard, then fetched her red scarf and tied it to her gate.",
        "“Follow the red,” she said. The figure bowed, slowly, and the lantern drifted down the lane, past one gate, two gates, three. At the very end, where the willows bent over the old well, the fog opened like a curtain, and the figure was gone.",
        "In the morning, there was a single silver coin on the scarf, and the lane was bright and ordinary. Wren keeps the coin in her pocket. Each October she hangs the scarf again, in case somebody else has lost the way home."
      ],
      quote: { text: "The oldest and strongest emotion of mankind is fear.", by: "H. P. Lovecraft" } },
    { id: "knitting", genre: "horror", title: "The Knitting Ghost", short: "The Knitting Ghost", color: "#7a5a7a",
      pages: [
        "Every night the flat above the bakery was visited by a clicking. Click-click, click-click, soft and steady, from the corner chair. Odette, the new tenant, pulled the covers to her chin and whispered, “Whoever you are, please stop. I have an early shift.”",
        "The clicking stopped, and in the silence something tiny dropped to the floor. In the morning she found a ball of green wool by the chair and, beside it, half a scarf, perfectly knitted, with a note: “Sorry. Habit. The last tenant was always cold.”",
        "Odette didn't know whether to scream or laugh, so she did something in between. That evening she left a cup of tea on the arm of the chair, and a small card. “I'm Odette. I like the colour green. Please keep going, but a little more quietly?”",
        "The clicking grew softer, like rain on a window. Night after night the scarf grew longer. Odette fell asleep to it as other people fall asleep to music. She started leaving biscuits too, and sometimes, in the morning, a biscuit was missing a bite.",
        "At midwinter the scarf was finished. It was warm, green and just her size. It lay across her pillow with a note: “Now I can rest. Thank you for the tea.” The chair never clicked again, but Odette still wears the scarf, and she is never cold."
      ],
      quote: { text: "It was a dark and stormy night.", by: "Edward Bulwer-Lytton, Paul Clifford" } },
    /* ---------------- fiction ---------------- */
    { id: "mailbox", genre: "fiction", title: "The Moon's Mailbox", short: "The Moon's Mailbox", color: "#3a5a7a",
      pages: [
        "At the edge of the village stood an old blue mailbox that nobody used. But Pia, who was small and fond of secrets, noticed that on clear nights its little door glowed faintly silver, as if something inside were awake.",
        "One evening she folded a note and slipped it in. “Dear Moon, are you ever lonely up there?” The door clicked shut. She went home, ate her soup, and did not expect anything at all. That is usually when the best things happen.",
        "In the morning there was an envelope on her windowsill, dusted with something like pearl. In thin, curly handwriting it said: “Sometimes. But then I see lamps in windows, and I remember that someone is always looking up.”",
        "They wrote all autumn. The Moon told Pia about the tides, who pulled them, and the sleepy sailors who waved at her. Pia wrote about school, her cat, and the pears that fell on the roof. It was the nicest sort of friendship, the kind with distance.",
        "On the longest night of the year, Pia went out to the mailbox and left only a drawing of a lamp in a window. The Moon rose a little brighter than usual, and the whole village slept under a silver blanket, and Pia was not lonely at all."
      ],
      quote: { text: "Second to the right, and straight on till morning.", by: "J. M. Barrie, Peter Pan" } },
    { id: "dragon", genre: "fiction", title: "A Dragon Called Pepper", short: "A Dragon Called Pepper", color: "#a3432c",
      pages: [
        "Pepper was a dragon, but a very small one, about the size of a teapot. She was ashamed of it. All the grand dragons breathed fire that could melt castles, and Pepper's flame was no bigger than a birthday candle. So she hid in a village bakery.",
        "The baker, a round, patient man named Osric, found her asleep in his flour bin. He did not scream. He just said, “Ah. Another early riser,” and handed her a warm roll. Pepper decided, on the spot, that she liked this place very much.",
        "That winter, the bakery's great oven broke, and the snow came down thick as wool. The villagers had no bread, and the big dragons were far away, being impressive somewhere else. Pepper took a deep breath, trembling, and lit the oven.",
        "Her little flame was not wild or loud, but it was steady, and steady is exactly what a loaf of bread needs. She sat by the oven all night, turning slowly, and by dawn the whole village smelled of warm loaves and cinnamon buns.",
        "Now there is a small stool by the oven with a cushion on it, and a sign: “Pepper, head baker.” The mighty dragons still melt castles. But nobody in the village has ever been so grateful for a fire as they are for hers."
      ],
      quote: { text: "Curiouser and curiouser!", by: "Lewis Carroll, Alice's Adventures in Wonderland" } },
    { id: "teapot", genre: "fiction", title: "The Map in the Teapot", short: "Map in the Teapot", color: "#7a6a3a",
      pages: [
        "When Hattie inherited her great-aunt's cottage, she inherited eleven teapots too. She was washing the twelfth, a tall brown one with a chipped spout, when a tightly rolled piece of paper slid out and unrolled on the counter.",
        "It was a map, drawn in faded ink: the cottage, the garden, the old oak, and a dotted line that wandered through the orchard to a small red X. Beneath it, in her great-aunt's tidy hand: “For whoever is brave enough to look.”",
        "Hattie put on her boots. The dotted line led her over a stile, through a gap in the hedge she had never noticed, and down a path covered in golden leaves. Every thirty steps there was a tiny painted acorn on a tree, pointing the way.",
        "The X was beneath the biggest pear tree. She dug with a garden trowel, and soon it clinked on a tin box. Inside lay a handful of seeds, a pair of knitted gloves, and a letter: “The treasure is the garden. Plant it, and you will understand.”",
        "She planted the seeds that evening in neat, wondering rows. By next summer the garden was a riot of colour, and Hattie, who had arrived at the cottage as a stranger, knew every flower by name. It was, she thought, the best treasure map ever drawn."
      ],
      quote: { text: "There's no place like home.", by: "L. Frank Baum, The Wonderful Wizard of Oz" } },
    { id: "garden", genre: "fiction", title: "The Garden at the End of the Stairs", short: "The Hidden Garden", color: "#5e7a4a",
      pages: [
        "Behind the library's last shelf there was a narrow stair that nobody used. Noor found it on a rainy Thursday, while looking for a book on moths. It smelled of earth, which is not a smell that stairs usually have.",
        "At the bottom was a round green door, half hidden by ivy. She pushed it open and stepped out into a garden: warm, golden, humming with bees, though upstairs it was raining and nearly dark. A kettle was whistling somewhere among the roses.",
        "An old woman in a straw hat looked up from the herb beds. “Ah, you found it,” she said. “I've been keeping the afternoon warm for you.” Noor never found out how she knew, but she sat down on the bench and accepted a cup of mint tea.",
        "She stayed until the light turned amber. The woman taught her which plants calm the mind, and which only look as if they do, and how to listen to soil. “Every library,” she said, “keeps a garden for people who need to rest.”",
        "When Noor climbed the stairs again, it was evening and the rain had stopped. She has gone back many times since. Sometimes the door is there, and sometimes it isn't. But she always leaves a small gift of tea on the top step, just in case."
      ],
      quote: { text: "There is nothing—absolutely nothing—half so much worth doing as simply messing about in boats.", by: "Kenneth Grahame, The Wind in the Willows" } },
    /* ---------------- science facts ---------------- */
    { id: "oldbooks", genre: "facts", title: "Why Old Books Smell Sweet", short: "Old Book Smell", color: "#a3743a",
      pages: [
        "Open an old book and bring it close to your nose. That sweet, warm, slightly vanilla smell is not an accident. It is the sound of a book slowly changing, and it is a perfectly real chemical story written in the air.",
        "Paper is mostly cellulose, with a binding material called lignin, which is also what makes wood strong. Over decades, lignin and cellulose slowly break down, and that gentle decay releases small amounts of gases into the air around the pages.",
        "One of them is vanillin, the very same compound that gives vanilla its scent. Others add notes of almond, a little grass, and a hint of coffee. Conservators can read the mix like a perfume, because different papers age in different ways.",
        "Newer, cheaper paper contains more lignin and breaks down faster, so a flimsy old paperback can smell very sweet, and turn yellow and brittle at the same time. Older rag paper lasts much longer, and smells softer and quieter.",
        "So the smell of a library is the scent of time, passing slowly, one page at a time. It is also why some people say a book is “alive.” Chemically speaking, they are very slowly, and very beautifully, turning into air."
      ],
      quote: { text: "In all things of nature there is something of the marvelous.", by: "Aristotle" } },
    { id: "trees", genre: "facts", title: "The Secret Life of Trees", short: "Secret Life of Trees", color: "#4f6f4a",
      pages: [
        "Walk into a quiet forest, and it seems like each tree is standing alone. But under your feet, there is a hidden world. Thin white threads of fungus wind through the soil, wrapped around the roots of nearly every tree you can see.",
        "These fungi are called mycorrhizae. They trade a good deal with the trees: the fungus gathers water and minerals from the soil, and the tree pays for it with sugars it makes in its leaves. It is one of the oldest partnerships on land.",
        "Scientists have found that some of these threads can link many trees together, and that sugars and chemical signals can pass along them. How much that matters in a real forest is still being debated, and it is an active, exciting question.",
        "Trees also talk through the air. A tree being nibbled by insects can release chemicals that its neighbours detect, and some neighbours respond by making their own leaves less tasty. Nobody is chatting, but information is certainly flowing.",
        "So the next time you sit under a tree, remember that you are visiting a very old community, busy and cooperative, and mostly silent. Quiet, as it turns out, is not the same thing as nothing happening."
      ],
      quote: { text: "The universe is wider than our views of it.", by: "Henry David Thoreau, Walden" } },
    { id: "hotdrink", genre: "facts", title: "The Science of a Hot Drink", short: "Science of a Hot Drink", color: "#c0692f",
      pages: [
        "Pour hot water into a cup and watch the steam curl up. Here is a surprise: steam itself, strictly speaking, is invisible. What you see above your mug is a cloud of tiny water droplets, formed when warm vapour meets cooler air and condenses.",
        "Close your eyes and pour. Notice how the pitch of the sound rises as the cup fills? The air column above the water gets shorter, and a shorter column vibrates faster. You can actually hear the cup getting fuller, like a slow, quiet instrument.",
        "Why does a hot drink cool down? Mostly because of evaporation. The fastest-moving water molecules escape from the surface, taking a lot of heat with them. That is why blowing across your tea helps: it carries the escaping vapour away.",
        "A little milk or sugar changes things too. Stir the spoon in, and you make tiny currents that mix the hot liquid from the bottom with the cooler layer on top. A lid does the opposite, trapping heat and vapour so the drink stays warm longer.",
        "Even the cosy feeling has a bit of science to it. Warmth in your hands tells your brain that you are safe and comfortable. A hot drink, it seems, is a small experiment you are allowed to enjoy, and to finish."
      ],
      quote: { text: "Nothing in life is to be feared, it is only to be understood.", by: "Marie Curie" } },
    { id: "candlephys", genre: "facts", title: "A Candle's Quiet Physics", short: "Candle Physics", color: "#d98a3a",
      pages: [
        "A candle looks simple, but it is a small machine. The flame does not burn the wax directly. First the heat melts the wax near the wick. Then the liquid wax climbs up the wick, the way water climbs a paper towel. This is called capillary action.",
        "At the top of the wick, the heat turns the liquid wax into vapour, and it is the vapour that burns. That is why a candle keeps its shape: the flame feeds on a steady, gentle stream of gas, and not on a solid lump of wax.",
        "The yellow glow comes from tiny particles of carbon, called soot, heated until they shine. Near the bottom, where there is more oxygen and less soot, the flame turns a faint blue. The same fire, in different moods.",
        "The flame is tall and teardrop-shaped because hot air rises, pulling fresh air in at the bottom. On the International Space Station, where there is almost no gravity to make the air rise, a candle burns in a small, round, blue ball.",
        "So when you light a candle tonight, you are watching melting, climbing, vapour and glowing light, all working together. It is one of the oldest sciences in the world, and it is still beautiful, even if you know exactly how it works."
      ],
      quote: { text: "Chance favours only the prepared mind.", by: "Louis Pasteur" } }
  ];
  more.forEach(function (s) { if (!STORIES.some(function (t) { return t.id === s.id; })) STORIES.push(s); });
})();
