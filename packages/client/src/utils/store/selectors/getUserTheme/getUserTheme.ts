import { createSelector } from '@reduxjs/toolkit';
import { getUserFull } from '../getUserFullSelector/getUserFullSelector';

export const getUserTheme = createSelector(getUserFull, (user) => user?.theme || 'light');
