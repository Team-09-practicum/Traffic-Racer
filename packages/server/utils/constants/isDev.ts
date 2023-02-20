export const isDev = () => process.env.NODE_ENV === 'development';

export const API_HOST = isDev() ? 'localhost' : 'traffic-racer.ru';
