import { INLINE, SELF, NONCE } from 'express-csp-header';
import type { CSPDirectives } from 'csp-header';

const directives: Partial<CSPDirectives> = {
  'default-src': [SELF],
  'connect-src': [SELF, 'ya-praktikum.tech', 'cdn.tiny.cloud', 'sp.tinymce.com'],
  'script-src': [SELF, 'cdn.tiny.cloud'],
  'style-src': [SELF, INLINE, 'cdn.tiny.cloud'],
  'img-src': [SELF, 'data:', 'ya-praktikum.tech', 'cdn.tiny.cloud', 'sp.tinymce.com'],
  'media-src': [SELF, 'data:'],
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
