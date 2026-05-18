// ── UTILS ──
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function today() {
  return new Date().toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long'
  }).toUpperCase();
}

function getSessions() {
  return JSON.parse(localStorage.getItem('tSessions') || '[]');
}

function saveSessions(sessions) {
  localStorage.setItem('tSessions', JSON.stringify(sessions));
}

function addSession(data) {
  const sessions = getSessions();
  sessions.push(data);
  saveSessions(sessions);
}

function showConfirm(id, duration = 3000) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('on');
  setTimeout(() => el.classList.remove('on'), duration);
}

// ── THEME MANAGEMENT ──
function applyTheme(theme) {
  if (theme === 'militar') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem('theme', theme);
}

function getSavedTheme() {
  return localStorage.getItem('theme');
}

function initTheme() {
  const saved = getSavedTheme();
  if (!saved) {
    show('themePicker');
  } else {
    applyTheme(saved);
    show('menu');
  }
}

let selectedTheme = null;

function selectTheme(theme) {
  selectedTheme = theme;
  document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected-theme'));
  document.querySelector('.theme-card.' + theme).classList.add('selected-theme');
  applyTheme(theme);
}

function confirmTheme() {
  if (!selectedTheme) return;
  applyTheme(selectedTheme);
  show('menu');
}

function openThemePicker() {
  const current = getSavedTheme() || 'militar';
  selectedTheme = current;
  document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected-theme'));
  const card = document.querySelector('.theme-card.' + current);
  if (card) card.classList.add('selected-theme');
  show('themePicker');
}

// ── ICON HELPER ──
function getIconSuffix() {
  const theme = getSavedTheme() || 'militar';
  if (theme === 'militar') return '-militar';
  if (theme === 'zen') return '-zen';
  if (theme === 'arcade') return '-arcade';
  return ''; // harajuku = sin sufijo
}

function icon(id, size = 40) {
  const suffix = getIconSuffix();
  // Si no existe el icono con sufijo, usa el base
  return `<svg width="${size}" height="${size}" viewBox="0 0 48 48"><use href="#icon-${id}${suffix}"/></svg>`;
}
