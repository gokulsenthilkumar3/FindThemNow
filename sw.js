// ===== SERVICE WORKER =====
// FIX: Bumped cache version — change this when deploying new assets to bust old cache
const CACHE_NAME = 'findthemnow-v2';

// Core static assets to pre-cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/accessibility.css',
  '/js/database.js',
  '/js/emergency.js',
  '/js/embassy.js',
  '/js/biometrics.js',
  '/js/camera.js',
  '/js/router.js',
  '/js/app.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700;900&display=swap'
];

// FIX: Removed console.log statements from production service worker

// Install event — pre-cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate new SW immediately without waiting for old clients to close
  self.skipWaiting();
});

// Activate event — clean up old/stale caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch event
// FIX: Use Network-first strategy for HTML pages so users always get fresh content.
// Use Cache-first for static assets (JS, CSS, fonts) for performance.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-first for navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(networkRes => {
          // Update the cache with the fresh response
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
          return networkRes;
        })
        .catch(() => {
          // Offline fallback: serve cached index.html
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Cache-first for static assets (JS, CSS, images, fonts)
  event.respondWith(
    caches.match(event.request).then(cachedRes => {
      if (cachedRes) return cachedRes;

      return fetch(event.request).then(fetchRes => {
        // Only cache successful same-origin or trusted CDN responses
        if (
          fetchRes &&
          fetchRes.status === 200 &&
          (url.origin === self.location.origin ||
            url.hostname === 'fonts.googleapis.com' ||
            url.hostname === 'fonts.gstatic.com')
        ) {
          const resClone = fetchRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        }
        return fetchRes;
      }).catch(() => {
        // FIX: Return a proper offline fallback response instead of silently failing
        return new Response('Offline — resource not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});
