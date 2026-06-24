const CACHE_NAME = 'racing-game-v20.3.2'; 

const urlsToCache = [
  'index.html',
  './',
  'manifest.json',

  // --- ÍTEMS Y OBSTÁCULOS ---
  'Items/bidon_nafta.png',
  'Items/moneda_pixel.png',
  'Items/fondo_carga.png',
  'Items/charco_aceite.png',
  'Items/heart_pixel.png',
  'Items/bomba.png',
  'Items/explosion.png',
  'Items/iman_pixel.png',
  'Items/topadora.png',
  'Items/pavimentadora.png',
  'Items/valla.png',
  'Items/cono.png',

  // --- ENTORNO ---
  'Entorno/arbol_1.png',

  // --- NPCS (TRÁFICO) Y POLICÍA ---
  'Autos/camion_cisterna.png',
  'Autos/police_car.png',
  'Autos/npc_azul.png',
  'Autos/npc_blanco.png',
  'Autos/npc_taxi.png',
  'Autos/npc_rojo.png',
  'Autos/npc_gris.png',

  // --- AUTOS PRINCIPALES ---
  'Autos/car_compact_retro.png',
  'Autos/furgoneta.png',
  'Autos/auto_rosa.png',
  'Autos/camioneta4x4.png',
  'Autos/car_muscle_pony.png',
  'Autos/car_rally_blue_v2.png',
  'Autos/car_super_yellow.png',
  'Autos/car_sport_black.png',
  'Autos/car_tuner_night.png',
  'Autos/car_tuner_legend.png',
  'Autos/car_luxury_white.png',
  'Autos/car_formula_classic.png',
  'Autos/car_formula_modern.png',

  // --- PINTURAS (VARIANTE DE COLORES) ---
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
  'Autos/car_formula_modern_verde.png',

  // --- SONIDOS ---
  'sonidos/motor.m4a',
  'sonidos/music_menu.m4a',
  'sonidos/music_race.m4a',
  'sonidos/coin.m4a',
  'sonidos/crash.m4a',
  'sonidos/click.m4a',
  'sonidos/oil.m4a',
  'sonidos/explosion.mp3',
  'sonidos/game_over.mp3',
  'sonidos/near.mp3',
  'sonidos/heart.mp3',
  'sonidos/fuel.m4a'
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

// Lógica de Fetch para manejo de Cache y Red (Ignorando Firebase)
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
