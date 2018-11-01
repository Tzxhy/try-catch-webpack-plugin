var CACHE_NAME = 'test';
var urlsToCache = ["/js/bundle.main.js","/js/bundle.react.js","/js/bundle.react-dom.js","/js/bundle.react_node.js","/index.html"];

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