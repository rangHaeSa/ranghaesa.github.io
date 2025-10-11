// QuietTimer 서비스워커
const CACHE = "quiettimer-v2";
const ASSETS = ["/","/index.html","/manifest.json","/about.html","/guide.html","/faq.html","/privacy.html","/terms.html","/contact.html"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
