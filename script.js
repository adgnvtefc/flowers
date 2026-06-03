const frames = [
"         \n         \n         \n         \n         \n         \n         \n      .  \n    .....",
"         \n         \n         \n     _._ \n    /   \\\n    \\___/\n      |  \n      |  \n    .....",
"         \n         \n    .-.-.\n   /     \\\n   |  o  |\n   \\     /\n    '-.-'\n      |  \n    .....",
"         \n   _.-.-._\n  /       \\\n |  .---.  |\n |  | O |  |\n |  '---'  |\n  \\       /\n   '-._.-'\n      |  ",
"    .-~~~-.\n  .'       '.\n /   .-.-.   \\\n |  (  O  )  |\n \\   '-.-'   /\n  '.       .'\n    '-~~~-'\n      |  \n    ~\\|/~",
"   _.-~~~-._\n .'         '.\n |   _.-._   |\n |  (  O  )  |\n |   '-.-'   |\n '.         .'\n   '-.___.-'\n      |  \n    ~\\|/~"
];

const heartFrames = [
"                 \n                 \n                 \n                 \n                 \n                 \n                 \n      . .        \n       v         ",
"                 \n                 \n                 \n                 \n    .-. .-.      \n    \\     /      \n     \\   /       \n      \\ /        \n       v         ",
"                 \n                 \n  _.-.   .-._    \n.'           '.  \n|             |  \n \\           /   \n  '.       .'    \n    '-._.-'      \n       v         ",
"                 \n _..._   _..._   \n.'    '\"'    '.  \n|             |  \n \\           /   \n  '.       .'    \n    '-. .-'      \n      \\ /        \n       v         "
];

const maxFrame = frames.length - 1;
const maxHeartFrame = heartFrames.length - 1;

let flowers = [
    { frame: 0, direction: 1, delay: 0 },
    { frame: 0, direction: 1, delay: 4 },
    { frame: 0, direction: 1, delay: 8 }
];

let hearts = [
    { frame: 0, direction: 1, delay: 0 },
    { frame: 0, direction: 1, delay: 3 },
    { frame: 0, direction: 1, delay: 6 }
];

const flowerAsciiElement = document.getElementById('flower-ascii');
const heartAsciiElement = document.getElementById('heart-ascii');

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

let isPage2 = false;

function animate() {
    if (!isPage2) {
        renderAscii(flowers, frames, flowerAsciiElement, 16);
        updateEntities(flowers, maxFrame, { max: 12, min: 8 });
    } else {
        renderAscii(hearts, heartFrames, heartAsciiElement, 17);
        updateEntities(hearts, maxHeartFrame, { max: 8, min: 4 });
    }
    setTimeout(animate, 200); // 200ms per frame
}

// Page transition
const nextBtn = document.getElementById('nextBtn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

nextBtn.addEventListener('click', () => {
    page1.classList.remove('active');
    page1.classList.add('fade-out');
    setTimeout(() => {
        page1.classList.remove('fade-out');
        isPage2 = true;
        page2.classList.add('fade-in');
    }, 1000);
});

// Start animation loop
animate();
