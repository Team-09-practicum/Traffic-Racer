// eslint-disable-next-line no-underscore-dangle
declare global {
  const __SERVER_PORT__: number;
  const __TELEGRAM_FEEDBACK_TOKEN__: string;
  const __TELEGRAM_CHAT_ID__: string;
}

declare module 'rollup-plugin-modify';
export {};
