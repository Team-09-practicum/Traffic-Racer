import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const postUserTheme = createApiDef({
  url: apiPaths.userTheme,
  type: 'post',
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
});
