const frames = [
"         \n         \n         \n         \n         \n         \n         \n      .  \n    .....",
"         \n         \n         \n     _._ \n    /   \\\n    \\___/\n      |  \n      |  \n    .....",
"         \n         \n    .-.-.\n   /     \\\n   |  o  |\n   \\     /\n    '-.-'\n      |  \n    .....",
"         \n   _.-.-._\n  /       \\\n |  .---.  |\n |  | O |  |\n |  '---'  |\n  \\       /\n   '-._.-'\n      |  ",
"    .-~~~-.\n  .'       '.\n /   .-.-.   \\\n |  (  O  )  |\n \\   '-.-'   /\n  '.       .'\n    '-~~~-'\n      |  \n    ~\\|/~",
"   _.-~~~-._\n .'         '.\n |   _.-._   |\n |  (  O  )  |\n |   '-.-'   |\n '.         .'\n   '-.___.-'\n      |  \n    ~\\|/~"
];

const maxFrame = frames.length - 1;

// 3 flowers with different delays to bloom progressively
let flowers = [
    { frame: 0, direction: 1, delay: 0 },
    { frame: 0, direction: 1, delay: 4 },
    { frame: 0, direction: 1, delay: 8 }
];

const asciiElement = document.getElementById('flower-ascii');

function updateFlowers() {
    flowers.forEach(f => {
        if (f.delay > 0) {
            f.delay--;
        } else {
            f.frame += f.direction;
            if (f.frame === maxFrame) {
                f.direction = -1;
                f.delay = 12; // pause at full bloom
            } else if (f.frame === 0) {
                f.direction = 1;
                f.delay = 8; // pause at seed
            }
        }
    });
}

function renderGarden() {
    let combined = [];
    const numLines = 9; // all frames have exactly 9 lines
    
    for (let i = 0; i < numLines; i++) {
        let row = '';
        flowers.forEach((f, index) => {
            const lines = frames[f.frame].split('\n');
            let line = lines[i] || '';
            row += line.padEnd(16, ' ') + (index < 2 ? '   ' : '');
        });
        combined.push(row);
    }
    
    asciiElement.textContent = combined.join('\n');
}

function animate() {
    renderGarden();
    updateFlowers();
    setTimeout(animate, 200); // 200ms per frame
}

// Start animation loop
animate();
