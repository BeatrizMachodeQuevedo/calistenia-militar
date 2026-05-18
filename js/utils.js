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
const THEMES = ['militar', 'harajuku', 'zen', 'arcade'];

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
    // Primera vez — mostrar selector
    show('themePicker');
  } else {
    applyTheme(saved);
    show('menu');
  }
}

// Theme picker logic
let selectedTheme = null;

function selectTheme(theme) {
  selectedTheme = theme;
  document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected-theme'));
  document.querySelector('.theme-card.' + theme).classList.add('selected-theme');
  // Preview en tiempo real
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
