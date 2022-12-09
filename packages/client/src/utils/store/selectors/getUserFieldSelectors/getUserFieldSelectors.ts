import type { IUser } from '../../typings';

export const getUserId = (state: IUser) => state.id;

export const getUserEmail = (state: IUser) => state.email;

export const getUserLogin = (state: IUser) => state.login;

export const getUserFirstName = (state: IUser) => state.first_name;

export const getUserSecondName = (state: IUser) => state.second_name;

export const getUserDisplayName = (state: IUser) => state.display_name;

export const getUserPhone = (state: IUser) => state.phone;

export const getUserAvatar = (state: IUser) => state.avatar;
