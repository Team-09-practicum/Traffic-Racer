import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { CompileTsServiceWorker } from './src/utils/serviceWorker/compileTsServiceWorker';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __TELEGRAM_FEEDBACK_TOKEN__: `'${process.env.TELEGRAM_FEEDBACK_TOKEN}'`,
    __TELEGRAM_CHAT_ID__: `'${process.env.TELEGRAM_CHAT_ID}'`,
  },
  plugins: [react(), CompileTsServiceWorker()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
