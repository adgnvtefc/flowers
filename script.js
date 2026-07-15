// Four flower configs for the front page. Each blooms in, holds, then the
// next one blooms. They're normalized below to one fixed canvas so the
// display never changes size as they rotate.
const flowerArt = [
    "        __   __      \n     .-(  '.'  )-.   \n    (   \\  |  /   )  \n   ( `'-.;;;;;.-'` ) \n  ( :-==;;;;;;;==-: )\n   (  .-';;;;;'-.  ) \n    (`  /  |  \\  `)  \n     '-(__.'.__)-'   ",
    "         .-==-.\n        /{.=-.}\\\n       | / .  \\ |\n       |;   :  :|\n       \\(   :  )/\n        `._'__.'\n      |\\   ||\n      \\ \\  ||\n       | | ||\n       | | ||   /|\n       \\  \\||  / /\n        \\ ||| | |\n         | || | |\n          \\||/  /\n           ||| /\n           || |\n           ||/\n           ||\n^^^^^^^^^^^^^^^^^^^^^^",
    "      _.-.       \n    -'    '      .-'-.\n  .',      '    '     '\n  ', `,     .  '.-.   '\n   '   \\    ' .\"   \".'\n    '.' \\   ;.\",    \"-._\n     '   '. ,\"  \"-.\"    '.\n      _.--'.    .\" ,.--.  .\n   , '     \"-..\".-'     \\ '\n -`     _.''\".    ' .    '\n'     -'   \"  '-     '.\n'    '    \"     '      '\n '.'     \"       '    .'\n   ',    \"        ' .'\n         \"        ,'\n         \"\n         \"\n       _.\"._",
    "             .-.'  '.-.\n          .-(   \\  /   )-.\n         /   '..oOOo..'   \\\n ,       \\.--.oOOOOOOo.--./\n |\\  ,   (   :oOOOOOOo:   )\n_\\.\\/|   /'--'oOOOOOOo'--'\\\n'-.. ;/| \\   .''oOOo''.   /\n.--`'. :/|'-(   /  \\   )-'\n '--. `. / //'-'.__.'-;\n   `'-,_';//      ,  /|\n        '((       |\\/./_\n          \\\\  . |\\; ..-'\n           \\\\ |\\: .'`--.\n            \\\\, .' .--'\n             ))'_,-'`\n            //-'\n           // \n          //\n         |/"
];

const heartFrames = [
    "                 \n                 \n                 \n                 \n                 \n                 \n                 \n      . .        \n       v         ",
    "                 \n                 \n                 \n                 \n    .-. .-.      \n    \\     /      \n     \\   /       \n      \\ /        \n       v         ",
    "                 \n                 \n  _.-.   .-._    \n.'           '.  \n|             |  \n \\           /   \n  '.       .'    \n    '-._.-'      \n       v         ",
    "                 \n _..._   _..._   \n.'    '\"'    '.  \n|             |  \n \\           /   \n  '.       .'    \n    '-. .-'      \n      \\ /        \n       v         "
];

const maxHeartFrame = heartFrames.length - 1;

// The heart (page 2) ping-pongs through its frames so it appears to bloom.
let heart = { frame: 0, direction: 1, delay: 0 };

const sunAsciiElement = document.getElementById('sun-ascii');
const heartAsciiElement = document.getElementById('heart-ascii');

// Normalize every flower config to one fixed canvas (the max width/height across
// all of them), centered, so the <pre> box stays EXACTLY the same size as the
// flowers rotate — no resizing, no layout jump.
const flowerFrames = (() => {
    const blocks = flowerArt.map(a => a.split('\n'));
    const maxW = Math.max(...blocks.flat().map(l => l.length));
    const maxH = Math.max(...blocks.map(b => b.length));
    const blank = ' '.repeat(maxW);
    return blocks.map(lines => {
        // Center the art as a whole BLOCK (shift every line by the same amount)
        // so its internal alignment — flower over stem over ground — is preserved.
        const blockW = Math.max(...lines.map(l => l.length));
        const left = ' '.repeat(Math.floor((maxW - blockW) / 2));
        const padded = lines.map(l => (left + l).padEnd(maxW));
        const top = Math.floor((maxH - padded.length) / 2);
        const bottom = maxH - padded.length - top;
        return Array(top).fill(blank).concat(padded, Array(bottom).fill(blank)).join('\n');
    });
})();

// Rotate the flowers: bloom one in, hold it a beat, then bloom the next.
let flowerIdx = 0;
function bloomNextFlower() {
    sunAsciiElement.textContent = flowerFrames[flowerIdx];
    sunAsciiElement.classList.remove('bloom');
    void sunAsciiElement.offsetWidth; // force reflow so the CSS bloom replays
    sunAsciiElement.classList.add('bloom');
    flowerIdx = (flowerIdx + 1) % flowerFrames.length;
}
bloomNextFlower();
setInterval(bloomNextFlower, 1500); // ~0.9s bloom + ~1.5s hold

// Advance one frame, pausing briefly at the fully-open and fully-closed ends.
function tick(e, maxFrame, pauseOpen, pauseClosed) {
    if (e.delay > 0) {
        e.delay--;
        return;
    }
    e.frame += e.direction;
    if (e.frame >= maxFrame) {
        e.frame = maxFrame;
        e.direction = -1;
        e.delay = pauseOpen;
    } else if (e.frame <= 0) {
        e.frame = 0;
        e.direction = 1;
        e.delay = pauseClosed;
    }
}

let currentPage = 0;

function animate() {
    // Page 1's flowers are driven by bloomNextFlower(); here we just animate the
    // heart on page 2.
    if (currentPage === 1) {
        heartAsciiElement.textContent = heartFrames[heart.frame];
        tick(heart, maxHeartFrame, 8, 4);
    }
    setTimeout(animate, 200);
}

// A flower photo paired with its caption — the two always travel together.
const flowerPics = [
    { src: 'for_u/IMG_0306.jpg', caption: "Roses are red, violets are blue, all these flowers are just 4 uuu" },
    { src: 'for_u/IMG_2090.jpg', caption: "You are my blossoming peace" },
    { src: 'for_u/IMG_4513.jpg', caption: "I'd say you are the flower of my heart, but truthfully you put any and every flower to shame with your beauty" },
    { src: 'for_u/IMG_4577.jpg', caption: "I will sow fields of blossoms in your honor mwehehehehe" },
    { src: 'for_u/IMG_5197.jpg', caption: "I remember u said white daffodil reminds u of me. Well here I am. Can't get rid of me RAHHH" },
    { src: 'for_u/IMG_5845.jpg', caption: "A little sun, for your enjoyment m'lady" },
    { src: 'for_u/IMG_8877.jpg', caption: "I think this flower's glow reminds me a bit of the yellow at sunset -- i love you" },
    { src: 'for_u/IMG_8879.jpg', caption: "This flower would make a wonderful mace. You should whack ur enemeies with it" },
    { src: 'for_u/IMG_8889.jpg', caption: "yummm mango flower hehehe let us eat many sugaries together hehe" },
    { src: 'for_u/IMG_8910.jpg', caption: "Fiery and fabulous, just like my love -- u go show 'em who's boss" },
    { src: 'for_u/IMG_1668.jpg', caption: "A little brave, unyielding succulent for my brave unyielding girl :D" }
];

const flowerCard = document.getElementById('flowerCard');
const flowerImg = document.getElementById('flowerImg');
const flowerCaption = document.getElementById('flowerCaption');
let lastFlower = -1;

function randomizeFlower() {
    let i;
    do {
        i = Math.floor(Math.random() * flowerPics.length);
    } while (i === lastFlower && flowerPics.length > 1); // avoid repeating the same one
    lastFlower = i;

    const pick = flowerPics[i];
    flowerImg.src = pick.src;
    flowerCaption.textContent = pick.caption;

    // Restart the fade-in so the new pair animates in every time.
    flowerCard.classList.remove('fade-in-combo');
    void flowerCard.offsetWidth; // force reflow to replay the animation
    flowerCard.classList.add('fade-in-combo');
}

document.getElementById('randomizeBtn').addEventListener('click', randomizeFlower);

// Memory lane (page 6) — photos shown in order, advanced with the "next" button.
// translation/notes are intentionally blank; fill them in per entry below.
const memories = [
    { src: 'memories/day1.jpeg', header: 'Day 1', translation: 'An inch of time, an inch of gold', notes: 'the very first hehe' },
    { src: 'memories/day2.jpeg', header: 'Day 2', translation: 'An inch of gold can hardly buy back a bit of time with you', notes: 'for you' },
    { src: 'memories/day3.jpeg', header: 'Day 3', translation: 'Day by day, year by year', notes: 'Tree tunnel! I still say this line hehe.' },
    { src: 'memories/day4.jpeg', header: 'Day 4', translation: 'My home forever welcomes you', notes: 'Our home.' },
    { src: 'memories/day5pt1.jpeg', header: 'Day 5, pt 1', translation: 'Some days are hard', notes: 'omggg our first multi-part snap!!' },
    { src: 'memories/day5pt2.jpeg', header: 'Day 5, pt 2', translation: 'i love you forever', notes: 'and eternity <3' },
    { src: 'memories/day6.jpeg', header: 'Day 6', translation: 'I hope you are loved by this world', notes: '(you are)' },
    { src: 'memories/day7.jpeg', header: 'Day 7', translation: 'I hope that in fifty years, you are still next to me, sitting with you in the rocking chair enjoying the warmth of the setting sun', notes: 'you know this song by now! and also my first multi color sun hehe' },
    { src: 'memories/day8.jpeg', header: 'Day 8', translation: 'I miss youu', notes: 'the first time i drew this kitty style!' },
    { src: 'memories/day9.jpeg', header: 'Day 9', translation: 'Isnt this what we call forever?', notes: 'i want to grow old with you' },
    { src: 'memories/day10.jpeg', header: 'Day 10', translation: 'Im still looking for what it means to love', notes: 'and i still am... thank you for your patience' },
    { src: 'memories/day11pt1.jpeg', header: 'Day 11, pt 1', translation: 'a star, a dream', notes: 'very many comingg' },
    { src: 'memories/day11pt2.jpeg', header: 'Day 11, pt 2', translation: 'twinking twinkle little star, you are my star', notes: 'autocomplete keeps trying to make me write gibberish. booooo. these are all handwritten ofc' },
    { src: 'memories/day11pt3.jpeg', header: 'Day 11, pt 3', translation: 'Here, I caught a star for you. make a wish. i love you', notes: 'forever my star. i remember taking a while to set up the lighting for this hehe' },
    { src: 'memories/day11pt4.jpeg', header: 'Day 11, pt 4', translation: 'love you till the edge of the world', notes: 'pic inspired by traditional chinsee fairy tale' },
    { src: 'memories/day12pt1.jpeg', header: 'Day 12, pt 1', translation: 'what im waitinf for isnt the snow', notes: 'hehe another multi parter' },
    { src: 'memories/day12pt2.jpeg', header: 'Day 12, pt 2', translation: 'but the winter with you', notes: 'and we diddd have a winter together... and sm more to comeee' },
    { src: 'memories/day13pt1.jpeg', header: 'Day 13, pt 1', translation: 'what im waiting for isnt the moon', notes: 'a continuation of yesterdays lyrics' },
    { src: 'memories/day13pt2.jpeg', header: 'Day 13, pt 2', translation: 'but my meeting with you', notes: 'the moon is often used as a symbol of longing. i miss you.' },
    { src: 'memories/day14pt1.jpeg', header: 'Day 14, pt 1', translation: 'im waiting for the skies to be filled with fireworks', notes: 'inspired by fourth of july' },
    { src: 'memories/day14pt2.jpeg', header: 'Day 14, pt 2', translation: 'i can always lean on your left shoulder', notes: 'or in most of our cases, your right hehe' },
    { src: 'memories/day14pt3.jpeg', header: 'Day 14, pt 3', translation: 'what im looking for isnt sorry, but forever', notes: 'you are not a burden. i love you forever.' },
    { src: 'memories/day15.jpeg', header: 'Day 15', translation: 'the little parts of life are beautiful', notes: 'a compilation of the little things ive figured out how to draw' },
    { src: 'memories/day16.jpeg', header: 'Day 16', translation: 'the world is so big, where do you want to go?', notes: 'i know, everywhere, and we will, together. (also, this drawing was before you told me about changing brush size hehe)' },
    { src: 'memories/day17.jpeg', header: 'Day 17', translation: 'lets find tomorrow together', notes: 'opening a protal to uuu' },
    { src: 'memories/day18.jpeg', header: 'Day 18', translation: 'in a moment there are a million possibilities', notes: 'i remember drawing this while editing my paper on the seattle rooftop' },
    { src: 'memories/day19pt1.jpeg', header: 'Day 19, pt 1', translation: 'love who i love', notes: 'YOU' },
    { src: 'memories/day19pt2.jpeg', header: 'Day 19, pt 2', translation: 'no regrets, no complaints', notes: 'NEVER' },
    { src: 'memories/day20pt1.jpeg', header: 'Day 20, pt 1', translation: 'a sprig of haw, standing proudly in the snow', notes: 'continuation of yesterdays, you should stand proud, because you are AMAZING' },
    { src: 'memories/day20pt2.jpeg', header: 'Day 20, pt 2', translation: 'only blooming for one', notes: 'i bloom for you' },
    { src: 'memories/day21.jpeg', header: 'Day 21', translation: 'thank you', notes: 'for everything' },
    { src: 'memories/day22.jpeg', header: 'Day 22', translation: 'to the edges of the sky and corners of the sea', notes: 'the world is our oyster' },
    { src: 'memories/day23.jpeg', header: 'Day 23', translation: 'that day, you and me, at the edges of the mountains, singing yesteryears song, those memories, are enough, for me to miss you every day', notes: 'my first mountainsss' },
    { src: 'memories/day24.jpeg', header: 'Day 24', translation: 'even if you go to the edges of the world, i will find you', notes: 'you are not getting rid of me mwa hahaha' },
    { src: 'memories/day25.jpeg', header: 'Day 25', translation: 'missing you', notes: 'this is the first day my parents were here and we took a hike' },
    { src: 'memories/day26.jpeg', header: 'Day 26', translation: 'the future', notes: 'inspired by our drive to olympic' },
    { src: 'memories/day27pt1.jpeg', header: 'Day 27, pt 1', translation: 'i hope that we can walk with each other until our hairs turn white', notes: 'forever and ever' },
    { src: 'memories/day27pt2.jpeg', header: 'Day 27, pt 2', translation: 'the love that perseverses no matter will never change', notes: 'i love you' },
    { src: 'memories/day28.jpeg', header: 'Day 28', translation: 'all my life, i love you, a million, a hundred million, infinity', notes: 'i have always loved you, in case you couldnt tell hehe' },
    { src: 'memories/day29-32.jpeg', header: 'Day 29 - 32', translation: 'SEATTLE', notes: 'RAHHHH SO MUCH FUN I LOVE YOU' },
    { src: 'memories/day33.jpeg', header: 'Day 33', translation: 'giving you the courage to face tomorrow', notes: 'THE MARSHMALLOW CA CAWWWW' },
    { src: 'memories/day34.jpeg', header: 'Day 34', translation: 'I bear witness to you', notes: 'you are loved, you are valued, i see what you are doing and it is soooo amazing' },
    { src: 'memories/day35.jpeg', header: 'Day 35', translation: 'lets fly into the starry sky, spend a lifetime with you', notes: 'inspired by the clouds we saw in seattle hehe' },
    { src: 'memories/day36.jpeg', header: 'Day 36', translation: 'Everything is wind, except my love for you', notes: 'this was the night we were watching kpop demon hunters and were so rudely interrupted by the horrific many-legged bug' },
    { src: 'memories/day37.jpeg', header: 'Day 37', translation: 'my best friend', notes: 'a lot more than that now, but forever my best friend as well. this was the first night i remember you falling asleep on call, and the day my parents left pittsburgh' },
    { src: 'memories/day38.jpeg', header: 'Day 38', translation: 'iloveyouiloveyouiloveyou', notes: 'our happy plants :D i attended cmu orientation the next day' },
    { src: 'memories/day39.jpeg', header: 'Day 39', translation: 'you are this special to me', notes: 'saw this flower in olympic. i dont think i captured it that well, but ta-da!! we planned labor day on this day hehe' },
    { src: 'memories/day40.jpeg', header: 'Day 40', translation: 'for a lifetime', notes: 'i promise.' },
    { src: 'memories/day41.jpeg', header: 'Day 41', translation: 'im sorry', notes: 'this was the day we got the porter robinson tickets, and im not sure what i was apologizing for. i think i might have been overly clingy and triggered a whole cascade of sad. its quite an uncreative way to apologize, im sorry. ill do better. but PORTER WOBINSON' },
    { src: 'memories/day42.jpeg', header: 'Day 42', translation: 'when I see you', notes: 'pure love oozing fr0m my veins hehe' },
    { src: 'memories/day43.jpeg', header: 'Day 43', translation: 'beautiful days always have you', notes: 'and that has never changed', aux: { src: 'memories/auxiliary1.jpeg', text: 'btw, this is the calendar day for this legendary screenshot. i was in a thai resto when you texted me this i remember hehe. i forgot if it was you or me that did the thing.' } },
    { src: 'memories/day44pt1.jpeg', header: 'Day 44, pt 1', translation: 'to cross mountains of knives and sea of flames', notes: 'a common chinese expression. quite a dramatic peoples we have here. this was the night where i went out with msaii people for the first (and also the last) time' },
    { src: 'memories/day44pt2.jpeg', header: 'Day 44, pt 2', translation: 'still will spend a lifetime with you', notes: 'no matter what. fun fact, while im typing this, the autocomplete feature in this code editor keeps trying to autocomplete my code. it works great sometimes when i am coding. i am not coding, so mostly it just spews bullshit. but when i was typing this, the autocomplete suggested \'hehe\'. i guess i did hehe a lot in here. hehe.' },
    { src: 'memories/day45.jpeg', header: 'Day 45', translation: 'lets see the ocean together (stupid autocomplete said: the purest love)', notes: 'we are seeing the ocean together!!! our first time since october 2024 i believe. i love you so much. but this autocomplete is actually hilarious. it says: [begin autocomplete segment] yours. this was the day we went thrift shopping and i bought a bunch of sweaters. then we went to target and i bought even more sweaters. i dont need that many sweaters. but i bought them. hehe. more coming soooon. [end autocompleted segment] wow. if i really sound like that, i am so sorry. but the one part it did get right... more coming soooon!' },
    { src: 'memories/day46.jpeg', header: 'Day 46', translation: 'Remember that I love you', notes: 'And if you forget, Ill give you a million reasons to remember, to know again. i cant promise there wont ever be a bad day again, but i promise there will be so so many good days to follow' },
    { src: 'memories/day47.jpeg', header: 'Day 47', translation: 'Yours; Im cominggg', notes: 'riding a cloud straight towards your heart, so close to seeing you. i remember the our joy at realizing expedition mina 2 was only two weeks away. as of this drawing, it was only two days away hehe' },
    { src: 'memories/day48.jpeg', header: 'Day 48', translation: 'i love you', notes: 'my first attempt at a blob ferg! If you wanna know why this one (and the previous and next one) are kinda basic, these are the first three days we feel asleep on call together hehe' },
    { src: 'memories/day49.jpeg', header: 'Day 49', translation: 'thank you', notes: 'for everything. i dont think you went to bed very happy on this day, but i was determined to make that up to you in the coming days.' },
    { src: 'memories/day50-52.jpeg', header: 'Day 50 - 52', translation: 'EXPEDITION MINA 2', notes: 'Labor day weekend, Karaoke, Gnocchi, Bars, Six Flags, Cloud Watching, late night drives, all with the love of my life' },
    { src: 'memories/day53.jpeg', header: 'Day 53', translation: 'next time, ill still go cloud watching with you', notes: 'inspired by the jellyfish and crab shaped cloud we saw over the lake (and then i had to call my dad to send us to the station and he met us outside right when we were pulling in and we switched cars and we zoomed). After this we went to the petrossian building and had the leaning tower of bingsu hehe' },
    { src: 'memories/day54.jpeg', header: 'Day 54', translation: 'dont worry, i am coming back', notes: 'and always will, until back is back home, and never go again' },
    { src: 'memories/day55.jpeg', header: 'Day 55', translation: 'for you', notes: 'in the tradition of flowers, the very first for you on snapchat. i love you. more coming sooon. ' },
    { src: 'memories/day56.jpeg', header: 'Day 56', translation: 'I say, I do', notes: 'dont mind the horrific looking dog-rat thing, what the hell is that' },
    { src: 'memories/day57.jpeg', header: 'Day 57', translation: 'I love you', notes: 'a generic flower, I forgot the context for it. But I LOVE YOU.' },
    { src: 'memories/day58.jpeg', header: 'Day 58', translation: 'What I say, you believe.', notes: 'I guess ive been saying that for a while. This was the day you taught me the eight-pointed star, i think. I remember it like it was yesterday. how time flew. this is making me REALLY sad for some reason. I miss you.' },
    { src: 'memories/day59pt1.jpeg', header: 'Day 59, pt 1', translation: 'i lovelovelovelovelovelovelovelove you', notes: 'i remember this one too, this was the day you drew a spider in your notebook.' },
    { src: 'memories/day59pt2.jpeg', header: 'Day 59, pt 2', translation: 'look, how far weve come?', notes: 'and even further noww' },
    { src: 'memories/day59pt3.jpeg', header: 'Day 59, pt 3', translation: 'in the future, how far do you want to go?', notes: 'onto infinity' },
    { src: 'memories/day60.jpeg', header: 'Day 60', translation: 'im sorry', notes: 'wow, i guess this was a rough week. im really really sad now and i was going to stop here but i cant. im so sorry. i love you so much. even back then when nothing was perfect, but strive even harder now to fix whats wrong. theres one more after this.' },
    { src: 'memories/day60bonus.jpeg', header: 'Bonus', translation: 'Flower', notes: 'because no sad, bebby no sad, bebby love 4ever' },
    { src: 'memories/day61.jpeg', header: 'Day 61', translation: 'i will find you', notes: 'that is both a threat (lovingly) and an inevitability (very lovingly)' },
    { src: 'memories/day62.jpeg', header: 'Day 62', translation: 'my art has a lot of room for improvement', notes: 'as seen', aux: { src: 'memories/auxiliary2.jpeg', text: 'here hehe' } },
    { src: 'memories/day63.jpeg', header: 'Day 63', translation: 'i love you', notes: 'omggg its the ferg sticker its from here ahhhh' },
    { src: 'memories/day64.jpeg', header: 'Day 64', translation: 'the world is so big, but i still met you', notes: 'me so lucky' },
    { src: 'memories/day65.jpeg', header: 'Day 65', translation: 'for you', notes: 'the flower of my heart hehe. i dont know why this one is so basic, but my love for you is anything but. more coming soooon :)' },
    { src: 'memories/day66.jpeg', header: 'Day 66', translation: 'smite all your problems!!', notes: 'RAHHHH (also prepare for my stick-figure-less-era (very short))' },
    { src: 'memories/day67.jpeg', header: 'Day 67', translation: 'A flower for you', notes: 'six sevennnn (sorry) (i love you)' },
    { src: 'memories/day68.jpeg', header: 'Day 68', translation: 'many lucky clouds blowing our way!', notes: 'take this as a blessing for your day ahead. i love you so much. you will do amazing.' },
    { src: 'memories/day69.jpeg', header: 'Day 69', translation: 'tomorrow :)', notes: 'hehe this was the day before providence 2', aux: { src: 'memories/auxiliary3.jpeg', text: 'you sent me this snap right before you got on this plane and my heart melted' } },
    { src: 'memories/day70-73.png', header: 'Day 70 - 73', translation: 'PROVIDENCE 2', notes: 'STATUE PARK SHACK SHACK PINK PANTHER PROVIDENCE COAL FIRED PIZZA SO MANY GOOD MEMORIES AHHH' },
    { src: 'memories/day74.jpeg', header: 'Day 74', translation: 'Us, together', notes: 'I love your sketchbook and i love you. Somehow I hallucinat-remembered "hanmo and anushkas skeptchbook" but its not on the actual book so its on here now wheee' },
    { src: 'memories/day75.jpeg', header: 'Day 75', translation: 'good morning, i love you', notes: 'all day, every day. more coming soon!!' },
    { src: 'memories/day76.jpeg', header: 'Day 76', translation: 'For you, super chicken 3000', notes: 'I honestly completely forgot about the context behind this. It looks it has coral. Maybe begg binc related? Idk, but i love you' },
    { src: 'memories/day77.jpeg', header: 'Day 77', translation: 'My sun', notes: 'rudimentary, but i still say it to this day' },
    { src: 'memories/day78.jpeg', header: 'Day 78', translation: 'i love you, a thousand a million', notes: 'a pink rose, in a style i havent done in a while, for you' },
    { src: 'memories/day79.jpeg', header: 'Day 79', translation: 'i love you', notes: 'rock on babyyyyy' },
    { src: 'memories/day80.jpeg', header: 'Day 80', translation: 'a lifetime of memories, a cup of wine', notes: 'enjoy the compeltely non-glassy wineglass hehe. ive def referenced this song before. but we have a lifetime of memories ahead of us hehe. more coming soon.' },
    { src: 'memories/day81.jpeg', header: 'Day 81', translation: 'i love you', notes: 'AVOCAT (i should sticker this)' },
    { src: 'memories/day82.jpeg', header: 'Day 82', translation: 'there are waves and waves of people of all sorts and types in this world, but in a corner theres always two people standing back to back', notes: 'thats us. i have your back, always. the sunset is so pretty hehe. but you are prettier' },
    { src: 'memories/day83.jpeg', header: 'Day 83', translation: 'i love you', notes: 'featuring cat and tank cat from battle cats wheee. This is oct 1st btw, so close to... hehehe' },
    { src: 'memories/day84.jpeg', header: 'Day 84', translation: 'i love you', notes: 'youre so beautiful when youre asleep but even moreso when youre awake hehe' },
    { src: 'memories/day85.jpeg', header: 'Day 85', translation: 'i love you', notes: 'wow sorry for the stupid repetitive chinese. but that is the truth of things. more flower for u sooon' },
    { src: 'memories/day86.jpeg', header: 'Day 86', translation: 'I love you', notes: 'OMG THIS WACKY ASS FERG STICKER I RMB' },
    { src: 'memories/day87.jpeg', header: 'Day 87', translation: 'I love you', notes: 'I LOVE THIS FERG STICKER DO U?? MUCH BETTER THAN THE LAST ONE' },
    { src: 'memories/day88.jpeg', header: 'Day 88', translation: 'I love you', notes: 'wow im so creative these days (love blast booooom mweh heh heh)' },
    { src: 'memories/day89.jpeg', header: 'Day 89', translation: 'I love you', notes: 'Hehe flower (tho lowk the arrangement looks kinda wack sorry abt that)' },
    { src: 'memories/day90.jpeg', header: 'Day 90', translation: 'I love you', notes: 'Our last drawing before expedition mina 3. it is inspired by its much more well-formed cousin', aux: { src: 'memories/auxiliary4.jpeg', text: 'here hehe' } },
    { src: 'memories/day91.jpeg', header: 'Day 91', translation: 'for my girlfriend', notes: 'RAHHH THE FIRST DAYYYY' },
    { src: 'memories/day92.jpeg', header: 'Day 92', translation: 'i love you', notes: 'as more than a friend... AS MY GIRLFRIEND I LOVE YOUU' },
    { src: 'memories/day93.jpeg', header: 'Day 93', translation: 'i love you very much', notes: 'i remember this ferg sticker hehe' },
    { src: 'memories/day94pt1.jpeg', header: 'Day 94, pt 1', translation: 'you + me for a lifetime', notes: 'always. this is the day i watched a movie about a couple who carved their name into a tree so i did the same thing for us hehe' },
    { src: 'memories/day94pt2.jpeg', header: 'Day 94, pt 2', translation: 'cat heart meow', notes: 'also the day i got my google team matching email hehe' },
    { src: 'memories/day95.jpeg', header: 'Day 95', translation: 'you bring sunshine to my life', notes: 'away from the rain, away from all, you are my love' }
];

// Where "i wanna see the new ones!!" jumps to — change this to the newest batch's photo.
const NEW_MEMORIES_SRC = 'memories/day91.jpeg';

const memoryCard = document.getElementById('memoryCard');
const memoryHeader = document.getElementById('memoryHeader');
const memoryImg = document.getElementById('memoryImg');
const memoryTranslation = document.getElementById('memoryTranslation');
const memoryNotes = document.getElementById('memoryNotes');
const memoryCommentInput = document.getElementById('memoryCommentInput');
const memoryCommentSend = document.getElementById('memoryCommentSend');
const memoryCommentStatus = document.getElementById('memoryCommentStatus');
let memoryIndex = -1;

function showMemory(i) {
    memoryIndex = ((i % memories.length) + memories.length) % memories.length; // wrap around
    const m = memories[memoryIndex];
    memoryHeader.textContent = m.header;
    memoryImg.src = m.src;
    memoryTranslation.textContent = m.translation;
    memoryNotes.textContent = m.notes;

    // Optional clickable note that pops open an auxiliary screenshot.
    if (m.aux) {
        const link = document.createElement('a');
        link.className = 'aux-link';
        link.textContent = m.aux.text;
        link.href = '#';
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openAuxPopup(m.aux.src);
        });
        if (m.notes) memoryNotes.append(' ');
        memoryNotes.append(link);
    }

    // Fresh comment box for each memory.
    memoryCommentInput.value = '';
    memoryCommentStatus.textContent = '';
    memoryCommentStatus.classList.remove('error');

    // Replay the gentle fade-in for each new memory.
    memoryCard.classList.remove('fade-in-combo');
    void memoryCard.offsetWidth;
    memoryCard.classList.add('fade-in-combo');
}

document.getElementById('memoryNextBtn').addEventListener('click', () => showMemory(memoryIndex + 1));

document.getElementById('jumpNewBtn').addEventListener('click', () => {
    const i = memories.findIndex(m => m.src === NEW_MEMORIES_SRC);
    if (i !== -1) showMemory(i);
});

// --- Private comments (Supabase) -------------------------------------------
// Sending is INSERT-ONLY: the anon key below can add a comment but cannot read
// any back, so it's safe to ship publicly. Reading + replying happens further
// down, gated by a passphrase that's checked server-side (never in this file).
// See SUPABASE-SETUP.md for the table, RLS policy, and RPC functions.
const SUPABASE_URL = 'https://lbvomqpeszbwwikjvngs.supabase.co'; // <-- paste your project URL
const SUPABASE_ANON_KEY = 'sb_publishable_wYKbG-ShjsDI5QCVRJsbsA_-_D8BGX_';               // <-- paste your anon (public) key

async function sendComment(memory, text) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ memory: memory, comment: text })
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
}

memoryCommentSend.addEventListener('click', async () => {
    const text = memoryCommentInput.value.trim();
    if (!text) {
        memoryCommentStatus.classList.remove('error');
        memoryCommentStatus.textContent = 'teehee gotta write smth first';
        return;
    }

    memoryCommentSend.disabled = true;
    memoryCommentStatus.classList.remove('error');
    memoryCommentStatus.textContent = 'sending...';

    try {
        await sendComment(memoryHeader.textContent, text);
        memoryCommentInput.value = '';
        memoryCommentStatus.textContent = 'swooooooosh 💌 🐌';
    } catch (err) {
        memoryCommentStatus.classList.add('error');
        memoryCommentStatus.textContent = "i prolly made a whoopsie daisy mbbb";
    } finally {
        memoryCommentSend.disabled = false;
    }
});

// --- Reading + replying to comments (key-gated) ----------------------------
// Reads/replies go through two Supabase RPC functions (get_comments, add_reply)
// that check a passphrase SERVER-SIDE before returning or writing anything. The
// passphrase is never in this file — it's typed in at runtime and only kept for
// the tab session. See SUPABASE-SETUP.md for the SQL that backs this.
const THREAD_KEY_STORE = 'commentsKey';
const THREAD_ROLE_STORE = 'commentsRole'; // 'reply' (you) or 'read' (her)
const getThreadKey = () => sessionStorage.getItem(THREAD_KEY_STORE);
const getThreadRole = () => sessionStorage.getItem(THREAD_ROLE_STORE);
function clearThreadKey() {
    sessionStorage.removeItem(THREAD_KEY_STORE);
    sessionStorage.removeItem(THREAD_ROLE_STORE);
}

async function rpc(fn, body) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const text = await res.text();
    if (!res.ok) {
        // Surface the server's actual reason ("unauthorized", "Could not find
        // the function...", etc.) instead of a bare HTTP 400.
        console.error(`RPC ${fn} failed (${res.status}):`, text);
        throw new Error('HTTP ' + res.status + ' — ' + text);
    }
    return text ? JSON.parse(text) : null;
}

const threadModal = document.getElementById('threadModal');
const threadTitle = document.getElementById('threadTitle');
const threadUnlock = document.getElementById('threadUnlock');
const threadBody = document.getElementById('threadBody');
const threadKeyInput = document.getElementById('threadKeyInput');
const threadUnlockBtn = document.getElementById('threadUnlockBtn');
const threadUnlockStatus = document.getElementById('threadUnlockStatus');
let threadMemory = null;

function showThreadUnlock() {
    threadUnlock.style.display = '';
    threadBody.style.display = 'none';
    threadUnlockStatus.textContent = '';
    threadUnlockStatus.classList.remove('error');
    threadKeyInput.value = '';
}

function showThreadBody() {
    threadUnlock.style.display = 'none';
    threadBody.style.display = '';
}

function openThread() {
    threadMemory = memoryHeader.textContent;
    threadTitle.textContent = threadMemory;
    threadModal.classList.add('open');
    if (getThreadKey()) {
        showThreadBody();
        loadThread();
    } else {
        showThreadUnlock();
        threadKeyInput.focus();
    }
}

function closeThread() {
    threadModal.classList.remove('open');
}

async function loadThread() {
    threadBody.innerHTML = '<p class="thread-empty">loading…</p>';
    try {
        const rows = await rpc('get_comments', { p_key: getThreadKey(), p_memory: threadMemory });
        renderThread(rows || []);
    } catch (err) {
        // Stored key is bad/expired — drop it and ask again.
        clearThreadKey();
        showThreadUnlock();
        threadUnlockStatus.classList.add('error');
        threadUnlockStatus.textContent = 'hmm, that key stopped working';
    }
}

function renderThread(rows) {
    threadBody.innerHTML = '';
    if (!rows.length) {
        const p = document.createElement('p');
        p.className = 'thread-empty';
        p.textContent = 'no notes on this one yet';
        threadBody.appendChild(p);
        return;
    }
    // The viewer's own messages sit on the right (.you), the other person's on
    // the left (.her). For the reply key (you), comments are "the other person"
    // and replies are "you". For the read key (her), it's mirrored: her comments
    // are "you" (right), your replies are "the other person" (left).
    const isReader = getThreadRole() === 'read';
    const commentClass = isReader ? 'you' : 'her';
    const replyClass = isReader ? 'her' : 'you';

    rows.forEach(row => {
        const item = document.createElement('div');
        item.className = 'thread-item';

        const comment = document.createElement('div');
        comment.className = 'thread-msg ' + commentClass;
        comment.textContent = row.comment;
        item.appendChild(comment);

        const zone = document.createElement('div');
        zone.className = 'thread-reply-zone';
        renderReplyZone(zone, row, replyClass);
        item.appendChild(zone);

        threadBody.appendChild(item);
    });
}

// Shows the reply bubble (if any). Only the reply-key holder gets the edit/reply
// link to add or change it; the read-key holder just sees it.
function renderReplyZone(zone, row, replyClass) {
    zone.innerHTML = '';
    if (row.reply) {
        const reply = document.createElement('div');
        reply.className = 'thread-msg ' + replyClass;
        reply.textContent = row.reply;
        zone.appendChild(reply);
    }
    if (getThreadRole() !== 'reply') return; // read-only: no reply controls
    const link = document.createElement('button');
    link.className = 'thread-reply-link';
    link.textContent = row.reply ? 'edit' : '＋ reply';
    link.addEventListener('click', () => showReplyInput(zone, row, replyClass));
    zone.appendChild(link);
}

function showReplyInput(zone, row, replyClass) {
    zone.innerHTML = '';
    const ta = document.createElement('textarea');
    ta.className = 'memory-comment-input thread-reply-input';
    ta.rows = 2;
    ta.maxLength = 2000;
    ta.value = row.reply || '';
    ta.placeholder = 'your reply…';
    zone.appendChild(ta);

    const rowEl = document.createElement('div');
    rowEl.className = 'memory-comment-row';
    const send = document.createElement('button');
    send.className = 'memory-comment-send';
    send.textContent = 'send';
    const cancel = document.createElement('button');
    cancel.className = 'thread-reply-link';
    cancel.textContent = 'cancel';
    const status = document.createElement('span');
    status.className = 'memory-comment-status';
    rowEl.append(send, cancel, status);
    zone.appendChild(rowEl);
    ta.focus();

    cancel.addEventListener('click', () => renderReplyZone(zone, row, replyClass));
    send.addEventListener('click', async () => {
        const text = ta.value.trim();
        if (!text) {
            status.classList.add('error');
            status.textContent = 'write smth first hehe';
            return;
        }
        if (row.id == null) {
            // get_comments didn't hand back an id, so add_reply can't target a row.
            status.classList.add('error');
            status.textContent = 'no id on this comment — get_comments must SELECT *';
            console.error('Reply target has no id. Row from get_comments:', row);
            return;
        }
        send.disabled = true;
        status.classList.remove('error');
        status.textContent = 'sending…';
        try {
            await rpc('add_reply', { p_key: getThreadKey(), p_id: row.id, p_reply: text });
            row.reply = text;
            renderReplyZone(zone, row, replyClass);
        } catch (err) {
            status.classList.add('error');
            status.textContent = 'whoopsie, try again';
            send.disabled = false;
        }
    });
}

threadUnlockBtn.addEventListener('click', async () => {
    const key = threadKeyInput.value.trim();
    if (!key) {
        threadUnlockStatus.classList.remove('error');
        threadUnlockStatus.textContent = 'type the key first 🔑';
        return;
    }
    threadUnlockBtn.disabled = true;
    threadUnlockStatus.classList.remove('error');
    threadUnlockStatus.textContent = 'checking…';
    try {
        // key_role tells us whether this is the reply key (you) or the read key
        // (her) — and returns null for a wrong key, which decides the perspective.
        const role = await rpc('key_role', { p_key: key });
        if (role !== 'reply' && role !== 'read') throw new Error('bad key');
        sessionStorage.setItem(THREAD_KEY_STORE, key);
        sessionStorage.setItem(THREAD_ROLE_STORE, role);
        showThreadBody();
        loadThread();
    } catch (err) {
        threadUnlockStatus.classList.add('error');
        threadUnlockStatus.textContent = 'nope, wrong key';
    } finally {
        threadUnlockBtn.disabled = false;
    }
});

threadKeyInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') threadUnlockBtn.click(); });
document.getElementById('memoryThreadBtn').addEventListener('click', openThread);
document.getElementById('threadModalClose').addEventListener('click', closeThread);
threadModal.addEventListener('click', (e) => { if (e.target === threadModal) closeThread(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && threadModal.classList.contains('open')) closeThread(); });

// Auxiliary screenshot popup
const auxModal = document.getElementById('auxModal');
const auxModalImg = document.getElementById('auxModalImg');

function openAuxPopup(src) {
    auxModalImg.src = src;
    auxModal.classList.add('open');
}

function closeAuxPopup() {
    auxModal.classList.remove('open');
}

document.getElementById('auxModalClose').addEventListener('click', closeAuxPopup);
auxModal.addEventListener('click', (e) => {
    if (e.target === auxModal) closeAuxPopup(); // click backdrop to dismiss
});

// "you should know,," text popup
const knowModal = document.getElementById('knowModal');

function closeKnowModal() {
    knowModal.classList.remove('open');
}

document.getElementById('youShouldKnowBtn').addEventListener('click', () => knowModal.classList.add('open'));
document.getElementById('knowModalClose').addEventListener('click', closeKnowModal);
knowModal.addEventListener('click', (e) => {
    if (e.target === knowModal) closeKnowModal(); // click backdrop to dismiss
});

// "take me home" closes the popup and returns to page 1 (optional button).
const knowHomeBtn = document.getElementById('knowHomeBtn');
if (knowHomeBtn) {
    knowHomeBtn.addEventListener('click', () => {
        closeKnowModal();
        goToPage(indexOfPage('page1'));
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAuxPopup();
        closeKnowModal();
    }
});

// Generic multi-page navigation
const pages = document.querySelectorAll('.page');

// Fade to any page by index (some moves aren't linear, e.g. page 1 <-> page 5).
function goToPage(nextIndex) {
    if (nextIndex < 0 || nextIndex >= pages.length || nextIndex === currentPage) return;

    pages[currentPage].classList.remove('active');
    currentPage = nextIndex;
    pages[currentPage].classList.add('active');
    if (pages[currentPage].id === 'page4' && lastFlower === -1) randomizeFlower(); // first flower on arrival
    if (pages[currentPage].id === 'page6' && memoryIndex === -1) showMemory(0); // first memory on arrival
}

function goToNextPage() {
    goToPage(currentPage + 1);
}

function indexOfPage(id) {
    return [...pages].findIndex(p => p.id === id);
}

document.querySelectorAll('.next-arrow').forEach(arrow => arrow.addEventListener('click', goToNextPage));
document.getElementById('moreBtn').addEventListener('click', goToNextPage);

// The "not a good morning?" detour off page 1, and its way back home.
document.getElementById('badMorningBtn').addEventListener('click', () => goToPage(indexOfPage('page5')));
document.getElementById('goodMorningBtn').addEventListener('click', () => goToPage(indexOfPage('page1')));

// The "memories?" detour off page 1.
document.getElementById('memoriesBtn').addEventListener('click', () => goToPage(indexOfPage('page6')));

// --- GAMBLING (page 7) -----------------------------------------------------
// Press the lever, win a random reward. Edit REWARDS freely — text only for now.
const REWARDS = [
    'A silly selfie',
    'A drawing of something that reminded me of you today',
    'A poem',
    'Voucher for INFINITE KISSES AND CUDDLES FOREVER',
    //'Wildcard — your wish be my command',
    'You get to decide the next website addition',
    'a short story about a topic of your choice',
    'a bouquet',
    'give me a time, and ill text you a picture of where i am at exactly that time',
    'JACKPOT (you) (your wish be my command)',
    '(attempt at) a song for you',



];

const gambleBtn = document.getElementById('gambleBtn');
const gambleResult = document.getElementById('gambleResult');
let gambling = false;

gambleBtn.addEventListener('click', () => {
    if (gambling) return;
    gambling = true;
    gambleBtn.disabled = true;
    const win = REWARDS[Math.floor(Math.random() * REWARDS.length)];

    // Spin: flick through the rewards fast, then land on the winner.
    let ticks = 0;
    const totalTicks = 16;
    gambleResult.classList.remove('gamble-win');
    gambleResult.classList.add('gamble-spinning');
    const spin = setInterval(() => {
        gambleResult.textContent = REWARDS[Math.floor(Math.random() * REWARDS.length)];
        if (++ticks >= totalTicks) {
            clearInterval(spin);
            gambleResult.textContent = '🎉 ' + win + ' 🎉';
            gambleResult.classList.remove('gamble-spinning');
            gambleResult.classList.add('gamble-win');
            gambleBtn.disabled = false;
            gambling = false;
        }
    }, 80);
});

// The "made lovelier by GAMBLING" detour off page 2, and its way back.
document.getElementById('gambleEntryBtn').addEventListener('click', () => goToPage(indexOfPage('page7')));
document.getElementById('gambleBackBtn').addEventListener('click', () => goToPage(indexOfPage('page2')));

// --- Patch notes ("what's new") -------------------------------------------
// Loaded from patch-notes.js. Shows the newest entry on open, once per version.
(function initPatchNotes() {
    const patchModal = document.getElementById('patchModal');
    const patchBody = document.getElementById('patchModalBody');
    if (!patchModal || !patchBody || typeof PATCH_NOTES === 'undefined') return;

    const versions = PATCH_NOTES.versions || {};
    // Use the explicit `latest` pointer if it exists, otherwise fall back to the
    // first entry — so a stale/typo'd `latest` never hides the notes entirely.
    const latestKey = versions[PATCH_NOTES.latest] ? PATCH_NOTES.latest : Object.keys(versions)[0];
    const latest = versions[latestKey];
    if (!latest) return;

    function changeList(changes) {
        const ul = document.createElement('ul');
        ul.className = 'patch-changes';
        (changes || []).forEach(c => {
            const li = document.createElement('li');
            li.textContent = c;
            ul.appendChild(li);
        });
        return ul;
    }

    function addEntry(parent, entry, titleClass) {
        const title = document.createElement('p');
        title.className = 'patch-title' + (titleClass ? ' ' + titleClass : '');
        title.textContent = (entry.date ? ' · ' + entry.date : '');
        parent.appendChild(title);
        parent.appendChild(changeList(entry.changes));
    }

    // Heading + the latest entry.
    const heading = document.createElement('h2');
    heading.className = 'patch-heading';
    heading.textContent = latest.title;
    patchBody.appendChild(heading);
    addEntry(patchBody, latest);

    // Everything older, tucked into a collapsible section.
    const older = Object.keys(versions).filter(k => k !== latestKey);
    if (older.length) {
        const details = document.createElement('details');
        details.className = 'patch-older';
        const summary = document.createElement('summary');
        summary.textContent = 'older updates';
        details.appendChild(summary);
        older.forEach(k => addEntry(details, versions[k], 'patch-title-old'));
        patchBody.appendChild(details);
    }

    function closePatch() {
        patchModal.classList.remove('open');
    }

    document.getElementById('patchModalClose').addEventListener('click', closePatch);
    patchModal.addEventListener('click', (e) => { if (e.target === patchModal) closePatch(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePatch(); });

    // Show on every open.
    patchModal.classList.add('open');
})();

// Start animation loop
animate();
