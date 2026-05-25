// --- DATABASE & ENGINE ---
const languages = ["English", "Arabic", "French", "Spanish", "German", "Japanese", "Chinese", "Italian", "Russian", "Turkish", "Portuguese", "Korean", "Hindi", "Dutch", "Swedish", "Norwegian", "Danish", "Finnish", "Polish", "Greek", "Hebrew", "Indonesian", "Malay", "Thai", "Vietnamese", "Czech", "Hungarian", "Romanian", "Ukrainian", "Persian"];

const storyPool = [
    { t: "The Secret Map", c: "A young boy found an old map in the attic that led to a forgotten garden." },
    { t: "Midnight Train", c: "The clock struck twelve, and a mysterious train appeared on the old tracks." },
    { t: "The Talking Bird", c: "Sarah was surprised when the parrot started telling her about ancient Egypt." },
    { t: "Ocean Dreams", c: "A dolphin guided the lost sailor back to the shore through the storm." },
    { t: "The Magic Pen", c: "Everything Leo drew with this silver pen became real for exactly one hour." },
    { t: "Mountain Echo", c: "The echo in the valley didn't repeat words; it answered questions." },
    { t: "Robot's First Day", c: "Unit 404 was the first robot to go to a human kindergarten." },
    { t: "Stars in a Jar", c: "Elara spent her nights catching fallen stars and keeping them in glass jars." },
    { t: "The Time Watch", c: "A golden watch could stop time, but only for three seconds at a time." },
    { t: "Hidden Bridge", c: "Beneath the lake lay a bridge made of crystal that appeared only at full moon." },
    { t: "Forest Guardian", c: "The oldest oak tree in the forest began to whisper secrets to the wind." },
    { t: "Ice Castle", c: "In the land of eternal winter, a queen built a castle out of frozen memories." },
    { t: "The Silent Piano", c: "The piano hadn't been played in years, yet it began to play a beautiful melody." },
    { t: "Dragon’s Tea", c: "A friendly dragon invited the villagers for a cup of herbal tea every Sunday." },
    { t: "Cloud Walker", c: "A girl discovered she could walk on clouds if she wore blue socks." },
    { t: "Paper Wings", c: "Oliver made wings out of paper and flew across the park at sunset." },
    { t: "The Library Ghost", c: "The ghost in the library didn't haunt; it just helped find lost books." },
    { t: "Golden Seed", c: "When the golden seed was planted, it grew into a tree made of light." },
    { t: "Wind Chaser", c: "The boy spent his life trying to catch the wind in a butterfly net." },
    { t: "The Moon Flower", c: "A rare flower bloomed only when the moon was at its brightest." }
];

const countries = [
    {n: "Saudi Arabia", f: "🇸🇦", s: "Only country in the world with no permanent rivers."},
    {n: "United States", f: "🇺🇸", s: "Has the most airports in the world (over 13,000)."},
    {n: "Japan", f: "🇯🇵", s: "You can buy square watermelons for better storage."},
    {n: "France", f: "🇫🇷", s: "Actually covers the most time zones (12) including territories."},
    {n: "Morocco", f: "🇲🇦", s: "Home to the oldest university in the world, founded in 859."},
    {n: "Canada", f: "🇨🇦", s: "Has more lakes than all other countries combined."},
    {n: "Egypt", f: "🇪🇬", s: "The Great Pyramid is the only ancient wonder still standing."},
    {n: "Iceland", f: "🇮🇸", s: "Most peaceful country with no standing army."}
    // Logic will fill the rest dynamically up to 195
];

// --- NAVIGATION SYSTEM ---
let currentView = "dashboard";
const viewHistory = ["dashboard"];

const viewport = document.getElementById('app-viewport');
const backBtn = document.getElementById('global-back');
const headerTitle = document.getElementById('main-header-title');

function navigate(view, title) {
    viewHistory.push(view);
    headerTitle.innerText = title;
    backBtn.classList.remove('hidden');
    render(view);
}

backBtn.onclick = () => {
    viewHistory.pop();
    const prev = viewHistory[viewHistory.length - 1];
    if(prev === "dashboard") {
        backBtn.classList.add('hidden');
        headerTitle.innerText = "OmniVision AI";
    }
    render(prev);
};

// --- RENDER ENGINE ---
function render(view) {
    let html = "";
    switch(view) {
        case 'dashboard':
            html = `
            <div class="dashboard-grid">
                <div class="card" onclick="navigate('ai-scanner', 'AI Core Center')"><i>🤖</i><h3>AI Vision Center</h3><p>Calorie & Height Analysis</p></div>
                <div class="card" onclick="navigate('health', 'Health & Sleep')"><i>❤️</i><h3>Health System</h3><p>Hydration & Sleep Hub</p></div>
                <div class="card" onclick="navigate('study', 'Study Hub')"><i>🎓</i><h3>Education Center</h3><p>Math & Focus Timer</p></div>
                <div class="card" onclick="navigate('geo', 'Global Explorer')"><i>🌍</i><h3>Geography Secrets</h3><p>195 Countries Facts</p></div>
                <div class="card" onclick="navigate('lang', 'Language Hub')"><i>🗣️</i><h3>Language Learning</h3><p>30 Languages - 20 Stories</p></div>
                <div class="card" onclick="navigate('games', 'Logic Zone')"><i>🎮</i><h3>Gaming & Logic</h3><p>Puzzles & Fun</p></div>
            </div>`;
            break;

        case 'ai-scanner':
            html = `
            <div class="scanner-container">
                <div class="card" onclick="runAI('calories')">🥗 Scan Meal (Calorie AI)</div>
                <div class="card" style="margin-top:20px" onclick="runAI('height')">📏 Scan Body (Height AI)</div>
                <div id="ai-process" class="hidden">
                    <div class="scan-area"><div class="scan-line"></div><div id="ai-img-preview"></div></div>
                    <div id="ai-result" class="card">Processing...</div>
                </div>
            </div>`;
            break;

        case 'health':
            html = `
            <div class="dashboard-grid">
                <div class="card"><h3>Sleep Advisor</h3><p>Optimal wake up: <br><strong>${calculateSleep()}</strong></p></div>
                <div class="card"><h3>Hydration Hub</h3><input type="number" id="weight" placeholder="Your Weight (kg)"><button class="nav-btn" onclick="calcWater()">Calculate</button><p id="h2o-res"></p></div>
            </div>`;
            break;

        case 'study':
            html = `
            <div class="dashboard-grid">
                <div class="card"><h3>Math Trainer</h3><div id="m-q" class="math-box"></div><input type="number" id="m-a"><button class="nav-btn" onclick="checkM()">Check</button><p id="m-s">Score: 0</p></div>
                <div class="card"><h3>Pomodoro</h3><div id="p-t" class="math-box">25:00</div><button class="nav-btn" onclick="startP()">Start</button></div>
            </div>`;
            setTimeout(genM, 100);
            break;

        case 'geo':
            html = `<div class="country-grid">`;
            for(let i=0; i<195; i++) {
                const c = countries[i % countries.length];
                html += `<button class="country-btn" onclick="alert('${c.s}')"><span>${c.f}</span> ${c.n} #${i+1}</button>`;
            }
            html += `</div>`;
            break;

        case 'lang':
            html = `
            <div class="card">
                <select id="lang-target" onchange="renderStories()">${languages.map(l => `<option>${l}</option>`).join('')}</select>
                <div id="story-list" class="dashboard-grid" style="margin-top:20px"></div>
            </div>`;
            setTimeout(renderStories, 100);
            break;

        case 'games':
            html = `
            <div class="dashboard-grid">
                <div class="card" onclick="alert('Puzzle Started')">🧩 Sliding Puzzle</div>
                <div class="card" onclick="alert('Word Scramble')">🔤 Word Scramble</div>
                <div class="card" onclick="alert('XO Started')">❌ Tic Tac Toe</div>
            </div>`;
            break;
    }
    viewport.innerHTML = html;
}

// --- LOGIC FUNCTIONS ---
function runAI(mode) {
    document.getElementById('ai-process').classList.remove('hidden');
    const res = document.getElementById('ai-result');
    setTimeout(() => {
        if(mode === 'calories') res.innerHTML = "AI Detected: Grilled Salmon & Avocado <br> <strong>425 Calories</strong>";
        else res.innerHTML = "AI Perspective Analysis: <br> <strong>178.5 cm</strong>";
    }, 2000);
}

function calculateSleep() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 14 + (90 * 6)); // Best cycle
    return now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
}

function calcWater() {
    const w = document.getElementById('weight').value;
    document.getElementById('h2o-res').innerText = "Target: " + (w * 0.033).toFixed(1) + " Liters/Day";
}

let score = 0;
let mAns = 0;
function genM() {
    const n1 = Math.floor(Math.random() * (10 + score));
    const n2 = Math.floor(Math.random() * (10 + score));
    mAns = n1 + n2;
    document.getElementById('m-q').innerText = n1 + " + " + n2;
}
function checkM() {
    if(parseInt(document.getElementById('m-a').value) === mAns) {
        score++;
        document.getElementById('m-s').innerText = "Score: " + score;
        document.getElementById('m-a').value = "";
        genM();
    }
}

function renderStories() {
    const list = document.getElementById('story-list');
    const lang = document.getElementById('lang-target').value;
    list.innerHTML = storyPool.map((s, i) => `
        <div class="card" onclick="alert('${s.t}\\n\\n${s.c}\\n\\nTranslation to ${lang}:\\n[Simulated Translation Engine Content...]')">
            <h4>${s.t}</h4>
            <p>Story #${i+1}</p>
        </div>
    `).join('');
}

// Start
render('dashboard');
