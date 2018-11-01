var CACHE_NAME = '{{CACHE_NAME}}';
var urlsToCache = [{{urlsToCache}}];

self.addEventListener('install', function(event) {
    console.log('event in install: ', event);
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        },
        err => console.log('err: ', err)));
});

self.addEventListener('fetch', function(event) {

    event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            console.log('response: ', response);

            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
    );
});