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

// Generic multi-page navigation
const pages = document.querySelectorAll('.page');

function goToNextPage() {
    const nextIndex = currentPage + 1;
    if (nextIndex >= pages.length) return;

    const current = pages[currentPage];
    const next = pages[nextIndex];

    // Clear both state classes so the page actually fades out even if it
    // was previously faded in (fade-in must not linger and override fade-out).
    current.classList.remove('active', 'fade-in');
    current.classList.add('fade-out');

    setTimeout(() => {
        current.classList.remove('fade-out');
        currentPage = nextIndex;
        next.classList.add('active', 'fade-in');
        if (next.id === 'page4' && lastFlower === -1) randomizeFlower(); // first flower on arrival
    }, 500);
}

document.querySelectorAll('.next-arrow').forEach(arrow => arrow.addEventListener('click', goToNextPage));
document.getElementById('moreBtn').addEventListener('click', goToNextPage);

// Start animation loop
animate();
