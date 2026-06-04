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

// Generic multi-page navigation
const pages = document.querySelectorAll('.page');
const arrows = document.querySelectorAll('.next-arrow');

arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
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
        }, 500);
    });
});

// Start animation loop
animate();
