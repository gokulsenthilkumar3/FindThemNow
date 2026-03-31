const CACHE_NAME = 'findthemnow-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/js/database.js',
  '/js/emergency.js',
  '/js/embassy.js',
  '/js/biometrics.js',
  '/js/camera.js',
  '/js/router.js',
  '/js/app.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700;900&display=swap'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event (clean up old caches)
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

// Fetch event (cache first, then network)
self.addEventListener('fetch', event => {
  // If request is for an image not in cache, try network
  event.respondWith(
    caches.match(event.request).then(cachedRes => {
      return cachedRes || fetch(event.request).then(fetchRes => {
        // Only cache valid responses
        if (fetchRes.status === 200 && event.request.url.startsWith('http')) {
          const resClone = fetchRes.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, resClone);
          });
        }
        return fetchRes;
      }).catch(err => {
        // Offline fallback
        console.log('Network failure', err);
      });
    })
  );
});
