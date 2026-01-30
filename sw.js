const CACHE_NAME = 'racing-arcade-v20';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './Autos/car_compact_retro.png',
  './Autos/car_sport_black.png',
  './Autos/car_super_yellow.png',
  './Autos/car_luxury_white.png',
  './Autos/car_formula_classic.png',
  './Autos/car_formula_modern.png',
  './Autos/camion_cisterna.png',
  './Autos/furgoneta.png',
  './Autos/auto_rosa.png',
  './Autos/camioneta4x4.png',
  './Autos/camaro_negro.png',
  './Autos/subaru.png',
  './Autos/skyline.png',
  './Autos/supra.png',
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

// Instalación y cacheo
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cacheando archivos nuevos...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// Limpieza de caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Estrategia de carga
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
