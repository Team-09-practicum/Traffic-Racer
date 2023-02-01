import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';
import { Theme } from '@/typings/IUser';

export const getUserTheme = createApiDef<{ userId: number; theme: Theme | null }>({
  url: apiPaths.userTheme,
  type: 'get',
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
});
