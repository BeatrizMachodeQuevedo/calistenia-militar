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
