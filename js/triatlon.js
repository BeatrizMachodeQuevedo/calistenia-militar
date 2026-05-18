// ── TRIATLÓN LOGIC ──
let curDisc = null;
const feels = { sw: 0, bk: 0, wk: 0 };
const mols = { bk: '', wk: '' };
let bikeTer = '', histOn = false;

function selDisc(d) {
  curDisc = d;
  ['sw', 'bk', 'wk'].forEach(x => {
    document.getElementById('db-' + x).classList.toggle('active', x === d);
    document.getElementById('form-' + x).classList.toggle('active', x === d);
  });
  showSug(d);
}

function showSug(d) {
  const sessions = getSessions();
  const last = sessions.filter(x => x.disc === d).slice(-1)[0];
  const el = document.getElementById('triSug');
  const txt = document.getElementById('triSugTxt');
  el.classList.add('on');
  if (!last) {
    const def = {
      sw: 'Empieza con 20 largos suaves. Calentamiento + técnica + continuo.',
      bk: 'Empieza con 20 min en llano o estática a cadencia cómoda.',
      wk: 'Empieza con 20 min de caminata rápida con postura recta.'
    };
    txt.textContent = def[d]; return;
  }
  if (d === 'sw') {
    const t = last.total || 0;
    txt.textContent = t < 20 ? `Última: ${t} largos. Hoy: ${t + 2} largos.`
      : t > 30 ? `Última: ${t} largos. Hoy: ${t + 4} o serie extra.`
      : `Última: ${t} largos. Mantén volumen, mejora técnica.`;
  } else if (d === 'bk') {
    const t = last.time || 0, mol = last.mol === 'yes';
    txt.textContent = mol ? `Hubo molestias. Hoy: ${Math.max(10, t - 5)} min suave.`
      : t < 20 ? `Última: ${t} min. Hoy: ${t + 5} min.`
      : `Última: ${t} min. Añade 5 min o tramo más rápido.`;
  } else {
    const t = last.time || 0, mol = last.mol === 'yes';
    txt.textContent = mol ? `Hubo molestias. Hoy: ${Math.max(15, t - 5)} min más suave.`
      : t < 30 ? `Última: ${t} min. Hoy: ${t + 5} min.`
      : `Última: ${t} min. Añade 5 min o sube ritmo.`;
  }
}

function setFeel(d, v) {
  feels[d] = v;
  document.querySelectorAll(`#${d}-feel .feel-btn`).forEach((b, i) => b.classList.toggle('sel', i + 1 === v));
}

function setTer(t) {
  bikeTer = t;
  ['est', 'lla', 'sub'].forEach(k => document.getElementById('ter-' + k).classList.toggle('sel', k === t));
}

function setMol(d, v) {
  mols[d] = v;
  document.getElementById(`${d}-mol-no`).className = 'mol-btn' + (v === 'no' ? ' sel-no' : '');
  document.getElementById(`${d}-mol-yes`).className = 'mol-btn' + (v === 'yes' ? ' sel-yes' : '');
}

function saveTri(d) {
  const data = { date: new Date().toISOString(), type: 'tri', disc: d };
  if (d === 'sw') {
    data.total = +document.getElementById('sw-tot').value || 0;
    data.tec = +document.getElementById('sw-tec').value || 0;
    data.cont = +document.getElementById('sw-cont').value || 0;
    data.ser = +document.getElementById('sw-ser').value || 0;
    data.time = +document.getElementById('sw-time').value || 0;
    data.feel = feels.sw;
  } else if (d === 'bk') {
    data.time = +document.getElementById('bk-time').value || 0;
    data.ter = bikeTer;
    data.feel = feels.bk;
    data.mol = mols.bk;
  } else {
    data.time = +document.getElementById('wk-time').value || 0;
    data.dist = +document.getElementById('wk-dist').value || 0;
    data.feel = feels.wk;
    data.mol = mols.wk;
  }
  addSession(data);
  showConfirm('ok-' + d);
  showSug(d);
}

function toggleHist() {
  histOn = !histOn;
  const p = document.getElementById('histPanel');
  p.classList.toggle('on', histOn);
  if (histOn) renderHist();
}

function renderHist() {
  const sessions = getSessions();
  const tri = sessions.filter(x => x.type === 'tri').slice(-10).reverse();
  const p = document.getElementById('histPanel');
  if (!tri.length) {
    p.innerHTML = '<div style="font-size:13px;color:var(--text3);text-align:center;padding:16px;">Sin sesiones aún</div>';
    return;
  }
  const ico = { sw: '🏊', bk: '🚴', wk: '🚶' };
  const nm = { sw: 'NATACIÓN', bk: 'BICI', wk: 'CAMINAR' };
  p.innerHTML = tri.map(s => {
    const d = new Date(s.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    let det = '';
    if (s.disc === 'sw') det = `${s.total} largos · ${s.time} min · Sensación ${s.feel}/5`;
    else if (s.disc === 'bk') det = `${s.time} min · ${s.ter || '—'} · Sensación ${s.feel}/5${s.mol === 'yes' ? ' · ⚠️ molestias' : ''}`;
    else det = `${s.time} min${s.dist ? ' · ' + s.dist + ' km' : ''} · Sensación ${s.feel}/5${s.mol === 'yes' ? ' · ⚠️ molestias' : ''}`;
    return `<div class="hist-item">
      <div class="hist-date">${d}</div>
      <div class="hist-disc">${ico[s.disc]} ${nm[s.disc]}</div>
      <div class="hist-detail">${det}</div>
    </div>`;
  }).join('');
}
