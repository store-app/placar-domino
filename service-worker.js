const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    '/placar-domino/', 
    '/placar-domino/index.html',
    '/placar-domino/manifest.json',
    '/placar-domino/favicon.ico',
    '/placar-domino/icon-192x192.png',
    '/placar-domino/icon-512x512.png'
];

// Instalar o Service Worker e fazer o cache dos arquivos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Ativar o Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Recuperar os arquivos do cache ou da rede
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
