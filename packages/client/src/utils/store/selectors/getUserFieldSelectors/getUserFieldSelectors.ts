import { createSelector } from '@reduxjs/toolkit';
import { getUserFull } from '../getUserFullSelector/getUserFullSelector';

export const getUserId = createSelector(getUserFull, (user) => user?.id);

export const getUserEmail = createSelector(getUserFull, (user) => user?.email);

export const getUserLogin = createSelector(getUserFull, (user) => user?.login);

export const getUserFirstName = createSelector(getUserFull, (user) => user?.first_name);

export const getUserSecondName = createSelector(getUserFull, (user) => user?.second_name);

export const getUserDisplayName = createSelector(getUserFull, (user) => user?.display_name);

export const getUserPhone = createSelector(getUserFull, (user) => user?.phone);

export const getUserAvatar = createSelector(getUserFull, (user) => user?.avatar);

export const getUserIdLoginAvatar = createSelector([getUserId, getUserLogin, getUserAvatar], (id, login, avatar) => ({
  id,
  login,
  avatar,
}));
