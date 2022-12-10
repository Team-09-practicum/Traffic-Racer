export type {};
// eslint-disable-next-line no-undef
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'network-or-cache-v1';
const TIMEOUT = 400;
const FILE_LIST = [
  '/',
  '/index.html',
  '/vite.svg',
  '/assets/index.css',
  '/assets/index.js',
  '/assets/lada.png',
  '/assets/road.jpg',
  '/assets/tree1.png',
  '/assets/tree2.png',
  '/assets/tree3.png',
  '/assets/tree4.png',
];

self.addEventListener('install', async (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(FILE_LIST);
    })()
  );
});

self.addEventListener('activate', (event) => {
  self.clients.claim();

  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key === CACHE_NAME) return;
          // eslint-disable-next-line consistent-return
          return caches.delete(key);
        })
      )
    )
  );
});

function networkFirst(request: Request, timeout: number): Promise<Response> {
  return new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);

    caches.open(CACHE_NAME).then((cache) =>
      fetch(request.url).then((response) => {
        clearTimeout(timeoutId);
        cache.put(request.url, response.clone());
        fulfill(response);
      }, reject)
    );
  });
}

async function cachedData(request: Request) {
  const cashedRequest = await caches.match(request.url);

  return cashedRequest || Promise.reject(new Error('no-match'));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (event.request.url.indexOf('http') !== 0) return;
  event.respondWith(networkFirst(request, TIMEOUT).catch(() => cachedData(request)));
});
