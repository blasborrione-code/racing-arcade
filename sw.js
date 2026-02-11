const CACHE_NAME = 'racing-game-v4.0'; 
const urlsToCache = [
  'index.html',
  './',
  // ... (mantené todas tus rutas de autos acá, no las borres)
  'Autos/car_compact_retro.png',
  'Autos/furgoneta.png',
  'Autos/auto_rosa.png',
  'Autos/car_muscle_pony.png',
  'Autos/car_super_yellow.png',
  'Autos/car_sport_black.png',
  'Autos/car_luxury_white.png',
  'Autos/car_formula_classic.png',
  'Autos/car_formula_modern.png',
  'Autos/car_rally_blue_v2.png'
];

// 1. INSTALACIÓN
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 2. ACTIVACIÓN
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH (EL ARREGLO ESTÁ ACÁ)
self.addEventListener('fetch', event => {
  // REGLA DE ORO: Si es login de Google o Firebase, NO USAR CACHE
  if (event.request.url.includes('/__/auth/') || event.request.url.includes('google.com')) {
    return; // El SW no se mete en estas peticiones
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 4. MENSAJES
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
