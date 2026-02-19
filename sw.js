const CACHE_NAME = 'racing-game-v57.4'; // BUMP de versión vital!
const urlsToCache = [
  'index.html',
  './',
  
  // -- AUTOS --
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
  // ... (dejá todos los colores que ya tenías acá) ...

  // -- NPCS (Tráfico) --
  'Autos/npc_azul.png',
  'Autos/npc_blanco.png',
  'Autos/npc_taxi.png',
  'Autos/npc_rojo.png',
  'Autos/npc_gris.png',

  // -- ÍTEMS Y ENTORNO --
  'Items/bidon_nafta.png',
  'Items/moneda_pixel.png',
  'Items/fondo_carga.png',
  // Te recomiendo agregar acá el charco, la bomba, el imán, etc.

  // -- SONIDOS --
  'sonidos/motor.m4a',
  'sonidos/music_menu.m4a',
  'sonidos/music_race.m4a'
  // Te recomiendo agregar el resto de los audios
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => {
    if (k !== CACHE_NAME) return caches.delete(k);
  }))).then(() => self.clients.claim()));
});

// Lógica de Fetch para manejo de Cache y Red
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/__/auth/') || 
      event.request.url.includes('google.com') || 
      event.request.url.includes('identitytoolkit')) {
    return; 
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
