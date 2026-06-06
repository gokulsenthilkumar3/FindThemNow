// ===== MAIN APPLICATION =====

// --- XSS Sanitizer (SEC-01) ---
function sanitize(str) {
  if (str == null) return '';
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

// --- Splash Screen ---
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splashScreen').classList.add('hidden');
    navigate('home');
  }, 2200);
});

// --- Theme ---
const MOON_ICON = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
const SUN_ICON  = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

function toggleTheme() {
  const isLight = document.body.hasAttribute('data-theme');
  if (isLight) {
    document.body.removeAttribute('data-theme');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0A0E1A');
    document.getElementById('themeIcon').innerHTML = MOON_ICON;
  } else {
    document.body.setAttribute('data-theme', 'light');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#F8FAFC');
    document.getElementById('themeIcon').innerHTML = SUN_ICON;
  }
}

// --- Mobile Nav ---
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('show');
  document.getElementById('mobileNavOverlay').classList.toggle('show');
  const hb = document.getElementById('hamburger');
  hb.classList.toggle('active');
  hb.setAttribute('aria-expanded', hb.classList.contains('active') ? 'true' : 'false');
}

// --- Toast ---
let _toastTimer;
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  const icons = { success: '✅', warning: '⚠️', danger: '🆘', info: 'ℹ️' };
  document.getElementById('toastIcon').textContent = icons[type] || '✅';
  document.getElementById('toastMsg').textContent = msg;
  clearTimeout(_toastTimer);
  t.classList.add('show');
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

// --- Modal (A11Y-02: role=dialog, focus management) ---
function showModal(html) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  content.innerHTML = `<button class="modal-close" onclick="closeModal()" aria-label="Close dialog">✕</button>` + html;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Person details');
  overlay.classList.add('show');
  // Move focus into modal
  requestAnimationFrame(() => content.querySelector('.modal-close')?.focus());
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
document.addEventListener('click', e => { if (e.target.id === 'modalOverlay') closeModal(); });

// ============ PAGE RENDERERS ============

function renderHome() {
  return `<div class="page">
  <section class="hero">
    <div class="hero-inner">
      <div>
        <div class="hero-badge">🌐 AI-Powered · Global Missing Persons Platform</div>
        <h1>Every second counts.<br><em>Every face</em> matters.</h1>
        <div class="hero-sub">Upload a photo or use live camera. Our AI matches missing persons using facial recognition, fingerprints, iris patterns, scars, moles, and 8+ biometric markers — in seconds.</div>
        <div class="hero-actions">
          <button class="btn-primary" onclick="navigate('scanner')" aria-label="Start live camera scan">📹 Live Camera Scan</button>
          <button class="btn-secondary" onclick="navigate('search')" aria-label="Search by photo upload">🔍 Search by Photo</button>
          <button class="btn-danger" onclick="navigate('emergency')" aria-label="View emergency services">🆘 Emergency Services</button>
        </div>
        <div class="hero-stats">
          <div><span class="stat-num">12,400+</span><span class="stat-label">Reported</span></div>
          <div><span class="stat-num">5,800+</span><span class="stat-label">Found</span></div>
          <div><span class="stat-num">91%</span><span class="stat-label">AI Accuracy</span></div>
          <div><span class="stat-num">${COUNTRIES.length}+</span><span class="stat-label">Countries</span></div>
        </div>
      </div>
      <div>
        ${renderQuickScan()}
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--bg-secondary);">
    <div class="section-label">Biometric Matching</div>
    <h2 class="section-title">${BIOMETRIC_FEATURES.length}+ <em>Biometric</em> Identifiers</h2>
    <p class="section-sub">Even without a photo — match people using physical characteristics.</p>
    <div class="features-grid">
      ${BIOMETRIC_FEATURES.map((f, i) => `
        <div class="feature-card"><span class="step-num">${String(i+1).padStart(2,'0')}</span>
          <span class="feature-icon">${f.icon}</span>
          <div class="feature-title">${f.label}</div>
          <div class="feature-desc">${f.desc}</div>
        </div>`).join('')}
    </div>
  </section>

  <section class="section">
    <div class="section-label">How It Works</div>
    <h2 class="section-title">Simple. Fast. <em>Secure.</em></h2>
    <p class="section-sub">From uploading a photo to contacting police — every step designed for speed.</p>
    <div class="grid-4">
      ${[
        {i:'📸',t:'Upload or Scan',d:'Upload a photo or use live camera. Works with partial or low-quality images.'},
        {i:'🤖',t:'AI Analysis',d:'Our AI analyzes ' + BIOMETRIC_FEATURES.length + ' biometric markers including face, scars, moles, iris pattern.'},
        {i:'📋',t:'View Results',d:'Get biometric match scores, full profiles, last known locations, and contact info.'},
        {i:'👮',t:'Contact Authorities',d:'One tap to call the correct emergency number for any of ' + COUNTRIES.length + '+ countries worldwide.'}
      ].map((s,i) => `
        <div class="feature-card"><span class="step-num">${String(i+1).padStart(2,'0')}</span>
          <span class="feature-icon">${s.i}</span>
          <div class="feature-title">${s.t}</div>
          <div class="feature-desc">${s.d}</div>
        </div>`).join('')}
    </div>
  </section>

  <section class="section" style="background:var(--bg-secondary);">
    <div class="section-label">Active Cases</div>
    <h2 class="section-title">Recently <em>Reported</em></h2>
    <p class="section-sub">These individuals are currently missing. Contact authorities if you have information.</p>
    <div class="grid-4">
      ${MISSING_PERSONS.slice(0, 6).map(p => renderPersonCard(p)).join('')}
    </div>
    <div style="text-align:center;margin-top:24px;">
      <button class="btn-secondary" onclick="navigate('missing')">👥 View All Cases</button>
    </div>
  </section>

  <section class="section">
    <div class="section-label">Emergency Services</div>
    <h2 class="section-title">Worldwide <em>Emergency</em> Access</h2>
    <p class="section-sub">Emergency numbers, embassy contacts, disaster alerts — all in one place.</p>
    <div class="grid-3">
      <div class="card" onclick="navigate('emergency')" style="cursor:pointer" role="button" tabindex="0" aria-label="Go to Emergency Numbers">
        <span style="font-size:36px;display:block;margin-bottom:12px;">🆘</span>
        <div style="font-weight:700;font-size:16px;margin-bottom:6px;">Emergency Numbers</div>
        <div style="font-size:13px;color:var(--text-secondary);">Police, ambulance, fire for ${COUNTRIES.length}+ countries. One-tap calling.</div>
      </div>
      <div class="card" onclick="navigate('embassy')" style="cursor:pointer">
        <span style="font-size:36px;display:block;margin-bottom:12px;">🏛️</span>
        <div style="font-weight:700;font-size:16px;margin-bottom:6px;">Embassy Finder</div>
        <div style="font-size:13px;color:var(--text-secondary);">Find your embassy abroad. Emergency consular assistance 24/7.</div>
      </div>
      <div class="card" onclick="navigate('alerts')" style="cursor:pointer">
        <span style="font-size:36px;display:block;margin-bottom:12px;">⚠️</span>
        <div style="font-weight:700;font-size:16px;margin-bottom:6px;">Live Alerts</div>
        <div style="font-size:13px;color:var(--text-secondary);">Active disasters, conflict zones, safety advisories worldwide.</div>
      </div>
    </div>
  </section>

  ${renderFooter()}
</div>`;
}

function renderQuickScan() {
  return `<div class="quick-scan-card">
    <div class="scan-header">
      <div class="scan-icon">🔍</div>
      <div><div class="scan-title">AI Face Search</div><div class="scan-subtitle">Upload a photo to find a match</div></div>
    </div>
    <div class="upload-zone" id="uploadZone">
      <input type="file" accept="image/*" onchange="handleQuickScan(this)" id="quickFileInput">
      <div class="upload-icon">📷</div>
      <div class="upload-text">Drag a photo here or click to upload</div>
      <div class="upload-hint">JPG, PNG, HEIC · Max 10MB · Encrypted</div>
    </div>
    <div class="scan-result" id="quickScanResult">
      <div class="scan-progress"><div class="scan-bar" id="quickScanBar"></div></div>
      <div class="scan-status" id="quickScanStatus">Analyzing...</div>
      <div class="match-card" id="quickMatchCard">
        <div class="match-avatar">👤</div>
        <div>
          <div class="match-name" id="quickMatchName"></div>
          <div class="match-detail" id="quickMatchDetail"></div>
          <span class="match-badge" id="quickMatchScore"></span>
        </div>
      </div>
    </div>
    <div class="scan-trust">
      <div class="trust-item">🔒 End-to-end encrypted</div>
      <div class="trust-item">🚫 Photos not stored</div>
      <div class="trust-item">✅ GDPR compliant</div>
    </div>
  </div>`;
}

function handleQuickScan(input) {
  if (!input.files.length) return;
  const file = input.files[0];
  // UX-05: Validate file type and size
  const validTypes = ['image/jpeg','image/png','image/heic','image/webp','image/gif'];
  if (!validTypes.includes(file.type)) { showToast('Please upload a valid image file (JPG, PNG, HEIC, WEBP)', 'danger'); return; }
  if (file.size > 10 * 1024 * 1024) { showToast('File is too large. Maximum size is 10MB.', 'danger'); return; }

  const el = document.getElementById('quickScanResult');
  const bar = document.getElementById('quickScanBar');
  const status = document.getElementById('quickScanStatus');
  const matchCard = document.getElementById('quickMatchCard');

  el.classList.add('show');
  matchCard.classList.remove('show');
  bar.style.width = '0%';

  runBiometricScan((type, data) => {
    if (type === 'progress') {
      bar.style.width = data.pct + '%';
      status.textContent = data.msg;
    } else if (type === 'result') {
      if (data.found) {
        status.textContent = '✅ Match found!';
        document.getElementById('quickMatchName').textContent = data.person.name;
        document.getElementById('quickMatchDetail').textContent = 'Age ' + data.person.age + ' · ' + data.person.city + ', ' + data.person.country;
        document.getElementById('quickMatchScore').textContent = data.overall + '% Match';
        matchCard.classList.add('show');
      } else {
        status.textContent = '❌ No match found in database.';
      }
    }
  });
}

// UX-04: Wire up drag-and-drop on all upload zones
function initUploadZones() {
  document.querySelectorAll('.upload-zone').forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('dragover');
      const fileInput = zone.querySelector('input[type="file"]');
      if (fileInput && e.dataTransfer.files.length) {
        const dt = new DataTransfer();
        dt.items.add(e.dataTransfer.files[0]);
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  });
}

// ===== SCANNER PAGE =====
function renderScanner() {
  return `<div class="page"><section class="section" style="padding-top:24px;">
    <div class="section-label">Live Scanner</div>
    <h2 class="section-title">Real-Time <em>Camera</em> Search</h2>
    <p class="section-sub">Point your camera at a person. AI continuously scans and matches against the missing persons database in real-time.</p>
    <div class="camera-container" id="cameraContainer">
      <video class="camera-video" id="cameraVideo" autoplay playsinline muted aria-label="Live camera feed"></video>
      <div class="camera-overlay">
        <div class="scanner-frame">
          <div class="corner-bl"></div><div class="corner-br"></div>
          <div class="scanner-line"></div>
        </div>
      </div>
      <div class="camera-hud">
        <div class="hud-badge hud-live" id="hudLive">● LIVE</div>
        <div class="hud-badge" id="hudScanning">Scanning...</div>
      </div>
      <div class="camera-bottom">
        <div class="camera-controls">
          <button class="cam-btn" onclick="switchCam()" title="Switch Camera" aria-label="Switch between front and rear camera">🔄</button>
          <button class="cam-btn cam-btn-main" id="camStartBtn" onclick="toggleScan()" aria-label="Start or stop camera scan">▶</button>
          <button class="cam-btn" onclick="captureAndScan()" title="Capture Frame" aria-label="Capture current frame and scan">📸</button>
        </div>
      </div>
      <div class="camera-placeholder" id="cameraPlaceholder">
        <div class="camera-placeholder-icon">📹</div>
        <div style="font-weight:600;font-size:16px;">Camera Access Required</div>
        <div style="font-size:13px;">Tap the play button below to start the live scanner</div>
      </div>
      <div id="cameraDenyMsg" style="display:none;padding:20px;text-align:center;">
        <div style="font-size:32px;margin-bottom:10px;">⚠️</div>
        <div style="font-weight:700;margin-bottom:6px;">Camera Access Denied</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;">Please allow camera permission in your browser settings and reload the page.</div>
        <button class="btn-secondary" onclick="location.reload()">🔄 Reload Page</button>
      </div>
    </div>
    <div id="scannerResults" style="margin-top:20px;"></div>

    <div style="margin-top:32px;">
      <h3 style="font-size:16px;font-weight:700;margin-bottom:16px;">Biometric Matching Indicators</h3>
      <div class="bio-grid" id="bioIndicatorGrid">
        ${BIOMETRIC_FEATURES.map(f => `
          <div class="bio-item" role="status" aria-label="${f.label} score">
            <span class="bio-icon">${f.icon}</span>
            <div class="bio-label">${f.label}</div>
            <div class="bio-value" style="color:var(--text-muted);">—</div>
          </div>`).join('')}
      </div>
    </div>
  </section></div>`;
}

let camRunning = false;
async function toggleScan() {
  const video = document.getElementById('cameraVideo');
  const placeholder = document.getElementById('cameraPlaceholder');
  const denyMsg = document.getElementById('cameraDenyMsg');
  const btn = document.getElementById('camStartBtn');

  if (!camRunning) {
    const ok = await startCamera(video);
    if (ok) {
      placeholder.style.display = 'none';
      if (denyMsg) denyMsg.style.display = 'none';
      btn.textContent = '⏸';
      btn.setAttribute('aria-label', 'Stop camera scan');
      camRunning = true;
      startLiveScan(handleLiveScanResult);
      showToast('Camera active — scanning for matches', 'info');
    } else {
      // UX-03: Show persistent deny message
      placeholder.style.display = 'none';
      if (denyMsg) denyMsg.style.display = 'block';
      showToast('Camera access denied — check browser settings', 'danger');
    }
  } else {
    stopCamera();
    placeholder.style.display = '';
    if (denyMsg) denyMsg.style.display = 'none';
    btn.textContent = '▶';
    btn.setAttribute('aria-label', 'Start camera scan');
    camRunning = false;
  }
}

function switchCam() {
  const video = document.getElementById('cameraVideo');
  if (camRunning) switchCamera(video);
}

function captureAndScan() {
  if (!camRunning) { showToast('Start the camera first', 'warning'); return; }
  const video = document.getElementById('cameraVideo');
  const frameData = captureFrame(video); // SEC-04: store frame data
  showToast('Frame captured — running deep scan...', 'info');
  const resultsDiv = document.getElementById('scannerResults');
  resultsDiv.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-secondary);">Running deep biometric analysis...</div>';

  runBiometricScan((type, data) => {
    if (type === 'result' && data.found) {
      resultsDiv.innerHTML = renderScanResult(data);
      updateBioGrid(data.biometrics);
    } else if (type === 'result') {
      resultsDiv.innerHTML = '<div class="card" style="text-align:center;padding:24px;"><p style="font-size:14px;color:var(--text-secondary);">No match found. <a href="#" onclick="navigate(\'report\')" style="color:var(--amber);font-weight:600;">Report this person →</a></p></div>';
    }
  }, { frame: frameData });
}

function handleLiveScanResult(data) {
  if (data.found) {
    showToast(`⚠️ Potential match: ${data.person.name} (${data.overall}%)`, 'warning');
    const resultsDiv = document.getElementById('scannerResults');
    if (resultsDiv) {
      resultsDiv.innerHTML = renderScanResult(data);
      updateBioGrid(data.biometrics);
    }
  }
}

function updateBioGrid(biometrics) {
  const items = document.querySelectorAll('.bio-item');
  biometrics.forEach((b, i) => {
    if (items[i]) {
      const val = items[i].querySelector('.bio-value');
      // A11Y-04: icon prefix so status is not color-only
      const prefix = b.status === 'match' ? '✓ ' : b.status === 'partial' ? '~ ' : '✗ ';
      val.textContent = prefix + b.score + '%';
      val.className = 'bio-value bio-' + b.status;
    }
  });
}

// UX-06: Age-appropriate emoji
function getPersonEmoji(p) {
  const age = p.age;
  const isFemale = p.gender === 'Female';
  if (age <= 4)  return isFemale ? '👶' : '👶';
  if (age <= 12) return isFemale ? '👧' : '👦';
  if (age <= 17) return isFemale ? '👧' : '🧒';
  if (age <= 30) return isFemale ? '👩' : '🧑';
  if (age <= 50) return isFemale ? '👩' : '🧔';
  if (age <= 65) return isFemale ? '👩\u200d🦳' : '🧔';
  return isFemale ? '👵' : '👴';
}

function renderScanResult(data) {
  const p = data.person;
  const b = data.biometrics;
  return `<div class="card" style="border-color:rgba(16,185,129,0.3);">
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
      <div style="width:60px;height:60px;border-radius:14px;background:var(--amber-dim);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;">${getPersonEmoji(p)}</div>
      <div style="flex:1;">
        <div style="font-weight:800;font-size:18px;">${sanitize(p.name)}</div>
        <div style="font-size:13px;color:var(--text-secondary);">Age ${sanitize(String(p.age))} · ${sanitize(p.gender)} · ${sanitize(p.city)}, ${sanitize(p.country)}</div>
        <span class="match-badge" style="margin-top:4px;">${data.overall}% Overall Match</span>
      </div>
    </div>
    <div style="font-size:13px;color:var(--text-secondary);line-height:1.7;margin-bottom:16px;">${sanitize(p.description)}</div>
    <div style="font-size:12px;font-weight:700;margin-bottom:10px;">Biometric Breakdown</div>
    <div class="bio-grid">
      ${b.map(f => '<div class="bio-item"><span class="bio-icon">' + f.icon + '</span><div class="bio-label">' + f.label + '</div><div class="bio-value bio-' + f.status + '">' + (f.status === 'match' ? '✓ ' : f.status === 'partial' ? '~ ' : '✗ ') + f.score + '%</div></div>').join('')}
    </div>
    <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;">
      <a href="tel:${sanitize(p.emergency)}" class="btn-primary">👮 Call Police (${sanitize(p.emergency)})</a>
      <button class="btn-secondary" onclick="showPersonModal('${sanitize(p.id)}')">View Full Profile</button>
    </div>
  </div>`;
}

function initScanner() { camRunning = false; }

// ===== SEARCH PAGE =====
function renderSearch() {
  return `<div class="page"><section class="section" style="padding-top:24px;">
    <div class="section-label">Search</div>
    <h2 class="section-title">Find a <em>Missing</em> Person</h2>
    <p class="section-sub">Search by photo upload or by detailed physical description — even without a photo.</p>
    
  <div class="tabs" role="tablist">
      <button role="tab" aria-selected="true" class="tab active" onclick="showSearchTab('photo', this)">📷 Photo Search</button>
      <button role="tab" aria-selected="false" class="tab" onclick="showSearchTab('detail', this)">📝 Detail Search</button>
      <button role="tab" aria-selected="false" class="tab" onclick="showSearchTab('name', this)">🔤 Name Search</button>
    </div>
    
    <div id="searchTab_photo">
      <div class="card" style="max-width:600px;">
        <div class="upload-zone" id="searchUploadZone">
          <input type="file" id="searchPhotoInput" accept="image/*" onchange="handleSearchScan(this)">
          <div class="upload-icon">📷</div>
          <div class="upload-text">Upload a photo to search</div>
          <div class="upload-hint">AI matches against ${BIOMETRIC_FEATURES.length}+ biometric markers · Max 10MB</div>
        </div>
        <div id="searchScanResult" style="margin-top:16px;"></div>
      </div>
    </div>
    
    <div id="searchTab_detail" style="display:none;">
      <div class="card" style="max-width:700px;">
        <div class="form-section-title">Physical Description Search</div>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px;">Enter as many details as you know. Our AI matches even partial descriptions.</p>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Hair Color & Type</label><select id="sd_hair"><option value="">Any</option><option>Black</option><option>Brown</option><option>Blonde</option><option>Red/Auburn</option><option>Gray/White</option></select></div>
          <div class="form-group"><label class="form-label">Eye Color</label><select id="sd_eyes"><option value="">Any</option><option>Brown</option><option>Blue</option><option>Green</option><option>Hazel</option><option>Dark brown</option></select></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Skin Tone</label><select id="sd_skin"><option value="">Any</option><option>Fair</option><option>Light</option><option>Medium</option><option>Light brown</option><option>Medium brown</option><option>Dark brown</option><option>Olive</option></select></div>
          <div class="form-group"><label class="form-label">Gender</label><select id="sd_gender"><option value="">Any</option><option>Male</option><option>Female</option><option>Other</option></select></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Height (approx)</label><input type="text" id="sd_height" placeholder="e.g. 5'6&quot; or 168cm"></div>
          <div class="form-group"><label class="form-label">Weight (approx)</label><input type="text" id="sd_weight" placeholder="e.g. 65 kg"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Scars</label><input type="text" id="sd_scars" placeholder="e.g. scar on left wrist"></div>
          <div class="form-group"><label class="form-label">Moles / Birthmarks</label><input type="text" id="sd_moles" placeholder="e.g. mole on right cheek"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Tattoos</label><input type="text" id="sd_tattoos" placeholder="e.g. butterfly on ankle"></div>
          <div class="form-group"><label class="form-label">Age Range</label><input type="text" id="sd_age" placeholder="e.g. 25-35"></div>
        </div>
        <div class="form-group"><label class="form-label">Additional Details</label><textarea id="sd_desc" placeholder="Any other identifying features, clothing, distinguishing marks..."></textarea></div>
        <button class="btn-primary btn-block" onclick="searchByDetails()">🔍 Search Database</button>
        <div id="detailSearchResults" style="margin-top:20px;"></div>
      </div>
    </div>
    
    <div id="searchTab_name" style="display:none;">
      <div class="search-bar" style="margin-bottom:24px;">
        <input type="text" id="nameSearchInput" placeholder="Search by name, city, or country..." oninput="searchByName()">
        <button onclick="searchByName()">Search</button>
      </div>
      <div id="nameSearchResults" class="grid-4"></div>
    </div>
  </section></div>`;
}

function showSearchTab(tabId, btn) {
  document.querySelectorAll('[id^="searchTab_"]').forEach(t => t.style.display = 'none');
  document.getElementById('searchTab_' + tabId).style.display = '';
  btn.parentElement.querySelectorAll('.tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  // FUNC-03: Reset name search to empty state on tab switch
  if (tabId === 'name') {
    const results = document.getElementById('nameSearchResults');
    if (results) results.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:32px;">Type at least 2 characters to search...</p>';
  }
}

function handleSearchScan(input) {
  if (!input.files.length) return;
  const file = input.files[0];
  const validTypes = ['image/jpeg','image/png','image/heic','image/webp','image/gif'];
  if (!validTypes.includes(file.type)) { showToast('Please upload a valid image file', 'danger'); return; }
  if (file.size > 10 * 1024 * 1024) { showToast('File too large — max 10MB', 'danger'); return; }

  const resultsDiv = document.getElementById('searchScanResult');
  resultsDiv.innerHTML = '<div class="scan-progress"><div class="scan-bar" id="searchBar" style="width:0%"></div></div><div class="scan-status" id="searchStatus">Starting scan...</div>';

  runBiometricScan((type, data) => {
    if (type === 'progress') {
      const bar = document.getElementById('searchBar');
      const st = document.getElementById('searchStatus');
      if (bar) bar.style.width = data.pct + '%';
      if (st) st.textContent = data.msg;
    } else if (type === 'result') {
      resultsDiv.innerHTML = data.found ? renderScanResult(data) : '<div class="card" style="text-align:center;padding:24px;"><p>No match found. Try the detail search or <a href="#" onclick="navigate(\'report\')" style="color:var(--amber);">report this person</a>.</p></div>';
    }
  });
}

function searchByDetails() {
  const results = MISSING_PERSONS.filter(p => {
    let match = true;
    const gender = document.getElementById('sd_gender').value;
    const hairRaw = document.getElementById('sd_hair').value;
    const eyes   = document.getElementById('sd_eyes').value;
    const skin   = document.getElementById('sd_skin').value;
    if (gender && p.gender !== gender) match = false;
    // FUNC-05: split Red/Auburn on / and check each part
    if (hairRaw) {
      const hairTerms = hairRaw.split('/').map(h => h.trim().toLowerCase());
      const pHair = p.hair.toLowerCase();
      if (!hairTerms.some(h => pHair.includes(h))) match = false;
    }
    if (eyes && !p.eyes.toLowerCase().includes(eyes.toLowerCase())) match = false;
    if (skin && !p.skin.toLowerCase().includes(skin.toLowerCase())) match = false;
    return match;
  });
  const div = document.getElementById('detailSearchResults');
  if (results.length) {
    div.innerHTML = '<p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">' + results.length + ' potential match' + (results.length !== 1 ? 'es' : '') + ' found</p><div class="grid-4">' + results.map(p => renderPersonCard(p)).join('') + '</div>';
  } else {
    div.innerHTML = '<div class="card" style="text-align:center;padding:24px;"><p style="color:var(--text-secondary);">No matches found with current filters. Try broadening your search.</p></div>';
  }
}

function searchByName() {
  const q = document.getElementById('nameSearchInput').value.trim();
  const container = document.getElementById('nameSearchResults');
  if (q.length < 2) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:32px;">Type at least 2 characters to search...</p>';
    return;
  }
  const results = searchPersons(q);
  if (!results.length) {
    container.innerHTML = '<div class="card" style="text-align:center;padding:24px;"><p style="color:var(--text-secondary);">No results for "' + sanitize(q) + '".</p></div>';
  } else {
    container.innerHTML = results.map(p => renderPersonCard(p)).join('');
  }
}

// ===== MISSING PERSONS PAGE =====
function renderMissing() {
  const total   = MISSING_PERSONS.length;
  const missing = MISSING_PERSONS.filter(p => p.status === 'missing').length;
  const found   = MISSING_PERSONS.filter(p => p.status === 'found').length;
  return `<div class="page"><section class="section" style="padding-top:24px;">
    <div class="section-label">Active Cases</div>
    <h2 class="section-title">Missing <em>Persons</em> Database</h2>
    <p class="section-sub">Browse all reported cases. Click any card for full details and biometric data.</p>
    <div class="tabs" role="tablist">
      <button role="tab" aria-selected="true" class="tab active" onclick="filterMissing('all',this)">All Cases (${total})</button>
      <button role="tab" aria-selected="false" class="tab" onclick="filterMissing('missing',this)">Missing (${missing})</button>
      <button role="tab" aria-selected="false" class="tab" onclick="filterMissing('found',this)">Found (${found})</button>
    </div>
    <div id="missingGrid" class="grid-4">${MISSING_PERSONS.map(p => renderPersonCard(p)).join('')}</div>
  </section></div>`;
}

function filterMissing(status, btn) {
  btn.parentElement.querySelectorAll('.tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  const list = status === 'all' ? MISSING_PERSONS : getPersonsByStatus(status);
  const grid = document.getElementById('missingGrid');
  // FUNC-06: Empty state
  if (!list.length) {
    grid.innerHTML = '<div class="card" style="text-align:center;padding:40px;grid-column:1/-1;"><p style="font-size:14px;color:var(--text-secondary);">No cases in this category.</p></div>';
  } else {
    grid.innerHTML = list.map(p => renderPersonCard(p)).join('');
  }
}

function renderPersonCard(p) {
  const days = p.status === 'missing' ? Math.floor((Date.now() - new Date(p.lastSeen)) / 86400000) : null;
  const emoji = getPersonEmoji(p);
  return `<div class="person-card" onclick="showPersonModal('${p.id}')" role="button" tabindex="0" aria-label="View profile of ${sanitize(p.name)}" onkeydown="if(event.key==='Enter')showPersonModal('${p.id}')">
    <div class="person-photo" style="background:${p.bgColor}">${emoji}
      <span class="person-status ${p.status === 'missing' ? 'status-missing' : 'status-found'}">${p.status}</span>
    </div>
    <div class="person-info">
      <div class="person-name">${sanitize(p.name)}</div>
      <div class="person-meta">Age ${p.age} · ${sanitize(p.gender)}</div>
      <div class="person-location">📍 ${sanitize(p.city)}, ${sanitize(p.country)}</div>
      ${days !== null ? '<div class="days-missing">⏰ Missing ' + days + ' day' + (days !== 1 ? 's' : '') + '</div>' : '<div style="font-size:10px;font-weight:600;color:var(--emerald);margin-top:4px;">✅ Found Safe</div>'}
    </div>
  </div>`;
}

function showPersonModal(id) {
  const p = getPersonById(id);
  if (!p) return;
  const days = p.status === 'missing' ? Math.floor((Date.now() - new Date(p.lastSeen)) / 86400000) : null;
  showModal(`
    <div style="text-align:center;font-size:56px;margin-bottom:16px;">${getPersonEmoji(p)}</div>
    <h2 style="font-family:var(--font-display);font-size:22px;font-weight:800;text-align:center;">${sanitize(p.name)}</h2>
    <div style="text-align:center;font-size:13px;color:var(--text-secondary);margin-bottom:20px;">Age ${p.age} · ${sanitize(p.gender)} · Last seen: ${sanitize(p.lastSeen)}${days !== null ? ' <span style="color:var(--red);font-weight:600;">('+days+' days ago)</span>' : ''}</div>
    <div style="background:var(--bg-glass);border-radius:var(--radius-sm);padding:14px;font-size:13px;line-height:1.7;margin-bottom:16px;">
      📍 <strong>${sanitize(p.city)}, ${sanitize(p.country)}</strong><br><br>${sanitize(p.description)}
    </div>
    <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin-bottom:10px;">Physical Details</div>
    <div class="modal-detail-grid">
      ${[
        {l:'Height',v:p.height},{l:'Weight',v:p.weight},{l:'Hair',v:p.hair},{l:'Eyes',v:p.eyes},
        {l:'Skin',v:p.skin},{l:'Scars',v:p.scars},{l:'Moles',v:p.moles},{l:'Tattoos',v:p.tattoos}
      ].map(d => '<div class="modal-detail-item"><div class="modal-detail-label">'+d.l+'</div><div class="modal-detail-value">'+sanitize(String(d.v))+'</div></div>').join('')}
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <a href="tel:${sanitize(p.emergency)}" class="btn-primary" style="flex:1;justify-content:center;">👮 Call Police (${sanitize(p.emergency)})</a>
      <button class="btn-danger" style="flex:1;" onclick="triggerSOS()">🆘 SOS</button>
    </div>
  `);
}

// ===== REPORT PAGE =====
function renderReport() {
  return `<div class="page"><section class="section" style="padding-top:24px;">
    <div class="report-grid">
      <div>
        <div class="section-label">Report a Case</div>
        <h2 class="section-title">Someone is <em>missing.</em><br>Act now.</h2>
        <p class="section-sub">Verified reports shared with local police within 2 hours.</p>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:24px;">
          ${['🔐 Verified by admin before publishing','👮 Auto-shared with nearest police station','📱 SMS updates on case status','🌐 Added to global database instantly','🧬 Biometric data securely stored'].map(t => `<div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text-secondary);">${t}</div>`).join('')}
        </div>
      </div>
      <form onsubmit="return handleReportSubmit(event)" class="card">
        <div class="form-section-title">Missing Person Details</div>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px;">⏱️ All reports are manually verified by our team and law enforcement partners within 2 hours of submission.</p>
        <div class="form-row">
          <div class="form-group"><label class="form-label" for="rep_fname">First Name *</label><input type="text" id="rep_fname" name="fname" placeholder="First name" required></div>
          <div class="form-group"><label class="form-label" for="rep_lname">Last Name *</label><input type="text" id="rep_lname" name="lname" placeholder="Last name" required></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label" for="rep_age">Age *</label><input type="number" id="rep_age" name="age" placeholder="Age" min="0" max="120" required></div>
          <div class="form-group"><label class="form-label" for="rep_gender">Gender *</label><select id="rep_gender" name="gender" required><option value="">Select</option><option>Female</option><option>Male</option><option>Other</option></select></div>
        </div>
        <div class="form-group"><label class="form-label" for="rep_country">Country *</label><select id="rep_country" name="country" required><option value="">Select country</option>${COUNTRIES.map(c=>'<option value="' + c.n + '">' + c.f + ' ' + c.n + '</option>').join('')}</select></div>
        <div class="form-group"><label class="form-label" for="rep_loc">Last Known Location *</label><input type="text" id="rep_loc" name="location" placeholder="City, landmark, area..." required></div>
        <div class="form-group"><label class="form-label" for="rep_date">Date Last Seen *</label><input type="date" id="rep_date" name="date" max="${new Date().toISOString().split('T')[0]}" required></div>
        
        <div class="form-group"><label class="form-label" for="rep_photo">Upload Photo *</label>
          <div class="upload-zone" style="padding:18px 12px;">
            <input type="file" id="rep_photo" name="photo" accept="image/*" required>
            <div style="font-size:24px;margin-bottom:6px;">📷</div>
            <div class="upload-text">Click to upload photo</div>
          </div>
        </div>

        <div class="form-section-title" style="margin-top:16px;">Biometric Details</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label" for="rep_h">Height</label><input type="text" id="rep_h" name="height" placeholder="e.g. 5'6&quot;"></div>
          <div class="form-group"><label class="form-label" for="rep_w">Weight</label><input type="text" id="rep_w" name="weight" placeholder="e.g. 65 kg"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label" for="rep_hair">Hair Color &amp; Type</label><input type="text" id="rep_hair" name="hair" placeholder="e.g. Black, long"></div>
          <div class="form-group"><label class="form-label" for="rep_eyes">Eye Color</label><input type="text" id="rep_eyes" name="eyes" placeholder="e.g. Brown"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label" for="rep_skin">Skin Tone</label><input type="text" id="rep_skin" name="skin" placeholder="e.g. Medium brown"></div>
          <div class="form-group">
            <label class="form-label" for="rep_fp">Fingerprint Type</label>
            <select id="rep_fp" name="fingerprint"><option value="Unknown">Unknown</option><option value="Whorl">Whorl</option><option value="Loop">Loop</option><option value="Arch">Arch</option></select>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:6px;">If unknown, leave as "Unknown". Forensic teams will determine this.</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label" for="rep_scars">Scars</label><input type="text" id="rep_scars" name="scars" placeholder="Location and description"></div>
          <div class="form-group"><label class="form-label" for="rep_moles">Moles / Birthmarks</label><input type="text" id="rep_moles" name="moles" placeholder="Location and description"></div>
        </div>
        <div class="form-group"><label class="form-label" for="rep_tattoo">Tattoos</label><input type="text" id="rep_tattoo" name="tattoos" placeholder="Description and body location"></div>
        <div class="form-group"><label class="form-label" for="rep_desc">Additional Description</label><textarea id="rep_desc" name="desc" placeholder="Clothing, behavior, medical conditions, any identifying features..."></textarea></div>
        <div class="form-group"><label class="form-label" for="rep_phone">Your Phone *</label><input type="tel" id="rep_phone" name="phone" placeholder="+1 555 000 0000" required></div>
        <div class="form-group"><label class="form-label" for="rep_email">Your Email</label><input type="email" id="rep_email" name="email" placeholder="your@email.com"></div>
        <button type="submit" class="btn-primary btn-block">Submit Report</button>
      </form>
    </div>
  </section></div>`;
}

window.handleReportSubmit = function(e) {
  e.preventDefault();
  showToast('[Demo] Form received. In production, this would notify local authorities.', 'success');
  e.target.reset();
  setTimeout(() => navigate('home'), 3500);
  return false;
};
// ===== EMERGENCY PAGE =====
function renderEmergency() {
  return `<div class="page">
  <section class="section" style="padding-top:24px;padding-bottom:0;">
    <div class="section-label">Global Emergency</div>
    <h2 class="section-title">Emergency <em>Services</em> Worldwide</h2>
    <p class="section-sub">Find police, ambulance, fire, and child helpline numbers for any country. One-tap calling.</p>
    
    <div class="search-bar" style="margin-bottom:24px;">
      <input type="text" id="emergencySearch" placeholder="Search country..." oninput="filterEmergencyCards()">
      <button onclick="filterEmergencyCards()">Search</button>
    </div>
    
    <div class="tabs" role="tablist" style="margin-bottom:20px;">
      ${EMERGENCY_TYPES.map(t => '<button role="tab" aria-selected="false" class="tab" onclick="filterByType(\'' + t.key + '\',this)">' + t.icon + ' ' + t.label + '</button>').join('')}
    </div>
  </section>
  
  <section class="section" style="padding-top:0;">
    <div class="emergency-grid" id="emergencyGrid">
      ${COUNTRIES.map(c => renderEmergencyCard(c, null)).join('')}
    </div>
    
    <button class="btn-danger btn-block" style="margin-top:28px;padding:18px;font-size:16px;" onclick="triggerSOS()">
      🆘 ACTIVATE SOS — Share My Location & Call Emergency
    </button>
  </section>
  
  ${renderFooter()}
</div>`;
}

function renderEmergencyCard(c, highlightType) {
  const types = [
    { key: 'e', icon: '🆘', label: 'Emergency' },
    { key: 'p', icon: '👮', label: 'Police' },
    { key: 'a', icon: '🚑', label: 'Ambulance' },
    { key: 'fire', icon: '🔥', label: 'Fire' }
  ];
  return `<div class="emergency-card" onclick="callEmergency('${c.n}','${c[highlightType || 'e']}')">
    <div class="emergency-flag">${c.f}</div>
    <div class="emergency-country">${c.n}</div>
    <div class="emergency-nums">
      ${types.map(t => `<div class="emergency-num ${highlightType === t.key ? 'highlighted' : ''}">${t.icon} ${t.label}: <span class="emergency-num-value">${c[t.key]}</span></div>`).join('')}
    </div>
  </div>`;
}

let activeEmergencyType = null;
function initEmergencySearch() { activeEmergencyType = null; }
function filterByType(key, btn) {
  btn.parentElement.querySelectorAll('.tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  activeEmergencyType = key;
  filterEmergencyCards();
}
function filterEmergencyCards() {
  const q = document.getElementById('emergencySearch')?.value || '';
  const filtered = filterCountries(q);
  const grid = document.getElementById('emergencyGrid');
  if (!filtered.length) {
    grid.innerHTML = '<div class="card" style="text-align:center;padding:32px;grid-column:1/-1;"><p style="color:var(--text-secondary);">No emergency numbers found for "' + sanitize(q) + '".</p></div>';
  } else {
    grid.innerHTML = filtered.map(c => renderEmergencyCard(c, activeEmergencyType)).join('');
  }
}
function callEmergency(country, num) {
  showToast(`📞 Calling ${num} for ${country}...`, 'warning');
  setTimeout(() => { window.location.href = `tel:${num}`; }, 1500);
}

// ===== EMBASSY PAGE =====
function renderEmbassy() {
  return `<div class="page"><section class="section" style="padding-top:24px;">
    <div class="section-label">Embassy Finder</div>
    <h2 class="section-title">Find Your <em>Embassy</em> Abroad</h2>
    <p class="section-sub">Traveling abroad? Find your country's embassy for emergency assistance, passport help, and consular services.</p>
    
    <div class="card" style="margin-bottom:24px;">
      <div style="font-weight:700;margin-bottom:12px;">🔍 Find Embassy</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="embNationality">Your Nationality</label>
          <select id="embNationality" name="embNationality" onchange="searchEmbassies()">
            <option value="">All Nationalities</option>
            ${NATIONALITIES.map(n => '<option value="' + n + '">' + n + '</option>').join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="embCountry">You are in (Host Country)</label>
          <select id="embCountry" name="embCountry" onchange="searchEmbassies()">
            <option value="">All Countries</option>
            ${HOST_COUNTRIES.map(c => '<option value="' + c + '">' + c + '</option>').join('')}
          </select>
        </div>
      </div>
    </div>
    
    <div id="embassyResults" class="grid-3">
      ${EMBASSIES.map(e => renderEmbassyCard(e)).join('')}
    </div>
  </section></div>`;
}

function renderEmbassyCard(e) {
  const mapLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(e.nationality + ' Embassy in ' + e.city + ', ' + e.country);
  return `<div class="embassy-card">
    <div class="embassy-header">
      <div class="embassy-flags">${e.flag} → ${e.hostFlag}</div>
      <div><div class="embassy-name">${e.nationality} Embassy</div><div class="embassy-location">${e.city}, ${e.country}</div></div>
    </div>
    <div class="embassy-info">📍 ${e.address}</div>
    <div class="embassy-contact">
      <a href="tel:${e.phone}" class="embassy-btn">📞 Call</a>
      <a href="tel:${e.emergency}" class="embassy-btn" style="border-color:var(--red);color:var(--red);">🆘 Emergency</a>
      <a href="${mapLink}" target="_blank" rel="noopener noreferrer" class="embassy-btn">🗺️ Directions</a>
    </div>
  </div>`;
}

function searchEmbassies() {
  const nat = document.getElementById('embNationality').value;
  const host = document.getElementById('embCountry').value;
  const results = findEmbassies(nat, host);
  document.getElementById('embassyResults').innerHTML = results.length
    ? results.map(e => renderEmbassyCard(e)).join('')
    : '<div class="card" style="grid-column:1/-1;text-align:center;padding:32px;"><p style="color:var(--text-secondary);">No embassies found. Try different selections.</p></div>';
}

// ===== ALERTS PAGE =====
const ALERTS_DATA = [
  { type: 'danger', icon: '🌊', title: 'Flood Warning — Bangladesh', desc: 'Severe flooding reported in Sylhet and Sunamganj regions. Over 2 million affected. Avoid travel to northeastern Bangladesh.', date: 'Nov 24, 2024', severity: 'Critical', category: 'Natural Disaster' },
  { type: 'danger', icon: '⚔️', title: 'Armed Conflict — Sudan', desc: 'Ongoing armed conflict in Khartoum and Darfur regions. All civilians urged to seek shelter. Multiple embassies evacuating.', date: 'Nov 23, 2024', severity: 'Critical', category: 'Armed Conflict' },
  { type: 'warn', icon: '🌋', title: 'Volcanic Activity — Indonesia', desc: 'Mount Merapi showing increased activity. Exclusion zone expanded to 7km. Monitor local authorities for updates.', date: 'Nov 22, 2024', severity: 'High', category: 'Natural Disaster' },
  { type: 'warn', icon: '🌀', title: 'Cyclone Watch — Philippines', desc: 'Tropical cyclone forming in Philippine Sea. Expected landfall in Luzon within 48 hours. Prepare evacuation plans.', date: 'Nov 21, 2024', severity: 'High', category: 'Natural Disaster' },
  { type: 'danger', icon: '💥', title: 'Terror Threat — Multiple Regions', desc: 'Elevated terror threat in parts of Western Europe. Exercise heightened vigilance at public gatherings and transport hubs.', date: 'Nov 20, 2024', severity: 'High', category: 'Security' },
  { type: 'warn', icon: '🏥', title: 'Disease Outbreak — DR Congo', desc: 'Ebola outbreak reported in North Kivu province. WHO deploying response teams. Avoid non-essential travel.', date: 'Nov 19, 2024', severity: 'High', category: 'Health' },
  { type: 'info', icon: '🚗', title: 'Road Accidents — India', desc: 'Major highway pile-up on NH44 near Bengaluru. 15+ vehicles involved. Alternate routes advised via NH48.', date: 'Nov 24, 2024', severity: 'Medium', category: 'Accident' },
  { type: 'warn', icon: '🌍', title: 'Earthquake Alert — Turkey', desc: '5.8 magnitude earthquake detected near Izmir. Aftershocks possible. Check structural integrity before re-entering buildings.', date: 'Nov 18, 2024', severity: 'High', category: 'Natural Disaster' }
];

function renderAlertCard(a) {
  return `<div class="alert-card ${a.type === 'warn' ? 'warning' : ''} ${a.type === 'info' ? 'info' : ''}">
    <div class="alert-header">
      <span style="font-size:20px;">${a.icon}</span>
      <span class="alert-type ${a.type === 'danger' ? 'danger' : 'warn'}">${a.severity}</span>
      <span style="font-size:10px;color:var(--text-muted);margin-left:auto;">${a.date}</span>
    </div>
    <div class="alert-title">${a.title}</div>
    <div class="alert-desc">${a.desc}</div>
    <div class="alert-meta">
      <span>📂 ${a.category}</span>
      <span>🕐 Updated ${a.date}</span>
    </div>
  </div>`;
}

function filterAlerts(category, btn) {
  if (btn) {
    btn.closest('.tabs').querySelectorAll('.tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }
  const filtered = category === 'all' ? ALERTS_DATA : ALERTS_DATA.filter(a => a.category === category);
  const grid = document.getElementById('alertsGrid');
  if (grid) grid.innerHTML = filtered.length ? filtered.map(renderAlertCard).join('') : '<div class="card" style="text-align:center;padding:32px;"><p style="color:var(--text-secondary);">No alerts in this category.</p></div>';
}

function renderAlerts() {
  return `<div class="page"><section class="section" style="padding-top:24px;">
    <div class="section-label">Active Alerts</div>
    <h2 class="section-title">Worldwide <em>Emergency</em> Alerts</h2>
    <p class="section-sub">Real-time disasters, conflict zones, and safety advisories from around the globe.</p>
    
    <div class="tabs" role="tablist">
      <button role="tab" aria-selected="true" class="tab active" onclick="filterAlerts('all',this)">All Alerts</button>
      <button role="tab" aria-selected="false" class="tab" onclick="filterAlerts('Natural Disaster',this)">🌊 Disasters</button>
      <button role="tab" aria-selected="false" class="tab" onclick="filterAlerts('Armed Conflict',this)">⚔️ Conflicts</button>
      <button role="tab" aria-selected="false" class="tab" onclick="filterAlerts('Accident',this)">🚗 Accidents</button>
      <button role="tab" aria-selected="false" class="tab" onclick="filterAlerts('Health',this)">🏥 Health</button>
      <button role="tab" aria-selected="false" class="tab" onclick="filterAlerts('Security',this)">🔒 Security</button>
    </div>
    
    <div id="alertsGrid" style="display:flex;flex-direction:column;gap:14px;">
      ${ALERTS_DATA.map(renderAlertCard).join('')}
    </div>
    
    <div class="card" style="margin-top:24px;text-align:center;border-color:rgba(239,68,68,0.3);">
      <div style="font-size:24px;margin-bottom:8px;">🆘</div>
      <div style="font-weight:700;font-size:16px;margin-bottom:6px;">In Immediate Danger?</div>
      <div style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">Activate SOS to share your location and call local emergency services.</div>
      <button class="btn-danger btn-block" onclick="triggerSOS()">🆘 ACTIVATE SOS NOW</button>
    </div>
  </section></div>`;
}

// ===== FOOTER =====
function renderFooter() {
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="logo-text">Find<em>Them</em>Now</span>
          <p class="footer-desc">A global platform helping find missing persons through AI biometric matching and law enforcement coordination across ${COUNTRIES.length}+ countries.</p>
          <span class="footer-ngo">Non-Profit Platform</span>
        </div>
        <div class="footer-col">
          <h4>Platform</h4>
          <a href="#" onclick="navigate('missing')">Active Cases</a>
          <a href="#" onclick="navigate('scanner')">Live Scanner</a>
          <a href="#" onclick="navigate('search')">Search Person</a>
          <a href="#" onclick="navigate('report')">Report Missing</a>
        </div>
        <div class="footer-col">
          <h4>Emergency</h4>
          <a href="#" onclick="navigate('emergency')">Emergency Numbers</a>
          <a href="#" onclick="navigate('embassy')">Embassy Finder</a>
          <a href="#" onclick="navigate('alerts')">Active Alerts</a>
          <a href="tel:112">112 — EU/India</a>
          <a href="tel:911">911 — USA</a>
        </div>
        <div class="footer-col">
          <h4>Organisation</h4>
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2024 FindThemNow. Global Platform.</div>
        <div>🔒 SSL · 🌐 GDPR · 🌍 ${COUNTRIES.length}+ Countries</div>
      </div>
    </div>
  </footer>`;
}
