const CACHE_NAME = 'dynamic-site-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/dynamic-style.css',
    '/css/components.css',
    '/css/animations.css',
    '/js/dynamic.js',
    '/js/components.js',
    '/js/animations.js',
    '/js/validation.js',
    '/img/logo.svg',
    '/fonts/custom-font.woff2'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});