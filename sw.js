const CACHE_NAME = 'racing-arcade-v5.2'; // Cambiado a v3 para forzar la actualización

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
  './Autos/npc_azul.png',
  './Autos/npc_blanco.png',
  './Autos/npc_taxi.png',
  './Autos/npc_rojo.png',
  './Autos/npc_gris.png',
  './Entorno/arbol_1.png'
];

// Instalación: Guarda los archivos en el caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Usamos map para que si un archivo falta (ej. los conos), los demás se guarden igual
      return Promise.all(
        assetsToCache.map(url => {
          return cache.add(url).catch(err => console.warn(`No se pudo cachear: ${url}`, err));
        })
      );
    })
  );
  self.skipWaiting();
});

// Activación: Borra el caché antiguo (v1, v2) para liberar espacio y evitar conflictos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // Toma el control de las pestañas abiertas inmediatamente
});

// Estrategia: Primero busca en caché, si no está, va a internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
