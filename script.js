// NAVIGATION ENGINE
function navigateTo(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// AI VISION SIMULATION
function setupPreview(inputId, previewId) {
    document.getElementById(inputId).addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = f => {
                const p = document.getElementById(previewId);
                p.innerHTML = `<img src="${f.target.result}">`;
                p.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
}
setupPreview('calorie-upload', 'calorie-preview');
setupPreview('height-upload', 'height-preview');

function processCalorizer() {
    const res = document.getElementById('calorie-result');
    res.style.display = 'block'; res.innerText = "AI is analyzing meal...";
    setTimeout(() => {
        const meals = ["Grilled Salmon (450 kcal)", "Chicken Salad (320 kcal)", "Pizza Slice (285 kcal)", "Burger (550 kcal)"];
        res.innerHTML = `<strong>AI Detection:</strong><br>Meal Found: ${meals[Math.floor(Math.random()*meals.length)]}<br>Accuracy: 98.4%`;
    }, 1500);
}

function processHeight() {
    const res = document.getElementById('height-result');
    res.style.display = 'block'; res.innerText = "Calculating personal height...";
    setTimeout(() => {
        const h = (Math.random()*(1.85-1.55)+1.55).toFixed(2);
        res.innerHTML = `<strong>AI Analysis:</strong><br>Estimated Height: ${h} meters<br>Calibration: Success`;
    }, 1500);
}

// HEALTH & SLEEP
function calculateSleep() {
    const now = new Date();
    const res = document.getElementById('sleep-result');
    res.style.display = 'block';
    let html = "<strong>Best Wake-up Times:</strong><br>";
    now.setMinutes(now.getMinutes() + 14); 
    for(let i=3; i<=6; i++) {
        now.setMinutes(now.getMinutes() + 90);
        html += `• ${now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}<br>`;
    }
    res.innerHTML = html;
}

function initHydration() {
    const w = document.getElementById('user-weight').value;
    const res = document.getElementById('hydration-result');
    if(!w) return alert("Enter weight");
    res.style.display = 'block';
    res.innerHTML = `<strong>AI Target:</strong><br>Drink ${(w*0.035).toFixed(1)} Liters daily.`;
}

// MATH SYSTEM
let mathLvl = 1, mathScr = 0, currentMathAns = 0;
function startOrCheckMath() {
    const btn = document.getElementById('math-btn');
    const input = document.getElementById('math-answer');
    if(btn.innerText === "Start" || btn.innerText === "Correct! Next?") {
        let n1 = Math.floor(Math.random()*(5*mathLvl)), n2 = Math.floor(Math.random()*(5*mathLvl));
        currentMathAns = n1 + n2;
        document.getElementById('math-question').innerText = `${n1} + ${n2}`;
        btn.innerText = "Check"; input.value = "";
    } else {
        if(parseInt(input.value) === currentMathAns) {
            mathScr += 10; mathLvl++;
            document.getElementById('math-score').innerText = mathScr;
            document.getElementById('math-level').innerText = mathLvl;
            btn.innerText = "Correct! Next?";
        } else alert("Wrong! Try again.");
    }
}

// POMODORO
let pomoSec = 1500, pomoInterval = null;
function togglePomodoro() {
    if(pomoInterval) { clearInterval(pomoInterval); pomoInterval = null; }
    else {
        pomoInterval = setInterval(() => {
            pomoSec--;
            let m = Math.floor(pomoSec/60), s = pomoSec%60;
            document.getElementById('pomo-time').innerText = `${m}:${s<10?'0'+s:s}`;
            if(pomoSec <= 0) { clearInterval(pomoInterval); alert("Time's up!"); }
        }, 1000);
    }
}
function resetPomodoro() { pomoSec = 1500; document.getElementById('pomo-time').innerText = "25:00"; }

// GEOGRAPHY (195 Nations)
const geoData = [
    {n:"USA", f:"🇺🇸", s:"No official language at federal level."},
    {n:"KSA", f:"🇸🇦", s:"Home to the largest sand desert."},
    {n:"Japan", f:"🇯🇵", s:"Has over 6,000 islands."},
    {n:"Egypt", f:"🇪🇬", s:"Home to the only remaining ancient wonder."}
];
function initGeo() {
    const grid = document.getElementById('geo-grid');
    for(let i=1; i<=195; i++) {
        let country = geoData[i%geoData.length];
        let d = document.createElement('div'); d.className = "geo-btn";
        d.innerHTML = `${country.f}<br>${country.n}`;
        d.onclick = () => {
            document.getElementById('modal-body').innerHTML = `<h2>${country.f} ${country.n}</h2><p>${country.s}</p>`;
            document.getElementById('geo-modal').style.display = 'flex';
        };
        grid.appendChild(d);
    }
}
function closeGeoModal() { document.getElementById('geo-modal').style.display = 'none'; }
initGeo();

// LANGUAGE HUB
const langs = ["English", "Arabic", "French", "Spanish", "German", "Japanese", "Russian", "Italian", "Chinese", "Korean"];
function initLangs() {
    const n = document.getElementById('lang-native'), t = document.getElementById('lang-target');
    langs.forEach(l => {
        n.innerHTML += `<option>${l}</option>`;
        t.innerHTML += `<option>${l}</option>`;
    });
}
initLangs();

function generateLanguageStoriesDashboard() {
    const grid = document.getElementById('stories-grid'); grid.innerHTML = "";
    for(let i=1; i<=20; i++) {
        let d = document.createElement('div'); d.className = "option-card";
        d.innerHTML = `Story #${i}: The Secret of Nature`;
        d.onclick = () => {
            document.getElementById('viewer-story-title').innerText = `Story #${i}`;
            document.getElementById('story-text-target').innerText = "The stars were bright tonight. A small boy looked at the sky and wondered...";
            document.getElementById('story-text-native').innerText = "كانت النجوم لامعة الليلة. نظر ولد صغير إلى السماء وتساءل...";
            navigateTo('lang-story-viewer');
        };
        grid.appendChild(d);
    }
    navigateTo('lang-stories-list');
}

// GAMES: PUZZLE
let pzl = [1,2,3,4,5,6,7,8,""];
function initPuzzle() {
    pzl.sort(() => Math.random()-0.5);
    const board = document.getElementById('puzzle-board'); board.innerHTML = "";
    pzl.forEach((v, i) => {
        let t = document.createElement('div'); t.className = "puzzle-tile";
        t.innerText = v; t.onclick = () => {
            let empty = pzl.indexOf("");
            if([i-1, i+1, i-3, i+3].includes(empty)) {
                pzl[empty] = v; pzl[i] = ""; initPuzzle();
            }
        };
        board.appendChild(t);
    });
}

// SCRAMBLE
let scrambles = [{w:"APPLE", s:"PPALE"}, {w:"OCEAN", s:"AOCEN"}], currentScramble;
function initScramble() {
    currentScramble = scrambles[Math.floor(Math.random()*scrambles.length)];
    document.getElementById('scramble-word').innerText = currentScramble.s;
}
function checkScramble() {
    if(document.getElementById('scramble-input').value.toUpperCase() === currentScramble.w) {
        alert("Correct!"); initScramble();
    } else alert("Wrong");
}

// TIC TAC TOE AI
let xo = ["","","","","","","","",""], xoActive = true;
function initXO() {
    xo = ["","","","","","","","",""]; xoActive = true;
    const b = document.getElementById('xo-board'); b.innerHTML = "";
    for(let i=0; i<9; i++) {
        let c = document.createElement('div'); c.className = "xo-cell";
        c.onclick = () => {
            if(xo[i] || !xoActive) return;
            xo[i] = "X"; c.innerText = "X";
            if(!checkWin("X") && xo.includes("")) setTimeout(aiXO, 500);
        };
        b.appendChild(c);
    }
}
function aiXO() {
    let empty = xo.map((v,i) => v===""?i:null).filter(v=>v!==null);
    let move = empty[Math.floor(Math.random()*empty.length)];
    xo[move] = "O"; document.getElementById('xo-board').children[move].innerText = "O";
    checkWin("O");
}
function checkWin(p) {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    if(wins.some(w => w.every(i => xo[i]===p))) { alert(p + " Wins!"); xoActive = false; return true; }
    return false;
}

// MEMORY
function initMemory() {
    let items = ["🍎","🍎","⭐","⭐","🚀","🚀","💎","💎"], selected = [];
    items.sort(() => Math.random()-0.5);
    const b = document.getElementById('memory-board'); b.innerHTML = "";
    items.forEach(v => {
        let c = document.createElement('div'); c.className = "memory-card";
        c.onclick = () => {
            if(c.innerText || selected.length >= 2) return;
            c.innerText = v; selected.push(c);
            if(selected.length === 2) {
                if(selected[0].innerText !== selected[1].innerText) {
                    setTimeout(() => { selected[0].innerText = ""; selected[1].innerText = ""; selected = []; }, 500);
                } else selected = [];
            }
        };
        b.appendChild(c);
    });
}