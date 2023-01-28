import { ThemeAttributes, Theme } from '../models/Theme';

class ThemeService {
  // eslint-disable-next-line class-methods-use-this
  public get = (userId: number) => Theme.findOne({ where: { userId } });

  // eslint-disable-next-line class-methods-use-this
  public create = async (data: ThemeAttributes) => {
    const { userId, theme } = data;
    const obj = await Theme.findOne({ where: { userId } });
    if (obj) {
      return obj.update({ theme });
    }
    return Theme.create({ theme });
  };
}

export const themeService = new ThemeService();
