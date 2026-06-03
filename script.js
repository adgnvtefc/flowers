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

// Single sun that ping-pongs through the frames so it appears to bloom.
let sun = { frame: 0, direction: 1, delay: 0 };

let hearts = [
    { frame: 0, direction: 1, delay: 0 },
    { frame: 0, direction: 1, delay: 3 },
    { frame: 0, direction: 1, delay: 6 }
];

const sunAsciiElement = document.getElementById('sun-ascii');
const heartAsciiElement = document.getElementById('heart-ascii');

function updateSun() {
    if (sun.delay > 0) {
        sun.delay--;
        return;
    }
    sun.frame += sun.direction;
    if (sun.frame >= maxSunFrame) {
        sun.frame = maxSunFrame;
        sun.direction = -1;
        sun.delay = 6; // pause fully bloomed
    } else if (sun.frame <= 0) {
        sun.frame = 0;
        sun.direction = 1;
        sun.delay = 4; // pause closed
    }
}

function updateEntities(entities, maxFrames, delays) {
    entities.forEach(e => {
        if (e.delay > 0) {
            e.delay--;
        } else {
            e.frame += e.direction;
            if (e.frame === maxFrames) {
                e.direction = -1;
                e.delay = delays.max; // pause at max
            } else if (e.frame === 0) {
                e.direction = 1;
                e.delay = delays.min; // pause at min
            }
        }
    });
}

function renderAscii(entities, framesArray, element, padLen) {
    let combined = [];
    const numLines = 9; // all frames have exactly 9 lines

    for (let i = 0; i < numLines; i++) {
        let row = '';
        entities.forEach((e, index) => {
            const lines = framesArray[e.frame].split('\n');
            let line = lines[i] || '';
            row += line.padEnd(padLen, ' ') + (index < 2 ? '   ' : '');
        });
        combined.push(row);
    }

    element.textContent = combined.join('\n');
}

let currentPage = 0;

function animate() {
    if (currentPage === 0) {
        sunAsciiElement.textContent = sunFrames[sun.frame];
        updateSun();
    } else if (currentPage === 1) {
        renderAscii(hearts, heartFrames, heartAsciiElement, 17);
        updateEntities(hearts, maxHeartFrame, { max: 8, min: 4 });
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
