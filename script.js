// Blooming sun — three frames cycled to make it open and close.
// Art by jgs, via https://asciiart.website/art/7548 (signature removed).
const sunFrames = [
    "        _ _          \n     .-( : )-.       \n    (   \\'/   )      \n   ( `'.;;;.'` )     \n  ( :-=;;;;;=-: )    \n   (  .';;;'.  )     \n    (`  /.\\  `)      \n     '-(_:_)-'       ",
    "        _   _        \n     .-( '.' )-.     \n    (   \\ : /   )    \n   ( `'-.;;;.-'` )   \n  ( :-==;;;;;==-: )  \n   (  .-';;;'-.  )   \n    (`  / : \\  `)    \n     '-(_.'._)-'     ",
    "        __   __      \n     .-(  '.'  )-.   \n    (   \\  |  /   )  \n   ( `'-.;;;;;.-'` ) \n  ( :-==;;;;;;;==-: )\n   (  .-';;;;;'-.  ) \n    (`  /  |  \\  `)  \n     '-(__.'.__)-'   "
];

const heartFrames = [
    "                 \n                 \n                 \n                 \n                 \n                 \n                 \n      . .        \n       v         ",
    "                 \n                 \n                 \n                 \n    .-. .-.      \n    \\     /      \n     \\   /       \n      \\ /        \n       v         ",
    "                 \n                 \n  _.-.   .-._    \n.'           '.  \n|             |  \n \\           /   \n  '.       .'    \n    '-._.-'      \n       v         ",
    "                 \n _..._   _..._   \n.'    '\"'    '.  \n|             |  \n \\           /   \n  '.       .'    \n    '-. .-'      \n      \\ /        \n       v         "
];

const maxSunFrame = sunFrames.length - 1;
const maxHeartFrame = heartFrames.length - 1;

// Single sun and heart that ping-pong through their frames so they appear to bloom.
let sun = { frame: 0, direction: 1, delay: 0 };
let heart = { frame: 0, direction: 1, delay: 0 };

const sunAsciiElement = document.getElementById('sun-ascii');
const heartAsciiElement = document.getElementById('heart-ascii');

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
    if (currentPage === 0) {
        sunAsciiElement.textContent = sunFrames[sun.frame];
        tick(sun, maxSunFrame, 6, 4);
    } else if (currentPage === 1) {
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
    { src: 'memories/day40.jpeg', header: 'Day 40', translation: 'for a lifetime', notes: 'i promise. (more coming soooon)' }
];

// Where "i wanna see the new ones!!" jumps to — change this to the newest batch's photo.
const NEW_MEMORIES_SRC = 'memories/day34.jpeg';

const memoryCard = document.getElementById('memoryCard');
const memoryHeader = document.getElementById('memoryHeader');
const memoryImg = document.getElementById('memoryImg');
const memoryTranslation = document.getElementById('memoryTranslation');
const memoryNotes = document.getElementById('memoryNotes');
let memoryIndex = -1;

function showMemory(i) {
    memoryIndex = ((i % memories.length) + memories.length) % memories.length; // wrap around
    const m = memories[memoryIndex];
    memoryHeader.textContent = m.header;
    memoryImg.src = m.src;
    memoryTranslation.textContent = m.translation;
    memoryNotes.textContent = m.notes;

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

// Start animation loop
animate();
