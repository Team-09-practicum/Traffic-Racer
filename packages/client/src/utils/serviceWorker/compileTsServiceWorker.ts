import { rollup } from 'rollup';
import type { InputOptions, OutputOptions } from 'rollup';
import rollupPluginTypescript from 'rollup-plugin-ts';
import { getManifest } from 'workbox-build';
import modify from 'rollup-plugin-modify';

interface ICompileTsServiceWorker {
  (): {
    name: string;
    writeBundle(): Promise<void>;
  };
}

/**
 * Плагин для rollup. Используется в Vite (vite.config.ts).
 * Генерирует список файлов для прекэшинга. Вставляет его в файл Service Worker.
 * Компилирует файл Service Worker из ts в js. Кладёт его в папку dist.
 * @returns {ICompileTsServiceWorker} Плагин.
 */
export const CompileTsServiceWorker: ICompileTsServiceWorker = () => ({
  name: 'compile-typescript-service-worker',
  async writeBundle() {
    const { manifestEntries, count, size } = await getManifest({
      globDirectory: 'dist/',
      globPatterns: ['**/*.{js,css,html,png,svg,jpg}'],
    });

    const fileList = manifestEntries.map((entry) => entry.url);

    const inputOptions: InputOptions = {
      input: 'src/utils/serviceWorker/serviceWorker.ts',
      plugins: [
        rollupPluginTypescript(),
        modify({
          'network-or-cache': `${Date.now()}`,
          'self.__WB_MANIFEST': JSON.stringify(fileList),
        }),
      ],
    };

    const outputOptions: OutputOptions = {
      file: 'dist/service-worker.js',
      format: 'es',
    };

    const bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
    await bundle.close();

    // eslint-disable-next-line no-console
    console.log(
      `Сгенерирован SW, который предварительно кэширует ${count} файлов.
    Общий размер кэшируемых файлов составляет ${size} байт.`
    );
  },
});
