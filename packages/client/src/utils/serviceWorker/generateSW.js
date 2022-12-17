import { generateSW } from 'workbox-build';

// Скрипт, запускаемый нодой во время билда.
// Генерирует скрипт service-worker'а, который помещается в dist
generateSW({
  swDest: 'dist/service-worker.js',
  globDirectory: 'dist/',
  globPatterns: ['**/*.{js,css,html,png,svg,jpg}'],
})
  .then(({ count, size }) => {
    // eslint-disable-next-line no-console
    console.log(
      `Сгенерирован SW, который предварительно кэширует ${count} файлов. 
    Общий размер кэшируемых файлов составляет ${size} байт.`
    );
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));
