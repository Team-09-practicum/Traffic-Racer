import { IStateSchema } from '@/typings/IStateSchema';

export const getUserFull = (state: IStateSchema) => state.user.userInfo;
