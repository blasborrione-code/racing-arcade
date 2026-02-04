const CACHE_NAME = 'racing-game-v2.9'; // Subí a v2.6 para asegurar el cambio
const urlsToCache = [
  'index.html',
  './',

  // --- IMÁGENES BASE Y ACTUALIZADAS ---
  'Autos/car_compact_retro.png',
  'Autos/furgoneta.png',
  'Autos/auto_rosa.png',
  'Autos/car_muscle_pony.png',
  'Autos/car_super_yellow.png',
  'Autos/car_sport_black.png',
  'Autos/car_luxury_white.png',
  'Autos/car_formula_classic.png',
  'Autos/car_formula_modern.png',
  'Autos/car_rally_blue_v2.png', 

  // --- VARIACIONES DE COLORES ---
  'Autos/car_compact_retro_verde.png',
  'Autos/car_compact_retro_negro.png',
  'Autos/car_compact_retro_rosa.png',
  'Autos/car_compact_retro_violeta.png',
  'Autos/car_compact_retro_azul.png',
  'Autos/car_compact_retro_blanco.png',
  'Autos/car_compact_retro_gris.png',
  'Autos/car_compact_retro_rojo.png',

  'Autos/car_furgoneta_rojo.png',
  'Autos/car_furgoneta_verde.png',
  'Autos/car_furgoneta_amarillo.png',

  'Autos/car_auto_rosa_negro.png',
  'Autos/car_auto_rosa_blanco.png',
  'Autos/car_auto_rosa_verde.png',
  'Autos/car_auto_rosa_azul.png',

  'Autos/car_muscle_pony_rosa.png',
  'Autos/car_muscle_pony_naranja.png',
  'Autos/car_muscle_pony_celeste.png',
  'Autos/car_muscle_pony_amarillo.png',

  'Autos/car_super_yellow_rojo.png',
  'Autos/car_super_yellow_verde.png',
  'Autos/car_super_yellow_azul.png',
  'Autos/car_super_yellow_rosa.png',
  'Autos/car_super_yellow_negro.png',

  'Autos/car_sport_black_plata.png',
  'Autos/car_sport_black_rojo.png',
  'Autos/car_sport_black_azul.png',
  'Autos/car_sport_black_verde.png',
  'Autos/car_sport_black_amarillo.png',

  'Autos/car_luxury_white_negro.png',
  'Autos/car_luxury_white_naranja.png',

  'Autos/car_formula_classic_azul.png',
  'Autos/car_formula_classic_amarillo.png',

  'Autos/car_formula_modern_violeta.png',
  'Autos/car_formula_modern_azul.png',
  'Autos/car_formula_modern_rojo.png',
  'Autos/car_formula_modern_verde.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// ESCUCHAR EL MENSAJE PARA FORZAR LA ACTUALIZACIÓN (AFUERA DEL FETCH)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
