import type { Request, Response } from 'express';
import { ThemeColor } from '../models/Theme';
import { themeService } from '../services/ThemeService';

export class ThemeAPI {
  public static saveTheme = async (req: Request, res: Response) => {
    try {
      const { theme, userId } = req.body;
      if (!theme || !userId) {
        res.status(400).json('empty field in message body');
      } else if (!Object.values(ThemeColor).includes(theme) || typeof userId !== 'number') {
        res.status(400).json('uncorrect type in value');
      } else {
        await themeService.create({ userId, theme });
        res.status(200).json('Ok');
      }
    } catch (err) {
      res.status(500).json(`ThemeAPI save theme error: ${err}`);
    }
  };

  public static getTheme = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        res.status(400).json('empty message body');
      } else if (typeof userId !== 'number') {
        res.status(400).json('uncorrect type in userId value');
      } else {
        const getTheme = await themeService.get(userId);
        res.json(getTheme);
      }
    } catch (err) {
      res.status(500).json(`ThemeAPI get theme error: ${err}`);
    }
  };
}
