import { IStateSchema } from '@/typings/IStateSchema';

export const getUserId = (state: IStateSchema) => (state.user.userInfo ? state.user.userInfo.id : undefined);

export const getUserEmail = (state: IStateSchema) => (state.user.userInfo ? state.user.userInfo.email : undefined);

export const getUserLogin = (state: IStateSchema) => (state.user.userInfo ? state.user.userInfo.login : undefined);

export const getUserFirstName = (state: IStateSchema) =>
  state.user.userInfo ? state.user.userInfo?.first_name : undefined;

export const getUserSecondName = (state: IStateSchema) =>
  state.user.userInfo ? state.user.userInfo?.second_name : undefined;

export const getUserDisplayName = (state: IStateSchema) =>
  state.user.userInfo ? state.user.userInfo?.display_name : undefined;

export const getUserPhone = (state: IStateSchema) => (state.user.userInfo ? state.user.userInfo?.phone : undefined);

export const getUserAvatar = (state: IStateSchema) => (state.user.userInfo ? state.user.userInfo?.avatar : undefined);
