const CACHE_NAME = 'racing-arcade-v2'; // Cambiamos el nombre para forzar actualización

const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './Items/fondo_carga.png',
  './Items/bidon_nafta.png',
  './Items/moneda_pixel.png',
  './Items/charco_aceite.png',
  './Items/heart_pixel.png',
  './Items/bomba.png',
  './Items/explosion.png',
  './Items/iman_pixel.png',
  './Autos/camion_cisterna.png',
  './Autos/auto_inicial.png',
  './Autos/furgoneta.png',
  './Autos/auto_rosa.png',
  './Autos/camioneta4x4.png',
  './Autos/camaro_negro.png',
  './Autos/subaru.png',
  './Autos/lambo_amarillo.png',
  './Autos/porsche_negro.png',
  './Autos/skyline.png',
  './Autos/supra.png',
  './Autos/mercedes_blanco.png',
  './Autos/f1_clasico.png',
  './Autos/f1_nuevo.png',
  './Entorno/arbol_1.png'
];

// Instalación: Solo guarda lo que realmente encuentra
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        assetsToCache.map(url => {
          return cache.add(url).catch(err => console.warn("Fallo descarga de:", url));
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
