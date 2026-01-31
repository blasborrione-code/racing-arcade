const CACHE_NAME = 'racing-arcade-v21.1'; // Subimos la versión
const assets = [
  './',
  './index.html',
  './manifest.json',
  './Autos/car_compact_retro.png',
  './Autos/car_muscle_pony.png',   // El nuevo Camaro
  './Autos/car_rally_blue.png',    // El nuevo Subaru
  './Autos/car_sport_black.png',
  './Autos/car_super_yellow.png',
  './Autos/car_tuner_night.png',   // El nuevo Skyline
  './Autos/car_tuner_legend.png',  // El nuevo Supra
  './Autos/car_luxury_white.png',
  './Autos/car_formula_classic.png',
  './Autos/car_formula_modern.png',
  './Autos/camion_cisterna.png',
  './Autos/furgoneta.png',
  './Autos/auto_rosa.png',
  './Autos/camioneta4x4.png',
  './Items/bidon_nafta.png',
  './Items/moneda_pixel.png',
  './Items/charco_aceite.png',
  './Items/heart_pixel.png',
  './Items/bomba.png',
  './Items/explosion.png',
  './Items/iman_pixel.png',
  './Items/topadora.png',
  './Items/pavimentadora.png',
  './Items/valla.png',
  './Items/cono.png',
  './Items/fondo_carga.png',
  './Entorno/arbol_1.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
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
