import { IStateScheme } from '@/typings/IStateSchema';

export const getUserId = (state: IStateScheme) => state.user.id;

export const getUserEmail = (state: IStateScheme) => state.user.email;

export const getUserLogin = (state: IStateScheme) => state.user.login;

export const getUserFirstName = (state: IStateScheme) => state.user.first_name;

export const getUserSecondName = (state: IStateScheme) => state.user.second_name;

export const getUserDisplayName = (state: IStateScheme) => state.user.display_name;

export const getUserPhone = (state: IStateScheme) => state.user.phone;

export const getUserAvatar = (state: IStateScheme) => state.user.avatar;
