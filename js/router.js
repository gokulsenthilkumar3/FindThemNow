// ===== SPA ROUTER =====
let currentPage = 'home';

function navigate(page) {
  currentPage = page;
  // Stop camera if leaving scanner
  if (page !== 'scanner') stopCamera();
  // Close mobile nav
  const mn = document.getElementById('mobileNav');
  const mo = document.getElementById('mobileNavOverlay');
  if (mn) mn.classList.remove('show');
  if (mo) mo.classList.remove('show');
  // Update active states
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
  document.querySelectorAll('.bottom-nav-item').forEach(l => l.classList.toggle('active', l.dataset.page === page));
  // Render page
  renderPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return false;
}

function renderPage(page) {
  const main = document.getElementById('mainContent');
  switch(page) {
    case 'home': main.innerHTML = renderHome(); break;
    case 'scanner': main.innerHTML = renderScanner(); initScanner(); break;
    case 'search': main.innerHTML = renderSearch(); break;
    case 'missing': main.innerHTML = renderMissing(); break;
    case 'report': main.innerHTML = renderReport(); break;
    case 'emergency': main.innerHTML = renderEmergency(); initEmergencySearch(); break;
    case 'embassy': main.innerHTML = renderEmbassy(); break;
    case 'alerts': main.innerHTML = renderAlerts(); break;
    default: main.innerHTML = renderHome();
  }
}
