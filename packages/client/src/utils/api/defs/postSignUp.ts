import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

// Возвращается НЕ string, этот def сделан для наглядного примера
export const postSignUp = createApiDef<string>({
  url: apiPaths.postSignUp,
  type: 'post',
});
