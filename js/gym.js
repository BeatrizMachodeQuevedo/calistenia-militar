// ── GYM LOGIC ──
const gymCounts = {};

function addS(key, isTime = false) {
  if (!gymCounts[key]) gymCounts[key] = 0;
  gymCounts[key]++;
  const n = gymCounts[key];
  const c = document.getElementById('sr-' + key);
  const r = document.createElement('div');
  r.className = 's-row';
  if (isTime) {
    r.innerHTML = `<div class="s-lbl">S${n}</div>
      <div class="inp-grp"><input class="g-inp" type="number" placeholder="30" id="${key}-s${n}-seg"><div class="g-inp-lbl">SEGUNDOS</div></div>`;
  } else {
    r.innerHTML = `<div class="s-lbl">S${n}</div>
      <div class="inp-grp"><input class="g-inp" type="number" placeholder="0" id="${key}-s${n}-kg"><div class="g-inp-lbl">KG</div></div>
      <div class="inp-sep">×</div>
      <div class="inp-grp"><input class="g-inp" type="number" placeholder="0" id="${key}-s${n}-rp"><div class="g-inp-lbl">REPS</div></div>`;
  }
  c.appendChild(r);
}

function initGym() {
  ['prensa', 'cuad', 'curl', 'abdu', 'addu', 'glut'].forEach(k => { addS(k); addS(k); addS(k); });
  ['bird', 'dead'].forEach(k => { addS(k); addS(k); addS(k); });
  addS('plancha', true); addS('plancha', true);
}

function saveGym() {
  addSession({ date: new Date().toISOString(), type: 'gym' });
  showConfirm('gymOk');
}
