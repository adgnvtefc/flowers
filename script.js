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
];

// Where "i wanna see the new ones!!" jumps to — change this to the newest batch's photo.
const NEW_MEMORIES_SRC = 'memories/day56.jpeg';

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
// These are INSERT-ONLY: the anon key below can add a comment but cannot read
// any back, so it's safe to ship publicly. See SUPABASE-SETUP.md for the table
// + row-level-security policy that enforces this. Comments land privately in
// your Supabase dashboard, never on the page.
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
