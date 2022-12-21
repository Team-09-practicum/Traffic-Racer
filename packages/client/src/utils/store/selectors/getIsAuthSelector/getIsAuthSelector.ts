import { createSelector } from '@reduxjs/toolkit';
import { getUserFull } from '../getUserFullSelector/getUserFullSelector';

export const getIsAuth = createSelector(getUserFull, (user) => !!user?.id);
