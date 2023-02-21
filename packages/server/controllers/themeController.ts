import type { Request, Response } from 'express';
import { ThemeColor } from '../models/Theme';
import { themeService } from '../services/ThemeService';

export class ThemeAPI {
  public static saveTheme = async (req: Request, res: Response) => {
    try {
      const { theme, userId } = req.body;
      if (!theme || !userId) {
        res.status(400).json({ reason: 'empty field in message body' });
        return;
      }
      if (!Object.values(ThemeColor).includes(theme) || typeof userId !== 'number') {
        res.status(400).json({ reason: 'uncorrect type in value' });
        return;
      }
      await themeService.create({ userId, theme });
      res.status(200).json({ status: 'Ok' });
    } catch (err) {
      res.status(500).json({ reason: `ThemeAPI save theme error: ${err}` });
    }
  };

  public static getTheme = async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        res.status(400).json({ reason: 'empty message body' });
        return;
      }
      const userIdNumber = Number(userId);
      if (Number.isNaN(userIdNumber) || userIdNumber === 0) {
        res.status(400).json({ reason: 'uncorrect type in userId value' });
        return;
      }
      const getTheme = await themeService.get(userIdNumber);
      res.json(getTheme);
    } catch (err) {
      res.status(500).json({ reason: `ThemeAPI get theme error: ${err}` });
    }
  };
}
