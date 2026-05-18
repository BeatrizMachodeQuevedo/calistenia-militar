// ── APP INIT ──

// Map exercise names to icon IDs
const EXERCISE_ICONS = {
  'flexiones': 'flexiones',
  'plancha': 'plancha',
  'sentadilla': 'sentadilla',
  'zancada': 'zancada',
  'puente': 'puente',
  'marcha': 'marcha',
  'boxing': 'boxing',
  'rodillas': 'rodillas',
  'skaters': 'skaters',
};

function getExerciseIcon(name) {
  const n = name.toLowerCase();
  if (n.includes('flexion')) return 'flexiones';
  if (n.includes('plancha')) return 'plancha';
  if (n.includes('sentadilla') || n.includes('wall sit')) return 'sentadilla';
  if (n.includes('zancada')) return 'zancada';
  if (n.includes('puente')) return 'puente';
  if (n.includes('marcha')) return 'marcha';
  if (n.includes('boxing') || n.includes('shadow')) return 'boxing';
  if (n.includes('rodillas')) return 'rodillas';
  if (n.includes('skater')) return 'skaters';
  return null;
}

document.getElementById('screen-container').innerHTML = `

<!-- THEME PICKER -->
<div id="themePicker" class="screen active">
  <div class="tp-title">ELIGE TU ESTILO ✨</div>
  <div class="tp-sub">Podrás cambiarlo cuando quieras</div>
  <div class="theme-cards">
    <div class="theme-card harajuku" onclick="selectTheme('harajuku')">
      <div class="tc-name">🌸 Neon Harajuku</div>
      <div class="tc-desc">Energía pop · Rosa chicle · Turquesa eléctrico</div>
      <div class="tc-dots">
        <div class="tc-dot" style="background:#FF4B91;"></div>
        <div class="tc-dot" style="background:#00D2C4;"></div>
        <div class="tc-dot" style="background:#FFCD38;"></div>
        <div class="tc-dot" style="background:#8B5CF6;"></div>
      </div>
    </div>
    <div class="theme-card zen" onclick="selectTheme('zen')">
      <div class="tc-name">☁️ Shibuya Zen</div>
      <div class="tc-desc">Minimalismo pastel · Lavanda · Melocotón · Verde matcha</div>
      <div class="tc-dots">
        <div class="tc-dot" style="background:#8B5CF6;"></div>
        <div class="tc-dot" style="background:#FF8A65;"></div>
        <div class="tc-dot" style="background:#4ADE80;"></div>
        <div class="tc-dot" style="background:#FFF9F5;border:1px solid #ddd;"></div>
      </div>
    </div>
    <div class="theme-card arcade" onclick="selectTheme('arcade')">
      <div class="tc-name">🕹️ Tokyo Arcade</div>
      <div class="tc-desc">Retro-moderno · Rojo coral · Azul anime · Amarillo</div>
      <div class="tc-dots">
        <div class="tc-dot" style="background:#FF5A5F;"></div>
        <div class="tc-dot" style="background:#3B82F6;"></div>
        <div class="tc-dot" style="background:#F59E0B;"></div>
        <div class="tc-dot" style="background:#FFFDF0;border:2px solid #333;"></div>
      </div>
    </div>
    <div class="theme-card militar" onclick="selectTheme('militar')">
      <div class="tc-name">⚡ MILITAR</div>
      <div class="tc-desc">// MODO OSCURO · ALTA INTENSIDAD · CERO CONCESIONES</div>
      <div class="tc-dots">
        <div class="tc-dot" style="background:#7a9445;"></div>
        <div class="tc-dot" style="background:#f5b942;"></div>
        <div class="tc-dot" style="background:#3aaecf;"></div>
        <div class="tc-dot" style="background:#a855d4;"></div>
      </div>
    </div>
  </div>
  <button class="btn-apply" onclick="confirmTheme()">APLICAR TEMA</button>
</div>

<!-- MENU -->
<div id="menu" class="screen">
  <div class="menu-grid"></div>
  <div class="menu-top">
    <span class="menu-tag">▶ TRAINING HQ</span>
    <div style="display:flex;align-items:center;gap:8px;">
      <span class="menu-tag" id="menuDate"></span>
      <button class="btn-settings" onclick="openThemePicker()" title="Cambiar tema">🎨</button>
    </div>
  </div>
  <div class="menu-body">
    <div class="app-title">TRAINING<span>HEADQUARTERS</span></div>
    <div class="divider"></div>
    <div class="menu-modules">
      <div class="mod-card cali" onclick="show('cali')">
        <div class="mod-icon" id="menuIconCali"></div>
        <div class="mod-info"><div class="mod-name">CALISTENIA</div><div class="mod-desc">Militar · Sin impacto · 2 niveles</div></div>
        <div class="mod-arr">▶</div>
      </div>
      <div class="mod-card gym" onclick="show('gym')">
        <div class="mod-icon" id="menuIconGym"></div>
        <div class="mod-info"><div class="mod-name">GYM — TREN INFERIOR</div><div class="mod-desc">Registro peso y reps · Protección rodilla</div></div>
        <div class="mod-arr">▶</div>
      </div>
      <div class="mod-card tri" onclick="show('tri')">
        <div class="mod-icon" id="menuIconTri"></div>
        <div class="mod-info"><div class="mod-name">TRIATLÓN</div><div class="mod-desc">Natación · Bici · Caminar · Progresión</div></div>
        <div class="mod-arr">▶</div>
      </div>
    </div>
  </div>
</div>

<!-- CALISTENIA -->
<div id="cali" class="screen">
  <div class="topbar"><button class="btn-back" onclick="show('menu')">← MENÚ</button><div class="scr-title cali">CALISTENIA</div><button class="btn-sm" onclick="openModal()">INFO</button></div>
  <div class="cali-body">
    <div class="lv-selector">
      <div class="lv-card lv1 selected" onclick="selectLv(1)"><div class="lv-badge">NIVEL 1</div><div class="lv-info"><div class="lv-name">Protección Total</div><div class="lv-desc">Rodilla · Espalda · Cuello</div></div><div class="lv-stats"><div class="lsv">~9'</div><div class="lsl">min</div></div></div>
      <div class="lv-card lv2" onclick="selectLv(2)"><div class="lv-badge">NIVEL 2</div><div class="lv-info"><div class="lv-name">Intermedio</div><div class="lv-desc">Fuerza · Core · Cardio</div></div><div class="lv-stats"><div class="lsv">~9'</div><div class="lsl">min</div></div></div>
    </div>
    <button class="btn-start" onclick="startCD()">INICIAR</button>
    <button class="btn-sm" style="margin-top:14px;" onclick="openModal()">VER EJERCICIOS</button>
  </div>
</div>

<!-- WORKOUT -->
<div id="workout" class="screen">
  <div class="ph-bg exercise on" id="phBg"></div>
  <div class="topbar" style="position:relative;z-index:2;">
    <button class="btn-back" onclick="exitWorkout()">← SALIR</button>
    <div class="ex-ctr">EJ <span id="exN">1</span>/<span id="exT">14</span></div>
    <div class="lv-ind lv1" id="lvInd">NV1</div>
  </div>
  <div class="prog-track"><div class="prog-fill" id="progFill" style="width:0%"></div></div>
  <div class="w-main">
    <div class="ph-tag exercise" id="phTag">TRABAJO</div>
    <div class="ex-nm">
      <div class="ex-icon" id="exIcon"></div>
      <h2 id="exName">...</h2>
      <div class="side-tag" id="sideTg"></div>
      <div class="ex-tecnica" id="exTecnica"></div>
    </div>
    <div class="ring-row">
      <button class="btn-pause" id="btnPause" onclick="togglePause()"><div class="bp-icon" id="bpIco">⏸</div><div class="bp-lbl" id="bpLbl">PAUSA</div></button>
      <div class="ring-wrap">
        <svg viewBox="0 0 158 158" width="158" height="158">
          <circle class="rng-bg" cx="79" cy="79" r="72"/>
          <circle class="rng-fill exercise" id="rngFill" cx="79" cy="79" r="72" stroke-dasharray="452" stroke-dashoffset="0"/>
        </svg>
        <div class="t-inner"><div class="t-num exercise" id="tNum">30</div><div class="t-unit">SEG</div></div>
      </div>
      <button class="btn-skip" onclick="skipPh()"><div class="bs-icon">▶▶</div><div class="bs-lbl">SKIP</div></button>
    </div>
    <div class="nxt-panel">
      <div class="np-lbl">// SIGUIENTE</div>
      <div class="np-nxt" id="npNxt">—</div>
      <div class="np-side" id="npSide"></div>
      <div class="np-paused" id="npPaused">⏸ EN PAUSA</div>
    </div>
    <div class="dots-row" id="dotsRow"></div>
  </div>
</div>

<!-- DONE -->
<div id="done" class="screen">
  <div class="done-ico">🎖️</div>
  <div class="done-ttl">MISIÓN<br>CUMPLIDA</div>
  <div class="done-sub" id="doneSub">Nivel 1 completado</div>
  <div class="done-stats"><div class="done-stat"><div class="v">14</div><div class="l">Ejercicios</div></div><div class="done-stat"><div class="v">9</div><div class="l">Minutos</div></div></div>
  <button class="btn-again" onclick="startCD()">REPETIR</button>
  <button class="btn-sm" style="margin-top:10px;" onclick="show('cali')">CAMBIAR NIVEL</button>
  <button class="btn-sm" style="margin-top:6px;" onclick="show('menu')">MENÚ</button>
</div>

<!-- GYM -->
<div id="gym" class="screen">
  <div class="topbar"><button class="btn-back" onclick="show('menu')">← MENÚ</button><div class="scr-title gym">TREN INFERIOR</div><span style="width:60px;"></span></div>
  <div class="gym-body">
    <div class="gym-date" id="gymDate"></div>
    <div class="sec-hdr" style="margin-top:0;">// CALENTAMIENTO</div>
    <div class="gym-ex">
      <div class="gym-ex-nm">Bicicleta Estática</div>
      <div class="gym-ex-desc">5 min suave · cadencia alta · resistencia baja</div>
      <div class="s-row">
        <div class="s-lbl">Min</div>
        <div class="inp-grp"><input class="g-inp" type="number" placeholder="5" id="cal-min"><div class="g-inp-lbl">MINUTOS</div></div>
        <div class="inp-sep" style="opacity:0">×</div>
        <div class="inp-grp"><input class="g-inp" type="number" placeholder="1" id="cal-res"><div class="g-inp-lbl">RESISTENCIA</div></div>
      </div>
    </div>
    <div class="sec-hdr">// FUERZA · MÁQUINAS</div>
    <div class="gym-ex"><div class="gym-ex-nm">Prensa Inclinada</div><div class="gym-ex-desc">Pies arriba y abiertos · Bajar a 90° · Sin bloquear</div><div id="sr-prensa"></div><button class="btn-add" onclick="addS('prensa')">+ AÑADIR SERIE</button><textarea class="g-notes" rows="2" placeholder="Notas..." id="nt-prensa"></textarea></div>
    <div class="gym-ex"><div class="gym-ex-nm">Extensión de Cuádriceps</div><div class="gym-ex-desc">2s subir · 3s bajar · No bloquear rodilla</div><div id="sr-cuad"></div><button class="btn-add" onclick="addS('cuad')">+ AÑADIR SERIE</button><textarea class="g-notes" rows="2" placeholder="Notas..." id="nt-cuad"></textarea></div>
    <div class="gym-ex"><div class="gym-ex-nm">Curl Femoral</div><div class="gym-ex-desc">Mantener 1s abajo · Controlar bajada</div><div id="sr-curl"></div><button class="btn-add" onclick="addS('curl')">+ AÑADIR SERIE</button><textarea class="g-notes" rows="2" placeholder="Notas..." id="nt-curl"></textarea></div>
    <div class="gym-ex"><div class="gym-ex-nm">Abductores</div><div class="gym-ex-desc">Abre y mantén 1s · Movimiento lento</div><div id="sr-abdu"></div><button class="btn-add" onclick="addS('abdu')">+ AÑADIR SERIE</button><textarea class="g-notes" rows="2" placeholder="Notas..." id="nt-abdu"></textarea></div>
    <div class="gym-ex"><div class="gym-ex-nm">Aductores</div><div class="gym-ex-desc">Movimiento lento y controlado · No cerrar de golpe</div><div id="sr-addu"></div><button class="btn-add" onclick="addS('addu')">+ AÑADIR SERIE</button><textarea class="g-notes" rows="2" placeholder="Notas..." id="nt-addu"></textarea></div>
    <div class="gym-ex"><div class="gym-ex-nm">Glúteo en Máquina</div><div class="gym-ex-desc">Empuja con talón · Mantén 1s arriba · Sin arquear espalda</div><div id="sr-glut"></div><button class="btn-add" onclick="addS('glut')">+ AÑADIR SERIE</button><textarea class="g-notes" rows="2" placeholder="Notas..." id="nt-glut"></textarea></div>
    <div class="sec-hdr">// CORE PROTECTOR</div>
    <div class="gym-ex"><div class="gym-ex-nm">Bird-Dog</div><div class="gym-ex-desc">A cuatro patas · Brazo + pierna contrarios · Cadera estable</div><div id="sr-bird"></div><button class="btn-add" onclick="addS('bird')">+ AÑADIR SERIE</button><textarea class="g-notes" rows="2" placeholder="Notas..." id="nt-bird"></textarea></div>
    <div class="gym-ex"><div class="gym-ex-nm">Dead Bug</div><div class="gym-ex-desc">Boca arriba · Pierna + brazo contrarios · No arquear espalda</div><div id="sr-dead"></div><button class="btn-add" onclick="addS('dead')">+ AÑADIR SERIE</button><textarea class="g-notes" rows="2" placeholder="Notas..." id="nt-dead"></textarea></div>
    <div class="gym-ex"><div class="gym-ex-nm">Plancha</div><div class="gym-ex-desc">Abdomen firme · No hundir lumbar</div><div id="sr-plancha"></div><button class="btn-add" onclick="addS('plancha',true)">+ AÑADIR SERIE</button><textarea class="g-notes" rows="2" placeholder="Notas..." id="nt-plancha"></textarea></div>
    <button class="btn-save-gym" onclick="saveGym()">GUARDAR SESIÓN</button>
    <div class="save-ok" id="gymOk">✓ SESIÓN GUARDADA</div>
    <div style="height:20px;"></div>
  </div>
</div>

<!-- TRIATLÓN -->
<div id="tri" class="screen">
  <div class="topbar"><button class="btn-back" onclick="show('menu')">← MENÚ</button><div class="scr-title tri">TRIATLÓN</div><span style="width:60px;"></span></div>
  <div class="tri-body">
    <div class="tri-date" id="triDate"></div>
    <div class="disc-sel">
      <div class="disc-btn sw" onclick="selDisc('sw')" id="db-sw"><div class="disc-icon" id="iconSw"></div><div class="disc-nm">NATACIÓN</div></div>
      <div class="disc-btn bk" onclick="selDisc('bk')" id="db-bk"><div class="disc-icon" id="iconBk"></div><div class="disc-nm">BICI</div></div>
      <div class="disc-btn wk" onclick="selDisc('wk')" id="db-wk"><div class="disc-icon" id="iconWk"></div><div class="disc-nm">CAMINAR</div></div>
    </div>
    <div class="tri-sug" id="triSug"><div class="tri-sug-lbl">// OBJETIVO HOY</div><div class="tri-sug-txt" id="triSugTxt"></div></div>
    <div class="tri-form" id="form-sw">
      <div class="tri-sec">// REGISTRO NATACIÓN</div>
      <div class="tri-fld"><label class="tri-fld-lbl">LARGOS TOTALES</label><input class="tri-inp" type="number" placeholder="0" id="sw-tot"></div>
      <div class="tri-fld"><label class="tri-fld-lbl">LARGOS TÉCNICA</label><input class="tri-inp sm" type="number" placeholder="0" id="sw-tec"></div>
      <div class="tri-fld"><label class="tri-fld-lbl">LARGOS CONTINUO</label><input class="tri-inp sm" type="number" placeholder="0" id="sw-cont"></div>
      <div class="tri-fld"><label class="tri-fld-lbl">LARGOS SERIES</label><input class="tri-inp sm" type="number" placeholder="0" id="sw-ser"></div>
      <div class="tri-fld"><label class="tri-fld-lbl">TIEMPO TOTAL (MIN)</label><input class="tri-inp sm" type="number" placeholder="0" id="sw-time"></div>
      <div class="tri-fld"><label class="tri-fld-lbl">SENSACIÓN (1–5)</label><div class="feel-row" id="sw-feel"><div class="feel-btn" onclick="setFeel('sw',1)">1</div><div class="feel-btn" onclick="setFeel('sw',2)">2</div><div class="feel-btn" onclick="setFeel('sw',3)">3</div><div class="feel-btn" onclick="setFeel('sw',4)">4</div><div class="feel-btn" onclick="setFeel('sw',5)">5</div></div></div>
      <button class="btn-save-tri" onclick="saveTri('sw')">GUARDAR SESIÓN</button>
      <div class="tri-ok" id="ok-sw">✓ SESIÓN GUARDADA</div>
    </div>
    <div class="tri-form" id="form-bk">
      <div class="tri-sec">// REGISTRO BICI</div>
      <div class="tri-fld"><label class="tri-fld-lbl">TIEMPO TOTAL (MIN)</label><input class="tri-inp" type="number" placeholder="0" id="bk-time"></div>
      <div class="tri-fld"><label class="tri-fld-lbl">TERRENO</label><div class="ter-row"><div class="ter-btn" id="ter-est" onclick="setTer('est')">ESTÁTICA</div><div class="ter-btn" id="ter-lla" onclick="setTer('lla')">LLANO</div><div class="ter-btn" id="ter-sub" onclick="setTer('sub')">SUBIDA</div></div></div>
      <div class="tri-fld"><label class="tri-fld-lbl">SENSACIÓN (1–5)</label><div class="feel-row" id="bk-feel"><div class="feel-btn" onclick="setFeel('bk',1)">1</div><div class="feel-btn" onclick="setFeel('bk',2)">2</div><div class="feel-btn" onclick="setFeel('bk',3)">3</div><div class="feel-btn" onclick="setFeel('bk',4)">4</div><div class="feel-btn" onclick="setFeel('bk',5)">5</div></div></div>
      <div class="tri-fld"><label class="tri-fld-lbl">MOLESTIAS</label><div class="mol-row"><div class="mol-btn" id="bk-mol-no" onclick="setMol('bk','no')">SIN MOLESTIAS</div><div class="mol-btn" id="bk-mol-yes" onclick="setMol('bk','yes')">HAY MOLESTIAS</div></div></div>
      <button class="btn-save-tri" onclick="saveTri('bk')">GUARDAR SESIÓN</button>
      <div class="tri-ok" id="ok-bk">✓ SESIÓN GUARDADA</div>
    </div>
    <div class="tri-form" id="form-wk">
      <div class="tri-sec">// REGISTRO CAMINATA</div>
      <div class="tri-fld"><label class="tri-fld-lbl">TIEMPO TOTAL (MIN)</label><input class="tri-inp" type="number" placeholder="0" id="wk-time"></div>
      <div class="tri-fld"><label class="tri-fld-lbl">DISTANCIA (KM) — OPCIONAL</label><input class="tri-inp sm" type="number" placeholder="0.0" step="0.1" id="wk-dist"></div>
      <div class="tri-fld"><label class="tri-fld-lbl">SENSACIÓN (1–5)</label><div class="feel-row" id="wk-feel"><div class="feel-btn" onclick="setFeel('wk',1)">1</div><div class="feel-btn" onclick="setFeel('wk',2)">2</div><div class="feel-btn" onclick="setFeel('wk',3)">3</div><div class="feel-btn" onclick="setFeel('wk',4)">4</div><div class="feel-btn" onclick="setFeel('wk',5)">5</div></div></div>
      <div class="tri-fld"><label class="tri-fld-lbl">MOLESTIAS</label><div class="mol-row"><div class="mol-btn" id="wk-mol-no" onclick="setMol('wk','no')">SIN MOLESTIAS</div><div class="mol-btn" id="wk-mol-yes" onclick="setMol('wk','yes')">HAY MOLESTIAS</div></div></div>
      <button class="btn-save-tri" onclick="saveTri('wk')">GUARDAR SESIÓN</button>
      <div class="tri-ok" id="ok-wk">✓ SESIÓN GUARDADA</div>
    </div>
    <button class="hist-btn" onclick="toggleHist()">VER HISTORIAL</button>
    <div class="hist-panel" id="histPanel"></div>
    <div style="height:20px;"></div>
  </div>
</div>
`;

// Init dates
document.getElementById('menuDate').textContent = today();
document.getElementById('gymDate').textContent = '// ' + today();
document.getElementById('triDate').textContent = '// ' + today();

// Init gym series
initGym();

// Init theme
initTheme();

// Init menu icons (after theme is set)
function initMenuIcons() {
  document.getElementById('menuIconCali').innerHTML = icon('calistenia', 40);
  document.getElementById('menuIconGym').innerHTML = icon('gym', 40);
  document.getElementById('menuIconTri').innerHTML = icon('tri', 40);
  document.getElementById('iconSw').innerHTML = icon('natacion', 32);
  document.getElementById('iconBk').innerHTML = icon('bici', 32);
  document.getElementById('iconWk').innerHTML = icon('caminar', 32);
}

// Slight delay to ensure theme is applied before icons load
setTimeout(initMenuIcons, 50);

// Override selectTheme to also update icons
const _origSelectTheme = selectTheme;
selectTheme = function(theme) {
  _origSelectTheme(theme);
  setTimeout(initMenuIcons, 50);
};

const _origConfirmTheme = confirmTheme;
confirmTheme = function() {
  _origConfirmTheme();
  setTimeout(initMenuIcons, 50);
};
