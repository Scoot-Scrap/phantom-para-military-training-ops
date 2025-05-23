// File: public/sw.js

const STATIC_CACHE = "static-v1";
const RUNTIME_CACHE = "runtime-v1";
const PRECACHE_URLS = ["/", "/offline.html", "/styles/globals.css"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  const expected = [STATIC_CACHE, RUNTIME_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) =>
            !expected.includes(key) ? caches.delete(key) : null,
          ),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // API calls → Stale-while-revalidate :contentReference[oaicite:5]{index=5}
  if (request.url.includes("/api/")) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const network = fetch(request).then((res) => {
            cache.put(request, res.clone());
            return res;
          });
          return cached || network;
        }),
      ),
    );
    return;
  }

  // Other requests → cache-first fallback to network
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request)),
  );
});
