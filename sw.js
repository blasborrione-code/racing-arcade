const CACHE_NAME = 'racing-arcade-v20.1-rescue'; // Versión 20 de rescate

const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Items
  './Items/fondo_carga.png',
  './Items/bidon_nafta.png',
  './Items/moneda_pixel.png',
  './Items/charco_aceite.png',
  './Items/heart_pixel.png',
  './Items/bomba.png',
  './Items/explosion.png',
  './Items/iman_pixel.png',
  './Items/maquina_1.png',
  './Items/maquina_2.png',
  './Items/maquina_3.png',
  './Items/maquina_4.png',
  './Items/valla.png',
  './Items/cono.png',
  // Autos
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
  // Entorno
  './Entorno/arbol_1.png',
  // Sonidos
  './sonidos/leeme.txt',
  './sonidos/click.m4a',
  './sonidos/coin.m4a',
  './sonidos/crash.m4a',
  './sonidos/explosion.mp3',
  './sonidos/game_over.mp3',
  './sonidos/motor.m4a',
  './sonidos/music_menu.m4a',
  './sonidos/music_race.m4a',
  './sonidos/oil.m4a',
  './sonidos/near.mp3',
  './sonidos/heart.mp3',
  './sonidos/fuel.m4a'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        assetsToCache.map(url => {
          return cache.add(url).catch(err => console.log('Ignorando:', url));
        })
      );
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// ESTRATEGIA: NETWORK FIRST (Internet primero, Caché después)
// Esto evita que te quedes pegado en versiones viejas.
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
