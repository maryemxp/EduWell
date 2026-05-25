let xp = 0;
let level = 1;

function update() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
}

function addXP(v) {
  xp += v;
  level = Math.floor(xp / 100) + 1;
  update();
}

function analyzeBurnout() {
  let s = +studyHours.value;
  let sl = +sleepHours.value;
  let sc = +screenHours.value;
  let st = +stressLevel.value;

  let score = 100;
  if (s > 8) score -= 20;
  if (sl < 6) score -= 30;
  if (sc > 6) score -= 20;
  if (st > 7) score -= 30;

  burnoutResult.innerText =
    score > 70 ? "🟢 Healthy" :
    score > 40 ? "🟡 Moderate" : "🔴 Risk";

  addXP(20);
}

function analyzeFood() {
  let m = mealInput.value.toLowerCase();
  foodResult.innerText = m.includes("burger") ? "🔴 Unhealthy" : "🟢 Healthy";
  addXP(10);
}

function generateSummary() {
  let t = lessonInput.value;
  summaryResult.innerText = "📚 Summary: " + t;
  addXP(15);
}

function toggle(el) {
  el.classList.toggle("active");
  addXP(10);
}

update();