// QuietTimer 서비스워커 (오프라인 캐시)
const CACHE = "quiettimer-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json"
];

// 설치: 캐시에 파일 넣기
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

// 요청 가로채서 캐시 먼저 응답
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
