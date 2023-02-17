import sanitizeHtml from 'sanitize-html';

export const sanitizeRichText = (txt: string) =>
  sanitizeHtml(txt, {
    allowedAttributes: {
      '*': ['style'],
    },
  });
