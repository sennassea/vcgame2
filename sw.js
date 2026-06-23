const CACHE_VERSION = 'baseball-monster-hunter-v6-web-original';
const CACHE_PREFIX = 'baseball-monster-hunter-';
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './pwa-register.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './sounds/main-background.mp3',
  './sounds/attack-mode.mp3',
  './sounds/defense-mode.mp3',
  './sounds/pitch-throw.mp3',
  './sounds/bat-swing.mp3',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_VERSION)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.headers.has('range')) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) return cachedResponse;
        if (request.mode === 'navigate') return caches.match('./index.html');
        throw new Error(`오프라인 캐시에 없는 파일입니다: ${url.pathname}`);
      })
  );
});
