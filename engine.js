const MODES=[
  {id:'hangman',name:'Adam Asmaca',icon:'🎯'},
  {id:'scramble',name:'Harf Karıştır',icon:'🔀'},
  {id:'bee',name:'Arı Kovanı',icon:'🐝'},
  {id:'quiz',name:'Kelime Testi',icon:'📚'},
  {id:'chain',name:'Kelime Zinciri',icon:'⛓️'},
  {id:'speed',name:'Hızlı Yazma',icon:'⚡'},
  {id:'fill',name:'Boşluk Doldur',icon:'📝'},
  {id:'synonym',name:'Eşleştir',icon:'🔗'},
  {id:'ladder',name:'Kelime Merdiveni',icon:'🪜'},
  {id:'crossword',name:'Bulmaca',icon:'🧩'},
  {id:'memory',name:'Hafıza Kartı',icon:'🃏'},
  {id:'blitz',name:'Hızlı Tur',icon:'🎲'}
];
let totalScore=0,streak=0,level=1,currentMode=null,gameTimer=null;

// Sound & Speech System
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
  if(audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const now = audioCtx.currentTime;
  
  if(type==='click') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(600, now); osc.frequency.exponentialRampToValueAtTime(300, now+0.1);
    gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.01, now+0.1);
    osc.start(now); osc.stop(now+0.1);
  } else if(type==='correct') {
    osc.type = 'triangle'; osc.frequency.setValueAtTime(400, now); osc.frequency.setValueAtTime(600, now+0.1);
    gain.gain.setValueAtTime(0.15, now); gain.gain.linearRampToValueAtTime(0, now+0.3);
    osc.start(now); osc.stop(now+0.3);
  } else if(type==='wrong') {
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(250, now); osc.frequency.exponentialRampToValueAtTime(100, now+0.3);
    gain.gain.setValueAtTime(0.1, now); gain.gain.linearRampToValueAtTime(0, now+0.3);
    osc.start(now); osc.stop(now+0.3);
  } else if(type==='win') {
    osc.type = 'square'; osc.frequency.setValueAtTime(400, now); osc.frequency.setValueAtTime(600, now+0.1); osc.frequency.setValueAtTime(800, now+0.2);
    gain.gain.setValueAtTime(0.1, now); gain.gain.linearRampToValueAtTime(0, now+0.6);
    osc.start(now); osc.stop(now+0.6);
  } else if(type==='levelup') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(300, now); osc.frequency.linearRampToValueAtTime(900, now+0.4);
    gain.gain.setValueAtTime(0.2, now); gain.gain.linearRampToValueAtTime(0, now+0.8);
    osc.start(now); osc.stop(now+0.8);
  }
}

function speakWord(text) {
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const ut = new SpeechSynthesisUtterance(text);
  ut.lang = 'en-US';
  ut.rate = 0.85;
  ut.pitch = 1.1;
  window.speechSynthesis.speak(ut);
}

function transitionScreen(callback) {
  const ga = document.getElementById('gameArea');
  ga.style.opacity = '0';
  ga.style.transform = 'scale(0.98)';
  ga.style.transition = 'all 0.2s ease';
  setTimeout(() => {
    callback();
    ga.style.opacity = '1';
    ga.style.transform = 'scale(1)';
  }, 200);
}

function init(){
  // Sidebar nav
  const nav=document.getElementById('navInner');
  let navHtml = `<button class="mbtn on" data-home="true"><span class="em">🏠</span>Ana Menü</button>`;
  navHtml += MODES.map(m=>`<button class="mbtn" data-mode="${m.id}"><span class="em">${m.icon}</span>${m.name}</button>`).join('');
  nav.innerHTML = navHtml;
  nav.addEventListener('click',e=>{
    const b=e.target.closest('.mbtn');if(!b)return;
    document.querySelectorAll('.mbtn').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    if(b.dataset.mode) startGame(b.dataset.mode);
    else showWelcome();
    closeSidebar();
  });
  // Mobile menu
  const mobMenu=document.getElementById('mobMenu');
  const sbOverlay=document.getElementById('sbOverlay');
  if(mobMenu)mobMenu.onclick=()=>toggleSidebar();
  if(sbOverlay)sbOverlay.onclick=()=>closeSidebar();
  showWelcome();
}

function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sbOverlay').classList.toggle('open');
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sbOverlay').classList.remove('open');
}

function showWelcome(){
  document.getElementById('topTitle').textContent='Ana Menü';
  
  const categories = [
    {name: "Klasik Oyunlar", icon: "🎮", modes: ['hangman', 'scramble', 'quiz', 'fill']},
    {name: "Zaman Karşı", icon: "⏳", modes: ['speed', 'blitz', 'bee']},
    {name: "Zeka & Bulmaca", icon: "🧠", modes: ['crossword', 'memory', 'ladder', 'chain', 'synonym']}
  ];
  
  let html = `
    <div class="welcome-hero">
      <div class="hero-content">
        <h1 class="hero-title">Kelime Ustası'na Hoş Geldin! <span class="wave">👋</span></h1>
        <p class="hero-desc">6. Sınıf İngilizce kelimelerini oynayarak öğren. Harika animasyonlar ve 12 farklı eğlenceli mod seni bekliyor.</p>
        <button class="btn btn-p btn-lg" onclick="startGame('hangman')">Hemen Başla 🚀</button>
      </div>
      <div class="hero-image">
         <div class="floating-mascot">🧑‍🎓</div>
      </div>
    </div>
    <div class="game-categories">
  `;
  
  categories.forEach(cat => {
    html += `
      <div class="category-section">
        <h2 class="category-title">${cat.icon} ${cat.name}</h2>
        <div class="game-cards-grid">
    `;
    cat.modes.forEach(modeId => {
      const m = MODES.find(x => x.id === modeId);
      if(m) {
        html += `
          <div class="game-card" onclick="startGame('${m.id}')">
            <div class="gc-icon">${m.icon}</div>
            <div class="gc-info">
              <h3>${m.name}</h3>
              <div class="gc-play">Oyna <span class="arrow">➔</span></div>
            </div>
            <div class="gc-bg"></div>
          </div>
        `;
      }
    });
    html += `</div></div>`;
  });
  
  html += `</div>`;
  transitionScreen(() => {
    document.getElementById('gameArea').innerHTML = html;
  });
}

function startGame(mode){
  playSound('click');
  transitionScreen(() => {
    currentMode=mode;
    if(gameTimer){clearInterval(gameTimer);gameTimer=null;}
    const m=MODES.find(x=>x.id===mode);
    if(m)document.getElementById('topTitle').textContent=m.icon+' '+m.name;
    window['play_'+mode]();
  });
}

function updateStats(){
  document.getElementById('totalScore').textContent=totalScore;
  document.getElementById('streak').textContent=streak;
  document.getElementById('level').textContent=level;
  const ts2=document.getElementById('totalScore2');if(ts2)ts2.textContent=totalScore;
  const st2=document.getElementById('streak2');if(st2)st2.textContent=streak;
}
function addScore(p){
  playSound('correct');
  totalScore+=p;streak++;
  const newLevel=Math.floor(totalScore/300)+1;
  if(newLevel > level) {
    level = newLevel;
    playSound('levelup');
    showLevelUpPop();
  }
  updateStats();
  showScorePop('+'+p);
}
function wrongAnswer() {
  playSound('wrong');
  streak=0;
  updateStats();
  const card = document.querySelector('.card');
  if(card) {
    card.classList.remove('shake');
    void card.offsetWidth; // trigger reflow
    card.classList.add('shake');
  }
}
function resetStreak(){streak=0;updateStats();}
function showLevelUpPop() {
  const d=document.createElement('div');
  d.className='lvl-pop';
  d.innerHTML = `<div>🎉</div>SEVİYE ATLEDİN!<br><span>Seviye ${level}</span>`;
  document.body.appendChild(d);
  setTimeout(()=>d.remove(), 2500);
}
function showScorePop(t){const d=document.createElement('div');d.className='spop';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),800);}
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);}
function diffLabel(d){return['','Kolay','Orta','Zor'][d];}
function timerBar(p){return`<div class="tbar"><div class="tfill" style="width:${p}%"></div></div>`;}
function showResults(emoji,title,score,detail,mode){
  document.getElementById('gameArea').innerHTML=`<div class="card res">
    <div class="res-em">${emoji}</div><div class="res-t">${title}</div>
    <div class="res-sc">${score}</div><div class="res-d">${detail}</div>
    <div class="btn-row" style="justify-content:center">
      <button class="btn btn-p" onclick="startGame('${mode}')">Tekrar Oyna</button>
      <button class="btn btn-g" onclick="showWelcome()">Ana Menü</button>
    </div></div>`;
}

document.addEventListener('click', (e) => {
  if(e.target.closest('button') || e.target.closest('.game-card') || e.target.closest('.tile') || e.target.closest('.mcard') || e.target.closest('.hbtn') || e.target.closest('.qopt')) {
    playSound('click');
    createClickParticles(e.clientX, e.clientY);
  }
});
function createClickParticles(x, y) {
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'click-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    const angle = Math.random() * Math.PI * 2;
    const velocity = 25 + Math.random() * 40;
    particle.style.setProperty('--tx', (Math.cos(angle) * velocity) + 'px');
    particle.style.setProperty('--ty', (Math.sin(angle) * velocity) + 'px');
    const hue = [270, 175, 45, 340][Math.floor(Math.random() * 4)]; // Match theme colors
    particle.style.background = `hsl(${hue}, 90%, 65%)`;
    particle.style.boxShadow = `0 0 10px hsl(${hue}, 90%, 65%)`;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
  }
}

document.addEventListener('DOMContentLoaded',init);
