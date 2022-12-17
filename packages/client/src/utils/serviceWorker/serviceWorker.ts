export type {};
// eslint-disable-next-line no-undef
declare const self: ServiceWorkerGlobalScope;

// Имя кеша. Нужно менять каждый раз, когда содержимое файлов меняется.
const CACHE_NAME = 'network-or-cache-v1';

// Максимальное время выполениня запроса.
const TIMEOUT = 400;

// Список файлов для кеширования.
const FILE_LIST = [
  '/',
  '/index.html',
  '/vite.svg',
  '/assets/index.css',
  '/assets/index.js',
  '/assets/car1.png',
  '/assets/car2.png',
  '/assets/car3.png',
  '/assets/car4.png',
  '/assets/car5.png',
  '/assets/car6.png',
  '/assets/car7.png',
  '/assets/car8.png',
  '/assets/car9.png',
  '/assets/car10.png',
  '/assets/road.jpg',
  '/assets/tree1.png',
  '/assets/tree2.png',
  '/assets/tree3.png',
  '/assets/tree4.png',
];

/**
 * Событие жизненного цикла SW.
 * SW устанавливается в браузер, но ещё не начинает свою работу.
 * На этом этапе кешируем статику.
 */
self.addEventListener('install', async (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(FILE_LIST);
    })()
  );
});

/**
 * Событие жизненного цикла SW.
 * SW установлен в браузер и начинает свою работу.
 * На этом этапе очищаем устаревший кеш.
 */
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

/**
 * Получение сетевого ресурса.
 * Если запрос длится дольше, чем timeout, функция возвращает Promise.reject().
 * @param {Request} request - Параметры запроса.
 * @param {number} timeout - Максимальное время запроса.
 * @returns {Promise<Response>} Сетевой ресурс.
 */
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

/**
 * Получение ресурса из кеша.
 * Если запрос не найден в кеше, функция возвращает Promise.reject().
 * @param {Request} request - Параметры запроса.
 * @returns {Promise<Response>} Сетевой ресурс.
 */
async function cachedData(request: Request) {
  const cashedRequest = await caches.match(request.url);

  return cashedRequest || Promise.reject(new Error('no-match'));
}

/**
 * Событие срабатывает при вызове метода Fetch.
 * Каждый запрос к серверу будет проходить через этот обработчик.
 * Здесь реализована стратегия кеширования.
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (event.request.url.indexOf('http') !== 0) return;
  event.respondWith(networkFirst(request, TIMEOUT).catch(() => cachedData(request)));
});
