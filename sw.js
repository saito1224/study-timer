
const PREFIX = 'study-timer-' + new URL(self.registration.scope).pathname + '-';
const CACHE = PREFIX + '7ec4af45c41cf5eb';
const ASSETS = ["./","./assets/index-6mA8vglq.css","./assets/index-CGW3CoDp.js","./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    if (event.request.mode === 'navigate') return (await cache.match('./index.html')) || fetch(event.request);
    return (await cache.match(event.request, {ignoreSearch: true})) || fetch(event.request);
  }));
});
