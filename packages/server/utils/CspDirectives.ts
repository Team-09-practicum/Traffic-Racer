import { INLINE, SELF, NONCE } from 'express-csp-header';
import type { CSPDirectives } from 'csp-header';

const directives: Partial<CSPDirectives> = {
  'default-src': [SELF],
  'connect-src': [
    SELF,
    'ya-praktikum.tech',
    '*.tinymce.com',
    '*.tiny.cloud',
    'suggestions.dadata.ru',
    'api.telegram.org',
  ],
  'script-src': [SELF, '*.tinymce.com', '*.tiny.cloud'],
  'style-src': [SELF, INLINE, '*.tinymce.com', '*.tiny.cloud'],
  'img-src': [SELF, 'data:', 'blob:', 'ya-praktikum.tech', '*.tinymce.com', '*.tiny.cloud'],
  'media-src': [SELF, 'data:'],
  'font-src': [SELF, '*.tinymce.com', '*.tiny.cloud'],
  'worker-src': [SELF],
  'block-all-mixed-content': true,
};

export const getCspDirectives = () => {
  if (process.env.NODE_ENV === 'development') {
    directives['connect-src']?.push('ws:');
    directives['script-src']?.push(INLINE);
  } else directives['script-src']?.push(NONCE);

  return directives;
};
