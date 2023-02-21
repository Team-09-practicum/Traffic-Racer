import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
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
  build: {
    ssr: true,
    lib: {
      entry: path.resolve(__dirname, 'SsrRender.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
  ssr: {
    format: 'cjs',
  },
  define: {
    __TELEGRAM_FEEDBACK_TOKEN__: `'${process.env.TELEGRAM_FEEDBACK_TOKEN}'` || '',
    __TELEGRAM_CHAT_ID__: `'${process.env.TELEGRAM_CHAT_ID}'` || '',
  },
});
