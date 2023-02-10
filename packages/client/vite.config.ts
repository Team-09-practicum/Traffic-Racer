import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { copy } from 'vite-plugin-copy';
import { CompileTsServiceWorker } from './src/utils/serviceWorker/compileTsServiceWorker';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    CompileTsServiceWorker(),
    copy({
      files: [
        {
          from: './public',
          to: './dist/assets',
          filter: /\.svg$/,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
