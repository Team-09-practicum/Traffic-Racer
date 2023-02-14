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
    __OAUTH_CLIENT_ID__:
      process.env.NODE_ENV === 'production'
        ? `'${process.env.OAUTH_CLIENT_ID}'`
        : `'${process.env.OAUTH_CLIENT_ID_DEV}'`,
    __OAUTH_REDIRECT_URI__:
      process.env.NODE_ENV === 'production'
        ? `'${process.env.OAUTH_REDIRECT_URI}'`
        : `'${process.env.OAUTH_REDIRECT_URI_DEV}'`,
  },
  plugins: [react(), CompileTsServiceWorker()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
