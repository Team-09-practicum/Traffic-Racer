import { Router } from 'express';
import { ThemeAPI } from '../controllers/themeController';

export const themeRouter: Router = Router();

themeRouter.get('/', ThemeAPI.getTheme);
themeRouter.post('/', ThemeAPI.saveTheme);
