// ===== MAIN APPLICATION =====

// --- Splash Screen ---
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splashScreen').classList.add('hidden');
    navigate('home');
  }, 2200);
});

// --- Theme ---
function toggleTheme() {
  const isDark = !document.body.hasAttribute('data-theme');
  document.body.setAttribute('data-theme', isDark ? 'light' : '');
  if (!isDark) document.body.removeAttribute('data-theme');
}

// --- Mobile Nav ---
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('show');
  document.getElementById('mobileNavOverlay').classList.toggle('show');
  document.getElementById('hamburger').classList.toggle('active');
}

// --- Toast ---
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  const icons = { success: '✅', warning: '⚠️', danger: '🆘', info: 'ℹ️' };
  document.getElementById('toastIcon').textContent = icons[type] || '✅';
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// --- Modal ---
function showModal(html) {
  document.getElementById('modalContent').innerHTML = `<button class="modal-close" onclick="closeModal()">✕</button>` + html;
  document.getElementById('modalOverlay').classList.add('show');
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('show'); }
document.addEventListener('click', e => { if (e.target.id === 'modalOverlay') closeModal(); });

// ============ PAGE RENDERERS ============

function renderHome() {
  return `<div class="page">
  <section class="hero">
    <div class="hero-inner">
      <div>
        <div class="hero-badge">🌐 AI-Powered · Global Missing Persons Platform</div>
        <h1>Every second counts.<br><em>Every face</em> matters.</h1>
        <p class="hero-sub">Upload a photo or use live camera. Our AI matches missing persons using facial recognition, fingerprints, iris patterns, scars, moles, and 10+ biometric markers — in seconds.</p>
        <div class="hero-actions">
          <button class="btn-primary" onclick="navigate('scanner')">📹 Live Camera Scan</button>
          <button class="btn-secondary" onclick="navigate('search')">🔍 Search by Photo</button>
          <button class="btn-danger" onclick="navigate('emergency')">🆘 Emergency Services</button>
        </div>
        <div class="hero-stats">
          <div><span class="stat-num">12,400+</span><span class="stat-label">Reported</span></div>
          <div><span class="stat-num">5,800+</span><span class="stat-label">Found</span></div>
          <div><span class="stat-num">47%</span><span class="stat-label">Match Rate</span></div>
          <div><span class="stat-num">80+</span><span class="stat-label">Countries</span></div>
        </div>
      </div>
      <div>
        ${renderQuickScan()}
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--bg-secondary);">
    <div class="section-label">Biometric Matching</div>
    <h2 class="section-title">12+ <em>Biometric</em> Identifiers</h2>
    <p class="section-sub">Even without a photo — match people using physical characteristics.</p>
    <div class="features-grid">
      ${BIOMETRIC_FEATURES.map((f, i) => `
        <div class="feature-card"><span class="step-num">0${i+1}</span>
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
        {i:'🤖',t:'AI Analysis',d:'Our AI analyzes 12+ biometric markers including face, scars, moles, iris pattern.'},
        {i:'📋',t:'View Results',d:'Get biometric match scores, full profiles, last known locations, and contact info.'},
        {i:'👮',t:'Contact Authorities',d:'One tap to call the correct emergency number for any country worldwide.'}
      ].map((s,i) => `
        <div class="feature-card"><span class="step-num">0${i+1}</span>
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
      <button class="btn-secondary" onclick="navigate('missing')">View All Cases →</button>
    </div>
  </section>

  <section class="section">
    <div class="section-label">Emergency Services</div>
    <h2 class="section-title">Worldwide <em>Emergency</em> Access</h2>
    <p class="section-sub">Emergency numbers, embassy contacts, disaster alerts — all in one place.</p>
    <div class="grid-3">
      <div class="card" onclick="navigate('emergency')" style="cursor:pointer">
        <span style="font-size:36px;display:block;margin-bottom:12px;">🆘</span>
        <div style="font-weight:700;font-size:16px;margin-bottom:6px;">Emergency Numbers</div>
        <div style="font-size:13px;color:var(--text-secondary);">Police, ambulance, fire for 60+ countries. One-tap calling.</div>
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
  const el = document.getElementById('quickScanResult');
  const bar = document.getElementById('quickScanBar');
  const status = document.getElementById('quickScanStatus');
  const matchCard = document.getElementById('quickMatchCard');

  el.classList.add('show');
  matchCard.classList.remove('show');
  bar.style.width = '0%';

  const cancel = runBiometricScan((type, data) => {
    if (type === 'progress') {
      bar.style.width = data.pct + '%';
      status.textContent = data.msg;
    } else if (type === 'result') {
      if (data.found) {
        status.textContent = '✅ Match found!';
        document.getElementById('quickMatchName').textContent = data.person.name;
        document.getElementById('quickMatchDetail').textContent = `Age ${data.person.age} · ${data.person.city}, ${data.person.country}`;
        document.getElementById('quickMatchScore').textContent = data.overall + '% Match';
        matchCard.classList.add('show');
      } else {
        status.textContent = '❌ No match found in database.';
      }
    }
  });
}

// ===== SCANNER PAGE =====
function renderScanner() {
  return `<div class="page"><section class="section" style="padding-top:24px;">
    <div class="section-label">Live Scanner</div>
    <h2 class="section-title">Real-Time <em>Camera</em> Search</h2>
    <p class="section-sub">Point your camera at a person. AI continuously scans and matches against the missing persons database in real-time.</p>
    <div class="camera-container" id="cameraContainer">
      <video class="camera-video" id="cameraVideo" autoplay playsinline muted></video>
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
          <button class="cam-btn" onclick="switchCam()" title="Switch Camera">🔄</button>
          <button class="cam-btn cam-btn-main" id="camStartBtn" onclick="toggleScan()">▶</button>
          <button class="cam-btn" onclick="captureAndScan()" title="Capture Frame">📸</button>
        </div>
      </div>
      <div class="camera-placeholder" id="cameraPlaceholder">
        <div class="camera-placeholder-icon">📹</div>
        <div style="font-weight:600;font-size:16px;">Camera Access Required</div>
        <div style="font-size:13px;">Tap the play button below to start the live scanner</div>
      </div>
    </div>
    <div id="scannerResults" style="margin-top:20px;"></div>

    <div style="margin-top:32px;">
      <h3 style="font-size:16px;font-weight:700;margin-bottom:16px;">Biometric Matching Indicators</h3>
      <div class="bio-grid">
        ${BIOMETRIC_FEATURES.map(f => `
          <div class="bio-item">
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
  const btn = document.getElementById('camStartBtn');

  if (!camRunning) {
    const ok = await startCamera(video);
    if (ok) {
      placeholder.style.display = 'none';
      btn.textContent = '⏸';
      camRunning = true;
      startLiveScan(handleLiveScanResult);
      showToast('Camera active — scanning for matches', 'info');
    } else {
      showToast('Camera access denied. Please allow camera permission.', 'warning');
    }
  } else {
    stopCamera();
    placeholder.style.display = '';
    btn.textContent = '▶';
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
  captureFrame(video);
  showToast('Frame captured — running deep scan...', 'info');
  // Run full scan
  const resultsDiv = document.getElementById('scannerResults');
  resultsDiv.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-secondary);">Running deep biometric analysis...</div>';
  
  runBiometricScan((type, data) => {
    if (type === 'result' && data.found) {
      resultsDiv.innerHTML = renderScanResult(data);
      updateBioGrid(data.biometrics);
    } else if (type === 'result') {
      resultsDiv.innerHTML = '<div class="card" style="text-align:center;padding:24px;"><p style="font-size:14px;color:var(--text-secondary);">No match found. <a href="#" onclick="navigate(\'report\')" style="color:var(--amber);font-weight:600;">Report this person →</a></p></div>';
    }
  });
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
      val.textContent = b.score + '%';
      val.className = 'bio-value bio-' + b.status;
    }
  });
}

function renderScanResult(data) {
  const p = data.person;
  const b = data.biometrics;
  return `<div class="card" style="border-color:rgba(16,185,129,0.3);">
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
      <div style="width:60px;height:60px;border-radius:14px;background:var(--amber-dim);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;">${p.emoji}</div>
      <div style="flex:1;">
        <div style="font-weight:800;font-size:18px;">${p.name}</div>
        <div style="font-size:13px;color:var(--text-secondary);">Age ${p.age} · ${p.gender} · ${p.city}, ${p.country}</div>
        <span class="match-badge" style="margin-top:4px;">${data.overall}% Overall Match</span>
      </div>
    </div>
    <div style="font-size:13px;color:var(--text-secondary);line-height:1.7;margin-bottom:16px;">${p.description}</div>
    <div style="font-size:12px;font-weight:700;margin-bottom:10px;">Biometric Breakdown</div>
    <div class="bio-grid">
      ${b.map(f => `<div class="bio-item"><span class="bio-icon">${f.icon}</span><div class="bio-label">${f.label}</div><div class="bio-value bio-${f.status}">${f.score}%</div></div>`).join('')}
    </div>
    <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;">
      <button class="btn-primary" onclick="window.location.href='tel:${p.emergency}'">👮 Call Police (${p.emergency})</button>
      <button class="btn-secondary" onclick="showPersonModal('${p.id}')">View Full Profile</button>
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
    
    <div class="tabs">
      <button class="tab active" onclick="showSearchTab('photo', this)">📷 Photo Search</button>
      <button class="tab" onclick="showSearchTab('detail', this)">📝 Detail Search</button>
      <button class="tab" onclick="showSearchTab('name', this)">🔤 Name Search</button>
    </div>
    
    <div id="searchTab_photo">
      <div class="card" style="max-width:600px;">
        <div class="upload-zone" id="searchUploadZone">
          <input type="file" accept="image/*" onchange="handleSearchScan(this)">
          <div class="upload-icon">📷</div>
          <div class="upload-text">Upload a photo to search</div>
          <div class="upload-hint">Our AI will match against all 12+ biometric markers</div>
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
  btn.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

function handleSearchScan(input) {
  if (!input.files.length) return;
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
    const hair = document.getElementById('sd_hair').value;
    const eyes = document.getElementById('sd_eyes').value;
    const skin = document.getElementById('sd_skin').value;
    if (gender && p.gender !== gender) match = false;
    if (hair && !p.hair.toLowerCase().includes(hair.toLowerCase())) match = false;
    if (eyes && !p.eyes.toLowerCase().includes(eyes.toLowerCase())) match = false;
    if (skin && !p.skin.toLowerCase().includes(skin.toLowerCase())) match = false;
    return match;
  });
  const div = document.getElementById('detailSearchResults');
  if (results.length) {
    div.innerHTML = `<p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">${results.length} potential matches found</p><div class="grid-4">${results.map(p => renderPersonCard(p)).join('')}</div>`;
  } else {
    div.innerHTML = '<div class="card" style="text-align:center;padding:24px;"><p style="color:var(--text-secondary);">No matches found with current filters. Try broadening your search.</p></div>';
  }
}

function searchByName() {
  const q = document.getElementById('nameSearchInput').value;
  const results = q.length >= 2 ? searchPersons(q) : MISSING_PERSONS;
  document.getElementById('nameSearchResults').innerHTML = results.map(p => renderPersonCard(p)).join('');
}

// ===== MISSING PERSONS PAGE =====
function renderMissing() {
  return `<div class="page"><section class="section" style="padding-top:24px;">
    <div class="section-label">Active Cases</div>
    <h2 class="section-title">Missing <em>Persons</em> Database</h2>
    <p class="section-sub">Browse all reported cases. Click any card for full details and biometric data.</p>
    <div class="tabs">
      <button class="tab active" onclick="filterMissing('all',this)">All Cases</button>
      <button class="tab" onclick="filterMissing('missing',this)">Missing</button>
      <button class="tab" onclick="filterMissing('found',this)">Found</button>
    </div>
    <div id="missingGrid" class="grid-4">${MISSING_PERSONS.map(p => renderPersonCard(p)).join('')}</div>
  </section></div>`;
}

function filterMissing(status, btn) {
  btn.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const list = status === 'all' ? MISSING_PERSONS : getPersonsByStatus(status);
  document.getElementById('missingGrid').innerHTML = list.map(p => renderPersonCard(p)).join('');
}

function renderPersonCard(p) {
  return `<div class="person-card" onclick="showPersonModal('${p.id}')">
    <div class="person-photo" style="background:${p.bgColor}">${p.emoji}
      <span class="person-status ${p.status === 'missing' ? 'status-missing' : 'status-found'}">${p.status}</span>
    </div>
    <div class="person-info">
      <div class="person-name">${p.name}</div>
      <div class="person-meta">Age ${p.age} · ${p.gender}</div>
      <div class="person-location">📍 ${p.city}, ${p.country}</div>
    </div>
  </div>`;
}

function showPersonModal(id) {
  const p = getPersonById(id);
  if (!p) return;
  showModal(`
    <div style="text-align:center;font-size:56px;margin-bottom:16px;">${p.emoji}</div>
    <h2 style="font-family:var(--font-display);font-size:22px;font-weight:800;text-align:center;">${p.name}</h2>
    <div style="text-align:center;font-size:13px;color:var(--text-secondary);margin-bottom:20px;">Age ${p.age} · ${p.gender} · Last seen: ${p.lastSeen}</div>
    <div style="background:var(--bg-glass);border-radius:var(--radius-sm);padding:14px;font-size:13px;line-height:1.7;margin-bottom:16px;">
      📍 <strong>${p.city}, ${p.country}</strong><br><br>${p.description}
    </div>
    <div style="font-size:12px;font-weight:700;margin-bottom:10px;">Physical Details</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">
      ${[
        {l:'Height',v:p.height},{l:'Weight',v:p.weight},{l:'Hair',v:p.hair},{l:'Eyes',v:p.eyes},
        {l:'Skin',v:p.skin},{l:'Scars',v:p.scars},{l:'Moles',v:p.moles},{l:'Tattoos',v:p.tattoos}
      ].map(d => `<div style="background:var(--bg-glass);border-radius:8px;padding:10px;"><div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;">${d.l}</div><div style="font-size:13px;font-weight:600;margin-top:2px;">${d.v}</div></div>`).join('')}
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <a href="tel:${p.emergency}" class="btn-primary" style="flex:1;justify-content:center;text-decoration:none;">👮 Call Police (${p.emergency})</a>
      <button class="btn-danger" style="flex:1;" onclick="triggerSOS()">🆘 SOS</button>
    </div>
  `);
}

// ===== REPORT PAGE =====
function renderReport() {
  return `<div class="page"><section class="section" style="padding-top:24px;">
    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:40px;align-items:start;">
      <div>
        <div class="section-label">Report a Case</div>
        <h2 class="section-title">Someone is <em>missing.</em><br>Act now.</h2>
        <p class="section-sub">Verified reports shared with local police within 2 hours.</p>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:24px;">
          ${['🔐 Verified by admin before publishing','👮 Auto-shared with nearest police station','📱 SMS updates on case status','🌐 Added to global database instantly','🧬 Biometric data securely stored'].map(t => `<div style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text-secondary);">${t}</div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="form-section-title">Missing Person Details</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">First Name *</label><input type="text" placeholder="First name"></div>
          <div class="form-group"><label class="form-label">Last Name *</label><input type="text" placeholder="Last name"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Age *</label><input type="number" placeholder="Age"></div>
          <div class="form-group"><label class="form-label">Gender *</label><select><option>Select</option><option>Female</option><option>Male</option><option>Other</option></select></div>
        </div>
        <div class="form-group"><label class="form-label">Country *</label><select><option value="">Select country</option>${COUNTRIES.map(c=>`<option>${c.f} ${c.n}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Last Known Location *</label><input type="text" placeholder="City, landmark, area..."></div>
        <div class="form-group"><label class="form-label">Date Last Seen *</label><input type="date"></div>
        <div class="form-section-title" style="margin-top:16px;">Biometric Details</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Height</label><input type="text" placeholder="e.g. 5'6&quot;"></div>
          <div class="form-group"><label class="form-label">Weight</label><input type="text" placeholder="e.g. 65 kg"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Hair Color & Type</label><input type="text" placeholder="e.g. Black, long"></div>
          <div class="form-group"><label class="form-label">Eye Color</label><input type="text" placeholder="e.g. Brown"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Skin Tone</label><input type="text" placeholder="e.g. Medium brown"></div>
          <div class="form-group"><label class="form-label">Fingerprint Type</label><select><option>Unknown</option><option>Whorl</option><option>Loop</option><option>Arch</option></select></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Scars</label><input type="text" placeholder="Location and description"></div>
          <div class="form-group"><label class="form-label">Moles / Birthmarks</label><input type="text" placeholder="Location and description"></div>
        </div>
        <div class="form-group"><label class="form-label">Tattoos</label><input type="text" placeholder="Description and body location"></div>
        <div class="form-group"><label class="form-label">Additional Description</label><textarea placeholder="Clothing, behavior, medical conditions, any identifying features..."></textarea></div>
        <div class="form-group"><label class="form-label">Upload Photo *</label>
          <div class="upload-zone" style="padding:18px 12px;">
            <input type="file" accept="image/*">
            <div style="font-size:24px;margin-bottom:6px;">📷</div>
            <div class="upload-text">Click to upload photo</div>
          </div>
        </div>
        <div class="form-group"><label class="form-label">Your Phone *</label><input type="tel" placeholder="+1 555 000 0000"></div>
        <div class="form-group"><label class="form-label">Your Email</label><input type="email" placeholder="your@email.com"></div>
        <button class="btn-primary btn-block" onclick="showToast('✅ Report submitted! We will verify and publish within 2 hours.','success')">Submit Report</button>
      </div>
    </div>
  </section></div>`;
}

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
    
    <div class="tabs" style="margin-bottom:20px;">
      ${EMERGENCY_TYPES.map(t => `<button class="tab" onclick="filterByType('${t.key}',this)">${t.icon} ${t.label}</button>`).join('')}
    </div>
  </section>
  
  <section class="section" style="padding-top:0;">
    <div class="emergency-grid" id="emergencyGrid">
      ${COUNTRIES.map(c => renderEmergencyCard(c)).join('')}
    </div>
    
    <button class="btn-danger btn-block" style="margin-top:28px;padding:18px;font-size:16px;" onclick="triggerSOS()">
      🆘 ACTIVATE SOS — Share My Location & Call Emergency
    </button>
  </section>
  
  ${renderFooter()}
</div>`;
}

function renderEmergencyCard(c) {
  return `<div class="emergency-card" onclick="callEmergency('${c.n}','${c.e}')">
    <div class="emergency-flag">${c.f}</div>
    <div class="emergency-country">${c.n}</div>
    <div class="emergency-nums">
      <div class="emergency-num">🆘 Emergency: <span class="emergency-num-value">${c.e}</span></div>
      <div class="emergency-num">👮 Police: <span class="emergency-num-value">${c.p}</span></div>
      <div class="emergency-num">🚑 Ambulance: <span class="emergency-num-value">${c.a}</span></div>
      <div class="emergency-num">🔥 Fire: <span class="emergency-num-value">${c.fire}</span></div>
    </div>
  </div>`;
}

function initEmergencySearch() {}
function filterEmergencyCards() {
  const q = document.getElementById('emergencySearch').value;
  const filtered = filterCountries(q);
  document.getElementById('emergencyGrid').innerHTML = filtered.map(c => renderEmergencyCard(c)).join('');
}
function filterByType(key, btn) {
  btn.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  // Just show all but highlight type
  filterEmergencyCards();
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
          <label class="form-label">Your Nationality</label>
          <select id="embNationality" onchange="searchEmbassies()">
            <option value="">All Nationalities</option>
            ${NATIONALITIES.map(n => `<option value="${n}">${n}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">You are in (Host Country)</label>
          <select id="embCountry" onchange="searchEmbassies()">
            <option value="">All Countries</option>
            ${HOST_COUNTRIES.map(c => `<option value="${c}">${c}</option>`).join('')}
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
  return `<div class="embassy-card">
    <div class="embassy-header">
      <div class="embassy-flags">${e.flag} → ${e.hostFlag}</div>
      <div><div class="embassy-name">${e.nationality} Embassy</div><div class="embassy-location">${e.city}, ${e.country}</div></div>
    </div>
    <div class="embassy-info">📍 ${e.address}</div>
    <div class="embassy-contact">
      <a href="tel:${e.phone}" class="embassy-btn">📞 Call</a>
      <a href="tel:${e.emergency}" class="embassy-btn" style="border-color:var(--red);color:var(--red);">🆘 Emergency</a>
      <a href="mailto:${e.email}" class="embassy-btn">✉️ Email</a>
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
function renderAlerts() {
  const alerts = [
    { type: 'danger', icon: '🌊', title: 'Flood Warning — Bangladesh', desc: 'Severe flooding reported in Sylhet and Sunamganj regions. Over 2 million affected. Avoid travel to northeastern Bangladesh.', date: 'Nov 24, 2024', severity: 'Critical', category: 'Natural Disaster' },
    { type: 'danger', icon: '⚔️', title: 'Armed Conflict — Sudan', desc: 'Ongoing armed conflict in Khartoum and Darfur regions. All civilians urged to seek shelter. Multiple embassies evacuating.', date: 'Nov 23, 2024', severity: 'Critical', category: 'Armed Conflict' },
    { type: 'warn', icon: '🌋', title: 'Volcanic Activity — Indonesia', desc: 'Mount Merapi showing increased activity. Exclusion zone expanded to 7km. Monitor local authorities for updates.', date: 'Nov 22, 2024', severity: 'High', category: 'Natural Disaster' },
    { type: 'warn', icon: '🌀', title: 'Cyclone Watch — Philippines', desc: 'Tropical cyclone forming in Philippine Sea. Expected landfall in Luzon within 48 hours. Prepare evacuation plans.', date: 'Nov 21, 2024', severity: 'High', category: 'Natural Disaster' },
    { type: 'danger', icon: '💥', title: 'Terror Threat — Multiple Regions', desc: 'Elevated terror threat in parts of Western Europe. Exercise heightened vigilance at public gatherings and transport hubs.', date: 'Nov 20, 2024', severity: 'High', category: 'Security' },
    { type: 'warn', icon: '🏥', title: 'Disease Outbreak — DR Congo', desc: 'Ebola outbreak reported in North Kivu province. WHO deploying response teams. Avoid non-essential travel.', date: 'Nov 19, 2024', severity: 'High', category: 'Health' },
    { type: 'info', icon: '🚗', title: 'Road Accidents — India', desc: 'Major highway pile-up on NH44 near Bengaluru. 15+ vehicles involved. Alternate routes advised via NH48.', date: 'Nov 24, 2024', severity: 'Medium', category: 'Accident' },
    { type: 'warn', icon: '🌍', title: 'Earthquake Alert — Turkey', desc: '5.8 magnitude earthquake detected near Izmir. Aftershocks possible. Check structural integrity before re-entering buildings.', date: 'Nov 18, 2024', severity: 'High', category: 'Natural Disaster' }
  ];

  return `<div class="page"><section class="section" style="padding-top:24px;">
    <div class="section-label">Active Alerts</div>
    <h2 class="section-title">Worldwide <em>Emergency</em> Alerts</h2>
    <p class="section-sub">Real-time disasters, conflict zones, and safety advisories from around the globe.</p>
    
    <div class="tabs">
      <button class="tab active">All Alerts</button>
      <button class="tab">🌊 Disasters</button>
      <button class="tab">⚔️ Conflicts</button>
      <button class="tab">🚗 Accidents</button>
      <button class="tab">🏥 Health</button>
    </div>
    
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${alerts.map(a => `
        <div class="alert-card ${a.type === 'warn' ? 'warning' : ''} ${a.type === 'info' ? 'info' : ''}">
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
        </div>`).join('')}
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
          <p class="footer-desc">A global platform helping find missing persons through AI biometric matching and law enforcement coordination across 80+ countries.</p>
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
        <div>🔒 SSL · 🌐 GDPR · 🌍 80+ Countries</div>
      </div>
    </div>
  </footer>`;
}
