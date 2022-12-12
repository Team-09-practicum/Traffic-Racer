interface IConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
}

/**
 * Регистрация Service Worker.
 * Добавляет несколько уведомлений жизненного цикла SW и коллбеков из config.
 * @param {string} swUrl - Путь к файлу Service Worker.
 * @param {IConfig} config - Параметры.
 */
function registerValidSW(swUrl: string, config?: IConfig) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      // eslint-disable-next-line no-param-reassign
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // eslint-disable-next-line no-console
              console.log('New content is available and will be used when all tabs for this page are closed.');

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // eslint-disable-next-line no-console
              console.log('Content is cached for offline use.');

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error during service worker registration:', error);
    });
}

/**
 * Функция-враппер над функцией регистрации Service Worker.
 * Ограничивает регистрацию SW режимом 'production'.
 * Добавляет уведомление о наличии Service Worker.
 * @param {IConfig} config - Параметры.
 */
export function registerSW(config?: IConfig) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(import.meta.env.BASE_URL as string, window.location.href);
    if (publicUrl.origin !== window.location.origin) return;

    window.addEventListener('load', () => {
      const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;
      registerValidSW(swUrl, config);

      navigator.serviceWorker.ready.then(() => {
        // eslint-disable-next-line no-console
        console.log(
          'This web app is being served by a service worker with "Network first, falling back to cache" strategy'
        );
      });
    });
  }
}
