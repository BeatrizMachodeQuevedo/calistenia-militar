// ── CALISTENIA LOGIC ──
const CIRC = 452, WORK = 30, REST = 10;
let selLv = 1, seq = [], cur = 0, ph = 'exercise';
let tLeft = WORK, ticker = null, paused = false, ac = null;

function selectLv(n) {
  selLv = n;
  document.querySelectorAll('.lv-card').forEach((c, i) => c.classList.toggle('selected', i + 1 === n));
}

function audio() {
  if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
}

function beep(f = 880, d = 0.12, v = 0.35) {
  try {
    const o = ac.createOscillator(), g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.frequency.value = f; o.type = 'square';
    g.gain.setValueAtTime(v, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + d);
    o.start(); o.stop(ac.currentTime + d);
  } catch (e) {}
}

function bStart() { beep(660, 0.1); setTimeout(() => beep(880, 0.15), 120); }
function bRest() { beep(440, 0.2, 0.3); }
function bDone() { [0, 200, 400, 700].forEach((d, i) => setTimeout(() => beep([523, 659, 784, 1047][i], 0.25), d)); }

function startCD() {
  audio(); show('cali');
  const ov = document.getElementById('cdOv'), nm = document.getElementById('cdN');
  ov.classList.add('on'); let n = 3; nm.textContent = n; beep(440, 0.1);
  const iv = setInterval(() => {
    n--;
    if (n <= 0) { clearInterval(iv); ov.classList.remove('on'); beginW(); }
    else { nm.textContent = n; nm.style.animation = 'none'; void nm.offsetWidth; nm.style.animation = 'cdpop 1s ease-out'; beep(440, 0.1); }
  }, 1000);
}

function beginW() {
  seq = selLv === 1 ? L1 : L2;
  cur = 0; ph = 'exercise'; tLeft = WORK; paused = false;
  const li = document.getElementById('lvInd');
  li.textContent = 'NV' + selLv; li.className = 'lv-ind lv' + selLv;
  document.getElementById('exT').textContent = seq.length;
  document.getElementById('doneSub').textContent = 'Nivel ' + selLv + ' completado';
  buildDots(); updUI(); show('workout'); bStart(); tick();
}

function tick() {
  clearInterval(ticker);
  ticker = setInterval(() => {
    if (paused) return;
    tLeft--;
    if (tLeft <= 3 && tLeft > 0) beep(600, 0.07, 0.18);
    if (tLeft <= 0) { nextPh(); return; }
    updTimer();
  }, 1000);
}

function nextPh() {
  if (ph === 'exercise') {
    if (cur >= seq.length - 1) { clearInterval(ticker); bDone(); show('done'); return; }
    ph = 'rest'; tLeft = REST; bRest();
  } else {
    cur++; ph = 'exercise'; tLeft = WORK; bStart();
  }
  updUI(); updTimer();
}

function updUI() {
  const isW = ph === 'exercise', ex = seq[cur];

  document.getElementById('phTag').textContent = isW ? 'TRABAJO' : 'DESCANSO';
  document.getElementById('phTag').className = 'ph-tag ' + ph;
  document.getElementById('phBg').className = 'ph-bg ' + ph + ' on';
  document.getElementById('exName').textContent = isW ? ex.name : '— DESCANSA —';
  document.getElementById('exN').textContent = cur + 1;

  // Icono del ejercicio
  const iconEl = document.getElementById('exIcon');
  if (isW) {
    const iconId = getExerciseIcon(ex.name);
    iconEl.innerHTML = iconId ? icon(iconId, 48) : '';
    iconEl.style.display = iconId ? 'flex' : 'none';
  } else {
    iconEl.innerHTML = '';
    iconEl.style.display = 'none';
  }

  // Técnica clave
  const tecEl = document.getElementById('exTecnica');
  if (isW && ex.tecnica) {
    tecEl.textContent = ex.tecnica;
    tecEl.style.display = 'block';
  } else {
    tecEl.textContent = '';
    tecEl.style.display = 'none';
  }

  const st = document.getElementById('sideTg');
  if (isW && ex.side) { st.textContent = ex.side; st.className = 'side-tag on'; }
  else { st.className = 'side-tag'; }

  const ni = cur + 1, nxt = ni < seq.length ? seq[ni] : null;
  document.getElementById('npNxt').textContent = nxt ? nxt.name : '¡ÚLTIMO EJERCICIO!';
  document.getElementById('npSide').textContent = nxt && nxt.side ? nxt.side : '';

  document.getElementById('progFill').style.width = (cur / seq.length * 100) + '%';
  document.getElementById('rngFill').className = 'rng-fill ' + ph;

  updDots(); updTimer();
}

function updTimer() {
  const mx = ph === 'exercise' ? WORK : REST;
  document.getElementById('rngFill').style.strokeDashoffset = CIRC * (1 - tLeft / mx);
  const n = document.getElementById('tNum');
  n.textContent = tLeft;
  n.className = 't-num ' + (tLeft <= 3 ? 'urgent' : ph);
}

function buildDots() {
  document.getElementById('dotsRow').innerHTML = seq.map((_, i) => `<div class="dot" id="d${i}"></div>`).join('');
}

function updDots() {
  seq.forEach((_, i) => {
    const d = document.getElementById('d' + i);
    if (d) d.className = 'dot' + (i < cur ? ' done' : i === cur ? ' curr' : '');
  });
}

function togglePause() {
  paused = !paused;
  document.getElementById('bpIco').textContent = paused ? '▶' : '⏸';
  document.getElementById('bpLbl').textContent = paused ? 'SEGUIR' : 'PAUSA';
  document.getElementById('npPaused').className = 'np-paused' + (paused ? ' on' : '');
}

function skipPh() { tLeft = 0; nextPh(); }
function exitWorkout() { clearInterval(ticker); paused = false; show('cali'); }

function openModal() { showModalLv(selLv); document.getElementById('exModal').classList.add('on'); }
function closeModal() { document.getElementById('exModal').classList.remove('on'); }
function showModalLv(n) {
  ['tab1', 'tab2'].forEach((id, i) => {
    document.getElementById(id).className = 'tab-btn' + (i + 1 === n ? ' active lv' + n : '');
  });
  const list = n === 1 ? L1 : L2;
  document.getElementById('modalContent').innerHTML = list.map((e, i) => {
    const iconId = getExerciseIcon(e.name);
    return `<div class="hw-ex">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
        ${iconId ? icon(iconId, 36) : ''}
        <div>
          <div class="hw-num">// EJ ${String(i + 1).padStart(2, '0')}${e.side ? ' · ' + e.side : ''}</div>
          <div class="hw-name">${e.name}</div>
        </div>
      </div>
      <div class="hw-how">${e.how}</div>
      ${e.tecnica ? `<div style="font-size:11px;color:var(--accent2);margin-top:5px;letter-spacing:1px;">⚡ ${e.tecnica}</div>` : ''}
      <div class="hw-feel">💪 ${e.feel}</div>
    </div>`;
  }).join('');
}
