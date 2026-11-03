// Service worker mínimo: la app abre aunque no haya conexión, y las
// actualizaciones llegan solas (se prueba primero la red, luego la caché).
const CACHE = "pelis-v1";
const SHELL = ["./", "./index.html", "./config.js", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(SHELL.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const r = e.request;
  // Solo archivos de la propia web; Firebase y TMDB van siempre por red
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r)
      .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(r, copy)); return res; })
      .catch(() => caches.match(r).then((x) => x || caches.match("./index.html")))
  );
});
