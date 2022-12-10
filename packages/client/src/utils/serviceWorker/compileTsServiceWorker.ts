import { rollup } from 'rollup';
import type { InputOptions, OutputOptions } from 'rollup';
import rollupPluginTypescript from 'rollup-plugin-ts';

interface ICompileTsServiceWorker {
  (): {
    name: string;
    writeBundle(): Promise<void>;
  };
}
export const CompileTsServiceWorker: ICompileTsServiceWorker = () => ({
  name: 'compile-typescript-service-worker',
  async writeBundle() {
    const inputOptions: InputOptions = {
      input: 'src/utils/serviceWorker/serviceWorker.ts',
      plugins: [rollupPluginTypescript()],
    };
    const outputOptions: OutputOptions = {
      file: 'dist/service-worker.js',
      format: 'es',
    };
    const bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
    await bundle.close();
  },
});
